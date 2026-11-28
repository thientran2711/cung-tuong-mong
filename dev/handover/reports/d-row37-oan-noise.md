# D-ROW37-OAN-NOISE — report (worker session_01964izEtRCxwJe9JL9s4S8c, Foreman D ROOT session_01964izEUYzmixcs6Yg5ZXsE)
START_CTX ~5 %. Branch **review/d-row37-oan-noise e6e59ac0** = review/lc34-3b-r2-rv184 1a6a1aed (RV-184 rules 3b line: LIVE 22afefb4 + lr-rules-r2 + oán-pace) + 3 commits.
PRIORITY #1 CHECK: OD 26/11 ~06:50Z (A)(B)(D) + 26/11 ~18:40Z (OB 55 «điểm ghét, điểm oán tăng quá nhanh … giảm quá chậm») | main 22afefb4: no joanpace, no noise-day | review/*: oan-pace(-ghen,-lc28,-rv163g), tmk-oanpace-fix-rv, qc-noise-hygiene(-r10,-r10b), qc-noise-lrm, kk65-noise — all carried by the rules landing line (lr-rules-r2 a96564ad ⊃ qc-noise; lc34-3b-r2-rv184 1a6a1aed ⊃ oán-pace) | claims: LR-RULES lander + RV-184 own those lines; this job builds GAPS only.
Laws read: 18 LAWS + START_CORE + START_WORKER. Touched: 1 (same door for her and NPCs), 3, 4 (BAL.ghetHit; previews print what lands), 6, 7 (no new words), 11 (family scans + before/after).

## STEP 0 — map (before code)
| item | owner words / row | branch · sha | LIVE 22afefb4? | verdict / where now |
|---|---|---|---|---|
| OB 55 «oán quá nhanh (+ L2660 one cap per stat)» | OD 26/11 ~18:40Z | oan-pace-ghen → -lc28 fa35bacd → tmk-oanpace-fix-rv 4206db2c | no | PASSED (RV-163G/L); in 3b → review/lc34-3b-r2-rv184 1a6a1aed (RV-184 verdict pending, LR-RULES chain) |
| row 30 «ngân sách ồn mỗi ngày» (qc-noise r10b) | OD 26/11 ~06:50Z (A)+(D) | qc-noise-hygiene-r10b bdb0f65d → qc-noise-lrm ef371eff | no | LAND READY (F) → inside review/lr-rules-r2 a96564ad (LR-RULES) |
| kk65-noise d1214155 (test-only text-hygiene) | — | in lc34-b3a → lr-rules | no | RV-178 §5 PASS |
Nothing to re-merge: both PASSED lines are already being landed. Gaps found and built below.

## GAP 1 (OB 55, law 11) — «ghét» written straight to the score, outside the pace door
oán: every rise already goes through j9 oanAdd (scan: 0 raises outside). ghét (a consort's liking of HER falling): **13 lines typed `v.rel -= N`** skipped j9 affAdd, so skipped the ghét pace (joanpace opDn: one incident per buổi + BAL.oanPace.ghet.day) AND stat-pace. Scan `python3 dev/measure/ghet-door-scan.py` (exit 1 on a leak):

| before (1a6a1aed) | after (e6e59ac0) |
|---|---|
| 13 FALL: j2:64 Kinh hồng vũ (all consorts) · j4:21 accuser · j4:111 «Đáp trả sắc sảo» · j4:127 poem loser · j7:26 tainted gift · j7:44 «Mật báo Hoàng hậu» · j7:160 cook not found · j7:176/182 side not taken · j7:186 «Cảnh báo» · j8:556 ×2 daily out-favour dislike · jagacts3:34 her maid's act | **0 FALL · 0 RAISE-OAN**; 6 «known» SETs listed with reasons (story seeds j4 oldmis/enemy, j67 old-grudge floor, new person rel=0 ×2, jrcp event record) |

Fix: each → `affAdd(v,S,-BAL.ghetHit.x)` (law 4: BAL.ghetHit {frame 10, retort 20, poetWin 10, giftFail 20, tell 30, cookFail 10, side 15, warn 20, favour 1} = the old typed sizes). Previews («thù −N», «thiện cảm −N») print what really lands: new read-only `opDnSee(x,y,n)` in joanpace (incident fold + daily cap + stat-pace). Before, «Mật báo» printed −30 while 10 landed.

## GAP 2 (row 37 noise) — the same line again and again in Sổ ghi
qc-noise counts how MANY rows a day; nothing counted REPEATS. New robot `dev/measure/noise-repeat.js` (read-only; Sổ ghi S.logs, Tin báo, world news; numbers masked) + `noise-repeat-sum.py`. LIVE: 19 % of Sổ ghi lines are repeats; the top family (≈ 470 of 794 extra copies) = «Ra ngoài khi mặc trung y?: Vẫn đi / Ở lại» — the trung y card asked on EVERY walk (jty goTo). Fix: once she picked «Vẫn đi», the next walks of the SAME buổi ask no more (each place still charges its Danh, logged by tyCharge); a new buổi asks again (S.tyWent; old saves: field absent = ask).

Robot, 6 lives × 4 months per build (inpage6 sensible bot, same seeds):

| build | lives | days | surface | lines / day | repeats / day | repeat share | worst one line in a day |
|---|---|---|---|---|---|---|---|
| LIVE | 6 | 85 | log | 48.1 | 9.3 | 19 % | 26 |
| LIVE | 6 | 85 | tin | 2.6 | 0.1 | 2 % | 2 |
| LIVE | 6 | 85 | news | 0.7 | 0.0 | 5 % | 2 |
| BRANCH | 6 | 83 | log | 48.9 | 6.7 | 14 % | 9 |
| BRANCH | 6 | 83 | tin | 2.2 | 0.0 | 1 % | 2 |
| BRANCH | 6 | 83 | news | 0.7 | 0.0 | 5 % | 2 |

Remaining top repeats on the branch are the bot cancelling its own picker cards («dùng vật liệu gì?: Thôi», «Chọn người theo hầu: Thôi») and plain walk lines («Đến Ngự hoa viên.»). «Ở lại» repeats = the bot walking again after refusing.

FOUND, not fixed (text hygiene, owner (D) family → KK / qc-noise owner): some choice lines carry the card body glued in brackets: «Ra ngoài khi mặc trung y?: Vẫn đi (Tháng năm, năm thứ nhất, hạ tuần (Hạ)Ngươi đang mặc trung y (lụa ngà), chưa khoác y phục).» and «Chọn người theo hầu: Đi một mình (Hôm nay ra khỏi cung, ngươi dẫn ai theo).» — written by j3 logChoice (stack: logChoice ← jdoor wrapper ← chooseM); from month 3 on, LIVE and branch. Root not traced (time box); the text-hygiene runtime scan could flag «)Ngươi» (no space after a bracket).

## (a) OÁN / GHÉT RATE — robot before / after (dev/measure/oan-rate.js + oan-rate-sum.py; 8 lives × 12 months per build, same seeds)
LIVE = 22afefb4 · 3b = 1a6a1aed (oán-pace, before this job) · BRANCH = this job. «door» = through j9 oanAdd / affAdd, by caller; «all» = read from every consort's score after each bot step (catches direct writes too — the fair compare).

#### oán / ghét gained toward her per month (mean per life; door = j9 oanAdd / affAdd, all = read from the scores after each step)

| build | lives | kind | m1 | m2 | m3 | m4 | m5 | m6 | m7 | m8 | m9 | m10 | m11 | m12 | year |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| LIVE | 8 | oan door | 22 | 41 | 34 | 45 | 34 | 67 | 43 | 53 | 42 | 42 | 35 | 43 | 501 |
| LIVE | 8 | oan all | 15 | 25 | 24 | 42 | 27 | 56 | 39 | 44 | 35 | 39 | 34 | 41 | 421 |
| LIVE | 8 | ghet door | 38 | 40 | 37 | 44 | 39 | 94 | 47 | 59 | 54 | 43 | 30 | 40 | 565 |
| LIVE | 8 | ghet all | 45 | 52 | 35 | 69 | 65 | 120 | 83 | 96 | 71 | 86 | 60 | 61 | 842 |
| 3b | 8 | oan door | 22 | 15 | 20 | 24 | 20 | 35 | 16 | 33 | 31 | 22 | 32 | 36 | 304 |
| 3b | 8 | oan all | 12 | 10 | 19 | 17 | 15 | 29 | 15 | 22 | 30 | 19 | 28 | 30 | 245 |
| 3b | 8 | ghet door | 32 | 27 | 30 | 21 | 26 | 60 | 20 | 39 | 35 | 23 | 47 | 40 | 399 |
| 3b | 8 | ghet all | 22 | 35 | 49 | 44 | 42 | 56 | 25 | 68 | 67 | 38 | 65 | 49 | 560 |
| BRANCH | 8 | oan door | 16 | 15 | 15 | 21 | 24 | 33 | 27 | 28 | 28 | 42 | 28 | 35 | 313 |
| BRANCH | 8 | oan all | 6 | 11 | 13 | 15 | 10 | 27 | 20 | 24 | 25 | 41 | 25 | 32 | 249 |
| BRANCH | 8 | ghet door | 32 | 34 | 26 | 40 | 49 | 92 | 72 | 71 | 58 | 84 | 57 | 59 | 674 |
| BRANCH | 8 | ghet all | 15 | 22 | 19 | 27 | 27 | 77 | 52 | 57 | 38 | 69 | 40 | 43 | 486 |

#### targetings (hostile deeds landing on her) and levels

| build | targetings/day y1 | days ≥2 | first day (lives) | oán mean m3/m6/m12 | oán max m3/m6/m12 | consorts ≥«Oán» m12 | Ghen mean m12 | ends |
|---|---|---|---|---|---|---|---|---|
| LIVE | 0.93 | 26 % | 0, 0, 0, 0, 0, 0, 0, 1 | 5.0 / 8.7 / 11.2 | 17 / 26 / 32 | 5.8 | 65.5 | {'months': 8} |
| 3b | 0.52 | 10 % | 1, 0, 0, 0, 0, 1, 2, 1 | 2.9 / 4.8 / 6.5 | 12 / 18 / 24 | 1.0 | 41.8 | {'months': 8} |
| BRANCH | 0.61 | 13 % | 0, 0, 0, 0, 0, 2, 4, 0 | 2.0 / 4.3 / 6.7 | 10 / 19 / 22 | 2.1 | 45.8 | {'months': 8} |

#### top sources of oán toward her over the year (door; total over all lives, share)

| build | source (caller) | rises | total | share | max one |
|---|---|---|---|---|---|
| LIVE | `j95bSeed<j95bSeed` | 148 | 1715 | 39 % | 12 |
| LIVE | `riseCore<amRise` | 46 | 472 | 11 % | 12 |
| LIVE | `j78maidFail<spyMaidRun` | 86 | 446 | 10 % | 9 |
| LIVE | `A.f<runAct` | 44 | 409 | 9 % | 12 |
| LIVE | `fin` | 71 | 301 | 7 % | 12 |
| LIVE | `stealWin<stealWin` | 83 | 237 | 5 % | 7 |
| LIVE | `chooseM<window.` | 76 | 202 | 5 % | 6 |
| LIVE | `tsAff<chooseM` | 57 | 200 | 5 % | 7 |
| LIVE | `rgRel<rgJoin` | 55 | 60 | 1 % | 2 |
| LIVE | `menReport<menChoose` | 2 | 51 | 1 % | 40 |
| 3b | `j95bSeed<j95bSeed` | 57 | 583 | 22 % | 11 |
| 3b | `j78maidFail<spyMaidRun` | 96 | 498 | 19 % | 9 |
| 3b | `riseCore<amRise` | 44 | 421 | 16 % | 10 |
| 3b | `fin` | 67 | 331 | 13 % | 10 |
| 3b | `stealWin<stealWin` | 74 | 251 | 10 % | 7 |
| 3b | `A.f<runAct` | 27 | 251 | 10 % | 11 |
| 3b | `tsAff<chooseM` | 21 | 78 | 3 % | 6 |
| 3b | `rgRel<rgJoin` | 70 | 77 | 3 % | 2 |
| 3b | `chooseM<window.` | 13 | 39 | 1 % | 5 |
| 3b | `hhAct<agLand0` | 11 | 31 | 1 % | 4 |
| BRANCH | `j95bSeed<j95bSeed` | 66 | 685 | 26 % | 11 |
| BRANCH | `j78maidFail<spyMaidRun` | 83 | 420 | 16 % | 8 |
| BRANCH | `riseCore<amRise` | 43 | 416 | 16 % | 10 |
| BRANCH | `A.f<runAct` | 34 | 306 | 12 % | 11 |
| BRANCH | `fin` | 64 | 277 | 10 % | 11 |
| BRANCH | `stealWin<stealWin` | 79 | 216 | 8 % | 8 |
| BRANCH | `tsAff<chooseM` | 27 | 115 | 4 % | 8 |
| BRANCH | `rgRel<rgJoin` | 74 | 80 | 3 % | 2 |
| BRANCH | `chooseM<window.` | 20 | 62 | 2 % | 9 |
| BRANCH | `opOwn<spyLearn` | 5 | 43 | 2 % | 10 |

#### top sources of ghét (liking lost) toward her over the year (door; total over all lives, share)

| build | source (caller) | rises | total | share | max one |
|---|---|---|---|---|---|
| LIVE | `j95bSeed<j95bSeed` | 145 | 1275 | 26 % | 12 |
| LIVE | `stealWin<stealWin` | 83 | 661 | 14 % | 12 |
| LIVE | `riseCore<amRise` | 46 | 552 | 11 % | 12 |
| LIVE | `A.f<runAct` | 44 | 446 | 9 % | 20 |
| LIVE | `ptOrdTick<ptTick` | 111 | 346 | 7 % | 4 |
| LIVE | `tsAff<chooseM` | 52 | 292 | 6 % | 6 |
| LIVE | `fin` | 64 | 291 | 6 % | 12 |
| LIVE | `rgRel<rgJoin` | 74 | 264 | 5 % | 4 |
| LIVE | `rcvAsk<twDo` | 47 | 126 | 3 % | 3 |
| LIVE | `keepRobbed<resolveAll` | 23 | 116 | 2 % | 8 |
| 3b | `stealWin<stealWin` | 71 | 615 | 18 % | 15 |
| 3b | `j95bSeed<j95bSeed` | 55 | 520 | 15 % | 12 |
| 3b | `riseCore<amRise` | 44 | 440 | 13 % | 10 |
| 3b | `fin` | 67 | 397 | 12 % | 12 |
| 3b | `rgRel<rgJoin` | 78 | 306 | 9 % | 4 |
| 3b | `ptOrdTick<ptTick` | 93 | 291 | 9 % | 4 |
| 3b | `A.f<runAct` | 26 | 277 | 8 % | 16 |
| 3b | `tsAff<chooseM` | 21 | 120 | 4 % | 6 |
| 3b | `chooseM<window.` | 15 | 87 | 3 % | 12 |
| 3b | `rcvAsk<rcvAsk` | 21 | 59 | 2 % | 3 |
| BRANCH | `rivalsTurn<rivalsTurn` | 1201 | 1201 | 21 % | 1 |
| BRANCH | `stealWin<stealWin` | 81 | 746 | 13 % | 16 |
| BRANCH | `j95bSeed<j95bSeed` | 66 | 639 | 11 % | 12 |
| BRANCH | `runOpt<runOpt` | 104 | 498 | 9 % | 5 |
| BRANCH | `riseCore<amRise` | 43 | 430 | 8 % | 10 |
| BRANCH | `fin` | 66 | 386 | 7 % | 16 |
| BRANCH | `A.f<runAct` | 35 | 383 | 7 % | 16 |
| BRANCH | `ptOrdTick<ptTick` | 118 | 368 | 6 % | 4 |
| BRANCH | `rgRel<rgJoin` | 92 | 367 | 6 % | 4 |
| BRANCH | `chooseM<window.` | 36 | 259 | 5 % | 16 |

Reading: oán — 3b already cut it ~40 % (LIVE 421 → 245 a year, read from scores); this job leaves oán as 3b (249). Ghét — 3b looked paced at the door (399) but the scores show 560: the 13 direct writes were ~30 % of it. Branch: **486 a year (LIVE 842, −42 %; 3b 560, −13 %)**, months 1–3 **15 / 22 / 19** (LIVE 45 / 52 / 35, 3b 22 / 35 / 49) — the newcomer quiet. Targetings/day 0.61 vs 3b 0.52 (8 lives, run noise; LIVE 0.93). Now that the leak is seen at the door, the biggest single ghét source shows: **j8 rivalsTurn «she is more favoured» −1 a day (33 % roll per out-favoured consort) = 21 % of all ghét** (1201 over 8 lives).

## OWNER-FACING BALANCE CHOICE → proposal for D / MAIN (not changed here)
The daily out-favour dislike (BAL.ghetHit.favour, j8 rivalsTurn) is a standing cause with no deed behind it; being favoured already raises Ghen (paced, own fade). NHẸ keep 1 (now paced + fades) · VỪA 0 = being favoured feeds Ghen only, dislike comes from deeds · NẶNG keep only when Ghen ≥ BAL.oanPace.ghen.deep. Worker recommendation: **VỪA** (one cause → one score; matches «mới vào chưa làm gì mà ai cũng nhắm»). One number.

## GATES (on e6e59ac0, built from source with dev/build/assemble.py)
| gate | result |
|---|---|
| dev/test/d-row37.js (scan + door + preview = landing + rollback + trung y once per buổi + page errors) | **ALL PASS 13**; on 1a6a1aed FAIL 3 (A0, B3, B4) = it catches the old behaviour |
| dev/test/oan-pace.js | ALL PASS 33 |
| ghet-door-scan | 0 FALL · 0 RAISE-OAN (before 13) |
| one-core-guard / one-core-bind | PASS / PASS (1596 prints, 0 mismatches) |
| undef-scan | FAIL 1 «CTM_RANK» — **identical on 1a6a1aed** (pre-existing in the 3b line, rank/worker score.js), not from this job |
| old save (LIVE 22afefb4 life played 1 month by the bot, ser() → deser() on branch, 30 bot steps) | PASS (wk 3 → 9, 0 page errors) |
| quickcheck / coop-e2e | NOT RUN: this box cannot reach the picture CDN (proxy 403), so dev/site/build_site.sh cannot make the release build; built files (index.html / sw.js / assets.json) NOT committed — the lander rebuilds |
| Fold 755x1000 + iPad 1180x820 shots | NOT DONE: the local no-CDN build kept the «Luân hồi» life card over the stage in my harness. Visible change is text-only: one card fewer (trung y, 2nd walk of a buổi) and «thù −N» on j7/j2 cards = what lands. Data check on both sizes: Sổ ghi after 2 walks = ONE question line + «Ngươi mặc trung y ra ngoài: … Danh −2» per place. Reviewer: please shoot on a CDN build. |

## Commits
97c1e576 ghét family through the door + trung y once per buổi + robots + scan + test · 71dc09f2 noise-repeat-sum · e6e59ac0 opDnSee previews + A4.
Land note: stacks ON review/lc34-3b-r2-rv184 (needs joanpace + stat-pace). If 3b re-shas: only j2/j4/j7/j8/jagacts3/jty/joanpace + jbal2 (append) + new measure/test files.

~ Worker context at report ≈ 55 %; no rollover (only push + message left).
