# REVIEW rival-hauthay (TIER BIG) — PASS-PENDING-BASE

Reviewer: session_01964izCzS3APtxAsgZxDkgd (opus), depth 4, for Foreman D #12. Worker: session_01964izDuRCG31a2ffq84NH7.
Branch review/rival-hauthay ff63a590f342d761d031e1120f39af5e842ba8d3, base review/night-final-r3 73a09248 (base is an ancestor: checked).

PRIORITY #1 CHECK: OD L33/L1534 (two-way law), OD 17/11 ~02:05Z (co-op parking) | main dev/build/j75.js rivalNight, j8.js:316 PEND.ksp «Tiến cử», j8.js:366 sendMaid, jagmaid.js:140 sendMaid wrapper | review/* rival-hauthay ff63a590, night-final-r3 73a09248 | claims CLAIMS.md «GAP j75 rivalNight hầu-thay» = worker DuRCG31a.

## Verdict
**PASS-PENDING-BASE review/rival-hauthay ff63a590 (lands after night-final-r3).** No fixes made by the reviewer; nothing pushed to review/rival-hauthay-rv (no merge needed yet). When night-final-r3 is LIVE, D tells me (or my successor) to final-merge LIVE and post LAND READY.

## Code read (diff = j75.js +14/-1, jagmaid.js +2/-4, 2 new tests, rebuilt index.html / sw.js)
- Law 1 two-way: the NPC now chooses at the SAME point as her ksp card (before the night) and calls the SAME `sendMaid(v)` as her «Tiến cử» (`go:()=>log(sendMaid(S))`). With agents on, the jagmaid wrapper runs amNightGain + amRise/amFav (BAL.ag.maid) for both; agents off, j8 sendMaid for both. Solo test case 2 proves the same number for her maid and the NPC's maid (same Sắc, fixed roll). Mistress after a send: no nights/nightLog, Sủng/Ân, pgUp, night(), prep, pillow, bestow — exactly her path (her ksp option 2 skips nightScene/nightFx). Tablet kept on both sides (her S.tablet is spent only in nightFx). PASS.
- Law 4: no typed number in the diff; G1 guard/text/bind sub-checks pass (only the inherited growth line fails, below). PASS.
- htCan honest: stolen = nightWhy.cause "stolen" (j75 flip, jnf:121, jsteal:50 — her stolen nights get the nfsum card without «Tiến cử»); visit = S.visNpc (her empnight card has no «Tiến cử»); maid busy = jptime ptMaidOut (NPC-only by design, v!==S; jptime already wraps sendMaid/amSendQ the same way, so htCan only makes the night play instead of being lost to nobody). r1→r2 S.ntk fix correct: j75:39 resolveTonight wrapper ntTake()s every holder, so S.ntk cannot mean "stolen". PASS.
- Law 11 whole group: every road into an NPC night goes through resolveTonight → rivalNight (tablet, custom mùng 1/rằm, stolen, visit — jvisit sets S.tonight=p); readers: nightLog/Sổ (record only via amRise on a raised maid), pregnancy night() (raised maid only), jnf text replace (header line kept in the same words), jagmaid amNightTea (now skipped when AMN.send moved — correct), jagmaid record pop removed (nothing to pop). Co-op: jnf:298 + jcoopworld:733 keep NPC nights host-only; guest decides nothing (coop test 2). PASS.
- Law 6b: agents on → the maid is the same person (amRise f88Carry / amFav). Note (pre-existing, not this branch, same on both sides): the agents-off j8 fallback makes a fresh-named consort and a stub replacement maid — parking-lot only.
- Player path unchanged: j8 untouched; jagmaid sendMaid wrapper only lost the NPC else-branch. PASS.
- No UI change (no screens needed; kit untouched).

## Gates (one at a time, on ff63a590 in /home/user/wt/rhrv; assemble.py rebuild → no diff, index.html is the branch's own build)
| Gate | Result |
|---|---|
| rival-hauthay.js ×10 | 10/10 ALL PASS 11/11, 0 page errors |
| night-book-day | exit 0, 0 page errors |
| agmaid_check | ALL 23 PASS |
| night-final | exit 0, 11/11 pass |
| night-multi | exit 0, 8/8 pass |
| night-day | exit 0, ok true |
| coop-e2e (2 seats, live Worker) | 68/68 |
| coop-hauthay (feature co-op check, Fold host + iPad guest, live Worker) | 12/12, 0 page errors both seats |
| quickcheck (vs live 24dd2c62) | open 1643 ms 0 errors · old save loads + plays a buổi · time-spill PASS · perf median new/live render 224/265, tab 411/495, buổi 1110/1240 · FAIL only G1 «frozen list grew 3930 -> 4212» |

## G1 owner (verified)
dev/test/one-core-baseline.json is byte-identical on review/rival-hauthay and review/night-final-r3 (this branch adds 0). night-final-r3 carries total 4212 (file last touched fb76ed7b «seal-lean-2: rebuild site after merge», 19/11 05:57Z), live main 24dd2c62 has 3930 (since 4e78e63e choice-value-audit #4, 19/11 07:43Z); origin/main is NOT an ancestor of night-final-r3. Owner = **night-final-r3 chain #5** (stale baseline from before main's shrink; fixed by its final merge of LIVE main taking main's list / regenerating with --update by the coordinator). When D tells me to final-merge LIVE after night-final-r3 lands, quickcheck G1 must read ≤ live.

## CO-OP LAND GATE
coop-e2e PASS 68/68 + feature co-op check coop-hauthay 12/12 on both seats (2 players) + solo rival-hauthay 11/11 — to be re-run on the final merge for LAND READY.

## For the final merge (D #12, 21/11 ~00:35Z)
- G1 root cause per chain #5: nf-r3 73a09248 carries the list of LIVE 983a9436 (4212); LIVE 548dcd0d shrank it to 3930; fixed by nf-r3's LIVE merge fc480ca8 (guard 3740 ≤ 3930). This branch adds 0 (verified: baseline file byte-identical to its base).
- MAIN ROOT-82 UNPARK: night-final-r3 runs the NEW night in co-op on both seats (flip choice + giữ chân). At the final merge re-run coop-hauthay against the unparked co-op night (add a case if needed: host NPC hầu-thay must look the same on the guest under the new flow), plus all gates above. Worker DuRCG31a archived → FAIL needing code: tell D, D opens a fixer.
- (D #12, 21/11 01:47Z) ⚠ night-final-r3 73a09248 REVERTS LIVE hunks (stale shallow-merge side: jbal2 BAL.orig.id gone, old cal-p2b tunes); ff63a590 inherits it. NIGHT LAND CHAIN #7 re-ports night-final onto LIVE. FINAL MERGE METHOD: do NOT merge LIVE into ff63a590; replay ONLY this branch's own diff (git diff 73a09248..ff63a590: j75.js, jagmaid.js, dev/test/rival-hauthay.js, dev/test/coop-hauthay.js; rebuild index.html/sw.js) onto the NEW night-final-r3 head after it lands, on a full-history clone; check `git diff LIVE..yours` holds only night + hầu-thay intent; re-run all gates + coop-hauthay vs the unparked co-op night. Push to review/rival-hauthay-rv.

## FINAL — LAND READY review/rival-hauthay-rv ddcca5c1 (FF on LIVE bb92f986) — 22/11 ~03:50Z, GO from D #18
Method (D #12 01:47Z): replayed ONLY 73a09248..ff63a590 (j75.js, jagmaid.js, tests rival-hauthay.js + coop-hauthay.js) onto LIVE bb92f986 (bundle 8746a062 + od03-favart); patch applied cleanly at --depth=30 (no deepen, no full clone); site rebuilt with build_site.sh. `git diff bb92f986..ddcca5c1` = j75 +14/-1, jagmaid +2/-4, 2 new tests, index.html/sw.js: hầu-thay intent only. LIVE still routes every NPC night through resolveTonight → rivalNight (j3/j42/jkc endTurn); the stolen (jnf/jsteal), visit (jvisit) and busy-maid (jptime ptMaidOut) markers htCan reads are unchanged on LIVE.
| Gate (on ddcca5c1, one at a time) | Result |
|---|---|
| rival-hauthay.js ×10 (solo) | 10/10 ALL PASS 11/11 |
| night-book-day | exit 0, 0 page errors |
| agmaid_check | ALL 23 PASS |
| night-final | 11/11 |
| night-day | ok true |
| night-multi | 4 branch runs: 1 green, 3 fail ONLY case 6 «choice cards print BAL numbers» sub-check k (the «kèm» line of the Tranh sủng / Chặn ngự giá cards). PRE-EXISTING LIVE FLAKE: LIVE bb92f986 index.html fails the same case 1 of 2 runs; this branch does not touch those cards. Owner: night-balance bundle 8746a062 (night-multi.js). |
| coop-hauthay (feature co-op check, 2 seats, live Worker, LIVE's unparked co-op night) | 12/12 ×2 |
| coop-e2e (2 seats, 3 serial runs) | 129/129 ×3 |
| quickcheck vs LIVE bb92f986 | PASS · core gates PASS (G1 resolved) · open 1640 ms · old save ok · perf new/live render 259/268, tab 412/408, buổi 1152/1283 |
CO-OP LAND GATE: coop-e2e PASS (129/129 ×3) + the feature's own co-op check coop-hauthay 12/12 on both seats (2 players) + solo rival-hauthay 11/11.
