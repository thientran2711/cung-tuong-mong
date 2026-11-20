# kit-signs-odds — URGENT small kit fix (ROOT-77): odds words never become signs
PRIORITY #1 CHECK: the mg-skip FAIL «makeup quick button odds word» on LIVE f43efc71 | main: j82.js kg82Signs (mg-noword-kit), kitQuick (j79 §13.6), KIT_ODDS (j79:196) | review/*: none | claims: this worker.

Branch `review/kit-signs-odds` @ ac3e3b2f (from origin/main f43efc71, index/sw rebuilt).

## Cause
kg82Signs (the no-text-in-play pass) turned EVERY button inside `.kg82act` into a sign (●) and hid every `small` there, so the quick-play button of the makeup game (`#toilquick`, kitQuick: «Điểm trang nhanh» + small «Khó · thành: … · hỏng: …») lost its word and its odds line.

## Fix (j82.js, whole group — the pass is ONE function, every caller goes through it)
`isOdds(e)`: exempt every `.kquick` (the kitQuick button of every kind/caller), `#toilquick`, any id ending `skip` / `quick`, and any button / `small` whose text holds a word of the kit ladder `KIT_ODDS` (Liều · Khó · Năm ăn năm thua · Khá chắc · Chắc · Rất chắc · Nắm chắc), matched as a whole word (so «Khóa» still becomes a sign). Exempt buttons keep their words and their small line stays visible; everything else in play is unchanged.

## Tests
- mg-noword-kit.js: new assert (synthetic probe, every ladder word + every quick-button shape; per-kind `quickBad` scan over all 31 kinds): PASS 31 kinds, 0 words, odds probe PASS (quick keeps «Để trời định · Liều · thành: …», «Nhanh · Khá chắc», all 7 ladder words stay, «Gợi ý» → ?, «Khóa» → ●).
- mg-skip.js (Fold 755x1000): 0 FAIL (makeup quick button with «Khó · thành: Đoan trang · hỏng: Vụng về» both rolls, lesson, Tu đức, j5 overlay, veil).
- QUICKCHECK PASS · 225 s · core gates PASS · old save ok · perf render 238/285, tab 518/526, buổi 1266/1239, tasks>200ms 20/20.
- golive.sh not run (auto-mode refused it; quickcheck.sh is its check).
