# review-staff-root-r1 — BIG review of review/staff-root e0431afa (opus reviewer)

PRIORITY #1 CHECK ('capOf|promo.cap|hhHas|capTrim|gtAtHome|all40'): OD 5 (L1133, L1155, L1317, L1497 incl. 02:50Z correction, L1549) + STATUS orders 02:46Z/02:50Z/04:49Z read verbatim | ledger 0 | main: capOf j10.js:5 (private) + wrappers jpromo:37, jstaff:27 + 8 stale unbuilt snapshots dev/build/all40*/all4x/all_asm* holding the same private table (all40.js:1439 = the file the owner's 02:50Z correction names) | review/*: staff-root e0431afa (this), one-core-dup2-r2 069188d7 (trial-merged) | claims: staff-root-r1 = this reviewer.

START_CTX ~5 % (estimate).

## VERDICT: PASS review/staff-root-r1 1abbf075 (parent = worker e0431afa; ancestor = origin/main 9391f9a9 → fast-forwardable)

Reviewer commit 1abbf075 (2 fixes):
1. **CO-OP guest household never trimmed (real bug, fixed).** S.staff is a PERSONAL key (jcoopworld W_KEYS has no staff; "the guest computes only HER OWN person"), but `capSweep()` returned at once on seat b, and the host's friend entry has `staff:[]` — so nobody ever trimmed the guest's own household. Probe: guest at Phi with [3,1], demoted to Thường tại → stayed [3,1] (cap [2,0]). Fix (j10): on seat b `capSweep` trims HER OWN household only (NPC households stay the host's) and does not touch `fidUsed` (a world key). After: [2,0]. New case 13 in dev/test/staff-root.js (guest seat: own trimmed, NPC unchanged [4,3]→[4,3]).
2. **Last copies of the private cap table deleted.** dev/build/all40.js, all40no.js, all41.js, all42.js, all43.js, all_asm43.js, all_asm_40.js, all_asm_no.js (stale, not in assemble.py, ~4 MB) still held `capOf ... r>=7?[4,2]...` + the "+1" counts — the owner's 02:50Z/04:48Z orders say "delete any other copy, e.g. capOf in all40.js". Only net-scan.py referenced them (skip list) → updated. `git grep "return r>=7?\["` over dev = 0.

## (1) ROOT — checked independently
- ONE capOf (j10) reads BAL.promo.cap for her AND every NPC (two-way); cold palace = row 0; servant road = [0,0]; Thái hậu = BAL.promo.capTh. Wrappers jpromo/jstaff gone. Whole-build grep of every `staff.push` path (24 sites): direct adders now cap-checked (j6 hire, j29 hire, j14 buy, jpromsv spGoTo, j72 capOk, jpromo prStaff, j10 plantServ→capTrim); the rest (j29:57 servant moves up, jcmaid:72 old close maid, jcoopask:92) are caught by capSweep on the next render/buổi/month — she never sees over-cap.
- hhHas = personal maid counted once; no other "length+1" in built modules (only j17 census + jwhy eunuch guard count, which are not caps).
- gtAtHome in ONE place (jstaff), used by addStage + j95 vis + j95 elderK; cn origin / risen servant → never in her room.
- Other residents' staff not shown as hers: shots (Fold + iPad) room = her + close maid + her 1 maid ("Ở đây còn 2 người"); Cung nhân tab "Cung ta" = 2, "Trong cung" = court eunuchs, "Cung Thái hậu" = the ma ma — separate groups.

## (2) NUMBERS
Table [1,0][2,0][2,1][2,1][3,1][3,2][4,2][4,2] (+ cold [1,0], Thái hậu [4,2]) = exactly the brief. Sane: owner's 04:48Z order (lowest = 1 servant) and OD:L1155 ceiling override history (Qing statute is larger: Đáp ứng 2 … Hoàng hậu 10 cung nữ); low ranks keep no eunuch / no own ma ma as ordered.
- Month loop re-run by me (dev/measure/staff-month.js, n=36 lives × 12 y, 8 origins): **0 over-cap / 46 653 checks**; max per rank = the table exactly; servants in palace max 25. Early death (<5 y) 7/36 (worker: 11/36 after, 13/36 before) → noise (binomial sd ≈ 2.7 lives).
- Play bot (staff-bots.js): see §BOTS below.
- Named people: real old saves after load = 45–49 named (her + 12–13 consorts + their personal maids + 20 servants + 4 court + Emperor + Thái hậu) — near the "~40 of her life" (OD:L1317); before (old build) servants were 24–25 → now 20.

## (3) OLD SAVES + DEMOTION — real old saves from the origin/main build, loaded through the title "load" button
| save (main build) | before | after load (this build) | lost named | errors |
|---|---|---|---|---|
| Hoàng quý phi, full household (old cap [4,4]), trusted maid loyal 92, her spy | [4,4], NPC servants 16 | [4,2]; the 2 least trusted eunuchs sent to Nội vụ phủ (log line); trusted maid + spy kept; NPCs 14, none over | 0 named palace women (kn/gt/tn kept); 2 ordinary servants reassigned | 0 |
| Thường tại (cn origin), [2,1] | close maid + maid + eunuch | [2,0]: eunuch reassigned (loyal 27 → log line, no scene) | 0 | 0 |
Then a buổi + month played, 0 page errors. Farewell scene for a trusted one (loyal ≥ trimTrust 70) covered by staff-root case 5/7. Demotion Phi→Thường tại trimmed (case 8).

## (4) CO-OP
coop-e2e **62/62** (first run, no flake) · coop-one-world **PASS** · guest-seat fix above (staff-root case 13).

## (5) KIT + WORDING
No new UI part: farewell = existing Q modal + pServ figure; hire rows use the existing kit row ("✕ đủ số theo phẩm"). New player text: "Nội vụ phủ định lại kẻ hầu theo phẩm vị: … được điều sang hầu nơi khác.", "Nội vụ phủ điều người", farewell lines ("Nô tỳ đi rồi, xin chủ tử giữ gìn…"), button "Đành vậy" — cổ trang, no %, no numbers. Shots looked at (scratch only): Fold 755x1000@2 room + staff tab, iPad 1180x820@2 room + staff tab — no overflow, no page errors.

## (6) GATES
- staff-root **13/13** (12 + guest case) · one-core-guard 0 fails (inline 6642 ≤ 6691, no --allow-grow) · promo-rules **20/20** (Fold + iPad @2, old build = origin/main) · promote-servants 22/23: the one FAIL "1180x820 two-road card overlap" is **pre-existing on origin/main** (same FAIL on the main build, 18/19) — not this branch.
- house-stage: on origin/main the SAME checks fail ("her shown 12x", "household member not shown once", "tap did not open his card") → pre-existing, confirmed.
- quickcheck: CORE GATES PASS · time-spill PASS · open 1418 ms · old save from live loads + plays · perf render 296/242 ms, tab 369/300, buổi 1010/999 (live runs alone spread 215–258; capSweep measured at 0.03 ms/call → noise) · only FAIL = "NOT BUILT" (index.html not rebuilt, left to the merge batch as for every review branch).
- Base: origin/main 9391f9a9 = latest (fetched 17/11 ~10:00Z); no new main to merge.
- Trial merge with review/one-core-dup2-r2 069188d7: 15 conflicting files (assets.json, assemble.py, j10, j22, j24, j42, j43, j9, j92, jkc, jtin, jts, jveil, index.html, sw.js) — **the identical set appears when dup2 is merged into origin/main without staff-root**; staff-root adds NO conflict hunk (j10's one hunk is the bestSent/net.k lines, dup2 vs main). staff-root's files j14/j15/j6/j72/j95/jbal/jpromsv auto-merge; after the merge capOf/hhHas/gtAtHome/BAL.promo.cap are intact and no private table returns. Note for B: a naive dup2+main merge (-X ours) throws "Cannot read properties of undefined (reading 'j72')" at load — dup2 needs its own careful re-merge of main (not a staff-root issue).

## BOTS (play bot re-run)
dev/measure/staff-bots.js on this build, 4 lives (tt, dtq, muoi, cn; 600 s cap each): **0 over-cap / 2 755 buổi-end checks**, max per rank = the table, servants in palace max 22, 0 errors, 0 unsticks. HH 2/4, early death 1/4 — n=4 is far too small to read a shift; together with the worker's 8+15 lives and my month loop (n=36, early death 7/36 vs 13/36 before) nothing points to a real change → noise.

## Notes for Foreman B (not blocking, feature freeze)
- Reassigned servants simply leave the data (same as the existing "Đổi người"/"trả về Nội vụ phủ" family); putting them into S.npool would make "reassigned" visible later — idea only.
- Stage shows "+N" chip when more people are present than drawn (pre-existing, seen on main).
- promote-servants two-road card overlaps at 1180x820@2 on main (kit card family) → kit keeper.
- house-stage test is stale on main.
