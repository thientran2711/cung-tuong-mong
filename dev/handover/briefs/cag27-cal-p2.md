# BRIEF cag27-cal-p2 — PLAYER-2 CALIBRATION PROFILE (opus worker, BIG)
PRIORITY #1 CHECK: OD 3 (L1994 first-try rule, L1995, L1996 player-2 order) | main dev/build/jmgcal.js:12-14 (BAL.ag.mg2.cal.k = ONE profile, "SAME for every player"), dev/tools/mgcal_apply.py, dev/test/mgcal-apply.test.sh — no cal.k2/profile-2 anywhere | review/* mg-fair-hands (HOLD, same family, do NOT merge it in), mgcal-co/mgcal-dan (landed) | claims none for player-2 profile.

Foreman: C-AG #27 session_01Rc5AsMZyX6xYaDzLF6VnCT (report to it by send_message). Order from MAIN ROOT-73 04:44Z.
Branch: review/cal-p2 from newest origin/main (LIVE a1aa8b19 at brief time). Lands ALONE (not with mg-fair-hands).

## READ FIRST (in full)
- dev/rules/START_CORE.md (the 18 LAWS block first) + dev/rules/START_WORKER.md — handover branch claude/cung-tuong-mong-handover-hj0h8w.
- dev/OWNER_DECISIONS.md lines 1990–1999 (handover branch) — her words verbatim.
- On main: dev/build/jmgcal.js (whole header), BAL.ag.mg2 in dev/build/jbal2.js, dev/tools/mgcal_apply.py, dev/test/mgcal-apply.test.sh, dev/MINIGAMES.md calibration part; how co-op knows "player 2" (j*coop*, the hảo hữu / guest side).

## OWNER WORDS (verbatim)
1. (20/11 ~04:30Z) "Thơ lần 2 kết quả là của kingston, nên không tính lần 2, bất kì lần 2 nào của game đều khôbg tính. Chỉ tính kết quả lần 1."
2. (20/11 ~05:00Z) "Actually á, là bây giờ hãy lấy cái số liệu của lần thứ hai thành cái số liệu của người chơi thứ hai, bởi vì cái lần thứ hai chơi đó là Kingston chơi 7 years old kid play, so lấy cái số liệu đó làm cái số liệu thứ hai cho game luôn, giống như là của hai người chơi vậy đó."
Data (all 5 rounds, 11/19/2026): tho 7.1, theu 9.9, ban 9.3, dauho 1.7 = profile 2 (player 2). Never mixed into her profile (first-try rule stands for hers).

## BUILD
(a) BAL: a second calibration profile beside BAL.ag.mg2.cal.k (e.g. BAL.ag.mg2.cal.k2 = {kind:{b,n,at}}) with the 4 kinds above (n=5, at 11/19/2026). Law 4: one core — every reader takes numbers from BAL, no copy.
(b) dev/tools/mgcal_apply.py: a player-2 mode (e.g. --p2 / "p2" in the code) writing to k2, same first-try rule per profile (a kind already in that profile is kept). Extend dev/test/mgcal-apply.test.sh for both profiles.
(c) Game: one helper that returns the right profile for a player (her / solo → k, unchanged; player 2 in co-op hảo hữu → k2, falling back to k for kinds k2 lacks). Use it where NPC hands are rolled around a player's level in HIS own play (law 1 two-way: what holds for her holds for him). Solo play must give byte-identical results to today (prove with a test). Co-op: both devices must roll the same hands (deterministic, from BAL, never from a device-local record — jmgcal.js:14 rule stays).
(d) If the exact co-op use is unclear, implement the read path + helper, and write in your report a short PROPOSAL of the exact use (which screens/rolls use k2) for MAIN to confirm with the owner. Do not invent new features (law 18 freeze).
(e) Update the jmgcal.js header + MINIGAMES.md calibration part (canon overwrite, law 14: replace the "SAME for every player" line in place).

## TESTS before SẴN SÀNG
python3 dev/build/assemble.py + dev/site/build_site.sh; dev/test/mgcal-apply.test.sh; ag-mgcal, mgcal-apply, ag-mgh, ag-mg2, mg-skip, slap-mg, coop tests touching mg; quickcheck. Note pre-existing FAILs on main (ag-mg2 summons, slap-mg 'marks') — show they fail the same on main, not caused by you.

## RULES
- Push only to review/cal-p2; never main; no PR. Commit messages English, with the attribution lines your system gives.
- Report: dev/handover/reports/cal-p2.md on the handover branch (sparse worktree, fetch with '+' refspec under flock /home/user/wt/fetch.lock, --depth=30; never full-clone; never rebase — reset + re-apply by script on reject).
- When done: send_message C-AG #27 "SẴN SÀNG cal-p2 <sha>" + test table. Do NOT send LAND READY (only reviewer PASS → foreman).
- Rollover: at START_CTX % + 25 % of the window (ceiling 60 %) write your handover in the report and tell C-AG #27; the coordinator opens the successor.
- Player-visible words (if any) per dev/kit/VANPHONG.md (cổ trang, no %).
