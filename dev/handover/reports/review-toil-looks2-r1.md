PRIORITY #1 CHECK ('toil-looks2|tuyet|Khuynh thành|rival-tease|Xin lỗi'): OD 1550-1554, 1568 (s30 06:30Z parts 1-3) read verbatim | main: jtoil.js / jmkt.js / jne.js:207 / voice-trait kTP pools (d0a839e8) | review/* toil-looks2 43b9a8b64, makeup-theme-r1 471de81f (contained), toil-overlay/-reveal-fix chain (contained) | claims row 737/761. Reviewer; nothing new built.

# review-toil-looks2-r1 (reviewer opus, BIG) — VERDICT: PASS b9a46096
Reviewed review/toil-looks2 43b9a8b64. Verdict sha b9a46096 on review/toil-looks2-r1 = 43b9a8b64 + merge main 6ca04148 + 1 fix + merge main d0a839e8. origin/main d0a839e8 is an ancestor -> fast-forward ready.
LANDING ORDER: makeup-theme-r1 471de81f is NOT on main and is an ancestor of b9a46096 -> fast-forwarding b9a46096 lands makeup-theme-r1 first in the same move (no separate step; do not land 43b9a8b64 or 471de81f alone afterwards).

## Merges (both clean in source)
- main 6ca04148: conflicts only in generated files + assemble.py list (took main's list, kept 'jmkt.js' after 'jts.js'), site rebuilt.
- main d0a839e8 (voice-trait): jtoil.js toilGest/toilLit conflict -> kept this branch's one-line rule (toilSayOwnGest, capitalised why-row) AND main's kTP("toilGest:"+k) pool + {about:host}. assemble.py again main list + jmkt.js. tone-pool-check 86 pools OK, voice-trait.js PASS.

## Reviewer fix (on r1)
1. ONE CORE: the new reply branches wrote typed numbers (Đáp trả gay gắt win: ghen -1; Đáp lại / Đáp lại khéo fail: ghen +2). Moved to BAL.toil.harshGhen:1, replyGhen:2. (Left as is, pre-existing on main: toilBack(r.host,-1) on a failed reply.)

## Checks
1. 6 levels, one source: TOIL_MK names Mặt mộc/Vụng về/Đoan trang/Kiều diễm/Khuynh thành/Diêm dúa (from makeup-theme-r1, VANPHONG §1 table); tier [40,65,85] -> toilLookOf returns tuyet >= 85 again; react rows/ghenTuyet/crowd/emp-like use tuyet; NPCs judged by the same toilLookOf (two-way unchanged). PASS.
2. Her 8 colours drive every level: TOIL_LOOKS/TOIL_MKS change amount only; hue from toilColRGB(her pick) in both the SVG and the mesh layer. Sample sheets toil-looks-1/-2 looked at (warm row orange/apricot, cool row pink/violet, per level). PASS.
3. Pretty, never clownish — LOOKED at the real reveal close-up (Fold 755x1000@2), 5 levels x faces c07-t3, c31-ty2, c22-t5, c05-t1, c16-t2 with the branch's mesh data: vụng = slightly larger/soft lip + uneven blush, brows untouched; Đoan trang < Kiều diễm < Khuynh thành (luminous, light); Diêm dúa heavy blush/lids but pretty. Lips on the mouth on the turned faces c07-t3 / c31-ty2 (r2 FAIL 1 fixed). mk-layer-scan (quickcheck hook): 12960 pictures, 0 bad. PASS.
4. Tease/reaction family (OD:L1568 1-3): one reaction line (gesture dropped when the spoken line has its own; looked at Fold + iPad: quote, own gesture, grey why-row "Thấy ta điểm trang Vụng về, nàng ta bớt ghen (ghen -2)"); no numbers in the story line; peers (tease, jealousy, crowd) get Cười cho qua / Đáp lại khéo / Đáp trả gay gắt / Im lặng lui đi; Thái hậu / Hoàng hậu / Hoàng thượng scolds keep Xin lỗi; praise -> Cảm tạ/Tạ ơn. toil-tease 25/25 at 755 + 1180, toil-react PASS. PASS.
5. Gates on b9a46096: quickcheck PASS (open 1322 ms, old save from live ok, perf ≈ live, CORE GATES PASS incl. one-core-guard + mk-layer-scan hook); makeup-theme.js 0 fail; mk-reveal 755 + 1180 0 errors, no overflow; coop-toil-look 29/29 and coop-e2e 63/63 (run on ddd4b0d5, the d0a839e8 merge touches no co-op/toil sync code).
6. Kit: no new class/frame; reply options are the kit option cards of the same dialog.

## CDN data — MUST be uploaded before this goes live (owner hold until Foreman C repaint; compared byte-wise with the CDN today)
- dev/art/mkfit/consort-c01.json … consort-c32.json (32 files) -> img/mk-fit/
- dev/art/mkfit/player-look1.json … player-look4.json (4 files) -> img/mk-fit/
- dev/art/toil-fit2.json -> img/toil-fit2.json
- (dev/art/mkfit/md5.json also differs: it is the fit tool's picture-hash list; upload only if the on-upload tooling reads it from the CDN.) The other 63 mk-fit files (maids/mama…) are identical to the CDN. Back up the old CDN copies first; re-run on-upload.sh after C's repaint.
- Without the upload the game runs on the old mesh: OK for the faces looked at (c16 mesh identical), but the r2 chin cases are only fixed with the new data.

## Minor (not blocking; for main)
- ART: fig-consort-c16-t2-a18 has a ragged cut-out at the right cheek (dark hair fringe); in the close-up it looks like a smudge beside the mouth on every level -> Foreman C (repaint list).
- Reveal close-up can open before the figure picture has loaded (seen with forced, uncached faces in the test: layers floated over the backdrop for c07/c05 on the first look). In play her figure is already cached on the stage; low risk. Could preload the figure in toilMkReady.
- Pink halo just outside the far cheek on Diêm dúa for turned faces (c31-ty2) — r2 nit 2 still there, soft.
- Event dialog layout items (4)(5) of OD:L1568 (full-width band, last option card below the fold on Fold) are NOT in this branch (main/kit). Option cards of the tease replies have no pictures (empty frames, same as other toil options) -> picture request.
- Why-row sign uses "-" while the owner's sample wrote "−"; family-wide format, leave to VANPHONG keeper.
- mk-reveal.js still forces look:null for tuyet/vua (old test); this review used a probe that sets the record's look.

Shots: scratch only (looked at, deleted); none in git or CDN.

# r2 — looks3 v5 delta (review/toil-looks2 8acee5db) — VERDICT: PASS ebacfb15
Branch review/toil-looks2-r2 = r1 b9a46096 + merge 8acee5db (only generated files conflicted, rebuilt) + merge main 25bfd7cf. origin/main is an ancestor -> FF ready; contains makeup-theme-r1 + r1 fix (harshGhen/replyGhen kept). Live still waits for the owner's OK on the ?v=5 look (main).
Delta read (jtoil.js +73, mk-layer-scan +3): blush/skin light now painted in the canvas colour layer (toilFaceLayer drops the SVG when a mesh layer exists; SVG stays only for mesh-less faces); clip = face-outline oval from the mesh x skin colour (median of the cheek windows) x no eyes; blush size from the fit row (never shrunk, owner 13:48Z); layer box margin .14 -> .3; cache key now includes the blush colour (col.ma). Render constants stay in TOIL_MKS (same place as before; one-core-guard PASS). Same functions for her, her co-op friend; NPCs unchanged.
Gates on ebacfb15: quickcheck PASS (open 1470 ms, old save ok, perf ≈ live: render 140/150, buổi 814/941), CORE GATES PASS incl. mk-layer-scan 12960 pictures 0 bad (new geometry check: cheek centres inside the outline, below the eyes); toil-tease 25/25; toil-overlay 0 bad; toil-allday 0 missing layers; mk-reveal 0 errors at 755x1000 and 1180x820.
LOOKED (real reveal close-up, branch mesh data, Fold, 5 levels x c07-t3, c31-ty2, c22-t5, c05-t1; iPad c31-ty2): blush stays inside the cheek/face, no hard edge at the clip, eyes clear, lips on the mouth; the far-cheek pink halo of r1 is gone. Vụng về blotchy but soft; Diêm dúa clearly heavier, still pretty.
Nits (not blocking): toilMkGeom keeps an unused `fits` helper; `mO/200+.0` in the eyelid clip reads like a leftover. CDN upload list unchanged (see r1 section).

# r3 — looks3 v7 delta (review/toil-looks2 73a8beed + 8a159f91) — VERDICT: PASS 619edd87
Branch review/toil-looks2-r3 = r2 ebacfb15 + merge 8a159f91 (generated files only, rebuilt); origin/main 25bfd7cf is an ancestor -> FF ready. Live waits for the owner's OK on ?v=7.
Delta: TOIL_MKS numbers only (dep = the v5 tuyet set, new tuyet fuller, diem heavier: bl .78, eyeH 1.18), vụng: lip outline larger, a lip-colour smudge blob beside the mouth (skin pass, so clipped to skin x face outline x no eyes), more/stronger white powder patches (new 'patch' profile). No logic change; `glam:1` on tuyet is read nowhere (dead key, nit).
Gates on 619edd87: quickcheck PASS (open 1223 ms, old save ok, perf ≈ live), CORE GATES PASS incl. mk-layer-scan 0 bad; toil-tease 25/25; toil-overlay 0 bad; toil-allday 0 missing; mk-reveal 0 errors 755x1000 + 1180x820.
LOOKED (Fold, 5 levels x c07-t3, c31-ty2, c22-t5, c05-t1; iPad c22-t5): everything stays on the face, eyes clear, lips on the mouth, smudge beside the mouth (not on the chin). Steps clearly distinct; Diêm dúa heavy but pretty.
LOOK NOTE for main (owner's taste, not a technical fault): the Vụng về white powder patches now read as crisp crossed white strokes / petal shapes on each cheek ("X" marks) in the close-up — show her that close-up explicitly before her OK.
<<<<<<< HEAD

# r4 — looks3 v8 delta (review/toil-looks2 630eaa63) — VERDICT: PASS 3d70778c
Branch review/toil-looks2-r4 = r3 619edd87 + merge 630eaa63 + main ce29592e; FF ready. Live waits for the owner's OK on ?v=8.
MERGE NOTE: 630eaa63 rewrote the BAL.toil line that holds the r1 fix -> resolved by hand: harshGhen:1, replyGhen:2 AND vungB:.5 all kept. (The worker branch itself still lacks harshGhen/replyGhen: land the -r4 sha, never review/toil-looks2 directly.)
Delta: TOIL_MKS numbers (tuyet between v6/v7, diem = v6 + diffuse blush 'diff' profile), vụng A = old lips + 1-2 round white powder puffs; vụng B = TOIL_MKS.vungB (the v7 Diêm dúa set). Pick: toilVungB(col) = hash of col.seed (= wk() of the sitting, stored in S.toilette.col) < BAL.toil.vungB.
Per-day pick (probe in the real page): share B over 1000 seeds 0.504; 5 calls same answer; JSON round-trip of S.toilette keeps seed -> same variant after reload; record without seed (old saves) -> always A, no error; co-op friend reads the friend record's own col.seed -> both seats same (coop-toil-look 29/29). Longest A/B run over weeks 1-120 = 6 (fine for 50 %). Seed is wk(): the variant holds for that sitting's whole record, not re-rolled on reload.
Gates on 3d70778c: quickcheck PASS (open 1332 ms, old save ok, perf ≈ live), CORE GATES PASS (one-core-guard, mk-layer-scan 0 bad); toil-tease 25/25; toil-overlay 0 bad; toil-allday 0 missing.
LOOKED (Fold, c07-t3 + c22-t5: vụng A (seed 7), vụng B (seed 1), Đoan trang, Kiều diễm, Khuynh thành, Diêm dúa): on the face, eyes clear, lips on mouth. A = soft round white puffs (no more crossed strokes). LOOK NOTE for the owner: Vụng về B is now visibly HEAVIER than Diêm dúa (B = v7 Diêm dúa, Diêm dúa went back to v6) — fine if intended ("như hề"), but show B beside Diêm dúa.
Minor: mesh-less faces (SVG fallback) never show B (always A); TOIL_MKS.vungB has no `vung` flag, so B gets no vụng lip smear/jitter (= pure overdone look, as designed); `glam:1` still unused.
=======
>>>>>>> 61f334cd (review kit-ico-rank-r2 report: PASS aaa1bec1)
