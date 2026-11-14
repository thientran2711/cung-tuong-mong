# Hoa điền (huadian) — bảng kiểu cho phi tần c01–c32 (art7, luật sếp 11/14)

Xem thêm dev/figwork/HUADIAN_C.md: kiểu của 52 cung nữ lên phi tần (thợ Part C), phải khác hết 32 kiểu dưới đây.

Mỗi người một hoạ tiết riêng, giữ suốt đời (mọi bậc, mọi tuổi); bậc càng cao càng sang nhờ chất liệu, độ cầu kỳ, số chi tiết (8 nấc dưới đây).
LUẬT CỠ (sếp nới, 11/14): t1 = cỡ hoa son c03 t1; mỗi bậc to thêm khoảng 5%; t8 (phượng/mẫu đơn Hoàng hậu) to nhất ≈ 1.4 lần t1. Không bao giờ to đùng; nằm gọn giữa hai mày; bậc cao sang hơn chủ yếu nhờ chất liệu, độ cầu kỳ, số chi tiết;
không bao giờ che trán, không lan xuống mày/má. Chỉ phi tần có hoa điền (không cung nữ, ma ma...). Lãnh cung (tcold): KHÔNG hoa điền.
Prompt: spec6.py HL[t] (chất liệu, 8 câu) + HS[t] (cỡ, 8 câu).
LUẬT CỠ MỚI NHẤT (sếp, 11/14 art8): kiểu ĐÍNH NGỌC NỔI KHỐI thì phải NHỎ GỌN (sếp chê t7 cũ có hạt ngọc nổi là "xấu, ghê, to quá"); kiểu VẼ/DÁT PHẲNG trên da như t8 thì được to hơn một chút. t8 = 85% cỡ mẫu aeb6c1b (≈1.2 lần t1); t7 dát phẳng, nhỏ hơn t8 một chút. Không dùng hạt ngọc nổi ở bất kỳ bậc nào; ngọc trai t6 và hồng ngọc t7 chỉ là một điểm nhỏ xíu phẳng sát da.
Không nốt ruồi, không beauty mark trên mặt (mọi spec). Prompt: spec6.py (khối 'HUADIAN:'), chạy sau spec5.py.
Ghi chú: các lineup t1 cũ c03, c11, c19, c32 đã có chấm son đỏ giữa mày (giữ màu son đỏ cho bốn người này).

Kích thước gốc (t1): cỡ hoa son giữa mày của c03 t1 (img/por-consort-c03-t1-a18.webp), rõ trên chân dung; các bậc trên to dần ~5%/bậc tới ≈1.4 lần ở t8; không lan sang chân mày, không phủ quá nửa trán. Áp dụng cho cả HUADIAN_C.md (thợ Part C).

## 8 nấc theo bậc (mỗi bậc một nấc riêng, KHÔNG gộp; cỡ to dần nhẹ, t8 ≈ 1.2 lần t1)
- t1: một chấm hoặc nét son đơn gợi hình hoạ tiết, không chi tiết.
- t2: hoạ tiết vẽ son, hình rõ ràng, không viền, không vàng.
- t3: son nét kỹ, thêm nhụy (tâm khác màu) và gân/nét trong; chưa có vàng.
- t4: son viền nhũ vàng mảnh (lần đầu có vàng).
- t5: hoạ tiết cắt bằng vàng lá, lồng son bên trong.
- t6: vàng lá dát phẳng + son, gọn hơn; giữa có MỘT điểm ngọc trai NHỎ XÍU phẳng sát da (không phải hạt nổi).
- t7 (Hoàng quý phi): DÁT PHẲNG như t8: vàng lá mỏng + men son đỏ tươi, hoa (hoạ tiết riêng) có nét filigree vàng mảnh trên cánh, hai cuộn vàng nhỏ ôm hai bên, MỘT điểm hồng ngọc nhỏ xíu ở tâm; KHÔNG hạt ngọc nổi, không vòng trai; cỡ hơi nhỏ hơn t8.
- t8 (Hoàng hậu): phượng cách điệu MẢNH bằng vàng lá mỏng sát da, thân và đuôi uốn chữ S ôm hoa son nhỏ (hoạ tiết riêng), khảm thuý lam; không khung tròn, không vòng trai; cỡ ≈1.2 lần t1 (85% mẫu cũ). Mọi hoa điền là son VẼ trên da / vàng lá dát mỏng, không phải trâm cài hay huy hiệu.
Mẫu (sếp duyệt t1–t5; t6 thu gọn, t7 dát phẳng làm lại, t8 thu 85% — art8, chờ sếp xem): dev/figwork/sheets/huadian_c03_face_t1..t8.jpg (toàn mặt), huadian_c03_face_all.jpg, huadian_c03_t1..t8.jpg (cận). Tất cả là gpt-2-6 edit, không ghép bằng code.

| ID | Hoạ tiết riêng (giữ suốt đời) | Màu son bậc thấp | Tranh t1 hiện có |
|---|---|---|---|
| c01 | a five-petal plum blossom | soft rose pink | chưa có (thêm khi sửa) |
| c02 | a single slim teardrop | pale coral | chưa có (thêm khi sửa) |
| c03 | a tiny five-dot plum blossom | cinnabar red | có: chấm son đỏ dạng hoa nhỏ |
| c04 | a small lotus bud | soft pink | chưa có (thêm khi sửa) |
| c05 | a slim crescent moon | rose red | chưa có (thêm khi sửa) |
| c06 | a small flame-shaped mark | vermilion | chưa có (thêm khi sửa) |
| c07 | a four-petal begonia | peach pink | chưa có (thêm khi sửa) |
| c08 | a tiny peach blossom | soft pink | chưa có (thêm khi sửa) |
| c09 | two tiny stacked drops | rose red | chưa có (thêm khi sửa) |
| c10 | a curling orchid leaf | soft coral | chưa có (thêm khi sửa) |
| c11 | a three-dot trefoil | cinnabar red | có: chấm son đỏ dạng hoa nhỏ |
| c12 | a tiny butterfly | rose pink | chưa có (thêm khi sửa) |
| c13 | a small auspicious cloud scroll | coral red | chưa có (thêm khi sửa) |
| c14 | a tiny chrysanthemum | soft orange-red | chưa có (thêm khi sửa) |
| c15 | a slim vertical willow leaf | rose red | chưa có (thêm khi sửa) |
| c16 | a six-petal snowflake flower | pale pink | chưa có (thêm khi sửa) |
| c17 | a tiny red-bean heart | rose red | chưa có (thêm khi sửa) |
| c18 | a small lozenge diamond | coral red | chưa có (thêm khi sửa) |
| c19 | a small open lotus flower | cinnabar red | có: chấm son đỏ dạng hoa nhỏ |
| c20 | a tiny camellia | soft pink | chưa có (thêm khi sửa) |
| c21 | a three-pointed leaf | vermilion | chưa có (thêm khi sửa) |
| c22 | a pair of bamboo leaves | soft coral | chưa có (thêm khi sửa) |
| c23 | four tiny osmanthus dots in a cluster | rose red | chưa có (thêm khi sửa) |
| c24 | a small ginkgo leaf | coral red | chưa có (thêm khi sửa) |
| c25 | a tiny swallow | rose pink | chưa có (thêm khi sửa) |
| c26 | a crescent with a dot above it | rose red | chưa có (thêm khi sửa) |
| c27 | a small flaming pearl | vermilion | chưa có (thêm khi sửa) |
| c28 | a single round pearl dot | soft pink | chưa có (thêm khi sửa) |
| c29 | a tiny phoenix tail-feather | rose red | chưa có (thêm khi sửa) |
| c30 | a small wave crest | coral red | chưa có (thêm khi sửa) |
| c31 | a tiny narcissus flower | soft coral | chưa có (thêm khi sửa) |
| c32 | a small peony blossom | cinnabar red | có: chấm son đỏ dạng hoa nhỏ |
