# boot-skel-flash — report (BOOT-SKEL-FLASH, session_01Rc5AsLUw7gDgkkzHaZqLd7)
PRIORITY #1 CHECK: OD 857/1019 (boot-flash 15–16/11), 1787 (loading-blank 18/11), 2783 (this bug) | main dev/site/kboot.js (KIT §14.1 boot cover), dev/test/boot-flash.js | review/* none | claims this session. REUSED the boot-flash cover (kboot.js); no new part.
KIT CHECK: reuses the existing kit boot cover #kboot (KIT §14.1, kboot.js) unchanged — no new kit part, no CSS change (KK56 not needed).

Owner bug (27/11 ~05:42Z, verbatim): "Rương mở đồ ok, nhưng khi vừa vào game, lại có cái màn này bị lỗi nè" (frame 0:00 of the owner-ui-a chest video).

## Root cause
The screenshot came from a ROBOT video. kboot.js had a special case for automated direct mode (navigator.webdriver, no host): it removed
the boot cover at once ("old tests see the game as before"). So every robot screenshot / video (recordVideo, screencast) painted the bare
p1.html shell (empty panels, vertical stat list, nav bar) for ~1–11 s while the 18 MB page parsed — exactly the owner's frame.
The real player path (host + frame, ?khost=1 / phones) already had the cover from the first paint: measured 0 skeleton states.

## Fix (branch review/boot-skel-flash, 6e11c262, from origin/main 4cd3f974)
- dev/site/kboot.js: robot direct mode now mounts the SAME cover from the first paint and removes it synchronously inside kbootDone()
  (the last script, before DOMContentLoaded), no fade/wait → tests see the game exactly as before; no robot frame shows the shell.
- dev/test/boot-skel-strip.js (new): probes 5 points (centre, top HUD, left, right, bottom bar) every animation frame + screencast frames;
  FAIL = game shell hit before the cover lets go or before the title/loading screen first shows. Modes robot / host (cold, warm SW, reload) / resume (with a save).
- index.html + sw.js rebuilt (build_site.sh); assets.json kept = LIVE.

## Results (CPU 4x)
| path | device | before (main) | after |
|---|---|---|---|
| robot direct cold + reload | Fold 755x1000 | FAIL: shell 0.5 → ~11 s | PASS 0 states (cover 0.2 s → title/loading) |
| robot direct cold + reload | iPad 1180x820 | FAIL: shell ~1.6 → 9 s | PASS 0 |
| host cold / warm(SW) / reload | Fold + iPad | (0 already) | PASS 0 / 0 / 0 |
| resume (save in slot 2) warm / reload | Fold + iPad | — | PASS 0 / 0 |
dev/test/boot-flash.js (old test, host) Fold cold/warm: 0 skeleton states.

Strips (both devices, Fold top / iPad bottom):
- BEFORE robot cold: https://ctm-img.victoria-tntt.workers.dev/img/_review/boot-skel-flash/before-robot-cold.jpg
- AFTER robot cold: https://ctm-img.victoria-tntt.workers.dev/img/_review/boot-skel-flash/after-robot-cold.jpg
- AFTER player host cold: https://ctm-img.victoria-tntt.workers.dev/img/_review/boot-skel-flash/after-host-cold.jpg
- AFTER player with save, reload: https://ctm-img.victoria-tntt.workers.dev/img/_review/boot-skel-flash/after-resume-reload.jpg

## Checks
- quickcheck: CORE GATES PASS (one-core-guard · rules-one-source · kit-conform · coop-one-world · 13 hooks, 875 s); quickcheck.js PASS
  (open 2190 ms · old save from LIVE loads and plays · perf new/live render 239/259 ms, tab 630/616, buổi 1500/1570).
  (quickcheck.sh itself hit my 900 s wrapper timeout after the gates; step 2 was run directly with the same args.)
- co-op smoke: ?room=ABCD direct + host, Fold + iPad → live Worker answered, room dialog "Chưa vào được phòng" shown, cover gone, 0 page errors.
- Not changed: real-player path behaviour (host/frame), watchdog, failure card.

## Rollover
Not needed; work done. Worktree /home/user/wt/bsf to be removed after verdict.
