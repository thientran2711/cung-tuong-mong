PASS 9b95eedc
# stage-slots-fix-r1 (branch review/stage-slots-fix-r1 @ 9b95eedc, ancestor = origin/main 18fb8252)

Merged origin/main into review/stage-slots-fix (fddbbefe), site rebuilt (dev/site/build_site.sh). Owner bug OD:L1049 (figures pressed together / overlapping).

## 1. Worker's fix re-tested (room / place stage, j59)
`node dev/test/stage-slots-fix.js` (her home + vườn; 1, 2, 3, 3+man, 5 people incl. +N chips): 0 failures, 0 page errors at
755x1000@2, 1180x820@2, 1366x1024@2, 412x1058@2, 390x844@3, 844x390@2 (final re-run after the last main merge: 755, 1180). Slots 1/2 · 1/3,2/3 · 1/4,2/4,3/4 of the free width (2 px), no overlap, side column respected.
Note: 844x390 holds 1 person per page when 3+ are present (slot < name-chip minimum J59SWMIN) — existing rule, no overlap.

## 2. WHOLE GROUP (OD:L52/L474): event pop-up people — fixed on -r1 through the SAME kit slot function
Found 3 more places that packed standing people with their own overlap numbers:
- `kitEsOvFit` (jk4, people on the event picture band): ≤ 25 % overlap, core boxes.
- `kitDpFit` (jk4, event person column .kdper): 20 % overlap (`ov=.2`), core boxes.
- `kitStageScale` (jk2b, retired scaler, dead code): OV .2 / .36 — constants zeroed, KIT text overwritten.
Fix: ONE slot function in jkit.js (`kitSlotSw/kitSlotCx/kitSlotScale/kitSlotNeed`, KIT 33.7). j59 (stage), kitEsOvFit (band) and kitDpFit (column) all call it; no private numbers left (`grep -nE "OVX|\*\(1-o\)|overlap ≤" dev/build` = none). Whole visible art l..r, never overlapping, one common scale-down; chips centred on the slot. j59 OVX removed.
Also fixed: a figure hidden by kitDpFit (unmeasured) stayed `visibility:hidden` when moved into the band (second person vanished) — cleared in kitEsOvFit.
KIT.md: 33.7 gets the slot-function paragraph; stale 20 %/25 % lines (§ crowded row, 32.6 band, 32.7 column, 50.x) overwritten in place.
Fact: the live game shows ONE main actor in an event pop-up (`kitStagePeople` slice(0,1), KIT_EVENT_DP); the 2-person layout still exists in the kit, so the test switches KIT_EVENT_DP off for e2* cases.
Test: `node dev/test/stage-slots-fix-r1-ev.js <page> <WxH@dpr> <outdir> <tag>` (cases e1, e2 band, e2n column, emp1, e2k): 0 failures at all 6 viewports above; 2 people → centres at 1/3 · 2/3 (2 px), no intersection. 1 person in the column is cropped by the column edge (existing 32.2 rule), not a slot case.

## 3. Consistency scan
All standing-people groups (stage, picture band, person column) now share one function. Single-figure parts (week book page .kbk, pop card, shop stage) have nothing to overlap. `kitBookPic` (jbook, plate figs at authored --fx) is used only by the kit sample/book API — not changed, flag.

## Screenshots (dev/shots/stage-slots-fix-r1/ on review/stage-slots-fix-r1)
fin-755x1000-e2.jpg, fin-755x1000-e2n.jpg, fin-1180x820-e2.jpg, ev-390x844-e2n.jpg (event pop-ups). Stage shots fin-755x1000-n2-p1.jpg / h2-p1.jpg / fin-1180x820-n3-p1.jpg / r1-390x844-n2-p1.jpg are covered by a night-card cut-scene overlay in this headless run; the stage result rests on the DOM bounding-box measurements (JSON, 0 failures), the worker looked at the Fold scene before.

Risks: wide silhouettes make everyone scale down on that stage (smaller figures, no overlap) — likely, small, visible at once. Two-person event column gets narrower figures (1/3·2/3 rule) — rare (live game shows one actor), small.
Gain vs loss: Được lớn hơn — overlap is gone everywhere through one function.
