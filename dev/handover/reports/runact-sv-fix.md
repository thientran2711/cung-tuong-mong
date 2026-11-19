# runact-sv-fix — j29 runAct wrapper `sv` ReferenceError

PRIORITY #1 CHECK: OD 0 | ledger 0 | claims runact-sv-fix (this worker) | main: bug live at dev/build/j29.js:7-12 (2bda29a1) | review/*: REVIEW F6a has the identical hoist on review/coop-thin-f6-r1 (same name `sv`, merges clean).
Worker session_01N1tNP5qKRnDd9rqJPdwUFh (sonnet SMALL). Branch review/runact-sv-fix @ c623c7c8 (from origin/main 2bda29a1). START_CTX ~3 %.

## Repro (LIVE build, solo, step 0)
Fresh solo game, `stf2Ord` forced to «half» (the «qua loa» answer), `together` false, `runAct(S, rival, k)` for every k in DIRTY (19 kinds incl. bribel/laydo/laydol/giahoa/xx):
LIVE index.html → ALL 19 throw `ReferenceError: sv is not defined` (j29 `const sv` lived inside the DIRTY if-block; `oc==="half"` line read `sv.name` outside it). The co-op thin path also logs it (`thin F run runAct ReferenceError`).

## Fix
dev/build/j29.js: `let oc=null,sv=null;` before the block, `sv=(DIRTY_SENT[k]||bestSent)(a)` assigned inside. 2 lines. No number, rule or UI change.

## Scan table (LUẬT SỬA CẢ NHÓM)
Script: acorn + eslint-scope over every `runAct=function` wrapper (25 files, 29 wrappers); flags any identifier declared with const/let/var inside a wrapper but resolved as an undeclared global at a reference inside the same wrapper (= block-scoped name read outside its block).
| | wrappers | leaks |
|---|---|---|
| before (main 2bda29a1) | 29 | 1 — j29.js:7 `sv` @ line 12 |
| after | 29 | 0 |
Other half-branch reader j83.js:247 (`hf`) is hoisted correctly; not affected.

## Gates
- Solo probe after fix: poison/kpoison/frame/plant/musk/catswap/pushp(qua loa path)/bribel/laydol return «làm qua loa…»; the rest (pushp pond ksab vp steal takeaway bribe laydo giahoa xx) run their act with no throw; 0 page errors. Probe note: kframe/pond throw inside ACT.f (not the wrapper) only because the probe passed a rival, not a child, as target — unrelated to `sv`.
- one-core guard: PASS (0 fails, inline 3977 ≤ baseline 4212).
- ag-stf2: ALL 23 PASS (ord_half 220 picks, 12 weeks, no throw).
- coop-e2e 68/68; COOP_SWAP=1 68/68 (includes single-player + old save load, 0 page errors).
- coop-thin-f1 L6: LIVE 18/24 (F1 kpoison, pond, "every ACT kind", F2 gift ×2, page error `sv is not defined`) → fix 20/22 (only F2 gift ×2 left = coop-ptime-reds' job). Better than LIVE.
- assemble.py + build_site.sh rebuilt (index/sw/assets committed on the branch).

## Done
SẴN SÀNG KIỂM c623c7c8
