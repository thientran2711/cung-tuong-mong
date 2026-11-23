# ROOMS2 — 13 toilette room plates: window drapes off (L30 structure-true, owner L2391/L2392 + C6 brief 03:25Z "thay luôn")
START_CTX ~3 % (own estimate) · worker of ROOT-C6 session_01D3E3NbR3sDtAqDLRspEis7 · branch review/rooms2 @5355780d
PRIORITY #1 CHECK ('toil-room|toil-mirror|toilette'): OD 3 | ledger 4 | claims 4 | main 15 | review/* 3 | archive 78 — reused: the 13 live CDN plates (KIT_REQUESTS on review/toil-room-art, 16/11), no new pictures drawn; main uses only img/toil-mirror-room.webp (jtoil.js reveal plate), the per-rank plates wait for review/toil-room-rank (not built).

## Group (fix-the-whole-group)
PLACES4 listed 13 (toil-mirror-room + c1..c8 + maid2..maid5). Findings on looking:
- toil-mirror-room == toil-room-c5-phi (same picture, mean pixel diff 0.66) → ONE edit, written to both keys.
- toil-room-maid1-thosu ALSO had sheer drapes at both edges (PLACES4 said "no") → included.
- So 13 unique pictures edited, 14 CDN keys swapped.

## Method
EDIT of each live plate (uploaded to Magnific from the CDN), gpt-2-6, 2k 3:2 (3072x2048), folder ba4aecfe…, 135 cr each. Prompt: change ONLY the fabric drapes at the far left/right edges (in front of the windows) → the same window's lattice continues with translucent glowing paper; where a drape covered wall/pillar continue it; keep everything else (mirror + its reflection, screens, table, stool, lanterns, vases, top valance, walls, columns, windows, floor, light); no new window/opening, nothing opened. Resized 1200x800, webp q88 (88–248 KB, all ≤ the old size except c1 +2 KB, c5 +7 KB).
toil-mirror-room / c5: the original mirror area (x 470–790, y 0–500, 8 px feathered seam) pasted back over the edit so the measured mirror axis stays 630/1200 (the edit's re-rendered reflection made dev/test/mirror-center's symmetry estimator read 639; frame axis was 629 in both). Looked at the seam: invisible.

## Result (OLD → NEW, all looked at; sheet https://ctm-img.victoria-tntt.workers.dev/img/_review/rooms2/L2391-toil-old-new.jpg)
| key | gen id | structure check |
|---|---|---|
| toil-mirror-room + toil-room-c5-phi | VXJfRhjMMU (+ old mirror area) | left sheer drape + tie-back gone → the lattice window that was behind it continues; red column, table, lantern, screens, mirror, valance, right lattice window identical; no new opening |
| toil-room-c1-dapung | LwIiFcNswO | both drapes gone; left lattice window (seen through the sheer) continues to the edge; column, screens, mirror, table identical |
| toil-room-c2-thuongtai | huArDOpvqL | both drapes gone; lattice windows L/R continue; everything else identical |
| toil-room-c3-quynhan | 1lX4CW0r4r | same as c2 |
| toil-room-c4-tan | LwIiFDSswO | both drapes gone; lattice L/R continue; a dark wall post shows at the bottom-left edge where the drape hung (wall continued, not a window) |
| toil-room-c6-quyphi | huArDNovqL | both drapes gone; lattice L/R continue; phoenix mirror, screens, table identical |
| toil-room-c7-hoangquyphi | 1lX4CMor4r | both drapes gone; lattice L/R continue; red pillar continued bottom-right |
| toil-room-c8-hoanghau | cpUhisA0eP | red brocade phoenix drapes gone; lattice L/R continue; top valance kept (not at a window) |
| toil-room-maid1-thosu | 1lX4CeXr4r | both sheer drapes gone; plain lattice windows L/R continue; plain wall, screens, oval mirror, table identical |
| toil-room-maid2-cungnu | jU86Q8VLD0 | same as maid1 (bamboo screens) |
| toil-room-maid3-daicungnu | yiQWjH5PW9 | both drapes gone; lattice L/R continue; blue screens, mirror, valance identical |
| toil-room-maid4-chuongsu | DoyEAivpcl | same; orange screens identical |
| toil-room-maid5-nuquan | 4RH0srr9Aa | same; lilac screens, book shelf identical |
Alignment: shift test on the mirror area (±10 px) = 0 for every picture (no layout move; the reveal's --ktpx/--ktpy/gx stay valid).
Note: the reflection INSIDE the mirrors still shows a red drape by a window (reflected room, kept unchanged as the original; the zoom covers it with her face). Not touched on purpose (no structural change asked there).
Rollback: the 13 originals are on Magnific (EbWld2MuuO c5/mirror, lJmRFBHgv9 c1, dt9FGyuXSL c2, DoyEZO8pcl c3, 5jpOmpOKxe c4, MBOCRybDCm c6, 1lX4aomr4r c7, Syv2qEwUb8 c8, Syv2quPUb8 maid1, 79CzKqvJAL maid2, xSoNCaHjfW maid3, xSoNCCRjfW maid4, 4RH0jLl9Aa maid5).

## Swap (done, owner 03:25Z "tranh vẽ xong rồi thì thay luôn")
cdn_sync of the 14 keys (md5 checked against the live CDN: 14/14 OK). review/rooms2 @5355780d = origin/main + assets.json (the 14 entries' md5[:16]/size + v), so sw.js / jload refetch them; any rebuild of assets.json gives the same (it reads the CDN index).
LOOK both devices (live site, the CDN plate): dev/test/mirror-center.js PASS 755x1000@2 (dc 2.2 / 3.9, mean 3) and 1180x820@2 (dc 0 / 2.4, mean 1.2), plate axis 629.5, 0 page errors. Shots: img/_review/rooms2/live-reveal-fold-ipad.jpg (before zoom: lattice windows, no drapes) + live-zoom-fold-ipad.jpg.

## Cost
13 × 135 = **1 755 cr** (pilot c5 + 12, 0 redo; the 14th key is a copy of c5). Balance before: 2 778 266.
