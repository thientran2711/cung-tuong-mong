# consort-tiers c24 — B10 (W46, 18/11; brief consort-B10.md; base = LIVE img/hd/fig-consort-c24-tN-a18.webp)

## B10 three versions
PRIORITY #1 CHECK: brief dev/handover/briefs/b10-workers/W46.txt + consort-B10.md + W34 handover read; reused c01/c12 B10 method and scripts (consort-b10-tools); no new code. FIGURE_GATE C1, C3, C4a–C4e, D2, D3, D3b re-read before this person.
Rules ticked: [x] one gen per figure, refs = live original + m09 eIyOFEidqL in the STYLE slot, "Copy image 1 EXACTLY … ONLY change the robe colour" [x] original colour named explicitly in v0 (m09 leaks pink) [x] no soft/flowing wording [x] feet never mentioned [x] embroidery clause (hand silk-thread, stitched directly into the fabric, not appliqué/raised/sticker) in EVERY prompt; zoomed t7/t8 v0/v1/v2: reads as stitched, flat with the cloth [x] t1–t6 no phoenix (live t5 robe phoenix + t6 phoenix replaced by flowers/birds/butterflies in all 3 versions) [x] t7/t8 phoenix = main stitched motif in all 3 versions [x] t7 v1/v2 = own non-yellow colour MAIN (sage-green / periwinkle) + deeper warm golden yellow only inner robe/borders/sash; t8 v1 warm golden yellow, v2 muted jade + golden-yellow parts [x] one held item, no cup: t6 live cup -> folded fan, t7 live cup -> blossom branch, t5 live branch+pendant -> jade pendant only; t1 branch, t2 handkerchief, t3 lantern, t4 scroll, t8 folded fan unchanged [x] forehead clean ("NO dot/mole" wording; all 24 faces zoomed, bare) [x] closed-lip smile [x] overlay vs live (alpha IoU).

Row scan (live t1–t8 = one coral-red family; pins alike with / change / colours v1 | v2):
| rank | pins | change | v1 | v2 |
|---|---|---|---|---|
| t1 | flower + sticks | none | pale celadon | powder blue |
| t2 | like t1 | none | dusty lilac | sage grey-green |
| t3 | flower cluster + dangles | none | misty sky blue | blush-lavender |
| t4 | crown-comb + dangles | none | pale apricot | mint-aqua |
| t5 | like t6 | no phoenix on robe | periwinkle | butter-cream |
| t6 | phoenix crown | cup -> fan, robe phoenix -> flowers | teal-aqua | lilac-mauve |
| t7 | large phoenix crown | cup -> blossom branch | sage + golden yellow | periwinkle + golden yellow |
| t8 | paired phoenix | none | warm golden yellow | jade + golden yellow |
No same hue between neighbouring ranks within a version.

Gens: 24 + 4 retries (v0 t5 IoU 92.5, v1 t1 93.1, v2 t6 85.7, v2 t7 86.7 -> silhouette clause; one v2 t6/t7 mix-up was only a filename swap, no regen) = 28 gens x 135 = 3780 cr.
Overlay IoU vs live (alpha, uniform scale on bbox height, centred), final set:
    v0 t1 IoU 98.2% w/h live 0.364 new 0.366 edges [17, 3, 0, 0]
    v0 t2 IoU 97.0% w/h live 0.326 new 0.335 edges [8, 2, 0, 0]
    v0 t3 IoU 97.7% w/h live 0.298 new 0.300 edges [15, 1, 1, 0]
    v0 t4 IoU 97.5% w/h live 0.371 new 0.377 edges [36, 1, 1, 0]
    v0 t5 IoU 97.4% w/h live 0.330 new 0.335 edges [8, 1, 0, 0]
    v0 t6 IoU 95.6% w/h live 0.338 new 0.345 edges [11, 127, 1, 0]
    v0 t7 IoU 95.2% w/h live 0.342 new 0.347 edges [5, 2, 0, 0]
    v0 t8 IoU 98.2% w/h live 0.356 new 0.357 edges [18, 1, 1, 0]
    v1 t1 IoU 98.8% w/h live 0.364 new 0.367 edges [11, 2, 0, 0]
    v1 t2 IoU 96.4% w/h live 0.326 new 0.332 edges [11, 137, 1, 0]
    v1 t3 IoU 96.4% w/h live 0.298 new 0.304 edges [23, 5, 0, 0]
    v1 t4 IoU 96.4% w/h live 0.371 new 0.380 edges [6, 1, 1, 0]
    v1 t5 IoU 96.3% w/h live 0.330 new 0.339 edges [10, 2, 0, 0]
    v1 t6 IoU 96.0% w/h live 0.338 new 0.343 edges [31, 159, 1, 0]
    v1 t7 IoU 94.3% w/h live 0.342 new 0.352 edges [22, 214, 1, 0]
    v1 t8 IoU 97.9% w/h live 0.356 new 0.360 edges [75, 0, 1, 0]
    v2 t1 IoU 95.9% w/h live 0.364 new 0.374 edges [33, 61, 0, 0]
    v2 t2 IoU 96.9% w/h live 0.326 new 0.328 edges [13, 3, 1, 0]
    v2 t3 IoU 96.3% w/h live 0.298 new 0.306 edges [2, 2, 1, 0]
    v2 t4 IoU 98.0% w/h live 0.371 new 0.373 edges [11, 0, 0, 0]
    v2 t5 IoU 96.7% w/h live 0.330 new 0.337 edges [7, 1, 1, 0]
    v2 t6 IoU 95.6% w/h live 0.338 new 0.344 edges [11, 5, 0, 0]
    v2 t7 IoU 95.7% w/h live 0.342 new 0.352 edges [29, 2, 1, 0]
    v2 t8 IoU 96.4% w/h live 0.356 new 0.359 edges [24, 1, 1, 0]
All >= 94.3 % (lowest v1 t7 94.3 %, v2 t7 95.7 %; phoenix-sleeve spread).
Files (md5-verified) https://ctm-img.victoria-tntt.workers.dev/img/_review/consort-tiers/c24/b10/ — c24_a18_tN_v0|v1|v2.png (24) + c24_a18_b10_sheet.jpg. Nothing live.
~100% xong c24 B10 / ~0% chơi được.
