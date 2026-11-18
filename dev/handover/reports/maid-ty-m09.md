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

## HANDOVER (W13, 18/11 ~00:50Z, context ~35 % of window; start ~0 %). ROOT-13 opens the successor when the maid job resumes; worker does not.
STATE: HOLD. Owner order chain: v2 approved (21:xx) -> mass run stopped by owner -> body spec (skull top -> feet 7.5 heads, face hairline->chin 0.102 x hairline->feet, shoulder tip-to-tip 2.0 x face height, waist ~1.15 x face height) -> base-body method (b) dropped by owner, no post-processing (c) -> prompt calibration (a): v23 best, face -5/-6 % vs m09 (gate 3 %) not met -> ROOT-13: HOLD until the consort proof (c05/c12) owner verdict; the maid trung y redo follows the approved method. Nothing of this job is live. 681 keys (RESTORE_TY_TABLE.tsv) all still the W12 interim restore.
FILES (all on this branch, dev/handover/reports/): maid-ty-m09.md (this), maid-ty-m09-B01-measure.tsv, fig-cutout-clean/{PROMPT_TEMPLATE.txt (v2), PROMPT_V21.txt (v2 + skull-top 7.5), PROMPT_V21_IDTEST.txt, manifest.json (681 rows: key, sheet id, colno, colour, age text, pose rotation of 8), headsheet.py, overlay.py (50 % anaglyph vs m09), measure.py (auto measure NOT reliable, use eye+ruler)}. Scratch /tmp is gone with the container; everything needed is above.
MAGNIFIC (folder ba4aecfe-efce-47e2-b53f-30d292091886, gpt-2-6, images_generate with width/height): style ref eIyOFEidqL (m09 hd 1800 px); old figure refs are re-uploaded per run with creations_upload_image of https://ctm-img.victoria-tntt.workers.dev/img/fig-maid-<mNN>-<aAA>.webp (FULL-BODY, never por). Sheet ids per key in manifest.json (readable with creations_read). Python urllib gets 403 from the CDN: use curl.
CDN review files (img/_review/maid-ty-m09/): v1 samples fig-maid-m09-ty1-a18 / m44-ty2-a26 (owner-approved v2 look), m04/m05/m06/m10 samples, m01-ty1-a18 ... B01 singles, v21-*, v22-*, v23-* + overlays. Wipe with cdn_sync --wipe-review maid-ty-m09 when the verdict is in.
BEST PROMPT SO FAR = v23: v2.1 text with PROPORTIONS replaced by "measured from the top of the SKULL ... exactly 7.0 heads tall; her head and face are exactly as large as reference 1's head and face (same face height relative to the body); ... not squashed, no small head", tall canvas 1024x2304 "with generous empty space above the head", refs [eIyOFEidqL, sheet, face fig], + embroidery rule for any fabric pattern. Model lands ~0.5-1 head taller than asked (7.5 -> ~8.2; 7.0 -> ~7.5): a 6.5 test is the only untried lever.
LESSONS: close-up por as face ref -> oversized head; a generic "neat bun" clause collapses identity to one face (owner: ignore face similarity); without the hairpin sentence a horizontal stick juts out; the style ref's pink flower and hairpin get copied unless forbidden; batch sub-agents must not run before the owner approves 3-4 consecutive matching figures (credits spent on B01 ~5.5k never used); never rebase this worktree onto the branch (its history is shallow/divergent): checkout --detach origin tip, copy files, commit, push.
CREDITS: ~8k total (B01 aborted 5.5k scratch-only, samples/tests ~2.5k).
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
