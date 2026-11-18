PRIORITY #1 CHECK ('90 nhân vật nữ'): OD L1924–1926 | ledger 0 | main 0 | review/* 0 | claims doc-90-women (this worker)
# doc-90-women — one pool «90 nhân vật nữ» (CANON OVERWRITE, law 14 / law 11)

Canon: 84 painted women (one face each, player included, full rank ladder each) + 6 princesses painted separately. Internal ids c01–c32 / m01–m52 stay (code identifiers untouched).

Scan: `git grep -n -i -E "32 phi tần|52 cung nữ|32 cung nữ|32 consort|52 maid|84 faces|84 mặt|32 phi|52 cung|consort set|maid set|\b84 face" -- . ':!dev/archive' ':!dev/OWNER_DECISIONS.md'` on origin/main 790cda5 and handover dcbf5c1.

## Main side — review/doc-90-women (commit 5782008, comments/docs only, no behaviour change; index.html mirrors the same j*.js comment edits, assemble not re-run)
Files edited: dev/HANDOFF_MAIN.md, PROGRESS_face84/mk-colour/player-dress/rank0-ivory/trung_y, dev/kit/KIT.md (871, 1013, 1241), dev/figwork/{HUADIAN.md,PROGRESS_C.md,PROGRESS.md,spec6.py}, dev/art/mkfit/on-upload.sh, dev/test/{anchor-table.py,fig-rank-audit.js,staff-cap-apply.js}, dev/build/{j39,j66,j86,j88,jpromo,jtoil}.js, index.html (same comments). Full per-line old→new: `git diff 790cda5 5782008`.
## Handover side (pushed directly)
dev/HANDOFF_MAIN.md:31 (old "Face pool = 84 women…32 consorts + 52 maids" → one pool «90 nhân vật nữ»); rules/topic/art-faces-figures.md:39 [OD:L8]; rules/topic/art-costumes.md L97/L206/L209/L211/L214; kit/KIT.md:474 (facePool); art/FIGURE_GATE.md:35,123; art/t8-prompt-B/test_low_all.py; PROGRESS_face84.md:1,7; briefs b10-a26-a36, b10-pose-eyes, new-faces-sample, phoenix-t1t6-fix; reports art-matrix (4 lines), staff-cap-table (2). Wording used: "84 painted women (ids c01–c32 + m01–m52)" or "faces c01–c32" where a past job only covered those ids.

## Final scan
Main: 0 live hits (the 2 remaining matches are the false positive "384x384 face-square", jlooks.js:67 / index.html:73479).
Handover: remaining hits are all HISTORY/generated, left untouched: FOREMAN_B/C_STATUS, HANDOVER_1115*, HANDOVER_SESSION9, AGENTS_SESSION6, TAKEOVER_FOREMAN_C_ROOT*, dev/review/LOG.md, dated reports (consort-live-audit, fig-cutout-clean/*, fig-style-audit, owner-bug-sweep, npc-roads, states-sample, staff-cap-apply, kit-fit-r3-r1, rank-vankien-sample, foreign-princess-samples, phoenix-t1t6-fix, trung-y-review), rules/topic/handover-restatements.md:193 (verbatim dated restatement), briefs/doc-90-women.md (quotes the old split on purpose), generated dev/index.html + index.html + dev/build/all.js + stale j86/j88 copies (regenerated from main).

## Flags for review (NOT changed — behaviour / owner decisions)
1. j88 `facePool("maid"/"all")` + j86 picker still FILTER by life (cung nữ life sees m01–m52 only). Owner canon = one pool. Comments now say so; dropping the filter is a code task (own brief).
2. Player-visible: filter chips "Phi tần / Cung nữ" in the picker (old KIT.md:474) — verify no visible chips remain (rank words themselves are fine). No new player-visible text added.
3. Identifier names FIGIX.consort / FIGIX.maid / figKey "consort:" / "maid:" and CDN file names fig-consort-cNN / fig-maid-mNN are live identifiers — not renamed (list only).
4. Rank-ladder art for the m-ids "consort dress art" is stated as complete in the logs (F88_NEED_C); art-matrix says Thái hậu/Nữ đế tiers + foreign princesses are the only holes.
