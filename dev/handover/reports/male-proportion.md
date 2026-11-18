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
