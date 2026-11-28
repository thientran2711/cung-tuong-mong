# E-ILL-RATE — illness death-rate table, LIVE vs review/illness-cure (Foreman E C10, ORDER MAIN 185 02:20Z + C9 add-on)
Worker session_01DgYSWpaN2twGb24ZSi3S5p (opus), 28/11. START_CTX ≈ 3 % (get_session read 0, so this is my own estimate). Measures only. No game code changed.

PRIORITY #1 CHECK: OD MAIN 185 02:20Z (Q1 BAL.illCure.sucCap, Q3 BAL.kidIll), OD:L2670 (illness still kills) | main 22afefb4 has no illness-cure; existing sims dev/test/mortality.js, npc-death.js, npc-purpose-rates.js (none of them counts illness death per case) | review/illness-cure 3185acbb (Foreman C, under BIG RV-183, not reviewed here, only measured) | claims: E-ILL-RATE = this session (Foreman E C10).

## Builds and method
- **A** = LIVE origin/main **22afefb4**. **B** = origin/review/illness-cure **3185acbb** (the newest sha at 08:05Z, r4, on LIVE 5ad52416). Both run from the built root index.html.
- Sim: `dev/test/ill-rate-sim.js` (branch review/e-ill-rate). It runs headless Playwright and uses the game's own functions. Per life: `Math.random` = mulberry32(seed) (the same seeds on both builds), `localStorage` is cleared (the road history would otherwise change the rolled road), `__forceOrigin`, `start()`, then `monthTick()` × 36 with the dialog queue cleared each month.
- Policies for her: **idle** = she never takes a cure road. **best** = while she is ill, she takes the best road she can pay once per tuần (3 a month) before each month. On A that is Truyền thái y (bạc 40), else Tự bốc thuốc (Y ≥ 3), else Tĩnh dưỡng. On B it is jillcure `bestWay` (ty · cau · vien · rest, at the same prices). The cost is paid with ap().
- Counting is black-box and the same on both builds: each person's ill state and alive flag before and after each month, grouped by `KIT_FACEFX.kind`. A **strict illness death** is a person who was at nặng or worse at the month start, with a deadly illness (ILL.die > 0), and who is dead or gone after that month. Staff who leave the roster while ill (fired, reassigned) are listed but not counted.
- Run 1: 12 origin rows × 2 policies × 15 seeds × 36 months, on both builds = 720 lives, **974 + 995 seeded years**. Run 2 (the v2 counters, idle only): 360 lives, **489 + 498 seeded years**. 0 page errors.
- **LIMIT:** the sim covers the monthly rolls: illMonth / illMonthP and every wrapper on them (jbal2, jmort, jkh, j35, jillcure NPC roads), the epidemic and the monthly world events. It does NOT cover illness caught inside a buổi: jworld dịch per action, cold-snap «Chịu rét», visiting the sick, buổi agenda acts of NPCs (for example jagacts2 kidAsk / kidWatch for NPC mothers), Sức spent on actions. A loop over endTurn is gated by about 20 wrappers and did not advance headless, so it was dropped.
- The **cnv** (cung nữ) origin dies in «Chết rét, chết đói trong lãnh cung» at month 4–32 on both builds when idle. This is a sim artifact (a servant life with no actions) and is left out of the illness verdict.

## Table 1 — NPC illness (run 2, idle lives, per seeded year)
| group | build | ill cases / yr | illness deaths / yr (strict) | death per case (strict) | cure / ill-month (all stages) | cure / ill-month at nặng+ | left the roster while ill (not counted) |
|---|---|---|---|---|---|---|---|
| phi tần | A | 6.04 | 0.194 | 3.2 % | 32.3 % | 31.1 % | 0 |
| phi tần | B | 6.08 | 0.042 | 0.7 % | 36.8 % | 53.4 % | 1 |
| cung nữ | A | 8.20 | 0.223 | 2.7 % | 26.6 % | 26.6 % | 343 |
| cung nữ | B | 7.91 | 0.209 | 2.6 % | 27.8 % | 27.4 % | 303 |
| thái giám | A | 8.20 | 0.102 | 1.2 % | 28.3 % | 27.5 % | 39 |
| thái giám | B | 8.00 | 0.114 | 1.4 % | 28.8 % | 28.4 % | 27 |
| children | A | 2.48 | 0.055 | 2.2 % | 27.9 % | 28.8 % | 15 · all child deaths 93 (0.19/yr) |
| children | B | 2.07 | 0.058 | 2.8 % | 27.5 % | 26.4 % | 47 · all child deaths 239 (0.48/yr) |
| thái y | A | 2.05 | 0.002 | 0.1 % | 29.2 % | 29.4 % | 2 |
| thái y | B | 2.08 | 0.000 | 0.0 % | 29.8 % | 28.4 % | 2 |
| thị vệ | A | 3.89 | 0.002 | 0.1 % | 28.7 % | 28.7 % | 3 |
| thị vệ | B | 3.86 | 0.008 | 0.2 % | 28.5 % | 29.0 % | 6 |
| royal (prince/princess) | A | 1.07 | 0.000 | 0.0 % | 30.5 % | 29.3 % | 1 |
| royal (prince/princess) | B | 0.99 | 0.000 | 0.0 % | 30.3 % | 30.4 % | 4 |
| men (officials) | A | 2.91 | 0.002 | 0.1 % | 29.0 % | 28.3 % | 12 |
| men (officials) | B | 2.87 | 0.006 | 0.2 % | 28.4 % | 28.0 % | 12 |
| Emperor | A | 0.00 | 0.000 | — | — | — | 0 |
| Emperor | B | 0.00 | 0.000 | — | — | — | 0 |
| Thái hậu | A | 0.18 | 0.006 | 3.4 % | 25.5 % | — | — |
| Thái hậu | B | 0.16 | 0.002 | 1.3 % | 30.0 % | — | — |
| HEROINE | A | 0.98 | 0.041 | 4.2 % | 28.8 % | 28.4 % | — |
| HEROINE | B | 0.93 | 0.024 | 2.6 % | 31.4 % | 29.9 % | — |
| **all NPC (no Emperor / Thái hậu)** | A | | | **1.7 %** | | 28.3 % | |
| **all NPC (no Emperor / Thái hậu)** | B | | | **1.3 %** | | 30.6 % | |

Lives A 180 · B 180 · seeded years A 489 · B 498

Reading Table 1:
- **Phi tần:** illness death per case **A 3.2 % → B 0.7 %**. The nặng+ cure per month goes **A 31 % → B 53 %**. The order's target is ~60 %/month. B gets close but stays a little below: the NPC road fires in BAL.illCure.npc = 60 % of months, and the road itself does not always cure.
- **Cung nữ / thái giám / thị vệ / thái y / men:** **no change** (cung nữ 2.7 → 2.6 %; thái giám 1.2 → 1.4 %). B's NPC road (jillcure.js:117–125, a wrapper on illMonthP) reaches consorts only. Staff, servants and courtiers go through jface.js fxIllMonth, which has no road. Law 1 asks for the same roads for everyone, so this is a gap.
- **Children:** child deaths from all causes **A 0.19 /yr → B 0.48 /yr (×2.5)**. Root (B j8.js:471–481, BAL.kidIll): the first hit no longer kills (hp floor 10), as Q3 ruled. But the child then stays «ốm» until hp ≥ well 60, regains only +4 a month (BAL.eff.j8.hpKidsMonth), and each month has worse = 30 % for a second hit of 30–69, which usually kills. On A a hit on a healthy child (hp ~100) never killed; only a second hit before recovery did, at 1.5–3 %/month. **Caveat:** NPC mothers' kid roads (jagacts2 kidAsk / kidWatch) run in buổi agendas, which this sim does not cover, so the real B figure may be lower. Even so, with no road the B rule kills a struck child far more often than A did.
- **Thái hậu:** 3.4 % → 1.3 % per case (small n). **Emperor:** no illness in 3 years (S.emp.ill only rolls above age 50).
- The **all-NPC** strict death per case goes A 1.7 % → B 1.3 %. Run 1 used looser counting (any exit while ill); it gave 4.0 % → 3.5 %, inflated by staff turnover.

## Table 2 — HEROINE illness death by origin (run 1; y1 = first 12 months; idle vs best cure)
### Table 2 — HEROINE illness death by origin (deaths among lives; y1 = first 12 months, y1–3 = 36 months)

| origin | build | policy | lives | ill cases (36 mo) | y1 illness death | y1–3 illness death | other death y1–3 | cure per ill-month |
|---|---|---|---|---|---|---|---|---|
| tt | A | idle | 15 | 2.33 | 0 (0.0 %) | 1 (6.7 %) | 0 | 27.9 % |
| tt | A | best | 15 | 3.53 | 0 (0.0 %) | 0 (0.0 %) | 0 | 81.5 % |
| tt | B | idle | 15 | 3.00 | 0 (0.0 %) | 1 (6.7 %) | 1 | 26.1 % |
| tt | B | best | 15 | 3.53 | 0 (0.0 %) | 0 (0.0 %) | 0 | 84.1 % |
| dtq | A | idle | 15 | 2.87 | 1 (6.7 %) | 3 (20.0 %) | 2 | 28.9 % |
| dtq | A | best | 15 | 3.93 | 0 (0.0 %) | 0 (0.0 %) | 3 | 82.6 % |
| dtq | B | idle | 15 | 2.93 | 0 (0.0 %) | 0 (0.0 %) | 0 | 40.6 % |
| dtq | B | best | 15 | 3.13 | 0 (0.0 %) | 0 (0.0 %) | 0 | 92.2 % |
| muoi | A | idle | 15 | 3.07 | 1 (6.7 %) | 1 (6.7 %) | 1 | 36.8 % |
| muoi | A | best | 15 | 3.20 | 0 (0.0 %) | 0 (0.0 %) | 1 | 80.0 % |
| muoi | B | idle | 15 | 2.87 | 0 (0.0 %) | 2 (13.3 %) | 2 | 26.1 % |
| muoi | B | best | 15 | 2.53 | 0 (0.0 %) | 0 (0.0 %) | 0 | 94.6 % |
| cn | A | idle | 15 | 1.07 | 1 (6.7 %) | 1 (6.7 %) | 2 | 51.9 % |
| cn | A | best | 15 | 1.53 | 0 (0.0 %) | 0 (0.0 %) | 1 | 91.7 % |
| cn | B | idle | 15 | 1.33 | 0 (0.0 %) | 0 (0.0 %) | 0 | 51.4 % |
| cn | B | best | 15 | 0.93 | 0 (0.0 %) | 0 (0.0 %) | 0 | 92.9 % |
| nc | A | idle | 15 | 2.87 | 2 (13.3 %) | 7 (46.7 %) | 1 | 25.6 % |
| nc | A | best | 15 | 3.93 | 0 (0.0 %) | 0 (0.0 %) | 1 | 85.3 % |
| nc | B | idle | 15 | 2.60 | 0 (0.0 %) | 1 (6.7 %) | 0 | 31.1 % |
| nc | B | best | 15 | 3.20 | 0 (0.0 %) | 0 (0.0 %) | 2 | 81.8 % |
| td | A | idle | 15 | 2.13 | 1 (6.7 %) | 1 (6.7 %) | 1 | 29.9 % |
| td | A | best | 15 | 1.60 | 0 (0.0 %) | 0 (0.0 %) | 2 | 96.0 % |
| td | B | idle | 15 | 1.67 | 2 (13.3 %) | 4 (26.7 %) | 0 | 25.0 % |
| td | B | best | 15 | 1.80 | 0 (0.0 %) | 0 (0.0 %) | 2 | 100.0 % |
| ch | A | idle | 15 | 2.87 | 0 (0.0 %) | 3 (20.0 %) | 0 | 25.9 % |
| ch | A | best | 15 | 3.27 | 0 (0.0 %) | 0 (0.0 %) | 0 | 90.0 % |
| ch | B | idle | 15 | 3.07 | 0 (0.0 %) | 0 (0.0 %) | 0 | 30.9 % |
| ch | B | best | 15 | 3.53 | 0 (0.0 %) | 0 (0.0 %) | 0 | 86.2 % |
| thd | A | idle | 15 | 3.20 | 0 (0.0 %) | 2 (13.3 %) | 1 | 25.8 % |
| thd | A | best | 15 | 3.73 | 0 (0.0 %) | 0 (0.0 %) | 1 | 81.3 % |
| thd | B | idle | 15 | 2.53 | 0 (0.0 %) | 1 (6.7 %) | 1 | 24.8 % |
| thd | B | best | 15 | 2.40 | 0 (0.0 %) | 0 (0.0 %) | 1 | 83.3 % |
| cnv | A | idle | 15 | 1.67 | 0 (0.0 %) | 0 (0.0 %) | 15 | 20.9 % |
| cnv | A | best | 15 | 2.13 | 0 (0.0 %) | 0 (0.0 %) | 15 | 78.4 % |
| cnv | B | idle | 15 | 1.47 | 0 (0.0 %) | 0 (0.0 %) | 15 | 28.0 % |
| cnv | B | best | 15 | 2.73 | 0 (0.0 %) | 0 (0.0 %) | 15 | 90.9 % |
| pf | A | idle | 15 | 2.93 | 0 (0.0 %) | 1 (6.7 %) | 1 | 25.9 % |
| pf | A | best | 15 | 3.40 | 0 (0.0 %) | 0 (0.0 %) | 0 | 86.2 % |
| pf | B | idle | 15 | 3.27 | 0 (0.0 %) | 1 (6.7 %) | 1 | 33.6 % |
| pf | B | best | 15 | 3.20 | 0 (0.0 %) | 0 (0.0 %) | 0 | 83.0 % |
| bd (any road) | A | idle | 15 | 3.47 | 1 (6.7 %) | 1 (6.7 %) | 0 | 33.3 % |
| bd (any road) | A | best | 15 | 2.60 | 0 (0.0 %) | 0 (0.0 %) | 1 | 74.5 % |
| bd (any road) | B | idle | 15 | 3.33 | 0 (0.0 %) | 1 (6.7 %) | 0 | 33.3 % |
| bd (any road) | B | best | 15 | 3.60 | 0 (0.0 %) | 0 (0.0 %) | 0 | 82.0 % |
| bd_san | A | idle | 15 | 2.53 | 1 (6.7 %) | 1 (6.7 %) | 0 | 31.8 % |
| bd_san | A | best | 15 | 4.27 | 0 (0.0 %) | 0 (0.0 %) | 0 | 89.6 % |
| bd_san | B | idle | 15 | 2.53 | 0 (0.0 %) | 3 (20.0 %) | 1 | 22.9 % |
| bd_san | B | best | 15 | 4.00 | 0 (0.0 %) | 0 (0.0 %) | 2 | 85.3 % |

| ALL origins | build | policy | lives | y1 illness death | y1–3 illness death |
|---|---|---|---|---|---|
| all | A | idle | 180 | 4.4 % | 12.2 % |
| all | A | best | 180 | 0.0 % | 0.0 % |
| all | B | idle | 180 | 1.1 % | 7.8 % |
| all | B | best | 180 | 0.0 % | 0.0 % |

### Table 2b — HEROINE by start age (all origins)

| start age | build | policy | lives | y1 illness death | y1–3 illness death |
|---|---|---|---|---|---|
| 18 | A | idle | 66 | 6.1 % | 13.6 % |
| 18 | A | best | 56 | 0.0 % | 0.0 % |
| 18 | B | idle | 48 | 0.0 % | 4.2 % |
| 18 | B | best | 66 | 0.0 % | 0.0 % |
| 19 | A | idle | 65 | 4.6 % | 6.2 % |
| 19 | A | best | 62 | 0.0 % | 0.0 % |
| 19 | B | idle | 66 | 0.0 % | 6.1 % |
| 19 | B | best | 64 | 0.0 % | 0.0 % |
| 20 | A | idle | 49 | 2.0 % | 18.4 % |
| 20 | A | best | 62 | 0.0 % | 0.0 % |
| 20 | B | idle | 66 | 3.0 % | 12.1 % |
| 20 | B | best | 50 | 0.0 % | 0.0 % |


### Code path: why she dies of illness in year 1 (every origin; bd_san has NO path of its own)
- grep of jrd_bd.js, jrd_bd2.js, jbalbd.js, jgedata_bd.js and jorigins.js found no catchIll / ill / illness key. The bd start stats are BAL.orig.bd.o = {danh 15, **Sức 90**, bạc 90} (jbal.js:153), which is no worse than other origins. In the sim, bd_san y1 idle death is A 1/15 and B 0/15, the same as the all-origin rate. The robot count (bd_san 3/11 lives dead in y1; other bd roads 0/21 in the robot JSONs) is far above the monthly-roll rate. So it comes from in-buổi paths plus a small sample, not from a bd_san rule.
- On LIVE A, the illness chain for her (and for every consort):
  1. Monthly worsening 35 % (BAL.odb.j13.rbIllMonthP_2, **j13.js:20**) beats the 30 % self-cure (rbIllMonthP, j13.js:19; Lao phổi −15 for being slow).
  2. At nguy kịch she faces **two death rolls in the same month**: **j13.js:21** `roll(25*d.die)` and **jbal2.js:41** `roll(25*d.die*BAL.illDie)` with BAL.illDie = 2 (jbal2.js:2). The second one also fires in the very month the illness turns nguy kịch. Worked out: Lao phổi ≈ 25 % + 50 % → **~62 % a month**, Kiết lỵ ≈ 40 %, Sốt rét ≈ 34 %. On the «khó» difficulty jdiff.js:21 multiplies illDie by 1.5 and illAdd by 2.
  3. The chip card «Kiết lỵ · nặng» shows only «Lui» (robot greedy5 moments line 71; illness-cure report root 1). The cure road is hidden, so a real player (or the robot) is effectively «idle».
- B fixes points 2 and 3: jbal2.js:53 rolls only when the illness was already nguy kịch at the month start (st0 === 3), so she gets one month to act; the card opens by itself, with the roads and the danger in words. The j13 roll is now BAL.illCure.die3 = 25 (j13.js:21).

## Verdicts (FOR MAIN 188 + Foreman C)
1. **NPC death rate:** **YES for phi tần.** Death per case falls 3.2 % → 0.7 %, and the nặng+ cure per month rises 31 % → 53 % (near the ~60 % target). **NO for everyone else.** Servants, eunuchs, guards, physicians and officials are unchanged (~1–3 % per case), because the B road is consort-only (law 1 gap). **Children get worse on B:** all child deaths 0.19 → 0.48 /yr with no road used (see the caveat). Both points need Foreman C / RV-183 attention.
2. **Heroine year 1 on B:** with **no road taken**, y1 illness death is **A 4.4 % → B 1.1 %** (all origins, 180 lives each) and y1–3 is 12.2 % → 7.8 %. With the **best road** it is **0 % on both** (360 lives). On B she always gets a card that opens by itself, the danger in words and a road at every tier, so a year-1 illness death now needs her to ignore the card. Law 5 (harder as she climbs) is not broken by a silent kill any more. Still, 1 % of year-1 lives (2/180, both td) and 7.8 % of three-year idle lives die of illness at rank 0–2, the same odds as at rank 8. The rule has no «easier at the bottom» side.
3. **bd_san:** no bd_san-specific code path. The sim does not reproduce the robot's 3/11 year-1 deaths on the monthly rolls. The robot lives ran on A, where the card had no road (equivalent to idle) and the in-buổi catch paths apply.

## BAL proposals (recommendation only; law 16, the owner decides; not built)
- P1 (heroine, law 5): scale the nguy kịch death rolls by her rank, e.g. a new BAL.illCure.rankDie = [.4,.5,.6,.7,.8,.9,1,1,1] × die3 (j13 + jbal2 + jface use it for p === S and for consorts alike, law 1). Rough estimate, not simulated: B idle y1 ≈ 0.5 %, y1–3 ≈ 4 %.
- P2 (law 1): give staff (jface fxIllMonth) the same NPC road as consorts: BAL.illCure.npc at their owner's prices, or `rest` for a servant with no bạc. Cung nữ deaths per case would fall from ~2.6 % toward the consort level.
- P3 (children, Q3 follow-up): BAL.kidIll.worse 30 → 12, or well 60 → 40, or a regen while ốm (+10 a month), so that the no-road child death rate returns near A (~0.2 /yr) while the sign-before-death rule stays.
- P4 (NPC target 60 %): BAL.illCure.npc 60 → 75 would bring the consort nặng+ cure per month from 53 % to ~60 %.

## Files
- dev/test/ill-rate-sim.js (the sim), dev/test/ill-rate-agg.js (Tables 1 and 2, run 1), dev/test/ill-rate-agg2.js (Table 1 strict counts, run 2). Branch review/e-ill-rate 29b0ac00 (base origin/main 22afefb4; test files only).
- Re-run: `ONLY=tt,dtq,muoi node dev/test/ill-rate-sim.js <rootA> <rootB> out.json 15 3 [idle,best]` (4 shards in parallel ≈ 35 min), then `node dev/test/ill-rate-agg.js out.md sh*.json`.
