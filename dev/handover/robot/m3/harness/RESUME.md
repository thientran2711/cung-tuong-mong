# RESUME the M3 life (Fold 755x1000, SEED 103, greedy, real taps)
1. Checkout LIVE origin/main detached in /home/user/cung-tuong-mong (bot serves it over http via lib.js serve()).
2. mkdir /home/user/wt/m3; copy bot.js lib.js there. Playwright is global: NODE_PATH=$(npm root -g).
3. gunzip -c dev/handover/robot/m3/save_dump_latest.json.gz > seg/save.json
4. cd /home/user/wt/m3; NOSCROLL=1 SAVEFILE=seg/save.json DURATION=100 NODE_PATH=$(npm root -g) node bot.js   (run via Bash run_in_background, timeout 7200000; fresh ./profile each time)
   - init script restores localStorage only if hclh-save-v2-1 empty; pre-life flow taps «Chơi một mình» -> «Tiếp tục kiếp này».
   - at DURATION min it stops GRACEFULLY at the next Sang buổi (flushes save). Then: cp run/save_dump.json seg/saveN.json; mv run old/run-X; rm -rf profile; relaunch with SAVEFILE=seg/saveN.json.
   - Never SIGKILL a run you want to resume from (localStorage not flushed); always resume from run/save_dump.json (written every Sang buổi).
5. Logs: run/log.txt, run/bugs.jsonl, run/shots/. Watch with: tail -F run/log.txt | grep -E "GRACEFUL|BUG stuck|ENDING|Luân hồi".
Known bot gaps: no watchdog for a hung page.evaluate (kill + resume from save if log silent >8 min).
