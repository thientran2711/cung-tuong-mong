# ROSTER AUDIT (j95, nhánh review/schedules)

Bản cuối (sau mọi sửa), 2026-11-14. Lệnh chạy lại:

```
python3 dev/build/assemble.py
for x in "sens 0" "sens 4" "rand 0" "rand 4"; do set -- $x; CAP=3300 node dev/test/roster_audit.js $1 9 /tmp/aud-$1-$2.json $2 & done; wait
node dev/test/roster_sim.js 50 4
# trang bọc có charset: (printf '<meta charset=utf-8>'; cat dev/index.html) > <thư mục phục vụ>/t_index.html, img/ bên cạnh
node dev/test/roster_dom.js http://127.0.0.1:<port>/t_index.html /tmp/shots 755x1000@2
node dev/test/roster_dom.js http://127.0.0.1:<port>/t_index.html /tmp/shots 1180x820@2
```

## 1. Bot chơi thật (dev/test/roster_audit.js, harness dev/measure inpage5 + inbal)

| | đời | kiểm (lần) | khắc đã qua | buổi | save→nạp |
|---|---|---|---|---|---|
| bot khôn (sens), 2 shard | 18 (16 đủ 2 năm, 2 chết) | 13 313 | 8 448 | 3 755 | 32 |
| bot ngẫu nhiên (rand), 2 shard | 18 (1 đủ 2 năm, 17 chết sớm vì chơi bừa) | 4 136 | 2 854 | 1 198 | 114 |
| **tổng** | **36** | **17 449** | **11 302** | **4 953** | **146** |

Xuất thân: đủ 9 loại, kể cả cung nữ (cnv): dtq 5, muoi 4, cn 4, nc 4, td 4, thd 4, cnv 4, tt 4, ch 3.
Kiểm chạy sau mỗi lần tiêu khắc, mỗi lần đi lại, mỗi lần qua buổi.

| bất biến | lỗi |
|---|---|
| (a) số người trong sổ = số người sống trong cung (đếm độc lập trong bộ kiểm) | **0** |
| (b) mỗi người đúng một nơi; không kẻ hầu nào thuộc hai cung | **0** |
| (c) bản đồ (countAt mọi nơi), whereOf, S.menW, sân khấu (hai chiều), tin tai mắt "nơi ở" lúc báo = sổ | **0** |
| (d) mọi hành động NPC nhắm vào người khác qua cổng động cơ có lý do; không có lần hại khi thiện cảm ≥40 mà không có lý do ngoại lệ | **0** (848 hành động thù địch qua runAct được kiểm; 34 bị chặn) |
| (e) người chết / nam nhân bị xử khỏi sổ; phế phi ở lãnh cung | **0** |
| (f) save → nạp: sổ, nhật ký, dữ liệu j95 giữ nguyên từng byte | **0** (146 lần) |
| lỗi trang (pageerror) | **0** |
| lỗi nội bộ j95 (J95.errs) | **0** |

Cổng động cơ đã chặn (cả 36 đời, gồm cả lần thử lại của j24): thăm 189, gây sự/mỉa mai 88, dò la 19, tung tin đồn 9, mưu j70 mới 3,
ngáng chân 1, bỏ xạ hương 1, bán chứng cứ 1, tố giác 1, cài đồ 1, vu oan 1.

## 2. Màn hình thật so với sổ (dev/test/roster_dom.js)

20 thời điểm ngẫu nhiên mỗi kích thước (đi lại ngẫu nhiên, qua buổi, qua tuần). Mỗi thời điểm: đọc DOM bản đồ (số bóng mỗi nơi),
DOM sân khấu (ai được vẽ), so với `window.__roster()`; xuất save và chạy `node dev/tools/roster.js <save> --json`, so số người mỗi nơi
của công cụ với số bóng trên màn hình.

| kích thước | thời điểm | lệch bản đồ | lệch sân khấu | lệch roster.js | tự kiểm sổ | tràn ngang | lỗi trang |
|---|---|---|---|---|---|---|---|
| Fold 755x1000@2 | 20 | 0 | 0 | 0 | sạch | 0 | 0 |
| iPad 1180x820@2 | 20 | 0 | 0 | 0 | sạch | 0 | 0 |

## 3. Mô phỏng thẳng (dev/test/roster_sim.js)

50 tuần × 4 đời × (3 buổi, 4 buổi): 5 600 lần kiểm theo khắc, 0 trùng / thiếu / lệch số / lệch bản đồ / lệch whereOf / người chết.

## 4. Lỗi bộ kiểm tìm ra và đã sửa

1. `S.where` (góc nhìn) chậm một khắc khi `nextBuoi` trả lại số khắc sau khi đi tiếp chỗ cũ → `whereOf` đọc thẳng sổ; vẽ lại thì dựng lại góc nhìn.
2. Phi tần mới (tuyển tú ở cuối tuần, sau khi đã xếp chỗ) thiếu trong sổ → đồng bộ lại sau endTurn, nextBuoi, runAct, chooseM,
   closeModal, doAct, talk, empAct, monthTick.
3. Phế phi đang bị cấm túc bị ghi về cung cũ (lỗi else-if) → luôn ở lãnh cung.
4. Sân khấu không cập nhật khi người rời đi giữa buổi / khách sang cung ngươi → đối chiếu sân khấu mỗi lần đồng bộ.
5. Sổ của buổi mới bị lập sớm trong lúc NPC hành động (trước khi xếp chỗ) làm mất ghi chép cổng → chỉ lập sổ trong placeWhere hoặc khi vẽ.
6. Lý do ngoại lệ của cổng không được đánh dấu → ghi cờ `ex` và chữ "bị khống chế / lệnh chủ phe / tin đồn".
7. Lỗi đồng bộ bị nuốt im → ghi vào `J95.errs` và bộ kiểm báo ra (0).
