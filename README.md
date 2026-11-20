# How hackable are you?

Layer 2 local review build. The public repository contains the 27 approved Layer 1 commits. Layer 2 changes in this archive are local and unpushed pending approval. No website has been deployed.

## Built locally

The approved continuous Cormorant Garamond essay, pitch-black/off-white switch and inline pink readings remain. Checks start on page load; the app has no reveal buttons.

- Public IP, approximate region/country, listed network provider and ASN, through one request to ipapi.co.
- Browser-reported language preferences, time zone, CSS screen dimensions and pixel ratio.
- Reported user-agent/platform, logical processors available to the browser, rounded memory estimate and graphics-driver renderer label. No exact browser, OS or physical GPU identification is claimed.
- Fixed canvas-pixel and short offline-audio sample digests using SHA-256. No sound is played. No microphone is opened. These are outputs of specified tests, not proven unique or stable identities.
- Local WebRTC ICE candidates, classified as visible IP or mDNS hostname. An empty ICE-server list means no external STUN or TURN. This is not a public-route or VPN-leak test.
- Browser connection type where reported, effective performance class, rounded downlink/RTT estimates and actual page protocol. A 4g performance class does not establish cellular or Wi-Fi. Performance is not a safety score.

## Not measured

No negotiated TLS cipher/version, JA3/JA4, passive TCP fingerprint, authoritative DNS-resolver test, open-port scan, router encryption check, malware check or confirmed VPN detection. No security grade or hack-probability score. No later habit/phishing/breach layers.

TLS ClientHello data needs a diagnostic service observing the actual TLS termination. Passive TCP inference needs packet visibility. Resolver attribution needs a controlled authoritative DNS setup and delegated domain. None is supplied by a Next.js static export.

## Privacy and behavior

The one external HTTP request is https://ipapi.co/json/. It omits credentials and referrer and has an eight-second timeout, no retry loop. The provider receives the public IP and ordinary browser request headers, and may log them under https://ipapi.co/privacy/.

Other results stay in page memory and are not attached to the IP request. No canvas/audio data or digests are uploaded, persisted or combined into an identity. Theme preference alone uses session storage. Local WebRTC gathering is bounded to three seconds and closes its peer object; no remote peer is connected. Offline audio rendering is bounded to 2.5 seconds. Unavailable readings do not become safe verdicts.

## Run

Requires Node.js 20.9+ and npm.

```sh
npm ci
npm run dev
```

Or use the included production export:

```sh
python3 -m http.server 8000 --directory out
```

Open http://localhost:8000. To regenerate `out/`, run `npm run build`. Local HTTP is truthfully labeled HTTP by the page; a browser treating localhost as a secure context does not make its transport HTTPS.

## Tests

```sh
node --test '*.test.mjs'
npm run build
node verify.mjs
node verify-l1.mjs
```

Browser scripts use `/usr/bin/google-chrome`; adjust the executable path for your machine. The review screenshots use a simulated reserved IP response and actual settings of a test browser, not the user's real readings.

Checked: 31 unit tests; production static export; 320/390/1440px layouts; theme persistence; full-length IPv6 wrapping; IP rate-limit/error fallback; unavailable graphics/audio/WebRTC fallback. Browser instrumentation saw one external ipapi GET with no measurement body, no camera/microphone or geolocation API calls, and no page errors. Both themes and focused phone captures were visually inspected. Tests do not establish compatibility with every browser or privacy extension.

## Main files

- `app/page.js`: continuous essay and inline readings
- `app/browser.mjs`, `device.mjs`, `fingerprint.mjs`, `connection.mjs`, `rtc.mjs`, `lookup.mjs`: individual measurement modules
- `app/globals.css`, `app/layout.js`: styling, theme initialization and metadata
- `public/fonts/`: local fonts and OFL license
- `*.test.mjs`: unit tests
- `verify.mjs`, `verify-l1.mjs`: browser regression checks
- `next.config.mjs`, `package.json`, `package-lock.json`: export configuration and dependencies
- `out/`: production static export

## Sources

- https://ipapi.co/api/
- https://ipapi.co/privacy/
- https://developer.mozilla.org/en-US/docs/Glossary/Fingerprinting
- https://developer.mozilla.org/en-US/docs/Web/API/Navigator/languages
- https://developer.mozilla.org/en-US/docs/Web/API/Screen/width
- https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/resolvedOptions
- https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent
- https://developer.mozilla.org/en-US/docs/Web/API/Navigator/deviceMemory
- https://developer.mozilla.org/en-US/docs/Web/API/Navigator/hardwareConcurrency
- https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_debug_renderer_info
- https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext
- https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
- https://developer.mozilla.org/en-US/docs/Web/API/RTCIceCandidate/address
- https://developer.mozilla.org/en-US/docs/Web/API/RTCIceCandidate/type
- https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/icecandidate_event
- https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation
- https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/rtt
- https://developer.mozilla.org/en-US/docs/Web/API/Window/isSecureContext
- https://consumer.ftc.gov/articles/are-public-wi-fi-networks-safe-what-you-need-know

## Layer 2: optional habits, not an automatic scan

The essay continues into public Wi-Fi, charging and unfamiliar USB accessories. Three optional inline selections tailor advice, default to unknown, stay in React page memory and reset on reload. Reading all guidance requires no interaction. There is no habit score or claim that this page detected physical accessories or prior behavior. No requests are sent when answers change.

Public Wi-Fi copy distinguishes phishing from decrypting correctly protected HTTPS. Charging guidance describes a possible attack path without claiming it is common or that a connected port is malicious. CISA's discussion of unconfirmed juice-jacking reports is explicitly attributed to 2023. Unknown USB advice does not claim every insertion compromises a device.

New files: `app/Habits.js`, `app/habits.mjs`, `habits.test.mjs`, `verify-habits.mjs`. Run `node verify-habits.mjs` to check optional defaults, all answer paths used by review screenshots, no answer-related requests, reset-on-reload, theme persistence and no overflow at 320/390/1440px.

Sources:
- https://www.cisa.gov/resources-tools/training/protect-physical-security-your-digital-devices
- https://www.cisa.gov/news-events/news/applying-secure-design-thinking-events-news
