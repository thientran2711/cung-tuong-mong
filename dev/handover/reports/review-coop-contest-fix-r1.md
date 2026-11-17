# review-coop-contest-fix-r1 — BIG co-op review (reviewer, main s26 child, 11/16/2026)
Reviewed: review/coop-contest-fix @ 00b76227 (worker session_01UV1SzhdbJ2HHinhwJJQfwi, report coop-contest-fix.md).
Review branch: `review/coop-contest-fix-r1` @ a3b5e963 = 00b76227 + merge of origin/main 08725411 (contains main, fast-forwardable).
START_CTX ~4 % of the window (get_session reads 0; own estimate); end ~12 %.

## VERDICT: FAIL (2 small items; the r1 blocking item a–d is fixed and everything else passes)

The r1 plan a–d is done and works: one feast board on the host for ANY registration path, her chosen art + prep on it, Sức once
(Vào thi, or at result when scored by formula; Bỏ thi pays nothing), registration closed at result, the B4 festival branch retired
(no double card / double Sức, repeat result is a no-op), one invitation seed per feast+year. Both seats hold the SAME ranked list
(Fold host and iPad guest shots of `Yến tiệc đầu xuân: kết quả`: Thường tại 67 · the friend 60 · Hoàng hậu 58, same order).
But the row TEXT of that one list differs per seat, and on one seat it is false:

1. **The other player's played row is described as a formula score (false numbers), so the two seats do not show the same result.**
   jcoopcontest `applyRes`: `mg:r.mg&&+r.id===CW.pidMe()?1:0` keeps the "played it herself" flag only for MY row; `submit()` sends a
   played row as `{t:sc,pr:0,lk:0,s:sc,mg:1}`. So on the other seat `rowsH7` (j71) takes the formula branch and prints
   `Hảo hữu của ta — múa: 60 phần = 60 tài nghệ (Vũ 0, Sắc 89) + 0 may rủi` (host Fold shot) while her own seat prints
   `Ta — múa: 60 phần tự chơi (đã cộng tài nghệ …)` (guest iPad shot). "60 tài nghệ" with Vũ 0 is untrue. Same family:
   the startContest rival list (`R0.push({… talent:fr.t, prep:fr.pr, luck:fr.lk})`, jcoopcontest ~l.128) shows her played score as
   talent. Fix (whole group): keep `mg` for every row; `rowsH7` prints the "phần tự chơi" form for ANY mg row with that row's name
   (Ngươi / the friend's name), not the hard-coded "Ngươi"; the R0 friend row must not label a played score as talent. Check every
   board type (f, x, gift p, Tranh ghế ctc rows) on both seats, both directions (host row on the guest too).
2. **The friend's row on the host's result card has no portrait** (grey silhouette like the fogged "Thường tại ???"), while she is
   named and known. Same board on the guest shows her own row with her face. Find the root (who() / fEntry() stand-in without face
   while she is pulled, or the row-portrait helper skipping coop entries 901/902) and fix it in the shared path, both seats.
   Re-run coop-contest.js section 5 and LOOK at both result shots.

## Test results on a3b5e963 (LIVE Worker)
| test | result |
|---|---|
| coop-contest.js (Fold host + iPad guest, sections 1–5) | 68/68 |
| coop-contest-dc.js | 26/26 |
| coop-contest-core.js (one core) | 9/9 |
| coop-contest-solo.js (solo paths, old save 10 weeks) | 6/6 |
| coop-e2e.js | 59/59 |
| coop-one-world.js | PASS |
| coop-p2.js | hangs at `B1 host: she is now my tai mắt` (timeout) — pre-existing on main per worker; local copy with B1 skipped (not committed) **35/35** incl. all B4 festival-on-board checks (art+prep, one list, closed, Sức once, card, no repeat) |
| coop-b1.js | branch 37/41, 35/41, 39/41 · **main 08725411 39/41, 37/41** — step 8 laydo fails on both every run, other fails random on both: pre-existing flake, not this branch |
| quickcheck.sh (a3b5e963) | PASS · open 945 ms · old save ok · perf new/live render 259/220, tab 287/279, buổi 858/793, tasks>200ms 10/10 |

## Other checks (pass)
- Merge of main 08725411: only assemble.py conflicted (+ built files). Order kept: `… jeitem, jcoopcontest, jlag2, jgrey, jcoopone`
  (jcoopone stays the guard script after the contest file; jgrey/jlag2 do not touch festival). Site rebuilt with build_site.sh.
- Wrapper order: CW.festBoard is installed first in jcoopworld's hooks, so it is the bottom layer under the guest mute, the news
  line and b4Wrap (b4Wrap now only sends item ops). Host-only decisions read worldOn().
- Kit: jcoopcontest uses only kit classes (`past`, `g`), rowsH7 / headArt / kitGameResult; no private CSS/frames.
- VANPHONG: cổ trang, no %; new texts print BAL / J71 constants (J71.cost, BAL.fest.*).
- Shots looked at (scratch only, not uploaded): Fold 755x1000@2 host + iPad 1180x820@2 guest, invitation + result; no overflow,
  no page errors. Fold invitation hero picture still blank (CDN loading in the test, as the worker noted).

## Follow-ups (not blocking, not this branch)
- ONE CORE: the place rewards Danh +1 / -1 are typed in j71 AND copied in jcoopcontest (l.135/152/157 texts and applies); j71's
  "Tự tay làm lễ vật" Sức -10, "Cược" Bạc -20 and jcui cuAward `roll(30)` are typed too → BAL.fest with the one-core audit.
- Pre-existing on main (co-op = top priority, own worker): coop-p2 B1 bribe (`spyFor`) + test hang; coop-b1 step 8 laydo.
- j7On() reads the host's S: a servant host runs the old j8 festival, a consort guest then gets no board (worker's note stands).

---
## r2 re-check (11/17/2026) — review/coop-contest-fix-r1 @ db92d8de (worker r2 on top of a3b5e963)

### VERDICT: FAIL — only because origin/main moved; the code fixes themselves pass
Both r1 items are fixed on db92d8de (base main 08725411):
1. FIXED. `rowsH7` names the player of any played (mg) row, applyRes keeps mg for every row, the startContest R0 friend row carries mg.
   Shots (Fold host / iPad guest, `Yến tiệc đầu xuân: kết quả`): host reads `Hảo hữu của ta — múa: 60 phần tự chơi (…)`, guest reads
   `Ta — múa: 60 phần tự chơi (…)`; same rows, same order, no formula split.
2. RESOLVED (by design). kpPeople now holds the pulled friend entry. On the host she still shows the grey kit "unknown" portrait,
   the same as the fogged `Phi ???` row: she is unmet there (her name is masked as "Hảo hữu của ta"). That is the shared kit rule
   for unmet people, so it is consistent. Accepted.
Tests on db92d8de: coop-contest 70/71 (`3 guest Sủng +3` got +2, the known week-drift flake) then 71/71; no section-5 week stall in
either run · dc 26/26 · p2 with B1 skipped 35/35 · e2e 57/59 (`A frozen when B left`, relay presence timing) then 59/59 · core 9/9 ·
solo 6/6 · quickcheck PASS (open 977 ms, old save ok, perf ≈ live).

### Blocking: re-merge origin/main 744b80e7 (batch-2300, ~20 branches) — worker job, not a reviewer merge
Merging main into db92d8de conflicts in j34.js, j71.js (8 hunks), j8.js, assemble.py, index.html and sw.js. These are ONE CORE clashes,
not just text:
a. **Two sources for jealousy.** Main's ghen-shown moved every contest/festival jealousy number to `BAL.ghen.*`
   (`contest`, `contestTop`, `praise`, `festival`, `rankUp`) and prints them with `ghenN()` (shown == applied). This branch put the
   same numbers in `BAL.fest.winGhen / fxGhen / giftGhen / ctGhen`. Keep ONE: take main's `BAL.ghen.*` + `ghenN()` in j71, j8
   festival(), j34 contestEnd AND jcoopcontest (texts + applies), then drop the duplicate BAL.fest ghen keys. coop-contest-core.js
   must assert the main keys.
b. **j34 contestEnd seat rule.** Main's seatcap wraps contestEnd in `seatHas`/`seatComp`. Keep main's seat check together with the
   branch's BAL.fest prize/Oán reads. Check that the co-op Tranh ghế crown (host-only, plus the jcoopworld write-back
   `queen → rank 7`) also goes through the seat rule, so there is never a second Hoàng hậu.
c. **j71 / j8:** take the branch's BAL.fest prize/bestow/gift reads and main's ghen reads; keep main's `roll` changes only where
   they are BAL reads.
d. Then rebuild, and re-run quickcheck (main now has CORE GATES: one-core-guard frozen list, rules-one-source, kit-conform; the new
   jcoopcontest typed `Danh ±1` copies may trip the guard), coop-contest ×2, dc, core, solo, p2 (B1 skipped), e2e, and
   coop-one-world.

---
## r3 (11/17/2026) — CANCELLED by main s28 (owner stopped option-1 co-op patching; co-op goes to thin guest). Findings for coop-thin part E.
Checked review/coop-contest-fix-r1 @ 1ce276b7 (worker r3), plus my merge of main f5220eaa = **a7f4ab13** (pushed). That merge only
conflicted in assemble.py (added jcoopcontest before jlag2) and the built files (rebuilt).
- Code: r2 items a–d done. ONE jealousy core: no `BAL.fest.*Ghen` key is left; j71/j8/j34/jcoopcontest read `BAL.ghen.*` and print
  them with `ghenN()`. j34 contestEnd keeps main's seatHas/seatComp. The guest crown mirror also requires `seatHas(S,7)`. Danh ±1
  place rewards now read `BAL.fest.place/last`.
- Tests on a7f4ab13:

| test | result |
|---|---|
| quickcheck | PASS (core gates PASS, open 1003 ms, old save ok, perf ≈ live) |
| dc | 26/26 |
| p2 (B1 skipped) | 35/35 |
| e2e | 60/60 |
| core | 11/11 |
| solo | 6/6 |
| one-world | PASS |
| coop-contest ×4 | 71/72 (known Sủng drift) · 72/72 · **stall** (`5: week advanced for both` → `5 guest: plays her own part` / `result arrived and applied` fail) · 71/71 |

- Open bug for thin guest: the section-5 buổi/week stall is real. Rate: 1/4 here; the worker saw 3/6, and 2 on r2. Guest has
  queued dialogs (Q:2, #next "Sẵn sàng" disabled); host says "Chờ hảo hữu…" with bend=true. It looks like the guest's ready
  signal never fires while the feast play card (ccplay, must:1) sits in her queue at buổi end. Thin guest should make sure that
  host-sent cards never block the guest's ready signal.
- Verdict: none (cancelled). Without the cancel it would have been FAIL, on the stall alone.
