# BRIEF cag28-mg-fair-ratio — mg-fair-hands RATIO STEP (opus worker; BAL numbers, BIG; stays HOLD)
PRIORITY #1 CHECK: OD 20/11 ~01:18Z (thirds base) / ~01:42Z (numbers wait for her code) / ~01:50Z (upbringing shift) / ~06:20Z (ratio ask, below) | main 2ec6062e: BAL.ag.mg2 in jbal2.js, jmgcal.js mgCalBand, jmgt.js mgHand/mgNpcRaw | review/mg-fair-hands PASS 3fe87277 (+ origin-arts BAL.orig.art) = THE mechanism, reuse it | claims: this worker; same numbers family as review/cal-p2 (wk #2 session_01Rc5AsMmEgNigPGpiup9uKs — read its report, do not touch its branch).

Foreman: C-AG #28 session_01Rc5AsLarKgavDpQSsAHHYB. Order from MAIN ROOT-74 session_01Rc5AsLW7a12BUC5kZhtsTy (06:03Z).

## READ FIRST (in full, handover branch claude/cung-tuong-mong-handover-hj0h8w)
- dev/rules/START_CORE.md (★ THE 18 LAWS block first) + dev/rules/START_WORKER.md.
- dev/handover/briefs/cag25-mg-fair-hands.md + dev/handover/reports/mg-fair-hands.md + reports/rv-mg-fair-hands.md (what 3fe87277 does).
- dev/handover/briefs/cag27-cal-p2.md (owner words 05:35Z…08:35Z; current method OD 08:30Z: one fitted board per kind + identity ±2 on the RESULT) + dev/handover/reports/cal-p2.md (§B skill type per kind, §A2: centring NPC hands on HER b flattens her profile; centring on 7.5 (adult median) keeps it).
- dev/OWNER_DECISIONS.md lines 1975–2040.

## OWNER WORDS (verbatim, 20/11 ~06:20Z, ROOT-74 chat)
"Bây giờ chỉnh cái độ khó của game rồi không nói đi ha. Bây giờ tiếp đến là mình còn phải chỉnh cái tỷ lệ của những người giỏi hơn tôi, những người bằng tôi và những người dở hơn tôi như thế nào nữa, cho nó giống với đời thật không."

## MAIN's PROPOSAL to her (waiting her OK — DO NOT LAND)
Split of NPC hands vs HER per kind, by her real-world standing, BEFORE the upbringing shift: careful/strategy kinds better 15 / equal 20 / worse 65; artistic kinds 35 / 25 / 40; reflex kinds 45 / 25 / 30. Then the upbringing shift (OD ~01:50Z) moves each NPC (khuê các trained = stronger, poor-born weaker until they study).

## JOB
1. Fresh branch review/mg-fair-ratio from review/mg-fair-hands 3fe87277; merge newest LIVE origin/main (git ls-remote origin main; today 2ec6062e — her calibrated BAL numbers stay as LIVE has them).
2. Put the three splits in as BAL knobs (law 4 one core): a per-kind group map (careful/strategy | artistic | reflex — take the group from cal-p2 §B skill column; list every kind with its group in your report) + split per group, replacing the single BAL.ag.mg2.hand.split. Keep the thirds mechanism, upbringing, law 1 two-way, law 5.
3. Bot-check (dev/measure/mg-bots.js, contest sims like cal-p2 §A2): her P1st / Ptop3 / mean place per group at her level −1/0/+1/+2, and the old→new pass-rate jump (earlier flag: 3–9 % → 87–94 %) — say whether it is fixed; note how the cal-p2 08:30Z identity ±2 on the result changes those odds.
4. Tests: assemble + build_site, ag-mg2 / ag-mgcal, the branch's own tests; list pre-existing main FAILs separately.
5. Report dev/handover/reports/mg-fair-ratio.md (handover branch, edit by python script, fetch-reset-reapply on reject, never rebase). Then send_message C-AG #28: "SẴN SÀNG mg-fair-ratio <sha> (HOLD)" + the table. Do NOT send LAND READY. Stays HOLD until MAIN relays her OK.

## RULES
- Push only review/mg-fair-ratio; never main; no PR; English commits with your attribution lines.
- Fetch with '+' refspecs under flock /home/user/wt/fetch.lock, --depth=30; sparse worktrees; never full-clone.
- Rollover: at START_CTX % + 25 % of the window (ceiling 60 %) write your handover in the report and tell C-AG #28; the coordinator opens the successor.
