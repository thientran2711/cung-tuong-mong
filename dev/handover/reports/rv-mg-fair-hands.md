# rv-mg-fair-hands — BIG opus review of review/mg-fair-hands (items (1)-(4) + ITEM (O) origin-arts) — VERDICT: PASS (HOLD)
PRIORITY #1 CHECK: OD 20/11 ~01:10Z / ~01:18Z / ~01:42Z / ~01:50Z / ~02:05Z / ~02:15Z (brief cag25-mg-fair-hands.md, all canon overwrites of OD 17/11 ~16:20Z (f)) | main 72922870: jmgt mgHand skew, jmgcal mgCalBand up/dn, jbal2 BAL.ag.mg2.hand {lo,hi,w,skew}, j1 ORIGINS art:{} | review/* only this branch | claims: mg-fair-hands row
Reviewer session_01Rc5AsJbDbaQz3Zhnt9WSz8 (foreman C-AG #26). Reviewed 4ab03cd vs LIVE main 72922870 (branch already contains it). **Final sha 3fe8727** (= 4ab03cd + one reviewer fix + site build; origin/main still 72922870 at push, no re-merge needed).
HOLD (OD 20/11 ~01:42Z): judged mechanism + data only; the split / band / bậc numbers wait for the owner's calibration + ratio.

## Reviewer fix (3fe8727, dev/build/jmgt.js mgNpcRaw)
The upbringing board lift (o.lv = mgOrgLv when above the NPC's own level) ran even with `BAL.ag.mg2.hand.on = 0`, which the jmgt comment documents as "one skilled-bot curve for everyone, as part 2b". The lift is part of the hand rule (BAL.ag.mg2.hand comment), so it now sits behind `H.on` like the rest. No change with hands on (the live game). Rebuilt site, QUICKCHECK PASS again (179 s, old save ok, core gates PASS).

## Laws
| law | result |
|---|---|
| 2 equal value | PASS. Every road of one origin: same Σ bậc and the same training points (origin-arts test 4). Across origins (rolled at the roulette, not chosen): 7-bậc nobles carry existing costs (tt Hoàng hậu −15, nc Thái hậu −15, bd −20); ch 6 with Thái hậu +40 but Hoàng hậu −5; poor 4–5 bậc with other help (muoi bạc 320, thd tài/đức, cnv servant road). No identity clearly best. |
| 3 gain-and-loss | PASS. No option became cost-only; upbringing adds skill to NPCs (she meets stronger and weaker ones). |
| 4 one core | PASS. BAL.ag.mg2.hand {on,w,split,eq,far,art} (jbal2.js:1093) and BAL.orig.art (jbal.js) are the only numbers; mgThird / mgCalBand / mgHandEff / jslap / jhd read them; only structural clamps (level 0..5) in code. One-core-guard PASS. |
| 5 harder as she climbs | PASS as briefed: rank gives no skill (test "rank alone = same hand"), upbringing does (item (3) honoured). Law 5 holds through HER board (her average play 9.0 → 6.2, rank 0 → 7). **Note for MAIN (not a FAIL, outside the brief):** the owner's premise "high ranks lean strong because most are noble-born" is not true in today's court generator (origins spread evenly over ranks; her win share vs same-rank consorts stays ≈ 70–80 % across ranks, report table C). If she wants it, that is a separate order on the court generator / origin roads / promotion weighting. |
| 6 real world | PASS. 40 identities from code (10 roots × 4 real ARC67 roads), one-line story reason per art per road in the worker report; NPC's own arts + identity drive her hand; old saves keep arts (origin-arts test 6; start-only wiring in j2), nothing re-rolled except hands via band sig "t/lo/hi". |
| 7 wording | n/a — no player-visible text changed (odds still via oddsCl ladder). |
| 11 whole group | PASS. Every hand reader: jmgt mgNpcRaw (j71 contests + odds, j82, jexam, jts, j83, j85), jslap slapNpcDraw (now symmetric), jhd hdNpc (mean = eff − w/2), jmgcal mgCalBand. No other reader of p.mgH / mgHand / mg2.hand; no reader of ORIGINS / ORIGIN_BR `.art` left (grep). |
| 14 canon overwrite | PASS. hand lo/hi/skew and cal up/dn/min/max deleted (test 1 asserts), all ORIGINS / ORIGIN_BR art:{} removed (moved into BAL.orig.art ""), BAL / jmgt / jmgcal / jslap comments rewritten in place, no two versions. |

## Measures (worker tables checked against my runs)
- Three thirds, average untrained set: dan 33.5 / 32.2 / 34.3 %, co 33.9 / 33.5 / 32.6 % (mg-fair-hands test, my run); middle NPC plays her base (8.31 vs 8.3; 7.49 vs 7.5).
- Win share vs an equal NPC 49.9 %; one art level above → plays clearly higher, below lower; noble-born beat her in their house arts (report table B: Tể tướng at Đàn 14 %, princesses at Múa 12–13 %), commoner maids ≈ 44–52 %.
- **Effect for the ratio step (measured here, scratch script, hands ON, fresh lives):** NPC promotion-exam pass rate, mean over the court: main 3–9 % → branch 87–94 % (least prepared NPC 22–68 %, so NPCs still fail). The old skew made NPCs almost never pass; MAIN should know NPC promotion pace changes a lot when this lands.

## Tests (run by me)
| test | branch 4ab03cd / 3fe8727 | main 72922870 |
|---|---|---|
| origin-arts | 8/8 ok | — |
| mg-fair-hands | 15/15 ok | — |
| ag-mgh | 10/10 ok | — |
| ag-mgcal | 14/14 ok | — |
| mgcal-apply.test.sh | 7/7 ok | — |
| mg-skip | 16/16 ok | — |
| slap-mg | fails ["marks"] | fails ["marks"] → **pre-existing** |
| ag-mg2 summons (calls / median) | FAIL every run | FAIL every run (median row in 1 of 2) → **pre-existing** |
| ag-mg2 "exam: an NPC can fail" | FAIL in 3 of 6 runs | ok in 2 runs |
| QUICKCHECK (old save) | PASS 4ab03cd (182 s) and PASS 3fe8727 (179 s) | — |
ag-mg2 exam row: not a mechanism fault. The check runs with hands OFF and uses "twins" = NPCs copied from her arts. On main that twin already passes 95–99.8 % (600 draws; 99.5 % even with all arts 0); her new start arts (bậc 1–2 from her identity) push it to 100 % in some lives. It is a tight test margin + the item (O) data, intended. Follow-up for MAIN (optional, test-only): raise N or zero the twin's start arts in dev/test/ag-mg2.js r4.

## Notes (no fix needed to PASS)
1. quickcheck deletes the untracked-looking `_aa.html` in the worktree (tracked file) — restored before commit; worth a look by the tool owner.
2. Old saves: arts kept; NPC hands re-roll once (band sig), and the live art / upbringing lift applies to old-save NPCs from the new table — intended.

VERDICT: **PASS mg-fair-hands+origin-arts 3fe8727 (HOLD)** — lands only after the owner's calibration + ratio OK (OD 20/11 ~01:42Z). Reviewer context ≈ 25 % at end.
