# kit-sweep-r1 — PASS 3b9c6976 (review/kit-sweep-r1, descends from origin/main 0a311183)
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
