PRIORITY #1 CHECK: OD PROMO-HIST 24/11 + MAIN 171 ORDER ~04:40Z (1) rank pace | main 98c77517 jexam exTick + exSrvOpen (only 2 window openers) | review/rank-pace 548ef991 (base review/promo-stack-lr4 e2c5d5ae) | claims D-RANKPACE (Foreman D)

# BIG REVIEW — review/rank-pace 548ef991 (Foreman D, opus)
You are an independent BIG reviewer (rules/numbers: BAL, exam window, progression). Foreman D = session_01D3E3NagaVYs8K14c2bMUy1.
READ FIRST on branch claude/cung-tuong-mong-handover-hj0h8w (fetch --depth=30 under `flock /home/user/wt/fetch.lock`; sparse worktrees; never full clone): dev/rules/START_CORE.md (18 LAWS first), dev/rules/START_WORKER.md, dev/rules/START_REVIEWER.md in full; then only the topic files your task touches (dev/PRIORITY_RULES.md lists them). Owner's words are in those files — do not rely on this brief for them. Kit: dev/kit/KIT.md, wording dev/kit/VANPHONG.md.
Worker report: dev/handover/reports/rank-pace.md (handover b29e9bcd). Worker = session_01D3E3Naunyi7o6FG8N58geg (send FAIL items to it).

## What changed (worker's claim — verify, don't trust)
A. jexam exAsk: existing kit event card «Khảo hạch tấn phong» — «Thi ngay» (odds word · tốn Sức+khắc · được thánh chỉ · hỏng = Hành sự fail wait) / «Để sau» (card stays in Hành sự); last tuần: 1 log line + same card «Sắp hết hạn khảo hạch» once. Both window openers call it. No new kit part.
B. BAL only: BAL.ex.win 2→3 tuần; new BAL.ex.cdLapse 1 (window never sat); kỳ rule consort waits to next kỳ (printed date true); fail keeps BAL.ex.cd.
Robot: NOEXAM max rank 1–3 → 6–7; QUIET unchanged; LAW 5 months/rank rising.

## Check
1. Diff = review/rank-pace vs its base review/promo-stack-lr4 e2c5d5ae (only the rank-pace delta is under review; promo-stack already BIG PASS by session_01D3E3NacPigdjGR1RRt4q3j). promo-stack is being REMERGED onto LIVE 98c77517 (new sha a5148139 or later on review/promo-stack-lr4) — if it is pushed before you finish, merge that into rank-pace on a review/rank-pace-rv branch, rebuild index.html/sw.js (dev/site/build_site.sh), assets.json = LIVE, and re-run gates there.
2. The 18 laws: law 2 tiers (Thi ngay/Để sau is about one matter — check it is not two equal-result options), law 3 gain-and-loss on «Thi ngay», law 4 every number from BAL (no typed 3/1), law 5 harder as she climbs not loosened, law 7 odds word in the 7 bands, laws 9–10 kit card only, law 12 Fold 755x1000 + iPad 1180x820.
3. Old save: a save with an open / lapsed window from LIVE must load and behave.
4. Co-op: both seats (coop-e2e alone, COOP_EXAM=1) on the sha you pass.
5. Gates on the sha you pass: dev/test/rank-pace.js, promo tests (promo-exam vs base), quickcheck (+ old save, perf), coop-e2e alone, Fold+iPad shots/videos (img/_review/rank-pace/, curl 206 — look at them).
6. Re-run the robot before/after yourself for at least NOEXAM + even (dev/measure/*), compare with the report.

## Output
dev/handover/reviews/rank-pace-review.md on the handover branch (push with retry; `dev/handover/*.md merge=union`). Verdict PASS (with LAND READY sha, FF from LIVE) or FAIL (numbered items → worker Naunyi7o). send_message the verdict to Foreman D session_01D3E3NagaVYs8K14c2bMUy1. Never push main; review/* branches only; no PR.
Rollover (verbatim canon): "Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker)."
