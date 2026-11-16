# Review r1 — diemtrang-coop-look (worker @8ed1228a) — VERDICT: PASS 6f72e6417

Reviewer session_01UV1SziXRVy5vqBiRRbSKnh (BIG tier, co-op). START_CTX ~3 % of the window; finished well under the +25 % limit.
Branch `review/diemtrang-coop-look-r1` = 8ed1228a + merge origin/main f1509d7c (main's index.html/sw.js/assets.json taken, assemble.py
unchanged by the worker so no list union needed, site rebuilt with dev/site/build_site.sh) + 1 test commit. PASS sha 6f72e6417 (origin/main is an ancestor).

## What the change does (checked in code)
- jtoil `toilFriendRec(p)`: the co-op friend entry (rival with coop:true) uses HER real `toilette` of this week; none → mặt mộc; dress verdict = `toilDress` on her real `wd` (same call as on her own seat). `toilFx`, `toilLookOfP`, `toilColOfP` read it; the `toilNpc` roll is no longer used for her.
- jcoopworld: `LOOK += toilette, wd` (week merge, buildFriend); the `pos` relay carries `tl` + `wd` live, `liveStats` puts them on her entry.
- One-world model (coop-one-world now on main): her look is HER own fact (computed on her seat, never a W key), copied read-only onto her entry on the other seat — same model as the other LOOK fields (face, dress, hiệu…). Fits: both seats read the same number for each player. No new number or kit part.

## Tests
| test | result |
|---|---|
| coop-toil-look.js (2 seats, live Worker) | 29/29 PASS (r1 added: same look after one merged week; friend-page shots). One run failed at setup "both players are in the shared world" (network flake); rerun PASS |
| coop-e2e.js | 59/59 PASS (first run) |
| coop-one-world.js | PASS |
| toilette.js (solo) | FAIL before fix, ALSO ON MAIN f1509d7c (same hang) → test problem, fixed in r1 → PASS |
| toil-react.js (solo) | PASS (fails: [], errs: []) |
| quickcheck.sh HEAD | PASS · open 1067 ms · old save ok · perf new/live render 258/274, tab 325/318, buổi 965/1005 ms |

Why toilette.js hung: since KIT 81 (OD:L1261) the final-look reveal (.ktrv) ends only with its kit end button `.kmend` ("Tiếp theo"); a tap on the overlay only zooms. The test tapped `.ktrv-ov` 3 times and then waited 180 s for `#toildone` behind the still-open reveal. Fix (test only): tap `.ktrv-ov .kmend` when present (same as mk-e2e.js already does).

## Shots (scratch only, never in git; deleted)
Fold 686x880@2.2 (seat a) + iPad 1180x820@2 (seat b), friend's page open on both seats; also the stage. No overflow, no page errors. Her portrait stays a silhouette "Người lạ" until met (k61 rule), so her makeup is visible only where her picture is drawn; the binding check is the data check (look / dress / regard / face layer equal on both seats).

## SEPARATE BUG FOUND (pre-existing on live main f1509d7c, NOT caused by this branch) — urgent, kit keeper
Any figure wearing Điểm trang makeup (player, and the friend wherever her picture is drawn) shows as a DARK OPAQUE BLOCK on the stage and in the look reveal. Cause: CSS class clash — kit marks (j79.js ~L1225, kit-marks 597dc79c1) define a global `.kmk{background:currentColor;mask:…}` (the ✓/✗ icon), and the toilette face layers are `<img class="kmk …">` (jtoil toilFaceLayer / toilMkLayer). The img gets the dark background with a failed mask → dark box over the whole figure. Proven: with `img.kmk{background:none;mask:none}` injected the figure shows correctly with its makeup. Fix (one selector, no look change for the marks): scope the kit-mark rule to `span.kmk` (or rename one class), whole group = every `.kmk` rule in j79's style block. It is a kit part (j79 kit marks) → routed to the kit keeper, not fixed here. Seen in toilette.js shot 6-face-diem and the stage of seat B on both main and this branch.

## Notes (low risk)
- The Worker drops a `pos` message over 4000 chars (coop/worker/src/index.js `pos`). `tl` (~300 B) + `wd` (~120 B) are small vs the rest; hiếm / nhỏ (only that pos update is lost, next one carries it).
