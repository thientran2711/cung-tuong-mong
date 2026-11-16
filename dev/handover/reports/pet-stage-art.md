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

## STEP 2 DONE (Foreman C s6 GO, OD 16/11 18:00Z)
All 22 files are on the CDN: `img/pet-stage/pet-<key>.webp` (cdn_sync --check: 22 same). Total 0.5 MB, each <= 40 KB.
Decision C: 15 pets reuse their pet512 cut-out (already 3/4 front / sitting; cropped to the alpha bbox and resized, no new art). 7 redrawn (cho, thienma, kylan, thanhlong, phuong, camke, bachloc) with Magnific gpt-2-6, style ref = the pet's own pet512 grown picture, then images_remove_background. Looked at all 22 on a light background and the redrawn ones also on dark: clean alpha edge, no halo, no rosy layer. Credits step 2: 5 x (40+3) = 215 (total so far 344).
Each file is cropped to the alpha bbox: the bottom edge of the PNG is the feet line; picture height = class height. Fish keep their bowls. Files are stored at 2x display size and never upscaled (hac, sutu, linhmieu are limited by their 512 source). Class heights (CSS px at iPad 1180, where the kit woman body = 542 px; they scale with KIT_FIG body): S 120 (0.22 of body), M 195 (0.36), L 300 (0.55).

| key | class | CSS px tall @ iPad 1180 | file px | KB | source |
|---|---|---|---|---|---|
| meomuop | S | 120 | 157x240 | 12.0 | reuse pet512 |
| meo | S | 120 | 161x240 | 11.2 | reuse pet512 |
| tho | S | 120 | 138x240 | 10.9 | reuse pet512 |
| ngoctho | S | 120 | 155x240 | 11.5 | reuse pet512 |
| hoami | S | 120 | 147x240 | 26.6 | reuse pet512 |
| sao | S | 120 | 110x240 | 11.2 | reuse pet512 |
| vet | S | 120 | 170x240 | 15.2 | reuse pet512 |
| uyenuong | S | 120 | 334x240 | 24.9 | reuse pet512 |
| cavang | S | 120 | 262x240 | 20.7 | reuse pet512 |
| cachep | S | 120 | 257x240 | 16.5 | reuse pet512 |
| lyngu | S | 120 | 250x240 | 18.8 | reuse pet512 |
| cuuvi | S | 120 | 258x240 | 19.6 | reuse pet512 |
| cho | M | 195 | 426x390 | 37.7 | new |
| sutu | M | 195 | 465x385 | 37.2 | reuse pet512 |
| linhmieu | M | 195 | 346x390 | 37.5 | reuse pet512 |
| camke | M | 195 | 214x390 | 30.5 | new |
| phuong | M | 195 | 234x390 | 35.9 | new |
| thienma | L | 300 | 328x450 | 39.9 | new |
| bachloc | L | 300 | 253x450 | 24.7 | new |
| kylan | L | 300 | 353x360 | 38.7 | new |
| hac | L | 300 | 273x465 | 26.7 | reuse pet512 |
| thanhlong | L | 300 | 315x420 | 39.0 | new |

Note: L files are stored at ~1.5x (kylan 353x360, thanhlong 315x420, thienma 328x450) to stay under the 40 KB sprite budget.

## Do large pets cover people? (measured with kit figures)
Kit woman figure (CDN fig-consort c01 a18 / c05 a36): alpha bbox width/height = 0.31-0.36 (core band 35-80 %: 0.27-0.33). On iPad (body 542) that is 169-193 px wide (core 146-180).
Pet widths at class height (CSS px at iPad): S 55-167 (widest uyenuong 167, bowls ~130); M 107-232 (sutu 232, cho 213); L 126-176 (kylan 176, hac 176, thienma 164, thanhlong 157, bachloc 126). Heights: L = 300 px = 0.55 body = her chest/shoulder line; M 195 = waist/hip; S 120 = knee/hip.
1. Standing BESIDE her in its own slot (not overlapping her core): nothing is covered. An L pet is chest-high, so any overlap of her core column hides her skirt/lower body. Rule: a pet slot never overlaps the owner's core band (kitFigBody cl..cr); a pet may overlap only sleeve flare / the gap to the neighbour, by <= 10 % of its own width.
2. Strip width, iPad 1180: 3 people (3 x 0.36 body = 585 px) + 3 widest L pets (3 x 0.325 body = 528 px) = 1113 px (94 % of 1180): fits, but only with NO gutter and no 20 % step-back overlap, so the slot function (kitSlotCx) must count pet width. With M pets like sutu (232 px) it does not fit: 3 x 193 + 3 x 232 = 1275 > 1180, so the common scale-down (or fewer people) applies.
3. Fold portrait (755 wide, 2 people): 2 people + 2 L pets = 2 x (0.36 + 0.325) = 1.37 body; fits 755 px only if body >= ~550 px; the Fold body is smaller than the iPad cap, so pets must scale with the common factor. Pet px = class share x kitFigBody of the owner (never fixed px); drop NPC pets beyond slot capacity first, her own pet last.
(Estimate from file aspect ratios + kit figure bbox, not yet seen in a rendered stage: main's stage-pets worker should screenshot 755x1000 and 1180x820 with 3 people + 3 L pets.)

SẴN SÀNG KIỂM (art only, no code): CDN img/pet-stage/pet-<key>.webp x22.
NEXT: Già pictures (3-species sample first) + Túi kỷ vật.

## GIÀ (old-age) pictures — SAMPLE READY (3 species: S mèo mướp, M chó nhỏ, L hạc)
Sheet: `dev/handover/reports/pet-stage-art/gia-sample-sheet.jpg` (left of each pair = adult stage picture, right = Già). Same animal, same style, greying muzzle / paler faded coat / softer half-lidded eyes, calm planted pose, still dignified. File names planned: `img/pet-stage/pet-<key>-gia.webp` (same cut-out rules and S/M/L heights as the adult stage files; fish keep bowls). Dog re-rolled once (first try had a raised paw and looked too young). Credits: 4 x 40 + 4 x 3 = 172. Remaining 19 species go ahead without waiting.

## GIÀ + TÚI KỶ VẬT — SẴN SÀNG KIỂM (partial: 2 Già missing)
CDN (cdn_sync --check: 44 same): `img/pet-stage/pet-<key>-gia.webp` x20, each <= 40 KB, cut-out, same class heights as the adult stage files (S 120 / M 195 / L 300 CSS px; bottom edge = feet), fish keep bowls. Looked at every one on light + dark: clean alpha, same animal and style, visibly older (greying muzzle/feathers, faded colour, softer eyes, calm pose). Weakest age cue: cavang/cachep/lyngu (fish) and sutu (still golden) — acceptable, say if the owner wants a stronger pass.
Keys DONE (20): tho ngoctho sao vet uyenuong cavang cachep lyngu cuuvi sutu linhmieu camke phuong thienma bachloc kylan thanhlong meomuop cho hac.
Keys MISSING (2): **meo** (Mèo tuyết) and **hoami** (Chim họa mi). The Magnific calls for them were refused by the Claude Code auto-mode classifier ("Destructive or Unwanted Actions": the meo generation, and the background cut of the hoami picture — the hoami Già picture itself is generated, only the cut is missing). I did not work around it. Until they exist, main may fall back to the adult stage picture for these two (or the owner re-approves and I generate them).
Túi kỷ vật: `img/item-tuikyvat.webp` (256x256) + `img/item512/item-tuikyvat.webp` (512x512), transparent, moon-white/pale-gold brocade pouch, gold cloud + peony embroidery, jade bead + knotted tassel, tuft of grey-white fur and one feather in the mouth (replaces item-tuithom in the keepsake use; main wires the key `tuikyvat`). Looked at on light + dark: clean.
Credits this phase: Già 18 gens x 40 + 17 cuts x 3 (+172 earlier) = 771 + 172; túi 2 x 40 + 3 = 83. Total art credits this task ≈ 1,370.

## UPDATE: Già now 22/22
Retry worked (Foreman C s6 asked for one retry): `img/pet-stage/pet-meo-gia.webp` and `img/pet-stage/pet-hoami-gia.webp` are on the CDN (cdn_sync uploaded 2), 11 KB / 26 KB, S class (240 px tall file, 120 CSS px). Looked at on light bg: older (grey-silver coat, half-lidded eyes / faded greyer plumage), same animal and style, clean alpha. All 22 `pet-<key>-gia.webp` + 22 adult `pet-<key>.webp` + túi kỷ vật are on the CDN. Extra credits: 40 + 3 + 3 = 46.
FINAL: pet-stage-art DONE, no code from me. Main wires img/pet-stage/pet-<key>[-gia].webp, size classes S/M/L per this report (K-PET-1 pending kit keeper), item key tuikyvat.
