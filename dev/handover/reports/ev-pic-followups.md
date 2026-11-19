# ev-pic-followups — SẴN SÀNG KIỂM 59fb29c04 (branch review/ev-pic-followups, merged LIVE 5dc5d9e0)
PRIORITY #1 CHECK: OD 19/11 ~04:15Z + ~04:55Z, report review-ev-pic-fig §FOR MAIN | main KIT §56.6/56.17 jksize.js, EVENTS.json | review/* ev-pic-fig only (landed) | claims ev-pic-followups (session_01Rc5AsMN9rc6gf4qRzmEoJF). START_CTX ~5 %, depth n/a.

## What
(a) KIT 56.18 (jksize.js, shared kit only): the three CSS rules "#mb = flex column that clips · .k3body flex 1 min-height 0 · frame height" were `html.kv1` (Fold) only. On iPad #mb scrolled the whole body, last option card clipped, no «Kéo xuống». Selectors no longer tied to html.kv1 → every L/XL option frame on every device: figure + info stand still, .opts is the ONE scroll owner, standard kitScrollCues hint. KIT.md 56.18 written (new text, no old copy).
(b) EVENTS.json (repo dev/art/manifests + CDN img/EVENTS.json, pushed): j7:eunuch was ALREADY mapped (tai-mat, silhouette at lattice at night; looked at it, fits "quỳ ngoài thềm / tai mắt"); the ph-*-dark seen in the coverage run came from the test's Proxy pp (pp.k = rival id → id "eunuch:<id>" missed the plain key). Real fix: plain keys thInv/thBribe/giftto (were missing) + wildcard keys thInv:* / thBribe:* / giftto:* / eunuch:* — REAL thInv has pp.id → id "thInv:<id>"/"thInv:gift" never matched the plain key (placeholder in play). Coverage after: thInv→ev-hao-huu, thBribe→ev-hoi-lo, eunuch→ev-tai-mat (own, Fold + iPad). giftto: static own (qua-tang); its live frame is not a ksz3 frame (S portrait, placeholder shown at coverage time) — unchanged, not required (S).
No ART ORDER needed.

## Scan (dev/test/opt-frame-scroll-scan.js, new): every PEND family + Q option kinds (381 option frames), Fold 755x1000 / iPad 1180x820 / 1366x1024, REAL mouse wheel to the end of the scroll owner
| | before (LIVE-like, ev-pic-fig) | after |
|---|---|---|
| iPad 1180 scroll owner | #mb 63 · opts 0 · none 58 · L none 6 | #mb 0 · opts 94 · none 28 · L none 6 |
| iPad 1366 scroll owner | #mb 63 · none 59 · L none 6 | #mb 0 · opts 95 · none 27 · L none 6 |
| Fold 755 | opts 15 · none 105 · L none 6 | opts 14 · none 105 · L none 6 |
| FAIL (#mb scrolls / last card clipped / no hint) | 131 (58+57 iPad "last card ok, NO hint", 11 iPad clipped) | 22 |
Example night1 (XL, 4 options) iPad: before = #mb sh883 ch531, figure scrolls away, last card cut, no hint; after = #mb 531 clip, opts scrolls, hint on, last card fully visible (shots below).
Residual 22 = pgin, rcpacc, empnight, e68giftArrive, ksp, loveletter, rvframe, e68empAsksAbout, prep, eunuch(test pp), e68lotusSeason, e68maidQuarrel on iPad/1366 and **pgin, rcpacc, empnight on Fold too** — PRE-EXISTING, identical on the before build: the option cards of these events are re-rendered ~1900 DOM mutations / 600 ms (.kdup chip lists, .kr-hint toggles) so scrollTop snaps back to 0 and the wheel cannot reach the last card. Not caused by this change; needs its own fix (find the re-render loop). FOR MAIN.
Also seen: the very first wheel after the frame opens is sometimes lost (night1), later ones scroll — the scan wheels 4x.

## Gates
- quickcheck --cpu 4 on 6780434d (pre-merge): PASS 171 s, old save ok (Tần Cẩm Tú, buổi ok, 0 errors), render 157/172, tab 311/326, buổi 878/958, tasks>200ms 17/17, core gates PASS.
- merged LIVE 5dc5d9e0 (conflicts only in generated index.html/sw.js → rebuilt by build_site.sh, 0 markers), then r2 = EVENTS.json + test only (no game code). Post-merge scan subset night1/caning/tuyen/thBribe/thInv OK both devices.
- ev-pic-coverage (ONLY eunuch|thInv|thBribe, WAIT=3000): picture shown 5/5, all own.
- coop-e2e not run.

## Shots (Fold + iPad together, LOOKED 3x; before | after, scrolled to end): CDN img/_review/ev-pic-followups/
https://ctm-img.victoria-tntt.workers.dev/img/_review/ev-pic-followups/cmp-755x1000.png
https://ctm-img.victoria-tntt.workers.dev/img/_review/ev-pic-followups/cmp-1180x820.png
Wipe after verdict: python3 dev/site/cdn_sync.py --wipe-review ev-pic-followups

## Files
dev/build/jksize.js (3 selectors), dev/kit/KIT.md 56.18, dev/art/manifests/EVENTS.json (+CDN), dev/test/opt-frame-scroll-scan.js (new), dev/test/ev-pic-coverage.js (WAIT env), index.html/sw.js rebuilt.

## r2 — SẴN SÀNG KIỂM 34d4b3c7 (successor worker session_01Rc5AsJJWkjfCMMzTar86tr, after SMALL review FAIL of 59fb29c0; merges LIVE main 62055a31)
PRIORITY #1 CHECK: OD 19/11 ~04:15Z, review-ev-pic-followups FAIL list, brief cag22-ev-pic-followups | main KIT 56.6/56.18 jksize.js kszOver3 | review/* opt-scroll-reset (f6462525, kszLivePick3 only, no overlap; its worker confirmed) | claims ev-pic-followups + opt-scroll-reset. START_CTX ~5 %.
### What
1. KIT 56.6 (jksize.js `kszOver3`, shared kit only): the picture ladder now measures `.k3right>.opts` overflow too (the L/XL scroll owner since 56.18). A frame whose options fit with a smaller picture steps the picture down instead of keeping the big picture + a scrolling list (law 10). KIT.md 56.6 + 56.18 text updated in place.
2. Scan made deterministic (dev/test/opt-frame-scroll-scan.js): scroll owner set to its end by scrollTop after settle, scrollTop READ BACK after 600 ms (column `stay`, n = something reset it); random stream reseeded per event (an extra event in one build no longer changes the next frame's content — that was the source of the empnight/doanngo flips); one device per process (SZ); SHOT/DSF/TAG env for shots. New dev/test/opt-frame-scroll-diff.js = regression column LIVE vs branch (same frame + device; REG = passes/fits on LIVE and fails/scrolls on the branch; exit 1 on any).
3. empnight (FIX item 2): NOT a picture-ladder fault. In isolation on 1366 it fits on the branch (NS); in the earlier full run its content differed by run order (fixed by the reseed). Where it fails, `stay`=n: the option list is scrolled to the end and snaps back within ~100–600 ms — proof (night1/empnight, MutationObserver): ~2000 attribute edits/600 ms on `.opts` style/data-kol/data-kot (kitOptTier ResizeObserver re-runs) and `.kdup`, scrollTop 382 → 91 → 0. Same loop on LIVE Fold (night1 183 → 153). = opt-scroll-reset's job (its branch fixes it, see combo column). Left to opt-scroll-reset.
### Scan (all PEND families + Q option kinds, ~124 frames/device; LIVE 62055a31 vs branch, same run; combo = branch + review/opt-scroll-reset f6462525 merged locally, NOT pushed)
| device | FAIL LIVE | FAIL branch | REG branch vs LIVE | FAIL combo | REG combo vs LIVE |
|---|---|---|---|---|---|
| Fold 755x1000 | 13 | 9 | 0 | 1 (vlcraft, also FAIL on LIVE) | 0 |
| iPad 1180x820 | 62 (#mb scrolls) | 44 (all `stay`=n, scroll-reset loop) | 0 | 0 | 0 |
| iPad 1366x1024 | 60 (#mb scrolls) | 28 solo run (50 in a 3-process run) | 0 solo (2 in the 3-process run: doanngo, e68giftArrive — both fit on the branch in 2 isolated reruns = load noise) | 0 | 0 |
The reviewer's regression list rvframe, loveletter, e68droughtPrayer, e68leakRoof, e68servHero (1180) and empnight/flood/vlcraft/j70def/night2: none regress any more. Every branch-only FAIL row is a frame that already FAILs on LIVE (#mb scroll on iPad) and is now stuck only by the scroll-reset loop.
### Gates
- quickcheck --cpu 4 on 92d4bfcc: PASS 499 s, core gates PASS, time-spill PASS, old save ok (Thượng Quan Vân Thường, buổi ok, 0 errors), perf new/live render 215/242, tab 406/393, buổi 1140/1063, tasks>200ms 19/18. Later commits = test script only (no game code).
### Shots (DSF 2, LOOKED 3x; per device: LIVE rvframe | branch rvframe | branch night1 scrolled to end | branch+opt-scroll-reset night1 end)
https://ctm-img.victoria-tntt.workers.dev/img/_review/ev-pic-followups/r2-cmp-755x1000.png
https://ctm-img.victoria-tntt.workers.dev/img/_review/ev-pic-followups/r2-cmp-1180x820.png
https://ctm-img.victoria-tntt.workers.dev/img/_review/ev-pic-followups/r2-cmp-1366x1024.png
Looked: rvframe identical LIVE vs branch on all 3 (picture NM/NS, 3 cards in frame). night1 branch end = list snapped back (scroll-reset loop); with opt-scroll-reset the last card is fully visible + strip picture. 1366 branch night1 shows the big mood bubble (kemo) mid-animation over the frame corner = game animation caught by the shot, not this branch. Wipe after verdict: python3 dev/site/cdn_sync.py --wipe-review ev-pic-followups
### FOR MAIN
- Land order: opt-scroll-reset WITH or right after this branch — on iPad this branch makes `.opts` the scroll owner, so until opt-scroll-reset lands the ~30 frames that FAILed on LIVE (#mb) still FAIL (list snaps back) instead of scrolling the whole body. Combined: FAIL 0 / 0 / 1, regressions 0 on all 3 devices.
- Pre-existing on LIVE, after both: vlcraft Fold (last card clipped, stay n).
