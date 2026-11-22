# coop-thin G — WEEK END + HER PERSONAL MONTH ON THE HOST — STEP 0 (report first, before code)

PRIORITY #1 CHECK ('coop-thin-g|herWeek|gWk|coopGuest|THINMAX 13|colCheck ctx|seatWeek ctx'): OD 1 (17/11 ~01:15Z thin guest, option 2, VERBATIM: "end state is 2 ONLY … each part moved to 2 drops the guest's own computation for good") | ledger 0 | claims CLAIMS:318 (this worker only for G) | main 7bc73251: no part G (jcoopthin A–F4 + E on LIVE) | review/* none for G (base review/coop-thin-f6b-r1 6194dd6a = F5 + hostnull + F6a + F6b) | archive: audit §3 row G, f6.md family 6/12 (colCheck must never run in her context on the host), f2.md:236 (sfx attribution), f2.md:237 / hostnull.md:67 (Tranh ghế L6 = L7).

Worker session_01N1tNP4tAZPWV3hUSqy8aiQ (opus), depth 8 (limit 8), coordinator Foreman B ROOT-7 session_01N1tNP3bh5eNWUZw2nJQW4G.
START_CTX ≈ 4 % of 1M (used_tokens reads 0; estimate) → rollover at ≈ 29 %, ceiling 60 %.
Branch review/coop-thin-g STACKED on origin/review/coop-thin-f6b-r1 6194dd6a. Worktree /home/user/wt/ctg (sparse). Local Worker (THINMAX 13): `cd coop/worker && npx wrangler dev --port 8787 --ip 127.0.0.1`.

## 0a. Every week-end / month step that runs PER SEAT today (level 12, base 6194dd6a)
| # | step | file:line | where her copy runs today | G (level 13) |
|---|---|---|---|---|
| 1 | night go → each seat runs `nextBuoi` under CW.allowN → `endTurn` | jcoopworld.js:654-658 nCheck; :803 nextBuoi wrapper | her PHONE (local nextBuoi → endTurn on her local S) | host runs HER endTurn in withSeat("b") on her store (TH.seatOf b), from the top of the event loop, BEFORE his own (same pre-week world her phone saw); her phone runs nothing at go |
| 2 | endTurn body: resolveTonight, Sủng −1, Sức regain, rivalsTurn, monthTick (tuan 2), makeDil, rollWx, placeWhere, flip, newLots, deal | j3.js:95-108 | her phone; world writes dropped by the part C lens; world loops muted by worldOn()=false (jcoopone MUTE / ONLY_ME / PERSON, inline worldOn j3/j8/j13) | same code in her context with `worldOn()` false (CW.gWk: the guest-side guards run exactly as on her phone) and every world write put back after (part E's wSnap / wRestore) |
| 3 | monthTick (her stipend monthPay, pray/fert/confined…, maidMonth, pregMonth, itemMonth, anMonth, restock (shop), oanMonth, assignHouses, illMonth, coldMonth, servRanks, servMonth, facMonth, Đức→Thanh danh, kidsMonth, rivalsMonth, storyMonth, heirMonth, …) | j3.js:110-… | her phone | host, in her context (row 2) |
| 4 | 46 endTurn wrappers (jcoopone guard table, jcol colCheck, jpromo, jreign, jseat, jstaff, jsteal, jmort, jpetlife, jvisit, jdh/jdh2 npcOK, …) | j*.js (scan: `grep -l "endTurn=function"`) | her phone; ~22 of them test `COOPW.seat!=="a"` directly (list §0d) | the seat tests read ONE helper `coopGuest()` = guest seat OR her week end on the host (CW.gWk) → same branch as on her phone |
| 5 | jcoopworld endTurn wrapper: CW.pend = true, lockNext, render; CW.news | jcoopworld.js:799-801 | her phone (then tryEnd → sendEnd) | in her context: the host's CW.pend / news / inTurn are kept (her week end never marks the HOST's week as ended) |
| 6 | sendEnd: toCanon + guestNet → `{t:"end",week,state:C}` | jcoopworld.js:241 | her phone sends her C (P.b = her phone's person) | guest never sends `end`; host's toCanon writes P.b = her store (+ his acts on her stand-in as DELTAS, the rule merge3 applied) |
| 7 | Worker: `end` → sub-<seat>; tick when both ended → merge3(base, sub-a, sub-b) | coop/worker/src/index.js:261-268, :346-353; merge.js | server | level ≥ 13: the host's `end` ticks alone, F = the host's C (no merge3, no sub-b); a guest `end` is refused (error "thinend", ignored by the client) |
| 8 | week: fromCanon rebuild on each seat; drop of the host's store of her (rebuilt from C.P.b) | jcoopworld.js:580 onWeek; jcoopthinb.js:135 drop | both | guest: fromCanon(C) = apply the host's snapshot (display); host: same (her store rebuilt from his own serialization = no change) |
| 9 | reign ending (G5): empWeek → emperorDies (her heir → Thái hậu / tuẫn táng) on BOTH seats | jcoopworld.js:785-795 | her phone, from the merged week | host runs hers in her context in onWeek BEFORE his own (the world's S.emp still the old Emperor), result written to her store + CW.base.P.b + patch |
| 10 | seat caps after the merge (G20): seatWeek on the guest | jcoopworld.js:752 | her phone | host, in her context, after his own endTurn (his new rank is real, her stand-in sees it): promoFullSeat card = part-D card |
| 11 | Tuần mới news card (CW.mine = her stats after her endTurn) | jcoopworld.js:565 newsHTML | her phone | her store keeps S.gMine (her stats right after her week end); her phone's card reads it |
| 12 | her death in the week end (die → over: lifeSave / record on the DEVICE, over card, CW.dying) | j3.js:145, j32.js:32, jcoopworld.js:815 | her phone | in her context: S.dead + S.coopOver = [h,t,fate,alive] only; her phone runs the real over() from the week (the existing path for a death caused on the other seat: onWeek → die) |
| 13 | colCheck (Sưu tầm): endTurn + render wrapper, DEVICE ledger "cung-colms" | jcol.js:23, :36-37 | her phone | never in her context on the host (would write the HOST's device ledger, f6.md); her phone's render-time colCheck keeps doing it on her device |
| 14 | other DEVICE ledgers reachable from her week end (record "cung-kiep", ctm-arcs, ctm-e68h, ctm-rare97, succBook, ctm-ge, cung-luanhoi, NL_KEY …) | j3:144, j67:41, j68:12/14, j97:281, j99succ:178, jge:61/142/158, jkiep, j52 | her phone (her device) | in her week-end context every store.set / localStorage write is kept OFF the host's device (logged TH.G.dev); FOR H: replay them on her phone (list of keys seen in the 12-month run in Done) |
| 15 | seat copies `seat` / `seatd` (her week for a rejoin) + local snap ctm-coop-wk | jcoopworld.js:845-882; index.js:190-212 | her phone → server seat-b | guest: off at level 13 (her week lives on the host); host's own copy unchanged (H) |
| 16 | syncRoom re-end / CW.restore of her week | jcoopworld.js:619-624, :885+ | her phone | guest: no re-end, no restore of her own week at level 13 (the host's snapshot is the truth) |

## 0b. Where her copy lives
- Level ≤ 12: during the week her person is the HOST's store (TH.seatOf("b"): her acts F1–F6, her buổi E, her cards D) + her phone's local copy (patched by the host, her tối `erd` diff sends her phone's own changes back). At the week end her PHONE's copy runs the week (row 1) and goes to the server; the host's store is dropped at `week` and rebuilt from the merged C.P.b.
- Level 13: the host's store is the ONE copy for the whole week, week end included; her phone only shows it (patches during the week, the host's C at `week`).

## 0c. Old-room upgrade path (C.thin < 13 save → 13)
The room level is negotiated per connection (min(want, cap a, cap b), Worker thinIn). A room saved at ≤ 12 holds C.P.b = the last MERGED week. At level 13 the host's store is built from exactly that P.b the first time it is used (TH.seatOf, unchanged code): "the host takes P_b from the last merged C once"; from then on the host writes P.b. Nothing in C changes shape, so every item / kid / servant in P.b stays (law 6c). Test: §Tests 'old room upgrade' (a level-12 week with her items, then the room reopened at 13: P.b before == host store after, item ids equal).

## 0d. Seat-guard family (rows 4, LUẬT SỬA CẢ NHÓM) — scan `grep -n "COOPW.seat\|C.seat\|CW.seat" non-co-op j*.js`
22 world/guest guards read the seat directly: j10:37/57, j39:52, jagent:27, jdemo:13, jdh:48, jdh2:36, jemoact:88, jfigx:40/49, jil:30, jkh:40, jlux:140, jmline:20, jmort:35, jnpcd:77, jnroad:15, jpet:128, jpetlife:38, jpq:35, jpromo:108, jreign:30, jseat:20, jsmg:99 (via worldOn), jstaff:20, jsteal:35, jvisit:18, jweather:40. Not guards (kept): jmem:247 (id tag), jil:62 (already ctx), jil:213 / jsmg:127 (message sender), jcloud / jmcal (room bookkeeping). All guards → `coopGuest()` (one helper, jcoopworld), so her week end on the host takes the same branch her phone took.

## 0e. Measured host week end today (level 12, host Fold 686x880, CPU ×4, local Worker, probe dev/test/coop-thin-g-perf.js, median of 7)
| run | own endTurn (with render) | without render |
|---|---|---|
| plain week (tuan 0) | 2979 ms | 2275 ms |
| month week (tuan 2 → monthTick) | 1282 ms | 527 ms |
(First run in a fresh room carries one-off warm-up; re-measured with G built, same probe, both persons.) Perf gate: her week end in context b ≤ +40 % of his own.

## Next (building)
CAP 12 → 13, Worker THINMAX 13, everything behind TH.on(13) (`gW()`); levels 0–12 + solo unchanged except the seat-guard helper (same value outside her week end). New module dev/build/jcoopthing.js (after jcoopthinf6b). Then the leftovers: sfx / attribution of her week-end effects (TH.tapRun → her phone), Tranh ghế rounds in her context (j34 contestWeek), colCheck (row 13).

## #1 progress — review/coop-thin-g @ 670e4468 (pushed; j34 Tranh ghế pid cards + test settle not yet committed)
Built (level 13 = G, CAP 13, Worker THINMAX 13, all behind gW() = TH.on(13); levels 0–12 + solo unchanged except the seat-guard helper, same value outside her week end):
- **dev/build/jcoopthing.js** (new, after jcoopthinf6b): CW.gNight (her week end in withSeat b BEFORE his own, from the event-loop top; waits while her part-D cards are open / she is in a mini game), herWeek (real nextBuoi under allowN → endTurn with CW.gWk: coopGuest() true = her phone's guards; world put back by E.wSnap/wRestore; rivalsBuoi / placeWhere off; her stand-in of the host put back = world frame (standBack, else the bridge copied her loops' writes on his entry onto the HOST: G3 found sung/danh/suc/th/duc moving); her screen effects → E.eui; S.gMine), CW.gHold (his end waits), CW.gBlob (P.b from her store), CW.gEmp (at week: her reign ending before his, seat cap, her places = his; written to CW.base.P.b), device ledgers kept off the host inside gWk (G.dev; seen: ctm-e68h), colCheck never in her context.
- **jcoopworld.js**: coopGuest() / worldOn(); gW() / gG(); sendEnd (guest never; host waits gHold); toCanon P.b = gBlob + his stand-in acts as DELTAS (merge3 NOADD rule, G_NOADD); onWeek (her ending → over(...S.coopOver) on her phone; gEmp before his empWeek; guest skips empWeek / seatWeek; S.gMine news); nCheck (host: gNight before his own night; guest: on go only waits, CW.sent = w); syncRoom re-end and begin restore off on the guest; snapSave off on the guest; endTurn wrapper in gWk keeps the host's pend/news/inTurn; over in gWk = flags only; flip / resolveTonight / heirMonth take the guest branch in gWk; seatWeek / empWeek per seat context.
- **seat-guard family** (§0d): 28 sites in 26 files → coopGuest(); jvisit myPid + jmem id tag follow the context (identity).
- **Worker** (coop/worker/src/index.js): thin ≥ 13 → host `end` ticks with his C (tick(hostC), no merge3 / sub-b); guest `end` → error thinend; guest seat/seatd → seatok, nothing kept. test/thin.test.mjs §8 (7 cases) — `npm test` thin ALL OK.
- **j34 Tranh ghế** (leftover): the three cards (Vòng 1 Tài nghệ, Vòng 2 Đức hạnh, giữa các vòng) are pid cards (PEND.ctR1 / ctR2 / ctMid) so they travel as part-D cards; solo same card, same rolls. Vòng 1's mini game in her context on the host = dice (FOR H: her phone plays it as a score intent). The ONE-board issue (G21: the host's contest scores her stand-in as an NPC; her context can open its own) stays (contest-board part).
- TH.uiMiss counts her-context screen calls that are not replayed (sfx attribution).
Tests so far (local Worker): coop-thin-g G0–G3 10/11 → 11/11 after the `mat` (derived, not stored) and `visit` (display cache) exclusions: G1 weeks at L13 (her phone ran 0 endTurn, sent 0 end; host ran hers once a week; her phone == host store), G2 her month on the host == SOLO rules with the same dice (personal keys: bạc 62 = 62, Sủng, Danh, Sức, Đức, Thanh danh, kids, items, servants, pregnancy, illness), G3 host person + host device storage untouched by her week end. 12-month run (36 weeks) running: 17/17 weeks ok except one TRANSIENT at week 4 (her phone suc/duc/th ≠ store right after the week; next weeks equal) → test now waits up to 10 s and logs which side it settles to. one-core guard / text / text-rule / bind PASS.
Perf (CPU ×4, host Fold, month week): own 1720 ms, her week end in context b 344 ms incl. 3 catch-up day steps (probe) → +20 %; in the real flow her week end 32–90 ms per week (G.ms) → ≤ +6 %. Gate +40 %: PASS.

### #1 results after the progress note (review/coop-thin-g @ 2d4bf86d)
- 12-month run (WEEKS=36, host Fold / guest iPad, old test without settle): **72/79**. Every week: her phone ran 0 endTurn, sent 0 `end`, the host ran her week end once (G.stat.week 36, err 0, skip 0), weeks merged once. Her phone ≠ host store right after the week in 5 of 36 weeks: w4 suc/duc/th, w22 bạc 45→25 + Sủng 2→5, w33/34/36 Danh −1 on her phone. A rerun with the 10 s settle (g4) showed w4 bạc 60 vs 20 + Thanh danh 8 vs 13 NOT settling: her PHONE spent 40 bạc / gained Thanh danh after the week (a local write, not in the host store until her next `erd` at her next ready). Not a G write (her week end runs only on the host) — a guest-side writer after `week` (part F/H residue or a card answered locally). TRIP=1 WEEKS=6 run: 19/19 (no divergence that time, writers not caught yet).
- G3 (36-week run): the host's own `maid` differed after her probe week end (deep diff added in 2d4bf86d to name the field; 2-week and 6-week runs PASS G3 — may be the host's own render after the run, not her week end).
- Page error seen once in the 36-week run: `console: jptime npcDeed ally TypeError: Cannot read properties of null (reading 'id') at whereOf … together` (check at L12 on the base 6194dd6a: pre-existing or G).
- Perf (G.ms, real weeks): her week end 30–90 ms per week on the host (his own week end 1.3–3.0 s) → ≤ +6 %; probe month week +20 %. Gate +40 %: PASS.
- one-core guard / text / text-rule / bind PASS. role-parity.test.js crashed (process killed for memory while the 36-week run held 2 browsers): rerun alone.
- Worker `npm test`: all OK (thin §8 7 cases).

## ROLLOVER HANDOVER #1 → #2 (11/20/2026; context ≈ 28 % ≥ START 4 % + 25 %) — Foreman B opens the successor
Worktree /home/user/wt/ctg (sparse, hooks; branch review/coop-thin-g @ 2d4bf86d). Local Worker: `cd /home/user/wt/ctg/coop/worker && npx wrangler dev --port 8787 --ip 127.0.0.1` (THINMAX 13; npm install done). Old build for coop-cyc: /home/user/wt/ctg/.tmp/old.html (origin/main 7bc73251 assembled; main worktree /home/user/wt/ctg-main). Logs /home/user/wt/ctg-out. Regression runner: `/home/user/wt/ctg-out/reg.sh <ids…>` (ids: g4 g4s gup a as b bs c cs d ds e es f1 f1s … f6b f6bs hn e2e e2es night timer cyc cycs ow) → one line each in /home/user/wt/ctg-out/reg-sum.txt. Run ONE lane at a time (the box has 4 CPUs / 15 GB; two browser lanes + role-parity hit the memory limit). Another container: recreate the worktree from review/coop-thin-g and copy reg.sh from this report's command list.
Left, in order:
1. The divergence after `week` (above): run `TRIP=1 WEEKS=8 node dev/test/coop-thin-g.js http://127.0.0.1:8787 13` until a TRANSIENT shows the guest writer (TRIP line). If it is a guest-side rule run after `week` → move it to the host / her context (law: guest only displays); if it is a local card answer → it is part F/H (list it for H). Then make G1 compare after her next `erd` or accept the transient with the writer named.
2. G3 maid field (deep diff now prints it): if a real leak through her week end → extend standBack / the bridge rule; if the host's own render → exclude like `visit`.
3. jptime npcDeed whereOf(null) console error: reproduce on 6194dd6a at L12 (coop-thin-f6b or a 12-week coop-thin-g with level 12: `UP` off, `node dev/test/coop-thin-g.js <W> 12` needs G1 skipped there) → pre-existing (FOR B) or G (fix).
4. Gates (brief): coop-thin-g L13 + swap (g4, g4s), UP=1 old-room upgrade (gup), coop-thin a–f6b + hostnull at L13 (+ swap for each), coop-cyc + swap (THIN=13), coop-e2e (+ swap, level 0 = old path), coop-night / coop-timer THIN=13, coop-one-world seeds 1–10, role-parity alone, undef-scan (no file of that name in the repo: say so or ask Foreman B), Worker npm test, quickcheck (`bash dev/tools/quickcheck.sh` after `bash dev/site/build_site.sh` + commit of index.html / sw.js), perf `MONTH=1 CPU=4 node dev/test/coop-thin-g-perf.js <W> 13`.
5. Merge coop-ptime-reds (review/coop-ptime-reds-r1 2f328213) + newest LIVE main when Foreman B says (or before SSK); rerun g4 + e2e after.
6. LOOK: host Fold 755x1000@2 + guest iPad 1180x820@2 at the week turn (her dawn card on her phone, "Tuần mới"), scratch only.
7. '## Done': moved / retired paths table (rows 1–16 of §0a), seat-guard family before/after (28 sites), tests table, perf, leftovers for H: Tranh ghế Vòng 1 mini game in her context = dice (score intent), the ONE contest board (G21), device-ledger replay on her phone (G.dev keys: ctm-e68h seen), host seat copy + CW.restore, her phone's post-week local writers (item 1). CLAIMS 'SẴN SÀNG KIỂM <sha>', send_message Foreman B. FOR MAIN: Worker THINMAX 13 deploy at landing.

## #2 progress — worker session_01N1tNP64cNhXeETmhKekESy (opus), depth 8 (limit 8); START_CTX ≈ 3 % of 1M → rollover ≈ 28 %, ceiling 60 %
PRIORITY #1 CHECK ('wwc|wwPid|D.bad|live card|tsDressGame ctx|ptNpcBack'): OD 0 new | ledger 0 | main 72f7c0c5: no G | review/* none for these (D.bad noted in D r1 only as a console warning) | claims CLAIMS:323 (this worker).
Branch review/coop-thin-g @ 9d68dea2 (pushed).
1. **Item 1 named + fixed — the guest-side LOCAL write after `week` = the world windows' cards** (jworld EVD.<k>.card: Lễ Phật đản «Cúng dường hậu hĩnh» −40 bạc / Thái hậu +5 = the w4 bạc/th divergence, reproduced with TRIP; Vạn thọ «Dâng lễ vật vừa phải» −20 bạc / Sủng +3 = the w22 one). Her phone built them itself (jworld render hook → worldShow) and answered on its own S; at level 13 nothing carried that answer to the host, and the next week's snapshot undid it (her choice lost). LUẬT SỬA CẢ NHÓM — the whole family (all 28 EVD cards in jworld / jworld2): at level 13 her phone builds none (window.wwGuestOff); the host runs worldShow in HER context whenever the world has a window / end note her store has not seen (jcoopthing wwHers, from the render hook via D.later); a card with options goes out as the pid card «wwc» (jworld PEND.wwc, rebuilt from the window id at her pick, run in her context). Solo / levels ≤ 12 unchanged (worldShow pushes the same object; the pid is only added when wwPid()).
2. **Second family found on the way — her cards with options and NO pid raised in her context on the host were DROPPED** (part D takeQ keeps only pid cards / notes; D.bad): «Hội phối đồ: báo đề» / «Hội phối đồ · <đề>» (jts tsPanel), «Một ánh mắt» (j24 manPoem), «Thái hậu triệu», «Có người đến», «Bổng lộc tháng …», «Bổng lộc bị cắt xén», «Việc của kẻ hầu», «Kẻ hầu xin» (seen in 5-week runs, G.liveK). Until level 13 her phone raised them in its own week end. Fix (whole family, one place): at level 13 such a card gets pid «live» and stays in the host's memory by id (D.LIVE) until her pick (the host's `end` waits while she has an open card, so its references are still her store's); her phone shows the native look (stand-in drops pid/pp). Host reload = stale (pick-stale, counted D.liveLost). FOR H: give each a real pid (G.liveK lists the titles).
   With «Hội phối đồ · <đề>» now reaching her, its «Tự tay phối đồ» opens the F6b dress board + mirror on HER phone (as designed); the room waits while she plays (CW.frPz). The test bot now finishes a mini game opened on a phone (skip / Để mặt mộc / Đã hiểu).
3. Item 3 (console `jptime npcDeed ally … whereOf(null)`): ptNpcBack ran a sent NPC deed whose target was never recorded (tgt null) and its fn threw; now such a deed lands nowhere (same outcome, no throw). Not G-specific (jptime landing).
4. Merged review/coop-thin-laydo f4fad288 + origin/main 72f7c0c5 (coop-ptime-reds r1 LIVE). Conflicts: jcoopthin UICAP / uiPlay = hostnull's paced queue + ptime's kitNotice / noteGo; jcoopthinf ptTickHer counted apart; jrcv keeps coopAccepted (superset of ptime's COOPW.inv → O[0]); test launch flags = main's.
Tests: G6 (world card built on the host in her context, arrives as a part-D card, her phone built none; her pick «Cúng dường» lands in her store −40 / +5 and her phone == store) PASS; G7 (no card of hers dropped, none lost) PASS; 5-week run 14/14 incl. G1 every week (no divergence), G2 same dice, G3; Worker npm test thin ALL OK; undef-scan PASS; one-core guard / text / text-rule / bind PASS.
5. **12-month run (WEEKS=36, host Fold / guest iPad, @9d68dea2): 81/83** (was 72/79). Every week: her phone ran 0 endTurn, sent 0 `end`, the host ran hers once; the bạc / Thanh danh / Danh divergences are gone; G6, G7 (36 weeks: no card dropped, none lost; live titles e.g. «Có người đến» ×27, «Kẻ hầu xin» ×5, «Hội phối đồ: báo đề» ×3), G3 (host person + device untouched; kept off: ctm-e68h ×41, ctm-phucduyen ×1), no page errors (the jptime whereOf error gone). Her week end on the host: median 69 ms, max 272 ms (his 1.3–3 s): perf gate PASS.
   Two reds: (a) **G2 Danh 22 vs 25** = the test's solo side ran a world window (EVD.thi start: her house's student → Danh +3), which in co-op is the host's world (her share rides his week as a delta on her entry) → test fixed (solo side BAL.world.on = 0). (b) **week 31 `staff` host 1 / phone 0, one week only** (week 32 equal): her phone lacked one servant the host store had until the next snapshot. Not caught yet → OPEN (repro: `TRIP=1 WEEKS=36 node dev/test/coop-thin-g.js <W> 13`, look at the TRIP line of a staff TRANSIENT; suspects: a live «Kẻ hầu xin» / «Việc của kẻ hầu» pick answered after the week whose staff patch did not apply on her phone, or a guest-side servant writer).
6. Merged review/coop-thin-f6b-r1 **26f36042** (F6b final on LIVE 94c3bddc) → review/coop-thin-g @ **0891e223**: jcoopthin / jrcv / jcoopthinf now identical to F6b except G's own lines (uiMiss count, CAP 13); ONE noteGo (F6b's, in uiPump; the duplicate from the earlier main merge removed). undef-scan PASS, Worker npm test thin ALL OK.
7. Regression lane #1 @0891e223 (local Worker THINMAX 13, `bash dev/test/coop-thin-g-reg.sh <ids>`, logs /home/user/wt/ctg-out/r-<id>.log): g4s 18/18, gup 16/16 (old room upgrade: nothing lost), b + bs PASS; **g4 17/18** (G2: bạc 66 vs 86 + staff 1 vs 0 — host-context side hired a servant (BAL.house.hireBac 20) that the solo side did not; with the solo side's world now off this may be a world-driven hire, or a real seat-guard branch difference in jstaff/fillStaff → OPEN); **a / as**: 'level 1 on both' (the a-suite asserts its own level; at 13 = by design) + as 'host sees the friend' (OPEN: check at L12 on the same build); **c / cs**: C2 '0/0 … 53 without an NPC effect' + C4 'sentW null' (C4 asserts her SENT week: at 13 she sends none = by design; C2 found no act kind to check: check at L12); **d / ds 7 reds**: 'kit: guest copy renders like the native card' ×6 (diffs only in data-kfsp / data-kav = animation counters; check the suite's noise filter at L12) + **'invite guest→host: an offer (sent as do inv)' (OPEN, may be real)**.

## ROLLOVER HANDOVER #2 → #3 (11/20/2026; context ≈ START 3 % + 25 %) — Foreman B opens the successor
Copy into any handover (brief rules, verbatim): LINEAGE (owner 17/11; threshold overwritten by owner 18/11 ~07:33Z): your first STATUS/HANDOVER line states "depth <get_session lineage.depth>"; open workers as your children; ALWAYS roll over by opening your own child foreman (create_session) at EVERY depth the system allows, up to the limit (8) — never stop early; ONLY when create_session is refused (limit reached or any error) write the handover + send "TAKE OVER NOW" to your line's standby (FOREMAN B ROOT STANDBY id in FOREMAN_B_STATUS) or a FOR MAIN line if none. Every takeover prompt copies this line.
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217): the "Lượt n/30" counter is only a display counter; trigger = context: roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % (hard ceiling). Workers roll over too (owner 16/11 08:22Z s14, option 1): a worker writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
Worktree /home/user/wt/ctg (sparse, hooks; branch review/coop-thin-g @ 0891e223, pushed). Docs worktree /home/user/wt/ho (branch ho-ctg2 → pushes to the handover branch). Local Worker: `cd /home/user/wt/ctg/coop/worker && npx wrangler dev --port 8787 --ip 127.0.0.1`. ONE browser lane at a time (a container restart killed a run when two ran). A new container: recreate both worktrees (fetch under flock, --depth=30, +refs/heads/<b>:refs/remotes/origin/<b>).
Left, in order:
1. Lane #1 reds (item 7): rerun a, c, d at their OWN level on this build (`node dev/test/coop-thin-<x>.js <W> 12 0`) — a red at 12 that F6b-r1 26f36042 also has = pre-existing (FOR B); a red only at 13 that is a level-only assertion (a 'level 1', c C4 'sentW') = mark by-design in the report; **d 'invite guest→host (do inv)' and as 'host sees the friend' at 13 = look for a G cause**.
2. g4 G2 (bạc/staff, item 7) and the week-31 staff transient (item 5b): one TRIP=1 run; name the writer; fix if G.
3. Lane #2: e es f1 f1s f2 f2s f3 f3s f4 f4s f5 f5s f6 f6s f6b f6bs hn; lane #3: e2e e2es e2e0 night timer cyc cycs ow (seeds 1–10). role-parity alone (`node dev/test/role-parity.test.js`), quickcheck (`bash dev/tools/quickcheck.sh` after build_site + commit), perf `MONTH=1 CPU=4 node dev/test/coop-thin-g-perf.js <W> 13`. undef-scan (dev/test/undef-scan.js, now on the branch via main) PASS; Worker npm test PASS; one-core ×4 PASS.
4. LOOK: host Fold 755x1000@2 + guest iPad 1180x820@2 at the week turn (her dawn card, «Tuần mới», one world card «Lễ Phật đản» as a part-D card), scratch only.
5. '## Done' (rows 1–16 moved / retired table, seat-guard 28 sites before/after, tests table, perf, leftovers for H: Tranh ghế Vòng 1 = dice in her context (score intent), ONE contest board (G21), device-ledger replay on her phone (G.devKeys: ctm-e68h, ctm-phucduyen), host seat copy + CW.restore, the «live» cards → real pids (G.liveK titles), world windows' tick/start effects on HER entry ride his week as deltas (EVD.thi her house Danh) — confirm none is lost). CLAIMS 'SẴN SÀNG KIỂM <sha>', send_message Foreman B. FOR MAIN: Worker THINMAX 13 deploy at landing.

## #3 progress — worker session_01N1tNP3y9fZk3T7nNd8hbsy (opus), depth 8 (limit 8); START_CTX ≈ 4 % of 1M → rollover ≈ 29 %, ceiling 60 %
PRIORITY #1 CHECK ('cyHostOwns gWk|prSeen staged|jchat guest'): OD 0 new | ledger 0 | main 40e26887: no G | review/* none | claims CLAIMS:340 (this worker).
Coordinator now STANDBY B session_01N1tNP5jYfeoWoXsWr5eqKN (B ROOT-8 hit depth 8). Branch review/coop-thin-g @ **0a481290** (pushed): 6388345b + merge origin/main **40e26887** (82b39c41, mgcal BAL-only; index/sw rebuilt) + 0a481290.
Fixed / changed:
- **jchat guest()** (main's palace-chatter, landed after #1's scan) → also true for coopGuest(): seat-guard family now 29 sites (scan: `seat!=="a"|seat==="b"` in non-co-op j*.js = 0 left except jcloud's room bookkeeping).
- **jcycle cyHostOwns()** (jcoopthine) true in her week end on the host (CW.gWk): her week end took the HOST branch (asked her Kỳ nguyệt sự card inside the week end / could auto-answer it), her phone at L12 takes neither; the host's own flip asks it after (cyWait → herCy). NOT yet proven: coop-cyc L13 still red (below).
- Tests: f1–f6b setup stages `S.prSeen={r:3}` with its staged `S.rank=3` (at L13 the host correctly gives the rank-3 set at her first act in her context → the twin differed: f3 B1 / f4 P1 / f5 P1 reds; f4 was red at L12 too); g probe waits until her seat is free (held / mini game → herWeek skipped = g4 'G2 ran' red) and traces writers of danh/sung/bac/staff + hire calls on both sides (HIRE / TW lines); c table has a `tog` column.
Lane results @82b39c41 (local Worker THINMAX 13):
| suite | L13 | L12 (same build) | verdict |
|---|---|---|---|
| g4 / g4s / gup | 18/19 · 17/18 · 16/16 | — | g4 'G2 ran' = probe during her mini game (test fixed); g4s G2 Danh 33 vs 36 (solo +3) OPEN: rerun g4s, the TW lines name the writer |
| a / as | 1 red each | same red | 'level 1 on both' = level-only assertion (by design); 'host sees the friend' green now (was flaky) |
| b / bs, e / es, f1/f1s, f2/f2s, f5s, f6/f6s, f6b/f6bs, hn | PASS | | |
| c / cs | C2 + C4 / C4 | c L12 16/16 | by design: from level 6 her acts are F1 intents (part C act frame retired: every act returns "" on her phone, ops 0 — `tog` true too); C4 = she sends no `end` at L13 |
| d / ds | 7 reds | the same 7 at L12 | pre-existing (FOR B): kit ×6 = data-kfsp / data-kav animation counters; 'invite guest→host' = her act on someone not beside her is an errand (jerr, LIVE main) → returns "" |
| f3 / f3s / f4 / f4s / f5 | 1 red each | f3 L12 PASS, f4 L12 same red | rank-set staging (test fixed above) — RERUN to confirm |
| e2e / e2es / e2e0 | 68/68 each | | |
| night (THIN=13) | 92/101 | 105/105 | **OPEN, G**: 4 'guest night only when the clock ends (-1)' (likely level-only: she runs no night at 13), 4/9 'both in the next week (exactly one step) [3,3,3]', 5 'both at buổi tối', 7/9/13 'same buổi + same clock on both', 10 'after reload khắc + acts kept', 13 'stats + khắc after a buổi change and a rejoin' |
| timer (THIN=13) | 41/43 (4: info dialog read for her / no choice made for her) | 39/43 (3 mini game → B steps, 4 day ends, 5 reloads) | different reds each level: compare once more |
| cyc (THIN=13) | 53/74 after the cyHostOwns fix (was fails=20) | 73/73 | **OPEN, G** (below) |
| cycs, ow 1–10, role-parity, quickcheck, perf, LOOK | not run (the 2 h lane limit killed the lane at cycs) | | |
| Worker npm test, undef-scan, one-core guard / text / text-rule / bind | PASS | | |
**coop-cyc L13 diagnosis so far** (CYC_DBG=1 CYC_ONLY=dung,lui,som; logs /home/user/wt/ctg-out/cycd3.log): dung + lui pass; in som the host is at wk 4 (COOP week 3, "Chờ hảo hữu…") while her store is still tuan 1, and the host's friend entry (her stand-in) still has the OLD name ("Thẩm Bích Dao" vs her store "Thẩm Bích Dao 3"): cyBase(stand-in) ≠ her cycle → cyWait false → no hold, no card. So at L13 the HOST's own week end ran before hers / before the test's staging reached his stand-in. Check: (1) G.stat / G.log at that moment (did gNight run her week end before his own for week 3→4?); (2) when the stand-in takes identity / cycle fields from her store at L13 (at ≤12 the merge rebuilt it every week from her sent C) — if only at `week`, a staging between the host's end and the room tick never reaches the draw; (3) the test's merge helper presses both seats: at 13 the host may end before her store advanced. A fix must keep "her card is asked at the start of her cycle tuần, the host's draw waits for it" (law: NPCs never act before the player saw the info). 'mixed' (old main guest, room drops to 12 mid-room) is red at 13 in every run and green at 12: the 13 → 12 downgrade path (her store on the host, then her phone runs the week end again) needs a look — CW.gHold / gBlob state left from 13?

## ROLLOVER HANDOVER #3 → #4 (11/20/2026; context ≈ START 4 % + 25 %) — Foreman B (STANDBY B session_01N1tNP5jYfeoWoXsWr5eqKN) opens the successor
Copy into any handover (brief rules, verbatim): LINEAGE (owner 17/11; threshold overwritten by owner 18/11 ~07:33Z): your first STATUS/HANDOVER line states "depth <get_session lineage.depth>"; open workers as your children; ALWAYS roll over by opening your own child foreman (create_session) at EVERY depth the system allows, up to the limit (8) — never stop early; ONLY when create_session is refused (limit reached or any error) write the handover + send "TAKE OVER NOW" to your line's standby (FOREMAN B ROOT STANDBY id in FOREMAN_B_STATUS) or a FOR MAIN line if none. Every takeover prompt copies this line.
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217): the "Lượt n/30" counter is only a display counter; trigger = context: roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % (hard ceiling). Workers roll over too (owner 16/11 08:22Z s14, option 1): a worker writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
Setup (a new container): worktree from review/coop-thin-g (fetch under flock, --depth=30, +refs/heads/<b>:refs/remotes/origin/<b>, sparse); `python3 dev/build/assemble.py` (dev/index.html is not in git — tests serve it); `cd coop/worker && npm install && npx wrangler dev --port 8787 --ip 127.0.0.1`; coop-cyc's old guest needs .tmp/old.html = origin/main assembled (sparse worktree with /dev/build/ /rank/worker/src/ /dev/site/*.js /dev/site/*.css). Lanes: `SUM=<file> bash dev/test/coop-thin-g-reg.sh <ids>` — run each lane as its own background command (the 2 h background limit killed a combined lane); ONE browser lane at a time.
Left, in order:
1. **coop-cyc at THIN=13** (diagnosis above) → fix in G, then cyc + cycs green (L12 stays 73/73).
2. **coop-night at THIN=13** (92/101; L12 105/105): sort level-only assertions (her phone runs no night at 13: mark by design) from real ones (same buổi / same clock on both, one step per week, khắc kept after reload) → fix the real ones.
3. coop-timer THIN=13 vs 12 (different reds each run: rerun both once).
4. Reruns after the test fixes: f3 f3s f4 f4s f5 f5s, g4 g4s (read the TW / HIRE lines for g4s Danh +3 on the solo side).
5. Lane: cycs, ow (seeds 1–10), role-parity alone, perf `MONTH=1 CPU=4 node dev/test/coop-thin-g-perf.js <W> 13`, build_site + commit + `bash dev/tools/quickcheck.sh`.
6. Week-31 staff transient (#2 item 5b): `TRIP=1 WEEKS=36 node dev/test/coop-thin-g.js <W> 13` (long: own background command).
7. LOOK Fold 755x1000@2 + iPad 1180x820@2 at the week turn (scratch only), '## Done' (see #2 handover item 5 + this section's table), merge newest origin/main, CLAIMS 'SẴN SÀNG KIỂM <sha>', send_message Foreman B. FOR MAIN: Worker THINMAX 13 deploy at landing.

## #4 progress — worker session_01N1tNP5UhwqVC9izL9jLJXf (opus), depth 1 (limit 8); START_CTX ≈ 6 % of 1M → rollover ≈ 31 %, ceiling 60 %
PRIORITY #1 CHECK ('frIdent|mgB TOIL.st|clrK|coop-cyc THIN 13'): OD 0 new | ledger 0 | main 70bea3d3: no G | review/* none | claims CLAIMS:379 (this worker).
Branch review/coop-thin-g @ **f1b926a3** (pushed): 7880ab5f merge origin/main **70bea3d3** (only index.html / sw.js conflicted: rebuilt) + 27aceb4c + f1b926a3. undef-scan PASS, Worker npm test thin ALL OK after the merge.
coop-cyc L13 diagnosis (the #3 "host week runs ahead / stand-in stale") = FOUR causes, two in the game (G), two in the test bot:
1. **G (fixed, jcoopthing frIdent)**: her entry in the host's world (friend entry: his deck / tray / book) took name / age / pregnancy only from the merged week (fromCanon → placeFriend; jcoopworld liveStats drops a pos whose name differs). At L13 her store is her person: a mid-week change left the entry stale, so the host's draw read a stale cycle (cycOn / cyTray: her Kỳ nguyệt sự card never asked). Now the identity fields are copied from her store after every run in her context, before the host's flip and on repaint (L13 only).
2. **G (fixed, jcoopthing mgOut/mgIn)**: module state outside S — jtoil TOIL.st (toilette in progress) and j82 KG82.run — is one copy per page; a run in her context (her Hội phối đồ / mirror) could overwrite or clear the HOST's own open game. Each run in her context now sees her own copy (G.mgB), his is put back (G.stat.mgHer counts her changes). Audit §4 family (state outside S); L ≤ 12 untouched (FOR B: same leak may exist at 9–12 through F6b's per-intent CX12 only).
3. **test bot** (cyc / night / timer / e2e, whole family): never closed a mini game open on HER phone (F6b dress board → the room correctly waits, CW.frPz) → added the coop-thin-g mgSkip; finishes a mini game ONCE ('…done' first, each button once: clicking «Để mặt mộc» again restarted the reveal forever).
4. **test bot**: clicked the hidden #mclose of a kit info card (its close is the ✕) and always the first option (a card that stays open, e.g. «Có người bán tin») → visible buttons only + next option when the same card stays open.
Results: **coop-cyc THIN=13 73/73** (mixed old guest included: green once the week stopped stalling). Lane @f1b926a3: cycs (THIN 13 swap) 70/73, cyc THIN 9 71/73, cyc THIN 12 71/73 — the remaining red at every level = **giau 'host drew her (forced deck)' + 'guest has the same night'** (her giấu keeps her card on the tray, forced deck, host draws nobody): the same red Foreman B found on LIVE dbddaed2 at THIN 9 → **pre-existing, not G (FOR B)**; swap adds 'giau: host's draw waits' (same case). coop-night THIN 13 @f1b926a3 **95/101** (was 92/101; case 4 clock-end check now green): reds 4 + 9 "exactly one step" [3,3,3], 5 "both at buổi tối" (host pend, sent 2), 9 "same buổi + same clock" ["3:0","3:3"], 10 guest khắc / acts after reload, 13 guest stats after buổi change + rejoin (log /home/user/wt/ctg-out/night1.log).

## ROLLOVER HANDOVER #4 → #5 (11/20/2026; context ≈ 36 % > START 6 % + 25 %) — Foreman B ROOT-1 (session_01N1tNP4TLZqJMNrsakh7Bjk) opens the successor
Copy into any handover (brief rules, verbatim): LINEAGE (owner 17/11; threshold overwritten by owner 18/11 ~07:33Z): your first STATUS/HANDOVER line states "depth <get_session lineage.depth>"; open workers as your children; ALWAYS roll over by opening your own child foreman (create_session) at EVERY depth the system allows, up to the limit (8) — never stop early; ONLY when create_session is refused (limit reached or any error) write the handover + send "TAKE OVER NOW" to your line's standby (FOREMAN B ROOT STANDBY id in FOREMAN_B_STATUS) or a FOR MAIN line if none. Every takeover prompt copies this line.
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217): the "Lượt n/30" counter is only a display counter; trigger = context: roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % (hard ceiling). Workers roll over too (owner 16/11 08:22Z s14, option 1): a worker writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
Setup: as #3 (worktree from review/coop-thin-g, `python3 dev/build/assemble.py`, `cd coop/worker && npm install && npx wrangler dev --port 8787 --ip 127.0.0.1`, .tmp/old.html = origin/main assembled for coop-cyc mixed). LANE TIP: a long lane = ONE script file run as ONE background command (`bash lane.sh` with run_in_background + timeout 7200000); `(a; b; c &)` blocks and dies at 30 min. Debug switches on coop-cyc: CYC_DBG=1 (dumps: dbg merge / hostOv / hostModal / flA), CYC_STOP=1 (exit at the first failed merge), CYC_ONLY=dung,lui,som,giau.
Left, in order:
1. **coop-night THIN=13** (with the fixed bot): read night1.log (or rerun `THIN=13 node dev/test/coop-night.js <out> <W>`); case 4 now reads her g-go (CW.sent) as "her night committed" (L13: her phone runs no night = by design); the remaining reds — 4/9 one step, 5 both at tối (host pend, sent 2 = his `end` held: check gHold / herFree / his Q with the merge-dump fields of coop-cyc), 9 / 13 same buổi + clock after a rejoin, 10 khắc kept after reload — sort level-only from real, fix the real ones (G).
2. coop-timer THIN 13 vs 12 (bot fixed: rerun both).
3. Reruns: f3 f3s f4 f4s f5 f5s, g4 g4s (+ TW / HIRE lines for g4s Danh +3), e2e e2es e2e0 (bot changed), cyc + cycs once more.
4. ow seeds 1–10, role-parity alone, perf `MONTH=1 CPU=4 node dev/test/coop-thin-g-perf.js <W> 13`, build_site + commit + `bash dev/tools/quickcheck.sh`, week-31 staff transient (`TRIP=1 WEEKS=36 node dev/test/coop-thin-g.js <W> 13`).
5. LOOK Fold 755x1000@2 + iPad 1180x820@2 at the week turn (scratch only), '## Done' (moved / retired rows 1–16, seat-guard 29 sites, tests table, perf, leftovers for H incl. the giau pre-existing red and item 2's L ≤ 12 note), merge newest origin/main, CLAIMS 'SẴN SÀNG KIỂM <sha>', send_message Foreman B. FOR MAIN: Worker THINMAX 13 deploy at landing.

## #5 progress — worker session_01N1tNP5Wy7doJg2EzqJMECh (opus), depth 2 (limit 8); START_CTX ≈ 5 % of 1M → rollover ≈ 30 %, ceiling 60 %
PRIORITY #1 CHECK ('kgDefer coop-thin|gG snapSave used|coop-night THIN 13'): OD 0 new | ledger 0 | main 8cf6b7d7: no G | review/* none for G (coop-staff-split = other B worker, not my files) | claims CLAIMS:443 (this worker).
- d476d3b9 merge origin/main 8cf6b7d7 (pushed): conflicts = mg-back r3 kgDefer (main) vs F5/F6b game splits (G branch) in j23 lessonMode, j83 wkPractice, jrcp teacher lesson, jveil vlCraftRun, jsgame sgServ, jtoil toilFinShow → main's deferred charge kept around the split game part (kgDefer(pay,()=>vlCraftGame(m)) etc.; in her context on the host the captured game opens nothing → kgDefer charges at once, as before). undef-scan PASS; mg-back 755x1000 PASS 12/12.
- **39b1407d** (pushed) coop-night THIN 13 reds 10 / 13 (guest khắc + acts after reload/rejoin) = REAL (G): at 13 her phone wrote no local copy of the buổi (snapSave off for gG) → a reload lost her khắc `used` (seat-local, rides each intent's ctx, never sent back by the host) and any person change not yet sent (her erd diff goes at Sẵn sàng). Fix: snapSave writes her LOCAL copy at 13 too (no server seat copy: stays retired at 13), begin() restores it in the same week before the host's go (CW.restore already refuses a sent / pending week). Reds 4 / 5 / 7 / 9 of the earlier run: one stuck week (case 4 'exactly one step' [3,3,3]: date stepped on both, the room week not; host pend, sent 2) and its knock-on; did not repeat in 2 later runs (NIGHT_UPTO=5 40/40; full 105/105) → intermittent; coop-night now dumps G.done / thq / gHold / her modal when a week does not step (next occurrence names the cause). **coop-night THIN 13 105/105** (was 95/101).
- **45222abc** (pushed): (a) jcoopthinf RDIFF (render-diff engines run as her context closes) now in SOLO's order = render wrappers' order (alInitAll, lxInitAll, exTick, kmmCheck, kpCheck, pdCheck, then prCheck after the inner render): f3 B1 / f4 P1 'same as solo' reds were her Sổ ghi lines "+5 Phúc duyên: thăng Tần" / "Kiếp này đã trọn" in the other order (whole family = the one list). (b) coop-thin-f5 solo twin takes main's mg-back r3 deferred charge (KG82.payOnGo, numbers only on the copy) at the quick end: L4 / W2 reds were the twin (no charge) vs the real run (charged once, correct). (c) coop-timer case 4 at L13: her week end runs on the host at the go, a dialog pushed ONLY on her phone (the test's) is unknown to the host (real dialogs are her store's thq, which gNight waits on) → her week-end cards join her Q: the check judges only the test's two dialogs (level-only, by design).
Results @45222abc (local Worker THINMAX 13): night THIN13 **105/105** (@39b1407d) · timer THIN12 43/43, THIN13 41/43 before (c) · **f3 37/37, f4 18/18, f5 PASS** · mg-back 755x1000 + 1180x820 12/12 · undef-scan PASS. Lane still running at handover: f3s f4s f5s, timer13 (rerun).

## ROLLOVER HANDOVER #5 → #6 (11/20/2026; context ≈ 29 % ≥ START 5 % + 25 %) — Foreman B ROOT-1 (session_01N1tNP4TLZqJMNrsakh7Bjk) opens the successor
Copy into any handover (brief rules, verbatim): LINEAGE (owner 17/11; threshold overwritten by owner 18/11 ~07:33Z): your first STATUS/HANDOVER line states "depth <get_session lineage.depth>"; open workers as your children; ALWAYS roll over by opening your own child foreman (create_session) at EVERY depth the system allows, up to the limit (8) — never stop early; ONLY when create_session is refused (limit reached or any error) write the handover + send "TAKE OVER NOW" to your line's standby (FOREMAN B ROOT STANDBY id in FOREMAN_B_STATUS) or a FOR MAIN line if none. Every takeover prompt copies this line.
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217): the "Lượt n/30" counter is only a display counter; trigger = context: roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % (hard ceiling). Workers roll over too (owner 16/11 08:22Z s14, option 1): a worker writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
Setup (new container): `git worktree add --no-checkout /home/user/wt/g origin/review/coop-thin-g` (fetch under flock --depth=30) + sparse-checkout as START rules; `ln -sfn /home/user/wt/g /home/user/wt/ctg` (coop-thin-g-reg.sh cds there); `python3 dev/build/assemble.py`; `cd coop/worker && npm install && npx wrangler dev --port 8787 --ip 127.0.0.1` (nohup). Lanes: one script per background command (`run_in_background`, timeout 7200000), `SUM=<f> bash dev/test/coop-thin-g-reg.sh <ids>`; ONE browser lane at a time. mg-back.js may print PASS and not exit: kill it.
Left, in order:
1. Rerun f3s f4s f5s + timer THIN=13 (fixes (a)–(c) above; expect green); coop-night once more (the case-4 stuck week was intermittent: if it repeats, the new 'dbg' line names G.done / her thq / gHold / her modal).
2. g4 g4s (+ TW / HIRE lines for g4s Danh +3 on the solo side), e2e e2es e2e0, cyc cycs.
3. ow seeds 1–10, role-parity alone, perf `MONTH=1 CPU=4 node dev/test/coop-thin-g-perf.js <W> 13`, build_site + commit + `bash dev/tools/quickcheck.sh`, week-31 staff transient (`TRIP=1 WEEKS=36 node dev/test/coop-thin-g.js <W> 13`).
4. giau pre-existing red: run `CYC_DBG=1 CYC_ONLY=giau THIN=13 node dev/test/coop-cyc.js <out> <W>`, write the one-paragraph root cause (lead from #5: 'giau' = her card stays ON the tray AND jcycle lie("giau") sets c.rum + ghenAll "có tin vui" — check whether the host's draw (nightCh / flip forced deck) excludes a consort rumoured pregnant; 'som' (also ON the tray, no rumour) passes) → classify, tell Foreman B, do NOT fix outside G files.
5. LOOK Fold 755x1000@2 + iPad 1180x820@2 at the week turn (scratch only), '## Done', merge newest origin/main, CLAIMS 'SẴN SÀNG KIỂM <sha>', send_message Foreman B. FOR MAIN: Worker THINMAX 13 deploy at landing.

## #6 progress — worker session_01N1tNP5sNDT7i8Um811DRG1 (opus), depth 2 (limit 8); START_CTX ≈ 3 % of 1M → rollover ≈ 28 %, ceiling 60 %
PRIORITY #1 CHECK ('amPool empPick forced deck|giau host drew her|kg82ShowRes null|COOP_FOLD'): OD 0 new | ledger 0 | main 494b386a: no G | review/* none for G (coop-staff-split = other B worker, not my files) | claims CLAIMS:450 (this worker).
Commits (all pushed on review/coop-thin-g): e6666e4c merge origin/main 713d96dc · **7e28c49c** coop-cyc bot fix (below) · 72f089cf coop-e2e `COOP_FOLD=w,h,scale` (Fold 755x1000@2 LOOK) + build_site · **fcaebe77** merge origin/main **494b386a** (bd-roads; index.html / sw.js rebuilt; undef-scan PASS).
**giau 'host drew her (forced deck)' root cause = TEST BOT, pre-existing on LIVE, not G**: jagmaid wraps empPick and mixes the AG palace maids (amPool: maids the Emperor may call) into his pick; the forced deck (nightCh 0 for all but her) left C = [her], and mindPick could still pick a maid → empPick returns null (a maid's night) → no consort night. Proof (CYC_AM=1 keeps the maid route on): `dbg ep [[1,3,[902],null,"maid:{n:Thúy Vi, of:Hàn Linh Lung}"]]` (her nightCh 23, tray off, fcyb lie=1 rv=giau = all correct). Rate ≈ 1/7 runs (any case expecting 'her': giau / som). Fix in dev/test/coop-cyc.js only: the forced flip also silences window.amPool (restored after); CYC_DBG now dumps her nightCh / tray / fcyb per call, consorts() count, and empPick C → pick. After: giau 15/15 (was ~1/7 red). The real game is right (a maid's night is AG design).
Results @72f089cf (before the 494b386a merge): f3s / f4s / f5s PASS · timer THIN13 43/43 · night THIN13 105/105 · g4 / g4s 18/18 · e2e / e2es / e2e0 68/68 · cyc / cycs 73/73 · ow seeds 1–10 PASS · perf `MONTH=1 CPU=4` her week end in ctx b +34.5 % of his own (gate ≤ 40 %) PASS · TRIP=1 WEEKS=36 83/83, 0 TRANSIENT lines (her staff stayed 0 all 36 weeks: the week-31 staff transient did not reproduce) · quickcheck PASS (core gates PASS) · LOOK Fold 755x1000@2 + iPad 1180x820@2 (e2e THIN13 both seat orders, scratch /home/user/wt/look1|2): week turn = season cover, then the after-week mini-game result card, both clean, 68/68.
role-parity: 2 FAIL (promoted maid harm:accuse/banphe/uyhiep + up:P-ONLY:cx3:tell) = IDENTICAL on LIVE 713d96dc (run on a main worktree) → pre-existing, not G (FOR B / main owner of role-parity).
After the 494b386a merge (lane @fcaebe77): e2e 68/68, cyc / cycs 73/73, timer 43/43, f3 / f4 / f5 PASS; reds (all intermittent, NOT yet classified):
 (a) g4 / g4s 'G2 her month on the host = the solo rules, same dice': SOLO twin gets ONE extra apply the host-context run does not (bac +20 twice, staff +1, once danh +3); 1 red in 8 reruns after. Same family as the #4/#5 note 'g4s Danh +3 on the solo side' → probably pre-existing G intermittent, not from 494b386a. To find the writer: in coop-thin-g.js lines 99 / 112 set `Error.stackTraceLimit=60` inside the probe and `slice(2,60)` (the 4-frame TW stack only shows apply wrappers), loop g4 until red.
 (b) g4s 'no page errors': `TypeError: Cannot set properties of null (innerHTML) at kg82ShowRes ← j90 wrapper ← showRes ← end ← closeAll (jtoil makeup reveal, line ~1108)`: kg82Box() null when the reveal's closeAll ends after the kg82 frame is gone. 494b386a touched jtoil (KG82.setup flags) and j82 (KG82.setup reset); KG82.setup is module state outside S — check whether G's mgOut/mgIn (jcoopthing, per-context TOIL.st / KG82.run) must also carry KG82.setup / the frame, or whether kg82ShowRes needs a null guard on LIVE too (run g4s on a main build twin).
 (c) night THIN13: case 1–4 'first week stall' (host pend true, sent -1, guest g-go 0) then timeout 1500 s; rerun NIGHT_UPTO=5 40/40 → the known intermittent stuck week (#5); full rerun not done after the merge.

## ROLLOVER HANDOVER #6 → #7 (11/20/2026; context 23 % of 1M ≈ START 3 % + 20 %, near 28 %) — Foreman B ROOT-2 (session_01N1tNP57XDdMmRT5t1ZtPQB) opens the successor
Copy into any handover (brief rules, verbatim): LINEAGE (owner 17/11; threshold overwritten by owner 18/11 ~07:33Z): your first STATUS/HANDOVER line states "depth <get_session lineage.depth>"; open workers as your children; ALWAYS roll over by opening your own child foreman (create_session) at EVERY depth the system allows, up to the limit (8) — never stop early; ONLY when create_session is refused (limit reached or any error) write the handover + send "TAKE OVER NOW" to your line's standby (FOREMAN B ROOT STANDBY id in FOREMAN_B_STATUS) or a FOR MAIN line if none. Every takeover prompt copies this line.
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217): the "Lượt n/30" counter is only a display counter; trigger = context: roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % (hard ceiling). Workers roll over too (owner 16/11 08:22Z s14, option 1): a worker writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
Setup (new container): `git worktree add --no-checkout /home/user/wt/g origin/review/coop-thin-g` (fetch --depth=30 under flock) + sparse-checkout + `git checkout`; `ln -sfn /home/user/wt/g /home/user/wt/ctg`; `bash dev/site/hooks/install.sh`; `python3 dev/build/assemble.py`; `cd coop/worker && npm install && nohup npx wrangler dev --port 8787 --ip 127.0.0.1 &`; .tmp/old.html for coop-cyc mixed = `git archive origin/main dev/build dev/site rank/worker/src | tar -x -C <tmp>; python3 <tmp>/dev/build/assemble.py; cp <tmp>/dev/index.html .tmp/old.html`. Lanes: one script per background command, `bash dev/test/coop-thin-g-reg.sh <ids>` (logs /home/user/wt/ctg-out). Load is low in a fresh container (4 cores): a short single case may run beside a lane, never role-parity (it crashes for memory beside a browser lane).
Left, in order:
1. (b) kg82ShowRes null page error (g4s): reproduce (loop g4s), name the cause; if it is G's per-context mini-game state (KG82.setup / the kg82 frame vs mgOut/mgIn) fix it in jcoopthing; if it reproduces on a LIVE twin → FOR B (pre-existing).
2. (a) G2 solo extra apply: loop g4 with the deep stack (above), name the writer; fix if G, else classify.
3. night THIN13 full rerun once (expect 105/105; a stall prints the 'dbg' line).
4. If main moved: merge origin/main, rerun g4 g4s e2e cyc cycs night timer f3 f4 f5.
5. '## Done' (moved / retired rows 1–16, seat-guard 29 sites, tests table, perf, leftovers for H: giau = bot (fixed), role-parity = LIVE, item 2's L ≤ 12 note), CLAIMS 'SẴN SÀNG KIỂM <sha>', send_message Foreman B ROOT-2 session_01N1tNP57XDdMmRT5t1ZtPQB. FOR MAIN: Worker THINMAX 13 deploy at landing.
## #7 progress — worker session_01N1tNP4hKBjqGrnmw98Dz3q (opus), depth 3 (limit 8); START_CTX ≈ 5 % of 1M → rollover ≈ 30 %, ceiling 60 %
PRIORITY #1 CHECK ('kg82ShowRes null|repay npcWhy coop|worldOn solo twin|kmov bot clear'): OD 0 new | ledger 0 | main a99673e8: no G | review/* none for G | claims CLAIMS (this worker).
- **(a) g4/g4s G2 solo twin extra apply = TEST TWIN, not G, not LIVE game**: paired probe (env LOAN=30 injects her loan to an NPC with a 30-lượng purse): host in her context `npcWhy('repay')` false (lender purse 30 < BAL.ag.why.ap.repay 40), solo twin true (purse 150: the NPC's month stipend `econStipend` ran inside her monthTick before `approaches`). On the host her week end runs in context b where `worldOn()` reads the guest side → jcoopone PERSON/MUTE/ONLY_ME guards skip NPC stipends (one world, OD:L96; the host's own week pays them once) — the same branch her phone took at L ≤ 12. The twin ran solo rules (worldOn true). Natural reds (2/8 + 2/12 runs) all = a loan repay at a month end (RPLOG: host purse 18/23, solo 90/94). Fix (dev/test/coop-thin-g.js only): the twin runs with `worldOn()` false (the whole guest-branch family at once). LOAN=30: 11/12 → 12/12.
- **(b) g4s kg82ShowRes null = TEST BOT family**: the bot's clear() / mgSkip clicked buttons of the #kg82 frame UNDER the full-screen mirror reveal (.kmov km-full, body level) and closed the frame; the reveal's «Tiếp theo» then reached kg82ShowRes with no frame. A player can only touch the scene on top. Fix in the bot family (coop-e2e clear — eval'd by every coop-thin-* test —, coop-cyc, coop-night, coop-timer clear, coop-thin-g mgSkip): an open .kmov is ended first (its .kmend, else one tap), the #ov frame is never clicked while a scene is on top. coop-thin-g also logs `KGCLOSE-UNDER-SCENE <stack>` if anything closes #kg82 under a scene (names a real closer if one exists).
- Commit **6151c6d8** (pushed). Lane running: night13, g4/g4s ×3.
- 5e5652b1 merge origin/main **983a9436** (index.html / sw.js / assets.json rebuilt; undef-scan PASS).
- Bot family, second pass (b2d4babd, **9aa5b6a7**): the first bot fix (block #ov while a scene is up) stalled timer / night / cyc; replaced by a hit-test (a frame button is clicked only if elementFromPoint at its centre is not inside a .kmov) + the top scene is ended by its OWN end button, whole family: KIT 81 «Tiếp theo» (.kmend), reward «Nhận» ([data-km-close], km-reward), item gain «Nhận» (.krevok, kfgain), else the scene's last button. Found by the new her-#ov dump (cyc / night dbg 'ovB'): a km-reward then a kfgain scene sat over her «Phối đồ» board on HER phone; the old bot clicked the board under it (a click a player cannot make). Paired runs on the same build (983a9436): night old bot 99/101 (case 4/5 stall: frPz, her #ov open) vs new bot 105/105; cyc old 72/74 (giau intermittent) vs new 73/73; timer new 43/43.
- (c) night first-week stall: the dbg names it — host frPz true (waits on HER mini game), her #ov open under a scene the bot never ended → TEST BOT (same family as (b)), not G. Fixed by the bot pass above.
- Open: G2 'staff' [host 1, solo 0] seen 2× (her maid-servant Tiểu Đào in staff, loy null, at the snap): coop-thin-g now traces staff length drops with a stack (staff-len in TW) to name the solo-side remover.
- **67c18fc0** (pushed): the G2 'staff' [host 1, solo 0] red = TWIN again, now proven with env AGE=1 (her maid at BAL.srvAge.ask, deterministic): solo ran jagstaff asMonth → her old maid chose «Xuất cung» (asOut 'age'); on the host her week end runs with coopGuest() true → agGuest() → agOn() false → the whole AG agent layer is off for her (no asNeeds call at all) — the same branch her phone took at L ≤ 12. Twin now takes coopGuest() (covers worldOn too): AGE=1 11/12 → 13/13, LOAN=30 12/12, g4 / g4s 18/18.
- **FOR B (pre-existing on LIVE, not G — a possible game gap, law 6b real people)**: in co-op the guest's own servants never get the AG agent month (jagstaff asMonth: wage / Sức, ban gả, the age choice Xuất cung / ma ma / ở lại, betrayal found) because agOn() is false whenever coopGuest() is true, at every level. Her servants never age out or marry in co-op. Decide whether her OWN people's agent month should run in her context (host) / on her phone.
- Lane @9aa5b6a7 + 983a9436 merged (all on the final bot): f3s / f4s / f5s PASS · timer 43/43 · night 105/105 · g4 / g4s 18/18 (one later g4 red = the staff twin, fixed in 67c18fc0) · e2e / e2es / e2e0 68/68 · cyc 73/73 · cycs PASS · ow 1–10 PASS (@5e5652b1).

## ROLLOVER HANDOVER #7 → #8 (11/20/2026; context 30 % of 1M = START 5 % + 25 %) — Foreman B ROOT-2 (session_01N1tNP57XDdMmRT5t1ZtPQB) opens the successor
Copy into any handover (brief rules, verbatim): LINEAGE (owner 17/11; threshold overwritten by owner 18/11 ~07:33Z): your first STATUS/HANDOVER line states "depth <get_session lineage.depth>"; open workers as your children; ALWAYS roll over by opening your own child foreman (create_session) at EVERY depth the system allows, up to the limit (8) — never stop early; ONLY when create_session is refused (limit reached or any error) write the handover + send "TAKE OVER NOW" to your line's standby (FOREMAN B ROOT STANDBY id in FOREMAN_B_STATUS) or a FOR MAIN line if none. Every takeover prompt copies this line.
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217): the "Lượt n/30" counter is only a display counter; trigger = context: roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % (hard ceiling). Workers roll over too (owner 16/11 08:22Z s14, option 1): a worker writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
State: review/coop-thin-g @ **67c18fc0** (pushed; contains merge of origin/main 983a9436). (a) (b) (c) all classified + fixed (above): all three were the test twin / test bot, none is G, none is a LIVE game bug except the FOR B agent-layer gap. Setup as #6 (worktree /home/user/wt/g + ln ctg, wrangler dev :8787, .tmp/old.html = origin/main build for coop-cyc mixed). ONE browser lane at a time (check `ps aux | grep coop-` before starting one: #7 lost time to two lanes running at once).
Left, in order:
1. If origin/main moved past 983a9436: merge (index.html / sw.js / assets.json: take theirs, `python3 dev/build/assemble.py` + `bash dev/site/build_site.sh`, undef-scan), rerun g4 g4s e2e cyc cycs night timer f3s f4s f5s.
2. role-parity alone (expect the 2 LIVE FAILs only), perf `MONTH=1 CPU=4 node dev/test/coop-thin-g-perf.js <W> 13` (gate ≤ 40 %), `TRIP=1 WEEKS=36 node dev/test/coop-thin-g.js <W> 13`, `bash dev/tools/quickcheck.sh`.
3. LOOK Fold 755x1000@2 + iPad 1180x820@2 at the week turn (e2e THIN13 with COOP_FOLD / SHOTS, scratch only, look at them).
4. '## Done' (moved / retired rows 1–16, seat-guard 29 sites, tests table, perf, leftovers for H: giau = bot (fixed #6), role-parity = LIVE, item 2's L ≤ 12 note, the FOR B agent-layer gap, coop-host-lag item 3 is a separate family (told Foreman B 11/20)), CLAIMS 'SẴN SÀNG KIỂM <sha>', send_message Foreman B ROOT-2 "SẴN SÀNG KIỂM coop-thin-g <sha>". FOR MAIN: Worker THINMAX 13 deploy at landing.

## #8 progress — worker session_01N1tNP2GuhdQbevDCFFiv1Q (opus); START_CTX ≈ 4 % of 1M (own estimate) → rollover ≈ 29 %, ceiling 60 %
PRIORITY #1 CHECK ('coop-thin-g|confined forced deck|cycs giau som'): OD 0 new | ledger 0 | main 794c6b77 → 24dd2c62: no G | review/* none for G (coop-guest-agent = separate worker for the FOR B agent-layer gap, not touched here) | claims CLAIMS:512 (this worker).
- 79ae079c merge origin/main **794c6b77** (kit-e-rows, kit-bgtone, kit-cost-rows-home, choice-value): only index.html / sw.js conflicted → rebuilt; undef-scan PASS.
- **78583e92** coop-cyc (TEST BOT family): cycs THIN 13 red in 2 of 5 runs (lui 'halves her NEXT flip' {a:0,b:0,d:1}, som / giau 'host drew her (forced deck)' who null). Dump: her entry in the host's world had `confined 2` (cấm túc, set by a host-world event, from week 3) → j8 nightCh = 0 under the forced deck. Real game (one fact: the cấm túc lands on her store at the week via the conf delta); the test staged only `preg` of the four nightCh blockers. Fix (whole blocker family, test only): STG clears preg / block / confined / out on her store, and the same on her entry in the host's world. After: cycs 3/3 (73, 73, 74/74), cyc 73/73.
- 7fcae66b merge origin/main **24dd2c62** (kit-dress-picker, person-minigame-acts r4, road-triggers r2): only index.html / sw.js conflicted → rebuilt; undef-scan PASS.

## Done
**What G is** (level 13, behind TH.on(13) = gW(); CAP 13, Worker THINMAX 13; levels 0–12 + solo unchanged except the one seat-guard helper, same value outside her week end): her whole week end and her personal month run ON THE HOST in her context (withSeat b) on the host's store of her = the ONE copy of her person; her phone only shows it. Module dev/build/jcoopthing.js + jcoopworld.js / Worker changes (see #1).

**§0a rows 1–16 — moved / retired**
| # | step | before (≤ 12) | G (13) |
|---|---|---|---|
| 1 | night go → her nextBuoi → endTurn | her phone | MOVED: host, CW.gNight → herWeek in withSeat b, before his own; her phone runs nothing at go |
| 2 | endTurn body | her phone | MOVED: host, her context, worldOn() false (guest branch), world writes put back (wSnap / wRestore), standBack |
| 3 | monthTick (her stipend, maids, preg, items, ill, servants, kids, heirs …) | her phone | MOVED: host, her context (row 2) |
| 4 | 46 endTurn wrappers / seat guards | her phone | MOVED: every seat guard reads coopGuest() (= guest seat OR CW.gWk) → same branch as her phone took |
| 5 | jcoopworld endTurn wrapper (pend / news / render) | her phone | MOVED: her context keeps the host's pend / news / inTurn |
| 6 | sendEnd her C | her phone | RETIRED: guest sends no `end`; host's toCanon writes P.b = her store + his stand-in acts as DELTAS (G_NOADD) |
| 7 | Worker merge3(base, sub-a, sub-b) | server | RETIRED at 13: host `end` ticks alone (tick(hostC)); guest `end` → error thinend |
| 8 | fromCanon rebuild + drop of her store | both | guest = display of the host snapshot; host rebuild = no change |
| 9 | reign ending (her heir / tuẫn táng) | her phone | MOVED: host, her context, in onWeek before his own (CW.gEmp) |
| 10 | seatWeek seat caps | her phone | MOVED: host, her context, after his own endTurn; promoFullSeat = part-D card |
| 11 | Tuần mới news (CW.mine) | her phone | her store keeps S.gMine; her phone reads it |
| 12 | her death in the week end | her phone | host: flags only (S.dead + S.coopOver); her phone runs the real over() from the week |
| 13 | colCheck (device ledger) | her phone | NOT run in her context on the host (G.stat.colSkip); her phone's render-time colCheck keeps it on her device |
| 14 | other device ledgers | her phone | kept OFF the host's device (G.dev; keys seen: ctm-e68h, ctm-phucduyen) — FOR H: replay on her phone |
| 15 | seat copies seat / seatd | her phone → server | RETIRED for the guest at 13 (local snap kept for reload: 39b1407d) |
| 16 | syncRoom re-end / CW.restore | her phone | RETIRED for the guest at 13 (host snapshot = truth; local buổi restore before the host's go) |

**Seat-guard family (LUẬT SỬA CẢ NHÓM)**: scan `seat!=="a"|seat==="b"|COOPW.seat` in non-co-op j*.js — before 29 direct seat tests (28 in 26 files + jchat guest()), after 0 (all → coopGuest(); kept: jcloud room bookkeeping, jmem id tag / jvisit myPid follow the context, jil / jsmg message senders).

**Other families fixed on the way** (details in #2–#7): world windows' cards (28 EVD cards: host builds them in her context, pid «wwc»); her no-pid option cards (pid «live», D.LIVE); frIdent (her entry's identity from her store); mgOut / mgIn (TOIL.st / KG82.run per context); RDIFF solo order; her local buổi snap at 13 (reload keeps khắc); cyHostOwns in gWk; jptime ptNpcBack null target.

**Tests @78583e92 (794c6b77 merged; local Worker THINMAX 13)** — rerun @7fcae66b (24dd2c62 merged) in the table's last column
| suite | @78583e92 | @7fcae66b |
|---|---|---|
| g4 / g4s (G0–G7, swap) | 18/18 · 19/19 | 18/18 · 18/18 |
| f3s / f4s / f5s | 38/38 · 19/19 · 30/30 | 37/37 · 18/18 · 30/30 |
| timer THIN13 | 43/43 | 40/43 once (case 4 'her day ends by itself + week merges' with 7 cards in her Q, then case 5 reload clocks = knock-on of the late week), reruns 43/43 · 43/43 → intermittent |
| e2e THIN13 | 68/68 (+ LOOK run 68/68) | 68/68 |
| cyc / cycs THIN13 | 73/73 · 3/3 after 78583e92 | 73/73 · 74/74 |
| night THIN13 | 105/105 | 105/105 |
| role-parity (alone) | ALL PASS (the 2 earlier LIVE FAILs are gone on main) | — |
| perf MONTH=1 CPU=4 | her week end in ctx b +29.8 % of his own (own 1712 ms, hers 510 ms) ≤ 40 % PASS | — |
| TRIP=1 WEEKS=36 | run 1: 81/82 (below) · run 2: 83/83, no TRANSIENT | — |
| quickcheck | PASS (core gates, time-spill, old save, perf) | PASS (render 213/237 ms, buổi 1006/1118 ms new/live) |
| undef-scan / Worker thin tests | PASS | undef-scan PASS |
Earlier (#6/#7, same code): ow seeds 1–10 PASS, gup 16/16, b/bs e/es f1/f1s f2/f2s f6/f6s f6b/f6bs hn PASS, a/as/c/cs level-only by design, d/ds 7 reds = same at L12 (pre-existing).

**LOOK** (e2e THIN13, Fold 755x1000@2 host + iPad 1180x820@2 guest, scratch only, looked): the week turn = season cover «Bình minh mùa hạ · Tháng tư · ve kêu râm ran», clean on both. Note (not G, shared season cover): on iPad landscape the title wraps «Bình minh mùa / hạ» beside the picture.

**Leftovers / FOR B / FOR H**
- OPEN (intermittent, 1 week in 72): TRIP run 1 week 36 (last week) `suc` host store 83 vs her phone 77, not settled in 10 s; guest TRIP saw no guest-side writer → a host-side write in her store not yet patched to her phone at the end of the run. Run 2 (36 weeks) clean. Repro: `TRIP=1 WEEKS=36 node dev/test/coop-thin-g.js <W> 13`.
- FOR B (pre-existing on LIVE, separate worker review/coop-guest-agent): agOn() false whenever coopGuest() → her own servants never get the AG agent month in co-op (wage / Sức, ban gả, age choice Xuất cung / ma ma / ở lại, betrayal), at every level.
- FOR B: #4 item 2 — module state outside S (TOIL.st / KG82.run) may leak between contexts at levels 9–12 through F6b's per-intent CX12 (fixed at 13 only).
- FOR B: coop-host-lag item 3 (week stall on a late room snapshot) = a separate family (told Foreman B 11/20).
- giau 'host drew her' = test bot (fixed #6, amPool); cycs cấm túc = test staging (fixed #8). role-parity: green now.
- FOR H: Tranh ghế Vòng 1 mini game in her context = dice (score intent on her phone); ONE contest board (G21); device-ledger replay on her phone (G.dev keys); «live» cards → real pids (G.liveK titles); world windows' tick/start effects on her entry ride his week as deltas (EVD.thi her house Danh) — confirm none lost.
- FOR MAIN: deploy the Worker with THINMAX 13 at landing.

**SẴN SÀNG KIỂM review/coop-thin-g @ 7fcae66b** (origin/main 24dd2c62 merged).

## coop-thin-f6b-r2 (Foreman B ROOT-3 ask 11/20: LAND BLOCKED F5..F6b 26f36042 vs LIVE kgDefer) — ONE BRANCH with G
review/coop-thin-g @ 7fcae66b already CONTAINS review/coop-thin-f6b-r1 26f36042 (merged in #2 @0891e223) AND origin/main 24dd2c62 (git merge-base --is-ancestor both true). The kgDefer vs F6b host-run named-ends conflict was resolved in #5 d476d3b9 keeping BOTH (main's deferred charge wrapped around the split game part: j23 lessonMode, j83 wkPractice, jrcp teacher lesson, jveil vlCraftRun, jsgame sgServ, jtoil toilFinShow; in her context on the host the captured game opens nothing → kgDefer charges at once). kgDefer count per file = main's (j23 2, j83 2, jrcp 2, jveil 3, jsgame 3, jtoil 0). Lanes on 7fcae66b cover F5..F6b: f3s 37/37, f4s 18/18, f5s 30/30 + #6/#7 f6/f6s f6b/f6bs PASS, mg-back 755x1000 + 1180x820 12/12 (#5), quickcheck PASS. → land F5..F6b + G together from review/coop-thin-g (no separate -r2 branch); BIG re-review on 7fcae66b.
Merge note: review/coop-guest-agent (b7648b65) conflicts in jagent.js 27–28 (ours agGuest→coopGuest, theirs agLive/agOn/agSelf): whoever lands second keeps both, reruns g4 / g4s / cycs.

## REVIEW r1 — BIG reviewer session_01N1tNP33ttbcEgRGTF1Udhr (opus), 11/21/2026
PRIORITY #1 CHECK ('coop-thin-g|thpn|E.base|gBlob|cyHold|nmPidMe'): OD 0 new | ledger 0 | main 5a8c30af: no G | review/* coop-guest-agent-r1 a00be4e5 NOT on main (jagent untouched here; whoever lands second keeps both + reruns g4/g4s/cycs) | claims CLAIMS:563 (this reviewer).
START_CTX ≈ 6 % of 1M (own estimate).
Branch **review/coop-thin-g-r1** = 7fcae66b + merges of LIVE b1033eb0 and 5a8c30af + r1 fixes. Verdict sha: see last line.

### Fixes made on r1 (all pushed)
| sha | what | class |
|---|---|---|
| e7b996f2 | **SEAT DESYNC (real G bug, law 1 / one core)**: her number differed host store vs her phone after a week and never settled (g4s bạc 7/67, 164/184; TRIP wk36 Sức 83/77 = same signature). Probe on both pages: after `week` her phone's diff baseline (jcoopthine E.base) came from the last VIEW = the host's PRE-week copy, so her first `erd` carried the week's own changes (his acts on her stand-in as toCanon gD deltas) as hers → host added them twice, her phone once. Fix: (1) jcoopthine: at `week` the guest baseline = her S just rebuilt from C (curP); E.base never takes a view of an older week. (2) jcoopthing gBlob: P.b carries thpn = part-D patch count in the blob → her phone applies only later patches. (3) jcoopthing gEmp: a part-D patch made after his `end` (not in C) is put on C before her store is rebuilt and kept in her queue (both seats hold it; before: host dropped it / phone kept it, or both lost it). | GAME (G) |
| 56c7b6bf | coop-thin-f6b V2 «Kết nhanh» solo twin takes main's deferred charge (mg-back r3 kgDefer); real run charged once = correct | TEST TWIN |
| 61cbfcae | seat-guard family: the **30th** site jky.js:19 (kỳ ngộ guest()) read COOPW.seat directly → coopGuest() (worker counted 29) | family scan |
| 69a2d299 | coop-thin-g G2 solo twin waits her due-task landings (jptime ptTick → her ptTickHer intent, coop-ptime-reds) like the host; trip red danh +3 (ptOrdTick) was the twin | TEST TWIN |
| 32d55bb6 | merge LIVE 5a8c30af; main's new jnamefix nmPidMe/nmPidF read COOPW.seat → follow ctx (identity family, as jvisit/jmem myPid) | family |

| 695414cf | merge LIVE 666def0c (45 files, none co-op: 0 COOPW / coopGuest / worldOn refs); undef-scan + one-core PASS | merge |

### Seat-desync proof (paired, same build, g4/g4s WEEKS=6 + probe)
| build | weeks run | TRANSIENT (number differs host/phone) |
|---|---|---|
| bb885086 (merge only, no fix) | 4 (lane g4s) + 18 (3 probe runs) | 2 (bạc 7/67 wk4; bạc 164/184 + Thái hậu 11/9 wk6) |
| e7b996f2+ (fix) | 48 (8 probe runs, both seat orders) + TRIP 36 (swap 0) + TRIP 31 (swap 1) + all lanes | **0** |

### Checks
- Moved/retired rows 1–16 read against code (jcoopthing / jcoopworld gW/gG / Worker tick(hostC), thinend): each her week end runs once on the host (G.done per week, G1 'host ran hers once' every week), her phone sends no `end` / seat copy; no lost act found except the desync above (fixed).
- 29+1 seat-guard sites: old vs new value identical outside CW.gWk (COOPW.seat==="b" ≡ !=="a" for two seats; coopGuest needs c.on).
- kgDefer per file = LIVE (j23 3, j83 3, jrcp 3, jveil 3 lines, jsgame 3, jtoil 0; jveil craftK now from VL, same 2); F6b named ends host-run (f6/f6s/f6b/f6bs green after the V2 twin fix).
- Test-bot / twin fixes of the worker re-checked: G2 twin family (worldOn / coopGuest / now ptTick) = twin, host follows her phone's L≤12 branch; residual G2 'approaches +20 bạc' (NPC repay reason reads a world purse, 1/8 runs, seen pre-fix) = same twin family, open for the worker's test (not a game fault).
- Perf `MONTH=1 CPU=4`: her week end in ctx b **+33.2 %** of his own (gate ≤ 40 %) PASS.
- one-core guard PASS · undef-scan PASS · role-parity ALL PASS · quickcheck: core gates + old save (Cố Ngưng Sương loads, plays a buổi) + perf vs live PASS (G4 mk-layer-scan red only from my sparse worktree; rerun with dev/art: 12960 pictures, 0 bad).
- LOOK Fold 755x1000@2 + iPad 1180x820@2 at the week turn (e2e THIN13, shots wk1–wk3 + 07-after3, scratch only, looked 3×): season cover «Bình minh mùa xuân / hạ» + «Tiếp theo», clean, no overflow, 74/74. Note (not G, shared season cover): iPad title wraps «Bình minh mùa / hạ».
- Full lane @32d55bb6 (main 5a8c30af): g4 18/18 · g4s 18/18 · e2e / e2es / e2e0 92/92 · cyc / cycs 73/73 · night 105/105 · timer 43/43 · f3s / f4s / f5s / f6 / f6s PASS · quickcheck PASS (core gates, old save, perf render 238/233 ms, buổi 1093/1219 ms new/live) · role-parity ALL PASS.
- f6b L3 (exam, her page gone) and f6bs A1 (Tự học deck card) red only in the full suite, green alone (L3 2/2, A1 1/1): order-dependent TEST STAGING — L3's outcome «Đã đỗ: chờ ghế Tần trống» (a valid seat-cap wait) changes neither ex nor rank, the row's chk wants one; A1's act() takes another deck card dealt in front after the earlier rows (kg82go null). Not game faults. FOR worker: make both rows stage their own state.
- Timer intermittent (38/43 in my first lane) = CPU load from my parallel probe runs: alone 43/43 (twice).

### FAIL item (G, not fixed here)
- Lane @695414cf (main 666def0c): g4 18/18 · g4s 18/18 · e2e / e2es 92/92 · cyc / cycs 73/73 · timer 43/43 · f3s / f4s / f5s PASS · **night 99/101** (case 4/5 below).
- **F1. PERMANENT WEEK STALL at level 13** (room never ends the week; seen 3×: worker #5 night case 4 '[3,3,3]', my night case 4 @695414cf, my TRIP swap week 31): host pend true, sent = week−1, her week end ran (G.done[w] true, log her-week w), gHold false, frPz false, her thq empty, her phone g-go done and waiting «Chờ hảo hữu…»; the host's sendEnd never fires. In the TRIP dump CW.cyHold = w (jcoopworld cyWait, eW host: her stored cyb has df = g, no rk, no cyrep card open anywhere). Detail of that one: (TRIP swap 1, week 31 of 36, 1 time in ~120 stress weeks): host pend true, sent 30, CW.cyHold=31 (cyWait: her stored cyb has df=g but no rk), her thq empty and no cyrep card on her phone → the room never ends the week (test timed out). Cause not found: herCy asks once per g (E.cyA); if her cyrep card is gone after df was set (PEND.cyrep returns null when her maid is gone → pick-stale, no D.GONE.cyrep; or any other card loss) nothing frees the hold. Not shown to come from G or r1 (cyb / thq are outside the patch and erd diff: SKIP / BAD). Suggest: in cyWait (eW host) when df===g, no rk, no open cyrep in her thq and nothing deferred → CW.cyNo=g (or re-ask). Owner: the G worker (level-13 path) with part E. Repro: `THIN=13 node dev/test/coop-night.js <out> <W>` (1 in ~2 full runs here) or `TRIP=1 WEEKS=36 node dev/test/coop-thin-g.js <W> 13 1`; dump CW.cyHold / E.cyA / her S.cyb / D.log at the stall.

### OPEN — FOR B
- Earlier FOR B items of the worker stand (agent layer for her servants: coop-guest-agent; TOIL.st/KG82.run at L9–12; coop-host-lag item 3).
- FOR MAIN: deploy the Worker with THINMAX 13 at landing.

**FAIL coop-thin-g → review/coop-thin-g-r1 @695414cf** (contains origin/main 666def0c): ONE item F1 (week stall at L13). Everything else checked is green; the r1 fixes (seat desync e7b996f2, family sites jky / jnamefix, test twins) stay on review/coop-thin-g-r1 — the worker continues from it. Scratch shots / probe copies deleted after the verdict (none in git).

## F1 FIX — worker session_01N1tNP4qNNZGeU813sVfsMD (opus), Foreman B ROOT-5 lane, 11/21/2026
PRIORITY #1 CHECK ('week stall'): OD 0 | ledger 0 | claims 4 (coop-week-stall worker 6if7E7NX, REVIEW 3HM21Jne PASS ccd41e45, MAIN84 lander) | main 1 | review/* review/coop-thin-g-r1 695414cf | archive 6. START_CTX ≈ 3 % of 1M (own estimate).
Branch **review/coop-thin-g-f1** from 695414cf (all r1 fixes kept: e7b996f2 seat desync, jky / jnamefix seat-guard sites, test twins).

### STEP 1 — coop-week-stall ccd41e45 on main?
NOT on origin/main (git merge-base --is-ancestor on depth 200 = no; `git grep cyHer|rxQ` origin/main = 0 hits, origin/review/coop-week-stall-r1 = 8). Merged into this branch (861b51e3). One conflict: jcoopworld sendEnd — kept part G's two gates (gG / gHold) and added the stall branch's cyHer() to the first guard. Then merge LIVE.

### STEP 2 — root cause (reproduced, dump below)
Repro on 861b51e3+main (ccd41e45 IN): `THIN=13 node dev/test/coop-night.js` 2 runs, 1 stall (case 3, then case 4 fails «both at buổi tối» as a follow-on). Host dump (coop-night dbg, now with cyHold / cyb / D.log):
`cyHold:3, cyA:3, cyb:{df:3, rk:3, rv:"dung"}, D.log … ["pick","cyrep",0]`, G done[2] true, her thq empty, gHold false, frPz false, sent 1, pend true; her phone «Chờ hảo hữu…», hostEnd wait 2.
→ **her answer IS in (rk = g) but the held draw never looks again.** At eW (level ≥ 5) her Kỳ nguyệt sự answer is a part-D PICK run on the host (E-fix cyAsk on host); her `do cyb` intent is OFF at eW (jcoopworld cySend returns at eW), so the only things that called cyFree were P2H.cyb (L < 5 relay) and a presence event. At L13 with ccd41e45 her end waits for his (cyHer) and his end waits for the draw → nobody changes presence → permanent stall. The faster ccd41e45 ordering makes it MORE likely (no presence after the pick), not less.
Second door, same family (reviewer's TRIP wk31 dump `df=g, no rk, no card`): the card is gone with no answer — her ✕ (closeModal → `pick i:-1`: the host drops the card, chooses nothing), a stale pick (PEND.cyrep null: maid gone / cycle off → no D.GONE.cyrep), or a card lost with her store. herCy asks once per week (E.cyA) → the draw waits on a card that is not there.

### Fix (jcoopthin.js +2 lines, jcoopthine.js +9, jcoopworld.js +4; no number, no word, no UI)
| # | where | what |
|---|---|---|
| 1 | jcoopthin TH.onDo("pick") (answer + stale paths) | after her pick the host runs cyFree (setTimeout 0; no-op when nothing is held) |
| 2 | jcoopworld | 1 s check while CW.cyHold is set (host, eW, outside her context): cyFree — belt for any answer path that makes no event |
| 3 | jcoopthine CW.cyLost / CW.cyReask + jcoopworld cyWait | the ask ran (E.cyR = g), her open cards hold no cyrep, nothing deferred for her seat, seat not held → df cleared on her stored person, E.cyA reset → herCy asks again (card back on her phone; maid gone / no cycle → cyAsk false → cyNo → free). Never frees without her answer while a card can still be shown. |

### Law 11 — every wait that holds a seat / the week on something from the OTHER seat (scan: `grep -on 'CW\.[a-zA-Z]*(Hold|Wait|wait|hold|owe|pend[A-Za-z]*)' dev/build/jcoop*.js` + herCy / gNight / D.DF)
| # | wait | waits for | what wakes it — before | can the awaited thing be lost? before | after |
|---|---|---|---|---|---|
| 1 | **cyHold, eW host (L ≥ 5)** jcoopworld cyWait | her Kỳ nguyệt sự answer (stored S.cyb.rk = g) | presence only (her `do cyb` is off at eW; P2H.cyb is the L < 5 relay) → **STALL** (repro: rk = g, held) | **yes**: ✕ (pick −1), stale pick, lost store → df = g, no rk, no card → **STALL** (TRIP wk31) | wake on pick + 1 s check; lost card → asked again |
| 2 | cyHold, L < 5 | relay cyb (fcy) or her end | P2H.cyb + presence (her end) | relay lost on reconnect → cyK reset on room / peer, sent again | ok (unchanged) |
| 3 | gNight / gHold (L13, jcoopthing) | her week end done + her open cards answered + no mini game | own 500 ms poll | a card in her thq is always on her phone (gSync); ✕ removes it → free | ok (unchanged) |
| 4 | cyHer (guest, L ≥ 5, ccd41e45) | the host's end (ended[host]) | thinview + presence | released when his seat is empty / his person dead | ok (merged) |
| 5 | rpend / resWait | her ack of a res | 10 s expiry | — | ok |
| 6 | CW.pend (end sent → merged week) | Worker merge | `week` frame; syncRoom re-end | — | ok |
| 7 | eWait / F.pend (her phone's #next lock) | host's answer dr | 8 s resend × 3, then «Việc ấy chưa thành» | — | ok |
| 8 | E.owe (host owes her buổi step during her mini game) | her `rd` after the game | her rd catch-up | — | ok |
| 9 | pendBuoi | her OWN open dialog / game | her taps; timer autoRead (one-road cards) | own screen | ok |
| 10 | D.DF (work for a held seat) | hold end | 1 s flush | — | ok |
| 11 | night gate nrdy / ngo | both ready or the host's clock (forceNight) | presence / timer | — | ok |
| 12 | herNight (Kính sự phòng card, E.nk) | no host wait of its own (row 3 covers its card) | — | ✕ → card gone → row 3 frees | ok |
| 13 | D.ANS cards (thInv / thBribe) closed with ✕ | (no seat wait: his rpend expires 10 s) | — | his offer gets no answer (not a stall; pre-existing, D.GONE answers only stale) | FOR B: not this lane |
Only row 1 could wait forever; both its doors are closed.

### Merges on this branch
| sha | what |
|---|---|
| 861b51e3 | merge review/coop-week-stall-r1 ccd41e45 (sendEnd conflict: G gates kept + cyHer) |
| 2e89f9bc | merge LIVE 2021e23f |
| 56828ae6 | **F1 fix** (jcoopthin / jcoopthine / jcoopworld) + coop-night dump fields |
| 8b96b6d5 | merge LIVE fc0867ca |
| (test) | bot family after LIVE fc0867ca: g4 / g4s / TRIP all stuck in WEEK 1 on her phone (G hold 1195, her pz true). Two causes, both test bot, no game fault: (a) kc-coop-select now shows the Luân hồi roulette on the thin seats; the shared clear() (coop-e2e, eval'd by every coop-thin-* test) never tapped it, and coop-thin-g's mgSkip hit-test then saw the roulette over every frame button; (b) kit-dialog folds the mini-game result's «Đã hiểu» into the frame's ✕ (j82: ✕ on a result screen presses #kg82ok, the result applies) — mgSkip only knew «Đã hiểu». Fix: clear() taps `#kroul .krskip` first (as coop-night's clear does); mgSkip presses the ✕ only on a result screen (#kg82ok / #kg92ok present), after skip / done / «Đã hiểu». g4 WEEKS=2: 10/12 → 14/14. |
| 792b8e7c | merge LIVE 74cea8bf (coop-week-stall + coop-guest-agent now on main). jagent conflict: main's agent block kept (agLive / agMine / agSelfRun / agSelf), agGuest() = coopGuest() (seat-guard family: at L13 her week end on the host must count as her seat, else agOn() runs every NPC in her context = a second NPC month). |

### Tests
| test | build | result |
|---|---|---|
| coop-night THIN=13 (case 4 + all) | 861b51e3+2e89f9bc (no F1 fix, ccd41e45 in) | 2 runs: **1 stall** (case 3 → case 4 «both at buổi tối» follow-on), dump above |
| coop-night THIN=13 | 56828ae6 (F1 fix) | **5 runs, 0 stall** (4× 105/105; 1× 97/98: case 8 «same buổi + same clock» ["5:3","5:2"] = leave/return snapshot at the clock's end under 4 lanes, next check «both step» ok, not a week stall) |
| TRIP=1 WEEKS=36 coop-thin-g swap 1 | 56828ae6 | **2 runs 82/82, 83/83, 0 stall** (72 stress weeks) |
| coop-e2e level 0 (tt / nc) both seat orders | 56828ae6 | 92/92 + 92/92 |
| one-core / undef-scan | 56828ae6, 8b96b6d5, 792b8e7c | PASS / PASS |
| g4 / g4s | 792b8e7c | **18/18, 18/18** |
| f3s | 792b8e7c | PASS |
| cyc / cycs THIN=13 | 792b8e7c | **RED 37 fails each**: «B (guest) gets her maid's Kỳ nguyệt sự card» fails, host cyHold null (no hold) — NOT checked on 56828ae6 (pre-merge); suspect LIVE kc-coop-select (jcoopthinb: her life built on the host with her own stored marks) un-stages the test's cycle setup, or a bot-family gap; could also be F1 (cyWait) — first thing to bisect |
| timer THIN=13 | 792b8e7c | **RED 6** (case 2 AFK time-out «-1», cases 3/4 follow-on) — not run pre-merge; same bisect |
| TRIP swap 1 | 792b8e7c | **RED** week 9 seat desync after 10 s (t3 danh 32/31, t4 bạc 17/2) — r1's desync signature back after LIVE 74cea8bf (coop-guest-agent: her servants' agent month on the host in her context at L13 — suspect: a write that is not in the patch / blob) |

## ROLLOVER HANDOVER F1 #1 → #2 (11/21/2026; context ≈ START 3 % + 25 %) — Foreman B opens the successor
Branch **review/coop-thin-g-f1 @792b8e7c** (pushed; contains LIVE 74cea8bf). F1 itself is FIXED and proven on 56828ae6 (night 5/5, TRIP 2/2, 0 stall; root cause reproduced and dumped). NOT ready for review: the LIVE 74cea8bf merge brought 3 reds (table above). Successor:
1. Bisect cyc / timer: run `THIN=13 node dev/test/coop-cyc.js <out> http://127.0.0.1:8787` and coop-timer on 56828ae6 (F1 fix, pre-LIVE-merge) vs 8b96b6d5 (LIVE fc0867ca) vs 792b8e7c. If 56828ae6 is red → F1 code (cyWait / herCy E.cyR / cyLost) is the cause; else the LIVE kc-coop-select / kit-dialog / coop-guest-agent change (bot family or a real G × LIVE fault). Keep the bot fixes of 8b96b6d5+ (roulette krskip in shared clear, ✕ on result screens).
2. TRIP week-9 desync (bạc / danh differ host vs her phone after 10 s): dump as r1 did (E.base / thpn / D.PQ); suspect coop-guest-agent's agSelf at L13 (her household month on the host in her context: wage / Sức / secrets) writing her S outside the patch, or agGuest()=coopGuest() choice at the jagent merge (try main's raw seat check for agGuest + see if agOn runs NPCs in her context).
3. Then: night ×5, TRIP swap ×5, g4/g4s, coop-e2e ×3 both orders, cyc/cycs, timer, f3s–f6s, perf (coop-thin-g-perf.js MONTH=1 CPU=4, ≤ +40 %), quickcheck, role-parity, old save; '## F1 FIX' verdict line; SẴN SÀNG KIỂM.
Local Worker: `cd coop/worker && npm install && npx wrangler dev --port 8787 --ip 127.0.0.1` (THINMAX 13). Lane script: copy dev/test/coop-thin-g-reg.sh, set cd/O paths. Not yet run here: f4s/f5s/f6s/night on 792b8e7c (lane was cut), quickcheck, role-parity, perf.

## F1 FIX #2 — worker session_01N1tNP2X4FHGnxW9LYH1iQy (opus), Foreman B lane (ROOT-5 → ROOT-6 session_01N1tNP4cmMULveQru19PTCj), 11/21/2026
PRIORITY #1 CHECK ('week stall'): claims F1 #1 4qNNZGeU (rolled) | review/coop-thin-g-f1 792b8e7c, review/coop-thin-g-r1 695414cf | no other claim. START_CTX ≈ 4 % of 1M (own estimate; get_session reads 0) → rollover ≈ 29 %, ceiling 60 %.

### Bisect of the 3 reds after LIVE 74cea8bf (same local Worker, THINMAX 13)
| suite | 56828ae6 (F1 fix, pre-LIVE) | 8b96b6d5 (+ LIVE fc0867ca) | 792b8e7c (+ LIVE 74cea8bf) | cause |
|---|---|---|---|---|
| cyc THIN=13 | **66/66** | red (dung: «B gets her maid's card» + «host draw waits») | red (same) | **TEST BOT**: the HOST's own Tài nghệ (kg82) result screen stayed open → his week held (G hold 80). LIVE kit-dialog folds the result's «Đã hiểu» into the frame ✕; coop-cyc's own clear() only knew «Đã hiểu». Not F1 code. |
| timer THIN=13 | — | — | red 6 | same bot family (own clear()) |
| TRIP swap wk9 desync | — | — | not reproduced: 1 run 82/82 + lane run 35/36 weeks green (cut by a 45 min cap under load) | see lane below (×5) |
Family scan (law 11): `grep "Đã hiểu|Tiếp|Đóng)/.test(b.textContent.trim())&&vis(b)"` dev/test/*.js → 5 own clears: coop-thin-g (fixed by #1, d3b2d167), **coop-cyc, coop-e2e (shared clear, eval'd by every coop-thin-* test), coop-night, coop-timer** — all 4 fixed in e6a5feeb (✕ on a result screen when #kg82ok / #kg92ok exists, as coop-thin-g mgSkip). After: cyc 66/66 + cycs 66/66 + timer 43/43 (792b8e7c + e6a5feeb).

### New on this branch
| sha | what | class |
|---|---|---|
| e6a5feeb | result-screen ✕ in the 4 own clears above | TEST BOT family |
| 34052c15 | merge LIVE origin/main 35232176 (co-op diff: jcoopthinf +econ ctx from econ-tamco; index.html / sw.js rebuilt) | merge |
| b07ec7ea | coop-night / coop-timer clear(): tap a scene that shows no end button yet, once (coop-e2e / coop-cyc already do: kv) — night run 4 stall [3,3,3] (frPz / gHold, cyHold null): her phone's night card `kne-ov` over her dress board, «Tiếp tục» hidden | TEST BOT family |
| f108a7da | **KIT REQUEST** (dev/kit/KIT_REQUESTS.md): night card (jne kitNightEnd) has NO end button in reduced motion — j93 kmStage red → finish() at 0 clears `T`, which held jne's `st.later(0, fin)` (.km-done shows the button); manual scene = no hint. Scan: 5 manual kmStage scenes, only jne uses st.later → 1 site. Kit keeper's part (law 9), not changed here. | KIT (FOR B) |
static @34052c15: one-core guard PASS · undef-scan PASS.
Full lane (night ×5, TRIP ×5, g4/g4s, e2e level-0 tt/nc ×3 both orders, e2e THIN13 both, cyc/cycs, f3s–f6bs, timer, perf) RUNNING @f108a7da (detached; logs /home/user/wt/lane).

### F1 FIX #2 — lane results @f108a7da (main 35232176), detached, one Worker (THINMAX 13)
| suite | result |
|---|---|
| night THIN=13 ×5 (new bot b07ec7ea) | **5/5 105/105, 0 stall** (first lane, old bot: run 4 stall = night card kne-ov over her dress board, see KIT REQUEST) |
| TRIP=1 WEEKS=36 swap ×5 | **5/5 82/82, 0 stall, 0 seat desync** (180 stress weeks; + 1 earlier run 82/82). The F1 #1 «wk9 desync» did NOT come back — not reproduced in 6 runs |
| g4 / g4s | 18/18 · 18/18 |
| coop-e2e level 0 tt/nc ×3 both orders | 6/6 92/92 |
| coop-e2e THIN13 / swap | 92/92 · 90/92 under 2-lane load (Thái hậu picture not yet on one seat in 20 s) → alone 92/92 |
| cyc / cycs THIN=13 | 66/66 · 66/66 (also 2× each earlier) |
| timer THIN=13 | 43/43 (alone) |
| f3s / f4s / f5s | 37/37 · 18/18 · 30/30 |
| f6s | A-dup red 4× (her phone had 2 open cards from the new deal → act refused) → **fixed 097a8e91** (staging: answer them / re-deal); 9 more runs: A-dup 0 red; 2 single flakes on other rows: S1 «Mua chuộc» (servant first-meeting, no cost: random servant) and «Múa trong yến tiệc» (twin khắc `left` 6 vs host 9 in the mood log line = solo twin clock) — TEST TWIN / staging, intermittent ~1/9 each, not game |
| f6 (no swap) | 41/41 |
| f6bs | L3 (review r1 FOR worker) **fixed 097a8e91** (snapshot counts the sit e.ex.n) → 41/41 |
| perf MONTH=1 CPU=4 | her week end in ctx b **+33.1 %** (≤ 40 %) PASS |
| role-parity | ALL PASS |
| one-core / undef-scan | PASS @34052c15 and @066ef17d |
| quickcheck 097a8e91 | old save loads + plays (Đào Dao Quang) PASS; G4 mk-layer / anchor red = sparse worktree without dev/art (r1 same note); **perf buổi 4344 vs live 1354 ms (limit 2854) RED — 2 of 3 runs slow (1259 / 4787 / ~4344)** → RECHECK on the new merge (not yet known if noise; render / tab / open fine) |

### Merges after the lane
| sha | what |
|---|---|
| 097a8e91 | test staging f6 A-dup + f6b L3 (above) |
| 066ef17d | **merge LIVE origin/main d541add9** (109 build files). Conflicts: jentry / jkc (our kcPhucEnd / kcPhucGame seams kept, main's entBotRaw / entSkipRaw values taken), jrcv (our coopAccepted road kept + main's cold-faction PEND.rcvAsk), KIT_REQUESTS (both). one-core + undef PASS. **NO suite run yet on 066ef17d.** |

## ROLLOVER HANDOVER F1 #2 → #3 (11/21/2026; context ≈ START 4 % + 25 %) — Foreman B opens the successor
Branch **review/coop-thin-g-f1 @066ef17d** (pushed; contains LIVE d541add9). F1 fixed (56828ae6); the 3 post-LIVE reds were TEST BOT family (fixed e6a5feeb / b07ec7ea), proven on the full lane above @f108a7da. Successor:
1. **Seat-guard family (law 11, G) on the NEW main code** — d541add9 added raw seat reads that at L13 run on the host in her context (CW.gWk, her week end) and so must follow coopGuest() / ctx like the 30 earlier sites: scan `git diff 35232176 066ef17d -- dev/build ':!dev/build/all.js' | grep '^+' | grep -n 'seat[!=]=="a"\|guest()'` → j61 k61GuestOwn / k61HostCopy / k61CoopFr / k61Shared (5 `W.seat`), jbancung bcNpcAsk `hostOK=!cw||COOPW.seat==="a"` (host runs every NPC ask; inside her week end on the host = a second NPC ask?), emo guest() / emoOff / emoRec / mkSync wrap (emo-balance, COOPW.inFC/emoHost), jcooptimer +134, jcoopone +58, jcoopworld +49. For each: old vs new value at CW.gWk; change only where her week end on the host would run host-only work or skip hers (before/after table).
2. Rebuild is in the commit; run on 066ef17d: g4 / g4s, night ×2, TRIP swap ×2, e2e THIN13 both, cyc / cycs, timer, f3s–f6bs, e2e level-0 tt/nc both, perf, role-parity, **quickcheck perf buổi recheck** (if still > limit: compare with origin/main d541add9 itself to see if it is G or main).
3. Then '## F1 FIX' verdict + SẴN SÀNG KIỂM coop-thin-g-f1 <sha> TIER BIG to Foreman B ROOT-6 session_01N1tNP4cmMULveQru19PTCj (+ FOREMAN_B_STATUS line).
FOR B: KIT REQUEST night card (jne kitNightEnd) no end button in reduced motion — kit keeper (dev/kit/KIT_REQUESTS.md on the branch).
Setup: local Worker `cd coop/worker && npm install && setsid nohup npx wrangler dev --port 8787 --ip 127.0.0.1 &` (detached: background tool jobs are cut at 2 h); build `python3 dev/build/assemble.py && bash dev/site/build_site.sh` (tests read dev/index.html); lane script pattern = dev/test/coop-thin-g-reg.sh (2 parallel queues max on 4 cores; TRIP runs ≈ 40 min each under load, cap ≥ 6000 s). Never rebuild while a suite runs in the same worktree.

## F1 #3 REPORT + ROLLOVER HANDOVER F1 #3 → #4 (11/21/2026 ~22:30Z; context 33 % = START ~5 % + 25 % → rolling over; the COORDINATOR opens #4)
PRIORITY #1 CHECK: OD/handover = this file §F1 #2 handover | main dcff5884 (LIVE) | review/* coop-arrive-see a201d968 (LANDED), coop-room-faces (LANDED), coop-guest-names (j61 in LIVE) | claims: this branch only.
Branch **review/coop-thin-g-f1 @647f30aa** (pushed; contains LIVE dcff5884). Commits this session:
| sha | what |
|---|---|
| 74f72f32 | merge LIVE 08e1e934 (index/sw only) |
| 906a169e | item (1) SEAT-GUARD FAMILY on d541add9's raw seat reads: j61 k61GuestOwn / k61HostCopy / k61CoopFr / k61Shared + jbancung palFix bcNpcAsk read coopGuest() (helper k61Gst). Before/after at CW.gWk on the host: her maid/staff/kids key solo "x5" → "gx5" (= her phone); host-copy "h" keys false → as her phone; k61CoopFr / prot P = her OWN blob → the host's; bcNpcAsk ran (NPC petition rolled in her week end, could change HER oán, not restored) → skipped (= her phone). emo guest() / emoOff / mkSync already include coopGuest() (no change); jcooptimer none; jcoopone `CWo.seat` sits in fromCanon (merged week, not her ctx: no change); jcoopworld new lines host()-side merge only (no change). |
| 927de70d | TRIP swap 1 wk32 staff host 1 / phone 0 (demotion): her phone trims servants over the table at render (jpromo render → capSweep → capTrim(S)); the host paints nothing → TH.ctxOut (jcoopthing) runs capTrim(S) on HER person at every close of her context (part D on). Then TRIP 2/2 green. |
| bad48708 | coop-timer check 2 reads aria-labels (bot family: hao-huu chip shows only m:ss) |
| 14b87a98 | merge LIVE dcff5884: j34 (our PEND.ctMid / ctR1 kept + main's BAL wording ported: prW, backerPt + ctBackerAdd, sabCut, sgStat), jts (our tsSummonEnd / play(i) + main's sgStat / denSung / denAn), jdis (coopAccepted + sgStat), jcoopworld (G_NOADD + rfYield toCanon). one-core / undef / sg-card-scan / law4-typed PASS. |
| 31acff2f → REVERTED 647f30aa | tried: host patch sends her core stats as values at L13 (ABS13). TRIP swap 0 then RED 21 fails (danh host +1 every week from wk 9) → reverted. coop-thin-g env DANHP diagnostic (her Danh phone vs host store every 400 ms) kept in the test. |
| 30e12013 | 16 co-op test bots' clear() tap the jfocus line «Tiếp ▸» (.kfoc-next) — a cung nữ's cnvScold line held her week (e2e / e2e0n stuck); e2e 124/124 after |
Lane @31acff2f (= 647f30aa minus ABS13 revert; build otherwise same): TRIP swap 1 ×2 82/82 · night ×2 105/105 · g4 / g4s 18/18 · e2e / e2es / e2e0 / e2e0s / e2e0n / e2e0ns 124–125 all · cyc / cycs green · timer 43/43 · f3s / f4s / f5s / f6 / f6s / f6b green · f6bs 41/41 alone (A1 deck-card tap flakes under 2-queue load, 2×) · coop-arrive-see as0 / as9 / as9s / as13s green, as13 89/89 alone (2 flakes under load) · coop-emo-seat 25/25 · ow 1–10 PASS · perf +39.3 % (≤ 40) · trip0 RED (ABS13, reverted). Earlier @bad48708: role-parity ALL PASS; quickcheck PASS (core gates, old save, perf buổi 1381/1323 ms new/live — item (3): the old 4344 was noise: live had one 4524 run too).
Pre-existing, NOT this branch (LIVE main dcff5884 fails the same here): coop-room-faces.js and coop-guest-names.js never make a room in this container (`A has a room code` FAIL on main's own build) → their owners.
OPEN for #4 (in order):
1. **RARE DANH SPLIT (not proven fixed)**: @14b87a98 TRIP swap 1 once: her Danh host store 96 | phone 95 from wk 26 to the end (she hit Danh 100 at wk 24); 1 of 3 TRIP runs at that build; @31acff2f trip1 ×2 green. Patches carry numbers as deltas ("+", only buoi is "="; PQ keeps 40 unacked; her phone's E/F erd ops are deltas too) and her phone also takes S.gMine at the week merge → a lost / doubled step or a gMine snapshot taken before a later change in the same context close stays forever. Repro / trace: `DANHP=1 TRIP=1 WEEKS=36 node dev/test/coop-thin-g.js <W> 13 1` (prints her Danh phone | store with her last log lines and D.log on every change). Do NOT retry ABS13 blind (it made swap 0 worse: suspect gMine (MINE snapshot in herWeek) vs "=" patch order).
2. Rebuild is in 647f30aa; run on it: TRIP swap 0 ×2 + swap 1 ×2 (the revert must bring swap 0 back green), g4 / g4s, night, e2e THIN13 + level 0 both, cyc / cycs, timer, f3s–f6bs, as9/13 both, emo, ow, perf, role-parity alone, quickcheck (old save + perf).
3. Then '## F1 FIX' verdict + SẴN SÀNG KIỂM coop-thin-g-f1 <sha> TIER BIG to the newest Foreman B (FOREMAN_B_STATUS top line) + one status line.
Setup: worktree /home/user/wt/ctg3 may be gone in a new container: `git worktree add` sparse, `cd coop/worker && npm install && setsid nohup npx wrangler dev --port 8787 --ip 127.0.0.1 &`; lane script copy with TRIP / arrive-see / room-faces / emo entries: /home/user/wt/lane3/lane.sh (copy of dev/test/coop-thin-g-reg.sh + entries; CAP=6600 for TRIP); 2 queues max; never rebuild while a suite runs in the worktree.

## F1 FIX #4 — worker session_01N1tNP48cvPSepUBAC1udzg (opus), Foreman B ROOT-8 lane, 11/21–22/2026
PRIORITY #1 CHECK: OD/handover = §F1 #3 handover above | main 87ac1ff4 (LIVE, merged here) | review/* review/coop-guest-week-lag 3f1cec27 (same jcoopthine e7b996f2 hunk ported verbatim to LIVE — kept identical here, not touched) | claims: this lane only. START_CTX ≈ 5 % of 1M (own estimate; get_session reads 0) → rollover ≈ 30 %, ceiling 60 %.
Worktree /home/user/wt/ctg4 (sparse), local Worker 8787 (THINMAX 13), lane /home/user/wt/lane4/lane.sh (copy of coop-thin-g-reg.sh + trip0*/trip1* (DANHP on swap 1) / as9/as13 / emo / perf / e2e0s / e2e0n), logs /home/user/wt/out4.

### Item 1 — rare Danh split (host 96 | phone 95 @14b87a98)
| try | build | result |
|---|---|---|
| TRIP swap 1 + DANHP ×2 | 647f30aa | run A 82/82 green, no split · run B **week-31 stall** (below, bot family) |
| TRIP swap 1 + DANHP + pq-drop / gap probe ×2 (wt ctg4b, instrumented, killed at wk16 for the lane) | 647f30aa + probe | 0 split, 0 patch dropped, 0 gap; host unacked queue max 3–4 at every Danh change |
Not reproduced (0 of 6 TRIP runs since 14b87a98: 2 @31acff2f, 2 here, 2 instrumented). Doors of the delta family checked (LAW 11):
| # | door | verdict |
|---|---|---|
| 1 | host part-D patch queue: patchOut kept **40** unacked, dropped the oldest; her phone applies n > thpn with no gap check → that delta lost for good on her phone (a permanent split) | **REAL door, fixed 6a259bae**: never drop an unacked patch (400 = memory belt, counted D.drop + log pq-drop); coop-thin-g asserts 0 drops. Not shown to be the 14b87a98 case (max queue seen 3–4). |
| 2 | first erd of a new week vs the host's old-week view (Foreman B FYI, review/coop-guest-week-lag) | covered by e7b996f2 (kept identical). Order checked: jcoopworld onWeek (fromCanon, sync) is registered before jcoopthine's week handler → her baseline = the rebuilt S. |
| 3 | late part-D patches between his end and the week (gEmp) | r1 fix stands (applied on C + re-queued, same order both seats) |
| 4 | her erd / ready on a dead socket | re-net: baseline = host copy (E.bs null) → nothing doubled |
| 5 | nested withSeat (inner D.cur cleared → outer diff counts the inner change again?) | no: same-seat nesting runs fn() with no new D.cur |
| 6 | host reload: D.N restored lower → a new patch reuses n ≤ her thpn → skipped | no: D.save runs right after patchOut |
| 7 | a quiet-view "heal" (her phone adopts the host's core numbers when nothing is in flight) | **tried and dropped**: a dry run caught a TRANSIENT mismatch at a quiet view at the week turn (g4s wk5: bạc 412 vs 332, sung, th; resolved by itself) → a heal there would itself double a delta. Not shipped. |
| 8 | her erd op larger than PACK (15 000 chars) is counted «big», not sent, while her baseline takes it as sent | non-numeric only (one number op is tiny); FOR B (not this lane) |

### Week-31 stall in TRIP run B = TEST BOT family (fixed c40d175b)
Her phone held 3 cards (Q[0].dfSeen, #modal hidden), host gHold, the week never merged: her NPC card was playing in the jdfv encounter scene (jfocus kitFocus choices «m<k>»), the centre modal stays hidden by design; the shared clear() only tapped #modal. All 16 co-op clear() helpers now pick a visible `.kfoc-b` whose data-id is `m<k>` when Q[0].dfSeen (the say line «Tiếp ▸» was already tapped since 30e12013).

### Merge
99201b6c = merge LIVE 87ac1ff4: jbal2 (both blocks), jcoopworld famApply (main E44 held case + our coop-thin-laydo __inv0 mark), cyHold block (our 1 s eW check + main's coop-cyhold timeout / peer re-say; cyWait keeps cyLost / cyReask before main's cyTo), jentry/jkc (our kcPhucEnd seam kept, main's Phúc tuyển podium inside it, not drawn on the co-op host for her: COOPW.ctx). Seat-guard scan on main's new code: 0 raw seat reads. one-core / undef PASS.

### Item 2 — full lane @99201b6c — RUNNING (2 queues, /home/user/wt/out4/reg-sum.txt)

### ROLLOVER HANDOVER F1 #4 → #5 (11/22/2026 01:30Z; context ≈30 % = START_CTX 5 % + 25 %)
PRIORITY #1 CHECK: report + briefs/coop-thin-g.md + review/coop-thin-g-f1 log re-read; nothing new on main/review/* for jcoopthin* since 87ac1ff4.
- Branch review/coop-thin-g-f1 @99201b6c (c40d175b bot fix ×16, 6a259bae PQ no-drop + assert, 99201b6c merge LIVE 87ac1ff4). Nothing unpushed.
- Lane RUNNING from /home/user/wt/lane4 (q1.log/q2.log; script lane.sh; worktree /home/user/wt/ctg4; wrangler 127.0.0.1:8787 THINMAX 13, log /home/user/wt/wrangler.log). Summary /home/user/wt/out4/reg-sum.txt, per suite r-<name>.log. Do NOT rebuild ctg4 while it runs. If the container restarted: restart wrangler, then `bash lane.sh` queues again.
- Results so far: trip1b (TRIP swap 1, DANHP) 83/83 PASS 1793 s. **trip1a (TRIP swap 1, DANHP) 73/83 FAIL — the Danh split REPRODUCED**: G1 weeks 11,12,14,15,18,20,21,23 diff ["danh",host,phone] = host +1 over phone, held ≥10 s, then the host store drops to the phone value with NO new patch (pn==N, pq 0, drop 0). Week 27: one stall (hw [26,26], noEnd 1, recovered at 28).
- DANHP reading: her phone goes down FIRST through a patch, while COOPW.thin.seatOf('b').S.danh still shows the old value, and catches up seconds later. So it is NOT a doubled delta and NOT a lost patch (PQ fix holds: drop 0). The host's seat store is behind the patch it sent: something writes the old danh back into ST.b after the patch, then a later write restores the new value. Suspects: (1) the store rebuilt from canon after the week merge (jcoopthine.js:213 seatOf wrap; jcoopthin.js:117–131 seatDrop→seatOf from P.b of the merge); (2) E.wRestore/standBack in jcoopthing.js:81.
- NEXT for #5:
  (a) Add window.__drops (already recorded by the test, jcoopthin seatDrop stack) and the store's B.wk/fresh to the G1 FAIL print and to DANHP. Rerun trip1 swap 1 ×2 to confirm the rebuild suspect. Fix at the door for the whole family: every key restored by the rebuild, not only danh.
  (b) Finish the lane rows. Pending: trip0a/b, g4, g4s, e2e*, cyc*, timer, night, f3s–f6bs, as9/13*, emo, ow, perf. Then role-parity alone + quickcheck.
  (c) Write the '## F1 FIX' verdict, send "SẴN SÀNG KIỂM coop-thin-g-f1 <sha> TIER BIG", and add one line at END of FOREMAN_B_STATUS.
- FYI kept: I left the e7b996f2 jcoopthine.js hunk (LIVE on review/coop-guest-week-lag 3f1cec27) untouched. The split above is the store-lag family, not the doubling family.

#### F1 #4 lane result @99201b6c (ended 11/22/2026 02:44Z; logs /home/user/wt/out4/r-<name>.log in F1 #4's container only)
| suite | result |
|---|---|
| trip1a TRIP swap1 | FAIL 73/83 (Danh store lag ×8 weeks; wk27 merge stall) |
| trip1b TRIP swap1 | PASS 83/83 |
| trip0a TRIP swap0 | PASS 83/83 |
| trip0b TRIP swap0 | FAIL timeout 6600 s, 11 fails: G1 "week merged once" from wk14, hw stuck [14,14] (host stops merging her week) |
| g4 / g4s | PASS 19/19 ×2 |
| e2e / e2es / e2e0 / e2e0s | PASS 124/124 ×4 |
| e2e0n | FAIL 122/124: world-people name split "Thải Vân" only on A (dup rename at load, old "Kim Quất") after wk3 + rejoin |
| timer | FAIL 41/43: "mini game over → B steps" B stepped twice ["0:2","0:3","0:2"] |
| as9 | FAIL 2: home / visitPal (host does not see her at home) — as9s PASS |
| as13 | FAIL 1: visitPal (she at host palace does not see him at home) — as13s PASS |
| cyc / cycs / night (105/105) / f3s f4s f5s f6 f6s f6b f6bs / emo 25/25 / ow ×10 / perf | PASS |
| role-parity, quickcheck | NOT RUN (left for #5) |
Before you call any red new, check it against main: e2e0n, timer, as9, as13 may be flakes or older reds. trip0b looks like the trip1a wk27 merge stall, but sticky.

## F1 FIX #5 — worker session_01N1tNP2pYTX6fTAsL7MNa3h (opus), Foreman B ROOT-8 lane, 11/22/2026
PRIORITY #1 CHECK: OD/handover = §ROLLOVER F1 #4 → #5 above | main 02c6d8f4 (LIVE, merged here 9f58222a) | review/* review/coop-guest-week-lag (jcoopthine e7b996f2 hunk untouched here), review/coop-host-lag-r2-r3 (its coop-e2e clear() = ours VERBATIM 09a5a439: one helper, no change here) | claims: this lane only. START_CTX ≈ 4 % of 1M (own estimate; get_session reads 0) → rollover ≈ 29 %, ceiling 60 %.
Worktree /home/user/wt/ctg5 (sparse), Worker 127.0.0.1:8787 (THINMAX 13), lane /home/user/wt/lane5/lane.sh (copy of coop-thin-g-reg.sh + trip0/1(b), as9/13(s), emo, perf, e2e0s/0n), logs /home/user/wt/out5/lane.

### Danh split — ROOT CAUSE (reproduced, traced)
#4's reading («host store stale, then catches up with no new patch») was the other way round. New DANHP trace (a setter on her phone's core numbers with the full stack; host log of every part-D patch / erd op / store build): TRIP swap 1 run b, weeks 21–32, every week at buổi 0 (and sometimes 1) her PHONE wrote `danh −1` through `apply` from a paint, not a patch; the host never ran it; the host caught up only at her next ready, by her `erd` diff (`["+",["danh"],-1]`) — that is the «catch-up with no patch». G1 samples before her ready → host +1 | phone.
Writer: **jty.js tyCharge("home")** in a `renderStage` wrapper (a visitor at home while she is in trung y: Danh −BAL.ty.meet = 1, once per buổi by S.tyPaid). Render-diff family (jcoopthinf RDIFF: rules that run at paint and write her person — on the host they run as her context closes, on her phone they are read-only); tyCharge-home was missing from it.
### Fix c5840d47 (jty +4 lines, jcoopthinf RDIFF +1 name; no number, no word, no UI)
jty: the wrapper body becomes ONE named engine `tyHome()` (solo unchanged: renderStage → tyHome). jcoopthinf: `tyHome` in RDIFF (before prCheck = solo paint order) → host runs it in her context at every close; her phone's copy is read-only (the existing RDIFF wrap, rOn()).
### LAW 11 — the whole family (scan `python3 dev/test/coop-rdiff-scan.py`: every render / renderStage / k3Stage wrapper that calls a function writing her numbers, 2 call levels; exit 1 on an unreviewed one)
| | before (9f58222a) | after (c5840d47) |
|---|---|---|
| candidates | 7 (1 level) | 22 (2 levels) |
| OPEN | **1: jty.js:69 tyCharge** | **0** (tyHome = RDIFF; 21 reviewed: guest-guarded resApply / nextBuoi→ready, deck-only j76Std / eaSync / kccoCards, DOM / notice only, co-op layer, next-line noise — table in the script) |
### Tests so far
| test | build | result |
|---|---|---|
| TRIP swap 1 + DANHP (repro) | 99201b6c/9f58222a | 6 runs: run b **FAIL G1 wk 22–32 danh +1** (trace above); 4 green; 1 cut. Run c: a **week-31 stall** (her phone held thin card tsgiftpick «Biếu quà làm lành», #modal hidden, Q[0] seen) — not the split; FOR B / next lane if it recurs (#4 saw a wk27 stall too) |
| coop-thin-g G0b (new, deterministic: stub tyOn + one NPC visitor on both pages, her place set by the host) | before (old build) | **FAIL** phone 38→37 at render, store 38 |
| same | after c5840d47 | **PASS** phone 14 at render, store 14→13, phone 13 by patch (×3 runs) |
| G2 (her month = solo, same dice) | c5840d47 | 1× inv 17|18, then 2× green (flake, unrelated: G0b off also green) |
| one-core / undef-scan / law4-typed | c5840d47 | PASS / PASS / 0 |
Full lane @c5840d47 RUNNING (2 queues).
