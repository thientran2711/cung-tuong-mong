# LỐI RIÊNG — các tuyến đời khác ngoài "leo lên Thái hậu" (review/routes, dev/build/jroute.js)

Lệnh chủ (15/11): chán mãi một đường lên Thái hậu; muốn trong một kiếp có nhánh khác: không muốn sống trong cung, không con nên lén
tư thông để có con, tìm đường trốn khỏi cung, theo một nam nhân khác (thị vệ, vương gia, thái y, người thương ở quê…).

## Đã có (grep trước — MỞ RỘNG, không làm lại)
- j22: `S.men` (thị vệ, thái y, vương gia, nhạc sư, sứ thần, họa sư; `m.tinh` tình ý, `m.trysts`, `letters`), `talkOpts` (liếc mắt, trao khăn,
  hẹn riêng → `tryst()`, có thai `S.trueFather`, lệch sổ Kính sự phòng `S.pregMismatch`), `affairExposed`, `watcher()`, `lộRisk(k)`,
  phi tần NPC tư thông `v.affair` / `v.trueFather` (cùng luật).
- jmen (review/men): nam nhân theo buổi `S.menW` + lý do `S.menWhy`, vùng cấm, bắt gặp ở cấm địa (báo / giấu / nghe lén / làm ngơ), hai chiều.
- j96 Thanh mai (`S.tm96.mid` = một người trong `S.men`), jkc tiểu thư ngoài cung, j67 Mệnh truyện (`panel67`, `rows67`), j97 `RARE97`.
- j32 `over(h,t,fate,alive)` kết cục còn sống (xuất cung, xuất gia, trốn khỏi cung…), Sổ luân hồi `pastHTML`; j52 Phúc duyên `PD_END`;
  j14 lãnh cung `coldActs` (có Xuất gia trong lãnh cung); j8 `deathSentence`, `cold`, `punish`, `evA`; `birthP` (con); jdiff `diffOf`;
  jemo (review/emotion, chưa gộp ở đây): `emoGet/emoSet` — chỉ móc khi có.

## Bốn lối (mỗi lối là một chuỗi bước = thẻ việc kit ở Hành sự, nhóm «Lối riêng»; đủ Cần / Tốn / Được / Mất / Kèm + bậc may rủi)
Mở nhóm khi có CỚ: chán cung (`rtWeary`: ≥12 tháng không con, Sủng < 25 sau 6 tháng, từng vào lãnh cung, lòng buồn/đau khổ/sợ của jemo),
hoặc đã quen một nam nhân (tình ý ≥ 20 / Thanh mai). Mệnh truyện có mục «Lối riêng» ghi các bước ✓/✗ của từng lối đang đi.

1. **Tư tình** (`tt`): chọn một nam nhân THẬT trong `S.men` → Trao tín vật → Hẹn gặp lén (chỉ khi hắn ở chỗ hẹn được buổi này: giả sơn
   Ngự hoa viên buổi tối, Thái y viện / truyền thái y khi ốm hay có thai, họa sư/nhạc sư có lệnh vào cung ngươi; cần kẻ hầu canh cửa)
   → Đêm riêng (fade-to-black, dùng `tryst`: có thể có thai, cha thật ghi vào đứa con `k.tf`) → Hắn hứa đưa ngươi đi (mở lối 2/3).
   Bí mật = **Lời ra tiếng vào** `S.rt.heat` 0–100: mỗi lần gặp tăng theo chỗ, người chứng kiến (phi tần đang ở đó), lòng kẻ hầu; mỗi tháng nguội
   bớt. Heat cao → phi tần bắt được: Uy hiếp (đòi bạc / bắt làm việc) hoặc tố → `affairExposed` (chết / lãnh cung). Con lớn lên (3–10 tuổi)
   có thể «càng lớn càng giống …» → lời đồn, Hoàng thượng nghi: nhỏ máu nghiệm thân / nhờ thái y làm chứng / đổ cho bên ngoại.
   **Trích huyết nghiệm thân** (owner 15/11): khi có lời đồn / chứng cứ về cha đứa trẻ, Hoàng thượng (nghi), Thái hậu, Hoàng hậu hay một
   phi tần tâu xin nghiệm máu; định ngày tuần sau. Kết quả theo CHA THẬT (`k.tf`) nhưng bát nước động tay được: phèn (máu nào cũng hòa),
   dầu (không hòa — kẻ tố dùng để vu oan), đổi bát sạch, mua chuộc thái y. Chuẩn bị (thẻ kit): Mua chuộc thái y · Đổi bát nước · Bỏ phèn ·
   Dò bát của kẻ tố. Buổi nghiệm: Bằng lòng nghiệm · Tố ngược kẻ gian lận (khi dò ra dầu) · Nhận tội; máu không hòa → Xin thái y nghiệm lại
   bằng bát mới · Nhận tội · Kêu oan. Kết: trong sạch (kẻ tố bị trị tội) · bại lộ (mẹ ban chết/lãnh cung, người ấy xử trảm, đứa trẻ bị tước
   danh phận đưa ra khỏi cung) · bị vu oan. NPC cùng luật: mẹ NPC tự bỏ phèn, kẻ thù bỏ dầu; ngươi có chứng cứ thì tâu xin nghiệm con
   phi tần khác (ngay thẳng hay nhỏ dầu vu oan — bị bắt thì chính ngươi bị trị tội). Không máu me: chỉ hai giọt máu trong bát nước.
2. **Trốn cung** (`tc`): gom đồng lõa và giấy tờ (mỗi bước một thẻ có cơ may): Mua chuộc thị vệ gác cổng · Dặn cung nữ tâm phúc ·
   Gửi thư về nhà (người nhà đón, dời nhà đi) · Dò đường cổng Thần Vũ · Làm giả yêu bài · May y phục cung nữ · Xin thuốc giả chết (thái y).
   Rồi chọn CÁCH: Lẫn vào đoàn cung nữ xuất cung (tháng chạp) · Giả chết (cần thái y + nhà đón) · Nhân lúc hỏa hoạn · Theo người ấy ra cổng
   (tình ý ≥ 80, thị vệ / vương gia). Cơ may cuối = gốc theo cách + mỗi bước chuẩn bị − Lời ra tiếng vào − độ khó. Thành → kết
   «Trốn khỏi cung» (một mình / cùng người ấy; nhà không dời đi thì bị liên lụy). Hỏng → bị bắt: lãnh cung hay ban chết, nhà bị liên lụy.
3. **Rời cung hợp lệ** (`hl`): Dâng biểu xin xuất gia (Đức, Thái hậu, không con nhỏ) · Xin ban hôn cho Vương gia (Vương gia có tình ý,
   phẩm thấp, ít thị tẩm, Thái hậu nói giúp) · Xin về quê phụng dưỡng cha mẹ (Đáp ứng/Thường tại, 2 năm, Sủng thấp) ·
   Xin phế làm thứ dân (trong lãnh cung hay bị buộc tội). Hỏng → Sủng/Danh giảm, bị nghi.
4. **Ẩn dật trong cung** (`ad`): Xin rút thẻ bài (không thị tẩm), Chép kinh, Che chở người yếu; phi tần bớt ghen/nhắm vào ngươi.
   Giữ đủ 3 năm, Đức ≥ 60, không hại ai → kết «Một đời an nhiên» (ghi Sổ luân hồi, có thể chọn sống tiếp).

## Luật chung
- Đức: việc trái lễ (tư tình, trốn) có Đức ≥ 60 thì khó hơn (cơ may −(Đức−50)/4) và tốn Đức; Kèm ghi «lương tâm cắn rứt».
- Cảm xúc (có jemo): gặp người ấy → vui; bị uy hiếp → sợ; chán cung là một cớ mở lối.
- Độ khó: Lời ra tiếng vào ×0.8 / ×1 / ×1.25, cơ may cuối +5 / 0 / −6.
- Hai chiều: phi tần NPC cũng tư thông (j22), trốn cung, xin xuất gia (theo Sủng, nết, lãnh cung); ngươi gặp nàng đang chuẩn bị trốn
  (cùng chỗ, buổi tối) → Báo / Giúp (đi cùng: lối 2 thêm một bước) / Uy hiếp / Làm ngơ; tin trong cung khi nàng trốn thành hay bị bắt.
- Kết cục: `over(..., alive)`; Sổ luân hồi «Lối riêng: x/12 kết đã gặp» (localStorage `ctm-routes`), Phúc duyên kết cục qua `PD_END`.
- Tranh: dùng tranh sự kiện có sẵn (ev-tu-tinh, ev-mat-uoc, ev-hoa-hoan, ev-hinh-phat, ev-lanh-cung, ev-thu-nha, act-xuat-gia…). Không vẽ mới.
- Sổ cũ: `S.rt` tạo khi cần; không đổi trường cũ.

## Đo (bot tìm lối, dev/measure/routes.js)
Đích: trốn cung thành 10–25 % số lần thử của người chơi cẩn thận; tư tình bị lộ phần lớn khi ham gặp; kết hợp lệ hiếm (5–20 % số lần xin).

### Kết quả đo 15/11 (sau chỉnh; bot tìm lối = inpage6 + dev/measure/routes.js, 100000 vòng mỗi lối)
- Bot cân bằng không còn thấy thẻ «Lối riêng» (cổng `window.__rtGo` chỉ bật trong lúc bot tìm lối chọn thẻ).
- **Trốn cung** (gốc theo cách 12/16/10/22/8, trần 45, hỏa hoạn 1,2 %/tháng là chuyện thật cả cung):
  người cẩn thận 15 kiếp, 16 lần trốn → 3 thoát (≈19 %/lần), 13 bị bắt; người liều (đi ngay khi thẻ mở) 19 kiếp, 33 lần → 3 thoát (≈9 %).
- **Rời cung hợp lệ** (xuất gia: cần 2 năm trong cung + Thái hậu 40, cơ may −12 + Thái hậu/3 + (Đức−50)/3 − Sủng/3, bị bác đợi một năm):
  19 kiếp, xuất gia 65 lần xin → 4 được chuẩn (≈6 %); phế làm thứ dân 7 (đều từ lãnh cung); ban hôn 1 lần xin, bị bác.
- **Tư tình** (bot ham gặp): 13 kiếp, 28 lần gặp lén, 14 lần bị thấy, 16 lần bị phi tần bắt được, 9 lần bị tố → 7 kiếp bại lộ (54 %).
- **Ẩn dật**: xem PROGRESS_routes (bot ẩn dật không hại ai).
- Mỗi kết cục đi tới được bằng thẻ thật: `node dev/measure/routes_reach.js` → 15/15 (tc_cung, tc_dan, tc_lien, tc_bat, hl_tu, hl_hon,
  hl_que, hl_phe, ad_an, tt_hoa, ng_vach, ng_oan, tt_lo, ng_vu, tt_kin).
- Cân bằng chung (runb sens, HHSTOP, xoay 9 thân phận, n=28): HH 36 %, chết sớm 21 % — trong khung (HH 35–45 %, chết sớm ≤ 45 %).
