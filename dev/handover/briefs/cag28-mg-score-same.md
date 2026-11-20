# BRIEF cag28-mg-score-same — SCORE SHOWN = SCORE GIVEN, all 31 mini-game kinds (opus worker; OWNER BUG fast lane; BIG; lands ALONE)
PRIORITY #1 CHECK: OD 20/11 ~06:50Z (below) + cal-p2 finding (reports/cal-p2.md, "Cờ felt 10 → 9.7") | main 37e4a68f: dev/build/jmgt.js:43 mgGrade = round(10·(raw/10)^kG) (BAL.mgTier.kG per kind / gamma), jmgt.js:56 mgPace (time part, BAL.mgTier.pace), j82 kg82Go board shows Math.round(pts)/10 (RAW), kit clock chip kitGameClock / kitCoopClock (KIT.md §13, §69.4) EXISTS — reuse it | review/* cal-p2 (numbers proposal HOLD; do not change kG VALUES here — only make the shown number match), mg-fair-ratio (HOLD), mg-visual / mg-noword-* (MAIN's, UI) | claims: this worker.

Foreman: C-AG #28 session_01Rc5AsLarKgavDpQSsAHHYB. Order from MAIN ROOT-74 session_01Rc5AsLW7a12BUC5kZhtsTy (06:08Z).

## READ FIRST (in full)
- Handover branch claude/cung-tuong-mong-handover-hj0h8w: dev/rules/START_CORE.md (★ THE 18 LAWS block first) + dev/rules/START_WORKER.md; dev/kit/KIT.md §13 (kit game frame, kitGameClock, kgReady) + VANPHONG.md (no %, no words in play per OD 20/11 ~05:10Z); dev/handover/reports/cal-p2.md (the Cờ 9.7 analysis).
- main: dev/build/jmgt.js (mgGrade, mgPace, mgLev, KG82 result path), j82.js + every engine family file (j91, jnwp, jnwq, jlant, jts, jslap, jtd, jhd, j92, jsgame, jroute), dev/MINIGAMES.md.

## OWNER BUG (verbatim, 20/11 ~06:50Z, ROOT-74 chat)
"Có nhiều môn thấy tính lệch lắm nha, có nghĩa là lúc mà tôi vào á, tôi chơi tôi thấy cái nào cũng là kiểu như là đạt hết. Đến lúc tính điểm toàn 9 trên 10 không, mà không hiểu tại sao. Tôi cứ nghĩ là tại vì cái thời gian nó càng thấp cho nên bị trừ điểm bớt, mà không biết có phải không."

## JOB (whole family, law 11 — all 31 kinds, every engine)
1. Scan script: per kind, what number the board shows during play vs what the result gives (raw vs graded, time part, rounding, caps) → table kind | engine | shown | given | cause.
2. ONE grading path (law 4): the board shows the GRADED value live (the same function the result uses), so what she sees while playing = her final mark. No hidden cut.
3. Time part: visible while playing through the existing kit clock/pace cue (kitGameClock; no words in play), and FAIR — a perfect run at normal adult speed must not be cut every time; if mgPace needs near-instant play for full marks, propose the BAL pace change in the report (proposal only — numbers family is HOLD; the visible-and-matching part ships now).
4. Bot check per kind (dev/measure/mg-bots.js): an all-hit normal-speed run scores what the board said (before/after table).
5. Tests: assemble + build_site, ag-mgcal, ag-mg2, kit tests for the touched part, Fold 755x1000 + iPad 1180x820 shots of 3 kinds (look at each, law 12), old-save load. List pre-existing main FAILs separately.
6. Push review/mg-score-same (from newest origin/main); report dev/handover/reports/mg-score-same.md (handover branch, python-script edits, fetch-reset-reapply on reject, never rebase). send_message C-AG #28 "SẴN SÀNG mg-score-same <sha>" + table. No LAND READY, no PR, never push main.

## RULES
- Kit first (law 9): no new chip/frame; missing kit part → stop, file dev/kit/KIT_REQUESTS.md, tell C-AG #28.
- Fetch with '+' refspecs under flock /home/user/wt/fetch.lock, --depth=30; sparse worktrees; never full-clone.
- Rollover: at START_CTX % + 25 % of the window (ceiling 60 %) write your handover in the report and tell C-AG #28; the coordinator opens the successor.
