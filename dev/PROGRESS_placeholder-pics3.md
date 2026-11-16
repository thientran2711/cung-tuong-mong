# PROGRESS review/placeholder-pics3 (D46b, art worker)
Base: origin/review/opt-pics2-r1 (+ origin/main 4f5e5f3b3, already contained). Tool: dev/tools/missing_pics.js (3 fresh lives) -> dev/art/pp3/miss{1,2,3}.json.
Art: Magnific gpt-2-6 only, folder ba4aecfe-..., style refs: day If6wqwdtvE / night fHA471qCDY (cards), cplQijT0eP / s7o88xTl8e (banners); every image looked at. Prompts: dev/art/pp3/scenes.py. Ids: dev/art/pp3/gens.txt. On the CDN (cdn_sync.py).

## Pictures drawn (16 + 2 redraws)
| key | file | used by |
|---|---|---|
| opt-hoa-giai | act-opt-hoa-giai.webp | option "Hòa giải, mỗi người một phần" |
| opt-ran-day | act-opt-ran-day.webp | "Răn dạy, giữ phép cung" |
| opt-xu-nghieng | act-opt-xu-nghieng.webp | "Xử nghiêng về <name>" (any name) |
| opt-phan-gian | act-opt-phan-gian.webp | "Bảo hắn giả vờ nhận, làm phản gián" |
| opt-than-can | act-opt-than-can.webp | "Thăng làm người thân cận" |
| opt-tin-gia | act-opt-tin-gia.webp | "Thử lòng bằng một tin giả" |
| opt-tin-thuong | act-opt-tin-thuong.webp | "Tin hắn, thưởng an lòng" |
| opt-tra-xem | act-opt-tra-xem.webp | "Tra xem có kẻ gây ra không" |
| opt-thue-tho-theu | act-opt-thue-tho-theu.webp | "Thuê thợ thêu ngoài cung" (was the padlock opt-canh-giu) |
| bo-phan-la-h / moi-thai-y-bat-mach-h / sang-thai-y-vien-h / tat-h | act-<key>.webp | acts "Bỏ phấn lạ", "Mời thái y bắt mạch", "Sang Thái y viện xin bắt mạch", "Tát" (ACTS.json "acts") |
| q72-dong-tam / q72-dt-hen / q72-dt-thu | ev-<key>.webp 640x480 | dialogs q72:dong_tam, q72:dt_hen, q72:dt_thu (KIT_DLGMAP in jevban.js) |
| opt-de-thang / opt-noi-xau | act-opt-*.webp | "Khéo để ngài thắng sát nút" / "Khéo nói xấu một câu" (seen in life 2) |
Reused (looked at): "Nói thật, không thêm bớt" -> opt-thua-trinh, "Nói tốt cho X" -> khen-mot-cau-h.
dt_hen and dt_thu were redrawn once: first versions had a lavender/purple sleeve for the man (rule: men never purple). Final: navy / teal sleeve.

## Code
- dev/build/jopic.js KIT_OPT_RULES: 9 new rules at the TOP; "thuê thợ thêu" now before the old padlock rule (other "thuê thợ ..." titles keep opt-canh-giu).
- dev/build/jevban.js KIT_DLGMAP: 3 q72 entries.
- img/ACTS.json (CDN manifest): 4 act names -> keys (pulled, edited, pushed).
- BUG FOUND + FIXED (coordinator extra item, LUẬT SỬA CẢ NHÓM): dev/build/j79.js kpActName now carries the course for the buttons "Tự rèn" / "Theo ma ma giáo tập" (data-vlearn) and "Tự học" (data-learn): all Tứ đức cards showed Công's embroidery (act-ren-cong-h) because the bare name "Tự rèn" hit the first key of its prefix; all arts' "Tự học" showed the generic book. ACTS.json already had per-course keys (ren-dung-h, mama-ngon-h, tu-hoc-khuc-h ...), only the lookup name was wrong. No new art needed.

## Before / after
missing_pics, 3 fresh lives: option cards on placeholder 23/26/22 (before) -> 18/22/18 (after; all person-name titles except life 2's 4 extra non-person titles, fixed afterwards by the 4 rules above); acts on placeholder 4 -> 0 (lives 1-3); events 0 -> 0 (q72 dong_tam/dt_hen/dt_thu are not buildable in a fresh life, tool listed them in the older MISSING_PICS.md; now mapped). Rule-steal scan: a new rule at the top can only change titles that match it, so every string literal of dev/build/j*.js was matched against the 13 new regexes: 16 titles, all were on the placeholder before except "Thuê thợ thêu ngoài cung" (padlock -> embroidery frame); "Thuê thợ sửa mái/sửa gấp" keep opt-canh-giu. 0 page errors. Detail: scan outputs in dev/art/pp3/ (titles.json, scan.js, tud.js).

## Skipped
- Person-name choices (Phi/Quý nhân/Quý phi/Tần/Thường tại/Hoàng hậu X, ???, cung nữ, thái giám): portrait fallback by design.
- Events/acts of review/ev-art-fit, act-pics2: grep showed none of these 23 items covered there.

## Reviewer r1 (PASS)
Merged origin/main (a3dbdc19f); generated files rebuilt. Live ACTS.json valid, no key lost vs git copy; 18 pictures viewed (men navy/teal, none pink/purple); rule-steal scan old vs new rules over all j*.js strings: only "Thuê thợ thêu" changed from non-placeholder; kpActName only rewrites inside data-vlearn/data-learn buttons, other callers unaffected (non-learning acts keep keys); Tứ đức + arts cards distinct at 755x1000; q72 banners resolve (kitEvBanner own) ; missing_pics: events 0/309, acts 0/110, options 18, 0 errors.
