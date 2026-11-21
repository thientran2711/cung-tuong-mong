# DESIGN20 — thu s62 t4 Tần v5 (G40/G42/G44/G45), owner L1623/L1624 via Foreman C #15
depth 6 (child of Foreman C #15) · START_CTX ≈ 4 % (est; get_session used_tokens reads 0) · 0 gens, 0 cr.

## JOB 1 — thu s62 t4 Tần v5 prompt
Builder (L1567, never hand-edited): dev/art/thu_comoi/make_s62_t4_thu.py → **dev/art/thu_comoi/s62_t4_THU_COMOIe.txt (9 989 chars)**.
Base = thu_comoi/s62_t4_THU_COMOIc.txt (production t4, CHECK1 PASS; same chain as KHO2 t5 COMOId). Palette unchanged = t1–t3 v5 (light plum #DF9ED9 + blush).
Changes (A39, only these):
1. G40: master_common.OUTER_IN after "outer robe worn OPEN at the front … ;" (same placement as LADDER1 COMOId).
2. G42 (carry t3 v5 placements up, a bit denser):
   - density: "a few LARGE embroidered lotus flowers on the robe (fewer than Phi)" + " among many small lotus flowers over the robe and skirt" (t3 v5 has "many small … over the robe and skirt"; t4 keeps its LARGE flowers on top = denser).
   - inner top: "(the Tần edge)" + ", the inner top also richly embroidered across the chest" (t3: "also embroidered", t5: "also richly").
   - front edges: "(a slim gold edge)" → "(an embroidered blush lotus band down past the waist)" (t3 v5 words + lotus).
   - sleeves: "long trailing wide sleeves" + " with a few small lotus flowers on them" (cuffs already = "WIDE gold-thread embroidered borders of lotus flowers at sleeves and hem").
3. G44 + G45 + G42 jade: "an embroidered silk sash with jade belt pendants and tassels" → "an embroidered silk sash tied flat at the CENTRE front, NO bow, with a carved jade pendant set (ngọc bội) and tassels in front, never covered by sleeve or shawl".
4. Caption: "… Tần · Áo choàng nhỏ + cổ mở · v5".
Tần capelet clause (B, owner liked) byte-identical. Pose (white-jade vase in one hand) unchanged — a hand in front is OK by G45.
A38 trims (make_thu_L1574.fit, same list as LADDER1/KHO2; store sentence "Everyone beautiful…" never trimmed): "; face clearly visible, 3/4 or frontal view." · ", never a pair" · ", no cluster" · ", never in profile" · the "her signature colour family … all-gold robe" colour-repeat sentence. Tried + rejected (gate FAIL): dropping "The item is in a contrasting colour…" (S16), "Every hairpin is inserted…" (S24), "NOTHING on the forehead…" (S34). My own additions were shortened instead (first draft 10 188).

## Gates
- check_store --scope tp4 --age a22: APPROVED + STORE CHECK PASS.
- check_store s62 v0 --low 4: only the Outfit store sentence [0.70] = the same accepted exemption as COMOIc ([0.69], G38/L1377 COMOI neckline).
- keep_check --sidecar PASS (base COMOIc, 9 allow lines); keep_check --all 274 PASS.

## Open notes
- t3 v5 also has TWO apron panels + long jade pendant sets on the girdle; not in the G42 list → not carried to t4 (owner/foreman call).
- "gold-brocade band (the Tần edge)" next to fabric "NOT brocade" (CHECK1 old minor note) unchanged.
- Margin: 1 char under the 9 990 builder LIMIT, 11 under the gate 10 000.
