# MOCK-STAGE — mockups: event full-stage (M1), dialogue (M2), toilette room hub (M3) + fact Q
KIT KEEPER #10 · session_01Rc5AsM54hdwtHZ3MKWwEdH · for MAIN 109 · MOCKUPS ONLY (no game build, nothing to land)
START_CTX ~3 % (own estimate; get_session reads 0). Finished near the +25 % line: successor not needed (task done).
PRIORITY #1 CHECK: OD last entry 23/11 17:03Z (owner idea, read in full) | ledger/claims per MAIN brief (toilette 63/7/8, event frame 12/5) | main: jtoil.js (toilOpen / toilDressUI / toilMakeup / kitDressPicker + kitInvGrid «toilinv»), j92.js WD_ITEMS, jty.js trung y (figFor with empty y), jtoil toilMakeupSvg (makeup layer), jfocus.js kitFocus §92 (blurred place painting between the bars, XL figure, say box — closest existing part to M1/M2), j59tagHTML stage plate, stage pictures already have -sang/-trua/-chieu/-toi variants (= the day/night look), ROOMS2 plates img/toil-room-c1..c8 (live) | review/toilette*, review/wardrobe, review/rooms2 (landed), review/kit-ap01-frame-r7 (landed) | CDN img/_review/dressup/* (an earlier layer dress-up prototype: person + outfit + hair layers) — reused, nothing new drawn, 0 credits.

PAGE: https://ctm-img.victoria-tntt.workers.dev/img/_review/mock-stage.html (Vietnamese, sections Q / M1 / M2 / M3, Fold + iPad side by side, letters A/B/C). Images: img/_review/mock-stage/ (40 jpg). Wipe after her verdict: `python3 dev/site/cdn_sync.py --wipe-review mock-stage` + delete img/_review/mock-stage.html.
Prototype (throwaway, never land): review/mock-stage @2124c0e6, scripts dev/mock-stage/ (inject overlays into the real local build of main f7016b8d; boot.js = kit-focus test bootstrap). Note: main's cdn_sync.py has no "html" type (served octet-stream) — I added it locally only to upload the page; review/kp23-compare has the same one-line fix, land it with that branch.

## Q — fact (measured on the real game, long person event → frame XL)
| device | frame (CSS px y) | top bar | tab bar |
|---|---|---|---|
| Fold 755x1000 | 115–885 | ends 157 → frame covers 42 px = the Tâm trạng row + the bottom edge of the stat numbers | starts 918 → NOT covered (33 px gap) |
| iPad 1180x820 | 125–695 | ends 157 → covers 32 px = the Tâm trạng row | starts 770 → NOT covered (75 px gap) |
Plus: the modal veil (#modal, rgba(42,26,18,.53), z 42) covers the WHOLE screen incl. both bars: they are dimmed and not tappable while any frame is open.

## M1 — event full-stage (recommend **B**)
Layer between the bars (both stay bright and live), place painting blurred 6 px + veil; night = the place's own -toi picture + a slightly deeper veil (clearly different). Figure = the person's own figFor picture at full stage height, stage plate (j59tagHTML) at the feet; the right panel = the kit dialog frame holding the game's own header, text and option cards.
- A: panel 53 % Fold / 47 % iPad, event picture kept → Fold scrolls (third option below the fold).
- **B: panel 60 % / 55 %, event picture dropped (the stage is the scene) → Fold shows the long text + 2½ cards, iPad shows everything without scrolling; figure still full height.** Best panel room.
- C: text as a speech bubble on top of the right column, panel = options only → readable but on Fold only ~2 cards fit.
Kit parts: REUSE kitFocus §92 layer (.kfoc: blurred #scimg + veil, XL figure, plate) + the v3 dialog frame (kitFrameLive3 content) + kitOptFinal cards. NEW: (1) KIT_FOC "panel mode" = one right-column frame slot beside the figure (width knob per device), (2) a night veil knob (KIT_FOC.veilNight) — pictures exist already, (3) the showModal hook that routes person events (ksz3 kdper / T3 PERSON EVENT) into the layer instead of #modal and keeps the bars un-veiled. Rough size: 1 kit worker ~1 day (jfocus + jksize hook + test kit-focus extension + kit page sample), then a whole-group scan of every person-event caller (T3 kinds) — ~1 more day.

## M2 — dialogue (if chosen: **A**)
- **A: each box beside its own speaker with a tail (Fold: two rows, half body; iPad: both full body at the ends)** — obvious who says what, one screen, no extra tap.
- B: visual-novel strip at the bottom, speaker lit / other dimmed; step 1 speech, step 2 her choices (one extra tap; Fold half body crops faces large).
Kit parts: NEW speech bubble with tail + speaker name chip (the kfoc-say box grown into a bubble; tails L/R/up), her own figure slot on the right (figFor(S), already used by stage), dim-the-listener rule. Rough size: ~1.5 days kit + group scan. My overall advice: M1-B for every person event; M2-A only for short talk scenes (visits, greetings) later.

## M3 — toilette room hub
Flow frames on the page: today (entry chip / Hồi 1 / makeup canvas) → F1 zoom transition (stage zooms ×1.35 while the room plate fades in, ~0.7 s, tap skips, Gọn = cross-fade) → F2 room: real plate toil-room-c<rank>, mirror «Thay xiêm y» + dressing table «Điểm trang» with an always-on gold glow outline traced on the object, «Đã chỉnh tề» always present, «◂ Quay lại» → F3/F4 wardrobe: her figure left (trung y), the real toilette grid (kitDressPicker body «toilinv» = kitInvGrid + kitEquipSlots) right; tap an item → figure swaps (0.25 s cross-fade) → F5 makeup: the existing makeup canvas unchanged, over the blurred room, her figure left → F6/F7/F8 final look on the room: makeup only (trung y + toilMakeupSvg 'dep'), dress only (mặt mộc), both.
Wording (VANPHONG-checked; «Xong/Đóng» are banned as panel closers, this is an action): mirror «Thay xiêm y» (owner) · alt «Đổi xiêm áo» / «Y phục»; table «Điểm trang» (owner) · alt «Trang đài» / «Bàn phấn sáp»; done **A «Đã chỉnh tề»** (VANPHONG already uses "chỉnh tề" for dress) · B «Hoàn tất» · C «Lui ra».
Kit parts: REUSE ROOMS2 plates, kitDressPicker/kitInvGrid/kitEquipSlots, toilMakeup canvas, toilMakeupSvg layer, jty trung y, j59 plate, kitFocus-style layer. NEW: (1) ROOM HOTSPOT part = object outline + label plate + glow (outline data per plate: the 8 rank plates + 4 maid plates need traced paths, or a Magnific images_segment mask per plate → cut outline; mock paths were hand-traced on c1 only); (2) zoom-into-room transition (j93 kmStage); (3) "final look" beat on the room (figure walk-in + outline fade). ART gaps: a seated-at-the-mirror pose does not exist (mock shows her standing); with IT02 (260 sets) on WAIT, "tap item → figure changes" can only switch the rank-tier robe vs trung y today (low ranks look close in colour); per-item outfits need IT02 or the img/_review/dressup layer approach. Rough size: kit 1.5–2 days + outline tracing for 12 plates (~0.5 day, 0 credits if traced by hand) + flow rewiring in jtoil (~1 day).

## Open items for MAIN
- Show her the page; she answers e.g. "M1-B, M2-A, M3 Đã chỉnh tề". Nothing is built until she picks.
- After the verdict: wipe img/_review/mock-stage* ; review/mock-stage can be deleted (never land).
