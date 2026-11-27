# Báo cáo lỗi sếp báo 25–26/11

Bản kiểm: 27/11 ~09:50Z · MAIN CHÍNH 161 · bản live **0562e15f** (lùi về 611fca61 nếu cần).
Nguồn: mọi dòng OWNER trong sổ quyết định từ 25/11 ~23:30Z (trên máy bay, iPad không tiếng) đến cuối.
Mỗi trạng thái đã kiểm bằng `git grep` / `git log` trên origin/main, hàng đợi lander, nhánh review và CLAIMS — không viết từ trí nhớ.

**Tóm tắt.** 77 dòng sếp báo hoặc ra lệnh (57 của 25–26/11 + 20 của 27/11): **41 đã lên live · 7 nửa live, nửa còn lại chờ hoặc đang làm · 24 chưa lên live (3 chờ lên live, 21 đang làm hoặc chưa làm) · 5 là luật ghi nhận, không có bản dựng riêng.** Bàn bài / thẻ gỗ / vòng bị giữ lại, chờ sếp xem video.

**Cách đọc cột «Trạng thái»:** LIVE <sha> = đã chạy trên game thật · chờ lên live = đã qua kiểm, đang xếp hàng lander · đang duyệt = người kiểm đang xem · đang làm (tên thợ) · chưa làm.

## 1. Thứ tư 25/11 — trên máy bay (từ 23:30Z)

| Việc sếp báo · quyết định | Trạng thái + bằng chứng | Sếp sẽ thấy |
|---|---|---|
| **1. iPad không nghe nhạc, không tiếng.** Sửa mở khóa âm thanh, nhạc CDN, cho nhạc vào gói chơi offline. | **LIVE 4fae357a** (audio-ipad 01f258e4: `auSrc` ở j11.js:14, 37 bài trong gói «Tải hết»). Chưa thử trên iPad thật của sếp. | Chạm lần đầu là có nhạc, cả khi offline. |
| **2. Đức Thọ cung: «thị vệ giải ra, cấm túc 2 tháng» mà vẫn đứng ở đó; Hoàng hậu «đến» khi đang nói chuyện với bà; không báo trước giờ đóng cửa.** Ba lỗi cùng họ: bị đuổi phải về phòng ngay, một người không đến khi đã ở cạnh, phải báo trước. | Nửa live: **LIVE 9812646a** (place-rules: về phòng, nhà) + **LIVE aa37de21** (ở lại quá giờ chỉ phạt NHẸ, không cấm túc: jstagehere.js:85). Phần «báo trước» = số 39. Phần «Hoàng hậu đến khi đang ở cạnh» chưa kiểm riêng. | Quá giờ không còn bị cấm túc oan; chip báo trước đang làm. |
| **3. Tin báo k16: chữ lặp, dính «=», «· thành», ngoặc chồng ngoặc.** Mỗi tin một câu cổ trang, tên chức danh chỉ nói một lần. | **LIVE 50f8a13b** (tinbao-words 89af4d63 + E90 + E90r). | Tin báo gọn, một việc một câu. |
| **4. k17 Dư đồ buổi chiều: đâu cũng xám, không thấy nhà, nút «Về…» bị cắt.** Phòng của sếp luôn có dấu nhà; cấm túc chỉ báo một lần. | **LIVE 9812646a** (dấu nhà, banner một lần) + **LIVE aa37de21** («Về phòng · N khắc», jk3.js:412). | Dư đồ có dấu nhà; nút về phòng rõ, không bị cắt. |
| **5. Dư đồ nhiều chữ quá, phải gom khu giống nhau.** Gom khu theo luật 18/11; đo chữ mỗi nhãn. | **Chờ lên live** — map-zones-r7 9c8985ab (đang bị giữ, chờ icon to: số 44). Main chưa có. | Dư đồ gọn, gom theo khu. |
| **6. k18 Tài nghệ: tên bậc đè lên phần thưởng; bấm tên môn không ra thông tin; có vùng bấm ẩn.** Hàng kit, tên và thưởng tách dòng; bấm môn nào cũng ra thông tin môn đó. | **LIVE e4314b74** (tainghe-info 4f9d8b2e: quét bấm mọi tab Fold + iPad). | Hết chữ đè; bấm môn nào mở thông tin môn đó. |
| **7. k19 Tiến bộ 2/100 — «phải chơi 50 ván mới lên một bậc?»** Cân lại tốc độ học (cách A: người giỏi bậc 1→5 trong ~2/5/12/21/33 ngày). | **LIVE 6b5d3d05** (balance-pace-r1 c0f41387, `BAL.art.gain` = [2,1.5,1.1,.9,.8], jbal2.js:591). Hiển thị tiến bộ theo bậc = số 36. | Mỗi buổi học tiến nhiều hơn; lên bậc nhanh. |
| **8. k20 Tin chờ người sai đi: tên Xạ Nguyệt lặp 4 lần.** Người nói đã hiện bên trái nên lời không lặp tên; một báo cáo một câu. | **LIVE 50f8a13b** (cùng tinbao-words). | Hộp tin chờ chỉ một câu, không lặp tên. |

## 2. Thứ năm 26/11 — sáng sớm (01:25–08:30Z)

| Việc sếp báo · quyết định | Trạng thái + bằng chứng | Sếp sẽ thấy |
|---|---|---|
| **9. Lật thẻ bài hiếm; hạ Quý nhân→Đáp ứng + lãnh cung không rõ vì sao; ân xá liền.** Hạng nhất cuộc thi được thị tẩm đêm đó; phạt luôn có lý do, mỗi lần một bậc, lãnh cung ở lâu hơn. | Nửa live: phạt có lý do, một bậc **LIVE 639455a2** (charge-trinh-punish 69dd730e). «Hạng nhất → thị tẩm» **chờ lên live** (contest-thitam 2c956d97, mạch D). | Phạt có lý do; thắng cuộc thi có đêm thị tẩm. |
| **10. Sổ Kính sự phòng: một tính năng mà xé ra nhiều nút.** Một tính năng = một nút, cách làm chọn bên trong. | **LIVE b881686f** (ACT-MERGE, 157 → 85 nút; Hành sự 38 → 16 ở fbed4538). | Một nút «Xem Sổ Kính sự phòng», chọn cách bên trong. |
| **11. Gộp nút nhưng giữ nguyên hệ quả; bằng chứng nào thì tố theo tội đó.** | **LIVE b881686f** + **LIVE (7b8a0999 + f83621cc trong main)** — bằng chứng riêng từng tội, `jbal2.js:2289`. | Mỗi tội có lý do và hậu quả riêng. |
| **12. Hành sự tối đa 20–25 nút; hãm hại chia nhẹ / vừa / nặng.** | **LIVE b881686f** (nhóm bậc, mỗi bậc một việc). | Hãm hại có 3 mức, ít nút hơn. |
| **13. Không quá 16 việc ở Hành sự; tính khắc cả Dư đồ, Tư trang; hiện «thiện cảm +8 (42)».** | **LIVE 3b232e9d** (J0: số mới + tổng) + **LIVE b881686f** (Hành sự 16 nút; báo cáo act-merge.md). | Kết quả luôn ghi thay đổi và tổng mới. |
| **14. Trang điểm càng chơi càng tốn thời gian.** Điểm trang thành một cú chạm theo tài; vẫn giữ «Tự tay điểm trang». | **LIVE 0b43ee55** (mg-trim-lr5 c8fa513d: «Tự tay điểm trang» có trong main; điểm trang một chạm theo tài). | Điểm trang một chạm; muốn thì tự chơi. |
| **15. Chỉ số lên quá nhanh: một năm đã 100 toàn bộ khi còn Đáp ứng.** Trần mỗi lần +8 / +12, chậm gần trần, ≤3 sự kiện lớn mỗi ngày. | **LIVE 4cfcda61** (stat-pace d04561e8 + pace-all fa05166a; `spAdd` trần mỗi lần tăng, chỉ số lên chậm theo phẩm). | Chỉ số lên chậm, theo phẩm; bớt dồn dập. |
| **16. Không có nút về phòng; không biết đang ở cung nào; không thời gian chăm thú.** | **LIVE aa37de21** («Về phòng · N khắc» luôn về phòng mình; dấu cung của mình). Phần thú → số 27. | Nút trên cùng luôn dẫn về phòng. |
| **17. «Cho phép đưa lên live, từ nay bản nào qua kiểm thì cứ đưa.»** | Luật đã ghi (OD 26/11 ~04:30Z); main tự đẩy từ bản lander dàn sẵn. | Bản qua kiểm lên live ngay, không hỏi. |
| **18. «Q5 A» — chọn cách cân tốc độ A.** | **LIVE 6b5d3d05** (a9). | Như số 7. |
| **19. Tin trong cung tràn lan, tin tính nết không cần.** Chỉ tin liên quan tới sếp. | **LIVE 504d2e6a** (one-sieve 0ee866bc trong ob-verdict/kem-row/kawhy/os stack; Tin trong cung lọc tin; `tổng kết tháng` trong jnsieve.js). | Tin trong cung ít, đúng việc của mình. |
| **20. «Ai mưu hại ai» vẫn báo; sổ ghi đầy đủ ai làm gì, vì sao.** | **LIVE 504d2e6a** (cùng nhánh số 19). | Chuyện hậu cung đầy đủ trong sổ ghi. |
| **21. Trò may rủi giữ; trò tát/né bỏ; «Tự tay điểm trang», «Học nhanh» = Tùy duyên.** | **LIVE 0b43ee55** (mg-trim: giữ trò may rủi, bỏ tát/né, «Học nhanh» = Tùy duyên). | Học nhanh cho kết quả Tùy duyên. |
| **22. D4 chọn A; người lạ A.** Bằng chứng theo tội, tìm khó dần; người lạ trong cảnh mờ, trong thẻ là bóng xám. | D4 **LIVE 639455a2**; người lạ **chờ lên live** (kit-name-stranger e25dfd52, SMALL PASS). | Tìm chứng có lời giải thích rõ. |
| **23. Độ khó D4 hợp lý không? (bậc cao dễ tìm chứng hơn?)** Đổi sang chênh phẩm, rồi số 24 ghi đè. | Đã ghi đè — xem số 24. | — |
| **24. Sao không dò theo Tâm cơ?** Tâm cơ quyết định chính, bậc thấp canh gác kém hơn. | **LIVE** — `tcStep` 20, `tcCap` 2 (jbal2.js:2289, 7b8a0999). | Mưu cao tìm chứng dễ hơn dù bậc thấp. |
| **25. Quân cờ không quyết thắng bại; Tâm cơ của chủ sai mới quyết; tai mắt đếm.** | **LIVE** (cùng jcharge: tai mắt `matMid` 2 / `matHigh` 4). | Người sai chỉ ảnh hưởng nhỏ. |
| **26. «Sửa gấp lỗi hôm nay sau khi đáp máy bay.»** Cả nhóm lỗi là ưu tiên một. | Đang chạy theo từng dòng của bảng này. | — |
| **27. Chăm thú, tưới cây giữ như cũ; thêm «Chăm nhanh» và «Giao người chăm».** | **LIVE 0b43ee55** (mg-trim: «Chăm nhanh» và «Giao người chăm» có trong main). | Chăm thú có nút nhanh, có thể giao người. |
| **28. Chọn áo — hình giống cũ ổn, nhưng bấm áo không mặc vào.** Bấm là mặc ngay. | **LIVE 3af7896e** (mghelp-dress-r6 4f377603). Mới thêm DIALOG-ORDER-R4: không để thẻ chen lên màn điểm trang. | Bấm áo là mặc ngay. |
| **29. 3 lỗi nhẹ — khuyến nghị gì cứ tự làm.** «Làm phiền lúc thánh thượng nổi giận» và «ăn mặc vượt phẩm» là NHẸ. | **LIVE aa37de21** (home-way-nits: `BAL.punW`). | Lỗi nhẹ chỉ khất bổng. |
| **30. Mỗi lỗi sếp báo, MAIN phải tự mở rộng khuyến nghị.** | Luật đã ghi (OD ~06:50Z). Ngân sách ồn mỗi ngày: **chờ lên live** (qc-noise-hygiene-r10b bdb0f65d). | Ít bị dồn dập hơn lâu dài. |
| **31. Dư đồ quá nhiều nơi: gộp rồi bấm tầng 2 xem chi tiết.** Hai tầng; gộp không bỏ nơi nào. | **Chờ lên live** — map-zones-r7 9c8985ab (như số 5). | Tầng 1 = khu, bấm vào ra mọi nơi trong khu. |
| **32. Gộp nút hành động cả game, có báo cáo và hẹn giờ.** | **LIVE b881686f** (báo cáo act-merge.md, bảng tên cũ → mới). | Mọi chỗ bấm vào người, nơi đều gọn. |
| **33. Không phải gì cũng gộp; chỗ nào phải riêng thì để riêng.** | **LIVE b881686f** (mỗi nút ghi GỘP / ĐỂ RIÊNG kèm lý do). | Giữ riêng những việc khác luật chơi. |
| **34. Khuê các: chọn A, gộp ngay tối nay.** | **LIVE b881686f** (J5c, khóa cửa theo cặp). | Khuê các gọn như các chỗ khác. |
| **35. Tài nghệ đòi 100 điểm mà mỗi lần học 2 điểm — sửa chưa?** | **LIVE 6b5d3d05** (như số 7). | Học tốt bậc 0 được 6 điểm. |
| **36. Tiến bộ chỉ tính trong bậc, không cộng cả 5 bậc.** Hiển thị: «Tiến bộ 8/20»; đủ thanh = lên bậc. | **Chờ lên live** — review/kit-bac-progress cb221604 (trong hàng đợi lander; pace-all fa05166a cũng chờ). Main chưa có «đã tinh thông». | Thanh tiến bộ chỉ trong bậc hiện tại. |
| **37. Làm sao giảm oán / giảm độ nguy hiểm?** Đường đã có nhưng ẩn: hộp «Nguy hiểm chung» liệt kê người ghét + «Cách giảm». | **LIVE 53319e6f** (ob-oan-r6 5a9ee386 + kit-gloss-lower; `Cách giảm` đã có trong main). | Hộp nguy hiểm chỉ rõ cách hạ oán. |
| **38. Thị tẩm nói xấu người khác — không biết thành hay không.** Kết quả luôn ghi thành/hỏng và thay đổi của người kia. | **LIVE 504d2e6a** (ob-verdict 2cb588a8 + ob-verdict-rv 5dc1db31 trong main). | Thẻ kết quả có «Thành/Hỏng» và hàng của người bị nói xấu. |

## 3. Thứ năm 26/11 — chiều tối (14:00–18:50Z)

| Việc sếp báo · quyết định | Trạng thái + bằng chứng | Sếp sẽ thấy |
|---|---|---|
| **39. Khắc cuối của nơi sắp đóng cửa: chip phải nháy phía trên Dư đồ.** Chip nháy «Nơi này sắp đóng cửa, mời tiểu chủ rời đi», chạm là «Về phòng»; 2 khắc ân hạn, quá giờ chỉ phạt nhẹ. | **LIVE 611fca61** (Bundle 1: kk54 place-close 208d11d0, `jstagehere.js` + `jnotice.js`): chip kit nháy khắc cuối «Nơi này sắp đóng cửa, mời tiểu chủ rời đi», chạm là «Về phòng · N khắc»; ân hạn 2 khắc chip đỏ «Đã quá giờ…»; quá hạn chỉ phạt nhẹ, không hộp thoại thị vệ. | Chip nháy báo đóng cửa, không bị cấm túc oan. |
| **40. Giữ mọi hàng kết quả, kể cả «Tốn: không», «Được: không».** Luật ẩn hàng trống KHÔNG được lên. | **LIVE f573dc94**: main không có luật ẩn (`kitRowNil` = 0). Nhánh kit-empty-rows / kit-g4-r2 đã rút; KK44 làm lại không có §6.7. | Mọi hàng kết quả vẫn hiện, kể cả «không». |
| **41. Không biết mua đồ ở đâu; chương bắt mua của thái giám mà không biết gặp ai.** Mọi dòng mục tiêu có tên người / nơi / vật thành liên kết, «Đi tới»; Dư đồ ghi «Mua bán»; chỉ rõ thái giám. | **Đang làm (GOAL-LINKS)**. Phần kit đã **LIVE**: `kitGoalLink` + «Cách làm» `kitHowPanel` (24bfab11); còn nối vào mọi dòng mục tiêu + Dư đồ «Mua bán» + thái giám bán đồ. | Chạm tên trong mục tiêu là ra «Cách làm» + «Đi tới». |
| **42. Khách tới tìm: bấm chọn mà kết quả không hiện ngay.** Mọi lựa chọn hiện kết quả liền, tại chỗ. | **LIVE 98c77517** (ob-verdict-3 dacba11b, RV-165 PASS: khách tới / lựa chọn hiện kết quả ngay). | Chọn «Nhịn» là thấy kết quả ngay. |
| **43. Xuất giá, đi tu, tự vẫn ghi «Rất vững» — để chữ thật, thêm cảnh báo.** Chữ odds chỉ cho việc thật sự tung may rủi; việc đổi đời không chữ odds, có dòng «Cẩn thận khi lựa chọn». | **LIVE 814bd77d** (FIRSTCARD-3 c8754d1e; dòng kit «Cẩn thận khi lựa chọn» f179256e có trong jk2b.js, jopic.js). | Việc đổi đời có dòng cảnh báo, không có chữ odds. |
| **44. Biểu tượng từng nơi trên Dư đồ bị co nhỏ như con kiến.** To bằng dấu «Ta», đặt trên tên nơi. | **Đang làm (KK44)** (kit §78); map-zones-r7 bị giữ chờ việc này. | Biểu tượng nơi to rõ trên mọi bản đồ. |
| **45. Cảnh có người tới tìm tối đen — mờ theo buổi.** Sáng mờ vàng nhạt, trưa trắng ấm, chiều cam, tối giữ nguyên. | **Đang làm (KK44)** (một token màu mỗi buổi). Có nhánh cũ kit-screenveil 469d7985 chưa duyệt cho việc này. | Màn mờ đổi màu theo buổi. |
| **46. Danh hiệu: 5 lần là có, 10 lần là có — quá dễ.** Cân lại, cần chất lượng không chỉ số lần. | **LIVE fa722503** (title-bal 61bdd97d: bậc danh hiệu cân lại trong BAL, `jbal2.js:758`; bảng robot `title-bal.md`). | Danh hiệu ít, hiếm, phải cố gắng thật. |
| **47. Bàn bài, thẻ gỗ, vòng người / nhóm, «vòng bảo vật» — «đưa video tôi coi, tôi chưa duyệt mà đưa lên».** Không lên live trước khi sếp xem video Fold + iPad và nói OK. | **Nửa live.** Mã vòng / Bàn bài cho khung sự kiện (ring-build 9856601b: `jkring.js`, `jkhand.js`, `jkstage.js`, `jkpick.js`) đã vào main trong Bundle 1 (611fca61) theo lệnh gộp 27/11 ~06:38Z; tab lớn giữ lưới cũ. **Chưa thấy ghi sếp xem video Fold + iPad nói OK** — VIDEO-161 vẫn đang làm. | Sếp xem video trước, rồi mới quyết lên. |
| **48. Trang điểm một nút: chỉ bỏ phần chơi, vẫn tự chọn áo và hoa điền.** Hoa điền chọn riêng mỗi ngày, có ô riêng. | **Đang làm (DRESS-FIX)**. | Trang điểm nhanh vẫn chọn áo, hoa điền. |
| **49. Ô đồ đang mặc quá dài, nhiều ô giống nhau.** Gộp ô giống nhau (2 cổ tay → 1), lưới gọn bên dưới. | **Đang làm (DRESS-FIX)** — làm hình mẫu cho sếp xem trước. | Màn mặc đồ ngắn, gọn. |
| **50. Điểm xa xỉ quá nông: đeo đủ 7–8 món đúng phẩm vẫn quá.** | **Đang làm (DRESS-FIX)**. Ở main có xa xỉ (j8.js, jbal2.js), chưa nâng. | Đeo đủ đúng phẩm không bị ghét. |
| **51. Sự kiện lột đồ ngày nào cũng có; đồ bị lột vẫn còn.** Ban đầu: làm hiếm, mất thật. Bị ghi đè bởi số 56. | **Đang làm (DRESS-FIX)** — theo số 56. | Xem số 56. |
| **52. Thay đồ: «tốn 10 bạc ngay» hay «8 Sức, sai cung nữ».** Đường cung nữ phải chờ 2 khắc, mất Danh trong lúc chờ. | **Đang làm (DRESS-FIX)**. | Hai đường thay đồ ngang giá. |
| **53. Chữ mơ hồ («để mắt thêm một ít») — nêu tên chỉ số + «+ / ++ / +++».** | **LIVE 539603bf + 540358c4** (wording-gain e2d6f281, rồi wording-marks c580f2cd: «Tốn» không dấu trừ). | Mọi dòng được/mất ghi «Sủng +», «Danh ++» … |
| **54. Danh hiệu: 6 gợi ý của 160 duyệt; hạng cao nhất chủ yếu là sắc đẹp.** Khó vừa vừa thôi. | **LIVE fa722503** (cùng title-bal; 6 gợi ý của 160, hạng cao nhất chủ yếu là sắc đẹp). | Danh hiệu khó vừa phải. |

| **55. Oán tăng quá nhanh, giảm quá chậm — «chưa làm gì mà ai cũng nhắm vào tôi».** Không giới hạn sự kiện / NPC; kiểm soát con số: oán mỗi lý do một bước, trần mỗi người mỗi ngày, oán nguôi theo ngày, NPC trả thù thì tiêu bớt oán, người mới gần 0. | Nửa live: **LIVE 4cfcda61** (pace-all fa05166a: oán nguôi theo tuần `BAL.oanCool`, stat-pace). Phần còn lại **đang làm (OAN-PACE)** — chưa kiểm riêng. | Oán tăng chậm, nguôi nhanh; mùa đầu ít người nhắm. |
| **56. Lột đồ phải do NPC chọn: đồ nằm trong rương người đó, thành bằng chứng; sếp cũng lột được người khác.** Không còn là sự kiện hiếm; không giới hạn NPC. | **Đang làm (DRESS-FIX)**. | Lột đồ là việc người ghét sếp chọn làm; có bằng chứng; sếp làm lại được. |
| **57. 5 kit mới đã thay hết khung cũ chưa?** | **Chưa hết — đang làm (KK44)** quét toàn game. | Mọi khung dần dùng bộ kit mới. |

## 4. Việc phụ sếp hỏi

| Việc | Trạng thái + bằng chứng | Sếp sẽ thấy |
|---|---|---|
| **Tiếng «tèo» khi bấm nút.** Thay âm thanh nghe như thất bại. | **LIVE 310bad2e** (25/11 04:57Z: `audio/sfx-tap.mp3` thay tại chỗ). Rủi ro: máy đã nhớ tiếng cũ (gói offline, iOS) vẫn có thể nghe tiếng cũ → **đang làm (SOUND-CACHE)**: đổi tên file. | Tiếng bấm nhẹ, không «tèo». |
| **Thứ tự ngày mới / cửa sổ chồng nhau (từ 24/11).** | **LIVE 611fca61** (Bundle 1: dialog-order-r4 4594ec2b, `jdayq.js` DIALOG-ORDER r2/r4, test `dayq-hold`). | Hộp thoại không chen lên màn của mình. |
| **Hàng chờ lên live (lander LC24).** | **Mới nhất 0562e15f** (door-onetap 371067c9 + act-move 90488b6c: mọi cửa hành sự thành một chạm, việc người chuyển ra Dư đồ; lệnh sếp 27/11 ~00:32–01:14Z, ngoài khoảng 25–26/11 nên không có dòng riêng). **Bundle 1 = 611fca61** (ring-build, kk54 place-close, boot-skel-flash, dialog-order-r4, e-odds2, npcroads-red, title-parity, result-sieve; kit-std-audit rút lại, goal-links + map-r9 ra ngoài vì xung đột mã). Đã lên live từ lần trước: lc23-oan 53319e6f (số 37), renderer-mem 03a8c17c (sửa nghẽn bộ nhớ, không thuộc dòng nào của sếp), os stack 504d2e6a (số 19, 20, 38), pace-all + stat-pace 4cfcda61 (số 15, 55), wording-gain 539603bf (số 53), firstcard-3 814bd77d (số 43), title-bal fa722503 (số 46, 54), wording-marks 540358c4 (số 53), mg-trim 0b43ee55 (số 14, 21, 27), ob-verdict-3 98c77517 (số 42). Cũng đã lên live: end-maxrank 17f23656, dayq-qsoftlock b16b4b93 (sửa kẹt ngày), parity-facfix 066d9af0, kptitle-close 4cd3f974 (không thuộc dòng riêng của sếp). Còn xếp hàng/giữ: map-zones-r7, mg-trim-r6, kit-bac-progress, contest-thitam, kit-stage-r2 (chờ sếp xem video).

## 6. Sếp báo 27/11 (00:05Z → 07:20Z)

Bản kiểm trên main **0562e15f**. Nhánh liệt kê lấy từ `git ls-remote` và so với lịch sử main; «chưa lên live» = chưa thấy mã trên main.

| Việc sếp báo · quyết định | Trạng thái + bằng chứng | Sếp sẽ thấy |
|---|---|---|
| **58. Hậu cung › Chí tôn: ảnh người chọn nên tròn.** «Tôi nghĩ là trên này nên để hình tròn đi… chỉ có chỗ đó đổi tròn thôi, khung avatar người được chọn vẫn ở dưới.» | **LIVE 0562e15f** (`jkpp.js` ghi đúng lời sếp: hàng chọn tròn, khung avatar ở dưới). | Hàng chọn người tròn, đỡ choáng. |
| **59. Tab Hậu cung chỉ để xem thông tin.** Nút tương tác chuyển ra chỗ người đó thật sự ở (Dư đồ / Hành sự); thẻ Hậu cung chỉ còn hai nút chung «Tìm gặp» · «Ghé cung». | **LIVE 0562e15f** (act-move 90488b6c: `jamove.js`, `jkpp.js`, KIT.md; test `act-move-reach`). | Vào Hậu cung chỉ đọc; muốn làm gì thì tìm gặp hoặc ghé cung. |
| **60. Gộp nút hành động thành MỘT chạm.** «Đây chính xác là cái tôi muốn… Ok sửa hết đi.» Một nút, một chữ tỷ lệ trước khi bấm, game chọn cách tốt nhất; kết quả nói đúng chuyện thật và lý do thật; NPC và người chơi chung giống nhau. | **LIVE 0562e15f** (door-onetap 371067c9: `jone.js`, `jgift.js`). | Bấm «Hầu chuyện» ra một kết quả thật, không còn danh sách con. |
| **61. Nút cần chọn người / vật / nơi thì vẫn giữ bước hai.** «Sai người đi dò la thì hiện danh sách người… không gộp chung được.» | **LIVE 0562e15f** (luật nằm trong đầu `jone.js` của door-onetap). | Dò la, tặng đồ vẫn chọn được người, món đồ. |
| **62. Nhẹ · vừa · nặng cho cả game.** Một việc chỉ tối đa ba mức; tốn và được mất cùng tăng theo mức; mức nhẹ không ra kết quả nặng; chọn nặng là nhận rủi ro, không hỏi lại. | **Nửa live.** Cửa hành sự theo mức đã **LIVE 0562e15f**; **chưa thấy bản kiểm toàn game** ghi lại. | Hãm hại nhẹ chỉ quẹt mực, tạt trà; nặng mới rạch mặt. |
| **63. Xóa dấu vết; xử nhân chứng ba mức.** Nhẹ «Đe dọa bịt miệng» (tốn sức) · vừa «Mua chuộc» (tốn bạc, bị từ chối thì không mất bạc) · nặng «Thủ tiêu» (giảm Đức, Danh); tỷ lệ theo Tâm cơ. | **Chưa lên live.** main không có «Đe dọa bịt miệng» / «Thủ tiêu» (`git grep` 0); nhánh `review/punish-tier-wit-r163c` 85d1c0ec chưa vào main. | Sau khi làm chuyện xấu có nút xóa dấu vết và ba cách xử nhân chứng. |
| **64. Bàn bài: đổi «thẻ gỗ» sang kiểu hợp game; dấu ✓ xanh góc trên phải; đưa lên live.** «Cái bảng thẻ gỗ lệch phong cách… tôi muốn dấu tick xanh ở góc trên phải… Ok được rồi, đưa lên live đi.» | **Nửa live.** Mã ring-build + kk54 (`jkhand.js` có ✓ xác nhận) vào main **611fca61**; **chưa thấy sếp xem video Fold + iPad nói OK** nên giữ nửa (MAIN 174). | Thẻ sự kiện hiện kiểu mới, chọn bằng ✓ xanh. |
| **65. Bộ bài Cơ duyên / Phúc duyên.** Mỗi người có bộ bài tự kiếm; thẻ chỉ là đặc quyền cộng thêm, không thay nút hành động; đã dùng không mất (trừ thẻ ân tình); 4 hạng; kho bài mở bằng icon bên trái sân khấu. | **Chưa làm.** Duyệt kế hoạch hai pha; main chưa có «Kho bài» / «Phúc duyên» thẻ (`git grep` 0). | Sẽ có bộ bài riêng mỗi người, sau khi kế hoạch xong. |
| **66. Tốc độ lên Danh / Đức.** «Ok làm theo ý bạn»: Tâm cơ chậm; Danh/Đức không được chỉ lên đỉnh 54–60; chờ robot ba đời xác nhận. | **Chưa lên live.** Nhánh `review/pace-speed-rv163e` d64f53cf chưa vào main. | Danh, Đức tăng chậm hơn mà vẫn lên được hạng cao. |
| **67. Báo tử người chết trong cung.** «Ok làm vậy đi» (cả họ việc, NPC giống). | **Chưa thấy trên main** (không có nhánh nào ghi lên). | Người chết vẫn hiện thông tin, có tin báo rõ. |
| **68. Luật chung của kit: được xanh, mất đỏ, và mọi luật chung khác.** «Bạn quên hết mấy cái luật kit chuẩn…» Bắt kiểm cả game theo một bảng luật kit. | **Đang làm.** `dev/kit/KIT_CHECKLIST.md` chưa có trên main; kit-std-audit đã **rút khỏi Bundle 1** (hook-96). | Mọi thẻ, ô cùng một luật màu và bố cục. |
| **69. Lãnh cung: hình nhân vật còn màu thật nhưng nhạt; khung giữ màu gốc; người chết trắng đen cả khung.** «Lãnh cung ok» (07:00Z, sếp duyệt hình). | **Chưa lên live.** main không có lớp `.kst-lc`; nhánh `review/owner-ui-a-rv167` c49748bd chưa vào main. | Vào lãnh cung vẫn nhận ra người, không như người chết. |
| **70. Rương thưởng, Nội vụ phát hàng tháng: đồ bay ra từng món, xếp hàng gọn.** Không còn khung danh sách dài bên dưới. | **Chưa lên live.** Chỉ có «bay về túi» cũ (`kitFlyItem`); nhánh `review/owner-ui-a` acfa9a02. | Mở rương thấy từng món bay ra rồi xếp gọn. |
| **71. Đồ phát theo mùa (vải, than, trà, nến…): phát bao nhiêu, dùng làm gì.** «Làm theo cái khuyến nghị của bạn» (06:36Z). | **Chưa lên live.** Nhánh `review/allot-season-rv163g` 72a6e1c8 chưa vào main. | Đồ cấp có việc để dùng, không nằm không. |
| **72. Thẻ có tỷ lệ: ghi «Thành:» xanh / «Bại:» đỏ ở dòng riêng.** «Ok làm vậy đi» (05:29Z). | **Chưa lên live.** `kitOddsBadge` 0 file trên main; nhánh `review/kit-stage-r10` 86e0cbc8. | Thẻ sự kiện đọc là hiểu thành, bại. |
| **73. Tab Hành sự giữ lưới cũ, tỷ lệ nằm ở hàng nút.** «Đưa về như cũ… tôi đọc một lượt là hiểu hết.» | **LIVE (không đổi).** `kitHandRows` 0 file trên main: các tab lớn vẫn là lưới cũ. | Hành sự y như cũ. |
| **74. Tài nghệ: mỗi môn một ô vuông; bỏ «chưa thạo» chỉ để bậc 0/5; khung môn gọn, không tỷ lệ trên ảnh nhỏ.** Sếp nói nhiều lần (06:33Z, 06:48Z, 07:10Z, 07:12Z, 07:20Z); đang đưa ra duyệt. | **Chưa lên live.** Nhánh `review/kit-stage-r11` 11f11695 (và r12 đến r14) chưa vào main. | Tài nghệ là các ô vuông đều nhau. |
| **75. Rà hết việc sếp hỏi mấy ngày qua, ai đang làm.** «Không thể một việc cứ làm tới làm lui.» | **Luật ghi nhận.** Chính là báo cáo này. | Một bảng cho sếp xem. |
| **76. Lên live theo nhóm; mọi thay đổi vẫn qua người kiểm.** Nhóm theo khu vực; rút lại lệnh bỏ qua kiểm cho việc đổi màu (07:15Z). | **LIVE 611fca61** (Bundle 1) + 0562e15f (đợt kế). | Mỗi đợt lên live gồm nhiều việc cùng khu. |
| **77. Lỗi `sx` ReferenceError (MAIN 177).** Sửa gấp. | **Chưa lên live.** Nhánh `review/sx-scope-fix` 79c5a62d xếp hàng, chưa vào main. | Hết văng lỗi. |

## 5. Hết

~62% xong · ~62% chơi được (đếm theo bảng: 41 live + 7 nửa live trên 72 việc có bản dựng; việc đã live đều chơi được)

---
Cập nhật: sửa file .md này rồi chạy `python3 dev/handover/reports/owner-bugs/build_pdf.py` (cần Playwright).
