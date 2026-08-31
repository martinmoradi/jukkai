# Crystelle business-card QR codes

These are the canonical, reproducible QR assets for Crystelle's business card.
The payload is locked because printed cards cannot be changed after production.

- Payload: `https://jukkai.fr/c/crystelle`
- EC-M: default plain-module business-card variant
- EC-H: optional variant for a centered Jukkai seal; verify the composed design
  still scans before print
- Ink: `#1D1D1B`
- Background: transparent
- Quiet zone: 4 modules
- Generated: 2026-08-31

Each variant has an SVG print master and a PNG convenience export of at least
1000 px. Regenerate every file from the repository root with:

```sh
bun run qr:generate
```

The generator is preserved under [`../source/qr-codes/`](../source/qr-codes/).
The `/c/crystelle` redirect is the only place where the destination may change;
never change the encoded payload to update that destination.
