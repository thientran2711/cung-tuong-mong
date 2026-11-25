# Costume on an approved face — exact recipe (D depth 8, 25/11, output Ebc5JoSuuO)
STEP 1 face (jUIwiGBLD0): prompt Prompts/FACE-REUSE-ALLURING-AGE16-DUAL-REF-01-RESTORED-UPRIGHT-02.txt VERBATIM; refs [image LwtggCqswO = original s18, image UPf76Ptwny = Face_Style_Master]; gpt-2-6, 2k, aspect auto, count 1.
STEP 2 costume (Ebc5JoSuuO): prompt = owner CDA zip CDA-PROUD-SUMMER-KK07-R06-APPEAL-06-UPRIGHT-10.txt with exactly 2 edits:
 (a) line 1 "GENERATION MODE: Create one entirely new image from this complete text alone. No image inputs are supplied or required." -> "GENERATION MODE: Create one entirely new image. IMAGE 1 = the approved character in a close-up portrait: copy only her face, line work, brushwork, painting finish and skin color, never its head size or caption. Body exactly nine heads tall: small head, long legs."
 (b) deleted the line "IMAGE ID: CDA-PROUD-SUMMER-KK07-R06-APPEAL-06-UPRIGHT-10-IMG01" (10 000-char limit).
 refs [image jUIwiGBLD0 only]; gpt-2-6, 2k, aspectRatio 9:16 (auto gives landscape -> small figure), count 1.
Exact text sent: COSTUME-ON-FACE_KK07-R06_as-run.txt (9294 chars).

## Variant with M09 style (owner 25/11: "lấy thêm cái cô M09 để làm ảnh mẫu, màu da, phong cách vẽ … Vẫn giữ cái mặt này") → jUIwWm8LD0
refs [image jUIwiGBLD0, style eIyOFEidqL]; line 1 = "GENERATION MODE: Create one entirely new image. IMAGE 1 = the approved character (close-up): keep exactly her face, never its head size or caption. The style image (M09) sets skin color, line work, brushwork and painting finish. Body nine heads tall: small head, long legs."; rest identical to the as-run file. Face b*/a* 1.17 (vs 0.96 without M09) — slightly warmer; costume softer/pastel, less red, cloud shoulders smaller.

## Owner prompt FACE-REUSE-ALLURING-AGE16-DUAL-VISUAL-ROSY-06 (25/11, run verbatim) → dtNm4CnXSL
refs [image jUIwiGBLD0 (= owner's left image, full-res original), image YMSDsAaWeC (owner's right "preferred" portrait, uploaded)]; gpt-2-6 2k auto. Cheek b/a 0.94, a* 12.7 (img1 0.96/11.4, img2 1.09/11.5). Result ≈ image 1 almost unchanged (same hair, pins, pose, framing); only slightly rosier cheeks/lips; image 2's painting look barely transferred.

## NEW STYLE MASTER TEST (owner 25/11: replace M09 / Face_Style_Master with her preferred Alluring-16 portrait, Magnific YMSDsAaWeC, 1024x1536)
Prompt = Prompts/FACE-REUSE-ALLURING-AGE16-DUAL-REF-01-RESTORED-UPRIGHT-02.txt with ONLY "Face_Style_Master_No_Text.png" (2x) → "the preferred style portrait". refs [image <original identity upload>, image YMSDsAaWeC]; gpt-2-6 2k auto.
s18 LwtggCqswO → 6AKGNfaiJO (a* 13.0, b/a 0.79) · s34 P3HNNsi42C → yiF3OvcPW9 (12.7, 1.02) · s58 vQzCEHRa47 → ksXlKMv16B (13.8, 0.81). Style master itself a* 11.5 b/a 1.09.
Result: painting/skin/pin of the master transferred strongly (rosy, soft, gold-branch pin), source hairstyle and face kept (s58 bun = her source), head upright, mark kept. Sent to owner; awaiting verdict.
