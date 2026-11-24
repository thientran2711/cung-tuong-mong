# robot10-reco — ROBOT-10 OWNER ORDER #6 «RECOMMENDATIONS» (Foreman D worker session_01964izFTiBZHsJmmbS86AQG)

PRIORITY #1 CHECK ('RECOMMENDATIONS|BAL.orig|robot10-agg'): OD 6 (23/11 ~22:40Z order #6 row, ~23:25Z «kiếp must not drag», OD:L19/L43 targets) | ledger 0 | claims 8 | main: BAL.orig.ow/br in jbal.js, no recommendations table | review/* review/robot10-harness 521331fc (base; agg hooks per origin×road HH, death by cause, rankAt reused) | claims D robot10 part 2 DhuQGJqV (split agreed).

Branch: review/robot10-reco · base review/robot10-harness 521331fc + merge LIVE main 3e8981e1 · test-only: dev/measure/robot10-reco.js (new helper) + dev/measure/robot10-agg.js (+16 lines: bal.json pickup + the last section). No game file, no BAL change.

## What it does
- Every rates-<date>.md now ENDS with «RECOMMENDATIONS»: area · finding (off vs target) · BAL key(s) file:line · current (from the game page) · proposed · expected effect.
- BAL is READ FROM THE GAME PAGE (law 4): `node dev/measure/robot10-reco.js bal [GAME] [out.json]` → bal.json (BAL + RANKS + ORIGINS + ORIGIN_BR + ARC67 roads + promoGap). robot10-agg.js takes a bal.json found next to the run JSON, else runs the helper on GAME (env; default this checkout's index.html served over http). file:line = scan of dev/build/jbal*.js (`node dev/measure/robot10-reco.js loc <key.path>`), strongest assignment first.
- Coverage of order #6: (1) BAL.orig.ow per origin (card) vs its HH reach: above 20–40 % → weight × target/observed (easier = rarer), below → weight alone cannot fix it, point to the origin's own numbers; expected overall HH with today's vs proposed weights (renormalised); every ORIGIN_BR branch checked against BAL.orig.br (missing = flag; pf IS in BAL.orig.br.nc on LIVE now: nc 1 · bd 1 · pf 1); branch rows; road spread within an origin (law 2). (2) early death (before BAL.mort.oldAge) vs 40–45 %, per-cause rows with mapped keys (lifespan dice / illAge / sudden / birth.hardDie / acc.me / tired / fate.tuanP / accused / frame), one-cause-dominates row, lifespan floor (no «Tuổi trời đã tận» before mean − sd), childbirth death per birth vs 8–12 %. (3) reach speed per top rank (Phi → HH): game years + pace-model real minutes + step pass rate; the bottleneck step with proposed Sủng/Danh thresholds; kiếp length vs a PROVISIONAL cap 120 min (no OD number — MAIN to set). (4) one ending > 50 % of endings; rare ending per road vs BAL.arc.rare.<road>.p; kỳ ngộ none/too many (BAL.kyngo); event repeats in a kiếp vs ≤ 25 % (BAL.eff.j68q.cd).
- Proposed values = first-order (current × target ÷ observed, clamp ×0.5–×2); rows under 20 lives marked «low n». Targets live in one place (TARGET in robot10-reco.js) with their OD source.
- Law 4 flags surfaced by the table: rank thresholds RANKS s/d (j1.js:6) and promoGap (j8.js:401) are typed in code, not in BAL → «move to BAL first» before tuning (3).
- Also handled (Foreman D 00:27Z, part-2 gaps): merged review/robot10-harness 875ad4ca (agg reads any catalog*.json; conflict in the walk line resolved keeping both); rows «(3) pace model» (reading share of modelled minutes; PACE uncalibrated → judge speed by game years) and «(2) cause not catalogued» (any death text the code scan missed, e.g. «giả mang thai … khi quân», listed with its who-group).

## First full round (LIVE https://thientran2711.github.io/cung-tuong-mong/index.html, nc spread 10 bots × 1 kiếp, PAR 2, RECYCLE on)
Outputs: dev/handover/robot/round-nc-20261124/ — rates-20261124-0058.md (12 tables + RECOMMENDATIONS last) + .csv + -avg.csv, bug files part2*-nc-*.md, results JSON, bal.json (BAL read from LIVE), catalog.json. Repro saves (58 MB) are NOT committed (regenerable; size).
Run note: the container restarted after 5 lives (results JSON of lives 1–5 kept; that run's bug .md was never written, its bugs are in the JSON); the other 5 bots ran on their spread roads as 4 runner calls (lover+speed nc_su, scholar nc_tuc, rebel nc_vuong, lazy nc_gian). Wall ≈ 1 h 45 min total.
| bot · road | ending [type] | max rank | years | age | bugs |
|---|---|---|---|---|---|
| random · nc_su | Xuất gia [leave] | 3 Tần | 0.83 | 18 | 10 |
| skilled · nc_gian | Thái phi [death] | 4 Phi | 6.58 | 24 | 23 |
| greedy · nc_tuc | wall cap 1800 s (alive) | 7 Hoàng hậu | — | 34 | 23 |
| schemer · nc_gian | Hồng nhan bạc mệnh [death] | 2 Quý nhân | 2.25 | 20 | 8 |
| cautious · nc_vuong | Hồng nhan bạc mệnh [death] | 6 HQP | 13.17 | 33 | 21 |
| lover · nc_su | wall cap (alive) | 7 Hoàng hậu | — | 27 | 21 |
| speed · nc_su | inpage6 TIMEOUT | 2 | — | 20 | 4 |
| scholar · nc_tuc | wall cap (alive) | 5 Quý phi | — | 33 | 19 |
| rebel · nc_vuong | Hồng nhan bạc mệnh [death] | 6 HQP | 3.67 | 23 | 11 |
| lazy · nc_gian | Hồng nhan bạc mệnh [death] | 4 Phi | 11.08 | 31 | 19 |

## RECOMMENDATIONS of this round (all «low n», 10 lives of one origin — indicative; report only)
- (1) nc HH reach 20 % (2/10) = in target → BAL.orig.ow.nc 6 keep; road spread nc_tuc 50 % vs nc_gian 0 % (law 2 flag, n 2–3). pf IS in BAL.orig.br.nc on LIVE (nc 1 · bd 1 · pf 1) → the old «pf missing» flag is closed. Other 8 origins: no lives yet (other accounts' runners).
- (2) early death 50 % vs 40–45 % → BAL.mort.fate.tuanP (jbal2.js:181) 25 → 21; execution-type deaths 3/5 («ban chết vì vu … trù ẻo», «Tân Thái hậu … xét lại chuyện cũ»); childbirth 1 of 7 pregnancies = 14 % vs 8–12 % → BAL.mort.birth.hardDie (jbal2.js:179) 45 → 31; one death «other» at j3.js:156 has no BAL key (law 4 gap).
- (3) Phi 3 y · Quý phi 4.8 y · HQP 6 y · HH 9 game years; HQP→HH passes 50 %. Rank thresholds RANKS s/d (j1.js:6) and promoGap (j8.js:401) are typed in code → move to BAL first. Pace model: reading = 82 % of the modelled minutes, mean kiếp ≈ 1769 modelled min — not trustworthy until READ_CPS is calibrated; kiếp-length cap 120 min is PROVISIONAL (no OD number).
- (4) «Hồng nhan bạc mệnh» = 4 of 6 endings (too common → the (2) death values); kỳ ngộ 10.7 per kiếp vs PROVISIONAL ≤ 6 → BAL.kyngo.p0 (jbalky.js:10) 85 → 68; cards repeated in one kiếp 48 % vs ≤ 25 % → BAL.eff.j68q.cd (jbaleff.js:42) 10 → 19; rare endings: 0 in 2–3 lives per road, not judgeable (need ≥ 20–30 lives per road).

## Findings / gaps (report only)
- HARNESS BUG (part-2 counter, robot10-in.js:130): M.sons/M.daus re-count a kid with no id after every save round-trip (greedy: 340 «sons» from 1 pregnancy) → FAMILY table sons/daughters wrong; RECOMMENDATIONS uses pregnancies as births. Fix belongs to robot10-in.js (not touched here: merge-clean with LAG/ANIM).
- Who-group mapping of a death → BAL key is by cause family (CK in robot10-reco.js); «NPC / scheme», «other», «suicide» have no BAL key → listed with their code sites.
- Targets with no OD number (kiếp minutes cap, kỳ ngộ per kiếp) are PROVISIONAL in TARGET (one place) — MAIN/sếp to set.
- 4/10 lives hit the 1800 s wall cap alive (greedy, lover, scholar) or TIMEOUT (speed): HH/death rates from 6 ended lives; raise CAP for balance rounds.

SẴN SÀNG KIỂM review/robot10-reco 0f00f9dcd4f6e0316111035c3e8e439cba4a17a9
