# kit-modal-spin — KIT KEEPER Group 1 (KP18 · KP16 · KP06), MAIN ROOT-77 queue
PRIORITY #1 CHECK: GAP_LIST KP18/KP16/KP06 + KIT_REQUESTS (16/11 suc-khoe-fix y-duoc, 17/11 review-cloud-del-r1, 18/11 life-preload b) | main: kitModal j79:310, KIT_ACT_CATS j79:743, jcloud dropAsk patch, jph picWait (a), jload lDlgWait | review/*: none for kitSpin / y-duoc | claims: this worker.

Branch `review/kit-modal-spin` @ 5a3cc86a (from origin/main 90b7e797, index/sw rebuilt).

## What
- KP18 (KIT §8.3): `kitModal` adds the existing class `kptitle` (z 55, j74) to a dialog opened while `#title` is up — one rule in the kit; the per-place patch in jcloud `dropAsk` is removed. In play nothing changes.
- KP16 (KIT §59.2): `kitSpin({s,label,cls})` (jph.js) = the ONE small spinner: 28 px / 18 px gold ring on the hair-line, turns at `--pace`, still breath under «Hiệu ứng: Gọn», not turning under reduced motion; label `CTM_WAIT.spin` (kwait.js). The life-gate dialog wait (`#modal.klifewait`, jload.js) now draws the SAME ring (pseudo-element) instead of showing nothing for ≤ 3 s.
- KP06 (KIT §6.1): act group «Y dược» (`KIT_CAT["y-duoc"]`, `#5d8a3c`, art `act-cat-y-duoc` is on the CDN) first in `KIT_ACT_CATS`; serving verbs («Hầu thuốc …», «Mang … thuốc men») excluded (stay Hầu hạ).
- KIT_REQUESTS rows (y-duoc, review-cloud-del-r1, life-preload b) → KIT READY / BUILT; kit page sample «§59.2».

## KP06 before → after (scan of all 337 act names of img/ACTS.json, dev/test/acts-names.json; only these changed group)
Bài thuốc dễ thụ thai giao-thiep→y-duoc · Báo tin có thai giao-thiep→y-duoc · Chữa bệnh cho con cham-con→y-duoc · Giả mang thai giao-thiep→y-duoc · Mua thuốc bổ buon-ban→y-duoc · Mời làm thái y tâm phúc giao-thiep→y-duoc · Mời thái y bắt mạch giao-thiep→y-duoc · Sang Thái y viện xin bắt mạch di-lai→y-duoc · Truyền thái y giao-thiep→y-duoc · Tự bào chế thuốc an thai giao-thiep→y-duoc · Tự bốc thuốc giao-thiep→y-duoc · Uống thuốc phá thai hai-nguoi→y-duoc · Xin chữa bệnh hoc-tap→y-duoc · Đến Thái y viện di-lai→y-duoc · An thai → y-duoc. Unchanged on purpose: Hầu thuốc Hoàng thượng, Mang chăn ấm, thuốc men (Hầu hạ).
(«Uống thuốc thúc sinh» is not in ACTS.json; the regex covers it.)

## Tests
- `node dev/test/kit-modal-spin.js` PASS (Fold 755x1000, iPad 1180x820; 20 checks: title dialog on the title layer and clickable, not in play; spinner sizes / animation / label / dialog-wait ring / reduced motion; Y dược set exact, nothing else moved).
- QUICKCHECK (`quickcheck.sh 5a3cc86a`) PASS · 224 s · core gates PASS · old save ok · perf render 219/260, tab 486/536, buổi 1756/1234 (noise, one run), tasks>200ms 21/21.
- Shots LOOKED @2 (CDN, delete with the verdict `cdn_sync.py --wipe-review kit-modal-spin`): https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-modal-spin/{fold,ipad}-{title-dialog,spinner}.jpg — a kitConfirm from the title screen above #title on both devices; the 28/18 px rings + the dialog-wait ring.
- golive.sh not run (auto-mode refused it; quickcheck.sh is its check).
