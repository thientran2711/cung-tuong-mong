# review-minigame-frame-r1 (reviewer, SMALL tier)
Branch review/minigame-frame-r1 = review-diemtrang-fx-r1 (5926b17f) + origin/review/minigame-frame bd223466; index/sw/assets from main then site rebuilt. No conflicts in sources.
## Verdict: PASS
- kitGameFig/kitGameFrame(fig) in the kit part (j79); kg82Frame is the one door. Scan (own script, all 30 KG82 kinds via startContest): 1180x820 and 1366x1024 = .kgfig visible + picture loaded on 30/30, no .kgpic, no overflow; 755x1000 = 0 visible (no column on Fold), no overflow, 0 page errors.
- Điểm trang: no static mirror picture, no round disc, live figure (dress + colour rounds) on iPad; Fold = game full width. Black layer gone thanks to diemtrang-fx kmkl rename; the TEST-ONLY neutralising style the worker used was only in its shots (never in the repo: grep dev/test clean), nothing to remove.
- dev/test/minigames.js (dan) passes at 1180x820, 755x1000 (done, no overflow); 1366 covered by the scan. toilette.js 1180 + 755 pass; coop-e2e 59/59; QUICKCHECK PASS (196 s).
- Notes (not blockers): Fold colour round no longer shows her face preview (owner decision 21:30Z: Fold = game only). Pet-care game uses kitGameFrame without fig (not her). HUD "Phần 1.10/10" seen once on Fold dan (score float, pre-existing, not the frame).
