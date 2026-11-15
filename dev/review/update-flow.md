# Kiểm duyệt: review/update-flow @ 41c33af3 — PASS

Ngày 2026-11-15. Gộp lên main-next (main c5b93e63 + sửa Ân oán d7c9d6ef). Xung đột: KIT §35.2 (lấy bản của nhánh, thay hẳn đoạn "tự mở sau 3 giây"), sw.js (dựng lại).
Người kiểm tự chạy trên bản gộp (sw-overlays.sh + sw-serve.js + sw-update.js):
- play (Fold 755): 24/24 — giữa buổi không mở lại, chỉ chip "Có bản mới" trên thanh trên, thẻ Để sau / Mở bản mới; Qua buổi → tự mở bản mới,
  đúng sổ, buổi kế, đúng tab, 0 mất; Mở bản mới → đúng sổ/buổi/khắc/tab; màn đầu → mở ngay.
- away (iPad 1180): 10/10 — về nền ngắn không mở lại; ≥ 10 phút → tự mở, đúng chỗ.
- main (iPad 1180, bản main cũ trên máy sếp): 5/5 — mở lại một lần là bản mới, sổ cũ nạp.
- coop (Worker sống, Fold + iPad): 25/25 — cả hai thấy bản mới, không ai rớt; Qua buổi → cả hai mở bản mới, cùng phòng, cùng ghế, cùng tuần;
  "Cùng mở" từ chủ phòng → khách nhận thẻ Cùng mở / Để sau → cả hai cùng bản.
- Kit 755 + 412 (5 tab): 0 lỗi, 0 tràn, 1 #panel. Sổ cũ (main c5b93e63) nạp. coop-e2e 59/59.
Kèm (cùng lượt, lệnh điều phối): Ân oán thanh quý hai chiều có vạch giữa, thẻ "Ngươi" có Đã biết, thẻ không cột phải → 2 cột (KIT §36; ảnh
dev/shots/review/hau-cung-ui/sau-sua-*).
