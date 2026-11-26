# PROGRESS — review/test-path-fix (F TEST-PATH FIXER, order FROM MAIN 134, 11/25/2026)

PRIORITY #1 CHECK: OD 0 | ledger 4 | claims 8 (none on these test faults; claimed by Foreman F #6) | main 15 (dev/test/toilette.js, toil-overlay.js, hoa-dien.js exist — FIXED in place, not rewritten) | review/* 2 (robot-realtap: realtap.js reused as is) | archive 0.
Base: origin/main 008aa59b. Branch: review/test-path-fix. Only test files + this doc; **game code unchanged**.

## Root causes (all three = test side; one game-side candidate found on the way)
| # | Reported | Root cause | Test or game | Fix |
|---|---|---|---|---|
| 1 | toilette.js Fold+iPad «timeout waiting #kg82 .toilw» | Since ui-leftover-fold MG12 the toilette opens on the kit RULES screen first (kgReady, «Sẵn sàng» = `#toilrdy`), the dress (`.toilw`) comes only after that tap. The test clicked the chip and waited for `.toilw` straight away. Reproduced on 755x1000 and 1180x820 (screenshot of the stuck state = the rules/dress flow reaches `.toilw` once `#toilrdy` is tapped). | TEST (stale after MG12) | Tap `#toilrdy` like a player. Also: the palette step hard-coded swatches `dotham/tuvi/thanhdai`, but the palette only offers what she OWNS (4 of 4 per row here) → second stale selector; now taps the wanted swatch if present, else the first of the row. |
| 2 | toil-overlay 1/33 «mefig hidden» | The check «layer must be gone» counted ANY shown `.kfxf`. With `#mefig` hidden the only remaining layer is the 29 px head avatar (`.kpor` in `.kin`), which is a different picture of her and correctly keeps its own layer on its own picture (the scan already proves that). Probe: layers after hide = `[kpor kporz kfxon (display block, w29), mefig (display none, w0)]`. | TEST (wrong assertion) | Assert that no shown layer is on `#mefig`; the scan reports the picture id of every shown layer. Also the test overwrote the game's own inline `translate/scale/display` of `#mefig` with `''` — now restores the original values. |
| 3 | hoa-dien hangs (SANSANG: «LC13 hang = charset-less local server») | NOT reproducible. A charset-less static server (`Content-Type: text/html`, no charset, plain node server, same as python `http.server`) is harmless: the built `index.html` carries `<meta charset="utf-8">` in its first bytes, and there are no external scripts. hoa-dien 39/39 ok on 755x1000 (mouse + `TOUCH=1`) and 1180x820 on that server in ~65 s. The only hang evidence is machine load (PROGRESS_toilette: «load 41–50 on 4 CPUs, one toilette.js size took ~10 min»; every wait is 180 s, 20 start() retries × 120 s). | TEST ENVIRONMENT (load), not game, not charset | Added a WATCHDOG to the three tests (no finish in `TEST_BUDGET_MS`, default 15 min → prints `WATCHDOG …`, exit 3) so a hung run fails loudly instead of hanging the queue. hoa-dien itself already handled `#toilrdy`. |

## Owner rule 25/11 ~05:10Z — real taps
toilette.js, toil-overlay.js, hoa-dien.js, mk-e2e.js now act ONLY through `dev/test/realtap.js` (copied unchanged from review/robot-realtap 3567b906: scroll like a person → `elementFromPoint` hit-check → `touchscreen.tap` / `mouse.click`): chip, «Sẵn sàng», «Mặc bộ này», «Điểm trang», each swatch, «Vào soi gương», «Tiếp», «Dán», hoa điền pick, scene-end / reveal, «Xong», the Tư trang tab, token taps, the focus ✕. A covered/off-screen button logs `DEAD BUTTON` (+ shot to `$SHOTS`) and fails the test (toilette, hoa-dien) or is reported (overlay, see finding G1). Still driven by the page: pointer drags/holds (kẻ mày, đánh phấn, chấm son = real mouse/CDP-touch moves, as before), the «Thử tay» section of hoa-dien opens `kg82Play('hoadien')` by function (its UI route is a different screen, not a button of this family).
New small lib: `dev/test/lib/toilrules.js` (`passRules(p, rt)` = wait for `#toilrdy`, real-tap it) used by toilette-family tests.

## Whole-family scan (law 11) — `python3 -I dev/test/scan-test-path.py`
Counts per `dev/test/**/*.js`: JSCLICK (machine clicks), PWCLICK (Playwright `p.click`), NORULES (opens the toilette / waits `.toilw` with no rules-screen step), SRV (own static server w/o charset), REALTAP.
| scope | JSCLICK | PWCLICK | NORULES files | SRV files | REALTAP files |
|---|---|---|---|---|---|
| BEFORE, the 3 reported tests | 8 | 15 | 1 (toilette) | 0 | 0 |
| AFTER, the 3 reported tests | 0 real (2 = the words «never el.click()» inside my comments) | 0 | 0 | 0 | 3 |
| BEFORE, all 466 test files | 1020 | 91 | 11 | 24 | 4 |
| AFTER, all 467 test files | 1020 | 83 | 9 | 24 | 7 |
NORULES family (same fault as #1, the tests that open the toilette): fixed **mk-e2e.js** (chip → «Sẵn sàng» → dress, all its actions now real taps) and **bag-inline-pickers.js** (toilOpen → rules tap). The other 9 flagged files (dayq-hold, dayq-hold-coop, makeup-theme, makeup-lux, mg-skip, toil-draw, look-fx-mirror, monthly-allotment, monthly-ration-shots) were READ, not run: they call the function chain (`toilColUI`, `toilMakeup`, `tsMkSit`) or loop on `.kg82act button`, so none waits for `.toilw` behind the rules screen; they are NOT blocked, but they are function-driven (JSCLICK) — converting the remaining 1020 machine clicks and 24 servers is the review/robot-realtap family, not this order. SRV: **not causal** (see #3); no mass edit.

## Open finding G1 (GAME candidate, for Foreman F / main — not fixed here)
With real taps, toil-overlay on **Fold 755x1000** reports `DEAD BUTTON` on the maid token (`#tokens .tok`, «Cung nữ thân…») after 3–4 open/close cycles of the focus scene (tap token → focus `.kfoc` → ✕): hit-test cover = `img#mefig.j59sz.kfxon`. Measured (probe, test's own start state): token x=570..741 y=284, `#mefig` x=547..756 y=272 — her figure sits on top of the token in the j59 slot layout, the token cannot be tapped by a person (the old DOM `.click()` hid it). On **iPad 1180x820** 0 dead / 27 taps. Whether it also happens in clean play (the test injects `S.toilette` + `render()`, clears Q/modal) is NOT proven: a clean-play probe stalled on the new-life modal (`nlcard`, buttons below the fold, scroll area). Overlay exit code stays 0 on dead tokens (the overlay assertion is the layer check); `STRICT_DEAD=1` makes dead tokens fail. Needs the owner-visible check on a Fold, or a game worker on j59 slot z-order.

## Results (real taps, built root index.html, charset-less node server, `ctmload` aborted, SW blocked)
Final run (after all edits, DPR 2): every cell = exit code / verdict.
| test | Fold 755x1000@2 | iPad 1180x820@2 |
|---|---|---|
| toilette.js (real taps) | rc 0, 0 errors, no overflow | rc 0, 0 errors, no overflow |
| toil-overlay.js (real taps) | rc 0 · 33 checks, 0 bad · DEAD tokens 7 (finding G1) | rc 0 · 33 checks, 0 bad · DEAD 0, 27 taps |
| hoa-dien.js (real taps) | rc 0, 39/39 ok | rc 0, 39/39 ok |
Extra (charset-less server): hoa-dien 755x1000 mouse, 755x1000 `TOUCH=1` (second run; first run had one non-registering Dán tap in the miss sitting, original test passed touch once — now a counted RETAP, printed as a note), 1180x820 — all green.
**mk-e2e.js (not in the order, family member of #1): still FAILS, at a second stale selector.** It now passes chip → «Sẵn sàng» → dress → «Mặc bộ này» → «Điểm trang» with real taps, then dies at `#kg82 [data-kswtr="pre-dep"][data-kswti="daohoa"]` (the «Đào hoa» preset row `pre-dep` is not in the palette any more; it offers the owned colours only). Needs the preset flow of the current palette; left for the coordinator (before this branch it hung earlier, at `.toilw`).

## Files
dev/test/toilette.js, toil-overlay.js, hoa-dien.js, mk-e2e.js, bag-inline-pickers.js (edited) · dev/test/realtap.js (from review/robot-realtap) · dev/test/lib/toilrules.js, dev/test/scan-test-path.py (new) · this file.
