# coop-fig-retry — figure list fetch is never retried (weak network: Thái hậu / any full-body picture stays blank)

PRIORITY #1 CHECK: OD 0 hits (figures retry) | main j28.js:4 one-shot fetch, j39.js:7-10 re-read every 5 min, j79.js:1046 + jk4.js:583 late-arrival watchers, jcdn.js manifest wrapper | review/* none retries a manifest read (fig-bg*, book-fig*, dlg-fig-ph* = other topics) | claims none (ORDER MAIN 103: B takes it).

## Root cause (LAW 11: the whole group)
Every `img/*.json` manifest read (28 `fetch(` call sites in 21 modules: FIGURES, -servants, -others, -x, -kc, -huynh, -ty, -kids, -congtu, -hd, ACTS, INFO, TN, EVENTS, fits, hotspots, POR_FACE2, _index…) goes through `window.fetch`, wrapped ONCE in `dev/build/jcdn.js`.
That wrapper did not retry; each caller swallowed the failure (`.catch(()=>{})`, `r.ok?r.json():null`). j28 reads FIGURES.json once; j39 re-read only every 5 min → on a weak line the figures stayed blank for minutes.

## Fix (one shared loader, no second copy)
`dev/build/jcdn.js` section 1: a manifest read that rejects (network), is non-ok (5xx/429/…) or whose body is not valid JSON (cut off) is retried after 1 s, 2.5 s, 6 s (bounded, ~9.5 s max). 404/403/410 = file really absent (optional manifests) → no retry, as before. After the retries the old result is handed back unchanged (non-ok response / rejection / the bad body), so callers behave exactly as before. A good answer reaches the caller's own `.then` once → j28/j39 `render()` redraw the pictures (j79:1046 / jk4:583 watchers also redraw an open dialog; no new redraw code). Retry now also applies to a local build with empty `CTM_IMG_BASE`. GET only. Hooks: `KCDN.mretries`, `KCDN.mfail`. No player-visible text changed.

## Test: `dev/test/fig-retry.js <WxH@dpr> [solo|coop|both] [rootDir]`
Blocks the first reads (Playwright route): FIGURES.json abort, 503, half a JSON body; FIGURES-others abort ×2; FIGURES-servants abort. Both co-op seats get the same blocks (live Worker, real room + join).
Per player: loader retried (mretries 6), figure list merged (consort, thaihau, servants…), Thái hậu full-body file found + really loads, heroine's full-body file found + loads, no page errors.
Scan: `node dev/test/manifest-fetch-scan.js` (every fetch site goes through the one loader, no bypass).

## Before / after (same test, same blocks, Fold 755x1000@2)
| check | OLD main (jcdn before) | NEW |
|---|---|---|
| loader retries | 0 | 6 |
| FIGS after the blocked reads | 0 (blank) | 3492 solo / 1296 coop |
| Thái hậu picture | unknown-fig silhouette | fig-consort-…-th-a51.webp loads |
| heroine picture | none | fig-player-… loads |
| result | FAIL 6 | ALL OK |

## Gates
- fig-retry Fold 755x1000@2: solo ALL OK, coop (host + guest) ALL OK; iPad 1180x820@2 solo+coop ALL OK (26 checks).
- one-core-guard PASS, one-core-text-rule PASS, undef-scan PASS, manifest-fetch-scan PASS.
- quickcheck PASS (289 s; core gates PASS). coop-e2e 129/129 PASS (live Worker).
- fig-retry final: Fold 755x1000@2 and iPad 1180x820@2, solo ALL OK + coop (host+guest) ALL OK.

## Side effect found + handled (needs Foreman B's eye)
quickcheck aborts every CDN request (no --net). j52 `nlBegin()` holds start() until the figure lists have answered (nlFigsReady, max 2.5 s), and before this change a failed read answered at once; now it answers after the retries (~9.5 s), so quickcheck's perf `NEWLIFE` read `S` while the new-life card was still pending ("Cannot read properties of undefined (reading 'origin')", reproduced twice, main passes). Fix: `dev/tools/quickcheck.js open()` now also waits (cap 30 s, never fails) for `FIGSIG!==""` — a readiness condition, no threshold touched. Quickcheck "open" step is now ~11 s (was ~2 s) on the new build only; perf numbers unchanged. Player effect on a dead line: the new-life card appears after at most the same 2.5 s cap, then figures arrive when a retry lands. No retry while `navigator.onLine===false`.


Risk: low. Worst case a persistently failing manifest delays its caller by ~9.5 s once (was: instant empty); the 5-min re-read still runs.

## REVIEW r1 (sonnet reviewer-lander, 11/22/2026) — PASS
PRIORITY #1 CHECK: OD 103 (FIGURES no-retry = B) | main 7303aa58 jcdn.js no manifest retry | review/coop-fig-retry 75db524f4 | claims B 'coop-fig-retry'.
Merged LIVE 7303aa58 into review/coop-fig-retry-r1 (only index.html/sw.js conflicted; rebuilt with build_site.sh). Diff is loader + test + quickcheck wait only; no BAL/save/co-op rule/time/progression file → SMALL-tier shape, but boot-loader → checked BIG-style gates.
- LAW 11: manifest-fetch-scan PASS (41 reads, 28 modules, 0 bypass; every read via the one jcdn.js wrapper). Retry bounded 1/2.5/6 s (≤9.5 s per manifest), GET only, 404/403/410 and navigator.onLine=false → no retry. Final result unchanged for callers (no hang).
- Gates on merged build: fig-retry Fold 755x1000@2 both seats ALL OK (26), iPad 1180x820@2 both seats ALL OK; coop-e2e 129/129 (live Worker); undef-scan, one-core-guard, one-core-text-rule PASS; quickcheck PASS 153 s; newlife-oldsave FAIL 0 (old save loads). Quickcheck's own old-save step is skipped without a live build (as before).
- Shots (scratch): title screen Fold + iPad with the first FIGURES reads blocked → figures arrive (FIGS 1296), screens normal; each looked once (non-UI change, no layout touched).
- JUDGEMENT on quickcheck open() FIGSIG wait: acceptable as a readiness wait (cap 30 s, never fails, no threshold touched). It does mirror a real player effect: measured with every CDN manifest aborted but browser online, the new-life card now appears after the existing 2.5 s nlBegin cap (~3.0 s), where OLD main answered at once (failed read → FIGSIG "0|0"), and figures fill in at ~9.5 s via render(). Worker's report said "same cap" — true, but it is a NEW 2.5 s only on a dead-CDN-but-online line, once per new life. Offline = instant (no retry). Weak line = card waits ≤1 s for the first retry and then has the faces. JUSTIFIED, not blocked: rare (CDN outage), small (2.5 s, capped), self-healing. If the owner later wants zero wait on a dead CDN, make nlFigsReady() also true when KCDN.mretries>0 after 2.5 s — not done here (would be a behaviour change beyond this topic).
- Note: on a fully dead CDN ~26 manifest chains each make 3 extra GETs (~78 requests in 9.5 s); bounded, once per page load + the 5-min re-read.
Verdict: PASS. No fixes needed on r1 beyond the merge.

## REVIEW r2 (sonnet reviewer-lander, 11/22/2026) — side-effect check on LIVE f0070e61 + fix
PRIORITY #1 CHECK: OD 103 | main f0070e61 has coop-fig-retry | review/coop-fig-retry-r1 (PASS) | claims B row.
Measured (Fold 755x1000@2, fresh context, 5 runs, medians; title = goto→"Chơi một mình" visible; card = start()→new-life card in Q):
| case | OLD LIVE 7303aa58 | f0070e61 | r2 fix |
|---|---|---|---|
| CDN reachable: title / card | 1712 / 900 ms | 1728 / 955 ms | 1682 / 874 ms |
| CDN dead but online: title / card | 1775 / 652 ms | 1685 / **3020 ms** | 1745 / 722 ms |
(a) reachable CDN: NOT slower. (b) dead-online CDN: title never held; the new-life card was held 2.5 s (nlBegin cap) because the failed read no longer settled at once → slower than before, so fixed here.
Fix: jcdn.js counts `KCDN.m1fail` = first read of a FIGURES*.json that failed; j52 `nlFigsReady()` is also true when m1fail>0 (retries continue in the background, figures fill in via render()). Slow-but-working lines still wait the old ≤2.5 s. quickcheck open() FIGSIG wait removed (back to original; open 2035 ms vs 11 s).
Gates: fig-retry Fold 755x1000@2 + iPad 1180x820@2 both seats ALL OK; coop-e2e 129/129; quickcheck PASS (open 2035 ms); undef/one-core/manifest-fetch-scan PASS; newlife-oldsave FAIL 0.

## REVIEW r3 (sonnet reviewer-lander, 11/22/2026) — r2 + capped FIGSIG wait restored in quickcheck open()
Cause of the r2 land FAIL (MAIN 105 LAND CHAIN 5): quickcheck also runs NEWLIFE on the OLD (LIVE f0070e61) build, which still opens its new-life card only after the figure lists answered (~9.5 s of retries with CDN aborted). r3 = r2 + quickcheck.js open() waits (cap 30 s, never fails) for FIGSIG!=="" or KCDN.m1fail>0; fast on the new build, covers the old one. Drop the wait once r2 is LIVE.
Gates (LIVE still f0070e61): quickcheck new vs LIVE PASS — open 2772 ms, old save ok, perf render 250/257, tab 503/494, buổi 1910/1397, tasks>200ms 27/21; coop-e2e 129/129; fig-retry both seats Fold 755x1000@2 + iPad 1180x820@2 ALL OK.
