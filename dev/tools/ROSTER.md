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
- Also per person: `rest / sleep today` (her sleep / rest turn / night watch / break rows of today), `entourage today` (a mistress: the day's
  pick and why), `knows` (from `S.knw`: what she saw where, or heard from whom and at which hand).
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

- Every maid / eunuch (hers and everyone's, and Thái hậu's household) has her own per-khắc day in the record: serve, clean, meals, breaks, at most one
  walk out per buổi (an errand to Nội vụ phủ / Thái y viện / Kính sự phòng / Tân Giả khố, or a visit to a friend in another palace, the whole buổi), and
  her REST RHYTHM (MAIN 18/11 20:07Z): one rest turn a day ("nghỉ theo lượt", buổi by `BAL.slv.rest.buoi`, `rest.len` khắc), her bedtime in tối from
  `BAL.slv.sleepFrom` (+0..`sleepJit`), the household's night watch (`BAL.slv.night` servants) rotating day by day, last night's watcher sleeping in for
  `afterWatch` khắc of sáng. Numbers: `BAL.slv` (dev/build/j95s.js).
- ENTOURAGE (owner OD 18/11 ~19:45Z (4); replaced the old rank retinue): the PLAYER picks who follows her in one card the first time each day she
  leaves her palace (any number, among her people present AND free; the busy / absent / asleep greyed with the reason; no adding once out; stored in
  `S.ent = {d, ids, at}`). Every NPC mistress picks once a day at her first outing by her own reasons (`BAL.slv.ent`: base share × trait × formal
  place × low mood; trust picks who; the discreet / scheming take only the most trusted), stored in `S.entN = {d, P:{oid:{ids, why}}}`. Each outing:
  followers = the day's pick ∩ who is free then. Reasons: "Hoàng hậu sang Ngự hoa viên: Hoàng hậu chọn 3 người theo hầu (kiêu ngạo)" /
  "cung nữ thân cận X không rảnh, …" / "ngươi chọn 2 người theo hầu hôm nay". The rest stay ("ở lại trông cung") or keep their own day.
- WITNESSES + GOSSIP (`S.knw`, jagknow end): a deed that lands (any NPC's, and the player's shared deeds) is known by the servants whose row stands
  there at that khắc (her companions see her day; those at home do not); servants who meet in a talking act pass it on (`BAL.slv.gos`), and each tells
  her mistress by the kn chain's tell / keep choice (to the player: a TIN BÁO line). `S.knw.I` = the things, `S.knw.K[id] = {item: [from, hand]}`.
- Kept rows: a planned / landed deed (`ag_*`), a secret meeting, a forced list (rest, Tân Giả khố, cấm túc, lãnh cung), a walk to a deed — the pass never
  overwrites them; moves made after the plan are written into the same rows by their own code.
- Reason guard: no empty / filler reason ("", "phận sự trong cung", "phận sự") stays in the record for anyone; it is replaced by the cause read from the row.
- Read API for map levels: `j95here(place[,khắc])` (who is there now), `j95whereId(id[,khắc])`. Browser: `__j95s()` counters.
- Off switch for measuring: `BAL.slv.on=0`.

## 4. Kiểm tự động

- `node dev/test/live-servants.test.js <index.html> [lives=3]`: T1 NPC day picks, T2 close-maid-busy, T3 the player's picker (present + free
  only, once a day, no adding, alone), T4 no filler reason, T5 roster.js self-check on real saves + `--who` (entourage, knows), T6 witnesses + gossip,
  T7 rest rhythm. `node dev/test/live-servants-probe.js <index.html> [N] [seed]`: one maid's day + reason stats.
- `node dev/test/roster_sim.js [tuần=50] [đời=6]`: độ khó đoán (đoán theo tuần trước) + bất biến mỗi khắc (mô phỏng thẳng).
- `[NB=4] node dev/test/roster_audit.js <sens|rand> <số đời> <out.json> [shard]`: bot chơi thật (harness dev/measure), mọi xuất thân
  kể cả cung nữ, 2 năm mỗi đời, 3 buổi (mặc định) hoặc 4 buổi (NB=4), kiểm 9 bất biến (a)–(i). Kết quả: dev/test/ROSTER_AUDIT.md.
- `node dev/test/roster_dom.js <url trang bọc index có charset> <thư mục> [755x1000@2]`: 20 thời điểm ngẫu nhiên,
  so bản đồ + sân khấu trên màn hình với sổ.
