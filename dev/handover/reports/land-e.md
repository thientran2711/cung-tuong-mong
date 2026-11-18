PRIORITY #1 CHECK ('land E passes'): OD 0 | ledger 0 | claims LAND-E row | main 0 (none of the 4 on a2ad2401) | review/* the 4 branches | archive 0
# land-e (sonnet lander) — stack built, HELD for C-AG

Branch review/land-e (pushed, NOT main), on origin/main a2ad2401 (unchanged at the end). Each merge is its own merge commit on the previous. All four branch HEADs equalled the named shas.

| step | branch | merge sha | gates |
|---|---|---|---|
| 1 | review/questline-q0-ff 98737806 | af28f63b0fcf3abc0161d6e8f756af350ec36f3c | docs only (ROAD_MAP.md), auto-merged, no rebuild needed |
| 2 | review/hall-names d5d389e8 | be23bb8e7f6923ccfe8f92b70d7783989e2e19e7 | index.html+sw.js conflicted -> rebuilt (build_site.sh); one-core-guard 0 fails; quickcheck PASS (old save ok, render 219/225, tab 469/421, buoi 1045/1037); hall-names-scan OK |
| 3 | review/monthly-ration-r6 287a0b79 | 88893b134c37217d4551c8109e34a4272d5c97db | assemble.py conflict resolved by UNION (+jration.js), built files rebuilt; one-core-guard 0; quickcheck PASS (render 180/193, tab 366/383, buoi 1185/1039 one noisy run, old save ok); monthly-ration.js ALL PASS (Fold + iPad) |
| 4 | review/steal-minigame 6b5414a8 | 5bb5042494e0456b003589d8684488d97ad744db | assemble.py UNION (+jsmg.js), built files rebuilt; j82.js/jbal2.js auto-merged (no source conflict); one-core-guard 0; quickcheck PASS (render 223/181, tab 368/353, buoi 1051/854, old save ok); steal-mg-unit.js PASS 0 page errors; mg-skip-audit.js 21/21 PASS; hall-names-scan + monthly-ration.js re-run on final: PASS |

Not run: steal-mg-nf.js (needs a local balance-chain merge, not on main; prints SKIP there).
HELD for C-AG (MAIN ROOT-50 order): after ag-all-2-land + npc-chain-land land, MAIN FFs; then merge newest main into this stack and re-run gates.

LAND READY 5bb5042494e0456b003589d8684488d97ad744db (HELD for C-AG)

---
# ROUND 2 (MAIN ROOT-51 GO 18/11 11:51Z): rebuilt on origin/main 12a1e4be

review/land-e force-pushed (round 1 stack on a2ad2401 is replaced). Stack, each its own merge commit, no side picked (index.html/sw.js/assets.json rebuilt, assemble.py module list UNION):

| step | branch | merge sha | result |
|---|---|---|---|
| 1 | review/questline-q0-ff 98737806 | 708447e7 | auto-merge (docs) |
| 2 | review/hall-names d5d389e8 | — LEFT OUT | SOURCE conflict dev/build/jpm.js kitPalaceMap(): main now has `here=h=>(!!k&&S.place===k&&kpmHall()&&kpmHall().part===h)||(S.place==="home"&&kpmMine(slot)===h)`; branch has `role=h=>h==="cungnhan"||!kpmIsPlace(slot)?hallRole(h):""` + older `here`. Fix = keep both (branch's `role` line + main's `here`); needs the hall-names owner |
| 3 | review/monthly-ration-r6 287a0b79 | — LEFT OUT | touches dev/build/jtoil.js (MAIN rule: jtoil* out) |
| 4 | review/steal-minigame 6b5414a8 | 3f45eda9 | assemble.py union (+jsmg.js); j82.js/jbal2.js auto-merged |
| 5 | review/questline-q1-land c0d48adf | 809d5ab0d37fb35f4c8c7cf9cf6930c011f0fd4c | assemble.py union (+jnrask, jnrask_b, jnrask_m); assets.json rebuilt |
| 6 | review/questline-q3 dcc822b1 | — LEFT OUT | SOURCE conflict dev/build/jbal2.js ~line 398 (HEAD vs q3 hunk, after q1) + assemble.py; jbal* family |

Gates on final 809d5ab0: one-core-guard 0 fails; quickcheck PASS (old save ok, render 274/231, tab 436/420, buoi 1114/1080, tasks>200ms 16/18, core gates PASS); coop-e2e 63/63; steal-mg-unit PASS (0 page errors); mg-skip-audit 21/21; nrask-scan, nrask-m-scan, nrask-engine ALL PASS. Not run: npc-roads-men.js (needs a served http url; q1 touched it), steal-mg-nf.js (needs balance-chain).
Touched files vs main 12a1e4be: assets.json dev/build/assemble.py j82.js jbal2.js(+7 lines, steal-minigame) jnrask.js jnrask_b.js jnrask_m.js jnroad.js jnroadm.js jsmg.js dev/kit/KIT.md dev/story/ROAD_MAP.md + tests (npc-roads-men, nrask-*, steal-mg-*) + built index.html sw.js. None of jag*/j95*/jtoil*/jbal.js/jcoop*/save. NOTE jbal2.js IS touched (steal-minigame rung table +7 lines) — MAIN decide if that counts under "jbal*".

LAND READY 809d5ab0d37fb35f4c8c7cf9cf6930c011f0fd4c (FF from 12a1e4be0dfc4e7fc769159c500f10a645afcc24)

---
# ROUND 3 (MAIN ROOT-51 GO 18/11 12:06Z): on live main 809d5ab0

review/land-e force-pushed again (now = main 809d5ab0 + 2 merges).

| step | branch | merge sha | result |
|---|---|---|---|
| 1 | review/hall-names d5d389e8 | a8036600 | jpm.js kitPalaceMap conflict resolved by keeping BOTH: branch `role` line + main's newer `here` (home slot); assemble.py union (+jhall.js); built files rebuilt |
| 2 | review/questline-q3 dcc822b1 | 636193f8 | jbal2.js conflict: both sides inserted before the same comment — kept q3's whole BAL.road.hp block + main's newer seatcap comment line (old seatcap line from q3 side dropped); node --check OK; assemble.py union (+jrdhp.js); rebuilt |

monthly-ration-r6 stays OUT (jtoil.js → waits for C-AG).
Gates on 636193f8: one-core-guard 0 fails; quickcheck PASS (old save ok, render 251/256, tab 523/453, buoi 1211/1126, tasks>200ms 19/17); hall-names-scan OK; palace-map.js Fold 755x1000@2 + iPad 1180x820@2 no errors (people/plaque rows render, errs []); roadhp-unit PASS; roadhp-scan PASS; nrask-scan / nrask-m-scan PASS; npc-roads-men 23/23; mg-skip-audit 21/21. Not run: palace-oldsave.js (needs old+new build urls), coop-e2e (round 2 63/63 before; q3/hall-names touch no co-op files).
Touched vs main 809d5ab0: assemble.py jbal2.js jhall.js jkc2.js jplx.js jpm.js jrdhp.js jres.js jroad.js KIT.md road-hp-bal.js + tests (act-split-scan hall-names-scan roadhp-*) + built index/sw.

LAND READY 636193f8 (FF from 809d5ab0)

---
# ROUND 4 (MAIN ROOT-51/52, 18/11 12:33Z): review/grand-endings-engine 177c730b on main 636193f8

review/land-e force-pushed = main 636193f8 + merge 4475ea24023ba59671680054e069a39238d3d302. Conflicts only in assemble.py (UNION +jbalge, jgecat, jgedata, jge) and built index.html/sw.js (rebuilt). No source conflict.
Gates: one-core-guard 0 fails; quickcheck PASS (old save ok, render 270/271, tab 523/457, buoi 1403/1139 — slower than live in this run, quickcheck's own gate PASS; machine was noisy in earlier rounds too, MAIN may re-run), ge-guard 6/6 (ERRORS 0), ge-engine 104/104, mg-skip-audit 21/21. Not run: ge-shots.js.
Touched vs main: assets.json assemble.py j67 jbalge jchap jdh jge jgecat jgedata jroad jst14 jtabs KIT_REQUESTS.md measure/ge-measure.js tests ge-engine/ge-guard/ge-shots + ge_guard/*.py + built index/sw. None of jag*/j95*/jtoil*/jbal.js/jcoop*/save.

LAND READY 4475ea24023ba59671680054e069a39238d3d302 (FF from 636193f88e35985ab3d6ea8ec8f251179933480e)

ROUND 4 FINAL: main moved to ecd1aed4 (life-preload-fu; no overlap) → merged into the stack, index/sw rebuilt: final sha a8a10c66b78f0841b0d87759333e5db14a8675de (FF from ecd1aed4). one-core-guard 0; quickcheck PASS (render 251/266, tab 470/493, buoi 1187/1354, old save ok); ge-guard 6/6; ge-engine 104/104.

LAND READY a8a10c66b78f0841b0d87759333e5db14a8675de (FF from ecd1aed4)
