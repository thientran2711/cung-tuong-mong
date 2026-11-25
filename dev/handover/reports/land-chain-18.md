LC18 = session_01V1ZZH4fCwydG8UT9j6GXGb; START_CTX ~3 % of 1M (get_session reads 0; estimate); depth 3/8 (can open LC19 myself)
# LAND CHAIN 18 (successor of LC17 session_01V1ZZH3HziHPxheKTPdH7HQ; coordinator MAIN CHÍNH 147 session_01V1ZZH4NKh63eG3ZU7sdD59)
Roll at ctx >= ~28 %, ceiling 60 %. Main push only on MAIN 147 GO per item + gates/QC PASS + sếp's «cho phép đưa lên live» in LC18's own chat.

## Log
- 25/11 ~22:58Z took over. LIVE = 5e013076 (origin/main checked) · ROLLBACK 3762da08. Told MAIN 147 my session id. Go-live words in LC18 chat: NOT YET (sếp flying, lands ~03:00Z).
- Pre-staged (LC17): q1 review/lc17-q1-kroulw 7abb60cc · q3 review/lc17-q3-fix7 cd6452f3 · q5 review/lc17-q5-kittf2 2feccf7a (all verified on origin). week-wait + SELSCENE-19 bounced to owners; r3wip 4cf5e9c2 waits BIG rv.
- Tools re-made in scratch (stack2.sh session line → LC18; holog.sh → land-chain-18). Worktrees /home/user/wt/{ho,st} recreated (container was fresh).
- 23:1xZ q1 kroulw 7abb60cc small rv (LC18 inline, test-only lib/coop-clear.js +3): PASS — #kroulw is created at 150 ms and always removed by go() (≤ 8 s timeout or all pictures loaded), so clear() returning 'x' cannot loop for ever; only test code changes.
- 23:1xZ FOREMAN_B_STATUS facts → MAIN 147: fix-7 r3 a32a931d (contains kroulw + lib fix, BIG rv at ~23:30Z) supersedes q3 cd6452f3; co-op chain by rv-lander 4KCumgKv on LIVE: presence-reload-land 8d5fa1fd → fix-3-r5-land 83702d7b → coop-week-wait-land 04a45597 (needs Worker deploy FIRST); thin-p8-r2 0348e07a in BIG rv; KIT rv 5GSFx4pf verdict on 166b3000 pending → q5 held. Proposed order: q1 → co-op chain (Worker first) → fix-7 r3 → thin-p8-r2 → SELSCENE-19 → q5 → r3wip.
- q3 cd6452f3 baseline gates (local wrangler :8791): tnb 18/18 PASS; ctl + e2e running.
