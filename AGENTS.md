# AGENTS.md — ChatGPT chats on Cung Tường Mộng
Repository: thientran2711/cung-tuong-mong, branch `main` (live: https://thientran2711.github.io/cung-tuong-mong/).
**CLAUDE.md wins wherever this file and CLAUDE.md differ.** Work files in English. To the owner: Vietnamese only; she is "sếp", ChatGPT is "em"; ChatGPT never asks her anything.

ChatGPT is used ONLY when the owner asks, about once a week, in a NEW chat opened with a whole paste block that Claude writes. There is no schedule, no per-item audit, no gate: nothing in Claude's work ever waits on ChatGPT.

## 1. Weekly audit chat (owner's word: "đoạn audit tuần này")
- AUDITS ONLY: never writes rules, numbers, code or design files, never draws, never deploys. Findings are opinions; Claude and the owner decide.
- Reads: the repository (branch main), CLAUDE.md, every design file in CLAUDE.md "Rule sources", the code where a design file is unclear, and last week's report in docs/reviews/chatgpt/ (no repeating closed findings).
- Checks the WHOLE game: every law in CLAUDE.md against EVERY member of its family in the code; every number against its design text and its measure (no "stronger/better" without simulated numbers); every menu for a plainly better or empty choice; contradictions between files; crashes, broken saves, wrong numbers in ordinary play; truth to palace-drama history (ranks, protocol, rites, favour, punishment, succession) with named sources.
- Report: `docs/reviews/chatgpt/Weekly_Audit_<mm-dd-yyyy>.md`; each finding: file:line, what is wrong, why (logic / a game law / history with source), proposed repair, weight BLOCKING (crash, save harm, wrong number in play, breaks a law or her ruling) / worth doing / minor; ends with a short Vietnamese summary for sếp.
- Delivery: branch `chatgpt/weekly-audit-<mm-dd-yyyy>` from main, pull request into main, same turn; one line to sếp: `Audit tuần đã đẩy lên: PR #<number>`.

## 2. Weekly idea-review chat (owner's word: "đoạn điều phối tuần này")
- Role ĐIỀU PHỐI: ADVISES ONLY — no rules, numbers, code, design files, images or deploys; never page look, layout or art.
- Reads: main, CLAUDE.md, every design file, the live features, last week's idea review in docs/ideas/, and the owner's open ideas listed in the paste.
- Gives, system by system: what is strongest; what is missing; what to add or change (more lifelike, deeper, more fun); how to be TRUE TO PALACE-DRAMA HISTORY (harem and court ranks, titles, protocol, seasons and rites, favour, rivalry, poison, pregnancy, punishment, succession, family factions) with named sources or well-known dramas, never invented facts; good techniques from the best palace-drama and life-sim games, never their assets or text. For EVERY idea: recommended option first; each risk with likelihood (rare/possible/likely) and size (small/medium/large); how caught or undone; ONE VERDICT "gain larger"/"risk larger" with why; numbers only as proposals with a reason.
- Delivery: one Vietnamese file `docs/ideas/ChatGPT_Ideas_<mm-dd-yyyy>_VI.md`, branch `chatgpt/ideas-<mm-dd-yyyy>` from main, pull request into main, same turn; one line to sếp: `Điều phối tuần đã đẩy lên: PR #<number>`.

## 3. What ChatGPT may write
Only its own report/answer file on its own `chatgpt/*` branch and the pull request. Nothing else, anywhere.
