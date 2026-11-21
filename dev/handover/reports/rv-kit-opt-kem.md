# rv-kit-opt-kem — PASS (+ a separate pre-existing law-4 finding)

PRIORITY #1 CHECK: grepped OWNER_DECISIONS + CLAIMS + reports (rv maid-8tabs round 2 notes, rv-kit-e-rows «hints must be true now», rv-kit-ton-row), KIT.md §option cards; K-OPT-KEM reuses kitOptModel / kaRows (no new part). Older rules on the element: law 6(a) hints true now, law 4 display == applied, night «reading of the moment» stays a note.

Branch: review/kit-opt-kem-rv = keeper 79a5a451 + LIVE f3353128 (index/sw rebuilt), sha e09fd19a1ab6bbf2c1c08bce7688c4c1fcece033.

Change: jk2b.js kitOptModel — a number-less continuation phrase of a «kèm» / «hỏng» group is a NOTE only when it is the night reading (^ngài … or «an toàn»); every other one is an item (card row + hint item). Was: everything not starting nàng/hắn/các/Thái hậu/Hoàng hậu/Hoàng thượng/chứng cứ was a note, so «ít gặp Hoàng thượng», «chủ ít thấy mặt ngươi», «bị nghi ngờ» fell out of the card/hint.

Checks
- kit-opt-kem.js PASS (fails on LIVE per keeper): consort kèm / maid kèm / hỏng text → in card rows + hint items, notes []; night reading + «an toàn» stay notes.
- Whole group: recorded 111 distinct real option lines from 120 seeded turns (talkOpts + dilemma opts); kitOptModel on LIVE vs branch: 0 lines differ — the change only touches the rare continuation phrase, no collateral. Static scan of source phrases: the classification changes only concern number-less continuation phrases of kèm/hỏng groups.
- Looked at a real option dialog Fold + iPad (Tốn/Được rows, odds meter, «!» = odds ladder legend; the kèm/hỏng detail lives in the hint model, which the unit test covers).
- coop-e2e 92/92. QUICKCHECK PASS 257 s (second run; first run's buổi spike 4348 was my parallel probes): render 292/286, tab 577/538, buổi 1690/2131, core gates PASS, old save ok.

Law-4 check requested by MAIN («Sủng −3 vs BAL 2» = trait multiplier → verify shown == applied across option cards):
- CLAIM TRUE for the cited path: fmt(w/fx) (optLine's a.w, dilLine's c.fx) and apply() both go through sg(): for traits none / nồng nàn / lạnh lùng and v ∈ ±2,±3 shown == applied (table: nồng nàn −2→−3, −3→−4, +2→+3, +3→+4; lạnh lùng +2→+1, +3→+2; same on card and in apply).
- BUT a different family is NOT covered (pre-existing, not caused by this topic): option lines whose Sủng number is a LITERAL in the x string (not via fmt) are not passed through sg() on the card while their go() applies through apply() → sg. Confirmed on a real option: j7.js:22 «Tự trình lên Hoàng thượng» card «thành: Sủng +4» (balSg(BAL.eff.j7.sungGo)) but applied +5 with a nồng nàn Emperor (probe: shown 4, applied 5). Same pattern, not run: j7.js:57 «Phô tài» (x «Sủng +${BAL.visit.show.sung}» vs apply({sung:…})), j8.js:340/349, jact.js:168, jdis.js:88. Act cards are already fixed by jaudit item 15 (actLineRaw → sg); option lines (optLine/dilLine x text) are not.
  → Recommend a follow-up topic (law 4 + law 11): route the option-card x text through the same sg() rewrite as actLineRaw (jaudit §15) — OR move those numbers into fx/w — then re-run a shown-vs-applied scan over every option line with the trait combos. Does not block this topic.
