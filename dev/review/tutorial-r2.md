# Review: review/tutorial-r2 @ 10a37960b9 (reviewer branch review/tutorial-r2-r6)

Verdict: PASS (after one reviewer fix, wording). Re-merged onto origin/main a3dbdc19f (elder-staff now in main: guide = "Tống ma ma, Giáo tập ma ma" with her face, verified at 755x1000).

## Fix made by the reviewer (jtut.js)
Real time model (j3.js advance, jtime4.js, HX.date in j84.js, j2.js map help): a month = 3 tuần, a tuần = 4 buổi (sáng, trưa, chiều, tối),
a buổi = 4 khắc; passing the tối buổi button ("Sang ngày mới") does S.tuan++ (new tuần: new quẻ, Hoàng thượng lật thẻ). There is no "day" of 4 buổi.
The intro said "mỗi ngày bốn buổi" (wrong). Now:
- page 3 row "Buổi · khắc": "mỗi tuần bốn buổi (sáng, trưa, chiều, tối), mỗi tháng ba tuần; mỗi buổi 4 khắc, việc nào cũng tốn khắc"
- page 3 row "Sang buổi": "... qua buổi tối là sang ngày mới, cũng là sang tuần mới" (matches the button label and step 12)
- page 1 "mỗi ngày tự chọn việc" -> "mỗi buổi tự chọn việc"; page title "Một ngày chơi thế nào" -> "Chơi thế nào" (KIT.md §72.1 text updated).

## Checks
- KIT FIRST: tour/intro = kit panel (.dlg.kpanel, kpHeader, kitRows, kitSceneArt, pcPort portrait frame, .kbtn). jtut CSS is layout only (no private chip/row/frame).
  Goal strip = new kit part KIT §72.2 (registered in KIT_NUMBERS.md as FINAL, sample on the kit page); detail/card = kitPanel + kitRows + kitChecks + kitReqRows.
  Consistency scan: the .obj67 Hành sự line was the only goal line; it is now kitGoalStrip (same code as the stage strip). No variants found.
- Guide: GD() uses staffGuide() when present; signature of review/elder-staff (name=call, title, office, face, kr) is compatible with mmFace/MMT;
  fallback Quế ma ma only when staffGuide is missing (this is the case now: main does not have it).
- VANPHONG: no %, odds ladder words used, cổ trang address (nô tỳ / tiểu chủ / nương nương / ngươi for servants).
- Old saves: tour/tips off past week 2 (S.tutOld), no goal card (goal.js "old" section PASS). Co-op: goal card + tour run per machine on its own life (no shared state); no 2-device run done (coop-e2e needs the live Worker).
- Merged onto origin/main 4f5e5f3b32 (conflicts: assemble.py, KIT.md, generated index.html/sw.js/assets.json, resolved; site rebuilt).

## Tests (site built, served at repo root)
- goal.js: 755x1000 tt PASS, 1180x820 tt PASS, 844x390 tt PASS, 390x844 PASS (rotate prompt). 755x1000 cnv: the card is queued right after "Nhập cung làm cung nữ"
  and shows (verified with a slower click loop), but the stock loop (800 ms poll, immediate click) can close it unseen -> "goal card never shown" (test race, not product).
- tutorial.js: tour PASS 755x1000, 1180x820, 844x390 (first-run intro page 1 can fail under load: card mid-animation); skip, replay, old, bot PASS (replay flaky on first run, PASS on rerun).
- Screens viewed: intro pages at 755x1000, 844x390, 390x844 (rotate prompt over it), goal card 844x390, detail 755x1000, main strip 1180x820 / 844x390 / 390x844. No overflow, no cut text,
  one-line ellipsis of the stage strip title at 390 only (unsupported portrait).
- Pictures in the intro load from the CDN a few seconds after opening (blank band while loading on a slow link).

## Suggestions (non-blocking)
- goal.js: wait ~1.8 s after each click so the cnv run is stable.
