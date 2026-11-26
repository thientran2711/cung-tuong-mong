# HÀNH SỰ MERGE — feature duplication audit + merge design (E97, REPORT ONLY, no build until sếp picks)

PRIORITY #1 CHECK ('trùng lặp|gộp|dedupe|merge report|dup-report'): OD 19 | ledger 0 | claims 8 | main 15 | review/* 2 (review/act-dedupe-r1 = the 16/11 wave-1 dedupe, already landed) | archive 43.
Reused: the 16/11 rulings (OD «Hành sự = VIỆC, Hậu cung = AI, Dư đồ = ĐI ĐÂU»; «acts that need no meeting are Hành sự cards»; «a person met on Dư đồ opens a pop-up with buttons right there, never jumps to Hậu cung»; «each thing lives in ONE place»), the act-dedupe deck bot (dev/test/act-dedupe-deck.js), the act-audit harness (dev/test/act-audit.js), the true-evidence ledger (jtruth.js deeds), KIT §7.1 result rows. Nothing here changes those rulings; where her 26/11 words overwrite an older rule it is flagged «CANON OVERWRITE».

Owner words (26/11 ~01:25Z, ~03:40Z, ~03:45Z, ~03:50Z, ~03:55Z) are pasted verbatim in dev/handover/briefs/E97-dup-report.md and dev/OWNER_DECISIONS.md (last rows). This file is the detailed design; dev/handover/reports/dup-report.md is the short report with the Vietnamese table for sếp.

Measured on origin/main 5e013076 (built index.html), consort road, scenarios đầu game / phẩm cao / có con / Hoàng hậu (AA.scen), 24 seeds × 3 buổi for the deck. Scan scripts: `node dev/test/act-dedupe-deck.js file://…/index.html out.json 755x1000@1` (deck union) and `node dev/test/dup-report-scan.js out.json` (every panel incl. hidden group panes + every person met in Dư đồ via dfActs). Servant (cung nữ) road not counted here — second pass if she wants it.

---------------------------------------------------------------------------------------------------------------------------------

## 1. COUNT TODAY — every khắc-costing act, by place

Time: `BAL.time` = 4 khắc × 4 buổi = **16 khắc / day**; talk 1 khắc, talk-act 2, harm 2 (`BAL.time.cost`); a walk on Dư đồ = `travel()` 1–2 khắc (mean 1.84 between any two places; from her palace: 1 to Kính sự phòng / Lãnh cung / Nội vụ phủ, 2 elsewhere).

| Place | Buttons today | Notes |
|---|---|---|
| Hành sự deck (j2 deal + jact/jact2/jcycle/j83 cards) | **31** distinct cards (7 «Lối riêng»), + Mệnh truyện card + road cards (jroute rtCard: «Tâu xin nghiệm thân …», «Truyền … vào cung», «Cắt đứt với …») when open | mean 1.8 khắc/card |
| Hậu cung › Phi tần, ONE consort card (j15 rvCard/rvGroups + later modules) | **51** (Gặp mặt 5 · Giao thiệp 3 · Dùng chứng cứ 8 · Hại nhỏ 12 · Hại nặng 16 · Sát hại 7), +4 child acts when she has a child, +3 «Quyền Hoàng hậu» at rank 7 → up to **58** | shot: before-hc-fold / before-hc-ipad — tab counts «Gặp mặt 3/5 · Giao thiệp 2/3 · Dùng chứng cứ 0/8 · Hại nhỏ 7/12 · Hại nặng 12/16 · Sát hại 3/7» |
| Dư đồ › a consort met in person (stage pop-up / kitFocus, j2 talkOpts + jdf dfInPerson) | **32** (Giao thiệp 25 incl. Tát/Hắt nước/Hắt trà/Quạt mực, Hại người 4, Mưu kế 2, Trừng phạt 1) | many are the same act as a Hậu cung card button |
| Dư đồ › her maid / a servant / an elder | 4 / 10 / 2 | maid «Sai đi dò la» + «Nghe ngóng chung» = the Hành sự cards again (shared doors) |
| Hậu cung › Cung nhân tab | 9 | hire ×2, cài người, thân cận, phòng bị, thưởng, phạt, đề bạt, sai hỏi, đổi người |
| Tư trang | 6 | tìm thú nuôi, mua đồ (Nội vụ phủ), kiểm tra đồ (2k), mua lén ngoài cung, hối lộ Thái y viện, chợ đen, xin đồng minh |
| Hoàng tự | 5 | dạy văn, dạy lễ, mời thầy, hầu hạ, phòng hại con |
| Tài nghệ (per art) | 3–4 | Tự học / Học với thầy / Học với Thái hậu / Phát bạc (= the Hành sự card again) |

**Total a player meets for ONE consort rival: 31 deck + 51–58 card + 32 in person ≈ 115–120 buttons**, against a day of 16 khắc (§5: 6–9 acts a day). This is the «quá nhiều nút, trùng lặp» she felt.

### 1.1 The ACT table (j8 `ACT`, the person acts; NPCs use the same table — two-way law)
55 entries. file:line of each definition (latest override wins):

| key | name | file:line | group today | khắc | real outcome (short) |
|---|---|---|---|---|---|
| spy | Dò la | jroute.js:329 (j8.js:118) | Hại nhỏ | 2 | 1 true evidence (a real deed) or harmless knowledge |
| spyk | Tự đi dò la | jecon.js:175 | Hại nhỏ | 2 | same, she goes herself |
| bribe | Mua chuộc cung nữ | jroute.js:324 | Hại nặng | 2 | maid takes/tells/refuses; tai mắt or +2 evidence |
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
| giahoa | Giá họa trộm đồ | j92.js:356 | Hại nặng | 2 | tội ăn trộm: Danh −10, Sủng −6, cấm túc 3 tháng |
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

### 1.2 Hành sự deck today (31 cards, consort road)
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

Inside-act chooser = the existing kit option dialog (kitOptFinal option cards, §6.2b) — no new kit part. Ways that need a person (sai cung nữ / sai tai mắt) also set the parallel-time «chờ n khắc» (jptime) exactly as today; ways she does herself in person keep their mini-game (DELEGATE-NOMG rule, jdf).

### 3.1 Person acts (Hậu cung consort card AND the Dư đồ pop-up of a consort) — 51–58 (+32) → 12

| # | Merged button (cổ trang) | Old buttons folded in | Ways inside | Tiers (ONE act each) | Consequences kept (examples) |
|---|---|---|---|---|---|
| P1 | **Gặp nàng** | Đến cung nàng ta thăm, Mời nàng ta sang cung, Sai tai mắt dò nơi ở, Ghé chơi, Chào hỏi | tới tận cung nàng (2 khắc) · mời nàng sang (1 khắc, chờ 2) · sai tai mắt dò nơi ở (1, chờ 2) | — | nàng ở nhà → gặp mặt; nàng nhận lời / ghé cho có / từ chối (quý nhau −3) / đem chuyện đi kể; biết nàng ở đâu |
| P2 | **Trò chuyện** | Chào hỏi, Hỏi han sức khỏe, Khen tài nghệ nàng, Rỉ tai chuyện trong cung, Bàn tán về X (one per person!), Chia sẻ bí mật, Thử lòng, Cảnh báo nàng | chọn chuyện: hỏi han · khen tài · rỉ tai tin · bàn về một người (chọn người trong danh sách) · chia sẻ bí mật · thử lòng · cảnh báo | — | each topic keeps its own odds and result line (thiện cảm, tin nghe được, nàng biết bí mật, lộ lòng nàng) |
| P3 | **Giao hảo** | Kết giao, Tặng quà, Giúp chăm thú nuôi của nàng, Giúp đỡ nàng, Nhờ giúp đỡ, Mượn son phấn | kết giao (Bạc) · tặng quà (chọn món) · giúp một việc (chăm thú / giúp đỡ) · nhờ nàng (giúp / mượn son phấn) | — | thiện cảm +, bớt oán/ghen; nhận / giữ khoảng cách / trả lễ / mách (receiver choice jrcv) |
| P4 | **Cùng chơi / Thách đấu** | Cùng chơi, Thách đấu | chơi cho vui · đặt cược | — | quý nhau / lấy cược (jpma, unchanged) |
| P5 | **Dò la** | Dò la, Tự đi dò la, Sai đi dò la (maid), Mua chuộc cung nữ, Sai cung nữ thân tín lấy lòng | tự đi (Sức, có mini-game) · sai cung nữ thân tín (chờ) · sai tai mắt (Bạc) · mua chuộc cung nữ của nàng (Bạc lớn, maid chooses) | — | a REAL deed found (spyFind: «tìm ra chuyện nàng …») with its KIND (§4) or harmless knowledge (giờ giấc, sở thích); bribe: maid becomes tai mắt or +2 evidence; refuse costs nothing |
| P6 | **Khiêu khích** (lời nói, tại chỗ) | Khiêu khích, Hạ nhục, Khoe quà ngự ban, Trút giận | — | nhẹ **Khoe quà ngự ban** · vừa **Khiêu khích** · nặng **Hạ nhục** | nàng ghen / tâm trạng xấu / Danh nàng −; nặng: nàng oán sâu, ta Đức − |
| P7 | **Hãm hại** (thân, dung nhan, tính mạng) | Hất trà, Hắt nước, Quạt mực, Tát, Ngáng chân, Bỏ phấn lạ, Hủy dung, Thả thú dữ, Hạ độc, Hạ độc dần, Tặng quà ăn có độc, Đẩy xuống hồ sen | way: tự tay tại chỗ (mini-game swipe / tug) · sai người (no game, odds) · mua chuộc người của nàng | nhẹ **Hất trà** · vừa **Hủy dung** · nặng **Hạ độc** | nhẹ: áo loang trà, phấn son lem, rát da → Sắc giảm tới khi điểm trang lại (the nước/mực/tát/ngáng chân results fold into this one: «mất mặt giữa chốn đông người, Danh nàng −3»); vừa: vết sẹo/mẩn → Sắc giảm tới khi lành (rash 1–4 tuần, scar longer: the tier rolls light/deep); nặng: trúng độc / thập tử nhất sinh / chết; lộ: ban rượu độc (unchanged) |
| P8 | **Hạ uy thế** (danh, sủng, phẩm vị) | Tung tin đồn, Ly gián, Rút thẻ bài, Nhờ ơn người quen rút thẻ bài, Xin Hoàng hậu giáng, Vu oan, Cài đồ vào rương, Giá họa trộm đồ | way (for vừa): lót tay Kính sự phòng · nhờ người quen; way (for nặng): bùa ngải · cài đồ cấm · giá họa trộm | nhẹ **Tung tin đồn** · vừa **Rút thẻ bài** (Sủng) · nặng **Vu oan** (giáng phẩm) | nhẹ: Danh nàng −8; vừa: 2 tuần không được lật thẻ / Sủng −10 (ly gián kept as the «nhờ người quen nói xấu» way); nặng: nàng bị tội theo vật cài (bùa → vu cổ, đồ cấm → tàng trữ, trộm → cấm túc 3 tháng, Danh −10, Sủng −6) and ONE rank down; victim defends (frameDef) and a cleared frame exposes the framer |
| P9 | **Hại hoàng tự** (only when she has a child / is with child) | Phá việc học, Bỏ xạ hương, Mua chuộc bà đỡ, Hạ độc con nàng, Đẩy con nàng xuống hồ, Vu con nàng trù ẻo, Xin bế con nàng về nuôi | way: sai người · mua chuộc bà đỡ / thái y | nhẹ **Phá việc học** · vừa **Bỏ xạ hương** · nặng **Hạ độc con nàng** | Tài con −15 / sảy thai / con trúng độc (chết: khả năng thấp); «Xin bế con về nuôi» moves to Quyền Hoàng hậu (it is a ruling, not a harm) |
| P10 | **Lấy của** (đồ, thú nuôi) | Sai người lấy trộm đồ, Sai cung nữ thân tín lấy đồ, Ép nộp của, Trộm thú nuôi, Hại thú nuôi, Phóng hỏa kho đồ | way: sai người · cung nữ thân tín · ra uy đòi (in person) | nhẹ **Ép nộp của** · vừa **Lấy trộm đồ** · nặng **Phóng hỏa kho đồ** | real objects move (law 6c): món quý về tay ngươi / bạc nộp / 1–2 món cháy; pet theft/harm fold into vừa (the stolen thing may be a pet) |
| P11 | **Tố cáo** | Tố giác, Tố tội thật, Bóc chuyện tư tình, Tố xa xỉ, Hặc ăn mặc sai phẩm, Trình Thái hậu, Trình Hoàng hậu, road card «Tâu xin nghiệm thân …» | choose the CHARGE (only kinds she holds real evidence for, §4) · choose WHO judges (Hoàng thượng / Hoàng hậu / Thái hậu — same as today's trình) | — | §4 table: each charge its own reason text, judge, sentence and the false-accusation price |
| P12 | **Mặc cả chứng cứ** | Uy hiếp đòi bạc, Bán cho phe khác, Trả chứng cứ lấy lòng | đòi bạc · bán cho phe · trả lại lấy lòng | — | Bạc +60 / phe kia thiện cảm +8 và nắm chứng cứ / Đức +2, nàng quý |
| (P13) | **Quyền Hoàng hậu** (rank 7 only) | Xử tội, Tịch thu trang sức, Ban thưởng, Ân xá, Xin bế con nàng về nuôi | xử theo chứng cứ · tịch thu · ban thưởng · ân xá · bế con về nuôi | — | unchanged numbers |
| (P14) | **Ra uy** (rank power, in person) | Phạt quỳ, Tát | — | nhẹ **Tát** · vừa **Phạt quỳ** | dấu tay / Sức −8, đi chậm 1 tuần; needs higher rank (kept lock) |

Count: P1–P12 = **12** for any consort (+P13 Empress, +P9 only with a child; P14 only to a lower rank) — from 51–58 on the card and 32 in the pop-up. «Tranh sủng / Chặn ngự giá» are not person acts on her: they move to the Hành sự «Tranh sủng» card (§3.2 H9).

Why these tier picks: nhẹ Hất trà = her own example, has the richest result (stain + burn + face); vừa Hủy dung = her example, the scar keeps the deepest content (Sắc until healed); nặng Hạ độc = the oldest, most complete act (antidote, death, ban rượu độc if caught); Hạ uy thế nặng = Vu oan because it already has the defence/exposure system (jtruth) and the «one rank down» she asked for; Hại hoàng tự vừa = Bỏ xạ hương (classic genre act, clean outcome: sảy thai).

### 3.2 Hành sự deck — 31 → 16

| # | Merged card | Old cards folded in | Ways inside (khắc / cost kept per way) |
|---|---|---|---|
| H1 | Điểm trang | — | (dress picker) |
| H2 | **Nghỉ ngơi** | Nghỉ ngơi một lát, Nghỉ ngơi dưỡng sức, Dưỡng nhan | chốc lát (1) · cả buổi dưỡng sức (4, Bạc −3) · dưỡng nhan (2, Bạc −30) |
| H3 | **Cáo bệnh** | Giả bệnh, Xin rút thẻ bài đóng cửa tĩnh dưỡng | giả bệnh xin thương (1, Đức −3; lộ: Danh −6, cấm túc 2 tháng) · đóng cửa tĩnh dưỡng (1, Sủng −10) |
| H4 | **Thỉnh an** | Thỉnh an Thái hậu, Thỉnh an Hoàng hậu | Thái hậu (2) · Hoàng hậu (2) — morning only, each once a day |
| H5 | **Bắt mạch** | Mời thái y bắt mạch, Sang Thái y viện xin bắt mạch | mời đến cung (1 + chờ 2, Bạc −8, kín) · tự sang Thái y viện (3, Sức −5, thái y khó nói sai, người khác thấy) |
| H6 | **Xem Sổ Kính sự phòng** (her example) | Xem sổ nguyệt sự, Xem lén sổ nguyệt sự (+ the Kính sự phòng place shortcut) | sai người lót tay thái giám (1, Bạc −14) · lén xem khi hầu chuyện Tổng quản (2, Sức −4, có thể bị bắt gặp) · tới tận nơi (walk + 1) |
| H7 | **Đọc sách** | Đọc sách giải khuây, Đọc binh thư sử sách | giải khuây (1, Sức +2) · binh thư sử sách (2, Sức −5, Tâm cơ +) |
| H8 | **Dâng tài nghệ** | Múa trong yến tiệc, Kinh hồng vũ, Đánh cờ với Hoàng thượng | đánh cờ với Hoàng thượng (2) · múa trong yến (4) · Kinh hồng vũ (4, when learned) |
| H9 | **Tranh sủng** | Hối lộ Kính sự phòng (lật thẻ), Tranh sủng, Chặn ngự giá | lót tay Kính sự phòng (2, Bạc −30: 2 tuần dễ lật thẻ hơn một bậc) · chặn ngự giá · cướp đêm của người khác |
| H10 | Cầu tự ở Phụng Tiên điện | — | — |
| H11 | **Tai mắt** | Sai cung nữ đi dò la, Nghe ngóng chung, Cài tai mắt | dò một người (= P5 Dò la, same act) · nghe ngóng chung (1 + chờ 2) · cài tai mắt mới vào cung khác |
| H12 | Trò chuyện với cung nữ | — | — |
| H13 | Phát bạc cứu giúp cung nhân nghèo | — (shared door with Tài nghệ, one lock, kept) | — |
| H14 | **Rời cung** | Nghĩ cách trốn, Dâng biểu xin xuất gia, Xin ban hôn cho Vương gia, Xin về quê phụng dưỡng cha mẹ, Nhờ Thái hậu nói giúp | trốn · xuất gia · ban hôn (when the road is open) · về quê; «nhờ Thái hậu nói giúp» = a helper step inside the petition ways |
| H15 | Để ý nam nhân | — (men road) | — |
| H16 | Giả mang thai | — | — |
| + | Mệnh truyện (only when a beat is open) · road cards | — | the «Tâu xin nghiệm thân» road card becomes the «lệch sổ Kính sự phòng» charge inside P11 Tố cáo (one door) |

**16 base cards** (she leans ≤16), 17 on a day a Mệnh truyện beat is open.

### 3.3 Other tabs (same pattern, small)
- Tài nghệ: «Tự học / Học với thầy / Học với Thái hậu» → ONE **Học** per art, way inside (3 → 1 per art).
- Cung nhân: «Thêm cung nữ / Thêm thái giám» → **Thêm người hầu** (way: cung nữ / thái giám); «Thưởng / Phạt / Đổi người / Đề bạt» → **Thưởng phạt** (way inside); «Sai hỏi / Giao việc phòng bị / Chọn thân cận» stay (3 different jobs) → 9 → 6.
- Tư trang: «Nhờ thái giám mua đồ / Sai cung nữ mua lén ngoài cung / Chợ đen cửa Thần Vũ / Hối lộ người Thái y viện (thuốc)» → **Mua đồ** (way: Nội vụ phủ · mua lén ngoài cung · chợ đen · Thái y viện) → 7 → 4.
- Servant + maid pop-up: «Sai đi dò la / Nghe ngóng chung» = the H11 card (one act); «Phạt vô cớ / Thưởng vô cớ / Đổi người» → Thưởng phạt.

---------------------------------------------------------------------------------------------------------------------------------

## 4. EVIDENCE → ACCUSATION BY KIND (her 03:45Z rule)

Today: evidence is a COUNT per holder (`evG`, j8.js:37) backed by a true deeds ledger (jtruth.js `p.wrongs` with kind `k` and text `x`); «Tố giác» needs 2 (4 against the Empress) and gives a generic «nàng bị phế hoặc giáng»; «Tố tội thật» / «Bóc chuyện tư tình» / «Tố xa xỉ» / «Hặc sai phẩm» / road «Tâu xin nghiệm thân» exist but are separate, hard-to-find buttons, and she only ever met the nghiệm thân one. The deeds ledger already knows WHAT each piece proves — the build only has to carry the kind to the accusation.

Design: P11 **Tố cáo** lists only the charges her evidence really supports (a deed of that kind found by Dò la, a witness, an object, a record). Each charge = its own reason line built from the deed text, its own judge, sentence and the price of a false charge. Evidence of a kind counts only for its own charge (2 pieces of «xa xỉ» never prove «mưu hại»).

| Evidence kind (deed keys in jtruth) | How it is found (real proof, law 6a) | Charge (button inside Tố cáo) | Reason text shown (example) | Judge | If it holds | If it fails (false charge) |
|---|---|---|---|---|---|---|
| poison, slowpoison, pgift, pushp, caught, plot | Dò la / bribed maid / Thái y finds poison (Bắt mạch «mưu hại ngầm») / the gói thuốc item | **Tố mưu hại phi tần** | «Cung nữ Bích Ngân khai Lệ tần sai bỏ thuốc vào chén yến của Quý nhân Tô; gói thuốc còn trong rương nàng.» | Hoàng thượng (Hoàng hậu nghe trước) | lãnh cung (≥ several days, OD 26/11 job 2) or ban chết for a death; Danh ta + | ta giáng một bậc, Danh −, nàng oán sâu |
| musk, catswap, kpoison, pond, ksab | bà đỡ / thái y witness, xạ hương item, a child's illness traced | **Tố mưu hại hoàng tự** | «Thái y nghiệm ra xạ hương trong túi thơm Đức phi tặng; bà đỡ khai bị mua chuộc.» | Hoàng thượng + Thái hậu | phế vị / ban chết (gravest) | ta lãnh cung (phạm thượng nếu là Hoàng hậu) |
| frame (bùa), kframe | hình nhân bùa ngải found (a real item), a witness to the burying | **Tố yểm bùa (vu cổ)** | «Trong gối của Hiền phi có hình nhân viết bát tự của Hoàng tử, kim chỉ của cung nàng.» | Hoàng thượng + Thái hậu | phế vị, lãnh cung | ta mang tội vu cáo: giáng một bậc, cấm túc |
| huydung, thathu, rash, trip | the rash powder box, the beast keeper, a witness | **Tố hại dung nhan** | «Hộp phấn của Thục tần có bột lá ngứa; cung nữ nàng khai ai đổi hộp.» | Hoàng hậu | giáng một bậc + cấm túc 1 tháng + bồi thường thuốc | ta Danh −, phạt bổng |
| tryst, flirt, mangift, expose | a letter, a meeting seen, a man's gift (real item) | **Tố tư thông** (= Bóc chuyện tư tình) | «Thị vệ canh cửa Thần Vũ thấy Lan quý nhân gặp Thế tử lúc canh ba; bức thư có nét chữ của nàng.» | Hoàng thượng | ban chết or lãnh cung (first year once spared: giáng một bậc, cấm túc 3 tháng — kept) | ta tội vu khống: giáng một bậc |
| pm, ls (thai không khớp sổ / sinh lệch ngày) | Sổ Kính sự phòng (H6) + Thái y | **Tâu xin trích huyết nghiệm thân** (kept: the blood-test flow jroute) | «Sổ Kính sự phòng không ghi đêm nào của Mẫn tần trong tháng nàng thụ thai.» | Hoàng thượng (trước lục cung) | blood test: không hòa → nàng bị trị tội | hòa → ta mang tội vu cáo |
| xx (spending over allowance) | seen in person / Dò la: dress or goods beyond her rank's allowance | **Tố xa xỉ** | «Quý nhân Hà dùng chén ngọc và gấm Tô Châu vượt bổng lộc phẩm Quý nhân ba tháng liền.» | Hoàng hậu | quở: Đức −2, Danh −4, tháo món xa xỉ nhất, cắt bổng lộc | ta Danh −2, bị chê nhiều chuyện |
| vp (dress/ornament above rank) | heard a remark / tai mắt reports | **Hặc vượt phẩm** | «Đáp ứng Trần cài trâm phượng chín đuôi, chỉ Phi trở lên mới được dùng.» | Hoàng hậu | tịch thu món vượt phẩm, Danh − | ta Danh − |
| il, illbuy, plant (if her own) | Cung Chính ti search, a bribed maid | **Tố tàng trữ đồ cấm** | «Trong rương Ngọc quý nhân có thuốc mê mua lén từ chợ đen.» | Hoàng hậu → Cung Chính ti | tịch thu (item goes to the palace store, law 6c), cấm túc | ta Danh −, nàng oán |
| giahoa victim side, laydo, petsteal, phonghoa | the stolen item found in her chest, a witness | **Tố trộm cắp / phóng hỏa** | «Trâm ngọc của ta tìm thấy trong hộp của cung nữ Lam phi; người gác kho khai.» | Hoàng hậu | trả đồ, bồi thường, cấm túc; phóng hỏa: giáng một bậc | ta Danh − |
| bribe, sbribe, sthreat, uyhiep, batnat, block, blockf | the bribed servant talks | **Tố mua chuộc, ức hiếp người hầu** | «Thái giám Tiểu Thuận khai nhận ba mươi lượng của Uyển tần để rút thẻ bài người khác.» | Hoàng hậu | phạt bổng lộc, cấm túc, the servant sent away | ta Danh − |
| rumor, lygian | the source of a rumour traced | **Tố đặt điều thị phi** | «Lời đồn về ta bắt đầu từ cung nữ của Diệp đáp ứng.» | Hoàng hậu | phạt quỳ, chép cung quy, Danh nàng − | ta Danh − |
| mlbeat, tat, nuoc/tea/ink, phatquy (abuse of rank) | witnesses in the place | **Tố ỷ thế ức hiếp** | «Trước mặt cả Ngự hoa viên, Kỳ phi hắt trà vào mặt ta.» | Hoàng hậu | phạt bổng, cấm túc ngắn | ta Danh − |
| old, story | rumours of the past | (no charge alone) | — | — | adds weight to another charge only | — |

Rules: (1) the charge list only shows kinds she holds (no generic «đủ 2 chứng cứ nên tố được»); (2) the reason line is the deed text + the proof object/witness (never a bare count); (3) one rank per sentence; the reason is shown in the result card and the Sổ ghi; lãnh cung lasts ≥1–several days before any ân xá (OD 26/11 job 2, FOREMAN D); (4) two-way: NPCs accuse her through the same table with their real evidence; her defence (frameDef) stays; (5) numbers in BAL (a new `BAL.charge.<kind>` block: judge, need, sentence, falsePrice) — one core.

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

So a day holds **6–9 actions in all places together**; a week far fewer than the 115–120 buttons offered for one rival. Recommendation:
- **Hành sự ≤ 16 cards** (§3.2 gives exactly 16): about two days' worth, so every day is a real choice and every card can be met within a week.
- **Person card / pop-up ≤ 12 buttons** (§3.1), harm families as ONE button with nhẹ / vừa / nặng inside.
- **Any one screen ≤ 16 buttons**; Tư trang ≤ 4 acts, Cung nhân ≤ 6, Tài nghệ 1 «Học» per art.
- Keep khắc prices as they are per way (no balance change in this report); the event-pacing cap per day is FOREMAN D's job (OD 26/11 job 3) and should count the same 6–9 act budget.

---------------------------------------------------------------------------------------------------------------------------------

## 6. RELATIONSHIP VISIBILITY

Her ask (03:55Z): every act/result touching a person shows the change AND the new total, e.g. «Hoàng hậu thiện cảm +8 (42)»; Hậu cung numbers lighter.

**CANON OVERWRITE flag (law 14):** KIT §7.1 (owner 24/11 ~21:57Z) says person lines are «<Tên>: thiện cảm +8» and NEVER «(5→13, +8)»; test dev/test/viecnho-fix.test.js fails any «(±N)». Her 26/11 words add the TOTAL in brackets. Recommendation: the new kit row «<Tên>: thiện cảm +8 (42)» — the bracket holds the new total only (no arrow, no repeated delta), so it keeps the 24/11 «short» intent; KK37 changes §7.1 IN PLACE and the test (allow an unsigned total; a negative total written «(−4)»). Same for every person number in the result card (oán, ghen, quý ngươi, Chủ tin, maid thiện cảm) and in act-card Được/Mất rows where a person number moves.

Mock (kit parts only: the live result card j63/j19 with the total appended in the page; no new part): before `dev/handover/shots/dup-report/before-result-fold.webp`, after `after-result-fold.webp` (Fold 755x1000) and `after-result-ipad.webp` (iPad 1180x820): «Cung nữ thân tín … Xuân Yến: thiện cảm +8 (92)» · «Hoàng hậu …: thiện cảm +5 (0)». Looked at both: readable, one line each, no wrap on Fold.

**Lighter Hậu cung view** (recommendation, build after her pick, kit parts kitRel / chip / kpPop only): the consort card head shows ONE line per person — the relation word in the kitRel colour from the existing thresholds (`netTh`: Thù · Ghét · Thường · Quý · Thân) + the one number «Thiện cảm 42»; Oán and Ghen appear as a chip ONLY when past their threshold («Ghen ngươi», «Oán ngươi»); every other number (tin, quý, phe, Chủ tin) moves into the «!» popover. On the Phi tần strip, each face gets the same coloured word under the name, so she sees who is friend / foe without opening a card.

---------------------------------------------------------------------------------------------------------------------------------

## 7. RECOMMENDATION PER GROUP (for her pick)

| Group | Recommend | Why |
|---|---|---|
| Hãm hại thân (P7) | ADOPT: nhẹ Hất trà · vừa Hủy dung · nặng Hạ độc | her examples; richest outcomes kept; 12 → 1 button |
| Hạ uy thế (P8) | ADOPT: Tung tin · Rút thẻ bài · Vu oan | the rank harm she asked for = Vu oan (one rank down, defence exists) |
| Hại hoàng tự (P9) | ADOPT: Phá việc học · Bỏ xạ hương · Hạ độc con nàng | gravest family, only shown when there is a child |
| Lấy của (P10) | ADOPT: Ép nộp · Lấy trộm · Phóng hỏa | real-object law already wired (jlost) |
| Khiêu khích (P6), Ra uy (P14) | ADOPT | in-person face acts, tiny |
| Gặp / Trò chuyện / Giao hảo / Dò la (P1–P5) | ADOPT one button each, way inside | her exact «Xem sổ» pattern |
| Tố cáo + Mặc cả chứng cứ (P11–P12) | ADOPT with §4 charge table | her 03:45Z rule; needs evidence KIND carried (ledger already has it) |
| Hành sự 31 → 16 (§3.2) | ADOPT | ≤16 as she leans; 6–9 acts/day |
| Relationship «+8 (42)» | ADOPT, KK37 kit row + §7.1 overwrite | her words; one line |
| Lighter Hậu cung view | ADOPT, mock after pick | — |
| Servant (cung nữ) road | PARK → second pass on her word | not counted here |

Build order after her pick (each a review/* topic, whole family, Fold+iPad): (1) KK37 kit row «+N (total)»; (2) person-act merge P1–P14 with the chooser dialog (one engine for card + pop-up + NPC); (3) Tố cáo by kind + BAL.charge; (4) Hành sự 16; (5) other tabs; (6) lighter Hậu cung view.
