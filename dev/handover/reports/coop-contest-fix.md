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
