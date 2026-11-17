PRIORITY #1 CHECK ('balance-2|ctxTaste|outQ|Thái hậu no-son'): OD 0 | ledger 0 | claims 8 (balance-2 rows, D) | main 15 | review/* 3 (review/balance-2, review/balance-core-r2*, review/mg-balance-2*)

# Review r1 — review/balance-2 @ de993ca846040a6666e201ce898d46da041338de

Reviewer session: claude.ai/code/session_01964izCu8Je1GMvrc1moQH6 (opened by Foreman D #10; reports to Foreman D #11 = session_01964izFTp8oV5DHeadkPMRn after the 18:57Z handover).
Verdict branch: **review/balance-2-r1 @ 371e3a22b4ffbc58b73febeb2edeb4064c9a52b0** (pushed).
START_CTX ≈ 5 %. No rollover was needed.

**Verdict: FAIL 2 @371e3a22b4ffbc58b73febeb2edeb4064c9a52b0.** The list is at the end.

## 1. Merge state (CHECK 1)

The work merged newest main three times as main moved: e8b1906 → 57ae5b8c, b5d109fe → d4109937, and c114ab9e → b4c94e46 + 371e3a22 (site rebuilt). Each merge was resolved token by token (3-way at token level; real overlaps fixed by hand):

| what | resolution |
|---|---|
| odds word ladder | Main's `BAL.odds.cut` + `oddsLv` (j1 `word()`, j79 KIT_ODDS) are kept. The branch's duplicate `BAL.lad` + `ladIdx` are dropped (one core). `rungDown` reads `BAL.odds.cut`. The balance-core test reads `oddsLv` (fde22752). |
| arc odds moved to jbalarc by main | jroad `rdOdds` `["a",art,k]` → `artO(S,art)`, so balance-core's art curve (BAL.art.odds) still drives the arcs that main moved out of j67 / jorigins / jstory. |
| jrd_cn lose ending | Main's G kept with the branch's Sủng clamp. |
| BAL.orig (c114ab9e, origin-bd branch) | Main's roulette weights ow / ow2 / br are kept. Bắc Địch start stats stay in `BAL.start.bd` (balance-core: one start table). `ORIGIN_BR.bd` carries no o / th. |
| assemble.py | Main's list + jbalcore.js. |
| generated files | Main's version, then the site was rebuilt. |

Main moved again to 99f3978d after 371e3a22. With a FAIL there is no PASS sha to keep FF. The r2 worker merges the then-newest main.

## 2. Gates on 371e3a22 / b4c94e46 (CHECK 4)

| gate | result |
|---|---|
| one-core-guard | PASS, fails 0 (inline 3786 < baseline 3843) |
| one-core-text-rule | PASS (DIFF 0, TYPED 0) |
| balance-core.js | 42 PASS / 0 FAIL, 0 page errors (after the ladIdx → oddsLv test fix) |
| quickcheck.sh b4c94e46 vs live c114ab9e | Core gates PASS, time-spill PASS, open 6.6 s, old save loads + plays a buổi. Perf (median of 3) new/live: render 48/143 ms, tab 381/467 ms, **buổi 1162/1143 ms (+1.7 %)**, tasks>200ms 17/22. The only FAIL was "NOT BUILT": I had not committed the rebuilt site. Fixed in 371e3a22; a fresh build now differs only in the CTM_BI stamp, which the check strips. |
| coop-e2e | branch 63/63, live c114ab9e 63/63: no worse |
| Fold 755x1000 + iPad 1180x820 | shots.js SHOTS OK, 20 shots. I looked at home, act tab and court tab: no overlap, feet not cut, no clipped text. The result toast over the bottom bar is the normal transient popup. Shots were kept in scratch only; nothing went to git or the CDN. |

## 3. Perf (CHECK 3)

The worker's "buổi +12 %" does not reproduce on the merged head. I measured buổi +1.7 % on b4c94e46 and −2 % on 57ae5b8c (1071/1096 ms). Both are inside the live +5 % gate. The +12 % did not reproduce in two runs, so there is no extra game work and no extra popups to justify. My guess is run-to-run noise in the popup-sleep part of the timing, but I did not prove it.

## 4. Numbers: two-way + one core (CHECK 2a)

- The HH gate values live in BAL: `hhThNoSon:70`, `hhThNoSonHieu:62` (jbal), `outQ:30`, `hhTh:60`. `RANKS` Hoàng hậu Danh 70 is the one table (j1).
- `hhNeed(p)` (jbal) feeds `promoReqP` for her and for every NPC.
- `candOK(p,7)` (j34) applies `BAL.hhTh` to all consorts. `has("hieuthao")` is the Emperor's trait, the same for everyone.
- `outQ` is a world rule (contestOpen).
- The jtabs gloss prints the same keys.
- Two-way: OK. One core: OK. ctxTaste 18 / ctxCap 30 are in jevb BAL.

## 5. Measurement (CHECK 2b)

Setup: dev/measure/runbal2.sh, sens bot, Vừa, 8-year cap, all 10 origins in rotation, 0 page errors. The arms ran in the same harness at the same time.

- **live** = main e8b1906 build.
- **branch** = merged head (two builds pooled: 57ae5b8c = 53 lives, fde22752 = 99 lives; same balance code, main b5d109fe vs e8b1906 under it).
- **de993ca** = the worker's own sha, unmerged.
- **+residence** = d4109937 merged with review/residence-seats-r1 a6e0fbc2.

Bot pages crash on memory after about 55 lives. The container also restarted twice. Every record that was written is counted.

### Table FOR MAIN / owner: HH reach, Phi and Quý phi months

| arm | lives | Hoàng hậu | ended before HH/cap | ended < 3 y | Phi reached, median month | Quý phi reached, median month | HH median month | Danh m12/24/36 |
|---|---|---|---|---|---|---|---|---|
| live (main) | 149 | 32 (21 %) | 65 (44 %) | 26 (17 %) | 114 (77 %), m27 | 89 (60 %), m39 | m64 | 78/85/84 |
| balance-2 merged | 152 | **16 (11 %)** | 60 (39 %) | 33 (22 %) | 95 (62 %), m33 | 64 (42 %), m49.5 | m70.5 | **48/36/38** |
| balance-2 + residence-seats | 80 | 12 (15 %) | 36 (45 %) | 16 (20 %) | 60 (75 %), m25.5 | 40 (50 %), m39 | m71.5 | 49/44/43 |
| de993ca (worker sha, unmerged) | 52 | 10 (19 %) | 22 (42 %) | 12 (23 %) | 42 (81 %), m18 | 33 (63 %), m42 | m63.5 | 49/52/55 |

Reading:

- **Balance-2 on today's main halves Hoàng hậu against live: 11 % vs 21 %.** It also slows Phi (62 % by m33 vs 77 % by m27) and Quý phi (42 % vs 60 %). The aim was more HH, toward ~32 %.
- The HH gate change itself works. The worker measured 15 % → 26 % on the 9391f9a merge, and de993ca shows 19 % in my harness.
- The loss comes from Danh. The branch carries balance-core, and Danh sits at about 37 from year 2 on, against about 85 on live.
- Danh blocks a promotion in 26–46 % of the months at each rank on the branch, against 6–13 % on live (anbal2 --gate).
- Biggest Danh drains (anbal2 --flow, Danh lost per life, branch vs live):
  - «Múa trong yến tiệc» failure: 166 vs 87.
  - «Đức − vì nói thật lòng»: 62 vs 18.
- The banquet dance uses balance-core's `artO(S,"vu")` (BAL.art.odds) where live has `S.arts.vu*4`. The bot keeps taking the card and fails it about twice as often.
- de993ca already has the low Danh (52 at m24). Its rank pace is still fast (Phi 81 % by m18). The merged head is slower (Phi m33).
- So newer main (staff-root caps down, world-events-2, weather, …) and the branch together cost more pace than either alone. With n = 52 on de993ca, its HH 19 % vs 11 % merged is suggestive but not conclusive. The Phi pace gap is clear.
- Early death stays in the OD:L20 band (35–45 %): live 44 %, branch 39 %, +residence 45 %, de993ca 42 %. Ended < 3 y: 17 / 22 / 20 / 23 %.
- Owner pace OD:L353 (HH ≈ 188 weeks ≈ m43): every arm is already slower (median HH month m64–72). On balance-2, residence-seats does not clearly add a slowdown (HH 15 % vs 11 %, Phi m25.5 vs m33; n = 80, within noise). The pace break against OD:L353 is the low HH reach and late Danh, which come from balance-core + balance-2, not from the seats. (Foreman's note: the residence-seats reviewer measured on main HH 56 → 35 /100, Phi +7.5 months, Quý phi +10 months. The base and metric differ from this 8-year bot table.)

### Bot-proof (the owed confirmation: skilled vs random event picks)

Setup: inevpick.js on the merged build (fde22752), sens bot, Vừa, 5-year cap.

| arm | lives | Hoàng hậu | ended before HH/cap | ended < 3 y | Phi reached, month | Quý phi reached, month | Danh m12/24/36 |
|---|---|---|---|---|---|---|---|
| hint (skilled) | 46 | 7 (15 %) | 13 (28 %) | 10 (22 %) | 33 (72 %), m21 | 24 (52 %), m33 | 66/78/72 |
| rand | 45 | 1 (2 %) | 20 (44 %) | 9 (20 %) | 22 (49 %), m24 | 8 (18 %), m31.5 | 38/34/44 |

Skill pays clearly with ctxTaste 18 / ctxCap 30: HH 15 % vs 2 %, Phi 72 % vs 49 %, Danh roughly double. This confirms the worker's 40-life claim in direction and size.

This table is final at about 45 lives per arm, not the 150 the brief asked for. Bot pages crashed and the container restarted twice. The gap (HH 15 % vs 2 %, Danh about double) is large enough to confirm direction and size. The verdict does not depend on it; the r2 run can finish the 150 lives.

## 6. Open items FOR MAIN (CHECK 5, not fixed here)

- **Khó early death (lever poisonX / birthAdd):** Khó is jdiff `illDie ×1.5, illAdd +2, poisonX ×1.2, birthAdd +3, outQ +25`. My view: reach for the world levers that hit her and NPCs alike (illDie / poisonX). Do not use a her-only cushion. Measure Khó < 3 y against the Vừa band before choosing. birthAdd changes heir timing (and so the HH gate via hhNeed), so it is the riskier lever.
- **cnv / thd HH ~7 % vs OD:L43 20–25 %:** on today's merged head, per origin out of 8-year lives: cnv 0/15, thd 1/15, and also dtq 0/17, nc 1/15. Live has cnv 5/14, thd 4/14. With Danh this low, every origin is short, not only cnv / thd. Fix the Danh wall first (FAIL 1), then re-check the per-origin spread. An origin-specific lever before that would tune against noise.

## FAIL list @371e3a22b4ffbc58b73febeb2edeb4064c9a52b0

1. **Hoàng hậu reach below live, against the aim (CHECK 2).**
   - Merged head: HH 11 % (152 lives). Live: 21 % (149). Phi 62 % at m33 vs 77 % at m27. Quý phi 42 % vs 60 %.
   - The change was meant to raise HH toward ~32 % and keep owner pace OD:L353. On today's main it lowers both.
   - Fix: re-tune on the newest main (not on the 9391f9a merge) and re-measure ≥150 lives against live. Target: HH ≥ live and toward ~32 %, early death in the OD:L20 band.
2. **Danh wall from the carried balance-core art curve (cause of 1).**
   - Danh m24 is 36 vs 85 on live.
   - The «Múa trong yến tiệc» failure costs 166 Danh per life (live 87). «nói thật lòng» costs 62 (live 18).
   - Danh blocks 26–46 % of the months at each rank.
   - Fix (BAL only, two-way): lower the Danh loss of the risky act cards and/or the odds gap of `artO` against the live `arts×k` on those cards, then re-measure. The HH gate change (Th no-son 70 / hiếu 62, outQ 30, HH Danh 70) and ctxTaste 18 / ctxCap 30 can stay. Both are measured to work.

The reviewer's own merge fixes on review/balance-2-r1 (ladIdx test, rdOdds `a` → artO, BAL.lad dropped, BAL.orig.bd) are ready to take into r2.

FAIL 2 @371e3a22b4ffbc58b73febeb2edeb4064c9a52b0
