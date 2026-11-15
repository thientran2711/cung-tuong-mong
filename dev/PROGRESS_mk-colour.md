# PROGRESS — review/mk-colour (makeup colours on HER pictures, KIT §60)

Owner 15/11 19:05Z: like modern makeup games, the colours she picks (phấn mắt, phấn má, son môi, màu mày) show in exactly those colours
on her own portrait + figure all day; lips and eyes added without looking pasted; "đẹp" stays as approved; "diêm dúa" = her picks, stronger.

## What exists (grep first)
- jtoil.js (review/toilette, on main): morning mirror mini-game, `TOIL_LOOKS` dep/diem SVG layer (skin light, blush discs, blurred lip oval) from
  `img/toil-fit.json` (mouth + cheeks per picture). No colour choice, no eyes/brows; the lip oval was too faint to read.

## Done
- `dev/art/mkfit/mkfit.py`: MediaPipe Face Landmarker (pip mediapipe 1.2.3 + apt libegl1 libgles2, model face_landmarker.task float16/1 from
  MediaPipe model storage, kept in the worktree .mk/, not committed) on a face crop of every por-/fig- picture in toil-fit.json (12966 =
  84 faces + player looks, all tiers / ages / trung y / kc / ngheo). 60 points (lips outer+inner, both eyelids + lower lash line, both brows),
  sanity check against the toil-fit mouth, pair transfer por↔fig on failure. Out: `img/mk-fit/<face>.json` (CDN) + copy in `dev/art/mkfit/`,
  md5 per picture in `dev/art/mkfit/md5.json` (`--stale` re-measures re-cropped pictures, e.g. after review/por-scale).
- jtoil.js §60: `TOIL_COL` palette (6/6/6/5, cổ trang names), picks in `p.toilette.col` (old saves → defaults = approved colours),
  colour step "Chọn màu" before the skill hồi (`toilColUI`: `kitFaceZoom` live preview + `kitSwatches`), the tools in the game draw in her
  colours, `toilMkLayer`/`toilMkDraw` canvas colour layer (recolours lip / lid / brow pixels of the picture itself, soft masks), blush SVG in
  her colour. Kit parts `kitSwatches`, `kitFaceZoom` + KIT.md §60 + kit page sample "§60".
- Tests: `dev/test/mk-colour.js` (sample sheet), `dev/test/toilette.js` extended with the palette step + colour-layer counts.

## Notes
- Look rules unchanged: a layer only for đẹp (score ≥ 65) and diêm dúa; vụng / vừa show the painting as is.
- If portraits are re-cropped (review/por-scale): `python3 -I dev/art/mkfit/mkfit.py --stale --jobs 12` then
  `python3 dev/site/cdn_sync.py img/mk-fit/*.json` and copy to dev/art/mkfit/.

## Whole-class: toil-fit mouths (blush + lip placement) checked against the face mesh
`dev/art/mkfit/fixtoil.py`: of 12960 pictures, the toil-fit mouth (colour centroid) was more than 0.10 face width away from the face-mesh lip
centre on 1402 (0.08: 1974 · 0.12: 1051 · 0.18: 306; worst e.g. por-consort-c27-t3-a51 had its "mouth" in the hair). Those entries were moved
onto the lips (mouth + cheeks together, face width rescaled where off by > 25 %). After: 0 above 0.10. Published as **img/toil-fit2.json**
(jtoil TOIL_FIT.url) so main keeps the old file until this branch is merged; after merge: copy toil-fit2 → toil-fit, point the url back.
dev/art/toil-fit.json = the fixed copy. Anchor run: 12960 pictures, 12623 detected on the toil-fit crop, 150 on the free retry (whole
portrait / figure top), 7 by por↔fig pair transfer, 0 failed. Random audit sheets (24 pictures) checked by eye: all on the lips / lids / brows.
