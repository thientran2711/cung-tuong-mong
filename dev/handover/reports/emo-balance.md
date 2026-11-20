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
