# Sổ vị trí (j95): cách xem cho dev

Sổ là một bản ghi trong save (`S.roster` cho buổi hiện tại, `S.rlog` cho tuần này và 4 tuần trước).
Mỗi người đang sống trong cung, ở mỗi khắc (4 khắc mỗi buổi), có đúng một mục: **nơi** (mã nơi chốn j77),
**việc**, **đối tượng** (nếu có) và **lý do** (lấy từ trạng thái thật: thói quen, ý định tuần, thiện cảm, oán, ghen,
phe, lệnh, bị khống chế, mưu j70...). Không hiện trong game.

## 1. Từ dòng lệnh

```
node dev/tools/roster.js <save> [tuần] [buổi] [khắc]
```

- `<save>`: một tệp chứa MỘT trong ba thứ:
  - mã "Chép sổ" (bắt đầu bằng `CTM1:` hoặc `CTM2:`), lấy ở màn hình đầu: Chép sổ;
  - JSON của một ô lưu (giá trị `localStorage["hclh-save-v2-<n>"]`);
  - JSON của cả localStorage (`{"hclh-slot":"1","hclh-save-v2-1":"..."}`), lấy ô đang chơi.
- `tuần`: số tuần game đếm (`S.turn*3+S.tuan`); bỏ trống = tuần hiện tại.
- `buổi`: 0..số buổi-1 (3 hoặc 4 buổi); `khắc`: 0..3. Bỏ trống = lúc save dừng.

In ra bảng `Tên — chức — nơi — việc — đối tượng — lý do`, tổng số người, và **TỰ KIỂM**:
không ai trùng, không ai thiếu nơi, mọi phi tần / kẻ hầu / con còn sống đều có mặt, người chết không còn,
phế phi ở lãnh cung, số người từng nơi khớp số bản đồ đã hiện ở khắc đó (game ghi lại lúc hiện).
Cuối bảng: các hành động nhắm vào người khác trong buổi, đã qua cổng động cơ (cho làm / CHẶN + lý do), và từ j95b cả
diễn viên của mọi sự kiện đã hiện ("nguồn: e68proudVisit", "nguồn: rvframe"...), hiểu lầm do tin đồn (`misbelief`: "tin đồn: …, nguồn: …")
và lần giải bày (`cleared`).
Mã thoát: 0 sạch, 3 có lỗi tự kiểm.

Lấy save nhanh từ trình duyệt (console): `copy(localStorage.getItem("hclh-save-v2-"+localStorage.getItem("hclh-slot")))`
rồi dán vào một tệp.

## 2. Trong trình duyệt (lệnh ẩn)

```
__roster()            // lúc này
__roster(tuần, buổi, khắc)
```

Trả về `{at,total,rows,dup,miss,mapMismatch,ok}` và in bảng bằng `console.table`.

## 3. API dữ liệu cho bộ giao diện (chủ kit làm phần hiện)

- `habitsKnown(p)`: thói quen của p mà người chơi ĐÃ BIẾT (tự thấy ≥2 lần, hoặc tai mắt kể):
  `[{buoi, slot, place, placeName, seen, by, week, old, txt}]` (txt ví dụ "Thường thấy nàng ở Ngự hoa viên buổi chiều";
  `old` = đã lâu không thấy lại, có thể đã đổi).
- `j95habitsMine()`: thói quen của chính người chơi mà NPC có thể học (nơi hay đến theo buổi, số kẻ đang rình).
- `j95mapSigns()`: `{mãNơi: "hai bóng người đứng sát nhau trong chỗ khuất"}` khi đang có hẹn kín ở đó (không lộ ai).
- `motiveOK(a,t,kind)`: cổng động cơ dùng chung, trả `{ok, why, ex}` (j95b thêm "tin đồn: …, nguồn: …" vào lý do khi người đó đang hiểu lầm).
- `j95bRumours()`: những hiểu lầm do tin đồn mà người chơi đã NGHE ĐỒN (chưa giải): `[{who, src, txt, week}]`, txt luôn là "Nghe đồn …".
- Trong trình duyệt: `__j95b()` cho số liệu j95b (sự kiện qua cổng, bị chặn, chọn lại, số lần dời người theo câu chữ, tin đồn).

## 4. Kiểm tự động

- `node dev/test/roster_sim.js [tuần=50] [đời=6]`: độ khó đoán (đoán theo tuần trước) + bất biến mỗi khắc (mô phỏng thẳng).
- `[NB=4] node dev/test/roster_audit.js <sens|rand> <số đời> <out.json> [shard]`: bot chơi thật (harness dev/measure), mọi xuất thân
  kể cả cung nữ, 2 năm mỗi đời, 3 buổi (mặc định) hoặc 4 buổi (NB=4), kiểm 9 bất biến (a)–(i). Kết quả: dev/test/ROSTER_AUDIT.md.
- `node dev/test/roster_dom.js <url trang bọc index có charset> <thư mục> [755x1000@2]`: 20 thời điểm ngẫu nhiên,
  so bản đồ + sân khấu trên màn hình với sổ.
