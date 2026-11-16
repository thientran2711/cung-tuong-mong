# fig-cutout-code-r2 — reviewer verdict (session_01UV1SzjarPt7SUW9fAa9GFn, 16/11)
VERDICT: PASS 8fb59e05 (review/fig-cutout-code-r2 = origin/main f1509d7c + review/fig-cutout-code b01caedb, built, fast-forwardable). START_CTX ~10%.

## Merge notes
- index.html/sw.js/assets.json: took main, rebuilt (twice, main moved to f1509d7c meanwhile).
- jk4.js REAL conflict in kitDpFit: main's KIT 32.2b equal-gap code (kitFrameLines, gl/gA/gG/yTop/floor) vs the branch's `floor=H-2`. Resolved by hand: H = visible column height (min of col.clientHeight and #mb bottom minus its padding), `cut` = the clipped part is added to gl.offBot, then main's 32.2b formula runs unchanged on the visible H (floor = min(H, H+offBot-gG)). Foreman: re-check this merge line once if you rework 32.2b.
- review/stage-figsize (d6b79f99): touches j59, jk3, jkit, jkitpage, jplfs, jpm, jrail, KIT.md only. NO jk4.js lines -> no overlap with this change.

## Checks (all shots looked at; scratch only, none in git)
1. Feet vs visible #mb bottom, own probe (cold context per run, 3 runs x 1180x820, 1366x1024, 755x1000, 412x1058; dialogs: BÁO Nhập cung, person, two, many, man, child, evidence, visit): r2 and live both 0 cut, feet 22-24 px above the visible bottom, no jitter (figure top/height/column height identical over 1.5 s samples). The natural 3-of-4 timing bug did not repeat here (CDN images cached/loaded faster than on the owner's iPad).
2. Forced the bug (dialog height changed after the fit, 520 px, 1180x820): LIVE -> BÁO Nhập cung figure 900 px tall, feet 375 px below the visible bottom (cut). R2 -> ResizeObserver re-fit, feet back 24 px above the visible bottom, 0 cut. person/evidence dialogs unaffected on both (they do not overflow in this case).
3. Loop/jitter: 15 samples at 100 ms after settle = 1 distinct state in every dialog and size. Observer is capped (8 re-fits/s + one rAF pending).
4. Consistency: fix is in kitDpFit = the one kit fit for every .dlg.kdper (all person/figure dialogs); no per-dialog code. At 412x1058 the figure height varies run to run (225..439 px) on BOTH builds (image/HD twin load timing), not feet cut.
5. Perf quickcheck 8fb59e05: PASS open 986 ms, old save ok, render 282/302, tab 337/290, buổi 954/1014, tasks>200ms 11/12 (new/live). Earlier sha (pre-merge main): render 344/295, tab 368/350.
6. coop-e2e (runs against the LIVE Worker, flaky): r2 57/59, 53/59, 57/59, 59/59; live 59/59, 58/59. Failing steps change from run to run (A frozen when B left / week advance / reborn friend name) and live also fails one of its two runs. Nothing in the failing steps touches figures/dialog fit. Pass rate of r2 looked lower (3 of 4 runs with fails) but n is small, machine busy; fold/ipad had no page errors. If you want certainty, run coop-e2e once more on an idle box.
7. Not testable here: WebKit/iPad (only Chromium). Owner's iPad 1180x820 is the real test: open a BÁO Nhập cung, feet/shoes should show.

## Risks (gain vs loss)
- Observer re-fit while the user scrolls a long evidence panel: unlikely, small; capped 8/s, fit is cheap (same as the resize path).
- Merge line with 32.2b (above): rare, small, covered by the forced test.
GAIN > LOSS: one kit-level fix for the feet crop in every person dialog, no perf change measured.
