# E-GAIN3 — law 3: no act card with an empty «Được» (KK54 census, MAIN 171)

PRIORITY #1 CHECK: OD 4 (law 3 18/11 ~09:20Z; OD 26/11 ~17:55Z «Tốn: không» stays) | main: jopic.js kitOptFinal (fallback, NOT changed), dev/test/act-audit.js (LIB reused), jdoor.js DOOR engine | review/*: review/kk54-plaque (census, dev/handover/reports/kk54.md) | claims: E-GAIN3 (Foreman E). Reused: act-audit state/surfaces LIB, kitParse, DOOR engine, J4 door capture.

Branch review/e-gain3 from origin/main 4cd3f974. START_CTX ~8 %.

## 1. The census, re-measured
The KK54 census (59 cards) read only the `.kr-duoc` row (act-audit `rowsOf`). A top-level act card shows its gain in the **«Thành»** row (rolled card) or the door grid's «Thành» cell, so many of the 59 were false empties:
- the 16 «Biếu quà, gửi thư cho <person>» cards show «Thành: người ấy quý ngươi +BAL.tdCourt.giftAf» (j55 / jagmin; the roll in j55:56 adds exactly `BAL.tdCourt.giftAf`) → real, unchanged;
- the deck door cards (Nghỉ ngơi, Đọc sách, Thỉnh an, Cáo bệnh, Bắt mạch, Rời cung, Tai mắt, Xem sổ Kính sự phòng, Dâng tài nghệ: jdoor DOOR.deck) show «Thành: <their ways>» — they looked empty only because the scan read them before jdoor's observer folds them;
- Cầu tự, Múa trong yến tiệc, Sai tai mắt dò nơi ở, Chăm sóc, Dẫn đi thỉnh an, Canh giữ các con, Hỏi chuyện, Chào hỏi … show their gain under «Thành».
New scan `dev/test/gain-empty.js` (reads what the card SHOWS: `.kr-duoc`, `.kr-thanh`, door-grid «Thành/Được»; every scenario dau/toi/cao/con/hau/hh, every surface incl. places + people met there, every enabled card AND every option of the dialog it opens; no time cap, ~15 min). Before: **16 distinct producers** with a really empty Được (14 + 2 that showed up in later random states). After (full run, 1528 cards, 6 states, Fold): **3 left, all in ONE state** (cao, pop-up of the rival met at home: Khiêu khích · Hạ uy thế · Ra uy pop-up doors) — see §5.0; 0 page errors.

## 2. Table (producer | card | before | after | kind)
| producer | card | before | after | kind |
|---|---|---|---|---|
| jdf.js rvGroups door (DOOR P7) | Hãm hại | Ghi chú: way names only | Được: the main gain of each way (e.g. «áo nàng loang vết trà…» · «nàng trúng độc») | worded (doorGain) |
| jdf.js (P8) | Hạ uy thế | names only | «Danh nàng −−−» · «2 tuần nàng không được lật thẻ» · «nàng Sủng −−−» | worded |
| jdf.js (P9) | Hại hoàng tự | names only | «nàng sảy thai» · «tráo hài nhi khi nàng sinh» | worded |
| jdf.js (P11) | Tố cáo | names only | «Danh ++» · «nàng bị quở: …» · «nàng bị phế hoặc giáng» | worded |
| jdf.js (P14) | Ra uy | names only | «nàng in dấu tay trên má, Sắc giảm vài tuần» | worded |
| jdoor.js doorFold (pop-up person talk door) | Ra uy (and every pop-up door) | «chọn một trong N việc» | + Được from its ways | worded |
| jactj4.js Học door | Học | «chọn cách học: …» | «tiến bộ một đến ba phần» · «tiến bộ hai đến bốn phần» | worded |
| jactj4.js j4Merge door | Thưởng phạt | «chọn cách xử: …» | «thiện cảm ++» · «trả <tên> về» | worded |
| jactj4.js j4Merge door | Dạy con | «chọn cách dạy: …» | «Văn <con> +» · «Đức <con> +» | worded |
| j83.js illHTML | Mua đồ | «chọn đường mua: …» | «xem hàng» · «có độc dược» (same line text as the dialog rows, ILL_SHOP_X + illWayLine) | worded |
| j15.js | Cài người vào cung khác | Tốn only | «người của ta vào một cung khác làm tai mắt» (PEND.plantsv thành) | worded |
| j15.js | Tiến cử | Tốn only | «<tên> công lao +BAL.ag.par3.house.merit (đủ công thì được thăng bậc)» (recommend → servMerit) | worded |
| j15.js | Chưởng sự tra xét cung nữ | Ghi chú «tìm tai mắt, đối thực» | «lôi ra tai mắt … (chứng cứ BAL.eff.j14.evSearchMaids) hoặc nghe ra một chuyện đối thực» (searchMaids) | worded |
| j10.js facHTML | Lập phe cùng <X> | Tốn only | «lập phe với X, có phe thì được che chở (nếu nàng nhận lời)» (the game's own rule text, j10 kitEmpty) | worded |
| j10.js facHTML (same family) | Mời <X> / Xin vào phe | no gain | «X vào phe ta» / «vào phe <phe>, có phe thì được che chở» | worded (law 11) |
| j10.js facHTML (same family) | Hợp mưu hạ <X> | odds + «lộ» only | «thành: X bị cả phe tố tội, bị trị tội» (jointScheme → fall) | worded (law 11) |
| j55.js | Phe phái hậu cung / Triều đình | flagged | not an act: the view-switch seg (.tdseg) | excluded from the test (navigation) |
| j55/jagmin | Biếu quà ×16 | flagged by census | already «Thành: người ấy quý ngươi +giftAf» | no change (scanner artefact) |
No act truly gained nothing → **no new BAL gain, no merge** (no BIG rule change).

## 3. How (law 4, law 9, law 11)
- ONE helper `doorGain(lines,max)` in jdoor.js (the door engine): for every door card it parses each way's OWN line with the kit parser (kitParse) and takes that way's first real gain (skips «Chủ tin với …», a paid «Chứng cứ n», risks «có thể/khả năng»/KA_RISK, «… không đổi», one-word list fragments; a band mark drops a decimal tail), max 3, usable ways first. No typed number: every number is the way's own BAL number. Used by: jdf card doors, jdoor pop-up doors, J4 Học + j4Merge doors, Mua đồ.
- Hand-written cards: the gain text names the function and BAL key it comes from.
- Kit untouched: jopic.js kitOptFinal fallback unchanged; rows are the kit's Được (.kr-duoc, green).

## 4. Tests
- `node dev/test/gain-empty.js <url> out.json 755x1000@1` → before: 14 distinct empty (exit 1); after: see §6 (exit 0). 0 page errors.
- Mutant: `MUTANT=1 node dev/test/gain-empty.js <url>` (blanks doorGain = one producer) → FAIL expected (§6).
- Shots (not in git; scratch only): Fold 755x1000 and iPad 1180x820, Hậu cung card Mưu kế group (Hạ uy thế, Tố cáo): green Được list, no overflow, no clipping.

## 5. Found, NOT fixed here (follow-up for MAIN; separate families)
0. **OPEN (law 3, BIG candidate, needs an Opus rule call):** the pop-up talk door «Khiêu khích» (DOOR P6, talk-only) for a rival whose way set is only «Khoe quà ngự ban» (mọi phi tần ghen +2) + «Khiêu khích» (thiện cảm −15, oán ta +19, nàng ghen +10): every effect is red → the act gives her NO gain (law 3: cost-only). Needs either a small real gain (BAL key, e.g. the provoked rival's next rash act / Danh nàng) or a merge into «Hạ nhục» (same tier family). In the same state the pop-up «Hạ uy thế» / «Ra uy» doors also came out empty (their members there had no green line; the random state is not reproduced yet — rerun `gain-empty.js … cao`). The test (`gain-empty.js`) stays RED on these until that rule call; it is the detector.
1. Rolled option cards whose real gain is worded as red Kèm print the kit line «Thành: Không được gì thêm» (j63 kaBody): Xin Hoàng hậu giáng (xinhh, «kèm: nàng bị giáng một phẩm»), Tặng quà ăn có độc (pgift), Tố tội thật (j30 tocao), Trình Hoàng hậu (j78 trinhhh «kèm: nàng chịu phạt theo tội»). Fix per caller: put the target's punishment under «thành:» as an explicit gain. Not reached by the scan (disabled in the 6 states).
2. A paid «Chứng cứ 1» in «tốn:» is classed as a green Được chip (Trình Thái hậu, Uy hiếp đòi bạc): kaRows `l==="tốn"&&c==="g"` → duoc.
3. Dạy chữ line «Văn <con> +1,1»: a decimal shows as «+,1» after the marks pass.
4. Door name lists: a way name with a red word lands in a red «Kèm» (Tố cáo «Kèm: Tố tội thật», Ra uy «Kèm: Phạt quỳ») — pre-existing (same on main).
5. jointScheme gives members `{tamco:1}` typed in code (law 4).

## 6. Result
SMALL/BIG: files touched dev/build/jdoor.js, jdf.js, jactj4.js, j83.js, j15.js, j10.js (wording only, no rule/number change) + dev/test/gain-empty.js + this report → **SMALL** (6 build files, text only).
