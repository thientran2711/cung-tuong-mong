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
