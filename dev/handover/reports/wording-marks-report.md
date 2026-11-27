# wording-marks report (WORDING-MARKS, owner OD 26/11 ~21:55Z + ~22:00Z)
PRIORITY #1 CHECK: OD rows (7) + «26/11 ~21:55Z»; review/lc25-wg 539603bf, review/wording-marks 5b1ab9d7 (reused, nothing rebuilt).
## What changed (one table, one formatter)
- `BAL.mk` folded into **`BAL.mark.cut`** (jbal.js; lo / hi / big per stat scale / word) (no exact list: RULE BY ROW, owner 26/11 ~22:02Z).
- ONE formatter **`markTxt(text)`** (jk2b.js, next to `kitMk`): «Danh +8» → «Danh +++», «Bạc +30» → «Bạc ++» in Được/Mất/Kèm; `markTxt(text,row)` returns the text unchanged for row "ton" (Tốn = exact, anything she pays); «Danh +8» → «Danh +++», «thiện cảm −6» → «thiện cảm −−», «Đức 40 → 38» → «Đức −»; units (khắc, người…) stay; idempotent. KIT-STAGE-R5: call `markTxt` for any choice text you build; never print a stat number yourself.
- Single choke point: `kaBody` (j63.js) maps every Tốn / Được / Mất / Kèm / Ghi chú item through `markTxt` — every option card, act card, plaque, flip back, G4 dialog cell, gift row is built by it. Colour / row routing (kaSent, kaRows) still reads the numbers first; `fmt()`, `kaNT`, `kaResultRows`, resultShow, Sổ ghi are untouched (numeric).
- `kaUnit0`: a marked stat («Sủng ++») is one unbreakable unit like «Sủng +2» (K-EF-UNIT).
## Before / after (same option, Fold 755x1000 + iPad 1180x820 stills looked at)
| surface | before | after |
|---|---|---|
| Được row | Danh +8 · Sủng +2 · Bạc +30 | Danh +++ · Sủng ++ · Bạc ++ |
| Tốn row | Bạc -10 · 2 khắc | same (Tốn exact) |
| Bại row | Đức -3 · thiện cảm -6 | Đức −− · thiện cảm −− |
| Result card (after the act) | Sủng +2 · Danh +5 · Bạc −10 | same, numeric |
## Scan (law 11) — `node dev/test/marks-choice-scan.js <page url> [turns]`
Reads every option of every PEND / act dialog through the kit row builder: texts `markTxt` would still change = FAIL. Result: 256 dialogs, ~1900 row texts, 0 exact stat numbers left; 0 signed numbers left outside Tốn rows.
Tests: wording-gain-scan 0 vague / 0 «,,»; kit-e-rows PASS 26; kit-cost-rows-home PASS 15; kit-gain-list-scan 0 mislabel.
## Stills
CDN img/_review/wording-marks/marks-{choice,result}-{fold,ipad}.png
## Not covered / notes
- dev/test/marks-bot-scan.js (inpage4 bot) boots but the headless bot only reaches turn ~2 (5 dialogs, 0 left) — endTurn-generated dialogs still need a mid-game save (Foreman F ~b1570); not available to this worker.
- The scan plays no long run (new-life intro still open in the headless boot); endTurn dialogs were not reached — only builders. A longer `--bot` style run is the next check for RV.
- RV-163 hold (9047c283): (1) rebuilt site taken (c6908ed4). (2) kit-ton-row 6/14: the SAME 6/14 FAIL run on the pre-marks base 539603bf built here (button not found, row text «?» = harness state, not Tốn): markTxt(text,"ton") returns Tốn text unchanged, so nothing marks changed there. (3) endTurn probe: marks-bot-scan.js (forced endTurn/nextBuoi with showModal stubbed, __nlInner boot) still stays at turn 0 here — NOT demonstrated; needs a mid-game save.

## kit-ton-row (owner of the whole Tốn row, MAIN 165 widen) — before / after
Root cause was the HARNESS, not the Tốn rows: the boot left the new-life intro overlay (#klife, NLP) on screen and `showModal()` showed nothing (row text «?»), and the first card of a fresh page builds its kit rows late. dev/test/kit-ton-row.js now boots like the other kit tests (plain start(), remove #klife/#kroul, NLP=null, modal class reset), warms up 1.5 s and polls each card until its kit rows exist.
| | before (LIVE 4cfcda61 / base 539603bf / 9047c283) | after (this branch) |
|---|---|---|
| kit-ton-row Fold + iPad | 6/14 FAIL (open card ×1, hidden-outcome ×2 per device) | PASS 14/14 (3 runs) |
Tốn is exact on every card kind incl. hidden-outcome: markTxt(text,"ton") returns the text unchanged, and the test asserts the price in all 21+14 cases.
## endTurn coverage
marks-choice-scan.js boot fixed the same way; PEND/act: 257 dialogs, 1882 row texts, 0 stat numbers left outside Tốn. A forced endTurn() in-page runs once (buổi 0→3 = the night) and then returns at once (night scene pending), so weekly events were still not reached — kaBody choke point + grep remain the coverage there.

## TỐN row without the minus (MAIN 166, OD 26/11 ~22:02Z «Tốn: Bạc 20 · Sức 5 · 1 khắc»)
markTxt(text,"ton") now prints the price without the sign: «Bạc -3» → «Bạc 3», «Sức -3» → «Sức 3» (jk2b; the hidden-outcome card's own-price compare uses the same form). Colour is unchanged (decided before the print). Before / after (Fold + iPad stills looked at, CDN img/_review/ton-row/): open fx Bạc, hidden «tốn: Bạc», hidden ton:{suc}: «TỐN Bạc -3 / Bạc -3 / Sức -3» → «TỐN Bạc 3 / Bạc 3 / Sức 3»; choice card «Bạc -10 · 2 khắc» → «Bạc 10 · 2 khắc».
Asserts: kit-ton-row asserts the price present AND no «-» digit in any Tốn cell (PASS 14/14 ×2); marks-choice-scan fails on a minus in any .kr-ton item (257 dialogs, 0). kit-e-rows 26, kit-cost-rows-home 15.
Open (not a blocker): weekly endTurn events not reached by the headless probe (night scene blocks) — covered by kaBody choke point + grep.
