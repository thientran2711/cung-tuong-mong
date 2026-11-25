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
