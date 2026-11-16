# flip-newlife-r1 — PASS 4c14d7f86b83b9da4e2c3561183968766a923e5e (review/flip-newlife-r1; descends from origin/main a942395)
Reviewed review/flip-newlife @ 9bea3721, merged onto latest main three times (ba07c65 -> 11100a9 -> a942395); generated files rebuilt with dev/site/build_site.sh. One real code conflict: dev/build/jflip.js (kept life/cur guards + main's ART.seal preload).
## Verified in the real game (Playwright, shots looked at)
- Bug 1/2 card-flip overlay after a new life / flip over the Luân hồi identity card: dev/test/flip-newlife.js ALL OK at 755x1000@2, 1000x755, 1180x820@2, 1366x1024, 844x390@2 (scene waits for "Nhận thân phận", new life leaves no .kmov/#kmrew, queue empty, reroll clean).
- Bug 3-5 act-dedupe UI: dev/test/flip-newlife-ui.js ALL OK at all 5 sizes ("Tất cả" usable first, grey-card popover sits on the card and covers no other card, shop rare tile kitItem mark "hàng hiếm").
- cardflip.js real scene plays, errs [] , old save ok (755x1000, 1180x820, 844x390, 1000x755, 1366x1024). act-dedupe-w1: 0 FAIL.
- Kit scan: diff uses kitItem mark, kpPop(o.inside), kit tab/CSS-order; no private chip/row/frame. `#tokens>.empty{display:none}` only hides a duplicate line.
## Test-harness fix
Main's new first-run load cover (.modal.kload, "Lần đầu nhập cung") blocked taps in the tests; they now hide it (flip-newlife*.js, cardflip.js, act-dedupe-w1.js).
## Extra fix (kit only): identity card strip over buttons at 1180x820
Root: pinned bottom bar `.dlg.kpsc>#mb>.kpscopts` had z-index 3, the sticky face-pick `.ksub` strip 5/7, so the strip painted over "Nhận thân phận / Đổi thân phận". Fix: z-index 9 on `.kpscopts` (jk2b.js) and, same family, on `.dlg.kpanel>.mr` (jk3.js, was 4). KIT.md note added. New test dev/test/idcard-bar-overlap.js (scrolls the card body, elementFromPoint at every overlap must be the bar): OLD (css emulated) FAIL at 1180x820 (strip on top at scroll 0-80), NEW bad=[] at 755x1000, 1000x755, 1180x820, 1366x1024, 844x390.
## Not run
coop suites, route.js (none touch changed paths). 390x844 rotate prompt not re-shot (untouched).
