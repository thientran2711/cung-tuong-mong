# Art progress (art worker, 11/14/2026)

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
- MOTION (owner's quality bar, example = c19 tier 4, the walking mid-step with fan raised, skirts and sleeves swirling): every figure caught
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
