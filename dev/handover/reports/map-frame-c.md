# map-frame-c — Dư đồ "họa đồ chú thiêm" (direction C), FINAL
Owner 16/11: map picture stays; style C APPROVED ("kiểu C là đã ok rồi"). Base: origin/main 7c5523ad; nothing touched on main; no PR. Branch review/map-frame-c.

## Delivered
- Art (Magnific gpt-2-6, 3 slips + 2 cartouches painted, every image looked at; palest slip + cleaner cartouche kept, slip blended 28 % toward #fffaec):
  CDN LIVE (HTTP 200, index rebuilt via cdn_sync put/write_index): `img/kit/mapslip.webp` 360x84 4006 B (9-slice slip), `img/kit/mapslip-cartouche.webp` 560x145 8790 B ("Dư đồ" plate, text from CSS).
- Look: no frame (map full-bleed, 1 px muted-gold hairline), hall names on pale yellow paper slips (13 px, same size class as the old chip), small "Dư đồ" cartouche, tools (−, +, Ra vào, Danh sách) in a slim paper band ABOVE the map inside the window (cannot cover a label by construction; fixes Fold "Trường Môn viện").
- Owner addition: dark people-count chip `.msil` removed everywhere; the text row "N bóng · K khắc" is the one info line.
- Sample sheet: `map-frame-c/sheet-map-frame-c.jpg` (iPad 1180x820@2 + Fold 755x1000@2, live Dư đồ, real hall names). Mock CSS/JS/harness: `map-frame-c/mock-c.css`, `mock-c-fit.js`, `mock-harness.js` (MODE=scan).

## Faults found by Foreman C on the first sample, fixed (whole group)
1. Overlap: shared `mapFit` (j38) tested only `.mlab`; rows hang below and were untested → already 5 overlapping pairs on main at iPad default zoom. Fix = test union of `.mlab+.mmeta` per place, cap fit+3.5. Scan 4 zooms x iPad/Fold: 0 overlaps everywhere (before: iPad z+0 5; after: 0). iPad floor 1.25→1.75.
2. Clipped at the pan edge: 14 px edge fade mask on `.mapsc` (a pannable map always has half-visible labels; the cut is hidden).
3. Fold catch: kit hides `.mmeta` on Fold (.kv1); with `.msil` gone Fold would lose the count. Mock shows the row on all devices; Fold floor 1.76→2.76. Decision for keeper/owner (see KIT REQUEST).

## KIT REQUEST (full text, also in dev/kit/KIT_REQUESTS.md, section "map-frame-c worker")
Replaces: kitLeather frame on the Dư đồ (§34.1b), place chip `.mspot .mlab` + `.mmeta` (§34.1d), tools overlay `.maptools`. Used at: Dư đồ labels (all kinds: locked, .awalk, .here, .empty), palace detail `.kpm-spot` (D30 kitPalaceMap), kitBookSpread `double`. NOT slips: `.mtile b`, `#sc-t h2`.
Slip: `border:solid transparent;border-width:3px 7px;border-image:url(mapslip.webp) 20 22 fill/3px 7px stretch;border-radius:0;padding:0 1px;box-shadow:none;filter:drop-shadow(0 1px 1px #3a2a1e66);color:#2a1a12` (13 px display serif 600). Row `.mmeta`: same asset, width 3px 6px, 12 px, ink #4a3a2a.
Cartouche: `.maptools::before{content:"Dư đồ"}` 92x26 (phone 80x24), `url(mapslip-cartouche.webp) 0 0/100% 100%`, `600 14px/1 var(--display);letter-spacing:.14em`.
Hairline: `.mapsc{outline:1px solid #b79a5bcc;outline-offset:-1px;border-radius:0;box-shadow:none}`. Frame off: `.kleather{padding:0;background:none;clip-path:none;border:0;box-shadow:none;filter:none;mask:none;display:flex;flex-direction:column}` + hide ::before/::after/.kl-tone/rolls/stitch.
Tools band: `.kleather>.maptools{position:static;order:-1;flex:none;display:flex;align-items:center;justify-content:space-between;height:38px;padding:0 6px 0 8px;background:#f7efd6;border-bottom:1px solid #b79a5b99}`; buttons min-height 28, #fffaf0 + 1 px #c9a35a, radius 6.
Edge fade: `.mapsc{mask-image:linear-gradient(#0000,#000 14px,#000 calc(100% - 14px),#0000),linear-gradient(90deg,#0000,#000 14px,#000 calc(100% - 14px),#0000);mask-composite:intersect}`.
Reviewer: no custom chip; ink contrast ≥ 10:1; wording unchanged (VANPHONG, no %).

## Self-check vs art rules
Painted, never code-drawn (CSS only slices the painting); WebP at display size, 4 KB + 9 KB; static, no perf cost; no hex of other game art copied; looked at every image. Honest limits: mock CSS injected into the live page, not built into the kit; palace detail map (`.kpm-spot`) not mocked (same slip, keeper to apply); phone viewports not re-shot (same 13 px rule, scan before merge).

KIT READY-for-keeper. ~90% xong / ~0% chơi được (the keeper builds it).
