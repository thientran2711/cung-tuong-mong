# Kiểm duyệt kit: review/men @ 714e4e56 — PASS (người duyệt thứ 2, 15/11)

Gộp lên main c30884d9e (đã có bỏ bìa tím + map-anim). Nhánh rvb-men.

## Sửa khi gộp
- assemble.py: jmen sau jk4, trước jcoop/jcooplobby/jcoopworld/jload/j84.
- jk4.js: BỎ bản `KIT_FB` + `kitFigBody` của men (dòng ghi chú thay chỗ); dùng bản duy nhất ở jkit.js (có cột thân cl/cr). Giữ `kitEsFit` của men
  (main jk4 đã gọi `kitEsFit` nếu có). KIT.md §33.6: giữ đoạn men, ghi rõ kitFigBody ở jkit một bản; bảng đo cũ ghi "trước 11/15 (đã thay)".
- **Tranh thị vệ thive-3 / thive-4 bị mất trên nhánh**: commit 38b772c7 (lượt 3) lỡ xóa 16 tệp fig/por thive-3/4 + 8 bản ghi FIGURES-others.json + ảnh
  thive-all.jpg mà f5a9b226 đã vẽ (phiên thợ song song). Người duyệt trả lại từ f5a9b226 (cutcheck 0.15–1.41, đạt). Nay đủ 4 thị vệ 4 dáng × 4 tuổi.
  Áo thị vệ 4 đỏ thẫm (câu hỏi đổi xanh chàm vẫn chờ sếp) — không đổi.
- Chữ Hán: jmen `ini:"官"` → "Quan" (luật không chữ Hán; sửa trong lượt gộp inventory).

## Kiểm (bản gộp, sổ cũ do bản main ghi)
- 755x1000@2, 1180x820@2, 1366x1024@2, 412x1058@2, 390x844@3, 1024x768@2: sổ main nạp + 3 lần Qua buổi được; mọi tab 0 lỗi trang, 0 tràn ngang,
  0 chữ bị cắt, thẻ việc cùng cỡ mỗi hàng.
- dev/test/men.js (755, 1180): sổ không jmen nạp được (9 nam nhân, menWhy dựng lại); thẻ bắt gặp hiện, 2 người; sân khấu có thị vệ; Dư đồ có Ngoại triều.
- Thẻ "Nam nhân nơi cấm địa" trên giao diện sách (ảnh mfold-card*): người đứng trên tranh, chỉ phần lựa chọn cuộn, mỗi lựa chọn đủ Tốn/Được/Mất/Kèm
  + bậc may rủi (Báo thị vệ chắc nên không ghi chữ), tên người lạ "???".
- Bot: máy rất chậm (tải 36 trên 4 nhân) — xem số đo trong báo cáo cuối.

Ảnh: dev/shots/review/men2/.
