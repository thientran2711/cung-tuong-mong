PRIORITY #1 CHECK: OD 20/11 ~06:20Z (ratio ask) / ~06:40Z (bell curve, canon overwrite of thirds) / ~07:15Z (owner OK, build for real) / ~07:20Z (board target: average adult ≈7) | main BAL.ag.mg2.hand in dev/build/jbal2.js, jmgcal.js mgCalBand, jmgt.js mgHand/mgNpcRaw | review/mg-fair-ratio 996b17d0 (from mg-fair-hands PASS 3fe87277 + LIVE eb056f7b) | claims: wk session_01Rc5AsMnKfGBSQk1sEvtKda
# REVIEW mg-fair-ratio (BIG, opus — BAL numbers / contest odds) — Foreman C-AG #29 session_01Rc5AsJ8GMpdM1fyxzYaf1d

## READ FIRST
- Handover branch claude/cung-tuong-mong-handover-hj0h8w: dev/rules/START_CORE.md (★ THE 18 LAWS block first) + START_WORKER.md + START_REVIEWER.md; dev/handover/briefs/cag28-mg-fair-ratio.md (in full, owner words verbatim) + reports/mg-fair-ratio.md + reports/mg-fair-hands.md + reports/rv-mg-fair-hands.md; dev/OWNER_DECISIONS.md lines 2030–end.
- main + branch: dev/build/jbal2.js (BAL.ag.mg2), jmgcal.js, jmgt.js, dev/measure/mg-bots.js, dev/test/mg-fair-hands*, origin-arts.

## TARGET
review/mg-fair-ratio 996b17d0. Claimed: NPC hands ~ Normal(ctr, sd) per kind; BAL.ag.mg2.hand = {w:4, art:.2, ctr:{"":7}, sd:{c:1.4,a:1.5,r:1.7,"":1.5}, eqZ:.43, grp: 31 kinds}; old split/eq/far deleted; upbringing/art lift on top; her b no longer moves NPC hands; hooks for cal-p2 (ctr[kind], sd[group], mgCalGrp, mgCalBand, mgCalShare, mgNpcRaw). Identity modifier (b) NOT built here (it is cal-p2's).

## CHECK (FAIL on any)
1. Law 4 one core: every knob in BAL; no engine/file computes its own spread or centre.
2. Owner model: centre = average adult ≈7 per kind (OD ~07:20Z); equal band ±0.43 SD; better/equal/worse falls out of her place (not fixed thirds anywhere — grep for leftovers of split/eq/far).
3. Law 1 two-way: NPCs get the same rules (upbringing / identity arts) as her; nothing one-sided.
4. Law 5: contests/trials still harder with rank.
5. Law 2/3: no contest becomes a sure loss or sure win for every life; the reported contest table (P1st/Ptop3 per group at L−1..+2) is reproduced by you from mg-bots.js; flag if reflex group at L+2 is unfairly low (21 % P1st) and say whether cal-p2's fitted boards fix it (her b was on unfitted boards).
6. Exam pass: thirds jump (99 %) gone; bell 86.4 % vs main 82.3 % — check BAL.ex.bar is untouched and explain.
7. Old save loads (old split/eq/far keys absent or present must not crash).
8. Tests: assemble + build_site, mg-fair-hands, ag-mgcal, ag-mgh, origin-arts, mgcal-apply, mg-skip, quickcheck. Pre-existing main FAILs (ag-mg2 summons ×2, slap-mg marks) listed separately.
9. Diff scope: git diff origin/main..996b17d0 --stat — only BAL / mg logic / tests / reports; no UI.
NOTE: review/cal-p2 (Đầu hồ, then fitted boards) also edits BAL.ag.mg2 — if LIVE moves, merge carefully, keep both.

## IF PASS
Final-merge NEWEST origin/main (git ls-remote origin main) into review/mg-fair-ratio-rv (from the target), rebuild index.html/sw.js if needed, rerun tests, confirm `git merge-base --is-ancestor origin/main <final>`. Push review/mg-fair-ratio-rv only.

## VERDICT
dev/handover/reports/rv-mg-fair-ratio.md (handover branch; python-script edit; fetch-reset-reapply on reject; never rebase). send_message C-AG #29 session_01Rc5AsJ8GMpdM1fyxzYaf1d "PASS <final sha>" or "FAIL <sha> <n fixes>" (+ list; fixes go to wk MnKfGBSQ). Never push main, no PR. Fetch with '+' refspecs under flock /home/user/wt/fetch.lock, --depth=30; sparse worktrees; never full-clone. Rollover: START_CTX % + 25 % (ceiling 60 %) → handover in the report, tell C-AG #29.
