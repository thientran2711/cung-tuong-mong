# HÀNH SỰ MERGE — feature duplication audit + merge design (E97, REPORT ONLY, no build until sếp picks)

PRIORITY #1 CHECK ('trùng lặp|gộp|dedupe|merge report|dup-report'): OD 19 | ledger 0 | claims 8 | main 15 | review/* 2 (review/act-dedupe-r1 = the 16/11 wave-1 dedupe, already landed) | archive 43.
Reused: the 16/11 rulings (OD «Hành sự = VIỆC, Hậu cung = AI, Dư đồ = ĐI ĐÂU»; «acts that need no meeting are Hành sự cards»; «a person met on Dư đồ opens a pop-up with buttons right there, never jumps to Hậu cung»; «each thing lives in ONE place»), the act-dedupe deck bot (dev/test/act-dedupe-deck.js), the act-audit harness (dev/test/act-audit.js), the true-evidence ledger (jtruth.js deeds), KIT §7.1 result rows. Nothing here changes those rulings; where her 26/11 words overwrite an older rule it is flagged «CANON OVERWRITE».

Owner words (26/11 ~01:25Z, ~03:40Z, ~03:45Z, ~03:50Z, ~03:55Z) are pasted verbatim in dev/handover/briefs/E97-dup-report.md and dev/OWNER_DECISIONS.md (last rows). This file is the detailed design; dev/handover/reports/dup-report.md is the short report with the Vietnamese table for sếp.

Measured (fix r1) on origin/main f009e1a6 = LIVE (built index.html), scenarios đầu game / phẩm cao / Hoàng hậu / có con (AA.scen) + the cung nữ road (a real servant start), 24 seeds × 3 buổi for the deck bot. Scan scripts: `node dev/test/act-dedupe-deck.js file://…/index.html deck.json 755x1000@1` (seeded deck union) and `node dev/test/dup-report-scan.js scan.json deck.json` (scan v2: every panel incl. hidden group panes with REAL button names, every person met in Dư đồ via dfActs, the Hành sự deck under FORCED states — art level, illness, child, pregnancy, tâm cơ, lãnh cung — Quyền Hoàng hậu, «Bàn tán» growth, pet acts; it PRINTS every number this file states; `--sum scan.json deck.json` reprints from a saved scan). **Fix r2 (scan v3):** the page's own timers draw from the game rng between steps, so two scans differ a little (the person met, which pool cards a forced deal shows); every range in this file is the min–max that `node dev/test/dup-report-scan.js --range deck.json f1.json f2.json f3.json` PRINTS over three saved scans on LIVE f009e1a6 (`dev/handover/reports/dup-report/scan-range-r2.txt` + `scan-sum-r2-f1..f3.txt`); v3 also prints the COLLAPSED totals (deck with men-road name variants once; lãnh cung with «Nhờ <người quen> đưa thư kêu oan» once), the card total without and with Quyền Hoàng hậu, the lãnh cung deck over 12 deals, and the cung nữ road under forced states (every Phận sự card, every pop-up act by person kind, Đồng liêu). Shots: `node dev/test/dup-report-shots.js <dir>`.

---------------------------------------------------------------------------------------------------------------------------------

## 1. COUNT TODAY — every khắc-costing act, by place

Time: `BAL.time` = 4 khắc × 4 buổi = **16 khắc / day**; talk 1 khắc, talk-act 2, harm 2 (`BAL.time.cost`); a walk on Dư đồ = `travel()` 1–2 khắc (mean 1.84 between any two places; from her palace: 1 to Kính sự phòng / Lãnh cung / Nội vụ phủ, 2 elsewhere).

| Place | Buttons today | Notes |
|---|---|---|
| Hành sự deck (j2 deal + jact/jact2/jcycle/j83 cards; jact AD_OUT already moved 5 pool cards to Tài nghệ / Hoàng tự) | **38** distinct cards in some state (§1.2): 22 offered most days + 7 pool cards (5 random a buổi) + 4 art-unlocked (ONE a deal) + 3 while ill + 2 while pregnant; the seeded deck bot meets 31 of them. + Mệnh truyện card + road cards (jroute rtCard: «Tâu xin nghiệm thân …», «Truyền … vào cung», «Cắt đứt với …») when open. Lãnh cung has its OWN deck: **9–11 a deal, 11 distinct** (§1.2) | mean 1.8 khắc/card |
| Hậu cung › Phi tần, ONE consort card (j15 rvCard/rvGroups + later modules) | **50–55** without Quyền Hoàng hậu (Gặp mặt 4–5 · Giao thiệp 3 · Dùng chứng cứ 8 · Hại nhỏ 12 · Hại nặng 16–18 · Sát hại 7–9; «Làm quen» +1 for a stranger), + «Quyền Hoàng hậu» at rank 7: **4 on the card, 5 in code** (j15.js:43: Xử tội · Tịch thu trang sức · Ban thưởng · Ân xá · Khất bổng lộc; «Ân xá» shows only for a confined consort `v.confined`, so the scan sees 4) → up to **55 + 5 = 60** (scan v3 «card max incl. Quyền HH in code» 57–60) | shots before-hc-fold / before-hc-ipad (r1, the real card): tab counts e.g. «Gặp mặt 2/5 · Giao thiệp 2/3 · Dùng chứng cứ 0/8 · Hại nhỏ 8/12 · Hại nặng 14/18 · Sát hại 5/9» (shown/total; totals vary 16–18 / 7–9 with what the target owns: pet, child) |
| Dư đồ › a consort met in person (stage pop-up / kitFocus, j2 talkOpts + jdf dfInPerson) | **23–30** for a consort of another palace (largest pop-up per scenario: Giao thiệp 17–23 · Mưu kế 2–3 · Hại người 4 · Trừng phạt 0–1), **9–11** for a consort of HER OWN palace (the «Cùng cung» lock: Giao thiệp + Trừng phạt 0–1; fix r3: printed 11/10 (r2), 10/9 (r3 review), 9/9/9 (fix r3 `scan-range-r3.txt`) → min–max 9–11) — fix r2: r1 called this «one she has not met», the scan shows it is the same-palace lock; + «Trút giận» (j2.js:176) only when her own ghen toward that consort ≥ BAL.ag.cx2.vent.pg 50 (no scan state reaches it) | 25 distinct Giao thiệp names seen (Chào hỏi, Hỏi han sức khỏe, Khen tài nghệ nàng, Rỉ tai chuyện trong cung, Bàn tán về X, Chia sẻ bí mật, Thử lòng, Cảnh báo nàng, Nương theo, Ghé chơi, Tặng quà, Giúp đỡ nàng, Nhờ giúp đỡ, Mượn son phấn, Cùng chơi, Thách đấu, Khiêu khích, Hạ nhục, Khoe quà ngự ban, Hắt nước, Hắt trà, Quạt mực, Tát, Hặc ăn mặc sai phẩm, «Cùng cung» lock); «Bàn tán về X» is ONE button naming one third person (scan: 1 with 1, 4 or 9 people known — it does not grow per person; a run where no rival stood anywhere prints «9: no place») |
| Dư đồ › her maid / a servant / an elder | 4 / 10 / 2 | maid «Sai đi dò la» + «Nghe ngóng chung» = the Hành sự cards again (shared doors) |
| Hậu cung › Cung nhân tab | 5–6 on the tab (Thêm cung nữ · Thêm thái giám · Cài người vào cung khác · Chưởng sự tra xét cung nữ (rank) · Chọn làm cung nữ thân cận · Giao việc phòng bị) + 9 on each servant's card (Thưởng vô cớ · Phạt vô cớ · Đề bạt · Xem người · Hỏi chuyện · Tiến cử · Đổi người · thân cận · phòng bị) | |
| Tư trang | 7 (+3 per pet, +4 in the care view) | Nhờ thái giám tìm thú nuôi · Nhờ thái giám mua đồ · Kiểm tra đồ · Sai cung nữ thân tín mua lén ngoài cung · Hối lộ người ở Thái y viện · Chợ đen ở cửa Thần Vũ · Xin đồng minh; pets §1.4 |
| Hoàng tự (per child) | **7–9** | Dạy chữ · Dạy lễ nghi · Mời thầy riêng · Chăm sóc · Dẫn đi thỉnh an Hoàng thượng (Hoàng thượng thương con · Sủng) · Canh giữ các con · Về tẩm cung thăm con (j15.js:59, walk: gặp các con, chăm con tại tẩm cung); + Tự dạy con tài nghệ, + Mời thầy cưỡi ngựa bắn cung (son ≥6) |
| Tài nghệ (per art) | 3–4 | Tự học / Học với thầy / Học với Thái hậu / Phát bạc (= the Hành sự card again) |

**Total a player meets for ONE consort rival: 38 deck + 50–60 card + 23–30 in person ≈ 111–128 buttons**, against a day of 16 khắc (§5: 6–9 acts a day). This is the «quá nhiều nút, trùng lặp» she felt.

### 1.1 The ACT table (j8 `ACT`, the person acts; NPCs use the same table — two-way law)
55 entries. file:line of each definition (latest override wins):

| key | name | file:line | group today | khắc | real outcome (short) |
|---|---|---|---|---|---|
| spy | Dò la | j8.js:118 (odds override jwhy.js:44, result hook j78.js:130) | Hại nhỏ | 2 | 1 true evidence (a real deed) or harmless knowledge |
| spyk | Tự đi dò la | jecon.js:175 | Hại nhỏ | 2 | same, she goes herself |
| bribe | Mua chuộc cung nữ | j8.js:131 | Hại nặng | 2 | maid takes/tells/refuses; tai mắt or +2 evidence |
| bribel | Sai cung nữ thân tín lấy lòng | jecon.js:180 | Hại nặng | 2 | same goal via her own maid |
| ally | Kết giao | j8.js:119 | Giao thiệp | 2 | thiện cảm +5…+43, bớt oán/ghen |
| gift | Tặng quà | j8.js:163 | Giao thiệp | 2 | thiện cảm by gift |
| petcare | Giúp chăm thú nuôi của nàng | jpetcare.js:193 | Giao thiệp | 2 | thiện cảm +1…+10 |
| rumor | Tung tin đồn | j8.js:120 | Hại nhỏ | 2 | Danh nàng −8 |
| lygian | Ly gián | j30.js:22 | Hại nặng | 2 | Sủng nàng −10 |
| trip | Ngáng chân | j9.js:216 | Hại nhỏ | 2 | Danh nàng −3 |
| tat | Tát | jface.js:177 | Hại nhỏ | 2 | dấu tay, Sắc giảm vài tuần |
| phatquy | Phạt quỳ | jface.js:183 | Hại nhỏ | 2 | Sức −8, đi chậm 1 tuần |
| nuoc / tea / ink | Hắt nước / Hắt trà / Quạt mực | jlooks.js:147 (BAL.slap tiers) | Hại nhỏ | 2 | áo ướt / vết trà + rát da / mặt lem mực → Sắc giảm tới khi điểm trang lại |
| rash | Bỏ phấn lạ | jrash.js:51 | Hại nhỏ | 2 | mẩn mặt, Sắc −5…−16 trong 1–4 tuần |
| huydung | Hủy dung | j70.js:515 | Sát hại | 2 | hủy dung (scar) |
| thathu | Thả thú dữ làm hại dung nhan | jtsb.js:52 | Hại nặng | 2 | vết cào 1–3 nét, Sắc giảm tới khi lành |
| batnat | Ép nộp của | jtsb.js:91 | Hại nhỏ | 2 | nàng nộp bạc / một món quý |
| thaopet | Hại thú nuôi của nàng | jpet.js:212 | Hại nhỏ | 2 | nàng mất con thú quý nhất |
| petsteal | Trộm thú nuôi của nàng | jpetcare.js:196 | Hại nặng | 2 | có con thú của nàng |
| laydo / laydol | Sai người lấy trộm đồ / Sai cung nữ thân tín lấy đồ | jlost.js:279/281 | Hại nặng | 2 | một món quý về tay ngươi |
| phonghoa | Phóng hỏa kho đồ | jtsb.js:72 | Hại nặng | 2 | 1–2 món cháy được bị thiêu |
| frame | Vu oan (bùa ngải) | j8.js:121 | Hại nặng | 2 | nàng mất Danh, Sủng −10; victim may defend (jtruth frameDef) |
| plant | Cài đồ vào rương | j8.js:160 | Hại nặng | 2 | món đồ (cấm) nằm trong rương nàng |
| giahoa | Giá họa trộm đồ | j92.js:356 | Hại nặng | 2 | tội ăn trộm: Danh −10, Sủng −6, cấm túc (today 3 months — a LIVE value; after the merge the length is per FOREMAN D's weight table) |
| block / blockf | Rút thẻ bài / Nhờ ơn người quen rút thẻ bài | j8.js:138 / jecon.js:189 | Hại nặng | 2 | 2 tuần nàng không được lật thẻ |
| steal | Tranh sủng | j8.js:161 | (sủng ái) | 2 | cướp đêm |
| road | Chặn ngự giá | j8.js:162 | (sủng ái) | 2 | gặp Hoàng thượng giữa đường |
| xinhh | Xin Hoàng hậu giáng | j30.js:26 | Hại nặng | 2 | Hoàng hậu giáng nàng |
| poison | Hạ độc | j8.js:124 | Sát hại | 2 | trúng độc / chết; lộ: ban chết |
| slowpoison | Hạ độc dần | j30.js:23 | Sát hại | 2 | Sức −25, ốm 3 tháng |
| pgift | Tặng quà ăn có độc | jpoison.js:112 | Sát hại | 2 | trúng độc |
| pushp | Đẩy xuống hồ sen | j9.js:215 | Sát hại | 2 | Sức nàng −25 / chết đuối |
| musk | Bỏ xạ hương | j8.js:140 | Sát hại | 2 | sảy thai |
| catswap | Mua chuộc bà đỡ | j8.js:143 | Sát hại | 2 | tráo hài nhi |
| ksab | Phá việc học | j8.js:144 | Hại nặng | 2 | con nàng Tài −15 |
| kpoison | Hạ độc con nàng | j8.js:146 | Sát hại | 2 | con nàng trúng độc |
| pond | Đẩy con nàng xuống hồ | j8.js:149 | Sát hại | 2 | con nàng rơi xuống hồ |
| kframe | Vu con nàng trù ẻo | j8.js:152 | Sát hại | 2 | con nàng mang tội yểm bùa |
| takeaway | Xin bế con nàng về nuôi | j8.js:155 | Hại nặng | 2 | bế con nàng về nuôi |
| accuse | Tố giác | j8.js:128 | Dùng chứng cứ | 2 | nàng bị phế hoặc giáng (generic) |
| tocao | Tố tội thật | j30.js:24 | Dùng chứng cứ | 2 | nàng giáng một phẩm (realCrime: vượt phẩm / đồ cấm / từng bày mưu) |
| expose | Bóc chuyện tư tình | j30.js:25 | Dùng chứng cứ | 2 | ban chết hoặc lãnh cung |
| xx | Tố xa xỉ | jdress.js:96 | Hại nặng | 2 | quở: Đức −2, Danh −4, tháo món xa xỉ |
| vp | Hặc ăn mặc sai phẩm | j92.js:298 | Hại nặng | 2 | Danh +2 (her), nàng bị hặc |
| trinhth / trinhhh | Trình Thái hậu / Trình Hoàng hậu | j78.js:137/140 | Dùng chứng cứ | 2 | elder quý ngươi + / judge |
| uyhiep | Uy hiếp đòi bạc | j78.js:142 | Dùng chứng cứ | 2 | Bạc +60 |
| banphe | Bán cho phe khác | j78.js:145 | Dùng chứng cứ | 2 | phe kia thiện cảm + |
| tieuhuy | Trả chứng cứ lấy lòng | j78.js:150 | Dùng chứng cứ | 2 | Đức +2, nàng quý |
| pmplay / pmduel | Cùng chơi / Thách đấu | jpma.js:200 | Gặp mặt | 1 | quý nhau / lấy cược |

### 1.2 Hành sự deck today (38 distinct cards, consort road; scan v2 prints the list per state)
Rows below = the 31 the seeded deck bot meets (the men-road card counts once whatever man it names: «Để ý một nam nhân áo gấm / một vị vương gia / một vị thái y»; «Xin ban hôn cho (một vị) Vương gia» likewise). The 7 cards it does not meet are added at the end.
| card | khắc | other cost | purpose |
|---|---|---|---|
| Điểm trang | 1 | — | dress for the day |
| Nghỉ ngơi một lát | 1 | — | Sức +, tâm trạng + |
| Nghỉ ngơi dưỡng sức | 4 | Bạc −3 | Sức ++ |
| Dưỡng nhan | 2 | Bạc −30 | Sắc + |
| Giả bệnh | 1 | Đức −3 | HT thương, tránh việc; lộ: Danh −6, cấm túc |
| Xin rút thẻ bài, đóng cửa tĩnh dưỡng | 1 | Sủng −10 | rút khỏi tranh sủng |
| Trò chuyện với cung nữ | 1 | — | maid thiện cảm +3, có khi nghe tin |
| Đọc sách giải khuây | 1 | — | Sức +2, có khi Tâm cơ +1 |
| Đọc binh thư, sử sách | 2 | Sức −5 | Tâm cơ |
| Thỉnh an Thái hậu | 2 | Sức −5 | Thái hậu quý |
| Thỉnh an Hoàng hậu | 2 | Sức −5 | Hoàng hậu quý |
| Hối lộ Kính sự phòng | 2 | Bạc −30 | 2 tuần dễ được lật thẻ |
| Xem sổ nguyệt sự | 1 | Bạc −14 | (lót tay thái giám) biết đêm thị tẩm |
| Xem lén sổ nguyệt sự | 2 | Sức −4 | (sang Kính sự phòng, lén xem) same knowledge, risk |
| Mời thái y bắt mạch | 1 (+chờ 2) | Bạc −8 | rõ Sức, thai, mưu hại ngầm — kín |
| Sang Thái y viện xin bắt mạch | 3 | Sức −5 | same, thái y khó nói sai, người khác thấy |
| Giả mang thai | 2 | Bạc −60 | scheme |
| Múa trong yến tiệc | 4 | Sức −20, Bạc −10 | Sủng, ghen +4 |
| Kinh hồng vũ | 4 | Sức −20 | Sủng ++, ghen +10 |
| Đánh cờ với Hoàng thượng | 2 | Sức −5 | Sủng / tình |
| Cầu tự ở Phụng Tiên điện | 2 | Bạc −10 | dễ có thai |
| Sai cung nữ đi dò la | 1 (+chờ 2) | — | dò một phi tần |
| Nghe ngóng chung | 1 (+chờ 2) | — | tin chung |
| Cài tai mắt | 1 | — | người trong cung khác |
| Phát bạc cứu giúp cung nhân nghèo | 1 | Bạc −35 | Đức +3, Danh +5 (= the Tài nghệ button, one lock) |
| Để ý một nam nhân áo gấm | 1 | Đức −2 | men road |
| Nghĩ cách trốn khỏi cung | 1 | — | escape road |
| Dâng biểu xin xuất gia | 2 | — | ending: cửa Phật |
| Xin ban hôn cho Vương gia | 2 | — | ending: vương phủ |
| Xin về quê phụng dưỡng cha mẹ | 2 | — | ending: về quê |
| Nhờ Thái hậu nói giúp | 1 | Bạc −30 | helper for those endings |
| **Đàn khúc Phượng cầu hoàng** (j2.js:63, cầm ≥ BAL.deck.cam.lv) | BAL.deck.cam.c | — | art card: Sủng / HT nhớ tiếng đàn (deckGain/deckLoss «cam»); deal shows ONE art card |
| **Vẽ chân dung tặng Thái hậu** (j2.js:66, họa ≥ BAL.ag.cx.portrait.hoa) | BAL.ag.cx.portrait.c | — | art card: Thái hậu quý (portrait.w / .l) |
| **Truyền thái y** (j13.js:44, only while ill) | 2 | Bạc −40 | khỏi bệnh by odds (treatO «ty»); a bribed physician can worsen it |
| **Tự bốc thuốc** (j13.js:45, ill + Y thuật ≥3) | 2 | Sức −5 | khỏi bệnh by her Y thuật (treatO «self») — a deck card, shown only while ill |
| **Tĩnh dưỡng** (j13.js:46, only while ill) | 4 | — | Sức +15, khỏi bệnh by odds («rest») |
| **An thai** (P3C.anthai, while pregnant) | BAL.ag.par3.anthai | — | nguy cơ sảy thai giảm một nửa tháng này |
| **Báo tin có thai** (j2.js:83, pregnant & hidden ≤3 months) | 0 | — | Sủng +, Thái hậu +; mọi phi tần ghen |
Lãnh cung replaces the whole deck with its own: **9–11 a deal, 11 distinct** (scan v3, 12 deals × 3 scans): Nghỉ ngơi một lát · Đọc sách giải khuây · Cầu xin · Chép kinh, giữ đức · Trồng rau · Thêu khăn bán · Xuất gia · Nghĩ cách trốn khỏi cung · Xin phế làm thứ dân · **Nhờ người bên ngoài** (j14.js:15, when a friend / her faction / a strong father exists) · **Nhờ <người quen> đưa thư kêu oan** (one card naming one contact — Thái y / Trạng nguyên / Thống lĩnh cấm quân / Thị lang Hộ bộ …; printed 3–4 names, counted once) — not merged here (a different life stage; already small).
Moved out of Hành sự earlier by jact AD_OUT (not counted again): Đánh đàn ở ngự hoa viên · Phát chẩn cho cung nhân · Luyện cầm kỳ thi họa · Tụng kinh, làm việc thiện · Thưởng cung nữ (→ Tài nghệ / Cung nhân), Dạy dỗ / Đưa con đến thỉnh an / Chữa bệnh cho con (→ Hoàng tự).

### 1.3 Cung nữ road (OD 21/11 ~03:15Z: the SAME 8 tabs as the consort) — counted (fix r1, item 9)
Measured with a real servant start (scan scenario `srv` + v3 forced states: errand offered, rank ≥ SRVA.books.rk and BAL.srvRk.dai, low Sức, Hoàng thượng at her chủ tonight, bought by a rival, punished to Tân Giả khố). Phận sự (her Hành sự) **13 on a plain day, 23 distinct in code** (j42.js srvDeck + jagknow.js:263–268): the 13 = Quét sân, lau điện · Dâng trà, hầu điểm tâm · Theo hầu chủ · Lĩnh đồ ở Nội vụ phủ · Học lễ nghi với cô cô · Luyện thêu thùa, chữ nghĩa · Chải chuốt, giữ nhan sắc · Nghỉ lấy sức · Thêu khăn bán ra ngoài · Lén giữ đồ Nội vụ phủ phát · Nghe ngóng cho chủ · Tự đi dò la cho chủ · Canh chừng cung chủ; + conditional **Việc chủ sai** (j42.js:236, an errand her chủ gives, random a buổi) · **Đốc thúc cung nữ quét dọn** (the same Quét sân card renamed at rank ≥ đại cung nữ) · **Mua thuốc bổ** (Sức low) · **Quản sổ sách trong cung** (rank ≥ SRVA.books.rk) · **Hầu trà khi ngự giá** + **Lui sau bình phong** (the night Hoàng thượng comes to her chủ) · **Lén báo tin cho <người mua chuộc>** (only when a rival bought her); Tân Giả khố (punished, own deck like lãnh cung) **3**: Giặt đồ · Nghỉ tay một lát · Cầu xin quản sự. Hậu cung › a consort **2** (Làm quen · Gặp mặt); Cung nhân › Đồng liêu **4** (Giao thiệp: Trò chuyện · Biếu quà · Nhờ dò tin; Mưu kế: Tố lỗi với chủ); Tư trang **6** (no pets: «Phận cung nữ chưa được nuôi thú cưng»); Tài nghệ 3 per art. Pop-up acts by person (srvTalk, j42.js:173–192 + 571–576; scan v3 «pop-up [kind]»): her own **chủ 5** (Đấm lưng, hầu chuyện · Xin chủ ban thưởng · Bẩm tin dò được · Xin chủ tiến cử lên Nội vụ phủ · Xin chủ cho đi hầu cung khác — locked ones still shown) · her chủ met outside 1 (Hầu bên cạnh chủ) · another consort 2 (Hành lễ thỉnh an · Mật báo chuyện của <chủ>) · Hoàng hậu 3 (+ Tố cáo <chủ> trước Hoàng hậu) · Hoàng thượng 2 (Quỳ dâng trà · Cúi đầu lui tránh) · thái y 2 (Xin thuốc bổ · Học lỏm nghề thuốc) · another servant 2 (Trò chuyện · Biếu quà nhỏ) · the errand place 1 (Làm xong: Việc chủ sai) · a man up to 6 (Chào hỏi đúng lễ · Liếc mắt đưa tình · Trao khăn tay, thư · Hẹn gặp riêng · Hẹn ước trăm năm · Cắt đứt — a ladder: each step opens at a tình ý threshold); one place in Dư đồ shows **2–5** of these at once. ≈ 30 buttons on a plain day: her road is NOT over-full; the duplication is in Phận sự and the pop-up with her chủ. Merge (same pattern, carried over; every act homed in §3.4 «Cung nữ road»): S1 **Hầu việc** = Quét sân / Đốc thúc · Dâng trà · Theo hầu chủ · Lĩnh đồ · Việc chủ sai (when offered) · Quản sổ sách (rank) · the ngự giá night pair Hầu trà / Lui sau bình phong (that night only) (way = which duty; each keeps its công lao / Chủ tin / odds); S2 **Dò la cho chủ** = Nghe ngóng cho chủ · Tự đi dò la cho chủ · Canh chừng cung chủ (way inside; = consort P5 for law 1 — here she IS the servant sent, so OD ~05:35Z «every search is sent» holds: the chủ's mind sets the odds, her own skill is the small factor); S3 **Học** = Học lễ nghi với cô cô · Luyện thêu thùa, chữ nghĩa; S4 **Nghỉ ngơi** = Nghỉ lấy sức · Chải chuốt, giữ nhan sắc · Mua thuốc bổ (Sức low); S5 **Kiếm thêm** = Thêu khăn bán ra ngoài · Lén giữ đồ Nội vụ phủ phát (the second is the risky way, kept with its catch odds); «Lén báo tin cho <người mua chuộc>» stays as its own card while she is bought (the mirror of consort P5 «mua chuộc cung nữ của nàng», law 1). Phận sự 13 (23 in code) → **5** (+1 while bought); Tân Giả khố 3 stays (own small deck). Pop-up with her chủ 5 → 3 (**Hầu chủ** = Đấm lưng, hầu chuyện · **Xin chủ** = ban thưởng / tiến cử lên Nội vụ phủ / cho đi hầu cung khác as ways, each keeps its Chủ tin lock and odds · **Bẩm tin dò được** stays); with another consort / Hoàng hậu 2–3 → 2 (Hành lễ thỉnh an · **Phản chủ** = mật báo / tố cáo trước Hoàng hậu as ways); Đồng liêu 4 → 3 (**Giao hảo** = trò chuyện / biếu quà · Nhờ dò tin · Tố lỗi với chủ). A cung nữ risen to consort gets the consort merge (P/H) at once (ROLE PARITY, jact adSrv).

### 1.4 Pets (OD 26/11 ~04:25Z «không có thời gian ngó tới thú cưng»)
Pet acts today: Tư trang › Thú cưng: Nhờ thái giám tìm thú nuôi (1 khắc, Bạc) · per pet: Chăm <thú> (opens the care view) · Cho theo hầu · Gửi về Ngự thú viên; care view (jpetcare.js): **Cho ăn · Tắm, chải lông · Chơi — each BAL.pet.khac = 1 khắc** (a short minigame each, quick option = BAL.skip.care) · Giao <cung nữ> chăm (BAL.pet.maidW 4 weeks, half the decay, no tình cảm). Plants (jshelf, Tư trang › kệ): servants already tend them at 0 khắc to her (OD 17/11 ~18:15Z, BAL.shelf.plant.srvBase by the servant's care); «Chăm <cây>» = «Tự tay chăm» BAL.shelf.plant.khacSelf = 1 khắc with the watering game (jmgx KG82_KIND.tuoi «Tưới cây»). On consorts: Giúp chăm thú nuôi của nàng · Hại / Trộm thú nuôi của nàng · Thả thú dữ (P3 / P10 / P7). Bars fall every WEEK by BAL.pet.decay (No −14, Sạch −9, Vui −11, Tình cảm −2) and one play-day = one week (her own «4 tuần … 4 ngày chơi»), so holding ONE pet's bars costs about **3 khắc a day** (each game +8…+40), ~19 % of the 16-khắc day — the reason she «không có thời gian ngó tới thú cưng». Fix in §5.

---------------------------------------------------------------------------------------------------------------------------------

## 2. EXPERT VIEW FIRST (law 8) — palace-drama and Qing palace conventions

Sources (background reading, not quoted as game text): 《國朝宮史》 Guochao Gongshi (1769, Qing palace regulations: rank allowances 份例, palace rules 宮規, punishments); Evelyn S. Rawski, *The Last Emperors: A Social History of Qing Imperial Institutions* (1998), ch. on the harem ranks and discipline; 《漢書·武五子傳》 / 《資治通鑑》 on the 巫蠱之禍 (91 BC) and Empress Chen deposed for witchcraft (130 BC); the dramas 《後宮·甄嬛傳》 (2011), 《延禧攻略》 (2018), 《如懿傳》 (2018) for the genre's scheme ladder and 滴血驗親 (trích huyết nghiệm thân) trope.
1. **Punishment is by rank, one step at a time, with a stated charge.** Qing discipline: 罰俸 (cut allowance) → 禁足 (cấm túc) → 降位 (giáng ONE rank) → 打入冷宮 (lãnh cung) → 賜死. The charge (罪名) is always read out. This supports the owner's 26/11 job (2): reason always shown, one rank per punishment, lãnh cung lasts days before ân xá.
2. **The accusation names the crime, and the crime decides the judge and the sentence.** Drama and record alike: 謀害皇嗣 (mưu hại hoàng tự) and 巫蠱 (vu cổ) are the gravest (death / deposition, Han Wudi precedent); 謀害妃嬪 (mưu hại phi tần) next; 穢亂後宮 / 私通 (tư thông) → death or lãnh cung; 僭越 (vượt phẩm: dress/use above rank) and 奢靡 (xa xỉ: spending over 份例) → reprimand, confiscation, allowance cut; 偷竊 (trộm cắp) → restitution, cấm túc; 散布流言 (đặt điều thị phi) → phạt quỳ, chép cung quy. Evidence differs by crime: a witness (cung nữ, bà đỡ), an object (hình nhân, gói thuốc, sổ Kính sự phòng), a physician's finding (Thái y), the Kính sự phòng record. → our «evidence → accusation by kind» table (§4).
3. **The investigator is an office, not the accuser.** 慎刑司 (game: Cung Chính ti) and the Empress (harem head) investigate; grave crimes go to the Emperor / Thái hậu. → the «trình ai» choice inside one «Tố cáo» act.
4. **Scheme ladder in palace drama has three steps**: petty humiliation in public (spilled tea, ink, a trip — loses face), harm to the body/beauty (rash powder, a cat, a scar — loses favour), harm to life/child/rank (poison, musk, frame — loses everything). Each step multiplies the risk if caught. This is exactly her nhẹ / vừa / nặng model.

---------------------------------------------------------------------------------------------------------------------------------

## 3. MERGE DESIGN — ONE FEATURE = ONE BUTTON, the way chosen INSIDE, tiers nhẹ / vừa / nặng, all outcomes kept

Rules applied (her words): (a) one feature = one button; the way (sai người / lén xem / tới tận nơi / tự tay) is chosen inside the act; (b) merge BUTTONS, keep ALL consequences; (c) harm-type families = nhẹ / vừa / nặng with ONE representative act per tier; (d) the same merged button everywhere it appears (Hậu cung card = stage pop-up = Hành sự where it applies) — her 16/11 rule «tap a person on Dư đồ → buttons right there» stays: the pop-up shows the merged buttons; (e) two-way law: NPC schemes use the same families and tiers (jagharm haVerb maps to the same keys), so what she can do to them they can do to her.

Inside-act chooser = the existing kit option dialog (kitOptFinal option cards, §6.2b) — no new kit part. Ways that need a person (sai cung nữ / sai tai mắt) also set the parallel-time «chờ n khắc» (jptime) exactly as today; a way she does herself in person follows **her D5 picks (OD 26/11 ~05:10Z, canon)**: every minigame that decides a success chance STAYS (the mưu kế / scheme boards, the 7 Dư đồ act games — swipe Giáng tay / Hắt / Ngáng, tug Xô, bow Hành lễ, drag Trao tay, ear Ghé tai, words Lời hay, stare Đấu mắt — and nghiệm thân); tát / né are CUT to one tap by skill; Điểm trang is one tap by skill with a «Tự tay điểm trang» button for the full game; the other D5 cuts stay one tap (mg-trim.md list: HT-summons đàn/cờ/du hồ, hát/múa before Tranh sủng, hoa đăng, kết mạng); **pet care and plant watering KEEP their minigames (OD 26/11 ~05:45Z, canon: «Trò chăm thú cưng và tưới cây giữ như cũ và option chăm nhanh như học nhanh hoặc giao người chăm») and add «Chăm nhanh» (one tap, Tùy duyên, a lower result than playing) + «Giao người chăm» (a servant cares, by that servant's skill, no / less khắc to her)**; «Học nhanh» = flat **Tùy duyên** (BAL.skip.od), and a work (tác phẩm) made via Học nhanh gives NO product. So in this design: the self / in-person way keeps its minigame wherever that game decides a chance; a one-tap way uses its own odds; a learning act keeps its «Học nhanh» way. This report adds no minigame and keeps none against D5.

### 3.1 Person acts (Hậu cung consort card AND the Dư đồ pop-up of a consort) — 50–60 on the card (+23–30 in the pop-up) → 12

| # | Merged button (cổ trang) | Old buttons folded in | Ways inside | Tiers (ONE act each) | Consequences kept (examples) |
|---|---|---|---|---|---|
| P1 | **Gặp nàng** | Đến cung nàng ta thăm, Mời nàng ta sang cung, Sai tai mắt dò nơi ở, Ghé chơi, Chào hỏi | tới tận cung nàng (2 khắc) · mời nàng sang (1 khắc, chờ 2) · sai tai mắt dò nơi ở (1, chờ 2) | — | nàng ở nhà → gặp mặt; nàng nhận lời / ghé cho có / từ chối (quý nhau −3) / đem chuyện đi kể; biết nàng ở đâu |
| P2 | **Trò chuyện** | Chào hỏi, Hỏi han sức khỏe, Khen tài nghệ nàng, Rỉ tai chuyện trong cung, Bàn tán về X (one per person!), Chia sẻ bí mật, Thử lòng, Cảnh báo nàng | chọn chuyện: hỏi han · khen tài · rỉ tai tin · bàn về một người (chọn người trong danh sách) · chia sẻ bí mật · thử lòng · cảnh báo | — | each topic keeps its own odds and result line (thiện cảm, tin nghe được, nàng biết bí mật, lộ lòng nàng) |
| P3 | **Giao hảo** | Kết giao, Tặng quà, Giúp chăm thú nuôi của nàng, Giúp đỡ nàng, Nhờ giúp đỡ, Mượn son phấn | kết giao (Bạc) · tặng quà (chọn món) · giúp một việc (chăm thú / giúp đỡ) · nhờ nàng (giúp / mượn son phấn) | — | thiện cảm +, bớt oán/ghen; nhận / giữ khoảng cách / trả lễ / mách (receiver choice jrcv) |
| P4 | **Cùng chơi / Thách đấu** | Cùng chơi, Thách đấu | chơi cho vui · đặt cược | — | quý nhau / lấy cược (jpma, unchanged) |
| P5 | **Dò la** | Dò la, Tự đi dò la, Sai đi dò la (maid), Mua chuộc cung nữ, Sai cung nữ thân tín lấy lòng | sai cung nữ thân tín (chờ) · sai tai mắt (Bạc) · mua chuộc cung nữ của nàng (Bạc lớn, maid chooses) — LIVE spyk «Tự đi dò la» (jecon.js:175) FOLDS into «sai người» (MAIN 153 06:00Z per OD ~05:35Z «every search is sent»): no self-search way — every way: «Tìm chứng: <odds word> · …» by the D4 formula (§4.2: HER Tâm cơ vs the target's decides, the servant's skill a small ±1) | — | a REAL deed found (spyFind: «tìm ra chuyện nàng …») with its KIND (§4) or harmless knowledge (giờ giấc, sở thích); bribe: maid becomes tai mắt or +2 evidence; refuse costs nothing |
| P6 | **Khiêu khích** (lời nói, tại chỗ) | Khiêu khích, Hạ nhục, Khoe quà ngự ban, Trút giận (pop-up only, j2.js:176, when her ghen toward that consort ≥50: «hả cơn ghen; nàng oán», Đức −3) | — | nhẹ **Khoe quà ngự ban** · vừa **Khiêu khích** · nặng **Hạ nhục** | nàng ghen / tâm trạng xấu / Danh nàng −; nặng: nàng oán sâu, ta Đức − |
| P7 | **Hãm hại** (thân, dung nhan, tính mạng) | Hất trà, Hắt nước, Quạt mực, Ngáng chân, Bỏ phấn lạ, Hủy dung, Thả thú dữ, Hạ độc, Hạ độc dần, Tặng quà ăn có độc, Đẩy xuống hồ sen | way: tự tay tại chỗ (keeps its Dư đồ act game — Hắt / Ngáng / Xô — it decides the chance, D5 Q1 KEEP) · sai người (odds) · mua chuộc người của nàng | nhẹ **Hất trà** · vừa **Hủy dung** · nặng **Hạ độc** | nhẹ: áo loang trà, phấn son lem, rát da → Sắc giảm tới khi điểm trang lại (the nước/mực/ngáng chân results fold into this one as roll outcomes, §3.4; Tát moves to P14: «mất mặt giữa chốn đông người, Danh nàng −3»); vừa: vết sẹo/mẩn → Sắc giảm tới khi lành (rash 1–4 tuần, scar longer: the tier rolls light/deep); nặng: trúng độc / thập tử nhất sinh / chết; lộ: ban rượu độc (unchanged); nặng ways keep hạ độc dần (Sức −25, ốm 3 tháng), quà có độc, đẩy xuống hồ sen (Sức −25 / chết đuối) |
| P8 | **Hạ uy thế** (danh, sủng, phẩm vị) | Tung tin đồn, Ly gián, Rút thẻ bài, Nhờ ơn người quen rút thẻ bài, Xin Hoàng hậu giáng, Vu oan, Cài đồ vào rương, Giá họa trộm đồ | way (for vừa): lót tay Kính sự phòng · nhờ người quen; way (for nặng): bùa ngải · cài đồ cấm · giá họa trộm · xin Hoàng hậu giáng | nhẹ **Tung tin đồn** · vừa **Rút thẻ bài** (Sủng) · nặng **Vu oan** (giáng phẩm) | nhẹ: Danh nàng −8; vừa: 2 tuần không được lật thẻ / Sủng −10 (ly gián kept as the «nhờ người quen nói xấu» way); nặng: nàng bị tội theo vật cài (bùa → vu cổ, đồ cấm → tàng trữ, trộm → tội trộm, Danh −10, Sủng −6, cấm túc — length per FOREMAN D's weight table, OD ~04:25Z (3)) and ONE rank down; the charge it brings = the D4 charge of its deed (frame / plant / giahoa → vo, §4); victim defends (frameDef) and a cleared frame exposes the framer |
| P9 | **Hại hoàng tự** (only when she has a child / is with child) | Phá việc học, Bỏ xạ hương, Mua chuộc bà đỡ, Hạ độc con nàng, Đẩy con nàng xuống hồ, Vu con nàng trù ẻo, Xin bế con nàng về nuôi | way: sai người · vu con nàng (vừa: con mang tội yểm bùa) · mua chuộc bà đỡ (nặng, at birth: tráo hài nhi) · tự tay tại chỗ (nặng: con rơi xuống hồ) | nhẹ **Phá việc học** · vừa **Bỏ xạ hương** · nặng **Hạ độc con nàng** | Tài con −15 / sảy thai / con trúng độc (chết: khả năng thấp); «Xin bế con về nuôi» moves to Quyền Hoàng hậu (it is a ruling, not a harm) |
| P10 | **Lấy của** (đồ, thú nuôi) | Sai người lấy trộm đồ, Sai cung nữ thân tín lấy đồ, Ép nộp của, Trộm thú nuôi, Hại thú nuôi, Phóng hỏa kho đồ | way: sai người · cung nữ thân tín · ra uy đòi (in person) | nhẹ **Ép nộp của** · vừa **Lấy trộm đồ** · nặng **Phóng hỏa kho đồ** | real objects move (law 6c): món quý về tay ngươi / bạc nộp / 1–2 món cháy; pet theft/harm fold into vừa (the stolen thing may be a pet) |
| P11 | **Tố cáo** | Tố giác, Tố tội thật, Bóc chuyện tư tình, Tố xa xỉ, Hặc ăn mặc sai phẩm, Trình Thái hậu, Trình Hoàng hậu, road card «Tâu xin nghiệm thân …» | choose the CHARGE (only D4 charges whose OWN pieces are full, §4) · choose WHO hears it (Hoàng thượng / Hoàng hậu / Thái hậu — today's trình; FOR FOREMAN D 3) | — | the D4 charge's punishment (`BAL.charge.C[c].pun`) and D4's failed-charge price; the reason line = the deed text + its pieces (§4) |
| P12 | **Mặc cả chứng cứ** | Uy hiếp đòi bạc, Bán cho phe khác, Trả chứng cứ lấy lòng | đòi bạc · bán cho phe · trả lại lấy lòng | — | Bạc +60 / phe kia thiện cảm +8 và nắm chứng cứ / Đức +2, nàng quý |
| (P13) | **Quyền Hoàng hậu** (rank 7 only) | Xử tội, Tịch thu trang sức, Ban thưởng, Ân xá (only for a confined consort), **Khất bổng lộc** (j8.js:529 empAct cutpay: Nội vụ phủ khất bổng lộc của nàng, thiện cảm −), Xin bế con nàng về nuôi | xử theo chứng cứ · tịch thu · ban thưởng · ân xá · khất bổng lộc · bế con về nuôi | — | unchanged numbers |
| (P14) | **Ra uy** (rank power, in person) | Phạt quỳ, Tát | — | nhẹ **Tát** · vừa **Phạt quỳ** | dấu tay / Sức −8, đi chậm 1 tuần; needs higher rank (kept lock); Tát / Né = one tap by skill (D5 CUT tát/né, the same BAL.slap table NPCs roll) |

Count: P1–P12 = **12** for any consort (+P13 Empress, +P9 only with a child; P14 only to a lower rank) — from 50–60 on the card and 23–30 in the pop-up. «Tranh sủng / Chặn ngự giá» are not person acts on her: they move to the Hành sự «Tranh sủng» card (§3.2 H9).

Why these tier picks: nhẹ Hất trà = her own example, has the richest result (stain + burn + face); vừa Hủy dung = her example, the scar keeps the deepest content (Sắc until healed); nặng Hạ độc = the oldest, most complete act (antidote, death, ban rượu độc if caught); Hạ uy thế nặng = Vu oan because it already has the defence/exposure system (jtruth) and the «one rank down» she asked for; Hại hoàng tự vừa = Bỏ xạ hương (classic genre act, clean outcome: sảy thai).

### 3.2 Hành sự deck — 38 → 16 (every one of the 38 cards of §1.2 homed below and in §3.4)

| # | Merged card | Old cards folded in | Ways inside (khắc / cost kept per way) |
|---|---|---|---|
| H1 | Điểm trang | — | (dress picker) · one tap by skill (D5 Q2) · «Tự tay điểm trang» = the full makeup game as the way inside (her pick) |
| H2 | **Nghỉ ngơi** | Nghỉ ngơi một lát, Nghỉ ngơi dưỡng sức, Dưỡng nhan | chốc lát (1) · cả buổi dưỡng sức (4, Bạc −3) · dưỡng nhan (2, Bạc −30) |
| H3 | **Cáo bệnh** | Giả bệnh, Xin rút thẻ bài đóng cửa tĩnh dưỡng | giả bệnh xin thương (1, Đức −3; lộ: Danh −6, cấm túc — length per FOREMAN D's weight table, OD 26/11 ~04:25Z (3); today's 2 months is NOT kept as a number here) · đóng cửa tĩnh dưỡng (1, Sủng −10) |
| H4 | **Thỉnh an** | Thỉnh an Thái hậu, Thỉnh an Hoàng hậu | Thái hậu (2) · Hoàng hậu (2) — morning only, each once a day |
| H5 | **Thái y** (bắt mạch / chữa bệnh) | Mời thái y bắt mạch, Sang Thái y viện xin bắt mạch; while ill also Truyền thái y, Tự bốc thuốc, Tĩnh dưỡng | mời đến cung (1 + chờ 2, Bạc −8, kín) · tự sang Thái y viện (3, Sức −5, thái y khó nói sai, người khác thấy); while ill: truyền thái y chữa (2, Bạc −40) · tự bốc thuốc (2, Sức −5, Y thuật ≥3) · tĩnh dưỡng (4, Sức +15) — each keeps its own khỏi-bệnh odds |
| H6 | **Xem Sổ Kính sự phòng** (her example) | Xem sổ nguyệt sự, Xem lén sổ nguyệt sự (+ the Kính sự phòng place shortcut) | sai người lót tay thái giám (1, Bạc −14) · lén xem khi hầu chuyện Tổng quản (2, Sức −4, có thể bị bắt gặp) · tới tận nơi (walk + 1) |
| H7 | **Đọc sách** | Đọc sách giải khuây, Đọc binh thư sử sách | giải khuây (1, Sức +2) · binh thư sử sách (2, Sức −5, Tâm cơ +) |
| H8 | **Dâng tài nghệ** | Múa trong yến tiệc, Kinh hồng vũ, Đánh cờ với Hoàng thượng, **Đàn khúc Phượng cầu hoàng**, **Vẽ chân dung tặng Thái hậu** | đánh cờ với Hoàng thượng (2) · múa trong yến (4) · Kinh hồng vũ (4, vũ ≥ lv) · đàn khúc Phượng cầu hoàng (BAL.deck.cam, cầm ≥ lv: Sủng, HT nhớ) · vẽ chân dung tặng Thái hậu (BAL.ag.cx.portrait, họa ≥ lv: Thái hậu quý) — each keeps its own gain/loss and odds (deckOdds, one table with the NPC) |
| H9 | **Tranh sủng** | Hối lộ Kính sự phòng (lật thẻ), Tranh sủng, Chặn ngự giá | lót tay Kính sự phòng (2, Bạc −30: 2 tuần dễ lật thẻ hơn một bậc) · chặn ngự giá · cướp đêm của người khác |
| H10 | Cầu tự ở Phụng Tiên điện | — | — |
| H11 | **Tai mắt** | Sai cung nữ đi dò la, Nghe ngóng chung, Cài tai mắt | dò một người (= P5 Dò la, same act) · nghe ngóng chung (1 + chờ 2) · cài tai mắt mới vào cung khác |
| H12 | Trò chuyện với cung nữ | — | — |
| H13 | Phát bạc cứu giúp cung nhân nghèo | — (shared door with Tài nghệ, one lock, kept) | — |
| H14 | **Rời cung** | Nghĩ cách trốn, Dâng biểu xin xuất gia, Xin ban hôn cho Vương gia, Xin về quê phụng dưỡng cha mẹ, Nhờ Thái hậu nói giúp | trốn · xuất gia · ban hôn (when the road is open) · về quê; «nhờ Thái hậu nói giúp» = a helper step inside the petition ways |
| H15 | Để ý nam nhân | — (men road) | — |
| H16 | Giả mang thai | — | — |
| (+) | **An thai** (only while pregnant) | An thai, Báo tin có thai | uống thuốc an thai (sảy thai −½ tháng này) · báo tin (while hidden ≤3 months: Sủng +, Thái hậu +, mọi phi tần ghen) |
| + | Mệnh truyện (only when a beat is open) · road cards | — | the «Tâu xin nghiệm thân» road card becomes the way the D4 «Tư thông» charge is tried on a pm piece (sổ Kính sự phòng lệch), inside P11 Tố cáo (one door) |

**16 base cards** (she leans ≤16); +1 «An thai» while pregnant, +1 Mệnh truyện on a day a beat is open. The ill-only and art-only cards no longer add buttons (inside H5 / H8).

### 3.3 Other tabs (same pattern, small)
- Tài nghệ: «Tự học / Học với thầy / Học với Thái hậu» → ONE **Học** per art, way inside (3 → 1 per art); every way keeps its **«Học nhanh»** option (D5 Q4: one tap, flat Tùy duyên, BAL.skip.od; Q3: a work made via Học nhanh gives no product) and playing it yourself keeps the lesson minigame (level-up learning is a KEEP, OD ~04:15Z (1)).
- Cung nhân: «Thêm cung nữ / Thêm thái giám» → **Thêm người hầu** (way: cung nữ / thái giám); «Thưởng / Phạt / Đổi người / Đề bạt» → **Thưởng phạt** (way inside); «Sai hỏi / Giao việc phòng bị / Chọn thân cận» stay (3 different jobs) → 9 → 6.
- Tư trang: «Nhờ thái giám mua đồ / Sai cung nữ mua lén ngoài cung / Chợ đen cửa Thần Vũ / Hối lộ người Thái y viện (thuốc)» → **Mua đồ** (way: Nội vụ phủ · mua lén ngoài cung · chợ đen · Thái y viện) → 7 → 4. Pets: per pet the three care acts sit inside ONE **Chăm thú** door (OD ~05:45Z): ways = **Cho ăn · Tắm, chải lông · Chơi** (each its minigame, 1 khắc, as today) · **Chăm nhanh** (one tap, Tùy duyên like Học nhanh, a lower result, ≤1 khắc for all three bars) · **Giao người chăm** (a servant cares, passive, by her skill; 0 khắc to her). Plants the same: **Chăm <cây>** = tự tay tưới (the watering game, 1 khắc) · Chăm nhanh (one tap, Tùy duyên) · Giao người chăm (today's servant care, 0 khắc) — §5.
- Hoàng tự (per child, 7–9 → 5): **Dạy con** (Dạy chữ · Dạy lễ nghi · Tự dạy con tài nghệ) · **Thầy cho con** (Mời thầy riêng · Mời thầy cưỡi ngựa bắn cung) · **Chăm con** (Chăm sóc · Canh giữ các con) · Dẫn đi thỉnh an Hoàng thượng · Về tẩm cung thăm con (a walk, kept).
- Servant + maid pop-up: «Sai đi dò la / Nghe ngóng chung» = the H11 card (one act); «Phạt vô cớ / Thưởng vô cớ / Đổi người» → Thưởng phạt.

### 3.4 OLD ACT → NEW HOME (fix r1, item 3: every act, none dropped silently)
Status words: **way** = a way chosen inside the new button, it keeps its own cost, odds and full outcome; **tier** = the ONE representative act of that tier; **roll** = its button goes, its outcome lives on as a result of that tier's roll (light / deep result, same numbers as today); **moved** = same act, other button; **stays**. **Dropped: none** — every outcome below still exists after the merge; nothing waits for a pick except the tier choices themselves (§7).

**ACT table (55 keys, j8 `ACT`; NPCs run the same keys)**
| old key · name | new button | status · what keeps living |
|---|---|---|
| spy Dò la · spyk Tự đi dò la | P5 Dò la | way «sai tai mắt»; spyk folds into «sai người» (no self-search way, MAIN 153 per OD ~05:35Z) · real deed found (spyFind) or harmless knowledge; odds per D4 (§4.2) |
| bribe Mua chuộc cung nữ · bribel Sai cung nữ thân tín lấy lòng | P5 Dò la | way «mua chuộc cung nữ của nàng» / way «sai cung nữ thân tín» · maid becomes tai mắt or +2 evidence |
| ally Kết giao · gift Tặng quà · petcare Giúp chăm thú nuôi của nàng | P3 Giao hảo | way ×3 · thiện cảm +, bớt oán/ghen; petcare = way «giúp một việc» |
| pmplay Cùng chơi · pmduel Thách đấu | P4 | way ×2 · jpma unchanged |
| rumor Tung tin đồn | P8 Hạ uy thế | tier nhẹ · Danh nàng −8 |
| lygian Ly gián | P8 | way of vừa «nhờ người quen nói xấu» · Sủng nàng −10 |
| block Rút thẻ bài | P8 | tier vừa · 2 tuần không lật thẻ |
| blockf Nhờ ơn người quen rút thẻ bài | P8 | way of vừa «nhờ người quen» · same outcome, other cost |
| xinhh Xin Hoàng hậu giáng | P8 | way of nặng «xin Hoàng hậu giáng» (needs Hoàng hậu thân ta) · nàng giáng ONE bậc; today its card says «Không được gì thêm» → the merged way states the gain (law 3) |
| frame Vu oan | P8 | tier nặng · nàng bị tội theo vật cài, ONE bậc; frameDef defence; cleared → framer exposed |
| plant Cài đồ vào rương · giahoa Giá họa trộm đồ | P8 | way of nặng «cài đồ cấm» / «giá họa trộm» · tàng trữ / tội trộm: Danh −10, Sủng −6, cấm túc (length per FOREMAN D weight table, OD 26/11 ~04:25Z (3)) |
| trip Ngáng chân | P7 Hãm hại | roll of nhẹ · «mất mặt giữa chốn đông người, Danh nàng −3» |
| nuoc Hắt nước · ink Quạt mực | P7 | roll of nhẹ · áo ướt / mặt lem mực → Sắc giảm tới khi điểm trang lại (same rule as tea) |
| tea Hắt trà | P7 | tier nhẹ · vết trà + rát da, Sắc giảm tới khi điểm trang lại |
| rash Bỏ phấn lạ | P7 | roll of vừa (light) · mẩn mặt Sắc −5…−16, 1–4 tuần |
| thathu Thả thú dữ làm hại dung nhan | P7 | roll of vừa (way «sai người thả thú») · vết cào 1–3 nét, Sắc giảm tới khi lành |
| huydung Hủy dung | P7 | tier vừa (deep) · sẹo, Sắc giảm lâu |
| poison Hạ độc | P7 | tier nặng · trúng độc / chết; lộ: ban rượu độc |
| slowpoison Hạ độc dần | P7 | way of nặng «hạ độc dần» · Sức −25, ốm 3 tháng (no death) |
| pgift Tặng quà ăn có độc | P7 | way of nặng «quà có độc» · trúng độc; the gift item really exists (law 6c) |
| pushp Đẩy xuống hồ sen | P7 | way of nặng «tự tay tại chỗ» (in person, at a pond place) · Sức −25 / chết đuối |
| tat Tát · phatquy Phạt quỳ | P14 Ra uy | tier nhẹ / vừa · dấu tay, Sắc giảm vài tuần / Sức −8, đi chậm 1 tuần (rank lock kept) |
| batnat Ép nộp của | P10 Lấy của | tier nhẹ · nàng nộp bạc / một món quý |
| laydo Sai người lấy trộm đồ | P10 | tier vừa · một món quý về tay ngươi |
| laydol Sai cung nữ thân tín lấy đồ | P10 | way of vừa · same |
| petsteal Trộm thú nuôi của nàng | P10 | way of vừa (the thing taken is her pet) · có con thú của nàng |
| thaopet Hại thú nuôi của nàng | P10 | way of vừa «hại con thú» · nàng mất con thú quý nhất |
| phonghoa Phóng hỏa kho đồ | P10 | tier nặng · 1–2 món cháy (objects traceable: burnt, law 6c) |
| musk Bỏ xạ hương | P9 Hại hoàng tự | tier vừa · sảy thai |
| ksab Phá việc học | P9 | tier nhẹ · con nàng Tài −15 |
| kpoison Hạ độc con nàng | P9 | tier nặng · con trúng độc |
| catswap Mua chuộc bà đỡ | P9 | way of nặng «mua chuộc bà đỡ» (only at her birth) · tráo hài nhi |
| pond Đẩy con nàng xuống hồ | P9 | way of nặng «tự tay tại chỗ» · con rơi xuống hồ |
| kframe Vu con nàng trù ẻo | P9 | way of vừa «vu con nàng» · con nàng mang tội yểm bùa (child's standing, not life) |
| takeaway Xin bế con nàng về nuôi | P13 Quyền Hoàng hậu | moved · bế con nàng về nuôi |
| steal Tranh sủng · road Chặn ngự giá | night card-flip (jnf, OD 16/11 22:45Z) / H9 where the night is parked | moved · cướp đêm / gặp HT giữa đường |
| accuse Tố giác · tocao Tố tội thật · expose Bóc chuyện tư tình · xx Tố xa xỉ · vp Hặc ăn mặc sai phẩm | P11 Tố cáo | each = a way of accusing ONE D4 charge (§4: accuse any full charge · tocao → vp / il / bm · expose → tt · xx / vp → vp) · the charge's `pun`, D4's failed-charge price, the reason line from its pieces |
| trinhth Trình Thái hậu · trinhhh Trình Hoàng hậu | P11 | the «who judges» choice inside |
| uyhiep Uy hiếp đòi bạc · banphe Bán cho phe khác · tieuhuy Trả chứng cứ lấy lòng | P12 Mặc cả chứng cứ | way ×3 · Bạc +60 / phe kia thiện cảm + / Đức +2 |

**Hành sự deck (38)** → §3.2 rows: H1 Điểm trang · H2 Nghỉ ngơi (×3) · H3 Cáo bệnh (Giả bệnh, Xin rút thẻ bài) · H4 Thỉnh an (×2) · H5 Thái y (×2 + 3 ill-only) · H6 Xem Sổ Kính sự phòng (×2) · H7 Đọc sách (×2) · H8 Dâng tài nghệ (×5 incl. Đàn khúc Phượng cầu hoàng, Vẽ chân dung tặng Thái hậu) · H9 Tranh sủng (Hối lộ Kính sự phòng) · H10 Cầu tự · H11 Tai mắt (Sai cung nữ đi dò la, Nghe ngóng chung, Cài tai mắt) · H12 Trò chuyện với cung nữ · H13 Phát bạc · H14 Rời cung (×5) · H15 Để ý nam nhân · H16 Giả mang thai · (+) An thai (An thai, Báo tin có thai). 38 → 16 (+1 while pregnant).

**Pop-up / card-only acts (not ACT keys)**
| old | new | status |
|---|---|---|
| Đến cung nàng ta thăm (visit) · Sai tai mắt dò nơi ở (scout) · Mời nàng ta sang cung (invite) · Ghé chơi · Làm quen | P1 Gặp nàng | way · gặp mặt / biết nơi ở / nàng nhận lời …; Làm quen = the first-meeting way |
| Chào hỏi · Hỏi han sức khỏe · Khen tài nghệ nàng · Rỉ tai chuyện trong cung · Bàn tán về X · Chia sẻ bí mật · Thử lòng · Cảnh báo nàng · Nương theo · Nghe lén câu chuyện | P2 Trò chuyện | topic (way) · each keeps its own odds + result line («Cùng cung» = a lock notice, not an act) |
| Giúp đỡ nàng · Nhờ giúp đỡ · Mượn son phấn | P3 Giao hảo | way |
| Khiêu khích · Hạ nhục · Khoe quà ngự ban · Trút giận | P6 | tier ×3 (Khoe nhẹ · Khiêu khích vừa · Hạ nhục nặng); Trút giận = way of vừa when her ghen ≥50 (hả cơn ghen, Đức −3, nàng oán) |
| Quyền Hoàng hậu: Xử tội · Tịch thu · Ban thưởng · Ân xá · Khất bổng lộc | P13 | way ×5 (+ bế con về nuôi) |
| maid: Trò chuyện với cung nữ · Nghe ngóng chung · Sai đi dò la · Giao việc phòng bị | H12 · H11 · H11 · Cung nhân «phòng bị» | moved (one door each) |
| servant: Tâm sự · Hỏi chuyện · Xem người · Tiến cử · Giao việc phòng bị · Sai đi dò la · Thưởng vô cớ · Phạt vô cớ · Đổi người | Cung nhân: Hỏi chuyện (Tâm sự = topic) · Xem người · Tiến cử · phòng bị · H11 · **Thưởng phạt** (thưởng · phạt · đổi người · đề bạt) | way / stays |
| elder: Biếu · Hỏi chuyện | stays | — |
| Hoàng tự (9) | Dạy con · Thầy cho con · Chăm con · Dẫn đi thỉnh an · Về tẩm cung thăm con (§3.3) | way / stays |
| Tư trang (7) + pets (3 per pet + 4 care) | Mua đồ (×4 ways) · Tìm thú nuôi · Kiểm tra đồ · Xin đồng minh · per pet: Chăm thú (Cho ăn · Tắm, chải lông · Chơi = ways with their minigames · Chăm nhanh · Giao người chăm = today's «Giao <cung nữ> chăm») · Cho theo hầu · Gửi về Ngự thú viên · per plant: Chăm <cây> (tự tay tưới · Chăm nhanh · Giao người chăm) | way / stays (OD ~05:45Z) |
| Tài nghệ (per art): Tự học · Học với thầy · Học với Thái hậu · Phát bạc | Học (×3 ways) · Phát bạc (shared door, kept) | way |
| Cung nữ road | see the «Cung nữ road» table below | — |

**Cung nữ road (fix r2, item 3: every act of her road, none dropped; §1.3)**
| old (where) | new | status · what keeps living |
|---|---|---|
| Quét sân, lau điện / Đốc thúc cung nữ quét dọn (Phận sự; the rank name of one card) · Dâng trà, hầu điểm tâm · Theo hầu chủ · Lĩnh đồ ở Nội vụ phủ | S1 Hầu việc | way ×4 · công lao, Chủ tin, the chủ's mood; Theo hầu chủ still only when the chủ is out |
| **Việc chủ sai** (Phận sự, j42.js:236, when her chủ gives an errand) + pop-up «Làm xong: Việc chủ sai» at the errand place | S1 Hầu việc | way «việc chủ sai hôm nay» (only when offered) · the walk pass «được vào nơi ấy buổi này», công lao on «Làm xong» (srvErrandDone) — the «Làm xong» button stays at the place (it is the end of that way, not a new act) |
| Quản sổ sách trong cung (Phận sự, rank ≥ SRVA.books.rk) | S1 Hầu việc | way (rank-locked as today) |
| Hầu trà khi ngự giá · Lui sau bình phong (Phận sự, the night Hoàng thượng comes to her chủ) | S1 Hầu việc | way pair, that night only · Hoàng thượng để ý / chủ ghen, Chủ tin − on a miss · Lui: Chủ tin +2 |
| Nghe ngóng cho chủ · Tự đi dò la cho chủ · Canh chừng cung chủ (Phận sự, jagknow.js:263–268) | S2 Dò la cho chủ | way ×3 · tin for her chủ, real deeds (jagknow) |
| Học lễ nghi với cô cô · Luyện thêu thùa, chữ nghĩa | S3 Học | way ×2 · công lao / Tài nghệ (Học nhanh way per D5) |
| Nghỉ lấy sức · Chải chuốt, giữ nhan sắc · **Mua thuốc bổ** (Sức low) | S4 Nghỉ ngơi | way ×3 · Sức / Sắc; Mua thuốc bổ only when Sức < SRVA.med.at, once |
| Thêu khăn bán ra ngoài · Lén giữ đồ Nội vụ phủ phát | S5 Kiếm thêm | way ×2 · bạc; the second keeps its catch odds and the chủ's four answers |
| Lén báo tin cho <người mua chuộc> (Phận sự, only while bought, j42.js:240) | stays (own card while bought) | the mirror of consort P5 «mua chuộc cung nữ của nàng» (law 1) · the buyer gets tin / evidence, risk if caught |
| Giặt đồ · Nghỉ tay một lát · Cầu xin quản sự (Tân Giả khố deck, punished) | stays (own deck, like lãnh cung) | 6 lần giặt = về sớm 1 tuần · Sức / bị bắt gặp thêm một tuần · dúi bạc xin về sớm |
| pop-up chủ: Đấm lưng, hầu chuyện | **Hầu chủ** | stays as one button · công lao, the chủ's mood |
| pop-up chủ: Xin chủ ban thưởng · Xin chủ tiến cử lên Nội vụ phủ · Xin chủ cho đi hầu cung khác | **Xin chủ** | way ×3 · each keeps its Chủ tin lock (SRVA.askRew.tin / askRec.tin / BAL.sp.leaveLoyal), odds and result (bạc / công lao + bậc / the chủ picks: tăng thưởng, giáng một bậc, hoặc cho đi) |
| pop-up chủ: Bẩm tin dò được | stays | chủ nắm chứng cứ of the person she found (the end of S2) |
| pop-up chủ met outside: Hầu bên cạnh chủ | stays | — |
| pop-up another consort / Hoàng hậu: Hành lễ thỉnh an | stays | nàng quý ngươi + |
| pop-up another consort / Hoàng hậu: Mật báo chuyện của <chủ> · Tố cáo <chủ> trước Hoàng hậu (Hoàng hậu only) | **Phản chủ** | way ×2 · the listener holds evidence of her chủ; tố cáo: the chủ is tried, she goes to serve Hoàng hậu; the monthly «chủ phát hiện» risk kept |
| pop-up Hoàng thượng: Quỳ dâng trà · Cúi đầu lui tránh | stays (two answers of one meeting) | Hoàng thượng để ý + / giữ phận, Đức +1 |
| pop-up thái y: Xin thuốc bổ · Học lỏm nghề thuốc | stays (two purposes) | Sức / Y thuật |
| pop-up another servant: Trò chuyện · Biếu quà nhỏ = Đồng liêu Giao thiệp: Trò chuyện · Biếu quà | **Giao hảo** (one engine for the pop-up and the Đồng liêu card) | way ×2 · người ấy quý ngươi +, có khi biết chuyện |
| Đồng liêu: Nhờ dò tin | stays (= an S2 helper: a friend listens for her) | tin |
| Đồng liêu: Tố lỗi với chủ | stays | the mirror of consort P11 Tố cáo for her road (law 1) |
| pop-up a man: Chào hỏi đúng lễ · Liếc mắt đưa tình · Trao khăn tay, thư · Hẹn gặp riêng · Hẹn ước trăm năm · Cắt đứt | stays (men road ladder, not a duplication: each step opens at a tình ý threshold; the consort men road H15 stays too) | hắn quý ngươi / tình ý + / khăn thư = tang vật nếu bị lục (law 6c) / đêm kín đáo / cắt đứt |
| Hậu cung › a consort: Làm quen · Gặp mặt | stays | — |
| Tư trang 6 · Tài nghệ 3 per art | as the consort (Mua đồ ways · Học per art) | way |

### 3.5 LAWS PER MERGED ACT (fix r1, item 4) — law 1 two-way · law 2 equal-value ways · law 3 no cost-only way · law 6 real proof / objects
| # | L1 (NPC uses the same act/tier) | L2 (ways inside = equal value: cost vs gain) | L3 (every way gains) | L6 (proof / object real) |
|---|---|---|---|---|
| P1 Gặp nàng | NPC visits / invites her (jagharm visit, j2 invite) | tới tận nơi 2 khắc, sure if home · mời 1 khắc + chờ, she may refuse · sai tai mắt 1 khắc, only knowledge | each: a meeting or her whereabouts | she is a real NPC at a real place (6b) |
| P2 Trò chuyện | NPC talks to her with the same topics (jagacts3 talk*) | topics differ in kind, not price (all 1 khắc) | each a thiện cảm or a piece of news | «Bàn tán về X»: X is a real person |
| P3 Giao hảo | NPC ally/gift/help to her (AGHH ally) | kết giao Bạc vs tặng quà món vs giúp việc khắc: the gain scales with what is paid | each: thiện cảm + | the gift item moves owner (6c) |
| P4 Chơi / Thách đấu | NPC challenges her (jpma npc g.duel) | chơi = no stake, small gain · cược = stake, big gain/loss | both | the stake is real bạc/item |
| P5 Dò la | NPC spies on her (oSpy one formula; NPC masters use their own Tâm cơ the same way, D4 two-way) | sai tai mắt: Bạc, safe · mua chuộc: Bạc lớn, +2 evidence · thân tín: free, slow (chờ) (spyk «tự đi» folded into «sai người», MAIN 153) — in every way HER Tâm cơ vs the target's is the main factor and the way only changes cost / risk / the servant's small ±1, so the ways stay equal-value | each finds a deed or knowledge | finds only deeds that happened (jtruth wrongs) |
| P6 Khiêu khích | NPC provokes her (haVerb same keys) | tiers, not ways: risk grows with harm | each: nàng ghen/Danh −; Trút giận: hả ghen | witnesses at the place |
| P7 Hãm hại | NPC harms her through the same tier keys (jagharm) | nặng ways: ngay (sure, deadly, easy to trace) · dần (no death, slow) · quà (needs the item) · tại chỗ (needs a pond place) — each trades deadliness vs trace | every way a harm on the target | each leaves a DEEDW deed (poison, slowpoison, pgift, pushp, huydung, thathu …); nhẹ/rash need a new deed record (§4) |
| P8 Hạ uy thế | NPC frames / blocks / rumours her (same keys) | vừa: lót tay (Bạc) vs nhờ người quen (a favour owed) · nặng: bùa / đồ cấm / trộm / xin HH (needs HH thân) — each a different charge with its own sentence | xinhh gains «nàng giáng một bậc» (fix of today's «Không được gì thêm») | planted item really in her chest; frame deed recorded |
| P9 Hại hoàng tự | NPC harms her child (same keys, jagharm kid) | ways trade access (bà đỡ only at birth, tại chỗ needs a pond) vs trace | each a harm | deeds musk/catswap/kpoison/pond/kframe/ksab recorded |
| P10 Lấy của | NPC steals from her (steal, petsteal, phonghoa) | sai người vs thân tín: cost vs catch risk | each takes a real thing | object moves / burns, always traceable (6c) |
| P11 Tố cáo | NPC accuses her with the same D4 charges (BAL.charge, §4) | the hearer choice: HT / HH / Thái hậu — whether it changes anything is D4's call (FOR FOREMAN D 3); the sentence = the charge's `pun` | a held charge always gains | only charges backed by real pieces of their OWN kind (D4) |
| P12 Mặc cả | NPC blackmails / sells her proof (uyhiep, banphe) | bạc vs a faction's favour vs Đức | each gains | the proof passes to the buyer for real |
| P13 Quyền HH | NPC Empress uses the same five on her (jagacts AGHH) | each a different ruling | each gains (thiện cảm / order / bạc) | — |
| P14 Ra uy | a higher NPC slaps / kneels her (rank lock both ways) | tiers | each | witnesses |
| H1–H16 | each card is the same table the NPC uses (BAL.deck / deckOdds, jagacts3 AGC3BTN) | H2 chốc lát 1 vs dưỡng sức 4 + Bạc vs dưỡng nhan Bạc −30: gain scales · H3 giả bệnh (Đức −, exposure risk) vs đóng cửa (Sủng −, safe) · H5 mời (Bạc, kín) vs tự sang (Sức, seen, khó nói sai) · H6 lót tay (Bạc) vs lén xem (Sức, bị bắt gặp) vs tới tận nơi (walk) · H7 · H8 · H9 · H11 · H14 ways differ in cost and risk, same goal | every way has a gain (H3 đóng cửa gains peace + no rival harm; H14 «nhờ Thái hậu» gains better odds for the petition) | H6: the Kính sự phòng book is a real record (jkh); H11: the tai mắt is a real servant |

---------------------------------------------------------------------------------------------------------------------------------

## 4. EVIDENCE → ACCUSATION BY CHARGE — on FOREMAN D's BUILT D4 table (fix r3: ONE source, no table of this report's own)

**The one source (laws 4, 14):** D4 option A (OD 26/11 ~05:15Z «D4 A»; find odds ~05:35Z canon) is BUILT on `review/charge-evidence` 7b8a0999 (`BAL.charge`, jbal2.js:2264–2281, + jcharge.js; charge names as on the branch tip f83621cc, without commas for the kit chips). Charges, pieces needed, find bands, the deed → charge map and the punishment of each charge are READ from there; this report keeps NO parallel charge table, no own `need`, no own sentence. Evidence is kept PER CHARGE (`h.evc[target][charge]`, jcharge.js), a piece exists only for a real deed (jtruth, law 6a), accusing = ONE charge whose own pieces are full (chReady), only that charge's pieces are spent, and the notice lists the charge and each piece (punEvTxt) — for every consort and for her (law 1).

| D4 charge (`BAL.charge.C`) | need (+`queenPlus` 1 vs Hoàng hậu) | pun (jcharge.js chPunTxt) | evidence kinds mapped by `BAL.charge.deed` | reason text example (this report's only addition: the line shown in the result card / Sổ ghi) |
|---|---|---|---|---|
| vp «Vượt phẩm xa xỉ» | 1 | light = phạt bổng `BAL.charge.fine` lượng + Danh / Đức small (`danh`, `duc`) — matches OD 26/11 ~05:55Z (1) «ăn mặc vượt phẩm / vượt phẩm → NHẸ (khất bổng, no cấm túc)» | vp | «Đáp ứng Trần cài trâm phượng chín đuôi, chỉ Phi trở lên mới được dùng.» · «Quý nhân Hà dùng chén ngọc và gấm Tô Châu vượt bổng lộc phẩm Quý nhân ba tháng liền.» |
| il «Giấu đồ cấm» | 2 | cam = cấm túc (length per FOREMAN D's weight table, OD ~04:25Z (3)) + the forbidden item taken (law 6c) | il, illbuy | «Trong rương Ngọc quý nhân có thuốc mê mua lén từ chợ đen.» |
| uh «Ức hiếp quấy phá» | 2 | cam (length per D's weight table) | trip, batnat, uyhiep, steal, petsteal, thaopet, block, blockf, ksab, rumor, lygian, story | «Lời đồn về ta bắt đầu từ cung nữ của Diệp đáp ứng.» · «Trâm ngọc của ta tìm thấy trong hộp của cung nữ Lam phi; người gác kho khai.» |
| mc «Mua chuộc người hầu» | 2 | light | bribe, sbribe, sthreat | «Thái giám Tiểu Thuận khai nhận ba mươi lượng của Uyển tần để rút thẻ bài người khác.» |
| bm «Bày mưu hại người» | 2 | cam (length per D's weight table) | plot, old, caught (+ any deed key not in the map: `chOfDeed` falls back to bm) | «Cung nữ của Thục tần khai nàng bày kế hại ta từ tháng trước.» |
| hd «Hại dung nhan» | 2 | giang = ONE rank down (a second rank fall inside `BAL.pun.gapDays` becomes cấm túc) | huydung, thathu, pushp, phonghoa | «Người giữ thú khai Thục tần sai thả mèo dữ vào điện ta.» |
| mh «Mưu hại tính mạng» | 3 | cold = lãnh cung (phế for Phi+ / Hoàng hậu; ≥ `BAL.pun.coldMinDays` before any release) | poison, kpoison, slowpoison, pgift, musk, pond, catswap | «Cung nữ Bích Ngân khai Lệ tần sai bỏ thuốc vào chén yến của Quý nhân Tô; gói thuốc còn trong rương nàng.» · «Thái y nghiệm ra xạ hương trong túi thơm Đức phi tặng; bà đỡ khai bị mua chuộc.» |
| vo «Vu oan giá họa» | 3 | cold | frame, kframe, giahoa, plant | «Trong gối của Hiền phi có hình nhân viết bát tự của Hoàng tử, kim chỉ của cung nàng.» |
| tt «Tư thông» | 3 | cold | tryst, pm, flirt, mangift | «Thị vệ canh cửa Thần Vũ thấy Lan quý nhân gặp Thế tử lúc canh ba; bức thư có nét chữ của nàng.» · pm: «Sổ Kính sự phòng không ghi đêm nào của Mẫn tần trong tháng nàng thụ thai.» (the blood-test road jroute «Tâu xin trích huyết nghiệm thân» stays the way this piece is tried) |

A failed charge uses D4's price (jcharge.js:105: accuser Danh `BAL.eff.j8.accuseFailDanh`, the target's grudge, a failed charge against the Hoàng hậu = phạm thượng, punished), not a price of this report.

**Accusation acts are ways of P11, not evidence** (they spend pieces, they record none): accuse Tố giác = any full charge; tocao Tố tội thật (realCrime: vượt phẩm / đồ cấm / từng bày mưu) → vp / il / bm; expose Bóc chuyện tư tình → tt; xx Tố xa xỉ and vp Hặc ăn mặc sai phẩm → vp; road card «Tâu xin nghiệm thân» → tt (pm piece); trinhth / trinhhh = who hears it (below).

Rules: (1) the Tố cáo list shows only charges whose OWN pieces are full (no «đủ 2 chứng cứ»); (2) the reason line = the deed text + the proof object / witness (punEvTxt lists up to `BAL.pun.evShow` pieces), never a bare count; (3) one punishment per charge, at most one rank (D1, `BAL.pun`); (4) two-way: NPCs accuse her with the same charges and their real pieces; her defence (frameDef) stays; (5) every number above is BAL.charge / BAL.pun — none invented here.

### 4.1 Every evidence kind → its D4 charge (law 6a: which proof EXISTS today)
Recorded today (jtruth.js:18–19 DEEDW, the runAct hook jtruth.js:54, the hooks plot / sbribe / sthreat / illbuy / flirt / mangift / ls / ml<k> + mlbeat / caught / story, and the deedOnce scans tryst / il / vp / pm / plot, jtruth.js:26–34). Each kind and where D4 puts it:
| kind | D4 charge | status |
|---|---|---|
| poison, slowpoison, pgift, kpoison, musk, catswap, pond | mh | mapped |
| pushp | hd | mapped (see FOR FOREMAN D 5) |
| huydung, thathu | hd | mapped |
| phonghoa | hd | mapped (see FOR FOREMAN D 5) |
| frame, kframe, giahoa, plant | vo | mapped |
| tryst, pm, flirt, mangift | tt | mapped |
| plot, old, caught | bm | mapped |
| bribe, sbribe, sthreat | mc | mapped |
| trip, batnat, uyhiep, steal, petsteal, thaopet, block, blockf, ksab, rumor, lygian, story | uh | mapped |
| il, illbuy | il | mapped |
| vp (deedOnce, over-rank dress) | vp | mapped |
| ls (jkh.js:70, sổ Kính sự phòng lệch ngày) | — (not in `BAL.charge.deed` → falls back to bm) | GAP → FOR FOREMAN D 2 |
| mlbeat, ml<k> (jmline.js:60/98, maid-line acts) | — (falls back to bm) | GAP → FOR FOREMAN D 2 |
| rash (Bỏ phấn lạ, jrash.js:51) | — | NO deed record → FOR FOREMAN D 1 |
| xa xỉ (seen state xxCause, jdress.js:96) | — | NO deed record → FOR FOREMAN D 1 |
| laydo / laydol (jlost.js:279/281) | — | NO deed record → FOR FOREMAN D 1 |
| tat, phatquy, nuoc / tea / ink (jface.js:177/183, jlooks.js:147) | — | NO deed record → FOR FOREMAN D 1 |

**FOR FOREMAN D (D4 owner; facts + proposals, no owner ask, no second table):**
1. Four families leave no deed today, so no piece can ever exist for them (law 6a): rash, xa xỉ, laydo / laydol, tat / phatquy / nuoc / tea / ink. Proposal: add them to DEEDW (xa xỉ as a deedOnce scan like vp) and map rash → hd, xa xỉ → vp (D4 already names the charge «Vượt phẩm xa xỉ»), laydo / laydol → uh (beside steal / petsteal), tat / phatquy / nuoc / tea / ink → uh.
2. ls and mlbeat / ml<k> are recorded but not in `BAL.charge.deed`, so `chOfDeed` sends them to bm. Proposal: ls → tt (the same proof as pm), mlbeat → uh, ml<k> by its own kind.
3. «Who hears the charge» (today's Trình Thái hậu / Trình Hoàng hậu, and Hoàng thượng for the gravest) has no field in D4. This report keeps it only as the P11 «who hears it» choice; D4 decides whether the hearer changes anything (the sentence stays `pun`).
4. The merged P11 needs `chReady` per charge to list its rows; no new number.
5. Fixer's judgement on two map lines (D4 decides; no second table kept): pushp «Đẩy xuống hồ sen» can drown (chết đuối) like pond → mh may fit better than hd; phonghoa «Phóng hỏa kho đồ» burns objects, not a body or face → uh (or its own row) may fit better than hd.

### 4.2 Find odds per search = D4 (built; OD 26/11 ~05:15Z «D4 A», formula canon ~05:25Z, overwritten in place ~05:35Z)
Her rule (OD ~04:15Z (3)): each charge needs its OWN pieces of ITS OWN kind (never a total), every piece findable, heavier crime → harder to find, two-way. Built as `chFind` (jcharge.js) with every number in `BAL.charge`:
1. crime base — the charge's `band` (lighter easier, heavier harder; vp 6 … tt 1, index into BAL.odds.cut);
2. MAIN factor = the MASTER's mind: HER Tâm cơ (NPC masters the same) vs the target's Tâm cơ — ±1 odds step per `BAL.charge.tcStep` (20) points, cap ±2 (`tcCap`) («every search is sent (sai người), but the master's mind decides»); the sent servant's own skill is a SMALL factor only (±1 step at the extremes: sharp & bậc ≥ `srvHi` / timid & bậc ≤ `srvLo`; never decisive; a clumsy servant can be caught → exposure risk, existing rules);
3. GUARD = the TARGET's room only: low ranks 0, Cung chủ (rank ≥ `guardRk` 5, Phi+) −1 step (`guard`);
4. TAI MẮT (the existing stat): total ≥ `BAL.charge.matMid` (2) +1 step, ≥ `matHigh` (4) +2; a planted eye in the target's palace +1 (`plantB`); total bonus cap +2 (`eyeCap`); Tai mắt also warns her when someone searches HER (`warnMat`, two-way defence);
5. each miss +1 step on the next search of that charge (`missStep`, cap `missCap`; reset on a find — every piece findable).
Shown in plain words per search: «Tìm chứng: <odds word> · tâm cơ hơn / kém · phòng canh nghiêm …» (odds words BAL.odds.cut, no %). Every P5 Dò la way reads this one formula (no number of its own, law 4); the Tố cáo list shows a charge once its own pieces reach `need`.

---------------------------------------------------------------------------------------------------------------------------------

## 5. KHẮC BUDGET — how many acts fit 16 khắc, across all places

Costs today: Hành sự card mean 1.8 khắc (range 1–4); talk 1; person act 2; walk 1–2 (mean 1.84); Tư trang inspect 2; Tài nghệ study 2; Hoàng tự 2. Sức also caps: any act >1 khắc needs Sức ≥5 (`BAL.time.sucMin`), most cost Sức −4…−20 of 100.

| Day shape | khắc used | acts done |
|---|---|---|
| Morning duties: Điểm trang 1 + Thỉnh an (one or both) 2–4 | 3–5 | 2–3 |
| Stay home all day (Hành sự / Tư trang / Tài nghệ only), mean 1.8 | 16 | **8–9** |
| One outing: walk 2 + 2 talks (1) + 1 person act (2) + walk back 2 | 8 | 3 |
| Typical day = duties + one outing + home acts | 16 | **6–8** |
| Busy day = duties + two outings | 16 | 5–6 |

So a day holds **6–9 actions in all places together**; a week far fewer than the 111–128 buttons offered for one rival. Recommendation:
- **Hành sự ≤ 16 cards** (§3.2 gives exactly 16): about two days' worth, so every day is a real choice and every card can be met within a week.
- **Person card / pop-up ≤ 12 buttons** (§3.1), harm families as ONE button with nhẹ / vừa / nặng inside.
- **Any one screen ≤ 16 buttons**; Tư trang ≤ 4 acts, Cung nhân ≤ 6, Tài nghệ 1 «Học» per art.
- Keep khắc prices as they are per way (no balance change in this report); the event-pacing cap per day is FOREMAN D's job (OD 26/11 job 3) and should count the same 6–9 act budget.

**Pets in the budget (fix r1 item 6; OD 26/11 ~04:25Z ruling (4), MAIN 152 04:27Z).** Today one pet costs ~3 khắc a day to hold its bars (§1.4: three 1-khắc games against a weekly decay that lands every play-day); two pets ~6 — a third of the day, so she skips them. Her ruling (OD 26/11 ~05:45Z, canon, «Trò chăm thú cưng và tưới cây giữ như cũ và option chăm nhanh như học nhanh hoặc giao người chăm»): the care and watering minigames STAY as today; two new ways sit beside them for every pet and plant. So the choice is no longer between merge options — it is three ways inside ONE door per pet / plant, she picks each day:
| way (inside «Chăm thú» / «Chăm <cây>») | how | khắc a day | what she gets |
|---|---|---|---|
| Tự tay chăm (as today) | Cho ăn · Tắm, chải lông · Chơi, each its minigame (BAL.pet.khac 1 each); plants: the watering game (BAL.shelf.plant.khacSelf 1) | ~3 per pet (as today, §1.4) · 1 per plant | the full gain (BAL.pet.gain by score) + Tình cảm (BAL.pet.affGain) |
| **Chăm nhanh** (new) | one tap, odds Tùy duyên (the BAL.skip.od pattern of Học nhanh), fills No · Sạch · Vui at a lower result than playing | ≤1 per pet · ≤1 per plant | a smaller gain, little or no Tình cảm (the price of not playing, law 2) |
| **Giao người chăm** (new name for today's «Giao <cung nữ> chăm» + the plant servant care) | a servant cares, passive, by that servant's skill (pets: BAL.pet.maidEff / maidW; plants: BAL.shelf.plant.srvBase …) | 0 | bars held or slowed by the servant's skill; no Tình cảm; a clumsy servant does worse |
Budget: one pet + one plant = 0 khắc (giao người) · ~1–2 (chăm nhanh) · ~4 (tự tay, as today) — so a day of 6–9 acts can hold her pets without the «không có thời gian» she felt, and playing stays a real choice. The «≤16 Hành sự / ≤12 person / ≤16 any screen» numbers above stand. New numbers (Chăm nhanh result, Giao người chăm cost / renewal) go into BAL.pet / BAL.shelf.plant — FOREMAN D's D5 builds them (MAIN 152 routed OD ~05:45Z to D5); this report invents none (law 4).

---------------------------------------------------------------------------------------------------------------------------------

## 6. RELATIONSHIP VISIBILITY

Her ask (03:55Z): every act/result touching a person shows the change AND the new total, e.g. «Hoàng hậu thiện cảm +8 (42)»; Hậu cung numbers lighter.

**CANON OVERWRITE flag (law 14):** KIT §7.1 (owner 24/11 ~21:57Z) says person lines are «<Tên>: thiện cảm +8» and NEVER «(5→13, +8)»; test dev/test/viecnho-fix.test.js fails any «(±N)». Her 26/11 words add the TOTAL in brackets. Recommendation: the new kit row «<Tên>: thiện cảm +8 (42)» — the bracket holds the new total only (no arrow, no repeated delta), so it keeps the 24/11 «short» intent; KK37 changes §7.1 IN PLACE and the test (allow an unsigned total; a negative total written «(−4)»). Same for every person number in the result card (oán, ghen, quý ngươi, Chủ tin, maid thiện cảm) and in act-card Được/Mất rows where a person number moves.

Mock (fix r1, kit parts only: the live result card with the total appended in the page; no new part; script `dev/test/dup-report-shots.js`, numbers in `dev/handover/shots/dup-report/facts-r1.json`): a real «Thỉnh an Hoàng hậu» on LIVE f009e1a6, then the total READ from game state after the act (aff(Hoàng hậu, ta) = the thiện cảm the line reports): Fold 755x1000 `after-result-fold.webp` «Hoàng hậu Chân Tử Đàn: thiện cảm +6 (1)» — she started at −5, −5 + 6 = 1; iPad 1180x820 `after-result-ipad.webp` «Hoàng hậu Cao Ngọc Nhu: thiện cảm +2 (−3)» — started −5, −5 + 2 = −3 (the r0 «+5 (0)» was the same sum from −5; now every total is explained in facts-r1.json: before · delta · after). Totals can be negative (range BAL.linkRange.rl); a negative total is written «(−3)». `before-result-*.webp` = the same card without the bracket. A random event card (Kỳ ngộ) that queued after the act was hidden for the shot. Looked at all: one line each, no wrap on Fold, the bracket reads as part of the row.

**News sieve vs relationship visibility (OD 26/11 ~04:40Z, refined in place by ~05:05Z; one paragraph, no conflict).** The sieve now works in TWO places: (a) **Tin báo** (the daily feed) = news about HER + the big harem harm still reported («ai mưu hại ai»: poison, hủy dung, framing, lãnh cung …), no small NPC↔NPC drama lines; (b) **Sổ ghi** keeps the FULL harem record of every NPC↔NPC event with cause, doer and victim (e.g. who cut whose face, and why), readable any time — nothing is lost, only moved out of the feed; the monthly summary (every 4 weeks: who now likes / dislikes whom, net thiện cảm per pair in the same kitRel words Thù · Ghét · Thường · Quý · Thân, e.g. «Lệ tần ghét Hiền phi hơn: −12») is an EXTRA on top; nết is shown from the start. None of this touches the result rows of HER OWN acts: «+8 (42)» stays on every result card where a person's number moves because of her act or an act ON her (news about her). The lighter Hậu cung view below shows the current word + one number, so she never needs the daily drama lines to know where she stands.

**Lighter Hậu cung view** (recommendation, build after her pick, kit parts kitRel / chip / kpPop only): the consort card head shows ONE line per person — the relation word in the kitRel colour from the existing thresholds (`netTh`: Thù · Ghét · Thường · Quý · Thân) + the one number «Thiện cảm 42»; Oán and Ghen appear as a chip ONLY when past their threshold («Ghen ngươi», «Oán ngươi»); every other number (tin, quý, phe, Chủ tin) moves into the «!» popover. On the Phi tần strip, each face gets the same coloured word under the name, so she sees who is friend / foe without opening a card.

---------------------------------------------------------------------------------------------------------------------------------

## 7. RECOMMENDATION PER GROUP (for her pick)

OD 26/11 ~05:55Z (2) (standing rule): MAIN applies its own recommendations at once and tells her in one line; so MAIN (now MAIN CHÍNH 153) may take these ADOPT lines as its recommendation and order the builds without waiting, she can overrule. Nothing in this table changes a working owner rule except the §6 «+8 (42)» row, which rests on her own 26/11 words (CANON OVERWRITE flag).

| Group | Recommend | Why |
|---|---|---|
| Hãm hại thân (P7) | ADOPT: nhẹ Hất trà · vừa Hủy dung · nặng Hạ độc | her examples; richest outcomes kept; 12 → 1 button |
| Hạ uy thế (P8) | ADOPT: Tung tin · Rút thẻ bài · Vu oan | the rank harm she asked for = Vu oan (one rank down, defence exists) |
| Hại hoàng tự (P9) | ADOPT: Phá việc học · Bỏ xạ hương · Hạ độc con nàng | gravest family, only shown when there is a child |
| Lấy của (P10) | ADOPT: Ép nộp · Lấy trộm · Phóng hỏa | real-object law already wired (jlost) |
| Khiêu khích (P6), Ra uy (P14) | ADOPT | in-person face acts, tiny |
| Gặp / Trò chuyện / Giao hảo / Dò la (P1–P5) | ADOPT one button each, way inside | her exact «Xem sổ» pattern |
| Tố cáo + Mặc cả chứng cứ (P11–P12) | ADOPT on D4's 9 built charges (BAL.charge, §4) | her 03:45Z rule; D4 already carries the kind per charge; 4 deed records + 2 map lines FOR FOREMAN D (§4.1) |
| Hành sự 38 → 16 (§3.2) | ADOPT | ≤16 as she leans; 6–9 acts/day |
| Relationship «+8 (42)» | ADOPT, KK37 kit row + §7.1 overwrite | her words; one line |
| Lighter Hậu cung view | ADOPT, mock after pick | — |
| Cung nữ road (§1.3) | ADOPT S1–S5 (Phận sự 13 a day / 23 in code → 5, +1 while bought) · pop-up with her chủ 5 → 3 · Phản chủ · Đồng liêu 4 → 3 | counted in fix r1 + r2 (every card and pop-up act homed, §3.4); same 8 tabs as the consort, so the merge carries over |
| Pets + plants (§5) | ADOPT her ~05:45Z rule: ONE «Chăm thú» / «Chăm <cây>» door, ways = tự tay chăm (the minigames stay) · Chăm nhanh (one tap, Tùy duyên) · Giao người chăm (0 khắc) | 3 khắc/day per pet today; with the two new ways 0–1 |

Build order after her pick (each a review/* topic, whole family, Fold+iPad): (1) KK37 kit row «+N (total)»; (2) person-act merge P1–P14 with the chooser dialog (one engine for card + pop-up + NPC); (3) Tố cáo by charge on D4's built BAL.charge + the FOR FOREMAN D deed records / map lines (§4.1); (4) Hành sự 16; (5) other tabs + pets + cung nữ S1–S5; (6) lighter Hậu cung view. Minigames inside any way follow her D5 picks (OD ~05:10Z): chance-deciding games stay, tát/né one tap, Điểm trang one tap + «Tự tay điểm trang», Học nhanh = Tùy duyên with no product; pet care + plant watering keep their games and add «Chăm nhanh» + «Giao người chăm» (OD ~05:45Z) (§3 header, §5).

**Self-search spyk — RULED (MAIN CHÍNH 153, 26/11 06:00Z, applying OD ~05:35Z «every search is sent (sai người)»):** LIVE f009e1a6 ACT `spyk` «Tự đi dò la» (jecon.js:175: no bạc, dễ lộ hơn, odds oSpy − BAL.selfMinus) FOLDS into «sai người» — P5 has no self-search way (3 ways: sai cung nữ thân tín · sai tai mắt · mua chuộc cung nữ của nàng), every way read by the D4 formula (her Tâm cơ main factor). The cung nữ card «Tự đi dò la cho chủ» (jagknow.js:265) stays: there she IS the servant sent.
