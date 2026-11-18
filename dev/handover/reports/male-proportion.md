# Male proportion standard ("nam mẫu") — W19, ROOT-15, 18/11

PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 | archive 0 — no male proportion standard exists. Related: origin/main dev/build/jkit.js KIT_FIG (men drawn 1.07 × the woman's skull-top→feet height), live male figures. START_CTX ≈ 6 % (own estimate).

## Result
Chosen: gen mERA0HNhJQ -> cut YMsSPlqWeC (768x2000 transparent) = nam_mau_fresh.png. Handsome ~20-year-old man, deep teal-blue crossed-collar robe, modest stitched embroidery, folded fan in one hand, topknot with a dark pin, bare forehead, no pink/purple.
Files (CDN, md5-verified, nothing live) under https://ctm-img.victoria-tntt.workers.dev/img/_review/male-proportion/ : nam_mau_fresh.png, nam_mau_vs_m09_scale.jpg (owner sheet: shared feet line, m09 skull top line, man skull top line 7 % higher, labels), nam_mau_overlay_m09.jpg (m09 silhouette over the man at game scale, feet aligned).

## Method
Magnific gpt-2-6, folder ba4aecfe…, 768x2000 2k, refs: m09 eIyOFEidqL (image + style), STYLE_ANCHOR prefix. 3 gens (240 cr) + 3 bg removals (9 cr); 1 gen left unused.
- Gen 1 KLDdIbykqp -> JNfu50vOq4: prompt "7.9 heads, head +3 %": head far too small (face/body 0.077, ≈ 13 face-heights tall). Rejected.
- Gen 2/3 (count 2, "face = one tenth of hairline→feet, 7.6 heads, shoulders 2.4 × face, waist 1.3 × face"): mERA0HNhJQ -> YMsSPlqWeC (chosen) and 1leBvwor4r -> IfiZWRntvE (face/body 0.086, rejected, crown closer to the top edge).
Lesson: the model needs "face = one tenth of hairline→feet"; "heads tall" wording alone gives a tiny head.

## Measures (Haar frontalface_alt2, median box over scales/neighbours; skull top = box top − 0.45 face h; feet = last alpha>40 row; head = skull→chin = 1.45 face h)
| | m09 | nam mẫu |
|---|---|---|
| face h (px, own file) | 166 | 168 |
| skull→feet (px) | 1776 | 1923 |
| face/body | 0.0935 | 0.0874 |
| heads tall | 7.38 | 7.89 |
| shoulder/face (alpha width at chin+0.6 face, includes upper sleeves — rough) | 1.96 | 2.60 |
Game scale (man skull→feet = 1.07 × m09): face height man = m09 +0.0 % (target +3 %, inside the ±3 % tolerance). Man heads tall 7.89 (target 7.75–8). Face/body 0.0874 = 0.935 × m09, as expected for a 1.07 × taller body with the same face. Shoulders measured wider than 2.4 because the row also takes in sleeve tops: visually they are clearly broader than m09 (overlay: m09 silhouette fits inside the man's shoulders). Waist ≈ 1.3 × face by eye, not scripted.
Weak points: headroom only 32 px above the topknot (pin tip); sleeves very wide/long (as m09-style sleeves). If a larger head (+3 %) is wanted, one more gen is possible (budget left: 1).

## For the kit
Men (emperor, eunuch, official, physician, man, princes) = this proportion: scale skull top → feet = 1.07 × the woman; face h at that scale ≈ the woman's.

## v2 — W22, 18/11 (head too narrow → redraw) — RESULT: FAIL on face height after 6/6 gens (best = g4, honest report)

PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 | archive 0 — reuse W19 standard (YMsSPlqWeC). START_CTX ≈ 8 % (own estimate). FIGURE_GATE A8 text was not yet in the fetched copy; task text used.
Files (CDN, md5-verified, nothing live) img/_review/male-proportion/: nam_mau_v2_fresh.png (= g4, cut, 768x2000), nam_mau_v2_vs_m09.jpg (m09 | man at game scale on red lines, man skull-top line 7 % higher, head-width crops with cheek lines).
Tool: face mesh (lm10→152 = F, cheek lm234↔454, skull top = y10−0.30F, same as overlay_m09.py). Man scaled so skull→feet = 1.07 × m09. Heads = skull→feet / (1.45 F) (m09 = 7.7 in this metric).
| gen | prompt dial | heads | face h vs m09 | head width (cheek) vs m09 | neck | pass |
|---|---|---|---|---|---|---|
| old nam mẫu (W19) | – | 8.54 | −3.1 % | −2.7 % | – | no (narrow) |
| g1 (w4vEAdZ7EI→gOtaR1ESXO) | "7.8 heads, wide head" | 9.10 | −9.1 % | −5.9 % | – | no |
| g2 (p8O9ELxehw→Ifi25e4tvE) | same | 8.64 | −4.2 % | −1.6 % | – | no |
| g3 (s78h39hl8e→N2HKVEx6D9) | "7.2 heads, face = 1/9" | 7.61 | +8.7 % | +11.1 % | thick | no (face too big) |
| **g4 (w4vEGRs7EI→3z5rpHbREY)** | same | 7.64 | **+8.3 %** | **+13.2 %** | thick (see sheet) | no (face +8.3 > +3) |
| g5 (jUBt6CMLD0→Bh93bvroQR) | "7.6 heads, face = 1/10" | 8.80 | −6.0 % | −3.9 % | – | no |
| g6 (8a6Z5YiIrU→lJIvZyzgv9) | same | 8.83 | −6.3 % | −6.5 % | – | no |
Credits: 6 gens × 40 = 480 + 6 bg removals × 3 = 18 → ~498 cr (3 calls count 2). Gen count 6/6 (max reached, loop stopped).
Result: head width and neck now clearly ≥ m09 (cheeks +13 %, neck visibly thick, shoulders broad), the "narrow head" complaint is fixed, but the face is +8.3 % taller than m09 — over the 0…+3 % target and over ±3 % tolerance; heads 7.64 (target 7.75–8). The model answers prompts in two clusters (head ~ −5 % or ~ +8 %), nothing in between; "7.2 heads/face 1/9" → big, "7.6/face 1/10" → small.
Weak points: (1) face +8.3 %; (2) neck measured by skin mask is unreliable under the collar (judge on the sheet); (3) robe/pose are the W19 pattern (fan, wide sleeves). Not wired anywhere.
Suggested next (not done, budget spent): ONE more gen with "7.4 heads / face = 1/9.6" between the two clusters, or owner accepts g4 (face +8 %) as "bigger-headed man" (tolerance decision is hers). Measure/sheet scripts: kept in W22 worktree only (neck skin-mask is rough).

## v3 — W22, 18/11 (owner: "Người nam thân mập quá" → slimmer body) — RESULT: PASS (best h1, gen 2 of 6 in this round)
PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 | archive 0 — reuse v2 g4 head (ref w4vEGRs7EI) + m09 (eIyOFEidqL). Prompt: slender athletic, narrow waist, fitted robe with slim sash, slim straight skirt, slim moderate sleeves, ~7.5 heads, face ≈ 1/9.5 of height.
Files (CDN img/_review/male-proportion/, md5-verified, nothing live): nam_mau_v3_fresh.png (= h1, cut 768x2000), nam_mau_v3_vs_m09.jpg (m09 | v2 g4 | v3 on the same red lines, man skull-top line 7 % higher, head-width crop row with cheek lines).
All values at game scale (man skull→feet = 1.07 × m09), alpha width at fixed body fractions (includes sleeves/arms, so waist/hip are silhouette widths, not tissue):
| | heads | face h | head width (cheek) | shoulder (17 %) | waist (38 %) | hip (50 %) | hem (90 %) | pass |
|---|---|---|---|---|---|---|---|---|
| v2 g4 (fat) | 7.64 | +8.3 % | +13.2 % | +59 % | +42 % | +92 % | +44 % | no (face; owner "mập") |
| **v3 h1 (chosen)** | 8.13 | **+1.8 %** | **+6.6 %** | **+34 %** | **−5 %** | **+8 %** | −23 % | **yes** |
| v3 h2 (alt, VXwyQWIMMU→8a6ZxsuIrU) | 7.95 | +4.1 % | +8.9 % | +30 % | −6 % | +3 % | −22 % | yes |
Gens this round 2 (160 cr) + 2 bg removals (6 cr) = 166 cr; total W22 8 gens, ~664 cr (FIGURE_GATE G cap of 6 counted per round).
Reading: face h inside 0…+5 %; head wider than m09 (+6.6 %); shoulders clearly broader (+34 %); waist/hip silhouette now equal to m09's (no bulk); neck visibly at least as wide as m09's in the crop row (skin-mask neck number unreliable under collar, judged on sheet). Hem is 23 % narrower than m09's flared skirt by design (straight skirt, owner wants slim).
Weak points: heads 8.13 (a touch over 8); sleeves/skirt are plain, embroidery sparse (slim version; richer border/sash can be added in the costume pass); face drifted slightly toward v2 g4 (same man).

## v4 — W22, 18/11 (owner: v2 "mập quá", v3 "ốm quá" → in between; then "vẽ sao thì vẽ, đẹp là được") — RESULT: PASS (best k1)
PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 | archive 0 — reuse v3 slim (WDlwfGTcXe) + v2 g4 (w4vEGRs7EI) + m09 (eIyOFEidqL) as refs. Tolerance ±5 %, D4b soft closed-lip smile (all three show a faint closed smile).
Note: the first v4 call was interrupted client-side but DID run: 3 gens (0eSJFNnTfW, UPhC0qFwny, iGb18lQ3uK) found in the folder, looked at, cut (DoJ4LCLpcl, YMsU5tuWeC, rgd8cNIxtc) — counted as the v4 round (3 gens).
Files (CDN img/_review/male-proportion/, md5 OK, nothing live): nam_mau_v4_fresh.png (= k1), nam_mau_v4_vs_m09.jpg (m09 | v2 | v3 | v4 on the same red lines, numbers printed under each man, head-width crop row).
Game scale, alpha widths at 17/38/50/90 % of body (include sleeves/arms):
| | heads | face h | cheek | shoulder | waist | hip | hem | verdict |
|---|---|---|---|---|---|---|---|---|
| v2 g4 | 7.64 | +8.3 % | +13.2 % | +59 % | +42 % | +92 % | +44 % | too fat |
| v3 h1 | 8.13 | +1.8 % | +6.6 % | +34 % | −5 % | +8 % | −23 % | too thin |
| **v4 k1 (chosen)** | 8.13 | **+1.8 %** | **+6.0 %** | **+45 %** | **+10 %** | **+19 %** | **+13 %** | **pass** |
| v4 k2 | 8.05 | +2.8 % | +7.9 % | +45 % | +16 % | +18 % | +9 % | pass, a bit fuller |
| v4 k3 | 8.10 | +2.2 % | +6.4 % | +39 % | +7 % | +14 % | +5 % | pass, closest to v3 |
Waist +10 % is inside the asked +8…+12 %; shoulders +45 % (asked +30…35 %, slightly broader = "well-built"); cheek ≥ m09; neck visibly ≥ m09 in the crop row (not scripted). Medium sleeves, skirt with gentle folds, embroidered cuffs/collar/hem. Handsome, same man.
Credits this round: 3 gens 120 + 3 cuts 9 = 129 cr; W22 total 11 gens, ~793 cr.
Weak points: heads 8.13 (a touch over 8); shoulders +45 % > asked range; hip +19 % comes with the fuller skirt; embroidery still modest. Alternatives k3 (leaner) / k2 (fuller) available in the folder.

## prompt-only man — W26, 18/11 (owner ~04:40Z: "Người nam quá xấu. Bỏ tỉ lệ. Chỉ prompt vẽ hình người nam thôi")
PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 1 (W22, dropped) | main 0 | review/* 0 | archive 0 — nothing to reuse except STYLE_ANCHOR. No m09 ref, no proportions, no overlay gate.
Model gpt-2-6, folder ba4aecfe…, 768x2000, count 2, ONE call = 2 gens. Refs (rendering only): face-consort-01 as style + 05/12/18 as image (gpt-2-6 allows only 1 style ref).
Prompt: STYLE_ANCHOR prefix verbatim + "One very handsome young man of about 20, romantic-lead looks like a handsome Chinese costume-drama lead, refined gentle face, soft warm almond eyes (never slanted narrow, never sad), bare forehead, elegant black hair gathered in a topknot with a small jade-and-gold guan hair crown and a hairpin, wearing a crossed-collar robe of fine embroidered silk in deep teal with ivory inner collar and gold thread embroidery on collar, cuffs and hem, a sash with a jade pendant, holding a folded paper fan naturally in one hand, full figure head to feet visible. The reference portraits are for rendering style only; draw a man."
Result: both gens handsome, closed-lip faint smile, warm almond eyes, bare forehead, teal silk, fan. Chosen g2 (warmer smile, fuller brows, more manly). Other (g1, cooler/softer) dropped.
Files (CDN img/_review/male-proportion/, md5 OK, nothing live): man_prompt_fresh.png (cut, 768x2000), man_prompt_sheet.jpg (figure + face crop at 100%).
Credits: 2 gens 160 + 1 cut 3 = 163 cr. Gens: 2 of max 6.
