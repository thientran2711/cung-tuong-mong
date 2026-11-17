PRIORITY #1 CHECK ('greet|chào hỏi|xưng tên|hỏi danh|AG-MEET|approaches\('): OD 4 (OD tail 17/11 05:12Z greeting name rule, 05:25Z NPCs approach her, 05:28Z chosen) | ledger 2 (D47 'Phi ???' in greet text) | claims 0 workers (orders only: FOREMAN_C_STATUS 909/910/913) | main 15 (j61.js:142/151/154/155 greet = face only + 2nd step Hỏi danh tính; j24.js:37 approaches() weekly, friends/enemies only; j42.js:116/404; j22.js:24) | review/* 0

# GREET-MEET — greeting name rule (by rank + trait) + AG-MEET (NPCs at a place come to HER) — ONE job, ONE branch
Foreman: Foreman C ROOT-5 session_011xDdVSQvhH4vp7H6B7arST (report to it with send_message; short).
Model: opus (NPC rules, BIG review). Branch: review/greet-meet from origin/main (now 7e264081). Never push to main. No pull requests.
Report file: dev/handover/reports/greet-meet.md on branch claude/cung-tuong-mong-handover-hj0h8w (pull --rebase, push; retry).

## Read first (in full)
- dev/rules/START_CORE.md + dev/rules/START_WORKER.md (handover branch claude/cung-tuong-mong-handover-hj0h8w), then only the dev/rules/topic files your task touches.
- The owner's EXACT words: dev/OWNER_DECISIONS.md lines starting "(17/11 ~05:12Z real" and "(17/11 ~05:25Z real" (grep them; read the whole lines) + screenshot dev/handover/refs/owner-greet-name-1117.jpg.
- The two orders: dev/handover/FOREMAN_C_STATUS.md lines starting "- (17/11 ~05:26Z) ORDER" and "- (17/11 ~05:29Z) ORDER".
- Design of the NPC-agent train: dev/handover/reports/npc-agent.md (AG1b/AG5 rows), npc-agent-ag2.md, npc-agent-ag3.md, review-npc-agent-ag3-r1.md (perf budget §4, host-only).
- dev/kit/KIT.md (person dialog / result box parts) + dev/kit/VANPHONG.md (all player words cổ trang; no %, odds ladder words; no typed numbers — print BAL).

## Step 0 — history/drama expert check FIRST (owner rule OD:L1327)
Before code, research court greeting etiquette (Minh/Thanh palace practice + well-known palace dramas: who names herself, how the lower rank greets the higher, when an attendant announces, how proud/cold high ranks answer). Write dev/research/greet-etiquette.md on your branch (short: findings + sources + what it means for our rule). If it contradicts the owner's chosen rule, keep her rule and note the difference for the foreman.

## Step 1 — GREETING NAME RULE (owner chose 05:28Z: "Làm theo đề xuất trên (phẩm + tính cách).")
- Lower rank always names herself when greeting ("Thần thiếp <tên>, <phẩm> ở <cung>, thỉnh an …") → higher one learns her name.
- Lower one learns the higher one's name at once when the title is unique/public (Hoàng hậu, Hoàng quý phi, Thái hậu, Hoàng thượng) or an attendant announces it.
- Non-unique higher rank (Phi/Tần…) gives the name or not BY TRAIT (use the live 3-group trait pool on main: proud/cold Tính tình → no; gentle/warm → yes).
- Equals exchange names unless one is proud/cold.
- The result line says WHY (reuse the live SHOW-WHY read-out, main 9391f9a).
- Two-way: NPC↔NPC and NPC→her use the same function.
- ONE BAL table: unique titles + trait → answer. No typed numbers anywhere. Fix the whole family: every greeting site (j61 greet/name, j42, j22, j25 'greet', thỉnh an) uses the one function; scan script + before/after table in the report. Fix 'Phi ???' in greet text (ledger D47) if still live.

## Step 2 — AG-MEET (owner 05:25Z)
At every place, each buổi every NPC present spends its OWN khắc choosing whom to approach among the people present (by trait and bonds; strangers at random — a grey shadow to them as they are to her), may pick her, then uses the SAME person-dialog options on her (greet, ask health, praise, provoke, share secret…) with the SAME formulas; she gets reply options. Not every buổi, not everyone. REUSE j24.js approaches() (today weekly, friends/enemies only, not place-based) + the j95 place record + j61 stranger/greeting rules + Step 1 greeting — NO second system. Host-only, within the §4 perf budget. Co-op: state only.

## Tests + measure
Unit tests in dev/test for the rule table (rank × trait × unique), two-way, old-save load; bot measure: approaches per buổi per place (not every buổi, not everyone), no perf regression. Fold 755x1000 + iPad 1180x820 shots of: greeting result line (lower/higher/equal/proud), an NPC approaching her with reply options.

## Finish
Report reports/greet-meet.md: PRIORITY #1 CHECK line first, before/after table, tests, shots, sha; last line "SẴN SÀNG KIỂM <sha>". Then send_message the foreman. Foreman opens an opus BIG reviewer.

ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
(Worker: you do NOT open your successor; write the handover in your report and tell the foreman.)
Disk: sparse worktrees, fetch --depth=30 under flock /home/user/wt/fetch.lock, never full-clone.
