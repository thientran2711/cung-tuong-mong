# Nơi chốn mới trên bản đồ (kế hoạch, nhánh review/places)

Chủ: bản đồ thiếu chỗ ở của cung nhân, bếp, nơi học. Quyết định điều phối: thêm 6 nơi (tên cổ trang theo VANPHONG).
Dựa trên danh sách nơi của review/schedules2 (j95 @7517021): mã j77 hiện có `vuon thu dtd tn kn r<id> tyv ksp lc home` + `tgk` (j42).
**Không thêm "Hoán y cục"**: dùng lại `tgk` Tân Giả khố (đã có trong j42/j95, chỉ thiếu ô bản đồ và tranh riêng; hiện mượn tranh lãnh cung `sc:"lc"`).
Không sửa mã sổ j95 ở đây; mục "Móc vào sổ" là đề nghị cho thợ j95.

Ảnh vị trí: `dev/shots/places/map-new-places.jpg` (khung xanh = ô đề nghị, trên map-ha-sang).

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

## 5. Tranh cảnh (phần 2)
- Mỗi nơi: 1 ảnh gốc gpt-2-6 (2 tranh mẫu ngu-hoa-vien + kinh-su-phong làm tham chiếu phong cách) rồi 15 lượt EDIT thẳng từ ảnh gốc (giữ bố cục/đường sàn) → `img/<tên>-<mùa>-<buổi>.webp` 1280x720 đủ 4 mùa × 4 buổi (sáng/trưa/chiều/tối, như 160 ảnh mùa); `img/<tên>.webp` = bản xuân-sáng làm dự phòng.
- Tên tệp: `day-nha-cung-nhan`, `noi-vu-phu`, `tan-gia-kho`, `ngu-thien-phong`, `phat-duong`, `thuong-thu-phong`.
- Khi nối mã: thêm vào SCIMG (j6) `cnh/nvp/tgk/nth/pd/ttp`, SC trong `dev/art/gen_scene_seasons.py` rồi chạy nó để viết lại SCN_VAR (j94); đặt KIT_FLOOR cho tên mới (sàn mở từ ~55% chiều cao trở xuống).
- Phật đường phải khác cảnh Từ Ninh cung (tranh Từ Ninh đã có tượng Phật bàn thờ trong điện): Phật đường vẽ ngoài sân trước điện lễ, lư hương lớn, ao sen.
- Tân Giả khố: sân giặt sạch sẽ, chậu gỗ, sào phơi, giếng; khắc khổ nhưng không nghèo nàn bẩn thỉu.
- Tín dụng: 16–17 lượt × 40 = ~680 mỗi nơi; 6 nơi ≈ 4.100, dự trù vẽ lại 20% → **~5.000 tín dụng**.
- **Đã làm (thí điểm):** Dãy nhà cung nhân 16/16 — xem `dev/art/PROGRESS_places.md`.
