# staff-cap-fix — SẴN SÀNG KIỂM (worker session_01UV1SziJshKyRMZV2hXkoFD, opened by MAIN s40)
PRIORITY #1 CHECK: OD 5 (promo.cap rows, staff-root) | main dev/build/j10.js capOf/hhHas/capTrim/capSweep, jpromo.js BAL.promo.cap/trimTrust, jstaff.js fitCap | review/* none | claims: staff-root (LIVE), staff-caps-count (DONE) — reused, no new table.

Branch `review/staff-cap-fix` from origin/main eb3675a. Commits: 931fb00 (code + tests), **a2389cc** (site rebuilt). Quickcheck a2389cc PASS (open 1276 ms, old save ok, core gates PASS, render 134/146, buổi 664/794 new/live).

## Root cause (owner 18/11: life 1 saw "Nội vụ phủ điều người", life 2 keeps 2 cung nữ and saw nothing)
1. capTrim told her ONLY about trusted servants (loyal ≥ trimTrust 70: farewell popup); every other removal was one LOG line → she never saw it (life 1 = a trusted eunuch after a demotion; same trims with an untrusted servant were silent).
2. A servant coming home (`srvHome`, co-op settle) and `stay` (a plant) were never sent away: alone over the table she stayed there forever (bot: 31 and 48 months over the table in 2 lives).
3. jstaff fitCap was a second trim with its own order and only a log line.
4. cold(): kept 1 trusted servant, then capSweep removed her with a "theo phẩm vị" farewell right after the cold-palace popup said she stayed.
5. hireCard's pick did not re-check the table.

## One rule now (j10)
The household never stays over BAL.promo.cap: every servant counts; Nội vụ phủ sends the least trusted first; spies of hers, lovers, a servant coming home, a just-placed one go last but DO go when nobody else can (arrival refused). Only the personal maid, a named palace woman (eid) and a co-op player's servant cannot be moved. Every removal from HER household is told: trusted = farewell scene (unchanged), others = ONE grouped `kitPanel({kind:"notice"})` per trim, facts printed from the table (`capLaw`: "Phẩm Đáp ứng theo lệ giữ 1 cung nữ (kể cả cung nữ thân tín), không có thái giám."). `capRoom` refuses a plant into a household that cannot take one. fitCap = capTrim. cold() keeps per row 0 and names who leaves. Numbers only from BAL (capOf). NPC households: data only, same rule.

## Scan table (dev/test/staff-cap.js, 27 PASS; before = origin/main behaviour)
| arrival path | before | after (untrusted / trusted) |
|---|---|---|
| start kit, every origin, new life after a big household | within table | within table |
| demotion Thường tại→Đáp ứng / Quý nhân→Đáp ứng (life-1 case) | trimmed; untrusted = log only | trimmed at once; grouped notice / farewell |
| old save load over the table | trimmed on render; untrusted = log only | trimmed once; grouped notice / farewell |
| servant coming home (co-op settle) alone | stays over the table forever, silent | she goes; told |
| coming home + one ordinary | ordinary goes, log only | ordinary goes, told; she stays |
| old close maid joins (jcmaid cmTdTake) | trimmed, untrusted silent | trimmed, told |
| named woman arrives (jstaff fitCap) | own trim, log only | capTrim, told; ma ma stays |
| co-op player servant | counts; ordinary goes, silent | counts; ordinary goes, told |
| cold palace | keeps 1, then popped away "theo phẩm vị" | keeps per row 0, names in the cold popup, no 2nd popup |
| plant into a full Đáp ứng | plant stays over the table until next sweep, then silent | refused (plant fails) |
| plant into Thường tại with one ordinary | ordinary goes, silent | ordinary goes, told |
| hire at the cap | button refused; pick not re-checked | both refused |
| NPC households | over with home/stay | within the table |
Bot (9 origins, 30 months, demotions + returns, probe in scratch): before 31/48 months over the table, 2/4 removals told; after 0 months over, 7/7 told.

## Tests
- `node dev/test/staff-cap.js` ALL PASS (27). `node dev/test/staff-root.js` 16/16 (its "coming home alone stays over" case changed to the new rule; one earlier run failed on a random visitor in her room count = pre-existing flake, 2 reruns PASS).
- `dev/test/elder-staff.js` could not run here (its own page load times out on both http.server roots; harness issue, untouched code path covered by staff-root queen→cold case).
- Shots (Fold 755x1000@2, iPad 1180x820@2): https://ctm-img.victoria-tntt.workers.dev/img/_review/staff-cap-fix/fold-group.webp · fold-farewell.webp · ipad-group.webp · ipad-farewell.webp. Group notice = kit T1 BÁO panel. Note: the farewell (legacy Q, unchanged) shows the person picture slot empty while portraits load in host mode.

## Open for main
- Wording of the grouped notice (VANPHONG) for the reviewer: title "Nội vụ phủ điều người", sub "Định lại kẻ hầu theo phẩm vị", facts = capLaw + "<names> (đều) được điều sang hầu nơi khác."

## HANDOVER (rollover 18/11 ~01:15Z; worker context past START+25 %) — successor opened by MAIN s41
Done + pushed: review/staff-cap-fix a2389cc (the TRIM/NOTICE rule; independent of the cap numbers — it reads BAL.promo.cap, so any table D1/D2/D3/B2 drops in by editing that one row set in dev/build/jpromo.js + capTh).
Suspects a–d verified (MAIN s40 msg 1): (a) home/stay over cap forever = REAL → fixed; eid/coop stay exempt but counted. (b) untrusted log-only = REAL → fixed (grouped kit notice). (c) monthly-only = NOT real (capSweep on every render + every buổi). (d) new life skips sweep = NOT real (start() refills via fillStaff within the table; staff-cap.js 'new life' case PASS).
OWED (messages 2–8 from MAIN s40/s41, not started — apply HELD until the owner picks):
1. Measurement table with review/staff-caps-count b6166003 dev/measure/staff-caps-count.js (start/+2y/+5y): tables A (live), B2, D1 (ĐƯ1+0 TT1+0 QN2+0 Tần2+0 Phi2+1 QP3+1 HQP3+1 HH4+1, TH 3+1 ma ma), D2 (D1 with QP3+0), D3 (D1 with TH 2+1 ma ma), one 'low-rank 1 each' table, + one own proposal landing 25–27 at start AND +5y; full-palace (16 and 20 chủ vị per OD 17/11 04:32Z seats HH1/HQP1/QP1/Phi2/Tần3 — state which) and 12 chủ vị maxima.
2. Perf at each max (Fold profile 755x1000, CPU 4× throttle): monthTick / buổi step / room render ms, memory MB, vs live; also the 'only thân cận + standouts run a full brain' option. Read OD L1784 verbatim.
3. Co-op at each max: host cost, sync bytes per buổi/week (seat delta, world merge), step time both seats.
4. After she picks: apply table in BAL only + align every printed/assumed cap (promo-rules '+1 servant per rank' texts, Nội vụ phủ texts, NPC seeding, roomFor face pool) + full tests + coop-e2e + old-save load.
Tests to reuse: dev/test/staff-cap.js (27), dev/test/staff-root.js (16). elder-staff.js harness times out in host mode (pre-existing).
