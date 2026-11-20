# How hackable are you?

Piece 1: one automatic public-IP reading inside the approved continuous serif article. Nothing is deployed or pushed.

## What works

- Next.js static export, with Cormorant Garamond bundled locally under the included OFL license.
- Pitch-black and off-white themes, pink keywords, centered reading flow. No cards, dividers, tabs or reveal buttons.
- The top-right theme switch remembers its state for the browser tab session.
- On load, one request to https://ipapi.co/json/ resolves the public IP, approximate region/country, listed network provider and ASN.
- Results arrive inline with an eight-second timeout, response validation and a plain-language failure state. Missing values remain unknown. No retry loop.
- No cookies or referrer are sent with the lookup. Results stay in page memory. The provider receives the IP to answer and may keep request logs under its privacy policy: https://ipapi.co/privacy/.

This is not a complete scanner or a security assessment. It cannot expose a hidden IP behind a VPN, prove identity, establish GPS location or grade network security. No device fingerprinting, STUN, TLS endpoint, DNS test or later layer has been implemented. Browser-fingerprint paragraphs are explanatory copy, not claims that this piece measured those signals.

## Run

Requires Node.js 20.9+ and npm.

```sh
npm ci
npm run dev
```

Open the local address Next.js prints. Or build and serve:

```sh
npm run build
python3 -m http.server 8000 --directory out
```

The included `out/` directory is already built and can be served without installing Node dependencies. Open http://localhost:8000.

## Test

```sh
node --test lookup.test.mjs
node verify.mjs
```

`verify.mjs` needs Chrome at `/usr/bin/google-chrome` or an adjusted executable path. It first checks the actual provider, then intercepts its response with reserved example data for deterministic screenshots and tests a rate-limit response. Screenshots explicitly say the response is simulated. No visitor IP or location is included in the review captures.

Checked: full-length IPv6 results wrap at phone widths; seven unit tests; live browser request answered; 320/390/1440px layouts without overflow; tab theme persistence; HTTP 429 fallback; no page errors. Final phone dark/light renders visually inspected.

## Files

- `app/page.js`: continuous article, loading/result/error UI, theme switch
- `app/lookup.mjs`: request options and response validation
- `app/globals.css`: responsive serif styling and reduced-motion support
- `app/layout.js`: metadata and initial theme
- `public/fonts/`: local fonts and license
- `lookup.test.mjs`, `verify.mjs`: unit and browser checks
- `next.config.mjs`, `package.json`, `package-lock.json`: export configuration and dependencies
- `out/`: static production build

IP geolocation documentation: https://ipapi.co/api/.
Fingerprinting background: https://developer.mozilla.org/en-US/docs/Glossary/Fingerprinting.
