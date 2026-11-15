# Kiểm duyệt kit: review/balance @ dcb23148 (và chuỗi đi trên nó) — FAIL (thiết kế, người duyệt thứ 2, 15/11)

## Gộp thử
Bản gộp lên main b165b1f71 (men + inventory-origin) đã làm xong về máy móc, đẩy lên **origin/wip/balance-on-main** (chưa dựng site, chưa vào main):
- 167d1e15 balance: thứ tự module theo nhánh (j60/j61 sau j77, j80 bỏ vì đã nằm trong j76), chen jbook sau j79,
  jk3/jinv/jk4/jmen/jcoop*/jload trước j84. 44 ảnh mới (img/wd-*.webp 43 + img/veil.png) KHÔNG commit (chờ CDN).
- b0b228da emotion: jemo trước jk3, KIT §36 (số 31 đã là Fold layout). 10 ảnh img/kit/emo-*.webp KHÔNG commit (chờ CDN).
- difficulty gộp thử: chỉ xung đột assemble (jdiff, jrolefig sau jbal2), LOG, sw.js — chưa commit (dừng vì lỗi dưới).
- 6 khổ: 0 lỗi trang, 0 tràn ngang, 0 chữ cắt, sổ main nạp được.

## Lý do FAIL — hai hệ đồ mặc chồng nhau ở Tư trang
- Main (inventory-origin, sếp duyệt 15/11): Tư trang = túi ô vuông + "Đang mang" 6 ô (Cài tóc · Đeo tay · Đeo eo · Túi thơm · Khăn che mặt ·
  Y phục), đồ theo IT (j8) + S.dress, wearBonus/xa xỉ của jinv.
- balance mang j92 (wardrobe 2 ô Trâm cài · Y phục, đồ WD riêng, ẩn khỏi túi bằng e.h, Đúng/Vượt phẩm ẩn) + jk2b K2 "Đang mặc / Rương đồ".
- Gộp lại: trang Tư trang hiện CẢ "Đang mặc" + "Rương đồ" (j92) lẫn túi + "Đang mang" (jinv) — hai chỗ trâm, hai chỗ áo, hai luật cộng Sắc;
  dòng "Đang đeo: Sắc +0 · áo mới: không" mà inventory đã bỏ quay lại (ảnh dev/shots/review/balance/755-tutrang-hai-he-do.jpg).
- Không phải lỗi nhỏ: cần một thợ hợp nhất (đồ WD của j92 vào túi kitInvGrid và ô Cài tóc/Y phục của kitEquipSlots, một wearBonus,
  luxOf đọc cả WD; giữ luật ẩn Đúng/Vượt phẩm của j92). Khuyên làm trên wip/balance-on-main.

## Hệ quả
emotion, difficulty, lost-items, appearance, outside, schedules2 đều mang j92 của balance → cùng chặn. kit-j95 chỉ là kit cho j95 (schedules2) → chờ.

## Bot (inpage5 sensible, ảnh tắt; máy tải 30–40 / 4 nhân)
- main + men (b165 trước inventory): n=24 · Hoàng hậu 13 (54 %) · chết sớm 7 (29 %, cả 7 là khó sinh). HH cao hơn đích 35–45 %: chính
  là việc review/balance v12 sửa (birthMin, outQ 60…), nên balance vẫn cần vào sau khi hợp nhất đồ.
- bản gộp balance (inpage6): n=3 trước khi máy khởi động lại — không đủ đo.
