# OB-OAN — «giảm oán / giảm nguy hiểm» (owner OD 26/11 ~08:25Z), branch review/ob-oan

PRIORITY #1 CHECK: OD 26/11 ~08:25Z row (+ 'nguy hiểm chung' OD 6) | main j9.js:135–136 Tạ lỗi/Nhún nhường, jts.js:147/199 Biếu quà làm lành, j2.js:167/171 Xin Thái hậu đỡ lời / Xin Hoàng hậu che chở, j70 Phòng bị (def70m), jmem memTop (the WHY) | review/* none (review/act-merge: no code change to these acts yet) | claims none.

## What she sees — before → after (names)
- «Nguy hiểm chung» panel, before: bar + «Cách tính» + «Người nặng lòng nhất» (Quý phi X: mức nặng · đang ghen 40 · oán 60), only 2 act cards (Đóng cửa giữ mình, Biếu quà làm lành). No word on how to lower it; Tạ lỗi / Nhún nhường hidden inside a talk at that person's place.
- after: row **«Cách giảm»** = làm lành từng người (Tạ lỗi, Nhún nhường, Biếu quà làm lành) · Đóng cửa giữ mình · Xin Hoàng hậu che chở · Xin Thái hậu đỡ lời · Phòng bị (giao việc cho kẻ hầu).
  Each person row: «Quý phi X: mức nặng · Oán sâu 60 · ghen 40 · vì ta đã tung tin đồn bẩn về nàng ta (mới đây)» — WHY = her strongest bad memory of what SHE did (jmem memTop), else «vì ghen ngươi được sủng» / «vì oán … (chưa rõ việc gì, dò la để biết)» / «vì không ưa ngươi» (the driver of j28 danger).
  Cards: **«Làm lành với <phẩm tên>»** (one per top-3 person) · Đóng cửa giữ mình · Biếu quà làm lành · **«Nhờ bề trên che chở»** · **«Phòng bị»**.
- «Làm lành với Quý phi X» (new dialog, kit option cards): Tạ lỗi · Nhún nhường · (Thỉnh an when X is the Hoàng hậu) — the SAME talkOpts option objects (odds, cost, run, khắc = talkK), and Biếu quà làm lành for her alone (the existing tsgift picker with one person). Rows «Cách giảm» + when her oán ≥ X's forgiving line (jnet netForgive): **«Lưu ý: oán còn quá sâu (từ N trở lên), lời tạ lỗi bị gạt đi: biếu quà làm lành cho nguôi bớt trước»** and the Tạ lỗi / Nhún nhường cards are closed with «Cần: nàng còn chịu nghe: oán dưới N (đang M)». Before, she could pay Danh for a Tạ lỗi that was silently refused.
- «Nhờ bề trên che chở» → Xin Hoàng hậu che chở / Xin Thái hậu đỡ lời (same options, gates, odds). «Phòng bị» → the j70 Phòng bị dialog (same as Kẻ hầu tab).
- Maid warning «Lời cảnh báo»: adds «Làm lành với <người nặng lòng nhất>».
- Opener cards (Làm lành, Nhờ bề trên, Phòng bị, and the existing Biếu quà làm lành — same family) no longer pop an empty result card «… ta không được gì, cũng không mất gì»; the dialog they open comes at once and the act shows its own result.

## Scan (law 11) — `python3 dev/test/ob-oan-scan.py`
| Surface | Before | After |
|---|---|---|
| Nguy hiểm chung panel | no «Cách giảm» | YES (kit row) + direct cards |
| Maid warning | no | YES («Làm lành với …») |
| «Làm lành với …» dialog | — | YES (kit row + Lưu ý) |
| glossary taps Oán / Thù / Ghen / Nguy hiểm / Thiện cảm / Quý / Sủng / Sức khỏe / Danh (kitRel2 rows, stat rows, header, person card «Có thể hại ngươi») | no | **pending kit: K-GLOSS-LOWER → KK39** (data ready: `kitLowerText(term)` in jts.js) |

## Tests
`node dev/test/ob-oan.js <newRoot> <oldRoot> <shotDir> 755x1000@1 1180x820@1` → ALL PASS 27 (real taps: box → panel, Làm lành → Nhún nhường lowers oán by BAL.ag.cx.humble.oanDown and spends khắc, deep-oán card closed with reason, Nhờ bề trên, Phòng bị, OLD SAVE from base main build loads + panel opens, no page error). Files served from disk via page.route (a local http server was refused in this container).
Shots (Fold 755x1000 + iPad 1180x820, stills): CDN img/_review/ob-oan/ — 1-panel, 2-mend, 3b-deep, 4-help (.webp). Videos: not made.

## Findings for MAIN (not mine to change)
1. ROOT of «không biết làm cách nào để giảm»: Tạ lỗi / Nhún nhường are refused whenever oán ≥ BAL.net.th.nguoi (base 30, by nết 10..60, clamp BAL.net.thClamp.nguoi). Oán climbs to 100, so at high oán the ONLY lowering acts are Biếu quà làm lành (−BAL.tsGift.oan = 5) and the monthly fade (BAL.oanFade = 2). → Foreman D (rec 3/4 numbers): this is the pace/cool-down issue.
2. Two-way law: NPC side has Nhún nhường (cx:humble), Xin TH/HH (cx:thHelp/hhShield), Đóng cửa + Biếu quà (tsNpcDanger), Phòng bị (cx3:def). No NPC «Tạ lỗi» act (agRunReg) — owner of jagacts to decide.
3. The act result card shows only HER cost (e.g. «Danh −2») not the target's change / verdict — same family as the OD ~08:30Z «nói xấu» bug already routed to MAIN 155.
4. ACT-MERGE J1 moves Tạ lỗi / Nhún nhường into «Trò chuyện»: my code finds them BY NAME in talkOpts / topicOpts (`tsMendL`), so a rename breaks it — tell J1 to keep the names or ping me.

## Blockers
- Part (2) glossary «Cách giảm» row: kit part missing → K-GLOSS-LOWER filed in dev/kit/KIT_REQUESTS.md for KK39 (via MAIN).
- Videos not made (stills on CDN instead); a local http server was denied by the sandbox, tests serve files via page.route.

~70% xong / panel playable.
