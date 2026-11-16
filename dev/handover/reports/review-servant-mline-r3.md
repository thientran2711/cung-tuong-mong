PASS b82d3bf3b0bc6096c92eebaff5ae91731868b8ac
# review/servant-mline-r3: reviewer of review/servant-mline-r2 @c3e1cacd (servant-system part C fixes), Foreman D
Branch review/servant-mline-r3 @b82d3bf3 = r2 + merge origin/main 18fb8252 (ancestor) + small reviewer fixes. START_CTX ~4 %. PROGRESS: dev/PROGRESS_review-servant-mline-r3.md.

## r1 FAIL items
| # | r1 FAIL | r2 | verdict |
|---|---|---|---|
| 1a | mlFeud frame/poison: no risk | frameCatch 30 / poisonCatch 40: deed on master, Đức −3×w, Danh −2, proof evN×w + oán 10×w to ANY victim's mistress; framer kneels; poisoner to Thận hình ti (her own maid: Danh −2 + oán only) | OK |
| 1b | mlHit frame: no risk | hitCatch 30, same caught path; beat = always a deed + oán, proof at hitEv 30 | OK |
| 1c | use: no cost | useBac 20 bạc + useTurn 35 % (risen maid turns) | OK (see note 2) |
| 2 | co-op NPC half of servRanks/servMonth on the guest | guarded (servRanks, jaudit đề bạt, servMonth loyalty/NPC spies/refill, mlMonth NPC-vs-NPC); NPC acts on HER maids roll on the guest | OK |
| 3 | wording, seek cooldown | "người hầu của", seekCd 6 | OK |

## Gain and loss per act (my re-run of sim_maidline_r2.js, 5 runs × 300 months, Tai mắt 3, 3 maids of hers; mean per 25-year life)
| act | times | caught | gain for the actor | loss when caught / always |
|---|---|---|---|---|
| maid frame (feud) | 13.8 | 4.4 | victim lòng −15, kneels, out 20 % (3.4) | own maid kneels lòng −15; deed, Đức −3, Danh −2; victim's mistress proof +1, oán +10 |
| maid poison | 2.2 | 0.6 | victim dies 25 % (0.8) | poisoner lost; deed ×2, Đức −6, Danh −2, proof +2, oán +20 |
| maid fight | 12.0 | — | lòng +2 both | the slapped one is either side (fightLose 50) |
| consort frame (hit) | 34.0 | 12.0 | victim punished, out 20 % | deed, Đức −3, Danh −2, proof +1, oán +10 |
| consort beat | 4.8 | always | victim slapped | deed + oán +10 always, proof 30 %; beaten maid thiện cảm +3 to her own mistress |
| consort bribe | 30.0 | j10 odds | spy | 30 bạc (j10, unchanged) |
| use | 0.0 (r2: 0.4) | — | eye ×1.5, lòng +10 | 20 bạc; turns 35 % on rising |
Totals: deeds 51.6, proof given 45.4 (to her 5.0), masters' Đức −52.2, Danh −33.6, her Danh −0.4, her Sổ ghi lines 174 (max 4 in a month), rises 11.0. Matches the worker's table. Every harmful act carries a real risk.

## Checks
| # | check | result |
|---|---|---|
| 1 | ONE CORE | 2 literals left in jmline (fight `roll(50)`, poison weight `2`) → BAL.mline.fightLose / poisonW, same values (fixed by me). j14 rise 60/25 → riseLoy/riseRel OK |
| 2 | kit / VANPHONG | lines use the existing Sổ ghi row; no new UI; no %; "ngươi"→"ta" on screen (j84). "chứng cứ trên X +n" (new form) → "chứng cứ về X +n" as everywhere else (fixed by me) |
| 3 | mline-guest (36 months) | PASS: guest NPC merit/rise/refill/loyalty 0 (host 560/3/415/454) |
| 4 | mline-oldsave | origin/main save loads, 24 months, 0 errors |
| 5 | coop-e2e (live Worker) | 60/60 standard steps ok |
| 6 | 2-browser guest maids (coop-e2e COOP_MLINE=1, forced odds on the guest) | 2 of 3 runs: NPC acts hit her maids on the guest; her proof 0→3 / 0→6 survives the week merges; host's proof 0→0 (per-seat ep[pid] keeps them apart); NPC Đức losses from her cases reach the host as deltas. Run 1 had no ml counter at all on the guest (consistent with her not being a consort that life; random origin) |
| 7 | screens 755x1000@2, 1180x820@2 (forced caught/use lines in Sổ ghi; looked at both) | no overflow, 0 page errors, text reads right |

## Worker note C (guest's own maid cannot rise) — verdict: SEPARATE item, not blocking this branch
It is a protocol limit (PROTOCOL §4 rule 4: new ids made by seat b under W are dropped), and it is pre-existing: on origin/main the old eye rule already ran on the guest, so her maid vanished and no consort appeared. r2 makes it consistent (no rise on the guest, nothing lost). Same root, same item: (a) the guest's maids never act against others (her mlFeud is host-only, the host's friend entry has staff:[]), and (b) her NPC-side effects (an NPC poisoner removed, deeds on NPCs) are host-wins in the merge (staff/wrongs arrays have no id). Under OD:L594 ("every feature must work in 2-player co-op") this needs its own HIGH co-op item: a guest→host request (e.g. {t:"ask",k:"rise"/"mlact"}) so the host makes the rise / applies her maid's act.

## Notes for Foreman D (not blocking)
1. Over-cap seats (note A, pre-existing) seen again in the sim (rank 5 with 3 holders).
2. "use" still almost never fires (0.0 per life in my 5 runs, 0.4 in the worker's): needs Sủng 20 under the median + bạc 20 + seen + not harsh. Cost is right; whether it should be more common is a design choice.
3. An open beating costs no Đức/Danh (only deed, oán, proof 30 %), while a caught frame does; consider Danh −caughtDanh for a beating too.
4. Month news lines run together in one Sổ ghi entry (pre-existing for all servMonth text; OD 16/11 "one fact per line").
