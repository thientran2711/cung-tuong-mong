# Kiểm duyệt: review/act-audit (c7faad1de) — PASS có sửa của người duyệt

Ngày 2026-11-15, người duyệt kit số 2. Nhánh tiến thẳng (fast-forward) từ origin/main **218a591fd**, không xung đột. Site dựng lại bằng
`dev/site/build_site.sh`. Ảnh: `dev/shots/review/act-audit/`.

## Sửa của người duyệt (jaudit.js, §23 "hành động có trò chơi nhỏ")
**Lỗi:** thẻ kết quả hiện quá sớm khi kết mạng bằng tay (veil craft, `vlcraft` → "Tự tay kết mạng"), đúng lỗi chủ game báo. Chạm lựa chọn thì trò chơi
mở ra, nhưng thẻ kết quả "THÀNH … Bạc −12 …" đã hiện **trước khi chơi**. Nguyên do: hành động gọi `resultShow` trong cùng lượt với lúc mở trò chơi,
còn `aaDefer` chỉ hoàn tiền rồi giữ chi phí lại, không giữ thẻ.

**Sửa:** trong lúc `aaDefer` chạy, mọi lần gọi `resultShow` đều bị giữ lại (`__aaIn`/`__aaRS`).
- Nếu hành động đã mở trò chơi, thẻ bị giữ đó bị bỏ đi. Thẻ kết quả duy nhất là thẻ của `aaPayMG`, hiện sau khi chơi xong.
- Nếu không có trò chơi nào mở, thẻ được phát lại ngay, nên lựa chọn thường vẫn hiện kết quả như cũ.
- Lồng nhau thì vẫn đúng: mỗi lớp cất lại thẻ của lớp ngoài.

## Kiểm tra
- **dev/test/minigame-tap.js** (thử của thợ, bản chép chờ được start() bất đồng bộ): PASS. Bài học và lá bài: lúc chạm chưa tốn gì, chưa có kết quả.
  Sau trò chơi có đúng một kết quả. Chạm hai lần liền: chỉ một lần trừ, một trò chơi.
- **Kết mạng bằng tay** (thợ chưa thử), cả hai lựa chọn nguyên liệu, mỗi lựa chọn chạm hai lần:
  - Lúc chạm: không trừ Bạc, không có thẻ kết quả, phần giới thiệu trò chơi mở.
  - Sau khi chơi: trừ một lần, có một thẻ kết quả.
  - Đóng trò chơi khi chưa chơi: không tốn gì.
  - Trước khi sửa, thẻ "THÀNH" hiện ngay lúc chạm.
- **Lựa chọn thường** (mua mạng `vlnvp`, không có trò chơi): thẻ kết quả vẫn hiện ngay. `aaDefer` không nuốt mất nó.
- **odA trên 6 hành động** (Ly gián, Hạ độc dần, Tố tội thật, Bóc tư tình, Xin Hoàng hậu giáng, Trình Hoàng hậu): chữ trên thẻ đúng với tỉ lệ được tung.
  Ví dụ "Trình Hoàng hậu" ở Sức 20 trừ −15, đúng như thẻ ghi.
- **Tỉ lệ cung nữ dò la:** BAL.spySent = 0, spyBase = 58. Thẻ ghi đúng tỉ lệ ấy.
- **Kit**, 7 tab (act, court, rv, rel, inv, art, story) × 4 khổ (755x1000@2, 1000x755@2, 1180x820@2, 844x390@3):
  - 0 lỗi trang, 0 tràn ngang, 0 chữ bị cắt, 0 khung tím, đúng 1 `#panel`.
  - 0 chữ "ngươi" dành cho người chơi.
- **Sổ cũ** (lưu ở index.html của main 218a591fd, nạp vào bản này) ở cả 4 khổ: nạp được đúng tên, qua buổi bình thường, 0 lỗi.
- **coop-e2e: 59/59 PASS** (Worker thật, phòng NG68). Ảnh CDN được thay bằng ảnh rỗng (`.rv/coopfast.js`), vì qua proxy của máy duyệt mỗi ảnh mất khoảng 18 s
  nên trang không kịp "load" trong 30 s. Đây là lỗi môi trường, không phải lỗi của nhánh.
