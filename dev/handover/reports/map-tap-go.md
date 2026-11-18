# map-tap-go (owner bug 18/11 ~06:00Z)
PRIORITY #1 CHECK: OD L1422/L1570/L1616 (dư đồ), no ruling on travel confirm | main j77Tap/j77Card/jplace kitPlaceDress | review/* none | claims none.

Branch review/map-tap-go, sha 1996eca (from main a95e8d4). Files: dev/build/j77.js, dev/build/jplace.js, dev/kit/KIT.md (§32.8c), dev/test/map-tap-go.js (+ -probe.js), rebuilt index.html/sw.js.

## Root cause (1): two looks
Place card = Q item dressed by kitPlaceDress (place picture + kit rows). A later event layer (kitStagePeople/kitEventStage, jk4) also puts a full-body person column on any VIỆC item that carries a person (here the resident Quản sự ma ma) -> wide card with figure (a); without a person -> picture + rows (b). Plus kpanel frame size by content (ksz).
Fix: kitPlaceDress sets m.stage=[] so a place card NEVER has a person column. One look = picture + kit rows + options. NPC info stays where it belongs: the stage people list / her card (not lost).

## (2) Tap = go at once (j77Tap)
- reachable (also last khắc of the buổi): j77Go -> goTo at once; kit toast `kitUndoToast` ("ĐẾN <nơi>", Đường đi n khắc, Còn n khắc | Hết khắc: sang buổi sau, ta ở lại đó) + "Quay lại" ~6 s.
- Undo = deser(JSON snapshot of ser() taken before the walk) -> place, khắc, buổi, everything restored; no time spent.
- CO-OP: no snapshot, no button (undo = not offered; trip stands) — chosen as the simple co-op-safe option.
- Walk that spills into next buổi (night card / roulette follow): goes at once, NO undo (buổi turn has events), the buổi card says it.
- Unreachable with no real choice: kit CẤM toast with the reason. Places with real choices (xin bái kiến/yết kiến, lẻn vào) still open the ONE place card.
- Same tap rule for Danh sách (shared click handler). Palace slots (kpm sub-map) and chapter-goal card "Xong việc: Đi một nơi" unchanged: when a card appears after arrival there is no undo toast.
- NEW kit part flagged: kitUndoToast = rtoast + button; registered KIT §32.8c. Main: object if a kit request was required first.

## Tests
dev/test/map-tap-go.js on ipadAir + fold: mid-buổi go/no card/toast/undo restore, last-walk, spill, blocked reason, rule-locked card no figure, no page errors: ALL OK both.
quickcheck: see main message (running).
Shots (LOOK done, not in git): /home/user/wt/mtg-shots/mtg-{ipadAir,fold}-*.png (session-local).
## Scan (whole group)
Every place-open path (map, Danh sách, Ra vào, chips, events) ends in j77Card/j77LastWalk/accEtqCard -> wrapped by kitPlaceDress -> now all stage=[]: 0 person columns.
