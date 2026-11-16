# night-steal — fix round 2 (review/night-steal-2)

Worker: session_01UV1SzgwHdcVz2uVRLdV3SN, opened by MAIN s21 (session_01UV1SzkBh9FhY36EqiUowuZ). START_CTX ≈ 3 % of the window.
Base: review/night-steal-r1 @ 86e0a5f4 (reviewer FAIL: her played nights stolen ≈ 30 % pooled vs NPC nights 16–23 %).
MAIN decision followed: no difficulty multiplier, no player-only protection (two-way law HANDOVER.md:L46 / OD:L1386, "death is a game feature" = no shields). Reviewer FLAG 2 rejected.

## Question: why is her row hotter?
Method: instrumented every agent evaluation (stealWant components need × pers × rel × fear × odds) for every eligible NPC on every night, split by holder (her / NPC) and holder rank; plus a SAME-RANK CONTROL = NPC-held nights at the ranks she held, weighted by her rank mix.

### 1. Code asymmetries found (fixed)
| # | where | what | fix |
|---|---|---|---|
| A1 | jsteal stFear | the Empress's custom night (mùng một / rằm, × BAL.steal.custom) was applied only when the holder was an NPC (`t!==S&&t.queen`); when SHE is the Empress her custom night was robbed at full want (× .5 fear only, NPC Empress × .15) | `rkOf(t)>=7` — the same for her and an NPC |
| A2 | jsteal stModes | feign gate read a typed default `v.duc==null?50` | `ducOf(v)` (j85, the one Đức core) |
No other path treats her differently: rkOf / aff / oan read her the same way (aff(v,S)=v.rel, oan(v,S)=v.oan, same −100..100 / 0..100 scales, same start: rival rel R(20)−10, NPC↔NPC 0), persW/emoMul take no target, oSteal depends only on the doer. New unit check 12 proves it: for rank 2/4/6/7, thiện cảm 0/70/−30/10, oán 0/60/20 and the custom night, stealWant(v, her) ≡ stealWant(v, NPC in her place) (same rel, fear, u, mode).

### 2. What remains is her position (fair, kept)
Components per evaluation, holder rank 2 (5 runs × 20 lives × 3 y, fixed build):
| holder | evals | need | pers | rel factor | fear | odds | thiện cảm to holder | oán to holder | want u |
|---|---|---|---|---|---|---|---|---|---|
| her (rank 2) | 1556 | .652 | 1.36 | **.971** | 1.00 | 58.0 | **−8.4** | 3.3 | .478 |
| NPC (rank 2) | 2639 | .655 | 1.31 | **.795** | 1.00 | 55.1 | **+13.1** | 0.9 | .374 |
| NPC (all ranks) | 24413 | .671 | 1.35 | .788 | **.793** | 55.2 | +14.3 | 0.7 | .304 |
- vs the whole NPC row: most NPC nights are held by high ranks (Empress custom nights, Phi/Quý phi) → fear .79 avg, Empress nights 6–8 % stolen. She sits at rank 2 → nobody fears her. That is rank, not code.
- vs an NPC of her own rank: the only gap is relation. The bot player is passive (no visits, gifts, tea, alliances), so after 3 years NPCs hold thiện cảm −8 toward her vs +13 toward each other (their own weekly social acts). rel .971/.795 = ×1.22 want — this explains ~80 % of the u gap (.478 vs .374). A player who makes friends gets the same shield an NPC has (friend ≥ 60 → × .15).

### 3. Measurement (bot fixed: flips inside start()'s new-life re-roll loop are no longer counted — that loop can call start() many times, each with a rank-0 first-night flip; one probe run had 92 such fake "her nights", 100 % stolen)
`dev/test/night-steal-bot.js` (now logs per night [her?, holder rank, tries, stolen]) + `night-steal-sum.js a.json,b.json,…` (pooled + same-rank control row). 8 seeds × 20 lives × 3 years, fixed build:
| seed | her nights | her stolen | her tries / 10 | same-rank NPC control nights | control stolen | control tries / 10 |
|---|---|---|---|---|---|---|
| 11000 | 69 | 33.3 % | 4.49 | 142 | 13.4 % | 3.45 |
| 23000 | 78 | 33.3 % | 6.03 | 322 | 24.4 % | 4.31 |
| 7000 | 95 | 32.6 % | 4.95 | 95 | 28.4 % | 5.16 |
| 31000 | 71 | 28.2 % | 4.37 | 303 | 27.6 % | 4.71 |
| 41000 | 88 | 27.3 % | 4.77 | 302 | 24.6 % | 3.74 |
| 53000 | 82 | 34.1 % | 5.37 | 136 | 19.9 % | 3.75 |
| 61000 | 75 | 26.7 % | 3.60 | 383 | 15.9 % | 4.12 |
| 71000 | 61 | 39.3 % | 5.74 | 363 | 15.6 % | 2.96 |
| **pooled (bot)** | **619** | **31.7 %** (spread 26.7–39.3) | **4.91** | **2540** | **20.6 %** (spread 13.4–28.4) | **3.96** |
| probe, 9 runs (4 pre-fix + 5 fixed), rank 2 only | 679 | 25.8 % | 4.4 | 1202 | 26.2 % | 4.0 |
| **all 17 runs, rank 2** | **≈1270** | **≈28.6 %** | | **≈3740** | **≈22.4 %** | |
Whole-row (old metric, bot pooled): her night 29.6 % stolen (663), NPC night 17.9 % (8340), all tries 3.0–3.6 / 10 nights ✓ (target ≈ 3).
Runs swing a lot (lives are clustered: a few lives hold most of her nights), so read pooled rows only. Her row ≈ 6 pts above an NPC of her own rank, and that gap is the relation she has not built in a passive bot life (section 2); with equal relation the code gives equal odds (unit check 12).

### 4. Reviewer's non-blocking items (all touch stealing, done)
- j8 ACT steal/road `c:{duc:-4}` / `c:{suc:-5}` → `c:{}` (the jsteal getter reads BAL.steal.cost; unit check).
- stealKem `B.rel*.6` and j9 relAdd's typed `.6/.2/.3` → one constant `BAL.relOan={hurt:.6,doer:.2,mend:.3}` (jbal2) read by both.
- stModes `duc==null?50` → `ducOf(v)`.
- Not done (outside stealing): j79 stealX "Sủng +3, Ân tình +2" / chanceW(22) vs nightFx = night-package one-core audit, as noted before.

### 5. Tests (fixed build, rebuilt site)
- unit `night-steal-unit.js`: 29/29 PASS (21 old + 8 new: symmetry ×5, ducOf, ACT getter, relOan), 0 page errors.
- old save `night-steal-oldsave.js` (origin/main e433c65c build → this build): PASS, 0 errors.
- co-op `coop-e2e.js` (live Worker): 59/59.
- perf (200 flips, 10 rivals): flip 0.13 ms (main) → 0.31 ms; stealPass 0.14 ms. Negligible.

### Open for the coordinator
- Her row is still ≈ 29–32 % in a PASSIVE bot life. Per MAIN this is fair (same code both ways). If the owner wants it lower, the two-way knobs are BAL.steal.k / friend / fear (they move NPC rows too).
- Worth a separate people-life audit (not stealing): NPC kind acts toward her vs toward each other — NPC↔NPC thiện cảm drifts +13 in 3 years, NPC→her −8 with a passive player. If some NPC kind act never targets her (e.g. jts tsLeNpc guests exclude her by design), that is a two-way question for that system.
- Branch not merged with the newest origin/main (e433c65c); the pusher merges at go-live step 1.
