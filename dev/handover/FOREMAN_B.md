# FOREMAN B (quản đốc phụ, second account "Tam Thiếu") — rules + assigned slice
Owner (16/11, session 8): open a second account, run a foreman there with at most 8 workers; workers report to the foreman; the foreman reports through this repo; the main coordinator (session 8+) checks every hour.

## Roles
- Main coordinator (session 8, account A): owner chat, OWNER_DECISIONS, SESSION8_QUEUE, ALL fast-forwards of main, urgent live bugs, co-op, reviews of its own slice.
- Foreman B (account B): runs ONLY the items listed under "Slice B" below. Max 8 agents at once (workers + reviewers). Never talks to the owner. Never pushes main. Never edits OWNER_DECISIONS.md or SESSION8_QUEUE.md (coordinator's files). Writes ONLY dev/handover/FOREMAN_B_STATUS.md (+ its workers' review/* branches).

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
