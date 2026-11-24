PRIORITY #1 CHECK ('robot-fix|R3.md|R4.md|roundTrip|nightAfterLoad|auditOpt|KIT_AV|kfpReg|lifeStore|palFix|visit.tk'): OD 2 (OD ROBOT PLAYTEST 23/11, MAIN 119 07:40Z) | ledger 0 | claims F ROBOT FIXER row (this session) | main: D's nc-fix-1/-2 (j24 hhBind, jemo emoSee), fix-evening-softlock 14ba8768 (jnf heal), typed-stat-bal (poisonedFish), r10-rt.js | review/*: robot10-nc-fix-3-rv e6b841fd (load seeded dice, LAND READY, not on main — no overlap: it seeds dice at load, this branch removes load-time state changes), robot10-lag (bot-page memory finding #3) | reused: r10-rt.js repair filter, lifeStore registry (j1), newlife-leak.js, robot repro method.

# ROBOT BUG FIXER — cnv families (session_01UV1SzhQegCd1j7H5GHPzMo, Foreman F #2, depth 2) — START_CTX ≈ 5 %
Branch **review/robot-fix-cnv** from origin/main fd85907a. Input: cnv-20261124-0256-R3 / 0705-R4 (+ thd R1/R2, pf R5/R6, bd R7 as extra evidence: the same four families).
Robot repro saves are not in git (SAVES_NOT_IN_GIT.md): fresh repro saves made here with robot10.js (cnv cnv_mat, 2 bots), kept in /home/user/wt/rfx-out*/saves (box only).

## 1. Triage (row → family → game / harness → plan)
| robot row (R3/R4 lives) | family | verdict | fix |
|---|---|---|---|
| save→load→save changes the state 50/50 (S.visit.*, S.logs.0, S.visit.tk, R.staff.hue, S.il.seq, S.roster, S.where, R.dw) | F1 save drift | **GAME (5 real causes) + harness (render-off bot page, by-design repairs)** | §2 |
| [fold] after load «Sang ngày mới» does not move the clock 11–14/50 | F2 night stall | **HARNESS** (the robot's loop; 0 real soft-lock left on main after fix-evening-softlock) | §3 |
| «Bạc +8» shown vs bac=20 32–40/50 (+ «Tâm cơ +2/+3» vs −1, «Sủng +2/+3» vs −1, «Bạc +50/+60» vs −20, kiệu «Bạc −6») | F3 shown ≠ applied (law 4) | **HARNESS** (all; game prints every number from BAL); the one real case «Sức +6» poisonedFish is already on main (typed-stat-bal) | §4 |
| bot-page memory keeps growing 28/50 | F4 memory | **BOTH**: the 200k-node / 1 GB reading is uncollected garbage (harness); a real leak per LOAD (old game kept alive) + per-life stores holding the old life | §5 |
| stat 101 (danh/tai/duc/sac) | — | owned: fix-kframe-heir-rv (statSet clamp) | — |
| E's fixer «shown gain ≠ applied gain» (Sủng/Sức R5) | F3 | taken over per MAIN 119; send_message to session_01DgYSWmGEnSrXt1ri867YPN failed (session not found) → Foreman F please tell E | — |

## 2. F1 save→load→save — whole family
Scan (new, law 11): **dev/test/r10-play-rt.js** — plays the robot's bot with the REAL render restored and at EVERY buổi does what a reload does for her (ser → deser → render → ser), listing every differing path by family; by-design repairs counted apart (same filter as r10-rt.js). Plus dev/test/r10-file-vs-load.js (file vs first load, title path or in-place).
Causes found and fixed (all real for her):
| cause | where | effect for her | fix |
|---|---|---|---|
| a load rebuilt her HOME room from homePeople() | j6.js deser | who stood in her room changed on reload; her «đã trò chuyện» marks (S.visit.tk / talked) were dropped = a reload let her talk to everyone again | the room is loaded as saved, home too (old v<3 saves / bad place still rebuilt) |
| servants in the room list saved by VALUE | j6.js ser/deser | after a load the room held a COPY of a maid/eunuch: talking changed the copy, not the real servant (law 6b) | visRelink(): every visitor with a servant ref (sid) is relinked to the live servant (servById) |
| cung nữ start (srvInit) left the houses unsettled (she leaves consort housing AFTER start's palFix) | j42.js srvInit | first reload moved a consort and wrote «Một vị Đáp ứng … dời sang …» in her journal | palFix() at the end of srvInit |
| hue: dead field written at creation, deleted at load (ageInit) | j3 drawFace, j10 mkServ, jstaff elder, jcoopworld friend srv | drift only | not written any more |
| evidence sweep on every load | jtruth.js deser | a reload recorded deeds made since the last turn end early (p.dw +w, evidence trimmed) | sweep at load only for the first load of an old save (endTurn keeps sweeping) |
| «Tiểu X Tử» → «Lão X Tử» at 45 ran ONLY at load (ageInit) | j25.js | a eunuch kept «Tiểu» all life unless she reloaded; a reload renamed him | srvOldName() also on ageYear (new year) |
Before / after (r10-play-rt, render on, one round trip per buổi):
| run | main fd85907a | this branch |
|---|---|---|
| cnv cnv_mat 120 buổi | 99 drift families | 0 |
| cnv cnv_chu 100 buổi | 112 families | 0 |
| td 80 · pf 80 | — | 0 · 0 |
| thd 80 | — | 1 → 0 after the «Lão» fix (staff name) |
Harness part (dev/measure/robot10-in.js roundTrip): the bot page has render OFF, so render-time rules (j95c roster sync, the who-is-where view S.where/S.menW, stage list) never ran there; the audit now lists EVERY path and drops only the reviewed load-time repairs (r10-rt.js filter: item census il.seq/.iu, fcKeep, S.roster labels) + the S.where/S.menW view of that roster. Robot rerun cnv 2 lives: save rows 822 / 473 hits (main build) → 11 (S.where view, now filtered).

## 3. F2 «Sang ngày mới» after load — harness
Scan: **dev/test/r10-night-after-load.js** — saves taken at a pending flip / an open choice / the evening before the flip, loaded through the title in a real Fold page, pressed SYNC (the robot's old loop: 12 presses in ONE page task) vs REAL (as she plays: timers run between presses, every card / kit scene answered).
| saves | SYNC (old robot loop) stuck | REAL stuck |
|---|---|---|
| cnv: 3 wait + 6 open + 9 evening | 0 | 0 |
| td: 6 evening | 4 | 0 (after the harness learned the scenes below) |
| td: 6 open+card | 0 | 0 |
Why the robot read a soft-lock: (a) all 12 presses in one task — jnf step() and the flip clock are timers, they never ran; (b) it pressed only #modal/#ov buttons, while three things wait for HER tap by design: the card-flip scene (jflip .kmov.kcf «tap = final still, the kit button closes it»), manual kit scenes (j93 kmStage, e.g. km-reward, dur 60 s), the stage encounter (jdfv kitFocus .kfoc: a visitor card plays in the stage, the centre modal stays hidden while it plays) and the morning panel #dawn («Tiếp theo»; the flip waits behind it, jflip busy()). Fix (robot10.js nightAfterLoad): node-side loop, 250–400 ms between presses, answers #modal/#ov/.kmov/.kfoc choice buttons/#dawn like she does. No game change.

## 4. F3 shown ≠ applied — harness (law 4 holds)
The card line she sees is built by the kit from fx + x (j17 dilLine: «ngay: <fx> · thành: <x>»; a j67 story option from its own line «tốn: <cost> · thành: <gain>»). The audit read o.x only, so:
| row | what she sees | verdict |
|---|---|---|
| «Bạc lạ» Nhận bạc, làm tai mắt: «Bạc +8» vs bac 20 | «ngay: Bạc +20 · mỗi tháng Bạc +8» (BAL.coopBribe.pay / BAL.ag.why.srv.pun.spyPay, paid monthly in j42) | correct |
| story j67 «Tâm cơ +2/+3», «Sủng +2/+3» vs fx −1 | «tốn: Tâm cơ −1 · thành: Tâm cơ +2» (fx = the cost o.c, gain o.w applied by res67) | correct |
| «Đặt cược … thắng: Bạc +50/+60» vs −20 | stake −20 now, win from BAL.eff.j7/j31 on the roll | correct |
| kiệu «Bạc −6» | weather note, charged later (jweather) — was already skipped; still hit when the note shared a segment | correct |
| «Sức +6» poisonedFish | was real (law 3) | fixed on main (typed-stat-bal, BAL.eff.j68f.fishSwap*) |
Fix (robot10-in.js auditOpt): audits the line she sees (dilLineRaw / j67 line), «ngay:» is its own block, an amount after «mỗi tháng/tuần/buổi/ngày/năm/đêm» is periodic (not the effect applied now). Robot rerun: 0 number rows of this kind (was 2/2 lives).

## 5. F4 memory — harness + real leak family
Census (new **dev/test/r10-dom-census.js**, CDP GC forced): bot page after GC = 5–22 k nodes over 900 buổi (the robot read 200–340 k: garbage not yet collected). Heap after GC: 47 → 96 MB with no reload, 47 → 265 MB with the robot's load every buổi → a load kept something.
**dev/test/r10-load-leak.js** (WeakRef to each old S, 30 in-place loads, GC) + **dev/test/r10-leak-path.js** (heap snapshot, retainer path to a tagged old S): `Window → KIT_AV → P (Map, 900 people) → old S`.
Family = «a per-render / per-life store holds the people of a game that is gone» (newlife-leak.js already checks it; it FAILs 10 on main too):
| store | file | fix |
|---|---|---|
| KIT_AV.P avatar stamp → person (900) | jk2b | weak value (kitWeak / kitDeref, j1) + lifeStore |
| KFP_MAP figure id → person (800) | j79 | weak + lifeStore |
| EMOX mood-seal key → person (600) | jemo | weak + lifeStore |
| KFS_REG figure-seal id → person (600) | jfigseal | weak + lifeStore |
| AG.sc / nc / mwc / askc / na / q / rdMe (keyed rival id + week) | jagent | lifeStore reset — a new life reuses ids+weeks: a cache hit handed the OLD life's consorts to the new one (correctness, not only memory) |
| HA.oc / gv / here / hk (same keying) | jagharm | lifeStore reset |
| NT notice tray lines | jnotice | lifeStore reset (old life's notices showed in the new life) |
| static caches / measure counters (tsTagN, J7I, KSZ_PLATEH, __kotLog, kneLastDay, __tcN, __smgSt, __stf2N) | newlife-leak.js | ALLOW list with reasons (static data / counters); the people-ref scan now ignores a Proxy (KG82_MGBG answers any key) |
| | main | this branch |
|---|---|---|
| r10-load-leak save 005, 30 loads: MB per load / old S reachable | 2.80 MB / 30 of 30 | 0.40 MB / 1 of 30 (80 loads: 0.21 MB, flat) |
| newlife-leak.js | FAIL 10 | FAIL 1 = «old life played ~2 years» (its own driver: endTurn ×3000 reaches wk 3 because jnf holds the night; same on main — test driver, not the game; not touched here) |
Harness: robot10.js memSample forces GC (HeapProfiler.collectGarbage) before reading, so a mem row = memory the game keeps. Robot rerun: no mem row (was 1/2 lives on the same build).

## 6. Robot rerun (cnv cnv_mat, 2 lives, UIEVERY 100, this branch)
| row | R3/R4 (lives) | rerun |
|---|---|---|
| save→load→save | 50/50 | 11 hits S.where (view, filtered since) |
| night stall after load | 11–14/50 | 1/2 → traced to the harness not answering the stage encounter / #dawn → fixed (§3) |
| «Bạc +8» vs bac 20 | 32–40/50 | 0 |
| mem | 28/50 | 0 |
| still listed (owned elsewhere): wall cap (harness), lag (robot10-lag owner), go-tab mspot overlap (MAIN map lane) | | |

Final robot rerun (this branch 1f046fb7, cnv spread 5 bots × 1 life, UIEVERY 100, CAP 700 s): mem 0/5 · «Bạc +8» 0/5 · night stall 1/5 (4 hits, nfX wait — residual R1) · save rows 5/5 but 27 hits (was 31133 on 50 lives; first path R.N.staff.N.fk eun1→eun2 — residual R2) · 2 NEW number rows (residual R3).
Co-op path (F 10:24Z, coop-20261124-0823-p7-8-s): the co-op runner rows come from the same auditor (robot10-in.js auditOpt) → covered by §4; not re-run on co-op here.

## 7. Gates (on 1f046fb7)
| gate | result |
|---|---|
| quickcheck | PASS · old save ok · render 269/266, tab 580/657, buổi 1561/4387 ms (new/live) · core gates PASS |
| coop-e2e seat order Fold-host / iPad-guest | 142/142 |
| coop-e2e COOP_SWAP=1 (iPad-host / Fold-guest) | 142/142 |
| save-slots.js · night-softlock.js | ALL OK · 8/8 PASS |
| newlife-leak.js | FAIL 10 (main) → FAIL 1 (its own 2-year driver, same on main) |
| r10-play-rt (render on) cnv_mat / cnv_chu / td / pf / thd | 0 / 0 / 0 / 0 / 0 drift (main: 99 / 112 on cnv) |
| r10-load-leak save 005 | 2.80 → 0.21 MB per load, old S 30/30 → 1/80 |

SẴN SÀNG KIỂM review/robot-fix-cnv 1f046fb79152dbd09c1dc268775ab4a4aa9e45ea (BIG: save/load + memory + harness) · base origin/main fd85907a · quickcheck PASS · core gates PASS · coop-e2e both seats 142/142.

## HANDOVER (rollover: context ≈ 41 % > START_CTX 5 % + 25 %; Foreman F opens the successor)
State: branch review/robot-fix-cnv 1f046fb7 = SSK above (families 1-4 main causes fixed). Box files (not in git): repro saves /home/user/wt/rfx-out*/saves, robot bug files /home/user/wt/rfx-out{2,3,4}/cnv-*.md, stuck save /home/user/wt/rfx-out3/saves/20261124-1100-001.json.
Residuals for the successor (same four families, smaller; do them on review/robot-fix-cnv-2 on top of 1f046fb7, or on this branch if the BIG reviewer has not started):
- R1 night stall 1/5 (cnv_chu skilled, nfX wait, 4 hits). Probe: EVEONLY=1 / OPENONLY=1 node dev/test/r10-night-after-load.js cnv cnv_chu 3 <seed>, DUMP=<path> keeps a stuck save; watch it with the nfplay pattern (state every press: nfX, Q, #modal, .kmov, .kfoc, #dawn, cfBusy/cfAge, KMQ). Every case traced so far was a screen waiting for her tap (flip scene, km-reward, kitFocus encounter, #dawn); check the robot's answer() selector covers the one left, else it is real.
- R2 save drift R.N.staff.N.fk eun1→eun2 (servant face key by age band, re-picked at load = the same «rule runs only at load» pattern as «Lão»): find the fk refresh (bandKeys / giveFace / staffFace) and run it where the age changes (ageYear), like srvOldName in j25.
- R3 «Sủng +4» shown vs fx sung 5 («Theo ngài lên núi», Tết Trùng cửu) and «Sủng +2» vs 3 («Khóc kể với Hoàng thượng», Việc khó xử): the kit hint shows Sủng through sgTxt (jk2b kitOptModel «SG-CARD: the hint reads the same Sủng the card draws»): decide whether apply() scales Sủng the same way (then the auditor must read through sgTxt too) or the card shows a different number than applied (then a real law-4 fault in sgTxt / apply).
- FOREMAN_E_STATUS.md line «F takes the whole shown≠applied family» appended 12:25Z.

Laws: 1–3 untouched · 4 no number typed (only harness reads) · 5 untouched · 6b one person = one object after a load (visRelink), 6c untouched · 7/9/10/12 no UI, no wording, no kit part changed (no shots) · 11 whole families + scans + tables above · 13 check line · 14–18 no rule changed.

---
# ROBOT FIXER cnv #2 (session_01UV1Szktd1kHeRCPadpEMyu, Foreman F #2, depth 2) — START_CTX ≈ 3 % — residuals R1–R3
PRIORITY #1 CHECK ('faceFor|bandKeys|fk|nmFix|sgTxt|saveSettle|ag.pend'): OD 0 new | ledger 0 | claims this row | main: j17 faceFor/bandKeys, jnamefix nmFix (load/start/month), j1 sgTxt SG-CARD | review/*: robot-fix-cnv 1f046fb7 (base, under BIG review, not moved) | reused: r10-play-rt.js, r10-night-after-load.js, robot10.js, the predecessor's RT_REP filter.
Branch **review/robot-fix-cnv-2** on top of 1f046fb7 (1f046fb7 untouched). Box files (not in git): /home/user/wt/rfx2-out/ (robot runs robot/ + robot2/, probe outputs).

## R2 save drift — GAME (family «a rule settled only at render / load / month, not where the state changes»)
Root: save() runs at the END of render() and BEFORE render() after most actions (j6:12, j23/j82/j83/j85 «save();render()»). Two rules were settled only at render (renderPanel0 → faceInit), at load (ageInit, deser → nmFix) or at the month tick (nmFix):
| cause | where | effect for her | fix |
|---|---|---|---|
| lazy face pick: a new age band (eun0→eun1, ct1→ct2, th0→th1, emp0→emp1), a jmort fc reset, a new hire got its face only at the next render / load | j17 faceFor | the file held the old face key; a reload re-picked a RANDOM face → a person's face changed on reload | j6 **saveSettle()** (faceInit before every write) + faceInit at ageYear (j25, beside srvOldName) |
| palace elders (jstaff giveFace) stored fk «mama» for every age while faceInit asked for the maid band key (womid at 28–50) | jstaff / j17 | every render / load re-picked the elder's face (mama pool → maid pools: also not the elder pool) | one band rule: bandKeys «elder» = womid/mama by BAL.ageBand[2]; giveFace and faceInit both use it |
| mid-month name clash: a new servant / consort sharing a short form with someone (seen: «Trình Tố Huyên» beside HER «Kiều Tố Huyên»; consort «Tiêu Chỉ Nhược») was renamed only at load / month (jnamefix nmFix, why "like") | jnamefix | a reload renamed a living person and rewrote her journal (robot row «S.logs … Phú Sát ma ma → Trưởng Tôn ma ma») | saveSettle() runs nmFix("save") before writing (≈2.6 ms measured; the load renames the same way with cards open) |
Harness (render-time, 0 with render on): the bot page never calls save() (it is in render) → robot10-in.js roundTrip calls saveSettle() before reading s1 (= what the file holds); the rivals' plan bookkeeping S.ag.pend / did / log (j95c render → j95sync → placeWhere → jagent agTick/agReapply) joins the reviewed repair filter (RT_REP) — dev/test/r10-play-rt.js (render on, does NOT filter them) = 0.
Scan (law 11): **dev/test/r10-face-band.js** (robot bot page, ser → load → ser every buổi; FILTER=<path regex>, OP=<js> instead of the load, DUMP=<file>).
| scan (400 buổi unless noted) | 1f046fb7 | this branch |
|---|---|---|
| face paths on reload, cnv_chu s3 300 buổi | 2 (R.0.staff.0.fk eun0→eun1) | 0 |
| face paths on reload, cnv_mat s5 300 buổi | 12 (consort ct1→ct2, staff eun1→eun2, thO th0→th1, emp emp0→emp1) | 0 |
| unsettled name clash (OP nmFix) cnv_chu s3 | 5 paths (s121 «Cố Lạc Anh» renamed) | 0 |
| unsettled name clash cnv_mat s5 / cnv_ban s5 | 16 (consort «Tiêu Chỉ Nhược»), 5 (staff) on the first build without saveSettle | 0 / 0 |
| every load drift except reviewed repairs, cnv_chu s3 | 7 (ag.did 4, fk 3) | fk 0 · rest = render-time ag.* (filtered, 0 render-on) |
| r10-play-rt render on cnv_mat s5 / cnv_chu s3, 150 buổi | — | 0 / 0 |

## R3 «Sủng +4» vs fx 5, «Sủng +2» vs 3 — HARNESS (law 4 holds)
sg() (j1): Hoàng thượng lạnh lùng ×.7 on gains → sg(5)=4, sg(3)=2; apply() adds sg(fx.sung); the kit draws HER literal Sủng through sgTxt (kitParse j63, kitOptModel jk2b). Card = applied. The auditor read the raw line and raw fx. Fix (robot10-in.js auditOpt): reads the line through sgTxt and compares Sủng with sg(effect) (a no-break-space-marked number may also equal the raw effect: sgFix).
Scan: **dev/test/r10-sung-audit.js** (bot, Hoàng thượng temper forced none / lạnh lùng / nồng nàn; checks every option with one Sủng change: sgTxt number vs sg(o.fx.sung), plus the robot's own Sủng rows).
| run (cnv_mat 700 buổi) | old auditor (1f046fb7) | new auditor |
|---|---|---|
| lạnh lùng, seed 5 | 28 options checked · card≠applied 0 · robot rows **2** («Sủng +4» vs 5, «Sủng +2» vs 3 = R3 exactly) | — |
| lạnh lùng, seeds 9 / 13 | — | 40 + 22 checked · card≠applied 0 · rows 0 |
| nồng nàn, seeds 3 / 9 / 13 | — | 35 + 7 + 28 checked · 0 · 0 |
| none, seed 5 | — | 40 checked · 0 · 0 |

## R1 night stall after load (1/5 before) — NOT REPRODUCED
| probe | saves | REAL (she plays) stuck | robot loop stuck |
|---|---|---|---|
| r10-night-after-load cnv cnv_chu, seeds 3 / 11 / 23 (wait + open) | 18 | 0 | 0 |
| same, EVEONLY, seed 109338969 (the R1 life's seed) | 9 | 0 | 0 |
| robot rerun ×2 (cnv spread 5 bots, UIEVERY 100, CAP 700) | 10 lives | night row 0/5 · 0/5 | |
Code read: jnf step() leaves «wait» only when no flip dialog (nfsum / FLIPQ) is queued; after a reload FLIPQ is empty, so a «wait» save opens the choice on the first step tick; every case the predecessor traced was a screen waiting for her tap. No game change; if the row comes back, the robot attaches the save (saves/), replay with r10-night-after-load.js DUMP.

## Robot rerun (this branch, cnv spread 5 bots × 1 life, UIEVERY 100, CAP 700)
| row | 1f046fb7 (predecessor final) | rerun 1 (adc0c3cd) | rerun 2 (173d3dfa) |
|---|---|---|---|
| night stall after load | 1/5 (4 hits) | 0/5 | 0/5 |
| save→load→save | 5/5 · 27 hits (fk) | 5/5 · 15 (ag.pend, logs rename) | 1/5 · 1 (S.ag.log, render-time → filtered 7aa243a3) |
| number rows (Sủng) | 2 | 0 | 0 |
| mem / «Bạc +8» | 0 / 0 | 0 / 0 | 0 / 0 |
| still listed, owned elsewhere | wall cap (harness), lag [fold] tab 402–515 ms (robot10-lag owner) | same | same |

## Gates (on 173d3dfa = last game change; 7aa243a3 adds harness filter only)
| gate | result |
|---|---|
| quickcheck | PASS · old save ok · render 264/285, tab 648/683, buổi 1787/2277 ms (new/live) · core gates PASS · time-spill PASS |
| coop-e2e Fold-host / iPad-guest · COOP_SWAP=1 | 142/142 · 142/142 |
| save-slots.js · night-softlock.js | ALL OK · 8/8 PASS |
| r10-play-rt render on cnv_mat / cnv_chu 150 buổi | 0 / 0 drift |
Laws: 1–3, 5 untouched · 4 no typed number (elder band reads BAL.ageBand[2]; Sủng audit only) · 6b a person keeps her face and name across a reload · 7/9/10/12 no UI, wording or kit change · 11 whole families + 2 scans + tables · 13 check line · 14–18 no rule changed.

SẴN SÀNG KIỂM review/robot-fix-cnv-2 7aa243a3aaeac569d89618d947dfa25b503c9842 (on top of 1f046fb7) · quickcheck PASS · core gates PASS · coop-e2e both seats 142/142.
## BIG REVIEW (opus, session_01UV1Szm25UYRL53kk7urYNo, depth 2, START_CTX ≈ 3 %) — review/robot-fix-cnv-r1 98040f4c
PRIORITY #1 CHECK ('visRelink|lifeStore|r10-play-rt|r10-load-leak|newlife-leak|AGD.oc|DF.p'): OD 2 (ROBOT PLAYTEST 23/11, MAIN 119 07:40Z) | ledger 0 | claims: REVIEW row (this session), ROBOT FIXER cnv #2 (review/robot-fix-cnv-2, residuals R1-R3) | main: lifeStore registry j1, r10-rt.js filter, newlife-leak.js | review/*: robot-fix-cnv-2 (no overlap with the r1 edits below).
Branch: review/robot-fix-cnv-r1 = 1f046fb7 + merge LIVE 178cac37 + r1 fixes (e2f4eb12) + merge LIVE c6c3ca76 + merge LIVE 15b5e1ff → **98040f4c** (FF from origin/main 15b5e1ff).

### Code read (all 15 game files of the diff)
OK: deser loads the room as saved (home too; v<3 / bad place still rebuilt) · visRelink (sid → live servant) · srvInit palFix · hue removal (no reader of a servant/consort .hue left; pv/pEmp use the constant 0) · jtruth sweep only on the first load of an old save (endTurn keeps sweeping) · srvOldName on ageYear (j17 ageYear ages allServ, j3 calls it by name → the j25 wrapper runs; j17 is before j25) · KIT_AV / KFP_MAP / EMOX / KFS_REG weak + lifeStore · AG / HA / NT lifeStore. Harness: auditOpt reads the line she sees (law 4: the harness reads game text, computes no game number), nightAfterLoad presses with the page running, memSample after forced GC.

### Found and fixed here (review/robot-fix-cnv-r1 e2f4eb12)
| # | law / family | finding (scan) | fix |
|---|---|---|---|
| 1 | 6b one person = one object | NEW scan dev/test/r10-shared-ref.js (every object reached by 2 paths before a load must still be ONE object after deser(ser())): «S.visit.people.N.ref = S.men.N» (Nhạc sư Kiều Bá Ước in HER HOME room) split into a copy. visRelink relinked only servants (sid); with the home room now kept as saved this hit the home room too | visRelink also relinks a man of S.men (id+name) and the one-of persons (Hoàng thượng, Thái hậu, her maid, court officials, by name+role+kind). After: 0 person splits (cnv 40 loads, td 40 loads); only S.empWhy = S.nightWhy.emp (a data record, no person) left |
| 2 | F4 per-life store (newlife-leak on the merge FAILed 10, not 1) | DF (jdfv stage encounter: DF.p visitor, DF.F kitFocus) kept the old life's visitor («DF.3.3.0», g.DF old names) | lifeStore «DF stage encounter»: closes it on new life / load / title |
| 3 | F4 | AGD.lz (jagday day-plan queue) holds its old world | lifeStore «AGD.lz» (it already dropped itself on another world). NOT reset: AGD.oc — resetting it at load re-plans the day and rewrote S.ag.log on reload (r10-play-rt thd: 9 drift families → reverted, 0) → residual R5 |
| 4 | F4 weak maps | NEW scan dev/test/r10-weak-dead.js (forced GC, every live stamp on screen on 4 tabs must still resolve) | no fix needed: cnv kav 325/0 · kfs 16/0 · kfp 32/0 · emo 404/0; td 169/0 · 12/0 · 72/0 · 167/0 (seen/dead) |
| 5 | test | newlife-leak ALLOW KES_HAVE (seal picture url probe cache, static) | — |

### Gates (re-run by me)
| gate | result |
|---|---|
| quickcheck b3853e5e (merge 178cac37) · 659d2f09 (merge c6c3ca76) · 98040f4c | PASS · PASS (render 230/226, tab 476/426, buổi 994/1407 ms; old save ok; core gates PASS) · see last line |
| coop-e2e both seat orders on 659d2f09 | 142/142 · COOP_SWAP=1 142/142 (on the 178cac37 merge both orders read 137-138/162 — the same on bare main 178cac37 (135/162): the stale «#mr button» driver, fixed on main by test-mrfoot d521656c) |
| r10-play-rt render on | cnv_mat 120 → 0 · cnv_chu 100 → 0 · pf 80 → 0 · thd 80 → 0 (after r1 #3) · td 80 → 1 family: S.lost.N.at «me» → 11 (jil census at load runs loEntry, which self-heals a stale holder; jil/jlost untouched by this branch) → residual R6 |
| r10-load-leak (own save, 30 loads) | 0.13-0.17 MB per load (main: 2.80), old S reachable 2-3/30 |
| r10-night-after-load cnv_chu 3 lives | 8 saves at a pending flip: REAL stuck 0 (old SYNC loop 1) |
| newlife-leak | person refs of the old life: start / rebirth / load clean after r1 #2 except AGD.oc (R5); remaining FAILs = its own 2-year driver (same on main) + «store bigger» size noise of the new life's own refill (KFP_MAP, KPM_LOG, __rcvN; no person) |
| night-softlock · save-slots | 8/8 PASS · ALL OK (final-build save-slots run cut by my batch time limit after all 1180x820 + 844x390 rows ok) |
| robot10 cnv spread 5 bots × 1 life (UIEVERY 100, CAP 700, on e2f4eb12) | mem 0/5 · «Bạc +8» / number rows 0/5 · night stall 1/5 (2 hits, nfX done, residual R1) · save rows 5/5, 118 hits (R3/R4 main: 31133 on 50 lives) first paths: S.logs.N ma ma name «Khổng ma ma» → «Lâm ma ma» (2 lives, NEW residual R4), S.thO.staff.N.fk mama→womid + R.N.staff.N.fk eun1→eun2 (R2), S.ag.did.N «0-0»→«0-1» (R5 family) · ui-text-overlap rows (Tuần lục kbk on Fold, go-tab mspot on iPad) = owned elsewhere |

### Harness filter spot-check (3 rows by hand)
(1) save.S.il.seq / inv.N.iu: item census ledger ids (S.il.at not saved → census at load); internal ids, nothing she sees. (2) save.S.where / S.menW: render-on play (play-rt REP has NO where/menW) gives 0 drift on cnv/pf/thd → only the render-off bot page sees it; not hiding a game bug. (3) save.S.roster.*: unfiltered run (cnv_chu 40) shows load re-sync of the roster labels («Tư Mã Nhu Gia sang Ngự hoa viên: … chọn 1 người theo hầu» → «theo hầu Tư Mã Nhu Gia ở Ngự hoa viên (đi cùng từ đầu)») and roster.m r4/r6 7→6 — a by-design re-sync reviewed in nc-fix-1, unchanged here; noted for F (wording of the who-is-where line can change on a reload).

### Residuals for ROBOT FIXER cnv #2 (review/robot-fix-cnv-2) — added to its R1-R3
- R4 save drift: a journal line S.logs.N changes the ma ma name on reload («Khổng ma ma (Quản sự ma ma Càn Ninh cung)» → «Lâm ma ma …», repro: robot cnv-20261124-1412 life cnv_ma/cnv_mat @ buổi #86) — an elder ma ma re-made (new name) at load and a log line following it = the «rule runs only at load» family (jstaff elderName / staffInit at load).
- R5 AGD.oc (jagday, id+week keyed day plans) is not saved: a load keeps the cache in place, a real page reload re-plans (S.ag.did / S.ag.log differ); a new life can hit the old life's entry (newlife-leak «AGD.3.N…»). Save it or derive it, then lifeStore it.
- R6 S.lost.N.at stale holder corrected only when loEntry runs (census at load) → keep c.at in step when the piece moves.
Laws: 1-3 untouched · 4 harness reads only · 5 untouched · 6b fixed + scanned (r10-shared-ref) · 6c untouched · 7/9/10/12 no UI / wording / kit change (no shots needed) · 11 whole families + 2 new scans + tables · 13 check lines · 14-18 no rule changed.
Final build 98040f4c (merge LIVE 15b5e1ff: tests + coop worker only, game code = 659d2f09): quickcheck PASS (render 243/212, tab 504/471, buổi 1491/1337 ms, old save ok, core gates PASS) · coop-e2e 142/142 Fold-host and 142/142 COOP_SWAP=1.
**VERDICT: PASS — LAND READY robot-fix-cnv 98040f4c** (review/robot-fix-cnv-r1, FF from origin/main 15b5e1ff). Families 3 («Bạc +8») and 4 (memory) gone; families 1 (save drift, 31133 → 118 hits) and 2 (night stall 1/5) much smaller, their rest = residuals R1-R6, owned by ROBOT FIXER cnv #2.
HANDOVER (context 28 % = START_CTX 3 % + 25 %): this reviewer stops here. The review of review/robot-fix-cnv-2 goes to a FRESH reviewer (Foreman F opens it). Note for it: -2 is built on 1f046fb7 and edits j6.js (saveSettle) — merge it onto review/robot-fix-cnv-r1 98040f4c (this r1 also edits j6 visRelink + jdfv + jagday), re-run r10-shared-ref + r10-play-rt + newlife-leak + coop-e2e both seats on that merge. Box files (not in git): /home/user/wt/rvout (logs, robot run cnv-20261124-1412 + saves).

## ROBOT FIXER cnv #2 — rebase on r1 + LIVE (F #3 order: 98040f4c lost → 659d2f09 + origin/main d0ed42e4)
**review/robot-fix-cnv-2 f78c695c** = 7aa243a3 + merge c6c3ca76 + merge review/robot-fix-cnv-r1 659d2f09 (j6.js: r1 visRelink body + saveSettle/save kept side by side; only conflict besides index.html/sw.js) + merge origin/main d0ed42e4; index.html/sw.js rebuilt. FF from origin/main d0ed42e4 and from 659d2f09.
| gate (on f78c695c) | result |
|---|---|
| quickcheck | PASS · old save ok · render 344/303, tab 797/636, buổi 1660/2008 ms (new/live) · core gates PASS |
| coop-e2e Fold-host / COOP_SWAP=1 | 142/142 · 142/142 |
| r10-shared-ref cnv_mat 30 loads | 0 split families |
| r10-weak-dead cnv_mat 150 buổi | 0 dead stamps (kav 930 · kfs 72 · kfp 124 · emo 1045) |
| save-slots · night-softlock | ALL OK · 8/8 PASS |
| r10-face-band cnv_mat s5 / cnv_chu s3 300 buổi | 0 / 0 |
| newlife-leak | FAIL 2 = its own 2-year driver (same on main) + «win.__kitLastEvArt new 2 > fresh 0» (a kit counter from main, no person ref) |
| **r10-play-rt render on cnv_mat s5 / cnv_chu s3 150 buổi** | **DRIFT 17 / 10 families** (S.ag.log/pend/did, S.visit.people kind srv→npc / npc→peddler, S.where, S.npw) — see R7 |
R7 isolation (same probe, same seeds): 659d2f09 (r1) alone 0 / 1 (R.N.rel) · 659d2f09 + origin/main d0ed42e4 (WITHOUT -2) **16** / 0 · -2 at 173d3dfa (before both merges) 0 / 0 · f78c695c 17 / 10. → the render-on drift comes with the r1 + LIVE merge (agent plan / room list re-made at load), not from saveSettle; the per-seed counts move because every build changes the run.
R4 (BIG review: journal «Khổng ma ma» → «Lâm ma ma» on reload): **covered** by saveSettle → nmFix("save") (the ma ma rename was a jnamefix clash rename at load; same as «Phú Sát ma ma → Trưởng Tôn ma ma» above). Probe r10-face-band FILTER ^save.S.logs, cnv_ma s5 cautious 300 buổi: load 0 · OP staffInit() 0.

## HANDOVER (ROBOT FIXER cnv #2 → #3; rollover: context ≈ 28 % = START_CTX 3 % + 25 %; F #3 opens the successor)
State: review/robot-fix-cnv-2 f78c695c pushed = READY for the fresh BIG reviewer EXCEPT R7 below (reviewer decides: land with R7 as a residual, or the successor fixes R7 first). Box files: /home/user/wt/rfx2 (worktree), /home/user/wt/rfx2-out/ (g3 gates, robot, robot2, probes), /home/user/wt/rfx2-r1 (659d2f09 + d0ed42e4 test merge, not pushed — delete).
Open for the successor (all on review/robot-fix-cnv-2):
- R7 render-on drift after the r1 + LIVE merge: S.ag.log / pend / did and S.visit.people (kind srv→npc, npc→peddler, name/ini/info/lid) change on reload WITH render on. Start: dev/test/r10-play-rt.js cnv cnv_mat 150 5 on 659d2f09 vs 659d2f09+d0ed42e4 (0 → 16): bisect the main commits between c6c3ca76 and d0ed42e4 (git log c6c3ca76..d0ed42e4) and r1's jagday change (AGD.lz lifeStore) — the room list (S.visit) is loaded as saved since robot-fix-cnv (j6 deser), so a kind change means something re-makes S.visit at load or at the first render after it.
- R5 AGD.oc (jagday day-plan cache, id+week keyed) not saved: save it or derive it, then lifeStore it (BIG review text above).
- R6 S.lost.N.at stale holder fixed only by the load census (jil loEntry) → keep c.at in step when the piece moves.
- R1 night stall: not reproduced (see above); only if the robot shows it again.
Laws: as above; no UI / wording / kit change; no typed number.

## ROBOT FIXER cnv #3 (opus, session_01UV1SziKNwwyvgm7Tp4E7AD, depth 3, START_CTX ≈ 3 %) — R7 / newlife-leak / R5 / R6
PRIORITY #1 CHECK ('robot-fix-cnv'): OD 0 | ledger 0 | claims 8 | main 0 | review/* 3 | archive 0 → reused review/robot-fix-cnv-2 f78c695c + this report; no second mechanism.
Branch review/robot-fix-cnv-2: 0dd1e105 (R7 game + probe) → **80f49094** (R5/R6 + probe). NOT merged with LIVE 502c48c9 yet (main since d0ed42e4 = kit UI only: jk3/jk4/jkitsel/jopic/jtoil/jwkg…). NOT READY (see R7 verdict).

### R7 findings (root, measured)
1. **The old r10-play-rt drift is NOT deterministic**: same build f78c695c, same seed (cnv_mat s5) gave 9 families, then 0 on the next run. Bisecting main is meaningless (c6c3ca76..d0ed42e4 touches only kit UI files: jk3, jk4, jkitsel, jopic) — the counts move with CPU timing.
2. Cause of the timing: jagent **AGL deferred jobs** (staff day slices AGD.lz via agLater «lz», khắc resync «sync», news scan «kn», consort deed «slice»). At every buổi press 15-25 of them are still pending when render() → save() writes the file (measured: every round trip had `lz` + `kn` pending, often `sync`). The old probe took ser() INSIDE nextBuoi (before they ran); deser's j95sync then applied the pending resync synchronously → roster rows / S.ag.* / stage changed = «drift». Proof (dbg probe, 4 seeds): draining AGL + render() before s1 → stage/roster drift gone, «repairs by design» per round trip ≈10 → <1; left: S.emoSeen (jemo emoSee runs at the START of render, before the stage takes newcomers) 2/4 seeds, S.ag.pend.N.gone (derived flag set only in agWatch after a sync) 1/4.
3. Real-game consequence (not only harness): the file written by the press render is pre-deferred-work and nothing writes it again until her next tap; a reload in between loses the staff slices (AGD.lz dies with the page) and re-plans. Also jqsave/jspread HOLD the autosave while a code card waits (by design) and the bot page stubs save() (inpage6) — any file-based probe must handle both.
### Changes (pushed)
| file | change |
|---|---|
| jagent.js | agSettleSave(): when the AGL queue is empty again after jobs ran, save() once more (file = settled state); agSyncNow: after the deferred j95sync, `j95final() → renderStage()` (same rule as goTo/talk/nextBuoi wrappers, under __rdefer) |
| j6.js saveSettle | + emoSee() (who she sees on the stage) · + R6: loEntry(c) for open S.lost cases (stale holder c.at corrected at save; was load census jil only) |
| jagday.js (R5) | AGD.oc entry keeps its world `w:S`, agDecideDay uses it only in that world; lifeStore «AGD.oc» clears it (its options hold people of the world they were built in; agDecideDay rebuilds them when missing — pure perf memo, nothing to save) |
| newlife-leak.js | ALLOW __kitLastEvArt with proof: one slot, every set replaces the whole object ({src,lab}: jgift ×3, j87, jk2b kitEvArt returns `{src,lab}`), cleared by resultShow / closeModal / lifeStore → size = 2 keys, not a growing store |
| r10-play-rt.js | NEW method = the real file round trip: real save() restored (inpage6 stubs it); after each buổi press wait until AGL is empty (+80 ms, +AGL again), skip while the autosave is held (JQ.held / SP13.held) or a mini-game / night flip is pending; s1 = the FILE; deser → render → wait AGL → s2 = the FILE. IDLEDBG=1 prints idle times + log() stacks inside the round trip |
Cost check (dev tool /home/user/wt/rfx3-tools/stepcost.js, 30 bot steps cnv_mat): saves 290 → 343 (+18 %), renderStage 398 → 425, wall 33 → 38 s; no loop.

### R7 verdict: NOT CLOSED — the new file probe is still noisy
A/B with the NEW probe, 60 round trips, seed 3 (same probe on both builds; runs differ run to run):
| run | f78c695c (before) | 80f49094 / 0dd1e105 (after) |
|---|---|---|
| A cnv_mat | 147 families (repairs 908) | 1 (save.P kyngo card; repairs 41) |
| A cnv_chu | 49 (repairs 660) | 35 (repairs 28) |
| B cnv_mat (+80 ms yield, R5/R6 built) | 7 (S.tb.b/Cb/d, save.P kyngo; repairs 472) | 129 (repairs 293) |
| B cnv_chu | 5 (same) | 35 (repairs 32) |
Every big «after» row starts with a NEW journal line «Đến Ngự hoa viên» written INSIDE the round trip (stack: a bare goTo from a timer, e.g. j77 «Đi» `setTimeout(()=>goTo(k),0)`; also k61Meet from showModal on the loaded card). That is the in-place load handing an OLD-world timer the loaded world — a real page reload kills those timers — so these rows are not trustworthy either way, and the A/B is inconclusive. «Repairs by design» (roster re-sync at load) is lower after the fix in 4/4 runs.
Other families seen (both builds): S.tb.b / S.tb.Cb / S.tb.d (buổi key re-made at load — not traced), save.P kyngo card dropped at load (BY DESIGN: jky `PEND.kyngo=()=>null`, «a save made with a kỳ ngộ card open: the card is not rebuilt; the encounter stays used» — F/owner to judge whether losing the encounter on reload is acceptable).
### newlife-leak / R1 / gates
newlife-leak NOT re-run after the ALLOW (CPU taken by R7 runs); the 2-year-driver FAIL not analysed. R1 not touched. Gates (quickcheck, coop-e2e both seats, shared-ref, weak-dead, save-slots, night-softlock, face-band, old saves) NOT run on 80f49094.

## HANDOVER (FIXER #3 → #4; rollover: context ≈ 30 % ≥ START_CTX 3 % + 25 %; F #3 opens the successor)
Box: /home/user/wt/rfx3 (worktree, branch review/robot-fix-cnv-2 @80f49094), /home/user/wt/rfx3-old (f78c695c + new probe, detached), /home/user/wt/rfx3-out (all runs), /home/user/wt/rfx3-tools (stepcost.js, r10-play-rt-dbg.js = SETTLE=1 drain-before-ser variant).
Next, in order:
1. Make the probe a TRUE reload: per round trip open the saved FILE in a fresh page (or `location.reload()` with localStorage kept + load slot via the title path, which also runs kmReset), render, wait AGL, read the file. No old-world timers. Run before/after (f78c695c vs 80f49094) on cnv_mat / cnv_chu, 2 seeds each.
2. With that probe decide: keep agSettleSave + syncStage (if after ≤ before) or revert them (jagent.js only); keep the saveSettle emoSee / loEntry lines if their families are 0.
3. Trace S.tb.b/Cb/d (buổi key re-made at load) if it survives the true-reload probe.
4. Re-run newlife-leak (ALLOW __kitLastEvArt in place) and look at its 2-year driver FAIL; then merge origin/main 502c48c9 (or newer), rebuild, full gate set (quickcheck, coop-e2e both seats, r10-shared-ref, r10-weak-dead, r10-play-rt on/off, newlife-leak, save-slots, night-softlock, face-band, old saves), report, «READY robot-fix-cnv-2 <sha>» to F.
Laws: 1-3, 5 untouched · 4 no typed number · 6b R5 memo no longer carries an old world's people · 7/9/10/12 no UI / wording / kit change · 11 families named + scans/tables above · 14-18 no rule changed.

## BIG REVIEW r1 RE-LAND (opus, session_01UV1Szjz8ctXWggjwCu5NY3, depth 3, START_CTX ≈ 3 %) — review/robot-fix-cnv-r1 e50af91a
PRIORITY #1 CHECK ('robot-fix-cnv'): OD 0 | ledger 0 | claims 8 | main 0 | review/* 3 | archive 0 → re-land of the already-PASSED r1 work; brief briefs/F-robot-fix-cnv-review.md reused.
Branch: 659d2f09 + merge LIVE 502c48c9 (conflicts index.html/sw.js only → rebuilt) = **e50af91a**, pushed, ls-remote verified. LIVE delta since c6c3ca76 (27 commits: kit-sqopt, kit-mgboardof, kit-toilring, kit-titleplate, kit-noprewarn, kit-mapgo, robot-coop-fix-1 gzip + coop-wire tests) touches none of the r1 files (j6/jdfv/jagday/j1/j25/jstaff/jtruth…); `git diff origin/main HEAD` over dev/build, dev/test, dev/measure, coop = byte-identical to the r1 delta that passed (`git diff c6c3ca76 659d2f09`). So the code read of the 98040f4c PASS stands; no reviewer code change.
Gates: table in FOREMAN_F_STATUS.md «FOR MAIN 127 / LC12 … LAND READY robot-fix-cnv-r1 e50af91a». r10-play-rt render on was run 3× on r1 and 3× on LIVE with the same harness (r1 test files copied, uncommitted, into a LIVE worktree): r1 0/0/0, LIVE 88/109 families → not worse than LIVE.
New note for FIXER #4 (pre-existing, same on LIVE, not a blocker): r10-rt on the LIVE-written quickcheck save — at the first load the home room holds «Lão Minh Tử» (kind serv, sid 1) while servById(1) = null (a copy with no live servant, law 6b family); the next load drops her (room 2 → 1 người).
Laws: 1–3, 5 untouched · 4 harness reads only · 6b as at the PASS (shared-ref 0 person splits) · 7/9/10/12 no UI / wording / kit change in r1 (LIVE kit changes were reviewed on their own branches) · 11 scans re-run · 13 check line · 14–18 no rule changed.
**VERDICT: PASS — LAND READY robot-fix-cnv-r1 e50af91a (FF from LIVE 502c48c9).** Done; this reviewer stops.
