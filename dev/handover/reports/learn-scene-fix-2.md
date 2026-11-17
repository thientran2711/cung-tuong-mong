# learn-scene-fix-2 — review/learn-scene-fix-2 @ 8c30a85d
PRIORITY #1 CHECK ('learn-scene-fix|kmHold|kmPump'): OD (learn scene owner bug) | main: kmPump/kmFree j93 only (no kmHold, no jorder) | review/* learn-scene-fix 41836865 (HELD: co-op stall) = base of this branch | claims none other.
START_CTX ~10 %.

## Base
41836865 rebased onto main 7e0250ec (assets.json / index.html / sw.js = main's, assemble.py = main's list + 'jorder.js' last), site rebuilt.

## Root cause (two waits that could close a ring)
- jorder showModal gate hid every dialog while kmHold() was true; kmHold() was true while ANY non-afterModals job sat in KMQ.
- kmPump would not start that job while kmFree() was false (week panel / podium / roulette / reward), and an afterModals head waits for Q to drain.
- => dialogs waited for the scene, the scene waited for kmFree()/the dialogs: Q hidden + KMQ>0 + nothing on screen forever (co-op host after rebirth; on today's main it already stalled at buổi 0:0 with 'Hảo hữu vào cung').
- Second ring of the same kind: afterModals head (unarmed) + a plain scene behind it -> hold true -> Q never drains -> head never arms.
- Third: a running job that paints nothing while it waits for something else (card flip cfPlay waits on NLP / dawn) held dialogs up to 90 s.

## Fix (j93 only; ONE QUEUE OWNER = kmPump, every gate asks kmHold())
kmHold() is true only when the scene is ON SCREEN or WILL START NOW:
(a) a job runs and its picture is up (.kmov / #kmrew / #buoitr), or it started < 2 s ago (preload / first frame); 90 s cap kept;
(b) the HEAD of KMQ (FIFO) is startable: kmFree() true and not an unarmed afterModals scene (a head that only preloads counts: kmPre <= 1.5 s).
A scene that waits never holds dialogs, so the waits cannot meet in a ring. Order made item -> level-up scene -> buổi -> next VIỆC unchanged (learn-scene.js steps 1-6).

## Family scan (every caller of kmHold / kmFree / jorder)
| place | before | after |
|---|---|---|
| j93 kmHold | any queued non-afterModals job, or kmBusy (90 s) | head startable now, or running job on screen (2 s grace) |
| j93 kmPump | kmFree + afterModals head waits Q | unchanged (now safe: the gate releases whenever the head waits) |
| jorder showModal gate | kmHold (could hide forever) | same call, new kmHold -> releases within 150 ms when the scene waits |
| jorder closeModal -> kmArm | arms afterModals when Q<=1 | unchanged |
| jbuoi buoiShift | queued behind any job | queued only behind a job on screen / starting; else plays at once |
| jflip cfPlay busy() (job waits inside kmBusy) | held dialogs up to 90 s | holds 2 s grace only |

## Tests
- coop-e2e vs LIVE Worker: **63/63** twice (c2 on 2fdadbd4 build, c3 on e20d5606). Before fix on new main: stalled at buổi 0:0 (Q=1 hidden).
- NEW dev/test/order-watchdog.js (Fold + iPad Air): the 3 rings each resolve; positive order kept; fuzz 160 random steps (scenes / afterModals / dialogs / week panel / buổi / paintless jobs) with sampler: longest 'Q>0 hidden + KMQ>0|busy + nothing on screen' = 1.7-1.9 s (the 2 s grace) < 3 s limit; drained by tapping: ALL PASS.
- learn-scene.js: ALL PASS (made 2 test fixes: wait for picture load instead of 700 ms; 4xx check only on this family's pictures — img/@W<n>.webp and face-man-<n> 404s come from main code, see batch-s31b).
- quickcheck: **PASS** 165 s (core gates PASS, time-spill PASS, old save ok, perf render 202/176 tab 320/320 buổi 946/865).
  time-spill-guard needed its clean slate to also kmReset() (the gate correctly holds a dialog under the new life's opening scene) — same adaptation batch-s31b made on its full build, now committed here.
- oldsave-r1: 16/16.

## Shots (looked at) — wipe: python3 dev/site/cdn_sync.py --wipe-review learn-scene-fix-2
- https://ctm-img.victoria-tntt.workers.dev/img/_review/learn-scene-fix-2/fold-order-scene.jpg (Cầm lên bậc 2, own picture, next VIỆC held)
- https://ctm-img.victoria-tntt.workers.dev/img/_review/learn-scene-fix-2/fold-order-buoi.jpg
- https://ctm-img.victoria-tntt.workers.dev/img/_review/learn-scene-fix-2/ipadAir-learn-cong.jpg

HANDOVER: none, done.
