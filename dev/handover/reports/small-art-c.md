# small-art-c (art worker, Sonnet) — report to Foreman C s7

## JOB 1 — realistic SNOW + FIREFLY (DONE, on CDN, 200 OK)
Painted with Magnific gpt-2-6 (2 tries each, every image looked at on dark AND light). Painted on pure BLACK; alpha = brightness (soft edges and halos kept, OD:L663 method; images_remove_background not used because it hardens soft edges). Webp, 0.5–3 KB each, base https://ctm-img.victoria-tntt.workers.dev/img/fx/
Check sheets (dark + light) are NOT in git (shots rule): worker scratchpad sheet-dark.png / sheet-light.png.

| file | px | use |
|---|---|---|
| snow-real-1.webp, snow-real-2.webp | 96 | NEAR flakes, big soft-focus blur: show 28–40 px, alpha .55–.7, fall fast |
| snow-real-3.webp, snow-real-4.webp | 96 | mid flakes: 14–22 px |
| snow-real-5.webp (88), snow-real-6.webp, snow-real-7.webp (64) | | FAR sharp specks: 6–10 px, alpha .9, fall slow |
| fly-real-1.webp | 96 | big firefly, wide halo: 40–48 px |
| fly-real-2.webp, fly-real-3.webp | 96 | medium: 24–32 px |
| fly-real-4.webp | 96 | small: 16–22 px |

Recommended: SNOW blend normal, white (no tint), ~16–24 at once via kfBudget, random of the 7, gentle sway + rotation ±.3 rad. FIREFLY blend add/screen (halo is alpha-by-brightness, so add looks best), no tint (or 0xd8ff60), alpha .6–1 pulsing 0.6–1.4 Hz with a per-fly phase, slow curved drift (vx ±.2, vy ±.1), 4–8 at once, night/summer only. Wiring = weather-fx3 (jfx.js KF_WX / KIT §68.6). Rejected tries: 4 spare Magnific generations, never uploaded (nothing to delete on CDN).

## JOB 2 — act card art for the new two-way player options
The player options come from jtwoway.js on review/two-way-acts-r1 (TWD n:). Nine titles (the report said 8; "Khuyên Hoàng thượng mưa móc đều khắp" is the ninth). PRIORITY RULE #1: reused 3 existing pictures, painted 6.
Manifest img/ACTS.json `acts` now maps (exact card title → key → img/act-<key>.webp, 384x506 webp like the other act-*-h):

| card title | key | source |
|---|---|---|
| Thăm lúc ốm mệt | mang-chan-thuoc-h | reuse (quilt + gift box, snow) |
| Lạnh nhạt | tiep-dai-lanh-nhat-h | reuse |
| Rỉ tai chuyện trong cung | ban-tan-h | reuse |
| Hòa giải | hoa-giai-h | NEW (two sets of hands joined over tea, peony) |
| Hạ nhục | ha-nhuc-h | NEW (sleeve sweeps cup + gift off the table, crushed flower) |
| Thử lòng | thu-long-h | NEW (folded note offered, jade pendant + hairpin bait) |
| Nương theo | nuong-theo-h | NEW (junior one step behind a gold-and-crimson senior, red corridor) |
| Khuyên Hoàng thượng mưa móc đều khắp | khuyen-mua-mong-h | NEW (dragon sleeve guided toward several doorways, peonies) |
| Khoe quà ngự ban | khoe-qua-h | NEW (silk bolt + jade ruyi on a tray in a yellow decree wrap) |

Style: same close-crop guofeng act look, no faces, pink/crimson/gold; each looked at. Pushed to the CDN (6 images + ACTS.json). The cards' `tw.n` titles must stay exactly as above for kitActKey to find them.
Note: two of the new pictures contain a little Chinese signage/decree text from the model (khuyen-mua-mong-h, khoe-qua-h); small, decorative.

## ROLLOVER
Context is small; no rollover needed.
