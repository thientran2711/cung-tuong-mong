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
