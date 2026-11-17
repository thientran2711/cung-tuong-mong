# road-onecore — ONE CORE for the full origin roads (worker report)

Branch `review/road-onecore` (from review/road-b1-fixa-r1 @ c012bf32). Final sha: **59b3d653e1a3ebbe83631247917a4a31de3d7901** (pushed).

## PATTERN (for review/road-b2-fix, review/road-b3-fix2 and every later jrd_<origin>.js)
1. **Where the numbers live:** `dev/build/jbalroad.js` (new, assemble list: right BEFORE `jroad.js`). It holds ALL of `BAL.road`
   (the old block moved unchanged out of `jbal2.js` — add your own `BAL.road.<road>` keys HERE, not in jbal2; jbal2 keeps a pointer comment) plus:
   - `BAL.road.fx["<road>_<n>"] = {<beat>:[opt0,opt1,…], E:{<ending>:fx}}` — one entry per chapter, beats in source order, options in the
     beat's `o:[…]` order (`0` = option with no numbers). `opt = {c, w, l, o}` (stat deltas as before; empty `c:{}` stays).
   - odds `o = [base, term…]`, added left to right by `rdOdds` (bit-identical to the old arrow). Terms:
     `["d",stat,k]` +S[stat]/k · `["m",stat,k]` +S[stat]*k · `["f","a|b",y,n]` +(A.f.a||A.f.b?y:n) · `["e",ch|[ch…],end,y,n]` +(rdEnd(ch)===end?y:n) ·
     `["b",key,y,n]` +(road flag S.st.f14.fb[key]?y:n) · `["k",name,k]` +RDQ[name](A)*k · `["q",name,y,n]` +(RDQ[name](A)?y:n) · leading `-` on f/e/b subtracts.
   - `BAL.road.rare["<road>_11"] = {p,np,sc,c,fx,bar}` — the RD97L rare finale choice; its `x` reads `S.<stat>>=RR(a).bar` and its text prints
     `"Đức từ "+RR(a).bar` (no typed number in the text).
2. **Engine helpers (jroad.js, inside the ROAD14…rdOn slice the scans eval):** `rdDef` → `rdFx(id,def)` puts the numbers back on the options /
   endings at registration (j67 reads the same shape); `rdOdds`; `RDQ` registry (data file sets e.g. `RDQ.cnchuGap=A=>CNCHU_UP(A)>=BAL.road.cn_chu.gap`);
   `rdFb` = the one road flag book (CN_FL / MUOI_FL are now `=rdFb`; new origins use rdFb, no twin); `rdRare(d)` / `RR(a)` for RD97L.
3. **Tools (run from the repo root):**
   `node dev/measure/road-onecore-move.js dev/build <tmp>/table.json jrd_<x>.js …` (strips c/w/l/o/E.fx from the data files, writes the table;
   lists anything it cannot convert) → `node dev/measure/road-onecore-emit.js <tmp>/table.json > lines` (paste inside `BAL.road.fx`) →
   move the RD97L numbers by the same shape (rdRare) → `node dev/measure/road-onecore-same.js <old sha>` (before/after proof, must say SAME) →
   `node dev/test/one-core-guard.js` on top of main (0 fails, no --allow-grow). Add new files to `FILES` in road-onecore-same.js.

## Gate count of the sibling branches (written down, NOT fixed) — one-core-guard (time-spill-r1 baseline), road files only, distinct fails / occurrences
| branch | jrd_tt | jrd_cn | jrd_muoi | jrd_dtq | own new files | road-file fails |
|---|---|---|---|---|---|---|
| review/road-b2-fix @75539e2d | 80 / 1274 | 83 / 1073 | 73 / 1126 | 67 / 1270 | jrd_ch 90 / 1510 · jrd_nc 80 / 1349 · jrd_td 75 / 1416 | 548 |
| review/road-b3-fix2 @83641f2a | 80 / 1275 | 83 / 1079 | 73 / 1131 | 67 / 1270 | jrd_cnv 103 / 1444 · jrd_thd 74 / 1349 | 480 |
tt/cn/muoi/dtq are fixed here (they take them from this branch on merge); their own new files need the pattern. (Their total gate fails,
900 / 888, also hold stale-base numbers of other modules that main's one-core already moved: a merge of main clears those.)

## What changed (this branch)
| file | change |
|---|---|
| jbalroad.js (new) | BAL.road (moved from jbal2) + BAL.road.fx (112 chapters) + BAL.road.rare (16) |
| jroad.js | rdFx / rdOdds / RDQ / rdFb / RR / rdRare; rdDef calls rdFx |
| jrd_tt / jrd_cn / jrd_muoi / jrd_dtq | no c/w/l/o/E.fx literals; RD97L via rdRare; CN_FL / MUOI_FL = rdFb; RDQ entries (cn, dtq) |
| jbal2.js | road block moved out (pointer comment) |
| assemble.py | jbalroad.js before jroad.js |
| road-option-scan.js / road-fixb-scan.js | also load jbalroad.js (output byte-identical before/after) |

## Before / after value table (dev/measure/road-onecore-same.js vs c012bf32)
| origin | chapters | c (cost) | w (gain) | l (loss) | o (odds fn) | odds trials | E fx | differences |
|---|---|---|---|---|---|---|---|---|
| tt | 28 | 583 | 446 | 230 | 316 | 126400 | 84 | 0 |
| cn | 28 | 488 | 377 | 210 | 266 | 106400 | 86 | 0 |
| muoi | 28 | 499 | 347 | 191 | 260 | 104000 | 84 | 0 |
| dtq | 28 | 582 | 344 | 263 | 324 | 129600 | 84 | 0 |
RD97L rare finale choices compared: 16 (p, np, sc, c, fx, condition text, condition answer on 400 lives): 0 differences.
Mutation check: changing one cost and one bar in jbalroad.js makes the proof print both differences.

## Gate
one-core-guard.js, trial merge of this branch on review/time-spill-r1 (the 23:32Z batch = one-core-land-r1 + time-spill-r1):
before 303 fails (4,755 inline numbers in the road files) → after **0 fails** (inlineNow 6691 = baseline 6691), no --allow-grow.

## Tests
| test | result |
|---|---|
| one-core-guard.js on the merged branch (main 744b80e7 + this branch) | **PASS, 0 fails** (inlineNow 6674 ≤ baseline 6691), no --allow-grow |
| road-onecore-same.js (before/after vs c012bf32) | SAME, 0 differences (table above), also after the main merge |
| road-option-scan.js | output byte-identical to c012bf32: FREE GAIN 0, text-only 0, digits 0, every FAIL family 0 |
| road-fixb-scan.js | output byte-identical to c012bf32 |
| road-rare.js 755x1000 | ALL PASS (105), before and after the main merge |
| road-saves.js 755x1000@2 + 1180x820@2 (old main save, phase-1 save, mid-road tt/dtq/muoi/cn) | 7/7 + 7/7 (before merge); 755 after merge: 7/7 |
| road-full.js 755x1000, 1 life/road | tt_co, tt_oan, tt_tranh, tt_mat, dtq_bien, dtq_vu, dtq_binh: every life chapters 1..14 in order, 4 = premise, 5–11 = road, 12–14 endgame, finale told; run stopped by its 28-min timeout after 7 roads (no FAIL) |
| oldsave-r1.js (old solo save, 755/1180/1366) | 16/16, before and after the merge |
| coop-e2e.js (LIVE Worker, merged build) | 59/59 |
| coop-one-world.js | PASS |

## Not done / open (not counted by the gate; next step, same pattern)
- Relation / family amounts typed inside `go:` functions: ~614 calls (rdOan / rdRel / e67dad / e67bien / e67kho / e67ally …), plus the
  `sc:` (Lợi thế) and `k:` (ending tier) values of options/endings. They are rule numbers by OD:L1267; the mover can be extended
  (`g:` list per option in BAL.road.fx). Left for a follow-up so this branch stays a pure, provably value-identical move.

SẴN SÀNG KIỂM 59b3d653e1a3ebbe83631247917a4a31de3d7901
