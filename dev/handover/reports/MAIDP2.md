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
## STATUS
- Jobs 2–5 done for nhất + chưởng sự (v2 files below).
- Jobs 1 + 6 (thân cận v2, ma ma v2): candidate PICTURES sent to Foreman C (sheet dev/handover/review-sheets/maid7/MAIDP2_candidates_mama_thancan.jpg, commit 7bec2e5). WAITING FOR GO. No prompt written yet.

## Job 6 — ma ma candidates (19/11, the OLD person)
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
- chưởng sự: "Chưởng sự cô cô · Áo khoác tím cà dài tới gối + váy xanh"
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

## NEW JOB owner L1474 (via Foreman C 21:41Z) — nhất đẳng collar = round 2 → gpt/nhat_gpt_v3.txt (8608 c)
- Round 2 nhất = Lw8auqkswO (prompt test2_nhat.txt, CHANGES.md ROUND 2 "nhất đẳng v2", ledger l.3266); it is the small "Nhất đẳng · THỬ lần 2" picture on m18_maid_ladder_v5_so_sanh.webp.
- FINDING: round 2's collar WORDS are identical to round 5 (test5_nhat, ov6GUhR829), the collar the owner rejected in L1352: "a sleeveless embroidered over-vest with a stand collar closed by a small knot button … worn over a crossed-collar inner robe". The good round-2 collar was a lucky draw, so I wrote it out from the picture. Crop: dev/handover/review-sheets/maid7/MAIDP2_nhat_collar_lan2_vs_lan5.jpg (left lần 2, right lần 5). Lần 2: tall stand collar hugging the neck, one knot button at the throat, vest front edges straight and CLOSE together → only a narrow opening with neat layered crossed inner collars (rose + thin light edge) as a slim V. Lần 5: the edges spread wide below the button → a wide wedge of inner robe shows.
- v3 = nhat_gpt_v2 with ONLY the collar sentence swapped (v2's closed collar → the round-2 description). Vest shoulders, colours and caption kept.
- keep_check sidecar PASS (7 allowed = the v2 closed-collar phrases); --all 147 PASS; check_store PASS. Word diff LOST = only the closed-collar words (no×4, closed, edge, way, V-opening, slit, covers, chest×2, none, shows…).
- thancan_gpt_v2 collar: it uses the nhất **v2** closed collar sentence (no button, closed edge to edge, covers the inner robe) + "only a thin edge of the inner robe's own collar shows just above and inside the vest's standing collar". NOT changed (foreman: only on your say).

## NEW JOBS owner L1475 + L1476 (via Foreman C 21:41–21:42Z) → gpt/thancan_gpt_v3.txt (9319 c), delivered with nhat_gpt_v3
L1475: the round-2 collar goes on thân cận too. L1476: owner's ChatGPT test of thancan_v2 (dev/handover/review-sheets/maid7/owner_L1476/thancan_v2_owner_test.webp) — the cloth is not soft and flowing like round 1.
WHY v2 came out stiff (English; looked at the owner's picture: the vest is a flat, board-like LONG closed coat with straight rigid panels, vs round-1's soft gauzy vest and fluttering tà):
1. My job-4 shoulder words "cut from a firmer, lightly stiffened brocade with crisp, slightly structured shoulders … sit a little away from her shoulders" — ChatGPT applies "stiffened brocade" to the WHOLE vest (one garment), not just the shoulder → the vest goes flat and board-like.
2. "a LONG sleeveless … over-vest" (+ "the long sleeveless over-vest" in COLOUR PLACEMENT) — round 1 never said LONG; together with (1) it reads as a long coat → straight heavy panels to the knee.
3. "closed edge to edge all the way from the collar down to the waist, NO gap, NO V-opening, fully covers" — a sealed, smooth front surface; round 1 had a soft V of inner layers, which breaks up the surface and looks layered and light.
4. The COLOUR PLACEMENT ties the two front panels into the vest ("the vest with its two front panels … blue") → ChatGPT drew one continuous stiff coat instead of separate soft tà.
(The round-1 fabric sentences — "thin, light, flowing silk and gauze … thướt tha", "real weight … never stiff, flat or board-like" — were still in v2 unchanged; they were outvoted by 1–3.)
v3 = thancan_gpt_v2 with ONLY the vest sentence + one word changed:
- collar → the round-2 collar (same words as nhat_gpt_v3), with the inner layers "in her own colour" — her deep rose fits naturally (the round-2 picture shows exactly a rose slim V), so the rose collar edge is kept that way.
- shoulders → "the vest only slightly crisp and neat right AT the shoulder line (not clinging to or hugging the shoulder), while the rest of the vest, its two front panels and the sleeves stay the same soft, thin, light, flowing silk as the rest of the outfit, draping, swaying and trailing softly (thướt tha), never stiff, padded, flat or board-like".
- "LONG" removed (vest sentence + COLOUR PLACEMENT "the long sleeveless over-vest" → "the sleeveless over-vest").
keep_check PASS (12 allowed, all the v2 collar/shoulder/LONG phrases); --all 148 PASS; check_store --scope mama --age a36 PASS. Word diff vs round-1 test_mama: only ma×4, senior, woman, staff (who), costume, closed (old knot-collar "closed by") — all round-1 fabric words present.
NOTE (not changed): nhat_gpt_v3 still carries the job-4 "firmer, lightly stiffened brocade … structured shoulders" sentence; if ChatGPT stiffens nhất the same way, the same soft-shoulder sentence can be swapped in there.

## L1477 + FAMILY FIX (Foreman C 21:43Z)
FAMILY FIX (LUẬT SỬA CẢ NHÓM): the job-4 "firmer, lightly stiffened brocade … structured shoulders" sentence is replaced IN PLACE by the soft-shoulder sentence ("only slightly crisp and neat right AT the shoulder line … the rest of the vest, its two front panels and the sleeves stay the same soft, thin, light, flowing silk … thướt tha, never stiff, padded, flat or board-like") in nhat_gpt_v2.txt (8417 c) and nhat_gpt_v3.txt (8685 c). chuongsu/tamdang/mama never had it. thancan_gpt_v2.txt keeps the old sentence on purpose = the exact text the owner tested in L1476 (superseded by v3). grep "stiffened brocade" in gpt/: only thancan_gpt_v2.
L1477 WHY (owner: "the upper outer garment lost its LAYERS and the graceful flow of the fabric"):
5. COLOUR PLACEMENT "the WHOLE wide sleeves, blue all the way down" — said to colour them, but ChatGPT reads it as ONE solid sleeve (no layers), overriding round-1's "wide layered sleeves hanging softly".
6. "the vest with its two front panels" — merged the separate tà into the vest = one coat (see 4).
(plus 1–3 above: stiffened brocade, LONG, sealed closed front.)
thancan_gpt_v3 (9382 c) now: every round-1 layer/fabric phrase is present verbatim (checked: "wide layered sleeves hanging softly", "a short front layer made of TWO separate long embroidered front panels", "over a layered, softly pleated skirt", "thin, light, flowing silk and gauze", "thướt tha", "never stiff, flat or board-like"); COLOUR PLACEMENT reworded to "the sleeveless over-vest, the TWO separate soft front panels (hai tà) hanging from the waist and the wide LAYERED sleeves (every soft layer of each sleeve, all the way down) are … powder blue" (colours unchanged: all blue; cuffs/sash/inner robe/skirt/collar V = deep rose). Round-2 collar (L1475) + soft shoulder + caption kept.
Word diffs: nhat v1→v2: nothing lost. nhat v2→v3: only the closed-collar words. thân cận round-1→v3: whole ("whole costume"→"outer layers"), closed (old knot collar), ma×4, senior, woman, staff, costume (who). thân cận v2→v3: the v2 collar/stiff-shoulder/LONG words + "whole", "blue" (placement reword).
keep_check: nhat v2 PASS (0), nhat v3 PASS (7), thancan v3 PASS (14); --all 155 PASS. check_store: nhat v2 / nhat v3 / thancan v3 PASS.

## L1478 + L1479 + L1480 (Foreman C 21:44Z) → chuongsu_gpt_v3.txt, mama_gpt_v3_a51.txt, mama_gpt_v3_a65.txt
- chuongsu_gpt_v3 (7659 c) = v2 with ONLY the embroidery clause swapped (L1478 "thêu nhiều quá như phi tần; chỉ tay áo, viền áo, chân váy"): "RICH border embroidery, clearly richer than a first-rank maid's (nhất đẳng) borders, but ONLY on the edges: … collar band, both front-edge borders, wide embroidered cuff bands of the sleeves, coat hem border, skirt hem … ; the coat body, the middle of the sleeves and the middle of the skirt stay PLAIN with NO embroidery in the middle of the cloth (never flower sprays scattered over the body, never like a consort's robe)". Form, hairpins, K26 colours and caption kept. Word diff LOST: and, embroidered, whole, inner, more, denser, plus, front (the body-spray clause only). check_store: S32 only (pre-existing scope mismatch); S01 now PASSES.
- mama_gpt_v3_a51 (7713 c) / _a65 (7529 c) = the CURRENT mama_gpt_v2 files (with Foreman C's L1473 no-near-3D fix, commit 4059168; my builder no longer rebuilds v2) with:
  (L1479) the knot-button collar → the round-2 nhất collar (same words as nhat_gpt_v3);
  (L1480) "wide layered sleeves hanging softly" → "the long robe's own wide long sleeves hanging softly in ONE single layer" ("layered sleeves" invites a second short-sleeve layer) + new sentence after the sleeve sentence: "Exactly two garments: a sleeveless vest over a long robe with long sleeves; NO short-sleeved or half-sleeved layer, no extra jacket." No other half-sleeve/bijia/jacket words were in ma ma (checked); the remaining "layered" = the inner collars and the skirt.
  Word diff LOST: closed (old knot collar) only. check_store: X19 "background completely transparent" only — inherited from v2/B (L1473 fixed X18 only).
- keep_check: chưởng sự v3 PASS (4 allowed), ma ma v3 PASS ×2 (2 allowed); --all 158 PASS.

## L1483 FAMILY CAPTION FIX (Foreman C 21:45Z) — in place
Owner: the tam đẳng ChatGPT caption came out garbled ("váy xaĥh"). All 6 current maid gpt files now end with the rank name ONLY + an exact-spelling clause:
`CAPTION: in LARGE bold letters, top-left corner, on the plain background, never over her body, write exactly this Vietnamese text WITH accents, spelling every Vietnamese letter and accent mark exactly, with no extra or wrong marks: "<rank>"`
tamdang_gpt "Cung nữ tam đẳng" · nhat_gpt_v3 "Cung nữ nhất đẳng" · thancan_gpt_v3 "Cung nữ thân cận" · chuongsu_gpt_v3 "Chưởng sự cô cô" · mama_gpt_v3_a51/_a65 "Ma ma". (Builder: fixcap() + oldcap() allow line in each .keep.)
Word diff vs the previous commit: only the old caption's garment/colour words (e.g. tam đẳng: áo khoác bỉ giáp ngắn hồng váy xanh). keep_check ×6 PASS, --all 158 PASS.
⚠ GATE CHANGED UPSTREAM (B26FAB4 7a472aa "repair #3 … gate code back to proven state" + 1ee9078): nhất v3 + thân cận v3 still PASS, but chưởng sự v3 now FAILS S01 + S32 again, tam đẳng FAILS S01 + S32, and ma ma v3 FAILS C5 E1 M01–M13 NOEAR S19 X18 X19. The PREVIOUS committed versions (before this caption edit) fail exactly the same, so this is the gate change, not the caption edit. Ma ma: the M01–M13 master block, NOEAR etc. are missing because the B r55 base never had them. That is for Foreman C / B26FAB4 to decide.

## L1486 FAMILY COLLAR FIX (Foreman C 21:49Z) — in place
Owner "Vẫn bị": the nhất vest still split into a V below the knot button. My L1474 text literally asked for "a NARROW opening … slim V under the button" — my fault (the round-2 picture's narrow V was the same fault, just smaller). New collar sentence (nhat_gpt_v3, thancan_gpt_v3, mama_gpt_v3_a51/_a65; chưởng sự never had it):
"a sleeveless embroidered over-vest with a TALL upright stand (mandarin) collar that wraps closely around the neck and is fastened at the throat with ONE small knot button; from the button the vest's two front edges MEET EDGE TO EDGE and stay closed all the way down to the waist sash, one smooth closed front like a straight upright standing-collar robe, with NO gap, NO slit, NO V-opening and NO inner robe visible on the chest; the inner robe's collar shows ONLY as a thin line just above the stand collar at the neck, with a band of gold-edged trim down the front, worn over a crossed-collar inner robe" (thân cận: "the inner robe's collar in her own colour shows ONLY as a thin line…"). Closed-front idea = chưởng sự kiểu B "straight upright standing collar" robe.
Word diff vs previous commit: only the slim-V words (narrow, opening, slim, v, side by side, close together, layered crossed collars…). keep_check ×4 PASS, --all 158 PASS; check_store nhất v3 / thân cận v3 PASS (ma ma: same upstream-gate fails as before).
| gpt/chuongsu_gpt_v2.txt (7529 c) | gpt/chuongsu_gpt.txt | hairpin swap, + caption | PASS (1 allowed) | FAIL S32 "ma ma hai tà" only — same as v1 (chưởng sự has no hai tà; scope mismatch, pre-existing) |
Own Counter word diff (LOST words, base − new): nhat v2: none. chuongsu v2: "one", "hairpin" (singular; now "hairpins") — the hairpin swap only. keep_check --all: 135 sidecars PASS.
