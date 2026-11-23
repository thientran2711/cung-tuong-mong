# W5 offline-all — «Tải hết để chơi offline» (review/offline-all, 3bf27ac7)
PRIORITY #1 CHECK: reused jload.js getOne/kitProgress/storage.persist/estimate, sw.js ASSETS keys '<path>?h=<hash>', kitRows + .kslot/.kbtn (as Sổ mây), kitPanel. No existing offline-all feature on main/review/*.

## What was built (dev/build/jload.js, j74.js, jdfv.js)
- Thiết lập › new kit section «Chơi offline» (kitRows Tình trạng / Để làm gì + kit button «Tải hết để chơi offline»), same look as Sổ mây. Row words: Còn N tranh · khoảng X MB / Đang tải / Tạm ngưng / Đã tải đủ, chơi offline được / Có N tranh mới cần tải / Máy hết chỗ · đã cất X / Đường xa đứt.
- Tap → kit panel (kitPanel, kind notice, kptitle on the title): kitProgress (updates in place), rows Còn phải tải (words, «khoảng 4,2 nghìn MB») / Chỗ trống trong máy (storage.estimate; red + warning note when too small) / Cất sẵn; notes: «Nên dùng Wi-Fi», cellular/Save-Data note, iOS Safari separate-storage note, quota note; kit buttons Bắt đầu tải / Tạm ngưng / Tải tiếp / Lui (back to Thiết lập). No %.
- Download: all assets.json files not in ctm-assets (same keys as sw.js), figures+fx first then lazy; 3 parallel through getOne (4 tries); yields to the life set like the fig pool; skips files in flight; 404/403/410 file = skipped + remembered (per manifest v), never stops the rest; 8 failures in a row = «đường xa chập chờn». storage.persist() at start.
- State in localStorage `ctm-offall` {on,paused,done:<v>,dead}: reload resumes by itself (after entry screen, +6 s); paused stays paused after reload; offline stops cleanly, `online` resumes; QuotaExceededError stops with notice + how much was saved.
- Later build: plan is a diff vs the cache → «Có N tranh mới cần tải», only changed files fetched.
- Small fix outside scope (needed): jdfv.js dfEncOn crashed on the title when S is undefined (any kitPanel/showModal on a fresh title) → `!!S&&`.
- Words: owner's own label «Tải hết…/Bắt đầu tải/Tải tiếp» and MB are used (OD 23/11 ~23:35Z) although VANPHONG waiting-lines say thỉnh/no MB.

## Tests (all run, dev/test/offline-all.js, fake 40-file manifest on a local server, built site, SW on)
34/34 PASS: plan (left, row words), run (3 at a time, 40 keys = manifest keys, done), pause (no requests while paused, remembered), reload paused→Tải tiếp, reload mid-way auto-resume, offline mid-way → state offline → online resumes → done, offline reload: lazy files answer 200 right size from the SW cache, new build (v2: 4 changed) → row «Có 4 tranh mới cần tải» + only changed files fetched, 404 skip, quota (Cache.put throws) → stop + saved notice, low-room warning, no page errors. Shots (looked at, Fold 755x1000 + iPad 1180x820): row idle/done/new, panel idle/run/done/lowroom/quota. Also: kit-progress-run 36/36, ios_install_first ALL PASS, oldsave-r1 16/16. status-icon.js crashes identically on origin/main (pre-existing, unrelated). "quickcheck" script not found in repo — substituted by the three tests above.

## Limits / notes
- NOT tested on a real 4.4 GB download or a real iPad: Safari (non-installed) may evict cache after ~7 days and its quota is smaller; panel warns. Chrome/Android quota is a share of disk — estimate shown. If Safari throws a non-QuotaExceededError name, the run ends in «chập chờn» not «hết chỗ» (UI tells her to retry).
- Planning 32 000 files = 32 000 small cache lookups when she opens Thiết lập (12 parallel, yields); expect several seconds on a phone, row shows «Chưa tải hết · chạm để xem».
- sw.js unchanged (only rebuilt). Main still needs go-live rebuild by coordinator.
## Handover (if rolled): nothing pending; START_CTX not measured.
~95% xong / ~90% chơi được
