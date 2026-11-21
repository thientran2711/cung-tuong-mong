# BAL PROOF — OR12 (HH ±5 home road vs direct start) + EM01 (emotion balance 150 vs 150) — worker session_01964izFzGxSL8HNQXDXiA9R for Foreman D #15, 21/11

PRIORITY #1 CHECK (outside-nums|OR12|HH + emotion|EM01): OR12 OD 25 | claims 8 | review/* 2 (outside-nums LIVE 983a9436, no retune; HH ±5 = MAIN-4 never run) ; EM01 OD 35 | claims 8 | review/* 7 (emo-balance-r1 2fa343d1 LAND READY: OFF 145 vs ON 145 on old LIVE 30e8714e + TUNED 74; raw data not in git) — reuse: kchh.js, run4c.sh/run5b.sh, emocmp.py.

Base: review/bal-proof = review/night-balance-bundle 21703845 + review/emo-balance-r1 2fa343d1 (only index.html/sw.js conflicted → rebuilt, c3958f5a) + kchh.js OUTF env for parallel shards (0df5662a). Measuring on that build.

## Plan
- OR12: dev/measure/kchh.js cung (direct palace start) vs nha (home road then palace), origins tt,dtq,muoi,thd,ch,td, sensible bot, ≥60 lives/arm.
- EM01: run4c.sh (per-seed form of run5b.sh, same runb.js/inpage6/inx/inpz, HHSTOP, 9-origin rotation), OFF (__emoOff+__feelOff+__eaOff) vs ON, same seeds, 150/arm; emocmp.py table.
- Waves of 2 h, 4 browsers: kchh cung + kchh nha + EM01 OFF/ON on one seed. Compute: ≈75 browser-h ≈ 19 h on this box; ruling asked from the foreman 10:05Z (helpers or late ETA).

## Progress
- 10:01Z wave 1 started (seed 701).
- 10:40Z option B (foreman D #15): 3 runner sessions (R1 BxR1hii3, R2 FJJtVCLT, R3 DATJ8nAT) + this box; all stopped ~15:00Z. Raw data: review/bal-proof-data-1 8fae6a97, -2 38258f77, -3 b49c5274 (dev/measure/bpdata/r<n>/); this box's files in /home/user/wt/bp-out (not in git).
- Tool fix (law 11): kchh.js renderers grew to 5–6 GB and were OOM-killed (no runb.js FAST stub) → kchh.js now uses the same visual-only FAST stub as runb.js + LIFECAP env (no life hit the 2400 s cap) + OUTF env (985a0904). New dev/measure/kchhcmp.py (5e879e3c).
- Lost time: R3's chunk 2 died twice (detached processes do not survive in a cloud session; only tracked background jobs do), so OR12 direct n=43 and EM01 n≈95/arm, not 60 and 150.

## 2026-11-21 15:20Z — RESULT: PROOF DONE, no change

Measured build: **review/bal-proof 985a0904** = night-balance-bundle 21703845 (HH gate: RANKS Hoàng hậu Danh 70) + emo-balance-r1 2fa343d1. The bundle head has since moved (now 35b3a3f5; Danh 70→78 + hhThNoSon planned). I did not restart. Both proofs are A-vs-B on the same build, so they are relative measures. A gate change moves both arms; the OR12 gap could still shift a little, because the home road enters with more Danh (42 vs 18).

### OR12 — Hoàng hậu: home road (kchh nha) vs direct palace start (kchh cung), sensible bot, origins tt/dtq/muoi/thd/ch/td, Vừa
| arm | n | HH (all lives) | 95% CI | ended outside | reached palace | HH among those who reached the palace | entry: rank Thường tại/Đáp ứng/Quý nhân · Danh · Tài · Bạc |
|---|---|---|---|---|---|---|---|
| DIRECT (cung) | 43 | 55.8% ±7.6 | 41–71 | 0 | 43 | 55.8% ±7.6 | 23/7/14 · 18 · 58 · 191 |
| HOME (nha) | 47 | 40.4% ±7.2 | 26–54 | 19 (40%) | 28 | 67.9% ±8.8 | 14/21/12 · 42 · 100 · 72 |
| gap HOME − DIRECT | | **−15.4 ±10.4** (95% CI −36..+5) | | | | **+12.0 ±11.6** (95% CI −11..+35) | |

How to read it (OUTSIDE_PLAN §12 «HH reach after outside route: within ±5 of the same origin's direct entry»):
- Per life started, the home road gives fewer HH. That is by design: 40% of home lives end outside (married; the §12 palace share is 70–75%, here 60% at n=47, inside the measured outside-nums band ±7).
- A home-road girl who reaches the palace does better than a direct starter (+12). She enters with higher rank, Danh 42 and Tài 100 (the kc2val «value of waiting»).
- **Neither gap is a proven miss.** Both 95% CIs include the ±5 band (all lives −36..+5; reached the palace −11..+35). One SE is about 10 points, so proving ±5 needs about 250 lives per arm (≈80 browser-h for the direct arm alone). **No retune.** A tune now would chase noise, and the HH gate moves tonight anyway.
- Lean to watch: if the «reached the palace» +12 holds on more lives, the home road is the stronger palace entry (Tài 100 at entry is the outlier). The knob would be the home stat gains (kc2val-home, LIVE), not this job's scope.

### EM01 — emotion layer OFF (__emoOff+__feelOff+__eaOff) vs ON, same seeds (701–725), run4c.sh (= run5b.sh per seed: runb.js sens, inpage6 + inx + inpz, HHSTOP, 9-origin rotation), Vừa
| arm | n | HH | early death | childbirth deaths | NPC harm acts / yr (95% bootstrap CI, n lives with counters) | provoke / humiliate per yr | NPC kind / yr |
|---|---|---|---|---|---|---|---|
| OFF | 94 | 48% ±5 (per-seed 14–60) | 27% ±5 (0–43) | 2% ±1 | 143 (133–152, n=49) | 84 / 38 | 262 |
| ON (tune of emo-balance-r1) | 97 | 54% ±5 (25–100) | 27% ±4 (0–67) | 2% ±1 | 154 (142–165, n=45) | 90 / 41 | 253 |
| gap ON − OFF | | +6 ±7 | 0 ±7 | 0 | ×1.08 (95% CI 0.97–1.19) | | |

- **No target missed.** HH +6 ±7 and early death 0 ±7 are inside the noise. NPC harm is +8%, with a CI that crosses 1.0. Before the r1 tune, emo-balance measured +11 to +15% with non-overlapping CIs, so the r1 tune (w.gian/ghen harm, dg.cap 5) holds on the bundle. **No change to EMO_OD / EMO_W idle / dg.cap.**
- §7's «HH ±3» cannot be proven at this n (SE 5 per arm; ±3 needs about 1000 per arm). The point estimate leans ON +6. The order and source of that lean match emo-balance (ON 38 vs OFF 37 at n=145), so I read it as noise, not a loop.
- The bundle changed the whole palace: childbirth deaths are 2% here against 28% on old LIVE 30e8714e, and HH is 48% against 37%. Old and new tables cannot be compared; only the same-build OFF/ON gap counts.

### Bot blind spot (asked by D #16)
inpage6.js (the sens bot used by both kchh.js and runb.js) scores the ordinary «Tranh sủng» palace act (+2, inpage6.js:72). It has no rule for «Chặn ngự giá», and it has never seen the OD03 favoured-art flip buttons: this build has no OD03 feature, so OD03 does not affect these tables. Once OD03 lands, every sens-bot HH number shares OD03's blind spot (NPC-only flips) until inpage6 learns to press them.

### Not done
- Small OR12 check (≥12 per arm) on the final bundle head: no time left. It can run on request (kchh needs ~10 min per direct life; 12 per arm ≈ 1 h on 4 browsers).
- No BAL changed → quickcheck / coop-e2e not needed (the code diff is 2 measure tools).

Runners R1/R2/R3 DONE (shas above) → foreman may archive them.

**PROOF DONE, no change** — review/bal-proof 5e879e3c (only kchh.js / kchhcmp.py measure tools vs the merged base; nothing to land unless you want the tool fix).
