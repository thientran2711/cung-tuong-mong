# PROGRESS: review/people-ledger — PEOPLE LEDGER (owner core law 16/11 13:40Z + 13:50Z s17; FOREMAN_C 13:55Z / 14:15Z)

Owner words: dev/OWNER_DECISIONS.md (docs branch) 16/11 13:40Z, 13:42Z, 13:50Z s17 (2); OD:L34 (one location ledger S.roster).
Branch from review/schedules3-r4 (D29 fix pass 4). Everything goes through the ONE record (S.roster, j95); no second ledger.

## Done (j95.js, appended sections "PEOPLE LEDGER" and "FIXED SCHEDULE")
1. **Every person is a shadow where the record puts them NOW** (consort road): `j95vis` counts everyone in the record at a place except
   her own party (`j95party`: herself; her trusted maid walking with her away from home). Before, consorts' servants and maids, other
   children, elders off-post, Tổng quản, the Emperor at Dưỡng Hòa điện when Sủng < 50, house-mates at her palace … were in the record but
   not counted. `j95arrKh` answers the CURRENT khắc while the ledger is on, so the places' counts add up to the record at one moment
   (before: each place used its own arrival khắc → one person could be counted at two places or none).
2. **One source for every count**: an outermost `countAt` (setTimeout, registered last) returns the record count; jplx's own list count at
   Dãy nhà cung nhân / Tân Giả khố / schools (+1 elder at Tân Giả khố = the known main bug "knownTgkElder") and jact's Nội vụ phủ +1 no
   longer bypass it.
3. **The stage = the record at her place**: `j95ledStage` (run inside j95final) adds everyone the record puts here who is not drawn,
   with existing kit stage kinds only (rival/hh/fallen/emp/th/maid/serv/npc/kid/ty/ksp/peddler/elder; others' servants and maids =
   jplx's `npc` kind), drops anyone the record puts elsewhere, one figure per person (`j95ledId` maps a stage entry to its record id).
   j59 pages a crowd. No new visual part, no CSS.
4. **No orders to other people's servants / children** on her stage (talkOpts returns no acts for them).
5. **Fixed calendar** (no random presence): the planner (j95week, j95plan, j95planRival/Other/Emp/TH) draws from a generator seeded by
   the life (`S.j95seed`, saved) + buổi key (+ person) → the same buổi always has the same schedule, however often it is computed
   (newcomers, reloads, dev tool). Habits / intentions / surprises keep their reasons. Switch `J95.cal=false`.
6. Switches for measuring: `J95.led=false` (old rule), `J95.cal=false` (old dice).

## Audit tool
`node dev/test/ledger_shadows.js <page URL> [moments] [WxH] [origin]` — every map spot (open buttons data-go AND closed spots data-ak)
vs the record at the current khắc: hidden / extra / counted twice / place missing from the map; stage at her place vs the record there.

| run (consort road unless said) | moments | map sum | record | hidden | extra | twice | stage ≠ record |
|---|---|---|---|---|---|---|---|
| BEFORE (schedules3-r4), 1180x820 | 25 | 364* | 1503 | 409 (+755 at places not read) | 25 | 1 | – |
| AFTER, 1180x820 | 25 | 1462 | 1462 | 0 | 0 | 0 | – |
| AFTER + party rule, 1180x820 | 30 | 1711 | 1711 | 0 | 0 | 0 | 0 |
| AFTER, maid road (cnv) 1180x820 | 25 | 720 | 1433 | many | many | 1 | 12 (see open 1) |
*before: closed spots (data-ak) were not read by the first tool version; the hidden list is the real gap.

## Stage 3 (successor worker, 16/11 16:05Z–, START_CTX ~4 % of the window)
7. **Maid road (cnv) under the same one-record rule** (OPEN 1): `j95led()` is on for both roads. Her room = the servants' room of her
   mistress's palace (`j95lk`: record "home" ≡ palaceOf(mistress), one map place; `j95at` matches places). The stage adds everyone the record
   puts there with the maid road's own talk entries (`kind:"srv"`, sk hh/mis/rv/sv/emp/ty/man, j42 shapes) — the caps (4 consorts, only the
   mistress at home, 4 servants) are gone (j59 pages a crowd); others (consort maids, elders, children, posts, officials) use the kit kinds
   and get no orders (talkOpts []). `j95ledId` maps srv entries. Map count = the record.
8. **Set hours + morning court** (OPEN 3): jmen's fixed schedule `menSched()` (duty rosters, work orders, festivals, visits, officials'
   roster `menMinW`) now runs on BOTH roads (`menSchedRoad()`); the maid road no longer rolls j22's dice (`roll(55)` + random haunt).
   4-buổi fix (jtime4 rule "old buổi 2 = tối"): night = `B4L` (physician off duty, prince/envoy not at festivals at night), trysts at night,
   letter shifts `[B4L,2,1,0]`, physician summons in the afternoon (old buổi 1 = 2). Morning court: `BAL.led.court` (2) first khắc of buổi
   sáng Hoàng thượng is at Cần Chính điện (thu), no dice, no surprise (`J95.court` switch). j95 reads the schedule on both roads (`j95ms`).
9. **RULE CONFLICT switch** (OPEN 2): `BAL.led.cnt` = "now" (owner 13:50Z, default) | "arrive" (main's stage-counts) — one place, read by
   `j95cntNow()` (j95arrKh + the outermost countAt). QUESTION FOR MAIN written in dev/handover/reports/review-people-ledger.md.
10. **Stage title count**: j59 `kitHereMsg` also rewrites the leading "Ở đây còn N người." of a longer line (was "còn 1 người" with 11 there
    when the record brought people in after the line was written).
11. **One id style** (OPEN 5): `ledgerId(p)` (j95) = the record id of any person; Foreman D's jmem `mk()` / jil `ilKey()` key consorts by bare
    id ("3" vs record "v3"; ilKey returns "" for consort id 0) → they should call `ledgerId`. Neither keeps a second people/place list.

## Tests (stage 3)
| test | result |
|---|---|
| ledger_shadows consort 1180x820, 30 moments | map 1664 = record 1664, hidden/extra/twice/offmap/stage/title 0, page err 0 |
| ledger_shadows maid road 755x1000, 30 | BEFORE 711 vs 1397 (25 moments, every moment bad) → AFTER 1625 = 1625, all 0 |
| ledger_hours consort, 3×60 + 40 moments | court 48/48 ok; men/officials faults 0 (one secret-meeting guard now counted as a planned reason) |
| ledger_hours maid road, 40 | BEFORE: 129 men inside without a reason (j22 dice), physician inside at night 11, roster officials missing → AFTER 0 |
| stage-counts (main) with BAL.led.cnt="arrive" | thd 156 / cnv 72 walks, mismatches 0 (with "now": only the walk's khắc shift) |
| roster_oldsave main→this, previous branch→this, maid-road save | load 755x1000 + 1180x820, record on load, 0 bad, 0 errors |
| ledger_stage (host mode) fold, ipadAir, ipadPro, foldLand, iphone14 × both roads | stage = record = title, no overflow, no page error |
| roster_audit sens 18 / rand 18 / coop-e2e | see the report |

## OPEN
- KIT REQUEST K14 (two-shadows map mark, "N người theo hầu") still at the kit keeper.
- Crowded stages: Fold portrait pages 2 figures + "+N" chip (kit j59) — kit keeper may want a denser page for 15+ people.

## Handover
Successor: read this file + dev/handover/reports/review-people-ledger.md (docs branch).
