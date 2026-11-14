# PROGRESS — review/wardrobe (vật phẩm, trang phục, mạng che, hủy dung)

Nhánh: `review/wardrobe` (từ origin/review/balance). Module: `dev/build/j92.js` (chỉ logic + dữ liệu, KHÔNG CSS/HTML kiểu riêng), đặt trước j84 trong assemble.py.
Thiết kế: `dev/WARDROBE.md`. Kiểm kê: `dev/ITEMS.md`.

## Đã xong
- Mạng che mặt 8 bậc `img/veil-t1..t8.png` + `img/veil-gauze.png` (cung nữ, ma ma, lãnh cung), vẽ gpt-2-6, tách nền. `img/veil-fit.json` vị trí đặt cho 1574 ảnh por-/fig- nữ (đo mặt). `window.KIT_VEIL`.
- Dấu cào hủy dung trên mặt `img/scar-1..3.png` + `img/scar-fit.json`. `window.KIT_SCAR`.
- Logic trang phục j92 (xem WARDROBE.md): 2 ô đang mặc cho mọi người, phẩm ẩn, Tự chọn đồ, trò Chải chuốt, hặc ăn mặc sai phẩm (hai chiều), giá họa trộm đồ (hai chiều), ngự tứ, bán lén / cầm cố, phần thưởng rút từ kho thật.

## NHU CẦU THÀNH PHẦN KIT (cho chủ kit, review/kit-2b)

### K1. "Ô vật phẩm cạnh chân dung" (wardrobe slots) — `kitWearSlots(p, opts)`
- Hai ô vuông nhỏ: **TRÂM CÀI** (trang sức tóc) và **Y PHỤC**. Nằm cạnh khung chân dung 3:4 (`pframe`/`pcPort` lg): một ô bên trái, một ô bên phải khung, ngang tầm dưới vai. Trên cảnh phòng (stage) thì hai ô ở hai bên khung cảnh (trái/phải). Chân dung và tranh KHÔNG đổi.
- Mỗi ô: biểu tượng vật phẩm (ảnh vuông `img/wd-<key>.webp`, nền trong suốt), viền màu theo **phẩm cấp** (Thường / Tinh phẩm / Trân phẩm / Tuyệt phẩm / Ngự tứ: 5 màu kit, Ngự tứ màu vàng hoàng gia có dấu ấn nhỏ), tên món ở dưới (1 dòng, không cắt chữ: thu nhỏ chữ hoặc xuống 2 dòng).
- Một nhãn nhỏ dưới ô, CHỈ hiện khi người chơi đã biết: "Đúng phẩm" (xanh) / "Vượt phẩm" (đỏ) / "Quá giản dị" (xám vàng) / "Phạm tang" (đỏ đậm). Chưa biết: không hiện gì (thông tin ẩn).
- Ô trống: khung trơn, chữ "Chưa cài" / "Thường phục".
- Chạm ô: với người chơi → mở **Rương đồ** (K2) lọc đúng loại; với người khác → thẻ vật phẩm (tên, phẩm cấp, nguồn gốc nếu biết) + nút "Hặc ăn mặc sai phẩm" (act `vp`).
- Dữ liệu: `wdSlots(p)` (j92) trả `[{slot:"tram"|"y", k, name, grade, gradeName, icon, nt, giver, label|null, empty}]` (label đã lọc theo điều người chơi biết).
- Phải hiện ở: thẻ người (pcard) khi gặp bất kỳ ai (phi tần, cung nữ, ma ma, Thái hậu…), thẻ thân phận người chơi, khung cảnh phòng / yết kiến, bảng hặc tâu.
- Máy: Fold dọc 755x1000@2, iPad ngang 1180x820@2: ô ~44–56 px CSS, không che mặt, không tràn.

### K2. "Rương đồ" (wardrobe chest picker) — `kitWardrobe(spec)`
- Bảng (kitPanel) có 2 thẻ phụ (tabs kit): Trâm cài · Y phục. Lưới ô vật phẩm (cùng ô của K1, cỡ lớn hơn), mỗi ô: biểu tượng, tên, phẩm cấp, tác dụng thật (Sắc +n…), nguồn ("Hoàng thượng ban, tháng ba năm thứ nhất"), nhãn phẩm nếu đã biết.
- Món đang mặc có dấu "Đang mặc". Chạm một ô → nút kit "Mặc" (giá: 1 khắc) / "Tháo".
- Hàng nút dưới cùng (act-card/option kit, có giá + được/mất + chữ độ chắc):
  - **Tự chọn đồ** — tốn: 0 khắc · được: nhanh, khỏi nghĩ · kèm: có thể trúng bộ không đúng phẩm (độ chắc theo số món đã biết phẩm).
  - **Chải chuốt** (trò nhỏ ~10 giây, khung trò kit `kitGameFrame`) — tốn: 1 khắc · được: Đúng phẩm nếu kim dừng giữa · vùng giữa rộng theo Tài, khéo tay, ma ma tinh ý · có nút "Bỏ qua" (= Tự chọn đồ).
  - **Bán lén** / **Cầm cố** / **Chuộc lại** cho món chọn (không có ở đồ Ngự tứ: nút tắt, lý do "đồ ngự tứ, bán là bất kính").
- Dữ liệu: `wdChest(slot)` trả danh sách; hành động: `wdWear(ix)`, `wdTakeOff(slot)`, `wdAuto()`, `wdGroom()`, `wdSell(ix)`, `wdPawn(ix)`, `wdRedeem(i)` (j92, đều kiểm tra khắc/bạc, ghi sổ, ra thẻ kết quả).

### K3. Lớp phủ chân dung
- `KIT_VEIL`: `<img src=KIT_VEIL.src(KIT_VEIL.tierOf(p))>` đặt tuyệt đối trong ô chân dung / hình toàn thân, style = `KIT_VEIL.style(file, tier)`, khi `KIT_VEIL.on(p)`.
- `KIT_SCAR`: `<img src=KIT_SCAR.src(sev)>` style = `KIT_SCAR.style(file)`, khi `KIT_SCAR.on(p)`. Thứ tự lớp: chân dung < dấu cào < mạng < khung.

### K4. Biểu tượng vật phẩm
- `img/wd-*.webp` vuông, nền trong suốt, cùng phong cách tranh thẻ. Mã: `WD_ITEMS[k].icon`.

## Nối tạm (trong lúc chờ K1/K2)
- Thẻ người (`pcard`): thêm 2 chip kit "Trâm: …", "Y phục: …" (+ nhãn nếu biết).
- Tư trang (`invHTML`): khối "Đang mặc" bằng thẻ `pcard` + nút option kit: Trâm cài, Y phục (mở hộp chọn kiểu `pushDil` option), Tự chọn đồ, Chải chuốt (khung trò kit của j82).
- Hặc tâu: act `vp` trong nhóm Hại nặng (thẻ hành sự kit sẵn có).

## Còn lại / ghi chú
- Ảnh vật phẩm: xem WARDROBE.md §Ảnh.
