# MAIDP2 — maid GPT prompt fixes (owner Lượt 1456/1457, brief dev/handover/briefs/maid-fix-L1456.md)
depth 1 (limit 8) · START_CTX ≈ 3 % of 1M (get_session used_tokens read 0; own estimate) · 0 credits, NO Magnific gens (only creations_get reads).
Builder: dev/art/maid7/make7_gpt.py (every swap asserted exactly once). v1 files untouched; v2 files sit beside them.

## STATUS: DONE (all 6 jobs). Owner GO L1465 (via Foreman C 21:29Z): ma ma = B (m05 r55); thân cận = round-1 + her colour/shape words.
FINAL files (dev/art/maid7/gpt/): thancan_gpt_v2.txt · nhat_gpt_v2.txt · chuongsu_gpt_v2.txt · mama_gpt_v2_a51.txt · mama_gpt_v2_a65.txt (each + .keep).

## Job 6 DONE — mama_gpt_v2_a51 / _a65 = B prompt VERBATIM (owner chose B1/B2)
- Base dev/handover/reports/mama-specs/m05-a51.styleref.r55.prompt.txt (== Magnific prompt of gOmpWytSXO, checked byte-equal via creations_lineage) and m05-a65 (eIPlkhrdqL). Two files because the ages differ in 4 sentences (age, colour depth x2, item + hands).
- Changes: + ChatGPT header (Image 1 = face ref KLpSlnEkqp, Image 2 = her a36 picture BhNUblSoQR = 'the second reference' of the STYLE LOCK; lineage confirms these 2 parents); 'with her hairpins' -> richer senior hairpins (job 2); + caption 'Ma ma · Áo ghi lê hai tà đỏ san hô + váy xanh ngọc' (job 3).
- Peony: B has NO hair flower (its one 'peony' is embroidery). Job 4 vest shoulders NOT added (owner: 'lấy cái prompt đó ... là ok'; the foreman listed jobs 2/3 only). K26: m05 main coral red is not the uniform blue -> no swap.

## Job 1 DONE — thancan_gpt_v2 = test_mama.txt (round 1) + owner L1465 placement
- Header: Image 1 = m18 face s7IPw0Ll8e, Image 2 = round-1 picture 1ldexOWr4r as OUTFIT + COLOUR reference only.
- who: 'A palace ma ma (ma ma, a senior woman of the palace staff)' -> 'A trusted personal palace maid (cung nữ thân cận, the close personal attendant of her mistress)'. Everything else verbatim (age 36 'trẻ trước tuổi', single bun, 'the ma ma costume', 'a palace ma ma's sleeves' are KEPT, because the owner wants the round-1 look).
- Vest: round-1 knot-button collar -> the nhất v2 closed collar sentence ('che kín giống bên Nhất đẳng') + 'only a thin edge of the inner robe's own collar shows just above and inside the vest's standing collar' (her colour at the neck) + LONG vest + job 4 stiffer shoulders.
- Colour (K26: m18 main = powder blue = uniform -> her deep rose #CA7281): 'RECOLOUR the whole costume to her colour powder blue' -> 'RECOLOUR the outer layers to the colour powder blue' + COLOUR PLACEMENT: long vest + two tà + WHOLE sleeves = powder blue; inner robe + skirt = deep rose; cuff border bands = deep rose; sash = deep rose; collar edge = deep rose. The TWO-COLOUR sentence is kept as is (main blue, secondary rose), so the colour orders no longer fight.
- Caption 'Cung nữ thân cận · Áo ghi lê dài xanh + áo trong hồng'.

## Job 6 candidates shown to the owner (history)
| key | picture | creation | prompt | refs (Magnific gpt-2-6 seed 7172) |
|---|---|---|---|---|
| A1 (my pick) | m01 a51, BROWN, two front tà | BhNEMlJoQR (cut Xm9CDwcBfo) | dev/art/owner-copy/mama-night-1119/m01-a51.txt | style 6AbGv6EiJO + face Lw87kgoswO + costume 79fNlPEJAL |
| A2 (my pick) | m01 a65, BROWN, two front tà | JNCZloNOq4 (cut vQA5IiLa47) | dev/art/owner-copy/mama-night-1119/m01-a65.txt | same (a65 face ref = her a51) |
| C | k01 a36 old live ma ma, brown (costume ref, ONE panel) | 79fNlPEJAL | — | upload |
| B1/B2 | m05 a51/a65, deep coral red + teal, two tà (Lượt 694 OK) | gOmpWytSXO / eIPlkhrdqL | mama-specs/m05-aNN.styleref.r55.prompt.txt | KLpSlnEkqp + a36 BhNUblSoQR |
A matches the owner's words (51 + 65, brown, two flaps, old person). Note: A carries "one small fresh peony in deep rose tucked beside the bun" (K15 later banned hair flowers). I'm asking whether to keep it verbatim.

## Job 1 — why thancan_gpt.txt came out completely different (English; for translation)
The round-1 picture is 1ldexOWr4r (m18, prompt test_mama.txt = live_mama.txt, Magnific GPT 2.6, seed 7172, one ref s7IPw0Ll8e).
1. Different engine: round 1 was GPT 2.6 on Magnific with a fixed seed 7172. ChatGPT is another model build with no seed, so it can never copy the picture exactly. The strongest fix is to ATTACH the round-1 picture itself in ChatGPT as Image 2 = "outfit and colour reference".
2. Hair: v1 changed "a neat bun (chignon)" to "neat young palace-maid double-loop buns (never a matron's chignon)". Twin loop buns change the whole silhouette and head. The text also still says "HAIR: ALL her hair is pinned UP in a neat bun", so the two hair sentences fight each other.
3. Age + who: "about 36 … a palace ma ma, a senior woman of the palace staff" became "about 22, youthful adult … a trusted personal palace maid … young". That gives a different, younger face and body type.
4. A new COLOUR PLACEMENT sentence was added, but the old "RECOLOUR the whole costume to her colour powder blue" and TWO-COLOUR sentences stayed. That gives three colour orders. The round-1 picture ALREADY has a blue outer vest + sleeves and a rose inner robe + skirt without that sentence, so it was not needed.
5. "the cung nữ thân cận uniform" replaced "the ma ma costume": ChatGPT does not know this term, so it designs its own uniform.
6. The ChatGPT header says Image 1 is both "the reference image" (take ONLY style + skin, NEVER copy its face) and "the identity reference" (keep ONLY her face). Those two orders contradict each other for one image, so ChatGPT may drop the face or the style. On Magnific the same text worked with the same single ref, so this is a smaller cause.
Plan for v2 (after GO): test_mama.txt VERBATIM + the ChatGPT header (+ Image 2 = round-1 picture as outfit/colour ref) + job 3 caption + job 4 vest shoulders. The only content swap is the who words ("A palace ma ma (ma ma, a senior woman of the palace staff)" → thân cận). No hair, age or colour-placement changes, because the round-1 picture already shows the thân cận colours.

## Job 2 — senior hairpins
Young maids (nhất v1 / nhị test5): "several silver and pearl hairpins". Chưởng sự v1 had "one plain jade hairpin in the bun" (fewer). v2: "with MORE and richer hairpins than a young first-rank maid (nhất đẳng): several gold, jade and pearl hairpins with small dangles set in the bun, all pointing upward or backward, no flowers" (K15 OK). Ma ma gets the same text after GO, on the confirmed base.

## Job 3 — caption (house sentence, 15 uses in dev/art, e.g. dapung4/s62_t2_COMOI_v2.txt; rule G31)
Appended after "No text, no labels." on a new paragraph, like the house files:
`CAPTION: in LARGE bold letters, top-left corner, on the plain background, never over her body, write exactly this Vietnamese text WITH accents: "<rank> · <outfit>"`
- nhất: "Cung nữ nhất đẳng · Áo ghi lê cổ đứng + hai tà"
- chưởng sự: "Chưởng sự cô cô · Áo khoác tím cà dài tới gối + váy hồng"
- thân cận / ma ma: after GO ("Cung nữ thân cận · …", "Ma ma · …")

## Job 4 — vest shoulders (prompts with the over-vest: nhất, thân cận; ma ma only if the confirmed base has the vest. Chưởng sự kiểu D has a coat, no vest)
Added after "worn over the inner robe": ", the over-vest cut from a firmer, lightly stiffened brocade with crisp, slightly structured shoulders that keep a clean straight shoulder line and sit a little away from her shoulders (not soft, never clinging to or hugging the shoulder, never padded or boxy)".
Note: the global sentence "never stiff, flat or board-like" (fabric) is kept. The vest sentence is more specific and should win; if ChatGPT still softens it, the next step would be to scope that global sentence to "the robe and sleeves".

## K26 (owner L1461, via Foreman C 21:20Z) applied to chưởng sự v2: m18 own main powder blue ≈ cung nữ uniform blue → her own SECONDARY deep rose #CA7281 = the large second colour (borders, lining, inner robe + skirt, embroidery tones). nhất v2 already follows K24 (blue main + rose inner). Thân cận/ma ma: checked when written after GO.

## Job 5 — colours (English only; NOT for the owner)
- chuongsu_gpt: MAIN = eggplant purple (tím cà) = the chưởng sự cô cô ROLE UNIFORM colour (K19: "chưởng sự cô cô tím cà (proposal)"). SECONDARY = powder blue #A7BAD2 = the CHARACTER's own main colour (m18 main = powder blue; K19: secondary = the person's own main colour). It happens to be the same blue as the cung nữ uniform, which is why it looks like "the maid colour".
- mama_gpt (v1 = round-1 live_mama): MAIN powder blue #A7BAD2 + SECONDARY deep rose #CA7281 = m18's OWN two colours (builder --twocol, before K19). It is NOT the ma ma uniform: K19 says young ma ma = xanh lam ngọc bích (leaning green), old ma ma = brown tea. Job 6 replaces this base anyway (the brown A1/A2 matches K19 "old brown").

## Files + gates
| file | base | change | keep_check | check_store --scope mama --age a18 |
|---|---|---|---|---|
| gpt/nhat_gpt_v2.txt (8340 c) | gpt/nhat_gpt.txt | + vest shoulders, + caption | PASS (0 allowed) | PASS |
| gpt/chuongsu_gpt_v2.txt (7519 c) | gpt/chuongsu_gpt.txt | hairpin swap, + K26 colour (all 5 "powder blue" → "deep rose", #A7BAD2 → #CA7281), + caption | PASS (5 allowed) | before K26: FAIL S32 "ma ma hai tà" only (same as v1, scope mismatch). After K26: gate CANNOT RUN — dev/art/master_common.py line 124 IndentationError on branch tip (commit feeb9fc, not mine) |
| gpt/thancan_gpt_v2.txt (9034 c) | dev/art/maid7/test_mama.txt | who, vest collar+shoulders, colour placement, header, caption | PASS (3 allowed) | gate broken (master_common.py) |
| gpt/mama_gpt_v2_a51.txt (6959 c) | mama-specs/m05-a51.styleref.r55.prompt.txt | header, hairpins, caption | PASS (1 allowed) | gate broken |
| gpt/mama_gpt_v2_a65.txt (6775 c) | mama-specs/m05-a65.styleref.r55.prompt.txt | header, hairpins, caption | PASS (1 allowed) | gate broken |
keep_check --all: 145 sidecars PASS.
check_store (gate fixed upstream after 8fc3436; `--scope mama --age aNN`):
- nhat_gpt_v2 PASS · thancan_gpt_v2 PASS (a36)
- chuongsu_gpt_v2 FAIL S32 'ma ma hai tà' (pre-existing, chưởng sự has no hai tà) + S01 TWO-COLOUR overlap 59% (kiểu D's own TWO-COLOUR sentence was never the S01 wording; v1 just passed the threshold, and K26 colour words pushed it below). Not changed (A18). Fix if wanted: replace kiểu D's TWO-COLOUR sentence with the S01 text (main eggplant purple, secondary deep rose like #CA7281).
- mama_gpt_v2_a51/a65 FAIL X18 'Semi-realistic … near-3D' + X19 'background completely transparent': both come from the owner-frozen B prompt (Lượt 694); the base itself fails X19. Not changed because the owner chose B verbatim (L1465). For ChatGPT, X19 only means it may draw no background. Foreman/owner decide.
Own Counter word diff (LOST words, base − new): nhat v2: none. chuongsu v2: "one", "hairpin" (hairpin swap) + powder×5, blue×5, #a7bad2×2 (K26 swap) — nothing else. thancan v2: small, by, stand (old knot-button collar), ma x4, senior, woman, staff (who), costume ('whole costume' -> 'outer layers') — nothing else. mama v2 a51/a65: nothing.

## NEW JOB owner L1470 (via Foreman C 21:37Z) — TAM ĐẲNG outer top too flimsy → gpt/tamdang_gpt.txt (7223 c)
- Base dev/art/maid7/test3_tm1.txt (approved tam đẳng, L1352). One swap: "with a SMALL SHORT outer top on top: a short jacket with short outer sleeves that ends just below the waist, clearly smaller and shorter than a nhị đẳng maid's half-sleeve jacket" → "with a SHORT outer jacket on top: a layered half-sleeve brocade jacket (bijia) exactly like a nhị đẳng maid's (test5_nhi wording), the same real outer jacket with the same weight, body and structure (a proper jacket, never thin, flimsy or see-through), only SHORTER than the nhị đẳng's, ending just below the waist". The rest stays verbatim (the "SAME fine silk brocade … as the outer jacket of the higher maids" line, front panel, small embroidery, colours) + ChatGPT header (Image 1 = m18 face s7IPw0Ll8e) + caption "Cung nữ tam đẳng · Áo khoác bỉ giáp ngắn hồng + váy xanh".
- Note: the global fabric boilerplate ("thin, light, flowing silk and gauze") is the same in nhị đẳng and tam đẳng, so the jacket words were the difference. The embroidery sentence still says "edges of the short outer sleeves" (kept, A39).
- keep_check sidecar PASS (3 allowed); --all 146 PASS. Word diff LOST: that, small, sleeves, clearly, short×2, top, ends, smaller — the swap only.
- check_store --scope mama --age a18: FAIL S32 'ma ma hai tà' only (scope mismatch, not a maid sentence). The approved base test3_tm1 fails S32 + S01 (overlap 34%); the new file passes S01.
