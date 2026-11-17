# fig-feet-crop-2 — report (kit keeper worker)
Branch review/fig-feet-crop-2 @ **c269e2fc9** (from main 7abaf07ac). START_CTX ~3 % (own estimate); no rollover needed.

## Root cause
Not kitDpFit (the 32.7 column never cut). The VIỆC dialog goes through the live v3 frame (kitFrameLive3, jksize): .dlg.kszlive has max-height + overflow hidden. At size XL (fh 480) the figure column (tag + body) + header + padding is taller than the cap (574 px); kitFrameFitsLive3 returns true for XL without checking the cap, so hem/shoes and the last option card were clipped. fig-cutout-code-r2 only covered the legacy kdper path.

## Fix (kit level, one place)
jksize.js kszFeetFit (first step of kitFrameApplyLive3): room = cap − header/buttons − padding; the figure is scaled down (dlg.__kszShrink, read by kszFigFit) only when it would be cut; never cropped. KIT.md 32.8.
Add-on (owner 17/11 "Kính sự phòng là cái phẩm hả?", OD:L1351): j79 kitTitleOf = the one rank source (kitTitle, else title words at the start of the name); kszRankName + kitName use it; the ksp office override (KIT_SIZE.v3.office) deleted. KIT.md 48.2.

## Before / after
| scan | before (main 7abaf07ac) | after |
|---|---|---|
| dev/test/fig-feet-fam.js, 5 sizes (755x1000, 1180x820, 1366x1024, 412x1058, 390x844), 31 cases each | 33 of 155 cut, 12–87 px (eunuch/timed 39–87, emperor 12.6, man 14.4, mama/maid/consort 14) | 0 of 155, 0 px |
| dev/test/tag-rank-scan.js (every person kind) | 13 of 48 FAIL (ksp line 1 = "Kính sự phòng"; men/children/npc rank merged into the name line) | 0 of 49 |
| timed-choice-fit (755x1000, 1180x820) | ok | ok |
| quickcheck.sh | – | PASS (old save ok, core gates PASS) |
Shots (scratch, not in git; looked at): VIỆC Kính sự phòng timed dialog on Fold 755x1000 and iPad 1180x820: shoes fully visible, all 3 option cards visible, tag "Thái giám" / bare name.

## Notes
- fig-feet-fam skips the one-option case (S layout shows a portrait pendant, no full figure).
- The figure shrinks only when needed (brief allows it); the 574 px frame cap itself is unchanged.

## CLAIMS
| claim | evidence |
|---|---|
| feet never cropped in any figure dialog | fig-feet-fam 0/155 |
| tag line 1 = rank, line 2 = bare name | tag-rank-scan 0/49 |
