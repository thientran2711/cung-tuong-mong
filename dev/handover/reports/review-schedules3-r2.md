SẴN SÀNG KIỂM 4ea772f34089ca3355806790a7fd2e7afb375783
# review/schedules3-r2 — D29 fix pass 2 (worker for Foreman C)
Branch **review/schedules3-r2 @ 4ea772f3** = review/schedules3-r1 f74f95d3 + merge of origin/main **18fb8252** + fixes. Conflicts: assemble.py (kept
j95 order: jk95 after jk2b; j95, j95b, j95c, jqsave just before jkpc; added main's new jpdlg after jk4), index.html/sw.js (rebuilt with
dev/site/build_site.sh). Details: dev/PROGRESS_schedules3.md "Fix pass 2".

## Root cause (items 1–4) and the fix at the root
j95 reconciled the stage only inside its own goTo/sync. Main modules loaded after j95 (jact, jhouse, jkc, jtds, jwkpics) and older ones on other
paths (jstaff addStage, j22 men, jhouse coldVisit) add people later. Instead of chasing each path: **one final reconcile, outermost**
(`j95final`, installed with setTimeout 0 like j59's outermost countAt), run after goTo, spend, nextBuoi, endTurn, coldVisit, talk, closeModal,
chooseM and before every renderStage, plus `homePeople` wrapped last (her room stage and her room's map number). The record decides; the stage
follows; the map is the record count. It is off in co-op (j95on) and on a trip outside the palace (jkc). The bots stub renderStage, so the
data-path hooks are what the audit checks. The renderStage hook covers the real game.

## Fixes, item by item
| # | finding | cause | fix |
|---|---|---|---|
| 1 | "sổ có s2 ở lc mà sân khấu không vẽ" | test gap: the stage draws her servant as kind `serv`, and the audit only knew elder/npc | audit recognises `serv` (both ways). A drawn servant no longer in the record (sold, moved) now leaves the stage |
| 2a | "sổ có c:ped ở nvp mà sân khấu không vẽ" | test gap: kind `peddler` unknown to the audit | audit recognises `peddler` (both ways) |
| 2b | "đếm nvp: bản đồ 2 sổ 1" | seen while she was in **lãnh cung**: jact adds +1 to countAt("nvp") always, and j95 took it off only while the place exists | j95 countAt always takes jact's +1 off for nvp. `j95vis(c:ped,nvp)` needs `j95nvp()`. The c:ped record line follows `j95nvp()` from the current khắc on. One peddler entry (jact + j95stage check kind, j95dedupe) |
| 3 | home elder: map 2, record 1 | elder record line kept from the plan (eid given later / turn 4 passing / Thái hậu dying / her fall) while jstaff draws by the live rule | each sync re-applies the post rule `j95elderK` to every named elder from the current khắc on. The final reconcile (`j95elderFix`) makes stage + homePeople follow the record |
| 4 | vuon 3→5 (two men drawn, not counted) | j22 pushes men from a stale S.menW before the sync. A drawn man ABSENT from the record was never removed (guard `R.P[id]`) | a `man` entry not at this place in the record leaves the stage |
| new | audit (h) "câu chữ đặt v8 ở thu mà sổ ghi r5 (cấm túc)" ×2 | the same card placed a consort and then confined her; the record is right (h's rule: "or the record says why not") | audit counts these as `placeWhy`, not an error |
| new | audit reverse check | — | the audit now also flags a drawn man / named elder / her servant / the peddler whom the record puts elsewhere |
Also: dev/tools/roster.js c:ped rule matches (nvp only while the place exists).

## LUẬT SỬA CẢ NHÓM: family scan (every module that puts people on a stage or counts a place)
Script (in dev/build): grep per module for `people.push(`, `visit.people=`, `S.visit={`, `countAt=function`, `homePeople=function`, `renderStage=function`.
| module | what it does | before r2 | after r2 |
|---|---|---|---|
| j2/j3/j6/j9/j14/j41 | build S.visit (goTo, home, lãnh cung) | reconciled by j95 sync only on j95 paths | final reconcile after every path |
| j22 | men from S.menW on goTo | stale men could stay (item 4) | follow the record |
| j42 (maid road) | own stage rules, j59srvCount | own rules (main) | unchanged (j95srvStage) |
| jmen | officials on goTo | record has q:<office> | unchanged, covered |
| jres | residence filter | consistent | consistent |
| jsl / j95c | lãnh cung / load visits | partly | final reconcile |
| jplx | rest / punished / children places | record takes its lists | unchanged |
| jstaff | named elders (addStage, homePeople) | home elder vs record (item 3) | record follows the post rule; stage follows the record |
| jact | Nội vụ phủ place, eunuch, countAt +1 | +1 in lãnh cung (item 2b) | record count in every state |
| jkc | trip stages | — | skipped on purpose (own stage outside the palace) |
| jhouse | her household on her room / lãnh cung stage | hsvList filtered (r1) | + drawn servant not in record leaves |
| j59 | outermost countAt (own place = stage) | stage could differ | stage = record, so equal |
| jcoopworld | co-op | ledger off | unchanged |

## Tests (r2 build = main 18fb8252 + r1 + r2)
| test | plain merge (r1 + main 18fb8252, before r2) | after r2 |
|---|---|---|
| roster_audit sens 6 shard 0 (baseline probe) | 5 674 checks, **(c) 22** (nvp ×4, lc servant ×8 …) | 5 760 checks, all 0 |
| roster_audit **sens 18**, CAP 3300 | — | **16 477 checks, all (a)–(r) 0**; page err 0; J95/J95B errors 0; knownTgkElder 13 146 |
| roster_audit **rand 18, shard 4** | — | **8 436 checks, all 0**; page err 0; J95/J95B errors 0; knownTgkElder 6 111 |
| stage-counts.js ×3 | — | thd 147/147/150, cnv 66/71/63 walks, **0 mismatches**, 0 errors (×3; plus 2 earlier runs on intermediate builds: 0) |
| roster_dom 755x1000@2 | — | 20 moments, 0 bad, 0 page errors |
| roster_dom 1180x820@2 | — | 20 moments, 0 bad, 0 page errors |
| roster_dom maid road (ORIGIN=cnv) 755x1000@2 | — | 20 moments, 0 bad, 0 page errors |
| roster_oldsave (origin/main 18fb8252 save → r2) | — | loads at 755x1000 + 1180x820, record built on load, 47 checks, 0 bad, 0 errors |
| coop-e2e (live Worker) | — | **59/59** |
An intermediate r2 build gave sens 18 (a) 2 "cnv T18 thiếu m4" (the known maid→consort promotion moment, documented in PROGRESS) and (h) 2 (now
`placeWhy`). Neither showed in the final run. No new layout or UI in r2 (state only). The roster_dom shots at 755 showed the first-run download
cover over the stage (the test serves the root page); the DOM checks run under it.

## Ledger API changes (for Foreman B / D13): additive only, nothing removed or renamed
r1 (kept): `j95vis` for her household `s<sid>` at home/lc and `c:ped` at nvp; `j95hsv(id)`, `j95nvp()`; c:ped record at nvp while j95nvp();
countAt nvp correction; hsvList wrapped to the record; j95stage reconciles `serv` and `peddler`.
r2:
- NEW `j95final()` → true if the stage list changed. It already runs after goTo/spend/nextBuoi/endTurn/coldVisit/talk/closeModal/chooseM and
  before renderStage. A module that adds people to S.visit on its own path should call it (or just call renderStage).
- NEW `j95elderFix(list, place, R, kh)` → named elders on a stage list follow the record; `j95elderEntry(st)` builds jstaff's stage entry.
- `j95vis("c:ped","nvp")` also false when the place does not exist (`j95nvp()` false: lãnh cung, maid road).
- `countAt("nvp")` = record count in every state (jact's +1 taken off whenever jact is loaded).
- Record: named elders' and c:ped's now/later khắc are resynced each sync. The entry shape `[place, act, target, reason]` is unchanged.
- j95stage now removes a drawn `man` or `serv` entry absent from the record (before: only if present elsewhere).

## Open questions (unchanged)
- Q15 co-op ledger (off for guests; OD:L96 lists the ledger among shared world facts): owner decision.
- Q16 maid road cap of 4 consorts per place.
- jhouse vs jplx: servants resting at Dãy nhà cung nhân; on r1/r2 the record decides (the room stage shows only those it puts home). The
  servant-system owner should confirm.
- Main bugs, kept visible: jstaff draws the Đức Thọ cung elder at Tân Giả khố too (audit knownTgkElder); jmen's 3-buổi assumptions.
- KIT REQUEST K14 (two-shadows map mark, "N người theo hầu" tag line) still stands; nothing private drawn.
