# Review — D12 mood bar (review/mood-bar @ d538222c) — r1

Reviewer session_01N1tNP2tDyXgEkNtxUKNKVN (Foreman B). Result branch **review/mood-bar-r1** @ ce43d3b58988203f4bec1f8f27421c85ea38042e
(= review/mood-bar merged onto origin/main 9ddb3f6c, then onto origin/main 695934d1; ancestor check OK).

## Merge
- Conflict only in `dev/build/assemble.py` file list: kept main's list, appended `jmood.js` last (as the worker had it). `index.html` / `sw.js` rebuilt.

## Small fixes made by the reviewer (commit 0b0e3cf4)
1. "Có người đến an ủi" was an UNCLASSIFIED dialog builder (`opt-scan.py --fail` listed jmood.js:118 `??`), so it showed full Được/Kèm numbers.
   Owner OD:L469/L477 + KIT §28.6: an NPC visit is an EVENT choice → only cost + hint. Added `ev:1` + truthful hand hints
   (`risk:"an toàn"`): "lòng nhẹ đi nhiều, được lòng <tên>; nhưng mất một khắc buổi này" / "lòng nhẹ đi chút ít, giữ được thể diện; nhưng <tên>
   thấy ta giữ khoảng cách" (the generated hint had dropped the mood gain). opt-scan now: jmood `ev`; unclassified count back to main's 6.
2. One-core rule (OD:L1267): two typed numbers moved to BAL — `BAL.mood.comfort.danh` (Danh +1 of "Gượng cười") and `BAL.mood.satMin` (.2 saturation floor).

## Checks
| check | result |
|---|---|
| `node dev/test/mood-bar.js` (box/self/comfort/lock/high/oldsave) 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390, 390x844 — on final sha | PASS, 0 page errors, no page/dialog overflow |
| 390x844 | rotate prompt shown |
| old save without `S.mood` | loads, Bình thản 0 |
| `kit-conform.js` 755x1000 | CONFORMS 85, MISSING 14 (unreachable kinds, as on main), no non-template |
| `kit_dupes.js` | OK |
| `opt-scan.py --fail` | jmood classified `ev` (remaining 6 unclassified are pre-existing on main: jty ×3, jthaiy, jts ×2) |
| Kit | kitSignedBar §49.1, kitRows, kitSkillCard kind "mood" (same tile as jpcf), kitModal, event dialog — no private CSS/frames |
| Wording | no %, decay said "2 phần mười mỗi tuần"; player = "ta" on screen (j84); odds via whyStep ladder words; colours by meaning |
| Numbers | every input/decay/band/effect/comfort value read from `BAL.mood` (after fix 2) |
| Gain and loss | high mood: odds + thiện cảm gains ↔ rivals' jealousy ×1.2; low: odds/thiện cảm down, show-off acts locked ↔ comfort visit; two comfort answers each with gain and price |
| Measure | worker's n=30 ON/OFF table credible: effect inside noise (SE ≈ 8 pts), bar not stuck (extremes 1.3 % of tuần, max streak 5), odds shift mean +0.5 / max 6 pts (≤ 1 ladder step). Comfort visits are rare (1 in 30 lives before chLow 15 % was added; not re-measured) — acceptable, flagged below |
| Screenshots looked at | box, self, comfort, lock (Cần row text checked via test output), high, oldsave at all 6 sizes |

## Notes for the foreman (not blocking)
- OD:L600 says "Applies to NPCs too". NPCs keep jemo's per-person feeling (moves their odds and act choices), so the two-way rule is met in
  effect, but the Sims-like BAR itself is hers only. Worker already asked; foreman should take the owner's answer (follow-up item).
- Re-measure comfort-visit frequency after chLow if the owner wants the visit to be noticeable.

PASS ce43d3b58988203f4bec1f8f27421c85ea38042e
