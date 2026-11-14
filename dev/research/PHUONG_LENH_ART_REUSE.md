# Dùng lại tranh nơi chốn của Phượng Lệnh cho Cung Tường Mộng

Ngày 14/11/2026. Nguồn: `thientran2711/phuong-lenh-art` @ `a9becbe` (clone blobless tại `/home/user/phuong-lenh-art`, chưa sửa gì). Đây là nghiên cứu chỉ đọc. Chưa chép tranh nào vào game.

## 1. Kết luận nhanh

- **Bản đồ tổng quan hoàng cung của ta đã là tranh của Phượng Lệnh.** `img/map-*.webp` (1792×1000) là bản thu nhỏ của `places/palace/nhat/m/L1/overview/<state>.webp` (2752×1536). Sai khác xám trung bình chỉ 0,86/255, trong khi các bản khác lệch 16–44. Tên trạng thái lễ hội cũng trùng hệ: phoenix, thanhminh, trungcuu…
- **Phần ta còn thiếu là bản đồ chi tiết từng nơi (L2), mặt tiền (L2b) và phòng trong (L3).** Repo đã có đủ, cùng một hệ (Hoàng cung Nhất phẩm) và đúng tên cung của ta. Phần lớn ánh xạ 1:1.
- **Phong cách:** tranh minh họa vẽ tay tô màu nước, góc nhìn từ trên cao (bird's-eye), không phải pixel. Hợp với bản đồ hiện tại. Tranh nội thất mới của ta (`dev/shots/residence/`) vẽ ngang tầm mắt, ấm và mềm hơn. Hai loại dùng chung được nếu L2 làm "bản đồ" và tranh residence làm "cảnh đứng trong phòng".

## 2. Cấu trúc và quy ước của repo

`places/palace/<grade>/<sex>/<level>/<folder>/<season>_<time>.webp`. Nguồn: `places/palace/CENSUS.md`, `_plan/notes.md`.

- **grade:** `nhat` / `nhi` / `tam` (Nhất/Nhị/Tam phẩm, tức 56/40/28 chỗ ở). Mỗi bậc là một bộ tranh riêng, bậc cao hơn thì nhiều nhà hơn. **Ta dùng `nhat`**, cho khớp bản đồ hiện có.
- **sex:** `f` cho Nữ đế (phi là nam, phòng kiểu nam), `m` cho Hoàng đế (phi là nữ, phòng kiểu nữ), `x` dùng chung. Ta là hậu cung của Hoàng đế nên **dùng `m`** khi có, còn lại dùng `x`.
- **level:**
  - L1: tổng quan toàn hậu cung.
  - L2: sân/viện của một nơi, nhìn từ trên cao. Thấy chính điện, đông và tây phối điện, cổng, cung nữ và thái giám nhỏ.
  - L2b: mặt tiền hậu điện.
  - L3: phòng trong, cắt mái nhìn xuống, trống người.
- **state:**
  - 4 mùa (`xuan` `ha` `thu` `dong`) × 4 buổi (`sang` `trua` `chieu` `toi`) = 16 trạng thái thường.
  - Lễ: `newyear_{sang,trua,chieu,toi}`, `giaothua_toi`, `nguyentieu_toi`, `thanhminh_sang`, `doanngo_trua`, `thattich_toi`, `trungthu_{sang,trua,chieu,toi}`, `trungcuu_trua`, `dongchi_sang`, `phoenix_sang`.
- **Kích thước:** 2688×1520 hoặc 2752×1536 (khoảng 16:9, 1,77–1,79). Mỗi tệp 0,7–1,8 MB WEBP. Cần nén lại xuống khoảng 1792 rộng, tầm 300–400 KB, như bản đồ hiện tại.
- **Tổng:** mỗi bậc có 1.463 webp (khoảng 1,65 GB); cả `places/palace` có 4.389 webp. Kèm theo: Đông cung (`places/dongcung`, khoảng 11,6k tệp), kinh thành (`places/capital`), phủ đệ (`ho`, `truc`, `hac`, `tung`, `sen`, `lan`, `mai`, `maudon`), ngoại quốc (`far`), thái ấp (`fief`), thiên hạ (`realm`).

## 3. Độ phủ trạng thái (bậc nhat)

| Level | Thư mục | Thường (mùa×buổi) | Lễ |
|---|---|---|---|
| L1 overview (f, m) | 1 mỗi giới | 16/16 | 16 (đủ 16 lễ kể trên) |
| L2 nơi chính: can-ninh, vinh-hoa, quy-cung, phi-cung, cac, bac-uyen, duong-hoa, duc-tho, tho-khang | x | 16/16 | 12 (newyear×4, giaothua, nguyentieu, thattich, doanngo, trungthu×4) |
| L2 garden | x | 16/16 | 11 |
| L2 can-chinh, ngoai-vien | x | 16/16 | 8 |
| L2 phung-tien, ngu-thien | x | 16/16 | 7 |
| L2 các nơi phụ (spare-cung, truong-mon, noi-thi, duc-anh…) | x | 16/16 | 1–5 (thường chỉ newyear_trua) |
| L2b (8 thư mục f/m + 11 thư mục x) | | 16/16 | 1 (trungthu_toi hoặc newyear) |
| L3 phòng (13 f/m + 36 x) | | 4 buổi, không đổi mùa (chỉ có `xuan_*`) | không có |

Ghi chú về chất lượng: tranh lễ ban đêm `x/L2/can-ninh/newyear_toi` nét phẳng và tối hơn, hơi lệch so với tranh ban ngày. Cần soi từng tấm trước khi đưa vào game.

## 4. Ánh xạ tên Cung Tường Mộng sang Phượng Lệnh

| CTM (MAPH / mã) | PL L2 (sân, bản đồ chi tiết) | PL L2b (mặt tiền) | PL L3 (phòng) | Ghi chú |
|---|---|---|---|---|
| Càn Ninh cung (`kn`, hậu vị) | `nhat/x/L2/can-ninh` | `nhat/m/L2b/can-ninh` | `nhat/m/L3/can-ninh-hall` (chính điện, bảo tọa), `nhat/m/L3/can-ninh-bed` | 1:1 |
| Vĩnh Hòa cung | `nhat/x/L2/vinh-hoa` | `nhat/m/L2b/vinh-hoa` | `nhat/m/L3/vinh-hoa-bed` | 1:1 |
| Thừa Minh cung, Diên Huy cung | `nhat/x/L2/quy-cung` (Quý cung, hai cung dùng chung một tranh) | `nhat/m/L2b/quy-cung` | `nhat/m/L3/quy-bed` | dùng chung |
| Cảnh Phúc, Khải Tường, Chung Tú, Hàm An cung | `nhat/x/L2/phi-cung` (Phi cung, bốn cung dùng chung) | `nhat/m/L2b/phi-cung` | `nhat/m/L3/phi-bed` | dùng chung. PL gọi là "Cảnh Phúc .. Hàm An" |
| Trường Xuân cung | `nhat/x/L2/spare-cung` (cung dự phòng, đóng cửa) | — | — | PL vẽ là cung bỏ trống. Nếu có người ở thì dùng `phi-cung` |
| Đông/Tây phối điện (thứ phi ở cùng cung) | (thấy trong tranh L2) | `nhat/m/L2b/side-hall` | `nhat/m/L3/quynhan-room` (đông), `nhat/m/L3/tainhan-room` (tây), `nhat/m/L3/luongnhan-room` (hậu phòng) | khớp đông/tây phối |
| Ngọc Thanh các (`home`) | `nhat/x/L2/cac` | `nhat/m/L2b/cac` | `nhat/m/L3/cac-bed` | 1:1 theo dạng "các" |
| Dưỡng Hòa điện (`dtd`) | `nhat/x/L2/duong-hoa` | `nhat/x/L2b/duong-hoa` | `nhat/m/L3/own-bed`, `own-study`, `own-music`; `x/L3/hien-dai-chieu`, `x/L3/bep-rieng` | 1:1 |
| Cần Chính điện (`thu`) | `nhat/x/L2/can-chinh` | — | `nhat/x/L3/can-chinh`, `accts`, `strong`, `archive` | 1:1 |
| Đức Thọ cung (`tn`) | `nhat/x/L2/duc-tho` | `nhat/x/L2b/duc-tho` | `nhat/x/L3/duc-tho-bed`, `x/L3/tu-tu` | 1:1 |
| Ngự hoa viên (`vuon`) | `nhat/x/L2/garden` | — | `x/L3/giang-tuyet` (trà hiên), `x/L3/tuyen-tu` | 1:1 |
| Lãnh cung / Trường Môn viện (`lc`) | `nhat/x/L2/truong-mon` | `nhat/x/L2b/truong-mon` | `nhat/x/L3/truong-mon` | 1:1 |
| Kính sự phòng (`ksp`) | gần nhất là `nhat/x/L2/noi-thi` (Nội thị sở) | — | `x/L3/noi-thi`, `x/L3/eunuch-room` | thay thế |
| Thái y viện (`tyv`) | không có trong Hoàng cung | — | `places/capital/offices/L3/thaiy` (nha môn kinh thành) | thiếu, dùng tạm |
| Thêm: Thọ Khang, Giao Thái, Quỳnh Yến, Phụng Tiên, Dục Anh, Ngự thiện, Nội vụ phủ, Bắc Uyển… | có | | | dùng cho sự kiện về sau |

## 5. Mẫu đã xem

Thư mục: `/tmp/claude-0/-home-user-cung-tuong-mong/a5fd33d3-7f41-5bff-b6da-0b51bb3f7f98/scratchpad/pl/`. Mỗi tệp có kèm bản `.thumb.jpg`.

- `palace_nhat_f_L1_overview_xuan_trua.webp`: tổng quan.
- `palace_nhat_x_L2_vinh-hoa_xuan_trua.webp`: sân Vĩnh Hòa. Thấy chính điện, đông và tây phối điện, cổng, cung nữ.
- `palace_nhat_x_L2_phi-cung_thu_chieu.webp`: Phi cung, mùa thu.
- `palace_nhat_x_L2_can-ninh_newyear_toi.webp`: lễ Tết, ban đêm.
- `palace_nhat_f_L2b_can-ninh_dong_toi.webp`: mặt tiền, mùa đông, ban đêm.
- `palace_nhat_f_L3_can-ninh-hall_xuan_trua.webp`: chính điện Càn Ninh, cắt mái nhìn xuống.
- `du-do.png`: sơ đồ màn Dư đồ (UI).
- `cmp/nhat_m.webp` và các tệp `cmp/*`: L1 overview `xuan_sang` của 6 bậc×giới, dùng để so khớp với bản đồ của ta.

Ở Cung Tường Mộng: `img/map-xuan-sang.webp`, và `.claude/worktrees/agent-a8d68edf42911eff9/dev/shots/residence/*.webp` (3504×2336, nội thất ngang tầm mắt; sheet: `sheet-xuan-sang.jpg`).

## 6. Cách dùng

1. **Dùng thẳng (khuyến nghị) cho L2.** Chạm cung trên bản đồ thì mở `nhat/x/L2/<folder>/<mùa>_<buổi>.webp`, hoặc `<lễ>_<buổi>` khi có lễ.
   - Thiếu biến thể lễ thì lùi về trạng thái thường cùng buổi.
   - Đặt hotspot lên tranh L2 cho Chính điện, Đông phối và Tây phối. Từ đó mở L3 (phòng) hoặc tranh residence của ta.
2. **L3 và L2b** dùng làm cảnh "vào trong" hoặc "đứng trước điện". L3 chỉ có 4 buổi, mùa thì đổi bằng ánh màu trong code.
3. **Tranh dùng chung một mẫu** (Quý cung cho 2 cung, Phi cung cho 4 cung): phân biệt bằng biển tên, chủ nhân và bảng màu. Nếu cần phân biệt bằng hình thì về sau re-skin (đổi cây hoặc đồ đặt trong sân bằng Magnific). Không cần vẽ lại.
4. **Kích thước:** nén về 1792×1000 (hoặc 1600), quality khoảng 80. L2 cho 9 nơi chính × 28 trạng thái là khoảng 250 tệp, chừng 90 MB sau khi nén. Có thể tải lười (lazy-load) theo mùa.
5. **Cách lấy tệp:** `git -C /home/user/phuong-lenh-art show HEAD:places/palace/nhat/x/L2/vinh-hoa/xuan_sang.webp > ...`. Lệnh này tải từng blob, nên không cần checkout. Đĩa trống chỉ khoảng 7,8 GB, không checkout cả repo (82k tệp).

## 7. Thiếu sót và rủi ro

- Thái y viện không có tranh trong Hoàng cung (chỉ có ở kinh thành). Kính sự phòng phải dùng Nội thị sở thay.
- Trường Xuân được vẽ là cung bỏ trống. Phi cung và Quý cung là tranh dùng chung, nên 8 cung của ta không có 8 sân khác nhau: thực tế chỉ có 4 mẫu (vinh-hoa, quy-cung, phi-cung, spare-cung). Càn Ninh có tranh riêng.
- L3 không có biến thể theo mùa hay lễ. Lễ ở L2b và các nơi phụ rất ít.
- Tranh L3 "trống người" là cắt mái nhìn xuống, khác góc nhìn với tranh residence ngang tầm mắt của ta. Nên chọn một kiểu cho màn "trong cung".
- Bản quyền và luật: tranh do chính chủ sở hữu và đều nằm trong repo của chủ. README của PL yêu cầu mỗi lần dùng phải ghi một dòng manifest, nhưng đó là luật bên PL; với CTM chỉ cần ghi nguồn (commit `a9becbe`) trong tài liệu.

## 8. Khuyến nghị

Không vẽ mới bản đồ chi tiết. Đưa ngay vào game:

1. Bộ `nhat/x/L2` cho 13 nơi trên bản đồ: can-ninh, vinh-hoa, quy-cung, phi-cung, spare-cung, cac, duong-hoa, can-chinh, duc-tho, garden, truong-mon, noi-thi, cùng Thái y viện lấy từ capital. Lấy đủ 16 trạng thái thường và mọi trạng thái lễ hiện có.
2. Thêm hotspot Chính điện / Đông phối / Tây phối trên mỗi tranh L2.
3. Phòng trong: giữ tranh residence mới của ta làm cảnh nhân vật. Lấy thêm L3 `m` khi cần cảnh "xem phòng" hoặc "thị tẩm" (own-bed).
4. Chỉ re-skin bằng Magnific nếu cần phân biệt 4 cung dùng chung mẫu Phi cung.

## 9. Soát lại (14/11/2026, theo ý chủ)

**Kết luận:** Bản kiểm kê ở mục 4 và 7 đúng về cách PL đặt tên thư mục, nhưng sai khi nói "chỉ có 4 mẫu". PL **không** vẽ riêng 14 cung theo tên. Theo `places/palace/CENSUS.md` ("compounds of one FORM share one picture per grade") và bảng phẩm trong `_plan/hoangcung_site_plan_v3c.py`, PL chọn tranh theo **phẩm của chủ vị**, còn tên cung chỉ là nhãn. Có điều mỗi bậc `nhat`/`nhi`/`tam` là **một bản vẽ khác hẳn** của cùng dạng cung, không phải chép lại: khác số nhà phụ, khác mái phối điện (tam mái xám), khác cây và đồ trong sân (xem sheet). Vì vậy mỗi dạng có 3 tranh sân khác nhau. Tính cả Đông cung và hậu viện của 8 phủ đệ thì có tổng cộng hơn 30 sân khác nhau.

Sheet: `dev/shots/pl-all-palaces.jpg` gồm 48 sân L2 (`xuan_trua`): 12 nơi × 3 bậc, 4 sân Đông cung và 8 hậu viện phủ đệ. `dev/shots/pl-all-rooms.jpg` gồm 41 phòng L3 (`m`, `xuan_trua`).

### 9.1 Các cây thư mục khác là gì

- `places/palace/<bậc>/x/L2`: 32 sân của Hậu cung (Nữ đế/Hoàng đế). Nơi ở của phi tần: `can-ninh`, `vinh-hoa`, `quy-cung`, `phi-cung`, `cac`, `spare-cung`, `bac-uyen`. Hoàng tộc: `duc-tho` (Mẫu hậu, cùng đường Tư Từ), `tho-khang` (các cha, Thái thượng), `duong-hoa` (tẩm của vua), `duc-anh` (nhà trẻ), `truong-mon` (lãnh cung). Nghi lễ và công vụ: `giao-thai` (điện lễ), `quynh-yen` (yến điện, hí đài Thiều Hoa), `trai-cung`, `phung-tien`, `can-chinh`, `garden`, `noi-vu`, `noi-thi`, `dich-dinh`, `ngu-thien`, `phong-may`, `gieng`, `thu-duong`, `hoc-duong`, `thuong-tac`, `thuong-tu`, `cam-ve`, `dien-vo`, `khach-quan`, `ngoai-vien`.
- `palace/<bậc>/{m,f}/L2b`: mặt tiền hậu điện. `side-hall` là phối điện của người ở kèm (Quý nhân, Tài nhân), `rear-room` là hậu phòng của Lương nhân.
- `palace/<bậc>/{m,f}/L3`: phòng chủ và phòng người ở kèm (xem 9.2). `x/L3`: phòng của hoàng tộc và công vụ.
- `dongcung/<bậc>/{m,f}/L2`: Đông cung. `chinh` là chính viện của Thái tử, `thanhba` là Thanh Ba điện (Thái tử phi), `trac` là viện trắc phi, `vanlang` là Văn Lãng (sân phụ). Còn `x/L2`: giaduong, haudich, tinhthat, yensanh…, và `x/L3/cungnu` (phòng cung nữ), `thosu`, `thaigiam`.
- `hac ho lan mai maudon sen truc tung`: 8 phủ đệ của 8 nhà quyền quý, theo biểu tượng hạc, hổ, lan, mai, mẫu đơn, sen, trúc, tùng. Mỗi phủ vẽ riêng, có `L2/hauvien` (hậu viện của các bà vợ) và `L2b/q-chinh|q-trac|q-thi`. Đây **không** phải cung phi. Nhìn sheet thì khác hẳn: tường trắng, mái xám, nhà dân.
- `capital`: kinh thành. `fief`: thái ấp. `far`: ngoại quốc. `realm`: thiên hạ. `_fest`, `_l3`, `_fix`: kit và sổ ghi các đợt vẽ.

### 9.2 Bảng phẩm → thư mục (cách PL làm; CTM nên làm y như vậy)

| Phẩm chủ vị (PL) | L2 sân (`<bậc>/x/L2`) | L2b mặt tiền (`<bậc>/m/L2b`) | L3 phòng (`<bậc>/m/L3`) |
|---|---|---|---|
| Hoàng hậu (`house.q.top.1`) | `can-ninh` | `can-ninh` | `can-ninh-hall` (chính điện, bảo tọa 3 bậc), `can-ninh-bed` |
| Hoàng quý phi (`q.top.2`) | `vinh-hoa` | `vinh-hoa` | `vinh-hoa-bed` |
| Quý phi ×2 (`q.cung.1-2`) | `quy-cung` (hậu điện 5 gian) | `quy-cung` | `quy-bed` |
| Phi ×4 (`q.cung.3-6`) | `phi-cung` (hậu điện 3 gian) | `phi-cung` | `phi-bed` |
| Tần ×6 (`q.cac.1-6`, lầu 2 tầng, ngói xanh) | `cac` | `cac` | `cac-bed` (tầng trệt: ghế ngồi, tẩm, thư phòng) |
| Quý nhân (phối điện Đông của cung, hoặc sương phòng các 1-2) | sân của chủ cung | `side-hall` | `quynhan-room` |
| Tài nhân (phối điện Tây, hoặc sương phòng các 3-6) | sân của chủ cung | `side-hall` | `tainhan-room` |
| Lương nhân / Thường tại (hậu phòng, gian Nam dãy sau phía Tây) | sân của chủ cung | `rear-room` | `luongnhan-room` |
| Thị tòng / Đáp ứng (Bắc Uyển, 3 người một phòng) | `bac-uyen` | `bac-uyen` | `bac-room` |
| Cung trống (Trường Xuân, Hàm Phúc) | `spare-cung` (đóng cửa, chỉ người quét) | — | — |
| Hoàng đế | `duong-hoa` | `x/L2b/duong-hoa` | `own-bed`, `own-study`, `own-music`; `x/L3/hien-dai-chieu`, `bep-rieng`; Cần Chính: `x/L2/can-chinh` và `x/L3/can-chinh` |
| Thái hậu | `duc-tho` | `x/L2b/duc-tho` | `x/L3/duc-tho-bed`, `x/L3/tu-tu` |
| Thái thượng / các cha | `tho-khang` | `x/L2b/tho-khang` | `x/L3/tho-khang-bed` |
| Lãnh cung | `truong-mon` | `x/L2b/truong-mon` | `x/L3/truong-mon` |

Nữ đế thì dùng `f` thay cho `m`. Trong PL, tên cung chỉ là nhãn: Vĩnh Hòa = Hoàng quý phi; Thừa Minh, Diên Huy = Quý phi; Cảnh Phúc, Khải Tường, Chung Tú, Hàm An = Phi; Tịnh Tâm, Ngọc Thanh, Thư Hương, Họa Ý, Thúy Vi, Di Thần = các của Tần; Trường Xuân, Hàm Phúc = dự phòng.

### 9.3 Đề xuất cho CTM

- **Theo luật của chủ:** cung nào cũng lấy tranh theo phẩm của chủ vị hiện tại. Đổi chủ vị hoặc thăng giáng phẩm thì đổi tranh. Cung không có chủ vị thì dùng `spare-cung`.
- **Cách phân biệt các cung cùng phẩm:** dùng 3 bậc vẽ khác nhau. Ví dụ Phi: Cảnh Phúc dùng `nhat/phi-cung`, Khải Tường dùng `nhi/phi-cung`, Chung Tú dùng `tam/phi-cung`, Hàm An dùng `nhat/quy-cung`. Thừa Minh và Diên Huy (Quý phi) dùng `nhat` và `nhi/quy-cung`. Bậc `tam` nhỏ và giản dị hơn, nên hợp với cung của phẩm thấp. Nhược điểm: với cùng một nơi, mùa và lễ chỉ đủ khi cả 3 bậc đều có (có, xem mục 3; L2 nơi chính có đủ 16 trạng thái thường và 12 lễ ở mỗi bậc).
- Ngọc Thanh các dùng `cac` (Tần). Càn Ninh dùng `can-ninh`. Đức Thọ dùng `duc-tho`. Dưỡng Hòa dùng `duong-hoa`. Trường Môn dùng `truong-mon`. Đông cung dùng `dongcung/nhat/m/L2/chinh`, phi của Thái tử dùng `thanhba` và `trac`. Phòng cung nhân dùng `palace/x/L3/dich-dinh-room`, `dongcung/x/L3/cungnu` hoặc `bac-room`.
- Không dùng hậu viện phủ đệ cho cung phi, vì sai kiểu kiến trúc.
