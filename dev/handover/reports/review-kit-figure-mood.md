PRIORITY #1 CHECK: brief s35-review-kit-figure-mood.md (OD tail 17/11 ~17:40Z) | main KIT 28.8d absent, pcPort seals only | review/kit-figure-mood c7d4b72a (this review) | claims kit-figure-mood MAIN s35.

# review-kit-figure-mood r1 — PASS dee2e13f
Branch review/kit-figure-mood-r1 = c7d4b72a + merge origin/main 03a776e4 (earlier b5d109fe) (index.html/sw.js conflicts resolved by rebuild) + 1 small reviewer fix.

## Checks
1. Kit only: ONE part kitFigSeal (jfigseal.js), seal = jemo emoBadge element (img.kemo), no per-screen CSS variant. PASS.
2. Consistency scan (Fold 755x1000@2 + iPad 1180x820@2, fig-seal.js, 0 page errors): room stage tokens + #mefig, event dialog (kitStageFig), Dư đồ place view (up to 4 figs on iPad), kszFigHtml person frame, book/pet-care via kitStageFig. All seals inside stage/column, 39-50 px, not on face (faceHit false), beside head. Silhouettes / mini-game / identity card correctly none. Wide phoenix crown (Hoàng hậu, event dialog + iPad place): seal sits at head height right past the crown edge, ~one seal width from it; reads as attached to the head, not detached. PASS (known limit stays: ~50-90 px from the face centre by design).
3. Visible to anyone she sees (not intel-gated): emo-an for unknown mood, none for strangers. Tap: window-level jevb handler -> emoBox kit card ("Tâm trạng · name", cause rows / "chưa rõ: ngươi chưa gặp..."). FOUND + FIXED: emoKey fell back to p.name for people without id/sid (maid, ma ma, men "m2") and emoByKey could not resolve it, so the tap on their figure seal did NOTHING (silent dead tap; every life has a maid + ma ma in the room). Fix in jemo.js (emoRegKey registry + S.men lookup); scan before: maid dead 1/1, men dead 3/3, elder dead; after: 0 dead of me/emp/thO/maid/rivals/men/servants; tap on a seal opens the kit card (maid case verified).
4. Perf: place view with 15 figs: kitFigSealAll 0.6 ms, renderStage 12.5 ms (no regression vs seals off), 0 of 150 frames over 50 ms in 2.5 s idle. tab-perf-ab (CPU 4x, Fold) was noisy: ref main returned 0 for 6 of 8 tabs, only act/go/story comparable (act slower 692 vs 462, go/story faster) -> not conclusive, worker's quickcheck median render 232/253 stands.
5. Old save: oldsave-r1.js 16/16 (755/1180/1366, main build save loads, no errors, no overflow).
Note: seals appear only after kitFigBody finishes measuring the picture (CDN image load): in the sandbox that can take >10 s on first load, fine once cached.

## Shots
CDN img/_review/kit-figure-mood-r1/ (fold-room, fold-event, fold-place, ipad-room, ipad-event, ipad-place). Wipe: python3 dev/site/cdn_sync.py --wipe-review kit-figure-mood-r1.

# r2 — PASS 1d4e9796 (review/kit-figure-mood-r2 = worker e684d672 + r1 fix dee2e13f + main e503c53e + 1 reviewer fix)
- Seals: Fold + iPad fig-seal.js (MOTION=1 FAKE=1): all inside stage, not on face, 0 page errors; FAKE gian loop swaps in and out as designed.
- Motion (KIT 38.4): live only on screen (IntersectionObserver); reduced-motion = 0 live / 0 running animations; Gọn from boot = 0 live. FOUND + FIXED: Settings toggle Cảnh động/Gọn did not touch seals already on screen (saveOpt does not re-render); jemoseal now re-evaluates on saveOpt (before 8 live, Gọn 0, back 8).
- No frozen seals: room + tabs court/rel/kid/inv/act, every visible img.kemo is kemo-live with a running animation (0 frozen).
- Perf (CPU 4x, Fold, 4 s rAF): real Dư đồ seals avg 16.7 ms, 0 frames >50 ms; 60 extra animated seals stress: avg 18.6 ms, 4 frames >50 ms (max 117 ms at insert) — far above real counts; Gọn 16.7 ms.
- Tap card: known cause shows mood: cause; unknown cause shows "Nguyên do chưa rõ"; stranger "Tâm trạng chưa rõ". khoc/hon fallback: emoSealSrc gives buon/gian pictures (all 3 sets); kitEmoSeal.pop khoc swaps to buon picture + droop then restores the old key and class.
- Old save 16/16. Shots not needed (no CDN upload for r2).
