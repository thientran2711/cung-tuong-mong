## nc_gian solo line (Seat A, Fold, real-tap harness 54fa0112 + F10 hooks) — digest of 13 valid reruns, 27/11
PRIORITY #1 CHECK: all 13 review files + result jsons + rerun report read; format per ROBOT-PLAYER-REVIEW.md §C. Rates rebuilt from valid lives only.
Evidence limit (honest): lives ran 4-14 h of wall time with resumes; reviews come from harness logs, moment logs, result jsons and the ending/stuck shots, plus a look at the real screens for the last 4 lives (lazy-1n, lazy-2, lazy-1g). Scores in the first 9 lives are the log-based reading: «–» where not observed. Low confidence on a, d, e, g.

Lives (all VALID, real taps, no cap):
greedy-1 illness 20, 441 buổi · random-1 Lãnh cung/madness 22, 566 · lover-1 Lãnh cung/madness 23, 643 · lover-2 illness 25, 760 · lazy-1 illness 25, 781 · lazy-1n illness 25, 1010 · speed-2 dysentery 24, 726 · speed-1 Lãnh cung/madness 31, 1780 · lazy-2 illness 32, 2173 · scholar-1 Lãnh cung «Tuổi xuân qua đi» 40, 2871 · greedy-2 chronic poison 39, 2881 · cautious-1 Lãnh cung «Tuổi xuân qua đi» 40, 3490 · lazy-1g Lãnh cung «Tuổi xuân qua đi» 40, 3519.
Endings: illness/poison death 7 · Lãnh cung (madness or xuân qua đi) 6 · every life ended at rank 0-1 except none above Thường tại.

### Average score per area (1-10; n = lives that scored it)
a first 15 min 5.8 (n=5) · b loop/pacing 3.0 (n=12) · c buttons/UI 4.4 (n=13) · d story/drama 5.0 (n=7) · e characters 5.5 (n=4) · f choices/fairness 3.4 (n=13) · g rewards/feedback 4.2 (n=5) · h mini-games n/a (no run took a mini-game after the opening) · i visuals/sound 7.4 (n=5) · j co-op n/a.

### Recurring themes (lives hit / 13)
1. Rank 0-1 for most of the life, whatever the profile: 13/13 ended at rank 0-1; the long lives sit there for 15-20 years (lazy-1g 3519 buổi, cautious-1 3490, greedy-2 2881, scholar-1 2871). Promotion roads are offered and taken (scholar-1 115 taken of 348 offered, speed-1 127 offered/124 by decree, lazy-1g 93 of 280) with no visible rank change.
2. Death with no warning/cause line: 7/13 end by illness/poison at 20-39; the ending card gives no cause and no earlier hint (greedy-1, lover-2, lazy-1, lazy-1n, lazy-2, speed-2, greedy-2).
3. «Vào lãnh cung — tội tư thông» for players who never took a romance action (lazy-2 year 3, lazy-1g year 7; a quiet bot): cause not shown, feels unfair. Also unexplained rank slides 3→2→1 in the first turns (lazy-1n, lazy-1g).
4. First ceremony kills the life at buổi 1: for the quiet profile 9 of 13 attempts on BUILD cc68dcfd2b1b failed «Lễ ra mắt» (Ban hoa, xuất cung) plus 2 «Hòa ước → Xin để vương muội đi thay» story endings; passes on 5ab5b80e406e (1/1) and 1b5137935266 (1/1). Selection fairness issue (selx-fair), flagged to Foreman D. Not counted as lives with data.
5. Old-build UI/loop faults in the early lives (pre-fix builds): «Tin báo» stack up to 12 copies with «Lui» doing nothing (random-1, greedy-1/2, cautious-1, lover-1, speed-1 dead buttons 4-53), «Trường Môn viện» no-clock loop (random-1 ×39, greedy-2 ×219, lover-1 ×33, cautious-1 ×71). 0 dead buttons and 0 stuck in all 5 lives on 54fa0112 builds later than 5ab5b80e406e (lazy-1, 1n, 2, 1g, speed-2).
6. Performance: kitOptUnify n×n cost made buổi take 3-4 min after b1649 (speed-1, scholar-1; hangs sent to F10; fix 1d57fe88). No hang in the last four lives.
7. Overlay layout (low): year-8 event card with the Hoàng thượng figure overlapping a second card (lazy-1n); Tuần lục cover overprinting the header/tab row (lazy-1g).
8. Visuals are the strongest area: Lãnh cung night/autumn scenes, Giao thừa maid, Tuần lục book cover, item art (7-8/10 in every life that scored it).

### Quotes (player-visible, VN)
«Ta bị Hoàng hậu xử tội (tội tư thông)» (lazy-2, lazy-1g) · «Hồng nhan bạc mệnh — Tuổi trời đã tận, trọng bệnh không qua khỏi» · «Lãnh cung — Tuổi xuân qua đi» · «Ban hoa — Bị ban hoa, xuất cung».

### Bugs (all already in the fast lane)
Tin báo no ✕ / stack; Trường Môn viện no-clock loop; kitOpt* n×n (F10 fix 1d57fe88); pet «Xem …» buttons covered by span.kitb (speed-1); #kpop info layer not closing (lover-1); event-card overlap (lazy-1n); Tuần lục overlay over header/tabs (lazy-1g). Harness: crash on browser close (retry/resume works), 2 h tracked-job limit (resume queue).

### Player suggestions (feature freeze, law 18: recorded for PARKING_LOT)
Cause line on every rank drop and on every ending card; early warning before a fatal illness and a heal hint; a promotion that visibly raises rank (or says why not); a way back out of Lãnh cung; a gentle nudge for a quiet player at rank 0; do not let the first ceremony end a new life for the quiet profile (balance check on «Lễ ra mắt»).

### Method note
Per-life harness/BUILD tags and the BUILD windows are in reports/rerun-nc-nc_gian.md. No life was moved across builds except the early mixed-harness lives (greedy/random/lover/cautious/scholar) kept VALID by Foreman D's EXIT RULING.
