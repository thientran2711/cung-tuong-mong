# Kiểm duyệt bộ giao diện: review/hotfix-card @ c2790e7 — FAIL (gần đạt)

Ngày 2026-11-14. Dựng nhánh (main 2bed83a + jk2b §18, j65), chơi thật bằng save cũ làm từ bản main (có thêm một hoàng tử).
Cỡ: 686x880@2.2 (Fold thật của chủ, thanh tab 2 hàng), 755x1000@2, 1180x820@2, 1366x1024@2, 412x1058@2.
Thẻ: phi tần (Hoàng hậu, người lạ), cung nhân, hoàng tử, Hoàng thượng (modal), Thái hậu (tab Giao tình, không có thẻ .pc). Mỗi thẻ: chụp đầu, cuộn 450 px, chụp lại.

## Đạt (lỗi chính của chủ đã hết)
- Mỗi thẻ đúng MỘT đầu thẻ (`.kphead`), một `.pcname`; không còn bản sao ở cột trái; đo 0 phần tử nào lọt vào dải đầu thẻ khi cuộn.
- Đầu thẻ đặc, dính ở mép trên thẻ; nội dung (ô Sủng/Đức…, thẻ việc) cuộn xuống DƯỚI nó ở mọi cỡ; cung nhân có thanh Lòng/Chủ tin trong đầu thẻ.
- 5 cỡ không lỗi trang, không tràn ngang; save cũ nạp được ở cả 5 cỡ. Thẻ Hoàng thượng (modal) đúng một đầu thẻ.

## Lỗi chặn
1. **Còn khe lộ chữ trên đầu thẻ.** Đầu thẻ nằm thấp hơn mép thẻ 1 px (đo hdTop = 1) và bo góc 8 px, nên khi cuộn thì mẩu chữ của ô bên dưới
   lộ ra thành một vệt mảnh ngay TRÊN đầu thẻ (thấy rõ ở 686x880@2.2; ảnh của chính thợ after-686x880-phitan.jpg cũng có). Trái với KIT 28.17
   "nothing shows above it" và luật chủ 16:15Z (thanh dính phải đặc, không gì lộ qua). Ảnh: dev/shots/review/hotfix-card/686x880-khe-tren-dau-the.jpg.
   Sửa: `top:-1px` (hoặc bỏ viền trên của thẻ / che bằng nền thẻ phía trên), bo góc trùng góc thẻ.
2. **Ở Fold 686x880 thẻ chỉ là một ô cuộn cao 235 px nằm đáy màn** (đầu thẻ ~70 px, còn ~165 px cho nội dung): thẻ việc đầu tiên bị cắt,
   phải cuộn trong một ô nhỏ — đúng điều chủ kêu "thẻ ở đáy màn, việc bị cắt". KIT 28.17 nói "lấy cả chiều cao khung khi phần còn lại < 320 px"
   nhưng ở 686x880 khung chỉ ~388 px nên vẫn ra 235 px. 755x1000: 353 px (dùng được); 412x1058: 299 px.
   Sửa: khi mở một người trên màn dọc < 1000 px, cuộn khung để thẻ chiếm trọn khung (đẩy dải chọn người lên trên), hoặc thu dải chọn người;
   phần bố cục lớn hơn thuộc review/fold-layout nhưng hotfix phải đạt "mở ra là thấy trọn" như chính commit ghi.

## Ghi chú
- Thái hậu không có thẻ người (.pc) — tab Giao tình là danh sách; không thuộc hotfix này.
- Hoàng tử do người kiểm thêm vào save (mkKid) hiện "Người lạ" — do cách thêm, không phải lỗi nhánh.
- Nhãn tên trên sân khấu 686 (người chơi và "Người lạ") chồng nhau — có từ main (j59), báo thợ bố cục.
