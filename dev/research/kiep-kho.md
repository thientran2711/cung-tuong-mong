# 1kiep.com — mức KHÓ: không thực hiện được

**Trạng thái:** KHÔNG chơi, KHÔNG thu thập số liệu. Ngày thử: 2026-11-14.

## Vì sao dừng

- Playwright (chromium headless, 755x1000 @2x) mở `https://1kiep.com/` (và `http://`, vốn 301 sang https) đều nhận trang:
  `Forbidden: automated access is not allowed on this site. See /robots.txt`
  Lỗi đến từ chính site (Cloudflare), không phải proxy của môi trường.
- `robots.txt` của site chặn rõ các agent AI, kể cả agent chạy theo yêu cầu người dùng (`Claude-User`, `ChatGPT-User`, ...: `Disallow: /`), và ghi rằng nội dung game không được dùng để huấn luyện, làm dữ liệu hay trả lời cho hệ thống AI. Header `x-robots-tag: noai, noimageai`.
- Vượt chặn (giả User-Agent, chạy có giao diện, đọc ngược bundle JS) sẽ đi ngược ý muốn đã nói rõ của chủ site, nên bot không làm.

## Hệ quả

- Không có bảng theo lượt, không có số liệu mức Khó, không có ảnh gameplay.
- Ảnh duy nhất: `/tmp/claude-0/-home-user-cung-tuong-mong/a5fd33d3-7f41-5bff-b6da-0b51bb3f7f98/scratchpad/kiep-kho/00-home.png` (trang Forbidden).
- Các bot DỄ/VỪA nhiều khả năng gặp cùng lỗi, nên `1KIEP_COMPARE.md` cần kiểm lại.

## Cách khác nếu vẫn cần

- Một người tự chơi tay mức Khó rồi ghi số liệu theo mẫu (lượt, chỉ số, sự kiện, chết/mốc), hoặc
- Xin phép chủ site cho truy cập tự động.
