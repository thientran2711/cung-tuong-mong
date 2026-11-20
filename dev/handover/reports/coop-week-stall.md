# coop-week-stall — worker session_01N1tNP6if7E7NXcFKwJ6yR5 (opus), depth 3, START_CTX ≈ 3 % (used_tokens reads 0; own estimate)
PRIORITY #1 CHECK ('week stall'): OD 0 | ledger 0 | claims 2 (none open for this signature) | main 1 (jcoopworld room handler / sendMe) | review/* 0 | archive 6 — G #7 (review/coop-thin-g) confirmed its night stall is a different signature (test bot).

Branch **review/coop-week-stall @ 2cd0e0f1 (code tip 4f50b6db + index/sw rebuild)** = LIVE origin/main 548dcd0d + 4 fix commits. Files: dev/build/jcoop.js, dev/build/jcoopworld.js (+ dev/test/coop-bot-x.js, index.html/sw.js rebuilt). **jcoophl.js NOT touched** → independent of review/coop-host-lag-r1 fe7297f6; any land order (no shared hunks; jcoopworld hunks are in sendEnd, sendMe tail, the room handler and next to cyFree).

## Root cause (there were TWO; the "late room snapshot" was not one of them)
The "seat steps back to buổi 1" in the dumps is the NORMAL night: endTurn turns S.buoi 3 → 0 before the merged week arrives (my watcher logged it on every week of every run). No frame reorder was ever seen (instrumented rx, 0 in ~45 runs).
1. **THIN ≥ 5 (coop-bot THIN=9):** both seats run their night at the host's go; her week end goes out at once (her Q empty). The HOST's week draw then asks her maid's Kỳ nguyệt sự card in her context (E-fix cyAsk on host, CW.herCy) and holds his end for her answer (cyHold). The card reaches a seat that is already "waiting" (#next «Chờ hảo hữu…»); his end never goes; nothing times out (jcooptimer: a real choice is never made for her). Trace: host `cyHold 2`, pend, Q 0; guest sent = week, Q ["Kỳ nguyệt sự" thin card].
2. **Level 0 (coop-e2e), "after rebirth":** the guest died in her night (week end), was reborn (nlRun → attach → sendMe); sendMe voids her old end and resets the night gate (nrdy / ngoW = -1) and lands her new life in the room's buổi tối; the host's end is already out, but NOTHING looked at the gate again → her end never sent (fixE3 r9 "week 3 advanced", host modal «Hảo hữu vào cung»).

## Fix
| # | where | what |
|---|---|---|
| 1 | jcoopworld cyHer() in sendEnd | level ≥ 5, guest only: her week end waits until the HOST's end is out (COOP.state.ended[host]); released if his seat is empty or his person dead. His end never waits for hers → cannot turn around. A card he asks at his week end now reaches her while her end is still hers: she answers, his draw runs, his end goes, then hers (one presence later). r1/r2 tried "only in her cycle tuần" — missed, her phone still holds the old date there (host owns it). |
| 2 | jcoopworld sendMe tail | after a new life is in: nCheck() + soonEnd() once (existing rule: the friend's end = the host's commit → her night runs) |
| 3 | jcoop rx | frames handled one at a time in socket order (rxQ); frames of a replaced socket dropped (big gzip room/week/snap frames could otherwise land after the small frames behind them) |
| 4 | jcoopworld room handler | a snapshot whose world is older than its week number (C.week ≠ m.week: Worker built it across awaits while a merge landed) is never taken as base / catch-up; the onWeek catch-up never for a week behind the last merged one |

## Law 11 — every handler that applies a room / world snapshot or a week / buổi catch-up
| handler | can it put a seat behind what it sent / did? before | after |
|---|---|---|
| jcoop rx (all frames) | yes: async per frame, gzip frames overtaken; old-socket frames after the new room | ordered, old socket dropped |
| jcoopworld "room" → onWeek catch-up | guarded by wkIn (r7) only | + stale-world guard, never behind wkIn |
| jcoopworld "room" → base P/W | took any snapshot world | not when C.week ≠ m.week |
| jcoopworld syncRoom (buổi catch-up, re-end, rebend) | forward only / resend only | unchanged (ok) |
| jcoopworld onWeek ("week") | dup guard wkIn | unchanged (ok) |
| jcoopworld begin ("start") + CW.restore/snapLoad | own snapshot, refuses older than room | unchanged (ok) |
| jcoopworld onState ("state") | keeps own P | unchanged (ok) |
| jcoopworld sendMe (new life: gate reset, buổi = room's) | **yes: gate reset never re-checked (stall)** | nCheck once (fix 2) |
| jcoopworld rb (rbuoi/rweek from buoi/presence/room) | last writer; reorder could make it older | ordered (fix 3) |
| jcoopworld badbuoi catch-up | forward only | ok |
| jcoopthin snap / delta | versioned; snap could overwrite a newer view on reorder | ordered (fix 3) |
| jcoopthine gView "adopt" (her buổi := host's) | host-authoritative by design, only with no pending patch | ok |
| jcoopthine/thinb/thinf/chat/timer "room" | reset local caches / clock only | ok |
| host-asked cards at his week end (cycle card, any part-D card from his endTurn) | **reach a seat already waiting (stall)** | her end waits for his (fix 1) |

## Tests (before = LIVE main, same machine, same load; "real stall" = no advance in 20 more bot steps / 90 s e2e wait)
| test | main (before) | fix (after) |
|---|---|---|
| coop-e2e (level 0) | 40 runs (20 plain + 12 instr + 8 COOP_RECONNECT): 0 stall | r2 build 23 runs: 1 stall (= cause 2, fixed in r4); **r4 build 20 runs: 0 stall** |
| coop-bot THIN=9, 4 w (coop-bot-x classifier) | 2/4 'stuck' (old bot); classified lanes: 15 runs, 11 'stuck' of which **1 real** (cause 1) + 10 slow-bot; paired 6 more: 1 slow-bot | r2: 8 runs, 1 real (cause 1 again → r3); **r3/r4: 8 runs, 0 real** (2 slow-bot recovered at step 4 / 0) |
| other e2e reds | Thái hậu picture (pool face) start/week 1, "friend starts as Người lạ" (td origin): same on main — not this lane | same |
| quickcheck | — | **PASS** (core gates PASS, old save ok, perf render 229/233, buổi 975/941). One loaded run had G4 coop-one-world seed 3 R.evm 1 under 4 parallel lanes; re-run alone 3/3 PASS, main 2/2 PASS (load flake) |
| role-parity | — | **ALL PASS** |
| outside/coop-home | — | **51/51** |
| coop-thin-e-net (level 5 net / ready resend) | — | **20/20** |
| one-core-guard / undef-scan | — | **PASS / PASS** (fails 0) |

Notes: the stock coop-bot's 120 s per week counts a slow bot as "stuck" (under 3–4 parallel lanes ~70 % of runs); dev/test/coop-bot-x.js adds 20 recovery steps + modal / overlay / tap probe so a real stall can be told apart. FOR B: the guest's end now goes one presence after the host's at level ≥ 5 (≈ 0.1–1 s); the merge needed both anyway.

Solo unchanged: every change is behind CW.on (co-op) — sendEnd/sendMe/room are co-op only, jcoop rx only runs with a socket; quickcheck old save + perf same as LIVE.
No UI, no number, no player word added (laws 4/7/9/10 untouched). No shots (no visual change).
