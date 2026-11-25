# Costume on an approved face — exact recipe (D depth 8, 25/11, output Ebc5JoSuuO)
STEP 1 face (jUIwiGBLD0): prompt Prompts/FACE-REUSE-ALLURING-AGE16-DUAL-REF-01-RESTORED-UPRIGHT-02.txt VERBATIM; refs [image LwtggCqswO = original s18, image UPf76Ptwny = Face_Style_Master]; gpt-2-6, 2k, aspect auto, count 1.
STEP 2 costume (Ebc5JoSuuO): prompt = owner CDA zip CDA-PROUD-SUMMER-KK07-R06-APPEAL-06-UPRIGHT-10.txt with exactly 2 edits:
 (a) line 1 "GENERATION MODE: Create one entirely new image from this complete text alone. No image inputs are supplied or required." -> "GENERATION MODE: Create one entirely new image. IMAGE 1 = the approved character in a close-up portrait: copy only her face, line work, brushwork, painting finish and skin color, never its head size or caption. Body exactly nine heads tall: small head, long legs."
 (b) deleted the line "IMAGE ID: CDA-PROUD-SUMMER-KK07-R06-APPEAL-06-UPRIGHT-10-IMG01" (10 000-char limit).
 refs [image jUIwiGBLD0 only]; gpt-2-6, 2k, aspectRatio 9:16 (auto gives landscape -> small figure), count 1.
Exact text sent: COSTUME-ON-FACE_KK07-R06_as-run.txt (9294 chars).

## Variant with M09 style (owner 25/11: "lấy thêm cái cô M09 để làm ảnh mẫu, màu da, phong cách vẽ … Vẫn giữ cái mặt này") → jUIwWm8LD0
refs [image jUIwiGBLD0, style eIyOFEidqL]; line 1 = "GENERATION MODE: Create one entirely new image. IMAGE 1 = the approved character (close-up): keep exactly her face, never its head size or caption. The style image (M09) sets skin color, line work, brushwork and painting finish. Body nine heads tall: small head, long legs."; rest identical to the as-run file. Face b*/a* 1.17 (vs 0.96 without M09) — slightly warmer; costume softer/pastel, less red, cloud shoulders smaller.
