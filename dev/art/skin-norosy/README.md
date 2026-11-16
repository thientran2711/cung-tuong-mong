# skin-norosy — rosy-skin layer removed from every picture (owner 16/11 12:45Z)

Owner (verbatim): "Thôi tất cả các hình về bỏ cái lớp dòng đi, về cái B á." → option B for ALL pictures: no rosy-skin layer
(not kitFigLight, not room-light v2). Only the rosy layer is undone; huadian, makeup, outfit/pose edits, neck-wedge and edge fixes stay.

## What had the rosy layer
- Rosy pass 15/11 (dev/art/skin-smudge.py rosy() via scene-light/tools/hb.py): list dev/art/skin-rosy-fixed.txt = 954 por + 939 fig
  (15 figs MISS = never rosied, left alone).
- skin-match 15/11 (dev/art/skin-match, log/fix.jsonl): neck/hands of those pictures shifted to the rosy face (908 fig + 603 por) — undone too.
- Player look 1 (skin-match/player.py, log/player.log): 5 fig + 5 por.
- Derived copies: img/hd/<fig> (face-sharp HD twins, 389) and img/tn/<fig|por> (tn_make thumbnails, 140).
- Total CDN files replaced (same names): 1903 main + 389 hd + 140 tn = 2432 (log/files.txt).

## Method
1. unrosy.py (1631 files): D = Lab(current) − Lab(pre-rosy git copy, commit 3374e531 = last tree with img/ in git), pre re-registered
   (ORB similarity) when re-cut; keep only D inside the rosy envelope, smooth it, keep rosy zones (face/neck/hands), subtract.
2. unrosy_model.py (272 files whose pre copy no longer lines up / born after img/ left git): rosy() field rebuilt on the current
   pixels with the portrait's pre-rosy a*/b* (skin-rosy-fixed.txt / pre por), one calibration step so the measured face lands on its
   pre-rosy a*/b*; figures use their portrait's scale; neck/hands = logged skin-match shift with the opposite sign.
   Validated on 40 aligned files against the exact method: residual a*/b* ±0.3 (was +1…+3.6).
3. twins.py: same field on hd twins (resized), tn thumbnails re-made with tn_make's size/quality (TN.json untouched).
4. Encoding: WebP q95, q98/q100 only when head detail < 0.98 of the current file (log *.jsonl "sharp").
Result (log/face-after.txt, analyse() face median on all 952 measurable portraits): a* − pre-rosy a* median +0.1 (p10 −0.1, p90 +0.3),
b* − pre-rosy b* median 0.0 (before: a* +6.0).

## Never again
rosy() raises, hb.py A_LIM disabled, player.py raises (all print the owner rule). Note in dev/rules/topic/art-faces-figures.md (canon overwrite).

## Proof
proof-fold-755x1000.jpg — Ngọc Thanh các stage at Fold 755x1000@2, 5 pairs (player look 1 + consort c32-t2, player look 3 + maid m10,
consort c05-t4 + eunuch u20, maid m03 + man congtu-7, Thái hậu h2-a36 + kid p02-a14): left = rosy layer, right = removed. proof.js makes it.
