# PROGRESS review/fxkit — KIT §68 painted-fx (shared painted effects kit)
Base: origin/main d51a393e. Worker for coordinator s7. Owner rule 15/11 20:55Z + 21:00Z (OWNER_DECISIONS, docs branch): effects painted with Magnific.

## State (WIP, pushed early because of the account move)
- `dev/build/jfxkit.js` (assembled right after jfx.js): API kitFxSprite(name,o), kitFxBurst(name,at,n,o), kitFxLight(name,target,o) → {stop},
  kitFxSheet(name,target,o) → {stop}, kitFxPreload([names]), kitFxClear(). Registries KFK_SP (16 sprite kinds), KFK_LIGHT (5), KFK_SHEET (empty yet).
  Pooled Pixi sprites (KFK.pool), lights = <video> WebM+MP4 with mix-blend-mode:screen; low-end → 6x4 WebP sheet; reduced motion → poster still.
- `dev/build/jfx.js`: code-drawn Pixi Graphics textures REMOVED (glow, petal, leaf, star, coin, streak, blob, lantern); every KF_SPAWN kind now uses
  painted kinds (kfSp → kfkSp, kinds loaded first via KF_KINDS); sprites pooled (kfkFree); gold/warm flash → painted glow-gold light.
- `dev/build/jitev.js`: its 6 KF_SPAWN kinds (embers, ashfall, scraps, dust, drops, splash) → painted kinds.
- Art: img/fx/*.webp|mp4|webm on the CDN (python3 dev/site/cdn_sync.py img/fx). cdn_sync.py now knows mp4/webm types.
- Sources: dev/fxwork/gens.txt (all Magnific ids), slice.py (sheets → atlas strips; needs raw/ + cut/ downloads), light.sh (clip encoder).
- Test: dev/test/fxkit.js (written, NOT yet run). sw-serve.js knows mp4/webm.

## Next steps
1. Silk + thread SHEETS: video_remove_background ids ov9zslf829 (silk, from SytFYYaUb8) and w4hqMp97EI (thread, from LwBCAz4swO; use only
   0.5–2.6 s: snap + whip, later frames curl into ugly loops). Download webm (alpha), frames → WebP sheet (sheet.sh to write), add to KFK_SHEET.
2. Run test: `CTM_IMG_BASE= python3 dev/build/assemble.py`; `node dev/test/sw-serve.js <port> /home/user/wt/fxkit dev=/home/user/wt/fxkit/dev &`;
   `nice -n 19 node dev/test/fxkit.js http://localhost:<port>/ /home/user/wt/fxkit/dev/fxwork/out shots` (img/fx must exist locally:
   `python3 dev/site/cdn_sync.py --pull 'img/fx/*'`).
3. KIT.md §68 section + registry table; kit sample already in jfxkit.js (KIT_SAMPLES §68).
4. Build site (dev/site/build_site.sh), screenshots 755x1000@2, 1180x820, 844x390.
5. Remaining code-drawn stand-ins outside jfx (report, maybe replace): jitev .kievflame (CSS gradient burn front), j93 .kmlight-f / .kmsweep,
   j90 .kpod-beam, night-end .kne-* gradients (review/night-end) → can use kitFxLight candle/lantern-red/moonlight.
