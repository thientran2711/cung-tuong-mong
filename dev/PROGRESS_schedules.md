# PROGRESS: ai ở đâu (review/schedules, module j95)

Nhánh `review/schedules` từ `origin/review/balance`. Chỉ thêm module mới `dev/build/j95.js` (nối cuối `assemble.py`, sau j84),
không sửa file cũ. Chưa gộp main: chờ thợ cân bằng gộp vào review/balance và đo lại.

## Đã làm

### 1. Sổ vị trí (một bản ghi duy nhất, `S.roster`)
- Mọi người sống trong cung: Hoàng thượng, Thái hậu, người chơi, mọi phi tần (cả phế phi ở lãnh cung), cung nữ thân tín
  và kẻ hầu của mọi cung, tổng quản / thái giám Kính sự phòng / thái giám bán hàng rong / thái y (S.court), nam nhân j22
  (thái y, thị vệ luôn trong cung; người khác chỉ khi vào cung), hoàng tự. Ở MỖI KHẮC (4 khắc × số buổi) mỗi người có đúng một
  mục: nơi (mã j77), việc, đối tượng, lý do (từ trạng thái thật).
- Lập kế hoạch đầu buổi; bất ngờ có thể đổi giữa buổi (từ khắc 1–3) và được ghi lại; người chơi được ghi theo nơi thật mỗi khắc.
- Mọi chỗ đọc từ sổ: `S.where` và `S.menW` là "góc nhìn" của khắc hiện tại (dựng lại mỗi lần đổi khắc, đi lại, qua buổi);
  `whereOf` đọc thẳng sổ; `countAt` đếm sổ (bản đồ, bóng hữu duyên, thẻ nơi chốn); sân khấu được đối chiếu với sổ (người đi /
  người đến giữa buổi, Thái hậu, Hoàng thượng); `npcEncounters` chạy trên sổ; tai mắt dò nơi ở đọc `whereOf`; `srvWhere` (j42)
  đi qua `whereOf`; người tìm đến (j24) được ghi vào sổ (nàng ở cung ngươi khắc đó).
- Các quyết định của các wrapper cũ (lời mời j21, ghé thăm, j41 chặn quyền vào, j22 nam nhân) được nhận vào sổ, không ai tự gieo
  vị trí riêng nữa.
- Nhật ký: `S.rlog` giữ tuần hiện tại + 4 tuần trước (mã nơi / việc / đối tượng / lý do theo khắc, từ điển + 8 ký tự mỗi khắc,
  gộp khi 4 khắc như nhau; khoảng 40–80 KB cho 5 tuần). Có cả số bản đồ đã hiện mỗi khắc và các hành động qua cổng.
- Save cũ: chưa có sổ thì dựng mới ở lần vẽ đầu; NPC chưa có thói quen thì sinh mới.

### 2. Thói quen + ý định + bất ngờ
- THÓI QUEN (ẩn) mỗi phi tần: 2–4 nơi ưa thích theo 4 buổi chuẩn Sáng/Trưa/Chiều/Tối, sinh từ tài nghệ (đàn, họa, thơ, múa,
  y), tính (Hiền lành/Nhu mì → lễ Phật ở Từ Ninh buổi sáng, Kiêu ngạo → dạo vườn, Tham vọng → Kính sự phòng, Đa nghi → ở cung...),
  sắc (dạo vườn chiều tối), phe (sang cung chủ phe), bạn thân. Trôi theo tháng (15%), đổi khi lên/xuống phẩm; có thai/yếu → Thái y
  viện; thất sủng → ít ra ngoài; mùa (đông ít ra vườn), mưa; hứng ra ngoài của từng tuần.
- Ý ĐỊNH tuần (mạnh hơn thói quen, 70% ở buổi định): tranh sủng (ra vườn lúc Hoàng thượng hay dạo), thăm bạn, tránh kẻ thù,
  thăm người chơi (thân), gây sự với người chơi (thù, qua cổng động cơ), rình chỗ người chơi hay đến (khi đã học được thói quen
  của nàng). Lệ thỉnh an Hoàng hậu buổi sáng là bổn phận. Buổi chiều tối có sang chơi cung người không ghét.
- BẤT NGỜ 22%: Hoàng hậu / Thái hậu cho gọi, mưa quay về, đổi ý ra vườn, khó ở ghé Thái y viện; có thể giữa buổi.
- HOÀNG THƯỢNG: sáng thượng triều (Cần Chính), trưa ngự thiện/nghỉ, chiều phê tấu hoặc dạo vườn, tối ngự tẩm; cộng tính (Chăm chính
  sự, Đa tình), tâm trạng, tuần triều chính bận (20%), một thói quen riêng trôi dần, người đang sủng hay ra vườn; bất ngờ 22%.
- Thái hậu: sáng nhận thỉnh an, đôi khi ra vườn. Kẻ hầu: hầu chủ, cung nữ thân tín theo chủ ra ngoài, thỉnh thoảng đi việc vặt.

### 3. Thông tin thật, hai chiều
- Người chơi học thói quen: thấy ai ở đâu (cùng chỗ) hoặc tai mắt dò nơi ở → ghi; tai mắt có thêm tin "nàng hay ... ở ... buổi ..."
  (thói quen thật). `habitsKnown(p)` trả dữ liệu cho thẻ người (đã thấy ≥2 lần hoặc nghe kể; đánh dấu "đã lâu, có thể đã đổi").
- NPC học thói quen người chơi: nơi nàng hay đến theo buổi (phai 25% mỗi tuần); kẻ thù (hostility ≥45) dò ra (theo Mắt, tai mắt cài
  trong cung nàng) → đến rình đúng chỗ, gặp thì 35% ra tay (qua cổng động cơ). Tai mắt của nàng có thể báo "X đã dò ra ngươi hay
  đến ... cho người rình" (tin thật). `j95habitsMine()` cho giao diện.

### 4. Hẹn kín, mưu, bắt gặp (hai chiều)
- Người đang tư thông (j22 `v.affair`): mỗi tuần 1–2 lần hẹn, chủ yếu buổi tối, 2 khắc, ở chỗ khuất (sau hòn non bộ Ngự hoa viên,
  tường đổ gần Trường Môn viện, dãy kho sau Kính sự phòng, phòng thuốc sau Thái y viện nếu là thái y); hay dùng lại một chỗ.
  Cả nàng và nam nhân được đặt vào sổ (và S.menW) đúng chỗ, bất chấp quyền vào (họ lén).
- Người đang chuẩn bị mưu (j70, bước "prep"): một lần trong tuần đến nơi lộ trình mưu ghi (Thái y viện mua thuốc...) hoặc chỗ khuất
  gặp thái giám của mình.
- Bản đồ: chỗ đang có hẹn kín ghi thêm "Có hai bóng người đứng sát nhau trong chỗ khuất" vào mô tả nơi (không lộ ai); API
  `j95mapSigns()`.
- Người chơi có mặt (đi tới hoặc Lẻn vào) đúng khắc: gieo BẮT GẶP: thấy rõ mặt / chỉ nhận ra một người (nàng, hoặc nam nhân mà không
  rõ nàng là ai) / họ kịp tản ra để lại dấu vết (khăn tay, ngọc bội...; sau này gặp đúng chủ nhân thì 35% nhận ra → chứng cứ) /
  NGƯỢC LẠI họ thấy người chơi (kẻ hiểm có động cơ thì oán, có thể diệt khẩu; người khác sai cung nữ mang bạc sang mua chuộc).
- Sau khi bắt gặp, lựa chọn (chỉ hiện chi phí): Tố giác lên Hoàng hậu / Hoàng thượng (đủ chứng cứ thì nàng bị xét tội, nam nhân bị
  xử trảm; thiếu thì bị coi là vu cáo), Xử tội (nếu là Hoàng hậu), Giữ làm con bài khống chế (chứng cứ j78), Lặng im đổi ân tình,
  Giả như không thấy.
- Hai chiều: khi người chơi hẹn riêng (j22 `tryst`), phi tần đang có mặt cùng chỗ cùng khắc gieo cùng xác suất; quyết định theo
  tình cảm thật (thù + đủ chứng cứ → tố giác; thân → giữ kín đổi ân tình; còn lại giữ chứng cứ). NPC cũng bắt gặp NPC.
- Không bao giờ báo một chuyện tư thông không có thật.

### 5. Cổng động cơ `motiveOK(a, t, kind)` (dùng chung)
- Hành động thù địch cần oán / ghen / ghét / khác phe / tính hiểm độc đủ cao (≥30) và KHÔNG làm khi thiện cảm ≥40, trừ lý do
  được ghi: bị khống chế (kẻ khác nắm chứng cứ của nàng và ghét mục tiêu), lệnh chủ phe, tin đồn hiểu lầm. Hành động thân thiện
  không làm khi vừa ghét vừa oán sâu (trừ cùng phe).
- Đã bọc: `runAct` (mọi hành động NPC: j9/j24/j28 npcAct, j40 mindRun, j70 thực thi, j78), `newPlot70` (mưu j70 mới),
  ý định j95 (thăm / gây sự / rình), j24 người tìm đến (mỉa mai / thăm). Mỗi lần kiểm ghi vào sổ: ai, khắc, việc, đối tượng,
  cho làm hay CHẶN, lý do.
- CHƯA bọc: sự kiện tuần j68 (chọn người bằng `rv6` ngẫu nhiên, không khai báo sự kiện nào là thù địch). Cần thêm cờ
  `hostile` cho từng sự kiện j68 rồi cho `evPickActor` đi qua `motiveOK`; ghi lại ở đây cho người làm j68.

## Kiểm

### Độ khó đoán (dev/test/roster_sim.js, 50 tuần × 4 đời mỗi cấu hình, đoán theo đúng buổi tuần trước)
| | xúc xắc cũ | j95 |
|---|---|---|
| phi tần, 3 buổi | 69% | **45%** (theo khắc 43%) |
| phi tần, 4 buổi | 75% | **46%** (theo khắc 46%) |
| Hoàng thượng, 3 buổi | 70% | 60% |
| Hoàng thượng, 4 buổi | 74% | 54% |
Ghi chú: xúc xắc cũ KHÔNG phải 15% như ước đoán ban đầu, mà rất dễ đoán (65–75%) vì "ở cung mình 35–80%" và buổi tối ai cũng ở
cung. j95 nằm giữa mục tiêu 35–55%. Hoàng thượng hơi dễ đoán buổi sáng (thượng triều là lệ).

### Bất biến mỗi khắc
- Mô phỏng thẳng 50 tuần × 8 đời (3 và 4 buổi): 5600 lần kiểm, 0 trùng, 0 thiếu, 0 lệch số người, 0 lệch bản đồ, 0 lệch whereOf,
  0 người chết còn trong sổ.
- Bot chơi thật: 36 đời (18 khôn, 18 ngẫu nhiên, đủ 9 xuất thân kể cả cung nữ), 17 449 lần kiểm, 0 lỗi ở cả 6 bất biến; chi tiết dev/test/ROSTER_AUDIT.md.
- Màn hình thật (Playwright, Fold 755x1000@2 và iPad 1180x820@2): xem ROSTER_AUDIT.md.

## Nhu cầu giao diện (chủ kit làm; j95 chỉ trả dữ liệu)
1. Thẻ người, mục "Thói quen": `habitsKnown(p)` → dòng "Thường thấy nàng ở X buổi chiều" (+ "đã lâu, có thể đã đổi"), nguồn
   (Chính ngươi thấy / Tai mắt).
2. Bản đồ: dấu "hai bóng đứng sát nhau" cho chỗ có hẹn kín (`j95mapSigns()`); hiện mới chỉ có dòng chữ trong mô tả nơi.
3. Thẻ của chính người chơi: "Nơi ngươi hay đến" + số kẻ đang rình (`j95habitsMine()`), chỉ hiện khi tai mắt đã báo.
4. Bản đồ đếm cả kẻ hầu theo chủ (ví dụ Ngự hoa viên 20 bóng khi đông người); nếu muốn bóng chỉ cho người "đáng kể" thì kit quyết
  định cách hiện (số vẫn lấy từ sổ).
5. Sân khấu chưa vẽ kẻ hầu / nam nhân đi theo (chỉ có trong sổ).
6. Hộp bắt gặp và các lựa chọn dùng hộp thoại sự kiện có sẵn (Q / showModal), chỉ hiện chi phí.

## Cho thợ cân bằng (review/balance)
- Cổng động cơ chặn khoảng 4% hành động thù địch của NPC qua runAct (34/848 trong 36 đời bot; những lần hại khi thiện cảm cao hoặc động cơ yếu), và một phần lượt "người tìm đến" j24; hẹn kín có thêm đường bị bắt gặp (cả người
  chơi lẫn NPC); kẻ thù có thể rình chỗ người chơi hay đến. Có thể đổi tỉ lệ chết / HH: cần đo lại.
- Núm: `J95.OWN` (sức hút ở cung mình theo buổi), `J95.SUR` (bất ngờ %), `J95.IT` (theo ý định %), xác suất trong `j95catchRoll`.
- Tắt để đo so sánh: `window.__j95off=1`.
