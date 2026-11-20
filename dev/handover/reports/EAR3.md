# EAR3 — dây chuyền trên áo CỔ VUÔNG (owner 20/11 urgent: "lấy một cô gái mà áo cổ hở này nè, đeo dây chuyền thử")
depth 4 · START_CTX ~3 % (1M window; get_session read 0, estimate) · worker of Foreman C ROOT-69 · roll line ~28 %, not reached

Page: dev/art/necklace-square/necklace-square-demo.html (544 KB, self-contained) — title «Thử dây chuyền — áo cổ vuông».
Two cards: s62 t1 Đáp ứng cổ vuông kiểu 1 (approved, gen xSBeugTjfW) and s62 t2 cổ vuông kiểu 2 (gen 8ai9BR2IrU).
Big button «Đeo / Tháo dây chuyền»; views «Toàn thân», «Nửa người», «Cận cổ» (opens on Cận cổ, necklace on).

## How (0 credits, 0 gens)
- Necklace = the EXISTING EAR2 sprite (sprites/necklace_src.png, gen Lw8dkBzswO → cut cpSLnHG0eP). Nothing new painted.
- fit_necklace.py: the chain is RE-LAID along a hand-placed curve on her neck base/collarbones (inverse strip warp by arc length, one uniform
  scale 0.24 → pearls stay round, links not stretched). Pendant (gold flower + jade drop) at the same scale, hanging straight down on the
  upper chest, above the neckline edge. Chain tips fade where they turn behind the neck. Soft warm contact shadow (offset 2 px, blur 1.3).
- Everything is clipped to a skin mask = skin colour inside a hand-drawn polygon of the square opening → the chain goes under the hair,
  under the shoulder straps and behind the neck by itself; t2's hand at the neckline is excluded by the polygon.
- No bg removal / SAM: the pictures sit on a plain backdrop and the colour mask was clean, so the cut-out was not needed (saves credits).
- Params per picture: fit_params.json (pendant point, left/right curve points, opening polygon, zoom centre).
- LOOKED at 3x after each round: r1 had stray streaks past the curve ends + white fringe (double un-premultiply) → fixed; r2 pendant drop on
  t2 overlapped the trim → raised; t1 left chain went under the strap too early → steeper curve along the hair edge. Final: natural on both.

## Files
dev/art/necklace-square/: fit_necklace.py, fit_params.json, preview.py, page.src.html, build_page.py, shots.js, out/ (base webp, neck overlay
png, skin masks, fit.json), screenshots/{fold,ipad}_page.png, {fold,ipad}_{t1,t2}_close_{on,off}.png, _half_on.png, fold_{t1,t2}_off_vs_on.png.
Rebuild: python3 fit_necklace.py && python3 build_page.py && node shots.js

## Open
- Owner verdict. If OK, the same 0-cr fit works for any open-neckline picture (≈5 min hand points each: pendant point, 2 curves, polygon).
