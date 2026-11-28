# flight2-s2l bugs (fold 755x1000 · greedy · seed 2026112578 · LIVE main 7d7c6886 · b=62f03c577a1c)
PRIORITY #1 CHECK: OD robot lives (F slice) | main robot-rt.js e15c9faf | review/flight2-s21 recipe | claims flight2-s2l.
Ending: Hồng nhan bạc mệnh — «Trúng độc mãn tính nguy kịch, không qua khỏi», age 21, year 4, buổi 541, rank 1. VALID. taps 5364, dead buttons 0, stuck 0.

| # | what | where |
|---|---|---|
| 1 | two-tap plaque «Trò chuyện với cung nữ · Tốn 1 khắc»: «Chọn» tapped for real, the lift stays (does nothing) | game |
| 2 | two-tap plaque «Xóa dấu vết · Có cơ · Tốn 2 khắc · 10 bạc»: same | game |

## Watch list
- Ban hoa at Điện tuyển: NOT hit. Day 2 «Điện tuyển»: Quỳ xuống thỉnh an → Thái hậu (4 answers) → Hoàng thượng (Cúi đầu chờ xét | Pha một chén trà dâng lên) → Ban hương nang → Chờ chiếu → rank 1→2 (Vĩnh Thọ cung · Hoài Cẩn trai). Day-2 morning options: Theo ma ma ra sân chờ / Ngồi trước gương điểm trang / Dò hỏi ma ma (bot took the mirror, HUD «Y phục hợp dịp · Kiều diễm»).
- NO-TURN «Sang ngày mới» with queued dialog: 0 in the run log.
- «Chờ tin» softlock: 0.
- Illness dialog / cure road (Tĩnh dưỡng / Truyền thái y): none seen as a player illness road; death was by chronic poisoning, no cure road offered before it.
- Demotion chain: year 1 turn 7 «Cấm túc» → «Cấm túc 2 tháng» → year 1 turn 8 «Bị giáng phẩm» (rank 2→1); rank stayed 1 to the end.
- Promotion roads: 24 seen / 6 picked, all by decree (robot-audit).
- Late/dead: last taps «Ta biết rồi» ×2 on .kmov before the death card; 404s on lanh-cung-dong-sang.webp (×200 console, CDN path with a leading «/https://ctm-img…» — image URL built relative).
- Console 404s all life: /img/kit/ico-download.webp, /%23n, /https://ctm-img.victoria-tntt.workers.dev/img/*.webp (relative-URL bug).
