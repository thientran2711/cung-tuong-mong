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

## NEXT (exact)
- c17–c32 × m0..m4 (80 lineups), in order B-c17-m0 B-c17-m1 ... (8 per batch → sheets B_b11.jpg ...).
- Per batch: `python3 bv.py JID...` (compact variable parts; full prompt = `python3 mjobs.py JID`) → images_generate (gpt-2-6, 2:1, 4k,
  quality high, refs [style STY, image idfix N-cNN-t1] as printed, folder ba4aecfe-...) → append "jid gen" to gens.txt → creations_wait
  (last gen is enough before bg) → images_remove_background ×8 → `bash addbg.sh "jids" "bgs"` → creations_wait on the 8 bg ids (urls.py needs
  the wait output in the transcript) → `python3 mproc.py bg.txt JIDs` (~3 min; curl now retries) →
  `TH=150 python3 msheet.py ../sheets/B_bN.jpg consort t1,tm0,tm1,tm2,tm3,tm4 cXX cYY` → `bash pubm.sh "msg" ../sheets/B_bN.jpg`.
- Work copy: scratchpad/maidB (copy of dev/figwork/maidB); worktree scratchpad/wt-maidB (branch maidB → pushes review/maid-art-b).
