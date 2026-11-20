PRIORITY #1 CHECK ('invite'): OD 7 (OWNER_DECISIONS.md L1976 = the rule) | ledger 1 | claims 8 (invite-host-away ORDERED 19/11 22:00Z, never opened until D #9) | main 15 (j21.js:56-67, jptime.js:168-172 ptReg("invite"), jrcv.js:250 rcvInviteGo, jagacts3.js:228 cx3:invite2, jbal2.js:1369/1383) | review/* 0 | archive 0

# INVITE-HOST-AWAY (opus, OWNER BUG fast lane; whole job, one worker start to finish)
Foreman = FOREMAN D #9 session_01964izESYCbbRTQ3P4Xy9Qp (report to it; it may roll over — then the newest PICKUP line at the end of dev/handover/FOREMAN_D_STATUS.md names your foreman).
Repo thientran2711/cung-tuong-mong. Branch: review/invite-host-away from LIVE origin/main (70bea3d3 at 20/11 07:20Z; take the CURRENT origin/main).

READ FIRST, IN FULL (branch claude/cung-tuong-mong-handover-hj0h8w): dev/rules/START_CORE.md (the 18 LAWS block at the top) + dev/rules/START_WORKER.md; then ONLY the topic files you touch (time/buổi/khắc, two-way, real-world). The owner's rule is OWNER_DECISIONS.md line 1976 (19/11 ~22:00Z) — read it VERBATIM; it binds over anything in this brief. Disk: sparse worktree under /home/user/wt, fetch --depth=30 under flock /home/user/wt/fetch.lock, never full-clone.

TODAY: ptReg("invite") (jptime.js ~168) sets the guest to her palace for the rest of the buổi with no reaction when she is away.
BUILD:
1. Guest arrives at the HOST's place on the due khắc; host absent → guest WAITS; never leaves in the arrival khắc.
2. From the NEXT khắc: one stay/leave decision per khắc while the host is still away (odds from BAL by liking / patience / rank — new BAL knobs, no number in code, law 4; any shown odds in ladder words, law 7). Decision is taken AT that khắc: host arriving the same khắc as a «leave» decision does NOT meet her; stays → normal visit.
3. Leave → small relation loss (BAL) + one notice through window.kitNotice (the one notice system; no private toast) «<name> sang chơi không gặp, đã ra về» + the guest's roster rows show the real walk back (law 6).
4. TWO-WAY (law 1): NPC host away when SHE comes (cx3:invite2 / rcvAsk invite path / p3 NPC invites) and NPC↔NPC — same rule.
5. Host back in time → visit as today.
6. WHOLE FAMILY (law 11): every «X comes to Y's place at a due khắc» landing in jptime (summon thái y / họa sư, giftin, npcinv, …): scan which can arrive at an empty place; apply the same wait rule or list why not. Scan script + before/after table in your report.
TESTS: bot scenario invite@k1 → walk away k2 → back k4 (stay / leave, seeded both); NPC-host-away two-way case; co-op guard (host-only roll, both clients same result); one-core; role-parity; dev/tools quickcheck. Run node dev/tools/tier.js (expect BIG).
KIT FIRST: only kit parts; missing part → STOP, KIT REQUEST in your report.
REPORT: PROGRESS on the branch + dev/handover/reports/invite-host-away.md on the handover branch (pull --rebase, push; append-only). When done: final-merge CURRENT origin/main, rebuild site, gates green → line «SẴN SÀNG KIỂM <full sha>» in the report AND at the end of dev/handover/FOREMAN_D_STATUS.md, then send_message your foreman. Never push main, no pull requests. Roll over at START_CTX + 25 % (ceiling 60 %): handover in your report, tell your foreman (the foreman opens the successor).
