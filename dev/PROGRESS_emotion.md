# PROGRESS emotion (review/emotion, gốc origin/review/balance)

- Tờ thử dấu cảm xúc (gpt-2-6, Magnific Do7wKfLpcl, folder ba4aecfe, 65 credit, style ref face-consort-01): 10 dấu tròn — vui (hoa mai), binh (lá sen mặt nước), buon (mây mưa), gian (ngọn lửa), so (chim sẻ nép lá trúc trong gió), ghen (mẫu đơn gai), lo (cuộn chỉ rối), dau (quạt gãy), muu (quân cờ vây), an (chưa rõ: dấu mây xám).
- Cắt bằng scratchpad cutemo.py (khóa nền xanh, mặt nạ tròn) → img/kit/emo-<k>.webp 160px; tờ xem: dev/shots/emotion/pilot-emo-sheet.jpg
- 21:45Z chủ nhân đổi: dấu phải là MẶT NGƯỜI biểu cảm. Vẽ lại một tờ (gpt-2-6, Magnific VXUS1HqMMU, 65 credit): cùng một gương mặt nữ chung chung, 10 nét mặt; cắt bằng cutemo.py rồi zoomemo.py (phóng mặt 0.62R, giữ viền vàng vẽ) để đọc được ở 24–32px. img/kit/emo-*.webp thay bộ cũ (bộ biểu tượng cũ Do7wKfLpcl bỏ, không còn trong img/). Tờ thử + cỡ nhỏ: dev/shots/emotion/pilot-emo-faces.jpg
- Module dev/build/jemo.js (sau j84 trong assemble.py): xem đầu tệp.
- 22:00Z chủ nhân đổi lần 2: mặt kiểu emoji nét mực, nền đơn sắc rõ (gpt-2-6 VXUSjSlMMU); nền bình thường/ghen chỉnh màu (recol) cho đúng ngọc nhạt / xanh lá. Tờ: dev/shots/emotion/pilot-emo-ink.jpg. Thêm vầng màu quanh khung (.kin.kemo-r).
- Phanh Đức + tính nết (chủ nhân): EMOTION_PLAN.md mục 4; Hoàng thượng chọn người theo tâm trạng (giận ai / thương ai / buồn thì tìm người hiền).
- Đo: dev/measure/run5b.sh, off (window.__emoOff=1) và onA, 5×6 đời mỗi bên, ra ở scratchpad/emobal (máy rất tải: load ~60).
- Ảnh chụp: scratchpad/emoshot.js (route thay server; 686x880@2.2, 1180x820@2).
CÒN: kết quả đo, ảnh chụp vào dev/shots/emotion, nối kitFaceExpr khi review/appearance có (API window.kitEmotion(p).expr).
- 23:10Z chủ nhân: dấu kiểu cổ trang (búi tóc cài trâm) — tờ thử dev/shots/emotion/pilot-emo-hairpin.jpg, tệp ở dev/art/emo-hairpin/ (gpt-2-6 rgepFSAxtc). CHƯA thay img/kit/emo-* (đang là bộ mặt nét mực) — chờ duyệt rồi chép sang img/kit.
- Bỏ vầng màu quanh khung (chủ nhân). Bỏ móc nét mặt (chủ nhân 22:50Z). Gỡ ảnh chụp bố cục cũ.
- KHÔNG gộp review/page-curl lúc này (điều phối: chờ sách hai trang chốt). Ghi chú khi gộp: page-curl dựa trên main, thiếu cả nhánh balance; assemble phải hợp hai danh sách (scratchpad mergeasm.py), bỏ j80.js (balance đã gộp vào j76).
- Đo: off n=31 HH 35% chết sớm 35%; on v1 n=30 HH 47% / 43% (vòng vui→thị tẩm tự khuếch) → hãm v2 (EMOTION_PLAN mục 4). Đang chạy onC (v2) và offC (thêm mẫu gốc) ở scratchpad/emobal; phân tích: python3 dev/measure/anemo.py "off=.../off*_*.json" "on=.../onC_*.json".
