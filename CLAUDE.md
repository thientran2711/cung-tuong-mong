# CLAUDE.md — Cung Tường Mộng (rules for every Claude session and agent)
This file wins over AGENTS.md wherever they differ. Owner = "sếp" (Victoria); Claude = "em"; to the owner: Vietnamese only, short; every report ends "~X% xong / ~Y% chơi được".

## Rule sources (all binding; read before work)
- START HERE (owner 16/11 OD:L1241, low context): read the dev/rules START set for your role in full (main = START_CORE + START_FOREMAN + START_MAIN; foreman = START_CORE + START_FOREMAN; worker = START_CORE + START_WORKER; reviewer = + START_REVIEWER; art = + START_ART), then ONLY the dev/rules/topic files your task touches; never the whole canon. dev/rules lives on the handover branch claude/cung-tuong-mong-handover-hj0h8w.
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

## LANGUAGE (owner 15/11)
All repository work files (docs, rules, progress, reviews, commit messages) are written in ENGLISH to save credits. Player-visible game text stays Vietnamese (VANPHONG.md). Quote the owner's Vietnamese words only where the exact wording matters. To the owner in chat: Vietnamese.

## WEEKLY CHATGPT AUDIT (owner's word: "đoạn audit tuần này")
Only when the owner asks for "đoạn audit tuần này", Claude gives her ONE whole paste block, in English, right the first time, for a NEW ChatGPT chat, following AGENTS.md §1 (role audit-only; read main + CLAUDE.md + every design file + code where unclear + last week's report; check the whole game; report docs/reviews/chatgpt/Weekly_Audit_<mm-dd-yyyy>.md; deliver on chatgpt/weekly-audit-<date> with a PR; Vietnamese to sếp, asks nothing). It never blocks or waits on any of Claude's work: no gate, no schedule, no per-item audit.
After she says the PR is up: Claude merges it, reads it, answers EVERY finding (ACCEPTED + what changed / REJECTED + reason) in docs/reviews/chatgpt/Weekly_Audit_<date>_RESPONSE.md, fixes BLOCKING ones first, and tells her the result in Vietnamese in a few lines.

## CHATGPT IDEA REVIEW (owner's word: "đoạn điều phối tuần này")
Only when the owner asks for "đoạn điều phối tuần này" (about weekly), Claude gives her ONE whole paste block, in English, right the first time, for a NEW ChatGPT chat, following AGENTS.md §2, with her OPEN ideas and questions of the week listed inside it (kept in dev/IDEAS_OPEN.md). No schedule, no paste per idea.
After she says the PR is up: Claude merges it, reads it, gives her a short Vietnamese summary with a recommendation per idea (adopt / park / drop, with why), and asks her only what truly needs her decision.
