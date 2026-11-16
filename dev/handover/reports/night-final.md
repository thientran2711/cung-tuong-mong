# night-final — when is the thị tẩm committed? (owner OD 16/11 19:45Z) — CHECK + FIX

Worker: opus, session_01UV1SziCQkwUnKFA7eL1uRp, coordinator MAIN s22. Branch `review/night-final` off origin/main 9fc1ac33.
START_CTX ≈ 4 % of 1M window (rollover at ≈ 29 %, ceiling 60 %).
Rules read: START_CORE, START_WORKER, OD last line (19:45Z), OD 14:00Z (4), 14:45Z, 18:55Z, OD:L1386 (NPC = agents).

## 1. FACTS on origin/main 9fc1ac33 (code + browser probe, 755x1000, single player)

Time model: one game "day" = one tuần turn with 4 buổi (jtime4.js:3, B4L = tối). "Sang ngày mới" at tối = `nextBuoi` → `endTurn()` (j9.js:138, j6.js:13).

### 1.1 The flip is NOT at the start of the evening
- `flip()` (j8.js:489) is called at the END of `endTurn()` (j3.js:99), i.e. right after "Sang ngày mới", so the new day starts at buổi SÁNG with tonight already decided; also at new life `start()` (j2.js:28), servant route (j42.js:188), kc home route (jkc.js:298), and again from jcycle's maid question (jcycle.js:115/141).
- Wrappers on flip: j75.js:197-200 (custom mùng 1/rằm → Hoàng hậu, writes `S.nightWhy` {pick, flip0, cause}), jcycle.js:92/141, j93.js:261, jflip.js:240 (card-flip scene from S.nightWhy, shown after the dawn panel).
- OD 14:00Z (4) "flip at the START of the evening" is therefore NOT built on main.

### 1.2 Who can change the night, and when
- Her: deck cards Tranh sủng / Chặn ngự giá (j8.js:126-127 ACT, j75.js:43-48 deck wrapper) usable in ANY buổi of the day while `tonightOf()` is an NPC; one try per night (j75 ntTry).
- NPCs: only INSIDE `flip()` (j8.js:492 `hostility>=50 && roll(6)`), i.e. instantly at flip time, never during the evening khắc. The weekly SOC.steal (j28/j75.js:37) runs in rivalsTurn = inside endTurn BEFORE the flip, when the night of the new day is not set yet → dead path.

### 1.3 When the night is COMMITTED (Sổ ghi line, Kính sự phòng record nights/nightLog, Sủng/Ân, conception roll, jealousy)
| holder | committed where | when |
|---|---|---|
| HER, card flipped | flip → `pushDil(mkP("ksp"))` (j8.js:493) → "Tắm gội chờ giá" → `nightScene` (j8.js:253, j75.js:52) → prep → night1 → night2 → `nightFx` (j8.js:275: S.nights++, S.nightLog.push, Sủng/Ân, ghenAll, `night(S)` conception) | IMMEDIATELY when she answers the dialog = buổi SÁNG; then jnight.js forces the rest of the day away (S.toMorning) |
| HER, steal won | `stealWin(S,t)` (j8.js:129) → `nightScene()` at once → same chain → nightFx | IMMEDIATELY at the steal (any buổi), day then ends |
| HER, Emperor's own visit (event "empnight", j7.js:49, "Thắp đèn hầu rượu") | nightScene → nightFx | immediately when the event fires |
| NPC | `resolveTonight()` (j8.js:494, j75.js:39 wrapper) → `rivalNight(v)` (j75.js:135: v.nights++, v.nightLog.push, Sủng/Ân, `night(v)` conception, reward roll, Sổ ghi line "Đêm qua thẻ bài của X được lật") | at the NEXT `endTurn()` (j3.js:90), i.e. at "Sang ngày mới" — for whoever S.tonight is at that moment |
| NPC (servant route / kc home) | j42.js:179 / jkc.js:289 → resolveTonight | same, at the day end |

### 1.4 Can ONE night record TWO women?
- **Single player: NO double record** (probe, 3 runs: A flipped → her steal wins → her nights 0→1, A 0→0 after the day end; NPC B steals A's night → B 0→1, A 0; B steals HER night (ksp still open) → B recorded, her ksp option is locked by j75 lockFirst). The night record is written once.
  - BUT her night is committed at the steal / in the MORNING, not at "kết thúc ngày" (breaks the 19:45Z rule); and NPCs can never take a night during the evening, so her early commit is never contested.
  - Wrong text: when an NPC wins by stealing, rivalNight still writes "Đêm qua thẻ bài của <thief> được lật" (j75.js:140) — the thief's card was NOT turned.
- **Co-op: YES, two (or more) women per night** (from code; jcoopworld.js:14, 67, 336-367). Each seat runs `endTurn()` locally (friend entry pulled out by `withoutFriend`), so EACH seat runs its own `flip()`: the host's Emperor turns one card among host+NPCs, the guest's Emperor another among guest+NPCs. `S.tonight` is a personal key (not in W_KEYS, jcoopworld.js:27), so each seat commits its own night: guest "me" → guest nightFx; host NPC A → host rivalNight(A); guest NPC B → guest rivalNight(B) and the 3-way merge ADDS both seats' `nights++`. The owner's "A and she both get it" is exactly this when she plays co-op (and in single player it is how it LOOKS: A's card result shown in the morning, then her night the same day).

### 1.5 Overlap: review/night-steal-2 (609c1bdd, SẴN SÀNG KIỂM ed6fcd05)
- Replaces j8 flip's `hostility>=50&&roll(6)` with `stealPass()` (jsteal.js) but still runs it INSIDE flip (instant at flip time). Same function as this fix → this branch is BASED ON review/night-steal-2 and moves stealPass to the evening / day end.

## 2. FIX — see §3 (written after the build)
