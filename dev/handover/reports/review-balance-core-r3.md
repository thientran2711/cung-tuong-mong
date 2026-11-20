PRIORITY #1 CHECK: OD L1601 (owner APPROVED balance-core §7: land balance-core → night-final → night-ledger, re-run the life bot at landing) | main LIVE now 0667403a (was f43efc71 at assignment) | review/balance-core-r3 e3ed68b9 | claims NIGHT LAND CHAIN (D) → this review is the §7 "re-run the life bot at landing".

# REVIEW balance-core-r3 (BIG, opus) — reviewer session_01964izGMDXZAV9nnY7QGK4P, for FOREMAN D (#10 → #11 session_01964izEy8y3SFtp96at4o7u)

## VERDICT: CODE PASS · NOT LAND READY (2 blockers: owner balance call + re-port onto LIVE)

- The code on e3ed68b9 does what §7 r2 says. I found **no bug and no lost Danh gain**. The HH / Danh gap is the **intended §7 effect** (slower art ladder plus "Sắc, Tài, Tâm cơ càng cao càng khó lên"), and it is large.
- §7 r2 told the owner "phẩm cao nhất như cũ (2,3 so với 2,4)" and "Bot hiện không lên Hoàng hậu ở cả hai bản nên chưa đo được tỉ lệ Hoàng hậu". Measured now at ≥30 lives per arm, that no longer holds:
  - Hoàng hậu reach: **main 10/30 = 33 % → branch 2/34 = 6 %** (OD:L20 target ~32 %).
  - Average max rank: **4.9 → 3.3**.
- The owner approved §7 on the old numbers, so this is an **OWNER CALL via MAIN**, not a silent PASS.
- Separately, LIVE moved 411 commits (8cf6b7d7 → 0667403a). The final-merge onto current LIVE has **48 conflict hunks in 31 files**, several of them semantic: main changed numbers the branch moves into BAL. That is a worker re-port, not a reviewer final-merge.

### Numbered list (what blocks LAND READY)
1. **OWNER CALL (MAIN → owner): Hoàng hậu reach falls from ~33 % to ~6 %** (target ~32 %, OD:L20/L43). Cause and evidence are in the root-cause section below. §7 r2's risk line said ranks were unchanged; at n≥30 per arm they are not.
   - Options for MAIN to put to the owner (plain words, VANPHONG):
     - (a) Land as approved and accept a much harder road to HH. That breaks the OD:L20 target, which says balance numbers are ours to decide, but this one follows from an owner-approved design line.
     - (b) Land with a BAL retune **in the same land** (reviewer suggestion, needs a bot re-run). Knobs:
       - Lower the RANKS Danh thresholds (j1.js:6–8, HH d:78), or
       - Make the bậc-3 cards open at bậc 2 (D.vu.lv / D.ky.lv), or
       - Raise BAL.grow.mul for Tài (Tài plateaus at ~39), or
       - Speed up the art ladder toward the §7 table's own times. The bot reaches its first bậc 3 at month 24 (median); §7 says ~7 months with a teacher, ~1 year self-taught.
     - (c) Hold balance-core and land night-final / night-ledger without it (only if they do not depend on it; night chain owner to confirm).
   - **Early deaths are NOT worse any more**: died before 3 years = main 9/30 (30 %) vs branch 11/34 (32 %). The §7 risk "7/41 vs 2/41" does not repeat, so there is no need to tune BAL.grow.mul Tâm cơ for that.
2. **RE-PORT ONTO LIVE 0667403a (worker job).** `git merge origin/main` on review/balance-core-r3-rv (d5b6c45f = e3ed68b9 + LIVE 8cf6b7d7) gives 48 hunks in 31 files:
   - j82 5, j2 5, jtoil 3, j85 3, j68e 3, jbal 2, jbal2 2, jcui 2, j79 2, j68f 2, KIT.md 2, and 1 each in assemble.py, j1, j4, j7, j8, j13, j72, j75, j77, j93, jact, jkc, jmgt, jorigins, jpetcare, jroute, jsgame, jthaiy, jvisit, KIT_REQUESTS.md.
   - Semantic examples:
     - jbal.js:142: main changed the Bắc Địch start row `bd:{o:{danh:15,suc:90,bac:90},th:-20}`, but the branch moved start values into BAL.start.bd. Main's new numbers must be carried into BAL.start.
     - j1.js:21: ORIGINS rows. Main edited the o/hh/th rows that the branch deletes (origSet).
     - j7.js:136: thbirthday odds. Main has `artW("hoa",…)*8` while the branch has `artOE(S,"hoa")`. Every art-odds line main touched since 8cf6b7d7 must be re-swept to artO/artOE (law 4/11).
   - After the re-port, re-run: balance-core.js, origin-arts.js, night-steal-unit.js, one-core-guard, quickcheck, coop-e2e, and a short life bot (≥30 lives per arm, same seeds) on the re-ported head. The owner call in item 1 decides which BAL values that bot runs on.

### Notes (not blockers)
- N1 (law 4, small): jbalcore.js still has typed numbers the guard does not catch:
  - :53 `(mal-40)/N.mal`, `(40-mal)/2`, `R(11)-5`
  - :54 `R(20)-5` (twice)
  - the `mal==null?40` default
  - :78 trait weight `w=2` (BAL.art.emp exists; put it there)
  - stealShown clamp 5/95
  - Move these into BAL.orig.npc / BAL.art.emp / BAL.steal in the re-port.
- N2 (test debt): coop-e2e on the branch merge was 66/68 once, then 68/68 twice. The 2 fails were "both seats show the same Thái hậu picture" with the guest's picture still empty (`f:""`): a timing flake, also not seen on main (68/68). Not caused by this branch; noted for MAIN's flake list.
- N3 (bot data): the earlier r2 tables (HH 5/8 vs 1/7, Danh m36 95 vs 16) were not comparable. inbc.js's `bc` row is not attached to HH-STOP lives, so main's m36 Danh came from 1–3 survivors. My tracer (rv-bot/indt.js) attaches the monthly row to every life, HH-STOP included.

## Root cause (≥30 lives per arm, same seeds, one batch at a time)
Harness:
- dev/measure/runb.js sens, INP=inpage6.js, INP2=inbc.js plus a Danh tracer (accessor on S.danh, each change keyed by the card / talk / scheme context and call frame).
- HHSTOP=1, SEED 21–25. Both arms use the branch's bot scripts (inpage6.js is identical on main).
- main = LIVE 8cf6b7d7 index.html; branch = e3ed68b9 index.html.
- One renderer was OOM-killed (main seed 22, 3.2 GB). Its 6 finished lives are kept (the JSON is written after every life).

Before/after (main 30 lives, branch 34 lives; m36 rows count lives still alive and not yet HH at month 36):

| | main (LIVE 8cf6b7d7) | branch e3ed68b9 |
|---|---|---|
| lives (timeout/crash) | 30 (0) | 34 (0) |
| reached Hoàng hậu (HH-STOP) | 10/30 (33 %) | 2/34 (6 %) |
| HH month (median) | 141 | 207 |
| avg max rank / rank ≥ 4 | 4.90 / 20 | 3.26 / 13 |
| died < 3 years (not HH) | 9/30 | 11/34 |
| mean life years (dead, not HH) | 7.0 | 9.5 |
| m0/12/24/36 Danh | 20/27/65/70 (n36=21) | 18/14/13/16 (n36=23) |
| m0/12/24/36 Tài | 64/85/93/96 (n36=21) | 29/35/39/39 (n36=23) |
| m0/12/24/36 Sắc | 69/83/88/95 (n36=21) | 64/66/67/67 (n36=23) |
| m0/12/24/36 Tâm cơ | 21/94/100/100 (n36=21) | 26/73/89/96 (n36=23) |
| m0/12/24/36 Đức | 34/56/55/67 (n36=21) | 34/84/97/99 (n36=23) |
| m0/12/24/36 Sủng | 20/99/100/100 (n36=21) | 18/91/96/98 (n36=23) |
| m0/12/24/36 rank | 0/1/2/2 (n36=21) | 0/1/1/1 (n36=23) |
| m0/12/24/36 art bậc max | 2/4/5/5 (n36=21) | 2/2/3/3 (n36=23) |
| Danh m36 incl. HH lives at HH | 70 (n=21) | 16 (n=23) |

per origin: HH / lives · died<3y · avg max rank
| origin | main | branch |
|---|---|---|
| ch | 0/3 · 2 · 3.3 | 0/3 · 2 · 2.7 |
| cn | 3/4 · 0 · 6.5 | 1/6 · 2 · 3.3 |
| dtq | 0/6 · 3 · 3.3 | 0/7 · 2 · 3.4 |
| muoi | 4/7 · 0 · 6.3 | 0/5 · 1 · 3.8 |
| nc | 0/3 · 2 · 3.3 | 1/5 · 1 · 4.6 |
| td | 2/3 · 0 · 6.7 | 0/7 · 3 · 2.3 |
| thd | 0/2 · 1 · 4.0 | 0/1 · 0 · 1.0 |
| tt | 1/2 · 1 · 4.5 | - |

[exited with code 0]

### Where the Danh goes (Danh gained before month 36, per life, by source)
| source | main | branch |
|---|---|---|
| card Múa trong yến tiệc | 174 | 123 |
| card Phát bạc cứu giúp | 101 | 65 |
| **card Đánh cờ với Hoàng thượng** (opens at Kỳ bậc 3) | **56** | **2** |
| **card Kinh hồng vũ** (opens at Vũ bậc 3) | **37** | **–** (not in top 20) |
| **addArt bậc 5 "Danh +6"** | **21** | **3** |
| scheme accuse | 43 | 46 |
| card Thỉnh an Thái hậu | 27 | 66 |
| talk Nhún nhường | 9 | 31 |

- Danh churns hard on both arms: about 1820–2060 gained and about 1770–2050 lost per life, mostly the talk «Nhún nhường» and Múa failures.
- No gain source is missing on the branch. Every main source exists and fires; the branch even gains more from Thỉnh an / Nhún nhường.
- **What differs is the art ladder**:

| | main | branch |
|---|---|---|
| first month any art reaches bậc 3 (median) | 7 | **24** |
| lives that never reach bậc 3 | 0 / 30 | **8 / 34** |
| lives that reach bậc 5 | 29 / 30 (median month 18) | **1 / 34** (month 216) |
| Tài m12 / m36 | 84 / 96 | **35 / 39** |
| Sắc m36 | 94 | **67** |

- Mechanism:
  1. The bậc-3 cards Đánh cờ / Kinh hồng vũ (j2.js:60–61, `r.ky>=D.ky.lv`) open about 17 months later or never.
  2. The bậc-5 Danh +6 almost never comes.
  3. Múa trong yến tiệc (odds from Sắc + artOE) fails more, because Sắc stays at 64–67 and art bậc stays at 2–3.
  4. So net Danh at m36 is 16 vs 70.
  5. Rank needs Danh (RANKS d: Phi 42 … HH 78), so the branch rarely gets past Tần.
- All of this is §7 r2 as written: the art ladder table (Tông sư "cả đời khổ luyện"), the growth curve `BAL.grow={keys:[sac,tai,tamco],band:[40,60,80],mul:[1,.5,.25,.1]}`, and start Sắc/Tài from the §7 identity table.
- **Intended effect, not a bug.** But §7 r2 did not tell the owner it costs the HH road, because its bot never reached HH on either arm.

## Code review (e3ed68b9 vs main, three-dot, 37 build files)
- One course ladder: BAL.art.tier / gain / odds [0,4,8,13,18,24], stUp 1, danh {3:3,5:6}.
  - addArt → crsPush with BAL.art.stUp / BAL.art.danh, same Danh at bậc 3/5 as main.
- Art-odds sweep: artO / artOE replace level × site factor.
- Start values from BAL.start (per origin row). ONE start-art table, BAL.orig.art, read through originArts / origArtSet.
  - ORIGINS no longer carries o/hh/th; origSet(S,o.k) does that.
- Growth curve BAL.grow (jbal2.js:522), with `back:1` so stats lost to poison or illness recover at full speed.
- Night choices BAL.steal.m / oKeep / stealBase. j8.js:157 `o:a=>oSteal(a)` defaults to feign.
- Laws:
  - **1 two-way** OK: NPCs use the same origSet, growScale via ap, addArtP and stealBase.
  - **4 one core** OK: one-core-guard PASS `{"modules":374,"balKeys":617,"fails":0}`, with nits N1.
  - **5 harder as she climbs** OK by design. It is now so much harder that HH is ~6 %: item 1.
  - 2 / 3 / 11 / 14 OK: one table, the old ORIGINS art moved there.

## Gates (run on review/balance-core-r3-rv d5b6c45f = e3ed68b9 + LIVE 8cf6b7d7; one at a time)
- QUICKCHECK PASS (478 s): core gates PASS, time-spill guard PASS, open 2059 ms, **old save ok** ("Mộ Dung Diễm Thu", 0 errors).
  - perf new/live median: render 229/262 ms, tab 593/588 ms, buổi 1500/1442 ms, tasks>200ms 22/22.
- balance-core.js 42/42 PASS, 0 page errors.
- origin-arts.js PASS (8/8, old saves keep their arts).
- night-steal-unit.js PASS, 0 errors.
- coop-e2e on the branch: 66/68, 68/68, 68/68 (flake N2). Main 8cf6b7d7: 68/68.
- d5b6c45f is **not pushed**: it is stale against LIVE 0667403a (item 2). No LAND READY line.
- Per the assignment, any landing still waits for MAIN's LAND ORDER (FROM MAIN 10:42Z line / ROOT-78 order).

## Handover
- Bot data and tools stay in the container (/home/user/wt/rv-bot): run.sh, indt.js, agg.py, table.py.
- To repeat: `run.sh <main|br> <seed> 30 <capSec>`, then `python3 table.py`.
- Seeds used: main 21–25, branch 21–25. The branch arm stopped at 34 lives, main at 30.
