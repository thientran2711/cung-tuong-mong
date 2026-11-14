# PROGRESS: ai ở đâu (review/schedules, module j95)

Nhánh `review/schedules` từ `origin/review/balance`. Chỉ thêm module mới `dev/build/j95.js` (nối cuối `assemble.py`, sau j84),
không sửa file cũ. Chưa gộp main: chờ thợ cân bằng gộp vào review/balance và đo lại.

## review/schedules2 (2026-11-14): sửa theo kiểm độc lập (dev/test/ROSTER_AUDIT_INDEPENDENT.md, KHÔNG ĐẠT 6 lỗi + 5 lỗi nhỏ)
Nhánh `review/schedules2` từ `origin/review/schedules-audit` (gộp thêm `origin/review/balance` 14c3c45). Chỉ sửa j95.js, j95b.js và
module mới `dev/build/j95c.js` (nối sau j95b trong assemble.py). Không sửa module khác.
1. Giá họa: `giahoa` vào H95 (runAct qua cổng); j95c bọc `wdFrame` (đường hằng tháng jwd92b và kế hoạch NPC gọi thẳng ACT.f): motiveOK,
   ghi sổ, lưu lý do lúc đặt đồ (`j95z().plant`); thẻ "Bị tố ăn cắp" khai `P95B.wdframe` (vai h giahoa, lý do = lý do lúc đặt), dòng sổ ghi
   ngay khi tạo thẻ. Thêm cổng cho bỏ độc vào món (j83 `wkPoison`).
2. Đổi cung: `j95fixHouse` (trong j95sync, từ khắc hiện tại): việc ở nhà sang cung mới, đi thăm theo người được thăm hoặc quay về, không ai ở
   cung của người đã mất / bị phế / không làm chủ cung, thái y bắt mạch theo bệnh nhân, hoàng tự ở nhà mẹ hiện tại. j95c: palFix đổi cung
   thì đồng bộ ngay; mỗi lần đồng bộ thấy cung ai đổi thì palFix trước; phế, chết, vào/ra lãnh cung thì palFix + đồng bộ ngay.
3. Cung nữ thân tín dựng lại theo dòng hiện thời của chủ (chủ ra ngoài thì theo, về thì hầu ở nhà); kẻ hầu phận sự ở cung hiện tại.
4. `j95bPutPast` không bao giờ sửa khắc đã hiện, không tính lại R.m: nếu sổ buổi vừa qua đã có nàng ở đó thì ghi theo khắc ấy; nếu không, việc
   rơi vào đầu buổi mới (J95B.next, j95c đặt ngay sau khi lập buổi, trước khi ai thấy); buổi hiện tại mà ngươi đứng ở chỗ cũ / chỗ mới thì bỏ câu.
5–6. Sân khấu đối chiếu sổ mỗi khi dựng lại (nạp ván, coldVisit, homePeople, goTo): khách ở cung ngươi còn sau khi tải lại; lãnh cung vẽ đủ
   phế phi trong sổ, không có "Phế phi họ Lý", vắng thì để trống với câu tả cảnh.
Nhỏ: thái giám Kính sự phòng mang tên thật (không "Tổng quản"); tên kẻ hầu không trùng (thêm số khi trùng); ngươi vào lãnh cung thì kẻ hầu
còn lại hầu ở lãnh cung, con về Hoàng hậu / Thái hậu như con phế phi; sổ bỏ người chết ngay sau deathSentence; nạp ván không sinh thêm kẻ
hầu (staffInit lúc nạp chỉ khởi tạo ai chưa có danh sách); nạp ván / qua buổi mà ngươi ở lãnh cung thì đứng ở lãnh cung, sân khấu khớp nơi đứng.
Kit (review/kit-j95): `j95habitsMine()` có `told` (tai mắt đã báo kẻ thù biết chỗ quen; `watchers` chỉ đếm kẻ đã được báo), `j95followers(p)`
trả [{id,name,role}] người đang theo hầu p ở khắc hiện tại.
Kiểm: bất biến mới (j)–(q) trong `dev/test/roster_audit_c.js`; kết quả trong dev/test/ROSTER_AUDIT.md.

### Vòng cuối (thợ j95 tiếp nhận từ WIP eae4f96)
- Gộp `origin/wip/balance-fix1` (ce8979c, 9039cd5: accCdT 36) rồi `origin/review/balance` 9e869f0 (v9b: hz 3.2, illDie 2). Thay đổi chỉ là núm thì không cần kiểm lại cả bộ;
  đổi luồng tố / hại thì chạy lại cả hai bộ kiểm. Thêm: j96 hỏi `rosterWhere` (j95c trả lời từ sổ); bỏ "có thể" trong chữ j95.
- j95b: tách câu cả khi dấu chấm nằm trong ngoặc ("(Chứng cứ X +1.) Tai mắt kể: Y …" không còn đặt X vào nơi của Y); nơi đang RỜI
  ("được tha khỏi lãnh cung", "rời ngự hoa viên") không đặt ai vào đó (`j95bLexNow`).
- Bộ kiểm: (h) của roster_audit.js dùng cùng luật câu; kiểm độc lập: người lạ j61 ("Người lạ ???") nhận theo `data-p`, không lưu/nạp giữa
  `goTo` (goTo tiêu khắc đi đường trước khi đặt S.place, game không bao giờ lưu lúc đó), Tân Giả khố `tgk` (j42) là nơi thật.
- Kết quả: dev/test/ROSTER_AUDIT.md.

## Đã làm

### 1. Sổ vị trí (một bản ghi duy nhất, `S.roster`)
- Mọi người sống trong cung: Hoàng thượng, Thái hậu, người chơi, mọi phi tần (cả phế phi ở lãnh cung), cung nữ thân tín
  và kẻ hầu của mọi cung, tổng quản / thái giám Kính sự phòng / thái giám bán hàng rong / thái y (S.court), nam nhân j22
  (thái y, thị vệ luôn trong cung; người khác chỉ khi vào cung), hoàng tự. Ở MỖI KHẮC (4 khắc × số buổi) mỗi người có đúng một
  mục: nơi (mã j77), việc, đối tượng, lý do (từ trạng thái thật).
- Lập kế hoạch đầu buổi; bất ngờ có thể đổi giữa buổi (từ khắc 1–3) và được ghi lại; người chơi được ghi theo nơi thật mỗi khắc.
- Mọi chỗ đọc từ sổ: `S.where` và `S.menW` là "góc nhìn" của khắc hiện tại (dựng lại mỗi lần đổi khắc, đi lại, qua buổi);
  `whereOf` đọc thẳng sổ; `countAt` đếm sổ (bản đồ, bóng hữu duyên, thẻ nơi chốn); sân khấu được đối chiếu với sổ (người đi /
  người đến giữa buổi, Thái hậu, Hoàng thượng); `npcEncounters` chạy trên sổ; tai mắt dò nơi ở đọc `whereOf`; `srvWhere` (j42)
  đi qua `whereOf`; người tìm đến (j24) được ghi vào sổ (nàng ở cung ngươi khắc đó).
- Các quyết định của các wrapper cũ (lời mời j21, ghé thăm, j41 chặn quyền vào, j22 nam nhân) được nhận vào sổ, không ai tự gieo
  vị trí riêng nữa.
- Nhật ký: `S.rlog` giữ tuần hiện tại + 4 tuần trước (mã nơi / việc / đối tượng / lý do theo khắc, từ điển + 8 ký tự mỗi khắc,
  gộp khi 4 khắc như nhau; khoảng 40–80 KB cho 5 tuần). Có cả số bản đồ đã hiện mỗi khắc và các hành động qua cổng.
- Save cũ: chưa có sổ thì dựng mới ở lần vẽ đầu; NPC chưa có thói quen thì sinh mới.

### 2. Thói quen + ý định + bất ngờ
- THÓI QUEN (ẩn) mỗi phi tần: 2–4 nơi ưa thích theo 4 buổi chuẩn Sáng/Trưa/Chiều/Tối, sinh từ tài nghệ (đàn, họa, thơ, múa,
  y), tính (Hiền lành/Nhu mì → lễ Phật ở Từ Ninh buổi sáng, Kiêu ngạo → dạo vườn, Tham vọng → Kính sự phòng, Đa nghi → ở cung...),
  sắc (dạo vườn chiều tối), phe (sang cung chủ phe), bạn thân. Trôi theo tháng (15%), đổi khi lên/xuống phẩm; có thai/yếu → Thái y
  viện; thất sủng → ít ra ngoài; mùa (đông ít ra vườn), mưa; hứng ra ngoài của từng tuần.
- Ý ĐỊNH tuần (mạnh hơn thói quen, 70% ở buổi định): tranh sủng (ra vườn lúc Hoàng thượng hay dạo), thăm bạn, tránh kẻ thù,
  thăm người chơi (thân), gây sự với người chơi (thù, qua cổng động cơ), rình chỗ người chơi hay đến (khi đã học được thói quen
  của nàng). Lệ thỉnh an Hoàng hậu buổi sáng là bổn phận. Buổi chiều tối có sang chơi cung người không ghét.
- BẤT NGỜ 22%: Hoàng hậu / Thái hậu cho gọi, mưa quay về, đổi ý ra vườn, khó ở ghé Thái y viện; có thể giữa buổi.
- HOÀNG THƯỢNG: sáng thượng triều (Cần Chính), trưa ngự thiện/nghỉ, chiều phê tấu hoặc dạo vườn, tối ngự tẩm; cộng tính (Chăm chính
  sự, Đa tình), tâm trạng, tuần triều chính bận (20%), một thói quen riêng trôi dần, người đang sủng hay ra vườn; bất ngờ 22%.
- Thái hậu: sáng nhận thỉnh an, đôi khi ra vườn. Kẻ hầu: hầu chủ, cung nữ thân tín theo chủ ra ngoài, thỉnh thoảng đi việc vặt.

### 3. Thông tin thật, hai chiều
- Người chơi học thói quen: thấy ai ở đâu (cùng chỗ) hoặc tai mắt dò nơi ở → ghi; tai mắt có thêm tin "nàng hay ... ở ... buổi ..."
  (thói quen thật). `habitsKnown(p)` trả dữ liệu cho thẻ người (đã thấy ≥2 lần hoặc nghe kể; đánh dấu "tin cũ, lần cuối N tuần trước").
- NPC học thói quen người chơi: nơi nàng hay đến theo buổi (phai 25% mỗi tuần); kẻ thù (hostility ≥45) dò ra (theo Mắt, tai mắt cài
  trong cung nàng) → đến rình đúng chỗ, gặp thì 35% ra tay (qua cổng động cơ). Tai mắt của nàng có thể báo "X đã dò ra ngươi hay
  đến ... cho người rình" (tin thật). `j95habitsMine()` cho giao diện.

### 4. Hẹn kín, mưu, bắt gặp (hai chiều)
- Người đang tư thông (j22 `v.affair`): mỗi tuần 1–2 lần hẹn, chủ yếu buổi tối, 2 khắc, ở chỗ khuất (sau hòn non bộ Ngự hoa viên,
  tường đổ gần Trường Môn viện, dãy kho sau Kính sự phòng, phòng thuốc sau Thái y viện nếu là thái y); hay dùng lại một chỗ.
  Cả nàng và nam nhân được đặt vào sổ (và S.menW) đúng chỗ, bất chấp quyền vào (họ lén).
- Người đang chuẩn bị mưu (j70, bước "prep"): một lần trong tuần đến nơi lộ trình mưu ghi (Thái y viện mua thuốc...) hoặc chỗ khuất
  gặp thái giám của mình.
- Bản đồ: chỗ đang có hẹn kín ghi thêm "Có hai bóng người đứng sát nhau trong chỗ khuất" vào mô tả nơi (không lộ ai); API
  `j95mapSigns()`.
- Người chơi có mặt (đi tới hoặc Lẻn vào) đúng khắc: gieo BẮT GẶP: thấy rõ mặt / chỉ nhận ra một người (nàng, hoặc nam nhân mà không
  rõ nàng là ai) / họ kịp tản ra để lại dấu vết (khăn tay, ngọc bội...; sau này gặp đúng chủ nhân thì 35% nhận ra → chứng cứ) /
  NGƯỢC LẠI họ thấy người chơi (kẻ hiểm có động cơ thì oán, có thể diệt khẩu; người khác sai cung nữ mang bạc sang mua chuộc).
- Sau khi bắt gặp, lựa chọn (chỉ hiện chi phí): Tố giác lên Hoàng hậu / Hoàng thượng (đủ chứng cứ thì nàng bị xét tội, nam nhân bị
  xử trảm; thiếu thì bị coi là vu cáo), Xử tội (nếu là Hoàng hậu), Giữ làm con bài khống chế (chứng cứ j78), Lặng im đổi ân tình,
  Giả như không thấy.
- Hai chiều: khi người chơi hẹn riêng (j22 `tryst`), phi tần đang có mặt cùng chỗ cùng khắc gieo cùng xác suất; quyết định theo
  tình cảm thật (thù + đủ chứng cứ → tố giác; thân → giữ kín đổi ân tình; còn lại giữ chứng cứ). NPC cũng bắt gặp NPC.
- Không bao giờ báo một chuyện tư thông không có thật.

### 5. Cổng động cơ `motiveOK(a, t, kind)` (dùng chung)
- Hành động thù địch cần oán / ghen / ghét / khác phe / tính hiểm độc đủ cao (≥30) và KHÔNG làm khi thiện cảm ≥40, trừ lý do
  được ghi: bị khống chế (kẻ khác nắm chứng cứ của nàng và ghét mục tiêu), lệnh chủ phe, tin đồn hiểu lầm. Hành động thân thiện
  không làm khi vừa ghét vừa oán sâu (trừ cùng phe).
- Đã bọc: `runAct` (mọi hành động NPC: j9/j24/j28 npcAct, j40 mindRun, j70 thực thi, j78), `newPlot70` (mưu j70 mới),
  ý định j95 (thăm / gây sự / rình), j24 người tìm đến (mỉa mai / thăm). Mỗi lần kiểm ghi vào sổ: ai, khắc, việc, đối tượng,
  cho làm hay CHẶN, lý do.
- Sự kiện có diễn viên (j68, j7, thẻ truyện/quest/quà...): xem mục 6 (module j95b).

### 6. Module j95b (bản vá 3 chỗ hở, nối sau j95): `dev/build/j95b.js`
Chỉ bọc hàm, không sửa file cũ. Tắt riêng: `window.__j95boff=1`.

**(1) Sự kiện đi qua cổng động cơ.** Bảng vai `E95B` cho đủ 72 mẫu j68 (theo từng ô diễn viên: `h` = ra tay với ngươi hoặc với
một diễn viên khác, `f` = tử tế với ngươi, `n` = trung lập có lý do, `tgt` = là đối tượng của diễn viên kia) và bảng `P95B` cho các thẻ
khác có phi tần trong tham số: 16 sự kiện j7 (hình nhân, vu oan, xạ hương, mua chuộc Kính sự phòng, kết minh, bắt giữ cung nữ...), thẻ
có sẵn (thư lãnh cung, thư tình), truyện xuất thân j4 (thd1), đường cung nữ j42 (cnvBribe, cnvBlack, cnvOrd), quà tặng (giftin),
cảnh báo mưu j70 (j70thr), hội j71 (j71f, j71m), việc nhờ j72 (q72o).
- Khi mẫu j68 chọn người (`rv6`), chỉ những người qua `motiveOK` theo vai của ô đó mới được chọn. Các thẻ khác: nếu người được chọn
  không qua cổng thì chọn lại một người qua cổng (hình nhân: người ghen nhất trong số qua cổng; nếm thử độc: người hiểm nhất...), không
  có ai thì sự kiện không xảy ra. Kết minh (pact) cần cả lý do với ngươi lẫn lý do chống Hoàng hậu.
- Khi thẻ hiện lên (hoặc khi bot chọn / đóng), mỗi diễn viên được ghi vào sổ: `S.roster.acts` một dòng `{id, khắc, việc, đối tượng,
  lý do, cho làm, ngoại lệ, src = mã sự kiện}`; `dev/tools/roster.js` in thêm "nguồn: <mã sự kiện>".
- Trong lượt "người tìm đến" j24, mẫu j68 đã xét giữ đúng phán quyết của mình (cổng chữ của j95 không chặn nhầm sự kiện thù địch là "thăm").

**(2) Câu chữ có nơi chốn dời người trong sổ.** Bảng nơi theo từng biến thể cho mẫu j68 và thẻ j7 (ví dụ "hẹn ngươi ở đình nghỉ vắng"
→ Ngự hoa viên, "ghé cung ngươi" → cung ngươi, "chặn ngươi giữa đường" → chỗ ngươi đang đứng, "khóc với Hoàng hậu" → Càn Ninh, Hoàng
thượng "chọi dế ở ngự hoa viên", "cho gọi ngươi sang Dưỡng Tâm điện", thái y / họa sư / nhạc sư đến cung ngươi, hoàng tự "trốn học ra
ngự hoa viên"...). Thẻ khác: quét câu chữ (từ điển nơi + loại câu đồn / thói quen / quá khứ / tương lai / "vọng sang" / người được sai đi).
- Đặt cho khắc lúc thẻ hiện. Lượt "người tìm đến" j24 cũng chỉ ghi khách vào cung ngươi lúc thẻ hiện (trước đây ghi lúc tạo thẻ, nên thẻ
  hiện trước đó có thể bị đè).
- Việc quyết lúc chuyển buổi / tuần / tháng (tin tuần j75 "Tai mắt kể: X đứng đợi ngự giá ở ngự hoa viên", "dâng canh sâm lên Dưỡng Hòa
  điện", báo cáo tháng, việc NPC trong buổi) được ghi vào buổi vừa qua (khắc cuối còn trống), nên nằm trong nhật ký `S.rlog`; tin nào đặt
  phế phi / người đang cấm túc ra ngoài là tin sai nên bị bỏ.
- Không dời người đang hẹn kín ở khắc đó, phế phi (trừ lãnh cung), người cấm túc; ghi lý do bỏ qua.

**(3) Hiểu lầm do tin đồn.** `S.j95b.rum` (lưu trong save) + `v.j95rum` (j95 đã đọc làm lý do ngoại lệ).
- Nguồn: hành động "tung tin đồn" của NPC về ngươi (j9/j28, kể cả mưu j70 loại tin đồn), mưu j70 thành công với phi tần khác mà kẻ chủ
  mưu đổ cho ngươi, người nắm chứng cứ thật về việc ngươi đã hại ai (kiểu j78) kể cho nạn nhân, và tin bịa hằng tuần của người có động cơ
  (Nhiều chuyện / Hiểm độc / Ghen tuông / Đa nghi). Người tung phải qua cổng `motiveOK(x, ngươi, "rumor")`.
- Thật hay giả: thật nếu ngươi đã thực sự ra tay với người đó trong 12 tuần (sổ hành động của chính ngươi), không thì là lời bịa của kẻ tung.
  Người nghe tin theo độ tin (thân với kẻ tung, Đa nghi, tin thật dễ tin hơn): Oán với ngươi +18..30, thiện cảm −12.
- Sổ: dòng `misbelief` "tin đồn: ngươi …, nguồn: X (chuyện có thật / bịa đặt; qua act / j70 / j78 / tick)" và dòng `rumor` của kẻ tung.
  Mọi hành động của người hiểu lầm nhắm vào ngươi trong 8 tuần mang lý do "tin đồn: …, nguồn: …" (kể cả khi thiện cảm còn ≥40: ngoại lệ có ghi).
  Người hiểu lầm có thể trả đũa (30%/tuần, qua cổng).
- Thông tin thật: ngươi chỉ biết qua thẻ "Nghe đồn" (theo Mắt / tai mắt) với nhãn "(Lời đồn…)", sổ tay người ghi "Nghe đồn: …". Lựa chọn
  chỉ hiện chi phí: "Sang gặp X giải bày" (1 khắc), "Cho người tra xem ai tung tin" (1 khắc, 10 bạc; tra ra là tin thật: chứng cứ về kẻ
  tung +1), "Mặc kệ". Gặp mặt: thẻ người có thêm "Giải bày hiểu lầm" (có từ chỉ độ chắc). Tin bịa được giải: hết hiểu lầm, oán quay sang
  kẻ tung (nếu đã tra ra). Tin thật: khó giải, chỉ nguôi một nửa.
- Dữ liệu cho kit: `j95bRumours()` (những hiểu lầm ngươi đã nghe đồn, chưa giải).

## Kiểm

### Độ khó đoán (dev/test/roster_sim.js, 50 tuần × 4 đời mỗi cấu hình, đoán theo đúng buổi tuần trước)
| | xúc xắc cũ | j95 |
|---|---|---|
| phi tần, 3 buổi | 69% | **45%** (theo khắc 43%) |
| phi tần, 4 buổi | 75% | **46%** (theo khắc 46%) |
| Hoàng thượng, 3 buổi | 70% | 60% |
| Hoàng thượng, 4 buổi | 74% | 54% |
Ghi chú: xúc xắc cũ KHÔNG phải 15% như ước đoán ban đầu, mà rất dễ đoán (65–75%) vì "ở cung mình 35–80%" và buổi tối ai cũng ở
cung. j95 nằm giữa mục tiêu 35–55%. Hoàng thượng hơi dễ đoán buổi sáng (thượng triều là lệ).

### Bất biến mỗi khắc
- Mô phỏng thẳng 50 tuần × 8 đời (3 và 4 buổi): 5600 lần kiểm, 0 trùng, 0 thiếu, 0 lệch số người, 0 lệch bản đồ, 0 lệch whereOf,
  0 người chết còn trong sổ.
- Bot chơi thật: 36 đời (18 khôn, 18 ngẫu nhiên, đủ 9 xuất thân kể cả cung nữ), 17 449 lần kiểm, 0 lỗi ở cả 6 bất biến; chi tiết dev/test/ROSTER_AUDIT.md.
- Màn hình thật (Playwright, Fold 755x1000@2 và iPad 1180x820@2): xem ROSTER_AUDIT.md.

## Nhu cầu giao diện (chủ kit làm; j95 chỉ trả dữ liệu)
1. Thẻ người, mục "Thói quen": `habitsKnown(p)` → dòng "Thường thấy nàng ở X buổi chiều" (+ "tin cũ, lần cuối N tuần trước"), nguồn
   (Chính ngươi thấy / Tai mắt).
2. Bản đồ: dấu "hai bóng đứng sát nhau" cho chỗ có hẹn kín (`j95mapSigns()`); hiện mới chỉ có dòng chữ trong mô tả nơi.
3. Thẻ của chính người chơi: "Nơi ngươi hay đến" + số kẻ đang rình (`j95habitsMine()`), chỉ hiện khi tai mắt đã báo.
4. Bản đồ đếm cả kẻ hầu theo chủ (ví dụ Ngự hoa viên 20 bóng khi đông người); nếu muốn bóng chỉ cho người "đáng kể" thì kit quyết
  định cách hiện (số vẫn lấy từ sổ).
5. Sân khấu chưa vẽ kẻ hầu / nam nhân đi theo (chỉ có trong sổ).
6. Hộp bắt gặp và các lựa chọn dùng hộp thoại sự kiện có sẵn (Q / showModal), chỉ hiện chi phí.

## Cho thợ cân bằng (review/balance)
- Cổng động cơ chặn khoảng 4% hành động thù địch của NPC qua runAct (34/848 trong 36 đời bot; những lần hại khi thiện cảm cao hoặc động cơ yếu), và một phần lượt "người tìm đến" j24; hẹn kín có thêm đường bị bắt gặp (cả người
  chơi lẫn NPC); kẻ thù có thể rình chỗ người chơi hay đến. Có thể đổi tỉ lệ chết / HH: cần đo lại.
- Núm: `J95.OWN` (sức hút ở cung mình theo buổi), `J95.SUR` (bất ngờ %), `J95.IT` (theo ý định %), xác suất trong `j95catchRoll`.
- Tắt để đo so sánh: `window.__j95off=1`.
