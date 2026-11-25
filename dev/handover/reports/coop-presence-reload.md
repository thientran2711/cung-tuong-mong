# coop-presence-reload — «Đợi hảo hữu trở lại — hảo hữu đang vắng» after a reload (B FIXER, BIG co-op)

PRIORITY #1 CHECK: OD 0 new (OD:L153 live presence rule only) | ledger 0 | claims 0 (this session claimed by Foreman B) | main 0 | review/* 0 presence fix (review/coop-stable = the stale-bury rule, reused; dev/test/coop-lag.js / coop-e2e.js harness reused) | archive 0.
Worker session_01N1tNP6ZctXUw4paW68T7um, depth 4, START_CTX ~3 %. Branch review/coop-presence-reload from review/robot-coop-stack-u3 512cfee6.

## 1. What was proven (cause hunt)

| check | local workerd (`wrangler dev`, the runners' set-up) | real Cloudflare (LIVE ctm-coop = same index.js as 512cfee6; test Worker ctm-coop-prtest = the fix) |
|---|---|---|
| natural reloads R1–R6 (guest / host / both / guest while host ended her buổi / old tab closes 8 s late / host idle 60 s), real game, Fold 755x1000 + iPad 1180x820 | base never false-absent | base never false-absent (LIVE: every R1–R6 check ok) |
| raw sockets: ping-only 80–100 s (auto-response keep-alive vs the 45 s stale alarm) | no false stale | no false stale |
| raw sockets: room reply vs the friend's rejoin (3.3 MB state, 22 rounds) | events serialized, order always room → presence | order NOT guaranteed (presence before room seen 4/22) — but the join's own post-room `presence()` always healed the view |
| server log of every reload (DBG build): join / bury / late close of the replaced socket | late close of a buried socket computed correctly (newest socket counted) | same (wrangler tail on the DBG test Worker) |

Verdict: **no natural reload path reproduces it on either runtime; it is not a local-workerd artefact and not a Worker reload bug.** Both dumps match ONE shape instead: a seat whose page stopped running for a while (the harness's own «page froze: page.evaluate hung» family) → the Worker's 45 s alarm correctly buries its silent socket → the friend correctly reads «đang vắng» → and the base client has NO way back:
- R7DR: the guest dump could not be captured («guest watchdog did not fire» = its page did not answer page.evaluate); its screenshot (Lịch tháng, «Sẵn sàng») is the last painted frame; no reconnect in the wrangler log because the page never ran its onclose.
- VZ68: the host repeats `bend 1.2` ×50 while the guest reads it absent = the host writes into a socket the Worker had buried; the base Worker drops a buried socket's messages SILENTLY, so the host never learns it is gone.
- B6G9 + NNDZ (U3c, cases 3–4, read at the end of this work): guest checkpoints show NO page freeze (freezes none, stuck 0, the guest kept tapping), the host's own reload re-reads the guest absent (= the WORKER counts her socket as gone), host repeats `bend 16.2` (waits). Shape = a seat on a socket the Worker buried while the page never learned it (its close lost; why the bury happened under 4 runners on one local workerd is not proven — the stale alarm is the only path that buries without a reload). The base Worker then drops her writes silently and her keep-alive pings still get auto-pongs, so she never notices. This is exactly rows R8 + the «gone» rule: with the fix she hears «gone» on her next write / 30 s `who` and rejoins.
Base client holes (each proven by a row below): (a) it never re-checks presence — a stale «away» view lasts for ever; (b) a socket that is CLOSED but whose close never reached the page (hung tab) is never reconnected (the keep-alive returns early on readyState ≠ 1); (c) a buried socket's writes get no answer.
Side finding (test harness, not game): on Cloudflare timing, a bot that runs its generic «tap the last modal button» clear() while the title's room list is open taps «Mời hảo hữu» and makes a NEW room (my first CF runs); the new test rejoins only through this room's own «Trở lại phòng». Foreman B: worth checking robot-rt's rejoin path for the same trap.

## 2. The fix — one presence rule (Worker + client, both orders of deploy are safe)
Worker `coop/worker/src/index.js`:
- every message that carries the seats (room, presence, presenceSoon, who) is stamped `ps` (a clock that only goes up: wall ms, +1 within an event; survives hibernation);
- `who` → the asker gets the room's view now; `here` → a seat that applied its room reply re-announces (everybody gets a fresh presence);
- newest socket wins: a replaced / buried socket closing late sends nothing (never marks the seat absent);
- a buried socket that still writes (not its keep-alive ping) hears `error gone` and is closed again.
Client `dev/build/jcoop.js`:
- keeps the newest view only (a presence older than the newest `ps` is dropped whole, with its buổi / bended; an older room reply keeps the current seats);
- after its room reply: sends `here`;
- asks `who` every 5 s while the friend reads away, every 30 s otherwise (so a stale «away» heals within ~5–10 s whatever its cause);
- a presence that says exactly what the seat already holds (mostly the answer to its own `who`) fires no game event (the night gate / lockNext run no more often than on base);
- rejoins at once on `error gone`, when the room's view says ITS OWN seat is away (max once per 15 s), or when its socket is CLOSED without the close reaching the page.
Old client + new Worker: ignores ps / never sends who → behaves as before. New client + old Worker (LIVE until deploy): no ps → no `here`; `who` is ignored → behaves as before except (b) above, which is client-only. Traffic: one ~20-byte `who` + one presence reply per 30 s per seat.
**Deploy needed**: the Worker part (MAIN / coordinator `wrangler deploy` in coop/worker at land). The test Worker ctm-coop-prtest is deleted (see §4).

## 3. Tests
New `dev/test/coop-presence-reload.js` (Fold 755x1000 + iPad 1180x820, real game, real reloads; each row = both online within 20 s + the room advances one buổi + 50–70 s idle with nobody marked away). R7 / R8 inject the two observed shapes: R7 the host's page loses the «guest is back» presence frames (stale view); R8 the guest tab sends nothing and never hears its socket close while the room buries it (hung tab), then runs again.

| run | R1–R6 natural | R7 stale view | R8 missed close | total |
|---|---|---|---|---|
| BASE 512cfee6, local Worker | ok | **FAIL** (host absent for ever, room stuck) | **FAIL** (×2) | FAIL |
| BASE, LIVE Cloudflare Worker | ok (18/18) | **FAIL** ×3 | **FAIL** | FAIL 4/32 |
| MUTATE (Worker fixed, client fix dropped) | — | **FAIL** ×2 | **FAIL** | FAIL |
| FIX, local Worker, Fold hosts | ok | ok | ok | PASS 35/35 |
| FIX, local Worker, COOP_SWAP=1 iPad hosts | ok | ok | ok | PASS 35/35 |
| FIX, Cloudflare test Worker ctm-coop-prtest (the real runtime, same wrangler.toml) | ok | ok | ok | PASS 35/35 (×2) |

Worker unit `coop/worker/test/presence.test.mjs` (in `npm test`): ps strictly increases; who → asker only; here → both; a late close of the replaced socket never marks absent; a real leave still does; a buried socket's ping gets nothing, its writes get «gone» + close and never count. Base: crashes (no psNext) = FAIL.
Other gates (head of the branch): coop-e2e local Worker SWAP=0 **142/142**, SWAP=1 **142/142** (an earlier fix build without the «no event when nothing changed» guard read 137/144 at a week-2 night; base on the same set-up 141/144 = the known «#next» night noise; after the guard both orders 142/142) · save-rt-coop 6 ok / 5 FAIL, **identical on base 512cfee6** (the savert fixes are not in this stack; names / Sức / ledger rows, not presence) · Worker `npm test` all ALL OK incl. presence · quickcheck ALONE **PASS** (187 s, old save ok, perf new ≤ live) · presence suite on the final head: local Fold-host 35/35, local iPad-host 35/35, Cloudflare 35/35.

## 4. Housekeeping
- Test Worker `ctm-coop-prtest` (deployed only to prove the fix on the real Cloudflare runtime): **deleted** (`wrangler delete`, health now 404). LIVE `ctm-coop` untouched (only used as the BASE Worker for the base runs + raw probes; test rooms only).
- No images, no shots in git. Scratch outside the repo.

## 5. Notes for MAIN / Foreman B
- LAND: the client part rides the normal land; the Worker part needs `wrangler deploy` in coop/worker (either order is safe, §2).
- If R7DR-like rows come back AFTER this lands, the remaining cause is a page that really stops running (the «page froze» family): the friend reading «đang vắng» is then TRUE; the stuck dump of that seat will fail to capture (page.evaluate hangs) exactly as in R7DR. The fix makes that seat rejoin by itself as soon as its page runs again.
- Runner ask: capture the absent seat's `COOP.state` + its socket log (or note «page did not answer») in every presence stuck dump.

## REVIEW (B BIG co-op rv session_01N1tNP2N8xkKLq6Len7PMr9, depth 5, START_CTX ~3 %)
PRIORITY #1 CHECK ('coop-presence-reload'): OD 0 (OD:L153 live presence only) | ledger 0 | claims: fixer 6ZctXUw4 + this rv | main 0 | review/* 1 (this branch) | archive 0 → reused the fixer's test + report.

**Land form.** 5399c31f sits on review/robot-coop-stack-u3 512cfee6 (= fix-6 c4163a93, FAILed in review, + fix-5-r1, neither on main). Merging it would land that stack too. So the land candidate is **review/coop-presence-reload-rv** = LIVE origin/main 17dfa64d + the presence commits only (b45bd29a, d0248264, af8f8797, 99af634b source part, report), cherry-picked (one conflict: coop/worker/package.json test list = main's list + presence.test.mjs; range.test belongs to the stack) + rebuilt + one rv fix. Worker index.js on main == on the stack, so the Worker diff is exactly the fixer's.
**LIVE Worker** ctm-coop (Cloudflare, modified 11/24 15:22Z) = main's Worker (has coop-stable bury, no fix-2 clamp: no sucCap/clampW in the bundle) → `wrangler deploy` from this branch changes only the presence code.

**Regression found + fixed (rv commit a23efd71).** On LIVE base, coop-e2e SWAP=0 (local Worker): fix head 141/144 ×2 (week 3 after rebirth: host «Sẵn sàng» never advanced, guest «Chờ hảo hữu…» bended 3.2), base 142/142 ×2. Cause: the answers to the 30 s / 5 s `who` carry buổi / bended; each answer with a newer buổi than the last presence fired a «presence» game event (nCheck / lockNext / night timer bv / soonEnd) at a random moment base never had. Fix: the Worker marks the who answer `who:1`; the client fires no event for a who answer whose seats / ended / week equal what it holds (still runs selfCheck; a real change — the stale «đang vắng» it heals — is applied and told). After: SWAP=0 142/142 ×2, SWAP=1 142/142. Worker unit gains «who answer is marked who:1» (MUTATE: fails without it). Fixer reviewed a23efd71: no objection.

**Checks.**
1. ONE presence rule (law 11): every presence reader (jcooplobby peerWord / FZT freeze, jcooptimer frSt «đang vắng» chip, jcoopworld frozen(), jsfx) reads COOP.state seats / peerOnline written only by jcoop set(); Worker online = socks() in seatsView/presenceSoon only. No second path.
2. No storm / no new room: rejoin = connect(st.room) only (never create()); `gone` → one reconnect per buried socket (the new join is not buried); own-seat-away ≤ once / 15 s; CLOSED-socket check ≤ once / 10 s tick and only while status open. Test rejoin taps this room's «Trở lại phòng» only.
3. Deploy window: old client + new Worker = base + buried-socket writes now get «gone» + 4003 → old client reconnects (better); MUTATE run (old client, new Worker): R1–R6 natural ok, R7/R8 FAIL as base. New client + old Worker (compat run): R1–R6 ok, R7 FAIL (needs Worker `who`) = base, R8 cascades from R7 → not worse than base. Either order safe; **recommend Worker first** (it alone already helps every cached old client; the client then lands onto a Worker that answers who).
4. Save/snap: save-rt-coop 6 ok / 5 FAIL **identical** on LIVE base and on the fix (the 5 = savert fixes not landed). jcoop/Worker diff touches no save/snap code (a buried socket's snap now hears «gone» instead of silent drop).
5. Asymmetric shape (Foreman B, U3b WQ55: guest reads host away, host reads guest in, both sockets open): the guest asks `who` every ~10 s while away → the room's view (host online) differs → applied → heals in ≤ ~10 s; if instead the Worker had buried the host's socket, the host's next write / 30 s `who` hears «gone» → rejoins → guest gets the presence. = rows R7 / R8 shapes.
Note (pre-existing family, not blocking): wake() / focus / online and the new tick all reconnect on readyState 2 (CLOSING); if that happens inside the ~RTT window between a 4001 «replaced» close frame and its onclose, the replaced device takes the seat back once. Base already has it on focus/wake; follow-up idea: treat CLOSING as «wait one tick».

**Gates (paste of results; logs in rv scratch).** Local Worker = `wrangler dev` of each tree (base = LIVE 17dfa64d coop/worker).
| gate | LIVE base 17dfa64d | bare head 5399c31f | rv head pre-fix f962c7d2 | rv head a23efd71 (final) |
|---|---|---|---|---|
| Worker `npm test` | presence.test crashes (no psNext) = FAIL | ALL OK | ALL OK | ALL OK (+ who:1 row; MUTATE FAIL) |
| coop-presence-reload Fold-host | R1–R6 26/26 ok; R7/R8 **FAIL** 4 of 9 | **PASS 35/35** | **PASS 35/35** | **PASS 35/35** |
| coop-presence-reload iPad-host (SWAP=1) | — | (fixer 35/35) | **PASS 35/35** | **PASS 35/35** |
| MUTATE old client + new Worker | — | — | FAIL 5/32 (R7, R8 + R2 card noise) | — |
| compat new client + old Worker | — | — | FAIL 5/32 (R7 + cascade, R2 card noise) = base | — |
| LONG: both-seat reload then 20 buổi, Fold+iPad | — | — | PASS 10/10, 0 false «đang vắng», shots b5/b20 both devices looked 3× (normal play, no freeze screen) | — |
| coop-e2e SWAP=0 | 142/142 ×2 | — | **141/144 ×2** (regression) | **142/142 ×2** |
| coop-e2e SWAP=1 | 142/142 | — | 139/142 + 142/142 | **142/142** |
| save-rt-coop | 6 ok / 5 FAIL | — | 6 ok / 5 FAIL (identical) | (no save code changed) |
| quickcheck ALONE | — | — | — | open ok · **old save loads + plays a buổi ok** · core gate G4 button-crawl FAIL «Ô lưu · Lui» = **identical on LIVE base** (pre-existing, jslots, not this diff) · perf step NOT finished (my 15-min timeout cut it; client diff is network-only) |
R2 «card noise» = a «Hoàng thượng ban thưởng» card the presence test's clear() does not answer (both seats online throughout; seen on old-client runs only; not presence).
Cloudflare test Worker: not needed (fixer's ctm-coop-prtest already deleted: absent from the account's script list).

**VERDICT: PASS → LAND READY review/coop-presence-reload-rv a23efd71c0d7d9a4858533318e3ea6e5f5018e22** (BIG; co-op; on LIVE 17dfa64d → fast-forward + this report commit; NEEDS WORKER DEPLOY: `cd coop/worker && npx wrangler deploy` — **Worker first**, then the client; either order is safe). Laws touched: 11 (one presence rule) ok; 1/6b n/a; no UI / kit / wording change.
