# popup-fullbody-r1 — REVIEW RESULT: PASS (round 2) 18fb8252

Branch review/popup-fullbody-r1 @ 18fb8252 descends from origin/main dd87e0eb (main + popup-fullbody + reviewer fix jkpc.js + worker round 2 afe5a023). KIT.md conflict resolved keeping both §50.2/50.3 and §81.

Round 1 FAIL (compact collapse to 84px; no picture on ĐIỀU/LUẬT/BÁO/KẾT QUẢ/ĐÊM/intel; weak tests) = all fixed: jkpc keep-big (reviewer), kitDefaultBanner per kind + stricter asserts (worker).

Checked (screenshots looked at): popup-fullbody.js 755x1000 / 1180x820 / 1366x1024 / 844x390 = 0 FAIL (39 OK, 2 INFO); 412x1058 = Xoay ngang overlay by design. One frame size per viewport for ALL kinds incl. tutorial pages 1-4, spotlight steps and tip: 560x700, 560x574, 620x717, 560x358. Full-body left, picture right top, no small portrait, no clipping in ĐIỀU, BÁO, mật báo/intel, tutorial steps (waited 40s: figure visible every step). kit-conform 755x1000: 84 CONFORMS, 0 MIXED/CUSTOM; small-portrait form = FAIL in code (kit-conform.js line 36, T4). coop-e2e 59/59 passed. Nhập cung group panel out of scope (coordinator).
Notes (not FAIL): first paint of a figure waits for CDN measure (a few s, empty column meanwhile; PEND:shop WARN at 1180/1366 in one run, passes alone); kit-conform lists 15 MISSING cases (place cards, contest, cold-palace) = cases not opened, exit 0, pre-existing.
