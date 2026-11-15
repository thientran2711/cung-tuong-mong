# Review r7: review/opt-render (54f381436) merged on main f500d0464 — PASS (branch review/opt-render-r7)

Merges: main ee5758195 (close-bugs) then main f500d0464 (tabs-kit). Site rebuilt (index.html / sw.js / assets.json committed).

## Reviewer fixes on r7
1. NAME CLASH: opt-render's result-seal helper `kitSeal(ok)` (j63) vs main's Trân nữ seal `kitSeal(o)` (jseal, KIT §39) — one global
   function would have replaced the other in the bundle (HUD seal or result card broken). Renamed to `kitResultSeal` (j63, KIT §7 / §53).
   Bundle check: every function opt-render adds is declared exactly once; no new duplicate top-level names.
2. "Thái y bắt mạch" (pregFind, j75: keep secret / announce) slipped cost mode — its opts are set AFTER the literal (`card.opts=[…]`), so both
   the static scan and kitIsEventChoice missed it; F (real play) caught it. Fixed `ev:1`; opt-scan.py now also scans `NAME.opts=[…]`
   (classified by the flags of the `const NAME={…}` literal) and FAILS on the old j75 (verified), 0 unclassified now.
3. ONE "no Tốn: không" implementation: kitHideOut (jk2b) drops the empty Tốn row; the close-bugs wrapper in jclose §6 removed (KIT §42.6 says so).
4. ONE kit sample page: opt-render's `?kit` / `kitSample()` dropped; its samples are `KIT_SAMPLES` in jkitpage.js (#kit, KIT §47), id "§53":
   chip tones + kitRisk ×3, an event option in cost mode built from the game's OWN modal markup (button.opt + dilLine) through kaNorm →
   kitHideOut (so hint + risk come from the real kitHint), kitResultSeal ×3, kitKemRow. KIT §53 (registry slot for opt-render) = index of
   the parts; rules stay in §7 / §28.6. KIT numbers: no clash (§41 kitMeMark, §42 kitLine, §43–§47 tabs-kit, §53 opt-render).

## The 6 FAIL items of r6
1. Every event in cost mode: `opt-scan.py --fail` 0 unclassified (47 PEND pid · 23 ev · 25 act · 1 shop · 1 kit · 90 info).
   opt-render.js F (real endTurn play, all hooks): 70–94 dialog kinds per size, all event / shop, 0 slipped (after fix 2).
2. Hints honest, from the option's own data, context-based, sharper with Tâm cơ: tt1 "cha hài lòng; nhưng … Hoàng hậu để bụng" / "cha phật ý";
   tt3 "Hoàng hậu bị phế …; khó thành; hỏng thì cả họ bị tru di"; nc1 "nhận việc mật; nhưng lộ là chết"; ch2 "…; hỏng thì bị ban chết";
   vase "nàng ta bị đánh hai mươi trượng; nhưng kẻ hầu sinh oán (nhiều), mang tiếng thất đức"; giu "Thái hậu hài lòng; nhưng lần này không
   thể có thai" vs "được giữ long thai (nếu có); …". night1 plain/sharp: the option that fits the emperor reads "dễ thành" (+ "ngài chăm
   chính sự, rất hợp" sharp), the others "thành bại khó đoán".
   NOTE (not blocking, for review/event-balance): at the VAGUE level (Tâm cơ < 25, i.e. most new lives: start tamco 10+R(20)) the 4 night1
   options still read the same ("đêm vui, được để mắt", all "có rủi ro"), and giu 2/3 "có phúc con cái" — by the approved "rõ dần theo
   Tâm cơ" design, but a low-Tâm-cơ player cannot tell night options apart. Also same-hint warnings: prep, Thanh minh, Ban cung.
3. Wording: no "Tốn: không", no retired phrases (chuyện khác / có cái giá / thế đối thủ / có lợi về), no digit in any hint — all sizes.
4. Active pickers (KIT_ACT_PIDS 15 + act-flagged) keep full numbers, no hint / risk (B: 15/15 at every size).
5. Kit: kitRisk = kitChip tones g/w/r (.kchip.w in j79 kit chip CSS), kitHintRow (.ef.i j63 kit CSS), kitKemRow (.kkem j63), kitResultSeal
   (.sure); no private colour block (k-hint / #3f7a52 … gone); kit_dupes OK; samples on the one kit page.
6. Night Bạc −5 traced: it was the PREP choice's price (Điểm trang lộng lẫy), already shown as its Tốn; snapshot re-based at night1 (j75).
   D at every size: prep paid 5, night card Được Sủng / Ân tình only, NO Bạc line, seal KẾT QUẢ (no roll), Kèm "12 phi tần ghen thêm N" collapsed.

## Tests (r7 build)
- `node dev/test/opt-render.js` 1180x820@2, 755x1000@2, 1000x755@1, 1366x1024@2, 844x390@2: 0 fails, 0 page errors, no overflow / wide option.
- `node dev/test/kit-page.js` 5 sizes: 8 samples each, 0 errors, 0 overflow (looked at the §53 samples at 755x1000).
- Old save (made with main's index.html) loads in the r7 build at 1180x820, 3 endTurn, 0 errors, no overflow. 390x844: opening reel renders, 0 errors
  (branch changes no layout).
- `python3 dev/test/opt-scan.py --fail` exit 0; `node dev/test/kit_dupes.js` OK.

# Kiểm duyệt: review/opt-render (a8ec98511) gộp lên main 70c792d4 — FAIL

Nhánh gộp: `review/opt-render-r6` (gộp sạch, không xung đột). Dựng bằng `dev/site/build_site.sh` (không commit bản dựng).

## Đạt
- `dev/test/opt-render.js` 1180x820@2: 0 fails, 0 lỗi trang. Mọi dialog PEND (mkP/pushDil): chỉ Tốn/Cần + 1 dòng Gợi ý (không số) + nhãn rủi ro; không Được/Mất/thang.
- Gợi ý rõ dần theo Tâm cơ (5/30/70): vague → plain → sharp (giu: "lòng người trên" → "người trên hài lòng" → "Thái hậu hài lòng").
- Thẻ kết quả: không gieo ("sure") → "KẾT QUẢ", không dấu đóng; true → THÀNH, false → HỎNG; ghen của 12 phi tần → 1 dòng Kèm gộp, chạm mở tên, người chưa quen không lộ tên.
- Việc chủ động: Hành sự 15/15 thẻ đủ Được/Mất, 0 gợi ý; thẻ người đủ số; cửa hàng (kitShop) đủ số, 0 gợi ý.
- 755x1000, 1000x755, 1180x820, 1366x1024, 844x390: 0 tràn ngang, 0 cắt chữ, 0 lỗi trang (dialog night2 + thẻ kết quả).

## FAIL
1. Sự kiện dựng thẳng vào Q (không pid/pp/hideOut) VẪN hiện đủ số, lọt chế độ giá (§28.6): "Thái hậu triệu" (approachOne, all.js ~2538: "Được Thái hậu → ta: thiện cảm +3"), "Kẻ hầu xin", "Một ánh mắt", và 7 lễ FESTEV (Tết Nguyên đán, Nguyên tiêu, Thanh minh, Trung thu, Giao thừa, Hội Phượng, Lạp bát: Được/Mất đủ). Quét tĩnh còn: Lời mời / Hội thi (j7), Lời cảnh báo, Nội vụ phủ đưa người, Việc của kẻ hầu, Xuất gia?, Ban cung, Thánh thượng ban thưởng... `opt-render.js` không bắt (chỉ duyệt PEND; visitors: 0). Cần sửa cả nhóm ở `kitIsEventChoice` (vd. thêm evOptional/OPTT trừ "Hàng chợ đen", cờ fest cho FESTEV) + test duyệt approachOne/FESTEV/mọi builder.
2. Gợi ý không trung thực/không dùng được — hàm `kitHintPhrase` rơi vào "chuyện khác" cho kết quả chính: tt1 "cha hài lòng/phật ý", tt3 "cả họ bị tru di", nc1 "lộ là chết", ch2 "bị ban chết", vase "Lòng cung nữ +30", "bị đánh 20 trượng", night1 "đêm vui/đêm nhạt" (4 lựa chọn night1 gợi ý Y HỆT nhau → bot đọc gợi ý không thể hơn bot bừa, trái 15:10Z). giu: "Cúi đầu tuân lệnh" (mất thai lần này) ghi "có lợi … [an toàn]" còn "Đút bạc xin giữ" ghi "chẳng được gì rõ" — bỏ mất cái được chính (giữ thai), dắt người chơi sai.
3. Chữ: "có lợi về thế đối thủ" (đọc như giúp đối thủ); "nhưng có cái giá" ngay dưới "Tốn: không" (mâu thuẫn); "có lợi về chuyện khác" vô nghĩa.
4. Picker việc chủ động bị gắn gợi ý rác: vlget/vlcraft/vlnvp/vlout (Mạng che mặt, Tự tay kết mạng), runner — "có lợi về chuyện khác" từ "chơi được 5 phần: Thường", "che kín"…; việc chủ động phải đủ số (15:05Z).
5. LUẬT KIT (16:50Z): nhãn rủi ro `.krisk` là chip riêng, màu tự đặt (#3f7a52/#8a6420/#a0301e) trong khối style `k-hint`, không dùng `chip()`/`kitChip` của kit; `.kakem`, `.neu .seal`, `.khint` cũng CSS riêng. Phải là thành phần kit (KIT.md + trang mẫu kit) qua điều phối.
6. KIT.md §28.6 trỏ `dev/review/event-balance.md` — không tồn tại; rà cân bằng bằng bot (14:30Z/15:10Z) chưa làm. Không có dev/PROGRESS_review-opt-render.md.
7. Bạc −5 của đêm thị tẩm (13:30Z "phải truy nguồn") chưa truy; test tự trừ Bạc −5.
