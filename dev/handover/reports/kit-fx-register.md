PRIORITY #1 CHECK ('kfxc|.kfx|kitFxLayers|bake'): OD:L1672 (17:53Z) + OD:L1677 (18:10Z avatar rule) | main jk2b.js kitFxLayers/.kfxc (found, replaced for avatars only) | review/toil-looks5 6b348e9d (LOD, untouched) | claims kit-fx-register MAIN s35.
# kit-fx-register (toil-looks6 worker) — AVATAR = ID CARD
Branch review/kit-fx-register **893b3f45** (b45850d3 + veil dropped from avatars, j79 hooks/CSS removed per MAIN s36; stage veil kveil2 untouched) (from origin/main 03a776e4), pushed. Files: dev/build/jk2b.js, dev/kit/KIT.md (28.8 entry), index.html/sw.js (rebuilt), dev/test/avatar-idcard.js, dev/test/avatar-perf.js.

## What changed
- Root cause (measured by toil-looks5): the `.kfxc>.kfx` overlay box (jk2b.js:462 hack -7 %/-5.7 %/114 %) was 5.5 % bigger than the photo -> every layer (makeup, rash, scar) landed off in small frames.
- Owner rule (OD:L1677): avatar = ID card = base portrait + LASTING marks only; no makeup, no temporary marks; lasting marks BAKED with the photo.
- `pcPort` / `mdH` hooks (every avatar-class frame: pcp tall, span.md / kmini / kfc, list rows, cards, pickers) no longer call `kitFxLayers` and no longer print `.kfxc/.kfx`. They call `KIT_BAKE.pick(p,url,kind)`.
- `KIT_LASTING` registry (plug-in for pox scars etc.; today: hủy dung scar from KIT_SCAR rect, same rows as the stage). `KIT_BAKE` draws photo + lasting layers on ONE canvas (tall 384 px / small 192 px), blob URL cached per file+marks+size (LRU 80, revoke 60 s after eviction), swaps `data-kbk` imgs when ready. A person without a lasting mark = plain photo, no canvas.
- Dead CSS for `.kfxc` removed (6 rules). Stage figures (`kitFxPut`/`.kfxf`), mirror close-up (`kitFaceZoom`), toil LOD: untouched. No save field added/changed (old saves unaffected).

## Before / after scan (dev/test/facefx-scan.js with a poison mark set, same state for everyone; before = toil-looks5 build, after = this branch)
| picture kind | lg (tall) before→after | sm (small) before→after | list before→after | stage | podium | room |
|---|---|---|---|---|---|---|
| maid / staff / rstaff / thaihau | true→false | true→false | true→false | true (same) | true (same) | true (same) |
| consort / emperor / men / kid / physician (no fit rows) | false | false | false | same | same | same |
Frame kinds with an overlay box (.kfxc) in the DOM, Fold 755x1000@2 stress scene: before 2, after 0 (dev/test/avatar-idcard.js: stage, Hậu cung, Hoàng tự, Giao tình, Hành sự tabs; 0 `.kfxc`, 0 avatars waiting for a bake, no overflow, no page errors) — also PASS at iPad 1180x820@2 and 390x844@3.
Her (scar + tuyet makeup + rash set at once): scar only on the avatar, no makeup, no rash. Rival with slap+rash only: plain photo.

## Perf / memory (dev/test/avatar-perf.js, Fold, every rival scarred, 4 tab visits)
after: heap 49.9 MB, nodes 994, layout 311 ms, script 2582 ms, 4 bakes; before: heap 46.2 MB, nodes 1002, layout 241 ms, script 2179 ms. => +3.7 MB heap, +~0.4 s total script for the whole session, all in one-time bakes off the render path (async). Only scarred people cost anything.

## Sample (real @2 px + smooth bicubic x3 zoom + tall frame): https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-fx-register/avatar-idcard-sheet.png
Caveat: in the sample the scar position for faces without a scar-fit row borrows the c01 row (test-only patch); production draws only where a row exists (same rule as the stage), so a face with no row shows no scar (as before).

## Open points for MAIN
1. RESOLVED in 893b3f45: veil removed from avatars (was: left on avatars): it is a worn item, not makeup/mark; the owner's literal list does not name it. Decide (one-line change: drop those two hooks) .
2. tcold-tier portraits (her "Cung lạnh" tier) have no scar-fit row -> no scar baked until rows are added (pre-existing gap).
3. CDN files to delete after verdict: img/_review/toil-looks/lod-v13b-head.png, img/_review/kit-fx-register/avatar-idcard-sheet.png.

## TASK 1 (done earlier, 6b348e9d)
Stage sample re-rendered (same face for all 5 cells, Mặt mộc now shows the face): https://ctm-img.victoria-tntt.workers.dev/img/_review/toil-looks/lod-v13b-head.png . Flag: at seed 7 the Vụng về cell shows almost no blush/powder.

## HANDOVER (context): finished; nothing pending except review. START_CTX ~5 %, ended ~35 % of 1M window.

## v14 stage sample (toil-looks5 db7c0f5d): https://ctm-img.victoria-tntt.workers.dev/img/_review/toil-looks/lod-v14-head.png ; tcold scar-fit rows NOT added (needs fit measurement, pre-existing gap).
