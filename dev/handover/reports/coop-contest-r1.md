# coop-contest-r1 — BIG-tier co-op review (reviewer s23 child, 11/16/2026)
Reviewed: review/coop-contest @ 73eec76f. Review branch: `review/coop-contest-r1` @ 79091667 (contains origin/main b53ba8b9).
START_CTX ~4 % of the window; stopped at ~29 % (rollover rule START_CTX + 25 %).

## VERDICT: FAIL (one blocking item; everything else passes, fixes already on r1)

### 1. BLOCKING — collides with main's coop-b1b5 B4 (feast entry of the friend), landed on main after the worker branched
main b53ba8b9 now holds coop-b1b5 p2 B4: the guest's feast registration (`S.j71.fx`) travels on her entry (`v.fx7`), and the host's
`festival()` (b4Wrap → f7reg / cScore7 / fxFin7 wrappers → f7Done) scores her with HER chosen art by formula and sends her the result,
the Sức cost and "registration done" through `res`. jcoopcontest wraps `festival()` OUTSIDE b4Wrap (assembled last) and, for every FX7
feast on the host, builds the shared board and never calls the inner function, so the B4 path is dead and
`node dev/test/coop-p2.js` fails 4 checks (41/45):
`B4 host: her score used HER chosen art + registration` · `B4 guest: her registration closed` · `B4 guest: she pays the same Sức` ·
`B4 guest: her result card`.
Worse in real play: a guest who registered through a path that does not send the `ctm-cc` "ans" (anything but the j71x invitation card)
is NOT entered on the board (`ent[friend]` reads only `S.cfa`), although her registration reached the host as `fx7`.
Fix (worker):
  a. One mechanism for feasts. Keep the shared board (owner's ask: she plays her own part, one list), and in jcoopcontest's festival
     wrapper take the friend's entry from `S.cfa["x:"+F.f]` OR her live `fEntry().fx7[F.f]` (main's f7reg rule: same year, not done,
     valid art), carrying her `pr/pb` preparation.
  b. On the guest, when the board result applies: close her registration (`j.fx[F.f].done=1`), Sức `-J71.cost` exactly once
     (today she pays it on "Vào thi"; a guest scored by formula because she never played pays nothing — decide one rule, same as solo).
  c. Retire or route the B4 festival branch (CW.f7 / f7Done) so it cannot run beside the board (no double result card, no double Sức);
     update `dev/test/coop-p2.js` B4 festival checks to the board flow (host board has her art; guest result card; Sức once).
  d. Re-run coop-contest.js, coop-contest-dc.js, coop-p2.js, coop-b1.js, coop-e2e.js, coop-contest-solo.js, coop-contest-core.js.

## Fixed by the reviewer on review/coop-contest-r1 (keep them)
- Merged origin/main twice (95282e69, then b53ba8b9): assemble keeps jsteal + jcoopcontest; jcoopworld keeps main's W key `tn` and
  `CW.hrSync` beside the contest keys and `preCanon`; j71/jcoopcontest use main's `J71.cost`.
- ONE CORE (owner OD:L1267 + CO-OP FIRST rule): the branch had copied ~12 of j71's numbers into jcoopcontest (gift weights 55/15/.3/8/.8,
  luck 25, cost 60, praise/small/miss, feast prize Sủng +8 Danh +3, ghen 3/4/8, Emperor-gift odds 30/50, Tranh ghế Oán/ghen 10) = a
  second source. Now `BAL.fest` (jbal.js) is the one source, read by j71 (solo P / C / FX paths and their option texts), j8 festival(),
  j34 contestEnd and jcoopcontest; helpers giftW7/gift7/myGifts7/giftPay7/pzd7 in j71. Values unchanged (asserted by the new test).
- New tests: `dev/test/coop-contest-core.js` (solo BAL.fest paths run and pay the BAL numbers; static guard against typed copies) 9/9;
  `dev/test/coop-contest-dc.js` (guest reload before playing: card back once; guest away while the host ranks: one list, result once
  after rejoin, no double pay) 26/26.
- `dev/test/coop-contest.js`: the "friend entry not paid on the host" check counts only host-made items (main B1 mirrors her real
  bag on her entry, items with `ci`).

## Test results on r1 79091667 (live Worker)
| test | result |
|---|---|
| coop-contest.js (2 clients, Fold host + iPad guest) | 51/51 (one run 50/51: guest Sủng +2 not +3, random week drift; re-run 51/51) |
| coop-contest-dc.js (disconnect / reconnect / away while ranked) | 26/26 (one flaky week-gate stall, re-run clean) |
| coop-contest-solo.js | 6/6 |
| coop-contest-core.js (one core) | 9/9 |
| coop-e2e.js | 59/59 (first run on the earlier merge 57/59 freeze flake, re-run 59/59) |
| coop-p2.js (main's B1–B5 p2) | **41/45 — item 1** |
| coop-b1.js | 40/41 (`9 week merged` timeout; not re-run, check with item 1) |
| quickcheck.sh 1e53ffc3 (before the 2nd main merge) | PASS (open 1153 ms, old save ok, perf ≈ live) — re-run on the fixed sha |

## Other checks (pass)
- Solo unchanged (all hooks gate on COOPW.on; BAL values identical). Old saves without cfp/cfb/cfa/ctc/ctcRes load and play 10 weeks.
- No double pay: prizes through COOPW.pay (own client pays her, host pays NPCs, nobody pays the friend entry); jcui cuAward guarded.
- No double crown: Tranh ghế host-only, guest mirror; exactly one crown in the 2-client run; write-back queen → rank 7.
- Late join / reconnect: boards and plans are W keys, applied once per board id (`cdone`); play card has pid ccplay (survives reload).
- Kit: dialogs reuse the existing kit (rowsH7, kitRows, kitGameResult, `p.past`); no new CSS/frames. Shots at 755x1000@2, 1180x820@2,
  1366x1024@2, 1000x755, 390x844, 844x390: no overflow, no page errors (scratch only, not uploaded).
- VANPHONG: cổ trang wording, no %; new texts print numbers from BAL.

## Follow-ups (not blocking, not this branch)
- j71 still types the place rewards (Danh +1 / -1) in many lines; move to BAL.fest.place with the one-core audit.
- Worker's own "Not done" list stands; the Emperor's-night item is now covered by main's B2 (`tn`, host-authoritative).
