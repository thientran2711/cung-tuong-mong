# PROGRESS — review/wardrobe (vật phẩm, trang phục, mạng che, hủy dung)

Nhánh: `review/wardrobe` (từ origin/review/balance). Module: `dev/build/j92.js` (chỉ logic + dữ liệu, KHÔNG CSS/HTML kiểu riêng), đặt trước j84 trong assemble.py.
Thiết kế + núm: mục "Luật trang phục" dưới đây (thay cho dev/WARDROBE.md, không có file riêng). Kiểm kê: `dev/ITEMS.md`.

## Đã xong
- Mạng che mặt 8 bậc `img/veil-t1..t8.png` + `img/veil-gauze.png` (cung nữ, ma ma, lãnh cung), vẽ gpt-2-6, tách nền. `img/veil-fit.json` vị trí đặt cho 1574 ảnh por-/fig- nữ (đo mặt). `window.KIT_VEIL`.
- Dấu cào hủy dung trên mặt `img/scar-1..3.png` + `img/scar-fit.json`. `window.KIT_SCAR`.
- Mạng che chuỗi hạt t1–t8 (t1/t2 đã đổi chỗ), mạng lụa ngà (cung nữ m0–m1, lãnh cung) / hồng (cung nữ m2–m4, ma ma), dấu cào 1/2/3 vạch: sếp đã DUYỆT, không đổi.
- (CŨ, đã thay bằng bộ 260 món bên dưới) Biểu tượng 43 vật phẩm `img/wd-<khóa>.webp` (256x256, nền trong suốt): gpt-2-6, 4 tấm lưới (12 trâm thường, 9 trâm quý + ngự tứ, 12 y phục thường, 10 y phục quý + ngự tứ + áo tang), tách nền bằng loang nền trắng từ mép (dev: scratchpad tools/cut.py), mỗi ô cắt theo khung chứa vật. Bảng xem: dev/shots/wardrobe/icons-sheet.jpg.
- Logic trang phục j92 phần 2 (xong, 11/14): xem "Luật trang phục".

## BỘ VẬT PHẨM MỚI (11/14, phiên 2): 13 bậc × 20 món = 260 món (thay 43 món cũ)
Sếp chê bộ cũ (y phục không giống trang phục thật của nhân vật, ít món). Làm lại theo yêu cầu:
- **13 bậc**: 5 bậc cung nữ m0 Cung nữ thô sử, m1 Cung nữ, m2 Đại cung nữ, m3 Chưởng sự cô cô, m4 Nữ quan + 8 bậc phi tần Đáp ứng → Hoàng hậu. Mỗi bậc **10 trâm cài + 10 y phục**; trong mỗi loại **4 Thường, 3 Tinh phẩm, 2 Trân phẩm, 1 Tuyệt phẩm**. **Ngự tứ** vẫn là món hiếm riêng (9 món độc nhất mỗi kiếp: 3 trâm cũ giữ lại + 6 y phục vẽ mới) và 2 áo tang (vải trắng, vải gai).
- Dữ liệu: `dev/build/j92cat.js` (sinh bằng scratchpad `w2/tools/mkcat.py`; đứng ngay trước j92 trong assemble.py): `WD_TIERS`, `WD_LIST` hàng `[khóa, ô, tên, P, phẩm cấp, họ màu, tác dụng, ghi chú, icon, xa hoa 1–10, giá, bậc]`, `WD_OLDKEY` (quy đổi save cũ).
- **Luật phẩm theo bậc**: P của món = bậc của món. Phi tần 1..8 như cũ; **cung nữ có thang riêng** m0..m4 = −2, −1.5, −1, −0.5, 0 (ma ma 0, lãnh cung −1), nên cung nữ thô sử mặc áo Nữ quan là vượt phẩm, Nữ quan mặc áo thô sử là quá giản dị, cùng ngưỡng `WD.over`/`WD.under`. Phẩm cấp trong bậc cộng thêm `WD.gBump`=0,15 bậc mỗi nấc (Tuyệt phẩm đúng bậc vẫn đúng phẩm; Tuyệt phẩm bậc trên là vượt phẩm). Ngự tứ của chính mình không bao giờ vượt phẩm.
- **Phẩm phục được cấp** (from "base") tự đổi theo bậc hiện tại (thăng, giáng, cung nữ thăng bậc); ưu tiên món Thường/Tinh phẩm.
- Giá: theo bậc (cung nữ 8–22, Đáp ứng 25 … Hoàng hậu 320) × phẩm cấp (×1 / 1,4 / 2 / 3). Xa hoa 1–10 theo bậc + phẩm cấp, hiện trong mô tả món ("Xa hoa n/10"). Tác dụng Sắc/Danh theo bậc + phẩm cấp.
- **Save cũ**: 18 khóa y phục cũ quy về món mới cùng bậc, phẩm cấp gần nhất (`WD_OLDKEY`, đổi lười trong `wdOf`, cả rương, đồ cầm cố, hàng rong, điều đã biết `S.wdk`/`v.wdk`); 18 trâm cũ đẹp giữ nguyên khóa, chỉ thay ảnh 512 và bậc/phẩm cấp mới. Đã thử: save từ bản 8c2171b (có y_haiduong, y_cungnu, y_minhhoang…) mở ở bản mới, đổi đúng, không lỗi.
- **SƯU TẬP**: `S.wdCol` đếm mọi món khác nhau từng có trong kiếp này (mặc, trong rương, cầm cố; áo tang không tính). Mốc `WD.colMs`: 20 «Hương khuê sơ tập» +5 Phúc duyên, 50 «Cẩm tú doanh rương» +10, 100 «Bách bảo trang đài» +20, 200 «Thiên y các chủ» +35 (theo đề xuất sếp/điều phối); mỗi mốc một lần mỗi kiếp qua `pdAdd(n, why, "wdcol"+m)` (j52), thẻ báo + Nhật ký; danh hiệu ghi vào dòng kiếp trong **Sổ luân hồi** (bọc `lifeSave`: "Sưu tập: «…» (n món)"). Không mang đồ sang kiếp sau. Phúc duyên chỉ để đổi thân phận; kiếp dở dang (jkiep, thợ cân bằng) mất Phúc duyên kiếp đó, kể cả phần sưu tập (đi chung sổ S.pdLife). Tư trang có dòng "Sưu tập kiếp này: n món · danh hiệu · mốc sau". `wdColInfo()` cho kit. KIT_GLOSS: "Sưu tập", "Xa hoa", "Phẩm cấp".
- **Ảnh**: `img/wd-<bậc>-<y|tram>-<nn>.webp` 256×256 nền trong suốt + `img/wd512/…` 512×512 xem chi tiết; `img/wd-nt-tram-01..03`, `wd-nt-y-01..06`, `wd-tang-y-01..02`. `WD_ITEMS[k].icon` / `.big`. 43 ảnh cũ `img/wd-<khóa cũ>.webp` đã xóa.
  - Y phục vẽ THEO HÌNH MẪU: mỗi bậc ghép 10 tranh nhân vật đúng bậc thành 1 ảnh tham chiếu (phi tần `fig-consort-cXX-tN-a26`, cung nữ `fig-maid-mXX-tmK-a26` từ nhánh review/maid-art, m1 = tranh gốc), gpt-2-6 vẽ đúng bộ áo của nhân vật ở ô tương ứng, treo trên giá áo gỗ hình chữ T (bậc thấp gỗ trơn, Tần–Phi gỗ chạm mây, Quý phi trở lên chạm thếp vàng đầu phượng), không người; mỗi món đổi màu, hoa văn, lớp khoác theo thang áo LAD (spec5.py) của bậc.
  - Trâm cài sang dần theo bậc: gỗ/xương/đồng (m0) → bạc, lưu ly, trai (m1–m2, Đáp ứng, Thường tại) → mạ vàng, ngọc, san hô (m3–m4, Quý nhân) → vàng, bộ diêu (Tần, Phi) → kim phượng (Quý phi) → phượng điểm thúy (Hoàng quý phi, Hoàng hậu). Mỗi bậc phi tần và m0 giữ 2 trâm cũ đẹp (cắt lại 512 từ tấm gốc), vẽ thêm 8.
  - Gom lưới 5×2 (trâm phi tần 4×2) mỗi lượt, 4k; cắt bằng `w2/tools/cutgrid.py` (loang nền giấy từ mép + nền kẹt trong khung, nền theo vùng, bỏ bóng đổ ở trâm, gán mảnh vào ô theo tâm để món lấn ô vẫn nguyên).
  - Ảnh lưới xem trước từng bậc: `dev/shots/wardrobe/tier-<bậc>-yphuc.jpg`, `tier-<bậc>-tram.jpg`, `tier-ngutu-tang.jpg`.
- Tín dụng: toàn bộ ảnh vẽ bằng Magnific **gpt-2-6** (thư mục ba4aecfe-…), style ref face-consort-01 (y phục), tấm trâm cũ (trâm), ref nhân vật = tranh nhân vật trong game; mã lượt vẽ: scratchpad `w2/gens.txt`.

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

## Luật trang phục (j92, đã code)
- Thang phẩm phục P: 0 cung nhân, 1..8 = Đáp ứng..Hoàng hậu, 9 Thái hậu. Mỗi món có P thật (ẩn) + phẩm cấp thấy được: Thường / Tinh phẩm / Trân phẩm / Tuyệt phẩm / Ngự tứ. 43 món (`WD_LIST`), 6 món ngự tứ độc nhất mỗi đời (`S.wdNt`), ghi người ban + ngày (`e.giver`, `e.d`, `e.own`).
- Mức bộ đồ L = 0,4·P(trâm) + 0,6·P(y phục). L − P mình ≥ 0,75: Vượt phẩm; ≤ −1,75 (lễ lớn −1): Quá giản dị (thấp từ 2 bậc); quốc tang mà có món đỏ/vàng: Phạm tang. Ngự tứ của chính mình không bao giờ tính vượt phẩm.
- ẨN: người chơi chỉ biết P một món khi: có người nhận xét đúng (Thái hậu, Hoàng hậu, người đã biết món ấy), bị hặc và tra xét, tai mắt dò ở Nội vụ phủ, ma ma tinh ý nhận ra lúc được ban, hay Nội vụ phủ cấp theo phẩm mới. Lời nhận xét của phi tần chưa biết món chỉ là ý kiến (có thể sai), ghi "chưa chắc". Mọi thứ biết được ghi vào Sổ ghi (noteAdd + intelAdd). NPC cùng luật (`v.wdk`, `v.wdSeen`, đoán sai theo nhiễu `autoErr`).
- Tự chọn đồ (0 khắc): chọn theo điều mình TIN (món chưa rõ phẩm có nhiễu) → có thể trúng bộ sai phẩm; chữ độ chắc theo số món chưa rõ.
- Chải chuốt (1 khắc, khung trò kit j82): kim lướt qua thước Giản dị | Đúng phẩm | Lộng lẫy, chạm 3 lần trong 10 giây (cài trâm, chọn áo, điểm trang), trung bình 3 lần quyết định; vùng giữa = 0,26 + Tài/300 + 0,02·bậc thêu/cắm hoa + 0,10 nếu có ma ma tinh ý (tối đa 0,5). Nút Bỏ qua = Tự chọn đồ. Khi xong mặc bộ đúng theo vùng (theo P thật).
- Hằng tháng: Vượt phẩm: Sắc ×1,5 từ đồ đang mặc, 40% Sủng +1, đối thủ có cớ; người ta nhận xét (35%/tháng nếu sai, 10% nếu đúng, 70% nếu phạm tang). Bị chê giản dị: Danh −1 (lễ lớn thêm −2); được khen đúng phẩm ngày lễ: Danh +1; phạm tang bị thấy: Danh −6, Sủng −5, bị phạt.
- Quốc tang: Thái hậu hoặc Hoàng hậu băng hà → 3 tháng, báo tin, NPC phần lớn tự thay đồ trắng (Kiêu ngạo hay quên). Áo tang vải trắng luôn có sẵn trong Tự chọn.
- Hặc ăn mặc sai phẩm (act `vp`, nhóm Hại nặng, hai chiều): cần nguyên cớ (đã biết chắc, hoặc nghe nhận xét về đúng bộ nàng đang mặc trong 12 tuần; NPC liều lĩnh kém Tâm cơ có thể hặc theo phỏng đoán). Tra xét theo P thật: nàng đúng phẩm → kẻ hặc bị phản (Danh −5, thù −12, nàng Danh +2); sai thật + thành → vượt phẩm: tịch thu món vượt (trừ ngự tứ), Danh −6, phạt; giản dị: Danh −4; phạm tang: Danh −8, Sủng −5, phạt nặng; không thành: Danh −2.
- Giá họa (act `giahoa`, Hại nặng, hai chiều, Bạc −40, Đức −4): lén đặt đồ quý vào phòng rồi tố ăn trộm. Với người chơi: 1–2 tuần sau mới tố; tai mắt có thể báo trước (20% + Tai mắt·6 + 15 nếu có người hầu trung thành), có khi lần ra kẻ chủ mưu (+1 chứng cứ); Kiểm tra đồ (j8) tìm ra thì lời tố thành tố bừa. Bị tố: Trình chứng cứ minh oan (tốn 1 chứng cứ j78) / Xin Cung Chính ti tra xét / Nhận lỗi. NPC giá họa nhau và người chơi qua j40 mindMenu (ác ý ≥ 50).
- Bán lén / cầm cố qua ma ma hoặc thái giám tin cẩn (lòng ≥ 40): bán 40–60% giá (theo lòng), lộ túng thiếu 12% (+15 nếu "nhiều chuyện") → Danh −3; cầm cố được 50%, chuộc 60% trong 12 tuần, quá hạn mất. Ngự tứ không bán, không cầm, không tặng, không dùng để cài. NPC túng tiền cũng bán lén.
- Ngự tứ mất/hỏng (người hầu nhát gan/tham): Tự thú (Sủng −6, Danh −3) / Sai người lùng tìm, sửa (Bạc −40, có thể hỏng) / Giấu (có thể lộ: Sủng −10, phạt nặng, tội bất kính). Lựa chọn chỉ hiện chi phí.
- Phần thưởng rút từ kho thật: mỗi lần ban thưởng (bestow) 45% kèm một món y phục/trâm đúng phẩm người nhận (phẩm cấp theo dịp); ngự tứ: sinh hoàng tử 35%, tấn phong 25%, thi tài 15%, truyện 60%. Mệnh truyện nhóm court: bậc 0–2 = y phục/trâm Thường..Trân phẩm, bậc 3 = ngự tứ. Gánh hàng rong thêm 1–2 món y phục (phẩm chưa rõ). Lên phẩm: Nội vụ phủ cấp bộ mới (đã biết phẩm).
- Save cũ: `wdOf(p)` tự cấp bộ mặc đúng phẩm, trâm cũ đang đeo chuyển vào ô Trâm cài; mọi trường mới khởi tạo lười. Đã thử: save từ bản main mở được ở bản mới.

### API cho chủ kit (K1/K2)
`wdSlots(p)` · `wdChest(slot)` · `wdAutoUI()` · `wdGroomUI()` · `wdWearUI(ix)` · `wdOffUI(slot)` · `wdSellUI(ix)` · `wdPawnUI(ix)` · `wdRedeemUI(i)` · `wdCause(S,v)` (có nguyên cớ hặc không) · `wdKnownStatus(p)` · `WD_ITEMS[k].icon`. Act: `ACT.vp`, `ACT.giahoa`. Sự kiện: `PEND.wdframe`, `PEND.wdnt`.

## Còn lại / ghi chú
- Chờ chủ kit dựng K1 (ô cạnh chân dung) và K2 (Rương đồ). Hiện nối tạm: Tư trang có khối "Trang phục đang mặc" + rương trâm/y phục bằng `.ph` + act card `pbtn`; thẻ người có chip "Trâm: …", "Y phục: …" (+ nhãn nếu đã biết).
- Chưa đo cân bằng (bot j bal) sau khi thêm giá họa / hặc mới.

## Thử (11/14, Playwright, 755x1000@2 và 1180x820@2)
- Không lỗi trang, không tràn ngang. Ảnh: dev/shots/wardrobe/wd-*.jpg (Tư trang, trò Chải chuốt, kết quả, sự kiện bị tố ăn cắp, đồ ngự tứ vỡ).
- Save tạo ở bản main (index.html gốc) mở được ở bản mới, chơi tiếp được; trâm cũ đang đeo vào ô Trâm cài.
- Bot 300 buổi (~11 tháng): lời nhận xét, tai mắt, giá họa, hặc của NPC chạy, không lỗi.
