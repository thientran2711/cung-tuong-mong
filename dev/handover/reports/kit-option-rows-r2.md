# kit-option-rows r2 (fix of reviewer FAIL f7e2e1ef, Fold figure-left modal)
PRIORITY #1 CHECK: reports/review-kit-option-rows.md item (1) | main kszNeedTxt/kszLiveLay3 (jksize) | review/kit-option-rows-r1 f7e2e1ef | claims MAIN s35.
Branch review/kit-option-rows-r2 f422a570 (on f7e2e1ef).
- Cause: figure-left frame (k3body: figure | k3right[picture, text, opts]) leaves the option column 304 px on Fold; card picture + padding leave ~137 px values -> 2-3 words per line.
- Fix (kit, jksize kszLiveLay3 + CSS): option column narrower than kszNeedTxt+KIT_SIZE.v3.btn.stackBelow(80) -> `.kszstk`: every row stacks LABEL OVER VALUE, values get the whole text column: 137 -> 190 px (Hội phối đồ · Phú quý on Fold; shots CDN img/_review/kit-option-rows-r2/m-fold-before.png / m-fold-after.png, LOOKED: no more word-by-word wrap).
- Tried and dropped: moving the options under the figure at full width. The frame's own max height (574 px here) then cut the second card or hid both options behind a scroll — worse.
- Known, unchanged from r1: on this Fold case the 2nd option card is partly cut at the bottom (XL info column scrolls inside); not part of the reviewed complaint.
- Scan dev/measure/option-modal-scan.js: seeded Math.random (arg 5, default 7), a direct Hội phối đồ builder on every run, NARROW now value col < 150. fold 12 turns: 9 modals 0 flagged; ipadAir 8 / 0. (In the scan the direct builder lands in a one-column full-width layout; the 304 px case is reproduced by the stand-alone harness shown in the shots.)
- Quickcheck f422a570: PASS, core gates PASS.
