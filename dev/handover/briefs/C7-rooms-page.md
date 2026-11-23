# C7 ROOMSPAGE brief (ROOT-C7, 23/11 ~18:45Z) — worker ROOMSPAGE (sonnet), 0 credits
OWNER (verbatim, this chat ~18:44Z): "Trước khi làm á, gửi cho tôi cái link HTML của tất cả các cái phòng mà mình đã vẽ lại theo hướng trực diện mà bỏ rèm cửa sổ gì đó, đưa cho tôi duyệt lại một lần nữa. Tôi nói với chat chính ngày hôm qua rồi."
PRIORITY #1: reuse the KP23 compare page tool (review/kp23-compare @b2101239, dev/art/kp23/) — same look, tick boxes, localStorage, «Gửi lựa chọn» copy button, lazy-load.
CONTENT (one page, all pictures full width, big readable Vietnamese name under each, code + key small):
 Section 1 — Phòng các cung (trực diện, vẽ lại): every distinct room in CDN img/_review/place-rank/pr13/*.webp (65 rooms; if a room has -rN retries, show ONLY the highest rN = latest). Vietnamese name from dev/art/place-rank/prompts_roompf1_*.json / prompts_pr*.json 'name' fields or MA_HINH.json (e.g. "Chung Tú cung · Phi · tiếp khách").
 Section 2 — Nơi chốn (trực diện, vẽ lại): every distinct place in img/_review/place-rank/places-l2370/ (latest rN only; 20 places) + mark the one live now.
 Section 3 — Phòng đã gỡ rèm hôm nay: ROOMS1 (16 consort bases) + ROOMS2 (13 toilette) — keys in dev/handover/reports/ROOMS1.md / ROOMS2.md; show live img/<key>.webp.
 Under each picture two big ticks: «Duyệt» / «Không duyệt» (default none) + a short note box. Button copies "ROOMS PICK: ok=<codes…> no=<codes…> notes=<code:note…>". Show counts.
 For each picture, a small automatic hint line is NOT needed — the owner judges curtains herself.
HOW: generator script + page in git at dev/art/rooms-page/ (branch review/rooms-page off origin/main); upload page with cdn_sync to img/_review/rooms-page/rooms.html (text/html works on the CDN — KP23 page proved it). Images = the existing CDN urls (no copies).
LOOK: Playwright Fold 755x1000@2 + iPad 1180x820@2: all images load (count them), ticks survive reload, button copies. Read dev/rules/START_CORE.md + START_WORKER.md first; do not read big files whole.
REPORT: dev/handover/reports/ROOMSPAGE.md (link, counts per section, shot). Append "FOR MAIN (ROOMSPAGE): <link>" to FOREMAN_C_STATUS.md, git pull --rebase, push; send_message ROOT-C7 session_01D3E3NXamuEqupsoRAy9DRa the link + counts (if ROOT-C7 is gone, send to the newest CURRENT FOREMAN C in STATUS).
