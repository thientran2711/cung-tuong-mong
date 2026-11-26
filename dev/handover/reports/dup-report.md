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
