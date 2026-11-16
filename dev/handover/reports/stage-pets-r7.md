# stage-pets r7 report (worker, 11/16/2026)

Branch: review/stage-pets-r7 @ 6aaca31af (base origin/review/stage-pets 872cbd52 = r6; no review/stage-pets-r1 verdict existed yet, nothing to merge). Pushed, not merged. SẴN SÀNG KIỂM.

## Owner rule (OD 16/11 19:54Z (2) + ~20:04Z)
Fold = TWO people per view at FIXED slots (puzzle pieces: snap, never shift; swipe for the others); clothing may overlap; pets at a fixed spot tied to the owner's slot on every stage.

## Root causes found
1. Slot count came from art widths (`while(!fits) N--`, MAXN 2 only on the place painting): Fold place views showed 1 per view, the room 2 or 3 depending on who stood there; positions moved with the count (1 person = centre).
2. While pictures load, j59lay returned early and left every token UNPLACED in a pile (scan "before": Ngự hoa viên 3 people in view, feet spread 275 px) = the owner's video (3 figures on top of each other in the Hành sự room).
3. Floor y depended on the painted floor anchor and on measured name-chip heights (5 different floor lines across places on Fold); pet x depended on the owner's art width.

## Fix (one kit table, one core) — KIT 33.12 (KIT.md + kit page sample §33.12)
- jkit.js: `KIT_SLOTS={page:2,spread:4,band:50,pet:{sx:.3}}`, `kitSlotsN(stage)` (iPad full-screen place painting over the spread = 4, every one-page view = 2: Fold/Fold cover room and place, iPad room page), `kitSlotFloor(sH)`, `kitPetSpot(cx,sw)`.
- j59.js (only reader): N = table; no width test / shrink / fewer slots; body (core column) centre on slot centre (equal columns of the free width between side columns); feet on kitSlotFloor; no pull-in beside panels; pet bottom-centre at kitPetSpot(owner slot); `.stage.j59wait` hides people until the view's pictures are measured (max 6 s).
- KIT.md 33.7 rules 1-2, 33.8 SPOT/LAYOUT, 33.9, 33.10 PEOPLE overwritten in place (canon overwrite); new 33.12.
- Decision taken: 1 person stands in slot 1 (not centre) so nobody shifts when someone arrives/leaves.

## Whole group scan (dev/measure/stage-slots-scan.js; her + 3 others, view 1, Fold 755x1000)
| place | before r6: slots / in view / floor y | after r7 |
|---|---|---|
| home (Hành sự room) | 2 / 2 / 722 | 2 / 2 / 720 |
| vuon | 2 / 3 (pile while loading) / 447 | 2 / 2 / 720 |
| tn, kn, tyv, ksp, lc, cnh, nvp, r2-r5 | 1 / 1 / 691-714 | 2 / 2 / 720 |
| thu, dtd, tgk, ttp, acs, dc, r10 | not entered (game rule refuses) | same |
After: max body-centre off slot 1 px; one floor line per device (Fold 720, iPad 572, Fold cover 778); 0 page errors at 755x1000, 1180x820, 412x1058.

## Tests
- dev/test/stage-slots-fixed.js (room, Ngự hoa viên, Thái y viện; every view by real mouse swipe): PASS at 755x1000@2, 412x1058@2, 1180x820@2. Asserts people per view = table (Fold 2), body centres ±2 px on slots, feet ±2 px, same slots/floor on every view and every stage of a type, every known person's pet at kitPetSpot ±2 px, nothing visible while loading, old save (written by origin/main build) loads and lays out 2 slots, 0 page errors.
- place-fs.js (Fold + iPad) and stage-swipe.js (Fold): flows run, 0 page errors (they still print r6-style overlap numbers for the hidden pre-layout state; their vis filter ignores visibility:hidden).
- build_site.sh: media-check 0, built.

## Shots (CDN review folder img/_review/stage-pets-r7/, NOT in git; wipe after verdict)
r7-755x1000-room-v1 / -room-v2 / -vuon-v1 / -tyv-v1, r7-412x1058-room-v1, r7-1180x820-vuon-v1 / -room-v1 (all @2). Looked at each: Fold 2 per view, sleeves/skirts touch only, pets beside owners at the same spot.

## Honest limits
- Fold cover 412: free width 249 px for two 655 px-tall people → neighbours' skirts overlap a lot, bodies come close (still on their slots).
- People no longer follow each painting's floor anchor (fixed floor line instead); on some paintings feet may stand on rug/furniture edge. iPad spread: slot 1 is close to the left rail buttons (face clear).
- Strangers (Người lạ) show no pet by the existing rule.

## Handover
START_CTX ≈ 4 %; end ≈ 20 %. Nothing pending. Worktrees /home/user/wt/sp7, /home/user/wt/sp7-ho, servers 8971-8973 can be removed.
