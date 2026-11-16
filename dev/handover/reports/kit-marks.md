# kit-marks report (worker kit-marks, owner kit review 16/11 15:00Z + 15:10Z) — branch review/kit-marks

Base origin/main 5682ce6f. Sample sheets (755x1000@2, before above after, one image per 1–2 items): `dev/handover/reports/kit-marks/sample-1a…6b-*.jpg` (script: `dev/test/kit-marks-sheet.js` + `kit-marks-compose.py`). The 1180x820 variant of the same script works with the size argument (not regenerated).
Scope respected: nothing touched in sizes / frames / action buttons (review/kit-size); no art.

## Done (all KIT-first: shared parts only, KIT.md §83 + §49.1 + §52 + §36.3 overwritten in place, kit page samples)
| item | what | where |
|---|---|---|
| a 2.4 | Hoàng thượng + Thái hậu = imperial gold everywhere (`KIT_ROLE.emp/th`, j1); a person whose name IS the title is painted as a title (`kitNameRank`, jk4) — the black "Hoàng thượng" is gone | j1, jk4 |
| b 2.6 | text lines: rank + name = SAME tone (`kitNameTone` → `--rtn`, j79); paintings keep the stage rule | j79 |
| c 4.5 | ONE bare ink-brush ✓/✗: `kitMark` / `kitMarkPaint` (every typed ✓ ✗ ✔ ✘ wrapped, textContent unchanged); kitChecks without circles | j79, jtabs |
| d 4.6–4.8 | ONE relation component `kitRel2` (§49.1): TWO column boxes, left that person → me, right me → that person; short words; no bars; Hiện nay / Tuần này aligned inside each box. Callers (all): Ân oán pair `relRows` (jhc), week-book person page (j87 via kitRelTable), person-card "Lòng người với ta" (pcfRel), Gia tộc card (jkc), kit samples §49.1/§52/§73. `kitRelRow`/`kitRelBar` + bars retired | jkrel, jhc, jkc |
| e 4.11 | the boxes around +3 / −3 were the sample's demo `.btn` triggers → bare text links; rule written in KIT 83.4 (real stat cells never had boxes; delta = glow only) | jstatfx |
| f 5.2 | KẾT QUẢ seal amber-orange | p1.html |
| g 5.6 | place icon above the name (map chips, tiles, stage title) | jact |
| h 5.3/5.4 | ONE `kitGradeChip` with two sizes (normal / sm) — documented on its sample with where+size; 5.4 kitGloom labelled "demotion scene" | jkrev, jpromo |
| i | samples 2.2 (§36.4) and 3.6 (§73) render (demo faces / demo rows when no game is open); samples may carry `where:` text (where used + size) | jhcpor, jpcf, jkitpage |
| s18 req | `.kbtn.kdanger` + `kitConfirm({title,lines,yes,no,type,onYes,onNo})` = KIT 83.9 → "KIT READY: danger button + kitConfirm" | j79 |
| s18 req | KIT number clash §72 verified already resolved (§72 tutorial, §75 kitBackBtnHtml); KIT_NUMBERS.md: §83 registered, next free 84 | KIT_NUMBERS |
| s18 req | K3 check: kit page §8 pop-up sample is registered (real `kitModal`) | jkitpage |
| part 2 7.2 | round mood mark on picture corners bigger (clamp 46px/24 %/88px; thumb 52 %) | jk2b |

## Not done / for the coordinator
- Part 2 "broken samples 6.4, 7.7, 8.4–8.7, 8.9": without a running game five samples read game state (§58, §58.1, §58.3 kitMonthCal, §28.13e shop pick tile, §76 kitPalaceMap). The kit page now shows a clear "open #kit while playing" note instead of a red error (kit-page.js passes 0 errors at 3 sizes), but they are NOT drawn without a game. A real fix = give the kit page a demo state (S) — needs the owner of those parts. The catalogue numbers 6.4/7.7/8.x were not mapped to ids (scratch script not in repo).
- The ✓ "mút mực" the game used earlier could not be found in the (shallow) git history; the brush tick/cross are new strokes in that spirit — owner to confirm the look.
- Gold on paper: tone floor stays the owner's 3.6:1 (OD 11/16 13:00Z, vivid); emp #a37600 3.69, Thái hậu #ab7500 3.60. A 4.5 floor would grey the whole palette ("nhạt nhòa"). Say if she wants 4.5 for these two only.
- Other kitChip "ok/no" status chips keep their pill (they carry a ✓/✗ brush mark now).

## Tests (urls = dev/_t.html built from the branch, http.server)
- kit-page.js 755x1000@2, 1180x820@2, 844x390@3: 0 bad, 0 page errors (64 samples). kit-sample-probe.js: 0 empty.
- kit-conform.js 755x1000: CONFORMS 90 / MISSING 15 — identical to main (no regression).
- rank-title.js (kit,day,dp) / title-tag-r1.js: ran, no errors reported (summary tables not diffed).
- tab-pairs.js: could NOT run on a `_t.html` build (needs the rot.js site root: `bash dev/site/build_site.sh` + sw-serve); game-feel.js (old save) started, result in /tmp (not captured) → coordinator/reviewer please run both on the built site.
- Dark-row legibility (§48.1): the "on a painting" rows now sit on a real painting + a separate night-panel row; the old flat navy row (doubled glow) is gone.

## Handover (worker rollover, if needed)
Branch review/kit-marks, all code pushed. Remaining: tests game-feel (old save) and tab-pairs not yet run (they need a game server: `node dev/test/sw-serve.js 8955 <root>`), final "SẴN SÀNG KIỂM <sha>" to main.
