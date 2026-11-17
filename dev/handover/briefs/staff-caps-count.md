PRIORITY #1 CHECK ('staff caps' / 'BAL.promo.cap'): OD L1636 (owner staff caps 15:40Z, verbatim) + ORDER main s33 15:50Z | ledger 0 | claims none (B staff-root LIVE 7e0250ec owns the cap table) | main 7e0250ec BAL.promo.cap (staff-root table), j10 capOf/capTrim/fillStaff, face pools | review/* none

You are an opus WORKER (numbers, quick — the owner is WAITING), staff-caps-count. Coordinator = FOREMAN B SESSION 6 = session_01N1tNP6aS1jVsCvD9kpxdH1 (send_message there). You never talk to the owner.

ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
(As a worker: at your rollover write the handover in your report file and tell Foreman B; B opens your successor.)

READ FIRST (branch claude/cung-tuong-mong-handover-hj0h8w), IN FULL, the owner's words verbatim — never work from a summary: CLAUDE.md; dev/rules/START_CORE.md + START_WORKER.md (reviewers also START_REVIEWER.md); then ONLY the dev/rules/topic/*.md files your task touches; dev/handover/WORKER_BRIEF.md (LUẬT KIT TRƯỚC, LUẬT SỬA CẢ NHÓM, LUẬT ƯU TIÊN SỐ 1); dev/kit/KIT.md + dev/kit/VANPHONG.md for anything player-visible.
LAWS: LUẬT ƯU TIÊN SỐ 1 — before writing code, git grep origin/main + origin/review/* and reuse what exists. LUẬT SỬA CẢ NHÓM — fix the whole family (scan + before/after table). LUẬT KIT TRƯỚC — every display from the shared kit; missing part → stop that part, write KIT REQUEST in dev/kit/KIT_REQUESTS.md, tell Foreman B. ONE CORE — every number from BAL (dev/build/jbal.js/jbal2.js), text prints the constant. Player words per VANPHONG (cổ trang, no %, odds ladder Liều/Khó/Năm ăn năm thua/Khá chắc/Chắc/Rất chắc/Nắm chắc). No rule may reward reacting faster in real time; NPCs never act before the player saw the info. Co-op must work the same (both seats). Devices first: Fold 755x1000@2, iPad 1180x820@2.

STORAGE (owner OD ~14:15Z, ORDER main s32): never commit images to git (screenshots included); review images only under CDN img/_review/<topic>/ and DELETED after the verdict.
GIT: sparse worktree under /home/user/wt (never full-clone); fetch --depth=30 under flock /home/user/wt/fetch.lock. Never push main, no pull requests.

TASK (written fresh; MEASURE ONLY — do NOT change BAL until the owner picks): read dev/OWNER_DECISIONS.md line ~1636 ("~15:40Z real" OWNER STAFF CAPS) VERBATIM first.
On live main (7e0250ec or newer; staff-root's BAL.promo.cap table is live), with the live roster run by bot at three moments — game start, +2 years, +5 years (rank mix of all 20 consorts + Thái hậu + the player) — COUNT total maids / eunuchs / ma ma under:
 (A) today's BAL.promo.cap;
 (B) the owner's table: Đáp ứng 1+0, Thường tại 1+0, Quý nhân 2+0, Tần 2+1, Phi 2+1, Quý phi 3+0?, Hoàng quý phi 3+0?, Hoàng hậu 4+1, Thái hậu 3 + 1 ma ma (+1 eunuch?), lãnh cung 1 (where her words leave a '?', show both readings);
 (C) a LOWER variant that lands near ~30 servants in total.
For each: how many would be cut by the face pools (30 young maid faces, 20 eunuch faces — check the real pool sizes on main and say if they differ). Use a few bot seeds and give the average.
DONE (fast): dev/handover/reports/staff-caps-count.md — ONE small table (rows A/B/C × start/+2y/+5y: maids / eunuchs / ma ma / total / cut by faces) + 3 lines of method; send_message Foreman B one line with the totals. No branch needed unless you add a measure script (then review/staff-caps-count, measure file only).
