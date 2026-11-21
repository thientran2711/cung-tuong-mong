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

## JOB 2 (Foreman C #14) — xuân Hán s62 t1–t3 _v3 (LADDER1, make_han_xuan_t13.py) · checked at 5a70d85 · 0 gens
All 3 have the following:
- Gates: check_store tpN a22 approved + store PASS; keep_check PASS. Chars: 9476 / 9682 / 9975.
- Master: lines 1–5 and 7–14 verbatim; M06 → B29 A_HEAVY (lụa hoa) verbatim ✓.
- Palette: xuân peach-blossom pink #EB8186 + ivory white. No plum, blush (except "blushed cheeks" in the skin words), ice blue or mint ✓.
- L1565: the same outer-collar sentence is in all 3 ("edges rest exactly ON the shoulder points … cross high above the sash, never a deep low V") ✓. L1577 "t1/t3 = t2" ✓; the collar bands differ per rank only (Đáp ứng plain / Thường tại 2 bands / Quý nhân wide).
- L1577 inner robe: "NO crossed collar, its top edge straight across below the collarbones" ✓, and no "wrap collar" anywhere.
- G40: master_common.OUTER_IN verbatim + "held in only by the sash" ✓.
- L1590: TIER_LOW/G8 density, no DENSE/ALL OVER embroidery ✓.
- F2: lilac / tiger lily / semi-double China rose, ONE flower, size rising ✓.
- G36: "no shawl" in xuân ✓. Items: book / pellet drum (F18 store words) / flute ✓.
- t3: G39 hairpin sentence verbatim ✓.

Verdict: **t1 PASS · t2 PASS · t3 PASS** (no hard fault).
Notes (not blocking):
- t1 "a fresh flower (a lilac spray)": a spray is a cluster (F13).
- t3 "ONE WIDE stiff ivory white collar band", "a wide stiff ivory white silk girdle": B29 says "nothing stiff", but G15 asks for these words (same open conflict as in job 1).
- t3 "one hand touching her hairpin" is not the F18 "set in her hair … raised empty hand" form.

## JOB 3 (Foreman C #14) — thu s62 t1–t3 COMOI_v4 (DESIGN18, make_thu_L1595.py) · checked at cd26445 · 0 gens
Checks that hold for all 3:
- Gates: check_store tpN a22 approved + store PASS; keep PASS. Chars: 9372 / 9979 / 9856.
- Master: lines 1–5 and 7–14 verbatim; B29 A_LIGHT verbatim.
- G40: OUTER_IN, short form, verbatim.
- Palette: plum #DF9ED9 + blush only; no other-season colour.
- Phi bạch: kept (G36 thu).
- F2: lilac / tiger lily / semi-double China rose, size rising.
- B29 "nothing stiff": the old G15 "wide stiff band / stiff brocade girdle" is now "wide soft band / wide soft silk girdle" (the conflict from job 1 is gone). The only "stiff" left is in the master "never stiff".

G41 garment by tier:
- t1 = the current thu Thường tại outfit (v2e t2 line, two-band neckline border) with t1's own flower, hairpins and TIER_LOW t1 density (hem band + small sprays). It is not ChatGPT mẫu C ✓.
- t2 = the current Quý nhân court dress with ONE apron panel, plus t2's own tiger lilies, silver + pearl pins and t2 density ✓.
- t3 = the same dress with TWO apron panels side by side, jade pendant set on each outer side ✓.
- G39: t3 hairpin sentence verbatim ✓.
- F18: the t3 pose now reads "a hairpin set in her hair with one raised empty hand" ✓ (job 1 note fixed). t1 flower is now "a lilac blossom" (F13 note fixed).
- Captions match the new designs. The old t2 "hoa mai" caption is gone.

Verdict: **t1 PASS · t2 PASS · t3 PASS.**
Note: H12 says "never an apron panel", but here the owner orders the panels herself (G41, L1595/L1597), so the newer, specific owner order wins.

## JOB 4 (Foreman C #14) — xuân Hán s62 t1–t3 _v4 vs _v3 · checked at e5789b5 · 0 gens
The diff against v3 is the same 3 sentences in each file, and nothing else changed:
1. First line: "to the shoulder points" → "SECURE on the shoulders".
2. Collar: "rest exactly ON the shoulder points, shoulders covered (never off the shoulder)" → "sit SECURELY on the shoulders, never slipping off" (L1601 "áo muốn tuột").
3. Robe: "a straight-cut floor-length robe (zhiju) … a straight vertical front edge to a WIDE straight hem band (no flare, no ruffled petticoat, no high waist, no wrap spiral, never a short jacket)" (L1601 trực cư). "no curved wrap panel" was dropped from this sentence.

Gates: check_store tpN a22 approved + store PASS; keep PASS vs v3. Chars: 9455 / 9661 / 9954.
No conflict with the other owner rules:
- L1565: still "open OFF the neck … cross high, never a deep low V"; "never slipping off" keeps the intent of "never off the shoulder".
- L1577: the inner robe "NO crossed collar, straight top edge" is unchanged.
- G40: OUTER_IN is unchanged, and "no high waist" does not clash with a sash at the waist.

Verdict: **PASS ×3**.
Tiny note: the words "shoulder points" are gone, so the collar's outer limit is now implied rather than stated.

## JOB 5 (Foreman C #14) — thu s62 t1–t3 COMOI_v5 vs v4 (G42, L1605) · checked at 9c3fe47 · 0 gens
Gates: check_store tpN a22 approved + store PASS; keep PASS. Chars: 9591 / 9963 / 9984.

The diff against v4 is only the G42 additions (plus the t2 trims below):
- t1:
  - front edges = "a narrow blush band embroidered with small lilac sprays, from the shoulders down past the waist" ✓
  - "embroidered lilac sprays cuff bands" ✓
  - "many small sprays … over the upper garment and the skirt" (denser) ✓
  - "a small carved jade pendant (ngọc bội) … at each side" ✓
- t2:
  - neckline band "running straight ACROSS the chest" + "the inner top also embroidered with small tiger lilies" ✓
  - front edges embroidered from the shoulders down past the waist ✓
  - "wide embroidered tiger lilies cuff bands" ✓
  - "many small sprays … over the robe and skirt" ✓
  - jade pendant set kept ✓
- t3:
  - "the inner top also embroidered across the chest" ✓
  - "an embroidered blush band down past the waist" on the front edges ✓
  - wide cuff + hem bands kept ✓
  - "many small semi-double China roses over the robe and skirt" ✓
  - jade pendants on both sides of the two panels ✓
- Ladder carries up (G42) ✓: every t1 placement (edges, neckline band, cuffs, body sprays, jade) is on t2, and every t2 placement is on t3.

t2 trims (A38): what was cut is the duplicate master-repeat line ("Full-body standing figure…", "fair porcelain skin", "3/4 or frontal view"), "never a pair, no cluster", "never back-turned, never in profile" and "Everyone beautiful at every age." "a simple narrow blush band" and "delicate … at the sleeves and hem" were replaced by the richer owner-asked words. Nothing the owner asked for was cut ✓.

Verdict: **PASS ×3**.
Notes (not blocking):
- The density words are the same at t2 and t3 ("many small …"). Nothing says t3 is "a little denser" than t2 (G42), and the motif size does not rise either (H6).
- t2 lost "never back-turned, never in profile" (it was the only copy). Low risk, because t2 is FULLY FRONTAL.

## JOB 6 (Foreman C #15) — thu s62 t5 THU_COMOId (KHO2, CAPE5_V3) · checked at d248d96 · 0 gens
Gates:
- approved+master tp5 a22 PASS; keep PASS vs COMOIc (9943 chars).
- Store mode (`s62 v0 --low 5 --season thu`) has 1 FAIL: the Outfit sentence [0.66]. This is the same pre-existing case as production COMOIc (COMOI neckline rewrite, G38); c FAILs it too at [0.57] → accepted exemption.
- The new CAPE5_V3 sentences match the store: c FAILed the "UNDER it the LOWER layer…" sentence [0.47], and d passes it.
- G40: OUTER_IN verbatim ✓.
- Cape = V3 shape (upper Tần-like capelet + small scalloped lower flaps) + V2 pearls/fringe/net (L1596/L1598) ✓.
- Caption updated.

**G42 (L1605, ladder carries up) — FAIL.** t5 is missing 3 placements that thu t1–t3 v5 already have:
1. Front-edge embroidery shoulder→past waist. t5 has only `its two straight front edges (a slim gold-edged band)`. t1–t3 have "a narrow blush band embroidered with small <flower>, from the shoulders down past the waist".
2. Chest embroidery on the inner top: missing. t3 has "the inner top also embroidered across the chest".
3. Embroidered sleeves/cuffs. t5 has only `deep brocade cuffs`. t1–t3 have "wide embroidered <flower> cuff bands", and owner L1605 says "Tay áo là cũng phải thêu đàng hoàng". H6 also asks for a little sparse motif on the t5 sleeve body.
OK: inner neckline band ("wide gold-embroidered band (the Phi edge)"), jade pendants, a denser body (richly embroidered + medallions).
Fix (A39 delta, a bit denser than t3), for example:
- front edges "(a gold-edged blush band embroidered with small double hollyhocks, from the shoulders down past the waist)";
- add "the inner top also richly embroidered across the chest";
- "deep brocade cuffs" → "deep embroidered double hollyhock cuff bands, a few small double hollyhocks on the sleeves".
Trim the repeats if it goes over 10 000.
Note: thu t4 COMOIc probably lacks the same 3 placements (not checked in this job).
