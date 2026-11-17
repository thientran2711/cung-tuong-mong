PRIORITY #1 CHECK ('feelings-18'): OD 0 | ledger 0 | claims 8 | main 0 | review/* 1 (review/feelings-18 = this job; OD rulings are under 'Sims'/'cảm xúc' 18:55Z–20:45Z 17/11)

# BIG REVIEW — FEELINGS-18 r1 (opus)
Foreman: C-AG #6 session_01UV1SzjqdQPh2K9YUVK9VhU (report verdict there by send_message). Main = s37 session_01UV1SzhwVaGKCGi5xcnzLQe.
Read first (in full): dev/rules/START_CORE.md + START_WORKER.md + START_REVIEWER.md (handover branch claude/cung-tuong-mong-handover-hj0h8w), then dev/OWNER_DECISIONS.md lines from '(17/11 ~18:33Z' to the end VERBATIM, briefs/feelings-18.md, reports/feelings-18.md (§"#2 WORK").
Target: review/feelings-18 head dec84f17 (site build ffd28a5c). Base = review/mood-mem-r2 1b4f4967 (under its own review by session_01UV1SzhYFatoThxPEGCiErj — do NOT re-review that delta). Review range 1b4f4967..dec84f17. Your fixes go on review/feelings-18-r1 (never main; no PR).
Disk: sparse worktree under /home/user/wt, fetch --depth=30 under flock /home/user/wt/fetch.lock, never full-clone.

CHECK (owner rulings, verbatim in OD):
1. 18 feelings × 3 levels (OD ~19:10Z set); muu out of feelings; old saves muu→binh, dau→buon heavy. Chạnh lòng = one VANPHONG constant (OD 18:38Z).
2. MOOD BAR = signed sum of active causes; acts need BOTH heavy level AND bar threshold (OD 18:33Z (1), 19:25Z). All numbers in BAL (one core, OD:L1267); no typed numbers in text.
3. OD 20:45Z: 17 acts, one per feeling (Bình thản none), list exactly as OD 20:45Z; each own act face key; khắc timer + cooldown per kind in BAL; NPC parity.
4. OD 20:15Z/20:20Z: intent NEVER on seal or tap card; seal = active act > strongest feeling. Intent only via scouting/evidence.
5. OD 20:25Z/20:35Z: seal shown for everyone known (kitIsKnown); Người lạ = existing silhouette + "Người lạ", NO makeup/marks/seal, no grey "?". Causes still need scouting.
6. LUẬT SỬA CẢ NHÓM: worker claims old-key family scan 67→50 sites with no unconverted reads — re-run the scan yourself, list every remaining site.
7. Worker-found bug: jfeel acts called jemoact closure-only helpers → now window.EA_H. Verify every act actually changes state (test one act per feeling).
8. KIT FIRST: no custom chip/row/frame; seal/card via kit-figure-mood API (main's kit worker session_01UV1Szm15TBGXbyca7ucqMq). Wording per VANPHONG (cổ trang, no %, odds ladder).
9. Act frequency: 17.5 per 100 tuần palace-wide (old 7.5) — judge if this floods the player; recommend a BAL value if so (fix in BAL, not code).
10. Tests: feelings18, ag-moodknow, moodknow-step0, mood-mem, one-core-guard, emotion-acts(-2), coop-one-world ×2, QUICKCHECK. Known pre-existing on base: emotion-acts-2 hoitimid, G1 one-core-bind j25.js:11 + j78.js:127 — confirm same on base, not new.
11. Devices: Fold 755x1000 @2 + iPad 1180x820 @2 shots of the tap card + seal for a known person and a Người lạ.

Verdict: PASS sha (FF-able on its base) or FAIL list → write dev/handover/reports/review-feelings-18-r1.md (handover branch) + send_message to C-AG #6. Landing order: ag-all-2 → MOODKNOW → mood-mem-r2 → feelings-18 (rebase on whatever is live then).
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
