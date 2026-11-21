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

## JOB 7 (Foreman C #15) — xuân Hán s62 t1–t3 _v6 (DESIGN19) · checked at 8f20828 · 0 gens
Gates, all 3:
- check_store tpN a22 approved + store PASS; keep PASS vs v5. Chars: 9430 / 9700 / 9989.
- Master: lines 1–5 and 7–14 verbatim; B29 A_HEAVY verbatim.
- Palette: #EB8186 peach-blossom pink + ivory only.
- "shawl" appears only in the master line and in "no shawl" (G32/G36: no phi bạch for Hán/xuân) ✓.

Owner points:
- L1606: TWO visible robe layers (wrapped outer robe + full inner robe), and the inner hem shows below ✓.
- L1607: "Han-dynasty quju (khúc cư)", the front panel "wraps ONCE round to the side to a softly curved bordered hem" ✓.
- G32: wide layered jiaoling, "one broad V that starts near the shoulder points, SECURE on the shoulders, never slipping off" ✓.
- The collar crosses "just above the sash (no crossing at the throat)". That still respects L1577's complaint (no diagonal line at the neck).
- G40: OUTER_IN verbatim ✓.
- G42 ladder:
  - inner collar band, outer collar + wrap + hem band, cuff bands, hem band, sprays on the upper garment and jade are all on t1, and every one carries to t2 and t3 ✓;
  - jade: t1 1 pendant · t2 disc + pendant · t3 disc + 2 pendant sets.
- F2 flowers + rising size ✓; G39 t3 hairpin verbatim ✓; items book / drum / flute ✓.

Verdict: **PASS ×3.**
Notes (fix-recommended, not blocking):
- t3 still has `ONE WIDE stiff ivory white band` + `a wide stiff ivory white silk girdle`. B29 says "nothing stiff", and thu v4 already changed both to "soft".
- t3 pose is still `one hand touching her hairpin`; thu v4 already uses the F18 form "adjusting a hairpin set in her hair with one raised empty hand".
- t1 "a lilac spray" (F13); thu v4 uses "a lilac blossom".
- The density wording is almost the same at t1–t3 ("small sprays" / "small sprays" / "sprays"), so the G42 "a little denser" step is weak.

## JOB 6 re-check — thu s62 t5 THU_COMOId (KHO2 9128cac) · checked at 8123dde · 0 gens
Gates:
- approved+master tp5 a22 PASS; keep PASS (16 allowed drops). Chars: 9986.
- Store mode has only the pre-existing Outfit sentence [0.65], the accepted COMOI exemption. The CAPE5_V3 sentences pass the store check.

The 3 G42 deltas are in:
1. Front edges: "(a gold-edged blush band embroidered with small double hollyhocks, down past the waist)". "from the shoulders" is covered by "over BOTH shoulders" ✓.
2. Chest: "the inner top also richly embroidered across the chest" ✓.
3. Sleeves: "deep embroidered double hollyhock cuff bands, a few small double hollyhocks on the sleeves" ✓.

The length trims are repeats only:
- the cape's "never hiding the neck or the square inner neckline" (still covered by "never covering the neckline" and the layered-neckline clause);
- the lower-flap words were tightened, same meaning.

Ladder (G42): t5 now carries everything t1–t3 v5 have (edges, neckline band, chest, cuffs/sleeves, body, jade), denser. **Verdict: PASS.**

## STANDING CHECKLIST (Foreman C #15, owner L1626–L1628) — every consort prompt from now on; FAIL if anything is missing
1. G40: the sash visibly wraps OVER the outer robe (all 8 tiers).
2. The inner top's horizontal neckline band is EMBROIDERED.
3. The inner top has chest embroidery.
4. From t4 up: long vertical embroidered panels down the outer robe's front edges (G47).
5. Outer hem band embroidered.
6. INNER robe hem embroidered (G47).
7. Sleeves/cuffs embroidered.
8. Jade for consorts / sachet for maids (G42/G43).
9. Every item of the tier below is present, denser (G42/G47). G46: Tần chest cord + jade piece; Phi cape = Tần capelet text verbatim + one small extra layer on each shoulder.
10. G44: a bow only if centred, or no bow (thu t3 = girdle medallion, no bow).
11. G45: no cloth, sleeve, cape, shawl or flap over the jade/sash front.
Also: the gates (check_store, keep_check), ≤ 10 000 chars, palette, F2, B29, G39.

## JOB 8 (DESIGN20 d13d7ed) — thu s62 t4 COMOIf + t5 COMOIe, standing checklist · checked at 83d55ab · 0 gens
Gates:
- tp4 / tp5 a22 approved + master PASS; keep PASS. Chars: 9972 / 9980.
- Store mode: only the Outfit sentence [0.70] / [0.73] = the COMOI exemption.
- Phi bạch kept (thu).

Checklist, t4 / t5:
1. G40 master_common.OUTER_TIED ("front edges meet at the waist under the sash, which wraps over BOTH layers") ✓ / ✓
2. Neckline band embroidered straight ACROSS the chest ✓ / ✓
3. Chest embroidery ("small lotus flowers embroidered below it" / "many small double hollyhocks embroidered below it") ✓ / ✓
4. Long vertical embroidered front-edge panel shoulder→hem ✓ / ✓ (gold-edged)
5. Outer hem band ("WIDE … borders … at sleeves and hem" / "WIDE … hem bands on the outer and the inner robe") ✓ / ✓
6. Inner robe hem embroidered ✓ / ✓
7. Sleeves / cuffs embroidered (wide borders + "a few small lotus flowers on them" / "deep embroidered … cuff bands, a few small … on the sleeves") ✓ / ✓
8. Jade: one jade pendant set in front / two long jade pendant sets in front ✓ / ✓
9. G46 / G47:
   - t4 capelet + jade clasp on a short silk cord across the chest, verbatim ✓
   - t5 has that same 576-char t4 capelet text verbatim + CAPE5_V4_EXTRA (small soft pearl-edged layer with tassel fringe on each shoulder) ✓
   - t5 carries every t4 item (panels, inner hem, chest, sleeves, jade, LARGE motifs → large medallions), denser ✓
10. G44: sash / girdle flat at the CENTRE, NO bow ✓ / ✓
11. G45: "never covered by sleeve or shawl" ✓ / ✓

Verdict: **t4 PASS · t5 PASS.**
Old note, not blocking: t5 "broad gold brocade girdle" sits next to B_LIGHT "NOT brocade".

## JOB 9 (DESIGN20 751e3a5) — thu s62 t4 COMOIg + t5 COMOIf (v7) vs v6 · checked at 037a98e · 0 gens
Gates:
- tp4 / tp5 a22 PASS; keep PASS. Chars: 9981 / 9981.
- Store mode: only the Outfit sentence [0.70] / [0.73] = the exemption.

The diff against v6 is only what was asked:
- (d) "at sleeves and outer hem" ✓
- (e) capelet "linked across the chest by a silk cord with a jade clasp in the middle" (G46) ✓
- t3's TWO embroidered blush APRON PANELS carried up (Foreman YES), with a jade pendant set at each outer side, "never covered by sleeve or shawl" (G45) ✓
- Trims, all A38:
  - the capelet "(never hiding the neck or the square inner neckline)" (the capelet is still OPEN at the front);
  - t4 "neck and collarbones visible";
  - the pose tails ("skirt swirling / robe hem stirring").
- G46: t5 still has the t4 capelet text verbatim (527 chars) ✓.
- The rest of the standing checklist is unchanged from job 8 ✓ (OUTER_TIED, neckline band, chest, vertical panels, outer + inner hem, cuffs, jade, centred no bow).

Verdict: **t4 PASS · t5 PASS.**
Notes (not blocking):
- t4 no longer says "neck and collarbones visible" (t5 keeps "showing her neck and collarbones"; the low square neckline implies it).
- t5 chest is "small double hollyhocks below it": the word "embroidered" and "many" were dropped, so t5 chest density = t4, a weak G42 "denser" step.

## JOB 10 (LADDER2 ed026219f) — thu s62 t7 HQP v8e + t8 HH v10d · checked at d7649b0 · 0 gens
Gates:
- tp7 / tp8 a22 STORE + APPROVED PASS; keep PASS. Chars: 9991 / 9998.
- G40: OUTER_TIED verbatim ✓ / ✓.
- Own embroidery style kept (L1627, t7/t8 exempt from the t1–t6 placement copy).
- Jade: "long jade-and-gold belt pendants with pearl tassels" ✓ / ✓. G37: t8 "ONE tier" ✓.

FAULTS:
- t7 + t8, G45 (standing checklist 11): no "never covered" words for the jade belt pendants. t4/t5 have "…, never covered by sleeve or shawl"; t7/t8 have long trailing sleeves + a cape. Add it after "with pearl tassels".
- t8, F18: `a gold phoenix hairpin with pearl dangles, held in the hand raised and admired`. The held-hairpin shape words are missing; F18 + the store item (t8-prompt-B/build.py) require "slim and palm-length, held between her fingers, never a sceptre".
Rule-owner question (pre-existing store text, not counted as a fault): t7 + t8 `strands of pearls across the chest` vs A41 (no necklaces on anyone, L1411).
Verdict: **t7 FAIL (G45 words) · t8 FAIL (G45 words + F18)**. These are one-phrase fixes.
- A41 settled (Foreman C #15, NEWACCT#13/L1574): the chest pearl strands on t7/t8 are KEPT, because A41 bans necklaces, not these strands. This is no longer a question.

## JOB 11 (LADDER2 db26ad679) — thu s62 t6 Quý phi COMOIf · checked at db26ad6 · 0 gens
Gates: tp6 a22 PASS; keep PASS. Chars: 9996.
Standing checklist, all present:
- OUTER_TIED ✓
- embroidered neckline band ACROSS the chest + flowers below ✓
- vertical front panels shoulder→hem ✓
- outer + inner hem bands ✓
- cuffs + sleeve flowers ✓
- jade at each side "never covered" ✓
- centre sash, NO bow ✓
- denser than t5 ✓
- Phi bạch kept ✓

**FAULT (G1, owner L1266 SWAP56): the Quý phi signature VÂN KIÊN cloud collar has been removed.** The outfit now says `… replacing the old cloud collar` (LADDER2.md) and `no cloud collar, vest or stiff shoulder pieces`, and puts the Phi's capelet + shoulder layers on t6 instead.
- The owner's ladder is capelet(1) → two capes(2) → vân kiên (t6) → jewelled cloud-collar cape (t7) → empress. Without the vân kiên, t6 looks like a Phi and the step to t7 is lost.
- G47 "copy the lower tier" adds items. It does not delete the rank's own signature piece, and no owner order to drop the t6 vân kiên was found.
- Suggested fix: keep the G1/G37 one-tier vân kiên (scalloped gold-thread edge, gold tassel fringe, pearl-edged, small jade + pearl drops) as THE signature piece, and carry the Phi items onto/under it (pearl net, pearl fringe, jade clasp on the chest cord). Or get the owner's explicit yes to replace it.
Notes:
- The persona "Expression:" sentence was cut (Foreman option B) — accepted per Foreman.
- The t6 cape words are a compacted version of the t5 text, not verbatim (G46 asks for verbatim only for Tần → Phi).
Verdict: **t6 FAIL (G1 vân kiên removed)**. Not sent to GEN1.

## HOLD + checklist add (Foreman C #15 ~01:53Z)
- The v6 drafts show that OUTER_TIED does not work in the picture (the outer robe is still an open coat). HOLD t6/t7/t8 even on PASS until DESIGN20's v8 G40 wording is proven on the t4/t5 drafts; then LADDER2 swaps it in and I re-check.
- Checklist item 12: no vase / bình hoa as the held item (owner L1438). The thu t4 v6/v7 pose "a small white-jade vase with blossoms" breaks this, so the next t4 version must change it.

## JOB 12 (DESIGN20 9db802f) — thu s62 t4 COMOIh + t5 COMOIg (v8) vs v7 · checked at 5d4d596 · 0 gens
Gates:
- tp4 / tp5 a22 PASS; keep PASS. Chars: 9988 / 9982.
- Store mode: only the Outfit sentence [0.70] / [0.73] = the exemption.

The diff against v7 is only what was asked:
- G40 → master_common.OUTER_WRAP verbatim ("WRAP robe HELD IN by the sash … overlap at the waist, bound CLOSED under the sash lying ON TOP of it … never an open coat") ✓
- "worn OPEN at the front" → "open above the waist" ✓
- t4 item: vase → "a small white-jade lotus lamp" (L1438 no vase ✓)
- t5 medallion words compacted
- Every other checklist item is unchanged from job 8/9 ✓

Verdict: **t4 PASS · t5 PASS**. These are the proof drafts for the new G40 wording, so they are not under the t6–t8 HOLD.
Note: the approved t4 S13 sentence "the outer robe closes only at the sash … opening gradually in a long soft V toward the hem" fits OUTER_WRAP (closed at the sash, opens below it), but it may weaken the "fabric … below the sash" wording. Flagged by DESIGN20; watch the draft.
