# TS-P4 Playwright toolkit (reference research only)
Copy to /tmp/ts. `NODE_PATH=$(npm root -g) node launch.js &` (persistent chromium on CDP 9333, 430x900) then:
- act.js 'js using p' ; l.sh "<button text>" [wait_ms] shows modal/main state (NEVER click "Đọc lại cuộc đời" — it dumps ~10k tokens)
- auto.js N (env AUTO=1 random-picks choice cards, skips feasts; stops on unknown modal/ENDING?; ACTS="Y quan,Đọc sách,..." rotation; logs to $LOG or /tmp/ts/life.log); go.sh <pick#|0> <steps> <tail>; pick.sh N picks Nth choice
- mem.js plays the memory-card exam; drawing minigames: p.mouse strokes on canvas (x45-385,y253-590 at 430px width)
- Run long loops in background and wait with Monitor; keep log reading to grep/tail (the journal modal is huge).
Notes: activities selector `button.activity`, month `button.month-button`, tabs `button.nav-button`.
