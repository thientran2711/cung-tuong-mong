# bal-ranks-law4 — LAW-4 RANK NUMBERS → BAL (worker session_01964izCPcnpYnj3r7ebYY9R, Foreman D depth 3)

PRIORITY #1 CHECK ('RANKS|promoGap|kiepMin|kyngo.max|rkW|rkT|kiepCap'): OD 0 | ledger 0 | claims 8 (this job) | main: RANKS j1.js:6 typed, promoGap j8.js:401 typed, BAL.promo built by jpromo.js (cap/extra/srv…), dev/test/law4-typed.js (the law-4 typed scanner, reused + extended) | review/*: review/robot10-reco-rv 0ced27c5 (PASS, not on main yet: robot10-reco.js TARGET kiepMin 120 / kyMax 6 typed) | no second rank table made (BAL.promo extended).
START_CTX ≈ 3 % (1M window); finished ≈ 15 %.

Branch: review/bal-ranks-law4 @ 670991d9 · base origin/main 2a80712b + merge review/robot10-reco-rv 0ced27c5 (PASS branch; needed so robot10-reco reads BAL — land rv first or together).

## What changed (values UNCHANGED)
1. RANKS s/d → **BAL.promo.s / BAL.promo.d** (jbal.js:9). j1.js keeps only the names; j1 loads before jbal, so jbal.js installs getters RANKS[i].s/.d → BAL.promo (live: a tune of BAL.promo.s moves every check and text). jpromo.js now `Object.assign(BAL.promo,{cap…})` (merges, no longer replaces).
2. promoGap formula `r<3?3:3+(r-2)*2` → **BAL.promo.gap [3,3,3,5,7,9,11,13]** (j8.js promoGap reads it).
3. LAW 11 — every other typed rank number moved: **BAL.rkW** (25 per-rank weights `rank*N`, incl. rank-gated costs: feast [40,8], start stats, rival Sủng, kc entry) and **BAL.rkT** (10 per-rank tables replacing typed rank ternaries + jpet petMax), read by `balRk(key,rank)`. Text: j42 «Ban gả» prints BAL.danhG.srvWed (was «Danh 20» typed twice); kit sample page (jkitpage §46/§51) prints RANKS[i].s/.d.
4. PROVISIONAL **BAL.kiepCap {realMin:120, kyngo:6}** (jbal.js:18, comment PROVISIONAL — MAIN/sếp to set). dev/measure/robot10-reco.js TARGET.kiepMin/kyMax read them from bal.json (`kiepCap.realMin`, `kiepCap.kyngo`), no own constant; missing key → row says n/a. Its rank rows now cite BAL.promo.s/d/gap (the «law 4 flag» row is gone). robot10-agg had no own constant.

## LAW 11 scan — dev/tools/rank-num-scan.js (also run inside dev/test/law4-typed.js)
Families: A RANKS typed · B promoGap formula · C rank*N weight · D rank ternary yielding a number · E typed per-rank array · F threshold typed in text. jbal*.js = the rulebook, not scanned.
`node dev/tools/rank-num-scan.js --table origin/main`: **before 46 typed · after 0 typed**. law4-typed: 0 typed.
Not counted (listed with why): 204 rank-INDEX gates (`rank>=5` = «Quý phi and above» names a rank, not an amount — see note), CSS tier class j25/jsl rp0..3, KBM_SAMPLE «Danh hiệu 1/8» (kit sample data).

| fam | before (origin/main) | after (work tree) |
|---|---|---|
| A | j1.js:6 `RANKS s/d typed` | BAL |
| C | j1.js:229 `rank*9` | BAL |
| C | j10.js:144 `rkOf(p)*10` | BAL |
| C | j41.js:26 `(rkOf(a)-4)*8` | BAL |
| D | j42.js:16 `S.rank>=1?2:1` | BAL |
| C | j42.js:325 `S.srv.rk*3` | BAL |
| C | j42.js:325 `S.srv.rk*3` | BAL |
| F | j42.js:484 `Danh ${S.danh}/20` | BAL |
| F | j42.js:484 `Danh 20`` | BAL |
| C | j54.js:44 `rkOf(p)*5` | BAL |
| C | j55.js:50 `rkOf(a)*3` | BAL |
| C | j68e.js:47 `S.rank*8` | BAL |
| C | j68e.js:52 `S.rank*9` | BAL |
| D | j68e.js:60 `C.rank<=3?2:.4` | BAL |
| C | j68e.js:63 `S.rank*8` | BAL |
| D | j68e.js:117 `S.rank>=2?1.4:0` | BAL |
| C | j68f.js:54 `S.rank*7` | BAL |
| C | j68f.js:75 `S.rank*8` | BAL |
| D | j68h.js:38 `C.rank<=2?2:0` | BAL |
| D | j7.js:133 `S.rank>=3?6:2` | BAL |
| C | j71.js:127 `S.rank*8` | BAL |
| C | j71.js:155 `rkOf(hv)*8` | BAL |
| C | j71.js:188 `S.rank*4` | BAL |
| C | j71.js:190 `S.rank*5` | BAL |
| D | j71.js:269 `S.rank>=3?1:0` | BAL |
| C | j71.js:273 `S.rank*3` | BAL |
| C | j8.js:25 `rank*8` | BAL |
| C | j8.js:25 `rank*20` | BAL |
| D | j8.js:61 `rkOf(p)>=7?5:0` | BAL |
| D | j8.js:75 `rkOf(t)>=7?30:0` | BAL |
| C | j8.js:153 `rkOf(a)*4` | BAL |
| C | j8.js:154 `rkOf(a)*4` | BAL |
| B | j8.js:401 `function promoGap(r){return r<3?3:3+(r-2)*2}` | BAL |
| D | j8.js:413 `rkOf(p)>=6?10:0` | BAL |
| C | jagacts3.js:198 `rkOf(v)*3` | BAL |
| C | jht.js:69 `rkOf(p)*5` | BAL |
| D | jht.js:69 `S.rank>=7?15:0` | BAL |
| D | jkc.js:578 `rank>=2?10:5` | BAL |
| C | jkc2.js:427 `rank*5` | BAL |
| F | jkitpage.js:29 `Sủng 8 (cần 38` | BAL |
| F | jkitpage.js:29 `Danh 33 (cần 30` | BAL |
| F | jkitpage.js:37 `Sủng 8 (cần 15` | BAL |
| C | jlost.js:153 `rkOf(p)*3` | BAL |
| E | jpet.js:53 `[1,1,2,2,3,3,4,4][Math.max(0,Math.min(7,rkOf(p)` | BAL |
| C | jroute.js:206 `a.rank*10` | BAL |
| C | jroute.js:206 `b.rank*10` | BAL |

before 46 typed · after 0 typed · rank-index gates (not counted, names of ranks) 204

## 0-diff proof — dev/test/bal-ranks-law4.js (old = origin/main index.html, new = this build, same synthetic people) → PASS 11/11
RANKS [n,s,d] old = new (0/15/25/38/52/66/78/85 · 0/10/20/30/42/55/68/78) · promoGap(0..7) old = new [3,3,3,5,7,9,11,13] · petMax old = new · seatW old = new · promoReq text ranks 0..6 old = new (identical strings) · every BAL.rkT = its old ternary for rank 0..7 · every BAL.rkW = the literal it replaced · no untested rank key · kiepCap 120/6 · Ban gả 20 · BAL.promo keeps jpromo keys + s/d/gap · 0 page errors.

## Tests
- quickcheck: core gates PASS (one-core-guard · rules-one-source · kit-conform · coop-one-world · hooks 7), time-spill PASS, open 0 errors, **old save from LIVE loads + plays a buổi**; perf run 1 buổi 2798 vs live 1286 (limit 2786, 1 run noisy) → re-run median of 5: **QUICKCHECK PASS** render 230/236 · tab 446/460 · buổi 1221/1457 ms.
- promo-next-rank: all ranks + lãnh cung ok, errors none.
- promo-rules 16/17 · promo-exam 17/18 · promo-skip 2 FAIL · promote-servants 19/20 — **every FAIL reproduces identically on live main** (pre-existing, not this change): NPC servant exam {"pass":60,"fail":0}; promo-exam old-save card (live-vs-live same FAIL); promo-skip «passed grace exam waits for a free seat», «strike-back hits once»; promote-servants «NPC favour road when purse short». Reported, not fixed (out of scope).
- coop-e2e 141/141; COOP_GE=1 151/151 (rank-keyed co-op odds, two-way, after merged weeks).
- robot10-reco bal on the new page: bal.json has kiepCap {120,6}, promo.s, ranks; TARGET reads 120 / 6.

## Note for Foreman D / MAIN (not done here, decide)
- 204 rank-index gates (`rank>=5`, `rkOf(p)<6`, `>=7` …) stay typed: they name WHICH rank (structural), not an amount; PAL_HEAD=3 is the only named one. If the law-4 reading must cover them too, it is a separate job: named rank indices (e.g. RK.tan/phi/qp/hqp/hh) + a scan; risky (204 sites), so not mixed into this 0-diff move.
- The odds formulas touched here still hold other typed non-rank terms (e.g. `S.danh/4`, base 40 in oAccuse/takeaway) — the wider odds-coefficient family of law 4, not rank numbers.

SẴN SÀNG KIỂM review/bal-ranks-law4 670991d9134ddba51fb656b28da2fa26f8e9a36f
