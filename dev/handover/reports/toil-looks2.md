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
