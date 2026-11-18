# live-open-eyes (W57 sonnet painter, 18/11) — DONE, READY for Foreman C look
PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 1 (fig-style-audit 17/11 list, reused) | main 0 | review/* 0 | archive 0 (brief line). Read in full: START_CORE/WORKER/ART, FIGURE_GATE, fig-style-audit, c03-a18-live, phoenix-t1t6-fix, b10-tools README.
Method (brief step 2): ONE gen per figure, gpt-2-6 2K transparent 1024x2304, folder ba4aecfe, refs = live img/hd image + style m09 eIyOFEidqL. Prompt: "Copy image 1 EXACTLY: same woman, pose, body, costume, colours, hair, headdress and hairpins, held item, age, fabric and silk embroidery, all identical. Change ONLY the eyes: both eyes OPEN, soft warm round-almond eyes looking at the viewer, never slanted/narrow/teary. Soft closed-lip faint smile, no teeth. Style/skin/fabric as style ref. Transparent." (c14-tcold gen2 adds "still holds the same small wooden bowl").
Check: MediaPipe blink (both eyes) + alpha IoU vs live (uniform scale, centred; same as iou2.py); every old|new sheet LOOKED at (full figure + face crop).
## Result: 54 figures, 58 gens, 58 x 135 = 7,830 credits. blink before 0.44-0.82 -> after <= 0.03 (all 54); IoU min 0.908, all >= 0.9.
First re-check: all 48 audit keys still closed in the live files (blink .46-.82; c03 a18 not in list). Borderline 8 looked at: INCLUDE 6 (c06-t6-a26 c14-t3-a51 c18-t1-a26 c22-t4-a36 c31-t2-a26 c31-t4-a36); LEAVE 2: c10-t6-a51 (lids low, blink .21/.36, gaze down, not closed) and maid-m32-ty1-a36 (open, blink .03).
Gate G: 50 figures PASS at gen 1; 4 needed gen 2: c14-tcold-a18 (gen1 dropped the wooden bowl), c18-t1-a26 + c14-t3-a51 (black speck / dark patch in hair ornament), m38-ty1-a51 (bun shape shifted). Final = gen 2 for these.
Review images (CDN, md5 verified 61/61, cdn_sync --check same): https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/<key>.png (key = fig-consort-cNN-tN-aNN / fig-maid-mNN-tyN-a51, 1024x2304 RGBA) and before_after_1..7.jpg (<=8 old|new pairs each, order = sorted keys): https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/before_after_1.jpg ... _7.jpg
## Table (figure | gens | blink L/R live -> new | IoU | link)
| figure | gens | blink live -> new | IoU | link |
|---|---|---|---|---|
| c01-t2-a51 | 1 | 0.54/0.7 → 0.01/0.01 | 0.977 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-consort-c01-t2-a51.png |
| c01-t4-a26 | 1 | 0.69/0.74 → 0.01/0.0 | 0.921 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-consort-c01-t4-a26.png |
| c02-t6-a36 | 1 | 0.54/0.65 → 0.01/0.01 | 0.947 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-consort-c02-t6-a36.png |
| c03-t1-a36 | 1 | 0.63/0.75 → 0.01/0.01 | 0.949 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-consort-c03-t1-a36.png |
| c03-t3-a51 | 1 | 0.62/0.75 → 0.01/0.01 | 0.991 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-consort-c03-t3-a51.png |
| c04-t6-a51 | 1 | 0.75/0.8 → 0.01/0.01 | 0.990 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-consort-c04-t6-a51.png |
| c05-t2-a36 | 1 | 0.67/0.77 → 0.01/0.0 | 0.981 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-consort-c05-t2-a36.png |
| c06-t6-a26 | 1 | 0.44/0.55 → 0.02/0.01 | 0.981 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-consort-c06-t6-a26.png |
| c07-t3-a36 | 1 | 0.67/0.75 → 0.01/0.01 | 0.908 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-consort-c07-t3-a36.png |
| c09-t2-a26 | 1 | 0.57/0.61 → 0.01/0.01 | 0.985 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-consort-c09-t2-a26.png |
| c10-t1-a51 | 1 | 0.65/0.76 → 0.01/0.01 | 0.977 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-consort-c10-t1-a51.png |
| c10-t3-a51 | 1 | 0.72/0.71 → 0.02/0.01 | 0.958 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-consort-c10-t3-a51.png |
| c10-t6-a36 | 1 | 0.74/0.75 → 0.01/0.01 | 0.971 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-consort-c10-t6-a36.png |
| c12-t2-a51 | 1 | 0.7/0.71 → 0.01/0.01 | 0.980 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-consort-c12-t2-a51.png |
| c12-t6-a36 | 1 | 0.48/0.5 → 0.01/0.01 | 0.973 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-consort-c12-t6-a36.png |
| c13-t1-a18 | 1 | 0.57/0.75 → 0.01/0.01 | 0.968 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-consort-c13-t1-a18.png |
| c13-t4-a18 | 1 | 0.63/0.77 → 0.01/0.0 | 0.972 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-consort-c13-t4-a18.png |
| c13-t7-a18 | 1 | 0.67/0.8 → 0.0/0.0 | 0.961 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-consort-c13-t7-a18.png |
| c13-t8-a26 | 1 | 0.73/0.74 → 0.01/0.01 | 0.985 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-consort-c13-t8-a26.png |
| c14-t1-a36 | 1 | 0.51/0.66 → 0.01/0.01 | 0.972 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-consort-c14-t1-a36.png |
| c14-t3-a51 | 2 | 0.54/0.67 → 0.01/0.01 | 0.968 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-consort-c14-t3-a51.png |
| c14-t4-a18 | 1 | 0.71/0.74 → 0.01/0.01 | 0.981 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-consort-c14-t4-a18.png |
| c14-t6-a18 | 1 | 0.67/0.75 → 0.02/0.01 | 0.984 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-consort-c14-t6-a18.png |
| c14-tcold-a18 | 2 | 0.65/0.69 → 0.01/0.01 | 0.982 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-consort-c14-tcold-a18.png |
| c15-t5-a18 | 1 | 0.69/0.79 → 0.01/0.01 | 0.969 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-consort-c15-t5-a18.png |
| c16-t2-a36 | 1 | 0.7/0.81 → 0.0/0.0 | 0.984 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-consort-c16-t2-a36.png |
| c18-t1-a26 | 2 | 0.62/0.78 → 0.01/0.01 | 0.942 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-consort-c18-t1-a26.png |
| c20-t2-a26 | 1 | 0.66/0.76 → 0.01/0.01 | 0.966 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-consort-c20-t2-a26.png |
| c20-t4-a51 | 1 | 0.64/0.77 → 0.01/0.01 | 0.962 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-consort-c20-t4-a51.png |
| c21-t1-a51 | 1 | 0.62/0.79 → 0.01/0.01 | 0.982 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-consort-c21-t1-a51.png |
| c22-t4-a36 | 1 | 0.48/0.68 → 0.01/0.01 | 0.983 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-consort-c22-t4-a36.png |
| c23-t2-a51 | 1 | 0.66/0.79 → 0.01/0.02 | 0.976 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-consort-c23-t2-a51.png |
| c25-t3-a36 | 1 | 0.6/0.7 → 0.01/0.0 | 0.981 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-consort-c25-t3-a36.png |
| c26-t4-a51 | 1 | 0.56/0.73 → 0.02/0.02 | 0.971 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-consort-c26-t4-a51.png |
| c27-t2-a26 | 1 | 0.46/0.58 → 0.0/0.0 | 0.968 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-consort-c27-t2-a26.png |
| c29-t1-a26 | 1 | 0.61/0.71 → 0.0/0.0 | 0.978 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-consort-c29-t1-a26.png |
| c29-t3-a36 | 1 | 0.61/0.7 → 0.01/0.01 | 0.964 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-consort-c29-t3-a36.png |
| c31-t2-a26 | 1 | 0.49/0.62 → 0.02/0.01 | 0.922 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-consort-c31-t2-a26.png |
| c31-t4-a36 | 1 | 0.45/0.63 → 0.01/0.01 | 0.989 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-consort-c31-t4-a36.png |
| m28-ty1-a51 | 1 | 0.7/0.82 → 0.01/0.01 | 0.967 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-maid-m28-ty1-a51.png |
| m28-ty2-a51 | 1 | 0.74/0.82 → 0.03/0.02 | 0.976 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-maid-m28-ty2-a51.png |
| m28-ty3-a51 | 1 | 0.72/0.82 → 0.02/0.02 | 0.961 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-maid-m28-ty3-a51.png |
| m33-ty1-a51 | 1 | 0.68/0.77 → 0.02/0.01 | 0.976 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-maid-m33-ty1-a51.png |
| m33-ty2-a51 | 1 | 0.7/0.77 → 0.01/0.01 | 0.985 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-maid-m33-ty2-a51.png |
| m33-ty3-a51 | 1 | 0.73/0.8 → 0.02/0.01 | 0.971 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-maid-m33-ty3-a51.png |
| m38-ty1-a51 | 2 | 0.68/0.81 → 0.01/0.01 | 0.988 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-maid-m38-ty1-a51.png |
| m38-ty2-a51 | 1 | 0.66/0.77 → 0.02/0.01 | 0.968 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-maid-m38-ty2-a51.png |
| m38-ty3-a51 | 1 | 0.71/0.82 → 0.02/0.02 | 0.927 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-maid-m38-ty3-a51.png |
| m43-ty1-a51 | 1 | 0.68/0.81 → 0.02/0.03 | 0.987 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-maid-m43-ty1-a51.png |
| m43-ty2-a51 | 1 | 0.62/0.81 → 0.01/0.01 | 0.976 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-maid-m43-ty2-a51.png |
| m43-ty3-a51 | 1 | 0.58/0.78 → 0.01/0.01 | 0.932 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-maid-m43-ty3-a51.png |
| m48-ty1-a51 | 1 | 0.75/0.73 → 0.01/0.01 | 0.969 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-maid-m48-ty1-a51.png |
| m48-ty2-a51 | 1 | 0.74/0.75 → 0.01/0.01 | 0.986 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-maid-m48-ty2-a51.png |
| m48-ty3-a51 | 1 | 0.69/0.75 → 0.01/0.01 | 0.983 | https://ctm-img.victoria-tntt.workers.dev/img/_review/live-open-eyes/fig-maid-m48-ty3-a51.png |
## Noticed, NOT fixed (brief: change only the eyes)
- Forehead marks (hoa dien) already in live and kept: consorts c07-t3-a36 c10-t1-a51 c10-t3-a51 c10-t6-a36 c12-t2-a51 c12-t6-a36 c13-t8-a26 c15-t5-a18 c16-t2-a36 c20-t2-a26 c20-t4-a51 c25-t3-a36 c29-t3-a36 c06-t6-a26, and a pale forehead mark on maid ty figures m28-ty1, m33-ty2, m38-ty2/ty3, m43-ty1/ty2/ty3 (FIGURE_GATE D2: no marks; maids never huadian).
- New eyes read slightly larger/brighter (doll-like) than the old closed-eye faces; round-almond, warm, per STYLE_ANCHOR. Head tilt is sometimes a little more frontal because the eyes now look at the viewer (silhouette IoU >= 0.9).
- Tiny residual dark spot behind the flower on c18-t1-a26 and in the tiara of c14-t3-a51 (also in/near the live originals' hair gaps).
- Maid ty figures are on the 570-figure sheer-look DRIFT list (fig-style-audit): the new copies keep that look as ordered.
## Next (Foreman C): LOOK at before_after sheets; if GO, live push per W53 step 2 (fig 900 / hd 1800 / por, fig-ht.json rows, mk-fit verify, manifest_guard --live-check; repo copies on review/live-open-eyes). por-<key> crops need re-cut too (por exists for live files). Work dir (may vanish): /home/user/wt/w57-work (new/*.png finals, gens.txt = key|upload id|gen id, tools/check.py sheet.py).
~100% xong (art generation + review upload); 0% live.
