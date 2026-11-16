SAMPLE READY — dev/handover/reports/fig-proportion/sample-sheet.jpg  (113 KB, before | after, 3 worst incl. Thái hậu)

# review-fig-proportion (art worker, Foreman C) — STEP 1+2 done, WAITING for owner verdict
Branch review/fig-proportion (measure scripts dev/measure/fig_proportion*.py). Full fix list: dev/handover/reports/fig-proportion/audit-list.txt

## Standard used (owner's own words)
OD:L177 women ≈ .79 of stage; men ×1.07 (OD:L167); kids .55+.03·age (KIT_FIG, jkit.js); OD:L1256/L1304 "smaller head, longer legs, taller slimmer like the maids"; OD:L949 "wide robe may be cropped, the person must be in true proportion".
Target: adult figure ≥ ~6 heads (body height / head height), silhouette aspect (w/h) ≲ 0.5.

## STEP 1 audit (1172 manifest figures + 183 NPC/special files measured; 9,961 more ty/tm/hd/tn variants of the same sheets NOT measured, they inherit their parent)
| category | count | numbers |
|---|---|---|
| OK | 1096 | consort heads 6.0±0.33, maid 6.55, aspect .32–.42 |
| SQUAT Thái hậu (all 15 files, 4 ages x 3 + 3 base) | 15 | heads 4.77–5.7, aspect .55–.81 (wide robe + big crown) |
| too short (consorts/maids/mama, mostly wide-robe tiers t1/t4) | 65 | heads 5.06–5.55 |
| too wide (adult princesses a20+/others) | 20 | aspect > .50, heads ≈ 5.8 |
| stretched in CODE | 0 found | kit-size worker measured aspect error 1.000; Thái hậu "squash" came from the narrow Tuần lục/ĐIỀU column (OD:L949, fixed by cropping) + picture itself being wide/short. |
| cropped | none: every file is a tight bbox of the figure, nothing cut at an edge by the file |
Limit: head size = automatic neck-width estimate (hats on eunuchs/men inflate it) — men/eunuchs judged by eye: fine (7–8 heads, hats).
"1.4 figure absurdly tall" is a frame problem (figure scaled by an oversized frame), not a picture problem → KIT REQUEST: none new; kit-size S/M/L/XL (review/kit-size, table in kit-size.md) already covers it; I will use only those sizes.

## STEP 2 sample (3 worst): Thái hậu h1-a51 (heads 4.84→6.52, aspect .81→.34), princess f03-a20 (5.81→7.44, .63→.39), consort c24-t2-a18 (5.06→8.18, .42→.38)
gpt-2-6, reference = old figure, same face / costume / colours, no rosy cheeks, bg removed with Magnific. Cost 6 generations x 40 + 3 x 3 = 249 credits.
Honest notes: Thái hậu robe is now slimmer (not spreading) — that is the fix she asked for, but it is a clear change of silhouette; princess lost her fan (hands folded); consort after is quite tall/slim (8.2 heads) — can be toned to ~7 if she prefers.

## After owner OK (not started): redraw the ~100 listed files (about 4,000 credits), keep file names/manifest keys, upload with cdn_sync.py, re-run the audit, before/after table.
WAITING.
