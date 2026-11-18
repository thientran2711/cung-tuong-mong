# review-mg-train-r1 — independent review of review/mg-train @ 7e52cb1c

Reviewer session (START_CTX ~6 %, ended ~25 %). Verdict: **PASS 8f476f6f9ece73d6994f51a9b7452c180061c3a1** (branch review/mg-train-r1; descends origin/main 12f52db7).

## Merge onto latest main
- origin/main 2e9615fb (tham-flip-ui, tut-place, test-drift) → only generated files conflicted (index.html, sw.js); rebuilt with dev/site/build_site.sh.
- origin/main 12f52db7 (40 more commits: j95/jk95/jqsave, schedules3…) → assemble.py list conflict: main's list + `jmgt.js` after j91 + `jslap.js` after jts (as in the worker's report); generated files rebuilt.

## Merge correctness (nothing lost / doubled)
- All 8 tips are ancestors with the briefed shas: mg-balance-r1 288aa4f6, nw-poem-r1 5d200041, nw-quiz-r1 33730518, owner-answers-b-r1 07f84484 (+ nw-lantern-r1 9696bc72, presentation-r1 9ec1852a), slap-mg-r3 6444443b, mg-balance-2-r1 961c1f8b.
- Line scan (every line each branch added vs its merge-base, absent from HEAD): every "missing" line is a later supersession (mg-balance-2 replacing mg-balance's BAL.mgTier / tdWalk / bot knobs; main's act-text rewording of j83/jtabs; anim-pace petal-gold → petal-peach in jpres; Q6 comment rewrite in jk4; deleted word-game code). No feature lost.
- main → HEAD diff of non-minigame files (jdis, jface, jk3, jkc, jtabs, j85, jwkr, jtds, jexam, jpcf) = only additive owner-answers-b / slap features; nothing of main removed.
- Runtime: all 30 kinds open and finish (below); no duplicate KIT section added (§57 / §6 duplicates are pre-existing on main).

## No word games (OD:L1265)
- No `e:"quiz"|verse|pair` engine, no kg82Quiz / k91Verse / k91Pair / KG82_BEP / KG82_HUONG / DOI / YQ in dev/build (all40*.js are old unassembled archives).
- tho → calli (brush tracing), doi → doiline (mirrored brush marks), doden → lamp, banh → cook, huong → blend, td_ngon → timing. Festival "câu đối / đố đèn" dialog choices are act choices (odds ladder), not minigames.
- FIX (small, here): Tài nghệ lesson title "Nấu nướng: chọn món" (old quiz name) → "Nấu nướng: canh lửa nấu món" (j82 KG82_MGL), comment updated.

## Tests (final build unless noted)
| test | result |
|---|---|
| mg-balance-vp (old save from origin/main → this build), 6 sizes 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390@2, 390x844@2 (merge 2e9615fb) | 30/30 each, 0 bad, 0 page errors, 0 overflow, old save loads |
| mg-balance-vp re-run after merge 12f52db7: 755x1000@2, 844x390@2, 1366x1024@2 | 30/30 each, 0 errors, old save loads |
| coop-e2e | 59/59 (both merges) |
| slap-mg (after test fix) | 0 fails at 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390@2; 390x844 rotate prompt shot OK |
- slap-mg test fix (harness, not game): it tapped / read the demo card at fixed 0.7–0.9 s, but the demo waits for kg82Preload (≤2.5 s, tát/né paintings not on CDN yet) → demoShown / gonStill false and the dodge hung waiting for "Đã hiểu, bắt đầu" (probe: phase play, demo card up, game correctly waiting for the player). Test now waits for #k91demo / window.__slapTap. This explains the worker's "755 dodge timeout" and "844 demoShown" flakes.
- Screenshots looked at: tho, doi, doden, banh, le, co boards + Thơ contest intro at 755x1000@2, 844x390@2, 1180x820@2; slap demo / Gọn / marks strip / dodge / rotate prompt. All kit frame (kg82 TÀI NGHỆ dialog, kpst rows, kbtn), demo card first, "Độ khó" row on contests, no cut text, no overflow.

## Kit / wording / one core
- New files jmgt.js (logic only) and jslap.js (kg82 frame, kbtn, KIT §79 registered) add no private CSS; jface slap tiers live in KIT_FACEFX. KIT consistency: every board uses the same kg82 dialog.
- No % and no "Chắc chắn" in strings added by this branch; tier words Dễ/Vừa/Khó; numbers read BAL.mgTier / BAL.slap / BAL.nw* (ONE CORE).

## Known open (not FAILed, per brief)
- nw-* engines + co skilled ≥9 at 57–100 % (target 20–30 %) → review/mg-tune.
- KIT REQUEST j82 frame at 844x390: board under the Gợi ý / start row (seen in my 844x390 shots for every engine, pre-existing).
- Note for mg-tune: a fresh player (Tài nghệ bậc 0) gets "Độ khó: Khó" in a contest at a higher-rank occasion (stakes term); fits OD:L1255 design but check it against "mức vừa" (OD:L1266) when tuning.
