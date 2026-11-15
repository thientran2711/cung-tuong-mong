# PROGRESS — review/player-dress (her dress follows her road / rank / state; same face, right age)

Base: origin/main 888463759. Bug (small-bugs-2): her stage figure wore the t1 consort dress on the cung nữ road and in lãnh cung.

## Root causes (both fixed, whole class)
1. **Rank-blind maid dress** (j88 `f88Best` / `f88Pick`). On the cung nữ road her pictures took the servant base mode with no maid rank
   (`mr` was only computed for NPCs), so a consort face always wore tm0 and a maid face always the plain maid art, whatever her rank.
   The same distance function counted the plain maid art (tier null) as distance 0 from EVERY rank, so NPC maids of rank 0/2/3/4 also
   wore the plain rank-1 dress. Now: plain maid art = rank 1; her rank = `f88SrvRk()` (Tân Giả khố → m0, Ma ma → m4, else S.srv.rk).
2. **Lives started past Luân hồi had no identity** (`window.__nlInner` start: test drivers such as small-bugs-2's, tools). With no
   `S.pid` she fell back to the old "player look" art (role `player`, t1 only, + one t3) → t1 consort dress everywhere. j66 now gives
   such a life a free consort identity right after start() (before any picture is kept). Loaded saves are untouched.

Every caller (stage #mefig, header portrait, person dialogs, Tuần lục, identity card, round portraits, porOf/kitMePor) goes through
`figFor`, so the two fixes cover them all; the scan below reads each surface.

## Audit — her picture sets on the CDN (img/_index.json, 15/11 17:05Z), per identity, fig + por
| Road / state | Dress tier | 32 consort faces c01–c32 | 52 maid faces m01–m52 | Ages | Manifest | toil-fit |
|---|---|---|---|---|---|---|
| Consort Đáp ứng … Hoàng hậu | t1 … t8 | 32 × 8 | 52 × 8 (Part C) | a18 a26 a36 a51 | FIGURES.json / FIGURES-servants.json | consort all; maid **added here** |
| Lãnh cung (plain, no jewellery, no huadian) | tcold / cold | 32 | 52 | 4 | same | n/a (makeup off in lãnh cung) |
| Trung y (empty Y phục slot) | ty1 … ty8 | 32 × 8 | 52 × 8 | 4 | FIGURES-ty.json | all |
| Cung nữ thô sử / Tân Giả khố | m0 | 32 | 52 | 4 | FIGURES.json / FIGURES-servants.json | n/a (makeup off on the road) |
| Cung nữ | m1 | 32 | 52 (plain maid art) | 4 | same | n/a |
| Đại cung nữ · Chưởng sự cô cô · Nữ quan (+ Ma ma → m4) | m2 · m3 · m4 | 32 × 3 | 52 × 3 | 4 | same | n/a |
| Ngoài cung: khuê các / nhà nghèo (thd, td) | kc / ngheo | 32 | 52 | a18 only (road is 18) | FIGURES-kc.json | all |
| Old pre-11/14 saves: "player look" faces look1–4 | t1 (+ t3 a18) | — | — | 4 | FIGURES.json role player | all |

Nothing is missing for the 84 faces (manifest ↔ CDN: 0 files missing). kc / ngheo: the outside road (jkc.js) lives on
review/khuecac, not on main; jkc wraps figFor itself for isKc(), so no wiring here.
Visual checks (sheets in the worktree, not committed): c05 and m05 × {t1, cold, m0..m4} × 4 ages — same face in every dress, ages read
18 / mid-20s / late-30s / ~48; lãnh cung portraits of all 84 faces — plain robe, wooden pin, no huadian, no jewellery.

## Legacy "player look" saves (NOT fixed — needs a coordinator / owner decision)
A life started before 11/14 (no S.pid, S.fid = player:look1..4) keeps its look face (j66 rule: old saves untouched). Those 4 faces only
have t1 (+ t3 a18) art, so on the cung nữ road / in lãnh cung / at ranks t2+ they still wear t1. Options: (a) draw look1–4 × {cold, m0–m4}
× 4 ages (24 lineups ≈ 6 500 credits at the maid-art-b rate, + t2–t8 for consort ranks = 28 more lineups); (b) move such a life once onto
a free consort identity (face changes once — breaks "face life-long"); (c) leave as is (only lives older than two days).

## toil-fit (makeup points)
`dev/figwork/toilfit.py --extend --all --re 'por-maid-m\d+-t[1-8]-'` (new `--re` filter): the maid faces' consort-dress pictures (Part C,
t1–t8 × 4 ages, 1664 portraits + figures) had no points, so a maid face raised to consort had no makeup layer. Lãnh cung and the maid
dresses need none (jtoil `toilOn` is off on the cung nữ road and in lãnh cung).

## Tests
- `node dev/test/player-dress.js <url> [pids|all] [WxH@dpr]` — scan of every surface × state × age. Before (main) / after: see report.
- `node dev/test/player-dress-old.js <old url> <new url> <WxH@dpr> [shots]` — saves written by main (cung nữ rk3, lãnh cung, Tân Giả khố)
  load in this build; stage + header show her face in the right dress; no page error, no horizontal overflow.

## Results (15/11, after merging origin/main 17e8fc038)
- Scan `player-dress.js` (c05 + m05, 138 cases × 7 surfaces): main BAD 44 of 138 (fig/por/stage/header/dialog/Tuần lục all wrong on
  the cung nữ road: c05 always tm0, m05 always plain maid art) → this branch BAD 0. Extra faces c01, c32, m01, m52 at 844x390: BAD 0 of 276.
- NPC maids, ranks forced 0..4: main = plain maid art for every rank; now tm0 / plain / tm2 / tm3 / tm4.
- Old saves written by main (cung nữ Chưởng sự cô cô, lãnh cung, Tân Giả khố) load at 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2,
  844x390, 390x844: right dress on stage + header, no page error, no horizontal overflow (one 1180x820 run timed out on image load under
  load 60; rerun passed).
- toil-fit: +3328 points (1664 por + 1664 fig), 0 without reference, 10 random ones checked by eye (mouth + cheeks on the face); on the CDN.
- Pre-existing, not touched: 390x844 shows no rotate prompt and the place subtitle wraps one letter per line (main too; small-bugs-2 noted it).
- Merge note: review/small-bugs-2 (not on main yet) changes jimg kitMePor / porOf; no overlap with j66/j88.

## Reviewer r6 (15/11, review/player-dress-r6 on origin/main 17e8fc038)
- Branch already contained origin/main 17e8fc038 (merge = no-op); site rebuilt (index.html identical, assets.json/sw.js refreshed for the CDN index).
- player-dress.js 1180x820: BAD 0 of 138, 0 page errors (all 7 surfaces). player-dress-old.js at 755x1000@2, 1000x755, 1180x820@2,
  1366x1024@2, 844x390: all 3 old saves right dress (tm3 / cold / tm0) on stage + header, no overflow, no page error (1000x755 first run
  read before the art loaded; screenshot right; rerun passed).
- Pre-11/14 "player look" saves (player:look1-3, cung nữ rk3 / lãnh cung / consort r4) written by main load here: no pid added, same
  look face, t1 (option c). Normal new game (no __nlInner) gets its identity through the Luân hồi card as on main.
- trung-y.js and toilette.js 1180x820: pass, 0 errors. toil-fit spot check, makeup on (dep/diem): maid m07 t3 a18, m23 t6 a26, m41 t8 a36,
  m52 t1 a51 — points present, blush on cheeks, lip on mouth.
- small-bugs-2 (local review/small-bugs-2-r6 2e7e226d4): merge-tree conflicts only in built files (index.html, sw.js, assets.json); its
  jimg mePor only acts on S.fid "player:*" before the manifests load, so no overlap with j66/j88. Whoever lands second: rebuild the site.
