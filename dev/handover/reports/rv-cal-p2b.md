# REVIEW cal-p2b (BIG, opus) — verdict PASS → LAND READY f43efc71 (was 62e3c9f1; re-merged LIVE 90b7e797 on ROOT-77 ask)
Reviewer session_01Rc5AsJGMmUL6NpNpYgiR6c (MAIN ROOT-76). Target review/cal-p2b 45768ff8 (worker session_01Rc5AsJrsgDY7hAuWGR2XNq). Result branch review/cal-p2b-rv 62e3c9f1 = cal-p2b + reviewer fixes + final-merge LIVE fd682a8d (mg-back; via 90d57324 mg-fair-ratio, 66bd36cd mg-play2); index.html/sw.js rebuilt; FF-OK on origin/main fd682a8d.
PRIORITY #1 CHECK: OD L1997–1999, L2041 (~06:50Z «đạt hết mà toàn 9/10»), L2045 (~07:35Z CANON OVERWRITE: fix broken games only), L2046 (rolling b, Foreman D) | main fd682a8d: jmgt mgGrade/mgLive/mgPace/mgTol/mgLev, j82 kg82Steps, j91 k91Blend/k91Cook, jbal2 BAL.mgTier, BAL.ag.mg2.cal, dev/tools/mgcal_apply.py | review/* cal-p2c (Foreman D, identity offset, not touched here) | claims: this row.

## Diff vs LIVE (only): j82 mua dark gap + onset pop · j91 huong one round score rs() + banh gust reach · jbal2 mgTier.blend, kG.huong 3.65→1, lev.mua.dark, lev.banh.reach, 9 × lev[kind].fast (+ xa keep) · dev/test/cal-p2b.js.

## Reviewer fixes (small, done myself)
1. **mgcal reset (brief note)**: mgcal_apply.py keeps the FIRST try (a later try prints «kept first try» and is dropped) and has NO reset flag → her re-test of the fixed boards would never count. Applied the existing precedent (b218d1d2 dropped cal.k.dauho taken on the broken Đầu hồ board): **dropped cal.k huong 4.5, mua 6.3, banh 6.1** (owner L2045 lists exactly these three as broken games she re-tests); comment at BAL.ag.mg2.cal states the rule. NPC hands for these 3 fall back to the default band until her re-test (same as dauho). The 9 pace kinds' b are **kept** (she plays them OK, owner L2045 «những cái môn là tôi đang chơi ổn thì cứ để nó như vậy»; 5 of 9 are already ≥ cal.max 9.5; the rolling b of OD L2046 / cal-p2c will absorb the rest) — MAIN may decide otherwise.
2. LAW 4: banh gust cap typed .1/.34 duplicated the fire physics → one local FAN=.34 / COOL=.1 read by both the physics and the cap (pre-existing engine constants, now one place). Múa cap `SP*.6` typed → BAL lev.mua.darkCap [.6,.6].
3. Tests: cal-p2b C regex follows fix 2; ag-mgcal test 3 compared K2's band with K's default — once mua is uncalibrated K2 = mua (hand group a, sd 1.5) ≠ dauho (group r, sd 1.7) → now compares K2 with its OWN default band (pre-existing test fragility; this was likely the worker's "flake").

## CANON OVERWRITE check (each change fixes a fault; shown on LIVE vs branch, dev measure /home/user/wt/rv-calp2b-out/m/law.js)
- **Điều hương**: LIVE live hint ★★★ «khớp» at mix gap .05 → round score .65/.72/.77/.80/.84 (ease 0/1/2/3/5) → graded **2/3/4/4/5 /10**. Branch: ★★★ only when round score > .85 → grade ≥ 9; hint, verdict and grade read the same rs(). Fault gone. kG 3.65→1 accepted as part of the listed "Điều hương grading fault" (3.65 was fitted on an oracle bot; with it the board can never agree with the mark).
- **Múa**: LIVE dark between shown steps = SP·.28 ≈ 145–215 ms, constant pop → repeat merges. Branch, real board, virtual clock: repeated cushion lit 4× separately (417–433 ms each), dark gaps 217 ms (≥ 220 − 1 frame). LOOK Fold 755×1000: lit cushion glow + pop clearly bigger than the rest; iPad 1180×820 shot caught a dark gap (all plain) — contrast lit/dark is clear.
- **Nấu ăn**: LIVE gust .6/s > fan .34/s / cool .1/s (uncounterable; ideal hand 10 % in zone at ease 0). Branch: gust ≤ reach × answerable; ideal hand ease 0/1/2/3/5 = .44/.72/.93/.98/1 (test C). Fault gone, still hard on hard boards.
- **9 pace kinds**: perfect run keep share LIVE vs branch at time-share .3 (ease 0/2/5): e.g. kim .88/.88/.88 → .97/1/1; xa .76/.78/.80 → .96/1/1; tc .82/.84/.89 → 1/1/1. Slow run (u .8) still cut on every kind (branch .50–.79).

## LAW 5 (harder as she climbs) — holds
- huong, same hand model (5 rounds, n=4000), mean grade ease 0→5: LIVE 2.50 3.38 4.02 4.64 5.17 5.55 · branch 6.60 7.28 7.75 8.03 8.30 8.47 (monotone).
- banh .44 < .72 < .93 < .98 < 1; mua speed/beat/retry unchanged; pace windows shrink as the board hardens in all 9 (test E).
- Bots (dev/measure/mg-bots.js, graded with kG; skilled = default; sloppy = MGBOT_SLIP .25 + MGBOT_THINK 1500). Mean · share of plays = 10:

Ease 0 / ease 4 (n=6):
| kind | skilled LIVE e0 / e4 | skilled branch e0 / e4 | sloppy LIVE e0 / e4 | sloppy branch e0 / e4 |
| co | 5.5·0% / 9.2·83% | 6.2·0% / 10.0·100% | 4.7·0% / 8.3·66% | 5.8·0% / 8.3·66% |
| tho | 6.2·0% / 9.5·83% | 7.0·0% / 9.5·83% | 5.7·0% / 8.2·0% | 6.0·0% / 9.7·66% |
| doi | 7.0·0% / 10.0·100% | 8.5·0% / 10.0·100% | 5.5·0% / 9.5·50% | 6.7·0% / 10.0·100% |
| doden | 6.3·0% / 9.2·50% | 7.2·0% / 9.7·66% | 6.0·0% / 9.3·33% | 6.8·0% / 9.8·83% |
| kim | 7.2·0% / 9.0·0% | 8.8·0% / 10.0·100% | 2.8·0% / 7.7·0% | 4.2·0% / 9.3·33% |
| le | 7.0·0% / 10.0·100% | 7.5·0% / 10.0·100% | 4.8·0% / 9.0·16% | 5.2·0% / 9.7·66% |
| tc | 7.0·0% / 9.0·0% | 8.7·0% / 10.0·100% | 5.0·0% / 8.0·0% | 5.8·0% / 9.8·83% |
| xa | 5.7·0% / 9.0·0% | 7.2·0% / 9.8·83% | 6.3·0% / 9.5·50% | 6.7·0% / 9.8·83% |
| thq | 5.8·0% / 10.0·100% | 8.7·0% / 10.0·100% | 5.5·0% / 9.3·50% | 5.5·0% / 10.0·100% |

Ease 2 = middle board (n=8):
| kind (e2, n=8) | skilled LIVE | skilled branch | sloppy LIVE | sloppy branch |
| co | 8.6·62% | 9.1·75% | 8.5·62% | 9.4·87% |
| tho | 8.0·0% | 8.1·0% | 7.0·0% | 7.9·0% |
| doi | 8.8·0% | 9.8·75% | 7.1·0% | 8.9·25% |
| doden | 7.5·0% | 9.2·50% | 8.0·0% | 8.6·25% |
| kim | 8.4·0% | 10.0·100% | 6.4·0% | 7.8·0% |
| le | 8.4·0% | 9.8·75% | 7.0·0% | 8.1·0% |
| tc | 8.2·0% | 10.0·100% | 7.1·0% | 9.1·50% |
| xa | 7.5·0% | 9.1·25% | 7.8·0% | 9.9·87% |
| thq | 8.0·0% | 10.0·100% | 7.6·0% | 9.0·37% |

Read: hardest board (e0) — nobody reaches 10, before or after; every e0 < e4. Skilled: LIVE could not reach 10 at e2 in 8 of 9 kinds (only co); branch reaches 10 in 8 of 9 at e2 and 9 of 9 at e4 (tho at e2 is limited by trace accuracy, not time — same 0 % before/after). Sloppy: mean below skilled in 7 of 9 at e2; xa and co are the exceptions on BOTH builds (xa sloppy 7.8 > skilled 7.5 on LIVE too) — the bot's think time does not press those boards' clocks, a bot-model limit, not the pace fix. Easy board e4 is generous by design (law 5).

## LAW 2/3: no choice, cost or reward touched. LAW 7/kit: no layout or kit part changed (engine draw only; kg82FxPop is the kit pop); removed the in-play word list (còn xa/khớp…) of huong → fewer words in play (OD 05:10Z).

## Tests on 62e3c9f1 (final)
cal-p2b PASS Fold 755×1000 + iPad 1180×820 · ag-mgcal 0 FAIL · mgcal-apply PASS (8 ok) · mg-visual ALL OK · mg-skip PASS · mg-back PASS (12/12 alone; under 7 parallel runs it flaked 1–3 items, LIVE alone also PASS) · mg-score-same-scan 35 cells via the ONE grade, 0 raw · quickcheck PASS (core gates incl. one-core-guard, old save loads + plays a buổi, perf new/live render 215/272, tab 475/461, buổi 1072/1474 ms). Known baseline: cal-dauho test 1 (also on main), not rerun.
Shots: scratch only (/home/user/wt/rv-calp2b-out/shots, not uploaded; nothing to wipe on CDN).

## For MAIN
- LAND READY 62e3c9f1 (FF from fd682a8d).
- After land: tell her the three fixed games (Điều hương, Múa, Nấu ăn) are ready for re-test in Thử tay; their old first tries were dropped so the re-test is the counted first try.
- Decision for MAIN (not done): whether the 9 pace kinds' first-try b should also be dropped for a re-test (my recommendation: keep; rolling b of cal-p2c covers it).

## Re-merge for ROOT-77 (20/11 ~10:40Z): LIVE 90b7e797 (mg-noword-kit, tooling tests, kit-ge)
review/cal-p2b-rv **f43efc716542074abc25e98e18d7b19f22bc3c69** = 62e3c9f1 + merge 90b7e797 (index.html/sw.js rebuilt; LIVE's j82/j91/jbal2 edits are the kit no-text pass, no overlap with the reviewed board code; darkCap/reach/blend/FAN-COOL intact). FF-OK on origin/main 90b7e797.
Tests run one at a time: cal-p2b Fold + iPad PASS · ag-mgcal 0 FAIL · mgcal-apply PASS · mg-visual ALL OK · mg-back 12/12 · score-same-scan 35/0 raw · quickcheck PASS (old save ok; perf render 230/248, tab 535/527, buổi 1347/1200 ms).
mg-skip FAILs 1 («makeup quick button (kit .kquick, odds word)»: the button shows «●») — SAME FAIL on LIVE 90b7e797 itself (assembled and run): pre-existing from mg-noword-kit's in-play sign pass turning the quick button's odds word into a sign. Not this branch. **For MAIN**: the odds word on that quick button is a VANPHONG odds-ladder display; route to the mg-noword-kit owner.
