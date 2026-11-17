PRIORITY #1 CHECK: OD 13 (mirror view approved 17:53Z; no centring rule before) | main 16 sites (jtoil) | review/* 0 | claims s35 row only (this one) -> new owner bug, nothing to reuse.

# mirror-center (worker, sonnet) - SẴN SÀNG KIỂM

Branch `review/mirror-center` = origin/main d5ea786d + **ad226ed0** (site rebuilt, pushed). Owner bug (OD ~18:00Z): the face in the makeup mirror sits far LEFT of the mirror centre.

## Root cause (two stacked errors, both fixed in jtoil.js, no new kit part)
1. The close-up camera (`toilReveal`) put the figure in the middle of the SCREEN, but the bronze mirror of the plate (img/toil-mirror-room.webp) is not in the middle of the screen: glass centre vs face differed by 60-290 css px depending on viewport. Fix: glass centre is computed from the plate's own cover + background-position maths (`TOIL_PLATE`, glass centre x = 628/1200 measured on the painting); the standing figure is slid sideways (`--ktdx` on `.ktrv-fig`) so the face axis lands on it, camera then zooms about that point -> face = glass = screen centre.
2. The face centre used everywhere was toil-fit's MOUTH point (face-box centre in the makeup board). Measured against the face-mesh (img/mk-fit eye rings), the mouth sits on average 1.2 % of the portrait width right of the true axis (up to 5.8 %); the face-box centre 2.5 % (up to 7.1 %), over 6480 portraits. Fix: ONE helper `toilAxisX(file)` = eye midpoint of the mesh (0..1 of picture width; null while the mesh is not loaded -> old fallback). Used by the camera, `toilGeom` (makeup board glass; re-anchors if the mesh arrives after the board opened) and `kitFaceZoom`.
Makeup look untouched (colours, layers, scoring); small avatar frames untouched (toil-looks5 / kit-fx-register owns them).

## Scan: face axis vs frame centre, css px (+ = face right of centre). Test `node dev/test/mirror-center.js <url> <WxH@dpr>` (live DOM, close-up result, 'dep' look)
| viewport | close-up BEFORE (face - glass) | close-up AFTER |
|---|---|---|
| Fold 755x1000 | +66.1 (25.8 % of face width) | -0.1 |
| iPad 1180x820 | -58.6 (22.9 %) | 0.0 |
| iPad Pro 1366x1024 | -19.1 (5.9 %) | 0.0 |
| 412x1058 | +27.5 (19.7 %) | +1.0 |
| 390x844 | +34.4 (25.9 %) | -0.1 |
(before differs in sign by viewport because the plate crop moves; after: all <= 1 px, 'diem' look identical. Screen-centre offset after = glass offset.)

| frame (all 6480 portraits, offsets are systematic, face LEFT of centre) | BEFORE mean / p90 / max px | AFTER |
|---|---|---|
| makeup board glass 755x1000 (rx 189) | 23.5 / 38.7 / 63.6 | 0 (face axis = glass centre by construction) |
| board 1180x820 + 1366x1024 (rx 169) | 21.0 / 34.6 / 56.9 | 0 |
| board 412x1058 (rx 94) | 11.6 / 19.2 / 31.6 | 0 |
| board 390x844 (rx 88) | 10.9 / 17.9 / 29.5 | 0 |
| kitFaceZoom 200 px (sample only, no live caller) | 6.4 / 12.4 / 23.7 | 0 |
Other round frames found: small avatars (.kpor/md round crops, owned by toil-looks5) - not touched.

## Tests
- `node dev/test/mirror-center.js` (new, FAILs when |face - glass| > max(8 px, 3 % face width)): 5 viewports x looks dep+diem, bad 0, page errors 0.
- `bash dev/tools/quickcheck.sh HEAD --runs 3`: **QUICKCHECK PASS** 170 s, open 1704 ms, old save ok, core gates PASS, perf render 191/174, tab 401/349, buổi 1044/1030, tasks>200ms 17/15 (new/live).
- `node dev/test/toil-draw.js 755x1000@1`: PASS 10 (board still anchors on mk-fit, careful/sloppy hands, no mesh fallback, no page errors).
- Shots (CDN, delete after verdict): img/_review/mirror-center/after-755x1000.jpg, after-1180x820.jpg, after-1366x1024.jpg, after-412x1058.jpg (https://ctm-img.victoria-tntt.workers.dev/img/_review/mirror-center/after-755x1000.jpg etc.). I looked at 755 and 1180: face centred between the symmetric ring.
- KIT.md §60: FACE AXIS rule added.

## Caveats for the reviewer
- Glass centre x = 628/1200 is measured by eye on the painting (ring symmetric in the shots); if the plate is repainted, update `TOIL_PLATE`.
- Vertical placement is unchanged (the owner only reported left/right).
- The makeup board is shifted by up to ~20 px at iPad size toward the true axis; this is the same centring the owner asked for, but the reviewer may want to eyeball one board shot (my toil-draw shots had no CDN pictures, so the board itself was verified by number, not by eye).

START_CTX ~ 12 %, now ~ 30 % of window; no rollover needed.
