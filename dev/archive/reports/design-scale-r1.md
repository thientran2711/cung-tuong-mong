# design-scale-r1 — kit/structure review (opus, s14 reviewer session_01UV1SzkHA4ScRWkoirdEoSn)

RESULT: **PASS e7d697d1** (review/design-scale-r1 = review/design-scale e00cb30a + origin/main 18fb8252, generated files rebuilt; descends from current main).
START_CTX ~4 % of 1M window; finished ~12 %.

## Merges
- origin/main 399483e3: clean (no source conflicts); site rebuilt. main tracks `.tmp/cdn/*` (1679 files) — kept as on main.
- origin/main 18fb8252 (popup-fullbody, scene-end, cardflip-glow): conflicts only in generated index.html + sw.js → rebuilt with build_site.sh.

## design-scale.js (6 sizes, host mode, real clicks through the transform)
| size | canvas | pages | s | rot | flow | errs | overflow |
|---|---|---|---|---|---|---|---|
| Fold 755x1000@2 | 590x820 | 1 | 1.2195 | no | room→page→room | 0 | no |
| iPad 1180x820@2 | 1180x820 | 2 | 1 | no | spread | 0 | no |
| iPad Pro 1366x1024@2 | 1180x820 | 2 | 1.1576 | no | spread | 0 | no |
| Fold cover 412x1058@2 | 1180x820 | 2 | 0.5024 | yes | spread | 0 | no |
| phone 390x844@3 | 1180x820 | 2 | 0.4756 | yes | spread | 0 | no |
| phone 844x390@3 | 1180x820 | 2 | 0.4756 | no | spread | 0 | no |
ok = {pageCanvas, spread, rotated, oneAtATime, noErrors} all true.

## Proportional match (element rects relative to the page box, spread 1180x820 vs one page 590x820, same seeded game)
| group | box spread / page | elements | x+width equal | x,y,w,h within 1 px |
|---|---|---|---|---|
| RIGHT page Hậu cung (design-scale A) | 582x623 / 582x620 | 109 | 98.2 % | 95.4 % |
| LEFT page room home | 582x623 / 582x620 | — | 100 % | 80.8 % (3 px: one-page top bar 3 px taller) |
| Hành sự | same | 84 | 100 % | 97.6 % |
| Giao tình | same | 96 | 100 % | 99 % |
| Hoàng tự | same | 18 | 100 % | 94.4 % |
| Tư trang | same | 145 | 100 % | 100 % |
| Tài nghệ | same | 108 | 100 % | 100 % |
| Mệnh truyện | same | 52 | 100 % | 100 % |
| Dư đồ | full-screen map tab (by design, both modes) | — | n/a | n/a |
Kit popups (kit-popup-sample, 5 sizes): every dialog 560 px wide in both modes (Fold [15,…,560]) — same proportion. Screens looked at: Hậu cung, Tư trang, Dư đồ, room home, rotated phone — Fold page = iPad right page scaled.

## Real-tap flows (mouse at the transformed point; CDP touch does not ack here)
- Fold: room → Hậu cung (page, "Về phòng" shown) → Về phòng (room) → Tư trang → Giao tình → Về phòng (room). 0 errors.
- iPad 1180x820 / 1366x1024: tab taps switch the right page, room stays on the left, no Về phòng. 0 errors.

## No new width @media in page content
Content: 27 dropped, 9 unwrapped; no new content width rules. Chrome only (allowed per plan, OD:L345): jk4 top bar `@media (min-width:600px) and (max-width:999px)` → `(max-width:999px)` and one NEW `@media (max-width:999px)` block (Về phòng under the menu) + a dead `@media (max-width:0px)` block. → phase 3 must turn these into `.kv1/.kv2` (not a FAIL now).

## Regression
- coop-e2e (live Worker, Fold host + iPad guest): 59/59 passed.
- cardflip 755x1000,1000x755,1180x820,1366x1024,844x390 + re-run after 18fb8252: exit 0.
- kit-popup-sample 755x1000,1180x820,1366x1024,844x390,412x1058: all exit 0.
- popup-fullbody (new on main) 4 sizes: exit 0 (OK 40 / WARN 2 / INFO 2 at 844x390).
- scene-end (new on main): all PASS when run alone (one "bloom early" at 1180x820 under 5 parallel tests; re-run alone PASS).
- dlg-clip 3 sizes: clipped 0, errs 0.
- stage-rail 4 sizes exit 0; stage-slots 3 sizes exit 0; newgame-ui 4 sizes exit 0; view-scale all sizes errs 0, sameLandscapeLayout true.
- stage-counts: elder off-by-one mismatches — SAME on live main (pre-existing, not this branch).
- Boot: 6 sizes in design-scale B + all tests above, 0 page errors.

## Notes for the worker (phase 2/3, not blocking)
1. Chrome width @media in jk4 (above) → `.kv1/.kv2`; delete the `max-width:0px` block.
2. One-page top bar 3 px taller (time block 3 lines) → left page full match 80.8 %.
3. One-page tab bar: 9 buttons in one row, font ~.59rem, "Sang buổi" wraps 2 lines — readable at s 1.22 but check with owner shots.
4. dev/test/design-scale.js does not dismiss the first-run "Luân hồi" overlay / is timing-sensitive: under load the Fold flow read room→room→room once (re-run alone: room→page→room). Harden (tap "Bỏ qua", wait for overlay gone).
5. PRE-EXISTING on main (not this branch): after Dư đồ, opening Hậu cung keeps `.maptab` → Hậu cung shows full width with the stage hidden on iPad (`game maptab cardtab`, panel 1164). Seen on live main too. Group fix: tab-mode classes must be reset on every tab change.

## GO re-merges (s15)
- main 92668096: index.html/sw.js only → rebuilt. main's new rotate-prompt.js / lib/device.js / test README expected portrait 755x1000 → fixed to 590x820 (6fd1ccf8); ALL PASS. cardflip, kit-popup-sample (5), popup-fullbody, dlg-clip, newgame-ui, stage-rail, coop 59/59, design-scale: pass.
- main 9ddb3f6c (stage-slots-fix-r1): j59.js geo() conflict → main's kitSlotSw + design-scale's 46 px gutter (no innerWidth). stage-slots-fix 4 sizes (incl. 590x820), stage-slots-fix-r1-ev 3 sizes, design-scale (97.2 %), coop 59/59, rotate-prompt: pass.
- scene-end "bloom" early=true FAIL at 755x1000/1180x820 — same on live main 9ddb3f6c (pre-existing).
- **READY 802fe821** sent to s15.

## LIVE (main 802fe821) — SMOKE PASS
- design-scale B on GitHub Pages, 6 sizes: Fold 590x820 1 page room→page→room; iPad / iPad Pro spread; Fold cover + phone 390x844 rotated; 844x390 spread; 0 errors, no overflow.
- rotate-prompt on live: ALL PASS.
- Known pre-existing on main: scene-end "bloom" early=true FAIL (755x1000, 1180x820); Dư đồ→Hậu cung keeps .maptab (→ design-scale-p2); stage-counts elder off-by-one.
