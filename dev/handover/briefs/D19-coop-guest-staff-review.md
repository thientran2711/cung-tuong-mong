# D19 REVIEW coop-guest-staff (sonnet SMALL, test-only; Foreman D #19, 22/11)
PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 2 (this item's worker + this review) | main 0 | review/* 0 | archive 0 (prio1.sh 'coop-guest-staff|guest staff|refused maid').
Read first, in full: dev/rules/START_CORE.md (18 LAWS at top) + START_WORKER.md + START_REVIEWER.md on branch claude/cung-tuong-mong-handover-hj0h8w; then the worker report dev/handover/reports/coop-guest-staff.md and the source dev/handover/reports/review-role-parity-bundle-fix.md «LIVE findings».
Target: review/coop-guest-staff @ 9c3701b3 (base LIVE b55a0e1c). Touches ONLY dev/test/coop-guest-maid.js, coop-pets.js, new coop-guest-lists-scan.js → SMALL tier.
1. Merge current LIVE origin/main (35f5b5ab or newer) into a branch review/coop-guest-staff-rv; no game code may change.
2. Judge the root claim: guest rank 0 → BAL.promo.cap[0]=[1,0]; the old driver pushed a maid over the household cap, capTrim legally sent her away (not a merge drop). Confirm from code (capSweep/capTrim, BAL.promo.cap) that the game behaviour is correct by the one-household law and that the driver fix uses a legal setup (real cung nữ rank ≥ Thường tại), not a hide/bypass.
3. coop-pets step 5 redesign: check it still tests «B ends first, A helps, merged week keeps the late help» for real (no forced state skipping the rule).
4. coop-guest-lists-scan.js: sane (11 lists, S.men host-only noted, not changed).
5. Gates one at a time on the merge: coop-guest-maid ×2, coop-pets ×3, coop-guest-lists-scan, coop-e2e ×1, quickcheck, role-parity (must be ALL PASS on LIVE ≥ 9c057f42). Use lib/coop-clear.js.
PASS → write «LAND READY review/coop-guest-staff-rv <sha>» (FF from LIVE) in dev/handover/reports/coop-guest-staff.md and send to Foreman D #19 session_01964izEH4wwUemtSvoAX3Xr. FAIL → list to the worker session_01964izEWWpayFt7fk18JEZB + D #19. Push review/* only; no PR; never main.
ROLLOVER (workers, owner 16/11 08:22Z s14): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
