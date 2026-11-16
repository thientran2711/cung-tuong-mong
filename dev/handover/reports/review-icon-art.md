SAMPLE READY — dev/handover/reports/icon-art/sample-contact.jpg

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
| 4 buổi icons (sáng/trưa/chiều/tối) | OD 15:10Z 7.5 | do not exist | NEW 4 icons (sun-rise over eaves, sun at zenith, sunset, moon+lantern) — in Foreman C item (a), after sample |
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
