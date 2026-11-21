# DESIGN22 — thu s62 G51 flowered brocade sash + G52 motifs off the bands + Phi G49 swag clearer (Foreman C #16, owner L1653)
depth 7 · START_CTX ~4 % (used_tokens read 0; estimate) · 0 gens, 0 cr. Builder: dev/art/thu_comoi/make_design22_L1653.py

## New files (each base = the current file named in the brief; .keep sidecar beside each)
| tier | base → new | chars | check_store tpN a22 |
|---|---|---|---|
| t1 | dapung4/s62_t1_COMOI_v7 → v10 | 9820→9860 | PASS |
| t2 | dapung4/s62_t2_COMOI_v9 → v10 | 9943→9983 | PASS |
| t3 | dapung4/s62_t3_COMOI_v9 → v10 | 9987→9989 | PASS |
| t4 Tần | thu_comoi/s62_t4_THU_COMOIj → COMOIk | 9972→9978 | PASS |
| t5 Phi | thu_comoi/s62_t5_THU_COMOIi → COMOIj | 9985→9990 | PASS |
| t6 | thu_comoi/s62_t6_THU_COMOIk → COMOIl | 9977→9979 | PASS (OUT1 WARN as before) |
| t7 | thu_comoi/s62_t7_THU_COMOI_v8j → v8k | 9956→9973 | PASS (OUT1 WARN as before) |
| t8 | thu_comoi/s62_t8_THU_COMOI_v10h → v10i | 10000→9998 | PASS |
keep_check --all: 342 PASS.

## Diff (only these)
G52 (+ ", never over the edge, cuff or hem bands" right after the "many small <flower> over the robe and skirt" phrase): t1, t2, t3, t4, t5.
- t6: after "(…cuffs and skirt-front medallions)" + ", the body motifs never over these bands" (its bands are embroidered on purpose, so the wording only keeps the body motifs off them).
- t7/t8: NOT added (phoenixes are placed on the chest/borders on purpose; own style L1627). Ask owner if wanted.
G51 (flowered brocade sash):
- t2/t3 wording "a wide soft blush silk girdle at the natural waist" → unchanged (t3 already = t2 words).
- t4 "an embroidered silk sash tied flat" → "a flowered brocade sash tied flat"
- t5 "a broad gold brocade girdle tied flat" → "a broad gold flowered brocade girdle tied flat"
- t6 colour list "a yellow sash and narrow" → "a yellow flowered brocade sash and narrow"
- t7 "a wide yellow sash," / t8 "a wide yellow sash and" → "a wide yellow flowered brocade sash"
G49 Phi t5: "a SHORT round-pearl strand hangs in a short swag from the left capelet front to the right" (89) → "a SHORT round-pearl strand swags ACROSS her chest, left capelet front to right" (78).
A38 trims (repeats, to fit 10 000; allow lines in .keep):
- t3 ", framing the bordered square neckline" (as DESIGN20 did on t5)
- t4 + t5 " Everyone beautiful at every age." (as DESIGN21 on t6, CHECK1-passed). Foreman/CHECK1 job 21: the "embroidered below it" chest words RESTORED (owner L1628)
- t6 ", and a grander gold headdress with more gold ornaments" (repeat of "a BIG ornate gold headdress …"; LADDER2 cut the same). CHECK1 job 21 fix: "a pearl-edged collar trim" + "image 2 is only a colour reference;" RESTORED
- t8 pose "Pose: weight on one leg, a gold" → "Pose: a gold" (repeat of "weight resting on her RIGHT foot" + master)
Tried and FAILED gates (not used): cutting ", never stiff, flat or board-like" (M07 master) and ", no cup" in the tail (S19).

## Open
- G51 wording on t2/t3 has no "brocade" word; the t2 picture got it anyway. If the t3 draft shows a plain girdle, use "a wide soft blush flowered brocade girdle".
- G52 on t7/t8? (owner).
- t1 current per brief = v7 (a v8 exists from LADDER2 step 9; not used).

## Final
CHECK1 job 21: all 8 PASS (t4 COMOIk, t5 COMOIj, t6 COMOIl re-checked PASS 02:40Z). Commits 31af161d3, ca9ed759c, 8a9caf947. 0 gens. Done; nothing open for DESIGN22 beyond the owner questions above.

## Job 2 — owner L1656 (Foreman C #17, drafts 9ZHSjoTNYZ / mEZp0UIhJQ)
- t5 COMOIj: "a broad gold flowered brocade girdle" → "a blush flowered brocade girdle" (Phi's own secondary colour; no "broad", no "gold").
- t4 COMOIk + t5 COMOIj: master " Everyone beautiful at every age." RESTORED. To fit, my own G52 add shortened on t4/t5 only: ", never over the edge, cuff or hem bands" → ", never over the bands". Capelet text untouched.
- t6 COMOIl / t7 v8k / t8 v10i: NO gold girdle wording there; their sash is "yellow flowered brocade" inside the royal-yellow colour list (t6+ rank yellow). t7/t8 "jade-and-gold belt (pendants)" = jade pendant belts. Left unchanged; ask owner if the yellow sash should change too.
- t4 9993, t5 10000 · check_store PASS · keep --all 345 PASS · 0 gens.
