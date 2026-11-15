# Hoa điền: đổi kiểu "đồ vật" sang hoa lá (sếp 15/11 02:20Z "Đổi hết hoa điền đồ vật sang hoa lá đi")

Cách làm như m05 (dev/art/m05fix/hd.py): lưới 2x2 đầu (a18 a26 / a36 a51) cắt từ fig 900px, sửa gpt-2-6 2k high một lần cho 4 tuổi,
dán lại riêng vùng trán (elip quanh khe mày + vùng ảnh sửa thật sự đổi trong ô tìm quanh trán, nên dấu cũ lệch tâm vì đầu nghiêng cũng bị xoá);
alpha giữ nguyên (không cắt nền lại); chân dung làm lại bằng dev/figwork/maidC/porcrop.py.
Bậc t1–t6 theo 8 nấc (t1 son phẳng cỡ c03 t1, ~+5%/bậc, t3 nét kỹ, t4 viền vàng mảnh, t5 vàng lá viền đậm, t6 vàng lá + chấm ngọc trai phẳng),
t7 = hoạ tiết mới dát vàng lá + men son, nhỏ một nửa. **t8 giữ nguyên** (đã là phượng vàng nhỏ kiểu c26 — hoạ tiết cũ chỉ là chấm son tí xíu trên đỉnh phượng).
Màu son giữ màu riêng của từng người.

## Đổi (23)
| ID | cũ | mới | màu |
|---|---|---|---|
| m05 | hai quả anh đào trên một cuống | hoa anh đào 5 cánh khía đầu cánh (t1–t8, cả t8) | pinkish rose red |
| m02 | con dơi | hoa sứ (plumeria), 5 cánh xoè chong chóng | pale coral |
| m03 | quả đào tiên | hoa anh túc (poppy), 4 cánh rộng nhăn, tâm sẫm | cinnabar red |
| m06 | thẻ ngọc (vạch dọc) | hoa rum (calla lily) dáng thon đứng | vermilion |
| m07 | thỏ ngọc | cỏ bốn lá | peach pink |
| m08 | đồng tiền lỗ vuông | lá thường xuân (ivy) 3 thuỳ | soft coral |
| m09 | bình hoa | hoa tulip | rose pink |
| m15 | núi ba đỉnh | lá sen tròn | pale coral |
| m16 | song cửa ô vuông | hoa cát cánh (platycodon) hình sao 5 cánh | cinnabar red |
| m19 | mặt trời toả tia | hoa vân anh (fuchsia) rủ | peach pink |
| m21 | hạc bay | hoa lan (cymbidium) | rose pink |
| m23 | quả hồng | hoa lăng tiêu (trumpet creeper) | soft orange-red |
| m25 | hoa hồi (gia vị) | hoa tú cầu (hydrangea) | rose red |
| m26 | quạt nửa vầng trăng | lá chuối | cinnabar red |
| m31 | quả bầu | hoa tử vi (crape myrtle) cánh nhăn | cinnabar red |
| m32 | nấm linh chi | hoa lạp mai (wintersweet) | vermilion |
| m33 | đầu như ý | hoa giọt tuyết (snowdrop) | coral red |
| m34 | nút kết vô tận | hoa violet | pale pink |
| m37 | cá chép | nhành bạc hà | rose red |
| m39 | chuồn chuồn | lá sồi | cinnabar red |
| m48 | đèn lồng | hoa bồ công anh (quả cầu tơ) | vermilion |
| m49 | ốc xà cừ | lá nhựa ruồi (holly) | coral red |
| c17 | tim đậu đỏ | lá tử kinh (redbud) hình tim | rose red |
| c27 | ngọc lửa | hoa bỉ ngạn (red spider lily) | vermilion |

Không trùng: đã đối chiếu với 84 kiểu (HUADIAN.md c01–c32, HUADIAN_C.md m01–m52): hoa mận/mơ/đào/lê/anh đào khác nhau (anh đào có khía đầu cánh);
lá: liễu c15, ba mũi c21, trúc c22, ngân hạnh c24, lá ấu m29, thông m41, phong m46, dương xỉ m17 — các lá mới (thường xuân, sen, chuối, sồi, nhựa ruồi, tử kinh, cỏ bốn lá, bạc hà) đều khác dáng.

## Giữ (hình học / kiểu hoa điền cổ điển)
- Chấm, giọt, trăng, lửa, xoắn, tam giác, thoi, sóng: m04 m11 m12 m14 m18 m20 m47, c02 c03(hoa 5 chấm) c05 c06 c09 c11 c18 c26 c28 c30.
- m22 lục giác (mai rùa) và m24 vòng ngọc bích: ở cỡ trong game đọc là hình học (lục giác / vòng tròn), giữ.
- c12 bướm, c13 mây cuộn, c25 chim én, c29 lông đuôi phượng: hoạ tiết hoa điền cổ điển; ở cỡ đầu ngón tay đọc là nét vẽ, không phải đồ vật — giữ (sếp muốn đổi thì cùng công cụ).
