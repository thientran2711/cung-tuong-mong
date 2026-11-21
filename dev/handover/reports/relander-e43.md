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

# JOB 2 (FOREMAN E #26 order 11:39Z = MAIN 92 11:09–11:11Z): home-chapters → ge-phutang → bang-words re-merge on LIVE
PRIORITY #1 CHECK: claims E43 | review/* home-chapters-r1 5acae7c5, ge-phutang-r6 f37ec5f1, bang-words-r cba883e0 — reused, nothing new built.
All three merged on LIVE d2b97854 (pushed). LIVE then moved to 99795d67 (14:20Z) → NEW conflicts on all three (see «Next» below). NONE is LAND READY yet.

## home-chapters → review/home-chapters-land2 369325be (5acae7c5 + LIVE d2b97854)
| file | LIVE side | branch side | resolved (script /home/user/wt/e43-out/res.py) |
|---|---|---|---|
| assemble.py | list + j68q jkslide jtamco jgenpc jmgx jkcg jkcco jwalk jroad8 | + jbalkc3 jkc3 jkc3a jkc3b | LIVE list + branch files after their branch predecessor (402 unique) |
| jbal2.js | jkcg block (BAL.kcg) | jkc3 block (BAL.kc3) | both blocks (LIVE then branch); one-core G1 PASS (no dup key) |
| jkc.js Tài nghệ cards | `lf:[["af",…]]` loss fields replacing fail() | `S.kc.le>=BAL.kc3.thay.leMax` (was 5) | LIVE lines + leMax in lock and «/${leMax}» text |
| KIT_REQUESTS.md | outside-coop T3 frame row | KR home-stat cost row | both |
| assets.json | v bac37193 31188 files | v 6479c5fd 31053 | regenerated by dev/site/assets.py (CDN index); branch-only paths 0, none lost, 0 dups |
Gates on 369325be: coop-e2e 94/94 · smoke PASS · laws PASS · coop-seats 34/34 · kc-roads coop-together 29/29 + scan/route/direct exit 0 · self-word scan PASS + rare-match = LIVE · role-parity ×2 identical (table b94f2eb8 unchanged).
**BLOCKER: quickcheck perf FAIL twice** (buổi new/live 3865/1397, then ALONE 4578/1666; runs 4578 / 6189 / 1226 → BIMODAL: some new lives take 4–6 s a buổi, others normal). Branch alone was ~1.3–1.5 s vs live 1.1 s («watch it» in home-chapters-review.md). My profile script /home/user/wt/e43-out/buoiprof.js (5 new lives each, no CPU throttle) saw hc ≈ LIVE (0.7–1.5 s vs 1.0–2.2 s) — the slow case did not show; it is per-life (origin / home-chapter beat?). Next: run buoiprof.js with N=15 under `quickcheck.js`'s CPU throttle (CPUX) and print origin + top self-time functions for the slow lives; fix in the branch code (jkc3*), not the gate.
Also seen (NOT branch): quickcheck G4 80-dialog-fixed #54 «new-title plate sits ON the event picture» flakes under load on hc / ge (and is noted failing on LIVE by E42r) — kitDhCap runs on timers 300/900 ms.

## ge-phutang → review/ge-phutang-land2 df05c77c (f37ec5f1 + LIVE d2b97854)
| file | LIVE side | branch side | resolved |
|---|---|---|---|
| jbalge.js | bd_hen line closes `}}`; GE10 help {pull,push}; GE09 npc {on:true, nat,w,leave,news} | pt_* reward lines; old help {rw}; npc {on:false} placeholder | branch pt_* lines + LIVE help/npc blocks (LIVE npc.on:true supersedes the branch's «wait for NPC roads» placeholder → NPC parity now also covers pt roads: LOGIC, reviewer please) |
| assemble.py | LIVE list | + jgedata_pt.js after jgedata_bd.js | union |
| jgedata_pt.js (no conflict, ge-guard FAIL) | self-word renamed 18 pt option labels «thiếp»→«thần thiếp» / {tx} | GE pull/close/lean keys used old labels | 18 strings / 20 refs mapped by script from the LIVE jrd_pt rename (difflib on n:"…" lists, 0 unmapped) |
Gates on 74f8cc54 (before the label fix): coop-e2e 94/94, ge-engine 107/107, ge-pt-scan 85/0, ge-npc-unit 31 OK, COOP_GE coop-e2e 104/104; ge-guard 9/10 → after fix df05c77c: ge-guard 10/10, ge-pt-scan 0 faults, self-word scan PASS, rare-match = LIVE. Full re-gate on df05c77c was running (/home/user/wt/e43-out/ge2.log) at rollover — rerun.

## bang-words → review/bang-words-land2 e156be4c (cba883e0 + LIVE d2b97854)
| file | LIVE side | branch side | resolved |
|---|---|---|---|
| jrd_bd2.js | «Xin phụ vương che chở người ấy» | «Xin {pv} giữ người ấy» | «Xin {pv} che chở người ấy» (LIVE wording + branch token) |
| jstory.js | story-voice svFrame block | arcTitleFill67 block | both |
Gates on e156be4c: quickcheck PASS + old save, core gates PASS · coop-e2e 94/94 · bang-words scan PASS + screen PASS (0 hits) · COOP_LAND nc+bd 98/98 and bd+nc 98/98 · caoly-oldsave 14/14 · bd-legacy-save PASS · ge-guard 8/8 · self-word scan PASS · rare-match = LIVE · role-parity ×2 identical.

## Next (successor) — LIVE 99795d67 conflicts (git merge-tree): hc assemble.py+index/sw · ge assemble.py+index/sw · bw dev/build/jge.js+index/sw
1. bw: merge origin/main, resolve jge.js keeping both (diff by script), rebuild, short re-gate (quickcheck, coop-e2e, COOP_LAND both orders, bang-words scan/screen, ge-guard) → LAND READY (it was all green).
2. ge: merge, assemble union (res.py asm), rebuild, full gates (own-ge.sh) → SSK: short reviewer for the jbalge npc.on line + 18-label remap.
3. hc: merge, assemble union, then the perf blocker above.
Scripts (copied to dev/handover/tools/e43/ on this branch; put them in /home/user/wt/e43-out/): {g.sh,own-hc.sh,own-ge.sh,own-bw.sh,res.py,hunks.py,buoiprof.js} — copy them (container-local). g.sh usage: bash g.sh <worktree> <tag>. Note caoly-oldsave needs `<this url> <main url>` (root index.html), bd-legacy-save `<url>`.
Worktrees to delete: /home/user/wt/e43 e43g e43b e43L e43h, scratch /home/user/wt/e43-out.
