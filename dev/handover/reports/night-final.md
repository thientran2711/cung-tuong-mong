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

## 8. WORKER s26 (session_01UV1Szgug9twCetQq6poyGK, coordinator MAIN s26 session_01UV1SzhgCpEsPJSH8iUjGDU)
START_CTX ≈ 7 % of 1M (own estimate). Rules read: START_CORE, START_WORKER, WORKER_BRIEF, OD 22:10Z / 22:45Z / 22:50Z / 23:05Z verbatim, time-calendar.md, coop.md, KIT §69 + §81.
Branch review/night-final on top of fdc9297b: 8436bdc6 (rework) → 6391274b (site) → **fa660921** (pushed). NOT ready for review yet (co-op tests not run, 8.4).

### 8.1 What changed (OD 22:45Z FINAL + 22:50Z)
| rule | how | file |
|---|---|---|
| tối keeps 4 khắc; flip at the END of tối's 4th khắc | flip() before the commit only marks S.nfP; endTurn's first press of the day = realFlip (j8 → j75 → jflip scene) → S.nfX {st:"wait"}. His own visit (ntTaken) or her night already played today (S.nfN) = no flip, no choice. The old "flip at start of tối" nextBuoi hook is deleted | jnf §1, §3 |
| Tranh sủng / Chặn ngự giá in NO act list | j2 deal: both deck cards deleted; jnf §0: removed from RVGRP "Hại nặng" (person menu) and BANDS (NPC agent harm acts), ACT.steal/road.ok = false, SOC.steal off. The whole khắc-tick path deleted (pump, npcTries, myTry, stealNight/runOpt/spend wrappers, render tick, held-summons-stolen path) | j2.js, jnf §0 |
| forced choice after the flip result, 10 s, timeout = Thôi, no khắc/Sức/cost | jflip exports cfBusy() + cfShow(). jnf step(): no other dialog waiting → openChoice (holds back the flip's ksp summons until after the choice; NPCs choose NOW: npcAttackers = stealWant/stealEligible ≤ maxTry; flipped NPC keeps with keep.npcP) → after the scene ends: ONE kit dialog pid "nfch" (Kính sự phòng eunuch, option cards with odds word + gain/loss; attackers Tranh sủng / Chặn ngự giá / Thôi; the flipped Giữ chân Hoàng thượng / Thôi) + kit §69 kitCoopClock chip "Còn N giây" (ticks; found as #mb .kchips.kctm because the kit text pass drops wrapper ids). Countdown starts when on screen; 0 → Thôi | jnf §2b, jflip |
| resolve ONCE | resolveAll: defence roll first (success → every attack −1 rung, rungDown on word()'s own ladder) → nfResolve (one roll each; several → higher Sủng → seedPick) → none = flipped keeps. Defended + kept (≥1 attack) → Sủng +keep.gain; defended + robbed → oanAdd(holder, winner, keep.oan). Her win → herWin sequence; her own flipped night kept → ksp summons ("Tắm gội chờ giá" plays at once); NPC holder → rivalNight at endTurn | jnf |
| ONE odds function | window.nfOdds(who, mode, ctx): feign/road = oSteal; keep = odA(keep.base + Sủng×keep.sung + Sắc×keep.sac + mm()); ctx.down = rungs; ctx.adj = hook (monthly favoured art OD 23:05Z NOT built — not in §7; main told) | jnf |
| BAL placeholders | jbal2, own lines after BAL.steal, only if absent: BAL.steal.keep {base 40, sung .33, sac .1, npcP .85, gain 2, oan 10}, BAL.steal.choice {ms 10000, waitMs 90000}. Names sent to main for balance-core | jbal2.js |
| co-op host-authoritative | host: commit → realFlip → openChoice → {open, hold, nw}; waits for guest {ph:"ch"} (cap waitMs → Thôi); resolves; {fin, gres, gdef}. Guest never flips: open → cfShow() + own choice → ch; fin → own Sủng / herWin / defence gain / lost-night notice / ksp; then nextBuoi via allowN (RR). **Written, NOT run** | jnf §4 |
| ledger + servant/home routes | stealPassNF = npcAttackers + nfResolve, no cost | jnf |

### 8.2 Tests (fa660921, single player)
| test | result |
|---|---|
| night-final.js REWRITTEN (0 acts gone · 1 flip at end of tối, 4 khắc kept, her Giữ chân/Thôi, one record · 2 her Tranh sủng wins, summons, no cost · 3 NPC attack at the flip, true Sổ ghi line · 4 defence drops B 85→72 (Rất chắc→Chắc), B fails; Thôi → B wins + notice · 5 his visit: no choice, one record · 6 40 days ≤ 1 night/day · 7 non-bot: scene first, then dialog, §69 chip ticks, timeout = Thôi) | 8/8 PASS, 0 errors |
| night-steal-unit.js (flip case answers the choice; "NPC paid the cost" → "costs nothing") | 27/27 PASS |
| night-day.js (steal/road = nfResolve won result; ksp plays at once) | ok 2 of 4 runs; misses = "road" (pre-existing ~1/5 flake) |
| log-sync-night.js | PASS |
| night-multi.js | NOT UPDATED (tests the deleted khắc-tick path) — rewrite: Sủng tie, seedPick order-free, NPC↔NPC at the flip, ledger live:false |
| quickcheck.sh, cardflip.js | killed by the worker restart — re-run (quickcheck alone) |
| coop-steal / coop-night / coop-e2e (live Worker), night-steal-oldsave | NOT RUN — coop-steal must be rewritten for the flip choice on both seats |

### 8.3 For review
- Card-flip scene words unchanged (§81 "Chuẩn bị thị tẩm" + seal "THỊ TẨM" on HER) although she may still be robbed in the choice after — coordinator/kit keeper to decide.
- "Giữ chân Hoàng thượng" has no option picture of its own (dialog shows category art ev-tranh-sung) — possible ART REQUEST.
- The choice waits for the scene's end button (§81, no auto close); safety: opens anyway after 2×waitMs. A stuck kmPush queue / an open #dawn panel delays the scene (seen in tests only).
- j75 / jcycle deck wrappers for the deleted cards are dead code (harmless).

### 8.4 HANDOVER (rolled over at START_CTX 7 % + 25 %; the COORDINATOR opens the successor)
Worktree /home/user/wt/nf2 (sparse) on review/night-final @ fa660921; serve with `python3 -m http.server 8731` from it.
1. `bash dev/site/build_site.sh`; re-run night-final (8/8), night-steal-unit (27/27), night-day ×3, log-sync-night.
2. Rewrite night-multi.js and coop-steal.js for the flip choice; run coop-steal, coop-night (baseline 105/105), coop-e2e (59/59). Watch: guest gets {open} → scene + nfch; host waits for {ch}; fin → guest's own night.
3. cardflip.js 755x1000,1180x820 + old save; night-steal-oldsave.js; quickcheck.sh (alone).
4. Shots (scratch only) Fold 755x1000 + iPad 1180x820: flip scene → choice dialog with clock chip → night.
5. CLAIMS "SẴN SÀNG KIỂM <sha>" + send_message main s26. HOLD: no go-live until a reviewer passes it.

## 9. WORKER s26 #3 (session_01UV1SzhwBU5vBCvZomnavDM; coordinator MAIN s26 → s27 session_01UV1Szh248gDvHSAH88RvJm)
START_CTX ≈ 4 % of 1M (own estimate; get_session reads 0). Rolled over at ≈ 28 % (START + 25 %). Rules read: START_CORE, START_WORKER, WORKER_BRIEF, OD 22:10Z / 22:45Z / 22:50Z / 23:05Z verbatim, balance-core.md §3/§5/§6/§9, FOREMAN_D INBOX + night-time.md V3-B.
Branch review/night-final @ **a7dabd93** (pushed). NOT SẴN SÀNG KIỂM yet: co-op tests not green (9.4).

### 9.1 What changed
| item | how | file |
|---|---|---|
| (1) odds = balance-core API | merged review/balance-core 10fa43d4, then d24b9b03 (r2). nfOdds = `oSteal(a,mode)` / `oKeep(a)`; defence = jbalcore `rungDown(o, n × BAL.steal.keep.rung)` (own RUNG copy deleted); failure = `stealFail(a,t,mode)` (each mode's own loss BAL.steal.m[mode].lose; co-op friend's line via failTxt = same words, no ap); kept = `keepNoSteal` (keep.gain); robbed = `keepRobbed` (keep.oan). Card texts print fmt(stealLose(mode)), keep.rung, keep.gain. My placeholder BAL.steal.keep DELETED; only `BAL.steal.choice={ms,waitMs}` stays mine (jbal2, after the balance-core block); npcP is in balance-core's keep object | jnf.js, jbal2.js |
| (2) jfe.js deleted | merged review/flip-entry 32749179, `git rm dev/build/jfe.js`, not in assemble. jnf keeps the guarantees (flip only at the END of tối; none on new game / new life / load). flip-entry.js adapted: start of tối = no flip yet (nfP); end of tối = flip (nfF/nfX); walk = ONE synchronous step (the buổi clock auto-ended tối between async checks = false FAIL) | dev/test/flip-entry.js |
| BUG (whole family) | j79's stealX override ignored the mode: the "Chặn ngự giá" card showed Tranh sủng's prize and trace. Now each mode prints its own BAL.steal.m[mode].win + stealKem(v,mode) (with balance-core's nightG/nightA) | j79.js |
| tests | night-multi REWRITTEN (7: Sủng tie + seeded order-free · NPC vs NPC at the flip · stealFail per mode · nfOdds = oSteal/oKeep + rungDown · keepNoSteal / keepRobbed · cards print BAL numbers · ledger pass live:false). night-steal-unit: fresh tablet per try, no custom night. coop-steal REWRITTEN for the flip choice on both seats (guest Tranh sủng resolved on host · both attack, Sủng tie · guest flipped + Giữ chân vs host attack), both seats answer concurrently | dev/test/* |
| KIT REQUEST | Fold 755x1000: the flip-choice dialog puts the question + §69 clock chip AFTER the option cards (body 736 px in a 493 px box, chip at y 965 = off screen); iPad fine. Filed in dev/kit/KIT_REQUESTS.md (17/11, on the branch). No private CSS | KIT_REQUESTS.md |

### 9.2 Tests (a7dabd93 unless said)
| test | result |
|---|---|
| night-final.js | 8/8, 0 errors |
| night-multi.js | 7/7 (×3 before the r2 merge, ×1 on a7dabd93) |
| night-steal-unit.js | 29/29 |
| flip-entry.js 755x1000 | ALL OK (all origins, new life, load) |
| night-day.js, log-sync-night.js | ok ×2 / PASS (before the r2 merge) |
| cardflip.js 755x1000 + 1180x820 | 0 errors, no h-scroll, old save ok (before the r2 merge) |
| night-steal-oldsave.js | new build loads, 0 errors (prints FAIL only because the old build already has BAL.steal — known) |
| shots (scratch /home/user/wt/nf3-shots, not in git) | flip → choice (attacker + flipped) → summons, Fold + iPad: looked at; clock ticks; Fold clock off screen (KIT REQUEST) |
| coop-steal.js (live Worker) | NOT GREEN — 9.4 |
| coop-night, coop-e2e, quickcheck | NOT RUN |

### 9.3 Main s26 decisions (16/11 23:39Z) — NOT built yet
1. Card-flip scene: keep "Chuẩn bị thị tẩm", but the "THỊ TẨM" seal goes on her only AFTER the choice resolves and she kept the night (robbed → no seal; the winner gets it) — kit §81 part (jflip), whole family.
2. "Giữ chân Hoàng thượng" option picture: existing kitOptPic stand-in with the 'tạm' marker (main files the ART REQUEST).
3. Choice after the scene's end button; clock starts when shown; 2×waitMs safety — ALREADY so.

### 9.4 HANDOVER (the coordinator opens the successor)
Worktree /home/user/wt/nf3 (sparse) on review/night-final @ a7dabd93; serve `python3 -m http.server 8741` from it (night-steal-unit takes `index.html`, the others `http://localhost:8741/index.html`).
1. coop-steal: both seats reach tối, the host's flip + {open} work (the guest's choice reached the host in one run: x.fr "feign"), but in the last 3 runs both seats sat with the kit modal "Tâm trạng · Ta" (Q[0].t "Tâm trạng · Ngươi", no pid) OVER the card-flip scene (scene hidden, cfBusy true) → the choice never opens; the test's clear(o,1) does not close it. FIRST check by hand whether a player can answer that mood dialog; if not → real bug (a dialog queued by the commit blocks the scene and the choice). Then rerun `node dev/test/coop-steal.js <outdir>`.
2. coop-night.js (baseline 105/105) + coop-e2e.js (59/59) on the live Worker; quickcheck.sh alone.
3. Build 9.3 (1) seal after resolve (kit §81, jflip) and (2) kitOptPic 'tạm' for Giữ chân; rerun cardflip + night-final case 7.
4. Then SẴN SÀNG KIỂM to main s27. HOLD go-live until reviewed.
5. 10-night LEDGER (FOREMAN_D INBOX, spec reports/night-time.md V3-B) NOT started — best as its own branch review/night-ledger ON TOP of review/night-final. Notes: the spec's "at the START of tối" is superseded by OD 22:45Z → roll the ledger inside jnf realFlip (the commit at the end of tối); played tối = her first day else the first NPC day; the flip choice applies only to the played tối; extra days use `window.stealPass(holder,{live:false})` (lines only); cycle days exist (jcycle cyDaysM) but the length is fixed per person (cyBase l) — OD 19:05Z wants 5/6/7 rolled per woman per MONTH; Empress custom = j75 FAIRN.custom (a % on tuần 0/1 today) → days 1 and 15 by day; conception roll as a FLOAT × BAL.nt.concF (spec 7).

## 10. WORKER s27 #4 (session_01UV1SzjDo8ctqPbXDejtf2u; coordinator MAIN s27 session_01UV1Szh248gDvHSAH88RvJm)
START_CTX ≈ 3 % of 1M (own estimate; get_session reads 0). Rolled over at ≈ 28 % (START + 25 %). Read: brief night-final-s26b.md, OD from "(16/11 ~22:45Z real" to the end verbatim, §9.4, START_CORE, START_WORKER, KIT §81/§84, FOREMAN_D ledger INBOX + night-time.md V3-B.
Branch review/night-final @ **09c0f055** (pushed). NOT SẴN SÀNG KIỂM: coop-steal 14/23 and quickcheck G4 (10.3).

### 10.1 What changed
| item | how | file |
|---|---|---|
| merge live main 744b80e7 | conflicts: assemble (main's list − jfe.js + jbalcore/jnf after jgrey), j2 (balance-core artOE/artO + main's ghenN/BAL.ghen), j7 empnight (main's BAL.visit + artOE), j79 stealX (mode prize + main's nightGain/BAL.night.bestow), jbal2 (both blocks) | 8de9b81e |
| (a) "Tâm trạng" over the flip — ROOT FOUND | NOT a game queue bug: coop-steal's answer() clicked `.kmov.kcf [role=button]` = a mood seal img.kemo (role=button) → jevb emoBox("me") opened the kit look-up panel "Tâm trạng · Ta" (only ✕, which clear() never pressed). Proven with a click/stack probe. A real player's tap lands on the scene caption, and ✕ then shows the choice. Family fix anyway (no dialog may cover the flip choice): jnf window-capture guard — while the flip scene (cfBusy) or the choice is on screen, taps on look-up openers (img.kemo[data-emo], [data-emo-open], [data-svlook]) do nothing. Same family: jvisit (main) rolled his visit INSIDE flip() → "Ngự giá lâm cung" dialog between flip and choice; now the roll inside realFlip is only marked (S.nfVd) and runs in finish() after the resolve (night-final case 8). Test: answer() clicks real scene buttons only; clear() closes look-up panels with their ✕ | jnf.js, coop-steal.js |
| (b1) seal after resolve | jflip kitCardFlip `seal` option (false while the flip choice is pending = nfOn); result chip while pending "Thẻ bài của ngươi được lật. / Hoàng thượng chọn ngươi hầu đêm nay."; button stays "Chuẩn bị thị tẩm". `window.cfSeal()` = her card alone, final still + painted seal + "Đêm nay ngươi được thị tẩm." + ONE §81 button "Chuẩn bị thị tẩm", once a day (S.cfSl); jnf calls it in herWin (won, both seats), resolveAll (kept her own flipped night), guest fin (kept). Robbed → no seal (winner's seat stamps hers) | jflip.js, jnf.js |
| (b2) Giữ chân picture | jopic `KIT_OPT_TAM` (title → existing act picture) → kitOptPic returns tam:true → kpOptArt adds kitTam chip in .kaart; "Giữ chân Hoàng thượng" → act-thap-den-hau-ruou-h (looked at: lamp + wine, fits). KIT.md §84.4 "Wired" line updated. ART REQUEST = main's | jopic.js, KIT.md |
| (b3) 10 s from choice shown | already so (TM.start in showModal when nfch is on screen) | — |
| tests | night-final +case 8 (visit after resolve) +case 9 (no seal in scene, seal after keep); BAL.visit.cap=0 in night-final/night-multi/night-steal-unit (main's visit is not what they test; it gave her the night in night-multi 2/5 and nsu 11); night-steal-unit starts on a palace route (home route jkc has no flip choice — was a ~2/7 false FAIL) | dev/test/* |

### 10.2 Tests (09c0f055 / 0fe53e72)
| test | result |
|---|---|
| night-final.js | 10/10 (×2; case 7 once showed the Nhập cung card first = flake, passed on rerun) |
| night-multi.js | 7/7 (×2) |
| night-steal-unit.js | 29/29 (×11 after the palace-start fix) |
| flip-entry.js 755x1000 | ALL OK |
| quickcheck.sh | open/old save/perf PASS; **CORE GATE G4 50-coop-one-world FAIL "guest week changes the world"** — not checked whether main 744b80e7 fails it too |
| coop-steal.js (live Worker) | **14/23**: case 1 "both seats get the choice" now PASSES (the stuck is gone); remaining 10.3 |
| coop-night, coop-e2e, cardflip shots | NOT RUN |
| 10-night ledger | NOT STARTED (too big for the rest of this context; see 10.3 5) |

### 10.3 HANDOVER (the coordinator opens the successor)
Worktree /home/user/wt/nf4 (sparse) on review/night-final @ 09c0f055; serve `python3 -m http.server 8741` from it (night-steal-unit takes `index.html`, others `http://localhost:8741/index.html`). Scratch: /home/user/wt/nf4-out, /home/user/wt/nf4-dbg.
1. G4 first: `bash dev/tools/quickcheck.d/50-coop-one-world.sh` (details .quickcheck/gates/g4-50-coop-one-world.txt). Run the same gate on a main 744b80e7 worktree: if main fails too = pre-existing (tell main); if not, suspects: jnf visLate (finish → visRoll on the host only), the merge of jvisit/jseat.
2. coop-steal remaining fails: (i) case 1 host: `S.tonight` null while ntk.who = 902 (friend) — the host already ended the day (nfP of the next day), so the check `S.tonight.coop` is read too late (test timing) or the host's resolveTonight wrapper nulls it; guest had Q [nfsum, "Kính sự phòng"] and tonight null — check whether a host message after the commit (hold null, same d) overwrites the guest's "me" (apply sets S.tonight=dec(m.hold) on every host message of that day) → if so, the guest must keep "me" once nfFin of the day is applied (real bug: guest loses her won night). (ii) case 2/3: STUCK with #dawn (week panel) open and cfBusy true: jflip busy() waits for #dawn; answer() must close the dawn panel like a player (find its button), then recheck that the choice shows. (iii) case 3 guest x.st "open" but no nfch after 60 s: verify step() ticks on the guest (WT interval) and X() day match.
3. Then coop-night.js (baseline 105/105), coop-e2e.js (59/59; "A sees no friend at start" is pre-existing on main), cardflip.js + choice shots Fold 755x1000 + iPad 1180x820 (LOOK at the Giữ chân 'tạm' chip and the seal scene).
4. SẴN SÀNG KIỂM to main s27 when 1–3 are green; HOLD go-live until reviewed. KIT REQUEST Fold clock chip = review/kit-size-10 (keeper, SẴN SÀNG KIỂM 8ab00ede) — not mine to style.
5. 10-night LEDGER: own branch review/night-ledger ON TOP of review/night-final (spec reports/night-time.md V3-B + §9.4 5 notes): roll inside jnf realFlip (the commit at the end of tối), played tối = her first day else first NPC day, extra days via stealPass(holder,{live:false}), cycle 5/6/7 per woman per month (jcycle), Empress days 1 and 15, conception FLOAT × BAL.nt.concF, kit toast part via KIT REQUEST. Its own opus worker.
