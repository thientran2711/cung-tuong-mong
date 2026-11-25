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
