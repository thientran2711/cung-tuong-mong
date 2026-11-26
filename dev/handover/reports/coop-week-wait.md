# coop-week-wait — EXPRESS LAND (handover copy; the fixer + rv report lives on review/coop-week-wait-rv / review/coop-week-wait-land: dev/handover/reports/coop-week-wait.md)

## EXPRESS LAND (B EXPRESS BIG rv-lander, opus, session_01N1tNP4KCumgKvW8Xj9RH8W, depth 1, 11/26/2026)
PRIORITY #1 CHECK ('coop-week-wait|presence-reload|fix-3-r5|robot-coop-stack-u4'): OD 0 | ledger 0 | claims 8 | main 0 | review/* 7 | archive 0 → reused the three reviewer-PASS lands + U1c's stack review/robot-coop-stack-u4 7959f1b5 as the comparison.
CHAIN on LIVE 5e013076 (each = previous + one land; all fast-forward on origin/main 5e013076):
1. review/coop-presence-reload-land 8d5fa1fd = LIVE + review/coop-presence-reload-rv dad08c51 (presence commits only, never 5399c31f stack). Only index.html/sw.js conflicted (generated) → rebuilt. Worker deploy needed (coop/worker presence code).
2. review/fix-3-r5-land 83702d7b = (1) + review/robot-coop-fix-3-r5-rv 3e761843. Only index.html/sw.js conflicted → rebuilt. No Worker change.
3. review/coop-week-wait-land 04a45597 = (2) + review/coop-week-wait-rv 8e654ee0 (REPLACES the bounced 8e654ee0 at LC17; holds robot-coop-fix-6 f5b96b7f + coop-night-live-rv eb6e15fe + fix-5 556c0f57; supersedes fix-6-rv 833cd64f + night-live-rv eb6e15fe). Conflicts: dev/build/jdayq.js = ONE rule: LIVE SANGBUOI r4 rearm (BAL.dayq.rearm) + dqNextSync kept, week-wait dqHoldC() gating applied on top at the two act-hold sites (dqArmModal tick `(dqHoldC()&&dqActBlocks())`, outer showModal `if(dqHoldC()&&Q.length…`); coop/worker/package.json test list union (range + presence); index/sw rebuilt. Worker deploy from coop/worker of this head (fix-6 merge.js ranges + presence).
LAW 11 / u4 compare: jdayq.js byte-identical to u4 7959f1b5; `git diff 04a45597 7959f1b5 -- dev coop` is EMPTY (only index build line / assets.json / sw.js differ; same game build b0cf6e61f03b). fix-5-r1 3f672533 content is inside (556c0f57 ancestor; its jdeadcard.js re-add was dropped by u4 too since LIVE folded it into jnolock). ONE carry rule stepQ (onBuoi/tryEnd/nightEnd/nCheck-night) + LIVE r4 rearm/dqNextSync both alive.

### Gates on head (3) 04a45597 (local wrangler dev Worker of the head; Fold 755x1000 + iPad 1180x820)
| gate | (3) 04a45597 | 8e654ee0 (bounced rv head) | bare LIVE 5e013076 |
|---|---|---|---|
| Worker npm test | ALL OK (merge/vault/seat/stale/thin/range/presence) | – | – |
| coop-keymove-unit / coop-house-unit | 12/12 · 52/52 | – | – |
| coop-e2e SWAP0 / SWAP1 | 143/143 · 143/143 | – | – |
| coop-night (full) | 126/127: only case 10 «host still in tối behind his dialog» | 126/127: SAME case 10, identical trace | stuck at week 3 from case 4 (4/4b/5/6/8/9/10g/11h… FAIL) = coop-night-live fault, cured by this land |
| coop-night ONLY=10 ×2 | FAIL case 9 ×2 (ONLY-mode artefact), case 10 ok ×2 | FAIL case 9 ×2, case 10 FAIL in run 2 | 66/66 ×2 (older test file) |
| coop-week-wait Fold-host | 32/34 under 4-browser load (A2) → rerun 34/34 | 33/34 (A2 harness row) | (rv: FAIL by design) |
| coop-week-wait iPad-host | 34/34 | – | – |
| MUTATE (nCheck night back on Q.length) | A1 FAIL ✓ (33/34) | – | – |
| coop-presence-reload Fold / iPad host | 35/35 · 35/35 | – | (rv: R7/R8 FAIL) |
| coop-cal-rebirth | 78/79 under load (case 5 row) → rerun 79/79 | – | – |
| dayq-hold-coop (real Worker) | 23/23 | – | – |
| sangbuoi-held (r4) | ALL PASS | – | – |
| next-dead (quickcheck 95) | 2 FAIL in quickcheck (ran under ffmpeg/CDN load) → alone 8/8 PASS ×2 | 8/8 PASS | 8/8 PASS |
| quickcheck ALONE | open 3382 ms · old save ok · perf new/live render 466/398 tab 1062/993 buổi 7293/6242 tasks>200ms 35/38 (box loaded) · core gates: G4 crawl «fold · Ô lưu · Lui» = PRE-EXISTING on LIVE (until fix-7 r3) | – | same G4 crawl |
| LONG real 2-seat (Fold host + iPad guest, local Worker, reduced motion): both-seat reload → 24 buổi (2.5 weeks, 3 week ends, nights) → both-seat reload at buổi 12 → 24 → both-seat reload + 1 buổi | 13/13: 0 stuck (max one buổi 279 s = room clock at a week end), 0 false «đang vắng» / #coopfz, 0 page errors | – | – |
| F P89H deadlock («Đợi hảo hữu xong tuần» host / «Chờ hảo hữu…» guest) | NOT reproduced: long run 0 stuck over 3 week ends; its two causes covered: week-wait A1/A2 (night carry) PASS, presence R7/R8 (stale view / missed close) PASS | – | reproduces (presence R7/R8 FAIL, week-wait A1 FAIL) |
Case 10 judgement: NOT the jdayq union (8e654ee0 alone shows it with the same trace; bare LIVE passes only because it keeps the old Q.length night gate). Week-wait's ONE carry rule carries the test's injected ONE-option panel («Biến cố đêm» / «Ra xem», a one-road tell) over the committed night, as designed (a real choice still holds: A2 PASS). The row asserts the old hold; the case's purpose (re-send after sendMe, host presses again, both in the next week in exactly one step, same date) passes every run → test expectation, not a game fault; test owner may update the row to `Q>=1` either at tối or carried.
VIDEOS (full runs, both seats, outside git, CDN): https://ctm-img.victoria-tntt.workers.dev/img/_review/coop-lands/coop-week-wait-land-04a45597-fold.mp4 + …-ipad.mp4 (11 min each, the 24-buổi LONG run). Shots b05 / after-night / b24 both devices looked 3× (normal play, same date on both seats, no stuck screen).
Laws: 11 one carry rule + one presence rule ✓ · 1 two-way (both seatings) ✓ · 4 no number added ✓ · 7/9/10 no UI / wording change ✓ · 12 Fold + iPad ✓.
**VERDICT (3): PASS → LAND READY review/coop-week-wait-land 04a45597.**
