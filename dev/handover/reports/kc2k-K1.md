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

## K4 — NEW drawings c13 + c16, khuê các + nhà nghèo (18/11 ~23:50Z; brief kc-new-c13-c16)
PRIORITY #1 CHECK: brief kc-new-c13-c16 (owner ~23:40Z: "Vẽ lại 4 người này, 4 người mới hoàn toàn, theo luật prompt hiện tại") | FIGURE_GATE A0/REFERENCES/C7/D.3/H + consort-B10 re-read before each person | main none | claims: K1 archived.
PROMPT: `build.py c13|c16 v0 --state kc|ngheo --spec5pose` pasted UNCHANGED; ONLY diff = the held item in the Pose sentence (replaces the builder's embroidery hoop / handkerchief):
| figure | builder item | new item (FIGURE_GATE H) |
|---|---|---|
| c13 kc | embroidery hoop with half-finished flower | painted paper folding fan (kc #2) |
| c16 kc | embroidery hoop with half-finished flower | small woven flower basket lined with silk (kc #6) |
| c13 ngheo | embroidered handkerchief | small woven bamboo basket with a few wild flowers (ngheo #1) |
| c16 ngheo | embroidered handkerchief | plain bamboo-leaf fan (ngheo #9) |
REFS (2, A0 non-royal): (1) her own t1 a18 figure (img/hd/fig-consort-cNN-t1-a18.webp, uploaded as face-cNN-t1.webp) = face only; (2) style m09 eIyOFEidqL. No live kc/ngheo image, no --nostyle.
GEN: gpt-2-6, 1024x2304, 2k, count 1, folder ba4aecfe…, extraSettings transparentBackground true. Gens: 4 (1 each, none regenerated). c13 kc came back with a baked smoky backdrop (alpha 6..252) → cut out with images_remove_background (alpha 0..255); the other 3 had real alpha at gen (0..254).
LOOKED AT all 4: nhà nghèo reads poor (cotton jacket, linen apron, wooden/simple pins, no gold/jade/necklace) but neat and pretty; khuê các refined home wear, jade bracelet + small pearl earrings only, no gold; closed-lip smile no teeth; bare forehead; item below chin, face clear; items contrast with robes; frontal/three-quarter.
CDN: https://ctm-img.victoria-tntt.workers.dev/img/_review/kc2k/ — cNN_a18_kc_new.png, cNN_a18_ngheo_new.png (c13, c16), sheet_c13_new.jpg, sheet_c16_new.jpg (old 2K | new kc, old 2K | new ngheo).
K4 HANDOVER: done; nothing pending.
