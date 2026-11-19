# REPORT opt-scroll-reset — SẴN SÀNG KIỂM a5e2d8e7 (review/opt-scroll-reset)
Worker session_01Rc5AsJ7aS6giCFsrSaRM6d (opus) for C-AG #22 / MAIN ROOT-67 (was ROOT-65). START_CTX ~2 % (1M window), depth 1. Base review/ev-pic-followups (not live yet), merged newest origin/main 62055a31 + review/ev-pic-followups 92d4bfcc.
PRIORITY #1 CHECK ('scrollTop|kdup|kr-hint|re-render|MutationObserver'): OD 0 | ledger 0 | claims 0 | main 15 (no existing fix) | review/* 0 | archive 0 — source = reports/ev-pic-followups.md Residual 22.

## Root cause (3 parts, all in shared kit code, fixed once)
1. **Re-render loop** — jopic `kitOptFinal` signed its idempotence check over the whole `small.kb` INCLUDING its own copies (`.kdup` chips, `.kfill` rows, «!»). jaudit `kitRankNamePaint` (name painter, a MutationObserver) titles a bare name inside a copied chip one frame later → signature mismatch → next `kaNorm` pass (j63 global `kaMO` on any added node) rebuilt every copy (bare again) → painter titled them again … ~1900 DOM edits / 600 ms, every frame (measured on pgin: 1521 kitOptSet calls/600 ms, the stack ping-pong kitOptFinal ↔ kitRankNamePaint). Fix: `kitOptSig(b,kb)` signs the SOURCE rows only (copies stripped).
2. **Scroll clamp on every re-pick** — `kitOptTier` ran again on every `kaNorm` pass (any node added anywhere: toast, timer, HUD); its trial layouts (2 columns S first) shrink the list for a moment → browser clamps the list's scrollTop to 0. Fix: `kitOptTierSig` (list width, picked tier, each card's class / text length / height) → nothing changed = keep the pick, touch nothing; a real re-pick restores the scrollTop of the list and its scrolling ancestors.
3. **First wheel lost** — scrolling revealed lazy option-card pictures; their `load` called `kszLiveRepick3` → `kszLivePick3` tried smaller frames in the middle of the wheel (smooth scroll killed). Fix: card pictures (fixed `.kaart` kit box, inside `.opts`) no longer trigger a re-pick; `kszLivePick3` (wrapper over `kszLivePick3_0`) restores the scroll of `.opts/.k3right/.k3body/#mb` on any real re-pick.
Files: dev/build/jopic.js, dev/build/jksize.js (only kszLivePick3 + the img-load line; kszOver3/kszPicStep3 untouched, r2 worker told), dev/kit/KIT.md **56.19** (new), dev/test/opt-frame-scroll-scan.js (+ w1 first-wheel column, HOLD=ms hold column; r2's stay column kept; hint rule aligned with kitScrollCues: overflow ≤ 6 px needs no hint), index.html/sw.js rebuilt. No visual change, no new UI part (KIT FIRST: n/a).

## Whole group — opt-frame-scroll-scan, ALL option frames × Fold 755x1000 / iPad 1180x820 / 1366x1024, HOLD=3000
| build | frames | FAIL | Fold | iPad 1180 | iPad 1366 | by reason |
|---|---|---|---|---|---|---|
| before (59fb29c0 build, same scan) | 377 | **128** | 12 | 63 | 53 | last card clipped 86 · first wheel lost 80 · snapped back within 3 s 59 · no hint 2 |
| after (pre-final-merge build) | 377 | **0** | 0 | 0 | 0 | — |
| after FINAL (134a1911 build = a5e2d8e7 game code) | 372 | **0** | 0 | 0 | 0 | — |
(The scan opens each event from a seeded state; a few events open or not per build → 372–381 frames. Missing cells of the brief's 22 were covered by a targeted ONLY run: rvframe, eunuch, e68maidQuarrel all ok on all 3 sizes; eunuch on Fold never opens in either build.)
Brief's 22: pgin / rcpacc / empnight / e68giftArrive / ksp / loveletter / rvframe / e68empAsksAbout / prep / eunuch / e68lotusSeason / e68maidQuarrel — before: clip and/or w1 / snap; after: ok on every size (table: scratch, reproduce with the command below).
Leftover explained: empnight / e68maidQuarrel on Fold sometimes overflow 5 px (below kitScrollCues' 6 px «more» rule → no hint, last card fully visible at the end); with r2's ladder they now usually fit (owner none).

## Tests
- Regression: `HOLD=3000 SZ='[[755,1000],[1180,820]]' ONLY='^(pgin|rcpacc|empnight)$' node dev/test/opt-frame-scroll-scan.js index.html` → 6 frames FAIL 0 (wheel to end, stays at end 3 s, first wheel scrolls); prep/pgin/rcpacc Fold 3× repeated: all y.
- Full scan above (exit 0). Mutations on pgin after open: before ~1900 / 600 ms continuous; after 0 once settled.
- quickcheck --cpu 4 on 134a1911: **PASS** 225 s, old save ok, perf new/live render 261/241, tab 523/503, buổi 1486/1332, tasks>200ms 20/21, core gates PASS. (a5e2d8e7 = + r2's 2-line scan reseed only.)

## Shots (Fold + iPad together, @2, scrolled to the END after the 3 s hold, LOOKED 3x): CDN img/_review/opt-scroll-reset/
https://ctm-img.victoria-tntt.workers.dev/img/_review/opt-scroll-reset/755x1000-pgin.png
https://ctm-img.victoria-tntt.workers.dev/img/_review/opt-scroll-reset/1180x820-pgin.png
https://ctm-img.victoria-tntt.workers.dev/img/_review/opt-scroll-reset/755x1000-rcpacc.png
https://ctm-img.victoria-tntt.workers.dev/img/_review/opt-scroll-reset/1180x820-rcpacc.png
Wipe after verdict: python3 dev/site/cdn_sync.py --wipe-review opt-scroll-reset

## FOR MAIN (seen, not in scope, not touched)
- The speaker's round face medallion is drawn very large over the scene strip / text in pgin (Fold + iPad) and rcpacc (Fold) — see the shots. Separate kit issue (speaker bubble size), needs its own worker.

Review tier: shared render code (jopic kitOptFinal/kitOptTier, jksize kszLivePick3) → BIG.
