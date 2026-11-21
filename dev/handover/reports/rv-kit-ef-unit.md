# rv-kit-ef-unit — FAIL (the fix is overridden on the real option / act cards)

PRIORITY #1 CHECK: grepped OWNER_DECISIONS/CLAIMS/KIT_REQUESTS (21/11 econ-tamco RE-CHECK #2 «Bạc -94» split on Fold), KIT.md §6.2b; reuses kaRowH / kaPlain, adds kaUnit + .kef1; no custom chip.

Branch: review/kit-ef-unit-rv = keeper#2 9fd26c14 + LIVE 0046a920 (index/sw rebuilt), sha 0620a05d9b05d42292a97742885a6b1756317a9d. kit-ef-unit.js PASS (145 units, 0 split) — but it renders kaRowH inside a bare button.ka.

FAIL — on the REAL cards the nowrap does not apply. Real option dialog on Fold (755x1000), «Mua chuộc người Nội vụ phủ»: kaUnit marks every item .kef1 (computed class «ef g kef1») but getComputedStyle(white-space) = normal, and the card still shows «Sức 80→98 (+18) · Sủng / +2 · Danh +1» — «Sủng» at the end of one line, «+2» on the next (shot branch-fold; identical to LIVE). Cause (CSS cascade dump on that element): the new rule «button.ka .krv .ef.kef1, .kr .krv .ef.kef1 { white-space: nowrap }» loses to the existing «button.ka.kart small.kb > .kr > .krv > * { white-space: normal !important }» and «button.ka.kart.kopt small.kb > .kr > .krv > * { white-space: normal !important }» (the §6.3 square-card CSS). So the unit never holds on the option cards (.kopt) or the act cards (.kart), which are the cards the econ-tamco request is about.
Fix: raise the rule above those two: «button.ka.kart small.kb > .kr > .krv > .ef.kef1, button.ka.kart.kopt small.kb > .kr > .krv > .ef.kef1 { white-space: nowrap !important }» (keep the general one for other hosts); then make kit-ef-unit.js render in a real .kart / .kopt card (an option dialog: Q with the sample x lines, and the Hành sự act tab) and assert for every .kef1 that getComputedStyle(white-space)==nowrap and getClientRects().length==1 on Fold + iPad (widths 150..320 px too).
Not run after the FAIL: quickcheck/coop-e2e (stopped). Merge was clean (index/sw only).

## Round 2 — review/kit-ef-unit-r2 bb00fc02 (keeper #3)
PRIORITY #1 CHECK: re-read my r1 FAIL (nowrap overridden by .krv>*{white-space:normal!important}); OD on kit rows/units; KIT.md §6.2.
- Fix: j63 .kr>.krv>.ef.kef1:is(#kef1-unit,.kef1){white-space:nowrap!important…} beats every host override; family: unsigned stats («Sủng 26»), kitRows info rows tagged (kaEfTag).
- Merged LIVE 6f4e8d70 into review/kit-ef-unit-rv2 (d46ad6deb005ab024b9e23a8e8fbcfa280ca81f7).
- kit-ef-unit.js (real cards, widths auto..280, act/pop-maid/staff/rv tabs): Fold PASS, iPad PASS, bad=0 everywhere.
- Own probe on real option card (card.js, getClientRects().length==1 per .ef): all 1 (Bạc -94, Tâm cơ -3, Sức 80→98 (+18), Sủng +2, Danh +1, 2 khắc, Đức +2) on Fold and iPad. Fold shot looked at: units whole, wrap only between units.
- quickcheck PASS, coop-e2e 94/94.
- VERDICT: PASS.

## Round 3 — review/kit-ef-unit-r3 a42ca838 (keeper #5): PASS
PRIORITY #1 CHECK: my r2 PASS d46ad6de; LAND CHAIN 2 QC perf-only fail; diffed r2..r3 on j63.js; merged LIVE c9ae030e into review/kit-ef-unit-rv3 (fd8280fa3fd7eddef4245084fb86a557d3dd3326).
- Only change vs my PASS (besides merge): kaUnit cached per item text (Map, cleared at 3000) — kaUnit0 is a pure function of the text, so the cache cannot change a result; kitParse also routes sgTxt (SG-CARD, LIVE side).
- kit-ef-unit.js x3: Fold PASS + iPad PASS every time (bad=0). Own real-card probe: every .ef unit 1 client rect on Fold + iPad.
- quickcheck PASS (render 259/277, tab 599/658, buổi 1559/1944 ms); coop-e2e 124/124.
- VERDICT: PASS (supersedes d46ad6de).
