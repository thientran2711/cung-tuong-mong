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

## 2026-11-21 ~05:10Z: tuned re-measure, gates, co-op checks

Tune (BAL.feel only, jfeel.js): w.gian harm 1.6->1.35, provoke/humiliate 1.3->1.15; w.ghen harm 1.3->1.15; dg.cap 8->5. No other number changed.

Before/after on the SAME seeds 601-608 (run4c.sh, 9-origin rotation, HHSTOP; emocmp.py, boot.py = 2000x bootstrap of lives with act counters):

| arm | n | HH | early death | childbirth deaths | NPC harm/yr (95% CI) | provoke/yr | humiliate/yr | NPC kind/yr |
|---|---|---|---|---|---|---|---|---|
| OFF | 62 | 34% ±6 | 45% ±6 | 31% ±6 | 141 (130-150) | 78 | 35 | 271 |
| ON = LIVE | 80 | 38% ±5 | 40% ±5 | 30% ±5 | 157 (143-170) | 88 | 39 | 258 |
| TUNED | 74 | 32% ±5 | 50% ±6 | 35% ±6 | 145 (135-156) | 80 | 36 | 256 |

- NPC harm: ON +11% over OFF on these seeds -> TUNED +3%, inside the OFF CI. The provoke/humiliate excess is gone.
- HH: TUNED vs ON -6 (±7 combined SE). Inside the noise; per-seed spread is 11-57%.
- Early death: TUNED vs ON +10 (±8 combined SE, about 1.3σ). Most of it is childbirth deaths (+5), which harm weights do not drive. I read it as seed noise but cannot rule it out at n=74. **Reviewer: please weigh this.** A 150-life tuned arm would settle it, at about 7 h of 4-browser runs.

Branch review/emo-balance (final-merged LIVE 8acb2bef (via 5a8c30af, 8b2e344d, fafe0f62, 922b36b4), merge-base present after --deepen=400):
- LIVE-revert audit CLEAN. `git diff 8acb2bef..HEAD` (9 files, +192 -42) touches only jemo.js, jfeel.js, the measure tools and the new probe. Every hunk is from my commits 9118941 / 34308fd2. The only extra lines are 9118941's BAL.feel lines that 34308fd2 replaces.
- quickcheck PASS on every merge (5a8c30af, 8b2e344d, fafe0f62, 922b36b4, 8acb2bef). Last run on 33fb97ec: core gates PASS, open 1873 ms, old save ok, perf median new/live render 209/298, tab 561/609, buổi 1522/1424 ms. one-core-guard PASS. tier.js = BIG.
- tier.js BIG -> ag-later-scan PASS, emo-men ok (errs []), emo-seal-persist ok (errs []), feel-shown 6/6, feelings18 34/34, game-feel ok (no page errors; offline errs []; old load ok; open new 8.3/10.5 s vs main 9.1/9.0 s at 4x CPU), rules-one-source PASS (in quickcheck G2), difficulty ALL OK.
- paid-tiers: 81 FAIL, IDENTICAL list to LIVE 5a8c30af (pre-existing shop/craft price rows, not this branch). One first run with 3 bot browsers in parallel gave 93; two clean reruns gave 81.
- coop-e2e 92/92 PASS (on 5a8c30af, 8b2e344d and 922b36b4 merges). feel-shown 6/6, feelings18 34/34 re-run on the 922b36b4 merge.
- co-op emotion check: NEW dev/test/coop-emo-seat.js. It is coop-one-world-play plus, for every NPC, [emotion kind, strength, target, cause text, week], emoMul for provoke/humiliate/idle/help, and the BAL.feel tables. These must be the same on both seats at every merged week. It also asserts that the values were really read (not an error string).
  - Emotion effects are host-computed by design: feelWorld()=worldOn() is false on the guest, jemoact eaHost (seat a), jcoopone ONLY_ME emoMonth.
  - D #14 settle run, 12 runs each, 4 in parallel, same probe: **LIVE fafe0f62 6/12 FAIL, branch (merged fafe0f62) 3/12 FAIL**. Earlier serial runs: LIVE 5a8c30af 0/6, branch 3/9.
  - Every mismatch, LIVE and branch alike, is on NPC #1 at a merged week, and the other ~10 NPCs always match. The cause texts show the same split: one seat has "được <name> đối đãi tử tế" (jemo.js:124 affAdd wrap -> emoEv gift, or jevb.js:91), the other "được nhà gửi bạc vào" / "phòng ốc bày biện vừa ý" (jfeel life / jshelf). Examples:
    - LIVE L5: 22 "phòng ốc bày biện vừa ý" | 50 "được Viên Ngân Chúc đối đãi tử tế"
    - LIVE L11: 100 | 53, both "được … đối đãi tử tế" with different givers
    - branch B7: 38 "được nhà gửi bạc vào" | 67 "được Phú Sát Ngọc Hành đối đãi tử tế"
  - **=> PRE-EXISTING in LIVE, not caused by this branch.** This branch touches no co-op, sync or emoSet code, and the gap is the same or smaller on the branch.

**FOR MAIN (co-op one world, pre-existing):** NPC #1's feeling (p.emo) can differ between the two seats after a merged week, so emoMul and the NPC's acts differ (one world broken for that NPC). Repro: `node dev/test/coop-emo-seat.js <out>`, about 1 run in 2 to 4.
- Path: guest-side emoSet/emoEv on a world NPC with no worldOn() guard. jemo.js:124 affAdd wrap and jevb.js:91 are the "đối đãi tử tế" cause; jfeel life gives "nhà gửi bạc" and jshelf gives "phòng ốc".
- The merged week does not carry NPC p.emo, or it carries it for every NPC except #1. Why always #1 is worth checking in jcoopone's PERSON list.
- Fix options for the co-op owner:
  - (a) guard emoSet for p!==S with feelWorld(), or
  - (b) carry NPC p.emo in the merged-week world state.
- Not in this job's scope (one-core BAL.feel balance). I did not change it.

New tools on the branch: dev/measure/run4c.sh (one seeded browser per seed, ≤4 at once, CAP), dev/measure/emocmp.py (arm table with SE + per-seed spread), dev/test/coop-emo-seat.js (co-op emotion probe).
Scratch data (not in git): /home/user/wt/emo-out/{off,on,tun}_s*.json.

SẴN SÀNG KIỂM 33fb97ec2e616125b1ee43f0dde06f081ce6f2c3 (review/emo-balance, TIER BIG, on LIVE 8acb2bef; LIVE has since moved to 2021e23f with no emotion files touched up to 8acb2bef. Reviewer: please final-merge at land.)
