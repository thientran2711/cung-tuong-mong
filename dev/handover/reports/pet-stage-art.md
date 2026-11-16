# pet-stage-art — report (art worker, branch review/pet-stage-art)

## STEP 1: SAMPLE READY (3 samples, S/M/L)
Sheet: `dev/handover/reports/pet-stage-art/sample-sheet.jpg` (top = light bg, bottom = dark bg; drawn at the relative class sizes, feet on one line).
- S = Mèo mướp (sitting, 3/4 front) · M = Chó nhỏ lông xù (standing, 3/4 front) · L = Thiên mã (standing calm, 3/4 front, no rearing).
- Gen: Magnific gpt-2-6, folder ba4aecfe…, style ref = the pet's own pet512 grown picture (pets_gens.txt ids), then images_remove_background. 1024x1024 transparent PNG, looked at on light and dark: clean alpha edge, no halo, no rosy layer.
- Credits: 3 x 40 (gen) + 3 x 3 (cut) = 129.

## FINDINGS the coordinator must know (LUẬT ƯU TIÊN SỐ 1)
1. `img/pet512/pet-<key>.webp` (all 22 grown) are ALREADY transparent cut-outs (RGBA, fish already in their bowls). Existing stage use needs no new cut-out for pets already posed 3/4 front/sitting: meomuop, meo, tho, ngoctho, linhmieu(sit), cuuvi, vet, sao, hoami, sutu, hac, cavang, cachep, lyngu, uyenuong, bachloc (profile standing).
2. Pets whose pet512 pose is PROFILE / action (not calm 3/4 front): cho (trotting), thienma (rearing), kylan (rearing), thanhlong (coiling), phuong, camke, bachloc (side). The new stage art is therefore needed mainly for these; the rest can be redrawn only if the owner wants a uniform pose. Proposal for step 2: redraw those 7 + any the owner rejects from reuse; or all 22 if she insists. Awaiting verdict.
3. No pet size classes exist in KIT.md yet (grep: none). Proposed classes below; main/kit keeper must register them (KIT REQUEST: "pet size classes S/M/L").

## Proposed size classes (height as share of the kit adult-woman body height; iPad 1180 stage woman body = 542 px)
| class | share of woman body | px @ iPad (542) | pets |
|---|---|---|---|
| S | 0.22 | ~120 | meomuop, meo, tho, ngoctho, hoami, sao, vet, uyenuong, cavang, cachep, lyngu, cuuvi |
| M | 0.36 | ~195 | cho, sutu, linhmieu, camke, phuong |
| L | 0.55 | ~300 | thienma, bachloc, kylan, hac, thanhlong |
(final table with measured heights after step 2.)

## Large pets vs people (preliminary)
Large pet at 0.55 of a woman body is chest height; footprint ~220 px wide on iPad (aspect ~0.73) vs a woman core ~190 px. As long as the pet has its OWN slot beside its owner (not in front), it does not cover her body; with 3 people + 3 pets the strip needs ~(3x190 + 3x220) = 1230 px worst case > 1180 stage → large pets of 3 people at once would overlap neighbours; the slot function must count pet widths or limit L pets. Full measurement with kit figure bboxes in step 2.

STATUS: waiting for owner verdict via Foreman C.
