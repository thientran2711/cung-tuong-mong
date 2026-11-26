# coop-night-wk6 — coop-night stall at week 6 (cases 10/11/12) on the B co-op lands chain
B FIXER session_01N1tNP6RK5S2z8muPwWsKcc (opus, BIG co-op, depth 1). Coordinator Foreman B (ROOT 2 child 1 session_01N1tNP3L4UTSEdfxqf2oV4h).
PRIORITY #1 CHECK ('coop-night|week 6|case 10|rbuoi|eRoomB|roomKey'): OD 5 | ledger 0 | claims 8 (none on this case after week-wait / thin-g rv-landers) | main 11 | review/* 6 | reused: rv-lander 4KCumgKv «## EXPRESS LAND» (reports/coop-week-wait.md) + 6DRTr3qU «## REVIEW r4» (reports/coop-thin-g.md); jcooptimer eRoomB (the thin E room-buổi rule that already existed) folded into ONE rule instead of a new one.
BASE review/coop-thin-g-land ec88b0e2 (= LIVE 5e013076 + presence-reload + fix-3-r5 + week-wait + coop-thin-g). origin/main moved to f009e1a6 (SELSCENE / stack lands) but does NOT hold the co-op chain → branch stays on the chain head (land after ec88b0e2). main touched jcoopworld (SELSCENE-8/15/18/19: selxHold, lifeRekey, onBuoi capTell) in other lines than this fix.
Branch review/coop-night-wk6 = ec88b0e2 + 4 commits (fix 0845eef9, test rows, site rebuild).

## Why both seats stalled — run alone on base (local wrangler dev Worker :8797, Fold 755x1000 host + iPad 1180x820 guest)
Two different things hid under «case 10/11/12 at week 6»; the thin level decides which:
1. THIN 13 (the chain's thin rooms, levels ≥ 5 = «eW»): REAL GAME FAULT. Thin E sends no `bend`, so the server's room buổi (CW.rbuoi from room / presence) stays at the week's 0 all week. sendMe (a re-sent / new life: rebirth, nlAccept, jkc, rejoin) aligns a mid-week life to «the room's current buổi» from that stale 0: the host, at buổi tối with his night committed, was thrown back to buổi sáng of the SAME week (trace: `sendMe` → host b 3→0, ngo/ngoW/nrdy cleared, sent -1), so his committed night never ran and his `end` never went; the guest (part G) already had her week end run on the host and waited on «Chờ hảo hữu…» → both seats in the week for ever ([w0,w0,w0]: ONLY=10 at week 0 [0,0,0], full run at week 6 [6,6,6]). Case 11 failing on week-wait-land was the same stall carried into the next case. A real pair at thin ≥ 5 would hit it on any re-sent life at a day buổi > 0 (rebirth after a week-end death, a life card accepted, a rejoin).
   The same stale 0 also refused nightEnd for every buổi but sáng at eW (her night with the Emperor ends her day through nightEnd → eNext).
2. THIN 0 (every real player today): NOT a game fault. Base full run 126/127, only row «10: the host still in tối behind his dialog»: the host's night DID run over his one-road dialog. Trap on Q (Proxy, QLOG): the panel left Q through `Proxy.shift at nightAfk (jcooptimer)` — the AFK bound (BAL.coopTm.nightMs 30 s, OD L680 ruling: after the bound a real choice is CARRIED off her screen, kept in S.cq, shown again after the merged week). At week 6 the guest's own night cards make her `end` take ~20 s, the case's wait passes 30 s from the commit, so the designed bound fires. stepQ itself HOLDS the panel (qKind: any `opts` array = "hold"); the EXPRESS LAND reading «stepQ carries the one-option panel» was wrong — it was nightAfk. ONLY=10 passes because the wait there is shorter.
3. Case 12 THIN 13 (row «12 host: same buổi + same clock on both» ["9:3","9:0",…]): the clock commits the night before the host reloads; part G has run her week end on the host, so her phone is at the new morning (9:0) waiting for his `end` while he is still in tối (9:3) — the same designed state as THIN 0 after her own night (pend). Stale row expectation.

## Decision table
| case | mode | symptom on base | root | decision | proof |
|---|---|---|---|---|---|
| 10 | THIN 13 | [w0,w0,w0] both seats stuck after the host's re-sent life at tối | sendMe used the stale server room buổi (0) at eW → host back to buổi sáng | REAL FAULT → fixed at the root: ONE room-buổi rule `roomB()` (no carry/hold path touched; week-wait's stepQ carry unchanged) | ONLY=10 THIN 13 base FAIL [0,0,0] → fix PASS; MUTATE (old line back) FAIL [0,0,0]; full THIN 13 ×3 126/126 |
| 11 | THIN 13 | fails after 10 (week-wait-land alone) | the case-10 stall carried in | no own change | passes in every full run on the fix |
| 10 | THIN 0 | row «host still in tối behind his dialog» FAIL at week 6 | the case waits past the designed AFK bound nightAfk (30 s) → his choice carried | STALE TEST TIMING → the case lifts BAL.coopTm.nightMs for its own span (case 4 / 4h still test the bound); the row still asserts that a real choice holds the committed night | full THIN 0 ×3 127/127 |
| 12 | THIN 13 | row «same buổi + same clock» ["9:3","9:0"] | her week end already ran (committed night) | STALE ROW → «same buổi» skipped only for a seat whose week end already ran (sent / pend / thin G: ngoW = week and past tối); the clock key is still compared | full THIN 13 ×3 126/126 |
Player-visible flow: a one-road tell panel is carried (stepQ, unchanged); a real choice (opts) holds the committed night until the AFK bound (case 10 row a1 PASS in all 6 full runs, case 3 night event with choice PASS, week-wait A2 PASS).

## The fix (law 11: ONE rule, law 14: the old copy removed)
`jcoopworld.js` roomB(): the room's current buổi of THIS week or null — eW: host = his own S.buoi (he is the room's step), guest = the host's view (V.o.buoi, same week); else the server's CW.rbuoi/rweek (unchanged semantics at level 0). Every «her buổi vs the room's» check reads it: sendMe mid-week life · onBuoi catch-up · nightEnd · forceBend · badbuoi catch-up · restore · jcooptimer roomKey (its private eRoomB deleted, it calls CW.roomB). Scan: `grep -n rbuoi dev/build/j*.js` → only the rule itself + its writers (rb / week). Level 0: byte-for-byte the same decisions as before (each old condition = roomB at non-eW).
| site | before | after |
|---|---|---|
| sendMe (new life mid-week) | CW.rbuoi (stale 0 at eW) | roomB() |
| onBuoi catch-up | CW.rbuoi (eW returns earlier) | roomB() |
| nightEnd (clock / her night) | CW.rbuoi (refused b>0 at eW) | roomB() |
| forceBend | CW.rbuoi (eW returns earlier) | roomB() |
| badbuoi catch-up | CW.rbuoi (!eW) | roomB() (!eW kept) |
| restore | CW.rbuoi (!eW) | roomB() (!eW kept) |
| jcooptimer roomKey | private eRoomB + CW.rbuoi | CW.roomB() |
Tests: dev/test/coop-night.js case 10 (bound lifted for the case) + leaveBack row (ps). No UI, no wording, no number (law 4/7/9/10 untouched).

## Gates (head 4ba6d372 code = 0845eef9 + test rows; local wrangler dev Worker of coop/worker, restarted before every run; one co-op test at a time)
| gate | fix (review/coop-night-wk6) | base ec88b0e2 |
|---|---|---|
| coop-night full THIN 13 | 126/126 ×3 (f13d/e/f) · before the case-12 row fix: 125/126 ×2 + 119/120 (only the stale row) | case 10 [w,w,w] (rv 6DRTr3qU: 124/126, 10 + 12); ONLY=10 [0,0,0] |
| coop-night full THIN 0 | 127/127 ×3 (f0c/d/e; f0d/e on the final test file, f0c before the c2ea08b4 row tweak) | 126/127 ×2 (row 10 a1, the AFK-bound carry) |
| coop-night ONLY=10 THIN 13 | PASS (case 9 ONLY-mode artefact as on base) | FAIL [0,0,0] |
| MUTATE (sendMe back on CW.rbuoi) | ONLY=10 THIN 13 FAIL [0,0,0] ✓ | — |
| coop-week-wait SWAP 0 | 30/34 (gates series, host «Có người đến» queued while #modal hidden) → alone 34/34 | alone 32/34 (A2 rows) = same flake family both sides |
| coop-week-wait SWAP 1 | 34/34 | — |
| coop-e2e SWAP 0 / SWAP 1 | 143/143 · 143/143 | — |
| coop-cal-rebirth | 2 rows red in the series (case 2/3 «room steps» [2,2,2]) → alone 80/80 PASS | alone 79/79 PASS |
| dayq-hold-coop (LIVE Worker, as rv) | 22/23 once («host R no-clock board») → 23/23 ×2 | 23/23 |
| coop-thin-g g4 (L13, 4 weeks) | 24/24 | — |
| coop-keymove-unit | 12/12 | — |
| coop/worker npm test | ALL OK (merge vault seat stale thin range presence) — Worker unchanged | — |
| sangbuoi-held (built index.html) | ALL PASS | — |
| quickcheck ALONE vs LIVE 5e013076 | quickcheck.js PASS: open 2545 ms · old save ok · perf new/live render 243/271 tab 636/760 buổi 2451/2208 tasks>200 28/28. Core gates: G4 90 crawl «fold · Ô lưu · Lui» = PRE-EXISTING (fix-7 r3); G4 50 coop-one-world red once in the run → alone seeds 7/3/1/2 PASS on the fix, base seed 1 FAIL «merge differs» (flake on both). (vs origin/main f009e1a6: the live build itself timed out to load 2/3, not measurable) | — |
Level 0 (every real room today): roomB() gives the same answer as each old CW.rbuoi condition → no behaviour change at level 0 (THIN 0 runs prove the test side only).

## Real 2-seat rooms (robot-rt-coop real taps; Fold 755x1000 host + iPad 1180x820 guest; local Worker; room level 13 = the fixed path; both-seat reload through the runner's own peer-rejoin path, triggered at the room's week-N tối; uncommitted local runner copy = robot-rt-coop.js + recordVideo + THIN + reload trigger)
| run | what | result |
|---|---|---|
| R3 seed 29 (MAIN VIDEOS) | 36-buổi slice; BOTH seats reload at week 6 tối | weeks 0→7 + into week 7 with both playing; both-seat reload 10:24:50 → both back at 6.3 (buổi tối), same date 1/5/0 (no throw-back to sáng = the fixed path); night 6→7 ran for both, room stepped to week 7 at 10:26:43, same date 1/5/1 on both; then the guest seat's slice ended (AFK from 7.2) — see OPEN 1 |
| R2 seed 28 | 18-buổi slice; BOTH seats reload at week 1 tối | both back at 1.3 tối, same date «Tháng ba · trung tuần», same clock 4:43/4:44 (frame looked); night 1→2 and 2→3 for both; 0 page errors |
| R1 seed 27 | 31-buổi slice; reload at week 6 tối (host only: the guest seat's slice had ended at 6.2) | weeks 0→6 both playing, same date every step; host reload at 6.3 → back at 6.3 same date; his night ran; room waited on the AFK guest (OPEN 1) |
Dead buttons 0 (host), 1 harness «Lịch tháng» dialog scroll (guest R2, pre-existing harness note); robot BUG lines = harness no-clock loops («Lịch tháng», a place page) + the AFK wait. Page errors 0.
VIDEOS (CDN, outside git): https://ctm-img.victoria-tntt.workers.dev/img/_review/coop-night-wk6/fold-host-755x1000-full.mp4 + ipad-guest-1180x820-full.mp4 (R3, 86 min each; both-seat reload at ~52:00, night 6→7 at ~54:00) · r1-fold-host-755x1000.mp4 + r1-ipad-guest-1180x820.mp4 (R1, 66 min) · reload2-fold-host-755x1000.mp4 + reload2-ipad-guest-1180x820.mp4 (R2 both-seat reload at ~12:50 in the video). Frames looked: R3 after the both-seat reload (host buổi tối, guest rejoining) and after the 6→7 step (both Tuần lục «Tháng năm, năm thứ nhất, trung tuần»); R1 week 6 chiều both seats same date; R2 after the both-seat reload both Buổi tối same date same clock; R1 after the night: host new week «trung tuần», guest still on her «Nhận» reveal (AFK).

## OPEN (found here, not in cases 10/11/12; FOR Foreman B — a follow-up fixer, not this branch)
1. AFK GUEST AT LEVEL 13 HOLDS THE ROOM'S WEEK (R1, R2, R3): once the guest stops tapping (here: her robot slice ended), the host runs her week end (part G) but his `end` waits on gHold = her answers to her part-D cards / reveal («Hộp gấm … Nhận» stayed on her screen). The AFK bound (jcooptimer nightAfk, OD L680: after BAL.coopTm.nightMs a choice is carried, a one-button scene read) only arms while HER buổi ≥ tối (nafWait), and at level 13 her phone is already at the new morning → the bound never fires → the room never steps (host «Chờ hảo hữu…» for 8+ min, robot softlock). Level 0 has no such gap (her own night runs on her phone, the bound covers it). Likely fix: nafWait at gG() = the room's night committed and her week end done on the host while COOP.state.week has not stepped (law 11: extend the ONE bound, not a new one). Real pair: a guest who puts the phone down at the week end (thin 13) freezes the host.
2. HOST RELOAD WHILE HIS WEEK END WAITS (R1 08:28, R2 09:23, both after OPEN 1): the reload restores him to the room's week start or an earlier buổi (R1 6.0 1/5/1 → 6.0 1/5/0, R2 3.0 1/4/1 → 3.1 1/4/0) because CW.restore refuses a copy with pend / sent (by design) and the room C is the week start: his week replays. Pre-existing restore rule; only reached here through OPEN 1. Needs a ruling: is a replayed week acceptable after a reload at the week end, or should the pending end be kept?

## Laws touched
1 two-way: both seatings run the same rule (host / guest branches of roomB; e2e SWAP 0/1, week-wait SWAP 0/1) ✓ · 4 one core: no number added (nightMs only raised inside the test) ✓ · 6 real world: no object / person path touched ✓ · 7/9/10 no UI, no wording ✓ · 11 ONE room-buổi rule, the timer's private copy deleted, scan table above ✓ · 12 Fold host + iPad guest, frames looked, full videos ✓ · 14 the old rbuoi checks replaced in place ✓ · 16 no working rule changed: the AFK bound (OD L680) and stepQ carry untouched ✓.
Not done: real-player check at level 0 (no code change there; covered by the 6 THIN 0 runs + e2e) · trip1 36-week (not in this brief).
Leftovers outside git: uncommitted runner copy dev/test/robot-rt-coop-wk6.js (video + THIN + reload trigger) and coop-night-dbg.js (Q trap) were deleted with the worktree; worktree removed.

DONE → SSK review/coop-night-wk6 4ba6d3723c2db4161b7c64d78eb902359c79ae18 (BIG co-op; on review/coop-thin-g-land ec88b0e256f7b92d078fe81fa2f6fb35d85a059b). Land AFTER the co-op chain (week-wait-land 04a45597 → thin-g-land ec88b0e2); fast-forward on ec88b0e2.

## REVIEW (BIG co-op, FRESH reviewer session_01N1tNP5X3LeddcPyw4J37PL, opus) — PASS review/coop-night-wk6-r6 62ac32c2e8e5ae29d2117fd4b7aa49c2996ea922
PRIORITY #1 CHECK ('coop-night-wk6|rbuoi|roomB|eRoomB|V.o.buoi'): OD 0 | ledger 0 | claims 6 | main 0 | review/* 1 (this) + coop-freeze-kmrew-rv2 2673733e | reused the fixer's worktree recipe (local wrangler :8797, restarted before every run).
Head = 4ba6d372 + ec161ff2 (reviewer small fix, law 11) + merge of the Fold freeze fix c20aaa6e (= review/coop-freeze-kmrew-rv2's fix, now in LIVE aa37de21; jksize scroll-cue one rule + jinv), built files rebuilt (build_site.sh), no conflict marker. FF on review/coop-thin-g-land ec88b0e2; lands AFTER the B co-op chain. Merge-tree vs rv2 2673733e: source conflicts are the chain-vs-main ones already on base ec88b0e2 (same 9 files) = the lander's chain merge, not this branch; c20aaa6e alone into this head: only built files (assets.json/index.html/sw.js) → rebuilt.
CHECK (1) ONE room-buổi rule (law 11), whole-game scan `grep -n "rbuoi|rweek|eRoomB|roomB|V.o.buoi|view.o" dev/build/j*.js`:
| site | reads | verdict |
|---|---|---|
| jcoopworld sendMe / onBuoi catch-up ×2 / nightEnd / badbuoi / forceBend / restore | roomB() | keep (fixer) — level 0 each old condition ≡ roomB (checked one by one: null>n false, typeof/rweek guards inside roomB) |
| jcooptimer roomKey | CW.roomB() (eRoomB deleted) | keep — eRoomB ≡ roomB's eW branch |
| jcoopworld rb / COOP.on week | writers of CW.rbuoi/rweek | keep (the rule's source) |
| jcoopthine gView adopt cap `P.buoi<=V.o.buoi` | own copy of the host-view room buổi | FIXED r6 → CW.roomB() (V===TH.view===CW.thin.view, same week check; null→0 as before) |
| jcoopthine render-after-mini-game gReady `V.o.buoi>S.buoi` | own copy | FIXED r6 → CW.roomB()>S.buoi |
| jfe.js:31 comment «jcoopworld CW.rbuoi» | comment | FIXED r6 → CW.roomB |
| jcooptimer myKey / S.buoi elsewhere | her own buổi (not the room's) | keep |
(2) both seatings, same rule (law 1): roomB host branch = his own step, guest = host's view; e2e SWAP0/1 + week-wait SWAP0/1 green. (3) AFK bound OD L680 / stepQ carry untouched: diff touches neither nightAfk nor stepQ; roomKey value unchanged at every level (law 16 ✓). (4) case 10 test: BAL.coopTm.nightMs raised to 600 s only inside case 10, restored to 30000 (= jbal2 default) before merged(); cases 4/4h still test the bound; MUTATE (sendMe back on CW.rbuoi) still FAILs with the lift in place → the lift hides no fault. (5) videos looked (frames): R3 fold-host + ipad-guest 51:30–55:30 — after the both-seat reload both «Buổi tối», «Tháng năm · thượng tuần», clocks 4:39/4:39; at 54:30 host at new week «trung tuần» sáng, guest reading Tuần lục of «thượng tuần» (night 6→7 ran for both); R2 13:20 both «Buổi tối», «Tháng ba · trung tuần», 4:43/4:44. Matches the report.
TESTS (local wrangler dev :8797, one run at a time, worker restarted per run; logs /home/user/wt/nwk6-out):
| gate | result |
|---|---|
| `ONLY=10 THIN=13 node dev/test/coop-night.js <o> $W` base ec88b0e2 (new test file) | FAIL «10: both in the next week» [0,0,0] |
| same on head | 10 PASS [0,1,1] (case 9 ONLY-mode artefact red on base/fix/mutate alike) |
| MUTATE (sendMe on CW.rbuoi) | FAIL [0,0,0] ✓ |
| coop-night full THIN=13 head / base | 126/126 / 125/126 (10 [6,6,6]) |
| coop-night full THIN=0 head / base | 126/126 / FAIL rows 9–11 (reload family, base) |
| coop-e2e COOP_SWAP=0 / 1 | 143/143 · 143/143 |
| coop-week-wait SWAP 0 / 1 | in series 32/34 (A1/A2, the same flake family as the fixer's base) → alone 34/34 · 34/34 |
| coop-cal-rebirth | in a long series red (also on 4ba6d372 and on ec161ff2, different rows each run = load flake) → alone head 79/79, base 79/79 |
| dayq-hold-coop (LIVE Worker, as rv) | 23/23 (local Worker: «guest joined seat b» join only) |
| coop-thin-g L13 (g4) | 24/24 |
| coop-keymove-unit | 12/12 |
| sangbuoi-held (built index.html) | ALL PASS |
| scroll-cue-loop 755x1000 (freeze fix) | PASS |
| coop/worker npm test | ALL OK |
| quickcheck ALONE vs LIVE aa37de21 | open 1959 ms, old save ok, time-spill PASS; G4 90 crawl «fold · Ô lưu · Lui» FAIL = PRE-EXISTING (button-crawl on base ec88b0e2: same single row); live build perf not measurable (live timed out 3/3, as the fixer saw) |
Laws: 1 ✓ 4 ✓ (no number) 6 n/a 7/9/10 no UI/wording ✓ 11 ✓ (scan above, 2 leftover copies folded) 12 ✓ (videos Fold+iPad) 14 ✓ 16 ✓. OPEN 1/2 not this branch.
CDN img/_review/coop-night-wk6/ = the fixer's videos, left for the lander/foreman (no reviewer shots uploaded).
