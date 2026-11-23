# REVIEW-KP23SWAP (session_01D3E3NZy3eunXtCWLxBvXyv) — PASS review/kp23-swap @7e2d4e6d9
Branch parent = current main f7016b8d (fast-forward). START_CTX low, depth: reviewer child of ROOT-C8; no rollover needed.
- ACTS.json diff 29cc02d2^..29cc02d2 walked structurally: exactly 63 log-rule values `<k>-h`→`<k>`; set == owner new= (63/63, none missing/extra); 0 of the 79 old= touched; unticked 52 untouched.
- jopic.js: 8 option rules + KIT_ACT_ALIAS "Soát đồ" → kiem-tra-ruong = the 9 keys (chep-kinh, giau-trong-ruong x2, gui-bac-chua-benh, im-lang, kiem-tra-ruong, o-yen-nghi x3). Other -h keys on the same lines unchanged.
- CDN: all 63 img/act-<key>.webp = HTTP 200 (curl; python urllib UA gets 403, not a fault).
- Diff minimal: ACTS.json, jopic.js, index.html, sw.js, assets.json (generated) + dev/art/kp23/* history page + cdn_sync TYPES+=html. No kit/frame change.
- Look: branch index.html + branch ACTS.json intercepted, Fold 755x1000 and iPad 1180x820: kitActKey → an-cu-duoc-lat / bi-giang / im-lang, 3 images load (384px wide), 0 page errors; looked: wide scene, back view, hands close-up, no faces. Did not drive a real event popup.
## ⚠ LANDER WARNING — do NOT blind-cp
Live CDN img/ACTS.json has 337 `acts` vs 332 in the branch manifest (CDN-only: Hắt nước, Hắt trà, Quạt mực, Nhờ thái giám tìm thú nuôi, Hối lộ Kính sự phòng). `cp` would drop them. CDN `log` == old manifest log, so only `log` needs replacing.
## Lander steps
1. FF main to 7e2d4e6d9 (or its descendant).
2. Patch live file, keep CDN acts: `curl -s https://ctm-img.victoria-tntt.workers.dev/img/ACTS.json -o img/ACTS.json && python3 -c "import json;c=json.load(open('img/ACTS.json'));c['log']=json.load(open('dev/art/manifests/ACTS.json'))['log'];json.dump(c,open('img/ACTS.json','w'),ensure_ascii=False)"` then `python3 dev/site/cdn_sync.py img/ACTS.json`; do not commit img/ACTS.json.
3. Verify: curl the CDN ACTS.json, count log values ending -h for the 63 keys = 0, acts = 337.
