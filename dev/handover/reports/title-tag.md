# title-tag report (branch review/title-tag, built ON TOP of review/rank-bright 72f5fc16 because tier colours read RCOL; merge rank-bright first)
Kit parts only (OD 13:00/13:15/13:20Z). New module dev/build/jtitle.js (after jkitpage in assemble.py). KIT.md §82 + kit page §82.
- Reused: the game already has `hieu` (j8 "ban hiệu", TITLES Thục/Hiền/…): kitHieuJoin joins it to the rank in rkOfFace (j19) + rkName (j8); HUD (j6) now prints rkName so "Phi · hiệu Thục" -> "Thục phi".
- 3-line tag: j59tagHTML (stage, under feet) + kitStageFig plate:true from kitEventDp (pop-up left figure, above head). Lists/cards/week book unchanged (rank + name). 
- Plate: CSS placeholder + art slot img/kit/title-plate-<tier>.webp, tier colour = RCOL, effects by tier, still when kfStill. Info card kitTitleOpen via kitModal.
- NOT built (game logic, other owners): the data of titles / worn selection UI / Nhiệm vụ tab "Danh hiệu" / equip stat / confiscation. Hooks: S.titleWorn / p.titleWorn.
Tests 755x1000@2 + 1180x820@2: title-tag.js pass (0 errs, 0 fails); rank-title day/dp 0 bad; kit-page 0 page errors (same 5 pre-existing sample errors as main). Shots in dev/handover/reports/title-tag/.
