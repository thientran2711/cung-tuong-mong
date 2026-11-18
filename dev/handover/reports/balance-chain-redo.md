PRIORITY #1 CHECK ('balance-core-r2|baff0824|52d5092d|37018e74|night-final-r2|night-ledger'): OD 2 | ledger 0 | claims 8 (D rows for balance-core / night-final / night-ledger, all PASS-not-landed) | main 1 | review/* 4 (review/balance-core-r2*, review/night-final-r2, review/night-ledger-r1) | archive 0 → this order: MAIN s37 "(17/11 21:06Z) ORDER for Foreman D … BALANCE CHAIN RE-DO" in dev/handover/FOREMAN_D_STATUS.md — read it VERBATIM, plus "(17/11 23:20Z) FROM Foreman B ROOT" (coop-thin part E touches j8 / jflip / jnight / jcycle / jcoopworld).

# balance-chain re-do — worker report (review/balance-chain)

Worker: opus, session_01964izE1x6qUogL4pcSrLjd; coordinator Foreman D #11 session_01964izFTp8oV5DHeadkPMRn. Brief dev/handover/briefs/D11-balance-chain-redo.md.
START_CTX ≈ 3 % of 1M (get_session reads 0; own estimate). Read: START_CORE / START_WORKER / START_REVIEWER, topic balance-economy + time-calendar, the D status order + B's note, reports balance-core, review-balance-core-r2, night-final (§2, §12, §13), review-night-final-r2, night-ledger, review-night-ledger-r1, batch-s32a (s36a conflict list), review-balance-2-r1; OD:L1602 (§7 option 1 approved, Sủng unchanged).
Branch **review/balance-chain** from origin/main **95d5f767** (newest at start). The container restarted twice during the bot run (idle reclaim); all lives written before each restart are counted, shards resumed with new seeds.

## 1. How the chain was rebuilt (not a blind conflict pick)
| step | commit | what |
|---|---|---|
| 1 balance-core alone, REUSING balance-2-r1's token resolution | d8a3a76f | started from review/balance-2 r2 head 5d956715 (= main 99f3978d + balance-core + balance-2, merged token by token by the balance-2-r1 reviewer) and REVERTED balance-2's own code commits (839f30b3 HH gate, 8a0c34b1 ctxTaste, 7732102a lễ nghĩa, c361b330 map risk, cf39f284 clamps, dd2114df BAL.rk side chances, de993ca8 test); files balance-core never touched went back to main byte for byte. Check: diff vs main 99f3978d = the same 31 files / hunks as balance-core's own diff (7abaf07a→baff0824) + the reviewer's merge forms (oddsLv, rdOdds a→artO, BAL.lad dropped, BAL.start.bd). So both D branches carry the SAME balance-core. |
| 2 newest main | cd884466, a023192d | merge origin/main 95d5f767 (190 commits): only assemble.py conflicted (main's list + jbalcore); balance-core.js 42/42 on it |
| 3 night chain | 3299ae9a | merge review/night-ledger-r1 37018e74 (contains night-final-r2 52d5092d; its balance-core 9abcfa72 merged clean against ours — jbalcore.js identical). 10 conflicts, each by hand: j2/j8/j42/j75 = main's one-core keys (BAL.odb / BAL.eff / BAL.loy.trust) with the same balance-core terms; jbal2 = main's kc2 block + BAL.steal.choice + BAL.nt; jflip = main's km-full class + night-final o.still / seal; jopic = main's kitOptStackTitle + night-final kitTam chip; jksize = main's NARROW T3 + night-final kszLive3Ok guard; assemble = main's list with jgrey → jbalcore → jledger → jnf → jfe (the order the night chain was tested in); KIT.md / KIT_REQUESTS = both. **Not taken: jcoopworld seatWeek tie rule** (co-op code; owner 17/11 02:05Z no co-op patching; coop-thin E owns jcoopworld). |
| 4 whole family (ONE CORE) | f46459c9 | scan of every art-odds site on the new main (bậc×N, arts.k×N, artW×N, bestArt().w×N, b.l×N): one left — **jvisit.js PEND.empnight «Phô tài»** = bestArt().w × BAL.visit.show.w (the pre-curve bậc × 8; it overrode balance-core's j7 empnight) → artOE(S,bestArt().k). Kept (justified, as balance-core r2): minigame speed by lv (j5 / j91 / jts / jcloth). No direct artp / arts writes outside crsPush. |
| 5 unlanded D PASSes | 223d8e04 | kc2val-home-r1 = already live. face-w404-r1 51b87607 and day-khac-audit-r1 46900ee2 still merge onto main AND onto this chain with only generated files (index.html / sw.js) → NOT folded, land as they are. **residence-seats-r1 a6e0fbc2 no longer merges (j7 «Xin Hoàng thượng ân xá») → folded**: its seat gate + main's one-core Sủng loss BAL.eff.j7.sungGo_9. Owner FLAG stays (HH reach with halved seats). |
| 6 tests | d9fe15ed 812d1ddc | night-multi T.setup also zeroes BAL.ag.emp.custom (AG2 moved the Empress custom weight there; FAIRN.custom alone left mùng-một custom nights → cases 2/5/6 failed when a Hoàng hậu existed); night-final case 7 polls ≤ 3 s for the choice dialog (fixed 700 ms was too short on today's main). |

Kept: owner-approved balance-core §7 option 1 (Sủng NOT on the growth curve: BAL.grow.keys = sac/tai/tamco). Night-final F1: co-op stays on the live night path (nfParked, jfe only while parked); no co-op code changed by this branch.
I did NOT touch balance-2 r2's keys (BAL.odb.j2.odO_3/odO_7, j68f.odP_2, j68e.odP_5, BAL.deck.*, Múa loss) — line in FOREMAN_D_STATUS 03:40Z.
| 7 newest main again | ce3f5611 | merge origin/main 09b1bbaf (coop-thin-e, display-set-bonus, jreveal): j75 PEND.prep = main's shelf-set jsac + balance-core artOE(S,b.k) (main's new line still typed (b.l||0)×8); assemble = main's list + jbalcore/jledger/jnf after jgrey; coop-thin-e merged with no conflict in j8/jflip/jnight/jcycle/jcoopworld (co-op stays on the live path via nfParked, which E's host night gate now drives) |

## 2. Measurement — paired sens bot, Vừa, 8-year cap, 10-origin rotation, SEED 5000+shard per arm (dev/measure/runbal2.sh; table = balance-2 r2's anr2.py layout)
Arms: **live** = origin/main 95d5f767 build · **chain** = f46459c9 (balance-core + night-final + night-ledger + jvisit fix, NO residence-seats) · **chain+rs** = 223d8e04 (+ residence-seats-r1). Every life written is counted (two container restarts).
| arm | lives | Hoàng hậu | ended before HH/cap | ended < 3 y | Phi reached, median month | Quý phi reached, median month | HH median month | Danh m12/24/36 |
|---|---|---|---|---|---|---|---|---|
| live | 62 | 16 (26 %) | 18 (29 %) | 5 (8 %) | 57 (92 %), m24 | 46 (74 %), m39.0 | m62.0 | 75/85/90 |
| chain | 65 | 9 (14 %) | 25 (38 %) | 9 (14 %) | 53 (82 %), m27 | 46 (71 %), m39.0 | m78 | 49.5/47/47 |
| chainrs | 62 | 7 (11 %) | 23 (37 %) | 9 (15 %) | 46 (74 %), m27.0 | 37 (60 %), m42.0 | m64 | 46/44.0/41 |

| arm | tt | dtq | muoi | cn | nc | bd | td | ch | thd | cnv |
|---|---|---|---|---|---|---|---|---|---|---|
| live | 2/6 | 1/7 | 2/7 | 2/6 | 1/6 | 2/6 | 1/6 | 2/6 | 2/6 | 1/6 |
| chain | 0/6 | 0/7 | 0/7 | 2/6 | 3/7 | 0/7 | 1/7 | 1/6 | 1/6 | 1/6 |
| chainrs | 2/6 | 0/7 | 2/7 | 2/6 | 0/6 | 0/6 | 0/6 | 0/6 | 1/6 | 0/6 |

| arm | ended < 3 y | causes (title) |
|---|---|---|
| live | 5/62 | Hồng nhan bạc mệnh 3; Xuất gia 2 |
| chain | 9/65 | Hồng nhan bạc mệnh 8; Xuất cung 1 |
| chainrs | 9/62 | Hồng nhan bạc mệnh 7; Xuất gia 1; Thái phi 1 |

Early deaths < 3 y by fate: live 2 poison, 2 nun, 1 Emperor died · chain 6 poison, 1 old-age illness, 1 lung illness, 1 sent home · chain+rs 5 poison, 1 nun, 2 illness, 1 Thái phi.

**PLAINLY: the chain alone does NOT keep reach ≥ live.** Hoàng hậu 14 % (9/65) vs live 26 % (16/62); Phi 82 % by m27 vs 92 % by m24; Quý phi 71 % m39 vs 74 % m39 (about equal); HH median month m78 vs m62. Cause = the same Danh wall balance-2-r1 found (Danh m12/24/36 ≈ 50/47/47 vs 75/85/90) from balance-core's art curve on the risky art acts; I did not touch those keys (balance-2 r2 owns them, see its 03:10Z line). Early death < 3 y 14 % vs 8 %, mostly POISON (6 vs 2): balance-core §7 named this risk (slower Tâm cơ / Y → fewer plots caught); its named lever is BAL.grow.mul for Tâm cơ — NOT changed here (owner-approved §7 values; needs a decision / the balance-2 r2 Danh fix first). Ended before HH/cap 38 % (OD:L20 band 35–45 %, live 29 %).
With residence-seats on top: HH 11 %, Phi 74 %, Quý phi 60 % m42 — the owner FLAG (fewer seats → slower ladder) shows again.
→ Recommendation: land this chain together with (or after) balance-2 r2's Danh fix, and re-measure that merged head; do not land the chain alone if HH ≥ live is the bar.

## 3. Night-ledger checks (dev/measure/ledger-bot.js, chain+rs build, 8 lives × 24 months, SEED0 7; NT_OFF = same build, one night a tuần)
| per month unless said | ledger on | NT_OFF | review-night-ledger-r1 final |
|---|---|---|---|
| nights a tuần (all) | **6.73** | 0.70 | 6.88 |
| her nights | 2.63 | 0.22 | 2.55 |
| months with ≥ 1 night of hers | 66 % | 21 % | 80 % |
| NPC nights / consort | 2.08 | 0.17 | 2.12 |
| NPC conceptions / consort-year | 0.22 | 0.47 | — |
| her Ân at the end / NPC Ân mid | 75.9 / 4.5 | 3 / 1.8 | — |
| page errors | 0 | 0 | |

## 4. Gates (build ce3f5611 unless said)
| gate | result |
|---|---|
| one-core-guard | **0 fails** (inline 3802 < baseline 3842) |
| balance-core.js | 42/42, 0 page errors |
| ledger.js | ALL PASS 7/7, 0 errors |
| night-multi | PASS ×4 (after the 2 test fixes above) |
| night-final | PASS ×4 on 812d1ddc; on ce3f5611 1 run of 1 FAILED case 6 «at most one night per day»: ONE tuần of 40 with 2 night records (earlier also ~1 in 3 runs on 223d8e04; base 37018e74 passed its 1 run). **OPEN — not found**: a 40-tuần probe of the same case did not reproduce it in 11 runs (none). Reviewer: please run night-final ×5 and, if it shows, dump nightLog by tuần (scratch probe /home/user/wt/bc-dbg/probe-nf6b.js) |
| night-steal-unit · night-coop-park | PASS · ALL OK 6/6 |
| flip-entry 755x1000@2 + 1180x820@2 | ALL OK both |
| coop-night | 105/105 on 223d8e04 (one earlier run 104/105, "guest night waits for the clock" -1; live 105/105) — not re-run after coop-thin-e |
| coop-e2e (live Worker) | **63/63** (= live max) |
| quickcheck.sh --runs 5 | **QUICKCHECK PASS** · old save ok · render 159/170, tab 364/377, buổi 859/902 ms (new/live), tasks>200ms 13/14 · core gates PASS |
| Fold 755x1000 + iPad 1180x820 (dev/tools/shots.js, LOOKED; scratch /home/user/wt/bc-shots, not uploaded) | SHOTS OK 20; art tab: kicker "Nhập môn", "Tiến bộ 12/100" bar, Bậc 1/5 steps, no overlap, nothing cut, no page errors / h-overflow |

## 5. For the reviewer / Foreman D
- Branch review/balance-chain @ ce3f5611; origin/main 09b1bbaf is an ancestor (FF). Not folded: face-w404-r1, day-khac-audit-r1 (still clean on main).
- Same balance-core as review/balance-2 (byte-identical jbalcore / BAL.start/art/grow/steal); only the jbalcore line in assemble.py differs (after jgrey here). jvisit + j75 PEND.prep artOE fixes: balance-2 should take the same lines.
- Line for Foreman B written in FOREMAN_B_STATUS (coop-thin-e merged clean; whoever lands second merges).
- Context at the end ≈ 25 % of 1M (START ≈ 3 %), no rollover.

SẴN SÀNG KIỂM ce3f56117f80572c429ad0d742ac3d6e101d9e91
