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

## Step 3 (Foreman C #15 answers 01:47–01:48Z) — all PASS (check_store --scope tpN --age a22 STORE+APPROVED; keep_check --all 287 PASS)
| tier | new file | chars | change | length method |
|---|---|---|---|---|
| thu t6 Quý phi | thu_comoi/s62_t6_THU_COMOIf (builder make_s62_t6_thu_v6.py) | 9996 | G47 copy of DESIGN20 t5 v7 (COMOIf), motif = incurved chrysanthemums: neckline band of dense embroidery ACROSS the chest + small flowers below; long vertical front panels shoulder→hem; small birds; many small flowers over robe+skirt; WIDE hem bands outer + inner; skirt medallions; cape ITEMS of t5 (capelet + cord across chest + jade clasp + pearl/jade/gold-stud net + fringe + extra soft layer on each shoulder, fringes longer than Phi) replacing the old one-tier cloud collar; cuff bands + sleeve flowers; yellow sash flat CENTRE no bow + TWO apron panels + long jade pendant set each side, never covered; sheer stole; OUTER_TIED; caption "Quý phi · v6" | Foreman B: persona "Expression: …" (repeat of face block) cut; our copied words compressed; repeats cut: signature-colour sentence, "pearl-edged collar trim", "grander gold headdress…", "rich gold-thread embroidery covering much of the robe", "image 2 is only a colour reference", "her own colour stays clearly the main robe colour". Note: `--low 6` store-design compare shows 9 low-overlap store sentences (base COMOIe had 4); extra = Expression (B), the luxury/colour repeats above. |
| thu t1 | dapung4/s62_t1_COMOI_v6 | 9805 | OUTER_TIED + chest embroidery on inner top + hem band outer AND inner | none |
| thu t2 | dapung4/s62_t2_COMOI_v6 | 9902 | OUTER_TIED + hems outer AND inner | signature-colour repeat (std) |
| thu t3 | dapung4/s62_t3_COMOI_v6 | 9963 | OUTER_TIED + hems outer AND inner | ANGLE tail repeat of HEAD AND BODY; first "NO crossed wrap collar" (said twice); apron paren compressed |
| xuân t1 / t2 | seasons4/s62_t{1,2}_HAN_BAC_v7 | 9551 / 9821 | OUTER_TIED + "the embroidered inner robe hem showing below" | none |
| xuân t3 | seasons4/s62_t3_HAN_BAC_v7 | 9990 | same | ANGLE tail repeat; sleeve paren (repeat of S11) compressed; our G42 cuff/hem phrase compressed |
Builder for t1–t3: thu_comoi/make_g40_tied_t13.py. Approved pictures unchanged (prompt files only).
t7/t8: no G47 copy (owner L1627 + Foreman); both already wear jade (t7 "long jade-and-gold belt pendants with pearl tassels"; t8 same) → G42 jade OK.

## (old, resolved by step 3) BLOCKED
- **thu t6 Quý phi v6** (thu_comoi/make_s62_t6_thu_v6.py, `--raw <out>` to see): G47 copy of t5 v6 = neckline band embroidered across chest + small flowers below, vertical front panels shoulder→hem, outer+inner hem bands, many small flowers, skirt medallions, cuff bands + sleeve flowers, t5 cape VERBATIM (Tần capelet + CAPE5_V4_EXTRA) replacing the old cloud collar, centre sash no bow + 2 jade pendant sets, sheer stole, OUTER_TIED. = 11 041 ch; after repeat trims 10 592 (+ 3 more gate-safe repeats ≈ 10 480). Options: (A) drop PHI BẠCH shawl sentence (303) + (B) drop persona "Expression: …" (203) → fits; (C) keep t6 cloud collar (no full t5 cape) → breaks G47.
- **thu t3 v6** 10 093 and **xuân t3 v7** 10 098 with OUTER_TIED: every std trim already used → ~95 over.

## Notes
- DESIGN20 checklist gaps for t7/t8 (neckline band not embroidered, slim front edges, no inner hem band, no jade set) NOT applied — owner L1627 says HQP/HH keep their own style; ask owner if G47 items should still be added there.

## Step 5 — CHECK1 01:50Z FAIL on t7 v8e / t8 v10d → fixed as t7 v8f (9991) / t8 v10e (9967), gates PASS, keep --all 289 PASS
- G45 (both): jade pendants "never covered by sleeve, cape or shawl". t8: after "long jade-and-gold belt pendants with pearl tassels". t7: that phrase sits inside store S14 (gate FAIL if touched) → put on the outfit belt instead ("a jade-and-gold belt with long tassels, its pendants never covered by sleeve, cape or shawl").
- t8 F18: pose hairpin = store shape words "slim and palm-length, held between her fingers, never a sceptre, raised and admired, the other hand beneath it".
- t8 extra A38 repeats: outfit "a jade-and-gold belt with long tassels" (repeat of luxury pendants), crown ", rubies and pearls" (repeat of "More jewels on the crown (rubies, sapphires, pearls and jade)"), colour list ", a broad yellow collar" (repeat of "her broad yellow collar"), pose ", the robe falling still and straight".
- HOLD (Foreman 01:53Z): no t6–t8 gens until DESIGN20's new G40 wording is proven on t4/t5 v8 drafts; then swap into OUTER_TIED source + t1–t3, xuân, t6–t8, re-gate, CHECK1.
- Vase check (owner L1438): none in t1–t3 v6, xuân v7, t6 COMOIf, t7 v8f, t8 v10e. Only DESIGN20's t4 COMOIf / COMOIg hold "a small white-jade vase" (pose).
- CHECK1 rule question for the owner: "strands of pearls across the chest" (t6–t8) vs A41 no necklaces.

## Step 6 — CHECK1 job 11 FAIL t6 COMOIf (G1 vân kiên dropped) → t6 COMOIg 9996, gates PASS, keep --all 292 PASS
- Quý phi one-tier VÂN KIÊN kept word for word (G1/G37 signature; Foreman 01:53Z agrees); Phi cape items carried ONTO it: "a pearl-and-jade net over it, its fronts linked across the chest by a silk cord with a jade clasp in the middle". Small shoulder layers did NOT fit (Foreman: "if they fit").
- Fit: extra A38 "; her head never back-turned" (ANGLE table words kept), our jade-set words shortened ("a long jade pendant set (ngọc bội) at each outer side").
- COMOIf stays in the repo as the FAILed version (do not gen).
- NEXT on Foreman GO: OUTER_TIED → master_common.OUTER_WRAP (DESIGN20 9db802f) + "outer robe worn OPEN at the front," → "outer robe open above the waist," in t1–t3 v6, xuân v7, t6 COMOIg, t7 v8f, t8 v10e (net +5 ch each; t6 then needs 1 char).
