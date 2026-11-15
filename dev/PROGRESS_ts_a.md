# PROGRESS review/ts-a — Top 15 lô A (sếp duyệt 15/11 02:00Z)

Nhánh từ origin/review/book-release @004d90f5. Mã: `dev/build/jts.js` (thêm vào assemble.py ngay trước j84). KIT.md mục 35.
Thử: `python3 -m http.server 8765` ở gốc kho, rồi `node dev/test/ts-a.js http://localhost:8765/index.html 755x1000@2 dev/shots/ts-a fold`
(và `1180x820@2 … ipad`); `node dev/test/ts-a.js <url> 755x1000@1 /tmp x smoke` chạy 60 tuần liền xem lỗi.
Đo bot: `node dev/measure/run_url.js <url> sens 80 out.json` rồi `python3 dev/measure/an7.py out.json`.

## Đã làm (mỗi ý: có sẵn gì → nối gì)
- **(6) Nguy hiểm chung** — có sẵn: Nguy hiểm từng người (j24 danger/bandOf, thang 4 mức). Thêm: một thanh gộp = cơ một tháng có ít nhất một người
  ra tay với nàng (cùng công thức rivalsBuoi: mức × phần nhắm × 9 buổi), chỉ gộp người nàng đã rõ lòng (người chưa rõ đếm riêng: thông tin thật).
  Ô "Nguy hiểm chung: N" ở hàng Tình trạng; chạm → bảng (người nặng lòng nhất, cách tính) + 2 việc: Đóng cửa giữ mình (2 tuần mưu hại giảm nửa,
  Sủng -2), Biếu quà làm lành (12 bạc/người: bớt ghen 8, bớt oán 5). Điềm báo: khi thanh lên bậc (≥30, ≥60) cung nữ thân tín báo trước.
  NPC cùng luật: phi tần bị nhiều người nhắm (≥35) tự đóng cửa giữ mình theo tính nết; giữ mình áp cho cả hai chiều (npcAct).
- **(5) Ngưỡng trước kỳ xét** — có sẵn: điều kiện sắc phong (promoReqP, bảng Phẩm vị j6). Thêm: ô "Xét phẩm: thiếu N/đủ" + bảng Đủ/Thiếu x/y;
  tuần cuối tháng, khi chỉ còn thiếu ≤1 điều, báo trước "Xét phẩm cuối tháng". Trước hai yến thi (tháng giêng: Sắc + Vũ; tháng bảy: Tài + Cầm/Thi)
  báo trước một tuần: phần gốc của nàng, phần gốc cao nhất năm trước (chưa kể vận may).
- **(3) Hoàng thượng triệu riêng** — có sẵn: trò Đàn (rhythm), Cờ (go) ở j82/j91; "Hoàng thượng đến" ghé uống trà (j24). Thêm: mỗi tuần Hoàng thượng
  có thể triệu một phi tần (theo tâm trạng ngài; chọn người theo Sủng^1.4 × Ân tình; cùng luật cho NPC): đàn / cờ / du hồ (du hồ chỉ tháng 4–9;
  đàn/cờ nặng theo bậc Cầm/Kỳ của người được triệu). Trò nhỏ quyết định Sủng +1..+7, Ân tình +1..+4; Bỏ qua = cơ may thường (theo bậc tài nghệ + Tài/Tâm cơ).
  Du hồ: khi biên cương bất ổn (trieu.bien < 50) thẻ ghi điềm báo "cấm quân đang lùng loạn đảng", có lựa chọn xin đổi sang ngắm hoa; nếu đi, 40% gặp
  "Lau sậy khẽ động": chạm Hộ giá trong 3,5 giây → Sủng +6, Danh +4, Ân tình +4; không kịp → cấm quân lo, nàng Sức -8. Không chết, không chi tiết bạo lực.
  Trò mới: du hồ (hái sen trôi qua khoảng Tầm tay).
- **(4) Lễ tấn phong** — có sẵn: thánh chỉ + hoạt cảnh kitEdict, ban thưởng tấn phong. Thêm: sau khi nàng được tấn phong, lễ có khách (phi tần thật,
  lời chúc theo thiện cảm/ghen thật: thân / theo lễ / gượng), quà mừng của người thân (thiện cảm ≥30), rồi chọn lì xì: hậu (8 bạc/khách: bớt ghen 6,
  thiện cảm +4, Danh +2) / vừa (4 bạc) / không phát (Danh -2, người đang ghen ≥40 ghen +3). Phi tần khác tấn phong thì mời nàng: Đến chúc (Sức -5,
  thiện cảm +5, nhà nàng có của thì được lì xì 6 bạc) / Gửi lễ (15 bạc) / Không đến (thiện cảm -6, oán +3). NPC khách khác: chủ giàu phát lì xì → thiện cảm.
- **(12) Ân thưởng sau sinh** — có sẵn: sinh hoàng tử thăng một bậc, bổng thêm, 50% được ban một món (hên xui). Đổi: bỏ hên xui; Hoàng thượng ban chắc
  khi sinh hoàng tử, khi Sủng mẹ ≥30 hoặc là con đầu; Thái hậu ban (nhân sâm/yến/đệm gấm + 20 bạc) khi Thái hậu với mẹ ≥20; con đầu Danh +3.
  Một bảng "Ân thưởng sau sinh" (tranh ev-sinh-no, nút Tạ ơn). Cùng luật cho NPC.
- **(14) Thả đèn hoa đăng** — có sẵn: không. Thêm: thẻ Hành sự đêm Nguyên tiêu / Thất tịch / Trung thu (buổi tối, 2 khắc, 10 bạc, một lần mỗi hội), chọn
  điều cầu, trò nhỏ thả đèn (kéo đèn theo dòng sáng, gió đẩy, tránh hoa sen). Kết quả gắn nguyên nhân thật: Cầu tin tức → người hầu nghe được bên hồ
  lòng một người đang muốn hại nàng (nếu có) hoặc Thư nhà (người nhà gửi vào, mỗi năm một lần); Cầu bình an → Đức +1, Phúc duyên +2 (tối đa 6 mỗi kiếp);
  Cầu thánh ân → chỉ khi Hoàng thượng thật dạo hồ (tâm trạng ≤ bình thường và Sủng ≥20): Sủng +3, Ân tình +2. NPC cũng thả đèn (Đức +1, có khi được ngài để ý).
- **(2) Hội phối đồ theo đề** — có sẵn: món đeo (Cài tóc / Đeo tay), vải may áo, luật vượt phẩm (j8). (Hệ trang phục j92 của review/wardrobe chưa gộp.)
  Thêm: tháng ba / chín báo đề (Thanh nhã / Phú quý / Hương sắc), trung tuần tháng tư / mười mở hội; nàng tự phối 4 chỗ trên bảng ô đồ (kitItem) hoặc
  Bỏ qua để cung nữ chọn giúp (đúng ý theo lòng nàng); điểm = hợp đề + phẩm đồ − vượt phẩm (bị nhắc: Danh -3) rồi + Sắc + Tâm cơ; NPC phối từ rương
  của họ (khéo hay vụng theo Tâm cơ); bục vinh danh; Nhất: Sủng +4, Danh +4, một món ban. Mượn đồ: người thân (thiện cảm ≥25) có món hợp đề thì mượn
  được, xong hội trả lại (thiện cảm -2, nợ ân tình).

## Ảnh (dev/shots/ts-a/): fold-* và ipad-* mỗi ý một ảnh trở lên.

## Đề xuất tranh (chưa vẽ, chờ sếp)
Không bắt buộc — đã dùng tranh có sẵn. Nếu sếp muốn đẹp hơn: (a) nền trò du hồ: mặt hồ sen ban ngày nhìn từ mũi thuyền (mg-duho-bg, ngang + dọc);
(b) nền trò thả đèn: dòng nước đêm hội hoa đăng, không người (mg-den-bg); (c) mảnh đèn hoa sen trôi nước (mg-den-lotuslamp). Hiện dùng ev-le-ha, ev-le-thu-2, doden-lantern.

## Cân bằng (bot inpage5 'sens', máy rất tải, mỗi lượt ≤30 phút nên mẫu nhỏ)
- Gốc (book-release, không jts): n=19 → HH 53%, chết sớm 5% (bot này trên máy này lệch xa mục tiêu ngay cả ở gốc: hầu hết sống tới già).
- jts bản đầu: n=19 → HH 79%, chết sớm 5% → Sủng từ triệu riêng quá nhiều. Đã hạ: cơ triệu 26%→14%/tuần, Sủng +1..+4 (trước +1..+7),
  hộ giá Sủng +4/Danh +3, lì xì hậu Danh +1, nhất hội phối đồ Sủng +3/Danh +3.
- Sau khi hạ (bản đã gộp main b165b1f7): mới n=4 → HH 50%, chết sớm 0% (dừng vì điều phối bảo tạm nghỉ, đĩa đầy). CHƯA ĐỦ MẪU: đo tiếp khi mở lại.
- Việc còn lại cho người cân bằng: đo lại với bộ bot chuẩn (inpage6 của review/schedules2) đủ 80+ đời; nếu HH vẫn cao, hạ tiếp tsSummonGain / roll(14).

## Gộp main
Đã gộp origin/main b165b1f7 (merge, không rebase vì không được đẩy đè). jts.js đứng sau jload, trước j84. Bài thử ts-a.js tự đóng màn luân hồi mới (#kroul).
Bài thử chạy không cần server: `node dev/test/ts-a.js root 755x1000@2 dev/shots/ts-a fold`; bot: `node dev/measure/run_url.js root/index.html sens 20 out.json`.

## TẠM DỪNG (lệnh điều phối, đĩa đầy)
Đã đẩy hết. Việc còn: đo bot đủ mẫu (gốc vs jts trên main mới), chỉnh nếu HH > 45%; chụp được khoảnh khắc hộ giá (trò du hồ, giây 12–15).

## Sửa theo kiểm duyệt FAIL (dev/review/ts-a.md trên review/kiem2-notes 8098580b4) — thợ kit-close, 15/11
Nhánh đã gộp origin/main d69030384 và review/kit-close (✕ + chạm ngoài + Esc của kit; Tư trang Túi đồ/Việc) — không xung đột.
1. Hội phối đồ: ô `.ts-it` canh đỉnh (align-self:start, flex cột), lưới align-items:start → hàng ô lệch 0 px (đo trong ts-a.js: tileRows).
2. Chip "Nguy hiểm chung" / "Xét phẩm" sang cột phải sân khấu (`window.K3_RIGHT`, jk3 xuất), không còn trên dòng buổi của thanh trên →
   Fold 755 có "‹ Phòng": thanh trên giữ 111 px, dòng ngày một dòng (ts-a.js: hudH, dateLines).
3. Lễ tấn phong: khách đến cung = gặp mặt (k61Meet trước khi dựng lời chúc) → không còn tên mà mặt xám; tranh tĩnh vật không làm
   sân khấu nữa: lễ của mình = hộp thoại người (32.7, chính nàng), lễ của người khác = hộp thoại người chủ lễ.
4. Chữ: "thiện cảm" trơn → "quý ngươi" (khách quý ngươi +4, nàng quý ngươi +5, "Nàng quý ngươi: Quý mến · 34"); Nguy hiểm chung chỉ
   kể người đã rõ lòng VÀ biết tên (không "Phi ???"); bỏ nút "Lui" (thành ✕ của kit). Báo đề phối đồ: Hoàng hậu truyền lúc thỉnh an → gặp mặt.
5. Bài thử ts-a.js chạy trên main mới (chờ thân phận xong, gỡ vòng quay #kroulw), thêm đo: hàng ô, thanh trên, "???", "thiện cảm", nút Lui,
   bóng xám có tên. KIT "35. TOP 15" → §39.
Còn lại (không thuộc ts-a): Hoàng thượng hiện bóng xám ở thẻ triệu riêng khi chưa thấy mặt ngài — bộ vẽ người (kit-fig2 đang sửa).

## BÀN GIAO (15/11, phiên điều phối đóng) — đọc phần này trước
Nhánh: review/ts-a (đẩy từ nhánh cục bộ fix-ts-a). Gốc: origin/review/ts-a + origin/main d69030384 + origin/review/kit-close 1bd240a54.
Phiên mới: làm tiếp TRÊN nhánh này (đã có kit-close bên trong; khi kit-close vào main sẽ gộp sạch).

### XONG
- ts-a: 5 mục FAIL ở trên (đã sửa trong mã). Thử 755x1000@2 trên bản sửa cuối: 18 bước, 0 lỗi trang, 0 tràn ngang, 0 chữ cắt, 0 "???",
  0 "thiện cảm", 0 nút Lui, thanh trên 111 px · ngày 1 dòng, hàng ô phối đồ lệch 0 px, sổ cũ nạp. Còn bóng xám (xem Lỗi biết).
- review/kit-close 1bd240a54 (đã báo SẴN SÀNG KIỂM): ✕/chạm ngoài/Esc, tấm chắn chạm, Tư trang Túi đồ/Việc, tin buổi, thẻ đồ gọn.
- review/opt-render a8ec98511 (R1 đang kiểm): chế độ giá (28.6) + dòng Gợi ý chữ + nhãn rủi ro; dấu THÀNH/HỎNG chỉ theo lượt gieo,
  "KẾT QUẢ" khi không gieo; ghen/oán người khác → dòng Kèm thu gọn. Thử dev/test/opt-render.js: 0 lỗi.

### CÒN LẠI (đúng danh sách sếp/điều phối giao)
1. ts-a: chụp lại 4 cỡ (lần chạy 4 cỡ bị ngắt khi đóng phiên; chỉ có ảnh Fold trong dev/shots/ts-a/fix nếu kịp):
   `python3 -m http.server 8793` ở gốc worktree; `python3 dev/build/assemble.py`;
   `node dev/test/ts-a.js http://127.0.0.1:8793/dev/index.html 755x1000@2 dev/shots/ts-a/fix fold` (rồi 1000x755@2 fold-ngang,
   1180x820@2 ipad, 844x390@3 phone). Rồi báo SẴN SÀNG KIỂM.
2. review/event-balance (nhánh MỚI từ origin/main, nên gộp review/opt-render vào trước): lựa chọn sự kiện vẫn ẩn kết cục (28.6) +
   Gợi ý chữ. Việc:
   a. Kết cục PHỤ THUỘC BỐI CẢNH (không học thuộc được): nết/tính người trong cuộc (ngẫu nhiên mỗi kiếp), tâm trạng hôm nay, quan hệ,
      chênh phẩm, ai đang nhìn, sở thích ẩn của Hoàng thượng/Thái hậu; trạng thái nàng (Danh, phẩm, sủng, chứng cứ, chuyện gần đây).
      Cùng sự kiện, lựa chọn tốt nhất đổi theo kiếp/ngày (chủ nhà kiêu ngạo phạt "Đáp trả", người công bằng thì nể). Đổi lời/biến thể.
   b. Duyệt từng sự kiện (PEND.*, bảng sự kiện j8/j24/j31/j67/j68/jts…): EV mỗi lựa chọn (Sủng, Danh, Đức, Sức, Bạc, quan hệ, rủi ro
      bị phạt) qua odA/fx; không lựa chọn nào trội trong MỌI bối cảnh; lựa chọn rỗng (vd plantsv không ghi được gì, giu "Đút bạc xin giữ"
      không có Được) phải có hệ quả thật (để gợi ý không phải "chẳng được gì rõ").
   c. Ba bot nhiều kiếp: đọc bối cảnh (dùng gợi ý) / ngẫu nhiên / luôn chọn cùng số thứ tự. Mục tiêu: chơi cẩn thận thắng rõ; ngẫu
      nhiên bị phạt, giáng, đôi khi chết; game không dễ. Bảng thời gian tới mục tiêu (Hoàng hậu/Thái hậu/nữ đế) + sống sót trong
      dev/review/event-balance.md.
   d. TÂM TRẠNG từ sự kiện: mọi kết cục đẩy tâm trạng nàng (hỏng/nhục/phạt → buồn/giận/sợ/lo; thành/ân sủng/đêm → vui; bị ghen → ghen…)
      có cường độ + phai theo buổi; huy hiệu cảm xúc + nét mặt chân dung theo đó; nối vào đường kết quả chung (resultShow); số trong BAL;
      NPC cùng luật. Kho tâm trạng: jemo.js / cái rest-balance dùng (buồn, lo, giận, sợ, ghen, đau).
   e. Ô TÂM TRẠNG chạm → danh sách nguyên nhân đang tác động (cho nàng VÀ mọi NPC, thẻ người "Tâm trạng Phiền muộn"): "Bị Hoàng hậu quở
      trách (giận +20, còn 2 buổi)", "Được thị tẩm (vui +15, còn 1 ngày)", "Con ốm (lo +10)" — popover kit, đúng nguyên nhân máy dùng.
   f. ĐIỀU KIỆN THẬT cho mọi sự kiện: vd "Có người đến: <tên> sai người trả lại quà ta tặng" chỉ khi nàng đã thật tặng người đó gần đây.
      Rà toàn bảng sự kiện.
   g. Mệnh truyện "Báo thù cho nhà" bước 3 (nhân chứng lão thái giám họ Vương): Mặc kệ → ghi Mất (nhân chứng chết, bước hỏng, đường
      khác khó hơn hoặc đóng truyện); Giấu ông → Được (an toàn, xong bước 3); thêm đường KHÔNG bạc có cơ may thật: nhờ cung nữ thân tín /
      thái giám đồng hương (Lòng/quý), đổi một món đồ quý, dùng ân tình/nợ ân, xin Hoàng hậu/Thái hậu che chở (tốn lòng lớn); giá bạc
      theo phẩm (40 bạc ở Đáp ứng là quá); "Hẹn ông trốn tạm vài hôm" (đếm ngược vài buổi) thay vì ép chọn; bỏ tranh Triều chính
      (a467 đang nối tranh hộp thoại).
   h. Gợi ý chữ: đã làm chung ở opt-render (kitHintOf, BAL.hintMid/hintSharp/hintMat); trong event-balance thêm hint viết tay cho từng
      sự kiện quan trọng khi cần, luôn đúng dữ liệu; thử: mọi lựa chọn có Tốn/Cần + Gợi ý + nhãn rủi ro.
3. Thẻ kết quả đêm: Bạc −5 là "Điểm trang lộng lẫy" ở bước chuẩn bị (PEND.prep) — chi phí thật của đêm, đã báo; không cần sửa.

### LỖI BIẾT
- Hoàng thượng hiện bóng xám "Người lạ" ở thẻ triệu riêng / du hồ khi chưa thấy mặt ngài; bóng xám không tên trên tranh tiệc (jplace
  silhouettes) — thuộc bộ vẽ người (kit-fig2 đang sửa), không đụng.
- Hội phối đồ phần cân bằng: chưa đo lại bot đủ mẫu (xem mục Cân bằng ở trên).
- Site (index.html gốc, sw.js, assets.json) CHƯA dựng lại trên các nhánh của thợ này (máy sparse); điều phối dựng khi gộp.
- Scratchpad máy dùng chung với phiên khác (tệp bị xóa giữa chừng): để tệp tạm trong worktree (.kctmp, không commit).

### THỬ
- ts-a: như mục 1. kit-close: `node dev/test/kit-close.js <url> <outdir> 755x1000@2 [oldsave.json]`, `node dev/test/kit-close2.js <url> <outdir> <size>`,
  `node dev/test/slot-card.js <url> <outdir> <tag> <size>`. opt-render: `node dev/test/opt-render.js <url> <outdir> 1180x820@2`.
  <url> = http://127.0.0.1:<port>/dev/index.html (máy chủ tĩnh ở gốc worktree sau assemble.py); các bài thử tự phục vụ .html UTF-8.
- Sổ cũ: dev/test/mk-oldsave.js trên main gãy (start() xong sau màn tải) — dùng mẫu chờ `S&&S.name` như trong các bài thử trên.
### cdn_sync: không có ảnh mới nào chờ đẩy.

## PHIÊN 15/11 10:00Z (thợ ts-a vòng 2) — đọc phần này trước
Nhánh review/ts-a (fix-ts-a chỉ là tên nhánh cục bộ cũ, đã đẩy vào đây). Đã gộp origin/main 70c792d4 (f48d3f32):
xung đột jk4 (giữ bản kit-close: ✕/chạm ngoài/Esc), jinv (Túi đồ/Việc + kitShop của main), jk2b (kitNewsArtId + luật act-pics: tin không có
loại tranh → tranh phòng), assemble (jts.js ngay trước j84).
Sửa:
- Chữ quan hệ theo VANPHONG §1 mới (owner 09:55Z: một chữ "thiện cảm", KIT_REL; "quý ngươi" là chữ cấm): jts dùng "thiện cảm ±N", "oán ta +3",
  nhãn kitRel("them", KIT_REL.affThem), chưa biết = KIT_REL.unknown. kitRelPaint (jaudit) tô tím/lam.
- Lỗi cả nhóm trong VP j84: "với ngươi" + "," / cuối chuỗi / " hơn" bị đổi thành "thiện cảm" ("ra tay thiện cảm, từ 0 đến 100" ở Nguy hiểm chung,
  "hẹn ước thiện cảm,", "thân thiện cảm hơn"…). Nay "với ngươi" chỉ thành nhãn khi trước số hoặc ":"; quét chuỗi nguồn: 24 câu bị hỏng → 0.
  "quý ngươi" trước dưới/từ/≥/≤/( (j20, j42×4, j70, j79×2, j9) → nhãn "thiện cảm": còn sót 9 → 0 (.kctmp/scanquy.py, scanvoi.py — không commit).
- Gặp mặt: k61Meet cho khách lễ / Hoàng hậu báo đề trước đây bị bỏ qua với người công khai (k61Named đúng mà chưa thấy mặt) → Hoàng hậu bóng xám
  có tên. Nay luôn gọi k61Meet (tự lọc). Riêng Hoàng thượng (triệu riêng) giữ như cũ: hình ngài thuộc kit-fig2 (gặp mặt → khung tranh trống).
- Bài thử ts-a.js: đếm "thiện cảm" nằm ngoài .krel (phải 0), "quý ngươi"/"ra tay thiện cảm"; clear0(re) đóng thẻ xếp trước (Ngự tứ sau tấn phong).
Bot: dev/index-main.html (bản dựng main, không commit) vs dev/index.html, `node dev/measure/run_url.js root/dev/index.html sens 40 out.json inpage6.js`.
