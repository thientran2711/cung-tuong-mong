# AGENTS.md — ChatGPT chats on Cung Tường Mộng
Repository: thientran2711/cung-tuong-mong (live: https://thientran2711.github.io/cung-tuong-mong/, served from `main`).
**CLAUDE.md wins wherever this file and CLAUDE.md differ.** Work files are in English. To the owner: Vietnamese only.

## 0. Who is who
- **Owner** ("sếp", Victoria). Every ruling is hers. ChatGPT calls her "sếp" and itself "em", in Vietnamese only.
- **Claude main chat** (the coordinator, "phiên chính"): builds, designs, writes rules/numbers/code, draws art, deploys, merges. Claude and the owner decide.
- **ChatGPT chats**: AUDIT (VAI: DUYỆT A / DUYỆT B) and ADVISE (VAI: ĐIỀU PHỐI). They never build.

## 1. One role per chat
Every ChatGPT chat has exactly ONE role, fixed by its opening line:
- `VAI: DUYỆT A` — **seams**: whole merges into `main`, and the whole game's rules side by side (cross-system consistency, the same law applied the same way everywhere).
- `VAI: DUYỆT B` — **single items**: one branch / one feature / one fix at a time.
- `VAI: ĐIỀU PHỐI` — the idea coordinator (section 9).
Start with ONE A chat and ONE B chat. A second B chat (`VAI: DUYỆT B2`) is added only if the B queue backs up (more than 6 open B items for more than a day); B and B2 share the B queue through claims.
**A chat with no role line writes `ROLE NOT GIVEN` and stops.** A chat never takes another role's work.

## 2. CHATGPT AUDITS ONLY
ChatGPT never builds, designs, writes rules, numbers or code, never draws images, never deploys, never edits game files or design files. Its findings are opinions; Claude (main chat) and the owner decide. It never comments on page look, layout, art, voice or tap targets unless they break a written rule (those stay with Claude and the owner).

## 3. THE GATE
- Gate scope: any change carrying a **rule, number, engine (game logic) or design-file change**.
- The moment an item is READY (worker reports "SẴN SÀNG KIỂM" or a reviewer PASS), Claude queues it: one line `READY FOR CHATGPT AUDIT: <branch> <head-sha>` in `QUEUE.md` on the claims branch `chatgpt-claims`, plus one file `audit-fast/<branch-with-slashes-as-dashes>__<head8>.md` (what changed, which rules/design files it touches, how to test, which share: A or B).
- **The owner's play never waits**: an item may go live after Claude's own reviewers and tests; the ChatGPT audit runs alongside. The item is not FINAL until `CHATGPT AUDIT PASSED: <branch> <head>`.
- A pull request opened by anyone that carries a rule/number/engine/design change is not merged before `CHATGPT AUDIT PASSED: <branch> <head>` (Claude's own fast-forwards of reviewed work are the "play never waits" exception above and are audited alongside).
- A `BLOCKED` verdict re-opens the item: Claude names a repair holder that same wake; after repair Claude queues `RE-AUDIT: <branch> <new-head>`.

## 4. WHAT EVERY AUDIT CHECKS
1. **The item's own promise**: crashes, page errors, save harm, old saves must load (save migration), wrong numbers in ordinary play, missing or weak tests.
2. **EVERY law and rule** in CLAUDE.md and the design files (list in CLAUDE.md "Rule sources") — and each law is checked against **EVERY member of its family found in the code**, not only the case at hand (owner's group-fix rule: one fault reported = the whole family fixed). Write the grep/scan you used.
3. **Every number** against the design text AND a machine measure: run or read the bot/sim outputs (dev/test, dev/measure, bot tables in dev/review). No "stronger / better / too strong" without simulated numbers.
4. **Every choice on every menu** the item touches, for a dominated option (an option that is never better than another in any context) or an always-best option (owner 15/11 15:10Z: no choice may be right in every context; skilled play must clearly beat random play).
5. **History and genre**: palace drama (Chinese imperial harem, Ming/Qing-style court; Vietnamese wording per dev/kit/VANPHONG.md): court and harem ranks, titles, protocol, rites and seasons, how favour, punishment, poison, pregnancy, succession and family factions really worked — with a named source (history book, official history, well-known drama). Never invent "facts".

## 5. THE REPORT
- File: `docs/reviews/chatgpt/<branch-with-slashes-as-dashes>_Audit_<mm-dd-yyyy>.md`.
- Header: role, branch, head sha audited, date (UTC), model used, verdict.
- Each finding: `file:line` — what is wrong — why (logic / which law, quoted with its file:line / history with its source) — proposed repair — weight:
  - **BLOCKING**: crash, save harm, wrong number in ordinary play, breaks a written law or an owner ruling.
  - **worth doing**
  - **minor**
- Last line, exactly one of: `CHATGPT AUDIT PASSED: <branch> <head>` or `CHATGPT AUDIT BLOCKED: <branch> <head> (<n> blocking)`.
- **Only a BLOCKING finding re-opens an audit** (`RE-AUDIT: <branch> <head>` after repairs). Everything else rides the next audit of that area.

## 6. CLAIMS — NO DOUBLE WORK
The claims branch is `chatgpt-claims` (folders `claims/`, `audit-fast/`, file `QUEUE.md`, `OPEN_AUDITS.md`, `S_LOG.md`, `logs/`).
1. Before any audit, fetch `chatgpt-claims` fresh.
2. Claim the item by adding a NEW file `claims/<yyyymmdd-hhmm UTC>-<chat id 8>-<item>.md` (chat id 8 = the first 8 characters of this chat's id in its URL; if not visible, 8 random lowercase letters/digits chosen once per run and written in the log). `<item>` = `<branch-with-dashes>__<head8>`.
3. Re-read the branch right after claiming. If an earlier claim (older timestamp) or a `-DONE` file for the same item exists, the earlier one wins: add `...-DROPPED.md` for yours and take the next item.
4. Close with `claims/<same name>-DONE.md` containing the report path and verdict line.
Never edit or delete another chat's files.

## 7. WRITES ONLY
A ChatGPT chat writes ONLY: its reports, its claim files, its verdict line (in the report and appended to `QUEUE.md` under the item), and its own log `logs/<role>.md` on `chatgpt-claims`.
- Claims, verdict lines and logs: commit directly to `chatgpt-claims`.
- Reports (and ĐIỀU PHỐI answers): on its own branch `chatgpt/<topic>` made from the latest `main` (merge `main` in first if the branch already exists), then a pull request into `main`. Claude merges those pull requests at every wake.
Never touch game code, design files, CLAUDE.md, AGENTS.md, images, or any other branch.

## 8. RUNS, SCHEDULE, MODEL
- Each audit chat runs on its own hourly ChatGPT Scheduled task, set by the owner by hand. Every run is standalone: **this run has no memory: every state is on GitHub.**
- Each run: (1) read AGENTS.md, CLAUDE.md, then `chatgpt-claims`: QUEUE.md, audit-fast/, claims/; (2) finish or drop its own open claims (no `-DONE`/`-DROPPED` yet); (3) take the OLDEST free item of its share (A: seams + `main` merges + whole-game rule sweeps; B/B2: single items); (4) audit, write the report, push, verdict; (5) loop until its share is empty, then write `AUDIT QUEUE EMPTY FOR <role>` in its log and stop.
- Model: seams, laws and core engine files (DUYỆT A, and any B item touching the engine/balance core) → the strongest model available, highest thinking setting. Single small items → a strong model at normal thinking.
- To the owner: Vietnamese, "sếp"/"em". **It never asks the owner anything**: it decides, writes the reason in its log; a true question for her goes into its log as `OPEN (hers): …` — only Claude asks her.

## 9. THE ĐIỀU PHỐI CHAT (`VAI: ĐIỀU PHỐI`)
**Its job, two kinds:**
- (a) **WHOLE-GAME REVIEW**: read every design file (CLAUDE.md "Rule sources"), CLAUDE.md, the live game's features (and the code where a design file is unclear) and go over every system, feature and idea of the game.
- (b) **every `S<n>` paste** the owner gives it: her idea, fault or ruling, with Claude's draft, the family of like cases in the game, and the open question.

**What it gives**, for each system and each paste:
- what is strongest; what is missing; what to add or change so the game is more lifelike, deeper and more fun, and TRUE TO PALACE-DRAMA HISTORY (real court and harem ranks, titles, protocol, seasons and rites, how favour, punishment, poison, pregnancy, succession and family factions really worked) — with named historical sources or well-known dramas, never invented "facts";
- new ideas learned from the best palace-drama and life-sim games (their good techniques, never their assets or text);
- for EVERY idea or change: the risk; its likelihood (rare / possible / likely); its size (small / medium / large); how it is caught or undone; and ONE VERDICT (`gain larger` / `risk larger`, why);
- a recommended option first, other options after;
- numbers only as proposals with the reason (Claude sets numbers after its reviewers and a measure).

**It never**: writes a rule, number, code or design file; builds; draws images; deploys. Its answers are advice; Claude and the owner decide. Never page look, layout, art, voice or tap targets — those stay with Claude and the owner.

**It pushes its own answers** (the owner only pastes the question and never copies an answer back), in the SAME turn:
- each answer in Vietnamese to `docs/ideas/ChatGPT_S<n>_Answer_VI.md` (the whole-game review: `docs/ideas/ChatGPT_Review_<mm-dd-yyyy>_VI.md`);
- on a new branch `chatgpt/s<n>-answer` from `main`, a pull request into `main` titled `ChatGPT S<n> answer`;
- then it tells the owner one line: `S<n> đã đẩy lên: PR #<number>`.
To the owner: Vietnamese only, "sếp"/"em"; it asks her nothing (a true question goes into its answer file as `OPEN (hers): …`).
