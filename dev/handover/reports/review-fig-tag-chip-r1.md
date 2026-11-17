# review fig-tag-chip r1 — PASS 7582405e
PRIORITY #1 CHECK: OD fig tag/band: none new | main: KIT_SLOTS.band (jkit) reused, no new part | review/*: fig-tag-chip d50c8e22, fig-headtop-r1 f95f5a92 (same batch line, trial-merged) | claims: fig-tag-chip RUNNING row -> done.

Branch review/fig-tag-chip-r1 @ **7582405e** = origin/main 65dcf52f + review/fig-tag-chip d50c8e22 + review/fig-headtop-r1 f95f5a92. Conflicts only in generated files (index.html, sw.js, assets.json) and CHANGE.txt (both lines kept); site rebuilt with build_site.sh. origin/main is an ancestor, fast-forwardable.

| check | result |
|---|---|
| fig-tag-fit.js, 5 sizes x 8 origins x 3 places x plate/plain | 590 tags, 0 cut, worst 0 px, no page errors |
| PLATE=1 fig-feet-fam.js | 155 cases, 0 px cut |
| fig-headtop.js 755x1000@2, 1180x820@2 | head-top spread 0.04 of body height, no errors (headtop still holds with the 64 px band) |
| quickcheck | PASS 114 s, open 993 ms, old save ok, core gates PASS, perf render 190/210, tab 276/258, buổi 1034/1024 |
| kit | change is in KIT_SLOTS.band + j59 floor raise only, no private chip/row; KIT.md 33.12 note present |
Looked at (scratch, not in git): iPad 1180x820 stage with plates (plate, rank, name all inside, shoes visible), 412x1058 (3-wrapped tag inside, name close to the second figure but readable), Fold 755x1000 headtop shot (two figures level, tags clear).
Nit (not a fail): at 412 the long wrapped name sits tight against the lower-ranked figure behind it.
Verdict: PASS 7582405e.
