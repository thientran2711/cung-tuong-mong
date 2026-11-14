# Tranh cảnh nơi chốn mới (nhánh review/places, từ origin/main)

Kế hoạch: dev/PLACES_PLAN.md. Chỉ có tranh; chưa nối mã (SCIMG/places/map-hotspots/j94 để thợ mã làm sau khi chủ duyệt).
Magnific gpt-2-6, thư mục ba4aecfe-efce-47e2-b53f-30d292091886. Cảnh game đã tải lên Magnific để làm tham chiếu:
`ngu-hoa-vien` u5nGbHAQLD, `kinh-su-phong` ksDVjkm16B, `lanh-cung` If69amntvE, `lanh-cung-xuan-sang` JNah2WyOq4.

## Lần 1 (BỊ CHỦ CHÊ: "Nhìn AI quá, không giống phong cách game") — đã xoá khỏi nhánh
- Ảnh gốc text-to-image (EbzAqx9uuO) + 15 edit: đối xứng một điểm tụ, sàn bóng ướt, đỏ/xanh ngọc quá rực, mặt nhẵn như nhựa, như sân khấu trống.
  17 lượt × 40 = 680 tín dụng. 16 ảnh đã xoá khỏi img/ (commit sau 3d76f6c) để không ai nối nhầm. Mã Magnific còn trong thư mục nếu cần.

## Lần 2: ảnh gốc Dãy nhà cung nhân (CHỜ DUYỆT, chưa làm bản mùa/buổi)
- EDIT từ cảnh đã duyệt `lanh-cung-xuan-sang` (giữ góc 3/4 lệch, nét cọ, màu dịu, ánh sáng sương sớm), tham chiếu phong cách ngu-hoa-vien + kinh-su-phong.
  Sửa lãnh cung đổ nát thành dãy nhà cung nhân tươm tất: mái, cột, cửa lành lặn; dãy nhà thứ hai bên trái; cây sống ra lá, hoa;
  sàn đá khô mờ; chậu giặt gỗ, chổi tre, ghế đẩu, chăn gấp, sào phơi áo vải, chum nước, chậu hoa. count 3 = 120 tín dụng.
- Ứng viên: c1 jUXePz9LD0, c2 yiCaGeXPW9, c3 fHAZ1JACDY → `dev/art/cand/day-nha-cung-nhan-base2-c*.webp` (1344x752 gốc).
- Bảng so (ứng viên | lanh-cung / ngu-hoa-vien | kinh-su-phong): `dev/shots/places/cnh-base2-c1.jpg`, `-c2.jpg`, `-c3.jpg` (dev/art/side_places.py).
- **Chọn c3**: tường sạch nhất (c1/c2 vữa bong nhiều, dễ trông nghèo), nắng xiên dịu, đồ sinh hoạt gọn ở hiên, sàn trống ~40% dưới.
  Lưu ý: bố cục giống lãnh cung (cùng cây, cùng bậc) vì sửa từ đó; nếu chủ thấy giống quá thì làm lại từ cảnh khác.
- Sau khi duyệt: 15 edit mùa/buổi từ c3 (`dev/art/proc_places.py`, đặt c3 làm xuan-sang).

## Còn lại (chờ duyệt phong cách)
noi-vu-phu, tan-gia-kho, ngu-thien-phong, phat-duong, thuong-thu-phong, a-ca-so, dong-cung.
