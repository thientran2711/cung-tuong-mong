# OLD4: the 4 old 8-rank sets (m07, m29 from Lượt 412/414 shown Lượt 436; m13, m20 from Lượt 487): tone, colours, prompt diff
START_CTX ≈3 % of 1M (estimate; get_session read 0) · depth 3 (limit 8) · worker of Foreman C ROOT-68 (session_01PEhRbv5MJBsBwzuyDQxpDD)
Steps 1–3 done at **0 cr**. Step 4 (t3 redraw) is on HOLD until ROOT-68 answers (see §4).

## Sources (which prompts made these pictures)
- m07: ledger rows 1413–1420 (Lượt 412 v3 face redo), prompts `dev/art/store-all/test/m07_t*.prompt.txt` @ **e08411c1**
- m29: ledger rows 1421–1428 (Lượt 414 noM09 v3), `m29_noM09_t*.prompt.txt` @ **1e8b90b3**
- m13 / m20: ledger rows 1682–1697 (Lượt 487 TN2), `m13_t*/m20_t*.prompt.txt` @ **58040d37** (= b2ce67a6 + t1 own-picture only)
- CURRENT = `python3 dev/art/store-all/build_all.py <p> <t>` @ 452a5b4 (all 32 build; check_store t3 PASS ×4)
- Copies: `dev/handover/reports/old4/<p>_t3_OLD_used.prompt.txt` and `<p>_t3_CURRENT_builder.prompt.txt`; measurement `old4/measure.py` → `old4/measure_clusters.json`

## 1. TONE (CIELAB, k-means on the outfit pixels of each sheet panel; bands = P6 four_season86_a32_soft: main C* 30–42 target, floor 24, cap 46; c06 CŨ model #CF816E L62 C36)
| person | t1–t6 main colour measured | C* | verdict |
|---|---|---|---|
| m07 Công chúa | sage-greige #C2BAA2 (L76, hue 95 = yellow-grey, not jade) | 8–15 | very soft / greyed, BELOW the P6 floor; t7/t8 royal yellow C*43–46 ok |
| m29 Đoan trang | grey-celadon #BFBCAF (L76) | 7–11 | the greyest of the 4, below the floor; B19 "no grey" would flag the silver |
| m13 Kho | lilac #AE8DA4 (L62) + slate-teal #50636B | 15–18 / 9 | soft medium, nearest the band; = the B18 TARGET picture family |
| m20 Dịu dàng | grey-lavender #9C96A5 (L63) + coral rose #D09395 | 9–11 / 25 | main greyed; secondary at band |
All four are SOFTER / GREYER than the current P6 band (C* 24–46). They are "tông trầm dịu", never rực — that softness is what the owner likes.

## 2. COLOURS vs the approved root pair (P6 = palettes_season_deep.json; m07/m13 are non-consorts → palettes_season_nonconsort.json)
| person | root pair (builder uses) | picture | match? |
|---|---|---|---|
| m07 | pale jade #A9D1BD + rose-red #C76B77 | greige-sage + WHITE | **NO** (ΔE2000 main 16.7; secondary white, not rose-red) |
| m29 | pale celadon #AFD4BC + deep rose #CA7281 | grey-celadon + white/SILVER | **NO** (ΔE 15.1; secondary silver/white, not deep rose) |
| m13 | lilac #C3A1CE + deep teal #468E91 | lilac #AE8DA4 + slate-teal #50636B | **family YES**, tone greyer (ΔE 9.3 / 18.8) |
| m20 | P6 periwinkle #8B93D0 (builder still has old #8E95C2) + apricot #D6A585 | grey-lavender + CORAL ROSE | **NO** (ΔE 14.5; secondary coral rose, not apricot) |
WHY: the old prompts carried wrong/greyed hexes and the pictures obeyed them exactly: m07 "pale jade green like **#C7B9A1**" (a beige-grey, C*14) + "white #E8D2BF"; m29 "pale celadon like **#E9D8C7**" (cream) + "silver **#C7B8A2**"; m20 "slate blue like **#A79E9C**" (grey, C*4) + "warm coral rose" (no hex); m13 "lilac like **#CBAAB0**" (pinkish lilac, C*13). Measured picture colours sit right on those hexes.

## 3. PROMPT DIFF old → current builder (same in every rank unless said)
1. STYLE block: old "Semi-realistic painterly guofeng, near-3D realistic" → new master block "Soft painted guofeng game illustration… NOT a photo, NOT 3D", 7-heads body, neutral white daylight, legs/feet, mouth-closed law, bare earlobes (F15), exactly one item, no forehead mark.
2. COLOURS: hex → the root pair (see §2); secondary changes: m07 white→**rose-red**, m29 silver→**deep rose**, m20 coral rose/gold→**apricot**, m13 silver→deep teal (word only). COLOUR RULE sentence: "ONE medium tone level like the coral-red/brick-red robes, medium saturation" → "clear, soft, gentle medium-light, like fine silk in soft daylight". t7/t8: "fresh, clear and luminous" → B14 sentence + THREE-COLOUR RULE (royal yellow #EFBD69 + main + secondary).
3. PHI BẠCH: m07/m29 old = shawl in white / pale silver; m13/m20 old = secondary colour; new = "very sheer, highly translucent gauze in <secondary>".
4. FACE words: rewritten per person (m13 "soft oval, almond eyes" → "slim V-shaped face, PHOENIX eyes clearly upturned"; m07, m29, m20 longer detailed versions of the same face). The old line "Eyes … never slanted or upturned" is gone.
5. HAIR: old "her own hairstyle exactly as in her reference" → new "her own hair COLOUR, loose…; do NOT copy her HAIRSTYLE". Hair flowers: old "LARGE blooms / clusters" (t6 "big lush cluster") → **exactly ONE** flower (F13), medium → largest by rank.
6. OUTFIT: **t1, t2, t4–t8 outfit words UNCHANGED** (only the secondary-colour word, and "earrings" removed at t5/t6, m07 t6 "3→2"). **Only t3 changed**: old "fine silk robe with wide embroidered <motif> bands, waistband with jade pendants, sheer shawl" → G15 option B (square neckline, stiff brocade girdle, apron panel, jade-plaque pendant sets).
7. FABRIC: new sentences "thin, light, flowing silk and gauze… real weight"; t6+ "thick gold-embroidered brocade" (B12); "no sheer scarf unless the outfit names one".
8. POSE/ITEM/ANGLE: all new rotated poses/items/angles (e.g. m13 t3 scroll → book; m29 t3 sachet → flute).
DRIFT the owner may not want: the colour softness she loves came from greyed hexes that the builder no longer uses; any redraw now gets clearer root colours and, for m07/m29/m20, a DIFFERENT secondary colour.

## 4. t3 Quý nhân redraw — HOLD
Rule G15 (owner Lượt 559) = option B v2, commit **fe9c7daa** (BW3 job 2). Current t3 prompts PASS check_store (m07/m29/m13/m20). 0 gens so far. Waiting for ROOT-68: redraw with the current colours (root pair, new secondary) or keep each person's OLD colours (needs a foreman slot change, B6).

## 5. Redraw (owner A + all 8 ranks via ROOT-68; then m07/m13 cancelled; then STOP by ROOT-69 for the owner)
- Prompts: `dev/art/rank8-old4/<p>_tN.txt` = build_all @64b798f6 (ANG14), all 32 check_store PASS. m20 rebuilt after G17 (t1/t2 square neckline), PASS.
- **m29 t1–t8 DONE**: 8 gens (6AbFJeJiJO BhNPVrToQR 4RFEwch9Aa bxM0EOE5Y2 DoOwcvYpcl p8y70uxehw kseMqUH16B jUodk9yLD0) + 8 cut-outs = 1 104 cr. Sheet `dev/art/rank8-old4/m29_8bac_sheet.jpg`, cut-outs `dev/art/rank8-old4/cut/m29_tN_cut.png`. Looked at full size: OK. m29 t1/t2 were drawn BEFORE G17 → crossed collar (not square).
- **m20 STOPPED at t4**: t1 5jDT5v0Kxe, t2 If3NIDRtvE, t3 EbYzQB5uuO, t4 gOmIUxkSXO = 540 cr (raw `dev/art/rank8-old4/raw/m20_t1..t4.png`). No cut-outs, no sheet. t5–t8 not drawn.
- m07 / m13: 0 gens.
- TOTAL OLD4 spend: 1 644 cr. Balance read 77 457 (account shared with other workers).
- STATUS: idle, waiting for ROOT-69.
- **m29 t7 redraw** (owner via ROOT-69: eyes looked crossed): builder t7 is the same as what was drawn, plus one owner sentence "EYES (owner): both eyes level…", check_store PASS; gen If36aN1tvE, 135 cr. Sheet `dev/art/rank8-old4/m29_t7_OLD_NEW.jpg`. Looked: eyes level, both looking straight at the viewer, same face. OLD4 total: 1 779 cr.
