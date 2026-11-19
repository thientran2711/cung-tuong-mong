# runact-sv-fix — j29 runAct wrapper `sv` ReferenceError

PRIORITY #1 CHECK: OD 0 | ledger 0 | claims runact-sv-fix (this worker) | main: bug live at dev/build/j29.js:7-12 (2bda29a1) | review/*: REVIEW F6a has the identical hoist on review/coop-thin-f6-r1 (same name `sv`, merges clean).
Worker session_01N1tNP5qKRnDd9rqJPdwUFh (sonnet SMALL). Branch review/runact-sv-fix @ 868c682c (from origin/main 2bda29a1). START_CTX ~3 %.

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
SẴN SÀNG KIỂM 868c682c

## REVIEW r1 (sonnet reviewer, sha 868c682c, main 2bda29a1 unmoved)
PRIORITY #1 CHECK: OD 0 | ledger 0 | claims runact-sv-fix | main bug at j29.js:7 | review/* coop-thin-f6-r1 same hoist.
Verdict: PASS 868c682c (fast-forward of main 2bda29a1).
1. Diff vs main: only dev/build/j29.js (2 lines) + rebuilt index.html/sw.js/assets.json. Refusal/nhát gan/trung thành lines untouched (only `const sv` -> hoisted `let oc=null,sv=null` + assignment). assemble.py re-run on the branch: no diff.
2. Solo probe (own script, 19 DIRTY kinds, stf2Ord forced "half", together false): main 19/19 throw `sv is not defined`; fix 0 sv throws, «làm qua loa» returned, 0 page errors. 5 kinds (kpoison kframe pond ksab takeaway) throw inside ACT.f (stack not in j29) only because the probe target is a rival, not a child — same as the worker noted.
3. Family scan: grep 'runAct=function' = 29 wrappers in 25 files; only j29 declares block-scoped names read outside their block (j83 `hf` already hoisted). 0 leaks after.
4. j29 lines 6-12 md5 identical to origin/review/coop-thin-f6-r1 -> later merge clean.
5. No number/rule/UI change (laws 4, 9 untouched; text/wording unchanged).
Gates: one-core PASS (3977 <= 4212); ag-stf2 ALL 23 PASS; coop-e2e 68/68; COOP_SWAP=1 68/68; quickcheck PASS (old save ok, perf same); ts-oldsave ok (12 weeks, 0 errs).
coop-thin-f1 L6: main LIVE 19/26 (frame, kpoison, laydo, every ACT kind, F2 gift x2, page error sv); fix 20/22 twice (only F2 gift x2 = coop-ptime-reds), one run 19/22 and one 18/22 with F1 accuse / real-tap flakes (different case each run; main passes them -> random-world flake, not sv). No sv error in any fix run.

## REVIEW r1 — FAST PATH (main moved to 3584ea42)
Merged origin/main 3584ea42 onto review/runact-sv-fix-r1 (only index/sw conflicts; rebuilt by assemble.py + build_site.sh). Diff vs main = j29 (2 lines) + index/sw/assets. Probe (20 rounds x 19 DIRTY kinds, «qua loa» forced): main 40 `sv is not defined` throws, fix 0, 14 kinds reach «làm qua loa»; 0 page errors. one-core PASS (3837 <= 4212), ag-stf2 23/23, coop-e2e 68/68, quickcheck PASS (old save ok). Main re-fetched right before: still 3584ea42, fast-forwardable.
PASS review/runact-sv-fix-r1 71e7b382
