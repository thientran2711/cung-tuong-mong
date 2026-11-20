PRIORITY #1 CHECK: OD 20/11 (Đầu hồ first try 1.1 = broken board; ROOT-74 06:04Z OK: fix + remove cal.k.dauho, she re-tests) | main BAL.mgTier.lev.dauho in dev/build/jbal2.js, engine j91 'fling' (Bắn cung shares it via kg82Aim) | review/cal-p2 (fix 6e456cf8 + cal.k.dauho removal) | claims: cal-p2 wk #2 session_01Rc5AsMmEgNigPGpiup9uKs
# REVIEW dauho (BIG, opus — BAL numbers / difficulty) — Foreman C-AG #29 session_01Rc5AsJ8GMpdM1fyxzYaf1d

## READ FIRST
- Handover branch claude/cung-tuong-mong-handover-hj0h8w: dev/rules/START_CORE.md (★ THE 18 LAWS block first) + START_WORKER.md + START_REVIEWER.md; dev/handover/briefs/cag27-cal-p2.md (sections on Đầu hồ) + dev/handover/reports/cal-p2.md (Đầu hồ part).
- main: dev/build/jbal2.js (BAL.mgTier.lev.dauho, BAL.ag.mg2.cal.k), dev/build/j91.js (fling engine), jmgt.js (mgLev/mgGrade), dev/MINIGAMES.md, dev/measure/mg-bots.js.

## TARGET
review/cal-p2 at the sha in the opening message (worker's "SẴN SÀNG dauho <sha>"). Change claimed: BAL only — lev.dauho aid [.14,.45]→[.6,2], mouth [.8,1.3]→[1.3,2.1], NEW pull [.8,.6] (drag gain; strongest throw unchanged); cal.k.dauho 1.1 REMOVED; MINIGAMES.md row; new dev/test/cal-dauho.js. Cause: aim dots shown only .14–.45 s of ~1.1 s flight; 1 px drag = 7–13 px landing vs ±9–12 px zone. Her-model ladder 1.8/1.3/1.0/0.9 → 8.9/7.8/5.2/2.5.

## CHECK (FAIL on any)
1. Law 4: every new number in BAL; engine reads BAL only; no per-engine constant.
2. Law 5: harder with rank — ladder strictly falls; top rank still hard.
3. Bắn cung (ban) byte-identical result (same seed) — shared kg82Aim not changed.
4. cal.k.dauho removed; mgcal_apply / ag-mgcal / Thử tay still work with dauho missing (she re-tests); old save with cal.k.dauho loads fine.
5. Bot check (mg-bots.js): a normal adult hand on the fixed board lands ≈ average (owner target OD ~07:20Z: average adult ≈7 per board); her model not near 10 at entry rank.
6. LOOK (law 12): Đầu hồ on Fold 755x1000 + iPad 1180x820 — aim dots reach the pot, mouth visible, nothing off-screen; look at each shot.
7. Tests: assemble + build_site, cal-dauho, mgcal-apply, ag-mgcal, mg-skip, mg-noword-a, quickcheck incl. old save. Pre-existing main FAILs (ag-mgh 7, ag-mg2 summons ×2, slap-mg timeout) listed separately, not blamed.
8. Only BAL + test + MINIGAMES.md touched (git diff origin/main..sha --stat); no UI/kit change.

## IF PASS
Final-merge NEWEST origin/main (git ls-remote origin main) into review/cal-p2-rv (branch from the target sha), rebuild index.html/sw.js if the build needs it, rerun tests, confirm `git merge-base --is-ancestor origin/main <final>`. Push review/cal-p2-rv only.

## VERDICT
Write dev/handover/reports/rv-dauho.md (handover branch; python-script edit; fetch-reset-reapply on reject; never rebase). send_message C-AG #29 session_01Rc5AsJ8GMpdM1fyxzYaf1d "PASS <final sha>" or "FAIL <sha> <n fixes>" (+ fix list; fixes go to wk #2). Never push main, no PR. Fetch with '+' refspecs under flock /home/user/wt/fetch.lock, --depth=30; sparse worktrees; never full-clone. Rollover: START_CTX % + 25 % (ceiling 60 %) → handover in the report, tell C-AG #29.
