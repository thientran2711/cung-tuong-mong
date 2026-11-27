# BRIEF E-GAIN3c-RV — BIG review of review/e-gain3c 8b6eadb9 (Foreman E child3, 27/11 10:55Z)
PRIORITY #1 CHECK: OD 26/11 ~05:55Z (law 3 gain-and-loss) + OD 27/11 ~08:10Z (flauntDanh reuse, coldRisk) | main 0562e15f (LIVE; no e-gain3* yet) | review/e-gain3 23b44074, review/e-gain3b 76821d10 (under re-review by E-GAIN3b-RV session_01DgYSWoM9Gu8eQ8DXikZPXT), review/act-move-law3 (jtwoway, RV-163H §3) | claims E-GAIN3c session_01DgYSWo8fBsPXh742eESkZB (done).
ROLE: REVIEWER, opus (BIG: rules/numbers BAL). Read FIRST on branch claude/cung-tuong-mong-handover-hj0h8w: dev/rules/START_CORE.md (★ 18 LAWS, all binding — FAIL any break) + START_WORKER.md + START_REVIEWER.md; then dev/handover/reports/e-gain3c.md, dev/handover/reports/e-gain3b.md (incl. «## FIX»), dev/handover/reviews/e-gain3b-review.md (earlier FAILs — do not re-approve what that review FAILed unless fixed).
SCOPE: the diff 76821d10..8b6eadb9 on review/e-gain3c (its own work + the jdoor merge of doorHint with DOOR.rowHint). Check:
1. «Phạt vô cớ» = răn đe: BAL.ag.bt.dread (w8/d15) in btTerms «sợ chủ» + j29 fallback; her judgeServ + NPC servDo phat (law 1 two-way); law 2 tiers table; law 3 no cost-only; measured bribe odds 23→8→23 — rerun it, is the new number sane (law 4 from BAL, law 5)?
2. Rỉ tai only when the teller has a foe (her + NPC req) — law 1 symmetry.
3. Tặng quà hub row «nàng quý ngươi +giftVal (món quý nhất)», empty chest locked — law 6c objects real, law 7 no digits/% in player text (check: is «+giftVal» printed as a number? VANPHONG).
4. 15 typed ACT deltas → BAL: parity vs main 64 same / 0 diff — rerun; act-literal-scan 0.
5. 6 LACK reasons (trinhth, trinhhh, uyhiep, banphe, tieuhuy, blockf) true to the real req.
6. doorHint merge: both door paths, no false «Được» (door-row-hint 0 bad, MUTANT=1 exit 1), door-loss new test (MUTANT=1/2 exit 1).
7. Kit (law 9): KIT REQUEST #6–#8 filed in dev/kit/KIT_REQUESTS.md, no private parts.
8. Rerun: gain-empty FULL Fold 755x1000 + iPad 1180x820 (0 empty, 0 page errors), act-audit cao errs 0, old save 16/16, quickcheck; look at Fold+iPad shots of the door dialog + Phạt vô cớ card + Tặng quà hub.
9. Test merge 8b6eadb9 onto LIVE main 0562e15f: conflicts? tests still green on the merge?
VERDICT: PASS / FAIL with numbered items → dev/handover/reviews/e-gain3c-review.md on the handover branch; send_message the verdict to Foreman E session_01DgYSWn1AhiLBvHqmVLmY3B. Do not push code to main; no PR. Fixes are not yours (report only).
DISK: sparse worktrees under /home/user/wt, fetch --depth=30 under flock /home/user/wt/fetch.lock, never full-clone.
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
