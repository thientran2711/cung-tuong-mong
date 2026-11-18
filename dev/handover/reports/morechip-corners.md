PRIORITY #1 CHECK: OD 17/11 ~13:02Z (chip bigger, bottom-left/right) | main j59.js j59chips (KIT 33.9) = the one placer | review/morechip-fix-r1 3bed78e3 PASS (in batch s31a) = base | review/* none else | CLAIMS row 762.

# morechip-corners — SẴN SÀNG KIỂM 08ccd1bf (branch review/morechip-corners = review/morechip-fix-r1 3bed78e3 + merge origin/main 6ca04148; generated index.html/sw.js conflicts took main's, site rebuilt)

## What (kit part only: j59chips + its CSS + KIT §33.9 rewritten in place)
- Chip is BIG: `.kchip.j59more` 1.05rem, padding 5/15 px, 2 px border, soft shadow (was .76rem badge). Height ~34 px at Fold 755.
- Placement: BOTTOM corners of the stage. LEFT chip = people off the left side (`P.before`), at bottom-left; RIGHT chip = people off the right side (`P.after`), at bottom-right; each side its own count, hidden at 0. The code already keeps two lists (before / after), so no splitting was needed. On page 1 of a place only "+N" right shows; after one swipe both corners show (Fold: L+2 / R+2).
- Never under the right card column or the left rail: if the corner box overlaps #kshR / #kshL / .krailb it steps beside it. Never over a name chip: if it overlaps one it steps up above the name row. The morechip-fix second-frame re-placement stays.
- The old top-corner / 44 % / beside-at-top code is replaced (not kept alongside).
- KIT.md §33.9 sentence rewritten in place. The kit page's stage samples use the real j59chips, so they show the new chip without a separate sample.

## Scan (dev/test/morechip-scan.js extended: now page 1 AND page 2 of every place, host mode real rot.js frame, her room + 14 places, Fold 755x1000, iPad Air 1180x820, iPad Pro 1366x1024, 412x1058, 390x844; fails on: ON column/rail, ON name chip, outside stage, chip < 28 px high, chip not in bottom half, page errors)
| build | chips checked | on column/rail | on name chip | too small | not bottom | errors |
|---|---|---|---|---|---|---|
| before (3bed78e3, chips top corners, ~20 px) | n/a (old scan) | 0 | not tested | all ~20 px | all top | 0 |
| after 08ccd1bf | 143 (page 1 + 2, 5 sizes) | 0 | 0 | 0 | 0 | 0 |
Result: MORECHIP OK.

## Tests
- quickcheck --runs 5 vs live: PASS 244 s, old save ok, core gates PASS; perf new/live render 183/184, tab 284/291, buổi 919/882, tasks>200ms 13/13 (no extra work: one fewer measure than before).
- Not run: the other batch gates (this is a kit-part change; main's batch pass re-runs them).

## LOOK (dev/handover/shots/morechip-corners/ on the handover branch; CDN upload not done)
- c-fold-p0.jpg / c-fold-p1.jpg: Fold, Đức Thọ cung: "+2" big at both bottom corners, clear of names «Tống ma ma / Ngân Hạnh» and of the right column (bottom-right chip stands under the column's bottom).
- c-ipadAir-p1.jpg: «+4» bottom-left, names untouched.
- c-ipadPro-p1.jpg: «+4» bottom-left on 1366x1024.
Looked at all. Ngọc Thanh các with 6+ people is covered by the scan (all 14 places both pages), I looked at Đức Thọ cung shots only.

## Notes
- Where figures reach the stage edge the chip can sit near a foot (never on a name or column); scan does not test feet. Seen in shots: none overlapped.
