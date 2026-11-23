# KIT-BODY-MERGE — body-fit.json rows are OVERRIDES merged on the measure (KIT KEEPER #7)

PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 8 (own row exists on the handover branch CLAIMS.md, 23/11 02:23Z) | main 11 (dev/build/jbody.js, dev/test/kit-body-fit.js, dev/measure/body_fit.py) | review/* 3 (review/rv-kit-body-fit) | archive 0 — reuse: KIT_BODY, kit-body-fit.js, body-fit.json measure; nothing rebuilt.
Laws read: 18 LAWS block + START_CORE; touched: 4 (one core: no new number, BAL.body untouched), 9/11 (whole family of callers), 12 (Fold + iPad shots).

## Cause
`img/body-fit.json` rows are partial (e.g. consort/maid rows = `{"waist":…}` only). `KIT_BODY.rows()` returned the json row alone (non-null) before the async `kitFigBody` measure landed, so `want()` fired at once with only the json zones and never merged the measure; `fit===null` (json still loading) also let measured-only rows be placed and then moved by the json.

## Fix (dev/build/jbody.js `rows()`, KIT.md §28.8e text)
1. json rows are OVERRIDES: result = measured rows, json zones win (this was already the `Object.assign` order).
2. `rows()` returns null (so `want()` waits, `img()` emits `kbody-wait`) while (a) the json is still loading (`fit===null`), or (b) the measure is pending (`A===undefined`, `BAL.body.auto`) and the json row lacks any standard zone (por-*: hair/head/chest; fig-*: all 8). A complete json row answers at once; a measure that never lands (`A===null`) → json alone.
3. Family (law 11): every caller goes through `rows()`: `rect/style/vars/img/want/flush/debugHtml/debugFill`, kit sample §28.8e (jkitpage), looks-2 hair/clothes slots (jlooks via `KIT_BODY.img`) — grep of dev/build + kit sample: no other reader of `fit`/`A`. One source, no new numbers.

## Before / after (node dev/test/kit-body-fit.js; local server, CDN pictures, img/body-fit.json = dev/measure/body-fit/body-fit.json served locally, NOT committed)
| case | size | A (48 pictures) | B hidden zones | C live stack | bad |
|---|---|---|---|---|---|
| BEFORE, with json | 755x1000@2 | 16 fail ("missing hair/head/chest/sleeve/skirt/hem") | 19 | ok | 17 |
| BEFORE, with json | 1180x820@2 | 16 fail | 19 | ok | 17 |
| AFTER, with json | 755x1000@2 | ok 48/48 | 0 (≤5 allowed) | ok 2 layers | 0 |
| AFTER, with json | 1180x820@2 | ok 48/48 | 0 | ok 2 layers | 0 |
| AFTER, without json | 755x1000@2 | ok 48/48 | 0 | ok 2 layers | 0 |
| AFTER, without json | 1180x820@2 | ok 48/48 | 0 | ok 2 layers | 0 |
0 page errors in all runs.

Test-harness note (no repo change): test C paints fake `fx-hair-toc-2.png` / `fx-cloth-khoi-1.png`; on the CDN they 404 and `onerror` removes the layer, so C is a race there. The local server answers those two names with a 1x1 png.

## Shots (NOT in git; scratchpad) — §28.8e looked at 3x each (with json Fold, with json iPad, without json Fold; every consort + maid + eunuch + emperor + kid + portrait shows all zones outlined, waist box now sits with the other seven)
## quickcheck PASS (built sha, 297 s, open 1883 ms, old save ok, core gates PASS). CLAIMS row: already on the handover-branch CLAIMS.md (MAIN, 23/11 02:23Z) — main has no CLAIMS.md; MAIN updates its status. No rollover needed.
