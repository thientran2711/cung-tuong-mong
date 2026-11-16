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

## RESUME NOTES (checkpoint 15/11 ~21:00Z, account move)
State of branch review/mk-colour:
- Sample 1 (/home/user/wt/mk-colour-sample.jpg, local only) sent. Owner feedback (via coordinator): "đẹp" faces very pretty; (1) đẹp lipstick
  slightly softer → DONE (TOIL_MKS.dep.lip .62 → .54); (2) more colours incl. ORANGE/coral → DONE (Phấn hổ phách, Phấn cam quýt, Son cam đào,
  Son hổ phách); (3) presets 7 đẹp + 7 diêm dúa, 3 cool + 4 warm each, cổ trang names → DONE in code (`TOIL_PRE`, rows "Kiểu thanh nhã" /
  "Kiểu diêm dúa" above the 4 colour rows in the Chọn màu step; swatch = 4-colour conic dot). RULE TOUCH to flag for review: picking a
  diêm dúa preset sets col.want="diem" → a made-up face with score ≥ tier[1] shows as diêm dúa (before: only caked powder made diêm dúa).
- TODO next: sample sheet 2 = all 14 presets on her face → /home/user/wt/mk-colour-sample2.jpg (extend dev/test/mk-colour.js: rows đẹp / diêm,
  7 columns, face zoom), message coordinator; re-run viewport tests (1180x820 run still flaky under load: DOM clicks used in the palette step).
- Viewport results before the preset change: 755x1000, 1000x755, 1366x1024, 844x390 PASS (palette 4 rows, layers on header + stage, old save
  from main loads with look dep + default colours, no overflow, 0 page errors). 1180x820: timed out under load (machine paints ~2 fps;
  main has the same frame rate) — rerun.
- ANCHORS: img/mk-fit/*.json for all 12960 pictures are on the CDN (uploaded ~19:50Z) and committed in dev/art/mkfit/.
  review/por-scale then re-cropped portraits (incl. por-player-look1-t3-a18, look2-t1-a36, look2-t3-a18, look3-t3-a18, look4-t1-a18,
  look4-t3-a18 + many maid/consort por; list dev/review/por-scale/recrop.json on review/por-scale) and transformed toil-fit.json on the CDN.
  A `--stale` re-measure was running at the checkpoint (dev/art/toil-fit.json = the NEW CDN toil-fit, not yet fixed). To resume:
    pip install mediapipe; apt-get install -y libegl1 libgles2; download face_landmarker.task (MediaPipe model storage,
    face_landmarker/face_landmarker/float16/1) to .mk/ (or pass --model);
    python3 dev/site/cdn_sync.py --pull 'img/mk-fit/*'   (or copy dev/art/mkfit/*.json except md5.json to img/mk-fit/)
    curl the CDN img/toil-fit.json → dev/art/toil-fit.json (por-scale version)
    python3 -I dev/art/mkfit/mkfit.py --stale --jobs 8      (re-measures pictures whose CDN md5 differs from dev/art/mkfit/md5.json)
    python3 -I dev/art/mkfit/fixtoil.py && cp img/toil-fit.json img/toil-fit2.json && rm img/toil-fit.json
    python3 dev/site/cdn_sync.py img/toil-fit2.json img/mk-fit ; cp img/mk-fit/*.json dev/art/mkfit/ ; commit.
  Until then img/toil-fit2.json on the CDN holds the PRE-re-crop points: the re-cropped portraits' blush is off on this branch only.

## Update ~21:30Z
- por-scale re-crop handled: `--stale` re-measured 2486 pictures (incl. the 6 re-cropped player-look portraits), 0 failed; fixtoil on the
  por-scale toil-fit (1400 mouths moved, after: 0 above 0.10 face width); img/toil-fit2.json + img/mk-fit/*.json re-uploaded; dev/art/mkfit synced.
  Checked by eye: re-cropped player looks + a random 24-picture sheet.
- Sample 2 (14 presets): /home/user/wt/mk-colour-sample2.jpg (`node dev/test/mk-colour.js <url> <out> consort-c05 t1 a18 presets`).

## Update 16/11 (worker C6 resume)
- Merged origin/main (conflicts in jtoil.js sfx lines, KIT.md, built files; site rebuilt). Stale re-measure: 55 faces re-measured (md5 changed after other re-crops), fixtoil rerun
  on the CURRENT CDN toil-fit (1400 moved, after: 0 above 0.10), img/toil-fit2.json + img/mk-fit/*.json re-uploaded, dev/art/mkfit synced.
- Presets: 8 đẹp (4 cool + 4 warm) + 8 diêm dúa (4+4) in TOIL_PRE; 8 vụng looks = seeded clumsy variants of the player's picked colours (4 cool / 4 warm by her palette) in jtoil (commit 973729653).
- Lips QA on all player faces (player-look1..4, 40 pictures, `lipqa.py --only player-look<n> --sheets all`): looked at every outline; look2/3/4 median iou .73-.78 shift .01-.04;
  look1 is flagged only by the pale-lip metric (iou .44-.60) - outlines checked by eye sit on the lips (lower lip slightly loose on t1 figures, within the soft mask).
- D28 reveal scene done (KIT.md 60.5), plate `img/toil-mirror-room.webp` on CDN (Magnific 1lpaElvr4r, chosen of 2). Sounds: existing moments only (favour, rankNew, mglose, mirror).
- Test: dev/test/mk-reveal.js.
