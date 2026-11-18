# review place-stage r5b — PASS 5ae28ddb (depth 5, SMALL UI reviewer)
PRIORITY #1 CHECK ('place-stage'): OD 5 | ledger 0 | claims 0 | main 0 | review/* 1 (review/place-stage 48e61b6) | reuse: nothing rebuilt.
Reviewed 48e61b6 (A1: marker on head, KIT_FIG.h .79, band 70, gold glow, seal at ONE fixed offset). FINAL MERGE done: origin/main 09b1bba merged (only index.html/sw.js conflicted -> rebuilt with assemble.py + build_site.sh, img-allowlist OK, no markers left). Worker pushed an identical-tree merge meanwhile: review/place-stage = 5ae28ddb (git diff vs my local merge 952a81e5 is empty; origin/main 09b1bba is its ancestor); I did not force-push.
TESTS
- place-stage-scan.js (HH=1 PET=cho TITLE=s8 EXTRA=2) 18 places x fold + ipadAir on the MERGED tree: 36 cells, 0 page errors; figH 453 everywhere; markAt head, marker in frame, bounce top >= 12.3; tag bottom gap 11 (>=6), tag in frame, no tag/tag or marker/tag overlap; all seals inside frame at dx .194 / mirrored -.175..-.183, dy .915-.917; no entry-chip hits. (ipadPro/pixel/iphone14 were 0-flag on the worker's pre-merge run; merge only added coop files.)
- quickcheck --runs 2 on committed merged tree: CORE GATES PASS (one-core, rules-one-source, kit-conform, coop-one-world, hooks 4; 263 s), TIME-SPILL PASS, open 1785 ms 0 errors, old save loads, 0 errors. G3 flake did not occur.
- Kit consistency: marker/seal/tag are the single kit parts (jmark.js, jfigseal.js, jkit.js); same relative spot on Hoang hau and maid in every place; no custom chip/frame found.
SHOTS (scratch, LOOKED; fold 755x1000@2, ipadAir 1180x820@2): Ngu hoa vien 4 people iPad = 4 fixed columns, count chip 4, marker on head, seal beside head at same relative spot, pet at feet, title pill; Fold 2 people clean; iPad Canh Phuc cung (11 people) clean. Note: first place in a scan run shows the title-collection popup (scan artifact, not a defect); re-run with that place second was clean.
NOT RUN: stage-tag-contrast.py (harness page timeout, same as worker; tag colours untouched).
Open owner call (not a defect): at the 601 px stage figH 453 (worker's SIZE NOTE: .74 would give 501 px literally).
VERDICT: PASS 5ae28ddb. No images were uploaded to the CDN by me (nothing to wipe; worker's img/_review/place-stage/ still needs wiping after main stamps).
~97% xong / chờ main FF
