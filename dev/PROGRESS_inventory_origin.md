# PROGRESS: Tư trang (bag) + Luân hồi úp bài (review/inventory-origin)

Nhánh `review/inventory-origin` từ origin/review/page-curl (fea7d050). Không đụng jbook.js / Dư đồ (thợ khác).
Quyết định chủ: OWNER_DECISIONS 11/15 04:00Z + lệnh điều phối (luồng úp bài 4 bước). Ảnh chủ: dev/owner-shots/1115-*.jpg (ở bản checkout chính).

## Đã xong
- KIT 33 `kitInvGrid` (dev/build/jinv.js, sau jk3): túi ô vuông kiểu RPG, tab theo loại đồ (hàng tab chung `kitTabRowHTML` tách ra từ k3CatTabs),
  ô trống vuông lõm, lấp đủ hàng (≥ 4 hàng), chạm ô → kitModal (tranh món đồ 512 px làm cột chủ thể `itemPic`, kitFacts, thẻ việc Đeo/Tháo,
  May áo, Dùng, Tặng, Bán, Tẩm, Nghiệm độc chạy j8 itemAct). Tư trang dùng nó (tab: Trang sức · Vải vóc · Thuốc men · Hương liệu · Lễ vật · Thư từ · Tạp vật).
  Rương bắt đầu trống (đồ chỉ kiếm được).
- kitItem: cỡ "slot", `onText`, `mark`; sửa `kitItemSrc` trả chuỗi src (trước trả object).
- kitRoulette (jk2b §14) viết lại: 1 ngửa hết + Tiếp → 2 úp + xáo bài thấy được → 3 chạm một lá: sáng, ra giữa phóng to, lật = thân phận đã gieo (tỉ lệ không đổi)
  → 4 Tiếp: tranh bay vào khung thẻ thân phận. Bỏ qua mọi lúc. Giảm chuyển động: cùng các bước, không chuyển động.
  Mặt lưng lá bài: img/kit/card-back.webp (gpt-2-6, Magnific YMLjg8DWeC; bản phụ O6fauzYynm).
- Chip độ hiếm cùng một dòng mỗi hàng: luật kit (thẻ là cột flex, chip `margin-top:auto`, hàng kéo cùng cao) — đo lệch 0 px.
- KIT.md 28.12 (viết lại), 28.13 (slot), 28.13b kitInvGrid.
- Thử: dev/test/inv-origin.js (+ bt.sh dựng + chạy; mk-oldsave.js tạo sổ cũ từ bản root). Ảnh: dev/shots/inv-origin/.

## Kiểm thử
- 686x880@2.2 (+ sổ cũ từ bản root: nạp được, 4 món hiện đúng trong túi), 755x1000@2, 1180x820@2, 1366x1024@2: 0 lỗi trang, 0 tràn ngang,
  0 chữ cắt; chip độ hiếm lệch 0 px mỗi hàng; lá chọn luôn = thân phận đã gieo; túi lấp đủ hàng (9/10/8/9 cột); Đeo/Tháo từ bảng món đồ chạy đúng.
- Máy thử tải ~70: trình duyệt thử đôi khi sập giữa chừng (thiếu bộ nhớ), chạy lại thì qua.

## Vòng 2 (chủ 11/15, markup 1115-inv-markup + lệnh điều phối "ô trang bị")
- Thẻ việc trên túi bị cắt đáy: thủ phạm là hàng tab dính (`#panel .kcattabs`, jk3) đổ bóng màu nền 9 px lên trên. Sửa thành luật kit: dính ở top:-8px,
  tự đệm 12px trên, bỏ bóng ngược → không thẻ nào bị che, ở mọi thẻ (tab) bảng. Thử: mọi tab bảng, điểm đáy mỗi thẻ việc phải trúng chính thẻ (0 lỗi).
- Phẩm cấp = nền + khung tranh chân dung (không vẽ mới): `.kigN` trong kitItem (jk2b §15b) — nền bg-consort-{0,1,2,4,7}, khung frame-consort-{0,1,2,4,5}
  cắt bỏ tua → img/kit/islot-frame-{0..4}.webp, border-image 9 lát. Áp cho mọi cỡ kitItem (ô túi, sm/md/lg, tranh bảng món đồ).
- `kitEquipSlots` (KIT 28.13c) "Đang mang" dưới túi: Cài tóc · Đeo tay · Y phục (đúng luật j8: IT.sl hair/wrist, S.dress), ô trống hiện bóng mờ loại đồ,
  chạm ô trống → chọn món trong rương để đeo / may áo; chạm ô đầy → bảng món đồ (Tháo). Tổng cộng thưởng (Sắc/Danh) + cảnh báo vượt phẩm ở đầu.
  Bỏ dòng "Đang đeo: … · áo mới: …".
- Túi lớn thêm hàng cho kín chiều cao bảng; phần dư (< 1 hàng) cho ô trang bị to lên (≤112px). ResizeObserver tự xếp lại.
- Thử: dev/test/inv-grade.js (686x880@2.2 + sổ cũ, 1180x820@2 + sổ cũ, 1366x1024@2): 0 lỗi trang, 0 tràn ngang, 0 chữ cắt, 0 thẻ việc bị che;
  đeo vòng từ ô trống chạy đúng. Ảnh: dev/shots/inv-grade/. (Dư đồ: phần bản đồ rộng hơn màn là có sẵn, không thuộc nhánh này.)

## Vòng 3 (chủ 11/15, nhiều lệnh nối nhau)
- Ô Y phục hiện ÁO (tranh j92 img/wd512/wd-<bậc>-y-NN, chọn theo bậc + băm khóa vải trong dải phẩm của vải), phụ đề "áo may từ … · còn N tháng";
  ô trống = bóng áo; bảng chạm cũng hiện áo.
- kitItemRows (KIT 33c): một khối Phẩm/Được/Mất/Ghi chú dùng cho bảng món đồ (chạm ô túi) và bảng áo. Dưới ô trang bị chỉ 2 dòng gọn
  (tên màu phẩm + chip hiệu quả + ⚠ nếu vượt phẩm/xa xỉ); tổng + cảnh báo ở đầu khung (chip không bao giờ bị cắt).
- Thêm ô có luật thật: Đeo eo (ngọc bội ngự ban, Danh +1) · Túi thơm (Sắc +1, đeo thay vì dùng hết). Hoa tai / khăn che mặt / giày hoa: CHƯA
  thêm vì không có tranh món đồ — chờ chủ duyệt vẽ mới. wearBonus nay cộng mọi chỉ số.
- Trục XA XỈ (luxOf/luxMonth, qua itemMonth cho cả NPC): Giản dị / Vừa phẩm / Xa hoa / Quá xa xỉ; ghen theo tính, Thái hậu chê, lời đồn; giản dị ở bậc cao được Đức.
- Đổi "Gánh hàng rong" → "Nhờ thái giám mua đồ" (thẻ việc, tiêu đề, lời thoại Nội vụ phủ, gợi ý rương trống, chức danh thái giám; sổ cũ đổi tên khi vẽ bảng).
- Hàng tab: cách đều trên/dưới (--k-tabgap 10px), chỉ dính khi trang dài (> 1.5 lần bảng) → Tư trang không bị che khi cuộn.
