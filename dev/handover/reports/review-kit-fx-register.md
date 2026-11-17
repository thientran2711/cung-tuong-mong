PRIORITY #1 CHECK: OD:L1677 (18:10Z avatar rule) + 17:53Z | main jk2b.js pcPort/mdH/kitFxLayers | review/kit-fx-register 893b3f45 | claims kit-fx-register MAIN s36
# review-kit-fx-register r1 (sonnet reviewer) — PASS d665e39f
Branch review/kit-fx-register-r1 = 893b3f45 + merge origin/main c114ab9e (index.html/sw.js conflicts only; regenerated with build_site.sh). Pushed; origin/main is its ancestor.
## Checks
1. Avatar scan (dev/test/avatar-idcard.js, 755x1000@2, 1180x820@2, 412x1058@2, 390x844@3): 0 .kfxc, 0 avatars waiting for a bake, no overflow, no page errors; tabs Hậu cung/Hoàng tự/Giao tình/Hành sự + stage. Looked at the pixels (cells her/scarred/slap+rash/clean, pcp tall + kmini): scar sits ON the face for her and the scarred rival; her tuyet makeup + rash NOT shown; slap+rash rival and clean = plain photo; no veil on any avatar.
2. Stage + mirror: git diff shows kitFxLayers/kitFxPut/kitFaceZoom/jtoil/jk4 untouched; DOM of the mirror zoom + stage identical main vs branch (same scene, both builds: .kfxf 1, zoom html 754 chars). Caveat: my test scene had an empty stage, so makeup on a stage figure was not seen in pixels; evidence is the unchanged code path + worker facefx-scan table.
3. Old save: dev/test/oldsave-r1.js 16/16 PASS (755/1180/1366). quickcheck.sh is not on main (lives on review/go-live-kit), not run.
4. Perf Fold stress (every rival scarred; avatar-perf.js): main heap 33.1 MB / script 1273 ms / .kfxc 2 → branch 39.7 MB / 2558 ms / .kfxc 0, 4 one-time async bakes. Acceptable (only scarred people cost).
## Nits (not blocking)
- Worker's CDN sheet avatar-idcard-sheet.png showed 3 cells with an empty photo (capture timing); real build renders them (my shots). Sheet wiped from CDN.
- tcold tier has no scar-fit row → no scar on avatar (pre-existing, worker open point 2).
- jtoil.js:847 makeup-preview panel still draws kitFxLayers on her portrait (preview = mirror-class, kept).
Shots: scratch only (/home/user/wt/kfx-r1-shots), no CDN upload. CDN worker folder wiped.
HANDOVER: finished; ~25 % context used.
