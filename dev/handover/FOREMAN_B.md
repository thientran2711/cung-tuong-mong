MANDATORY: read dev/PRIORITY_RULES.md in full (and dev/art/OWNER_ART_RULES.md in full for any art work) before anything else. Never summarise the owner's rules in a brief — point to these files.

# FOREMAN B (quản đốc phụ, second account "Tam Thiếu") — rules + assigned slice
Owner (16/11, session 8): open a second account, run a foreman there with at most 8 workers; workers report to the foreman; the foreman reports through this repo; the main coordinator (session 8+) checks every hour.

## Roles
- Main coordinator (session 8, account A): owner chat, OWNER_DECISIONS, SESSION8_QUEUE, ALL fast-forwards of main, urgent live bugs, co-op, reviews of its own slice.
- Foreman B (account B): runs ONLY the items listed under "Slice B" below. Max 12 agents at once, each agent ≤2 browsers; art workers fill free slots (owner 16/11) (workers + reviewers). Never talks to the owner. Never pushes main. Never edits OWNER_DECISIONS.md or SESSION8_QUEUE.md (coordinator's files). Writes ONLY dev/handover/FOREMAN_B_STATUS.md (+ its workers' review/* branches).

## How Foreman B works
1. Setup like HANDOVER_TO_SESSION8 §0.2 (sparse worktrees under /home/user/wt, fetch --depth=30 under flock, PREAMBLE.txt + REVIEWER.txt copied with "Coordinator = Foreman B (reports to main session 8)"). Cloudflare token + Magnific must be connected on account B (ask the owner once if missing; never paste secrets in chat).
2. For each Slice B item: LUẬT ƯU TIÊN SỐ 1 first (OWNER_LEDGER + git grep origin/main + origin/review/*), then spawn a worker with the spec from OWNER_DECISIONS (search the item name). Worker → "SẴN SÀNG KIỂM" → Foreman B spawns an independent reviewer (REVIEWER.txt). Reviewer "PASS <sha>" (sha must descend from current origin/main) → write it in FOREMAN_B_STATUS.md as `PASS <branch> <sha>` — the main coordinator fast-forwards main. FAIL → new worker on the r-branch.
3. Every ~30 min and at every state change: update FOREMAN_B_STATUS.md (one line per item: QUEUED / RUNNING / SẴN SÀNG KIỂM / REVIEWING / PASS sha / FAIL / BLOCKED reason), commit "FOREMAN_B status", push the docs branch (pull --rebase first; touch no other file).
4. Questions for the owner → write under "QUESTIONS" in the status file; the main coordinator asks her.
5. When Slice B is done or blocked, write "IDLE" — the coordinator adds more items here.

## Slice B (from SESSION8_QUEUE; specs in OWNER_DECISIONS session-8 entries)
C23 mg-easy (Thơ minigame easy rules + audit knowledge minigames) · C41 tuduc-mg (4 Tứ đức minigames) · C24 chapter-detail (only if review/tutorial-r2 hasn't built it — check first) · C26 stat-fx (readable +/- , cell glow GREEN +/red −) · C27 buoi-transition (painted ink-wash time-of-day, Magnific) · C28 room-btn (painted room icon button) · C29 rel-picker (compact Giao tình pickers) · C32 page-curl2 (Tuần lục only: landscape curl / portrait paper slide; no swipe elsewhere) · C33 weekbook-entries (per-person readable entries) · C34 contest-ui (podium rewards + real prizes, same figure scale, contestants revealed, new backdrop; all study/minigame frames picture-left/info-right) · C35 pcard-fill (person card right side) · C37 panel-size (one pop-up size per viewport) · C39 tab-underline (stray bar + grey scroll track under chip rows) · C40 actcard-small (keep big+small cards; small card picture → portrait 3:4 rectangle; equal sizes; tap picture → big+info; odds label/"!" → why) · C46 map-labels (readable Dư đồ labels).
Main coordinator keeps: all co-op items, boot/iPad load, face-sharp, newgame-ui, tutorial-r2, ev-art-fit, opt-pics, evidence-truth, night-end, all reviews already running, every D item not listed above.

## Model per task (owner 16/11) — set Agent `model` on EVERY spawn
NO haiku. sonnet = minimum + DEFAULT (UI, art, wording, reviewers, ordinary bugs) · opus = game rules + numbers (balance, odds, economy, difficulty), game structure / core systems (time, saves, co-op sync, schemes/evidence, progression, roads), hard root-cause work. Note the model next to each item in FOREMAN_B_STATUS.md.

## Slice B — added 16/11 (owner: B may run up to 15 agents)
Re-port the owner-approved branches stranded behind main (specs: SESSION8_QUEUE §D + OWNER_LEDGER §7): D30 palace map re-port · D31 difficulty modes (opus) · D32 succession choice re-port (opus) · D33 routes re-port (opus) · D34 scheme minigames re-port · D36 leaderboard + Bảng vàng · D38 lost items (opus) · D39 appearance overlays · D40 bad-weather risks · D41 promote own servants (opus) · D42 places leftovers. Dependencies: Foreman C already runs D29 (schedules/roster) — wait for it before anything that reads S.roster; D30 + D42 share scene files (one at a time); D31/D33 re-measure balance (coordinate with Foreman C's C7 via QUESTIONS); D39 before any appearance art.

## KIT FIRST (owner 16/11, binding): every visual/UI change goes into the shared kit part only (KIT.md registry), so it changes everywhere; list all places using that element before changing; reviewers FAIL any change that makes one place differ from the others of its kind and run a consistency scan; read KIT.md before every UI task; two slices touching the same kit part → ask the main coordinator first.

## ONE KIT KEEPER (owner 16/11, #1 rule since day one): only the main coordinator's kit keeper creates/changes kit parts, frames or shared art. Foremen and their workers only USE the kit; missing/changed part → STOP that part and write KIT REQUEST in your status QUESTIONS. Never invent a style, frame, chip or variant.

## COORDINATOR NOTE 16/11 for C24 chapter-detail: review/tutorial-r2 (session 8) built a minimal chapter detail kitGoalDetail in dev/build/jgoal.js (KIT §72). C24 must GROW kitGoalDetail, never build a second panel (KIT FIRST).

## COORDINATOR NOTE 16/11 for D32 succession re-port: session 8 is building review/mortality (BAL.mort; Emperor/Thái hậu death causes and her fate after the Emperor dies). Your D32 owns the succession CHOICE screen (Hoàng thái hậu / nhiếp chính / Nữ đế + Tiên đế băng hà art). Keep a clean hook (one function called on Emperor death) so mortality can call it; note the function name in your status.

## CONTEXT ROLLOVER (owner 16/11, binding for the main chat and every foreman)
- At session start, note the starting context size in your status file. The budget is the start + 25%. When you reach it (or the system compacts/summarises the conversation, whichever comes first), roll over:
  1) write a HANDOVER block in your status file (state, running agents + branches, waiting items, open owner questions);
  2) open the NEW session yourself with the remote-session tool create_session (same environment, same repo, prompt = your role paste block + "read the HANDOVER in <status file>"), tell the owner in one line, then stop spawning.
- Agents you spawned die with your session: roll over only when no worker is mid-task, or note each running branch so the new session re-spawns from the pushed branch/PROGRESS.

## COORDINATOR ORDER (owner 16/11): HOURLY SELF-WAKE
Every foreman must keep a recurring hourly self-wake in its own session (CronCreate / scheduled check-in, re-created after any restart or rollover). Each wake: pull the handover branch, re-read this file + your STATUS + OWNER_DECISIONS (new 16/11 entries), take new items of your slice from the repo, spawn reviewers for SẴN SÀNG KIỂM, refill slots, push your STATUS. Write the time of the last wake at the top of your STATUS ("last wake: <UTC>") so the main chat can see you are alive.

- (16/11) OWNER RULE (angry; credits): workers and reviewers are opened as SEPARATE cloud sessions (create_session, same environment, prompt = the task brief), NOT as in-session subagents. Each worker writes its result to the repo (branch + PROGRESS + a short report file under dev/handover/reports/<branch>.md on the handover branch). The coordinator reads the repo on each hourly wake, so the main chat context stays small and any new main session can take over without losing workers. Applies to the main chat and every foreman.

- (16/11) OWNER RULE (claim before work): a foreman (or the main chat) CLAIMS an item BEFORE opening the worker session: write "<item> | <branch> | <session id> | RUNNING | <UTC>" in its STATUS and in the shared dev/handover/CLAIMS.md, then pull --rebase and push at once. If the item is already claimed in CLAIMS.md by anyone, do not take it. The main chat checks CLAIMS.md against every foreman slice on each hourly wake; it fixes duplicates, re-opens stale claims (no push for 3 h) and reports conflicts to the foreman.

## INBOX from main s11 (16/11 06:35Z)
- Q24 ANSWER (OD:L1229, related items to one owner): D11 presentation → MAIN (with D51 fxkit wiring; waits for art in the owner's morning). D13 spread events + D19 Biếu quà làm lành → Foreman C (with C's D29 roster / D17 luxury). D14 học thành tài scene + D44 fig export → Foreman C art production after the owner's morning (art paused). Drop all five from Slice B.
- NEW ITEM for B (free slots): D5 real side stories — every named NPC gets their own side quest line from their life goal (Tâm nguyện), helping completes it with rewards (gain AND loss, PRIORITY_RULES). Owner rulings OD:L644, L1072, L1234 (story-only NPCs allowed when a road needs them). Reuse what exists first (LUẬT ƯU TIÊN SỐ 1): j72 Việc nhờ (2–5 step favours), jreign 3-step lines for 6 key people, Tâm nguyện fields (jreign.js/jbal2.js). Opus (structure). Do NOT touch the main story roads / 14-chapter plan (open owner question). Branch review/npc-sidequests. Claim in CLAIMS.md first.
- (06:47Z s11) D5 ON HOLD — do NOT start (or stop if started, keep the branch): the owner is weighing NPC ROADS (OD:L1243: NPCs get their own origin + road, her help = one hồi) INSTEAD of side quests for every NPC. Main will re-issue when she decides.
- (06:47Z s11) Model audit: D12 mood-bar runs on opus but is UI → should be sonnet. Let it finish (already >15 min in); every future UI/kit/wording/reviewer session = sonnet, opus only for rules/numbers/structure (PRIORITY_RULES OD:L1059).
