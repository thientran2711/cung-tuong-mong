# coop-stable — co-op test flakes: root causes + fixes (worker, opus, MAIN s25)

Worker session_01UV1SzgdVKpJMBjxefGgfEo. Date 11/16/2026. START_CTX ≈ 4 % of 1M (rollover ≈ 29 %, ceiling 60 %).
Branch **review/coop-stable @ 6696656e (commits af4301a5, cf6b3974, 6696656e)** (from origin/main f1509d7c; site rebuilt with dev/site/build_site.sh).
Rules read: PREAMBLE, START_CORE, START_WORKER, OD "(16/11 ~20:32Z … CO-OP FIRST" (co-op TOP; both read the same number), reports coop-one-world-r1 + fig-cutout-code-r2.

## Verdict on the flake
coop-e2e is NOT flaky on an idle box with the live Worker (main build: 3/3 = 59/59; coop-chat 55/55). It fails only when the box is
loaded (4 parallel e2e = 8 Chromium pages; 1–4 of 59 fail, a different step each run). Under load, timings stretch and sockets
reconnect, and that exposes **3 real co-op bugs (2 game client, 1 Worker) + 1 defensive gap + 1 test race**. Each was traced from
failure dumps added to the tests (socket log, COOPW.tr trace, room state), then proven before/after.

| # | failing step(s) seen | root cause | real or test | fix | proof |
|---|---|---|---|---|---|
| 1 | "A frozen when B left", "A cannot advance while frozen" (most common, ~40 % of loaded runs) | **Worker**: a socket the server closes (STALE alarm / replaced) stays in `getWebSockets()` until the peer answers the close frame. A peer gone without a TCP close (phone off the network, a proxy keeping the upstream open) never answers → `online(seat)` stays true for ever. The alarm re-closes it every 20 s and re-broadcasts presence saying she is ONLINE. Player effect: the friend never shows "Hảo hữu đang vắng"; the stayer's buổi / week waits on a ghost. | **REAL (server)** | coop/worker/src/index.js: `bury()` marks a closed socket `gone` in its attachment; `socks()` skips gone / CLOSING sockets; a buried socket's messages are ignored. | Probe (raw socket that stops reading, LIVE Worker): presence says b online at 61 s, 81 s, 101 s, 121 s. Same probe on `wrangler dev --local`: old code = online for ever, new code = offline at 60 s. Unit test coop/worker/test/stale.test.mjs: old code FAIL "presence tells the host her friend is offline", new PASS (added to `npm test`). **NOT DEPLOYED — needs main s25's OK** (`cd coop/worker && npx wrangler deploy`). |
| 2 | "A sees the reborn friend by her new name"; seen as a 10-id divergence after every guest rebirth | **Client**: on rebirth `nlRun` builds a throwaway world while `CW.inLife` was still false. On the GUEST jcoopask's `newRival` wrapper then gave its ~10 consorts temp ids (1001…1010) as persons "she made"; `attach()`→`ser()` turned them into 10 new-consort requests (relayed to the host at once) and she kept them as ghost consorts the host never had. A reborn cung nữ could get one as mistress (mid 1008): the host's `RV(mid)` is null → the host never sees her. ONE-WORLD break. | **REAL (game)** | jcoopworld.js: nlRun (and the __nlInner start path) set `CW.inLife=true` BEFORE the throwaway world is built. | New e2e check "reborn guest: same consorts as the room world, no ghost consorts, no requests, a real mistress": main jcoopworld FAIL (`tmp:[1010…1001]`), fixed PASS (same run, COOP_B_ORIGIN=cn). Failing live run C2-2 dump: `P.b.S.srv.mid=1008, mOk:false`. |
| 3 | "buổi 3:3 advanced for both" (both seats "Chờ hảo hữu…" at night) | **Client**: the night handshake (ctm-nr rd/go) is a relay, not stored. Trace: host `nready 3`, then a reconnect (`room 3.3`), no `nr rd` ever arrives; the guest re-sends rd only on her own reconnect or a peer drop — a fast reconnect shows her neither → deadlock until the buổi clock. | **REAL (game), defensive fix** | jcoopworld.js: a host back on a new socket at night asks again (`mode:"q"`); the guest answers with rd. Old clients ignore q. | Trace from run p23-1. The COOP_RECONNECT=1 scenario (sleep/wake) passes on old and new (the harness's wake shows a peer drop, so it cannot force the exact order); kept as regression. |
| 4 | (gap found while tracing 2) | **Client**: the room snapshot after a reconnect updated `CW.base.P` but never placed the friend: a reborn friend whose `state` broadcast came while my socket was down stayed missing / old name until the next week merge. | REAL gap | jcoopworld.js `room` handler: friend entry missing / renamed vs `C.P` → same path as onState. | COOP_RECONNECT scenario "host back online after the friend was reborn" + "A sees the reborn friend" pass. |
| 5 | "start: each sees the other as a person" + "friend starts as Người lạ — no friend" | **Test race**: "world" = each seat has a base; the friend's `me` → `state` reaches the host a moment later (host trace: state, placeFriend undefined, then nothing yet). Every later "after week N" compare passes. | test | coop-e2e waits (≤ 30 s, dialogs cleared) for both entries before the start compare; prints the delay. | 0 failures of this step in 26 loaded runs after the change. |
| 6 | coop-chat "both players are in the shared world" (+ the chat steps after it) | (a) **Client (jcoop.js)**: a socket dropped while still CONNECTING can reach the Worker AFTER its successor (slow network; guest double join = ?room= link + "Vào phòng", or any reconnect while one is in flight). The Worker "replaces" the live socket with that abandoned twin (4001) → the seat shows "Ở máy khác" and stays stuck. Socket log of the failing run: new#0 2572 ms, new#1 6383, #0 close 1006, #1 open 7351, **#1 close 4001 at 8184**. (b) **Stale test**: coop-chat's clear() could press "Kiếp mới" (data-nl=re) on the new-life card; a pinned life re-rolls the same card for ever (host stuck 150 s in "Thân phận kiếp này"). | **REAL (game)** + test | (a) jcoop.js: a 4001 within 30 s of abandoning our own socket = our twin → reconnect once, not "moved". (b) coop-chat clear() presses data-nl=ok first, never re. | dev/test/coop-twin.js (twin socket with her pid opened late): old jcoop = status "moved", new = "open" (local Worker); new on LIVE = ok. |

coop-world.js: crashes on main (TypeError reading 'id' after "each sees the other" / garden checks). It drives the lobby by firing `start`
by hand, assumes 3 buổi and a consort friend, and compares before the friend's entry arrives. **Retired** (deleted, dropped from
dev/tools/tier.js): everything it covered is in coop-e2e (world, consorts, date, each other, buổi/week sync, rebirth, week after),
coop-play (places, real buttons) and coop-bot (whereabouts every week).

## OPEN / HANDOVER (worker rolled over at ~START_CTX+25 %: coordinator opens the successor)
1. **#next stays locked "Chờ hảo hữu…" at the start of a day buổi** (fold or ipad, week 3, buổi 1–2): 3 times in ~50 runs (p31-2, C3-2, G2-3).
   Not diagnosed. 6696656e adds a full dump (bend/pend/sent/nrdy/pendBuoi/whereKey/ended/trace/socket log) to that FAIL; next step:
   loop coop-e2e until it hits, read the dump. Could be a lost "buoi" broadcast (server stores m.buoi; syncRoom catches up only on a
   reconnect) — if so, the fix is a client re-check when the friend's bended view is stale.
2. Deploy of the Worker fix (#1) waits for main s25's OK: "cd coop/worker && npm test && npx wrangler deploy"; then re-run coop-e2e ×10 + the probe
   (/home/user/wt/coopst-out/probe/stale.js → b must read offline at ~60 s).
3. Part 3 list above (22 tests not run).
- Guest who is a cung nữ (COOP_B_ORIGIN=cn) sometimes knows the host's servant entry at stage 3 at the start (`key s901, K=3`,
  host serves consort 4 in another palace). Likely k61S's first-run migration (`S.known` missing → everyone already present = 3,
  incl. the friend). Rule "friend starts as Người lạ" — small, needs its own task (j61 + attach).

## Checks
| check | result |
|---|---|
| coop-e2e, 10 consecutive, idle box, LIVE Worker (old server) | after fixes 2–5 + test fixes: **10/10** (60/60 each). After fix 6 (jcoop) re-run: **9/10** — 1 FAIL "fold #next enabled [3,1,3,'Chờ hảo hữu…']" (see OPEN) |
| coop-e2e loaded (4 parallel × 2) | main build: 5 of 8 runs fail (ghost seat ×4, start race, night, reborn). Branch + LOCAL fixed Worker: 8/8. Branch + LIVE old Worker: 8/8 then 4 of 8 (srv-origin runs) |
| coop-chat idle | 55/55 ×4 after the clear() fix (1 earlier run hit the twin bug → fix 6) |
| coop-one-world.js | PASS |
| coop-one-world-play.js | 20/20 |
| coop-twin.js (new) | ok (LIVE) |
| Worker unit tests (npm test incl. new stale.test.mjs) | ALL OK |
| solo | e2e step 7 (old save loads, no co-op) every run; quickcheck old save ok; all client changes are inside co-op paths (CW.on / COOP connect) |
| quickcheck 6696656e | **PASS** · 131 s · open 823 ms · old save ok · render 230/221, tab 243/269, buổi 860/767 ms, tasks>200ms 8/8 |

## Other co-op tests on main (part 3)
Run this session: coop-e2e, coop-chat, coop-one-world, coop-one-world-play (all pass), coop-world.js (crash → retired), coop-twin.js (new).
NOT run (budget): coop-ask-srvprobe, coop-b1, coop-b2b5, coop-bot, coop-cyc, coop-dbg*, coop-guest-maid, coop-invite-ux, coop-lag,
coop-lobby, coop-night, coop-p2, coop-pets, coop-play, coop-r2, coop-rejoin-stats, coop-rev2, coop-sleep, coop-timer(-lag), evtruth-coop.
Note: coop-dbg.js / coop-dbg-hostdeath.js / coop-ask-srvprobe.js / coop-rev2.js are one-off probes (debug repro, reviewer probes), not gates —
candidates to retire. coop-lobby.js takes positional BASE/OUTDIR (old CLI). Successor: run each once on an idle box and fix or retire.

Scratch (not in git): /home/user/wt/coopst-out (loop.sh, probe/stale.js, run logs).
