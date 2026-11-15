# Art progress (art worker, 11/14/2026)

## art13 (worker #13) — STATUS (read first; resumes art12 below)
- Work dir: scratchpad/fw13 (tools copied to dev/figwork/art13/). Logs there: gens13.txt (grid upload id -> edit id), up13.txt,
  agequeue.txt (163 a51 specs, grouped 4 per ageing grid a01..a41), agelist.txt (t8 a51 whose t78 edit did not age), redo.txt, jobs13.txt/runq.log.
- OWNER (11/14, binding): t6 stays. t7 + t8 marks SMALL like the approved Part C pilot (review/maid-art-c sheets/C_t78_pilot_m08/m33):
  t7 = her motif in flat gold leaf + cinnabar enamel, filigree, two minute gold curls, tiny ruby glint, lentil size inside the brow gap;
  t8 = tiny symmetric upright c26-style gold-leaf phoenix holding her tiny <col> <motif>, all gold, NO blue, narrower than the brow gap.
  a51 ageing (~48, smile/nasolabial lines, hair = her own warm dark brown, colour-matched) on t1 t3 t4 t5(-c28 c29 c30) t6 t7 t8(-c06 c32).
- METHOD hdg.py (new, replaces hdf.py): grid tiles come from the 4k LINEUP (FIGURES magnificUrl gen, raw/<gen>.png via need.py), box =
  2.4 x face width (whole face + crown); paste back into the published fig (RGB only, alpha untouched) after ECC alignment
  (coarse-to-fine affine, tile skipped if cc<0.9 -> "BAD ALIGN"), global + ring colour match. Modes per tile: m = forehead only
  (diff hull + forehead ellipse 0.95D x 0.4D), a = face ellipse below the brows (mark/crown/hair/cut-out untouched), ma = both.
  Fig face = topmost confident YuNet face (figface; the old "largest face" picked a painted fan on c05-t7-a26 etc).
  BASE=cur pastes onto the current fig (ageing passes after the marks); default base = figbak/ (original before art13).
- t7+t8: one 4x2 grid per consort (row t7 a18..a51, row t8 a18..a51), gpt-2-6 2:1 4k, prompt `mk13.py t78 cXX` (c06 c32: no t8 ageing).
- Ageing: 2x2 grids of four different a51 faces, gpt-2-6 1:1 4k, prompt `mk13.py age`, pasted with mode a, BASE=cur.
- DONE art13 (11/14 ~23:30Z): t7 + t8 new SMALL marks on all 32 x 4 ages (32 4x2 grids qcXX, gens13.txt) + a51 ageing pasted on
  t1(32) t3(32) t4(32) t5(29, not c28 c29 c30) t6(32) t7(32, in the t78 grid) t8(30, not c06 c32; c03 c05 c09 c11 c12 c13 aged by an
  extra 2x2 ageing grid). Ageing grids a01..a41 (agequeue.txt). Redo grids r09t7 / r21t8 (a51 tile had lost the mark).
  413 figs changed (RGB only, alpha identical: verify.py ALPHA 0), 413 por re-cropped 384x506, cutcheck: only the known t8 pearl-curtain
  crowns >=8 (c11 c08 c20 c07 c28 t8, pre-existing, alpha untouched). t2 and t6 marks untouched; non-consort files untouched.
  Sheets (whole portraits, native por 384x506): dev/figwork/sheets/art13/t78_c01-c08.jpg .. t78_c25-c32.jpg and a51_c01-c08.jpg .. a51_c25-c32.jpg.
- KNOWN / possible follow-up: a few a51 read only ~40 (e.g. c03-t8-a51; c01-t8-a51 came out a bit younger than its art10 version);
  moles.py detect is too noisy on aged faces (wrinkles) - checked by eye on the sheets instead. Credits art13 ~ 79 edits x 270 ~ 21k.
- Quy phi check (coordinator 11/14): rank index 5 (Quy phi) -> dress tier t6 (j66 figTierOf rank+1). main / review/residence-art hold
  ONLY consort t1-t4 art, so figPick falls back to the nearest tier = t4 (Tan dress, c03-t4-a18 for Chu Van Thuong). Fig and portrait are
  consistent (same file). Every rank >= Phi (t5-t8) shows t4 dress until review/consort-art (t5-t8) is merged. No redraw needed.

## art12 (worker #12) — STATUS (read first; resumes art11 below)
- Work dir: scratchpad/fw12 (copy of fw11, paths sed'ed to worktree agent-a36359ad81f20b98e; fw11/bg pngs deleted for disk).
  DISK is tight (~4 GB free): delete bg/<10-char-id>.png raw downloads and *.orig.png / *.prehd.png after publishing.
- New tools (copied to dev/figwork): hd.py (HEAD-GRID forehead fix, coordinator method (a)): `hd.py make JID BG grid.png` = 2x2 grid of
  the 4 faces (YuNet, 1024/tile) from bg/<JID>-<BG>.png; upload, gpt-2-6 edit at 2k 1:1; `hd.py paste JID BG edit.png` finds the new
  mark in each edited tile (compact round blob near the brow midline), aligns (phaseCorrelate) and pastes back ONLY a feathered
  ellipse (0.34 x 0.36 eye-distance) around it into the 4k cut-out (RGB only, alpha kept, backup *.prehd.png); `DRY=1` prints only,
  `DOT="k:x,y"` overrides a tile. Then sheetproc.py + post.sh as usual. zoom.py (before/after forehead strips, AFTER=1),
  urladd.py (ids -> urls.json from this transcript), prep.py (download bg + darkfix + demole without sheetproc), put.py/dl.py
  (upload PUT / download from transcript; edit the jsonl path for a new agent).
- t1 dot prompt (2x2 grid): "...completely remove the current ornament painted on the forehead between the eyebrows (no petal, no flower,
  no drop, no stem, no leaf may remain; restore clean smooth skin there) and paint in its place one single small plain solid round <col>
  dot, a perfect little circle about one third the width of an eye, flat paint on the skin, centred just above the eyebrows..."
- !!! COORDINATOR STOP (11/14 ~19:20Z): the "t1 = plain dot" rule was NOT the owner's; she had approved t1-t6 + t8 huadian
  (t1 = c03-t1-style small flower in each identity's motif). NO MORE HUADIAN CHANGES. t2 stays as is (done, approved look).
  => REVERTED: all consort t1 fig/por (128 files) + their FIGURES.json records to 65a75ed7 (= state before workers #10/#11 t1 edits,
  moles already removed there). This also drops the #10/#11 a51 ageing on t1 (it was combined with the mark edit) - ask coordinator
  whether to redo t1 a51 ageing with the keep-marks prompt. My t3 mark edits (gens12 "art12 a51+t3") were NEVER published (discarded).
  The hd.py head-grid dot work (hdfix12.txt, sheets/art12/forehead_t1_all.jpg) is obsolete - kept only as a tool.
- KEPT: c09-t2-a18 cheek mole removed (moles.py fix por 159,224,5 on the fig, then porcrop). c23-t2-a18 checked: no mole.
  t2 wide marks c13/c24/c26: left as is (coordinator: t2 done).
- NOW: a51 ageing only, marks untouched, prompt = mk11.py AGE text + " Keep every forehead mark exactly as it is. No moles. No text."
  (mk11.py <tier> for t4-t8 prints it; for t3 use the same text - do NOT use mk11 t1-t3 HU repaint). Whole-lineup gpt-2-6 edit 2:1 4k,
  ref = current lineup gen (FIGURES magnificUrl), then images_remove_background -> bg_tN.txt "jid gen bg" -> urladd.py ids ->
  prep.py bg_tN.txt -> sheetproc.py bg_tN.txt jids -> post.sh N cids -> pairs.py / fh.py check (marks must be unchanged).
  t4 pilot c01-c04 generated (bg_t4.txt, gens12 "art12 a51 keep marks") - NOT processed yet (prep.py bg_t4.txt; sheetproc; post.sh 4).
- OWNER 11/14 ~19:30Z "Vẽ lại bậc 8": t8 marks too big, read as scars. NEW t8 mark = tiny refined gold-leaf phoenix, S-curved body
  wrapping a tiny <col> <motif>, few kingfisher-blue accents, fingertip size, no wider than the gap between the inner brow ends.
  PILOT DONE on c03 c12 c19 c26 t8 (all 4 ages) with hdf.py (head grid made from the 4 FIGS, not the lineup, so rematte/fa
  alpha is untouched; paste = convex hull of changed pixels (old+new mark) in a forehead window, RGB only; backups
  scratchpad/fw12/hgrid/figbak/). Grid uploads / edits: c03 mE36lbBhJQ->rgeDZ6hxtc, c12 9ZQEdWcNYZ->u5nGO7AQLD,
  c19 Syt8W30Ub8->gOIoYnsSXO, c26 dtyJkE4XSL->ov9Pxje829. Prompt: see hdf8 prompt in this file's art12 notes below.
  Sheets: dev/figwork/sheets/art12/t8_pilot_truoc_sau.jpg (before|after), t8_pilot_forehead.jpg.
  WAITING for owner OK before the other 28 consorts. t6/t7 ON HOLD.
  t8 prompt: "Edit this image. It is a 2x2 grid of four close-up portraits of the same woman at different ages. Keep everything exactly
  identical: faces, ages, expressions, eyes, eyebrows, hair, crown and hair ornaments, skin, colours, lighting, framing and the grid
  layout. The ONLY change, on each of the four faces: completely remove the current ornament on the forehead (restore clean smooth skin
  there) and paint a new one in its place: a tiny, refined stylised phoenix in thin gold leaf painted flat on the skin, its slender
  S-curved body and tail wrapping a tiny <col> <motif>, with a few tiny kingfisher-blue accents. Small and delicate, about the size of
  a fingertip, no wider than the gap between the inner ends of the eyebrows, centred just above the brows; crisp, elegant and
  jewel-like, clearly a painted ornament, never a scar or birthmark; no frame, no pearls, nothing raised. Identical on all four faces.
  No moles. No text."   (<motif>,<col> from HUADIAN.md / spec6 HD)
  WARNING ORDER: t8 a51 ageing = whole-lineup edit + sheetproc, which REWRITES the figs (loses hdf marks AND rematte). So for t8 do
  the ageing first (then re-apply fapick/rematte as before), then hdf.py marks; or age the a51 via hdf-style head edit on the fig.
- REMAINING (exact): (1) owner OK on t8 pilot -> hdf.py t8 for the other 28 (skip none); (2) a51 ageing, marks untouched:
  t3 all 32, t4 all 32 (pilot gens c01-c04 waiting), t5 except c28 c29 c30, t6 all, t7 all, t8 except c06 c32 (mind WARNING);
  (3) t1 a51 ageing was reverted with the t1 marks -> ask coordinator whether to redo it (keep-marks prompt);
  (4) t6/t7 mark redo only if owner asks.

## art11 (worker #11) — STATUS (read first; resumes art10 TODO below)
- Work dir: scratchpad/fw11 (copy of dev/figwork, paths sed'ed to worktree agent-a4b0765092fc7d9e0; local cv2.py renamed cv2_jobs.py
  there so it no longer shadows OpenCV). New helpers (copied into dev/figwork): au.py ("id prodnum hmac" -> urls.json, saves context vs
  pasting full URLs), dl.sh (curl bg pngs of a bgNN.txt), post.sh (tier cids: fapick if cutcheck>=4 + porcrop + list cutcheck>=4),
  pairs.py / fh.py (sheets: 4 ages per lineup face crops / forehead zoom), hdmark.py (abandoned automatic mark detector, unreliable).
- Cheaper loop: images_remove_background can be called on a gen id without creations_wait (it errors "still processing" if not ready).
- Gen ids: gens12.txt ("jid gen" = a51 ageing + tier huadian edit via mk11.py; "jid gen dot-only" = huadian-only re-edit),
  bg ids: bg12*.txt bg13*.txt bg14*.txt bg15.txt (jid gen bg).
- DONE (edited, processed, porcrop): t1 c18-c32 and t2 c01-c32 a51 ageing (+ huadian edit). AGEING WORKS: a51 now reads ~48
  (smile/nasolabial lines, dark hair) on the t1 sheet.
- PROBLEM FOUND: the combined "age + ERASE mark + paint new mark" edit does NOT reliably replace the forehead mark. Forehead zoom
  (fh.py) of t1 c01-c32 (incl. art10's c01-c17): only c08 c17 c20 c21 c25 c28 are plain dots; the rest keep petals/drops/stems/leaves.
  => t1 needs a huadian-only re-edit (prompt below), pilot on c01 c02 c04 c05 (gens12 "dot-only").
  t1 dot-only prompt: "Edit this image. Keep everything else exactly identical: the four women's faces, ages, expressions, hair,
  headdresses, outfits, poses, props, colours, background and framing. The ONLY change is the small ornament painted on the forehead
  between the eyebrows of each of the four women: remove the current ornament completely (no petals, no flower, no drop, no stem, no
  leaf may remain) and paint in its place one single small solid round <col> dot, a perfect little circle about the size of a lentil,
  flat paint, nothing else. No moles. No text."  (<col> = HD colour from spec6.py, see mk11.py)
- c28 t2 motif "single round pearl dot" changed to "vertical teardrop pearl" (else identical to the t1 dot).
- RESULTS art11: t2 all 32 GOOD (sheets/art11/age_t2_all.jpg): a51 reads ~48, every t2 mark is a clear flat one-colour motif
  silhouette, clearly unlike a dot. Watch: c24 ginkgo / c26 crescent+dot / c13 cloud are wide-ish; faint cheek dots on c09-a18,
  c23-a18 (check with moles.py detect). t1 c18-c32 a51 ageing GOOD (sheets/art11/age_t1_c18-c32.jpg).
- t1 HUADIAN STILL FAILS: sheets/art11/forehead_t1_all.jpg. Even the huadian-ONLY "dot-only" pilot (c01 c02 c04 c05 t1, now
  published, ageing kept) left flowers/double drops: GPT on the 4-figure 4k lineup does not change a tiny existing mark into a dot.
  t2 worked because the new motif is a different, bigger shape. Ideas for next worker: (a) edit face close-ups (crop each head from
  bg/<jid>-<bg>.png, upload, gpt-2-6 edit "replace forehead ornament with one plain round dot", paste back with alpha), or (b) paint
  the dot in code after inpainting the old mark (hdmark.py detector was NOT reliable: brows/hairline/pale marks; would need manual
  centres per figure). Ask coordinator which is allowed (owner rule: no code-drawn art where a painting is expected).
- REMAINING (exact):
  * t1 huadian -> plain dot on c01 c02 c03 c04 c05 c06 c07 c09 c10 c11 c12 c13 c14 c15 c16 c18 c19 c22 c23 c24 c26 c27 c29 c30
    c31 c32 (OK already: c08 c17 c20 c21 c25 c28). a51 ageing on t1 is DONE for all 32.
  * t3 all 32: a51 ageing + t3 huadian (`python3 -I mk11.py 3`), not started. Expect the same "keeps old mark" risk; t3 shape is
    different from the current marks, so it may work like t2 - pilot 4 first and check with fh.py.
  * t4-t8 a51 ageing (keep marks): not started; skip t5 c28 c29 c30, t8 c06 c32. `python3 -I mk11.py 4` etc.
- Credits art11: 43 gpt-2-6 edits x 270 + 43 bg cuts x 3 = ~11.7k. Balance at start 1.749M.

## KIT REVIEW FAIL 11/14 (dev/review/consort-art.md) — art10 round 2, STATUS + TODO (read first)
- DONE: (1) merged origin/main (65a75ed): every non-consort fig/por = main (no-moles versions), consort fig/por = branch,
  FIGURES.json hand-merged (dev: scratch mergefig.py: main records + branch consort records). Non-consort diff vs main = 0.
  (2) a51 ageing + distinct huadian t1: c01-c17 t1 edited (gens11.txt / bg11.txt), processed with run10.py + fapick.py + porcrop.
  Sheet dev/figwork/sheets/art10/age_t1_c01-c17_done.jpg (pairs a18|a51): a51 now ~48 (smile lines, nasolabial, dark hair), t1 = plain dot.
- TODO (same method, one gpt-2-6 edit per lineup, prompt = `python3 -I mk11.py <tier> [cids]` (prints "jid srcgen | prompt";
  t1-t3 also repaint the huadian, t4-t8 keep it):
  * t1 c18-c32; t2 all 32; t3 all 32  (HU in mk11.py: t1 plain round dot / t2 flat one-colour motif silhouette / t3 motif with
    darker outline + pale centre + two flanking dots -> t1-t3 now clearly distinct; t4+ unchanged).
  * a51 ageing on t4-t8: per age sheet (`python3 -I agesheet.py out.jpg <tier>`) almost every a51 looks 18-25; already aged enough:
    t5 c28 c29 c30, t8 c06 c32. Edit the rest.
  * Prompt notes: v1 "two or three silver strands" made hair grey -> v2 (mk11) says hair stays fully DARK, NOT greying: works (pilot c05/c12 t1).
  * Pipeline per batch: gens -> creations_wait -> images_remove_background -> write "jid gen bg" (bgNN.txt) + "bg url" lines,
    add urls to urls.json, curl bg/<bg>.png, `python3 -I run10.py bgNN.txt`, then fapick.py on cutcheck>=4, porcrop.py, agesheet check.
  * After all: re-check cutcheck, PROGRESS, push, report SẴN SÀNG KIỂM LẠI. Remaining cost ~ 223 edits x 270 = ~60k credits.

## CURRENT STATE (art worker #10, 11/14 — newest, read this first)
- Took over #9's uncommitted output (origin/wip/consort-art, 1642 files) and checked EVERY changed image: per-identity face sheets
  (rows = 4 ages, cols = t1..t8, `python3 -I idsheet2.py out.jpg cXX`), full-figure tier sheets on dark green (`tierfull.py`),
  cutcheck on all 1024 consort t1-t8 figures.
- Findings in wip: (1) all wip portraits were the OLD 256x256 square crop (sheetproc.finish still writes that) -> every por re-made with
  porcrop.py (all 1152 consort por now 384x506); (2) #9's re-runs dropped the solidSheer/fa fix on sheer lineups (c04 t1-t5, c02-t4,
  c11-t1/t4, c14-t2, c29-t1, c30-t4/t6 ...: cutcheck 15-94) -> `fapick.py` re-applied mm_fa where it lowers cutcheck (132 figs);
  (3) huadian wrong/missing/too big on 33 lineups; (4) a few moles left.
- FIXES (gpt-2-6 edit of the current lineup, prompt from `mk10.py` = mkedit wording + a per-lineup note; ids in gens10.txt,
  "jid gen bg" in bg10.txt; `python3 -I run10.py bg10.txt jid..` = darkfix + demole + sheetproc, then porcrop):
  faint/missing -> c01-t4 c04-t4 c09-t5 c16-t1 c20-t1 c25-t1 c27-t5 c28-t1; too big -> c10-t4 c10-t5 c21-t5 c29-t5 c30-t5;
  wrong material/shape -> c01-t5 (no gold) c03-t5 c05-t5 (dark crescent) c04-t6 (violet gem) c17-t3 (flower, must be heart);
  t8 phoenix wrong/too big/round -> c06 c09 c11 c12 c14 c19 c20 c21 c23 c24 c25 c26 c29 c32 (c12/c14/c32 needed 2-3 passes:
  "ERASE the current ornament, then paint a tiny phoenix..."; c32-t8 last pass also re-aged the a48 figure).
  Moles removed by inpaint (`python3 -I moles.py fix fig.webp x,y[,r]` in por coords; `moles.py detect` + `gridv.py` to locate):
  c01-t2 c01-t5 c07-t1 c07-t3 c09-t2 c09-t5 c15-t4 c15-t7 c17-t3 c17-t4 c23-t7 c23-t8(x4) c28-t3 c28-t4.
- KNOWN / ACCEPTED: c24-t5 ginkgo stays wide (3 edits could not shrink it; same width as her t3/t4 ginkgo); c04-t6 is a small
  pink-violet drop (reads as gem, small); c30-t5 wave crest is wide but flat. cutcheck >=8 left on 18 t8 figures (c04 c07 c08 c09
  c11 c14 c19 c20 c28): all pearl-curtain crowns, look clean on dark bg (dev/figwork/sheets/art10 + scratch cut18.jpg) - rematte
  single figures (mm.py) only if the kit reviewer flags a halo. c11-t2 is lilac like her t1 (HANDOVER OPEN item closed).
- Sheets: dev/figwork/sheets/art10/huadian8_c03.jpg, huadian8_c19.jpg, huadian8_c26.jpg (8 tiers x 4 ages), full_t8_c17-c32.jpg.
- Credits art10: 39 edits x 270 + ~40 bg cuts = ~10.7k.

## CURRENT STATE (art worker #9, newest first — read this first)
- Same worktree/scripts as art8 (scratchpad/wt-art8, branch art8 -> review/consort-art). DISK: the volume fills up (0 MB free once);
  delete figwork/raw/*.png and figwork/bg/*.png after each published batch (all re-downloadable from urls.json).
- T1 CALM REDRAW DONE (32/32, incl. the approved pilot c01 mE3yQeWhJQ): prompt = `python3 p7.py N-cXX-tT` (pj.py prompt with the
  approved pilot wording: "keep EXACTLY her face ... (the same woman)"; t2/t3 still say NEW outfit). `python3 p7v.py JIDs` prints only
  the variable parts and checks the rest equals the template. Gen ids in sheets5.txt ("art9 calm+props"), bg in sheets4_bg.txt.
  All looked at (raw sheets + heads): same faces, calm, 4 different props, dark hair at 48, t1 huadian present; moles in the frozen
  faces (c07 c09 c15 c17 c23) removed by demole in run.sh. mm_fa (fa_apply.py, solidSheer) on c04 c11 c29 t1. idfix.json NOT changed.
- T2 CALM REDRAW DONE (32/32): same p7.py wording (NEW outfit kept), all looked at; mm_fa on c04 c14 t2. c17 a19 'spool of
  silk thread' (needle case dropped), c29 a19 guqin 'cradled in both arms' (prompt tweaks, rest = p7.py).
- T3 CALM REDRAW DONE (32/32): p7.py wording; where the pool gave both a round fan and a closed folding fan (c12 c16 c27 t3) the
  a48 prop was swapped to the teacup. Note: a few t1/t2 lineups keep round fan + closed folding fan (c12 t1, c23 t1, c14 t2,
  c25 t2) - different objects, left as is. mm_fa on c04 t3. => t1-t3 calm redraw COMPLETE (96 lineups incl. pilot).
- HUADIAN EDITS (step 2): `python3 mkedit.py` -> _edits9.json [jid, current lineup gen, prompt] = one gpt-2-6 edit per lineup
  (2:1 4k): tier huadian from spec6 HL/HS + remove moles + keep hair dark. T4 DONE (c02 c03 c05 c06 c08-c18 c25 c30): c16 needed a
  2nd edit (first pass left it invisible), c12 needed 3 passes (GPT kept skipping the a48 figure). T7 c01-c13 DONE (flat gold leaf +
  cinnabar enamel + tiny ruby glint). Remaining moles in edits are removed by demole in run.sh. mm_fa (fa_apply.py) on sheer stoles
  of c02/c09/c11/c30 t4 and c01/c04/c06 t7 (only where cutcheck dropped; c11/c07 t7 kept un-fa'd: fa raised resid there).
- Credits art9: see bottom line.

## CURRENT STATE (art worker #8, newest first — read this first)
- WORKTREE/PUBLISH: scratchpad/figwork (work copy, copied from dev/figwork) + worktree scratchpad/wt-art8 (branch art8). Scripts sed'ed
  wt-art7 -> wt-art8. Next worker: `sed -i 's/wt-art8/wt-art9/g; s/origin art8:/origin art9:/'` on bigsheet.py cmp.py fixalpha.py idsheet.py
  sheet.py sheetproc.py tiersheet.py heads.py porsheet.py pub3.sh (and recreate the worktree). Local cv2.py shadows OpenCV: always run
  porcrop/cutcheck/demole with `python3 -I`. pip install "opencv-python-headless==4.10.0.84".
- CUTOUT FIX (batch 1): cutcheck found 99 consort figs >= 8. Two causes: (a) sheer gauze rendered semi-transparent (t1-t6 lilac/sheer
  lineups) -> `mm_fa.py` (= fixalpha core: partial alpha inside the silhouette composited over parchment, made opaque) brings them to ~0-2;
  (b) t8 crown pearl curtains / train with ghost halos -> single-figure re-matte: `mm.py crop _mm_t1.txt` crops each figure from the raw
  generation, uploaded in ONE batch (creations_request_upload count=99 + curl PUT + creations_finalize_upload batch), images_remove_background
  per crop (3 cr), `mm_harvest.py` pairs source->bg ids from the transcript, `mm.py fin name bg ...` pastes back into raw-size canvas,
  runs demole, writes mm/rm/. Per figure the lowest cutcheck of {orig, fa, rematte, fa(rematte)} was taken (mm_pick_art8.txt:
  47 fa(rematte), 47 fa, 3 rematte, 2 orig). FIGURES records got "rematte": bgId and/or "solidSheer": true. Single-cut alone is WORSE on
  sheer figures (it keeps the gauze transparent) - always compare.
- PORCROP: ALL 1633 por-*.webp on the branch re-cut to 384x506 with porcrop.py (face-centred). Run it again on every new fig.
- HUADIAN (owner 11/14 latest): t8 phoenix shrunk to 85% (Bh4gdXkoQR), t7 redone FLAT like t8 (gold leaf + red enamel plum, filigree,
  two tiny gold curls, tiny ruby glint, no raised pearls; lJ8MSRegv9), t6 compact with a tiny flat pearl dot (ksDzKrd16B); t5 kept (flat,
  no gems). Rule: raised/jewelled = SMALL; flat painted = may be a touch larger. spec6.py HL[6..8]/HS[7,8] + HUADIAN.md updated (only
  t6-t8 jobs changed). Previews: dev/figwork/sheets/huadian_c03_face_t1..t8.jpg, huadian_c03_face_all.jpg, huadian_c03_8nac.jpg.
- T4 CALM REDRAW DONE (c01 c07 c19 c20-c24 c26-c29 c31 c32): spec7.py (run after spec6) gives every figure a DIFFERENT prop + hand gesture
  (a19 keeps her signature prop; a24/a32/a48 from a pool: scroll, lantern, teacup, brocade box, plum sprig, flute, handkerchief, round fan,
  prayer beads, closed fan, touching a hairpin) + "EACH figure holds a DIFFERENT object". All 14 looked at: calm, distinct props, huadian
  t4 visible. Hair-edits (dark hair, no moles) on c07 c20 c32; mole edit c23 (GPT kept the moles; demole removed most - c23 a19 still has a
  faint cheek dot, fix with demole spot= if owner minds). c16-t4 edit: a19 eyes OPEN now (was eyes closed); c04-t4 edit: moles removed +
  mm_fa (sheer sleeves). Gen ids: sheets5.txt / sheets4_bg.txt. Sheet: scratchpad/sheets/por_t4.jpg.
- T6 c01-c16 REDRAWN (saturated, calm, distinct props via spec7.py P6, t6 flat huadian with tiny pearl dot): all 16 looked at,
  colours clearly their palette, a51 hair dark, moles mostly removed by demole. Sheet scratchpad/sheets/por_t6a.jpg.
- T5/T6 HAIR (step 4) DONE: heads.py showed t5 a51 almost all grey + cheek moles + no/odd huadian. One gpt-2-6 edit per lineup
  (_edits_t56.json: dark hair, remove moles, add the tier huadian painted flat) on t5 c01-c32 and t6 c17-c32 (48 edits, ids in sheets5.txt
  "hair/mole/huadian edit of"); c24 ginkgo came out big twice -> shrink edits (t5 gOIDrdeSXO, t6 huRyB6QvqL). All looked at: hair dark,
  huadian present; a few faint cheek moles remain where the frozen t1 face has one (c07, c09, c17, c23) - demole catches most.
  mm_fa applied again on sheer lineups (c04/c11 t5, c16/c25 t5, c30 t6). Sheets scratchpad/sheets/heads_t5_after.jpg, heads_t6_after.jpg.
- NEXT: step 5 = t1-t3 calm redraw (96 lineups). Prompts READY: spec7.py now also rewrites N-cXX-t1/t2/t3 poses (a19 keeps her signature
  prop, a24/a32/a48 rotate the pool skipping props that clash with the signature). Identity ref stays the frozen t1 (idfix.json); draw a
  PILOT DONE: c01 t1 mE3yQeWhJQ (not published) vs frozen p8Jr7Q4ehw -> dev/figwork/sheets/pilot_c01_t1.jpg + _heads.jpg: same face and
  outfit, calm, 4 different props, a48 dark hair (old t1 a55 was grey), pink t1 huadian, no mole. Wording used = pj.py prompt with "keep EXACTLY
  her face" (t1 keeps the outfit too). Owner/coordinator to OK the pilot, then run all 96 (do not pin new t1 in idfix.json); old t1-t3 lineups have no huadian and some moles.
  Also open: t4 c02 c03 c05 c06 c08-c18 (+c25 c30) are the older calm lineups without huadian; t7/t8 lineups predate huadian too.
- Credits used by art8: ~25.4k by my own count (6 huadian edits 1.05k, 30 lineups 8.1k, 58 lineup edits 15.7k, ~185 bg cuts 0.56k). Account balance 1.944M (shared with other workers).

## CURRENT STATE (art worker #6, newest first — read this first)
- WORKTREE/PUBLISH: same as art5 but wt-art6 / branch art6 (scripts in scratchpad/figwork already sed'ed to wt-art6; next worker:
  `sed -i 's/wt-art6/wt-art7/g; s/origin art6:/origin art7:/'` on bigsheet.py cmp.py fixalpha.py idsheet.py sheet.py sheetproc.py tiersheet.py heads.py pub3.sh).
- DONE: t8 all 32 (c05–c32 this session, prompt = pj.py N-cXX-t8). Where spec5 gave the same object to 2–4 figures, I swapped ONE or TWO
  figure props in the prompt only (spec5 untouched): c06 a24 one-hand fan, a32 ruyi, a48 jade beads; c07 a32 plum sprig; c10 a32 celadon
  vase; c12 a48 ruyi; c13 a32 gilt hand-warmer; c14 a32 teacup; c16 a32 book; c18 a48 book; c19 a32 white jade ruyi; c20 "embroidered
  silk folding fan" (not gauze), a32 celadon vase+lotus bud; c22 a32 orchids; c24 a48 coral beads; c25 a32 parasol; c28 a32 teacup;
  c29 a19 guqin cradled in both arms; c30 a32 teacup, a48 book; c31 a32 white plum. Every result looked at; heads.py on all 32 a51:
  grey on c09 c13 c17 c18 c19 c26 c31 -> hair-only GPT edit (sheets5.txt "hair-edit of"), all 32 now dark. propchk t8: NECK 4.4–5.1
  (tall crown) and a51 WIDE 1.8–1.97 (train) = known t7/t8 pattern, slim by eye. Sheet scratchpad/sheets/tier8.jpg. Pushed 3fcdc8b.
- COLD PALACE (tcold) STARTED: c01–c06 done (sheet scratchpad/sheets/cold_partial.jpg). Prompt = pj.py N-cXX-tcold but I replace
  "robe and skirt hanging straight ... all fabrics opaque silk" with "robe hanging straight and calm, sleeves and sash falling naturally
  with NO swirling and NO flying fabric; all fabrics opaque" (linen, not silk). Poses rotate in 4 sets by cid mod 4 (spec5 cold_pose);
  style ref rotates with it. c05 tcold came out with a HIGH top bun instead of a low bun — redo if owner minds.
  FIGURES records: tier "cold", palette "undyed grey-white linen". cutcheck.py is NOT on main yet (not run).
- NEXT (in order): tcold c07–c32, then t4 calm redraws (c01 c07 c19 c20–c24 c26–c29 c31 c32 + c04/c16 a18 eye check), t6 c01–c16
  saturated redraw, t5/t6 a51 hair check with heads.py, t1–t3 calm redraw (pin new t1 only after side-by-side).
  Credits used by art6: ~41k (balance 2.216M).

## CURRENT STATE (art worker #5, newest first — read this first)
- WORKTREE/PUBLISH: work copy = scratchpad/figwork; scripts write into scratchpad/wt-art5/img (branch art5). Next worker: create your own
  worktree (wt-art6, branch art6) and `sed -i 's/wt-art5/wt-art6/g; s/origin art5:/origin art6:/'` on bigsheet.py cmp.py fixalpha.py idsheet.py
  sheet.py sheetproc.py tiersheet.py heads.py pub3.sh. `bash pub3.sh "msg"` commits, rebases on origin/review/consort-art, pushes art5:review/consort-art.
- PROMPT CHANGES (all in spec5.py, appended blocks marked "art5"; jobs.json already rebuilt — do NOT rerun spec2-5 blindly, the blocks are
  idempotent but the older spec scripts are not guaranteed to be):
  * a48 wording now "her hair still fully DARK black-brown like the younger figures, at most two or three single fine silver hairs barely visible,
    NO grey streak, NO grey or silver temples, NOT grey-haired ..." (the "few silver strands at the temples" wording still gave grey temple streaks).
  * opaque clause added to every prompt after "NO flying fabric": "all fabrics opaque silk, NO sheer see-through gauze, NO floating stole".
    When a consort's prop says "gauze fan" (c04, c20), write "silk fan" instead in the prompt.
  * LAD[8] (Empress) rewritten: dense gold+kingfisher embroidery, floor-length mantle edged with gold brocade+pearls, wide pearl-fringed cloud
    collar, taller/wider nine-phoenix crown with pearl curtains; train "trailing straight behind her, NOT spread wide, slim tall silhouette"
    (first c01 trial with a spread train gave a36/a51 H/W 1.76-1.86).
- HAIR-EDIT TRICK (cheap, keeps the lineup): images_generate gpt-2-6, 2:1, 4k, quality high, references=[{type:image, identifier:<old gen id>}],
  prompt "Edit this image. Keep everything exactly the same: the same four figures, same faces, same outfits, same crowns, same poses, same colours,
  same plain parchment background, same composition and framing. Change ONLY the hair: every woman's hair is fully DARK black-brown, with NO grey
  streaks and NO grey or silver temples; the rightmost (oldest) lady may have at most two or three single fine silver hairs, barely visible. No text, no labels."
  Then bg-remove + run.sh as usual. `python3 heads.py out.jpg <tier> c01 ..` = a51 head crops to check greyness. t5/t6 a51 were NOT checked yet
  (likely grey too — check with heads.py and hair-edit where needed; owner hates grey).
- IMPORTANT: run.sh needs the bg URL harvested from a creations_wait output in the transcript — always creations_wait on the bg ids before run.sh
  (otherwise it prints NOURL and silently keeps the old figure).
- DONE: t7 all 32 (c17–c32 new; 27 lineups hair-edited to dark: c02 c03 c05 c06 c07 c09–c18 c21–c23 c25–c32; c20 redrawn with new wording).
  Sheet scratchpad/sheets/tier7.jpg. t8 c01–c04 done (sheet scratchpad/sheets/tier8_cmp.jpg = t7 vs t8 side by side; t8 clearly grander).
- NEXT (in order): t8 c05–c32 (`python3 cv3.py 8 cXX ..`, full prompt via pj.py; t8 a36/a51 propchk WIDE 1.85-1.95 by spread train is the
  known t7/t8 pattern, check by eye), then tcold all 32, t4 calm redraws (c01 c07 c19 c20–c24 c26–c29 c31 c32 + c04/c16 a18 eye check),
  t6 c01–c16 redraw with the saturated wording, check t5/t6 a51 hair, t1–t3 redraw. Credits used by art5: ~43k (balance 2.26M).

## CURRENT STATE (art worker #4, newest first — read this first)
- WORKTREE/PUBLISH: work copy = scratchpad/figwork; scripts now write into scratchpad/wt-art4/img (branch art4); `bash pub3.sh "msg"` commits there,
  rebases on origin/review/consort-art and fast-forward pushes to it (never main, never force).
- COLOUR RULE t6–t8 (art4): t6 first tries of pale palettes (c17 blush pink, c20 lotus pink) washed to cream/gold. spec5.py now writes for t>=6
  "robe of SATURATED <main> silk ... COLOUR RULE: robe, skirt, sleeves, cape and train are all clearly <main> silk ... large areas of plain <main> silk
  visible; <accent> only as a small accent; gold only as thin accents ...; NOT cream, NOT beige, NOT ivory, NOT an all-gold robe". t7/t8 LAD rewritten
  the same way (no more "golden phoenixes all over / bright gold and red"). `python3 cv3.py <tier> cXX..` prints the variable parts.
- LÃNH CUNG prompts added: jobs N-cXX-tcold (spec5.py end: COLDO shared outfit, IDC identity = face/features/hair colour only, cold_pose(g) rotates
  broom / bowl / lamp / hands-folded so the four figures hold different things). figs files fig-consort-cNN-tcold-aAA, tier "cold".
- DONE: t6 all 32 (c17–c32 this session; c17 c20 c28 c30 c31 c32 with the strong colour clause). Sheet: scratchpad/sheets/tier6.jpg.
- DONE: t7 c01–c16 (v7b). First t7 try (v7a, "SMALL gold phoenix crown", no cape) looked POORER than t6 -> rejected; spec5 LAD[7] now =
  jewelled pearl-edged cloud-collar cape + jade-gold belt + LARGE gold phoenix crown with spreading wings; LAD[8] = gold-and-pearl cape +
  "the GRANDEST headdress of all: FULL tall gold phoenix crown with nine phoenixes". (t8 not drawn yet — check one t8 against t7 first.)
  Sheets: scratchpad/sheets/tier7_partial.jpg (c01–c16), ladder_c01.jpg (t1–t7; t4 still the old motion lineup).
  propchk on t7: NECK 4.9–5.1 everywhere = the taller crown (bodies are fine by eye); WIDE 1.74–1.98 mostly on a51 = the floor train
  spreading (t7 spec), checked by eye: tall and slim, not squat. OPEN QUESTION for owner review: a51 hair at t7 is greyer than the
  "few faint silver strands" rule on c03, c13 (and a bit c05/c14) — redo those a51 if the owner flags it; for new prompts consider adding
  "dark hair with only two or three thin silver strands" to the a51 wording.
- COORDINATOR BUGS (fixed): c30-t4-a18 grey bg-removal smudge + sheer floating sash -> c30 t4 REDRAWN calm (opaque silk clause:
  "all fabrics opaque silk, NO sheer see-through gauze, NO floating stole"); c25-t4 had the same sheer floating sash -> REDRAWN calm too
  (both pass propchk; sheet scratchpad/sheets/tier4_calm_partial.jpg). c04-t4-a18, c04-t3-a51, c29-t1-a18 (sheer sleeves letting the
  background through) fixed in place with new fixalpha.py (inside the hole-filled silhouette, >3 px from the edge, partial alpha is
  composited over parchment and made opaque; por re-cut). Do NOT use fixalpha on figures with big floating sheer sashes (it fills the
  loops with cream) — redraw those instead. Add the opaque clause to every remaining t4 calm redraw and to t1–t3 redraws.
- NEXT (in order): t7 c17–c32 (`python3 cv3.py 7 c17 ..`, prompt = pj.py N-cXX-t7), then t8 all 32, then tcold all 32 (pj.py N-cXX-tcold),
  then t4 calm redraw of c01 c07 c19 c20–c24 c26–c29 c31 c32 (c25 c30 done) + eye-check c04/c16 t4 a18, then t1–t3 redraw (pin new t1 in
  idfix.json only after side-by-side with the old one). Gen ids: sheets5.txt; bg ids: sheets4_bg.txt.

## CURRENT STATE (art worker #3, newest first — read this before anything below)
- WORKTREE/PUBLISH: work copy = scratchpad/figwork (scripts write figures into scratchpad/wt-art3/img = branch art3, NOT the shared
  checkout); `bash pub3.sh "msg"` commits there and pushes to review/consort-art (rebases on it first). pub2.sh (shared checkout) is retired.
- OWNER REVERSAL (binding, replaces the MOTION rule below): calm STANDING poses like the early t1 lineups (upright, composed, still):
  NO swirling hems, NO flying sleeves/sashes, NO dance steps, NO mid-stride; c19-t4 is NO LONGER the reference — the early t1 lineups'
  stillness is. Variety only from ARMS/HANDS/PROPS + slight 3/4 turns and head tilts; younger livelier gestures, older calmer.
  Implemented in spec5.py (G19/G24/G32/G48 + STILL clause incl. "about seven and a half heads tall ... never crouching, bending or leaning").
  Old motion version kept as _spec5_motion.bak (not published).
- PROPORTIONS (owner complaint: c07-t4-a36, c23-t4-a36, c24-t4-a26 squat): pipeline is uniform-scale (sheetproc only crops + scales
  w*900/h x 900) — not the cause. Cause = wide swirling fabric (opaque-bbox H/W 1.7–1.9 vs 2.2–2.7 for calm figures) so the figure renders
  smaller/shorter in fixed frames, plus "compact" in the old prompt. `python3 propchk.py "<glob>"` flags H/W<2.0 (WIDE) or head-to-neck
  ratio too low (NECK<5.5, <5.1 at t5+ because of tall headdresses). Run on every new batch before accepting.
  Scan of t1–t4: t1–t3 all pass; t4 flagged = c01 c07 c19 c20–c32 (the motion lineups, all WIDE) + c04-a18, c16-a18 (NECK, check by eye).
- COLOUR at t5+: gold brocade washes pale palettes into cream/gold (c28 celadon, c30 moonlight blue redone). spec5 now adds "the robe itself
  is clearly <main> silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe"; t6 = "HEAVY silk brocade" (not "gold brocade");
  pink+green palettes (c08, c20) get "NOT a green robe; <green> only as a small accent".
- PLAYER LOOKS: owner decision — NOT drawn at all (the player takes one of the 32 consort identities). Removed from the plan.
- LÃNH CUNG: every consort identity gets a tier "cold" lineup (fig-consort-cNN-tcold-aAA.webp, FIGURES tier "cold"), ONE common outfit:
  plain undyed pale grey-white coarse linen robe, no embroidery, no jewellery, simple low bun with a plain wooden pin, clean, neat, beautiful,
  calm standing, simple hand variety (broom handle, bowl, lamp, hands folded...). Code: j39 figTier maps "cold" -> -1 and figTierOf already
  maps the player (S.out) and rivals (who.out) to -1, so NPCs in lãnh cung already pick "cold".
- DONE so far (calm, v6): t5 all 32; t6 c01–c16. NEXT: t6 c17–c32 (`python3 cv2.py 6 c17 ..` prints the variable parts;
  template = t5 prompt with the rank-6 outfit), then t7, t8.
- ORDER NOW: t5 DONE (calm) -> t6, t7, t8 (calm) -> tcold for all 32 -> redraw t4 motion lineups (c01 c07 c19 c20–c32, incl. the 3 squat
  ones) calm -> t1–t3 redraw (new ages + calm varied hands; t1 redraw must keep the frozen-t1 face, pin new t1 in idfix.json only after cmp).
- Sheets (scratchpad/sheets/): tier5.jpg (all 32 t5, calm, v6); tier6_partial.jpg (t6 c01–c16); ladder_c01.jpg (c01 t1–t6;
  t4 is still the old motion lineup until the t4 redraw). Gen ids: sheets5.txt (v6 = calm), bg ids: sheets4_bg.txt.


## Done (published in img/ + img/FIGURES.json, 560 records)
- Consort tier 2: all 32 (c10–c32 added; c11 = lilac redo KLM2dYekqp; c19 = plum redo xSdnIuIjfW; c28–c32 new).
- Consort tier 3: all 32 (c27 redone in cinnabar red: eIOxnvTdqL; first try came out green).
- Consort tier 4: c01–c08.

## Next item (11/14 late, art worker #2 stopped here — all pushed)
- Tier 4 (Tần) DONE for all 32 with the new rules. Most dynamic (v5 = motion clause): c01 c07 c20–c32. Done with v4 (ages+per-age poses, before the
  motion clause; a bit stiller): c02–c06, c08–c18, c19 (c19 is the owner's favourite look — keep). Optional: redraw the stiller v4 ones with v5.
- Then tiers 5, 6, 7, 8 for all 32 (prompts already in jobs.json after spec5.py; `python3 cv.py 5 c01..`), then REDRAW consort t1–t3 with the new
  ages/poses/motion (same faces, frozen identity refs), then player looks t2–t8 + lãnh cung (spec5 has prompts; add the motion/age rules — player
  prompts still use the old "Pose for all four" line, so extend pose_for to looks before drawing), then REPORT to coordinator before maids/eunuchs/men.
- REVIEW GATE (owner rule, dev/HANDOVER.md 'ONE KIT, REVIEW GATE'): push art batches to branch review/consort-art (pub2.sh does this now),
  NOT main; list each batch's contact sheet path here. Keep transparent backgrounds clean (figures go on brocade backgrounds in rank frames).
  Sheets so far: scratchpad/sheets/tier4.jpg (all 32 t4), t4_a/t4_c/t4_d.jpg, poses_trial.jpg, ladder_c01.jpg (t1–t4 only).
- PUBLISHING: the shared checkout had an autostash conflict (other workers' sw.js / dev/build/assemble.py, stash@{0} left by
  `git pull --autostash`; NOT touched by the art worker). Use `bash pub2.sh "msg"` (commits from a clean worktree in scratchpad/wt and pushes
  origin main; never touches the shared checkout's index or stash).

## OWNER RULES (binding, 11/14 late) — use for EVERY new lineup
- Ages (bands 18–25 / 26–35 / 36–50 / 51+), figure wording left to right:
  1 (a18) "about 19, a fresh youthful young woman";
  2 (a26) "about 24, still young and lively, youthful face, no sign of ageing";
  3 (a36) "about 32, a young mature woman in her prime, smooth skin, NO grey or silver hair, NO wrinkles";
  4 (a51) "about 48, a graceful elegant lady, only a few faint silver strands at the temples at most, minimal faint lines, still clearly beautiful, not elderly".
  (old wording 22/30/42/55 made a36 look grey/old — never use it again.)
- [SUPERSEDED by OWNER REVERSAL above — do not use] MOTION (owner's quality bar, example = c19 tier 4, the walking mid-step with fan raised, skirts and sleeves swirling): every figure caught
  mid-movement, skirt hems swirling, sleeves/sash/stole floating in a soft breeze, tassels swaying; extra spacing between figures (spec5 adds it).
- Poses: varied and lively, NOT the stiff frontal hands-at-waist pose. Each consort has her own signature prop; pose differs per age figure
  (19 lively: mid-step/glance back/raising fan...; 24 lively & confident; 32 poised, in her prime; 48 graceful & calm) and per tier
  (grander at t5+, "with stately grace" t7+, regal frontal hands-in-sleeves only for a few at t8). Library + assignment in spec5.py (POSES/L30/L42/L55).
- Identity wording: "From the identity reference lineup keep ONLY her face, facial features, hairstyle colour and signature colour family; do NOT copy
  the reference's ages, poses, outfit, hair ornaments or accessories; use the NEW (younger) ages, the NEW outfit and the NEW poses below."
  Identity ref is always her FROZEN tier-1 lineup (idfix.json), not a redrawn one.
- Dress ladder t4–t8 (LAD in spec5.py): t4 layered silk + wide gold-thread borders + cloud collar + bu yao; t5 gold phoenix-peony brocade, larger gold
  headdress, jade belt pendants, trailing sleeves; t6 heavy gold brocade, big pearl headdress, pearl-edged cape; t7 near-empress, crimson/gold accents,
  small phoenix crown, pearl strands, train; t8 full phoenix crown with pearls + kingfisher blue, imperial phoenix robe, very long train.
  Her colour family stays the MAIN robe colour; "NOT green" added for non-green palettes.
- Pipeline: `python3 spec2.py; python3 spec3.py; python3 spec4.py; python3 spec5.py` rebuilds jobs.json. `python3 pj.py JID` = full prompt + style + ref;
  `python3 cv.py <tier> cXX..` = compact variable parts. `CW=700 python3 rv.py out.jpg genA:genB ...` = raw review sheet.
  sheetproc.py now min-cuts touching figures and drops small stray islands.
- Order after t4–t8: redraw consort t1–t3 with new ages/poses (same faces), then player looks; then report before maids/eunuchs/men/others.

## How (all scripts here; work copy can live in scratchpad/figwork)
- jobs.json is rebuilt by `python3 spec2.py; python3 spec3.py; python3 spec4.py` (already present).
- `python3 vars.py <tier> c09 c10 ...` prints per consort: style ref | identity ref (t1 lineup gen id) | features | outfit | pose.
  Build the prompt exactly like mk.py N-cXX-tT prints (spec4 template), only the outfit gets an enrichment phrase:
  t3: "..., a woven brocade sash and fuller layered sleeves (clearly richer than the lower ranks), ..."
  t4: "a fine layered silk robe with delicate embroidered {mot} on collar and sleeves and an embroidered silk sash (richer than the lower ranks), elegant chignon with a few small gold hairpins and a small gold comb, clean bright colours: {pal}"
- images_generate: mode gpt-2-6, aspectRatio 2:1, resolution 4k, extraSettings {quality:high}, references [style (consort-01/05/12/18 rotated, from vars.py), image (t1 lineup)], folder ba4aecfe-efce-47e2-b53f-30d292091886. 270 credits each.
- Log gen ids in sheets5.txt; after creations_wait, images_remove_background; log "jid gen bg" in sheets4_bg.txt; creations_wait on the bg ids (urls.py harvests URLs from the transcript, so the wait output is needed).
- `bash run.sh N-c09-t4 ...` downloads, auto-fixes black-RGB bg-removal output (fixrgb.py), splits into img/fig-*.webp + por-*.webp and updates img/FIGURES.json.
- `TW=110 TH=220 python3 cmp.py out.jpg consort-c09:3,4 ...` compares tiers side by side (check colour/identity); `python3 tiersheet.py out.jpg consort <tier> c01..c32` = contact sheet.
- `bash pub.sh "message"` copies tools to dev/figwork, validates JSON, commits img/ + dev/figwork/, pull --rebase --autostash, push.

## Known notes
- Tier 4 c01–c08 look only slightly richer than tier 3 (GPT follows the identity lineup's outfit closely). For t5–t8 use strong richness cues (gold brocade, big gold headdress, phoenix crown) and consider lowering reliance on outfit from the ref ("keep only her face from the reference").
- Watch for colour drift (c19 t2, c27 t3 came out green); add "(X colour, NOT green)" when redoing.

## MAID LADDER (art worker "maid-art", branch review/maid-art) — owner decision 11/14
- 5 maid ranks = 5 outfits (SRK.maid in j14): m0 Cung nữ thô sử (light silk ruqun, small embroidered flowers, silver trâm + flower — pretty, never poor),
  m1 Cung nữ (= the 52 original maid lineups, now tier "m1" in FIGURES-servants.json), m2 Đại cung nữ (brocade trim + half-sleeve bijia, jade pendant),
  m3 Chưởng sự cô cô (dark rich silk, high bun + gold pin, keys/ledger at waist), m4 Nữ quan (red official robe, crane rank square, black winged gauze cap).
  Calm STANDING poses only (no swirl/dance), props vary by rank; ages 19/24/32/48 as above.
- Files: A) maid identities img/fig-maid-mNN-tmK-aAA.webp (+por), FIGURES-servants.json role "maid" tier "mK";
  B) consort identities as maids img/fig-consort-cNN-tmK-aAA.webp, FIGURES.json role "consort" tier "mK";
  C) maid identities raised to consort (owner: ALL consort tiers 1–8 + lãnh cung, same ladder wording as spec4/spec5, calm standing):
     img/fig-maid-mNN-tT-aAA.webp (T=1..8) and fig-maid-mNN-tcold-aAA.webp, FIGURES-servants.json role "maid" tier T / "cold".
     Lãnh cung = plain grey-white linen robe, no jewellery, low bun with wooden pin, still clean and beautiful. Order: A, then B, then C (t1→t8, cold).
- m0 wording (owner correction): even m0 wears embroidered silk (small embroidered flowers) + proper silver trâm with a flower — one step below m1, never coarse.
  All m0 drawn so far already use this wording (no redraw needed).
- m3 colours never red (plum/indigo/aubergine/slate/bronze/navy); m4 always a red family + crane square + black winged gauze cap, so ranks read at a glance.
- Tools: dev/figwork/maid/ (mjobs.py prompts: job ids A-mNN-mK / B-cNN-mK / C-mNN-tT|tcold; vp.sh prints variable parts; mproc.py bg.txt [jid..]
  splits + writes img + manifests; msheet.py contact sheets; pubm.sh publishes to review/maid-art). Ledgers gens.txt (jid gen) and bg.txt (jid gen bg).

### CODE NOTE for the code worker (picker j17/j28/j35/j39)
- A maid's figure must follow her CURRENT RANK: rank index r in SRK.maid (0..4) → tier "m"+r. Look up fig by (role, identity, tier, ageBand);
  for maid identities (role "maid") tier "m1" = old null-tier files; for a consort face used by a maid player/NPC use role "consort" tier "mK".
  A rank change only switches tier (same identity → same face). Fallback if a tier is missing: nearest lower mK, then "m1"/null.
- A maid promoted to consort (Đáp ứng..Hoàng hậu) uses role "maid", same identity, tier = consort rank 1..8; in lãnh cung tier "cold".
  Consort identities keep their own tiers 1..8. Keep the identity fixed for life.

### STATUS (maid-art, end of session 1)
- DONE part A: m01–m10 × m0/m2/m3/m4 (40 lineups, 160 figures), checked on sheets dev/figwork/sheets/maid_ladder_trial.jpg, A_b1..A_b4.jpg
  (proportions ok, faces match their m1 lineup, no green drift, nobody poor). m1 = old files, tier set to "m1".
- NEXT: part A m11–m52 (168 lineups) → part B c01–c32 × m0..m4 (160; ref = idfix N-cNN-t1; mjobs adds her consorts_feat features)
  → part C m01–m52 × t1..t8 + tcold (468). Workflow per batch of 2 identities: `bash vp.sh A-m11-m0 ...` → images_generate (gpt-2-6, 2:1, 4k, quality high,
  refs [style STY, image ref] as printed) → append "jid gen" to gens.txt → creations_wait → images_remove_background → append "jid gen bg" to bg.txt
  → `python3 mproc.py bg.txt <jids>` → `TH=180 python3 msheet.py ../sheets/X.jpg maid tm0,m1,tm2,tm3,tm4 mNN mMM` → `bash pubm.sh "msg" sheet.jpg`.
  Work copy lives in scratchpad/maid (copy of dev/figwork/maid); worktree scratchpad/wt-maid on branch review/maid-art.

### STATUS (maid-art, end of session 2)
- DONE part A: m01–m20 × m0/m2/m3/m4 (80 lineups, 320 figures). Session 2 added m11–m20 (40 lineups, 10 800 credits gen + bg 3 each),
  sheets dev/figwork/sheets/A_b5.jpg (m11,m12), A_b6.jpg (m13,m14), A_b7.jpg (m15,m16), A_b8.jpg (m17,m18), A_b9.jpg (m19,m20).
  All checked: proportions ~1:7, faces match the m1 lineup, no green drift, m0 embroidered + silver trâm, m3 dark non-red, m4 red + crane square + winged cap.
- NEXT (exact): part A m21–m52 (128 lineups, next batch A-m21-m0 A-m21-m2 A-m21-m3 A-m21-m4 A-m22-m0 ... → sheet A_b10.jpg)
  → part B c01–c32 × m0..m4 (160) → part C m01–m52 × t1..t8 + tcold (468).
- Session-2 tool notes: worktree is now scratchpad/wt-maid2 (mjobs/mproc/msheet/pubm point there; change WT if a new worktree is used).
  `python3 vs.py JID...` prints a compact line per job (style ref | colour/flower | 4 poses) — the rest of the prompt is the fixed template from
  `python3 mjobs.py JID`. `bash addbg.sh "jid..." "bg..."` appends "jid gen bg" lines to bg.txt (gen looked up in gens.txt, same order).
  mproc.py takes ~2 min per batch (urls.py scans transcripts): run it in the background.

### STATUS (maid-art part A, session 6 — 2026-11-14, cleanup pass)
- OWNER RULES 11/14: no moles; maids (m0–m4) never wear a huadian; the ~48 figure has hair as dark as at 32 (2–3 silver hairs at most).
- Checked: one head strip per identity (m2 tier, all 52) for moles/huadian; a51 heads of m21–m44 (all tiers) for grey temples.
  Moles found: m13, m26, m39 (all 4 tiers). No huadian anywhere in part A.
  Grey temples still found: m22-m2, m25-m2, m27-m0, m27-m4, m31-m3, m33-m2, m37-m0, m42-m2, m43-m2.
- Fixed 21 lineups (84 figures) with ONE gpt-2-6 edit each (ref = current gen, 2:1, 4k, high): hair -> solid dark, paint out moles,
  remove any forehead mark, "no other changes". gpt-2-6 does NOT reliably remove moles, so after bg removal every edited lineup goes
  through mole.py: detects small dark round dots on the face skin of the raw gen (haar face box, nostril/mouth zones excluded,
  PK=60 TD=30) and inpaints those spots (cv2 TELEA) in the cut-out + gen copy before mproc. Spots logged in scratchpad spots_fixed.json.
  One-shot pipeline: maid/proc.sh A LIST (mole fix -> ledgers -> mproc -> afix -> porcrop). New gens/bg ids are the last entries of maid/gens.txt / bg.txt.
- Follow-up: the first mole.py run accepted blobs up to 220 px (at 3840) and smeared eyes/chins on m13-m0, m13-m4, m26-m4, m22-m2,
  m37-m0; those 5 lineups were re-cut from fresh downloads with the area cap 40 (inpaint now done on the full painting). Leftover
  forehead marks fixed by hand with maid/spot2.py (numbered dots on a 4x face crop -> inpaint in the 900px fig -> porcrop):
  m26-m4-a36, m26-m4-a51 (R=6), m39-m3-a18.
- CUTOUT: cutcheck flagged 86 figures >= 8 (120 >= 3, 335 >= 1). Cause = the cutter left pale/sheer skirts half-transparent (green
  shows through). Magnific re-matte of a single-figure crop (rematte.py idea) made it WORSE (score 44 -> 124), so the fix is local:
  maid/afix.py makes every pixel with alpha>40 that lies >=3px inside the silhouette opaque (rim kept anti-aliased, true gaps untouched).
  Applied to all 335 figures scoring >=1 + all re-processed ones. After: max cutcheck score 2.2, 0 figures >= 3.
- PORTRAITS: every por-maid-mNN-tmK-aXX (832) re-cut with dev/figwork/porcrop.py -> 384x506 face-centred (was 256x256).
  (m1 maid figures/portraits are unchanged on this branch = identical to main, which already has the 384x506 crops.)

### STATUS (maid-art part A, end of session 5)
- DONE part A: ALL m01–m52 x m0/m2/m3/m4 (208 lineups). Session 5 added m45–m52 (32 lineups), sheets dev/figwork/sheets/A_b22.jpg (m45,m46),
  A_b23 (m47,m48), A_b24 (m49,m50), A_b25 (m51,m52). mjobs AGES now ends "All four figures have the same solid dark black-brown hair
  colour." (from m49 on). New gens whose a51 still came out grey were fixed at once with the hair-only edit: m48-m2/m3/m4, m49-m0/m2.
- AGE-48 HAIR FIXES DONE (hair-only edit, exact prompt in the session-4 block; check = hz.py head crops + ck.py layout diff vs the
  original gen, values ~1–3.5 = unchanged composition): m01–m16 and m18–m20 all four tiers (m16-m2 left as is: brown, no grey),
  m09-m3, m07-m4, m25-m0, m25-m3, m30-m0/m2/m3, m32-m2, m32-m3. Stubborn ones needed a 2nd/3rd pass (m48-m2, m14-m3, m16-m0, m16-m3)
  with the stronger prompt: "...Only recolour the hair of the RIGHTMOST oldest lady: her hair at the temples and the sides of her
  head is still grey-silver; paint those grey locks and the whole hairdo solid DARK black-brown, exactly the same dark colour as the
  hair of the leftmost young woman, so that no grey or silver hair remains at all. Also make sure the other three figures have the
  same dark hair. No other changes. No text." m14-m3 final edit also asked for "richer, deeper dark slate-blue" robes (3rd edit had
  faded them). Sheets A_fix48b (m01–m04), A_fix48c (m05–m08), A_fix48d (m09–m12), A_fix48e (m13–m16), A_fix48f (m18–m20),
  A_fix48g (m25, m30, m32). m29-m0 checked: light brown, left as is.
- Known nit (old, not touched): m01-m4 cap is a tall black cap without visible wings.
- No cutcheck.py exists on main (checked), so none was run; bg removal + por crops redone by mproc for every edited lineup.
- NEXT: part A is complete. A final zoom.py sweep of m21–m44 a51 for leftover grey temples would be the only optional follow-up.
- Session-5 tools: ck.py old:new... (mean abs layout diff between original gen and its edit). Credits this session: 123 gens x 270
  + 116 bg x 3 = ~33.6k.

### STATUS (maid-art part A, end of session 4)
- DONE part A: m01–m44 x m0/m2/m3/m4 (176 lineups). Session 4 added m33–m44 (48 lineups), sheets dev/figwork/sheets/A_b16.jpg (m33,m34)
  .. A_b21.jpg (m43,m44). Checked: ~1:7, faces match m1, m0 embroidered + silver tram, m3 dark non-red, m4 red + crane + winged cap.
- AGE-48 HAIR (binding: dark, at most 2-3 thin silver strands): mjobs AGES now says "with DARK hair, as dark as at 32 ... NOT grey temples,
  NOT grey streaks ... even if the identity reference shows grey or white hair" (from A-m37 on) -> new lineups come out dark.
  FIX METHOD for an existing grey lineup = hair-only edit (gpt-2-6, 2:1, 4k, quality high, ONE image ref = that lineup's gen, no style ref):
  "Edit this image. Keep everything exactly the same (all four figures, faces, outfits, poses, props, ornaments, background,
  composition). Only recolour the hair of every figure, especially the RIGHTMOST oldest lady: the whole hairdo, including the temples,
  the sides and the bun, must be solid DARK black-brown, exactly the same dark colour as the hair of the leftmost young woman. No grey,
  no silver, no white streaks anywhere in the hair. No other changes. No text." -> append "jid newgen" to gens.txt, remove bg, addbg, mproc.
  Check with `python3 hz.py out.jpg GEN...` (full-res head crops of the 4 figures from the raw gen) before bg removal.
- Fixed this session (edit method): m34-m2/m3, m35-m0/m3, m36-m0/m2/m3, m17 (all 4), m21 (all 4), m22 (all 4), m23 (all 4), m24 (all 4),
  m28-m3, m28-m4, m31-m0, m31-m2 -> sheet A_fix48a.jpg.
- STILL GREY at a51 (found with zoom.py, to fix with the edit method): m01–m16, m18, m19, m20 (all four tiers each, ~76 lineups),
  plus lighter grey temples at m30-m0/m2/m3 and m32-m2 (maybe m25-m3, m29-m0).
- NEXT (exact): part A m45–m52 (32 lineups; next batch A-m45-m0 A-m45-m2 A-m45-m3 A-m45-m4 A-m46-m0 ... -> sheet A_b22.jpg), then the
  grey fixes above (sheet A_fix48b.jpg ...).
- Session-4 tool notes: same worktree scratchpad/wt-maidA, work copy scratchpad/maidA. view.py (W=820 python3 view.py out.jpg GEN..)
  stacks gen previews for checking; hz.py crops heads at full res. One mproc at a time.

### STATUS (maid-art part A, end of session 3)
- DONE part A: m01–m32 x m0/m2/m3/m4 (128 lineups, 512 figures). Session 3 added m21–m32 (48 lineups + 1 redo of m22-m3 = 49 gens,
  13 230 credits gen + 147 bg), sheets dev/figwork/sheets/A_b10.jpg (m21,m22) .. A_b15.jpg (m31,m32). Checked: ~1:7, faces match m1,
  no green drift, m0 embroidered silk + silver trâm, m3 dark non-red, m4 red + crane square + winged cap.
- AGE-48 HAIR: from A-m25 on (and the m22-m3 redo) mjobs AGES says "hair still mostly dark ... (NOT grey-haired, NOT salt-and-pepper)";
  it clearly reduces grey. m21–m24 (except m22-m3) and the older m01–m20 a51 figures still show salt-and-pepper hair where the m1 lineup
  is grey (e.g. m17, m22, m23, m24, m28-m3) — optional redraw if the owner wants it subtler. Identities whose m1 a51 is grey still lean grey.
- NEXT (exact): part A m33–m52 (80 lineups; next batch A-m33-m0 A-m33-m2 A-m33-m3 A-m33-m4 A-m34-m0 ... -> sheet A_b16.jpg).
  Part B (consort faces as maids) is done by another worker on a separate branch; then part C.
- Session-3 tool notes: work copy scratchpad/maidA, worktree scratchpad/wt-maidA (WT in mjobs/mproc/msheet/pubm). mproc curl now retries
  (connection resets crashed it before writing manifests). Run only ONE mproc at a time (shared RAM is tight; OOM kills happened).
  zoom.py out.jpg mNN.. = a51 head crops per tier (hair check).

### STATUS (maid-art part A, sửa sau kiểm duyệt FAIL d97e28e — thợ sửa #2, 2026-11-14 tối) — SẴN SÀNG KIỂM LẠI
- a51 (51+): ĐỦ 208/208 hình a51 đã làm già lên ~48–50 (mặt), tóc giữ đen. Cách làm: images_crop cột a51 của gen cuối (1080x1920 từ 3840x1920,
  cropX trong agefix/todo.txt, kẹp ≤2760) -> gpt-2-6 edit 9:16 1k (ref = crop) với prompt "about 48 to 50 ... crow's-feet, nasolabial folds,
  softer jawline ... NOT elderly ... hair solid dark ... remove any mole" -> remove bg -> tools/apply.py (giữ mảng chính, spfuncs.finish 900px,
  afix, porcrop 384x506, cutcheck). Sổ: agefix/ages.txt (jid crop edit bg; dòng sau ghi đè dòng trước), agefix/redo.txt (làm lại).
- Làm lại vì còn trẻ / tóc xám (chuỗi edit lần 2 "she still looks too young ... about 50"): m01-tm2, m01-tm4, m02-tm4, m03-tm4, m04-tm3, m04-tm4,
  m05-tm3, m09-tm0, m09-tm4, m33-tm2, m33-tm4, m34-tm0, m36-tm4, m29-tm4, m47-tm4; tóc đen lại: m27-tm3, m38-tm2, m38-tm3.
- Nốt ruồi / hoa điền: gen gốc của m13, m26, m39, m52 vẫn còn nốt ruồi nên edit a51 mang lại -> vá tại chỗ (tools/spot2.py, tools/spotpor.py
  theo toạ độ por): m13-tm2/tm3, m19-tm3/tm4, m26-tm4 (cả hoa điền), m38-tm3, m39 tm0/tm2/tm3/tm4, m52 tm0/tm2/tm3/tm4 (a51).
  Quét tự động cả 832 por (tools/molescan.py) + soi top 64: chỉ còn hoa tai/tóc, không thấy nốt ruồi.
- cutcheck cả 832 fig phần A: max 2.23, 0 hình ≥3.
- Không có mạng che mặt trong thiết kế phần A (không thêm).
