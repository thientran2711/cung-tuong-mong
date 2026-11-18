# Q1c — men help asks (jnrask_m.js) — SẴN SÀNG KIỂM c6015bd
PRIORITY #1 CHECK: OD L644/L1072/L1243/L1252 | main none (Q1 engine not on main yet) | review/questline-q1a 1b6005a (engine + shared nrask-scan, hz exempt), review/questline-q1b 344e1e9 (no clash), review/questline-q1c (this) | claims E7c2 session_01DgYSWkXhh7hPLBJjzFYMWJ (successor of E7c session_01DgYSWmbeLw227mrkMikC5W)
START_CTX ~5 % · lineage depth 2 · worker (no children).

Branch **review/questline-q1c @ c6015bd** = ONE commit on review/questline-q1a 1b6005a (Foreman E 05:59Z: base q1c on q1a; old a95e8d4..b99f4bc replaced, force-with-lease). On c6015bd: nrask-scan ALL PASS, nrask-m-scan PASS, nrask-engine ALL PASS. When q1a lands on main, q1c applies on top as is.
Files: `dev/build/jnrask_m.js` (data only), `dev/build/assemble.py` (+jnrask_m.js after jnroadm.js), `dev/test/nrask-m-scan.js`, `dev/test/nrask-m-shots.js` (new), rebuilt index.html/sw.js.

## What
- **204 asks = 17 men templates × help chapters 5–10 × 2 asks.** `NRASK["<template>_<n>"] = [askA, askB]` (Q1a engine shape: one ask or a list; picked ask kept in p.av). The two asks of a chapter are always **different kinds** (scan-checked), same chapter conflict, expert B2 shapes (men row) + B4 voices via slots ({me}/{call} → nrVoiceM thần / nô tài / bản vương). Stock costs/odds/losses kept (builder ORD; ONE CORE). No «bac»; money only as a cost.
- **«do» asks name {B} (all 27 old + every new «do»)**: {B} written in as the suspect/target so the stock «Đem chuyện mách cho {B}» makes sense; st_uoc_6 (dò ý Hoàng thượng) changed to kind emp (not about a rival). Fallback «kẻ kia» reads well.
- **No typed pronoun of address in any ask** (8 old: mình/em/anh; plus «nô tài» / «anh» in 3 others the shared scan caught) → {me} or plain nouns.
- hz_* (princes) still have no entry on purpose; Q1a's nrask-scan now exempts them (1b6005a).

## Tests (on a local q1a 1b6005a + q1c merge, worktree /home/user/wt/e7c2-t, not pushed)
- `node dev/test/nrask-scan.js` (Q1a shared): **ALL PASS** — men 102/102 chapters, 396 asks total, no shared sentence/label/loss line. Also run with Q1b 255f5b2a jnrask_b.js added (q1a+q1b+q1c): **ALL PASS**, 636 asks (one shared sentence with thd_hoc_6 fixed in b99f4bc).
- `node dev/test/nrask-engine.js`: **ALL PASS** (792 cards render in both voices, no raw slot, stock costs, fallback, old saves, play to end, no page errors).
- `node dev/test/nrask-m-scan.js` (Q1c): PASS (204 asks, kinds differ per chapter, «do» names {B}, cost words, VANPHONG, no shared sentence incl. stock cards).
- `node dev/test/nrask-m-shots.js <out>` (new; Q1a's harness, asker = a Thị vệ of S.men and the court Tổng quản, rival as nrMenOffer casts it): **SHOTS OK** Fold 755x1000@2 + iPad 1180x820@2 (offer card + Việc nhờ tab, no overflow, no raw slot, no page errors). Looked at all 8: voice right (thần / nô tài, tiểu chủ), {B} filled or shown veiled («Đáp ứng ???», the name-veil), loss lines read «ta» on screen (j84).
- quickcheck on f08eeb7 (b99f4bc only rewords one sentence): **QUICKCHECK PASS**, core gates PASS, old save ok, perf new/live render 139/150, tab 281/282, buổi 706/690.

## Shots
CDN upload refused (cdn_sync HTTP 401 Authentication error) and images may not go in git → shots are LOCAL ONLY: /home/user/wt/e7c2-shots/ (755x1000 + 1180x820 × gd_tl_9 men / tq_an_7 court × offer / tab). Reviewer: rerun `node dev/test/nrask-m-shots.js <dir>` on the merge to see them.

## Notes for the reviewer / Foreman E (not in my scope)
- The men rival (nrMenRival, g "men") is any man of S.men, not one of his kind (shot: a Thị vệ's rival is a «Nhạc sư»). The asks are worded so {B} reads true for any man, but Foreman B / engine owner may want same-kind rivals.
- Review waits for q1a on main; then rebase q1c and re-run the 4 tests above.
