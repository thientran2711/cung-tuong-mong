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

### `--who`: where is one person, since when, doing what, why (owner OD L1901 point 3)

```
node dev/tools/roster.js <save> --who <name | id | role> [--all] [--json]
```

- `<name>`: any part of the name, accents optional (`"hai duong"` finds Hải Đường). `<id>`: a record id (`me`, `mm:me`, `s34`, `v12`, `emp`, `th`, `k:me:0`, `m3`…).
- `<role>`: `"cung nữ của ta"` (her close maid + her maids), `"thái giám của ta"`, `"người hầu của ta"` (all her people), `"cung nữ thân tín của ta"`,
  or the role exactly as the record writes it (`"cung nữ của Tô Uyển Dung"`, `"Hoàng hậu"`).
- Prints per person: `now: <place>, khắc k of buổi b (week w), doing <act>, with <target>, because <reason>` (the khắc the save stopped at), then her
  TIMELINE: every buổi the record keeps (`S.rlog` = this week + 4 before, and the current buổi; khắc after the save's khắc are marked `(plan)`),
  consecutive equal khắc merged. Default the last 8 buổi; `--all` = everything kept; `--json` = machine form.
- This answers the owner's question "my maid is not in my room — where is she, which khắc of which buổi, doing what, why" from a pasted save.

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

## 3b. Live servants and reasons (j95s, owner OD L1901 points 2 + 3)

- Every maid / eunuch (hers and everyone's, and Thái hậu's household) has her own per-khắc day in the record: serve, clean, meals, breaks, sleep and one
  night watch at her palace, and at most one walk out per buổi (an errand to Nội vụ phủ / Thái y viện / Kính sự phòng / Tân Giả khố, or a visit to a
  friend in another palace) which takes the whole buổi. Numbers: `BAL.slv` (dev/build/j95s.js).
- When her mistress (any consort, Hoàng hậu, Thái hậu, AND the player) goes out, a RETINUE follows: size = ceil(`BAL.slv.ret[rank]` × `BAL.slv.occ[place]`)
  (Hoàng hậu up to 5, Thái hậu `retTh`), capped by who is free; the close maid goes first if free, else the others by trust; the rest stay
  ("ở lại trông cung") or keep their own day. Reasons: "Hoàng hậu sang Ngự hoa viên, cung nữ thân cận theo hầu" / "cung nữ thân cận X đang bận (…), nên
  Hoàng hậu chọn Y theo hầu" / "… chọn theo hầu (tùy tùng n người)". Her own retinue walking with her is her party (not counted as bóng).
- Kept rows: a planned / landed deed (`ag_*`), a secret meeting, a forced list (rest, Tân Giả khố, cấm túc, lãnh cung), a walk to a deed — the pass never
  overwrites them; moves made after the plan are written into the same rows by their own code.
- Reason guard: no empty / filler reason ("", "phận sự trong cung", "phận sự") stays in the record for anyone; it is replaced by the cause read from the row.
- Read API for map levels: `j95here(place[,khắc])` (who is there now), `j95whereId(id[,khắc])`. Browser: `__j95s()` counters.
- Off switch for measuring: `BAL.slv.on=0`.

## 4. Kiểm tự động

- `node dev/test/live-servants.test.js <index.html> [lives=3]`: retinue size by rank, close-maid-busy fallback, the player's maids, no filler reason,
  roster.js self-check on real saves + `--who`. `node dev/test/live-servants-probe.js <index.html> [N] [seed]`: one maid's day + reason stats.
- `node dev/test/roster_sim.js [tuần=50] [đời=6]`: độ khó đoán (đoán theo tuần trước) + bất biến mỗi khắc (mô phỏng thẳng).
- `[NB=4] node dev/test/roster_audit.js <sens|rand> <số đời> <out.json> [shard]`: bot chơi thật (harness dev/measure), mọi xuất thân
  kể cả cung nữ, 2 năm mỗi đời, 3 buổi (mặc định) hoặc 4 buổi (NB=4), kiểm 9 bất biến (a)–(i). Kết quả: dev/test/ROSTER_AUDIT.md.
- `node dev/test/roster_dom.js <url trang bọc index có charset> <thư mục> [755x1000@2]`: 20 thời điểm ngẫu nhiên,
  so bản đồ + sân khấu trên màn hình với sổ.
