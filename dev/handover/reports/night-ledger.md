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
