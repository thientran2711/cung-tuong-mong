# PROGRESS: kit chuyển động (review/kit-motion)

KIT READY: motion (j93 + img/kit/mo-*.webp + KIT.md mục "CHUYỂN ĐỘNG"; ảnh thử dev/shots/motion/)

Chủ kit chuyển động. Nhánh `review/kit-motion` (từ origin/main a4fbec0). Không gộp main; chờ kiểm duyệt bộ giao diện.

## Đã xong
- `dev/build/j93.js` (mới, trong assemble.py trước j84): bộ chuyển động dùng chung + gắn vào game. Mô tả: `dev/kit/KIT.md` mục "CHUYỂN ĐỘNG".
- 44 ảnh `img/kit/mo-*.webp` vẽ bằng Magnific gpt-2-6 (1 style ref face-consort-01; ảnh "mở" dùng ảnh "đóng" làm image ref), nền trong suốt (remove-background; dấu son và mực tách nền trắng bằng độ đậm).
- Nhóm 1 lật thẻ, 2 quẻ tuần, 3 kết quả (dấu son chữ Việt THÀNH/BẠI, số bay, thanh chạy), 4 thăng phẩm (thánh chỉ, đổi khung, chip) / giáng phẩm, lãnh cung (tối dần, lá khô), 5 qua buổi (dải trời + nén nhang) / qua tuần (lật lịch), 6 có thai, sinh con (mẫu đơn nở) / chết (mực loang → Kiếp này), 7 ban thưởng (mâm, rương, rương rồng phượng, hộp gấm; chạm mở, món bay theo vòng cung theo phẩm cấp, bạc nảy), 8 bảng mở + nút lún khi chạm, cảnh báo nguy hiểm (viền đỏ), 9 thời tiết (chip có biểu tượng vẽ + bảng tác động thật).
- SỬA LỖI thời tiết không hiện: j11 `pxLoad` và j12 `lightTick` chèn lớp trước `#sc-t`, nhưng `#sc-t` đã nằm trong `#stop` → insertBefore lỗi → lớp PIXI (mưa, tuyết, hoa, lá, đom đóm, chớp) và lớp ánh sáng theo buổi CHƯA BAO GIỜ chạy. Nay chèn trước `#stop`. Thêm: j11 tính kích thước bằng `renderer.width/resolution` (PIXI v8 đã là px CSS) → trên máy 2x ảnh nền và hạt chỉ phủ 1/4 khung; nay dùng `app.screen`. Không đổi cơ chế, chỉ hạt to và đậm hơn (j93).
- Con dấu kết quả đổi sang chữ Việt "THÀNH" / "BẠI" (vẽ lại gpt-2-6); đã rà mọi ảnh của bộ: không còn chữ Hán cần đọc (thánh chỉ, lịch, thẻ bài, ống xăm, rương đều trơn hoặc chỉ hoa văn).
- Phối hợp review/scene-seasons (j94): j12 lightTick nay chỉ phủ 1/4 (tối ~12%) khi cảnh đã có bản vẽ theo buổi (-sang/-trua/-chieu/-toi), phủ đầy khi rơi về ảnh gốc; hiểu thang 4 buổi. Thử gộp tạm hai nhánh (không đẩy): ảnh 50–51 `*-cung-scene-seasons.webp`. Khi gộp main: assemble.py thứ tự `j86, j93, j94, j84`.
- `dev/MOTION.md`: danh sách đã làm + đề xuất thêm (A/B/C) để bàn với sếp.
- Ảnh thử: `dev/shots/motion/` (755x1000@2 và 1180x820@2, mỗi khoảnh khắc một tệp, chụp giữa hiệu ứng bằng cách dừng hoạt ảnh): 01–02 lật thẻ, 03 lật lịch, 04 ống xăm, 05–06 kết quả Thành/Bại, 07–08 thánh chỉ, 09 giáng phẩm, 10 lãnh cung, 11 qua buổi, 12 có thai, 13 sinh con, 14 mực loang, 15–17 rương bảo vật, 18–19b rương ngự tứ, 20–21 mâm thưởng, 22–23 hộp gấm, 24 chip thời tiết, 25 bảng mở, 26 cảnh báo, 27 save cũ, 30–37 hạt thời tiết, 41–42 giảm chuyển động.
- Máy thử quá tải (load ~70) nên vài ảnh "giữa" chụp trễ một nhịp (16 và 19 còn đóng nắp; 17 và 19b là lúc đã mở).

## Kiểm thử
- Playwright 755x1000@2, 1180x820@2: không lỗi trang; save cũ (bản main) mở được.
- Chuyển động giảm (prefers-reduced-motion) và "Cảnh động" tắt: hiện khung cuối ngay.

## Còn lại / ghi chú
- Cung nữ thăng bậc cung nữ chưa có thánh chỉ (đề xuất trong MOTION.md).
- Lật thẻ hiện mỗi tuần có người được lật; nếu sếp thấy nhiều thì chỉ hiện khi là thẻ của nàng.
