# fig-cutout-code-r1 — reviewer verdict (session_01UV1SzmJWhZHz6G55tgfdnH, 16/11)
VERDICT: PASS 923567d5 (review/fig-cutout-code-r1 = latest origin/main 1aa0edb2 + review/fig-cutout-code 04ec6425, built, fast-forwardable). CODE part only; the image defects remain for Foreman C.
START_CTX ~10% (low).

## What was judged
- `#kfa` alpha 1.07/-0.065 -> 3/-1.2 (jfighd.js) + `kitFigHD(im)` call in kpIdLay (j79.js). Merge conflicts only in built index.html/sw.js (took main, rebuilt).
- Overlap with hotfix review/stage-figsize: that branch is not on origin yet. The code change touches only jfighd.js `#kfa` constants + one line at the end of j79 kpIdLay (identity card) — no stage-size lines (j59/jk4/KIT_FIG), so no overlap expected; re-check when the hotfix is pushed.

## Checks (all looked at myself; shots in scratch, none in git)
1. Before/after, same figure, game filter chain (`url(#kfa) drop-shadow`), DARK #241830 and LIGHT #efe6d6, iPad 1180x820@2: player-look1-t1-a26 (sheer sleeves), consort c09-ty8-a26 (ty family, owner's grey-halo class), c05-t5-a18 (raised hand). 755x1000, 1366x1024, 412x1058@2: c09-ty8-a26.
   - Grey band along the robe/hair edge and smoke fringe: reduced, edge is now a clean ~2 px line (zoom checked, no visible stair-stepping at DPR 2).
   - Sheer sleeves (player-look): now read as opaque cloth instead of letting the background through (the "see-through sleeve" bug); face/hands untouched.
   - NOT fixed by code (image-only, as the root-cause worker said): grey/green enclosed gap between arm and waist, the thin smoke wisp beside the cheek of c09-ty8, wrong-hand/back-pose figures, hoa điền size, soft 900 px faces. These need Foreman C's re-cut.
2. Consistency scan: `url(#kfa)` users = j59 (stage HG/SG), j79 identity, j90, jk4 .kesimg, jpdlg .kpdfig, jbook .kbp-fig, jfighd samples — all people pictures; the filter is defined once (kit level) so every figure gets the same edge. No pet/glow/scene art uses it.
3. WebKit/iPad 1x-rasterisation risk: NOT testable here — only Chromium is installed (playwright webkit launch fails; I did not install anything). Argument: the old and new filter both use the same `filter:url(#kfa)` chain on the same elements; only two numeric constants change, so whatever WebKit does today it does after. No new risk class. Owner's iPad is still the only real test (ask her to compare one figure; if soft, drop `url(#kfa)` from the chain on WebKit only).
4. Perf: quickcheck on 923567d5 PASS (open 1264 ms, old save ok, render 333/363 ms, tab 409/415, buổi 1185/1366, tasks>200ms 17/17 new/live; first run 358/313 — within noise).
5. Co-op: `node dev/test/coop-e2e.js` 59/59 passed (fold/ipad/solo no page errors).
6. Nhập cung / BÁO figure column feet crop (CODE): kitPersonDlgFit puts the painted body bottom exactly on the column floor (img bottom == column bottom at 755x1000 and 1180x820, five figures incl. shoes). At 755x1000 the shoes are visible (c05-t5-a18 shot), flush to the frame bottom with 0 px margin; the sides are cut by the column (sleeve/hem touch the edge; at 412x1058 the column is only ~116 px wide and flare is clipped — same on main). I could not reproduce a feet crop in code on this build; the owner's photo may predate page-scale or be an image with feet painted/cut inside the file (HD twin 900 px vs 306 px twin loads late: first fit ran before the 306 px file finished in one case — fit re-runs on load). Optional hardening (not a FAIL): leave ~6 px floor margin in kitPersonDlgFit so the shoe edge is never flush with the clip.
7. Other (not judged): Fold identity card figure column only ~90 px wide / figure ~176 px tall (root-cause worker's finding §5) — still true on this build (fig bot 988, top 812 at 755x1000).

## Risks (gain vs loss)
- Hard alpha could thin fine hair wisps / gauze painted below alpha 0.4 — rare, small, visible only on a few veil figures; fixable by changing the two constants in one place.
- Cosmetic change to sheer sleeves (look solid) — likely, small, wanted by the owner (no see-through).
GAIN > LOSS: one kit-level constant fixes the grey band / neck streak class for all figures with no perf or sync cost; remaining defects are image work.
