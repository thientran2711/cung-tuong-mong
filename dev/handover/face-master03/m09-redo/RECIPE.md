# face-master03 M09 REDO — exact test recipe (Foreman D depth 8, session_01D3E3NYVxDQJ9mC1H8jFXgG, 25/11)
OWNER (verbatim, 25/11): "OK, vậy lấy hình M09 đi." (after seeing old / M09 / new-ref sheets). Earlier order (verbatim): "mình vẫn giữ prompt tả gương mặt như cũ nha, hông có sửa đổi. Mình chỉ có là đổi cái màu da lại, rồi, cái nét vẽ lại thôi." s58 full cheek = in her source (owner: "cái hình gốc của cổ là cái má của cổ cũng bị phồng rồi") → not a fault.

## Settings (unchanged from face-master03 run)
Magnific images_generate · mode gpt-2-6 · resolution 2k · aspectRatio auto (gives 2688x1520) · count 1 · no seed · no extraSettings · folder = account default (results landed personal).

## References — EXACTLY TWO, in this order
1. `{type:"image", identifier:<identity upload of the source>}` — same identity uploads as the face-master03 run (ids in reports/face-master03-<family>.md, "Identity uploads" sections).
2. `{type:"style", identifier:"eIyOFEidqL"}` — m09 = fig-maid-m09-a18-hd (uploaded 17/11). TYPE IS "style", not "image".
UPf76Ptwny (Face_Style_Master_No_Text) is NOT used.

## Prompt = the same file as the face-master03 run, with exactly these edits (old → new)
Ages 16/26/51/63: Prompts/FACE-REUSE-<FAMILY>-AGE<nn>-DUAL-MASTER-SKIN-BAREFACE-NOTEXT-03.txt. Age 39: age39-fix04/Prompts/FACE-REUSE-<FAMILY>-AGE39-DUAL-MASTER-SKIN-BAREFACE-NOTEXT-04.txt (as the run did).
1. (ages 16/26/51/63, as in the original run) delete exactly, with its leading space: " Reuse this full prompt unchanged for another individual in this family at this age; replace only IMAGE 1. Keep the same IMAGE 2. No manual text substitution or intermediate render is required." (age39-fix04 files were pasted whole in the run — apply this cut only if the sentence is present.)
2. Replace EVERY occurrence of `Face_Style_Master_No_Text.png` → `the m09 style image` (2 occurrences in the Alluring-16 file: INPUT line + "IMAGE 2, … is the SINGLE AUTHORITATIVE MASTER" line). Nothing else changed (skin wording, face, age, tilt lines all untouched).
Check len ≤ 10 000 (Alluring-16: 10023 raw → 9818 after cut → 9810 after rename).
Exact test prompt files: ALLURING-AGE16-03-cut.txt (after edit 1) and ALLURING-AGE16-03-cut-m09.txt (after edits 1+2 = what was sent).

## Test outputs (Alluring age 16) — cheek Lab b*/a* (lower = rosier; skin pixels L 55–90, a,b>4, central face box 40–60 % x, 30–62 % y)
| src | identity upload | M09 output | M09 b/a | old face-master03 b/a |
|---|---|---|---|---|
| s18 | LwtggCqswO | xS8gurHjfW | 0.66 | 1.07 |
| s34 | P3HNNsi42C | SyaOkP6Ub8 | 0.85 | 1.11 |
| s58 | vQzCEHRa47 | 9ZbRSzANYZ | 0.79 | 0.98 |
Non-circled old outputs on the Alluring-16 sheet measured 0.65–0.73. Script: the measure is reproduced in-line above (skimage rgb2lab).
Not chosen (for the record): owner style ref FACE-GENTLE-AGE16-STYLE-REF-01 uploaded WDUMGOLcXe as style → s18 nVgTAQkYQD 0.76, s34 9ZbRymeNYZ 0.97, s58 s7mwxDUl8e 0.86. Unasked test 8aRvpcLIrU (UPf76Ptwny + rosy wording) — discard. Total test spend 945 cr.

## Open owner question (asked 25/11, unanswered at push time)
Head tilt: every prompt keeps the source's head angle ("recognizable head bearing", "natural head bearing from IMAGE 1", "Preserve her natural head/shoulder angle"; Alluring all ages also "natural head tilt"). D proposed: 1 = replace only those lines with "head upright and facing forward, level eyes, straight shoulders" (recommended) / 2 = keep. Do NOT start the redo before her answer.
