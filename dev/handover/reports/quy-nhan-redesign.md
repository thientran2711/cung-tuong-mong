# Quý nhân (t3) redesign — 4 outfit options (QN1, owner order G15, Lượt 529 / ROOT-49 chat Lượt 521)
Worker QN1 (depth 3, START_CTX ~3 %), child of ROOT-50. 19/11 ~18:25–18:50Z.

## What was alike (t2 vs t3, current builder `build_all.py m13 2|3 a26` = store `build.py --low 2|3`)
Both are the SAME design: a crossed-collar lilac wrap robe, deep teal inner skirt in a centre strip, deep teal waist sash with a hanging pendant, deep teal phi bạch over the arms. The only differences in the outfit sentence are embroidery density ("delicate motif" vs "wide motif bands") + jade belt pendants + "a little gold thread". At game size they read as the same outfit.

## Method
Base = `python3 dev/art/store-all/build_all.py m13 3 a26` (unchanged builder output). ONLY the outfit DESIGN words inside the "Outfit (rank-3 …): a NEW outfit, …" sentence were replaced, from "a fine silk robe with … a sheer silk shawl;" (old) to each option below. Everything else is the builder text byte for byte: two-colour sentence B15 verbatim, sleeves to the KNEES + one sleeve layer (G5/G6), phi bạch = secondary deep teal (G4), wide motif bands at collar/sleeves/hem (G8 t3), no yellow, clean-forehead sentence, hair, angle, pose, item. No capelet / cloud collar / shoulder pieces (those belong to Tần t4 and up). Ref = her own picture only VX7IB7sMMU. gpt-2-6 1024x2304 2k seed 7172, folder ba4aecfe. Prompt files: `dev/handover/reports/quy-nhan/m13_a26_t3_opt{A,B,C,D}.prompt.txt`.

## The 4 option sentences (outfit-design slot only)
- **A — high-waisted chest-wrap (váy cao ngực):** "a HIGH-WAISTED CHEST-WRAP outfit (a design clearly different from a crossed-collar robe with a waist sash): a floor-length, very full lilac silk skirt wrapped high around the body just above the bust, tied there with a wide deep teal embroidered chest band whose two long deep teal ribbons hang down the front to the knees, so the waistline sits under the arms and the skirt falls in one long flowing A-line to the floor; above it a lilac silk wide-sleeved top with a small soft V neckline edged in deep teal, tucked fully inside the skirt (no top hem visible); wide embroidered wisteria bands along the skirt hem, the sleeve edges and the chest band; a small jade pendant hanging from the chest knot; a sheer silk shawl;"
- **B — long open over-robe (áo khoác dài mở, bối tử):** "a LONG OPEN OVER-ROBE outfit (a design clearly different from a crossed-collar robe with a waist sash): an ankle-length lilac silk over-robe with a straight PARALLEL front opening (no crossed collar), its two straight front edges hanging open and parallel from the neck all the way down to the hem, NOT belted, NOT tied at the waist, wide embroidered wisteria bands running down both front edges, around the sleeve ends and along the hem; under it, visible as a broad vertical strip down the whole front, a deep teal inner robe with a small round neckline and a deep teal pleated floor-length skirt, a slim jade pendant hanging from the inner waist; a long straight vertical column silhouette; a sheer silk shawl;"
- **C — spiral wrap-hem robe (vạt quấn xoắn):** "a SPIRAL WRAP-HEM robe outfit (a design clearly different from a straight crossed-collar robe): a lilac silk robe whose long front panel wraps diagonally around her body and winds once around the hips to the back, so its wide deep teal border embroidered with wisteria spirals in one sweeping curved band from the collar across the chest and around the hips; a WIDE deep teal silk girdle (a broad stiff waist band about a hand wide) around her natural waist with a knotted cord and one jade pendant hanging from it; below the hips the robe flares into a soft trumpet-shaped skirt flowing to the floor with a wide embroidered wisteria hem band; wide embroidered wisteria bands at the sleeve ends; a sheer silk shawl;"
- **D — sleeveless long over-dress (áo gile dài, xẻ hông):** "a SLEEVELESS LONG OVER-DRESS outfit (a design clearly different from a crossed-collar robe with a waist sash): over a lilac silk wide-sleeved inner robe with deep teal collar and cuff bands, a SLEEVELESS ankle-length lilac silk over-dress (long vest) with a straight front closed only at the chest by one jade clasp, open SIDE SLITS from the hips down so the deep teal floor-length pleated skirt shows in long vertical panels at both sides when she moves; wide embroidered wisteria bands along every edge of the over-dress (neckline, armholes, front, side slits and hem) and at the sleeve ends of the inner robe; no waist sash, the over-dress hangs straight from the shoulders; a sheer silk shawl;"

## Results
| option | gen | cut |
|---|---|---|
| A chest-wrap | JNCdcUeOq4 | s7I0YYMl8e |
| B open over-robe | aFGySucfSh | MBJ15K9DCm |
| C spiral wrap | w4ap0yp7EI | yiuBeB3PW9 |
| D sleeveless over-dress | u5WNy1jQLD | If3UlwAtvE |
Comparison (left): current t2 cut DoO16bBpcl, current t3 cut BhNs2xVoQR (TN2 v487).
Sheet: `dev/handover/review-sheets/quy-nhan/qn_options_v1.jpg` (t2, t3, A, B, C, D side by side).
Credits: 4 gens × 135 = 540 + 4 cuts × 3 = 12 → **552**. No regen.

## Notes for the owner (LAW #0 / A18: NOTES only, nothing changed — "có muốn sửa không?")
1. D does not read as sleeveless at game size: the armhole is hidden under the wide sleeves + shawl, so D looks close to B (long open front). If she likes the D idea, the sleeveless/side-slit part would need to be stronger.
2. A, B and C each read clearly different from t2 and from each other: A = high waist under the bust, B = straight open column with no belt, C = diagonal spiral band + wide girdle.
3. None has a capelet, cloud collar or shoulder piece, so all stay below Tần t4.
4. The pose text the builder gives t3 is "walking slowly while reading a painted scroll" (and t2 "walking forward …"), but E4 says no walking or stepping legs. That is builder text, left unchanged.
5. The clean-forehead wording in the builder is "bare clean forehead with no forehead mark and no flower mark". D9 asks for NOTHING (no hoa điền, no dot, no mark); the pictures show a clean forehead anyway. Left unchanged.
6. The a26 age text the builder gives is "about 22, youthful adult" (J6 Nữ đế age wording?). Left unchanged.
STOP — waiting for the owner's pick. She rewrites the Quý nhân prompt herself.
