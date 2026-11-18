# avatar-makeup r1 (makeup only) — worker session_01UV1SzhLWPwoF94YDo85yN1

PRIORITY #1 CHECK: OD 18/11 ~09:25Z (stage + avatar = mirror strength) | main jk2b.js KIT_LASTING only 'scar' | review/* none (look-fx-wire cc0633a9 owns kitFxLayers marks) | claims MAIN s43.

## What (branch review/avatar-makeup, sha f6ffb09a, on live db24027f)
- jtoil.js toilAvatarMk + KIT_LASTING part "makeup" (inserted FIRST so every other lasting mark sits above): the exact toilMkLayer canvas entry (same colours/fit points as stage+mirror), BAKED with the photo by KIT_BAKE into ONE blob image (no overlay box, no drift). Covers every pcPort / mdH frame (top bar, side cards, tabs, lists, tall frame) for herself + co-op friends (toilLookOfP). Step 0 = mirror strength (the layer has no LOD step suffix). No makeup / mặt mộc / no fit row / silhouette -> plain por-*.webp.
- jk2b.js KIT_BAKE.make: layer src may be a function returning a Promise (makeup canvas is async); comment updated.
- STAGE rule: jtoil toilStageEl(im) (#stage, .kesfi, not .kfzoom-i) -> toilLodPass and jlooks lkLodPass force step 0 (no boost) for makeup + smudge on stage and event-dialog figures. Other places keep the size curve.
- Not done: smudge/marks on avatar (scope widened after I started, see below).

## Tests
- dev/test/avatar-makeup.js <url> <WxH@dpr> <outdir> [score]: Fold 755x1000@2 (70, 90) + iPad 1180x820@2 all pass: every avatar img of herself is a blob (baked) with makeup on, plain with makeup off, same file both states, stage layers all step 0, 0 page errors.
- Pixel check: baked blob vs original differs avg 1.25/255 (only lips/cheeks). Frames shot (md kmini, pcPort tall, small md) on/off LOOKED: red lips + blush on, natural off.
- stage4.js tuyet (Fold): stage figure at step 0, sparkle visible, LOOKED.
- quickcheck PASS (f6ffb09a): 139 s · open 1311 ms · old save ok · perf render 158/183, tab 339/351, buổi 771/944 ms · core gates PASS.
- Shots stay on this box (/home/user/wt/am-shots), not uploaded to CDN (no cdn_sync run).

## Frame list (before -> after, herself with makeup)
top-bar md sm 29-31 px, side cards (md kmini/kfc), tab rows, pcPort tall frame: before plain por (0 layers) -> after baked makeup blob. Unaffected: silhouettes, 'face-'/'unknown' pictures.

## WIDENED SCOPE (owner ~03:20Z) — NOT done, design for the successor
Owner: avatar frames show EVERY face layer (sparkle, smudge, cào, mực, muội, pox, bụi, mồ hôi, scar) = the one stack of kitFxLayers(p,file) (look-fx-wire cc0633a9 branch, jk2b.js; marks/veil/keep-out masks inside, lkKeepCss shared mask) at mirror strength.
Plan: (1) branch from review/look-fx-wire (or merge it into review/avatar-makeup); (2) replace my makeup-only KIT_LASTING part with a part that bakes the WHOLE kitFxLayers(p,file) stack: render its html in an offscreen .kfxf box sized to the photo (same CSS as stage, so tone/mask/opacity/filters are exact), wait until every img.kmkc / klk-smu / klk src is not TOIL_BLANK, composite to the one blob (CSS masks + mix-blend need html-to-canvas: simplest exact route is a DOM overlay span.kfxf via kfxGeom on the avatar img instead of baking, cost = few persons, layers only for herself/friends); (3) force LOD step 0 via toilStageEl-like helper for avatar frames; (4) quickcheck + perf, shots Fold/iPad each kind on/off per layer.
Risk: CSS mask/filter baking is not trivial -> prefer overlay with kfxGeom; the old ID-card drift problem is solved by kfxGeom (object-fit, transform).

## STATE
r1 pushed. Successor: take over from sha f6ffb09a.
