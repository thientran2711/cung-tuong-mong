# review-one-core-dup-r2 — independent opus re-reviewer (BIG), session_01N1tNP2Wcx1hby3C2UmyxPs, coordinator Foreman B S2 (session_01N1tNP5QYubNg1dqA9BZitC)

PRIORITY #1 CHECK ('one-core-dup|balSg|one-core-text|BAL.eff'): OD:L1267 (text prints the constant) | main 6c4f21c3: BAL.eff in jbaleff.js, no balSg | review/* one-core-dup-r1 3d43d535 (FAIL 71 texts), one-core-dup-r2 f97a5841 (this), one-core-dup2(-r1) (merges r2) | claims B fix session_01N1tNP2SKjMzEdsyLuEZtJa
START_CTX ≈ 6 % of window; no rollover needed.
Reviewed review/one-core-dup-r2 @ f97a5841 (origin/main 6c4f21c3 already contained). No reviewer commits, no verdict branch (no test seeds added).

## VERDICT: FAIL — item 1 only: ~34 typed amounts of BAL.eff values are still in player texts (the worker's scan and its new guard miss them). Items 2–5 PASS.

## 1. r1 FAIL item closed? — FAIL
The 101 converted sites are right (see 2). But my own scan (independent, token-based, ±400/±1500 chars, no if/else exclusion, plus relAdd-derived oán = |n|×BAL.relOan.hurt, plus an action-keyed pass ACT key → BAL.eff read in its f / the functions it calls → AOUT[k] / evidenceActs add(k) / j78out k) finds these texts still TYPING a BAL.eff amount (change the BAL value and the text lies). All checked by hand; coincidences (typed apply({th:3}), ap({danh:-8}), T.kho-8, maid loyal -5 …) removed.

A. Same option / same rule, a text the scan did not reach:
| # | site | typed text | constant |
|---|---|---|---|
| 1 | j9.js:55 x (Nhờ giúp đỡ, aff<30) | "nàng quý ngươi -3" | BAL.eff.j9.run_5 (the run line already prints it) |
| 2 | j71.js:126 (Bày tiệc lớn, G7 per guest) | "thiện cảm +6" | BAL.eff.j71.go_5 (relAdd in go) |
| 3 | j95.js:405 (Nhận lễ) | "nàng quý ngươi +6" | BAL.eff.j95.j95bribeTake (go → j95bribeTake) |
| 4 | jtsb.js:142 (Báo lên judge) | "kèm: nàng oán ngươi +10" | BAL.eff.jtsb.go_2 (oanAdd in go) |
| 5 | j34.js:47 (Kết quả tranh ghế) | "Người thua thêm Oán với người thắng (+10)" | BAL.eff.j34.contestEnd (line 46) |
| 6 | j55.js:62 (tdAsk, else branch) | "nhà ${c} thế lực -3" | BAL.eff.j55.tdAsk (line 60; the if branch prints it) |
| 7 | j55.js:174 (Nhờ cha dâng sớ button) | "tốn: nhà ${myC} thế lực -3" | BAL.eff.j55.tdAsk |
| 8 | j55.js:115 (tdPop Sớ khen) | "Nhà ${c} thế lực +3" | BAL.eff.j55.tdSoMonth (line 114 prints it) |
| 9 | j21.js:56 inviteBtn | "hỏng: nàng từ chối, thiện cảm -3" | BAL.eff.j21.top (j21:61) |
| 10 | jpoison.js:70 pgLine | "hỏng: ${t.name} với ngươi -6 vì nhận ra vị lạ" | BAL.eff.jpoison.pgGive (j67 prints it) |

B. Preview tables keyed by action (AOUT / evidenceActs add() / j78out / risk:) — far from the rule:
| # | site | typed text | constant |
|---|---|---|---|
| 11 | j78.js:113 maid spy risk | "oán ngươi +5" | BAL.eff.j78.j78maidFail (j78:108 prints it) |
| 12 | j78.js:156 + j78.js:188 trinhhh | fail "Hoàng hậu thiện cảm -5" ×2; risk "quý ngươi -10" | j78.f_3; j78.f_2 |
| 13 | j78.js:157 + j78.js:189 uyhiep | "oán ngươi +10" ×2; fail "oán ngươi +15" ×2 | j78.f_4; j78.f_5 |
| 14 | j78.js:187 trinhth | risk "quý ngươi -15" | j78.f |
| 15 | j78.js:190 banphe | "thiện cảm +8"; risk "oán ngươi +5" | j78.f_6; j78.f_7 |
| 16 | jtsb.js:93 AOUT.batnat | "oán ngươi +10"; "oán +12" | jtsb.tsbBulNpc_2; tsbBulNpc_4 |
| 17 | jlost.js:242 AOUT.laydo | "nàng thù -4" | jlost.loSteal |
| 18 | j92.js:298 AOUT.vp; j92.js:353 AOUT.giahoa | "thù -12"; "thù -20" | j92.wdAccuse; j92.wdFrame |

C. Derived amounts (relAdd: the hurt one gains oán |n|×BAL.relOan.hurt; precedent j2 stealKem prints Math.round(B.rel*BAL.relOan.hurt)):
| # | site | typed text | from |
|---|---|---|---|
| 19 | j2.js:145 (Khiêu khích rival) | "oán ngươi +9" | BAL.eff.j2.go_2 −15 × .6 |
| 20 | j78.js:127 spy-caught wrapper | "nàng quý ngươi -8, oán ngươi +5" | BAL.eff.j8.f −8 (and ×.6) |
| 21 | j78.js:127 lục rương (risk + run text) | "nàng quý ngươi -15, oán ngươi +9" ×2 | BAL.eff.j2.run −15 (and ×.6) |

Guard gap (why one-core-text says 0): "beside" = nearest option object / ±300 chars and texts in the other if/else branch are skipped, so a preview (x/risk/AOUT/add()) in another function or branch is never compared; derived amounts are not modelled.
FIX (worker): print the constant in all rows above (balSg/balAb; derived: Math.round(Math.abs(v)*BAL.relOan.hurt), one small helper next to balSg); extend dev/test/one-core-text.js with (a) an action-keyed pass (ACT key → BAL.eff in its A(...) f and the functions it calls → AOUT[k], evidenceActs add("k"), j78out k, ACT[k].x/risk), (b) no branch exclusion when the text is in a sibling branch of the SAME rule function (j55:62), (c) relAdd-derived oán; plant one of each as a negative test; rerun my list → 0.

## 2. No visible wording change — PASS
My own check (not the worker's text-same): for every file changed r1→r2, replace each `${balSg(BAL.x)}` / `${balAb(BAL.x)}` with the value, `get x(){return `…`}` with `x:`…``, normalise "…"≡`…`, compare line by line with r1: 110 substitutions, 21 files, the only lines left different are the two rule lines j55:46 / j55:125 `apply({hh:-5})` → `apply({hh:BAL.eff.j55.ccStep / tdSoMonth_5})` (both −5) and the jbal.js helpers. balSg(−4)="-4", (4)="+4", balAb(−4)="4". Worker's one-core-text-same also PASS (20 modules).

## 3. Load-order getter (j30 xinhh `get x()`) — PASS
- One module order only: dev/build/assemble.py (one list); build_site.sh wraps that same dev/index.html; coop/worker (Cloudflare) runs no game code (imports merge.js/vault.js only); old saves hold S, never ACT.
- Getter is configurable (object literal), A() stores the object by reference; every later ACT pass (jaudit:112 defineProperty, j85/jecon/jwhy loops) runs after jbal; no `ACT.xinhh.x =` write anywhere (a write to a getter-only accessor would be silently lost in sloppy mode); jweather cardH writes a.x only on deck cards (not ACT).
- Guard early-read pass works: planted `const __t=BAL.eff.j30.f;` at j30 load → FAIL "j30.js:45 reads BAL.eff.j30.f at load, before the file that sets it". quickcheck open 0 errors.

## 4. Gates — PASS
- one-core-guard 0 fails (inline 11609 = baseline); baseline 11645 (r1) → 11609, per-key: 0 grown, 3 shrunk, 0 new; no --allow-grow in any commit.
- one-core-text in coregates G1 (dev/tools/coregates.sh, right after one-core-guard). Negative: `Thân +4` typed back at jlost:219 → coregates G1 writes FAIL "jlost.js:219 eff.jlost.loUI_2=4".
- one-core-dup-same vs r1: 4406 before / 4408 after (+balSg, balAb) / 4406 identical, 0 differ.
- one-core-eff-same on the F3 tree 076aa4ed vs 16d4925f: 42 modules, 326 refs, 0 fails.
- quickcheck f97a5841: PASS · core gates PASS (guard + text · rules-one-source · kit-conform · coop-one-world hook) · time-spill PASS · open 1549 ms 0 errors · old save ok (loads, plays a buổi) · perf new/live render 243/238, tab 305/329, buổi 976/844.
- coop-e2e 60/60 (no rerun needed; fold/ipad/solo 0 page errors); coop-one-world SEED=7 PASS.

## 5. Merge — PASS with 2 source conflicts to note
- origin/main 6c4f21c3 already in f97a5841 (nothing to merge).
- Trial merges onto f97a5841: one-core-arcs c682afe6 and one-core-roads-r1 75bc9f05 → only assets.json, index.html, sw.js, one-core-baseline.json (as expected).
- one-core-dup2 0ffa37bf → ALSO dev/build/j55.js (ccWord/ccLine: dup2 → chanceLo scale, r2 → `${balSg(BAL.eff.j55.ccStep)}`) and dev/build/j72.js:390–391 (r2 balSg fn_5 text vs dup2 `<BAL.loy.low`): same lines edited both sides; resolve by keeping BOTH changes (no choice to make). Note dup2-r1 reviewer already merged r2 into review/one-core-dup2-r1 8e75df35.

Shots: none (no layout change; texts render byte-equal per item 2). Scratch only under /home/user/wt/rv-dup2-scratch, deleted with the worktree.
