# b10-pose-eyes (W56, 18/11) — B10 set pose + closed-eye scan and fixes

PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 1 (fig-style-audit, audit only) | main 0 | review/* 0 | archive 0 (per brief). Rules read in full: START_CORE/WORKER/ART, FIGURE_GATE, consort-B10, b10-tools README, fig-style-audit. Nothing live touched (b10 only; no c03 file changed).

## Scan (768 PNGs c01–c32 × t1–t8 × v0/v1/v2, all downloaded and scanned)
- EYES: MediaPipe FaceLandmarker blink, 768/768 faces found. CLOSED (>=0.59 both eyes, all LOOKED at): c13 t1, t4, t7 x v0/v1/v2 = 9 files. Every other file blink <= 0.07 (clean gap, no borderline 0.15–0.5, no lowered-gaze cases).
- POSE: all 32 people looked at on 8-per-row contact sheets (24 per person) + zooms on suspects. SIDE (shoulders/torso turned ~70–90°): c13 t2, t5, t8 (x3 versions) and c14 t7 (x3). All other cells 3/4 or frontal.
- Table (only non-"3/4|frontal, open" rows; everything else = 3/4 or frontal | open | none):

| file(s) | pose | eyes | action |
|---|---|---|---|
| c13 t2 v0/v1/v2 | SIDE | open | pose regen (done) |
| c13 t5 v0/v1/v2 | SIDE | open | pose regen (done) |
| c13 t8 v0/v1 | SIDE | open | pose regen (done); **t8 v2 NOT touched (W55 redoing)** |
| c14 t7 v0/v1/v2 | SIDE | open | pose regen (done) |
| c13 t1, t4, t7 v0/v1/v2 | 3/4 | CLOSED | eye-only regen (done) |
| c14 t1, c15 t6, c16 t8 (v0–v2) | strongly turned 3/4 (~50–65°, face to viewer) | open | KEPT, flagged BORDERLINE for Foreman C/owner |

## Gens (all gpt-2-6, 2k, transparent, folder ba4aecfe…, refs = that PNG (image) + m09 eIyOFEidqL (style); 135 cr each; 20 gens x 135 = 2,700 cr; each PASSED first gen)
| figure | gens | blink after | pass |
|---|---|---|---|
| c13 t2 v0 v1 v2, t5 v0 v1 v2, t8 v0 v1, c14 t7 v0 v1 v2 (11) | 1 each | <=0.03 | yes (3/4, eyes open, costume/colour/pins/held item same, closed-lip smile, no cup) |
| c13 t1/t4/t7 x v0 v1 v2 (9) | 1 each | <=0.03 | yes (everything identical to old, eyes open) |
Gate checks by eye on old|new sheets: robe colour/cut/embroidery layout, pins, held item contrast, no phoenix t1–t6 (t5 none), t7/t8 phoenix kept, one held item.

## Prompts (verbatim)
POSE: "Semi-realistic painterly guofeng full-body standing figure, head to feet, centered, transparent background. Image 1 is the figure to copy: copy EXACTLY its face, hair, hair ornaments and headdress, costume (cut, layers, colours, embroidery layout, all flowers [and the phoenix, t7/t8] stitched directly into the silk as real hand embroidery, flat in the weave and folds, not appliqué), the held item in its contrasting colour, fabric material and stitching. Change ONLY the stance: she now stands in a natural 3/4 view facing the viewer, both shoulders and her face turned toward the viewer, lively relaxed pose with a slight turn, her hand interacting with the held item. Eyes open, soft warm round-almond eyes looking at the viewer, soft closed-lip faint smile, clean bare forehead. Skin, drawing style and fabric rendering like the style reference. One held item only, no cup."
EYES: "…Image 1 is the figure to copy: copy EXACTLY everything of image 1 — pose, face, hair, hair ornaments, headdress, costume (cut, layers, colours, embroidery stitched directly into the silk), held item, fabric material and stitching. Change ONLY the eyes: her eyes are now open, soft warm round-almond eyes looking at the viewer, natural gaze, soft closed-lip faint smile. Skin, drawing style and fabric rendering like the style reference."

## Uploaded (cdn_sync, md5 --check: 44/44 same). Base https://ctm-img.victoria-tntt.workers.dev/img/_review/
- New files overwrite the same names consort-tiers/c13/b10/c13_a18_tN_vK.png (N=1,2,4,5,7,8) and consort-tiers/c14/b10/c14_a18_t7_vK.png; old kept as c13_a18_tN_vK_prev_pose.png (t2,t5,t8) / _prev_eye.png (t1,t4,t7), c14 t7 _prev_pose.png.
- Row sheets rebuilt: consort-tiers/c13/b10/c13_b10_sheet.jpg, consort-tiers/c14/b10/c14_b10_sheet.jpg (c13 t8 v2 still the old file in the sheet).
- Before|after (top=before): b10-pose-eyes/before_after_1.jpg (c13 t2,t5), _2.jpg (c13 t8, c14 t7), _3.jpg and _4.jpg (c13 t1,t4,t7 eyes).

## OPEN / HANDOVER (for successor or Foreman C)
1. c13 t8 v2 (SIDE) + the scan of the files W54/W55 are redoing (c03 t6/t7/t8 v1, t8 v2 of every person): not scanned yet — ask Foreman C when uploaded, rescan (blink + look), regen if SIDE/closed. Thumbnails of the existing c03 t6–t8 v1 and all t8 v2 looked 3/4 + open.
2. Borderline kept: c14 t1, c15 t6, c16 t8 (turned ~50–65°) — Foreman C decides; each = 3 gens x 135 cr if redone.
3. Tools: scripts in /home/user/wt/w56-work (blink.py, sheet.py, cmp.py; ephemeral). mediapipe needs `apt-get install libegl1`.
4. Not live: b10 only; nothing else touched.

## § TAIL (W56b, 18/11) — the leftovers W56 listed
Rules re-read in full (START_CORE/WORKER/ART, FIGURE_GATE, consort-B10, b10-tools README, fig-style-audit). Nothing live touched; no c03 v1 file failed (c03 v1 t6/t7/t8 = W54's LIVE redo, scan only).
- SCAN: 32 t8 v2 (W55 final) + c03 a18 t6/t7/t8 v1 = 35 PNGs. EYES: MediaPipe blink on head crops, 35/35 faces found, all <= 0.10 (open). POSE: all 35 looked at on 8-per-row sheets. SIDE: only c13 t8 v2. All others 3/4 or frontal (c16 t8 v2 turned but face to viewer = BORDERLINE kept per Foreman C; c03 t6/t7/t8 v1 3/4 and open).
- FIX: c13 t8 v2 — 1 gen (gpt-2-6, 2k, transparent, refs = old PNG + m09 eIyOFEidqL style; the POSE prompt above verbatim, phoenix kept), 135 cr, PASSED first gen: 3/4 facing viewer, eyes open (blink L0.08 R0.20), same robe colours/embroidery/phoenix crown/pins/pink round fan, closed-lip smile, one held item, no cup. Old kept as c13_a18_t8_v2_prev_pose.png.
- Uploaded (curl -I 200 checked) under https://ctm-img.victoria-tntt.workers.dev/img/_review/ : consort-tiers/c13/b10/c13_a18_t8_v2.png, c13_a18_t8_v2_prev_pose.png, c13_b10_sheet.jpg (rebuilt, now all new), b10-pose-eyes/before_after_5.jpg (left = before, right = after).
- Total B10 pose/eye gens now 21 x 135 = 2,835 cr. B10 pose+eye scan is complete (768 + 35 re-scanned files). Remaining decision only: borderline c14 t1, c15 t6, c16 t8 (kept).
- No handover needed (context low).
