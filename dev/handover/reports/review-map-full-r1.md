# review-map-full-r1 (reviewer map-full r1, 11/17/2026)
PRIORITY #1 CHECK: report map-full read | OD L133/L1410/L1433 + 17/11 ~03:52Z read | claims map-full READY | review/*: review/map-full 44f65e81 + review/app-edge 5a842f58 (trial merge done) | nothing new built.

Reviewed review/map-full @ 44f65e81. It was based on an old main (7abaf07a), so I merged current origin/main (bad6d59f) -> review/map-full-r1 @ 29131677 (only index.html / assets.json / sw.js conflicted, generated, rebuilt with dev/site/build_site.sh).

Scan (node dev/test/map-full.js, run by me): PASS at 755x1000, 1180x820, 1366x1024, 412x1058, 390x844 (+ 1500x700, 1000x755 with app-edge). Map = 100 % of the page width and height on the palace map and the courtyard level; tools row, #krail, #kshR are overlays inside the map; no horizontal scroll. Shots looked at by me (Fold map + courtyard, 1180 map + courtyard, 390 map, 412 courtyard, 1500x700 with app-edge); not committed. 390x844 and 412x1058 show the portrait "Xoay ngang" prompt (by design).
Pan/zoom: palace map scrolls both ways; at scrollLeft=0 nothing sits under the left rail or tools row, at max scrollLeft nothing sits under the right column => every palace hotspot can be brought clear of every overlay by panning.

Trial merge with review/app-edge (5a842f58): clean source merge (rot.js + KIT.md auto-merged; index/assets/sw rebuilt). Scan PASS at 755x1000, 1180x820, 412x1058, 1500x700, 1000x755: map still 100 % of the page; on 1500x700 the canvas is wider, no side bands, map edge to edge.
Quickcheck (r1 29131677 vs live bad6d59f): PASS, core gates PASS, time-spill PASS, old save loads + plays a buổi, perf render 267/257 ms (+3.9 %), tab 292/347, buổi 809/904, tasks>200ms 12/12.

Residuals (not blocking, for a follow-up):
1. Palace map default view (755x1000): Càn Ninh cung and Dưỡng Hòa điện labels start under the right column (cx 694-697 > column left 572); 1180x820: Diên Huy, Vĩnh Hòa under it. Reachable by one pan; initial scroll could bias away from the column.
2. Courtyard level at 1180x820 (painting fits the page width, no pan): "Đông phối điện" label is partly under the left rail, "Tây phối điện" label under the right column. All three halls stay tappable through the three overlay rows at the bottom (40 px). At 755 the Chính điện / Đông labels are off-screen, pan reaches them.
VERDICT: PASS 29131677 | with app-edge: clean
