# NPCROADS-RED — report (worker SIDEQ-RACE, second order from MAIN 167, 27/11)

PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 0 | main dev/PROGRESS_review-npc-roads.md, dev/handover/reports/npc-agent-ag1.md (old, no open work) | review/* none (prio1.sh "npc-roads nroadhp": all 0) | claims none.

Order: npc-roads-men / npc-roads-maids / nroadhp-unit (and family) RED identically on LIVE 4cfcda61. Find the root (stale test vs real game regression), fix the family on review/npcroads-red from LIVE 4cfcda61, before/after table of every npc-roads* / nroadhp* test.

## Verdict: stale tests, NOT a game regression. Three causes, all from systems that landed after these tests were written.

### Cause 1 (npc-roads, -men, -maids, -saves, -fix-scan): in the test loop, time never passes, so no NPC road ever starts
- The long-life month loop is `for(g<40 && S.turn===t){ Q.length=0; used=0; nextBuoi() }`. Probe on LIVE: after 24 «months» `S.turn` was still 0 and the buổi stuck at 3. `nrMonth` (hooked on rivalsMonth) was never called, so «NPC roads 0» and every `v.nr` stayed null in every life.
- (1a) jdayq (24/11, «ONE NEW-DAY ORDER») holds the buổi in UI mode until the old scenes are painted (`dqUi() && dqOldPending()`: `DQ.stat.held++`). A synchronous loop never paints. jdayq is OFF for bots (`dqUi()` reads `!window.__bot`; header: «Bots: off (no UI)»), and the tests never set `__bot`.
- (1b) jnf night fight: every night `endTurn` waits for her answer to the timed «Kính sự phòng» choice (pid `nfch`: Tranh sủng / Chặn ngự giá / Thôi). Emptying Q does not answer it, and the next `endTurn` shows it again.
- The game is fine: a player taps through both. `ledger.js` already drains the night card with «Thôi».
- Fix: shared helper `dev/test/lib/qdrain.js`, added as an init script. It sets `window.__bot=1` (the game's own headless flag, as j72c-play and the robot use) and provides `__qDrain()`, which answers `nfch` with «Thôi» and drops every other card exactly as the old `Q.length=0` did. Each month loop calls `__qDrain()` where it emptied Q.
### Cause 2 (npc-roads-maids «staff eunuchs live …»): exposed once time passed
- A eunuch who joins the staff during the last month gets his road at the NEXT month tick (jnroad `nrMMonth` → `nrMInit`). Probe over 72 months: a road-less eunuch only ever appears in the month he is first seen («m25: Tiểu Tài Tử@first25», «m34: …@first34», …).
- Fix: the check counts only eunuchs already on the staff at the previous month's end. A newcomer without a road is shown as `fresh` and allowed. Any older eunuch without a road still FAILs.
### Cause 3 (nroadhp-unit, 2 FAIL on LIVE)
- «Tai mắt → known, oán +13 × nết (21→30, expected 34)»: stat-pace (landed on main, BAL.stp) routes every gain through `spG` (j9 `oanAdd`). The check asserts an exact pre-pace number. Fix: pace off for this one check only, restored after (the stat-pace commit 39709f32 did the same for 3 feature tests; `stat-pace.js` covers the pace).
- «Mệnh truyện «Phụ tuyến» tab = kit skill cards»: the pane moved to the shared chapter carousel `kitSlide` (KIT §21c, owner #29: «bất kỳ một cái chỗ nào mà có liên quan tới chương»; jnroadhp `nhPaneHTML`). The check looked for the old `kskill` class. Fix: it now checks `class="kslide"`. Name, data-ktsv="pt" and «Phụ tuyến · «» are still required.

## Before / after (LIVE origin/main 4cfcda61, local http, one test at a time where they are long)
| test | before (LIVE) | after (review/npcroads-red) |
|---|---|---|
| npc-roads.js | 27/30 (3 lives: «walks some NPC road to its end» FAIL, NPC roads 0) | 30/30 (run alone, 3731 s) |
| npc-roads-men.js | 19/23 | 23/23 |
| npc-roads-maids.js | 16/22 | 22/22 |
| npc-roads-saves.js | 3/5 (every nr null) | 5/5 |
| npc-roads-fix-scan.js | THROW (`reading 'dead'`, no road to scan) | PASS (page errors 0) |
| npc-roads-tokscan.js | PASS | PASS (unchanged) |
| nroadhp-unit.js | FAIL (2) | PASS (40 checks) |
| nroadhp-shots.js | runs, 0 page errors | unchanged |
| nroadhp-vp.js | PASS (52 strings) | unchanged |

Memory: the long lives now really play 240 months. Run them one or two at a time on this box: 5 in parallel was OOM-killed, and npc-roads crashed the page once when run beside two others.

## Same loop pattern elsewhere (scan, NOT fixed here: outside this order)
`grep -l "Q.length=0;used=0;(try{)?nextBuoi()" dev/test/*.js` without `__bot` / night answer: bd-legacy-save, caoly-oldsave, origin-bd-oldsave, rdc-play, road-end, road-full, road-saves, story-deadline, story14-frame (cal-p2c has __bot). On LIVE they are red for mixed reasons: several exit in 0–1 s, so wrong usage args or a crash; road-end 49/51; road-full 1094/1934; road-saves 5/6; story14-frame timeout. They can reuse lib/qdrain.js. A separate order is suggested (owner of the road* tests).

## Changes (tests only; no game code, no BAL, no build)
new dev/test/lib/qdrain.js; dev/test/npc-roads.js, npc-roads-men.js, npc-roads-maids.js, npc-roads-saves.js, npc-roads-fix-scan.js, nroadhp-unit.js. Every assertion kept: only the eunuch check now excludes newcomers of the last month, and the card check points to the current kit class.
Note: review/sideq-race (16242897, RV PASS) also edits npc-roads*.js / nroadhp-*.js (Q clear in q72Do loops, __sqoff in help parts) on other lines. Expect a trivial merge.
