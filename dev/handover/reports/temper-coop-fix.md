# temper-coop-fix (T3, session_01D3E3NahMdBiqkSMSUWYn5q) — review/temper-coop-fix 73358b4d
PRIORITY #1 CHECK: OD temper-outburst (FOREMAN_D_STATUS 13:45Z/13:57Z FROM MAIN 140/141) | main none for the test fix | review/* temper-outburst-fix 39561518 (RV3 PASS), temper-perception-rv 97d6ba10 (separate), net-ghen-2 (same coop flake, NO temper commits) | claims T3.
START_CTX ≈ 4 %. Base = review/temper-outburst-fix 39561518. Branch = 39561518 + ONE test-only commit 73358b4d (dev/test/emotion-acts.js). No game change.

## Job 1 — emotion-acts FAIL 16 at LC15 23e5b84f = stale test (fixed, test only)
| case | cause | fix |
|---|---|---|
| gian, vui, scold, scoldlive, out, gen, ext, lock, oldsave | set raw `S.mood.v`; the fix reads the SHOWN bar (eaMV/kitMoodVal = moodBar = signed sum of causes S.mk) → recomputed away | `window.__bar(v,feel,str)`: clear causes, feeling as a real cause (emoSet), rest by one bar push (mkBar) — same as the lock case / emotion-acts-2 plock already did |
| vui | eaMine = bar past the line AND the matching feeling (OD 17/11 ~18:33Z (1)); case had no joy feeling | `__bar(45,"vui",60)` |
| scold, scoldlive, hit, gen, ext (nodlg, MAIN TOO) | CSS `#kroul,.kroul,.kmov{display:none}` hid the roulette wrapper #kroulw / kit edict scene; still an ACTIVITY for the day queue (jdayq dqActEl) → every card held for ever | no hiding; fresh1 waits until the roulette is really gone; lib/coop-clear.js `tap()` ends scenes as a player (shared step, reused) |
| hit | NPC outburst on the live jfeel path is per buổi (feelActTick), not the weekly eaWeek roll (eaActsJfeel) | case runs the khac reaction itself (eaDo) when jfeel is on |

| build × test | Fold 755x1000@2 + iPad 1180x820@2 |
|---|---|
| fix 39561518 × old test | FAIL 18 |
| main 9f72524b × main test | FAIL 12 (pre-existing) |
| fix × NEW test | **PASS ×3** |
| main × NEW test | FAIL 2 = only `gen` (expected: main has no choice frame) |
Debug aids: env EA_ONLY=case,case and EA_DBG=1.

## Job 2 — coop-e2e flakes with the temper step = PRE-EXISTING on main (not temper)
Same 3 fails («fold #next enabled», «buổi 3:x advanced for both», «week after rebirth advances») reproduced on origin/main 9f72524b (no temper code), same dump.
Flake table (coop-e2e, fresh assemble, one browser pair at a time; load = 3 × `yes` on 4 cores):
| build | alone | under load | total clean |
|---|---|---|---|
| fix 39561518 (+test) | 4/5 (1 × the 3 rebirth fails) | 3/3 | 7/8 |
| main 9f72524b | 2/3 (1 × the 3 rebirth fails) | 1/3 (1 × rebirth fails + 2 K61 mask; 1 × «week 2 advanced» both seats) | 3/6 |
→ fix is NOT worse than main; clean 142/142 ×2 alone on the fix (run c1 + alone run1; also alone run5).
Code read of the temper diff for co-op: NPC outburst rolls / npwPick run on the host only (feelWorld/eaHost); her choice frame can never be all-unaffordable (eaOptFx clamps bạc) so it cannot hold #next; mbS→mkSync now ~8×/render (was 2), render time unchanged.

### Root cause hunt (main, post-rebirth stuck) — IN PROGRESS on review/coop-rebirth-stuck (off main, test probe only so far)
Stuck dump (main, load run 2, probe): host A at 3:2, #next «Sẵn sàng» enabled, B already `bend 3.2` (Chờ hảo hữu…); A: inLife false, thin-E off (eW false, rd {}), DQ.want null, Q 0, pend false, sent 2; A's click never reaches `bend()` (no «bend 3.2» / «wantB» in tr). Next probe (pushed on that branch) dumps the co-op press gates (base / waiting / frozen / allow / allowN) and one traced press.

## Gates on 73358b4d
| gate | result |
|---|---|
| emotion-acts Fold + iPad | PASS ×3 |
| coop-e2e alone, fresh assemble | 142/142 ×3 (+1 pre-existing rebirth fail, same on main) |
| quickcheck ALONE | PASS (old save ok · core gates PASS incl. one-core-guard · perf new/live render 277/281, tab 685/627, buổi 1665/1476 ms) |
| oldsave / one-core | in quickcheck: old save ok · one-core-guard PASS |
