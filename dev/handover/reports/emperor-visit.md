SẴN SÀNG KIỂM 16a2d41ed7743fae83d9fea6a7fd4df95cb063dd

# emperor-visit — orphan #19 / D8, VISIT half (owner OD:L603 item 6)

Worker session_01DgYSWnVJ8zy6Hr7QeM3HD1 (Foreman D). Branch `review/emperor-visit` @ 16a2d41ed7743fae83d9fea6a7fd4df95cb063dd = review/mortality-r1 @2d3428f8 + origin/main (merged 745f25eb) + this work.
START_CTX ~3 %. The poison-road half (OD:L602) is NOT in this branch: Foreman D s4 dropped it from the task and parked it with the coordinator.

## PRIORITY RULE #1 — reused, not rebuilt
- j7 event `empnight` (the Emperor at her door at night) is the visit: extended, no second event. Before: generic event pool, Sủng ≥ 20, max once a year,
  same weight at any favour; its night used the Kính sự phòng prep text (bath, wrapped in the quilt, carried away) and gave a normal night only.
- j75 one-night-per-day (ntTake / ntReason / lockFirst), j8 night cards (night1 → night2 → nightFx), jtrong Thái hậu archetype (TH_ARCH.neg) + trọng
  (trongMul, trongLearn, new DEED.empvisit {Lễ −1}), jmort-style co-op host() rule, the kit event card (§28.6 cost mode + hint/risk).

## What changed
| file | change |
|---|---|
| dev/build/jbal2.js | `BAL.visit` (roll, gates, gains, jealousy, Hoàng hậu, Thái hậu, advice, Phô tài `show`, tea visit `tea`) + `BAL.night` (the one night rule) |
| dev/build/jvisit.js (new, last in assemble.py) | daily visit roll after the tablet flip; empnight out of the generic pool; visit night with its own opening; extras after nightFx; "Sáng hôm sau" result card; co-op host roll + guest card/news |
| dev/build/j7.js | empnight gate and Phô tài read BAL.visit (were 20 / 40 / 8 / 5 / 6 / 2 typed) |
| dev/build/j8.js | nightFx reads BAL.night (were 3 / 2 / 8 / 10 / 4 typed) — every road into a night |
| dev/build/j24.js | the short tea visit "Hoàng thượng ghé cung ngươi uống chén trà" reads BAL.visit.tea; its result line printed "Chắc chắn" (VANPHONG ban) — now no odds word |
| dev/test/emperor-visit.js (new) | flow + safe road + gates + frequency bot (BEFORE=1 = old rule) |

## The rule now (all numbers BAL.visit)
- Daily % after the flip = base .3 + slope .07 × (Sủng − 20) + anK .01 × Ân tình, × 1.5 đa tình / × .5 lạnh lùng, cap 8. No visit: Sủng < 20, pregnant,
  lãnh cung, he is gravely ill (illness stage ≥ 2), within 9 days of the last visit, or a night already taken today by someone other than the tablet's pick.
  The card is marked `must` (the j68 evGate pacing would otherwise hold or drop it: found by the bot).
- She already holds the tablet: he comes himself instead of the sedan (the Kính sự phòng card is removed; the card says so); sending him away gives up that night (said on each card option).
- Thắp đèn hầu rượu → the normal night cards with the visit opening (no bath, no quilt) → nightFx (BAL.night) → on top: Sủng +3, Danh +3, every consort ghen +6,
  the consort whose tablet he left ghen +15 and quý ngươi −8, Hoàng hậu quý ngươi −3, Thái hậu displeased at 25 + 15 × archetype.neg %
  (Từ ái 25, Sùng Phật 40, Đa nghi / Quyền uy 55, Nghiêm khắc 70), Thái hậu quý ngươi −4 (−6 when she values Lễ). "Sáng hôm sau" card lists the true numbers.
- Khuyên ngài giữ long thể: Đức +3, Thái hậu +2, Sủng −1. Phô tài: unchanged numbers, now from BAL.visit.show.
- Gain and loss: the visit road gains more than a tablet night, pays in jealousy / Hoàng hậu / possibly Thái hậu; the advice road gains Đức + Thái hậu, loses Sủng and the night.

## Co-op (who hosts the visit, guest sees it)
Only the host rolls (world person), for both seats (her and the friend entry), one visit a day; result in `S.emp.visit = {w, pid, nm}` (emp is a world key).
The visited seat plays the card (the guest when the merged week arrives — one sync step later, by design of the week merge); the other seat gets the
news line "Đêm qua Hoàng thượng ngự giá đến cung <tên>, nghỉ lại đến sáng." Not covered by an automated two-browser test (see tests).

## Measures (dev/test/emperor-visit.js, real endTurn days, Sủng held, 4 lives × 4 years per level; before = old rule, 4 × 3)
| Sủng | visits / year BEFORE | visits / year AFTER |
|---|---|---|
| 10 | 0 | 0 |
| 20 | 0 | 0 (formula ≈ 0.2) |
| 40 | 0.17 | 0.53 |
| 60 | 0.17 | 0.84 |
| 80 | 0.52 | 1.19 |
| 100 | 0.17 | 1.47 |
Before: flat and random (pool luck). After: rare, rising with favour. Thái hậu displeased, measured for a Từ ái Thái hậu: 0–15 % per visit (formula 25 %);
other archetypes by formula above. Flow: Sủng +11 total on a visit night (night 8 + visit 3), Danh +3, left consort ghen +29 (15 + 6 + night 8), Hoàng hậu −3; advice Đức +3, Thái hậu +2.

## Tests
- `node dev/test/emperor-visit.js 4 4`: PASS, 0 page errors (flow, safe road, gates pregnant / gap, empnight not in the pool).
- Screens: the visit card at 1366x1024, 1000x755, 844x390 and the morning card at 755x1000 / 1180x820 looked at: kit event card (banner "Hoàng thượng ngự giá",
  hint + risk chips), kit news card; no overflow, 0 page errors. (Getting the card on top at 755x1000 / 1180x820 through a real day was blocked by other start-of-day overlays in the harness; the card itself was rendered there via showModal.)
- `dev/test/coop-e2e.js`: 59/59 passed, 0 page errors (fold / ipad / solo).

## KIT REQUEST / ART NEEDED / notes for the coordinator
- KIT: none new. The OD:L1261 "scene ends with a button" kit part is not built yet (#22): the morning card carries `btn:"Đã hiểu"` but the current kit news card closes with ✕.
- ART NEEDED: a banner for "Sáng hôm sau" (the Emperor leaving her palace at dawn); today the kit falls back to a generic picture.
- Found, not fixed (outside this task): j8 `nx()` night-talk lines print fixed "Sủng +5, Ân tình +5 / Sủng +3, Ân tình +2" while nightFx gives
  BAL.night.sung + s/2 and BAL.night.an + s (s = prep + talk + mood + luck): the shown number is not the applied number (ONE CORE / true text). Needs a family fix of the night cards.
- j72 favour call "Hoàng thượng nhớ ơn, ghé cung ngươi" (sung 3, an 2) still typed in q72CallFx with the rest of the favour table — left to its owner.
- Poison roads (OD:L602): not built; parked by Foreman D s4.

~85% xong / ~75% chơi được (visit feature)
