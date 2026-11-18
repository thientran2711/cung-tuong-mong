# kc2k-K1 — painter K1, JOB A c01–c16 (2K transparent re-make of live khuê các + nhà nghèo a18)
PRIORITY #1 CHECK: brief kc-ngheo-2k + root32-orders K1 + FIGURE_GATE A0/H read; claims: own. START_CTX ~8 %.
METHOD: refs = exactly two (live cNN kc/ngheo image + m09 eIyOFEidqL), gpt-2-6, 1024x2304 2k, `extraSettings {"transparentBackground": true}` (works; images_models_settings says none but images_models_list lists it). Prompt: "same figure/face/outfit/colours/hair/pose; only item swap per FIGURE_GATE H; forehead bare; closed-lip smile". c01 was done earlier with the cut-out fallback (images_remove_background) — same two refs.
CDN: https://ctm-img.victoria-tntt.workers.dev/img/_review/kc2k/ (cNN_a18_kc_2k.png, cNN_a18_ngheo_2k.png, sheet_cNN.jpg = old|new kc, old|new ngheo)
| person | kc item | ngheo item | note |
|---|---|---|---|
| c01 | painted fan (kept) | hemp-thread skein (was a book) | forehead bare; cut-out fallback |
| c02 | embroidered handkerchief (kept) | plain cloth bundle (was a book) | forehead mark removed |
| c03 | round silk fan (kept) | basket, wild flowers (kept, roses→wild) | |
| c04 | round silk fan (kept) | bunch of herbs (was a flower basket; neighbours differ from c03) | forehead mark removed |
| c05 | round silk fan (kept) | basket, wild flowers (kept) | forehead mark removed |
| c06 | teacup→painted folding fan | jade charm→wooden spindle with spun thread | forehead marks removed |
| c07 | teacup+saucer→thread-bound book | jade pendant→plum-blossom branch | |
| c08 | teacup→peony sprig | jade charm→bamboo-leaf fan | |
| c09 | folding fan (kept) | jade pendant→small basket of mulberry leaves | |
| c10 | small cup-like object→embroidery hoop with half-finished flower | jade pendant→wooden comb in plain cloth | forehead mark removed |
| c11 | fan + handkerchief (kept) | jade pendant→clay pot of orchid sprout | |
| c12 | teacup→plum-blossom sprig | jade pendant→herbs bunch tied with straw | |
NOTE: figures c09–c12 (live art) wear necklaces/gold hairpins as part of their outfit — not held items, left unchanged per "same figure, item swap only"; foreman may want to rule on it for nhà nghèo.
Gens: c09–c12 8 transparent gens, all looked at. c05–c08 8 transparent gens (looked at all 8, c06 ngheo zoomed: spindle, not jade). c01 2 (+2 cut-outs), c02–c04 6 transparent gens (+6 earlier one-ref gens dropped, wasted). ~135 credits each.
All looked at (grey backdrop): same figures, correct items, bare foreheads, alpha 0..254 verified.

## c13–c16 + c01 regen (18/11 ~22:50Z, after ROOT-33 GO; refs = live cNN + m09 eIyOFEidqL = 2 images per owner 22:55Z rule)
| person | kc item | ngheo item |
|---|---|---|
| c01 | painted fan (kept), REGEN transparent at gen (replaces the cut-out version) | hemp-thread skein (regen transparent) |
| c13 | blossom sprig (kept) | silk lantern→skein of hemp thread (lantern is a khuê các item) |
| c14 | teacup→bamboo flute | jade charm→plain cloth bundle |
| c15 | jade bead string→small silk-lined flower basket | books→small basket of mulberry leaves |
| c16 | lotus bud→peony sprig (lotus not on list) | bamboo-woven round fan (kept) |
All 10 gens transparent at generation, 1024x2304 alpha verified, all looked at, foreheads bare.
Total gens this worker: 42 (8 dropped one-ref + 2 c01 cut-out versions replaced). Sheets: sheet_c01..c16.jpg on CDN img/_review/kc2k/.
OPEN: nhà nghèo jewellery (necklaces/gold pins in live art c09–c12) — with the owner via ROOT-33.
## HANDOVER K1 (ctx ~35 %, 18/11 ~22:55Z): JOB A c01–c16 COMPLETE (32 figures, all pushed to CDN). Nothing pending except owner rulings (style ref m09 kept per 22:55Z, jewellery). If the owner asks a re-make, method = images_generate gpt-2-6, 1024x2304 2k, extraSettings {"transparentBackground": true}, refs [live image, m09 eIyOFEidqL], prompt text per row above; upload with `CLOUDFLARE_API_TOKEN=proxy-injected python3 dev/site/cdn_sync.py img/_review/kc2k` (from a tree with dev/site/cdn_sync.py + manifest_guard.py and img/_review/kc2k/ files).
