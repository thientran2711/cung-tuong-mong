# flight-mucluc report

PRIORITY #1 CHECK: OD 1 (24/11 ~18:15Z f10-mucluc) | main 3 hits: jkslide.js kitSlide TOC popup, jtabs.js ktStoryHTML, jkc.js kcSlideHTML | titles2-r2 3292e7a2 = danh hieu titles, not chapter names (not needed) | claims 0.

Branch review/flight-mucluc 6fb8e7eb (base origin/main 502c48c9).

## Done
1. Muc luc popup (kitSlide, dev/build/jkslide.js): ONE large kit frame, kitStepList rows (done / now / next), "Chuong N · name" left, state right, picture column hidden (.k3body:has(.kmuc)), scrolls to the current chapter. jkpc.js: `.kmuc` keeps the one big size (no compact). New kitSlide option `tocAll`.
2. ktChapToc() (dev/build/jtabs.js): all chapters of the road from one source (S.st.ch.past, running chapter, rest of the plan; names from ARC67 / MS67; f14Part name for open slots; first open "o" slot = the rolled road). Used by story-now, story-past and khue cac (kcSlideHTML). "Con khoang N chuong nua" row removed.
3. Extra owner bug f11/f12: chip row `.ktop` under a sub-tab bar (.kpbar / .ksub) is sticky below the bar (--ktt set by ktPinTop); the chip "con N chuong" counts from ktChapToc.

## Tests
- dev/test/mucluc-flight.js: PASS, 8 origins (tt,dtq,muoi,cn,nc,td,ch,thd) x Fold 755x1000 + iPad 1180x820, 14 rows each, no overflow; shots looked at (scratch, outside git: /home/user/wt/mucluc-shots/ml-<origin>-<width>.png).
- dev/test/ktop-sticky.js: PASS (geometry only; shot covered by an intro modal).
- NOT run: full quickcheck + old-save load (lander LC12).

## Limits
- Open slots not yet chosen ("o" next premise, "s" shared arc) show the part name, not a chapter name.
- cung nu (cnv): Menh truyen has no chapter slide / Muc luc at all (first tab "Than phan"): nothing to fix; owner decision if she wants one.
- Kit files touched: jkslide.js, jkpc.js (KK21 to check).

~85% done / ~85% playable
