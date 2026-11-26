# KHO CLEANUP 26/11 (sonnet worker, Foreman D)

PRIORITY #1 CHECK: STATUS/CLAIMS/HANDOVER/takeovers cleanup 170cc486 done earlier; this job only touches >100 KB dumps; claims none.

## Result
- dev/handover before: 8058 files, 1879 MB. After: 6860 files, 569 MB. Moved 1198 files, 1310 MB (about 70 %).
- Archive branch: `archive/handover-dumps-2611`, tip `8b60b9b86a04689f511d22e2dbdcbfba844266ec` (same paths as on the handover branch). Verified before any removal: the tree on the remote lists all 1198 files with identical blob ids.
- Removal commits on the handover branch (one per top folder, plain push, no force): refs 38365fbb, review-sheets 13685ebc, robot b0e101f4, shots 2b5bbae8.
- Restore one file: `git show archive/handover-dumps-2611:<path> > <path>` (or `git fetch origin archive/handover-dumps-2611` first).

## Kept vs moved (files over 100 KB only; small files were left in place)
| top folder | moved files | moved MB | kept files | kept MB |
|---|---|---|---|---|
| refs | 5 | 8 | 51 | 71 |
| review-sheets | 923 | 1057 | 74 | 53 |
| robot | 165 | 196 | 312 | 320 |
| shots | 105 | 49 | 58 | 27 |
| content, reports, fixtures, face-master03, prompts_L2095, status docs | 0 | 0 | 78 | about 28 |

## Rules used
1. Age: last commit touching the file (history fetched `--shallow-since=2026-11-23`; files whose newest touch is the 23/11 boundary are at least 3 days old). A unit (folder, or flat file) with any file touched in the last 48 h = KEEP whole unit. This keeps every robot/rerun-*, robot/stuck, robot/m2, m4, flight2-*, coop-*, thd-*, bd-*, pf-*, review folders etc.
2. Citation: a unit named in CLAIMS, any FOREMAN_*_STATUS, HANDOVER*, TAKEOVER*, WORKLIST, OWNER_LEDGER, or in a file touched in the last 48 h = KEEP when the citer is a status/claim/handover doc. Cited only by an old report (robot-audit-D, kit-woodskin ...) = MOVE (the report text stays; the evidence is on the archive branch).
3. content, reports, briefs, fixtures, prompts, face-master03 = never moved (docs, not dumps).
4. No code under dev/test, dev/tools, dev/build, dev/measure, nor origin/main references the moved paths (git grep checked for nc-B-tuc, nc-B-vuong, robot/ncA).

## Moved (units)
- robot: nc-B-vuong (90 MB), ncA (85 MB), round-nc-20261124, flat 24/11 round files (bd-bd_san R7, cnv R3/R4, pf-0256).
- review-sheets: old art contact sheets (rank8-t78, thu_*, place-rank except cited, maid_*, palettes-season, hair_table ...).
- shots: stage-rightcol, bongloc-options, map-labels-missing, person-minigame-acts and other old shots.
- refs: 5 files (owner reference images).

## Kept on purpose (examples)
robot/nc-B-tuc (cited by FOREMAN_B_STATUS, save-growth fixture README; used as repro save), robot/rerun-cnv-cnv_chu HANG ckpt, robot/stuck/E-S1-freeze-kitNoUnkDom, rerun-cnv-cnv_ma hang.json, all robot/rerun-*, review-sheets/approved and place-rank (cited by FOREMAN_C/D STATUS), shots/map-zones, leave-palace, titles2-r (cited by CLAIMS/STATUS), fixtures/save-growth.

## Not checked
Open `review/*` branches (about 2500 refs) were not grepped one by one; only the handover branch docs, CLAIMS and STATUS files were used. If a review branch needs a moved file, restore it with the command above.
