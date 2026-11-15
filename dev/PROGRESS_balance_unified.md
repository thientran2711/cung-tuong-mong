# PROGRESS — review/balance-unified (hợp nhất đồ mặc j92 vào Tư trang, 15/11)

Gốc: origin/wip/balance-on-main b0b228da2 (balance + emotion gộp thử lên main) + gộp origin/main f7a9e9880 (sạch, không xung đột).

## Việc đã làm
- dev/build/jwdinv.js (mới, ngay sau jinv): một Tư trang.
  - Túi (kitInvGrid): trâm WD ở tab Trang sức, y phục WD ở tab mới "Y phục"; tranh img/wd-<key>.webp, nền phẩm, góc Xa xỉ N;
    món đang cài/mặc có dải "Đang cài/Đang mặc", món cầm cố có thẻ "đang cầm". Chạm → một khung món: Phẩm · Được · Mất · Ghi chú
    ("chưa rõ phẩm" cho tới khi biết) + thẻ Cài/Mặc (1 khắc) · Tháo · Tặng · Bán lén · Cầm cố · Chuộc lại (luật j92).
  - Đang mang: Cài tóc = p.wd.tram, Y phục = p.wd.y (kho j92, NPC dùng y như cũ). Chạm ô → chọn món khác, May áo từ vải, Tự chọn đồ, Chải chuốt.
  - Mọi món cài tóc của j8/j97 (kể cả trâm ngự tứ hiếm) thành trâm WD. Vải "May áo" may thành áo WD thật (Lụa Hàng Châu → Áo lụa Hàng Châu vân thủy,
    Gấm Tô Châu → Áo gấm Tô Châu thêu mẫu đơn, Gấm minh hoàng → Triều phục minh hoàng thêu phượng) vào ô Y phục; S.dress (áo 3 tháng) bỏ.
  - MỘT wearBonus: trang sức IT.sl (×1,5 khi trên phẩm, luật j8 thấy được) + 2 ô WD (đúng hiệu ứng món, không ×1,5 để Vượt phẩm vẫn ẩn và số hiện = số luật) + khăn che mặt.
  - MỘT luxOf: đọc cả 2 ô WD (Xa xỉ = [8,16,28,44,64][phẩm] + giá/10 như đã duyệt). Mức cho phép ẩn = 36+16×bậc (+10 Sủng≥60) + xa xỉ trung bình
    của bộ phẩm phục đúng bậc (đồ Nội vụ phủ cấp không bao giờ thành "quá xa xỉ"). Không hiện mức cho phép.
  - Luật ẩn Đúng/Vượt phẩm j92 giữ nguyên (nhận xét, Hặc, Chải chuốt, Tự chọn); ghen do Vượt phẩm của j92 bỏ → ghen theo luật xa xỉ (jinv luxMonth).
    Chip trạng thái chỉ hiện khi đã biết / có người nói. Chip "N món vượt phẩm" chỉ đếm cái nàng thấy được.
  - Sổ cũ: món cài tóc đang đeo (e.w) → ô Cài tóc; S.dress còn hạn → áo WD tương ứng ở ô Y phục (cả NPC).
- j92: bỏ khối giao diện riêng (wdInvHTML + bọc invHTML), bỏ bọc wearBonus, bỏ ghen Vượt phẩm hằng tháng. jk2b: bỏ K2 Rương đồ. KIT 28.14 ghi lại.

## Kiểm
- Sổ main (tramngoc + vongngoc đang đeo, S.dress gấm Tô Châu, NPC có trâm + áo): nạp được, chuyển đúng ô; 6 khổ 0 lỗi trang, 0 tràn, 0 chữ cắt;
  mặc/tháo trâm, May áo, Xa xỉ hiện = tổng luxVal từng món (97 = 21+38+38).
- Bot: xem báo cáo cuối.
