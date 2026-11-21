# E43 — cold-faction re-lander (opus), child of FOREMAN E #26
PRIORITY #1 CHECK ('cold-faction|errand-bal'): OD 0 | ledger 0 | claims 8 (MAIN85 E-LANDER rows DONE) | main 0 | review/* main85-land-cold-faction 5168e396, cold-faction-land 2208d341, cold-faction-r6 — reused 5168e396 (carries errand-bal); nothing new built.

## LAND READY cold-faction-land2 ef0a89f22c6d2364a8963d76f97afe3bc8e5b724 (review/cold-faction-land2)
= 5168e396 + LIVE a3a65964 + a2eb51cb + e391b85f. vs LIVE 31fcfe30: index.html/sw.js only → main self-merge.

### Real conflicts (all three = errand-bal moved a literal roll number into BAL, LIVE changed the same line). Resolution = LIVE line verbatim + the branch's BAL key (script: take LIVE hunk, replace the one literal; values equal):
| file / fn | LIVE side | branch side | resolved |
|---|---|---|---|
| j42.js maidLoveMonth (LIVE a3a65964, coop-guest-agent r2) | `L` filter adds `&&!(asSelfOn(ownerOf(s)))` (guest's own maids not rolled by NPC dice); `roll(25)` | `roll(BAL.odb.j42.rlMaidLoveMonth)` (=25) | LIVE filter + `roll(BAL.odb.j42.rlMaidLoveMonth)` |
| jkc.js kcGoWhy/kcGo (LIVE a3a65964) | `can(BAL.walk.near)` / `spend(BAL.walk.near)`; `roll(4)` | `roll(BAL.odb.jkc.rlKcGo)` (=4) | LIVE walk keys + `roll(BAL.odb.jkc.rlKcGo)` |
| jkc.js kc soc cards (LIVE e391b85f) | `lf:[...]` loss fields (BAL.eff.jkc.fail_19 / kldThu 15 / kldTc 5) replacing fail() side effects; `roll(40)` | `roll(BAL.odb.jkc.rlGo_3)` (=40) | LIVE lf lines + `roll(BAL.odb.jkc.rlGo_3)` |
a2eb51cb merge: index/sw only. index.html/sw.js always = LIVE's, rebuilt with build_site.sh.

### Gates on ef0a89f2 (third round; rounds on 8d8ef193 and 019a21f1 also all green)
quickcheck PASS + old save ok + core gates (one-core G1) PASS · errand-bal PASS · cold-faction 20/20 · coop-e2e 94/94 · coop-cold-faction 22/22 (both seats) · coop-errand 16/16 (both seats maids) · role-parity-scan ×2 byte-identical logs (42345bb5), table unchanged (b94f2eb8).
Note: on 019a21f1 coop-e2e hit the known «same Thái hậu picture» flake 90/92, alone rerun 92/92.
Laws touched: 4 ONE CORE (kept every BAL key, no literal back), 1 TWO-WAY / co-op (kept LIVE guest-agent filter). CO-OP LAND GATE OD L594: both features checked solo + both seats.
Reviewer ask: short check of the 3 hunks above (`git diff 5168e396 ef0a89f2 -- dev/build/j42.js dev/build/jkc.js`).

## HANDOVER
If LIVE moves: merge origin/main, `git checkout --theirs index.html sw.js`, any real j*.js hunk = LIVE line + branch BAL key, `bash dev/site/build_site.sh`, commit, gates script /home/user/wt/e43-out/gates.sh. Worktrees to delete: /home/user/wt/e43 /home/user/wt/e43h, scratch /home/user/wt/e43-out.

## REVIEW E43r (opus reviewer session_01DgYSWq56vk37YGWWa6aGdM, 21/11) — PASS ceb5213a5cfd4d39d95b016ffe1ead3041bcdc09
PRIORITY #1 CHECK ('cold-faction|errand-bal|maidLoveMonth|kcGo'): OD 0 | claims E43 session_01DgYSWm9MJSmYC8cYxWWRUE | review/* cold-faction-land2 ef0a89f2, main85-land-cold-faction 5168e396 | main LIVE — reviewed what exists, nothing rebuilt.
Hunk check (by script): `git merge-tree 5168e396 e391b85f` (base 068662ad) → conflicts only j42.js, jkc.js, index.html, sw.js. Auto-merge tree 6f636da7 vs ef0a89f2 differs ONLY in the 3 conflict hunks (every other file incl. j10/j14/j95/jagacts3/jagstaff/jbal2/jkc2 = clean auto-merge, byte-equal).
| hunk | LIVE side kept | branch side kept | BAL value = literal |
|---|---|---|---|
| j42 maidLoveMonth | `L` filter `&&!(asSelfOn(ownerOf(s)))` + co-op comment | `roll(BAL.odb.j42.rlMaidLoveMonth)` | 25 = 25 |
| jkc kcGoWhy/kcGo | `can/spend(BAL.walk.near)` | `roll(BAL.odb.jkc.rlKcGo)` | 4 = 4 |
| jkc soc cards | Giả bệnh / Gửi thư / Viết thư `lf:[…]` loss fields (branch never touched these 3 lines; base→5168e396 diff confirms) | tw «Thăm» card `roll(BAL.odb.jkc.rlGo_3)` | 40 = 40 |
Nothing of either side lost; no literal back (law 4 ONE CORE); LIVE co-op guest filter kept (law 1 TWO-WAY).
LIVE moved 3× during review; merged each (31fcfe30 → ba9b6243 → b88f3d63), conflicts index.html/sw.js only, `--theirs` + build_site.sh. Branch review/cold-faction-land2-r ceb5213a = ef0a89f2 + LIVE b88f3d63.
Gates on ceb5213a: quickcheck PASS (old save ok, core gates PASS; perf 267/261 render) · one-core PASS · errand-bal PASS · cold-faction 20/20 · coop-e2e 94/94 · coop-cold-faction 22/22 (both seats) · coop-errand 16/16 (both seats). Same set green on 25276c1c (+ba9b6243) and 37ce5006 (+31fcfe30; first quickcheck run there hit a one-off perf longTaskMax 4466 vs 2484 on a busy box, rerun alone PASS).
vs LIVE 23bb3862 (moved after the last gate): index.html/sw.js only → MAIN self-merge.
Cleanup: worktrees /home/user/wt/e43r /home/user/wt/e43rh, scratch /home/user/wt/e43r-out (no shots made).
