# WORLD EVENTS — world window layer + 11 events (report)

Worker: WORLD-EVENTS build (opus), session_01UV1SzgiXvVVqaBb1b4oYFK, opened by Foreman C-AG. Branch `review/world-events` (from origin/main 6ca04148).
START_CTX: ~6 % of the 1M window (roll-over at 31 %, ceiling 60 %).

PRIORITY #1 CHECK ('world window|worldWin|quốc tang|quocTang|tuần du|đại xá'): OD 1 (L1587 + L1593) | ledger 0 | claims 0 | main: research §1 list re-checked + found MORE than the research listed: j92 `wdMonth` ALREADY starts a quốc tang (S.wdTang, 3 months, "Quốc tang" card) on Thái hậu / Hoàng hậu death (research said 0 triggers) → reused as the announcement, the window is the one record; jroute monthly dice fire (RTC.fire); jpet yearly autumn-hunt gifts; j71 hoahoan / cuute / suthan merits; j7 comet / fire / foreignwed weekly cards | review/* 0 | AG-ALL sibling session_01UV1SzjsTYMFvr4Rvhpd1tt (interface sent, below).

## 1. What was built (one layer, contents reused)

New module `dev/build/jworld.js` (assembled just before jrbatch), numbers in `BAL.world` (jbal2.js, one block).

- ONE RECORD `S.wwin = {L:[{id,k,t0,t1,scope,cause,x}], last, n, H, seq, q, seen}` — co-op WORLD key (pushed to COOPW.X.W_KEYS; host rolls, guest reads; her own "seen" S.wwSeen / S.wwHap stay personal). t0/t1 in tuần (wk()); open while t0 <= wk() < t1; ends by itself.
- ONE READER `worldWin(k)` / `worldWin()`; `worldPlanW(p)` → {place, act} multipliers per group (consort/queen/maid-servant; Emperor/Thái hậu none).
- Starts only inside the tuần tick (endTurn wrapper): a start asked mid-turn (monthTick, jtsb fire month) is QUEUED (`worldQueue`) because wk() jumps inside monthTick. Overlap: at most `maxOpen` (2) windows; Quốc tang always opens; during Quốc tang no thọ yến / sứ yến / tuyển tú / outing (thân chinh still allowed).
- OWNER OD 17/11 ~14:30Z applied: a world event = CENTER pop-up (existing modal card via Q/showModal) at the start (what happens + her own options, the same list NPCs choose from) and at the end (what came of it), one Tuần lục line each (log); the Dư đồ NEVER shows a world-event "!" (the AD_HAP_FIX / AD_HAP_FIRE / ACC_ROLE hooks of the first commit were removed; the scenes became the options of the start pop-up). Places are shown only as people being there: AG-ALL's day plan reads worldPlanW (place mults, force duty slots, why).
- Gates that READ the window (existing code, wrapped, never rebuilt):
  | gate | file | effect |
  |---|---|---|
  | `nightCh` | j8 (flip, tablet) | 0 for everyone a window blocks (tang first weeks, away for non-followers, dịch) — her and every NPC the same; tuyển tú newcomers ×newNight |
  | `visRoll` | jvisit | no ngự giá visit when she is blocked |
  | `S.where.emp` | placeWhere (j9 → jagent → …) | null while the Emperor is away (no stroll "!", countAt, no one at Cần Chính) |
  | `festToday`, `festival` | j31 / jact2 / j71 / j3 | no festival day / no yến during tang, thiên tai, thiên tượng |
  | `stipend` | j20/jecon | thiên tai: pay cut BAL.world.dis.payCut of the rank pay, her and every NPC |
  | `wdTang` | j92 (+ jlux, jtoil, jpm read it) | true while the tang window is open; j92's own S.wdTang is folded into the window (its card stays as the announcement, duplicates dropped) |
  | `mindW` | jmind (used by jagent, j28 SOC, jsteal, j4, j8, j13, j20, j83, j96, jlost, jtin, jagmaid) | × BAL.world[k].act[tag] (srvAct for servants) — every NPC choice reacts |
  | `placeWhere` | j9 chain | fallback pull of NPCs to the window's places (BAL.world.pull) and closed places (mult 0); switches off when AG-ALL sets window.WORLD_PLAN_HOOKED |
  | `freshEvents` | j7 pool | comet / fire / foreignwed leave the weekly random pool (they come with sao / hoa / su) |

## 2. The 11 events (research §3) — real cause → effect on everyone → NPC reaction → her part

| # | k (sub) | real cause | effect on everyone | NPC (two-way) | her part (same options as NPCs) | reused |
|---|---|---|---|---|---|---|
| 1 | tang | S.thDead / queen rival dies / Thái tử dies (any path: illness, j4 poison, jmort, jrd_ch) | 9 / 9 / 3 tuần; no thị tẩm the first 3 / 2 / 1 tuần; no festival / yến; Emperor mood ≥ 2 early; tang dress law | dress by traits (j92 rule, Kiêu ngạo breaks it); greet ×1.6, art ×0.3; go to the hall (tn / kn), garden closed | start pop-up: Quỳ túc trực (Sức −, Đức +, Thái hậu +) / Thắp hương | j92 wdTang/y_tang/tangPunish/card, jlux, jtoil |
| 2 | away (te) | calendar: every 3rd year, month 11 (tế Giao), Emperor well | 1 tuần out of palace, no nights, no stroll | scheme ×1.5, frame ×1.4, spy ×1.3 | news | S.where.emp, jvisit |
| 3 | away (san) | decided month 8 tuần 2: Biên ≥ 45, age ≤ 62, well, then 50 | 2 tuần; 2 followers = jpet's hunt rule (Sủng ≥ 50, most favoured) | as above; followers keep nights, Sủng + at return | chosen → Theo hầu / Cáo bệnh ở lại (an NPC takes her seat) | jpet hunt gifts now only in a hunt year |
| 4 | away (tuan) | spring of a good year (Kho ≥ 60, Biên ≥ 55), gap 5 years, 20 | 4 tuần, 3 followers (favour × social weight) | as above | as san | — |
| 5 | away (chinh) | j55 war LOST and Biên < 35, age ≤ 58, gap 3 years, 40 | 5 tuần; dispatch news each tuần; return: win (j55 general formula) Biên +20 → đại xá, lose Biên −10, mood 3 | as above | news | j55 Đại tướng quân roll |
| 6 | tuyen | calendar: KC.ty + 3n, month KC.tm (her own road's clock) | 2 tú nữ (room/CAPC caps), old consorts Sủng −2 (her too), newcomers favoured at night | each old consort: welcome / ambush / ignore by mindPick (help vs harm × ghen) | start pop-up: Tặng quà làm quen / Ra oai / Đứng xem | newRival, drawFace, palFix, relAdd |
| 7 | hoa | a REAL jtsb fire (careless maid, falling wick, arsonist) spreads: 12 dry / 3 wet | neighbours (her too) may lose a flammable (jtsb rule), mood ≥ 2, S.rt.fire set (escape route) | help ×1.4, frame ×1.3, servants work ×1.6 | the j7 "fire" card at the burnt rival's cung; (lightning in a real storm is a 2nd cause, 6) | jtsb tsbBurn/tsbFireBase, j7 fire, jroute |
| 8 | dis (lut/han) | j55 flood/drought whose relief FAILED and Kho < 35 | 3 tuần; pay cut, no yến, Emperor mood ≥ 2 | give / thrift / keep by own silver (mindPick help vs bribe); stingy rich lose Danh | Quyên bạc / Bớt chi dùng / Làm như không biết (same three) | j55, j20 stipend, j71 cuute merit (already reads it) |
| 9 | dich | Kho < 30 during or ≤ 6 tuần after a thiên tai, 35 a month | 3 tuần; each tuần every person may catch kiết lỵ (catch 6, ×0.4 if her gate is closed); no nights | close the gate (flee ×1.8) by mindPick | Đóng cửa cung, xông ngải / Vẫn đi lại | j13 illness rulebook (stages, care, death) |
| 10 | su | j55 "cong" roll and Biên ≥ 60, once a year at most | 1 tuần; Emperor mood 0; banquet at Cần Chính for rank ≥ Tần | invited NPCs show a talent (odds on Tài) or sit quiet | start pop-up: Dâng một khúc đàn (odds word) / Ngồi yên; below the rank: watch | j55 cong, j7 foreignwed (now only in an envoy window), j71 suthan merit |
| 11 | tho | Emperor 40/50/60… on the Vạn thọ day; Thái hậu 60/70/80 on the Thánh thọ day | 1 tuần; mood 0, Kho −6 | each NPC gives 15 % of her silver as a gift (Sủng + by size) | Dâng lễ vật quý / vừa phải / Tự tay làm (odds word) | FEST vantho / thanhtho |
| 12 | sao | Khâm Thiên giám: 1.2 a month, cd 1 year | 1 tuần, no yến, mood ≥ 2 | greet ×1.4, scheme ×1.3 | the j7 comet card (names her or a rival) | j7 comet |
| 13 | xa | first prince of the Emperor; a new Hoàng hậu; a victory; the end of a thiên tai / dịch (50) | confined all released; NPCs in lãnh cung may be pardoned (j8 pardon rule, 60); her lãnh cung ≥ 3 months → j14 restore "Chiếu đại xá"; Kho −5 | help ×1.3, harm ×0.6 | — | j14 restore, j8 pardon |

(Rows 2–5 are research rows 10 + 11 split by kind; 13 rows = the 11 research events.)

## 3. LUẬT SỬA CẢ NHÓM — world-ish events that ran for her alone (scan `python3 dev/measure/world_scan.py`, 23 definitions)

| content | before | after |
|---|---|---|
| j92 quốc tang (S.wdTang) | its own 3-month flag, card, dress only | one window (k tang); card kept; nights, festivals, NPC places/acts added |
| j7 comet (weekly pool) | random weekly card, any time | only with a sky window |
| j7 fire (weekly pool) "Đông lục cung bốc cháy" | random weekly, nobody really burnt | only with a real fire window, at the burnt rival's cung |
| j7 foreignwed (sứ thần cầu hôn) | random weekly | only while an envoy window is open |
| jroute "Đêm qua hỏa hoạn ở Ngự thiện phòng" (roll RTC.fire 1.2 / month) | dice fire, nobody touched | dice off (RTC.fire = 0); the escape route reads the real fire window (S.rt.fire) |
| j71 hoahoan merit (fire / flood / storm / snow / lightning pictures) | weight 0.8 always | each picture needs its real cause (fire window / flood window or storm / storm / snow storm) |
| jpet autumn-hunt gifts (month 9 every year) | every year, top-2 Sủng | only in a hunt year; the hunt's followers use the same rule |
| j71 cuute / suthan merits, j71 tamtang, j67 s_hoa / s_su / nc_su, jrd_* arcs, jkc kcE, joi kc2Sel, jorigins bd_hoa | already tied to a real cause (j55 dis / cong record, calendar) or a story road | unchanged (story chapters, not world events) |

## 4. Bot frequency (≥ 30 game years) — `node dev/measure/worldbot.js dev/index.html 35 <seed>`
Bot answers every card with its first option, restarts a life on death. Windows started per game year (36 tuần):

| k | research proposal | seed 1 (35 y, 5 lives)* | seed 3 (35 y, 4 lives) | seed 4 (35 y, 8 lives, final BAL) |
|---|---|---|---|---|
| tang (real deaths) | 0.05 | 0.20 | 0.11 | 0.20 |
| away all | — | 0.71 | 0.77 | 0.63 |
| · te (tế Giao) | 0.33 | 0.23 | 0.26 | 0.20 |
| · san (thu săn) | ~0.5 | 0.37 | 0.40 | 0.37 |
| · tuan (tuần du) | 0.15 (with chinh) | 0 | 0.06 | 0.03 |
| · chinh (thân chinh) | | 0.11 | 0.06 | 0.03 |
| tuyen | 0.33 | 0.17 | 0.23 | 0.14 |
| hoa | 0.08 | 0 | 0 | 0.11 |
| dis (lụt/hạn) | 0.15 | 0.29 | 0.26 | 0.46 |
| dich | 0.07 | 0.11 | 0.11 | 0.26 |
| su | 0.6 | 0.51 | 0.49 | 0.74 |
| tho | 0.05 | 0.03 | 0.09 | 0.06 |
| sao | 0.05 + minor | 0.11 | 0.14 | 0.17 |
| xa | 0.25 | 0.26 | 0.26 | 0.34 |
| 2 windows open (tuần) | — | 19 / 1260 | 15 / 1260 | 22 / 1260 |
| 3 open | — | 0 | 0 | 0 |
| longest run under dis/dich/hoa | "no perpetual disaster" | 6 tuần | 3 tuần | 6 tuần |
| tuần her nights blocked by a window | — | 6.5 % | 6 % | 6.6 % |
| errors / page errors / stuck | 0 | 0/0/0 | 0/0/0 | 0/0/0 |

*seed 1 ran before the last tuning (su cd 36, xa cd 36, dis kho 32 cd 36, tuần du kho 55 / biên 50 / 25, storm fire 6). jtsb fires counted 0 in all bot lives (NPC chests rarely hold flammables) → the storm-lightning cause was added. dis+dich are the busiest kinds (one dis per year at most, cd 36); lowering BAL.world.dis.kho (32 → 30) is the knob if the reviewer wants fewer.

## 5. Tests
- `node dev/test/world_check.js dev/index.html` → WORLD CHECK PASS 25/25 (layer queue/open/end; quốc tang from S.thDead: wdTang, nobody's night, no festival, BAL length; away: emp null, followers, no visit, mindW ×; same pay cut her/NPC; start + end center pop-ups with her options, Tuần lục line, no Dư đồ "!"; worldPlanW force; comet out of pool; j55 text kinds pinned; old save without S.wwin; co-op world key).
- `node dev/test/agent_check.js dev/index.html` → 16/16. `act-split-w2.js` → FAIL 0 (stroll "!" unchanged). `stipend.js` → no errors.
- QUICKCHECK on 34520347: PASS · 165 s · open 1614 ms · old save ok · perf (median of 3, new/live): render 153/194 ms, tab 345/334 ms, buổi 1059/878 ms, tasks>200ms 14/15 · core gates PASS (first run caught one inline number — tang rite Sức — moved to BAL.world.tang.rite.suc).

SẴN SÀNG KIỂM 34520347 (review/world-events). Handover (if a successor is needed): batch 1 done; part 2 = batch 2 per §6 SPLIT.

## 6. Open / limits
- Followers of an outing stay on the map (their place is their palace); only the night / visit gates know they are away. The AG-ALL day plan can take them out (interface below).
- SPLIT (asked by Foreman C-AG 13:26Z): batch 2 = dev/research/world-events-2.md (18 events) → PART 2 for a helper on the SAME branch on top of this sha: one EVD entry + one BAL.world block + a real cause in wCalendar / wCourt / wDeaths per event; start/end center pop-ups come free (worldShow); NPC reaction = act/place mults + force; add a row per event to world_check / worldbot. This worker stops at batch 1 (context budget).
- Co-op: start effects that touch her (e.g. tuyển tú Sủng −2, pay cut) run on the host's copy; the guest gets the cards (render hook) and the rules (gates read the shared window); her own effects on the guest side follow the existing co-op merge.
- No new UI: every card is the existing modal card (Q.push / pushDil, kit option rows), "!" = kitHapMark.

## 7. Interface for AG-ALL (sent 17/11 by send_message)
`worldWin(k)`, `worldPlanW(p) → {place:{key:mult}, act:{TAG:mult}, force:[{b,pl,deed,why}], why}` (0 = closed place; AG-ALL accepted, ca94ddd4 on review/ag-all, sets WORLD_PLAN_HOOKED in jagday); mindW already multiplied; set `window.WORLD_PLAN_HOOKED=1` when the day plan multiplies its place weights by worldPlanW (my fallback pull then stops); Emperor away: `worldWin("away")`, followers `x.f` (ids, "me").

## 8. PART 2 — batch 2 (dev/research/world-events-2.md, 18 events) on the same window layer

Worker: WORLD-EVENTS PART 2 (opus), session_01UV1Szm9sHk4A9qggdUgHhF, opened by Foreman C-AG. Branch `review/world-events-2` from review/world-events 34520347 (rebase onto the r1 PASS sha when it lands). START_CTX ~4 % of the 1M window (roll-over at 29 %, ceiling 60 %); finished at ~13 %.

PRIORITY #1 CHECK ('world window|worldWin|jworld|BAL.world'): OD 0 | ledger 0 | claims 1 (this job) | main 0 | review/* 0 (only review/world-events = part 1, built on). Every hook of research §2 re-grepped on the branch (j13 S.thIll, j3 S.emp.ill, j1 setHeir/allKids/mkKid, j54 k.wed/hW, j55 trS/T.H/tdPowAdd/tdHouse, j12 WX f 4, j8 framed, j10 allServ/fillStaff, j17 servant ageing, jnet netIs greed, j22 S.men Vương gia, BAL.srvAge) — reused, nothing rebuilt.

### 8.1 What was built
- `dev/build/jworld2.js` (assembled right after jworld.js): 17 EVD entries in the SAME `EVD` / `WN` / `S.wwin` / `worldStart` / gates. jworld.js only gained: `window.WORLD_X` (its helpers, one copy), `XH` trigger hooks run in the tuần tick after wCalendar, `EVD[k].nm` names, `nightMul` (a window lowers every night by one factor, her and NPC alike), stipend cut = the largest `payCut` of the open pay windows, ôn dịch also follows a locust window.
- `BAL.world.<k>` one block per event (jbal2.js, same literal). No new UI: start / end CENTER pop-ups are the existing modal card via worldShow (her options = the same list NPCs pick from by mindPick), one Tuần lục line each, NO Dư đồ "!" (owner OD 17/11 ~14:30Z).
- **#9 Địa chấn: PARKED** (research: no repair-debt state, no content; nothing to make it a real cause).

| # | k | REAL cause | effect on everyone | NPC (two-way) | her options |
|---|---|---|---|---|---|
| 1 | day | a living child born (allKids new name), opens BAL delay 3 tuần later | mother Danh/Sủng (boy > girl), Kho lúa − | gift by own silver; jealous → cold gift / stay away (mother's grudge) | (mother) big feast / plain · (other) rich gift / mid / stay away |
| 2 | lap | S.heir set (j3/j51/setHeir) | mother's house pow +; no night that tuần; đại xá chance | others with sons scheme/frame up (act) | gift / watch |
| 3 | hau | queen seat changes (lập / phế) | old house falls, new rises (j55) | ally/social/greet up | congratulate / keep distance |
| 4 | thb | S.thIll stage ≥ 2 | nights × 0.5 for all, no yến, queen Danh +, rota force slot at Đức Thọ | nurse / pray / ignore → Thái hậu favour | nurse (odds) / sutra / medicine |
| 5 | thi | every 3 y, month 3 | winning house (pow+sk) pow +, its consorts Danh + | court/art up | (if her house) letter to father (odds) |
| 6 | vuong | every 3 y, month 10 + a living Vương gia, Emperor in palace | weak border → Emperor wary; gossip on one consort | social/spy up | meet the prince (odds, gossip risk) / avoid |
| 7 | ret | heavy snow (WX f 4) in 2 of the last 3 tuần, winter | low ranks buy charcoal or lose Sức / phong hàn; lãnh cung worst; maids | rich share (Đức, Danh) or keep | (low) buy / endure · (high) share / keep |
| 8 | trung | j55 failed flood/drought relief, Kho lúa between dis.kho and 50, months 5–9 | Kho −, pay cut 1/10, Emperor eats less; raises ôn dịch | donate / hoard | donate / thrift / ignore |
| 10 | vuco | a REAL bùa frame (j8 framed: frame, j42 plant, month search, jtruth) while Emperor / Thái hậu / a child is ill | every cung searched: planted spies caught; nights paused; pay held | the real planter caught by her own schemes, else a scapegoat; giới nghiêm may follow | open doors / clean up first / accuse her worst foe |
| 11 | cam | after a vu cổ or ngoại thích verdict, or Biên < 25 after a lost battle | vuon / cnh / thu closed for NPC plans (0) AND her walk (goTo) | scheme up, spy down | — |
| 12 | trom | month 12 audit + a real greedy servant (netIs greed) | greedy servants caught in every cung, pay held, scapegoat; phóng cung may follow | — | open / bribe audit / clean own house |
| 13 | phong | month 2 with ≥ 3 maids at BAL.srvAge.out palace-wide (or after trộm) | aged maids leave every household; Nội vụ refills (fillStaff) | rich pay to keep one | silver home / keep one / let go |
| 14 | hon | a real daughter's wedding (j54 k.wed; hòa thân flagged) | hồi môn Kho −, mother Danh + | gifts by own silver | gift / attend |
| 15 | ngoai | a house pow ≥ 85 while Emperor < 30 or ill, or the queen's house | purge (house pow −30, its consorts Sủng/Danh −, curfew chance) or it rises | ally/scheme/warn up | (her house) advise father (odds) |
| 16 | phat | month 4 (Phật đản) yearly; đại trai đàn 1 tuần into dis/dich/trung (Thái hậu alive) | Thái hậu favour by donation; big: no night, may end the disaster next tuần | pray up, donate by silver | donate / sutra / pray only |
| 17 | benh | S.emp.ill stage ≥ 2 | no night, no yến; Hầu thuốc force slot (dtd) from rank 3 | greet/scheme/pray up | nurse (odds) / ginseng / pray |
| 18 | tinh | month 1 tuần 3 yearly (not under curfew) | family silver by house pow; strong houses show off | social/scheme up | take the gift / ask father to speak (odds) |

### 8.2 LUẬT SỬA CẢ NHÓM (world_scan.py now has batch-2 keywords: 38 definitions)
| content | before | after |
|---|---|---|
| j7 `empnight` (the Emperor at her door at night, weekly pool) | came even while every night was barred (long thể bất an, dịch, away, tang weeks) | leaves the pool while worldNightBlocked(S) |
| servants past BAL.srvAge.out in NPC / her households | only she (as a servant) was sent out at 30; household maids stayed forever | the phóng cung window sends them out for everyone |
| j3 PEND.thbenh, j71 thbenh merit, deal() Hầu thuốc card, j54 hòa thân, story roads (jrd_*, j67, jnroadm Án mất trộm) | already tied to a real state / road | unchanged |

### 8.3 Tests
- `node dev/test/world_check2.js dev/index.html` → WORLD CHECK2 PASS 39/39 (each of 17 kinds: opens, start + end center pop-up, Tuần lục line, no Dư đồ "!"; every real cause opens its window; same night factor / night bar / pay hold for her and NPC; curfew closes NPC plan places and her walk; aged maids leave an NPC house; force slot; old save).
- `node dev/test/world_check.js dev/index.html` → PASS 25/25 (one earlier run 24/25 out of 8 runs: a random flake, not reproduced in 7 reruns).
- QUICKCHECK on 22a0ae32: PASS · 171 s · old save ok · perf new/live render 183/207, tab 351/355, buổi 1084/937, tasks>200ms 14/17 · core gates PASS.

### 8.4 Bot (batch 1 + 2 together) — `node dev/measure/worldbot.js dev/index.html 35 <seed>`, 35 years each, 0 errors / page errors / stuck
"hardship" = tang, dis, dich, hoa, trung, ret, vuco, cam, trom, ngoai, benh, thb.
| per game year | seed 1 | seed 3 | seed 4 | seed 5 (final BAL) |
|---|---|---|---|---|
| windows of any kind | ~6.5 | ~6.7 | ~7.2 | ~7.0 |
| day / lap / hau | .37/.09/.06 | .46/.09/.17 | .49/.11/.06 | .31/.11/.11 |
| thb / benh | .20/0 | .23/.03 | .26/.03 | .11/0 |
| thi / vuong / tinh / phat | .17/.14/.86/1.14 | .20/.20/.86/1.06 | .23/.20/.89/1.06 | .23/.17/.91/1.11 |
| ret* / trung / vuco / cam | 0/.06/.06/.06 | 0/0/.11/0 | .46/.06/.06/.20 | .49/.03/.03/.06 |
| trom / phong / hon / ngoai | .26/.11/0/0 | .29/.11/.03/.03 | .23/.09/0/.09 | .17/.06/0/.06 |
| tuần with 2 windows / 3 | 49 / 0 | 48 / 0 | 62 / 0 | 44 / 0 |
| share of tuần under ANY hardship | 12 % | 12 % | 15 % | 12 % |
| longest hardship run (tuần) | 10 | 12 | 11 | 9 |
| her nights barred (share of tuần) | 7.3 % | 6.3 % | 8.4 % | 7.5 % |
| any window open | 25 % | 25 % | 28 % | 27 % |
*seeds 1/3 ran before the snow rule fix (2 consecutive tuần never hit under the bot's LCG; now 2 of the last 3) and trộm p 40 → 25; seed 4 before ret cd 36 → 54.
Reading: about 3 tuần in 4 have no window at all; hardship covers ~1 tuần in 8 and never runs longer than ~3 months; her nights are barred ~7 % of tuần (batch 1 alone 6.6 %). Rare ones (benh, hon, ngoai) are rare because their real cause is rare in ~6-year bot lives (the Emperor > 50, a daughter of 18, a house ≥ 85). Knobs if the reviewer wants calmer: BAL.world.ret.cd, phat (big afterP), maxOpen.

### 8.5 Open
- Co-op: triggers and NPC effects run on the host (as batch 1); the guest gets the cards and the gates; the goTo curfew gate reads the shared window.
- AG-ALL: new force slots (Phiên hầu bệnh at tn, Hầu thuốc at dtd, Lễ Phật at cnh, Dự yến đầy tháng at the mother's palace) use deeds routine / pray / gift (the ones AG-ALL already knows); the curfew is place multiplier 0 (already handled as "closed").
- kframe (j8 "Vu con nàng trù ẻo") does not call framed(), so it does not open a vu cổ window yet (one-line follow-up if wanted).

SẴN SÀNG KIỂM 22a0ae32 (review/world-events-2).
