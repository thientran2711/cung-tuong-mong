# MAIDP2 — maid GPT prompt fixes (owner Lượt 1456/1457, brief dev/handover/briefs/maid-fix-L1456.md)
depth 1 (limit 8) · START_CTX ≈ 3 % of 1M (get_session used_tokens read 0; own estimate) · 0 credits, NO Magnific gens (only creations_get reads).
Builder: dev/art/maid7/make7_gpt.py (every swap asserted exactly once). v1 files untouched; v2 files sit beside them.

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
Own Counter word diff (LOST words, base − new): nhat v2: none. chuongsu v2: "one", "hairpin" (hairpin swap) + powder×5, blue×5, #a7bad2×2 (K26 swap) — nothing else. keep_check --all: 135 sidecars PASS.
