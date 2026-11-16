SẴN SÀNG KIỂM 80048c85976b2172b34bc1d15585914eb1d7c923 (branch review/buoi-art, descends from origin/main)

# review-buoi-art (art worker for Foreman C)
Owner approved sample v2 ("ok", icons stay). Done:
- Bands on CDN img/fx/ (1080x360 WebP, 20-48 KB each, viewed all): 4 seasons xuan, ha, thu (existing), dong; festivals newyear, nguyentieu, thanhminh, doanngo, phoenix, thattich, trungthu (existing), trungcuu, dongchi, giaothua. EXTRA festivals found in j31's second FEST table: vulan, vantho, lapbat → bands made + BTR_FEST entries (tint + sprites) added. Total 17 bands.
- 4 buổi icons buoi-ico-0..3.webp (square tiles, 128 px, ~5 KB) on CDN. No new kit slot needed (BTR_ICON slot from anim-pace; BTR_ICON=[1,1,1,1]).
- Wiring (dev/build/jbuoi.js): BTR_ART = all 17 keys; festival band on a festival day, else season band (existing artKey logic); icon before the buổi title. Build files regenerated (index.html, sw.js, assets.json).
- Test dev/test/buoi-art.js: forces all 4 seasons + 13 festivals, checks band file + icon file per buổi at 755x1000 and 1180x820: FAIL 0, 0 page errors; screens at 755x1000 viewed (xuan, dong: band + square icon + title OK). 1180x820 DOM-checked, screen not viewed.
- Spring = flower petals only (no gold). Credits: 17 generations x 40 = 680 (incl. 1 redo of icons). Files not in git (CDN only).
- Notes: festival bands show on any buổi of that festival day (e.g. giaothua night band also at sáng if the festival spans); looks fine as the festival look. Optional later: per-festival title seal.
