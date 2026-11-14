# Tranh cảnh nơi chốn mới (nhánh review/places, từ origin/main)

Kế hoạch: dev/PLACES_PLAN.md. Chỉ có tranh; chưa nối mã (SCIMG/places/map-hotspots/j94 để thợ mã làm sau khi chủ duyệt).

## Cách vẽ (giống PROGRESS_seasons)
- Magnific gpt-2-6, thư mục ba4aecfe-efce-47e2-b53f-30d292091886. Tham chiếu phong cách: ảnh gốc của game tải lên Magnific
  `ngu-hoa-vien` (u5nGbHAQLD), `kinh-su-phong` (ksDVjkm16B) (+ `lanh-cung` If69amntvE, chưa dùng).
- Ảnh gốc: text-to-image 16:9 + 2 tham chiếu, count 2, chọn 1. Ảnh gốc là xuân-sáng.
- 15 bản còn lại: EDIT từ ẢNH GỐC (không nối tiếp), lời nhắc "giữ nguyên bố cục…, chỉ đổi mùa và buổi" + mô tả mùa + buổi.
- Đầu ra 1344x752 → co về cao 720, cắt giữa 1280x720, webp q80 (`proc.py` trong scratchpad; công thức: resize cao 720, cắt giữa).
- Bảng ghép: dev/shots/places/<tên>.jpg (cột Xuân/Hạ/Thu/Đông, hàng sáng/trưa/chiều/tối).

## Tiến độ
- [x] Dãy nhà cung nhân `day-nha-cung-nhan`: 16/16 + `day-nha-cung-nhan.webp` (= xuân-sáng). 2 ảnh gốc + 15 edit = 17 lượt × 40 = **680 tín dụng**, 0 vẽ lại.
  Tự kiểm từng ảnh: không người/vật/chữ; bố cục, cổng, cột, chậu sứ, giá phơi, sàn đá giữ nguyên ở cả 16; sàn trống ~45% dưới.
  Mã Magnific: gốc EbzAqx9uuO (bản kia VXUgdmgMMU bỏ). xuan-trua u5nG5rcQLD, xuan-chieu 4RuCRnT9Aa, xuan-toi cplLpIg0eP,
  ha-sang ov9Pvqm829, ha-trua 0egsevgTfW, ha-chieu Do7Uou2pcl, ha-toi LwBdwZPswO, thu-sang bxTcx4I5Y2, thu-trua YMLxMu9WeC,
  thu-chieu iGqFGm83uK, thu-toi xSdpSWLjfW, dong-sang LwBdwVGswO, dong-trua w4ht4oY7EI, dong-chieu XmPOmJaBfo, dong-toi cplLpLY0eP.
- [ ] CHỜ CHỦ DUYỆT thí điểm rồi mới vẽ: noi-vu-phu, tan-gia-kho, ngu-thien-phong, phat-duong, thuong-thu-phong (~3.400 tín dụng).
