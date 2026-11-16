# PILOT consort-rest (a18) — 10 files, repainted whole-figure, NOT on CDN
## v2 = 4K (lead order 16/11 23:19Z, owner: never low resolution) — SUPERSEDES the 2k table below
Same prompts/refs, gpt-2-6 at 2048x4096, resolution 4k, 80 cr each = 800 cr (plus 650 cr for the superseded 2k round = 1450 cr total). 4k masters -> finish_fig.py (fig 900 + hd 1800 where CDN has hd) + extra 2700-tall hd2 copy for sheets (not uploaded). Sheets (replaced, 2k set deleted) show old | new hd2 2700 | face+bust crop at NATIVE 4k pixels.
4k QA: PASS c18-t5 (all clean). Pinhole-only FAIL (hair strands / crown beads): c10 27, c24 6, c30 6, c07 8, c03 4. Halo WARN c12 2260, c30 2128, c24 1632 (looked clean on dark). Edge 0 everywhere, height +-2 %. Looked at all 10 faces at native 4k (forehead crops): every huadian is a tiny flower/butterfly/leaf, no teardrop; faces beautiful, soft round-almond warm eyes. 2k notes now fixed in 4k: c18 fan is FOLDED, c22 butterfly huadian small, c15 ear glow gone (prompt: no haze around the head). c12 old skirt hole gone, c24 shoes visible, c10 train+crown inside canvas, c22/c30 eyes open.
## v1 (2k) record below
START_CTX ~6% of window (own estimate). Rollover at START+25%, never above 60%.
Recipe = FAMILY_BRIEF (gpt-2-6, 1024x2048, 2k, refs [old fig, face 01/05/12/18], 65 cr each) -> finish_fig.py -> qa_fig.py. Credits: 10 x 65 = 650. No retries needed. No CDN upload.
Sheets: pilot-consort-rest/<key>-a18-{light,dark}.jpg = old fig | new (hd 1800 where CDN has hd = c12,c15,c16,c18,c22,c24,c30; fig 900 for c03,c07,c10 which have no hd twin) | face+bust native master crop (1024-px master, no downscale).
| file | gesture (new, lively) | QA auto | by-eye |
|---|---|---|---|
| c12-tm0 | copper teapot in one hand, other hand lifting sleeve | WARN huadian-auto only | OK; tiny pink flower huadian; shoes visible; old figure had a hole in the skirt (fixed) |
| c10-t8 (wide train) | flower sprig at chest, other hand lifting sleeve | pinholes 23 (crown tassel beads), huadian 0.119 | OK; train+crown fully inside; tiny gold flower huadian |
| c24-tm1 (no shoes) | plum branch raised, other hand on forearm | pinholes 4, halo 2024/10k WARN | OK; SHOES NOW VISIBLE (embroidered); tiny flower huadian |
| c03-kc | round fan low, other hand fingertip at hairpin | pinholes 9 (hair strands) | OK; small pink flower huadian |
| c07-ngheo | book held, fingertips on cover | pinholes 12, halo 1802 WARN | OK; tiny butterfly huadian; neat, not poor |
| c15-t1 | fingertip at flower hairpin, plum twig low | pinholes 4 | OK; 5 fingers; faint soft glow beside the right ear on the dark crop (minor, check) |
| c18-t5 | fan lifted, other hand lifting sleeve | WARN huadian-auto only | OK; fan came OPEN (asked folded) — acceptable |
| c22-tcold | teacup, other hand lifting sleeve; eyes now OPEN (old was eyes-down) | WARN huadian-auto only | OK; butterfly huadian slightly larger/more ornate than 1/12 — watch |
| c30-t8 | scroll, other hand lifting sleeve; eyes open (old closed) | pinholes 6 | OK; crown+tassels clean (old had ragged crown/tassel edges); tiny huadian |
| c16-tm3 | keys on ring + abacus | WARN huadian-auto only | OK; red butterfly huadian tiny |
Edge: 0 canvas contact on all (fit_fig keeps old height +-2 %). Pinhole FAIL flags are only hair-strand/tassel-bead gaps (same as urgent5 c28/m47 accepted); no teardrop on any forehead (looked at every crop). All faces beautiful, skin matches praised faces, nobody back-turned, hands 5 fingers, left/right right, shoes visible on all.
Prompt changes vs brief: none besides per-figure gesture line; c24 added "visible embroidered silk shoes below the hem"; c10 "whole train inside the canvas"; c22/c30 "eyes open, gently looking at viewer" (old figures had eyes closed/down).
Finished files are in scratch only (regenerable from the same prompts); waiting for the lead's GO.
