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
