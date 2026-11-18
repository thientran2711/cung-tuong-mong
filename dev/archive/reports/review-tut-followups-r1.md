# review-tut-followups-r1 (reviewer, opus, BIG review) — review/tut-followups @ aa391edf

Branch reviewed: `review/tut-followups` aa391edf (base review/tut-quests-r1 66f598de, now on main via batch-2300), merged onto origin/main
0f61ff92 on `review/tut-followups-r1` (onto 08725411 = b2da2009, re-merged as main moved: 744b80e7 = 88245542, f5220eaa = 8c9255a1, 0f61ff92 = e37c9675, 7abaf07a = 92cce50b). Conflicts: assemble.py (main's list,
already holds jtq14), jroute.js rtStoryHTML (kept the branch's kitChecks ladder line + main's `BAL.route.anDuc` line), generated
index.html/sw.js/assets.json rebuilt with build_site.sh.
Rules read: PREAMBLE, REVIEWER, START_CORE/WORKER/REVIEWER, worker report tut-followups.md, review-tut-quests-r1.md.

## Claims vs build
| # | claim | check | result |
|---|---|---|---|
| 1 | bd plays ch 1–3 + quests | tut-origins-scan 10/10 (bd wrapped, f14, nhap14, an/di/trang); tut-quests TQ_ORIGIN=bd 35/35 (ch1–3 by tapping, ch4 = a bd road); fast story bot probe incl. bd: 14/14 chapters 1..14 in order (4 runs) | OK |
| 1 | no double-wrap side effects | story67Wrap idempotent (`old.__old` guard); only j67 iterates STORY (grep: no other module wraps STORY slots, so bd misses nothing else); story67Acts gives the same acts getter as before for the 9 old origins; tt/dtq/muoi/cn/nc/td/ch/thd/cnv chapter walks unchanged | OK |
| 1 | old bd saves | tut-followups.js: bd save from 66f598de loads, keeps v1 story (no f14), 3 months pass, story tab renders | OK |
| 2 | typed ✓/✗ step lists → kit §46 kitChecks | typed-checks-scan.py re-run: HAND = 0 (46 marked lines all KIT / KITPATH / COMMENT / glyph / canvas, j72 = KITREQ) | OK |
| 2 | KIT consistency scan of every step/check list | every check list uses the one part kitChecks (jtabs.js): j67 card67 (own kit section «Các bước»), j67 panel67/rows67 (kit row value), jroute Tư tình/Trốn cung ladders (kit row value), jgoal/jchap chapter detail, jtq14 quest cards, jmcal, jreign; requirement tables = kitReqRows §51 (different kind: numbers). Shots: same ✓/✗ kit mark, size, colour, indent in all of them | OK |
| 3 | cung nữ Thân phận tab raw srvRows array | `kitRows(srvRows())`; shots Fold/iPad@2/1366@2/1000x755/844x390: kit rows, no "Thân phận,…,t" text, no h-overflow | OK |
| 4 | KIT REQUEST j72 Việc nhờ 3-state list | j72.js: 0 lines changed vs main; still hand list `✓ / ▸ / ·` at j72:253, listed as KIT REQUEST in the worker report (generalise §69.3 kitCoopSteps → kitSteps). NOT yet in dev/kit/KIT_REQUESTS.md → coordinator to log it | OK (log pending) |

## Tests (merged builds; final 92cce50b on main 7abaf07a)
Final build 92cce50b (main 7abaf07a, kit-size-10 only): one-core-guard PASS 0 fails; coop-e2e 60/60; tut-origins 10/10; tut-followups 5/5.
Final build e37c9675: one-core-guard PASS 0 fails; coop-e2e 60/60; tut-origins 10/10; tut-followups 5/5; tut-quests tt 35/35, bd 35/35.
On 8c9255a1 (main f5220eaa, before coop-main-faults): coop-e2e 53/60 once (host week not ending, «pend»), then 60/60; main alone 60/60 — the next main batch fixed an observer loop that hung the host; not this branch (no co-op code touched). Chapter card re-shot in the new kit-size frame (Fold@2, iPad@2): Mục tiêu row → «Các bước» kitChecks section → Hạn row, OK.
Earlier builds:
| test | result |
|---|---|
| one-core-guard.js (main's, no --allow-grow) | PASS, fails 0 (inlineNow 6674 / baseline 6691) |
| coop-e2e.js (live Worker) | 59/59 (b2da2009) and 59/59 (88245542) |
| tut-origins-scan.js | 10/10, 0 page errors |
| tut-followups.js | 5/5 (and 9/9 with shots), 0 page errors |
| tut-quests.js tt / TQ_ORIGIN=bd | 35/35 / 35/35 (b2da2009: one tt run 34/35 «C Lỡ dịp» under parallel load; probe 8/8 OK, re-run 35/35 → flaky) |
| story14-view.js 755x1000 + 1180x820 | PASS |
| story14-frame.js | 27/27 on 66f598de, on main 744b80e7 (×2) and once on b2da2009; 26/27 four times on b2da2009/88245542. The one FAIL is always the known flaky «fast story bot» stall at ch 10 arc tm96c (dtq / muoi / nc / nc in turn, no error, 900 months), already seen by review-tut-quests-r1 on 0e06e71c (a build WITHOUT this branch). This branch touches neither j96 (tm96) nor beat/option code; my fast-bot probe (same 40-step bot + all 10 origins incl. bd) walked 1..14 for every origin in 4/4 runs on b2da2009/aa391edf. The rate looks higher on this build (seeded random stream shifts because bd lives now get a frame in the sensible bot), so I count it as the pre-existing flake, NOT a branch fault — but it now fails often enough that it needs fixing (see notes) |
| old save | old bd save (66f598de) PASS; story14-frame «old save (main build)» PASS |
Shots looked at (scratch only, not uploaded, deleted): chapter card Fold 755x1000@2 + iPad; Mệnh truyện consort tab Fold + iPad 1180x820@2;
cung nữ Thân phận tab (+ panel67 «Các bước») 755x1000@2, 1180x820@2, 1366x1024@2, 1000x755, 844x390; jroute Trốn cung ladder Fold + iPad@2.
No horizontal overflow, no cut text, no page errors. Note: chapter card frame picture loads lazily (empty frame in the first seconds, as before).

## Notes for the coordinator (not blocking)
- Log KIT REQUEST «kitSteps 3-state (done/now/next), generalise §69.3 kitCoopSteps» in KIT_REQUESTS.md; then j72 Việc nhờ switches.
- story14-frame fast bot list has 9 origins (no bd); bd passes the same walk in my probe → worth adding 'bd' to that list next time it is touched.
- Order: jtq14 quest cards list unmet first; chapter card/detail keep step order. Same part and look; order only.
- Flaky tm96c stall (fast bot) needs an owner (story14): it now fails ~4 of 5 runs on this build (main alone 2/2 pass), so the story14-frame gate is noisy; dump S.st.M (cur/nb/due/dl) when the walk stops to find why tm96c gets no next hồi.

## Verdict
PASS 92cce50b (descends origin/main 7abaf07a).
