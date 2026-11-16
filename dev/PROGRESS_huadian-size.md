# PROGRESS huadian-size (resume notes)
Owner size: 8.5% of face width, all tiers, consorts incl. promoted maids only (por/fig-{consort-c01..32,maid-m01..52}-t1..t8-a18/26/36/51 = 2688 por + 2688 fig; also img/tn (a18 t1-4, 336 files) and img/hd/fig (340)).
Status 16/11: NOT batched, nothing uploaded to CDN. Merged origin/main (tree = main + dev/art/huadian-size).
Done: all 5376 por/fig downloaded locally (work/, not committed); detector v2 `det2.py` (brow/hair-safe, anchored on ref.json cx/ey/fw);
run18.py -> det18.json on 672 a18 por: 13 None, roughly 10-15% visibly wrong boxes (faint/dark-ring marks pick hairline: e.g. c05-t2, c01-t1, c01-t7, c05 t1/t2, c06-t4, c07-t1 NONE) when eyeballed on sheets18.py contact sheets.
Old shrink.py with auto boxes EATS brows (tested c05 t5 a18/a51) - do not run batch.py (draft, uses old detect) unmodified.
Plan: (1) fix a18 por boxes: det2 + manual_boxes.json for the wrong ones (eyeball sheets, ~100); (2) for other ages/fig, restrict det2 to the a18 box (relative to cx,ey,fw) expanded 0.04fw; fig needs face scale ~0.52 of por (haar on 1.92x upscale);
(3) change shrink.py to take an explicit mask (not rectangle dE) so dark mark parts are scaled, brow pixels never; (4) target 0.085, leave marks <=0.088; (5) review sheets per tier x age; (6) cdn_sync of changed files.
