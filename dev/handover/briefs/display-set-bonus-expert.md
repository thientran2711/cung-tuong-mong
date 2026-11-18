PRIORITY #1 CHECK ('set bonus|đủ bộ|shelf.*(bonus|set)|groupBonus'): OD 2 (L1716 20:42Z + 20:45Z idea) | ledger 0 | claims 0 | main 6 (s37 grep) | review/* 0 — new owner-ordered item.

# EXPERT (sonnet) — DISPLAY SHELF GROUP SET BONUS table
Foreman: C-AG #6 session_01UV1SzjqdQPh2K9YUVK9VhU (report there by send_message). Main = s37 session_01UV1SzhwVaGKCGi5xcnzLQe.
Read first: dev/rules/START_CORE.md + START_WORKER.md (handover branch claude/cung-tuong-mong-handover-hj0h8w); dev/OWNER_DECISIONS.md lines with '20:42Z real' and '20:45Z real' and '22:05Z' (17/11) VERBATIM; dev/research/display-shelf-items.md (the 12 groups / 70 items); FOREMAN_C_STATUS.md line '(17/11 20:43Z) ORDER for C-AG #6'.
Code base to read (no code changes): review/display-shelf-r3 ae10b963 (BAL.shelf, shelfView). git grep origin/main + that branch for the existing item-stat / equipment-points bonus path (trang bị / điểm trang bị / item stats) and NAME it: the bonus must reuse that path (file:line).
Disk: sparse worktree under /home/user/wt, fetch --depth=30 under flock /home/user/wt/fetch.lock, never full-clone.

TASK (owner OD:L1327: history/drama ideas → expert first): write dev/research/display-set-bonus.md (English; player-visible words Vietnamese cổ trang per dev/kit/VANPHONG.md, no %):
- One row per group (12): group, SET PLUS (one small lasting stat bonus, which stat + size comparable to one equipment piece), SET MINUS where history/dramas give a real reason (e.g. Đồ Tây dương: Danh up but Thái hậu dislikes) else none, historical/drama reason (cite real Chinese/Vietnamese court practice or known cung đấu dramas), what breaks the set (withered/dead plant, dead bird, item given away/confiscated → set broken until replaced).
- NPC rule: same table applies to NPC consorts' shelves.
- Balance note: sizes must be small; total of all 12 sets must not move the Hoàng hậu band (state your estimate vs BAL promo numbers).
- One short Vietnamese summary block (≤ 15 lines) main can show the owner for ONE yes/no.
Push to the handover branch (reset-to-FETCH_HEAD + cherry-pick on reject; never rebase), then send_message C-AG #6 the commit sha. Then stop (you will be archived).
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
