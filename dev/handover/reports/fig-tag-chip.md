# fig-tag-chip — report (kit keeper worker)
Branch review/fig-tag-chip @ **d50c8e22f** (from main 64c39ca2). START_CTX ~3 %; no rollover.
PRIORITY #1 CHECK: figure tag = kitTitleOf tag from fig-feet-crop-2 (live bad6d59f) | review/*: none | claims: none. Existing kit part fixed, no new part.

## Root cause
The "green chip" is the title plate (kitTitlePlate «Trăng soi rèm ngọc», hiệu dh-nights) on line 1 of the stage name tag, so the tag is 3 lines (plate + rank + name) = 57 px. The tag hangs under the feet at floor+3 px, but the floor band KIT_SLOTS.band (jkit) was 50 px (sized for 2 lines): tag ended 9 px below the stage (iPad 1180x820 and Fold 755x1000). On phones tags wrap further (72–112 px) and were cut by up to 50 px.

## Fix (kit level, one place)
- jkit.js KIT_SLOTS.band 50 -> 64 (tallest plate tag + 3 px gap + air).
- j59.js: after the tag width (--j59sw) is set, if any visible tag is taller than band-5 (wrapped on phones) the floor for that stage is raised to tag height + 5 (FOX); never above need, figures keep the one kit scale, feet stay in view.
- KIT.md 33.12 "TAG BAND" note; CHANGE.txt line; scan dev/test/fig-tag-fit.js; fig-feet-fam.js got PLATE=1.

## Before / after (whole family)
| scan | before (band 50) | after |
|---|---|---|
| fig-tag-fit.js stage tags, 5 sizes (755x1000, 1180x820, 1366x1024, 412x1058, 390x844) x 8 origins (thd,tt,td,cnv,muoi,dtq,cn,bd) x 3 places x plate/plain, 588–592 tags | 358 cut (≤48 px; Fold 48, iPad 74, 1366 74, 412 78, 390 84) | **0 cut of 592** |
| PLATE=1 fig-feet-fam.js (dialogs, every person kind, all plate tags), 155 cases | – | 0 of 155 cut, 0 px |
| quickcheck.sh | – | PASS (old save ok, core gates PASS) |
Shots (scratch, not in git; looked at): iPad 1180x820 stage, Tuyết Mai with plate: plate, "Cung nữ", name all inside, shoes visible; Fold same (numbers: tag bottom 907 vs stage 912; iPad 759 vs 764).

## Notes
- Paged-out (swipe) tags are skipped by the scan (outside the stage horizontally).
- Plain 2-line tags also gained clearance (before: 1–8 px cuts on phones).

## CLAIMS
| claim | evidence |
|---|---|
| chip + rank + name inside the stage at every size | fig-tag-fit 0/592 |
| feet visible | fig-feet-fam PLATE=1 0/155; stage figure bottoms inside |
