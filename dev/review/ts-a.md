# Kiểm duyệt: review/ts-a (1103c85e6, Top 15 lô A, jts.js) — FAIL

Ngày 2026-11-15, người duyệt kit số 2. Gộp thử lên origin/main d69030384: xung đột assemble.py (giữ danh sách main, `jts.js` trước j84),
index.html/sw.js (dựng lại); KIT mục "35. TOP 15 · LÔ A" trùng số với §35 màn tải → phải đánh lại (người duyệt đặt §39). kit_dupes OK.

## Thử
- `dev/test/ts-a.js` của nhánh KHÔNG chạy được trên main mới: màn "Luân hồi" (#kroul của jk2b) không đóng bằng "Bỏ qua" nữa → mọi ảnh chỉ thấy màn
  luân hồi. Người duyệt chạy bản sao gỡ #kroul + đợi ảnh tải: Fold 755x1000@2 đủ 16 bước, 0 lỗi trang, 0 tràn ngang, 0 chữ cắt (một lần chạy khác
  văng ở bước phối đồ vì không thấy nút Ra mắt — chạy lại thì qua; chưa rõ do máy tải ~50 hay do nhánh).
- Sổ cũ: ts-a.js báo `old:true`.

## Chặn (ảnh dev/shots/review/ts-a/)
1. **Hàng ô đồ Hội phối đồ không thẳng hàng** (`fold-2-phoi-do.jpg`): `.ts-it` là `<button>` trong lưới — nút căn giữa nội dung theo chiều dọc, ô có
   tên 3 dòng + "TINH PHẨM" 2 dòng bị đẩy lên: đỉnh hình lệch ~15 px CSS, dòng tên lệch ~12 px so với các ô cùng hàng (luật sếp 05:45Z: mọi hàng
   thẳng hàng). Sửa gợi ý: `.ts-it{align-self:start;display:flex;flex-direction:column;align-items:center}` hoặc ô bằng kitInvGrid của kit.
2. **Thanh trên cao thêm một dòng ở Fold** (`fold-thanh-tren-ngay-xuong-dong.jpg`): hai chip mới "Nguy hiểm chung: N" + "Xét phẩm: thiếu N" nằm ở cột phải
   thanh trên; khi có nút "‹ Phòng" thì dòng ngày "Tháng ba · thượng tuần · năm thứ / nhất" xuống dòng, hàng chỉ số tụt ~15 px — đúng lỗi sếp phàn nàn
   16:00Z 11/14 (thanh trên quá cao, ngày gãy dòng). Chip trạng thái phải vào chỗ không đẩy thanh trên (hàng Tình trạng của sân khấu / thẻ Chỉ số).
3. **Lễ tấn phong** (`fold-4-le-tan-phong.jpg`): người đứng trên tranh tĩnh vật (cuộn thánh chỉ trên khay, to hơn người) — sai tỉ lệ cảnh; Hoàng hậu
   có tên "Hoàng hậu Âu Dương Băng Tâm" mà hình lại là bóng xám Người lạ (biết tên mà không thấy mặt — trái luật Người lạ). Cần tranh cảnh có nền
   sàn (sân cung, chính điện) cho kitEventStage, hoặc chỉ tranh không người.
4. **Chữ trái VANPHONG / luật tên** : "thiện cảm +4", "nàng thiện cảm +5/+6/-6/-2" (sếp 05:15Z bỏ chữ "thiện cảm" trơn → "quý ta"); "Phi ???" trên thẻ
   Nguy hiểm chung và Lễ tấn phong (`fold-6-nguy-hiem.jpg`) trong khi bảng ghi "2 người ta đã rõ lòng"; nút "Lui" mới trong bảng Nguy hiểm chung
   (luật bỏ Thôi/Lui — người duyệt không chặn vì thiếu ✕, nhưng nhánh không được thêm nút Lui mới).
5. Bài thử của nhánh hỏng trên main hiện tại (xem trên) — thợ cần sửa để chạy lại 4 khổ (755x1000, 1000x755, 1180x820, 844x390).

## Chưa kiểm (vì FAIL sớm)
1000x755 / 1180x820 / 844x390, coop-e2e, bot cân bằng (thợ: n=4 sau khi hạ — chưa đủ mẫu, sai số rất lớn).

## Đạt (để thợ giữ)
Thẻ việc đủ Cần/Tốn/Được/Mất/Kèm + thang khả năng (triệu đánh đàn, du hồ, lì xì), trò nhỏ trong khung kit có Bắt đầu/Bỏ qua, ô đồ dùng kitItem,
bục vinh danh kit, không chữ Hán, không "%".
