# ROSTER AUDIT (j95 + j95b + j95c, nhánh review/schedules2) — SẠCH

Bản cuối 2026-11-14. Bản dựng = `review/schedules2` gồm: `origin/review/balance` 9e869f0 (v9b: accCdT 36, hz 3.2, birthAdd 4, illDie 2; đã gồm
wip/balance-fix1 9039cd5 và ce8979c: jpal không viết lại palaceOf) + j95, j95b, j95c (sau j84). 4 buổi thật (jtime4). Bot chơi: `dev/measure/inpage6.js` + `inbal.js`.
Kết luận: **cả hai bộ kiểm sạch** — 0 lỗi ở mọi bất biến; 6 lỗi chính và 5 lỗi nhỏ của kiểm độc lập (ROSTER_AUDIT_INDEPENDENT.md) đã sửa và được kiểm lại.

Số bot trong bảng 1 và 2 đo trên 4ec9548 (merge balance 9e869f0 + j95c rosterWhere). Bản đẩy cuối chỉ đổi thêm 2 câu chữ trong j95.js (bỏ "có thể": "tin cũ, lần cuối N tuần
trước", "phải đề phòng nàng diệt khẩu"), không đổi logic; mục 3–5 chạy trên bản cuối ấy.

Lệnh chạy lại:
```
python3 dev/build/assemble.py
(printf '<meta charset=utf-8>'; cat dev/index.html) > <dir>/t.html; ln -s $PWD/img <dir>/img; (cd <dir> && python3 -m http.server 8975)
U=http://127.0.0.1:8975/t.html
for x in "sens 0" "sens 4" "rand 0" "rand 4"; do set -- $x; CAP=6600 node dev/test/roster_audit.js $1 9 aud-$1-$2.json $2 & done
for x in "sens 0 11" "sens 5 11" "rand 2 9" "rand 7 9"; do set -- $x; CAP=6600 node dev/test/indep/ia_bot.js $1 $3 ia-$1-$2.json $2 $U & done; wait
for s in 755x1000@2 1180x820@2; do node dev/test/indep/ia_dom.js $U out-$s-a $s 40; node dev/test/indep/ia_dom.js $U out-$s-b $s 40; node dev/test/roster_dom.js $U rd-$s $s; done
node dev/test/indep/ia_scen.js $U scen.json; node dev/test/indep/ia_start_stale.js $U; node dev/test/indep/ia_home_visit.js $U
node dev/test/indep/ia_rostertool.js $U $PWD rt cn 9; node dev/test/roster_sim.js 50 4
```

## 1. Bộ kiểm của thợ (dev/test/roster_audit.js + roster_audit_c.js), bot thật 2 năm

| | đời | đủ 2 năm | lần kiểm |
|---|---|---|---|
| bot khôn (2 shard) | 18 | 18 | 19 943 |
| bot ngẫu nhiên (2 shard) | 18 | 2 (chơi bừa chết sớm) | 6 032 |
| **tổng** | **36** | | **25 975** (16 660 khắc, 6 894 buổi) |

Xuất thân: đủ 9 loại, mỗi loại 4 đời (tt, dtq, muoi, cn, nc, td, ch, thd, cnv).

| bất biến | lỗi |
|---|---|
| (a) số người trong sổ = số người sống trong cung (đếm độc lập) | **0** |
| (b) mỗi người đúng một nơi mỗi khắc | **0** |
| (c) bản đồ (countAt), S.where/whereOf, S.menW, sân khấu, tai mắt "nơi ở" = sổ | **0** |
| (d) cổng động cơ: mọi hành động NPC nhắm vào người khác qua cổng; không hại khi thiện cảm ≥40 mà thiếu ngoại lệ có ghi | **0** (2 228 hành động, 39 bị chặn) |
| (e) người chết / bị xử khỏi sổ; phế phi ở lãnh cung | **0** |
| (f) save → nạp giữ nguyên sổ | **0** (356 lần) |
| (g) sự kiện có diễn viên đều có lý do qua cổng | **0** (1 897 thẻ, 1 800 diễn viên, 300 vai thù địch; 1 082 lượt người tìm đến) |
| (h) câu chữ đặt ai ở đâu = sổ ở khắc đó | **0** (1 642 lần kiểm nơi, 76 lần sổ ghi lý do không dời) |
| (i) hiểu lầm do tin đồn ghi đủ nguồn, chỉ báo như lời đồn | **0** (706 lần kiểm) |
| (j) giá họa qua cổng và có dòng trong sổ (lỗi độc lập 1) | **0** (28 lần giá họa chạy, 28 có dòng cổng) |
| (k) đổi cung: sổ theo cung hiện tại, ≤3 người thiên điện, không ai ở cung của người đã dời (lỗi 2) | **0** (564 lần xếp lại cung giữa buổi) |
| (l) người theo hầu ở đúng chỗ chủ, phận sự ở cung chủ (lỗi 3) | **0** (397 739 dòng theo hầu) |
| (m) không ghi lùi khắc đã hiện, không viết lại R.m (lỗi 4) | **0** (1 504 việc lúc chuyển buổi; 1 442 vào đầu buổi mới) |
| (n) sân khấu lãnh cung = sổ, không người bịa; sau nạp sân khấu đủ người (lỗi 5, 6, nhỏ 7) | **0** (1 056 lần ở lãnh cung, 582 lần nạp) |
| (o) tên kẻ hầu không trùng, nạp không sinh kẻ hầu (nhỏ 8, 11) | **0** |
| (p) người chết rời sổ ngay sau deathSentence (nhỏ 10) | **0** |
| (q) j95habitsMine: chỉ báo kẻ rình đã được tai mắt báo | **0** |
| lỗi trang / J95.errs / J95B.errs / J95C.errs | **0 / 0 / 0 / 0** |

## 2. Bộ kiểm độc lập (dev/test/indep/, của người kiểm độc lập), bot inpage6

| | đời | kết thúc |
|---|---|---|
| bot khôn (2 shard × 11) | 22 | đa số đủ 2 năm |
| bot ngẫu nhiên (2 shard × 9) | 18 | đa số chết sớm |
| **tổng** | **40** (23 đủ 2 năm, 17 chết) | đủ 9 xuất thân |

**33 026 lần kiểm, 3 254 lần lưu/nạp (1 815 giữa thẻ, 589 giữa minigame): A, B, C, D, E, F, G, H, P, S = 0.** Lỗi trang 0, J95.errs 0.
H: 2 663 hành động thù địch đã chạy, 8 lần thiện cảm ≥40, cả 8 có lý do ngoại lệ tìm độc lập. P: 1 879 việc lúc chuyển buổi, 0 trái mắt thấy.

## 3. Màn hình thật (Playwright)

| script | cỡ | thời điểm | lệch bản đồ | lệch sân khấu | tải lại trang | lệch sau tải lại | tràn ngang | lỗi trang |
|---|---|---|---|---|---|---|---|---|
| ia_dom (2 lượt) | 755x1000@2 | 80 | 0 | 0 | 11 | 0 | 0 | 0 |
| ia_dom (2 lượt) | 1180x820@2 | 80 | 0 | 0 | 12 | 0 | 0 | 0 |
| roster_dom | 755x1000@2 | 20 | 0 | 0 | | | 0 | 0 |
| roster_dom | 1180x820@2 | 20 | 0 | 0 | | | 0 | 0 |

## 4. Tình huống, công cụ

- `ia_scen.js` (10 tình huống): người chết khỏi sổ ngay; chủ cung bị phế giữa buổi → người thiên điện sang cung mới, sổ theo; ngươi vào lãnh cung → cung nữ thân tín
  và kẻ hầu hầu ở lãnh cung, tải lại vẫn ở lãnh cung; sân khấu lãnh cung không có người bịa (vắng thì trống); phong Hoàng hậu giữa buổi; tải lại giữa minigame và giữa
  sự kiện: sổ và thẻ giữ nguyên; giá họa của người thiện cảm 80 bị cổng chặn, có dòng sổ, không chạy. Mọi __IA.check: 0. Lỗi trang 0.
- `ia_start_stale.js`: 36 đời mới, 0 người ghi sai cung, 0 dòng ở mã không có ô bản đồ.
- `ia_home_visit.js`: 4/4 khách ở cung ngươi còn trên sân khấu sau khi lưu + tải lại trang.
- `ia_rostertool.js`: mã "Chép sổ" thật (38 389 ký tự) qua `dev/tools/roster.js`: 40/40 dòng hiện tại khớp, 32 khắc đã qua khớp, 0 lệch.
- `roster_sim.js 50 4`: 2 400 + 3 200 lần kiểm (3 và 4 buổi): 0 trùng / thiếu / lệch số / lệch bản đồ / lệch view / người chết.
  Độ khó đoán phi tần 41% (3 buổi) / 41% (4 buổi), xúc xắc cũ 61% / 68% (mục tiêu 35–55%); Hoàng thượng 57% / 54%.

## 5. Đã sửa trong vòng này (sau kiểm độc lập)

Lỗi chính 1–6 và nhỏ 7–11 của ROSTER_AUDIT_INDEPENDENT.md: xem PROGRESS_schedules.md (j95c). Thêm, do hai bộ kiểm tìm ra trên bản gộp mới:
1. Câu "(Chứng cứ X +1.) Tai mắt kể: Y …" bị đọc là một câu nên X bị dời tới nơi của Y → tách câu cả sau dấu chấm trong ngoặc.
2. "X được tha khỏi lãnh cung" đặt X vào lãnh cung → nơi đang rời (khỏi / rời / từ) không đặt ai vào đó.
3. Chữ "định" (ý định) không chặn được câu tương lai vì `\b` không bắt trước chữ có dấu → sửa biểu thức (game và bộ kiểm).
4. Hai việc lúc chuyển buổi của cùng một người (tin tuần rồi báo cáo tháng) cho hai nơi ở cùng khắc → việc sau không kể; thẻ tin sắp hiện mà trái điều đã báo thì bỏ câu ấy.
5. Nạp ván dựng lại thẻ đang chờ bằng mkP, j95b xét cổng lại → thẻ có thể mất hoặc đổi người → khi nạp, thẻ trở lại y như lúc lập.
6. Đổi phẩm giữa tuần (lựa chọn trong thẻ) chỉ xếp lại cung lúc nạp → chữ ký của j95c có cả phẩm, xếp lại cung ngay.
7. j96 (truyện tình) hỏi `rosterWhere(m)` mà j95 không có, nên tự ghi S.menW ngoài sổ → sổ trả lời; người chưa có trong buổi thì vào sổ ở chỗ quen đầu tiên.

Sửa bộ kiểm (không đổi luật): kiểm độc lập nhận người trên sân khấu theo `data-p` (sân khấu j59 không có nhãn tên trong thẻ người, người lạ j61 là "???"),
không lưu/nạp giữa `goTo` (goTo tiêu khắc đi đường trước khi đặt S.place; game không lưu lúc đó), Tân Giả khố `tgk` (j42) là nơi thật; (h) của thợ dùng cùng luật câu.

## 6. Ghi chú (ngoài sổ)

- `qLost` của kiểm độc lập (387 thẻ qua 3 254 lần lưu giữa thẻ): là các thẻ lựa chọn không có `pid` (hàm trong lựa chọn không lưu được). Game vẫn như thế từ trước j95:
  `serQ` bỏ những thẻ này. Thẻ có `pid` (sự kiện j68, truyện, việc nhờ…) giữ đủ: đo riêng 600 lần lưu/nạp giữa thẻ, 387 thẻ pid, mất 0, đổi người 0. Việc này thuộc phần lưu ván chung, không thuộc sổ.
- Bot ngẫu nhiên chết sớm (chơi bừa), như các lần đo trước.

## 7. Sau kiểm độc lập lần hai (ROSTER_RECHECK.md, 37d87a8): lỗi N1 đã sửa

N1: nam nhân không ở cung (vương gia, nhạc sư, họa sư, sứ thần, người tình j96) vào sổ giữa buổi (`rosterWhere` của j96, `j95bPut` theo câu chữ)
được ghi cả vào các khắc đã hiện. Sửa: chỉ ghi từ khắc hiện tại; các khắc trước mang mã `ngoai` ("Ngoài cung", việc "ở ngoài cung"), mã này không
có trên bản đồ, không lên sân khấu, roster.js in "Ngoài cung (chưa vào)". Thêm bất biến (r) vào roster_audit_c.js: một dòng mới giữa buổi không bao
giờ được đặt, ở khắc đã hiện, vào chỗ ngươi đứng.

Kiểm lại trên e39e28a (bản có N1):
- `rc_adv.js` (bộ tình huống của người kiểm lần hai): **0 lỗi**, lỗi trang 0. Đã sửa ba chỗ bắt nhầm của script (ghi rõ trong mã): mã `ngoai` không phải nơi ngươi
  thấy được; `deathSentence` tha vào lãnh cung 30% khi Hoàng thượng "nhân từ" (j8), nên chỉ người đã chết mới phải rời sổ; việc thân thiện (ally / gift /
  tieuhuy "trả chứng cứ lấy lòng") không tính là hại, như H của ia_hook; tên người ("Bạch Tố Tâm") không làm việc thành "tố".
- Bộ của thợ, ngắn: 12 đời (6 khôn, 6 ngẫu nhiên), 8 618 lần kiểm, (a)–(r) = 0 (13 dòng mới giữa buổi, 3 lần j96 hỏi rosterWhere).
- Bộ độc lập, ngắn: 12 đời (6 khôn, 6 ngẫu nhiên), 10 418 lần kiểm, 880 lưu/nạp, A–H, P, S = 0.
- `ia_scen` 5/5 lần __IA.check sạch; `ia_rostertool`: 38/38 dòng hiện tại, 32 khắc đã qua khớp.
- j70: câu "(vì vì lợi riêng)" thành "(vì lợi riêng)".

## 8. Thẻ đang chờ khi lưu / nạp (jqsave.js, lỗi cũ có từ trước j95)

`serQ` (j3) chỉ lưu thẻ có `pid` và thẻ báo tin; thẻ lựa chọn không có `pid` bị bỏ khi lưu. Đo trong bot: 343 thẻ lựa chọn không pid, 39 thẻ chỉ có dữ liệu,
304 thẻ có mã chạy (`opt.go`: người tìm đến, ngày lễ, nghe đồn, bắt gặp…) không thể ghi thành dữ liệu. Sửa bằng module mới `dev/build/jqsave.js` (nối sau j95c;
chỉ bọc serQ, deserQ, save, render):
1. Thẻ chỉ có dữ liệu được lưu nguyên vẹn (`$full`) và trở lại như cũ khi nạp.
2. Khi đang chờ một thẻ có mã, lần tự lưu bị hoãn: ô lưu giữ lúc gần nhất không có thẻ như thế; trả lời xong thẻ thì lưu ngay. Tải lại trang
   vì thế rơi vào trước hoặc sau thẻ, không bao giờ vào giữa một thẻ đã mất nửa.
3. Save cũ nạp như trước (mục không có `$full` đi đường cũ).

`dev/test/save_stress.js` (đường lưu thật: save → localStorage → deser, 6% bước bot, cả giữa thẻ và giữa minigame):
| | đời | lần lưu | ghi | hoãn | thẻ giữ lại | mất | sai thứ tự | ô lưu đổi khi hoãn | nạp lệch khóa/khắc/nơi | lỗi trang |
|---|---|---|---|---|---|---|---|---|---|---|
| bot khôn | 9 | 748 | 717 | 31 | 198 | **0** | **0** | **0** | **0** | 0 |
| bot ngẫu nhiên | 9 | 243 | 237 | 6 | 48 | **0** | **0** | **0** | **0** | 0 |
| bot trộn | 9 | 521 | 508 | 13 | 127 | **0** | **0** | **0** | **0** | 0 |
| so sánh: tắt jqsave (`JQOFF=1`), bot khôn | 3 | 270 | 258 | (12) | 69 | **1** | 0 | **12** lần ghi một thẻ dở | 0 | 0 |

Trong trang thật (không bot): thẻ có mã đang chờ → `render` không đổi ô lưu; chọn xong → ô lưu ghi trạng thái sau thẻ; thẻ chỉ dữ liệu lưu rồi nạp lại đủ.
Bộ kiểm sau sửa: của thợ 4 đời khôn + 4 ngẫu nhiên, 8 418 lần kiểm, (a)–(r) = 0; độc lập 4 đời khôn, 4 264 lần kiểm, 420 lưu/nạp, 0 lỗi.
(Bất biến (r) chỉ xét các khắc trước lần kiểm trước đó: dòng mới thêm ở khắc k thì khắc ≥ k chưa hiện.)
