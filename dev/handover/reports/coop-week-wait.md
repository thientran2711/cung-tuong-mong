# coop-week-wait — «Chờ hảo hữu xong tuần» (E room 6ZG9) + #coopfz (F room P89H) + «Tin báo» buổi split (U3b room 7UGM)

PRIORITY #1 CHECK ('Chờ hảo hữu xong tuần'): OD 0 | ledger 0 | claims 2 (status lines only) | main 0 | review/* 0 | archive 0 — ('coopfz'): main 13 = the overlay code itself. Reused: review/robot-coop-fix-6 (qKind / stepQ ONE carry rule), review/coop-presence-reload (R7/R8 rows of dev/test/coop-presence-reload.js), coop-cal-rebirth helpers, lib/coop-clear.js.
B FIXER session_01N1tNP5Jp8P2taMCSxWvUFo, depth 5, START_CTX ≈4 %. Coordinator Foreman B child 4 session_01N1tNP4bL26RKz4S6K5DgXY. Branch review/coop-week-wait = robot-coop-fix-6 head f5b96b7f + origin/main 17dfa64d merged + ONE rule.

## 1. Step 1 — reproduce test per case × build
New test `dev/test/coop-week-wait.js` (2 Playwright seats, local `wrangler dev` Worker, Fold 755x1000 host + iPad 1180x820 guest; COOP_SWAP=1 iPad hosts; reduced motion; long buổi clock):
- A1 (6ZG9): the guest presses Sẵn sàng at the week's last buổi with a «Tin báo» panel queued; the host presses Sẵn sàng → his night runs, his end goes out (= host «Buổi sáng» + «Đợi hảo hữu xong tuần», guest «Buổi tối» «Chờ hảo hữu…», the 6ZG9 picture 1:1) → her committed night must run with the panel open; after she reads her panels the room steps one week on one date.
- A2 (6ZG9 Q-shape): the guest queue holds «Tin báo» + «Phòng bị» (j70 def70m, a real choice) and #modal is forced hidden → she sees it within 10 s; once answered the room steps.
- C (7UGM): a day buổi; the host ends his buổi, opens a «Tin báo» that carries a «go» (jnotice kitNoticeOpen → opts «Xem lời nhờ / Để sau»); the guest ends hers → the room steps; the host's seat HOLDS (a real pick) and steps at once after «Để sau».
- B (P89H #coopfz): coop-presence-reload.js rows R7 (stale presence view) and R8 (missed close / buried socket).

| case | bare LIVE 17dfa64d | + fix-6 f5b96b7f | + coop-presence-reload 5399c31f |
|---|---|---|---|
| A1 her committed night runs with «Tin báo» open | **FAIL** | **FAIL** | **FAIL** |
| A1 after she reads her panels the room steps, one date | ok | ok | ok |
| A2 hidden queue + real choice: shown ≤10 s, steps once answered | — | PASS | PASS |
| B R7 stale view | **FAIL** | **FAIL** | PASS |
| B R8 missed close | **FAIL** | — | PASS |
| C notice with a pick at the buổi step | held → ok after «Để sau» | held → ok after «Để sau» | held → ok after «Để sau» |

Verdict: B is covered by coop-presence-reload (needs its Worker deploy) — no new work. C is no co-op step bug: the notice carries a pick, qKind = hold by design, the room recovers the moment she picks; the hidden button is KK30 kit-notice-action. A fails on both candidates → step 2.

## 2. Step 2 — cause and the ONE rule (case A)
jcoopworld `nCheck` (the committed night of a seat) still gated on `Q.length`: robot-coop-fix-6 made ONE classifier (qKind) + ONE carry routine (stepQ) for every Q-gated seat step — the room's buổi step (onBuoi), the kept step (tryEnd), the clock's end (CW.nightEnd) — but the committed night was left on the old gate (law 11 gap). So a panel that only tells («Tin báo», news) held her night: host «Buổi sáng» + «Đợi hảo hữu xong tuần», guest «Buổi tối» «Chờ hảo hữu…» until she closed it.
Fix (one line + comment): the committed night runs through `stepQ("night", …)` — a «tell» panel is carried over it and shown again after it, a real choice still holds it (unchanged). No other path changed (sendEnd keeps waiting for her dialogs: the merged week needs her answers).
MUTATE (night gate back on `Q.length`): A1 «her committed night runs with the Tin báo panel open» FAIL (15/17).

## 3. Gates (head of review/coop-week-wait; local `wrangler dev` Worker = fix-6 Worker + main)
| gate | result |
|---|---|
| coop-week-wait Fold-host ×3 | 34/34 · 34/34 · 34/34 PASS |
| coop-week-wait iPad-host (COOP_SWAP=1) ×3 | 34/34 · 34/34 · 34/34 PASS (one earlier iPad run 33/34: A2 «she sees» row read a blank screen while the card-flip scene with its own end button was over the queue — the row now counts a kit scene with its end button as seen; test only, the same build) |
| MUTATE (night gate back on Q.length) | A1 «her committed night runs with the Tin báo panel open» **FAIL** (15/17) |
| coop-e2e SWAP=0 / SWAP=1 | 142/142 · 142/142 |
| coop-night | 47 ok / 11 FAIL — every FAIL is case 4 (AFK seat at buổi tối: room stuck at week 3, AFK seat pend + Q2 «Chờ hảo hữu…») and the cases after it in the same stuck room (4b/5/6/8/10). The SAME case 4 / 4b FAIL on the base (fix-6 merged onto LIVE, same Worker, same run) and on bare LIVE (Foreman B 19:08Z: coop-night-live fault, fixer + rv on review/coop-night-live). Not this branch; the reviewer should re-run coop-night once coop-night-live lands. |
| coop-keymove-unit | 12/12 |
| Worker npm test | merge ok · vault ok 48 · seat ALL OK · stale ALL OK · thin ALL OK · range ok |
| quickcheck ALONE | browser part **PASS** (257 s: open 2315 ms, 0 errors · old save from LIVE 17dfa64d loads and plays a buổi · perf median new/live render 308/260 ms, tab 639/559, buổi 1844/1689, tasks>200ms 25/26) · time-spill guard PASS · build holds its own index.html · core gates: ONE FAIL = G4 button crawl «Ô lưu · Lui» on the title (Fold) — the known LIVE fault that review/robot-coop-fix-7-r2-rv fixes (Foreman B 19:15Z: «Ô lưu · Lui» crawl base FAIL → head PASS); not this branch (core gates took 855 s, so the browser part was run alone after them) |

Fold/iPad = 755x1000 / 1180x820 seats (dev/test/coop-week-wait.js, reduced motion). Step-1 cross-builds (bare / fix-6 / presence) in §1.

## 4. Notes for runners / MAIN
- My own bot stood on «Q>0, #modal hidden, nothing to tap» three times on screens a player clears: the card-flip scene's ONE end button «Ta biết rồi» under reduced motion (.kmov .kmend), the reward box #kmrew («Chạm để mở» → «Nhận»), the mini-game window #ov #kg82. Each looks exactly like the 6ZG9 harness line «Chờ hảo hữu… disabled with no dialog on screen (Q=4)». The ≥1 h freeze is most likely one of these not tapped by the harness (robot-realtap) — worth a harness check.
- No images, no shots in git; scratch outside the repo.

## 5. Land notes
- Land order: robot-coop-fix-6 (its own review) first or together — this branch IS fix-6 head + main 17dfa64d + the ONE line, so landing this branch lands fix-6 too. No Worker change here (coop-presence-reload's Worker deploy is separate).
- Possible overlap: review/coop-night-live (rv 217cbed8) touches jcoopworld tryEnd; this branch does not touch tryEnd (only nCheck's night gate). Re-run coop-night after both are in.
- Files: dev/build/jcoopworld.js (nCheck: 1 line + comment), dev/test/coop-week-wait.js (new), index.html / sw.js (build_site.sh), this report.

## 6. Handover
Done; nothing open on this branch. Worker scratch worktrees removed after push.
