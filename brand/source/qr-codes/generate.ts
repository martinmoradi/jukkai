import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

import encodeQr from 'qr';
import sharp from 'sharp';

export const BUSINESS_CARD_QR_PAYLOAD = 'https://jukkai.fr/c/crystelle';

const INK = { alpha: 255, blue: 27, green: 29, red: 29 } as const;
const MIN_PNG_SIZE = 1_000;
const QUIET_ZONE_MODULES = 4;
const REPO_ROOT = dirname(
  dirname(dirname(dirname(fileURLToPath(import.meta.url)))),
);
const DEFAULT_OUTPUT_DIR = join(REPO_ROOT, 'brand', 'qr-codes');
const VARIANTS = [
  { ecc: 'medium', level: 'm' },
  { ecc: 'high', level: 'h' },
] as const;

export async function generateBusinessCardQrAssets(
  outputDir = DEFAULT_OUTPUT_DIR,
) {
  await mkdir(outputDir, { recursive: true });

  await Promise.all(
    VARIANTS.map(async ({ ecc, level }) => {
      const matrix = encodeQr(BUSINESS_CARD_QR_PAYLOAD, 'raw', {
        border: QUIET_ZONE_MODULES,
        ecc,
      });
      const pixelsPerModule = Math.ceil(MIN_PNG_SIZE / matrix.length);
      const size = matrix.length * pixelsPerModule;
      const pixels = new Uint8Array(size * size * 4);

      for (let moduleY = 0; moduleY < matrix.length; moduleY += 1) {
        for (let moduleX = 0; moduleX < matrix.length; moduleX += 1) {
          if (!matrix[moduleY]?.[moduleX]) {
            continue;
          }

          paintModule({
            moduleX,
            moduleY,
            pixels,
            pixelsPerModule,
            size,
          });
        }
      }

      const png = await sharp(pixels, {
        raw: { channels: 4, height: size, width: size },
      })
        .png({ compressionLevel: 9, palette: false })
        .toBuffer();
      const svg = encodeQr(BUSINESS_CARD_QR_PAYLOAD, 'svg', {
        border: QUIET_ZONE_MODULES,
        ecc,
      }).replace('<svg ', '<svg fill="#1D1D1B" shape-rendering="crispEdges" ');

      await Promise.all([
        writeFile(join(outputDir, `jukkai-crystelle-qr-ec-${level}.png`), png),
        writeFile(
          join(outputDir, `jukkai-crystelle-qr-ec-${level}.svg`),
          `${svg}\n`,
        ),
      ]);
    }),
  );
}

function paintModule(params: {
  moduleX: number;
  moduleY: number;
  pixels: Uint8Array;
  pixelsPerModule: number;
  size: number;
}) {
  const { moduleX, moduleY, pixels, pixelsPerModule, size } = params;
  const startX = moduleX * pixelsPerModule;
  const startY = moduleY * pixelsPerModule;

  for (let y = startY; y < startY + pixelsPerModule; y += 1) {
    for (let x = startX; x < startX + pixelsPerModule; x += 1) {
      const offset = (y * size + x) * 4;
      pixels[offset] = INK.red;
      pixels[offset + 1] = INK.green;
      pixels[offset + 2] = INK.blue;
      pixels[offset + 3] = INK.alpha;
    }
  }
}

if (import.meta.main) {
  const { values } = parseArgs({
    options: {
      output: { type: 'string' },
    },
  });

  await generateBusinessCardQrAssets(values.output);
  console.log(
    `Generated Crystelle business-card QR assets in ${values.output ?? DEFAULT_OUTPUT_DIR}`,
  );
}
