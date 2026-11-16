# npc-jealousy — NPC per-target jealousy for everyone, one formula

Worker: session_011xDdVNFb12V5k5VFx1eX1m (opus) for Foreman C (now session_011xDdVQKn56reGyLzWPb9oC). START_CTX ≈ 3 % of the window.
Branch: **review/npc-jealousy** from origin/main 1aa0edb2. Code commit 89f50020, site build 9148d83f.
Finding: dev/handover/reports/night-steal-r2.md §2 F1 (on review/night-steal-r2, now in main). Law: OD:L1386, HANDOVER.md:L46.

## SẴN SÀNG KIỂM 9148d83f

## 1. What changed (one formula, j9.js next to aff/oan)
- `ghenOf(v,t)` / `ghenAdd(v,t,n)`: v.ghen stays = v's jealousy of HER (UI, saves, co-op swap ghen↔gp[pid] untouched);
  **v.gp[id]** = v's jealousy of anyone else. jcoopworld already keeps `gp` keyed by player pid (901/902) — NPC ids are < 900, so the same map
  holds NPC→NPC and NPC→co-op friend with no new co-op code. Missing gp = 0 (lazy old-save fill); a value that drops to 0 deletes its key.
  The player gets no invented ghen bar (ghenAdd(S,…) is a no-op, as before).
- `ghenAt(p,n)`: everyone else's jealousy of p (p = her → the old ghenAll, so the jmood wrapper still applies). Đa tình ×1.5 for all.
- `ghenWeek(v)`: the weekly drift that existed toward her only (Sủng-gap liking −1, Hoàng hậu cools on rank ≥ 4, Sắc > 75 → +1, decay 3/1 by liking)
  now runs for every pair; numbers in **BAL.ghenW** (jbal2), none typed.
- `ghenMax(v)` for "is she jealous at all" reads (jmen, j95 tranh sủng).

## 2. Whole group — before/after (scan: `grep -n "\.ghen\b" dev/build/j*.js`, every hit read)
| place | before | after |
|---|---|---|
| danger j24:4, j28:58 | `t===S?v.ghen:0` | ghenOf(v,t) |
| hostility j9:10 (→ pickTarget, rivalsTurn want, wkNpcUse, jwd92b, jdress, jface) | her: ghen/2; NPC: (t.sung−v.sung)/3 proxy | ghenOf(v,t)/2 for all |
| npcAct bands / mindMenu / SOC gates / jts tsQ / j70 plots | via danger (her only) | via danger (everyone) |
| rivalsTurn want j8, j9 rivalsBuoi copy | `t===S&&v.ghen>=60` | ghenOf(v,t)>=60 |
| j8 old npcAct `hi` (dead, overridden) | her: ghen / NPC: hostility | max of both |
| wkNpcUse j83:204 poison target | her: ghen≥50 / NPC: hostility≥50 | either, for all |
| wk gift j83:206 | her rel>5 / NPC rel>0 | rel>0 for all |
| j8:388 gift `rel>0 \|\| t===S&&v.rel>5` | (already equal: rel(v,S)=v.rel) | unchanged |
| j28 affAdd trust scaling | rises toward her only | rises toward anyone |
| twFollowT (Nương theo) | liveRivals only — never her | others(v): her too |
| NPC night (j75 rivalNight) | no jealousy | ghenAt(v,8) = her nightFx ghenAll(8) |
| NPC promotion (j8 promoteP, j34 seat, jexam grace) | none / oán from all | ghenAt(p,10 / psk.ghen); jexam: she gets the oán (no ghen bar) |
| NPC reward bestow j20, son birth j8:325, pregnancy shows j8:310 | her only | ghenAt(p,…) |
| contests j71 (4 places), kids' exam j53 | her winner only | ghenAt(winner,…) |
| NPC announce / flaunt (jtwoway, j28) | others' ghen **of her** rose | ghenAt(doer) |
| NPC dance j75:164, garden walk jgift:206, luxury jinv:289 | others' ghen of her | ghenAdd(x,doer); luxury lost the NPC ×.5 |
| stealWin j8:129, provoke j28/jtwoway, ally j8:88, thHH jtwoway | victim's ghen **of her** moved even when an NPC did it | ghenAdd(victim,doer) |
| monopoly j75:175 | her: ghen+2 / NPC: oán+2 if malice≥40 | both: ghen+2, + oán if malice≥40 |
| scar j70 | her: others' ghen −6×sev | anyone |
| j70 motives "ghen" | her Sủng rise only (z.sh) | per-NPC Sủng history z.shv, same 8-in-4 rule |
| j70 plot motive / text, tsWish jts:157, j95 ledger gh | her ghen / NPC Sủng-gap proxy | ghenOf |
| j10 faction split, j9 pair quarrel, j68h rumour, j8 pregnancy plot | v.ghen (of her) between two NPCs | ghenOf of that pair |
Left as is (her-only by nature: dialogs she answers, her UI, her toilette, her cards): j2/j7/j24/j25/j42/j63/j68e/j75 snapshots, jtoil, jtsb, jts lì xì, j96, j95b weights, jroute, jpet, j15/j61 cards.
**Noted, not changed:** BAL.hz (difficulty knob ×her only, Vừa = 1, owner-visible); q72Npc NPC↔NPC errands — her side is q72 (people come to her), equivalent;
NPC "kết giao" toward her is a dialog she answers (fair).

## 3. Bot before/after (main 1aa0edb2 vs this branch; same seeds)
Stolen nights — `night-steal-bot.js` 20 lives × 3 y × seeds 13000/37000/97000 (60 lives each), `night-steal-sum.js`:
| build | her nights | her stolen | same-rank NPC control | control stolen | gap | all tries / 10 nights |
|---|---|---|---|---|---|---|
| main | 220 | **29.1 %** | 882 | 22.3 % | +6.8 | 3.45 |
| npc-jealousy | 266 | **23.7 %** | 973 | 26.1 % | −2.4 (noise) | 3.84 |
Harm / liking — `night-steal-relprobe.js` (passive life, 6 lives × 3 y), per pair-week ×1000:
| seed | build | harm → her | harm → NPC | relAdd → her | relAdd → NPC | thiện cảm NPC→her | NPC→same-rank NPC | danger → her | → NPC |
|---|---|---|---|---|---|---|---|---|---|
| 13000 | main | 13.06 | 0.26 | −121 | +124 | −28.4 | +14.8 | 78.6 | 3.0 |
| 13000 | new | 0.59 | 0.74 | +16 | +86 | −7.0 | −0.9 | 12.8 | 27.4 |
| 37000 | main | 5.13 | 0.18 | −74 | +116 | −20.1 | +13.6 | 58.2 | 2.6 |
| 37000 | new | 1.83 | 0.49 | −16 | +57 | −6.6 | −14.9 | 10.4 | 35.8 |
The 20× harm gap is gone. In this passive probe she gets ~0 nights per life while same-rank NPCs get 3–5 (`npc-jealousy-probe.js`: ghen → her 1.7–3.9,
→ same-rank NPC 31.9), so their higher danger now is earned by nights, the same rule. Side effect: all tries 3.45 → 3.84 / 10 nights (more NPC↔NPC
jealousy → more steals between NPCs); BAL.steal.k is the knob if the coordinator wants ≈ 3 again — not touched (not my numbers).

## 4. Tests (this branch)
- `dev/test/npc-jealousy-unit.js` (new): 15/15 PASS, 0 page errors (accessors, clamp, old save without gp, danger/hostility equal for equal numbers,
  NPC night = her night jealousy, ghenAt = ghenAll, steal victim jealous of the thief, ghenWeek equal, Nương theo, NPC ids < 900, ser keeps gp).
- `night-steal-unit.js` 29/29, 0 page errors.
- Old save: `two-way-oldsave.js` main-build save → this build, 40 weeks, 0 errors (night-steal-oldsave.js prints FAIL only because it expects a pre-BAL.steal
  old build — on main→main it FAILs the same way; its other checks pass).
- **co-op `coop-e2e.js` 59/59**, 0 page errors (Fold host + iPad guest, live Worker). Host computes jealousy (agency muted on the guest); gp travels in W.R.
- No player-visible text changed → no Fold/iPad shots.

## 5. Merge note for review/npc-agent (AG1, session_011xDdVQdAMNqfygpH41qGcQ)
review/npc-agent is based before night-steal; a trial merge conflicts in j8, j10, j70, jbal2 (+ built files) — all adjacent-line conflicts with its
mindPickBy edits, keep both sides. The agent loop should read `ghenOf(v,t)` / `danger(v,t)` (pure, no side effects). Told that worker by send_message.

## Handover (if a successor is needed)
Done except review. Worktrees: /home/user/wt/jeal (branch), /home/user/wt/jeal-base (main build for before runs), tools /home/user/wt/jeal-tools, outputs /home/user/wt/jeal-out.

---
# r2 fixes (answer to npc-jealousy-r1.md FAIL) — SẴN SÀNG KIỂM 7ba04507
Branch review/npc-jealousy: merge origin/main 60eb3d93 (generated files only conflicted), code+build 2450e40d, test 7ba04507.

| r1 item | fix |
|---|---|
| 1 unit test not deterministic | page RNG seeded (addInitScript); random night reward `bestow` stubbed in the night case (both sides have it); `S.tonight/S.ntk` reset before the steal case; Sắc +1 kept out of the decay case (BAL.ghenW.sac lifted in-test); jemo mood aimed at one person switched off in the danger case. **10/10 runs green, 20 cases** (and 34 more runs green while hunting) |
| 2 start jealousy her-only | **nobody starts jealous**: j1 newRival `ghen:R(15)` → 0 (gp starts empty) — one rule for every arrival site (j2/j3/j7/j8/j14/j27/j55/jcoopask all go through newRival); co-op join (jcoopworld r[m][mp]) no longer rolls a guest-side R(15) for gp → host and guest both 0 (fixes the r1 co-op note too, host-computed) |
| 3 j20 queenRewards | `ghenAdd(w,q,-BAL.ghenW.qReward)` (5, in BAL); re-grep of raw `.ghen` writes: the rest are her dialogs/cards/UI (j2 acts, j7/j24 events, j42 maid, jtoil, jts, jtsb, jne, jroute, jthaiy her pregnancy) |
| 4 jexam hậu thưởng | jealousy only, the same both ways: her → ghenAll(psk.ghen) (text unchanged), NPC → ghenAt(p,psk.ghen); the her-only `oanAdd(S,p,B.oan)` removed (B.oan was not a BAL.psk key) |
| 5 stale gp keys | `ghenGone(k)`: NPC id < 900 not found or dead → pruned every week in ghenWeek and skipped by ghenMax; pid keys ≥ 900 kept |
| found while testing | as a **cung nữ** she is not in consorts(), so ghenWeek skipped her row (her ghen never decayed — a regression vs main). Her row is always in the weekly loop now (unit case) |

Tests on the merged build: npc-jealousy-unit 10/10 × 20 cases, night-steal-unit 29/29, old save (two-way-oldsave, current main build → branch, 40 weeks) 0 errors,
**coop-e2e 59/59** on an idle box, 0 page errors. Bot (night-steal-bot 20 lives × 3 y × seeds 13000/37000 = 40 lives/build, current main b53…):
| build | her stolen | same-rank control | gap | all tries / 10 nights |
|---|---|---|---|---|
| main | 24.0 % (171) | 20.1 % (607) | +3.9 | 3.54 |
| r2 | 21.7 % (157) | 25.5 % (1026) | −3.8 (noise, sign flips between seed sets) | 3.67 |
Noted, not changed: jroute.js:282 her-only danger ×.6 while S.rt.ad is on (a road effect of hers); jmood ghenAll mood factor (NPC mood bar = separate feature, r1 note).
