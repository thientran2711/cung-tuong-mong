# Nơi chốn mới trên bản đồ (kế hoạch, nhánh review/places)

Chủ: bản đồ thiếu chỗ ở của cung nhân, bếp, nơi học. Quyết định điều phối: thêm 6 nơi (tên cổ trang theo VANPHONG).
Dựa trên danh sách nơi của review/schedules2 (j95 @7517021): mã j77 hiện có `vuon thu dtd tn kn r<id> tyv ksp lc home` + `tgk` (j42).
**Không thêm "Hoán y cục"**: dùng lại `tgk` Tân Giả khố (đã có trong j42/j95, chỉ thiếu ô bản đồ và tranh riêng; hiện mượn tranh lãnh cung `sc:"lc"`).
Không sửa mã sổ j95 ở đây; mục "Móc vào sổ" là đề nghị cho thợ j95.

Ảnh vị trí: `dev/shots/places/map-new-places.jpg` (khung xanh = 6 nơi mới, khung cam = A ca sở / Đông cung, mục 5; trên map-ha-sang).

## 1. Vị trí trên bản đồ (toạ độ chuẩn 0..1 như map-hotspots.json)
Mọi nơi đều có sẵn nhà trên tranh bản đồ (chưa ai dùng) → **không cần sửa tranh bản đồ**.

| Mã | Tên (PLNAME [tên, chức]) | Nhà trên tranh | box x,y,w,h | anchor |
|---|---|---|---|---|
| `cnh` | Dãy nhà cung nhân · "chỗ ăn ngủ của cung nữ, thái giám" | sân tây dưới: hai dãy nhà dài mái xám đối nhau | .085,.645,.11,.155 | .14,.69 |
| `nvp` | Nội vụ phủ · "lo người, lương bổng, vật dụng" | cụm nhà công đường mái xám ngay trên `cnh` (kho hàng hoá ở .094,.81 làm "kho Nội vụ phủ", chỗ khuất) | .087,.578,.122,.066 | .148,.60 |
| `tgk` | Tân Giả khố · "nơi cung nhân chịu phạt giặt giũ" | sân tây có chậu tròn, cối xay | .097,.466,.13,.10 | .16,.50 |
| `nth` | Ngự thiện phòng · "bếp ngự" | sân dài phía đông có chum, vại, bàn (cạnh dãy cung phi tần) | .733,.455,.052,.137 | .758,.49 |
| `pd` | Phật đường · "nơi lễ Phật, tụng kinh" | điện hai tầng mái vàng có ao sen, góc đông bắc | .77,.235,.065,.155 | .80,.29 |
| `ttp` | Thượng thư phòng · "nơi hoàng tử học, phi tần luyện tài nghệ" | điện mái ngói xanh lục giữa sân lát đá, góc đông nam (mái xanh = nơi học của hoàng tử) | .825,.635,.07,.09 | .86,.67 |

- Tuỳ chọn (không bắt buộc): sân `tgk` trên tranh có mấy con ngựa nhỏ; nếu chủ muốn, một lượt gpt-2-6 EDIT đổi ngựa thành dây phơi áo trên cả 12 tranh mùa + 14 tranh lễ + 3 tranh mặc định (29 lượt, ~1.160 tín dụng), phải đo lại 0 px lệch như lần vẽ lễ hội.
- Đi lại: `travel()` (j9) dựa trên lưới `MAPL` 3×3. Đề nghị thêm một hàng: `["nvp","cnh","tgk"]` (cụm tây, gần `home`/`tyv`) và một cột `pd / nth / ttp` (cụm đông, cạnh `tn`/`ksp`/`home`). Ba nơi trong một cụm cách nhau 1 khắc.
- Nhãn: bản đồ hiện tên bằng `placeOf(k).n`. Thái y viện đã có ô và nhãn. Ngự thư phòng có trên bản đồ dưới tên mã `thu` = **"Cần Chính điện"** (PLNAME j27; tranh cảnh là ngu-thu-phong). Đề nghị nhãn thêm dòng phụ "Ngự thư phòng" (chức của PLNAME) để chủ thấy đúng chữ mình quen. Không đổi tên đã định.

## 2. Ai đến, khi nào (đề nghị móc vào sổ j95, KHÔNG sửa mã sổ ở nhánh này)
- `cnh`: chỗ ngủ đêm và nghỉ của kẻ hầu (khắc tối không phải trực); nhà của nhánh cung nữ (j42 hiện gọi `home` của kẻ hầu là "Phòng cung nữ · <cung chủ>" nhưng dùng tranh tẩm cung → dùng tranh `day-nha-cung-nhan`). Kẻ hầu mới tuyển chưa giao cung, cung nữ hết hạn Tân Giả khố chờ Nội vụ phủ chia việc, ma ma về già. Hẹn kín kẻ hầu ↔ thái giám/thị vệ (j42 tình duyên) ở góc sau dãy nhà.
- `nvp`: kẻ hầu đi việc (j95 dòng 193/211 hiện chỉ `tyv|ksp` → thêm `nvp`: "chủ sai đi lĩnh than, nến"); đầu tháng các cung sai người lĩnh lương; tổng quản/thái giám Nội vụ phủ trực ở đây (S.court). Chỗ khuất: "kho Nội vụ phủ" thêm vào SPOT95.
- `tgk`: kẻ bị phạt (S.srv.lau, kẻ hầu NPC bị đày) ngày đêm ở đây; quản sự trực. Phi tần chỉ đến khi có việc (cứu người, tra hỏi).
- `nth`: thái giám bếp trực; kẻ hầu đi lấy thiện/đưa canh (việc vặt mới); thái giám bán hàng rong (j95 dòng 200 `Lp`) thêm `nth`; mưu bỏ độc (j70 `pl`, j83 `wkPoison`) đi qua đây thay vì chỉ tyv. Chỗ khuất "sau bếp Ngự thiện phòng".
- `pd`: thói quen "Hiền lành/Nhu mì → lễ Phật buổi sáng" (j95 dòng ~49, hiện ở Từ Ninh) chia đôi Từ Ninh / Phật đường; Thái hậu đôi khi lễ Phật buổi sáng; lễ Phật đản, Thánh thọ (sự kiện j68 "các cung lên Phật đường tụng kinh") đặt cả cung vào `pd`.
- `ttp`: hoàng tự ≥6 tuổi buổi sáng/trưa (j53/j65 "vào Thượng thư phòng học chung"), thầy dạy; mẹ đến "Khảo bài"; phi tần có tài nghệ (j95 habit đàn/họa/thơ) đôi khi luyện buổi chiều.

## 3. Quyền vào (j41 accessOf / ACC_DAY / j42 placeEnterHook)
| Nơi | Phi tần | Kẻ hầu (nhánh cung nữ) | Đêm | Lẻn vào (khi bị chặn) |
|---|---|---|---|---|
| `cnh` | mọi phẩm, ban ngày (chuyện ít khi; không mất Danh) | luôn vào | chỉ kẻ hầu | Khá chắc; bắt: Danh -8 |
| `nvp` | mọi phẩm, ban ngày (ACC_DAY) | luôn vào ban ngày | đóng | Năm ăn năm thua; bắt: Danh -8 |
| `tgk` | Quý nhân trở lên (Thường tại, Đáp ứng: Lẻn vào) | chỉ khi bị phạt hoặc chủ sai | mở | Khá chắc; bắt: Danh -8 |
| `nth` | Quý nhân trở lên ban ngày, có lý do (nấu canh dâng) | khi chủ sai | đóng | Khó; bắt: Danh -8 **và** chứng cứ "lảng vảng bếp ngự" (nghi bỏ độc) |
| `pd` | mọi phẩm, sáng/chiều | theo hầu chủ hoặc chủ sai | đóng | Khá chắc; bắt: Danh -8 |
| `ttp` | Tần trở lên, hoặc có con đang học; khác: Xin bái kiến thầy | theo hầu chủ | đóng | Năm ăn năm thua; bắt: Danh -8 |
Ô bị chặn xám hẳn kèm lý do, như mọi ô (j77). Hai chiều: NPC theo đúng luật này (sổ j95 dùng `j95acc`).

## 4. Việc ở mỗi nơi (dùng lại việc đã có, chỉ đổi chỗ; không đặt việc mới trùng)
- `cnh`: "Nghỉ lấy sức" (j42, khi ở nhà); "Thưởng cung nữ" (đã có); sự kiện Lạp bát "Tự tay nấu cháo phát cho cung nhân" (j31) diễn ở đây; sự kiện thời tiết "Tuyết dày làm sập mái nhà cung nữ" (j68) chỉ chỗ này.
- `nvp`: "Lĩnh đồ ở Nội vụ phủ" (j42, nay phải đi đến nơi); "Thêm cung nữ" / trả người (j14 thẻ ghi "Nội vụ phủ · Bạc -20") có thêm cửa làm ngay tại đây; thăng bậc cung nữ cuối tháng ("Nội vụ phủ ghi công"); tố kẻ ăn chặn (j70 "bắt kẻ tham ô").
- `tgk`: "Giặt đồ", "Nghỉ tay một lát", "Cầu xin quản sự" (j42, giữ nguyên); phi tần: mệnh truyện "tri kỷ cũ ở Tân Giả khố" (j67) đến đây.
- `nth`: "Truy đến cùng Ngự thiện phòng" (j7) làm tại chỗ; chuẩn bị "Dâng canh ở ngự thư phòng" (j2); bài học Nấu nướng (trò `banh`, nền học `mg-banh-bg-hoc` là bếp) mở được ở đây; đường mưu bỏ độc (j83) để lại dấu ở đây.
- `pd`: "Xin xăm ở Phật đường" (j13 `reLot(true)`, hiện bị tắt `if(false)` trong thẻ Thái hậu j2 → đặt ở đây); "Tụng kinh, làm việc thiện" (j2); "Chép kinh, giữ đức" (j14).
- `ttp`: "Học với thầy" (j23 Tài nghệ) và "Khảo bài ở Thượng thư phòng" (j53/j65); các trò học vẫn dùng nền phòng riêng từng môn `mg-<k>-bg-hoc` (KIT 13.1), không đổi. Tên **Thượng thư phòng** lấy theo chữ đã có trong j53/j65 (không dùng "học đường").

## 5. Chỗ ở của hoàng tự (chủ hỏi 14/11; kế hoạch, tranh vẽ sau khi phong cách được duyệt)
Hiện nay (j95) con nào cũng ở cung mẹ; mẹ mất / vào lãnh cung thì con về Thái hậu hoặc Hoàng hậu (j95 `j95fixHouse`, giữ nguyên).
| Mã | Tên (PLNAME) | Nhà trên tranh | box x,y,w,h | anchor |
|---|---|---|---|---|
| `acs` | A ca sở · "nơi các hoàng tử ở" (Hoàng tử sở) | bốn sân nhỏ mái ngói xanh lục phía tây, ngay trên Tẩm cung (mái xanh = nhà hoàng tử) | .30,.235,.115,.215 | .355,.33 |
| `dc` | Đông cung · "nơi Thái tử ở" | điện lớn mái vàng hai tầng ở phía đông, giữa Phật đường và Thượng thư phòng | .795,.425,.075,.185 | .83,.47 |
Quy tắc nơi ở của trẻ (cho sổ j95 — đề nghị, không sửa mã ở đây):
- 0–2 tuổi: ở cung mẹ với nhũ mẫu (như nay).
- Hoàng tử từ 6 tuổi: dọn sang `acs`; buổi sáng học ở `ttp` Thượng thư phòng, trưa/chiều/tối ở `acs` (đôi khi luyện cưỡi bắn — vẫn ghi `acs`).
- Hoàng tử được lập Thái tử: dọn sang `dc` (cả lúc dưới 6 tuổi thì vẫn ở cung mẹ đến 6 tuổi).
- Công chúa: ở cung mẹ đến khi xuất giá; 6 tuổi trở lên buổi sáng học ở `ttp` rồi về.
- 3–5 tuổi: ở cung mẹ. Mẹ mất / lãnh cung: con dưới 6 về Thái hậu (Từ Ninh) hoặc Hoàng hậu như j95 đang làm; hoàng tử từ 6 tuổi vẫn ở `acs`.
- Sổ j95: nơi ở mặc định của trẻ = hàm theo (tuổi, giới, tước Thái tử, mẹ còn/không); mỗi trẻ có đúng 1 chỗ mỗi khắc như mọi người.
Quyền vào: mẹ ruột luôn vào `acs` ban ngày (con mình); phi tần khác Tần trở lên hoặc có lý do; tối đóng (Lẻn vào: Khó, bắt Danh -8). `dc`: mẹ Thái tử, Hoàng hậu, Thái hậu; người khác Xin bái kiến.
Móc lối chơi:
- Hoàng tử dọn ra thì ít gặp tình cờ ở nhà: muốn gặp phải đi (tốn khắc như đi mọi nơi) — việc "Thăm con" ở `acs`/`dc`, hoặc "Cho gọi con về" (1 khắc, con đến cung mẹ một buổi).
- Xa cách làm giảm thân thiết mẹ–con mỗi tháng không thăm (gợi ý −3/tháng), thăm hoặc gọi về thì không giảm; hai chiều: Hoàng hậu / mẹ nuôi thăm nhiều thì thân hơn.
- Con được lập Thái tử dọn vào Đông cung: mẹ được Danh (gợi ý +10 một lần, rồi uy thế giữ khi còn là Thái tử); kẻ thù của mẹ có thêm động cơ nhắm vào Đông cung.
- Tranh: `a-ca-so` (sân nhỏ trước nhà mái xanh, bàn học, giá cung tên nhỏ, chậu cảnh) và `dong-cung` (sân điện lớn trang trọng, không phô trương); cùng cách vẽ ở mục 6.

## 6. Tranh cảnh (phần 2)
- **Cách vẽ (sửa sau khi chủ chê bản thí điểm đầu "nhìn AI quá"):** ảnh gốc mỗi nơi là EDIT gpt-2-6 từ một cảnh đã duyệt của game (kế thừa nét cọ, bảng màu, ánh sáng), 2 cảnh game khác làm tham chiếu phong cách; nét cọ mềm, màu dịu tự nhiên, góc 3/4 lệch, sàn đá mờ (không bóng loáng), chi tiết sinh hoạt nhỏ. Làm 2–3 ảnh gốc, đặt cạnh cảnh game trên một bảng so, chọn ảnh hoà nhất, CHỜ DUYỆT rồi mới làm 15 bản mùa/buổi.
- Sau khi ảnh gốc được duyệt: 15 lượt EDIT thẳng từ ảnh gốc (giữ bố cục/đường sàn) → `img/<tên>-<mùa>-<buổi>.webp` 1280x720 đủ 4 mùa × 4 buổi (sáng/trưa/chiều/tối, như 160 ảnh mùa); `img/<tên>.webp` = bản xuân-sáng làm dự phòng.
- Tên tệp: `day-nha-cung-nhan`, `noi-vu-phu`, `tan-gia-kho`, `ngu-thien-phong`, `phat-duong`, `thuong-thu-phong`.
- Khi nối mã: thêm vào SCIMG (j6) `cnh/nvp/tgk/nth/pd/ttp`, SC trong `dev/art/gen_scene_seasons.py` rồi chạy nó để viết lại SCN_VAR (j94); đặt KIT_FLOOR cho tên mới (sàn mở từ ~55% chiều cao trở xuống).
- Phật đường phải khác cảnh Từ Ninh cung (tranh Từ Ninh đã có tượng Phật bàn thờ trong điện): Phật đường vẽ ngoài sân trước điện lễ, lư hương lớn, ao sen.
- Tân Giả khố: sân giặt sạch sẽ, chậu gỗ, sào phơi, giếng; khắc khổ nhưng không nghèo nàn bẩn thỉu.
- Tín dụng: ~18 lượt × 40 = ~720 mỗi nơi; 8 nơi (6 + A ca sở + Đông cung) ≈ 5.800, dự trù vẽ lại 20% → **~7.000 tín dụng**.
- Tiến độ: `dev/art/PROGRESS_places.md`.
