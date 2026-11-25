# rrcnvma-R4-lover-5 — player review (R3, cnv_ma, lover = romance player)
Harness 1a29f470 · seed 1667522449 · 711 buổi (6 years) · age 25 · rank 0 · 0 dead buttons · 4 stuck verdicts («Tin báo»).
LIMIT: no moment log; table + the age-25 card dump + end.png. No scores claimed.

## 1. Summary
Cnv_ma maid, ending «Xuất cung về quê» at age 25 (year 6), buổi 711, exitPick none.

## 2. VALIDITY — UNPROVEN, possible game or harness bug (needs a look, not a verdict)
Evidence (cnvexit-711.json + log + trace tail):
- Card «Đến tuổi xuất cung» offered «Xuất cung về quê» (off:false) and «Xin ở lại» (off:false, fx tin −5, tin was 40).
- Harness logged `CNV EXIT CHOICE picked «Xin ở lại…»`, pickedExit=false; the last trace entry is the tap on «Xin ở lại»; the very next thing is LIFE DONE «Xuất cung về quê» at the same buổi 711.
- So the robot chose to STAY, yet the life ended as the exit. cautious-2 and rebel-4 took the same «Xin ở lại» and played on to 30 / died at 28.
Two readings: (a) game bug — in origin/main j42.js PEND.cnvAge the low-tin «Xin ở lại» (line 442) has no `go` and only `fx:{tin}`, the stay relies on j42 srvMonth later; the card closed into the exit instead; (b) harness tap landed on the first option because the card re-laid out between hit-test and tap. Not decidable from the result. Suggest F/MAIN replay the card (ckpt near buổi 700 of this life) with a screenshot at the tap. Until then: VALID-UNPROVEN (not counted as clean).

## 3. Observations
- Ending art (open palace gate onto a blossom lane) is lovely.
- «Tin báo» stall ×4 (same family as cautious-2 / rebel-4).
