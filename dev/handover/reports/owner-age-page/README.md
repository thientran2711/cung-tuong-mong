# owner-page-90 (W73, 18/11) — "90 nhân vật nữ"
PRIORITY #1 CHECK: reused owner-age-page v13 (page.html/build.py/probe.py), FIGURES list on CDN img/FIGURES.json, file names fig-<role>-<id>-<state>-<age>.webp (states: kc thiếu nữ, ngheo, tm1-4 trung y, tcold/cold lãnh cung, plain cung nữ, t1-8 maid ranks).
- Page: page.html (title "90 nhân vật nữ"; one pool c01–c32 + m01–m52 + công chúa/mẫu lên phi). Per person+age: row "Thiếu nữ · Nhà nghèo · Trung y 1-4 · Lãnh cung" then ranks. "Bậc sau" walks states -> ranks -> next person. Quốc tang 4th cell where q/<age>/<cNN>.webp exists (only c03 a18 now). Missing = not shown. Nhà nghèo exists only at a18 (CDN has no other age).
- Files to publish (relative to page): page.html, s/<age>/<id>.webp (336 sheets, 320x570 cells in a row, ~88 MB total: publish per age: s/a18 first, then a26, a36, a51), q/a18/c03.webp, + existing a18..a51/<cNN>.webp strips, x/, cn/.
- CDN copy: https://ctm-img.victoria-tntt.workers.dev/img/_review/owner-age-page/{s,q,shots,manifest90.json}
- Rebuild: build90.sh (probe90.py -> states90.json, build90.py). Shots: shots/p90_{fold,ipad}_*.png.
- Handover: nothing pending.
