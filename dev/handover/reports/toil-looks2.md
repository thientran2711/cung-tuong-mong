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
