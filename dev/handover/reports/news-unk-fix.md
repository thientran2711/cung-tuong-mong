# NEWS-UNK-FIX report (worker, MAIN 136)
PRIORITY #1 CHECK: OD 10 | ledger 3 | claims 8 (rel-men-servants FAIL «stranger name ???») | main jnotice.js kitNoUnk/kitNoUnkT/kitNoUnkDom + j61 k61Mask plain | review/* none | claims none. Reused the existing mask; NO new mask.

Branch review/news-unk-fix @ 653db52a53509a1318af8ccfea3b83c5eacf6cb1 (based on origin/main 9f72524b). Files: dev/build/jnotice.js (1 line), dev/test/news-unk.js (new). index.html/sw.js NOT committed (lander rebuilds).

## Root cause
jnotice.js `plain()` stripped html tags AFTER kitNoUnk ran. kitNoUnk protects name chips (`<b class="kname"><span class="kti">Đáp ứng</span> ???</b>`), so after the strip the chip became bare prose «Đáp ứng ???». Feeds: kitNotice line/text/items, kitKnow lines, the tin-bao text «<người> báo: <line>» (tbHook uses plain(it.line)) = the E-S7 «nô tỳ nghe thái giám ??? kể» / «Đáp ứng ??? bán bớt đồ» / «??? múa trong yến tiệc».

## Fix (one place)
`const plain=s=>kitNoUnk(String(s).replace(/<[^>]+>/g,"")...)` — every notice line/text/item and kitKnow now run kitNoUnk on the PLAIN text (→ «một vị <phẩm>», k61Mask plain wording). Name chips on cards / stage labels untouched (test asserts kitName still prints «???»).

## Scan (dev/test/news-unk.js) before / after (same seed 3596068797, Fold 755x1000 + iPad 1180x820, real touch tap on «!»)
| surface | before | after |
|---|---|---|
| notice.line (kitNotice) | «Nghe nói Phi ??? gặp kỳ ngộ với Tần ???…» | «Một vị Phi …» 0 |
| notice.text / items | same ??? | 0 |
| top chip #kntchip + toast (iPad) | ??? | 0 |
| tin-bao text «<người> báo: …» | ??? | 0 |
| «Tin báo» dialog rows (real tap) | not opened in old harness | Fold 21 rows, iPad 32 rows, 0 «???» |
| S.logs / log() | masked already (k61Scrub) | 0 |
| dialogue pushModal text | masked at showModal (kitNoUnk) | 0 |
| name chip kitName (card/stage) | ??? | ??? (kept, by design) |
| live bot 6 months × 2 devices: notices, logs, #modal, #panel, chip | – | 0 hits (name plates .knr/.kname allowed) |
Static: 121 tag-strip sites in dev/build; only jnotice plain() is a display path that strips AFTER the mask; the rest go through log()/showModal()/kitNotice()/render() which all run kitNoUnk (live scan proves).

## Gates (all on the rebuilt site)
news-unk.js PASS 0 hits · know-notice.js fold+ipadAir bad 0 · name-mask-scan.js index.html 755x1000 12 months PASS 0 hits · notice-scan.py routed.
Screenshot pair (Fold + iPad, Tin báo open, real tap): CDN img/_review/news-unk-fix/pair.jpg (reviewer/main wipes: python3 dev/site/cdn_sync.py --wipe-review news-unk-fix).

## Not done / notes
- Tin báo ✕/close unreachable on long lists = KK26 KIT BUG #3 (not this branch; the pair shows no ✕ on the iPad panel).
- Context used: low; no rollover needed.
