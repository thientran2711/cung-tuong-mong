# RARE-REACH — how often a player reaches a rare ending, and the roll set from eligibility

PRIORITY #1 CHECK: the owner's rule (19/11 ~03:25Z: «Ví dụ như họ lúc nào cũng 100% đủ điều kiện thì lúc đó hãy gieo 9 hay 13%») is now the code. Once every hidden condition is met, the roll is min(1, p × 0.9 ÷ measured eligibility of that group), so a road ends rare about as often as 9–13 % would at full eligibility, and never more than certain. Every number is a BAL key (`BAL.arc.r97.k / .elig / .kc`, `BAL.succN.rare`, `BAL.arc.t96.rare`), with no typed numbers. Branch **review/rare-reach @ fa723811**, merged with main 8dc849c2. One-core guard, quickcheck --runs 6 with old save, and coop-e2e 68/68: all PASS.

Worker: RARE-REACH (opus). Coordinator: Foreman D #6.

## The table (owner view)

Bot lives, all 9 origins (including cnv / ch / thd). Each life is recorded up to chapter 12 (every hidden-chain climax falls in chapters 1–11). Three play styles: **sens** (sensible), **mix** (sensible actions, random choices) and **bold** (takes the options that show "Lợi thế +"). BEFORE = live c12a5878 with the old roll. AFTER = this branch.

| | BEFORE (63 lives) | AFTER (60 lives) |
|---|---|---|
| hidden conditions all met at the climax: all climaxes | 12.4 % (11 of 89) | 12.5 % (11 of 88) |
| … story arcs (j97) | 14.0 % (8/57) | 8.8 % (5/57) |
| … road finales (jroad .11) | 9.4 % (3/32) | **19.4 %** (6/31) |
| roll hit once eligible | 2 of 11 (rolled at 9–13.5 %) | **7 of 11** (now near-certain: expected 9.6 of 11) |
| lives with ≥ 1 rare ending | **3.2 %** | **10.0 %** |
| median lives to a player's first rare | **22** | **7** |
| same, projected at the final BAL (arc .12, road .17) | 13.3 %, median 5 (the before-gates replayed) | 13.3 %, median 5 |

By play style (lives with ≥ 1 rare · median lives to the first):

| style | BEFORE eligible · ≥1 rare · median | AFTER eligible · ≥1 rare · median |
|---|---|---|
| sens | 6.9 % · 0 % · never in 20 lives | 9.7 % · 5 % · 14 (projected at final BAL 13 %, 5) |
| mix | 9.1 % · 5 % · 14 | 10.3 % · 10 % · 7 |
| bold | 22.2 % · 5 % · 14 | 17.9 % · 15 % · 5 |

Bottom line: a typical player used to need about **22 lives** before a first kỳ ngộ. Now it takes **5–7**. The remaining limit is the hidden condition itself (about 1 climax in 8), not the roll.

## What changed (all one core)

1. **The roll comes from eligibility** (j97 `r97Roll(base, src)`). base = rare p × `BAL.arc.r97.k` (0.9). The roll is min(1, base ÷ `BAL.arc.r97.elig[src]`), with src one of arc / road / kc / succ.
   - The same function serves the j97 arcs, the jroad .11 finales (`r97Src`), the jkc outside-palace rares (`kcRare`) and the j99 succession rares.
   - Final values: **arc .12** (13 of 114 climaxes over both arms; the arc chains did not change). **road .17** (from the after-arm. The final 60-life tally is 6/31 = 19.4 %, the same within noise; n is small, about ±7 points). **kc .04** (mean of the 6 doors from the home-road probe). **succ .12** (the arc value. Only 2 bot lives reached the succession's second chapter, and both were eligible).
2. **Road finale Lợi thế fix (jroad `rdSc97`).** The hidden Lợi thế condition on a road finale used to read the .11 thread's own Lợi thế, which is almost always 0. That blocked 62.5 % of road finales even when the path was met. The road now carries the best Lợi thế from chapters .4–.10 in `S.st.f14.q97.sc`, and the .11 thread starts with it. Road Lợi thế failures went from **62.5 % to 3.2 %**, and road eligibility from 9.4 % to 19.4 %. The climax odds and the .11 ending tier still use the thread's own Lợi thế, so no other balance moves.
3. **Typed rare numbers moved into BAL.**
   - jkc kcR1–kcR6 thresholds and p → `BAL.arc.r97.kc`
   - j99succ rare a/b/c → `BAL.succN.rare`
   - j96 «Giả chết» → `BAL.arc.t96.rare`

   Values are unchanged.
4. `dev/RARE_ENDINGS.md`: the mechanism paragraph and the 47 per-arc lines now state the route's chance (as if always eligible) and the roll once eligible.

## Per source

- **j97 arcs / jroad finales / GE kỳ ngộ.** GE kỳ ngộ endings are these same j97/jroad rares through r97Gate. Measured above.
- **jkc outside-palace (home road, opt-in "nhà" mode).** Probe of 63 sens home lives on the before build: kcR3 eligible 11/63, kcR2 2, kcR1 1. kcR4/R5/R6: 0, but their origins had only 7 lives each, so this is not proof that they can't be reached. Mean eligibility is about 4 %, which gives `elig.kc` .04. With base = p × kcF (.12) × k (5.4–8.6 %), base ÷ .04 is above 1, so a kc rare is now **certain once eligible**. Eligibility (about 1 door in 25) is the whole gate there.
- **j99 succession.** Same rule, using the arc value. The after-arm had 2 lives reach it; both were eligible and both hit.
- **j96 Thanh mai «Giả chết».** This is a visible gamble option with its own shown odds, not a hidden second roll, so the rule does not apply. rare96 was not met in 25 lives that had the arc. The tm96c climax opens at chapter ≥ 10 (`BAL.road.tm`), so it mostly falls after the chapter-12 stop. Not changed; flagged below.
- **NPCs.** No NPC gets a ✦ rare ending (jnroad excludes them), so there is no NPC roll to align. **Co-op:** the rolls run on the host only (unchanged), and coop-e2e is 68/68.

## Is any hidden condition near-impossible? (law 2/3)

- Static scan (`dev/measure/rr-static.js`): all 87 chains (47 arc + 40 road) have enough real path options to be met. **0 chains are impossible.** One bad-choice name matches no option (tt_oan_11 "Biếu Ngự sử"). That is harmless: it can only fail to block.
- Measured why-not at the climax (after-arm, all climaxes; one climax can fail several ways): path short 47 % · Lợi thế 42 % (arcs 63 %, roads 3 %) · a bad choice taken 28 % · stat/relation 24 %.
- Per rare, each chain has at most 4 climaxes in 60 lives, which is too few to call any single chain impossible. Lowest across both arms: cn_tinh 0 of 8, ch_co 0 of 5, ch_ho / ch_ho_11 0 of 4. The origins nc / td / ch had **0 eligible climaxes in both arms** (about 18 lives each). This is the next place to look.

## Recommendation (owner decides)

1. **Land this.** Lives with a rare go from 3 % to 10–13 %, and the median wait from 22 lives to 5–7, without making the rare cheap: it still needs the hidden chain.
2. **Optional:** lower the arc Lợi thế floor by 1 (`d.sc − 1`). Counterfactual on the same climaxes: arc eligibility goes from 8.8 % to 14 % (no floor at all: 21 %). The roll would then be re-set from the new eligibility by the same rule, so the per-road chance stays about p × 0.9. Only the wait shortens.
3. **Follow-up (not in this brief):**
   - Look at nc / td / ch, which had no eligible climaxes in either arm.
   - Measure the j96 «Giả chết» gate (it needs full lives past chapter 12).
   - Re-run the kc probe with more dtq / muoi lives for kcR4 and kcR6.

## Gates

- one-core guard PASS (inlineNow 3977 vs baseline 4212)
- quickcheck fa723811 vs live 8dc849c2: PASS, 6 runs, old save loads and plays (perf ran while a measure browser was busy: buổi 1185/1202 ms new/live, render 256/217)
- coop-e2e 68/68
- after-measure 60 lives × 3 styles

## Tools (dev/measure, on the branch)

- `rarereach.js` (in-page recorder: origin rotation, chapter stop)
- `runrr.js` (driver)
- `rr-sum.js` (summary, `--defs`, `--elig` projection)
- `rr-static.js` (chain scan)
- `rr-kc.js` (home-road probe)
- `inbold.js` (the bold style)

Re-measure:

```
GAME=<build> node dev/measure/runrr.js sens 5 out/rr_sens_0.json   # then: node dev/measure/rr-sum.js out --defs --elig arc=.12,road=.17
```

## Handover

Nothing is left to do except review. The scratch data (before/, after/, kc-before.json) stays outside the repo.

## REVIEW (BIG, opus, session_01964izFL2poZEbpoqCfkXD1, 19/11) — verdict: PASS (2 reviewer fixes) → **LAND READY review/rare-reach 29b25146**

PRIORITY #1 CHECK ('rare-reach r97Roll kỳ ngộ'): OD 1947 (19/11 ~03:25Z real, read verbatim) | brief D5-rare-reach.md + ORDER ROOT-62 | main edb2e724: r97Roll / RD97L / BAL.arc.r97.elig = none (only on review/rare-reach) | review/* : review/rare-reach only | claims: this review.

18 LAWS read first (START_CORE + START_WORKER + START_REVIEWER).

### Owner's words vs the code
- The owner's rule: «Ví dụ như họ lúc nào cũng 100% đủ điều kiện thì lúc đó hãy gieo 9 hay 13%». The code matches it. The roll once eligible is min(1, p × BAL.arc.r97.k ÷ BAL.arc.r97.elig[src]), so the chance per road is about p × k (9–13.5 %), as if she were always eligible, and never more than sure.
- One function, r97Roll, serves all four sources: the j97 arcs, the jroad .11 finales, jkc and j99succ.
- **Law 6 (real proof) is kept.** The hidden chain, Lợi thế and the stat condition all still gate the rare. Nothing is free. Most arcs (p .15) now roll sure once eligible (.135 ÷ .12 > 1), so for those arcs the eligibility is the whole gate. That is exactly what her words ask for.

### Laws
- **Law 2 / law 3: PASS.** The ✦ option and its cost are unchanged, and no visible option became dominant. The path choices stay hidden. The road Lợi thế carry (rdSc97) only affects the hidden condition: the climax odds and the .11 ending tier still read the thread's own Lợi thế.
- **Law 4: PASS after a reviewer fix.**
  - one-core guard: inlineNow 3977 → 3975.
  - The worker moved kcR1–R6, the succession a/b/c and the j96 Giả chết thresholds into BAL, with values unchanged (I checked the diff line by line).
  - Missed in the same family (law 11): the temple door of kcR3 (jkc kcChance «chua»: `S.year>=2&&S.sac>=70&&roll(4)`). Now BAL.arc.r97.kc.kcR3.chua {yr 2, sac 70, p .04}, values unchanged.
- **Law 5: PASS.** No rank scaling existed in the rare roll before, and none was removed. The climaxes themselves are untouched.
- **Law 7: PASS.** No player-visible text changed. RARE_ENDINGS.md is a design file.
- **Law 11: PASS.** All rare rolls were found: j97, jroad, jkc (6 doors), j99succ and j96. NPCs have no ✦ ending.

### Reviewer fix 1: jkc eligibility per door (commit 57903b1a)
- **The problem.** `elig.kc` .04 was the mean of the 6 doors. kcR3 (Hoàng thượng vi hành, at the festival or temple door) is far more common than the others:
  - the worker's probe: 11 of 63 home lives
  - my rr-kc probe on the branch: 7 of 23
  - together: 18 of 86 = 21 %
- **The result before the fix.** kcR3 base .043 ÷ .04 > 1, so the roll was sure. kcR3 fired in about 1 home life in 4–5 (all 7 eligible lives in my probe hit). That is about 5× its chance at full eligibility, the opposite of her rule.
- **The fix.** `BAL.arc.r97.elig.kc = {kcR3:.2, kcR2:.05, d:.04}`. r97Roll takes the door id for a per-door table.
- **Effect.** kcR3 rolls .22 (festival) / .27 (temple), so ≈ 4–5 % of home lives, which is its base. kcR1, kcR2 and kcR4–R6 still roll sure once eligible, as before. Arc, road and succ are unchanged.

### Re-run on my own seeds (smaller sample, as ordered)
Setup:
- 3 styles (sens / mix / bold) × 4 lives × 2 arms.
- Seeds 9300–9302, the same per style in both arms. Origin offsets 0 / 4 / 8, so all 9 origins are covered.
- Stop at chapter 12.
- BEFORE = LIVE edb2e724. AFTER = the branch at efbdb1bd (final-merged; the arc / road code is the same as at the LAND READY sha).

| | BEFORE (12 lives) | AFTER (12 lives) |
|---|---|---|
| climaxes | 16 | 14 |
| arcs eligible | 1 of 11 (9.1 %) | 1 of 10 (10 %) |
| road finales eligible | 0 of 5 | 0 of 4 |
| road finales failing on Lợi thế | **5 of 5** | **0 of 4** (path short 3, broke 1) |
| roll once eligible | 13.5 % (0 of 1 hit) | **sure** (1 of 1 hit; P = 1 for p .15) |

- My first test life on the branch (seed 7101, muoi) also met the road rare muoi_no_11: roll .53 = .09 ÷ .17, hit, taken.
- **What this confirms.** The Lợi thế bug on road finales is real (my BEFORE arm: 5 of 5 blocked; worker: 62.5 % → 3.2 %). The fix removes it. Arc eligibility of about 10 % matches the .12 setting. The roll now follows the rule.
- **What this cannot confirm.** 12 lives cannot measure 3.2 % → 10 % lives-with-rare, or the median 22 → 7. Neither arm had a life with a rare. That fits the worker's rates: at 10 %, 0 of 12 happens about 28 % of the time.
- I accept the worker's 60+63-life table. Its mechanics match mine, and the arithmetic holds: road eligibility of about 19 % × roll .53–.79, plus arc eligibility of about 9–12 % × roll of about 1.
- **One observation (not this branch).** The after-arm muoi_lau hit (bold, turn 38) was never taken: the life ran to turn 133 at chapter 4 and ended on the emperor's death. The bot always takes a ✦ (rare97.js), so the climax beat probably never played before the reign ended. This is the same climax queue as on live. I put it in follow-ups.

### nc / td / ch with 0 eligible: a follow-up, not a bug of this job
- Static scan rr-static (re-run by me): 0 of 87 chains impossible. Every path, bad and x name matches real options.
- In my sample, nc had 1 climax in 2 lives, td 2 in 2, ch 5 in 4. They failed for ordinary reasons (path short, a bad choice taken, Lợi thế), not on one blocked condition.
- What stands out is fewer climaxes before chapter 12 for nc / td. That is a measuring-window effect (their arcs climax late), not a dead chain. Keep it as the worker's follow-up.

### Gates (one at a time, on **29b25146** = final-merged LIVE **1a4df595** + reviewer fix 57903b1a)
- **one-core guard: PASS** (inlineNow 3969 vs baseline 4212, 0 fails)
- **quickcheck --runs 6: PASS** (core gates, time-spill, open 1723 ms, old save loads and plays a buổi). Perf median new / live:
  - render 282 / 270 ms
  - tab 526 / 504 ms
  - buổi 1332 / 1175 ms. This is load noise: the same code on edb2e724 read 1348 / 1331, and the worker's run read 1185 / 1202. The branch adds only a few rare-path lines.
  - tasks > 200 ms: 22 / 21
- **coop-e2e: 68/68**
- **role-parity: ALL PASS** (on 1a4df595 the role-parity-drift-2 fixes are live; on edb2e724 the branch and main had the identical 12 open gaps, 0 branch-only)
- **rr-static: PASS** (0 of 87 chains impossible)
- The same gates were also green on the edb2e724 merge (57903b1a): quickcheck PASS, coop-e2e 68/68.

### Owner question (for HER, not decided by us)
«Lợi thế floor −1 on arcs»:
- Arc eligibility would go from 8.8 % to 14 % (my small sample, n 10–11 arc climaxes per arm: before arm 9 % → 18 %, after arm 10 % → 10 %, too few to rank).
- The roll is re-set from the new eligibility by the same rule, so the per-road chance stays p × 0.9. Only the wait gets shorter.
