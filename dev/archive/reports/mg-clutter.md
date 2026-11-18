# mg-clutter report (worker mg-clutter) — branch review/mg-clutter @ cbbbc7d9 (2 commits: 9a2bf6e8 + cbbbc7d9)

PRIORITY #1 CHECK: OD 6 | ledger 1 | claims 3 | main j79.js kitGameFrame (hud row), j82.js kg82Frame, jtoil.js toilDressUI (Hôm nay) | review/* 0 (diemtrang-* branches are score/fx/coop-look, none touch the frame)

## Fix (kit frame only, whole family)
- j79 kitGameFrame + j82 kg82Frame fallback: the PHẦN/HỒI/CÒN chip row is no longer shown in ANY mini-game. The cells stay in the DOM (hidden) so every engine's env.hud/kitGameSet and the tests keep working; no engine changed.
- jtoil toilDressUI (Điểm trang · Trước gương đồng): the 'Hôm nay' block (agenda rows 'Thỉnh an … (gặp bề trên)') removed; the mama hint line is kept (full width, above the wardrobe). The colour screen text and the result row 'Hôm nay' (effects) are untouched.
- The only frame that showed a 'Hôm nay' block was Điểm trang; every other mini-game (15 contest kinds, lesson Thêu/Nấu, exams, Nghiệm thân, tài nghệ học, mưu/dò la games, tát/né, Phối đồ) shares kit frame so inherits the row removal.

## Before / after (play state; chip=visible HUD rows, hom=visible 'Hôm nay' block, scroll=px the panel scrolls)

| game | device | before chip/hom/scroll | after chip/hom/scroll |
|---|---|---|---|
| contest:dan | fold 755x1000@2 | 1/0/0 | 0/0/0 |
| contest:dan | ipad 1180x820@2 | 1/0/0 | 0/0/0 |
| contest:dan | ipad-pro 1366x1024@2 | 1/0/0 | 0/0/0 |
| contest:dan | phone 390x844@3 | 1/0/0 | 0/0/0 |
| contest:hat | fold 755x1000@2 | 1/0/0 | 0/0/0 |
| contest:hat | ipad 1180x820@2 | 1/0/0 | 0/0/0 |
| contest:hat | ipad-pro 1366x1024@2 | 1/0/0 | 0/0/0 |
| contest:hat | phone 390x844@3 | 1/0/0 | 0/0/0 |
| contest:co | fold 755x1000@2 | 1/0/0 | 0/0/0 |
| contest:co | ipad 1180x820@2 | 1/0/0 | 0/0/0 |
| contest:co | ipad-pro 1366x1024@2 | 1/0/0 | 0/0/0 |
| contest:co | phone 390x844@3 | 1/0/0 | 0/0/0 |
| contest:dauho | fold 755x1000@2 | 1/0/0 | 0/0/0 |
| contest:dauho | ipad 1180x820@2 | 1/0/0 | 0/0/0 |
| contest:dauho | ipad-pro 1366x1024@2 | 1/0/0 | 0/0/0 |
| contest:dauho | phone 390x844@3 | 1/0/0 | 0/0/0 |
| contest:ban | fold 755x1000@2 | 1/0/0 | 0/0/0 |
| contest:ban | ipad 1180x820@2 | 1/0/0 | 0/0/0 |
| contest:ban | ipad-pro 1366x1024@2 | 1/0/0 | 0/0/0 |
| contest:ban | phone 390x844@3 | 1/0/0 | 0/0/0 |
| contest:tho | fold 755x1000@2 | 1/0/0 | 0/0/0 |
| contest:tho | ipad 1180x820@2 | 1/0/0 | 0/0/0 |
| contest:tho | ipad-pro 1366x1024@2 | 1/0/0 | 0/0/0 |
| contest:tho | phone 390x844@3 | 1/0/0 | 0/0/0 |
| contest:doi | fold 755x1000@2 | 1/0/0 | 0/0/0 |
| contest:doi | ipad 1180x820@2 | 1/0/0 | 0/0/0 |
| contest:doi | ipad-pro 1366x1024@2 | 1/0/0 | 0/0/0 |
| contest:doi | phone 390x844@3 | 1/0/0 | 0/0/0 |
| contest:doden | fold 755x1000@2 | 1/0/0 | 0/0/0 |
| contest:doden | ipad 1180x820@2 | 1/0/0 | 0/0/0 |
| contest:doden | ipad-pro 1366x1024@2 | 1/0/0 | 0/0/0 |
| contest:doden | phone 390x844@3 | 1/0/0 | 0/0/0 |
| contest:ve | fold 755x1000@2 | 1/0/0 | 0/0/0 |
| contest:ve | ipad 1180x820@2 | 1/0/0 | 0/0/0 |
| contest:ve | ipad-pro 1366x1024@2 | 1/0/0 | 0/0/0 |
| contest:ve | phone 390x844@3 | 1/0/0 | 0/0/0 |
| contest:hoa | fold 755x1000@2 | 1/0/0 | 0/0/0 |
| contest:hoa | ipad 1180x820@2 | 1/0/0 | 0/0/0 |
| contest:hoa | ipad-pro 1366x1024@2 | 1/0/0 | 0/0/0 |
| contest:hoa | phone 390x844@3 | 1/0/0 | 0/0/0 |
| contest:theu | fold 755x1000@2 | 1/0/0 | 0/0/0 |
| contest:theu | ipad 1180x820@2 | 1/0/0 | 0/0/0 |
| contest:theu | ipad-pro 1366x1024@2 | 1/0/0 | 0/0/0 |
| contest:theu | phone 390x844@3 | 1/0/0 | 0/0/0 |
| contest:kim | fold 755x1000@2 | 1/0/0 | 0/0/0 |
| contest:kim | ipad 1180x820@2 | 1/0/0 | 0/0/0 |
| contest:kim | ipad-pro 1366x1024@2 | 1/0/0 | 0/0/0 |
| contest:kim | phone 390x844@3 | 1/0/0 | 0/0/0 |
| contest:mua | fold 755x1000@2 | 1/0/0 | 0/0/0 |
| contest:mua | ipad 1180x820@2 | 1/0/0 | 0/0/0 |
| contest:mua | ipad-pro 1366x1024@2 | 1/0/0 | 0/0/0 |
| contest:mua | phone 390x844@3 | 1/0/0 | 0/0/0 |
| contest:banh | fold 755x1000@2 | 1/0/0 | 0/0/0 |
| contest:banh | ipad 1180x820@2 | 1/0/0 | 0/0/0 |
| contest:banh | ipad-pro 1366x1024@2 | 1/0/0 | 0/0/0 |
| contest:banh | phone 390x844@3 | 1/0/0 | 0/0/0 |
| contest:huong | fold 755x1000@2 | 1/0/0 | 0/0/0 |
| contest:huong | ipad 1180x820@2 | 1/0/0 | 0/0/0 |
| contest:huong | ipad-pro 1366x1024@2 | 1/0/0 | 0/0/0 |
| contest:huong | phone 390x844@3 | 1/0/0 | 0/0/0 |
| diemtrang:dress (Trước gương đồng) | fold 755x1000@2 | 1/1/134 | 0/0/0 |
| diemtrang:dress (Trước gương đồng) | ipad 1180x820@2 | 1/1/0 | 0/0/0 |
| diemtrang:dress (Trước gương đồng) | ipad-pro 1366x1024@2 | 1/1/0 | 0/0/0 |
| diemtrang:dress (Trước gương đồng) | phone 390x844@3 | 1/1/461 | 0/0/106 |
| lesson:theu | fold 755x1000@2 | 0/0/0 | 0/0/0 |
| lesson:theu | ipad 1180x820@2 | 0/0/0 | 0/0/0 |
| lesson:theu | ipad-pro 1366x1024@2 | 0/0/0 | 0/0/0 |
| lesson:theu | phone 390x844@3 | 0/0/0 | 0/0/0 |
| lesson:nau | fold 755x1000@2 | 0/0/0 | 0/0/0 |
| lesson:nau | ipad 1180x820@2 | 0/0/0 | 0/0/0 |
| lesson:nau | ipad-pro 1366x1024@2 | 0/0/0 | 0/0/0 |
| lesson:nau | phone 390x844@3 | 0/0/0 | 0/0/0 |

Contest kinds (15: dan hat co dauho ban tho doi doden ve hoa theu kim mua banh huong): before = chip row visible while playing in 15/15 at every device; after = 0/15. Scroll 0 at Fold/iPad/iPad-Pro before and after (phone intro: before small scrolls on co/doi/doden, after none).

## Result
- Điểm trang Fold 755x1000: scroll 134 px -> 0; iPad 1180x820 and 1366x1024: 0 -> 0 (chip row and Hôm nay gone); phone 390x844: scroll 461 px -> 106 px (the wardrobe grid + equipped column itself is taller than a phone, residual is not the removed blocks; phone is not a priority device).
- Screenshot looked at by me (Fold): header seal, Cách chơi, tabs, wardrobe, two buttons all in one screen. Not committed.

## Info check (do not lose needed info)
- Round count: Cách chơi / how text of each game states its rounds (MINIGAMES.md: '5 hồi', '3 hồi', '6 lần ném'); the Điểm trang how line says Hồi 1..4. No new display invented.
- Time limit (main s29 decision): games with a real time limit show the EXISTING kit clock chip (kitCoopClock, KIT §69.4, 'Còn N giây') at the right of the frame's title line, via kitGameClock called from kitGameSet('time'). Only the HUD value '<n> giây' makes it visible; 'nhìn kỹ', '–', 'N tên', 'đã hết', 'không hạn' hide it. No new part, no chip row. Looked at the Fold shot (Đàn): chip 'Còn 19 giây' in the title line, panel scroll 0. KIT.md §13 updated.
- The Điểm trang occasion list (Thỉnh an Thái hậu / Hoàng hậu, gặp bề trên) is gone as ordered; the occasion still reaches the player through the mama hint line (when she has a mama) and the 'Cách chơi' line.

## Tests
- python3 dev/build/assemble.py + bash dev/site/build_site.sh: ok (built in commit).
- node dev/test/toilette.js (Fold): ok, no errors, no overflow.
- node dev/test/small-bugs-2.js (Fold): exit 0, errs [] (HUD labels Hồi/Câu/Môn/Hạng still update).
- node dev/test/minigames91.js (Fold; dan co mua ban theu huong): all done, no overflow, no truncation, errors []. hudOver counter (715 on dan) is the same pre-existing sample counter as the baseline build (793), hudMax empty = no HUD value above its ceiling.
- node dev/test/contest-ui.js: FAILS identically BEFORE (origin/main build, same sandbox, port 8766) and AFTER at line 17 (page.evaluate TypeError reading 'right' of null = .kgpic missing: the board painting is not on the CDN in this sandbox); not caused by this change. It was previously: FAILS at line 17 (.kgpic missing: the board painting is not on the CDN in this sandbox, kg82Pic returns ''); not caused by this change (it only reads .kghud display, which was already 'none' in the intro). Verified against baseline: same failure. Re-run where the CDN is reachable.
- bash dev/tools/quickcheck.sh: QUICKCHECK PASS on cbbbc7d9 (145 s, old save ok, core gates PASS). Rescan after the clock chip (after.json): chip rows 0, Hôm nay 0, scroll 0 at Fold/iPad/iPad-Pro; phone Điểm trang 106 px. minigames91 (6 kinds) and small-bugs-2 rerun on cbbbc7d9: ok.
- Scan: dev/handover/reports/mg-clutter/scan.js (before.json/after.json hold the raw rows).
- Not scanned (no cheap entry): exams, Nghiệm thân, tài nghệ học, mưu/dò la, tát/né, Phối đồ frames — they all go through kg82Frame, so the row removal applies; their scroll was not measured.
