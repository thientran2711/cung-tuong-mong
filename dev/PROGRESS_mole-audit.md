# PROGRESS mole-audit (D23 whole-game mole audit, D24 c12-ty5-a51 forehead) - branch review/mole-audit-r2

Status: PAUSED by Foreman C (16/11, all art paused). Nothing uploaded to the CDN except the 2 D24 files. No images in git.
(The old remote branches review/mole-audit and review/mole-fix have unrelated history; their 109 fixed files were never pushed to the CDN, e.g. c17-t2-a26 still had its big mole on the CDN today.)

## D24 - DONE and UPLOADED (2 files)
- consort-c12-ty5-a51: the "patch" was not on the eyes but a semi-transparent grey-white HOLE over the whole forehead of por + fig (a36 slightly pale too, left as is).
- Magnific gpt-2-6 (folder ba4aecfe..., ref = por-a51, 2k 3:4, 4 gens, 260 credits). 1st prompt grew bangs (rejected), 2nd "no bangs, keep centre parting" gave 2 good results; picked gen #2 (creation UPPer: h2).
- d24_forehead.py aligns the gen to the por (ECC affine), copies ONLY the forehead/hairline zone (feathered, alpha filled) onto the original por; fig gets the same patch through the por->fig scale map (0.66,49,-43).
  Hair, hand, hairpin, robe, eyes, face identity untouched. Looked at before/after: OK.
- Uploaded: img/por-consort-c12-ty5-a51.webp, img/fig-consort-c12-ty5-a51.webp (no hd copy exists).
- NO huadian on a51 (a18/a26/a36 have the cross huadian). C9 owns huadian: C9 should add the ty5-a51 huadian ON TOP of my uploaded version (do not re-upload an older copy).

## D23 - counts
| step | n |
|---|---|
| CDN por-* downloaded + scanned (haar, zone=face: cheeks only, round dots only, forehead = huadian never touched) | 8747 (maid 4834, consort 2976, eunuch 480, kid 216, man 124, mama 32, official 28, player 20, thaihau 15, physician 14, emperor 8) |
| face-* (173 small avatars) | not scanned |
| flagged, loose detector (th18, v1) | 524 (almost all jaw lines / hair edges / nostrils = false) |
| flagged, strict detector (round, 5px+, all-skin radius 8) | 168 -> looked at 5 contact sheets |
| real facial moles seen by eye | consort c07, c08, c16, c17 (c17-t2 big mole under the eye), c30-tm0-a36; eunuch u23 (cheek by ear, all ranks), u26 (cheek under eye, all ranks, big), u30 (faint); NONE real in maids (m45/m52 only ambiguous), kids, mama, man, official, player |
| family-wide re-scan th6/10/14/24 on c07 c08 c09 c16 c17 c30 u23 u26 u30 m45 m52 (792 files) | hits 157 -> fixed in 3 passes |
| por files fixed locally (inpaint r~3 TELEA, webp q86) | 158 names (pass1 64, pass2 103, pass3 11, overlaps) in dev/figwork/moleaudit/fixed_names.txt |
| matching fig files fixed (por->fig template map, disc inpaint) | ~150 (5 LOWMATCH <0.85 redone at MV=.78; c08-tm1-a51, c09-kc-a36, c09-t2-a51, c09-t4-a26, c17-kc-a36 figs NOT done) |
| matching hd/fig-* fixed | 31 + 34 (all that exist for the 158 names) |
| uploaded to CDN | 0 (paused) |
Looked at before/after sheets for passes 1+2 (por: moles gone, anatomy intact; false hits harmlessly smoothed) and spot-checked fig+hd (c07-t3-a18, c08-t2-a26, c08-ty7-a26, c17-t2-a26, u26-r2-a26, u23-r3-a26, c17-tm4-a51, c08-tm0-a51, c08-tm3-a51: all fixed).
Fixed outputs are kept OUTSIDE git in /home/user/wt/mole-audit-fixed/img/ (404 files, 30 MB: por-*, fig-*, hd/fig-*) - built from the CDN copies of 16/11 ~02:00Z.

## Left / how to resume
1. BEFORE uploading any consort file: C9 is re-processing huadian on consort por/fig. Re-download the CURRENT CDN copy (compare md5 with img/_index.json), re-run the fix on it:
   `python3 -I dev/figwork/moleaudit/demole_por.py zone=face th=6 <por files>` (cheeks only) then `python3 -I dev/figwork/moleaudit/fixpair.py DIR hits_passN.json` (DIR/img = downloaded por, fig, hd/fig; MV=.78 for weak maps).
   The fix touches cheeks only, never the forehead, so it composes with C9's huadian; if C9 changed a file, fix the new version, do not push my copy.
   Then `CLOUDFLARE_API_TOKEN=proxy-injected python3 dev/site/cdn_sync.py <files>` in batches of ~50 (por, fig, hd/fig of the same names; eunuch u23/u26/u30 are not in C9's set and can go first).
2. Not done: c17-t2 a18/a36/a51 + other c17 tiers by hand (detector missed c17-t2-a36 eye-side mole: use `demole_por.py file spot=x,y`), the 5 figs above, c09 (hits unclear), u30 confirmation, face-* 173 avatars, tn/ thumbnails (840, 6 KB each, derived from fig - re-derive after fig upload if the pipeline has a tool), scene pictures (act-/ev-/st-/idref: 2028 downloaded, haar close-face scan 433/2028 done, none looked at), act/event pictures with close faces, whole-game final residual scan after upload.
3. Tools in dev/figwork/moleaudit/: demole_por.py (extended: zone=face), fixpair.py, ba_sheet.py (before|after tiles), facesheet.py, chk_fig.py, d24_forehead.py, dl.sh, scene_faces.py; lists: scan_all_por.log, flagged_*.txt, hits_pass*.json, fixed_names.txt.
Credits used: 260 (D24 only; moles done by local inpaint, 0 credits).
