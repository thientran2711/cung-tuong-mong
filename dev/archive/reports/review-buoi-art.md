SẴN SÀNG KIỂM 70fcddacc46ad249865426483ba909f08aea7d76 (branch review/buoi-art, descends from origin/main) — 17 bands + 4 icons + MOON on tối band

SAMPLE READY v2 — dev/handover/reports/buoi-art/sample-sheet.jpg (icons redone as SQUARE tiles with thin gold-red border, 128 px, ~5 KB each; bands unchanged; +40 credits = 160 total)

# review-buoi-art (Foreman C art worker, branch review/buoi-art)
Sheet: top row = existing samples (thu, trungthu); middle row = NEW xuan (spring, pink blossom only, no gold petals) + NEW giaothua (festival); bottom = 4 buổi icons sáng / trưa / chiều / tối (round painted medallions on transparent, 160 px WebP ~9 KB each; shown big and at 64 px).
Credits: 3 images x 40 = 120. Magnific gpt-2-6, folder ba4aecfe. Bands 1080x360 WebP 21 KB / 28 KB.
Waiting for owner verdict via Foreman C; nothing mass-produced yet. Next after OK: ha, dong, newyear, nguyentieu, thanhminh, doanngo, phoenix, thattich, trungcuu, dongchi (10 pictures, ~400 credits), upload to CDN, wire BTR_ART + BTR_ICON=[1,1,1,1] on review/buoi-art.
Progress file: dev/PROGRESS_buoi-art.md on review/buoi-art.

## MOON on the tối band (owner ~18:58Z) — sample
Calendar in code: a month = 3 tuần (S.tuan 0/1/2), festivals use it (nguyentieu m1 t1, vulan m7 t1, trungthu m8 t1 = the middle tuần = rằm; giaothua m12 t2 = last). So: tuần 0 = thượng tuần, 1 = rằm, 2 = hạ tuần.
Painted sprites (gpt-2-6 on black, luma-cut, 192 px WebP 9-17 KB, 40 credits for the sheet): buoi-moon-{crescent,half,gibbous,full}.webp (local only until she OKs).
Proposed mapping at tối (S.buoi==3): tuần 0 = waxing crescent; tuần 1 = full moon; tuần 2 = waning half (mirrored sprite; lit on the left). gibbous spare (could mark day variation later). Giaothua tối (m12 t2): NO moon (stars + lanterns band). Bands that already paint a moon keep it, no sprite: trungthu, nguyentieu, vulan. thattich (m7 t0) gets the crescent by the rule (band has no moon).
Code only places/fades the sprite in the band (replaces nothing painted). Waiting for her verdict before wiring.


## MOON wired (SẴN SÀNG KIỂM 70fcddac)
jbuoi.js btrMoon(b,V,tuan): only at tối; S.tuan 0 = crescent, 1 = full, 2 = halfL (mirrored half, lit left). Festival bands trungthu / nguyentieu / vulan (own painted moon) and giaothua (no moon): no sprite, orb moon hidden (no double moon). thattich (m7 t0) gets crescent. Sprites on CDN img/fx/buoi-moon-{crescent,full,halfL}.webp (192 px, 9-17 KB); a thin dark glow keeps the crescent readable on pale bands. Test hook window.__btrVar.tuan.
Tests: dev/test/buoi-moon.js (10 cases: 3 tuần, other season, non-tối buổi none, 4 festivals none, thattich) at 755x1000 + 1180x820 FAIL 0; dev/test/buoi-art.js (17 bands + icons) FAIL 0; 0 page errors; 755x1000 screens viewed (crescent / full / half). Credits: +40 (moon sheet) = 720 total. Gibbous/half sprites made but not shipped (spare).