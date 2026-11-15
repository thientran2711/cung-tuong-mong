# Kiểm duyệt kit: review/inventory-origin @ c92da910 — PASS (người duyệt thứ 2, 15/11)

Gộp trên rvb-men (main c30884d9e + men). Nhánh rvb-inv.

## Sửa khi gộp
- assemble.py: jinv sau jk3 (trước jk4/jmen/jcoop/jload/j84).
- j2.js goTo: giữ luật đi khắc của main (`walkOk(tc)`, map-anim) — nhánh còn `can(tc+1)` cũ; lấy chữ Việt của nhánh cho ini ("Đế").
- j3.js: giữ `kitImgErr` của main ở mdH; ini "Hoạn"/"Y" của nhánh.
- Quét chữ Hán toàn bộ module trong assemble: còn jmen "官" và jcoopworld "鳳"/"帝" → "Quan"/"Phượng"/"Đế". Nay 0.
- Không vẽ tranh mới người: chỉ thêm img/kit/card-back.webp + img/kit/islot-frame-0..4.webp (cắt từ khung chân dung có sẵn).

## Kiểm
- dev/test/inv-grade.js (755, 1180, 1366): túi ô vuông lấp kín, 6 ô Đang mang (Cài tóc · Đeo tay · Đeo eo · Túi thơm · Khăn che mặt · Y phục),
  Y phục hiện áo (wd512), "Xa xỉ N" mỗi món + "Xa xỉ <tổng>" đầu khung không lộ mức cho phép, ⚠ chỉ cho vượt phẩm, dấu "Ngự", "còn 2 tháng";
  đeo vòng từ ô trống chạy; 0 chữ cắt, 0 thẻ việc bị che, 0 chữ Hán; trục xa xỉ cho cả NPC. (Tab Dư đồ báo phần tử rộng hơn màn: bản đồ cuộn ngang
  sẵn có của main, không phải tràn trang.)
- dev/test/inv-origin.js (755, 1180): Luân hồi ngửa → úp + xáo → chọn mù → lật đúng xuất thân (tt/thd), 0 lỗi.
- 6 khổ (kc): sổ main nạp + Qua buổi, mọi tab 0 lỗi trang / 0 tràn / 0 cắt, thẻ việc cùng cỡ.
- Luật chơi đổi nhẹ (wearBonus mọi chỉ số, xa xỉ → ghen/Thái hậu chê/Đức) — đo chung với bot của đợt.

Ảnh: dev/shots/review/inventory-origin/.
