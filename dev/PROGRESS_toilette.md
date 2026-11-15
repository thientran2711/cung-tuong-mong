# PROGRESS · review/toilette (Điểm trang buổi sáng) — sếp 15/11 09:30Z + điều phối (dung nhan trên mặt cả ngày)

Nhánh từ origin/main 14967f899 + gộp review/act-audit 8654bc57c (leAttire / BAL.thieuLe, jaudit §16–17). Module mới: `dev/build/jtoil.js`
(sau jaudit, trước j84). Số trong `BAL.toil`. KIT §13.3 (chờ duyệt kit), KIT 13.1 thêm 3 mảnh rời `mg-chai-brow|puff|rouge` (gpt-2-6, CDN).

## Đã làm
- Buổi sáng: thẻ "Điểm trang" đầu Hành sự (1 khắc, chắc) + chip trên thanh đầu (`[data-k3="toil"]`, chạm = bắt đầu / xem). Không bắt buộc, không chặn.
  Bỏ qua = mặc như hôm qua, mặt mộc.
- Hồi 1 CHỌN Y PHỤC: chân dung nàng trong bộ đang mặc (tranh theo bậc áo), dịp hôm nay (thỉnh an Thái hậu/Hoàng hậu, lễ tết, thị tẩm),
  kitEquipSlots + kitInvGrid (cùng đồ Tư trang). Phán: hợp dịp / hợp phẩm / quá giản dị / quá phô trương / vượt phẩm / phạm tang (j92 phẩm + jinv xa xỉ).
- Hồi 2–4 TRANG ĐIỂM trên mặt nàng trong gương đồng (`mg-chai-bg`): kẻ mày theo đường (độ phủ × độ lệch), đánh phấn đều (mỗi điểm trong khoảng lý tưởng;
  dày quá = diêm dúa), chấm son khi vòng khép vừa môi (nhịp × vị trí). Tay nghề Họa/Sắc/ma ma tinh ý nới dung sai + cộng phần (≤ 20). Đồng hồ mỗi hồi chạy từ lần chạm đầu.
- Ảnh hưởng (leAttire mở rộng, `toilFx`): theo nết chủ nhà (trọng lễ / chuộng giản dị / hay ghen / thường; Hoàng thượng theo `LIKES.dress` mới — biết qua "Nói thật lòng").
  Thẻ thỉnh an / gặp Hoàng thượng ghi trước (Được/Mất + Vì sao); một lần mỗi người mỗi ngày. Phi tần gặp mặt: ghen khi phô trương / dung nhan tuyệt mỹ,
  khen giản dị, cười diêm dúa. Thỉnh an Hoàng hậu: cả hậu cung thấy. NPC cùng luật (`toilNpc`, dữ liệu theo nết + Sắc) khi hầu Thái hậu.
- Dung nhan TRÊN MẶT cả ngày (điều phối 15/11): lớp SVG trong khe hiệu ứng mặt của kit (`kitFxLayers`: khung lớn, ảnh nhỏ, dáng đứng trên sân khấu),
  điểm mốc `img/toil-fit.json` (bản sao `dev/art/toil-fit.json`), dựng bằng `python3 -I dev/figwork/toilfit.py` (+ `--extend` cho bậc t5–t8, lãnh cung).
  3 dáng: tranh gốc / đẹp (má hồng, son nhạt, da sáng) / diêm dúa (phấn trắng trán–sống mũi–cằm, má đỏ loang theo gò má, môi tô quá viền).
- Bot (`window.__bot`): tự điểm trang trung bình (giữ đồ, dung nhan theo tay nghề ± may). `dev/test/bot-same.js` sửa để chạy được trên main mới
  (đợi S, bỏ trò nhỏ dở, jload không chạy).

## Kiểm
- `node dev/test/toilette.js <url> <WxH@dpr> <dir> [oldsave.json]` (chơi thật bằng chuột, `TOIL.clock` giãn đồng hồ cho máy chậm),
  `node dev/test/toil-looks.js <url> <out.jpg> [c05] [t1,t5,t8]` (tờ mẫu 3 dung nhan), `node dev/test/mk-oldsave2.js` (sổ cũ).
- Ảnh: `dev/shots/toilette/`.

## Còn lại / ghi chú
- Mặt quay nghiêng mạnh: má xa có thể chờm mép mặt (điểm má đối xứng quanh miệng).
- `toilfit.py --extend --all`: thêm áo cung nữ, kc/ngheo, mặt cung nữ m* (chưa chạy; nàng khi là phi tần không dùng).
- Báo thợ act-audit: leAttire của jaudit so `p.toilette.day === S.turn*10+S.buoi` (theo buổi, mà S.turn là tháng); jtoil dùng `p.toilette.wk === wk()`
  (một ngày = một tuần-ngày) và gọi jaudit với toilette ẩn đi, rồi cộng phần dung nhan (r.toil). `p.toilette.style` = plain|fit|showy, `.look` = dep|diem|null.
