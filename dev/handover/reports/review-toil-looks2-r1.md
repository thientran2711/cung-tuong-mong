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
