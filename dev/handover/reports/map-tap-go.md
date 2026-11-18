# map-tap-go (owner bug 18/11 ~06:00Z)
PRIORITY #1 CHECK: OD L1422/L1570/L1616 (dư đồ), no ruling on travel confirm | main j77Tap/j77Card/jplace kitPlaceDress | review/* none | claims none.

Branch review/map-tap-go, sha 1996eca (from main a95e8d4). Files: dev/build/j77.js, dev/build/jplace.js, dev/kit/KIT.md (§32.8c), dev/test/map-tap-go.js (+ -probe.js), rebuilt index.html/sw.js.

## Root cause (1): two looks
Place card = Q item dressed by kitPlaceDress (place picture + kit rows). A later event layer (kitStagePeople/kitEventStage, jk4) also puts a full-body person column on any VIỆC item that carries a person (here the resident Quản sự ma ma) -> wide card with figure (a); without a person -> picture + rows (b). Plus kpanel frame size by content (ksz).
Fix: kitPlaceDress sets m.stage=[] so a place card NEVER has a person column. One look = picture + kit rows + options. NPC info stays where it belongs: the stage people list / her card (not lost).

## (2) Tap = go at once (j77Tap) — FINAL (owner 18/11 ~06:05Z + ~06:30Z: NO undo, NO arrival toast)
- reachable (also last khắc, also a walk that spills into the next buổi): goTo only; the walk khắc is deducted silently like any Hành sự action (top bar updates), a spill plays the normal buổi change. kitUndoToast / kitArriveToast and KIT 32.8c are gone.
- Unreachable with no real choice: kit CẤM toast with the reason. Places with real choices (xin bái kiến/yết kiến, lẻn vào) open the ONE place card.
- Same tap rule for Danh sách (shared click handler). Palace slots (kpm sub-map) unchanged.

## (3) KIT 84c person-less VIỆC frame (main appointed this worker kit keeper for the part; KIT_REQUESTS row closed)
Real cause of the two looks: jksize kitFrameLive3 → kszWho3 put the narrator figure on every VIỆC frame without a person. Fix: jplace stage=[]; kitFrameLive3 who=null for m.placeK; person-less frame = ONE picture left: standard 120x160 in S/narrow, `.k3fill` (fills the column, cover-crop true ratio, right column decides height) in M/L/XL. kszFrame3({noWho}) builder, kit-conform rule (k3fill as tall as k3right), kit page sample §84c, KIT.md §84c.
Scan (whole group = every person-less frame = every place card, kit-conform place:* at 755x1000): before (main a95e8d4) 19 place frames, all T7 WITH a narrator column (ma ma etc.; 7 flagged MIXED "T7 without main picture" on the intermediate build); after: 18 CONFORMS T7 (thu dtd tn kn r2 r3 r4 r5 tyv ksp lc cnh tgk ttp acs dc nvp etq night) incl. the fill rule + place:vuon MISSING (expected: a reachable place no longer opens a card); whole run CONFORMS 105 / MISSING 3 / floats none.

## Tests
dev/test/map-tap-go.js on ipadAir + fold: mid-buổi go/no card/toast/undo restore, last-walk, spill, blocked reason, rule-locked card no figure, no page errors: ALL OK both.
quickcheck: see main message (running).
Shots (LOOK done, not in git): /home/user/wt/mtg-shots/mtg-{ipadAir,fold}-*.png (session-local).
## Scan (whole group)
Every place-open path (map, Danh sách, Ra vào, chips, events) ends in j77Card/j77LastWalk/accEtqCard -> wrapped by kitPlaceDress -> now all stage=[]: 0 person columns.
