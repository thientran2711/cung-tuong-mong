# UI tour — LIST (LIVE main b1033eb0)

Build: `python3 dev/build/assemble.py` + `dev/site/build_site.sh` on origin/main b1033eb0; Playwright host mode (rot.js), Fold portrait 755x1000 and iPad landscape 1180x820, deviceScaleFactor 1. Read-only: no game code changed. PDF: `ui-tour.pdf` (1 page per screen: Fold left, iPad right; TOC first).

Pages: 350 (see PDF). Screens by group:

| Group | Screens | on both devices |
|---|---|---|
| Mở đầu & chọn nhân vật | 21 | 14 |
| Tab | 61 | 61 |
| Tab (cung nữ) | 46 | 42 |
| Menu & lưu | 6 | 6 |
| HUD & phòng | 11 | 2 |
| Hội thoại người | 5 | 5 |
| Tặng quà | 1 | 1 |
| Trò chơi nhỏ | 32 | 32 |
| Chết & luân hồi | 1 | 1 |
| Kết cục & luân hồi | 9 | 9 |
| Popup — thẻ lựa chọn (option/choice card) | 89 | 25 |
| Popup — thông báo / sự kiện | 24 | 12 |
| Popup — bảng kết quả | 9 | 4 |
| Popup — tin tức (Tuần lục) | 1 | 1 |
| Popup — tai mắt / sổ nguyệt sự | 1 | 1 |
| Popup — bảng luật / trợ giúp | 7 | 3 |
| Popup — kết cục / rời cung | 2 | 0 |
| Popup — màn chuyển buổi (Sang buổi) | 8 | 8 |
| Popup — cảnh báo / lời đe dọa | 2 | 1 |
| Popup — ban thưởng | 2 | 1 |
| Popup — info | 4 | 0 |

How shots were made: tabs/sub-tabs = real clicks per origin (Con gái Tể tướng with a rich save = all tabs; Cung nữ tuyển vào cung = servant tab set), scroll-down shot where the pane scrolls; popups = a seeded bot played 3 origins (tt, cnv, nc) and shot every new popup signature (kind + title); forced = direct open (menu items, HUD taps, person dialogs, every mini-game intro via `playArt`, death, grand-ending flow from `ge-shots.js`). Same popup on both devices is paired by kind+title; the rest sit alone on a page ("không chụp được ở lượt này" on the other side).

## Popup kinds found in code (dev/build/j*.js)

kitModal kinds (call-site counts): info 45, notice 26, rule 23, th 20, story 12, good 12, emp 11, choice 11, help 10, me 9, chest 9, world 8, srv 8, secret 7, npc 7, news 7, hh 7, rv 6, maid 5, kid 5, hour 5, fallen 5, bad 5, art 5, ty 4, reward 4, result 4, ksp 4, intel 4, hoa 4, end 4, wk 3, … (+ legacy `pushModal`/`showModal` Q cards, classified by `kpKind`: night, end, news, intel, result, choice, rule, reward, notice).

Other mid-screen frames: `#dawn` buổi transition, `kg82` mini-game frame (intro/play/result), `#kroul` Luân hồi roulette, `kmov` movie/effects layer, `#kmrew` reward card, `#krkov` Bảng vàng, `nlcard` loading card, `kitConfirm`, `kitCoach`/`kitTip` tutorial cards, ☰ menu (Chọn sổ, Cùng hảo hữu, Sổ luân hồi, Thiết lập), grand-ending (geAsk) + Sổ luân hồi.

## Not captured (no silent skip)

- **Lời dặn tân thủ (kitCoach tour, "Xem lại lời dặn")** — tour is off under automation (jtut.js: navigator.webdriver); setting `hclh-tut-test=1` did not start it from the ☰ item in this run → needs one manual pass
- **Mini-game in-play and result screens (31 kinds)** — only the intro («Sẵn sàng/Hướng dẫn/Để trời định») of every kind is shot, plus one in-play frame (Đàn); finishing each game needs real touch play
- **Co-op prompts (invite, join, chat, timer, friend panel)** — need a live second player / the rank-coop server (ctm-rank host returns 403 through the sandbox proxy)
- **Dress picker (`kitDressPicker`) and Gift dialog full flow** — picker returns HTML embedded in other dialogs; gift shot is the bare dialog with a seeded item; the owner-offence dress picker needs a scripted rival event (dress-offence-shots.js not run)
- **Tab sub-views hidden by rank/state: Kế vị, Hoàng tự trong cung, Hôn sự, Quý tộc kén rể, Phe phái, Việc nhờ, Nam nhân contents** — empty/locked on a fresh seeded life (shown only as the empty-state text where reachable)
- **Tư trang filter chips (11 filters)** — only the first 4 sub-tabs shot (Túi đồ, Thú cưng, Việc, Tất cả); the remaining filter chips share one layout
- **Other origins' tabs (dtq, muoi, nc, td, ch, thd)** — tab set identical to tt except servant road (cnv, shot); bots covered nc popups
- **Cung nữ popups captured dark (10 shots, night fade overlay mid-transition)** — dropped, see dropped list; retake needs a slower fade wait
- **Several HUD chips with no popup (Về phòng, Cung nhân, Chí tôn, Ân tình, Nguy hiểm chung, …)** — tap changes nothing (info only)

## Dropped shots (dark / mid-fade)
pop-cnv-21-001-result, pop-cnv-21-002-result, pop-cnv-21-007-notice, pop-cnv-21-009-notice, pop-cnv-21-010-choice, pop-cnv-21-012-notice, pop-cnv-21-014-choice, pop-cnv-21-018-info, pop-cnv-21-019-notice, pop-cnv-21-020-result, pop-cnv-21-021-result

## Full page list (title · iPad/Fold)

### Mở đầu & chọn nhân vật
- Màn tiêu đề (menu chính) · iPad Fold
- Chọn sổ — Chơi một mình · iPad Fold
- Chọn sổ — Cùng hảo hữu · iPad Fold
- Luân hồi — chín thân phận · iPad Fold
- Luân hồi — úp thẻ · iPad Fold
- Luân hồi — chọn một thẻ · iPad Fold
- Luân hồi — lật thẻ (đang lật) · iPad Fold
- Luân hồi — thẻ thân phận đã lật · iPad Fold
- Thân phận kiếp này (sau khi nhận) · iPad Fold
- Sửa soạn nhập cung (màn tải) · iPad Fold
- Tiền truyện / mở đầu kiếp mới · iPad Fold
- Mở đầu kiếp mới — bước 2 · iPad Fold
- Mở đầu kiếp mới — bước 3 · iPad Fold
- Mở đầu kiếp mới — bước 4 · iPad Fold
- Màn tải (khi vừa mở game) · iPad 
- Lời nhắc thêm vào màn hình chính (iPad/iPhone) · iPad 
- Màn tiêu đề · iPad 
- Tiền truyện / mở đầu kiếp mới · Fold
- Mở đầu kiếp mới — bước 2 · Fold
- Mở đầu kiếp mới — bước 3 · Fold
- Mở đầu kiếp mới — bước 4 · Fold
### Tab
- Hành sự › Tất cả 20/21 · iPad Fold
- Hành sự › Tất cả 20/21 (cuộn xuống) · iPad Fold
- Hành sự › Giao thiệp 3/3 · iPad Fold
- Hành sự › Giao thiệp 3/3 (cuộn xuống) · iPad Fold
- Hành sự › Nghỉ ngơi 3/4 · iPad Fold
- Hành sự › Nghỉ ngơi 3/4 (cuộn xuống) · iPad Fold
- Hành sự › Học tập · Tài ng · iPad Fold
- Hành sự › Học tập · Tài ng (cuộn xuống) · iPad Fold
- Hành sự › Lễ nghi 3/3 · iPad Fold
- Hành sự › Lễ nghi 3/3 (cuộn xuống) · iPad Fold
- Hành sự › Mưu kế 5/5 · iPad Fold
- Hành sự › Mưu kế 5/5 (cuộn xuống) · iPad Fold
- Hành sự › Y dược 2/2 · iPad Fold
- Hành sự › Buôn bán 1/1 · iPad Fold
- Dư đồ · iPad Fold
- Chí tôn › Chí tôn · iPad Fold
- Chí tôn › Chí tôn (cuộn xuống) · iPad Fold
- Chí tôn › Phi tần · iPad Fold
- Chí tôn › Phi tần (cuộn xuống) · iPad Fold
- Chí tôn › Nam nhân · iPad Fold
- Chí tôn › Nam nhân (cuộn xuống) · iPad Fold
- Chí tôn › Cung nhân · iPad Fold
- Chí tôn › Cung nhân (cuộn xuống) · iPad Fold
- Ân oán › Ân oán › Ta 1 · iPad Fold
- Ân oán › Ân oán › Ta 1 (cuộn xuống) · iPad Fold
- Ân oán › Ân oán › Chí tôn 2 · iPad Fold
- Ân oán › Ân oán › Chí tôn 2 (cuộn xuống) · iPad Fold
- Ân oán › Ân oán › Phi tần 1 · iPad Fold
- Ân oán › Ân oán › Phi tần 1 (cuộn xuống) · iPad Fold
- Ân oán › Ân oán › Chí tôn 2 · iPad Fold
- Ân oán › Ân oán › Chí tôn 2 (cuộn xuống) · iPad Fold
- Ân oán › Ân oán › Phi tần 1 · iPad Fold
- Ân oán › Ân oán › Phi tần 1 (cuộn xuống) · iPad Fold
- Ân oán › Phe phái · iPad Fold
- Hoàng tự › Con của ta · iPad Fold
- Hoàng tự › Con của ta (cuộn xuống) · iPad Fold
- Hoàng tự › Kế vị · iPad Fold
- Hoàng tự › Kế vị (cuộn xuống) · iPad Fold
- Hoàng tự › Hoàng tự trong c · iPad Fold
- Hoàng tự › Hoàng tự trong c (cuộn xuống) · iPad Fold
- Hoàng tự › Hôn sự · iPad Fold
- Hoàng tự › Hôn sự (cuộn xuống) · iPad Fold
- Hoàng tự › Quý tộc kén rể · · iPad Fold
- Hoàng tự › Quý tộc kén rể · (cuộn xuống) · iPad Fold
- Tư trang › Túi đồ · iPad Fold
- Tư trang › Thú cưng · iPad Fold
- Tư trang › Việc · iPad Fold
- Tư trang › Tất cả 14 · iPad Fold
- Tài nghệ · iPad Fold
- Tài nghệ (cuộn xuống) · iPad Fold
- Mệnh truyện › Mệnh truyện › Chương này · iPad Fold
- Mệnh truyện › Mệnh truyện › Sắc phong · iPad Fold
- Mệnh truyện › Mệnh truyện › Đã qua 0 · iPad Fold
- Mệnh truyện › Mệnh truyện › Triều cục · iPad Fold
- Mệnh truyện › Mệnh truyện › Tâm nguyện · iPad Fold
- Mệnh truyện › Mệnh truyện › Tâm nguyện (cuộn xuống) · iPad Fold
- Mệnh truyện › Việc nhờ › Đang làm 0/4 · iPad Fold
- Mệnh truyện › Việc nhờ › Nợ ân 0 · iPad Fold
- Mệnh truyện › Việc nhờ › Trong cung 0 · iPad Fold
- Mệnh truyện › Sổ ghi · iPad Fold
- Mệnh truyện › Sổ ghi (cuộn xuống) · iPad Fold
### Tab (cung nữ)
- Hành sự › Tất cả 11/11 · iPad Fold
- Hành sự › Tất cả 11/11 (cuộn xuống) · iPad Fold
- Hành sự › Hầu hạ 4/4 · iPad Fold
- Hành sự › Hầu hạ 4/4 (cuộn xuống) · iPad Fold
- Hành sự › Học tập · Tài ng · iPad Fold
- Hành sự › Học tập · Tài ng (cuộn xuống) · iPad Fold
- Hành sự › Nghỉ ngơi 2/2 · iPad Fold
- Hành sự › Nghỉ ngơi 2/2 (cuộn xuống) · iPad Fold
- Hành sự › Giao thiệp 1/1 · iPad Fold
- Hành sự › Tất cả 12/13 · iPad Fold
- Hành sự › Tất cả 12/13 (cuộn xuống) · iPad Fold
- Hành sự › Hầu hạ 5/6 · iPad Fold
- Hành sự › Hầu hạ 5/6 (cuộn xuống) · iPad Fold
- Hành sự › Học tập · Tài ng · iPad Fold
- Hành sự › Học tập · Tài ng (cuộn xuống) · iPad Fold
- Hành sự › Nghỉ ngơi 2/2 · iPad Fold
- Hành sự › Nghỉ ngơi 2/2 (cuộn xuống) · iPad Fold
- Hành sự › Giao thiệp 1/1 · iPad Fold
- Hành sự › Mưu kế 1/1 · iPad Fold
- Dư đồ · iPad Fold
- Cung nhân · iPad Fold
- Cung nhân (cuộn xuống) · iPad Fold
- Mệnh truyện · iPad Fold
- Mệnh truyện (cuộn xuống) · iPad Fold
- Sổ ghi › Con gái Tể tướng · iPad Fold
- Sổ ghi › Con gái Tể tướng (cuộn xuống) · iPad Fold
- Sổ ghi › Con gái Đại tướn · iPad Fold
- Sổ ghi › Con gái Đại tướn (cuộn xuống) · iPad Fold
- Sổ ghi › Con gái nhà buôn · iPad Fold
- Sổ ghi › Con gái nhà buôn (cuộn xuống) · iPad Fold
- Sổ ghi › Cung nữ được sủn · iPad Fold
- Sổ ghi › Cung nữ được sủn (cuộn xuống) · iPad Fold
- Sổ ghi › Công chúa hòa th · iPad Fold
- Sổ ghi › Công chúa hòa th (cuộn xuống) · iPad Fold
- Sổ ghi › Công chúa hòa th · Fold
- Sổ ghi › Công chúa hòa th (cuộn xuống) · Fold
- Sổ ghi › Con gái tội thần · iPad Fold
- Sổ ghi › Con gái tội thần (cuộn xuống) · iPad Fold
- Sổ ghi › Cháu gái Thái hậ · iPad Fold
- Sổ ghi › Cháu gái Thái hậ (cuộn xuống) · iPad Fold
- Sổ ghi › Con gái thầy đồ  · iPad Fold
- Sổ ghi › Con gái thầy đồ  (cuộn xuống) · iPad Fold
- Sổ ghi › Cung nữ tuyển và · iPad Fold
- Sổ ghi › Cung nữ tuyển và (cuộn xuống) · iPad Fold
- Sổ ghi › Công chúa hòa th · iPad 
- Sổ ghi › Công chúa hòa th (cuộn xuống) · iPad 
### Menu & lưu
- Menu › Chơi một mình · iPad Fold
- Menu › Cùng hảo hữu · iPad Fold
- Menu › Sổ luân hồi · iPad Fold
- Menu › Bảng vàng · iPad Fold
- Menu › Thiết lập · iPad Fold
- Menu (gốc) · iPad Fold
### HUD & phòng
- HUD/phòng › Cung nữ thân tín tam đẳn · iPad Fold
- HUD/phòng › kemo kemo-binh kfseal ke · iPad 
- HUD/phòng › Tai mắt0 · iPad Fold
- HUD/phòng › Có thaiRất thấp · iPad 
- HUD/phòng › Lật thẻKhông có · iPad 
- HUD/phòng › Số lần ân thưởng0 · iPad 
- HUD/phòng › Bổng lộcsau 3 tuần · iPad 
- HUD/phòng › Xét phẩm: thiếu 2 · iPad 
- HUD/phòng › Chọn chính mình · iPad 
- HUD/phòng › Lịch tháng · iPad 
- HUD/phòng › Mục tiêu chương (có mới) · iPad 
### Hội thoại người
- Hội thoại người (host) · iPad Fold
- Hội thoại người (invite) · iPad Fold
- Hội thoại người (ally2) · iPad Fold
- Hội thoại người (pic) · iPad Fold
- Hội thoại người (plain) · iPad Fold
### Tặng quà
- Hộp tặng quà · iPad Fold
### Trò chơi nhỏ
- Trò chơi nhỏ — màn mở đầu: dan · iPad Fold
- Trò chơi nhỏ — màn mở đầu: hat · iPad Fold
- Trò chơi nhỏ — màn mở đầu: co · iPad Fold
- Trò chơi nhỏ — màn mở đầu: dauho · iPad Fold
- Trò chơi nhỏ — màn mở đầu: ban · iPad Fold
- Trò chơi nhỏ — màn mở đầu: tho · iPad Fold
- Trò chơi nhỏ — màn mở đầu: doi · iPad Fold
- Trò chơi nhỏ — màn mở đầu: doden · iPad Fold
- Trò chơi nhỏ — màn mở đầu: ve · iPad Fold
- Trò chơi nhỏ — màn mở đầu: hoa · iPad Fold
- Trò chơi nhỏ — màn mở đầu: theu · iPad Fold
- Trò chơi nhỏ — màn mở đầu: kim · iPad Fold
- Trò chơi nhỏ — màn mở đầu: mua · iPad Fold
- Trò chơi nhỏ — màn mở đầu: banh · iPad Fold
- Trò chơi nhỏ — màn mở đầu: huong · iPad Fold
- Trò chơi nhỏ — màn mở đầu: td_cong · iPad Fold
- Trò chơi nhỏ — màn mở đầu: td_dung · iPad Fold
- Trò chơi nhỏ — màn mở đầu: td_ngon · iPad Fold
- Trò chơi nhỏ — màn mở đầu: td_hanh · iPad Fold
- Trò chơi nhỏ — màn mở đầu: chai · iPad Fold
- Trò chơi nhỏ — màn mở đầu: le · iPad Fold
- Trò chơi nhỏ — màn mở đầu: tc · iPad Fold
- Trò chơi nhỏ — màn mở đầu: xa · iPad Fold
- Trò chơi nhỏ — màn mở đầu: thq · iPad Fold
- Trò chơi nhỏ — màn mở đầu: hoadien · iPad Fold
- Trò chơi nhỏ — màn mở đầu: duho · iPad Fold
- Trò chơi nhỏ — màn mở đầu: den · iPad Fold
- Trò chơi nhỏ — màn mở đầu: tat · iPad Fold
- Trò chơi nhỏ — màn mở đầu: ne · iPad Fold
- Trò chơi nhỏ — màn mở đầu: kinh · iPad Fold
- Trò chơi nhỏ — màn mở đầu: may · iPad Fold
- Trò chơi nhỏ — đang chơi: dan · iPad Fold
### Chết & luân hồi
- Màn tạ thế (S.dead) · iPad Fold
### Kết cục & luân hồi
- Hồi kết nhánh — Ngã rẽ 1 · iPad Fold
- Hồi kết nhánh — Ngã rẽ 2 · iPad Fold
- Đại kết cục · iPad Fold
- Danh hiệu Thiên mệnh (thông báo) · iPad Fold
- Bảng Thiên mệnh · iPad Fold
- Kết cục — thất bại · iPad Fold
- Kết cục — lặng lẽ · iPad Fold
- Sổ luân hồi · iPad Fold
- Sổ luân hồi (cuộn tới Thiên mệnh) · iPad Fold
### Popup — thẻ lựa chọn (option/choice card)
- Tiết Thanh minh · iPad 
- Đức Thọ cung · iPad 
- Ban cung · iPad Fold
- Có người bán tin · iPad Fold
- Một ánh mắt · iPad 
- Hoàng hậu khen · iPad Fold
- Sứ đoàn vào triều · iPad Fold
- Phụ tuyến · Xác minh: Âu Dương Băng Tâm có oán Hoàng hậu khô · iPad 
- Hội phối đồ · Hương sắc · iPad 
- Càn Ninh cung · iPad Fold
- Kẻ hầu ăn bớt · iPad 
- Ra ngoài khi mặc trung y? · iPad Fold
- Phụ tuyến · Chuyển thư làm lành của Thẩm Thục Nghi cho Lâm L · iPad 
- Thái hậu chê dung nhan · iPad 
- Bổng lộc tháng năm · iPad 
- Cần Chính điện · iPad 
- Có người tìm đến · iPad Fold
- Phụ tuyến · Hòa giải nhà Đại tướng quân Từ Bá Ngôn với nhà đ · iPad 
- Hội phối đồ: báo đề · iPad Fold
- Chọn người theo hầu · iPad Fold
- Sai Khánh Vân đi dò la · iPad 
- Kỳ nguyệt sự · iPad Fold
- Bổng lộc tháng ba · iPad Fold
- Phụ tuyến · Tân quân lập uy · Chương 1 · Hồi 1/2 · iPad Fold
- Thái hậu bệnh nặng · iPad 
- Kỳ ngộ · iPad Fold
- Phụ tuyến · Tâm nguyện Phế phi họ Lý (1/3): Chuyện năm xưa · · iPad 
- Hội phối đồ · Xuân sắc · iPad Fold
- Lễ Phật đản · iPad Fold
- Lần đầu gặp mặt · iPad Fold
- Việc khó xử · iPad 
- Phụ tuyến · Chép kinh cầu an khi Thái hậu lâm bệnh · Lời nhờ · iPad 
- Kẻ hầu xin đi · iPad Fold
- Bổng lộc tháng tư · iPad 
- Tết Đoan ngọ · Đặt cược · iPad 
- Tin đồn · iPad 
- Phụ tuyến · Chia phiên hầu Thái hậu cùng Hoàng hậu · Lời nhờ · iPad 
- Lời cảnh báo · iPad Fold
- Trốn trong phòng · iPad 
- Khóc suốt đêm · iPad 
- Có người đến · iPad Fold
- Biếu quà làm lành · iPad Fold
- Ngươi bắt gặp · iPad Fold
- Hắt nước · iPad Fold
- Thức trắng đêm · iPad 
- Phụ tuyến · Tìm vị thuốc cho Thái hậu · Lời nhờ (2 bước) · iPad 
- Bổng lộc bị cắt xén · iPad Fold
- Quốc tang · iPad 
- Phòng bị · iPad 
- Phụ tuyến · Tâm nguyện Thái y (1/3): Sách thuốc thất lạc · L · iPad Fold
- Tâu xin nghiệm thân · iPad 
- Phụ tuyến · Lo áo bông cho quân biên ải · Lời nhờ (2 bước) · iPad 
- Điềm báo · iPad Fold
- Bị ép nộp của · iPad 
- Nạn châu chấu · iPad 
- Phụ tuyến · Đi cùng Mạnh Băng Tâm khi bị Nhan Phương Hoa gọi · iPad 
- Quạt mực · iPad 
- Chữa vết thương · iPad 
- Hoàng thượng ban thưởng · Fold
- Sai Bạch Lan đi dò la · Fold
- Tích Cần viện · Fold
- Phụ tuyến · Hòa giải Mộ Dung Tịnh Nghi với Hoàng hậu · Lời n · Fold
- Phụ tuyến · Khuyên Mộ Dung Tịnh Nghi thôi chống đối Hoàng hậ · Fold
- Hội Phượng · Yến tiệc · Fold
- Phụ tuyến · Thay Thái hậu thăm Ôn Tuyết Dao đang ốm · Lời nh · Fold
- Nam nhân nơi cấm địa · Fold
- Nghe lén sau hòn giả sơn · Fold
- Phụ tuyến · Mời Tạ Cẩm Tú cùng Mạnh Mạn Châu uống trà · Lời  · Fold
- Phụ tuyến · Chuyển thư làm lành của Diệp Tố Tâm cho Lục Họa  · Fold
- Thái y viện · Fold
- Thái hậu khen · Fold
- Cung nữ thân tín · Fold
- Sai Hạ Vân đi dò la · Fold
- Phụ tuyến · Xin thuốc cho Lục Họa Mi đang mắc bệnh · Lời nhờ · Fold
- Hội Phượng · Đặt cược · Fold
- Hội Phượng · Lời mời: Thi đầu hồ trong lều xem hội · Fold
- Thi tài ngày Thất tịch · Lời mời · Fold
- Có người đến an ủi · Fold
- Bày mưu · Fold
- Hội Phượng · Fold
- Ngự hoa viên · Fold
- Tết Thất tịch · Lời mời: Thi xâu kim dưới trăng · Fold
- Phụ tuyến · Lén mang thuốc cho Cố Thủy Tiên đang bị cấm túc  · Fold
- Hoàng hậu chê dung nhan · Fold
- Bổng lộc tháng sáu · Fold
- Tết Thất tịch · Thi xâu kim dưới trăng · Fold
- Thái hậu triệu · Fold
- Lễ Vu Lan · Dâng lễ · Fold
- Phụ tuyến · Hòa giải nhà Đại tướng quân Mộ Dung Văn Uyên với · Fold
### Popup — thông báo / sự kiện
- Phát bạc cứu giúp cung nhân nghèo · iPad 
- Sứ đoàn vào triều · iPad Fold
- Nội vụ phủ điều người · iPad Fold
- Gió lạnh, đường trơn · iPad 
- Thái y bắt mạch · iPad Fold
- Thỉnh bình an mạch · iPad Fold
- Kỳ ngộ · iPad Fold
- Nghe ngóng chung · iPad Fold
- Lễ Phật đản · iPad Fold
- Thái hậu bệnh nặng · iPad Fold
- Lỡ hẹn · iPad Fold
- Đồ thất lạc · iPad Fold
- Cung Chính ti xét xử · iPad 
- Bị soát phòng · iPad 
- Nội vụ phủ thu đồ · iPad Fold
- Sắp tới: Thi tài ngày Thất tịch · iPad Fold
- Chủ thưởng · Fold
- Tin về chủ nhân · Fold
- Quốc tang · Fold
- Hắt nước · Fold
- Tìm thấy đồ thất lạc · Fold
- Tin mua được · Fold
- Kính sự phòng · Fold
- Lời nhận xét · Fold
### Popup — bảng kết quả
- Xong việc: Đi một nơi trong cung · iPad Fold
- Bị từ chối · iPad Fold
- Bị bắt · iPad Fold
- Xong việc: Thỉnh an Thái hậu hoặc Hoàng hậu · iPad Fold
- Chương 1 khép lại · iPad 
- Xong việc: Điểm trang hoặc Dưỡng nhan · iPad 
- Xong việc: Làm một việc hầu hạ · Fold
- Xong việc: Học lễ nghi với cô cô · Fold
- Sau vụ mưu hại · Fold
### Popup — tin tức (Tuần lục)
- Tin trong cung buổi này · iPad Fold
### Popup — tai mắt / sổ nguyệt sự
- Sổ nguyệt sự · iPad Fold
### Popup — bảng luật / trợ giúp
- Bổng lộc tháng ba · iPad Fold
- Bổng lộc tháng tư · iPad Fold
- Bổng lộc tháng năm · iPad Fold
- Bổng lộc tháng sáu · iPad 
- Bổng lộc tháng bảy · iPad 
- Bổng lộc tháng tám · iPad 
- Bổng lộc tháng chín · iPad 
### Popup — kết cục / rời cung
- Lãnh cung · iPad 
- Bị đánh đòn · Fold
### Popup — màn chuyển buổi (Sang buổi)
- Sang buổi: Bình minh mùa xuân Tháng ba · trời quang · iPad Fold
- Sang buổi: Bình minh mùa xuân Tháng ba · hoa đào ba · iPad Fold
- Sang buổi: Bình minh mùa hạ Tháng tư · ve kêu râm r · iPad Fold
- Sang buổi: Bình minh mùa hạ Tháng tư · nắng sớm oi  · iPad Fold
- Sang buổi: Bình minh mùa hạ Tháng tư · trời trong m · iPad Fold
- Sang buổi: Sáng Tết Đoan ngọ Hạ · nắng sớm oi ả Chạ · iPad Fold
- Sang buổi: Bình minh mùa hạ Tháng năm · ve kêu râm  · iPad Fold
- Sang buổi: Bình minh mùa hạ Tháng năm · giông tố Ch · iPad Fold
### Popup — cảnh báo / lời đe dọa
- Lời cảnh báo · iPad Fold
- Mưu hại · Fold
### Popup — ban thưởng
- Danh hiệu mới · iPad 
- Danh hiệu lên bậc · iPad Fold
### Popup — info
- Đeo «Kim vàng chỉ bạc» · iPad 
- Đeo «Thư hương» · iPad 
- Chương 2: Lần đầu được sủng · iPad 
- Đeo «Diệu thủ hồi xuân» · Fold
