# Cảnh nền bản điện thoại (-ph) — nhánh review/scene-phone

## Trạng thái: TẠM DỪNG theo lệnh điều phối (14/11)
- Chủ đổi bố cục điện thoại/Fold: cảnh thành màn nhà TOÀN MÀN HÌNH (dọc / gần vuông), nên đặc tả 3:2 cũ có thể sai. Chờ đặc tả mới.
- Chưa vẽ ảnh nào. Tín dụng đã tiêu: 0. Chưa gọi simulate_cost / account_balance.

## Đã làm
- Tạo nhánh review/scene-phone từ origin/review/fold-layout (98d4f4bb).
- Đã đọc: brief chung, PROGRESS_seasons.md, gen_scene_seasons.py, KIT.md §30 (30.3 một cỡ sân khấu, 30.4 KIT_FANCHOR), jk2b §2 (kitFloorFit).
- Ghi nhận: trên fold-layout CHƯA có mã đọc KIT_STAGE_PH (grep 0 kết quả) — khi tiếp tục cần thêm vào jk2b §2: trong kitFloorFit,
  nếu KIT_STAGE_PH[scene] và sân khấu hẹp/dọc thì đổi url #scimg sang <tên>-ph.webp, đọc KIT_FANCHOR["<scene>-ph"].

## Đặc tả cũ (3:2, có thể thay)
- img/<cảnh>-<mùa>-<buổi>-ph.webp, 10 cảnh × 4 mùa × 4 buổi = 160; gpt-2-6, ảnh ngang cùng cảnh/mùa/buổi làm ảnh tham chiếu; không người.
- Thí điểm phi-tan-cung (16 ảnh) trước, ghép thử 686x880@2.2, 412x1058@2, 1180x820@2 với 2 người đứng trên neo.

## Mã lượt vẽ (generation id)
(chưa có)
