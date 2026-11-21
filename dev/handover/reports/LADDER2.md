# LADDER2 — G40 all 8 tiers (shared OUTER_TIED) + thu t6–t8 (owner L1627 via Foreman C #15)
depth 6 · START_CTX ~4 % (used_tokens reads 0; estimate) · 0 gens, 0 cr.

## Shared clause (agreed with DESIGN20)
`master_common.OUTER_TIED` (DESIGN20, d13d7ed): "the outer robe HELD IN by the sash tied OVER it: its front edges meet at the waist under the sash, which wraps over BOTH layers, so the robe is closed and fitted at the waist, never a loose open coat or jacket" — replaces OUTER_IN at the same spot. t4 COMOIf / t5 COMOIe (DESIGN20) + all files below.

## Built (gates PASS: check_store --scope tpN --age a22 STORE+APPROVED; keep_check --all 282 PASS)
| tier | new file | chars | change | A38 trims (repeats only, in .keep) |
|---|---|---|---|---|
| thu t7 HQP | thu_comoi/s62_t7_THU_COMOI_v8e | 9991 | OUTER_IN→OUTER_TIED; old FAILs fixed: G23 (drop "the robe falling still and straight" from walking pose), E1 ("…on her LEFT side" → table "…on the LEFT side of the picture"), S19 (tail feet "only slipper toe tips peeking under the hem") | "never copy anything but its colour" |
| thu t8 HH | thu_comoi/s62_t8_THU_COMOI_v10d | 9998 | + OUTER_TIED; S19 tail fixed | "never copy anything but its colour"; "the royal yellow in the robe is exactly that colour"; outfit "with slippers visible" (repeat of S19 tail); "never a single flat colour all over"; "the crown, hairpin and jewellery gold in the same 18K tone" (repeat of "18K gold tone") |
| thu t1 | dapung4/s62_t1_COMOI_v6 | 9700 | OUTER_IN→OUTER_TIED | — |
| thu t2 | dapung4/s62_t2_COMOI_v6 | 9877 | same | signature-colour repeat clause (std list) |
| xuân t1 / t2 | seasons4/s62_t{1,2}_HAN_BAC_v7 | 9539 / 9809 | same | — |
t7/t8 embroidery style untouched (owner L1627: own style). Builders: thu_comoi/make_thu_L1627.py, thu_comoi/make_g40_tied_t13.py.

## BLOCKED — need Foreman/owner call (only gate or owner words left)
- **thu t6 Quý phi v6** (thu_comoi/make_s62_t6_thu_v6.py, `--raw <out>` to see): G47 copy of t5 v6 = neckline band embroidered across chest + small flowers below, vertical front panels shoulder→hem, outer+inner hem bands, many small flowers, skirt medallions, cuff bands + sleeve flowers, t5 cape VERBATIM (Tần capelet + CAPE5_V4_EXTRA) replacing the old cloud collar, centre sash no bow + 2 jade pendant sets, sheer stole, OUTER_TIED. = 11 041 ch; after repeat trims 10 592 (+ 3 more gate-safe repeats ≈ 10 480). Options: (A) drop PHI BẠCH shawl sentence (303) + (B) drop persona "Expression: …" (203) → fits; (C) keep t6 cloud collar (no full t5 cape) → breaks G47.
- **thu t3 v6** 10 093 and **xuân t3 v7** 10 098 with OUTER_TIED: every std trim already used → ~95 over.

## Notes
- DESIGN20 checklist gaps for t7/t8 (neckline band not embroidered, slim front edges, no inner hem band, no jade set) NOT applied — owner L1627 says HQP/HH keep their own style; ask owner if G47 items should still be added there.
