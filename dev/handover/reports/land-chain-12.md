LC12 = session_01V1ZZH2p2x7oNCrRuTq7RjF; START_CTX ~5 % (get_session reads 0; estimate); depth 1/8 (can open LC13 myself); setup ready 24/11 ~18:25Z
# LAND CHAIN 12 (successor of LC11; coordinator MAIN CHÍNH 125 session_01V1ZZGzMTVHzyPyJN9e5Qzp)
Roll at ctx >= ~30 %, ceiling 60 %. Depth 1 → at roll open LC13 with create_session (copy the 3 rollover lines + LINEAGE line verbatim), then stop.

## Setup (LC11 recipe)
/home/user/wt/live sparse detached on origin/main + hooks; /home/user/wt/ho handover (sparse rules/handover/*.md/reports/tools/OD); sland.sh/landq3.sh/landcont.sh/hpush.sh rebuilt from dev/tools/main-*.sh with LC11 edits; http.server 8765; hold.txt empty.
readycheck.sh v2: reads FOREMAN_B..F_STATUS from origin handover, takes every «<branch> <40hex>» on a LAND READY line (review/ prefix optional; last per branch wins), GitHub compare LIVE...sha → BIGREADY (ahead) / stale(diverged) / INMAIN.

## Log
- 24/11 ~18:25Z LIVE = 502c48c9. readycheck: FF-ready now = robot10-onecore-rv 5d4f722f (B SMALL test-only, FF from 502c48c9). law1-audit-r1 b01cc880 (B BIG) FF from 22f1e491 only; B line 17:56Z says «self-merge at land OK (UI-only gap 22f1e491→502c48c9)» → self-merge next. All D/E LAND READY shas diverged (stale) → re-merge asks. DIFF gap vs LC11 queue: E85r leave-palace-r5 7a3541fd (LAND READY 17:30Z, on 8eceeef9) was not in the LC11 queue → added (needs re-merge). D law1-gifts-rv: status line sha e3e3382b38e8… is a typo; real head e3e3382b101d….
- 24/11 ~18:25Z LANDING robot10-onecore 5d4f722f (FF, head == READY sha; choice-value-scan + quickcheck + coop-e2e).
- 24/11 18:19Z Coordinator now MAIN CHÍNH 126 session_01V1ZZH3LU36oJRpijfqgKNb (report here). Owner flight-bug branches (offline-fast, flight-*) jump the queue. leave-palace-r5 now a5b9244b (supersedes 7a3541fd; E85r re-merging on newest LIVE).
- 24/11 ~18:20Z robot10-onecore: first run used plain choice-value-scan (DOMINATED 28 = pre-existing on bare main, B note) → restarted with the reviewer's gates (--numbers --turns 60 PASS 419; --plant exit 1 = caught).
- 24/11 18:30Z MAIN 126 QUEUE JUMP: review/flight-mucluc 6fb8e7eb (SMALL, base 502c48c9; touched jkslide/jkpc) → land after KK21 «KIT OK flight-mucluc <sha>» (take KK21 sha if it adds KIT.md); I run quickcheck + old-save + mucluc-flight.js + ktop-sticky.js on the merge.
