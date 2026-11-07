# Coding Kids Africa — Option 1

Responsive, interactive frontend based on the selected “Bright Futures — Brand Edition” homepage. This project is kept separate from future options 2 and 3 for comparison.

## Start locally

Requires a current Node.js LTS release and npm.

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 4173
```

Open http://127.0.0.1:4173/. The local preview is not a public website.

## Build

```sh
npm run build
npm run test:sites
```

The browser build is in `dist/client`. The included Sites-compatible Worker and hosting metadata are generated in `dist/server` and `dist/.openai`. No deployment has been performed.

## Included functionality

- Homepage matched to the selected plum/white design.
- Four programme-detail dialogs: home lessons, online lessons, school coding hubs and summer camps.
- Anchor navigation and a keyboard-accessible mobile menu.
- Enquiry draft form with programme preselection, conditional organisation field, validation, editable preview, copying and a text download.
- Responsive desktop, tablet and phone layouts; reduced-motion support.
- Brand-plum floating WhatsApp button, readable WhatsApp number, and Facebook/Instagram footer links.

## Contact links (added 25 September 2026)

The user-approved destinations are maintained in `src/contact.js`:

- WhatsApp: +234 813 256 6201 — `https://wa.me/2348132566201`
- Facebook: `https://www.facebook.com/profile.php?id=100076036761505`
- Instagram: `https://www.instagram.com/coding_kids_africa/` (sharing parameter removed)

These links open external services in a new tab; they do not automatically send a message or submit enquiry-form contents. The floating button hides while a dialog is open and becomes icon-only on smaller screens. All three official Phosphor social-icon SVGs are included under `public/assets/icons/`. Their original `currentColor` fill is preserved. Run `node --test tests/contact.test.mjs` to verify destination configuration.

## Important: enquiry preview only

The enquiry flow does **not** send messages, persist data or connect to a backend. Form values exist only in component memory and are cleared when the dialog is closed. Copy/download actions happen locally, only when requested by the visitor. The preview screens explicitly say the enquiry has not been sent. There is no invented email address, telephone number, price or response-time guarantee.

Before launch, connect the form to an approved backend/contact destination, add the organisation's actual privacy notice, confirm programme availability and business details, and review consent/security requirements for any data collection. The form asks for adult contact details, not children's personal information.

## Where everything is

- `src/App.jsx`: layout, navigation, programme dialogs and enquiry interactions.
- `src/programmes.js`: all four service descriptions.
- `src/styles.css`: responsive styling, colour tokens, typography and states.
- `public/assets/`: every UI image, local font and exported icon.
- `design/originals/`: full-resolution generated artwork and the untouched supplied logo.
- `design/reference/option-1-approved.png`: selected design target.
- `design/licenses/`: font and icon licences.
- `design/asset-manifest.json`: provenance, dimensions and usage notes.
- `design/tokens.json`: key design values.
- `design/image-prompts.md`: generation prompts and method.
- `design/qa/` and `design-qa.md`: visual comparison and verification evidence.

All runtime artwork, fonts and icons are local. The site does not depend on an image CDN or Google Fonts requests.

## Brand and imagery

Updated 4 November 2026: male subjects now use neat short low-cut hairstyles. The active desktop/mobile hero and school photograph use `*-neat-cut.webp` files. Previous images and the new full-resolution edited PNGs are retained. See `design/haircut-update.md` for filenames and editing notes.

The original user-supplied JPEG is preserved as `public/assets/logo-original.jpg` and `design/originals/logo-user-supplied.jpg`. The horizontal website logo is an AI-assisted raster adaptation of that supplied identity, not a vector master. Retain the original; use an approved SVG/EPS brand master for production if available.

The two photographs are AI-generated illustrations, not claims that the pictured people are actual staff or pupils. Their original PNGs and optimised WebP derivatives are included. The responsive hero is a crop of the same illustration.

UI font: [Plus Jakarta Sans / Fontsource](https://fontsource.org/fonts/plus-jakarta-sans/about), SIL Open Font License. Icons: [Phosphor](https://github.com/phosphor-icons/react), MIT. Standalone SVGs preserve the library paths; only the colour is set to the brand plum. The serif lettering belongs to the supplied/adapted raster logo.

## Comparison scope

This package contains option 1's homepage and its main programme/enquiry flow only. Other options are kept in separate projects. Use equivalent content and interactions for fair comparisons.
