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
