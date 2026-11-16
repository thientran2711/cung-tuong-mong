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


## 5. SUCCESSOR (worker session_01UV1Szj7YLUcLKMH5ncGTcL, coordinator MAIN s23 session_01UV1SziE5Dau1pVrytppq81)
START_CTX ≈ 5 % of 1M (get_session reads 0; own estimate). Rules read: START_CORE, START_WORKER, OD "(16/11 19:45Z, s22 chat) OWNER (night result timing" and "(16/11 ~20:32Z real, s23 chat) OWNER RULE (CO-OP FIRST" verbatim.

### 5.0 STEP 0 — merge origin/main 392fff60
Conflicts: assemble.py (= main's list + 'jnf.js' last), jbal2.js (main's BAL.led block kept; BAL.steal from main = night-steal-r2), night-steal-unit.js (main's r2 reset kept), generated index.html / sw.js / assets.json (rebuilt with dev/site/build_site.sh). jsteal.js on main = night-steal-r2; its flip wrapper still skips the palace flip when nfOn() (jsteal.js:59, the only line this branch changes there).

### 5.1 STEP 1 — MULTI-STEAL (jnf.js §2b)
| rule | how |
|---|---|
| every try of the evening is RECORDED, cost paid at the act | her deck cards (runOpt wrapper: cost via runOpt, odds = the card's shown odds incl. lotB, no roll), ACT steal/road of the social menu and any NPC agent act (stealNight wrapper: ntCan + cycle tray checks, one try each (S.ntTry mark, same format as j75 ntTry), cost = stealCost(mode)). List S.nfA {d, L:[{w, mode, o, q}]} |
| resolved ONCE at the commit | `steals()` → `window.stealPass(holder,{live:true})` = stealPassNF: the evening list + the NPCs' own last tries (jsteal stealWant / stealEligible, at most BAL.steal.maxTry NPC tries) → nfResolve |
| winner | every try rolls its own odds (r = 0..100); success = r < o; winner = success with the largest margin o − r; tie → higher Sủng, then the earlier try |
| others | failure result of stealNight: Sủng −BAL.steal.failSung, line "X định giành đêm của Y nhưng Hoàng thượng không động lòng. Sủng -n." |
| winner effects | stealWin (BAL.steal.rel oán / BAL.steal.ghen vs the holder), j75 ntTake, nightWhy.cause = "stolen"; her night lost → Kính sự phòng notice |
| two-way | NPC vs NPC uses the same resolve; ledger nights call stealPass(holder,{live:false}) → lines only, the evening list untouched |
| numbers | only BAL.steal + oSteal; no new constants |
Found on main (not fixed here, outside scope): j75's deck wrapper only decorates steal cards with `a.b===2`, but j2 now deals them with `b:B4L` → j75's card lock / reason text never applies. jnf's runOpt wrapper detects the cards by name + b===B4L and refuses a 2nd try (no second cost), so the rule holds; the card is not greyed out.

### 5.2 STEP 2 — co-op
- Host gate stays ONE function `host()` (jnf §0). review/coop-one-world (worldOn()) is NOT on origin; asked worker session_01UV1Szj18sSZbfw4DZWoqJh for the name/semantics. Swap = one line.
- Guest's try: recorded locally (cost, one-try mark) and sent to the host on `act` {k:"ctm-nf", mode:"g", att:{mode,o}}; the host records it for the friend entry (never takes the guest's hold from that message). The host resolves; the fin message carries `gres` {won, mode} for the friend; the guest applies its own Sủng loss / win line once (S.nfR).
- FIX (coop-night case 3 regression vs main): the room's night `go` runs nextBuoi once; when the commit held (a notice, her night dialogs) the seat sat in tối forever (jnight nightEnd → nightReady only). jnf now keeps RR = the day still to commit and re-runs the night step through COOPW.allowN once no dialog is open (guest: after the host's fin).

### 5.3 Tests (build of the last commit)
| test | result |
|---|---|
| night-multi.js NEW (records at the act · largest margin · tie → Sủng · full tie → earlier · NPC vs NPC · ledger pass) | 6/6 PASS, 0 page errors |
| night-final.js | 6/6 PASS (case 1 now stubs NPC wants: timing only). Rare FAIL of case 5 (1 in ~12): her cycle (jcycle "khai man") takes the night — game rule, not this code |
| night-day.js | ok:true 3/4 runs; ksp fixed (test now marks today's tablet turned). "road" misses ~1 in 5 on the base build too (pre-existing) |
| night-steal-unit.js | 29/29 ×3 (her steal case adapted to record + commit) |
| log-sync-night.js | PASS |
| night-steal-oldsave.js (old = origin/main) | loads, same name, 6 steal tries, 0 errors; the script prints FAIL only because it still expects the OLD build to have no BAL.steal (main has it since night-steal-r2) |
| cardflip.js 755x1000, 412x1058, 1180x820, 1366x1024 @2 | 0 page errors, no h-scroll, old save ok |
| coop-e2e.js (live Worker) | 59/59 on the last build (first run before the RR fix 57/59: the known "A frozen when B left" flake, same on plain main per reports coop-name-mask / review-schedules3-r5) |
| coop-night.js (live Worker) | 101/105 after the RR fix = exactly main's own result (baseline run on origin/main 392fff60: 101/105, the same 4 "host sees the wait" misses in cases 7/9/10/13). Before the fix: case 3 FAILED once (both seats stuck in tối after the host's held commit); main passes case 3 |

### 5.4 Not done
- STEP 4 (10-night ledger V3-B hooks the same commit) NOT started — context budget. stealPassNF already takes {live:false} (lines only), so the ledger wrapper only has to call window.stealPass(holder,{live:false}) per non-played night.
- A dedicated two-seat test of a guest Tranh sủng resolved on the host (att → gres) is not written; covered by code reading only.


## 6. WORKER s25 (session_01UV1SzmDJB3ATP9ffVSmFoc, coordinator MAIN s25 session_01UV1SziKxSHwSbnqfZWF5mM)
START_CTX ≈ 4 % of 1M (own estimate). Rules read: PREAMBLE, START_CORE, START_WORKER, OD last 4 lines verbatim (22:00Z, 22:10Z, 22:25Z canon overwrite of 22:14Z/22:17Z), OD 20:58Z card-flip bug, OD 20:32Z co-op first.
RULE USED: the 22:25Z CANON OVERWRITE (the brief's "resolve once at the end of the 4th khắc" was the overwritten 22:14Z text; told MAIN at start).

### 6.0 STEP 0 — merge origin/main f1509d7c
assemble order = main + `'jeitem.js','jnf.js','jcoopone.js','jlag2.js'`; jnf `host()` = `window.worldOn()` when present (coop-one-world), else seat a. review/flip-entry's jfe.js is NOT on main (nothing to delete). Generated files rebuilt.

### 6.1 Night rule (jnf.js §2b, OD 22:25Z + 22:10Z + 22:17Z)
| rule | how |
|---|---|
| flip at the start of tối names the intended one | unchanged (§1) |
| a try (her card, ACT menu, the co-op friend, an NPC agent) belongs to the khắc it is made in; cost paid then; one try a night (j75 ntTry) | `myTry` / stealNight wrapper → S.nfA {d, L:[{w,mode,o,k,npc}], K, gU, n} |
| khắc k resolves ONCE as soon as every PLAYER had khắc k | `pump()`: single player = at once when she presses; co-op = on the host when both seats passed k (guest sends its khắc `{u}` on render; "Sẵn sàng" = all 4) |
| players' tries of k: one roll each vs own odds; one success wins; several → higher Sủng; equal → fair seeded roll (FNV of day+khắc+sorted ids, same on any seat, order-free) | `nfResolve` + `seedPick`; "largest margin" and "earlier try" REMOVED |
| NPC tries of k only AFTER the players of k | `npcTries`: agents' acts made in k + jsteal agent choice now (stealWant's night chance spread over 4 khắc: 1−(1−p)^¼), ≤ BAL.steal.maxTry a night; same tie rule |
| her WIN → sequence now, day ends | `herWin`: summons "Kính sự phòng báo tin" (ev-ksp art, eunuch) → prep (bath, makeup; ev-prep) → night1 (to the Emperor) → night2 (talk; ev-night2-*) → night-end card (curtain picture, jne §62) → jnight ends the day. All existing scenes/kit parts; no new art |
| her FAIL | Sủng −BAL.steal.failSung, she plays on; the deck card now shows its lock + reason (STEP 4) |
| success that lost the tie | no Sủng loss; line "X cũng mời được Hoàng thượng, nhưng ngài chọn sang cung Y" |
| nobody wins | the intended consort's night at the end of tối (her held summons plays then; NPC = rivalNight at endTurn) |
| his own visit "Thắp đèn hầu rượu" | decided + played at once (as a won night) |
| co-op | guest try → `{att:{mode,o,k}}` to host; host resolves; `gres` list back (per khắc, applied once: S.nfR); guest win → guest plays her own night (herWin); host win → host plays its own |
| ledger (not played nights) | `stealPass(holder,{live:false})` = one NPC batch, lines only (same tie rule) |
Numbers: only BAL.steal + oSteal; no new constants.

### 6.2 STEP 2 — no reward for speed / order: audit (whole game)
| place | before | now |
|---|---|---|
| night steals (jnf) | resolved at the commit; tie → earlier try; NPC agents could act at flip time | per khắc after her; tie → Sủng → seeded roll |
| jsteal flip pass (servant route / home route, !nfOn) | random order, "first win ends it" | `window.stealPass` = one batch, same tie rule |
| co-op last seat in the same week (jcoopworld seatWeek) | "the host keeps it" (seat order) | higher Sủng keeps it; equal → seeded roll (week+rank); each seat decides the same from merged data; text no longer says "trước" |
| jcoopworld night "first to press sat in the new day" | already fixed on main (nightReady gate) | — |
| other grep hits (first/earlier/trước/race/quota/đủ người) | Promise.race image loads, text only, NPC fillSeats by merit | not order/speed rules — nothing to fix |

### 6.3 STEP 4 — j75 steal card lock
j75 deck wrapper now matches `a.b===B4L` (was `===2`): the card greys out with "Đêm nay ngươi đã thử giành một lần rồi" / "Đêm nay Hoàng thượng đã ở cung X".

### 6.4 Tests (last build)
| test | result |
|---|---|
| night-multi.js (REWRITTEN for 22:25Z: win at once + sequence · fail at once + lock/reason · NPC only after her khắc · Sủng tie + seeded order-free · NPC↔NPC at the tick · ledger) | 6/6, 11 of 12 runs (the 1 early fail = her cycle tuần; fixture now skips cycle lives) |
| night-final.js (cases 2/4/5 updated: steal + his visit play at once; NPC takes her held night at a khắc) | 6/6 ×5 |
| night-steal-unit.js | 29/29 (×6; one run = page-load timeout) |
| night-day.js (won try plays at once, held summons at end of tối, stale) | ok |
| log-sync-night.js | PASS |
| cardflip.js 755x1000 + 1180x820 | PASS, 0 errors, old save ok |
| night-steal-oldsave.js | loads, 0 errors (prints FAIL only because it expects the OLD build to lack BAL.steal — known) |
| coop-night.js (live Worker) | 105/105 (main baseline 101/105) |
| coop-steal.js NEW (two seats: guest try resolved on host in the khắc both had; host gives the night to the friend; guest plays her own night; NPC none · same-khắc tie → higher Sủng) | see §6.5 |
| coop-e2e.js | see §6.5 |
| quickcheck.sh | PASS (open 1257 ms, old save ok, perf ≈ live) |
Shots (scratch, not in git): Fold 755x1000 + iPad 1180x820 — flip at tối, summons, prep, night, night-end curtain, next day. Looked at: all kit dialogs, no overflow.

### 6.5 Co-op results + status
| test | result |
|---|---|
| coop-steal.js NEW (live Worker) | 20/20 on the last build (an earlier run 17/20: both test players were in their cycle tuần → their tries were refused by jcycle, a game rule; the test now marks lie=wk()) |
| coop-e2e.js (live Worker) | 59/59 |
| coop-night.js (live Worker) | 105/105 |

Branch review/night-final @ fdc9297b — SẴN SÀNG KIỂM.
Not done (context): STEP 5 10-night ledger — the hook is ready: per not-played night call `window.stealPass(holder,{live:false})` (one NPC batch, lines only, same tie rule).
Watch in review: (1) a co-op host's own try waits ("chờ Hoàng thượng định đoạt") until the guest has passed that khắc — by design (no speed reward); (2) the co-op seat rule change (jcoopworld seatWeek) touches promotions, not nights.
Save fields added: S.nfA now {d,L,K,gU,n}; S.nfR {d,k[]} (old saves: absent → rebuilt, harmless).

## 7. HANDOVER (s25 worker rolled over at START_CTX ≈ 4 % + 25 %; coordinator MAIN s26 opens the successor)
fdc9297b follows OD 22:25Z, which the owner REPLACED at 22:45Z (+ 22:50Z defence). Successor: read OD 22:45Z + 22:50Z lines VERBATIM, then rework review/night-final ON TOP of fdc9297b.
KEEP from fdc9297b: STEP0 merge (worldOn host gate), no-speed audit fixes (jcoopworld seatWeek, jsteal window.stealPass), j75 B4L card lock, `nfResolve` tie rule (one roll each; several → higher Sủng → `seedPick` seeded, order-free), `herWin` sequence (summons nfsum → prep → night1 → night2 → night-end card → day ends), co-op relay (send/apply/gres, nfSend hook), tests coop-steal/night-multi as templates.
CHANGE (jnf.js):
1. Flip moves from START of tối to the END of tối's 4th khắc (§1 nextBuoi hook → run at the endTurn commit, before the night). Tối keeps all 4 khắc.
2. Remove Tranh sủng / Chặn ngự giá from Hành sự / ACT lists (j2 deck cards b:B4L, ACT.steal/road, SOC) — they exist ONLY in the flip scene. Delete §2b khắc-tick path (`pump`, `npcTries`, `myTry`, stealNight/runOpt wrappers, render `tick`, spend LASTK) and the "held summons stolen later" path.
3. In the flip scene (jflip kitCardFlip, after the result): forced choice for every player — attackers: Tranh sủng / Chặn ngự giá / Thôi; the FLIPPED consort: Giữ chân Hoàng thượng / Thôi; 10 s countdown (timeout = Thôi; reuse kit §69 coop-timer if it fits, else KIT REQUEST); no khắc, no Sức/cost. Order of choosing must not matter. NPCs choose at the same moment (jsteal stealWant).
4. Resolve ONCE when all chose: defence roll first (success → every attacker drops one VANPHONG odds rung) → each attack rolls once → nfResolve tie rule → none = flipped keeps it. Held after attack → small Sủng gain; robbed → heavier oán (BAL).
5. ONE odds function (e.g. window.nfOdds(who,mode,ctx)) reading BAL.steal.* placeholders — numbers are tuned by the separate numbers worker on review/balance-core.
6. Co-op: host collects both seats' choices (guest sends {choice} on act ctm-nf), resolves, relays; each seat plays its own result in sync.
Tests to update: night-multi, night-final, night-day, night-steal-unit, cardflip (choice UI at 755x1000/1180x820), coop-steal (both seats choose in the scene), coop-night/coop-e2e baseline (105/105, 59/59 now), old save, quickcheck.
