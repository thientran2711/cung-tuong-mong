PRIORITY #1 CHECK ('@W|FPOOL|face-consort|face pool'): OD 1 (L1636 staff caps fact-check, not this bug) | ledger 1 | claims 0 on this bug | main dev/build/j25.js:88 `const CW=n=>"@W"+n` | review/* none

# face-w404 (worker, sonnet) — branch review/face-w404 @ df8b57bc7d6092cc2da8532704102441190829ad (base origin/main e8b1906)

## Root cause
Two probes, both in the FPOOL load-time probe (j17.js:42), which built `"img/"+token+".webp"` from the RAW token:
1. `@W<n>` = inline portrait n of AV.women (data: url, resolved only in a j25 fsrc wrapper) -> 25 x 404 `img/@W<n>.webp` (ct1 14 + ct2 14 + ct3 9 + ct4 7 pool entries, unique urls 25).
2. `FPOOL.man` = face-man-1..8: art that is not on the CDN (only face-man-old-1..4 exist) -> 8 x 404. The sweep's "33" = 25 + 8, not all @W.
No git-history regression: the probe never handled "@" (j25 added the tokens + resolver wrapper, the probe was left raw).

## Fix (shared resolver, no per-call-site change)
- j17.js: ONE `faceUrl(fc)` (token -> url; "@W<n>" -> AV.women[n]); `fsrc` uses it (j25 wrapper removed).
- Pool probe asks the CDN index (`CDN_INDEX` = img/_index.json, fetched once; jevban KIT_CDNHAVE now reuses it, one fetch not two) instead of requesting possibly-absent art; Image probe only as fallback if the index is unreachable.
- Behaviour kept: inline @W faces stay out of NEW draws (FAV=0) exactly as live (their failed probe did that). Letting them in is a pool decision for D/owner: it would change who new people get, and measurably cost buổi time (+20-25% in 2 quickchecks). A saved "@W<n>" still shows its face.

## Scan (dev/test/face-w404-scan.js: title -> new life -> every tab x2 -> person cards; real CDN via proxy)
| token kind | count | 404 before | 404 after |
|---|---|---|---|
| @W<n> token | 25 | 25 | 0 |
| face-man-N (FPOOL.man) | 8 | 8 | 0 |
| every other FPOOL kind (consort face-consort-*, maid, mama, womid, th, emp, off, eun, manold, ct*) | all probed | 0 | 0 |
| **Fold 755x1000@2 total** | | 33 | 0 |
| **iPad 1180x820@2 total** | | 33 | 0 |
Other pools (maids fig-*, kid faces, eunuch, officials) used fsrc/faceUrl or fixed names: no raw-token-to-URL site left (grep of "img/"+…fc, `${…fc}.webp`: none). Remaining requestfailed (3-6/run) are ERR_ABORTED cancelled image swaps, same on live, not 404.

## Old save (dev/test/face-w404-oldsave.js: life played+saved on LIVE build, loaded by new)
50 people (me, maid, emperor, Thái hậu, rivals, men, court, servants): saved face id + fk + drawn url identical 50/50; two rivals forced to "@W3"/"@W8" keep their face. 0 page errors.

## Gates
quickcheck.sh @ df8b57bc7d6092cc2da8532704102441190829ad: PASS (core gates: one-core-guard 0 fails, rules-one-source, kit-conform, coop-one-world; time-spill PASS; old save ok; median of 5 new/live: render 178/167 ms, tab 348/307, buổi 960/1109, tasks>200ms 15/15). Earlier build with @W faces drawable: buổi 1414/1115 (the reason for keeping live behaviour). Perf on this box is noisy (live buổi alone varied 996-1342). No co-op code touched. Fold + iPad screens LOOKED at (title/rebirth screen, no layout change, nothing cut). No images in git.

SẴN SÀNG KIỂM df8b57bc7d6092cc2da8532704102441190829ad
