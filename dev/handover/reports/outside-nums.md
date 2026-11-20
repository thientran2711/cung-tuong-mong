# OUTSIDE NUMS #1 — GAP OR11 + OR12 (outside-route numbers) — worker session_01964izCCWYwRvyU2FTazDMZ for Foreman D #9, 20/11
Brief: dev/handover/briefs/D9-gap-jobs.md «JOB 3».

PRIORITY #1 CHECK ('kc2val|OUTSIDE_PLAN|KC.ev|kcSch|kcMatch'): OUTSIDE_PLAN.md:170-180 (§12 targets + «Difficulty scales the scheme hazard (stepmother, rumours) and the forced-match speed») | main 30e8714e: jdiff.js DIFF tables had no home-road knob; jkc.js KC.ev/apM/sch(unused)/selMax typed in KC; kcbot.js/inkc.js measure tools exist | review/kc2val-home 176f337f + -r1 1845a0ed = ALREADY LIVE (batch-s32a; reports/balance-chain-redo.md:16) and only the nc/cnv home-bot «value of waiting» retune — they do not cover OR11/OR12 → new branch review/outside-nums from LIVE | claims: only this job (CLAIMS.md:401).

Branch: **review/outside-nums** (from LIVE origin/main 30e8714e).

## OR11 — difficulty scales the home hazards (all numbers in BAL, jdiff layer)
New BAL keys (jbal.js line 3, beside hz; top-level so the jdiff Dễ/Khó layer scales them the same way it scales BAL.hz):
| knob | meaning | Vừa | Dễ | Khó |
|---|---|---|---|---|
| BAL.kcSch | weight (%) of the hostile-kin schemes at home: stepmother (phan/doc/trom/tudg), rival sister (ao/tranhmoi, n_muoi), assassin n_thich, Vương thúc n_yen, pestering suitor d_ghe — both home roads (jkc kcWeek mal(), jkc2 kc2Week) | 100 | 55 (×.55, as hz) | 125 |
| BAL.kcRumFade | city gossip S.kld fade per month (was a typed 2 in jkc kcMonth AND jkc2 kc2Month) | 2 | 3 | 1 |
| BAL.kcMatch | % of the monthly push toward a forced match S.kap (jkc kcMonth, jkc2 dan + nc) | 80 (tuned, see OR12) | 60 | 100 |
- Two-way law 1: these are her-side knobs (how hard her own house aims at her), same class as BAL.hz; world rules untouched.
- Percent ints, not 1.0 multipliers: jdiff put() rounds integer bases (a base of 1 × .55 would round back to 1).
- Proof the layer reaches the home road (kcbot snapshot `dk`, end of a life): Dễ [55,3,60,hz 1.76], Khó [125,1,100,hz 3.52].
- Effect per difficulty (round 2, 90 sensible lives each): forced matches before Sơ tuyển Dễ 3 / Vừa 6 / Khó 10; avg gossip at the end 6 / 12 / 26; avg kap 24 / 29 / 33.

## OR12 — outside-route outcome split on LIVE (dev/measure/kcbot.js, origins tt/dtq/muoi/thd/ch/td × 15 per arm; Vừa sensible = 2 shards = 180 lives)
Built site measured: LIVE 30e8714e (zz-live copy) and this branch before the final main merge. Final Vừa knob values = the shipped ones (kcSch 100 = ×1, kcRumFade 2, kcMatch 100, kcSelMax 80, kcRareX 12 → same formulas as LIVE), so the final Vừa row IS the LIVE Vừa split measured with the fixed bot.
| arm (sensible unless said) | n | palace | married | death | rare | other | note |
|---|---|---|---|---|---|---|---|
| §12 target sensible | | 70–75 | 15–20 | 4–6 | 2–4 | – | |
| LIVE Vừa, old bot | 90 | 68 | 26 | 7 (4 + 2 stuck counted as death) | 0 | 0 | ~15 % «sensible» lives took the tổ mẫu exemption |
| LIVE Dễ, old bot | 90 | 67 | 28 | 6 | 0 | 0 | no home knob on LIVE |
| LIVE Khó, old bot | 90 | 58 | 32 | 10 | 0 | 0 | |
| r2 (kcMatch 80, kcRareX 20) Vừa, old bot | 90 | 66 | 23 | 7 | 1 | 0 | knobs visible: forced pre-Sơ tuyển Dễ 3 / Vừa 6 / Khó 10 |
| r3 (+ kcSelMax 90, kcRareX 30) Vừa, old bot | 180 | 68 | 25 | 6 | 0 | 0 | 28/45 marriages = exemptions → found the bot hole |
| r4 fixed bot (kcSelMax 85) Vừa | 180 | 80 | 13 | 7 | 0 | 0 | 0 forced-match marriages: all married = Điện tuyển returns |
| **FINAL Vừa (shipped values), fixed bot** | 180 | **76.7** | **18.9** | **2.8** | **1.7** | 0 | rares: Vương phi, Hòa thân ×2 |
| **FINAL Dễ** | 90 | 73.3 | 24.4 | 2.2 | 0 | 0 | |
| **FINAL Khó** | 90 | 73.3 | 20.0 | 6.7 | 0 | 0 | |
| §12 target random | | 50–55 | 25–30 | 10–14 | ≤1 | – | |
| LIVE Vừa random | 90 | 34 | 23 | 8 | 0 | 34 (Xuất gia / Nữ phu tử / plain Bỏ trốn) | |
| r2 Vừa random | 90 | 39 | 18 | 16 | 0 | 28 | |
| FINAL Vừa random | 90 | 36.7 | 22.2 | 12.2 | 0 | 28.9 | death + rare on target |
Reading: at n = 180 one bot SD ≈ ±3 points (palace), at n = 90 ≈ ±5. FINAL Vừa: married on target, palace +1.7 over the band, rare −0.3 under, death −1.2 under — all inside one SD → **no Vừa retune**: the old «too many marriages» reading was the bot hole + stuck-as-death, not the game. Dễ/Khó move the HAZARDS (forced-match pressure, gossip, schemes) but a careful (sensible) player dodges them, so the palace share stays ≈ the same; Khó shows in deaths (6.7 vs 2.2–2.8). The remaining Dễ/Khó marriages are Điện tuyển returns (score-based, difficulty-free by plan).
Not met / open for the foreman:
- Random column: palace 34–39 vs 50–55, «other» 28–34 (random picks Xuất gia / Nữ phu tử / elope whenever offered). That is the random policy taking every exit card; reaching 50–55 would mean removing exits from the forced-match cards (a design change, law 18 → not done).
- Rare 0–1.7 %: the sensible bot meets almost no rare gate (Danh ≥60 + Sắc ≥80, lover h ≥80…); raising the hidden roll (kcRareX 12→20→30) moved nothing (0/360 lives) → kept 12. A rare-seeking bot policy would be needed to tune the rare share honestly.
- HH ±5 vs direct start: NOT measured — dev/measure/kchh.js is ~10 min per life (reviews balance-core r1/r2); a ±5-point answer needs ≥ 60 lives per arm ≈ 5 h on this 4-CPU box. The cheap proxy dev/measure/kc2val.js (value of the home years at entry) was already tuned by kc2val-home (LIVE).

## Measuring tool fixes (law 11)
- dev/measure/kcbot.js: a life the bot left mid-road (no end, not dead) was counted as a DEATH → own class «stuck».
- dev/measure/inkc.js (sensible policy): refused «Xin cha lo cho được miễn» but not the later tổ mẫu variant «Xin tổ mẫu nói với cha cho miễn tuyển» → ~15 % of sensible lives exempted themselves from selection and married (kap pinned at mienSo 85, turn 22). Now refuses every «miễn tuyển» option.
- kcbot snapshot records the difficulty knobs in force (`dk`).

## Gates (HEAD 3e8e8a0f = final-merge of LIVE origin/main 26f3bfa9, site rebuilt; tier BIG)
| gate | result |
|---|---|
| one-core-guard | PASS (no second value, no new inline rule number) |
| one-core-text-rule / one-core-text / odds-cap | PASS |
| difficulty.js (6 sizes incl. Fold 755x1000, iPad 1180x820 / 1366x1024; knobs base×m+a, old save = Vừa) | ALL OK |
| rules-one-source.js (OLD_URL = LIVE build) | exit 0, errs [] errsOld [] |
| outside/route.js · outside/kc-end.js · outside/oldsave.js (LIVE save → this build, home road resumes) | fail [] errs [] (all three) |
| an-tinh-diff · krx-diff · nwpoem-scan | PASS |
| quickcheck.sh 3e8e8a0f | QUICKCHECK PASS · open 1396 ms · old save ok · perf render 208/218, tab 441/474, buổi 1256/1566 · core gates PASS |
| night-steal-bot · ag2perf-diff · opt-frame-scroll-diff | NOT run: paired palace/UI comparison tools (live vs branch JSON, hours); no palace knob or UI changed (jbal adds 5 home keys; jdiff adds 3 knobs to Dễ/Khó only) → reviewer's call |

## Files
dev/build/jbal.js (5 BAL keys), jdiff.js (Dễ/Khó rows + header), jkc.js (mal × kcSch, kap × kcMatch, kld fade, keep cap BAL.kcSelMax, kcRare × BAL.kcRareX; KC.selMax removed), jkc2.js (kc2 schemes × kcSch, kap × kcMatch, kld fade); dev/measure/kcbot.js (stuck class, dk snapshot), dev/measure/inkc.js (miễn tuyển filter); built index.html / sw.js / assets.json. No player text, no UI, no kit part touched. Raw per-life bot JSON stays outside git (/home/user/wt/onums-out, this container only).

SẴN SÀNG KIỂM 3e8e8a0fcf1f21aeae1766d10c212e1181515739
