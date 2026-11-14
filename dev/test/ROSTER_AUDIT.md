# ROSTER AUDIT (j95, nhánh review/schedules)

Bản cuối (sau j95b), 2026-11-14. Lệnh chạy lại:

```
python3 dev/build/assemble.py
for x in "sens 0" "sens 4" "rand 0" "rand 4"; do set -- $x; CAP=3300 node dev/test/roster_audit.js $1 9 /tmp/aud-$1-$2.json $2 & done; wait
node dev/test/roster_sim.js 50 4
# trang bọc có charset: (printf '<meta charset=utf-8>'; cat dev/index.html) > <thư mục phục vụ>/t_index.html, img/ bên cạnh
node dev/test/roster_dom.js http://127.0.0.1:<port>/t_index.html /tmp/shots 755x1000@2
node dev/test/roster_dom.js http://127.0.0.1:<port>/t_index.html /tmp/shots 1180x820@2
```

## 1. Bot chơi thật (dev/test/roster_audit.js, harness dev/measure inpage5 + inbal) — bản có j95b

Chạy lại sau j95b (cổng động cơ cho sự kiện, nơi chốn theo câu chữ, hiểu lầm do tin đồn):
```
for nb in 3 4; do for x in "sens 0" "sens 4" "rand 0" "rand 4"; do set -- $x; NB=$nb CAP=3300 node dev/test/roster_audit.js $1 5 /tmp/aud-$1-$2-nb$nb.json $2 & done; wait; done
```

| | đời | 3 buổi | 4 buổi | đủ 2 năm |
|---|---|---|---|---|
| bot khôn (sens), 2 shard × 2 | 20 | 10 | 10 | 19 (1 chết) |
| bot ngẫu nhiên (rand), 2 shard × 2 | 20 | 10 | 10 | 1 (chơi bừa chết sớm) |
| **tổng** | **40** | 20 | 20 | |

Xuất thân: đủ 9 loại, kể cả cung nữ (cnv 4): td 8, dtq 5, muoi 4, cn 4, nc 4, ch 4, thd 4, cnv 4, tt 3.
22 723 lần kiểm (sau mỗi lần tiêu khắc, đi lại, qua buổi), 14 678 khắc, 6 332 buổi, 267 lần save→nạp.

| bất biến | lỗi |
|---|---|
| (a) số người trong sổ = số người sống trong cung | **0** |
| (b) mỗi người đúng một nơi | **0** |
| (c) bản đồ, whereOf, S.menW, sân khấu, tai mắt "nơi ở" = sổ | **0** |
| (d) mọi hành động NPC nhắm vào người khác qua cổng, không hại khi thiện cảm ≥40 mà thiếu lý do ngoại lệ | **0** (1 143 hành động thù địch qua runAct; 31 bị chặn) |
| (e) người chết / bị xử khỏi sổ; phế phi ở lãnh cung | **0** |
| (f) save → nạp giữ nguyên sổ | **0** (267 lần) |
| **(g) mọi sự kiện có diễn viên đều có lý do qua cổng** (thẻ j68, j7, thẻ có sẵn / truyện / việc nhờ / quà / cảnh báo mưu, và người tìm đến j24): mỗi diễn viên có dòng lý do trong sổ (src = mã sự kiện); không có diễn viên thù địch với thiện cảm ≥40 mà thiếu ngoại lệ; không thẻ nào có phi tần trong tham số mà chưa khai vai | **0** (1 835 thẻ, 1 722 diễn viên, 164 vai thù địch với ngươi; 1 053 lượt người tìm đến) |
| **(h) câu chữ đặt ai ở đâu = sổ ở khắc đó** (thẻ sự kiện theo bảng biến thể, mọi thẻ khác quét câu chữ độc lập trong bộ kiểm; việc lúc chuyển buổi/tuần ghi vào buổi vừa qua và phải có trong nhật ký) | **0** (1 720 lần kiểm nơi, 661 việc đã qua đối chiếu nhật ký, 70 lần sổ ghi lý do không dời: lãnh cung / cấm túc / đang hẹn kín) |
| **(i) hiểu lầm do tin đồn**: mỗi lần ghi "tin đồn: …, nguồn: …"; người chơi chỉ được báo "Nghe đồn … (Lời đồn)"; lời đồn không bị nói như sự thật; mọi lần trả đũa mang lý do tin đồn | **0** (548 lần kiểm) |
| lỗi trang / J95.errs / J95B.errs | **0 / 0 / 0** |

Số liệu j95b (40 đời): sự kiện qua cổng 1 733, sự kiện bị chặn vì diễn viên không có động cơ 74, chọn lại người 20, dời người theo câu chữ
1 577 (bỏ qua có lý do 15), hiểu lầm do tin đồn 195 (113 chuyện có thật, 82 bịa), người chơi nghe đồn 124, giải bày 14 (thành 6),
người hiểu lầm trả đũa 182.

## 2. Màn hình thật so với sổ (dev/test/roster_dom.js), sau j95b

| kích thước | thời điểm | lệch bản đồ | lệch sân khấu | lệch roster.js | tự kiểm sổ | tràn ngang | lỗi trang |
|---|---|---|---|---|---|---|---|
| Fold 755x1000@2 | 20 | 0 | 0 | 0 | sạch | 0 | 0 |
| iPad 1180x820@2 | 20 | 0 | 0 | 0 | sạch | 0 | 0 |

## 3. Mô phỏng thẳng (dev/test/roster_sim.js 50 4), sau j95b

3 200 lần kiểm mỗi cấu hình (3 buổi, 4 buổi): 0 trùng / thiếu / lệch số / lệch bản đồ / lệch whereOf / người chết.
Độ khó đoán phi tần: 43% (3 buổi), 42% (4 buổi); xúc xắc cũ 67% / 73%. Hoàng thượng 58% / 55%.

## 4. Lỗi bộ kiểm tìm ra và đã sửa

1. `S.where` (góc nhìn) chậm một khắc khi `nextBuoi` trả lại số khắc sau khi đi tiếp chỗ cũ → `whereOf` đọc thẳng sổ; vẽ lại thì dựng lại góc nhìn.
2. Phi tần mới (tuyển tú ở cuối tuần, sau khi đã xếp chỗ) thiếu trong sổ → đồng bộ lại sau endTurn, nextBuoi, runAct, chooseM,
   closeModal, doAct, talk, empAct, monthTick.
3. Phế phi đang bị cấm túc bị ghi về cung cũ (lỗi else-if) → luôn ở lãnh cung.
4. Sân khấu không cập nhật khi người rời đi giữa buổi / khách sang cung ngươi → đối chiếu sân khấu mỗi lần đồng bộ.
5. Sổ của buổi mới bị lập sớm trong lúc NPC hành động (trước khi xếp chỗ) làm mất ghi chép cổng → chỉ lập sổ trong placeWhere hoặc khi vẽ.
6. Lý do ngoại lệ của cổng không được đánh dấu → ghi cờ `ex` và chữ "bị khống chế / lệnh chủ phe / tin đồn".
7. Lỗi đồng bộ bị nuốt im → ghi vào `J95.errs` và bộ kiểm báo ra (0).
8. (j95b) Thẻ "người tìm đến" j24 ghi khách vào sổ lúc TẠO thẻ, đè lên nơi của thẻ khác đang hiện → giờ chỉ ghi lúc thẻ hiện.
9. (j95b) Tin tuần "Tai mắt kể: X đứng đợi ngự giá ở ngự hoa viên" là việc của buổi vừa qua → ghi vào buổi đó (nhật ký), mỗi việc một khắc riêng.
10. (j95b) Tin tuần / tháng có lúc đặt phế phi ra Dưỡng Hòa điện → tin sai, bỏ dòng đó.
11. (j95b) "phe Càn Ninh" (tên phe) bị hiểu là nơi Càn Ninh cung → bỏ tên phe khỏi từ điển nơi.
12. (j95b) Chọn lại người cho lệnh của chủ (cnvOrd) có thể chọn chính chủ → loại người ra lệnh / đối tượng khỏi danh sách, không ai tự hại mình.
13. (j95b) Lời cảnh báo của cung nữ thân tín (j24, theo mức nguy hiểm) về người thiện cảm 75 → cảnh báo không có động cơ và không có mưu thật bị bỏ; cảnh báo j70 về mưu thật đã lập ghi lý do "mưu thật đã lập từ trước".
