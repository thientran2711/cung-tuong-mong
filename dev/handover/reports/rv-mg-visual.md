# rv-mg-visual — REVIEW of review/mg-visual d9800e60 → verdict PASS bb5a84b7 (review/mg-visual-rv)
PRIORITY #1 CHECK: OD 20/11 ~05:10Z + ~06:30Z | main BAL.mgFx (was none) | review/mg-visual only | claims mg-visual Lez7azLX.
18 laws touched: ONE CORE (4), KIT FIRST (9), FIX THE WHOLE GROUP (11), TWO DEVICES (12), CỔ TRANG (7) — all hold.
## Checks
- ONE source: BAL.mgFx in jbal2.js (pop 1.24, ms 300, glow #fff0a0, ring white, blur 44, pass 3, ringW .07). Read by j82 (kg82Spr/FxPop/FxRing), j91, jlant, jtd. No private scale left (grep 1.08/1.35/1.14 patterns: none); lamp/jlant use the same keys.
- Look (LOOKED, Fold 755x1000 + iPad 1180x820, scratch only, nothing in git/CDN): Múa pressed cushion = ~1.24x bigger + gold glow + ring vs unpressed (side by side crop); td_dung held = ring+glow on the bowl, NO yellow box; Đàn (rhythm) = ring + pop on bridge, no yellow column; Nấu ăn = recipe pictures + flames, no words; tested engines also steps/rhythm/aim/lamp via mg-visual.
- Nấu ăn 0 words in play (mg-visual gate: banh `-`). Other kinds' words = mg-noword-a/b scope (not this branch).
- Touch flash scan: fillRect-on-touch scan in all engines by worker; td_dung half-screen rect and rhythm column removed; remaining td_dung stag flash is a state flash (spill), not touch.
- Kit-only: no new CSS/frames; only canvas fx + `-webkit-tap-highlight-color` in #kg82.
## Tests (merged onto origin/main 37e4a68f; index.html/sw.js rebuilt by build_site.sh)
mg-visual ALL OK · mg-ready-guide PASS 9/9 · ag-mgcal EXIT 0 (all ok) · quickcheck PASS (open 1720 ms, old save ok, perf new/live render 239/235, tab 462/454, buổi 1297/1125, tasks>200 20/19).
## Non-blocking notes (for follow-up, not FAIL)
1. Múa top cushion at full pop touches the canvas top edge on Fold: top of glow/ring slightly clipped. Fix = a few px top margin in kg82 mua layout (or clamp pop at edge).
2. Múa cushions still carry painted words (Giơ tay áo…) — mg-noword scope.
3. Shots not uploaded (scratch only), nothing to wipe on CDN.
