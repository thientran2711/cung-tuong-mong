PRIORITY #1 CHECK ('review ag-moodknow'): OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 (topic hits: OD L1668 (1), L1669 khóc/hờn, L1651 (g) hờn; worker branch review/ag-moodknow)
# REVIEW ag-moodknow r1 — BIG (rules/numbers), opus
Role: REVIEWER. Read dev/rules/START_CORE.md + START_WORKER.md + START_REVIEWER.md (handover branch claude/cung-tuong-mong-handover-hj0h8w) in full, then dev/OWNER_DECISIONS.md L1651, L1668, L1669 verbatim.
Target: review/ag-moodknow @ 8d20e004, built on review/ag-all-2 86135854 (lands RIGHT AFTER ag-all-2). Review ONLY the diff 86135854..8d20e004; ag-all-2 has its own reviewer.
Worker report: dev/handover/reports/ag-moodknow.md (handover branch). Worker: session_01UV1Szkwcqu7s9tTHPUXBrh. Foreman: C-AG #4 session_01UV1SzkyZBYRFoSWBF8fg27.
Disk: sparse worktree under /home/user/wt, fetch --depth=30 under flock /home/user/wt/fetch.lock; never full-clone.
CHECK:
1. moodCauseKnown(pid) / moodCauseKnownBy(x,pid): ONE rule for her and NPCs; null → kit text "Nguyên do chưa rõ"; EVERY place showing a mood cause (seal popover, mood box rows + picture, pcf card, any other — grep) is gated. Whole-group scan, table.
2. PUBLIC vs SECRET: public causes leak in morning "Tin trong cung" by BAL.mck odds (clamped by BAL.odds, ≤3 lines); secret only via scouting / servants' errands / info sellers (j78) / Tai mắt / morning eyes. No path reveals a secret cause for free.
3. New moods khoc / hon inside the ONE jemo bar (BAL.emo2), no second mood system: khóc (strong sadness / slap, fades fast), hờn (sulk at someone close after slight/scold/punish/neglect; blocks friendly acts toward that person); NPC parity; causes feed moodCauseKnown. Seal art/animation is NOT this branch (kit-figure-mood) — check the keys are handed over, no private UI part (KIT FIRST: FAIL any custom chip/row/frame).
4. ONE CORE: every number from BAL; one-core-guard PASS; VANPHONG wording (cổ trang, no %).
5. Old-save load (no khoc/hon/mck keys) works; co-op host/guest sees the same rule.
6. Tests: ag-moodknow, ag-know, ag-truth, one-core-guard, QUICKCHECK --cpu4. Worker says ag-all.test perf p95 8 ms budget fails on base too (base 14/16.1 vs branch 15.5/17.8 ms): measure base vs branch yourself; FAIL only if the branch adds a real cost.
7. Fold 755x1000 + iPad 1180x820 shots of the mood box with a known and an unknown cause.
Output: PASS <sha> or FAIL + fix list. Fixes you make yourself go on review/ag-moodknow-r1 (tests/test-only or tiny). Report dev/handover/reports/review-ag-moodknow-r1.md on the handover branch (pull --rebase, push). send_message the verdict to C-AG #4 session_01UV1SzkyZBYRFoSWBF8fg27. Do not push main. Roll over at START_CTX + 25 % (ceiling 60 %): handover in your report, tell C-AG #4.
