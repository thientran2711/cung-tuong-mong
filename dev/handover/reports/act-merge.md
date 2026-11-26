# REPORT act-merge (ACT-MERGE, opus worker for MAIN CHÍNH 154) — whole-game action inventory + merge plan (REPORT + PLAN, no game code)

PRIORITY #1 CHECK ('gộp nút'): OD 0 exact; family = dup-report E-d (OD 26/11 ~01:25Z/~03:40Z/~03:45Z/~03:50Z/~03:55Z/~05:35Z/~05:45Z/~05:55Z/~06:50Z/~07:05Z/~07:25Z read verbatim) | main: builders dev/build/j2.js:156 talkOpts (every person kind), jdf.js:57 dfActs (stage pop-up), j8.js ACT table, j15 rvCard, j22.js:29 manCards, j42.js:171 srvTalk + :212 srvCards, j14 coldActs, j25/j53/j54 kid acts, jkc*.js khuê các | review/dup-report 87b41ef2 (Hành sự inventory + P1–P14 / H1–H16 merge groups, reviewed 3×) → REUSED UNCHANGED, this report extends it to the rest of the game | claims E-d (Foreman E). depth 3 · START_CTX ~4 % (est., 1M window; get_session reads 0).
Branch review/act-merge from origin/main 6b5d3d05 (LIVE: index.html md5 3e1f85f2… = the served page). Scan scripts: `dev/tools/act-inventory.js` (whole-game scan) + `dev/tools/act-inventory-tap.js` (real tap on LIVE, Fold 755x1000 + iPad 1180x820). Prints: `dev/handover/reports/act-merge/scan-live-6b5d3d05.txt`, `tap-live-fold-ipad.txt`.

## TÓM TẮT CHO SẾP (tiếng Việt)

Em đã quét TOÀN BỘ nút hành động của game bằng script trên bản đang chạy (không đếm theo trí nhớ), và bấm thật trên Fold + iPad: chạm phi tần khác cung ra **28–31 nút** (đúng như sếp thấy: «Giao thiệp 19/22»).

Theo lời sếp lúc 07:32Z: **chỉ gộp những nút thật sự trùng** (một tính năng bị xé ra nhiều nút); nút nào là tính năng riêng, làm game hay hơn hoặc bắt buộc phải riêng (luật khác, rủi ro khác, người nhận khác, lúc khác) thì **ĐỂ RIÊNG**.

| Chỗ bấm | Nút hiện nay | Sau | GỘP (nút trùng) | ĐỂ RIÊNG (vì sao) |
|---|---|---|---|---|
| Hành sự | 38 | 16 | theo bản dup-report đã duyệt (nghỉ ngơi ×3, thỉnh an ×2, xem sổ ×2, thái y ×5, múa/đàn/vẽ…) | Cầu tự, Giả mang thai, Để ý nam nhân, Trò chuyện với cung nữ, Phát bạc — mỗi cái một đường riêng |
| Thẻ phi tần ở Hậu cung | 50–60 | 12 | hãm hại 12 → 1 (nhẹ hất trà · vừa hủy dung · nặng hạ độc), hạ uy thế 8 → 1, hại hoàng tự 7 → 1, lấy của 6 → 1, dò la 5 → 1, tố cáo 8 → 1 | Khiêu khích, Cùng chơi, Mặc cả chứng cứ, Ra uy, Quyền Hoàng hậu — luật và hậu quả khác hẳn |
| Chạm phi tần trên Dư đồ | 23–32 | 13 (cùng bộ thẻ trên + Hòa giải) | hỏi han · khen · bàn tán · bí mật · thử lòng · cảnh báo · rỉ tai · nương theo → «Trò chuyện»; hắt nước · hắt trà · quạt mực · ngáng chân → «Hãm hại» nhẹ; Hặc ăn mặc · Tố xa xỉ → «Tố cáo» | **Hòa giải**: nhắm vào hai người khác, không phải nàng · **Ghé chơi**: được xem phòng ốc (nằm trong Giao hảo nhưng giữ hệ quả) · Chào hỏi: chỉ hiện khi chưa quen |
| Chạm phi tần cùng cung | 9–11 | 6 | hắt nước/trà/mực/tát → Hãm hại nhẹ + Ra uy | Bàn tán, Mượn son phấn, Cùng chơi — việc khác nhau |
| Chạm Hoàng hậu | 11–12 | 7 | hỏi han + chia sẻ bí mật → Trò chuyện; hắt nước/trà/mực → Hãm hại nhẹ | **Thỉnh an** (lễ buổi sáng) · **Xin che chở** (2 tháng khó bị hại — chỉ Hoàng hậu cho được) · Xin son phấn · Khiêu khích · Cùng chơi |
| Chạm Hoàng thượng | 5–6 | 4 | Tâng bốc + Nói thật lòng → «Hầu chuyện»; Phô tài từng môn → 1 nút chọn môn | **Xin ân điển** (xin bạc, rủi ro mất sủng) · **Dâng hoa** (hầu hạ) |
| Chạm Thái hậu | 4 | 4 | — | cả 4 riêng: Thỉnh an (lễ), Xin đỡ lời (Thái hậu nói giúp với Hoàng hậu), Kể tội (= Tố cáo trước Thái hậu), Xin son phấn |
| Chạm Kính sự phòng | 6 | 4 | Xem sổ thị tẩm · Xem sổ nguyệt sự · Xem lén → **1 nút «Xem sổ Kính sự phòng»** (đúng ví dụ của sếp) | Đút lót lật thẻ (tranh sủng) · Hỏi sở thích Hoàng thượng · Chào hỏi khi chưa quen |
| Chạm thái y | 4 | 4 | — | Bắt mạch · Bài thuốc dễ thụ thai · Mời làm tâm phúc: ba việc khác hẳn (khám / có con / đồng minh lâu dài) |
| Chạm người hầu | 10 | 7 | Nghe ngóng chung + Sai đi dò la → «Sai đi dò la»; Thưởng · Phạt · Đổi người → «Thưởng phạt» (bản dup-report) | Tâm sự (thiện cảm) ≠ Hỏi chuyện (chứng cứ) · Giao việc phòng bị · Tiến cử · Xem người |
| Chạm cung nữ thân cận | 4 | 3 | Nghe ngóng + Dò la → 1 | Trò chuyện · Phòng bị |
| Chạm nam nhân | 5 | 5 | — | Chào hỏi · Liếc mắt · Trao khăn · Hẹn gặp · Cắt đứt là **các bước nối nhau** của đường tình, bước sau mở khi bước trước xong → bắt buộc riêng |
| Chạm rương | 3 | 3 | — | Lục tìm chứng cứ · Lấy trộm son phấn · Cài đồ: ba mục đích khác nhau |
| Cung nhân (tab / một người) | 6 / 10 | 5 / 6 | Thêm cung nữ + Thêm thái giám; Thưởng/Phạt/Đổi/Đề bạt | Cài người, Tra xét, Thân cận, Phòng bị |
| Hoàng tự · Tư trang · Tài nghệ | 7–9 · 6–7 · 3–4 mỗi môn | 5 · 4 · 1 | dạy con ×3, thầy ×2, chăm ×2 · mua đồ 4 đường → 1 · tự học/học thầy/học Thái hậu → «Học» | Dẫn con thỉnh an, Về thăm con, Kiểm tra đồ, Xin đồng minh, Phát bạc; thú cưng giữ trò chơi + Chăm nhanh + Giao người chăm |
| Lãnh cung | 11 | 6 | Nghỉ + Đọc sách; Trồng rau + Thêu khăn («Kiếm sống»); 2 đường nhờ người ngoài («Kêu oan»); Trốn · Xuất gia · Xin phế → «Rời cung» (như Hành sự) | Chép kinh (giữ đức) ≠ Cầu xin (xin tha) |
| Phận sự cung nữ | 13 (23 code) | 5 | theo bản dup-report | — |
| Đêm thị tẩm, nơi chốn, hảo hữu, ma ma, người bán | 1–5, mỗi bước một khung chọn | giữ | — | mỗi bước đêm là một lựa chọn riêng; hảo hữu theo bộ nút phi tần |
| **Toàn game (tên nút khác nhau)** | **≈165** | **≈80** | | |

**Cần sếp chọn 1 việc:** Khuê các (trước khi vào cung, 45–53 thẻ): A = gộp luôn đêm nay theo cùng luật (chỉ gộp nút trùng); B = để sau khi xong phần trong cung. Em chọn **A**.

**Khi nào xong:** 5 thợ làm song song + 1 thợ kit; đường dài nhất ≈ 8 giờ (làm 5 giờ + duyệt lớn 1,5 giờ + sửa 1 giờ + lên game 0,5 giờ) → bắt đầu ~08:30Z thì **xong khoảng 16:30Z ngày 26/11** (≈ 23:30 giờ Việt Nam).

## 1. INVENTORY — every action button, per screen (scan on LIVE 6b5d3d05, 0 page errors)
Method: `act-inventory.js` loads the built page, uses the act-audit harness (AA.scen dau/cao/hh/con × 4 buổi × every place) and reads, for every person the schedules put on a place, `dfActs(i)` = the exact stage pop-up a tap opens (tab, name, cost, outcome line); every tab panel by group pane (nav, list rows, ⓘ help, sub-tabs excluded: an act button names a cost or sits in an act pane); the cung nữ road (`srvTalk` per person kind, `srvCards`); lãnh cung deck over 8 deals. Each name → first file:line holding it (static index over dev/build/j*.js). Full print with every outcome line: `act-merge/scan-live-6b5d3d05.txt`. Real tap: `act-inventory-tap.js` on https://thientran2711.github.io/cung-tuong-mong/ — a real click on the stage figure `[data-p]`, then every pop-up tab; the game's own tab labels confirm the scan (Fold: rival «Giao thiệp 19/22 · Mưu kế 3/3 · Hại người 4/4 · Trừng phạt 1/1» = 30 shown / 31 total; iPad 28; servant 10; maid 4; thái y 4; Thái hậu 4).

### 1.1 Tap a person (Dư đồ pop-up, `dfActs` jdf.js:57 over `talkOpts` j2.js:156 + `dfInPerson`)
| Person kind | Buttons (one pop-up) | Names (cost) · file:line |
|---|---|---|
| rival, another palace | **23–32** (35 distinct) | Giao thiệp: Chào hỏi (1k, j22.js:30 via jgreet) · Hỏi han sức khỏe (1k, j2.js:92) · Khen tài nghệ nàng (jagacts3.js:130) · Bàn tán về <người> (j9.js:138) · Chia sẻ bí mật (j2.js:169) · Nhờ giúp đỡ (j25.js:7) · Cảnh báo nàng (j25.js:8) · Giúp đỡ nàng (1k, 20 bạc, j9.js:137) · Thử lòng (j68f.js:90) · Rỉ tai chuyện trong cung (jtwoway.js:73) · Ghé chơi (jshelf.js:98) · Tặng quà (j2.js:174) · Khiêu khích (j2.js:172) · Hặc ăn mặc sai phẩm (2k, j92.js:298) · Mượn son phấn (jagacts4.js:14) · Cùng chơi / Thách đấu (jpma.js:116) · Hạ nhục / Nương theo / Khoe quà ngự ban (jtwoway.js:68–72) · Hòa giải (j68e.js:34) · Tát (2k) · Hắt nước / Hắt trà / Quạt mực (2k, jlooks.js:146–148) — Mưu kế: Dò la (2k, 17 bạc, j25.js:3) · Tung tin đồn · Nghe lén câu chuyện (j2.js:177) — Hại người: Hạ độc (j30.js:23) · Ngáng chân · Vu oan · Tố xa xỉ (j9.js:148) · Đẩy xuống hồ sen (j9.js:215) · Đẩy con nàng xuống hồ — Trừng phạt: Phạt quỳ (j68e.js:43) |
| rival, HER own palace («Cùng cung» lock) | 9–11 | Hỏi han · Bàn tán về <người> · «Cùng cung» (lock row, j42.js:503) · Mượn son phấn · Cùng chơi · Thách đấu · Hắt nước · Hắt trà · Quạt mực · Tát · Phạt quỳ |
| Hoàng hậu | 11–12 | Chào hỏi · Hỏi han · Chia sẻ bí mật · Xin Hoàng hậu che chở (j2.js:171) · Khiêu khích · Xin son phấn · Cùng chơi · Thách đấu · Hắt nước · Hắt trà · Quạt mực · Thỉnh an (Lễ nghi, j2.js:91) |
| Hoàng thượng | 5–6 | Tâng bốc · Nói thật lòng · Phô tài: <môn> (one per art) · Xin ân điển (j2.js:158–162) · Dâng một cành hoa (Hầu hạ, 5 bạc, j2.js:161) |
| Thái hậu | 4 | Thỉnh an, chép kinh (j2.js:166) · Xin Thái hậu đỡ lời (j2.js:167) · Kể tội một phi tần (jagacts3.js:32) · Xin son phấn |
| Kính sự phòng | 6 | Chào hỏi · Hỏi sở thích Hoàng thượng (15 bạc, j2.js:186) · Đút lót lật thẻ (30 bạc, j2.js:185) · Xem sổ thị tẩm (j2.js:187) · Xem sổ nguyệt sự (10 bạc, jcycle.js:21) · Hầu chuyện, xem lén sổ nguyệt sự (2k, jcycle.js:234) |
| thái y | 4 | Chào hỏi · Bài thuốc dễ thụ thai (40 bạc, j2.js:181) · Mời làm thái y tâm phúc (50 bạc, j2.js:182) · Xin bắt mạch (jthaiy.js:146) |
| servant (serv) | 10 | Tâm sự (j2.js:193) · Nghe ngóng chung (jact.js:20) · Hỏi chuyện · Xem người · Đổi người (j15.js:75) · Giao việc phòng bị (j70.js:488) · Tiến cử (j14.js:78) · Sai đi dò la (j2.js:194) · Thưởng vô cớ / Phạt vô cớ (j24.js:78–79) |
| her maid | 4 | Trò chuyện với cung nữ (j76.js:114) · Nghe ngóng chung · Giao việc phòng bị · Sai đi dò la |
| a man (static; not met by the scan) | 5 | Chào hỏi đúng lễ · Liếc mắt đưa tình · Trao khăn tay · Hẹn gặp riêng · Cắt đứt (j22.js:29 manCards) |
| rương (chest) | 3 | Cài đồ vào rương nàng (j2.js:179) · Lục rương tìm chứng cứ (j2.js:180) · Lấy trộm son phấn (jagacts4.js:14) |
| ma ma (elder) · người bán · phế phi · người khác · con nhà khác | 2 · 2 · 1 · 1 · 0 | Biếu (j10.js:121) · Hỏi chuyện — Chào hỏi · Để ta xem (jact.js:70) — Hỏi chuyện cũ (j2.js:191) — Chào hỏi — (info only) |

### 1.2 Tabs (act buttons only)
| Screen | Buttons | Source |
|---|---|---|
| Hành sự | 38 in code (dup-report §1.2), 21–26 on one buổi (29 seen by this scan) | j2 deal/pool, jact, jact2, jcycle, j83, j13 illCards |
| Hậu cung › one consort card (same for Hoàng hậu) | 50–60 (Làm quen 1 · Gặp mặt 5 · Giao thiệp 3 · Dùng chứng cứ 8 · Hại nhỏ 12 · Hại nặng 16–18 · Sát hại 7–9 · Quyền Hoàng hậu 4–5) | j15 rvCard/rvGroups + j8 ACT |
| Cung nhân › tab / one servant | 6 / 10 | j15, j24 servJudgeBtns, jhouse hsvActs, j70 |
| Hoàng tự (per child) | 7–9 | j25 kidActs, j53 ktBtns, j54 h54Btns |
| Tư trang | 6–7 (+ pets: 3 per pet, + care view 4) | jinv, j83 IROUTE, jpet |
| Tài nghệ | 3–4 per art (Tự học · Học với thầy · Học với Thái hậu · Phát bạc) | j2 artActs, jact AD_OUT |
| Mệnh truyện · Giao tình (Ân oán, Phe phái) | 0 act buttons (views; «Đi làm» links) | — |

### 1.3 Roads, night, places, co-op
| Screen | Buttons | Source |
|---|---|---|
| Cung nữ road: tap chủ / phi tần khác / Hoàng hậu / Hoàng thượng / thái y / người hầu / nam nhân | 5 / 2 / 3 / 2 / 2 / 2 / 2 | j42.js:171 srvTalk |
| Cung nữ Phận sự deck | 13 a deal (23 in code, dup-report §1.3) | j42.js:212 srvCards, jagknow.js:262 |
| Lãnh cung deck | 11 (Nghỉ ngơi một lát · Đọc sách · Cầu xin · Chép kinh, giữ đức · Trồng rau · Thêu khăn bán · Xuất gia · Nhờ <người> đưa thư kêu oan · Nghĩ cách trốn · Xin phế làm thứ dân · Nhờ người bên ngoài) | j14.js:13 coldActs |
| Night (each step is ONE choice dialog, 0 khắc: the night uses up the day, jnight.js:35–45) | summons 3 (Tắm gội chờ giá · Tiến cử <cung nữ> hầu thay · Cáo bệnh, j8.js:322–324) · tablet-flip 2–3 (Giữ chân / Tranh sủng / Chặn ngự giá · Thôi, jnf.js:248–254) · prep 5 (j75.js:108–112) · night1 4 (j8.js:334–337) · night2 5 (j8.js:356–360) · morning 3 (j8.js:363–365) · surprise visit 3 (j7.js:56–58) | jnight, jnf, j8, j75, j7 |
| Places (the place itself) | locked place: Xin yết kiến · Lẻn vào · Đi (buổi sau) · Sang buổi (j41.js:46–48, j77.js:66–76) · Bái kiến <chủ cung> (jclose.js:21) · Hỏi han ở <nơi> (j72.js:283) · Ngự hoa viên: Đánh đàn chờ ngự giá · Ra vấn an · Lánh đi (jact.js:169–171) · Nội vụ phủ shop | — |
| Co-op friend (hảo hữu) | NO own list: she is a `rivals` entry, so the consort buttons apply (jcoopworld.js:559 sends Kết giao / Tặng quà / Cùng chơi / Thách đấu as an invite; Nhận / Từ chối; bribe answers 3, jcoopworld.js:1252) | jcoopworld |
| Khuê các (pre-palace road) | 45 card calls (jkc.js:231) + 43 (jkc2 dân nữ / ngoại quốc roads, replace the base) + 8 (jkc3.js:74) + 5–6 co-op (jkcco.js:156) | jkc* |

## 2. MERGE GROUPS (one feature = one button; ways + tiers inside; all outcomes kept)
OWNER REFINEMENT 26/11 ~07:32Z (verbatim, via MAIN 154): "Tức là không phải là cái hành động nào cũng bắt buộc phải gộp đâu nha. Những cái nào mà cần phải để riêng đó, để cho game mình nó hay là bắt buộc phải để riêng thì vẫn cứ để riêng, chứ không phải là tôi nói gộp là bạn cứ gộp hết tất cả mọi thứ lại đâu nha." → only TRUE duplicates merge; the GỘP / ĐỂ RIÊNG columns with one reason per kept act are in the TÓM TẮT table (the per-group text below is the build spec; where it lists an act inside a door that the TÓM TẮT marks ĐỂ RIÊNG, the TÓM TẮT wins: G3 Cầu xin, G4 Hầu chuyện, G7 Nhờ thái y, G8 Trò chuyện, G10 Tư tình, G11 Lục rương, G12 Giữ đức are NOT merged).
Reused UNCHANGED from dup-report (reviewed 3×, HANHSU_MERGE §3): consort person acts **P1–P14** (card AND pop-up share one set), Hành sự **H1–H16**, Tài nghệ «Học», Cung nhân, Tư trang «Mua đồ», pets/plants («Chăm thú» door per OD ~05:45Z), Hoàng tự 5, cung nữ S1–S5, Tố cáo on D4's built `BAL.charge` (9 charges). The groups below are NEW (screens the dup-report did not cover); each reuses a P/H door where the act is the same feature, so one button = one engine everywhere.

| # | Screen | Merged buttons (before → after) | Folded in (ways / tiers inside) |
|---|---|---|---|
| G1 | Tap a consort (Dư đồ) | 23–32 → 13 = P1–P14 + Hòa giải | Trò chuyện P2 = hỏi han · khen tài · bàn về <người> (picker) · chia sẻ bí mật · thử lòng · cảnh báo · rỉ tai · **nương theo · hòa giải** (new topics, same results); Giao hảo P3 = tặng quà · giúp đỡ · nhờ giúp · mượn son phấn · **ghé chơi**; P4 Cùng chơi/Thách đấu; P5 Dò la = sai người ways + **Nghe lén** (a way: tại chỗ, 1 khắc); P6 Khiêu khích = nhẹ Khoe quà · vừa Khiêu khích · nặng Hạ nhục; P7 Hãm hại = nhẹ Hất trà (hắt nước, quạt mực, ngáng chân = roll outcomes) · vừa Hủy dung · nặng Hạ độc (đẩy hồ sen = a nặng way); P8 Hạ uy thế (Tung tin · Vu oan); P9 Hại hoàng tự (đẩy con xuống hồ = nặng way, only with a child); P11 Tố cáo (Tố xa xỉ · Hặc ăn mặc = the D4 «vp» charge); P14 Ra uy (Tát · Phạt quỳ). Chào hỏi = the j61 stranger gate: shown only until known, then gone |
| G2 | Same-palace consort | 9–11 → 6 (Bàn tán kept) | Trò chuyện · Giao hảo (mượn son) · Cùng chơi · Hãm hại nhẹ · Ra uy (lower rank); the «Cùng cung» lock row stays as the reason line, not a button |
| G3 | Hoàng hậu (person) | 11–12 → 7 (Xin che chở + Xin son phấn SEPARATE) | Thỉnh an · Trò chuyện · **Cầu xin** (Xin che chở · Xin son phấn) · Khiêu khích · Cùng chơi · Hãm hại nhẹ; her P-acts on the Hậu cung card stay P1–P14 |
| G4 | Hoàng thượng | 5–6 → 4 (Xin ân điển SEPARATE) | **Hầu chuyện** (Tâng bốc · Nói thật lòng · Xin ân điển — topics, each its own odds) · **Phô tài** (pick the art) · Dâng một cành hoa |
| G5 | Thái hậu | 4 → 4 (ALL SEPARATE; Kể tội runs the P11 engine) | Thỉnh an, chép kinh · Cầu xin (Xin đỡ lời · Xin son phấn) · Tố cáo (Kể tội = P11 heard by Thái hậu) |
| G6 | Kính sự phòng | 6 → 4 | **Xem sổ Kính sự phòng** = H6 (sổ thị tẩm · sổ nguyệt sự; ways lót tay · xem lén) · **Lót tay lật thẻ** = H9 way · Hỏi sở thích Hoàng thượng; Chào hỏi gate |
| G7 | Thái y | 4 → 4 (ALL SEPARATE: three different features) | Xin bắt mạch = H5 · **Nhờ thái y** (bài thuốc dễ thụ thai · làm tâm phúc); Chào hỏi gate |
| G8 | Servant (pop-up) | 10 → 7 (Tâm sự ≠ Hỏi chuyện; Tiến cử, Xem người, Phòng bị SEPARATE) | Trò chuyện (Tâm sự · Hỏi chuyện) · **Sai việc** = H11 (Nghe ngóng chung · Sai đi dò la · Giao việc phòng bị · Tiến cử) · Xem người · Thưởng phạt (thưởng · phạt · đổi người); the Cung nhân card keeps dup-report's 6 |
| G9 | Her maid | 4 → 3 | Trò chuyện · Sai việc (as G8) |
| G10 | A man | 5 → 5 (ALL SEPARATE: road steps, each unlocks the next) | Chào hỏi đúng lễ (gate) · **Tư tình** nhẹ Liếc mắt · vừa Trao khăn tay · nặng Hẹn gặp riêng · Cắt đứt; NPC side `AGC4BTN.man*` maps to the same tiers (law 1) |
| G11 | Rương | 3 → 3 (ALL SEPARATE: three goals) | **Lục rương** (tìm chứng cứ · lấy trộm son phấn) · Cài đồ vào rương (= P8 nặng way) |
| G12 | Lãnh cung deck | 11 → 6 (Chép kinh ≠ Cầu xin) | Nghỉ ngơi (nghỉ · đọc sách) · Giữ đức (chép kinh · cầu xin) · Kiếm sống (trồng rau · thêu khăn bán) · Kêu oan (nhờ <người> đưa thư · nhờ người bên ngoài) · Rời cung = H14 (trốn · xuất gia · xin phế làm thứ dân) |
| G13 | Khuê các | 45–53 → ~12 (**CẦN SẾP CHỌN**) | same pattern: Nghỉ ngơi · Học (chép kinh, danh sư …) · Hầu người nhà (picker) · Ra ngoài (chợ, trà lâu, chùa) · Dò la (nhũ mẫu …) · Thư từ (người ấy · vào cung · hảo hữu) · Xin cha (tiền · dâng sớ) · Tránh xem mặt (giả bệnh · nhịn ăn) · Hại thứ muội · road cards (dân nữ / ngoại quốc keep their own work doors) |
| keep | night dialogs, place cards, elder / peddler / fallen, cung nữ pop-ups 2–5, co-op | already ONE choice each; co-op follows G1 automatically |

Laws per group: (1) two-way — every merged door is ONE engine run by her and by NPCs (jagharm haVerb, jagacts3/4 AGC*BTN keys map to the same door + tier); (2) equal value — ways inside a door keep today's prices (khắc/bạc/odds), the cheaper way keeps its higher risk; (3) gain-and-loss — no way is cost-only (each keeps its result line); (4) numbers only from BAL — no new number; tiers reuse the acts' own BAL rows (BAL.time.cost, BAL.ag.*, BAL.charge, BAL.pet); (6) kept acts keep their real deeds (jtruth), objects (jlost) and evidence.

## 3. RECOMMENDATION PER GROUP (OD ~05:55Z: MAIN applies these at once)
| Group | Rec |
|---|---|
| P1–P14, H1–H16, tabs, cung nữ S1–S5 (dup-report) | ADOPT unchanged |
| G1 consort pop-up = the same P-set | ADOPT (her 16/11 «buttons right there» rule kept, one set in both places) |
| G2–G11 other people | ADOPT (each folds into an existing P/H door where it is the same feature) |
| G12 lãnh cung | ADOPT |
| Night / places / co-op / small pop-ups | KEEP (already one choice per feature) |
| G13 khuê các | **CẦN SẾP CHỌN**: A = merge tonight in job J5 (+2 h on J5, not on the critical path) · B = after the palace merge lands. Pick: **A** |
| Relationship «+8 (42)» (dup-report §6) | ADOPT, kit job J0 |
| Dư đồ place merge (OD ~07:05Z, tầng 2) | NOT this report: a separate map job; G-doors do not depend on it |

## 4. BUILD PLAN — 5 whole jobs + kit, no two jobs on the same builder
| Job | Scope (whole family) | Builders / files (owned by this job only) | Kit parts | Tests | Model | ETA |
|---|---|---|---|---|---|---|
| J0 KK38 kit | «<Tên>: thiện cảm +8 (42)» row + KIT §7.1 overwrite in place; the way/tier chooser = existing kitOptFinal option dialog (confirm no new part; if a tier header is needed KK38 builds it here) | jkit*, dev/kit/KIT.md, viecnho-fix.test.js | builds them | kit page Fold+iPad | sonnet | 1 h |
| J1 Talk side | G1 talk doors P2/P3/P4 + G2–G11 (every non-harm person door), Chào hỏi gate | j2.js:156 talkOpts (all kinds), j9.js:128 topicOpts, jtwoway, jagacts3 (+AGC3BTN), jgreet, j22 manCards (+AGC4BTN man*), jpma, jshelf Ghé chơi, j68e Hòa giải, jthaiy, jcycle KSP rows | J0 row + chooser | act-inventory before/after, act-audit, dfActs per kind, NPC talk parity | opus | 4 h |
| J2 Harm / scheme / accuse side | P5–P14 doors on the card AND pop-up; tiers; NPC haVerb map; Tố cáo on BAL.charge | j8 ACT table, j15 rvCard/rvGroups, jdf dfInPerson, jlooks, j25, j30, j92, j9 harm rows, jagharm, jcharge, jtruth hooks | J0 | act-inventory, jtruth deed kinds unchanged, charge tests, NPC harm parity | opus | 5 h (critical) |
| J3 Hành sự 38 → 16 | H1–H16 + ill / art / pregnancy cards inside their doors | j2 deal/pool/artActs/directActs, jact, jact2, j13 illCards, j83 cards, jcycle Hành sự cards | J0 | dup-report deck bot + act-inventory | opus | 3 h |
| J4 Tabs | Tài nghệ Học · Cung nhân 5/6 · Tư trang Mua đồ · pets/plants door (with D5's BAL.pet numbers) · Hoàng tự 5 | j24, jhouse, j70 staff rows, jinv, j83 IROUTE, jpet/jshelf care, j25 kidActs, j53, j54 | J0 | act-inventory tabs, pet tests | sonnet | 3 h |
| J5 Roads | cung nữ S1–S5 + pop-ups · lãnh cung G12 · khuê các G13 (if A) | j42 srvTalk/srvCards, jagknow knSrvCards, j14 coldActs/coldFacActs, jkc, jkc2, jkc3, jkcco | J0 | srv + cold + kc scans | sonnet | 3 h (+2 h khuê các) |

Shared rule for J1/J2: the pop-up shows talk doors from J1 and harm doors from J2 through `dfActs` — J2 owns jdf.js, J1 only edits talkOpts; the two land in one STACK (J1 then J2) so no file is edited by both.
**Critical path:** J0 (1 h) runs beside J2 (J2 builds logic first) → J2 5 h → BIG review of the stack 1.5 h → one fix round 1 h → land 0.5 h = **≈ 8 h**. Start ~08:30Z → **done ≈ 16:30Z 26/11** (≈ 23:30 Vietnam). J1/J3/J4/J5 finish inside that window and join the same review.

## LIMITS
- The real-tap shots are covered by the start splash (the click lands on the stage under it); the counts come from the pop-up DOM the real click opened, and match the game's own tab labels. Shots stay in scratch (no CDN credentials; images never in git).
- Not met by the scan (static only): a man (manCards), officials (min), ma ma (mm), a child of another consort (0 acts). One Fold row labelled «hh @ r3» shows Hại người 1 · Giao thiệp 2 = the rương in the Hoàng hậu's palace (kind label of the stage entry), not the Hoàng hậu herself.
- Hành sự number = dup-report's 38 (forced states); this scan alone sees 29 on ordinary days.
- Counts «after» are the design; J-jobs prove them with `act-inventory.js` re-run.
