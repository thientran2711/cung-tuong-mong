# HANDOVER — F14ROLE inherit (B) + cnv_chu ch.7 stall (C) — from SIDEQ-RACE (ctx past START+25%), 27/11

PRIORITY #1 CHECK: rulings from MAIN 178 (27/11 ~11:03Z); findings in dev/handover/reports/road-tests-qdrain.md on review/sideq-road-fold (4079e7ef, RV READY to RV-172). Base for both: LIVE 00dca386.

## B — F14ROLE inherit (MAIN 178 ruling: APPLY), branch review/f14role-inherit (this branch, docs only so far)
- Code: dev/build/jst14.js:148 `const F14ROLE={...}` lists only the .4 premise arcs (tt_co, tt_oan, …). jst14.js:153 `f14Hostile(A,k)` returns `F14ROLE[A.a][k]===1`, so for road chapters .5–.11 (ids `<road>_5` … `<road>_11`) it is silently false.
- Ruling: a road chapter with no row INHERITS the nearest earlier row (`<road>_n` → `<road>_{n-1}` … → `<road>` = the .4 cast); its own row overrides.
- Suggested code: `const f14Row=id=>{if(F14ROLE[id])return F14ROLE[id];const m=/^(.+)_(\d+)$/.exec(id);if(!m)return null;for(let n=+m[2]-1;n>=5;n--)if(F14ROLE[m[1]+'_'+n])return F14ROLE[m[1]+'_'+n];return F14ROLE[m[1]]||null}`. Use it in f14Hostile. Make sure `<road>` is a real road id (ARC67[id].o==='rd' / a.road) so ids like `st_dong` are not matched by mistake.
- Unit test (new, e.g. dev/test/f14role-inherit.js): for every ARC67 id whose text has `{v}`/`{v2}`, check that a row resolves; give a before/after count. The story14-frame item-3 log shows the missing list (tt_co_5.v … dtq_binh_*.v …).
- story14-frame item 3 checks `F14ROLE[id]&&k in F14ROLE[id]` directly. Point it at the resolver (it is exported as window.F14ROLE; also export f14Row) so «every role listed» means «every role resolves».
- Check: jst14.js:157/159 (castRv67 / newThread67 hooks) use f14Hostile, so a road chapter cast becomes hostile when its .4 row says so. Run story14-frame (about 80 min alone) and the road-full sample (one road per process).

## C — road-full cnv_chu stopped at ch.7 (1 of 4 runs), not yet reproduced
- Bad log: life went `1..7` with `S.st.ch.all=true` at month 27; `fin` empty; ends `cnv_chu_6=lose, cnv_chu_7=mid`. The 3 other runs walked all 14 (fin «Chủ tớ cùng lùi một bước» / «Tâm phúc trọn đời…»).
- Repro: `node dev/test/road-full.js <url> 1 cnv_chu` (about 6 min each, ≥8 runs, ONE process at a time; two browsers at once → «Target crashed»). Seed Math.random in the page (as story14-frame does) to make a bad seed repeatable.
- Leads: servant life (isSrv) + jrd_cnv header «cnv_mat .8 may raise her at once»; jend14.js:175 eg12 / chAdvance67 hooks (jroad.js:126 tm96 side, jend14 eg12, jrd_cnv a67init). Find who sets `ch.all` early: grep `\.all=` in dev/build/j67.js / jst14.js / jend14.js. Also check whether the test's revive (`S.dead=false;S.out=0`) leaves a servant «out» state that closes the frame. If it is a game fault, fix the family: every road that can reach ch.all before its finale.

## A — parked (old-build fixture), logged for MAIN 179.
