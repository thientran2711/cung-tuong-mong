# fix7-r2 + pcport-r2 — report (opus FIXER, Foreman B; brief dev/handover/briefs/b-fix7-remerge-pcport-extra.md)
PRIORITY #1 CHECK ('bareCheck tgBlank fix-7' + 'pcport rk'): OD 0 | ledger 0 | claims 0 | main 0 | review/* robot-coop-fix-7-rv 1b32c409, robot-bugs-m1 13b0907a (in LC14 a72480eb), pcport-rk cc27f8c7, F bc-stack-r 5c062a05 (LC15 eaaae7c8) → reused all; nothing new.
START_CTX ≈ 4 %; finished ≈ 27 %.
BASE (both): review/lc15-bcstack-on-mfix2 **eaaae7c8** = LC15 READY 15 (contains robot-bugs-m1 a72480eb/13b0907a AND eaaae7c8; temper d374266f is HOLD → not taken).

## (A) review/robot-coop-fix-7-r2 — BIG
Re-merge of fix-7-rv 1b32c409 on eaaae7c8 (conflicts: j74.js guard block + generated index.html/sw.js, rebuilt).
ONE «#title never bare» guard = m1's tgBlank / tgFix / tgSoon + closeModal wrap (kept). fix-7's bareCheck MutationObserver + bareT DELETED; its cases folded into the one guard:
- cover list = `#kload,#klife,#kroul,#coopfz,.kmov`, visible-only (getClientRects; fixed layers) — m1 lacked #coopfz / .kmov (the co-op freeze panel / move layer: the guard must not open the menu over them);
- way back = backToGame() (lifeBehind: a solo life, or a co-op life whose room is still open on this seat) = the SAME path as the home card's ✕ (homeMr) and «Trở lại cuộc chơi» — m1 used resumeGame (reload of the last sổ: no way back when the life has no saved sổ, and in co-op it would load the solo sổ); a left room / dead life → home menu.
- `git grep bareCheck|bareT` on the branch = 0; j74 MutationObservers = 3 (the old T-hidden dropAll + the guard's two watchdogs). __ctmBare counter kept (tgFix bumps it).
Kept from fix-7: jslots ☰ keeps the room (co-op life menu CTM_ROOM_LIFE: Trở lại cuộc chơi / Rời phòng / Sổ luân hồi / Thiết lập), «Rời phòng?» kitConfirm, «Hảo hữu đã rời phòng» freeze row (jcooplobby), solo ✕ = back to the game.
New test dev/test/title-never-bare.js (G1–G6: first open, module hides #modal, closeModal, life behind w/o saved sổ, #coopfz cover waits, dead life) — the guard itself (coop-title-leave stays green even with the guard off, because fix-7's menu paths never reach it).

| gate | result |
|---|---|
| coop-title-leave fix, Fold-host / iPad-host (COOP_SWAP=1), local Worker | 110/110 PASS ×2 (twice each) |
| coop-title-leave LIVE 9f72524b Fold-host / iPad-host | 45/112 FAIL / 45/112 FAIL |
| coop-title-leave MUTATE old ☰ leaveRoom | 81/112 FAIL |
| title-never-bare fix (Fold 755x1000 + iPad 1180x820) | 18/18 PASS |
| title-never-bare LIVE / m1-only base eaaae7c8 / MUTATE tgFix off | 6/18 FAIL / 10/18 FAIL (G1 ✕ on first open, G4, G5) / 8/18 FAIL |
| coop-e2e SWAP=0 / SWAP=1 (local Worker) | 142/142 / 142/142 |
| coop-keymove-unit | 12/12 |
| coop-cal-rebirth (fix-6's test, copied, not committed) fix vs base eaaae7c8 | same: case 1 = 4 FAIL on both (cause 4, fixed by fix-6, not in this base); full run 40 FAIL/15 ok vs 39/16 (cascade; one fix warm-up FAIL was a flake, rerun ONLY=1 = base exactly) → no regression |
| quickcheck ALONE (old save) | PASS 860 s, core gates PASS, old save ok |
| button-crawl (core gate 90) | PASS on fix; FAIL on base eaaae7c8 «Ô lưu [Cung Tường Mộng] · Lui did not close its layer» → fix-7-r2 FIXES a base fault |

## (B) review/pcport-rk-r2 — SMALL
Extras of cc27f8c7 re-based on eaaae7c8; F's pcPort String(f.rk) REPLACED by the one reader rkStr (law 14). Details + table: dev/handover/reports/pcport-rk.md «## r2» on the branch.
rk-scan base 8 raw → 0 PASS; pcport-rk PASS Fold+iPad; MUTATE rkStr := String() (F alone) FAIL 20 cases ×2; quickcheck ALONE: old save ok, perf ok, only button-crawl FAIL = the pre-existing base fault above (fixed by A). S.rk = jrank tracker object on the PERSON S, never a figure field (figures via pMe) → not a real writer, left as is.
Lander note: A and B touch different files (A j74/jslots/jcooplobby, B j3/j10/j15/j60/jerr) → stack either order, rebuild generated files.

~100% xong / ~100% chơi được (for these two items).

## REVIEW (B BIG reviewer session_01N1tNP6atYBYSrnARCqzZSo, 25/11 ~19:40Z) — PASS
PRIORITY #1 CHECK ('robot-coop-fix-7-r2'): OD 0 | ledger 0 | claims 2 (fixer 6y9kB42W + this seat) | main 0 | review/* 1 (review/robot-coop-fix-7-r2) | archive 0 → reuse: m1 tgBlank/tgFix (in LC15 eaaae7c8) + fix-7 cases. START_CTX ≈ 5 % (estimate, window 1M); depth 4.
Head 86f289e8 (base eaaae7c8). LIVE moved twice during the review (LC15 → LIVE 17dfa64d → LC16 stack) → verdict sha = **review/robot-coop-fix-7-r2-rv 6ad6631f1bb4c3d3f451e93cba0ea60cb7500999** = head merged onto LC16 top 351122ba (kit-music) via bf73553d (on LC15 45b10432) and f2216a70 (on 08e7d79f). Code delta vs 351122ba = j74/jslots/jcooplobby only (same 70+/21- as the head); every conflict was a generated file or a doc whose fix side = base (taken from the stack); index.html/sw.js rebuilt.

| check | result |
|---|---|
| (1) ONE title guard, law 11 | PASS — git grep bareCheck/bareT = 0; tgBlank/tgFix/tgSoon only in j74; no other module watches #title to reopen a menu (jk4 #rtoast catcher, kitModal kptitle tag = not guards). Leave paths: jslots leaveRoom (via leaveTold for «Rời phòng» and the freeze «Về màn đầu» when open). Note (not a fault): jcooplobby freeze «Về màn đầu» while status ≠ open (moved / reconnecting) still calls COOP.leave(true) directly (pre-existing; can't tell the friend, and mark() would write a stale snap on a «moved» seat) |
| (2) fix-7 cases kept | PASS — bareCheck covers ⊂ TG_COVER (#coopfz,.kmov,#kroul + #kload,#klife); same backToGame-else-home way; triggers ⊃ (modal hidden/class + title hidden + closeModal). Rows: G2/G3 (module hides #modal / closeModal), G4 (life behind w/o saved sổ → backToGame), G5 (#coopfz cover waits), G6 (dead life); co-op C1–C8 unchanged (diff 1b32c409..head on coop-title-leave.js = 0). Gap (minor): no row for a .kmov cover |
| (3) kit only (law 9) | PASS — co-op life menu = .kpmenu.n4 + .kbtn k1/alt (same parts as the solo home), ask = kitConfirm, ✕ = #mr kit ✕, freeze panel = kpHeader + kitRows (its inline kpnote margin is pre-existing) |
| (4) co-op leave/return never bare | PASS — both seats, both host orders: C1–C8 incl. reload mid-room; shots looked 3× (see below) |
| (5) «Ô lưu · Lui» crawl | base eaaae7c8 button-crawl --fast FAIL «Ô lưu [div#modal.kptitle:Cung Tường Mộng] · Lui · close button did not close its layer» → head quickcheck G4 PASS. (LC15 top 45b10432 already PASSes the crawl, so on the stack this item is already green) |

Tests (local Worker = wrangler dev --local :8791 from coop/worker):
- coop-title-leave: head SWAP=0 110/110, SWAP=1 110/110; LIVE 9f72524b (CTL_ROOT) SWAP=0 45/112 FAIL, SWAP=1 45/112 FAIL; on LC15 merge bf73553d 110/110 ×2; on LC16 merge f2216a70 110/110 ×2 (with extra c6/c7 shots); on 6ad6631f SWAP=0 110/110; title-never-bare 18/18 and kit-music ALL PASS on 6ad6631f.
- title-never-bare: head 18/18, MUTATE tgFix off 8/18 FAIL (G2–G6 bare on Fold+iPad); bf73553d 18/18; f2216a70 18/18.
- coop-e2e: head SWAP=0 142/142; head SWAP=1 1st 141/144, rerun 142/142, rerun 141/144 — all three FAILs = «week after rebirth advances» (host stuck at night after the guest's rebirth) = the week-end/rebirth family of fix-6; base eaaae7c8 SWAP=1 137/144 with the same family (week 2/3 stuck) → pre-existing, not this branch. bf73553d 142/142 + 143/143 + 142/142; f2216a70 142/142 + 142/142.
- coop-keymove-unit 12/12 (head, bf73553d, f2216a70).
- coop-cal-rebirth (fix-6 test copied, not committed): ONLY=1 head 11 ok/4 FAIL = base eaaae7c8 11/4 (same lines); full bf73553d 25/58 vs LC15 base 45b10432 17/58 (cascade noise; cause 4 is fix-6's) → no regression.
- quickcheck ALONE (old save from LIVE): head PASS (old save ok, core gates PASS, 894 s); bf73553d PASS (957 s); f2216a70 PASS vs LIVE 17dfa64d (old save ok, perf render 251/279, buổi 1664/1771, 1028 s).
- Shots (scratch, deleted): Fold 755x1000@2 + iPad 1180x820@2, both host orders: co-op life menu (Trở lại cuộc chơi / Rời phòng / Sổ luân hồi / Bảng vàng / Thiết lập, kit ✕), «Rời phòng?» ask, leaver's home menu (no ✕), friend's freeze «Hảo hữu đã rời phòng» (Chép đường dẫn / Về màn đầu), both seats back in the game after Trở lại phòng, Về màn đầu → home with buttons. No cut text, no bare cover. Looked 3×.
Laws: 9 PASS, 11 PASS (one guard, one leave path for open rooms), 12 PASS (both devices), 13 PASS (check line), 14 PASS (old guard deleted, not kept beside), 1–8 not touched.
