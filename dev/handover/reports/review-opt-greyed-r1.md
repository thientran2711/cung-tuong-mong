# review/opt-greyed-r1 — report

Base: 68acf6d1 (kit keeper) + origin/main f1509d7c (merge; main's index.html/sw.js/assets.json taken, assemble.py list = main's + jgrey.js, site rebuilt).

## Verdict: PASS (see LEFTOVERS: item/evidence options in the ch70/evChoice engine still hidden — routed to the keeper)

## Checks
- node dev/test/opt-greyed.js (file:// build) at 755x1000 and 1180x820: PASS (greyed Ma ma option disabled, "Cần ✗ thiếu 37 bạc … mở lại khi đủ bạc" chip, tap refused, 'tạm' chip present). Looked at the shots: ACT CARD frame, chip fits, no cut text.
- 'tạm' chip checked in a real kitPalaceMap with a full-size picture box: bottom-right of .mapw at both sizes, no overlap with spots/labels.
- QUICKCHECK PASS (open, old save from live build loads + plays a buổi, perf at par with live).
- coop-e2e: 59/59 on this branch and 59/59 on origin/main (first run failed 8 checks only because it ran at the same time as quickcheck; rerun alone is clean).
- KIT consistency: one greyed-option look (kdis/ka card frame) for modal options; act cards (cardH/ka) and pbtn lists already carry their own reason via kaNeedAttr/whyTime — unchanged.

## Wider scan (every option list that hides/filters a known option, not only `if(cond)push`)
Fixed in this review:
1. j3 showModal: any option with fx.bac short of silver was disabled with NO reason (the `poor` path). Now gets kitOffBac → same chip. (Whole class: every modal option list.)
2. j54 h54show: hand-typed "(thiếu bạc: cần 10)" inside the option name → removed; the new auto chip shows it.
3. jpoison pgin: "Thử bằng kim bạc" was hidden with no needle → greyed (kitWhyItem/kitWhenItem).

Stay hidden by design (84.3, story/skill/state locks): j95:409 + j78:192 Xử tội (rank>=7 powers), jkc:455 rare cải trang (suc>=90 + roll), j13:42 / j2:53-56 art-skill acts (skill level, not cost/rank/item), j2:132 Xin ân điển (favour), j2:152 doctor (already owned), j77/jmen time-gated (time is never a reason).

LEFTOVERS (item/evidence gated, still hidden; different option engine — ch70/evChoice use `need` arrays, not opt.off) — for the keeper:
- jface.js:137 "Uống thuốc giải trong rương" (needs giaidoc item)
- jtruth.js:117 "Trình chứng cứ về …" (needs >=1 evidence), :115 maid witness (maid loyal>=60), :116 Thái y (doctor/skill)
- jtoilr.js:47 "Tặng lại: <item>" (only built when an item of equal value exists; arguably unknown option)
- j83.js:238 / jgift w0 poison options follow the same hidden-if-no-item pattern (not re-checked line by line)
Suggested: map ch70/evChoice `need:[{t,ok}]` → the same kitWhy* builders so one chip look covers both engines.

## Files changed in review
dev/build/j3.js, j54.js, jpoison.js, dev/kit/KIT.md (84.1a), rebuilt index.html/sw.js/assets.json/all.js. Shots in /home/user/wt/og-shots only (not in git, not on CDN).
