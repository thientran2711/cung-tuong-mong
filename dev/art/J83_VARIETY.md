# J83 — tác phẩm muôn vẻ theo CÔNG THỨC (đề xuất + mẫu, chờ điều phối duyệt số tranh)

Yêu cầu (sếp, qua điều phối 11/15): mỗi loại tác phẩm của Tài nghệ (j83 WK: mon, theu, tranh, bhoa, tho, kinh, khuc, the, mua, ao, huong) có ~10 công thức /
mẫu riêng. Luồng: chọn LÀM GÌ trước (danh sách công thức có tranh, lọc theo bậc tài nghệ) → mini game dùng nguyên liệu / bước của chính công thức đó
(giữ engine mini game, chỉ đổi dữ liệu) → tác phẩm = tên + tranh của công thức đó ở phẩm theo điểm. Phẩm cao = cùng món ấy nhưng tinh xảo hơn.
Bậc phẩm thật trong code: j83 `WTIER = ["Thường","Khá","Tinh xảo","Tuyệt phẩm"]` (4 phẩm; j98 tranh `item-tp-<kind>-b1..4`). Người làm + ngày đã ghi sẵn trong
tác phẩm (`wk.bn`, `wk.d`, thẻ j83 "tự tay ngươi làm · tháng…").

## Mẫu đã vẽ (gpt-2-6, thư mục Magnific ba4aecfe…) — dev/shots/j83-variety/sample-mon.jpg (ô 420 px)
- Công thức «Gà tần sâm táo» ở 4 phẩm: niêu đất sứt (Thường) → bát sứ viền lam (Khá) → liễn sứ hoa trên đế sơn son (Tinh xảo) → liễn ngọc trắng quai rồng vàng, gà ác,
  sâm trăm năm (Tuyệt phẩm). Cùng một món, càng cao càng sang.
- 6 biểu tượng nguyên liệu cùng kiểu vật phẩm: gà ta, nhân sâm, táo đỏ, gừng, lá sen, kỷ tử.
- 12 món khác (mỗi món sẽ là một công thức; cần vẽ thêm 3 phẩm còn lại cho mỗi món như mẫu trên).
Chưa cắt nền (sẽ cắt bằng Magnific remove-background + itemcut.py khi duyệt); chưa đẩy CDN, chưa nối code.

## Đề xuất số tranh
| phương án | tác phẩm | nguyên liệu / yếu tố mini game | tổng | ghi chú |
|---|---|---|---|---|
| **A (em đề xuất)** 10 công thức × 4 phẩm, mỗi phẩm một tranh | 11 × 40 = 440 | ~130 (nấu ~40, túi hương ~25, cắm hoa ~25, chỉ thêu ~12, mực/giấy/đàn/quân cờ ~28) | ~570 | đúng ý "phẩm cao là bản tinh xảo hơn của CÙNG món"; mẫu cho thấy làm được |
| B 10 công thức × 2 tranh (Thường–Khá / Tinh xảo–Tuyệt phẩm) + khung/nền phẩm của kitItem | 220 | ~130 | ~350 | phẩm 1–2 và 3–4 trùng tranh, chỉ khác khung |
| C 10 công thức × 1 tranh gốc + khung phẩm | 110 | ~130 | ~240 | rẻ nhất, nhưng phẩm không thấy khác ở tranh |
Mỗi tranh 40 credit (1k) + 3 credit cắt nền. Làm theo lô từng loại (nấu → thêu → tranh → cắm hoa → túi hương → thơ → kinh → khúc → cờ → múa → áo), mỗi lô gửi tờ + danh sách cdn_sync.

## Công thức NẤU (mon) — bản nháp, nguyên liệu = biểu tượng mini game (mỗi công thức 5–6 thứ, dùng chung giữa các món)
| # | công thức | bậc tài nghệ mở | nguyên liệu |
|---|---|---|---|
| 1 | Cháo trắng hành phi | 0 | gạo tẻ, hành tím, mỡ lợn, muối |
| 2 | Canh rau dền | 0 | rau dền, tôm khô, gừng, muối |
| 3 | Bánh bột hấp | 0 | bột gạo, đường, nước cốt dừa, lá chuối |
| 4 | Gà hấp lá chanh | 1 | gà ta, lá chanh, gừng, sả, muối |
| 5 | Canh sườn hạt sen | 1 | sườn lợn, hạt sen, táo đỏ, gừng |
| 6 | Bánh hoa quế | 1 | hoa quế, đường phèn, bột sắn, mật ong |
| 7 | Gà tần sâm táo | 2 | gà ta, nhân sâm, táo đỏ, gừng, lá sen, kỷ tử |
| 8 | Chè dưỡng nhan | 2 | hạt sen, long nhãn, nấm tuyết, táo đỏ, đường phèn |
| 9 | Cá quế sốt chua ngọt | 3 | cá quế, cà chua, giấm, đường, hạt thông |
| 10 | Yến sào hầm sâm | 3 | yến sào, nhân sâm, đường phèn, kỷ tử |
Món Hoàng thượng thích (j83 `wk.s`, "hợp ý") giữ nguyên logic: công thức trùng món ngài thích thì hợp ý.

## Công thức / mẫu các loại khác (10 mỗi loại; yếu tố mini game trong ngoặc)
- **Thêu (theu)**: khăn hoa cúc, khăn uyên ương, quạt tròn mẫu đơn, gối song hỷ, túi tiền cánh én, rèm hoa đào, tranh thêu khổng tước, tranh thêu tùng hạc,
  bình phong Bách điểu triều phượng, cuộn thêu sơn thủy (màu chỉ + thứ tự mũi của mẫu).
- **Vẽ tranh (tranh)**: mai, lan, trúc, cúc, sen hồ, song hạc, cá chép, sơn thủy, tùng hạc, mẫu đơn quốc sắc (nét của đề tài).
- **Cắm hoa (bhoa)**: mai trắng, lan, cúc vàng, sen hồng, mẫu đơn, hoa đào, thủy tiên, hoa quế, hoa trà, trăm hoa (loại hoa + bình).
- **Túi hương (huong)**: hoa lài, lá bưởi, hoa quế, trầm quế, lan, ngải, cúc khô, kỳ nam, long diên, trăm hoa (hương liệu).
- **Thơ / thư pháp (tho)**: Xuân nhật, Thu dạ, Vọng nguyệt, Tống biệt, Hoa triêu, Vịnh mai, Vịnh liễu, Vọng giang, Tứ quý, Đề quạt (nét chữ thảo — không chữ Hán đọc được).
- **Chép kinh (kinh)**: Kim Cương, Bát Nhã, Dược Sư, Địa Tạng, Pháp Hoa, Phổ Môn, A Di Đà, Lăng Nghiêm, Viên Giác, Hoa Nghiêm (giấy, mực, bìa — không chữ đọc được).
- **Phổ khúc (khuc)**: Thu thủy, Nguyệt hạ, Xuân hiểu, Lạc mai, Cao sơn, Lưu thủy, Bình sa lạc nhạn, Mai hoa tam lộng, Dương xuân, Hán cung thu (dấu phổ trừu tượng).
- **Thế cờ (the)**: Song long, Cô thành, Bát trận, Tứ diện, Ngũ hành, Thất tinh, Cửu cung, Thiên nguyên, Lạc hà, Long phượng (thế quân).
- **Điệu múa (mua)**: Nghê thường, Lục yêu, Bạch trữ, Lăng ba, Hồ toàn, Kiếm khí, Thải liên, Đạp ca, Phi thiên, Bách hoa (tranh vũ nữ — mặt hiền, không nốt ruồi).
- **Áo múa (ao)**: Nghê thường, Lưu tiên, Thải vân, Tay nước, Cánh sen, Bướm hoa, Ngũ sắc, Mai tuyết, Sóng lam, Phượng đỏ (vải + đường thêu).

## Nối code (sau khi duyệt) — nhánh review/j83-variety
- `WKR[kind] = [{id, n, lv, ing:[…], art:{b1..b4}}]` (dữ liệu), màn chọn công thức trước buổi tập (thẻ kit act-card có tranh phẩm 1, khóa theo bậc tài nghệ),
  mini game đọc `ing` của công thức (giữ engine), tác phẩm `wk.r = id`, tên = tên công thức, tranh `img/item-tp-<kind>-<id>-b<1..4>.webp` (+ item512/), thiếu tranh thì
  dùng tranh phẩm cũ. Sổ cũ: tác phẩm không có `wk.r` giữ như cũ.
