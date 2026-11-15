# PROGRESS review/month-calendar (KIT §58)
Owner 15/11 ~18:30Z: wall calendar (3 tuần rows × 10 day squares), fixed yearly festivals only, short info on tap/hover.
Owner update (via coordinator): entry = painted DESK CALENDAR in a corner of her room's stage (gpt-2-6, cut out), plain version in lãnh cung.

## Done
- `dev/build/jmcal.js` (assemble: after jevb, before j84): kitMonthCal, kitMonthCalOpen (kit modal kind "cal"), kitDeskCal + kdcPlace,
  KIT_SAMPLES §58 / §58.1 / §58.2. Reuses FEST (j31/j71), FV7 + SC7 + prize7 (j71), TUAN, KP_MON/kpYear, k3Date, kitTabRowHTML, kitRows,
  kpPop, kitModal. j93 kitCalendar (tuần flip) untouched.
- Art on CDN: img/kit/desk-cal.webp (Magnific XmP2h5IBfo → bg removed vQZ0FDma47), img/kit/desk-cal-plain.webp (s7oCJGSl8e → vQZ0Fpha47),
  256 px tall, transparent webp. Rejected variants: w4hH9YG7EI, 6AHjGd7iJO.
- KIT.md §58. Test dev/test/month-cal.js.
## Mapping (no day-of-month in the game)
Squares 1–10 thượng / 11–20 trung / 21–30 hạ tuần; festival on its traditional day inside the tuần FEST.t fires it (see KIT §58).
## Resume
Build: `python3 dev/build/assemble.py`; site for tests: `bash dev/site/build_site.sh` then copy index.html aside and `git checkout assets.json index.html sw.js`.
## Tests (15/11)
- `node dev/test/month-cal.js <site index.html>`: bad 0, 0 page errors at 755x1000@2, 1000x755@2, 1180x820@2, 1366x1024@2, 844x390@3
  (desk 48–84 px, 0 overlap, 12 tabs, no clipped text/overflow in any month, only FEST keys, popover on screen, Thánh thọ hides after
  Thái hậu dies, lãnh cung plain, none away from home); 390x844@3 host mode = rotated frame (rotate prompt) ok.
- Kit page #kit: §58/§58.1/§58.2 render (pre-existing §28.1 sample error is on main too, not from this branch).
- Old save: a save made by the live main build loads in this build; desk + calendar open, current tuần row correct.
## Review r1 (15/11, review/month-calendar-r1)
- Fix: kdcPlace also avoids the stage "+N"/"‹" page chips (.j59more); KIT §58 text updated.
- Site rebuilt on origin/main 64e91f1ae. month-cal.js bad 0 / 0 errors at 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390@3,
  390x844 rotate prompt. Crowded home (2–3 visitors + page chip): desk 0 overlap at all 5 sizes. #kit: §58/.1/.2 ok (only the old §28.1 error).
- CDN: desk-cal.webp, desk-cal-plain.webp and all 14 ev-fest-*.webp present.
