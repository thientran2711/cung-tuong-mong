# coop-room-faces — one face per person in the whole co-op room (MAIN 95 order, Foreman D #16)

Worker «COOP ROOM-FACES» session_01964izBkX79DBt4vJ5vYRrQ (opus BIG), child of Foreman D #16. depth 8 (limit 8), START_CTX ~3 % (1M window).
Branch `review/coop-room-faces` (from review/coop-pool-face-rv 6a654cac + LIVE 99795d67 merged; coop-pool-face had not landed). **SẴN SÀNG KIỂM af65ad628f56d6ea83512073695d1febbcd6b9fc**

PRIORITY #1 CHECK ('roomTaken fidUsed face picker'): OD 0 | ledger 0 | claims 0 (my row added first) | main 0 | review/* only review/coop-pool-face-rv 6a654cac (base) | archive 0.

## What was really wrong (probe dev/test/coop-room-faces.js, LIVE 99795d67)
The room audit (both seats, start + every merged week) lists every face anyone in the room wears and checks it against the list a new draw avoids.
1. **The 3-way merge dropped faces** (item 1): `coop/worker/src/merge.js` m3 takes the HOST's string list whole when both seats changed it, so every face the guest added to `fidUsed` (and the other face registries) that week was lost on the host → drawn again.
2. **Held faces were missing from the list even without co-op** (same family, found by the scan): court (Tổng quản / Kính sự phòng / … eunuchs, Thái y), the men (Thái y, Vương gia, …) and NPC consorts after the new-life face snapshot (j52 nlFaces puts back an older fidUsed) wear faces that are NOT in `fidUsed` — solo too (solo check: 8 entries, none of the court / men / consorts). A new draw could hand them out again. Natural repro: `maid:m14` worn by consort id4 AND new consort id11 on the host after week 2 (pre-fix run n).
3. **The friend's own people were invisible** (item 3): `roomTaken` / `figUsed` counted only the friend's identity; her maid / staff / kids (P blob) were not "used" on the other seat. LIVE natural run: `maid:m32` worn by the guest's staff AND host consort id10 at the start.
4. **Same free face drawn by both phones in one week** (concurrent draw): nobody yielded (RF_CLASH: `mama:k03` on a host consort's staff and the guest's maid for good).
5. **Face picker** (item 2): kit §23 PORTRAIT PICKER has no disabled/taken tile state → **KIT REQUEST** (FOREMAN_D_STATUS.md), item stopped. Data part only: `faceTaken(id)` (j88) for the kit keeper to read.

(«mama:k01 held twice» in the coop-pool-face probe: that probe counted nlHolders by value — a person in a `visit.people[].ref` is the same person listed twice. The real «one face, two people» cases are 1–4 above.)

## Fix (one rule each, one door each)
- **merge.js** (Worker; deploys on land via coop-worker.yml): `fidUsed, fidDead, usedFaces, kidUsed, fseen, fdead` merge as SETS — host list first (its removals stand: figGC, figThPick), then every entry the guest ADDED since the base; de-dup; a guest removal never applies (host-canon). Other lists unchanged (host whole). Unit test in coop/worker/test/merge.test.mjs.
- **j66 figUsed** = list + her identity + **every face held** (`figHeld`: walk of S + consorts + their people, court, men, kids; memo per turn/buổi/pid) + in co-op **every face of the room** (`COOPW.roomFaces`). Held faces are written into the list itself, so saves and week ends carry them. «man:thive-*» guards share by design (jmen) → left out. This is the one door every draw goes through (figPick, f88Draw, jstaff, jkc, jkcg, jht qnFid, jtut, h54Face, figThPick), so the client fix works even before the Worker deploys.
- **jcoopworld**: `roomTaken(C)` counts the friend with ALL her people (`friendFaces`); `CW.roomFaces()` (memo per merged week); **rfYield** (guest only, on her week end and every merged week): any of HER OWN people wearing a face someone else in the room wears is cleared and draws a free face at once — the guest yields, the host never moves its people; **rfWorldDup** (host only, before deser): two WORLD people with one face → the one the host already wore keeps it, the other is cleared and redrawn by the host.
- **j39 figGC**: room faces count as held (the host never frees the friend's maid's face).
- **j88 faceTaken(id)**: data only (see KIT REQUEST).
- Solo: figUsed now also holds the court / men / consort faces (scan item 2) — a solo draw can no longer reuse a living person's face. No UI, no number, no save format change (fidUsed only gains held entries).

## Before / after — every face / person-holder list in co-op (LUẬT SỬA CẢ NHÓM)
| list / check | before (LIVE) | after |
|---|---|---|
| fidUsed merge (W) | host list whole → guest adds lost | union, host-canon |
| fidDead / fdead merge (W) | host whole | union |
| usedFaces / kidUsed merge (W) | host whole | union |
| fseen (P) | host whole if both changed | union |
| figUsed() (every draw) | list + pid + friend pid | + every held face (court, men, consorts, staff, kids) + room faces |
| roomTaken / COOPW.taken (pidRoll, pidRoomFix guest) | W faces + friend pid | W faces + friend pid + all her people |
| figGC held (host frees servant faces) | local S + rivals | + room faces |
| guest's own people vs room | no check | rfYield: guest yields |
| world vs world (concurrent draw) | no check | rfWorldDup: host-canon |
| keepFaces (guest week end, W faces) | already holds base faces | unchanged |
| face picker | no room check | faceTaken() data; grey tile = KIT REQUEST |
| dnames / nmReg (names, not faces) | host-written | unchanged (coop-name-clash owns it) |

## Probe dev/test/coop-room-faces.js (both seats: A host Fold 686x880@2.2, B guest iPad 1180x820@2, real Worker, 2 merged weeks)
Checks on each seat at start / week 1 / week 2: (1) every held face is in figUsed · (3) roomTaken holds all the friend's people · (2) faceTaken marks them · (D) no face worn by two people. RF_LIST=1: both seats draw a new face in week 1. RF_CLASH=1: guest's maid given a face a host-world servant wears.
| build | natural | RF_LIST | RF_CLASH |
|---|---|---|---|
| LIVE 99795d67 | **FAIL 11/35** (dup maid:m32 guest staff + host consort) | **FAIL 18/36** | **FAIL 13/37** (mama:k03 twice for good) |
| pre-fix 1808c9e6 (= pool-face + LIVE) | FAIL 15/35 (dup maid:m14 two consorts wk 2) | FAIL 18/36 | (finder fixed after) |
| fix | **PASS 35/35** | **PASS 36/36** | **PASS 37/37** (guest maid moved, host keeps) |

## Gates (fix af65ad628f56d6ea83512073695d1febbcd6b9fc)
- coop-e2e both seats (A host Fold, B guest iPad, real Worker): 94/94 (7bc06cf1, on LIVE 99795d67) · on af65ad62 (LIVE 468835a7, now 124 checks): 124/124 alone; one 120/124 run was while two probes ran beside it (guest's week end late under load), rerun alone PASS · second run alone 124/124
- coop-room-faces probe (both seats): natural 35/35 · RF_LIST 36/36 ×2 · RF_CLASH 37/37 ×2 (LIVE: 11/35, 18/36, 13/37 FAIL)
- coop-pool-face probe: PF_FORCE 13/13 (forced c07, guest moved) · PF_TWIN (3 weeks) 21/21 (c07 host kept, guest → c08) · natural 13/13
- coop-night: 105/105 (rerun; LIVE 105/105 side by side). First run 99/101 cases 4–5 while coop-e2e ran beside it (load), not reproduced.
- Worker unit tests: merge (+ face-registry union cases), thin, seat, stale, vault: all OK
- quickcheck: PASS (7bc06cf1; core gates PASS, old save ok, render 268/276, tab 482/546, buổi 1390/1381 ms new/live). af65ad62 = + LIVE 468835a7 only (no co-op file of LIVE touched).
- LIVE-revert audit vs 468835a7: diff = merge.js (+test), j39, j66, j88, jcoopworld, the two probes, built index.html/sw.js; every removed line is a coop-pool-face / own line replaced in place. No LIVE line lost.
- No UI change → no device shots.

## Not done / notes for Foreman D
- Item 2 grey tile: KIT REQUEST (kit §23 has no disabled tile). Until then a pick of a taken face in co-op is still moved to the next free face by pidRoomFix (unchanged).
- merge.js change takes effect when the Worker deploys (coop-worker.yml on push to main). The client fix alone already closes every probe case (tests ran against the deployed Worker = old merge).
- Old rooms / saves with a dup already in them: the guest's own people move once (rfYield); a world dup is repaired on the host's next merged week; solo old saves with a dup keep it (no solo repair, held faces are just never drawn again).
