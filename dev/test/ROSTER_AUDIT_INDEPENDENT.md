# KIỂM ĐỘC LẬP sổ vị trí, hành động, động cơ (j95 + j95b)

Người kiểm độc lập, 2026-11-14. Không sửa code game. Kết luận: **KHÔNG ĐẠT** (6 lỗi cần sửa trước khi phát hành, 5 lỗi nhỏ).

## 0. Bản được kiểm

- Nhánh `review/schedules-audit` = `origin/review/balance` (79ea90c: jtime4 4 buổi thật, jpal cung ở, j92/jwd92b tủ đồ và giá họa, jkiep, jage, jcmood, j96, j97)
  gộp `origin/review/schedules` (8a925a4). Xung đột duy nhất: `dev/build/assemble.py`; giữ danh sách của balance, nối `j95.js`, `j95b.js` sau `j84.js`
  (đúng chỗ PROGRESS_schedules ghi). `python3 dev/build/assemble.py` dựng sạch, `node --check` qua, 0 lỗi trang.
- 4 buổi THẬT: `BUOI.length === 4` từ jtime4. Bản vá NB=4 trong `roster_audit.js` tự bỏ qua (chỉ chạy khi BUOI có 3 mục), nên mọi số dưới đây là 4 buổi thật.
- Script của tôi: `dev/test/indep/` (không dùng code kiểm của thợ; chỉ dùng bot chơi `dev/measure/inpage5.js` + `inbal.js` để lái ván).
  Phục vụ trang: `(printf '<meta charset=utf-8>'; cat dev/index.html) > <dir>/t.html`, `img/` cạnh đó, `python3 -m http.server`.

## 1. Bộ kiểm của thợ chạy lại trên bản gộp

`for x in "sens 0" "sens 4" "rand 0" "rand 4"; do set -- $x; CAP=6000 node dev/test/roster_audit.js $1 9 out-$1-$2.json $2 & done`

| | đời | lần kiểm | lỗi |
|---|---|---|---|
| bot khôn, 2 shard | 18 (đa số đủ 2 năm; 2 đời bot kẹt TIMEOUT) | 20 399 | **(g) = 8** |
| bot ngẫu nhiên, 2 shard | 19 | 4 223 | 0 |

Đủ 9 xuất thân. 8 lỗi (g) đều là `thẻ có phi tần trong tham số mà chưa qua cổng: wdframe` (xem lỗi 1). Các bất biến khác của thợ sạch, nhưng
bộ kiểm của thợ không xét các điều ở lỗi 2–6 (tôi tìm ra bằng kiểm riêng). Hai đời bot khôn dừng "TIMEOUT" (cnv tháng 10, tt tháng 7): bot
kẹt, không thuộc sổ, nên thợ cân bằng xem lại.

## 2. Kiểm của tôi

| script | làm gì | quy mô |
|---|---|---|
| `ia_hook.js` + `ia_bot.js` | bộ so riêng chạy sau mỗi `spend` / `goTo` / `nextBuoi`: A tự đếm người sống (rivals, kẻ hầu, cung nữ thân tín, S.court, S.men, hoàng tự) so với sổ, trùng tên; B mỗi dòng đủ 4 khắc, mã nơi hợp lệ, mã cung `rN` phải là chủ cung còn sống; C S.where, whereOf, countAt mọi mã, S.menW, dòng của ngươi = S.place; D kẻ hầu "theo hầu" ở đúng chỗ chủ, "phận sự" ở cung chủ; E luật cung ở (HH, HQP ở một mình, Tần+ chủ vị, ≤3 người thiên điện); F dòng "ở cung mình" nằm đúng cung nàng; G người chết, phế phi, cấm túc; H hành động thù địch ĐÃ CHẠY khi thiện cảm ≥40 phải có lý do tìm độc lập (tin đồn, bị khống chế, lệnh chủ phe); P việc ghi lùi vào khắc đã qua có trái với điều người chơi tận mắt thấy; S ser→deser giữa buổi, giữa thẻ, giữa minigame | 40 đời (bot khôn 22, ngẫu nhiên 18), đủ 9 xuất thân, **75 094 lần kiểm**, 5 531 lần lưu/nạp (2 442 giữa thẻ, 910 giữa minigame) |
| `ia_dom.js` | màn hình thật: đếm bóng trên bản đồ (cả ô xám `data-ak`) và người trên sân khấu ở 40 thời điểm ngẫu nhiên, so với `S.roster`; có lưu + TẢI LẠI TRANG + nạp ô | 755x1000@2 và 1180x820@2, 2 lượt mỗi cỡ, 160 thời điểm, 21 lần tải lại |
| `ia_scen.js` | tình huống: chết giữa buổi, chủ cung bị phế giữa buổi, ngươi vào lãnh cung rồi tải lại, sân khấu lãnh cung, phong Hoàng hậu giữa buổi, tải lại giữa minigame và giữa sự kiện, giá họa của người thiện cảm cao | 10 tình huống |
| `ia_start_stale.js` | 36 đời mới: ngay sau start, ai bị ghi "ở cung mình" sai cung | 36 đời |
| `ia_home_visit.js` | khách ở cung ngươi, lưu, tải lại trang | 4 lần |
| `ia_rostertool.js` | xuất mã "Chép sổ" thật (`xioExport`), chạy `dev/tools/roster.js` cho hiện tại và 32 khắc đã qua, so từng dòng với bản chụp sổ lấy trong trang | 1 ván 9 tuần |

### Phần đạt
- A số người: 0 lỗi / 75 094 (tự đếm khớp sổ, không thiếu, không thừa).
- C bản đồ, whereOf, S.where, S.menW, dòng của ngươi: 0 lỗi. Bản đồ trên màn hình khớp sổ ở mọi thời điểm, trừ trường hợp ở lỗi 2.
- G người chết bị xóa khỏi sổ ở hành động kế tiếp, phế phi ở lãnh cung, người cấm túc ở cung: 0 lỗi.
- E luật cung ở trong trạng thái game: 0 lỗi (nhưng sổ không theo kịp khi cung đổi, xem lỗi 2).
- H runAct: 2 954 hành động thù địch đã chạy, 2 lần thiện cảm ≥40, cả 2 có lý do ngoại lệ ghi đúng. Cổng của runAct làm đúng việc.
- Tải lại trang thật giữa minigame và giữa sự kiện (thẻ q72o): sổ giữ nguyên từng dòng.
- `roster.js` trên mã Chép sổ thật: 41/41 dòng hiện tại khớp; 32 khắc đã qua khớp, trừ các khắc bị ghi lùi (lỗi 4).

## 3. Lỗi

### Lỗi 1 (cao): "Giá họa trộm đồ" không qua cổng động cơ, không có dòng trong sổ
- `j92.js:330` định nghĩa act `giahoa`; `H95` (j95.js:66) không có `giahoa`, nên wrapper `runAct` của j95 bỏ qua (chỉ cổng H95/F95).
  `jwd92b.js:13-14` mỗi tháng gọi thẳng `wdFrame(v,t)` (không qua runAct). Thẻ `wdframe` (`j92.js:396`, tham số `a:key(a)`) không có trong `P95B`.
- Hậu quả: người thiện cảm cao vẫn giá họa được; người chơi bị tố ăn cắp mà sổ không có ai, việc gì, lý do gì.
- Bằng chứng: bộ kiểm của thợ trên bản gộp báo (g) 8 lần; bot của tôi: 23 lần giahoa chạy không có dòng cổng, 23 thẻ "Bị tố ăn cắp" không có dòng lý do.
- Tái hiện (`ia_scen.js`, mục 10): một phi tần `rel=80, oan=0, ghen=0, bac=500`; `motiveOK(v,S,"frame")` trả `{ok:false, why:"thiện cảm 60 với ngươi"}`
  nhưng `runAct(v,S,"giahoa")` vẫn chạy ("… định giá họa trộm đồ nhắm vào ngươi…"), `S.roster.acts` không thêm dòng nào.
- Sửa: thêm `giahoa` vào `H95`; bọc `wdFrame` (hay vòng lặp jwd92b) bằng `motiveOK` + `j95actLog`; khai `P95B.wdframe={p:{a:{h:"giahoa",nb:1}}}`.

### Lỗi 2 (cao): cung ở đổi (jpal `palFix`) mà sổ không đổi theo; có người "biến mất" khỏi bản đồ
- `palFix` chạy SAU khi sổ đã lập: `start` (j27.js:75 gọi palFix sau `start` gốc, mà start gốc đã gọi placeWhere), `endTurn` (j27.js:45, j30.js:40: sau
  e0, tức sau khi buổi mới đã lập sổ), `mapSpots()` (j27.js:54, mỗi lần vẽ bản đồ), `deser` (jpal.js:48). Khi chủ cung bị phế / chết / được phong
  cũng vậy. `j95sync` chỉ dời kẻ hầu về cung mới; dòng của phi tần ("ở cung mình", thói quen ở cung), của cung nữ thân tín và của hoàng tự giữ mã cũ
  đến hết buổi.
- Hậu quả: phi tần ghi "ở cung mình" ở một mã `rN` không phải cung nàng (nhiều khi là mã của chính nàng trong khi nàng ở thiên điện cung khác); mã đó
  không có ô trên bản đồ nên bản đồ ít bóng hơn sổ; người ở dưới chủ cung vừa bị phế vẫn được ghi ở cung cũ.
- Bằng chứng: `ia_start_stale.js`: 20/36 đời mới có người ghi sai cung ngay sau start, 27/36 đời có dòng ở mã không có ô trên bản đồ
  (vd "dtq: Mạnh Linh Lung r12, cung thật r4"). Màn hình iPad 1180x820@2: "r8: sổ có 1 người mà bản đồ không có ô" ở 20 thời điểm liền (buổi đầu), lượt
  sau "r7". Bot: F 1 053 lần, B 28 000+ dòng (vd "Vân Vân Thường khắc 0..3 'ở cung mình' tại r3 mà cung nàng là r4" ngay lúc lập buổi mới tuần 9).
- Tái hiện chủ cung bị phế (`ia_scen.js` mục 2): chủ cung có 3 người ở thiên điện, `head.rank=5; fall(head,"thử"); spend(1)` → người ở thiên điện
  chuyển nhà sang r7/r8/r9 nhưng sổ vẫn ghi Trịnh Thục Nghi "tập múa" ở r2 (cung cũ, chủ đã vào lãnh cung) cho mọi khắc còn lại; cung nữ thân tín của
  người bị phế "theo hầu" ở Ngự hoa viên trong khi chủ ở lãnh cung.
- Sửa: trong `j95sync`, với khắc ≥ khắc hiện tại, dòng nào là việc ở nhà (`rest/sleep/read/eat`, lý do "ở cung mình", thói quen `own`) mà
  `palaceOf(v)` đã đổi thì dời sang cung mới; dời hoàng tự như kẻ hầu; gọi `palFix` trước `j95plan` (hoặc lập lại sổ sau palFix trong start / endTurn).

### Lỗi 3 (trung bình): cung nữ "theo hầu chủ ra ngoài" bị bỏ lại chỗ cũ khi chủ đổi chỗ
- Dòng `mm:` được tính một lần trong `j95planOther` theo kế hoạch của chủ. Khi dòng của chủ đổi sau đó (j95.js:340: được mời sang cung ngươi / không vào
  được nên quay về; người tìm đến j24; `j95bPut` theo câu chữ; hẹn kín) dòng của cung nữ không đổi.
- Bằng chứng: bot D 3 667 lần, vd "Tiểu Thúy 'theo hầu' ở Ngự hoa viên mà chủ Thẩm Bạch Lộ ở cung ngươi", "Hạ Vân 'theo hầu' ở Thái y viện mà chủ
  ở cung ngươi". Bản đồ đếm một cung nữ đứng một mình ở chỗ cũ, ghi là đang hầu chủ.
- Sửa: trong `j95sync`, dựng lại dòng `mm:` cho khắc ≥ hiện tại theo dòng hiện thời của chủ (chủ ở ngoài thì theo, chủ ở nhà thì về hầu ở nhà).

### Lỗi 4 (trung bình): ghi lùi vào khắc đã qua trái với điều người chơi tận mắt thấy; số bản đồ đã ghi bị viết lại
- `j95bPutPast` (j95b) đặt người vào khắc cuối của buổi vừa qua theo câu tin tuần ("Tai mắt kể: X đứng đợi ngự giá ở ngự hoa viên"), và chạy lại
  `R.m[kh]=j95counts(R,kh)` nên con số "bản đồ đã hiện" của khắc ấy cũng bị viết lại; `roster.js` vì thế không thể phát hiện.
- Bằng chứng: 4 đời bot khôn, 607 lần ghi lùi, 26 lần trái mắt thấy: vd "Từ Tú Uyển khắc 3: sổ sửa lại r2→vuon, mà lúc đó ngươi đứng ở vuon (không hề
  thấy nàng)"; "Liễu Hàm Hương khắc 3: sổ sửa lại home→ksp, mà lúc đó ngươi đứng ở home (đã thấy nàng ở đó)". `ia_rostertool.js`: roster.js cho khắc
  cuối các buổi 7-3, 8-3 khác bản chụp lúc buổi đang diễn ra (ví dụ v2 "ngủ ở cung mình r2" thành "ở Dưỡng Hòa điện").
- Sửa: không ghi lùi nếu ở khắc đó người chơi đứng ở chỗ cũ hay chỗ mới (hoặc chọn khắc khác / bỏ tin); không viết lại `R.m` của khắc đã qua (giữ số
  bản đồ đã thật sự hiện).

### Lỗi 5 (trung bình): khách đang ở cung ngươi biến mất khỏi sân khấu sau khi tải lại
- `deser` (j6.js:60) dựng lại `S.visit` ở cung ngươi bằng `homePeople()`; hook `render` của j95 chỉ đồng bộ khi khóa / khắc đổi, nên `j95stage` không
  chạy và khách không được vẽ lại, dù sổ vẫn ghi nàng ở đó.
- Tái hiện (`ia_home_visit.js`, iPad): 4/4 lần. Trước khi lưu: sổ ["home","visit","me","được mời / sang thăm cung ngươi"], sân khấu có nàng; tải lại: sổ y nguyên,
  sân khấu chỉ còn cung nữ. `ia_dom.js` cũng bắt gặp: "sổ ghi Lâm Thanh Ca ở đây (home, visit) mà sân khấu không vẽ".
- Sửa: sau `deser` (hoặc ở lần render đầu sau khi nạp) gọi `j95sync()` / `j95stage`.

### Lỗi 6 (trung bình): sân khấu lãnh cung vẽ người không có trong sổ
- `j2.js:112`: khi không có phế phi nào còn sống, sân khấu lãnh cung vẽ "Phế phi họ Lý" (người bịa, không có trong sổ, bản đồ không đếm). Ngoài ra sân
  khấu chỉ vẽ tối đa 3 phế phi (`coldVisit` j14.js:5 tối đa 4), sổ có thể có nhiều hơn. Bộ kiểm của thợ bỏ qua lãnh cung (`S.place!=="lc"`).
- Tái hiện (`ia_scen.js` mục 5): đời mới, `goTo("lc")`: sân khấu `["fallen:Phế phi họ Lý"]`, sổ ở lc chỉ có ngươi và cung nữ thân tín. Màn hình: 10 thời điểm ở
  cả hai cỡ.
- Sửa: bỏ người bịa (lãnh cung vắng thì để trống, có câu tả cảnh), vẽ đủ phế phi trong sổ.

### Lỗi nhỏ
7. Sân khấu Kính sự phòng gắn nhãn "Tổng quản" cho thái giám Kính sự phòng (`c:ksp`, sổ ghi "Thái giám Kính sự phòng … · Giữ thẻ bài"), trong khi Tổng quản
   thật (`c:tq`) đang hầu Hoàng thượng ở chỗ khác: hai người cùng được gọi "Tổng quản".
8. Hai kẻ hầu trùng tên trong cùng một cung (vd hai "Lão Quế Tử", s9 và s10, của Đoan Mộc Bích Dao, đời thd): sổ và roster.js không phân biệt được ai ở đâu.
9. Ngươi vào lãnh cung: cung nữ thân tín theo ngươi, nhưng các kẻ hầu khác vẫn ghi "phận sự trong cung" ở Ngọc Thanh các với đối tượng là ngươi. Cần
   quyết định: theo vào lãnh cung, ở lại giữ cung, hay bị rút về.
10. Sổ chỉ cập nhật ở hành động kế tiếp: ngay sau `deathSentence` sổ vẫn có người chết cho tới khi có một spend/close (ổn trong chơi thật vì cái chết luôn
    xảy ra trong một hàm có bọc, nhưng nếu xuất mã đúng lúc thẻ báo tử đang mở thì roster.js sẽ thấy người chết còn trong sổ).
11. Chỉ thấy trong bot (chưa tái hiện được trên giao diện thật, 6 lần thử): sau `deser` có lúc thêm một kẻ hầu tên "<tên> 2" (vd "Bích Ngọc 2"); số lần
    vị trí của ngươi đổi sau khi nạp trong bot là do bot thay `render` (không tính là lỗi game).

## 4. Kết luận

**KHÔNG ĐẠT.** Cổng động cơ của runAct, đếm người, bản đồ và các góc nhìn hoạt động đúng, và roster.js đọc đúng mã Chép sổ thật. Nhưng trên bản gộp
thật (4 buổi, jpal, j92) sổ chưa là "một sổ duy nhất không mâu thuẫn": giá họa đi ngoài cổng và ngoài sổ (1), sổ không theo kịp việc đổi cung nên có người
biến khỏi bản đồ (2), cung nữ bị bỏ lại (3), nhật ký bị ghi lùi trái mắt thấy (4), sân khấu sau khi tải lại và ở lãnh cung không khớp sổ (5, 6).
Sau khi thợ sửa 1–6, chạy lại: `dev/test/roster_audit.js` (cả 4 shard) và `dev/test/indep/ia_bot.js`, `ia_dom.js` (2 cỡ), `ia_scen.js`,
`ia_start_stale.js`, `ia_home_visit.js`, `ia_rostertool.js`; mục tiêu A–H, P = 0 (S chỉ còn các khác biệt do bot thay render).
