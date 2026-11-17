# pcard-facts (worker, sonnet) — review/pcard-facts @ 87c73de4 (r1 after main LOOK; first cut 654dd0c5; base person-leftcol-r1 e06e38a1)
PRIORITY #1 CHECK: OD ~14:15Z + ~14:40Z; reused kitKnownList (jhc), kpPop/.kgl tip style (j79), kpDateText; claims none other.

## What
Kit part change only. Person-card top block rows (Sở trọng / Đã biết / Dạo này) show the FACT first; when / how / who found it open in a kit pop-up (kpPop) on tapping the dotted-underlined fact.
- j79.js: new kit part `kitFactRows` / `kitFactTap` / `kitFactDetail` (+ `.kfx` style, click branch beside `.kgl`). KIT.md §73.1 added.
- jhc.js: `kitKnownList` also returns `how` (Dò được / Chuyện trò / Dâng quà…); the "Đã biết về X" column of the relation card uses kitFactTap (no inline small line).
- jpcf.js: pcfTaste/pcfIntel/pcfLog rebuilt on kitFactRows: Thích / Ghét items individually tappable (+ quiet "còn N điều chưa rõ"), Đã biết = short facts (likes/dislikes not repeated), Dạo này label "Chuyện", its date moved into the pop-up.
- jk2b.js: removed the `.krv` line-clamp (the "…" cut-off) in the sticky info panel.
- dev/test/pcard-facts.js: taps the first fact, checks pop-up text, no clamp, no date prefix.

## Tests (r1)
- pcard-fill.js at ALL 5 sizes 755x1000 / 1180x820 / 1366x1024 / 412x1058 / 390x844 (@1): errs [] everywhere; rv0 rv1 court0 court1 info+sticky OK, no hscroll, no overflow; same pass/info pattern as the base build e06e38a1 (pop/popdone/me = no info, as before).
- pcard-facts.js (new): person with 2 heard facts + likes + dislikes; taps a fact in the right panel and a Thích item in the left key block; pop-up shows Khi nào / Cách biết / Nguồn; no clamp, no date prefix.
- quickcheck on 87c73de4: PASS 118 s · open 1258 ms · old save ok · core gates PASS · perf render 150/141, tab 253/222, buổi 673/683.

## Fixes after main LOOK
(1) shots redone, all LOOKED: person with heard facts + likes/dislikes; pop-ups opened on a right-panel fact and on a Thích item. (2) r1 bug found while doing it: kitPcKey (jk2b) moved Thích/Ghét to the left block as the first item's plain text -> lost the other items and the tap; now it moves the whole .krv HTML. (3) test shots: a night "KẾT QUẢ" card from the test setup sometimes sits behind the pop-up; it is not part of the change.
## Shots (CDN https://ctm-img.victoria-tntt.workers.dev/img/_review/pcard-facts/): before-{755x1000,1180x820}.jpg (old: "NGHE ĐƯỢC Tháng ba, năm thứ nhất ·…" cut with "…"), after-{…}.jpg, after-popup-fact-{…}.jpg (tap on a heard fact), after-popup-like-{…}.jpg (tap on a Thích item). after-popup-755x1000.jpg = same as after-popup-fact (old wrong file overwritten). Delete after the verdict.
Note: on iPad the left key block's last line is partly clipped at the bottom of the card in BOTH before and after (existing layout of person-leftcol-r1, not touched here).

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
