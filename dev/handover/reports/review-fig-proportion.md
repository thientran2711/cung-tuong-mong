SAMPLE READY v3 (Thai hau: v2 body proportion approved by owner, costume restored to Thai hau's own dress) — dev/handover/reports/fig-proportion/thaihau-sample-v3.jpg (old | A | B | c01 | c05). Numbers head share/chin-to-feet/w:h: A .160/.840/.334, B .161/.839/.327 (c01 .151/.849/.319). Method: body+face from v2 A, costume identity from OLD robe (deep amber/gold brocade, chest phoenix, crossed collar, layered outer robe, smaller phoenix crown). Cost 2x40 + 2x3.
SAMPLE READY v2 (Thai hau redo after owner REJECTED v1 as too long/head too small) — dev/handover/reports/fig-proportion/thaihau-sample-v2.jpg: old | A | B | c01 | c05, same scale.
v2 numbers (crown-top-to-neck share / chin-to-feet / width-height): old .207/.793/.811; A .160/.840/.329; B .162/.838/.343; c01 .151/.849/.319; c05 .173/.827/.363. Method v2: edit-from-consort (c01-t1-a51 as the body reference, old Thai hau as identity+costume), smaller crown, lighter layered robe. Colours came out paler than old (deepen on production). Cost 4x40 (2 failed thin v1b not used: 80) +... total this round 3x40+... see below.
SAMPLE READY (Thai hau, PRIORITY 1, per Foreman C 16:50Z) — dev/handover/reports/fig-proportion/thaihau-sample.jpg  (old | new | 2 consorts, same scale; Thai hau a51 width/height .811 -> .34 = consorts .32-.36, heads 4.84 -> 6.52 vs consort 6.62)
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

## Scope update (Foreman C 16:50Z, OD 16/11 16:45Z (4))
Priority 1 = redraw ALL Thai hau pictures (fig-thaihau-1/2/3, h1/h2/h3 x a18/a26/a36/a51 + any scene/event pictures showing her) with less bulky robes at consort proportion. Code scale: Thai hau is not in KIT_FIG.men so fac=1 like consorts, no code-side enlargement found. Then the rest of the list. Head:height numbers for every figure: audit-list.txt + dev/measure/fig_proportion.py output (to be attached in final report).
WAITING for the owner's verdict on the Thai hau sample.

## Thai hau complete picture list (Foreman C 16:55Z) — dev/handover/reports/fig-proportion/thaihau-all-pictures.txt
Full-body figures (15, all redraw): fig-thaihau-1/2/3, fig-thaihau-h1/h2/h3-a18/a26/a36/a51 (+ hd/ tn/ variants if present). Portraits por-thaihau-* / face-thaihau-1..6 (faces; re-cut from the new figures so face and body match). Scene/act/event pictures naming her (act-*-thai-hau*, act-*-th-*, ev-q72-th-*, ev-toil-th-*, info-thai-hau, thai-hau): to be LOOKED AT one by one when generation starts; any that show her bulky get redrawn. 
## Head:height table for EVERY figure: dev/handover/reports/fig-proportion/heads-table.csv (file, verdict, heads = body/head crown-inclusive, width/height, canvas)

v2 cost: 3 generations x 40 (1 thin-column try + 2 edit-from-consort) -> 2 used 'A/B' + 2x3 bg removal = ~ 246 credits incl. one discarded pair.

## PROGRESS 16/11 (after owner approved Thai hau v3) — WORKER HANDOVER (context rollover; Foreman C opens the successor)
DONE + on CDN (same file names, old files backed up in fig-proportion/old-backup/): 15 fig-thaihau-* (1,2,3,h1/h2/h3 x a18..a51), 15 por-thaihau-* (transparent bust, 384x506), 6 face-thaihau-1..6 (256x256). Sheets: thaihau-figs-before-after.jpg, thaihau-por-before-after-1/2.jpg, thaihau-por-new.jpg, thaihau-faces-before-after.jpg. Method: Magnific gpt-2-6 edit, refs [approved body = creation cpgdq7f0eP, old figure upload]; bg removed with images_remove_background; crop bbox; 900 px tall; per-figure ids in fig-proportion/magnific-ids.txt. Cost so far ~ 15x40+14x3 (figs) + 15x40+15x3 (por) + 6x40 (faces) + samples ~ 1,700 credits.
Honest notes: new Thai hau figs width/height .23-.33 (approved sample .334, consorts .32-.36): 9 of 15 are narrower than the approved A (h1-a18 .262, h1-a36 .272, h2-a51 .257, h3-a36 .263, fig 1/2/3 .23) = slimmer than the owner saw; head share .147-.160 OK. Offer to widen if she says thin. thai-hau.webp (128px crown icon) and info-thai-hau (screen painting without a person) NOT redrawn: no person.
STILL TO DO (successor): (1) 20 act-* + 7 ev-* scene pictures showing her (list: thaihau-all-pictures.txt): look at each (th/ downloads: curl https://ctm-img.victoria-tntt.workers.dev/img/<name>); those where she wears thick dark brocade (act-dang-len-thai-hau, act-doan-thai-hau-trong(-h), act-thai-hau-che-pho-truong, act-thay-mat-thai-hau, act-trinh-chung-cu-th, act-thinh-an-th, act-xin-thai-hau-hoc-cung, ev-q72-th-kinh2/mai/trungcuu, ev-toil-th-praise/scold) -> upload as reference, prompt 'same scene, same people and composition, only change the dowager's robe to a lighter, slimmer dress like image 2 (new Thai hau figure), nothing bulky', same size (384x506 / 640x480), look, CDN. Hand-only shots (-h variants) check by eye, likely OK. (2) the ~100 audit-list.txt figures (65 too short consorts/maids, 20 too wide princesses/others): same edit-from-approved-body method but with a consort/maid body reference and per-figure identity; (3) re-run dev/measure/fig_proportion.py on the CDN files, before/after table for the whole list; (4) final SAN SANG KIEM with sha of review/fig-proportion (descends from origin/main; contains only measure scripts + PROGRESS; pictures are on the CDN).
Tools notes: cdn_sync.py takes >2 min (run in background); never two copies; Magnific refs must be creation ids (upload CDN URL with creations_upload_image).
