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
