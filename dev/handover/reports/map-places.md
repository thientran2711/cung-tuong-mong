# map-places (GAP KP02, J6) — worker session_01N1tNP5RC6vRXez3u71oULJ

PRIORITY #1 CHECK: OD L82 (decided 6 places) | main: jplx.js has cnh/tgk/ttp/acs/dc; **nvp already live: jact.js:90-97** (map spot, places(), count, peddler + weekly rare item, ACC_DAY, icon `bac`) → dropped from this job with proof | review/places (plan only, rejected pilot art) + review/places-port-r1 (= what main already has; its PROGRESS says nth/pd/nvp left out) | claims: none other.
START_CTX ~8 % (estimate), depth unknown.

## Done — branch review/map-places, sha 6883c4feb (on LIVE 30e8714e)
- `dev/build/jplx.js`: two new map places in the existing PLX registry (no old module edited):
  - `nth` Ngự thiện phòng, box .733,.455,.052,.137 (PLACES_PLAN §1), walk cell [1,4]; picture = STAND-IN (tạm) `img/kit/mg-banh-bg-hoc` (the painted kitchen board room), floor .74; keeper NPC «Quản sự Ngự thiện phòng»; open by day to Quý nhân+ (else the standard «Lẻn vào» card), closed at night.
  - `pd` Phật đường, box .77,.235,.065,.155, walk cell [0,4]; picture = STAND-IN (tạm) `tu-ninh-cung-<season>-<buổi>` (golden Buddha altar, 16 variants already on CDN); keeper NPC «Sư cô Phật đường»; open by day to every rank, closed at night.
  - Dư đồ list view row added; small labels like the other jplx places; map count = people on arrival (outermost count wrap, because the j95 ledger count would read 0 for places it does not know).
- `dev/build/jact.js` KIT_PLACE_IC: `nth:"suc"`, `pd:"duc"` stand-in glyphs.
- Law 6 (real people): NO servants are sampled into these rooms (one place per servant per buổi in the j95 ledger); only the fixed keepers. I tried errand-runner sampling first, the arrival check caught the count mismatch, removed.
- No numbers, no new acts: the existing acts of these places are NOT hooked (they are ledger/act work, see follow-ups).
- Test `dev/test/places-d42.js` now covers 7 places and checks count = people on arrival (also repaired: it started from `home`, where the retinue-picker modal blocked goTo).

| check | 755x1000@2 | 1180x820@2 |
|---|---|---|
| 7 spots on map | yes | yes |
| nth / pd count = arrival people | 1=1 / 1=1 | 1=1 / 1=1 |
| page errors | 0 | 0 |
| horizontal overflow | none | none |
| spot overlap | none new (old: lc/acs, cnh/nvp) | none new (cnh/nvp) |
Looked at: stage shots of nth and pd on both devices (stand-ins read correctly; modals from the harness covered part of the frame). Old save: nothing stored. Not run: quickcheck.sh (does not exist on LIVE), co-op suites (no rules/numbers touched; only S.place travels as before), 1366x1024/412/390.

## ART REQUEST for Foreman C (tạm → real)
Two paintings × 16 season×buổi (+ fallback) at 1280x720 like `thuong-thu-phong-*`: `ngu-thien-phong-*` (imperial kitchen, wide hall, stoves, steam, sacks, no people) and `phat-duong-*` (Buddha hall with lotus pond, as in PLACES_PLAN §1). When on the CDN: set `img`/`fl` in PLX.nth/pd, move both ids from PLX_STAND to PLX_NEW, remove `stand:1`.
## KIT REQUEST (filed in dev/kit/KIT_REQUESTS.md): glyphs `place-nth`, `place-pd`.

## Follow-ups (not built; need the j95 ledger or new numbers, feature freeze)
- Ledger rows for nth/pd (servants on errands: «sang lấy thiện», Phật tối mùng một / rằm), Thái hậu's morning rite at pd, festival events moving the court to pd (plan §2).
- Acts at these places: «Xin xăm ở Phật đường» (j2.js:152 is `if(false)`, left alone: owner rule 16), «Truy đến cùng Ngự thiện phòng» (j7 event option), kitchen lesson at nth (plan §4).
- Plan §3 per-place sneak odds + the «lảng vảng bếp ngự» evidence on a caught sneak into nth (new numbers → BIG review).
- Rows OD:L82 also lists Hoán y cục (= tgk), Dãy nhà cung nhân (= cnh), Thượng thư phòng (= ttp): already live. KP02 can close after nth/pd land; nvp was already done.

SẴN SÀNG KIỂM map-places 6883c4feb (SMALL review: no acts/numbers changed).

## REVIEW r1 (sonnet SMALL) — PASS 7c2aaa08c (review/map-places-r1 = 6883c4fe + merge of origin/main; index.html/sw.js conflicts resolved by rebuild)
PRIORITY #1 CHECK: report + brief carry it; nvp drop verified (jact.js:90-97 live).
- SMALL confirmed: diff = jplx.js, jact.js (icon map), places-d42.js, built files. No BAL, save, co-op, time or progression file. Access rules (nth: Quý nhân+ by day; pd: all by day) copy the existing ACC_ROLE pattern, no new numbers beyond the rank gate; flagged as a note, not a fail.
- Laws: 9 KIT (same PLX registry, same spot/label/list code as the other 5 places; stand-ins marked tạm; KIT_REQUESTS rows place-nth/place-pd on handover branch; art request in report) OK; 6 (people: fixed keepers only, no invented ledger servants; objects n/a) OK; 7 wording OK (cổ trang, no %); 4 no typed numbers; 11 whole group (list view + map + count + access) done; 12 shots looked.
- Tests on merged build: places-d42.js at 755x1000@2 and 1180x820@2: 7 spots found, nth/pd count = arrival people (1=1), page errors 0, no horizontal overflow, no overlap with neighbours. Fresh game, no old save needed (nothing stored).
- Looked at: map + nth + pd stage on both devices (birth modals from the harness cover part of the frame; labels «Ngự thiện phòng» / «Phật đường» and keepers visible, stand-in pictures read correctly).
- Not run: quickcheck.sh (absent on LIVE), co-op suites (nothing touched).
Landing: ff main to 7c2aaa08c only if main has not moved; else coordinator re-merges (built files will conflict again — rebuild).

## MEM FIX r2 — worker session_01N1tNP2WuK5mpdfoK3vLBAr (opus), 21/11 — SẴN SÀNG KIỂM d4c723d4 (branch review/map-places-r2-land)
PRIORITY #1 CHECK ('map-places memory OOM consort role-parity'): OD 0 | ledger 0 | claims 0 (own row) | main 0 | review/* 0 | archive 0 (brief line; re-checked: no other worker on role-parity memory).
START_CTX ~5 % (estimate).

### Cause (measured, renderer RSS from /proc per role; same box 15 GB)
- NOT a game leak. Real play = one tap = one task: 800 goTo+render as separate tasks → renderer ~440 MB, JS heap ~40 MB, **LIVE b1033eb0 = branch 3217d3b7** (same numbers). nth/pd add nothing per goTo.
- SCAN artifact: role-parity-scan.js ran the whole consort phase (8 player roles × 24 world variants × every place goTo + render, ~1700 goTo) in ONE `page.evaluate` = one synchronous task. Each goTo+render queues ~150 deferred UI timers (renderStage/lay2/showModal/kitFrameApplyLive3/kmmSched/kfsSched layout passes); inside one task they never run, so the detached stage DOM they close over is never freed (Blink DOM nodes counter 41 k when tasks are split vs 897 k in one task for the same 840 goTo; 3.2 GB vs 0.49 GB).
- LIVE b1033eb0 consort phase: +~1.2 GB per role, peak **12.5 GB**; the branch has 21 places instead of 19 (+10 % goTo) → 13.7 GB = memcg OOM. Matches LANDER #2b (LIVE "just fits", browser-per-phase does not help: the phase itself is the one task).
- Tried and rejected: yielding inside the evaluate with the game's timers suppressed (memory still not freed: the cleanups ARE those timers); letting timers run mid-scan (they could move the world between variants).

### Fix (test-only, B owns the scan) — commit e3b3f02c
- `dev/tools/role-parity-scan.js`: each consort player role runs in its own fresh page (world set-up + seeded start + NPC part repeated per page, results merged as a union; error lines de-duplicated). The maid phase is unchanged (one page; maid/up/t1me depend on each other).
- Effect: every role is probed from the SAME seeded world, independent of role order (before, a later role saw the world the earlier roles left).
- Rows vs the old scan on LIVE b1033eb0: 0 new gaps; 2 old gaps gone = hh N-ONLY cx2:chest + cx4:rougeSteal (the same state-carry artifact main already worked around in 56ff0db0 with the chest-direct probe); a few NUM/EXEMPT cells gained on t3–t7 (more player rows found, none lost as a gap).

| renderer RSS peak | consort phase | maid phase | verdict |
|---|---|---|---|
| LIVE b1033eb0, old scan | 12.5 GB | 6.2 GB | fits barely |
| branch 3217d3b7, old scan (LANDER #2b) | OOM 13.7 GB | — | crash |
| LIVE b1033eb0, new scan | ≤ 4.6 GB | 5.0 GB | ALL PASS-equivalent rows |
| branch 3217d3b7, new scan | 4.6 GB | ≤ 6.9 GB (a co-op test ran in parallel; RSS sum of all renderers) | fits, ~2× margin |
Run time unchanged (~10–11 min).

### Branch
- e3b3f02c scan fix · 2fb20b7d merge LIVE **56ff0db0** (conflicts index.html/sw.js only → rebuilt with build_site.sh) · d4c723d4 test `dev/test/coop-places.js` (test-only; game build = 2fb20b7d).
- Game code diff vs LIVE = the r1 PASS diff only (jplx.js nth/pd, jact.js glyphs). No BAL, save, co-op or time code.

### Gates on d4c723d4 (this box)
- quickcheck `--runs 7` PASS: core gates, time-spill, old save ok, perf median new/live render 254/245 ms, tab 434/405, buổi 1122/1081 ms, tasks>200 ms 18/18.
- undef-scan PASS (257 names). role-parity.test.js ALL PASS (new scan). coop-e2e PASS 92/92.
- CO-OP GATE (new) `node dev/test/coop-places.js <worker> 9 0` 18/18 (host-first, host Fold / guest iPad) and `… 9 1` 18/18 (SWAP: devices swapped, guest walks first): both seats walk to nth and pd (guest = intent F2 goTo run on the host in her context), meet the keeper, host's copy of her = her phone (place + people), her walk never moves the host's own place/visit/khắc/buổi, Dư đồ count same on both seats, Đáp ứng refused at nth on both seats with the same reason, 0 page errors.
- Shots (kit stage, no private part), looked at: CDN `img/_review/map-places-r2/` clean-fold-nth.jpg, clean-fold-pd.jpg, clean-ipad-nth.jpg, clean-ipad-pd.jpg (755x1000@2, 1180x820@2; no horizontal overflow, 0 page errors). Keepers show the kit's grey stand-in figure (no portrait yet; ART REQUEST of r1 stands).

### Notes for the reviewer / B (not fixed here, outside the job)
- Pre-existing co-op asymmetry, same on the OLD place tgk (control run `PLACES=tgk`): when both stand in one place, the host's visit list gains her name but her phone's visit list does not list the host. Not from map-places; for the co-op lane.
- The maid phase still runs as one task (peak 5–7 GB); if more servant places come, split it the same way.
SẴN SÀNG KIỂM map-places-r2 d4c723d4 (BIG: core-loop memory + test harness).

## REVIEW r2 (opus BIG) — reviewer session_01N1tNP6yVqCugi1vTEyrEka, 21/11 — PASS 688a5667 (review/map-places-r2-r1 = d4c723d4 + merges of LIVE 8b2e344d, 2021e23f, 686807ef; only index.html/sw.js conflicted, rebuilt with build_site.sh; assets.json left as main)
PRIORITY #1 CHECK ('map-places memory OOM consort role-parity'): OD 0 | ledger 0 | claims 0 (own row) | main 0 | review/* 0 | archive 0 — brief and worker report both carry it.
Diff vs LIVE 686807ef = jplx.js + jact.js (r1 PASS game diff, unchanged), dev/tools/role-parity-scan.js (scan fix), dev/test/places-d42.js, dev/test/coop-places.js, built files. No BAL, save, co-op or time code.

### Worker claim checked independently (renderer RSS from /proc, CDP DOM counters + JS heap after GC; same box 15 GB)
| probe (800 goTo+render, consort ranks cycling) | LIVE main 8b2e344d (18 places) | branch 923a2290 (20 places) |
|---|---|---|
| real play: each goTo its own task, 30 ms gap | RSS 268→472 MB, heap 40 MB, DOM nodes ~17 k flat | RSS 248→463 MB, heap 39 MB, DOM ~21 k flat |
| ONE task (as the old scan): peak RSS during the task | **12.5 GB** | **12.0 GB** |
| same, after the task ends (timers run) | 436 MB | 411 MB |
| old scan (main's role-parity-scan.js), consort phase | peak 12.8 GB | (OOM 13.7 GB per LANDER #2b) |
| new scan (one page per consort role), whole test | — | peak 7.0 GB (maid phase), ALL PASS |
→ Confirmed: no game leak; the peak is transient memory the game frees in its deferred timers, which never run inside one synchronous evaluate. nth/pd add nothing per goTo. Scan fix is the right fix.

### Does the scan fix hide gaps? (old scan vs new scan, both on LIVE main 8b2e344d, --json)
- Gaps: old 13 = new 13, identical set (0 lost, 0 new). Rows 237 = 237.
- 34 cell changes, none touching a gap: 27 '—'→EXEMPT and 5 EXEMPT→'—' (exempt player-only labels whose condition hung on the world left by earlier roles: «Chọn làm cung nữ thân cận» t2–t4, «Mắng cung nữ» / «Đập đồ» hh lost; «Đàn hát tự thưởng», «Đến gặp …», «Nghe lén» gained); 2 N·draw→NUM (cx4:rougeBorrow t2/t3: player row found). EXEMPT cells carry no parity requirement, so no gap can hide there.
- The 2 old hh gaps «cx2:chest / cx4:rougeSteal» the worker saw 'gone': on b1033eb0 (before main's chest-direct probe 91216b96/56ff0db0) the hh probe ran LAST in one page, after t1..t7 had moved the seeded day plan so every palace owner was home → no chest person → N-ONLY. In a fresh page per role the hh probe starts from the seeded world where an owner is away. On current main both scans also ask every chest directly (chest-direct), so the row is covered either way; the card has no rank gate. Real access, not a hidden gap.

### Gates on 688a5667 (this box)
- quickcheck --runs 7 PASS (core gates, time-spill, old save loads + plays a buổi, perf new/live render 210/240 ms, tab 424/445, buổi 1183/1253, tasks>200 ms 19/20). Earlier merges: 923a2290 PASS, 853159b6 PASS.
- undef-scan PASS (257 names). role-parity.test.js ALL PASS on 688a5667 (and on 853159b6, 923a2290).
- coop-e2e 92/92 on 688a5667 and on 853159b6 (each run alone; a run in parallel with role-parity gave 90/92 = guest Thái hậu picture not loaded yet under CPU load, not from this diff — rerun alone 92/92). Kit-only chain 686807ef touches no co-op code.
- CO-OP GATE coop-places.js: host-first 18/18 and SWAP 18–19/19 on every merge (923a2290, 853159b6, 688a5667): both seats walk to nth and pd, meet the keeper, same Dư đồ count, the guest's walk never moves the host's place/visit/khắc/buổi, Đáp ứng refused at nth on both seats with the same reason, 0 page errors. Law 1 for the feature: holds both ways.
- Shots looked at (scratch only, not in git): Fold 755x1000@2 + iPad 1180x820@2, nth + pd stage: kit stage, title «Ngự thiện phòng» / «Phật đường» readable, keeper name plate under the kit grey stand-in figure, no horizontal overflow, 0 page errors. (places-d42.js shots are covered by its own rank-up modals — test harness only.)
- Laws: 1 (feature two-way: yes, see co-op gate) · 4 (no new number; rank gate r>=2 copies the existing ACC_ROLE literal pattern — same note as r1, whole access family, not this branch's) · 6b keepers are fixed place people; servants not sampled (ledger rows = follow-up) · 7 wording cổ trang, no % · 9 kit only, stand-in pictures tạm, KIT_REQUESTS place-nth/place-pd · 11 scan fix covers the whole consort phase; maid phase still one page (peak 5–7 GB, note kept).

### Pre-existing co-op presence bug (not from this branch) — decided: does NOT break law 1, filed GAP_LIST OD-CO1
Measured: the friend who ARRIVES SECOND at a place does not see the friend already standing there; the one already there does see the arrival. Host-first: host lists her, her phone misses the host; SWAP (guest first): her phone lists the host, the host misses her. Same on the old place tgk on LIVE 8b2e344d (control PLACES=tgk, both orders). It is seat-symmetric (each seat can and cannot equally), so it is not a law-1 two-way break between seats; it is a real-people / co-op visibility bug for the co-op lane (GAP_LIST.md row OD-CO1, B build). The worker's note described only the host-first half.

PASS 688a5667 (contains LIVE 686807ef). Landing: ff main to 688a5667 if main has not moved; else re-merge (index.html/sw.js rebuild only).
