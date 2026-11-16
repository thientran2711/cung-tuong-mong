# kit-keeper-2-r1 review report (16/11)

Branch review/kit-keeper-2-r1 = review/kit-keeper-2 d131e1d8 + origin/main 399483e3 (conflicts: j93.js kmPump kept main's kmGen guard + 10 min timer, KIT.md both sections kept, index.html/sw.js rebuilt) + 1 reviewer fix.
START_CTX ~8 % of window; finished well under +25 %.

## Result: PASS
1. Long event text (dlg-clip.js): 755x1000@2, 1180x820@2, 1366x1024@2, 412x1058@2, 844x390@3 → 0 clipped-text cases, 13/13 long dialogs with a scroll area, 0 errors, at all 5 sizes.
2. Landscape curl: KIT_TURN_MS=800, one constant used by every curl/slide call (jbook.js 251/336/340/343); page-curl.js 1180x820 ok (22 frames, 1 curl, reduced-motion fade, no overflow, no errors).
3. podium.js 1180x820@2: exit 0, all checks bad=[], no overflow, no ellipsis.
4. Person card 844x390 (pcard-land.js): pop-maid, pop-elder, tab-rv/court/staff/art/kid/men, gift-wk, spy-pick all PASS (acts beside picture, first act visible).
5. Scene-end button (scene-end.js, 6 scenes x 5 sizes): 30/30 when run alone. Two "bloom early" FAILs seen only while another test ran in parallel (CPU load → auto-Gọn shows the final frame + button at once, by design KIT 81); re-run alone 12/12 PASS. Words: flip on her "Chuẩn bị thị tẩm", other consort "Ta biết rồi", edict/gloom "Đã hiểu", bloom/ink "Tiếp theo". No auto-close on kmStage (no `o.hold` use left).
6. coop-e2e.js 59/59. Boot: no page errors at any size in any run.
7. Consistency scan: every scene-end button is the same `.kbtn.kmend` (kitSceneEnd); no private variant.

## REVIEWER FIX (found while checking item 5)
The card flip the player really sees each week is `jflip.js` kitCardFlip (it replaces km-tablet via the inFlip guard), and it still auto-closed after CF.hold with "Chạm để đóng". Fixed in the same kit part: `final()` now calls `kitSceneEnd(ov, me?"Chuẩn bị thị tẩm":"Ta biết rồi", close)`, tap no longer closes. Checked with a script on cfDemo (22 cards = other consort, 2 cards = hers) at 755x1000, 1180x820, 844x390: no button while playing, right words, one kbtn, inside screen, still open 4.5 s later, tap keeps it open, button closes → 6/6 PASS. KIT.md §81 list updated.

## NOT a FAIL, still open (sweep, listed in KIT.md §81)
Scenes outside kmStage that still auto-close or say "Chạm để đóng": jtoil toilReveal, jpromo person reveal / chest, item fly, level-up, festival, night end / new day, week calendar, co-op scenes, card-flip videos. Owner rule OD:L1261 stays unmet for those until the sweep worker uses `kitSceneEnd`.
Note: the test runs used file:// (local web server start was blocked in this session).
