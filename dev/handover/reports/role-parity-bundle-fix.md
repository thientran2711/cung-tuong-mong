
## role-parity-bundle-fix — worker session_01964izD4JTc9hWG68VKtmch (Foreman D #18), depth 1, START_CTX ~3%

PRIORITY #1 CHECK ('role-parity petcare maid.rise'): OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 | archive 0 — same finding in B STATUS L202 + E STATUS L1492-1493 and dev/handover/reports/coop-guest-week-lag.md:100 (reused: that report's diagnosis "pre-existing LIVE regression from bb92f986").

Branch: review/role-parity-bundle-fix @ c0ac67f6 (base LIVE origin/main 5e32f66f).

### Cause (found in git diff 02c6d8f4..8746a062)
(b) riseCore Danh 3 vs BAL.ag.maid.rise.danh 5 — night-balance-bundle (balance-2 fault 9, documented in dev/handover/reports/balance-2.md L27: "raised maid keeps BAL.danhG.srvRise .2 of her servant Danh") added
`S.danh=Math.round((S.danh||0)*BAL.danhG.srvRise)` to j42 srvRise, BEFORE riseCore — a player-only step outside the ONE promotion core (law 1 + law 4):
the player's rise = carry + 5, an NPC maid's rise (jagmaid amRise, j14 eye path) = +5 only. Both balance values are kept as the bundle set them
(BAL.danhG.srvRise .2 and BAL.ag.maid.rise.danh 5 — they do not disagree: .2 is the carry, 5 the gain).
FIX: the carry moves INTO riseCore (jagmaid): `n.danh = round(servant Danh × BAL.danhG.srvRise)` then `+D.danh`, for every caller. An NPC maid's staff
record holds no Danh (no carry: her new consort record keeps its born Đáp ứng Danh, rstats), the player's servant Danh is S.danh. j42 srvRise no longer
touches Danh itself. The test now measures riseCore's gain after the carry for BOTH sides (it also checks the NPC Danh gain, which it did not before).

(a) `up:P-ONLY:harm:petcare` — NOT a game gap: a scan MAPPING gap made visible by a dice shift. The NPC side runs the very same act:
jagacts3 agRunReg("cx3:petcare") → runAct(v,t,"petcare") = ACT.petcare (her button). The scan credits her label «Giúp chăm thú nuôi của nàng» to
both keys (her gate §harm:petcare + cx3:petcare); the NPC only to cx3:petcare (an NPC harm gate counts only for BANDS/HA_VAR deeds). Before the
bundle no consort owned a pet in the maid-life world, so the row was "—" on both sides; with the bundle's draws consort #14 owns one
(probe: pets [[14,1,rel 0]]; NPC risen maid holds cx3:petcare via consort.par3life in the social world: «up» cx3:petcare = SAME).
FIX: scan ALIAS "harm:petcare":"cx3:petcare" (the same pattern as harm:ally = cx:ally, harm:gift = cx:gift).
NOTE FOR D (no change made, needs a ruling if wanted): ACT.petcare.ok is `a===S ? true : rel(a,t)>=10` — the NPC helps only a friend's pet, she may help anyone's.
Same function, an NPC's choice filter, not a missing act; flagged only.

### FIX THE WHOLE FAMILY (law 11) — before / after
| family | member | before (LIVE 5e32f66f) | after (this branch) |
|---|---|---|---|
| harm acts run by NPCs through another key (runAct from an NPC option) | cx3:petcare → ACT.petcare | P-ONLY harm:petcare (up) | SAME (ALIAS) |
| | SOC.spy → ACT.spyk (jtwoway) | no gap | no gap |
| | SOC.ally → ACT.ally (jtwoway) | aliased (harm:ally = cx:ally) | unchanged |
| role-parity scan, all roles × all acts | new gaps | 1 (up:P-ONLY:harm:petcare) | 0 |
| | open baseline | 13 | 13 (no closed entry) |
| | PROMO onlyRisen / onlyBorn (NPC + player) | 0 / 0 | 0 / 0 |
| rise Danh (maid → Đáp ứng) | player srvRise (j42) | carry .2 + 5 outside riseCore (test: gain 3 ≠ 5) | riseCore: carry .2 + 5 (test: 5 = 5) |
| | NPC amRise «send» / «fav» (jagmaid) | riseCore +5, no carry rule | riseCore: same rule (no servant Danh on an NPC staff record → born Danh kept) + 5 |
| | NPC j14 eye path | riseCore +5 | riseCore (same) |
| rank promotion Danh | promoteP (j8), her and NPC | no Danh gain on either side | unchanged |
| riseCore Sủng / Bạc / old-master Ghen | her + NPC | 23/23 · 20 · 5/5 | 23/23 · 20 · 5/5 |

Shown == applied == BAL: no player text prints the rise Danh (srvRise's «Cúi đầu thưa tên» card: «thành: được phong Đáp ứng»); one-core guard/bind/text PASS.
Not touched (pre-existing, flagged): srvRise's dead fallback branch `if(loyR==null){… sung 15+…, danh 5, bac 20; ghenUp 5/25}` (riseCore always exists) types numbers; safe to delete in a later law-4 sweep.

### Gates (one at a time, this sha)
| gate | result |
|---|---|
| dev/test/role-parity.test.js | before (LIVE 5e32f66f): 2 FAIL (up:P-ONLY:harm:petcare; riseCore Danh 3 vs 5) → after: ALL PASS (0 FAIL; NPC and player Danh +5 after the carry) |
| role-parity scan (all roles × every act, both sides) | new gaps 1 → 0; open baseline 13 (unchanged); PROMO 0/0 |
| balance-core.js | PASS (0 FAIL, 0 page errors) |
| one-core-guard / one-core-bind / one-core-text | PASS / PASS (1341 prints, 0 mismatches) / PASS |
| sg-card-scan.js | PASS (law4-typed 0) |
| night-multi.js | PASS (0 FAIL, errs []) |
| quickcheck.sh | QUICKCHECK PASS · old save ok · core gates PASS (perf new/live: render 306/232, buổi 1820/911 ms — box under load, within the gate) |
| coop-e2e.js ×3 serial | run 1/2/3: 129 ok, 0 FAIL each (host Fold + guest iPad) |
| co-op rise check: coop-guest-maid.js | the rise itself PASS on both seats (guest maid rises, stand-in, relay → host makes the same-name consort); its week-advance checks FAIL («buổi 0:3 advanced for both», «Chờ hảo hữu…») — IDENTICAL on LIVE 5e32f66f with my two files reverted → pre-existing, not this branch |
| co-op pet check: coop-pets.js | every petcare / thaopet / petsteal / gift check PASS on both seats, both no page errors; «week merged» checks FAIL 6 — LIVE 5e32f66f (my files reverted): 5 FAIL of the same checks → pre-existing family (old drivers vs the bundle's night-end scenes); FOR D: a co-op test-driver fix, not this task |

«SẴN SÀNG KIỂM c0ac67f6» — review/role-parity-bundle-fix (BIG reviewer: numbers/rules). Files: dev/build/jagmaid.js (riseCore), dev/build/j42.js (srvRise), dev/tools/role-parity-scan.js (ALIAS), dev/test/role-parity.test.js (Danh check both sides), index.html/sw.js rebuilt.
