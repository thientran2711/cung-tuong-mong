# Trò mưu (review/scheme-games) — kế hoạch ngắn

Mã: `dev/build/jsgame.js` (nạp sau jk4, trước j84). Kiểm: `dev/test/schemegames.js`, `dev/test/schemesave.js`. Ảnh: `dev/shots/scheme-games/`. Tiến độ: `dev/scheme-games/PROGRESS.md`.

## Luật chung (sếp 15/11: 08:55Z, 09:30Z, 10:05Z)
- Chỉ người chơi: chạm thẻ việc mở hộp chọn kit 3 lựa chọn: **Tự ra tay: <trò>** · **Giao cho người làm** (cơ may thường, không chơi) · **Thôi**.
  Mỗi lựa chọn đủ Tốn/Được/Mất(/Kèm) + chữ cơ may; lựa chọn chơi có Ghi chú "khéo thì lên <bậc>, vụng thì xuống <bậc>". Trang đầu trò cũng có nút «Giao cho người làm».
- NPC không chơi: runAct không đổi (cùng giá, cùng cơ may). Bot/hàm gọi thẳng `doAct()` không thấy trò.
- Kết quả trò CHỈ dịch cơ may của người chơi MỘT BẬC trên thang Liều / Khó / Năm ăn năm thua / Khá chắc / Chắc / Rất chắc / Nắm chắc
  (Phần 7–10 lên một bậc, 4–6 giữ nguyên, 0–3 xuống một bậc). Không đổi giá bạc, không đổi phát giác. Không hiện %.
  Bậc mới chỉ sống trong lần `doAct` của chính người chơi (`SG.mod.step`, `odA` khi a===S), rồi việc chạy như thường → thẻ kết quả.
- Khung kit `kg82Open` / `kitGameFrame` với ấn **MƯU**, HUD Phần / Hồi / Còn, `kitGameResult` + `kitOdds` (trước → sau), nút «Ra tay».
- Tranh: chỉ dùng tranh có sẵn (act-binh-phong, ev-tin-don, ev-hoi-lo, tam-cung-dem; mảnh tho-slip, doi-slip). Không vẽ mới.
- Giảm chuyển động (prefers-reduced-motion hoặc Thiết lập · Cảnh động tắt, `kmReduced`): câu nói đứng yên thay vì trôi, lời truyền không chạy chấm, kim không lướt.

## Bốn trò
| Việc (khóa) | Trò | Thao tác | Thắng / thua |
|---|---|---|---|
| Dò la (`spy`) | Nghe ngóng | 30 giây: chạm «Nép» giữ bóng trong dải xanh; chạm câu thật có từ cần nghe (3 từ), bỏ câu có từ khác (lời đồn) và chuyện vặt | nghe được câu thật → lên bậc |
| Tung tin đồn (`rumor`) | Truyền lời | 3 hồi × 12 giây: chạm chuỗi người từ «Ngươi» tới «Cung nàng»; chặng 1–3 chấm tin cậy; Dấu vết = tổng (4 − tin) | lời tới nơi qua người tin cậy → lên bậc |
| Mua chuộc cung nữ (`bribe`) | Mặc cả | 3 hồi × 10 giây: thanh giá (Ít → Rất hậu, không số), «Ngỏ giá»; ngưỡng ẩn = lòng trung với chủ + tính nết (tham bạc / khôn lỏi / thật thà / nhát gan, hiện ở trang đầu) | nhận lời ở hồi 1–2 → lên; hồi 3 hay ngỏ quá hậu (sinh nghi) → giữ; không nhận → xuống. Bạc tốn = thẻ việc |
| 12 việc Hại nặng / Sát hại có cơ may | Thời cơ | 3 hồi × 8 giây: chạm «Ra tay» lúc «Người canh chú ý» thấp; chờ lâu / ra tay lúc bị để ý thì «Nghi ngờ» tăng | đúng lúc → lên bậc |

Thời cơ hoàn toàn trừu tượng: màn chơi chỉ ghi tên người và "Thời cơ", không nêu tên việc, không cách làm, không đồ vật. Hộp chọn giữ thẻ việc gốc (Tốn/Được/Mất) như mọi thẻ việc.

## Chưa làm (có thể sau)
- Nghe lén tại chỗ (j78 overhear, j9 placeHarms dùng `od()`), mua chuộc kẻ hầu (`bribeServ` j29): cùng cơ chế, gắn được bằng một mục trong `SG.K`.
