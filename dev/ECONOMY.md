# KINH TẾ (owner 15/11, balance v12) — dev/build/jecon.js, mọi số trong BAL (jbal)

Một nguồn: `BAL.pay, wage, duty, banThuong, dutySkip, home, homeEvery, nightBac, patronRel, patronPay, sellPct, noivuPct, craftSell, craftLv,
craftGift, giftLeak, giftHit, priceTier`. j20 (BL, blCard, stipend) và j83 (WVAL, wkSellVal) đọc qua jecon. Mọi phi tần cùng luật.

## 1. Tháng: bổng − công kẻ hầu − lễ nghĩa (free silver ~3–4× từ Đáp ứng tới Hoàng hậu, không phải 10×)
| Bậc | Bổng | Lễ nghĩa | Ban thưởng phi tần dưới | Kẻ hầu (theo phẩm, × 3 bạc) |
|---|---|---|---|---|
| Đáp ứng | 40 | 0 | 0 | ít |
| Thường tại | 55 | 4 | 0 | |
| Quý nhân | 70 | 10 | 0 | |
| Tần | 95 | 18 | 0 | |
| Phi | 125 | 30 | 0 | |
| Quý phi | 165 | 48 | 0 | |
| Hoàng quý phi | 215 | 72 | 20 | |
| Hoàng hậu | 280 | 100 | 40 | nhiều |
- Lễ nghĩa = lễ tiết, thưởng người hầu, tiếp khách. Ban thưởng (HQP, HH) là bạc thật chia cho 2 phi tần dưới mà nàng quý nhất (họ quý nàng hơn +2).
- Thẻ tháng "Bổng lộc tháng …": Bổng +X · Công kẻ hầu −Z · Nhà gửi vào / Việc vặt / Ân thưởng · Còn bạc; có lễ nghĩa thì 2 lựa chọn đủ Tốn/Được/Mất:
  "Chu toàn lễ nghĩa" (Bạc −Y) / "Bớt lễ nghĩa" (Danh −(1 + bậc/2), Đức −1). NPC: đủ bạc thì lo, thiếu thì bớt với cùng giá.
- Lãnh cung 5 bạc, không lễ nghĩa. Cấm túc: nửa bổng, không lễ nghĩa. Khất bổng (Hoàng hậu ghét): × 0,7.

## 2. Thu nhập có nguyên cớ (không may rủi)
- Nhà mẹ đẻ gửi bạc mỗi 3 tháng theo thân phận: Tể tướng 30, Đại tướng quân 20, nhà buôn muối 40, Nam Chiếu 25, cháu Thái hậu 20, thầy đồ 5,
  cung nữ được sủng / tội thần / cung nữ tuyển: 0.
- Đêm tốt: Hoàng thượng ban thưởng kèm 20 bạc (mọi phi tần).
- Người bảo trợ: phi tần cao hơn ≥ 2 bậc, quý nàng (thiện cảm ≥ 40) và có ≥ 40 bạc, trả công việc vặt mỗi tháng 10–22 bạc (bạc thật từ túi người đó).
- Bán tác phẩm tự tay (j83, không phải hệ thứ hai) — xem mục 4.

## 3. Giá chia bậc (BAL.priceTier)
- Thường ngày 3–15: son phấn 8, hương trầm 10, túi thơm 6, đệm gấm 12, thuốc an thai 15.
- Vừa 20–60: yến sào 25, a giao 35, lụa Hàng Châu 30, trâm ngọc 30, vòng ngọc 50, nhân sâm 60, nghiên mực 60, xạ hương 50, thuốc giải độc 60, bột ngứa 30.
- Xa xỉ 100–400: bộ diêu vàng 140, vòng vàng 180, trâm phượng 360, gấm Tô Châu 120, gấm minh hoàng 300, tranh cổ 150, đàn cổ 200, hạc đỉnh hồng 150.
- Đồ có phẩm (IT.rk) dùng trên phẩm vẫn là "vượt phẩm" (dễ bị tố). Trâm / y phục j92: giá theo phẩm WD_PR 12–320.
- Học: phí theo bậc người dạy (5 + bậc × 5, sẵn có ở j2/j23/j83/j85). Chưa đổi.

## 4. Bán đồ — một API cho giao diện (thợ act-pics) và mọi NPC
- `econSellable(p)` → [{ix, k, name, grade, src, price, via, risk, no}] · `econPrice(p,e)` · `econRisk(p,e)` · `econSell(p,ix)` ·
  `econSellUI(ix)` (1 khắc) · `econSellBtn(ix)` (thẻ việc kit đủ Tốn/Được/Kèm).
- Đồ thường: thái giám Nội vụ phủ mua công khai, 50 % giá (BAL.sellPct), không rủi ro.
- Tác phẩm (j83): hai kênh — Nội vụ phủ mua công khai 70 % (BAL.noivuPct), không rủi ro; "Bán ra ngoài cung" (cửa Thần Vũ, j83 wkSell) đủ giá,
  rủi ro buôn lậu của j83. Giá ngoài = (BAL.craftSell[phẩm] 8/14/24/40 + BAL.craftLv 3 × bậc tài nghệ) × cỡ tác phẩm. Phẩm do điểm trò chơi
  + bậc tài nghệ + vật liệu + Công (không xúc xắc). Tặng: quý theo phẩm BAL.craftGift 2/3/5/7; người nhận: Hoàng thượng, Thái hậu, mọi phi tần
  (kể cả Hoàng hậu), cung nữ thân tín — thẻ j83 hiện được bao nhiêu thiện cảm / Sủng / Ân tình.
- Rủi ro chỉ khi có nguyên cớ: bán đồ Hoàng thượng ban → 35 % lộ, Sủng −6 Danh −4 (bất kính); Thái hậu / Hoàng hậu ban → 25 %, quý ngươi −6
  Danh −2. Ngự tứ, kỷ vật: không bán. Trâm / y phục: bán lén qua ma ma / thái giám (j92, lộ ra là túng thiếu).
- Túi Tư trang: mỗi tác phẩm là một ô riêng (tab "Tác phẩm", nền phẩm Thường · Tinh phẩm · Trân phẩm · Tuyệt phẩm), chạm = khung món với
  Dâng/tặng · Bán cho Nội vụ phủ · Bán ra ngoài cung · Bày ở yến tiệc.

## 5. Mưu kế theo người bị nhắm · đường không tốn bạc · phẩm cao nhiều mắt nhìn (jecon §5)
- Mọi việc hại tốn bạc (ACT.c.bac < 0, trừ Giao thiệp) đắt hơn khi người bị nhắm phẩm CAO hơn người làm (+BAL.schemeRk 15 % mỗi bậc) và được canh
  kỹ (+BAL.schemeGuard 10 % mỗi kẻ hầu trung thành ≥ 70, tối đa 3). Thẻ hiện đúng giá cho người đó (ACT.c đọc theo người trên thẻ), luật trừ
  đúng số đó. Ví dụ Đáp ứng mua chuộc cung nữ của Hoàng hậu: 90 bạc (Đáp ứng khác: 44).
  NPC cùng cách tính nhưng núm riêng (owner 11/15: giữ giá cao cho nàng, chỉnh NPC tới khi chết sớm ~40–43 %, HH giữ nguyên):
  BAL.schemeRkNpc 6 % mỗi bậc, BAL.schemeGuardNpc 4 % mỗi kẻ hầu. Đo bot (smart, 1 năm 16 khắc): .05/.03 → chết sớm 47 %, HH 31 % (32 đời);
  .06/.04 → 35 %, 42 % (26 đời, chạy dở); .09/.05 → 21 %, 53 % (38 đời); .15 → 32 %, 37 % (38 đời). Nhiễu lớn; gộp .05–.06: chết sớm ~41 %,
  HH ~36 % (gần mức trước khi tăng giá) → chọn .06/.04. Cần đo lại với n ≥ 80 trước khi chốt.
- Đường không tốn bạc (rẻ bạc, nhưng dễ hỏng hơn hoặc tốn thứ khác), thẻ riêng đủ Tốn/Được/Mất + khả năng:
  "Tự đi dò la" (khả năng −BAL.selfMinus 12, lộ: Danh −2) · "Sai cung nữ thân tín lấy lòng" (lòng cung nữ −BAL.loyalCost 10, khả năng −12) ·
  "Nhờ ơn người quen rút thẻ bài" (cần người quý ngươi ≥ BAL.favorRel 60; người đó thiện cảm −BAL.favorCost 12).
- Phẩm cao nhiều mắt nhìn: mưu của nàng bị bắt quả tang từ bậc BAL.watchRank (Quý phi) trở lên: thêm Danh −(bậc − 4).
- Chưa làm: Tâm cơ như một thứ "tốn" riêng; mua sự an toàn bằng bạc (thuê người làm thay chắc hơn) ngoài các thẻ đã có.

## Sinh nở: số hiện = số chết (soát 15/11)
- Một hàm `birthRisk(p)` (j32 → jbal: −later khi đã có con, +BAL.birthAdd → jbal2: sàn BAL.birthMin) dùng cho CẢ chip "Sinh nở" (j19) lẫn lần
  đổ xúc xắc (j8 birthP). Không có hệ số ẩn. Thử máy: 400 lần sinh cho nàng → chết 8,3 % (rủi ro tính 10); NPC 14,5 % (rủi ro 13).
- Bot: 80 lần sinh, 15 chết (18,8 %) trong khi tổng rủi ro lúc sinh dự đoán 9,6 (z ≈ 1,9): lệch do (1) chip hiện rủi ro LÚC XEM (từ tháng 6),
  còn lúc sinh Sức thường đã tụt dưới 40 (+4) hoặc bà đỡ bị mua (+10) — những lần chết có rủi ro 11–21; (2) độ ồn với n nhỏ. Không chỉnh tỷ lệ.

## Số đo bot (e3: 40 đời, bot sensible, HHSTOP, 15/11)
HH 45 %, chết sớm 45 % (trong đích); năm tới HH 4,4 / 6,0 / 7,5. Bạc của nàng lúc nhận bổng: trung vị 3 ở mọi bậc (bot tiêu hết, ~13 nghìn bạc
vào/ra mỗi đời) — tiền không ứ ở bậc cao nữa.
Tiền rảnh mỗi tháng (bổng − công − lễ nghĩa, tháng không cấm túc), và mua được bao nhiêu mỗi tháng:
| Bậc | tháng đo | tiền rảnh | đồ thường (10) | đồ vừa (40) | xa xỉ (200) | mưu kế (~30) |
|---|---|---|---|---|---|---|
| Đáp ứng | 74 | 40 | 4 | 1 | 0,2 | 1,3 |
| Thường tại | 150 | 51 | 5 | 1,3 | 0,25 | 1,7 |
| Quý nhân | 210 | 60 | 6 | 1,5 | 0,3 | 2 |
| Tần | 309 | 77 | 7,7 | 1,9 | 0,4 | 2,6 |
| Phi | 237 | 95 | 9,5 | 2,4 | 0,5 | 3,2 |
| Quý phi | 244 | 117 | 12 | 2,9 | 0,6 | 3,9 |
| Hoàng quý phi | 234 | 123 | 12 | 3,1 | 0,6 | 4,1 |
| Hoàng hậu | (2, bot dừng ở HH) | ~140 theo luật | 14 | 3,5 | 0,7 | 4,7 |
Hoàng hậu / Đáp ứng ≈ 3,5× (trước: 320 / 30 = 10×). Ghi chú: kẻ hầu của nàng trong bot hầu như 0 (S.staff trống; cung nữ thân tín là S.maid,
không tính công) nên công kẻ hầu gần như không trừ — lễ nghĩa mới là phần tăng theo phẩm. Cấm túc rất hay (bổng nửa) ở bậc thấp.
Đo lại: `OUT=dir bash dev/measure/run5e.sh <game> <nhãn> 8`, rồi `python3 dev/measure/anecon.py dir/<nhãn>_?.json`, `python3 dev/measure/anx.py <nhãn> dir/<nhãn>_?.json`.

## 6. Stipend goods are real items (owner 15/11 17:30Z, review/econ-stipend, dev/build/jstip.js)
- `BAL.stip.goods[rank]` (+ winter coal `BAL.stip.coal[rank]`) are pushed into `p.inv` each month as real items (`from:"noivu"`), with
  picture (j98 itemArt), grade and use: Vải bông / Lụa Hàng Châu / Gấm Tô Châu (may áo, tặng, bán), Trà Long Tĩnh / Trà Quân Sơn ngân châm
  (uống, tặng, "Pha … mời khách" in a visit: thiện cảm +3 / +5), Than bạc sương (đốt sưởi: Sức +6 winter, +2 otherwise), Son phấn, Yến sào,
  Nhân sâm. Lãnh cung: 1 súc vải thô (+ than đen in winter).
- Her payout = kitReward chest "Bổng lộc tháng …" (items + silver). The month card row "Đồ phát" and the Tuần lục line list the real goods;
  wording "trả công N kẻ hầu: −W bạc".
- Nội vụ phủ buys its own issue back at `BAL.stip.resell` % of the normal sale price (no monthly cash leak from goods).
- NPCs get the same goods; at most `npcKeep×3` issued entries are kept (older ones used up).
- jecon no longer reassigns `stipend` (that dropped the j53/j54 children's fee wrappers): j20 `stipend()` calls `econStipend()`.

## 7. Nội vụ phủ cắt xén (owner 15/11 17:33Z)
Causes (each visible, each adds `BAL.stip.w[k]` to the monthly chance, capped `BAL.stip.cap`): Sủng < `lowSung` or fell ≥ `dropSung`;
cấm túc / scheme caught / demoted within `faultM` months; a superior of rank ≥ `supRank` above her with oán ≥ `oan`; the greedy Nội vụ phủ
eunuch (per game, `greedy` %) not tipped in `tipM` months; her cung nữ loyalty < `maidLoyal` (or a spy). After "Nhịn" +`meekAdd`, after a
failed claim +`spiteAdd` next month. Prevented by Sủng ≥ `safeSung`, a tip within `tipM` months, an ally among the eunuchs (her eunuch
loyal ≥ `allyLoyal`, or `allyTips` tips). The Empress is never skimmed. Skim = silver `cutSmall` (1 cause) / `cutBig` (2+) of the bổng and
goods one step worse (`down`: gấm→lụa, lụa/vải→vải thô hàng kém, trà→trà mốc, than→than đen and one basket less, son phấn/yến/sâm missing).
Old Hoàng hậu khất bổng (j20 payCuts, −30 %) is not stacked: that month the order is the cause and no second silver cut is taken.
Her event "Bổng lộc bị cắt xén" (person dialog with the Nội vụ phủ eunuch, event cost mode, reason as Gợi ý): Nhịn · Đút bạc (`tip[rank]`;
goods restored unless a superior ordered it) · Sai cung nữ đi đòi (odds by loyalty, lanh, Sủng; −25 vs a superior) · Tố lên Hoàng hậu
(Thái hậu when the Empress is behind it or dislikes her; to the Empress who ordered it: Liều, she resents) · Ghi nhớ để trả thù sau
(Tai mắt: evidence on the superior, or the eunuch's books → +15 to the next report). NPCs: same rule; tip if rich, maid claims, or endure;
news via newsAdd.

## 8. Econ-items (owner 15/11 20:05Z #4 #7 #8, review/econ-items, dev/build/jeitem.js, numbers BAL.eit)
- Ice in summer: Nội vụ phủ issues `BAL.eit.ice[rank]` blocks of Băng đá in Hạ (Đông = charcoal `BAL.stip.coal`). Use: Sức +5 in Hạ (+1 otherwise);
  ice of an earlier month melts at the month's turn. Skimmed ice = Băng vụn (hàng kém), one block less.
- Skim size: `stipItemN` = base 1 + 1 (2+ causes) + 1 (Sủng < lowSung) + 1 (rank ≤ Thường tại) − 1 (rank ≥ Quý phi), min 1 lines made worse /
  missing; charcoal / ice first, then the dearest goods (`stipPickLines`). Before: every line went one step worse at once.
- Servants pocket goods: a servant (staff or her cung nữ) with Lòng < `pil.loyal` or a spy pockets the dearest piece of the month at
  `pil.base + (pil.loyal − Lòng)·pil.k (+spy, +ignored before, +her Sủng low)`, cap `pil.cap`. She notices at `pil.see + Tai mắt·seeMat (+loyal
  cung nữ)`: dialog Phạt nặng (piece back, −Lòng, `detM` months deterred and the other servants detM/2, a spy confesses) / Răn dạy rồi tha (piece back,
  +forgiveLoyal; the other servants pocket more for softM months) / Trả về Nội vụ phủ (replacement) / Làm ngơ (piece lost, +ignoreLoyal, more likely again). NPCs: the same as data, punishment by trait.
- Robe re-issue (owner 16/11 s9): Nội vụ phủ waits a RANDOM 1–3 weeks weighted by its regard for her (`eitRegard` 0..100 = reG.base + rank·rk + (Sủng−30)·sung + tip if tipped in tipM months − cause per stipend skim cause; weeks = 1 + two rolls against 100 − regard). Roads (robbery card and Tư trang → Việc → "Xin cấp lại y phục"):
  Lót tay (Bạc `re.tip[rank]`, odds base + rank·rk + Sủng/sungDiv) · Sai cung nữ đi xin (Sức priced like the bạc, same odds − altPen ± at most `re.maidAdj` for her maid's
  Lòng + Tai mắt, so it never beats the bạc odds; fail = maid Lòng −3) · Viết thư xin nhà (Sức 2, `famWk` weeks, odds by origin home money) · Đợi.
- Girlhood chest (palace road): `girlChest(p)` — 6 things (same as jkc kcChest), 3 worn, robe + hairpin kept as fallback; NPCs keep one girlhood robe.
