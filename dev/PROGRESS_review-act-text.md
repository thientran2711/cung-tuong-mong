# PROGRESS review/act-text (worker, session 8, 15/11)

Owner: "Tài nghệ act card text broken and unclear" (dev/handover/refs/owner-act-text-jumble.jpg) + "Tại sao + mà màu đỏ"
(owner-kem-plus-red.jpg). Scope: card Cần/Được/Mất/Kèm/Ghi chú texts only (pick-hint line = review/pick-hint, rank colour = review/rank-colour).

## Root causes (whole family)
1. `effList` (j19) split every ", " even inside "( … )" / « » → "(chơi 5 phần: Khá" cut, ")" stray, "dâng" · "tặng được" torn.
   Fix: `kSplitTop(str, sepRe)` (j19) splits at top level only (never inside ( ) « » [ ] “ ” or a tag). Used by `effList`,
   `kaModelStr` (" · ", "; ", ", ") and `kaModel` text nodes (j63).
2. Sentiment words matched inside other words (j19 KRED/KHOST/KGOOD): "nguy" hit "Vọng nguyệt" (gain → red Kèm), "thù" hit
   "Thêu thùa" (gain "+1..2" → red Kèm), "giữ" hit "giữa", "truy" hit "Mệnh truyện". Fix: `kWB()` whole-word regexes (Unicode letters).
3. Code-like ranges: "+1..2", "+2..3", "+1..3", "0..10", "Sủng +3..8", "Bạc -5..9". Fix at the sources (j2, j5, j23, j83, j85,
   jgift, jkitpage, jtabs, jwkr) + a net in `kaRows`: `kRangeW()` → "tiến bộ Thi một hai phần", "Sủng +3 đến +8".
   "tiến bộ" added to KGOOD (green without a "+").
4. Tài nghệ generator (j83): `wkTierTxt()` = the quality tiers in ONE line ("chơi 5 phần ra Khá, 9 phần ra Tinh xảo, Tuyệt phẩm
   cần vật liệu quý"); `wkOddsTxt()` = that line as one Ghi chú "(…)" + gains of better material as Được items
   ("quà giá trị +1", "bán ra thêm Bạc +6"). Deck card "Tự học X": Được "tiến bộ X một hai phần · tự tay chơi thì ra <work> để
   dâng tặng" + Ghi chú tier line. jwkr recipe swap regex follows the new wording.

## Scan
`dev/test/act-text-scan.js <url> <out.json> [WxH] [scen]` — every act card + one dialog level, 6 states; flags brk/dots/pct/frag/
word1/sp2/glue/sign/twice/long. Serve the build wrapped with `<meta charset=utf-8>` (see dev/test/bt.sh).

## Also done (coordinator follow-ups 15/11)
- "Tại sao + mà màu đỏ": root cause was KHOST "thù" inside "Thêu thùa" (and KRED "nguy" inside "nguyệt") → whole-word fix above;
  scan column `sign` (+N shown red / −N shown green / anything green in Kèm).
- One word "Tự học" (owner): Tự rèn / Tự luyện → Tự học everywhere (labels, logs, deck card, practice button); teacher titles
  "Học với thầy" / "Học với ma ma" (was "Theo ma ma giáo tập") / "Học với Thái hậu" (was "Xin Thái hậu cho học cùng"); logs
  "Học Dung với ma ma giáo tập", "Học với Thái hậu". VANPHONG.md rows added (main copy; coordinator to sync docs branch).
- Torn one-word items fixed at source: Ly gián "hỏng: bị lộ", Kiểm tra đồ "đồ bị tẩm độc hay bị cài", thái y "xạ hương và độc";
  j78 Bán cho phe khác split (no "nắm 0 chứng cứ"); jaudit Nhờ giúp đỡ gain labelled "thành: nàng cho mượn Bạc +30 …".
- Variant labels table (before → after): Tự rèn → Tự học · Tự luyện → Tự học · Tự luyện, làm tác phẩm → Tự học, làm tác phẩm ·
  Theo ma ma giáo tập → Học với ma ma · Xin Thái hậu cho học cùng → Học với Thái hậu · Học cùng Thái hậu (log) → Học với Thái hậu.

## Scan results 755x1000, state "dau" (before main f53bdade → after this branch)
brk 18→0 · dots 8→0 · word1 3→0 · sign 3→0 · frag/pct/sp2/glue/twice 0→0 · long 39→28. Full 6-state before run (main):
3339 cards, brk 39, dots 8, word1 3, sign 4, long 95. The 6-state AFTER run was stopped (slot handed back) — LEFT TO DO.

## Session 2 (16/11): merge + after-scan + Foreman extras
- Merged origin/main (conflicts j2 stealX, j78 banphe: kept main's "thiện cảm"/stealKem + our "đến" ranges / split "nắm … chứng cứ" item).
- Scan (dev/test/act-text-scan.js) now: forces the phone-shell panel visible (item 2 done: row heights measured at 755, ~60% of rows measured vs 45%),
  new flags `kemgain` (pure gain in a KÈM row, or a "kèm:/tốn:/thành:" label left inside another row) and `titlewrap` (card title with a portrait that wraps to 2+ text lines; text-node measure, portrait box excluded).
- Source fixes (text/data only, kit untouched): "Chủ tin với X +3" appended as its own " · " item (was glued into a red Kèm clause, jaudit); Liếc mắt đưa tình "kèm: bị người thấy" -> "có thể bị người thấy, một phi tần nắm 1 chứng cứ: …" (j22, j42);
  Nhờ giúp đỡ x no longer starts with "cần thiện cảm 30 (…) · thành:" (the need is already the CẦN row; label left inside Được) (jaudit);
  shortened: Phạt vô cớ Kèm, Đề bạt (name dropped from Được, "Phẩm đủ đến X", note), Điểm trang x, stealX, Chào hỏi, Sai đi dò la, Nghe ngóng chung, chợ đen fail line (j24, jaudit, jtoil, j79, j61, jwhy, j83).
- Titlewrap: scan finds 0 titles that wrap with a portrait at 755x1000 (the earlier 2.6-line reading was the portrait box counted as text height; fixed in the scan). The §6.2 sample option "Thưa rằng do Hoàng thượng định" is 0.9 lines at 755/844/1180.

## Scan results (755x1000, 6 states dau,toi,cao,con,hau,hh)
After: 3280 cards, brk 0 dots 0 pct 0 frag 0 word1 0 sp2 0 glue 0 sign 0 kemgain 0 titlewrap 0 twice 2 long 41.
Before (main f53bdade, earlier session, 6 states): 3339 cards, brk 39 dots 8 word1 3 sign 4 long 95 (old scan, panel mostly unmeasured at 755).
Before on the merged code with the NEW scan (dau+toi only): kemgain 4, long 29 -> after 0 / 28. Full 6-state before with the new scan not run (about 15 min per state).
`twice` 2 = same khắc text in CẦN and TỐN (pre-existing, by design of the khắc chip).

## KIT REQUEST (for the single kit keeper; not done here)
1. kit act card parser (j63 kaModel/kaRows): when an `.ef` item holds tags AND starts with a label ("kèm: …", "thành: …") the label is not stripped (push() only parses labels when the html has no tags) so the item lands in Được. Net wanted: strip/parse the label from the plain text. Used by every act card whose x string reaches kaModel with coloured spans (place pop cards, Giao tình, Hành sự).
2. kaRows add(): a pure-gain clause inside a Kèm item ("a, Chủ tin với X +3") should go to Được; a generic split-at-top-level-comma + route-gain net would stop the whole class at the kit (done now by source fixes only).
3. "long" rows: person-card/dialog rows are long because the 2-col/3.3rem label grid leaves ~190 px for the value at 755; a taller-row or label-above layout for rows with >2 lines is a kit decision.

## Left
- 41 long rows remain at 755 (>2.3 lines): mostly Kèm/Mất lists of many numbers (Tung tin đồn, Khiêu khích, Thỉnh an, Vu oan, Bỏ độc…) — need design (split into sub-rows) = kit.
- Picture note: Tứ đức Dung and Ngôn "Tự học" cards show Công's embroidery picture (picture workers).
- Root index.html / sw.js not rebuilt (coordinator rebuilds on merge).

## Review r1 (reviewer, 16/11) — branch review/act-text-r1
- Merged origin/main 4f5e5f3b32 (j19 conflict: main had its own whole-word `KWB`; kept the branch's `kWB`, made `mất`/`dễ` whole words so "mất tiền", "dễ thành" keep their colour).
- Fixes by the reviewer (text only): Điểm trang Kèm ("mặt mộc bị chê" was green in Được; Kèm items joined with ", " not " · ", "xét y phục và dung nhan"); Liếc mắt đưa tình j22 ("một phi tần nắm 1 chứng cứ của ngươi" — was a cost shown green in Được); thái y "rõ Sức, bệnh và có thai hay chưa" (lone "bệnh"); j17 generic "chọn rồi xem kết quả ở bước sau" (lone "chọn"); KIT_GLOSS "Tác phẩm" 0..10 → "từ 0 đến 10".
- Scan on merged build, 755x1000: dau brk 0 dots 0 pct 0 frag 0 word1 0 sign 0 kemgain 3 (K8-1: "kèm:/thành:" labels leak on place cards Xin bắt mạch, Liếc mắt) twice 1 long 90; hh brk 0 dots 0 word1 2 (fixed after) kemgain 2 long 110. `long` is much higher than the worker's 41 because the material dialogs (Tài nghệ tier line, 4-5 lines) and Đề bạt/Phạt rows are now measured; all = kit K8.
