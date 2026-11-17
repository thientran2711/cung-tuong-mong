# review/staff-root — STAFF ROOT + CAPS DOWN (Foreman B worker, opus)

SẴN SÀNG KIỂM review/staff-root e0431afa (base = origin/main 9391f9a9 merged; coop-e2e 62/62 + coop-one-world PASS + staff-root 12/12 re-run after the merge).

PRIORITY #1 CHECK ('promo.cap|capOf|staff-cap|staff root|servant cap'): OD 5 (L1133, L1155, L1317, L1497, L1549) | ledger 0 | main: capOf j10.js:5 + wrappers jpromo.js:37, jstaff.js:27; readers j10:15/59, j15:53, j29:30/37, j72:313, jpromo:55, jpromsv:45, jstaff:39 | review/*: elder-staff(-r1) (on main), residence-seats (Foreman D, residents not servants; only shared file jbal.js, different lines) | claims: staff-root = this worker. REUSED the existing table BAL.promo.cap (no new table, no history study).

START_CTX ~8 %.

## ROOT (OD 02:45Z/02:50Z, reproduced in a real build before the fix)
Owner case = origin `cn` "Cung nữ được sủng hạnh" (starts at rank 1 Thường tại). Repro (Playwright, new game, her room): stage = close maid + **Tống ma ma (elder)** + 1 maid + 1 eunuch → "Ở đây còn 4 người". Exactly her screenshot.
- (a) TWO tables: j10 `capOf` had a private table ([1,1]/[2,1]/[3,2]/[4,2]) for NPCs; jpromo wrapped capOf to return BAL.promo.cap only for HER ([2,1] at Thường tại = close maid + 1 maid + 1 eunuch); jstaff wrapped it again for Thái hậu ([4,2] typed). → ONE helper: `capOf(p)` in j10 reads BAL.promo.cap for her AND every NPC (cold palace = row 0; servant road = no household; Thái hậu = BAL.promo.capTh). Both wrappers deleted.
- (b) close maid "+1": RULE (stated): the table's maid number INCLUDES the personal (close) maid (S.maid; an NPC's own maid), counted once, in ONE place: `hhHas(p)` = [maids in staff + 1, eunuchs]. Every reader uses it (8 private "length+1" copies removed).
- (c) the ma ma = jstaff's Giáo tập ma ma (tutorial guide, Thái hậu's household) put on her room stage while S.turn<=4, by THREE copies of the rule (jstaff addStage, j95 record x2). → ONE rule `gtAtHome()` (BAL.staff.gtDays); she teaches new tú nữ only: never in the room of a former palace maid (origin cn, or risen from the servant road). Other origins: she still visits in the first days (labelled "Giáo tập ma ma Trữ Tú cung", not hers).
- (d) other residents' staff shown as hers: NO — the home stage only draws S.staff (j95 hsvPerson / jhouse); checked in the test (foreign = 0).

## CAPS DOWN (one table, BAL.promo.cap = [maids incl. personal maid, eunuchs])
| rank | before HER (BAL.promo.cap) | before NPC (j10 private) | AFTER (her + NPC) | total after |
|---|---|---|---|---|
| 0 Đáp ứng | [1,1] = 2 | [1,1] = 2 | [1,0] | 1 (her close maid) |
| 1 Thường tại | [2,1] = 3 | [1,1] = 2 | [2,0] | 2 |
| 2 Quý nhân | [2,2] = 4 | [1,1] = 2 | [2,1] | 3 |
| 3 Tần | [3,2] = 5 | [1,1] = 2 | [2,1] | 3 |
| 4 Phi | [3,3] = 6 | [2,1] = 3 | [3,1] | 4 |
| 5 Quý phi | [4,3] = 7 | [3,2] = 5 | [3,2] | 5 |
| 6 Hoàng quý phi | [4,4] = 8 | [3,2] = 5 | [4,2] | 6 |
| 7 Hoàng hậu | [5,4] = 9 | [4,2] = 6 | [4,2] | 6 |
| cold palace | rank row | rank row | row 0 [1,0] | 1 |
| Thái hậu | [4,2] typed in jstaff | — | BAL.promo.capTh [4,2] | 6 |
Lowest rank = 1 servant (her own maid); low ranks keep no eunuch; rises gently; chủ vị (Tần–Quý phi) 3–5; top 6 (OD:L1155: 9 was too many). Promotion gives a new servant only where the table rises (promo-rules test updated to the gentle table).

## OLD SAVES / DEMOTION (j10 capTrim + capSweep)
Over the table (old save on load, demotion, cold palace): Nội vụ phủ takes the extras back — least trusted first; her eyes and ears / lovers last; never the personal maid, a named palace woman (eid) or a co-op guest's servant; face identity freed. HER servant with loyalty >= BAL.promo.trimTrust (70) leaves with a farewell scene (existing Q modal, figure = pServ), others with one log line. NPCs: data only. Runs on load (staffInit), every render and buổi (jpromo wrappers) and month end; host only (co-op guest skips: households are world keys). Also j14 (an NPC buying a servant) and the j6 hire path now respect the cap.

## FAMILY SCAN (LUẬT SỬA CẢ NHÓM) — before/after
| place | before | after |
|---|---|---|
| j10 capOf | private table | reads BAL.promo.cap |
| jpromo:37 capOf wrapper (her only) | override | deleted |
| jstaff:27 capOf wrapper (Thái hậu [4,2]) | typed | deleted → BAL.promo.capTh |
| j10 fillStaff / staffHTML, j29 fillStaff / hire, j15 staffTabHTML, j72 capOk, jpromsv spGoTo, jpromo prStaff, jstaff fitCap | own "length+1" count each | hhHas() |
| j6 hire (old path) | no cap check | cap checked |
| j14 NPC buys a servant | no cap check | buyer must be under cap |
| j10 plantServ (spy planted into a household) | pushed over the cap | the plant takes the place of the least trusted servant (capTrim(t, plant)) |
| jstaff masterFor (Quản sự ma ma follows the queen) | stayed with a queen in the cold palace (bot found: cold household [2,0] > [1,0]) | a queen in the cold palace keeps no palace office: back to Thái hậu |
| Giáo tập ma ma at home: jstaff addStage, j95 vis, j95 elderK | 3 copies of "turn<=4" | gtAtHome() + BAL.staff.gtDays |
Scan (in dev/test/staff-root.js): no `return r>=7?[..]` table, no `capOf=function` wrapper, no `role==="maid").length+1` outside j10 hhHas — 0 hits.

## TESTS
Static: dev/test/one-core-guard.js PASS (0 fails, no --allow-grow; inline 6671 <= baseline 6691; new keys BAL.promo.capTh, BAL.promo.trimTrust, BAL.staff.gtDays).
- dev/test/staff-root.js (NEW) 12/12: no private table/wrapper/+1 · cn origin Thường tại room = close maid + her table (no eunuch, no ma ma, no foreign servants) · every NPC capOf = its BAL row, within it · Thái hậu capTh · old save with old big households trimmed (trusted one = farewell scene, personal maid kept) · NPC old household trimmed · trusted-only farewell · demotion Phi→Thường tại trimmed · hire refused at cap · NPC queen to cold palace: Quản sự ma ma back to Thái hậu at once · servant road: no household · 0 page errors.
- promo-rules 17/17 (with origin/main as OLD build: old save loads silently) — test updated: promotes across a step where the table rises (some steps are flat now).
- promote-servants 20/20 — fixture updated (its 2 maids + 1 eunuch are built at Phi, where the table holds them; old save from origin/main loads).
- elder-staff PASS · promo-next-rank exit 0 · seatcap-oldsave ok · cmaid-unit exit 0 · stipend exit 0 · mem-upgrade exit 0.
- CO-OP: coop-e2e 60/60 (assemble first, utf-8 serve) · coop-one-world PASS. Households are world keys: capSweep runs on the host only (guest skips), so both players read the same host-computed household.
- house-stage: the SAME checks fail on origin/main and on this branch ("her shown 12x", "household member not shown once", "tap did not open his card") — pre-existing, stale test; not caused here.
- mline-oldsave (origin/main save → this build, 3 months) ok, 0 errors.
- quickcheck: open OK · old save from the live build loads and plays OK · perf (median of 3, new/live) render 329/316 ms, tab 391/363, buổi 1070/1127, tasks>200ms 16/15 · core gates PASS. Its only FAIL = "NOT BUILT" (index.html not rebuilt on this branch): left for the merge batch (the batch builder rebuilds the site after merges; a built index.html here would conflict with every other branch).
- Shots (scratch only, looked at): Fold 755x1000 + iPad 1180x820 — her room "Ở đây còn 2 người" (close maid + 1 maid), Cung nhân tab "Cung ta" = 2, "Thêm thái giám: đủ số theo phẩm". No new UI part (farewell = the existing Q modal + pServ figure): KIT FIRST kept.

## BOT MEASURE (before = origin/main 6c4f21c3 build, after = this branch)
Probe = every household (hers + every live NPC consort) vs its own build's capOf: maids incl. personal maid <= cap[0], eunuchs <= cap[1].
| measure | before | after |
|---|---|---|
| month loop (dev/measure/staff-month.js, 36 lives x 12 y, 8 origins + servant road, her rank shuffled yearly incl. cold palace), checks after every month | 4103 over-cap / 37908 checks (her 1007); max seen [7,5] maids/eunuchs at rank 7, [4,6] at Đáp ứng | **0 / 46048**; max per rank = the table exactly ([1,0] [2,0] [2,1] [2,1] [3,1] [3,2] [4,2] [4,2], cold [1,0]) |
| play bot (dev/measure/staff-bots.js = inpage6 sensible, all 8 origins), check at every buổi end | 16 lives: 17400 over / 18817 checks | final build 8 lives: **0 / 10947** (earlier run before the last two fixes, 15 lives: 165 over, all NPC cold-palace queen keeping her ma ma — fixed) |
| HH reach (play bot) | 19 % (3/16) | 33 % (5/15) then 50 % (4/8) — small n, noise; not lower |
| early death (play bot, dead < 5 y) | 19 % | 13 % / 13 % — noise |
| early death (month loop, dead < 5 y) | 13/36 | 11/36 — noise |
| servants in the palace (max) | 23–24 | 23–25 (bounded by the face pool either way) |
n = 36 (month loop, n>=30) per build for the cap check; the play bot is slow (~10–20 min a life) so its HH sample is small — HH/early death show no drop.

## Notes for Foreman B (not built, feature freeze)
- Pre-existing on main (old build too): the inpage6 palace bot gets STUCK on some dilemmas (e.g. "Lời cảnh báo" at home) — chooseM refuses the bot's answer, the life ends TIMEOUT at month 3–19. staff-bots.js drops such a dialog bot-side (counted as "unsticks", same on both builds). kchh.js / other inpage6 bots have the same problem.
- The face pool (roomFor) is often full: a new Thường tại may start with only her close maid (fillStaff finds no free face). Not changed.
