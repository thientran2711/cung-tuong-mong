# Paid tiers: every "pay more for a better version" is worth its silver (owner 15/11 14:50Z, LUẬT SỬA CẢ NHÓM)

Branch review/j83-variety. Scripts: `node dev/test/paid-tiers.js <url>` (game functions, table + FAIL list) and
`python3 dev/test/paid-scan.py` (every event / dialog choice list: a paid option that a cheaper, risk-free option of the same list beats).

## Rule used
A dearer choice must give clearly more than the cheaper one, and the card must show what it gives:
- handmade materials (j83, all 11 kinds): at 5 phần the tier is not lower, selling never loses the material's price, the gift is worth more, the ceiling is not lower;
- lessons: the paid teacher always gives more progress than self-study, whatever the mini-game result;
- veil materials: the veil made at 5 phần is worth at least the extra silver;
- shop goods of one slot / kind: a dearer item gives more;
- event choices: no paid option is beaten by a free, risk-free option of the same choice list.

## Before → after
| group | before | after |
|---|---|---|
| Đồ tự tay, vật liệu tốt/quý (11 loại × 3 bậc) | matQ +0/+1/+2, bán lại 0 (main) · WIP: bán lại 50 % → tốt, quý lỗ khi bán (vd. áo múa tốt 8 bạc, bán thêm 4); quà quý = quà tốt ở bậc 4 (cùng chạm trần 8) — 11 FAIL | matQ +0/+2/+4, chỉ quý thành Tuyệt phẩm, bán lại đủ giá vật liệu (`BAL.wk.sell [0,1,1]`), trần quà cộng giá trị vật liệu (`WCAP + val`): quý tới 10 = Tranh cổ — 0 FAIL |
| Thẻ vật liệu | "chơi được 5 phần" chung chung | "chơi 5 phần: Khá · Tinh xảo: cần chơi 8 phần · Tuyệt phẩm: chỉ vật liệu quý · quà giá trị +1 · bán thêm 6 bạc" |
| Học với thầy (5+5×bậc bạc) | tiến bộ = phần chơi (0..3): chơi 0 → +0 < tự học +1; chơi 1 → +1 = tự học | tiến bộ = max(phần chơi, tự học + 1): +2/+2/+2/+3 vs tự học +1/+1/+1/+2; thẻ "tiến bộ +2..3, luôn hơn tự học 1" (j23, j79, j85) |
| Theo ma ma giáo tập (Tứ đức) | +2..3 vs tự rèn +1 | giữ (đã đáng) |
| Mạng che mặt tự kết | dây bạc 12 bạc: mạng đáng thêm 6..9 bạc (lỗ); thẻ "chơi được 5 phần … chơi giỏi: tới …" | dây bạc 6 bạc; thẻ "chơi 5 phần: Tinh phẩm, đáng 15 bạc · Trân phẩm (33 bạc): cần chơi 8 phần · cao nhất …" |
| Đàn cổ Tiêu Vĩ 100 bạc | quà 10 = Tranh cổ 90 bạc | quà 12 (Sủng +6) |
| Sự kiện: Xin Hoàng hậu che chở (30 bạc, có rủi ro) | Hoàng hậu +5 < "Thành thật trình bày" +8 | +10 |
| Sự kiện: Dâng lễ, khéo xin Thái hậu đừng nhúng tay (40 bạc) | Thái hậu +3 < "Xin Thái hậu chỉ bảo" +8 | +9 |
| Sự kiện: Mời thái y giỏi, thuốc quý (45 bạc) | Sức +8 < "Nghe lời, tĩnh dưỡng" +12 | +16 |
| Sự kiện: Mời thầy Hàn lâm dạy (50 bạc) | Tài +3 < "Thức đêm luyện thơ" +4 | +6 |
| Sự kiện: Dâng lễ lên Đức Thọ cung (50 bạc) | Thái hậu +5 < "Đưa con đến hầu" +8 | +10 |
| paid-scan.py (595 choices, 376 lists) | 6 dominated | 1 left, not a fault: "Tin nàng, nhờ nàng canh cửa" (20 bạc) also raises the maid's loyalty +8 / trust +10 in its `go`, the free one lowers loyalty −12 |
| Danh sư (60 bạc, 3 tháng tiến bộ ×2) | — | unchanged: doubles every art lesson for 3 months (≈ 6 lessons, +6..18 progress), worth it |
| Hàng Nội vụ phủ cùng ô (trâm, vòng, vải, thuốc bổ, y phục) | dearer = more | unchanged, checked in the table below |

## After: full table (`node dev/test/paid-tiers.js`)
### 1. Đồ tự tay làm (j83): phẩm khi chơi 5 phần · bán · quà Thái hậu · phần cần cho Khá/Tinh xảo/Tuyệt phẩm
| loại | bậc | vật liệu thường | tốt | quý |
|---|---|---|---|---|
| tranh | 0 | 0 bạc → Thường, bán 10, quà 5, cần 6/10/– | 6 bạc → Khá, bán 23, quà 7, cần 4/8/– | 25 bạc → Khá, bán 42, quà 9, cần 2/6/10 |
| tranh | 2 | 0 bạc → Khá, bán 17, quà 6, cần 4/8/– | 6 bạc → Khá, bán 23, quà 7, cần 2/6/– | 25 bạc → Tinh xảo, bán 53, quà 10, cần 0/4/8 |
| tranh | 4 | 0 bạc → Khá, bán 17, quà 6, cần 2/6/– | 6 bạc → Tinh xảo, bán 34, quà 9, cần 0/4/– | 25 bạc → Tinh xảo, bán 53, quà 10, cần 0/2/6 |
| theu | 0 | 0 bạc → Thường, bán 6, quà 5, cần 6/10/– | 4 bạc → Khá, bán 14, quà 7, cần 4/8/– | 15 bạc → Khá, bán 25, quà 9, cần 2/6/10 |
| theu | 2 | 0 bạc → Khá, bán 10, quà 6, cần 4/8/– | 4 bạc → Khá, bán 14, quà 7, cần 2/6/– | 15 bạc → Tinh xảo, bán 31, quà 10, cần 0/4/8 |
| theu | 4 | 0 bạc → Khá, bán 10, quà 6, cần 2/6/– | 4 bạc → Tinh xảo, bán 20, quà 9, cần 0/4/– | 15 bạc → Tinh xảo, bán 31, quà 10, cần 0/2/6 |
| bhoa | 0 | 0 bạc → Thường, bán 6, quà 4, cần 6/10/– | 4 bạc → Khá, bán 14, quà 6, cần 4/8/– | 15 bạc → Khá, bán 25, quà 8, cần 2/6/10 |
| bhoa | 2 | 0 bạc → Khá, bán 10, quà 5, cần 4/8/– | 4 bạc → Khá, bán 14, quà 6, cần 2/6/– | 15 bạc → Tinh xảo, bán 31, quà 10, cần 0/4/8 |
| bhoa | 4 | 0 bạc → Khá, bán 10, quà 5, cần 2/6/– | 4 bạc → Tinh xảo, bán 20, quà 8, cần 0/4/– | 15 bạc → Tinh xảo, bán 31, quà 10, cần 0/2/6 |
| tho | 0 | 0 bạc → Thường, bán 6, quà 4, cần 6/10/– | 4 bạc → Khá, bán 14, quà 6, cần 4/8/– | 15 bạc → Khá, bán 25, quà 8, cần 2/6/10 |
| tho | 2 | 0 bạc → Khá, bán 10, quà 5, cần 4/8/– | 4 bạc → Khá, bán 14, quà 6, cần 2/6/– | 15 bạc → Tinh xảo, bán 31, quà 10, cần 0/4/8 |
| tho | 4 | 0 bạc → Khá, bán 10, quà 5, cần 2/6/– | 4 bạc → Tinh xảo, bán 20, quà 8, cần 0/4/– | 15 bạc → Tinh xảo, bán 31, quà 10, cần 0/2/6 |
| kinh | 0 | 0 bạc → Thường, bán 8, quà 5, cần 6/10/– | 4 bạc → Khá, bán 18, quà 7, cần 4/8/– | 15 bạc → Khá, bán 29, quà 9, cần 2/6/10 |
| kinh | 2 | 0 bạc → Khá, bán 14, quà 6, cần 4/8/– | 4 bạc → Khá, bán 18, quà 7, cần 2/6/– | 15 bạc → Tinh xảo, bán 38, quà 10, cần 0/4/8 |
| kinh | 4 | 0 bạc → Khá, bán 14, quà 6, cần 2/6/– | 4 bạc → Tinh xảo, bán 27, quà 9, cần 0/4/– | 15 bạc → Tinh xảo, bán 38, quà 10, cần 0/2/6 |
| khuc | 0 | 0 bạc → Thường, bán 8, quà 4, cần 6/10/– | 5 bạc → Khá, bán 19, quà 6, cần 4/8/– | 20 bạc → Khá, bán 34, quà 8, cần 2/6/10 |
| khuc | 2 | 0 bạc → Khá, bán 14, quà 5, cần 4/8/– | 5 bạc → Khá, bán 19, quà 6, cần 2/6/– | 20 bạc → Tinh xảo, bán 43, quà 10, cần 0/4/8 |
| khuc | 4 | 0 bạc → Khá, bán 14, quà 5, cần 2/6/– | 5 bạc → Tinh xảo, bán 28, quà 8, cần 0/4/– | 20 bạc → Tinh xảo, bán 43, quà 10, cần 0/2/6 |
| the | 0 | 0 bạc → Thường, bán 6, quà 4, cần 6/10/– | 4 bạc → Khá, bán 14, quà 6, cần 4/8/– | 15 bạc → Khá, bán 25, quà 8, cần 2/6/10 |
| the | 2 | 0 bạc → Khá, bán 10, quà 5, cần 4/8/– | 4 bạc → Khá, bán 14, quà 6, cần 2/6/– | 15 bạc → Tinh xảo, bán 31, quà 10, cần 0/4/8 |
| the | 4 | 0 bạc → Khá, bán 10, quà 5, cần 2/6/– | 4 bạc → Tinh xảo, bán 20, quà 8, cần 0/4/– | 15 bạc → Tinh xảo, bán 31, quà 10, cần 0/2/6 |
| mua | 0 | 0 bạc → Thường, bán 8, quà 4, cần 6/10/– | 4 bạc → Khá, bán 18, quà 6, cần 4/8/– | 15 bạc → Khá, bán 29, quà 8, cần 2/6/10 |
| mua | 2 | 0 bạc → Khá, bán 14, quà 5, cần 4/8/– | 4 bạc → Khá, bán 18, quà 6, cần 2/6/– | 15 bạc → Tinh xảo, bán 38, quà 10, cần 0/4/8 |
| mua | 4 | 0 bạc → Khá, bán 14, quà 5, cần 2/6/– | 4 bạc → Tinh xảo, bán 27, quà 8, cần 0/4/– | 15 bạc → Tinh xảo, bán 38, quà 10, cần 0/2/6 |
| ao | 0 | 0 bạc → Thường, bán 10, quà 4, cần 6/10/– | 8 bạc → Khá, bán 25, quà 6, cần 4/8/– | 30 bạc → Khá, bán 47, quà 8, cần 2/6/10 |
| ao | 2 | 0 bạc → Khá, bán 17, quà 5, cần 4/8/– | 8 bạc → Khá, bán 25, quà 6, cần 2/6/– | 30 bạc → Tinh xảo, bán 58, quà 10, cần 0/4/8 |
| ao | 4 | 0 bạc → Khá, bán 17, quà 5, cần 2/6/– | 8 bạc → Tinh xảo, bán 36, quà 8, cần 0/4/– | 30 bạc → Tinh xảo, bán 58, quà 10, cần 0/2/6 |
| mon | 0 | 0 bạc → Thường, bán 6, quà 4, cần 6/10/– | 6 bạc → Khá, bán 16, quà 6, cần 4/8/– | 20 bạc → Khá, bán 30, quà 8, cần 2/6/10 |
| mon | 2 | 0 bạc → Khá, bán 10, quà 5, cần 4/8/– | 6 bạc → Khá, bán 16, quà 6, cần 2/6/– | 20 bạc → Tinh xảo, bán 36, quà 10, cần 0/4/8 |
| mon | 4 | 0 bạc → Khá, bán 10, quà 5, cần 2/6/– | 6 bạc → Tinh xảo, bán 22, quà 8, cần 0/4/– | 20 bạc → Tinh xảo, bán 36, quà 10, cần 0/2/6 |
| huong | 0 | 0 bạc → Thường, bán 6, quà 4, cần 6/10/– | 4 bạc → Khá, bán 14, quà 6, cần 4/8/– | 15 bạc → Khá, bán 25, quà 8, cần 2/6/10 |
| huong | 2 | 0 bạc → Khá, bán 10, quà 5, cần 4/8/– | 4 bạc → Khá, bán 14, quà 6, cần 2/6/– | 15 bạc → Tinh xảo, bán 31, quà 10, cần 0/4/8 |
| huong | 4 | 0 bạc → Khá, bán 10, quà 5, cần 2/6/– | 4 bạc → Tinh xảo, bán 20, quà 8, cần 0/4/– | 15 bạc → Tinh xảo, bán 31, quà 10, cần 0/2/6 |

### 2. Học tài nghệ: tiến bộ theo phần chơi
| phần chơi | tự học | học với thầy |
|---|---|---|
| 0 | +1 | +2 |
| 1 | +1 | +2 |
| 2 | +1 | +2 |
| 3 | +2 | +3 |

### 3. Mạng che mặt tự kết (chơi 5 phần)
| bậc | vải sa (0) | dây bạc (12) | kim tuyến (45) |
|---|---|---|---|
| 0 | Mạng sa ngà: đáng 6 | Mạng dây lụa hồng kết trai: đáng 15 | Mạng kim hoa ngọc bích: đáng 110 |
| 2 | Mạng sa hồng thêu hoa: đáng 9 | Mạng dây lụa hồng kết trai: đáng 15 | Mạng kim hoa ngọc bích: đáng 110 |
| 4 | Mạng sa hồng thêu hoa: đáng 9 | Mạng bạc chạm hoa: đáng 33 | Mạng kim vân trân châu: đáng 165 |

### 4. Đồ mua cùng loại (giá tăng → công dụng tăng)
| nhóm | rẻ hơn | đắt hơn |
|---|---|---|
| Trâm cài | Trâm gỗ đào 12 bạc (9) | Trâm đồng mai hoa 12 bạc (9) |
| Trâm cài | Trâm đồng mai hoa 12 bạc (9) | Trâm ngọc bích 20 bạc (20) |
| Trâm cài | Trâm ngọc bích 20 bạc (20) | Trâm hoa lụa 20 bạc (10) |
| Trâm cài | Trâm hoa lụa 20 bạc (10) | Trâm bạc ngọc lan 30 bạc (19) |
| Trâm cài | Trâm bạc ngọc lan 30 bạc (19) | Thoa bạc song điệp 30 bạc (19) |
| Trâm cài | Thoa bạc song điệp 30 bạc (19) | Trâm thạch anh hồng 45 bạc (21) |
| Trâm cài | Trâm thạch anh hồng 45 bạc (21) | Hoa điền bạc khảm lưu ly 45 bạc (33) |
| Trâm cài | Hoa điền bạc khảm lưu ly 45 bạc (33) | Thoa vàng hồ điệp 70 bạc (35) |
| Trâm cài | Thoa vàng hồ điệp 70 bạc (35) | Trâm phỉ thúy hải đường 70 bạc (23) |
| Trâm cài | Trâm phỉ thúy hải đường 70 bạc (23) | Bộ diêu vàng 100 bạc (70) |
| Trâm cài | Bộ diêu vàng 100 bạc (70) | Điền tử điểm thúy 100 bạc (38) |
| Trâm cài | Điền tử điểm thúy 100 bạc (38) | Bộ diêu kim phượng ngậm châu 150 bạc (59) |
| Trâm cài | Bộ diêu kim phượng ngậm châu 150 bạc (59) | Trâm hồng ngọc mẫu đơn 150 bạc (43) |
| Trâm cài | Trâm hồng ngọc mẫu đơn 150 bạc (43) | Điểm thúy cửu điệp 220 bạc (66) |
| Trâm cài | Điểm thúy cửu điệp 220 bạc (66) | Kim thoa song phượng 220 bạc (66) |
| Trâm cài | Kim thoa song phượng 220 bạc (66) | Trâm phượng cửu vĩ 320 bạc (120) |
| Trâm cài | Trâm phượng cửu vĩ 320 bạc (120) | Phượng quan bán giá 320 bạc (76) |
| wrist | Vòng ngọc Hòa Điền 50 bạc (30) | Vòng vàng chạm phượng 120 bạc (70) |
| Vải vóc | Lụa Hàng Châu 30 bạc (30) | Gấm Tô Châu 80 bạc (60) |
| Vải vóc | Gấm Tô Châu 80 bạc (60) | Gấm minh hoàng 160 bạc (90) |
| Thuốc bổ | Yến sào 35 bạc (16) | A giao 40 bạc (10) |
| Thuốc bổ | A giao 40 bạc (10) | Nhân sâm trăm năm 60 bạc (25) |
| Thuốc | Thuốc an thai 25 bạc (11) | Thuốc giải độc 70 bạc (23) |
| Lễ vật | Đệm gấm 20 bạc (40) | Nghiên mực Đoan Khê 60 bạc (80) |
| Lễ vật | Nghiên mực Đoan Khê 60 bạc (80) | Tranh cổ 90 bạc (100) |
| Lễ vật | Tranh cổ 90 bạc (100) | Đàn cổ Tiêu Vĩ 100 bạc (120) |
| Y phục | Áo vải xanh cung nhân 12 bạc (9) | Áo lụa mộc hồng nhạt 12 bạc (9) |
| Y phục | Áo lụa mộc hồng nhạt 12 bạc (9) | Áo tang vải trắng 12 bạc (9) |
| Y phục | Áo tang vải trắng 12 bạc (9) | Áo lụa thêu hoa nhỏ 20 bạc (10) |
| Y phục | Áo lụa thêu hoa nhỏ 20 bạc (10) | Váy sa xanh ngọc 20 bạc (10) |
| Y phục | Váy sa xanh ngọc 20 bạc (10) | Áo gấm hoa mai 30 bạc (19) |
| Y phục | Áo gấm hoa mai 30 bạc (19) | Áo lụa Hàng Châu vân thủy 30 bạc (19) |
| Y phục | Áo lụa Hàng Châu vân thủy 30 bạc (19) | Áo the thêu lan 45 bạc (21) |
| Y phục | Áo the thêu lan 45 bạc (21) | Váy lụa bách điệp 45 bạc (21) |
| Y phục | Váy lụa bách điệp 45 bạc (21) | Áo gấm thêu hải đường 70 bạc (35) |
| Y phục | Áo gấm thêu hải đường 70 bạc (35) | Áo choàng lụa thêu chim én 70 bạc (23) |
| Y phục | Áo choàng lụa thêu chim én 70 bạc (23) | Áo gấm Tô Châu thêu mẫu đơn 100 bạc (38) |
| Y phục | Áo gấm Tô Châu thêu mẫu đơn 100 bạc (38) | Cát phục tím thêu hạc 100 bạc (38) |
| Y phục | Cát phục tím thêu hạc 100 bạc (38) | Cát phục đỏ thêu kim tuyến 150 bạc (59) |
| Y phục | Cát phục đỏ thêu kim tuyến 150 bạc (59) | Áo gấm vân cẩm 150 bạc (43) |
| Y phục | Áo gấm vân cẩm 150 bạc (43) | Triều phục tím chạm phượng 220 bạc (66) |
| Y phục | Triều phục tím chạm phượng 220 bạc (66) | Áo gấm thêu bách điểu 220 bạc (66) |
| Y phục | Áo gấm thêu bách điểu 220 bạc (66) | Triều phục minh hoàng thêu phượng 320 bạc (76) |
| Y phục | Triều phục minh hoàng thêu phượng 320 bạc (76) | Phượng bào đỏ thắm 320 bạc (76) |

FAIL: 0
page errors: 0
