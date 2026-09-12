#!/usr/bin/env python3
"""Normalize one Affinity review PDF's page boxes without rewriting its artwork.

Usage: bundled-python normalize_review_boxes.py /absolute/path/study-review.pdf
Requires pypdf and Pillow. Preserves all original bytes and appends a classic
PDF incremental update of the page dictionary only. This is not PDF/X certification.
"""

from __future__ import annotations

import argparse
import hashlib
import io
import json
from pathlib import Path
import re
import subprocess

import pypdf
from pypdf import PdfReader
from pypdf.generic import DictionaryObject, FloatObject, NameObject, NumberObject, ArrayObject, IndirectObject, StreamObject
from PIL import Image, ImageChops, ImageDraw, ImageStat


class PreciseNumber(FloatObject):
    def myrepr(self):
        return f"{float(self):.12f}".rstrip("0").rstrip(".")


def sha(data):
    return hashlib.sha256(data).hexdigest()


def serialized(obj):
    buf = io.BytesIO()
    obj.write_to_stream(buf)
    return buf.getvalue()


def object_inventory(reader):
    result = {}
    for generation, refs in reader.xref.items():
        for object_id in refs:
            obj = reader.get_object(IndirectObject(object_id, generation, reader))
            entry = {"serialized_sha256": sha(serialized(obj))}
            if isinstance(obj, StreamObject):
                entry["raw_stream_sha256"] = sha(obj._data)
                entry["decoded_stream_sha256"] = sha(obj.get_data())
                entry["raw_stream_bytes"] = len(obj._data)
            result[f"{object_id} {generation}"] = entry
    return result


def boxes(page):
    # Read effective defaults without adding implicit box keys to the dictionary.
    media = page["/MediaBox"]
    crop = page.get("/CropBox", media)
    result = {}
    for name, box in (("MediaBox", media), ("CropBox", crop),
                      ("BleedBox", page.get("/BleedBox", crop)),
                      ("TrimBox", page.get("/TrimBox", crop)),
                      ("ArtBox", page.get("/ArtBox", crop))):
        coords = [float(v) for v in box]
        result[name] = {"points": coords,
                        "width_mm": (coords[2] - coords[0]) * 25.4 / 72,
                        "height_mm": (coords[3] - coords[1]) * 25.4 / 72,
                        "explicit": "/" + name in page}
    return result


def run(command):
    return subprocess.run(command, check=True, capture_output=True, text=True).stdout


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path)
    args = parser.parse_args()
    source = args.source.resolve(strict=True)
    if not source.name.endswith("-review.pdf") or source.name.endswith("-exact-size-review.pdf"):
        raise SystemExit("Expected an original *-review.pdf, not a normalized derivative")
    output = source.with_name(source.name[:-len("-review.pdf")] + "-exact-size-review.pdf")
    if output.exists():
        raise SystemExit(f"Refusing to overwrite {output}")
    evidence_dir = source.parent / "prepress"
    evidence_dir.mkdir(exist_ok=True)
    stem = source.stem
    raw = source.read_bytes()
    reader = PdfReader(io.BytesIO(raw), strict=True)
    assert not reader.is_encrypted and len(reader.pages) == 1
    assert "/AcroForm" not in reader.trailer["/Root"], "Signed/form PDFs are outside scope"
    assert not reader.xref_objStm, "Object-stream PDFs are outside this narrow script"
    page = reader.pages[0]
    assert int(page.get("/Rotate", 0)) == 0
    assert float(page.get("/UserUnit", 1)) == 1
    assert "/TrimBox" in page and "/ArtBox" not in page
    ref = page.indirect_reference
    before_boxes = boxes(page)
    for box in before_boxes.values():
        assert box["points"][:2] == [0.0, 0.0]
        assert abs(box["width_mm"] - 180) < 0.2
        assert abs(box["height_mm"] - 126) < 0.2
    before = object_inventory(reader)
    updated = DictionaryObject(dict(page))
    target = ArrayObject([NumberObject(0), NumberObject(0),
                          PreciseNumber(180 * 72 / 25.4),
                          PreciseNumber(126 * 72 / 25.4)])
    # Preserve implicit Crop/Bleed/Art boxes. In particular do not add ArtBox
    # alongside TrimBox, which would create a PDF/X structural concern.
    changed_keys = [key for key in ("/MediaBox", "/CropBox", "/BleedBox", "/TrimBox", "/ArtBox") if key in page]
    for key in changed_keys:
        updated[NameObject(key)] = target
    starts = list(re.finditer(rb"startxref\s+(\d+)\s+%%EOF", raw))
    assert starts, "No prior startxref found"
    previous_xref = int(starts[-1].group(1))
    assert raw[previous_xref:previous_xref + 4] == b"xref", "Expected classic xref source"
    appendix = io.BytesIO()
    appendix.write(b"\n% Review-only page-box normalization; artwork resources unchanged.\n")
    page_offset = len(raw) + appendix.tell()
    appendix.write(f"{ref.idnum} {ref.generation} obj\n".encode())
    appendix.write(serialized(updated))
    appendix.write(b"\nendobj\n")
    xref_offset = len(raw) + appendix.tell()
    appendix.write(f"xref\n0 1\n0000000000 65535 f \n{ref.idnum} 1\n{page_offset:010d} {ref.generation:05d} n \n".encode())
    trailer = DictionaryObject(dict(reader.trailer))
    trailer.pop("/XRefStm", None)
    trailer[NameObject("/Prev")] = NumberObject(previous_xref)
    appendix.write(b"trailer\n" + serialized(trailer))
    appendix.write(f"\nstartxref\n{xref_offset}\n%%EOF\n".encode())
    normalized = raw + appendix.getvalue()
    after_reader = PdfReader(io.BytesIO(normalized), strict=True)
    after = object_inventory(after_reader)
    assert before.keys() == after.keys()
    changed_objects = [key for key in before if before[key] != after[key]]
    assert changed_objects == [f"{ref.idnum} {ref.generation}"], changed_objects
    before_nonboxes = {key: serialized(value) for key, value in page.items() if key not in changed_keys}
    after_page = after_reader.pages[0]
    after_nonboxes = {key: serialized(value) for key, value in after_page.items() if key not in changed_keys}
    assert before_nonboxes == after_nonboxes
    after_boxes = boxes(after_page)
    for box in after_boxes.values():
        assert abs(box["width_mm"] - 180) < 1e-9
        assert abs(box["height_mm"] - 126) < 1e-9
    output.write_bytes(normalized)
    assert source.read_bytes() == raw and output.read_bytes()[:len(raw)] == raw

    command_results = {}
    for kind, path in (("source", source), ("exact", output)):
        command_results[kind] = {}
        for tool, options in (("pdfinfo", ["-box"]), ("pdffonts", []), ("pdfimages", ["-list"])):
            text = run([tool, *options, str(path)])
            command_results[kind][tool] = text
            (evidence_dir / f"{stem}-{kind}-{tool}.txt").write_text(text)
        run(["pdftoppm", "-r", "144", "-singlefile", "-png", str(path),
             str(evidence_dir / f"{stem}-{kind}-144ppi")])
    assert command_results["source"]["pdffonts"] == command_results["exact"]["pdffonts"]
    assert command_results["source"]["pdfimages"] == command_results["exact"]["pdfimages"]
    left = Image.open(evidence_dir / f"{stem}-source-144ppi.png").convert("RGB")
    right = Image.open(evidence_dir / f"{stem}-exact-144ppi.png").convert("RGB")
    canvas = Image.new("RGB", (left.width + right.width + 40, max(left.height, right.height) + 75), "#e9e9e9")
    draw = ImageDraw.Draw(canvas)
    draw.text((10, 10), "Original Affinity PDF | original page boxes", fill="black")
    draw.text((left.width + 30, 10), "Exact-size review derivative | unchanged artwork", fill="black")
    canvas.paste(left, (10, 40))
    canvas.paste(right, (left.width + 30, 40))
    comparison = evidence_dir / f"{stem}-box-comparison.png"
    canvas.save(comparison)
    render_metrics = {"source_pixels": left.size, "exact_pixels": right.size,
                      "dpi": 144, "comparison": str(comparison)}
    if left.size == right.size:
        diff = ImageChops.difference(left, right)
        render_metrics["mean_absolute_rgb_difference_0_255"] = ImageStat.Stat(diff).mean
        render_metrics["note"] = "Small render differences are expected from the subpixel change of the upper page boundary; stream equality is the no-artwork-change proof."
    output_intents = reader.trailer["/Root"].get("/OutputIntents").get_object()
    intent_summary = []
    for ref in output_intents:
        intent = ref.get_object()
        profile = intent.get("/DestOutputProfile").get_object()
        intent_summary.append({"dictionary": str(intent), "profile_components": int(profile["/N"]),
                               "decoded_icc_sha256": sha(profile.get_data())})
    evidence = {"source": str(source), "output": str(output), "pypdf_version": pypdf.__version__,
                "source_sha256": sha(raw), "output_sha256": sha(normalized),
                "original_byte_prefix_preserved": True, "appended_bytes": len(normalized) - len(raw),
                "modified_page_keys": changed_keys, "changed_objects": changed_objects,
                "all_other_objects_unchanged": True,
                "source_effective_boxes": before_boxes, "exact_effective_boxes": after_boxes,
                "source_objects": before, "exact_objects": after,
                "output_intents": intent_summary, "render_comparison": render_metrics,
                "limitations": ["Review derivative only; no publisher approval or independently certified PDF/X conformance.",
                                "Only the page boundary is corrected. No artwork scaling, translation, image re-encoding, colour conversion or font alteration.",
                                "The right boundary is reduced by about 0.00133 mm and upper boundary by about 0.06867 mm; inspect edge content.",
                                "Source PDF/X identification and original metadata are retained as-is, not regenerated or recertified.",
                                "FOGRA39 remains a provisional working/output profile pending publisher instruction."]}
    evidence_path = evidence_dir / f"{stem}-box-normalization-evidence.json"
    evidence_path.write_text(json.dumps(evidence, indent=2) + "\n")
    print(json.dumps({"output": str(output), "evidence": str(evidence_path),
                      "comparison": str(comparison), "changed_objects": changed_objects,
                      "boxes": after_boxes, "output_intents": intent_summary}, indent=2))


if __name__ == "__main__":
    main()
