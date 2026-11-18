SẴN SÀNG KIỂM f9d10956 (branch review/item512-art)

# review-item512-art (art worker, Foreman C)
Scope asked: item512 for 22 "missing" items, then pet/veil/mark big pictures.

## Counts
- 22 items: 0 drawn, 0 credits. The list used old hyphen names; all 22 already exist as img/item512/item-<IT key>.webp (512x512 RGBA, HTTP 200). Mapping table in dev/PROGRESS_item512-art.md. Fix is in the kit helper kitItemBigSrc: build the src from the IT key (j98 itemArt already returns src512), not the old ITIMG name.
- Pets: 98/98 already have img/pet512/pet-*.webp (512). Nothing to draw; jpet petSrc(k,true) already points there.
- Veils: 10 pngs at 480x445, fitted to faces by veil-fit.json: not redrawn (see question).
- Marks: 8 redrawn at 512 px (gpt-2-6 from the existing small picture + remove-background), all looked at (dark + light), same design.

## Credits
8 x 40 (gpt-2-6) + 8 x 3 (background) = 344.

## CDN URLs (all 200)
https://ctm-img.victoria-tntt.workers.dev/img/mark512/me-mark-0.webp … me-mark-7.webp (new folder mark512, mirrors pet512; longest side 512, transparent; kit should use object-fit: contain; kmmSrc big variant -> img/mark512/me-mark-<r>.webp).
Log table, ids, contact sheets: dev/PROGRESS_item512-art.md, dev/art/item512-sheet/ on review/item512-art.

## Open questions
1. Veils: 480 px is probably enough (shown at about 300 CSS px); redraw would break veil-fit.json. Redraw only if the owner sees them soft.
2. econ pictures (jecon 114) not measured/identified: tell me their file pattern if they should be checked.
3. Marks mark512 is a new CDN folder name: kit keeper may rename.
