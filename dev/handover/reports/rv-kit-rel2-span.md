# rv-kit-rel2-span — PASS

PRIORITY #1 CHECK: grepped OWNER_DECISIONS/CLAIMS/reports for kitRel2 width; found the 16/11 16:10Z "half-width lone box" rule, overwritten by the owner's 21/11 ~02:14Z word «chiếm hết cả một nửa cái khung nền» (law 14 canon overwrite, law 16/17 respected: keeper implements the newer word, no re-ask).

Branch: review/kit-rel2-span-rv = keeper 23afdbea + LIVE 9c1dd605 (fast-forward of LIVE), sha 181f35de858015825fdf480e59fdaea938b76ffd.

Change: jkrel.js `.kr2-n1{grid-template-columns:minmax(0,1fr)}` (was `minmax(0,calc(50% - .25em))`). Two-box rows unchanged.

Checks
- dev/test/kit-rel2-span.js: PASS at 755x1000, 1180x820, 390x844 (lone box == wrapper width at 220/300/460/640 px; two boxes equal).
- Own render, Fold 755x1000@2 / iPad 1180x820@2: lone box 731/731 and 1156/1156 px, two-direction boxes unchanged.
- Whole group (law 11): every kitRel2 caller goes through the one kit part; no custom row.
- Wording: no new player text, no %.
- coop-e2e 92/92. QUICKCHECK PASS 215 s (render 243/275, tab 492/456, buổi 1076/1392, core gates PASS, old save ok).
