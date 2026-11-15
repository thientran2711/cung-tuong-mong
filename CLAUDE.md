# CLAUDE.md — Cung Tường Mộng (rules for every Claude session and agent)
This file wins over AGENTS.md wherever they differ. Owner = "sếp" (Victoria); Claude = "em"; to the owner: Vietnamese only, short; every report ends "~X% xong / ~Y% chơi được".

## Rule sources (all binding; read before work)
- `dev/OWNER_DECISIONS.md` — every owner ruling, newest last. **Live copy: branch `claude/cung-tuong-mong-handover-hj0h8w`** (main holds a copy synced by the coordinator; if they differ, the handover branch wins).
- `dev/handover/WORKER_BRIEF.md` (same branch) — LUẬT KIT TRƯỚC, LUẬT SỬA CẢ NHÓM, LUẬT ƯU TIÊN SỐ 1, art and test rules.
- `dev/handover/HANDOVER_1115_PM.md` (same branch) — current state, branches, queue.
- `dev/HANDOVER.md` — older binding rules (PRIORITY RULES, ONE KIT REVIEW GATE, KIT-FIRST, PRIORITY DEVICES, OWNER RULES 11/14).
- `dev/kit/KIT.md` (one UI kit), `dev/kit/VANPHONG.md` (player-visible wording), `dev/kit/KIT_REQUESTS.md` (missing kit parts).
- Design files: `dev/ITEMS.md`, `dev/ITEMS_EARNED.md`, `dev/MINIGAMES.md`, `dev/EMOTION_PLAN.md`, `dev/MEN_PLAN.md`, `dev/RARE_ENDINGS.md`, `dev/MOTION.md`, `dev/*_PROGRESS.md`, `dev/PROGRESS_*.md`, `dev/art/STYLE_ANCHOR.md`.
- Numbers: `BAL` in `dev/build/jbal.js` (+ `jbal2.js`); game code in `dev/build/j*.js`, assembled by `dev/build/assemble.py`, site built by `dev/site/build_site.sh`. Tests in `dev/test/`, measures in `dev/measure/`.

## Core laws (short form; full text in the sources)
- Never push to main except the coordinator fast-forwarding a reviewer PASS. Workers: `review/<topic>` branches only. No pull requests by workers.
- LUẬT ƯU TIÊN SỐ 1: before any new work, grep OWNER_DECISIONS + HANDOVER + PROGRESS and `git grep` origin/main + all origin/review/*; reuse what exists.
- LUẬT SỬA CẢ NHÓM: one reported fault ⇒ fix the whole family (scan script + before/after table).
- LUẬT KIT TRƯỚC: every info display from the shared kit; missing part ⇒ stop, file in KIT_REQUESTS.md, coordinator gets it built first. Reviewers FAIL any custom chip/row/frame.
- Every player-visible word per VANPHONG.md (cổ trang; no %, odds ladder Liều/Khó/Năm ăn năm thua/Khá chắc/Chắc/Rất chắc/Nắm chắc).
- Art: Magnific gpt-2-6 only; look at every image. Images live on the CDN, not in git.
- Disk: sparse worktrees, fetch `--depth=30` under `flock /home/user/wt/fetch.lock`, never full-clone.
- Coordinator watch: one wake per hour (owner 15/11), plus wakes on worker reports.

## CHATGPT IS THE LAST AUDITOR (owner 15/11)
ChatGPT audit chats (see AGENTS.md) are the last auditor of every rule and number. The gate: no pull request carrying a rule, number, engine or design-file change merges into main before `CHATGPT AUDIT PASSED: <branch> <head>`; the owner's play never waits — an item may go live after Claude's own reviewers and tests, and the audit runs alongside; the item is FINAL only after that line.
The coordinator:
- queues every item the moment it is READY: `READY FOR CHATGPT AUDIT: <branch> <head>` in `QUEUE.md` on branch `chatgpt-claims`, plus one file `audit-fast/<branch-dashes>__<head8>.md` (what changed, rules/design files touched, how to test, share A or B);
- **at every wake**: (1) merges ChatGPT report pull requests (`chatgpt/*` → main, docs only; reject any that touch other files); (2) regenerates `OPEN_AUDITS.md` on `chatgpt-claims` (queued / claimed / PASSED / BLOCKED / RE-AUDIT); (3) names a repair holder (worker + branch) for every BLOCKED verdict that same wake, and queues `RE-AUDIT: <branch> <head>` after the repair.

## HER IDEA GOES TO CHATGPT TOO (owner 15/11)
Every idea, fault or ruling of the owner's on rules or numbers gets ONE whole paste block for the ChatGPT ĐIỀU PHỐI chat in the same reply: her words, Claude's draft, its family of like cases in the game, the open question, and the answer file path `docs/ideas/ChatGPT_S<n>_Answer_VI.md` (next free S<n>). Every paste is logged in `S_LOG.md` on `chatgpt-claims`. At the next wake Claude merges and reads the answer pull request, summarizes it to the owner in Vietnamese in a few lines, and folds what passes Claude's reviewers into the design as PROVISIONAL, telling her in one line. An unanswered S<n> is re-listed in every report.
