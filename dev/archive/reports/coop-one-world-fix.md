# Co-op ONE WORLD — fix report (worker, review/coop-one-world)

Date 11/16/2026. Worker session_01UV1Szj18sSZbfw4DZWoqJh, coordinator MAIN s23. START_CTX ≈ 4 % of the window (rollover ≈ 29 %, ceiling 60 %).
Audit: dev/handover/reports/coop-one-world.md. Owner line: OD "(16/11 ~19:57Z real, s22 chat, recorded by s23) OWNER (co-op".
Branch: review/coop-one-world, base origin/main caa73a87d, head 008ed0b9a (code + site build). No PR, main untouched.

## What changed (fix plan parts b, c, d, f; a = night-final, e = coop-contest are not mine)
| part | change | where |
|---|---|---|
| (b) helper | `worldOn()` = `!(COOPW.on && seat != "a")` — true in single player and on the host, false only on the co-op guest. Defined once, before the co-op guard, so it exists in every build. Told night-final + coop-contest workers to use the same name. | dev/build/jcoopworld.js top |
| (b) guard table | NEW last script `jcoopone.js` (assemble.py: after jeitem.js) wraps the OUTERMOST layer of each world function (every module's wrapper inside is skipped too). MUTE on guest: npcEncounters, q72Npc, epidemic, tdMonth, tdNews, moodMonth, tsDenNpc, tsNpcDanger. ONLY_ME (people lists liveRivals / consorts / emoPeople / allServ / allKids / fxServants hold only her while it runs; `rivals` itself untouched so queen / RV / refs resolve): v85Month, petWeek, petMonth, loMonth, emoMonth, affairMonth, facMonth, servMonth, queenRewards, maidLoveMonth, ktMonth, fxServMonth. PERSON (nothing for anyone but her): stipend (stipend + goods), illMonthP, fireServ, npcStudy, loLose, ktGrow, fxIllMonth (her maid/servants/kids only), wdNpcDress, drawLot. cmMonth on the guest keeps only her spy line + resets her own offence count. | dev/build/jcoopone.js |
| (b) inline | j3 endTurn NPC Sức regen + tablet ticks; j8 kidsMonth NPC mothers; j13 Emperor + Thái hậu illness; j13 newLots NPC lots — each `if(worldOn())`. | j3.js, j8.js, j13.js |
| (c) safety net | **Client side, not merge.js (see "Decision" below).** `guestNet()`: the guest's world just before / right after her whole week end (snapshots taken around the outermost endTurn) and at send time. A path her endTurn changed and nothing changed since → back to before; changed again by her own dawn-dialog act → numbers keep only the act's delta (c0 + c2 − c1); her own rows rl/ro/gp/ep/evm[902] and the date keys are hers. So any missed guard = "guest roll lost", never a double count. | jcoopworld.js `guestNet`, `CW.netWrap`, sendEnd |
| (d) world keys | W_KEYS += thIll, cm, men, menG2. cm: world = Thái hậu / Hoàng hậu mood; her `seen/spy/thDrop/hhDrop` stay personal (P.S.cmP). men: world = who the men are; her ties `tinh/letters/trysts/knowsMe/af/grudge/grudgeN/debt/seen` stay personal (P.S.menP, joined back by id). HOST_ONLY: the guest never writes these 4 keys (copied from the room base; absent in an old room → the host's copy wins on the first merge). Old P blobs that still hold men/cm/thIll lose them on the first merge (key deleted on one side). | jcoopworld.js splitP/worldPart/joinP |
| (f) CI | `node dev/test/coop-one-world.js` (env SEED, W, RUNS): 2 seats, real merge3, weeks AND months + a forced year end; checks guest week vs base, merge == host on every world path, her act after the week end kept, old-room migration + men/cm round trip, worldOn single player. | dev/test/coop-one-world.js |

### Decision on (c): no merge.js change (gain vs loss)
"W numbers host-wins" on the server would also drop the guest's REAL acts on NPCs during her day (slander → NPC Sủng −, gifts, theft of bạc …) whenever the host's week also moved that number — which is almost every week (Sủng, bạc, Sức move weekly). The server cannot tell her act from her roll; the client can (it knows the endTurn boundary). So the net lives in the client: the guest's sent week holds her day acts only, and the existing rule "deltas add" is then exactly right.
- Gain: no double count possible (CI: guest week changes 0 world paths; merged == host), and her acts survive (CI 11/11 kept).
- Risk 1: her own effects on NPCs that happen INSIDE her endTurn (not in a dialog after it) are taken back — likelihood: possible; weight: small (night acts on NPCs belong to the host's flip anyway, night-final); seen by: coop-one-world test lists them; fix: route such an act through jcoopask/relay.
- Risk 2: a non-number world field changed by both her roll and a later act keeps her act value (host-wins in the merge settles a clash) — rare, small.
- Verdict: Được lớn hơn — server host-wins would lose real player acts every week; the client net loses only rolls.

## Before / after (local 2-seat probe, same base week, real merge3)
Probe = reports/coop-one-world/probe-merge.js + an2.js (4 base weeks, 2 with a month tick). Count = world paths the guest's RAW endTurn moved
only on her side or differently from the host (G + DIFF). Before = origin/main caa73a87d; after = branch, guards only (no net).
| world field | before | after (guards) | after guards + net (sent week) |
|---|---|---|---|
| NPC bạc (stipend, goods) | 27 | 6 | 0 |
| NPC phe / father power `dad` (facMonth, triều đình) | 17 | 0 | 0 |
| NPC illness `ill` | 9 | 0 | 0 |
| NPC fortune lots `lot` | 76 | 0 | 0 |
| NPC stipend log `stip` | 19 | 0 | 0 |
| NPC goods `inv` | 419 | 15 | 0 |
| NPC dress `wd` | 22 | 0 | 0 |
| NPC Đức / arts / virtues | 7 | 0 | 0 |
| NPC servants `staff` (loyalty, illness, firing) | 48 | 33 | 0 |
| NPC kids | 8 | 9 | 0 |
| NPC Sức / Sủng / pg (night + regen) | 16 | 18 | 0 |
| NPC / court emotions (emoWeek, kept running for HER emotion) | 25 | 49 | 0 |
| Triều đình `S.trieu` | 31 | 0 | 0 |
| Thái hậu `S.thO` | 8 | 1 | 0 |
| Emperor mood | 1 | 0 | 0 |
Merged result (CI test, SEED 7, 12 base weeks incl. 6 month runs + year end): world paths where merged ≠ host = **0** (before: every row above with DIFF was added twice, e.g. NPC bạc 504 → 605 / 651 → 752). Seeds 1–24 swept: 22 pass at first; the 2 fails were (seed 7) a test false alarm — merge3 rule 1 takes one value when the host's own change equals hers (test now skips that coincidence) and (seed 2) an NPC missing from the after-endTurn snapshot (net now treats it as rolled); not reproduced since.
Residual raw rolls (taken back by the net, listed for the next guard pass): night results (Sủng/pg/Sức/lastNightS → night-final's flip), emoWeek NPC/court emotions (left running so her own emotion still reacts), servants approaching her (approaches → servCauses), wdSee/wdRemark (NPCs noticing dress), dhWeek seed gifts, tyWeek NPC robes, evTruthSweep deed keys, rash give/heal.

## Tests (head 008ed0b9a)
| test | result |
|---|---|
| node dev/test/coop-one-world.js (new; SEED 3, 7; RUNS 8/12) | PASS (guest week 0 world paths; merged == host; act kept 11/11; old room + round trip OK) |
| coop-e2e.js (LIVE Worker; includes single player + old save) | 59/59 |
| coop-guest-maid.js (LIVE Worker) | 37/37 |
| coop-world.js (LIVE Worker) | 28/30 — the 2 fails ("A waits for B after her buổi", "week advanced on both") are the old pre-night-gate flow; on origin/main the same test crashes earlier (TypeError reading 'name' in view), so not caused by this branch |
| bash dev/site/build_site.sh | built, committed |
| bash dev/tools/quickcheck.sh 008ed0b9a | PASS · 185 s · open 1260 ms · old save ok · perf (new/live) render 315/292 ms, tab 327/321, buổi 990/1059, tasks>200ms 14/12 |
Not run: coop-night / coop-rejoin / coop-timer (LIVE, long); no live 2-browser count of NPC bạc after N months.

## Not done / for others
- Night flip (a) → night-final; contests (e) → coop-contest: both told to use `worldOn()` (sent at start, no answer yet).
- Factions `S.facs` are personal keys (each seat its own list of phe) — same class of bug as #24 men; not in this task's list → reported, not changed.
- Epidemic now rolls only on the host; the host's illness on the friend entry does not travel to her blob (toCanon carries STAT, not `ill`) → she never catches a palace epidemic in co-op. Small; next pass.
- Thái hậu offence count (thDrop) of the guest no longer colours the Thái hậu mood (host computes it from the host's offences only). Small.
- Shop stock stays personal (as asked).

## Handover (if a successor is needed)
Worktree /home/user/wt/oneworld (sparse, branch review/coop-one-world). Probe copies + before/after raw files: /home/user/wt/oneworld-probe.
Next: guard the residual list above one by one (ONLY_ME / PERSON entries in jcoopone.js), re-run the CI test with several SEEDs.
