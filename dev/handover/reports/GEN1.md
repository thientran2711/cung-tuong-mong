# GEN1 report — 4 maid ranks, Magnific gens (owner L1512, 20/11)
Engine: gpt-2-6, seed 7172, 1024x2304, 2k, ONE ref = m18 face s7IPw0Ll8e. One try each, no redraw (A20). Prompts used exactly as files, only the first "[ChatGPT: …]" header line + blank line dropped (tam, nhất, chưởng sự; nhị file has none).
Cost: simulate_cost 135 credits each = 540 total (actual 4 x 135 = 540).

## Gate A19
First run with default scope tp8 showed many fails; Foreman C #11 corrected to `--scope mama --age a18`. Result with that scope: nhất v3 PASS; tam, nhị, chưởng sự FAIL only S01 (two-colour rule) + S32 (ma ma two-panel), pre-existing scope mismatches, accepted by Foreman C #11 (GO). (X10 'short jacket' only under tp8; tam đẳng short jacket is owner-ordered L1470.)

## Creations
| rank | file | creation | webUrl |
|---|---|---|---|
| Tam đẳng | tamdang_gpt.txt | aFGdKgifSh | https://www.magnific.com/app/creation/aFGdKgifSh |
| Nhị đẳng | test5_nhi.txt | gOm5NnCSXO | https://www.magnific.com/app/creation/gOm5NnCSXO |
| Nhất đẳng | nhat_gpt_v3.txt | N2qSYXL6D9 | https://www.magnific.com/app/creation/N2qSYXL6D9 |
| Chưởng sự | chuongsu_gpt_v3.txt | hu2pbShvqL | https://www.magnific.com/app/creation/hu2pbShvqL |
Files: dev/art/maid7/gen_L1512/{tam,nhi,nhat,chuongsu}.webp, sheet: sheet_L1512.webp

## Faults seen (notes only, no redraw)
- Tam: matches brief (blue skirt + inner robe, rose short jacket over a sash, comb box). Caption wraps to 2 lines; one hairpin dangles into the caption zone at the left of the head. Skin/face fine, mouth closed.
- Nhị: no caption (prompt has none). Jacket reads as a layered double-sleeve top; skirt carries scattered flower sprays on the lower part (more embroidery than the text's "borders" wording). Letter envelope is rose, close to the jacket colour (low contrast item).
- Nhất: caption wraps to 2 lines, hairpin near caption. Closed collar and two front panels look right, vest + panels rose, sleeves + skirt blue. Handkerchief is cream with pink, fine.
- Chưởng sự: caption sits tight to the top edge and the lettering is crowded against it; hairpin dangles near it. Purple coat + rose inner robe correct, rich borders only on edges (body plain), keys ring held in both hands. Sleeves wide, hem not trailing.
No obvious teeth/hand faults at 1024 preview; I did not check at full 2304 size.

# TEST L1528 — m02 t8 cloak7 FRONTAL (1 gen)
Prompt dev/art/dong_hientai/m02_t8_DONG_HIENTAI_cloak7_FRONTAL_test.txt, used exactly. gpt-2-6 1024x2304 2k seed 7172, refs image1 m02 face BhNCmskoQR, image2 yellow swatch TdwDfOyVNR. 135 credits.
Gate (scope tp8 age a18 + refs): FAIL exactly B12/W03/S07/S16/S19/S24/S34 = same as base m02_t8 cloak7, nothing new.
Creation 1ldEZphr4r  https://www.magnific.com/app/creation/1ldEZphr4r
Files: dev/art/dong_hientai/test_L1528/m02_t8_cloak7_FRONTAL_1ldEZphr4r.webp, sheet_L1528.webp
Earlier m02 t8 3/4 picture: NOT found (no creation id for m02 cloak5/6 t8 in gen_ledger; the owner_L1488 cloak5/6 hoanghau jpgs are the s62 ones as far as I can tell). So the sheet is 2 panels: [m02 FRONTAL test] | [cloak6_t8_hoanghau_L1498 s62].
Faults (preview 1024, notes only): body, shoulders and face are squarely frontal as ordered. Neat slim cloak, fur band wide but smooth, not puffy. Head is nearly straight, only a very slight incline. Ball is held at chest in both hands, not mid-step/one-handed as the pose text says. Hem and fur flare out in a small puddle on the floor at the bottom corners. Sleeves reach the floor. Blue panels with phoenix borders good; yellow dominant.

# TEST L1528b — s62 t8 cloak7 FRONTAL (1 gen)
Prompt dev/art/dong_hientai/s62_t8_DONG_HIENTAI_cloak7_FRONTAL_test.txt exactly (includes its CAPTION line). gpt-2-6 1024x2304 2k seed 7172. Refs: image1 = nVsrRMPYQD (s62 face ref, the one in gen_ledger for all her t4–t8 gens), image2 = TdwDfOyVNR. 135 cr.
Gate (tp8 a18 refs): FAIL B12/S37/W03/S07/S16/S19/S24/S34 — identical to the base s62_t8 cloak7 run the same way (S37 also fails on the base for s62), nothing new.
Creation lJtbWb2gv9  https://www.magnific.com/app/creation/lJtbWb2gv9
Files: test_L1528/s62_t8_cloak7_FRONTAL_lJtbWb2gv9.webp, sheet_L1528b.webp = [m02 FRONTAL 1ldEZphr4r] | [s62 FRONTAL], equal size.
Faults (1024 preview): frontal as ordered; slim cloak, smooth fur band. Caption is long and wraps to 5 lines in the top-left and touches the crown/pendants area on the right of the text. Hands hold the hairpin at waist in both hands, head only slightly inclined. Mint inner robe visible, yellow dominant; sleeves reach the floor. Hem fur flares slightly at the bottom corners like the m02 test.

# JOB L1536 — HH bell test, GPT 2.5 low (rule A43/A44)
Engine: gpt-2-mini, quality low (extraSettings {"quality":"low"}; without it the same call simulates 40 cr), 1k, aspect 9:16 (752x1344), seed 7172, refs image1 nVsrRMPYQD (s62 face) + image2 TdwDfOyVNR. simulate_cost 15 cr exact each. Total 30 cr.
First try of open9 (old file, 10080 chars) refused by Magnific: "prompt must not be greater than 10000 characters. Received 10030"; not trimmed, reported to C #12; fixed file (C #12, 9d95780) then accepted as is.
| picture | prompt | creation | webUrl |
|---|---|---|---|
| Hoàng hậu Hán (open9) | dev/art/seasons4/s62_t8_HAN_BAC_open9.txt | Lw8HVO8swO | https://www.magnific.com/app/creation/Lw8HVO8swO |
| Hoàng hậu Thu (v9) | dev/art/thu_comoi/s62_t8_THU_COMOI_v9.txt | 9ZHgmnpNYZ | https://www.magnific.com/app/creation/9ZHgmnpNYZ |
Sheet: dev/handover/review-sheets/hh_bell_L1536/sheet.webp (labels, model+cr under each, Tổng: 30 cr ON the image per A44); singles han.webp, thu.webp.
Faults (1024 preview, notes only): Hán — caption wraps to 5 lines top-left, near the crown; robe is wide at the bottom (flares out at the hem, not slim/close as the prompt says); skirt hem slightly pooled at floor corners; spiral quju not clearly visible. Thu — caption 3 lines, fine; sleeves very wide and the robe flares bell-like toward the hem despite "slim, hanging close, never bell-wide"; hairpin held up in right hand OK; mint panel + yellow borders clear.

# JOB L1542 — maid drafts, GPT 2.5 low (A43/A44)
gpt-2-mini, quality low (extraSettings), 1k 9:16 (752x1344), seed 7172, ref s7IPw0Ll8e only. 15 cr each exact, total 75 cr. Prompts exactly as files (first "[ChatGPT: …]" line dropped), dev/art/maid7/gpt/.
| picture | prompt | creation |
|---|---|---|
| Tam đẳng thân cận | tamdang_thancan_gpt | kseCcK016B |
| Nhị đẳng thân cận | nhi_thancan_gpt | bxMvnbO5Y2 |
| Nhất đẳng thân cận | nhat_thancan_gpt | 3zK7u34REY |
| Chưởng sự | chuongsu_gpt_v4 | rgXuVjFxtc |
| Ma ma a51 | mama_gpt_v5_a51 | 3zK7Q2NREY |
Webs: https://www.magnific.com/app/creation/<id>. Files + sheet: dev/handover/review-sheets/maid_L1542/ (sheet.jpg, new_*.webp). Ma ma came out with a transparent background (the prompt asks for it); I put white behind it on the sheet.
Look: colours are flipped as asked (rose skirt + blue jacket/vest). Square collar is clear on tam/nhi (flat band + V of inner collar); on nhất it reads more like a V/sailor opening than a true square; chưởng sự and ma ma show a squarish opening. Tam's blue jacket is a little long (to hip) and blue sash not as obvious; nhị has no two short flaps clearly, and its half-sleeve is one layer (good); nhất has two long panels but the extra short top panel is hard to see. Chưởng sự: purple + rose clear, keys held. Ma ma: coral/teal, silver hair, abacus in hands, 3/4 turn.

# JOB L1545 — model test, open9 same prompt (owner OK 95 cr)
Prompt dev/art/seasons4/s62_t8_HAN_BAC_open9.txt exactly (10027 chars file, unchanged since L1536), refs nVsrRMPYQD + TdwDfOyVNR, seed 7172, 1k 9:16 (752x1344). simulate_cost exact: (a) 40, (b) 55 as expected.
(a) gpt-2-mini quality medium = bxMvciV5Y2, 40 cr  https://www.magnific.com/app/creation/bxMvciV5Y2
(b) gpt-2-6 quality low = SyhK8ToUb8, 55 cr  https://www.magnific.com/app/creation/SyhK8ToUb8
Base for the sheet: L1536 Lw8HVO8swO (GPT 2.5 low 15 cr, already drawn). Total new 95 cr.
Sheet: dev/handover/review-sheets/model_test_L1545/sheet.jpg (+ a_mini_medium.webp, b_26_low.webp).
Look (honest): Base 2.5 low: V collar open but modest, quju spiral NOT visible, plain straight gown. (a) 2.5 medium: richer all-over phoenix embroidery, V collar a little wider, still NO visible spiral wrap (straight gown), hem flares to the floor. (b) 2.6 low: collar widest, pulled down toward the shoulders with a cloud collar + pearl fringe on them; diagonal broad bands wrap across the body several times = the khúc cư spiral is clearly visible (best match); holds a teal ball/casket at the chest; hem still flares and slightly trails.

# JOB L1547 — phoenix A/B (GPT 2.5 low, garment close-up, no face ref)
Prompts dev/art/phoenix_test/s62_thu_phoenix_A.txt / _B.txt exactly (1020 / 998 chars). gpt-2-mini quality low (extraSettings), 1k 1:1 (1024x1024), seed 7172, no refs. simulate exact 15 cr each, total 30 cr.
A (outer = robe plum) = w4a1mt97EI  https://www.magnific.com/app/creation/w4a1mt97EI
B (outer = blush pink) = 5jDaT0bKxe  https://www.magnific.com/app/creation/5jDaT0bKxe
Sheet: dev/handover/review-sheets/phoenix_L1547/sheet.jpg (+ phoenix_A.webp, phoenix_B.webp).
Look: A — outer wing feathers are plum with gold outlines and darker plum edges, but the body/neck/tail read mostly blush pink, so the bird is only partly "same as robe"; it blends with the robe in the wings and shows by the gold outlines + pink body. Caption mis-spelt: "màu áo chinh" (missing accent on chính). B — outer feathers clearly blush pink, inner wing coverts plum, bird stands out strongly from the plum robe; tail eyes deep plum; cleanest reading of the idea; caption correct "màu phụ".

# JOB L1548 — drafts now gpt-2-6 quality LOW 1k (A43 changed), 5 gens
gpt-2-6, quality low via extraSettings, 1k 9:16 (752x1344), seed 7172. simulate_cost exact 55 each, total 275 cr. Phoenix A/B L1547 was already done on 2.5 low (kept, not redone).
Sheet 1 (HH): s62_t8_HAN_BAC_open11.txt (9996 chars, accepted), refs nVsrRMPYQD + TdwDfOyVNR → open11 = fHzXAiZCDY https://www.magnific.com/app/creation/fHzXAiZCDY. Sheet dev/handover/review-sheets/hh_L1548/sheet.jpg = [open9 SyhK8ToUb8 (L1545, đã vẽ)] | [open11]; 'Tổng mới: 55 cr'.
Sheet 2 (maids), ref s7IPw0Ll8e, prompts exactly from dev/art/maid7/gpt/ (ChatGPT header dropped): tam thân cận v2 = u5W8nBFQLD, nhị thân cận v2 = Xm9WPYfBfo, nhất thân cận v2 = lJtbIOzgv9, nhất đẳng v5 = 0eURSXITfW. Sheet dev/handover/review-sheets/maid_L1548/sheet.jpg; 'Tổng mới: 220 cr'.
Look (viewed the maid sheet once, open11 once at 1024): 
- open11: collar IS wide and off the shoulders (bare collarbones); khúc cư diagonal spiral bands clearly visible several turns; walking pose with casket at the side; fur/cloud collar with long fringe on shoulders. Not a real 3/4: body is only slightly turned, face almost frontal. Hem still wide and flares, sleeves hang to floor.
- Tam thân cận v2: ONE extra layer clear (rose open over-vest over a blue short jacket with a clear square collar band + knot button); colours flipped as asked; comb box held.
- Nhị thân cận v2: square collar clear, blue jacket with ONE half-sleeve layer, rose open vest over it; the two short flaps are barely visible; envelope is blue (low contrast with jacket).
- Nhất thân cận v2: square collar on the blue vest, rose cropped open bolero on top, two long blue panels + a clearly visible short rose tà ngắn on top = two panel layers clear; sleeves rose, skirt rose.
- Nhất đẳng v5 (thường): standing collar, rose vest, long rose panels + short blue tà ngắn clearly visible in front of them; blue skirt/sleeves.

# JOB L1554 — xuân Hán t1–t3 drafts (gpt-2-6 low 1k, A43)
gpt-2-6, quality low via extraSettings, 1k 9:16 (752x1344), seed 7172, ONE ref nVsrRMPYQD (s62 face; these prompts have no image-2 swatch). simulate_cost exact 55 each, total 165 cr. Prompts exactly: dev/art/seasons4/s62_t1_HAN_BAC.txt (9341 ch), _t2 (9592), _t3 (9746).
| pic | creation | link |
|---|---|---|
| Xuân Hán t1 (Đáp ứng) | yiuLx9bPW9 | https://www.magnific.com/app/creation/yiuLx9bPW9 |
| Xuân Hán t2 (Thường tại) | fHzXeFtCDY | https://www.magnific.com/app/creation/fHzXeFtCDY |
| Xuân Hán t3 (Quý nhân) | yiuLxikPW9 | https://www.magnific.com/app/creation/yiuLxikPW9 |
Sheet: dev/handover/review-sheets/xuan_han_t13_L1564/sheet.jpg (+ xuan_han_t1/t2/t3.webp); per-picture label 'Xuân Hán tN · s62 · GPT 2.6 low 1k · 55 cr' + 'Tổng: 165 cr' ON the sheet. I viewed each picture once at 1024; did not view the finished sheet.
Look:
- t1: very wide open collar, off both shoulders, bare collarbones; plain narrow ivory collar band; embroidery = many SMALL lilac+ivory sprays all over, a wider lilac/white flower band at the hem; peach-pink robe + ivory inner robe, ivory sash with long ends, both colours clear; one small lilac in the hair; loose long hair; book held at side; mid-step, sleeves flowing, cuffs ivory.
- t2: wide open collar off the shoulders with two stacked narrow bands (ivory piping + small flower band); body embroidery = fewer but LARGER tiger lilies (ivory/gold) scattered, more than t1 in size, sparser in count; peach pink + ivory clear; ONE peach-orange lily in hair, medium; jade disc on sash; blue pellet drum raised in one hand; skirt flares wide at the hem.
- t3: widest/deepest open collar (low V, shoulders bare) with a WIDE embroidered rose band; densest embroidery = medium ivory-gold China roses over the whole robe, plus wide rose bands at sleeve ends/hem; peach pink + ivory clear; one big ivory rose in hair; jade plaques + pearl strings + green tassels hang each side of the girdle; bamboo flute at waist, other hand at hairpin; clear 3/4 turn to the right.

# JOB L1573 — xuân Hán t1–t3 v2 drafts (gpt-2-6 low 1k, owner pre-approved)
gpt-2-6, quality low (extraSettings), 1k 9:16 (752x1344), seed 7172, ref nVsrRMPYQD only. simulate exact 55 each, total 165 cr. Prompts exactly: dev/art/seasons4/s62_t{1,2,3}_HAN_BAC_v2.txt (9463 / 9711 / 9983 ch).
| pic | creation | link |
|---|---|---|
| Xuân Hán t1 v2 | gOm5jQwSXO | https://www.magnific.com/app/creation/gOm5jQwSXO |
| Xuân Hán t2 v2 | rgXu5vFxtc | https://www.magnific.com/app/creation/rgXu5vFxtc |
| Xuân Hán t3 v2 | DoOG0RNpcl | https://www.magnific.com/app/creation/DoOG0RNpcl |
Sheet dev/handover/review-sheets/xuan_han_t13_v2_L1573/sheet.jpg (+ xuan_han_tN_v2.webp); labels 'Xuân Hán tN v2 · s62 · GPT 2.6 low 1k · 55 cr' + 'Tổng: 165 cr' on the sheet. Viewed each picture once at 1024, not the finished sheet.
Look:
- t1: collar edges rest ON the shoulder points, shoulders covered (not off-shoulder), a soft V crossing high; ivory inner robe with its own neat crossed collar visible just inside; dense small lilac sprays all over + lilac hem band, ivory cuffs; one small lilac in hair; book held; mid-step.
- t2: collar on the shoulder points, shoulders covered; ivory inner collar with a small flower band visible and neat; fewer, larger ivory tiger lilies over the robe (sparser than t1, bigger flowers); one peach-orange flower in hair; drum raised; hem flares.
- t3: collar band is WIDE, rose-embroidered, and sits right at/just over the tops of the shoulders (close to a boat/off-shoulder line, not clearly covered); ivory inner robe visible and neat; medium China roses densely over the whole robe + wide rose bands at sleeves/hem; girdle with jade plaques/pearls/tassels; hair: ONE slim pin with a pearl dangle by the hand + the rose, hair mostly loose; NO spiky crown of pins.

# JOB L1576 — FINAL thu t1–t6 s62 (GPT 2.6, 1024x2304, 2k, seed 7172)
gpt-2-6, width 1024 x height 2304, resolution 2k, NO quality override (same as earlier finals), seed 7172. simulate_cost exact 135 each (as expected), total 810 cr. Ref image 1 = nVsrRMPYQD (s62 face). t6's prompt names "image 2" as the royal-yellow colour swatch, so t6 also got image 2 = TdwDfOyVNR (as in the earlier t6/t8 gens); t1–t5 prompts have no image 2, so ONE ref. Prompts exactly: t1 dapung4/s62_t1_COMOI_v2d, t2 dapung4/s62_t2_COMOI_v2d, t3 dapung4/s62_t3_COMOI_v2e, t4 thu_comoi/s62_t4_THU_COMOIc, t5 thu_comoi/s62_t5_THU_COMOIc, t6 thu_comoi/s62_t6_THU_COMOId.
| pic | creation | link |
|---|---|---|
| Thu t1 Đáp ứng | iG5w9iB3uK | https://www.magnific.com/app/creation/iG5w9iB3uK |
| Thu t2 Thường tại | xSBQkx1jfW | https://www.magnific.com/app/creation/xSBQkx1jfW |
| Thu t3 Quý nhân | gOm5sZ5SXO | https://www.magnific.com/app/creation/gOm5sZ5SXO |
| Thu t4 Tần | SyhKlGwUb8 | https://www.magnific.com/app/creation/SyhKlGwUb8 |
| Thu t5 Phi | 6AbU9EpiJO | https://www.magnific.com/app/creation/6AbU9EpiJO |
| Thu t6 Quý phi | bxMvHW65Y2 | https://www.magnific.com/app/creation/bxMvHW65Y2 |
Files + sheet: dev/handover/review-sheets/thu_final_t16_L1576/ (sheet.jpg 2x3 with 'Thu tN · s62 · GPT 2.6 final 1024x2304 · 135 cr' per picture and 'Tổng: 810 cr'; thu_tN_s62_final.webp full size). I viewed each picture once at 1024-preview, not the finished sheet.
Look:
- t1: light plum open outer garment over a blush tube top with a straight square neckline (plain blush band); blush chest-high skirt + broad ribbon; many small lilac sprays all over + lilac hem band; sheer blush shawl wraps arms; one small lilac in hair; loose hair; book held at side; mid-step.
- t2: same layered neckline with a narrow flower-edge band; fewer, larger peach-pink tiger lilies on the plum robe; sheer blush shawl; ONE peach tiger lily in hair; green pellet drum raised; skirt flares. Caption wraps to 5 lines.
- t3: 3/4 right; blush tube top with a wide rose-embroidered square band; blush APRON panel with roses and gold edge down the front; jade pendants with pearls and tassels each side; dense pink roses over the plum robe; ONE big rose in hair + one slim pin with pearl dangles at the raised hand (no spiky crown); bamboo flute at the waist; hair mostly loose.
- t4: 3/4 left; round capelet over the shoulders with an airy pearl/jade bead net over the whole capelet and a jade clasp, scalloped lower edge; large gold lotus embroidery on sleeves/hem + lotus in the high bun (large); square blush inner top; white-jade vase with blossoms held upright; hair up with gold pins.
- t5: frontal; TWO layered short capes with pearl-edge rows and a pearl net, pearl fringe; big pink hollyhock in a high bun with a gold headdress and long gold tassels; folded gold-flecked letter in both hands; double-hollyhock medallions on the skirt front; two jade pendants on a gold girdle. Dangling gold tassels hang beside the ears (could read as earrings).
- t6: slight turn left; ONE-tier scalloped cloud collar with gold tassel fringe; clearly visible yellow: a yellow-orange inner panel + sash + narrow borders (a bit orange-gold, not quite honey); plum/blush rest; large chrysanthemum in hair + big gold headdress with tassels (again dangling tassels at the ears); jade-and-pearl ball with jade tassel; pearl strands across the chest.
