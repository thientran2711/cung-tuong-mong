# kit-sweep-r1 — PASS 0c23da403 (review/kit-sweep-r1 = kit-sweep + pcard-actrow-r1 + origin/main feba37e5b; descends from main)
Merge: review/kit-sweep 3e75a7f3 + origin/main 0a311183; only index.html conflicted, site rebuilt (build_site.sh). No reviewer code changes.
Results (details in dev/PROGRESS_kit-sweep-r1.md on the branch):
- kit-conform at 755x1000, 1000x755, 1180x820, 1366x1024, 844x390: 0 CUSTOM, no floats over the tabs. MIXED 5-6 per size, all "generic picture on a person option" (evpick, plantsv, j70thr, night2) = person pickers owned by pcard-actrow (not part of this branch). MISSING 14-17 = states a random life cannot open (varies run to run).
- panel-size: identical numbers to origin/main (checked 1000x755, 390x844); exit 1 is pre-existing (390/412 widths 362/359, 384/379; plantpick button out; intel waste), owned by kpanel-compact. No regression.
- stage-rail PASS (4 sizes). coop-e2e 59/59 on the live worker. At world start: #kctm clock strip gone on both seats; friend chip in the header still shows status + countdown ("Đang làm việc / Còn 4:57"), looked at fold + iPad screenshots.
- ?khost=1 host mode boots at all 6 sizes, rotate prompt at 390x844 (host and direct), no page errors, no horizontal scroll.
- Viewed place cards (T2, picture left, kit rows right, same on all places seen) and the item card (kit panel, header seal + ✕) at 755x1000 and 844x390.
- modal-scroll: no such script in this tree; not run.
Notes for kit numbers: no new KIT section numbers in this branch; §76 stays reserved for kit-sweep, §77 is stage rail (live). Open: at 844x390 the place card body is taller than the frame (options below the fold) — sizing belongs to kpanel-compact §8.1. Item card name has an inline grade-colour style in the kit header (minor).
Coordinator can fast-forward main to 3b9c6976 (check main has not moved first; if it has, re-merge and rebuild index.html/sw.js/assets.json).

## ROUND 2 (supersedes the sha above): pcard-actrow-r1 merged too, on main feba37e5b
- Merged review/pcard-actrow-r1 db77f3f3b (+ main 02a0d3f10, c4e89f89b, feba37e5b). Conflicts only in generated files (rebuilt) and dev/test/kit-conform.js (add/add: kept kit-sweep's newer copy). The two do not clash in the sources (person cards / long rows).
- Reviewer fix in kit-conform.js: the person-option rule flagged the person pickers' portraits (.kopface, /por- pictures) and act options inside T3 person dialogs (j70thr, night2: the person is already the figure column). Now accepts both. After that: 0 MIXED, 0 CUSTOM, no floats at 755x1000 / 1000x755 / 1180x820 / 1366x1024 / 844x390 (last run 755x1000, 844x390, 1180x820 on the final sha; the other two on the pre-final merge). MISSING 14-17 = states a random life cannot open.
- pcard-actrow.js: all scenes PASS (5 sizes on the pre-final merge, 1180x820 on the final). panel-size same as main, plantpick button-out now gone. stage-rail PASS. coop-e2e 59/59 (pre-final merge). Host (?khost=1) + direct boot, rotate prompt at 390x844, no page errors.
- Main moved 4 times during this review (0a311183 -> 02a0d3f1 -> c4e89f89 -> feba37e5); if it moves again, re-merge and rebuild index.html/sw.js/assets.json only.
