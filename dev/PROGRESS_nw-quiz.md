# PROGRESS nw-quiz (family C, no word games) — branch review/nw-quiz

Owner rule: OD "no word games" (16/11 07:20Z) + "mg-balance target" (07:25Z).

## Inventory (quiz / vấn đáp entry points)
| Entry point | Before | After |
|---|---|---|
| jexam EXK.le (lễ nghi round of khảo hạch tấn phong, tier 0) | quiz engine, EXQ.le question bank | `lay` Bày lễ: copy the model altar (jnwq) |
| jexam EXK.tc (trị cung, tier 2) | quiz, EXQ.tc | `sort` Phân kho: ware → storeroom with the same sample |
| jexam EXK.xa (xử án, tier 2) | quiz, EXQ.xa | `clue` Khám vật chứng: tap the suspect matching pictured evidence |
| jexam EXK.thq (Thái hậu hỏi, tier 2) | quiz, EXQ.thq | `seat` Xếp chỗ ngồi yến: pins = rank → seat order |
| Servant / ma ma exam (exSrvPlan) | uses exRounds tier 0 (le + banh/theu) | same, le is now `lay` |
| j82 KG82_KIND banh / huong (quiz banks) | already replaced by j91 cook / blend | untouched |
| j82 tho / doi / doden | other families (nw-poem, nw-lantern) | not touched |
| j5.js `quiz()` (old Tài nghệ lessons thi/y) | legacy, not reachable | left (not in any entry point; flag in report) |

## Files
- `dev/build/jnwq.js` (new, after jbal2 in assemble.py): engines lay/sort/seat/clue + `nwqTier`.
- `dev/build/jbal2.js`: `BAL.nwq` block (all numbers).
- `dev/build/jexam.js`: EXK points to new engines, EXQ banks + kg82Bank hook removed.
- `dev/build/jsfx.js`: SFXMGE entries for the new engines.

## Status
Engines written, demo cards render. Next: bot tests at all viewports, calibration, report.
