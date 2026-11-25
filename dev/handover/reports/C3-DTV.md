# C3-DTV report (worker, sonnet)
START_CTX: ~8% (est.)
PRIORITY #1 CHECK: OD 8 (24/11 ~08:20Z, ~08:50Z, ~09:05Z read verbatim) | main: no Dưỡng Tú / duong-tu image key in dev/build (git grep origin/main) → names img/place/duong-tu-<dong|tay|bac|tiensanh>.webp proposed | review/* none | claims C3-DTV only

## PILOT Đông sở (2 gens, 270 cr)
- Try 1 p84s7WQehw (135 cr): REJECTED, deleted — phoenix carving on beds (phoenix only Hoàng hậu), too rich for tú nữ.
- Try 2 TdJrSgOVNR (135 cr, gpt-2-6, 2k, 2688x1386, ref image 1 = tẩm cung gOmYI7iSXO only; no figure ref since room is empty): ACCEPTED as pilot. Two identical wide double beds (peach-pink gauze, 2 pillows + 2 quilts each), left-centre + right-centre, plain rosewood floral-lattice carving, round table + 4 stools centre, lattice windows no curtains, peach/coral accent, Chinese style, no Japanese table, no people, small low objects left foreground.
- Crop test (looked): Fold 755x1000 cover crop = ONE bed per view (left crop / right crop) with swipe; iPad 1180x820 full = both beds balanced. Sheet: https://ctm-img.victoria-tntt.workers.dev/img/_review/c3-dtv/dong-crop-test.jpg?v=1
- Picture: https://ctm-img.victoria-tntt.workers.dev/img/_review/c3-dtv/duong-tu-dong.webp?v=1
- Plan for others: Tây = mirror layout + pale green-jade accent; Bắc = different window side/layout + soft lilac accent; Tiền sảnh = hall with ma ma's dais, rows of floor marks, no beds.

## ALL 4 DONE (gpt-2-6, 2k 2688x1386, ref image 1 tẩm cung gOmYI7iSXO; 6 gens extra = 810 cr; total 8 gens ≈ 1,080 cr)
| picture | kept gen | rejected (deleted) | notes |
|---|---|---|---|
| Đông sở | TdJrSgOVNR | p84s7WQehw (phoenix, too rich) | peach/coral, east lattice, table+4 stools centre |
| Tây sở | lJhDmeOgv9 | 3z1CKgTREY (right bed cut at edge) | jade green, moon-gate window between beds, dressing table + basin |
| Bắc sở | Xm6S9zRBfo | — | lilac, landscape screen + embroidery table centre |
| Tiền sảnh | N25vbuG6D9 | Syaeh5IUb8 (gold phoenix on lintel) | dais + armchair, peony screen, 3 mats with cushion rows, no beds |
All looked at full size: Chinese style, no Japanese table, windows without curtains, no phoenix/yellow, no people, 2 double beds (2 pillows + 2 quilts) per sở, left foreground open.
Review links (?v=1): https://ctm-img.victoria-tntt.workers.dev/img/_review/c3-dtv/duong-tu-<dong|tay|bac|tiensanh>.webp · sheet duong-tu-sheet.jpg (4 pics + Fold left/right crops of Tây, Bắc).
Proposed live keys (none existed in origin/main): img/place/duong-tu-<dong|tay|bac|tiensanh>.webp — NOT copied to live; wiring = selection-day worker / KIT REQUEST. Rooms are still _review only.
Note: bed centres at ~¼ and ¾ width → Fold 755x1000 crop shows one bed per view (left/right swipe).
No rollover needed (low context).

## WIRED KEYS (Foreman C msg 22:21Z): code reads SELX_ART on review/selection-scene (dev/build/jselxsc.js; IMG_U("img/<name>.webp")), TODO names selx-tiensanh / selx-so-dong / selx-so-tay / selx-so-bac. Uploaded to CDN at exactly those paths (same pictures as the review ones, 2688x1386 ≥ 2360 for iPad @2):
- img/selx-tiensanh.webp (key sanh) · img/selx-so-dong.webp (dong) · img/selx-so-tay.webp (tay) · img/selx-so-bac.webp (bac). New keys, nothing overwritten. Only SELX_ART table in jselxsc.js needs its 4 values changed (selection-scene worker).
- OPEN: key `rooms` (selx-rooms = «sân Dưỡng Tú viện, ma ma chia sở», the yard where the 12 girls line up) is NOT painted by me — it is a yard, same family as C3-EVBG's yard; not in my brief (4 pictures). Foreman C to confirm who paints it.

## FINAL (Foreman C 22:26Z: Tiền sảnh redo)
- Tiền sảnh redo N25vbuG6D9 → jUITmuqLD0 (135 cr, gpt-2-6 2688x1386): open polished stone floor, no cushions/mats/low table (Japanese read), dais + armchair + peony screen + lanterns + columns + side benches kept. N25vbuG6D9 deleted from review (overwritten). Total ≈ 9 gens ≈ 1,215 cr.
- FINAL PATH LISTS (CDN, new names only, nothing overwritten):
  A) selection-scene keys: img/selx-tiensanh.webp · img/selx-so-dong.webp · img/selx-so-tay.webp · img/selx-so-bac.webp
  B) img/place/duong-tu-dong.webp · duong-tu-tay.webp · duong-tu-bac.webp · duong-tu-tiensanh.webp
  Review copies (?v=2 for tiensanh): img/_review/c3-dtv/duong-tu-*.webp + duong-tu-sheet.jpg
- Still open: `rooms` key (yard) not painted by me.
