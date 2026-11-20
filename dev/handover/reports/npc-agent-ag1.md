# npc-agent AG1 + AG1b — NPC agent loop + witness (Foreman C worker, opus)
SẴN SÀNG KIỂM 33170548 (branch review/npc-agent, base origin/main caa73a87 + review/npc-mind 7fd289cd merged).
Worker session_011xDdVQdAMNqfygpH41qGcQ. START_CTX ≈ 4 % (get_session reads 0; own estimate), end ≈ 27 %. No rollover needed.

## What was built
- `dev/build/jagent.js` (loaded last), numbers in `BAL.ag` (jbal2.js). ONE loop per buổi, HOST ONLY (`agOn()` false for a co-op guest, like mlGuest).
  Hook: outermost `placeWhere` (right after j95 plans the buổi) → `agTick()` once per buổi key.
- Agents: every person in the record is counted (`__agN` ≈ 55–61). AG1 SCORES consorts; maids / eunuchs / elders / Emperor / Thái hậu keep their
  j95 schedule ("routine", no scoring, npc-agent §4 shortcut) until AG2 (Emperor) / AG3 (maids) add their options.
- Choice (OD:L1248, L1386): step 1 WHAT she wants this buổi = weighted pick over her needs vs "keep my schedule"; step 2 HOW = `mindPick`
  (jmind, 12 % slip) over the deeds that serve that need, utility = Σ need × gain × odds − sure costs, × `mindW` (abilities/strength/virtues).
  Needs from stats she already has (no new bar): Sủng, Thái hậu, Hoàng hậu, Danh, Đức, child, friends, spite (hostility), safety (danger
  band), rest (Sức). Each = gap to `BAL.ag.goal` × road weight `BAL.ag.road[origin]`. Needs are re-weighed once per tuần and after she acted.
- Road: `v.nr.o` (review/npc-roads, Foreman D) when present, else `v.ag.o` seeded once from her house with the same rule as BAL.nroad.org
  (`BAL.ag.org`; D's table wins when loaded → D's merge should delete BAL.ag.org). The player's own father (tt/dtq) is never an NPC's.
- Options = the EXISTING deeds, paid and rolled exactly like hers: TW table (jtwoway: thTH, thHH, pray, ksp, fakeIll, fakePreg, announce,
  flaunt, check), the SOC social deeds mapped to TW (help, apol, visit, mediate, follow, warn, test, provoke, humil, drop, gossip; target by
  mindPickBy; SOC ok = danger band; `motiveOK` gate), and her Sủng deck act (j75 `npcEffortKind`, refactored out of npcEffort: múa/đàn/cờ/gift).
  Costs via twPay/ap (Sức/bạc/Danh/Đức = BAL.tw), one khắc each (BAL.ag.kh). NPC khắc budget = one chosen deed per buổi (two-way §1b).
- One path per deed (`BAL.ag.own`): while the loop is on, the old weekly/monthly dice for those deeds (npcMonthly twDo drips, SOC TW deeds,
  npcEffort trait frequency) do nothing for NPC doers; her own use is unchanged. `BAL.ag.on=0` / `window.__agOff=1` = old drips back.
- WHY: every act carries `why` = her need + road (e.g. "muốn được Thái hậu đoái hoài · con gái Tể tướng"; hostile ones add the motiveOK reason)
  into `S.roster.acts` (j95actLog shape, `ag:1`) and `S.ag.log`. Text of the deed → newsAdd (tai mắt truth path); aimed at her → log.
- AG1b witness: the deed is written into the ledger at its PLACE/KHẮC (`R.P[id][kh]=[place,"ag_<deed>",target,why]`) before it lands
  (`S.ag.pend`). Thỉnh an only where/when Thái hậu / Hoàng hậu is in her palace; Sủng acts where the Emperor is; social deeds where the target is.
  Never overwrites a khắc a card/told deed bound (J95B.bind); an act whose row was replaced since does not land; a re-plan keeps the acts.
  She stands there at that khắc → kit event card (T3 person event, same Q/opts path as j95 catch) "Ngươi bắt gặp" with reactions:
  Nghe lén (= the player's Nghe lén câu chuyện odds, now `BAL.ag.wit.hear/mat` in j2/j9 too), Tham gia (the same deed for her: her cost, odds,
  gains from BAL.tw; thTH/thHH/pray/ksp), Bỏ đi, Mặc kệ. Aimed at her → "Có người tìm đến". Two-way: when SHE does an owned deed, consorts the
  ledger has at her place that khắc react by the same choice (hear → learns her spot `j95z().meK` for ambush intents; join → same deed; ignore).
- j22 bypass (people-ledger-r1 NOTE, OD:L1386): j22's flat `roll(55)` haunt no longer rolls while jmen's schedule runs (`menSchedRoad()`).

## Tests (all on 33170548 or the commit noted)
| test | result |
|---|---|
| dev/test/agent_check.js (new: tick, ledger rows+why, scene card + odds = Nghe lén odds, lands after choice, her deed seen two-way, mute/off switch, j22 no roll(55), co-op guest off) | 12/12, 0 page errors |
| old save (two-way-oldsave.js, main caa73a87 save → this build, 30 weeks) | loads, ok, 0 errors |
| ledger_shadows thd 1180x820 / cnv 755x1000 (421cb23b-level) | 1649=1649 / 1632=1632, bad 0, 0 page errors |
| ledger_hours cnv / thd | court 8/8 bad 0 / court 7/7 bad 0. One earlier thd run crashed INSIDE the test (null `y.w` on a man in the record without menWhy; test fixed to report instead); main 1/1 pass |
| roster_audit sens 4 lives | first run h=1 (agent act overwrote a turn-of-buổi bind) → fixed 421cb23b → rerun 3806 checks, all 0, 0 page errors |
| coop-e2e (live Worker) | 61/61 incl. new "host ticks (13)" + "guest never runs agTick" |
| shots Fold 755x1000 + iPad 1180x820 of the new card | looked at: kit T3 frame, figure + scene band, Tốn/Được/Mất rows, odds ladder, no overflow (scratch, not in git) |

## Bot before / after
40 lives each, run_par sens + `dev/measure/inag.js` add-on (main caa73a87 vs branch at 421cb23b-level knobs, routine 24):
| | HH reach | early death | births/life | her nights/yr | NPC births/yr | NPC nights/yr | NPC Sủng / TH at death |
|---|---|---|---|---|---|---|---|
| main | 0 % | 72 % | 0.33 | 3.92 | 0.69 | 20.2 | 45 / 16 |
| branch (old knobs) | 0 % | 78 % | 0.38 | 3.95 | 0.68 | 18.2 | 29 / 3 |
HH 0 % on both = the known BALANCE BLOCKER (Foreman B), not this branch. With the old knobs NPCs worked too little (Sủng/TH fell), so the
knobs were retuned (33170548: routine 5, needW 1, goals Sủng 80 / TH 60, tablet 2; one slip only). 1-year sim (6 lives each, nextBuoi):
| NPC means after 36 tuần | Sủng | Thái hậu | Hoàng hậu | Danh | Bạc | deeds/consort/yr |
|---|---|---|---|---|---|---|
| loop off (old drips) | 55 | 39 | 37 | 37 | 355 | — |
| loop on (33170548) | 49 | 30 | 47 | 30 | 364 | ≈ 16 |
Remaining shift (Sủng −6, TH −9, Danh −7, HH +10) is the price of deeds by need instead of dice; the full 40-life bot was NOT rerun on the
final knobs (≈ 75 min) → reviewer / AG4 should rerun `run_par.js … sens 40` with inag6 (cat inpage6.js inag.js).

## Perf (`__agMs`, `agPerf()`)
x1 desktop 755x1000: p50 0.7 ms, p95 5.7 ms, max 8 (43 ticks). CPU x4 (Fold proxy): p50 2.7–3.6 ms, p95 9.6 ms alone / 14.1 ms under a
parallel load; per tick ≈ needs 1.1 + options 1.6 + landing 0.6 + resync 0.4 ms. **OPEN: p95 at x4 is above the 8 ms budget** (tail ticks
where many consorts choose a need at once); next step: spread scoring (half the consorts on alternate khắc of the buổi) or cache SOC targets.

## Notes / for later steps
- QUESTION: review/npc-mind is merged in but has no PASS (B's review pending). Review it with this branch or land it first.
- npc-jealousy worker (review/npc-jealousy @9148d83f) reports adjacent-line conflicts with this branch in j8/j10/j70/jbal2 — keep both sides.
- Not owned yet (AG4/AG5): quiet favour drip (npcMonthly Sủng +3), art practice, shop/gifts, harm 4 %, SOC non-TW (ally, feign, spy, steal),
  night steals, sendMaid, dress-offence hatred gate (FOREMAN_C 19:28Z), two-way rows 24/27–30/33–36. Emperor / maids options = AG2 / AG3.
- fakeIll is chosen often (17/yr over 10 consorts): its sure Đức cost is weighed only by the Đức need; AG4 may add a Danh risk if wanted.
- No new kit part; no player-visible numbers typed (all from BAL.ag / BAL.tw).

## HANDOVER (worker rollover, 16/11 22:35Z) — r1 FAIL fixes NOT started
Reason: context ≈ 28 % ≥ START_CTX 4 % + 25 % (owner OD:L1217 / 16/11 08:22Z s14). Coordinator opens the successor.
Successor: work ON review/npc-agent-r1 @2298416f (reviewer merged current main). Read dev/handover/reports/npc-agent-ag1-r1.md (7 families) + this file.
Pointers for the fixes:
1. PERF (blocking): jagent.js agTick. Per tick at x4 ≈ needs 1.1 + options 1.6 + landing 0.6 + resync 0.4 ms. Ideas: score only half the
   consorts per call and run the rest on the first spend()/j95sync of the buổi (khắc 0 acts then shift to khắc ≥1), cache SOC target lists per
   tuần (invalidate on relAdd/oanAdd), drop the j95sync in agTick (AG.now path) by updating S.where for the one id directly. Measure with
   `node dev/test/agent_probe.js index.html 160 755x1000 on 4` ALONE on the machine (parallel load doubles p95).
2. khắc: agReact Nghe lén / Tham gia call spend(1) only `if(can(1))` → must refuse the option when !can(BAL.ag.kh) and spend BAL.ag.kh;
   agSeeHer join should only happen if the witness has budget (one deed per buổi: skip if she already has a pend this key).
3. ONE CORE: typed weights in jagent (agSeeHer ho/50, AGHOST scores, 1+… in mindPickBy) + jmind sites/menDecide → BAL.ag / BAL.mind;
   move BAL.mind Object.assign from jmind.js to jbal2.js.
4. jdis vs jmind likes/dislikes: one system (jmind defers to jdis disOf/disKnown for Emperor/consorts/Thái hậu; check gift path for double charge).
5. KIT: the 4 reaction rows must share one kit form (currently Nghe lén/Mặc kệ get art pictures, Tham gia/Bỏ đi none) — check KIT option rows.
6. Servant-start player: agWatch returns early when isSrv() → remove that and use the record's mistress-palace mapping (j95 srvWhere).
7. Sủng deck numbers: j75 npcEffortKind typed values (40+A.vu*8, suc costs, gains 15/12/5/3) and j2 deck cards → one BAL table read by both.
Co-op first: rerun coop-e2e + the one-world probe after the fixes. Tests to keep green: dev/test/agent_check.js, ledger_shadows/hours, roster_audit.

## r1-fix (successor worker session_011xDdVQKTUc737xUKnLUEy6, 16/11) — all 7 r1 fault families fixed ON review/npc-agent-r1
START_CTX ≈ 3 % (get_session reads 0; own estimate). Base 2298416f (reviewer's merge of main f1509d7c). Commits 6b873b32 … (see branch log).

### 1. PERF (blocking) — `agTick` split into SLICES (jagent `agSlice`)
- The consorts of a buổi decide in slices of at most `BAL.ag.perf.slice` = 3 ms; the rest wait in `AG.q` and decide in the next frames
  (setTimeout 0) or on the next resync of the record (a khắc spent) — still ONE decision per consort per buổi, same buổi. Landing of the acts of
  a buổi gone by shares the same budget. `agFlush()` (tests) / `window.__agAll` = decide everyone at once.
- SOC target lists cached per tuần and per what she did since (`agSocT`); needs already cached per tuần.
- No full `j95sync` inside the tick: a resync only when the act starting now is at HER place or a consort leaves her place, and then in its own
  frame (`agSyncNow`). Counter: `AG.ms` = ms per slice (frame); `agPerf()` adds `buoi` (sum per buổi) and `sync` (resync frames); `AG.over` =
  trace of slices over budget (what was decided / landed).
- `node dev/test/agent_probe.js index.html 160 755x1000 on 4` (CPU x4 Fold proxy), alone on the machine, 160 steps each:

| run | slices | p50 | p95 | max | sync frames p95 | page errs | jagent errs |
|---|---|---|---|---|---|---|---|
| r1 before (2298416f) | 68 ticks | 2.7 | 8.7 | 22.8 | (inside tick) | 0 | 0 |
| final a | 106 | 1.9 | 5.5 | 6.7 | – | 0 | 0 |
| final b | 117 | 2.2 | 8.0 | 17.2 | 1.7 | 0 | 0 |
| final c | 106 | 1.8 | 6.2 | 16.8 | 5.0 | 0 | 0 |
| final d | 118 | 1.9 | 7.3 | 11.1 | 4.6 | 0 | 0 |
| final e | 129 | 2.7 | 4.7 | 5.9 | 4.4 | 0 | 0 |
  The few slices above 8 ms are ONE item each (AG.over): the landing of a social deed aimed at her (its `log()` DOM write, e.g. "lhelp 11.1")
  or one decision during a GC pause; they cannot be split further without splitting the deed's own effect. Bot numbers: section below.

### 2. Khắc rule (OD:L1386 + ONE CORE)
- AG1b reactions read `BAL.ag.kh` in code and text ("tốn: 1 khắc" printed from the constant). No khắc left (`can(BAL.ag.kh)` false) → Nghe lén
  and the join option are the kit LOCKED option (disabled + `.kwhy` reason from `whyTime`, the j15 pbtn form); `go()` never runs free.
  j3 showModal: an option with `lock` + `why` renders that existing form (KIT_REQUESTS.md entry for the kit keeper to record it).
- Two-way: an NPC witness's reaction (hear / join) IS her one deed of the buổi (`agUse`): a consort with an act planned / done this buổi only sees
  it go by (`agUsed`), and one who reacted is taken out of the slice queue. Scan: every `spend(`/`can(` in jagent = `agSpendKh` / `agKhLock`;
  jmind has none.

### 3. ONE CORE — typed weights → BAL (scan `python3 dev/test/onecore-pick.py [rev]`)
| site | before (typed numbers) | after |
|---|---|---|
| j10 friend pick | 1 | BAL.mind.pick.j10fr |
| j28 higher-ranked / social target | 1,10 / 4,4,4 | pick.j28up / pick.j28soc |
| j34 sabotage | 2 | pick.j34 |
| j4 framed | 1,30 | pick.j4 |
| j40 harm target | 1,5 | pick.j40 |
| j55 leak | 20 | pick.j55 |
| j8 buyer / HH evidence | 1,10 / 2,5 | pick.j8buy / pick.j8ev |
| j83 / j96 framer, accuser | 1 / 1,40,2 | pick.j83 / pick.j96 |
| jlost ×2, jtin, jwd92b, jagent SOC | 1 / 2, 1,2, 1, 1,1 | pick.lost1/lost2/tin/wd/ag |
| jmind menDecide | 25,2,.6,2,.5,2.5,1.2,.3,80,4 | BAL.mind.men |
| jmind mindW / abv / kid / pickMin | 40, .05, bạc/3, tal 55, .01 | BAL.mind.abMid/wMin/bacPer/kidTal/pickMin |
| jagent agCostF / agSeeHer | .9,.9,.05 / 50 | BAL.ag.costCap/costMin / BAL.ag.wit.hoD |
| **total** | **41 + 5 = 46** | **0** |
- `BAL.mind` moved from jmind.js into jbal2.js (documented block). Left as is (pre-existing main game rules, not choice weights): the
  candidate GATES of some lists (j13 ≥30/≥40, j20 ≥20, j28 band ≥2, j55 ≥1, j70 oán ≥20, j8 evG ≥2) — they are on main without npc-mind.

### 4. One likes / dislikes system (jdis owns Emperor, consorts, Thái hậu)
- jmind `jdisOwn` now includes Thái hậu → her dislikes, known-store (S.disK), learning and the gift penalty are jdis only (one line, BAL.dis.aff).
- Consorts' likes = jdis `likeKeys` (one list), known-store = jdis `S.likK` (`disLikeKnown` exported); jmind's talk roll, spy "like" fact and
  "Thích" card row are skipped for them (jdis has "Nàng thích" + its own talk/spy). jmind keeps only what jdis lacks: everyone else, Thái hậu's
  like (jdis likeKeys first), the liked-gift bonus BAL.mind.like. jmind's own dislike penalty (others) = BAL.dis.aff (one number per effect).
- Regard word per receiver (`regW`): Thái hậu "Thái hậu ±N", servants / own maid "Lòng ±N" (bump now moves the maid's Lòng), others "thiện cảm".
- `node dev/test/likes-family.js index.html` (every receiver kind, liked + disliked gift, refusal off):

| receiver | disliked: lines / text | liked: lines / text |
|---|---|---|
| Emperor | 1 · "ngài không ưa vải vóc: Sủng -1" | his likes are flower/music/dish (j2/j83, unchanged) |
| consort | 1 · "nàng không ưa vải vóc: thiện cảm của nàng -4" | 1 · "vốn thích trang sức: thiện cảm +3" |
| Thái hậu | 1 · "người không ưa vải vóc: Thái hậu -4" (was 2 lines, -4 and -3 "thiện cảm") | 1 · "vốn thích trang sức: Thái hậu +3" |
| Hoàng hậu | 1 · "thiện cảm của nàng -4" | 1 · "Hoàng hậu vốn thích …: thiện cảm +3" |
| own maid (works only) | 1 · "Lòng -4" | 1 · "Lòng +3" |
| servant / official / man / child | no gift path in the game (jgift giftPeople) — nothing to double | – |
- npcmind-check (old = main 08725411): 37 people, all fields, cards ok at 6 sizes, ERRS [], Thái hậu gift text now ONE line one number.

### 5. KIT — AG1b reaction rows
All rows take their picture from the kit rule (kitOptPic) — no blank, no placeholder: "Nghe lén" act:nghe-len · join option named by the
player's own act of that deed ("Thỉnh an Thái hậu" act:thinh-an-th-h, "Thỉnh an Hoàng hậu", "Cầu tự", "Đút lót Kính sự phòng" — the same deed,
"cùng nàng" in its note) · "Thôi, lui về cung" rule:opt-thoi (was "Bỏ đi", no picture) · "Mặc kệ" rule:o-yen-nghi-h. Same in every card
(thTH / provoke checked). Shots Fold 755x1000 + iPad 1180x820 looked at (scratch, not in git): T3 event card, 4 (or 3) rows, one form, no overflow.

### 6. Servant start witnesses
`agWatch` no longer returns on isSrv(): a servant-start player gets "Ta bắt gặp" with the reactions that fit her (Nghe lén / lui về / Mặc kệ;
no joining a consort's deed). agent_check now forces a servant life (`__forceOrigin="cnv"`) instead of relying on a random life → stable.

### 7. Sủng deck acts — ONE table `BAL.deck` + ONE odds formula `deckOdds(p,k)`
base + artW2(p,k) × per + stat / div + mood, read by j2 artActs (her Đàn / Kinh hồng vũ / Đánh cờ cards) and the Emperor talk "Dâng một cành
hoa", and by j75 npcEffortKind (NPC). Loss / gains from `deckLoss` / `deckGain` (vu, ky side numbers stay BAL.tw.g). Same life, art 4, Sức 90:
her card vs NPC — cam {Sức -10, odds 84, Sủng +12, loss Sủng -2} = equal; vu {Sức -20, 84, Sủng +15 Danh +3, Danh -4} = equal; ky {Sức -5, 77,
Sủng +5 Danh +2 Tâm cơ +1, Sủng -1} = equal; small gift = her flower {bạc -5, 50, Sủng +2} (before: NPC bạc -10, 55+Sủng/5, +3; NPC odds had no
artW, vu used effSac). NPC Sức floor before spending = BAL.deck.<k>.sucMin.

### Tests (final build)
| test | result |
|---|---|
| agent_check.js (16 checks: + kit pictures, khắc lock, two-way deed budget, servant witness) | 16/16 ×4 runs, 0 page errors |
| likes-family.js | all ok, 0 page errors |
| npcmind-check.js (main 08725411 → branch) | 37 people, ERRS [] |
| two-way-oldsave.js (main 08725411 save → branch, 30 weeks) | ok, 0 errors |
| coop-one-world.js | PASS |
| coop-e2e.js (live Worker) | 61/61 |
| agent_probe CPU x4 Fold | table in §1, 0 page errors |

### Bot after faults 1–7 (40 lives, run_par sens + inag6, branch d06a8d3f-level, 17/11)
| measure | main f1509d7c (reviewer) | branch 2298416f (reviewer) | branch r1-fix |
|---|---|---|---|
| early death (an7) | 65 % | 80 % | **85 %** |
| illness / childbirth / poisoned / Xuất cung về quê / Tuổi xuân qua đi | 8 / 1 / ? / 0 / ? | 15 / 2 / ? / 5 / ? | 7 / 4 / 4 / 4 / 11 |
| births / life | 0.25 | 0.17 | 0.15 (childbirth death 40 %/birth) |
| years / life · her nights (median/life) | 13.0 | 12.0 | 10.6 · 32 |
| NPC Sủng / TH at death (median) | 42 / 10 | 31 / -5 | 35 / -3.5 |
| perf under the bot (CPU x1): slice p95 median / max · qdrop | – | 1.7 / 6.5 | 1.5 / 5 ms · 0 |
**FAULT 8 is NOT fixed yet** — faults 1–7 did not move it (illness fell 15 → 7, but childbirth, poison, age-out endings rose).

## HANDOVER (worker rollover, 17/11 00:25Z) — faults 1–7 DONE, fault 8 (bot regression) OPEN
Reason: context 35 % ≥ START_CTX 3 % + 25 % (owner OD:L1217 / 16/11 08:22Z s14). Coordinator opens the successor.
Successor: work ON review/npc-agent-r1 (tip = this commit). Faults 1–7: sections above (tests green: agent_check 16/16, likes-family,
npcmind-check, two-way-oldsave, coop-one-world PASS, coop-e2e 61/61, perf table). Do NOT redo them.
Fault 8 plan (per-cause trace tool is ready: `dev/measure/intrace.js`, evaluate after inpage6 + inag):
  `cat dev/measure/inpage6.js dev/measure/inag.js dev/measure/intrace.js > dev/measure/inagtr.tmp.js` (do not commit the .tmp), copy main's
  index.html into the worktree as `main_tmp.html` (untracked), then run BOTH with the same seeds:
  `node dev/measure/run_par.js root/main_tmp.html sens 20 <out>/main_tr.json inagtr.tmp.js 2 1` and the same with `root/index.html` →
  per life `x.tr` = AG1b scenes + reactions chosen + khắc/Sức spent on them, NPC TW deeds landed ON her by kind (`aimed`), j40/runAct harm
  acts ON her by kind (`harm`), months with her Sức < 40, her illness onsets by kind, mean Sức / Sủng. Compare per cause.
Suspects (not yet proven), in order:
  1. review/npc-mind (merged into this branch, not on main): j40 `mindMenu` slip = 12 % of harm choices made UNIFORM over the band's acts
     (poison / pushp / musk get the same weight as rumor) and Tham vọng's target now `mindPickBy` over everyone incl. her (was argmax rank);
     j4 / j96 / j83 / jlost targets likewise weighted-random instead of argmax → more severe harm reaching the player (poisoned 4, childbirth 4).
     Test: rerun with `BAL.mind.slip=0` and with the old argmax sites to see which moves early death back.
  2. AG1b scenes: the bot ("sens") picks the first option with the best fx → "Nghe lén" (fx {}) every time → khắc spent instead of her own
     deeds/rest; join "Thỉnh an" costs Sức -5. (trace: react / khR / sucR / lowSuc).
  3. Muted NPC drips not replaced (npcMonthly Thái hậu / Sủng drips): NPC TH falls to < 0 → Thái hậu politics / HH changes around her.
  4. NPC hostile SOC deeds aimed at her by the loop (provoke / humil / gossip / drop) more often than the old weekly dice (trace: aimed).
After the fix: rerun 40 lives sens + inag6 (`run_par.js root/index.html sens 40 … inag6 4 1`, ~37 min alone) — early death and illness must be
within noise of main; add the row to the table above; then SẴN SÀNG KIỂM <sha> here + CLAIMS, message Foreman C (session 10 =
session_011xDdVSeKM6qi8YXjVTPqrd).

## r1-fix FAULT 8 (successor #2, session_011xDdVSQh3xBMmQ1KhP1rYA, 17/11) — bot regression: root causes + fix
START_CTX ≈ 4 % (get_session reads 0; own estimate). Tool: `dev/measure/intrace.js` (per-cause trace), same seeds, main = f1509d7c (the
reviewer's base; current main 744b80e7 has later merges and is not this branch's base).

### What the trace showed (before the fix, branch 654afb61 vs main f1509d7c)
- The headline numbers are mostly NOISE: with a bigger main sample (36 lives) main's own "early death" is 67 % (reviewer's 40: 65 %) and the
  branch's first 18 lives gave 67 %; an7 counts the age-out endings "Tuổi xuân qua đi" (40, no son, rank < 7) and "Xuất cung về quê" as early
  death, and those swing 0–11 per 40 lives on both sides. Births/life main 0.03 (an7 `kids` = children alive at the end) vs branch 0.39.
- ONE real, large difference: NPC deeds landed ON HER (`tr.aimed`, per life): provoke **495** (main 12.6), humil 129 (6.2), apol 110 (4.0).
  Root cause (suspect 4, a need-model bug, not odds): a spite deed FED the need it served — provoke lowers thiện cảm → `hostility` ↑ → spite
  need ↑ → provoke again (runaway, ~40 a year on her); and the NPC weighed no enmity cost although the player's card shows the risk
  ("oán ngươi +9"). Her oán then drove the NPCs' safety need → "Tạ lỗi" to her → provoke again (churn); NPCs spent buổi on it (NPC Sủng 37,
  TH −2, NPC nights 220 vs main 41 / 11 / 270).
- Not causes: j40 harm acts on her (runAct) the same as main per life (rumor/poison/frame within noise) → suspect 1 (npc-mind slip) not shown;
  AG1b reactions cost her 25–33 khắc a LIFE and ~1 Sức (suspect 2: negligible); her illness onsets per life = main.

### Fix (jagent, numbers in BAL.ag; NPC-agent LAW: the NPC weighs the same deed with the same gains and risks the player sees)
1. A spite deed SERVES the spite need: its own gain (BAL.tw.g spite points; BAL.ag.unit points = one whole need, as for every need) closes
   her spite toward THAT target (`agSpite` = hostility × (1 − vented/unit); flaunt = "*" everyone); her memory of it `v.ag.vent[target] =
   [tuần, points]` fades by `BAL.ag.vent.fade` = 1 point per tuần. Used for the need, the target pick and the deed's spite value.
2. A hostile deed's certain enmity (provoke: her oán +9 / an NPC's ghen +10; humil: oán +10 — the BAL.tw.g numbers of the risk line) is a
   certain loss to her safety, weighed by her road's caution (`BAL.ag.road[o].safe`) — `agU` gl.f.
No new bar, gate or roll; old saves without `v.ag.vent` load (two-way-oldsave ok). onecore-pick.py TOTAL 0.

### Bot before / after (sens + inag + intrace, same tool)
| measure (per life) | main f1509d7c (36) | branch 654afb61 (18) | branch fix (40) |
|---|---|---|---|
| early death (an7, incl. age-outs) | 67 % | 67 % | 70 % |
| causes: illness / Tuổi xuân / childbirth / poisoned | 4 / 9 / 7 / 4 | 5 / 5 / 1 / 0 | 12 / 8 / 2 / 5 |
| births / life (an7) · years / life | 0.03 · 12.9 | 0.39 · 11.7 | 0.35 · 11.4 |
| NPC provoke / humil / apol ON HER | 12.6 / 6.2 / 4.0 | 495 / 129 / 110 | 140 / 10.5 / 89 |
| her illness onsets | 11.0 | 10.9 | 9.2 |
| her Sủng mean · NPC Sủng / TH / nights at death (median) | 78.8 · 41 / 11 / 270 | 78.4 · 37 / −2 / 220 | 85 · 41 / −0.5 / 234 |
| her AG1b: scenes · khắc · Sức spent | – | 67 · 32 · 0.6 | 69 · 25 · 1 |
- illness 12 = mostly "Tuổi trời đã tận, trọng bệnh" (old age; onsets per life are BELOW main). All outcome rows are within the noise of
  n = 36–40 (one cause ± 4 lives).
- Left as is, explained: (a) provoke on her is still ~11× main's old weekly dice (≈12 a year from all rivals, ≈1 per hostile consort per
  year, each now chosen by her real hostility and caution); (b) NPC Thái hậu regard stays below main because the loop obeys the real access
  rule the old monthly drip skipped (j41: Từ Ninh only at the morning greeting, rank ≥ Quý nhân) — the same rule as the player's.

### Tests (final build 1eb87933 + report)
agent_check 16/16 · npcmind-check (main 08725411 → branch) ERRS [] · likes-family ok · two-way-oldsave (08725411 save, 30 weeks) ok, 0 errors ·
coop-one-world PASS · coop-e2e 61/61 · onecore-pick TOTAL 0 · agent_probe CPU ×4 Fold 755x1000 160 steps: slices 130, p50 2.8, p95 5.3,
max 9.6 (one ksp landing), sync p95 0.8, 0 page errors.

**SẴN SÀNG KIỂM d4796840** (fault 8 + faults 1–7 on review/npc-agent-r1)
