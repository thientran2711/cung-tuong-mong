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

## 15/11 — mọi kẻ lạc đều có NGUYÊN NHÂN THẬT (lệnh chủ: không rải ngẫu nhiên)
Không còn kẻ lạc "vô cớ" (đã bỏ: uống rượu, lạc đường, hái trộm hoa, xem đèn). Một nam nhân chỉ vào hậu cung không có lệnh khi trạng thái thế giới cho hắn một lý do;
may rủi chỉ quyết định hắn có làm việc ấy TRONG BUỔI NÀY không (và người khác có để ý không):
1. **Tư tình** — cặp có thật của j22 (`v.affair`): hẹn nhau ban đêm (30 phần mỗi buổi tối) ở vườn, lãnh cung hay cung nàng.
2. **Thư lén** — một phi tần có cớ cần liên lạc ra ngoài: đang cấm túc, đang toan mưu (`v.plan`), đang giấu thai, thất sủng mà ghen nặng (Sủng < 25, ghen ≥ 50);
   nàng mua chuộc một thị vệ có nết dễ mua (tham vọng / phong lưu) hay lòng trung dưới 50; hắn đến cung nàng nhận thư (2,5 phần mỗi buổi; ×lễ tết, ×đêm, ×mưa ít).
3. **Nán lại quá giờ lệnh** — thợ Nội vụ phủ / thái y đang có lệnh THẬT trong cung một phi tần, nết phong lưu / đa tình, ở lại trò chuyện riêng với chủ cung (12 phần).
4. **Tìm gặp người để ý** — nam nhân nết phong lưu / đa tình để ý một phi tần (`m.likeV`, chọn một lần theo nhan sắc, đổi khi nàng mất); khi hắn ở trong cung
   (thị vệ trực, vương gia thỉnh an / dự lễ, thợ có lệnh) hắn lẻn đến chỗ nàng đang ở (2,2 phần mỗi buổi; ×lễ tết, ×đêm).
Nghe lén thành công kể đúng nguyên nhân (`menTrue`): ai, vì sao (cấm túc / toan mưu / giấu thai / thất sủng; lệnh gì; để ý ai).
Thẻ bắt gặp: lựa chọn là thẻ việc đầy đủ của kit (Tốn · Được · Mất · Kèm · Ghi chú + thang may rủi), như Hành sự.

## 15/11 (lượt 4) — KẾ HOẠCH, KHÔNG XÚC XẮC (lệnh chủ: "rolls decide… — that's still luck")
Ai vào hậu cung, lúc nào, ở đâu, và ngươi có thấy không: không còn tung xúc xắc. (Chỉ kết quả của VIỆC ngươi làm — Báo, Giấu, Nghe lén, Uy hiếp — còn may rủi như mọi thẻ Hành sự.)
- **Lịch trực, lệnh làm việc theo lịch**: thị vệ trực 2/3 buổi, trạm đổi theo tuần (`menDuty`); thợ Nội vụ phủ có lệnh mỗi hai tuần, theo lượt các cung từ phẩm cao xuống (`menOrder`);
  thái y vào cung phi tần đang ốm/có thai buổi chiều; vương gia thỉnh an Thái hậu mỗi 4 tuần, dự lễ tết; sứ thần, quan vào chầu theo lượt.
- **Kế hoạch lưu trong thế giới** (`S.menPlans`, lập đầu mỗi tuần cho tuần sau: ai, tuần, buổi, khắc, nơi, đường đến, độ kín):
  1. Đôi tư tình (j22): mỗi 2–3 tuần theo nết hắn, đúng đêm lịch trực của hắn để trống; nơi theo nết nàng (đa nghi / hắn cẩn trọng → lãnh cung; kiêu ngạo → cung nàng; khác → vườn).
  2. Thư lén: phi tần có cớ (cấm túc / toan mưu / giấu thai / thất sủng ghen nặng), mỗi mùa một lần khi cớ còn; thị vệ dễ mua nhất (lòng trung thấp nhất) theo ca trực của hắn; tối đa một lá mỗi tuần.
  3. Nán lại: thợ phong lưu/đa tình có lệnh thật ở cung một phi tần thất sủng (Sủng < 40) hay người hắn để ý; ở lại tới khắc cuối buổi lệnh.
  4. Kẻ để ý (`m.likeV` = phi tần đẹp nhất hắn thấy, theo nhan sắc, không xúc xắc): mỗi 9–12 tuần, buổi đầu tiên hắn ở trong cung (trực, thỉnh an, có lệnh) mà nàng đang đứng ở một nơi trong hậu cung.
- **Ngươi thấy khi và chỉ khi ở đó**: có mặt ở nơi ấy trong khắc của kế hoạch (h−1 … h+1), hoặc đi ngang nơi kề bên lúc hắn đang đi vào (`menWatch`, gọi khi đến nơi, sau mỗi việc tốn khắc, và cuối buổi).
- **Hiểu ra hay không**: Tai mắt ×8 + Tâm cơ/3 so với độ kín (tư tình 30 + Tâm cơ nàng/3, thư 20 + …, để ý 15, nán lại 10). Không đủ → chỉ thoáng thấy hắn và một bóng áo phi tần lánh đi (Núp nghe lén mới lộ ra ai).
- **Tai mắt báo trước**: khi lập kế hoạch, Tai mắt đủ sâu (≥ độ kín + 40) → "Tai mắt báo: nghe nói tuần tới, buổi tối, có nam nhân sẽ lẻn vào …" (thật, có khi nói cả là ai) để ngươi tự sắp xếp có mặt.
- **NPC cũng vậy**: phi tần đứng đúng nơi ấy trong buổi ấy và mắt đủ sâu thì thấy; chọn theo nết + oán (Xảo quyệt/Kiêu ngạo/oán > 45 → báo; Tham vọng → giấu lấy chứng cứ; Đa nghi → nghe lén; Hiền/Nhu → làm ngơ hay giấu nếu ghét). Ngươi nói chuyện riêng với nam nhân ở hậu cung mà có phi tần mắt ≥ 20 đứng đó → bị thấy.
- Đo (sens, đi dạo đầu mỗi buổi, 37,9 năm): kẻ lạc 7,1/năm (để ý 3,9 · tư tình 1,35 · thư 1,3 · nán lại 0,6); ngươi gặp 0,95/năm với 32,8 lần đi → 0,029 mỗi lần đi ≈ 3 lần/năm nếu đi mỗi buổi;
  tai mắt báo trước 3,7/năm; NPC thấy 4,3/năm, báo 1,3/năm. 0 crash, 0 lỗi trang, ghi/nạp sạch.
