# app-edge report (17/11, branch review/app-edge, sha 5a842f58)
PRIORITY #1 CHECK: OD 0 (max-width) | main 15 | review/* 0 | claims 0. START_CTX ~5 %.

## Root cause
Host dev/site/rot.js geo(): ONE uniform scale s = min(W/DW, H/DH) on a fixed-width design canvas (590x852 portrait / 1180x820 spread), centred. Fold portrait 755x1000 is relatively wider than 590x852 -> s = 1.1737 (height fit), canvas 692 px, 31.3 px paper band each side (91.7 %). Not a CSS max-width.

## Fix (kit, one place)
geo(): scale stays the height fit (text/figures keep kit size); canvas WIDTH grows to ceil(AW/s), capped KIT_FRAME.maxGrow 1.7 x design. Fold: design 590 -> 644 px wide; frames/columns grow, nothing stretched. --kpage-w is now the real width. KIT.md section 0.0b added in place; rot.js header comment updated.

## Before / after (#krotf rect vs viewport)
| size | before band L/R | before app/vw | after band L/R | after app/vw |
|---|---|---|---|---|
| 755x1000@2 | 31.3 / 31.3 | 91.7 % | 0 / 0 | 100 % |
| 1180x820@2 | 0 / 0 | 100 % | 0 / 0 | 100 % |
| 1366x1024@2 | 0 / 0 | 100 % | 0 / 0 | 100 % (74.8 px spare strip on TOP, unchanged) |
| 412x1058@2 (rotated) | 0 / 0 | 100 % | 0 / 0 | 100 % |
| 390x844@3 (rotated) | 0 / 0 | 100 % | 0 / 0 | 100 % |
| 1024x768@2 | 0 / 0 | 100 % | 0 / 0 | 100 % (56 px strip on top, unchanged) |
Extra: 915x412 landscape and 1280x800 desktop also fill 100 % (spread grows); tabs looked at, no breakage.
Overflow/cut-text scan (tabs, 6 sizes): 0 page errors, 0 cut text, no horizontal scroll; hidden "pct" bar elements flagged identically before/after (not new). Fold home + 8 tabs looked at: OK (shots not committed).

## Open
- Dư đồ (map) belongs to review/map-full; it now gets a 644-wide canvas on Fold. Trial-merge with review/map-full NOT done (branch not fetched) — coordinator/reviewer please do before main.
- 4:3 iPads keep a spare strip at the TOP (not sides); unchanged.
- Rotated phones keep bands above/below the sideways frame (long axis capped); sides full.
- Gates: assemble.py OK, build_site.sh OK, quickcheck PASS (perf new/live medians: render 317/316, tab 359/321, buoi 1019/1034 ms; an earlier run 246/306, 310/330, 969/1015 — noise).
