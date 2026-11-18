# merge-train-6

Branch review/merge-train-6 @ e9c6021d, descends from origin/main b85cdb1e

## IN (11), each at its PASS sha (checked against review-<name>.md)
1. econ-items-r1 eed75e7 (D6)  2. luxury-r1 a84d31c (D17)  3. toil-react-r1 75bd0eb (D27)  4. pcard-dislikes-r1 3b2e15e (C35b)
5. coop-invite-ux-r1 727b611 (C43)  6. dlg-fig-ph-r1 fd7768b (D50)  7. row-align-r2 69e6d56  8. origins-r1 968ed00 (D18)  9. memories-r1 99c0695 (D26)
11. balance-pass-r1 89ea80f (owner Q6 = option 2: merged AS IS, no BAL tuning; conflicts: jbal birthAdd 4->2 kept with main's wkFinCap, jecon dutySkip duc:0 kept with main's home.bd:20)
10. cycle-art-r1 74f96d6 (added after train-4 landed; conflicts: jevban KIT_DLGMAP got "cyrep" added to main's line, jopic option rules both kept)

## DEFERRED
None.

## Conflicts and resolution
- index.html, sw.js, assets.json: never hand-merged; took ours, rebuilt after the last merge.
- dev/build/assemble.py: union of module lists by script (new modules inserted after their predecessor). Added: jeitem, jlux, jtoilr, jdis, jorigins, jmem (+ main's jhouse, jtd, jtrong, jtds, jwkpics, jpdlg).
- dev/build/jcooptimer.js (coop-invite-ux vs main's close-X + Tạm dừng panel): kept main's kitCoopFriendPanel line, added the branch's kitCoopSteps block.
- dev/kit/KIT.md: kept both (§69.3 invite guide before §78).
- No other source conflicts.

## Other conflicts on main 92668096
- jbal2.js: kept both (BAL.dis + BAL.col). jtabs.js ktStoryHTML: main's chapInline + data-chap chips with the branch's fin/finIn row.

## Extra commit
- dev/test/econ-items.js: main's card flip now ends with the kit scene-end button (no auto-close), so the chest reveal queues behind it; the test taps `.kmend` until #kmrew shows. Harness only, no game code.

## Tests (final build, 755x1000@2 and 1180x820@2, local static server)
- econ-items, toil-react, pcard-dislikes, origins, memories, dlg-fig-scan, luxury: PASS, no page errors. (econ-items PASS after the harness fix above.)
- kit-table: 0 fails at both sizes (1439 / 1469 lists). kit-conform: no non-conforming dialog (755: CONFORMS 82 / MISSING 15 = dialogs the scan could not open; same two-category result both sizes).
- boot-flash x5 per size: exit 0, 0 skeleton states before ready.
- coop-invite-ux: PASS. coop-e2e (live Worker): 59/59 most runs. FLAKY: 1 failure in about 3 runs, a different check each time ("#next enabled", "friend starts as Người lạ"); the same flake happens on clean origin/main 399483e3 (1 of 3 runs failed), so it is not from this train.
- pcard-dislikes at 755x1000 failed its 4 gift checks in 2 of 4 runs inside the suite and passed 5 of 5 standalone (random gift item); flaky test, not a game bug.

## Re-test on 7d6d3514
All suite runs exit 0 at both sizes: kit-table 0 fails, pcard-dislikes ALL PASS, econ-items PASS, coop-e2e 59/59, boot x5, cycle.js ALL OK (755x1000, 1180x820).

## Final re-test on e9c6021d (main b85cdb1e: mortality, night-end, promo-skip live)
Both sizes: all suite items exit 0 incl. promo-exam 20/20, opt-render (no errors), coop-e2e 59/59, kit-table 0 fails, cycle ALL OK, boot x5. jbal2 conflict: kept BAL.dis + mortality block. promo-rules chest/reveal FAILs are the known main regression (not run in this train).
