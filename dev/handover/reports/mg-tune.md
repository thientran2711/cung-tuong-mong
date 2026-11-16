# mg-tune — the ONE time part for the correctness minigames (Foreman B worker, opus)

Branch: review/mg-tune @ 96131b417a47df5107be9a0162409228267a2df1 (base review/mg-train @7e52cb1c + review/mg-train-r1 @8f476f6f merged; only generated files conflicted, rebuilt).
Owner target (OD 16/11 07:25Z, OD:L1266): MEDIUM; skilled play at the matching level ≈ 20–30 % Tuyệt phẩm, random ≈ 0. Measured as in PROGRESS_mg-balance:
"Xuất sắc" = graded play ≥ 9 (BAL.mgTier.kG), Dễ = hoc/0/2 (occasion 2 below her skill), **Vừa = hoc/4/2 (matching level, the target)**, Khó = hoc/6/1.

## Cause (measured)
The no-word engines (tho calli, doi doiline, doden lamp, le lay, tc sort, xa clue, thq seat) score only correctness. A player who sees the rule makes no
mistakes, so a skilled run is 10/10 at every tier (90–100 % Xuất sắc); kG / kAdj cannot move a perfect 10. co and doden already had a speed part, each its
OWN formula (co: typed 0.4 drop after FAST ms; jlant: BAL.lantern.speed .3) — one-core violation.

## Fix (ONE CORE)
- `mgPace(env, kind, el, lim)` in jmgt.js: the share of a round's score kept for the time used. Whole while el ≤ fast·lim, then linear down to `keep` at time out.
  Numbers only in BAL: `BAL.mgTier.pace` {fast, keep} default (by ease) and per-engine `BAL.mgTier.lev[kind].fast / .keep` [at ease 0, at ease 5] read through
  the existing mgLev — the same lever table mg-balance-2 uses. No number typed in any engine.
- Wired (round score × mgPace): jnwp calli (tho) + doiline (doi); jnwq nwqPlace (le / tc / thq) + clue (xa); jlant lamp (doden, replaces BAL.lantern.speed);
  j82 go (co, replaces its typed formula; lev.co.fast is now a share of the round time). jnwq / jlant now pass the float raw (graded once by kg82 mgGrade).
- BAL.nwq.lim.xa 18/17/15 → 14/10/8 s: a case is solved in ~3 s, with 17 s no time part could bite (random-guess xa stays 0 % Xuất sắc).
- Player text (existing how strings, no new UI): "Làm nhanh thì được trọn phần." added to tho, doi, doden, le, tc, xa, thq (co already says "Ăn nhanh thì được trọn phần.").
- Calibrated values (BAL.mgTier.lev): tho fast .05–.175 keep .5 · doi .05–.425 / .3 · doden .05–.175 / .3 · le .075–.25 / .3 · tc .05–.175 / .3 · xa .05–.1 / .1 ·
  thq .075–.45 / .5 · co .1–.8 / .6 (fast = share of the round time, at ease 0 → ease 5).

## Measuring (dev/measure/mg-bots.js)
- The oracle bot knew the right piece at once (mg-train OPEN item). Now an engine's peek may give `cands` = how many pictures a person must look through
  (tray marks, places, suspects × clues, lanterns); the skilled bot then thinks BOT.seek = 600 ms + 350 ms × cands × U(.3, 1) before the move (env MGBOT_SEEK0/1).
  Only the 8 engines above give cands, so every other kind is measured exactly as before (same bot path, same engine code).
- The bot logs u = el / lim of every scored round (calibration: what-if raw × mean pace_new(u) / mean pace_old(u), grid over fast / keep, then re-measured).
- n = 30 per cell is ±8 points of noise; the AFTER Vừa column pools every run made with the final values (n = 60–120).
- BEFORE = review/mg-train build (old engines, old bot behaviour — old engines give no cands) measured in this session.

## Before / after — the 8 engines changed (skilled; random at Vừa)
| kind | BEFORE skilled Xuất sắc ≥9 % Dễ / Vừa / Khó (n=30 each) | AFTER Dễ / Vừa / Khó | AFTER Vừa: n · Giỏi+ ≥7 % · mean raw | random Vừa BEFORE → AFTER ≥9 % (mean) |
|---|---|---|---|---|
| tho | 80 / 57 / 0 | **81 / 27 / 0** | 90 · 93 · 7.9 | 0 (0.0) → 0 (0.0) |
| doi | 100 / 100 / 100 | **97 / 30 / 0** | 30 · 97 · 8.0 | 0 (0.2) → 0 (0.0) |
| doden | 97 / 90 / 90 | **91 / 24 / 3** | 90 · 96 · 7.9 | 0 (1.0) → 0 (0.7) |
| le | 93 / 97 / 100 | **98 / 21 / 0** | 90 · 99 · 8.2 | 0 (0.0) → 0 (0.0) |
| tc | 97 / 100 / 93 | **90 / 27 / 0** | 90 · 100 · 8.3 | 0 (0.4) → 0 (0.0) |
| xa | 100 / 100 / 100 | **86 / 24 / 1** | 120 · 93 · 7.9 | 0 (5.1) → 0 (3.8) |
| thq | 100 / 97 / 97 | **98 / 29 / 0** | 90 · 99 · 8.2 | 0 (0.3) → 0 (0.0) |
| co | 73 / 20 / 0 | **85 / 22 / 0** | 60 · 77 · 8.9 | 0 (0.3) → 0 (0.4) |

Reading: every changed engine now lands 21–30 % Xuất sắc at the matching level (target 20–30 %), Giỏi+ (≥ 7) stays 77–100 % at Vừa, random ≈ 0 everywhere
(xa random mean 3.8: guessing a suspect still earns the 0.4 floor of a case, 0 % Xuất sắc). Dễ stays generous (81–98 %), Khó 0–3 % — the same shape as
the mg-balance table. co was already 20 % graded (the mg-train table's 43–93 % read raw bins, not the kG 3 grade); it only moved onto the one core (22 %).

## Whole family (LUẬT SỬA CẢ NHÓM): the other 22 kinds, re-measured on the final build (n = 30 per cell; code unchanged → before = after)
| kind | BEFORE Dễ / Vừa / Khó (Xuất sắc ≥9 %) | AFTER Dễ / Vừa / Khó | AFTER Vừa Giỏi+ ≥7 % / mean | random Vừa ≥9 % / mean (after) |
|---|---|---|---|---|
| dan | 23 / 20 / 0 | **23 / 20 / 0** | 73 / 8.8 | 0 / 0.0 |
| hat | 100 / 17 / 0 | **100 / 17 / 0** | 100 / 8.0 | 0 / 0.8 |
| dauho | 63 / 30 / 0 | **63 / 30 / 0** | 83 / 7.6 | 0 / 0.0 |
| ban | 40 / 33 / 10 | **40 / 33 / 10** | 90 / 7.6 | 0 / 2.3 |
| ve | 77 / 30 / 0 | **77 / 30 / 0** | 90 / 8.7 | 0 / 0.1 |
| hoa | 87 / 23 / 7 | **87 / 23 / 7** | 93 / 9.1 | 0 / 0.6 |
| theu | 30 / 40 / 30 | **30 / 40 / 30** | 63 / 9.4 | 0 / 3.0 |
| kim | 90 / 40 / 0 | **90 / 40 / 0** | 100 / 9.1 | 0 / 0.7 |
| mua | 43 / 20 / 0 | **43 / 20 / 0** | 53 / 7.3 | 0 / 0.4 |
| banh | 100 / 17 / 0 | **100 / 17 / 0** | 97 / 7.9 | 0 / 0.1 |
| huong | 63 / 20 / 20 | **63 / 20 / 20** | 73 / 8.8 | 0 / 0.5 |
| td_cong | 97 / 33 / 53 | **97 / 33 / 53** | 37 / 8.2 | 0 / 0.0 |
| td_dung | 100 / 40 / 0 | **100 / 40 / 0** | 100 / 8.4 | 0 / 1.0 |
| td_ngon | 80 / 37 / 10 | **80 / 37 / 10** | 70 / 8.5 | 0 / 0.4 |
| td_hanh | 67 / 20 / 3 | **67 / 20 / 3** | 50 / 6.8 | 0 / 0.0 |
| chai | – / – / – | **– / – / –** | – | – |
| duho | 87 / 30 / 7 | **87 / 30 / 7** | 83 / 8.2 | 0 / 0.3 |
| den | 23 / 13 / 23 | **23 / 13 / 23** | 93 / 7.7 | 0 / 2.8 |
| tat | 30 / 17 / 17 | **30 / 17 / 17** | 17 / 6.0 | 7 / 2.8 |
| ne | 80 / 60 / 33 | **80 / 60 / 33** | 60 / 6.0 | 3 / 0.3 |
| kinh | 83 / 20 / 0 | **83 / 20 / 0** | 97 / 8.5 | 0 / 0.1 |
| may | 80 / 23 / 0 | **80 / 23 / 0** | 77 / 7.9 | 0 / 0.2 |
- chai (Điểm trang, j92 groom): not measurable by mg-bots (its own wardrobe flow needs env.zw); same result on the old build; code untouched.
- Outside 20–30 % at Vừa but NOT moved here (brief: do not move engines already tuned/accepted; they belong to mg-balance / mg-balance-2 / slap): ban 33, theu 40,
  kim 40, td_cong 33, td_dung 40, td_ngon 37, ne 60 (dodge, accepted by the slap reviewer), den 13, hat / banh / tat 17
  (n = 30 noise ±8). OPEN for Foreman B if a stricter pass is wanted: theu / kim / td_dung / ne (≥ 40 %).
- 0 page errors in every bot run (≈ 15 000 plays this session).

## Tests (final build)
- dev/test/mg-balance-vp.js, old save from review/mg-train → this build: 30/30 kinds at 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390@2, 390x844@2 —
  0 bad, 0 page errors, 0 horizontal overflow, old save loads (after the mg-train-r1 merge; again 30/30 at 755x1000@2 on the very last build).
  Test fix: the old build's start() can make S a moment later on a cold cache → the test now waits for S (it failed at the first step before).
- coop-e2e: 59/59 (twice: before and after the mg-train-r1 merge).
- KIT: no UI change (only BAL numbers, engine scoring, how-string text). KIT REQUEST: none.

## Gain / risk
- Gain: Tuyệt phẩm on the no-word games goes from ~100 % to ~25 % for skilled play at her level, by one shared rule; speed now matters the same way in all of them.
- Risk (possible, medium): real players are slower than the bot's 600 + 350 ms/picture model → fewer Tuyệt phẩm than measured (Giỏi instead). Detect: owner
  feedback / play logs; fix: raise lev[kind].fast (one number per game, no code).
- Risk (possible, small): Khó is strict on xa (Giỏi+ 10 %), co (10 %) — Khó means the occasion is 2 levels above her art; fix the same way if she finds it too hard.

## Handover
START_CTX ≈ 4 % of 1 M; now ≈ 17 %. Nothing left but review. Worktrees /home/user/wt/base and /home/user/wt/docs removed after push; own servers stopped by PID.

SẴN SÀNG KIỂM 96131b417a47df5107be9a0162409228267a2df1
