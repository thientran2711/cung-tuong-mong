# PROGRESS · review/por-scale (portrait face scale per group)

Owner 15/11 ~19:05Z: young-boy portraits, some big-face close-ups, the rest small faces → re-crop (no redrawing) so faces match;
then the WHOLE CLASS: inside each group of people every `img/por-*` portrait shares one face scale + head position.
Coordinator 15/11: sons and daughters are ONE group (the Hoàng tự list mixes them) → `children` on the boys' big-face target.

## Tools (dev/figwork/porscale/, work files in `_work/`, git-ignored)
- `fetch.py <list> <dir>`: download CDN keys (threaded).
- `measure.py <dir> <out.json>`: MediaPipe Face Landmarker (`_work/models/face_landmarker.task`, float16, from
  storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/) → per portrait: face height = forehead(10)→chin(152)
  distance / H, centre, eye line, opaque top. 8093/8093 found landmarks. Run with `python3 -I` (dev/figwork has its own cv2.py).
- `groups.py`: group of a file name: children (kid-*), consorts, maids (incl. Part C t/ty/tm), mamas, eunuchs, officials, physicians,
  men (man-*), emperor, player, thaihau.
- `plan.py <measure> <plan.json>`: target T = group median face height (children: median of the big-face close-ups fh ≥ .265),
  target centre = group median. Re-crop when |fh/T−1| > 4 % or centre off > 1.5 % H / 2.5 % W; others stay byte-identical.
- `recrop.py <plan> <before> <fig dir> <out>`: zoom/shift about the face centre, 384x506 kept, Lanczos on premultiplied alpha.
  Where the new view passes a PAINTED picture border (zoom out / shift), the strip is filled from the same painting's `fig-*`
  (`register.py` template match, score ≈ .99; the portrait is a crop of the figure's painting at ~1.5x resolution).
  Flags: upscale > 1.30, crown-cut, bottom-gap, no-fig, fig-mismatch. NOTE: webp `method=6` takes 12 s per picture here → method 4.
- `sync_json.py`: rewrites `img/veil-fit.json`, `img/scar-fit.json`, `img/toil-fit.json` (por-* entries of re-cropped pictures moved/scaled
  with the crop) and `img/POR_FACE2.json` (jkpor: EVERY por gets the group's Haar-equivalent face height, top and centre, so jkpor's runtime
  zoom/lift is identical inside a group; before it varied with Haar noise, and 2344 newer portraits had no entry → fixed 1.14).
- `sheet.py` / `lineup.py`: before|after contact sheets with the group target lines; lineup = same people side by side.

## Status (15/11 ~20:20Z)
- Sample sent to coordinator: /home/user/wt/porscale-sample.jpg (copy dev/review/por-scale/sample.jpg). Coordinator: children = one group.
- Full run DONE: 8093 measured, 3317 re-cropped (+18 re-done with the face a little lower so tall crowns are not cut).
  Table + flagged list: dev/review/por-scale/report.md; targets: groups.json; per-picture zoom/fill/flags: recrop.json; sheets *.jpg.
- JSON synced: veil-fit 301, scar-fit 301, toil-fit 2489 por entries moved/scaled; POR_FACE2 rewritten for all 8093 (group-constant).
  Checked visually: veil box + mouth/cheek points sit on the face after the crop.
- POR_FACE2 bodyX is now the group's FACE centre → jkpor centres the face (D ≈ 0), not the body (old rule: body centred, up to 18 % shift
  that moved heads sideways person to person). Revert = keep the old bodyX values.
- Measurement noise: re-measuring the same face after resampling moves fh up to ~±6 % on some crowned/tilted faces → 28/3317 outside ±4 %
  after; not chased further.
- CDN upload DONE 15/11 ~20:45Z: 3317 por-*.webp + POR_FACE2/veil-fit/scar-fit/toil-fit.json (md5 checked), _index v=a36f5709e45f.
- ROLLBACK copy (originals of every changed picture + the 4 old manifests + measurements m-before/m-after.json):
  /home/user/wt/porscale-orig/ (150 MB, not in git). Restore = copy into img/ and `cdn_sync.py --force` those files.
- To redo: fetch.py porlist → measure.py → plan.py → recrop.py → sync_json.py → report.py (all in dev/figwork/porscale/).

## Notes for others
- mk-colour worker (img/mk-fit, `mkfit.py --stale`): these player portraits changed crop → rerun `--stale` after the CDN upload:
  por-player-look1-t3-a18, look2-t1-a36, look2-t3-a18, look3-t3-a18, look4-t1-a18, look4-t3-a18 (and 1168 consort / 1839 maid / 182 kid
  portraits, full list dev/review/por-scale/recrop.json). Any worker holding a per-por face box: recompute from the CDN after this upload.
- Existing issue seen (not changed): the veil/scar layer box (.kfx in jk2b §7) is laid at window size, top 9 %, and does not follow jkpor's
  per-picture zoom/lift. After this branch the zoom is constant per group, so the error is at least the same for everyone in a group.
