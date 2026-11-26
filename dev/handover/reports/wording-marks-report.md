# wording-marks report (WORDING-MARKS, owner OD 26/11 ~21:55Z + ~22:00Z)
PRIORITY #1 CHECK: OD rows (7) + «26/11 ~21:55Z»; review/lc25-wg 539603bf, review/wording-marks 5b1ab9d7 (reused, nothing rebuilt).
## What changed (one table, one formatter)
- `BAL.mk` folded into **`BAL.mark.cut`** (jbal.js; lo / hi / big per stat scale / word) + **`BAL.mark.exact`** = ["Bạc","Sức","khắc"] (exact amounts stay on choices; MAIN 164 correction).
- ONE formatter **`markTxt(text)`** (jk2b.js, next to `kitMk`): «Danh +8» → «Danh +++», «thiện cảm −6» → «thiện cảm −−», «Đức 40 → 38» → «Đức −»; keeps Bạc / Sức / khắc and counts; idempotent. KIT-STAGE-R5: call `markTxt` for any choice text you build; never print a stat number yourself.
- Single choke point: `kaBody` (j63.js) maps every Tốn / Được / Mất / Kèm / Ghi chú item through `markTxt` — every option card, act card, plaque, flip back, G4 dialog cell, gift row is built by it. Colour / row routing (kaSent, kaRows) still reads the numbers first; `fmt()`, `kaNT`, `kaResultRows`, resultShow, Sổ ghi are untouched (numeric).
- `kaUnit0`: a marked stat («Sủng ++») is one unbreakable unit like «Sủng +2» (K-EF-UNIT).
## Before / after (same option, Fold 755x1000 + iPad 1180x820 stills looked at)
| surface | before | after |
|---|---|---|
| Được row | Danh +8 · Sủng +2 · Bạc +30 | Danh +++ · Sủng ++ · Bạc +30 |
| Tốn row | Bạc -10 · 2 khắc | Bạc -10 · 2 khắc (exact) |
| Bại row | Đức -3 · thiện cảm -6 | Đức −− · thiện cảm −− |
| Result card (after the act) | Sủng +2 · Danh +5 · Bạc −10 | same, numeric |
## Scan (law 11) — `node dev/test/marks-choice-scan.js <page url> [turns]`
Reads every option of every PEND / act dialog through the kit row builder: texts `markTxt` would still change = FAIL. Result: 256 dialogs, ~1900 row texts, 0 exact stat numbers left; 115 signed numbers kept = Bạc / Sức / khắc only.
Tests: wording-gain-scan 0 vague / 0 «,,»; kit-e-rows PASS 26; kit-cost-rows-home PASS 15; kit-gain-list-scan 0 mislabel.
## Not covered / notes
- The scan plays no long run (new-life intro still open in the headless boot); endTurn dialogs were not reached — only builders. A longer `--bot` style run is the next check for RV.
