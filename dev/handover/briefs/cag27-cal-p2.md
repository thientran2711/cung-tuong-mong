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

## JOB
(a) Per kind: what the test really measures (engine, rounds, timing, scoring), and a verdict — TOO EASY (child ≈ or > adult), OK spread, TOO HARD / BROKEN (both near 0) — with the reason in the code.
(b) Propose difficulty fixes per kind as BAL knob changes only (law 4 one core; law 5 harder as she climbs stays true). Give before/after numbers, and check with dev/measure/mg-bots.js (or a bot sim) that the fix opens a real child-vs-adult spread.
(c) Propose her CORRECTED real-world level per kind (what BAL.ag.mg2.cal.k should hold once the test is fixed), with the method.
(d) Write it all to dev/handover/reports/cal-p2.md (handover branch). You MAY put the proposed BAL changes on review/cal-p2 as a draft for review, but NOTHING lands without the owner's OK (MAIN asks her).
(e) No new features (law 18). Player-visible words (if any) per dev/kit/VANPHONG.md.

## RULES
- Push only to review/cal-p2; never main; no PR. Commit messages English, with the attribution lines your system gives.
- Handover branch: sparse worktree, fetch with '+' refspec under flock /home/user/wt/fetch.lock, --depth=30; never full-clone; never rebase — reset + re-apply by script on reject.
- When done: send_message C-AG #27 "SẴN SÀNG cal-p2 <report sha>" + the per-kind table. Do NOT send LAND READY.
- Rollover: at START_CTX % + 25 % of the window (ceiling 60 %) write your handover in the report and tell C-AG #27; the coordinator opens the successor.
