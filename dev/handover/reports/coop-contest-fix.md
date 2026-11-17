# coop-contest-fix — blocking fix a–d of reports/coop-contest-r1.md (worker, s25 child, 11/16/2026)
Branch `review/coop-contest-fix` @ 00b76227 (base review/coop-contest-r1 79091667 + merge origin/main f1509d7c). START_CTX ~4 %, end ~25 %.

## What was done
- **Merge origin/main f1509d7c** (coop-one-world, lag-play-2). Conflicts: index.html/sw.js/assets.json taken from main then rebuilt
  (build_site.sh); assemble.py = union (jcoopcontest before jcoopone + jlag2, jcoopone stays the guard script after it);
  jcoopworld: W_KEYS union, and the contest keys `cfp cfb cfa ctc ctcRes` are also in **HOST_ONLY** (one world: only the host writes
  them); friend `__b` keeps both `queen` (Tranh ghế crown) and `ill` (one-world epidemic); toCanon keeps `preCanon` + `worldPart` +
  HOST_ONLY copy; write-back keeps both the ill line and the crown → rank 7 line.
- **a. One mechanism for feasts.** The shared feast board is now `COOPW.festBoard`, called by the BOTTOM layer of `festival()` (new hook
  in jcoopworld, under the guest mute, the host news line, B4's friend-in-harem and b4Wrap). So the host builds it with her entry in the
  harem, b4Wrap still sends what NPCs did to her items, and the news line gets "cả hậu cung thi chung một bảng, có cả hảo hữu".
  Her entry = her live registration `fEntry().fx7[f]` via main's `f7reg` (same year, not done, valid art; prep `pr` → J71.prep, `pb`)
  OR her `cfa["x:"+f]` answer → ANY registration path puts her on the ONE host board. Formula scoring (entered, never played) now
  carries her chosen art + prep. jcoopcontest host decisions read `worldOn()`.
- **b. One Sức rule = solo:** an entrant on the ranked list pays `J71.cost` exactly once — on "Vào thi", or when the result applies if
  she was scored by formula (solo's no-minigame road); "Bỏ thi" pays nothing (`j71.cpay[board]`). Her feast registration closes
  (`fx[f].done=1`) when the result applies on her own client. Applies to f and x boards (not the gift board, which has no Sức in solo).
- **c. B4 festival branch retired:** `CW.f7`, `f7Done`, the cScore7/fxBest7/fxFin7 hooks and the `res.fest` closer are gone
  (`CW.f7reg` kept for the board). No double result card, no double Sức. `dev/test/coop-p2.js` B4 festival checks rewritten for the
  board flow (+ a repeat-result check: no second Sức / card). Test hook `COOPW.ccFin(id)` ranks a board now.
- Same invitation: feast invitation odds use ONE seed per feast+year in co-op (both seats `pp.sd` equal; was each client's R(1e6)).
- ONE CORE: j71 feast option text typed "Sức -6" → prints `J71.cost`.
- PROTOCOL §11 paragraph on the board placement / Sức rule. coop-contest.js new **section 5 (feast FX7, both seats)**: same
  invitation + friend line, both register, ONE board with her chosen art, both play, ONE result list on both, guest Sức once,
  registration closed, one result card each, shots.

## Tests (LIVE Worker)
| test | result |
|---|---|
| coop-p2.js | **36/36 with B1 skipped**; B1 `she is now my tai mắt` FAILS and the run then hangs — **same on origin/main f1509d7c** (pre-existing, not this branch). B4 (festival on the board) 11/11 incl. art+prep, one list, closed, Sức once, card, no repeat |
| coop-contest.js | 68/68 (run 2; run 1 = 2 test-wording fails, fixed; one run 1 relay-timing fail in section 2, rerun clean) |
| coop-contest-dc.js | 26/26 |
| coop-contest-core.js | 9/9 |
| coop-contest-solo.js (solo seed-identical paths, old save 10 weeks) | 6/6 |
| coop-b1.js | 39/41: `8 B gained it` / `8 A lost it` (laydo finds nothing to take) — **main f1509d7c fails the same + more (33/41)**, pre-existing |
| coop-e2e.js | 57/59 twice: `start: each sees the other` (host has not yet got the guest blob, base.P = ["a"]). Probe: same flake on main 1/4 runs, branch 1/4 in probe runs; timing of the test, not a regression |
| coop-one-world.js | PASS |
| quickcheck.sh (00b76227) | PASS · open 1194 ms · old save ok · perf new/live render 240/259, tab 254/296, buổi 684/761 |

Shots (scratch only, looked at): Fold 755x1000 host + iPad 1180x820 guest, feast invitation and result board: same title, same
board rows/order on both seats, no overflow. Fold invite hero picture was still loading (CDN), not this branch.

## Open / follow-ups (not this branch)
- Pre-existing on main: coop-p2 B1 bribe (`spyFor` not set on the host's servant entry, test then hangs) and coop-b1 step 8 laydo.
  Co-op bugs = top priority: needs its own worker.
- j7On() reads the HOST's S: a host who is a servant (not consort) runs the old j8 festival; the guest consort then gets no board.
- j71 place rewards still typed Danh ±1 (r1 follow-up stands).

## r2 — reviewer r1 FAIL items fixed (branch `review/coop-contest-fix-r1` @ db92d8de, on top of the reviewer's a3b5e963)
1. The other player's played row showed a formula split ("60 phần = 60 tài nghệ … + 0 may rủi"): root = `rowsH7` printed every mg row as
   "Ngươi", so applyRes dropped mg for the friend. Fix in the ONE shared row writer: a played row names its player (Ngươi only for her own);
   applyRes keeps mg for every played row; the mini-game's friend row (startContest R0) carries mg and j82 prints "tự chơi màn thi, đã
   cộng tài nghệ và chuẩn bị" for it. Both seats now read the same true row.
2. Friend's row without portrait: root = when the result card is built/shown while the host's week end has her pulled out of the harem,
   the kit people list (`kpPeople`, used by EVERY fact row / result card) did not hold her. Whole-family fix in jcoopworld: kpPeople also
   holds the pulled friend entry; jcoopcontest who()/fName read her through withFriend. Unmet friend shows the kit unknown portrait like
   every unmet NPC (name mask "Hảo hữu của ta").
Tests (db92d8de): coop-contest 72/72 then 70/71 (`3 guest Sủng +3` got +2 = the known week-drift flake from r1; the two runs before
had a section-5 week stall that the base a3b5e963 did not show in 1 run — rerun clean twice, watch it); new checks on BOTH seats: the
other player's played row says "tự chơi", no formula split, kit portrait ✓. dc 26/26, core 9/9, solo 6/6, coop-p2 (B1 skipped,
pre-existing main bug) 35/35, coop-e2e 58/59 (1 random: week after rebirth), quickcheck PASS. Shots looked at (scratch): Fold host +
iPad guest result card, same rows/order, friend row "Hảo hữu của ta — múa: 60 phần tự chơi" with its portrait.

## HANDOVER (worker rolled over at ~40 % context, START_CTX ~4 %; owner rollover rule) — r3 task NOT started
State: `review/coop-contest-fix-r1` @ db92d8de holds r2 (both reviewer items fixed). Reviewer §r2 (reports/review-coop-contest-fix-r1.md): FAIL on re-merge onto
live main 744b80e7 — conflicts in j34 / j71 / j8. Successor's task (from s27):
1. Fresh sparse worktree of review/coop-contest-fix-r1 (db92d8de); merge origin/main 744b80e7 (or newer live main).
2. Jealousy = ONE core = main's `BAL.ghen.*` + `ghenN()`. Drop the branch's `BAL.fest.winGhen / fxGhen / giftGhen / ctGhen` (jbal.js BAL.fest) and every
   read of them: j71 (solo C/FX/P paths + option texts "ghen +N"), j8 festival(), j34 contestEnd, jcoopcontest (applyRes ghenAll(BAL.fest.*Ghen), ccplay
   option text, tgBuilt crowned guest ghenAll(BAL.fest.ctGhen)). Map each to the matching main BAL.ghen key / ghenN(); texts print the BAL value.
   Update dev/test/coop-contest-core.js (it asserts BAL.fest values + a static no-typed-copy guard).
3. j34 contestEnd: keep main's `seatHas` + the co-op crown through the seat rule (jcoopcontest's contestEnd wrapper records ctcRes; a crowned guest
   takes rank 7 from ctcRes; jcoopworld toCanon writes the friend entry's queen back as rank 7 — check both agree with seatHas).
4. Keep r2: rowsH7 played row names its player; applyRes keeps mg; j82 mg sub text; kpPeople wrapper (jcoopworld) + fEnt in who()/fName (jcoopcontest).
5. assemble.py union (jcoopcontest before jlag2/jgrey/jcoopone); bash dev/site/build_site.sh.
6. Tests: core gates (quickcheck), coop-contest (72; known flakes "3 guest Sủng +3" week drift, a section-5 week stall seen 2x on r2 — watch),
   coop-contest-dc 26, coop-contest-core, coop-contest-solo 6, coop-p2 (B1 = PRE-EXISTING main bug: run a scratch copy with the B1 block `if(false)`,
   never commit it), coop-e2e (1–2 random fails known), coop-one-world, quickcheck. Then SẴN SÀNG KIỂM <sha> to s27 + reviewer session_01UV1SziJoyYJ3o5iLXG8BuP.
