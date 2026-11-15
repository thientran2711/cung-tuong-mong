# Hàng duyệt R6 (người duyệt kit, 2026-11-15) — dừng theo lệnh điều phối, CHƯA có kết luận

Không có ref nào sẵn sàng đẩy main.

| Nhánh | Trạng thái |
|---|---|
| review/gift-chest @ a6642c2dd | ĐANG KIỂM, chưa kết luận. Bản gộp dở trên main d69030384 đẩy ở `review/gift-chest-wip` (main đã lên 6e6c2ae6d: phải gộp lại) |
| review/weather @ 09a8af91b | CHƯA BẮT ĐẦU thử trình duyệt; mới đọc mã (ghi chú bên dưới) |
| review/rank0-ivory @ f1db91621 | CHƯA BẮT ĐẦU (mới đọc jkpor, ghi chú bên dưới) |
| review/img-quality @ badc75e45 | CHƯA BẮT ĐẦU |
| review/emo-men @ 8bc5b0d40 | CHƯA BẮT ĐẦU |

## gift-chest — đã làm trên `review/gift-chest-wip`
- Gộp main d69030384: assemble.py lấy bản main (jcdn + cdn()) và thêm `jrankset.js`, `jflow.js` sau `jwdinv.js`; index/sw/assets dựng lại.
- Bỏ `img/kit/mo-pouch*.webp` khỏi git (luật CDN); md5 hai tệp = bản trên CDN (HTTP 200).
- Sửa của người duyệt:
  1. `jflow.js`: tên túi "Túi vải" → "Túi gấm" (tranh là túi gấm thêu, KIT ghi túi gấm).
  2. `jrankset.js`: quà nhà mẹ đẻ + phẩm phục nhập cung gắn vào `nlRun` (và `start()` khi `__nlInner`), không gắn vào `start()` ngoài.
     Trước: nếu tranh nhân vật chưa tải xong (nlBegin chờ bằng setInterval) hoặc "Đổi thân phận" (nlReroll gọi nlRun), quà
     sẽ không có hoặc bị đẩy vào S CŨ (kiếp đang mở). Thêm: chưa mở hộp khi thẻ "Thân phận kiếp này" còn trong Q.
- Thử `dev/test/gift-chest.js` (mới, của người duyệt) ở 755x1000@2 (máy tải 50–65, rất chậm): đi đúng luồng thật (Luân hồi → Bỏ qua →
  Nhận thân phận) → 2 hộp gấm (Mẫu thân tặng Trâm ngọc bích, Phụ thân gửi …) rồi rương "Phẩm phục nhập cung · Quý nhân" (Tinh phẩm áo,
  vòng ngọc, Trân phẩm trâm): dải phẩm trên viền ô, tên dưới ô, không bảng trắng, ô thẳng hàng — ĐẠT bằng mắt. Thăng phẩm → rương; nhặt →
  túi gấm; giáng phẩm → hộp thoại "Thu hồi đồ vượt phẩm" (thái giám toàn thân trái, 3 ô đồ, dòng phụng chỉ) — ĐẠT bằng mắt.
  Chưa xong: số đo report.json, 3 khổ còn lại, sổ cũ (không rương bù), coop-e2e. Bộ thử treo ở bước quét tab Giao tình sau chuỗi
  mua/bán/nhặt/tặng/giáng (thử rời bằng probe thì KHÔNG treo, quét 12 s) — chưa rõ do bộ thử hay do game; người kế tiếp chạy lại 1 khổ
  với dòng STUCK (Debugger.pause in ra ngăn xếp) đã cài sẵn.
- Ảnh chụp mua: chưa bắt được cảnh bay (chụp sau khi xong).
- LƯU Ý xung đột: rank0-ivory (jmark) cũng làm "rương thăng phẩm qua kitReward" → hai rương mỗi lần thăng phẩm nếu cả hai vào.

## weather — đọc mã
- Đi đường KHÔNG thêm khắc (chỉ jweather, không đụng j77). Rủi ro chỉ trên việc ngoài trời (WX_OUT + nơi "vuon"), NPC cùng luật.
- Phải sửa: `wxRiskWord` dùng thang riêng ("khả năng thấp / đôi khi / dễ / rất dễ") — main đã có sub-odds: dùng `chanceW()` (Rất thấp…Rất cao).
- 6 ảnh item-du/aotoi/giaycoi (256 + 512) = bản CDN (md5 khớp) → bỏ khỏi git khi gộp. Gộp main chỉ xung đột assemble/index/sw/assets.
- "Bạc -6" dùng gạch nối thay dấu trừ "−".

## rank0-ivory — đọc mã
- jkpor: `KIT_POR.dx=.18` nhưng phần dư mỗi bên chỉ (1,14−1)/2 = 0,07 bề rộng ô → lệch thân lớn có thể mở khe trống một bên
  (trái luật "không khe hai bên"); phải đo ±1 px ở 5 khổ. CDN có CORS `*` nên đo canvas chạy được.
- Đụng jemo (emoBadge) như emo-men; đụng chân dung như img-quality (jimg) — duyệt chung.

Thư mục tạm của người duyệt (`_rv/`) không đẩy.
