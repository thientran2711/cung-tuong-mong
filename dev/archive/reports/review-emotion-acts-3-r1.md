# REVIEW — review/emotion-acts-3 @ 99a7eb84 → review/emotion-acts-3-r1 (reviewer, Foreman B)

Verdict: **PASS** — review/emotion-acts-3-r1 @ 2118d1182683f60c413b268d2fc8e1221073dda9 (descends from origin/main 744b80e7).
Spec: OD "16/11 13:08Z", "16/11 13:25Z" (B), "16/11 13:50Z, s17 chat" (3); earlier FAIL list: review-emotion-acts-2-r1.md (2 items).

## Merge
- The branch already held main 08725411. Main moved to 744b80e7 during the review (ONE CORE landed): conflicts only in
  dev/build/assemble.py (main's list + `jemoact.js` last), index.html / sw.js (main's, rebuilt with build_site.sh).

## Small fix made on r1 (ONE CORE, values unchanged)
- jemoact.js still typed two rule formulas outside BAL: the minister's feeling after a court-standing change `20 + |d| × 3`
  (the BAL comment even named it) and a man's "knows her" thresholds `tinh ≥ 10 || af ≥ 5` → `BAL.ea.nk.q.v0 / vK`, `BAL.ea.nk.m.knT / knA`.
- Not changed, note for later: reaction selection weights `w:` (1.5 / 3 / .8 …) in the R_ table and the jemo-wide feeling floor 15 / 5–95 odds clamp
  are typed (same convention as jemo / j8 on main; the guard does not count them). Candidates for the next ONE CORE pass.

## Checks
1. **ONE CORE** — `node dev/test/one-core-guard.js` on the merged r1 (main's guard, no --allow-grow): **PASS, 0 fails**
   (modules 262, inline 6674 ≤ baseline 6691). Before main had the guard, also run with review/one-core-land-r1's guard + jemoact: 0 fails.
2. **CO-OP FIRST** — coop-e2e (assemble.py first): **59/59** on the pre-merge r1 build; **59/59** again on the merged r1 after the main merge.
   S.ea is a personal key; NPC changes host-only (COOPW.seat "a").
3. **KIT FIRST** — no CSS / style / createElement in jemoact.js; only kit classes `past`, `r`; act cards, kit event frame ("Tiếp tục" only),
   kit option cards with the odds ladder. Shots: Đập đồ / Mắng cung nữ / Thái hậu quở trách frames, Hoàng hậu hỏi tội 3 kit options,
   Tuần lục book — same frames as every other event. Consistency OK.
4. **VANPHONG** — no %, odds via the kit ladder (`Chắc chắn ·` prefix stripped by the kit odds chip as everywhere); all 130 NPC line
   kinds read by me (SEEN=1 ALL=1): cổ trang wording, numbers in the book grammar.
5. **Old save** — origin/main 08725411 save → this build: dev/test/oldsave-r1.js **16/16** (755x1000, 1180x820, 1366x1024; no page errors, no overflow).
6. **Shots** (scratch, not in git, deleted): emotion-acts.js (10 cases) + emotion-acts-2.js (9 cases) + emotion-acts-lines.js re-run on the merged r1 at 755x1000@2, 1180x820@2, 844x390: PASS; before the merge at 755x1000@2, 1180x820@2, 1366x1024@2,
   1000x755, 844x390, 390x844 (rotate prompt): **PASS**, 0 page errors, 0 overflow. Looked at: 755 Mắng cung nữ frame, 755 Hoàng hậu hỏi tội,
   755 Tuần lục page 1 (Việc của ta holds only her line "Hoàng thượng sinh lòng nghi kỵ ta, Sủng −3."), 1180 Đập đồ, 1180 Thái hậu quở trách,
   390x844 rotate prompt.

## Earlier FAIL list (review-emotion-acts-2-r1)
1. **Tuần lục lines — FIXED.** `emotion-acts-lines.js`: fog 50 written / 56 not written (court news or unseen), SEEN=1 114 / 11;
   **0 broken "()" / "(, )" / "undefined", 0 lines about others on her page, 0 page errors** (both modes). Read every row myself: another person's
   number carries the short name ("Lạc Anh Danh −1", "Sủng của Lạc Anh +3", "Nhược Lan Sức −5"); her own numbers bare only when the line is about her;
   men / court lines filed on their own page with the name only when known (one seen rule = kitKnownName). Ministers go to court news.
   Minor, not blocking: the Thái hậu extreme anger line "… ngươi cũng bị trách, Thái hậu thiện cảm −6" files on Thái hậu's page (the Emperor's twin
   files on hers); the number reads correctly there.
2. **Bots ON vs OFF — "not worse" holds.** Cause analysis of the worker is sound (mocking regard loop; bestowals draining the treasury →
   weaker throne → plots on the Emperor); both fixes keep a real gain + loss.
   My own independent run (seeds 51–52, not the worker's 31–34; runb.js sens, INP=inpage6.js, HHSTOP=1, INP2=inmood.js,inemoact.js, 2+2 processes, ~77 min):

   | run | arm | lives | HH | early death | Emperor died (by year 12) | tuẫn táng fates |
   |---|---|---|---|---|---|---|
   | reviewer r1 (old code) | ON / OFF | 29 / 23 | 0 / 4 % | 66 / 39 % | — | — |
   | worker f2 (seeds 31–34) | ON / OFF | 57 / 48 | 0 / 0 % | 49 / 42 % | 14 (10) / 21 (13) | 4 / 6 |
   | **reviewer r1 of acts-3 (seeds 51–52)** | **ON / OFF** | **43 / 55** | **0 / 0 %** | **40 / 44 %** | **16 (11) / 21 (15)** | **8 / 9** |
   | pooled acts-3 code | ON / OFF | 100 / 103 | 0 / 0 % | 45 / 43 % | — | — |

   Pooled gap 2 points (SE ≈ 7) — n.s.; the year-10 Emperor-death / tuẫn táng cluster of r1 is gone (Emperor dead by year 12: 26 % ON vs 27 % OFF).
   HH reach cannot be compared: 0 % in both arms with the inpage6 bot (also 0 % on main's OFF arm) — a bot limit, not this branch.
   Her outbursts 1.46 / 100 tuần; NPC acts 75 / outbursts 48 / extremes 20 per 100 tuần (same as r1).

## Not this branch (KIT REQUESTS already filed by the worker)
- j87 wkeStrip leaves "()" when it strips other people's tokens inside brackets (game-wide tidy).
- j79 kitFaceH(S.maid) broken face icon for the maid in the Tuần lục list (seen in my shot).
