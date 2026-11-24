# D re-merge + LAND READY train (worker session_01D3E3Na1itJyTLYhXYvK1Zr, opus BIG; brief briefs/D-remerge-land.md)
PRIORITY #1 CHECK ('re-merge'): OD 2 | ledger 0 | claims 8 | main 1 | review/* 0 | archive 0 — reuse: the 6 REVIEW PASS shas of the brief (+ item 7 d-followups-1-rv 563d336b from Foreman D 18:28Z); none on LIVE at start (LIVE 284e0d08).

| # | branch | PASS sha | base LIVE | merge sha (pushed) | conflicts | gates |
|---|---|---|---|---|---|---|
| 1 | review/servant-trust-rv | 59ea20a8 | 284e0d08 → 502c48c9 | 65abb0de | index.html/sw.js only (rebuilt); code clean | servant-trust 71/71 ×3, net-build 189/189, svt-scan 67/0, one-core ×4 PASS, oldsave ok, npcmind ERRS [], coop-e2e 142/142 ×2 (1 earlier 141/142 flake, LIVE 142/142), quickcheck PASS ×2 |
| 2 | review/promo-build-2-rv | 70571e8a | 502c48c9 | 4defb821 | index.html/sw.js only (rebuilt); code clean | promo-build 48/48 ×3, kit-promo-hook Fold+iPad, promo-rules/skip/next-rank = LIVE fail sets, mrfoot 59/0, net-build 189/189, one-core ×4, oldsave ok, npcmind ERRS [], coop-e2e 142/142, quickcheck PASS |
| 7 | review/d-followups-1-rv | 563d336b | 502c48c9 (already merged by its reviewer) | 563d336b (no new commit) | — | reviewer gates on this head; carries items 1, 2, 6 |
| 3 | review/law1-gifts-rv | e3e3382b | 502c48c9 | 68f9fb63 | 2 code hunks resolved (below) + index.html/sw.js | law1-gifts PASS ×3, net-build 189/189, net-scan = LIVE, one-core ×4, oldsave ok, npcmind ERRS [], coop-e2e 142/142 (after one CDN-CORS 141), quickcheck PASS (after one CDN-timeout manifest-guard FAIL), pcard-dislikes = LIVE card-row set + life-random gift cascade |
| 4 | review/palace-distance-rv | 7cc392fb | 502c48c9 | 93be6058 | index.html/sw.js only (rebuilt); code clean | palace-distance 27/27 ×3, ban-cung 33/33, coop-ban-cung 26/26, one-core ×4, oldsave ok, npcmind ERRS [], coop-e2e 142/142, quickcheck PASS |
| 5 | review/robot10-nc-fix-4-rv | 32b6bbdc | 502c48c9 | 5fbd683d | 2 code hunks resolved (below) + index.html/sw.js | r10-stip-noqueen 6/6 (save nc-B-tuc/saves/20261124-0057-001.json), bongloc-options 14/14, net-build 189/189, one-core ×4, oldsave ok, npcmind ERRS [], coop-e2e 142/142, quickcheck PASS |
| 6 | review/kit-promo-hook-rv | 73c692ca | — | — (ancestor of promo-build-2-rv / d-followups-1-rv) | — | lands with item 2 / 7 (kit-promo-hook test Fold + iPad PASS on 4defb821) |
Tooling notes: promo-rules needs the normal (CDN) build, a CTM_IMG_BASE= build fails «person reveal» (no figure image); two-way-oldsave needs file:// URLs, npcmind-check plain paths; LIVE build for old-save gates = worktree of origin/main built with CTM_IMG_BASE=.

## Resolved hunks — law1-gifts-rv 68f9fb63 (LIVE = net-build netTh edits; branch = law1 giftPickIx / tsLeGifts)
| file:line | LIVE (502c48c9) | branch (e3e3382b) | resolved |
|---|---|---|---|
| dev/build/j8.js:460 (npcMonthly ally) | `rel(v,t)>=netTh(v,"quen")` (was `>10`) | unchanged `>10` | LIVE `>=netTh(v,"quen")` |
| dev/build/j8.js:461 (NPC rival gift) | `t===S&&v.rel>=netTh(v,"quen")` (was `>5`); `v.inv.findIndex(...)` | `giftPickIx(v,t,okR)` + `if(i>=0)`; gate `>5` | branch giftPickIx + `if(i>=0)`, gate LIVE `>=netTh(v,"quen")` |
| dev/build/jts.js:268 + 288 (lễ rite gifts) | inline `aff(v,S)>=netTh(v,"than")`, piece made from a list | moved to `tsLeGifts(G,host)` with `aff(v,host)>=30`, real piece via giveTo | branch tsLeGifts, gate LIVE `aff(v,host)>=netTh(v,"than")` |
No rule value or behaviour changed beyond moving code: every gate is LIVE's netTh read; every behaviour is the branch's.

## Resolved hunks — robot10-nc-fix-4-rv 5fbd683d (LIVE = BAL/netTh edits; branch = payCutTxt text)
| file:line | LIVE (502c48c9) | branch (32b6bbdc) | resolved |
|---|---|---|---|
| dev/build/j15.js (Quyền Hoàng hậu, «Khất bổng lộc» option) | pvRel(v,BAL.ag.hh.pardonRel), Đức \${balSg(BAL.ag.hh.pardonDuc)} (was 30 / +2) | «bớt \${payCutTxt()}» (was «3 phần 10») | LIVE line + branch \${payCutTxt()} |
| dev/build/j20.js (queenRewards gate + Hoàng hậu help text) | rel(q,p)>=netTh(q,"than") (was >=20) | «khất bổng (bớt \${payCutTxt()})» | LIVE line + branch \${payCutTxt()} |
No rule value or behaviour changed: gates = LIVE BAL/netTh reads, text = branch BAL.payCut.

## STATUS: TRAIN DONE (24/11). Worktrees /home/user/wt/rml* removed after push.
