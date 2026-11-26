# SIDEQ-TRIM — fewer, fitting, short Việc nhờ / Phụ tuyến (owner OD 26/11 ~19:15Z)

depth 1 · START_CTX ~3 % · worker SIDEQ-TRIM (MAIN 161) · branch `review/sideq-trim` from LIVE f573dc94

PRIORITY #1 CHECK ('phụ tuyến|side quest|Việc nhờ|Lời nhờ'): OD 21 (L1243/L1252 NPC roads = help hồi; L2143/2154/2163 quest chips → 2 tags on the picture; 26/11 ~19:15Z this order) | ledger 1 | main 15 files (j72 engine Q72CFG mo 2 / max 4, BAL.ag.why.q72.gap 3; jnroad*/jreign/jact/jagharm/jexam offer sites) | review/* 0 | claims 0 (Foreman D: cung-quy / net-ghen rank checks are NPC↔NPC acts, not asks to her — no overlap). Reused: the j72 engine, its kit card, history card, tab; nothing new on screen.

## What changed (one gate, every source)
Every ask reaches her through j72 (`q72Make` → `q72Offer`). New `dev/build/jsideq.js` (wraps only) + `BAL.sideq` (jbal2.js, one core):
1. **RANK FIT** `q72Fit(A)`: `BAL.sideq.band` = rank → band 0 (≤ Quý nhân) / 1 (Tần, Phi) / 2 (Quý phi, HQP, HH). `who[kind]` = bands at which that kind may ask. Consorts only within `rvDn/rvUp` = 2 ranks. Only people who know her: consorts / fallen women / the mistress of another house's servant must be ≥ net «quen» (or same house / faction); ministers need regard ≥ `offKnow`. The picker never draws an unfit asker; a given asker (follow-ups, NPC-road help hồi, Tâm nguyện lines, map meetings, NPC visits, exam errors, debts) is refused → that NPC keeps her own road (jnroad already plays the chapter alone when the request is withdrawn). Nobody forced.
2. **FEW AT ONCE**: `Q72CFG.max` / `Q72CFG.mo` now read `BAL.sideq.open[band]` (2 / 2 / 3) and `BAL.sideq.mo` (2); plus `gapW` = 2 tuần between two new asks from anyone (her own «Hỏi han» exempt). Tab chips / chapter hints / «Nhận lời» read the same.
3. **SHORT**: ≤ `stepMax` 3 steps; deadline = min(template, `dlMax` 2 tuần) but never under its waits + 1 — written once onto every template (and later registrations via T7), so tag «Hạn N tuần», offer, accept log and x.dl agree. Accepted but never begun by the deadline → «… đã nhờ người khác lo», only `lateR` −2 regard.
4. **NOT WHOLE-GAME**: when her band changes, open quests whose asker no longer fits end quietly («Dừng giữa chừng», no loss) and their waiting follow-ups drop.
5. Gloss «Việc nhờ» (kitInfo) states the rule with BAL numbers.
6. **Bug found in the family (fixed)**: jact «favour» (map meeting) and jagharm «favour» (NPC visit) pushed the quest into the OPEN list *before* her answer → a declined meeting stayed open and «Nhận lời» pushed it twice. Now offer ≠ accepted.

## Whole family scan (law 11) — `node dev/measure/sideq-scan.js index.html`
Offer sites (15, all through the gate): j72.js:137,169,219,251,253 · jact.js:164 · jagharm.js:163 · jexam.js:145,146 · jnroad.js:137,292 · jnroade.js:60 · jnroadm.js:137 · jreign.js:387,391.
BAL.sideq open by band [2,2,3] · mo 2 · gapW 2 · dlMax 2 · stepMax 3. Templates by requester (LIVE = every band):

| requester spec | templates | band 0 ≤Quý nhân (LIVE→now) | band 1 Tần·Phi | band 2 Quý phi+ | >stepMax | max deadline LIVE→now |
|---|---|---|---|---|---|---|
| fam | 57 | yes→yes | yes→yes | yes→yes | 0 | 8→3 tuần |
| rv | 44 | yes→±2/2 rank | yes→±2/2 rank | yes→±2/2 rank | 0 | 8→2 tuần |
| th | 32 | yes→no | yes→yes | yes→yes | 1 | 6→2 tuần |
| off | 32 | yes→no | yes→no | yes→yes | 0 | 8→2 tuần |
| emp | 27 | yes→yes | yes→yes | yes→yes | 0 | 8→3 tuần |
| svm | 25 | yes→yes | yes→yes | yes→yes | 0 | 6→2 tuần |
| hh | 23 | yes→no | yes→yes | yes→yes | 0 | 8→2 tuần |
| ak | 18 | yes→no | yes→yes | yes→yes | 0 | 6→2 tuần |
| man:sứ thần | 14 | yes→no | yes→yes | yes→yes | 0 | 8→2 tuần |
| maid | 11 | yes→yes | yes→yes | yes→yes | 0 | 6→2 tuần |
| rsv | 11 | yes→yes | yes→no | yes→no | 0 | 8→2 tuần |
| doc | 10 | yes→yes | yes→yes | yes→no | 0 | 4→2 tuần |
| fu:rv | 9 | yes→±2/2 rank | yes→±2/2 rank | yes→±2/2 rank | 0 | 6→2 tuần |
| man:họa sư | 9 | yes→yes | yes→yes | yes→no | 0 | 6→2 tuần |
| fallen | 8 | yes→yes | yes→yes | yes→no | 0 | 8→2 tuần |
| eun | 8 | yes→yes | yes→yes | yes→no | 0 | 6→2 tuần |
| man:nhạc sư | 8 | yes→yes | yes→yes | yes→no | 0 | 6→2 tuần |
| man:thái y | 6 | yes→yes | yes→yes | yes→no | 0 | 6→2 tuần |
| rv+ | 5 | yes→±2/2 rank | yes→±2/2 rank | yes→±2/2 rank | 0 | 8→3 tuần |
| fu:doc | 4 | yes→yes | yes→yes | yes→no | 0 | 5→2 tuần |
| fu:th | 4 | yes→no | yes→yes | yes→yes | 0 | 8→2 tuần |
| sv | 3 | yes→yes | yes→yes | yes→yes | 0 | 4→2 tuần |
| fu:hh | 3 | yes→no | yes→yes | yes→yes | 0 | 5→2 tuần |
| fu:ly | 3 | yes→yes | yes→yes | yes→no | 0 | 6→2 tuần |
| fu:maid | 3 | yes→yes | yes→yes | yes→yes | 0 | 4→3 tuần |
| fu:eun | 3 | yes→yes | yes→yes | yes→no | 0 | 6→2 tuần |
| rvk | 2 | yes→±2/2 rank | yes→±2/2 rank | yes→±2/2 rank | 0 | 4→2 tuần |
| sve | 2 | yes→yes | yes→yes | yes→yes | 0 | 5→2 tuần |
| rva | 2 | yes→±2/2 rank | yes→±2/2 rank | yes→±2/2 rank | 0 | 5→2 tuần |
| akf | 2 | yes→no | yes→yes | yes→yes | 0 | 5→2 tuần |
| rvc | 1 | yes→±2/2 rank | yes→±2/2 rank | yes→±2/2 rank | 0 | 3→2 tuần |
| rvp | 1 | yes→±2/2 rank | yes→±2/2 rank | yes→±2/2 rank | 0 | 6→3 tuần |
| fu:svm | 1 | yes→yes | yes→yes | yes→yes | 0 | 6→2 tuần |
| man:thị vệ | 1 | yes→yes | yes→yes | yes→no | 0 | 3→2 tuần |

## Robot (dev/measure/sideq-count.js, ACC=1 yes-player who accepts every ask, 3 lives × 12 months each; «hi» = life starting at Quý phi)
| run | asks / life / year | most a month | min gap | open at once (max) | rank-misfit asks | longest quest | longest deadline |
|---|---|---|---|---|---|---|---|
| LIVE year 1 | 13.3 | 2 | 1 tuần | 3 | 5 (Thái hậu→Quý nhân ×3, minister→Quý nhân/Tần) | 7 tuần | 6 tuần |
| branch year 1 | 10.7 | 1 | 2 tuần | 2 | 0 | 3 tuần | 3 tuần |
| LIVE high rank | 13.7 | 2 | 1 tuần | 3 | 9 (Tổng quản→Quý phi ×5, minister→Phi, artist, thái y→HQP) | 7 tuần | 8 tuần |
| branch high rank | 11.3 | 1 | 2 tuần | 1–2 (cap 3) | 0 | 3 tuần | 3 tuần |
Open-quest weeks: LIVE y1 {0:16,1:33,2:20,3:12} → branch {0:37,1:38,2:1}. Branch: 18 of 32 accepted asks ended by play (ok 16 / fail 2); the rest were withdrawn quietly (asker went elsewhere, −2) because the yes-bot works a step on only 40 % of moves. 0 page errors in all 12 lives.
(The plain inpage6 bot declines every ask: LIVE 11–13 asks a year, 0 accepted.)

## Tests
- npc-purpose-g1d PASS (11) · nrask-engine ALL PASS · j72c-play ALL PASS ×3 (one earlier run: 4 seeds stuck at step 0 «phải đến …», not reproduced in 4 reruns; LIVE PASS ×1) — both content tests now set `window.__sqoff=1` (content checks deal any asker; the rank gate is checked by the robot + sideq-shots).
- dev/test/sideq-shots.js (Quý phi life, real deal through the gate): PASS, 0 page errors.
- quickcheck + interleaved perf ×3: see below.

## LOOK stills (CDN img/_review/sideq-trim/)
fold-ask.jpg · fold-tab.jpg · ipad-ask.jpg · ipad-tab.jpg — https://ctm-img.victoria-tntt.workers.dev/img/_review/sideq-trim/<name>
(ask card shows «Hạn 2 tuần» on the picture; tab «Đang làm 2/3 · Lời nhờ tháng này 1/2» at Quý phi.)

## Files
dev/build/jsideq.js (new, in assemble after jnroade.js) · jbal2.js (BAL.sideq) · jact.js / jagharm.js (pre-push fix) · dev/measure/sideq-count.js, sideq-scan.js · dev/test/sideq-shots.js · j72c-play.js / nrask-engine.js (__sqoff) · index.html, sw.js (build).
