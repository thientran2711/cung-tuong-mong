# Co-op "one world" audit — does each seat live its own world? (analyst, read-only, no game-code change)

Date 11/16/2026. Analyst session_01UV1Szk87bTSJicgPTiFX6E, coordinator MAIN s23. START_CTX ≈ 5 % of 1M (rollover ≈ 30 %, ceiling 60 %).
Code: origin/main 84c00794 (dev/build/*.js, coop/worker/src/merge.js, dev/coop/PROTOCOL.md). Rules read: START_CORE, START_WORKER.
Contests / tranh ghế / "same action by two" are covered by dev/handover/reports/coop-contest-check.md — not repeated here, only listed.
Nights: dev/handover/reports/night-final.md (review/night-final) §1.4 — confirmed again below.

## 0. Why it happens (root cause, one paragraph)
In co-op EACH seat runs the full single-player `endTurn()` + `monthTick()` locally (jcoopworld.js:378-379, j3.js:89-124). Only five
world functions are muted on the guest: `rivalsTurn`, `rivalsMonth`, `festival` (jcoopworld.js:370-371), `emperorDies` (jcoopworld.js:374)
and a few module guards (jstaff refill, jdh/jdh2 npcOK, jmline, jlux, jcmaid NPC part, jpetlife life, jmort world people, jkc).
Everything else that touches the world (NPCs in `W.R`, Emperor/Thái hậu/court in `W.S`) is rolled AGAIN on the guest with its own
`Math.random`. The server then merges with `merge3` (coop/worker/src/merge.js:16-24, PROTOCOL.md §4):
- a world NUMBER changed on both seats → `host + (guest − base)` → **both rolls are added (DOUBLE-COUNT)**, and even a deterministic
  tick (Sức +4, oán decay) is counted twice whenever the other seat also moved that number;
- a world field changed ONLY on the guest → **the guest's roll is taken** (a second, independent roll of the same monthly event);
- a non-number changed on both → host wins, so what the guest was shown at dawn (news, mood, illness) is silently replaced (DIVERGES).
Plus several world facts are stored as PERSONAL keys (not in `W_KEYS`, jcoopworld.js:24), so each seat keeps its own copy forever.

## 1. Proof (local 2-seat probe, no server)
Probe: one page, a world played 10+ weeks, then the SAME base week run twice — as seat a (host) and as seat b (guest), real co-op code
paths (`COOPW.on`, seat set, `COOPW.toCanon()`), different RNG seeds — then the real `merge3`. 4 base weeks (3 with a month tick),
plus a write-tracer (deep Proxy on every NPC + `S.emp/thO/court/trieu`, logging the writing function) on 6 guest weeks.
Scripts: dev/handover/reports/coop-one-world/probe-merge.js (+ an2.js, mg.mjs; paths inside point to /home/user/wt/oneworld = a sparse worktree of origin/main) and probe-attr.js (this branch). Not a live 2-browser run.

Merged numbers (base → host / guest → MERGED):
| field | example | meaning |
|---|---|---|
| NPC bạc | 504 → 605 / 651 → **752** | monthly stipend + goods paid on both seats, both added |
| NPC Sức | 78 → 91 / 96 → **109** | weekly regen (+4) and illness counted twice |
| NPC pg (pent jealousy) | 4 → 9 / 13 → **18** | |
| NPC Đức | 40 → 42 / 44 → **46** ; Sủng 33 → 37 / 36 → **40** | |
| court clan power `trieu.H.*.pow` | 40 → 42 / 41 → **43** | triều đình month run on both |
| Emperor mood | base 3, host 3 (no change), guest 0 → **0** | the guest's roll decided the Emperor's mood for both |
Guest-only world writes seen by the tracer (all should be host-only): NPC illness (`catchIll`), NPC pets (`petGive`), NPC fires a servant
(`fireServ`, R.fired/staff), NPC kids growth (`ktGrow/ktUp`), NPC goods (`stipGoods`, `loLose`, `earnFromChest`), NPC–NPC Thiện cảm/Oán
(`npcEncounters`, `relAdd`, `oanMonth`), NPC arts/virtue study (`npcStudy`/`v85Month`), Emperor/Thái hậu/court official emotions (`emoWeek`),
Emperor mood + court news (`moodMonth`, `tdMonth`, `tdSoMonth`), festival day key (`S.festDone`), NPC fortune lots (`drawLot`).
Same in every run (OK): date (year/month/tuan/turn), weather `wx` (12/12 identical), ages (`ageYear`).

## 2. Table — every shared-world system
Legend: H = host only, B = both seats. Verdict: ONE WORLD (OK) / DIVERGES (BUG) / DOUBLE-COUNTS (BUG).
| # | system | who computes | synced how | verdict | evidence |
|---|---|---|---|---|---|
| 1 | **Nights / flip / thị tẩm** | B: `flip()` at end of each seat's endTurn (j3.js:99, j8.js:489); `S.tonight` personal | NPC `nights++` merged per id | **DOUBLE-COUNTS** — 2+ women per night | night-final §1.4; j8.js:292 rivalNight, j8.js:494 resolveTonight |
| 2 | **NPC conception from a night** | B: `night(v)` inside rivalNight (j8.js:255/292) | guest-only `v.preg=1` accepted | **DOUBLE-COUNTS** (follows #1) | |
| 3 | NPC pregnancy months / births | H: rivalsMonth muted on guest | merge | ONE WORLD | jcoopworld.js:371 |
| 4 | Her own pregnancy | own seat, personal | P blob | OK (personal) | j8.js:350 |
| 5 | **NPC kids growth / talents** | B: `kidsMonth` (j8.js:358, ktGrow/ktUp) | numbers add | **DOUBLE-COUNTS** (kid stats grow twice) | tracer `ktUp<tcGrowCore` R.kids.td/tv/tw |
| 6 | **NPC illness / illness death** | B: `illMonth`→`illMonthP` for every consort (j13.js:11,26), `epidemic` (j13.js:23) | guest-only ill / `alive=false` accepted | **DOUBLE-COUNTS** (2 rolls/month → NPC falls ill / dies twice as often; guest's kill is kept) | tracer `catchIll<illMonthP` |
| 7 | **Emperor illness** | B: illMonth j13.js:27-28 (S.emp is world) | guest-only accepted, both → host | **DOUBLE-COUNTS** (rolled twice) | |
| 8 | **Thái hậu illness** | B: j13.js:29 `S.thIll` — and `thIll` is NOT a W key | personal | **DIVERGES** (each seat its own TH illness; TH death `thDead` from either roll is then shared) | jcoopworld.js:24 |
| 9 | Deaths by lifespan (jmort) | H for world people (jmort.js:51) | merge | ONE WORLD | |
| 10 | Emperor death | muted in co-op | – | OK (known limit) | jcoopworld.js:374 |
| 11 | NPC ranks / promotions / demotions | H (rivalsMonth) ; probe: rank changed host-only | merge | ONE WORLD — except tranh ghế (contest-check Q1) | |
| 12 | **NPC–NPC relations & oán** | B: `npcEncounters` (j9.js:33), `relAdd`, `oanMonth` | `rl/ro[npcId]` numbers add | **DOUBLE-COUNTS** | tracer `affAdd<npcEncounters` R.rl.*, `oanMonth` R.ro.* |
| 13 | NPC → her relations (rl/ro/gp/ep per pid) | each seat for its own pid | per-pid keys | ONE WORLD (OK) | jcoopworld.js:86-88 |
| 14 | NPC agent acts in buổi (schemes/accusations) | NPC→NPC and NPC→host on H; NPC→guest on guest (pickTarget) | merge | OK by design (each act once) | jcoopworld.js:376-377 |
| 15 | **NPC life events (j68 daily events, j70 plot chains, jts den, jty/wd, jlost, pets)** | B (no co-op guard in j68/j70/jts/jty/jlost/jpet give) | numbers add / guest-only accepted | **DOUBLE-COUNTS** (twice the events for NPCs; e.g. NPC pets `petGive`, `tsDenNpc` duc/sung) | tracer `petGive`, `tsDenNpc`, `loLose`, `tyWeek` |
| 16 | **NPC economy (stipend, goods, servants' pilfer, fines)** | B: `monthPay` → `stipend(v)` for every NPC (j20.js:31, jecon.js:39 econStipend, stipGoods) | bạc adds; inv/staff arrays host-wins / guest-only kept | **DOUBLE-COUNTS** (NPC bạc ≈ ×2) | 504→752 |
| 17 | **NPC study / arts / virtues** | B: `v85Month`→`npcStudy` (j85.js:132) | numbers add | **DOUBLE-COUNTS** | tracer `addArtP<npcStudy<v85Month` |
| 18 | NPC servants: refill / hire | H (jstaff isGuest, jcoopask) | ask channel | ONE WORLD | PROTOCOL §4.1 |
| 19 | **NPC servants: loyalty, firing, slaps** | B: `servCauses`, `fireServ` (j29.js:42), `emoMonth` | staff arrays host-wins, guest-only kept | **DIVERGES / DOUBLE** (guest's fired servant leaks in when host didn't touch that household) | tracer `fireServ` R.fired |
| 20 | **Emperor mood** | B: `moodMonth` (j3.js:62), weather hooks (j12.js:8-11), illness (j13.js:27) | `mood` is NOADD → host wins if both changed, guest wins if only guest changed | **DIVERGES** (guest's dawn news says one mood, merged world another; guest roll can decide it) | probe 3→0 |
| 21 | **Emperor / Thái hậu / officials emotions (jemo)** | B: `emoWeek` (jemo.js:84) on S.emp.emo, S.thO.emo, S.court.* | numbers add / host wins | **DOUBLE-COUNTS** (small) | tracer `emoWeek` |
| 22 | **Thái hậu & Hoàng hậu mood (jcmood `S.cm`)** | B, personal key | none | **DIVERGES** (two different moods of the same Thái hậu / Hoàng hậu) | jcmood.js:10, not in W_KEYS |
| 23 | Emperor location / visits (`where`, `menW`) | H, relayed | `where` message | ONE WORLD | jcoopworld.js:174-178 |
| 24 | **Palace men (thị vệ, thái y, vương gia…)** | each seat `menInit` (j22.js:5), `S.men` personal | only their places (menW) come from host | **DIVERGES** (each seat has its own men: different names, ages, affairs; host's places applied to the guest's own list by id m0..m5) | jcoopworld.js:174,177 |
| 25 | **Triều đình (clans, ministers, court news, sớ)** | B: `tdMonth`/`tdSoMonth`/`tdNews` (j55.js:141) on `S.trieu` (world) and NPC `dad` | numbers add, news array host wins | **DOUBLE-COUNTS** (clan power, father power twice) + guest news lost | probe pow 40→43 |
| 26 | Contests / festivals / tranh ghế / invitations | see coop-contest-check.md | – | **DIVERGES** (two boards) | contest-check Q1-Q3 |
| 27 | Festival day key `festDone` | B (j31.js:23 / jact2.js:34), same value | equal → once | OK | |
| 28 | Exams (khảo) | seeded rng | – | OK | contest-check row 6 |
| 29 | Tuyển tú / new girls / guest's new people | H (muted + jcoopask) | ask channel | ONE WORLD | PROTOCOL §4.1 |
| 30 | Calendar, buổi, khắc, week | room + gates | server week, `bend`, night gate | ONE WORLD | jcoopworld.js:200-220, 336-367 |
| 31 | Weather | B, identical in probe (12/12) | equal → once | ONE WORLD (verify seeding before relying) | j12.js:7 |
| 32 | **Fortune lots (xin xăm) of NPCs** | B: `newLots` (j13.js:68) | host wins | **DIVERGES** (guest sees NPC lots that vanish after merge; minor) | probe R.lot DIFF 80 |
| 33 | Prices / shop stock (`S.shop`, restock) | each seat, personal | none | per-player shop = OK *if* the design is "own merchant"; any shared/limited stock = DIVERGES (no shared stock exists) | j3.js:107 restock |
| 34 | Rewards / edicts (`luxEdict`) | H (jlux guest guard) | W key | ONE WORLD | jlux.js:118 |
| 35 | Rumours spread (jspread) / dawn news | jspread OFF in co-op; host news text relayed (`cnews`) | | OK (feature off in co-op) | jspread.js:35, jcoopworld.js:85 |
| 36 | Evidence / tai mắt (`ev`, `cev`, `intel`) | per pid / personal | per-pid keys | OK | |
| 37 | Pets of NPCs | life/death H (jpetlife.js:71); weekly care + giving on B | numbers add / guest-only kept | **DOUBLE-COUNTS** (care stats; pets given twice) | tracer `petWeek`, `petGive` |
| 38 | Places / who is where (j95 roster) | j95 OFF in co-op; host `where` | message | ONE WORLD | j95.js:28 |
| 39 | RNG seeds | `Math.random` per seat; only jtrong uses the room seed (jtrong.js:40) | – | root of #1-#37 | |
| 40 | Reign / faction (`S.trieu.rg` world, `S.reign` personal road) | world part in W | merge | numbers add if run on both (rg is in S.trieu → same as #25) | jreign.js header |

## 3. Bugs, ranked, with fix plan
Single rule for all of them (two-way law, one core): **the WORLD is computed once, on the host. The guest computes only HER OWN
personal state and her own acts; she receives the world from the host (merged week / relay).** The guest's endTurn must not touch
`W.R` or world keys of `S` except through her own acts on NPCs (already relayed per pid) and the jcoopask request channel.

1. **Nights / conception (#1, #2)** — HIGH, owner-visible. Host rolls ONE flip for the room among host + guest + NPCs (friend entry
   included, no `withoutFriend` for the flip); `tonight` becomes a world key `W.S.tonight` = {pid|npcId}. Guest's `flip()` is muted;
   she reads the host's result (relay `act {k:"ctm-night"}` right after the host's flip, or the merged week). Her own card / steal cards
   ask the host (same pattern as jcoopask). rivalNight runs on the host only. (Matches night-final's fix direction; do it there.)
2. **Guest re-runs the world month (#5,6,7,12,15,16,17,19,21,25,37)** — HIGH. Generic fix, not per system: in co-op on the guest,
   wrap the world loops of endTurn/monthTick so they iterate ONLY over her own person: `stipend(v)`, `illMonthP(p)` for p≠S, `epidemic`,
   `kidsMonth` (NPC moms), `npcEncounters`, `oanMonth` (NPC rows), `v85Month/npcStudy`, `emoWeek` (world people), `loMonth/tyWeek/
   petWeek/petGive/tsDenNpc` for NPCs, `fireServ/servCauses` for NPC households, `tdMonth/tdSoMonth/moodMonth`, Emperor/TH illness,
   `newLots` for NPCs, j68/j70 events whose actor and target are both NPCs. Cleanest: one helper `worldOn()` (= !CW.on || host) in one
   place (jcoopworld exports it) and each world loop checks it — or extend the mute list in jcoopworld.js:371 with these functions where
   they are whole-world functions. Add a guard test: run the probe (§1) in CI — after the fix every `W` path must be host-only or
   both-same.
3. **Merge rule safety net** — MEDIUM. Even after (2), keep the server from adding a world number the guest changed outside her acts:
   numbers under `W` changed by the guest only through relayed acts (`res`) are already moved into the friend baseline; so make
   `merge3` take host for `W.*` numbers (no delta add) EXCEPT the per-pid keys `rl/ro/gp/ep/evm[902]`. Then a missed guard shows as
   "guest roll lost", never as a double count. (Server change, coop/worker/src/merge.js:16-24, PROTOCOL §4 rule 2.)
4. **World facts stored as personal keys (#8 thIll, #22 S.cm, #24 S.men)** — MEDIUM. Move to `W_KEYS` (jcoopworld.js:24): `thIll`,
   `cm` (the TH/HH mood part; her own "seen" stays personal), `men` (+ menW already from host). Guest's `menInit` and `cmMonth` and the
   TH-illness roll then do nothing in co-op (host computes). Old rooms: on first merge after the change, host's copy wins.
5. **Emperor mood (#20)** — part of (2): `moodMonth` + weather mood hooks + illness mood host-only; guest's dawn news for the Emperor
   comes from `cnews` (already relayed).
6. **Contests (#26)** — follow coop-contest-check.md recommendations 1-4 (host board, one invitation, real scores).
7. **NPC fortune lots (#32)** — LOW: host-only `drawLot` for NPCs.
8. **Shops (#33)** — DESIGN QUESTION for the coordinator: if any stock is meant to be palace-wide (Nội vụ phủ, limited/unique items),
   it needs a W key + host roll; today every shop is personal.

## 4. What the guest receives after the fix
- Every week: the merged `C` as today (now containing ONLY host-rolled world changes + her per-pid rows).
- At dawn (immediately, not at week end): the host's night result (`tonight`), Emperor mood, court/world news text (`cnews`), so her
  dawn panels show the host's world, never her own roll.
- On demand: answers to her requests (jcoopask) for anything she causes in the world.

## 5. Not checked / limits
- Probe = endTurn/monthTick only (the week end); buổi-time NPC acts were judged from code (pickTarget / rivalsBuoi wrappers).
- Local probe without the Worker; the real merge function was used. A live 2-browser coop-e2e comparison after N days was not run
  (each day's merged C is by construction identical on both seats; the bugs are in WHAT is merged and in personal keys).
- Year-end only partly covered (1 run forced month 12).
