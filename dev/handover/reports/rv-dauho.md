# rv-dauho — REVIEW review/cal-p2 b218d1d2 (Đầu hồ owner-bug fix + cal.k.dauho removed) — VERDICT: PASS 377d5ce3
Reviewer rv-dauho (BIG, opus), child of Foreman C-AG #29 session_01Rc5AsJ8GMpdM1fyxzYaf1d; session_01Rc5AsKzsQh875fpMyv46vr, 20/11. START_CTX ≈4 % (context_usage read 0; my estimate).

PRIORITY #1 CHECK: OD 20/11 ~05:40Z (Đầu hồ unplayable, her 1.1 / Kingston 1.7), ~07:35Z (CANON: boards NOT retuned to move her scores; ONLY broken games fixed, Đầu hồ named; she re-tests), ~08:25Z (dauho re-test after its fix); ROOT-74 06:04Z (fix + remove cal.k.dauho). main BAL.mgTier.lev.dauho (jbal2.js), engine j91 k91Fling; Bắn cung = j82 kg82Aim (no shared knob). Reused: cal-p2 report §A1/§D, dev/test/cal-dauho.js, dev/measure/mg-bots.js. No other branch on this topic.

## Final
review/cal-p2-rv 377d5ce3 = b218d1d2 + merge of NEWEST origin/main 70bea3d3 (mg-visual landing). Only conflicts: index.html / sw.js (generated) → rebuilt with dev/site/build_site.sh. `git merge-base --is-ancestor origin/main 377d5ce3` = true (main 70bea3d3 at push).

## Checks
1. Law 4 — PASS. New numbers only in BAL.mgTier.lev.dauho {aid:[.6,2], mouth:[1.3,2.1], pull:[.8,.6]}. k91Fling reads pull through mgLev; K = 5.4·PULL and MAXD = .45U/PULL reuse the existing engine constants (no new typed number; `||1` is the absent-knob fallback).
2. Law 5 — PASS. Lower ease = shorter dots, smaller mouth, touchier pull (cal-dauho 3). Her-bot ladder strictly falls (below). Top rank stays hard: hội/triều rank 7, bậc 0 → ease 0 → her-model 2.7.
3. Bắn cung — PASS. cal-dauho 1: kg82Aim source, KG82_KIND.ban, every BAL knob ban reads, and mgTier("ban").ease for 5 occasions × 8 ranks × 6 levels are byte-identical to origin/main.
4. cal.k.dauho — PASS. Entry removed; NPC dauho band falls back to the default 3/9.5 (cal-dauho 4). mgcal-apply.test.sh OK (writes kinds into the k book incl. a new one). ag-mgcal OK (Thử tay resume goes to «từ môn Đầu hồ»; every kind starts its real board). Her device's local record (localStorage ctm-mgcal) is never applied by the game (jmgcal.js:12), so an old device record with dauho cannot bring 1.1 back. Old save loads: oldsave-r1 16/16.
5. Bot check (owner OD ~07:35Z: playable/fair board, not a fitted 7) — PASS. mg-bots.js, n=12 per cell, my own runs:
| bot | board | e0 | e1.6 | e3.2 | e4.8 |
| her-bot (MGBOT_PX .2, reproduces her 1.1) | OLD origin/main | 0.1 | 0.6 | 1.15 | 2.1 |
| her-bot | NEW | 2.7 | 5.1 | 7.8 | 8.7 |
| average adult (RT110 PX.028 AIM65 THINK650/1250 SLIP.09/.18; oracle, kind) | NEW | 8.3 | 9.4 | 9.3 | 9.0 |
Her matching board (d=0 → ease 3.2) ≈7.8 = an ordinary playable board; entry rank (học rank 0, bậc 0 → ease 3.2; bậc 2 → 4.8) 7.8–8.7, not near 10. Matches the worker's §D model (8.9/7.8/5.2/2.5). Physics probe (Fold canvas 681×430, iPad 609/882×430): best-angle landing moves 1.5–3 px per px of drag vs full-marks half-mouth 14–23 px, i.e. a ±5–10 px drag precision = doable; every throw needs a drag ≤ MAXD and the canvas keeps pointer capture.
6. LOOK (law 12) — PASS. Fold 755x1000@2 and iPad 1180x820@2, ease 0 and 5, pot forced to the far right (x=.82W), mid-drag: easy board — dots run all the way to the pot mouth; hard board — dots stop about half way (law 5); pot mouth and whole width inside the canvas on both devices, no page errors, no horizontal overflow (scrollWidth = viewport). Only the pot's foot is cut by the canvas bottom (picture height grows with mouth; cosmetic, the mouth is what she aims at). Shots kept in scratch only, deleted with this verdict.
7. Tests on 377d5ce3 — cal-dauho ALL OK · mgcal-apply.test.sh OK · ag-mgcal OK · mg-skip PASS (needs args: `node dev/test/mg-skip.js file://…/index.html 755x1000@1 <dir>`) · mg-noword-a OK · oldsave-r1 16/16 (needs origin/main index.html at .tmp/old.html). Pre-existing main FAILs (ag-mgh, ag-mg2 summons, slap-mg) not run, not blamed.
8. Scope — PASS with note: diff vs main = jbal2.js (BAL), MINIGAMES.md row, new dev/test/cal-dauho.js, generated index.html/sw.js, PLUS one line in dev/build/j91.js (k91Fling reads the new pull knob — needed for the pull knob to work, reads BAL only, no UI) and dev/measure/mg-bots.js (tool-only env knobs, defaults unchanged). No UI / kit change.

## Laws touched
4 one core: kept · 5 harder as she climbs: kept · 11 whole group: Đầu hồ is the only fling board; Bắn cung proven untouched · 12 two devices: looked · 7 wording: no player-visible text changed · 1–3, 6, 9, 10: not touched.

## Note for MAIN (not a FAIL)
Her dauho calibration must be re-taken in Thử tay (her first valid try = on the fixed board), per OD ~08:25Z.
