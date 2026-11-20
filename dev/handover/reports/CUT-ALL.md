# CUT-ALL — transparent cut-outs of tonight's RANK8 t7/t8 (owner A34)
depth 1 · START_CTX ≈ 5 % of 1M window (well under roll line) · worker for Foreman C ROOT session_01D3E3NWtCdQC92tFLkd25H5

PRIORITY #1 CHECK: ledger grep — 0 of the 117 source gens had an existing RANK8-CUT line before this job (32 older RANK8-CUT lines are other people: s65 / trio / m29). The method is reused from RANK8-C.md §5 (images_remove_background on the gen id, RGBA, no rescale).

## Scope
- (a) DONE: every RANK8 gen whose prompt_file is `dev/art/rank8-t78/<id>_t{7,8}.txt` (1 gen per prompt file, no retries in the ledger), excluding the Sắc sảo people m09 s07 s08 s09 s39 s40 s41 s42 (worker CUT-SS) and m18 t7 (being redrawn) = **59 people, 117 pictures**.
- (b) DROPPED on the foreman's correction ("tests waiting for review get NO cut-out"): MAID7 round 1 was NOT cut. 0 credits spent on it.

## Output
- `dev/art/rank8-t78/cut/<id>_t7.png` / `_t8.png`: 117 files, all RGBA 1024×2304 (native, no rescale, no label band). Each file is under 5 MB (largest 4.98 MB), but the 117 together are ≈486 MB in git.
- `dev/art/rank8-t78/cut/CUTS.tsv`: file → source gen → cut id.
- Check images: `_check_overview_dark.jpg` (all 117 on a dark background) and `_check_zoom_1to1.jpg` (1:1 crops of the crown/hair on s31 t7, m14 t7 and s30 t8, plus the sleeves/gauze on s45 t7, s32 t7 and m16 t7).
- Ledger: 117 lines, kind RANK8-CUT (gen_id, cut_id, credits 3, file).

## Credits
117 × 3 = **351 cr**. 0 failures, 0 re-runs.

## Check (looked at every picture in the overview, plus 6 zooms at 1:1)
- Measured over all 117: every corner has alpha 0. Opaque pixels are 49–64 % of each picture. Partial-alpha pixels are 0.8–2.0 %, so gauze and soft edges keep partial transparency. Mean edge luminance is 149–182, with no outlier that would mean a parchment halo.
- Overview on the dark background: no background remains on any picture, and no figure has a missing part.
- Zooms: hair strands, tassels, pearl chains and crown filigree are clean, with no light fringe. The s32 t7 blue gauze over the red sleeve stays see-through.
- **Bad cuts: none found.** Note: some figures touch the frame edge at the top or bottom (y = 1 or 2303). That comes from the source gen, not from the cut.

## Commit
See the git log on claude/cung-tuong-mong-handover-hj0h8w ("CUT-ALL: 117 transparent t7/t8 cut-outs").
