# owner-age-page (W66, 18/11)
Age-tab page: tabs 18/26/36/51 -> people with figures -> t1..t8 grid -> overlay with 3 outfits; "Bậc sau" rolls into the next person at t8.
- page.html: manifest inlined (`/*MANIFEST*/…/*END*/`); strips relative `<age>/<cNN>.webp`; princess/cung-nữ tabs (`x/`, `cn/`) kept from v9 (Foreman C publishes those files).
- build.sh: probe.py (HEAD all keys -> manifest.json) -> build.py (strips 1920x9200 webp) -> cdn_sync to CDN -> re-inject manifest into page.html. Rerun when painters add people.
- CDN: https://ctm-img.victoria-tntt.workers.dev/img/_review/owner-age-page/{a18,a26,a36,a51}/<cNN>.webp, manifest.json, shots/
- Strips: a18 c01–c32, a26 c03 c04 c12, a36 c03 c12 (c04 not yet painted), a51 c03 c04 c12 = 40. a18/c11.webp is 2.7 MB (slightly over 2.5).
- Shots: fold_*/ipad_* (1list, 2grid, 3over, 4next) at 755x1000 and 1180x820; no overflow, no page errors.
