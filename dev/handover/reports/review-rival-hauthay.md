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
