# RESUME the M2 life in a new container (same life, same save)
1. Checkout LIVE origin/main into /home/user/cung-tuong-mong (detached) and `node srv.js` (serves it on :8123). Copy harness (robot.js policy.js lib.js srv.js) to /home/user/wt/m2.
2. Take the newest save dump: dev/handover/robot/m2/logs/save_dump_latest.json (keys hclh-save-v2-1 = the live life).
3. `cd /home/user/wt/m2; SAVEFILE=<dump.json> BOOTW=6000 V=1 node robot.js &`  (persistent profile ./prof; the init script writes the save only if localStorage is empty).
4. policy.js does title → «Chơi một mình» → «Tiếp tục kiếp này», then plays: acts ≤1–2/buổi, mini-games for real (KG82 oracle + TOIL), exit roads blacklisted, mid-year true reload, escalation ladder + SOFTLOCK-RELOAD, FINAL line + final.json at S.dead.
5. Logs: life.log, bugs.jsonl, stuck.log, status.json, moments.md. `pack.sh "<progress>"` copies them + a save dump to the handover branch.

## Known weak spots (for M2b)
- Evening (Buổi tối) stall, ~1 per 10 min: no modal visible, «Sang ngày mới» dimmed, DQ.newsHold=1 + Q holds cards (kmHeld grows); the robot's escalation ladder (ESC first/last button, swipe, tap centre) eventually releases it after 3–10 min. A smarter rule (dump DQ/Q via EVAL.js, then tap the news badge .kntb, the stage figure, «Mệnh truyện» card prompts in Hành sự) would roughly double the pace.
- policy: ≤1 act/buổi (2 when Sức<60), mini-games played for real (KG82 peek oracle + TOIL makeup), 10 % Bỏ qua not yet implemented (mem.mg%10 rule exists: every 10th is skipped).
- mid-year true reload each game year (month≥6, buổi 3); never reload right after a year tick (SAVE-ROLLBACK bug).
- container VM may reboot: re-run `node srv.js` and robot.js; ./prof keeps the save.
