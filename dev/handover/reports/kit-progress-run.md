# kit-progress-run — report (kit-mark; owner bug via MAIN ROOT-82, fast lane)

Branch `review/kit-progress-run` @ d19741dc (from LIVE b1033eb0). `bash dev/tools/quickcheck.sh d19741dc` PASS (189 s, core gates PASS, old save ok; perf buổi 1261 vs live 3334 — live had its own spike this run). `coop-e2e.js` 68/68. `golive.sh` not run (classifier refuses).

## Owner (verbatim)
«Sao cái khung này nó cứ đứng ở một cái chỗ, một cam nhỏ nhỏ đầu rồi nó chớp tại chỗ, mà nó không phải là chạy tới như nhiều game khác.» (the «Tranh người trong kiếp này» loading cover, Fold)

## Cause (both of MAIN's reads confirmed)
1. `lPaint` (jload) rewrote `b.innerHTML = kitProgress(...)` on every 120 ms round of the life gate → the `<u>` fill was a NEW element each time, so `transition: width .4s` never played and the whole block re-rendered (the blink). Same pattern in the first-load screen `paint` and, by rebuild, the sổ panel.
2. The total grows while it runs (`all` gets every newly wanted / pending picture), so have / total can fall or stay tiny → «mới chút ít».

## Fix (KIT §35, kit page sample §35.1)
- `kitProgressSet(root, o)`: the bar is built once, then updated IN PLACE (`--v`, the words, the sub line; no innerHTML rebuild). `kitProgress(o)` (HTML form) keeps a per-`key` max and animates from the value it replaced (`--v0 → --v`, `kprogGrow`).
- The shown value only moves FORWARD (monotonic max); words stay dlPart (no %).
- Smooth fill (`transition .6 s`) + a soft sheen (`kprogSheen`, 1.7 s loop) over the filled part while it waits, so it never looks frozen when one picture is slow; reduced motion: none.
- All 3 callers: life cover `lPaint` (key `life`), first-load cover `paint` (key `core`; the notes rewritten only when their text changes), sổ panel `dlPanel` (key `fig`).

## Before / after
| | before (LIVE) | after |
|---|---|---|
| fill element per 120 ms tick | NEW node every tick (innerHTML rewrite) → no transition, block blinks | same node, updated in place |
| have / total when the total grows | bar can fall / stall at «mới chút ít» | never falls (forward-only max) |
| waiting on one slow picture | static | sheen keeps moving |
| life / first-load / sổ panel | rebuilt | in place / in place / animates from the previous value |
Short mp4 (the real pattern: repaint every 120 ms, have creeps up, the total keeps growing): CDN `img/_review/kit-progress-run/{before,after}-{fold,ipad}.mp4` + `after-fold-strip.jpg` (frames at ~25 % → ~50 % → ~70 %, sheen visible). Delete the folder with the verdict.
Tests `dev/test/kit-progress-run.js` 27/27 (Fold, iPad, Fold with reduced motion): same fill node across ticks for the life + first-load callers, forward-only although the total grows (10 → 20 → … → 75), words no %, note not duplicated, HTML form never backwards (6/10 → 1/10 still 60 %-wide, starts from 60), keyframes present, sheen runs / none in reduced motion. one-core-guard, media-check green.

## Honest limits
- The mp4 drives `kitProgress` / `kitProgressSet` with a synthetic repaint loop (the real lifeGate needs a slow network + a real life change); the test drives the three real paint functions through test hooks (`KLIFE.paint / cover`, `KLOAD.paintHook`). Not run: a real throttled-network life change on a device.
- «Forward-only» is honest, not fake progress: when the total keeps growing the bar holds its best value (a plateau) and the sheen keeps moving; it does not creep by itself.
