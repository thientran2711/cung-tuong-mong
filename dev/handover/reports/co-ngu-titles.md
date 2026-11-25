# co-ngu-titles (CO-NGU-TITLES, opus literature worker) — owner 25/11 ~07:40Z «Một kiếp phù sinh»
PRIORITY #1 CHECK ('văn học|thợ văn|cổ ngữ|văn phong|literary|ending title|tên kết'): OD 10 (incl. 25/11 ~07:40Z this order, 23/11 ~21:25Z «Lời người xưa») | main 8 (jvoice, j97 tag, jrank RK_T) | review/* 0 (story-voice = narration only, not redone) | claims: this job (CLAIMS row 25/11). REUSED: jend KIT_END (the ending-screen kit) as the ONE home of the names; ending-scan.js classifier; GE_CAT grand-ending names and jdh danh hiệu names (already literary, owner-approved 16/11 13:15Z) KEPT.

Branch review/co-ngu-titles (from main 9f72524b). TIER: SMALL (text only; one new table + reads of it).
- **P1 sha 3424724f** — endings + end-of-life card + Luân hồi + rare ending tags.
- **P2 sha dbd77388** (READY head, includes P1, index.html/sw.js rebuilt) — chapter titles + tutorial co-op title.
- P3 (frame seal chips / buttons): PROPOSAL only, not built (see §4) — many tests and VP regexes read the seal words; needs the coordinator's go.

## 1. How (one source, law 4/14)
- `KIT_END.names` + `window.endName(h,t,fate,live)` in **dev/build/jend.js**: name by heading h · by fate line · death cause regex list (first match) · default «Hương tiêu ngọc vẫn» · «Đại kết cục · X» → X · anything unlisted keeps its own h (already a name).
- Engine keys untouched (h / fate: PD_END Phúc duyên, kesLife, endArt pictures, records). j32 over(): dialog title = the name (card flag `kend:1`, `endH:h`; jend kitEndType reads `kend||t==="Kiếp này"` so old saves work), S.kend saved; j93 death ink caption = S.kend; j52 Phúc duyên line keyed by endH, shows «name»; Sổ luân hồi row = «Kiếp thứ ba: <tên>» + «name»; closing lines in `KIT_END.names.close`.
- VANPHONG.md: 2 new rows (Tên kết cục, Lời khép thẻ cuối kiếp).

## 2. TABLE — every life ending → name on the card (dev/test/co-ngu-titles/scan.js --md; 63 callers, 41 names, PASS)
| where | ending (heading / cause) | name on the card |
|---|---|---|
| j13.js:21 | chết: … nguy kịch, không qua khỏi | **Liễu yếu gặp sương** |
| j14.js:21 | Xuất gia | **Thanh đăng cổ Phật** |
| j14.js:40 | Lãnh cung (Phát điên trong lãnh cung) | **Hồn lạc lãnh cung** |
| j14.js:43 | chết: Chết rét, chết đói trong lãnh cung | **Đèn tắt lãnh cung** |
| j22.js:51 | chết: Uống thuốc phá thai, băng huyết mà chết | **Chén thuốc đoạn trường** |
| j24.js:58 | Được Vương gia che chở (Vương gia che chở) | **Nương bóng vương phủ** |
| j3.js:146 | Lãnh cung (Tuổi xuân qua đi) | **Xuân tàn lãnh cung** |
| j3.js:157 | Thái phi (Thành Thái phi) | **Tà dương cung cũ** |
| j3.js:158 | Hoàng thái hậu (Lên ngôi Thái hậu) | **Thiên tử từ mẫu** |
| j3.js:160 | Mẫu hậu Hoàng thái hậu | **Đích mẫu tôn vinh** |
| j3.js:161 | Thái phi (Thành Thái phi) | **Tà dương cung cũ** |
| j3.js:163 | Thái phi (Thành Thái phi) | **Tà dương cung cũ** |
| j3.js:167 | Hồng nhan bạc mệnh | **Hồng nhan bạc mệnh** |
| j3.js:123 | chết: Bệnh nặng, không qua khỏi | **Liễu yếu gặp sương** |
| j3.js:164 | chết: …Tân Thái hậu … xét lại chuyện cũ (khả năng: …), ban lụa trắng, ép ngươi tuẫn táng theo tiên đế | **Ba thước lụa trắng** |
| j30.js:25 | Tư thông bị phát giác (Ban chết: tư thông bại lộ) | **Tình lụy thân vong** |
| j4.js:108 | chết: Mưu phản cùng cha, cả họ bị tru di | **Gia phá nhân vong** |
| j42.js:302 | Ma ma (Làm ma ma đến già) | **Tóc bạc cung sâu** |
| j42.js:303 | Xuất cung | **Lồng son mở cửa** |
| j42.js:435 | Xuất giá (Được ban gả cho …) | **Tơ hồng ngoài cung** |
| j42.js:438 | Xuất cung | **Lồng son mở cửa** |
| j42.js:560 | Bị đuổi khỏi cung (Bị đuổi khỏi cung vì mang thai) | **Bèo dạt mây trôi** |
| j42.js:562 | Bị đuổi khỏi cung (Bị đuổi khỏi cung vì tư tình) | **Bèo dạt mây trôi** |
| j42.js:611 | Được ban hôn (Được … ban hôn cho …) | **Thánh chỉ se duyên** |
| j42.js:615 | Vào vương phủ (Làm thiếp của …) | **Hoa dời vương phủ** |
| j42.js:618 | Thành thân (Xuất cung thành thân với …) | **Bách niên giai lão** |
| j42.js:295 | chết: Bị … phát hiện làm tai mắt cho …, sai đánh chết | **Hồn lìa dưới trượng** |
| j42.js:296 | chết: … biết ngươi phản chủ, sai người dìm ngươi xuống giếng sau Ngự hoa viên | **Trăng chìm đáy giếng** |
| j42.js:323 | chết: Bị … sai đánh trượng đến chết | **Hồn lìa dưới trượng** |
| j42.js:334 | chết: Bị bắt quả tang khi … …, bị đánh chết ở Thận Hình ti | **Hồn lìa dưới trượng** |
| j42.js:336 | chết: Chết dưới đòn tra khảo ở Thận Hình ti | **Hồn lìa dưới trượng** |
| j42.js:368 | chết: Quỳ phạt đến kiệt sức mà chết | **Hơi tàn trước thềm** |
| j42.js:388 | chết: Bị đánh đòn vì tội trộm cắp, không qua khỏi | **Hồn lìa dưới trượng** |
| j42.js:402 | chết: Quỳ phạt đến kiệt sức mà chết | **Hơi tàn trước thềm** |
| j42.js:431 | chết: Trước ngày sắc phong, … sai người đẩy ngươi xuống giếng | **Trăng chìm đáy giếng** |
| j42.js:560 | chết: … Bụng mang dạ chửa, ngươi bị đánh chết ở Thận Hình ti | **Hồn lìa dưới trượng** |
| j42.js:561 | chết: … Chuyện dính vào mưu của phi tần, ngươi bị diệt khẩu | **Diệt khẩu trong đêm** |
| j42.js:563 | chết: … Ngươi chết dưới đòn roi | **Hồn lìa dưới trượng** |
| j42.js:627 | chết: Uống thuốc phá thai, băng huyết mà chết | **Chén thuốc đoạn trường** |
| j8.js:393 | chết: Khó sinh, băng huyết mà chết | **Hoa rụng lúc kết trái** |
| j96.js:98 | Cao chạy xa bay (Giả chết, rời cung cùng …) | **Song túc song phi** |
| jbal2.js:30 | chết: … nguy kịch, không qua khỏi | **Liễu yếu gặp sương** |
| jbal2.js:81 | chết: Trúng độc, không qua khỏi | **Độc ngấm hồng nhan** |
| jge.js:148 | Đại kết cục · … (Đại kết cục: …) | **…** |
| jkc.js:498 | Bỏ trốn | **Bỏ gấm theo tình** |
| jkc.js:565 | Nữ phu tử | **Đèn sách má hồng** |
| jkc2.js:309 | Làm thiếp nhà phú hộ | **Lẽ mọn nhà giàu** |
| jkc2.js:313 | Làm người ở nhà lý trưởng | **Phận tôi đòi** |
| jkc2.js:355 | Công chúa ở lại cố quốc | **Non nước cố hương** |
| jkc2.js:374 | Ở lại quê nhà | **Ruộng dâu quê cũ** |
| jmline.js:83 | chết: Bị Thái y tra ra bỏ độc người hầu cung khác, giải sang Thận hình ti | **Hồn lìa dưới trượng** |
| jmort.js:129 | chết: … nguy kịch, tuổi cao sức yếu không qua khỏi | **Thọ chung chính tẩm** |
| jmort.js:170 | chết: … Ngươi gắng sinh hạ hài nhi rồi nhắm mắt | **Hoa rụng lúc kết trái** |
| jmort.js:172 | chết: Khó sinh, băng huyết mà chết | **Hoa rụng lúc kết trái** |
| jpoison.js:63 | chết: Trúng độc, không qua khỏi | **Độc ngấm hồng nhan** |
| jpq.js:72 | Ban chết (Ban chết vì mưu hại …) | **Ba thước lụa trắng** |
| jpq.js:107 | Tân đế đăng cơ (Vương gia đăng cơ, phong Quý phi) | **Rồng mới phượng xưa** |
| jroute.js:182 | Dâng biểu xuất gia (Xuất gia) | **Thanh đăng cổ Phật** |
| jroute.js:190 | Được ban hôn (Được ban hôn cho …) | **Thánh chỉ se duyên** |
| jroute.js:194 | Xuất cung về quê | **Mây trắng cố hương** |
| jroute.js:197 | Phế làm thứ dân (Phế làm thứ dân, xuất cung) | **Phượng gãy cánh** |
| jroute.js:253 | Một đời an nhiên (Một đời an nhiên trong cung) | **Gió mát trăng thanh** |
| jroute.js:174 | chết: Uống thuốc giả chết quá liều, không tỉnh lại nữa | **Mộng giả hóa thật** |

### End card labels / lines (j32)
| now | new | why |
|---|---|---|
| title «Kiếp này» | the ending's own name («Lồng son mở cửa»…) | owner's «Một kiếp phù sinh» card |
| section «Kiếp này» | «Một kiếp nhìn lại» | |
| «Sống trong cung» | «Năm tháng» | «Năm tháng trong cung» wrapped on Fold |
| «Chết vì» | «Mệnh tận» | |
| «Kiếp này khép lại.» | «Phù sinh nhược mộng, một kiếp đã khép lại.» | |
| «Chết là hết.» | «Hương tàn khói lạnh, người đã đi xa.» | |
| Luân hồi sub «Các thân phận trong vòng luân hồi» (jk2b) | «Luân hồi xoay vần, kiếp này ta là ai?» | |
| Sổ luân hồi «Kiếp 3: tên» | «Kiếp thứ ba: tên» + «tên kết» | kpLife (j79) reused |
| Phúc duyên line «kết cục Xuất cung» | «kết cục «Lồng son mở cửa»» | |

### Rare ending tags (j97 + dev/RARE_ENDINGS.md)
| now | new |
|---|---|
| Người cầm ấn phủ Tể tướng | Ấn tướng phủ về tay ngọc |
| Ngự bút minh oan, cha lên Thái sư | Ngự bút rửa oan |
| Huynh trưởng quỳ trước cửa cung | Cốt nhục đoàn viên |
| Hoàng hậu trao ấn phượng | Phượng ấn trao tay |
| Bia Nhạn Môn khắc tên ngươi | Tên khắc bia Nhạn Môn |
| Người giữ nửa binh phù | Nửa mảnh binh phù |
| Huynh về cùng hòa thư | Hòa thư đưa huynh về |
| Hoàng gia thương hội | Thương hội mang ấn rồng |
| Lưới muối lậu của Hộ bộ | Phá lưới muối lậu |
| Sinh từ Giang Nam | Giang Nam lập sinh từ |
| Kim lan trước Phụng Tiên điện | Kim lan Phụng Tiên |
| Chủ cũ dâng trà | Chén trà năm xưa |
| Người cũ cứu giá | Cố nhân hộ giá |
| Tố Nga làm nữ quan | Tố Nga khoác áo nữ quan |
| Hòa ước mang tên ngươi | Hòa ước khắc danh |
| Em trai thành tướng quân | Đệ đệ khoác chiến bào |
| Cởi oan nghiệt hai nhà | Oan gia giải kết |
| Người phi tần năm xưa còn sống | Cố nhân còn tại thế |
| Học trò đỗ Trạng nguyên ân khoa | Trò cũ đỗ Trạng nguyên |
| Chủ nhân nhận làm nghĩa muội | Chủ tớ thành tỷ muội |
| Hai chị em vào Thượng cung cục | Tỷ muội cùng vào Thượng cung |
| Mẹ còn sống | Từ mẫu chưa khuất |
| Thóp của kẻ đứng trên | Nắm thóp kẻ bề trên |
| Tên vào sử nước Tây | Lưu danh sử nước Tây |
| Miếu Dược Vương khắc tên | Tên khắc miếu Dược Vương |
| Bài thơ tiễn ra biên | Khúc thơ tiễn biên ải |
| Mạng lưới của lão Tổng quản | Tai mắt lão Tổng quản |
Kept (already literary): Đan thư thiết khoán, Huyện chúa họ Thẩm, Chợ biên Vĩnh Hòa, Hạc của Thái hậu, Nữ vương Cao Ly, Nữ quan thảo chiếu, Kim bài tra án hậu cung, Nghĩa nữ của Thái hậu, Tạm cầm phượng ấn, Song phượng Đức Thọ cung, Nữ học sĩ Hàn lâm, Sách cha vào Quốc Tử Giám, Nữ sư của Đông cung, Phá lệ phong Quý nhân, Kế nhiệm Lưu ma ma, Cứu ngự họa tiên đế, Kim lan lật đổ {v2}, Một hô trăm ứng, Hoàng thượng tự tay dạy con, Mật chiếu sau biển Chính đại quang minh.

## 3. P2 — chapter titles (j67 MS67 + jst14 + jend14)
| now | new |
|---|---|
| Nhập cung, đứng vững | Sơ nhập cung môn |
| Kẻ hầu mới vào cung | Phận tỳ nữ buổi đầu |
| Lần đầu được sủng | Sơ thừa ân sủng |
| Lọt vào mắt Hoàng thượng | Một ánh mắt rồng |
| Học quy củ trong cung | Học lễ nghi cung cấm |
| Từ kẻ hầu thành tiểu chủ | Chim sẻ hóa phượng hoàng |
| Tranh ngôi Trung cung (j67 + jend14, was typed twice) | Tranh phượng vị |
| jtut guide «Chơi cùng bạn» («bạn» banned by VANPHONG; title button is already «Cùng hảo hữu») | Cùng hảo hữu |
KEPT (already cổ trang, checked): road names + grand endings + fail names (GE_CAT, generated — never hand-edited), danh hiệu (Tuệ nhãn, Cao sơn lưu thủy, Trăng soi rèm ngọc…), «Mẫu nghi thiên hạ» chapter.

## 4. P3 PROPOSAL (not built) — frame seal chips KP_SEAL (j79:6, one table)
| now | proposal |
|---|---|
| LUẬT | CUNG QUY |
| ĐIỀU | CHÚ GIẢI |
| TIN | PHONG THANH |
| BÁO | TRUYỀN BÁO |
| VIỆC | ĐỊNH ĐOẠT |
| KẾT QUẢ | NGÃ NGŨ |
| ĐÊM | CANH KHUYA |
| KIẾP | MỘT KIẾP |
| CẢNH GIÁC | HIỂM HỌA |
| CHỨNG CỨ | VẬT CHỨNG |
| NGƯỜI | DIỆN KIẾN |
| BAN THƯỞNG | ÂN THƯỞNG |
Blocker: ≥10 tests (kit-conform, opt-render, panel-size, dlg-clip, coop-play…) match these words; buttons (Tiếp tục, Sang buổi…) stay as VANPHONG fixes them (function first). Coordinator: say go and a successor builds it with the test updates.

## 5. TESTS
- assemble + build_site OK · `node dev/test/co-ngu-titles/scan.js` PASS (no old string left, every plain heading named, no known death cause on the default) · `node dev/test/ending-scan.js` 40 callers, 0 untyped · `node dev/test/ending-screens.js` **268/268** (Fold 755x1000 + iPad 1180x820; grand-exit title check now = the name) · fit: end card text measured scrollWidth = clientWidth on Fold + iPad for death/leave/exile/throne, no horizontal overflow · **QUICKCHECK PASS** (dbd77388; old save ok; core gates PASS) · coop-ending-screens: FAIL «both seats in the room» (guest never joins the live Worker room) — SAME FAIL on main 9f72524b with the same test (pre-existing / environment, not this change; the end card is host-built text only).
- SHOTS (looked 3×; title fits one line, labels one line, closing line inside the card): CDN img/_review/co-ngu-titles/pair-death.webp, pair-leave.webp (top = before main 9f72524b, bottom = after; Fold | iPad).

## 6. CHO SẾP (Vietnamese sample, 10 best)
- Chết khó sinh: «Kiếp này» → «Hoa rụng lúc kết trái» · Ban lụa trắng: → «Ba thước lụa trắng» · Dìm giếng: → «Trăng chìm đáy giếng»
- Xuất gia: «Xuất gia» → «Thanh đăng cổ Phật» · Xuất cung: → «Lồng son mở cửa» · Ban hôn: → «Thánh chỉ se duyên»
- Thành thân ngoài cung: → «Bách niên giai lão» · Trốn cùng người thương: → «Song túc song phi» · Bị đuổi: → «Bèo dạt mây trôi»
- Lời khép: «Chết là hết.» → «Hương tàn khói lạnh, người đã đi xa.» / «Phù sinh nhược mộng, một kiếp đã khép lại.»
- Chương: «Từ kẻ hầu thành tiểu chủ» → «Chim sẻ hóa phượng hoàng» · «Lần đầu được sủng» → «Sơ thừa ân sủng»
- Kết hiếm: «Mẹ còn sống» → «Từ mẫu chưa khuất» · «Huynh trưởng quỳ trước cửa cung» → «Cốt nhục đoàn viên»

## 7. HANDOVER / NEXT
START_CTX ~3 % (1M window); finished at ~15 %. Worktree /home/user/wt/cnt (review/co-ngu-titles). Next if ordered: P3 seal chips (§4) + every test that matches seal words; wipe CDN review folder after verdict: `python3 dev/site/cdn_sync.py --wipe-review co-ngu-titles`.

## 8. P3 BUILT (MAIN 136 GO, subset) — KIT READY co-ngu-seals 4406fe66
Branch review/co-ngu-seals from LIVE main 9f72524b (NOT stacked on dbd77388). KP_SEAL (j79, one table): LUẬT→CUNG QUY · TIN→PHONG THANH · ĐÊM→CANH KHUYA · CẢNH GIÁC→HIỂM HỌA · CHỨNG CỨ→VẬT CHỨNG · BAN THƯỞNG→ÂN THƯỞNG. Kept: ĐIỀU, BÁO, VIỆC, KẾT QUẢ, KIẾP, NGƯỜI (MAIN 136).
Family: jksize KSZ3_NAME was a SECOND copy of the seal words → now reads KP_SEAL; KIT.md seal list + every doc mention; kit-size3/4-compose.py sheet labels. Tests/VP: no test or VP regex reads these six words (grep dev/test dev/tools dev/build).
Fit (measured, Fold 755x1000 + iPad 1180x820): every seal one line, scrollWidth = clientWidth, header no overflow, no page overflow; widths 80–110 px (old BAN THƯỞNG 101). Shot: CDN img/_review/co-ngu-titles/seal-pair.webp (before | after, both devices; iPad «LUẬT» before cell could not be cropped on main — same word as Fold). QUICKCHECK PASS 4406fe66 (core gates incl. kit-conform PASS). Needs Foreman B «KIT OK».
