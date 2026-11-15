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
