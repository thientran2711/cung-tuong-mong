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
