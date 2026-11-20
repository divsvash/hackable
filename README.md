# how hackable are you?

Piece 1, revised: a continuous serif reading experience, for review. Nothing is deployed.

## What exists

- A Next.js page configured for static export.
- Locally hosted Cormorant Garamond in regular, medium and italic, with its OFL license.
- A continuous article with illustrative values inline. No cards, numbered sections or separating lines.
- Pitch-black and off-white themes, bright pink accents, centered text.
- A working top-right theme switch. The selected theme stays for the browser tab's session.
- One explicitly labeled sample reading, using a documentation-only IP address.

This is not a scanner. It reads no device fingerprint, makes no IP lookup, contacts no diagnostic service, and requests no permissions. No endpoint or later layer is included. The sample reading is not the visitor's IP address.

## Run locally

Requires Node.js 20.9 or newer and npm.

```sh
npm ci
npm run dev
```

Open the local address printed by Next.js.

## Build the static page

```sh
npm run build
python3 -m http.server 8000 --directory out
```

Open http://localhost:8000. The included `out/` folder is already built and can be served without installing Node dependencies.

## Files

- `app/page.js`: visual composition and theme switch
- `app/globals.css`: responsive layout, colors, typography and reduced-motion handling
- `app/layout.js`: page metadata and session theme initialization
- `next.config.mjs`: static export configuration
- `package.json`, `package-lock.json`: locked dependencies and scripts
- `out/`: production static export
- `verify.mjs`: local screenshot and layout checks with Playwright; uses the locally installed Chrome path in this review environment

## Checked

Production build completed. Checked at 320, 390 and 1440 CSS pixels wide, with no horizontal page overflow. Theme persistence passed. Phone dark/light and desktop dark screenshots were visually inspected. Browser console showed no page errors during the checks.

## Scope boundary

This is the first visual direction, not the finished product. No live result or security grade is shown. Scan behavior, data handling, server diagnostics and later layers need their own review before implementation.
