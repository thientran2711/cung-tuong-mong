# stage-pets-r1 — BIG review of review/stage-pets @ 872cbd52 (r5 + pl-courtyards-r2 9e1e99f4 + r6)

Reviewer s22 (session_01UV1Szj8KTxkyxcVCrbtnwZ), 11/16/2026. START_CTX ~3 %.
Branch: review/stage-pets-r1 @ cea021e3 = 872cbd52 merged onto origin/main 7b5e5e49 (+ 3 reviewer commits). Pushed. origin/main has since moved to 392fff60, so the next round must merge again.

## VERDICT: FAIL (1 item for the worker) + 3 reviewer fixes already on the branch

### FAIL
1. Phone landscape 844x390 (reviewer size list) regresses against main:
   - Her room: 3 people per view at 87 px body in a 190 px stage (main: 1 person at 123 px). People shrink (KIT 33.9 "never shrink"), and the leftmost figure and her name chip stand UNDER the left rail (#krail).
   - Ngự hoa viên painting: 6 per view at 126 px (stage 193 px), her figure under the left rail.
   - Cause in j59: `leftFor` reserves only #kshL, never #krail (KIT 33.11 says people use the free width BETWEEN rail and column); N is chosen by width before the name band is measured, and wrapped names in narrow slots then cut the height.
   - Note: review/stage-pets-r7 (6aaca31af, already pushed) replaces the slot logic (KIT 33.12 slot table, owner OD 19:54Z: clothing may overlap). Recheck this item on r7, not on r6.

### Reviewer fixes on review/stage-pets-r1 (carry them into r7, which is based on 872cbd52 and does not have them)
- jk3 `k3Shell`: closing a person card left the place painting WITHOUT the left rail, so the back-to-map button was gone (renderStage repainted the rail while k3pop still hid the stage). Now the rail is repainted when k3pop toggles. Checked on iPad 1180, 1366 and 844x390: the rail is back after ✕ and "Về Dư đồ" works.
- jk3 `k3RW`: on iPad the place painting had a 172 px side column, while her room, Dư đồ and the courtyard had 139 px. The painting spans the spread like the map leather, so the width now comes from the half page: 139 px on every level. KIT 33.11 text updated. Consistency scan after the fix: kshR is 139 px on room, map, courtyard, Thái y viện and Ngự hoa viên (iPad), and 172 px everywhere on Fold.
- Worker shots `dev/handover/reports/stage-pets-r6/*.jpg` (30 files) removed from git (owner: shots never in git, OD 18:50Z).
- Merge: assemble list = union (main jst14 + jtwoway, branch jplfs). jk3 #popw rules: main's `.k3pop>#popw` and branch's `#popw.j59dock` grid-area stage, both kept.

## Checks (Fold 755x1000@2, iPad 1180x820@2; smoke at 1366x1024, 844x390, 390x844)
| check | Fold | iPad | notes |
|---|---|---|---|
| room (Hành sự = her residence only) | 2 per view (1 when one person's art is wider than the slot) | 2 per view (1 in 1 of 4 lives: her art 213 px > slot 210) | own room order her + maid first; the art-width rule is replaced by r7 |
| Dư đồ / courtyard: same L + R columns | yes (172) | yes (139) | the Fold courtyard picture leaves ~130 px of empty leather under it (cosmetic) |
| multi-hall courtyard → hall → full-screen painting | OK | OK | |
| Thái y viện, Ngự hoa viên (single hall) | straight in, no courtyard | straight in | single-hall.js pass (Fold + iPad) |
| swipe forward ×2 / back ×2 | OK, pg returns to view 1 | OK | |
| "+N" both sides, top corners | OK | OK; earlier run: left chip touched a sleeve box once (faces never) | |
| tap person → card → ✕ | OK | OK (rail fixed, see above) | |
| back to map (rail button) | "Về Dư đồ" → map | same | |
| people overlap (body boxes) | 0 | 0 | 1366: 0 |
| ratio .79 | 609/771 | 492 (maxPx cap) | men 652 / 526 (taller art) |
| old save made on main while standing in Ngự hoa viên | loads on the painting, 0 errors | same | |
| quickcheck cea021e3 vs live 7b5e5e49 | PASS | | open 1067 ms; old save OK; perf render 315/309, tab 343/312, buổi 1013/1134 |
| coop-e2e (live worker) | 59/59 | | |
| kit-conform 755x1000 | 88 CONFORMS, 0 MIXED/CUSTOM, floats none | | 15 MISSING = dialog kinds not openable |
| stage-swipe.js NPEOPLE=2,6 | OK, 0 arrows, 0 errors | OK | frame times on this loaded box 65–120 ms (worker 16 ms): not comparable, quickcheck perf vs live is fine |
| stage-pets.js | 16/16 | 8/16 FAIL "pN has no pet" | test fault: the extra people are strangers (Người lạ) who have no pet by KIT 33.8; the test predates 3 per view |
| pl-courtyards.js / autopick | pass | pass | |
| 390x844 | rotate prompt, 0 errors | | |
| page errors | 0 everywhere | | |

## Go live BEFORE Foreman C's courtyard paintings? NO
The courtyard picture still falls back to an ordinary picture (owner OD 18:40Z: missing states must be PAINTED, never an ordinary stand-in). Code path: `dev/build/jpm.js` `kpmArt()` lines 32–35. The fallback chain is tang-<buổi> → festival-<buổi> → season × nearest buổi → "xuan-sang". Data (`KPM_DATA.have`): every one of the 6 dirs has all 16 season × buổi pictures but NO tang (mourning) pictures. The rank dirs have 12 festival states each, nhat-spare-cung only 1. The pl-courtyards.js matrix for nhat-cac: 42 of 56 festival × buổi cells use the fallback. The "nearest buổi" step and the final "xuan-sang" (spring picture in any season) are stand-ins too.
To ship before C finishes, gate `kpmArt`: on a festival or mourning day (`festToday()` / `wdTang()`), or when the exact season-buổi file is missing, return null for the courtyard picture so the level is skipped and the Dư đồ tap goes straight to the hall (the single-hall road), never to the ordinary picture. Otherwise wait for C (CLAIMS: review/pl-courtyards-art).

## Notes for the coordinator
- Owner rules conflict in her room: 19:15Z asks for "iPad 2 people", but never shrink + never overlap (r5/r6) gave 1 per view whenever one person's art was wider than the slot. Owner OD 19:54Z settles it (fixed 2 slots, clothing may overlap) = r7.
- The rail can touch her hair ornament in the room at Fold/iPad (art box only, faces clear). This is the old room layout, not new in r6.

Shots: scratch only (none uploaded, nothing to wipe).

## HANDOVER (reviewer rollover, ~20 % context at 20:38Z, START ~3 %, band 28 %): s23 asked for ONE verdict on review/stage-pets-r7 @ 6aaca31af
Successor reviewer (opened by s23):
1. Worktree from latest origin/main; merge origin/review/stage-pets-r7 6aaca31af, THEN merge origin/review/stage-pets-r1 cea021e3 (already holds the main 7b5e5e49 merge with the conflict resolution: assemble.py list = main + jplfs.js; jk3 #popw both rules). Branch name review/stage-pets-r7-r1.
2. Carry the 3 fixes: jk3 k3Shell rail repaint on k3pop toggle; jk3 k3RW halves the width for #stage.kplfs too (iPad 139 px on every level); no shots in git (r7 may have added a stage-pets-r7 shot folder: remove it).
3. Re-check FAIL 1 (844x390: shrink + figures under #krail) on r7's KIT 33.12 slot table. Also check Fold cover 412x1058.
4. Owner rules for r7 (OD 19:54Z + ~20:04Z): Fold 2 people per view at FIXED slots, wide skirts may touch/overlap; pets at the fixed spot of the owner's slot on every stage; Hành sự = her room only; same side columns on every level; coop-e2e.
5. Test flow I used (scratch script, recreate): serve the built worktree root on 127.0.0.1 with charset utf-8; place-fs.js, stage-swipe.js (NPEOPLE=2,6), stage-pets.js (expect strangers without pets), single-hall.js, pl-courtyards.js + autopick, kit-conform.js, coop-e2e.js, quickcheck.sh; old save from origin/main index.html (served as old-main.html, same origin) after goTo('vuon') + save() into slot 3, then loadSlot(3)/deser in the new build. Measure kshR/krail boxes per level (consistency), figures under kshR AND under krail, +N chip boxes vs figures, and the rail after closing a card.
6. Courtyard paint gate: r7 only changes j59/jkit layout, not jpm.js kpmArt, so the courtyard picture fallback (and the go-live gate in it) is the same as above.
