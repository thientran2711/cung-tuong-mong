# Cảnh nền theo MÙA × BUỔI (nhánh review/scene-seasons)

## Phạm vi (đã kiểm trong mã)
- 10 ảnh nền cảnh: 9 trong SCIMG (j6) + tẩm cung người chơi `tam-cung-dem` (j21 `SCIMG.home`).
  duong-tam-dien, khon-ninh-cung, kinh-su-phong, lanh-cung, ngu-hoa-vien, ngu-thu-phong, phi-tan-cung, tam-cung-dem, thai-y-vien, tu-ninh-cung.
- Biến thể sẵn có: chỉ `tam-cung-dem` (bản đêm). Không có bản khác.
- Mùa: SEASON[S.month-1] (j1) → xuan/ha/thu/dong.
- Buổi: main hiện có 3 buổi (BUOI j1: Sáng/Chiều/Tối, S.buoi 0..2); chủ báo sắp đổi sang 4 buổi Sáng/Trưa/Chiều/Tối (S.buoi 0..3). Vẽ đủ 4: sang, trua, chieu, toi. j94 tự nhận thang 3 hay 4 buổi qua BUOI.length.
- Tên tệp: img/<tên>-<mùa>-<buổi>.webp. Bản gốc img/<tên>.webp giữ làm dự phòng.

## Số lượng và tín dụng ước tính (ghi TRƯỚC khi vẽ hàng loạt)
- 10 cảnh × 4 mùa × 4 buổi = **160 ảnh** (ban đầu 4 mùa = 40, rồi 3 buổi = 120, nay 4 buổi = 160).
- Magnific gpt-2-6 EDIT trên ảnh gốc (giữ bố cục/đường sàn): 40 tín dụng/ảnh (simulate_cost, exact).
- 160 × 40 = 6.400 tín dụng; dự trù vẽ lại ~20% → **~7.700 tín dụng** (tài khoản còn ~2,09 triệu).
- Thứ tự: 4 mùa buổi SÁNG cho mọi cảnh → TỐI → CHIỀU → TRƯA.
- Mỗi ảnh EDIT thẳng từ ảnh gốc (không nối tiếp ảnh đã sửa) để không trôi bố cục. Không dùng style ref (ảnh gốc đã là chuẩn phong cách). Đầu ra 1344x752 → cắt-co về 1280x720, webp q~80.

## Tiến độ
- [x] SÁNG: 40/40 (10 cảnh × 4 mùa), đã xem từng ảnh: bố cục, phối cảnh, sàn giữ nguyên; không có người. 40 lượt × 40 = 1.600 tín dụng (thêm 0 lượt vẽ lại).
- [x] TỐI: 40/40, đã xem từng ảnh: trăng, đèn lồng, nến; bố cục và sàn giữ nguyên. 40 lượt tính phí = 1.600 tín dụng (1 lệnh bị bộ lọc phía máy chặn trước khi gửi, không tính phí; gửi lại với lời nhắc dịu hơn).
- [x] CHIỀU: 40/40, đã xem từng ảnh: nắng vàng xiên, bóng dài; bố cục và sàn giữ nguyên. 40 lượt = 1.600 tín dụng.
- [x] TRƯA: 40/40, đã xem từng ảnh: nắng gắt trên đỉnh, bóng ngắn, sáng nhất; bố cục và sàn giữ nguyên. 41 lượt (1 lượt lỗi máy chủ 520 ở ngu-thu-phong-dong-trua, vẽ lại) = 1.640 tín dụng.

## Tổng kết
- 10 cảnh × 4 mùa × 4 buổi = **160 ảnh** img/<cảnh>-<mùa>-<buổi>.webp, 1280x720 (như gốc), webp q50–80, mỗi tệp ≈ 1,0–1,3 lần ảnh gốc (tổng ~37 MB). Ảnh gốc giữ nguyên làm dự phòng.
- Không ảnh nào phải vẽ lại vì lệch bố cục: gpt-2-6 EDIT giữ nguyên khung, cột, đồ đạc và sàn ở cả 160 ảnh (đã so từng ảnh với ảnh gốc trên bảng ghép).
- **Tín dụng: 161 lượt tính phí × 40 = 6.440 tín dụng** (ước tính trước 6.400–7.700).
- tam-cung-dem (gốc là đêm): bản sáng/trưa/chiều được đổi sang ban ngày (đèn tắt, không trăng); bản tối giữ đêm.
- Cảnh trong nhà đổi mùa qua cửa sổ/cửa (hoa đào, cây xanh và sen, lá phong, tuyết và mai đỏ), hoa trong bình (đào, sen, cúc, mai), quạt tròn mùa hạ, lò than đồng mùa đông, rèm (Phi tần cung: hồng / xanh nhạt / vàng hổ phách / gấm đỏ).

## Mã
- dev/build/j94.js (mới, chỉ dữ liệu + hàm sceneImg): chọn <cảnh>-<mùa>-<buổi> theo SEASON[S.month-1] và S.buoi; tự nhận thang 3 buổi (main hiện tại: sáng/chiều/tối) hoặc 4 buổi (BUOI.length>=4: sáng/trưa/chiều/tối). Thiếu bản → buổi ngày gần nhất (tối chỉ lấy tối) → ảnh gốc. Bọc renderStage (j6), pxScene (j11), evArt (j17): trước mỗi lần gọi đặt SCIMG[k] = bản mùa/buổi (nên cả ô bản đồ j9 cũng theo mùa); pxScene được ép nạp lại nền khi ảnh đổi; KIT_FLOOR (kit-2b) được nhân bản sang tên mới để đường sàn vẫn đúng. Thêm vào assemble.py trước j84.
- SCN_VAR (danh sách bản có thật) viết lại bằng `python3 dev/art/gen_scene_seasons.py` khi thêm/bớt ảnh.
- Thử: dev/test/scene-seasons.js (Playwright; BUOI4=1 giả lập 4 buổi).
- Lưu ý cho người gộp: j12 lightTick còn phủ lớp màu theo buổi (tối: xanh đậm 50%) lên ảnh nền; nay ảnh tối đã tự tối nên có thể muốn giảm lớp phủ đó (không sửa ở đây vì j94 không được có CSS).

## Ảnh xem trước
dev/shots/seasons/<cảnh>.jpg — mỗi cảnh một tấm: hàng = sáng/trưa/chiều/tối, cột = ảnh gốc + Xuân/Hạ/Thu/Đông.

## Tín dụng (credits)
- Ảnh: Magnific, mô hình GPT 2.6 (gpt-2-6) chế độ sửa ảnh, trên chính các ảnh nền gốc của dự án; thư mục Magnific ba4aecfe-efce-47e2-b53f-30d292091886. Không dùng ảnh tham chiếu phong cách ngoài (ảnh gốc là chuẩn phong cách).
- Thực hiện: thợ vẽ cảnh nền (Claude), 14/11.

## Thử Playwright (dev/test/scene-seasons.js, dev/test/scene-seasons-pixi.js)
- 755x1000@2 và 1180x820@2; mỗi cỡ chạy 2 lần: thang 3 buổi (main hiện tại) và giả lập 4 buổi (BUOI4=1). 4 mùa × mỗi buổi × 10 nơi (9 cảnh SCIMG + tẩm cung): 120 + 160 lượt mỗi cỡ.
- Kết quả: ảnh nền #scimg và evArt() đúng <cảnh>-<mùa>-<buổi> ở 100% lượt (0 sai); không lỗi trang, không lỗi console, không 404. Chân người: 11–16 px (755) / 11–26 px trên đáy sân khấu, y như ảnh gốc (main chưa có KIT_FLOOR).
- Với kit-2b (nạp jk2b.js vào trang): KIT_FLOOR của tên mới = giá trị của ảnh gốc (vd ngu-hoa-vien-xuan-sang 0.62, tam-cung-dem-ha-chieu 0.70), --kfb giữ nguyên → đường sàn đúng.
- PIXI (j11): nền PIXI nạp đúng bản mùa/buổi (img/ngu-hoa-vien-xuan-sang → ha-chieu → thu-toi → dong-sang), kể cả khi khoá PX.key trùng (j94 ép nạp lại).
- **Lỗi có sẵn trên main (không do nhánh này):** PIXI không bao giờ khởi động được trong game vì j11 `st.insertBefore(c,$("sc-t"))` và `lightTick` chèn trước #sc-t, nhưng #sc-t không còn là con trực tiếp của #stage → lỗi bị nuốt, PX.failed=true. (Kiểm trên bản dựng không có j94: cùng lỗi.) Bài thử PIXI phải vá insertBefore tạm để chạy được.
- Ảnh chụp trong game: dev/shots/seasons/game/*.jpg.
