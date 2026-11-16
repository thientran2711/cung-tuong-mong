# act-dedupe: inventory of acts per tab (INVENTORY ONLY; coordinator HOLD 16/11: nothing moved, merged or deleted)

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

## Proposed homes (NOT applied; awaiting owner approval)
1 -> Tài nghệ (Hành sự keeps a "Đi học ›" link). 2, 3 -> Dư đồ (needs presence) except art practice. 4 -> person card (Thái hậu / Hoàng hậu) + Dư đồ place. 5 -> Dư đồ Kính sự phòng. 6, 7 -> Tài nghệ Tứ đức. 8 -> Hành sự (remote). 9 -> Hành sự or home, one copy. 10 -> Hoàng tự. 11 -> Tài nghệ. 12 -> person card only. Cost-khắc/bạc remote acts that do not need presence belong in Hành sự, not Dư đồ.
BAL: no changes made.
