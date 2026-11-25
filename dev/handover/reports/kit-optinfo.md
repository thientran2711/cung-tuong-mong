# kit-optinfo (KK18) — reviews

## REVIEW r1 (24/11, sonnet reviewer, Foreman B)
PRIORITY #1 CHECK ('kitOptInfo|optinfo'): OD 0 | ledger 0 | claims 0 | main 0 (old canon only) | review/* review/kit-optinfo e672ebcb (KK18) + E75 KIT REQUEST in review/moment-r | no earlier review. Reused, nothing rebuilt.
Merged review/kit-optinfo onto origin/main ac4790f0 as review/kit-optinfo-r1; rebuilt (bash dev/site/build_site.sh), built files committed (branch had NOT rebuilt them). Head fc2a24492a0e96b4613630300a5ed6989b1c457f (origin/main is an ancestor).
Laws touched: 9 (one kit part kitOptInfo, no private copy), 11 (whole «!» group scanned), 14 (old rule replaced in place), 7 (no new words), 6c n/a. Layout: opt-card-scan shows the card layout unchanged by the «!» change (owner OD L2134 meter on title row, L2212 approved layout).
Results:
- node dev/test/optinfo-rows.js file://<index.html> (Fold 755x1000 + iPad 1180x820): MAIN ac4790f0 = FAIL ("FAILED 2 card(s) hide rows", missing Kèm,Bại,Mất on the synthetic full-rows card, both devices); BARE e672ebcb (own build) = ALL PASS (8 cards); MERGED = ALL PASS (9 cards); MERGED SEED=1/2/3 = ALL PASS (8/6/10 cards).
- optinfo-rows.js with NO args: crashes "page.goto: url: expected string, got undefined" (url is a required arg by design, same as other scans; not a fault of the branch).
- node dev/test/opt-card-scan.js <url> <out> t (SEED=7, Fold+iPad), main vs merged: card layout lines identical where the same random event came up; differing lines = different random events (SEED is not like-for-like across builds, as B noted); the case "many" skips with the same ERR/hidden on main and branch for seeds 1/2/3 = harness noise, equal on both. No-arg run crashes on missing url (required arg).
- E75 bribe card (review/moment-r 1d2189f3 + this fix, node dev/test/moment-shots.js): BEFORE (moment-r jopic) «!» of «Lót tay họa sư» shows only Tốn, Được, Ghi chú; AFTER shows Tốn Bạc -5 / Được tranh / Kèm bị đồn đút lót họa sư·Danh -1 / Bại Tốn công, không được gì / Ghi chú, Fold and iPad, no page errors. Looked at both shots: frame, title + odds meter on the title row, nothing moved on the card. NOTE for moment owner (not this branch): Kèm wording «khả năng vừa» is not on the odds ladder (law 7).
- Law-11 scan of every option «!» view: optinfo-rows over the real approachOne pool (up to 14 events) + a synthetic card with every row, 3 seeds, 2 devices: every folded row (Cần/Kèm/Bại/Ghi chú) of a live card shows in the overlay; dead cards (disabled/kdis) keep hidden rows by design. Limit: pool = approachOne events only; other dialog families were not enumerated.
- bash dev/tools/quickcheck.sh --runs 5 (alone, merged head): perf/open/old save PASS ("QUICKCHECK PASS · 410 s · open 2147 ms · old save ok · perf median new/live render 290/287, tab 589/567, buoi 2155/1690, tasks>200ms 27/25"), but the final line was "QUICKCHECK FAIL · CORE GATES FAIL · G4 80-dialog-fixed": dev/test/dialog-fixed.js "(#54) the new-title plate sits ON the event picture" (Danh hiệu mới). It is INTERMITTENT and NOT from this branch: it fails on origin/main ac4790f0 too (main 1 FAIL in 5 runs; merged 2 FAIL in 5 runs, rest all pass) = a random-event flake (Danh hiệu mới card, kt3 pane) already on main. Reported to Foreman B as a separate item.
- node dev/test/coop-e2e.js (live Worker, merged head): 142/142 passed.
- Old save: quickcheck "old save ok".
VERDICT: PASS (with the pre-existing dialog-fixed #54 flake noted) — kit-optinfo-r1 fc2a24492a0e96b4613630300a5ed6989b1c457f.

## REVIEW r2 (25/11, sonnet reviewer SEAT 2a, Foreman B) — review/kit-optinfo-r2 a6ca99943e283791af85ddc35ffde281dce8a6c7
PRIORITY #1 CHECK ('kitOptInfo|optinfo'): OD 0 | main 0 | review/* kit-optinfo-r1 fc2a2449 (r1 PASS above, reused) | claims: KK25 only.
START_CTX ~8%. Laws touched: 9 (one kit part kitOptInfo, only caller = the «!» capture handler), 11 (whole «!» group; knumpop is a separate kit part, untouched), 14 (KIT §6.2b not changed; NOTE pre-existing on main: KIT.md has TWO «### 6.2b FINAL OPTION CARD» headings, lines 835/837 = law 14 double version, not from this branch → for KK25), 7/6c n/a.
- Head = r1 fc2a2449 + main 502c48c9 (main is an ancestor). Built files: bash dev/site/build_site.sh → only the CTM_BI build line differs (fresh).
- optinfo-rows (Fold 755x1000 + iPad 1180x820): MAIN 502c48c9 = FAIL («Thử hàng gập | Đưa lót tay…: missing Kèm,Bại,Mất», 2 cards); r1 bare fc2a2449 = ALL PASS (10 cards); r2 head = ALL PASS (12 cards); r2 SEED=1/2/3 = ALL PASS (4/11/9 cards). No args: crashes on missing url (required arg by design, same as r1).
- opt-card-scan (SEED=1, Fold+iPad, main vs r2): 46 lines each, 2 differ (dress 2S cut 669↔587, fest MOVED↔fixed) — flaky on MAIN too (4 repeated runs: main and r2 both flip) = harness noise, not the branch.
- Shots (Fold + iPad, looked 3×: card, «!» overlay on main and r2): r2 overlay shows frame, title + odds meter on the title row, Tốn + Gợi ý; no longer dimmed like main's disabled clone; no page errors.
- Law 11: one caller of kitOptInfo (jopic.js click delegate); a really disabled/kdis card keeps disabled look + hidden rows by design.
- Merged onto NEWEST main 345eb929 (sfx-instant): source merges clean, only built sw.js conflicts (rebuild regenerates); rebuilt → optinfo-rows ALL PASS (10 cards).
- bash dev/tools/quickcheck.sh --runs 5 (alone, r2 head): QUICKCHECK PASS · 303 s · open 1764 ms · old save ok · perf render 218/219, tab 435/400, buổi 1075/999 · core gates PASS.
VERDICT: KIT OK a6ca99943e283791af85ddc35ffde281dce8a6c7 review/kit-optinfo-r2
