PRIORITY #1 CHECK ('Dư đồ.*(blank|trống)|map view blank|du-do-blank|dudo.*blank'): OD 3 (= 16/11 "A ca sở" label placement, a different bug) | ledger 0 | claims 3 (= D's 19:08Z ticket only) | main 0 | review/* 0 → nobody on it (MAIN s37 order 20:24Z).

# dudo-blank — Dư đồ map blank while the painting loads (SMALL, UI/layout only)

Branch **review/dudo-blank** on origin/main 60b0e3bf, head f59c965a61e5cb533d44f616f2c0d43e24343b80. START_CTX ≈ 8 %; ended ≈ 45 %, no rollover.

## Reproduce (real or harness artefact?) — REAL, for a player on a slow / cold CDN
- Warm / fast CDN, Fold 755x1000@2 (mobile and non-mobile ctx), Fold cover 412x1058@2, iPad 1180x820@2, 1366x1024@2: map paints (26–29 of 29 spots in view, 38/38 pictures) after 0.1–5.6 s (cold CDN) — not blank.
- Picture delayed 6 s (`dev/test/dudo-slow.js`, the real slow-network case): **live main FAIL** — `.mapw` is 1029 x **0** px for the whole delay, the 29 labels sit in a collapsed strip over paper (screenshot looked at: empty sky/paper, 4 labels floating mid-screen, "Thái…" cut at the right edge). Same on the branch base. This is the reviewer's "blank after 7 s, art 18/37".
- Courtyard detail map (Ngọc Thanh các), picture delayed: the frame kept its box (r3 fix in jpm) but the map was not scrolled to centre until the picture arrived → its title slip "Ngọc Thanh các · N bóng người" sat at x≈1163, UNDER the right card column (looked at).

## Root cause
`.mapw` (p1.html:345) took its height only from the `<img>` (height:auto). Before the picture has loaded the img is 0 px high, so the % hotspots collapsed. mapFit also assumed 1.792 for every frame before load. The detail map centred itself once at render (layout not ready) and again only on image load.

## Fix (whole family) — KIT-first, one place
| file:line | before | after |
|---|---|---|
| dev/build/p1.html:345 `.mapw` | `position:relative;min-width:100%` | + `aspect-ratio:1792/1000` (frame keeps its 1792x1000 box while loading) |
| dev/build/j38.js:18 mapFit `asp` | fallback 1.792 always | fallback 1.76 for `.kpmv` (same box as jpm.js:146), 1.792 Dư đồ |
| dev/build/jmapc.js:84 detail centring | centre at render + on image load | + centre again on the next 2 frames |
| dev/kit/KIT.md §85.9 | — | rule + tests documented |
Family scan (every map / large canvas / pan-zoom stage in dev/build): `.mapw`+`.mapimg` has exactly two users — Dư đồ (j27.js:70) and the courtyard detail (jpm.js:76, already boxed 1.76:1, r3). Other zoom hits (j59 popw, j79/j93 panels, jbook .kbs-in) are scroll panels with text, not picture stages; room scenes use CSS background-image (no collapse). Nothing else can collapse.
Title vs −/+ overlap: not reproducible as a separate bug on the loaded map (`dev/test/dudo-title.js`, 755/412/1180/1366, mobile + non-mobile: "Dư đồ" cartouche and the −/+/Ra vào/Danh sách row 0 overlaps; detail view hides the tools row). Most likely the same collapse (labels of her own place stacked at the top under the −/+ row) — gone with the fix. If the owner still sees a different overlap, send the exact state.
No KIT REQUEST needed (existing part edited in place). Tier: SMALL (CSS box + two fallbacks, no time/layout core, no rules, no BAL, no wording).

## Tests / gates (on f59c965a61e5cb533d44f616f2c0d43e24343b80)
- NEW `dev/test/dudo-blank.js` (spots painted + art loaded within N s, 4 sizes): 4/4 PASS (0.07–0.5 s warm).
- NEW `dev/test/dudo-slow.js` (picture delayed 6 s / failed): Fold + iPad PASS (frame 1029x574 / 958x535 from the first frame, 26–29 spots in view); `DETAIL=1` PASS (map centred, title slip in view). Before the fix: FAIL (h 0).
- NEW `dev/test/dudo-title.js`: PASS 4 sizes x (mobile, non-mobile). NEW `dev/test/dudo-detail-scan.js` (opens every spot; scratch tool).
- one-core-guard 0 fails; coregates PASS (rules-one-source, kit-conform, coop one-world); time-spill guard PASS.
- quickcheck.sh PASS twice. Median of 3: render 148/133, tab 271/281, buổi 788/690 ms. Median of 7: **render 140/149 (−6 %), tab 299/305, buổi 798/759 (+5.1 %)**, tasks>200ms 11/12, open 1157 ms, old save loads and plays a buổi. buổiMs is the known noisy number (prior reviewers' seeded A/B said noise); a CSS aspect-ratio on one frame cannot touch the buổi path.
- Co-op: no co-op code touched (coop-e2e not run; regression guard only — change is CSS/fallback in the map view).
- Fold + iPad shots LOOKED at (scratch only, deleted): no overlap, nothing cut. 0 page errors.

SẴN SÀNG KIỂM f59c965a61e5cb533d44f616f2c0d43e24343b80
