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
