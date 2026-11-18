# review one-core-jkc-2 r1 — PASS review/one-core-jkc-2-r1 d5ea786d1

PRIORITY #1 CHECK ('odb' / 'thiếu bạc cần' / 'fx both'): OD ONE CORE OD:L1267 | ledger 0 | main 086f1d607 (= one-core-jkc r1 live, contains dev/test/one-core-text-rule.js) | review/* review/one-core-jkc-2 da026fc87 (under review), review/one-core-jkc-r1 9f3c96854 (in main) | claims CLAIMS:864 = this session. Reused: dev/measure/one-core-dup2-same.js, one-core-fx-both.js, dev/tools/quickcheck.sh, dev/test/* gates.
START_CTX ≈ 4 % of 1M (estimate) → rollover 29 %, ceiling 60 %. Not reached.

Reviewed: review/one-core-jkc-2 da026fc87. Result branch **review/one-core-jkc-2-r1 d5ea786d1** = da026fc87 + merge origin/main **086f1d607** (41929f54d) + reviewer fixes (1ed9e2fca, 2766e97a6) + merge origin/main **b5d109fe0** (95add5035; main moved during the review: batch-s31b r2 + coop-thin-b-r3) + proof list line (d5ea786d1). origin/main b5d109fe0 is an ancestor (fast-forward-able).

## Verdict: PASS d5ea786d1

## 1. Merge main 086f1d607 (contains one-core-jkc r1 + world-events-2 + staff-root)
Conflicts, resolved by taking MAIN's code and putting the branch's keys into it (values equal):
| file | main change | branch key kept |
|---|---|---|
| j10 fillStaff / plantServ | hhHas, capTrim, capSweep (staff-root) | BAL.house.hireBac 20, plantBac 40 |
| j29 hire card + click | hhHas count | BAL.eff.j29.bacFx -20 (fx + log), BAL.house.hireBac |
| j6 data-hire | capOf/hhHas room check | BAL.house.hireBac |
| j42 cnvName | wording «vốn nhiều ác ý» | BAL.odb.j42.odO_10 40, BAL.eff.j42.tinGo_5 -15 |
| jbal2 | world-events-2 batch 2 keys | odb block appended after it |
| index.html / sw.js | — | site rebuilt |
Second merge b5d109fe0: j2 goTo = main's rewrite (cap / recAt) with BAL.odb.j2.odGoTo 40 put back; jbaleff = branch side (holds main's keys too); CHANGE.txt both lines (this one on top); site rebuilt.
After the merges: guard 3845 ≤ 3846, one-core-text / text-rule / bind PASS (main's new code adds no typed rule number).

## 2. Value-identical moves
- `node dev/measure/one-core-dup2-same.js origin/main` (b5d109fe0) on d5ea786d1 → **PASS, 61 modules, 799 refs put back, 0 fails**. Intended (not identical) list = only j10 staffHTML / j15 staffTabHTML (bribeCost), j25 LACK, j70 thrOpts70 + rvButtons, j92 + jtsb TryStatement (actBac), j6 rvButtons (-BAL.tw.reward double minus), jinv kinvOpen («Bạc 10» → «Bạc -10»), jweather wxHit (reviewer fix: «Sức −20» U+2212 → balSg «Sức -20», added to the script's list). Each read by hand: only the lock/cost word changed.
- By hand, 30 random one-line hunks across j10 j14 j22 j24 j3 j34 j4 j42 j68f j7 j70 j71 j72 jeitem jht jkc jpet jroute jtruth j92 (old literal vs key value read in the running page): **30/30 equal** (hireBac 20, plantBac 40, cnvGift 5, jkc.sucO -20, giahoa 40, musk 30, j22.sucTryst 12, j7 odO_15 45 / odO_11 35 / danhGo_7 -5 / thGo 15 / danhGo_5 4 / thGo_2 3, jpet danhGo -3 / rbGo 100, htAsk 5, backer 30, j71 odP_6 40, jroute odO_3 55 / odO_10 14, j68f odP_18 35 / odP_7 35 / ducOk_2 -1, j34 rbI 40, j4 ±4/±3, lookBac 15, j72 tamcoFn 3, court 20, jeitem rbEitReWk 100, jtruth bacFx -10, j70 sacUse 3, j3 odO 30, j24 odO 35).
- Note (not a fault): jpet rbGo / jeitem rbEitReWk = 100 are «roll(100-x)» certainty bases, moved as odds keys; value-identical.

## 3. The two REAL-PRICE fixes — text moved to the rule, rule untouched
- Bribe: rule bribeServ (j29) charges `nv(s,"bribeCost")` on main and here (unchanged). Text + lock in j10 staffHTML / j15 staffTabHTML now print the same call. Seen: Fold 755x1000@2 a greedy servant: «Mua chuộc · Khó · Tốn Bạc -15 · thiếu bạc (có 3)» (was «cần 30 bạc»); iPad 1180x820@2 same card «Bạc -15».
- Schemes: jecon (unchanged) wraps ACT c / ok / f so the charge and the ok check are econSchemePrice(k,a,t); new actBac(k,a,t) returns exactly that (or the base when the act is not wrapped). Lock words in j25 LACK, j70, j92, jtsb print actBac. Measured on a new life: rút thẻ (block) base 40 → real 64–94 by target rank, hủy dung 30 → 47–70, giá họa 40 → 62–94; the old lock said the base. Seen: Fold «Rút thẻ bài · Bạc -84 · thiếu bạc (có 3)», iPad «Giá họa trộm đồ · Bạc -74 · thiếu bạc (có 3)». Kit cost row, no cut text, 0 page errors, 0 overflow at both sizes.

## 4. One rule, one key (one-core-bind)
New keys BAL.house.hireBac/plantBac, BAL.bacFee.*, BAL.actBac.*, BAL.kc2.st.kc.bac*, BAL.odb.*: grep of main's BAL for the same acts (hire, plant, gift, master, midwife, lend, backer, giữ, td, probe, bribe…) → no earlier key for the same rule (npcBribeBac / hitBribeBac are other rules: thái y, mline). bacFee.giu = one rule in two modules (j8 + j75) → one key. one-core-bind PASS (1210 prints, 0 mismatches).

## 5. The 25 text+rule leftovers
- jweather:63 (sảy thai «Sức −20» + ap({suc:-20})) was INSIDE a function — just left, not out of reach. **Reviewer fixed** (2766e97a6): BAL.eff.jweather.sucSlip -20, text prints balSg. fx-both 25 → **24**.
- The 24 left: j8 IT item table (19), jinv:259 tuithom override, jkc:56/57 (IT.ngocboikc / vongbackc), jpet:23/33 pet table — the item's own data row (d / use text next to w / use / suc in the SAME literal). Reachable with the getter pattern (r1 did it for IT.ngocboi), so «left», not «out of reach»; they are item data, not BAL, and the guard freezes the count (can only shrink). For a successor: make the item text print its own row (d getter from w/use) for the WHOLE item family, not only these 24.

## 6. Plants (each appended to a module, gates run, file restored)
| plant | guard | text | text-rule | bind |
|---|---|---|---|---|
| j42 `word(od(55+S.nt/2))` | **FAIL** | pass | pass | pass |
| j71 `roll(30+S.tamco/4)` | **FAIL** | pass | pass | pass |
| j15 `S.bac<25?"cần 25 bạc"` | **FAIL** | pass | pass | pass |
| j25 `"thiếu bạc (cần 50)"` | **FAIL** | pass | **FAIL** | pass |
| j30 `ap(a,{danh:-3});"hỏng: Danh -3"` | **FAIL** | pass | pass | pass |
| j30 `{x:"hỏng: Danh -6",f:…{danh:-6}}` | **FAIL** | pass | pass | pass |
| j15 rule reads hireBac but text types «cần 20 bạc» | **FAIL** (t.need / t.unit) | pass | pass | pass |
Every plant fails at least one gate in coregates. Reviewer fix 1ed9e2fca: dev/test/one-core-text-rule.js FROZEN 14 → {} (TYPED is 0 now; any typed «thiếu bạc (cần N)» fails at once; asked by Foreman B and the worker).

## 7. Tests on review/one-core-jkc-2-r1
| gate | result |
|---|---|
| one-core-guard / one-core-text / one-core-text-rule / one-core-bind | PASS 3843 = 3843 (baseline 3846 → 3843) / PASS / PASS (TYPED 0, FROZEN 0) / PASS 1210 |
| quickcheck 1ed9e2fca (build, G1–G5 incl. rules-one-source, kit-conform, coop-one-world, time-spill, old save, perf) | **PASS** 352 s; render 194/184, tab 332/295, buổi 1019/810 ms |
| quickcheck 2766e97a6 | PASS 349 s |
| quickcheck **d5ea786d1** (main b5d109fe0) | **PASS** 350 s; render 181/175, tab 345/332, buổi 1159/997 ms |
| dup2-same vs origin/main b5d109fe0 | PASS 61 modules, 799 refs |
| coop-e2e | 63/63 on 2766e97a6, 63/63 on d5ea786d1 |
| road-end (2766e97a6) | 50/51 first run (Pixi page error «r.updateLocalTransform is not a function», same flake as the worker saw), **51/51 on rerun** |
| look Fold 755x1000@2 + iPad 1180x820@2 | bribe 15, rút thẻ 84 / 94, giá họa 74, hủy dung real price in the kit need «Bạc 63 (có 3)»; 0 page errors, 0 overflow |
G4 coop-one-world S.wwin seed failure: not seen (G4 passed in both quickchecks).
Shots: scratch /home/user/wt/rjkc2-shots (deleted after verdict); none in git, no CDN folder used.

## 8. Notes for Foreman B (pre-existing, not this branch)
- Hủy dung card (rival card «Giao thiệp»): the act's description x «Sắc nàng giảm mạnh, ân sủng giảm» is shown as a red ✗ need next to «Bạc N (có …)». Same code path on main (generic act need list) — a kit/act-card owner should look.
- cung nữ «Biếu quà đồng liêu» hint starts «Chắc chắn · …» (j42) — VANPHONG forbids «Chắc chắn»; pre-existing wording.
- road-end Pixi page error «r.updateLocalTransform is not a function» (graphics, no number code) seen by the worker and here on a first run.
