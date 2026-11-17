# ONE CORE — every rule number from one rulebook (review/one-core)

Owner rule OD:L1267 (16/11 07:25Z, s11, verbatim in dev/rules/START_CORE.md): every number in the game comes from ONE shared rulebook
(BAL); text prints the constant, never a typed number. Reaffirms OD:L257–258 (rules-one-source). Started from the older work
(LUẬT ƯU TIÊN SỐ 1): `dev/test/rules-one-source.js` + `dev/test/ACT_AUDIT.md` §1 (Hoàng hậu bars 50/55, Đức 50/40, BL glossary) — kept and extended.

## 1. What changed

New block in `dev/build/jbal.js` (after the main `const BAL`), one name per concept, each commented:
`BAL.time {khac, sucMin}`, `BAL.lot {bac, k}`, `BAL.walk {near, far}`, `BAL.sneak {danh, heavy, seen}`, `BAL.srvAge {ask, out, mama}`,
`BAL.age {sacFrom, sacLoss, sacMin, betroth, wed, matchShow, matchMax, reign}`, `BAL.seat`, `BAL.night {sung, an}`.
Names are separate from Foreman B's minigame tiers (`BAL.mg.*` untouched).

### Before / after (concept by concept)

| Concept | Before (main) | After |
|---|---|---|
| khắc per buổi | `4` typed in ~35 code checks (`used>=4`, `used+c<=4`, `4-used`, `used=4`, j76 spill) + 9 texts (j2, j19 HX, j42, j76, j79 glossary, jtut ×2) | `BAL.time.khac` everywhere; HX/glossary lines are getters that read it when shown |
| Sức floor for a 2+ khắc act | live rule 5 (j76 `SUC_FLOOR`), but j1 `can()` / j15 `whyTime` said 20 and 7 texts said "Sức dưới 20" / "Sức ≥20" (j15, j19, j55 ×2, j63, j72, j76) | one value `BAL.time.sucMin` = **5**; every text prints it; jclose / j79 / j76 read it |
| Re-draw the weekly lot | `S.bac<10`, `{bac:-10}`, `spend(1)` in j13/j19 + "10 bạc và 1 khắc" in j19, j79, jtut | `BAL.lot.bac` / `BAL.lot.k` |
| Walking khắc | j9 `travel` far = 3 when wet, 2 dry; jclose re-defined `travel` with 2 always; texts "gần 1 khắc, xa 2" ×4 | `BAL.walk.near/far`; both `travel`s read it; texts print `walkFarK()` |
| Sneaking in | `danh:-8`, `-15` (Emperor's halls), `-2` (seen at Trường Môn viện) typed in j41/j77 code and 8 texts; help text did not mention the −15 | `BAL.sneak.danh/heavy/seen`; help text now also shows the −15 heavy case |
| Servant start ages | `25` / `30` / `45` typed in j42 code and texts | `BAL.srvAge.ask/out/mama` |
| Sắc fades with age | `S.age>25`, `-2`, floor `10` typed twice (j3 her month, j42 servant month) | `BAL.age.sacFrom/sacLoss/sacMin` |
| Marriage ages | `16` (may be promised), `18` (wedding), `14` (shown in match lists), `21` (oldest prince offered) typed in j54, jht, j55, j7 code + 14 texts | `BAL.age.betroth/wed/matchShow/matchMax` |
| Regency ends | `16` typed in j99succ (3 checks + 2 texts) | `BAL.age.reign` |
| Night with the Emperor | `3+…`, `2+…` typed in j8 (her) and j75 (NPC) + 3 texts ("ít nhất Sủng +3, Ân tình +2", "đêm vui +5/+5 · đêm nhạt +3/+2", "+3..8 · +2..7") | `nightG(s)` / `nightA(s)` (j8) from `BAL.night`, used by her, NPCs and every text |
| Stipend table | `BL=[30,…,320]` typed in j20 but the stipend paid is `BAL.pay` 40…280 (jecon overwrote BL at load); `S.out?5` typed in j15; `WAGE=3` typed in j20 beside `BAL.wage` | `BL` is an empty mirror filled from `BAL.pay`; `BAL.payCold`, `BAL.wage` read directly |
| Glossary "Bổng lộc" | built at load from the old BL → showed **30–320 bạc** while 40–280 is paid | getter: reads `BAL.pay` → 40–280 |
| Seats per rank | `SEATCAP={7:1,…}` typed in j30 | mirror filled from `BAL.seat` |
| Work gift value / sale | `WVAL=[2,3,5,7]` beside `BAL.craftGift`; unused `WSELL=[6,10,16,24]` beside the live `BAL.craftSell=[8,14,24,40]` | `WVAL` mirror from `BAL.craftGift`; WSELL removed |
| Item prices | 16 items typed with an IT price in j8 that `BAL.priceTier` (jecon) overwrote at load (e.g. Trâm phượng 200 → 360, Gấm vàng 160 → 300) | IT literals equal `BAL.priceTier`; the guard fails if they differ again |
| Outsider queen | `BAL.outQ` 85 in jbal and 60 in jbal2 | one value 60 in jbal |
| Scheme / favour knobs | `J70CFG.mot/prep` 1.5/0 in j70 and 3/10 in jbal2; `FAIRN.sat/satO` 0/0 in j75 and .2/8 in jbal2 | one value each (3/10, .2/8) where the table is defined |

Inline rule numbers counted by the guard: **7058 on main → 6945** (113 moved here); the rest are frozen (section 3).

## 2. Contradictions found and the value chosen

| # | Concept | Values found | Chosen | Why |
|---|---|---|---|---|
| 1 | Sức needed for a 2+ khắc act | 20 (j1 `can`, j15 `whyTime`, 7 texts) vs 5 (j76 live rule) | **5** | the live rule since the j80/j76 Sức hotfix ("players got stuck"), the value the balance runs used; the "Sức dưới 20" texts were wrong to the player |
| 2 | Bổng lộc range in the glossary | 30–320 (j20 table, read at load) vs 40–280 (`BAL.pay`, paid) | **40–280** | `BAL.pay` is what is paid (economy v12, owner 15/11 05:20Z direction) |
| 3 | Far walk on a wet day | 3 (j9) vs 2 (jclose) | **2** | owner 15/11 06:40Z OD:L351: weather never adds walking khắc |
| 4 | Outsider queen chance | 85 (jbal) vs 60 (jbal2) | **60** | measured v12 value (PROGRESS_balance v12) |
| 5 | Scheme motive / prepared blow | 1.5 / 0 (j70) vs 3 / 10 (jbal2) | **3 / 10** | measured balance pass 11/14 (BALANCE_REPORT) |
| 6 | Emperor's satiety | 0 / 0 (j75) vs .2 / 8 (jbal2) | **.2 / 8** | measured balance pass 11/14 |
| 7 | 16 item prices | IT literal vs `BAL.priceTier` (e.g. 200 vs 360) | **BAL.priceTier** | tiered prices of economy v12; it was already what the shop charged |
| 8 | Work sale price table | WSELL 6/10/16/24 (j83, unused) vs `BAL.craftSell` 8/14/24/40 | **BAL.craftSell** | the live jecon rule |
| 9 | Sneak help text | "bị bắt Danh -8" vs the rule −15 in the Emperor's halls | text now shows both | the rule was right, the text incomplete |

Nothing else was re-tuned: every value chosen is the one the game already ran with, so balance outcomes are unchanged.

## 3. The guard (fails on any new inline rule number)

- `dev/test/one-core-guard.js` (node only, ~1 s): lexes every assembled module (code / strings / templates / comments apart) and FAILS on
  1. a BAL key set twice, or a numeric key of any other knob table set twice (const X={…} + Object.assign(X,{…}));
  2. a mirror table (BL, SEATCAP, WVAL) typed with numbers; an IT price different from `BAL.priceTier`;
  3. a player text that types a core number instead of printing it (khắc per buổi, lot, walk, Sức floor, servant ages, marriage /
     regency ages, sneak, night, stipend range) — a typed copy of the constant's value fails at once;
  4. any NEW inline rule number vs the frozen list `dev/test/one-core-baseline.json` (stat bars `S.bac<20`, gains/costs `{danh:-8}`,
     khắc `can(2)`, odds `roll(35)`, typed "Danh -8" / "20 bạc" / "cần 40" in texts). The list only shrinks: `--update` refuses to grow
     it unless the coordinator passes `--allow-grow`. Layout / pixel / timing numbers are never counted (patterns look only at rule stats).
- Proof: on origin/main the guard reports 139 failures (44 typed core texts, outQ, J70CFG, FAIRN, BL/SEATCAP/WVAL, 16 item prices, and the
  inline numbers this branch moved, seen as "new" against the frozen list); a planted
  `if(S.bac<77)apply({danh:-3})` + "Mỗi buổi có 4 khắc" + a second `BAL.hz` fails 5 ways; this branch: PASS.
- `dev/test/rules-one-source.js` §2b (browser): mirrors equal BAL, then every moved constant is set to an odd value and the texts and
  rules are read again (glossary, HX, night card, sneak penalty, walk, `can`, Sức floor) — they must show the new value. It found two
  more typed copies during the work (jclose's own `travel` and its Sức floor), both fixed.
- Frozen debt (6945): gains/costs 4565, typed numbers in texts 876 + 281 + 48, stat bars 544, odds bases 438, khắc 193; most in j67
  (story roads, 1533), j8, j72, j71, j42. These are act/story prices each typed next to their own effect; they need a per-act price table
  (next step, file by file), but none can grow now.

## 4. Tests

- one-core-guard: PASS. rules-one-source (with §2b): 755x1000@2 and 1180x820@2 — 200 random states text = rule, core perturbation 0 bad,
  old save from the published build loads (turn/rank kept), 0 page errors, no horizontal overflow.
- Bot balance (sensible bot, `inpage6.js` + `inx.js` + `inpz.js`, HHSTOP, 9-origin rotation, 4 shards × 5 lives; `.oc/run4.sh` = run5b.sh with 4 shards):
  see the table below.

| run (n=20 each) | Hoàng hậu | early death | survived w/o HH | childbirth death / labour |
|---|---|---|---|---|
| before (origin/main build) | 5% (1) | 40% (8) | 55% | 12.5% |
| after (this branch) | 5% (1) | 35% (7) | 60% | 16.7% |

Same within noise (at n=20 one life = 5 points, 95% band about ±20 points). Every value chosen above is the one the game already ran
with, so no outcome moved. NOTE for the coordinator: main itself is far below the targets (HH ~32%, early death ~40–45%) — HH 5% on
both builds; that predates this branch and is a balance task of its own.

## 5. Notes for the coordinator / mg-balance

- My BAL names: time, lot, walk, sneak, srvAge, age, seat, night (+ the fixed outQ). Foreman B's `BAL.mg.*` is not touched; if mg-balance
  adds a typed tier somewhere, the guard's frozen list will flag it: they move it into `BAL.mg` or the coordinator runs `--update --allow-grow`.
- Merging any branch: run `node dev/test/one-core-guard.js`; a FAIL names the file, the snippet and the BAL constant to print.
