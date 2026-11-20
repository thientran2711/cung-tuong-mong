# rv-mg-back — REVIEW of review/mg-back 883aaa7a (MAIN ROOT-74) — **FAIL 883aaa7a, 3 fixes**
PRIORITY #1 CHECK: OD 20/11 ~04:45Z (owner bug, verbatim in brief) | main d74f86a5: kit ✕ only on result screens (jk4 kitOvSync) | review/mg-back 883aaa7a (only branch) | claims mg-back NLKFjftT (worker), this review JgLB4y1d.
START_CTX ~4 % (1M window); depth 4. Reviewer: session_01Rc5AsJgLB4y1dGfnpRG8qm. Worktree merge: 883aaa7a already contains origin/main d74f86a5 (no new main since) → no merge needed.

## What passes
- KIT (law 9): ONE kit ✕ (jk4 kitXHTML, 32.10, label «Quay lại») in the header of kg82Open on rules / Hướng dẫn / play / result for every caller; kitOvSync adds no second ✕; confirm = kit kitConfirm (j79), only `body.kg82cf #modal{z-index:40}` layering (no new look). No private part. Shots LOOKED: rules, play, contest confirm at Fold 755x1000@2 and iPad 1180x820@2 — ✕ visible, top-right, thumb-reachable, no overlap/cut text.
- Thử tay: ✕ → kind list from rules / Hướng dẫn / between rounds, confirm during play, unfinished kind NOT saved (recSet only at round n), first-try rule untouched; «Thôi» row removed (✕ closes the list).
- During play: give-up through each caller's own lose path (0/10) — fine for every caller (laws 2/3).
- Stake callers on the rules screen = give-up (hội thi: rivals already shown → free escape would break law 2; khảo hạch, tuyển chọn, Phúc tuyển, Tát, Hoàng thượng triệu, Nghiệm thân): OK. jsmg give-up = its free «Thôi, không chơi» result: OK. j92 Chải chuốt rules = straight back, nothing spent: OK.
- Wording: «Quay lại», «Bỏ cuộc?», «Chơi tiếp», «0/10 phần», «Thưởng phạt theo đúng luật của việc này.» — cổ trang, no %.
- Tests (merged build, assemble.py): mg-back.js 755x1000 PASS 8/8, 1180x820 PASS 8/8; mg-ready-guide.js PASS 9/9; ag-mgcal.js all ok; quickcheck functional PASS (core gates, time-spill, open 1572 ms, old save loads + plays, perf ≈ live) but **NOT BUILT** (index.html/sw.js not rebuilt on the branch — main does the final rebuild; not counted as a fix).

## FAIL — fixes for worker NLKFjftT (brief check 2: "before «Sẵn sàng» = back with NOTHING spent"; law 3)
1. **jtd Tu đức — ✕ on the rules screen charges the full lesson for nothing (law 3, cost-only).** jtd.js:240-255: nothing is charged before tdFinish; the rules screen already has «Thôi, để lúc khác · không tốn gì» (`cancel`). With 883aaa7a the ✕ goes to kg82GiveUp → «Sẵn sàng» with KG82.giveUp → result(0) → ✕/«Đã hiểu» → tdFinish(k,mode,0): Sức −selfSuc/mSuc, bạc −cost, khắc spent, gain tdPoints(mode,0). Fix: set `KG82.back=cancel` on the rules screen (clear it on «Sẵn sàng» / «Để trời định», like j92). The scan table row "khắc of the lesson → give up" is wrong.
2. **Callers that charge BEFORE the frame opens — ✕ before «Sẵn sàng» must be a real back with nothing spent (brief check 2; owner: "go back để tôi ra tôi chọn cái game lại").** Before «Sẵn sàng» she has seen nothing that a back could exploit (no rivals, no board), so a back is a neutral no-cost/no-gain choice (laws 2/3 hold). Today these give up with 0/10 and keep what was charged:
   - j83 wkPractice (apply suc −10, spend(2) before playArt), j83 lessonMode/openMG playArt lesson paths (check where the khắc/fee is taken), jrcp rcpMaster (suc −10, bạc −fee, tchPaid, spend(2)), jveil vlCraftRun (spend(2), suc −craftSuc, material) — give the charge back and return to where she came from (or move the charge to «Sẵn sàng» / the quick option). If spend() khắc cannot be undone safely, move the charge; do not refund half.
   - jsgame sgpick `go`: J2.pay() runs before sgPlay → same rule: ✕ on the rules screen = back with the pay undone (or pay moved to «Bắt đầu»/«Giao cho người làm»).
   Keep give-up (as now) for the stake callers listed above. Update the scan table: column "charged before rules screen? (what)" per caller.
3. **jsgame result: the ✕ «Quay lại» silently runs the act («Ra tay», KG82.xdo).** A tap on a control labelled «Quay lại» commits a scheme (cost, roll, consequences) with no word. Fix: on that screen the ✕ asks first with the kit confirm (e.g. title «Ra tay?», lines naming the act + the odds shown, yes «Ra tay», no «Ở lại») — the act stays the only way on (cost already paid), but never without her seeing it. (jtoil / Nghiệm thân xdo only close a shown result: OK.)
- Tests: extend mg-back.js — jtd rules ✕ = no Sức/bạc/khắc change and no tdFinish; each item-2 caller: rules ✕ = state (bạc, sức, khắc, materials, fee mark) identical to before opening; jsgame result ✕ = confirm first. Re-run mg-back (both sizes), mg-ready-guide, ag-mgcal, quickcheck; Fold + iPad shots of the new confirm LOOKED.

## Notes (not blocking)
- While the give-up confirm is open the board clock keeps running («Chơi tiếp» returns to a board that lost time). Worth a pause hook later (parking lot).
- Pre-existing (main): Thử tay kind list at 1180x820 — kind buttons overlap the «Đã thử/Chưa thử» rows (worker's note); own small fix.
- Review shots stayed in scratch (not uploaded); worker's CDN folder img/_review/mg-back/ to be wiped after the final verdict.

---
# r2 — re-check of 7f7d467a (worker fixes a0a98e66 + merge of origin/main 70bea3d3) — **FAIL 7f7d467a, 1 fix**
- Fix 1 (jtd): OK — `KG82.backPre=cancel` = its own free «Thôi, để lúc khác»; cleared by «Sẵn sàng».
- Fix 3 (jsgame result): OK — ✕ asks kit confirm «Ra tay?» (Ra tay / Ở lại), never silent.
- jaudit works card: preBack = card untaken, pending cost dropped: OK.
- Tests: mg-back.js 755x1000 PASS 11/11, 1180x820 PASS 11/11.
- **Fix 2 is wrong in its mechanism — FAIL.** `kgSnap()` (j82) undoes a charge by JSON-copying the whole `S` before the charge and, on ✕, writing back every top-level field that changed. Two real faults:
  a. **Breaks object identity with real NPCs (law 6b).** S holds live references to rival objects (ser() in j6 dedups them via `new Set(rivals)`). Proven in a browser on the merged build: new game → `S.visit.people[2].ref` is a rival object; `u=kgSnap(); spend(2); u()` → that ref is now a detached JSON copy (S→rivals refs 1 → 0). Any later change to that person goes to a ghost copy, not the living NPC.
  b. **Half-undoes the world tick.** `spend()` is wrapped (jptime ptTick/ptLand, j95sync, jmen menWatch, jerr, jwxk, j76): during the 2 khắc, timed errands land and NPC runners change `rivals` (outside S). The restore puts `S.away` back to «not landed» while the NPC side stays done → the errand lands a second time on the next spend (double effect; with p3InvLand an item can be duplicated — law 6c REAL OBJECTS).
- **Fix:** no whole-S snapshot. Preferred: charge only on «Sẵn sàng» / the quick option (the dialog just remembers what it will charge), so a rules-screen ✕ has nothing to undo. A refund after spend() is not clean: the world tick of those khắc already ran, rewinding `used` alone is wrong too. Test: after a rules-screen ✕, every S→rivals reference is the same object (identity), `S.away` unchanged, bạc/Sức/khắc/fee mark as before opening, and no errand lands twice.

---
# r3 — re-check of c43c6066 — **PASS → final df44bc3e** (review/mg-back-rv, FF from LIVE origin/main 30e8714e)
- kgSnap removed. Pre-charged callers (j23 lesson + j2, j83 practice/lessons, jrcp teacher, jveil craft, jsgame paid choice) now only REMEMBER the charge (kgDefer); kgPay takes it on «Sẵn sàng», the quick option, any result, or an outcome close. A rules-screen ✕ never calls spend() and restores nothing (law 6 faults of r2 gone: nothing to detach, no world tick to half-undo). Lesson charge kept in S.mg.pay → a reload reopens the same unpaid lesson, never a free one; old saves without it load as before.
- Read in code: material bạc of the dialog sits in jaudit's pending cost and drops with the back; «Học nhanh» / «Giao cho người làm» pay via kgPay (kg82ShowRes / kg82Close).
- **Reviewer fix (law 4, one core):** quickcheck G1 one-core-guard FAILED on r3: new duplicate inline `suc:-10` in j83 wkPractice + jrcp rcpMaster (fallback branch). Fixed on -rv: each names its charge once (`pc`) and the fallback reuses it → G1 PASS (fails 0).
- Final merges on review/mg-back-rv: LIVE 70bea3d3 → 377d5ce3 → 892e5bb0 (conflict j82 kg82Play: kept the give-up 0 AND mg-score-same's board mark `kg82Set0("score",gm)`; mg-score-same-scan: 35 cells via the one grade, kg82Play ends on the given mark: True) → 30e8714e. index.html/sw.js rebuilt by build_site.sh each time.
- Tests on the final build: mg-back.js 755x1000 PASS 12/12 (also 1180x820 PASS 12/12 on 6d22c619, last j82 change); mg-ready-guide PASS 9/9; ag-mgcal 0 FAIL; quickcheck PASS (core gates, time-spill, open 1430 ms, old save loads + plays, perf ≈ live).
- Laws touched: 2/3 (free back before «Sẵn sàng» = no cost no gain; stake callers keep give-up), 4 (fixed), 6 (no snapshot), 7 (wording cổ trang), 9 (one kit ✕ + kit confirm), 11 (whole group of callers, scan table), 12 (Fold + iPad shots looked in r1; r2/r3 change no layout).
- Main: worker's CDN folder img/_review/mg-back/ to wipe now (python3 dev/site/cdn_sync.py --wipe-review mg-back).
