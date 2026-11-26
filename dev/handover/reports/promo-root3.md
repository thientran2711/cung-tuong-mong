PRIORITY #1 CHECK: OD 0 rulings on «exam pass but no rank» | main 3af7896e (⊃ LIVE 6b5d3d05) jexam.js:159-172 exDone→promoteP, :255-262 exSrvRise/exSrvDone, j8.js:433 promoteP, j42.js:289 srvMonth | review/promo-root (PROMO-ROOT/ROOT2 forgetSafe), review/robot-realtap 5c62c2b9 (harness, rt-offer.js) | claims PROMO-ROOT3 = this session. Reused: promo-root.js page setup, promo-exam.js, rt-offer.js rule.

# PROMO-ROOT3 — «exam road taken 24×, rank never moved» (robot s11b, LIVE 6b5d3d05)

Branch `review/promo-root3` 987c3599 (base origin/main 3af7896e). Worker PROMO-ROOT3 session_01V1ZZH3cQjartTvYvycx68b, child of MAIN CHÍNH 157.
**Result: no game apply bug. Every rank-up road raises the rank and the rank survives save → load. The «rank 0» is a robot METRIC gap (+ the known #kg82 board-play gaps of harness 08a4ff8b). No game code changed.**

## 1. Root cause
1. **s11b is on the cung nữ (maid) road.** The «Thăng bậc» dialog seen at b~292 exists in exactly two places, both HER maid rise: j42.js:289 (old srvMonth rise) and jexam.js:257 exSrvRise (pass of «Khảo hạch Nội vụ phủ») — grep «Thăng bậc» over dev/build: no other dialog (jevfit.js:96 is only a picture-fit regex). So at b~292 she **did** rise a maid rung (S.srv.rk +1).
2. **A maid has no consort rank: S.rank stays 0 by design** until she is raised to Đáp ứng (srvRise; Đáp ứng = rank 0 too). Her rank is `S.srv.rk` (SRK.maid). The harness (review/robot-realtap dev/test/robot-rt.js:121, :169, :212, :279, :361, :506) logs `S.rank` only → «rank 0 at all 128 looks» for every maid life whatever she earns. The 31 «exam» offers are «Khảo hạch Nội vụ phủ» cards / rounds (rt-offer.js EXAM_RE matches both roads).
3. Exams she failed: harness 08a4ff8b still had the #kg82 board-play gaps (FOREMAN_F_STATUS 08:43Z–08:49Z: «Bỏ qua» / «Gợi ý ×4 → Quay lại», no board taps) → a left board is settled by exSrvTick/exTick with skipped rounds at her level, capped (BAL.skip.cap) → below BAL.ex.srvBar → fail + wait BAL.ex.srvCd. Correct game behaviour; fixed on the harness side in 5c62c2b9 (FIXER #9, in BIG #9 review).
Could not read s11b's live state (FOREMAN F / s11b are on the other account: send_message → not found). One evaluate settles it, see §5.

## 2. Deterministic test — dev/test/promo-root3.js (new), on LIVE build (origin/main index.html)
Real game code, iPad 1180x820; exam result forced to PASS where the road is an exam; each case then `deser(ser())`.
| # | road | result LIVE |
|---|---|---|
| 1 | consort Thường tại: act card «Khảo hạch tấn phong» → runOpt → exStart → exDone → promoteP | rank 1→2, after load 2 ok |
| 2 | consort exam in the #kg82 board, board CLOSED mid-way («Quay lại»/✕) → exTick → exAbort | settled (pend cleared), rank 2, after load 2 ok |
| 3 | passed exam, FULL seat (Phi cap 2) → waits at rank 3 → seat frees → month promote() | rank 4 ok «Thánh chỉ: tấn phong … làm Phi» |
| 4 | cung nữ «Khảo hạch Nội vụ phủ» (exSrvGate → card → exSrvStart → exSrvDone → exSrvRise) | S.srv.rk 1→2, «Thăng bậc» queued, after load 2 ok |
| 4b | same maid: S.rank | **0 by design** (isSrv true) ← what the robot logs |
| 5 | cung nữ board closed mid-way → exSrvTick | settled, S.srv.rk 2 ok |
| 6 | grace exam (son) exGrace → pass → exGraceUp | rank 2, load 2 ok |
| 6 | story arc exDirectUp | rank 2, load 2 ok |
| 6 | reign road promoReward «emp» | rank 2, load 2 ok |
| 6 | first son promoReward «son1» | rank 2, load 2 ok |
| 6 | seat contest win (promoteP, __seatPick) | rank 2, load 2 ok |
| 6 | maid raised to Đáp ứng srvRise | consort rank 0 (= Đáp ứng), load 0 ok |
| — | page errors | 0 |
`promo-root3: PASS` (13/13).

## 3. LAW 11 — every rank-up road (apply path → rank write)
| road | code | writes | result persists (ser/deser) | broken apply? |
|---|---|---|---|---|
| ordinary decree after exam | jexam exDone → j8 promoteP (wrapped j68i Lý do, jts lễ, jhd, j61 rkSync, jexam grace) | S.rank++ / p.rank++ | yes | no |
| passed + full seat waits | j30 promoReqP seat row → monthly j3:161 promote() | S.rank++ when free | yes | no |
| exam board left mid-way | exTick → exAbort / exSrvTick → exFinish (skip raws) | settles pass/fail | yes | no |
| son / daughter grace | exGrace → promoteP wrapper → exGraceUp | S.rank++ | yes | no |
| first son direct / reign / arc | promoReward → exDirectUp | S.rank++ | yes | no |
| seat contest (Tranh ghế) / Emperor pick | j34 / fillSeats → promoteP(__seatPick) | S.rank++ | yes | no |
| Hoàng hậu seat | promoteP r+1=7 / j8 vacancy | S.rank=7 | (not forced here; promo-exam covers 7) | no |
| maid rung (Nội vụ phủ exam) | j42 srvMonth → exSrvGate → exSrvDone → exSrvRise | S.srv.rk | yes | no |
| maid → Đáp ứng | j42 srvRise (+forgetSafe) | S.srv.risen, consort rank 0 | yes | no |
| NPC consorts / servants (two-way) | promoteP wrapper exDone(exSimC) / exSrvNpc | p.rank / s.rk | promo-exam «NPC passes → promoted», promo-rules | no |

## 4. Gates (this box, origin/main build; no game file changed → build = LIVE)
| gate | result |
|---|---|
| promo-root3.js (new) | PASS 13/13 |
| promo-root.js | PASS |
| promo-exam.js 755x1000 | 17/18; the FAIL row «old save loads» needs a real OLD build as 2nd url (I passed LIVE twice) — not a game fault |
| quickcheck | not run: no file under dev/build, dev/site or index.html changed (test file only) |

## 5. FOR MAIN 157 / FOREMAN F (harness, not mine to change)
- **Confirm s11b in one evaluate** on its page: `JSON.stringify({o:S.origin&&S.origin.k,srv:isSrv(),srk:S.srv&&S.srv.rk,risen:S.srv&&S.srv.risen,rank:S.rank,ex:S.srv&&S.srv.ex&&S.srv.ex.last})`. isSrv true + srk ≥ 2 = this report.
- **Harness fix (robot-rt.js, one helper, whole family):** log rank as `isSrv()? 'maid '+S.srv.rk : S.rank` everywhere it reads S.rank (lines 121, 169, 212, 279, 361, 506, 558) so moment log, STATUS, offers and life end see maid rises; robot-audit «rank 0 whole life» must not flag a maid life by S.rank.
- Promo «picked 24» counts ROUNDS of the exam frame («Bắt đầu thi» / «Để tài nghệ quyết định» each count), not exams.
- The rank-0 family on older lives (s7/s9f/s13 consort lives) is not explained by this; they ran pre-promo-root builds and/or the #kg82 gaps — re-measure on 5c62c2b9 + LIVE.

## 6. Status
LAND READY review/promo-root3 987c3599 (test only, nothing to land in the game; MAIN may land the test into dev/test or just take the finding). No push to main, no PR.

~97% xong / ~90% chơi được
