# DESIGN21 — thu s62 t6 Quý phi + t7 Hoàng quý phi REVERT (Foreman C #16, owner L1645)
depth 7 · START_CTX ~4 % (used_tokens read 0; estimate) · 0 cr, no gens.

## Base picked (why)
- t6 = `thu_comoi/s62_t6_THU_COMOId.txt` (DESIGN17 2e1677d, 21/11 00:13Z) = the L1576 FINAL gen text. Every later t6 (COMOIe LADDER1 OUTER_IN; f–j LADDER2 G47 garment copies / OUTER_TIED / OUTER_WRAP / EAR_FREE) dropped.
- t7 = `thu_comoi/s62_t7_THU_COMOI_v8c.txt` (COLORFIX1 cd40fcb, 20/11 23:53Z) = last t7 before LADDER1 (v8d OUTER_IN) and LADDER2 (v8e–v8i). LADDER1.md:49 lists v8c as the t7 the owner's pictures map to.

## New files (builder thu_comoi/make_revert_L1645.py, .keep base = reverted version)
- `dev/art/thu_comoi/s62_t6_THU_COMOIk.txt` (9977 ch) — check_store --scope tp6 --age a22 STORE+APPROVED PASS
- `dev/art/thu_comoi/s62_t7_THU_COMOI_v8j.txt` (9956 ch) — check_store --scope tp7 --age a22 STORE+APPROVED PASS
- keep_check --all 329 PASS. Both WARN OUT1 (no G40 OUTER_IN clause) — expected, the revert removes it (owner: không ép).

## Diff vs base
t6 COMOIk vs COMOId:
- + `, nothing at the ears` after "several gold hairpins (trâm) with dangles" (LADDER2 make_no_ears2 wording)
- + G47 embroidery only: "rich gold-thread embroidery covering much of the robe **(also on the chest, both front edges, wide outer and inner hem bands, cuffs and skirt-front medallions)**" = Phi t5 embroidery placements, no garment piece
- flower already "(never two, never a pair, no cluster)"; held item silk ball (no vase) → unchanged
- A38 trims (fit 10 000): "Everyone beautiful at every age." · ", never copy anything but its colour" · ", never in profile" · "gold only as thin accents on the borders;" (repeat of TWO-COLOUR 'gold or silver only as thin accents')
t7 v8j vs v8c:
- + `, none at the ears` after crown "a few gold tassels"
- gate repairs (same words as LADDER2 v8e; v8c had these 3 FAILs): E1 "on her LEFT side" → "on the LEFT side of the picture"; G23 cut "the robe falling still and straight" (walking pose); S19 tail "floor-length robe with slippers visible" → "floor-length robe, only slipper toe tips peeking under the hem"
- G44: v8c bans no bow → nothing (bow allowed, not forced). No flowers at t7. Flute, no vase. t7 own embroidery (L1627) → no G47 add.

## Open
- Owner to confirm: keep G40 (outer robe held in at the waist) off t6/t7? Revert removes it (OUT1 WARN only).
- CHECK1 diff-only check sent.

# JOB 2 — G45 stored-prompt pose fix (Foreman C #17, owner L1622/L1667) · 0 cr, no gens
- Scan: check_store.g45_fails on EVERY *.txt prompt under dev/art (incl. dapung4, thu_comoi, seasons4, dong_hientai, phi_cape_l1596 …) → exactly 7 FAIL = the 7 POSEFIX1 listed; **0 hand-made season files FAIL**.
- Fix (dev/art/posefix_g45_stored.py): ONLY the Pose sentence swapped for the pose build_all.py now re-picks for that cell (M6/C3 dropped), stored item words kept, no JADE_CLEAR added (not needed for G45). Pre-edit files kept as dev/art/g45_base/<path>.old = .keep base.
  | file | old pose | new pose (builder re-pick) |
  |---|---|---|
  | rank8-old4/m29_t4, rank8-s62/g20/m29_t4 | adjusting her belt pendant | one hand drawing back her long sleeve, lamp at her chest |
  | rank8-t78/s07_t7 | hands folded under sleeves | walking mid-step, fan held open at her side (tail → hem swaying, G23) |
  | rank8-t78/s54_t7 | hands folded under sleeves | one hand touching her hairpin, letter in the other hand at her waist |
  | rank8-t78/s59_t8 | hands folded under sleeves | mid-step adjusting a hairpin with one raised hand, drum in the other (tail → hem swaying) |
  | rank8-t78/s23_t7 | adjusting her belt pendant | three-quarter turn looking at the viewer, hoop near her shoulder |
  | rank8-t78/s17_t8 | adjusting her belt pendant | raising the hairpin between her fingers beside her cheek, glancing at it |
- Gates: keep_check --all 365 PASS. check_store (--scope tpN --age a18) before→after: G45 FAIL gone ×7, 0 new FAIL. Old FAILs untouched (older stored text): m29_t4 ×2 B26/M06/S13/S19; s07/s54/s23 t7 S14; s59/s17 t8 now fully PASS.

# JOB 3 — glued-merge scan + restore (Foreman C #17) · 0 cr
Scan dev/art (*.txt/.json/.py/.keep/.md/.jsonl/.tsv): conflict markers 0 · invalid JSON 0 · duplicate JSON keys 0 (palettes_season_L1583.json already restored by #17 791d35a) · multi-prompt .txt / duplicated .py blocks / duplicated .keep lines → restored below. Each restore = pure deletions of the glued copy (git diff: 1 insertion, 144 deletions).
| file | glued by | restored from |
|---|---|---|
| palettes3/four_season_L1583.py (old 60c0578d side glued back, 2× def solve) | 61036d5 MAIN CHÍNH 84 | a884067f PAL3 G50 (= f3428ed fix) |
| thu_comoi/make_design22_L1653.py (t4 edits ×2, t5 block ×2) | 61036d5 | be1ec9e0 DESIGN22 job2 |
| thu_comoi/s62_t4_THU_COMOIk.txt.keep, s62_t5_THU_COMOIj.txt.keep (allow lines ×2–3) | d3fcd3e / 61036d5 | be1ec9e0 (matches #17's 69c7aa6 txt restore) |
| seasons4/s62_t{4..8}_HAN_BAC_vai.txt (3 prompts glued, 29–30k) + .keep ×5 + make_han_vai_L1398.py (2× VAI) | replays e0076022/faa27020/3a26627f/c3d4ef5e (20/11 21:23 + 22:06, same DESIGN10 commits re-applied) | 73a4828d DESIGN10 stage 3 (last single-prompt version, 9925–9996 ch); then novase_L1642.py re-run (t4 vase → lotus lamp, F19) |
- keep_check --all 370 PASS · JSON load OK · py_compile OK.
- Note: the _vai t4–t8 (old Hán tests, superseded) FAIL check_store with OLD faults (M07/S13/B12/S07/S14) = text as it was at 73a4828d; not glue — not touched.
## For MAIN / foreman (not restored: not glued, pre-existing, not merge victims)
- Prompt .txt > 10 000 chars, single prompt, unchanged since b007228b (20/11) or older: dong_hientai/s62_t8_DONG_HIENTAI (10387), m02_t8_DONG_HIENTAI (10370), s62_t8_DONG_HIENTAI_cloak7_LUAMONG_test (10345), s62_t7_DONG_HIENTAI (10306), s62_t6 (10056), s62_t4 (10024), s62_t8_cloak5 (10001); winter1/s62_t4_dong (10186); seasons4/s62_t8_dong_LONG3moi (10036). Big non-prompt logs (b26/proof, store-all/samples_a18, palaudit1, emo-anim clipurls) = OK by nature.
- Non-art files touched by the same bad merges (MAIN's): dev/handover/reports/rv-kit-pcrow-square.md, rv-menu-panel.md, rv-mg-5s-clear.md, econ-tamco.md, menu-panel.md, review-*.md, dev/art/SKINS.md — no markers left; MAIN to check content.
