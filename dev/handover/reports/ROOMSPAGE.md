# ROOMSPAGE — one review page of every redrawn (frontal, no-curtain) room (owner 23/11 ~18:44Z) · worker session_01D3E3NZcUeZgQiwjuGdeF2W (depth 7) · 0 credits
START_CTX ~3 % (own estimate).
PRIORITY #1 CHECK ('kp23 compare|rooms page'): reused the KP23 compare page look/tick/localStorage/copy-button/lazy-load (review/kp23-compare @b2101239 dev/art/kp23); images = existing CDN urls, none copied.
LINK: https://ctm-img.victoria-tntt.workers.dev/img/_review/rooms-page/rooms.html (text/html OK)
Counts: S1 Phòng các cung 65 rooms (pr13, latest rN, incl. -ngu bedrooms) · S2 Nơi chốn 20 places (places-l2370, latest rN) · S3 gỡ rèm 29 (ROOMS1 16 bases + ROOMS2 13 toilette, live img keys; toil-mirror-room == c5, shown once). Total 114 pictures.
Per picture: big Vietnamese name, small code+key+rN, ticks «Duyệt»/«Không duyệt» (default none), note box. Button copies "ROOMS PICK: ok=<codes> no=<codes> notes=<code:note | …>". Codes ph01–ph65, nc01–nc20, rm01–rm29.
LOOK: Playwright 755x1000@2 + 1180x820@2: 114/114 images load, 0 page errors, ticks + note survive reload, clipboard text correct (shot looked at).
Notes: (1) "đang dùng" mark only shows when the picture is byte-identical to the live img/<key>-ha-sang.webp — 0 of 85 match (live S1/S2 files are the swap/ re-encodes, e.g. lanh-cung live == places-l2370/swap/…), so no mark appears; owner should know the S2 pictures shown are the review candidates, not necessarily what is live. (2) Room names derived from key (palace · rank · tiếp khách/phòng ngủ), places names from prompts_places_L2370.json.
Branch review/rooms-page: dev/art/rooms-page/{gen_rooms.py,rooms.tpl.html,rooms.html}; dev/site/cdn_sync.py gets "html" content-type (same as kp23 branch). Wipe: python3 dev/site/cdn_sync.py --wipe-review rooms-page
