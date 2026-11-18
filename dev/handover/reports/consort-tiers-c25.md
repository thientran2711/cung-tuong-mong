# consort-tiers c25 — B10 (W46, 18/11; brief consort-B10.md; base = LIVE img/hd/fig-consort-c25-tN-a18.webp)

## B10 three versions
PRIORITY #1 CHECK: brief dev/handover/briefs/b10-workers/W46.txt + consort-B10.md + W34 handover read; reused c01/c12/c24 B10 method and scripts (consort-b10-tools); no new code. FIGURE_GATE C1, C3, C4a–C4e, D2, D3, D3b re-read before this person.
Rules ticked: [x] one gen per figure, refs = live original + m09 eIyOFEidqL in the STYLE slot, "Copy image 1 EXACTLY … ONLY change the robe colour" [x] original wine-red named explicitly in v0 (m09 leaks pink) [x] no soft/flowing wording [x] feet never mentioned [x] embroidery clause (hand silk-thread, stitched directly into the fabric, not appliqué/raised/sticker) in EVERY prompt; t7/t8 look stitched, flat with cloth [x] t1–t6 no phoenix (live t5 + t6 robe phoenixes replaced by flowers/birds/butterflies in all 3 versions; t1–t4 bamboo motif kept) [x] t7/t8 phoenix = main stitched motif in all 3 versions [x] t7 v1/v2 = own non-yellow colour MAIN (sage-green / periwinkle) + deeper warm golden yellow inner robe/borders/sash; t8 v1 warm golden yellow, v2 muted jade + golden-yellow parts [x] one held item, no cup: t7 live cup -> blossom branch (all versions); t1 branch, t2 handkerchief, t3 lantern, t4 scroll, t5/t6 coin pendant, t8 folded fan unchanged [x] forehead clean ("NO dot/mole"; all 24 faces zoomed, bare) [x] closed-lip smile [x] overlay vs live (alpha IoU).

Row scan (live t1–t8 = one wine-red family with brown-gold bamboo; pins alike with / change / colours v1 | v2):
| rank | pins | change | v1 | v2 |
|---|---|---|---|---|
| t1 | flower + sticks | none | pale celadon | powder blue |
| t2 | like t1 | none | dusty lilac | sage grey-green |
| t3 | flower cluster + dangles | none | misty sky blue | blush-lavender |
| t4 | crown-comb + dangles | none | pale apricot | mint-aqua |
| t5 | gold phoenix-like crown, like t6 | robe phoenix -> flowers/birds | periwinkle | butter-cream |
| t6 | phoenix crown | robe phoenix -> flowers/birds | teal-aqua | lilac-mauve |
| t7 | large phoenix crown | cup -> blossom branch | sage + golden yellow | periwinkle + golden yellow |
| t8 | paired phoenix | none | warm golden yellow | jade + golden yellow |
No same hue between neighbouring ranks within a version.

Gens: 24 + 4 retries (v1 t5 IoU 88.1 -> 93.0 kept best; v1 t2 93.4 -> 97.0; v1 t6 feet touched the canvas edge -> clean; v1 t3 retried 94.4 = same, kept the first with cleaner edges) = 28 gens x 135 = 3780 cr.
Known residual: v1 t5 IoU 93.0 % (best of 2, a wider sleeve spread); v2 t7 94.1 %, v1 t3 94.4 % (just under 95).
Overlay IoU vs live (alpha, uniform scale on bbox height, centred), final set:
    v0 t1 IoU 98.5% w/h live 0.392 new 0.396 edges [9, 0, 0, 0]
    v0 t2 IoU 98.0% w/h live 0.337 new 0.338 edges [4, 2, 1, 0]
    v0 t3 IoU 98.3% w/h live 0.320 new 0.323 edges [11, 1, 2, 0]
    v0 t4 IoU 98.9% w/h live 0.384 new 0.387 edges [9, 0, 0, 0]
    v0 t5 IoU 97.5% w/h live 0.308 new 0.314 edges [126, 3, 1, 0]
    v0 t6 IoU 97.5% w/h live 0.318 new 0.325 edges [5, 2, 1, 0]
    v0 t7 IoU 96.8% w/h live 0.358 new 0.361 edges [119, 3, 0, 0]
    v0 t8 IoU 97.3% w/h live 0.359 new 0.366 edges [11, 1, 1, 0]
    v1 t1 IoU 97.4% w/h live 0.392 new 0.395 edges [13, 0, 1, 0]
    v1 t2 IoU 97.0% w/h live 0.337 new 0.344 edges [16, 2, 0, 0]
    v1 t3 IoU 94.4% w/h live 0.320 new 0.336 edges [10, 5, 0, 0]
    v1 t4 IoU 97.8% w/h live 0.384 new 0.388 edges [94, 0, 0, 0]
    v1 t5 IoU 93.0% w/h live 0.308 new 0.320 edges [89, 3, 0, 0]
    v1 t6 IoU 96.9% w/h live 0.318 new 0.329 edges [0, 1, 0, 0]
    v1 t7 IoU 95.9% w/h live 0.358 new 0.369 edges [4, 3, 1, 0]
    v1 t8 IoU 97.7% w/h live 0.359 new 0.360 edges [50, 1, 0, 0]
    v2 t1 IoU 97.3% w/h live 0.392 new 0.396 edges [9, 3, 1, 0]
    v2 t2 IoU 95.7% w/h live 0.337 new 0.346 edges [2, 2, 1, 0]
    v2 t3 IoU 97.4% w/h live 0.320 new 0.327 edges [31, 2, 0, 0]
    v2 t4 IoU 98.5% w/h live 0.384 new 0.388 edges [145, 0, 0, 0]
    v2 t5 IoU 95.5% w/h live 0.308 new 0.318 edges [199, 2, 0, 0]
    v2 t6 IoU 97.5% w/h live 0.318 new 0.323 edges [3, 1, 1, 0]
    v2 t7 IoU 94.1% w/h live 0.358 new 0.368 edges [35, 6, 1, 0]
    v2 t8 IoU 97.2% w/h live 0.359 new 0.362 edges [55, 4, 0, 0]
Files (md5-verified) https://ctm-img.victoria-tntt.workers.dev/img/_review/consort-tiers/c25/b10/ — c25_a18_tN_v0|v1|v2.png (24) + c25_a18_b10_sheet.jpg. Nothing live.
~100% xong c25 B10 / ~0% chơi được.
