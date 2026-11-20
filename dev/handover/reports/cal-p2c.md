# CAL-P2C — identity offset + rolling hand b (CAL-P2C #1, session_01964izF6sJHzxcBve2mGhvJ, opus lead, for FOREMAN D #9)
PRIORITY #1 CHECK: OD L2045 (~07:35Z, CANON OVERWRITE) + L2046 (~07:55Z) + L2047 (~08:00Z), L2043 (~07:15Z sở trường + sở đoản per identity) | main: cal.k jbal2 / jmgcal (her ONE profile), mgTier jmgt (bậc board ease), no rolling b, no identity offset, no sở đoản table anywhere (git grep main + review/*: none) | review/mg-fair-ratio-rv (BAL.orig.art, bell curve) = my base; review/cal-p2 report §A2 = the only sở đoản list (analyst, script-checked) → reused as BAL.orig.doan | claims: C-AG #29 PART 2 moved to D by MAIN ROOT-75 07:25Z; this worker only.

## STATUS (20/11 ~08:20Z)
PROGRESS — built + tested on review/cal-p2c (on top of review/mg-fair-ratio-rv c214ead, which carries LIVE 377d5ce3). NOT yet «SẴN SÀNG KIỂM»: the brief requires
the final-merge onto CURRENT origin/main AFTER mg-fair-ratio lands in LIVE (it has not yet: LIVE = 377d5ce3). When it lands: merge origin/main, rebuild, rerun the gates
below → SẴN SÀNG KIỂM. Branch head now: see last line.

## WHAT IS BUILT (all numbers BAL knobs, law 4)
- dev/build/jmgid.js (new, assembled after jmgcal): mgIdClass / mgIdB / mgIdOff / mgIdRes / mgIdShift / mgIdRow.
- BAL.orig.id (jbal2): tgt {tr 9, "" 7.5, doan 6}, trAt 1, prior 7.5, pw 3, a .2, age 1, seedW 1, noSeed [dauho, td_dung, chai, den, hoadien], gap 0, npc 1, lo 0, hi 10.
- BAL.orig.doan (jbal.js, beside BAL.orig.art): 1–2 sở đoản per identity (origin, road overrides) = the cal-p2 §A2 list; test checks it never names an art of the road's own row (50 rows).
- CLASS per kind: sở trường = any stat of the kind (kg82FormulaOf; td_<k> = virtue k — the same map as mgOrgLv) in her identity row of BAL.orig.art (bậc ≥ trAt); sở đoản = in BAL.orig.doan; else bình thường. Player: S.origin.k × S.st.f14.road; NPC: mgOrgOf × v.nr.r. Servants / unknown = bình thường.
- (1) ROLLING b per player per kind: S.mgB[kind] = {s, w, n} (in the save; personal key in co-op — not in jcoopworld W_KEYS). b = s/w. Start = prior 7.5 worth pw 3 plays; on the
  owner device (jmgcal owner flag) the first use also adds her Thử tay cal.k b worth seedW × n rounds (5) → e.g. Cờ 9.7 → b 8.875. Every real play (kg82Play end = every
  KG82_ENG engine, and kg82Lesson) adds x = graded − (mgMedD(d) − mgMedD(0)) (her play brought back to a matching board, same shift as mgCalBase), newest weight 1, older × (1 − a).
  Thử tay (kg82Play(..,{raw:1})) and the guided tutorial (own env) stay raw and learn nothing. Old saves: no S.mgB → created lazily.
- (2) OFFSET = tgt[class] − b (+ gap·(b − prior), gap 0) added to the graded result, clamp 0–10, rounded; computed from b BEFORE this play joins it. Study bậc keeps its mgTier board ease (on top).
  Shown on the result: kg82ShowRes puts ONE kit row (kg82Rows) on top: «Sở trường / Sở đoản / Thân phận» · «thân phận này vốn giỏi môn ấy · tay quen Khá · 5/10 → 8/10» (only when the result moved).
  KIT REQUEST filed (dev/kit/KIT_REQUESTS.md, this branch): an optional dedicated seal chip; nothing private drawn meanwhile.
- (3) LAW 1: NPC plays (jmgt mgNpcRaw) move by the same class shift tgt[class] − tgt[""] (+1.5 / 0 / −1.5); their bell hand (mg-fair-ratio) unchanged. Her own normalisation by b
  is the player-side half (NPCs' "hand" is their bell draw, so flattening them to the target would erase the curve the owner kept). Her skip «Để tài nghệ quyết định»
  (mgSkipRaw; j82 + jexam) and her odds roll (mgNpcRaw on S, j71 words) = median on her board + her class shift → equal to her expected play (law 2: a sở đoản never gains by skipping).
  Co-op: each seat's S is its own → each player by HER OWN b and identity.
- (4) gap knob = 0 (owner answer pending; nothing built on it).
- mgTier results now carry `kind` (so a result is normalised only with its own board's gap; a stale KG82.tier of another kind → d 0).

## DESIGN CALLS FOR THE REVIEWER / FOREMAN (flag, not owner questions)
1. Prior ages with the plays (age 1): the literal b = (3·7.5 + Σw·x)/(3 + Σw) with exponential weights caps Σw at 1/a = 5, so the prior would keep 3/8 of b FOREVER and a weak
   hand 5 played as sở trường would land ≈ 8 not 9 (owner's own example: b 5 → +4 → 9). With age 1 the prior (and seed) are the oldest plays: they rule the first plays
   and fade (after 10 plays b ≈ recent play). age 0 = the literal fixed prior (one knob).
2. Seed = cal.k b worth 5 plays (seedW 1 × 5 rounds); noSeed = the 5 kinds she played on broken boards (OD: NOT COUNTED). cal.k.dauho already left BAL in LIVE 377d5ce3.
3. sở đoản list = cal-p2 §A2 analyst list (OD 07:15Z asked for 1–2 per identity; no other list exists). Data, one table, BAL.
4. COORDINATION (C-AG mg-score-same, NOT touched): its live «n/10» board chip shows the graded mark; the result adds the identity offset → the identity row explains the gap.
   If MAIN wants the live chip to include the offset, mg-score-same reads mgIdOff(kind,S) once at the start (one line) — after both land.

## TESTS (index.html of this branch)
- NEW dev/test/cal-p2c.js: ALL PASS (12) — BAL knobs + doan never overlaps (50 rows) · classes · prior / seed / noSeed · owner examples (b 9 → 0/−1.5/−3, b 5 → +4/+2.5/+1) ·
  result + learning on a harder board · 40 plays at 4 → b 4, sở trường → 9 · raw path untouched · a REAL kg82Play (playArt) shows the kit row, S.mgB saved, Thử tay learns nothing ·
  skip / NPC class shift (+1.49 / −1.46 / 0.01) · OLD SAVE from the LIVE build (origin/main) and this build: loads, plays 3 buổi, gets a store; ser→deser keeps it · CO-OP:
  S.mgB personal, two players → their own offsets · no page errors.
- ag-mgcal 14 ok · ag-mgh 0 FAIL · mg-fair-hands ok · origin-arts ok · cal-dauho ok (vs pre-fix base 70bea3d3; vs origin/main its step 3 compares the landed fix with itself) ·
  steal-mg-unit PASS · ag-mg2 = base (the same 3 pre-existing FAILs on the base build 950f7272: summons ×2, exam — not mine).
  ag-mgh step 6 / ag-mg2 core curve: they measure the BARE curve → they switch BAL.orig.id.npc off inside the test (identity shift covered by cal-p2c.js).
- quickcheck PASS (core gates incl. one-core PASS, old save from LIVE ok, perf ≈ live). tier.js = BIG (expected).
- role-parity: 2 FAIL (new gaps up:cx3:tell, up:harm:accuse/banphe/uyhiep + promoted-maid act set) — IDENTICAL on the base build review/mg-fair-ratio-rv c214ead → pre-existing, not from this branch (no act code touched).

## BOT TABLE (dev/measure/cal-p2c.js, 1500 contests per cell, her play = her hand + N(0, 1.2) graded, 5 NPCs of random identities on the real mgNpcRaw, matching board)
Columns: her first-try hand · b seeded on her device · offsets trường/thường/đoản at the seed · b after 10 plays · offsets then · P1st / Ptop3 (out of 6) / mean result per class.
| kind | her hand | b seed | off tr/bt/dn @seed | b@10 | off tr/bt/dn @10 | sở trường P1st/Ptop3/mean | bình thường | sở đoản |
|---|---|---|---|---|---|---|---|---|
| dan | 8.3 | 8 | 1/-0.5/-2 | 8.3 | 0.7/-0.8/-2.3 | 41/85/9.1 | 9/42/7.3 | 2/20/6.3 |
| co | 9.7 | 8.9 | 0.1/-1.4/-2.9 | 9.4 | -0.4/-1.9/-3.4 | 44/87/9.4 | 4/38/7.4 | 1/14/6.4 |
| ve | 9.5 | 8.8 | 0.3/-1.2/-2.7 | 8.7 | 0.3/-1.2/-2.7 | 54/91/9.3 | 24/72/8.3 | 1/18/6.2 |
| doi | 9.1 | 8.5 | 0.5/-1/-2.5 | 9.2 | -0.2/-1.7/-3.2 | 30/75/9 | 2/25/6.9 | 1/9/5.9 |
| hoa | 7.9 | 7.8 | 1.3/-0.2/-1.7 | 7.6 | 1.4/-0.1/-1.6 | 36/82/8.7 | 23/63/7.9 | 2/15/5.9 |
| hat | 8.1 | 7.9 | 1.1/-0.4/-1.9 | 7.9 | 1.1/-0.4/-1.9 | 28/73/9 | 14/49/8.1 | 1/11/6.1 |
| tho | 8.7 | 8.3 | 0.8/-0.7/-2.2 | 8.5 | 0.5/-1/-2.5 | 46/88/9.3 | 9/46/7.6 | 2/23/6.6 |
| theu | 9.7 | 8.9 | 0.1/-1.4/-2.9 | 9.7 | -0.7/-2.2/-3.7 | 20/72/8.3 | 7/45/7.3 | 0/6/5.4 |
| ban | 9.1 | 8.5 | 0.5/-1/-2.5 | 8.4 | 0.6/-0.9/-2.4 | 57/95/9.6 | 18/69/8 | 6/45/7 |
| kim | 7.7 | 7.6 | 1.4/-0.1/-1.6 | 7.8 | 1.2/-0.3/-1.8 | 29/74/8.6 | 14/53/7.6 | 1/14/5.7 |
| doden | 9.9 | 9 | 0/-1.5/-3 | 9.3 | -0.3/-1.8/-3.3 | 47/90/9.5 | 5/43/7.5 | 1/16/6.5 |
| tat | 4.9 | 5.9 | 3.1/1.6/0.1 | 5.3 | 3.7/2.2/0.7 | 34/83/8.8 | 9/42/6.9 | 3/22/5.9 |
| ne | 4.1 | 5.4 | 3.6/2.1/0.6 | 4.1 | 4.9/3.4/1.9 | 36/85/9 | 11/47/7.1 | 4/27/6.1 |
| mua | 6.3 | 6.8 | 2.3/0.8/-0.7 | 6.6 | 2.4/0.9/-0.6 | 23/73/8.2 | 13/54/7.4 | 1/14/5.3 |
| banh | 6.1 | 6.6 | 2.4/0.9/-0.6 | 6 | 3/1.5/0 | 35/80/9 | 17/59/8 | 2/16/6.1 |
| huong | 4.5 | 5.6 | 3.4/1.9/0.4 | 3.8 | 5.2/3.7/2.2 | 45/86/9.2 | 25/68/8.4 | 4/21/6.5 |
| td_cong | 10 | 9.1 | -0.1/-1.6/-3.1 | 9.5 | -0.5/-2/-3.5 | 61/94/9.5 | 9/49/7.5 | 1/17/6.5 |
| td_ngon | 6.7 | 7 | 2/0.5/-1 | 6.8 | 2.2/0.7/-0.8 | 20/59/8.6 | 7/33/7.7 | 0/5/5.7 |
| td_hanh | 9.3 | 8.6 | 0.4/-1.1/-2.6 | 8.6 | 0.4/-1.1/-2.6 | 42/84/9.1 | 16/62/8.1 | 0/9/6.1 |
| le | 9.9 | 9 | 0/-1.5/-3 | 9.3 | -0.3/-1.8/-3.3 | 70/95/9.4 | 13/59/7.5 | 2/27/6.5 |
| tc | 9.5 | 8.8 | 0.3/-1.2/-2.7 | 9.1 | -0.1/-1.6/-3.1 | 64/93/9.2 | 12/52/7.3 | 2/19/6.2 |
| xa | 9.5 | 8.8 | 0.3/-1.2/-2.7 | 9 | 0/-1.5/-3 | 64/93/9.3 | 34/78/8.2 | 2/20/6.2 |
| thq | 8.5 | 8.1 | 0.9/-0.6/-2.1 | 9.2 | -0.2/-1.7/-3.2 | 43/81/8.5 | 5/28/6.4 | 1/10/5.5 |
| duho | 7.9 | 7.8 | 1.3/-0.2/-1.7 | 8.3 | 0.7/-0.8/-2.3 | 44/83/8.8 | 8/39/6.9 | 2/17/5.9 |
| kinh | 9.9 | 9 | 0/-1.5/-3 | 9.7 | -0.7/-2.2/-3.7 | 18/70/8.5 | 5/42/7.5 | 0/4/5.5 |
| may | 10 | 9.1 | -0.1/-1.6/-3.1 | 9.5 | -0.5/-2/-3.5 | 22/78/8.6 | 8/50/7.5 | 0/5/5.5 |

* = noSeed (first try on a broken board: b starts at the prior 7.5)

| plays | b (weak hand 5, tat) | mean result as sở trường |
|---|---|---|
| 0 | 5.9 | 8.1 |
| 1 | 5.5 | 8.5 |
| 3 | 5.3 | 8.7 |
| 5 | 5.4 | 8.6 |
| 10 | 4.5 | 9.5 |
| 20 | 4.6 | 9.4 |

Reading: each class lands on its target whatever her hand (mean ≈ 9 / 7.5 / 6): her weak reflex kinds (tat 4.9, ne 4.1, huong 4.5) as sở trường win 1 in 5–3 and reach top 3
2 in 3–4; her cap-hitters (co, le, may, td_cong) as sở đoản fall to ≈6 and rarely top 3. Every life plays differently; nobody's real hand decides who wins (OD ~08:00Z).
The C table shows a weak hand played as sở trường: her mean result 8.1 → ≈8.5–8.8 as her b settles (noise of single plays keeps it a little under 9; tgt.tr is the knob).

## HANDOVER (if a successor takes it)
Worktree /home/user/wt/calp2c (branch review/cal-p2c). Remaining: when mg-fair-ratio is LIVE → `git merge origin/main` (expect index.html / sw.js conflicts: take theirs, rebuild
with dev/site/build_site.sh; jbal2 conflicts only next to BAL.ag.mg2.cal — keep LIVE's cal line + the BAL.orig.id block), rerun cal-p2c.js (with the LIVE index as arg 2),
ag-mgcal, ag-mgh, quickcheck → SẴN SÀNG KIỂM <sha> here + at the end of FOREMAN_D_STATUS.md + send_message FOREMAN D #9.

Branch head: review/cal-p2c f8784c91716f24eb7cb7f98caf9ad8b188439aec (PROGRESS; waits for mg-fair-ratio in LIVE, then final-merge → SẴN SÀNG KIỂM).

## UPDATE (20/11 ~08:55Z) — merged LIVE 30e8714e (mg-score-same 892e5bb0 + fig-label) into review/cal-p2c → d465937b8e02ea617779280072701e143f48324f
- One conflict, j82 kg82Play end: mg-score-same's rule "the board ends on the mark given" kept — the board now ends on the identity-adjusted mark (the mark actually given);
  the identity kit row on the result says why it differs from the live graded mark. mg-score-same-scan.py: 35 cells via the ONE grade, 0 raw, kg82Play ends on the given mark.
- Re-run: cal-p2c.js ALL PASS (12, old save from LIVE 30e8714e) · ag-mgcal ok · ag-mgh ok · quickcheck PASS (core gates PASS, old save ok, perf ≈ live).
- Branch now = review/mg-fair-ratio-rv c214ead + LIVE 30e8714e + cal-p2c. Still waiting only for mg-fair-ratio to land in LIVE (then one more merge of origin/main, rebuild, gates → SẴN SÀNG KIỂM).
