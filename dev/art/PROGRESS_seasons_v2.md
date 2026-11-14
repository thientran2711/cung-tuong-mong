# Cảnh nền 4 mùa × 4 buổi — VẼ LẠI (nhánh review/seasons, từ origin/main 574f5602)

Yêu cầu chủ: "Vẽ lại 4 mùa cho đẹp, cũng sáng trưa chiều tối của từng mùa". CHƯA nối vào game — chờ chủ duyệt bản thử.

## Bộ cũ (img/<cảnh>-<mùa>-<buổi>.webp, 10 cảnh × 16 = 160, review/scene-seasons, đã ở main) — chỗ yếu
1. Bóng bẩy kiểu "AI": màu bão hòa, nước xanh ngọc, viền sáng, chi tiết dày đặc khắp khung; khác hẳn nét màu nước của title-key và tranh Mệnh truyện st-*.
2. Mùa Xuân và Hạ gần như giống nhau: cả hai đều mẫu đơn hồng trong bồn, liễu xanh, sen nở trong hồ (sen mùa xuân là sai).
3. Sáng và trưa gần như một tấm (chỉ đậm màu trời hơn); bóng không ngắn lại; chỉ chiều (vàng) và tối (đèn) đổi rõ.
4. Bố cục chật: tiền cảnh mẫu đơn to chiếm góc trái dưới, sàn đá chỉ một dải chéo — người đứng lẫn vào hoa.
5. Chỉ có MỘT khổ 16:9 (1280x720). Đo trên main (Playwright, khung #stage): Fold 755x1000 = 739x400 (ngang 1,85), nhưng iPad 1180x820 = 593x614, 1366x1024 = 688x818, 1024x768 = 513x562, điện thoại 412x1058 = 396x423, 390x844 = 374x338 (gần vuông/dọc). Trên iPad và điện thoại ảnh 16:9 bị cắt còn ~45–55 % bề ngang giữa — mất đình, cây, cầu; người đứng trước một mảng lan can.
6. Độ phân giải 1280x720: Fold @2 cần ~1480 px ngang → hơi mờ.

## Cách vẽ mới (bản thử Ngự hoa viên)
- gpt-2-6, 2k (65 tín dụng/ảnh, exact). Thư mục Magnific ba4aecfe-efce-47e2-b53f-30d292091886.
- Mỗi khổ một tấm GỐC Xuân-sáng vẽ mới (tham chiếu: ảnh cũ ngu-hoa-vien chỉ để giữ chỗ chốn; st-dtq-bien-c1 + st-dtq-binh-bia làm chuẩn nét màu nước). Lời nhắc: màu nước/gouache trên giấy, nét mực mảnh, màu dịu, không bóng CG, không bão hòa; sàn đá trống rộng ở 40 % dưới cho người đứng, hoa chỉ ở hai bồn góc.
- 15 tấm còn lại của khổ đó = SỬA từ tấm gốc (giữ nguyên khung, chỉ đổi mùa/ánh sáng) → cùng một chỗ.
- Hai khổ: NGANG 16:9 (2688x1520 → lưu 1920x1080) cho Fold; DỌC 3:4 (1536x2048 → lưu 1200x1600) cho iPad + điện thoại (bố cục dọc riêng, không cắt).
- Mùa: Xuân đào/mận hồng trắng, liễu non vàng xanh, mưa bụi sương, hồ không sen; Hạ cây lá xanh đậm, sen hồng trắng phủ hồ, trời xanh mây trắng; Thu phong đỏ, ngân hạnh vàng, liễu úa, lá rụng, cúc trong bồn, sương trên hồ; Đông tuyết phủ mái/lan can/non bộ, hồ đóng băng, liễu trơ, hồng mai đỏ thắm.
- Buổi: sáng mát nắng xiên trái bóng dài nhẹ; trưa trong sáng, bóng ngắn ngay dưới chân; chiều mặt trời thấp bên phải vàng cam, bóng chéo dài; tối trời chàm, trăng tròn, đèn đá trên lan can, đèn lồng ở đình, sàn vẫn đọc được.
- Sàn (KIT_FLOOR) mới: ngang ~0.74, dọc ~0.64 (ảnh cũ 0.62).

## Lượt vẽ (mã Magnific)
- Tham chiếu tải lên: aF2ZTOdfSh (ngu-hoa-vien cũ), N2FQxtR6D9 (st-dtq-bien-c1), huR3cJxvqL (st-dtq-binh-bia).
- NGANG: gốc xuan-sang UPmtFrTwny (bỏ 0egl42lTfW); ha-sang 5jVTIb5Kxe; thu-sang rgepaLgxtc; dong-sang JNavk0oOq4 (bỏ fHA2DFTCDY: mai hồng nhạt, không đỏ); xuan-trua s7oBQZBl8e (bỏ JNavKicOq4: bóng bẩy, nước xanh ngọc); xuan-chieu 8aN9YugIrU; xuan-toi SytIH6sUb8.
- DỌC: gốc xuan-sang rgephkLxtc (bỏ ksDMtbq16B); ha-sang 5jVTm3iKxe; thu-sang 1lpDaAEr4r; dong-sang p8J72xZehw; xuan-trua eIOJAsjdqL; xuan-chieu 1lpDaW1r4r; xuan-toi Bh4Pn7CoQR.
- 18 lượt × 65 = 1.170 tín dụng.

## Tệp
- Ảnh ứng viên (chưa nối game): dev/art/seasons-v2/ngu-hoa-vien-<mùa>-<buổi>.webp (ngang 1920x1080) và …-p.webp (dọc 1200x1600).
- Bảng so sánh: dev/shots/seasons/pilot/ngu-hoa-vien-ngang-cu-moi.jpg (cũ | mới, 7 hàng, đủ cỡ 1280x720), ngu-hoa-vien-doc-cu-moi.jpg (hàng trên: ảnh cũ như hiện trong khung iPad; hàng dưới: dọc mới), ngu-hoa-vien-khung-san-khau.jpg (đúng khung sân khấu từng máy, @2, cũ và mới).

## Kế hoạch triển khai (chờ duyệt)
- Mỗi cảnh: 2 khổ × 16 = 32 ảnh. 10 cảnh = 320. Đã có 14 (Ngự hoa viên) → còn 306 ảnh.
- Lượt: Ngự hoa viên còn 18; 9 cảnh khác × (2 gốc × 2 phương án + 30 sửa) = 306 → 324 lượt × 65 = 21.060; dự trù vẽ lại ~15 % → ~24.200 tín dụng.
- Tự soát bản thử: Xuân/Hạ/Thu/Đông khác hẳn nhau; sáng/trưa/chiều/tối đổi bằng ánh sáng thật (bóng dài→ngắn→chéo dài→đèn+trăng); cùng một khung ở cả 7 tấm mỗi khổ. Còn nhẹ: trưa mới bóng ngắn nhưng chưa "gắt" lắm (bản gắt hơn thì lại bóng bẩy — đã bỏ); khổ dọc ở điện thoại 390x844 (khung 374x338) theo luật sàn KIT_FLOOR cắt mất ngọn đình → khi nối nên đặt KIT_FLOOR khổ dọc ~0.58.
- Tái tạo bảng: python3 dev/art/seasons_v2_sheets.py (ảnh thô ở scratchpad/seas/raw; tải lại bằng seasons_v2_dl.py <id> <url> từ creations_get; ART=1 để ghi lại webp).
- Khi nối game: SCN_VAR/j94 thêm khổ dọc (chọn theo hình khung #stage như kitBdShape: dọc/vuông → -p), KIT_FLOOR riêng cho tên mới, j12 giảm lớp phủ tối vì ảnh tối đã tự tối. Thay img/<cảnh>-<mùa>-<buổi>.webp, giữ tên.
