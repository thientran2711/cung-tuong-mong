# NPC-PURPOSE — PHASE 1 scan (read-only)
PRIORITY #1 CHECK: OD L1833 (18/11 04:08Z "mục đích", no hên xui) + L1386 (NPC = agent) + L1587/L1592 ('!' from real deeds, day plans) + L188 (men's intrusions plan-driven) | main: jmen menMakePlans (plans exist, cadence by hash), jagharm agHap (replaces jact adHapRoll) | review/*: ag-all-2-land 47568e9 (base of this scan), no npc-purpose branch | claims: none
Handover line: START_CTX ≈ 8 % (own estimate). Worker = NPC-PURPOSE, foreman C-AG #9 (session_01UV1Szh2asyry15mvpuCEsJ).
Base scanned: origin/review/ag-all-2-land @ 47568e9, every dev/build/j*.js (338 files; UI/kit/art/coop-transport/minigame/name-gen/creation-time stats skipped after grep).

## Method
`roll(o)` = Math.random()*100<o, `R(n)` random int, `pick(a)` random element (j1.js:83/102). Every dice gate + `pick(` of an actor/target was read and classed:
- **DICE-ONLY** — the event fires (or its actor/target is chosen) by dice, no goal behind it. Must be rebuilt in PHASE 2.
- **PARTIAL** — a real precondition (grudge, need, trait) exists, but a flat roll / random pick / hash still decides WHETHER or WHO. Must be driven by the agent's choice in PHASE 2 (success odds may stay).
- **LIVE-OFF** — already dead when the agent layer is on (agOn/agDOn/empOn/amOn/asOn/haOn/p3On/menRoad guards or a jag* wrapper). Kept for the scan test only.
"Hash cadence" `(t+menH(id))%n` counts as dice in disguise (no person decides it).

## Summary (what the owner sees today)
1. **The stray man (jmen)**: the plans exist, but the LOVE itself is born by dice — j22.js:43 `!v.affair&&v.sung<30&&roll(2)` + `pick(S.men)` (a random man), exposed by `roll(3)` with no witness (j22:44). Meeting weeks = hash cadence. Root fix = an agent "affair" deed + witness chain.
2. **Weekly random cards**: j3.js:97 `roll(22)` makeDil (+ j7 cards: framed, musk, bribe, caning, hostage… by `pick(liveRivals)`), j24.js:33 "Có người đến" 1-3 random visitors/week, j68.js:95 life events 25 %/tuần, j72 random favours/errands, jgift:233 NPC day with the Emperor 6 %/tuần, j92 outfit remarks by a random speaker.
3. **Monthly chance chains with no actor**: jlost (items vanish `roll(LO.rate)`), jface:254 servant harm, jinv:292-314 dress gossip, jemo mood-without-cause, j4.js story timers, j29 servant traits, jcmaid monthly maid cards, jagknow:475 news sellers, jagacts3:302/318 maids learn affairs / report locations.
4. **Random picks inside real acts** (PARTIAL): who witnesses, who is gossiped about (jtwoway:72), who finds evidence (jroute:85/140, j96:114, jthaiy:120), whom the maid spies on (j78:106).
5. **Dice inside the agent layer itself** (PARTIAL, decide with C-AG): jmind slip uniform pick (jmind:162), jagday re-plan/2nd goal/slot (jagday:108/118/149/182, jagent:117), jagemp summon/seat (28/50), jshelf:259 call gate, j95 base-routine dice still feeding agBase (j95:137/151/182/209).
Counts: DICE-ONLY ≈ 60 rows, PARTIAL ≈ 95, LIVE-OFF ≈ 40 (rows below merge near-identical lines).

## PHASE 2 plan (proposal for C-AG)
- ONE helper `npcWhy(p, kind, ctx)` (new jagwhy.js, after jagacts3): returns {who, tgt, why, place} from the agent's needs/grudges/plans (agNeedsG, aff/oán, knB, R.P day plan) or null (= nothing happens: quiet day). Every row's dice gate is replaced by `npcWhy(...)` + the existing success roll. BAL keys: BAL.ag.why.* (jbal2) — one weight table per kind; no per-event numbers.
- Actors/targets: argmax-with-slip via mindPickBy (never `pick(list)`); witnesses = people really at the place (whereOf/agAt) ranked by eyes × hostility; news = knQ/kn chain only.
- Every card/log line names the person + reason (VANPHONG), e.g. "Lý tần oán ngươi chuyện …, sai người …".
- Old saves: missing fields default; v.affair/manLove already in saves stay valid.
- Tests: dev/test/npc-purpose-scan.js — fails on any `roll(`/`pick(`/Math.random gate in the row list below that is not behind npcWhy or a LIVE-OFF guard (allow-list = success odds); + quickcheck ×2, coop-e2e ×3, ag/npc suites, long suite.
- Open questions for C-AG: (a) keep jmind slip (OD L1248 "human, not optimal") but only among the top options? (b) pre-palace jkc/jkc2 family events in scope? (c) court memorials j55 need a minister agent — in scope or park?

## C-AG answers (18/11) + PHASE 2 split
Answers: (a) jmind slip stays, but only among that NPC's OWN top goal-valid options (a mistake, never a random act); same for jagday re-plan/slot and jagemp — dice only weight between goal-valid options; success odds stay BAL-rolled. (b) jkc/jkc2 family events IN scope, done LAST. (c) minister agent PARKED (feature freeze OD:L1402, C-AG logs PARKING_LOT); j55 memorials get a named existing official + reason from existing court data where it exists, else listed as parked.

STEP 0 (this worker, first, alone): build the ONE shared helper on review/npc-purpose — jagwhy.js `npcWhy(kind, ctx)` → {who, tgt, why, place, kh} | null, `npcWit(place, kh, by)` (real people present, ranked eyes × hostility), `npcTell(fact, from)` (knQ chain), all numbers in BAL.ag.why (jbal2), + dev/test/npc-purpose-scan.js (row list = this table) + the kind registry API. G1-G3 workers start only after STEP 0 is pushed; they add kinds to the registry, never their own helper.
- **G1 — weekly cards + the stray man (this worker after STEP 0):** j22:25/41-44/61-63, jmen (tryst/letter/overstay/seek/253/249/57-58), j3:56/97 + j7 cards, j4 story timers, j24:33/34/55/71, j21:78, j68:23/90/95 (+j68e/f/h), j72:215-242, jgift:233, j92:254-423, j71:148-151/317, jts:278, jtsb:230, j54:94, j75:192, j8:437/460/472, j95b:241-294.
- **G2 — monthly no-actor chains:** jlost (all), jface:161-259, jinv:292-314, jemo:110-153 + jcmood (mood from causes), jcmaid:107-136, j29:56-71, j42 (servant road: 262, 271-319, 511-584), jagknow:364/446/475-476, jagacts3:132/135/302/318, jil:117-132, jht:93-96, j54:79-127, j53, j55 (named official or parked), j83:211-257, jstip, jthaiy, jrcp, jpet:132-136, jdh2, jlux, jcycle, jaudit:66, jeitem:51, jexam, jkh:136, jveil, jtds, jreign, jshelf, jtruth, jwd92b, jty, j13:37, j32:7, j34, j10:150-157, j25:84, j9:32, j28:77-81, j70; LAST: jkc/jkc2.
- **G3 — witness/target picks + agent-layer dice:** jtwoway:72, jroute (all), j96:114/242, j78:106, j76:113, j61, j43:55-57, j77:236, jworld:129, jworld2:101/165, jnroadm:101-104, jmline:39, jvisit:90, jsteal:40, j95:137/147/151/182/209/226/230/434-442 (base-routine dice feeding agBase), jagday:108/118/149/182, jagent:117, jagemp:28/50, jagmaid:44, jagstaff:110-166, jagacts:41-112, jagacts2:122-124, jmind:162/175 (slip among top goal options), jshelf:259, jemoact:276-489, j51:62-72, j3:56.
- BAL flat odb keys of each row retire into BAL.ag.why in the group that owns the row. Each group: own before/after table section in this report, the shared scan test must go green for its rows; one reviewer pass per group.

## Table
| file:line | event | today's trigger | goal it should come from | agent hook | player-visible change | status |
|---|---|---|---|---|---|---|
| **jmen / j22 — the stray man (first)** |||||||
| j22.js:43 | NPC consort starts an affair | `!v.affair&&v.sung<30&&roll(2)` + `pick(S.men.filter(alive))` | lonely/neglected consort × the man's tinh/likeV for her | agReg consort "affair" deed (need × nết; target = man with tinh for her) | who has a lover; feeds every jmen stray | DICE-ONLY |
| j22.js:44 | affair exposed | `roll(3)` → deathSentence | a witness / accuser who gains | knQ chain from a real witness → accuser deed | consort executed | DICE-ONLY |
| j22.js:42 | hostile rival "knows" her affair | `wk()-S.lastTryst<=3&&roll(4)` + `pick(rel<0)` | someone who saw/heard | kn chain (witness of her tryst) | Tai mắt line, evidence | DICE-ONLY |
| j22.js:25 | flirt witness | `roll(risk/3)` + `pick(liveRivals)` | someone present at the place | whereOf witness | evidence | DICE-ONLY |
| j22.js:41, 61-63 | KSP book checked; affair conception; foe learns date mismatch | `roll(rbAffairMonth+…)`; `roll(trystCh(v))` with no tryst; `foes&&roll(10)`+`pick(foes)`; `roll(rbTop+eyes*5)` | HH/foe investigation; real trysts | HH deed; jmen trysts; kn chain | evidence, notes | PARTIAL |
| jmen.js:80-82 | lover's tryst (plan "tryst") | hash cadence `(t+menH(v.id))%cad` | the pair's wish + a safe night | agDay night slot chosen by the pair (roster-gated) | which tuần a man is in the garden / lãnh cung | PARTIAL |
| jmen.js:85-87 | secret letter via bribable guard | real reason, but `(t+menH(v.id))%12` + hash order, 1/tuần | her urgency | agDay slot "letter" by urgency | stray guard, tip | PARTIAL |
| jmen.js:88-90 | craftsman overstays | real order + roving trait + (sung<40 or likeV) — no dice; rotation picks palace | his fancy | ok; optional linger deed by tinh | stray craftsman | PARTIAL (minor) |
| jmen.js:92 + :31 | admirer seeks her | cadence `%nv(m,"menGap")`; likeV = `C[menH(m.id)%2]` | infatuation from what he has seen | man agent "seek" when tinh ≥ BAL; likeV = argmax seen | stray man near her | PARTIAL |
| jmen.js:253 / :249 | spurned man's rumour; "uy hiếp" reveals a secret | `(S.turn+menH(m.id))%3`; victim `sort(menH)[0]` | grudge; what he really knows | knQ gossip; his knB | Danh −; whose secret | PARTIAL |
| jmen.js:57-58 | thái y / vương gia visits | `sick[w%n]`; `(w+i)%4===0` | sick consort calls him; filial visit | agDay summons slot | who stands where | PARTIAL |
| **j3 / j7 / j4 — weekly & story cards** |||||||
| j3.js:97 (+j3:80,84, j7:9-189) | weekly random dilemma (love letter, cold-palace letter, vase, embezzle, poisongift, guardrumour, ghost, maidhostage, caning, rvframe/quarrel/musk/bribe) | `roll(22)` → `pick(L)()`; actors `rvAny()=pick(liveRivals)` | the actor's own scheme/grudge; HH discipline duty | card only from a planned deed (agHap/jagharm plan); caning = HH duty deed | random accuser/victim card weekly | DICE-ONLY |
| j3.js:56 | Emperor names Thái tử | `roll(15)` + roulette | succession duty × regard | empOn deed | heir decree | PARTIAL |
| j4.js:11-13,48,82-83 | story timers (Tể tướng letters, Nam Chiếu envoy, TH orders) | `roll(30)`/`roll(25)`/`roll(35)` | the father's / envoy's / TH's plan | story actor as agReg provider with timed plan | summons/letter cards | DICE-ONLY |
| j4.js:29, 39-41, 90 | "mùi muối" mockery; old mistress humiliates / letter leaks; plagiarism accusation | `roll(12)` no actor; `roll(5)`,`roll(30)`,`roll(25)`; `roll(10)`+`pick(p)` | disdainful rival; st.mis grudge; envious rival | jagharm humil/expose/frame by named doer; knQ leak | Danh −, punishment | DICE-ONLY |
| j4.js:21, 65-66 | treason frame; foe's father burns archive / witness appears | `roll(15)` (accuser by mindPickBy); `roll(12)`,`roll(35)` | grudge; cover-up once she learns of proof | jagharm frame; knQ → cover-up deed | treason case, evidence | PARTIAL |
| **j8 / j9 / j10 / j13 / j21 / j24 / j25 / j28 / j29 / j32 / j34** |||||||
| j8.js:437 / :472 | NPC inspects gifts; Cung Chính ti raids a palace | `roll(20)`; `roll(4)` (direct, unguarded) | suspicion of a foe's gift; an accuser's report / HH duty | day-plan "check" deed; knQ → HH/accuser "tố giác" | tainted gift found, contraband punished | DICE-ONLY |
| j8.js:460 | new recruit enters | `rivals<4&&R(12)===0` | Emperor/TH wish | empOn deed | new consort | DICE-ONLY |
| j8.js:88-89, 372, 404 | death→lãnh cung; midwife plant; maid bought by rival | `roll(30)`; `roll(15)`+`pick(bad)`; `!roll(15)` | regard; scheme; buyer's spy errand | empOn judge; jagharm prep; jagknow tm buyer | sentence, birth scandal, betrayal | PARTIAL |
| j8.js:349-469 (pillow, sendMaid, study/shop/gift, taint, npcCourt, TH/HH acts, npcAct, seat) | various `roll(n)` | — | j75/jagemp, amSendQ, agDOn, haOn, agOwn | — | LIVE-OFF |
| j9.js:32 | NPCs sharing a place quarrel/chat | `!roll(30)` per pair | her planned meet deed | agDay / jgreet | hidden aff/oán drift | PARTIAL |
| j10.js:150, 156 (+j25:84) | faction joint scheme; leader invites her | `roll(6)`; `aff>=35&&roll(10)`; j25 `roll(20)`+`pick(S.facs)` | faction grudge; leader wants ally | cx3:fac* / jgreet approach | target falls; invite card | PARTIAL |
| j10.js:157 | other faction splits hers | `mine&&roll(5)` | rival leader's goal | cx3:facDiv exists → guard with p3FacOn | member leaves | DICE-ONLY (dup path) |
| j13.js:37-38 | bribed thái y worsens illness | `bribed&&roll(25)` (bribe never paid) | rival's bribe deed | jagharm bribe (cx3:tyGift) sets real flag | illness worse | PARTIAL |
| j21.js:78-79 | random rival calls at her palace | `!roll(4)` → `pick(L)` | alliance / gossip / spite visit | agDay TW visit / jgreet | visitor log | DICE-ONLY |
| j24.js:33 (17-31) | "Có người đến" 1-3 visitors/week (gossip/ally/borrow/gift/hostile/sorry/servant plea/poem/defector) | `1+roll(50)+roll(25)`, `pick(T)()`, `pick(fr)`… | each visitor's own need | jgreet approach + agReg per kind | 1-3 visit cards/week | DICE-ONLY |
| j24.js:34, 55, 71 | debtor repays; servant cause event; wronged servant sells info | `roll(40)`; `!roll(12)`+`pick(L)`; `roll(15)`+buyer `pick(liveRivals)` | honour; nết; grudge + buyer who wants it | agDay repay; staff agent; jagknow tm | bạc, judge card, evidence | DICE-ONLY / PARTIAL(71) |
| j28.js:81, 77 | NPC weekly social deed (spy/ally/feign/steal still here); news reaches her | `roll(60)` + roulette; `roll(rbSeen+eyes*8)` | — ; told by a witness | add to agDay AGSOC; kn chain | news, evidence | PARTIAL |
| j29.js:61-66 | servant trait events (steal, black market, spy, transfer, gossip/leak) | `roll(10)`,`roll(12)`+`pick`,`roll(5)`,`roll(30)` | greed/ambition/loyalty | jagstaff asOn deeds | bạc −, Danh −, leaves | DICE-ONLY |
| j29.js:56-57, 71 | mistress fires servant; fired one sells to foe | `roll(25|8)`; `roll(sell)`+`pick(foes)` | discipline; seller picks buyer | cx3 household / jagknow tm | evidence | PARTIAL |
| j32.js:7 | rival bribes midwife | `roll(25)`+`pick(f)` | killer's scheme | jagharm prep | birth harm | PARTIAL |
| j34.js:23-25, 53 | seat contest acts; outside Empress decree | roulette, `roll(55)`+`pick(backers)`; `roll(10)` | candidate ambition; Emperor | agDay contest plan; empOn | contest score, new HH | PARTIAL |
| **j42 — servant road** |||||||
| j42.js:262, 318-319 | mistress's weekly card: mood/order/bribe offer/framing/friend tip | `roll(32)`…`roll(12)` ladder; `pick(L)`; tip `roll(55)`+`pick(L)` | order = mistress's harm plan; bribe = rival spy errand; frame = colleague grudge; tip = friend chat | jagharm plan k; jagknow tm; AS_DO.frame; jagstaff chat | dilemma cards | DICE-ONLY |
| j42.js:271, 288, 511 | higher consort buys her; random new mistress; seen with a man → random rival holds leak | `roll(1.5)`; `pick(L)`; `roll(50)`+`pick(L)` | buyer wants skilled maid; witness present | asOn buyer (as j14:45); whereOf witness | master changes; blackmail | DICE-ONLY |
| j42.js:299-306, 274-276, 540-550, 584 | reward/beat/order kind; spying/betrayal found; blackmail; chest search; prince asks; grant; friend tells affair | `Math.random()<good`, `roll(45/40)`, `roll(35/50)`; `roll(nv spyFind/betrayFind)`; `roll(12)`; `roll(rbTop+…)`; `roll(6)`; `roll(G.base…)`; `roll(30)` | tin/mood; mistress's search; prince's love; friend chat | mistress agent; cx3:search; jmen prince; jagstaff chat | cards | PARTIAL |
| j42.js:270, 555-559 | "Hoàng thượng để mắt"; maidLoveMonth | — | — | `!amOn()`; `asOn()` | — | LIVE-OFF |
| **j40-j99** |||||||
| j54.js:94 | daughter meets a young man | `roll(3)`+`pick(F)` | a real encounter at a place | agDay kid/man slot (jmen) | "Con gái có người thương" | DICE-ONLY |
| j54.js:79-80, 97-105, 116-127 | tutor/teach; marriage talks; Emperor match; daughter gifts/visits/cries; hòa thân | `roll(P*30)`, `roll(20)`, `roll(8)`, `roll(10/25/1.5)`, `roll(15)` | ambition for the family; duty; real unhappiness | agReg consort; empOn | betrothals, cards | PARTIAL |
| j55.js:146-152, 105-124 | NPC court acts (leak graft, gift minister…); monthly memorials | `roll(22*w)`… ; `roll(TD.so)`+`pick` | ambition/grudge; ministers' clan interest | agReg court options; (court agent — none yet) | memorials, clan power | PARTIAL |
| j70.js:155-160 | weekly new plot (NPC→her, NPC→NPC) | `pick(M)`, `roll(c)`, `pick(L)` method — runs beside jagharm, unguarded | scheme (motive band) | haOn plan only | plot chain | PARTIAL |
| j70.js:196, 369-370, 531-532 | ally warns; Emperor/TH guard her; NPC heals scar | `roll(6+…)`+`pick(al)`; `roll(10)`,`roll(8)`; `roll(20)`,`roll(8)` | friendship; favour; self-care | kn chain; empOn/th; agReg rest | cards, lines | PARTIAL |
| j71.js:148-151, 317-318, 274-281 | festival cast (entrants/gambler/host); merit deed; quarrel to mediate | `shuf(NP)`,`pick(L)`,`roll(40)`; `roll(npcP)`+`pick(ks)`; `pick(P)` | presence/ambition; real feud | agDay festival slot; agReg cx | festival card, "Lập công" | DICE-ONLY(148-151) / PARTIAL |
| j72.js:215-226 | NPC asks NPC a favour; TH/HH errand to random consort | `roll(npc*100)`,`pick(L)`,`pick(NPCQ72)`; `roll(35)`,`pick(L)`,`roll(60)` | real shortage; TH/HH duty | agReg ask; th/hh deed | news, relations | DICE-ONLY |
| j72.js:229, 240-242 | favour asked of her; debt collected | `roll(p*100)`, `roll(40)`, `roll(25)` | need / owed favour | agReg visit her | "Việc nhờ" card | PARTIAL |
| j75.js:192 | a family sends gifts against a monopoly | `roll(25)`+`pick(L)` | clan ambition | agReg clan | Sủng +3 | DICE-ONLY |
| j75.js:138; 144-209 | NPC night prep; pillow/sendMaid/admonition/effort/custom | `roll(55)`; rest guarded | ambition; — | agDay; agOn/amOn/agDOn/agOwn/empOn | — | PARTIAL / LIVE-OFF |
| j76.js:113 | maid's chat names a random rival's location | `roll(15)`+`pick(t)` | maid's real knowledge | kn chain | location line | DICE-ONLY |
| j78.js:106 | her maid's dò la target | `pick(L)` per buổi | danger/order | jagmaid "scout" | who is spied | DICE-ONLY |
| j83.js:211-215, 257 | NPC uses her handmade work (gift/poison/sell); seeks poison | `roll(40)`,`roll(15)`+`pick`,`roll(60/50/30)`; `roll(8)`+`pick(rs)` | favour/alliance/grudge/trade; scheme | agReg gift / haOn | gifts, poison | PARTIAL |
| j92.js:420, 254-260, 271, 407 | monthly outfit remark (speaker random); who overhears; NPC re-dress | `roll(remark…)`, `roll(12)` TH else `pick(L)`, `roll(35)`; `roll(45)`; `roll(70)` | gossip / rank policing; presence; dress for a goal | agReg remark; kn presence; agDay | remark line, Danh − | DICE-ONLY |
| j92.js:284-286, 337, 392-393, 419, 423 | tai mắt outfit report; framed NPC searches; servant breaks ngự tứ; Emperor notices; poor NPC sells | `roll(taimat+…)`+`pick`; `roll(25)`; `roll(2.5|.8)`+`pick(H)`; `roll(40)`; `roll(20)` | spy errand; suspicion; nature; presence; need | staff "listen"; agTouch; empOn; agReg trade | lines | PARTIAL |
| j95.js:151, 137, 230 | Emperor busy week / leaning; weekly mood ×, random neighbours; hawker eunuch | `j95dice(20)`,`j95dice(10)`; `0.4+Math.random()*1.5`, `sort(random)`; `Lp[random]` | realm crisis/mood; friendship; trade | empOn; agReg visit; staff agent | Emperor's place, who visits whom | DICE-ONLY (feeds agBase) |
| j95.js:209, 182, 226, 147, 434, 438-442 | rival follows intent 70 %; TH garden walk; thái y walk; plot errand; witness hostile; exposes her tryst | `j95dice(J95.IT)`, `j95dice(15)`, `j95dice(25)`, `ag2Ch(…)`, `j95dice(25)`, `j95dice(40)` | the intent; TH need; patient's call; scheme; grudge/gain | agDay slot; th slot; staff; agTouch; agReg expose | places, exposure | PARTIAL |
| j95.js:179/213, 143-146, 244, 386 | surprise moves; lovers' slots; staff errand; ambusher | `j95dice(SUR)`… | — | agBase SUR=0 (fallback path still rolls); !j95men; asOn; npcAct muted | — | LIVE-OFF |
| j95b.js:241-248, 246, 290-294, 117-120 | weekly lie-rumour (random listener); evidence holder tells; seeds; actor re-pick | `j95dice(rumorP+…)`, listener `L[random]`; `j95dice(12)`; `j95dice(45/20/25)`; `C[random]` | gossip for gain; grudge | agReg rumor + knQ | "nghe đồn" | PARTIAL |
| j96.js:114 | random consort gains evidence of the secret exchange | `pick(liveRivals(true))` | who stood there | kn presence | evidence | DICE-ONLY |
| j96.js:242, j77:236, j61:99/235, j43:55-57, j53:98-102/152, j51:62-72 | sweetheart note; guest greets; learns who; tai mắt reports plot; tutor choice/report; Thái tử naming | `roll(M.note.p)`, `roll(npcGreet)`, `roll(35/50)`, `roll(cl(c))`+weighted+`roll(50)`, `R(4)`/`roll(50)`, `roll(wait?5:15)` | longing; courtesy; presence; loyalty; ambition; duty | jmen man; agTouch; kn chain; staff; agReg; empOn | cards, lines | PARTIAL |
| j53.js:181 | scheme target = her best child | `roll(50)` | grudge over the heir | haOn plan target | which child is hit | DICE-ONLY |
| j68.js:95, 90, 23 | weekly life event (visits, Emperor whims, servant events, rumours, kids) | `roll(p*100)` 25 %/tuần; swap `roll(15)`; actor `pick(L)` | each actor's goal | agReg providers → agHap | event card | PARTIAL |
| j68e:75, j68f:105, j68h:17-18 | servant gamble / hairpin thief; "rỉ tai" | `R(3)===0`, `shuf`; target `pick(hate|L)`, fact `pick(L)` | greed; grudge | staff agent; agReg rumor | accusations, Danh −1 | PARTIAL |
| j40:41-45, j51:53-58, j55:96, j85:132/159 | mind slips; heir plot; crisis night; study/charity | — | — | haOn / empOn / agDOn | — | LIVE-OFF |
| **lettered a-l** |||||||
| jgift.js:233-234 | NPC consort's day with the Emperor (weekly) | `!roll(BAL.empDay.p*100)` (p=.06), kind `roll(40/50)` — no guard | favour/sủng need + Emperor's own plan | agReg cx3:qin + emp record | NPC Sủng/Danh + | DICE-ONLY |
| jlost.js:162, 82, 151-158, 137 | item goes missing (every consort monthly); holder random; investigation | `roll(LO.rate)`; `pick(L)`; `roll(20/20/50)`, `roll(40)` — no ag guard | theft by someone with a motive (or nothing) | jagharm steal/plant; staff agent; agReg "lost" | "đồ thất lạc" case | DICE-ONLY |
| jlost.js:50-52, 59, 100, 140-147, 245 (+jdh2:145) | cause rival/servant; asks quietly; recognise / friend reports; wears; keeps | `roll(rivP)`, `roll(srvP)`+`pick(st)`, `roll(40)`, `roll(recog.*)`, `roll(keepWear/keepP)` | scheme/greed/ally | harm "steal", consort options | CCT case | PARTIAL |
| jface.js:254, 258-259 | rival harms another consort's servant; slap reported by random consort | `pick(liveRivals)`+`roll(rbFxServMonth)`+`pick(staff)`; `roll(slap.rep)`+`W[random]` | grudge v→v2; witness present | jagharm harm; kn presence | NPC servant hurt; evidence | DICE-ONLY |
| jface.js:250, 253, 165, 161 | grudging servant harms a mate; hostile rival harms her servant; master slaps; punished consort skips schemes | `roll(8)`+`pick(mates)`; `roll(6)`+`pick`; `roll(slap.scold)`; `roll(50)` (still read by j70:159) | grudge; spite; temper; fear | staff agent; jagharm; master option; haPenW | servant hurt; slap | PARTIAL |
| jkc.js:162-168, 279-280 · jkc2.js:140-144 (pre-palace) | family whereabouts per buổi; old flame / stranger met | roulette `Math.random()*tot`, `pick([...])`; `roll(35)`, `roll(4)` | daily duty; lover's plan | kc family day plan | who you meet where | DICE-ONLY (scope? Q b) |
| jkc.js:298-320, 369, 384, 193 · jkc2:222-270 | weekly family event; matchmaker; creditor; lantern lover; stare | `roll(KC.ev)`+weighted; `roll(…)` | relative's grudge/debt/plan | kc provider | dilemma cards | PARTIAL |
| jcmaid.js:121-136 | her maid's monthly cards (confides, brawl, scorn, homeland ask, old-friend meet, exposed, spy) | `roll(B.secTell)`…`roll(B.cnSpy)` | her trust/grudge/homesickness | amOn maid agent | maid cards | DICE-ONLY |
| jcmaid.js:107-108 | maid overhears / leaks | ag2Ch else `roll(talSpy/secOut)` | loyalty/gain | amOn | leak | PARTIAL |
| jagknow.js:475-476 | a news seller comes (her + each NPC, every buổi) | `roll(agOdd(BAL.ag.sell.o))` | a servant who holds news and needs bạc | staff agent's own "sell" option | "bán tin" card | DICE-ONLY |
| jagknow.js:446, 364 | which seller; refusing servant tells master | weighted random; `roll(tmB().tell)` | gain/loyalty | staff agent | who offers; oán | PARTIAL |
| jagacts3.js:302, 318, 132 | maid learns affair (monthly 3 %); maid reports a rival's whereabouts; listener carries gossip on | `!roll(X.aff.see)`; `roll(X.hear)`+`pick(liveRivals)`; `roll(G.tell)` | witness/spy errand; what she saw; standing with the third | kn chain (agAt witness); agReg "tell" scored by aff | blackmail card; location log; third's oán | DICE-ONLY |
| jagacts3.js:135, jagacts.js:110/41/47/112, jagacts2.js:122-124 | keeps secret; TH frees random cold-palace consort; random shop/gift item; Emperor/TH bestowal | `roll(secretGrab)`; `L[random]`; `roll(agCap(pct*reg))` | leverage; mercy for a favourite; likes; regard | agU; mindPickBy; empOn give slot | released, gifts | PARTIAL |
| jagday.js:108/118/149/182, jagent.js:117, jagemp.js:28/50, jagmaid:44, jagstaff:110/135/163-166, jmind:162/175, jshelf:259 | agent-layer internal dice (re-plan, 2nd goal, slot, summon, seat, jealousy block, staff bully/expel/see/find, slip, call gate) | `roll(agCap(…))`, `free[random]`, `roll(agOdd(…))`, `roll(BAL.mind.slip)` | already need-weighted | decide with C-AG (Q a): keep human slip among top options; deterministic re-plan on need change; slot by fit | small oddities | PARTIAL (agent layer) |
| jemo.js:110-117; jcmood.js:21-30 | mood set with no cause (servant, kid, officials, men, HH, TH) | `roll(30/8/6/5)`+`pick([...])`; `roll(15)`,`roll(50)` | a real event | none — mood from state/causes (jemocause) | mood chips | DICE-ONLY (low) |
| jemo.js:153, jemoact.js:276-489 | sad consort refuses; outburst + victim; acts on feeling; Emperor drinks alone | hash/`roll(50)`; `roll(outCh*temper)`+`pick(ml)`; `ag2Ch`+`pick(L)`; `!roll(eaQx)` | her mood target; vent toward the cause | agU mood; cx2:vent; empOn | smashing, news line | PARTIAL |
| jht.js:93-96 | NPC mother/TH/Emperor arranges son's match; 2nd wife | `roll(20)`; `roll(8)`+`roll(40)?TH:HT`; `roll(HT.trac)` | ambition for her son; duty | consort kid deed; empOn | betrothal log | DICE-ONLY |
| jil.js:117-132 | item market: owner buys back, random NPC buys, asks back, item handed out | `roll(npcBackP/npcBuyP/npcConfP)`+`pick(L)` | want of the item / trade | consort cx:buy | who holds your old item | DICE-ONLY |
| jinv.js:292-314 | luxury / plain dress / veil gossip | `roll(25)` ×3, no actor | a gossiper who gains | agReg gossip deed | Danh/Đức | DICE-ONLY |
| jaudit:66, jcycle:252-263, jdh2:86-87/155/178, jlux:151/165, jeitem:51, jexam:141-143, jkh:136 | mistress promotes servant; foes read cycle book / forge; confiscation / title loss / hiệu grant; thrift edict / dress down; pilfer; TH errand pick / strike-back; false birth-date accuser | `!roll(15)`; `roll(npcRead/npcForge/rvRead)`; `roll(P)`, `roll(lose)`, `roll(H().p)`; `roll(edictP/npcCalm)`; `ag2Ch`; `sort(random)`, `roll(k.p)`; `roll(accP)` | reward; scheme/spy; punishment/reward; TH duty/fear; greed; TH need/grudge; scheme | consort staff option; jagharm + kn; empOn; th agent; staff agent; jagharm accuse | various | PARTIAL |
| jact.js:127-146, jagharm:131, jkh:131 | '!' rolls (stroll, count, quarrel pair, gossip speaker); night theft; birth drug | `roll(AD.*)`, `pick`; `Math.random()<w.p`; `roll(npcDrug)` | — | jagharm agHap replaces adHapRoll (181); haOn; p3On | — | LIVE-OFF |
| **lettered m-z** |||||||
| jroute.js:85, 140, 256, 259 | lost token / intercepted letter found by random rival; hostile rival pieces affair; child-face rumour | `pick(eyes>=2)`(+`roll(tokenLost)`); `roll(heat/4)`+`pick(foes)`; `roll(kidRoll)` | a watcher on her route; spy errand; hostile viewer | kn witness at route place; agReg spy; knQ gossip | evidence, caught card, rtKid | DICE-ONLY |
| jroute.js:108, 116, 240-241, 268-387 | tryst witness pick; blackmail; Emperor blood test; NPC escape/nun; test cheats/frames | `pick(W)`; `roll(bmRoll)`; `roll(kidTyAsk/kidBlameAsk)`; `roll(npcEsc/npcTry/.8)`; `roll(oil/alum/…)` | most watchful; greed; suspicion; despair; self-preservation; scheme | agTouch witness; uyhiep; empOn; agReg flee/xuất gia; mindPick | cards | PARTIAL |
| jts.js:278 | NPCs float lanterns; Emperor stops at one | `!roll(45)` continue, then `roll(30)` | seeking favour | agDay festival slot; emp walk from his plan | "Hoàng thượng dừng chân…" | DICE-ONLY |
| jts.js:148, 230 | consort closes doors; Emperor weekly summons | `roll(tsCare)`; — | fear; — | agReg guard; agDOn | tsGuard | PARTIAL / LIVE-OFF |
| jtsb.js:230 | mocker swapped for an "easy" rival | `roll(60)`+`pick(easy)` (rides j24, not ag-gated) | contempt from memory | agDay provoke target by memory | who mocks her | DICE-ONLY |
| jtsb.js:98-117, 186 | bully item/silver; complaint to HH; harm news; heed fire warning | `roll(45/50)`, `roll(45)`, `roll(50)`, `roll(60)` | greed; grievance; gossip; prudence | mindPick; agReg tố cáo; knQ | lines | PARTIAL |
| jrcp.js:299, 307 | maid gossip teaches a taste; ma ma copy offer | `roll(gossipP)`+`pick(P)`; ev deck `pick` | maid errand; ma ma's trade | amOn maid / kn; staff agent | taste learned; offer | DICE-ONLY |
| jrcp.js:154-158, 301-304 | allergy accuse; friend sends pattern; TH sutra | `roll(…)`; `roll(giftP)`,`pick`; `roll(thGiftP)` | grudge; friendship; TH favour | agReg accuse/gift; th | cards | PARTIAL |
| jpet.js:132-136 | Emperor/TH/HH/a man gives a pet | `empGive/thGive` (roll by regard), `roll(2.5)`, `tinh>=50&&roll(5)` | regard; patronage; courtship | empOn; HH cx:gift; man agent | pet gift | PARTIAL (145 LIVE-OFF) |
| jstip.js:82-89, 151-152 | Nội vụ phủ skims stipend; NPC answer | real causes then `roll(min(cap,ch))`; `roll(50/30)` | superior's grudge / eunuch greed | agReg harm; staff agent | Bổng lộc card | PARTIAL |
| jshelf.js:340 / 308-313 | room rumour spreads per pair; luxury accusation / TH rebuke | `roll(B.o)` per pair; `roll(npcO/guessO)`, `roll(B.o)` | gossip-for-gain; hostility | knQ; agReg accuse | rumours, cards | DICE-ONLY(340) / PARTIAL |
| jthaiy.js:120 | rival "sees" her at Thái y viện | `roll(T().seen)`+`pick(L)` | who is really there | whereOf witness | hidden pregnancy exposed | DICE-ONLY |
| jthaiy.js:62, 80, 118, 139, 163 | tip; physician leak; NPC bribes physician; physician tells about rival | `roll(20+eyes*8)`, `roll(leak)`, `roll(npcBribe…)`, `roll(askBase…)`+`pick` | spy; scheme; what he knows | knQ; agReg bribe; kn | lines | PARTIAL |
| jty.js:116 / 105 | NPC robbed of clothes (robber random) / enemy plots robbery | `roll(npcRob)&&roll(35)`+`pick(E)`; `roll(plotCh)`+`pick(E)` | grudge | agReg harm "cướp y" | news / omen card | DICE-ONLY / PARTIAL |
| jtwoway.js:72 | gossip deed: whom it is about | `pick(liveRivals(true)…)` | the teller's foe | target = teller's foe | Danh − on a random third | DICE-ONLY |
| jworld.js:129; jworld2.js:101, 165 | new-consort welcome/ambush target; "có kẻ đồn" Vương gia; scapegoat | `pick(N)`; `npcPick`+`roll(gossip)`; `roll(scape)`+`pick(liveR())` | envy; gossip; grudge | target by hostility; gossiper via knQ | who is hit/blamed | DICE-ONLY |
| jnroadm.js:101, 104 | NPC road chapter counterpart | `pick(L)` | her real tie (tinh, kin) | choose by tinh/affinity | road news | DICE-ONLY |
| jtruth:152, jwd92b:13, jveil:196-203, jtds:120, jreign:275, jvisit:90, jmline:39, jsteal:40-41 | NPC frames; plants contraband; veil buy/craft/ask/gift; workshop piece; faction errand; TH displeased; master notices seek; theft order | `roll(npcFrameP)`; `roll(frameP)`; `roll(VL.*)`+`pick`; `roll(npcWk)`; `roll(erP)`+`pick`; `roll(T.p)`; `roll(seeNotice)`; shuffle | malice; need/friendship; craft plan; leader's need; someone tells TH; watchfulness; want | agReg harm/cx; agDay; leader deed; knQ→TH; master eyes; order by u | cards, news | PARTIAL |
| jmline:31-91, jtime4:11, jpoison:106, jvisit:52, jpet:145 | maid seek/feud/hit; Emperor noon place; poisoner; surprise visit; NPC buys pet | — | — | amOn/asOn; jagday W.emp; haOn; agDOn; p3On | — | LIVE-OFF |
| **BAL flat NPC-event keys (jbal2.js odb etc.)** — to retire into BAL.ag.why in PHASE 2 |||||||
| jbal2.js:1099 odb + jgift:187 + par3 | j22.rbAffairMonth=10, j22.rbTop=8, j42.rbSrvMonth_2=2, j42.rbTop=1.5, j72.rbQ72Npc=30, j75.rbTop=10/_2=20, j24.rbKnown=15, j28.rbSeen=25, j43.rbTop=30, jface.rbFxServMonth=2, BAL.empDay.p=.06, ag.par3.cnv.aff.see=3, ag.cx2.maidTalk.hear=15, talk.secretGrab=50 | flat monthly/weekly odds | — | — | — | flat keys, live (only j42.rbSrvMonth guarded) |

## Out of scope (checked)
Illness/contagion (jface fxIllMonth, jkh, jemoact eaSick), weather, world events, shop stock (jhd), names/creation stats (jkc2:90-119, jht:53-55, jcmaid names, jkc:124, jstaff, j55:14/30 one-time draws), player minigames/fx, success odds of a chosen act.

## G1 before/after (session_01UV1Szk6vemeEmLFXUGhr2b, 18/11)
PRIORITY #1 CHECK: reused jagwhy (npcWhy/npwAsk/npwPick/npwStamp), the existing ONE motive gate motiveOK (j95, OD:L35) and the P95B act kinds (j95b) — no new gate; git grep makeDil/approachOne/rvAny/two on review/* = only this branch.
| row | before | after |
|---|---|---|
| j3:97 makeDil gate | `roll(22)` a week, then `pick(L)` of up to 4 tries | a card at most every BAL.ag.why.dil.gap (4) tuần (S.dilW), only when npwPick finds a goal-valid option; world/duty cards (festival, flood, illness, Emperor's question…) weigh dil.world |
| j3:80/84 coldletter, loveletter (+ vase, embezzle, tuyen) | random fallen consort / random consort / always possible | coldAsk (fallen consort who trusts her, motiveOK visit), loveFound (only a consort with a real j22 lover; lover named), hhMe (Empress with a motive), hhGreed (greedy-nết Empress only), empAsk (palace thin) |
| j7:9/10 rvAny/two (+ rvTop) → doll, poisongift, guardrumour, ghost, maidhostage, taster, pact, caning, fire, rvframe/quarrel/musk/bribe, comet, coldvisit | random consort / random pair / top ghen etc. | kinds meHarm/meAlly/hhCane/arson/rvHarm/rvFeud/omen/coldAsk: gate motiveOK with the card's P95B act kind (so j95b no longer re-picks at random), s = min + hostility; reason in the card text where the actor is named or revealed |
| j7:13/18/19 | — | out: new consort's rank roll; success odds (BAL) |
| j7 princefever | random child | the weakest child (illness) |
| j24:33/19-29 visitors | 1–3 visitors by dice, pick(kind), pick(person) | approaches: up to ap.max (2) of those with a reason; kinds apFriend (borrow/ally/gift/chat from her state), apTaunt (motiveOK provoke), apSorry, empTea, thCall, svAsk, maidWarn (most dangerous consort), manPoem (tình ý ≥ ap.poem), svDefect |
| j24:34 loans | roll(40) a month | repaid when the debtor has bac ≥ ap.repay |
| j24:55 servCauses | roll(12) per servant | one servant a tuần by cooldown (svCause), cause from her nết (SCAUSE) |
| j24:71 grudging servant | roll(15) + random buyer | sells to the consort with a motive against her (svSell) |
Also: jagwhy npwCdN falls back to BAL.ag.why.<kind>.cd; affair/affairOut/letter/menGrudge cd moved into their objects (one-core-guard counted the name twice — G2/G3: put a kind's cd in BAL.ag.why.cd only when no BAL.ag.why.<kind> object of that name exists).
Tests @9bf916a: npc-why 10/10, npc-purpose-g1 11/11, g1b 9/9, g1c 8/8, scan PASS (G1 done 23 · out 3 · open 90), quickcheck PASS ×2 (c145383 perf/old save; 9bf916a full incl. core gates).

## G1 #3 before/after (session_01UV1Szm7n34pm29edeDhQ3Q, 18/11) — G1 rows all converted
PRIORITY #1 CHECK: OD L1833 (18/11 04:08Z) | reused jagwhy (npcWhy/npcWhyAll/npwPick/npcWit/npcTell), motiveOK (j95) via npw1Mot, existing kinds empAsk/meHarm/apFriend/apTaunt; no new helper, no new gate | review/*: only this branch touches these rows | claims: G2/G3 (other rows).
Head review/npc-purpose @964cfa7 (base still review/ag-all-2-land 47568e9; G2/G3 not merged yet). Scan `--strict --group G1`: open 0 · done 108 · out 8 · PASS. All kinds in jagwhy1 (parts 4–10), numbers in the G1 block of jbal2 (BAL.ag.why.{e68,fav,job,q72,seekEmp,wd,ts,bul,j8,j22,story,call,f7,j75,lie} + cd).
| rows | before (dice) | after (goal) |
|---|---|---|
| j72:216-219 | 2 × 55 % a month, random asker, weighted random helper, random favour | npcFavor: only a consort with a NEED (short of silver, ill, an errand, cold Thái hậu, a rival to watch, with child, a lover, a maid's fault, weak art, homesick) asks the friend who fits it; the favour names the need |
| j72:223-226 | 35 %: Thái hậu/Hoàng hậu errand to a random consort; she hears 30 % + eyes | ladyJob: they trust the consort (Thái hậu regard / Empress liking); task follows the palace (someone ill → visit); she hears via npcTell |
| j72:229/241/242 | 25 % per debt, 40 % collect, 30 %/tuần a request | q72Collect (a matching need now, bigger debt first); request every q72.gap tuần; q72Choose = npwPick |
| j68:23/90/95, j68e:75, j68f:105, j68h:18 | random actor (rv6/sv6), 25 %/tuần, 15 % visit swap, thief 70 % greedy else random, random gossip target | rv6/sv6 = npwPick by tie/goal; e68.gap; a j68 visit only when no stock visitor has a reason (visitGap); thief = greedy/disloyal (none → no theft); target = the hated one |
| jgift:233/234 | 6 %/tuần each consort, random art | seekEmp: the consort who wants his favour most ((want − Sủng) × k + ambition), her best art |
| j92:254-271, 284-286, 337, 393, 407, 419-423 | random remarker (Thái hậu 12 %), 35 % praise, random hearers, tai mắt 25 %, 25 % search, 55 % punish, 70 % no re-dress, 40 % notice, 20 % pawn | wdRemark: Thái hậu/Empress keep the rules, a foe sneers, a friend praises (wd.gap per wearer); hearers = npcWit + npcTell; wdSpy on a hostile consort; wdSearch (watchful / distrusts accuser); exposed by npcTell; wdDress; wdNotice (Sủng); wdPawn (poor) |
| jts:148/230/278 | roll(tsCare), 14 %×mood summons, 45 % lantern | tsGuard (care + danger), empSummon (fallback; his favourite), tsDen (wants favour / devout) |
| jtsb:98/100/109/186/230 (101/102/108 out) | 45/50 % thing vs silver, 45 % complaint, 60 % heed, 60 % mocker swap | bulWant (target cannot pay / coveting nết), bulTell (trusts the Empress, resents the bully), fireHeed (eyes / Đức), mocker = most hostile easy rival with a motive; 101/102 = success odds, 108 wait by nết |
| j8:88/89/372/404/437/460/472 | 30 % mercy, 15 % midwife plot, 15 % maid sells, 20 % gift check, 3/2 % feign, R(12) recruit, 4 % raid | empMercy (Sủng / children), birthPlot (motiveOK harm ≥ birthBar), maidSell, giftCheck, fakeIll/fakePreg (Tâm cơ + unfavoured), empAsk, raid only on forbidden goods reported via npcTell |
| j22:25/41/42/62/63 (61 out), jmen:57/249 | flirt seen by risk/3 + random rival, 10 % book check, 4 % / 10 % foe knows, tai mắt 8 %, hash-sorted patient / secret | npcWit at her place; kspCheck (grudge); trystKnow (foe's tai mắt); taimat; the sickest patient; the man reveals what he knows; conception = nature (out) |
| j4:11-13/21/29/39-41/48/65/66/82/83/90 | monthly 5-35 % story timers, random mockery, random challenger | story kind: the story person's plan clock (story.wait per step; Empress clan also needs motiveOK); mock / frame / challenge via motiveOK kinds; the old letters leak via npcTell |
| j21:78, j54:94, j71:148/150/151/317/318 (149 out), j75:138/145/147/154/192 | 4 % random caller, 3 % suitor, random entrants/gambler/host/merit, 55/20/3/25 % | callMe (reasons, call.gap); suitor = the house's plan clock + best house; f7Enter/f7Gamble/f7Host/f7Merit; nightPrep, pillowTalk, sendMaid, npcTell, famGift |
| j95b:117/120/241/246/248/290/291/294 | random re-pick / listener, 12/p/45/20/25 % | npwPick by motive; listener = one the spreader trusts who likes her least; exposeMe/lieMe/blameMe/frameMe (motiveOK + hostility bars) |
Retired flat keys: odb.j72.rbQ72Npc, odb.j92.rbWdRemark, odb.j22.rbAffairMonth/rbTop, odb.j75.rbTop_2, BAL.empDay.p, WD.remarkBad/remarkOk/taimat, E68CFG.p/swap, Q72CFG.p/npc, J71.npcP/npcPrep.
Tests @964cfa7: npc-why 10/10, npc-purpose-g1 11/11, g1b 9/9, g1c 8/8, g1d 11/11 (new), g1e 10/10 (new), g1f 11/11 (new), g1g 11/11 (new); one-core guard/text/bind/text-rule PASS; quickcheck @964cfa7 PASS (core gates PASS, old save ok; perf median new/live: render 181/148 ms, buổi 810/686 ms, tasks>200ms 15/11 — watch on the second run).

## HANDOVER (NPC-PURPOSE G1 #3 + integrator session_01UV1Szm7n34pm29edeDhQ3Q → successor; 18/11 ~05:50Z)
START_CTX ≈ 6 % (own estimate; get_session read 0); now ≈ 31 % of 1 M → rollover trigger (START_CTX + 25 %). G1 work is DONE; only integration remains. The COORDINATOR (C-AG #10 session_01UV1SzjAd8BYMMz2rKFZitp) opens the successor.
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).

STATE / NEXT (integrator only)
- review/npc-purpose @964cfa7. G2 = session_01UV1SzjwFk9CyyTmPZT589k (review/npc-purpose-g2, remote a9b9584 at 05:14Z, no done sha sent yet), G3 = session_01UV1SzjE9iRFchoQnRUZm9r (review/npc-purpose-g3, remote 63007f9; its report section says done: scan G3 PASS, quickcheck ×2 PASS — no message to G1 yet). Both were told G1 #3's id; tell them the successor's id ("G1 #4 integrator = <id>; send your done sha to me + C-AG #10").
- Merge: `git merge` (never rebase) G3 then G2 into review/npc-purpose. Expected conflicts: jbal2 (G1 block lines after `Object.assign(BAL.ag.why.cd,{meHarm:6,…})` vs the `// G2 kinds` / `// G3 kinds` blocks after `BAL.ag.why={…}` → keep both sides), dev/test/npc-purpose-rows.json (rows of different groups; resolve by taking each row from its owning group — a short python merge by (f,line0,group) is safest), index.html/sw.js (regenerate: assemble + build_site). Then: `node dev/test/npc-purpose-scan.js --strict` (all groups), npc-why + g1..g1g tests, ag suites, quickcheck.
- G3 note: TW.gossip (jtwoway:72) is the live gossip deed; j68h SOC.gossip.run is replaced by it (G1 converted it anyway).
- When C-AG says "LIVE <sha>": merge live main, full gates (quickcheck ×2, coop-e2e ×3, G4, ag/npc suites, long suite, old save, scan --strict), before/after table here, then "SẴN SÀNG KIỂM <sha>" to C-AG #10.
- Worktree /home/user/wt/npcp (sparse; never run assemble while quickcheck runs). Row helper used: /home/user/wt/npcp-tmp/mark.py (writes rows json with indent=0 — keep that format).

## G3 — witness/target picks + agent-layer dice (worker G3, branch review/npc-purpose-g3)
PRIORITY #1 CHECK: OD L1833 (18/11 04:08Z "mục đích") + C-AG 18/11 (a) | main: none (jagwhy only on review/npc-purpose 77b50cd) | review/*: npc-purpose 77b50cd (STEP 0 helper reused, no 2nd helper) | claims: G1 / G2 sessions (other rows)
Handover line: START_CTX ≈ 5 % of the 1M window (own estimate; context_usage read 0).
Head: review/npc-purpose-g3 @ 63007f9 (off review/npc-purpose 77b50cd). Scan: `node dev/test/npc-purpose-scan.js --strict --group G3` → G3: open 0 · live-off 14 · done 43 · out 29 · PASS.
Rules kept: only npwPick / npcWit / npcTell / npcWhy from jagwhy; kinds registered in my own files (g3call, g3acc in jshelf; g3scape in jworld2); every new number in the `// G3 kinds` block of jbal2 (BAL.ag.why.g3 + cd.g3call/g3scape/g3acc); success odds stay BAL-rolled; only G3 rows edited in npc-purpose-rows.json. Old saves: no new required field (S.npw lazy, rtKid pend `by/w` optional, staff `bullyBy` optional).

### Before / after (done = now chosen by a goal)
| file:line | before (dice) | after (goal) | player sees |
|---|---|---|---|
| jmind:162 / 175 | slip = uniform pick of ANY option / all weights flattened | slip = npwPick among HER near-best options only (a misjudgement, never a random act) | fewer absurd NPC acts |
| jagent:117, jagday:182 | random free khắc for a planned deed | agSoon: near-best khắc from now (BAL.ag.why.g3.soon) | deeds happen soon after she decides |
| jagday:118 | 2nd goal of the day by a flat roll | 2nd goal only if its need ≥ g3.two × the 1st, near-best | days follow real needs |
| jagday:149 | re-plan by roll(need/touch chance) | re-plan when the new top need outweighs her current goal (+ touch), npwPick of new/keep | |
| jagacts:41/47 | random shop item | the finest gift she can afford (price), near-best | |
| jagacts:110 / 112 | Thái hậu frees a random cold-palace consort; random gift item | the one she regards most (th); an item the favoured one lacks | |
| jagstaff:110 (+ ask) | bullied at Nội vụ phủ by dice; random friend; random intel target | bully = a servant with a grudge against her (af < 0), none → none; friend = the one she likes; intel on her master's foe | |
| jshelf:259 | drop-in visit by 12 %/buổi dice | npcWhy g3call: ally need ≥ g3.call.min, cd 1 tuần, target = near-best liked | visits come from friendship need |
| jshelf:308 | accuse a shuffled target | npcWhy g3acc: the one she resents most (seen first) | |
| jshelf:313 / 340 | Thái hậu hears / rumour spreads by a flat roll per pair | npcTell: someone who SAW the room and resents the owner (or likes the listener) carries it; card names the teller | "Thái hậu nghe <X> nói phòng …" |
| j96:114 | random consort gains evidence | npcWit at loc96(): the watcher really there | |
| jroute:85/140 | random eyes≥2 consort finds the token / letter | rtFinder = npcWit at her place (eyes ≥ 2, hostility) | none there → nobody finds it |
| jroute:108 | random witness among those present | best watcher (npcWit) | |
| jroute:116 | non-greedy blackmails by a roll | blackmails only for silver she needs (g3.bmBac − bạc) vs her grudge (report) | |
| jroute:256 | random foe pieces the affair together | sharpest + most hostile foe | |
| jroute:259 | child-face rumour by a roll | npcTell: one who resents her carries it to Hoàng thượng; card names her | "<X> vốn oán ngươi, đã đem lời xì xào …" |
| jtwoway:72 | gossip lowers Danh of a random third | the teller's foe (hostility − min); none → harmless; line names her | "… rỉ tai … về <X>" |
| j76:113, j78:106 | maid reports / spies on a random rival | the one with the worst will to her mistress | |
| j61:99 | learns who someone is: 35 %/tuần dice | she stood where they are (npcWit) or a knower tells her (npcTell) | |
| j43:54/57 | random reporter; 50 % withholding | the house's eyes (agentW × loyalty); a double spy withholds unless loyalty wins | |
| j51:72 | heir lottery by weights | npwPick near-best of his lệ weights | |
| jworld:129 | random newcomer targeted | the newcomer who counts most (Sủng + rank) | |
| jworld2:101 / 165 | "Có kẻ đồn" by dice; random scapegoat | npcTell teller named; npcWhy g3scape: accuser with grudge ≥ g3.scape.min names her target | named gossip / accuser |
| jnroadm:101/103/104 | random rival man / clan / prince | man with tình ý for her; top clans by tdRel; strongest brother | |
| jsteal:40 | shuffled queue of night-stealers | who wants his night most first (stealWant u) | |
| jemoact:276/284 (+279/309/361/481/482 family) | weighted draw; random maid / friends / quarrel / coping card | npwPick by temper; maid she is least pleased with; friends she likes; worst-relation colleague; the affordable card that eases most | |
| j95:137 | weekly mood × random; random neighbours | mood from her real feeling (jemo: g3.mood); 2 she likes best | |
| j95:151 | Emperor busy 20 % / random leaning | busy = empBusy (ill / Chăm chính / court crisis); leaning = his favourite's intent buổi | |
| j95:226 / 230 | thái y: random patient + khắc; hawker random place | the one most in need (preg, weakest) at the soonest khắc; where most people are | |
| j95:434 / 442 | 25 % / 40 % dice | grudge vs regard (refuse / owe); grudge vs keeping the card (tell / hold) | |
| jvisit:90 | Thái hậu hears by roll | npcTell (the one who lost the night first); card names her | "Thái hậu nghe <X> kể …" |

### Out (29 rows): kept rolls = success odds or a goal-valid binary choice by the actor's real state
Each reason is in the row's "out" field of dev/test/npc-purpose-rows.json: j3:56 (dead: j51 reassigns heirMonth), jagday:108 (owner OD ~18:05Z storm = her choice by odds), jagemp:28/50, jagacts2:122/124, jagstaff:135/163/164/166, j95:147/182/438, j96:242, j61:235, j43:56, j51:63 (minister agent PARKED, PARKING_LOT #7)/66/71, jroute:240/241/268-272/275, jmline:39, jsteal:41.
Not converted (family, noted): j95:148 random buổi/spot of a plot errand when the route names no place (row 147 out); jroute exile/death odds.

### G3 gates (head 63007f9)
- npc-purpose-scan --strict --group G3: PASS (open 0 · live-off 14 · done 43 · out 29) · npc-why: PASS 10/10
- quickcheck ×2 on 63007f9: PASS / PASS (core gates PASS, old save ok, perf ≈ live) (+2 earlier PASS on 20a2940)
- ag suites: ag-all 21/21 · ag-all-b PASS (caught + fixed a scope bug: g3scape used jworld's private liveR → liveRivals) · ag-all-c PASS · ag-walk 10/10 · ag-know 25/25 · ag-truth 10/10 · ag-betray 20/20
- Not run by G3 (integrator gate): coop-e2e ×3, G4, long suite.
- Merge note for G1: jbal2 `// G3 kinds` block is two new lines right after `BAL.ag.why={…}`; G1/G2 blocks at the same spot may need a trivial both-sides keep.

## G2 — monthly no-actor chains + pre-palace (review/npc-purpose-g2 @ 8a51bac)
PRIORITY #1 CHECK: OD 18/11 ~04:08Z ("mục đích", no hên xui) + C-AG #9 PHASE 2 split | reused jagwhy.js (77b50cd), no 2nd helper | claims: G1 weekly + stray man, G3 witness/agent dice.
Handover line: START_CTX ≈ 6 % (own estimate; context_usage read 0). G2 = session_01UV1SzjwFk9CyyTmPZT589k (did the work with 4 sub-agents on disjoint file sets, merged with git merge).
- Rows: `npc-purpose-scan --strict --group G2` PASS (open 0 · live-off 17 · done 188 · out 2) · `--group G2-last` (jkc/jkc2) PASS (done 7 · out 3) + 4 extra G2 jkc rows (kcWeek, kcNews, kcSuit ×2) added as done.
- Out rows (reason in rows json): j54:124 Bắc Địch envoy arrives (world event; every palace choice after it converted), jkc:193 unnamed crowd stare, jkc:309 epidemic, jkc:369 creditor after the player refused the debt (consequence of her own choice).
- Kinds: dev/build/jagwhyg2.js (jlost loTake/loTry/loClear/loWear; jkc kcWeek/kcMeet/kcVh/kcSuit) + jagwhyg2a.js (j42/j29/jcmaid/jagknow/jagacts3/jstip: 23 kinds), jagwhyg2b.js (j54/j55/j53/jht/j70/j10/j25/j34: 17), jagwhyg2c.js (jface/jemo/jcmood/jinv/jil/j83/jrcp/jpet/jthaiy: 19), jagwhyg2d.js (jdh2/jcycle/jaudit/jlux/jeitem/jexam/jkh/jty/jtruth/jwd92b/jveil/jtds/jreign/j9/j13/j28/j32/j71: 21). Pattern everywhere: who = people who could act, why = s from her real state (grudge/aff/need/nết/bạc/rank/presence) + Vietnamese reason; old BAL odds kept only as SUCCESS of the chosen deed; no reason → nothing happens.
- BAL: block "// G2 kinds … // end G2 kinds" (sub-blocks G2a-d) right after BAL.ag.why in jbal2 (Object.assign lines). jcmood weights = BAL.ag.why.cmood (a and c both used `cm`; fixed).
- one-core-guard fix (dev/test/one-core-guard.js): `Object.assign(BAL.<path>,{k})` is now counted as BAL.<path>.k (it counted every key as top-level BAL.k, so cd.loTake vs why.loTake was a false "set 2 times"); a real duplicate on the same path is still caught (checked).
- ag-sell test: resets S.npw between its 40 picks / per rig (a seller who came now waits BAL.ag.why.cd.knSell tuần — the new design).
- j55 memorials: named clan heads' stakes drive memorials/consort court acts (existing court data), no row parked.
- Tests on 8a51bac: quickcheck ×2 PASS (core gates PASS, old save ok, perf ≈ live) · npc-why 10/10 · ag-all 21/21 · ag-sell 19/19 · ag-taimat2 16/16 · ag-betray 20/20 · ag-later 9/9 · ag-know / ag-taimat / ag-truth flaky (1 FAIL on some runs, PASS on rerun; ag-truth also FAILs on base 77b50cd) · npc-roads 21/22 (only fail = file:// fetch of VOICES.json, harness) · probes: 150 endTurn 0 errors (40 kinds, only h54Teach fires every time it is asked — a mother's duty on cooldown), pre-palace 200 weeks 0 errors.
- Known: dev/test/outside/route.js fails at '#slots button[data-new="1"]' (stale selector, also on base). BAL.lux.npcCalm/npcCalmProud and ag.par3.cnv.aff.see now unread (left in place).
- Player-visible (examples): reasons now named — "Tai mắt báo: X oán ngươi, cho người tra sổ nguyệt sự…", "X mời ngươi vào phe Y (cùng oán Z)", "Thánh chỉ: hậu vị bỏ trống đã lâu, Hoàng thượng rước…", dress gossip "<rank name> vốn có hiềm khích, đem chuyện ngươi phung phí đồn khắp cung", maid report "hôm nay thấy V ở <nơi>"; events with no motive no longer happen (robbery without an enemy, frame without envy, Emperor's strike while he still favours her, item vanishing with no taker).
- Merge note for G1: assemble.py list gets 'jagwhyg2.js','jagwhyg2a.js'…'jagwhyg2d.js' right after 'jagwhy.js'; jbal2 G2 block sits at the same spot as G3's → keep both sides. Site rebuilt on the branch (index.html/sw.js) — take a fresh build after the merge.

## INTEGRATION (G1 #4 integrator session_01UV1SzktT6YzdpEuSryJ3J1, 18/11 ~07:10Z)
PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 8 | main 0 | review/* 3 — reused review/npc-purpose (jagwhy helper, motiveOK j95, P95B j95b); no new helper/gate.
Handover line: START_CTX ≈ 4 % of the 1M window (own estimate; context_usage read 0).
Head review/npc-purpose @b723a1e = G1 964cfa7 + G3 63007f9 + G2 8a51bac + live main 9bbd78b (all by git merge, no rebase). Base still review/ag-all-2-land 47568e9 — waiting C-AG "LIVE <sha>" for the final merge + gates.
Merge resolutions: jbal2 G1 / G3 / G2 blocks after BAL.ag.why all kept (both sides); assemble.py list = union (jagwhy.js, jagwhyg2*.js, jagwhy1.js); jmen.js (main men-forbidden 13286b4/7090b01 vs G1): thái y = G1's pick by need (npwPick), vương gia = main's rule (no festival stand in the hậu cung) + menLawful/menLoadFix from main; rows json auto-merged and checked row-by-row against each owning group's branch (0 diffs); index.html/sw.js rebuilt.
Kept from G2 (reviewer note): dev/test/one-core-guard.js counts Object.assign(BAL.<path>,{k}) as BAL.<path>.k (path-aware; real same-path duplicate still fails).
Integrator fix: dev/test/agmaid_check.js "off switch BAL.ag.on=0" expected the old blind roll(3) for fake illness in rivalNight (j8); G1 made it npcWhy("fakeIll") → the check now asserts no blind roll 3 (23/23 PASS). Same family scanned: no other test asserts an old roll on the off switch (ag-stf2 grep hit = 0 FAIL).
| gate (b723a1e / 0178db5) | result |
|---|---|
| npc-purpose-scan --strict (all groups, 412 rows) | PASS · G1 open 0/done 108/out 8 · G2 open 0/live-off 17/done 182/out 1 · G2-last done 7/out 3 · G3 open 0/live-off 14/done 43/out 29 |
| one-core-guard | PASS |
| npc-why + npc-purpose-g1..g1g | 10 + 11/9/8/11/10/11/11 PASS |
| ag-all 21, ag-all-b, ag-all-c, ag-walk 10, ag-know 25, ag-truth 10, ag-betray 20, ag-sell 19, ag-later 9, ag-carry 9, ag-soft 19, ag-taimat 25, ag-taimat2 16, ag-paywin 9 | all PASS (ag-know flaky once after the G3 merge, PASS ×3 on rerun) |
| long suite: agmaid 23, agent 16, agemp 20, greet 13, ag-kh2, ag-rd, ag-mgcal, ag-dayk, ag-mg2 26, ag-mgh, ag-par3, ag-stf2, ag-toil2, ag-wx, world_check, world_check2 | all PASS / 0 FAIL |
| men-forbidden | bad = [] |
| npc-roads | 13/14 (only fail = file:// fetch of VOICES.json, harness; same as G2 noted) |
| coop-e2e ×3 (live Worker) | 63/63 · 63/63 · 63/63 |
| quickcheck ×2 (incl. core gates G4 50-coop-one-world, old save) | PASS · PASS |
PERF WATCH: vs today's live main buổi reads +20-80 % (noisy; one run 1858/1010, the next 948/1138). Against review/ag-all-2-land (same code minus npc-purpose), quickcheck.js 5 runs: buổi 1067/1082 ms, render 185/199, tab 392/395 → npc-purpose adds ≈ 0; the gap vs live is ag-all-2's own cost. Engine-only probe (80 × nextBuoi, no UI): 13.8 s new vs 14.4 s live main. Final measure on the head after LIVE.
NEXT: on C-AG "LIVE <sha>": git merge it, rebuild, full gates again, perf vs the new live, then "SẴN SÀNG KIỂM <sha>" to C-AG #10. Worktree /home/user/wt/npcp.
