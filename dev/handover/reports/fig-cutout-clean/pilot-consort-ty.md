# PILOT consort-ty (ty3 a18) — 16/11 ~23:45Z (art worker, family pilot)
START_CTX ~0% of 1M (get_session reads 0). Not uploaded to the CDN. No batch started; WAITING for the lead's GO.

## Files (10, all generated once, no retries) — 650 credits (65 each, gpt-2-6, 1024x2048, 2k)
Refs per file: [old CDN figure, face-consort-01, 05, 12, 18]. Prompt = recipe in FAMILY_BRIEF (STYLE_ANCHOR prefix + redraw line + HANDS/POSE line + HUADIAN line + transparent-background line). Nothing changed in the prompt; only the gesture differs per figure.
| file | gesture | old pose | new pose | QA (qa_fig --kind fig --old) |
|---|---|---|---|---|
| c01 | folded fan | eyes closed, hands joined | frontal, eyes open, fan + relaxed hand | WARN huadian auto only |
| c02 | flower branch | BACK-TURNED | frontal/angled calm | FAIL = 4 hair pinholes (stray strands, not visible at 3x dark/light); huadian 0.102 WARN |
| c05 | silk handkerchief + hand at collar | angled, hands joined | frontal | WARN huadian auto only |
| c08 | rolled scroll | BACK-TURNED | frontal/angled | WARN huadian auto only |
| c11 | hand lifting the wide sleeve | angled | frontal | PASS |
| c14 | small lantern | BACK-TURNED, hand at collar | frontal | WARN huadian auto only |
| c20 | teacup (both hands) | BACK-TURNED | frontal | WARN huadian auto only |
| c26 | jade pendant between two fingers | BACK-TURNED | frontal | WARN halo 1658/10k (clean at 3x on dark+light) |
| c28 | fingertips at the hairpin | angled | frontal | PASS |
| c32 | hand on forearm + folded fan | BACK-TURNED | frontal | WARN huadian auto only |
Height: figure = old height exactly (fit_fig), canvas 374-419 x 900 (L/R never touch), por 384x506 matched to old por (match 0.98-1.0). Edge px = 0 everywhere.

## LOOKED at all 10 on light (all) and dark (c02, c26) at native crop
- All back-turned looks (c02,c08,c14,c20,c26,c32) are now frontal/angled, face toward the viewer, calm. Same hair, hairpin, outfit colour/embroidery as old.
- Huadian: tiny flower/butterfly/petal mark on every face, none is a teardrop/dot (the auto ratio 0.14-0.36 reads hairpins/lips, ignore).
- Hands: 5 fingers, left/right right, lively (fan, branch, handkerchief, scroll, sleeve, lantern, teacup, jade, hairpin). Free hand is relaxed with fingers shown (elegant, slightly "dangling" on c01/c02/c08/c14/c26 — an open relaxed hand, fine).
- Shoes visible on all; skin matches the praised faces; everyone beautiful, soft round-almond eyes, no slanted/teary look.
- Hard cases: none. Possible nit for the owner: c11 gesture is subtle (sleeve lift); the old c01 had eyes closed/shy — new is eyes open smiling (follows the "face toward viewer" rule).
## Notes for the batch
- The CDN has NO hd/ and NO tn/ twin for ty3 consort files (404), so finish_fig writes only fig + por. The hd/1800 views in the sheets were made with fit_fig --H 1800 for viewing; the whole-set plan says "hd for all" -> lead decides whether to also publish hd+tn (cost 0, same master).
- 4 pinholes on c02 hair (qa FAIL): cosmetic; for the batch relax the pinhole check for hair or run a 1px alpha close.
- Masters (4k-ish 3.5 MB PNG each) are scratch only; Magnific creation ids are kept in my session (re-fetch on request).
- Time: ~10 min wall for 10 files in parallel.

## Contact sheets (pilot-consort-ty/): <cNN>-ty3-a18-{light,dark}.jpg = old fig (900 upscaled to 1800 only for the side-by-side) | new fig fitted at 1800 | new face+bust crop at NATIVE master resolution.
