# REVIEW coop-room-faces — reviewer «REVIEW coop-room-faces» (session_01964izG9Y4kjoEj3uahaXBo, BIG co-op, child of Foreman D #16 → reports to D #17 session_01964izBrTYM1xdxezCgqLER)
START 2026-11-21 15:23Z | depth 8 (limit 8) | START_CTX ~5 % (1M window) | rollover at 30 % (not reached; ~13 % at verdict).

PRIORITY #1 CHECK ('roomTaken fidUsed face picker'): OD 0 | ledger 0 | main: coop-pool-face (j66 pidRoll/pidRoomFix/figUsed, jcoopworld roomTaken/keepFaces) landed 270c6251 during this review | review/* review/coop-room-faces af65ad62 (worker), review/coop-pool-face-rv 6a654cac (base, now on main) | claims COOP ROOM-FACES worker session_01964izBkX79DBt4vJ5vYRrQ.

## VERDICT: PASS (no code fix; 1 probe addition)
**LAND READY review/coop-room-faces-rv 500dffbdd53894592a3558eec4cee4944564f22f** (= worker af65ad62 + LIVE e236bda5 + LIVE a201d968, the newest main; built index.html/sw.js conflicts only → rebuilt with dev/site/build_site.sh). coop-e2e PASS + probe both seats.
Worker deploy: coop/worker/src/merge.js changes → the Worker redeploys on land (coop-worker.yml). The client part alone already closes every probe case (all runs here used the deployed, OLD Worker merge).

Reviewer commit e8de2fac (probe only): coop-room-faces.js now also checks the repairs fire only on a real clash and by role — host never yields, guest never runs the world-dup repair; a natural room moves nobody (no false hit on a log copy / ref of a person); RF_CLASH → the guest yields.

## What the diff does (whole diff read: merge.js +test, j39, j66, j88, jcoopworld, probe)
1. **merge.js m3**: `fidUsed, fidDead, usedFaces, kidUsed, fseen, fdead` (plain-value lists only) merge as sets: host list first (host removals stand: figGC frees, figThPick), then entries the guest ADDED since the base, de-duplicated; a guest removal never applies. Every other list unchanged (host whole). Recursion passes the key on every path (object keys l.40, id-arrays l.51). Old rooms: compatible (no format change; a list missing on one side falls back to the old rule). Security: no new surface — before, a guest's whole list already won whenever the host had not changed it; union only adds the guest's additions.
2. **j66 figUsed** = list + her identity + `figHeld()` (every `fid` held in S + rivals, `man:thive-*` guards excluded by design, list keys and `visit` skipped, memo per turn/month/tuần/buổi/R.length/pid/fid/base) + in co-op `COOPW.roomFaces()`. Held faces are written into the list (saves / week ends carry them). Replaces coop-pool-face's friendPid push in place (roomFaces → friendFaces includes her pid). Solo effect: court / men / NPC consorts after the j52 snapshot now count as used (solo dup maid:m14 closed). Old solo saves with a dup keep it (no solo repair) — acceptable, noted by worker.
3. **jcoopworld**: `roomTaken` counts the friend with ALL her people (`friendFaces`; `noFriend` twin fix kept); `CW.roomFaces` memo per merged week; `rfYield` (guest only; toCanon + every fromCanon): any of HER OWN people wearing a room face is cleared and redrawn — host-canon; `rfWorldDup` (host only, before deser): two world people with one face → the one the host already had keeps it.
4. **j39 figGC**: room faces are held (host never frees the friend's maid's face).
5. **j88 faceTaken(id)**: data only for the picker.

## Item 2 (picker grey) — KIT REQUEST is CORRECT (law 9 KIT FIRST, OD:L1103)
§23 PORTRAIT PICKER (`kitPicker`) has only selected / unselected tile states. The kit's existing greyed tile `.kshno` (§28.13e/§28.13i) belongs to the ITEM tile part: its CSS is `.kshc.kshno .kshpic>.kitem-slot{…}` (jinv.js:507), so it cannot grey a portrait tile without changing a kit part — only the kit keeper may do that (OD:L1103 (1)–(2)). The worker stopped the UI part, filed the KIT REQUEST (FOREMAN_D_STATUS, «taken» tile state + reason in the kit lock chip) and shipped the data (`faceTaken`). Until the kit part ships, a pick of a taken face is still moved to the next free face by pidRoomFix (unchanged behaviour, no silent dup).

## The 18 laws
- Law 6(b)(c) real people, one stable face: no two people in the room wear one face (probe D on both seats, start + every week); a world person never changes face for a player's person (guest yields, host-canon; host world-dup keeps the face the host already had). PASS.
- Law 1 two-way host/guest: one rule by role on both seats — the guest yields on either seat order; host never yields (probe «repairs by role»). PASS.
- Law 11 fix the whole group: worker's before/after table covers every face registry + holder list in co-op (merge lists, figUsed, roomTaken, figGC, guest-vs-room, world-vs-world, keepFaces, picker; names left to coop-name-clash). PASS.
- Law 9 kit first: no private UI; picker grey stopped as KIT REQUEST (above). PASS.
- Law 4 one core: no numbers. Law 7 wording: no text. N/A.

## Gates
Probe dev/test/coop-room-faces.js (A host Fold 686x880@2.2, B guest iPad 1180x820@2, real Worker):
| build | natural | RF_LIST | RF_CLASH |
|---|---|---|---|
| LIVE e236bda5 | **FAIL 17/36** (court/men not in figUsed; friend maid m32 not in roomTaken; no faceTaken) | — | **FAIL 12/38** (maid:m21 on host consort AND guest staff) |
| LIVE a201d968 | — | **FAIL 16/38** (same face misses) | — |
| fix e8de2fac (+e236bda5) | 35/35 · 45/45 (3 wk) · 37/37 (with repair check, nobody moved) | 36/36 | 37/37 · 39/39 ×2 (guest yields m13→m50, k03→m33) · one 36/37 under parallel load (below) |
| fix 500dffbd (+a201d968) | 37/37 | 38/38 · one run week-stall (below) | every face check ok; week-stall runs (below) |

- coop-e2e both seats: e8de2fac 124/124 ×2 (one earlier 114/124 = host stuck on a queued «cnvScold» dialog at week end, not reproduced; LIVE e236bda5 124/124 side by side) · **500dffbd 124/124**.
- coop-pool-face probe: e8de2fac PF_FORCE 13/13 · PF_TWIN (3 wk) 21/21 · natural 13/13 · **500dffbd PF_FORCE 13/13 · PF_TWIN 21/21**.
- coop-arrive-see (landed in a201d968, touches presence): 500dffbd L9 89/89.
- coop-night: e8de2fac 105/105 · **500dffbd 105/105**.
- quickcheck: e8de2fac PASS (core gates PASS, time-spill PASS, old save ok, render 224/284, tab 458/507, buổi 1059/1416 ms new/live) · **500dffbd PASS** (core gates PASS, old save ok, render 222/261, tab 442/403, buổi 1123/1315 ms new/live).
- Worker unit tests: merge (+ face-registry union) · seat · stale · thin · vault · ws: all OK.
- LIVE-revert audit vs a201d968: diff = merge.js (+test), j39, j66, j88, jcoopworld, probe + built files; the 5 removed lines are coop-pool-face lines replaced in place (figUsed friendPid push → figHeld/roomFaces, toCanon head, fromCanon end, roomTaken). No LIVE line lost.
- No UI change → no device shots.

## Notes for Foreman D (not blocking)
1. **Probe week-stall is pre-existing on LIVE a201d968**: the room-faces probe harness (weekBoth) sometimes cannot advance a week (guest «Sẵn sàng» disabled with one queued dialog, Q:1); on LIVE a201d968 RF_LIST both weeks failed to advance, on the fix some RF_CLASH/RF_LIST runs too, every face check stays green. coop-e2e (its own harness) passes on the same head. Looks like a dialog the probe's clear() does not dismiss since the newest LIVE (coop-arrive-see / dialog-person-3 landed); worth a look in the harness, not in this change.
2. Concurrent draw is repaired within one merged week: when the host draws a world servant's face AFTER the guest's last merge and the guest draws the same face, the host shows the duplicate until the guest's next merge (guest yields there). Seen once under parallel load (RF_CLASH 36/37); the world person never changes.
3. Item 2 stays open on the kit keeper (KIT REQUEST «taken» tile for §23).
4. Old solo saves with a dup keep it (no solo repair); new draws never reuse a held face.
