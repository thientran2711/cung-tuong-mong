# d-golive — Foreman D PASS branches prepared for go-live (worker session_01DgYSWnvC5ntuJ6oLspAoXu)

Task: prepare D's READY branches one at a time (merge current main, CHANGE line, build, push review/<topic>-golive, tier, suites, golive.sh without --yes), send GOLIVE-READY to Foreman D, wait for LIVE. The worker NEVER pushes main.
START_CTX ≈ 4 % of the 1M window (get_session reads 0; own estimate).
Go-live kit (tier.js, golive.sh, quickcheck) is not on main yet: run from a worktree of review/go-live-kit 9f68cffa (`/home/user/wt/glk`).

## Table
| # | branch | golive sha | tests | state |
|---|---|---|---|---|
| 9 (moved first by Foreman D s7) | review/coop-chat-r1-golive | b7c5d787 | coop-chat 47/47 ×2 (local `wrangler dev` of the merged worker); worker chat/ws ALL OK (local merged), merge/seat/vault OK; coop-e2e 59/59 (other runs 59/60, 57/59 = known live-Worker flakes "fold #next enabled" / "A frozen when B left"); quickcheck PASS 76 s; tier BIG | LIVE (b7c5d787 on main; pushed by Foreman D / someone else, NOT by this worker; Actions "Deploy co-op Worker" #5 success 18:21Z) |
| 1 | review/coop-b1b5-fix-r1-golive | (in progress) | see below | RUNNING |
| 10 | review/slap-mg-r3 | — | — | ALREADY ON MAIN (inside mg-train 8f476f6f, live before 2934bede) |

## Notes
- 871a104d (first coop-chat GOLIVE-READY) wrongly carried coop/worker/.wrangler (local wrangler dev state, 40 files) — caught by Foreman D; fixed in b7c5d787 (`git rm --cached` + new coop/worker/.gitignore: .wrangler/, node_modules/, package-lock.json). Lesson: never `git add -A` in a tree where a local server ran.
- Test-harness family fix (LUẬT SỬA CẢ NHÓM): main's KIT §81 scenes (card flip) no longer close by themselves, so the co-op suites' `clear()` got stuck behind the flip. Fix in every co-op suite with that helper: clear() first taps a visible `.kmov .kmend` (scene-end button), then any PLAYING `.kmov` (tap = skip to final frame). coop-chat-golive carries part 1 (coop-chat, coop-e2e, coop-guest-maid, coop-ask-srvprobe, coop-bot, coop-dbg-hostdeath); coop-b1b5-golive carries parts 1+2 for those + coop-cyc, coop-b2b5, coop-p2, coop-rev2, coop-r2, coop-b1, coop-pets.

## coop-chat LIVE check (Foreman D s7 request) — production Worker, main c19b25eb build
`node dev/test/coop-chat.js <out> 755x1000@2 1180x820@2` (default Worker URL = production), 2 runs, with the part-2 harness fix:
- run 1: 46/47 · run 2: 46/47. The one miss both times = the test's EARLY "both players are in the shared world" wait (151 s); the later world check passes ("world true true 0s") and EVERY chat check passes (send/receive, badge, shake, escaping, 300-char cut, ✕/Esc, history after rejoin, away line, no icon in solo). Same harness miss the coop-chat-r1 reviewer recorded.
- Shots looked at: host 755x1000@2 `05-two-lines-A` (frame Thư từ, both lines, escaped HTML shown as text) and guest 1180x820@2 `04-open-friend-B` (header "Truyền tin cùng Chu Phương Hoa", the line).
- FINDING (non-blocking, wording/name-mask): on the HOST the guest's chat lines are signed "Tần ???" — the unmet-name mask treats the co-op friend as an unmet consort. The guest side shows the host's real name. → follow-up for Foreman D (name-mask family: the co-op friend should always count as met).
