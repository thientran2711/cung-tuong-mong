# PROGRESS buoi-art (branch review/buoi-art, on review/anim-pace)
- Owner approved sample v2 (16/11). All pictures on CDN img/fx/ (not in git): buoi-band-{xuan,ha,thu,dong} (4 seasons) + buoi-band-{newyear,nguyentieu,thanhminh,doanngo,phoenix,thattich,trungthu,trungcuu,dongchi,giaothua} (10 festivals of FEST j31) + EXTRA festivals found in j31's second table: vulan, vantho, lapbat (bands made, BTR_FEST entries added); buoi-ico-0..3 (square tiles 128 px).
- Wiring (dev/build/jbuoi.js): BTR_ART lists all 17 keys, BTR_ICON=[1,1,1,1]; festival band wins on a festival day, else the season band (artKey logic from anim-pace).
- Test: dev/test/buoi-art.js (forces all 4 seasons + 13 festivals, checks band file + icon file per buổi, 755x1000 + 1180x820): FAIL 0, 0 page errors.
- Credits: 40 x 17 images/sheets used (xuan, giaothua, icons x2, 13 more) = 17 x 40 = 680.

## MOON on tối band (owner 16/11 ~18:58Z, sample approved by Foreman C)
- Calendar: month = 3 tuần (S.tuan 0 thượng / 1 rằm / 2 hạ). jbuoi.js btrMoon(): tối only; tuần 0 crescent, 1 full, 2 halfL (mirrored half, lit on the left); bands that paint their own moon (trungthu, nguyentieu, vulan) or have none (giaothua) show no sprite and the orb moon is hidden (never two moons). Sprites on CDN img/fx/buoi-moon-{crescent,full,halfL}.webp (192 px, 9-17 KB). Test hook window.__btrVar.tuan.
- Tests: dev/test/buoi-moon.js (10 cases x 755x1000 + 1180x820) FAIL 0; dev/test/buoi-art.js FAIL 0. Spare art not shipped: half, gibbous.
