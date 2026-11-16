# fig-cutout-clean (art worker, Foreman C)
## STEP 0 — transparent generation test (16/11)
- Magnific `gpt-2-6` lists `transparentBackground: true`; no extraSettings. Prompting "fully TRANSPARENT background" via images_generate with the old figure as image reference gave a true RGBA PNG (2048x3072, ~59% alpha 0, no flat backdrop).
- Sample: fig-consort-c05-t5-a18. Left = old CDN webp (373x900), right = new, each on dark + light. Face, pose, outfit kept; edges clean, no dark fringe/halo seen; sleeves opaque enough. File: step0-before-after.jpg.
- Notes: output aspect follows request (2:3 asked; old file is 373x900 = narrower, so keep ratio of the old figure when requesting). Minor ornament drift vs old (headdress/fan details) — acceptable for re-cut, check per image.
- Cost ~65 credits per 2k figure.
