# night-steal-r1 — REVIEW (BIG tier: odds/rules + co-op)

Reviewer: session_01UV1Szh5bhLhRARVvmvaD6C, opened by MAIN s21 (session_01UV1SzkBh9FhY36EqiUowuZ). START_CTX ≈ 8 % of the window.
Reviewed: review/night-steal @ 4b5919af. Merged onto origin/main 8f476f6f → review/night-steal-r1 (conflicts: jbal2 keeps BAL.steal + BAL.slap; assemble = main's list + jsteal after j75; index.html/sw.js rebuilt by build_site.sh).

## VERDICT: FAIL (1 blocking item + 1 flag for the coordinator)

1. **Her loss rate is not reproduced — measured ≈ 30 %, not 19–22 %.** Bot re-run (`dev/test/night-steal-bot.js`, 20 lives × 3 years each, 7 runs, 539 of her played nights):

   | run | build | seed | her nights | tries / 10 her nights | her nights stolen | NPC nights stolen | tries / 10 nights (all) |
   |---|---|---|---|---|---|---|---|
   | vuaA | r1 (merged) | 11000 | 80 | 5.38 | 31.3 % | 20.3 % | 3.33 |
   | vuaB | r1 | 23000 | 82 | 4.15 | 30.5 % | 16.9 % | 3.01 |
   | m7000 | r1 | 7000 | 65 | 3.69 | 23.1 % | 19.3 % | 3.26 |
   | brA | 4b5919af (unmerged) | 11000 | 82 | 6.22 | 34.1 % | 22.3 % | 3.89 |
   | br7000 | 4b5919af (unmerged) | 7000 | 82 | 3.54 | 28.0 % | 23.3 % | 3.37 |
   | de (Dễ) | r1 | 11000 | 78 | 4.49 | 34.6 % | 18.7 % | 3.28 |
   | kho (Khó) | r1 | 11000 | 70 | 4.14 | 25.7 % | 16.2 % | 2.96 |
   | **pooled** | | | **539** | ≈ 4.5 | **29.9 %** (161/539) | ≈ 19.6 % | 3.0–3.9 ✓ |

   The unmerged branch gives the same (28–34 %), so it is not the merge; the worker's two runs (73 + 102 her nights, 20 %) were a low draw — the bot is not repeatable per seed (page timing), single runs swing ±6 pts. Pooled ≈ 30 % = the level the worker itself rejected as "too punishing" (k .35 → 30.5 %) and well above the analyst/night-time v2 §12 target "≤ 1 lost per 6 of her nights" (≈ 17 %). Overall tries (3–4 / 10 nights) and NPC-night share (16–23 %) ARE on target, so the problem is her row: her nights draw more tries (≈ 4.5 vs ≈ 3.2 per 10) and a higher win share (≈ 70 % vs ≈ 60 %). Likely cause: NPCs rarely have thiện cảm ≥ friend toward her and her rank is low (no fear), so stRel/stFear are ≈ 1 against her. **Fix:** find why her row is hotter and tune (BAL.steal knobs, not typed numbers) until her row is ≤ ~20 % POOLED over ≥ 4 seeds (≥ 300 of her nights) while the overall row stays ≈ 3 tries / 10 nights; report pooled tables, not single runs.

2. **FLAG (coordinator / owner decision): difficulty does not touch stealing.** jdiff has no BAL.steal knob, so on Dễ a new player loses ≈ 1 in 3 of her nights (34.6 %, same as Vừa within noise; Khó 25.7 % is noise). Precedent for a her-side knob exists (BAL.hz "how hard the palace aims at her", Dễ × .55). Recommendation: add a her-side multiplier on the try chance AGAINST HER to the jdiff layer (Dễ ≈ ×.6, Vừa 1, Khó ≈ ×1.1), the act's own cost/odds stay equal both ways. Gain: a new player is not robbed of 1 in 3 nights; risk: bends "same odds" (hiếm to be noticed, nhỏ, the act's odds are unchanged — only the NPC's wish) → Được lớn hơn.

## Checked and OK
- Agent choice (OD 14:45Z, OD:L1386): the old `hostility ≥ 50 && roll(6)` + 50/50 mode is deleted from j8 flip; no flat roll left. want = need (favour/rank/heir) × persW (traits + jemo mood, jemo wraps persW) × relation × fear × oSteal; mode drawn weighted by odds (not argmax). Hatred adds at most ×1.5. ✓
- Same act/cost/odds both ways: NPC uses stealNight/stealWin/oSteal like her deck cards; cost from BAL.steal via stealCost. NPC→her, NPC→NPC, her→NPC covered by unit tests. ✓
- 90 % / 65 % flip (`roll(has("chamchinh")?65:90)`) untouched. ✓
- ONE CORE: BAL.steal drives cost, failSung, rel, ghen in act + card text (stealKem). ✓ (non-blocking notes below)
- Tests on r1: unit `night-steal-unit.js` 21/21, 0 page errors; old save (`night-steal-oldsave.js`, main build → r1) PASS; co-op `coop-e2e.js` (Fold host + iPad guest, live Worker) 59/59; co-op guest decides only tries against herself, friend is never an NPC stealer ✓.
- Perf (200 flips, 10 rivals): flip 0.33 ms (main) → 0.60 ms (r1); stealPass 0.11 ms. Negligible.
- Shots (`night-steal-shot.js`, @2): Fold 755x1000 and iPad 1180x820: steal result "Thẻ bài của ta được lật · Giữa đường, Hoàng thượng bị mời sang cung khác. Đêm nay: <thief>", no horizontal overflow, no page errors (only file:// audio fetch console lines).

## Non-blocking notes (fix with item 1 if cheap)
- j8 ACT steal/road still say `c:{duc:-4}` / `c:{suc:-5}` (overridden by the jsteal getter) — write `c:{}` so no stale typed numbers remain.
- stealKem `B.rel*.6` mirrors j9 relAdd's typed `.6` (oán share) — two copies of one number; one BAL constant for both.
- stEligible default `duc==null?50` typed.
- j79 stealX "Sủng +3, Ân tình +2 trở lên" and `chanceW(22)` duplicate nightFx's typed night gains → night package one-core audit (as the worker noted).
- KIT REQUEST (pre-existing jflip, KIT §67, not this branch): on Fold the raised card's label overlaps the row labels ("Tần Khương Linh Lung" / "Thượng Quan Phương Hoa" / "Đáp ứng Tống Thanh Liên"); the same overlap shows in the plain 22-card demo (`cardflip.js` 755x1000), so it is the shared scene, not the steal path. iPad: faded row label shows through the result chip. Steal makes this scene appear more often → kit keeper.

## Branch state
review/night-steal-r1 = merge onto origin/main 8f476f6f + bot `DIFF=de|vua|kho` env (jdiff life difficulty) + this report. Not pushed to main.
