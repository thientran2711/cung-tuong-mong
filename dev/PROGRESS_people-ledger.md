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
| BEFORE (schedules3-r4), 1180x820 | 25 | 364* | 1503 | 434 | 25 | 1 | – |
| AFTER, 1180x820 | 25 | 1462 | 1462 | 0 | 0 | 0 | – |
| AFTER + party rule, 1180x820 | 30 | 1711 | 1711 | 0 | 0 | 0 | 0 |
| AFTER, maid road (cnv) 1180x820 | 25 | 720 | 1433 | many | many | 1 | 12 (see open 1) |
*before: closed spots (data-ak) were not read by the first tool version; the hidden list is the real gap.

## OPEN (next worker — Foreman C opens the successor)
1. **Maid road (cnv) not under the ledger yet** (LUẬT SỬA CẢ NHÓM: same law). Its stage has its own rules (j42 srvVisitOf, j95srvStage
   caps: 4 consorts, at home only the mistress; j59srvCount for the map). To do: `j95led()` true on the maid road too; `j95ledId` must map
   `srv` entries (ref consort → v<id>, ref servant → s<sid>, sk emp/th); drop the caps (j59 pages); map count = record. Measure with
   `ledger_shadows.js URL 25 1180x820 cnv`.
2. **RULE CONFLICT for Foreman C / main** (do not decide alone): main's dev/test/stage-counts.js (review/stage-slots) checks "map number
   before walking = people met on arrival" (arrival khắc). The owner's 13:50Z law needs the counts to add up at ONE moment (current khắc).
   People move between khắc, so both cannot hold. This branch follows the owner's newest law; stage-counts.js then reports mismatches that
   are only the khắc shift of the walk (ledger_shadows checks stage = record at arrival instead). Ask: OK to change stage-counts.js to
   "stage = record at arrival" + "map = record now"?
3. Outside men / officials "leave only at set hours", mandatory presence (morning court): not audited yet. Add to ledger_shadows: men
   (`m*`) and officials (`q:*`) change ngoai↔inside only at the khắc jmen / jtd set; at Sáng khắc 0–1 the Emperor + court officials at
   Cần Chính điện.
4. Not yet run on this branch: roster_audit sens/rand, roster_dom, oldsave, coop-e2e, Playwright shots at 755x1000 + 1180x820 (look at the
   crowded stage pages: Càn Ninh cung / Ngự hoa viên can hold 15+ people now).
5. Coordination: Foreman D's review/mem-upgrade (cause ledger) and review/item-ledger — not yet git-grepped for shared style. Rule for them:
   people/places only through S.roster (`j95bPut`, `whereOf`, `j95table`); no second people list.
6. KIT REQUEST K14 (two-shadows map mark, "N người theo hầu" tag) still pending at the kit keeper; nothing private drawn.

## Handover (worker rollover, owner 16/11 08:22Z s14)
Worker context reached its rollover line during stage 2. Branch review/people-ledger @ (see git log) is pushed and builds. Successor: read
this file + dev/handover/reports/review-schedules3-r4.md, then do OPEN 1 → 4 → 3 → 5, write dev/handover/reports/review-people-ledger.md
with first line "SẴN SÀNG KIỂM <sha>".
