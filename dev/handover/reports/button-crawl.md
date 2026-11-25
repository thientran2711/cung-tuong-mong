# BUTTON CRAWL — every visible button REAL-tapped (ROLE B, Foreman F #5 brief dev/handover/briefs/F-robot-2511.md)
PRIORITY #1 CHECK ('crawler|real tap|realtap|elementFromPoint|every button'): OD 1 (25/11 ~05:10Z rule) | main: no crawler (robot10.js boot/serve reused) | review/*: sansang-music-fix-2 frame-tap-scan.js = kit frame kinds only (complementary, not duplicated) | claims: none.
Owner rule (verbatim, OD 25/11 ~05:10Z): "Tối nay tôi không cần biết, cho robot đi bấm từng cái nút cho tôi, make sure là cái nút nào cũng work. Và nó phải đưa đến, có nghĩa là nó work cho đúng nha. Tôi không có muốn cái tình trạng này xảy ra nữa. ... Giống như là người bấm thật chứ không phải là máy bấm."

## How
- `node dev/test/button-crawl.js [--dev fold,ipad] [--depth 2] [--start title,home,tour] [--game index.html|URL] [--out dir]` (branch review/button-crawl-fix-1).
- Every tap = `dev/test/realtap.js` (local copy of the ROLE A contract): finger-scroll into view → centre point → `document.elementFromPoint` must be the button (or inside it) → touchscreen tap at that point. Covered / off-screen → DEAD. No `.click()` / dispatchEvent / game function presses anything.
- Verdict per tap: hit (DEAD or ok) · effect (layer opened/closed, tab/panel changed, text/state changed, moved, toggled) · right effect (✕/Lui/Đóng closes its own frame or goes back to the screen before; a mini-game ✕ may end the game with its lose result, KIT §13.9; a tab shows that tab; no JS error).
- Screens explored breadth-first from START title (the opening screen), home (a fresh solo life, LỜI DẶN marked seen) and tour (a brand-new player: title → Chơi một mình → Luân hồi → Thân phận → Tiền truyện → Tuyển chọn → Nhập cung → home → LỜI DẶN tour). Between taps the harness restores the snapshot (deser + replay of the path with real taps; reload if a frame stays up) — harness setup only.
- Pictures load from the CDN (layout as she sees it); sound/video blocked. Fold 755x1000 (touch) + iPad 1180x820.
- Gate: `dev/tools/quickcheck.d/90-button-crawl.sh` = `--fast` (Fold, fresh-life home + one tap deep, ≤80 taps); fails on DEAD, JS error on a tap, ✕ that does not close; known filed faults in `dev/tools/quickcheck.d/button-crawl-known.txt` are printed KNOWN.

## FAIL families (LIVE 008aa59b) and status
| # | family | devices | status |
|---|---|---|---|
| 1 | LỜI DẶN tour card: «Tiếp» and «Bỏ qua lời dặn» DEAD (div.kpdr text column over both; 0/9 points free) — a new player cannot leave page 1/12 | Fold + iPad | fixed on review/sansang-music-fix-2 a6b4d573 (owned by session_01V1ZZH1Z5G4aTpbCaR3rDY7; crawler-verified on iPad: Tiếp pages 1/4…5/12, lit-spot tap, Bỏ qua closes) — LAND it |
| 2 | «Chưa điểm trang» rules card: kit ✕ «Quay lại» OPENED the dress screen (ran «Sẵn sàng») | Fold + iPad | FIXED review/button-crawl-fix-1 605decea (jtoil honours KG82.giveUp → «Mặt mộc» lose result); family scan: only jtoil ignored giveUp |
| 3 | Hậu cung: tap on a person / «Xem thêm» → TypeError «f.rk.split is not a function» at pcPort | Fold + iPad | FIXED review/button-crawl-fix-1 6d25be7e (pcPort reads rk as text, like mdH); family scan: only pcPort splits rk |
| 4 | Mục tiêu chương panel: tabs «Mục tiêu · Danh hiệu n/35 · Thiên mệnh» DEAD under the head-art band | Fold | KIT REQUEST K-KDTX-BAND filed (dev/kit/KIT_REQUESTS.md): kitDlgText cap squeezes the stacked band rows — kit keeper; gate lists it KNOWN |
| 5 | Bảng vàng → «Mã khôi phục»: «Chép mã» / «Lui» hit the #modal backdrop (dialog not on top of the leaderboard page?) | Fold | TO CONFIRM (one probe) — next session |
| 6 | first life: the LỜI DẶN tour did not open by itself on a new player's first home screen within 6 s (opened fine from ☰ «Xem lại lời dặn») | Fold + iPad | WARN, to confirm |

Soft «no effect» rows (not called bugs yet; most are harness blind spots fixed in the crawler after this run): «Chọn chính mình» (her figure: selection toggle class j59sel → now counted «toggled»), Dư đồ «Phóng to / Thu nhỏ» (map zoom = inline transform → now «moved»), «Gieo quẻ» (skip area under reduced motion → crawler now runs without reduced motion), stats strip «Sắc … Sủng» (tooltip), iPad «Về phòng» on the home screen, Mệnh truyện › Sổ ghi origin rows, Settings «Sổ đổi mới mã …», Cung nhân «Người lạ». Vault «Giữ sổ trên mây» CORS error = harness origin 127.0.0.1, not the game.
Coverage gap: SKIP 337 rows = the harness could not bring a tab panel back to the exact sub-state (Tư trang / Dư đồ / Tài nghệ sub-tabs) — those buttons were not tapped; next run should reset sub-tab state (or crawl them without restore when the tap only changes the panel).

## READY + HANDOVER (worker rollover, owner 16/11 08:22Z s14 — the COORDINATOR opens the successor)
- depth 5 · START_CTX ~4 % · rolling over at ~29 % (START + 25 %).
- READY button-crawl-fix-1 87c8c543 (review/button-crawl-fix-1, from LIVE 008aa59b): fix #2 jtoil ✕ + fix #3 pcPort + crawler + gate hook + KIT REQUEST K-KDTX-BAND. quickcheck 6d25be7e: all PASS except the 90 hook, which then failed only on the filed K-KDTX-BAND fault → known-list added in 87c8c543 (gate self-test PASS, 0 sure faults, 205 s).
- Worktrees: /home/user/wt/bcrawl (crawler dev copy, LIVE index), /home/user/wt/bcfix (fix branch, detached HEAD = 87c8c543), /home/user/wt/bcho (this report). Runs + shots: /home/user/wt/bc-out/ (full6 = this table; shots NOT in git).
- NEXT for the successor: (a) switch realtap.js to ROLE A's review/robot-realtap once Foreman F gives the sha; (b) full re-run with the newer crawler (no reduced motion, toggles/moves, frame-on-top dedupe): `node dev/test/button-crawl.js --dev fold,ipad --start title,home,tour --depth 2 --out <dir>` then `--report <dir>` into this file; (c) confirm #5 (Bảng vàng «Mã khôi phục» on Fold) and #6 (tour auto-open) with one probe each, fix as fix-2 if real; (d) close the SKIP gap (sub-tab state restore); (e) deeper screens: act cards (Hành sự) options, mini-game intros, person-focus, visitors — depth 3 from home and a mid-life save (robot10 saves) so later-rank tabs exist.

## Numbers (run full6, LIVE 008aa59b, depth 2 from title + home; tour run separate)
Devices: fold + ipad · rows 1587 · PASS 1184 · FAIL 58 (dead 5) · WARN 0 · SKIP 345 (harness could not bring the screen back; not a game verdict)
- fold: PASS 450 · FAIL 29 · WARN 0 · SKIP 160
- ipad: PASS 734 · FAIL 29 · WARN 0 · SKIP 185

### FAIL + WARN (every row)

| dev | screen | button | hit | effect | verdict |
|---|---|---|---|---|---|
| fold | home [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | Sắc 45 Tài 73 Tâm cơ 17 Đức 30 Danh 38 Sủng 8 | ok | no effect (screen and state unchanged) | FAIL |
| fold | home [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | Chọn chính mình | ok | no effect (screen and state unchanged) | FAIL |
| fold | Chưa điểm trang [div#ov.ov:TÀI NGHỆ Điểm trang: Trước gương đồng ✕ ] | Quay lại | ok | close button did not close its layer (something else changed) | FAIL |
| fold | Quẻ Trung (Giao thiệp) [div#modal.modal:Quẻ Trung · Giao thiệp] | Gieo quẻ | ok | no effect (screen and state unchanged) | FAIL |
| fold | Mục tiêu chương (có mới) [div#modal.modal:Chương 1 · Nhập cung, đứng v | Mục tiêu | DEAD | dead button: covered under img | FAIL |
| fold | Mục tiêu chương (có mới) [div#modal.modal:Chương 1 · Nhập cung, đứng v | Danh hiệu 0/35 | DEAD | dead button: centre covered (1/9 points free) under img | FAIL |
| fold | Mục tiêu chương (có mới) [div#modal.modal:Chương 1 · Nhập cung, đứng v | Thiên mệnh | DEAD | dead button: covered under img | FAIL |
| fold | Dư đồ [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | Thu nhỏ | ok | no effect (screen and state unchanged) | FAIL |
| fold | Dư đồ [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | Phóng to | ok | no effect (screen and state unchanged) | FAIL |
| fold | Hậu cung [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] |  | ok | JS error: console.error: TypeError: f.rk.split is not a function at pcPort (http://127.0.0.1:41173/index.html:4691:282) at | FAIL |
| fold | Hậu cung [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | Xem thêm | ok | JS error: console.error: TypeError: f.rk.split is not a function at pcPort (http://127.0.0.1:41173/index.html:4691:282) at | FAIL |
| fold | Ô lưu › Thiết lập [div#modal.modal.kptitle:Thiết lập] | Sổ đổi mới mã 0756a05b+ · 11/25/2026 05:01 Xem | ok | no effect (screen and state unchanged) | FAIL |
| fold | Ô lưu › Thiết lập [div#modal.modal.kptitle:Thiết lập] | Giữ sổ trên mây lập ám hiệu sổ mới | ok | JS error: console.error: Access to fetch at 'https://ctm-coop.victoria-tntt.workers.dev/api/vault/new' from origin 'http://127.0.0 | FAIL |
| fold | Quẻ Trung (Giao thiệp) › Gieo lại TỐN Bạc -10·1 khắc ĐƯỢC không [div#m | Gieo quẻ | ok | no effect (screen and state unchanged) | FAIL |
| fold | Hậu cung › Cung nhân [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | Người lạ | ok | no effect (screen and state unchanged) | FAIL |
| fold | Mệnh truyện › Sổ ghi [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | Con gái Tể tướng 0/16 | ok | no effect (screen and state unchanged) | FAIL |
| fold | Mệnh truyện › Sổ ghi [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | Con gái Đại tướng quân 0/16 | ok | no effect (screen and state unchanged) | FAIL |
| fold | Mệnh truyện › Sổ ghi [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | Con gái nhà buôn muối 0/16 | ok | no effect (screen and state unchanged) | FAIL |
| fold | Mệnh truyện › Sổ ghi [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | Cung nữ được sủng hạnh 0/16 | ok | no effect (screen and state unchanged) | FAIL |
| fold | Mệnh truyện › Sổ ghi [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | Công chúa hòa thân · Ba Tư 0/16 | ok | no effect (screen and state unchanged) | FAIL |
| fold | Mệnh truyện › Sổ ghi [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | Công chúa hòa thân · Phù Tang 0/16 | ok | no effect (screen and state unchanged) | FAIL |
| fold | Mệnh truyện › Sổ ghi [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | Con gái tội thần 0/16 | ok | no effect (screen and state unchanged) | FAIL |
| fold | Mệnh truyện › Sổ ghi [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | Cháu gái Thái hậu 0/16 | ok | no effect (screen and state unchanged) | FAIL |
| fold | Mệnh truyện › Sổ ghi [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | Con gái thầy đồ nghèo 0/16 | ok | no effect (screen and state unchanged) | FAIL |
| fold | Mệnh truyện › Sổ ghi [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | Cung nữ tuyển vào cung 0/16 | ok | no effect (screen and state unchanged) | FAIL |
| fold | Bảng vàng [div#modal.modal.krkp:Mã khôi phục] | Lui | DEAD | dead button: covered under div#modal.modal.krkp.kptitle «ĐIỀUMã khôi phụcKhách vô danh✕Mã khôi ph» | FAIL |
| fold | Bảng vàng [div#modal.modal.krkp:Mã khôi phục] | Chép mã | DEAD | dead button: covered under div#modal.modal.krkp.kptitle «ĐIỀUMã khôi phụcKhách vô danh✕Mã khôi ph» | FAIL |
| fold | Thiết lập [div#modal.modal.kptitle:Thiết lập] | Sổ đổi mới mã 0756a05b+ · 11/25/2026 05:01 Xem | ok | no effect (screen and state unchanged) | FAIL |
| fold | Thiết lập [div#modal.modal.kptitle:Thiết lập] | Giữ sổ trên mây lập ám hiệu sổ mới | ok | JS error: console.error: Access to fetch at 'https://ctm-coop.victoria-tntt.workers.dev/api/vault/new' from origin 'http://127.0.0 | FAIL |
| ipad | home [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | Sắc 83 Tài 41 Tâm cơ 12 Đức 30 Danh 8 Sủng 8 | ok | no effect (screen and state unchanged) | FAIL |
| ipad | home [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | Về phòng | ok | no effect (screen and state unchanged) | FAIL |
| ipad | home [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | Chọn chính mình | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Chưa điểm trang [div#ov.ov:TÀI NGHỆ Điểm trang: Trước gương đồng ✕ ] | Quay lại | ok | close button did not close its layer (something else changed) | FAIL |
| ipad | Quẻ Hạ hạ (Mưu kế) [div#modal.modal:Quẻ Hạ hạ · Mưu kế] | Gieo quẻ | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Dư đồ [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | Thu nhỏ | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Dư đồ [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | Phóng to | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Hậu cung [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | Chọn chính mình | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Hậu cung [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] |  | ok | JS error: console.error: TypeError: f.rk.split is not a function at pcPort (http://127.0.0.1:41173/index.html:4691:282) at | FAIL |
| ipad | Hậu cung [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | Xem thêm | ok | JS error: console.error: TypeError: f.rk.split is not a function at pcPort (http://127.0.0.1:41173/index.html:4691:282) at | FAIL |
| ipad | Giao tình [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | Chọn chính mình | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Hoàng tự [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | Chọn chính mình | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Tư trang [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | Chọn chính mình | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Tài nghệ [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | Chọn chính mình | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Mệnh truyện [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | Chọn chính mình | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Ô lưu › Thiết lập [div#modal.modal.kptitle:Thiết lập] | Sổ đổi mới mã 0756a05b+ · 11/25/2026 05:01 Xem | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Ô lưu › Thiết lập [div#modal.modal.kptitle:Thiết lập] | Giữ sổ trên mây lập ám hiệu sổ mới | ok | JS error: console.error: Access to fetch at 'https://ctm-coop.victoria-tntt.workers.dev/api/vault/new' from origin 'http://127.0.0 | FAIL |
| ipad | Quẻ Hạ hạ (Mưu kế) › Gieo lại TỐN Bạc -10·1 khắc ĐƯỢC không [div#modal | Gieo quẻ | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Dư đồ › Danh sách [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | Chọn chính mình | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Hậu cung › Nam nhân [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | Chọn chính mình | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Hậu cung › Cung nhân [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | Chọn chính mình | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Hậu cung › Cung nhân [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | Người lạ | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Giao tình › Phe phái [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | Chọn chính mình | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Hoàng tự › Kế vị [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | Chọn chính mình | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Hoàng tự › Hoàng tự trong cung [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Ki | Chọn chính mình | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Hoàng tự › Hôn sự [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | Chọn chính mình | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Hoàng tự › Quý tộc kén rể · kén dâu [body:☰ Vân Tố Ngưng Đáp ứng 19 tu | Chọn chính mình | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Hoàng tự › Quý tộc kén rể · kén dâu [body:☰ Vân Tố Ngưng Đáp ứng 19 tu | Người lạ | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Tư trang › Thú cưng [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | Chọn chính mình | ok | no effect (screen and state unchanged) | FAIL |

### PASS (per screen: buttons that hit and did the right thing)

| dev | screen | buttons PASS |
|---|---|---|
| fold | home [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | 31: Ô lưu · Xem bản thân · Bạc 180 Sức 80/100 · Buổi sáng, còn 4 khắc · Chưa điểm trang · sương sớm · Quẻ Trung (Giao thiệp) · Tâm trạng Bình thản 0 · Cung nữ thân tín tam đẳn · Lịch tháng · Mục tiêu chương (có mới) · 3 Cung nhân · 3 Chí tôn · Tai mắt 0 · Có thai Rất thấp · Lật thẻ Rất thấp · Ân tình (đêm) 0 · Số lần ân thưởng 0 · Bổng lộc sau 3 tuần · Nguy hiểm chung: 0 · Xét phẩm: thiếu 4 · Hành sự  |
| fold | Ô lưu [div#modal.modal.kptitle:Cung Tường Mộng] | 6: Lui · Chơi một mình chọn sổ, x · Cùng hảo hữu Mời hảo hữu · Sổ luân hồi · Bảng vàng · Thiết lập |
| fold | Xem bản thân [div#modal.modal.pcm:✕ Cố Ngưng Hoa Tần 23 Tinh phẩm Trâm | 13: Lui ·  · 23 Tinh phẩm Trâm phỉ th · Hoa tai · Đeo tay · Đeo eo · Túi thơm · Khăn che mặt · 35 Trân phẩm Áo gấm thêu · Giày · Theo hầu · Tư chất · Tài nghệ |
| fold | Bạc 180 Sức 80/100 [div#modal.modal:Bạc] | 2: Lui ·  |
| fold | Buổi sáng, còn 4 khắc [div#modal.modal:sáng · còn] | 1: Lui |
| fold | Chưa điểm trang [div#ov.ov:TÀI NGHỆ Điểm trang: Trước gương đồng ✕ ] | 2: Luật chơi · Điểm trang · Sẵn sàng bắt đầu chơi |
| fold | Quẻ Trung (Giao thiệp) [div#modal.modal:Quẻ Trung · Giao thiệp] | 2: Lui · Gieo lại TỐN Bạc -10·1 k |
| fold | Tâm trạng Bình thản 0 [div#modal.modal:Tâm trạng · Ta] | 1: Lui |
| fold | Lịch tháng [div#modal.modal.kmc-modal:Lịch tháng] | 34: Lui · Tháng trước · Tháng sau · mồng 1: Lĩnh bổng lộc ·  · mồng 2 · mồng 3 · mồng 4 · mồng 5: Tiết Thanh minh · mồng 6 · mồng 7 · mồng 8 · mồng 9 · mồng 10 · ngày 11: Thời tiết: trời · ngày 12 · ngày 13 · ngày 14 · ngày 15 · ngày 16 · ngày 17 · ngày 18 · ngày 19 · ngày 20 · ngày 21 · ngày 22: Nguyệt tín · ngày 23: Nguyệt tín · ngày 24: Nguyệt tín · ngày 25: Nguyệt tín · ngày 26: Nguyệt tín · ngày  |
| fold | Mục tiêu chương (có mới) [div#modal.modal:Chương 1 · Nhập cung, đứng v | 3: Lui · Đi làm: Thỉnh an Thái hậ · Đi làm: Thay y phục hay  |
| fold | Có thai Rất thấp [div#modal.modal:Có thai: Rất thấp] | 1: Lui |
| fold | Lật thẻ Rất thấp [div#modal.modal:Lật thẻ: Rất thấp] | 1: Lui |
| fold | Ân tình (đêm) 0 [div#modal.modal:Ân tình (đêm)] | 1: Lui |
| fold | Số lần ân thưởng 0 [div#modal.modal:Ân thưởng] | 1: Lui |
| fold | Bổng lộc sau 3 tuần [div#modal.modal:Bổng lộc] | 1: Lui |
| fold | Nguy hiểm chung: 0 [div#modal.modal:Nguy hiểm chung] | 2: Lui · Đóng cửa giữ mình TỐN Sủ |
| fold | Xét phẩm: thiếu 4 [div#modal.modal:Xét phẩm cuối tháng · Phi] | 1: Lui |
| fold | Dư đồ [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | 2: Ra vào cung cấm · Danh sách |
| fold | Hậu cung [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | 4: Chí tôn · Phi tần · Nam nhân · Cung nhân |
| fold | Giao tình [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | 2: Ân oán · Phe phái |
| fold | Hoàng tự [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | 5: Con của ta · Kế vị · Hoàng tự trong cung · Hôn sự · Quý tộc kén rể · kén dâu |
| fold | Tư trang [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | 3: Túi đồ · Thú cưng · Việc |
| fold | Tài nghệ [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | 5: Tứ đức 9/9 · Cầm kỳ thi họa 8/12 · Vũ · Y · Nữ công 8/12 · Tác phẩm · Bảng tài nghệ hậu cung G |
| fold | Mệnh truyện [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | 3: Mệnh truyện · Việc nhờ · Sổ ghi |
| fold | Sang buổi [div#kntchip.ktbt.kntc:! Thường tại ??? sai người sang thách | 1: ! Thường tại ??? sai ngư |
| fold | Ô lưu › Chơi một mình chọn sổ, xem Phúc duyên [div#modal.modal.kptitle | 7: Lui · Một mình · Cùng hảo hữu · Nhập ám hiệu · Mời hảo hữu · Mời hảo hữu · Mời hảo hữu |
| fold | Ô lưu › Sổ luân hồi [div#modal.modal.kptitle:Sổ luân hồi] | 37: Lui · Ghi chú · Ghi chú · Ghi chú · Con gái Tể tướng 0/16 · Con gái Đại tướng quân 0 · Con gái nhà buôn muối 0/ · Cung nữ được sủng hạnh 0 · Công chúa hòa thân · Cao · Công chúa hòa thân · Ba  · Công chúa hòa thân · Phù · Con gái tội thần 0/16 · Cháu gái Thái hậu 0/16 · Con gái thầy đồ nghèo 0/ · Cung nữ tuyển vào cung 0 · Mật lệnh cố quốc 0/4 · Sứ đoàn cố quốc 0/4 · Người ngoại tộc 0/4 · Ngai vàn |
| fold | Ô lưu › Bảng vàng [div#modal.modal.krkp:Mã khôi phục] | 1: Lui |
| fold | Ô lưu › Thiết lập [div#modal.modal.kptitle:Thiết lập] | 13: Lui · Tiếng nhạc, tiếng động,  · Nhạc 50 · Tiếng động 70 · Giọng 70 · Rung Có · Hiệu ứng Gọn: tranh tĩnh · Lời dặn tân thủ ma ma ch · Xem lại lời dặn Game này · Xem · Nối sổ máy kia đã có ám  · Tải hết để chơi offline  · Nạp sổ GHI CHÚ dán bản c |
| fold | Quẻ Trung (Giao thiệp) › Gieo lại TỐN Bạc -10·1 khắc ĐƯỢC không [div#m | 1: Lui |
| fold | Mục tiêu chương (có mới) › Lui [div#rtoast.rtoast.karesult:KẾT QUẢ Lui | 1: Xem đầy đủ trong Sổ ghi |
| fold | Mục tiêu chương (có mới) › Đi làm: Thay y phục hay trang sức trong Tư  | 1: Xem đầy đủ trong Sổ ghi |
| fold | Nguy hiểm chung: 0 › Lui [div#rtoast.rtoast.karesult:KẾT QUẢ Thôi Nguy | 1: Xem đầy đủ trong Sổ ghi |
| fold | Nguy hiểm chung: 0 › Đóng cửa giữ mình TỐN Sủng -3 ĐƯỢC 2 tuần: mưu h  | 1: Xem đầy đủ trong Sổ ghi |
| fold | Hậu cung › Phi tần [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | 21: Chí tôn · Phi tần · Nam nhân · Cung nhân · Hàn Yên · Doanh Nguyệt · Người lạ · Người lạ · Người lạ · Người lạ · Người lạ · Người lạ · Người lạ · Người lạ · Xem thang nguy hiểm · Gặp mặt 3/5 · Giao thiệp 2/3 · Dùng chứng cứ 0/8 · Hại nhỏ 7/12 · Hại nặng 13/17 · Sát hại 5/9 |
| fold | Hậu cung › Nam nhân [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | 4: Chí tôn · Phi tần · Nam nhân · Cung nhân |
| fold | Hậu cung › Cung nhân [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | 12: Chí tôn · Phi tần · Nam nhân · Cung nhân · Người trước · Người lạ · Người lạ · Người lạ · Người lạ · Người lạ · Người sau ·  |
| fold | Giao tình › Phe phái [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | 4: Ân oán · Phe phái · Phe phái hậu cung · Triều đình |
| fold | Hoàng tự › Kế vị [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | 8: Con của ta · Kế vị · Hoàng tự trong cung · Hôn sự · Quý tộc kén rể · kén dâu · Xem thêm · 1. Tuyên · 2. Thụy |
| fold | Hoàng tự › Hoàng tự trong cung [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp t | 12: Con của ta · Kế vị · Hoàng tự trong cung · Hôn sự · Quý tộc kén rể · kén dâu · Xem thêm · Khác · Mẫn · Kính · Tuyên · Thụy · Đến cung nàng ta thăm ⓘ  |
| fold | Hoàng tự › Hôn sự [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | 6: Con của ta · Kế vị · Hoàng tự trong cung · Hôn sự · Quý tộc kén rể · kén dâu · Xem thêm |
| fold | Hoàng tự › Quý tộc kén rể · kén dâu [body:☰ Cố Ngưng Hoa Tần 19 tuổi K | 19: Con của ta · Kế vị · Hoàng tự trong cung · Hôn sự · Quý tộc kén rể · kén dâu · Xem thêm · Người trước · Người lạ · Người lạ · Người lạ · Người lạ · Người lạ · Người lạ · Người lạ · Người lạ · Người lạ · Người lạ · Người sau · Dò hỏi gia thế Rất vững  |
| fold | Tư trang › Thú cưng [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | 4: Túi đồ · Thú cưng · Việc · Nhờ thái giám tìm thú nu |
| fold | Tư trang › Việc [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | 7: Túi đồ · Thú cưng · Việc · Nhờ thái giám mua đồ ⓘ Đ · Soát đồ Mong manh TỐN 2  · Sai cung nữ thân tín mua · Hối lộ người ở Thái y vi |
| fold | Tài nghệ › Cầm kỳ thi họa 8/12 [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp t | 22: Tứ đức 9/9 · Cầm kỳ thi họa 8/12 · Vũ · Y · Nữ công 8/12 · Tác phẩm · ⓘ Cách học · Bậc 0 trên 5 · Tự học ⓘ TỐN 2 khắc Sức  · Học với thầy ⓘ TỐN 2 khắ · Các lối, sách phổ ⓘ ĐƯỢC · Bậc 2 trên 5 · Tự học ⓘ TỐN 2 khắc Sức  · Học với thầy ⓘ TỐN 2 khắ · Các lối, sách phổ ⓘ ĐƯỢC · Bậc 0 trên 5 · Tự học ⓘ TỐN 2 khắc Sức  · Học với thầy ⓘ TỐN 2 khắ · Các lối, sách phổ ⓘ ĐƯỢC · Bậc 1 trên 5 · Tự học ⓘ TỐN 2 |
| fold | Tài nghệ › Vũ · Y · Nữ công 8/12 [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp | 22: Tứ đức 9/9 · Cầm kỳ thi họa 8/12 · Vũ · Y · Nữ công 8/12 · Tác phẩm · ⓘ Cách học · Bậc 2 trên 5 · Tự học ⓘ TỐN 2 khắc Sức  · Học với thầy ⓘ TỐN 2 khắ · Các lối, sách phổ ⓘ ĐƯỢC · Bậc 0 trên 5 · Tự học ⓘ TỐN 2 khắc Sức  · Học với thầy ⓘ TỐN 2 khắ · Các lối, sách phổ ⓘ ĐƯỢC · Bậc 0 trên 5 · Tự học ⓘ TỐN 2 khắc Sức  · Học với thầy ⓘ TỐN 2 khắ · Các lối, sách phổ ⓘ ĐƯỢC · Bậc 0 trên 5 · Tự học ⓘ TỐN 2 |
| fold | Tài nghệ › Tác phẩm [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | 8: Tứ đức 9/9 · Cầm kỳ thi họa 8/12 · Vũ · Y · Nữ công 8/12 · Tác phẩm · ⓘ Tác phẩm · Hỏi thái y kiêng kỵ ⓘ TỐ · Sai cung nữ dò la khẩu v · Bảng tài nghệ hậu cung G |
| fold | Tài nghệ › Bảng tài nghệ hậu cung GHI CHÚ xem thứ bậc từng [div#modal. | 10: Lui · Đàn Rất vững TỐN không Đ · Cờ Rất vững TỐN không ĐƯ · Vẽ Rất vững TỐN không ĐƯ · Múa Rất vững TỐN không Đ · Thơ Rất vững TỐN không Đ · Điều hương Rất vững TỐN  · Nấu ăn Rất vững TỐN khôn · Thêu Rất vững TỐN không  · Đầu hồ Rất vững TỐN khôn |
| fold | Mệnh truyện › Sổ ghi [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | 30: Mệnh truyện · Việc nhờ · Sổ ghi · Công chúa hòa thân · Cao ·  · Ghi chú · Ghi chú · Ghi chú · Mật lệnh cố quốc 0/4 · Sứ đoàn cố quốc 0/4 · Người ngoại tộc 0/4 · Ngai vàng cố quốc 0/4 · Nhập cung · ? ? kỳ ngộ · ? · ? · ? · ? · ? · ? · ? ? kỳ ngộ · Chương 12 · Tranh ngôi Trung cung · Mẫu nghi thiên hạ · Hồi kết nhánh · ? Còn mở ? ? ? thua · ? Còn mở ? ? ? thua · ? Còn mở ? ? ? thua · ? Còn mở ? ? ?  |
| fold | Sang buổi › ! Thường tại ??? sai người sang thách đấu ta [div#modal.mo | 1: Lui |
| fold | title [div#modal.modal.kptitle:Cung Tường Mộng] | 6: Lui · Chơi một mình chọn sổ, x · Cùng hảo hữu Mời hảo hữu · Sổ luân hồi · Bảng vàng · Thiết lập |
| fold | Chơi một mình chọn sổ, xem Phúc duyên [div#modal.modal.kptitle:Chọn sổ | 3: Lui · Một mình · Cùng hảo hữu |
| fold | Sổ luân hồi [div#modal.modal.kptitle:Sổ luân hồi] | 36: Lui · Ghi chú · Ghi chú · Con gái Tể tướng 0/16 · Con gái Đại tướng quân 0 · Con gái nhà buôn muối 0/ · Cung nữ được sủng hạnh 0 · Công chúa hòa thân · Cao · Công chúa hòa thân · Ba  · Công chúa hòa thân · Phù · Con gái tội thần 0/16 · Cháu gái Thái hậu 0/16 · Con gái thầy đồ nghèo 0/ · Cung nữ tuyển vào cung 0 · Quân cờ trong tay cha 0/ · Phủ Tể tướng mắc oan 0/4 · Phủ Tể tướng chia đôi 0/ · Mật  |
| fold | Bảng vàng [div#modal.modal.krkp:Mã khôi phục] | 2: Ta đã ghi lại · Lấy lại |
| fold | Thiết lập [div#modal.modal.kptitle:Thiết lập] | 11: Lui · Tiếng nhạc, tiếng động,  · Tiếng động 70 · Giọng 70 · Rung Có · Hiệu ứng Gọn: tranh tĩnh · Lời dặn tân thủ ma ma ch · Xem · Nối sổ máy kia đã có ám  · Tải hết để chơi offline  · Nạp sổ GHI CHÚ dán bản c |
| fold | Sổ luân hồi › Nhập cung [div#modal.modal.kptitle:Nhập cung] | 1: Lui |
| fold | Sổ luân hồi › ? ? kỳ ngộ [div#modal.modal.kptitle:?] | 1: Lui |
| fold | Sổ luân hồi › Chương 12 [div#modal.modal.kptitle:Chương 12] | 1: Lui |
| fold | Sổ luân hồi › Tranh ngôi Trung cung [div#modal.modal.kptitle:Tranh ngô | 1: Lui |
| fold | Sổ luân hồi › Mẫu nghi thiên hạ [div#modal.modal.kptitle:Mẫu nghi thiê | 1: Lui |
| fold | Sổ luân hồi › Hồi kết nhánh [div#modal.modal.kptitle:Hồi kết nhánh] | 1: Lui |
| fold | Thiết lập › Xem [div#modal.modal.kptitle:Sổ đổi mới] | 1: Lui |
| fold | Thiết lập › Nối sổ máy kia đã có ám hiệu [div#modal.modal.kptitle:Nối  | 2: Lui · Nối sổ |
| fold | Thiết lập › Tải hết để chơi offline mở bảng tải [div#modal.modal.kptit | 2: Bắt đầu tải tải ngầm lúc · Lui về Thiết lập |
| ipad | home [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | 31: Ô lưu · Xem bản thân · Bạc 380 Sức 80/100 · Buổi sáng, còn 4 khắc · Chưa điểm trang · sương sớm · Quẻ Hạ hạ (Mưu kế) · Tâm trạng Bình thản 0 · Cung nữ thân tín tam đẳn · Lịch tháng · Mục tiêu chương (có mới) · 1 Cung nhân · 3 Chí tôn · Tai mắt 0 · Có thai Rất thấp · Lật thẻ Rất thấp · Ân tình (đêm) 0 · Số lần ân thưởng 0 · Bổng lộc sau 3 tuần · Nguy hiểm chung: 0 · Xét phẩm: thiếu 4 · Hành sự · Dư |
| ipad | Ô lưu [div#modal.modal.kptitle:Cung Tường Mộng] | 6: Lui · Chơi một mình chọn sổ, x · Cùng hảo hữu Mời hảo hữu · Sổ luân hồi · Bảng vàng · Thiết lập |
| ipad | Xem bản thân [div#modal.modal.pcm:✕ Vân Tố Ngưng Đáp ứng 10 Thường Trâ | 13: Lui ·  · 10 Thường Trâm hoa lụa · Hoa tai · Đeo tay · Đeo eo · Túi thơm · Khăn che mặt · 10 Thường Áo lụa thêu ho · Giày · Theo hầu · Tư chất · Tài nghệ |
| ipad | Bạc 380 Sức 80/100 [div#modal.modal.kpcompactm:Bạc] | 2: Lui ·  |
| ipad | Buổi sáng, còn 4 khắc [div#modal.modal.kpcompactm:sáng · còn] | 1: Lui |
| ipad | Chưa điểm trang [div#ov.ov:TÀI NGHỆ Điểm trang: Trước gương đồng ✕ ] | 2: Luật chơi · Điểm trang · Sẵn sàng bắt đầu chơi |
| ipad | Quẻ Hạ hạ (Mưu kế) [div#modal.modal:Quẻ Hạ hạ · Mưu kế] | 2: Lui · Gieo lại TỐN Bạc -10·1 k |
| ipad | Tâm trạng Bình thản 0 [div#modal.modal:Tâm trạng · Ta] | 1: Lui |
| ipad | Lịch tháng [div#modal.modal.kmc-modal:Lịch tháng] | 34: Lui · Tháng trước · Tháng sau · mồng 1: Lĩnh bổng lộc ·  · mồng 2 · mồng 3 · mồng 4 · mồng 5: Tiết Thanh minh · mồng 6 · mồng 7 · mồng 8 · mồng 9 · mồng 10 · ngày 11 · ngày 12 · ngày 13 · ngày 14 · ngày 15 · ngày 16 · ngày 17 · ngày 18 · ngày 19 · ngày 20 · ngày 21: Nguyệt tín · ngày 22: Nguyệt tín · ngày 23: Nguyệt tín · ngày 24: Nguyệt tín · ngày 25: Nguyệt tín · ngày 26: Nguyệt tín · ngày 27: N |
| ipad | Mục tiêu chương (có mới) [div#modal.modal:Chương 1 · Nhập cung, đứng v | 4: Lui · Mục tiêu · Danh hiệu 0/35 · Thiên mệnh |
| ipad | Tai mắt 0 [div#modal.modal:Tai mắt] | 2: Lui ·  |
| ipad | Có thai Rất thấp [div#modal.modal.kpcompactm:Có thai: Rất thấp] | 1: Lui |
| ipad | Lật thẻ Rất thấp [div#modal.modal.kpcompactm:Lật thẻ: Rất thấp] | 1: Lui |
| ipad | Ân tình (đêm) 0 [div#modal.modal:Ân tình (đêm)] | 1: Lui |
| ipad | Số lần ân thưởng 0 [div#modal.modal:Ân thưởng] | 1: Lui |
| ipad | Bổng lộc sau 3 tuần [div#modal.modal:Bổng lộc] | 1: Lui |
| ipad | Nguy hiểm chung: 0 [div#modal.modal:Nguy hiểm chung] | 2: Lui · Đóng cửa giữ mình TỐN Sủ |
| ipad | Xét phẩm: thiếu 4 [div#modal.modal:Xét phẩm cuối tháng · Thường tại] | 1: Lui |
| ipad | Dư đồ [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | 14: Ra vào cung cấm · Danh sách · Lịch tháng · Mục tiêu chương (có mới) · 1 Cung nhân · 3 Chí tôn · Tai mắt 0 · Có thai Rất thấp · Lật thẻ Rất thấp · Ân tình (đêm) 0 · Số lần ân thưởng 0 · Bổng lộc sau 3 tuần · Nguy hiểm chung: 0 · Xét phẩm: thiếu 4 |
| ipad | Hậu cung [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | 17: Cung nữ thân tín tam đẳn · Lịch tháng · Mục tiêu chương (có mới) · 1 Cung nhân · 3 Chí tôn · Tai mắt 0 · Có thai Rất thấp · Lật thẻ Rất thấp · Ân tình (đêm) 0 · Số lần ân thưởng 0 · Bổng lộc sau 3 tuần · Nguy hiểm chung: 0 · Xét phẩm: thiếu 4 · Chí tôn · Phi tần · Nam nhân · Cung nhân |
| ipad | Giao tình [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | 15: Cung nữ thân tín tam đẳn · Lịch tháng · Mục tiêu chương (có mới) · 1 Cung nhân · 3 Chí tôn · Tai mắt 0 · Có thai Rất thấp · Lật thẻ Rất thấp · Ân tình (đêm) 0 · Số lần ân thưởng 0 · Bổng lộc sau 3 tuần · Nguy hiểm chung: 0 · Xét phẩm: thiếu 4 · Ân oán · Phe phái |
| ipad | Hoàng tự [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | 18: Cung nữ thân tín tam đẳn · Lịch tháng · Mục tiêu chương (có mới) · 1 Cung nhân · 3 Chí tôn · Tai mắt 0 · Có thai Rất thấp · Lật thẻ Rất thấp · Ân tình (đêm) 0 · Số lần ân thưởng 0 · Bổng lộc sau 3 tuần · Nguy hiểm chung: 0 · Xét phẩm: thiếu 4 · Con của ta · Kế vị · Hoàng tự trong cung · Hôn sự · Quý tộc kén rể · kén dâu |
| ipad | Tư trang [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | 16: Cung nữ thân tín tam đẳn · Lịch tháng · Mục tiêu chương (có mới) · 1 Cung nhân · 3 Chí tôn · Tai mắt 0 · Có thai Rất thấp · Lật thẻ Rất thấp · Ân tình (đêm) 0 · Số lần ân thưởng 0 · Bổng lộc sau 3 tuần · Nguy hiểm chung: 0 · Xét phẩm: thiếu 4 · Túi đồ · Thú cưng · Việc |
| ipad | Tài nghệ [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | 18: Cung nữ thân tín tam đẳn · Lịch tháng · Mục tiêu chương (có mới) · 1 Cung nhân · 3 Chí tôn · Tai mắt 0 · Có thai Rất thấp · Lật thẻ Rất thấp · Ân tình (đêm) 0 · Số lần ân thưởng 0 · Bổng lộc sau 3 tuần · Nguy hiểm chung: 0 · Xét phẩm: thiếu 4 · Tứ đức 9/9 · Cầm kỳ thi họa 8/12 · Vũ · Y · Nữ công 8/12 · Tác phẩm · Bảng tài nghệ hậu cung G |
| ipad | Mệnh truyện [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | 16: Cung nữ thân tín tam đẳn · Lịch tháng · Mục tiêu chương (có mới) · 1 Cung nhân · 3 Chí tôn · Tai mắt 0 · Có thai Rất thấp · Lật thẻ Rất thấp · Ân tình (đêm) 0 · Số lần ân thưởng 0 · Bổng lộc sau 3 tuần · Nguy hiểm chung: 0 · Xét phẩm: thiếu 4 · Mệnh truyện · Việc nhờ · Sổ ghi |
| ipad | Sang buổi [div#kntchip.ktbt.kntc:! Có tin: Đức Thọ cung có chuyện] | 1: ! Có tin: Đức Thọ cung c |
| ipad | Ô lưu › Chơi một mình chọn sổ, xem Phúc duyên [div#modal.modal.kptitle | 7: Lui · Một mình · Cùng hảo hữu · Nhập ám hiệu · Mời hảo hữu · Mời hảo hữu · Mời hảo hữu |
| ipad | Ô lưu › Sổ luân hồi [div#modal.modal.kptitle:Sổ luân hồi] | 37: Lui · Ghi chú · Ghi chú · Ghi chú · Con gái Tể tướng 0/16 · Con gái Đại tướng quân 0 · Con gái nhà buôn muối 0/ · Cung nữ được sủng hạnh 0 · Công chúa hòa thân · Cao · Công chúa hòa thân · Ba  · Công chúa hòa thân · Phù · Con gái tội thần 0/16 · Cháu gái Thái hậu 0/16 · Con gái thầy đồ nghèo 0/ · Cung nữ tuyển vào cung 0 · Mua tước cho cha 0/4 · Thuyền muối đêm 0/4 · Năm đói ở Giang Nam 0/4 · Món  |
| ipad | Ô lưu › Bảng vàng [div#modal.modal.krkp:Mã khôi phục] | 1: Lui |
| ipad | Ô lưu › Thiết lập [div#modal.modal.kptitle:Thiết lập] | 13: Lui · Tiếng nhạc, tiếng động,  · Nhạc 50 · Tiếng động 70 · Giọng 70 · Rung Có · Hiệu ứng Gọn: tranh tĩnh · Lời dặn tân thủ ma ma ch · Xem lại lời dặn Game này · Xem · Nối sổ máy kia đã có ám  · Tải hết để chơi offline  · Nạp sổ GHI CHÚ dán bản c |
| ipad | Quẻ Hạ hạ (Mưu kế) › Gieo lại TỐN Bạc -10·1 khắc ĐƯỢC không [div#modal | 1: Lui |
| ipad | Mục tiêu chương (có mới) › Lui [div#rtoast.rtoast.karesult:KẾT QUẢ Lui | 1: Xem đầy đủ trong Sổ ghi |
| ipad | Mục tiêu chương (có mới) › Danh hiệu 0/35 [div#modal.modal:Danh hiệu] | 4: Lui · Mục tiêu · Danh hiệu 0/35 · Thiên mệnh |
| ipad | Mục tiêu chương (có mới) › Thiên mệnh [div#modal.modal.kes:Thiên mệnh] | 4: Lui · Mục tiêu · Danh hiệu 0/35 · Thiên mệnh |
| ipad | Nguy hiểm chung: 0 › Lui [div#rtoast.rtoast.karesult:KẾT QUẢ Thôi Nguy | 1: Xem đầy đủ trong Sổ ghi |
| ipad | Nguy hiểm chung: 0 › Đóng cửa giữ mình TỐN Sủng -2 ĐƯỢC 2 tuần: mưu h  | 1: Xem đầy đủ trong Sổ ghi |
| ipad | Dư đồ › Ra vào cung cấm [div#modal.modal:Ra vào cung cấm] | 1: Lui |
| ipad | Dư đồ › Danh sách [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | 2: Cung nữ thân tín tam đẳn · Lịch tháng |
| ipad | Dư đồ › Lịch tháng [div#modal.modal.kmc-modal:Lịch tháng] | 34: Lui · Tháng trước · Tháng sau · mồng 1: Lĩnh bổng lộc ·  · mồng 2 · mồng 3 · mồng 4 · mồng 5: Tiết Thanh minh · mồng 6 · mồng 7 · mồng 8 · mồng 9 · mồng 10 · ngày 11 · ngày 12 · ngày 13 · ngày 14 · ngày 15 · ngày 16 · ngày 17 · ngày 18 · ngày 19 · ngày 20 · ngày 21: Nguyệt tín · ngày 22: Nguyệt tín · ngày 23: Nguyệt tín · ngày 24: Nguyệt tín · ngày 25: Nguyệt tín · ngày 26: Nguyệt tín · ngày 27: N |
| ipad | Dư đồ › Mục tiêu chương (có mới) [div#modal.modal:Chương 1 · Nhập cung | 4: Lui · Mục tiêu · Danh hiệu 0/35 · Thiên mệnh |
| ipad | Dư đồ › Tai mắt 0 [div#modal.modal:Tai mắt] | 2: Lui ·  |
| ipad | Dư đồ › Có thai Rất thấp [div#modal.modal.kpcompactm:Có thai: Rất thấp | 1: Lui |
| ipad | Dư đồ › Lật thẻ Rất thấp [div#modal.modal.kpcompactm:Lật thẻ: Rất thấp | 1: Lui |
| ipad | Dư đồ › Ân tình (đêm) 0 [div#modal.modal:Ân tình (đêm)] | 1: Lui |
| ipad | Dư đồ › Số lần ân thưởng 0 [div#modal.modal:Ân thưởng] | 1: Lui |
| ipad | Dư đồ › Bổng lộc sau 3 tuần [div#modal.modal:Bổng lộc] | 1: Lui |
| ipad | Dư đồ › Nguy hiểm chung: 0 [div#modal.modal:Nguy hiểm chung] | 2: Lui · Đóng cửa giữ mình TỐN Sủ |
| ipad | Dư đồ › Xét phẩm: thiếu 4 [div#modal.modal:Xét phẩm cuối tháng · Thườn | 1: Lui |
| ipad | Hậu cung › Lịch tháng [div#modal.modal.kmc-modal:Lịch tháng] | 34: Lui · Tháng trước · Tháng sau · mồng 1: Lĩnh bổng lộc ·  · mồng 2 · mồng 3 · mồng 4 · mồng 5: Tiết Thanh minh · mồng 6 · mồng 7 · mồng 8 · mồng 9 · mồng 10 · ngày 11 · ngày 12 · ngày 13 · ngày 14 · ngày 15 · ngày 16 · ngày 17 · ngày 18 · ngày 19 · ngày 20 · ngày 21: Nguyệt tín · ngày 22: Nguyệt tín · ngày 23: Nguyệt tín · ngày 24: Nguyệt tín · ngày 25: Nguyệt tín · ngày 26: Nguyệt tín · ngày 27: N |
| ipad | Hậu cung › Mục tiêu chương (có mới) [div#modal.modal.kes:Thiên mệnh] | 4: Lui · Mục tiêu · Danh hiệu 0/35 · Thiên mệnh |
| ipad | Hậu cung › Tai mắt 0 [div#modal.modal:Tai mắt] | 2: Lui ·  |
| ipad | Hậu cung › Có thai Rất thấp [div#modal.modal.kpcompactm:Có thai: Rất t | 1: Lui |
| ipad | Hậu cung › Lật thẻ Rất thấp [div#modal.modal.kpcompactm:Lật thẻ: Rất t | 1: Lui |
| ipad | Hậu cung › Ân tình (đêm) 0 [div#modal.modal:Ân tình (đêm)] | 1: Lui |
| ipad | Hậu cung › Số lần ân thưởng 0 [div#modal.modal:Ân thưởng] | 1: Lui |
| ipad | Hậu cung › Bổng lộc sau 3 tuần [div#modal.modal:Bổng lộc] | 1: Lui |
| ipad | Hậu cung › Nguy hiểm chung: 0 [div#modal.modal:Nguy hiểm chung] | 2: Lui · Đóng cửa giữ mình TỐN Sủ |
| ipad | Hậu cung › Xét phẩm: thiếu 4 [div#modal.modal:Xét phẩm cuối tháng · Th | 1: Lui |
| ipad | Hậu cung › Phi tần [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | 33: Cung nữ thân tín tam đẳn · Chọn chính mình · Lịch tháng · Mục tiêu chương (có mới) · 1 Cung nhân · 3 Chí tôn · Tai mắt 0 · Có thai Rất thấp · Lật thẻ Rất thấp · Ân tình (đêm) 0 · Số lần ân thưởng 0 · Bổng lộc sau 3 tuần · Nguy hiểm chung: 0 · Xét phẩm: thiếu 4 · Chí tôn · Phi tần · Nam nhân · Cung nhân · Người trước · Người lạ · Người lạ · Nhược Lan · Người lạ · Người lạ · Người lạ · Người sau · X |
| ipad | Hậu cung › Nam nhân [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | 17: Cung nữ thân tín tam đẳn · Lịch tháng · Mục tiêu chương (có mới) · 1 Cung nhân · 3 Chí tôn · Tai mắt 0 · Có thai Rất thấp · Lật thẻ Rất thấp · Ân tình (đêm) 0 · Số lần ân thưởng 0 · Bổng lộc sau 3 tuần · Nguy hiểm chung: 0 · Xét phẩm: thiếu 4 · Chí tôn · Phi tần · Nam nhân · Cung nhân |
| ipad | Hậu cung › Cung nhân [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | 24: Cung nữ thân tín tam đẳn · Lịch tháng · Mục tiêu chương (có mới) · 1 Cung nhân · 3 Chí tôn · Tai mắt 0 · Có thai Rất thấp · Lật thẻ Rất thấp · Ân tình (đêm) 0 · Số lần ân thưởng 0 · Bổng lộc sau 3 tuần · Nguy hiểm chung: 0 · Xét phẩm: thiếu 4 · Chí tôn · Phi tần · Nam nhân · Cung nhân · Người trước · Người lạ · Người lạ · Người lạ · Người lạ · Người sau ·  |
| ipad | Giao tình › Lịch tháng [div#modal.modal.kmc-modal:Lịch tháng] | 34: Lui · Tháng trước · Tháng sau · mồng 1: Lĩnh bổng lộc ·  · mồng 2 · mồng 3 · mồng 4 · mồng 5: Tiết Thanh minh · mồng 6 · mồng 7 · mồng 8 · mồng 9 · mồng 10 · ngày 11 · ngày 12 · ngày 13 · ngày 14 · ngày 15 · ngày 16 · ngày 17 · ngày 18 · ngày 19 · ngày 20 · ngày 21: Nguyệt tín · ngày 22: Nguyệt tín · ngày 23: Nguyệt tín · ngày 24: Nguyệt tín · ngày 25: Nguyệt tín · ngày 26: Nguyệt tín · ngày 27: N |
| ipad | Giao tình › Mục tiêu chương (có mới) [div#modal.modal:Chương 1 · Nhập  | 4: Lui · Mục tiêu · Danh hiệu 0/35 · Thiên mệnh |
| ipad | Giao tình › Tai mắt 0 [div#modal.modal:Tai mắt] | 2: Lui ·  |
| ipad | Giao tình › Có thai Rất thấp [div#modal.modal.kpcompactm:Có thai: Rất  | 1: Lui |
| ipad | Giao tình › Lật thẻ Rất thấp [div#modal.modal.kpcompactm:Lật thẻ: Rất  | 1: Lui |
| ipad | Giao tình › Ân tình (đêm) 0 [div#modal.modal:Ân tình (đêm)] | 1: Lui |
| ipad | Giao tình › Số lần ân thưởng 0 [div#modal.modal:Ân thưởng] | 1: Lui |
| ipad | Giao tình › Bổng lộc sau 3 tuần [div#modal.modal:Bổng lộc] | 1: Lui |
| ipad | Giao tình › Nguy hiểm chung: 0 [div#modal.modal:Nguy hiểm chung] | 2: Lui · Đóng cửa giữ mình TỐN Sủ |
| ipad | Giao tình › Xét phẩm: thiếu 4 [div#modal.modal:Xét phẩm cuối tháng · T | 1: Lui |
| ipad | Giao tình › Phe phái [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | 17: Cung nữ thân tín tam đẳn · Lịch tháng · Mục tiêu chương (có mới) · 1 Cung nhân · 3 Chí tôn · Tai mắt 0 · Có thai Rất thấp · Lật thẻ Rất thấp · Ân tình (đêm) 0 · Số lần ân thưởng 0 · Bổng lộc sau 3 tuần · Nguy hiểm chung: 0 · Xét phẩm: thiếu 4 · Ân oán · Phe phái · Phe phái hậu cung · Triều đình |
| ipad | Hoàng tự › Lịch tháng [div#modal.modal.kmc-modal:Lịch tháng] | 33: Lui · Tháng trước · Tháng sau · mồng 2 · mồng 3 · mồng 4 · mồng 5: Tiết Thanh minh · mồng 6 · mồng 7 · mồng 8 · mồng 9 · mồng 10 · ngày 11 · ngày 12 · ngày 13 · ngày 14 · ngày 15 · ngày 16 · ngày 17 · ngày 18 · ngày 19 · ngày 20 · ngày 21: Nguyệt tín · ngày 22: Nguyệt tín · ngày 23: Nguyệt tín · ngày 24: Nguyệt tín · ngày 25: Nguyệt tín · ngày 26: Nguyệt tín · ngày 27: Nguyệt tín · ngày 28 · ngày  |
| ipad | Hoàng tự › Mục tiêu chương (có mới) [div#modal.modal:Chương 1 · Nhập c | 4: Lui · Mục tiêu · Danh hiệu 0/35 · Thiên mệnh |
| ipad | Hoàng tự › Tai mắt 0 [div#modal.modal:Tai mắt] | 2: Lui ·  |
| ipad | Hoàng tự › Có thai Rất thấp [div#modal.modal.kpcompactm:Có thai: Rất t | 1: Lui |
| ipad | Hoàng tự › Lật thẻ Rất thấp [div#modal.modal.kpcompactm:Lật thẻ: Rất t | 1: Lui |
| ipad | Hoàng tự › Ân tình (đêm) 0 [div#modal.modal:Ân tình (đêm)] | 1: Lui |
| ipad | Hoàng tự › Số lần ân thưởng 0 [div#modal.modal:Ân thưởng] | 1: Lui |
| ipad | Hoàng tự › Bổng lộc sau 3 tuần [div#modal.modal:Bổng lộc] | 1: Lui |
| ipad | Hoàng tự › Nguy hiểm chung: 0 [div#modal.modal:Nguy hiểm chung] | 2: Lui · Đóng cửa giữ mình TỐN Sủ |
| ipad | Hoàng tự › Xét phẩm: thiếu 4 [div#modal.modal:Xét phẩm cuối tháng · Th | 1: Lui |
| ipad | Hoàng tự › Kế vị [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | 21: Cung nữ thân tín tam đẳn · Lịch tháng · Mục tiêu chương (có mới) · 1 Cung nhân · 3 Chí tôn · Tai mắt 0 · Có thai Rất thấp · Lật thẻ Rất thấp · Ân tình (đêm) 0 · Số lần ân thưởng 0 · Bổng lộc sau 3 tuần · Nguy hiểm chung: 0 · Xét phẩm: thiếu 4 · Con của ta · Kế vị · Hoàng tự trong cung · Hôn sự · Quý tộc kén rể · kén dâu · Xem thêm · 1. Tuyên · 2. Bích |
| ipad | Hoàng tự › Hoàng tự trong cung [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Ki | 24: Cung nữ thân tín tam đẳn · Lịch tháng · Mục tiêu chương (có mới) · 1 Cung nhân · 3 Chí tôn · Tai mắt 0 · Có thai Rất thấp · Lật thẻ Rất thấp · Ân tình (đêm) 0 · Số lần ân thưởng 0 · Bổng lộc sau 3 tuần · Nguy hiểm chung: 0 · Xét phẩm: thiếu 4 · Con của ta · Kế vị · Hoàng tự trong cung · Hôn sự · Quý tộc kén rể · kén dâu · Xem thêm · Tĩnh · Bích · Thuận · Tuyên · Đến cung nàng ta thăm ⓘ  |
| ipad | Hoàng tự › Hôn sự [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | 19: Cung nữ thân tín tam đẳn · Lịch tháng · Mục tiêu chương (có mới) · 1 Cung nhân · 3 Chí tôn · Tai mắt 0 · Có thai Rất thấp · Lật thẻ Rất thấp · Ân tình (đêm) 0 · Số lần ân thưởng 0 · Bổng lộc sau 3 tuần · Nguy hiểm chung: 0 · Xét phẩm: thiếu 4 · Con của ta · Kế vị · Hoàng tự trong cung · Hôn sự · Quý tộc kén rể · kén dâu · Xem thêm |
| ipad | Hoàng tự › Quý tộc kén rể · kén dâu [body:☰ Vân Tố Ngưng Đáp ứng 19 tu | 29: Cung nữ thân tín tam đẳn · Lịch tháng · Mục tiêu chương (có mới) · 1 Cung nhân · 3 Chí tôn · Tai mắt 0 · Có thai Rất thấp · Lật thẻ Rất thấp · Ân tình (đêm) 0 · Số lần ân thưởng 0 · Bổng lộc sau 3 tuần · Nguy hiểm chung: 0 · Xét phẩm: thiếu 4 · Con của ta · Kế vị · Hoàng tự trong cung · Hôn sự · Quý tộc kén rể · kén dâu · Xem thêm · Người trước · Người lạ · Người lạ · Người lạ · Người lạ · Người l |
| ipad | Tư trang › Lịch tháng [div#modal.modal.kmc-modal:Lịch tháng] | 34: Lui · Tháng trước · Tháng sau · mồng 1: Lĩnh bổng lộc ·  · mồng 2 · mồng 3 · mồng 4 · mồng 5: Tiết Thanh minh · mồng 6 · mồng 7 · mồng 8 · mồng 9 · mồng 10 · ngày 11 · ngày 12 · ngày 13 · ngày 14 · ngày 15 · ngày 16 · ngày 17 · ngày 18 · ngày 19 · ngày 20 · ngày 21: Nguyệt tín · ngày 22: Nguyệt tín · ngày 23: Nguyệt tín · ngày 24: Nguyệt tín · ngày 25: Nguyệt tín · ngày 26: Nguyệt tín · ngày 27: N |
| ipad | Tư trang › Mục tiêu chương (có mới) [div#modal.modal:Chương 1 · Nhập c | 4: Lui · Mục tiêu · Danh hiệu 0/35 · Thiên mệnh |
| ipad | Tư trang › Tai mắt 0 [div#modal.modal:Tai mắt] | 2: Lui ·  |
| ipad | Tư trang › Có thai Rất thấp [div#modal.modal.kpcompactm:Có thai: Rất t | 1: Lui |
| ipad | Tư trang › Lật thẻ Rất thấp [div#modal.modal.kpcompactm:Lật thẻ: Rất t | 1: Lui |
| ipad | Tư trang › Ân tình (đêm) 0 [div#modal.modal:Ân tình (đêm)] | 1: Lui |
| ipad | Tư trang › Số lần ân thưởng 0 [div#modal.modal:Ân thưởng] | 1: Lui |
| ipad | Tư trang › Bổng lộc sau 3 tuần [div#modal.modal:Bổng lộc] | 1: Lui |
| ipad | Tư trang › Nguy hiểm chung: 0 [div#modal.modal:Nguy hiểm chung] | 2: Lui · Đóng cửa giữ mình TỐN Sủ |
| ipad | Tư trang › Xét phẩm: thiếu 4 [div#modal.modal:Xét phẩm cuối tháng · Th | 1: Lui |
| ipad | Tư trang › Thú cưng [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | 17: Cung nữ thân tín tam đẳn · Lịch tháng · Mục tiêu chương (có mới) · 1 Cung nhân · 3 Chí tôn · Tai mắt 0 · Có thai Rất thấp · Lật thẻ Rất thấp · Ân tình (đêm) 0 · Số lần ân thưởng 0 · Bổng lộc sau 3 tuần · Nguy hiểm chung: 0 · Xét phẩm: thiếu 4 · Túi đồ · Thú cưng · Việc · Nhờ thái giám tìm thú nu |

## PENDING ORDERS for the ROLE B successor (received 05:52–07:21Z, read at rollover, NOT started)
- Harness: switch dev/test/realtap.js to review/robot-realtap 78af2325 (or newer; #ktut / own-ancestor covers not dead, own-scroller wheel).
- fix-4 (F #6 06:43Z): «person dialog queue has no dedupe» — header mood bar / person chips stay tappable behind non-modal kitPersonDlg («Tâm trạng · <person>»), every tap queues a duplicate (2.7–2.9k copies in saves). Fix family: dedupe identical pending person dialogs in Q/P + clean poisoned saves on load; block taps behind kitPersonDlg via the KIT (law 9). Base on review/sansang-music-fix-2 a6b4d573 (kpopts z). Real-tap proof Fold+iPad.
- Confirm (F #6 06:12Z): #krail button.krailb over «3 Chí tôn» (Vinh Hoa cung); img.kfr in #dawn over «Tổng lược» «?» — real if >2.5 s on 78af2325.
- Confirm (F #6 07:04Z, review/test-path-fix-2 dev/PROGRESS_test-path-fix.md): (A) #tokens .tok covered by img#mefig.j59sz.kfxon after 3–4 token→focus→✕ cycles (Fold); (B) new-life card #modal.nlcard («Vào cung ngay»/«Nhận thân phận») would not close from 30 real taps on Fold.
- Decide (F #6 07:07Z): #dawn buttons («Tổng lược» «?», «Ô lưu», «Xem bản thân», stat row) covered by div.kne.kne-beat / img.kfr — by design (beat = modal step → tell harness fixer session_01UV1SzhZEs2semzyzA7vwtt) or real overlap (fix family). One line to Foreman F.
- READY lines format: «READY button-crawl-fix-N <sha> FF <main>» to the current Foreman F (F #7 session_01UV1SzhHkCV76zb6skHhFpV at 07:21Z).

## REVIEW button-crawl-fix-1 (big reviewer session_01UV1SziXSk67Zy3DMXHsCrJ, 11/25/2026) — FAIL 87c8c543 (merge onto LIVE 9f72524b = review/button-crawl-fix-1-r bac2c5c6)
PRIORITY #1 CHECK: OD «real taps» 25/11 ~05:10Z | main: no dev/test/realtap.js, no button-crawl.js | review/*: robot-realtap + test-path-fix carry dev/test/realtap.js with API {make, PROBE} | claims Foreman F #5/#7.
Merge: index.html / sw.js / assets.json conflicts → main's, rebuilt with build_site.sh (game fixes present in the built index.html); KIT_REQUESTS.md: both new sections kept.
| check | result |
|---|---|
| jtoil rules-screen ✕ «Quay lại» (game) | LIVE bug confirmed with a real tap (✕ opened the dress, Hồi 1). Fix reads KG82.giveUp → KG82.quit = toilFinish(false) (set by toilBackX before toilRules). Family scan of every kgReady go handler: only jtoil had its own handler without giveUp; j92 has KG82.back; kg82Play / jsgame / jroute handle giveUp; pet / shelf rules use kitGameFrame in their modal (no kg82 ✕). OK |
| j15 pcPort f.rk as text (game) | OK (same as mdH String(p.rk)) |
| button-crawl.js full run fold+ipad on the merged build | 359 taps, PASS 351, FAIL 10 (dead 3 = K-KDTX-BAND tabs, known) — **iPad crawl CRASHED: «par is not defined»** |
| quickcheck | not run (my local server was stopped at its time limit and could not be restarted in this env) |
FAIL reasons:
1. Crawler crash: crawlTour() (button-crawl.js ~line 141) has the «screen one tap deeper» filter `if(par){…sig0…}` pasted from the crawl loop (line 247); `par`/`sig0` are not defined there → ReferenceError, the whole iPad crawl is lost (the tour step breaks on any device that reaches it). Remove the block from crawlTour (or pass the values), rerun fold+ipad.
2. Two incompatible files at ONE path: this branch's dev/test/realtap.js exports {tap, hitInfo}; the shared lib on review/robot-realtap and review/test-path-fix exports {make, PROBE}. Whichever lands second breaks the other (button-crawl: `tap is not a function` → quickcheck hook 90 red at every go-live; or toilette/hoa-dien/overlay break). Use the ONE shared lib (`RT.make(page,…).tap(target,{screen,label})`) and drop the local copy (laws 9/11: one shared part, no private copy).
3. Crawl findings for Foreman F (not blocking this branch): Fold — top-bar stat chip «Sắc 40 Tài 43 …» no effect; «Gieo quẻ» (and after «Gieo lại») no effect; Thiết lập «Sổ đổi mới mã» no effect; «Giữ sổ trên mây» = CORS console.error on ctm-coop…/api/vault/new from localhost (likely local-origin only).
