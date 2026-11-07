# Option 1 — design and interaction verification

final result: passed

## Contact-links update — 25 September 2026

User-requested addition: WhatsApp +2348132566201, Facebook profile ID 100076036761505 and Instagram @coding_kids_africa. Added a plum floating WhatsApp link and readable footer phone/social links. Instagram's sharing query was removed without changing its profile. This intentionally extends the original footer design.

- Visual evidence: `design/qa/social-desktop.jpg` (1440 × 980 CSS viewport) and `design/qa/social-mobile.jpg` (390 × 844). Brand, spacing and typography remain consistent; phone layout stacks contact details and uses an icon-only floating button.
- Inspected all four rendered external anchors: correct URLs, accessible names, new-tab behavior and `noopener noreferrer`. No message was sent and no third-party profile contents were fetched.
- Zero horizontal overflow at widths 320, 390, 820, 1024 and 1440. Footer clearance keeps the floating button away from contact links.
- Floating WhatsApp link hides during native dialogs and returns after Escape. Final browser warning/error query returned an empty list.
- Two contact-configuration tests and all four existing worker/packaging tests passed. Production build passed.
- Source icons and licences included; all 29 UI assets are retained in the v2 developer package. Original package preserved separately.

Verified 24 September 2026. No actionable P0/P1/P2 findings remain for the scoped homepage prototype. This is a frontend design handoff, not a production launch or exhaustive accessibility certification.

## Source and comparison evidence

- Visual truth: `design/reference/option-1-approved.png`, selected Bright Futures — Brand Edition, 1086 × 1448 pixels.
- Implementation: `http://127.0.0.1:4173/`, default homepage, white/plum theme, no dialog open.
- Desktop CSS viewport: 1440 × 980, devicePixelRatio approximately 1. Content width 1425 CSS pixels after the browser scrollbar. Document height 1956 CSS pixels.
- Browser captures: `design/qa/desktop-top.jpg` and `desktop-bottom.jpg`, both 1425 × 970 pixels. Capture scaling is approximately 0.9898, not literal 1:1 CSS pixels.
- Full-view implementation: `design/qa/desktop-final.png`, 1410 × 1936. The full-page API failed, so this evidence joins two genuine viewport captures at observed scrollY 0 and 976. The 15-pixel captured scrollbar is removed; the lower capture begins at pixel 966. No UI content was retouched.
- Combined full-view comparison: `design/qa/comparison-final.png`. Source left; implementation right. Both normalized to 720-pixel content width, preserving aspect ratios. Small overall height differences remain from live typography/content wrapping.
- Combined focused comparison: `design/qa/comparison-services-final.png`. Source above; implementation below, at equal width scale. Shows headline, icons, service labels, descriptions and dividers.
- No separate mobile/tablet visual target was supplied. Adaptations are assessed for readability, hierarchy, coherent branding and usability rather than desktop pixel matching.

## Comparison history and resolved findings

1. **[P2, resolved] Typography/service density.** Initial combined `comparison-v1.png` showed tight headline spacing, comparatively small programme headline/icons and a wrapped summer-camp label. Increased display word spacing, enlarged programme heading/icons and reduced card padding. Final full-view/focused comparisons show clear two-line hero text, one-line desktop service labels and an even grid.
2. **[P2, resolved] Tablet hero composition.** `tablet-initial.jpg` showed a cramped split hero at 820 pixels. Added a stacked hero at 701–1100 pixels and a crop of the same artwork. `tablet-final.jpg` shows text separated from the photo without overlap; all images load.
3. **[P2, resolved] Narrow-phone horizontal scrolling.** `mobile-small-before.jpg` and DOM measurements showed 15 pixels of overflow at a 320-pixel viewport because the body minimum width ignored the scrollbar. Reduced minimum width and fitted the small-screen footer logo to its row. `mobile-small-final.jpg` shows the corrected school section/footer; fresh measurements show zero overflow at every tested width. Desktop composition is unaffected.
4. A temporary 404 for the newly generated mobile crop resolved after asset creation/reload. All eight page images now load at every tested width.

`desktop-initial.png`, `desktop-v2.png`, `desktop-v3.png` and `comparison-v2.png` are stale/invalid captures, excluded from the handoff ZIP and not used to pass QA.

## Five required fidelity surfaces

- **Fonts / typography:** Local Plus Jakarta Sans supplies the friendly geometric sans-serif treatment; logo keeps its serif identity. Heavy headlines, medium navigation and regular descriptions have distinct hierarchy. Intentional hero/school line breaks and final layouts do not clip text. Generated-source letterforms and browser antialiasing differ slightly.
- **Spacing / layout rhythm:** Preserves the white brand/navigation header, image-led hero, four service columns, plum school band and white footer. Gutters, paired actions, dividers and whitespace retain the reference hierarchy. Responsive two-column services and stacked mobile/tablet imagery remain readable.
- **Colours / tokens:** Brand plum #850b59, white, near-black headings and muted descriptions are consistent. Hover, focus, error and preview states are distinguishable. No unrequested gradients or decorative card system.
- **Image quality / fidelity:** Artwork retains the tutor/children/laptop and school-lab subjects. WebP derivatives are sharp at practical display sizes; originals are preserved. Horizontal logo is an AI-assisted raster adaptation, with the unmodified user logo retained. Official Phosphor icons use unchanged library paths; no handcrafted replacement SVG/CSS art.
- **Copy / content:** Represents all four services, including reuse of school computers, attached tutors and camps for NGOs/institutions/government. No invented prices, testimonials, enrolment counts, contacts or guarantees. Enquiry copy consistently says nothing is sent or stored on a server.

## Interaction and responsive checks

- All four service cards open the correct dialog; school CTA and summer-camp navigation work.
- Anchor navigation reaches the appropriate section. Mobile menu opens/closes and responds to Escape.
- Programme dialog CTA preselects the corresponding enquiry programme.
- Empty/invalid forms display errors and focus the first invalid input.
- School/camp enquiries conditionally require an organisation; home/online enquiries do not.
- Test-only input creates an accurate summary. Copy confirms a draft was copied, without claiming submission. Editing retains input; close/Escape dismisses the dialog.
- Text download is implemented with a local Blob; automated downloaded-file inspection was not performed.
- Native dialogs provide keyboard modality. Close controls, labels, focus indicators, alt text, skip link and reduced-motion styles are present. Full screen-reader/cross-browser certification remains outside scope.
- `enquiry-preview.jpg` shows the summary state; `mobile-programme.jpg` records a mobile service dialog.
- Final screenshots: `mobile-final.jpg`, `mobile-programmes-final.jpg`, `mobile-small-final.jpg`, `tablet-final.jpg`, `desktop-final.png`.
- Fresh measurements in `design/qa/responsive-checks.json`: widths 320, 390, 820, 1024 and 1440; zero horizontal overflow and all page images loaded.
- Final browser warning/error log query returned an empty list.
- Production build passed; all four packaging/worker tests passed.

## Acceptable differences / P3 follow-up

- Photography is an illustrative recreation, not identical source pixels or evidence of real staff/pupils. Crops/plum art edges differ modestly while retaining composition.
- Official library icons differ slightly from the generated source; consistency and licensed reusable files are preserved.
- Footer uses an explicit accessible “Back to top” control instead of the decorative dash.
- Obtain an approved vector brand master for production if available; preserve the user-supplied original.

## Production implementation checklist

- Connect an approved enquiry backend/contact destination with secure validation and spam protection.
- Confirm business details, availability and privacy wording.
- Approve adapted brand artwork and generated photography, or supply licensed replacements.
- Perform cross-browser, screen-reader and production security checks.
- Build additional pages and options 2/3 only when requested; retain option 1 separately for comparison.
