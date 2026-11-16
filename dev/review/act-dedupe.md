# act-dedupe: inventory of acts per tab + WAVE 1 applied (owner-approved split 16/11: Hành sự = VIỆC, Hậu cung = AI, Dư đồ = ĐI ĐÂU)

The sections (a)-(d) below are the BEFORE inventory. The applied homes (AFTER) are in section (e). Code: `dev/build/jact.js`.

Method: `dev/test/act-dedupe-inv.js` (every surface x buổi x 6 game states, 4603 rendered cards) and `dev/test/act-dedupe-deck.js`
(Hành sự deck union over 24 deals x 3 buổi x 5 states + every Tài nghệ sub-tab). Summary: `dev/test/act-dedupe-sum.py`. 0 page errors.
Build for tests: `CTM_IMG_BASE= python3 dev/build/assemble.py`, serve repo root, `node dev/test/act-dedupe-deck.js http://127.0.0.1:PORT/_ad.html out.json 755x1000@1`.

## (a) Hành sự now (consort; the deck = 5 random cards of `pool()` + fixed extras, j2/j83/j87/jrest)
Rest/self: Nghỉ ngơi một lát (+6 Sức) · Nghỉ lấy sức · Nghỉ ngơi dưỡng sức (4 khắc, Bạc -8, Sức +20) · Đọc sách giải khuây · Đọc binh thư, sử sách (Tâm cơ +2) · Dưỡng nhan (Bạc -30, Sắc +3) · Điểm trang · Giả bệnh.
Arts/study: Tự học Thi / Họa: cắm hoa / Nấu nướng / Thêu thùa (j83 wkDeckCard: 2 khắc, Sức -15, tiến bộ +1..2 + a work) · Đánh đàn ở ngự hoa viên · Múa trong yến tiệc · artActs (Phượng cầu hoàng, Kinh hồng vũ, Đánh cờ với Hoàng thượng, Vẽ chân dung tặng Thái hậu) · Thêu khăn bán ra ngoài (servant) · Luyện thêu thùa, chữ nghĩa (servant).
Court/person: Thỉnh an Thái hậu · Thỉnh an Hoàng hậu · Tranh sủng · Chặn ngự giá · Hối lộ Kính sự phòng · Cầu tự ở Phụng Tiên điện · Phát chẩn cho cung nhân · Tụng kinh, làm việc thiện · Cài tai mắt · Trò chuyện với cung nữ · Thưởng cung nữ · Dạy dỗ hoàng tử / Đưa con thỉnh an / Chữa bệnh cho con / An thai (when children / pregnant).
Servant-only (out of scope, S.out): Quét sân, Dâng trà, Lĩnh đồ, Học lễ nghi, Chải chuốt, Việc chủ sai.

## (b) Tài nghệ now (kit sub-tabs)
Tứ đức: Tự rèn (2 khắc, Sức -15, +1) · Theo ma ma giáo tập (Bạc -5, Sức -10, +2..3) · Phát bạc cứu giúp cung nhân nghèo (Bạc -20, Đức +3, Danh +1, monthly).
Cầm kỳ thi họa / Vũ·Y·Nữ công (per art): Tự học (Sức -15, +1..2) · Học với thầy (Bạc -5.., Sức -10, +2..3) · Xin Thái hậu cho học cùng (Sức -10, +1..3, Thái hậu +3, sáng).
Tác phẩm: Tự luyện, làm tác phẩm (bậc 5 only, Sức -10, 2 khắc).

## (c) Dư đồ map now (tap a place = walk there, cost khắc; the place shows who is present and that person's acts)
| place | what you get on arrival |
|---|---|
| home (Tẩm cung) | Tâm sự (Lòng +6) · Nghe ngóng chung · Sai đi dò la (maid acts); children |
| Ngự hoa viên | Hoàng thượng if he is there (Tâng bốc, Nói thật lòng, Phô tài: <art>, Dâng hoa, Xin ân điển, Bàn chuyện triều chính) + any phi tần there (person acts) |
| Cần Chính điện / Dưỡng Hòa điện | same Hoàng thượng acts (Sủng<50 gate on Dưỡng Hòa) |
| Đức Thọ cung | Thái hậu: Thỉnh an, chép kinh · Xin đỡ lời · Kể tội |
| Càn Ninh cung | Hoàng hậu: Thỉnh an · Xin che chở + topic acts |
| Cung phi tần (r2..r6) | that phi tần's person acts (Chào hỏi, Dò la, Vu oan, Hạ độc...) or her chest (Cài đồ / Lục rương) |
| Thái y viện | Bài thuốc dễ thụ thai · Mời làm thái y tâm phúc · Học hỏi y lý (Y +1, Bạc -10) + person acts |
| Kính sự phòng | Hỏi sở thích Hoàng thượng · Xem sổ thị tẩm · Đút lót lật thẻ (Bạc -30) |
| Lãnh cung | Hỏi chuyện cũ · Đưa cơm áo (Bạc -20, Đức +4) |

## (d) Duplicate groups (same or near-same effect in 2+ homes)
| # | group | copies | note on effects |
|---|---|---|---|
| 1 | Study an art | Hành sự "Tự học Thi/Họa/Nấu/Thêu" = Tài nghệ "Tự học" (+ "Tự luyện, làm tác phẩm") | identical (2 khắc, Sức -15, tiến bộ +1..2, a work); Hành sự adds Bạc -6 for Nấu |
| 2 | Perform for the emperor | Hành sự "Đánh đàn ở ngự hoa viên", "Múa trong yến tiệc", artActs vs Dư đồ Vườn/Thư/Dưỡng Hòa "Phô tài: <art>" | Sủng +7..12 vs +6; Phô tài is the place-bound version |
| 3 | Flatter / honest talk to emperor | Hành sự "Dâng canh/Cắm hoa dâng" (already folded into Tài nghệ works) vs Dư đồ "Dâng một cành hoa", "Nói thật lòng", "Tâng bốc" | partly folded in j83 |
| 4 | Court greeting | Hành sự "Thỉnh an Thái hậu/Hoàng hậu" vs Dư đồ Đức Thọ "Thỉnh an, chép kinh", Càn Ninh "Thỉnh an" | same cost (2 khắc, Sức -5), Thái hậu +8 vs +8 |
| 5 | Bribe the card keeper | Hành sự "Hối lộ Kính sự phòng" vs Dư đồ Kính sự phòng "Đút lót lật thẻ" | identical (Bạc -30, lật thẻ dễ hơn một bậc) |
| 6 | Charity | Hành sự "Phát chẩn" (Bạc -40, Danh +7, Đức +3) vs Tài nghệ Đức "Phát bạc cứu giúp" (Bạc -20, Đức +3, Danh +1, monthly) vs Lãnh cung "Đưa cơm áo" (Bạc -20, Đức +4) | near-same, different numbers |
| 7 | Virtue practice | Hành sự "Tụng kinh, làm việc thiện" (Đức +3, Bạc -10) vs Tài nghệ Đức "Tự rèn"/"Theo ma ma" | near-same |
| 8 | Spy | Hành sự "Cài tai mắt" vs home "Sai đi dò la"/"Nghe ngóng chung" vs person "Dò la" vs Cung nhân "Cài người vào cung khác" | four ways to gain Tai mắt/evidence |
| 9 | Talk to the maid | Hành sự "Trò chuyện với cung nữ" (Lòng +3) vs home "Tâm sự" (Lòng +6) | same effect, 2x number |
| 10 | Teach / present children | Hành sự "Dạy dỗ hoàng tử", "Đưa con thỉnh an" vs Hoàng tự "Dạy chữ", "Dẫn đi thỉnh an Hoàng thượng" | same effect (Hoàng thượng thương +8) |
| 11 | Medicine study | Dư đồ Thái y viện "Học hỏi y lý" (Y +1) vs Tài nghệ Y "Học với thầy" | same stat |
| 12 | Person acts | Phi tần tab cards vs the same cards at the person's place: Dò la, Tung tin đồn, Tặng quà, Vu oan, Đẩy con xuống hồ (5 identical names), plus renamed twins (Ngáng chân / Ngáng chân nàng, Hạ độc...) | person-directed; home should be the person card, place only a link |
| 13 | Rest | Nghỉ ngơi một lát / Nghỉ lấy sức / Nghỉ ngơi dưỡng sức / Đọc sách giải khuây | different tiers on purpose, but 3 near names |
| 14 | Sell handwork | Hành sự (servant) "Thêu khăn bán" vs Tài nghệ Tác phẩm (sell a work) | overlap |

## Proposed homes (first draft, superseded by section (e))
1 -> Tài nghệ (Hành sự keeps a "Đi học ›" link). 2, 3 -> Dư đồ (needs presence) except art practice. 4 -> person card (Thái hậu / Hoàng hậu) + Dư đồ place. 5 -> Dư đồ Kính sự phòng. 6, 7 -> Tài nghệ Tứ đức. 8 -> Hành sự (remote). 9 -> Hành sự or home, one copy. 10 -> Hoàng tự. 11 -> Tài nghệ. 12 -> person card only. Cost-khắc/bạc remote acts that do not need presence belong in Hành sự, not Dư đồ.
BAL: no changes made.

## (e) WAVE 1 APPLIED (16/11, owner-approved) — every act and its one home (before → after)
Rule: Hành sự = daily tasks that need no meeting (usable in colour, unusable grey, tap a grey card = the reason in the kit popover).
Person acts = the person pop-up (same `talkOpts` / `ACT` code wherever the person is met). Study = Tài nghệ tab only. Children = Hoàng tự.
A SHARED DOOR = one act object reachable from two places with ONE lock (`AD_DOOR`, `S.adDoor`): doing it in one place greys it in the other
for the same day (buổi for the standing talk). Not a duplicate.

| # | act (before: where) | after: its one home | how |
|---|---|---|---|
| 1 | Tự học / Tự luyện Thi, Họa, Nấu, Thêu (Hành sự) | Tài nghệ (Tự học / Học với thầy / Tác phẩm) | removed from the deck (`AD_OUT`) |
| 1 | Luyện cầm kỳ thi họa (Hành sự) | Tài nghệ | stays removed (j65) |
| 2 | Đánh đàn ở ngự hoa viên (Hành sự) | Dư đồ Ngự hoa viên: "!" happening "Hoàng thượng dạo vườn" → "Đánh đàn chờ ngự giá" (same odds and Sủng) + Phô tài in his pop-up | `PEND.adStroll` |
| 2 | Múa trong yến tiệc, artActs (Phượng cầu hoàng, Kinh hồng vũ, Đánh cờ, Vẽ chân dung) (Hành sự) | Hành sự (banquet / remote; no meeting needed) | kept |
| 2 | Phô tài: <art> (Hoàng thượng pop-up) | person pop-up | kept |
| 3 | Dâng canh / Cắm hoa / Làm thơ / Thêu khăn (Hành sự) | Tài nghệ works (dâng, tặng) | stays folded (j83 WFOLD) |
| 3 | Tâng bốc, Nói thật lòng, Dâng một cành hoa (Hoàng thượng pop-up) | person pop-up | kept |
| 4 | Thỉnh an Thái hậu (Hành sự) + "Thỉnh an, chép kinh" (Thái hậu pop-up) | Hành sự; pop-up = shared door | one lock per day (was: could be done twice) |
| 4 | Thỉnh an Hoàng hậu (Hành sự) + "Thỉnh an" (Hoàng hậu pop-up) | Hành sự; pop-up = shared door | one lock per day |
| 5 | Hối lộ Kính sự phòng (Hành sự) + "Đút lót lật thẻ" (Tổng quản) | Hành sự; Kính sự phòng = shared door (owner allowed the shortcut) | one lock per day + S.tablet |
| 6 | Phát chẩn cho cung nhân (Hành sự, Bạc -40) · Đưa cơm áo (Lãnh cung, Bạc -20) · Phát bạc cứu giúp (Tài nghệ Tứ đức, Bạc -20) | Tài nghệ Tứ đức "Phát bạc cứu giúp cung nhân nghèo" (one charity, one cost) | first two removed |
| 7 | Tụng kinh, làm việc thiện (Hành sự) | Tài nghệ Tứ đức (Tự rèn / Theo ma ma giáo tập) | removed from the deck |
| 8 | spying: Cài tai mắt (Hành sự) · Sai đi dò la, Nghe ngóng chung (maid pop-up) · Dò la (person) · Cài người vào cung khác (Cung nhân) | ONE family: remote = Hành sự (Cài tai mắt + NEW cards "Sai cung nữ đi dò la", "Nghe ngóng chung" = the maid's own acts, shared doors); targeted = person pop-up "Dò la" (same ACT.spy as Hậu cung); planted servant = Cung nhân | `adMaidCards()` |
| 9 | Trò chuyện với cung nữ (Hành sự, Lòng +3) + Tâm sự (maid pop-up, Lòng +6) | ONE act "Trò chuyện với cung nữ" (Lòng +3, standing no-dead-end card); the maid pop-up shows the same act (shared door, per buổi) | "Tâm sự" twin replaced |
| 10 | Dạy hoàng tử học chữ, Đưa con đến thỉnh an (Hành sự) | Hoàng tự (Dạy chữ, Dẫn đi thỉnh an Hoàng thượng) | stay removed (j53/j65) |
| 10 | Chữa bệnh cho con (Hành sự, Y ≥4) | Hoàng tự "Tự bốc thuốc cho con" (same: 2 khắc, Sức -10, Sức khỏe con +30) | moved (`kidActs`/`kidAct` "heal") |
| 11 | Học hỏi y lý (Thái y viện) | Tài nghệ Y (Học với thầy) | removed from the place |
| 12 | person acts on the scene vs Hậu cung card (Dò la, Tung tin đồn, Vu oan, Hạ độc …) | person card: ONE ACT table (`runAct`), so the scene pop-up and Hậu cung are the same acts | renamed twins carry the ACT name: Bỏ độc vào trà nàng → Hạ độc, Bỏ xạ hương vào thuốc nàng → Bỏ xạ hương, Tố vượt phẩm → Hặc ăn mặc sai phẩm, Ngáng chân nàng → Ngáng chân, Đẩy nàng xuống hồ sen → Đẩy xuống hồ sen |
| 13 | Nghỉ ngơi một lát / Nghỉ ngơi dưỡng sức / Đọc sách giải khuây / Điểm trang / Giả bệnh | Hành sự (tiers on purpose: 1 khắc +6 Sức repeatable · night rest · reading +2 Sức, Tâm cơ chance) | kept |
| 14 | Thêu khăn bán (servant road) vs Tài nghệ sell | servant road out of scope (no Tài nghệ tab there); consort road sells works at Nội vụ phủ (kitShop Bán) | kept |
| — | Hành sự dealt 5 random pool cards | Hành sự deals EVERY pool card (all daily tasks always in view) | `deal` wrapper |
| — | (new) Nội vụ phủ | Dư đồ place (office court west of the inner palace, 1 khắc from home), eunuch pop-up "Xem hàng Nội vụ phủ" = the existing kitShopNvp + one weekly rare item (grade ≥3, stock 1, its normal price) | `adRare()` |

Scans: `dev/test/act-dedupe-deck.js` before 27 Hành sự names (4 study) → after (see PROGRESS), `dev/test/act-dedupe-w1.js` (functional), `dev/test/act-dedupe-vp.js` (5 viewports), `dev/test/act-dedupe-bot.js` (8-week bot).
