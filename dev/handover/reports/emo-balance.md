# EMO BALANCE #1 — JOB 5 (row EM01) — report (append-only)

PRIORITY #1 CHECK ('EMO_OD|emoOff|feelOff'): OD EMOTION_PLAN.md:106-119 (open: 150+150 off vs v4, then tune EMO_OD / EMO_W idle / danger cap) | main dev/measure/run5b.sh, anemo.py, jemo.js:56 emoOn, jfeel.js:121 feelOn, jfeel.js:126-134 overwrites EMO tables | review/* none for emo-balance (emotion-acts-3 = act layer, seeded runb SEED reused) | claims none.

Branch: review/emo-balance (from origin/main 30e8714e). Worktree /home/user/wt/emo, run output /home/user/wt/emo-out (not in git).

## Step 1 — one core (done, 9118941)
- Double source found: jemo typed EMO_W/EMO_OD/EMO_LOY for the old kinds; BAL.feel (jfeel) re-typed ghen in w/odAll/loy, EMO_EV.night and 9 EMO_TR rows (Kiêu ngạo/Tham vọng/Xảo quyệt/Nóng nảy/Thật thà) and overwrote them at load; danger cap 8 (comment said 12) and withdraw idle 1.4 typed in jemo.
- Now: every value in BAL.feel (w, odAll, loy, dg{cap,div}, wd); jemo tables are {} filled by jfeel (+ BAL.emo2 by jmoodknow, unchanged). Duplicate rows removed from jemo.
- Proof of no change: tables dumped in-browser after load, LIVE vs branch → TABLES IDENTICAL (emo-out/tabs.js). one-core-guard PASS (inline 3836 ≤ baseline 4212, fails 0).
- run5b.sh: SEEDB=<n> → shard i gets SEED=n+i (same seeds both arms); CAP env.

## Step 2 — measure 150 OFF vs 150 ON on LIVE (running)
- Build = LIVE index.html (origin/main 30e8714e) copied to emo-out/live.html.
- OFF: SEEDB=500, EXTRA window.__emoOff=1;__feelOff=1;__eaOff=1 (whole emotion layer off). Started 08:31Z, 5 shards × 30.
- ON: same seeds, no switches — next, after OFF (memory: one batch at a time).
- Analysis: python3 dev/measure/anemo.py "OFF=emo-out/off_*.json" "ON=emo-out/on_*.json"

## HANDOVER (if I roll over)
Resume: wait for emo-out/off_*.json (30 each), then run ON:
`cd /home/user/wt/emo-out && OUT=$PWD SEEDB=500 CAP=30000 bash /home/user/wt/emo/dev/measure/run5b.sh $PWD/live.html on 30`
Then table per EMOTION_PLAN.md §7, tune only BAL.feel (odAll / w.*.idle / dg.cap), rebuild, re-measure ON-tuned with same seeds, before/after table, final-merge origin/main, gates, SẴN SÀNG KIỂM.

## 10:25Z — foreman D #10 (session_01964izDrx83qqXTF9t1BYy7) ruling
Keep 150/arm. Early stop allowed: once ON ≥ 75 lives, if every key metric's OFF/ON gap is clearly outside the seed-to-seed spread (state the spread), stop ON, tune BAL.feel, re-measure tuned with the same count. Progress lines + SẴN SÀNG KIỂM go in FOREMAN_D_STATUS.md. OFF at 42/150 by 10:24Z (~22 lives/h).

## 12:32Z — OFF 82/150; shard 4 OOM
- Shard 4 (seed 504) was OOM-killed at 6 lives (dmesg: chrome-headless 3.3 GB anon). Renderer RSS grows with lives per page (shard 5: 4.4 GB at 27 lives); 4 browsers use ~12 of 15 GB, so a 5th cannot run alongside.
- Plan: let shards 1/2/3/5 finish (crashes keep the lives already written), then top up to 150 in chunks of ≤10 lives per process, ≤4 browsers, new seeds 6xx listed here. ON arm uses the same chunk/seed plan.
- Note for resume: the watcher loop hits the 2 h background limit; a send_later wake is set for 14:03Z.

## 14:05Z — container slept 12:36–14:04 (all bot processes gone; files kept)
- Lesson: bot runs only live while this session has a background task; a detached nohup run dies when the container is reclaimed. Runs are now the background task itself, in chunks that end before the 2 h background limit.
- New tool dev/measure/run4c.sh (review/emo-balance): one browser per seed, ≤4 at once, CAP 6900 s, out <label>_s<seed>.json.
- OFF so far: run5b shards seeds 501/502/503/505 = 14/19/17/27, seed 504 = 6 (OOM) → 83 lives.
- OFF top-up round 1: seeds 601–604 × 8 lives (14:05Z). Round 2 planned: 605–608 × 9.
- ON plan (same shape): run5b-like first part is not repeated; ON = seeds 501–505 and 601–608 via run4c in the same per-seed counts as OFF.

## 18:00Z — OFF arm done (n=145; foreman D #11 now)
OFF (LIVE 30e8714e, whole emotion layer off; seeds 501–505 run5b + 601–608 run4c): n=145  HH 37 % ±4 (per-seed files 11–62)  early death 43 % ±4 (24–67)  childbirth deaths 28 % ±4  NPC harm acts/yr 141  kind acts/yr 271. (±= binomial SE; tool dev/measure/emocmp.py on review/emo-balance.)
"Early death" = anemo.py definition (counts nun / sent home / Tuổi trời rows too) — same rule both arms.
ON arm started 18:00Z: run4c seeds 601–604 × 10, then 605–608 × 10; early-stop check at ≥75 (D #10 rule).

## 2026-11-21 00:55Z: OFF vs ON final (LIVE 30e8714e, seeded, HHSTOP, 9-origin rotation)

| arm | n | HH | early death | childbirth deaths | NPC harm/yr (95% bootstrap CI, lives with act counters) | NPC kind/yr |
|---|---|---|---|---|---|---|
| OFF (__emoOff+__feelOff+__eaOff) | 145 | 37% ±4 (per-seed 11-62) | 43% ±4 (24-67) | 28% ±4 | 141 (132-149, n=91) | 271 |
| ON (LIVE as shipped) | 145 | 38% ±4 (10-60) | 39% ±4 (10-60) | 28% ±4 | 162 (150-173, n=90) | 255 |

Read: HH, early death and childbirth gaps are 1-4 points against a ±4 SE and a 10-60% seed-to-seed spread, so emotions are balance-neutral on survival/rank (inside EMOTION_PLAN §7 ±3 for HH, early death within noise).
NPC harm is +15% with emotions ON and the CIs do not overlap: a real effect. Per kind (per year): provoke 78 -> 90, humiliate 36 -> 41, block 4.0 -> 5.4, trip 2.4 -> 3.1, the rest within ±1.
Source: angry (gian) and jealous (ghen) NPC weights plus the danger bonus toward the target.
Tuning (BAL.feel only): w.gian harm 1.6->1.35, provoke/humiliate 1.3->1.15; w.ghen harm 1.3->1.15; dg.cap 8->5. Tuned arm runs on seeds 601-608 (80 lives) for a same-seed before/after.
