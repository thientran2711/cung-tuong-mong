PRIORITY #1 CHECK ('toil-looks2'): OD 1550-1554 (6 results), 04:15-05:08Z, s30 06:30Z tease dialog | main: jtoil.js (reused) | review/* toil-looks2 55889159, makeup-theme-r1 471de81f (merged in) | claims toil-looks #N (this).

# toil-looks2 - review/toil-looks2 43b9a8b64 (worker sonnet)
Base: origin/main + review/makeup-theme-r1 (TOIL_MK names, one source) + toil-overlay-r1 data; merge conflicts in jtoil.js resolved to makeup-theme, `tuyet` restored.

## What
1. Lip-on-chin (r2 FAIL 1): ROOT = the reveal baked the colour layers into its markup BEFORE the face mesh (img/mk-fit) had loaded, so toilMakeupSvg drew its fallback lip oval from the OLD toil-fit row (chin on 3/4 faces) and it was never redrawn. Fix: toilReveal waits (<= ~2.5 s) for the mesh of figure + portrait (toilMkReady); toilMakeupSvg draws NO lip oval for any face that has a mesh (lips only from the colour layer). Whole family: every place that builds toilFaceLayer (stage figures, portraits) gets the same rule.
2. Ladder = 6 results (OD 1550/1553/1554): BAL.toil.tier [40,65,85]; toilLookOf returns tuyet >= tier[2]; react rows / ghenTuyet / crowd / emp-like / reveal fx / hint restored. Names only from TOIL_MK.
3. Looks (TOIL_LOOKS / TOIL_MKS): vua light; dep; tuyet luminous (cheekbone glow with its own wide blur, soft pearl dabs by the eyes, lip gloss); diem overdone but pretty (wide blended blush, no hard stop, stronger shadow, extra shimmer); vung soft (uneven rotated blush ellipses, small smudged lip edge, brows untouched). Lip colour now blends into the lip's own shading (contrast gamma, softer edge, lower opacity at low tiers). Warm son cam dao / ho phach palette toned to coral / apricot. Every level uses HER picked colours (blush/lip/lid/brow); levels change amount only.
4. Tease / reaction dialogs (s30 06:30Z parts 1-3): ONE reaction line (toilSayOwnGest: the second gesture is dropped when the spoken line has its own gesture or is narration); no numbers in the story text ("Thay ta diem trang Vung ve, nang ta bot ghen (Ghen -2)" is the grey why-row, capitalised); mocked by a consort -> replies Cuoi cho qua / Dap lai kheo / Dap tra gay gat / Im lang lui di (no Xin loi; scolding from Thai hau / Hoang hau keeps Xin loi). New numbers in BAL.toil (harshAff, harshWin, harshDanh, harshDuc, replySuc). NOT done (main/kit): items (4)(5) = event dialog layout (full-width band instead of T3 person event) - kit root, not in this branch. jne morningAfter "Loi ra tieng vao" already has Nhan nhin / Cuoi tru / Dap lai (no Xin loi): left.

## Tests / gates
- quickcheck 43b9a8b64: PASS (open 1227 ms, old save ok, perf render 215/207, core gates PASS incl. one-core-guard after the BAL move).
- NEW dev/test/mk-layer-scan.js + dev/tools/quickcheck.d/60-mk-layer-scan.sh: renders the SVG colour layers of ALL 12960 mesh pictures at 5 levels: no lip oval, lips inside the layer box, mouth between eyes and chin -> 0 bad (this is the check r2 asked for).
- NEW dev/test/toil-tease.js 25/25 (vung+diem x 12 draws + Thai hau scold); dev/test/toil-react.js updated (peer set of replies) PASS.
- Samples looked at (real renderer, Fold 755x1000@2, forced faces c07-t3-a18 and c31-ty2-a18, 6 levels x warm/cool): CDN img/_review/toil-looks/toil-looks-1.png and -2.png (main LOOKed at the first set and asked 4 fixes, all done and re-shot).

## Balance note for main
tuyet react rows / ghenTuyet 1 / crowd trigger are the 71d804787 values; Khuynh thanh (score >= 85) makes strict hosts +2, jealous hosts -1.

## Data on CDN
Still HELD (dev/art/mkfit + toil-fit2.json are valid in git, not on CDN) - owner hold until Foreman C repaint. Until the CDN has the new mesh, production loads the OLD data; the reveal now waits for it and draws no lip oval, so the chin patch cannot appear.

## looks3 - review/toil-looks2 d4b4e7440 (worker sonnet, her FINAL words OD 17/11 ~13:08Z)
PRIORITY #1 CHECK: OD 17/11 ~13:08Z (overwrites 13:05Z) | reused jtoil.js toilMkDraw / TOIL_MKS (no new file) | review/toil-looks2 43b9a8b6 base.
- ROOT of the spill: the cheek blush / skin light / glow were an UNMASKED SVG layer (huge discs, hard stop) laid over the picture box, so they covered the eyes/iris and landed on hair and background. FIX: for every face with a mesh the SVG layer is gone; skin light, blush, luminous spots and white powder are painted in the canvas colour layer and CLIPPED to a skin mask (colour close to her own cheek skin, sampled from the picture; eyes cut out, dilated). Eyelid colour and shimmer use a looser skin mask (never on hair/background). Blush is placed from the mesh (below the eyes, between eye and mouth), sized in eye-distance units. Layer box widened (30 %) to hold the cheeks. Mesh-less faces keep the old SVG (rare).
- (1) Vung ve: small uneven blotches + 6 white powder dabs on the cheeks (the two pale streaks removed from Khuynh thanh are now this), lips/eyes soft as before.
- (2) Doan trang light (eye .24 lip .30 blush .12) / Kieu diem fuller (eye .85 lip .74 blush .42, wing, lower lash) / Khuynh thanh: luminous skin lift .36 + two ROUND soft cheekbone lights (no streaks), blush .27, elegant eye .8 + champagne shimmer, lip sheen = soft ellipse clipped INSIDE the lower lip (no white bar, no teeth look).
- (3) Diem dua: lips .74 -> .86; blush smaller/cleaner, clipped; rest unchanged. Mat moc unchanged (no layer).
- Her 8 colours still drive every level (ma/son/mat/may; cache key now includes ma).
- Samples (real renderer, 755x1000@2, c07-t3-a18 + c31-ty2-a18, Ho phach warm + Lan tuyet cool, 6 panels, LOOKED at both): https://ctm-img.victoria-tntt.workers.dev/img/_review/toil-looks/toil-looks-1.png?v=3 and -2.png?v=3
- Gates: mk-layer-scan 12960 pictures 0 bad; toil-tease 25/25; toil-react PASS; toil-overlay 33 checks 0 bad; toil-allday PASS 10; toil-draw 0 bad; quickcheck PASS 158 s (render 193/231 ms).
- Note: svg ellipse-count scan unchanged (SVG path kept for mesh-less faces). Data still HELD on CDN (mesh), as before.

### looks3 v4 - review/toil-looks2 b56f18bd7 (main's ?v=3 feedback + owner 13:25Z lips + 13:28Z mask)
PRIORITY #1 CHECK: OD 13:08Z/13:25Z/13:28Z | reused toilMkDraw (new helper toilMkGeom in jtoil.js).
- Blush = feathered gaussian oval, tilted toward the temple, below the eyes; size = eye distance x level, SHRUNK until it fits the face outline and stays below the eyes; a cheek that cannot fit (far side of a strongly turned face) gets none.
- Mask (per face, from the mesh; the mesh has no jaw points, so the outline oval is built from eye span + eye-to-mouth): skin layers x outline x her cheek-skin colour match x (1 - dilated eye polygons); eyelid/shimmer x outline x looser skin match. Lips/brows are painted from the picture itself.
- Ladder: Doan trang light < Kieu diem fuller < Khuynh thanh most polished (blush .5, eye .92 + shimmer .5, lip .74 + sheen, skin light .36) ; Diem dua overdone (blush .62 big feathered, lips .86). Vung ve: irregular white powder patches/streaks. Lips: blurred edge (softer the darker), colour floor raised so the artwork's own lip line no longer shows as an outline.
- mk-layer-scan now also checks, for ALL 12960 mesh pictures x 5 levels, that every blush oval lies inside the outline and below the eyes: 0 bad. (A pixel-level check on all faces needs every picture from the CDN; not done, only the 2 sample sheets looked at.)
- Samples ?v=4: https://ctm-img.victoria-tntt.workers.dev/img/_review/toil-looks/toil-looks-1.png?v=4 / -2.png?v=4. Gates: mk-layer-scan 0 bad, toil-tease 25/25, toil-react PASS, toil-overlay 0 bad, quickcheck PASS (one noisy buoi median 1489 vs live 904 in that run, 889/934 in the previous one).

### looks3 v5 - review/toil-looks2 8acee5dbe (owner 13:48Z rejected v4: blush must not shrink)
PRIORITY #1 CHECK: OD 13:48Z | reused toilMkDraw/toilMkGeom.
- Blush restored to the ?v=2 geometry: centres + radius per level from the fit row (r .165/.185/.2/.22 x face width), never shrunk; only the clip cuts it (outline oval enlarged x skin colour x no eyes). Profile: Doan trang = exact v2 (0:1, .35:.55, 1:0, alpha .21, other values = v2); Kieu diem / Khuynh thanh / Diem dua use an even soft profile with a little more colour per step (.27 / .31 / .42). Khuynh thanh keeps the v4 lip sheen. Vung ve: blotches + powder patches blurred into the skin. Lips: soft edge, no outline (v4).
- mk-layer-scan: geometry check now = both cheek centres inside the outline oval and below the eyes, all 12960 faces: 0 bad. toil-tease 25/25, toil-react PASS, toil-overlay 0 bad, quickcheck PASS 160 s.
- Samples ?v=5 + side by side with ?v=2: img/_review/toil-looks/toil-looks-1.png, -2.png, toil-looks-side-1.png, -side-2.png (top 2 rows v2, bottom 2 rows v5).

### looks3 v6 - review/toil-looks2 73a8beedc (owner ~14:00Z verdict on v5)
PRIORITY #1 CHECK: OD ~14:00Z s32 makeup | reused TOIL_MKS only (values).
- Mat moc / Vung ve / Doan trang untouched (approved). Kieu diem = the v5 Khuynh thanh look unchanged (moved down). NEW Khuynh thanh: eye 1.0 / lid height .92 / wing .4 / lower lash .46 / shimmer .85, lip .86 + sheen .72, blush .40 (same soft spread), skin light .38. Diem dua one small step heavier: lip .86->.92, eye/brow/lash up, blush .42->.50; same clip (nothing on eyes/hair/background).
- Gates: mk-layer-scan 12960 0 bad, toil-tease 25/25, toil-overlay 0 bad, quickcheck PASS 150 s.
- Samples ?v=6 + side by side with v5 (top v5, bottom v6): img/_review/toil-looks/toil-looks-1.png, -2.png, toil-looks-side-1.png, -side-2.png.

### looks3 v7 - review/toil-looks2 8a159f912 (s32 asks after v6)
PRIORITY #1 CHECK: OD ~14:05Z Vung ve not approved | reused jtoil.js (TOIL_MKS values + 2 small canvas additions).
- Vung ve: white powder visible again (irregular patchy flecks/streaks, 10 per face, alpha .32-.52, flat-top profile BLP.patch), blotchier blush, the OLDER lip smudge back (bigger smear past the lip line + a lip-colour smudge beside the mouth, less blur), all inside the face mask.
- Khuynh thanh clearly more splendid than Kieu diem: lip 1.0 + sheen .9, eye/lid 1.0, wing .55, lower lash .6, shimmer 1.0, skin light .5, blush .46. Diem dua clearly overdone: blush .78 (clip keeps it off eyes/background), lip 1.0, lid height 1.18, lower lash .85, brow .9, wing .55. Mat moc / Doan trang / Kieu diem unchanged.
- Gates: mk-layer-scan 12960 0 bad, toil-tease 25/25, toil-overlay 0 bad, quickcheck PASS 143 s.
- Samples ?v=7: img/_review/toil-looks/toil-looks-1.png, -2.png, -side-1/-2 (v5 over v7), -vung-1/-2 (Vung v4|v5|v7).

### looks3 v8 - review/toil-looks2 630eaa633 (owner ~14:40Z verdict on v7)
PRIORITY #1 CHECK: OD ~14:40Z | reused jtoil.js (TOIL_MKS + toilVungB + BAL.toil.vungB).
- Doan trang / Kieu diem / Mat moc untouched. Khuynh thanh = midpoint Kieu diem..v7 (lip .88, eye .96, lid .9, wing .42, lash .47, shimmer .75, sheen .78, blush .38, skin light .40). Diem dua = the v6 look with a more diffuse blush (BLP.diff, lower centre density, r .24).
- Vung ve two variants, picked ONCE per day from col.seed (toilVungB: hash of seed < BAL.toil.vungB = .5; seed 0 = A): A "khong biet trang diem" = v4/v5 lips (less smeared), 1-2 ROUND soft powder-puff blobs per cheek (BLP.puff, alpha .42-.62) over the round blush; B "danh qua tay, nhu he" = TOIL_MKS.vungB = the v7 Diem dua values. Mask unchanged.
- Gates: mk-layer-scan 12960 0 bad, toil-tease 25/25, toil-overlay 0 bad, quickcheck PASS 157 s (one-core guard: new number lives in BAL.toil).
- Samples ?v=8: img/_review/toil-looks/toil-looks-1/2.png (Vung = A), -side-1/-2 (v7 over v8), -vung-1/-2 (A | B).
- Sample-sheet script is not committed (was in the scratchpad): it loads index.html on a local http.server, injects dev/art/toil-fit2.json + dev/art/mkfit/<face>.json, builds a grid with toilMkLayer(file,look,col) over img/<por>.webp from the CDN. Seeds: A = 7, B = 5 for BAL .5.

## HANDOVER (toil-looks3 worker, 17/11 ~14:55Z) - state: review/toil-looks2 630eaa633 = ?v=8, pending owner verdict
- Branch review/toil-looks2 (all work), worktree was /home/user/wt/tl3. Only dev/build/jtoil.js (+ dev/test/mk-layer-scan.js, generated index.html/sw.js/assets.json) changed in looks3. Rebuild: `sh dev/site/build_site.sh`.
- HOW THE MAKEUP IS DRAWN (mesh faces): toilMkLayer -> toilMkPaint -> toilMkDraw(im, mesh v, look, col, box, fitRow). Canvas colour layer from the 60 mesh points: lips (outer-inner, soft blur, no outline), eyelids/wing/lower lash/shimmer, brows, lip sheen (gloss, clipped inside the lip), plus a SKIN pass: skin light, blush discs at the fit-row cheek centres (v2 geometry, radius T.r x face width, never shrunk), cheekbone lights (tuyet), powder puffs (vung A). Skin pass is clipped: face-outline oval (toilMkGeom, from eye span + eye-to-mouth; the mesh has no jaw points) x her own cheek-skin colour match x (1 - dilated eye polygons); eyelid layers use the outline and a looser skin match. The old SVG layer (toilMakeupSvg) is used only for mesh-less faces.
- TOIL_MKS map (levels): vung (A) lip .5 eye .4 bl .3 r .17 + 1-2 round powder puffs/cheek; vungB = the v7 Diem dua look (lip 1, lid 1.18, bl .78); vua = Doan trang (APPROVED, = v2 values, exact v2 blush profile); dep = Kieu diem (APPROVED: lip .74 eye .9 bl .31 shim .5 gloss .65); tuyet = Khuynh thanh (lip .88 eye .96 lid .9 wing .42 lash .47 shim .75 gloss .78 bl .38 sk .40, hl cheekbone lights); diem = Diem dua (v6 values, blush .56 r .24 with the diffuse profile BLP.diff). Mat moc = no layer. Blush profiles: BLP.v2 (Doan trang only), BLP.wide, BLP.diff, BLP.puff, BLP.patch.
- Vung variant: toilVungB(col) = hash(col.seed) < BAL.toil.vungB (.5); seed 0 -> A; stable per day. Her 8 colours (ma/son/mat/may) drive every level; cache key = file|look|mat|ma|son|may|seed(vung).
- SAMPLE SHEET (script was never committed; rebuild): serve the built worktree with `python3 -m http.server 8765`; in playwright (NODE_PATH=/opt/node-tools/node_modules, 755x1000@2) open index.html, wait for toilMkBox/TOIL_FIT/MK_FIT/TOIL_PRE, wait ~3 s, set TOIL_FIT._ld=1; TOIL_FIT.fit = dev/art/toil-fit2.json, MK_FIT.g['consort-c07'|'consort-c31'] = dev/art/mkfit/<face>.json. Faces por-consort-c07-t3-a18.webp and por-consort-c31-ty2-a18.webp (CDN images). Rows = TOIL_PRE presets 'hophach' (warm) and 'lantuyet' (cool) via toilColFix(pre[4]) with col.seed set (A seed 7, B seed 5); columns = [Mat moc(no layer), vung, vua, dep, tuyet, diem]; each cell = <img> of the portrait zoomed on the face + toilMkLayer(file,look,col) markup positioned by its --fleft/--ftop/--fwidth/--fheight vars; wait until no img.kmkc still has the blank gif; screenshot; crop. Upload to img/_review/toil-looks/ with `python3 dev/site/cdn_sync.py <files>`; main shows ?v=N URLs.
- GOTCHAS: python3 http.server dies between calls (restart it); never slice-replace a block in jtoil.js without checking the neighbouring lines (I once dropped the cfo/gfo outline line, which blanked every layer: debug by calling toilMkDraw directly in the page and reading the exception, toilMkPaint swallows it); toil-overlay "with layers" count is 0 on old builds too (not a regression).
- PENDING: owner verdict on ?v=8 (Khuynh thanh midpoint, Diem dua v6 + diffuse blush, Vung A/B). Gates all PASS at 630eaa633: mk-layer-scan 12960 0 bad, toil-tease 25/25, toil-react PASS, toil-overlay 0 bad, quickcheck PASS. Data (mesh + toil-fit2) still HELD off the CDN by owner hold until Foreman C repaint.

## toil-looks4 (sonnet worker) - review/toil-looks2 a5e7f52f = ?v=9 (Vung A puffs only)
PRIORITY #1 CHECK: OD tail ~15:00Z makeup verdict | main jtoil.js (reused) | review/toil-looks2 630eaa63 (this) | claims toil-looks4 (this).
- What: only the Vung A powder puffs changed. New BAL.toil.vungPuff = {big 1.7, small .75, prof soft-edge stops [[0,1],[.3,.82],[.6,.4],[.85,.1],[1,0]]} (v8 BLP.puff was [.4,.86],[.78,.34]: sharper). In toilMkDraw each day one cheek gets the big puff and the other the small one; which side comes from its own rng (toilRnd(seed+23)), so every other random draw keeps its v8 value. Other levels (Mat moc, Doan trang, Kieu diem, Khuynh thanh, Diem dua, Vung B) untouched: no T.dabs, own rng never read.
- Tests at a5e7f52f: mk-layer-scan 12960 pictures 0 bad; toil-tease 25/25; toil-react fails [] errs []; toil-overlay checks 33 bad 0; quickcheck PASS 151 s (core gates PASS).
- Sheet: https://ctm-img.victoria-tntt.workers.dev/img/_review/toil-looks/toil-looks-v9.png (Vung A warm+cool x seeds 7,8 x faces c07,c31; bottom 2 rows = all 6 levels warm c07 / cool c31). Same sheet on v8: .../toil-looks-v8-compare.png (levels identical, only the puffs differ). Delete both after the verdict.
- Sample-sheet script (not committed): playwright with page.route serving the worktree, as in the toil-looks3 handover.


## toil-looks5 (sonnet worker) - review/toil-looks5 27ff57d3 = ?v=10 (Vung A powder blobs)
PRIORITY #1 CHECK: OD tail ~16:20Z (a) | main jtoil.js reused | review/toil-looks2-r5 97f57862 (base) | claims toil-looks5 (this).
- What: only the Vung A powder puffs (jtoil.js toilMkDraw + BAL.toil.vungPuff). Each blob is now sized from the BLUSH disc (c.rx x .9-1.1 x per-cheek factor: big 1.2 / small .8, second blob x.8), drawn with the SAME fall-off profile as the blush (BLP.wide, used directly, no copied table), colour [255,250,244], alpha .34+.14R (v9: .42-.62 white, much smaller, sharper), centred near the blush centre (+-.25 rx) so it layers over it. Same rng draw order as v9 (per-day seed, which cheek is bigger from own rng). Other levels untouched.
- Gates at 27ff57d3: mk-layer-scan 12960 0 bad; toil-tease 25/25; toil-react fails []; toil-overlay checks 33 bad 0; quickcheck PASS 152 s (one run hit a flaky G4 coop-one-world "merge differs", file also says PASS; rerun PASS).
- Sheet: https://ctm-img.victoria-tntt.workers.dev/img/_review/toil-looks/toil-looks-v10.png (rows 1-2: Vung A warm hophach / cool lantuyet x seeds 7,8, faces c07 c31; rows 3+: all levels per face). Delete after verdict. v9 sheet for comparison: .../toil-looks-v9.png.
- Looked at the sheet: the blobs read as a soft pale haze over the blush with the blush's own softness, no hard white patches. If she still wants them whiter/clearer: BAL.toil.vungPuff.al/alv; sizes: big/small.
- Sheet script (not committed): /home/user/wt/tl5-shots/sheet.js pattern = serve worktree, inject toil-fit2 + mkfit, toilMkLayer(portrait file name) cropped by box.

### toil-looks5 v11 - review/toil-looks5 b9efd241 (owner ~17:00Z on ?v=10)
PRIORITY #1 CHECK: OD tail ~17:00Z (blobs not all blush-sized, more opaque) | main jtoil.js reused | claims toil-looks5.
- BAL.toil.vungPuff = {big .75, small .5, al .7, alv .2}: blob radius = blush disc rx x .75 or .5 (x .92-1.08), a mix on every cheek (first blob big on the "big" cheek, small on the other, swapped for the 2nd blob), centred within +-.25 rx of the blush centre so the blush stays visible around them; blush blur profile (BLP.wide); alpha .7-.9 (peak ~.55-.72). Same rng draw order. Other levels untouched.
- Gates at b9efd241: mk-layer-scan 12960 0 bad, toil-tease 25/25, toil-overlay 0 bad, quickcheck PASS 157 s.
- Sheet: https://ctm-img.victoria-tntt.workers.dev/img/_review/toil-looks/toil-looks-v11.png (+ small-size 190x210 row Mat moc | Vung A s7,8,9 on 2 faces). Small makeup sheet (all levels): .../toil-looks-small.png. Delete all after verdict.
