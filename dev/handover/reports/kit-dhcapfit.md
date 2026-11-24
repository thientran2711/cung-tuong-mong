# KIT §82.2 K-DH-CAPFIT — KIT READY (KIT KEEPER #15 · session_01Rc5AsMbPqcNeJHzx3HWT6V · for MAIN 115) — 24/11
START_CTX ~4 % (own estimate of a 1M window; get_session reads 0).
PRIORITY #1 CHECK: KIT_REQUESTS K-DH-CAPFIT (E55, review/titles2 537091a1) | main kitDhCap jdh.js:165 + kitTitlePlate jtitle.js:29 (LIVE parts, fixed in place, nothing new built) | review/* none for capfit | claims KK15 row.
BRANCH: review/kit-dhcapfit @e6d28d21 (from LIVE 2a80712b; merges clean on LIVE 4a8c627b). Files: jtitle.js, jdh.js, jk2b.js, KIT.md §82.2, KIT_REQUESTS.md, dev/test/kit-dhcapfit.js. Built files not committed (lander rebuilds).
## What changed (in the kit parts, no per-screen variant)
- `kitTitlePlate` .kdh (ONE plate, every place): one line while the name fits; a box narrower than the one-line name wraps BETWEEN words, balanced (text-wrap:balance), same font/plate/effects. Where it fits nothing changes.
- `kitDhCap` caption on the event picture (all title dialogs + TITLES2 notice): plate up to picture width − 8 px, padding 8 px, `kdhCapFit` keeps it to ≤ 2 lines (font .74 → .66 → .6 rem, KDH_CAP_FS).
- Sibling caption on the picture `.ksart-tag` (quest tags): same wrap rule.
## Group scan / before → after (Fold 755x1000 + iPad 1180x820; picture column 120 px on both)
| case | before | after |
|---|---|---|
| caption «Khuynh quốc khuynh thành», «Đón thuyền đồng hương», «Phượng hoàng niết bàn», «Hiền lương thục đức», «Quốc sắc thiên hương», «Nhẫn nhục phụ trọng» + longest LIVE «Phượng minh thiên hạ» | text cut both sides (7/7 per device) | 2 lines inside picture (7/7) |
| short «Hiền đức» | 1 line | 1 line |
| plate in a 60 px box | name runs out of plate | wraps inside |
| .ksart-tag long tag in 90 px picture | 149 px, past picture | 76 px, inside |
| stage tags + Danh hiệu panel with longest title worn | ok | ok |
`node dev/test/kit-dhcapfit.js dev/index.html`: before 8/26 → after 26/26. Regression: fig-tag-fit (Fold+iPad) CUT 0 before and after; title-tag / title-sys / title-sys2 / kit-opt-title-wrap same results before and after (their pre-existing fails unchanged, not caused here). 0 page errors.
## Shots (full screen, Fold left + iPad right, @2; looked at) — wipe after review: `python3 dev/site/cdn_sync.py --wipe-review kit-dhcapfit`
https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-dhcapfit/after-khuynh.webp · https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-dhcapfit/after-donthuyen.webp · https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-dhcapfit/after-phuonghoang.webp · https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-dhcapfit/after-hienluong.webp · before: https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-dhcapfit/before-khuynh.webp
## For Foreman E (TITLES2)
Nothing to change in jdh3: the notice uses kitDhCap, so after this lands the plate fits. E55's titles2-ui.js WARN K-DH-CAPFIT line should go quiet once review/titles2 is merged over it.

## REVIEW r1 (sonnet reviewer-lander session_01N1tNP3VEPfzDnytmKioybP · 24/11)
START_CTX ~3 %. PRIORITY #1 CHECK: OD 0 | ledger 0 | claims KK15 | main kitDhCap jdh.js:165 + kitTitlePlate jtitle.js:29 | review/kit-dhcapfit e6d28d21 | KIT_REQUESTS K-DH-CAPFIT.
Branch review/kit-dhcapfit-r1 = e6d28d21 + merge LIVE 4a8c627b (clean) + rebuilt index.html/sw.js/assets.json → 9b487835ad2bba99bb1fa5b4ce1d288461b9c244.
| check | result |
|---|---|
| Merge newest origin/main, rebuild | clean merge; build OK; built files committed (sha holds its own build) |
| Consistency scan, every kitDhCap / kitTitlePlate place (laws 9/10/11) | ONE plate rule in jtitle.js .kdh, caption fit in jdh.js kdhCapFit, sibling .ksart-tag in jk2b.js; users: title dialogs + TITLES2 notice (kitDhCap), stage tag kitTitleTag3/j59, Danh hiệu panel rows, jmb/j79 slots, kesf figure, NPC tag; no per-place variant, no private CSS |
| node dev/test/kit-dhcapfit.js | 26/26 (Fold 755x1000 + iPad 1180x820), 0 page errors |
| quickcheck | PASS 203 s · core gates PASS · time-spill PASS · open 1683 ms · old save loads and plays a buổi · perf new/live render 191/228, buổi 1166/1209 |
| Old save | save made by LIVE build loads on r1, name kept, title dialog caption works, 0 errors |
| Shots Fold + iPad, full screen, each looked 3× (law 12) | title dialog «Khuynh quốc khuynh thành» both devices: 2 lines inside picture, nothing cut; stage tag both devices; Danh hiệu panel both devices: OK |
| Wording (law 7) | no new player text, no % |
Note (nit, not a fault): iPad stage, longest title worn by her → plate now 2 lines (57→71 px tag stack, bottom 761 vs stage bottom 764, inside). Before: name ran out of the plate into the rival's tag. Better now, tight by 3 px; only the longest names.
Verdict: **PASS** 9b487835ad2bba99bb1fa5b4ce1d288461b9c244. Shots were scratch only, nothing uploaded to the CDN review folder (nothing to wipe).
