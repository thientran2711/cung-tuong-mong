# pose8-sample (W108) — 8 ranks = 8 different poses, c06 + c25, a18 v0, t1 t4 t5 t6 t7 t8

PRIORITY #1 CHECK: ROOT-31 order (owner ~21:45Z: "8 bậc phải là 8 cái tư thế, 8 cái tương tác với đồ cầm tay khác nhau"); build.py tip 79d3a379; FIGURE_GATE D3/3d/3e/3f + consort-B10 re-read basis; golden + test_low_all.py unchanged (OK 2304 builds, golden c06 byte-identical without the flag).

Sheet (row c06, row c25; cols t1 t4 t5 t6 t7 t8): https://ctm-img.victoria-tntt.workers.dev/img/_review/pose8-sample/sheet.jpg
Raws (512x1152 jpg, background kept, NOT cut: sample only): img/_review/pose8-sample/<cNN>_a18_t<N>_pose8_raw.jpg. Head refs: head-c06.jpg head-c25.jpg.
gens = 12, regens = 0 (12/12 pass: item per prompt, hand grips/touches it, face fully visible, lips closed, no forehead mark, eyes open, full body, standing).

## What changed (build.py, flag `--pose8`, everything else byte-identical)
Cause confirmed: every builder pasted the SAME pose paragraph ("calm standing pose ... held below the chin ... head up facing the viewer") + per-item hand templates ending "body turned slightly three-quarters", and ref 1 was her full-body t1 figure (b10/<cNN>_a18_t1_v0.png), so the model copied the stance.
1. `POSE8` table (build.py): one full-body pose per rank t1..t8, each with its own body action AND its own way of using the item:
 t1 gentle half-step forward, item carried low at the side | t2 weight on one hip, item at hip turned out | t3 item raised to shoulder height BESIDE the face | t4 body turned away, head back over the shoulder, item at waist | t5 chest open, item lifted and turned to show it, other hand raises a wide sleeve | t6 slight forward bow, item offered on both open palms | t7 slow turn, skirt swinging, item held out to the side | t8 perfectly still frontal formal stance, item centred in both hands at chest.
2. The shared Pose paragraph (incl. "held below the chin" and the hand templates) is REPLACED only when `--pose8` is given; item text still comes from the 3f list of that rank. Added: "Never copy the pose of any reference image: the pose is exactly as described here."
3. Identity ref = HEAD/SHOULDERS CROP of her t1 (c06 (480,0)-(1180,640) with the fan edge painted out; c25 (290,0)-(800,470)), uploaded as face-cNN-head.jpg; style B kspkwKx16B; t6 + swatch 3zKATAQREY. No full-body ref any more.
Usage: `python3 build.py cNN --low N v0 --pose8` (t1-t6), `cNN --t7 v0 --pose8`, `cNN v0 --pose8` (t8). t2 and t3 poses defined but NOT sampled (t2/t3 stopped).
Items used: c06 book | hand mirror | lantern | round jade fan | censer | gold ruyi. c25 basket | book box | coral-bead tassel | white-jade ruyi | jewel casket | seal box.

## Limits seen
- Same pose kind may still repeat when two ranks hold the same item kind; table is per rank so poses stay distinct.
- t1 sentence mentions basket/lantern hanging; harmless for a book. Wording can be trimmed per item if the owner wants.
- The head-crop ref carries her colours only in the collar; the prompt still states the ORIGINAL robe colour as "image 1": colours came out right in all 12.
~100% xong (sample) / owner verdict pending.
