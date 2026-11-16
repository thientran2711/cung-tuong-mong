# PROGRESS · review/balance-pass (base origin/main eb7886c10)

Brief (coordinator 15/11): measure and tune balance with bots on current main; targets (OWNER_DECISIONS 11/14 + 15/11 15:10Z): early death
~40–45 %, Hoàng hậu ~32 %, childbirth death 8–12 % per birth; hint-reading play clearly beats random; always-first loses; pace 16 khắc/week,
HH after ~188 tuần; no route to HH/Thái hậu/nữ đế broken. Also: 2 opt-render failures on main.

## Done
| what | where |
|---|---|
| Night silver through the ONE ân thưởng path: `BBAC.night` = getter on `BAL.nightBac` (was a second bestow wrapper adding silver after the tray counted its coins: stray "Bạc +20", no award record) | jecon.js |
| opt-render D: Bạc in Mất fails; Bạc in Được only as the night's real ân thưởng (S.awards, = BBAC.night) | dev/test/opt-render.js |
| jty "Ra ngoài khi mặc trung y?" (confirm), "Bị giật y phục giữa đường", "Điềm báo" (acknowledge cards) flagged `act:1` — opt-scan --fail 3 → 0 | jty.js |
| Honest deadly hint: food gift "Nhận ngay" said only "món có độc thì ta dùng phải" though Hạc đỉnh hồng kills on the spot → "độc nặng thì mất mạng", risk "liều" (same card for every food gift, no tell) | jpoison.js |
| Harness: see "Bots" | dev/measure |

## Bots (what changed in the harness, and why)
- `inty.js` — bots never dressed. Once robbed / without a robe, every walk showed "Ra ngoài khi mặc trung y?" and inpage4 retried the
  same place forever (time stood still; lives ended as TIMEOUT). Now a bot in trung y puts on a robe from her chest (player act
  `wdWearUI`, choice = NPC rule `earnFromChest`), and a place whose walk-out card showed is not retried that buổi.
- inpage4 + inpage6 `BAD`: "Đẩy con nàng xuống hồ", "Đẩy nàng xuống hồ sen", "Ngáng chân" — the caught penalty of these acts is not in
  the card's numbers, so the bots did them ~26 times a life, were caught each time, lost ~400 Đức and every promotion.
- inpage4 + inpage6: make up each morning (the jtoil "Điểm trang" card; without it "Thái hậu chê dung nhan" every week).
- inpage4: sits the promotion exam when it opens (as inpage6; it never did, so evbot lives could not rise past the exam rows).
- Speed on the loaded shared box (load 45–60 on 4 cores): `reducedMotion:'reduce'` (the game's own reduce CSS; the software GPU process
  burned as much CPU as the page), layout-only helpers stubbed (fixTitles, k3OptCols, kitOptIsLong), MutationObserver/focus off → ~4×.
- `evbot.js`: EVLIFE1 (one life per fresh page: long pages grew past memory → "Target crashed"), EVSTOP (life ends at HH or EVCAP
  months, default 96), EVOUT partial files, last 5 event picks + hint per life, inx/inpz/inty/inpromo counters.
- `inpromo.js`: tuần blocked per promotion row, Đức lost per cause, punishments per reason.
- `pass/sens1.sh`, `pass/sensloop.sh`: one sensible life per process (inpage6 + inx/inpz/inty/inpromo, HHSTOP), restarted until time is up.
- `anpass.py`: target table with 95 % Wilson intervals (`ev` for evbot files, `sens` for runb files).

## How to run
```
python3 -m http.server <free port> --bind 127.0.0.1      # worktree root, serves index.html (built site)
EVLIFE1=1 EVSTOP=1 EVOUT=<dir>/b EVPAR=3 NODE_PATH=$(npm root -g) node dev/measure/evbot.js http://127.0.0.1:<port>/index.html 5000 hint,rand,same <seed> 1
bash dev/measure/pass/sensloop.sh <abs path>/index.html <dir>/s <origin offset> <seconds>     # EXTRA='Object.assign(BAL,{...})' for knob trials
python3 dev/measure/anpass.py ev <label> <dir>/b_*.json ; python3 dev/measure/anpass.py sens <label> <dir>/s_*.json
```

## Bạc ↔ road without silver (owner rule via coordinator, 15/11 evening)
- Scan: `NODE_PATH=$(npm root -g) node dev/measure/bacroad.js <page> <out.json> [val.json]` → table `<out>.md` + summary. Every bạc choice
  (j67 chapter beats, j72 phụ tuyến steps, jecon scheme pairs, jrest, monthly duty) at ranks 1/3/5, both roads priced in khắc:
  1 bạc = 16 / (bạc earned per tuần at that rank: 17/20/25/40/45/51/60/70 for ranks 0..7, sensible-bot flow, inpromo.js), 1 Sức = 1/6 khắc
  (nghỉ một lát), Danh 4.2 / Đức 8 / Sủng 4 khắc a point, a relation point 1/3 khắc; odds: E = p·V − (1−p)·loss, V = max(gains, price).
  gap = (E other − E silver) / price; |gap| ≤ 0.3 = she hesitates.
- Fix (jstory `altCost`, BAL.bacTuan + BAL.altK): the road without silver costs Sức + lower odds (+ khắc on j72) in proportion to the
  price in khắc at her rank (floors = the old flat road). jrest restDsSuc 24 / restDsBac 6; jecon dutySkip.duc 0, selfMinus 8,
  loyalCost 25, favorCost 30. Before/after: dev/review/bacroad-before.md, dev/review/bacroad-after.md.
- Left: j72 bạc prices are not scaled by rank (a 15-bạc step is cheap at rank 5, dear at rank 1) → rank 1 j72 pairs stay "other road
  obvious"; scheme prices at rank 1 (40 bạc ≈ 2 tuần of income) make the free roads obvious there (owner's schemeRk design).
  Wording: some j72 roads read oddly ("Trả {A} 66 bạc (nhờ người, không dùng bạc)", repaying a loan without silver) — story text owner.

## BAL changes (all on this branch)
| knob | was → now | why / evidence |
|---|---|---|
| BAL.ex.bar (jbal2) | [22,27,31] → [22,25,28] | exChance probe at a sensible player's level: mid exam 52–56 %, high 27–40 % (3-month cooldown) → Quý phi→HH took years; now mid 75–93 %, high 64–72 % (promo-exam's design odds) |
| BAL.birthAdd (jbal) | 4 → 2 | probe_birth: mean shown risk 13 % (no physician) → 11 %; with care stays at birthMin 8 |
| BAL.bacTuan + BAL.altK (jstory, new knobs) | flat road (Sức 6, odds −15/−10) → priced by bạc value | bạc-road rule (see section above) |
| restDsSuc / restDsBac (jrest) | 20/8 → 24/6 | bạc-road scan |
| dutySkip.duc (jecon) | 1 → 0 | bạc-road scan (Bớt lễ nghĩa cost more than the silver) |
| selfMinus / loyalCost / favorCost (jecon) | 12/10/12 → 8/25/30 | bạc-road scan |
Non-BAL fixes: jecon night silver via BBAC.night (opt-render D), jty act:1 flags (opt-scan), jpoison honest deadly hint ("độc nặng thì mất mạng", liều).

## Results so far (21:15Z) — raw lives in dev/measure/pass/data/, tables in dev/measure/pass/data/tables_2115Z.md
Sensible bot = inpage6 + inty/inx/inpz/inpromo, bot v4 (dresses, makes up, skips pond/trip schemes, avoids options saying "mất mạng"), run_par 5 pages:
| build | n | Hoàng hậu | early death | childbirth / birth | HH after (tuần, median) |
|---|---|---|---|---|---|
| main 4e37161c0 (q1_main) | 11 | 27 % (10–57) | 36 % (15–65) | 2/7 (shown 11.1) | 205 |
| this branch cand1 (q2_cand1) | 13 | 23 % (8–50) | 54 % (29–77) | 1/12 (shown 9.8) | 216 |
| main, bot v3 (no "mất mạng" reading) | 6 | 17 % | 83 % | 1/2 | 287 |
| cand1, bot v3 | 6 | 50 % | 50 % | 1/5 | 160 |
| eb7886c, bot v1 (no dressing etc.) | 17 | 0 % (0–18) | 59 % | 3/9 | — |
evbot on main (hint / rand / same, 8–9 lives each): avg max rank 6.0 / 6.1 / 5.0; HH 38 % / 38 % / 0 %; died before HH 12 / 0 / 44 %.
→ always-first loses (✔); hint does NOT clearly beat random yet (n too small, event choices are a small share of a life).
Childbirth: the in-game mechanism matches the shown risk exactly (dev/tmp probe through pregMonth: 13.2 % vs 13.17 %); high raw counts
in short samples come from survivorship (runs cut mid-life keep only the lives that ended early).
Diagnosis on main: HH 0 % in other bots = harness (trung y loop, no makeup, pond pushes ~26/life, no exam in inpage4) + exam bars;
poison deaths: most are NOT ACT.poison (1 of 18 landed ones killed) but poisoned food gifts accepted with a hint that hid the death risk.

## C7 resume (16/11, Foreman C) — merged origin/main 900ace7fb
### (1) "Bots reach HH 0 %" — root cause
- Not the game: the runners. `run5b.sh`, `run1b.sh`, `run5e.sh`, `run3full.sh` load `INP2=inx.js,inpz.js` WITHOUT `inty.js`, so the bot never
  dresses: once robbed of her robe every walk shows "Ra ngoài khi mặc trung y?", inpage4/6 retry the same place, the buổi never ends →
  TIMEOUT lives, max rank stuck, "HH 0 %" (same as `eb7886c bot v1` 0/17 above). Plus the older bot faults fixed earlier on this branch
  (pond / trip pushes ~26 a life, no makeup, inpage4 never sat the exam).
- Fix (family): `runb.js` and `run_par.js` now ALWAYS load `inty.js` (unless the INP file has it, or NOTY=1) — every runner script built on
  them is fixed at once. inpage5-based tools (htbal, men, runpets, runq, runbal, succ, run_url) still lack makeup / exam / pond rules:
  do not use them for HH rates; use the sensible bot (inpage6 via run_par + mkinp.sh, or pass/sensloop.sh) or evbot (inpage4).
- Exam gate: BAL.ex.bar [22,27,31] → [22,25,28] (already on this branch, 9ddd66eb6): high-tier pass at a sensible level 27–40 % → 64–72 %.
- Measured on the merged build (see "C7 measures" below).
### (2) Bạc ↔ road without silver, whole game
- New group in the scan: j68 common events (EV6, 35 silver options × 3 ranks), acts (Hành sự deck + talk options + tài nghệ, value per khắc).
  Census of every `bac:-` site: `python3 dev/measure/bacsites.py [--md]` (602 sites; 358 in a scanned group).
- Fix j68 (new module `dev/build/jbac.js`, loaded after jevb): when an EV6 card is built, each silver option's price moves toward the price at
  which its E (khắc) equals the best free option of the card, at HER rank (BAL.bacTuan), clamped BAL.bacFair.lo/hi × the written price;
  still behind at the floor → its gains raised up to BAL.bacFair.gMax ×. Value table BAL.bacVal (= the scan's). Gains only in words
  (wt/k tokens) = BAL.bacVal.tok khắc. Switch off: window.__bacFairOff=1.
- Fix j72: the roads without silver (jstory alt72) were priced at rank 3 for everyone; now getters price odds / khắc / Sức at her rank.
- Fix jrest: Dưỡng sức tonic silver priced at her rank (BAL.restDsBac0 = 6 at rank 3; 3 at rank 1, 8 at rank 5).
- Tables: dev/review/bacroad-c7-before.md (merged build before C7) → dev/review/bacroad-after.md. Seeded (BACSEED); j67 rows still move ±5
  between runs (some state is not seeded).
- Left (not scanned, in bacsites.py): j7 old intrigue events (24), j71 festivals/merit (25), j70 (17), j96, j42, j97, j29, j54, jtsb, … —
  gains live in go() closures / words, so they need hand pricing per event. Acts: 11 of 25 silver acts have gains only in words (lật thẻ,
  cầu tự, thái y tâm phúc, shop items) → unpriced; 10 have no free act with the same main gain (Đức: Tụng kinh, Đưa cơm áo; relation:
  Giúp đỡ nàng). j68 residue: silver options that buy information (wt tokens) vs free options giving Đức (8 khắc a point) stay
  "other road obvious" even at half price — that is an event-dilemma issue (Đức-giving free options dominate), not only a price.

### Thái y "Mời thái y bắt mạch" (review/thaiy-r1 @ f7c61f829, NOT on main → not applied here) — verified row (coordinator 16/11)
Model = bacroad.js: 1 bạc = 16/BAL.bacTuan[rank] khắc (bạc she KEEPS per tuần at that rank, sensible-bot flow: duty, ban thưởng and wages
rise with rank, so pay alone overstates how cheap bạc is up high). Bạc road = 1 khắc + price. Own road = 3 khắc + Sức 5 (0.83 khắc) + 40 % a
rival hears × 3 khắc (one word-only cost, BAL.bacVal.tok) = 5.0 khắc. gap = (bạc road − own road) / max(price, 4 khắc); + = own road obvious.
| rank | BAL.pay | bacTuan | current cost | gap | proposed | gap | fair (gap 0) |
|---|---|---|---|---|---|---|---|
| 0 | 40 | 17 | 6 | +0.29 | 7 | +0.39 | 4 |
| 1 | 55 | 20 | 8 | +0.37 | 10 | +0.50 | 5 |
| 2 | 70 | 25 | 10 | +0.37 | 14 | +0.55 | 6 |
| 3 | 95 | 40 | 12 | +0.16 | 19 | +0.47 | 10 |
| 4 | 125 | 45 | 15 | +0.24 | 26 | +0.56 | 11 |
| 5 | 165 | 51 | 20 | +0.36 | 38 | +0.66 | 13 |
| 6 | 215 | 60 | 25 | +0.40 | 52 | +0.71 | 15 |
| 7 | 280 | 70 | 35 | +0.50 | 75 | +0.76 | 18 |
Verdict: the claim "bạc obvious at high ranks" does not hold once bạc is valued by what she keeps; the current table is already a bit DEAR
(own road slightly obvious, worst at rank 7), and the proposal [7,10,14,19,26,38,52,75] (18–27 of 100 of pay) makes the bạc road dead
at every rank. Recommend instead fair ≈ (own road − 1) × bacTuan/16: [4,5,6,10,11,13,15,18], or [5,6,8,11,13,16,20,25] as a halfway step.
Sensitive input: the price of "a rival hears" — if a guessed hidden pregnancy is worth ~10 khắc (not 3), the own road is ~7.8 khắc and fair
becomes [7,8,11,17,19,22,26,30] ≈ the CURRENT table. Either way the proposal is too dear.

### C7 measures (16/11 ~02:50Z) — raw lives dev/measure/pass/data/c7_m1.json
Merged build (main 900ace7fb + this branch before jbac), sensible bot v4 via run_par (3 pages, seed 501), stopped at 22 lives (load ~40):
### C7 merged build (sensible bot v4) (sensible bot, n=22, timeout/crash 0)
| target | measured (95% CI) |
|---|---|
| Hoàng hậu ~32% | 45% (10/22; 27–65) |
| early death ~40–45% | 27% (6/22; 13–48) |
| childbirth death 8–12% per birth | 0% (0/34; 0–10); mean risk shown 9.7 |
| pace: HH after ~188 tuần | median 220 tuần (p25 133, p75 295, n=10) |
- early-death causes: {'poison': 6}
- poison aimed at her per life 19.5, landed 1.68
- per origin (n/HH/died): ch 4/3/0, cn 3/0/2, dtq 4/3/1, muoi 3/1/1, nc 4/2/1, td 3/1/0, thd 1/0/1
- max rank: HH 10, rank 6 9 (6 of them "Thành Thái phi": stuck at rank 6 until the Emperor died — the Hoàng hậu SEAT, not the exam,
  is the top-rank block now), 3–5: 3. No TIMEOUT lives (the "HH 0 %" stall is gone).
- vs targets (Vừa): HH 45 % (27–65) is above 32 %, early death 27 % (13–48) below 40–45 %, childbirth 0/34 (shown risk 9.7) — CIs still
  touch the targets at n=22. Not tuned further here: D31 (difficulty) re-measures with these runners; if Vừa must sit at 32 % the first
  knob is BAL.ex.bar[2] back up 28 → 30, then early death via poison (BAL.seeMaxP).
- Tests on the final build (jbac + j72 + rest): opt-render.js fails [] / errs [] at 755x1000, 1000x755, 1180x820, 1366x1024, 844x390
  (warn only: Ban cung repeated hint, pre-existing); story-deadline 12/12; event-context 9/9; promo-exam 17/17 (1180x820, no page errors);
  rest-cards: Dưỡng sức Bạc −3 at rank 0 (rank-priced), its "ok" stays false as before (pre-existing lookup issue).
- Not run: evbot hint/rand/same on the branch (CPU), hint-dedup, old-save load (no new saved state: jbac/alt72 compute at display).

## NEXT (resume here)
1. Rerun both arms longer (≥40 lives each): `bash dev/measure/pass/mkinp.sh` then
   `node dev/measure/run_par.js http://127.0.0.1:<port>/<main build>.html sens 80 out_main.json ../tmp/sensall.js 5 <seed>` and the same
   for the branch build (`bash dev/site/build_site.sh` → index.html); `python3 dev/measure/anpass.py sens <label> out.json`.
2. evbot on the branch build: `EVLIFE1=1 EVSTOP=1 EVOUT=<dir>/e2 EVPAR=3 node dev/measure/evbot.js <url> 6000 hint,rand,same 21 1`.
   If hint ≈ rand persists, candidate lever: BAL.ctxTaste 12→18 / ctxCap 22→30 (jevb: bigger context swing makes the hint matter).
3. If early death stays >45 % on the branch: poison is the main cause → candidate BAL.seeMaxP 70→78 (one knob, re-measure).
4. Tests on the branch build (done 15/11 ~22Z): opt-render.js fails [] at 755x1000, 1000x755, 1180x820, 1366x1024, 844x390;
   story-deadline 12/12; event-context 9/9; promo-exam 17/17 (1180x820); opt-scan --fail unclassified 0; rest-cards.js "ok" is falsy on
   BOTH main and the branch (its "Nghỉ ngơi một lát" morning card lookup returns null — pre-existing test issue); dưỡng sức now Sức +24 / Bạc −6 as set.
   Not run: hint-dedup.js, old-save load.

## REVIEW r1 (16/11, Foreman C reviewer, branch review/balance-pass-r1)
Merged origin/main 4f5e5f3b3 then 67af14139 (assemble: jbac after jevb, main's jthaiy/jpromo/jflip/jtut/jgoal/jstaff kept; jbal2: bar
[22,25,28] + main's srvBar/srvCd; jecon: main's kitRows blCard kept). Fixes made here:
- jbac: target E = max(0, best free option). Before, a card whose free roads all LOSE (rumorEmpLove "Lan thêm lời đồn" E −20 khắc,
  stormNight, proudVisit at low rank) pushed its silver options UP to match a negative E: 45 bạc for "Tai mắt +1" (rank 3–7), 25 bạc for
  "Sang thân thiết" at rank 1 — silver priced above its own worth. 25 of 48 "dearer" rows had a negative target. Now priced at worth (8 / 5 bạc).
- jecon: log "Không đủ bạc lo lễ nghĩa" no longer prints "Đức -0" (dutySkip.duc is 0 now).
Checks: in-page probe over every E68 card × 8 ranks × 6 draws (2058 cards): display == fx == charged (chooseM) at ranks 0/1/3/5/7, rebuild
from pid/pp (save/co-op path) gives the same price, deterministic for the same state, no NaN / ≤0 / non-integer price, option keys
unchanged vs __bacFairOff. Old main save (with a pending silver card) loads, card rebuilt at the new price, 8 turns, re-save OK.
Bot: runb + inpage6 + inty: dresses (43 wears in 7 min), life completes (14.7 years, no TIMEOUT).
Follow-ups (not blocking): (a) cards whose free road is a clear loss need a better free road (rumorEmpLove, stormNight, proudVisit) —
the price can't fix those; (b) stormNight "Cứu người" 15→35–45 bạc for Đức +3 Danh +1 rides on BAL.bacVal.duc = 8 khắc (scan uses 16/3≈5.3):
re-check that value; (c) HH 45 % (n=22) above the 32 % target — owner question Q6 open; (d) opt-render 755x1000 A:giftto "not in cost
mode" (empty-bag picker, jgift/jk2b KIT_ACT_PIDS lacks "giftto") is pre-existing main, not this branch.
