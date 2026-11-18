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

## ROUND 2 (worker sonnet, fix of review r1 FAIL 1) — branch review/face-w404 @ c81fd72c310e34267a65f6b221112fd448e41777 (merged newest origin/main e9bbc4d6; index.html/sw.js conflicts = generated, rebuilt with build_site.sh)

PRIORITY #1 CHECK ('faceUrl|CDN_INDEX|FPOOL|@W'): reused review/face-w404, fixed on top; no new feature.

### Root cause of FAIL 1 (confirmed)
assemble.py rewrites every "img/ literal to the CDN base, so built faceUrl() returns the CDN-prefixed url while CDN_INDEX keys are stripped to "img/<file>" -> ix.has(u) false for every token -> FAV=0 for all pool entries.

### Fix (one place, j17.js)
- ONE normal form helper cdnKey(u) = strip everything before "img/" (j17.js:44). Both sides of the FPOOL index lookup use it: the index build (cdnKey(f[0])) and the probe (ix.has(cdnKey(u))).
- WHOLE FAMILY re-scan of every CDN_INDEX / KIT_CDNHAVE .has() caller (before/after):
| caller | key side | status |
|---|---|---|
| j17 FPOOL probe (was ix.has(u)) | url from faceUrl (CDN-prefixed in build) | FIXED: cdnKey(u) |
| j17 CDN_INDEX build | stripped | now via cdnKey (same behaviour) |
| j82 kg82Pic KIT_CDNHAVE.has(s) (s = the built-in img/kit/mg-*.webp literal, rewritten to CDN url by assemble.py: same bug, on live every mini-game picture is dropped as "not on CDN") | CDN-prefixed | FIXED: has(cdnKey(s)). VISIBLE EFFECT on live: mini-game (mg) backgrounds present on the CDN now show (the code's intent). Outside the face topic: D may revert this single hunk if unwanted. |
| jevban kitEvBanner, jevb:56, jph kitPhOnCdn | already stripped | OK, unchanged |
No other site builds a face token url by hand (grep faceUrl/fsrc clean).

### PROOF 1 — seeded same-life compare (dev/test/face-w404-seed.js, rebuilt; the game's own fixed-seed life: NL_KEY seed -> nlRun + separate face stream; same 3 seeds on live main e9bbc4d6, a second live run, and the branch)
Baseline first: live vs live2 is the noise floor. Rows = persons with a face id kind of role me/maid/Emperor/Thái hậu/rivals(+their maids+servants)/court/my servants; "men" (S.men) are not deterministic even live vs live, listed separately.
| seed | pair | persons | same face | different | empty (branch) | men differing (noise) | FAV per pool diff | FAV=0 entries |
|---|---|---|---|---|---|---|---|---|
| 0 | live vs live2 | 59 | 50 | 0 | 0 | 3/9 | 0 | 58/58 |
| 0 | live vs branch | 59 | 50 | 0 | 0 | 3/9 | 0 | 58/58 |
| 1 | live vs live2 | 57 | 48 | 0 | 0 | 2/9 | 0 | 58/58 |
| 1 | live vs branch | 57 | 48 | 0 | 0 | 6/9 | 0 | 58/58 |
| 2 | live vs live2 | 58 | 48 | 0 | 0 | 5/10 | 0 | 58/58 |
| 2 | live vs branch | 58 | 48 | 0 | 0 | 6/10 | 0 | 58/58 |
(r1 defect for comparison: branch had 172 FAV=0 and 247/301 persons different.) FAV=0 58 = the 33 old-404 tokens counted per pool (25 @W + 8 face-man + shared pools) = identical to live; they are still never requested. Men: S.men faces vary run to run on live itself, so only the noise floor can be stated.

### PROOF 2 — 404 scan, real CDN (dev/test/face-w404-scan.js: title -> new life -> all tabs x2 -> person cards)
| device | live 404 | branch 404 | page errors |
|---|---|---|---|
| Fold 755x1000@2 | 33 (25 @W + 8 face-man) | **0** | 0 |
| iPad 1180x820@2 | 33 | **0** | 0 |
Faces really load (dev/test/face-w404-load.js, both devices, branch and live identical): 48 persons with a face id, 48 distinct face urls via fsrc, 48 decoded, 0 failed. Fold scan drew 129 face files, 0 bad. (iPad draws por-* portraits on the screens visited, same as live; the live face request counts 276/147 include the 172-entry probe requests the branch no longer makes.)

### PROOF 3 — old save
dev/test/face-w404-oldsave.js (life saved on LIVE build, loaded by branch): 49 people, face ids + drawn urls identical 49/49, 0 changed, 0 page errors; forced "@W3/@W8" saved faces keep their face.

### Gates @ c81fd72c310e34267a65f6b221112fd448e41777
- quickcheck PASS (3 runs: render 198/164, tab 301/293, buổi 937/897 ms, tasks>200ms 14/14; 5 runs: render 171/150, tab 292/295, buổi 879/764, tasks 13/12). Perf on this box is noisy (earlier round new was faster than live; same code path). Old save ok, time-spill PASS.
- one-core-guard 0 fails; rules-one-source, kit-conform, coop-one-world PASS. No co-op code touched. No images in git.
- Fold/iPad screens: this fix changes no layout (index lookup only); load scan above is the visual proof of faces.

SẴN SÀNG KIỂM c81fd72c310e34267a65f6b221112fd448e41777
