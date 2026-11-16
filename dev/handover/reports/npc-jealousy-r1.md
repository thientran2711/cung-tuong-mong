# npc-jealousy r1 — reviewer verdict (BIG tier: rules/numbers)

Reviewer: session_011xDdVNeqzStYbHRgprbmnd for Foreman C (session_011xDdVQKn56reGyLzWPb9oC). START_CTX ≈ 3 % of the window.
Reviewed: review/npc-jealousy @ 9148d83f (code 89f50020, base main 1aa0edb2). Law: OD:L1386 (people-life.md), HANDOVER.md:L46, OD:L1267.
Trial merge with current origin/main b53ba8b9: conflicts only in generated index.html / sw.js / assets.json (took theirs, rebuilt) — no source conflict.

## VERDICT: FAIL (5 items; core design is right, the leftovers below are her-special or non-deterministic)

The one formula (ghenOf/ghenAdd/ghenAt/ghenWeek in j9, v.gp[id], BAL.ghenW) is sound: every jealousy read I grepped in npcAct/danger/hostility/
rivalsTurn/wkNpcUse/j70/jts/j95/j10/j68h/jmen goes through it, BAL.ghenW holds the weekly drift numbers, NPC ids are monotonic (rid, never reused,
< 900) so gp shares the pid keys with jcoopworld safely.

## Fault list (fix the whole family)
1. **Unit test not deterministic** — `dev/test/npc-jealousy-unit.js` failed in 6 of 7 runs on the merged build:
   - "her night raises the same amount" [8,11]: rivalNight → j75:144 `roll(10+sc*4)) bestow(v,"night")` → ghenAt(v,3) at random (her side j8:278 has the
     same random bestow). The code is equal; the test must stub Math.random (or compare with bestow off).
   - "NPC steals NPC's night" [0,0]: stealWin is wrapped by j75:27 `ntTaken()` — the night already taken by test 3 blocks it. Reset the night state
     (or call sw0 directly) before test 4. Rule: unit tests deterministic (as required in night-steal-r2).
2. **Start jealousy is her-only** — j1.js:134 newRival `ghen:R(15)` gives every NPC a starting jealousy of HER, while gp starts empty: at a new game
   and at every arrival (j2:11, j3:110, j7:13, j8:300, j8:415, j14:37, j27:55, j55:121, jcoopask:90) NPCs are jealous of her and of nobody else.
   Same rule for every pair: seed each pair the same way (newcomer ↔ every live consort, both ways, incl. her slot), or seed nobody. Mind jcoopask's
   TMP-id remap (keys of TMP ids are dropped at jcoopask:85).
3. **j20.js:16 queenRewards** — the Queen q (always an NPC there) rewards w and `w.ghen=cl((w.ghen||0)-5)`: w's jealousy of HER drops although she is
   not involved, and when w===S it writes a junk S.ghen. Same family as thHH (ghenAdd(q,a,-g)): make it `ghenAdd(w,q,-5)` (number into BAL while there).
   Re-grep every remaining raw `.ghen` write in NPC-side code (j20, jthaiy:58 is her pregnancy = fine) and list it in the report table.
4. **jexam.js exGraceUp / grace (NPC branch)** — when an NPC is graced: ghenAt(p) + `oanAdd(S,p,B.oan)` (only SHE gets oán); when she is graced: ghenAll
   only, nobody gets oán; and the NPCs' oán (old consorts() loop incl. NPCs) was removed. That is a substitute rule for her only ("she has no ghen
   bar"). Make both directions identical: either jealousy only for everyone, or jealousy + oán for all others in both directions.
5. **Stale gp keys never decay** — ghenWeek skips dead/out targets (`if(t!==S&&(!t.alive||t.out))continue`) so jealousy of a dead consort is frozen;
   ghenMax (jmen "jealous" reason, j95 "tranh sủng" weight) reads every key. Probe (4 lives × 3 y, seed 7): 634 keys, 38 toward dead targets, 25 of
   them ≥ 50 (none topped ghenMax at the end, but nothing stops it). Prune keys of dead NPC targets (id < 900, found in rivals, !alive) in ghenWeek,
   keep pid keys (≥ 900, co-op friend may be away), or have ghenMax skip dead targets.

## Notes (not faults of this branch)
- jmood.js:58 wraps ghenAll only: her bad mood band ×(1+B().ghen) raises others' jealousy of her; NPC doers have no mood bar, so ghenAt(NPC) has no
  equivalent. NPC mood is a separate feature — flag to the coordinator, do not invent a bar here.
- Co-op join (pre-existing, main too): at "start" the host's v.gp[guestPid] = 0 while the guest holds R(15) values (jcoopworld:138 roll on the
  guest); equal after the first merged week. Seen on main b53ba8b9 with the same probe. Separate co-op finding.

## Checks run (merged build = branch + main b53ba8b9, rebuilt)
| check | result |
|---|---|
| (1) ONE CORE: BAL.ghenW holds sungGap/sungP/qRank/qP/sac/relHi/decayHi/decay; ghenAt Đa tình ×1.5 = ghenAll | ok |
| (2) her-special grep (`.ghen`, `t===S`, rel>5, twFollowT, q72Npc) | items 2, 3, 4 left; rest her-UI/dialog by nature (agree with report §2) |
| (3) bot `night-steal-bot.js` 20 lives × 3 y × seeds 13000/37000 (40 lives/build) | main: her 28.0 % vs same-rank control 22.3 % (+5.7); branch: 26.5 % vs 25.3 % (+1.2). Direction reproduces (worker: +6.8 → −2.4 on 60 lives). All tries/10 nights 3.53 → 3.60 (worker 3.45 → 3.84) |
| steal-tries side effect | acceptable: the rise comes from real NPC↔NPC jealousy under the same rule; BAL.steal.k stays the knob if the foreman wants ≈ 3.5 |
| (4) old save `two-way-oldsave.js` main build → merged build, 40 weeks | ok, 0 page errors, gp filled lazily |
| (5) co-op `coop-e2e.js` (live Worker) | 59/59 on an idle box; 57/59 once under 4 parallel bots ("same consorts" after week 3 / rejoin; main 59/59 in that window) → load flake, re-run clean |
| (5) co-op gp probe (reviewer copy of coop-e2e with gp compare, not committed) | NPC↔NPC gp maps identical host/guest after weeks 1–3 and rejoin (n = 9/18/36/36); pid swap host.ghen = guest.gp[host] and back equal after every merge; no client-side divergence |
| (6) `npc-jealousy-unit.js` | 15/15 once, then FAIL in 6/7 runs → item 1 |
| `night-steal-unit.js` | 29/29, 0 page errors |
| Fold 755x1000 / iPad 1180x820: load + 24 weeks + render | 0 page errors, no horizontal overflow |
No player-visible text changed → no shots taken (none uploaded, nothing to wipe).

## For r2
Fix 1–5, add unit cases for 2–5, re-run the unit test 5× (all PASS), bot 40 lives, coop-e2e on an idle box. Then re-review.
