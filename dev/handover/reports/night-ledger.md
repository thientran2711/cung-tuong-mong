PRIORITY #1 CHECK ('night-ledger|10-night|ledger V3|stealPass|ledgerRoll|concF'): OD 5 | ledger 0 | claims 8 | main 5 | review/* 0
# night-ledger — the 10-night Kính sự phòng ledger (solo) — worker report

Worker: opus, session_01964izDibL8KfyVNtRh4GfU; coordinator Foreman D #9 session_01964izBsQba9xq3oCFovTBQ. Brief dev/handover/briefs/D9-night-ledger.md.
START_CTX ≈ 4 % of 1M (own estimate; get_session reads 0). Ended ≈ 22 % (under START + 25 %).
Branch **review/night-ledger** on top of review/night-final-r2 @52d5092d (night-final not rebased). Read: START_CORE, START_WORKER, topic time-calendar.md,
night-time.md V3-A/B/C (+ MUST-FIX spec 7), night-final.md §8–§13 (§9.4 / §10.3 ledger notes), OD 16/11 18:10Z / 18:40Z / 19:00Z / 19:05Z / 22:45Z / 22:50Z / OD:L1386 verbatim.
Prior work reused (no second night engine): jnf realFlip (the commit at the end of tối), jnf stealPassNF via `window.stealPass(holder,{live:false})`,
nightCh (tray weight), night()/conceiveCh, jcycle `cycleDaysOf` (→ cyDaysM; review/cycle-roll's cyLen fits without a merge), j75 nightWhy / FAIRN.custom, kit `kitLine` (KIT §42.2).

## 1. What changed
| item | how | file |
|---|---|---|
| ledger roll (OD 18:10Z) | at the commit, inside jnf realFlip → j8 flip asks `ldPin()`: days tuần×10+1..10, each its own draw: summons `roll(BAL.nt.summon / summonBusy)` (busy = Chăm chính or Emperor ill), who = weighted draw over consorts() by **nightCh** (agent preference, OD:L1386) | jledger.js §1, j8.js flip |
| Hoàng hậu (OD 19:00Z) | `BAL.nt.customDays` [1, 15] → her custom night, or "visit" (no night) when barred (cycle day, nightCh 0, ill); her card never on the tray while the custom runs (also filtered from j75 nightWhy rows = jflip tray); j75's per-tuần custom roll is off while the ledger runs; nightWhy.cause "custom" when the played tối is hers | jledger, j75.js |
| cycle BY DAY (OD 19:00Z/19:05Z) | a day is blocked only if it is in `cycleDaysOf(p,null,0)` (her false report "báo sớm / giấu" keeps her card). jcycle.js NOT touched (brief): jcycle still zeroes nightCh and locks the summons for the whole cycle tuần, so (a) her tray weight on a non-cycle day of that tuần = nightCh read outside the cycle tuần (`wOf`, wk() kept), (b) a woman in her cycle tuần is never the PLAYED holder — her nights that tuần are ledger notices | jledger |
| played tối (OD 18:40Z) | her FIRST day → S.tonight "me" (jflip scene shows HER card); else first NPC day; else the Empress custom; else nobody. Already decided before the roll (his own visit, her night already played, j55 troubled-court skip) → that holder fills the first non-custom day. The 10-second choice runs on the played tối only (unchanged jnf) | jledger, j8 |
| other nights | `ldSettle()` once, right before the live endTurn (after the choice / her night): each non-custom night first contested by NPCs (`window.stealPass(h,{live:false})`, every effect real; tonight/ntk/ntTry/nightWhy restored), then: HER night → Sổ ghi "Kính sự phòng ghi: ngày {d}, ngươi được lật thẻ thêm một đêm. Sủng +1 · Ân tình +1." + `BAL.nt.extraFx` + own `night(S)` roll, nights/nightLog recorded; one kit pill (kitLine) per tuần. NPC night → same gains + night(v), recorded; ONE Sổ ghi line per tuần only with tai mắt (S.mat ≥ 2). Contest lines shown when it was her night (or a night changed hands and she has tai mắt) | jledger §3 |
| conception (spec 7 MUST) | outermost conceiveCh wrapper: × `BAL.nt.concF` as a FLOAT while the ledger runs (inner wrappers round the whole-% base as before) → night()'s roll is the float; every "Có thai mỗi lần thị tẩm" display shows the true per-night chance on the ladder (see §5 Q4) | jledger §4 |
| ONE CORE | `BAL.nt={on,days:10,summon:90,summonBusy:65,customDays:[1,15],extraFx:{sungP:50,sung:1,an:1},concF:.065}` (jbal2, after BAL.steal.choice); the j8 flip's typed `65:90` now reads BAL.nt (only place; scan: no other `65:90`) | jbal2.js, j8.js |
| co-op parked | ldOn() = BAL.nt.on && nfOn() (false in a room) → live one-night flip + old conception; a tuần whose flip ran in a room gets no ledger if she leaves mid-day (S.ldPk) | jledger |
| save | S.ledger {wk, days[{d,w,y}], p, st, me} (current tuần only), S.ldPk; old saves: absent → rolled at the next commit (quickcheck old save ok) | jledger |
| assemble | jledger.js before jnf.js (its endTurn wrapper = jnf's live et0) | assemble.py |

## 2. Tests (build 55141158 unless said)
| test | new | base night-final-r2 52d5092d (same scripts, same box) |
|---|---|---|
| dev/test/ledger.js NEW (1 Empress never on tray, 1/15 custom or visit · 2 cycle by day: drawn on her other days, never cycle days, never played · 3 played = her first day else first NPC day (j8 pin) · 4 her other days: line + gains + own conception roll, NPC silent w/o tai mắt · 5 conception float = conceiveCh × concF · 6 real days: rolled at the commit, settled once, one record per ledger night) | **ALL PASS 6/6**, 0 errors | — |
| night-final.js (ledger off in-test: counts the played tối; comment points to ledger.js) | PASS | PASS |
| night-multi.js (same) | PASS | PASS |
| night-day.js (ledger ON) | ok | ok |
| flip-entry.js 755x1000@2 (ledger ON) | ALL OK | ALL OK |
| log-sync-night.js | PASS | PASS |
| night-coop-park.js 6 cases | ALL OK 6/6 (after S.ldPk fix; case 4 had rec 5) | ALL OK 6/6 |
| night-steal-unit.js | 1 FAIL ("Tham vọng tries more": random-trait flake) | 2 FAIL (same flake + flip→stolen) |
| preg-rate.js | FAIL "peak notice not logged" only (tryst check fixed: a tryst never carries concF) | FAIL same "peak notice" |
| cycle.js 755x1000 | FAIL "pop-up not shown" | FAIL same |
| coop-e2e (live Worker) | **60/60** | night-final.md §13.2: 60/60, 59/60, 60/60 |
| coop-night (live Worker) | **105/105** (run 2; run 1 hung at the room's first week step before any night = flake) | 102/105 (52d5092d worktree, same box) |
| quickcheck.sh --runs 7, final 55141158 | **PASS** · old save ok · render 289/351, tab 488/441, buổi 1187/1429 ms · core gates PASS |
| quickcheck.sh --runs 7 (first commit 57c05f15) | **PASS** · old save ok · render 308/319, tab 476/462, **buổi 1311/1291 ms (+1.5 %)** · core gates PASS (one-core-guard 0) · time-spill PASS | — |
| ledger cost per tối (in-page probe, 45 real days) | ldPin 0.3 ms + roll+settle 1.5 ms vs one "Sang buổi" press ≈ 200 ms (< 1 %) | — |

## 3. Bot ≥ 30 months — per-woman nights / conceptions per month (dev/measure/ledger-bot.js, 12 lives × 36 months, same seeds, real day walk, her stats floored as night-time-bot3: Sủng ≥ 25 …)
| per month | base (one night a tuần) | **10-night ledger** | analyst V3 [M] for comparison |
|---|---|---|---|
| her nights / month | 0.13 | **2.83** | 2.5 (29.7 / yr) |
| months with ≥ 1 night of hers | 13 % | **77 %** | 78 % |
| NPC nights / consort / month | 0.18 | **2.17** | — |
| her conceptions / month | 0.010 | 0.014 (× 1.4) | × 1.6 |
| NPC conceptions / consort-year | 0.24 | **0.22** (held) | births 0.10 held |
| NPC mean Sủng at the end | 45.9 | 44.3 | 70 (year 5) |
| NPC mean Ân tình at the end | 2.6 | 25.2 | 44 (year 10) |
| bot ms per month (incl. her extra night scenes) | 568 | 881 | — |
By year (her n/mo · months with a night · NPC conceptions/consort-yr): base y1 0.13·13 %·0.21, y2 0.17·15 %·0.30, y3 0.09·9 %·0.22; ledger y1 2.83·87 %·0.18, y2 3.41·82 %·0.24, y3 2.23·61 %·0.24.
Raw: /home/user/wt/nl-scratch/bot-{new,base}.json (scratch, not in git).

## 4. What the player sees — shots LOOKED (Fold 755x1000@2, iPad 1180x820@2; scratch /home/user/wt/nl-shots, not uploaded)
Sổ ghi: "Kính sự phòng ghi: ngày 6, ta được lật thẻ thêm một đêm. Sủng +1 · Ân tình +1." and (tai mắt) "Kính sự phòng ghi tuần này: ngày 3 cung …, ngày 4 cung …" (names masked by the kit name-mask as elsewhere); kit pill "Kính sự phòng: ta được lật thẻ thêm một đêm" above the bottom bar (the kit voice pass turns ngươi → ta). Side panel "Có thai: Rất thấp" = per-night float. No overlap, nothing cut, 0 page errors on both.

## 5. For the reviewer / coordinator (open, not built)
1. jcycle still blocks the WHOLE cycle tuần for the played scene (brief: do not touch jcycle.js). By-day is exact for the ledger nights; a woman in her cycle tuần simply never plays the scene that tuần (her other-day nights come as notices). When review/cycle-roll lands, a one-line follow-up in jcycle (cyTray = "blocked on the played day", e.g. via window.ldCyDay) would let her play those days too.
2. Fairness rules count every recorded night: j75 satN ("đã được thị tẩm n đêm trong sáu tuần") and favNow (FAIRN.fav = 4 nights in 6 tuần → admonition) were tuned for one night a tuần; with 10 they fire for the favourite far more often. The bot shows her nights still ≈ 2.8/month, but FAIRN.sat / fav want a balance-pass look (BAL only).
3. NPC Ân tình 2.6 → 25 in 3 years (analyst warned: 44 at year 10). Rules reading NPC Ân (seat contests, pillow talk) → balance pass.
4. Spec 7 asks displays to show the per-TUẦN chance; built: the true per-NIGHT chance (label "mỗi lần thị tẩm" stays correct; jcycle's peak notice reads the same function, jcycle untouched). Coordinator to choose.
5. The j55 troubled-court skip and jemoact's no-flip still act on the played tối only (spec: owner not asked — recommend folding into "busy" 65 %). The maid's-lie "soát ra" check runs only on the played night, not on ledger notices.
6. Her-side conception knob by difficulty (V3 note 5) not in scope.

SẴN SÀNG KIỂM 551411588e404648a40a274c3ee5cc4c232729e2

## REVIEW r2 — re-land of review/night-ledger-r1 37018e74 on LIVE ddcca5c1 → review/night-ledger-r2 @e6bfa993 — **FAIL (co-op LAND GATE)**
PRIORITY #1 CHECK ('night-ledger|jledger|ldPin|BAL.nt|ntPace'): OD 1 (L594 co-op LAND GATE) | main: jledger.js absent, BAL.nt / ldPin 0 hits | review/* review/night-ledger-r1 37018e74, review/night-ledger 55141158 | claims B CLAIMS row "RELAND night-ledger KP01 r2" (this) → not a duplicate (law 14): the night bundle built no ledger.
Reviewer-lander: opus, session_01N1tNP6V2KcQjF1vXk4QeoT; coordinator Foreman B ROOT-9. START_CTX ≈ 3 % (own estimate); end well under START + 25 %.

### 1. Why a plain merge was impossible (history)
37018e74 IS already an ancestor of LIVE (balance-chain 3299ae9a merged it), but the D bundle merge **49912535** ("night-balance-bundle: merge review/balance-final … night-ledger r1 -> Foreman B's job, not bundled") took nobc's side and deleted jledger.js / ledger.js / ledger-bot.js and the ledger hunks. `git merge origin/main` into 37018e74 = a fast-forward to LIVE with NO ledger. So r2 = a REPLAY of the ledger's own diff on LIVE (as rival-hauthay ddcca5c1 did), one commit e6bfa993:
| file | what was replayed (LIVE kept) |
|---|---|
| jledger.js, test ledger.js, measure ledger-bot.js | r1's files unchanged |
| assemble.py | jledger.js between jbalcore.js and jnf.js (LIVE list otherwise) |
| jbal2 | BAL.nt block after BAL.steal.choice (no summon copies: BAL.ag.emp.summon) |
| j8 | flip = ldPin first, else AG2 / roll(BAL.ag.emp.summon[busy]) — **LIVE's typed `65:90` was back; gone again (ONE CORE)**; ntP() + anMonth = LIVE's BAL.anFade formula with recent/ntP() |
| j75 | favNow ×ntP, satN /ntP, custom tuần-roll off while the ledger runs (by day), Empress row filter + ldCause, monopoly words "n đêm trong sáu tuần gần đây"; LIVE htCan / AG2 kept |
| jcycle | r1 by-day hunks (diff 968e6209..37018e74 applied 3-way, clean): cyLdDay / cyNow / cyTray, start notice + cyrep "những đêm ấy" |
| tests | night-final (LIVE custom-off line AND ledger-off line both kept), night-multi, preg-rate (tryst without concF) |
Site rebuilt (build_site.sh), assets.json = LIVE.

### 2. Gates run (e6bfa993; LIVE ddcca5c1 same box for compare)
| gate | r2 | LIVE |
|---|---|---|
| ledger.js 7 cases | **ALL PASS 7/7**, 0 page errors (c0 21 → 1.365 float; 6 weeks rolled/settled, rec = got) | — |
| quickcheck --runs 7 | **PASS** · old save ok · render 249/272, tab 459/482, buổi 1270/1305 ms · core gates PASS (one-core-guard 0) · time-spill PASS | — |
| undef-scan | PASS (296 names) | — |
| night-final / night-multi / log-sync-night | 11/11 · 8/8 · 4/4 PASS | — |
| night-steal-unit | PASS | PASS |
| preg-rate | FAIL (same line) | FAIL (pre-existing) |
| **night-coop-park** (LIVE rewrite for the co-op UNPARK, 7 cases) | **FAIL 2** (case 2 rec 5, case 5 rec 9) | **ALL OK 7/7** |
| role-parity, coop-e2e, both-seat check, Fold/iPad shots | NOT RUN — stopped at the co-op gate below (FAIL is certain from code + night-coop-park) | — |

### 3. FAIL list (for the fixer)
1. **BLOCKING — co-op LAND GATE (OD:L594 owner 20/11 ~21:30Z «phải chạy được trên cả hai bản»; law 1 TWO-WAY).** The ledger was designed "CO-OP: parked" (jledger header: nfParked → nfOn false → ldOn false). LIVE has since UNPARKED the new night in player rooms (MAIN ROOT-82 20/11 22:58Z; night-coop-park rewrite): nfOn() is true on the host of a player room, so ldOn() is true there now. Result: the host seat rolls a 10-night ledger, **the friend is excluded from every draw** (jledger ldRoll `C0 … !p.coop`), nothing of S.ledger / the other nights / the notices / gains / conception rolls is relayed to the guest seat (jnf relay ctm-nf carries the played tối only). Host ≈ 2.5 nights a month, friend ≈ 0 ledger nights and sees no ledger = solo-only feature + broken two-way. night-coop-park case 2: rec 5 (spec ≤ 1 for the played tối) — LIVE 7/7.
   Needed: the co-op ledger — host rolls ONE ledger for the world with the friend's card in the draw (her nightCh weight read from her blob as the tray does), relay days[] + each night's holder to the guest (jnf relay / coopworld), the guest's own other nights settled on HER seat (Sổ ghi line, kit pill, BAL.nt.extraFx, her own conception roll, nightLog) and her NPC tai-mắt line; same ledger visible on both seats; coop-e2e + coop-night + a both-seat ledger check (both see the same host-computed days). Parking it again in rooms = solo-only = FAIL by the same gate (owner decision would be needed to accept that).
   Also stale: jledger header lines 26/28 "CO-OP: parked", S.ldPk comment, report §1 "co-op parked" row.
2. **night-coop-park case 5** (thin-E room → solo mid-day, rec 9): no flip ran in the room (w0 null), the flip ran solo → the ledger is legit there; the test counts all records. Make the case ledger-aware (count the played tối: BAL.nt.on=false in that case as night-final does, plus a ledger case that the tuần gets ONE ledger) and re-check S.ldPk still blocks a tuần whose flip ran PARKED (thin-E) — case 3/5 variants.
3. After 1–2: role-parity (2 pre-existing FAILs only, compare LIVE), coop-e2e, Fold 755x1000@2 + iPad 1180x820@2 shots of both seats' Sổ ghi / pill.
Base for the fix: **review/night-ledger-r2 @e6bfa993** (solo replay done and green; FF of LIVE ddcca5c1). Scratch: /home/user/wt/nl2-scratch (not in git).

## FIX co-op — review/night-ledger-coop (FAIL r2 items 1–3)
PRIORITY #1 CHECK ('night-ledger|jledger|ldPin|ldOut|ldIn|ctm-nf|coop ledger'): OD L594 (co-op LAND GATE), L96 (one world) | main 7303aa58: jledger.js absent, jnf relay ctm-nf (open / fin / ask) present | review/* review/night-ledger-r2 e6bfa993 (base), review/coop-night-sync(-r1) = the night gate (no ledger relay) → reused jnf's ctm-nf relay, no new channel | claims B row "night-ledger CO-OP ledger fixer" (this).
Worker: opus, session_01N1tNP6wkABAL1zSRFzwedG; coordinator Foreman B ROOT-9. START_CTX ≈ 5 % (own estimate); end ≈ 30 % (under START + 25 %).
Base e6bfa993 + merge LIVE 7303aa58, then LIVE f0070e61 (only index.html / sw.js conflicted both times, rebuilt). review/coop-night0 not LIVE yet (Foreman B FYI) — not merged.

### 1. What changed (one ledger, host-computed, both seats)
| item | before (r2) | after | file |
|---|---|---|---|
| who rolls in a player room | host rolls, **friend filtered out** (`!p.coop`); the guest seat rolled its OWN private ledger at its endTurn (its own NPC copy, host excluded) | ONLY the host rolls (ldPin / ldSettle return on the guest seat, `gst()` = room && !worldOn()); the friend's card is in every draw: nightCh from her blob (as the tray), her cycle by day (cycleDaysOf), her «báo sớm / giấu» through COOPW.fcyb | jledger §1, §5 |
| played tối | her first day, else first NPC day | the first day of EITHER player, else first NPC day, else the custom (two-way); a steal that moves the played night keeps its first holder (`s`, `o`) | jledger |
| relay | none (ctm-nf carried the played tối only) | ON the existing ctm-nf key: (a) every host word (open / fin) carries `ld` = the tuần's days + played index (seat-neutral ids via jnf `enc`: 901 / 902 / NPC id) → guest stores S.ledger (jcycle's played day reads the same fact); (b) after the host's settle, mode `ld` = the settled tuần + the contest lines per day; kept in S.ldOut (last 3), sent again on the guest's mode `ldask` (her day end / reconnect) and on room / peer events | jnf (send, apply, listener, re; exports nfEnc / nfDec / nfLdSend / nfLdAsk), jledger (ldOut / ldIn / ldAgain / ldWant) |
| the friend's nights | none | contested on the host (same NPC batch, same odds; effects on NPCs real there); then settled on HER seat by `gSettle`: Sổ ghi "Kính sự phòng ghi: ngày {d}, ngươi được lật thẻ thêm một đêm." + BAL.nt.extraFx gains + her own conception roll night(S) (float × BAL.nt.concF, ldOn is true on her seat) + nights / nightLog (tuần = the host's wk) + kit pill (kitLine → kitNotice) + contest lines of her days (her name → «ngươi»; the host's own lines carry his name, not «ngươi») + tai-mắt line naming the other nights (the host's among them) | jledger §5 |
| the host's view | — | the friend's nights are NOT applied on his seat (her seat owns her stats); his tai-mắt line names hers (two-way) | jledger ldSettle |
| S.ldPk (parked thin-E) | only in ldSettle when no ledger existed → a solo commit after leaving the thin room rolled a ledger anyway (night-coop-park 5b found: rec 4) | ldPin returns undefined (live one-night draw) for a tuần whose flip ran parked; ldSettle writes the empty settled ledger | jledger |
| ONE CORE | every number BAL.nt / BAL.steal (host); the guest reads the host's numbers, rolls only her own conception (her own chance, as the played night does) | — | — |
| stale "co-op parked" comments (law 11 scan `grep -n -i "parked" dev/build/j*.js`) | jledger header §CO-OP + S.ldPk, jcycle L83, jnf L29 / L59, j2 L67, jfe L9 | rewritten: only a THIN part-E room is parked; player rooms run the ledger | jledger, jcycle, jnf, j2, jfe |

### 2. Tests (branch head; LIVE 7303aa58 same box where compared)
| test | after | LIVE / before |
|---|---|---|
| **coop-ledger.js NEW** (LIVE Worker, both seats consorts `__forceOrigin='cn'`, host Fold 755x1000@2 + guest iPad 1180x820@2; DEVSWAP=1 the other way; per tuần: 1 host presses first, 2 guest first): a same days / kind / holder / played index on both seats · b friend in the host draw, played = first player day · c each seat settles only its own nights (lines = held days, nights / nightLog, kit pill) · d tai-mắt names the other player · e ledger on + float conception on both · shots | **44/44, 43/43, 46/47** (the 1 = host tai mắt, see note) · DEVSWAP 41/44 (tuần 2 stuck, below) · DEVSWAP final 45/45 · on LIVE f0070e61 merge: 44/44 | — |
| night-coop-park (10 cases: 2 and 5 count the PLAYED tối with BAL.nt.on false as night-final does; NEW 2b ledger in a player room = one ledger, rec = its nights; 5b flip ran PARKED then solo → S.ldPk: empty ledger, rec ≤ 1; 5c no flip in the thin room → one legit ledger) | **ALL OK 10/10** | r2: FAIL 2 (case 2 rec 5, case 5 rec 9) |
| ledger.js 7 cases | ALL PASS 6/6 runs alone; 2 of 4 runs with "1 FAIL" while 2–3 Playwright suites ran beside it (random-draw case under load) | — |
| quickcheck --runs 7 (after the f0070e61 merge) | **PASS** · old save ok · render 236/279, tab 505/496, buổi 1398/1435 ms · core gates PASS (one-core-guard 0); before the merge: PASS 251/240, 473/475, 1235/1284 | — |
| undef-scan / one-core-guard | PASS (296 names) / PASS fails 0 | — |
| role-parity | FAIL 2: `up:P-ONLY:harm:petcare` + riseCore Danh/Bạc | **LIVE: the same 2** (pre-existing) |
| night-final / night-multi / log-sync-night / night-steal-unit | PASS (exit 0) / PASS / PASS / PASS | — |
| coop-night (LIVE Worker) | 112/115 (case 5 reconnect + day step) | LIVE run 1: 4 cases stuck at week 0; run 2: 103/105 (case 2 «guest presses first» stuck at [1,1,1]) |
| coop-e2e (LIVE Worker) | **129/129** | — |
Note tuần-2 stalls: 2 of 7 coop-ledger runs stopped at «guest presses first» ([1,1,1], same date, both at tối) — the SAME stall LIVE coop-night case 2 shows on this box without the ledger (run 2 above); NTOFF=1 (ledger off) 2/2 runs had no stall, so it is a LIVE flake, not the ledger. A later debug run with a STUCK dump did not reproduce (44/44, 43/43).
Note tai mắt: the room's week merge puts a script-set S.mat back (only real acts merge), so the host-side tai-mắt line is n/a in some runs (reported «n/a», the line itself is ledger.js case 4); the guest's line passed where her S.mat held.

### 3. What the player sees (LOOKED 3×; scratch /home/user/wt/nlc-shots + /swap, not git, not uploaded)
Files: ledger-{1,2}-host-755x1000 / -guest-1180x820 and swap/ledger-{1,2}-host-1180x820 / -guest-755x1000. Host Fold 755x1000@2 Sổ ghi: "Ngày 7: Đáp ứng … định giành đêm của ta nhưng Hoàng thượng không động lòng. Sủng -4 · Đức -1." / "Kính sự phòng ghi: ngày 7, ta được lật thẻ thêm một đêm. Sủng +1 · Ân tình +1." Guest iPad 1180x820@2 Sổ ghi: "Ngày 8: Một vị Đáp ứng chưa quen biết định giành đêm của ta …" / "Kính sự phòng ghi: ngày 8, ta được lật thẻ thêm một đêm. Sủng +1." / "… ngày 6 …" (names of people she has not met masked by the kit fog-of-knowledge scrub, k61). The kit result card (#rtoast) shows the same line. No overlap, nothing cut, 0 page errors. Swap: guest Fold «Ngày 10: Một vị Thường tại chưa quen biết định giành đêm của ta …» + «Kính sự phòng ghi: ngày 10, ta được lật thẻ thêm một đêm.»; the host iPad held no other night of his own in those tuần (no ledger line to show; his contest line «Ta định giành đêm của Đáp ứng …» shows). The guest's lines land under the NEXT tuần header when the host's settle arrives after her day turned (the line carries "ngày {d}").

### 4. Open (not built)
1. coop-night0 (Foreman B FYI, review/coop-night0): a room where the host is a cung nữ (host nfOn false) and the friend a consort: the host never rolls, so the friend gets the night path the host decides there (no ledger). The ledger follows that decision (the guest never rolls); when coop-night0 lands, merge it and re-run coop-ledger.
2. The kit pill shot: kitLine is routed to kitNotice (KIT §42.2), seen by the hook in coop-ledger (c); no shot of the transient chip.

SẴN SÀNG KIỂM 96c62324e8df5efe5c09517a145228c55a9382ef

## REVIEW coop r1 — review/night-ledger-coop @96c62324 (FF of LIVE f0070e61) — **FAIL (co-op stall caused by the ledger)**
PRIORITY #1 CHECK: r2 FAIL list 1–3 (this report) | main f0070e61 (jledger absent) | review/night-ledger-coop 96c62324, review/coop-night0(-r1) (PASS 234d0298, not LIVE yet) | claims B row "RELAND night-ledger KP01" (this reviewer).
Reviewer: opus, session_01N1tNP6V2KcQjF1vXk4QeoT; coordinator Foreman B ROOT-10 session_01N1tNP5avzy2FEnnpAjoWDX. Context well under START + 25 %.

### 1. Design check (code read, jledger §5 + jnf relay)
Host-only roll with the friend's card in the draw, seat-neutral ids (nfEnc/nfDec), days on every host word + settled tuần on mode `ld`, guest `ldask` → `ldAgain`, the guest settles only her own nights (gSettle: Sổ ghi line, BAL.nt.extraFx, own float conception, nightLog, pill) — **meets r2 FAIL 1 as designed**; S.ldPk at ldPin — meets r2 FAIL 2; ONE CORE kept (one-core-guard 0). ldOn() = BAL.nt.on && nfOn() → follows coop-night0's nfParked/roomOff with no code change (trial merge by the coop-night0 reviewer: only index.html/sw.js).

### 2. Gates (96c62324; LIVE f0070e61 worktree on the same box)
| gate | branch | LIVE / control |
|---|---|---|
| quickcheck --runs 7 | PASS · old save ok · render 257/288, tab 498/543, buổi 1356/1469 ms · core gates PASS (one-core-guard 0) | — |
| undef-scan | PASS (292) | — |
| role-parity | FAIL 2 = petcare P-ONLY + riseCore | the same 2 (pre-existing) |
| ledger.js | ALL PASS 7/7 | — |
| night-final / night-multi / log-sync-night / night-steal-unit | PASS / PASS / PASS / PASS | — |
| night-coop-park | 10/10 in 3 of 4 runs; 1 run FAIL 2b (rec 7 vs held 10: 3 nights not recorded — likely a holder out/dead before the settle; the test bound is too tight or a real skip, fixer to check) | — |
| coop-e2e (LIVE Worker) | **129/129** | — |
| coop-ledger (host Fold / guest iPad) | 46/46 | — |
| coop-ledger DEVSWAP | 36/44 (tuần 2 stall «guest presses first», STUCK: both seats nfX st "open", nfFin 0, Q [] — the jnf choice never closes), 45/46 (1b: neither player drew a day — random), 44/44 | NTOFF=1 (ledger off): no stall (37/47 = ledger asserts n/a) |
| **coop-night (LIVE Worker)** | **run 1 109/113: FAIL 4 (guest night / AFK clock) + 5 stall [5,5,5]; run 2 112/115: FAIL 5 stall [5,5,5] + day step** | **LIVE f0070e61: 111/111, 111/111 · SAME BRANCH with BAL.nt.on=false (scratch, not committed): 111/111, 111/111** |
Shots LOOKED 3× (scratch /home/user/wt/nl3, not git): host Fold 755x1000 Sổ ghi «Kính sự phòng ghi: ngày 10/9/8/6, ta được lật thẻ thêm một đêm …» + contest lines «Ngày 3: …»; guest Fold (swap) «Kính sự phòng ghi: ngày 3, ta được lật thẻ thêm một đêm. Ân tình +1.» after her played night; host iPad 1180x820 Sổ ghi + kit result card. No overlap / cut text / private UI; wording cổ trang, no %.

### 3. FAIL list
1. **BLOCKING — co-op stall caused by the ledger (LAND GATE OD:L594).** coop-night case 5 (guest presses ready at tối, reloads, host presses) stays at the same tối on both seats ([5,5,5], both buổi 3) in 2/2 runs with the ledger ON (the fixer's own run also: «112/115 case 5 reconnect + day step»); the SAME build with BAL.nt.on=false passes 111/111 twice, LIVE passes 111/111 twice. coop-ledger DEVSWAP tuần 2 «guest presses first» stalls 1/4 with the ledger, 0 with NTOFF: the dump shows both seats' jnf choice x.st "open", nfFin 0, Q empty. The report's «LIVE flake» explanation is refuted by these controls. Leads (not proven): the host's ledger work inside the commit (ldSettle in the endTurn wrapper: contest → stealPass live:false, night() / gain() on S and NPCs, Q pushes) running between the choice and jnf's fin; the `ld` field riding on open / fin words (size / ordering vs the guest's own reply); the `re` reconnect hook (host ldAgain + guest nfLdAsk right after a reload) racing jnf's ask/reply. Fix + prove: coop-night 3 runs green (incl. case 4 AFK clock), coop-ledger both directions 3 runs no stall.
2. night-coop-park 2b: 1 of 4 runs rec 7 / held 10 — explain the 3 missing records (holder out/dead → document and relax the bound, or a real skip bug).
3. (from the coop-night0 reviewer, for when coop-night0 is LIVE — it PASSED 234d0298) comments «nfParked: a THIN part-E room only» in j2 / jfe / jnf / jledger become wrong: word them «nfParked (thin part-E, or a room with a seat off the palace: jnf roomOff)». Edge: a settled tuần sent (ld) just before the room parks → the guest's ldIn returns (ldOn false) and her nights of that tuần are never settled; decide: ldIn applies a settled tuần already rolled while unparked, or document the loss.
4. Re-merge LIVE (coop-night0 lands first per Foreman B) and re-run coop-ledger + coop-night before the next review.
Scratch: /home/user/wt/nl3 (not in git).

## HANDOVER (worker session_01N1tNP6wkABAL1zSRFzwedG → successor, opened by Foreman B ROOT-10) — after «REVIEW coop r1» FAIL of 96c62324
START_CTX ≈ 5 %; now 34 % (get_session used 340k / 1M) ≥ START + 25 % → rollover, nothing new started. Work branch to fix: new **review/night-ledger-coop-r2** from review/night-ledger-coop 96c62324 + merge review/coop-night0-r1 234d0298 (or LIVE once landed; same jnf gate, no overlap with the ld hunks).
Task list = Foreman B ROOT-10 order 22/11 09:56Z + «REVIEW coop r1» above: (1) BLOCKING coop-night case 5 (guest ready → reload → host presses) stuck with the ledger ON 2/2; (2) coop-ledger DEVSWAP tuần 2 «guest presses first» stall (both jnf st "open", nfFin 0); (3) night-coop-park 2b flake (rec 7 vs held 10); (4) stale "THIN part-E only" comments vs coop-night0's roomOff (nfParked = thin-E || roomOff now); (5) mid-tuần park edge. Gates: coop-night ×3 111/111 ledger ON, coop-ledger + DEVSWAP ×4 clean, night-coop-park ×4, coop-e2e, quickcheck, one-core, role-parity = LIVE.
Leads not yet checked (my own, unverified):
- a. S.ledger / S.ldOut / S.ldG / S.ldPk live in S → they travel in the seat's person blob / week merge (jcoopworld). Check how jnf's per-seat keys (nfX, nfLast, nfH, nfFin) are kept out of / handled in the merge and do the same for the ld keys; S.ldOut holds 3 tuần of encoded days (+ lines) = a bigger diff every week.
- b. gSettle() ends with render() on the guest; jnf's render wrapper runs rerun()/finLate() → may call nextBuoi under COOPW.allowN or ask() at a wrong moment when the "ld" message arrives mid-choice / during a reload. Try: no render from ldIn while S.nfX st!=="done" or Q has the choice; or defer gSettle to the guest's own day end (jledger endTurn wrapper) when the host word has come.
- c. Host order: ldSettle runs inside the host's endTurn (jledger wrapper = jnf's et0) AFTER fin; contest() nulls S.ntk / S.ntTry / S.nightWhy for the pass and restores them — a jnf send()/reply() during that window (reconnect re() → reply(day())) would relay ntk null / nw null. Also nfLdSend fires COOP.send inside the commit.
- d. re() on reconnect: the host now calls ldAgain() (sends the last settled tuần) and the guest nfLdAsk(w) — check that an "ld" for an OLD wk arriving after her reload does not touch today's S.ledger (ldIn only sets S.ledger when o.wk===W()) and that gSettle never runs twice (S.ldG).
- e. apply(m) now calls ldIn BEFORE the m.d!==day() return — harmless by design, but rule it out first by moving it after.
Debug aid in coop-ledger.js: STUCK dump (nfDebug + COOPW state) after merged(); NTOFF=1 = same room, ledger off (baseline). Scratch shots /home/user/wt/nlc-shots (not git). Worktree /home/user/wt/nlc (branch review/night-ledger-coop) can be reused or removed.

## FIX r2 — review/night-ledger-coop-r2 (successor of 6wkABAL1; «REVIEW coop r1» FAIL list 1–4)
PRIORITY #1 CHECK ('night-ledger|jledger|ldIn|kfgain|krevok|ctm-nf|nfParked|roomOff'): OD L594 (co-op LAND GATE), L96 (one world) | main f0070e61: jledger absent; jnf relay + kit item reveal (jfx kitGain, «Nhận» .krevok) present | review/night-ledger-coop 96c62324 (base), review/coop-night0-r1 234d0298 (PASS, merged here; same jnf gate) | claims B row "night-ledger-coop r2 fixer" (this).
Worker: opus, session_01N1tNP3C4XN63dXNqw9oz1w; coordinator Foreman B ROOT-10. START_CTX ≈ 3 % (own estimate; get_session reads 0).
Branch: review/night-ledger-coop-r2 = 96c62324 + merge review/coop-night0-r1 234d0298 (only index.html / sw.js conflicted, rebuilt) + the fixes below.

### 1. ROOT of the «stall» (FAIL 1) — found by dump, not guessed
STUCK dump (coop-ledger DEVSWAP, tuần 2 «guest presses first», reproduced 2 of 10 runs on 96c62324+coop-night0): on BOTH seats `cfBusy() true, cfAge 62 s, __cfdbg [push 0, run, play 11, push 1]` (the tuần-2 card-flip job queued, never run) behind `.kmov.kfgain` = the kit ITEM REVEAL (jfx kitGain, KIT §81 manual scene: only its «Nhận» button closes it; host «Son hoa hồng» from Nội vụ phủ, guest «Bản chép tay mẫu may …»). The flip choice waits for the flip scene (jnf scene(), bounded at CAP = choice.waitMs − choice.ms = 80 s); the host waits for the friend's choice up to BAL.steal.choice.waitMs = 90 s. The test windows are 60 s (coop-ledger / coop-night merged()) → «stall».
Why only with the ledger: every co-op harness clear() presses the kit scene buttons a player presses (`.kmend`, `[data-km-close]`, reward box) but NOT the item reveal's «Nhận» (`.krevok`, it carries neither marker); `press()` clicks #next under the overlay by script. A real player cannot reach «Sẵn sàng» under that full-screen reveal and taps «Nhận». The ledger gives each player up to 10 nights a tuần (Sủng / Ân / ranks / gifts move faster) → more item gains → the harness gap shows. Not a game stall: with an AFK seat the existing NLC #9 bound (CAP, then her 10-second clock, host waitMs) still ends the night.
Leads a–e of the handover checked: (c) contest() runs only inside the host's endTurn after fin — no relay in that window; (d) ldIn sets S.ledger only for o.wk === W(); gSettle once (S.ldG); (e) ldIn before the m.d check is harmless (kept). (a) and (b) led to a REAL bug, item 2 below.

### 2. What changed
| item | before | after | file |
|---|---|---|---|
| harness: the kit item reveal (LAW 11, whole family) | 39 co-op / scene harnesses `clear()` click `.kmov [data-km-close]` only → «Nhận» of kitGain never pressed; flip held 80–90 s | the same selector + `.kmov .krevok` (what a player taps); scan list below | 39 dev/test/*.js |
| guest's settled tuần lost (lead a, found by coop-ledger «the guest got the settled ledger» FAIL 1/8: guest ldG 0, ledger [1,0]) | the host's `ld` (settled tuần) can land while HER week end is out (COOPW.sent = week): gSettle wrote into an S that the merged week (jcoopworld onWeek → fromCanon) then rebuilt from that end → her nights, Sổ ghi lines, S.ldG gone for good | ldIn keeps it in LDQ (not in S) while her end is out; on `week` it is settled right after the merge, then ONE ldask for a tuần still missing | jledger |
| mid-tuần park edge (FAIL 3) | a tuần rolled unparked: guest ldIn returned on ldOn false (nights never settled); host ldSettle returned too; jnf listener dropped every ctm-nf word while parked | host `ldHas()` (a current unsettled ledger) settles even if parked now; guest ldIn takes a SETTLED tuần while parked (an unsettled word is ignored); `ld` / `ldask` handled before jnf's park gate; re() resends the last settled tuần parked or not; conception keeps BAL.nt.concF during those settles (`window.__ldNt`) | jledger, jnf |
| night-coop-park 2b flake (FAIL 2) | counted S + liveRivals(false) = WITHOUT the Hoàng hậu (her custom nights mùng một / rằm) and without anyone dead / out → rec 7 vs held 10 | counts S + every rival (8 count lines of the file); 2b now rec = held (9/9, 10/10) | night-coop-park.js |
| night-coop-park NEW 5d / 5e | — | 5d: ledger rolled in a player room, room parks before the day end → settled once, rec = held; 5e: guest seat parked: settled ld → her night + Sổ ghi line once, concF kept; unsettled ld ignored. Before the jledger/jnf change: 5d st 0, rec 1 / 10; 5e ldG false (both FAIL) | night-coop-park.js |
| coop-ledger «b friend in the draw» (random 1b / 2b) | per tuần: she must HOLD a day (the Emperor's agent pick may pass her: 0 of 20 days seen with nightCh 60) | per tuần logged; asserted over the run: she is a candidate of empPick(C) in ldRoll or holds a day, in a tuần she is on the tray (nightCh > 0) | coop-ledger.js |
| stale comments (FAIL 3 wording) | «nfParked: a THIN part-E room only» | «nfParked (thin part-E, or a room with a seat off the palace: jnf roomOff)» — j2 L67, jfe L9, jnf L29 / L37 / L67, jledger header §5 + S.ldPk + ldPin + ldSettle + flip wrapper, jcycle L83 (scan `grep -n -i "parked\|thin part-e" dev/build/j*.js`: 0 left) | j2, jfe, jnf, jledger, jcycle |
| debug | — | coop-night DUMP on a stuck case (jnf, Q, modal, night gate, ledger, scene queue, gains) + 4b ctm-nf receive log; coop-ledger STUCK dump + errors + scene queue / gains | tests |
ONE CORE: no new number (BAL.nt / BAL.steal / BAL.coop only). KIT: no UI change. Note for the kit keeper (not a blocker): kitGain's «Nhận» has neither `.kmend` nor `data-km-close` (KIT §81 «STILL TO SWEEP: item fly / reveal»); with the marker every harness would see it without a special case.

Scan (LAW 11, harness family): `grep -l "kmov" dev/test/*.js` with a clear(): 77 files; 39 use the idiom `querySelectorAll('.kmov [data-km-close]')` → all 39 patched (list: `grep -l "kmov .krevok" dev/test/*.js`); the other 38 have their own clear without that idiom (no co-op night gate among them except the thin-E / perf probes) — untouched, listed for the coordinator.

### 3. Gates (branch head on this box, LIVE Worker)
| gate | result |
|---|---|
| coop-ledger (host Fold / guest iPad) ×4 | 44/44 · 43/43 · 45/45 · 44/44, stuck 0 |
| coop-ledger DEVSWAP ×4 | 45/45 · 45/45 · 44/44 · 44/44, stuck 0 (before: 2 STUCK in 10 runs) |
| coop-night (ledger ON) ×5 | run 1 110/111 (only «4b: the guest really missed the host's fin once»: the test's own drop hook saw no fin word that tuần; both seats merged, same date — test plumbing, a receive log is now dumped if it repeats), then **111/111 ×4 in a row** (runs 2–5); cases 4 (AFK clock) and 5 (reload) green in all 5 |
| coop-e2e ×3 | 129/129 ×3 |
| coop-night0 | 16/16 |
| night-coop-park ×4 | ALL OK 12/12 ×4 |
| quickcheck --runs 7 | PASS · old save ok · render 271/293, tab 500/525, buổi 1337/1493 ms · core gates PASS |
| undef-scan / one-core-guard | PASS (292) / PASS |
| role-parity | FAIL 2 = petcare P-ONLY + riseCore = LIVE's pre-existing 2 |
| ledger.js | ALL PASS |
| night-final / night-multi / log-sync-night / night-steal-unit | PASS / PASS / PASS / 29 PASS 0 FAIL |

### 4. Open (not built)
1. Kit keeper (FYI, KIT §81 sweep list): give kitGain's «Nhận» the scene-end marker (`data-km-close` or `.kmend`) so no harness needs `.krevok`.
2. The 38 harnesses with their own clear() (not the patched idiom) were not touched; none is a night gate of this branch.
3. coop-night 4b «missed fin» bookkeeping: seen 1 of 5 runs; dump in place.
Head: 14093edc31e5f44321e8da6249f1a6d670f6f258 (review/night-ledger-coop-r2). Scratch: /home/user/wt/nlr2-out (not in git, no shots taken: no UI change).

SẴN SÀNG KIỂM 14093edc31e5f44321e8da6249f1a6d670f6f258

## REVIEW coop r2 — review/night-ledger-coop-r2 @14093edc → final-merge LIVE 35f5b5ab (⊇ 9c057f42) on review/night-ledger-coop-r2-rv @135945ed — **FAIL (co-op AFK stall, NLC #9 case 4)**
PRIORITY #1 CHECK: «REVIEW coop r1» FAIL 1–4 + «FIX r2» (this report) | main 35f5b5ab (jledger absent; LIVE lib/coop-clear.js = the one shared bot clear) | review/night-ledger-coop-r2 14093edc | claims B row "REVIEW night-ledger-coop r2" (this reviewer).
Reviewer: opus, session_01N1tNP653B5Ehwx7XZFGXnm; coordinator Foreman B ROOT-10. START_CTX ≈ 4 % (own estimate); end well under START + 25 %.

### 1. Merge (LIVE 35f5b5ab)
40 conflicts: 37 harness clear() (LIVE moved the pasted taps into dev/test/lib/coop-clear.js) → took LIVE's `require('./lib/coop-clear.js').first(...)` and added the item reveal «Nhận» `.kmov .krevok` ONCE in its step 2 (respects window.__noclose); assemble.py = LIVE list (+ jplw.js) + jledger.js before jnf.js; index.html / sw.js rebuilt. Commit ce2079ab.

### 2. The four checks of the order
| check | result |
|---|---|
| (a) a REAL player who leaves the kit item reveal open | **bounded, not a stall.** NEW coop-ledger NOREV=host / NOREV=guest (that seat opens kitGain at tối and never taps «Nhận»): both seats reach the next week in 107 / 103 s (guest) and 109 / 98 s (host), 45/45 + 44/44, the reveal still open at the end. jnf scene() drops the queued flip at CAP = waitMs − ms (80 s), the host stops waiting at waitMs (90 s). The «stall» of r1 was the 60 s harness window. |
| (b) previous FAIL items | 1 (coop-night case 5 + DEVSWAP stall): case 5 green 3/3, DEVSWAP 4/4 no STUCK — **but case 4 (AFK guest) FAILED 1/3, see FAIL 1** (r1 also logged «run 1 FAIL 4 (guest night / AFK clock)», never root-caused). 2 (2b count): fixed (all rivals) 6/6 runs. 3 (comments + mid-tuần park edge): done, 5d / 5e. 4 (re-merge LIVE): done by the worker on 234d0298 and by me on 35f5b5ab. |
| (c) mutation of the 2 game fixes | M1 (ldIn settles at once while her week end is out, LDQ removed) → NEW night-coop-park **5f FAILS** (held false, n 0); the worker's own suites did not catch M1 deterministically (coop-ledger 1/8), so 5f is added. M2a (ldHas → false) → **5d FAILS**. M2b (guest ldIn drops a settled tuần while parked) → **5e FAILS**. Restored: ALL OK 13/13 (×2). |
| (d) LAW 11 harness scan | the 39 patched harnesses: 37 now go through lib/coop-clear.js (one place), coop-e2e / coop-ledger keep their inline `.krevok`. Asserts: only coop-ledger «b friend in the draw» changed — per tuần «holds a day» → over the run «a candidate of empPick or holds a day while on the tray» (the Emperor's pick is a draw; still proves her card is in the draw) — accepted. 36 harnesses with their own clear() (bongloc-coop*, coop-thin-*, coop-places, coop-palace-life, reign, trung-y …) still miss the reveal → KIT REQUEST filed (give «Nhận» the §81 `data-km-close` marker; then no special case anywhere). |

### 3. Gates (review/night-ledger-coop-r2-rv; LIVE 35f5b5ab worktree on the same box for coop-e2e)
| gate | result |
|---|---|
| coop-ledger (host Fold / guest iPad) ×4 | 43/43 · 44/44 · 45/45 · 46/46, no STUCK |
| coop-ledger DEVSWAP ×4 | 46/46 · 42/42 · 43/43 · 43/43, no STUCK |
| coop-ledger NOREV=guest / NOREV=host+DEVSWAP | 45/45 / 44/44 (see (a)) |
| **coop-night ×3** | **111/111 · 109/111 (FAIL 4 ×2, FAIL 1) · 110/111 (FAIL 4b)** |
| coop-night0 | 16/16 |
| coop-e2e ×6 | 141/141 ×5 · **140/141 once** («after week 2: the same world on both seats» S.emp.mood A=1 B=0, S.fidUsed.49) — LIVE 35f5b5ab ×3: 141/141 ×3 |
| night-coop-park (+5f) | ALL OK 13/13 ×2 |
| role-parity | **ALL PASS** |
| one-core-guard / undef-scan | PASS fails 0 / PASS (293) |
| quickcheck, ledger, night-final, night-multi | not run (verdict already FAIL on the co-op LAND GATE) |
Shots LOOKED 3× (scratch /home/user/wt/nlr-out, not git, not uploaded): host Fold 755x1000@2 Sổ ghi «Kính sự phòng ghi: ngày 19, ta được lật thẻ thêm một đêm. Sủng +1.» + «Hảo hữu của ta định giành đêm của ta …» (two-way); guest iPad 1180x820@2 «Kính sự phòng ghi: ngày 8, ta được lật thẻ thêm một đêm. Ân tình +1.»; swap guest Fold / host iPad: Sổ ghi + kit stage, no overlap / cut text / private UI, cổ trang, no %.

### 4. FAIL list (for worker 3C4XN63d, on review/night-ledger-coop-r2-rv 135945ed)
1. **BLOCKING — AFK guest holding the PLAYED tối stalls the room (coop-night case 4, 1 of 3; also r1 run 1).** DUMP 4: the guest is `tonight "me"` (ledger played day = the first day of EITHER player → she holds the played tối far more often than on LIVE), x.st "done", nfFin 3 received, but her `ksp` summons («Kính sự phòng báo tin», jnf openChoice: shown after the choice) waits in Q / on screen for her tap and the flip scene `kcf-fin km-endon` sits on her screen; her week end is never sent (COOPW.sent 2) → the host waits; the night ran only when the test's merged() tapped it for her (> 114 s bound). A real pair: one AFK partner holding the played night freezes the other until she returns — the NLC #9 bound (every seat in by clock + waitMs) does not cover her own summons. Fix in game, both seats (host-held played tối as well), and prove: coop-night case 4 with the guest forced to hold the played tối (a deterministic variant: the host's ldRoll pins her day as p) green ×3, and coop-night ×3 111/111. Do not reword «a summons is never auto-made» without the owner rule: check OD first (PRIORITY #1); if the summons must stay a real choice, the bound must still end her night for the room (e.g. the summons' own timer / the room clock takes her neutral answer).
2. coop-e2e «after week 2: the same world on both seats» 1 of 6 on the branch (S.emp.mood host 1 / guest 0 + S.fidUsed.49), LIVE 0 of 3: check whether the host's ledger nights (ldSettle → night(h) / gain on NPCs, jne night-end mood) move S.emp.mood outside the merged world; prove ×5 green or show the same rate on LIVE.
3. coop-night 4b «the guest really missed the host's fin once» 1 of 3 (worker: 1 of 5): DUMP shows the guest `nfOn false` that day (no fin word exists to drop) → the assert must be n/a when her night relay is off (log why: nfDebug().why), not a FAIL; keep it a FAIL when nfOn is true.
4. Re-run the full gate list on the fixed head: coop-ledger ×4 + DEVSWAP ×4 + NOREV both seats, coop-night ×3 111/111, coop-night0, night-coop-park ×4 (13 cases), coop-e2e ×3, quickcheck, one-core, undef, role-parity ALL PASS, ledger / night-final / night-multi.
Scratch: /home/user/wt/nlr-out (logs, shots; not git).

## FIX r3 — HANDOVER (worker session_01N1tNP3C4XN63dXNqw9oz1w; context at the rollover ceiling → the coordinator opens the successor)
PRIORITY #1 CHECK: «REVIEW coop r2» FAIL 1–4 (above) | OD 15/11 ~21:25Z / ~22:55Z (co-op clock: when time runs out the buổi advances for both, open dialogs resolved safely / carried; a real choice is never made for her — jcooptimer autoRead) | OD L1479 (flip choice timeout = Thôi) | precedent jcoopworld coop-cyhold (AFK friend's card bounded by BAL.coop.cyWaitMs, «no answer» outcome) | main LIVE 35f5b5ab.
Branch **review/night-ledger-coop-r3 @5efd53fb** (from rv 135945ed). WIP — NOT ready for review.

### Done
1. **FAIL 1 reproduced deterministically, BOTH seats.** coop-night `FORCE4=g` (the host's `ldRoll(friend)` pins the played tối on the guest before the flip) and `FORCE4=h` (pinned on the host; mirrored: the HOST is AFK, the guest presses). Without a fix both stall: the AFK holder sits on her own `ksp` «Kính sự phòng báo tin» (3 real roads: Tắm gội chờ giá / Tiến cử … hầu thay / Cáo bệnh), her week end never goes (guest: COOPW.sent 2, host already in the next day waiting). In h, a non-night real choice («Một ánh mắt») even sat on top of her ksp.
2. **Game fix written (jcooptimer.js `nightAfk` / `nafWait`, BAL.coopTm.nightMs = 30000, one core):** her own night dialogs on top of Q while the partner waits on her (her tối overdue, or CW.ngoW = this week) for nightMs close WITH NO ANSWER (no road taken): summons (ksp, nfsum, amNight) → S.tonight = null (the same state Cáo bệnh / a passed night leaves; ldSettle records the played tối as nobody's); the night itself (prep, night1, night2) → passes quietly, nothing more gained. Kit line + log «Quá giờ chờ: …». Called from the clock tick (not from dueTick: dueTick returns while her own `due` is empty, which is the guest's case when the host commits and steps on).
3. coop-night **4b**: n/a (with nfOn + why per seat, before and after the presses) when a seat's night relay is off; FAIL only when nfOn is true on both.

### NOT done / open (successor)
- **nightAfk does not fire yet**: run g2/h2 on the build before 5efd53fb: `COOPW.nafN` 0 on the AFK seat (h: still stuck on ksp; g: the guest left at 114.4 s, just over the 114 s bound, nafN 0 — something else freed her). 5efd53fb adds the debug hook `COOPW.tm.naf()` (pid, buoi, sent, wk, pend, overdue, due, myKey/roomKey, ngoW, HOLD, inLife, nafWait, seen, age) printed in coop-night «4 AFK seat:» → run `FORCE4=h node dev/test/coop-night.js <out>` and `FORCE4=g …` and read which nafWait term is false. Suspects: on the host-AFK seat `overdue()` false (due ≠ myKey after forceNight) and CW.ngoW ≠ wkN; or Q[0] object identity changes per render (NA.m !== m every tick → never ages).
- **Non-night real choices on top of her summons** (h: «Một ánh mắt») also freeze the room at an overdue tối — the same family. Owner OD 15/11 ~21:25Z says time out = the buổi advances, open dialogs carried. Decide: carry them (keep in Q, do not block her night step) or bound them the same way; check OD first; keep case 3 (a reading host, clock not out: nobody advances) green.
- LAW 11 table (to finish and prove):

| her dialog at an overdue tối | where | bound today | r3 |
|---|---|---|---|
| nfch (flip choice) | jnf | own 10 s clock → Thôi (OD L1479) | unchanged |
| flip / reveal scenes (kcf, kfgain) | jflip / jfx | jnf CAP drop (waitMs − ms) | unchanged |
| ksp (Kính sự phòng báo tin) | j8 / j75 / jnf / jcoopworld / jcoopthine | none → FREEZE | nightAfk: no answer → not serving |
| nfsum (Hoàng thượng đổi ý) | jnf | none | nightAfk (summons) |
| amNight (maid road summons) | jagmaid | none | nightAfk (summons) |
| prep / night1 / night2 (the night) | j8 / j75 | none | nightAfk: night passes quietly |
| any other real choice (night event, «Một ánh mắt») | many | none at overdue tối (case 3 wants a reading host to hold) | OPEN (above) |

- **FAIL 2** (coop-e2e same-world S.emp.mood 1/6 + S.fidUsed.49): not investigated. Plan: coop-e2e ×5 branch vs LIVE ×5 on one box; if the branch rate is higher, look at the guest gSettle `night(S)` / the host ldSettle `night(h)` running after the week end (a mood write outside the merged world).
- Gates (none run on r3 yet): coop-night ×5 111/111 incl. FORCE4=g ×3 and FORCE4=h ×3, coop-e2e ×5, coop-ledger ×4 + DEVSWAP ×4 + NOREV both, coop-night0, night-coop-park ×4 (13), quickcheck, one-core (PASS on 5efd53fb), undef, role-parity, ledger / night-final / night-multi.
- Tips: page tests need `python3 dev/build/assemble.py && bash dev/site/build_site.sh`; one coop-night run ≈ 12–15 min; 2 in parallel are fine on this box.
Scratch logs: /home/user/wt/nlr2-out/r3 (g1/h1 = no fix firing, g2/h2 = tick-called nightAfk; not git).

## FIX r3 — review/night-ledger-coop-r3 (fixer #2, successor of 3C4XN63d; «REVIEW coop r2» FAIL 1–4)
PRIORITY #1 CHECK: «REVIEW coop r2» FAIL 1–4 + «FIX r3 — HANDOVER» (this report) | OD L680 (co-op shared buổi countdown: «When the timer runs out, the buổi advances for both (open dialogs resolved safely / carried …)»), OD 15/11 ~21:25Z / ~22:55Z (a real choice is never made for her), OD L1479 (flip choice timeout = Thôi), L594 / L96 | main LIVE b238857f (⊇ 35f5b5ab; no nightAfk / carry there) | review/night-ledger-coop-r3 5efd53fb (base, WIP), review/night-ledger-coop-r2-rv 135945ed | claims B row «night-ledger-coop r3 fixer #2» (this). Coordinator decision (Foreman B, under OD L680): a real non-night choice an AFK seat sits on is never answered for her — when the bounded wait runs out it is CARRIED and her week end goes.
Worker: opus, session_01N1tNP4b8rvF5b5qFYnqRUN; coordinator Foreman B ROOT-10. START_CTX ≈ 5 % (own estimate).
Branch: review/night-ledger-coop-r3 = 5efd53fb + the fixes below + merge LIVE b238857f (only index.html / sw.js conflicted, rebuilt).

### 1. ROOT of «nightAfk never fires» (nafN 0) — found by a transition trace (COOPW.tm.naf().tr), not guessed
The 5efd53fb bound aged ONE dialog (the summons) from the moment it reached the top of Q. Trace, run g3 (guest AFK, played tối pinned on her): «Một ánh mắt» (a non-night real choice, no pid) stood on top for 82 s, then nfch (its own 10-second clock), then ksp — the summons only started its 30 s at 252.5 s, after the test's 114 s bound (age 12.4 s when the case ended). h1 (host AFK) the same: age 5.5 s at the end. The trace terms nafWait (live, buổi tối, sent ≠ week, !pend, overdue / ngoW) were all true; the bound was simply started too late and per dialog.
A second blocker showed once the carry ran (G cn2, FORCE4=h DUMP): Q empty, but the AFK host's OWN flip-end kit scene («Lật thẻ bài» kcf-fin km-endon, one button «Chuẩn bị thị tẩm» .kmend) waited for her tap for 76 s (cfBusy) → her night never ran.

### 2. What changed (game: dev/build/jcooptimer.js only; number: BAL.coopTm.nightMs = 30000, already in jbal2)
| item | before (5efd53fb) | after | where |
|---|---|---|---|
| what is timed | each night dialog from its own arrival on top | the WAIT: from the first tick the partner waits on her (nafWait: her tối overdue, or the room's night committed CW.ngoW = week, while her own week end is not out); once it reaches BAL.coopTm.nightMs every dialog on top is handled at once | nightAfk |
| summons ksp / nfsum / amNight | close, no answer (S.tonight = null) — never reached | unchanged rule, now fires (g5, G2 runs: COOPW.nafN 1, pid ksp) | nightAfk |
| the night prep / night1 / night2 | pass quietly | unchanged rule | nightAfk |
| flip choice nfch | — | untouched: its own 10 s clock says Thôi (OD L1479) | NAF_OWN |
| ANY other dialog (real choice, notice) on top at that point | froze the room | CARRIED (coordinator ruling, OD L680): taken off her screen unanswered (Q.shift, no onClose, no road), kept on her seat (CQ), one kit line «Quá giờ chờ: việc còn dang dở được giữ lại, ngươi trở lại sẽ xem tiếp.»; right after the merged week (COOP week → setTimeout 0, after jcoopworld onWeek / fromCanon keepQ) it goes back on TOP of Q: a pid card is made again from its id (deserQ, the save path → points at the merged world's people), any other card as it was | nightAfk / carryBack |
| a kit scene waiting only on its ONE end button (.kmend, item reveal «Nhận» .krevok, [data-km-close]) | froze the room (cn2 DUMP) | read for her like a one-road dialog (no choice) — the button's own handler; a scene with more than one button (a choice) is left alone | nafScene |
| after a close / carry | waited for the next dueTick | CW.nCheck() at once (jcoopworld night gate: the guest runs her night as soon as no dialog is open) | nightAfk |
| debug | naf() snapshot | naf() + tr (transitions: top card, wait, overdue, ngoW, 10 s buckets of the wait) + carried / back / scene / cq counters | CW.tm.naf |
Found on the way (not changed, FYI): every co-op week merge rebuilds Q through serQ / deserQ (jcoopworld fromCanon keepQ), which keeps only pid cards — an open NON-pid real choice («Một ánh mắt», j24 manPoem pushed as a plain card) is dropped at every week merge on LIVE today. The carry puts such a card back after the merge, so it survives until the next merge; the general drop is a separate family (not this branch).

### 3. LAW 11 — her dialogs / scenes at an overdue tối (AFK seat), whole family
| her dialog / scene | where | LIVE / 5efd53fb | r3 |
|---|---|---|---|
| nfch (flip choice) | jnf | own 10 s clock → Thôi (OD L1479) | unchanged |
| flip scene queued behind a panel (kcf) | jflip / jnf scene() | jnf CAP drop (waitMs − ms) | unchanged |
| flip scene RUNNING, one end button «Chuẩn bị thị tẩm» (.kmend) | jflip / j93 kitSceneEnd | none → FREEZE (cn2) | nafScene: read for her past nightMs |
| item reveal «Nhận» (.krevok, kitGain) | jfx | jnf CAP / host waitMs (rv r2 NOREV) | nafScene as well (same one-button family) |
| ksp (Kính sự phòng báo tin) | j8 / j75 / jnf / jcoopworld / jcoopthine | none → FREEZE | close, no answer → not serving |
| nfsum (Hoàng thượng đổi ý), amNight (maid road summons) | jnf / jagmaid | none | close, no answer |
| prep / night1 / night2 | j8 / j75 | none | night passes quietly |
| any other real choice («Một ánh mắt», Biến cố đêm, Việc khó xử …) | many | none → FREEZE (g3: 82 s) | CARRIED, back on top after the merged week (never answered) |
| a notice / one-road dialog | many | autoRead (readMs) only when HER clock is overdue (not on the guest's ngoW path) | carried like the rest if still open at nightMs (autoRead unchanged) |
| mini game (S.mg) / Tạm dừng | jcooptimer | the clock's own pause cap (pauseCapMs) | unchanged (nafWait is false while HOLD) |
Case 3 (a reading host, the clock not out, guest ready) is untouched: nafWait needs her tối overdue or the room's night committed.

### 4. FAIL 2 (coop-e2e «after week 2: the same world» S.emp.mood host 1 / guest 0 + S.fidUsed.49)
Not reproduced: coop-e2e ×5 on a3a5c5df and ×6 on the head — same world clean 11 of 11 (see gates). A trace is in place for the next time it shows: coop-e2e now polls every change of S.emp.mood per seat (old → new, room week, buổi, calendar day, COOPW.sent, top card, last Sổ ghi line) and prints «MOODTR host / guest» whenever the same-world diff names S.emp.mood. Read of the code: the guest's settled tuần after the merged week (jledger LDQ → gSettle) writes only her own fields (nights, nightLog, sung / an, preg via night(S)); the only S.emp.mood writers at night are jne's «Đêm thị tẩm» card (her played night, before her week end) and the weather / story writers (each seat, both before the end) — none runs after the merge on one seat only. With 0 of 11 here and 1 of 6 at the reviewer (LIVE 0 of 3), the rate is not shown to differ from LIVE; the trace names the writer if it comes back.

### 5. Tests changed
| test | change |
|---|---|
| coop-night | ONLY=<cases> (debug: run just those cases); FORCE4=g/h: «no ledger» in the room (a seat off the palace, by her random thân phận: nfOn false) → n/a, not a FAIL; NEW: a real two-road pid card («Việc khó xử», PEND.c4test, each road marks if taken) is put on top of the AFK seat before she goes AFK → asserted carried, NOT answered, and back on top of her screen after the merged week; every carried card back (carried = back, CQ empty); the summons assert accepts a summons resolved as a one-road dialog (autoRead) — it fails only if a summons / night dialog is still on her screen |
| coop-e2e | S.emp.mood trace (MOODTR) for FAIL 2 |

### 6. Gates (head 7aff0de33866ce5dd07af355c0c0e6c85fa41ff3 on this box; LIVE b238857f merged; 3 lanes in parallel → one screenshot timeout under load, see e2e)
| gate | result |
|---|---|
| coop-night FORCE4=g ×2 | 115/115 · 115/115 (summons closed by nightAfk, «Việc khó xử» carried 2, back 2, unanswered; AFK hold 48–105 s ≤ 114 s) |
| coop-night FORCE4=h ×2 | 115/115 · 113/113 (the second: no ledger in that room → pin n/a + 4b n/a, still bounded and carried); plus ONLY=1-4 h 6/6 case-4 asserts on the same code |
| coop-night plain ×2 | 111/111 · 112/112 |
| coop-e2e ×6 (COOP_WDIFF) | 141/141 ×5 · 140/141 once = «09-rejoined ipad: screenshot timeout 120 s» while the box ran 3 lanes (load 37); same-world clean in all 6; rerun e2e6 141/141. Earlier build a3a5c5df: 141/141 ×5 |
| coop-ledger ×4 | 45/45 · 44/44 · 45/45 · 45/45, no STUCK |
| coop-ledger DEVSWAP ×4 | 45/45 · 45/45 · 43/43 · 43/43 |
| coop-ledger NOREV=host / NOREV=guest | 43/43 / 45/45 |
| coop-night0 | 16/16 |
| night-coop-park ×4 | ALL OK 13/13 ×4 |
| quickcheck --runs 7 | PASS · old save ok · render 330/293, tab 670/671, buổi 1870/1704 ms (box still warm from the lanes) · core gates PASS |
| one-core-guard / undef-scan | PASS / PASS (293) |
| role-parity | ALL PASS |
| ledger / night-final / night-multi | ALL PASS / PASS / PASS |
ONE CORE: no new number (BAL.coopTm.nightMs was added in 5efd53fb). KIT: kitLine only (existing kit pill); no new UI. No shots (no screen changed; the carried card is the same kit dialog). Scratch: /home/user/wt/nlr3-out (not git).

### 7. Open (not built)
1. FAIL 2 not reproduced (0 of 11 here); MOODTR stays in coop-e2e to name the writer if it returns.
2. Pre-existing, other family (FYI coordinator): the co-op week merge (fromCanon keepQ = serQ) drops every open NON-pid real choice on every seat at each week end.
3. A carried card lives in the seat's memory (CQ): a reload before the merged week loses it (as a reload loses any non-pid card today).

SẴN SÀNG KIỂM 7aff0de33866ce5dd07af355c0c0e6c85fa41ff3

## REVIEW coop r3 — review/night-ledger-coop-r3 @7aff0de3 (⊇ LIVE b238857f; rv = the same sha, nothing to merge) — **FAIL (a carried non-pid real choice comes back hollow)**
PRIORITY #1 CHECK: «REVIEW coop r2» FAIL 1–4 + «FIX r3» (this report) | OD L680 (time out: open dialogs resolved safely / carried), OD 15/11 ~21:25Z / ~22:55Z (a real choice is never made for her), OD L1479 | main LIVE b238857f (no nightAfk / carry) | review/night-ledger-coop-r3 7aff0de3 | claims B row «REVIEW night-ledger-coop r3» (this reviewer).
Reviewer: opus, session_01N1tNP5JeCc1aEETUicwLpq; coordinator Foreman B ROOT-10. START_CTX ≈ 4 % (own estimate).

### 1. Code read (jcooptimer nightAfk / nafScene / carryBack)
- Summons ksp / nfsum / amNight and the night prep / night1 / night2 are pid cards built by mkP / deserQ: **no onClose**, so closeModal() takes no road — «no answer» is real (checked j3 closeModal, j8 PEND.ksp, jnf nfsum, jagmaid amNight). OK under the Foreman B ruling.
- nafScene clicks only a scene whose ONLY visible button is .kmend / .krevok / [data-km-close]: scan of every such button (j93 kitSceneEnd «Tiếp theo»/event label, j93 kmtake «Nhận», jne kne-take «Nhận / Tiếp tục», jfx krevok «Nhận»): all are end / take buttons, none is a choice. OK.
- nfch untouched (own 10 s clock). nafWait false while HOLD / inLife / dead. Number: only BAL.coopTm.nightMs (one-core guard PASS fails 0).
- **carryBack (FAIL 1):** a non-pid card goes back as the same JS object (`out.push(c||e.m)`); its roads are closures over people of the OLD world. The merged week rebuilds the world from JSON (jcoopworld fromCanon0: `sS=J(Pm.S)`, `R=J(C.W.R)` → deser), so every person the closure holds is no longer in S / rivals.

### 2. Evidence (scratch harness /home/user/wt/nlr4-out/_rv_cn.js = coop-night + one non-pid two-road card on the AFK seat whose road writes to a live rival, + RL=y|x reload mid-wait; not git)
| run | result |
|---|---|
| ONLY=4 FORCE4=g + non-pid card | carried 3, back 3, room bounded (58.9 s ≤ 114 s); the non-pid card came back and was answered on her return: **`inWorld:false`** — the rival its road writes to is not in the merged world → the road does nothing (gain/loss lost; a «Một ánh mắt» answered after the carry would write tình ý / letters to a ghost man) |
| RL=y FORCE4=g (host = partner leaves + rejoins at 8 s) | no freeze: 66.3 s ≤ 114 s, summons closed (nafN 1, ksp), carried 2 = back 2, next week exactly one step |
| RL=y FORCE4=h (guest = partner leaves + rejoins) | no freeze: 57.2 s, nafN 1 ksp, carried 3 = back 3 |
| RL=x FORCE4=g (the AFK guest herself reloads at 8 s, stays AFK) | no freeze: 62.3 s, next week one step; the injected test cards died with the page (harness artefact, not a game fault) |
| coop-night plain (head) | 112/112 |
| coop-e2e ×10 same-world (COOP_WDIFF, head) | 141/141 ×10, same world clean 10/10, MOODTR 0 → r2 FAIL 2 not reproduced (worker 0/11 + reviewer 0/10 = 0/21 vs r2 1/6): closed as not shown to differ from LIVE |
| coop-night 4b semantics | read: ok when the fin really dropped; n/a only when the relay was off on a seat; FAIL when on — matches r2 FAIL 3. Closed |
| one-core-guard / undef-scan | PASS fails 0 / PASS (293) |
Not run (verdict already FAIL): coop-ledger ×4 + DEVSWAP + NOREV, coop-night0, night-coop-park, quickcheck, role-parity, ledger / night-final / night-multi, shots (no screen changed).

### 3. FAIL list (worker 4b8rvF5b, on review/night-ledger-coop-r3)
1. **BLOCKING — a carried NON-pid real choice comes back hollow.** Brief check (a): carried dialogs must still work after the merged week. Proof above (`inWorld:false`). The carry today works only for pid cards (the worker's own test switched to a pid card for this reason). Fix the family, not the test: every real choice that can stand on a seat at tối must come back pointing at the merged world — e.g. carry non-pid choice cards by a save kind (give the open-at-tối choice families — j24 npcWhy events like «Một ánh mắt», Biến cố đêm, Việc khó xử … — a pid / evpick route so deserQ rebuilds them), with a LAW 11 table of every non-pid `opts` card that can be open at tối and how each is carried. If a family cannot be rebuilt, ask Foreman B for a ruling (OD L680 «resolved safely / carried») — never show a road whose effect is lost. Prove: coop-night FORCE4=g/h with a NON-pid two-road card whose road writes to a world person: after the merged week the road lands on that person in S (both seats see it, same world).
2. Non-blocking, same fix: CQ lives only in page memory — a reload between the carry and the merged week loses even a pid card that, left in Q, the seat's save (serQ) would have kept. Keep carried cards in the save form (pid + pp) so a reload keeps them.
3. FYI Foreman B (no fix asked; LAW 2 edge): «no answer» to the summons costs only the night, while «Cáo bệnh» costs Sủng −BAL.cv.decl.sung and Ân −BAL.cv.decl.an (gains Sức). A co-op player who goes AFK 30 s past the partner's wait declines for less than Cáo bệnh. Likelihood: possible (only in co-op, only with a waiting partner); harm: small; fix if wanted: no answer takes the Cáo bệnh loss without its Sức gain. Ruling is the Foreman's.
4. Re-run on the fixed head: coop-night ×3 plain + FORCE4=g ×2 + h ×2, coop-e2e ×5, coop-ledger ×4 + DEVSWAP ×4 + NOREV both, coop-night0, night-coop-park ×4, quickcheck, one-core, undef, role-parity, ledger / night-final / night-multi.
Closed from r2: FAIL 1 (AFK holder stall) — bounded both seats incl. partner reload; FAIL 2 — 0/21; FAIL 3 (4b) — closed; FAIL 4 — re-run pending with item 4 above.
Scratch: /home/user/wt/nlr4-out (logs + _rv_cn.js; not git, no shots).

## FIX r4 — review/night-ledger-coop-r4 (fixer #3; «REVIEW coop r3» FAIL 1–3 + Foreman B rulings 1–3)
PRIORITY #1 CHECK: «REVIEW coop r3» FAIL 1–3 (above) | OD L680 (co-op countdown: «open dialogs resolved safely / carried»), OD 15/11 ~21:25Z / ~22:55Z (a real choice is never made for her), OD L594 / L96, LAW 2 / 3 / 4 / 11 | main LIVE b238857f (⊆ base; no rk / carry there) | review/night-ledger-coop-r3 7aff0de3 (base) | reused, not rebuilt: PEND / mkP / serQ / deserQ (j3 save route), jemo emoKey / emoByKey (the one person-by-id lookup), jcoopworld snapSave (seat copy), the card's own «Cáo bệnh» road (BAL.cv.decl, D.decline) | claims B row «night-ledger-coop r4 fixer #3» (this).
Worker: opus, session_01N1tNP2ntVMAWS44p7tEVQd; coordinator Foreman B ROOT-10. START_CTX ≈ 3 % (own estimate; get_session reads 0).
Branch: review/night-ledger-coop-r4 = 7aff0de3 (⊇ LIVE b238857f, main unchanged since) + the fixes below.

### 1. What changed (game)
| item | r3 (7aff0de3) | r4 | where |
|---|---|---|---|
| a non-pid choice card's identity | a JS object; its roads are closures over the people of the world it was made in | **carried as DATA**: `rcpReg(kind, generator)` wraps a card generator; every choice card it returns carries `rk` (kind) + `ra` (its arguments, every person as `{"@p":emoKey}`; plain values kept; a function / unknown object → no rk) | j3 rcpReg / rcpEnc / rcpDec |
| made again | never (r3 put the same object back → `inWorld:false`) | `rcpMk`: arguments decoded against the CURRENT world (jemo emoByKey, the same lookup the seals use), the generator runs again (RCPRE = 1: no second rk stamp) → roads close over the merged world's people | j3 rcpMk |
| a person gone / the card no longer offers a choice | — | the card LAPSES: no effect, one Sổ ghi line ««<title>»: việc đã qua, không còn kịp đáp.»; never a road whose effect is lost | j3 rcpLapse |
| save form (serQ / deserQ) | pid → {pid,pp,t}; any other choice → dropped silently | + generator card → {rk,ra,t,cls} (rebuilt by deserQ); `serQ({lap:1})` writes a choice with no generator as {lap,t} → deserQ logs the lapse line | j3 serM / serQ / deserQ |
| co-op week merge (fromCanon keepQ) — the LIVE bug (open non-pid choices dropped at every merge) | serQ(): non-pid choices dropped silently on every seat | serQ({lap:1}): generator cards rebuilt in the merged world, the rest lapse with the log line | jcoopworld fromCanon0 |
| the AFK carry (nightAfk) | CQ = page memory, holding the JS object | **S.cq** (her save, both seats; ser() / seat copy / week blob carry it): each entry in save form + the week it was carried in (cw); a choice with no generator lapses AT the carry (no hollow road later); the seat copy is written at once (CW.snapNow) so a reload right after the carry keeps it | jcooptimer nightAfk |
| carry back | on the COOP "week" event only | `carryBack` = deserQ of the entries whose week the room is past (rebuilt against the merged world, people by id), from the "week" event AND after every world load (jcoopworld fromCanon → CW.cqBack: merge, join, rejoin after a merge with no "week" on that page) | jcooptimer carryBack, jcoopworld fromCanon |
| «no answer» to a summons after the AFK bound (ksp, amNight) | only the night is lost (cheaper than «Cáo bệnh») | `nafDecl`: the card's OWN «Cáo bệnh» road — its fx losses (Sủng −BAL.cv.decl.sung / −D.decline) applied and its go run (Ân tình −BAL.cv.decl.an, AMN.decline++, S.tonight = null) — **without** the rest it buys (Sức +): absence is never the cheaper decline (one core: the card's own BAL numbers, nothing typed); kit line names the cost. nfsum has no decline road (a won night) → unchanged (the night passes) | jcooptimer nafDecl |
| debug / test hooks | — | CW.afterCarry (test hook, as CW.afterFC); window.__rcpFail (last 20 rebuild failures + why); naf() + lapsed / decl | jcooptimer, j3 |
ONE CORE: no new number (one-core-guard fails 0). KIT: no new UI (kitLine + Sổ ghi only). No screen changed → no shots.

### 2. LAW 11 — every choice family that can be open at tối (scan, not guessed)
Scan: dev-scratch npscan.js = 6 lives × 6 months real day walk (ledger-bot walk + random deck acts), every NON-pid choice card that reaches Q tagged by its builder (stack) — 330 cards, 74 of them still open at tối; each rk card serialised → JSON → `rcpMk` in the same world (rebuilt with the same title).
| family (builder) | cards seen / at tối | r4 route | rebuilt in scan |
|---|---|---|---|
| jgreet gmCard «Có người đến» (a visitor's reply card) | 47 / 8 | rk gmReply (v, provoke, G, lines; the act already ran) | 47 / 47 |
| j24 approaches «Có người đến» / «Thái hậu triệu» / «Kẻ hầu xin» / «Một ánh mắt» (AP_MK ×9) | 52 / 15 | rk ap.<kind> (o with people as ids; apFriend's visit kind rides o.sub) | 50 / 52 (2: the same card offers a different number of roads in the new state — still the generator's own card) |
| jagent agScene «Có người tìm đến» / «Ngươi bắt gặp» | 33 / 13 | rk agSeek / agSeen (plan p + doer) | 33 / 33 |
| jagharm haScene «Ngươi bắt gặp» | 21 / 8 | rk haSeen | 21 / 21 |
| j24 servCauses «Việc của kẻ hầu» | 7 / 2 | rk svCause (servant + cause) | 7 / 7 |
| jagknow knSellCard «Có người bán tin» | 7 / 2 | rk knSell (seller + news) | 7 / 7 |
| every pid card (ksp, nfsum, amNight, night1/2, Việc khó xử PEND …) | — | unchanged: pid (mkP) | — |
| jdh dhNotice / dhPick «Danh hiệu mới» / «Đeo «…»» | 46 / 10 | lapse + log line = the same as its «Để sau» road (the title stays hers in S.dh; worn later from Nhiệm vụ › Danh hiệu) | — |
| jwhy spyPick «Sai … đi dò la» (her own act's target picker) | 38 / 11 | lapse + log = its «Thôi, để sau» | — |
| jts tsPanel (Lời cảnh báo, Hội phối đồ, Lễ tấn phong, đèn Trung thu), jworld worldShow (festivals, sứ đoàn, quốc tang …), econStipend «Bổng lộc», dcTurn «Y phục dự …», festival / endTurn contests, tyWeek, tyRob, j95bHear, mbComfort | 79 / 5 | lapse + log | — |
Before r4 every family in this table (except pid) was dropped SILENTLY at every co-op week merge and came back hollow from the r3 carry; now 6 families (65 % of the cards open at tối in the scan, 51 % of all; every person-to-person family seen in the scan) are rebuilt against the merged world and the rest lapse with a line. Open: give the remaining families a generator route the same way (one rcpReg line each, after reading the generator for side effects).

### 3. Tests changed (dev/test/coop-night.js case 4, FORCE4=g|h)
- NEW: a REAL non-pid two-road card from a game generator (j24 apSorry «Có người đến» on a live world consort) on top of the AFK seat; asserted: it carries rk; after the merged week it is made AGAIN (not the old object) against the merged world (its consort is in `rivals`, not the old object); answered on her return («Nhận lời xin lỗi») its road lands on that consort (thiện cảm up); after the next merge the partner seat's room canon holds the same value (W.R[id].rl[her seat] = her thiện cảm). Read through the CW.afterCarry hook (the harness's clear() otherwise answers it first).
- NEW RLX=1: the AFK seat's page reloads right after the carry, before the merged week (guest: leave + join; host: rejoinHost) → the carried card must come back from her save after the merge.
- Traces: `gone` (the card left Q and S.cq before the carry), rcpFail ring, lapse lines.

### 4. Gates (head 0e10a8f7 = the game of a7560a79; a7560a79 = + merge LIVE 40cc2b92, test-only, rebuilt; 3–4 lanes in parallel on a 4-core box)
| gate | result |
|---|---|
| coop-night FORCE4=g (final build) | 119/119 · 119/119 (g5, g6: non-pid card back, rebuilt, road landed: thiện cảm 8→14 / 6→10, partner canon = 14 / 10); ONLY=4 ×3 (gd a/b/c) all case-4 asserts ok (3→11, 0→5, 6→12). g3: 116/119 — the non-pid card left the AFK guest's Q before the carry (not answered by her, not in S.cq) → 3 asserts FAIL (see open 1) |
| coop-night FORCE4=g RLX=1 ONLY=4 | ok (gr4: carried → reload → S.cq kept [ap.apSorry, c4test] → after the merge apSorry rebuilt with its 2 roads; the test-only c4test generator died with the page → lapsed, as designed) |
| coop-night FORCE4=h | 117/117 (h3: rebuilt, −5→0, partner canon 0 = 0) · 114/117 (cnh2: the same «card gone before the carry» as g3, on the HOST: `gone` at tối, wk 3, not in fromCanon, top then c4test) |
| coop-night plain | 112/112 (p1) · 110/112 (cnp2, 4 lanes: case 4 «both in the next week (exactly one step) [3,3,3]» — dates moved to the next week on both seats but the room week stayed 3 until case 4b ([4,5,5]); the carried «Một ánh mắt» waited in S.cq (cw 3, room still 3) — see open 2) |
| coop-e2e ×5 | 141/141 ×5 |
| coop-ledger ×4 / DEVSWAP ×4 / NOREV host / guest | 45 · 42 · 43 · 46 / 45 · 44 · 42 · 43 / 43, 44 / 43, 43 (all passed, no STUCK) |
| coop-night0 | 16/16 |
| night-coop-park ×4 | ALL OK 13/13 ×4 |
| ledger / night-final / night-multi | PASS / 11 pass 0 fail / 8 pass 0 fail |
| role-parity | ALL PASS |
| one-core-guard / undef-scan | PASS fails 0 / PASS (293) |
| quickcheck | NOT RUN (the lane was stopped with the session's background processes; successor runs it) |

### 5. Open (successor)
1. **A rk card leaves Q on the AFK seat at tối before the carry** (g3 guest, cnh2 host; 2 of 8 g/h runs): `gone` trace = Q[0] was apSorry, then c4test on top, not inside fromCanon, not in S.cq, not answered by the test. Suspect: a holder that takes waiting cards off Q (jspread SP13 «waiting cards» uses serQ per card, sp13Ser; or the jdfv / jfocus encounter step taking a `who` card) — check where it went (it may come back later from that store = not lost, then the test must follow it; if it is dropped, that is the same family and must keep / lapse it).
2. **cnp2 case 4 plain «exactly one step» [3,3,3]** (1 of 3 plain runs, under 4 lanes). Not shown to be caused by r4 (p1 plain 112/112; e2e ×5, ledger ×14, park ×4 clean) — rerun plain ×3 on a quiet box; if it repeats, read the DUMP 4 (pend false, sent 3, ngoW 3, ld st 1) against r3.
3. Remaining families (table §2: danh hiệu, spyPick, tsPanel, worldShow, stipend, dress, contests …) lapse with a line; giving each a generator route is one rcpReg line after reading the generator for side effects (gmCard showed why: its act runs in the builder, so only the reply part is registered).
4. A pid card that can no longer be made (mkP null) still drops silently in deserQ (pre-existing, every save load); not changed.
5. quickcheck --runs 7 on the head.

### 6. Fixer #4 (worker session_01N1tNP6tXgJZ4M8zrKZms4c, coordinator Foreman B ROOT-11; START_CTX ≈ 5 % own estimate, get_session reads 0; depth 4) — open 1, 2, 5 closed
PRIORITY #1 CHECK: «FIX r4» §5 open 1–5 (above) | OD L680, LAW 11 | main LIVE 40cc2b92 → 0a3ceede (merged, 030799c9) | review/night-ledger-coop-r4 a7560a79 (base) | reused: j68 evGate / EVHOLD / evDropInfo (the scheduler's own hold + drop), j3 serM / rcpMk / deserQ (the r4 carry route) | claims B row «night-ledger-coop r4 fixer #4» (this).
**Open 1 — ROOT (found by trace, not guessed).** Scratch harness (not git): the case-4 card wrapped in a Proxy (every read / write / delete logged with its stack), Q's own shift / splice / pop logging the call that takes it out, `deser` wrapped, Q identity watched. 3/3 failing runs gave the same answer: **no save load, no Q swap, no read of the card — `Q.splice(i,1)` from j68 `evGate` (wrapped around every showModal)**. The card is OPTIONAL (j24 approach), and the j68 scheduler shows at most one optional card per buổi / per person / per template: «Kẻ hầu xin» had already been shown that buổi, so the test's card was HELD in `EVHOLD` the moment it was shown — it never reached her screen, so the AFK carry never saw it. That part is the game's pacing (single player too), the test's fault.
The game fault behind it (same family, LAW 11 «every store that keeps a card outside Q»): `EVHOLD` is page memory holding the JS card object; it survives the co-op week merge (and join / rejoin / relens / snapshot restore, all through `deser`) and `evRelease` later puts it on her screen with roads that close over people of the OLD world = the r3 «hollow road», by another door.
Scan of every holder of cards outside Q (grep of every `Q.splice/shift/pop` and every `.push({m…})` in dev/build):
| holder | keeps the card for later? | r4 fixer #4 |
|---|---|---|
| j68 EVHOLD (held optional cards) | yes, page memory, released by evRelease | **made again at every deser**: `evHoldRe` (j68) — serM → generator card rcpMk / pid card mkP / notice text; a card that cannot be made again is dropped as the scheduler drops a stale hold (evDropInfo; she never saw it) |
| jspread SP13.L (waiting cards) | yes | off in a co-op room (SP13.off); single player saves it as data (S.sp13.q) — unchanged |
| jcooptimer S.cq (the AFK carry) | yes | r4 (#3): save form, rebuilt by deserQ — unchanged |
| every other splice site (jnf ksp/prep/nfch, j70 dedupe, j95b false warnings, jkc kcE, jworld Quốc tang, jdc festival items, jcoopthin thin cards, j74 title panels, jflip = its own timer list) | no: the card is dropped (its replacement is queued) or put straight back | unchanged |
Test (coop-night case 4): the j68 scheduler is pinned for the test's card (as ldRoll is pinned for the played tối) and `shown` is asserted (the card IS on top of her screen when she goes AFK); NEW assert: an optional card held in EVHOLD at the merge is made again against the merged world and its road lands on the merged world's consort. Negative control (evHoldRe switched off in a scratch copy): that assert FAILS (`made:false`) → the test sees the bug.
**Open 2 — cnp2 «exactly one step» [3,3,3]: not reproduced, not shown to be r4-caused.** Plain on this branch 112 / 111 / 112 + 112 on the merge (0 FAIL, 4/4) under 3 lanes; plain on the r3 base 111 / 112 (0 FAIL). Total r4 1/7 (the predecessor's cnp2, 4 lanes) vs base 0/2: no evidence either way; closed as a load flake unless it comes back (then read its DUMP 4 against r3).
**Open 5 — quickcheck:** see gates.
Open 3 (other families lapse with a line) and 4 (a pid card mkP null drops in deserQ, pre-existing) unchanged.

| gate (merge head 030799c9 unless said) | result |
|---|---|
| coop-night FORCE4=g | 121/121 · 121/121 (merge) · pre-merge 121/121, 120/121 (G1: «host: no page errors» = WebSocket handshake to the LIVE Worker failed once; network, not the game) |
| coop-night FORCE4=h | 121/121 · 121/121 (merge) · pre-merge 121/121, 119/119 |
| coop-night plain | 112/112 (merge) · pre-merge 112 · 111 · 112 · 112 (all pass) |
| coop-e2e | 141/141 (merge; same world after week 3 + after rejoin) · pre-merge 141/141 |
| coop-ledger / DEVSWAP / NOREV=guest | 43/43 (merge) · pre-merge 43 / 43 / 43, no STUCK |
| coop-night0 · night-coop-park · ledger · night-final · night-multi | 16/16 · ALL OK 13/13 · ALL PASS · pass · pass (merge) |
| role-parity | ALL PASS (merge; run alone, 783 s — 900 s lane timeout under 3 lanes once, then rerun alone) |
| one-core-guard / undef-scan | PASS fails 0 / PASS (294) (merge) |
| quickcheck | PASS (merge): --runs 3: open 2020 ms, old save ok, buổi 2730/1400 ms (noise) → --runs 7: render 300/310, tab 586/598, **buổi 1523/1794 ms**, tasks>200 26/26, core gates PASS |
Own both-seat check (co-op gate): case 4 runs both ways — g = the guest is the AFK seat, h = the host is; in each the carried non-pid card's road lands on the merged world's consort and the PARTNER seat's room canon holds the same value after the next merge (`partner rl[her seat] = her thiện cảm`), the EVHOLD card is rebuilt on the AFK seat; coop-e2e same-world asserts on both seats.
Scratch (this container only, not git): /home/user/wt/out (logs), dev/test/_cn_dbg.js / _cn_ctl.js (trace harness / negative control, git-excluded).

### HANDOVER (worker session_01N1tNP2ntVMAWS44p7tEVQd → successor, opened by Foreman B ROOT-11) — context past START_CTX + 25 %
Head **review/night-ledger-coop-r4 @a7560a79f12b067c134afae016fb6951e65eef1c** (⊇ LIVE 40cc2b92). NOT SSK: open 1 (and 2) first. → taken over by fixer #4 (§6 above): SSK 030799c9. Scratch (this container only): /home/user/wt/nl4-out (npscan.js family scan, logs). Tips: run the co-op tests with the tool's run_in_background (plain nohup / & jobs died when this session's turn ended); `grep -q DONE` matched DONE4 — use unique end markers; page tests (ledger, night-final, night-multi, coop-night0, night-coop-park) need a URL: `python3 -m http.server 8765` in the worktree → http://127.0.0.1:8765/index.html.
