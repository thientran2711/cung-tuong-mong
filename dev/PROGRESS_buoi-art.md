# PROGRESS buoi-art (branch review/buoi-art, on review/anim-pace)
- Owner approved sample v2 (16/11). All pictures on CDN img/fx/ (not in git): buoi-band-{xuan,ha,thu,dong} (4 seasons) + buoi-band-{newyear,nguyentieu,thanhminh,doanngo,phoenix,thattich,trungthu,trungcuu,dongchi,giaothua} (10 festivals of FEST j31) + EXTRA festivals found in j31's second table: vulan, vantho, lapbat (bands made, BTR_FEST entries added); buoi-ico-0..3 (square tiles 128 px).
- Wiring (dev/build/jbuoi.js): BTR_ART lists all 17 keys, BTR_ICON=[1,1,1,1]; festival band wins on a festival day, else the season band (artKey logic from anim-pace).
- Test: dev/test/buoi-art.js (forces all 4 seasons + 13 festivals, checks band file + icon file per buổi, 755x1000 + 1180x820): FAIL 0, 0 page errors.
- Credits: 40 x 17 images/sheets used (xuan, giaothua, icons x2, 13 more) = 17 x 40 = 680.
