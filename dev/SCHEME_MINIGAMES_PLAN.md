# Trò mưu (review/scheme-games) — kế hoạch ngắn

Mã: `dev/build/jsgame.js` (nạp sau jk4, trước j84). Kiểm: `dev/test/schemegames.js`. Ảnh: `dev/shots/scheme-games/`.

## Luật chung
- Chỉ người chơi: chạm thẻ việc (Hậu cung → Phi tần → nhóm Hại nhỏ / Hại nặng / Sát hại) mở hộp chọn kit 3 lựa chọn:
  **Tự ra tay: <trò>** · **Giao cho người làm** (cơ may như cũ, không chơi) · **Thôi**. Mỗi lựa chọn đủ dòng Cần/Tốn/Được/Mất/Kèm + bậc cơ may;
  lựa chọn chơi có Ghi chú "khéo thì lên <bậc>, vụng thì xuống <bậc>".
- NPC không chơi: runAct không đổi. Bot/hàm gọi thẳng `doAct()` không thấy trò (chỉ cú chạm thẻ việc mới mở hộp chọn).
- Kết quả trò = một hệ số TẠM (`SG.mod`) chỉ sống trong lần `doAct` của chính người chơi: `odA` (+/- cơ may, chỉ a===S), `oSee` trong `caught` (phát giác),
  giá bạc (Mặc cả). Sau đó việc chạy qua doAct như thường → thẻ kết quả gạch đầu dòng (j19). Phần chơi 5/10 = như giao cho người làm.
- Khung kit `kg82Open` / `kitGameFrame` với ấn **MƯU** (`seal:"muu"`), HUD Phần/Hồi/Còn, `kitGameResult` + `kitOdds` (trước → sau), nút «Ra tay».
- Tranh: dùng lại tranh có sẵn (không vẽ mới): act-binh-phong, ev-tin-don, ev-hoi-lo, tam-cung-dem; mảnh tho-slip, doi-slip, bac.
- Giảm chuyển động (prefers-reduced-motion / tắt hiệu ứng): câu nói đứng yên từng ô thay vì trôi, lời truyền không chạy chấm, kim không lướt.

## Bốn trò
| Việc (khóa) | Trò | Thao tác (20–30 giây) | Hệ số |
|---|---|---|---|
| Dò la (`spy`) | Nghe ngóng | chạm «Nép» giữ bóng trong dải xanh (xa quá: không nghe rõ; gần quá: lộ); chạm câu có từ cần nghe (3 từ), 16 câu trôi qua | cơ may chứng cứ ±15 |
| Tung tin đồn (`rumor`) | Truyền lời | 3 hồi × 12 giây: chạm chuỗi người từ «Ngươi» tới «Cung nàng»; mỗi chặng có độ tin 1–3 chấm; Dấu vết = Σ(4 − tin) | cơ may ±12, phát giác ∓12 |
| Mua chuộc cung nữ (`bribe`) | Mặc cả | 3 hồi × 9 giây: chỉnh bạc ±5, «Trao»; Lòng nàng: Phật ý / Lắc đầu / Ngập ngừng / Nhận lời; giá theo lòng trung + tính tham | nhận ở hồi 1/2/3: +15/+10/+5, trả đúng số bạc đã trao; không thành: không mất bạc, nàng báo chủ (1 chứng cứ) |
| Hại nặng / Sát hại có cơ may (frame, block, ksab, lygian, poison, kpoison, pond, pushp, musk, catswap, kframe, slowpoison) | Thời cơ (trừu tượng, chủ 11/15) | 3 hồi × 8 giây: chạm «Ra tay» lúc «Người canh chú ý» thấp; chờ lâu / ra tay lúc bị để ý thì «Nghi ngờ» tăng | cơ may ±12, phát giác ∓12 |

Chữ trên màn hình chỉ là tên việc sẵn có của thẻ; không thêm mô tả cách làm.

## Chưa làm (có thể sau)
- Nghe lén tại chỗ (j78 overhear, j9 placeHarms dùng `od()`), mua chuộc kẻ hầu (`bribeServ` j29): cùng cơ chế, gắn được bằng một mục trong `SG.K`.
