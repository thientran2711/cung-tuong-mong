# ROAD-TESTS-QDRAIN — report (worker SIDEQ-RACE, order from MAIN 169, 27/11)

PRIORITY #1 CHECK: reuses dev/test/lib/qdrain.js from review/npcroads-red (RV-165 PASS, merged on main); scan list from dev/handover/reports/npcroads-red.md «Same loop pattern elsewhere»; prio1 «npc-roads nroadhp» all 0; no claims on these tests.

Order: the 9 road*/oldsave tests that are red on LIVE with the same headless month loop. Fix them with lib/qdrain.js on review/road-tests-qdrain from LIVE 17f23656 (tests only unless a real game fault shows).

## Verdict: stale tests. No game code changed.
1. **Same root as npcroads-red.** The loop `Q.length=0;used=0;nextBuoi()` never lets time pass. jdayq holds the buổi in UI mode, and the jnf night card (nfch) waits for her answer. Fix in all 9 tests:
   - `addInitScript(require('./lib/qdrain').init)` sets `__bot` (the game's own headless flag) and answers nfch with «Thôi».
   - Every `Q.length=0;used=0;` becomes `__qDrain();used=0;`.
   - story14-frame: after the sensible-bot part it set `window.__bot=null` (jdayq back on). It now sets `window.__bot=1`, the plain flag, so jdayq stays off.
2. **Stale facts exposed once time passed** (each line commented in the test):
   - bd-legacy-save «new bd lives roll only the new roads»: it held a fixed list of 4 roads, but composed roads added bd_lua / bd_su / bd_luuly / bd_bac (jrdcsd). The law-6c rule stays: a new life never rolls an old premise. The check now reads the game's own `BD_OLD` (and asserts it still has 4 entries).
   - story14-frame r1 item 2 (THROW `reading 'startsWith'`): since road B3 (jrd_cnv header), `ms:len14` is no longer a middle chapter. For a maid, the chapter-12 slot `end:12` becomes `ms:len14` (jend14 `eg12`). The test looked for `ms:len14` (j=-1 → ch.i=-2 → plan[-1]). It now uses the `end:12` slot when the plan has no `ms:len14`. The assertion is unchanged.
   - story14-frame OD:L1253 spread: tt has more roads now, so 14 lives gave each arc only 3 plays and the «4+ plays» rule had nothing to judge. The rule is unchanged; the test now plays at least 14 lives and goes on until 4 arcs have 4+ plays (cap 40). Plays per arc raised from 4 to 6 later, because one run had 3 of 10 arcs end one way by chance with only 4 plays; the 6+ run took 29 lives and PASSES.
   - story14-frame r1 item 6 (Thanh mai life `len 14`): in a full-road life, jroad moves `st:tm96a/b/c` out of the plan to the side line (phụ tuyến, `S.st.f14.tmq`) at the next chAdvance67 (ROAD_MAP §2). The count read the plan before that first advance. The side entries are no longer counted; max / n / «/14» labels are still asserted.

## Before / after (LIVE 17f23656 vs review/road-tests-qdrain, local http, MAIN arg = this build where a test takes one)
| test | before (LIVE) | after |
|---|---|---|
| story-deadline.js | 11/12 («lapses at the deadline» FAIL: time never passed) | 12/12 |
| bd-legacy-save.js | 1 FAIL (old life never reaches .6) then THROW | 4/4 |
| caoly-oldsave.js | 14/14 (red only when run without the MAIN arg) | 14/14 |
| origin-bd-oldsave.js | 9/14 | 9/14 (the 72-month play now reaches turn 72; the 5 FAILs need a real old build, see A) |
| road-saves.js | 5/7 | 5/7 (chapters now move 3→4; the 2 FAILs need a real old build / stale premise, see A) |
| road-end.js | 49/51 | 51/51 |
| rdc-play.js | ALL PASS (59) in 15 s, but time never passed | ALL PASS (59) in 1097 s, lives really play |
| road-full.js | full: 1094/1934; sample 12 roads × 1 life: 50/86 (every life stuck at chapter 1) | sample: 12/12 lives walk all 14 chapters, origin ending told (each road run alone: 9/9; first chunk 23/23). cnv_chu: 1 of 4 runs stopped at ch. 7, see C |
| story14-frame.js | 6 FAIL («time stopped at month 0», rolled road never opens ch. 4, …), exit 2 | 25/27, exit 1: the 2 left are A (old-build fixture) and B (F14ROLE question) |

road-full sample = one road per origin: tt_co, dtq_bien, muoi_tuoc, cn_chu, nc_gian, bd_san, pt_hai, td_an, ch_co, thd_tho, cnv_chu, pf_co, 1 life each (args `<url> 1 <roads>`). MAIN 172 accepted the sample. The full run (92 roads × 3 lives) now really plays, at about 5 min per life, so roughly 23 h.
Memory: a long run in one page (several 14-chapter lives) can crash the renderer («Target crashed») when another browser runs beside it. Run these one at a time, a few roads per process.

## Separate items (NOT fixed here)
### A. Need a REAL old MAIN build as fixture (MAIN 172: route later)
- origin-bd-oldsave: 5 FAILs. «tut / road / late: old main bd save loads as hòa thân · Bắc Địch», «pre-rolled lives (ow1+ow2) on main keep the origin», «ow3 roll: no bd outside the hòa thân share». They need a build where bd is a 10th origin and the land is still «Bắc Địch» (before the Ba Tư rename). Using today's build as MAIN cannot pass them.
- road-saves: «main build (dtq): loads, no road state» needs a pre-frame build. «this build, phase-1 frame (td: road not full on this branch)» is a stale premise, since every td road is full now.
- story14-frame: «old save (main build) loads, keeps its old frame» has the same fixture need.
### B. Question for MAIN (game content, not touched)
- story14-frame «r1 item 3: hostile roles from the reviewed table (every role listed)». F14ROLE (jst14) lists only the .4 premise arcs. Every road chapter .5–.11 that has a `{v}` (tt_co_5 … dtq_binh_*, …) is missing from it, so `f14Hostile` is false there. Either (a) the road chapters keep the .4 cast and the test should check .4 arcs only, or (b) F14ROLE needs rows for the road chapters. This is a design call, so the test is left as is.

### C. Seen once, not fixed (game or bot, unclear)
- road-full cnv_chu (servant road), 1 of 4 runs: the life reached `S.st.ch.all` after chapter 7 at month 27, with no finale (`fin` empty; ends cnv_chu_6=lose, cnv_chu_7=mid). The 3 other runs walked all 14 chapters. This needs a look by the cnv road owner. Log: one bad run on the fold build (LIVE 0562e15f base).

## FOLD (MAIN 175 order): one branch review/sideq-road-fold
These go together on LIVE 00dca386: sideq-trim-r163 a6ecd04e (RV PASS), sideq-race 16242897 (RV-164 PASS) and this road-tests-qdrain work, plus the L1253 6-plays commit.
- Conflicts: only the dev/build/assemble.py script list (resolved as LIVE list + `jsideq.js` after `jnroade.js`), plus the build outputs. Build redone; assets.json = LIVE.
- Runs on the fold:
  - Base 0562e15f: sideq-optscan PASS, j72c-play ALL PASS, nrask-engine ALL PASS, nroadhp-unit 40, npc-roads-saves 5/5, story-deadline 12/12, caoly 14/14, bd-legacy 4/4, road-end 51/51, road-saves 5/7 (A), rdc-play 59, road-full tt_co/cn_chu/nc_gian/pt_hai/thd_tho 9/9 each, story14-frame 25/27 (A, B).
  - After merging 00dca386: smoke sideq-optscan, j72c-play, nrask-engine, nroadhp-unit, story-deadline, npc-roads-saves all green.

## Changes (tests only; no game code, no BAL, no build)
dev/test/lib/qdrain.js (same file as review/npcroads-red, identical bytes); dev/test/bd-legacy-save.js, caoly-oldsave.js, origin-bd-oldsave.js, rdc-play.js, road-end.js, road-full.js, road-saves.js, story-deadline.js, story14-frame.js. No test skipped. No threshold lowered.
