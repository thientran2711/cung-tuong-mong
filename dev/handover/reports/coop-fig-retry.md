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
- quickcheck / coop-e2e: see STATUS line / below.

Risk: low. Worst case a persistently failing manifest delays its caller by ~9.5 s once (was: instant empty); the 5-min re-read still runs.
