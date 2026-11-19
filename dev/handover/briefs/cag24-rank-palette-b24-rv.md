# REVIEW BRIEF cag24-rank-palette-b24-rv (SMALL, sonnet) — for Foreman C-AG #24 session_01Rc5AsKVnhHiiDQzT6H9jNi
PRIORITY #1 CHECK ('rank palette', MAIN ROOT-71 19/11 22:14Z): OD 2 | ledger 0 | claims 2 (rank-palette-b24 RUNNING) | main 8 (dev/build/j1.js RCOL, j59.js halo/frames/badges) | review/* review/rank-palette-b24 (this job) | archive 0

Read first: '★ THE 18 LAWS' block at top of dev/rules/START_CORE.md, then START_CORE + START_WORKER + START_REVIEWER in full (handover branch claude/cung-tuong-mong-handover-hj0h8w), dev/kit/KIT.md.
Job brief (owner words B24 verbatim + MAIN order): dev/handover/briefs/cag24-rank-palette-b24.md. Worker report: dev/handover/reports/rank-palette-b24.md.
Target: origin/review/rank-palette-b24 @ 6702ccc2 (base LIVE main 3584ea42). 5 files: j1.js RCOL values, jk4.js kitToneOf (rank bases keep own saturation), jmark.js fallback gold, KIT.md §1.3, dev/tools/rank-colour-scan.py.

CHECK (FAIL on any miss):
1. The 8 hex in RCOL match B24 exactly in rank order t1..t8 (t6 cam #E3A25B, t7 đỏ #D46A64 — owner swap Lượt 728).
2. Law 4/9: ONE table. Re-run the scan tool AND your own independent grep (old RCOL hexes from `git show 3584ea42:dev/build/j1.js`, plus any rank→colour map by tier index in dev/build, dev/kit, dev/site, CSS) → 0 stray rank colours outside RCOL.
3. Law 11 whole group: every place showing a rank colour reads RCOL — avatar frames, rank badges/chips, halo, name tags, title plates, lists/cards. Spot-check the jk4 kitToneOf change does not break non-rank tones (servants/roles) and keeps readable contrast.
4. The worker only shot the kit sample page. YOU must shoot IN-GAME screens that show ranks (character pick / phi tần list / profile with avatar frame + badge + halo / any rank list) on Samsung Fold portrait 755x1000 and iPad landscape 1180x820, before (3584ea42) and after (6702ccc2), LOOK at each 3×: 8 ranks distinct, each reads as its named colour, text on rank grounds readable. Save shots under img/_review/rank-palette-b24/ on the handover branch only if small (jpg), else describe.
5. Build (dev/build/assemble.py, dev/site/build_site.sh) + existing quick tests pass.
6. Open point B21 (Quý phi yellow touch) not built — acceptable only if no kit slot exists; note it, not a FAIL.
VERDICT: write '## REVIEW (SMALL rv) — PASS|FAIL' section into dev/handover/reports/rank-palette-b24.md (handover branch; push recipe: fetch +ref, reset --hard, edit by script, commit, push, verify, repeat on reject, NEVER rebase) with the sha reviewed; then send_message C-AG #24 session_01Rc5AsKVnhHiiDQzT6H9jNi "RV PASS|FAIL rank-palette-b24 <sha> — <one line>". On FAIL list exact fixes. Never push main, never send LAND READY, no PR. If C-AG #24 tells you LIVE moved: merge the newest LIVE into review/rank-palette-b24 (final-merge), re-run build + quick test, report the new sha.

ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
