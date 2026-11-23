# KIT-MGBG report (Kit Keeper #8) — 23/11
PRIORITY #1 CHECK ('mini-game board backdrop slot'): KIT REQUEST in review/mg10a KIT_REQUESTS.md (23/11 MG10A) | main: kg82Bg only for canvas boards, no DOM slot | claims KIT KEEPER #8.

Branch **review/kit-mg-backdrop** (off origin/main e6894660) — sha **ce2f2289ce944ca899370ed24e72d20fdbe3b878**.

## What changed
- j79.js: `kitBoardBg(kind)` + `kitGameFrame({kind})` gives `.kgbox` the class `kgbox-bg` + `--kgbg` when kind is in `KG82_BOARDBG`; one CSS rule (cover picture under a rgba(255,250,240,.32) veil, kit card colour fallback).
- j82.js: `KG82_BOARDBG = {thu_tam, thu_choi, tuoi, co7}`; `kg82Pic` returns "" for them (no duplicate left picture).
- Callers: jpetcare `petcGameBox(title,how,kind)` (bath→thu_tam, play→thu_choi), jshelf water game (`tuoi`); co7 via kg82Open already passes kind.
- KIT.md section KIT-MGBG; kit sample §MGBG (4 buttons open an empty frame per kind). Pictures: MG10A's `img/kit/mg-<kind>-bg.webp` (already in assets.json).

## Looked at (scratch only)
Empty kit game frame with a test button, Fold 755x1000@2 and iPad 1180x820@2: thu_choi, tuoi, co7 on Fold; tuoi, co7 on iPad seen — painted board visible, button readable. thu_tam (Fold) and thu_tam/thu_choi (iPad) shots were covered by the intro card (harness) — not seen, but the same class/rule was confirmed applied (computed background-image set) for all 4 on both devices. 0 page errors.
NOT done: no real play-through of the 4 mini-games (pet bath/play, shelf watering, gomoku) with the backdrop; text/pieces over the painting not checked in live play.

## Tests
quickcheck PASS on ce2f2289: open 2195 ms, old save ok, core gates PASS, perf render 227/274, tab 498/511, buổi 1428/1375.

## REVIEW (independent small-kit reviewer, 23/11) — **FAIL** @ce2f2289ce944ca899370ed24e72d20fdbe3b878
PRIORITY #1 CHECK ('kit-mg-backdrop|MGBG'): OD 0 | ledger 0 | claims 4 | main 7 (KG82_MGBG j82.js:101 figure-column backdrop, KIT.md §13.7.3) | review/* 1 (this branch). Slot REUSES the KIT §13.7.3 pattern (one table KG82_BOARDBG next to KG82_MGBG, no second frame) — kit-first OK.
Method: branch is off current origin/main e6894660 (merge-base = main, merges clean). Played thu_tam, thu_choi, tuoi, co7 through Thử tay (mgCalRun, same KG82 engines + same kitGameFrame) past the rules card into live play, Fold 755x1000 and iPad 1180x820, strokes / ball taps / water tap / 4 gomoku stones; compared against a main build shot-for-shot. 0 page errors, no horizontal overflow, computed .kgbox-bg set on all 4 on both devices, no seam with the figure-column backdrop (KG82_MGBG grass/figure column sits beside the board; consistent). quickcheck (bash dev/tools/quickcheck.sh) PASS: core gates, time-spill, open 1998 ms 0 errors, old save loads.
Good: co7 (opaque board, backdrop only at the sides; stones/cells fully readable), tuoi (gold + green band pips readable on the grass), buttons readable on all 4.
FAIL reasons (law 12 look-at-it + "board/pieces/text stay readable"):
1. thu_tam (Fold + iPad): the five stroke-counter pips (.nwb-pip empty = 2px var(--k-hair) ring, jnwb.js:35) sit on the painted rug and are almost invisible (zoomed shot: pale grey rings on the red/gold rug border). On main they read on the cream board. The player cannot see how many strokes are left.
2. thu_choi (Fold + iPad): same fault — the empty third pip of the ●●○ counter vanishes on the painting (gold filled pips survive). The tiny ball buttons also sit on the busy chair/pillow area (readable but weak at iPad).
Fix (kit, one place, whole group): give the counter pool a cream plate under .kgbox-bg, e.g. `.kgbox-bg .nwb-pool{background:rgba(255,250,240,.82);border-radius:999px;padding:3px 10px;width:max-content;margin:0 auto}` (or a darker pip ring under .kgbox-bg), then re-shoot all 4 boards on both devices and check the pips of every board that uses .nwb-pool.
Also note (not blocking): thu_tam painting contains a painted cat at the same place as the pet cut-out (kitem) — they overlap as one cat on Fold/iPad now, fine, but if the pet is not a cat the backdrop cat will show beside her pet.
NOT driven live: the real pet-care dialog (petcGameBox) and shelf watering (jshelf) and a real pm duel for co7 — the harness could not open them past the intro dialogs; they call the same kitGameFrame({kind}) (code read: kind passed in the diff), so same result expected; re-check once in the fix review.
Shots (scratch only, none in git): thu_tam/thu_choi/tuoi/co7 A/B x 755/1180 + base (main) set.

## FIX 1 (keeper, 23/11) — sha **44fb8468f509dc4432b7c8cd05c7723d1f112fed** (answers the REVIEW FAIL)
- j79.js, one place, only `.kgbox.kgbox-bg`: cream plate (rgba(255,250,240,.88), hair border, pill) under `.nwb-pool`; pips get a darker ring (#6b4f1d 2px, band ring green #1f6b38, on = gold with dark ring); `.btn`/`.kgbtn` get a cream fill + 2px dark ring (ball buttons are `.kgbtn`). No broad `button` selector (gomoku cells untouched).
- Looked at LIVE boards via Thử tay (mgCalRun -> rules -> Sẵn sàng): thu_tam, thu_choi, tuoi, co7 on Fold 755x1000@2 and iPad 1180x820@2 (iPad thu_tam re-shot alone after an intro card covered it): empty pips and ball buttons clearly readable on the painting, co7 grid on the painted table. 0 page errors.
- NOT done: the real pet-care dialog (bath/play), the shelf watering dialog and a pm duel were not driven; only the Thử tay hosts of the same kinds.
- quickcheck: first run on 44fb8468 FAILED perf (buổi 3293 vs live 1686, limit 3186; render/tab fine); re-run PASS (buổi 1500 vs live 2796; open 2008 ms, old save ok, core gates PASS). The live baseline itself swung 1686 -> 2796 between runs, so the first FAIL looks like box noise (change is CSS only), but I did not prove it beyond the passing re-run.

## REVIEW 2 (independent small-kit reviewer, 23/11) — **FAIL** @44fb8468f509dc4432b7c8cd05c7723d1f112fed
Fix 1 (cream plate + darker pip ring, scoped `.kgbox.kgbox-bg`) is GOOD: re-shot thu_tam, thu_choi, tuoi on Fold 755x1000 and iPad 1180x820 (Thử tay live play) — every empty pip / ball button now reads on the painting; co7 unchanged and readable. 0 page errors, no overflow. No leak: computed .nwb-pool / .nwb-pip / .kgbtn style of the 22 other mini-game kinds that have them is identical to main (35 kinds scanned, 0 diffs, 0 carry .kgbox-bg). Real pet-care dialog (bath + play) and real shelf watering (Tưới, tỉa lá) opened live on both devices: .kgbox-bg set, backdrop visible, plate/buttons readable (they sit on the rules screen; game itself not started).
FAIL reason:
1. co7 never shows the backdrop in REAL play. The real Cờ năm quân (pm duel/play, jpma.js pmKyRun:331 → playArt({art:"co",eng:PM_KY})) opens kind "co", not "co7" (kg82Kind("co") → KG82.picKind="co"; KG82_BOARDBG has only co7). Driven live: `playArt({art:"co",eng:PM_KY,…})` → `.kgbox` has NO kgbox-bg, bg none, on both devices — same board, no painting, blank area beside the board. Only Thử tay (kind co7, a calibration tool) gets the backdrop, so the real game and Thử tay look different (kit consistency FAIL) and the keeper's goal for co7 is not met. Fix: make playArt with eng PM_KY (and PM_KYW co-op) pass kind "co7" to kg82Pic/kitGameFrame (or add "co" to KG82_BOARDBG and give mg-co-bg the same picture) — one place, then re-shoot the real duel + Thử tay on both devices.
Perf: quickcheck run 1 PASS (open 2012 ms, old save ok, core gates + time-spill PASS, render 255/218, tab 474/439, tasks>200ms 22/25 new/live). buổi new 1201 vs live 3738: the LIVE control itself swung 1211 / 5774 / 3738 ms across its 3 runs, new 1210 / 1201 / 1024 — so the buổi spike is machine noise, not this branch (the CSS-only fix changes no per-turn code). Run 2 was killed by the 30-min background limit, so only ONE full run + the live control inside it; not "twice".
Shots: scratch only, none in git.

## FIX 2 (Kit Keeper #9, 23/11) — sha **9f9d318cc5a9bce3085cac64fb9cb9934c3b7428** (answers REVIEW 2 FAIL)
PRIORITY #1 CHECK ('MGBG co7 kind'): KIT-MGBG REVIEW 2 | grep callers: only jpma.js:331 + :396 pass eng (both PM_KY/PM_KYW, e:"gomoku"); plain art "co" (Ăn quân, Go capture, a different board with its own mg-co picture) is called elsewhere without eng | LIVE main 78324353.
- Merged LIVE origin/main 78324353 (took main's index.html/sw.js, rebuilt with dev/site/build_site.sh).
- Fix, ONE place (j82.js playArt): the frame picture/kind is "co7" when eng.e==="gomoku" (and KG82_KIND.co7 exists), else the old kind. Chosen over adding "co" to KG82_BOARDBG because that would also give plain Cờ Ăn quân (another board) a gomoku backdrop and drop its left picture. Only kg82Pic/frame kind changes; kg82Preload/mgSet/kgReady keep kind "co" (numbers, tutor unchanged). Covers PM_KY and PM_KYW.
- KIT.md §MGBG: kind list unchanged, FIX 2 sentence added.
- Looked at LIVE (CDN pictures on) Fold 755x1000 + iPad 1180x820: playArt({art:"co",eng:PM_KY,occ:"pm",...}) (the exact call of pmKyRun) -> .kgbox-bg set, picKind co7, painting visible, 7x7 board readable; Thử tay co7 identical on both; plain playArt({art:"co"}) -> no kgbox-bg, bg none, own picture kept. 0 page errors.
- NOT done: pmKyRun itself not called (no NPC found by the harness; same playArt call shape used); no stones placed in this run (co7 pieces were already seen readable in REVIEW 1/2, board code untouched).
- quickcheck PASS: open 1940 ms, old save ok, core gates + time-spill PASS, render 239/219, tab 511/465, buổi 1353/1374, tasks>200ms 24/25 (new/live; 3 runs each, live control in the same run).
