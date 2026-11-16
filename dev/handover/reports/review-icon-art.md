SẴN SÀNG KIỂM 74d7b253931c6df8d984140285b7b3333378b4f7 (branch review/icon-art, docs only: dev/PROGRESS_icon-art.md; art is on the CDN) — earlier: SAMPLE READY v2 — dev/handover/reports/icon-art/sample-contact-v2.jpg (v1: sample-contact.jpg)

# review-icon-art (Foreman C art worker)
Sample (all Magnific gpt-2-6, folder ba4aecfe…, background cut with images_remove_background; viewed by me, all kept on first draw):
- Calendar: old tear-off desk-style pad (img/kit/mo-calendar.webp) → NEW hoàng lịch (皇曆): thread-bound yellow-silk almanac with dragon-cloud cover, red label, jade bead + tassel. Square icon 256x256 alpha.
- Square-button icons: `mo-edict-closed` (700x244 wide scroll, shrinks to a sliver in a square button) → compact diagonal brocade edict scroll; `ico-chat` (Western speech bubble on a round plate) → red lacquer letter box + sealed letter. 256x256 alpha.
- Placeholder set: NEW portrait 3:4 (768x1024) and banner 2:1 (1536x768), light tone, vs old ph-act/ph-event (2 + 2 only).
Candidate file keys (unchanged for code): img/kit/mo-calendar.webp, img/kit/mo-edict-closed.webp, img/kit/ico-chat.webp (square 256).
Not yet done (waiting for verdict): desk-cal(.plain).webp (Western desk calendar in her room corner — replaced by the rail per square-icons; check usage), the other rail/mark icons review, dark placeholder tones and the full per-size set (PS 84x112 / PM 120x160 / PL 162x216, LS 192x96 / LM 300x140 / LL full x 200/260, squares 56/64/72).
Open question for Foreman C: keep the Chinese characters 皇曆 on the cover? (cổ trang, but not Vietnamese text.)
Credits so far: 6 images x 40 + 3 cutouts x 3 = 249.

## Prep list (non-drawing, 15:55Z, waiting for owner OK) — decision: keep 皇曆 on the cover (Foreman C)
### A. Icon pass (square buttons; keys unchanged, 256x256 alpha webp, cut-out, one look = lacquer red + gold + jade)
| key | where | now | action |
|---|---|---|---|
| img/kit/mo-calendar.webp | rail "Lịch tháng" (jrail, kitMonthCal, kmcal flip anim j93) | tear-off pad (Western) | NEW hoàng lịch (sample) — j93 kmcal uses it as a big page-flip picture (290x420): check, may need a separate portrait key → KIT REQUEST if so |
| img/kit/desk-cal.webp, desk-cal-plain.webp | kitDeskCal corner of her room (jmcal §58.2), plain = lãnh cung/servant | Western desk calendar on stand | replace by hoàng lịch on a low lacquer stand (plain: undyed paper booklet); square-icons rail replaces the desk calendar in her room — check if still shown, else retire |
| img/kit/mo-edict-closed.webp | rail "Mục tiêu chương" (700x244) | wide scroll, tiny in a square | NEW compact edict (sample); the wide original stays for non-square uses |
| img/kit/ico-chat.webp | rail chat (co-op) | speech bubble on round plate | NEW lacquer letter box (sample) |
| img/kit/ico-map.webp, ico-room.webp | place icons (KIT group 5.6: ABOVE the name) | map scroll / gate, already square-ish, painted, no round plate | keep; re-check only after owner verdict |
Scan to run before drawing (LUẬT SỬA CẢ NHÓM): grep every `<img src="img/kit/…">` inside a button/.krailb/.kbtn/kit-x in main + review/square-icons + review/kit-size; list any other icon whose art is round-cropped or Western. Found so far: only the 4 above (mo-coin-silver / mo-ingot / mo-seal-* are objects, not buttons).
### B. Placeholder list (OD 15:10Z 7.3; sizes = kit-size table; export at 2x display, webp, ≤ ~40 KB small / ≤ ~120 KB large)
Masters (4 compositions x 2 tones = 8 generations, tone light = bright calm palace, dark = rainy/grey scheming mood, same room style, no people, no text):
| composition | ratio | export sizes (2x px) | used by |
|---|---|---|---|
| portrait | 3:4 | PS 168x224, PM 240x320, PL 324x432 | act/button/portrait-picture slots |
| banner | 2:1 | LS 384x192, LM 600x280 (crop), LL-s 1120x520 | landscape event banners S/M/L |
| wide banner | ~4.3:1 | LL-w 1720x400 | XL VIỆC DÀI picture on top (full width x 200) |
| square | 1:1 | 112, 128, 144 (56/64/72 buttons) | S/LS buttons (square picture) |
= 8 masters, ~20 files. Keys (new, KIT REQUEST for wiring): img/ph-{p,l,w,s}-{light,dark}-{size}.webp; old img/ph-act-*/ph-event-* stay until jph/KIT §59 is rewired by the kit keeper.
Sample already made: portrait + banner light masters (768x1024, 1536x768).

NOTE (Foreman C 15:55Z): the 4 buổi icons are NOT mine — they belong to the buoi-art worker (review/buoi-art).

## v2 (16:50Z, Foreman C request, OD 16/11 16:25Z kitStatusIcon §77.1)
New status glyphs (square 256x256 alpha webp, checked at 28/36/64 px on the sheet: the arrow stays readable at 28):
- img/kit/ico-download.webp — gold brush-stroke arrow ↓ into a red lacquer tray (16 KB)
- img/kit/ico-update.webp — "Có bản mới": lacquer scroll box with a fresh golden scroll + sparkle (21 KB)
Names for main s20: img/kit/ico-download.webp, img/kit/ico-update.webp (+ replaced keys mo-calendar, mo-edict-closed, ico-chat). NOT yet on the CDN (waiting for the owner verdict; will upload with cdn_sync.py).
Magnific creation ids (re-download without redrawing): cal LwoShm4swO (cut jUBgvDZLD0), edict ovNmZAg829 (s78UfBWl8e), chat s78UvQ6l8e (u5YqDYfQLD), download LwoUreSswO (Ifia8HOtvE), update dtPIDyVXSL (O6CNJzeynm), ph portrait eIyo6nkdqL, ph banner yiENqSUPW9. Rejected alternates: cal 6AqZ1KPiJO, download SymOso8Ub8, update CqzHvzUEEy.
Credits: 249 + 4x40 + 2x3 = 415.

## FINAL (owner approved v2 "Biểu tượng ok") — SẴN SÀNG KIỂM 74d7b253931c6df8d984140285b7b3333378b4f7
All pictures Magnific gpt-2-6 (folder ba4aecfe…), each looked at on a sheet; 28 files uploaded with cdn_sync.py and verified live (HTTP 200, byte size = local). No code touched (keys kept; new keys → KIT REQUEST below). No tests/screens: nothing wired.
### Files on the CDN (https://ctm-img.victoria-tntt.workers.dev/<key>)
Icons img/kit/ (webp alpha):
- NEW: ico-cal.webp (hoàng lịch 皇曆, 256²), ico-goal.webp (compact edict, 256²), **ico-download.webp**, **ico-update.webp** (256², for kitStatusIcon §77.1 — names for main's status-icons worker)
- REPLACED in place (same key): ico-chat.webp (lacquer letter box, 256²), mo-calendar.webp (hoàng lịch padded onto 290x420 transparent for kmcal page-flip, ratio 290/420), desk-cal.webp (hoàng lịch on lacquer stand, 233x256), desk-cal-plain.webp (plain paper almanac on wooden stand, 233x256, lãnh cung/servant)
- UNCHANGED: mo-edict-closed.webp (wide, still used by non-rail art), ico-map, ico-room.
Placeholders img/ (light + dark tone, no people, no text, ≤140 KB):
- portrait 3:4: ph-p-{light,dark}-ps 168x224 (PS 84x112 @2x), -pm 240x320 (PM 120x160), -pl 324x432 (PL 162x216)
- banner 2:1: ph-l-*-ls 384x192 (LS 192x96), -lm 600x280 (LM 300x140), -ll 1120x520 (LL 560x260)
- strip ~4.3:1: ph-w-*-ll 1720x400 (XL VIỆC DÀI picture on top, full width x 200)
- square: ph-s-*-s56 112², -s64 128², -s72 144² (button squares 56/64/72 @2x)
Old img/ph-act-*, ph-event-* untouched (jph still points at them).
### Group scan (LUẬT SỬA CẢ NHÓM) before → after
| picture | before | after |
|---|---|---|
| calendar (rail, kmcal flip, desk corner x2) | Western tear-off pad / desk calendar | hoàng lịch (4 files) |
| rail goal | wide 700x244 scroll in a square | ico-goal compact edict (new key) |
| rail chat | speech bubble on round plate | lacquer letter box |
| status | none | ico-download, ico-update |
| placeholders | 2 event (4:3) + 2 act (3:4) | 20 files: 4 compositions x 2 tones x sizes |
Rail scan: img/kit icons in buttons are only cal/goal/chat; ico-map/ico-room are place icons (already square painted, kept); mo-coin/ingot/seal are objects not buttons.
### KIT REQUESTS (code, not mine)
1. jrail.js: rail icons → img/kit/ico-cal.webp and img/kit/ico-goal.webp (square keys; mo-calendar is now portrait-padded for kmcal).
2. jph/KIT §59 + kitFrameSize/kitBtnSize: wire ph-{p,l,w,s}-{tone}-{size} by orientation/size (table above) replacing ph-act-*/ph-event-*.
3. kitStatusIcon: ico-download / ico-update.
Credits total: 415 + 8x40 (placeholders dark, wide x2, square x2, portrait dark, banner dark = 6 + 2 desk-cal) + 2x3 cutouts = 415 + 320 + 6 = 741.
Honest notes: wide strips are centre crops of 1728x576 generations (model has no 4.3:1); mo-calendar flip art shows the almanac small on the tall canvas — if the owner wants it bigger, a dedicated portrait key is a kit request.
