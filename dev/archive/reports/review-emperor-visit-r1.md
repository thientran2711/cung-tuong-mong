PASS b2e34df7b521f3bc63fc53b72af8c2df91e0ca60

# Review r1 — review/emperor-visit @16a2d41ed7743fae83d9fea6a7fd4df95cb063dd (D8 VISIT half, owner OD:L603 item 6)

Reviewer session_01DgYSWoamKdMf5ewt8WHax6 (opus) for Foreman D. START_CTX ~12 % (estimate). Branch `review/emperor-visit-r1` = the worker's branch + origin/main (73c06812) + reviewer fixes; site rebuilt (assemble.py + build_site.sh). PASS sha has origin/main as ancestor (fast-forward).

## Ship order
review/mortality-r1 (the worker's base) is already on main (cab4a766), so there is no dependency left: ship review/emperor-visit-r1 alone. Merges: b85cdb1e then e9c6021d, then 73c06812 (conflicts only in jbal2.js — kept BAL.visit/BAL.night beside main's BAL.psk / BAL.mem — assemble.py — main's list + jvisit.js last — and generated index.html / sw.js / assets.json, rebuilt).

## Checks
| check | result |
|---|---|
| one event only (PRIORITY RULE #1) | OK — j7 `empnight` extended, taken out of the generic pool, daily host roll in jvisit; the j24 tea visit kept as is (reads BAL.visit.tea) |
| ONE CORE (OD:L1267) | OK after fix — BAL.visit + BAL.night; reviewer moved the last typed night numbers (j75 rivalNight 3/2, j79 stealX 3/2/22, j8 nx 5/5/3/2) onto BAL.night through one function |
| gain-and-loss shown = applied (OD:L908) | FIXED (family, below). Visit card ĐƯỢC/KÈM = BAL.visit values applied in visAfter; night card rows are real before → after |
| co-op host-only roll, visited seat plays, other gets news | OK by code (host() + S.emp.visit world key; coopSeen on the guest). coop-e2e 59/59, coop-night 105/105, 0 page errors |
| one night per day | OK — ntOther()/ntTake via nightScene; the "Thắp đèn" lock reads the taken night |
| kit only / KIT §81 scene end | FIXED — see 2 below. Visit card = kit event card (act cards, hint + risk chips, banner art "Hoàng thượng ngự giá") |
| VANPHONG | OK — no %, ladder words; tea visit lost its banned "Chắc chắn"; side chances use the game's chanceW wording |
| old saves | OK — all new fields optional (S.visW, visN, visMorn, visNight, visLost, visQ, S.emp.visit); coop-e2e old-save step passes |

## Reviewer fixes on review/emperor-visit-r1
1. FAMILY "shown ≠ applied" (LUẬT SỬA CẢ NHÓM): the night's gains now come from ONE function `nightGain(s)` (j8, BAL.night), used by every night of the game:
   | place | before | after |
   |---|---|---|
   | j8 nx() night-talk line (4 options) | typed "thành: Sủng +5, Ân tình +5 · hỏng: Sủng +3, Ân tình +2" whatever the night | real best / worst of this talk: nightGain(q+fit+mood+2) / nightGain(q+fit+mood [−2 if an over-rank piece is worn]); e.g. mood bình thường, q 2: fit −1 → +5/+5 · +4/+3; fit 3 → +7/+9 · +6/+7 |
   | j8 nightFx (her night) | BAL.night inline | nightGain(s) |
   | j75 rivalNight (NPC night, "same formula as hers") | typed 3 / 2 | nightGain(sc) |
   | j79 stealX (Tranh sủng / Chặn ngự giá line) | typed "Sủng +3, Ân tình +2 trở lên", reward chance 22 | nightGain(0) floor, chance BAL.night.bestow + bestowS × stealS |
   Test 1b in dev/test/emperor-visit.js: every mood × q {1,2,4} × fit {−1,0,1,3}: the line's numbers == what nightFx applies at both ends.
2. Morning card: on main every bedding night already ends with the night's closing card (jne kitNightEnd, KIT §62, its own kit button — counts as §81). The worker's separate "Sáng hôm sau" modal was a second result card, drawn UNDER that scene and closed by ✕ (KIT 32.10). Removed; the visit extras are applied inside nightFx, so the night card's Được / Mất / Kèm rows show them (screens: Sủng 55→64, Danh +3, Ân tình +9, Mất Hoàng hậu −3, the left consort −8, Thái hậu −6, Kèm phi tần ghen). The card carries the visit caption "Hoàng thượng nghỉ lại tới sáng mới lên triều; cả hậu cung đều hay." through one data hook (`window.kneLineHook` in jne; no new visual part). Sổ ghi keeps the full visit line.
3. dev/test/cycle.js FAILED on the branch ("empnight not locked"): jvisit replaced the "Thắp đèn hầu rượu" lock and dropped jcycle's monthly-days lock. Fixed: the earlier lock is kept; the daily roll also skips her while her tablet is put away (cyTray). cycle: ALL OK after.

## Tests (one at a time)
| test | result |
|---|---|
| dev/test/emperor-visit.js (flow, safe road, gates, pool, 1b nx shown == applied, bot) | PASS 6/6 runs on the final build, 0 page errors (test-only fixes: the forced visit used base 100, so a lạnh lùng Emperor (×0.5) made it a coin toss; forced cases run outside her monthly days; the gate case restores cap; Sủng compared through sg()) |
| dev/test/cycle.js (6 viewports + logic) | FAIL on the worker's branch ("empnight not locked") → ALL OK after fix 3 |
| dev/test/night-day.js | runs, 0 page errors; steal / road / ksp nights end the day |
| dev/test/coop-e2e.js (live Worker) | 59/59 on the first merge; final build 59/59, 57/59, 59/60, 57/59, 59/59 — misses are "A frozen when B left" (Worker kept B online 90 s after its page closed; presence log shows b online every 20 s) and "#next enabled" once; main alone 3/3 clean in the same hour. No visit / night code runs in those steps. Treated as Worker stale-timing flake — coordinator: watch it |
| dev/test/coop-night.js | 105/105, 0 page errors |

## Screens looked at (755x1000@2, 1180x820@2)
Visit card (kit event card, 3 roads, Phô tài cost Sức −5, safe road chip "an toàn"), visit night card (own opening, no quilt/prep), night2, the night closing card with the visit caption + real rows + kit button "Tiếp tục". No overflow, 0 page errors.

## Notes for the coordinator (not blocking this branch)
- FAMILY follow-up (LUẬT SỬA CẢ NHÓM, needs a worker): `ghenAll(n)` (j1) applies n × 1.5 when the Emperor is đa tình, but ~25 texts print "ghen +n" (j2, j7, j68e, j68g, j75, jexam, jvisit…). Shown ≠ applied when he is đa tình. Fix in one place: a `ghenN(n)` helper used by ghenAll and every text.
- MAIN (jne, KIT §62): with reduced motion the night card's rows + button stay hidden (no km-done) until the player taps the picture; and the night card plays over open modals (e.g. "Thánh thượng ban thưởng"). Seen on a normal tablet night too, so not from this branch.
- Bot (perYear by Sủng, 3 lives × 3 years): visits per year, BEFORE (old pool rule): Sủng 10: 0 · 20: 0 · 40: 0.11 · 60: 0.25 · 80: 0.11 · 100: 0.44; AFTER: 0 · 0 · 1.11 · 1.0 · 0.89 · 1.57 (small sample; the worker's bot ran with cap 6 by a test slip, now 8). Rare, rises with favour.
- ART NEEDED: none (the morning card is gone; the visit card uses the existing banner).
