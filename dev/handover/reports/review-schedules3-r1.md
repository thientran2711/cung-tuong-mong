FAIL
# review/schedules3-r1 — independent review of review/schedules3 @ 9b1d82fa (D29, Foreman C)
Reviewer branch: **review/schedules3-r1 @ f74f95d3ad15ee45f42626b8a550772bb3896037**. It is the merge of 9b1d82fa onto origin/main 399483e3, plus reviewer fixes. (origin/main has since moved to 18fb8252, so the worker must re-merge.)
Merge: the only real conflict was dev/build/assemble.py. Load order kept as the worker set it: jk95 after jk2b, and j95, j95b, j95c, jqsave just before jkpc. Main added jtds, jwkpics, jact, jkc and jhouse AFTER jkpc. They wrap countAt, goTo, places, homePeople, talkOpts, render and endTurn, so j95 is no longer the outermost wrapper. index.html, sw.js and assets.json were rebuilt with dev/site/build_site.sh.

## Why FAIL
The branch was clean on main 0a311183. On the latest main, two newly merged main modules break the "one ledger" rule (OD:L34: map, stage and record never contradict) and the bot audit is not clean (OD:L36):
- **jhouse** (servant-system) now draws every household servant on her room stage (and in lãnh cung). j95 neither counted them nor placed them, so stage-counts gave home 2→3, and audit (c) gave **8 924** (sens) and **1 089** (rand) on the plain merge.
- **jact** (Dư đồ Nội vụ phủ) adds a place `nvp` with a +1 for its eunuch. The eunuch is S.court.ped, who in the ledger wanders vuon/ksp/tyv: one person, two places.
I fixed most of this on r1 (see Fixes below). After the fixes, audit (c) is **447** (sens 18) and **32** (rand 18); every other invariant is 0. Not clean yet.

## Fix list for the worker (start from review/schedules3-r1, re-merge origin/main)
1. **Her servants in lãnh cung**: the audit reports "sổ có s1 ở lc mà sân khấu không vẽ" (life ch T13). The record puts her servant at lc, but the lãnh cung stage does not draw them. Look at the coldVisit order (jhouse appends hsvList in coldVisit; j95stage's lc branch); possibly V.k≠S.place when j95stage runs. One rule for both: the record decides, and the stage and map follow.
2. **Nội vụ phủ eunuch (c:ped @ nvp)**: (a) "sổ có c:ped ở nvp mà sân khấu không vẽ" (rand td T4, at goTo/spend), so some arrival path still misses him: find it, because j95stage's new nvp line does not run there; (b) "đếm nvp: bản đồ 2 sổ 1" while standing at nvp: the stage holds 2 (probably the eunuch twice, or someone the record lacks). Make sure exactly one peddler entry exists.
3. **Home elder (gt guide, turns ≤4)**: "đếm home: bản đồ 2 sổ 1 ids=me,mm:me stage=maid,elder". jstaff draws the elder at home but the record does not have her at home that khắc. This is the same family as your open item 1 (jstaff stage hook vs record). Fix it at the root.
4. **Intermittent**: stage-counts once (1 run in 4) gave `vuon 3→5 rival,man,man,rival,rival` (two jmen men drawn but not counted). I could not reproduce it in 3 further runs. Please check j95stage/j95dedupe against jmen's men on the stage.
5. Re-run the full set on the re-merged build and paste the table: roster_audit sens 18 + rand 18 shard 4 (all 0 except known tgk elder), stage-counts ×3, roster_dom 755/1180/cnv, roster_oldsave, coop-e2e.
6. Report every ledger API change for Foreman B (D13). See the next section for mine; please keep them.

## Ledger API changes made on r1 (for Foreman B / D13: additive only, nothing removed or renamed)
- `j95vis(id,k)`: also true for `s<sid>` of HER household at `home`/`lc` (jhouse), and for `c:ped` at `nvp`.
- New helpers `j95hsv(id)` (is this one of her household servants drawn by jhouse) and `j95nvp()` (does the Nội vụ phủ place exist with its eunuch).
- Record: `c:ped` = `["nvp","sell",null,"bày hàng mua từ ngoài cung ở Nội vụ phủ"]` every khắc when `j95nvp()`; otherwise as before.
- `countAt` (j95's record count) subtracts the eunuch at nvp, because jact adds +1 on top; the final map number = record.
- `hsvList` (jhouse) is wrapped: it returns only the servants the record puts at her room / lãnh cung now.
- `j95stage` also reconciles `serv` (id s<sid>) and `peddler` (c:ped) entries.

## Fixes made by the reviewer (r1, commit f74f95d3)
| file | change |
|---|---|
| dev/build/j95.js | the jhouse servants and Nội vụ phủ eunuch rules above (one person, one place) |
| dev/tools/roster.js | the same two visibility rules (roster_dom "roster.js home: tool 2, màn hình 4" fixed) |
| dev/build/jk95.js | "Thói quen" now also appears on the Hoàng hậu's card: kitPersonByName missed "Hoàng hậu <name>"; jk95 retries without the title |

## Tests (r1 build = main 399483e3 + 9b1d82fa + fixes)
| test | plain merge | after r1 fixes |
|---|---|---|
| roster_audit sens 18, CAP 3300 | 18 088 checks; (a) 2, **(c) 8 924**; page err 0 | 17 472 checks; **(c) 447**, rest 0; page err 0; knownTgkElder 14 596 |
| roster_audit rand 18, shard 4 | 6 365 checks; **(c) 1 089** | 8 239 checks; **(c) 32**, rest 0; page err 0 |
| stage-counts.js | thd home 2→3 ×3 (maid, elder, serv) | 0/0 in 3 of 4 runs; 1 run vuon 3→5 (item 4) |
| stage-counts on plain main 399483e3 (reference) | tn/kn elder +1, cnv kn/tgk elder +1 | (main's own gaps; the branch fixes them) |
| roster_dom 755x1000@2 / 1180x820@2 / maid road cnv | nvp map 1 vs record 0; roster.js home 2 vs screen 4 | 0 bad, 0 page err, no overflow (all three) |
| roster_oldsave (main save → this build) | — | loads at 755x1000 + 1180x820, record built on load, 0 bad, 0 errors |
| coop-e2e (live Worker) | — | **59/59** |
| co-op ledger | — | `j95on()` false while `COOPW.on` (ledger off; motive gate on); my r1 wrappers also check j95on |
| screenshots 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390, 390x844 (direct) | — | 0 page errors, no horizontal overflow at any size; looked at the person card (755, 1180) and the map/stage (roster_dom shots) |
Not done: host mode ?khost=1 and the 390x844 rotate prompt. My shot script fought the night card-flip and buổi overlays. The worker's report covers the rotate prompt; the branch adds no new layout.

## Checks
- **Kit only**: PASS. jk95 uses kpsec/h4.kpst/kitRows/kitChip/kpnote, with no CSS of its own (`.khab` is a hook class with no style; grep: no style anywhere). Seen at 755x1000: "THÓI QUEN · Buổi trưa Ngự hoa viên · Tai mắt kể · 3 lần / Buổi tối Dưỡng Hòa điện · 2 lần [tin cũ · 10 tuần trước]", in the same look as the other card sections. A stranger's card ("Người lạ") correctly shows nothing. KIT REQUEST K14 still stands (two-shadows map mark, "N người theo hầu" tag line, kit keeper to confirm the jk95 sections). Nothing private was drawn in the meantime.
- **VANPHONG**: PASS. No %, no "có thể" or "Chắc chắn" in player text (the hits are comments and a regex). Odds words come from the ladder.
- **4 buổi**: the ledger uses 4 slots (J95.B4, khắc 0..3). jmen's 3-buổi assumptions stay a main bug (FOREMAN_C NOTE for session 8), not this branch.
- **Numbers in BAL (OD:L1267)**: the new code adds no player-visible numbers. j95's internal dice and weights (habit drift, surprise chance) stay local constants, as on the PASSed schedules2. Owner/coordinator may want them in BAL later (not a blocker; nothing is shown to the player).
- **ONE source**: after r1, map = stage = record for her household and the Nội vụ phủ eunuch. The remaining gaps are items 1–4.

## Open owner questions (unchanged, from FOREMAN_C_STATUS)
- Q15: share S.roster in co-op as world state (host decides, guest reads)? Today it is off in co-op rooms. Note: OD:L96 lists "ledger" among the shared world facts, so leaving it off in co-op is a gap against that rule. Recommend yes, as a follow-up item.
- Q16: the maid road shows at most 4 consorts per place while the ledger may hold more. Keep the cap?
- New (coordinator): jhouse puts every household servant in her room all day, while jplx sends some to rest at Dãy nhà cung nhân. On r1 the ledger decides (the stage shows only those it puts at home). The servant-system owner should confirm this is the intended look.
