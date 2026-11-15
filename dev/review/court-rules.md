# Kiểm duyệt kit: review/court-rules @ b702cae6 (+ roulette tranh đủ, theo lệnh điều phối) — PASS

Ngày 2026-11-15. Gộp lên main df5a6010 (pc-size). Không xung đột mã; bản dựng dựng lại bằng build_site.sh.

## Nội dung nhánh (đã thử)
- Hoàng hậu / Hoàng quý phi ở riêng một cung (palSolo, j27): dev/test/court-rules.js 755 + 1180 — `under: []`, sổ cũ có người ở thiên điện
  Càn Ninh → nạp lại tự dời ra, có dòng sổ ghi ("… dời khỏi Càn Ninh cung (Hoàng hậu ở riêng một cung), sang thiên điện …").
- Thái hậu 51–62 và ≥ Hoàng thượng + 18 (j17), chân dung / tranh theo tuổi thật (j35/j28): thAge 51–58, tranh `*-a51`.
  (Khi chưa gặp, thẻ vẫn là bóng người lạ — đúng luật.)
- Hết khắc ở một nơi → sang buổi vẫn ở đó (j41/j77): dev/test/place-stay.js 755 + 1180 — "Sang buổi chiều · ngươi vẫn ở Ngự hoa viên", người ở đó cập nhật.
- Chạm nơi đang ở → sân khấu nơi đó; nút đầu "‹ <tên nơi>" (jk3): 412 / 390 — mọi tên nơi (dài nhất "‹ Trường Môn viện") vừa, không cắt.

## Thêm (điều phối 11/15): Luân hồi không bao giờ hiện thẻ trống
jk2b: kitRoulette tải trước 9 tranh thân phận + mặt sau thẻ rồi mới bày; tranh đã có sẵn thì không chờ; quá 150 ms thì hiện màn chờ kit
trên nền Luân hồi ("Đang bày các thân phận…"); tối đa 8 s. Thử máy mới (không bộ đệm) 755: màn chờ ~0.5 s, thẻ hiện sau ~1.5–2 s, 9/9 tranh
đã tải trong khung đầu (≤ 120 ms). Trên live trước sửa: thẻ trống ~15 s.

## Kiểm theo kit (bản gộp, reducedMotion, 11 tab)
| khổ | lỗi trang | tràn ngang | cắt chữ | #panel | ảnh vỡ | nền tím |
|---|---|---|---|---|---|---|
| 755x1000@2, 1180x820@2, 412x1058@2 | 0 | 0 | 0 | 1 | 0 | 0 |
- Sổ cũ (main f7a9e988) nạp ở 3 khổ, Qua buổi chạy. coop-e2e Worker sống 59/59.

## Đáng lo
- 412: nút "‹ Càn Ninh cung" dài hơn "‹ Phòng" → tên nàng xuống hai dòng, thanh trên cao thêm một dòng (không cắt chữ). Ảnh trước/sau.
- 412 (có từ trước, cả main): dòng "Quẻ Thượng thượng (Giao thiệp)" chạm/lấn mép phải thanh trên.
Ảnh: dev/shots/review/court-rules/.
