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
