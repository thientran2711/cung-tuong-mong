# REVIEW outside-nums (GAP OR11 + OR12) — reviewer session_01964izFXVt2ir21ERpPWsgq (opus, tier BIG) for Foreman D #10, 20/11 13:21Z

PRIORITY #1 CHECK: OUTSIDE_PLAN.md:170-180 (§12 split + «Difficulty Dễ/Vừa/Khó scales the scheme hazard and the forced-match speed») | main LIVE 26f3bfa9 → dd248d5d (no kcSch/kcMatch/kcRumFade on main; jkc KC.selMax + typed .12 on main) | review/outside-nums 3e8e8a0f (this review); review/kc2val-home(-r1) already LIVE, home-bot «value of waiting» only | claims: OUTSIDE NUMS #1 session_01964izCCWYwRvyU2FTazDMZ (CLAIMS.md:401).
START_CTX ≈ 3 % (1M window).

## VERDICT: PASS (with one reviewer fix) — LAND READY review/outside-nums-rv 46e42c8ff0f6126b2aac60a235884bd00c8f0189
(= worker 3e8e8a0f + reviewer fix de86f1e4 + final merges of LIVE f2e2d1cf and dd248d5d; ancestor of origin/main dd248d5d checked.)

## (a) Are the bot fixes real fixes?
- **inkc «miễn tuyển» filter: real.** The policy already refused the father's «Xin cha lo cho được miễn tuyển»; the tổ mẫu card «Xin tổ mẫu nói với cha cho miễn tuyển» (jkc.js:737) is the same choice through another person and its result text says it plainly: «Ngươi sẽ không phải đi tuyển; nhà sẽ lo chuyện gả chồng». A player aiming at the palace (what the «sensible» column of §12 measures: palace 70-75) never takes it. Extending the filter to the sibling option is a hole fix, not a bend.
- **kcbot «stuck» class: right for the bot — but it was hiding a GAME BUG, now fixed (reviewer fix de86f1e4).** I traced where a life can stop with no end: miễn tuyển → at the Sơ tuyển `kcSoTuyen()` sets `S.kc.so=1, mien=2` and pushes «Cha định hôn» → she picks «Quỳ xin cha cho đi tuyển tú» → if the roll wins, the father says «vậy thì vào cung cho xứng» and clears the match, **but `S.kc.so` stays 1, so Sơ tuyển never runs again** (kcEndTurn only calls kcSoTuyen when `!so`, kcTuyen needs `soOk`). Repro (scratch script, tt origin, forced win of the kneel roll, then refusing matches): the life ran 73 months to year 7 (tuyển tú is KC.ty = 3) still on the home road, no end, no palace. That is a soft-lock a real player can hit (rare: needs miễn tuyển + winning the kneel), and it is exactly the old bot's «stuck» lives. LIVE has the same bug (pre-existing, not added by the worker).
  Fix (one line, jkc.js dinhhon «Quỳ xin cha» success): `if(S.kc.mien===2){S.kc.mien=0;S.kc.so=0}` → she gets her Sơ tuyển back at the calendar point. Re-run of the repro on the fixed build: Sơ tuyển at year 3 month 2, enters the palace (`inPal true`). Only this path sets so=1 and can then relent (grep `chaYes|forced=0|kc.so=`); the normal kap≥dinh định hôn path has so=0 and was fine. No player text changed.
- The new `stuck` class stays (a stuck life is not a death); with the game fix there should be none — my 120-life sample had 0.

## (b) §12 split — within tolerance?
| sample (Vừa, sensible, fixed bot) | n | palace | married | death | rare | stuck |
|---|---|---|---|---|---|---|
| §12 target | | 70–75 | 15–20 | 4–6 | 2–4 | – |
| worker FINAL | 180 | 76.7 | 18.9 | 2.8 | 1.7 | 0 |
| **reviewer, independent** (kcbot 20/origin × 6, on 3e8e8a0f) | 120 | 75.8 | 20.8 | 2.5 | 0.8 | 0 |
| pooled | 300 | 76.3 | 19.7 | 2.7 | 1.3 | 0 |
- palace +1.3 over the band (1 SD at n=300 ≈ 2.5) → inside; married on target.
- death 2.7 vs 4 (1 SD ≈ 1.2) and rare 1.3 vs 2 (1 SD ≈ 0.7): **both about 1 SD under, in two independent samples** — the worker's stated tolerance (±1 SD) holds at the edge. Not blocking: it is the generous side, Khó gives 6.7 % deaths, and the rare share cannot be tuned honestly without a rare-seeking policy (see d). Named follow-up MAIN-1 below.
- Knobs in force recorded per life (`dk`): ["vua",100,2,100,3.2] = shipped Vừa = LIVE formulas (kcSch ×1, kcMatch ×1, kcRumFade 2, kcSelMax 80, kcRareX 12 = old `100*p*…*.12`) → «no Vừa retune» is true: the Vừa game is unchanged; only Dễ/Khó move.

## (c) Laws
- **Law 4 one core:** the 5 new keys live in BAL (jbal.js); jkc/jkc2 read BAL.kcSch/kcMatch/kcRumFade/kcSelMax/kcRareX; KC.selMax removed, no reader left (grep); both typed kld `-2` fades gone. `/100` = percent unit. jdiff Dễ/Khó rows use the same [m,a] form as hz. one-core gates PASS (quickcheck core gates). Pre-existing typed numbers still in jkc (KC.ev 38 / apM 2 / ill 3, the mal() trait weights, `kld-5`, `tm96.h-=10` in cards) are outside this job → follow-up MAIN-3, not blocking.
- Rounding check (jdiff put rounds integer bases): jkc kap step 2 → Dễ 1 / Khó 3, 3 → 2 / 4; jkc2 dan kapKc2Month 3 → Dễ 2 / Khó 4; kld fade Dễ 3 / Khó 1. Every knob moves in the right direction.
- **Law 5 (harder as she climbs):** not touched — these are life-difficulty knobs, not rank-scaled mini-games/trials; no mini-game tier changed.
- **Law 1 two-way:** her-side knobs only (how hard her own house aims at her), same class as BAL.hz; no world rule changed.
- **Laws 2/3 (Dễ/Khó choice):** Khó adds home hazards and already pays Phúc duyên ×1.5; Dễ eases them and pays ×1 — the difficulty choice keeps its gain-and-loss shape. Worker's effect table (forced matches Dễ 3 / Vừa 6 / Khó 10; gossip 6/12/26) shows the knobs bite.
- **Old save:** no S.diff → Vừa base knobs (difficulty.js); LIVE save → this build loads and plays, home save reloads at home (outside/oldsave.js).
- **Co-op:** coop-e2e 68/68, outside/coop-home 51/51. S.diff is per-blob (jdiff note), home knobs follow the same path as hz.
- No UI, kit part, picture or player text changed → laws 7, 9–12 not engaged (no screenshots needed; route.js still walks the home tabs at its sizes, no overflow/cut).

## (d) Worker's OPEN items
1. Random-bot palace 34–39 vs 50–55 (other 28–34 = random takes every exit card: Xuất gia / Nữ phu tử / elope). Reaching 50–55 needs a design change to the forced-match cards (law 18) → **not blocking**; MAIN-2.
2. Rare share needs a rare-seeking bot (sensible bot meets almost no rare gate; kcRareX 12→30 moved nothing in 360 lives) → **not blocking**; MAIN-1.
3. HH ±5 vs direct start: NOT measured. kchh.js ≈10 min/life; a ±5-point answer needs ≥60 lives/arm. A smaller sample I could run here (≈12/arm in ~80 min) has 1 SD ≈ ±14 points — it cannot confirm or deny ±5, so I did not spend it. Vừa formulas are unchanged from LIVE, so this branch cannot have moved HH on Vừa → **not blocking**; named follow-up **MAIN-4** (needs a ≥5 h run, e.g. overnight shards: `node dev/measure/kchh.js cung 10` vs `nha 10` per origin).
- Report nit: the OR11 table in reports/outside-nums.md still says kcMatch Vừa «80 (tuned)» / Khó 100 and the «proof» line `Khó [125,1,100…]` from round 2; shipped values are Vừa 100, Dễ 60, Khó 125 (jbal/jdiff). The code is right; the table row is stale.

## Gates on 46e42c8f (final merge of LIVE dd248d5d, site rebuilt), one at a time
| gate | result |
|---|---|
| quickcheck.sh | QUICKCHECK PASS · open 1583 ms · old save ok · perf render 244/243, tab 533/553, buổi 1307/1178 · core gates PASS |
| difficulty.js (6 sizes) | ALL OK (71 ok on the first merge) |
| outside/route.js · kc-end.js · oldsave.js (LIVE main.html → this) | rc 0, fail [] , errs [] (all three) |
| coop-e2e.js · outside/coop-home.js (on the f2e2d1c merge; dd248d5 = kit podium + tests only) | 68/68 · 51/51 |
| independent kcbot Vừa sensible n=120 | see (b) |
| home soft-lock repro (scratch) | before: 73 months, no end · after: Sơ tuyển → palace |

## Named follow-ups for MAIN (none blocks this land)
- MAIN-1 rare-seeking bot policy, then decide rare 2–4 % and the slightly low sensible death (pooled 2.7 vs 4–6).
- MAIN-2 random-bot palace 37 vs 50–55: design question on exits in forced-match cards (law 18, parking lot).
- MAIN-3 move the rest of the KC table (ev, apM, ill, cut, so) and the typed card numbers in jkc into BAL (law 4 sweep).
- MAIN-4 HH ±5 vs direct start: ≥60 lives/arm kchh run (~5 h).
- MAIN-5 (law 11 audit, small): check the jkc2 home roads (dan / nc) for any other «relent» branch that leaves a one-shot flag set; this review only found the jkc one.

Scratch only (not in git): bot JSON + repro under /home/user/wt/onrv-out, /home/user/wt/onrv-rp (this container). No shots taken (no UI change), nothing on the CDN review folder.
