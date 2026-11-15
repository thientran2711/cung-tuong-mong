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
