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

## r2 (worker map-labels-r2, MAIN ROOT-53→54) — READY 01256d36 on review/map-labels-missing (merged live main 94d11623)
PRIORITY #1 CHECK: OD L1032, L1416, L1417 + 18/11 ~19:05Z/19:10Z/19:15Z | main j38 mapFit, j41 accSpot, j27 empty | review/* review/map-labels-missing | claims map-labels-r2.
### Reviewer FAIL list → fixed (whole group, one solver)
`kmSolve` (j38.js, pure geometry, deterministic, 25–130 ms) replaces the nudge: every tag = ONE union box (.mlab+.mmeta). Hard rules: no tag boxes touch; no building dot in/beside another tag; leader (dot → nearest point of its tag) never runs through another tag and never crosses another leader. Soft: tag not on another place's building, nearer is better. Order: highest rank first (her place, "!" places, more people) keep home when free → repair → seeded local search over all tags. Smaller before longer: Fold floor now = kit floor .85 (was 1), and a tag may take its name on ONE line (`.kmnw`, variant chosen only where needed) → max tag→building distance 57–90 px (r1: up to 203). Leaders only when the dot is >6 px clear of its tag.
### Grey state (OD 19:05Z/19:10Z/19:15Z)
ONE kit class `.mgrey` (jmapc.js) = WHOLE tag (slip + info row) grey; set for every unreachable place (j41 accSpot: .awalk out of khắc, .agrey rank/forbidden; lock + reason kept), empty palaces (j27, + line «cung trống»; Ngoại triều keeps its reason line), and courtyard hall tags of an unreachable/empty palace (jpm kpmGrey). LOOK ONLY: no tap handler touched; scan clicks every grey place with st.kind and asserts the dialog has «Lẻn vào». Old per-state .awalk label colours deleted (canon overwrite). KIT.md §85.7 updated in place.
### Scan (dev/test/map-labels-scan.js, extended): union-box overlap, dot-inside/beside tag, leader vs tag, leader×leader, inside map, grey==unreachable, «cung trống» line, dialog «Lẻn vào», courtyards grey==unreachable; ranks + saves (random save per run), DSF 2
| device | time | ranks | result (this build) |
|---|---|---|---|
| Fold 755x1000@1 | day/night | 2,3,4,5,6,7 | PASS all, ≤0 violations |
| iPad 1180x820@1 | day/night | 2,3,4,5,6 | PASS all |
| Fold + iPad @2 | day/night | 2,3,4 | PASS (shots below) |
| courtyards (13 slots, 8 grey) | both | – | PASS |
BEFORE (r1 build, same scan rules, reviewer): union overlap + dot under tags + crossing leaders on Fold/iPad NE corner. Before/after of the old tolerance: r1 max dist 203 px, r2 ≤90 px.
Tests: QUICKCHECK PASS 183 s (render 242/224, tab 448/413, buổi 1191/1291; core gates PASS; build matches). Run: `DSF=2 NODE_PATH=$(npm root -g) node dev/test/map-labels-scan.js <url> <dir|-> 755x1000,1180x820 [-,3,6]`.
Shots (LOOKED 3x, DSF 2, JPG, CDN upload not used): dev/handover/shots/map-labels-missing/{755x1000,1180x820}-{day,night,courtyard}.jpg (rank 4 save). Delete after verdict.
Not done: no old-save variants beyond quickcheck; solver can in theory leave a rule broken in an extremely crowded layout (never seen in ~40 runs; then tags stay, none hidden).

## r2b (MAIN ROOT-55: tags cut by the Fold edge) — READY 718c249b (merged main 13bb8c88)
Cause: the Fold map is zoomed to height and pans; tags of buildings at the visible edge were placed on the whole map, so the screen edge cut them.
Fix (whole group, kmSolve vp rule, j38): after the default scroll is placed, the solver runs again with the visible map box. A tag whose building centre is in view lies WHOLE inside it; a tag of a building out of view stays WHOLE outside it; a building within 60 px of the edge (mostly cut; 120/200 px only if no clean layout exists) may have its tag WHOLE outside. Never straddling. Courtyard (.kpmv) hall tags step in from the edge (jmapc kmEdge). Pan after open is the player's own.
Scan adds: cut = 0 (tag box crossing the visible edge) + 412x1058 + courtyard wait. PASS Fold 755x1000, iPad 1180x820, 412x1058 (DSF 2), day/night, ranks 2,3,6, courtyards 13 slots. QUICKCHECK PASS 171 s.
Shots (looked): dev/handover/shots/map-labels-missing/*.jpg (Fold, iPad day/night/courtyard; 412 is the rotate-phone screen).
Known: where buildings sit right at the Fold's east edge the tag is just off-screen (pan to see it), with its dot/leader at the edge; one Fold night shot shows a long leader (Cảnh Phúc, ~480 px) - a crowded east edge; offer: fit the whole map width on Fold if sếp prefers (contradicts §85.8).

## r2c (reviewer FAIL on 718c249b, MAIN ROOT-55) — READY 2e3987c8 (merged main 9366028)
1. Leader end: kmSolve now keeps the REAL slip / info-row rects of every tag (pv) and ends the leader on the nearest of them (never the union box corner). Scan reads the DRAWN .mlead (dot, end, length) and FAILs if the end is >3 px from a real child rect (endAir).
2. Short + clear: a tag that still covers the middle 60% of its own building needs NO leader (so most tags have none now: Fold/iPad scans show 0-1 leaders, ≤18 px). Otherwise dot = point of the building nearest the tag; hard limits in solver AND scan: leader ≤ 90 px (scan ≤92), dot ≥ 40 px from every other tag (solver relaxes 28/16 only if no layout exists; scan FAILs below 16 and prints dotUnder40 count = 0-2), no line through another tag, no crossing. Prefer moving the tag: leader cost via the same function.
3. No dot/line off-screen: a building whose tag would sit outside the default view gets NO dot/leader (tag shows when she pans); a leader exists only when its tag AND dot are inside the visible box (scan leadOff). Buildings in view keep their tag whole inside.
Scan PASS: Fold 755x1000, iPad 1180x820, 412x1058 at DSF 2, day/night, ranks 2/3/6, 13 courtyards (21/21 PASS). QUICKCHECK PASS 181 s. KIT.md §85.7 updated. Shots (looked): dev/handover/shots/map-labels-missing/*.jpg (Fold, iPad day/night/courtyard + 412).
Known: Fold east edge — tags of buildings centred beyond the visible edge are not on screen at open (pan); no dot/line is drawn for them.
