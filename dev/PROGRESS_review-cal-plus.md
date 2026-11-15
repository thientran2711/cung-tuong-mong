# PROGRESS review/cal-plus (owner 15/11 ~20:15Z: calendar ideas + Trân nữ seal on event frames)

## Done
- `dev/build/jmcal.js` (KIT §58.3–58.6): the month calendar now shows only what she can know, short entries:
  stipend / Nội vụ phủ day, her birthday, Thiên thu of the Empress, Vạn thọ / Thánh thọ gift reminder (tuần before), pregnancy due month,
  promotion exam window, tuyển tú year, children's yearly tests + birthdays, pet growth, SỔ HẸN (notes + reminder the tuần before and on
  the tuần, log line), next-tuần weather with a sky-reading servant (weather now drawn from a world seed so the forecast is true; same for
  both co-op players), quẻ of each tuần (Cát / Bình / Hung chip), moon phases (1 / 8 / 15 / 23), co-op friend's days + shared notes,
  festival check list ✓/✗ (contests by her SC7 form, liked gift, wager silver), tap a day → day box (+ her log of that tuần).
  "Tháng trước" tab added (13 tabs). Hooks only (nothing invented): `thaiyNextVisit()` (review/thaiy), `cycleDaysOf(S, m)` (review/cycle).
- `dev/build/jseal.js` (KIT §39.1): kitSeal on every event dialog frame, measured corner (never over text / buttons / pictures / scrollers),
  fallback bottom strip. Tool panels stay bare.
- Tests: `dev/test/month-cal.js` (extended), `dev/test/seal-events.js` (new, whole-class scan).

## Notes for whoever resumes
- Old saves: lazy fields only (S.calNotes, S.calNoteN, rival bmonth, kid bmo; S.bmonth as j20).
- No private contests / tea parties / surprise events on the calendar (j53 "Khảo bài" surprise test excluded).
