# pcard-facts (worker, sonnet) — review/pcard-facts @ 654dd0c5 (base person-leftcol-r1 e06e38a1)
PRIORITY #1 CHECK: OD ~14:15Z + ~14:40Z; reused kitKnownList (jhc), kpPop/.kgl tip style (j79), kpDateText; claims none other.

## What
Kit part change only. Person-card top block rows (Sở trọng / Đã biết / Dạo này) show the FACT first; when / how / who found it open in a kit pop-up (kpPop) on tapping the dotted-underlined fact.
- j79.js: new kit part `kitFactRows` / `kitFactTap` / `kitFactDetail` (+ `.kfx` style, click branch beside `.kgl`). KIT.md §73.1 added.
- jhc.js: `kitKnownList` also returns `how` (Dò được / Chuyện trò / Dâng quà…); the "Đã biết về X" column of the relation card uses kitFactTap (no inline small line).
- jpcf.js: pcfTaste/pcfIntel/pcfLog rebuilt on kitFactRows: Thích / Ghét items individually tappable (+ quiet "còn N điều chưa rõ"), Đã biết = short facts (likes/dislikes not repeated), Dạo này label "Chuyện", its date moved into the pop-up.
- jk2b.js: removed the `.krv` line-clamp (the "…" cut-off) in the sticky info panel.
- dev/test/pcard-facts.js: taps the first fact, checks pop-up text, no clamp, no date prefix.

## Tests
- pcard-fill.js 755x1000@2 + 1180x820@2: all cases info/sticky/key OK, no errors (earlier sizes unchanged code path).
- pcard-facts.js 755x1000@2: pop = "…Khi nào: Tháng ba · trung tuần · năm thứ nhất", clamp false, prefix false.
- quickcheck: PASS 126 s · open 1248 ms · old save ok · core gates PASS · perf render 150/141, tab 229/256, buổi 735/638.
- Not run: pcard-fill at 5 sizes (only the 2 owner devices) — reviewer may run `node dev/test/pcard-fill.js <url> <out>`.

## Shots (LOOKED at): CDN img/_review/pcard-facts/ before-755x1000.jpg, after-755x1000.jpg, before-1180x820.jpg, after-1180x820.jpg, after-popup-755x1000.jpg (host: https://ctm-img.victoria-tntt.workers.dev/)
Before: "TRUNG TUẦN | Ta đã biết…"; after: "CHUYỆN | Ta đã biết…" with dotted underline, tap shows when. Delete the shots after the verdict.

## Scan table (whole family)
| place | before | after |
|---|---|---|
| pcard Sở trọng (phi tần, Emp, Thái hậu) | "Nàng thích: A · B (còn N điều chưa rõ)" one string | Thích/Ghét items, each tappable when a source note exists |
| pcard Đã biết | "Tin/Nghe được" + prefix "T3/1 trung tuần: Dò được:", clamp "…" | short fact, detail in pop-up, no clamp |
| pcard Dạo này | week label + line | label Chuyện, week in pop-up |
| relation card "Đã biết về X" column | fact + small source/date line | fact tappable only |
| Hậu cung / Giao tình / Nam nhân / Cung nhân / NPC cards | all go through pcard/pcfPlace → same part | same |
Not changed: "Đã biết về X" full panel (kitIntelPanel) already IS the detail view.

## Known limits
Emp likes/dislikes have no stored source → plain text (nothing to open). Test data in shots had few facts (new life).
