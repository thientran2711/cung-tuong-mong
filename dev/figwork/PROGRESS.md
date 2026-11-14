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
