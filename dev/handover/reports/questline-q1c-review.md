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

# ROUND 3 — reviewer E7r3 (opus, ONE reviewer for q1a + q1b + q1c), 18/11
PRIORITY #1 CHECK ('questline-q1|NRASK|NRQX|nrAskPick'): OD 0 new | main none (no NRASK on main 9c58140) | review/* questline-q1a a615eb7 · q1b 2f79ae26 · q1c b013ddf (the three under review) | claims E7a2 / E7b / E7c2 (this slice)
START_CTX ≈ 3 % (own estimate).
Setup: LOCAL merge origin/main 9c58140 + q1a a615eb7 + q1b 2f79ae26 + q1c b013ddf (not pushed). **q1a is NOT on newest main any more** (main moved b2a9d34 → 9c58140: place-stage / map-tap-go); only conflict = assemble.py list (main added jplst.js; kept it + jnroadm → jnrask → jnrask_b → jnrask_m) and generated index.html/sw.js (rebuilt with build_site.sh). The landing sha must be rebased on main again.
Method: own NRASK dump of all 636 asks (318 chapters) + whole-family scans across ALL three files (one reviewer → one standard), engine code read (jnroad.js:100–131), tests, shots.

## VERDICT: q1a FAIL · q1b FAIL · q1c PASS
One cross-file family is open: **time words vs the card deadline** (j72 card prints «hạn 6 tuần», BAL.nroad.dl, j72.js:142). Round 2 made this a FAIL family for q1c (E7cr2 fix 2: «rằm», «mồng một», a future span shorter than the deadline) and q1c fixed it + put the rule in nrask-m-scan (men only). The SAME words stand in q1a and q1b data (LUẬT SỬA CẢ NHÓM: the family is the whole help-ask set, not one file). Seen on screen: cn_chu_10#1 Fold offer reads «Đêm mai bổn cung phải đến gian trà nhỏ…» directly above the chip «hạn 6 tuần».
Rule (same as q1c's): no fixed date (đêm nay / tối nay / sáng mai / ngày mai / đêm mai / «Mai …» / rằm / Tết / cuối tháng) and no future span shorter than the deadline («N ngày nữa», «mấy hôm nữa», «trong ba ngày», «trong một tháng»). Kept as fine: event-relative «trước khi …», «trước kỳ khóa sổ», «đêm hẹn», past spans («đã nửa tháng», «ba năm trước»), spans longer than the deadline («ba tháng nữa»), durations of the ask itself («nới hạn thêm một tháng», «hoãn thuế một năm»).

## Tests (merged tree, built)
| test | result |
|---|---|
| node dev/test/nrask-scan.js | ALL PASS · 636 asks, 318 chapters, 1272 labels/loss lines (no rule for time words outside the men file → gap, see q1a fix 2) |
| node dev/test/nrask-m-scan.js | PASS (204 asks) |
| node dev/test/nrask-engine.js | ALL PASS (1–9, 7b, 7c: 92 chapters with queen-naming asks, 2208 draws queen asker + queen player → 0; live queen offers 0; other askers still draw them, 91 chapters) |
| bash dev/tools/quickcheck.sh | QUICKCHECK PASS first run · 408 s · core gates PASS (kit-conform green, no G3 tutorial float this time) · time-spill PASS · open 1556 ms · old save ok · perf new/live render 185/185, tab 387/427, buổi 954/1032 ms |
| own scans | chapters with no {B}-free ask 0/318 · non-hh asks naming the queen 37 (all filtered for a queen asker / player) · chapters left with no ask for a queen asker or player → stock card: 22 (63 when also no rival; engine fallback by design) · «ngươi» in labels 0 · time-word family: q1a 8 asks, q1b 18 asks, q1c 0 |
| shots Fold 755x1000@2 + iPad 1180x820@2 (nrask-shots / nrask-m-shots; local scratch, deleted with this verdict; not in git, CDN not used) | SHOTS OK on all 24 (no overflow, no raw slot, no page error). LOOKED: cn_chu_10#1 offer (Fold) shows the time-word fault above «hạn 6 tuần»; cn_chu_10 tab (iPad) kit option rows Tốn/Thành/Bại + Năm ăn năm thua / Khá chắc; ch_co_8#1 (Fold) «Xin muội muội khéo tiến cử bổn cung hầu ngài ở Ngự thư phòng ít lâu» reads right, no target needed; thd_tho_8#0 (iPad) asks for the paper/ink check, no shared past; ksp_so_10 tab (Fold) label «Nói với Hoàng thượng mình tin sổ ấy», ladder Khó / Chắc; gd_tinh_5#1 (iPad) «đêm hẹn», Thị vệ «nô tài … tiểu chủ», rival veiled «Vương gia ???». Kit j72 card + KIT §6.2 option cards only, no private CSS |
ONE CORE: no number typed in any jnrask*.js (scan: no digits); costs / odds / deadline stock BAL.nroad.*. Old saves: engine test 5 PASS (no p.av → stock), missing entry → stock card (test 4).

## q1c — PASS b013ddf (on q1a a615eb7; lands after q1a, rebased on newest main with it)
| round 2 item | check | state |
|---|---|---|
| fix 1 ksp_so_10#0 label | jnrask_m.js «Nói với Hoàng thượng mình tin sổ ấy»; on screen (Fold tab) the label reads «mình», loss line «Hoàng thượng hỏi sao ta biết sổ Kính sự phòng»; shared nrask-scan «ngươi in labels» 0 on the merged tree | FIXED |
| fix 2 time / deadline family | st_uoc_10#0 «Ngày tốt kế tiếp còn xa, mà sứ đoàn không thể ở lâu»; gd_tinh_5#0/#1 «đêm hẹn» (title + label too, iPad shot read); plus off_dan_6#1, vg_dat_8#1, hs_hoa_10#1 → «dịp lễ» / «sắp tới». My broader sweep (incl. «đêm mai», «N ngày nữa», «cuối tháng», «trong N ngày») finds 0 in jnrask_m.js; remaining spans are past («đã nửa tháng», «đã một tháng», «chậm hai tháng», «ba năm trước») or durations of the ask («hoãn thuế một năm», «sớm một năm») | FIXED (whole file) |
| scan rules | nrask-m-scan.js:37–38 TIME rule + «ngươi» in labels; PASS | FIXED |
| ksp_so_7#1 (names the queen) | filtered by q1a NRQX for a queen asker / player (engine 7c) | OK |
Diff vs q1a = assemble.py (+jnrask_m.js), jnrask_m.js, nrask-m-scan.js, nrask-m-shots.js + generated files only.
Optional (not blocking): stale comment jnrask_m.js:26 «gd — Thị vệ (… voice thần)» (engine gives «nô tài»); the q1c TIME regex misses «đêm mai» / «N ngày nữa» / «cuối tháng» — moot once q1a fix 2 puts the full rule in the shared nrask-scan.
Landing order: q1c needs q1a; if q1a's fix moves its sha, q1c rebases (data unchanged) — no re-review beyond nrask-scan/-m-scan/-engine green on the merge.
