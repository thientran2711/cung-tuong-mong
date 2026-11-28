# F-TDWORKS report (ORDER MAIN 189) — worker session_01UV1SzhBbNMEZ8pDWiqdaFJ-successor (F-TDWORKS)

PRIORITY #1 CHECK: OD kit-bac-progress row 36 + F-WORD36-RV find (reports/f-word36.md) | main c03d6ee7/4a8c627b: jtds.js Tứ đức works card = wrapper of ktWorksHTML (dead), jtabs.js Tác phẩm tab = ktWorksList() cells only | review/* f-word36-bac-rv2 3f3eb243 (base), no other branch touches ktWorksList | claims none.
KIT CHECK: reuses kitSkillCell (.ktn-cell), ktTnPop môn frame (kitModal + kitSkillCard act cards), crsProg, pbtn — no private card/chip/frame.

BASE: origin/main does NOT contain b130a911 (row 36 not landed) → base = review/f-word36-bac-rv2 3f3eb243. Branch review/f-tdworks.

## Root cause
R11 turned the Tác phẩm tab into kit cells built from ktWorksList() (jtabs.js). jtds.js (and jrcp.js) still extended the old HTML builder ktWorksHTML(), which no tab renders any more → the 4 Tứ đức works cards + «Tự học, làm đồ» (bậc 5) were dead code.

## Fix (1 source file)
dev/build/jtds.js: the Tứ đức works block now wraps ktWorksList() and pushes 4 items {kind:"wk",k:cong|dung|ngon|hanh,…prog:crsProg(S.vir,S.virp,k),acts:[«Tự học, làm đồ» at bậc 5]} — same object shape as the 8 art works, so they render as the SAME .ktn-cell (same frame/size) and open the SAME môn frame (ktTnPop → kitSkillCard + act card). ktWorksHTML = ktWorksList().map(kitSkillCard) already follows, so the old wrapper was removed (no duplicate). Keys cong/dung/ngon/hanh do not collide with art keys. Numbers = crsProg / BAL.tds only (law 4); no %, no raw «9/3» (law 7).
Test: dev/test/tuduc-sub.js step «wk» read the old .kskill card selector (cards 0 on main already) → now reads the 4 cells + checks the «Tự học, làm đồ» act of the same list.

## Results
- Tác phẩm tab now 12 cells (8 art + 4 Tứ đức), all one side: Fold 317x317, iPad 243x243, no horizontal overflow, 0 page errors.
- Cell bars read crsProg (Dung bậc 2: 7/19, Ngôn bậc 3: 11/28, Hạnh bậc 4: 15/38; Công bậc 5 no bar). Môn frame of Công bậc 5: «Tự học, làm đồ · Tốn Sức 10, 2 khắc · Được một món đồ kim chỉ» + note.
- bac-progress.js: PASS fold + iPad (now also covers the 4 new wk cells and their frames).
- tuduc-sub.js: Fold + iPad, 0 errors, wk cards 4 / cells 12 / prac act true. (its step 8 `prac {none:1}` is identical on the base build: pre-existing.)
- k61-wkey-oldsave.js: PASS.
- tuduc-mg.js / wk-kind-game.js: both time out >250 s on this box (bot mini-game plays); not run to the end; neither touches ktWorksList (lesson/make-work acts unchanged).
- Shots looked at 3×: fold-wk, fold-wk-duc, fold-frame-cong, ipad-wk, ipad-wk-duc, ipad-frame-cong (scratch /home/user/wt/f-tdworks-shots, not in git). Pictures read «Đang thỉnh tranh…» in the offline harness for art AND Tứ đức cells alike (CDN, same as before). A random in-game news popup sits over the fold-wk-duc shot (game event, not the UI).
- Tier: SMALL (UI only; jtds.js + test). assets.json = LIVE (unchanged).

## Still dead on main (not in this order's scope — for the foreman)
jrcp.js:298 also wraps ktWorksHTML: (a) the «lối đã học n/m» chip on the 8 art works, (b) the «Khẩu vị, kiêng kỵ» card (rcpTasteRows + «Hỏi thái y kiêng kỵ» / «Sai cung nữ dò la khẩu vị» acts). Neither shows anywhere either (same cause). Suggest one row (cell for «Khẩu vị, kiêng kỵ» + chip inside the môn frame) — owner/KK decision, kit cell for a non-môn may need a KIT REQUEST.
