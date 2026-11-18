# trieu-phuc-sample (W104, Foreman C ROOT-30, 18/11)
PRIORITY #1 CHECK: OD 0 | FIGURE_GATE no rule | main none | review/* none | claims 0 -> NEW (art sample only; the game rule "wrong uniform = offence / over-dressed on a normal day" = FOR MAIN / parking lot).

## 1. History research (OD:L1327, written before any prompt)
Sources: general knowledge of the Ming and Qing dress codes, Joseon and Nguyen court dress (not re-verified online; treat as design inspiration, not citation).
- Ming (1368-1644): the Empress and consorts wore a phoenix crown (phuong quan) with a phoenix-and-pheasant ceremonial robe (dai/di yi) for the great occasions (enthronement, New Year, winter solstice, imperial wedding, sacrifices); the court shawl (xiapei, a long embroidered band hanging from the shoulders to the hem) carried the rank motif. Rank = robe colour and motif (pheasants/birds for lower ranks, phoenix only for the top), number of pheasant rows, richness and the number of ornaments on the crown. A lower-rank consort wore a smaller crown and plainer robe; dressing above rank was an offence.
- Qing (1644-1912): rank by colour (apricot/bright yellow for Empress and Empress Dowager, golden yellow for the next ranks, plainer shades below), dragon or phoenix medallions, number of pearls on the court necklace and crown (pearls/gems by rank), and the chaofu with horse-hoof cuffs and cape collar. NOT used here (owner rule: no Qing cape / feathered hat).
- Joseon (hanbok court dress: jeogui/dang-ui, wonsam, hwarot) and Nguyen (ao nhat binh, ao mang) agree on the same logic: ONE court cut for everyone, rank only by colour, motif and headdress; the great ceremonies (new year, coronation, wedding, ancestor rites, audience) require the full court dress; an informal day in it reads as ostentation, a ceremony without it as disrespect.
Take-away for the game: one uniform cut for all 8 ranks, a long embroidered shawl as the rank carrier, rank shown only by colour, motif/density, headdress.

## 2. Design (ONE uniform system, built into build.py `--trieu N`)
Uniform cut (identical sentence in all 8 prompts): floor-length Han-style crossed-collar (giao linh) robe, wide long sleeves, broad collar-and-cuff band edged with a thin gold line, wide structured belt with a jade pendant set (pei), long embroidered court shawl (xiapei); no Qing cape, no feathered hat. Pose: no held item, hands folded formally (brief option), head up, closed-lip smile.
| rank | colour (hex) | motif / density | headdress |
|---|---|---|---|
| t1 Dap ung | dusk blue #4F6D8F | a few sparse small plum blossoms (silver-white), rest plain | neat bun, flowers, silver-gilt trâm with short dangles |
| t2 Thuong tai | deep teal #3F7C85 | small orchids scattered on shawl/cuffs/band | chignon, flowers, silver-gilt trâm, a few pearls |
| t3 Quy nhan | deep jade green #4C7A55 | lotus flowers and leaves on shawl, cuffs, hem, modest gold thread | layered chignon, gold-and-jade trâm, pearls |
| t4 Tan | royal violet #6A4A8C | peonies + butterflies in gold thread, medium density | high chignon, gold/jade trâm, bu yao tassels, small gold flower crest |
| t5 Phi | deep plum-magenta #8C3F66 | peonies, cranes, clouds, dense | tall chignon, gold-and-jade flower headdress, long dangles |
| t6 Quy phi | imperial crimson #A8322F + small royal-yellow touch (collar-band edge, narrow sash) | peonies, cranes, clouds, dense gold covering much of robe | BIG ornate gold headdress, pearls, many tassels (no phoenix) |
| t7 Hoang quy phi | royal golden yellow #EFBD69 mixed with crimson | phoenixes + peonies + clouds, dense | LARGE gold phoenix crown (one phoenix) |
| t8 Hoang hau | royal golden yellow DOMINANT + crimson | large phoenixes, very dense, whole robe | FULL nine-phoenix crown |
Rules honoured: phoenix only t7/t8; royal yellow only t7/t8 (t6 small touch); stitched embroidery sentence + fabric-drape sentence (FIGURE_GATE C1/C4e); closed-lip smile; nothing covers the face; slim; full hairpins from t1; colours are RANK colours, never her own signature colour (stated in the prompt).
Note: the owner said the cut/colour should read as "na na nhau"; here the cut is identical, colour = a graded ladder (cool dark tones low -> crimson -> imperial yellow). If she wants ONE colour for all ranks (only motif/crown differing), it is a one-word change per rank in TRIEU.

## 3. Job result
- `build.py --trieu N` (N=1..8) added; same structure as the ranks: PRE, identity sentence, AGE_TXT, outfit, COLOUR RULE, embroidery+drape, pose, hairpin rule/closing, END. All other outputs byte-identical: md5 of ~190 prompts (all --low/--t7/--age/--golden/--state variants for c01 c06 c13 c25 c32) before == after (aa4300fb...); `test_low_all.py` OK (2304 builds). `--golden` c06 cmp ok (c16/c20/c25 golden cmp already differed BEFORE my change, not touched).
- SAMPLE: c06 a18, 8 gens, 0 regens (all 8 look right on first look: crossed collar, closed lips, nothing over the face, rank ladder readable). Refs: c06 a18 t1 v0 (uploaded as face-c06-t1.png) + style B kspkwKx16B; gpt-2-6 1024x2304 2k count 1 folder ba4aec..; each cut with images_remove_background (t4 cutout retried once after a service error).
- Files (CDN): https://ctm-img.victoria-tntt.workers.dev/img/_review/trieu-phuc/c06_sheet.jpg (8 in a row, 1400 px, small) and c06_sheet_2x4.jpg (readable, 2x4), c06_a18_trieu_t1..t8.png. No red skull/feet lines (sample for the owner's look; add on request).
- Own critique: t2-t5 embroidery is pink/rose flowers (looks lovely, but reads a bit like her own colour; could be tinted gold-thread only); t7 and t8 differ mainly by density and crown; t7 yellow a touch darker than t8; shawl reads as a plain panel on t1 (intended: lowest rank sparse). Held item dropped on purpose (formal fold).
- NOT done (not asked): game rule (occasion/offence/over-dressed) = FOR MAIN / parking lot (feature freeze); other faces; v1/v2 colours.
~100% of the sample job done / ~0% of the court-uniform feature playable (art sample only).
