# Q1c — men help asks (jnrask_m.js) — PASS b013ddf → READY 154506f (on q1a 90796d3)
PRIORITY #1 CHECK: OD L644/L1072/L1243/L1252 | main none (Q1 engine not on main yet) | review/questline-q1a 1b6005a (engine + shared nrask-scan, hz exempt), review/questline-q1b 344e1e9 (no clash), review/questline-q1c (this) | claims E7c2 session_01DgYSWkXhh7hPLBJjzFYMWJ (successor of E7c session_01DgYSWmbeLw227mrkMikC5W)
START_CTX ~5 % · lineage depth 2 · worker (no children).

Branch **review/questline-q1c @ c6015bd** = ONE commit on review/questline-q1a 1b6005a (Foreman E 05:59Z: base q1c on q1a; old a95e8d4..b99f4bc replaced, force-with-lease). On c6015bd: nrask-scan ALL PASS, nrask-m-scan PASS, nrask-engine ALL PASS. When q1a lands on main, q1c applies on top as is.
Files: `dev/build/jnrask_m.js` (data only), `dev/build/assemble.py` (+jnrask_m.js after jnrask.js), `dev/test/nrask-m-scan.js`, `dev/test/nrask-m-shots.js` (new), rebuilt index.html/sw.js.

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

## FIX 1 (review E7cr FAIL b99f4bc → reports/questline-q1c-review.md) — 2148089 on q1a 1b6005a
Whole families, not just the listed asks: I listed EVERY ask naming {B} (63) per group and reread each against who {B} really is (S.men man of another trade · court consort for tq/ksp/court Thái y · fellow staff eunuch for eun_len · another house head for off), plus every time word and every option line.
| # | family | before (rule hits on b99f4bc) | fixed asks | after |
|---|---|---|---|---|
| 1 | S.men {B} in the asker's own trade / given a phủ or post | 14 | gd_tinh_5#1, gd_tl_5#0 (extra), gd_tl_6#1, gd_tl_9#0, hs_hoa_5#1, hs_hoa_6#0, hs_hoa_7#1, ns_tho_5#1, ns_tho_9#0, st_uoc_6#1, vg_bien_5#0, vg_dat_6#0, vg_bien_6#1, vg_bien_9#1, vg_dat_7#1 (labels/loss lines too: no «phủ {B}» left in men groups) | 0 |
| 2 | ty asks read for a consort {B} (court Thái y) | 2 (+ by hand) | ty_thu_5#1, ty_thu_7#1, ty_tra_6#1, ty_tra_8#0, ty_tra_10#1 — {B} only as «người của / bên {B}», no hắn/nàng/cung/phủ bound to {B} | 0 |
| 3 | eun_len {B} = fellow eunuch | 5 | eun_len_5#1, 6#0, 7#0, 8#1, 9#1 (no servants / officials under {B}) | 0 |
| 4 | time words vs the card deadline | 11 | gd_kho_7#0, ty_tra_10#0/#1, tq_an_7#0/#1, off_dan_10#0, st_uoc_9#0, ns_tho_10#1 (ask + label), ksp_so_7#0 (extra «mồng một») → «sắp», «chẳng còn bao lâu», «trước buổi bàn tới» | 0 |
| 5 | handout asks | by hand | eun_len_5#0 → vouch for him to the old eunuch (tea stays only as the bạc option's cost); ty_tra_7#0 → sâm drawn in her palace's name | 0 |
| 6 | assumed kin of the rival house in the palace | 2 (+ by hand) | off_ghe_5#0 (conditional «nếu phủ ấy có người nhà…»), off_ghe_10#1, off_dan_8#1 | 0 |
| opt | «nô tài» as a noun in option lines | — | 8 lines → «thái giám» | 0 |
nrask-m-scan now carries a rule for each family (time words, handout, S.men {B} post/phủ/trade verbs, ty {B} binding, eun_len {B} people, off kin); on b99f4bc it reports 30 hits, on 2148089 0.
Tests on 2148089 (q1a 1b6005a + q1c; scan also with q1b 255f5b2a): nrask-scan ALL PASS (both), nrask-m-scan PASS, nrask-engine ALL PASS, quickcheck PASS (core gates PASS, old save ok, render 167/144, tab 276/310, buổi 703/676).
nrVoiceM («thần» for every S.men man vs VANPHONG vi thần / thị vệ nô tài): engine side (jnroadm.js:147) → sent to E7a 18/11 ~06:55Z (it is moving address to jvoice kAddr). Rebase on E7a's new q1a sha (ed01a6b seen on origin) when E7a reports done.

## REBASE on q1a fix r2 54f10e8 → 99aa2c5 (E7a 06:52Z)
review/questline-q1c = 5432087 (data) + e80c8cf (fix 1) + 99aa2c5 on review/questline-q1a 54f10e8 (force-with-lease over 2148089; only index.html/sw.js conflicted → rebuilt).
New engine rules met: (a) ≥1 {B}-free ask per chapter (asks naming {B} are not drawn without a real rival) — was 2 chapters with {B} in both asks: off_ghe_5#1, off_thong_7#1 reworded → 0; (b) NRSELF ty: a Thái y is never asked for kind «y» — ty_thu_6#0, ty_tra_7#0 → che, ty_thu_9#0, ty_tra_9#1 → thu (kinds per chapter still differ). nrask-m-scan checks both. nrVoiceM is now by trade (E7a): shots show Thị vệ «nô tài», Tổng quản «nô tài».
Tests on 99aa2c5: nrask-scan ALL PASS (also with q1b b34eaed: no men failure, no dup key), nrask-m-scan PASS, nrask-engine ALL PASS, nrask-m-shots SHOTS OK Fold + iPad (looked; local only, CDN 401), quickcheck PASS (core gates PASS, old save ok).

## FIX 2 (E7cr2 FAIL 99aa2c5, review ROUND 2) — 65a1421 (pushed; rebase on E7a2's q1a sha still to come)
| family | before (rule hits on 99aa2c5) | fixed | after |
|---|---|---|---|
| label says the narration's «ngươi» (labels are her own action → «mình»); all 408 labels scanned | 1 | ksp_so_10#0 | 0 |
| future-dated words vs the card deadline (rằm, tết, ngày giỗ, future «N tháng»); past ones («đêm qua», «tuần trước», «đã nửa tháng») and durations of the ask («hoãn một năm») kept | 10 | gd_tinh_5#0/#1 (đêm rằm → đêm hẹn, title + label too), st_uoc_10#0 (đợi ba tháng / ở được một tháng → còn xa / không thể ở lâu), off_dan_6#1 (quà tết ×3 → quà ban dịp lễ), vg_dat_8#1 (áo tết → sắp tới), hs_hoa_10#1 (ngày giỗ → lễ cúng sắp tới) | 0 |
nrask-m-scan carries both rules. ksp_so_7 (hh when the player is Hoàng hậu) is covered by E7a2's engine queen-alias filter (Foreman E).
Tests on 65a1421: nrask-m-scan PASS, nrask-scan ALL PASS, nrask-engine ALL PASS. Quickcheck/shots to be re-run after the rebase on E7a2's sha (text-only change since 99aa2c5, which passed both).

## REBASE on q1a a615eb7 (E7a2, rebuilt on main b2a9d34) → b013ddf
review/questline-q1c = 01cc869 + 782eed7 + 4c039a2 + 91d8ab1 (my 4 commits, data unchanged from 65a1421) + b013ddf (site rebuilt) on a615eb7; force-with-lease over 65a1421. Diff vs q1a: only assemble.py (+jnrask_m.js after jnrask.js), jnrask_m.js, nrask-m-scan.js, nrask-m-shots.js (+ generated index.html/sw.js).
Tests on b013ddf: nrask-m-scan PASS; nrask-scan ALL PASS (with q1b b34eaed added: 7 fails, all Q1b keys, 0 men keys); nrask-engine ALL PASS (7c loads every jnrask*.js); nrask-m-shots SHOTS OK Fold + iPad (local only, CDN 401); quickcheck PASS (open 1336 ms, old save ok, perf render 151/156, tab 354/362, buổi 875/781) — core gates: G3 kit-conform FAIL only «tutorial: 0 intro pages (want 4)», the known tutorial flake (Foreman E: not q1c's).

## VERDICT: PASS b013ddf (E7r3 round 3, 18/11 08:20Z). Next: when E7a2 sends the new q1a sha, rebase q1c (data unchanged), run scans + quickcheck, send «READY q1c <sha>».

## READY 154506f (18/11 ~08:45Z): rebased on q1a 90796d3 (E7a2 fix 3, main a2ad240, shared TIME rule). Data/tests identical to PASS b013ddf (git diff empty for jnrask_m.js + both tests). nrask-m-scan PASS, nrask-scan ALL PASS (shared TIME rule included), nrask-engine ALL PASS, quickcheck PASS with core gates PASS (render 161/161, tab 341/360, buổi 1106/916, old save ok).
