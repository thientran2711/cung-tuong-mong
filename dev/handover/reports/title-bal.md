# TITLE-BAL — every «Danh hiệu» rebalanced (owner OD 26/11 ~18:20Z «TITLE REBALANCE», ~18:50Z (8))

PRIORITY #1 CHECK ('title-bal|danh hiệu'): OD 20 | claims 2 | main 15 | archive 40 — reused: BAL.dh (jbal2.js) + jdh.js (the one title system), jkcg «Khuê các» titles,
jdh2 hiệu (unchanged), the act-audit harness surfaces (dev/test/act-audit.js) for the robot; no review/* branch held a title rebalance.

Branch `review/title-bal` from LIVE f573dc94. Owner rule (verbatim, OD ~18:20Z): «… làm 5 lần cái này là được cái này, 10 lần cái này là được cái kia, cái đó là
cái ví dụ thôi … Những cái danh hiệu mình có được nó thành ra là những cái rất là dễ đạt được, boring cực kỳ. Và cái danh hiệu nó còn phải phù hợp với mình, phải với
cái thời gian mà mình bỏ ra …»; (8) ~18:50Z: «6 recs approved; top tier = mostly beauty + a small stat bonus; lower tiers khó nhưng mà cũng khó vừa vừa thôi».

## What changed (ONE CORE: every bar in BAL.dh / BAL.kcg.title; every «Cách có» text prints the constant)

| rec | change | where |
|---|---|---|
| (1) bars from real frequency | every title has its own bars `BAL.dh.T[id].n` set from the robot's act frequency per life (below); the flat 1/5/10 is gone (`n0` 2/6/12 only for contest wins) | jbal2.js BAL.dh |
| (2) quality, not tries | the 5 «work» titles count only works of tier ≥ `BAL.dh.q.wk` (2 = Tinh xảo); failed / plain works do not count (the atonement copy count of jdh2 still counts every copy: `raw`) | jdh.js wkMake hook, jdh2 kinhN |
| (3) fewer, rarer; condition titles | ≤ 3 steps per title; mastery titles 2 steps (bậc 4 / 5); «Sớm viếng chiều thăm» became a STREAK (days in a row); new condition titles «Sen nở trong bùn» (a first place while low-ranked or punished, one step, rare) and «Thái hậu ưu ái» (Thái hậu's liking ≥ `cond.th.v` for N months in a row) | jdh.js, BAL.dh.cond |
| (4) fits her, reward fits effort | bonus per step: step 2 clearly above step 1, top step ≈ step 2 + a little (the top is mostly beauty: a higher colour tier); mastery titles start at a higher colour (b 4) | BAL.dh.B, T[].b |
| (5) no early pile-up | at most `BAL.dh.note.per` (1) new-title panel per buổi, the rest wait in `S.dhPend` and come one per buổi; «Khuê các»: ONE entry title only (Quý nhân+ → «Khuê tú danh môn», else «Trâm hoa ngự ban» only with home Danh ≥ `tuyenDanh`) — no title for just walking in | jdh.js dhNoteGate, jkcg.js |
| (6) robot before/after | dev/measure/title-bal-bot.js + title-bal-sum.py (tables below) | dev/measure |

Old saves: «Sớm viếng chiều thăm» and the work titles restart their count under the new rule (a try-count is not a streak / a quality count); every step
already earned stays hers (steps only go up). NPCs use the same rules (law 1).

## Robot before / after (dev/measure/title-bal-bot.js, JS-level player: random surfaces + buttons, every dialog answered; deaths and own early exits shielded and counted)

Same roads and seeds style both sides; game clock 1 day = 4 buổi, 36 days a year (a real robot life flight2-s9f: ~3200 buổi, 23 years). The JS robot runs
~0.3 buổi/s and its renderer grows (page recycled every 120 buổi with ser/deser), so lives were measured to **960 buổi (~6.7 years)** on both sides
(the AFTER palace life crashed at 970); full-life numbers below are projected from the measured per-1000-buổi rates.

| side | road · origin | buổi | titles | top tiers | first title (buổi) | most titles in one buổi | titles in the first 300 buổi |
|---|---|---|---|---|---|---|---|
| BEFORE | home · tt/nha | 960 | 2 | 1 (Sớm viếng chiều thăm, 50 tries, buổi 483) | 111 | 1 | 2 |
| BEFORE | home · dtq/nha | 960 | 2 | 1 (Sớm viếng chiều thăm, buổi 352) | 57 | 1 | 2 |
| BEFORE | palace · cnv/cung | 960 | 2 | 1 (Diệu thủ hồi xuân bậc 5, buổi 426) | 118 | **2** (two steps of one title in buổi 118) | 2 |
| AFTER | home · tt/nha | 960 | 0 (Thư hương at buổi 1167) | 0 | 1167 | 1 | 0 |
| AFTER | home · dtq/nha | 960 | 0 | 0 | — | 0 | 0 |
| AFTER | palace · cnv/cung | 960 | 3 | 1 (Diệu thủ hồi xuân bậc 5, buổi 107) | 95 | 1 | 2 |

Totals (960 buổi): BEFORE titles per life median **2**, first title median buổi **111**, lives with a top tier **3/3**, one buổi held 2 steps;
AFTER titles per life median **0** (mean 1.0), first title median buổi **95** (palace) / after buổi 960 (home), lives with a top tier **1/3**, never more than one panel a buổi.

Measured act frequency (all 7 robot lives, per 1000 buổi): Thỉnh an (any) 39–89 (home 89: ~300 a life — the old 5/20/50 bar was topped in the first fifth of a life);
Đọc sách 10.5 (~34 a life → step 1 «Thư hương» 15 reached in a life, step 2 50 only by a reader); thị tẩm 2.4 for this weak player (a favoured consort far more);
works made 2.2 per kind but tier ≥ Tinh xảo only 0.2 (quality bar = a real craftswoman, not a try counter); best Thỉnh an streak of a random player 1–8 days
(step 1 = 12 days in a row = a deliberate morning habit for a season-plus).
Full-life projection (3200 buổi, this random player): AFTER ≈ 2–4 titles a life (Thư hương 1, Trăng soi rèm ngọc 1, a mastery), top tier only on a road she
devotes herself to; BEFORE ≈ 6+ titles a life with 2–3 top tiers.

FINDING for MAIN (outside this brief, law 11 family «art pace»): on the palace-maid road (cnv) the Y thuật art rose bậc 1 → 5 within ~100–400 buổi in both robot
lives (duty acts), so the mastery title «Diệu thủ hồi xuân» still opens in the first year there even at the new bậc 4/5 bar. The title bar is right; the maid
road's art pace is the cause — a balance-pace worker should look at it.
Not validated by the robot (it rarely enters contests, studies little, never left the khuê các in 1200 buổi): contest bars, kids, «Trâm hoa ngự ban» tuyenDanh —
set from the game calendar (2 festivals a year + the SC7 contests) and the rule «step 1 ≈ a season-plus, top = a life's devotion».

## Bảng tên cho sếp — danh hiệu → thang cũ → thang mới

| Danh hiệu | Thang cũ | Thang mới |
|---|---|---|
| 15 danh hiệu hội thi (Tuệ nhãn, Thi tiên, Vế đối vàng, Tiếng tơ đồng, Nghê thường vũ y, Oanh vàng, Đường kim như gấm, Chức Nữ, Người giữ xuân, Thần bút, Quốc thủ, Hương vị ngự thiện, Bách phát bách trúng, Tay ném như thần, Hương lưu tay áo) | đứng đầu 1 / 5 / 10 lần | đứng đầu 2 / 6 / 12 lần |
| Tài hoa vô song | đứng đầu 3 / 6 / 10 môn | giữ nguyên 3 / 6 / 10 môn (vốn đã khó) |
| Bảng vàng đề tên | vào ba hạng đầu 1 / 5 / 10 lần | 3 / 12 / 30 lần |
| Sen nở trong bùn (MỚI · điều kiện) | — | đứng đầu một hội thi khi còn phẩm Thường tại trở xuống, hay đang bị cấm túc / đày lãnh cung (1 bậc, hiếm) |
| Trăng soi rèm ngọc | thị tẩm 1 / 10 / 30 lần | 5 / 25 / 80 lần |
| Phúc ấm đầy nhà | sinh 1 / 3 / 5 hoàng tự | 2 / 4 / 6 hoàng tự |
| Thái hậu ưu ái (MỚI · điều kiện) | — | được Thái hậu quý mến (từ 60) 6 / 18 / 36 tháng liền |
| Sớm viếng chiều thăm | thỉnh an 5 / 20 / 50 lần | thỉnh an 12 / 36 / 90 ngày liền, không bỏ ngày nào |
| Thư hương | đọc sách 5 / 20 / 50 lần | 15 / 50 / 120 lần |
| Dung nhan như ngọc | điểm trang, dưỡng nhan 5 / 20 / 50 lần | 15 / 50 / 120 lần |
| 8 danh hiệu tài nghệ (Cao sơn lưu thủy, Tâm như bàn cờ, Nhả ngọc phun châu, Bút sinh hoa, Gót sen lăng ba, Diệu thủ hồi xuân, Kim vàng chỉ bạc, Ngự trù) | lên bậc 3 / 4 / 5 | lên bậc 4 / 5 (2 bậc, màu khởi điểm cao hơn) |
| 5 danh hiệu tác phẩm (Tay nêm ngự thiện — nấu món, Tâm như gương sáng — chép kinh, Tay tiên — thêu khăn, Sơn thủy trong tay — vẽ tranh, Khúc nhạc tri âm — phổ khúc) | làm 1 / 5 / 10 lần (cứ làm là tính) | 4 / 12 / 30 tác phẩm từ hạng Tinh xảo trở lên (hỏng / thường không tính) |
| Trâm hoa ngự ban (Khuê các) | tự có khi nhập cung | chỉ khi Danh ở nhà từ 30 trở lên, và không đi kèm «Khuê tú danh môn» |
| Khuê tú danh môn (Khuê các) | vào cung phong Quý nhân | giữ nguyên (nhưng là danh hiệu duy nhất lúc nhập cung) |
| Thiên mệnh, kết cục hiếm Khuê các | 1 lần, khi đạt kết cục | giữ nguyên (vốn đã hiếm) |

Phần thưởng khi đeo (mỗi bậc): bậc 2 rõ hơn bậc 1, bậc đỉnh chỉ hơn bậc 2 một chút — bậc đỉnh chủ yếu là đẹp (màu bậc cao). Ví dụ: Sắc/Danh/Sủng… +1 / +2 / +2;
«Sủng dễ lên» một phần 20 / 12 / 10; Phúc khí +1 / +2 / +3. Mỗi buổi tối đa 1 bảng «Danh hiệu mới», cái thứ hai chờ buổi sau.

## Checks

- dev/test/title-bal.js (new): PASS — bars from BAL, ≤ 3 steps, rising; quality gate; streak; condition titles; one panel per buổi; bonuses never smaller on a harder step; how texts print BAL; old save.
- dev/test/title-sys.js: fails = the same 3 as LIVE f573dc94 before this change («no dialog», «place/festival style name», «thai») — pre-existing; the bars now come from BAL.
- dev/test/title-sys2.js: 1 fail «loss dialog: no item frame» = pre-existing on LIVE (LIVE had 2).
- quickcheck: QUICKCHECK_PLACEHOLDER
