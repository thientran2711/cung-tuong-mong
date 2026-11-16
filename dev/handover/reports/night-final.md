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

## 2. FIX (jnf.js, new module, loaded last; jsteal.js one line)
Base: origin/main 9fc1ac33 + review/night-steal-2 609c1bdd (merge c51bae6b: jbal2 both blocks, assemble = main list + jsteal after j75, site rebuilt).

| # | rule (OD 19:45Z / 14:00Z (4)) | how | file |
|---|---|---|---|
| 1 | flip at the START of tối, names only the intended one | `flip()` called before tối (endTurn's new day, start(), cycle answer) only marks S.nfP; entering tối (nextBuoi → buổi 3) runs it; the jflip card scene plays then. Night already settled (his visit / a won steal, j75 ntTaken) = no flip. Evening never reached (old save, skipped buổi) = flips at the day end before the commit | jnf.js §1 |
| 2 | evening open to everyone | the summons "Tắm gội chờ giá", a won Tranh sủng / Chặn ngự giá and his own visit "Thắp đèn hầu rượu" only make her the HOLDER (S.tonight="me"); a summons can still be stolen during the evening; a won steal / his visit settles it (S.ntk). Her steal cards appear only once a card is turned (tối) | jnf.js §2 |
| 3 | ONE commit at 'Sang ngày mới', exactly ONE woman | first press of the day: (a) flip if the evening never ran; (b) NPC last tries = jsteal stealPass(live) — moved off the flip (jsteal.js:59 skips the palace flip now) so her khắc come first; (c) she holds → her night dialogs play NOW (prep → night1 → night2 → nightFx = Sổ ghi, nights/nightLog, Sủng/Ân, conception), jnight then ends the day; (d) else resolveTonight → rivalNight(holder). A notice (her night lost) is read first, then the press goes on | jnf.js §3 |
| 4 | loser: no night record | nobody else's nights/nightLog is touched; the steal's oán / ghen / thiện cảm (stealWin + BAL.steal) is the only trace. Record line for a thief now reads "Đêm qua Hoàng thượng được mời sang cung X" (was "thẻ bài của X được lật") | jnf.js §3 |
| 5 | co-op host-authoritative | the guest never flips; host's flip (friend included) + every holder change is relayed on `act` {k:"ctm-nf"}; guest's own changes (steal win, summons accepted / declined, given to the maid) go to the host; at the commit the host runs the NPC tries and sends `fin` first; the guest's commit waits for `fin`; each seat commits only ITS OWN night (host never rivalNight(friend), guest never rivalNight(NPC/host)) | jnf.js §4 |

Not changed (one record already, decided by her at the moment): "Tiến cử <maid> hầu thay" (sendMaid: the maid serves at once). Servant route (j42) and the home route (jkc): their own week, flip unchanged (no player night there). Co-op guest: the cycle question of the flip is not asked on the guest seat (the host's tray has no cycle data of the friend) — follow-up.
Save: new fields S.nfP / nfF / nfC / nfN / nfFin / nfW (small numbers); old saves: a morning-flipped pick of that day is kept (S.nightWhy of the day = flipped).

## 3. Tests
| test | result (build of the last commit) |
|---|---|
| `dev/test/night-final.js` NEW (flip at tối + her night spent once at day end · her steal = one record, A none · NPC↔NPC steal: thief only, true Sổ ghi line · NPC takes her held night at the commit · his own visit settled, spent once · invariant: ≤ 1 night record per day over 40 played days) | 6/6 PASS, 0 page errors |
| `dev/test/night-steal-unit.js` (review/night-steal-2) | adapted: the flip→stolen check now runs the day-end commit; reset avoids her cycle tuần. 27-29/29; the remaining random FAILs ("…NPC paid the player's cost", "at most maxTry", "HER Tranh sủng", oSteal 95 rolls) are pre-existing flakiness — the base build 609c1bdd shows the same (1 FAIL in 3 runs) |
| `dev/test/night-day.js` | adapted to the rule (win/accept = HOLD; the night plays at "Sang ngày mới", then the next morning; "morning" win does not end the day): steal/road/morning/stale PASS; ksp re-run after the stub (NPC last tries are stubbed in this test) — see handover |
| `dev/test/log-sync-night.js` | 4/4 PASS |
| `dev/test/coop-e2e.js` (live Worker) | RUNNING at hand-over — successor re-runs |
| `dev/test/coop-night.js`, `dev/test/cardflip.js`, old save | NOT RUN yet — successor |

Fix found by night-day: a night started inside endTurn must show its modal after the nextBuoi wrappers (showSoon) and must not leave used ≥ 4 (j6 auto "Sang ngày mới" between dialogs).

## 4. HANDOVER (worker rolled over at START_CTX 4 % + 25 %; coordinator opens the successor)
Branch review/night-final (worktree was /home/user/wt/night-final, sparse). Last commit = see `git log -1 origin/review/night-final`.
Successor steps:
1. Build: `bash dev/site/build_site.sh`; serve the worktree root on a free port (python3 -m http.server).
2. Re-run: `node dev/test/night-final.js <url>` (expect 6/6), `node dev/test/night-day.js <url>` (expect ok:true; ksp case was fixed by stubbing stealPass just before hand-over, not re-run), `node dev/test/night-steal-unit.js index.html`.
3. Co-op (live Worker): `node dev/test/coop-e2e.js <outdir>` and `node dev/test/coop-night.js <outdir>`. Risk to watch: the guest's day-end commit waits for the host's `fin` (jnf.js §4: guest endTurn → hold() until a {k:"ctm-nf",fin:1} arrives, then COOPW.allowN + nextBuoi). If a run hangs at the guest's "Sang ngày mới", check COOPW.tr / nfDebug() on both seats. Also check: the host's flip now includes the friend card (jflip deck), the guest gets the ksp card when the host's Emperor picks her.
4. `node dev/test/cardflip.js <url> <outdir> 755x1000,1180x820,1366x1024,844x390 2 few` (the scene now plays at the start of tối) + old save: `node dev/test/night-steal-oldsave.js _old.html index.html` (_old.html = `git show origin/main:index.html`, served from the worktree root, not committed).
5. Shots 755x1000 + 1180x820 of the tối flip + the night at "Sang ngày mới" (scratch only, never in git).
6. Report SẴN SÀNG KIỂM <sha> to MAIN s22 (session_01UV1SzjhT28XQmRt2EHNffg), BIG (owner rule + co-op).

