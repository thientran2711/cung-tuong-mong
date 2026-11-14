# Maid ladder PART B (consort identities c01–c32 × maid tiers m0–m4) — branch review/maid-art-b

- Files: img/fig-consort-cNN-tmK-aAA.webp + por-*, img/FIGURES.json role "consort" tier "m0".."m4" (sheet B-cNN-mK).
- Tools: dev/figwork/maidB/ (copy of dev/figwork/maid with WT=scratchpad/wt-maidB; pubm.sh pushes review/maid-art-b).
  mjobs.py adds the m1 (cung nữ) wording for consort faces (pretty embroidered silk ruqun, embroidered sash with tassel, silver hairpins +
  pearl pin + flower, no brocade jacket / no jade) and m1 props; m0/m2/m3/m4 identical to part A. Identity ref = idfix N-cNN-t1.
- Ledgers: dev/figwork/maidB/gens.txt (jid gen), bg.txt (jid gen bg). Sheets: dev/figwork/sheets/B_bN.jpg (cols t1 ref, tm0..tm4).
- Cost: 270 credits per lineup (gpt-2-6, 2:1, 4k, high) + 3 for bg removal.

## Status
- B_b1: c01 m0–m4, c02 m0–m2 done (8 lineups).
- B_b2: c02 m3–m4, c03 m0–m4, c04 m0 done (16 lineups total).
- B_b3: c04 m1–m4, c05 m0–m3 done (24 lineups total).
- B_b4: c05 m4, c06 m0–m4, c07 m0–m1; B_b5: c07 m2–m4, c08 m0–m4 → c01–c08 COMPLETE (40 lineups, 160 figures).
  All checked on sheets: proportions ~1:7, faces match the t1 identity, calm standing, varied props, m0 embroidered + silver trâm (never poor),
  m2 brocade bijia + jade, m3 dark non-red + keys/ledger + gold pin, m4 red + crane square + black winged cap. No green drift.

- From c09 on, mjobs.py AGES wording for the ~48 figure is stricter (hair still DARK, only two or three thin silver strands at one
  temple, no grey streaks) because the earlier wording gave salt-and-pepper sides. Quick look before bg removal: `python3 pv.py OUT.jpg JID...`
  (lineups + a strip of the 48yo heads); rejected gens are re-run and the new line appended to gens.txt (last entry wins).
- B_b6: c09 m0–m4, c10 m0–m2 (48 lineups total).
- B_b7: c10 m3–m4, c11 m0–m4, c12 m0 (56 lineups total).
- B_b8: c12 m1–m4, c13 m0–m3 (64 lineups total).
- B_b9: c13 m4, c14 m0–m4, c15 m0–m1 (72 lineups total). From c17 the 48yo hair line also says "almost as dark as at 32".
- B_b10: c15 m2–m4, c16 m0–m4 → c01–c16 COMPLETE (80 lineups, 320 figures). Known soft spot: some ~48 figures
  (c12-m4, c14-m2/m3/m4, c15-m2/m3, c16-m3) still show more silver at the temples than "two or three strands"; one retry
  (c12-m4) did not fix it, so they were kept.
- From c17 the AGES 48yo line says FULLY DARK, same colour as at 32, at most two barely visible silver hairs (hc.py strip after each batch).
- B_b11: c17 m0–m4, c18 m0–m2 (88 lineups total).
- B_b12: c18 m3–m4, c19 m0–m4, c20 m0 (96 lineups total).
- B_b13: c20 m1–m4, c21 m0–m3 (104 lineups total). c20-m3/m4 48yo hair has a faint grey sheen: recheck in the hair-edit pass.
- B_b14: c21 m4, c22 m0–m4, c23 m0–m1 (112 lineups total). c22-m3/m4 had grey temples: fixed with the hair-only edit (gens.txt last entry = edit gen).
- AGES now also says "no grey sheen".

- B_b15: c23 m2–m4, c24 m0–m4 → c17–c24 COMPLETE (120 lineups total, 480 figures).

## Part B worker #2 (from 2026-11-14 afternoon)
- New worktree: scratchpad(ed00be27…)/wt-maidB (branch maidB2), work copy scratchpad/maidB; paths in mjobs/mproc/msheet/pubm repointed;
  pubm.sh now does fetch + rebase before push. urls.py finds URLs in this session's transcripts (creations_wait output).
- OWNER RULES (binding): NO moles / beauty marks on the face; NO huadian (forehead ornament) for maids at ANY tier m0–m4.
  mjobs.py feat() drops "beauty mark"/"mole"/"huadian" clauses from consorts_feat.json and every prompt ends with
  "No moles, no beauty marks ... No forehead ornament, no huadian ...". Applies from B_b16 (c25) on.
- Per-lineup readable previews: `python3 lv.py ../wt-maidB/dev/figwork/maidB/preview JIDs` → dev/figwork/maidB/preview/B-cNN-mK.jpg (one lineup per file).
- OLD images that may carry a mole (feature list said so; edit away when touched): c01, c04, c07, c09, c12, c15, c17, c20, c23 (m0–m4).
  OLD images that may carry a huadian (c03, c11, c19 m0–m4): remove in the same edit as any hair/mole fix. Status of each is logged below.
- B_b16: c25 m0–m4, c26 m0–m2 (128 lineups total). Clean: dark 48yo hair, no moles, no huadian.
- B_b17: c26 m3–m4, c27 m0–m4, c28 m0 (136 lineups total). Clean.

## NEXT (exact)
- (B_b16 done) c26 m3 ... c32 m4, in order (8 per batch → sheets B_b16.jpg .. B_b20.jpg). Same per-batch steps as below.
  After each batch check every 48yo head (`python3 hc.py OUT.jpg JIDs`, zoom suspicious ones); grey temples → hair-only edit (below).
- Then the hair-edit pass on the too-grey ~48 figures: c01–c08 (all ranks, check each with hc.py first), c12-m4, c14-m2/m3/m4,
  c15-m2/m3, c16-m3, plus c20-m3/m4 (faint grey sheen). No cutcheck.py exists on main or any branch (checked), so cutouts are checked by eye on the sheets.
  HAIR-ONLY EDIT (proven on c22-m3/m4): images_generate gpt-2-6, 2:1, 4k, quality high, ONE image ref = that lineup's current gen
  (last gens.txt entry), NO style ref, prompt:
  "Edit this image. Keep everything exactly the same (all four figures, faces, outfits, poses, props, ornaments, background,
  composition). Only recolour the hair of every figure, especially the RIGHTMOST oldest lady: the whole hairdo, including the temples,
  the sides and the bun, must be solid DARK black-brown, exactly the same dark colour as the hair of the leftmost young woman. No grey,
  no silver, no white streaks anywhere in the hair. No other changes. No text."
  → append "jid newgen" to gens.txt → pv.py/hc.py check → remove bg → addbg.sh → creations_wait on bg → mproc.py bg.txt JIDs (rewrites
  files + FIGURES.json) → sheet B_fix48a.jpg (msheet) → pubm.sh.
- Per new batch: `python3 bv.py JID...` (compact variable parts; full prompt = `python3 mjobs.py JID`) → images_generate (gpt-2-6, 2:1, 4k,
  quality high, refs [style STY, image idfix N-cNN-t1] as printed, folder ba4aecfe-...) → append "jid gen" to gens.txt → creations_wait
  (last gen is enough before bg) → images_remove_background ×8 → `bash addbg.sh "jids" "bgs"` → creations_wait on the 8 bg ids (urls.py needs
  the wait output in the transcript) → `python3 mproc.py bg.txt JIDs` (~3 min; curl now retries) →
  `TH=150 python3 msheet.py ../sheets/B_bN.jpg consort t1,tm0,tm1,tm2,tm3,tm4 cXX cYY` → `bash pubm.sh "msg" ../sheets/B_bN.jpg`.
- Work copy: scratchpad/maidB (copy of dev/figwork/maidB); worktree scratchpad/wt-maidB (branch maidB → pushes review/maid-art-b).
