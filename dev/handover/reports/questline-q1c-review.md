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
