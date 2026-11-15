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

## TRẠNG THÁI KHI DỪNG (điều phối đóng phiên)
Nhánh: review/toilette (gốc origin/main 14967f899 + review/act-audit 8654bc57c gộp vào). Commit chính: ef831c28b (module), a820a52ab (dung nhan sếp DUYỆT —
giữ nguyên "đẹp" và "diêm dúa" như hiện tại), 509a2dad5 (phản ứng bật sự kiện + toil-fit t1–t8/lãnh cung), commit WIP cuối (toilfit md5 + PROGRESS).

### Đã xong
- Điểm trang buổi sáng (thẻ + chip), trò chọn y phục, trò trang điểm, phán dịp, ảnh hưởng theo nết (leAttire), NPC cùng luật, bot tự điểm trang.
- Dung nhan trên mặt nàng cả ngày (kitFxLayers) — dáng sếp duyệt ở a820a52ab; tờ mẫu dev/shots/toilette/looks-c05-t1-t5-t8.jpg.
- Phản ứng bật thành sự kiện có người (10 khóa TOIL_EV, `art: img/ev-toil-<key>.webp` — tranh ab06 vẽ xong ở worktree agent-ab06ce27b6963775a,
  CHƯA lên CDN: điều phối/thợ sau đẩy bằng `python3 dev/site/cdn_sync.py img/ev-toil-*.webp` từ worktree đó).
- Kiểm toilette.js (chơi thật + sổ cũ): 755x1000@2 (cả bản có phản ứng: th-scold bật, sổ cũ nạp, 0 lỗi, không tràn), 1000x755@2, 844x390@3 đạt
  (0 lỗi, không tràn, sổ cũ nạp). 1180x820@2 lần cuối bị ngắt giữa chừng (máy quá tải, lần trước đó đạt trước khi có sổ cũ).

### PHIÊN 6 (15/11 ~10:00–12:00Z, thợ toilette mới)
- Gộp origin/main 70c792d41 (act-audit đã duyệt + shop-fix) — 87bd738f3. Lấy bản main cho file act-audit, áp lại phần riêng của toilette (jtoil trong assemble.py, j84, KIT, bot-same).
- leAttire (jaudit §17): khóa ngày `p.toilette.wk===wk()` thay `S.turn*10+S.buoi` (S.turn là tháng → không bao giờ khớp) — bb2e3f3e1. Lỗi này CÓ trên main (jaudit.js:211) → báo điều phối.
- toil-fit đo lại trên tranh CDN hiện tại: 4262 tranh (trước 3518; thêm áo cung nữ tm0–tm4 + kc/ngheo bằng `--extend --more`), md5 ghi `dev/art/toil-fit-md5.json`
  (`--stale` giờ dùng được). 18 tranh đã đổi (c01 a18 mọi áo, c16 tcold/t8) được sửa điểm; còn lại trùng bản cũ. ĐÃ ĐẨY img/toil-fit.json lên CDN (4262). Tờ mẫu mới: looks-c05-t1-t5-t8 (giữ dáng đã duyệt).
- Kit (LUẬT SỬA CẢ NHÓM): lời nói “…” hai câu bị cắt thành 2 dòng ở CẢ HAI bộ tách câu — kitBullets (jk3, thẻ kết quả) và kpSentences (j79, hàng sự việc trong hộp sự kiện).
  Sửa cả hai, KIT 31.14 ghi luật. Rà `node dev/test/kbl-quote-scan.js 87bd738f3`: 116 lời nói nhiều câu trong game — bullets 115→0, hàng sự việc 115→0.
- Phản ứng = KHUNG SỰ KIỆN: Q item có `who` + `art` (ev-toil-<key>.webp, đã có trên CDN) → kitEventStage. Trên main hiện tại ra 32.6 (người đứng trên tranh);
  thử gộp review/kit-fig2 (WIP 3e212597e, không commit, .tmp/kf2) → tự thành kitEventDp (người bên trái, băng tranh phải, lựa chọn 2 cột) — KHÔNG cần sửa gì thêm khi kit-fig2 vào main.
  Tối đa 2 khung mỗi dịp, còn lại gộp một dòng "Còn: …" (BAL.toil.popMax).
- Test toilette.js: gặp Thái hậu trước khi chạy runOpt (trong game thật act(i) có hook j61 cho gặp; runOpt bỏ qua → bóng xám chỉ là lỗi bài thử).

### CÒN LẠI (chính xác)
- Kiểm phiên 6 (toilette.js + sổ cũ từ bản không jtoil): 755x1000@2, 1180x820@2, 1000x755@2, 1366x1024@2, 844x390@3 — 0 lỗi, không tràn, sổ cũ nạp,
  phản ứng th-scold bật thành khung. 390x844@3: 0 lỗi (game không có màn "xoay ngang" — chơi dọc bình thường, như main).
- Bot: `node dev/test/bot-same.js <base không jtoil> <toilette> 20 sens` — 0 lỗi cả hai bản, chưa hết đời nào trong 20 bước (máy tải 40–70);
  hai dòng ngẫu nhiên tách nhau như dự kiến (jtoil dùng Math.random). CÒN: chạy 80+ bước khi máy rảnh để có số đời so sánh.
- Khi kit-fig2 vào main: không phải làm gì; phản ứng tự thành kitEventDp (đã thử, ảnh toil-755x1000-8-react-kitEventDp-trial.jpg).

### CÒN LẠI CŨ (đã làm 1,2,5,6 ở phiên 6)
1. toil-fit từ tranh CDN HIỆN TẠI (điều phối: tờ mẫu từng dùng tranh c05 hoa điền to cũ). Đã thêm ghi md5 (`dev/art/toil-fit-md5.json`,
   `--stale` liệt kê tranh lệch md5). Việc: chạy lại đủ `python3 -I dev/figwork/toilfit.py` (đo lại por+fig t1–t4, ~70 phút máy bận) rồi
   `python3 -I dev/figwork/toilfit.py --extend` (t5–t8, lãnh cung, ~60 phút; ghi md5), soát `python3 /…/lmview`-kiểu (xem vài tranh), rồi
   `cp img/toil-fit.json dev/art/toil-fit.json` + `python3 dev/site/cdn_sync.py img/toil-fit.json`. Lần chạy lại đã bị ngắt: img/toil-fit.json
   trên CDN vẫn là bản cũ (3518 tranh, đo trên tranh CDN lúc đó).
2. Làm lại tờ mẫu bằng tranh CDN mới: `node dev/test/toil-looks.js <url> dev/shots/toilette/looks-c05-t1-t5-t8.jpg c05 t1,t5,t8` (giữ preset đã duyệt).
3. Kiểm lại 1180x820@2 với sổ cũ: `node dev/test/toilette.js <url> 1180x820@2 <dir> <oldsave.json>` (sổ cũ: `node dev/test/mk-oldsave2.js <url bản không jtoil> <out.json>`).
4. Bot cân bằng: `node dev/test/bot-same.js <urlA không jtoil> <urlB có jtoil> 80 sens` — harness đã sửa để chạy trên main mới (đợi S, bỏ trò nhỏ dở,
   jload tắt); lần chạy 80 bước bị ngắt (máy tải ~70) — CHƯA có số. Bản base = assemble.py bỏ 'jtoil.js'.
5. Nối kitEventDp (kit-fig2) khi có; banner đã có khóa.
6. Báo thợ act-audit (đã ghi dưới): jaudit leAttire so day theo buổi; jtoil dùng wk().

### Lỗi biết
- Mặt quay nghiêng mạnh: má xa có thể chờm mép mặt.
- Lời thoại phản ứng có 2 câu bị kitBullets tách thành 2 dòng (vd "…ai gia sao? / Thật chẳng ra thể thống.").
- Máy kiểm chậm: trò trang điểm trong kiểm tự động dùng `TOIL.clock=12` (giãn đồng hồ); người chơi thật dùng 1.

## Còn lại / ghi chú
- Mặt quay nghiêng mạnh: má xa có thể chờm mép mặt (điểm má đối xứng quanh miệng).
- `toilfit.py --extend --all`: thêm áo cung nữ, kc/ngheo, mặt cung nữ m* (chưa chạy; nàng khi là phi tần không dùng).
- Báo thợ act-audit: leAttire của jaudit so `p.toilette.day === S.turn*10+S.buoi` (theo buổi, mà S.turn là tháng); jtoil dùng `p.toilette.wk === wk()`
  (một ngày = một tuần-ngày) và gọi jaudit với toilette ẩn đi, rồi cộng phần dung nhan (r.toil). `p.toilette.style` = plain|fit|showy, `.look` = dep|diem|null.
