# Q1c review (men help asks, jnrask_m.js) — FAIL b99f4bc
PRIORITY #1 CHECK: OD L644/L1072/L1243/L1252/L1601 | main jnroadm.js nrMenRival/nrVoiceM, jnroad.js nrMRival + stock nr_* cards, BAL.nroad.dl=6 (jbal2.js:360) | review/questline-q1a 1b6005a (engine), review/questline-q1b 255f5b2a, review/questline-q1c b99f4bc (this) | claims E7c2 session_01DgYSWkXhh7hPLBJjzFYMWJ
Reviewer E7cr (Foreman E). Independent read of all 204 asks (dump of NRASK on the merge), not the worker report.

## Setup
Local merge (not pushed): origin/review/questline-q1a 1b6005a + q1b 255f5b2a + q1c b99f4bc; assemble.py order `jnroadm.js, jnrask.js, jnrask_b.js, jnrask_m.js`; site rebuilt (build_site.sh). Only q1c's own diff judged (jnrask_m.js, nrask-m-scan.js, nrask-m-shots.js, one assemble line).

## Tests (run myself)
| test | result |
|---|---|
| node dev/test/nrask-scan.js | ALL PASS — 636 asks, no shared sentence/label/loss line |
| node dev/test/nrask-engine.js | ALL PASS (fallback, old saves, play/betray, no page errors) |
| node dev/test/nrask-m-scan.js | PASS — 17 roads (hz excluded), 204 asks |
| bash dev/tools/quickcheck.sh | QUICKCHECK PASS · core gates PASS (one-core-guard, rules-one-source, kit-conform) · old save ok · time-spill PASS · perf render 156/150, tab 294/281, buổi 778/851 |
| node dev/test/nrask-m-shots.js (Fold 755x1000@2, iPad 1180x820@2) | SHOTS OK, 8 shots, looked at all (local only, /home/user/wt/e7cr-shots, deleted after verdict) |

Shots: kit quest card + Việc nhờ tab option cards (KIT §6.2) only, ladder words (Năm ăn năm thua / Khá chắc / Chắc), no %, no overflow/cut text, names veiled as «Đáp ứng ???» / «Thị vệ ???». Voice slots resolve (thần / nô tài / tiểu chủ). BUT the iPad and Fold tq_an_7 offer shows «… hẹn ba ngày …» next to the chip «hạn 6 tuần» (fix 4).

## What is good
Wording is cổ trang, no %, no digits, no typed self-pronoun in any ask (scan: hits are only «người ta», «cung mình», narration «ngươi»); every option has a cost word matching its stock cost; two different kinds per chapter; asks follow the expert B2 men row (official: a word in the harem / a memorial; eunuch: post, cover; Vương gia: a message, an alliance; Thái y: protection, records; guard: cover, a night absence; envoy: an audience) and B4 voices; love only as risk taken (gd_tinh); princes never ask. ONE CORE: no game number typed (stock costs/odds kept).

## On the worker's note (men rival = any S.men man)
The engine is right and cannot do better: S.men holds exactly ONE man per trade (j22 MROLES: Thái y, Vương gia, Nhạc sư, Sứ thần, Họa sư) plus 4 Thị vệ (j22 + jmen menGuards). So a Họa sư / Nhạc sư / Thái y / Sứ thần / Vương gia NEVER has a rival of his own trade, and a Thị vệ has a fellow guard only 3 times in 8. {B} prints with his trade («Nhạc sư Tiêu …»). Therefore the TEXT must be true for a man of ANOTHER trade. Court men (tq/ksp, court Thái y) get a consort as {B}; staff eunuchs (eun_len, nrMRival) get another house's eunuch; house heads (off) get another house head. Many asks break this — fixes 1–3.

## FAIL — fixes for the worker (whole group, rescan after)
1. **{B} cast into the asker's own trade or rank (false for the rival the engine gives)** — rewrite so {B} is only the man standing behind it (sends people, pays, spreads words), the trade action done by a plain noun («một kẻ trong họa viện», «người giữ kho phổ»):
   gd_tinh_5#1 ({B} đổi ca), gd_tl_6#1 ({B} ghen vì được đổi ca, gài người vào ca), gd_tl_9#0 ({B} biết trước đề khảo võ), hs_hoa_5#1 ({B} được giao vẽ cùng), hs_hoa_6#0 ({B} cũng nhận hộp bạc để vẽ), hs_hoa_7#1 (chỉ {B} giữ chìa hũ son họa viện), ns_tho_5#1 (người giữ kho phổ là {B}), ns_tho_9#0 ({B} chép trộm khúc, đem dâng), st_uoc_6#1 ({B} hứa để đổi lấy điều khoản), ty_thu_7#1 (từ miệng {B} lan khắp Thái y viện), ty_tra_6#1 (mực kê đơn Thái y viện → người viết là {B}), ty_tra_8#0 ({B} đem sổ Ngự dược phòng lên viện phán), vg_bien_5#0 (người giữ kho Nội vụ phủ do {B} tiến cử), vg_dat_6#0 (tri phủ đất phong là người của {B}); and «phủ {B}» for the Vương gia's rival (no man of S.men but the Vương gia himself has a phủ): vg_bien_6#1, vg_bien_9#1, vg_dat_7#1. Add a scan rule to nrask-m-scan (e.g. per-group allow-list of verbs after {B}) or at least a reviewed list in the report.
2. **ty roads serve two askers**: the S.men Thái y ({B} = a man) and the court Thái y S.court.ty (g "court", {B} = a CONSORT, nrMenRival court branch). Every ty ask must read for both: no «hắn»/«nàng» bound to {B}, no male-only or harem-only role for {B}. Breaks: ty_thu_5#1, ty_thu_7#1, ty_tra_6#1, ty_tra_10#1 («hắn» after {B}). Add a nrask-m-scan check: ty_* asks have no hắn/nàng/phủ/cung tied to {B}.
3. **eun_len {B} = another house's staff eunuch** (nrMRival): eun_len_9#1 («Quan Nội vụ phủ … là người của {B}») and eun_len_5#1 («người hầu của {B}») give a little eunuch an official / a servant under him — reword («người bên cung chủ của {B}», or drop {B} from that sentence).
4. **Time words contradict the card's deadline** (BAL.nroad.dl = 6 tuần, shown on the same card; true information only, HANDOVER L46): gd_kho_7#0 «Ngày mai», ty_tra_10#0 «Ngày mai», ty_tra_10#1 «Buổi xét ngày mai», tq_an_7#0 «hạn cho ba ngày», tq_an_7#1 «hẹn ba ngày», off_dan_10#0 «trong ba ngày», st_uoc_9#0 «đêm nay», ns_tho_10#1 «Đêm trước tiệc thọ … ngay đêm nay» (ask + label). Use «sắp», «chẳng còn bao lâu», «trước buổi xét». Add a scan word list (ngày mai / đêm nay / N ngày).
5. **Handout asks (owner L1601 (2) "xin tiền xin bạc"; expert B8: money only as Hao)**: eun_len_5#0 («Lão ưa trà … {me} không mua nổi. Xin ban cho một gói») is a gift request — rewrite to a non-material ask (vouch for him to the old eunuch; the tea stays only as the bạc option's cost). ty_tra_7#0 («nếu kho riêng còn, xin cho {me} một nhánh» sâm): reword as getting the sâm issued in her palace's name, not a gift from her.
6. **off_ghe_5#0** states «Con gái nhà ấy đang ở hậu cung» for any rival house; j55 houses are ministries and need not have a daughter in the palace (true information). Reword as conditional or a kinswoman/maid («người nhà phủ ấy có kẻ hầu trong cung»); same check for off_ghe_10#1 and off_dan_8#1 («cung có người nhà ở phủ {B}»).

Optional (not blocking): narration loss lines use «nô tài» as a noun for the eunuch (tq_que_6#1, tq_que_9#1, tq_que_10#0, tq_an_5#1 «thân với nô tài»); VANPHONG §2 keeps nô tài as the self-word — «thái giám» reads cleaner.

## Not q1c's (for Foreman E to route)
- nrVoiceM (jnroadm.js:147, main) gives every S.men man «thần»; VANPHONG §2 l.139 says Thái y/quan/sứ thần/họa sư/nhạc sư → «vi thần», Thị vệ → «nô tài»/«ti chức». Engine owner's call (Foreman B/D), not the data file.

## After the fixes
Re-run nrask-scan, nrask-m-scan (with the new checks), nrask-engine, quickcheck on the q1a+q1b+q1c merge; then a re-review of the changed asks only.

## ROUND 2 — FAIL 99aa2c5 (reviewer E7cr2, 18/11)
PRIORITY #1 CHECK: OD L644/L1072/L1243/L1252/L1601 | main none (Q1 not on main) | review/questline-q1a 54f10e8, review/questline-q1b 2b80a8a, review/questline-q1c 99aa2c5 (this) | claims E7c2 session_01DgYSWkXhh7hPLBJjzFYMWJ
START_CTX ~15 %. Independent read of all 204 asks (NRASK dump of jnrask_m.js on the merge), not the worker report.

### Setup
Local merge, not pushed: origin/main 09b1bba + q1a 54f10e8 + q1b 2b80a8a + q1c 99aa2c5; assemble.py = main list + `jnroadm.js, jnrask.js, jnrask_b.js, jnrask_m.js`; index.html/sw.js rebuilt (build_site.sh).

### Tests (run myself on the merge)
| test | result |
|---|---|
| node dev/test/nrask-scan.js (shared, q1a+q1b rules) | **1 FAIL** — `ksp_so_10[0]: a label is the player's own voice: «mình», never «ngươi»` "Nói với Hoàng thượng ngươi tin sổ ấy" (636 asks, rest PASS) |
| node dev/test/nrask-engine.js | ALL PASS (men voice by trade, no {B} ask without rival, NRSELF queen/Thái y, old saves, no page errors) |
| node dev/test/nrask-m-scan.js | PASS (204 asks; its rules do not cover the two misses below) |
| bash dev/tools/quickcheck.sh | QUICKCHECK PASS (old save ok, time-spill PASS, perf render 190/160, tab 362/374, buổi 962/821) · G3 kit-conform FLAKY: «tutorial: 0 intro pages (want 4)» on the merge in 3 of 4 runs, origin/main 0 of 2 — not q1c data; for Foreman E to route to the q1a engine / coordinator |
| node dev/test/nrask-m-shots.js (Fold 755x1000@2, iPad 1180x820@2; gd_tl_9 men, tq_an_7 court + ksp_so_10:0:court, ty_tra_7:0:men) | default picks SHOTS OK; ksp_so_10 **FAIL 2** (tab options do not match the ask: the label renders «… ta tin sổ ấy», j84 turns «ngươi» into «ta») |

Shots LOOKED at (local only /home/user/wt/e7cr2-shots, deleted after verdict): kit j72 quest card + KIT §6.2 option cards only, ladder words (Khó / Khá chắc), no %, no overflow or cut text, «hạn 6 tuần» chip; voices right (Thị vệ / Tổng quản / Kính sự phòng «nô tài», Thái y «vi thần», call «tiểu chủ»); {B} veiled «Đáp ứng ???» or named (Lâm Lạc Anh in tq_an_7, «nàng ta» fits the consort rival).

### Prior FAIL families — re-scanned whole file
| # | family | round 2 |
|---|---|---|
| 1 | S.men {B} in the asker's trade / given a phủ or post | FIXED — all 15 listed + gd_tl_5#0 read; {B} only stands behind («người của {B}», «bạc của {B}», «người được {B} nâng đỡ»); no «phủ/cung {B}» left in gd/ty/vg/ns/st/hs |
| 2 | ty asks true for a consort {B} (court Thái y) | FIXED — no hắn/nàng/cung/phủ bound to {B} in ty_* («hắn» in ty_thu_9#0 / ty_tra_5#0 is another man) |
| 3 | eun_len {B} = fellow eunuch | FIXED — no servant/official under {B}; eun_len_9#1 middleman reads true |
| 4 | time words vs the 6-week deadline | **NOT WHOLE FAMILY** — the 11 listed are fixed, two of the same kind remain (fix 2) |
| 5 | handout asks | FIXED — eun_len_5#0 vouch (tea only as the bạc cost), ty_tra_7#0 sâm drawn in her palace's name |
| 6 | assumed rival kin in the palace | FIXED — off_ghe_5#0 conditional, off_ghe_10#1 / off_dan_8#1 reworded |
| opt | «nô tài» as a noun in option lines | FIXED (→ «thái giám») |
Rebase changes: off_ghe_5#1 / off_thong_7#1 are {B}-free (every chapter keeps ≥1 {B}-free ask, scan + engine 9 PASS); Thái y asks have no kind «y» (ty_thu_6#0, ty_tra_7#0 che; ty_thu_9#0, ty_tra_9#1 thu; kinds per chapter still differ); voice «nô tài» for Thị vệ/eunuchs reads right in every ask. ONE CORE: no number typed; stock costs/odds kept. hh rule (no hh when asker/player is Hoàng hậu) held by the engine (test 7 PASS).

### FAIL — fixes for the worker
1. **Label in «ngươi» (q1b review fix 7, shared nrask-scan rule)**: dev/build/jnrask_m.js:286 ksp_so_10#0 «Nói với Hoàng thượng ngươi tin sổ ấy» → «… mình tin sổ ấy». Whole family: the shared scan finds no other label with «ngươi» in jnrask_m.js; re-run nrask-scan on the q1a+q1b+q1c merge (must be ALL PASS) and nrask-m-shots with `ksp_so_10:0:court`.
2. **Time words, rest of family 4** (the card says «hạn 6 tuần», BAL.nroad.dl; you already treated «mồng một» in ksp_so_7 as this family):
   - jnrask_m.js:203 st_uoc_10#0 «Ngày tốt kế tiếp phải đợi ba tháng, mà sứ đoàn chỉ ở được một tháng» — a future limit shorter than the deadline; reword without a span («mà sứ đoàn chẳng ở được lâu»).
   - jnrask_m.js:47 gd_tinh_5#0 and :392–393 gd_tinh_5#1 (ask + label «… đêm rằm») — a fixed date like «mồng một»; reword («đêm hẹn», «đêm ấy»).
   - Add to nrask-m-scan TIME: «rằm» and a future span «(một|hai|ba|nửa) tháng» when not «đã … tháng» / «tháng trước» (past spans like «đã nửa tháng», «chậm hai tháng», «từ tháng trước» are fine), then rescan.
Optional (not blocking): jnrask_m.js:26 comment «gd — Thị vệ (… voice thần)» is stale (engine now gives «nô tài»).

### After the fixes
Re-review of the 4 changed asks + the scan diff only.
