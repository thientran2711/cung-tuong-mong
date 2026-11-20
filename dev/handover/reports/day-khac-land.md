PRIORITY #1 CHECK ('day-khac-audit|khắc còn lại'): OD L1472, L1654 | main j76 time-spill | review/day-khac-audit-r1 PASS 46900ee2 (stale) | claims none open.

# DAY-KHẮC LAND #1 — worker session_01964izDcv1Uu66VaTiD7hZB (JOB 2, D9-gap-jobs.md, row OD07)

START_CTX ≈ 5 % (estimate). Read in full: START_CORE, START_WORKER, the brief header + JOB 2, topic/time-calendar, review-day-khac-audit-r1.md (r1 + § ROUND 2 PASS), OD L1654 verbatim.

## Branch
review/day-khac-audit-r2 from 46900ee2 (r1 PASS):
- 30e2d593 merge origin/main 716be762 (2072 commits since c114ab9e). Conflicts (time code, both sides kept):
  - j77 lead option: MAIN's charging (bạc only on success, "hỏng: không mất bạc", odds read before spend) + OUR j77When arrival words ("thành: được vào (đến nơi vào buổi …)" when it spills).
  - jgift courtMeet: MAIN's wording (no odds word on sure walks) + OUR accSpillOk spill branch for "Đến <nơi> gặp ngài" and "Sang Đức Thọ cung thỉnh an".
  - index.html / sw.js: theirs + build_site.sh.
- one core (law 11): j77 accLeadCost() reads BAL.sneak.lead (new key = 15, jbal.js), was a typed 15. jk3 khắc dots already read BAL.time.khac on main; j95 `[0,1,2,3]` rows are record shapes (J95.KH-length rows, C-AG area) — left, see notes.
- time-spill-guard (added to the scan):
  - static: new patterns for the BAL forms of the buổi-only gate (usedbal `used+N <=/> BAL.time.khac`, minbal `Math.min(n,BAL.time.khac-used)`, kleft `BAL.time.khac-used < cost`); every hit read by hand and listed in ALLOW with the reason (j1 base can wrapped by j76 · j15 whyTime wrapped · j72 after day can · j9 walkOk plain walk · j77 j77When label · jmen/jtsb spill first · jrest fallback · j76 core). The old patterns only caught a typed 4.
  - runtime row 11b: at sáng and chiều with 1 khắc left, no disabled button on any tab or court card may say "hết khắc"/"không kịp" (sáng-only thỉnh an excepted, OD L852 (b)). 146 disabled buttons scanned, 0 bad.
- d411ec80 rebuild; then final-merge origin/main 66bd36cd (mg-play2 / mg-fair-ratio: no time code touched; only index.html/sw.js conflicted) + rebuild.

## Sweep (every new check since 17/11)
`git diff c114ab9e origin/main` on dev/build/j*.js grepped for kịp / khac-used / used± / J95.KH / buổi này / trong buổi: every new player-side gate goes through can()/dayFit/j76left; NPC deeds use agFitDay = `n<=j76left(...)` (day function) with agSpill painting the next buổi; J95.KH loops are record rows (this buổi's row, spill handled by agSpill). Labels only: "Việc chủ sai … được vào nơi ấy buổi này", "Canh chừng … suốt buổi này", feelActDur "buoi". Nothing left to fix.

## Gates
- time-spill-guard: PASS static + 76 runtime.
- quickcheck.sh @d411ec80: PASS (core gates PASS, time-spill guard PASS, old save ok; render 191/220, tab 423/508, buổi 1222/1264 ms new/live).
- coop-e2e @d411ec80: 68/68.
- tier.js = BIG; its 54 tests run on branch AND live 716be762 with the same URL arg: no test worse on the branch (d19-gift, nrask-engine pass on branch / fail on live; tut-quests 8 vs 12 FAIL lines; thaiy 43/49 both — same FAILs). Many tests need other args (outdir/size) and fail the same way on both → not regressions. rest-cards fails on BOTH: the test types old BAL numbers (Sức 20 / Bạc 8; BAL now 24 / 3) — stale test, not time; for the rest-cards owner. perf.js timed out at 600 s (quickcheck perf used instead).

## Final (after the 66bd36cd final-merge)
- quickcheck.sh @e4625ca5: PASS (core gates PASS, time-spill guard PASS, old save ok; render 250/209, tab 510/600, buổi 1540/1210 ms new/live). The buổi number swings ±25 % with no code change (unseeded life, review r1 note); the run before on d411ec80 was 1222/1264. The only code added by this merge is minigame code (no time path).
- coop-e2e @e4625ca5: 68/68.
- Context at the end ≈ 20 % (under the 30 % rollover line).

## Notes (not done here)
- j95 `[0,1,2,3]` rows: the NPC record is J95.KH long by design (C-AG area); a cleanup would be `Array.from({length:J95.KH},…)` with J95.KH from BAL.time.khac — touches the roster core, left for C-AG.
- rest-cards.js test types BAL numbers (Sức 20, Bạc 8) → fails on live too; should read BAL.restDsSuc / restDsBac.
- tier.js prints tests without their args; many need <url> <WxH> <outdir>.

SẴN SÀNG KIỂM e4625ca51d6d47db689526e40469717a6c9e402c (review/day-khac-audit-r2)
