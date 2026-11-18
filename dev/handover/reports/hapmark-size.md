# hapmark-size — report (worker, session_01UV1Szkay8XSKEjk9fKn7BK)
PRIORITY #1 CHECK: OD 17/11 ~13:32Z + ~14:08Z | main none | review/map-portrait-r2 68979111 (base) | claims none | reused kit part kitHapMark (jact.js `.khap`, KIT §78.x).

**Branch** review/hapmark-size, sha **37f43fb2** (from map-portrait-r2 68979111).
**Change (kit part only)**: `.khap` 15 -> 19 px (+27 %), glyph .66 -> .82rem (+24 %), line-height 19, corner offset on icon labels -5 -> -7 px. Bright yellow, glow, hop (`khapNudge`) and reduced-motion static glow unchanged. KIT.md §78.x updated.
**Found fault (whole group)**: the old `.mspot.sm .khap` 13 px rule never applied (lost on specificity to `.mspot .mlab i.khap`), so every size was already 15 px; the dead rule is removed, one size everywhere (KIT text now true).
Also: map-portrait / map-place-mask / map-frame-kit tests now bypass the proxy for localhost (they timed out without it).

## Tests (local server, built site)
| test | result |
|---|---|
| map-portrait (755,412,390,1180,1366) | PASS x5, 0 label overlaps |
| map-place-mask | PASS |
| map-full (5 sizes) | PASS |
| map-frame-kit (755,1180,...) | PASS, ov 0 at default / +1 / +2 zoom |
| quickcheck | PASS 141 s, open 1411 ms, old save ok, core gates PASS |
| build_site | media-check + img-allowlist OK |

## Scan table (badge px on the map, badge overlap with place-name text / count, before -> after)
| size | before | after | over name | over count |
|---|---|---|---|---|
| Fold 755 | 15 | 19 | 0 | 0 |
| 412 / 390 | 15 | 19 | 0 | 0 |
| iPad 1180 (zoom .85) | 12.75 | 16.1 | 0 | 0 |
| iPad 1366 | - | 16.1 | 0 | 0 |
(both normal and `.sm` places measured; overview map. Place views use the same `.khap` class, list tiles `.mtile b` too; no per-view size rule exists.)

## Shots (LOOKED at all) — CDN https://ctm-img.victoria-tntt.workers.dev/img/_review/hapmark-size/
before-{full,close}-{755x1000,1180x820}.png, after-{full,close}-{755x1000,1180x820,1366x1024,412x1058,390x844}.png
Wipe with the verdict: `python3 dev/site/cdn_sync.py --wipe-review hapmark-size`.
