# REVIEW smudge-code r16 — PASS af71f94a

PRIORITY #1 CHECK: OD 18/11 ~01:23Z + ~02:05Z (+20 % FINAL) | main smudge looks batch live | review/smudge-code-r16 50939b0 (old review/smudge-code obsolete) | claims MAIN smudge r16 SzhMG33.

Reviewer session: session_01UV1SzitaUhhFRRJBAbEgHM (sonnet). Branch review/smudge-code-r16-rv = origin/main f986ff6a + 50939b0 (only jlooks.js + tests; index.html/sw.js/assets.json rebuilt with build_site.sh). origin/main is an ancestor of af71f94a → fast-forwardable.

| check | result |
|---|---|
| BAL smuFx.tear.dark | 1.2 only source (jlooks.js:47); read once at draw (jlooks.js:260); tests only override it in option modes |
| nặng extra short grey run | present (BAL tear.extra n [0,0,0,1]), seen at stage and mirror, both devices |
| big sizes darker | stage key L2/L3 vs mirror step0 differ; stage visibly darker |
| pale streaks / pink stripes (3x zoom, nặng) | none: Fold 755x1000 and iPad 1180x820, stage (LOD 2 Fold / 3 iPad) and mirror (step 0) |
| blush/lip smear | unchanged 20 % (smuFx.pct) |
| smudge-code.js | all checks true, 0 page errors (masses .0137/.011/.0119 — vừa < nhẹ in mass because pink streak was removed r10-13; growing check only requires nặng > vừa) |
| quickcheck --runs 5 | PASS 248 s · open 1297 ms · old save ok · core gates PASS (one-core) · render 182/188, tab 364/367, buổi 987/922 (+7 %, run noise: individual runs 780–1205 both sides), tasks>200ms 14/14 |

Notes (non-blocking): masses test name "growing" does not prove 1<2<3 any more; LOCALFIT=1 repo mkfit used for shots (CDN mk-fit table differs, known from r4).
Shots: scratch only, nothing on CDN; worker's img/_review/smudge wiped (10 objects).
