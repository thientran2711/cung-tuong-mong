# tham-flip-ui report (KIT+ART worker, owner-bug fast lane)
Branch review/tham-flip-ui @ a27f525b2 (base cardflip-glow2-r2 + origin/main 73c06812). Not touched: main, timing / 1st-15th rules.

Done
- Tray + background repainted (Magnific gpt-2-6, Personal folder): Emperor's gold tray in natural vermilion lacquer + gilt, pale champagne-gold silk floor, soft lamp (owner OD 15:05Z). New files img/kit/cf-gplate-{ksp,emp}{,-p}.webp on the CDN (new names; old cf-plate-* untouched so live main keeps working). Portrait tray is taller (20+ cards + tags fit). Geometry re-measured in BAL.cardFlip.plates.
- Rank + name under EVERY card via kitNameRank (kit rank jewel tones, plain vivid text, no glow on the pale silk floor; HER name bold black). Grid reserves TAGH under cards and TAGW per column: no overlap (tag overlap scan: 0 in every run).
- HER card: soft white whole-frame glow on the tray from the start (static, not over the face; reduced-motion = same static).
- Duplicate-card bug in the demo fixed (cfDemo = one card per person, capped at the roster; the real deck already uses one card per person).
- Title no longer looks cut: the earlier sheet's label bar covered it, not the scene.
Files (this folder): shot-755x1000x2-tray-start.jpg, shot-755x1000x2-other-final.jpg, shot-1180x820x2-tray-start.jpg, shot-1180x820x2-other-final.jpg, me-755x1000.mp4 (her card, ~12 s), other-755x1000.mp4 (another card, ~14 s). Real speed, no timing change.
Tests: node dev/test/thamflip-shots.js <url> <out> 755x1000,1180x820 2 (0 page errors, tag overlap 0). Not run: dev/test/cardflip.js full suite, kit-conform.
Open / honest notes
- Painting-glow rule of OD 13:55Z is not in review/rank-bright yet; per s18 the tags use plain vivid text (paper rule). If the owner wants glow on the tray, add the kit rule later (one place: .kcf-tag).
- Roster of a fresh test game = 11 cards; 20+ cards still fit but cards get small (~35 css px at 755 portrait) because each column needs the name width.
- Test-harness race seen only for the "me" demo without video: sometimes the page shows the game's own old tablet scene (framed) instead of kitCardFlip; not reproduced with the overlay probe, not caused by this branch as far as checked.
- Floor of the upscaled art is mottled (aged silk look); acceptable, redo with another seed if the owner dislikes it.
## HANDOVER (context rollover)
Worker at ~50% context, only review remains. Successor: re-run videos if art changes; ask s18 for owner OK; merge origin/main when it lands; coordinator opens the successor.
