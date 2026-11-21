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

## Job 3 — owner L1657 G51 CORRECTION (Foreman C #17). Builder thu_comoi/make_design22_L1657.py
Original sash words back, "flowered brocade" carry-up removed, the blush change removed. One plain clause added only where the file had no held-in wording.
| tier | base → new | sash words | held-in clause | other | chars |
|---|---|---|---|---|---|
| t3 | dapung4 v10 (unchanged) | never changed (= t2) | already "WRAP robe HELD IN by the sash" | — | 9989 |
| t4 | COMOIk → COMOIl | "an embroidered silk sash tied flat" (= COMOIf) | already "outer robe HELD IN by the sash tied OVER it" | — | 9994 |
| t5 | COMOIj → COMOIk | "a broad gold brocade girdle tied flat" (= COMOIe) | already present | — | 9996 |
| t6 | COMOIl → COMOIm | "a yellow sash" (= COMOId) | + "; the sash tied over the outer robe holds it in at the waist" after "neck and collarbones visible" | A38 cut "her own colour stays clearly the main robe colour, " (repeat of COLOUR RULE) | 9971 |
| t7 | v8k → v8l | "a wide yellow sash" (= v8c) | + same clause after "framing the bordered square neckline" | A38 "floor-length robe with slippers visible" → "floor-length robe" (S19 tail repeat; LADDER2 v8g same) | 9994 |
| t8 | v10i → v10j | "a wide yellow sash" | already WRAP HELD IN | "Pose: weight on one leg," restored (room again) | 10000 |
G52/G49/master line kept. check_store ×5 PASS (t6/t7 OUT1 WARN only: the long master OUTER_IN clause is not used, by owner "no emphasis"). keep --all 358 PASS. 0 gens.
NOTE: the t5 sash is gold again (COMOIe words), as the Foreman asked. Owner L1656 called the yellow girdle ugly → owner should confirm.

## Job 4 — owner L1666 "thon gọn?" — OK'd versions + THICKNESS AUDIT (no edits, 0 gens)
### A) Owner-OK'd thu s62 versions from 20/11 (before G40/G47/G51/G52/capelet)
Set A (strongest): store-builder run 20/11 07:31–07:38Z. The owner had ROOT-68 cut every rank into combined transparent images (ledger RANK8-CUT 07:43Z). Prompt dev/art/rank8-s62/s62_tN.txt (old ice-blue palette, crossed collar):
t1 mEZiZ8ShJQ · t2 9ZHuqIGNYZ · t3 vQARGIUa47 · t4 SyhIap2Ub8 · t5 xSBe8KVjfW · t6 1ldDonjr4r · t7 nVsxSZNYQD · t8 KLpVBAXkqp. The owner also kept t1 and t2 as skins (SKIN-1120 "kept as skin (owner 20/11)").
Square-neck variants the same morning, all kept as skins: t1 xSBeugTjfW (test-square/s62_t1_sq), t4 eIPOIm2dqL (test-square456/s62_t4_sq), t5 MBJwQZqDCm, t6 SyhtzkOUb8 (test-square56b). For t2 the owner rejected style 2 nVsx9M3YQD ("rộng quá").
Set B (later, light plum, never said "duyệt"): L1576 finals t1–t6, 21/11 ~00:20Z: iG5w9iB3uK / xSBQkx1jfW / gOm5sZ5SXO / SyhKlGwUb8 / 6AbU9EpiJO / bxMvHW65Y2, prompts dapung4 t1 v2d, t2 v2d, t3 v2e, thu_comoi t4 COMOIc, t5 COMOIc, t6 COMOId. Owner reaction L1580: Phi cape weird, t1–t3 too dense. ChatGPT praise, no Magnific id: t7 thu_comoi/s62_t7_THU_COMOI.txt L1383 "rất đẹp"; t8 s62_t8_THU_COMOI_v2.txt L1394 "ổn nhất".
### B) Thickness: Set A prompt vs CURRENT (t1–t3 dapung4 v10, t4 COMOIl, t5 COMOIk, t6 COMOIm, t7 v8l, t8 v10j)
| tier | added since OK'd (thick/bulky) | slim words |
|---|---|---|
| all t1–t8 | NEW "LAYERED NECKLINE (two-garment look)": inner top + "light plum outer robe … OVER it" (0→1 each). G40 "outer robe HELD IN by the sash … wraps over BOTH layers" = an extra robe layer over the whole torso on every tier. | "healthy slender figure" + "elegant, slim" master lines kept in all |
| t1 | outer robe 0→3 mentions; Tang "snug crossed-collar upper garment" → layered neckline + outer robe | "snug" LOST |
| t2 | OK = "a fine silk robe … soft silk sash" (simple). Now "structured, rich COURTLY palace consort dress", girdle + APRON PANEL, wide 4→7, outer robe | — |
| t3 | + outer robe (3), "two or three" layers 0→1 | — |
| t4 | fabric "thin, light, flowing silk and gauze" → "silk SATIN (đoạn)" + "layered satin robe of two or three visible layers" + outer robe; capelet words 8→3 (fewer) | — |
| t5 | THICKEST: layers 5→9, + capelet (0→4), beaded yoke/net over it, + "extra small SOFT layer on EACH shoulder", fringe, satin, outer robe, wide 5→7 | — |
| t6 | OK "HEAVY silk brocade" → now "LIGHT brocade" (thinner); + outer robe, cloud collar wording, fringe | — |
| t7 | + outer robe, broad 1→3 ("broad royal-yellow brocade band" collar), brocade 1→2 | — |
| t8 | + outer robe, cloud collar "moderately firm", cape 0→2, wide 10→11 | OK "slim tall silhouette" → now "slim, hanging close, never bell-wide" (kept, reworded) |
FABRIC t7/t8 = "thick gold-embroidered brocade" in BOTH (unchanged). No version has a separate "slim outfit" line except t8. Main cause of the thick look = the two-garment layered neckline + outer robe held in over both layers (all tiers) and the t4/t5 satin + 2–3 layers (+ the t5 capelet/yoke/shoulder layers).
