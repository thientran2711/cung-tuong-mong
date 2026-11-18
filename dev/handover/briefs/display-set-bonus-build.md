PRIORITY #1 CHECK ('set bonus'): OD 3 (L1716 20:42Z/20:47Z rule, L1718 21:15Z APPROVED) | ledger 0 | claims 5 (expert DONE 500faf22) | main 0 | review/* 0 — build is new; table exists: dev/research/display-set-bonus.md @500faf22.

# BUILD (opus) — DISPLAY SHELF SET BONUS
Foreman: C-AG #6 session_01UV1SzjqdQPh2K9YUVK9VhU (report SẴN SÀNG KIỂM sha there by send_message). Main = s37 session_01UV1SzhwVaGKCGi5xcnzLQe.
Read first (in full): dev/rules/START_CORE.md + START_WORKER.md (handover branch claude/cung-tuong-mong-handover-hj0h8w); dev/OWNER_DECISIONS.md lines '20:42Z real', '20:45Z real', '21:15Z real', '~22:05Z', '~21:55Z' (17/11) VERBATIM; dev/research/display-set-bonus.md (THE TABLE, approved as is — do not change sets/sizes/signs); FOREMAN_C_STATUS.md line '(17/11 21:16Z) FROM MAIN s37 to C-AG #6'; reports/review-display-shelf.md (last reviewer notes).
BASE: review/display-shelf-r3rv 41418cd8 (shelf r3 PASS, FF from main 60b0e3bf; in main batch s37a). If origin/main already contains 41418cd8 when you start, branch from origin/main. Branch: review/display-set-bonus. Never push main; no PR.
Disk: sparse worktree under /home/user/wt, fetch --depth=30 under flock /home/user/wt/fetch.lock, never full-clone.

DO:
1. All 26 sets in BAL (one core, OD:L1267): members, size 2/3/5, plus (+1/+2/+3), minus, cap 6 per person (Danh ≤ 3); never Sủng. A piece counts in one set only; random pieces nothing.
2. Apply through the EXISTING paths named in section A: wearBonus(p) (jwdinv.js:44) for Sắc; title flat apply/take-back (jbal2.js:465-467, jdh.js:114) for other stats (main wearBonus.danh is chip-only → Danh via apply/take-back). No new bonus path.
3. Set-broken rule (section B): dead/withered/tainted/burnt-out/stopped piece, given away / confiscated / pending vượt phẩm → broken; weekly check; take back at once, regain at next whole check. Old saves: no bonus until first check; no crash.
4. NPCs: same table on NPC consorts' shelves (host-only in co-op).
5. 6 NEW pieces (section D) as items in the existing shelf item list with the existing 'tạm' stand-in picture until Foreman C paints them (art order already sent by s37; do NOT draw).
6. Player text: "Phòng trưng bày" wording; VANPHONG cổ trang, no %, numbers printed from BAL. UI only via existing kit parts; any missing part → KIT REQUEST in dev/kit/KIT_REQUESTS.md + tell me (kit keeper = main's kit worker session_01UV1SzisVVpBnxyKZsxjCfY).
7. LUẬT SỬA CẢ NHÓM: scan every reader of shelf slots / lux / item stats so the bonus is counted exactly once everywhere (status, tooltips, NPC compare, promo).
8. Tests: new set-bonus test (each size, break + regain, cap, NPC parity, old save); shelf-check; one-core-guard/text-rule/it-key; agent_check; QUICKCHECK --cpu 4; PAIRED balance smoke ≥ 60 lives vs main (same seeds): Hoàng hậu reach/band must not move beyond noise — table before/after in your report.
Report: dev/handover/reports/display-set-bonus.md (handover branch; push via reset-to-FETCH_HEAD + cherry-pick, never rebase) → send_message C-AG #6 "SẴN SÀNG KIỂM <sha>".
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
