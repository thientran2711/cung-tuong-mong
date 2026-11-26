# TAINGHE-INFO — report (worker of MAIN CHÍNH 147), branch review/tainghe-info

PRIORITY #1 CHECK: «NĂM BẬC» 0 hits anywhere; «Dung nghi» OD 1 (L995 design) | claims 1 (this job) | main 2 (j85 v85Table, jtabs) | review/* 0. Reused: kitTiers (j79), kitSkillCard §21, kit info-link look (kitInfo «ⓘ»), realtap.js (ROLE B #7), v85Table rule popup. Rules: OD L2079 (info behind one visible kit target), OD L2160 + law 10 (kit dialog sizes — the rule popup is the kit modal, unchanged).

## Root causes (owner bug OD 25/11 ~23:48Z, shot k18)
1. OVERLAP: kit `kitTiers` row = grid `5.2rem | text | chip`, label `white-space:nowrap`. The art/Tứ đức ladder labels «Bậc 1 · Nhập môn · 10 phần» are ~3× wider than 5.2rem → they ran under the reward text in EVERY row of EVERY skill popup (12 skills × 5 rows, both devices).
2. HIDDEN TAP ZONE: `kitSkillCard` turned the «▭▭▭▭▭ Bậc 0/5» step meter into a `<button data-v85tab>` (stepsAttr) — no label, no look of a button. That is what opened the «LUẬT · Dung · Dung nghi» popup she «không biết bấm vô cái gì».
3. NAME DOES NOTHING: the skill name («Công · Nữ công», «Dung · Dung nghi», …) was a plain `<b>`.

## Fix (kit level, whole family)
- `kitTiers` (j79): a label longer than the label column stacks the row (`.ktiers.kstk`): name + threshold (+ «đang ở») on line 1, reward on line 2. Every ladder in the game gets it; short-label ladders (Thang Đức, Thang nguy hiểm) unchanged.
- `kitSkillName(o)` (j79, new): the NAME is the card's one info target — `button.kskn` «ⓘ name», dotted underline = the kit info-link look already used by «ⓘ Cách học» / «ⓘ Tứ đức» in the same tab; ≥32 px tall. `o.info` (old `stepsAttr` still accepted).
- `kitSteps` is never a button any more (no hidden zone).
- Tác phẩm cards (jtabs art works, jtds Tứ đức works) now pass `info` too → every card in every Tài nghệ sub-tab opens its rule popup from its name.
- Shared places (point 4): Tài nghệ shared info already sits in the kit places — «ⓘ Cách học» / «ⓘ Tác phẩm» = the sub-tab bar's trailing slot, «ⓘ Tứ đức» + «ⓘ luật Đức» = the Tứ đức section head; per-skill info = the name; per-act info = the act card's «ⓘ». Teacher PERSON cards inside Tài nghệ are OB-PHU's job (moved to the People tab) — not touched.
- KIT.md §21 + kitTiers line updated.

## Before / after (Tài nghệ, measured by script; dev/test/tainghe-info.js + rule-popup measure)
| check | before (main 5e013076) Fold | before iPad | after Fold | after iPad |
|---|---|---|---|---|
| NĂM BẬC rows with label drawn over the reward (12 skill popups × 5 rows) | 60/60 | 60/60 | 0/60 | 0/60 |
| skill cards whose NAME opens its info (Tứ đức + Cầm kỳ thi họa + Vũ·Y·Nữ công) | 0/12 | 0/12 | 12/12 | 12/12 |
| Tác phẩm cards whose name opens its info | 0/12 | 0/12 | 12/12 | 12/12 |
| hidden unlabelled tap zones (button.ksteps) per sub-tab | 4 | 4 | 0 | 0 |
| real tap name → popup of THAT skill → ✕ closes, still Tài nghệ | n/a | n/a | 28/28 PASS | 28/28 PASS |

## Whole-game audit (every bottom tab × every sub-tab, Fold + iPad, REAL taps): dev/test/info-tap-audit.js
Every visible info target in the panel (kit «ⓘ»/dotted words .kgl, «!» .khap, skill names .kskn, ladi links) is real-tapped; a popup must open and no kit row/tier in it may overlap; unlabelled pointer zones are listed.
- before (main): 104 targets PASS, 0 FAIL (the tap-dead skill names and hidden step buttons are not info targets there, so they show in the Tài nghệ table above, not here)
- after (branch, final run): 123 targets PASS, 0 FAIL (ALL PASS)
- Notes: Dư đồ place «!» (`.khap[role=img]`) is a status mark inside the labelled place button (tap = go to the place) — not an info target, excluded. Sub-tabs past the right edge of a scrolling tab bar (Tư trang iPad: Tác phẩm/Dấu ấn/Tạp vật; Hành sự iPad) are reached by a swipe; the harness scrolls the bar. No unlabelled tap zone found in any panel after the fix. Not changed, noted for MAIN: Mệnh truyện/Khuê các story cards (`.kskill[data-skill^=story-]`, jgoal) open the goal detail from a tap anywhere on the card — a whole-card target (it has a visible title, so not hidden; left as is).

Full after table:

| dev | screen | target | ok | result |
|---|---|---|---|---|
| fold | Hậu cung › Gặp ngài ban ngày 1/4 | khap «! Xem thêm» | PASS | modal: ĐIỀU Hoàng thượng ✕ Hiếu thảo: Thái hậu  |
| fold | Hậu cung › Gặp ngài ban ngày 1/4 | kgl «Sủng» | PASS | kpop: Sủng Hoàng thượng thương ta bao nhiêu (0 |
| fold | Hậu cung › Gặp ngài ban ngày 1/4 | kgl «Biết tên» | PASS | kpop: Quen biết Ta biết người này đến đâu: Ngư |
| fold | Hậu cung › Gặp ngài ban ngày 1/4 | kgl «Hiếu thảo» | PASS | kpop: Hiếu thảo Thái hậu không gật đầu thì khô |
| fold | Hậu cung › Gặp ngài ban ngày 1/4 | kgl «Mê sắc» | PASS | kpop: Mê sắc Sắc đẹp và tài múa nặng gấp đôi k |
| fold | Hậu cung › Gặp ngài ban ngày 1/4 | kgl «sắc» | PASS | kpop: sắc Sắc đẹp và tài múa nặng gấp đôi khi  |
| fold | Hậu cung › Gặp ngài ban ngày 1/4 | kgl «Trong cung: Chương 1: Sơ nhập cung môn. » | PASS | kpop: Trong cung: Chương 1: Sơ nhập cung môn.  |
| fold | Hậu cung › Gặp ngài ban ngày 1/4 | khap «! Dạo này» | PASS | kpop: Dạo này Trong cung: Chương 1: Sơ nhập cu |
| fold | Hậu cung › Gặp ngài ban ngày 1/4 | kgl «ⓘ» | PASS | modal: ĐIỀU Dâng quà lên Hoàng thượng ✕ TỐN 2 k |
| fold | Hậu cung › Việc hôm nay 1/2 | khap «! Xem thêm» | PASS | modal: ĐIỀU Hoàng thượng ✕ Hiếu thảo: Thái hậu  |
| fold | Hậu cung › Việc hôm nay 1/2 | kgl «Sủng» | PASS | kpop: Sủng Hoàng thượng thương ta bao nhiêu (0 |
| fold | Hậu cung › Việc hôm nay 1/2 | kgl «Biết tên» | PASS | kpop: Quen biết Ta biết người này đến đâu: Ngư |
| fold | Hậu cung › Việc hôm nay 1/2 | kgl «Hiếu thảo» | PASS | kpop: Hiếu thảo Thái hậu không gật đầu thì khô |
| fold | Hậu cung › Việc hôm nay 1/2 | kgl «Mê sắc» | PASS | kpop: Mê sắc Sắc đẹp và tài múa nặng gấp đôi k |
| fold | Hậu cung › Việc hôm nay 1/2 | kgl «sắc» | PASS | kpop: sắc Sắc đẹp và tài múa nặng gấp đôi khi  |
| fold | Hậu cung › Việc hôm nay 1/2 | kgl «Trong cung: Chương 1: Sơ nhập cung môn. » | PASS | kpop: Trong cung: Chương 1: Sơ nhập cung môn.  |
| fold | Hậu cung › Việc hôm nay 1/2 | khap «! Dạo này» | PASS | kpop: Dạo này Trong cung: Chương 1: Sơ nhập cu |
| fold | Hậu cung › Việc hôm nay 1/2 | kgl «ⓘ» | PASS | kpop: Xin ban hôn cho Vương gia Vương gia dâng |
| fold | Hậu cung › Điều ngài thích | khap «! Xem thêm» | PASS | modal: ĐIỀU Hoàng thượng ✕ Hiếu thảo: Thái hậu  |
| fold | Hậu cung › Điều ngài thích | kgl «Sủng» | PASS | kpop: Sủng Hoàng thượng thương ta bao nhiêu (0 |
| fold | Hậu cung › Điều ngài thích | kgl «Biết tên» | PASS | kpop: Quen biết Ta biết người này đến đâu: Ngư |
| fold | Hậu cung › Điều ngài thích | kgl «Hiếu thảo» | PASS | kpop: Hiếu thảo Thái hậu không gật đầu thì khô |
| fold | Hậu cung › Điều ngài thích | kgl «Mê sắc» | PASS | kpop: Mê sắc Sắc đẹp và tài múa nặng gấp đôi k |
| fold | Hậu cung › Điều ngài thích | kgl «sắc» | PASS | kpop: sắc Sắc đẹp và tài múa nặng gấp đôi khi  |
| fold | Hậu cung › Điều ngài thích | kgl «Trong cung: Chương 1: Sơ nhập cung môn. » | PASS | kpop: Trong cung: Chương 1: Sơ nhập cung môn.  |
| fold | Hậu cung › Điều ngài thích | khap «! Dạo này» | PASS | kpop: Dạo này Trong cung: Chương 1: Sơ nhập cu |
| fold | Giao tình | kgl «Sủng» | PASS | kpop: Sủng Hoàng thượng thương ta bao nhiêu (0 |
| fold | Giao tình | kgl «Ân tình» | PASS | kpop: Ân tình Tình nghĩa riêng giữa Hoàng thượ |
| fold | Tư trang › Tất cả 13 | kgl «Sắc» | PASS | kpop: Sắc Nhan sắc. Giúp múa, thị tẩm và được  |
| fold | Tư trang › Trang sức 1 | kgl «Sắc» | PASS | kpop: Sắc Nhan sắc. Giúp múa, thị tẩm và được  |
| fold | Tư trang › Y phục 2 | kgl «Sắc» | PASS | kpop: Sắc Nhan sắc. Giúp múa, thị tẩm và được  |
| fold | Tư trang › Vải vóc 0 | kgl «Sắc» | PASS | kpop: Sắc Nhan sắc. Giúp múa, thị tẩm và được  |
| fold | Tư trang › Thuốc men 0 | kgl «Sắc» | PASS | kpop: Sắc Nhan sắc. Giúp múa, thị tẩm và được  |
| fold | Tư trang › Hương liệu 0 | kgl «Sắc» | PASS | kpop: Sắc Nhan sắc. Giúp múa, thị tẩm và được  |
| fold | Tư trang › Lễ vật 0 | kgl «Sắc» | PASS | kpop: Sắc Nhan sắc. Giúp múa, thị tẩm và được  |
| fold | Tư trang › Thư từ 0 | kgl «Sắc» | PASS | kpop: Sắc Nhan sắc. Giúp múa, thị tẩm và được  |
| fold | Tư trang › Tác phẩm 0 | kgl «Sắc» | PASS | kpop: Sắc Nhan sắc. Giúp múa, thị tẩm và được  |
| fold | Tư trang › Dấu ấn 2 | kgl «Sắc» | PASS | kpop: Sắc Nhan sắc. Giúp múa, thị tẩm và được  |
| fold | Tư trang › Tạp vật 8 | kgl «Sắc» | PASS | kpop: Sắc Nhan sắc. Giúp múa, thị tẩm và được  |
| fold | Tài nghệ › Tứ đức 9/9 | kgl «ⓘ Cách học» | PASS | kpop: Cách học Mỗi buổi học tốn 2 khắc. Tự học |
| fold | Tài nghệ › Tứ đức 9/9 | kgl «ⓘ Tứ đức» | PASS | kpop: Tứ đức Bốn môn của nữ nhi trong cung (Cô |
| fold | Tài nghệ › Tứ đức 9/9 | lnk «ⓘ luật Đức» | PASS | modal: LUẬT Đức Ai cũng có Đức; việc làm thật m |
| fold | Tài nghệ › Tứ đức 9/9 | kskn «ⓘ Công · Nữ công Xem luật Công · Nữ công» | PASS | modal: LUẬT Công · Nữ công Thêu thùa, may vá, b |
| fold | Tài nghệ › Tứ đức 9/9 | kgl «ⓘ» | PASS | modal: ĐIỀU Tự rèn Công ✕ TỐN 2 khắc·Sức -15 ĐƯ |
| fold | Tài nghệ › Tứ đức 9/9 | kskn «ⓘ Dung · Dung nghi Xem luật Dung · Dung » | PASS | modal: LUẬT Dung · Dung nghi Dáng đi, cách đứng |
| fold | Tài nghệ › Cầm kỳ thi họa 8/12 | kgl «ⓘ Cách học» | PASS | kpop: Cách học Mỗi buổi học tốn 2 khắc. Tự học |
| fold | Tài nghệ › Cầm kỳ thi họa 8/12 | kskn «ⓘ Cầm Xem luật Cầm» | PASS | modal: LUẬT Cầm Tài: thơ, đàn, thi tài; dễ được |
| fold | Tài nghệ › Cầm kỳ thi họa 8/12 | kgl «ⓘ» | PASS | modal: ĐIỀU Tự học Cầm ✕ TỐN 2 khắc·Sức -15 ĐƯỢ |
| fold | Tài nghệ › Cầm kỳ thi họa 8/12 | kskn «ⓘ Kỳ Xem luật Kỳ» | PASS | modal: LUẬT Kỳ Tài và Tâm cơ: đánh cờ, đoán ý n |
| fold | Tài nghệ › Vũ · Y · Nữ công 8/12 | kgl «ⓘ Cách học» | PASS | kpop: Cách học Mỗi buổi học tốn 2 khắc. Tự học |
| fold | Tài nghệ › Vũ · Y · Nữ công 8/12 | kskn «ⓘ Vũ Xem luật Vũ» | PASS | modal: LUẬT Vũ Sắc: múa ở yến tiệc, được chú ý  |
| fold | Tài nghệ › Vũ · Y · Nữ công 8/12 | kgl «ⓘ» | PASS | modal: ĐIỀU Tự học Vũ ✕ TỐN 2 khắc·Sức -15 ĐƯỢC |
| fold | Tài nghệ › Vũ · Y · Nữ công 8/12 | kskn «ⓘ Y thuật & điều hương Xem luật Y thuật » | PASS | modal: LUẬT Y thuật & điều hương Sắc: điều hươn |
| fold | Tài nghệ › Tác phẩm | kgl «ⓘ Tác phẩm» | PASS | kpop: Tác phẩm Mỗi buổi học hay tự học mà tự t |
| fold | Tài nghệ › Tác phẩm | kskn «ⓘ Cầm Xem luật Cầm» | PASS | modal: LUẬT Cầm Tài: thơ, đàn, thi tài; dễ được |
| fold | Tài nghệ › Tác phẩm | kskn «ⓘ Vũ Xem luật Vũ» | PASS | modal: LUẬT Vũ Sắc: múa ở yến tiệc, được chú ý  |
| fold | Tài nghệ › Tác phẩm | kskn «ⓘ Y thuật & điều hương Xem luật Y thuật » | PASS | modal: LUẬT Y thuật & điều hương Sắc: điều hươn |
| fold | Tài nghệ › Tác phẩm | kskn «ⓘ Kỳ Xem luật Kỳ» | PASS | modal: LUẬT Kỳ Tài và Tâm cơ: đánh cờ, đoán ý n |
| fold | Tài nghệ › Tác phẩm | kskn «ⓘ Thi Xem luật Thi» | PASS | modal: LUẬT Thi Tài: làm thơ, bàn chuyện với Ho |
| fold | Mệnh truyện › Chương này | kgl «ⓘ Luật chương» | PASS | kpop: Luật chương Mỗi chương truyện có hạn. Mở |
| fold | Mệnh truyện › Sắc phong | kgl «ⓘ Luật chương» | PASS | kpop: Luật chương Mỗi chương truyện có hạn. Mở |
| fold | Mệnh truyện › Sắc phong | kgl «ⓘ Ngôi Hoàng hậu» | PASS | kpop: Ngôi Hoàng hậu Ngôi Hoàng hậu cần: ngôi  |
| fold | Mệnh truyện › Sắc phong | kgl «ⓘ Khảo hạch tấn phong» | PASS | kpop: Khảo hạch tấn phong Đủ điều kiện sắc pho |
| fold | Mệnh truyện › Đã qua 0 | kgl «ⓘ Luật chương» | PASS | kpop: Luật chương Mỗi chương truyện có hạn. Mở |
| fold | Mệnh truyện › Triều cục | kgl «ⓘ Luật chương» | PASS | kpop: Luật chương Mỗi chương truyện có hạn. Mở |
| fold | Mệnh truyện › Tâm nguyện | kgl «ⓘ Tâm nguyện» | PASS | kpop: Tâm nguyện Mỗi người có một tâm nguyện.  |
| ipad | Hậu cung › Gặp ngài ban ngày 1/4 | khap «! Xem thêm» | PASS | modal: ĐIỀU Hoàng thượng ✕ Đa tình: Thị tẩm nhi |
| ipad | Hậu cung › Gặp ngài ban ngày 1/4 | kgl «Sủng» | PASS | kpop: Sủng Hoàng thượng thương ta bao nhiêu (0 |
| ipad | Hậu cung › Gặp ngài ban ngày 1/4 | kgl «Biết tên» | PASS | kpop: Quen biết Ta biết người này đến đâu: Ngư |
| ipad | Hậu cung › Gặp ngài ban ngày 1/4 | kgl «Đa tình» | PASS | kpop: Đa tình Thị tẩm nhiều, rải khắp hậu cung |
| ipad | Hậu cung › Gặp ngài ban ngày 1/4 | kgl «Hiếu thảo» | PASS | kpop: Hiếu thảo Thái hậu không gật đầu thì khô |
| ipad | Hậu cung › Gặp ngài ban ngày 1/4 | kgl «Trong cung: Chương 1: Sơ nhập cung môn. » | PASS | kpop: Trong cung: Chương 1: Sơ nhập cung môn.  |
| ipad | Hậu cung › Gặp ngài ban ngày 1/4 | khap «! Dạo này» | PASS | kpop: Dạo này Trong cung: Chương 1: Sơ nhập cu |
| ipad | Hậu cung › Việc hôm nay | khap «! Xem thêm» | PASS | modal: ĐIỀU Hoàng thượng ✕ Đa tình: Thị tẩm nhi |
| ipad | Hậu cung › Việc hôm nay | kgl «Sủng» | PASS | kpop: Sủng Hoàng thượng thương ta bao nhiêu (0 |
| ipad | Hậu cung › Việc hôm nay | kgl «Biết tên» | PASS | kpop: Quen biết Ta biết người này đến đâu: Ngư |
| ipad | Hậu cung › Việc hôm nay | kgl «Đa tình» | PASS | kpop: Đa tình Thị tẩm nhiều, rải khắp hậu cung |
| ipad | Hậu cung › Việc hôm nay | kgl «Hiếu thảo» | PASS | kpop: Hiếu thảo Thái hậu không gật đầu thì khô |
| ipad | Hậu cung › Việc hôm nay | kgl «Trong cung: Chương 1: Sơ nhập cung môn. » | PASS | kpop: Trong cung: Chương 1: Sơ nhập cung môn.  |
| ipad | Hậu cung › Việc hôm nay | khap «! Dạo này» | PASS | kpop: Dạo này Trong cung: Chương 1: Sơ nhập cu |
| ipad | Hậu cung › Điều ngài thích | khap «! Xem thêm» | PASS | modal: ĐIỀU Hoàng thượng ✕ Đa tình: Thị tẩm nhi |
| ipad | Hậu cung › Điều ngài thích | kgl «Sủng» | PASS | kpop: Sủng Hoàng thượng thương ta bao nhiêu (0 |
| ipad | Hậu cung › Điều ngài thích | kgl «Biết tên» | PASS | kpop: Quen biết Ta biết người này đến đâu: Ngư |
| ipad | Hậu cung › Điều ngài thích | kgl «Đa tình» | PASS | kpop: Đa tình Thị tẩm nhiều, rải khắp hậu cung |
| ipad | Hậu cung › Điều ngài thích | kgl «Hiếu thảo» | PASS | kpop: Hiếu thảo Thái hậu không gật đầu thì khô |
| ipad | Hậu cung › Điều ngài thích | kgl «Trong cung: Chương 1: Sơ nhập cung môn. » | PASS | kpop: Trong cung: Chương 1: Sơ nhập cung môn.  |
| ipad | Hậu cung › Điều ngài thích | khap «! Dạo này» | PASS | kpop: Dạo này Trong cung: Chương 1: Sơ nhập cu |
| ipad | Giao tình | kgl «Sủng» | PASS | kpop: Sủng Hoàng thượng thương ta bao nhiêu (0 |
| ipad | Giao tình | kgl «Ân tình» | PASS | kpop: Ân tình Tình nghĩa riêng giữa Hoàng thượ |
| ipad | Tư trang › Tất cả 14 | kgl «Sắc» | PASS | kpop: Sắc Nhan sắc. Giúp múa, thị tẩm và được  |
| ipad | Tư trang › Trang sức 1 | kgl «Sắc» | PASS | kpop: Sắc Nhan sắc. Giúp múa, thị tẩm và được  |
| ipad | Tư trang › Y phục 2 | kgl «Sắc» | PASS | kpop: Sắc Nhan sắc. Giúp múa, thị tẩm và được  |
| ipad | Tư trang › Vải vóc 0 | kgl «Sắc» | PASS | kpop: Sắc Nhan sắc. Giúp múa, thị tẩm và được  |
| ipad | Tư trang › Thuốc men 0 | kgl «Sắc» | PASS | kpop: Sắc Nhan sắc. Giúp múa, thị tẩm và được  |
| ipad | Tư trang › Hương liệu 0 | kgl «Sắc» | PASS | kpop: Sắc Nhan sắc. Giúp múa, thị tẩm và được  |
| ipad | Tư trang › Lễ vật 0 | kgl «Sắc» | PASS | kpop: Sắc Nhan sắc. Giúp múa, thị tẩm và được  |
| ipad | Tư trang › Thư từ 0 | kgl «Sắc» | PASS | kpop: Sắc Nhan sắc. Giúp múa, thị tẩm và được  |
| ipad | Tư trang › Tác phẩm 0 | kgl «Sắc» | PASS | kpop: Sắc Nhan sắc. Giúp múa, thị tẩm và được  |
| ipad | Tư trang › Dấu ấn 3 | kgl «Sắc» | PASS | kpop: Sắc Nhan sắc. Giúp múa, thị tẩm và được  |
| ipad | Tư trang › Tạp vật 8 | kgl «Sắc» | PASS | kpop: Sắc Nhan sắc. Giúp múa, thị tẩm và được  |
| ipad | Tài nghệ › Tứ đức 9/9 | kgl «ⓘ Cách học» | PASS | kpop: Cách học Mỗi buổi học tốn 2 khắc. Tự học |
| ipad | Tài nghệ › Tứ đức 9/9 | kgl «ⓘ Tứ đức» | PASS | kpop: Tứ đức Bốn môn của nữ nhi trong cung (Cô |
| ipad | Tài nghệ › Tứ đức 9/9 | lnk «ⓘ luật Đức» | PASS | modal: LUẬT Đức Ai cũng có Đức; việc làm thật m |
| ipad | Tài nghệ › Tứ đức 9/9 | kskn «ⓘ Công · Nữ công Xem luật Công · Nữ công» | PASS | modal: LUẬT Công · Nữ công Thêu thùa, may vá, b |
| ipad | Tài nghệ › Tứ đức 9/9 | kgl «ⓘ» | PASS | modal: ĐIỀU Tự rèn Công ✕ TỐN 2 khắc·Sức -15 ĐƯ |
| ipad | Tài nghệ › Cầm kỳ thi họa 8/12 | kgl «ⓘ Cách học» | PASS | kpop: Cách học Mỗi buổi học tốn 2 khắc. Tự học |
| ipad | Tài nghệ › Cầm kỳ thi họa 8/12 | kskn «ⓘ Cầm Xem luật Cầm» | PASS | modal: LUẬT Cầm Tài: thơ, đàn, thi tài; dễ được |
| ipad | Tài nghệ › Cầm kỳ thi họa 8/12 | kgl «ⓘ» | PASS | modal: ĐIỀU Tự học Cầm ✕ TỐN 2 khắc·Sức -15 ĐƯỢ |
| ipad | Tài nghệ › Vũ · Y · Nữ công 8/12 | kgl «ⓘ Cách học» | PASS | kpop: Cách học Mỗi buổi học tốn 2 khắc. Tự học |
| ipad | Tài nghệ › Vũ · Y · Nữ công 8/12 | kskn «ⓘ Vũ Xem luật Vũ» | PASS | modal: LUẬT Vũ Sắc: múa ở yến tiệc, được chú ý  |
| ipad | Tài nghệ › Vũ · Y · Nữ công 8/12 | kgl «ⓘ» | PASS | modal: ĐIỀU Tự học Vũ ✕ TỐN 2 khắc·Sức -15 ĐƯỢC |
| ipad | Tài nghệ › Tác phẩm | kgl «ⓘ Tác phẩm» | PASS | kpop: Tác phẩm Mỗi buổi học hay tự học mà tự t |
| ipad | Tài nghệ › Tác phẩm | kskn «ⓘ Cầm Xem luật Cầm» | PASS | modal: LUẬT Cầm Tài: thơ, đàn, thi tài; dễ được |
| ipad | Tài nghệ › Tác phẩm | kskn «ⓘ Họa Xem luật Họa» | PASS | modal: LUẬT Họa Tài: vẽ tranh dâng tặng, Thái h |
| ipad | Tài nghệ › Tác phẩm | kskn «ⓘ Kỳ Xem luật Kỳ» | PASS | modal: LUẬT Kỳ Tài và Tâm cơ: đánh cờ, đoán ý n |
| ipad | Tài nghệ › Tác phẩm | kskn «ⓘ Thi Xem luật Thi» | PASS | modal: LUẬT Thi Tài: làm thơ, bàn chuyện với Ho |
| ipad | Mệnh truyện › Chương này | kgl «ⓘ Luật chương» | PASS | kpop: Luật chương Mỗi chương truyện có hạn. Mở |
| ipad | Mệnh truyện › Sắc phong | kgl «ⓘ Luật chương» | PASS | kpop: Luật chương Mỗi chương truyện có hạn. Mở |
| ipad | Mệnh truyện › Sắc phong | kgl «ⓘ Ngôi Hoàng hậu» | PASS | kpop: Ngôi Hoàng hậu Ngôi Hoàng hậu cần: ngôi  |
| ipad | Mệnh truyện › Sắc phong | kgl «ⓘ Khảo hạch tấn phong» | PASS | kpop: Khảo hạch tấn phong Đủ điều kiện sắc pho |
| ipad | Mệnh truyện › Đã qua 0 | kgl «ⓘ Luật chương» | PASS | kpop: Luật chương Mỗi chương truyện có hạn. Mở |
| ipad | Mệnh truyện › Triều cục | kgl «ⓘ Luật chương» | PASS | kpop: Luật chương Mỗi chương truyện có hạn. Mở |
| ipad | Mệnh truyện › Tâm nguyện | kgl «ⓘ Tâm nguyện» | PASS | kpop: Tâm nguyện Mỗi người có một tâm nguyện.  |
ALL PASS


## Delivery
- CDN review folder: https://ctm-img.victoria-tntt.workers.dev/img/_review/tainghe-info/ — tainghe-info-fold-755x1000.mp4, tainghe-info-ipad-1180x820.mp4 (real taps, red dot = tap; every sub-tab, every skill name → its popup → ✕), before-ipad-dungnghi-popup.png, after-ipad-dungnghi-popup.png, after-fold-dungnghi-popup.png
- Tests: node dev/test/tainghe-info.js [index.html] [out] (ALL PASS Fold+iPad); node dev/test/info-tap-audit.js [index.html] [out.json] (ALL PASS Fold+iPad).

## r3 — kit tap size (LC18 note via MAIN 148)
`.kskn` was 32 px tall (< 44 px kit tap size). Fix at kit level for the whole family: every kit info target (`.kgl`, `.khap`, `.kskn`, `button.ladi`) gets an invisible centred `::after` hit area of at least 44 × 44 px (`:where()` = no specificity, so parts already positioned keep their position; z-index 1; look unchanged; rows do not grow).
info-tap-audit.js now measures the real hit area through the target's centre (elementFromPoint, ±40 px) and FAILs < 44 px, except a side that stops at ANOTHER tap target (two targets closer than 44 px share the gap) or at the clip box of a fixed one-line row (§6.3h person rows).
| measure (Fold) | before r3 | after r3 |
|---|---|---|
| info targets with hit < 44 px and no neighbour/clip reason | 65 / 119 | 0 |
| e.g. «ⓘ Cầm» skill name | 58 × 32 | ≥ 44 × 44 |
| e.g. «! Xem thêm» / «! Dạo này» | 20 × 20 | ≥ 44 × 44 (or neighbour-limited) |
| e.g. «ⓘ Cách học» | 81 × 17 | 81 × 44 |
Full run Fold + iPad: ALL PASS (Fold 117 rows incl. sub-tabs, iPad ALL PASS after the horizontal tab-bar scroll fix in the harness).

## r4 — hit area only into empty space (LC19 / MAIN 150: r3's fixed 44×44 ::after stole taps from neighbour controls)
- `kitHitGrow` (j79) replaces the fixed box: per target it measures the free room on each side and grows toward 44 px ONLY there — never over another tap control, never past the largest box around it that holds no other control (its row, its card head), never out of its sticky bar / clip box, nothing when it sits inside a control (a «!» on a card, «ⓘ» in an act button). No room → no layer and no `position:relative` (the part is exactly as on main). Runs throttled (120 ms) on DOM change / scroll / resize; ignores kitInfoOneLine's own «!» re-draws.
- `kitInfoOneLine` (jk4) keeps its row «!» when it is still needed instead of removing and re-making it on every pass (main: 31 new «!» elements in 2 s on a person card → 5); taps on «! Dạo này» no longer land on a thrown-away node.
- Tab-bar info slot `.pctabs>.pctinfo` spans the bar height (align-self:stretch), so «ⓘ Cách học» can grow over its own bar.
- Gates (all on this sha): info-tap-audit.js Fold + iPad → 1 row of 238 not measured: «Biết tên» on iPad was re-drawn before its hit could be measured; its popup opened. Every other target is ≥ 44 or stops at a neighbour / its box. tainghe-info.js ALL PASS. dev/test/hit-overlap-lc19.js (LC19's tool, now with/without the layers via `html.khg-off`): 0 points taken by the grown layers from a reachable control (GROW 0); the remaining overlap/steal rows are the same kind as on main (seeded SEED=7: main 123, branch 99) — a part's OWN box over a neighbour, not the hit layer.
- Note: dev/test/kit-info-fixed.js Fold FAILs from a sparse worktree directory for main's own build too (environment: local img/), PASS from /home/user/cung-tuong-mong — not this change.
