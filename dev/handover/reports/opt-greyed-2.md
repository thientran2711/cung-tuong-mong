# opt-greyed-2 report (kit keeper successor, sonnet) — branch review/opt-greyed-2 @ 42936b3f (from main 08725411)

START_CTX ~10 % of window; finished well under +25 %, no rollover needed.

## What changed
ONE place maps the engine need[{t,ok,w?}] to the kit grey chip: `kitOffNeed(opt, needs)` / `kitOffIf(opt, ok, why, when)` / `kitWhyEv(a,n)` / `kitWhenEv|Wit|Ty()` in dev/build/jgrey.js (KIT §84.1b). The ch70 / evChoice engine (`c6`, j68) accepts `{need:[...]}` and applies it itself. A known option that is item / evidence gated is now shown greyed with the reason chip and "mở lại khi …" instead of being hidden. TIME untouched (scope: cost / rank / item only).

## Before / after (whole group, scanned with a script over dev/build/j*.js: every `if(cond) push(option)` whose cond tests inv / item / evidence)
| Place | Before | After |
|---|---|---|
| jface.js:137 thuốc giải trong rương (antidote card) | hidden without item | greyed "thiếu thuốc giải · mở lại khi có đủ đồ" |
| jtruth.js:117 trình chứng cứ | hidden when evidence < 1 | greyed "thiếu chứng cứ về <tên> (cần 1, có 0)" |
| jtruth.js:115 gọi cung nữ làm chứng | hidden when loyalty < 60 / no maid | greyed "lòng <tên> chưa tới 60 (có N)" (60 now BAL.truth.witLoy) |
| jtruth.js:116 mời Thái y nghiệm | hidden without doctor / y-art 3 | greyed "thiếu thái y tâm phúc hoặc y thuật 3 trở lên" (BAL.truth.tyArts) |
| jtoilr.js:47 tặng lại bằng món đồ | hidden without a matching item | greyed "thiếu món đồ đáng giá ngang chút bạc kia" |
| j70.js:229 + :241 tố giác (2 sites) | hidden when evidence < accNeed | greyed "thiếu chứng cứ về <tên> (cần n, có m)" (n = accNeed, BAL-backed rule j8) |
Already greyed before (r1): bạc-short options, kim bạc (jpoison:85), Ma ma giáo tập, teacher choice. Not options (skipped on purpose): j70:391 effect list, jpoison:45 relation line, jrash/jveil "Đeo …" (pick of owned item), jroute rtCard (already locked cards with Cần row). Story-locked options stay hidden (KIT 84.3).

## Tests
- dev/test/opt-greyed.js extended (PASS2 block: each site with and without the item/evidence, enabled when present, greyed + data-kneed + not clickable in the real dialog): PASS at 755x1000, 1180x820, 1366x1024, 412x1058; no page errors.
- bash dev/site/build_site.sh OK; bash dev/tools/quickcheck.sh 42936b3f: QUICKCHECK PASS (open 900 ms, old save ok, perf render 279/244, tab 258/266, buổi 933/813).
- coop-e2e: 59/59 on rerun (first run 54/59 = known week-3 / vibrate flakes).
- Shots looked at (scratch, not in git): Fold + iPad, vu oan dialog: greyed cards with red chips in the standard Cần row, same frame as the other options.

## KIT
KIT.md §84.1b + kit sample "§84 need[] chips" in the same branch. No KIT REQUEST needed.
