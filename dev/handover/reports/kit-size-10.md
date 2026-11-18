# kit-size-10 — timed-choice clock chip stays on screen (kit keeper, sonnet)
Branch review/kit-size-10 @ **8ab00ede** (from live main 744b80e7). START_CTX ≈ 3 % of the window (own estimate); no rollover needed. Reports to main s27.

## Root cause (not only the chip)
night-final KIT REQUEST: the flip-choice dialog put the question + §69 clock chip below the option cards. Reproduced on main with the same dialog at 412x1058 (chip y 971–990 in a 285–777 body) and 390x844 (y 1298). Cause: `.kdpall` (jk4 §32.5, whole right column scrolls) forces `grid-template-rows` to 2 rows and puts `.opts` in row 2; a dialog with a picture band (`.kdpbanner`) has 3 rows (band, text, options), so the text fell into an implicit row 3 below the options. Whole family = every banner + figure event dialog that goes `kdpall`, with or without a clock (the no-chip variant failed the same way).

## Change (one place)
- jk4.js `#kit-dp-all`: `.kdper.kdpall.kdpbanner>#mb{rows: max-content ×3}` + `.opts{grid-row:3}` (KIT §32.5c). No caller CSS; jnf only puts `kitCoopClock` in the text.
- KIT.md: §32.5c + §69.4; KIT_REQUESTS.md: request closed. Kit sample page §8 button "VIỆC CÓ ĐỒNG HỒ" (jkitpage `kitPopSample("timed")`, demo numbers `BAL.kitpage.clock` in jbal.js).
- New test `dev/test/timed-choice-fit.js` (12 cases: 4 sizes × sample / 2 options / no chip): text above options, chip inside screen and dialog body without scrolling.

## Results
| check | result |
|---|---|
| timed-choice-fit on main 744b80e7 build | FAIL 10/12 (before) |
| timed-choice-fit on this sha | OK 12/12 (after): chip y 574 (755x1000), 603 (412x1058), 484 (1180x820), 516 (390x844), all inside the body |
| kit-conform at 755x1000, 1180x820, 412x1058, 390x844 | MIXED 0 / CUSTOM 0, floats none (CONFORMS 90/91/90/90; MISSING 13–14 = same as main) |
| quickcheck.sh (incl. core gates, time-spill, old save, perf) | PASS |
| shots (scratch, not in git) | looked at all 4 sizes: question, chip, then cards; figure column pinned |

## Notes for the coordinator
- Limit: the chip is above the options at the top of the column; if the player scrolls down to the last card it scrolls off with the text. Not pinned (a grid item cannot stick across rows without a DOM move).
- Seen, NOT changed (out of scope, portrait ≤ 420 px shows the rotate prompt per OD:L339): at 412 / 390 the option cards squeeze their title to one letter per line (right column ~220 px).
- night-final: after merging this, jnf needs nothing; re-run its Fold shot. Its `showChoice` can keep `<p class="nfcd">${kitCoopClock(..)}</p>`.
