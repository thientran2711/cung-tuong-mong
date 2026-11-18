# REVIEW learn-scene-fix-2 r1 — PASS f8ac2f08 (review/learn-scene-fix-2-r1)
PRIORITY #1 CHECK ('kmHold|kmPump|jorder|learn-scene'): OD L1493 (no co-op patching) + 17/11 ~16:45Z day-khắc | main b5d109fe: kmPump/kmFree j93, no kmHold/jorder | review/* learn-scene-fix 41836865 (base, HELD) + learn-scene-fix-2 8c30a85d | claims REVIEW r1 = session_01UV1SziXvWUAbjGtoEq234J.
Reviewer: session_01UV1SziXvWUAbjGtoEq234J (opus, BIG tier). Worker sha 8c30a85d. START_CTX ~8 %.

## Branch
review/learn-scene-fix-2-r1 = 8c30a85d + origin/main e9bbc4d6 (assemble = main list + 'jorder.js' last) + origin/main b5d109fe (coop-thin-b-r3; only index.html/sw.js conflicted), site rebuilt. origin/main is an ancestor of f8ac2f08 -> fast-forward ready.

## Root cause / root fix (OD:L1493: root, not a co-op patch)
- Repro BEFORE: order-watchdog.js run against the pre-fix build (330dd40c, old kmHold = "any queued non-afterModals job") -> 18 FAIL on Fold + iPad Air: ring 1a (scene queued behind week panel, Q=2 hidden, hold=true, free=false), 1b (unarmed afterModals head + plain scene: dialogs never drain), 1c (paintless job holds 90 s), fuzz stall 105.7 s / 84.0 s.
- AFTER: same test ALL PASS on both devices (fuzz longest stall 1.87 s / 2.24 s, = the 2 s grace, < 3 s limit).
- The fix sits in the shared queue owner (j93 kmHold), used identically by solo and co-op host; no co-op code touched -> root fix, whole family. kmHold now true only for a scene on screen / starting now (head startable: kmFree + armed), so "scene waits for dialog" and "dialog waits for scene" can never both hold.
- New-ring check (my read of every kmPush caller: j93 x7, jbuoi, jflip cfPlay, jfx gain, jlevel, jne, jpromo): no queued job waits on a dialog while it is on screen; jobs that wait on something else (cfPlay busy()/COOPW.pend, jne preload) release the gate after 2 s; kmPump always re-polls (250/120 ms) while KMQ is non-empty, kmPre always resolves (race with 1.5 s). New main module jcoopthin wraps showModal/closeModal OUTSIDE jorder (guest thin cards only); its early-return closeModal skips kmArm, but kmPump arms an afterModals head itself once Q is empty -> no stall.
- Single-player: gate only when kmOn(); order made item -> level-up scene -> buổi -> next VIỆC held (learn-scene.js steps 1-6 + watchdog part 2).
- ONE CORE: no game number added; KM_GRACE 2000 / 1.5 s preload / 150-120 ms polls are engine timings (same kind as the existing 90 s cap), not rules shown to the player. Day-khắc rule: not touched by this change.

## Tests (all on the merged branch)
| test | result |
|---|---|
| order-watchdog.js (Fold + iPad Air) | ALL PASS x2 (e9bbc4d6 merge, b5d109fe merge) |
| learn-scene.js | ALL PASS x2 |
| coop-e2e vs LIVE Worker | 63/63, 63/63 (on e9bbc4d6 merge), 63/63 (on b5d109fe merge, with coop-thin-b live) |
| oldsave-r1 (old = origin/main build) | 16/16 x2 |
| quickcheck | PASS 129 s · old save ok · core gates PASS · perf new/live render 154/168, tab 319/277, buổi 703/853 (first run on e9bbc4d6 merge also PASS) |

## Shots
Looked at the worker's 3 shots (fold-order-scene: Cầm lên bậc 2 with its own picture, next VIỆC held; fold-order-buoi; ipadAir-learn-cong) — correct order, kit frame (kitPersonReveal frame), no cut text. No new UI in this fix. CDN folder img/_review/learn-scene-fix-2/ WIPED (3 objects).

## Notes (non-blocking)
- buoiShift queued in KMQ reads S.buoi when it plays, not when queued: two queued buổi shifts would show the same buổi twice (cosmetic, rare).

VERDICT: PASS f8ac2f082dc765caa4c8d1c63d1e3b2066bbaa08
HANDOVER: none, done.
