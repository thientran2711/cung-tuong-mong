# odds-meter-back — worker report (MAIN ROOT-61; opened by C-AG #18)
PRIORITY #1 CHECK: OD 19/11 ~01:48Z real (overwrites OD L477 labels) | main jk2b.js kitRisk/kitHideOut, j79.js kitOdds, jkitpage §53, j63 kaOdds, j17/j79 dilLine | review/* none | claims none (own row)
START_CTX ~8 % (estimate). Branch `review/odds-meter-back`, from live main 96188526, sha **3216fd90** (work commit 3e9e1943 + merge of newest origin/main b1c3631e, site rebuilt).

## What
1. **kitRisk retired everywhere** (`kitRisk`, `KIT_RISK`, `.krisk` CSS, `risk` in kitHint's result/overrides). Callers before: jk2b kitHideOut (every event option), jkitpage §53. jcycle had none. After: `git grep kitRisk|krisk dev/build` = only comments that say it is retired.
2. **Every event option card shows the kit odds meter** `kitOdds` (7 segments red→green + ladder word, unchanged look): kitHideOut no longer removes the card's own `.kat > .kodds` (kaNorm → kaOdds → oddsChip, from the option's line = the odds the roll uses, law 4). New kit part `kitOptOdds(b)` (jk2b): a card with no odds (certain, nothing rolled) gets the same meter at «Nắm chắc». Gợi ý / Tốn rows unchanged. `showOdds` flag now redundant (default for all).
3. **Same family (fix the whole group):** 5 options showed «Khó lường» although they are CERTAIN, so they would have had no true meter:
   - `c6` (j68, every j68 event option) with no `p`: its go still had `roll(` in its text → dilLine sniffed a roll. Now a certain c6 has no roll in its code.
   - `go:nightScene` (PEND.ksp «Tắm gội chờ giá»): dilLine read the rolls inside the NEXT scene function. New `dilSrc(c)` (j17, used by j17 + j79 dilLine): only the option's own code counts; a global scene/step function reference = next step, certain here.
   - A truly unknown chance (jpoison «Nhận ngay», hidden poison) now draws the same kit meter with no step lit + «Khó lường» (kaOdds j63, kitOdds' existing none-form) instead of a plain chip. **MAIN: confirm this is OK** (word is off the 7-rung ladder; it was already shown before as a chip).
4. Canon overwrite in place: KIT.md §28.6 (no-odds-meter line, kitHint `{hint}`, kitRisk bullet → kitOptOdds bullet, sample page line), §25 (dilSrc, Khó lường), §53 header/index/samples, §47 list; KIT_NUMBERS 53; kit page §53 now shows the 7 meter steps + the event option sample (no risk chip).

## Tests
- `node dev/test/odds-meter-back.js <url> <json> 755x1000,1180x820` (new): every PEND event dialog (KIT_ACT_PIDS excluded) + approachOne visits (400 draws, unique by title+first option). Checks krisk = 0, kodm on every option, meter step = the option's own odds word (certain = Nắm chắc), no page error.

| device | build | dialogs | options | krisk | meter | no meter | step≠odds | result |
|---|---|---|---|---|---|---|---|---|
| Fold 755x1000 | main 96188526 (before) | 51 | 146 | 146 | 0 | 146 | – | FAIL |
| Fold 755x1000 | after | 53 | 151 | 0 | 151 | 0 | 0 | PASS |
| iPad 1180x820 | main (before) | 56 | 157 | 157 | 0 | 157 | – | FAIL |
| iPad 1180x820 | after | 52 | 148 | 0 | 148 | 0 | 0 | PASS |
(counts differ a little per run: each run is a fresh random life; first after-run had 5 «Khó lường» no-meter options → fixed in item 3.)
Steps seen after (Fold): Liều 4 · Khó 12 · Năm ăn năm thua 12 · Khá chắc 7 · Chắc 2 · Rất chắc 5 · Nắm chắc 109.
- `dev/test/opt-render.js` updated to the new rule (A: meter present at the option's odds, retired chip = FAIL). Its remaining fails on Fold (195 "outcome row", 38 "Tốn: không", 11 F-unclassified) are PRE-EXISTING on main (opt-card-short layout: hidden cards show a `kfill` Tốn «không» / Được row) — not touched here.
- After the main merge (3216fd90): odds-meter-back Fold 149/149 meter, krisk 0, step≠odds 0 · iPad 158/158, krisk 0, step≠odds 0 → PASS both.
- quickcheck on 3216fd90: QUICKCHECK PASS · open 1428 ms · old save ok · core gates PASS (perf new/live render 195/182, tab 468/395, buổi 1158/945 ms; on 3e9e1943 also PASS).
- Note: the 3e9e1943 commit footer carries the wrong Claude-Session id (MAIN's); cosmetic, a force-push to fix it was refused, left as is.

## Shots (CDN, delete after verdict: `python3 dev/site/cdn_sync.py --wipe-review odds-meter-back`)
img/_review/odds-meter-back/: montage-fold.jpg, montage-ipad.jpg (td1 · night1 · tt3), and full-screen fold-/ipad-{td1,night1,tt3}.jpg (755x1000@2, 1180x820@2). Looked at: meter on every card, no risk chip, no overflow.

## Seen, NOT fixed (outside this brief — for MAIN)
1. Event cards show «Tốn: không» and «Được: không» filler rows (opt-card-short `kfill`), against owner 13:25Z «never Tốn: không» (KIT §42.6). Visible in every shot.
(The «undefined truy sát» in the td1 shot is a test artifact: td1 was opened directly, S.foeDad unset; not a game bug.)
