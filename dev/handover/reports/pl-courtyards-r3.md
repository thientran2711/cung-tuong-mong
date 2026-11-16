# pl-courtyards-r3 (worker, branch review/pl-courtyards-r3 @ 5425e4c1) — SẴN SÀNG KIỂM 5425e4c1

Base: review/pl-courtyards-r2 9e1e99f4 (= r1 8b4a2160 + single-hall ff05f03d) + origin/main 1aa0edb2 merged; index/sw/assets rebuilt (build_site.sh). Only dev/build/jpm.js (+ tests, KIT.md §76 note) touched; no j59.

## Fixes
1. r2 FAIL 1+2+3: kpmArt() returns ONLY the exact painted state (mourning tang-<buổi>; festival <lễ>-<buổi>; else <mùa>-<buổi>); no noon / nearest-buổi / xuan-sang fallback; map-fest alias only if it is the same buổi. Not painted -> null -> kpmMulti false -> Dư đồ tap goes straight to the hall (whole-palace view, plain "‹ Dư đồ"), same road as single-hall. Empty-palace tap also falls to the old handler.
2. OWNER ANGRY 21:36Z (labels on bare walls): audited all 6 courtyard pictures by eye (sheet of nhat-<dir>-xuan-sang + tang/festival samples). phi-cung, quy-cung, vinh-hoa, can-ninh, spare-cung = chính + both side halls. **nhat-cac = ONE pavilion, no side halls, no cung nhân row** (rank-3 Tần palaces + home "Ngọc Thanh các" were mapped to it). New KPM_HALLS table (jpm.js, outside the pl2_sync markers) lists the halls really painted per dir; kpmArt returns null unless EVERY hall of the place is in it. => Tần palaces and home now go straight to the hall (home's Dãy nhà cung nhân row is not reachable from the Dư đồ until painted).
   Origin of the file (for the owner): img/pl2/nhat-cac-* = Phượng Lệnh's own art (hotspots.json _src: repo thientran2711/phuong-lenh-art commit a9becbe, places/palace/nhat/x/L2/cac/); "cac" = a single-pavilion Các, not a 3-hall cung. Our rankDir maps rank 3 -> cac.
3. Foreman C's paintings are on the CDN (img/_index.json): 76 states in each of the 6 courtyard dirs (4 seasons + 17 festivals + tang, x4 buổi; the 299-row MISSING table is done) + 7 single-hall dirs (can-chinh, duc-tho, duong-hoa, garden, noi-thi, noi-vu, truong-mong, unused). Synced KPM_DATA.have from the CDN index (pl2_sync.py needs local files; I inlined the same result). Now 5 dirs show every festival/mourning state live; cac stays gated.
4. FAIL 4 (iPad back button on the left label): cause = the painting was still loading, .mapw had 0 height so all hotspots collapsed to the top under the "‹ Dư đồ" button. KIT fix: `.kpmv .mapw{aspect-ratio:1.76/1}` (one rule, whole courtyard group). Measured back-button vs every hotspot label on Fold 755x1000, iPad 1180x820 + 1366x1024, Fold cover 412x1058 x 6 dirs: 0 overlaps; screenshot while loading checked.

## Before / after (1728 cells = 6 dirs x 12 mo x 3 tuần x 4 buổi x mourning on/off; pl-courtyards-nostandin.js)
| | r2 | r3 |
| picture shown | 1728 (hundreds stand-ins) | 1440 exact painted, 288 null (all nhat-cac) |
| stand-ins | many (festival x~40/dir, all tang) | 0 |
| null on unpainted | 0 | tang/festival now painted in 5 dirs; only cac null |

## Tests (all on the built worktree, local server)
- pl-courtyards-nostandin.js (new): standIns 0, multiBad 0, errs 0.
- single-hall.js (updated: plain day, expect = kpmArt, home straight to hall on cac, back button): Fold 0 fails; iPad 0 fails on the last clean run (one earlier iPad run flaked on the hall-back check while 2 other test jobs ran in parallel; re-run alone passed).
- kit-conform 755x1000 + 1180x820: CONFORMS 89/93, MISSING 13/12, floats none (same class as before, no new).
- coop-e2e.js: 59/59 passed (both seats see same date/people; courtyard state comes from the shared date/festival/mourning).
- build_site.sh OK; quickcheck.sh: QUICKCHECK PASS · open 880 ms · old save ok · perf in band.

## For the coordinator / Foreman C
- TO PAINT: a 3-hall "cac" (Chính + Đông + Tây phối điện) for Tần-headed palaces, and a home courtyard with a visible Dãy nhà cung nhân building (home currently has no courtyard). After painting: replace the nhat-cac files / add a new dir + hotspots, update KPM_HALLS in jpm.js, python3 dev/tools/pl2_sync.py.
- Screenshots: scratch only, none uploaded.
- Handover: worker used ~35% context, no rollover needed.
