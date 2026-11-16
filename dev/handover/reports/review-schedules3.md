# review/schedules3 (D29, Foreman C) — finishing worker report
Verdict: **SẴN SÀNG KIỂM** · sha **9b1d82fa** · origin/main 0a311183 merged (load order kept: jk95 after jk2b; j95, j95b, j95c, jqsave just before jkpc, last) · site rebuilt.
Details + ledger API: dev/PROGRESS_schedules3.md (section "Finishing pass").

## What the merged-build audit found, and the fixes (all in j95/j95b files or tests; no main module edited)
- Named elders (jstaff): counted only where jstaff draws them (gt elder after turn 4 was counted at Đức Thọ cung, never drawn).
- jplx places, one ledger: record takes jplx's lists (servants resting at Dãy nhà cung nhân / punished at Tân Giả khố, children 6+ at Thượng thư phòng / A ca sở / Đông cung, fixtures Quản sự Tân Giả khố + Thầy dạy), resynced every khắc; stage at those places refilled from the lists.
- jplx×jstaff overlaps reconciled in j95 (one person, one place): rest list never takes a named elder, a punished maid, or her trusted maid at night; punished list never takes a named elder.
- Birth mid-buổi: shown khắc not rewritten; newborn joins her home stage.
- Motive gate family: j83 wkGive / wkPoison (NPC handmade works) gated like runAct; PEND scan (26 consort cards) → tsbFirst, rcpacc declared.
- Text scan ignores jstaff titles ("Quản sự ma ma Càn Ninh cung" placed a confined consort at Càn Ninh cung).
- Tests: oldsave/roster_dom start with `__nlInner` (main start() otherwise opens the next-life flow, nothing saved); maid-road rules (stage-counts covers its map; stage cap); audit/roster.js know elders, npc and fixture entries.

## Tests (merged build)
| test | result |
|---|---|
| roster_audit sens 18, CAP=3300 | 17 498 checks; all 0 except (c) 2 (one moment, open 1); page err 0; J95/J95B err 0 |
| roster_audit rand 18, shard 4 | 9 248 checks; all 0; page err 0 |
| roster_oldsave (main save → this build) | loads 755x1000 + 1180x820, record built on load, 12 buổi clean, 0 errors |
| stage-counts.js | thd 139 / cnv 62, 0 mismatches |
| roster_dom 20 moments | 755x1000 0 bad · 1180x820 0 bad · 755x1000 maid road 0 bad · 0 page err · no overflow |
| rotate prompt, built root, iPhone 390x844 host (device.js of review/ua-test-r1) | "Xoay ngang điện thoại để chơi" shown, frame 1180x820, 0 errors |
| person card "Thói quen" 755x1000 (screenshot looked at) | kit rows only, end of right column (kit sticky tab bar must stay first) |

## Remaining
1. 1 moment / 36 lives: walking to Đức Thọ cung drew Thái hậu without her Chưởng sự cô cô (jstaff stage hook missed on that path; record right).
2. Known main bug kept visible (audit `knownTgkElder`, roster_dom `known`): jstaff draws the Đức Thọ cung elder at Tân Giả khố too, on BOTH roads (map there = record + 1). For session 8, with jmen 3-buổi assumption.
3. jplx/jstaff owners may prefer fixing the overlaps at source (j95 wraps plxServants / plxTgk meanwhile).
4. KIT REQUESTs unchanged (map two-shadows mark, stage "N người theo hầu" line, confirm jk95 sections).
