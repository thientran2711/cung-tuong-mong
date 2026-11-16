# opt-greyed report (kit keeper, session_01UV1SzjgvGrBcSGqJv7jQTH)
READY: review/opt-greyed @ 68acf6d1 (built, quickcheck PASS 175 s, coop-e2e 59/59, opt-greyed test PASS at 755x1000, 1180x820, 1366x1024, 412x1058).

## Kit parts (KIT.md §84, kit sample page "§84 greyed option" + "§84 tạm", module dev/build/jgrey.js)
1. GREYED OPTION `kitOff(opt,why,when)` (+ kitWhyBac/Suc/Rank/Item, kitWhenBac/Rank/Item, kitOffBac). j3 showModal renders `opt.off` as disabled ACT CARD with a red Cần chip ("thiếu 37 bạc (cần 40, có 3) · mở lại khi đủ bạc"); chooseM refuses it. Numbers are live values. Scope per s24: COST / rank / item only, TIME is never a grey reason.
2. STAND-IN MARKER `kitTam(isStandin)` -> `.ktam` chip bottom-right of a picture box; data-driven: kpmArt() returns `tam` (festival/season×buổi fallback or rank-form fallback). Wired into kitPalaceMap (courtyard). Courtyard worker told the name.

## Group scan (before / after)
| place | before | after |
|---|---|---|
| act cards / pbtn (cardWhy, j63 kneed) | greyed + Cần reason already | unchanged |
| map place minis (accMini) | disabled + reason | unchanged |
| dialog: Ma ma giáo tập (jtds:87) | hidden when Bạc < fee | greyed, "thiếu N bạc" + "mở lại khi đủ bạc" |
| dialog: teacher choice (jrcp:232) | hidden when Bạc < fee | same |
| dialog: Bái kiến / Vào thẳng (j77:150-152, jclose:20), Hỏi thái giám (jmen:111) | hidden for khắc | NOT touched: time gates are being removed by the time-spill worker |
| Xử tội theo luật cung (j95:409), Quyền Hoàng hậu cards (j15/j78) | hidden below rank 7 | left hidden (story-locked power, not yet known) |
Not done: the full "hidden by cost" scan only covers `if(cond)push(...)` lines; options built through ternaries / array filters may remain; list them if the owner finds more.

## Notes
- Real courtyard picture was not shown in the shot (CDN images not loaded offline); the marker was checked on a placeholder box (no collision with hall labels at bottom-right).
- Rollover: finished, nothing pending.
