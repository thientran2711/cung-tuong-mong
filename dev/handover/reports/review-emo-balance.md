# REVIEW emo-balance #1 — report (append-only)

START 2026-11-21 ~06:00Z: session session_01964izCJtXpS9YaSSenjP1G, depth 6, START_CTX ~4% (1M window; roll over at ~29%, ceiling 60%). Parent FOREMAN D #14 session_01964izE19z2nZ1MbPTVsG1X.
PRIORITY #1 CHECK: OD emotion/feel/harm lines | main LIVE 2021e23f | review/emo-balance 33fb97ec2e616125b1ee43f0dde06f081ce6f2c3 | claims EMO BALANCE #1 session_01964izFYgpKE1QKqdLq7n1c (D).
Scope: one core BAL.feel (EMO_W/OD/LOY/dg cap/idle wd) + tune; gates BIG; co-op land gate.

## 2026-11-21 ~07:35Z — VERDICT: PASS (TIER BIG) — LAND READY 2fa343d1aec5101f5c6611cf9406f33ce2afe7fa (review/emo-balance-r1)

Reviewer merge: review/emo-balance 33fb97ec + final-merge LIVE 2021e23f (full-history clone /home/user/wt/rev-emo), conflicts only index.html/sw.js -> rebuilt with dev/site/build_site.sh; build-line text set to Vietnamese (CTM_CHANGE "Cân lại lòng người: phi tần giận, ghen bớt gây khó dễ"; the branch's own line was an English commit subject). Branch review/emo-balance-r1 = 2fa343d1, ancestor of nothing but itself; origin/main 2021e23f is its ancestor (FF-able).

### LIVE-revert audit: CLEAN
`git diff origin/main 2fa343d1 -- dev` is byte-identical to `git diff 8acb2bef 33fb97ec -- dev` (only the blob index line of jfeel.js differs, because LIVE changed jfeel line 282 emoSeal — kept). index.html diff vs LIVE = exactly the jemo/jfeel hunks + build hash/line. mood-seal-2 (LIVE 2021e23f) fully kept (emoSeal:{k,who} present in index.html). Nothing of LIVE lost.

### 18 laws (those the change touches)
- L4 ONE CORE: PASS. Double source removed: EMO_W/EMO_OD/EMO_LOY now `{}` in jemo, filled at load from BAL.feel (jfeel.js:133) + BAL.emo2 (jmoodknow.js:177); jemo no longer re-types the rows jfeel overwrote (ghen w/od/loy, EMO_EV.night, EMO_TR Kiêu ngạo/Tham vọng/Xảo quyệt/Nóng nảy/Thật thà rows — jfeel tr/ev hold the same values, verified line by line). danger cap/div -> BAL.feel.dg, withdraw idle 1.4 -> BAL.feel.wd. one-core-guard PASS (quickcheck core gates). Stale comment "capped +12" fixed.
  Note (not this branch, pre-existing, FOR MAIN follow-up, non-blocking): jemo.js still types its own single-source tables/numbers: EMO_EV (l.16), EMO_TR (l.20-35), EMO_DECAY/EMO_DK (l.40-41), EMO_BRAKE (l.132), emoMul fallback `.9` (l.137), oan>=60 -> .5 (l.135), emoMonth `/60` (l.150), affAdd/oanAdd thresholds 8/5 and cl(n/10,.6,1.6) (l.124-125). Single source today, but outside BAL; a later one-core sweep should move them into BAL.feel.
- L1 TWO-WAY: PASS. Weights act in persW for every p!==S (NPC vs NPC and NPC vs her alike); the danger wrap applies to any doer v and any target t, her included. No asymmetry added; the tune only lowers numbers.
- L3 GAIN-AND-LOSS / L2: no player choice changed.
- L6 REAL-WORLD (death is a feature, no shields): PASS. Nothing protects her; harm acts stay possible (harm weight still >1 when angry/jealous: gian 1.35, ghen 1.15, cap 5 still adds danger). Early death +10 TUNED vs ON in the worker's run: judged NOISE, not this change: (a) TUNED vs OFF on the same seeds is +5 (≈0.6σ), and the tune moves every weight back toward OFF; (b) most of it is childbirth deaths (+5 vs ON, +4 vs OFF), which harm weights do not drive (if anything fewer harm acts -> fewer miscarriages -> more births reach term, a real-world effect, not a shield); (c) my re-run on seeds 601-608: early death TUNED 38% = OFF 38%, ON 25% (36% with 3 extra ON lives) — inside ±15-17 SE. Not blocking.
- L7 wording: no player text changed except the build line (Vietnamese, cổ trang).

### Gates (BIG)
- quickcheck on 2fa343d1: PASS · open 1795 ms · old save ok · perf new/live render 285/270, tab 569/565, buổi 1388/1167 ms, tasks>200ms 21/20 · core gates PASS (one-core-guard, rules-one-source, kit-conform, co-op one-world hook) · total 442 s.
- coop-e2e: 92/92 PASS (live Worker).
- tier.js BIG tests: ag-later-scan PASS · emo-men 755x1000@2 errs [] · emo-seal-persist 755x1000@2 errs [] (rc 0) · feel-shown 6/6 · feelings18 34/34 (no page errors) · game-feel: fold/ipad/phone errs [], old save loads (inv 10), offline ok, open new 8.8/9.1 s vs main 10.4/9.6 s · difficulty ALL OK.
- paid-tiers: 81 FAIL rows on the branch, the SAME 81 on LIVE 2021e23f (diff of FAIL lines empty) => = LIVE.
- Bot re-run (run4c.sh, seeds 601-608, 1 life/seed/arm, CAP 3000, LIVE 2021e23f for OFF/ON, 2fa343d1 for TUNED; scratch /home/user/wt/rev-emo-out, not in git):

| arm | n | NPC harm/yr | NPC kind/yr | HH | early death | childbirth |
|---|---|---|---|---|---|---|
| OFF | 8 | 102 | 216 | 50% ±18 | 38% ±17 | 12% ±12 |
| ON (LIVE) | 8 (+3) | 131 (136) | 244 (252) | 62% (55%) | 25% (36%) | 12% (18%) |
| TUNED | 8 | 118 | 227 | 38% ±17 | 38% ±17 | 38% ±17 |

  Same order as the worker's 150-life tables (OFF 141 < TUNED 145 < ON 157): the tune cuts the emotion-driven harm excess; n=8 is too small for HH/death (±17) and shows no sign of a death shift beyond noise.

### CO-OP LAND GATE
- coop-e2e PASS (above).
- coop-emo-seat (dev/test/coop-emo-seat.js), 6 paired runs, branch and LIVE 2021e23f at the same time (2 seats each): branch 5/6 FAIL, LIVE 3/6 FAIL. Pooled with the worker's (LIVE 6/12, branch 3/12): LIVE 9/18, branch 8/18 — same rate. Every failure on both builds is one NPC's p.emo (strength/kind/cause) + emoMul differing between seats at a merged week; the other NPCs match. Mostly rival id 1; LIVE run 6 failed on rival id 4, so not tied to #1. Cause texts as the worker found ("được … đối đãi tử tế" on one seat vs "phòng ốc bày biện vừa ý"/"ngắm hoa trong vườn"/"được Hoàng thượng lật thẻ" on the other).
- => PRE-EXISTING in LIVE, confirmed independently. The branch changes no line on that path (diff touches only the weight tables, danger cap and wd).

**FOR MAIN (co-op one world, pre-existing bug, LIVE 2021e23f):** an NPC's feeling (p.emo) is written on the guest seat locally and is not carried by the merged week, so the two seats disagree on that NPC's emotion and emoMul (her acts). Code (LIVE 2021e23f line numbers): dev/build/jemo.js:71 emoSet and :77 emoEv have no worldOn()/feelWorld() guard for p!==S; the guest-side writers are jemo.js:127 (affAdd wrap -> emoEv gift "được … đối đãi tử tế"), dev/build/jevb.js:98 (evbMood -> emoSet vui "được <her> đối đãi tử tế"), plus jfeel life / jshelf causes. dev/build/jcoopone.js:23/29 ONLY_ME covers emoMonth/emoPeople only. Fix: (a) guard emoSet/emoEv for NPCs with feelWorld() on the guest, or (b) carry every NPC's p.emo in the merged-week state. Repro: `node dev/test/coop-emo-seat.js <out>` (fails ~1 run in 2).

Shots: none kept (test outputs in /home/user/wt/rev-emo-shots scratch only; no CDN review folder used).
