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

## 7. Gates
(filled below at SSK)

Laws: 1–3 untouched · 4 no number typed (only harness reads) · 5 untouched · 6b one person = one object after a load (visRelink), 6c untouched · 7/9/10/12 no UI, no wording, no kit part changed (no shots) · 11 whole families + scans + tables above · 13 check line · 14–18 no rule changed.
