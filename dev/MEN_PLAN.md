# NAM NHÂN TRONG CUNG — kế hoạch (review/men, dev/build/jmen.js)

Lệnh chủ (14–15/11): đi dạo trong cung có thể gặp NAM NHÂN; có nơi cấm nam nhân; thấy kẻ đứng sai chỗ thì báo thị vệ,
giấu giúp, núp nghe lén… Cùng luật cho phi tần NPC (ngươi cũng có thể là người bị bắt gặp).

## Đã có (grep trước khi làm — MỞ RỘNG, không làm lại)
- j22: `S.men` (Thị vệ, Thái y, Vương gia, Nhạc sư, Sứ thần, Họa sư; tên, nết MTR, tuổi), `S.menW` (chỗ theo buổi, 55% ở nơi hay lui tới),
  lên sân khấu khi đến nơi (`S.visit.people` kind "man"), thẻ hắn (`manCard`), lời qua lại (`talkOpts`: liếc mắt, trao khăn, hẹn riêng → `tryst`,
  `affairExposed`), tư thông của phi tần NPC (`v.affair`, `affairMonth`), sổ Kính sự phòng lệch ngày.
- j39 tranh nam: `MANSUB` (thị vệ → thive, thái y → thaiy …), j59 nam cao hơn 7%, j55 quan (`S.trieu.H`, isMin → tranh official).
- j61 biết người: "Người lạ" → Thấy mặt → Biết tên → Quen biết (`k61Know`, `k61Desc` có "một thị vệ").
- j8 `evA` chứng cứ, `punish`, `deathSentence`; j78 tin tai mắt (`intelAdd`) + hồ sơ chứng cứ (ghi kèm ngữ cảnh khi chọn thẻ), Uy hiếp đòi bạc
  (dùng chứng cứ về phi tần). j41/j77 Lẻn vào (bị thị vệ bắt). j31 lễ tết `festToday()`.
- Thẻ sự kiện: `PEND` + `pid` → luật "chỉ hiện giá" (jk2b 28.6), kitEventStage (`stage:[a,b]` hình toàn thân), kết quả = thẻ kết quả gạch đầu dòng.

## Làm mới (jmen.js, sau jk4, trước j84)
1. **Nam nhân theo buổi** (thay cách rải 55% của j22, chỉ đường phi tần; đường cung nữ giữ j42):
   thị vệ trực cổng Ngự thư phòng / Dưỡng Tâm điện / Kính sự phòng (tối tuần tra); 4 thị vệ có tên (2 dáng tranh thive-1/2 dùng chung, theo lệnh điều phối);
   Thái y ở Thái y viện, vào cung phi tần CHỈ khi có lệnh truyền (nàng có thai / ốm / Sức thấp); Vương gia: lễ tết ở Ngự hoa viên, thỉnh an Thái hậu;
   Nhạc sư, Họa sư = thợ Nội vụ phủ có lệnh làm việc (vườn, cung phi tần); Sứ thần: Ngự thư phòng buổi sáng, yến lễ tết;
   quan (j55): Ngự thư phòng buổi sáng (chầu), Ngự hoa viên khi có yến lễ tết. Mỗi người một lý do (`S.menWhy`). Tranh: chỉ tranh nam có sẵn.
2. **Vùng** (`MEN_ZONE` + `zones` trong img/map-hotspots.json): Hậu cung (vườn, các cung, Từ Ninh, Khôn Ninh, lãnh cung) cấm nam nhân trừ
   Hoàng thượng, thái giám, thái y/thợ có lệnh; Nội đình (Dưỡng Tâm điện, Ngự thư phòng) có thị vệ trực, quan chầu; Nha sở (Thái y viện, Kính sự phòng);
   Ngoại triều (ô xám trên dư đồ, cổng phía nam) cấm nữ quyến.
3. **Bắt gặp**: mỗi buổi có thể có một nam nhân lạc vào hậu cung không có lệnh (một mình, hay với một phi tần: tư tình thật `v.affair`, đưa thư lén);
   ngươi đi đến đúng nơi đó → thẻ sự kiện (chỉ hiện giá): Báo thị vệ · Báo Cung Chính ti · Làm như không thấy · Giấu giúp · Núp nghe lén.
   Nghe lén thành → biết tên, biết lý do thật, chứng cứ (evA → hồ sơ j78) rồi chọn tiếp; hỏng → bị thấy, họ tản đi.
   Giấu giúp → bí mật/ơn (`S.menSec`), thiện cảm; về sau "Uy hiếp hắn" trên thẻ hắn; lộ → bị phạt. Báo → hắn bị phạt, phi tần đi cùng bị phạt
   (tư tình thật: xử như tư thông), Danh / Thái hậu / Sủng; hắn ôm hận → tin đồn trả thù.
4. **Hai chiều**: phi tần NPC cùng chỗ cũng thấy (báo / giấu lấy chứng cứ / nghe lén / làm ngơ theo nết); ngươi nói chuyện riêng với nam nhân
   nơi cấm địa → phi tần có mặt có thể thấy và báo ngươi hay giữ làm chứng cứ.
5. **Cân bằng**: hiếm — đích vài lần một năm cho người chơi, nhiều hơn vào buổi tối, lễ tết, Ngự hoa viên; đo bằng bot `dev/measure/men.js`.
   Sổ cũ: thêm trường khi nạp, không đổi gì cũ.
