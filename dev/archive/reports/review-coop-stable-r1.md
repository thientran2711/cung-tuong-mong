# review-coop-stable-r1 — reviewer r1 of review/coop-stable @ 6696656e (BIG co-op)

Reviewer session_01UV1SzgbJc6UCzVHi6vVpju, coordinator MAIN s27. Date 11/17/2026. START_CTX ≈ 3 % of 1M.

## VERDICT: **PASS 6f8e33a0** (branch `review/coop-stable-r1` = origin/main 744b80e7 + merge of 6696656e; origin/main is its parent → fast-forward)
Worker deploy (#1) is judged SAFE (see "Server fix") but is a separate step for main: `cd coop/worker && npm test && npx wrangler deploy`.

## Trial merge onto main 744b80e7 (186 commits ahead of the branch base f1509d7c)
| file | conflict | resolution |
|---|---|---|
| dev/test/coop-e2e.js | 1 hunk: main's COOP_SPILL=2 `spillWalkA` vs branch's COOP_RECONNECT `netDown/netUp` | kept both (independent helpers), `node --check` ok |
| index.html, sw.js | built files | took main's, rebuilt with dev/site/build_site.sh (build line 744b80e7+); branch code present in the build (abandonAt, mode "q") |
jcoop.js / jcoopworld.js / Worker merged clean.

## Fix-by-fix
| # | claim | checked | result |
|---|---|---|---|
| 1 | Worker `bury()`: closed sockets never count online | code read; `npm test` (merge, vault, seat, stale) ALL OK; stale.test.mjs on the OLD index.js → `FAIL presence tells the host her friend is offline` (before/after proven); new Worker under `wrangler dev --local`: coop-e2e 60/60 (incl. "A frozen when B left", rejoin, rebirth) | PASS |
| 2 | reborn guest: no ghost temp-id consorts | e2e check "reborn guest: same consorts … no ghost" PASS on branch and merge; on OLD client (main) vs new Worker the same check FAILS `tmp:[1010…1001], ask:10` → bug real, fix effective | PASS |
| 3 | late CONNECTING twin no longer steals the seat | coop-twin.js: merge vs LIVE ok, vs local new Worker ok ("open", you b) | PASS |
| 4 | room snapshot places a new/renamed friend; night re-ask `q` | code read; `q` is relayed by the Worker's generic `act` path; old clients fall through (only rd/go handled) → harmless; e2e reborn-friend steps PASS | PASS |
| 5/6 | test races (start wait, coop-chat clear() never "Kiếp mới") | coop-chat 55/55, e2e start steps PASS | PASS |

## Server fix (#1) — safe for the live co-op Worker?
- Protocol unchanged (no new message types server side); old clients keep working: **main build (old jcoop) vs the NEW Worker (local): coop-e2e 59/60**, the one FAIL is client bug #2 that this branch fixes. Freeze/unfreeze, rejoin, weeks, rebirth all pass.
- Behaviour change only for sockets the server itself closed (4001 replaced / 4003 stale after 45 s silence): they stop receiving broadcasts and their messages are ignored. A live client always gets the close frame → jcoop reconnects (old and new clients) and re-sends from the room snapshot; nothing is lost that the old server kept.
- Main risk: `socks()` filters `readyState > 1`. If a runtime ever reported a live hibernated socket as CLOSING/CLOSED, everyone would read offline. workerd (wrangler local) reports live sockets as 1 (60/60 above); the guard is `typeof === "number"`. Watch item after deploy.
- Rollback plan: before deploy note the current version (`npx wrangler deployments list`); if co-op misbehaves (both seats "Hảo hữu đang vắng" while online, no presence), `npx wrangler rollback <previous-version-id>` — instant, no data migration (the `gone` flag lives only in socket attachments, storage format unchanged).
- After deploy: coop-e2e ×3 against LIVE + the worker's stale probe (b offline at ~60 s).

## Tests run (idle box, 4 cores, run one at a time)
| test | build | Worker | result |
|---|---|---|---|
| Worker npm test (4 files) | 6696656e | — | ALL OK |
| quickcheck | 6696656e | — | PASS · 117 s · old save ok · render 202/182, tab 219/246, buổi 687/1217 ms |
| quickcheck | merge 6f8e33a0 | — | PASS · 138 s · old save ok · core gates PASS · render 205/215, tab 249/256, buổi 1075/1236 ms |
| coop-e2e | 6696656e | LIVE | 60/60 |
| coop-e2e | merge | LIVE | run 1: 54/60 (see N1), run 2: 60/60, run 3: 60/60 |
| coop-e2e | merge | local NEW Worker | 60/60 |
| coop-e2e | main 744b80e7 | LIVE | 59/59 |
| coop-e2e (branch test file) | main 744b80e7 (old client) | local NEW Worker | 59/60 (only #2 ghost-consort check, fixed by this branch) |
| coop-chat | merge | LIVE | 55/55 |
| coop-one-world | merge | LIVE | PASS |
| coop-one-world-play | merge | LIVE | 20/20 |
| coop-twin | merge | LIVE + local | ok / ok |
Both seats: e2e host = Fold 686x880@2.2, guest = iPad 1180x820@2; overflow checks at every shot step pass on both. Old save: quickcheck (live build save, Fold) + e2e step "single player + old save" pass. Solo untouched (all client changes are behind CW.on / COOP).
Kit / VANPHONG: no UI, CSS or player-visible text changed (only comments and test files) → no kit scan needed; nothing to FAIL.

## Pre-existing main fails named in the task
- "A sees no friend at start" (= "start: each sees the other" / "friend starts as Người lạ" race): the branch's start wait (#5) covers it; 0 of 6 coop-e2e runs here (branch + merge).
- "fold #next enabled [.., 'Chờ hảo hữu…']": NOT fixed — still the worker's OPEN item 1 (seen 1/10 by the worker; 0 of 6 here). Successor owns it.

## names-unique co-op name divergence
NOT covered. names-unique (dcb2ea96, `review/names-unique-r1`) is not on main and its world-names e2e check is not in this branch. A trial merge of names-unique-r1 onto this merge conflicts in assemble.py, jcmaid.js, jreign.js, coop-e2e.js (+ built files) → needs its own rebase. Plausibly related: fix #2 removes the 10 guest-only temp-id consorts, which would also show as name divergence; re-run names-unique's "same names of the world people" check after it is rebased onto main + this PASS.

## New finding for main (not caused by this branch) — N1
Merge run 1: the host threw `TypeError: Cannot read properties of undefined (reading 'tg')` in `npcMonthly` (dev/build/j8.js:399 `(IT[e.k].tg||[])`) inside a COOP act → it never sent its week-2 end → week 3 stuck for both, then 5 follow-on FAILs. An NPC holds an item key the host's `IT` lacks — likely a runtime-registered item (j92 handmade, jrcp/jtds recipe books, j97 gifts register IT at run time on ONE client) arriving through the shared world. ONE-WORLD + crash class: 25 files read `IT[e.k].x` unguarded (j15, j75, j78, j8, j83, j92, jdh2, jdis, jdress, jecon, jeitem, jevb, jfx, jgift, jinv, jkc, jlost, jpoison, jrcp, jstip, jtoil, jtoilr, jtruth, jts, jveil). Branch does not touch items (diff = jcoop.js + jcoopworld.js only). Suggest one task: sync runtime IT entries through the room state (or re-register from the item key) + guard the family.

## Minor notes (no FAIL)
- jcoop twin rule: a REAL second device opening the seat within 30 s after this device's own reconnect gets taken back once; bounded (abandonAt cleared), then the usual "Ở máy khác". Acceptable.
- Stale reference: dev/coop/PROGRESS_coop.md still names the retired dev/test/coop-world.js.
Scratch only: /home/user/wt/rcs-scratch (logs). No shots in git, no CDN review folder used.
