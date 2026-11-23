# KIT-BODY-MERGE review (reviewer, sonnet, SMALL kit tier) — worker report lives on review/kit-body-fit-merge

## REVIEW
PRIORITY #1 CHECK: brief m108-review-kit-body-fit-merge read; reuse: kit-body-fit.js, dev/measure/body-fit/body-fit.json; nothing rebuilt.
Laws touched: 4 (no new number), 9/11 (one rows() path), 12 (Fold + iPad).

**PASS bda5b75bfa864bf673e745886abbac5cba30bc82**

1. Scope: diff vs d2cc5679 = dev/build/jbody.js (+8/-2), dev/kit/KIT.md (§28.8e text), built index.html + sw.js, worker report. No other caller changed; every reader of fit/A (rect/style/vars/img/want/flush/debug*) goes through rows(). `fit` always becomes {} on fetch failure (load()), so rows() cannot wait forever on the json. No new numbers.
2. Tests (local server, CDN pictures, node dev/test/kit-body-fit.js):
| run | size | A | B hidden | C | errs |
|---|---|---|---|---|---|
| HEAD, no json | 755x1000@2 | ok 48/48 | 0 | ok 2 layers | 0 |
| HEAD, no json | 1180x820@2 | ok 48/48 | 0 | ok 2 layers | 0 |
| HEAD, with json | 755x1000@2 | ok 48/48 | 0 | ok | 0 |
| HEAD, with json | 1180x820@2 | ok 48/48 | 0 | ok | 0 |
Caveat: at 1180x820 the B check also prints `h-overflow 40` (kit page scrollWidth) with AND without json. The PARENT d2cc5679 shows the identical `h-overflow 40`, so it is not caused by this branch (probably my container's fonts; worker reported 0). Not a body-fit fault; MAIN may want to re-check on a real iPad build.
Could not reproduce the BEFORE failure on the parent with json (parent passed A 48/48 at Fold here): the bug is a load-timing race, my CDN timing happened to land the measure first. The code reading (rows() returned the partial json row alone before the measure) supports the fix.
3. LOOKED (Fold + iPad, with json, §28.8e sample): consort, maid, eunuch, official, emperor, kid + portrait — hair/head/chest/waist/sleeves/skirt/hem all sit on the body, waist box now sits with the other seven. Gap: my in-game stage shot captured only the title screen, so a live consort + maid scene was NOT separately looked at (test C numeric check passes: layers 0 px off their zone). quickcheck not re-run by me; worker reports PASS on the built sha.
4. Kit consistency: one rows() source, no per-screen variant; KIT.md §28.8e text matches the code (override merge, null-wait rules).
Shots: scratch only, none in git.
