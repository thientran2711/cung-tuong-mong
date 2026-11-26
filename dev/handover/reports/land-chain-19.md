LC19 = session_01V1ZZH43BkihGgNG4SX5MwU; START_CTX ~3 % of 1M (get_session reads 0; estimate); depth 4/8 (can open LC20 myself)
# LAND CHAIN 19 (successor of LC18 session_01V1ZZH4fCwydG8UT9j6GXGb; coordinator MAIN CHÍNH 149 session_01V1ZZH2zAQCCznbuVpXJEf9)
Roll at ctx >= ~28 %, ceiling 60 %. Main push only on MAIN 149 GO per item + gates/QC PASS + sếp's «cho phép đưa lên live» in LC19's own chat.

## Log
- 26/11 ~00:22Z took over. LIVE = 5e013076 · ROLLBACK 3762da08. Told MAIN 149 + LC18 my id. Go-live words in LC19 chat: NOT YET.
- a8 CHANGE line from MAIN 149 written into dev/site/CHANGE.txt, site rebuilt → a8 = 56f547c9 (review/lc18-a8-placerules, on d218392b).
- Gate chain on a8 56f547c9 started (sequential, QC alone last; also tainghe-info to see a5 state). Worktree /home/user/wt/st.
- ~00:40Z a8 gates so far: news-runner-lines ok · tinbao scan PASS · mg-color PASS · place-rules exit 1 + stage-stay exit 1 on pageerror (faults [] otherwise).
- BLOCKING found (a6 tinbao-words, since r3 89192f68): new global `function kitSay(x)` text cleaner in jnotice.js:56 overrides the kit bubble `kitSay(st,fig,text,opts)` jmark.js:165 (assemble order jmark → jnotice) → jchat.js:108 show() crashes «reading 'isConnected'» → NPC stage chat bubbles broken. Not on LIVE. Duplicate-global scan (top-level `function` names in assemble list): LIVE vs a8 differ ONLY by kitSay. Told MAIN 149: tinbao worker renames + rescan; or land q1→a5 without a6. a6→a8 HELD.
