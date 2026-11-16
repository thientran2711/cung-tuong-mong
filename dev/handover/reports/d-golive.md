# d-golive — Foreman D PASS branches prepared for go-live (worker session_01DgYSWnvC5ntuJ6oLspAoXu)

Task: prepare D's READY branches one at a time (merge current main, CHANGE line, build, push review/<topic>-golive, tier, suites, golive.sh without --yes), send GOLIVE-READY to Foreman D, wait for LIVE. The worker NEVER pushes main.
START_CTX ≈ 4 % of the 1M window (get_session reads 0; own estimate).
Go-live kit (tier.js, golive.sh, quickcheck) is not on main yet: run from a worktree of review/go-live-kit 9f68cffa (`/home/user/wt/glk`).

## Table
| # | branch | golive sha | tests | state |
|---|---|---|---|---|
| 9 (moved first by Foreman D s7) | review/coop-chat-r1-golive | b7c5d787 | coop-chat 47/47 ×2 (local `wrangler dev` of the merged worker); worker chat/ws ALL OK (local merged), merge/seat/vault OK; coop-e2e 59/59 (other runs 59/60, 57/59 = known live-Worker flakes "fold #next enabled" / "A frozen when B left"); quickcheck PASS 76 s; tier BIG | LIVE (b7c5d787 on main; pushed by Foreman D / someone else, NOT by this worker; Actions "Deploy co-op Worker" #5 success 18:21Z) |
| 1 | review/coop-b1b5-fix-r1-golive | b77d3250 (main 785b8274 merged) | full set on 4a13f093 (main 7b5e5e49): coop-cyc 69/69, b2b5 30/30, p2 45/45, b1 41/41, e2e 59/59, r2 47/47 (re-run; 1st = start-up flake), rev2 37/38 (miss "new A: old B place + Sủng still arrive", mixed old-build guest — 2 runs in a row, NOT yet classified), pets 45/48 (start-up "friend entry" timing + new first-time "Thú nuôi" tip card over the gift dialog = harness); quickcheck PASS 209 s on b77d3250; tier BIG. Sanity re-run on b77d3250 NOT done (rollover) | GOLIVE-READY sent to Foreman D s7 20:24Z |
| 2–8 | mem-upgrade-r1, item-ledger-r1, seatcap-r1, npc-death-r1, preg-rate-r1, ghen-shown-r1 (has emperor-visit), danh-p1-r1 | — | — | NOT STARTED (successor) |
| 10 | review/slap-mg-r3 | — | — | ALREADY ON MAIN (inside mg-train 8f476f6f, live before 2934bede) |
| 11 | review/entry-exam-r1 | — | — | mg-balance now live; check kc-roads-cn-nc-fix-r1 3dba018d PASS+live first (was NOT on main at 17:45Z) else SKIPPED |

## HANDOVER (worker rollover 16/11 20:25Z: context 28.8 % ≥ START_CTX 4 % + 25 %) — the COORDINATOR (Foreman D) opens the successor
Successor does, in order: (a) wait for Foreman D's LIVE on coop-b1b5 (or its FAIL list); if main moved before the push, merge main into review/coop-b1b5-fix-r1-golive (generated files: take main's and rebuild; CHANGE.txt = the b1b5 line), quickcheck, re-send. (b) classify rev2 "new A: old B place + Sủng still arrive" (dev/test/coop-rev2.js:148; old B goTo('thu') may no longer move on main → place stays home; check whether A receives the Sủng relay from an old-build guest; control = run on 287a7010 with .tmp/old.html = main build). (c) items 2–8 one at a time, then 11.
Recipe notes learned here:
- golive tools are ON MAIN now (dev/tools/golive.sh, tier.js, quickcheck.sh) — run from the golive worktree itself; quickcheck now ~3.5 min.
- Co-op suites need `.tmp/old.html` = `python3 dev/build/assemble.py` output (dev/index.html) of CURRENT origin/main.
- Never `git add -A` blindly: use `git add -A -- . ':!.tmp'` and check `git diff --name-only origin/main HEAD` holds only dev/, index.html, sw.js, assets.json (+ the branch's own source dirs such as coop/worker/src).
- Main moves every ~15–30 min (other foremen): merge → build → push → quickcheck → READY quickly; run the long suites on the previous merge and say so.
- Test harness family (in coop-b1b5-golive, not yet on main except part 1 via coop-chat): clear() taps `.kmov .kmend`, then each playing `.kmov` ONCE (data-tsk); coop-r2 npc() sets window.__j95off around the forced act. Not fixed (other owners' suites, same j95 motive gate cause if they force NPC acts on a target): book-person.js, memories.js, poison-gift.js, slap-mg.js, oldroom-r1.js, coop-world.js — check before trusting a FAIL there.
- Local Worker for chat tests: `cd coop/worker && npm install && node_modules/.bin/wrangler dev --local --port <free>`; .wrangler/ + node_modules/ are now gitignored there.

## Notes
- 871a104d (first coop-chat GOLIVE-READY) wrongly carried coop/worker/.wrangler (local wrangler dev state, 40 files) — caught by Foreman D; fixed in b7c5d787 (`git rm --cached` + new coop/worker/.gitignore: .wrangler/, node_modules/, package-lock.json). Lesson: never `git add -A` in a tree where a local server ran.
- Test-harness family fix (LUẬT SỬA CẢ NHÓM): main's KIT §81 scenes (card flip) no longer close by themselves, so the co-op suites' `clear()` got stuck behind the flip. Fix in every co-op suite with that helper: clear() first taps a visible `.kmov .kmend` (scene-end button), then any PLAYING `.kmov` (tap = skip to final frame). coop-chat-golive carries part 1 (coop-chat, coop-e2e, coop-guest-maid, coop-ask-srvprobe, coop-bot, coop-dbg-hostdeath); coop-b1b5-golive carries parts 1+2 for those + coop-cyc, coop-b2b5, coop-p2, coop-rev2, coop-r2, coop-b1, coop-pets.

## coop-chat LIVE check (Foreman D s7 request) — production Worker, main c19b25eb build
`node dev/test/coop-chat.js <out> 755x1000@2 1180x820@2` (default Worker URL = production), 2 runs, with the part-2 harness fix:
- run 1: 46/47 · run 2: 46/47. The one miss both times = the test's EARLY "both players are in the shared world" wait (151 s); the later world check passes ("world true true 0s") and EVERY chat check passes (send/receive, badge, shake, escaping, 300-char cut, ✕/Esc, history after rejoin, away line, no icon in solo). Same harness miss the coop-chat-r1 reviewer recorded.
- Shots looked at: host 755x1000@2 `05-two-lines-A` (frame Thư từ, both lines, escaped HTML shown as text) and guest 1180x820@2 `04-open-friend-B` (header "Truyền tin cùng Chu Phương Hoa", the line).
- FINDING (non-blocking, wording/name-mask): on the HOST the guest's chat lines are signed "Tần ???" — the unmet-name mask treats the co-op friend as an unmet consort. The guest side shows the host's real name. → follow-up for Foreman D (name-mask family: the co-op friend should always count as met).
