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
