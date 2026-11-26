# REPORT act-merge-J5 (sonnet worker, child of MAIN 155) — ROADS: cung nữ S1–S5 + pop-ups · lãnh cung G12 · khuê các G13

PRIORITY #1 CHECK ('act-merge'): OD 1 | ledger 0 | claims 2 | main 0 | review/* 1 (review/act-merge 45cc9930 = plan r1, reused unchanged: only TRUE duplicates merge) | archive 0.
Branch **review/act-merge-J5** = origin/main 6b5d3d05 (LIVE) + 3 commits, head **c8c9a0d4** (built index.html / sw.js / assets.json rebuilt on it).
Files touched: `dev/build/jkcco.js` (appended section «ACT-MERGE J5»: the door engine + the three road rule tables), tests `dev/test/act-merge-j5.js` (new), `dev/test/maid-8tabs.js` + `dev/test/ag-stf2.js` (1-line each: read names through the doors), tool `dev/tools/act-inventory.js` (+ `-tap.js` copied from review/act-merge; the inventory now reads the REAL deck / talkOpts). No other J-job file edited; j42 / jagknow / j14 / jkc* logic unchanged (the old cards are the ways).

## HOW IT WORKS (one engine for the three roads — please let the reviewer read this once)
- A **door** = a card (deck) or an item (pop-up) with `j5door` + `j5ways`. The ways are the OLD cards/items UNCHANGED (name, khắc, bạc, odds, w/l, go/fail, once/rep, lock). Choosing a way runs it through the SAME `act()` / `talk()` chain it ran through before, so every outcome, every rule, place walking, once-per-week flags, jptime parallel time, kcFix re-deal etc. stay as they were. **No number is typed anywhere (law 4).**
- The chooser is the existing kit option dialog (Q opts → kitOptFinal act-card rows with Tốn / Được / odds chip): **no new kit part needed** (no KIT_REQUEST to KK39).
- The door costs nothing itself; its khắc label = the cheapest way (only the gate «can she do any of them»); the way pays its own khắc on choosing. «Thôi, để sau» closes with nothing spent.
- A door only exists when 2+ ways are on the table today; a lone way stays its own button exactly as before. When one way is left the door runs it directly.
- Door cards are `inner:1` (no fake odds chip, no «Bại» row); they read «ĐƯỢC: kết quả tùy việc chọn».
- Engine sits at the END of jkcco.js (loads after every deal / talkOpts / act wrapper), so it groups the FINAL deck. Two-way law: NPCs still pick the same single cards through `coldActsOf` / `p3Cold` / `knSrvCards` / `jagknow` (same engines); only HER buttons are grouped.
- Test helpers: `J5DOOR.flat(list)` (doors → old flat names), `J5DOOR.run(name)`.

## BEFORE → AFTER, BUTTON NAMES PER SCREEN

### 1. Cung nữ road — Phận sự (her Hành sự), 13 → 5 (+ conditional)
| New button | Old buttons now ways inside (kept as they were) |
|---|---|
| **Hầu việc** | Quét sân, lau điện (rank ≥ đại cung nữ: Đốc thúc cung nữ quét dọn) · Dâng trà, hầu điểm tâm · Theo hầu chủ · Lĩnh đồ ở Nội vụ phủ · Việc chủ sai (when offered) · Quản sổ sách trong cung (rank) · Hầu trà khi ngự giá + Lui sau bình phong (that night only) |
| **Dò la cho chủ** | Nghe ngóng cho chủ · Tự đi dò la cho chủ · Canh chừng cung chủ |
| **Học** | Học lễ nghi với cô cô · Luyện thêu thùa, chữ nghĩa |
| **Nghỉ ngơi** | Nghỉ lấy sức · Chải chuốt, giữ nhan sắc · Mua thuốc bổ (Sức low) |
| **Kiếm thêm** | Thêu khăn bán ra ngoài · Lén giữ đồ Nội vụ phủ phát (the risky way keeps its catch odds + 4 master answers) |
ĐỂ RIÊNG (not touched): **Lén báo tin cho <người mua chuộc>** (mirror of consort «mua chuộc cung nữ», only while bought) · **Uống thuốc phá thai / pregnant card** (j42 tail) · Tân Giả khố deck 3 (Giặt đồ · Nghỉ tay một lát · Cầu xin quản sự — own small deck, as the plan) · exam / extra cards other modules add (jexam, jtoil…) — different features.
A door shows only if ≥2 of its ways are on the table (e.g. on a day with no errand + no pil card the Hầu việc ways are just 3).

### 2. Cung nữ road — pop-ups (srvTalk), by person
| Person | Before | After | Merged | ĐỂ RIÊNG (why) |
|---|---|---|---|---|
| chủ (mis) | Đấm lưng, hầu chuyện · Xin chủ ban thưởng · Bẩm tin dò được · Xin chủ tiến cử lên Nội vụ phủ · Xin chủ cho đi hầu cung khác (5) | **3**: Đấm lưng, hầu chuyện · **Xin chủ** · Bẩm tin dò được | Xin chủ = ban thưởng / tiến cử lên Nội vụ phủ / cho đi hầu cung khác (each keeps its Chủ tin lock + odds) | Đấm lưng (hầu hạ) ≠ Bẩm tin (báo cáo, 0 rủi ro) |
| Hoàng hậu (hh) | Hành lễ thỉnh an · Mật báo chuyện của <chủ> · Tố cáo <chủ> trước Hoàng hậu (3) | **2**: Hành lễ thỉnh an · **Phản chủ** | Phản chủ = Mật báo / Tố cáo trước Hoàng hậu | Hành lễ (lễ nghi) |
| phi tần khác (rv) | Hành lễ thỉnh an · Mật báo chuyện của <chủ> (2) | 2, unchanged | — (lone way stays) | Hành lễ ≠ Mật báo (lễ vs phản chủ) |
| người hầu khác (sv) | Trò chuyện · Biếu quà nhỏ (2) | **1**: **Giao hảo** | Trò chuyện / Biếu quà nhỏ | — |
| Hoàng thượng (emp) | Quỳ dâng trà · Cúi đầu lui tránh (2) | 2, unchanged | — | Quỳ dâng trà (cơ hội được để ý, rủi ro chủ ghen) ≠ Cúi đầu lui tránh (giữ phận) — opposite risk |
| thái y (ty) | Xin thuốc bổ · Học lỏm nghề thuốc | 2 unchanged | — | mua thuốc ≠ học nghề (khác hẳn) |
| nam nhân (man) | Chào hỏi đúng lễ · Liếc mắt đưa tình · Trao khăn, thư · Hẹn gặp riêng · Hẹn ước trăm năm · Cắt đứt | unchanged | — | các bước nối nhau của đường tình, mỗi bước mở khi bước trước xong (G10) |
| Chào hỏi (người lạ) | gate, shown until known | unchanged | — | j61 gate |

### 3. Lãnh cung deck, 11 → 6 (+1–2 conditional doors)
| New button | Old buttons now ways inside |
|---|---|
| **Nghỉ ngơi** | Nghỉ ngơi một lát · Đọc sách giải khuây |
| **Kiếm sống** | Trồng rau · Thêu khăn bán |
| **Rời cung** | Xuất gia · Nghĩ cách trốn khỏi cung · Xin phế làm thứ dân |
| **Kêu oan** (when both exist) | Nhờ người bên ngoài · Nhờ <người quen> đưa thư kêu oan |
| **Xin ân xá** (when ≥2 exist) | Cầu xin · Gửi bài thơ cũ · Nhờ <con> cầu xin |
| **Gửi thư <phe>** (per letter, when both carriers exist) | «Gửi thư xin rời / tố / xin vào <phe> (nhờ thái giám đưa cơm)» + «(nhờ <cung nữ thân tín>)» = ONE letter, the carrier is the way |
ĐỂ RIÊNG: **Chép kinh, giữ đức** (giữ đức, no one is asked ≠ xin tha) · **Cầu xin** while it is the only way (kept its name) · **Tìm chứng cứ minh oan** (a different road: evidence → full restore + framer falls) · the 3 faction letters (rời phe / tố phe / xin vào phe are 3 different deeds) · illCards (J3's H5).
Two-way: `coldActsOf` / `p3Cold` unchanged, an NPC inside picks the same single cards.

### 4. Khuê các (G13, option A): measured with every family member + friend present — đại tiểu thư road (dtq) **61 → 42** cards, dân nữ road (cnv) **24 → 19** (the rest are the single-person acts that stay apart)
Only duplicates merge, two kinds: (1) every **TWIN** (the card with `tw:` = the same act paid in bạc OR in Sức / khắc / a favour — owner 15/11 equal-value rule, law 2), on all roads jkc / jkc2 (dân nữ, ngoại quốc) ; (2) acts of one purpose with the SAME result. Seen on the đại tiểu thư road (dtq) + dân nữ (cnv):
| New button | Old buttons now ways inside |
|---|---|
| **Hầu <mẹ/dì>** | Làm vừa lòng <mẹ> · Hầu <mẹ> trọn buổi |
| **Gần gũi <huynh trưởng / thứ muội>** (per person) | Kết thân <người> · Giúp <người> một việc |
| **Hại thứ muội** | Ngáng chân thứ muội · Sai tỳ nữ ngáng chân thứ muội |
| **Dò xét viện <dì/…>** | Dò la viện <…> · Sai tỳ nữ nghe ngóng viện <…> · Rình viện <…> cả đêm |
| **Lễ chùa** | Đi lễ chùa · Lên chùa chép kinh |
| **Ra chợ** | Dạo phố chợ · Đi xem chợ, không mua |
| **Nghe tin ở trà lâu** | Nghe chuyện ở trà lâu · Nghe lỏm ngoài hiên trà lâu |
| **Thư phường** | Lựa sách ở thư phường · Đứng đọc ở thư phường |
| **Đi thăm <bạn>** (per friend) | Thăm <bạn> · Mang bánh nhà làm thăm <bạn> |
| **Tránh xem mặt** | Khéo từ chối nhà <họ> · Giả bệnh tránh xem mặt · Nhịn ăn tránh xem mặt |
| **Thư cho người ấy** | Gửi thư cho người ấy · Tự tay đưa thư cho người ấy |
| **Dò tin trong cung** | Viết thư vào cung · Gửi thư theo người đi chợ · Mua tin của thái giám ra cung · Nhờ huynh trưởng dò tin trong cung (all = «biết rõ 1–2 phi tần») |
| **Gửi lễ cho <phi tần>** | Gửi quà vào cung cho <…> · Gửi bức thêu tự tay làm cho <…> |
| **Học lễ nghi** | Học lễ nghi cung đình · Tự học lễ nghi theo sách |
| **Mời thầy giỏi** | Mời danh sư · Xin tổ mẫu mời danh sư |
| **Xin vào cung sớm** | Xin cha dâng sớ tiến cử · Nhờ tổ mẫu khuyên cha dâng sớ |
| dân nữ road (jkc2, by `tw`) | **Thuốc cho mẹ** (Mua thuốc cho mẹ · Hái lá thuốc cho mẹ) · **Cưới vợ cho huynh trưởng** (Góp bạc… · Dệt thêm vải làm sính lễ…) · **Trả nợ nhà lý trưởng** (Trả bớt nợ · Làm không công) · **Lễ lý trưởng** (Biếu quà · Thêu khăn biếu bà lý trưởng) · **Học lễ nghi bà Tư** (Học lễ nghi với bà Tư · Gánh nước, quét nhà cho bà Tư); ngoại quốc road: Học lễ nghi Đại Hy / Lễ vật cho sứ thần / Kết thân (same `tw` rule, the code merges them when present) |
ĐỂ RIÊNG (and why): **Nghỉ ngơi · Đọc sách, chép kinh · Viết nhật ký giấu kín · Chải chuốt, thử y phục** (4 different self-care results) · **Thỉnh an <phụ thân/mẫu thân/di nương/tổ mẫu>** (a person each, a lễ) · **Hầu cha ở thư phòng · Khuyên cha chọn phe · Xin cha tiền riêng** (3 different asks of the father) · **Quản việc nhà** · **Gặp riêng <người ấy>** (a tryst ≠ a letter) · **Tố <dì> trước tổ mẫu** (an accusation) · the 5 jkc3 teacher cards **Hầu <thầy> / Biếu <thầy> lễ tết** + nhũ mẫu cards (each a different person/teacher, Hầu ≠ Biếu = 2 jobs) · jkc3 scene dialogs (single-choice story steps) · co-op **kcco** letter / gift / thỉnh nguyện (3 real two-player acts, one per kind, own panel) · the place-bound cards stay locked-with-reason exactly as before.
Road cards (Mệnh truyện / route) not touched.

## ĐỂ RIÊNG — summary of kept-apart names (per owner 07:32Z «cái nào bắt buộc riêng thì để riêng»)
Phận sự: Lén báo tin cho <người mua chuộc>, pregnancy card, Tân Giả khố ×3 · Pop-up: Đấm lưng, Bẩm tin dò được, Hành lễ thỉnh an, Mật báo (lone), Quỳ dâng trà, Cúi đầu lui tránh, Xin thuốc bổ, Học lỏm nghề thuốc, man ladder (6) · Lãnh cung: Chép kinh giữ đức, Tìm chứng cứ minh oan, faction letters ×3, Cầu xin (alone) · Khuê các: see list above.

## TESTS (all run on the built page, Fold 755x1000 + iPad 1180x820 where UI)
- `node dev/test/act-merge-j5.js` → **ALL OK 21**: every way of every door on the 4 roads (cung nữ, lãnh cung, khuê các dtq + cnv) reachable through the real door path (`act(i)` → chooser → `chooseM`) and runs without error; each way spends ITS OWN khắc (`used` = its `k`); pop-up doors (Xin chủ, Phản chủ, Giao hảo) present; no page error.
- Regression: `ag-all-b` PASS · `cold-faction` ALL PASS 20 · `role-parity-drift2-play` ALL PASS · `ag-stf2` ALL 23 PASS (after reading names through `J5DOOR.flat`) · `maid-8tabs` 4 FAIL = identical to LIVE baseline (pre-existing «consort acts» checks; my 2 new ones fixed by `flat`) · `ag-par3` 6–8 FAIL = same as LIVE baseline (household / faction checks, not mine) · `kc-roads/route` no FAIL.
- `dev/tools/act-inventory.js` re-run AFTER (`after.txt`): Phận sự deck 13 → 5 names; chủ pop-up 5 → 3; Hoàng hậu pop-up 3 → 2 (Phản chủ); người hầu 2 → 1 (Giao hảo); lãnh cung deck 11 → 6.
- Real taps: tap the door card → kit option dialog opens (Tốn / Được / odds rows) → pick a way → result. Screenshots checked on both devices (Hầu việc chooser: 4–5 ways in the dialog, scroll «Kéo xuống»; locked way greyed with its reason «đi vắng: chờ chủ về»).
- Videos (webm, CDN review folder `img/_review/act-merge-J5/`): https://ctm-img.victoria-tntt.workers.dev/img/_review/act-merge-J5/j5-fold.webm · https://ctm-img.victoria-tntt.workers.dev/img/_review/act-merge-J5/j5-ipad.webm (door card → chooser → way runs; Hầu việc then Nghỉ ngơi). Reviewer wipes with `--wipe-review act-merge-J5`.

## NOTES FOR THE REVIEWER / OTHER J-JOBS
- J3 builds H14 «Rời cung» in the HÀNH SỰ deck (healthy palace); my «Rời cung» is the lãnh cung deck door (S.out) with the same name and the same ways — they never meet in one deck. If J3 changes the jroute card NAMES (Nghĩ cách trốn khỏi cung / Xin phế làm thứ dân) my COLDG regex must follow (one line, jkcco.js COLDG).
- J4 owns j24 (adds «Nhờ <men> đưa thư kêu oan» to coldActs): untouched; my regex `^Nhờ .+ đưa thư kêu oan$` groups it.
- Door grouping is by NAME (final deck), so a new way added by anyone later only needs a regex line in SRVG / COLDG / KCR. Doors with 1 way = lone card.
- Wording: all door names / texts cổ trang per VANPHONG (no %, no typed numbers).
- Not done / limits: Hoàng thượng pop-up pair and the man ladder left apart on purpose (reasons above) — MAIN may merge the emp pair later (one line in POPG). Chooser art for door cards borrows the first way's picture (kitActArt hook) — pictures load from the CDN, not visible in my offline shots («Đang thình tranh…»).

## HANDOVER (context)
START_CTX ~5 %; at report time ~50 % of the window used (many large file reads). Nothing half-done: branch pushed, tests green. No rollover needed unless MAIN sends a fix round.

~100% xong phần J5 / ~80% chơi được (đã bấm thật cửa gộp trên Fold + iPad; chờ người duyệt lớn chạy cả bộ J0–J5 và nhìn tranh thật trên CDN).
