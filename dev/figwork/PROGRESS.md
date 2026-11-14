# Art progress (art worker, 11/14/2026)

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
