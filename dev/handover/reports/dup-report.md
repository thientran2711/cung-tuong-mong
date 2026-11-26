# REPORT dup-report (E97, E-d) — feature duplication audit, REPORT ONLY (no build until sếp picks)

PRIORITY #1 CHECK ('trùng lặp|gộp|dedupe|merge report|dup-report'): OD 19 | ledger 0 | claims 8 | main 15 | review/* 2 (act-dedupe-r1, landed 16/11 wave 1) | archive 43.
Branch sha a0a1d1a2 (review/dup-report). Worker E97 = session_01DgYSWoPgpYzodQxz6rufXQ, FOREMAN E child7. START_CTX ~4 % (est., 1M window). Branch review/dup-report from origin/main 5e013076. Docs + scan script + mock shots only; no game code.
Detailed design: `dev/design/HANHSU_MERGE.md` (counts with file:line, merge groups, ways, tiers, evidence→charge table, khắc maths, relationship mock, recommendations).

## TÓM TẮT CHO SẾP (tiếng Việt)

| Mục | Hiện nay | Khuyến nghị gộp | Giữ lại mỗi bậc (nhẹ · vừa · nặng) |
|---|---|---|---|
| Một phi tần (thẻ Hậu cung + khung gặp mặt ở Dư đồ) | 51–58 nút trên thẻ + 32 nút khi gặp mặt | **12 nút**, cùng một bộ ở cả hai chỗ | — |
| Hãm hại (thân thể, dung nhan, tính mạng) | 12 nút: hất trà, hắt nước, quạt mực, tát, ngáng chân, bỏ phấn lạ, hủy dung, thả thú dữ, hạ độc, hạ độc dần, quà có độc, đẩy xuống hồ sen | 1 nút «Hãm hại», chọn bậc bên trong | Hất trà · Hủy dung · Hạ độc |
| Hạ uy thế (danh, sủng, phẩm vị) | 8 nút: tung tin, ly gián, rút thẻ bài ×2, xin Hoàng hậu giáng, vu oan, cài đồ vào rương, giá họa | 1 nút «Hạ uy thế» | Tung tin đồn · Rút thẻ bài · Vu oan (giáng một bậc) |
| Hại hoàng tự (chỉ hiện khi có con) | 7 nút | 1 nút «Hại hoàng tự» | Phá việc học · Bỏ xạ hương · Hạ độc con nàng |
| Lấy của (đồ, thú nuôi) | 6 nút | 1 nút «Lấy của» | Ép nộp của · Lấy trộm đồ · Phóng hỏa kho đồ |
| Dò la | 5 nút (tự đi, sai cung nữ, sai tai mắt, mua chuộc cung nữ, lấy lòng) | 1 nút «Dò la», chọn cách bên trong | — |
| Gặp / Trò chuyện / Giao hảo | ~20 nút (chào hỏi, hỏi han, khen, rỉ tai, bàn tán về từng người…) | 3 nút: «Gặp nàng», «Trò chuyện» (chọn chuyện), «Giao hảo» (kết giao, tặng quà, giúp, nhờ) | — |
| Tố cáo | 8 nút + thẻ «Tâu xin nghiệm thân»; tố chung chung «đủ 2 chứng cứ» | 1 nút «Tố cáo»: chỉ hiện tội ta có chứng cứ thật, mỗi tội một lý do rõ, một người xử, một hình phạt | 13 tội: mưu hại phi tần · mưu hại hoàng tự · yểm bùa · hại dung nhan · tư thông · nghiệm thân · xa xỉ · vượt phẩm · đồ cấm · trộm cắp · mua chuộc người hầu · đặt điều thị phi · ỷ thế ức hiếp |
| Hành sự | 31 thẻ | **16 thẻ** (ví dụ «Xem Sổ Kính sự phòng»: sai người / lén xem / tới tận nơi chọn bên trong) | — |
| Khắc trong ngày | 16 khắc | một ngày làm được **6–9 việc** ở mọi nơi cộng lại → Hành sự ≤16, mỗi người ≤12 nút | — |
| Thiện cảm | «Hoàng hậu: thiện cảm +8» | «Hoàng hậu: thiện cảm +8 (42)» ở mọi khung kết quả; Hậu cung chỉ còn một chữ màu (Thù · Ghét · Thường · Quý · Thân) + một con số | — |

Mọi hệ quả cũ đều giữ (chỉ gộp nút). Người khác làm với ta cũng theo đúng các nhóm và bậc này (luật hai chiều).

## WHAT (English)
1. Counted every khắc-costing act on the consort road from the live build (scan scripts below): Hành sự 31 cards; one consort's Hậu cung card 51 (+4 child acts, +3 Empress power = up to 58); the in-person Dư đồ pop-up of a consort 32; maid 4 / servant 10 / elder 2; Cung nhân 9; Tư trang 6–7; Hoàng tự 5; Tài nghệ 3–4 per art. ≈115–120 buttons for one rival against a 16-khắc day. ACT table = 55 entries, each with file:line in HANHSU_MERGE §1.1.
2. Merge groups: 14 person features (12 for any consort) — one button each, the way chosen inside (kit option dialog, no new kit part), harm families as nhẹ/vừa/nặng with ONE act each; Hành sự 31 → 16; Tài nghệ / Cung nhân / Tư trang small merges. All outcomes kept; the same merged button in the Hậu cung card AND the Dư đồ pop-up (her 16/11 «buttons right there» rule kept); NPCs use the same families (law 1).
3. Evidence → accusation by kind: 13-row table keyed on the existing true-deeds ledger kinds (jtruth.js), each with its reason text example, judge, sentence, false-charge price; one rank per sentence; numbers to a new BAL.charge block (law 4).
4. Khắc maths: 6–9 acts/day in all places → Hành sự ≤16, person ≤12, any screen ≤16.
5. Relationship: kit row «<Tên>: thiện cảm +8 (42)» — CANON OVERWRITE flag: KIT §7.1 (24/11) + dev/test/viecnho-fix.test.js forbid a bracket on person lines; KK37 must overwrite §7.1 in place after her pick. Lighter Hậu cung view described (kitRel word + one number, Oán/Ghen chips only past threshold, rest in «!»).
6. Law 8 expert view done in HANHSU_MERGE §2 (Qing 份例 / 宮規 punishments one step at a time, charge decides judge and sentence, 慎刑司 investigator, three-step scheme ladder in palace drama; sources cited).

## SHOTS (CDN refused: no R2 credentials in this container → handover branch fallback per E-common)
dev/handover/shots/dup-report/ (handover branch): `before-result-fold.webp`, `after-result-fold.webp` (Fold 755x1000), `after-result-ipad.webp` (iPad 1180x820) = the «+8 (total)» mock on the live result card; `before-hc-fold.webp`, `before-hc-ipad.webp` = today's consort card with «Gặp mặt 3/5 · Giao thiệp 2/3 · Dùng chứng cứ 0/8 · Hại nhỏ 7/12 · Hại nặng 12/16 · Sát hại 3/7». Looked at each.

## SCAN SCRIPTS / TESTS
- `node dev/test/act-dedupe-deck.js file://<repo>/index.html out.json 755x1000@1` → deck union 9211 rows, 0 page errors (reused).
- `node dev/test/dup-report-scan.js out.json` (new, review/dup-report) → ACT table 55, every panel incl. hidden group panes, every person met in Dư đồ (dfActs) for scenarios phẩm cao / Hoàng hậu / có con; 0 page errors.
- No game code changed → quickcheck not needed for this branch (docs + one test script).

## LIMITS
- Servant (cung nữ) road not counted (parked; second pass on her word).
- The mock is an in-page text append on the real kit result card (kit parts only); the real row is KK37's job after her pick.
- Tier picks are recommendations; she picks.

## REVIEW (E97r, BIG reviewer, session_01DgYSWkmQC9riCQ7uwjnLho, 26/11) — FAIL a0a1d1a2
PRIORITY #1 CHECK ('trùng lặp|gộp|duplicat|merge report'): OD 45 | ledger 1 | claims 8 | main 15 | review/* 0 (only review/dup-report). Also read OD rows 26/11 ~04:15Z, ~04:20Z, ~04:25Z (rulings that feed E-d) + FOREMAN_E_STATUS 04:27Z FROM MAIN 152 (pets add). START_CTX ~3 %.
Method: reran `dev/test/dup-report-scan.js` and `dev/test/act-dedupe-deck.js` on origin/main 5e013076 index.html (755x1000; 0 page errors; ACT 55 keys = §1.1, all 55 present); hand-checked 45 ACT file:line refs against dev/build; looked at all 5 shots.

PASS parts: (6) «+8 (42)» row + CANON OVERWRITE flag vs KIT §7.1 (KIT.md:352) and viecnho-fix.test.js:65–69 is real and correctly left to her pick (her 26/11 words are the new rule; no re-ask); lighter Hậu cung view described with kit parts only. (7) expert view §2 with sources. (8) Vietnamese table cổ trang, no %. (9) no game code: diff vs 5e013076 = HANHSU_MERGE.md + reports/dup-report.md + dup-report-scan.js only. Tier picks (Hất trà / Hủy dung / Hạ độc; Tung tin / Rút thẻ bài / Vu oan; nặng = life or rank) follow her words. 13-charge table has its own reason line, judge, sentence, false-charge price per kind (no generic «đủ 2 chứng cứ»). Khắc maths uses BAL.time (jbal.js:52: khac 4, sucMin 5, cost talk 1/talkAct 2/harm 2) and BAL.walk near 1/far 2 — sound.

FAIL list (fixer, on review/dup-report; then re-review):
1. COUNT NOT COMPLETE (check 1). (a) Hành sự deck is ≥33, not 31: art-unlocked cards «Đàn khúc Phượng cầu hoàng» (j2.js:63, deck.cam; the rerun deck bot meets it in scenario «cao») and «Vẽ chân dung tặng Thái hậu» (j2.js:66) are missing from §1.2 AND §3.2 (H8 «Dâng tài nghệ» must hold them, with their outcomes) — also check j13.js:45 «Tự bốc thuốc» (arts.y≥3) for whether it is a deck card. (b) Quyền Hoàng hậu = 5 acts (j15.js:43: Xử tội, Tịch thu trang sức, Ban thưởng, Ân xá, «Khất bổng lộc» cutpay), not «+3»; P13 drops «Khất bổng lộc». (c) Hoàng tự = 7, not 5: also «dẫn con» Lễ nghi (Hoàng thượng thương con +8 · Sủng +2) and «gặp các con · chăm con tại tẩm cung» (scan kid:0). (d) In-person pop-up «32» is not reproducible with the shipped scan (it runs cao/hh/con only, not «đầu game» as the §1 header says; rerun gives 26–29: Giao thiệp 20–22 · Mưu kế 2 · Hại người 4 · Trừng phạt 0–1); give the measured range and say «Bàn tán về X» grows one per known person. Fix the Vietnamese table numbers to match.
2. WRONG file:line (check 1 hand-check): `spy` → jroute.js:329 and `bribe` → jroute.js:324 are the blood-test road steps (mk("spy","Dò xem bát nước của kẻ tố"), mk("bribe","Mua chuộc thái y nghiệm máu")), not ACT. Real: spy j8.js:118 (overrides j78.js:126, jwhy.js:44), bribe j8.js:131. Other 43 refs checked OK.
3. SILENT DROPS (check 2, her 03:45Z «hệ quả … vẫn giữ nguyên»). There is no old-act → new-home table; several folded acts have no stated home for their consequence: catswap «tráo hài nhi», pond «con rơi xuống hồ», kframe «con mang tội yểm bùa» (P9); pushp «Sức −25 / chết đuối», slowpoison «ốm 3 tháng», pgift (P7 nặng — say if they are ways or roll outcomes of Hạ độc); xinhh «Xin Hoàng hậu giáng» (P8); «Khất bổng lộc» (P13); the 2 missing deck cards (item 1a); «Trút giận» (P6) is not in any scan — show where it lives. Add ONE table: every ACT key (55) + every deck card + pop-up-only act → new button · way / tier outcome / moved / dropped-pending-her-pick.
4. LAWS PER MERGED ACT (check 3) not shown. Add one line per P1–P14 and H1–H16: law 1 (NPC uses the same act/tier), law 2 (ways inside one act of equal value — e.g. H5 Bắt mạch, H6 Xem sổ, P5 Dò la, P10 Lấy của ways: cost vs gain), law 3 (no cost-only way; e.g. xinhh today shows «Không được gì thêm»), law 6 (proof exists / object traceable).
5. EVIDENCE KINDS NOT ALL REAL TODAY (check 4, law 6a). §4 says it is keyed on the existing true-deeds ledger, but DEEDW (jtruth.js:18–19) records only poison, kpoison, slowpoison, pgift, musk, catswap, pond, pushp, kframe, frame, giahoa, plant, huydung, thathu, phonghoa, ksab, rumor, trip, lygian, bribe, block, blockf, steal, uyhiep, batnat, petsteal, thaopet (+ plot, sbribe, sthreat, illbuy, tryst… via hooks). NOT recorded: rash, tat, nuoc/tea/ink, phatquy, laydo/laydol; and xx / vp / expose are accusation acts, not deeds. Mark per charge which proof exists today and which needs a NEW deed record in the build. Also align with OD 26/11 ~04:15Z ruling (3) EVIDENCE PER CHARGE (own-kind pieces per charge, heavier crime = harder-to-find proof, numbers = FOREMAN D's D4 table, «E-d report uses D4's table»): reference D4 as the one source for pieces/odds instead of a parallel `BAL.charge.need` (laws 4, 14).
6. PETS MISSING from the khắc budget (OD 26/11 ~04:25Z ruling (4) «PETS … feeds FOREMAN E's E-d khắc-budget report» + FOREMAN_E_STATUS 04:27Z FROM MAIN 152). §5 must count pet care (Tư trang «tìm thú nuôi», pet care/feeding acts) and recommend how pets fit 16 khắc/day (merge / passive / cheaper).
7. MINIGAMES vs OD 26/11 ~04:15Z ruling (1) (keep contests + level-up/exam minigames, cut the rest where possible; FOREMAN D D5 list): §3 header, P5 «tự đi … có mini-game», P7 «tự tay tại chỗ (mini-game swipe / tug)» say self-ways keep their minigame — law 17 conflict. Say «minigame or plain odds per D5's list».
8. SHOT WRONG: `before-hc-fold.webp` is the title splash picture, not the Hậu cung consort card (the report says «Looked at each»). Retake Fold 755x1000 of the consort card with the tab counts. Also explain «Hoàng hậu …: thiện cảm +5 (0)» (Fold) / «+9 (4)» (iPad): if the starting value was −5 say so in the caption, else the appended total is wrong — fix the mock.
9. SERVANT ROAD «parked» is NOT parked: no row in dev/PARKING_LOT.md and no OD ruling parks it (grep 'servant|cung nữ road|E97|dup-report' → none). A worker cannot park scope (law 18 = new ideas only). Either count the cung nữ road (OD 21/11 ~03:15Z: it uses the SAME 8 tabs as the consort, so the merge carries over — at least map its Phận sự/Hành sự acts) or get a real parking line from MAIN first.
