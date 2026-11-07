# Prototype Instructions

## Coding Kids Africa — option 1

- Build only the first, most recently displayed plum-branded option. Keep this project separate from future options 2 and 3 for page-by-page comparison.
- Source of visual truth: `design/reference/option-1-approved.png`.
- Preserve the supplied logo, deep plum/white/black palette, all four service offers, and large readable text.
- Male subjects should have neat, conservative short low cuts without decorative shaved lines. Preserve female hairstyles and facial identities. See `design/haircut-update.md` for the 4 November 2026 asset revision.
- Save all UI assets locally for developer handoff. Keep original images and licences as well as production derivatives. Do not rely on remote CDNs for fonts or images.
- This is a frontend homepage prototype with programme dialogs and an enquiry draft preview, not a live enquiry submission. Do not invent contact information or imply a message was sent.
- Approved contact destinations are in `src/contact.js`: WhatsApp +2348132566201, Facebook profile ID 100076036761505, Instagram @coding_kids_africa. Use a brand-plum floating WhatsApp button plus readable footer contact/social links; these open external services without automatically sending anything.

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
