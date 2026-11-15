# Kiểm duyệt: review/scene-light đợt đầu 6f624274e (phần màu/lọc) gộp lên main 311260527 — PASS (người duyệt R6)

Ngày 2026-11-15. Nhánh: `review/scene-light-r6`. Xung đột duy nhất: `dev/build/assemble.py` (main thêm jseal, nhánh thêm jsl) → thứ tự
`… jk4, jseal, jsl, jmen …`; dựng lại index.html/sw.js/assets.json. Phạm vi duyệt (theo điều phối): chỉ màu/lọc cảnh; da hồng và các commit sau KHÔNG xét.

## Đo trên bản gộp và trên bản live main (1180x820, tháng tư = hạ, nơi ở "Ngọc Thanh các", tranh riêng buổi tam-cung-dem-ha-*)
| Cảnh | main: lọc .scimg / lớp .light | bản gộp: lọc .scimg / lớp .light |
|---|---|---|
| sáng / trưa / chiều, trời quang | brightness(1.35) saturate(.9) sepia(.12) / phủ màu buổi | **none** / trong suốt (b4Light tắt cho tranh riêng buổi) |
| tối, trời quang | none / phủ lam .106 | none / trong suốt |
| sáng / trưa / chiều, mưa | brightness(1.35)… sepia(.12) / phủ màu + lớp mưa xám | saturate(.97) contrast(.94) brightness(1.07) / **ngà ấm** .13→.08 |
| tối, mưa | none / lam + lớp mưa | saturate(.95) contrast(.95) brightness(1.01) / ngà ấm rất nhẹ |
| Lãnh cung chiều, quang / mưa | none / ấm .03 (+ lớp mưa) | none / trong suốt (+ lớp mưa giữ nguyên) — y như cũ bằng mắt |
- Nhân vật: `--klf` = brightness(1) (KIT_LIGHT mặc định độ mạnh 0) → #mefig, .tok.fig, .kesimg giữ màu gốc; .light nằm dưới người.
- Ảnh đặt cạnh nhau cũ/mới: chiều mưa ở bản mới sáng hơn, ấm, hết ngả nâu sepia, khớp tờ dev/art/scene-light/rain-warm-ntc.jpg; tối mưa giữ tối;
  Lãnh cung (Trường Môn viện) không đổi.

## Thử chung
- 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390@3: sổ cũ (dựng bằng bản live) nạp "ok"; màn chính chiều mưa; hộp thoại việc khó xử
  có hình người (.kesimg filter "brightness(1) drop-shadow…" chạy đúng): 0 tràn ngang, 0 chữ cắt, 0 lỗi trang. 390x844: 0 lỗi (màn xoay ngang chưa có ở main).

## Đáng lo (không chặn)
1. Gộp nhánh mang theo cả phần ngoài phạm vi: KIT_LIGHT (tắt, độ mạnh 0 — không đổi gì), Tuần lục `kitBookFigClamp` (PROGRESS ghi "chưa đo lại"),
   j94 Dư đồ buổi trưa dùng map-<mùa>-trua (4 tranh có trên CDN, HTTP 200), công cụ da hồng/mép (dev/art), ALPHA_HOLES.md ~5,9 nghìn dòng,
   19 ảnh dev/shots/scene-light (~30 MB). Không thấy lỗi ở các phần này khi chạy, nhưng chưa duyệt kỹ.
2. KIT_LIGHT / .kown / .kwet chưa có mục trong KIT.md (luật KIT TRƯỚC): nên ghi một mục "ánh sáng cảnh/nhân vật theo buổi".
3. `.stage.kown .scimg{filter:none}` áp cho MỌI tranh riêng buổi (không chỉ Ngọc Thanh các): mọi nơi có tranh <tên>-<mùa>-<buổi> bỏ lọc cũ
   brightness 1.35/sepia — đúng ý "tranh đã chỉnh màu, sếp duyệt", nhưng cảnh khác chưa được chụp đối chiếu riêng.
