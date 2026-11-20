# BRIEF cag27-cal-p2 — CHILD-ANCHOR CHECK PER KIND (opus worker; analysis + proposal, BIG)
PRIORITY #1 CHECK: OD 3 (L1994 first-try rule, L1995, L1996 incl. owner canon overwrite ~05:35Z "Kingston = child reference, NOT player 2") | main dev/build/jmgcal.js:12-14 (BAL.ag.mg2.cal.k = her ONE profile, "SAME for every player" — stays), dev/tools/mgcal_apply.py, BAL.ag.mg2 in jbal2.js | review/* mg-fair-hands (HOLD, same family, do NOT merge it in) | claims: this worker only.

Foreman: C-AG #27 session_01Rc5AsMZyX6xYaDzLF6VnCT. Order from MAIN (ROOT-73 relay 05:00Z; MAIN is now ROOT-74 session_01Rc5AsLW7a12BUC5kZhtsTy).
CANON OVERWRITE (owner 20/11 ~05:35Z): the old player-2 profile job is CANCELLED. NO BAL cal.k2, NO mgcal_apply p2 mode, NO co-op read path. If you already built any of it, drop it (do not push it; if pushed, revert it on review/cal-p2).

## READ FIRST (in full)
- dev/rules/START_CORE.md (the 18 LAWS block first) + dev/rules/START_WORKER.md — handover branch claude/cung-tuong-mong-handover-hj0h8w.
- dev/OWNER_DECISIONS.md lines 1990–1999 (handover branch) — her words verbatim.
- On main: dev/build/jmgcal.js (whole), BAL.ag.mg2 (cal.k, hand bands, engine/difficulty knobs, lev/kAdj) in dev/build/jbal2.js + jbal.js, dev/MINIGAMES.md, dev/PROGRESS_mg-balance.md, dev/measure/mg-bots.js, each engine of the 7 kinds below.

## OWNER WORDS (verbatim, 20/11 ~05:35Z)
"Không, cái số liệu của Kingston nó không có tính là số liệu của người chơi thứ hai. Người chơi thứ hai là bạn tôi là khác. Ý của tôi là cái số liệu của Kingston giống như là một cái số liệu tham khảo thêm cho cái tay người chơi là tôi vậy đó, hiểu không? Tức là bạn cứ so đi, Kingston 7 tuổi đó, tôi 35 tuổi thì như thế nào mình tính ra, hiểu không? Coi thử ví dụ như một cái game đó mà tôi được 10 trên 10 đi, nhưng mà Kingston cũng 10 trên 10, có nghĩa là sao? Nó cũng đã quá dễ với một đứa trẻ 7 tuổi chẳng hạn."
Earlier rule stands (verbatim 20/11 ~04:30Z): "… bất kì lần 2 nào của game đều khôbg tính. Chỉ tính kết quả lần 1." (her profile = first tries only).

## DATA (her first try / Kingston 7 y/o, all 5 rounds, 11/19/2026)
tho 8.7/7.1 · theu 9.7/9.9 · ban 9.1/9.3 · dauho 1.1/1.7 · tat 4.9/6.1 · ne 4.1/2.1 · mua 6.3/4.9

## OWNER WORDS (verbatim, 20/11 ~05:45Z) — canon overwrite of the method
"Còn cái vấn đề mà chỉnh độ khó đó, bây giờ vậy nè, thật ra mà nói giữa một đứa bé 7 tuổi và một người 35 tuổi cũng khó mà nói được người đó chơi game giỏi hay là như thế nào lắm. Bởi vì con nít ngày nay á, tụi nó chơi game rất là hay, hiểu không? Còn tôi, thứ nhất tôi lớn tuổi hơn, cái phản xạ của tôi chậm hơn chẳng hạn. Mình cần phải có một cái sự khách quan, chứ không phải là cứ nhỏ tuổi hơn mà làm bằng tôi thì có nghĩa là cái game đó quá dễ, cũng không phải vậy. Phải phân tích cho nó rõ và cho nó kỹ."
→ NO simple "child ≈ adult ⇒ too easy". OBJECTIVE analysis per kind.

## JOB (per kind, in this order)
(1) SKILL TYPE the kind really tests, from its engine code: reflex/timing, fine hand control, pattern/memory, strategy/knowledge, patience (one or a mix, with weights).
(2) REAL-WORLD EVIDENCE (law 8, expert/research FIRST): how a 7-year-old of today (plays games a lot) vs a 35-year-old adult perform in that skill type — reaction time, motor control, working memory, strategy, patience; cite sources (WebSearch extended allowed). Write this section before any verdict.
(3) NOISE of one 5-round try for each of them (score spread from the engine / bot sim with dev/measure/mg-bots.js): how far apart must two scores be to mean anything.
(4) Only then VERDICT per kind (too easy / fair / too hard / broken) with the reasons written out, + her REAL level per kind (what BAL.ag.mg2.cal.k should hold), + any BAL knob change proposed (before/after, bot-checked; law 4 one core, law 5 harder as she climbs).
Đầu hồ (dauho): ROOT-74 runs a separate fast-lane fix for "unplayable". Do NOT propose or touch aim knobs of dauho without coordinating through C-AG #27 → ROOT-74; analyse it, mark the overlap.
Write it all to dev/handover/reports/cal-p2.md (handover branch). PROPOSAL ONLY: nothing lands without the owner's OK (via MAIN ROOT-74). Draft BAL changes may sit on review/cal-p2 only if asked later. No new features (law 18).

## RULES
- Push only to review/cal-p2; never main; no PR. Commit messages English, with the attribution lines your system gives.
- Handover branch: sparse worktree, fetch with '+' refspec under flock /home/user/wt/fetch.lock, --depth=30; never full-clone; never rebase — reset + re-apply by script on reject.
- When done: send_message C-AG #27 "SẴN SÀNG cal-p2 <report sha>" + the per-kind table. Do NOT send LAND READY.
- Rollover: at START_CTX % + 25 % of the window (ceiling 60 %) write your handover in the report and tell C-AG #27; the coordinator opens the successor.
