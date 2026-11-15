# BÀN GIAO 15/11 chiều (phiên chính 5 → phiên chính 6)

Đọc theo thứ tự này:
1. dev/OWNER_DECISIONS.md: toàn bộ, nhất là các dòng từ 11:00Z ngày 15/11. Mọi lời sếp nói đều đã ghi ở đó.
2. dev/handover/WORKER_BRIEF.md (đầu tệp có 2 luật: LUẬT ƯU TIÊN SỐ 1 và LUẬT SỬA CẢ NHÓM).
3. Tệp này.
4. dev/handover/HANDOVER_1115.md (bàn giao sáng nay, mục LỖI SẾP BÁO CÒN MỞ).

## Cách làm việc với sếp (bắt buộc)
- Gọi "sếp", xưng "em". Trả lời tiếng Việt, gọn. Mọi báo cáo kết thúc bằng "~X% xong / ~Y% chơi được" (hiện ~96% / ~90%).
- Phiên chính CHỈ điều phối: giao thợ (subagent), giao người duyệt, tự đẩy main khi người duyệt PASS (fast-forward), tự chạy cdn_sync cho thợ.
- Mỗi lời sếp → ghi dev/OWNER_DECISIONS.md NGAY trong lượt đó, rồi commit và đẩy nhánh claude/cung-tuong-mong-handover-hj0h8w.
- LUẬT ƯU TIÊN SỐ 1: trước khi giao việc, kiểm OWNER_DECISIONS, HANDOVER, PROGRESS_*, git grep origin/main và mọi origin/review/*, cùng các thợ đang chạy.
- LUẬT SỬA CẢ NHÓM (sếp 14:50Z): sếp báo một lỗi thì sửa CẢ NHÓM cùng loại. Thợ viết script rà hết, báo bảng trước/sau. Nhắc luật này mỗi lần giao việc.
- PASS là đẩy main không cần hỏi. Đẩy ảnh lên Cloudflare không cần hỏi. Vẽ ảnh thiếu/sai không cần hỏi.
- Ảnh: Magnific gpt-2-6 DUY NHẤT, folder ba4aecfe-efce-47e2-b53f-30d292091886, luôn truyền folderReference. Ảnh ở CDN, không vào git.
- Không có hai người duyệt cùng xếp hàng một nhánh. Nhiều người duyệt chạy song song, nhánh nào qua trước lên trước.
- Nhắc canh thợ 1 tiếng một lần (sếp 15/11 ~18:05Z), không 30 phút.
- Giới hạn 20 subagent cùng lúc. Khi đầy thì gửi tiếp cho thợ đã xong (SendMessage tự resume).

## CDN
- Upload: dev/site/cdn_sync.py. Script lấy gốc repo theo vị trí của nó, nên phải chép vào thư mục tạm có dev/site/ + img/ rồi `git init`, hoặc chạy trong worktree của thợ.
- Lệnh: `python3 dev/site/cdn_sync.py <files>`; `--git REF --missing-only`; `--pull`.
- Danh mục: https://ctm-img.victoria-tntt.workers.dev/img/_index.json (files: [key, md5, bytes]).
- img/ACTS.json (bảng tên việc → tranh) đã gộp lúc 15:30Z: chỉ trỏ tới tranh đã có trên CDN. Tranh mới lên thì gộp thêm (so với _index).
- Scratchpad chung bị phiên khác xóa vài lần. Thợ phải để tệp tạm trong worktree của mình.

## Main hiện tại
`70c792d41` (shop-fix). Trước đó lần lượt: 6e6c2ae6d act-audit (trò chơi nhỏ: bấm chỉ mở trò, chơi xong mới trừ), 218a591fd hoang-tu.

## Nhánh và trạng thái lúc bàn giao
Mỗi thợ được lệnh đẩy hết việc dở và viết dev/PROGRESS_<nhánh>.md trên nhánh của mình. Đọc tệp đó trước khi giao tiếp.

### Đã xong, chờ duyệt (giao người duyệt mới)
| Nhánh | sha | Nội dung |
|---|---|---|
| review/fix-float | af7c388cb+ | Số lẻ → số nguyên (jint.js); "thù" → oán; nhật ký ghi kết quả thật; dòng lựa chọn có ngữ cảnh; qua đêm sang ngày mới (jnight.js). Thợ đang thêm khuôn chung trang người Tuần lục (chip, HIỆN NAY, dòng chỉ có tên). |
| review/opt-render | a8ec98511 | Lựa chọn sự kiện: CHỈ giá + Cần + GỢI Ý bằng lời + nhãn rủi ro (KIT §28.6 bật). Dấu THÀNH/BẠI chỉ theo roll. Kèm gộp. |
| review/rest-balance | 0f4670e90 | Dưỡng sức (tối, hết buổi, thuốc/8 bạc, +20) vs Nghỉ lát (+6, bớt tâm trạng xấu) |
| review/kit-close | 1bd240a54 | Tư trang 2 tab; giữ thẻ tin "Tin trong cung buổi này" + ảnh đúng; chắn bấm lọt (#kxcatch); ✕ đóng. R5 đang duyệt. |
| review/rank0-ivory | (xem PROGRESS) | Khung Đáp ứng A; 8 dấu (đổi 6/7); chân dung không zoom, dời lên, canh giữa thân (jkpor). Ảnh đã lên CDN. |
| review/scene-light | 05562ad0d+ | Mưa chiều hết nâu sepia (jsl.js). Còn: da hồng 807 chân dung (ĐÃ DUYỆT), sửa j87 Thái hậu tràn cột, cắt lại hình bị cắt mép. |
| review/img-quality | badc75e45 | Chân dung lấy ngay (không mặt 256 cũ phóng to), người lạ khung đá, công tử chưa gặp hình bóng |
| review/game-feel | 80bfd8feb | Hiệu ứng Pixi, rung, khung thu phóng một layout (rot.js), kitGain mọi món, món tự làm có tên/hình |
| review/brand | bc1c7f324 | Logo app từ tranh màn tải; mộc Trân nữ góc phải trên (jseal.js) |
| review/emo-men | 8bc5b0d40 | Ô cảm xúc nam (nam trẻ + nam đứng tuổi). Ảnh đã lên CDN. Xung đột emoBadge với rank0-ivory (xem PROGRESS). |
| review/hoangtu-tuchat | 46917d3db | Tư chất ẩn, Văn/Võ/Đức lớn dần, hiền tài từ 6 tuổi; "Hoàng tự trong cung" hiện điều cả cung biết; trẻ chưa gặp hình bóng; con mình không còn bị xem là người lạ |
| review/poison-gift | fe78f2c07 | Ân tình có thanh số; chân tình có điều kiện thật hiện trên thẻ; bỏ độc vào quà; NPC cũng làm; kim bạc thử độc |
| review/econ | d0c0c7308 | Núm mưu NPC |
| review/sub-odds, review/person-acts, review/stage-slots, review/header-fix, review/drag-curl, review/scheme-games, review/weather, review/gift-chest, review/ts-b + review/pets-gop-thu | xem dev/review/*-queue.md | Trong hàng các người duyệt cũ |

### Đã bị trả về (FAIL), đang sửa
- review/ts-a: lệch hàng ô, chip làm gãy dòng ngày ở Fold, Lễ tấn phong sai tranh, chữ "thiện cảm" trơn, "Phi ???", nút "Lui", bài thử hỏng vì màn Luân hồi. Thợ sửa trên nhánh fix-ts-a.
- review/pets: bảng mua thú chưa thành lưới có hình kiểu cửa tiệm, lệch 17px. Thợ sửa trên review/pets-fix (dựa pets-gop-thu). ts-b chỉ vào main CÙNG pets.

### Đang làm dở (đọc PROGRESS của nhánh)
- review/act-pics2: tranh hành sự riêng từng nghĩa, khoảng 360/617.
  - Xong: 17 tranh việc thẻ người (đã lên CDN), 19 tranh Tự học riêng từng môn (đã lên), 10 banner phản ứng trang điểm (đã lên), banner hộp thoại 4:3 ev-<key>.webp (16+/121).
  - Còn: ảnh dòng Tổng lược Tuần lục (ngủ, món hỏng, xác lão Vương, vào thi, xếp hạng…); 121 banner hộp thoại (dev/review/pic-shared.md trên review/gift-ui).
  - Bảng: dev/figwork/acts/dlg_list.tsv. CẤM dùng ảnh nhóm.
- review/gift-ui:
  - Hộp tặng quà (ảnh món, thông tin, tab người nhận); thẻ đồ người khác đang dùng hiện ảnh món.
  - Việc ban ngày với Hoàng thượng/Thái hậu (Xin yết kiến, Dâng quà, Thỉnh an). Còn: Xin hầu cờ (cần Kỳ), Xin đánh đàn (cần Cầm), Mời dạo ngự hoa viên (không bão), mỗi ngày một lần chung với yết kiến, NPC cũng làm.
  - Nối ev-<key>.webp vào hộp thoại.
  - Chuẩn hóa cỡ đầu cho mọi họ chân dung (trẻ, công tử, cung nhân…), làm trên rank0-ivory.
- review/kit-fig2:
  - kitEventDp: khuôn CHUNG cho mọi sự kiện có người. Trái là hình toàn thân, tên ở TRÊN; phải trên là banner ngang; giữa là thông tin; dưới là nút ngắn hai cái/hàng hoặc dài, tùy nội dung. Cỡ theo hộp người chuẩn.
  - kitActCompact: thẻ việc thu nhỏ khi bên trái có hình người.
  - Luật người lạ ở thẻ tin + Tuần lục + Ân oán; Ân oán chia tab.
  - Thẻ việc chưa có tranh riêng thì KHÔNG hiện ảnh (không ảnh nhóm).
- review/tabs-kit: tab Tài nghệ, Mệnh truyện, Việc nhờ làm theo giao diện game, CHIA TAB CON; hàng lọc cố định sát dưới khung chỉ số, ngoài vùng cuộn (luật kit cho mọi tab).
- review/toilette: trò Điểm trang buổi sáng (chọn áo + kẻ mày/phấn/son).
  - Lớp mặt đẹp/diêm dúa ĐÃ DUYỆT (a820a52ab).
  - 10 phản ứng hiện KHUNG SỰ KIỆN (tối đa 2 mỗi dịp).
  - toil-fit phải đo trên ảnh CDN hiện tại (bản cũ có hoa điền to).
- review/j83-variety: tác phẩm tự tay, phương án A (10 món × 4 phẩm).
  - Mỗi món có trò chơi đúng tên (cắm hoa ≠ vẽ), nguyên liệu đúng món.
  - Vật liệu đắt phải đáng tiền ở MỌI tài nghệ và mọi lựa chọn trả thêm tiền (dev/review/paid-tiers.md).
  - Bỏ nút Thôi.
- review/event-honest → event-balance:
  - Kết quả theo BỐI CẢNH (nết người ngẫu nhiên mỗi đời, tâm trạng, quan hệ…) để không ai "thuộc bài".
  - Chơi khéo phải hơn rõ rệt; chơi bừa bị phạt/giáng/chết. Ba bot: đọc gợi ý / chọn bừa / luôn một ô.
  - Sự kiện đổi tâm trạng nàng + mặt + ô tâm trạng hiện NGUYÊN NHÂN (nàng và NPC).
  - Sự kiện phải có điều kiện thật ("trả quà" khi chưa tặng).
  - Nhiệm vụ nhân chứng lão Vương: thêm đường không tốn bạc, giá theo bậc, cho hoãn vài buổi.
- review/trung-y: code xong (jty.js). Ảnh c01–c12 xong (giữ, chưa lên CDN tới khi duyệt). c13–c32 + m01–m19 đã vẽ nhưng chưa cắt (zip hết hạn 16/11 ~08:00Z: cắt trước!). m20–m52 chưa vẽ. Đọc dev/PROGRESS_trung_y.md.
- review/sfx: âm thanh theo nghĩa sự kiện; tiếng khóc nghe như tiếng cười → thay.
- review/rank-ui: bục Bảng vàng, thẻ cuối đời.
- review/pets-fix: như trên.

## Lỗi sếp báo còn mở (chưa có nhánh nào xong)
- [ ] Sổ tuần: lật trang thì hình nhân vật và cột chữ bên phải bị NHÁY → chưa giao ai. Giao cho thợ Tuần lục (fix-float hoặc mới).
- [ ] Hộp "VIỆC · <cung>" khi đến cung người khác (vd. Chung Tú cung) → chưa giao ai. Giao cho kit-fig2 (kitEventDp):
  - GIỮ banner cung + bóng người như hiện tại.
  - Dưới đó: TRÁI là chân dung chủ vị (chưa gặp thì bóng xám); PHẢI là giải thích (đang ở cung, khách phẩm thấp phải bái kiến, cần 2 khắc còn 1…).
  - Dưới cùng là nút; bỏ "Thôi".
- [ ] Tuần lục trang người: khuôn chung cho mọi người, chip một màu, HIỆN NAY thẳng cột, không số lẻ, "Nàng oán ta" (đang ở fix-float).
- [ ] Ảnh dòng Tuần lục lặp ảnh phòng (act-pics2).
- [ ] Chân dung trẻ con zoom khác nhau → chuẩn hóa cỡ đầu (gift-ui/rank0-ivory).
- [ ] Hộp "Có người đến" to quá; Đoan ngọ dùng ảnh Triều chính (kit-fig2 + act-pics2).
- [ ] Hình Thái hậu bị cột Tuần lục cắt (scene-light, sửa j87).
- [ ] Bảng mua thú (pets-fix). Con mèo đã vẽ lại.

## Đã quyết, KHÔNG làm lại
- Lựa chọn sự kiện ẩn Được/Mất (KIT §28.6), có gợi ý bằng lời + nhãn rủi ro (14:30Z, 15:05Z, 15:10Z).
- Ân tình chỉ với Hoàng thượng. Người khác dùng "quý ta"/"oán ta". Chân tình là điều kiện tặng quà, không phải thanh điểm.
- Hoa điền đã thu nhỏ trên CDN. KHÔNG làm lại; chỉ đo kiểm.
- Ô cảm xúc nam: chỉ cần nam/nữ, nhưng bộ nam đứng tuổi đã làm thì dùng luôn.
- Da hồng mức mẫu đã duyệt; trang điểm đẹp/diêm dúa đã duyệt.

## Người duyệt
Mỗi người duyệt cũ ghi hàng của mình vào dev/review/R*-queue.md. Phiên mới tạo người duyệt mới, mỗi người MỘT nhánh, chạy song song. Thứ tự ưu tiên:
1. fix-float
2. opt-render
3. kit-close
4. rest-balance
5. game-feel
6. hoangtu-tuchat
7. img-quality
8. rank0-ivory + emo-men
9. brand
10. poison-gift
11. scene-light
12. phần còn lại

## Đĩa
Khoảng 4,8 GB trống. Dọn worktree của thợ đã xong: `git worktree remove --force --force` + `git worktree prune`. Đừng xóa worktree của thợ đang chạy hoặc còn ảnh chưa lên CDN (act-pics2, trung-y/agent-a40a826e3f9c2878f, scene-light, j83-variety).

## PHỤ LỤC: báo cáo cuối của thợ và người duyệt (15/11 ~09:50Z)
Đọc PROGRESS trên từng nhánh trước khi giao tiếp.

### Thợ
| Nhánh | sha | PROGRESS | Ghi chú |
|---|---|---|---|
| review/fix-float | e03bf36a0 | dev/PROGRESS_fix-float.md | Cần rebase lên main. Commit đầu là WIP trang người Tuần lục mục (1)–(9), chưa thử. Còn LEFT: (7) khuôn cố định, (8) thẳng cột, test chip số nguyên. |
| review/tabs-kit | a94a34925 | dev/PROGRESS_tabs-kit.md | Đã rebase lên main 70c792d41, phải thử lại. |
| review/rest-balance | 0f4670e90 | không có | Xong. |
| review/ts-a | 02d7db25f | dev/PROGRESS_ts_a.md | WIP: 5 lỗi FAIL đã sửa code, cần chụp 4 khổ. Bóng xám Hoàng thượng để cho kit-fig2. |
| review/kit-close | 1bd240a54 | | Sẵn sàng duyệt. Bản gộp dở của R5: review/kit-close-merged-wip 9e3ab039a (chưa thử). |
| review/opt-render | a8ec98511 | | Sẵn sàng duyệt, chưa ai xem. |
| review/hoangtu-tuchat | d8e4fe943 | dev/PROGRESS_hoangtu-tuchat.md | Xong, 22/22 ở 5 khổ. Sẵn sàng duyệt. |
| review/toilette | 71efeee98 | dev/PROGRESS_toilette.md | Còn: đo lại điểm mặt trên ảnh CDN rồi đẩy toil-fit.json; chụp 1180; bot; nối kitEventDp. Banner ev-toil-* đã lên CDN. Báo act-audit: leAttire dùng S.turn*10+S.buoi nhưng S.turn là tháng. |
| review/scene-light | fd765c0a4 | dev/PROGRESS_review-scene-light.md | Da hồng 807 (đã duyệt) CHƯA bắt đầu; cắt lại hình cắt mép chưa làm; j87 Thái hậu đã commit, chưa đo lại. |
| review/act-pics2 | c457f3d8a | dev/PROGRESS_review-act-pics2.md | 22 tranh dòng Tổng lược đã vẽ, CHƯA lên CDN (lệnh trong PROGRESS); 8 lượt vẽ đang chờ tải; còn sửa kbkArt (giao a467/gift-ui). |
| review/trung-y | f99807021 | worktree agent-a40a826e3f9c2878f: dev/PROGRESS_trung_y.md (mục "BÀN GIAO 15/11 ~09:35Z") | Đủ 84 mặt đã vẽ. Cắt mới xong c01–c12 (trong img/). c13/15/16/18/19 cắt rồi nhưng cutcheck báo bán trong suốt (xem batch2 sheet). Còn lại chưa cắt. ZIP HẾT HẠN 16/11 08:00–09:19Z: làm ngay! |
| review/sfx | d83929a06 | dev/PROGRESS_sfx.md | Âm theo nghĩa; thay tiếng khóc giống cười và 5 tiếng khác. Cần chạy lại test và cần người nghe thử. |
| review/rank-ui | f8f914a0e | dev/PROGRESS_review_rank-ui.md | Bục Bảng vàng, thẻ cuối đời. Còn chạy test 844 + podium.js. Khi gộp lấy kitDpFit/kitNameRank của kit-fig2. |
| review/pets-fix | 8edc3a83e | dev/PROGRESS_pets-fix.md | Đã gộp pet-care + shop-fix (shop-fix đã ở main). Còn lệch 17px, test 5 khổ, sửa bài thử. |
| review/j83-variety, review/kit-fig2, review/gift-ui | xem PROGRESS trên nhánh | | Chưa kịp báo cuối, đọc nhánh. |

### Người duyệt
| Nhánh | Kết quả | Ghi chú |
|---|---|---|
| act-audit, shop-fix | PASS, đã ở main | Main = 70c792d41. |
| review/stage-slots | PASS | Ref review/stage-slots-merged = 8b4b51679. Phải chạy stage-slots hoặc coop-e2e một lần trên ref này rồi mới đẩy main. Chưa duyệt: drag-curl, header-fix (+ avatar to), scene-light. Ghi chú dev/review/R3-queue.md. |
| fix-float | chưa kết luận | coop-e2e lỗi 2 lần mỗi lần một bước. Bản gộp review/fix-float-kiem2-wip 2dd99230b. Còn hỏi: jnight có tự gọi nextBuoi trong co-op không. |
| rest-balance | gần PASS | Bản gộp review/rest-balance-kiem2-wip ba566d8ff có 2 sửa: j79 thẻ tràn 57px ở 844, lỗi này đang có trên main. |
| person-acts | chưa kết luận | 1 lỗi: tab "Đối đầu" chui dưới ✕ ở 1000x755. Bản gộp review/person-acts-review-wip d5f60c87c. |
| gift-chest | chưa kết luận | Bản gộp review/gift-chest-wip 6e6dea11d; bài thử treo ở Giao tình. Đụng rank0-ivory: lên phẩm hiện 2 rương. |
| weather | phải sửa | wxRiskWord phải dùng chanceW(); dùng "−" không dùng "-". |
| rank0-ivory | phải đo | KIT_POR.dx=.18 > khoảng thừa .07 nên có thể hở cạnh. |
| Chưa bắt đầu | | game-feel, brand, img-quality, emo-men, opt-render, scheme-games, econ, rank-ui. |

Ghi chú người duyệt: review/kiem2-notes (R1 b505ed2df, R2 7edeb353e), review/r5-notes a53375818, R6 trên review/gift-chest-wip.

Cảnh báo: R5 đã chạy `pkill -f chromium` lúc dọn, có thể làm chết bài thử của người khác.

## LỖI SẾP BÁO THÊM LÚC ĐÓNG PHIÊN (16:40Z), chưa giao ai
Chi tiết trong OWNER_DECISIONS 16:40Z.
- Bái kiến: buổi tối còn 4 khắc mà vẫn không hiện nút Bái kiến.
- Phế phi họ Lý ở lãnh cung: hiện khung trống, không có hình.
- Buổi tối mà thời tiết ghi "nắng gắt".
- Chạm vào nàng trên sân khấu: hiện khung chữ nhật xanh mờ.
- Nút góc dưới còn ghi "Qua ngày"; chip "Đã mở bản mới" đè lên tiêu đề cảnh.

## QUAN TRỌNG: máy mới không có worktree cũ
Phiên mới chạy trên máy mới. Mọi thứ chỉ còn ở git (các nhánh) + CDN + Magnific (id trong PROGRESS).
Lúc 16:40Z đã đẩy hết ảnh còn nằm ở máy lên CDN:
- act-pics2: toàn bộ act-*/ev-*.
- trung-y c01–c12 + FIGURES-ty.json.
- fig-eunuch-ndp-tray.

Những gì chưa có trên CDN thì lấy lại từ Magnific theo id trong PROGRESS:
- ảnh nấu ăn j83: 40 ảnh + 3 tờ biểu tượng;
- trung-y c13+ (zip hết hạn 16/11 sáng);
- 8 lượt vẽ act-pics2 đang chờ.
Ảnh trung y đã lên CDN nhưng code vẫn ở nhánh review/trung-y.

## PHIÊN CHÍNH 6 (nhận lúc đóng phiên 5)
Đã giao 20 việc (tối đa): trung-y (cắt c13+ trước khi zip hết hạn); fix-float (làm nốt khuôn trang người + lỗi NHÁY khi lật Sổ tuần); người duyệt: opt-render, kit-close, rest-balance, hoangtu-tuchat, stage-slots (chạy thử trên 8b4b51679), game-feel, img-quality, brand; thợ: kit-fig2 (+ hộp "VIỆC · <cung>"), act-pics2 (+ hình Phế phi họ Lý và mọi NPC phụ thiếu hình), scene-light (da hồng 807), tabs-kit, ts-a, event-balance, gift-ui, toilette, j83-variety, close-bugs (nhánh mới review/close-bugs: Bái kiến buổi tối, thời tiết theo buổi, khung xanh khi chạm nàng, "Qua ngày" + chip "Đã mở bản mới").
Chờ chỗ trống: người duyệt rank0-ivory + emo-men, poison-gift; thợ pets-fix, sfx, rank-ui. Duyệt fix-float sau khi thợ báo xong.
Worktree thợ ở /home/user/wt/<tên>. Bản tóm tắt luật cho thợ: /home/user/wt/PREAMBLE.txt, REVIEWER.txt.
- Phiên 5 nhắn thêm 4 ý 16:50Z (đã có trong OWNER_DECISIONS). Đã đưa LUẬT KIT TRƯỚC lên đầu WORKER_BRIEF + bản cho người duyệt. Hàng chờ thêm: thợ hoa điền thu nhỏ thêm một cỡ (làm mẫu vài mặt cho sếp duyệt trước).
- 09:50Z (giờ máy): ĐĨA ĐẦY do 20 thợ cùng fetch đầy đủ repo nông → 6 việc bị chặn, đã chạy lại. Luật mới cho thợ: fetch --depth=30 dưới `flock /home/user/wt/fetch.lock`, không clone lại.
- review/event-honest chưa từng được đẩy (mất theo máy cũ) → event-balance làm lại từ main + opt-render.
- Đã giao: 16:55Z/16:58Z/17:00Z → fix-float (quét kit Tuần lục); 17:04Z ảnh tin sai người → kit-fig2 (ưu tiên, báo sớm). Hàng chờ: reward-anim (17:02Z), hoa điền thu nhỏ thêm, R rank0-ivory+emo-men, R poison-gift, pets-fix, sfx, rank-ui.
- 17:06Z luật sự kiện chính/phụ tuyến (nhãn + hạn chót + đường không tốn bạc) → event-balance. Chi tiết hộp gấm 17:02Z giữ ở hàng chờ reward-anim (giờ hiện món ~1,2–1,5 s, rà mọi món thiếu hình, nhãn phẩm thật, bỏ dòng không đổi).
- ~10:00Z ĐĨA: phiên có hạn mức ghi ~39 GB (df không đúng). Đã bắt mọi worktree dùng sparse-checkout (bỏ dev/shots, dev/owner-shots, dev/figwork), cấm clone đầy đủ; trống lại ~19 GB.
- 17:08Z hội thi lệch chủ đề (Hội Phượng · thi thêu) + 'TỐN không' → close-bugs; ảnh banner → kit-fig2/act-pics2.
- 17:12Z Cần chip trùng (Múa yến tiệc) → close-bugs. Khối 'Ân sủng' (Có thai/Lật thẻ/Ân tình) bị gập, sếp không thấy → chờ sếp chọn cách hiện.
- LIVE main = ca361b147 (hoangtu-tuchat, PASS, kèm sửa j53 lời báo tư chất theo tuổi).
- opt-render FAIL (ghi chú review/opt-render-r6 6f256f7f4): sự kiện dựng thẳng (Thái hậu triệu, 7 lễ hội…) vẫn hiện Được/Mất; gợi ý rơi về "chuyện khác"; CSS riêng .krisk/.khint → thợ mới sửa trên review/opt-render (làm thành kit chung). event-balance giữ phần bot cân bằng.
- Đã mở người duyệt rank0-ivory + emo-men (gộp chung).
- 17:14Z chữ tiêu đề 'Tuần lục' vẽ thư pháp Việt (chữ Latin có dấu, không Hán) 3–4 mẫu → act-pics2 làm trước, sếp chọn rồi mới gắn.
- 17:16Z khung vuông thừa sau ảnh nhỏ + tên nhiều màu + dòng 'Tuần này' dài + nút Lui (Tổng lược Tuần lục) → fix-float, sửa ở kit chung.
- 17:20Z THĂNG PHẨM PHẢI QUA KHẢO HẠCH (đủ điều kiện chỉ là được thi; trượt thì chờ; NPC cùng luật) → hàng chờ, giao ngay khi có chỗ (thợ promo-exam). Hỏi sếp: đường nô tài/ma ma có cần thi không.
- 17:24Z phòng trưa vẫn nâu (scene-light tách lô sớm), đom đóm buổi trưa (close-bugs), ban thưởng tranh cổ không có rương (người duyệt game-feel kiểm).
- 17:27Z bảng nhãn|giá trị lệch cột (LUẬT · Ân thưởng) → kit bảng chung + rà mọi danh sách → fix-float.
- LIVE main = 114887bc1 (brand: icon app + mộc Trân nữ; người duyệt sửa dấu "NỮ" bị đọc "NƠ" và chip "Có bản mới" đè thẻ Hoàng thượng).
- 17:27Z bảng nhãn|giá trị tách sang thợ mới review/kit-table (fix-float xin tách).
- 4 mẫu chữ Tuần lục trên CDN title-tuanluc-v1..v4.webp, đã gửi sếp chọn.
- Hàng chờ (thứ tự): promo-exam (17:20Z), econ-stipend (17:30Z đồ bổng lộc vào Tư trang thật + rương; 17:33Z cắt xén bổng lộc; dựa review/econ), header-danh (17:36Z + sửa ≈17:50Z: trái Sắc·Tài·Tâm cơ·Đức·Danh·Sủng, phải Bạc·Sức; gộp review/header-fix), reward-anim (17:02Z), hoa điền thu nhỏ, R poison-gift, pets-fix, sfx, rank-ui.
- 17:40Z bảng Ân sủng bung to tràn mép → người duyệt stage-slots tìm/sửa; vết đen ở cổ hình Mạnh Mộng Điệp (Thường tại) + rà mọi hình → scene-light.
- 17:45Z SẾP ĐÍNH CHÍNH: Tuần lục KHÔNG dồn trang (mỗi mục một trang như cũ); lỗi thật là trang "Triều đình · thiên hạ" thiếu hình toàn thân → mọi trang phải có hình người (fix-float). Hoa điền: đo tỷ lệ rộng hoa/rộng mặt từng bậc trên CDN, báo bậc nào vượt, đề xuất MỘT cỡ nhỏ hơn cho mọi bậc, gửi mẫu cho sếp TRƯỚC (hàng chờ, ưu tiên cao). Luật kit trước: dán nguyên văn vào mọi lời giao (PREAMBLE), người duyệt FAIL mọi thứ không theo kit, sổ dev/kit/KIT_REQUESTS.md.
- scene-light lô sớm SẴN SÀNG KIỂM 6f624274e (bỏ lớp sepia/nâu ở phòng nàng 4 buổi; mưa ấm) → người duyệt đầu tiên rảnh nhận ngay.
- ~10:50Z (machine clock) CPU OVERLOAD: load ~60 on 4 cores; bot browsers crash (ts-a balance could not be measured). Rule: do NOT refill slots as they free; target ≤12 running agents, at most ~6 that run Playwright at once. ts-a 0b7e154a2 UI ready; balance (bot fix + 80 lives) pending until load drops.
- From now on this file and all repo docs are written in English (owner ~18:30Z).
- LIVE main = 041cdcd1f: kit-close (311260527: Tư trang 2 tabs, news card, no tap-through, ✕ only) + ChatGPT docs (ebbbd9eff) + scene-light colour part (no sepia/brown in her room, warm rain). Not refilling the freed reviewer slot (CPU overload rule).
- LIVE main = rest-balance (207824297): Rest a moment (+6, 1 khắc) vs Recover (evening only, tonic or 8 silver, +20); tonic shown under Cost.
- game-feel FAIL (review/game-feel-r6 5a04b3b21, reviewer fixed the no-chest imperial reward + letter placeholders): kitLose missing, slow reveals (17:02Z), private reveal CSS → new worker on review/game-feel (absorbs queued reward-anim).
- LIVE main = rank0-ivory + emo-men (d50f5f772): Đáp ứng frame A, 8 head marks (6/7 swapped) as items with Dùng, portraits not zoomed + moved up + body centred (edge-safe cap), men's mood seals, seal tap popover. Open: tassels cut on every person card by KIT §28.1 vs owner 06:35Z → queued tassel-fix; mark not yet in promotion chest (needs gift-chest); jkpor face-size zoom (POR_FACE.json, up to 1.6) conflicts with owner 11:30Z 'no zoom' → told gift-ui.
- Huadian measure done (review/huadian-size 094ac3c): 672 portraits; every tier has a 1.5–2× tail, t7/t8 almost all over the rule. Proposal: ONE size 0.07× face width (cap 0.08) for all tiers; sample sheet sent to owner (CDN huadian-sample-sheet.jpg). Waiting for owner approval before any batch.
- LIVE main = img-quality (1a99caf7d): proper portraits immediately (no old 256px faces), strangers in stone frame, unmet công tử silhouette (reviewer kept jht faces for met ones). Notes: core first download ~129 MB (owner earlier complained 83 MB) → needs a download-size task; 129 old face-* still requested at startup; POR_FACE.json 404 (jkpor zoom stays off, fine under owner's no-zoom rule); Fold stage upscales figures 1.43–1.53× (needs 1100px+ fig export).
- LIVE main = close-bugs (ee5758195): Bái kiến offered/explained, far walk 2 khắc any weather, weather words fit buổi×season, no blue tap box, no 'Qua ngày', 'Đã mở bản mới' below top bar (kitLine KIT §42), one Sức requirement per card, festival×contest titles (117), no 'TỐN không'. Notes: no kit SAMPLE PAGE exists in repo (owner asked KIT.md + sample page) → queue kit-sample-page; 'Phi ???' in greet text vs named reward row (name hiding owner).
- tabs-kit fixed (c0b650993) → re-review spawned. It also fixes a game-wide bug (jk3 kitActKey shadowed j79's ACTS lookup → many acts lost their own picture) and adds the KIT SAMPLE PAGE (#kit, jkitpage.js, KIT §47) — so kit-sample-page is removed from the queue. Open: 'Điều kiện sắc phong' wrong next rank (promoReq) → promo-exam worker.
- opt-render fixed (54f381436: all events cost mode via data flags + opt-scan.py, honest 3-level hints as pure kitHint, kit parts kitRisk/kitHintRow/kitKemRow/kitSeal, night Bạc−5 = prep cost) → re-review spawned. Two kit sample pages exist (opt-render ?kit vs tabs-kit #kit) → must become one.
- 11:32Z hourly watch: main ee5758195. Load 48 (falling), disk 14 GB free, 14 agents running; queue held. trung-y: all 576/576 Magnific sources for c13–m52 downloaded locally at 10:44Z (zip-expiry risk gone), cutting in progress (refine v6). Waiting: re-reviews of tabs-kit + opt-render, stage-slots reviewer still running.
- LIVE main = tabs-kit (f500d0464): Tài nghệ/Mệnh truyện/Việc nhờ in kit UI with sub-tabs, fixed filter row, one skill card, kitSceneArt thumb, kitActCompact §43, KIT SAMPLE PAGE (#kit, §47); fixes game-wide act-picture lookup (296 lookups were throwing). promo-exam worker spawned.
- gift-ui ready ded3d5ea7 → reviewer spawned. Includes Emperor daytime acts sharing one daily turn, ev-<key> banners actually shown (24/121), no Triều chính fallback, portrait head-size normalised within no-zoom (5551/5744 within ±3%; kid-a4 boys + ~140 big faces can't be equalised without redraw/zoom-out). POR_FACE.json goes to CDN ONLY after merge.
- kit-fig2 batch 1 (e68183a1d: real-save news/Tuần lục avatars, one fact per news row, doubled titles game-wide KIT §9; KIT §48–§50) → reviewer spawned. Worker continues kitEventDp, VIỆC·<cung>, Thái hậu triệu, Ân oán tabs + new bugs: Thất tịch invitation re-queue loop, lesson minigame overlay not closing. KIT REQUEST number chips → fix-float. Balance bot inpage4.js broken on current main (stuck buổi 1) — event-balance must fix.
- toilette ready 8742f8abb → reviewer spawned (face points 4262 on current art, reactions as event frames, leAttire key fix, game-wide quote-split fix). kit-fig2 part 2 handed to a fresh worker (old one out of context).
- kit-table ready 77625c7ab → reviewer (renumber §41→§51). KIT section registry now in /home/user/wt/PREAMBLE.txt: main §39–§43, §45–§47; reserved §48–50 kit-fig2, §51 kit-table, §52 fix-float, §53 opt-render, §54 game-feel, §55 promo-exam, §56 scene-light.
- LIVE main = stage-slots (53a61f8e8): stage slot fixes + Ân sủng panel opens IN PLACE in the right column (owner 17:40Z bug, matched to owner's reference shot); coop-e2e 59/59.
- header-danh worker spawned (left Sắc·Tài·Tâm cơ·Đức·Danh·Sủng, right Bạc·Sức; merges what is still needed from review/header-fix; fixes quẻ/Sắc overlap at 1000x755).
- LIVE main = opt-render (94ea008a2): every event choice in cost mode (cost + Cần + honest verbal hint + kit risk label), active acts full numbers, kit parts §53 on the #kit page, kitSeal name clash fixed (kitResultSeal), Thái y bắt mạch now an event. Open (event-balance): vague-level hints still identical for some options (night1, giu, prep, Thanh minh, Ban cung).
- act-pics2: LIVE on CDN (data only): ACTS.json hands-only patch (124 '-h' pictures, 163 acts), EVENTS.json festival categories (14 own pictures). Code batch 7cce4420d (jly.js Phế phi họ Lý, festival banners + 4 festival maps, cdn_sync --pull User-Agent fix) → reviewer spawned. Worker continues: system-line patch, more man identities, 89 banners, a467, ~240 act pictures.
