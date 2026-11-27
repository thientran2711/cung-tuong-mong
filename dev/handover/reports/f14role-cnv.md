# F14ROLE-CNV — road chapters inherit F14ROLE rows (B) + cnv_chu ch.7 stall (C)
B FIXER F14ROLE-CNV session_01N1tNP2yqZHTdFAiw5WwCkG (Foreman B ROOT 3), 27/11. Branch review/f14role-inherit (LIVE 772bee4f merged first).

PRIORITY #1 CHECK ('f14role|cnvstall|cnv_chu'): OD 0 | ledger 0 | claims 8 (STATUS mentions only) | main 15 (jst14.js F14ROLE) | review/* 1 (review/f14role-inherit 6115ac1c, docs-only handover) + review/sideq-road-fold (road-full.js + lib/qdrain.js harness fix, RV READY to RV-172, REUSED for the road-full runs, not copied into this branch). Spec: dev/handover/reports/f14role-cnvstall-handover.md (this branch). MAIN 178 ruling (27/11 ~11:03Z): APPLY inherit.

## B — F14ROLE inherit
Code (dev/build/jst14.js):
- `f14Row(id)`: own row first; else, only for a REAL road chapter (`ARC67[id].o==="rd"` with `road` + `rn`), the nearest earlier row `<road>_<rn-1>` … `<road>_<BAL.road.first>`, then `<road>` (the .4 premise cast); else null. Exported `window.f14Row`.
- `f14Hostile(A,k)` reads `f14Row(A.a)`.
- `f14Carried(A,k,v)`: a person CARRIED from the chapter before (jroad rdCast, `S.st.f14.act`) whose role was already hostile there is not hated again. Without it the inherited row would make the newThread67 hook call `f14Hate` on the same rival in EVERY road chapter (−thiện cảm, +oán each time) — against OD:L1247 «once, when cast». A recast (new person) is still hated once.
- dev/test/story14-frame.js item 3 now asks `f14Row(id)` («every role resolves»).

| measure | LIVE 772bee4f | this branch |
|---|---|---|
| roles ({v}/{v2} in arc text) that resolve a row | 33 / 584 | 171 / 584 |
| road chapters of a hostile .4 (tt_co, tt_oan, dtq_bien, muoi_tuoc, cn_chu) hostile | 0 | all |
| same rival hated per road (tt_co .5 → .6 → .7) | .5 0, .6 0, .7 0 (never) | .5 1, .6 0, .7 0 |

dev/test/f14role-inherit.js: LIVE FAIL 4/6 · fix PASS 6/6 · MUTATE=1 (old own-row lookup) FAIL 4/6 · MUTATE=carry FAIL 1/6.

★ OPEN FOR MAIN (not this ruling): **413 roles on 70 roads/premises have NO reviewed row anywhere on the road** — 72 of 92 roads have no .4 row, and 33 premises use {v} without a row (bd_san, pt_hai, tt_ruong, dtq_hang, thd_uoc, muoi_thi, cn_chuoi, cnv_kho, nc_men, noi14, hau14, ke14 …; muoi_no lacks v2). Inherit cannot resolve them (they default to «not hostile»), so story14-frame item 3 stays FAIL until those rows are reviewed role by role from the arc text (content job; the table comment says every new arc is reviewed role by role). Full list: `node dev/test/f14role-inherit.js <url>` line «NO ROW».

## C — cnv_chu ch.7 stall = GAME FAULT (whole family fixed)
Harness note: road-full.js on LIVE does not play at all (every life stuck at ch.1: jdayq holds the turn when `__bot` is unset). The fix exists on review/sideq-road-fold (road-full.js + lib/qdrain.js); all road-full runs below use those two files + a seeded Math.random (+ a test-side mistress kill for the forced runs). Not a harness fault for the stall itself: the test revive (`S.dead=false;S.out=0`) is the player's, the mistress's state is untouched.

Cause (DIAG of chAdvance67 calls): the road's next chapters cast false because the person they need is gone (cnv_chu needs {mis} in every chapter: `CNV_MC(A,1)`). Then
1. every shared arc (`s_*`, 8) is `ok:nsrv67` → a maid gets no filler (`f14Shared` false);
2. the jst14 loop walks into `end:12` itself; jend14's `eg12` (maid → ms:len14) only rewrites end:12 when it is the NEXT slot → st_dong/st_con (nsrv) fail;
3. hau14/ke14 are nsrv → loop ends → `S.st.ch.all` at the cut;
4. jroad tells the origin ending from the last road chapter only when `c.n > BAL.road.last` → no ending.

Reproduced on the pre-fix build: seed 21 natural (mistress sent to the cold palace in ch.4 → ch.all at 4, fin empty); forced mistress dead / cold palace at ch.7 → ch.all at 7, 27 months, fin empty (= the reported log).

Fix:
- jst14 `f14Shared`: shared arc first (as before), then the origin's own premises still in `c.pool` (j67 chNext67; each arc's own ok() decides, so a maid only gets maid arcs).
- jst14 loop: `end:12` asks `eg12()` when it is reached (maid → ms:len14).
- jroad fallback ending: also once the frame has passed the road's last slot (`c.i` beyond `st:<road>_11`) or closed.
No number, no wording, no kit change (BAL.road.first/last read; the ending card is the existing rdFinale fb path).

LAW 11 table — the family = every full road whose chapter can cast false (44 hand-written roads all use rdCast / CNV_MC; 48 composed roads use rdCast) × life type:

| case | before | after | action |
|---|---|---|---|
| maid road cut short (cnv_chu, cnv_ban, cnv_mat, cnv_ma, cnv_kho, cnv_thu, cnv_hach, cnv_tieu) | frame closes at the cut, no origin ending | 14 chapters (other maid premises fill, ch.12 len14), ending told | FIX |
| consort road cut short (84 roads, all other origins) | 14 chapters via shared arcs, ending at ch.12 | same (shared first) | KEEP |
| consort road cut short after the shared pool is spent | frame closes early | origin premises fill | FIX |
| end:12 reached by skipping slots | eg12 not asked | eg12 asked | FIX |
| road ran in full | ending from .11 | same | KEEP |

dev/test/road-cut.js (every full road; life of its origin; frame put at the end of ch.7; later road chapters' cast() → false):
| build | result |
|---|---|
| LIVE 772bee4f | FAIL 238/270 (8 maid roads: n=7, ALL, no ending) |
| pre-fix (B only) | FAIL 241/273 (same 8) |
| fix | PASS 273/273 (92 roads, 4 bd roads skipped: premise not rollable in a fresh world) |
| MUTATE=fill | FAIL 257/273 |
| MUTATE=eg12 | FAIL 265/273 |

road-full cnv_chu (sideq harness, seeded, one process at a time):
| run | result |
|---|---|
| fix, seeds 11–14 × 2 lives (first + random option) | 8/8 lives 14/14, finale from .11 |
| pre-fix, seed 21 (natural cut ch.4) | ch.all at 4, fin empty |
| fix, seed 21 + mistress dead at ch.7 | 14/14, .8–.11 = cnv_tieu/kho/ma/hach, ending «Qua phép thử» |
| pre-fix, seed 22 + mistress to cold palace at ch.7 | ch.all at 7, 27 months, fin empty |
| fix, same | 14/14, ending told |
| fix, cut at ch.5 / ch.10 | 14/14, ending told |
(the 2 road-full FAILs in a cut run are «chapters 4..11 are the road» + «ending from .11», which a cut road cannot meet by design.)

## Gates (one browser at a time; build = root index.html of this branch; LIVE = origin/main 772bee4f index.html)
| gate | this branch | LIVE | note |
|---|---|---|---|
| f14role-inherit.js | PASS 6/6 | FAIL 4/6 | new |
| road-cut.js (92 roads, cut 7) | PASS 273/273 | FAIL 238/270 | new |
| quickcheck ALONE (open · old LIVE save loads + plays a buổi · perf) | open/old save/perf PASS (render 221/255 ms, buổi 1245/1353 ms); CORE GATES FAIL on hook 94-q-softlock (Fold, 4) | — | q-softlock A/B alone: LIVE FAIL 5 (Fold 4 + iPad 1) · this branch PASS → flaky person-view gate, present on LIVE, not this change |
| road-full sample, 12 roads × 1 life (sideq-road-fold harness) | 12/12 roads 9/9 (all 14 chapters, finale from .11) | — (LIVE harness stuck at ch.1) | tt_co dtq_bien muoi_tuoc cn_chu nc_gian bd_san pt_hai td_an ch_co thd_tho cnv_chu pf_co |
| road-saves (tt,cnv) | 3/5 | 3/5 | same 2 FAILs = sideq report item A (needs an old MAIN build fixture; stale td premise) |
| story14-frame (sideq harness + item 3 via f14Row), ~73 min | 24/27 | — | FAIL item 3 = the missing rows above (551 → 413 roles); FAIL «old save (main build)» = item A fixture; FAIL OD:L1247 «hostile cast people hate her» with an EMPTY sample (H=[]): all 11 lives rolled roads with no row (tt_tho, dtq_thuong, muoi_thi …) → nobody cast hostile, nothing to judge (sample, not a regression; inherit only adds hostility; hate itself is checked by f14role-inherit check 5) |
| old-save load | quickcheck «old save ok» (LIVE save, Fold) + road-saves mid-road tt/cnv PASS | | |

Not in this branch (reused only): review/sideq-road-fold dev/test/road-full.js + dev/test/lib/qdrain.js + dev/test/story14-frame.js harness fix (jdayq holds the turn when __bot is unset → LIVE road-full / story14-frame bots never leave ch.1). When both land, story14-frame here and there differ only in item 3's line (mine) and the harness lines (theirs) — separate hunks.

Files: dev/build/jst14.js, dev/build/jroad.js, dev/test/f14role-inherit.js (new), dev/test/road-cut.js (new), dev/test/story14-frame.js (item 3 line), index.html + sw.js (build_site.sh; assets.json = LIVE). No BAL, no wording, no kit change.

## Re-merge on newer LIVE 8330e8b8 (lc32-livebugs = rv26 + live-bugs-2711)
Only built files conflicted (index.html, sw.js → LIVE, then build_site.sh; assets.json = LIVE). On the merged build: f14role-inherit PASS 6/6 · road-cut PASS 273/273 · quickcheck ALONE PASS (core gates PASS; open 1966 ms; old LIVE save loads + plays; perf new/live render 255/316, tab 488/477, buổi 1514/1551 ms). The long gates above (road-full sample, story14-frame, road-saves) ran on the 772bee4f merge; LIVE's new source (save stack + live bugs) does not touch jst14 / jroad / jend14 / j67.

## Handover / open items
- FOR MAIN: rows for the 70 roads/premises with no reviewed F14ROLE row (413 roles) — content review role by role; until then story14-frame item 3 FAILs and those roads' rivals are never «hostile».
- review/sideq-road-fold (harness fix for road-full / story14-frame / road-saves …) should land so these bots play on LIVE.
