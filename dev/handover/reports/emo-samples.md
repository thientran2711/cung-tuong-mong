PRIORITY #1 CHECK: OD L126/L130/L139 + tail 17/11 ~16:35Z | main none (jexpr/face-lm removed) | review/appearance has them in history (aae3cc4e = last version, e67def05 = removal) | ledger #60 reopened | claims none.

# emo-samples (sample sheets only, nothing merged)

FOUND
1. Old code expressions: dev/build/jexpr.js (kitFaceExpr), img/face-lm.json, dev/figwork/facelm*.py in origin/review/appearance at aae3cc4e (removed by e67def05, 14/11). Landmarks in face-lm.json no longer match today's portraits (first try put mouth and brows in wrong places), so sheet A derives the same 27 landmarks from img/mk-fit (the 60 face-mesh points used by makeup).
2. Old expression PICTURES (option B): NONE found. Searched OD, LEDGER, reports, dev/art, dev/figwork, CDN MANIFEST.json (302 hits for emotion-like names are only face-* portraits, item/map art, ev-mood-* event pictures). The only early expression work was the code pilot (pilot sheets, review/appearance). No emotion paintings exist. Sheet B NOT made (art = Foreman C).

MADE
- Sheet A: https://ctm-img.victoria-tntt.workers.dev/img/_review/emo-samples/emo-A.png (1360x2120). Rows: Bình thường, Vui, Buồn, Giận, Hờn, Khóc. Columns: Nàng (por-player-look1-t3-a18) and Phi tần (por-consort-c05-t4-a18), each Đoan trang and Khuynh thành. Makeup (toilMkDraw, branch toil-looks2-r5 97f57862, default colours) is drawn first, then the warp is applied to base+makeup, then tears/red eyes on top, so makeup stays under the warp.
- Stronger than 14/11: pulls x1.35, deeper frown/V brows, new Vui (smile, crescent eyes) and Hờn (pressed lips, heavy lids), khóc = buồn + red lower lids + tears on both cheeks.
- Looked at: no misplaced features, makeup intact; khóc tears are faint but visible; Vui is the subtlest.
- Tools (scratch, not for merge): origin/review/emo-samples 8ea55572 dev/test/emo-samples/.
- CDN folder img/_review/emo-samples/ to wipe after verdict.
