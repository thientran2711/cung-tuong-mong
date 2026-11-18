# map-labels-missing (worker, MAIN ROOT-53) — READY FOR REVIEW 98c0e0a3 (r1 after MAIN note; was fb77229c)

Branch `review/map-labels-missing` sha **98c0e0a3** (on live main d3ea24e8, nothing newer on origin/main at push time).
PRIORITY #1 CHECK: OD L1032 / L1417 (readable tag on EVERY map label; grey out of khắc; no ruling hides a palace name) | main: j38 mapFit `kmhide` | review/* none | claims none.

## Owner bug (18/11 ~18:20Z)
"Tên của những cung khác đâu sao không thấy." — Dư đồ shows only a few name tags.

## Root cause
`mapFit` (dev/build/j38.js, KIT §85.7 "label rule") added class `kmhide` (CSS `.mspot.kmhide .mlab,.mmeta{display:none}`, jmapc.js) to the lower-priority tag of every touching pair once the tags were already at the floor scale. Result: tags silently disappeared (small/empty palaces first), contradicting OD L1032/L1417. Measured on live d3ea24e8 (fresh save): Fold 8 of 28 hidden, iPad 5 of 28 hidden, day AND night (lc, cnh, tgk, ttp, r2–r5 / lc, r2–r5).

## Fix (whole group, one place)
j38.js `place()`: **never hide**. After the shrink-to-floor step, a still-touching lower-priority tag (her place and "!" places stay put) is nudged (CSS `translate` on its `.mspot`, ring search 6–200 px) to the nearest spot that touches no other tag and stays inside the map; if none exists it keeps the least-overlap spot. Same kit tag (`.mlab` slip), same size/contrast, grey/lock/reason untouched. Recomputed on every fit/zoom (translate cleared first).

## Scan (dev/test/map-labels-scan.js, new) — every `.mspot` on the full map: tag present, visible, not overlapped
| device | time | places | visible BEFORE | visible AFTER | overlapping AFTER |
|---|---|---|---|---|---|
| Fold 755x1000 | day | 28 | 20 (8 hidden) | **28** | 0 |
| Fold 755x1000 | night | 28 | 20 (8 hidden) | **28** | 0 |
| iPad 1180x820 | day | 28 | 23 (5 hidden) | **28** | 0 |
| iPad 1180x820 | night | 28 | 23 (5 hidden) | **28** | 0 |
Per-place list (key, name, moved px) = the tsv printed by the script (`<dir>/<size>-<day|night>.tsv`). Biggest nudges: Trường Môn viện (177,73) and Chung Tú (183,-76) px on Fold (crowded NE corner). Note: on Fold the map is zoomed to height and panned sideways by design (§85.8), so tags at the far edge need a pan; all are present and non-overlapping.

## Tests
- QUICKCHECK PASS (192 s; open 1515 ms; old save ok; perf render 212/276 ms, tab 449/454, buổi 1226/1357; core gates PASS; build matches).
- `dev/test/map-full.js` PASS Fold + iPad (map + courtyard 100%).
- Courtyard level (kpm) untouched (`if(kp)return` in place()).
Run: `NODE_PATH=$(npm root -g) node dev/test/map-labels-scan.js <url> <shotdir> 755x1000,1180x820`.

## Shots (looked 3x; CDN `img/_review/map-labels-missing/`): 755x1000-day/night.webp, 1180x820-day/night.webp (delete after verdict: `python3 dev/site/cdn_sync.py --wipe-review map-labels-missing`).
Not done: iPad/Fold other ranks/old-save variants beyond the quickcheck old-save open; before-shots not kept (numbers above are from the live build scan).
START_CTX ~5%, finished far below ceiling; no handover needed.

## r1 (MAIN note: tag must still read as belonging to its palace, OD L1416)
- CDN upload never happened (cdn_sync did not run to completion) -> shots are .jpg under dev/handover/shots/map-labels-missing/ on this branch: 755x1000-day/night, 1180x820-day/night (looked 3x, modal covers hidden).
- Added: every tag nudged >=24 px gets a thin gold leader line + dot to its own building (kit CSS `.mspot>.mlead` in jmapc.js; drawn in j38 place()); nudge now prefers the nearest free spot (distance weight x5).
- Max tag centre -> own building centre (scan col `dist`, includes tags that sit off-centre by design): iPad day 119 px, iPad night 168 px, Fold day 163 px, Fold night 203 px (Chung Tú; Trường Môn viện 194). All of those carry a leader line; every other tag <= 58 px.
- QUICKCHECK PASS on 98c0e0a3 (195 s; render 269/268, tab 457/454, buổi 1187/1359). First run FAILed perf buổi 3291/1039 ms = machine noise (same sha PASS on rerun).
