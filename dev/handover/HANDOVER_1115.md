# Bàn giao phiên chính 15/11 (10:30Z) — đọc file này TRƯỚC, rồi TAKEOVER_PROMPT.md, HANDOVER.md, OWNER_DECISIONS.md (mới nhất ở cuối), KIT.md, VANPHONG.md

Gọi chủ là "sếp", xưng "em", tiếng Việt, ngắn. Báo cáo kèm "% xong / % chơi được" (~95% / ~88%).
Mọi quyết định của sếp ghi ngay vào dev/OWNER_DECISIONS.md trên nhánh claude/cung-tuong-mong-handover-hj0h8w, commit+push.
Brief chung cho thợ: dev/handover/WORKER_BRIEF.md (copy của scratchpad/brief.txt — dùng nó khi giao việc).

## Việc đang dở NGAY LÚC BÀN GIAO
1. **ĐÃ LÊN LIVE (10:40Z):** review/coop gộp main = 614b00ec (giao diện sách + chơi 2 người). Chơi thử Fold + iPad 0 lỗi. Sửa câu "chọn ở nhà làm tiểu thư" trong dev/coop/HUONGDAN.md (tuyến tiểu thư CHƯA gộp).
2. **Đợt 2 (ngay sau):** origin/review/book-release @ 4bbed569 (+ fold-layout 7fbc5b08 đã gộp vào): iPad 3 người / Fold 2 (nàng tính vào),
   KIT_FIG.maxPx 542 (1366 người .61 — có khoảng trống trên, theo dõi sếp có chê không), hộp thoại chỉ cuộn phần lựa chọn (KIT 32.5),
   người đứng trên tranh trong hộp thoại (KIT 32.6), nàng hiện ở mọi nơi, sửa trùng #panel khi lật. Cần kiểm duyệt rồi gộp main (trên đợt 1).
3. **Lật trang kiểu nguyên tờ** (sếp vừa chê: nội dung phải dính theo tờ, xoay quanh gáy, như ảnh dev/owner-shots/1115-turn-ref-1/2.jpg):
   thợ page-curl đang làm trên review/page-curl (f40f8d45 là bản cũ). Phải pull book-release (jbook prep() bỏ id).

## Thợ đang chạy trong phiên cũ (sẽ báo về phiên cũ, KHÔNG báo được sang phiên mới)
Phiên mới: kiểm nhánh trên origin, nếu thợ chưa xong thì giao thợ mới tiếp từ nhánh + file PROGRESS.
- review/page-curl — lật trang nguyên tờ (xem mục 3).
- review/routes @978ff81f — nhánh truyện: tư tình, trốn cung, rời cung đúng phép, sống ẩn; trích huyết nghiệm thân + hoạt cảnh/mini game. dev/STORY_ROUTES_PLAN.md.
- review/scheme-games — 3 mini game trừu tượng (Nghe ngóng, Truyền lời, Mặc cả) + "Thời cơ" (hại nặng, hoàn toàn trừu tượng). Lần đầu bị bộ lọc an toàn dừng vì trò liều thuốc độc → TUYỆT ĐỐI không làm chi tiết độc/cách hại.
- review/men @714e4e56 XONG (nam nhân theo kế hoạch, không hên xui; 4 thị vệ thive-1..4; thẻ đủ được mất). Chờ kiểm duyệt. Khi gộp: bỏ bản kitFigBody trong jk4 của men (dùng bản jkit).
- review/inventory-origin @c92da910 XONG (Tư trang ô vuông, ô trang bị 6 ô, Xa xỉ N số, không hiện mức cho phép, "Ngự", Luân hồi thẻ úp). Chờ kiểm duyệt.
- review/palace-map @9717707e XONG (Dư đồ → sân cung Phượng Lệnh bậc nhất theo phẩm chủ vị → phòng; dãy nhà cung nhân). Chờ kiểm duyệt.
- review/residence-art @2c39d1ca XONG (25 phòng × 16 tranh, jres.js). Đã gộp vào palace-map.
- Còn chờ gộp: lost-items 77679b52, emotion 527e534a (biểu tượng nữ cổ trang đã duyệt; gắn vào giao diện sách), difficulty 5a664492 (Khó 20% HH),
  outside 0062c04d (tuyến tiểu thư; chưa đo HH; áo khuê các chưa vẽ), loading 6e0888dc (màn tải), appearance e67def05 (ốm/độc/tát/mẩn; đã bỏ biểu cảm code),
  balance dcb23148, schedules2 3e55eb5, kit-j95 33e5016, consort-art (ĐÃ lên main).
- Robot đào sâu trungsinhgame (dev/research/TRUNGSINH_COMPARE.md "Đào sâu") — có thể chưa xong.

## Câu hỏi sếp CHƯA trả lời
- Phi tần khác đi lại theo lịch/tính nết thay vì xếp ngẫu nhiên (placeWhere j9)?
- Thêm ô Tai mắt lên thanh trên cùng?
- Vẽ hoa tai / giày hoa (4–6 hình)? Áo thị vệ 4 đổi xanh chàm (~40 credit)? Vẽ lại da c02-t1-a18 (xám)?

## Luật sếp mới trong ngày (đủ trong OWNER_DECISIONS)
Một kit chung, ảnh gửi sếp phải trên giao diện đã duyệt; tỷ lệ người chuẩn = ảnh dev/shots/curl2/ipad1180-tab-45-ref-ratio.jpg (.79, nam ×1.07);
thẻ lựa chọn luôn đủ Cần/Tốn/Được/Mất + cơ may; không chữ Hán, không viết tắt; không hên xui vô cớ (mọi chuyện có nguyên nhân thật);
không vẽ lại thứ sếp không bảo; đừng bắt bẻ thứ sếp không chê (dáng váy ok); lấy tranh Phượng Lệnh (repo thientran2711/phuong-lenh-art) thay vì vẽ mới khi có.

## Hạ tầng
Co-op worker: https://ctm-coop.victoria-tntt.workers.dev (Cloudflare acct trong dev/coop/CLOUDFLARE.md). Magnific folder ba4aecfe-efce-47e2-b53f-30d292091886, model gpt-2-6.
Máy chậm (nhiều thợ) — Playwright ít lượt, reducedMotion. Đĩa ~7 GB: dọn worktree thợ xong bằng `git worktree remove --force --force`.

## Báo cáo cuối từ thợ phiên cũ (sau bàn giao)
- review/page-curl @0e8cb4ef (lật nguyên tờ trong 1fdc37c2): tờ quay quanh gáy, mặt trước trang cũ / mặt sau trang mới, 760 ms; bản sao mang layout inline (vì book-release bỏ id). Còn: gửi ảnh sếp (dev/shots/curl2/*-tab-25/45/65), KIT chưa ghi kitSheetTurn, iPad 65% chữ chồng lúc thẻ người chưa ổn định, ảnh lật ngược chưa soát, hỏi sếp lật tuần có làm nguyên tờ không.
- review/scheme-games @0c894835 (CHƯA sẵn sàng kiểm): 4 trò Nghe ngóng / Truyền lời / Mặc cả / Thời cơ trong dev/build/jsgame.js, hộp chọn Tự ra tay / Giao cho người làm, NPC không chơi, kit seal MƯU (KIT §13.2). Còn: build_site, chạy lại dev/test/schemegames.js từng trình duyệt ở 686 và 1180, kiểm Truyền lời ở 390px, chưa gắn j78 overhear / j9 placeHarms / bribeServ. Ghi chú: dev/PROGRESS_scheme-games.md.
- review/routes @a59ca018 (CHƯA sẵn sàng kiểm; đã gộp men + outside): dev/build/jroute.js, nhóm Hành sự «Lối riêng»: Tư tình, Trốn cung (7 bước + 5 lối), Rời cung hợp lệ, Ẩn dật; trích huyết nghiệm thân (đòi nghiệm, gian lận, nghiệm lại, minh oan / lộ / bị vu) + mini game ánh mắt + hoạt cảnh bát nước; NPC cùng luật; Sổ luân hồi «Lối riêng x/y». Còn: sửa bot đo (bot thường cũng bấm thẻ lối riêng), trốn cung quá dễ (~48%, mục tiêu 10–25%), xuất gia quá dễ (~70%), đo lại tư tình/ẩn dật, chụp lại ảnh. Hỏi sếp: vẽ bát nước? Dấu khung mini game nên dùng «MƯU» (kit seal trên scheme-games). Ghi chú: dev/PROGRESS_routes.md.
- Nghiên cứu trungsinhgame "Đào sâu" đã dừng (dev/research/TRUNGSINH_COMPARE.md, commit d06f2448): top 15 đề xuất (thả thú hủy dung 2 chiều, hội phối đồ theo đề, lễ tấn phong có khách/lì xì, thú cưng, ước nguyện/thả đèn…). Chưa thấy hệ thống nô bộc/báo thù chủ động của họ (có lẽ mở khi có cung riêng). Chờ sếp chọn ý nào làm.

## Phiên chính mới tiếp quản (01:20Z thật; giờ "10:40Z" ở trên thực là ~01:10Z)
Phiên mới: session_01V1ZZH1F24tkuejhCvtXqV8. Đã nhắn phiên cũ bảo thợ page-curl/routes/scheme-games đẩy phần dở rồi dừng.
Kiểm origin 01:16Z: không nhánh nào đẩy thêm (page-curl vẫn f40f8d45, routes 978ff81f, scheme-games chưa có).
Thợ mới đã giao: người duyệt kit + gộp main + dựng site cho review/book-release; page-curl (lật nguyên tờ); routes (nhánh truyện); scheme-games (Nghe ngóng, Truyền lời, Mặc cả, Thời cơ — trừu tượng).
Nhắc theo dõi: send_later 30 phút, tự đặt lại mỗi lượt (lịch lặp tối thiểu 1 giờ).
- 01:30Z giao thêm: review/loading (sw tự cập nhật, sếp kẹt bản cũ), review/cdn-images (ảnh lên Cloudflare, bỏ img/ khỏi kho), review/map-anim (Dư đồ cuộn chậm lại). Thứ tự gộp main: book-release → loading → map-anim → cdn-images.
- 02:00Z review/loading @74c1544e SẴN SÀNG KIỂM (app tự cập nhật; đã gộp book-release) → xếp hàng cho người duyệt sau book-release.
- 02:10Z review/map-anim @af8f56f7e SẴN SÀNG KIỂM (Dư đồ trải 1150 ms; luật đi ≤ khắc còn) → hàng duyệt #3.
- 02:15Z review/page-curl @8aca1aae SẴN SÀNG KIỂM (lật nguyên tờ, 1300 ms, vuốt đổi tab) → hàng duyệt #4. Fold một trang: mặt sau tờ chỉ thấy thoáng (gáy ở mép trái) — chờ sếp có chê không.
- 02:20Z review/khuecac @197a98b4d: thử 4 mặt (c05 c08 c29 m05) gửi sếp duyệt; ảnh trên Cloudflare ctm-img.victoria-tntt.workers.dev; còn 80 mặt chờ duyệt; jkc chưa đọc FIGURES-kc.json. ~650 credit.
- 02:05Z khuecac: thử áo nhà nghèo 4 mặt (c3536cce9) gửi sếp duyệt; lô khuê các 79 mặt đang vẽ. Thêm thợ: review/ts-a, review/ts-b (15 ý), review/m05-huadian, review/mole-audit.
- 02:30Z LIVE đợt 2: main=1277c232 (book-release PASS + sửa dải bìa tím, maxPx chỉ iPad, Fold .79). review/loading PASS, gộp sẵn ở origin/review/main-next 355d6d58 (fast-forward từ main) — đẩy main bị bộ kiểm quyền chặn, CHỜ SẾP cho phép. map-anim, page-curl chưa kiểm, phải gộp lên main-next.
- 02:45Z review/scheme-games @94f6cb6f SẴN SÀNG KIỂM → hàng người gộp main-next sau page-curl.
- 02:50Z m05 xong (CDN), m02 vẽ xong; đẩy CDN m02 bị bộ kiểm quyền chặn → chờ sếp cho phép đẩy ảnh lên Cloudflare + đẩy main. Lô đổi hoa điền ~30k credit (tài khoản còn ~1,6 triệu) — tiếp tục vẽ.
- 02:55Z LIVE: main=355d6d58 (loading). Sếp cho phép thường trực: bản PASS lên main không cần hỏi.
- 03:00Z Soát nốt ruồi 5169 mặt: còn 40 rõ + 9 mờ (review/mole-audit 463739ca4) → giao review/mole-fix (ảnh giữ local, chờ phép đẩy Cloudflare). por-kid-p14-a4 cắt hỏng.
- 03:25Z Giao người duyệt thứ 2 cho tồn đọng: men, inventory-origin, palace-map, lost-items, emotion, difficulty, appearance, balance, schedules2, kit-j95, outside (đo HH trước).
- 03:35Z LIVE main=c30884d9e (bỏ bìa tím + Dư đồ trải chậm + luật đi khắc). Thợ con bị chặn đẩy main → điều phối tự đẩy (sếp cho phép thường trực). Người duyệt 2 đẩy kết quả lên review/main-next2.
- 04:00Z review/cdn-images @477d2094 SẴN SÀNG KIỂM (R2 bucket ctm-img + Worker ctm-img.victoria-tntt.workers.dev; 11673 ảnh; img/ bỏ khỏi cây). Lo: live có loading tải 83 MB lần đầu (116 s) — người duyệt phải sửa để vào game nhanh. Nhánh còn img/: đẩy CDN bằng cdn_sync --git trước khi gộp (điều phối chạy lệnh vì thợ bị chặn). Đề xuất làm nhẹ lịch sử git (cần sếp).
- 04:15Z LIVE main=482a310ea (review/men: nam nhân theo lịch, 4 thị vệ). Đã chạy cdn_sync 109 ảnh xóa nốt ruồi (review/mole-fix 50a7a15c0) + 392 ảnh hoa điền.
- 04:40Z review/thinhan-art @6f027b3d3 (tranh Thỉnh an mới act-thinh-an-v2 trên CDN, 160 credit) → gộp cùng cdn-images.
- 05:00Z LIVE main=b165b1f71 (Tư trang ô vuông + 6 ô trang bị, Luân hồi thẻ úp; sửa chữ Hán). palace-map chờ cdn-images (ảnh không vào git). Đĩa ~2 GB trống — dọn worktree khi xong.

## LỖI SẾP BÁO CÒN MỞ (soát mỗi lượt theo dõi; xong thì gạch)
- [x] Thỉnh an Hoàng hậu không cộng — LIVE f7a9e9880
- [x] Thẻ phi tần co lại — LIVE df5a60103
- [ ] Chữ 'Liều' cho khả năng phụ (có thai, ban thưởng, ô trạng thái) — review/sub-odds
- [x] Tờ lật trong suốt — LIVE 0783ec32a
- [ ] Chip 'Thỉnh tranh nhân vật' đè chữ; tải lần đầu 83 MB — hau-cung-ui + cdn-images
- [x] Nam nhân/tab Hậu cung — LIVE 01c3a5b24
- [x] Người chạy việc — LIVE 01c3a5b24
- [ ] Chữ hiệu ứng mơ hồ ('tiếng cứng cỏi'); việc làm được chưa lên đầu — sub-odds
- [ ] Sự kiện Có người đến chưa cân bằng — ts-b
- [ ] Tranh Thỉnh an (quỳ / tay sau) — chờ vẽ lại v3 (cần thợ mới khi đĩa đủ)
- [ ] Hoa điền quá cỡ — m05-huadian
- [ ] Khung chân dung đỉnh rời; Sổ tuần thẳng cột, người full trang, trang tiếp theo — hau-cung-ui
- [ ] Hộp thoại có người 2 cột — dialog-person
- [ ] Đang chơi không bị tải lại; co-op cập nhật — update-flow
- [ ] Chơi cùng bạn: kẹt nút Vào phòng, lệch buổi tuần 3 — coop-ui
- [ ] Kiểm mọi nút ra đúng kết quả (giao từ 14/11, mất khi đổi phiên) — review/act-audit
- [x] Luật một nguồn — LIVE c5b93e63f
- [x] Hết khắc khi tới nơi — LIVE 312b6b40a
- [ ] Sân khấu: nàng lặp mỗi trang, nút trang khó hiểu, đếm người lệch Dư đồ, vị trí đứng không chuẩn, tên chồng — stage-slots
- 06:05Z LIVE main=0783ec32a (lật nguyên tờ đục, 1300 ms, vuốt đổi tab; j22 'Đến chỗ hắn' theo luật đi khắc). Lo: vòng Luân hồi có thể trống hình thẻ — đang kiểm.
- 06:10Z hotfix/pc-size 04a204ff6 (ResizeObserver #panel) sẵn → người duyệt 1 gộp lên main 0783ec32a + dựng site, rồi đẩy.
- 06:30Z cdn_sync: 816 ảnh hoa điền (23 mặt đổi hoa lá xong hết + c12 t2–6 thu nhỏ) lên CDN.
- 07:00Z TẠM DỪNG (đĩa): review/ts-a 1103c85e6 (7 ý xong, cần đo bot 80+ đời, HH nghi cao), review/ts-b d29e3952c (ý 1,7,8,9,13 xong + Có người đến cân bằng + soát thế khó; 2 TIMEOUT bot cần soát; đề xuất 4 tranh thú nuôi), review/tutorial 190042887 (2/3; cần chạy test đủ + khóa tab mới), review/routes (chờ). Worktree đã gỡ; chạy lại khi đĩa đủ.
- 07:10Z review/khuecac 963d38bed SẴN SÀNG KIỂM: 84 mặt × 2 bộ (kc, ngheo) trên CDN, jkc.js; nằm trên review/outside → chỉ lên live khi outside gộp (đang chờ hợp nhất đồ mặc/balance). ~12k credit. Thứ muội mặc giống nàng, bạn khuê phòng mặc kc (thợ tự thêm — hỏi sếp).
- 07:20Z SẴN SÀNG KIỂM: review/court-rules b702cae67 (HH/HQP ở riêng; Thái hậu 51–62 + tranh a51; hết khắc ở lại nơi; chạm nơi đang đứng; nút ‹ tên nơi), review/dialog-person 2b321b3b0 (KIT §32.7) → hàng người duyệt 1. Tranh Thái hậu a51 (h1/h2/h3 fig+por) trông 25–30 → hỏi sếp vẽ lại.
- 07:20Z TẠM DỪNG review/routes 453203123 (15 kết cục đi tới được; cần đo cân bằng sau gộp; đề xuất tranh bát nghiệm huyết).
- 07:20Z cdn_sync 368 ảnh thu nhỏ hoa điền phi tần (đợt 1–2).
- 07:25Z LIVE main=df5a60103 (hotfix thẻ phi tần co lại: đo lại sau mỗi lần đổi tab). Vòng Luân hồi: hình chỉ chậm, sẽ tải trước.
- [ ] Lựa chọn không tác dụng (Hỏi han sức khỏe…) — act-audit
- [ ] NPC không có tên riêng (Tổng quản) — stage-slots
- [ ] Nền Kính sự phòng tối quá rực — chờ sếp chỉ nơi/ảnh
- 08:25Z LIVE main=5c1007a69 (Sổ tuần 'Sổ này ghi' thẳng cột). hau-cung-ui còn ~30–40 phút.
- 08:40Z review/sub-odds 96d7c2df8 SẴN SÀNG KIỂM → hàng duyệt sau hau-cung-ui. Chip phải che đầu người trên điện thoại → stage-slots.
- 08:50Z LIVE main=312b6b40a court-rules (HH/HQP ở riêng; Thái hậu đúng tuổi; hết khắc ở lại nơi; chạm nơi đang đứng; nút ‹ tên nơi; Luân hồi tải trước hình).
- [x] Đi đường xa hơn khắc — LIVE 3bf16b9b1
- [ ] Cảm giác game: nút lún/sáng, PixiJS hiệu ứng, rung máy, rung màn (báo từ 14/11) — review/game-feel
- 09:45Z review/update-flow 41c33af33 SẴN SÀNG KIỂM; review/rules-one-source 21a57eae1 SẴN SÀNG KIỂM → hàng người duyệt 1.
- 09:55Z LIVE main=01c3a5b24 (hau-cung-ui) rồi 3bf16b9b1 (hotfix walk-spill: đi đường tràn sang buổi sau).
- 10:00Z LIVE main=c5b93e63f rules-one-source (số hiện = số luật; Thái hậu 55; Đức 33 → 28).
- [x] LIVE df3094e71: update-flow (không tự tải lại lúc đang chơi; chip "Để sau / Mở bản mới"; chơi cùng mở lại đúng phòng) + Ân oán 2 cột, thanh quý có vạch 0.
- [ ] Thẻ người: dư trống trên chân dung; việc chưa chia tab kit; nút làm được chưa lên đầu mọi nơi; thanh chỉ số đầu trang bị che (giao stage-slots → review/person-acts).
- [ ] "quý" và "thiện cảm" là cùng một số nhưng hai tên → thống nhất "Thiện cảm"; thẻ việc lộ số thiện cảm khi chip còn "?" (giao act-audit).
- [ ] Đồ tự tay làm (chơi mini game tài nghệ → thành phẩm, tặng bất kỳ ai, bán) ĐÃ CÓ ở j83 trên review/balance-unified nhưng CHƯA LÊN LIVE; điều phối từng nói nhầm "chưa có". Phải đưa balance-unified lên sớm + tab Bán dùng j83.
- [ ] 4 buổi (có trưa) đã làm ở chuỗi balance (review/balance-unified) nhưng CHƯA LIVE → ưu tiên duyệt balance-unified ngay sau lô đang duyệt.
