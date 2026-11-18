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

## Re-review of review/kit-keeper-2 5837359e (adds KIT 28.13b item-big, KIT 45.4 kpbar z29)
- kpbar-modal.js (8 tabs x pop-ups x 1180x820 / 844x390): PASS, 0 bar over a pop-up. z 29 harmless.
- item-big.js at 755x1000, 1180x820, 1366x1024, 412x1058, 844x390: 5/5 PASS (synthetic xl 260 px / lg 150 px frameless, item512 source, md keeps frame, frame:true keeps frame). Real pop-ups with CDN pictures (curl-routed) looked at.
### FAIL (item-big does not reach the screen)
1. REAL pop-ups still show the item at 64-71 px, not "big": item info pop-up (`kinvOpen`, every item of the bag: 64 px; `jinv.js:164 .kitslot .kpitem>.kitem{--isz:64px!important}`) and the "Mất đồ" notice (`kitLose` via kitPanel notice, 71 px: `.kpsubj.kpitem>.kitem{--isz:100%}` in a ~70 px picture column). The frameless + item512 part works (nhansam loads img/item512, border 0, no shadow box); the size does not. Most bag items have no item512 file (they load img/wd-*.webp 256 px), so they stay small and unsharp. OD:L686 asks for big, sharp, item alone in the CENTRE display (receive / lose / reward); KIT 28.13b claims "info pop-up" and lg = 150 px, which the real pop-ups contradict.
2. KIT 28.13b text vs 28.13f (compact slot card, owner 11/15 "far too big") contradict each other for the info pop-up: owner must say which wins; if centre-big wins, the picture column of kitPanel notice / info needs the lg size (not 100 % of a narrow column).
Not changed by me (layout of every kit panel; belongs to the kit keeper).

## r2 review of review/kit-keeper-2 ac14e0e6 (item-big split per OD:L686) — PASS
Branch review/kit-keeper-2-r2 = ac14e0e6 + origin/main (site rebuilt). item-big.js 5/5 sizes PASS (now includes real kitLose notice 150 px frameless and bag pop-up keeps frame); real kitLose with CDN pictures at 755x1000 / 1180x820 / 844x390: picture 167 px, item512 (512 px natural), border 0, inside screen, no overflow (looked at 844x390); bag pop-up compact 64 px WITH frame (28.13f, looked at 1180x820). dlg-clip 5 sizes: 0 clipped, 13/13 scroll. kit-conform: CONFORMS 82 / MISSING 15 at all 5 sizes (one 81/16 flake at 1180x820 and one timeout crash at 844x390 on my first run, both clean on re-run). scene-end 1180x820 6/6, jflip card flip 6/6.
