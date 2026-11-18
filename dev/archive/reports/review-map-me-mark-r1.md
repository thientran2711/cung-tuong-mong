PRIORITY #1 CHECK ('map-me-mark|kitMeMapMark|fit-all'): OD lines 12:12Z/12:20Z/12:25Z/12:30Z/12:35Z + 07:00Z/07:15Z read verbatim | reports/map-me-mark.md §1-§5 | brief s31-map-me.md | review/* : only review/map-me-mark.

# Review r1 — review/map-me-mark b62bd85f — PASS a86ea58c

Branch review/map-me-mark-r1 = b62bd85f + merge of origin/main 6ca04148 (3 generated files only: assets.json, index.html, sw.js, rebuilt) + one KIT.md note. a86ea58c has origin/main as ancestor.

## Results (host build, file:// harness, shots looked at: Fold 755x1000, iPad 1180x820, 1366x1024, all on the Dư đồ tab)
| check | result |
|---|---|
| zoom | fit-all default on all 3 sizes (Fold z .92, iPad .83, 1366 .83); +/- from there; 0 label overlaps at rest, +1, +2 (map-frame-kit PASS Fold+iPad) |
| fade | L/R wide, T/B thin, visible on all 3 sizes; courtyard unchanged and fine |
| flush pan | right end: map edge 570 vs column 572 (Fold); 1024 vs 1026 (iPad), 1187 vs 1189 (1366); labels under overlays at pan ends = 0 (Fold/iPad, rest + zoom1 end) |
| marker | .kmmapmk over her place, 28.9 px iPad, kmmBob loop runs; reduced-motion → animation none, same glow; static filter only |
| her place line | "Ta + 5 bóng · còn 4 khắc" seen on all 3 sizes; other places unchanged |
| weather | code path verified (kfStageRect returns .mapsc rect on the map tab, same wx layer). My harness spawns NO particles even in the room (n=0), so visual = worker's shot 1180x820-weather-r3 (mist + petals over the map, looked at). |
| KIT-FIRST | kit values only (KMAP_MLS, KIT_MEMARK.big, --kmv-*), KIT §85.7 + §41.2 written; no private chip/row |
| gates | map-full.js PASS 3 sizes (still passes: it measures the box, which is still 100 %, so no update needed); map-frame-kit PASS 2 sizes; 0 page errors; quickcheck.sh missing (local server denied) → not run |
| perf | tab render (act→go ×12) 99/90 ms vs live 87/81 ms = ~+10 %, ~9 ms per map render (extra mapFit + collision loop; event time, not per frame). Marker/weather add no per-frame cost over live. Accepted, noted. |

## Notes for main (not faults)
1. Fold at rest (= left pan end): labels "A ca sở" and "Đông cung" sit half under the right column — direct result of main's 12:48Z decision (full width under the column); both are clear at the right pan end. KIT §85.7 wording corrected to say so. If the owner dislikes it: hide labels that intersect the column at fit-all, show them on pan.
2. Collision rule also hides "fewer people" labels, not only .sm (main said .sm); same result, 15 of 29 on Fold, 23 on iPad, 26 on 1366.
3. Marker (rank 0 ice-blue) is pale on the pale paving: visible but not strongly contrasty; higher ranks are gold. Owner's call.
4. 412/390 not run (rotate gate). KIT page sample for §41/§85.7 still absent.
