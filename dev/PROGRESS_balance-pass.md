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

## NEXT (resume here)
1. Rerun both arms longer (≥40 lives each): `bash dev/measure/pass/mkinp.sh` then
   `node dev/measure/run_par.js http://127.0.0.1:<port>/<main build>.html sens 80 out_main.json ../tmp/sensall.js 5 <seed>` and the same
   for the branch build (`bash dev/site/build_site.sh` → index.html); `python3 dev/measure/anpass.py sens <label> out.json`.
2. evbot on the branch build: `EVLIFE1=1 EVSTOP=1 EVOUT=<dir>/e2 EVPAR=3 node dev/measure/evbot.js <url> 6000 hint,rand,same 21 1`.
   If hint ≈ rand persists, candidate lever: BAL.ctxTaste 12→18 / ctxCap 22→30 (jevb: bigger context swing makes the hint matter).
3. If early death stays >45 % on the branch: poison is the main cause → candidate BAL.seeMaxP 70→78 (one knob, re-measure).
4. Tests still to run on the branch build: dev/test/opt-render.js at 755x1000, 1000x755, 1180x820 (done: fails []), 1366x1024, 844x390;
   story-deadline.js, rest-cards.js, promo-exam.js, event-context.js, hint-dedup.js; old save loads.
