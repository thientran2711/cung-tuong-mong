# review-mg-snap-r1 — verdict: PASS review/mg-snap-r1 @ 931255b1c6504a66a3b33d7bb52a556b1fc454a3

PRIORITY #1 CHECK ('Thêu theo nét' / 'snap' / 'minigame'): OD L1571 + L1255 + L1266 | main dev/build/jtd.js kgTdThread, jmgt mgPace/mgLev/mgGrade, BAL.mgTier (kG, lev) | review/* review/mg-snap 2a00405f (under review) | claims B worker session_01N1tNP5qbJ5vmYix3TNrjt8, reviewer this session. Reused: dev/measure/mg-bots.js, dev/test/mg-balance-vp.js, quickcheck, coop tests; no new tool.

Reviewer: session_01N1tNP3VpMVoikpTW1oDAch (opus). START_CTX ≈ 6 % of the window.
Branch: review/mg-snap-r1 = review/mg-snap 2a00405f + merge of origin/main 9fdc1199 (trait-pool-r1; conflicts only in generated index.html/sw.js/assets.json → ours, site rebuilt). No code change by the reviewer. Ancestor of current origin/main: yes (fast-forward ready).

## 1. td_cong (Thêu theo nét) — the owner bug OD:L1571
- Code: the stitch is HER finger (every point kept and drawn; on-path = thread colour, off-path = thin dashed red); no index jump / no drawing along the dotted path any more. Score = mgTraceScore (jmgt, the ONE trace score, also read by j91 k91Trace → Đồ nét bút; jwkg Chép kinh / May áo wrap k91Trace). Tolerance = W × BAL.mgTier.lev.td_cong.tol via mgLev (rank/skill ease); accuracy weight BAL.mgTier.trace.acc = 1. Rule text TD_RULES cong 3 updated (cổ trang, no %).
- Played it myself with REAL touch (Playwright touchscreen / CDP touch events, device profiles fold 755x1000 and ipadAir 1180x820, Vừa = hoc/4/2), 3 pieces per play, raw → graded (mgGrade):
  | device | careful trace (±1.5 px) | scribble across the line (±35 px zigzag) | parallel 28 px off the line |
  |---|---|---|---|
  | Fold 755x1000 | 10 → 10 (×2) | 2 → 1 (×2) | 1 → 1 |
  | iPad 1180x820 | 10 → 10 (×2) | 2 → 1 (×2) | 1 → 1 |
  0 page errors. Shots looked at (scratch only, not kept): scribble shows the dashed red off-path stitches with short thread-colour pieces where it crosses the line; careful trace shows one clean thread line from bắt đầu to hết nét. Kit frame unchanged (canvas only, no private UI).

## 2. Whole family — my own scan (not the worker's table)
Code read of every KG82_ENG engine (j82 rhythm/go/pattern/steps/aim, j91 hold/fling/trace/arrange/untangle/cook/blend, j92 groom, jnwp calli/doiline, jnwq lay/sort/seat/clue, jlant lamp, jslap slapbar, jtd ×4, jts pluck/steer, jwkg kinh/may) + bots on ALL 30 kinds at Vừa (hoc/4/2), n=10 each, bots sloppy (5× scatter) / random / idle, 900 plays, 0 page errors. Raw means:
| kind | sloppy | random | idle | | kind | sloppy | random | idle |
|---|---|---|---|---|---|---|---|---|
| dan | 8.59 | 0.31 | 0 | | den | 7.72 | 1.34 | 2.66 |
| hat | 7.94 | 0.76 | 0 | | td_cong | 3.39 | 0 | 0 |
| co | 2.39 | 0 | 0 | | td_dung | 8.30 | 0 | 0 |
| dauho | 2.32 | 0 | 0 | | td_ngon | 8.23 | 0 | 0 |
| ban | 7.54 | 2.13 | 0 | | td_hanh | 6.65 | 0.80 | 0 |
| ve | 1.68 | 0.05 | 0 | | tho | 0.42 | 0.01 | 0 |
| hoa | 5.84 | 0.84 | 0 | | doi | 1.62 | 0.01 | 0 |
| theu | 7.48 | 3.50 | 0 | | doden | 6.51 | 0.34 | 0.92 |
| kim | 8.76 | 0.71 | 0 | | le | 4.60 | 0 | 0 |
| mua | 7.10 | 0.52 | 0 | | tc | 7.99 | 0.01 | 0 |
| banh | 7.71 | 0.10 | 0 | | xa | 7.68 | 4.06 | 0 |
| huong | 2.88 | 0.23 | 0.89 | | thq | 6.10 | 0.08 | 0 |
| kinh | 1.64 | 0.07 | 0 | | tat | 7.20 | 2.80 | 0 |
| may | 1.49 | 0.02 | 0 | | ne | 4.00 | 0 | 0 |
| duho | 7.64 | 0.58 | 0 | | chai | (harness, see below) | | |
- No engine left where random or idle play scores well (max random 4.06 xa, max idle 2.66 den — both below Giỏi). No snap / magnet / auto-aim found in code. High "sloppy" values are on timing/hold games (dan, hat, td_dung, td_ngon, mua, tat, banh, duho) where tap position scatter is not the skill, and on kim (untangle: judged by crossings, not position) / tc (drop into a bin) — by design, not snap.
- tho (Thư pháp đồ nét, jnwp nwCalli) is a 5th trace scorer with its own ordered/directional scoreStroke (prog × acc^1.6 × start), NOT mgTraceScore. It already grades her real ink (sloppy 0.42, no snap) → not a fault; NOTE for the "ONE trace score" wording only (calligraphy needs stroke order/direction, so a separate scorer is defensible).
- chai (Chải chuốt) cannot be measured by mg-bots (kg82Play('chai') gets no env.zw: main gives NaN, branch 0 — harness gap, pre-existing). Checked the new rule by simulation of the j92 code (needle = sine in time): blind taps "Vừa vặn" 8 / 11 / 18 % at w .26 / .33 / .4 (was the average of 3 → most blind plays in the green); aimed taps 97 %. Time-out mark = 0 (plain) scores 0. Wording updated in the how text. OK.
- Each fix checked in code: den (swing/band from BAL.mgTier.lev.den, idle 2.66 raw), chai (2 of 3 marks), xa (BAL.nwq.xaFloor 0), td_dung (spill costs BAL lev.td_dung.spill s; idle 0), dauho (aid [.14,.45]), ve/kinh/may (trace.acc 1). All BAL-read, canvas-only, no private UI.

## 3. Numbers (skilled bot, graded = mgGrade with kG; Xuất sắc = graded ≥ 9; Dễ hoc/0/2 · Vừa hoc/4/2 · Khó hoc/6/1; n=20 each, den/ve Vừa pooled more)
| kind | XS Dễ / Vừa / Khó | Giỏi+ (≥7) Vừa | sloppy Vừa raw |
|---|---|---|---|
| td_cong | 95 / 25 / 0 | 100 | 3.39 |
| ve | 75 / 22 (n=60) / 0 | 90 | 1.68 |
| kinh | 100 / 35 / 0 | 100 | 1.64 |
| may | 90 / 30 / 0 | 95 | 1.49 |
| den | 20 / 20 (n=90) / 14 | 98 | 7.72 |
| td_dung | 100 / 35 / 0 | 100 | 8.30 |
| dauho | 35 / 20 / 0 | 70 | 2.32 |
| xa | 90 / 35 / 0 | 100 | 7.68 |
- Vừa lands 20–35 % (n=20 noise ±10; worker n=30 gave 20–27) → OD:L1266 band met; random ≈ 0; sloppy clearly lower on every trace game; difficulty rises Dễ → Vừa → Khó on 7 of 8 (OD:L1255).
- den: Dễ 20 / Vừa 20 / Khó 14 = FLAT across tiers → den does NOT meet OD:L1255 ("khó hơn khi lên cao"). Pre-existing (main before: 23/13/23), not caused here, out of this order's scope → OPEN for Foreman B (den board must scale with ease: swing/band/pad rate by tier). I tried kG den .65 (one sample n=30 gave 53 % — den raws are very noisy near the threshold) and reverted: pooled n=90 at the worker's .8 = 20 %, inside the band.
- Khó (rank 6, art 1) is hard for skilled play (Giỏi+ 0–35 %) — same shape as before mg-snap for ve/kinh/may (mismatched level); not a change of this branch.

## 4. Tests (on 931255b1, after the main merge unless said)
| test | result |
|---|---|
| one-core-guard (no --allow-grow) | PASS, 0 fails |
| quickcheck | PASS · 179 s · old save ok · render 249/262 ms · core gates PASS (also PASS on 2a00405f before the merge) |
| mg-balance-vp: old save from main 6c4f21c3 → this build, 755x1000@2 + 1180x820@2, the 9 changed kinds (incl. chai) | old save loads, 9/9 plays each size, 0 bad, 0 page errors (run on 2a00405f) |
| coop-e2e | 2a00405f: 60/61 (known flake "#next enabled"), rerun 60/60; 931255b1: 60/60 |
| coop-one-world | PASS (both shas) |
| real-touch td_cong play Fold + iPad | see §1, 0 errors (both shas) |
| mg-bots | ≈ 1 700 plays, 0 page errors |
Build reproducible (only the build line differs). Old saves: no save field added.

## Verdict
PASS review/mg-snap-r1 931255b1c6504a66a3b33d7bb52a556b1fc454a3 (fast-forward of origin/main 9fdc1199).
OPEN (not blocking, for Foreman B): (a) den flat across tiers vs OD:L1255 (pre-existing); (b) mg-bots cannot play chai (no env.zw) — add a zw default in the harness; (c) tho keeps its own directional trace scorer (wording "ONE trace score" covers ve/kinh/may/td_cong only).
Shots: scratch only, deleted; none in git or CDN.
