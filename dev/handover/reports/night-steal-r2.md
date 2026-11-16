# night-steal-r2 — REVIEW (BIG tier: odds/rules + co-op)

Reviewer: session_01UV1Szie8p57AVPuNpewWQP, opened by MAIN s22 (session_01UV1SzjhT28XQmRt2EHNffg). START_CTX ≈ 3 % of the window.
Reviewed: review/night-steal-2 @ 609c1bdd0 (+ ed6fcd05 report). Merged onto origin/main ec315daf, then again onto f03886af (which brought jtwoway, the two-way deed table) → review/night-steal-r2
(conflicts: jbal2 keeps main's BAL.spread + the branch's BAL.relOan/BAL.steal; assemble = main's list (incl. jtwoway, jst14) + jsteal after j75; index.html/sw.js/assets.json rebuilt by build_site.sh).

## VERDICT: PASS (see sha in the CLAIMS row / coordinator message) — with finding F1 for a NEW people-life build item

The night-stealing code is equal both ways and one-core. The worker's claim that her row equals a same-rank NPC holder's is NOT reproduced
(her 32.3 % vs control 21.4 %, 5 fresh seeds), but the cause is outside jsteal: NPCs are jealous of HER only (F1), which makes them harm her
~20× more per pair and hate her, and that low thiện cảm then feeds the (fair) steal formula. Fixing it belongs to the harm/relation layer
(j9 hostility, j24/j28 danger, every harm system that reads them), not to stealing. Shipping this branch is strictly better than main
(main still runs hostility ≥ 50 + flat 6 %, the rule the owner rejected at 14:45Z / 18:55Z).

## 1. Verified independently
- **No player-only shield or softening.** Read all of jsteal.js and every wrapper of stealNight / flip / stealPass (j75 ntCan, jcycle cyTray,
  jflip stoleFrom, jdiff, jcoopworld). The only `t===S` branches: Kính sự phòng card text (UI), co-op guest seat decides only tries against
  herself (r1 PASS). No multiplier on tries against her; no jdiff steal knob (MAIN decision: FLAG 2 of r1 rejected).
- **Two-way inside the act.** want = need(doer) × persW(doer) × stRel(aff/oán doer→holder, same accessors for her and an NPC) × stFear(rank
  gap; custom night now `rkOf(t)>=7`, fixed A1) × oSteal(doer). Win roll oSteal(doer) only; stealWin/stealNight effects the same; her deck card uses
  oSteal(S), stealCost, BAL.steal.failSung, stealWin — same numbers. Unit check 12 (symmetry ×5) PASS.
- **One core.** BAL.steal (cost, failSung, rel, ghen, agent knobs) and BAL.relOan (relAdd + stealKem text) only; ACT steal/road `c:{}` +
  getter; stModes uses ducOf. Reviewer fix: the jbal2 comment still said "oán rel×.6" → "rel×BAL.relOan.hurt".
- **Same-rank equality — NOT reproduced** (bot `night-steal-bot.js`, 20 lives × 3 y per seed, fresh seeds, merged build):

  | seed | her nights | her stolen | her tries/10 | same-rank NPC control nights | control stolen | control tries/10 |
  |---|---|---|---|---|---|---|
  | 13000 | 90 | 26.7 % | 4.11 | 271 | 24.0 % | 3.99 |
  | 37000 | 71 | 38.0 % | 5.92 | 339 | 24.3 % | 3.86 |
  | 89000 | 71 | 26.8 % | 4.37 | 292 | 14.1 % | 2.54 |
  | 97000 | 60 | 40.0 % | 5.83 | 297 | 18.3 % | 4.00 |
  | 103000 | 86 | 32.6 % | 5.35 | 219 | 24.0 % | 3.67 |
  | **pooled** | **378** | **32.3 %** | **5.05** | **1418** | **21.4 %** | **3.68** |

  Her row is above the control on every seed. Whole row: her night 29.9 % (408), NPC night 18.0 % (4876), all tries 3.19 / 10 nights ✓ (target ≈ 3).
  After the second merge (main f03886af with jtwoway), seeds 13000/37000/97000, 60 lives: her 29.1 % vs same-rank control 19.1 % (her night 26.6 %, NPC night 17.4 %,
  all tries 3.27 / 10) — jtwoway narrowed it a little, the gap stays ≈ 10 pts.
  The worker's "rank-2 probe 25.8 % vs 26.2 %" is a different instrument; the bot (worker's own, 31.7 vs 20.6) and this run agree on a ≈ 11-pt gap.

## 2. F1 — where the gap comes from (pre-existing, outside this branch; NEW build item, two-way law HANDOVER.md:L46 / OD:L1386)
Probe `dev/test/night-steal-relprobe.js` (passive bot life, seed 13000, 6 lives × 3 y; per NPC pair-week ×1000):

| | harm acts aimed (npcAct) | relAdd sum by NPC | danger (end) | thiện cảm NPC→ (end) |
|---|---|---|---|---|
| → her | 3.73 | −27.4 | 46.9 | −18.7 |
| → same-rank NPC | 0.17 | +133.5 | 0.4 | +22.9 |
| → her, GHEN0 (every NPC ghen zeroed weekly) | 1.10 | +5.5 | 13.1 | −8.8 |
| → same-rank NPC, GHEN0 | 0.14 | +123.3 | 1.6 | +20.1 |

Steal outcome with GHEN0 (bot `GHEN0=1`, seeds 13000/37000/97000, 60 lives): her 33.9 % → **26.1 %**, control 22.5 % → 21.8 %. The jealousy term is
≈ 60 % of the gap. Asymmetries found (each with file:line):
1. **Jealousy exists only toward her.** `danger` j24.js:4 and j28.js:58 use `t===S ? v.ghen : 0`; `hostility` j9.js:10 uses `t===S ? v.ghen/2 : (t.sung−v.sung)/3`.
   v.ghen is one number per NPC = jealousy of HER; NPCs are never jealous of each other in the harm bands. This drives target pick (pickTarget j8:365),
   harm bands (npcAct), SOC provoke/humiliate/feign gates, jts tsQ, wkNpcUse poison target (j83: `t===S?v.ghen>=50:hostility>=50`).
   Fix direction (whole group): per-target jealousy for everyone (e.g. v.gh[t.id] fed by the same events: nights, gifts, promotions), one formula for her and NPCs.
2. **BAL.hz** multiplies harm chance only when the target is her (j24.js:13, jts.js:102, j70.js:148). Vừa = ×1 (so not a bias on Vừa), Dễ ×.55 / Khó ×1.1 —
   a difficulty knob, owner-visible decision; noted only.
3. **Kind acts that never/rarely reach her:** main's jtwoway (merged here) already made mediate / test / provoke / humiliate shared deeds with one cost and
   one odds (test 55 % for everyone). Still open: "Nương theo" (follow) picks its target from liveRivals only — never her (jtwoway.js:89 twFollowT);
   NPC gift / handmade-work thresholds `v.rel>5` for her vs `rel>0` for NPCs (j8.js:388, j83.js:205); q72Npc errands only NPC↔NPC (j72.js:209);
   affAdd "trust" scaling only on rises toward her (j28.js:67, avg ≈ 1). NPC "kết giao" toward her is a dialog she answers (j24.js:25) — the passive bot
   discards it, which is the fair "her position" part.
   tsLeNpc guests exclude her because she gets the invite panel (jts.js:159–181) — equivalent, OK.

## 3. Tests (merged build)
- unit `night-steal-unit.js`: 29/29 on 10 runs in a row (final build), 0 page errors. **Reviewer fix (test only, game code unchanged):** the test was a coin flip
  (before: 25–29/29 on both the merged and the unmerged branch build): forced odds 95 / 5 left 5 % wrong outcomes → 100 / .001; the ledger test was not forced → force();
  her cycle (jcycle, by tuần) could block her try → reset() moves S.tuan off her cycle tuần; R0 was liveRivals(false) while stealPass draws from liveRivals(true),
  so a thief outside R0 kept un-reset Đức/Sức → R0 = liveRivals(true).
- old save `night-steal-oldsave.js` (origin/main ec315daf build → r2, and again f03886af → final r2): PASS, 0 errors.
- co-op `coop-e2e.js` (Fold host + iPad guest, live Worker): first merge (ec315daf) 59/59. Final build (f03886af merge): 4 runs = 51/59, 57/60, 57/59, **59/59**;
  plain origin/main f03886af: 2 runs = 59/59, 59/60. The failing checks differ every run (rejoin same date, reborn friend name, buổi 2:3 sync, frozen when B left,
  friend starts as Người lạ, fold #next enabled on main) = live-Worker timing; 0 page errors in every run; none names a night/steal step. Weak signal: "week after
  rebirth advances" failed 2 of 4 on r2, 0 of 2 on main → coordinator: run coop-e2e once more at go-live; if that check fails again, dump Q titles
  (a guest-seat Kính sự phòng notice from stealPass would be the suspect).
- shots `night-steal-shot.js` 755x1000 + 1180x820 (+1366x1024): steal result "Thẻ bài của ta được lật · … Đêm nay: <thief>", 0 page errors; no UI change in
  this branch (the pre-existing jflip label overlap on Fold from r1 is still a KIT REQUEST for the kit keeper, not this branch).
- dev/tools/quickcheck.sh does not exist on this base → not run.
- Bot gains `GHEN0=1` (counterfactual) for the F1 follow-up.

## Branch state
review/night-steal-r2 = merges onto origin/main ec315daf and f03886af + reviewer fixes (jbal2 comment, unit test determinism, bot GHEN0, relprobe) + this report; site rebuilt. Not pushed to main.
