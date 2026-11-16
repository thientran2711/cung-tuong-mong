# Co-op contest / "same action by 2+ people" check (analyst, read-only)
Date 11/16/2026. Code: origin/main 9fc1ac33 (dev/build/j*.js, jcoop*.js, dev/coop/PROTOCOL.md). Not run live; verdicts from code reading, "not run" = unverified at runtime.

## Q1. Contest scoreboard: one shared board or two local ones?
**Answer: TWO SEPARATE local contests. The two players are NOT on one board. BROKEN vs owner law (one shared world, one podium).**
- Each client runs its own contest. Festival contest plan/state lives in `S.j71` (j71.js:13 `j7s()`), and `S.j71` is not in `W_KEYS` (jcoopworld.js:24), so it is personal, not shared.
- Entrants are picked locally: `fPP7` uses `R(1e6)` and `liveRivals(true)` (j71.js:147), luck uses `Math.random` (j71.js:93 `cScore7`; j82.js:65 `kg82NpcRaw`; j82.js:350 `kg82Shuf`). No seed shared, no host roll. Two clients get different entrants and different NPC scores for the same festival.
- The friend is only a simulated NPC-like rival entry (`buildFriend`, jcoopworld.js:50-54: `{id:901/902, coop:true, alive:true}` pushed into `rivals`), so `liveRivals`/`ents7`/`present7` can pick it. Its score is computed from its stats + random luck (j71.js:93, j82.js:350-353), NOT from what the real friend played. The friend's real mini-game score is never sent (PROTOCOL has no contest message; `grep contest|podium|startContest` in jcoop*.js = 0 hits).
- Podium (j90.js:41 `kitPodium`, wiring j90.js:96-100) just renders the local list. Result: you see yourself 1st, friend (simulated) 2nd; the friend, on her phone, sees herself 1st and you (simulated) 2nd. Different boards, can contradict.
- Prizes: `cFin7` (j71.js:~360) `ap(w,pz)` pays the winner entry locally; if the winner is an NPC or the friend entry, each client pays it. NPC numeric deltas ADD on merge (PROTOCOL.md:78), so the same NPC prize can be paid twice (once per client). Friend entry prizes are written back to `P[friend].S` (jcoopworld.js:195 area) so the real friend may also get a prize from MY simulated contest on top of her own: double/contradictory.
- Tranh ghế (queen/rank seat contest) same problem: `S.contest` (j34.js:9) is personal; `contestOpen` and `contestWeek` are NOT muted on the guest (only `rivalsTurn/rivalsMonth/festival`, jcoopworld.js:371). Both clients can each open and run it; friend is a scored NPC (j34.js:`runRound` skips only `p===S`). Both clients can crown their own player to the single Hoàng hậu seat (j34.js:44 `contestEnd`, `S.rank=7`). Not run; merge keeps `S.rank` per player, so two queens is plausible.
- Who computes: nobody centrally. Host-authoritative only for `where` and world events (PROTOCOL.md:13-15, 138). Contest has no host path.

## Q2. Other "same action by 2+ people at once" cases
| # | Case | Today | Verdict |
|---|------|-------|---------|
| 1 | Same festival/contest (above) | two local boards, simulated friend, double NPC prize | BROKEN |
| 2 | Tranh ghế / Hoàng hậu seat | per-client `S.contest`, both can win the same seat | BROKEN (not run) |
| 3 | Same NPC befriended / hated | attitude stored per player id (`rl/ro/gp[pid]`, jcoopworld.js:8-9, PROTOCOL.md:63-64) | OK |
| 4 | Same NPC accused / framed / harmed by both | numeric deltas add (PROTOCOL.md:78); non-numeric flags (dead, confined, rank): host wins (PROTOCOL.md:84). NPC AI never targets the friend (PROGRESS_coop.md:75) | UNDEFINED (a kill by guest vs host's survive resolves as host wins, no rule written) |
| 5 | Same item bought | items are in each player's own `S` (personal); no shared stock found in code | OK for normal items; UNDEFINED for unique/limited items and the same one-off Emperor gift to both |
| 6 | Same exam (palace khảo/tuyển) | `S.srv.ex` personal; NPC pass uses seeded rng (jexam.js:264-266, `s.coop`→true) | OK (each takes her own exam); but no shared "who ranks higher" board = same as Q1 |
| 7 | Same place/buổi event (who is where, who meets the Emperor) | host rolls `where`, relays to guest (PROTOCOL.md:138,150; jcoopworld.js:180-187) | OK |
| 8 | Same night with the Emperor | night gate syncs the day (jcoopworld.js:208-213, 336); who wins the Emperor each client rolls locally; no exclusivity rule found | UNDEFINED |
| 9 | Player-to-player acts (gift, harm) | relay `act/actr`, receiver applies, same odds as NPCs (PROTOCOL.md:140,155-168) | OK |
| 10 | New NPC/servant created by guest | goes through the host (PROTOCOL.md:87-105 `jcoopask.js`) | OK |
| 11 | Emperor death | muted in co-op (PROGRESS_coop.md:66,75) | OK (known limit) |

## Recommendation (two-way law: same rules for both players and NPCs)
1. **Contest = ONE shared scoreboard, host-authoritative.** Host fixes entrants (both players + NPCs), one shared seed for NPC luck, announces the contest to both. Each player plays her own mini-game; the guest sends her raw score (`act`-style message `{k:"cscore", id, raw}`) to the host; host ranks everyone with the same formula (j82 `finish`) and sends the ONE result list; both clients show the same podium and apply prizes only to herself. NPC prizes applied once, by the host.
2. Real friend never simulated as an NPC in a contest; if she skips, she is "absent" for both.
3. **Tranh ghế:** host-only (mute `contestOpen/contestWeek` on guest), friends both candidates when eligible, one winner decided by the host from both players' real round answers; guest gets the result via merge.
4. **Contested single resources** (one queen seat, one winner prize, unique items, Emperor's one night): host decides the single winner by the same rule as for NPCs; the loser gets the normal "lost" outcome. Write the rule once in dev/rules and BAL.
5. Fix-the-whole-group: audit every shared-event type (all `startContest` callers, exams, banquets, festivals) after item 1.
6. Case 4 (same NPC hit twice): host-authoritative order, second act sees the changed state (add a rule: resolve acts in `id` order through the host, not by merge).
