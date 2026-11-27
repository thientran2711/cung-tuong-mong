# TIỂU THƯ NGOÀI CUNG — kế hoạch tuyến chơi (bước 1: thiết kế, chờ sếp duyệt)

## Tóm tắt cho sếp (≤15 dòng)
1. Thẻ thân phận có thêm lựa chọn: **"Vào cung ngay"** hay **"Ở nhà chờ tuyển tú"**. Mở ngay cả khi đầu thai, không phải chờ hay mở khóa. Áp cho tt, dtq, muoi, thd, ch, td; nc làm sau.
2. Nàng bắt đầu năm 18 tuổi, tháng 4 năm thứ nhất. Kỳ tuyển tú đến vào mùa xuân năm thứ ba (khoảng 23 tháng sau), lúc ấy nàng 20 tuổi. Thời gian vẫn tính 4 buổi × 4 khắc mỗi tuần.
3. Năm thẻ riêng, theo khuôn chế độ cung nữ: **Khuê phòng · Gia tộc · Giao du · Tài nghệ · Thư từ**, cộng **Dư đồ** riêng (phủ đệ và kinh thành).
4. Người nhà là người thật, có mặt, có quan hệ hai chiều: cha, mẹ hoặc kế mẫu, di nương, tổ mẫu, huynh trưởng, thứ muội cùng đi tuyển tú, tỳ nữ thân cận, các thầy dạy, bà mối, nhà cầu thân, bạn khuê phòng.
5. 34 hành động ghi đủ giá, lợi, rủi và cơ may. 30 biến cố chỉ hiện chi phí, kết quả hiện sau. Có 8 chương Mệnh truyện ngoài cung: mỗi xuất thân một chương, cộng Kế mẫu, Hôn sự, Thanh mai và Tuyển tú.
6. Thanh mai trúc mã (j96) bắt đầu từ đây. Nàng gặp chàng, nhận tín vật, rồi bị ép đi tuyển tú. Các chương j96 trong cung đọc lại những gì đã xảy ra ở nhà.
7. Kỳ tuyển tú qua 3 vòng: Sơ tuyển, Phúc tuyển (thi tài bằng minigame thật) và Điện tuyển. Kết quả quyết định nàng vào cung ở bậc nào, từ Đáp ứng đến Quý nhân, hoặc bị trả thẻ bài.
8. Mang vào cung: tư chất, bậc tài nghệ, Danh, của hồi môn, đồ đạc, một tỳ nữ hồi môn, thế lực nhà cha, tin đã biết về các phi tần. Thứ muội và bạn khuê phòng trúng tuyển thành phi tần đối thủ hoặc đồng minh.
9. Kết cục ngoài cung có 12 loại. Trong đó có gả chồng (nhiều nhánh), xuất gia, ở vậy làm tài nữ, chết vì bệnh hay bị hại, bỏ trốn cùng chàng. Có 6 kết hiếm, mỗi kết một ô "✦ Cơ duyên hiếm".
10. Mục tiêu cân bằng (bot khôn): vào cung khoảng 72%, gả ra ngoài khoảng 18%, chết ở nhà khoảng 5%, kết hiếm khoảng 3%. Tỷ lệ lên Hoàng hậu chênh không quá 5 điểm so với vào cung ngay.
11. Luật kiếp dở dang vẫn áp dụng: kiếp chỉ trọn khi sống đủ 1 năm hoặc đã qua Sơ tuyển. Gả hay chết sớm hơn thì mất Phúc duyên và không được đổi thân phận.
12. Phần chơi chung (làm sau): người ở ngoài vẫn giúp được bạn trong cung qua thư, quà, sớ của cha và lời đồn. Bản kế hoạch chỉ ghi chỗ cắm, chưa làm mạng.
13. Tranh: 16 cảnh, chân dung người nhà và tranh hành động. Cảnh mới vẽ bằng cách sửa từ cảnh đã duyệt, cũng là gpt-2-6, chỉ vẽ sau khi sếp duyệt.

---

## 0. Facts checked in the code (so nothing here re-opens a settled decision)
- Origins (j1 `ORIGINS` + j42 cnv): **tt** Con gái Tể tướng (r2), **dtq** Đại tướng quân (r1), **muoi** nhà buôn muối (r0), **cn** = *Cung nữ được sủng hạnh* (already in the palace, NOT "con quan"), **nc** Công chúa Nam Chiếu (r3), **td** tội thần (r0), **ch** = *Cháu gái Thái hậu* (NOT thương hộ), **thd** thầy đồ nghèo (r0), **cnv** servant start. Weights j69 (approved) are unchanged: the outside route is a *mode* chosen on the identity card, not a new origin, so OW69 stays.
- Eligible for the outside route: tt, dtq, muoi, thd, ch, td (with its own variant, §6). Not eligible: cn and cnv, since both start inside the palace. **nc** comes in phase 2: she lives in the Nam Chiếu court, has her own map and enters through a hòa thân envoy instead of tuyển tú.
- Calendar: the game starts at `S.year 1, month 3`, and `tuyenTu()` (j27) runs at month 2 when `year%3===0`. So an outside start at year 1 month 3 reaches the first tuyển tú at year 3 spring, about 23 months or 69 weeks later. She is 18 at the start and 20 on entry.
- **Bug found (owner rule 18+):** `tuyenTu()` sets new girls to `v.age=15+R(4)`. It must be `18+R(3)` everywhere. This gets fixed in the same build.
- Reused systems: j55 triều đình (5 clans, each with a head `pow`, fathers of tt/dtq, and `Sớ xin tuyển tú`). j54 hôn sự (betrothal kinds nha/tinh/hoa, dowry and backing). j96 Thanh mai (TM96V per origin: role, token, "force" scene). j67 ARC67 arcs per origin. j97 rare endings registry (`RARE97.add/meet`). jkiep trọn kiếp. j82/j91 minigames (15 subjects). j42 template (`isSrv`, `SRVTABS`, own tabs/turn/map hooks). j61 "who knows whom". j95 roster/habits.

## 1. Entry into the mode
- Identity card (review/identity-card, approved layout) gains a pinned two-button choice, built from the kit option: **Vào cung ngay** (current game) / **Ở nhà chờ tuyển tú** (this route). It also appears on the rebirth card, open from the first life with no unlock. The chip reads "Khoảng hai năm ở nhà, rồi tuyển tú".
- State lives in `S.kc` (khuê các). While `S.kc && !S.kc.inPal`, `isKc()` is true. As in j42: `consorts()` skips her, the palace world simulates in the background (rivals, ranks, births, deaths, j55 court), and her turn runs `kcEndTurn/kcWeek/kcMonth`.
- Co-op rebirth (later) uses the same entry at whatever moment the friend is in. Tuyển tú then falls 0–36 months away. If it is under 6 months away she gets the shortened opening (§9). If it is over 24 months away, the father's petition (Sớ tiến cử, act G7) becomes the faster road.

## 2. Tabs (kit tabs, same component as SRVTABS)
`KCTABS = {act:"Khuê phòng", fam:"Gia tộc", soc:"Giao du", art:"Tài nghệ", mail:"Thư từ", go:"Dư đồ", log:null}`. The log moves into ☰ so Fold shows 6 tabs. Every long list is split into category tabs inside the panel, per the 19:00Z rule.
- **Khuê phòng**: her own card (big portrait, Tư chất, Sức), the wardrobe's two slots (no huadian: she is not a consort), Tư trang, rest, self-practice, Chải chuốt, crafted works, secret drawer (tín vật, letters).
- **Gia tộc**: person cards for every family member, using the approved card layout: relation pairs *Người với nàng / Nàng với người* plus *Oán*. The tab also shows family stats: **Gia thanh** (house honour), **Thế lực** (= father's j55 clan `pow`) and **Gia tư** (house wealth).
- **Giao du**: outings, friends, suitors, social events, the matchmaker, and the meter **Áp lực hôn sự**.
- **Tài nghệ**: teachers and lessons (the same `openMG` minigames, set in the home study-room background), works, and teacher favour.
- **Thư từ**: letters with the palace (relatives, the clan's consort, bribed eunuch), with him (TM96), and with friends. Also holds the **Tin trong cung** panel, i.e. what she knows about each consort, read from the real palace state (true info only).
- **Dư đồ**: the house plus city map (§7). Places she cannot reach are greyed with the reason (e.g. "khuê nữ không ra phố một mình buổi tối").

## 3. Stats of the route
- She keeps Sắc, Tài, Tâm cơ, Đức, Sức, Danh, Bạc (tiền riêng) and the art xp from j54 H54A (cam/ky/thi/hoa/vu, plus the other minigame subjects).
- New fields, all with kit bars:
  - **Gia thanh** 0–100: honour of the house. Scandal lowers it and good matches raise it. The suitor pool and the Sơ tuyển check read it.
  - **Áp lực hôn sự** 0–100: rises each month after age 18, faster if the house needs money or allies. At 60 the family proposes a match. At 85 they force a betrothal (event E14).
  - **Lời đồn** 0–100: hidden risk from secret meetings and gossip. She only sees it after someone remarks on it, the same convention as the wardrobe. At 70 the scandal event fires.
  - **Hồi môn**: dowry promised by father and mother. It depends on Gia tư and their favour, and goes into Bạc and Tư trang on entry or marriage.
- Each family NPC has `af` (to her) and her `af` to them, plus Oán and hidden traits. Rules are two-way: whatever she can do to a sibling, the sibling can do to her, at the same price and odds.

## 4. Acts (normal act cards: full price, gain, loss and odds word; disabled ones say why)
khắc = time used; Sức/bạc = cost. Odds words are from the ladder. The internal base p is shown for devs only and is modified by stats and relations.

| # | Act (tab) | Where | khắc | Sức | bạc | Gain | Risk ("kèm") | Odds (base) |
|---|---|---|---|---|---|---|---|---|
| K1 | Nghỉ ngơi (Khuê phòng) | khuê phòng | 2 | – | – | Sức +25 | – | sure |
| K2 | Tự luyện một môn | khuê phòng | 2 | 10 | – | xp môn +4–10 (minigame) | – | sure |
| K3 | Làm tác phẩm (thêu, họa, thơ) | khuê phòng | 3 | 15 | 2 | item 4 grades (j83) | crude piece | minigame |
| K4 | Chải chuốt trước khi ra ngoài | khuê phòng | 1 | 5 | – | Sắc buff for the outing | "quá diễm lệ": Lời đồn +3 | minigame |
| K5 | Đọc sách, chép kinh | khuê phòng | 2 | 5 | – | Tài +1 / Đức +1 | – | sure |
| K6 | Viết nhật ký giấu kín | khuê phòng | 1 | – | – | Tâm cơ +1, calm | found: Lời đồn +10 | Chắc |
| F1 | Thỉnh an tổ mẫu / cha mẹ | chính sảnh | 1 | 5 | – | af +3–6, Gia thanh +1 | – | sure |
| F2 | Hầu cha ở thư phòng (bàn việc triều) | thư phòng | 2 | 10 | – | cha af +5, Tâm cơ +1, may learn court news | cha phật ý: af −6 | Khá chắc |
| F3 | Khuyên cha (nhận / tránh một phe) | thư phòng | 1 | 10 | – | changes the j55 clan move (§8) | cha giận: af −10 | Năm ăn năm thua |
| F4 | Làm vừa lòng mẫu thân/kế mẫu (dâng quà, hầu bệnh) | viện mẫu thân | 2 | 10 | 5–20 | af +6–10, Hồi môn +5 | – | Chắc |
| F5 | Dò la viện di nương | hoa viên / hành lang | 2 | 10 | 5 | learns her scheme (proof) | bị bắt gặp: af −8, Lời đồn +5 | Khó |
| F6 | Tố giác kẻ hại mình trước tổ mẫu (cần chứng cứ) | chính sảnh | 2 | 15 | – | foe af→punished, Gia thanh +2 | no proof: Đức −3, foe Oán +15 | Khá chắc / Liều w/o proof |
| F7 | Hại nhỏ thứ muội (đổi phấn, giấu thiệp hội thơ) | – | 2 | 10 | 5 | her Sắc/Danh −, your rival weaker in tuyển tú | lộ: Đức −5, Gia thanh −3, tổ mẫu af −10 | Năm ăn năm thua |
| F8 | Kết thân thứ muội / huynh trưởng | – | 2 | 5 | 0–10 | af +6, possible ally in palace | – | Chắc |
| F9 | Xin tiền riêng / quản sổ chi tiêu | chính sảnh | 2 | 10 | – | Bạc +10–30, Tâm cơ +1 | kế mẫu Oán +5 | Khá chắc |
| F10 | Quản việc nhà (sổ sách, gia nhân) | chính sảnh | 3 | 15 | – | Gia tư +2, Tâm cơ +2, gia nhân Lòng + | sai sót: Gia thanh −2 | Khá chắc |
| S1 | Đi lễ chùa (cầu phúc) | chùa | 3 | 15 | 3 | Đức +2, Danh +1, chance encounter (TM96, ngự giá vi hành) | – | sure |
| S2 | Dạo phố chợ (cùng tỳ nữ) | phố chợ | 3 | 15 | 0–40 | buy items (shop), rumours | Lời đồn +2 alone; theft | Chắc |
| S3 | Nghe chuyện ở trà lâu (giả trang) | trà lâu | 2 | 10 | 5 | palace/court rumours, true intel on consorts | bị nhận ra: Lời đồn +12, Gia thanh −4 | Khó |
| S4 | Đến thư viện / thư phường | thư viện | 2 | 10 | 5 | Tài +2, may meet TM96 (thd/tt) | – | sure |
| S5 | Dự hội thơ / ngắm hoa (event days) | hoa viên nhà khác | 4 | 20 | 5 | Danh +3–8 via minigame, suitors' notice | thua: Danh −2 | minigame |
| S6 | Thăm bạn khuê phòng | phủ bạn | 2 | 10 | 5 | friend af +6, intel, ally for tuyển tú | – | Chắc |
| S7 | Tiếp bà mối / xem mặt | chính sảnh | 2 | 10 | – | learn suitor (true rank, hidden traits via later) | Áp lực hôn sự +5 | sure |
| S8 | Khéo từ chối một mối (giữ thể diện) | chính sảnh | 1 | 10 | – | Áp lực hôn sự −10 | nhà trai giận: Gia thanh −3 | Khá chắc |
| S9 | Giả bệnh tránh xem mặt | khuê phòng | 4 | – | 5 | Áp lực −15, skip this suitor | lộ: cha af −12, Đức −3 | Năm ăn năm thua |
| S10 | Gặp riêng người ấy (TM96) | hoa viên đêm / chùa | 2 | 10 | – | tm96.h +8, m.tinh +6 | Lời đồn +6–15; bắt gặp → E20 | Khó (đêm) / Khá chắc (chùa, có tỳ nữ canh) |
| S11 | Gửi tín vật / thư tình | – | 1 | – | 2 | tình +5, token item | thư lạc: Lời đồn +15 | Khá chắc (tỳ nữ Lòng ≥60) |
| T1 | Học với thầy (cầm sư, nữ phu tử, họa sư, vũ sư, nữ y) | phòng học | 3 | 15 | 4–10/buổi | xp +8–15 by minigame, teacher af + | thầy chê: af − | minigame |
| T2 | Học lễ nghi cung đình với ma ma xuất cung | phòng học | 3 | 15 | 12 | Lễ nghi (Phúc tuyển bonus), palace intel | – | minigame |
| T3 | Mời danh sư (bậc cao) | – | 1 | – | 40–80 | unlock higher teacher tier (×1.5 xp) | refused if Gia thanh <30 | Khá chắc |
| M1 | Viết thư vào cung (người trong họ / phi tần cùng phe) | – | 1 | – | 3 | intel on 1 consort (trait, habits j95, favour) | thư bị chặn: Lời đồn +5 | Chắc / Khó without contact |
| M2 | Mua tin qua thái giám ra cung mua sắm | phố chợ | 2 | 10 | 15–40 | intel + rumours of the court | bị lừa (false belief stays NPC-side; her report true but partial) | Năm ăn năm thua |
| M3 | Gửi quà vào cung (lấy lòng một phi tần) | – | 1 | – | 20–60 | that consort af +, starts known (j61) | quà bị trả: Danh −1 | Khá chắc |
| G7 | Xin cha dâng sớ tiến cử (vào cung sớm, j55) | thư phòng | 2 | 15 | 50 | early entry (out-of-cycle), see §9 | Hoàng thượng gác lại: clan pow −2, cha af −5 | Khó → Khá chắc with pow ≥70 |

Monthly, also run automatically: allowance (tiền tháng 5–25 bạc by Gia tư), hôn sự pressure, family turns and teacher fees.

## 5. Family NPC roster (all 18+; real faces; two-way rules; per-origin variants)
| Role | Who (per origin) | Face source | What they do |
|---|---|---|---|
| Phụ thân | tt Tể tướng · dtq Đại tướng quân · muoi đại thương muối · thd thầy đồ · ch quốc cữu (anh/em Thái hậu) · td quan Thị lang sắp bị vu án | officials/men pool (FIGURES-others), 51+ | career moves monthly (j55 pow); uses her as a pawn; wants a match or the palace |
| Mẫu thân (chính thất) | alive (60%) or died → kế mẫu | new portrait (39–50) | protects her, Hồi môn, warns of di nương |
| Kế mẫu / Di nương (1–2) | traits from TRAITS (Xảo quyệt / Tham vọng / Hiền lành…) | new portraits (28–38, 39–50) | schemes for her own daughter: gossip, tamper outfit, poison in rare cases, push a bad match |
| Tổ mẫu (lão phu nhân) | head of the inner house | new portrait (51+) | judge of family disputes, Gia thanh guardian |
| Huynh trưởng (đích/thứ) | thi cử / quân ngũ / buôn bán by origin | men pool 18–27/28–38 | career events (đỗ đạt, thua bạc, đánh nhau); ally or burden; can carry letters |
| Thứ muội (cùng năm, 18) | di nương's daughter | **consort pool face (c01–c32)** so she has consort art if selected | rival for tuyển tú and suitors; enters palace as rival or ally |
| Tỳ nữ thân cận | Lòng/Chủ tin bond | **maid pool face** | carries letters, keeps watch; becomes her hồi môn maid in the palace |
| Nhũ mẫu | old nurse | mama pool | comfort, secrets, tells childhood history |
| Thầy dạy (5) | cầm sư (nữ), nữ phu tử, họa sư (reuse man họa sư), vũ sư (nữ), ma ma xuất cung (reuse mama) | mixed | lessons; teacher favour opens higher tiers |
| Bà mối | city matchmaker | new portrait (39–50, nicely dressed) | brings suitors |
| Nhà cầu thân (3–5 rolled) | Thế tử hầu phủ, con Thượng thư, Thám hoa trẻ, đại thương, lão quan góa vợ (pressure) | men/officials pool | the marriage endings |
| Bạn khuê phòng (2–3) | daughters of other clans (j55) | **consort pool faces** | friends or rivals; also join tuyển tú |
| Người ấy (TM96) | per TM96V: môn sinh / phó tướng / con nhà tơ lụa / học trò nghèo / biểu ca (ch) / thế giao (td) | as j96 (men/officials) | the love arc, before his rise |
| Liên lạc trong cung | ch: Thái hậu herself · others: consort of the same clan, or a eunuch | existing | letters, intel |

## 6. Events (~30; event choices show only costs; result card shows numbers)
Family: **E1** Kế mẫu tặng phấn lạ · **E2** Thứ muội mượn y phục dự hội · **E3** Di nương có thai, cả phủ đổi chiều · **E4** Tổ mẫu lâm bệnh, ai hầu thuốc · **E5** Huynh trưởng thua bạc, xin nàng tiền riêng · **E6** Cha say rượu kể chuyện triều · **E7** Gia nhân trộm vòng ngọc, đổ cho tỳ nữ · **E8** Từ đường mất bài vị (giá họa) · **E9** Mẫu thân hấp hối trao di vật (if mother ill).
Matchmaking: **E10** Bà mối đến lần đầu · **E11** Nhà hầu phủ dạm hỏi · **E12** Lão quan góa vợ xin cưới làm kế thất · **E13** Thứ muội giành mối hôn sự · **E14** Cha định hôn (Áp lực ≥85): nhận / cãi / trốn · **E15** Nhà trai thử dung mạo.
Love (TM96 pre-palace): **E16** Gặp lại người ấy ở chùa · **E17** Chàng đỗ đạt / lập công · **E18** Chàng bị nhà cha cấm cửa · **E19** Đêm Thượng nguyên dưới đèn hoa · **E20** Bị bắt gặp hẹn hò (Lời đồn burst) · **E21** Chàng rủ nàng bỏ trốn.
Society: **E22** Hội thơ xuân (minigame Thơ/Câu đối) · **E23** Ngắm hoa mẫu đơn ở hầu phủ · **E24** Tết Thượng nguyên (đố đèn) · **E25** Thất tịch (thêu, khéo tay) · **E26** Trùng dương lên núi.
Court/palace: **E27** Thư từ trong cung: một phi tần thất sủng / có thai (true news) · **E28** Cha bị hặc tội (clan move) · **E29** Ngự giá vi hành ghé chùa (rare encounter) · **E30** Dịch bệnh trong kinh thành · **E31** Chiếu tuyển tú ban xuống (6 months before) · **E32** Nội vụ phủ đến xem mặt (Sơ tuyển check-in).

## 7. Map (own hotspots; `KCMAP`): house + city
House: Khuê phòng · Chính sảnh · Thư phòng của cha · Viện mẫu thân · Viện di nương · Hoa viên nhà (hồ sen, giả sơn) · Từ đường · Phòng học. City: Chùa Hộ Quốc · Phố chợ · Trà lâu · Thư viện/thư phường · Phủ thông gia (hầu phủ) · Bến sông/thuyền hoa · Ngoại ô (đình, núi) · Cổng cung Thần Võ môn (tuyển tú days only).
Access rules: city places require a companion (tỳ nữ/huynh/mẫu thân) or the "giả trang" risk; night outings are only possible as a sneak with risk. Who is where comes from one ledger (family habits + intentions, like j95), so the map never contradicts the stage.

## 8. Chapters (Mệnh truyện ngoài cung; j67 arc format; ≥3 endings each + 1 rare via j97)
- **kc_tt "Quân cờ đầu tiên"**: the father trains her as a pawn. Her choices seed palace arc tt_co or tt_mat.
- **kc_dtq "Tin dữ Nhạn Môn"**: the brother is missing at the border. Seeds dtq_huynh/dtq_bien. Rare ending: she rides out in disguise and brings him back (Nữ tướng).
- **kc_muoi "Sổ muối"**: the father wants to buy a title. Seeds muoi_tuoc/muoi_lau.
- **kc_thd "Tài nữ kinh thành"**: the hội thơ fame chase. Seeds thd_tho.
- **kc_ch "Thư của cô tổ"**: Thái hậu tests her against a cousin. Seeds ch_ho.
- **kc_td "Đêm trước tịch biên"**: the father is being framed. (a) She finds proof → the house is saved, she enters as an official's daughter and the td palace arcs become td_ke (hunt the hidden enemy). (b) The house falls → she enters as tội nữ through the **j42 servant start** (stats kept) or under a false name via tuyển tú (exposure risk, td_an). Rare: she unmasks the real culprit before the fall.
- **Common arcs:** **kc_ke "Kế mẫu"** (stepmother war) · **kc_hon "Hôn sự"** (matchmaking chain → marriage endings) · **tm96z "Thuở thanh mai"** (prequel to j96; its end sets `S.tm96.endZ`, which tm96a reads: token kept/returned, promise, how forced) · **kc_tt3 "Tuyển tú"** (finale, §9).
- Plan per life: 1 origin arc + kc_ke or kc_hon + tm96z (by TM96_W) + kc_tt3. That is about 6–8 chapters over 23 months.

## 9. Tuyển tú (finale chapter) and carry-over
- **Sơ tuyển** (month −1): gate check on Sắc, health (Sức), Gia thanh, no scandal (Lời đồn <70). A fail here means "trả về", and the marriage endings follow.
- **Phúc tuyển:** lễ nghi plus one tài nghệ, played as a real minigame (her best subject or one the Emperor favours). Thứ muội and friends compete under the same rule, and the podium screen is used.
- **Điện tuyển:** Hoàng thượng and Thái hậu, scored on Sắc + Tài + Đức + Danh + clan pow + Thái hậu af (ch +40) + rumours. The result is **Giữ thẻ bài / ban hoa** (selected) or **Trả thẻ bài**.
- **Entry rank:** score tiers give Đáp ứng / Thường tại / Quý nhân. The target average equals the direct-entry rank of that origin (tt ≈ Quý nhân, others ≈ Thường tại), ±1 by performance. Quý nhân is capped (no Tần on entry).
- **Early roads:** **G7 Sớ tiến cử** (father's j55 petition, out of cycle), **Thái hậu triệu** (ch only, enters as Thường tại beside Thái hậu), and **E29 ngự giá vi hành** (rare, enters directly as Thường tại).
- **Carry-over on entry** (into normal S, then `S.kc.inPal=1`, and the palace game runs):

| From outside | Into the palace |
|---|---|
| Sắc/Tài/Tâm cơ/Đức/Sức | same values (caps: each at most +15 over its value at the start of the route) |
| art xp | tài nghệ bậc (same j54/j83 scale) |
| Danh khuê các | Danh × 0.6 (max 30) |
| Hồi môn + tiền riêng | Bạc (max 400) + up to 6 items into Tư trang (wardrobe grades kept) |
| tỳ nữ thân cận | joins her staff with high Lòng (true loyalty, hidden traits kept) |
| family af | Phụ thân af → how often "Nhờ cha dâng sớ" works (j55); Mẫu thân af → gifts by letter; enemies stay enemies |
| clan pow / F3 choices | j55 `T.H[c].pow` and clan relations at entry |
| intel letters | j61 `npcKnows`: she starts knowing those consorts (trait, habits j95 partly) |
| thứ muội / friends selected | become rival consorts (faces from consort pool, real relation values) |
| TM96 state | `S.tm96` seeded (h, token, endZ), so tm96a opens from what happened |
| Lời đồn ≥40 | hidden "lời đồn cũ" flag: a rival may dig it up (event in palace) |

- Palace Thư từ stays: a small "Thư nhà" section under Tư trang (kit tabs) lets her keep writing home. This is the same hook co-op uses.

## 10. Endings outside the palace (end card + Sổ luân hồi line + Phúc duyên)
1. **Gả vào hầu phủ (chính thất)** (good) · 2. **Vợ quan thanh liêm** · 3. **Làm thiếp nhà quyền quý** (bad) · 4. **Ép gả cho lão quan / gả xa biên ải** (bad) · 5. **Xuất gia** (calm) · 6. **Ở vậy làm nữ phu tử** (thd/Tài high) · 7. **Chết vì bệnh** (E30, untreated) · 8. **Bị hại chết** (stepmother poison / pushed into the lotus pond, if not countered) · 9. **Tự vẫn trước ép hôn** (warned; never pays off: kiếp dở dang if before the mark, and +0 PD anyway) · 10. **Chết theo nhà** (td fall, if she refuses both roads).
Rare (j97 "✦ Cơ duyên hiếm", hidden conditions + roll 5–15%; each registered with `RARE97.add`):
- R1 **Bỏ trốn cùng người ấy**, they live as commoners far south (tm96.h ≥80, tỳ nữ Lòng ≥70, Lời đồn <50, roll 8%).
- R2 **Thanh mai đỗ Trạng, cưới hỏi đàng hoàng**: she is exempted from tuyển tú through an earlier betrothal (his rise done, father af ≥70, roll 10%).
- R3 **Vương phi**: a thân vương sees her at a hội thơ (Danh ≥60, Sắc ≥80, roll 6%). She can still affect the palace (later co-op).
- R4 **Nữ tướng Nhạn Môn** (dtq: kc_dtq path, Sức ≥90, roll 7%).
- R5 **Hòa thân thay công chúa**, taken as the Emperor's nghĩa nữ (Đức ≥70, Danh ≥50, roll 5%).
- R6 **Nữ thương Giang Nam**: she runs the salt house (muoi: Tâm cơ ≥70, Gia tư doubled, roll 10%).
- Phúc duyên per ending: good +15–25, normal +10, bad +5, rare +35 (once per life). All of it is lost if the life is a kiếp dở dang.

## 11. Anti-reroll and Sổ luân hồi
- **Trọn kiếp** (extends jkiep `kpNow`): alive 12 game months on the route, OR passed Sơ tuyển, OR entered the palace (then the palace marks continue). A marriage or death ending before that counts as **kiếp dở dang**: no PD from the life, −30 PD, and no origin reroll. A warning is shown once before she accepts a match or chooses a deadly option.
- Sổ luân hồi line: "Tiểu thư ngoài cung · <kết cục> · <năm>". Rare endings count in the x/y book. A new title "Khuê các" milestone set: first selection, first Quý nhân on entry, each rare.

## 12. Balance targets (sensible bot / random bot; we decide, measured with inpage bots before shipping)
| Outcome | Sensible | Random |
|---|---|---|
| Enter the palace (any road) | 70–75% | 50–55% |
| Married outside (endings 1–6) | 15–20% | 25–30% |
| Death outside (7–10) | 4–6% | 10–14% |
| Rare endings (all) | 2–4% | ≤1% |
| HH reach after outside route | within ±5 points of the same origin's direct entry | – |
| Outside length (real time at 10–20 s/week) | ~15–25 min | – |
- No death in the first 4 weeks; illness gives two warnings first.
- Difficulty Dễ/Vừa/Khó (review/difficulty) scales the scheme hazard (stepmother, rumours) and the forced-match speed, just as it scales the palace hazard.

## 13. Co-op hook points (do not build networking now)
- `kcSendToPal(kind,payload)` / `palRecvFromKc(...)` with kinds **letter** (true intel, warning), **gift** (item crosses on visiting days: monthly + festivals), **so** (father's petition supporting the friend's promotion or attacking her enemy's clan: j55 `tdPowAdd` / `tdRelAdd`), **rumour** (city gossip raising or lowering a consort's Danh through j55 news), **tuyển tú join** (she enters as the friend's ally; the friend may "xin ban về cung mình" as a side-hall resident).
- Each hook is a normal act with full price and odds on the sender's side. The receiver gets an event or an accept-card (mutual acts need accept, owner 20:10Z). The game freezes when either player is offline; there is no AI stand-in.
- Single-player uses the same hooks with an NPC sender (family letters into the palace), so the code path is tested before co-op.

## 14. Art list (Magnific gpt-2-6 ONLY, folder ba4aecfe…, after owner approval; new scenes = gpt-2-6 EDITS of approved game scenes (inherit palette/texture, painterly, no glossy floors, no dead symmetry); side-by-side with an existing scene before variants; landscape AND portrait composition for full-screen backdrops; every location × 4 seasons × buổi)
- **Scenes (16):** khuê phòng (edit from the player's tẩm cung) · chính sảnh (from the Thọ Khang/hall scene) · thư phòng của cha (from Ngự thư phòng) · viện mẫu thân · viện di nương · hoa viên nhà (from Ngự hoa viên, smaller, a house wall visible) · từ đường (from the Phật đường pilot when approved) · phòng học (from the lesson room minigame bg) · chùa Hộ Quốc · phố chợ · trà lâu · thư viện · phủ thông gia · bến sông/thuyền hoa · ngoại ô · Thần Võ môn/tuyển tú hall. Plus the **kinh thành map** (4 seasons × buổi; same painted map style as the palace map) and the **Tuyển tú** podium/court bg.
- **Family portraits** (full-body + portrait, 3:4 kit frames; each role gets its own rank/role top ornament): mẫu thân ×2, kế mẫu/di nương ×3, tổ mẫu ×2, bà mối ×1, female teachers (cầm sư, vũ sư, nữ phu tử, nữ y) ×4. Fathers: reuse officials/men where they fit; new only for the đại thương muối and the thầy đồ. All 4 age bands where the person can age (route ≈2 years, so one band each plus aged bands for the later palace letters). **Reuse:** thứ muội and friends use consort pool faces; tỳ nữ uses the maid pool; brothers, suitors and TM96 use the men/officials pools (no pink/purple). Nobody looks poor (the thầy đồ house in plain good silk).
- **Player outside outfits:** "khuê các" dress for the 4 player looks, 18–27 band only (thường phục + lễ phục tuyển tú). No huadian, no moles, calm standing poses, hands with props.
- **Act pictures** for the new acts (~30, matching time of day) and **event pictures** (~30), simple frame without tassel; story chapter art follows the Mệnh truyện batch rule (with owner OK).

## 15. Build plan (after approval)
- New modules: `jkc.js` (state, tabs, turn, acts, family, map hooks), `jkcev.js` (events + chapters registered into ARC67/j97), `jkctt.js` (tuyển tú finale, carry-over, `isKc` guards in j55/j95/jkiep), `jkccoop.js` (hook stubs). Appended in assemble.py after j42/j96/j97/jkiep. Old saves are untouched (no `S.kc`).
- UI only from confirmed kit components (tabs, pcard, act-card, option, bars, kitItem, kitGameFrame). Work goes to review/outside → kit reviewer. Tests at 755x1000@2, 1180x820@2 and 1366x1024@2 first, then the rest. Bot: an outside-route policy added to inpage6 (sensible/random) to measure §12.
- Fix in the same build: `tuyenTu()` age 15+R(4) → 18+R(3).
