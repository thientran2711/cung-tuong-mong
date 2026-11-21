# law4-typed — report (Foreman D #16 order 21/11 ~14:02Z)

## ROLLOVER HANDOVER (SG-CARD r3 → successor) — 21/11 ~14:05Z · NOT STARTED
PRIORITY #1 CHECK: OD law 4 (OD:L1267) | main jaudit aaDeathTxt / j34 myBetween / j17 AOUT typed literals | review/* none (jemo → BAL is a separate later job, do NOT touch jemo) | claims law4-typed (this successor)
SG-CARD r3 (session_01964izEfJv1yRsyJaCGF1fH, depth 8) received this order at context 35.7 % (START 4 % + 25 % line = 29 %) → rolled over before
starting; nothing written yet, no branch made. The foreman opens the successor.
### Order (verbatim from D #16)
New branch review/law4-typed from newest origin/main (deepen). Fix: (1) jaudit aaDeathTxt typed «Danh -10, Sủng -10» → BAL keys, shown == applied
(her Sủng via sgOf); (2) j34 «vòng Tài nghệ +1,5» vs BAL meGo 1 — find which one is applied, make the text read the BAL key; (3) j17 AOUT ksab/pond/spy
typed numbers → BAL. Extend sg-card-scan's static pass (or a tiny test) so these show 0. Gates: that scan, quickcheck, coop-e2e both seats, LIVE-revert
audit. SSK to me (I open a reviewer). Target ~16:00Z. Write a CLAIMS row + report reports/law4-typed.md. Same rollover rules as before.
### Leads (from SG-CARD r3, verify yourself)
- (1) jaudit.js item 9 aaDeathTxt(): «… giáng một bậc, cấm túc 3 tháng, Danh -10, Sủng -10» = the j8 deathSentence mercy branch, which already reads
  BAL.eff.j8.danhDeathSentence / sungDeathSentence (j8.js:91 result line) → print those keys: Danh ${balSg(…)}, ${sgStat(…)} (hers; sgStat marks it so
  kitParse/sgTxt never rescale). Also «3 tháng» → check BAL key used by deathSentence. Note: jaudit wraps ACT x getters at LOAD → anything you print there
  must not need S (use sgStat — j1 sgNow guard handles no-game; it's on main after sg-card lands, else check).
- (2) j34.js:32 «Luyện tập» x:"vòng Tài nghệ +1,5", go: c.pr.me += BAL.eff.j34.meGo (=1). Find where c.pr.me is read in the round score (maybe ×1.5) — print
  the real added amount from the BAL key(s).
- (3) j17.js AOUT (line ~87–92): spy «Tâm cơ +2», ksab «con nàng Tài -15; Tâm cơ +2» / «bị lộ: Danh -10», pond «bị bắt: Danh -10». Find the A("spy"/"ksab"/"pond")
  apply code in j8.js (A defs ~L112–170) and move each typed number into BAL.eff.j8 (card + apply read the same key; aoLz(()=>…) for lazy reads).
- Core gates catch value collisions: a new BAL key equal to a typed number on a line that references the same module (g1-text) fails → fix every typed
  number on that line too. g1-bind: a printed BAL key must be read by the same option's rule.
- Static pass: dev/test/sg-card-scan.js --static-only (r3) is Sủng-only; for Danh/Tài/Tâm cơ add a small static test listing typed «(Danh|Tài|Tâm cơ) ±N»
  in AOUT + aaDeathTxt + j34 opts, want 0.
- Tooling (r3): serve a built worktree from disk inside Playwright (see serveDir in dev/test/sg-card-scan.js) — never start python http.server (classifier).
  Shots of in-game cards: start() with window.__nlInner=1, remove fixed Luân hồi/nhập cung/Rương đồ overlays, pushDil(PEND[id]({}),…)+showModal();
  event choices hide outcome numbers by design — act/talk cards show them.

## LAW4-TYPED r1 — 21/11 ~15:30Z · depth 8 · START_CTX ~4 % · READY FOR REVIEW
PRIORITY #1 CHECK: OD law 4 (OD:L1267 one core) | main jaudit.js:111 aaDeathTxt, j34.js:14/21/32 (tScore/fScore/myBetween), j17.js:87–92 AOUT spy/ksab/pond, j8.js:91/113/139–146 | review/* review/sg-card e73cdf8f (sgStat/sgOf + scan, not on main → merged in) | claims none (first)
Branch review/law4-typed @ 0dc39acdfbe9d6eae0c771d12f183ed53042df92 = origin/main 8f435841 + merge review/sg-card e73cdf8f (needed: sgStat/sgOf and
dev/test/sg-card-scan.js live only there; conflicts index.html/sw.js rebuilt, j97 stay line = main's kitEndNext + sg-card's sgStat) + 2 commits.
**Land order: review/sg-card first (or land this branch, which carries it).**
### Done (shown == applied, every number from BAL)
1. jaudit aaDeathTxt «Danh -10, Sủng -10, cấm túc 3 tháng» (+ `S.turn<12`) → BAL.eff.j8 danhDeathSentence / sgStat(sungDeathSentence) / new mercyConfine 3 /
   mercyTurn 12 — the same keys j8 deathSentence applies (its `S.turn<12` and confine `3` moved to the keys too). Guarded for no game (getter read at load).
2. j34 «vòng Tài nghệ +1,5»: applied = c.pr.me (meGo 1) × typed 1.5 in tScore → both now BAL: text `+${balDec(meGo×prW)}` (prW 1.5). Whole group of the
   contest line: sabotage cut 2 (tScore ×2, «vòng sau -2», «nàng mất 2 phần») → sabCut; backer +2 (fScore, «Thế lực +2») → backerPt; judge-trait round
   weights ×1,5/×1,5/×0,6 (crW + intro text) → wTrong/wHieu/wDanghi; round-1 card «+ luyện tập N» printed the COUNT, now the points; NPC practice +1 → meGo.
   g1-bind: sabotage now stores the points it cuts (c.cut, reads sabCut) and ctBackerAdd stores the Thế lực it adds (c.bp, reads backerPt) — the rule reads
   the printed key; an old save mid-contest keeps working (legacy c.sab count × sabCut, c.bk names × backerPt when c.bp absent).
3. j17 AOUT spy «Tâm cơ +2», ksab «Tài -15; Tâm cơ +2» / «Danh -10», pond «Danh -10» → BAL.eff.j8 spyTam/ksabTam/ksabFailDanh/pondFailDanh (+ talF for
   Tài); j8 A spy/ksab/pond apply the same keys; ksab/pond Đức costs (card c + ap, typed twice) → ksabCost -3 / pondCost -15 (getters).
   New helper jbal balDec(n) (1.5 → «1,5»).
### Static test (before / after)
dev/test/law4-typed.js (also inside `node dev/test/sg-card-scan.js --static-only` and the full scan; exit 1 when any row): origin/main 34 typed → 0.
(jaudit 4 · j8 deathSentence 2 · j8 A spy/ksab/pond 8 · j17 AOUT 5 · j34 15.)
### Runtime (Fold, built worktree served from disk)
death mercy, Sủng 50: plain shown «Danh -10, Sủng -10» applied −10/−10, confine 3 · nồng nàn shown «Sủng -13» applied −13. AOUT spy «Tâm cơ +2», ksab
«Tài -15; Tâm cơ +2» / «Danh -10, thù -20», pond «Danh -10»; ACT ksab/pond c.duc −3/−15. Practice shown «+1,5»: tScore 3 → 5 (3.2 → 4.7 rounded);
backer shown 2: fScore 0 → 2. 0 page errors.
### Gates on 0dc39acd
- sg-card-scan (disk-served, full): PASS · static law4-typed 0 · raw «Sủng ±» CARD 57 · VALUE 24 · NPC 7 · OK 23 · SG family 0
- core gates PASS (one-core-guard incl. g1-bind 1303 prints / 0 mismatches · rules-one-source · kit-conform · coop-one-world · hooks 7). First run on
  ff7b4144 had g1-bind 4 (j34 sabCut/backerPt printed, applied one call away) → fixed in 0dc39acd.
- quickcheck: run 3 PASS (render 217/258, tab 413/433, buổi 1299/2292) · run 2 FAIL perf noise only (tab 614 vs 446, same code ran 459/461 in run 1).
  Old save from live loads + plays a buổi.
- coop-e2e both seats (host Fold + guest iPad): 94/94 on ff7b4144; on 0dc39acd run 1 93/94 (FAIL «week after rebirth advances»: host pend, live-Worker timing), run 2 94/94
- LIVE-revert audit: branch is main + sg-card; files main changed since sg-card's base ee02e8c0: 43 (overlap j79/j97/jbal/jgift) → 0 main-added lines missing.
### Not done / notes
- j8 pond drown chance roll(45), punish(a,…,2) severities are typed but not printed (odds in words) — not in this order; left for the whole-family pass.
SẴN SÀNG KIỂM 0dc39acdfbe9d6eae0c771d12f183ed53042df92 (review/law4-typed)
