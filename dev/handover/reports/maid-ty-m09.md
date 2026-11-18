# maid-ty-m09 report (W13) — owner-approved v2 recipe, FROZEN

PRIORITY #1 CHECK: OD 17/11 21:10Z+ (brief maid-ty-m09) | main FIGURES-servants / jty.js TY_COL | review/* none | claims W12 restore (interim) + W2e consort-ty

Owner OK (verbatim, via ROOT-11): "Ok, trung y cung nữ mẫu mới đẹp. Đó, ít nhất nó phải như vậy. Tức là bây giờ mày phải lấy đúng cái prompt như vậy là được. Ok, duyệt."
Approved samples (v2): img/_review/maid-ty-m09/fig-maid-m09-ty1-a18.webp, fig-maid-m44-ty2-a26.webp (Magnific gens 8a6NdfHIrU, WDlsGdjcXe).

## FROZEN PROMPT (only {COLOUR} {COLNO} {AGE} {POSE} vary; file PROMPT_TEMPLATE.txt)
Magnific gpt-2-6, aspect 9:16, 2k, folder ba4aecfe-efce-47e2-b53f-30d292091886. References (type image, in this order): 1 = eIyOFEidqL (m09 style ref, 1800 px); 2 = the original sheet id of the key (design/colour); 3 = Magnific upload of the FULL-BODY face fig https://ctm-img.victoria-tntt.workers.dev/img/fig-maid-<mNN>-<aAA>.webp (never a por/close-up: that made the head too big). Fresh gen per key (no previous gen as ref).
Template: see PROMPT_TEMPLATE.txt (copied to fig-cutout-clean/). Variables per key in manifest.json (681 rows: key, sheet, colno, colour, age text, pose rotation of 8).
Colours: ty1 ivory, ty2 pale sage-green, ty3 pale blue, ty4 pale powder-pink, ty5 pale lavender-purple, ty6 pale rose-red, ty7 pale amber-orange, ty8 pale yellow (jty.js TY_COL).
Cut-out: images_remove_background; finish: FORCE_HD=1 python3 -I fig-cutout-clean/tools/finish_fig.py MASTER.png maid-mNN-tyN-aAA OUT (fig 900 + hd 1800 + por 384x506 geometry from the old twins).
Measure: top 330 px of every hd at 1800 tall with guides (tools/headsheet.py): ref m09-a18 crown 5 -> chin 245 = 240 px (0.133); accept chin 233..257 (+-5%); reject otherwise.
Look at every image. Reject: closed eyes, forehead mark, grey/dark face shading, hair stick jutting, flower in hair, teacup/teapot, gloss satin, wrong colour, cut feet, oversized head.

## Status
STEP 1 done (2 samples, owner approved). STEP 2: batches of ~40 keys; 4 singles per batch to ROOT-11 before upload.

## 17/11 ~21:50Z STOP + re-sample
Owner (verbatim via ROOT-11): "Hãy khoan vẽ hàng loạt đã ... Đợi đến khi nào mà tôi đã duyệt đủ dáng và gương mặt, và khi tôi thấy bạn sản xuất liên tục được 3 4 người liên tục nhìn giống với cái dáng mà tôi ưng đó, rồi lúc đó hãy sản xuất hàng loạt."
STEP 2 batch B01 (keys 1-40 = maids m01-m03) was stopped mid-run: 40 gens + ~38 cut-outs (~5.5k credits), NOTHING uploaded to live. 39 finished locally, measured: maid-ty-m09-B01-measure.tsv (hairline/chin read by eye on a 10 px ruler at 1800 tall; ref m09 0.099; B01 mean 0.097, range 0.088-0.100).
Also made 4 other-maid samples (m04 ty5 a18, m05 ty2 a26, m06 ty3 a36, m10 ty1 a51) -> _review; ratios 0.098/0.101/0.103/0.095.
FAULT FOUND: faces of m01/m02/m03 look almost identical (style ref dominates identity) -> identity must be strengthened before any mass run.

## 17/11 ~22:15Z v2.1 (no gens) + measurements
Owner rule (via ROOT-12): body measured from SKULL TOP (not bun/pins) to feet = 7.5 heads, same px for everyone; buns/ornaments are extra height; never shrink the body to fit them. v2.1 = v2 with that sentence replacing the PROPORTIONS sentence (fig-cutout-clean/PROMPT_V21.txt). Owner 23:30Z: face similarity ignored ("kệ đi"); costume, hairpins, BODY must look the same. Identity test variant (face fig as ref 1) kept for reference only: PROMPT_V21_IDTEST.txt (2 gens, m02/m03 ty1 a18, used for measuring).
Measurement (px at 1800 tall, by eye on a 10 px ruler): see message to ROOT-12; B01 bodies measure ~8.1-8.6 heads (skull->chin 205-218) vs spec 7.4-7.5 (ref 239): the prompt sentence "1/7.5" yields ~8 heads, heads ~10 % too small, shoulders ~1.5-1.8 face-heights vs 2.0.

## 17/11 ~23:15Z v2.2 tall-canvas tests (owner: (b) base-body dropped, no post-processing; (a) prompt calibration)
Test keys m02-ty1-a18 / m03-ty1-a18, refs eIyOFEidqL (m09 hd), sheet, face fig; 1024x2304 canvas with headroom; singles + 50 % overlays in img/_review/maid-ty-m09/v22-*, v23-*.
v22 (v2.1 sentence '7.5 heads from skull top'): face (hairline->chin) m02 155, m03 152 vs m09 172 (-10 %/-12 %) FAIL.
v23 (v22 + '7.0 heads' + 'head and face exactly as large as reference 1'): m02 ~163, m03 ~165 vs 172-173 (-5 %/-4.6 %), gate 3 % still not met; stopped per order, no more gens. Prompt delta recorded in the messages to Foreman C.

## 18/11 ~00:33Z owner rule (via ROOT-12, 04:05Z)
Any flowers/patterns on fabric must read as real silk EMBROIDERY (fine satin-stitch threads stitched into the cloth, following the folds), never pasted/printed/AI-looking. Add to the frozen prompt for any future gen (trung y is plain, so it only matters for held props/accents and the consort-tier reuse of this prompt): sentence to append to DESIGN: "any flower or pattern on the fabric is real silk embroidery: fine satin-stitch threads stitched into the cloth, following the folds, never printed or pasted-on".
