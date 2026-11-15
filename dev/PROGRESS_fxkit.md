# PROGRESS review/fxkit — KIT §68 painted-fx (shared painted effects kit)
Base: origin/main d51a393e. Worker for coordinator s7. Owner rules 15/11 20:55Z, 21:00Z (painted effects), 22:35Z (perf budget), 22:45Z (painted
animations for all events). Spec + registry: dev/kit/KIT.md §68. Code: dev/build/jfxkit.js (assembled right after jfx.js).

## Done
- API: kitFxBurst, kitFxSprite, kitFxLight, kitFxSheet, kitFxEdge, kitFxObj, kitFxGift, kitFxLetter, kitFxPreload, kitFxClear (KIT.md §68.1).
- Art (all Magnific; ids in dev/fxwork/gens.txt; files on the CDN img/fx/, 58 files, 1.57 MB incl. both video formats):
  24 sprite atlases (petals ×4 seasons + gold, osmanthus, leaf, snow, ash, paper, coin, ink, brush, lantern, spark, ember, orb, streak, smoke,
  incense, glowburst, lotuslight, jade, gift ×4, letter ×4) · 6 light loops (candle, glow-gold, moonlight, lantern-red, divine, fireworks; WebM +
  MP4 + 6×4 sheet + poster) · 2 true-alpha sheets (silk, thread) · 3 edge overlays ×2 orientations (blood, poison, ink).
- Code-drawn effects REPLACED (before → after):
  | where | before (code-drawn) | after (painted) |
  |---|---|---|
  | jfx kfTex | Pixi Graphics: glow circle, petal ellipse, leaf bezier, star polygon, coin circles, streak ellipse, blob circles, lantern rects | removed; atlases (orb, seasonal petals, leaf, spark, coin, streak, ink/smoke, lantern) |
  | jfx KF_SPAWN (13 kinds) | tinted code shapes | painted kinds (no tint except neutral orb/streak/smoke) |
  | jitev KF_SPAWN (embers, ashfall, scraps, dust, drops, splash) | tinted glow/petal/blob shapes | ember, ash, paper, smoke, ink, orb |
  | jfx kfFlash red (.kfx-red inset box-shadow) | flat red vignette | painted ink-blood edge (kitFxEdge blood) |
  | jfx kfFlash gold / warm (.kfx-gold / .kfx-warm CSS gradients) | CSS radial gradient + box-shadow | painted glowburst sprite (CSS removed) |
  | jfx festival night | code lantern shapes | painted sky lanterns + fireworks clip (kitFx "festival") |
  Kept (colour grading, not objects): kfFlash dark / night washes.
- New kitFx moments: hit = brush streak + shake; harm/expose = blood edge; poison = poison edge; rumour; seal; romance; betray (thread);
  death = silk + incense; demote = jade + ash; promote = + gold-leaf petals; decree = + gold dust; preg = lotus light; festival; letter.
- Perf (owner 22:35Z): on demand (assets.json group 'fx' — jload skips it, sw.js caches by content once played); pool + KFK_CAP; ticker paused
  when hidden; Thiết lập "Hiệu ứng: Đầy đủ / Gọn" (j74 kitToggle, OPT.fxon, OPT.fxpick) + auto-Gọn (weak device / slow frames, OPT.fxauto).
- cdn_sync.py + test server know mp4/webm. Site rebuilt.

## Tests (dev/test/fxkit.js, local build, 4 loaded CPUs, swiftshader)
PASS at 755x1000@2, 1000x755, 1180x820, 1366x1024, 844x390@3 + reduced motion: 24/24 kinds load, 50 bursts → 0 left, 2nd round of 50 makes 0–2
new sprites (pool), heap 18.9 → 19.0 MB after 50 bursts (+gc), every kitFx kind runs, 6 lights play with screen blend, low-end sheet works,
edges / gift / letter / sheets clean up, auto-Gọn on slow frames, 0 page errors, 0 overflow, 0 404. Frame time under 50 bursts (swiftshader on an
overloaded box, not representative): avg 32–72 ms. Bytes per scene (first play): danger 91 KB, poison 93 KB, death 74 KB, festival 214 KB,
gift 22 KB, letter 13 KB, night 8 KB; Pixi atlases load in Pixi's worker (not in resource timing): promotion ≈ 40 KB, slap ≈ 34 KB, preg ≈ 27 KB.
Kit page #kit: §68 sample has 66 buttons, 0 errors.

## Follow-up (wiring, for another worker) — call sites still to connect
- feedback()/kitFx call sites exist for: verdict, hit, promote, decree, night, ink, favour, expose, coin, birth, ash, (km-gloom→demote,
  km-bloom→birth/preg, km-inkov→death), festival night.
- NOT wired yet (kinds exist): harm (heavy harm events), poison (j poison events / jpoison), rumour (tin đồn events), seal (contest results,
  promo-exam stamp), romance (Emperor/men favour beats), betray (alliance broken), letter (secret letters, jitev letter items), kitFxGift
  give/open/refuse (jgift, j93 kitReward box open, NPC gift dialogs), card-flip (review/cardflip: kitFxLight candle/lantern-red, glowburst on
  the chosen card), night-end (review/night-end .kne-* CSS gradients → kitFxLight candle / moonlight / lantern-red), promo-rules (glow + jade).
- Other code-drawn stand-ins outside jfx found (not changed here): jitev .kievflame (CSS gradient burn front), j93 .kmlight-f / .kmsweep,
  j90 .kpod-beam, review/night-end .kne-red/.kne-amber/.kne-gutter/.kne-lantern/.kne-sun (gradient lights).

## Resume
`CTM_IMG_BASE= python3 dev/build/assemble.py`; `node dev/test/sw-serve.js <port> <wt> dev=<wt>/dev &`; `python3 dev/site/cdn_sync.py --pull 'img/fx/*'`;
`nice -n 19 node dev/test/fxkit.js http://localhost:<port>/ <out> shots`. New art: slice.py (sheets/edges), light.sh (clips), sheet.sh (alpha video).
