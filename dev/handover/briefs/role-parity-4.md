PRIORITY #1 CHECK ('role-parity'): OD 0 | ledger 0 | claims 8 | main 0 | review/* 2 | archive 0  (owner OD 18/11 ~21:30Z + 17/11 OD L1588 every player button ↔ NPC option — exact words in dev/OWNER_DECISIONS.md)
# BRIEF role-parity-4 = B4 (opus worker, Foreman B ROOT-2 session_01N1tNP3G5N78YfJ9phcb2nc; ORDER FROM FOREMAN C-AG #16 21:10Z + AMEND 21:16Z, asked by MAIN ROOT-56)
★ THE 18 LAWS FIRST: read the '★ THE 18 LAWS — READ FIRST' block at the top of dev/rules/START_CORE.md (handover branch claude/cung-tuong-mong-handover-hj0h8w); reviewers FAIL work that breaks a law it touches.
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).

## READ FIRST (verbatim, never a summary)
dev/rules/START_CORE.md + START_WORKER.md in full; the owner entries 18/11 ~21:30Z + OD L1588 in dev/OWNER_DECISIONS.md; brief dev/handover/briefs/role-parity.md (full; its rollover/lineage/laws lines apply); report dev/handover/reports/role-parity.md §1–§4 + HANDOVER (scan/test/build recipe); reports/review-role-parity.md (part-1 FAIL: unseeded scan).

## JOB (ORDER C-AG #16 21:10Z, B4 part, verbatim)
B4 → review/role-parity-4: §4.1 REAL gaps part B: illicit buys «Sai cung nữ thân tín mua lén ngoài cung» (j83; NPC harm acts must buy the item — law 6c), consort affair road j22 talk:man («Chào hỏi đúng lễ», «Liếc mắt đưa tình», «Trao khăn tay», «Hẹn gặp riêng», «Cắt đứt»), harm:xx «Tố xa xỉ» (jdress, not in BANDS) + harm:vp (ACT.vp.ok for NPC doer). Pattern: card ONCE as f(p,…) for her button + NPC provider agReg("consort","par4",…) key cx4:<k>, numbers in BAL, agcU + mindPick; laws 1–6 (two-way, equal-value, gain-loss, one core BAL, real evidence/people/objects).
Each branch removes ONLY its own rows from role-parity-open.json (merge conflicts there = keep both deletions). Gates as part 1 (one-core-guard, ag-stf2, deeds ratio ±3 %, role-parity.test).
## AMEND 21:16Z (verbatim)
B4 may start now (game code for illicit buys / j22 affair / harm:xx/vp; base origin/review/role-parity-r1 75f9dd84 = part 1 + live 790cda59), rebase its open.json/test edits on PART1 FIX READY when it lands. C-AG ROLE-PARITY #2 (session_01Rc5AsMM3ssHnCBtjLf11Qr) is the ONLY editor of role-parity-scan.js until C-AG writes 'PART1 FIX READY <sha>' in FOREMAN_C_STATUS + FOREMAN_B_STATUS. Do NOT edit role-parity-scan.js.

## HOW
- git grep origin/main + origin/review/* for each act first (PRIORITY #1): j83 illicit buys, j22 talk:man, jdress Tố xa xỉ, ACT.vp; reuse what exists.
- Sparse worktree under /home/user/wt (never full-clone; fetch --depth=30 under flock /home/user/wt/fetch.lock). Branch review/role-parity-4 from origin/review/role-parity-r1 75f9dd84; merge newest origin/main before SẴN SÀNG KIỂM. No PR, never push main.
- Numbers only in BAL (dev/build/jbal.js / jbal2.js); player words per dev/kit/VANPHONG.md (cổ trang, odds ladder words, no %); any UI = kit parts only (law 9; missing part → stop, KIT_REQUESTS.md).
- Real objects (law 6c): an NPC who uses a bought item really buys it (bạc out, item into her chest, traceable).
- Report: dev/handover/reports/role-parity-4.md (handover branch; push = fetch + checkout -f --detach + re-apply + push, never pull --rebase): rows removed, tests, gates table, laws 1–6 check. Then 'SẴN SÀNG KIỂM <sha>' + send_message Foreman B session_01N1tNP3G5N78YfJ9phcb2nc.
