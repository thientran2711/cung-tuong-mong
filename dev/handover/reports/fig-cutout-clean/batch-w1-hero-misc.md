# batch w1-hero-misc (hero + misc, 1063 files, 4k) — worker log
START_CTX ~5% of 1M (get_session reads 0; own estimate). Roll over at ~30%, never above 60%.
## Pipeline notes (17/11)
- 4k master from images_generate gpt-2-6 2048x4096 comes back OPAQUE (white bg) now (pilot had alpha). Fix: images_remove_background (3 cr, output 2000x4000 RGBA, good edges) -> curl -> finish_fig.py -> qa_fig -> sheet look. ~83 cr/file.
- Identity ref for a26/a36/a51 = NEW a18 of the look (upload local webp via creations_request_upload + curl PUT + finalize) + old figure of that age + faces 01/05/12/18.
- cdn_sync.py is NOT on the handover branch: take it from origin/main (git show origin/main:dev/site/cdn_sync.py) and run from a dir with dev/site/cdn_sync.py + img/.
- finished files live only in the container scratch (not git-able: image allowlist) -> upload to CDN before rollover.
## Reused pilot a18 (4k, looked at, no train, calm): player-look1..4-t1-a18, emperor-a18-1, emperor-a18-2, physician-p1-a18, official-o1-a18 (pilot-hero/finished/img; hd twin = hd2 folder 2700 -> need fit to 1800 if CDN has hd)
## Done (4k, looked, QA ok) — master Magnific ids (bg-removed)
player-look1-t1-a26 MB7vgfmDCm | look2-t1-a26 O6CGvkIynm | look3-t1-a26 1leOMaLr4r (4 pinholes, accepted like c28) | look4-t1-a26 kspJVvB16B
## Refs (Magnific creations): new a18 look1 3z5VQDQREY look2 9ZFWCyoNYZ look3 bxVUWF05Y2 look4 DoJaSTPpcl; old a26 look1 p8OfSIqehw look2 lJI6XHZgv9 look3 79a2tkLJAL look4 P3unaLr42C
player-look1-t1-a36 8a6HNjlIrU | look2-t1-a36 rgdyeY6xtc | look3-t1-a36 u5YLnOCQLD | look4-t1-a36 4RQYudE9Aa (halo FAIL 3.7-5.4k is the sheer-gauze rim, clean on dark; pinholes 4-5 accepted)
## UPLOADED to CDN (cdn_sync + img/hd + img/hd2 for hero): 16 figures = pilot a18 x8 (player look1-4 a18, emperor a18-1/-2, physician-p1, official-o1) + player look1-4 a26 + a36. hd2 = 2700 tall (hero extra; CDN had none before).
## Refs for a36 old: look1 JNfAvMVOq4 look2 JNfAvDMOq4 look3 dtPEOxuXSL look4 YMsojQzWeC
## Credits so far: 8 x 83 = 664
## TODO (order): player-look*-t1-a51 (4), player-look*-t3-a18 (4, +a26? check list), emperor a26/a36/a51 -1/-2 (6), physician, official, tutor, steward, fallen (remaining), then man, mama, eunuch, kid. Remaining list = shard minus the done above.
## Gesture rotation used: a18 look1 branch, look2 handkerchief, look3 fan, look4 hairpin; a26 teacup/fan/scroll/jade; a36 branch/handkerchief/fan/lantern. Age lines: a26 'about 28', a36 'about 38 poised mature, subtle maturity', a51 'about 53, dignified, silver touches in hair' (not yet used).

## LEAD UPDATES received after my handover (17/11 01:30-01:37Z) — these OVERRIDE my TODO order above; re-read BATCH_BRIEF.md
- 2k ONLY for all new generations (1024x2048, resolution 2k, 65 cr). The 16 files above stay at 4k.
- PRIORITY: ALL a18 files of the shard first (hero first), only then a26, a36, a51 (so the TODO "player a51 first" is obsolete).
- Transparency: use extraSettings transparentBackground=true + "FULLY TRANSPARENT BACKGROUND (real alpha channel...)" prompt, verify alpha extrema; else images_remove_background (+3 cr) fallback.
- hd twin only where the CDN already has it; fig + tn (if exists) + por always.
- Throughput: short prompt <=110 words, 8 generations per message, one creations_wait, one bash per batch (download+alpha+finish+qa+ONE contact sheet), look <=2 images/batch, TSV line per file in this file; target >=40 files/session.
