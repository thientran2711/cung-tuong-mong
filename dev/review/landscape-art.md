# Kiểm duyệt bộ giao diện: review/landscape-art @ 26f260f (lần 2) — PASS

Ngày 2026-11-14. 7 cỡ: 1180x820@2, 1366x1024@2, 1024x768@2, 686x880@2.2, 755x1000@2, 412x1058@2, 390x844@3.
- Nền luân hồi ngang vẽ lại (bg-reborn-l 2100x1400): cảnh hai bên, không nửa trống; vòng xuất thân và thẻ thân phận ngang đạt (lan2-1180x820-5roulette.jpg).
- Bậc 4:3 (KIT_BD m, title-key-m 1920x1438): 1024x768 và 1366x1024 tựa đề + Chọn sổ: bảng nằm trên mặt hồ, không che ai (1024 chỉ chạm mép tay áo nàng áo xanh).
  1180 vẫn dùng tranh ngang rộng, đạt.
- Đêm thị tẩm: pushFront/deserQ giữ cls → đường thật pushFront(mkP("night2")) ra .modal.night; tranh dọc ở 686/755/412/390, tranh ngang ở màn ngang.
- Bục vinh danh đo theo khung (m/l ngang, p dọc). 686x880 dọc: tựa đề, Chọn sổ, thẻ thân phận, thị tẩm đạt (686x880-4man.jpg).
- 7 cỡ không lỗi trang, không tràn ngang; save cũ (làm từ bản main) nạp được ở cả 7 cỡ.

---

# Kiểm duyệt bộ giao diện: review/landscape-art @ f10f96d — FAIL

Ngày 2026-11-14. Dựng nhánh (main 2bed83a + jbd), 6 cỡ, ngang trước: 1180x820@2, 1366x1024@2, 1024x768@2, rồi 755x1000@2, 412x1058@2, 390x844@3.
Màn: tựa đề, Sổ luân hồi, Chọn sổ, Thiết lập, vòng xuất thân (#kroul), thẻ thân phận (reborn), thị tẩm (.modal.night), bục vinh danh (.kpod).

## Đạt
- jbd/KIT_BD là một sổ chung, KIT.md mục 30 khai báo; j74, j90, jk2b, p1 không còn tự viết `url(...)` cho nền.
- Tựa đề ngang (title-key-l 2100x1400, gpt-2-6): bố cục rộng thật, không kéo giãn, không nửa trống; tựa dọc giữ như cũ.
- Thị tẩm: 755/412/390 dùng tam-cung-dem-p (tranh dọc mới, đẹp), ngang dùng tam-cung-dem — đúng ở cả 6 cỡ.
- Bục vinh danh: đo theo khung (data-kbdo l/p) đúng; podium-bg-p dọc đẹp ở 755.
- 6 cỡ: không lỗi trang, không tràn ngang; save cũ (làm từ bản main) nạp được ở cả 6 cỡ.

## Lỗi chặn
1. **Vòng xuất thân (#kroul) ở màn ngang: nửa phải nền là sương trống.** KIT_BD.roulette (và reborn) lấy `img/bg-reborn-l.webp` — tranh cũ 1920x1080
   có cầu + trăng bánh xe ở nửa trái, nửa phải chỉ mây hồng nhạt. Ở thẻ thân phận bảng kit che nửa đó nên tạm được, nhưng ở vòng xuất thân không gì che:
   cả nửa màn trống (luật chủ: nền ngang không được có nửa trống/nhạt). Ảnh: dev/shots/review/landscape-art/1180x820-5roulette.jpg.
   Sửa: vẽ tranh ngang riêng cho nền luân hồi (gpt-2-6, cùng cảnh, hai bên đều có cảnh) hoặc ít nhất một tranh ngang riêng cho vòng xuất thân.
   Mục 30 của KIT.md ghi "never an empty panel" — chính bảng kê đang có một nền vi phạm.
2. **Tựa đề ở màn 4:3: bảng menu che nàng áo xanh.** 1024x768: bảng che gần nửa thân và tay áo nàng áo xanh (người thứ 5);
   1366x1024 và Chọn sổ (bảng cao hơn): che mép áo/tay áo. Mặt không bị che. Ảnh: 1024x768-1title.jpg, 1366x1024-3slots.jpg.
   Sửa: ở tỉ lệ ≤ 4:3 đẩy tranh sang trái (`posl`) hoặc hạ/thu bảng để người cuối không bị che; ở 1180 (16:11) chỉ chạm mép tay áo — đạt.

## Ghi chú (không chặn)
- `.modal.night` trong game thật hiếm khi xuất hiện: pushFront() bỏ mất `cls` của PEND.night2 nên đêm thị tẩm mở bằng modal thường (có từ trước, không do nhánh này).
  Đã thử bằng Q.unshift({cls:"night"}) để kiểm nền. Nên báo thợ logic.
- podium-bg-p: 2/3 dưới là nền kem trơn, nhưng bị người + bục che khi dùng — chấp nhận.
