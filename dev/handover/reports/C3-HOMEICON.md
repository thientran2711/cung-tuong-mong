# C3-HOMEICON report (art worker, K-ICO-HOME)

PRIORITY #1 CHECK: OD 25/11 ~23:40Z k17 (home icon) | main none (CDN img/place-home.webp was 404) | review/kit-stage-r2 919f6c1b (kitMapBanner «⌂ Nhà ta» glyph stand-in) | claims none | CDN index had place-{acs,cnh,cung,dc,ksp,lc,tgk,ttp,vuon}, no home.

## Result
- NEW `img/place-home.webp` — 128x128 RGBA WebP, 8.7 KB, content bbox (7,17)-(121,126), bottom-aligned like the other place icons.
  https://ctm-img.victoria-tntt.workers.dev/img/place-home.webp
- Subject: compact Chinese palace courtyard gate-house, gold-tiled roof, red lacquer pillars, both red doors open on a warm lantern-lit hall, red paper lantern at the eave, peony-carved balustrade, stone steps. No people, no text, not Japanese.
- Contact sheet (place-cung | place-vuon | place-home; 128 px + 16/14 px; parchment + dark): https://ctm-img.victoria-tntt.workers.dev/img/_review/c3-homeicon/sheet.png (sheet is NOT wiped; verdict giver runs `cdn_sync.py --wipe-review c3-homeicon`).
- Looked at: edges clean on parchment and dark (no halo); at 14–16 px reads as a lit red gate-house, distinct from the gazebo (cung) and moon-gate (vuon).

## Method / credits
- gpt-2-6, folder ba4aecfe…, 1k, 3 options with place-cung + place-vuon as image references (style match) = 240 cr; picked option 1 (clearest open doors + glow); images_remove_background 3 cr. TOTAL 243 cr (budget ~400).
- Resized to fit 114x124 box, bottom-aligned, WebP q90. Uploaded with dev/site/cdn_sync.py; index rebuilt by the tool (v=0ebd8c1a8262).

## For KK38 (kit keeper)
Wire the slot `place-home` (IMG_BASE + img/place-home.webp) in the Dư đồ views; no code changed here. Rejected options 2/3 are stored nowhere.

## Handover
None needed; job complete. ~100% xong cho slot ảnh / ~0% chơi được cho tới khi KK38 nối.
