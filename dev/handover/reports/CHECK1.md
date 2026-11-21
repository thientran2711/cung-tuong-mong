# CHECK1 — independent re-check, THU s62 t1–t6 finals (owner L1561/L1562/L1567)
depth 4 · START_CTX ~3 % (get_session used_tokens read 0; estimate) · 0 gens, 0 credits, no prompt edited · child of Foreman C #13.
Checked at origin 9302d1a (includes 5779ee8 S13_COMOI/G38 and c7b4566 t3 v2d).
I checked each file against the rules, not against COLORFIX1's report. Tools I ran: check_store `--scope tpN --age a22`, keep_check `--sidecar`, a char count, a sentence-by-sentence check against MASTER_COMMON.txt, an exact match against the DESIGN15 B29 sentences, F2_FL, and the palette from palettes_season_deep.json.

## Common to all 6 (PASS)
- Length (chars): t1 9504 · t2 9407 · t3c 9996 / t3d 9983 · t4 9856 · t5 9759 · t6 9993 — all ≤ 10 000.
- Colours: s62 THU = light clear warm plum #DF9ED9 + bright blush. Every colour sentence uses plum/blush. No ice blue, mint, peach, indigo-violet or other s62 season hex is left (the only other hex is t6 royal yellow #F2BC61 = store YEL text). A31: the plum main is distinct from the other s62 mains. A32 (Dịu dàng, light, never deep): the medium-light COLOUR RULE is there and no "SATURATED" is left.
  Note: the names are shortened to "light plum"/"blush" (the hex is right). The blush hex #FFE3EA is never written; the template only carries the main hex.
- B25 master block: lines 1–5 and 7–14 of MASTER_COMMON.txt are verbatim in all 6. M06 is replaced by the B29 sentence, as B29 says.
- B29 fabric, verbatim DESIGN15: t1–t3 A_LIGHT (sa hoa) ✓ · t4–t5 B_LIGHT (đoạn mỏng mờ) ✓ · t6 C_GAM (gấm nhẹ Tống cẩm) ✓.
- F2 hair flower = embroidery species (s62 → index 1): t1 lilac · t2 tiger lily · t3 semi-double China rose · t4 lotus · t5 double hollyhock · t6 incurved chrysanthemum ✓. Exactly ONE flower, and the size rises (small → small-to-medium → palm → larger than palm → BIG → LARGEST) ✓ (F13).
- G36: there is a phi bạch in thu ✓. G25/G26 crossed collar: overridden for the thu COMOI design by owner L1361/L1377 (G38), so the open layered neckline is OK.
- keep_check --sidecar PASS ×7.

## Per file
**t1 dapung4/s62_t1_COMOI_v2c — PASS**, with notes:
- Gates: approved+master PASS, keep PASS. Item: thread-bound book (store L3F[1]). Hairpins: "pretty silver hairpins … little gold" plus the dangles line (F5).
- note F13: "a fresh flower (a lilac spray)". A spray is a cluster, but the same prompt says "no cluster". "a lilac blossom" would be safer.
- note H6/H12: the body embroidery is only "small sprays of embroidered lilac sprays on the upper garment", not "many flowers spread over the body" (H12). The fault is already in the base. The xuân v2 (DESIGN17, L1565) added the t4 density sentence; thu t1 does not have it.

**t2 dapung4/s62_t2_COMOI_v2c — FAULTS (2)**
1. CAPTION is out of date: `"Thường tại · Áo trong cổ vuông viền hoa mai 2 lớp + áo ngoài mở"`. "hoa mai" is the old flower, but the border is now "small embroidered tiger lilies". This caption is written onto the picture.
2. H6 ("t2 never bare") / H12 ("robe body ALWAYS richly embroidered … many flowers spread over the body"): the outfit has only the neckline band and "delicate embroidered tiger lilies at the sleeves and hem". It names no robe-body embroidery. The fault is already in the base.
- OK: pellet drum words = store L3F[2] verbatim ("a deep drum with two pellets, not flat", F18). Hairpins: silver + pearl.

**t3 dapung4/s62_t3_COMOI_v2c — FAIL (do not use)**: X20 / G39 bans `pearl-tipped hairpins` (the "con nhím" wording, L1566). The gate FAILs.
**t3 dapung4/s62_t3_COMOI_v2d — PASS** (gates PASS, keep PASS vs v2c). Hairpin = the G39 store sentence verbatim ("two or three slim pearl hairpins set INTO her gathered hair … never a radiating crown of straight pins or spikes"). Item: bamboo flute with silver bands (store L3F[3]).
Questions for the rule owner (not hard faults):
- B29 says "Nothing stiff … t1–t3 never satin/brocade", but the G15 design words are `a wide stiff blush band`, `a wide stiff blush brocade girdle`. Newer B29 and older G15 conflict.
- H12 says "never … apron panel", but G15 asks for a long ceremonial `APRON PANEL`.
- F18: `one hand touching her hairpin` does not use the spec5 safe form "a hairpin set in her hair with one raised empty hand", so the model may draw a second item.
- H6: same as t1, body embroidery is borders + apron only.

**t4 thu_comoi/s62_t4_THU_COMOIc — PASS** (after 5779ee8: S13_COMOI accepted, G38). Approved+master PASS, keep PASS.
- Capelet G1: short, round, curved, opens gradually, pearl net (L1329).
- G22: borders at sleeves + hem, not the collar, plus "a few LARGE embroidered lotus flowers (fewer than Phi)".
- Hairpins: gold + jade trâm with bu yao dangles. Item: white-jade vase (contrasts with plum/blush).
- note: "a richer gold-brocade band (the Tần edge)" is a trim word next to B_LIGHT "NOT brocade". Minor.

**t5 thu_comoi/s62_t5_THU_COMOIc — PASS**. Approved+master PASS, keep PASS.
- Two short capes + pearl edge/drops/net = the owner-approved Phi prompt (L1329/L1334). The G1 line "no pearls" is out of date.
- Item: folded letter tied with a silk cord. Headdress + trâm with dangles. H6: large motifs.
- note: "deep brocade cuffs, a broad gold brocade girdle" sit next to B_LIGHT "NOT brocade" (trim words). Owner/rule owner to confirm.

**t6 thu_comoi/s62_t6_THU_COMOIc — FAULT (1)**
1. A41 (owner L1411, "không có ai đeo dây chuyền"): `gold-and-jade necklace and bracelets`. This is a necklace in a figure prompt, and it is already in the base. The `a few strands of pearls across the chest` (store YEL_T6) is necklace-like too; the rule owner should rule on it.
- OK: C_GAM; outfit "HEAVY" → "LIGHT"; vân kiên with scalloped gold edge + tassel fringe + pearl edge + royal yellow (G1); tú cầu "round stuffed ball, no handle, no stick" (F18); trâm with dangles + big gold headdress.
- note G37: the prompt never says "ONE tier" for the vân kiên. It does not break the rule, and there is no store sentence for it.
- note: the store t6 COLOUR RULE ("blush only as a small accent", "cape and train", royal yellow) contradicts the TWO-COLOUR RULE ("secondary … in large areas", "never a third colour") and "no train". This is pre-existing store text.
- Store mode (`s62 v0 --low 6`) FAILs only on her ROOT ice-blue colour sentences, which is a gate limit (no season mode). Expected.

## Verdict
t1 PASS (notes) · t2 FAULT (caption "hoa mai"; H6 body embroidery) · t3: use **v2d** = PASS (v2c FAIL X20) · t4 PASS · t5 PASS · t6 FAULT (A41 necklace).
None of the faults is a gate FAIL. A fix for t2 or t6 needs an A39 edit + keep line by a prompt worker; I edited nothing.
