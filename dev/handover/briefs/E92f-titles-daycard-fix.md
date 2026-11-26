# E92f — titles-daycard FIX r1 (4 faults from E92r REVIEW r1) — opus — Foreman E child6 = session_01DgYSWp91ne52jMqGmdDqJw
PRIORITY #1 CHECK ('kitChapterTitle'): OD 0 | ledger 0 | claims 5 | main 0 | review/* 0 | archive 0 — reuse jgoal.js chapter()/kitGoalAlt/kitGoalNow, do not write a second chapter source.
Read first: briefs/E-common.md + START_CORE (★ 18 LAWS) + START_WORKER; briefs/E92-titles-daycard.md (original task); reports/titles-daycard.md «REVIEW r1» IN FULL (handover 8c896b16) — the reviewer's 4 faults are your task list, word for word.
BASE: review/titles-daycard at c39be532 (= review/titles2-r3m; re-merge 98c175a1 already PASSED — do not redo it). Commit fixes on top, push review/titles-daycard (FF). Merge kit-daytitle-r2 313bdfc6 LOCALLY only to test the land combo.
TASK (fix the whole family, law 11):
(1) Home before tuyển tú (all 8 home origins: Khuê các / Cố quốc / Thôn quê …): card says «Chương 1 — Sơ nhập cung môn» while the goal panel says «Chờ kỳ tuyển tú…». window.kitChapterTitle() must reuse jgoal.js chapter() (kitGoalAlt first) so card and goal panel ALWAYS show the same chapter — one source.
(2) Chapter number: old save without M.chap gives hook 1 vs book 3 → derive from pos67 / the ch.all rule exactly as the book does.
(3) titles2-unit fails 5 on the land combo with kit-daytitle-r2 (test opens a panel while the start card holds the modal; game correct) → make the test card-aware (wait/close the day card), do not change game code for it.
(4) dev/test/chapter-title-hook.js must compare against kitGoalNow + every home road + an old save; then coop-e2e + quickcheck alone (G4 «Ô lưu · Lui» fails on bare LIVE — note, not yours).
Shots: Fold 755x1000 + iPad 1180x820, home-before-tuyển-tú card + goal panel side by side + a later day; LOOK at each.
VERDICT: «SẴN SÀNG KIỂM titles-daycard <sha>» in reports/titles-daycard.md «FIX r1»; CLAIMS row; STATUS line; send_message Foreman E (session_01DgYSWp91ne52jMqGmdDqJw). Foreman E opens a BIG reviewer. KIT bug (#klife over #kdaytc) is MAIN's kit keeper's — not yours.
ROLLOVER: at START_CTX % + 25 % of the window (ceiling 60 %), write your handover in the report and tell Foreman E; Foreman E opens the successor.
