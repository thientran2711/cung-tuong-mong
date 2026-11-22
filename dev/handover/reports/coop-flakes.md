# coop-flakes (D20 worker, session_01964izE5gLnvQcVeUAZdUGJ) — review/coop-flakes
PRIORITY #1 CHECK: per brief D20-coop-flakes.md (OD 0 | ledger 0 | claims 0 | main 0 | review/* 0); remapS / keyMove / linkRange: main 0, review/* 0 (git grep), coop-guest-men does not touch remapS (Foreman D). START_CTX ≈ 4 %.
Base = LIVE 40cc2b92 (= review/coop-guest-staff-rv3). Foreman D GO (19:31Z/20:45Z): patch remapS here, BIG co-op, BAL bounds, cap flake (a).

## (b) coop-guest-maid «her links moved to the world id» — REAL GAME BUG (fixed)
Root: jcoopask.js:63 remapS (guest settle, stand-in id T → world id R): `if(r!=null&&!(nk in o))o[nk]=v; delete o[k]` — when R already holds a link
(the host ran her week with the real consort; affAdd j9.js:32 starts a missing link at 0) it KEPT R (the week's delta) and DROPPED T (her real link).
Proof (probe = B's deser input + host's copy of B, every run):
| run | game | rlT (her link) | rlR (week delta) | result me | test |
|---|---|---|---|---|---|
| mb-1 base | LIVE | 22 | 2 | 2 | pass (loose check) |
| mb-2 base | LIVE | 25 | 2 | 2 | pass (loose) |
| mb-3 base | LIVE | 25 | — | 25 | pass |
| mb-5 base | LIVE | 19 | −3 | **−3** | FAIL (sign flip) |
| ml-2/3/5 LIVE driver | LIVE | ~25 | ? | 4 / 2 / **−7** | ml-5 FAIL |
So her thiện cảm toward the promoted maid was lost in EVERY week that touched the world id; the old check (same sign, |Δ|<|rel|) only caught a sign flip (~1 in 3).
Fix (law 6b one person one link, law 4 one core): COOPW.keyMove(o,from,to,pk) (jcoopworld.js) — the two numbers ADD, clamped to BAL.coop.linkRange[pk]
(NEW BAL key jbal2.js: rl [-100,100], ro [0,100] = the bounds affAdd / oanAdd keep); other values: the one at `to` stays; to==null drops (refused).
remapS (jcoopask.js:61-66, remapS lines only) and the family site jcoopthinc.js:270-271 (lens re) both use it.
Law 1 two-way: the host never remaps (it makes the world id directly), so both seats now keep the same link for the same person; the newcomer's own link to her (hNp n.rl[GP]) is set at creation, no remap.
Test: coop-guest-maid exact check «her link = rlT + rlR (clamped)» (+ the loose me-sign check dropped: a week may legally flip it); coop-keymove-unit.js (NEW, 11 checks incl. clamps, "r"+id keys, refused).
After fix: exact check 6/6 (mf-1..4, mg-1..2: e.g. 19=19, 25=25).

### Family scan (co-op id-key move / keep-first-drop-rest numeric merge; grep of `delete o[k]` + key moves in dev/build/jcoop*.js, jdc, jmline, jnamefix)
| site | what | before | after |
|---|---|---|---|
| jcoopask.js:61 remapS | stand-in → world id, all S maps (rl, ro, counters, "r"+id) | keep target, DROP moved | keyMove: add (rl/ro clamped) |
| jcoopthinc.js:270-271 lens re | a person the host had to re-id: rl / ro / known + nested | OVERWRITE target (drop the week's) | keyMove: add |
| jcoopthin.js:84 mapView | me ↔ pid swap | bijective swap, no loss | unchanged (OK) |
| jcoopworld.js:72 canon | me ↔ pid key | swap, no loss | unchanged (OK) |
| jcoopworld.js:146-152 friend-entry write-back | writes changed values of her friend entry as ABSOLUTE into her stored person | lost update only if her stored copy moved in the same window | NOT changed — different family (absolute vs delta), no repro; FOR FOREMAN |
| jnamefix.js:19 name-key rename | keys with an old name → new name | numbers: max | unchanged (levels by name, deliberate) |

## (a) coop-pets «stress round 3: week merged» — NOT REPRODUCED (capped per Foreman D)
0 fails in 20 runs = 80 stress rounds: 5 base (pb), 6 fixed driver (pf), 5 LIVE driver (pl, all 3 stress rounds pass; its step-5 fails are the old LIVE driver, fixed by coop-guest-staff), 4 × 8-round (ps, 78/78 each), + 5 gate runs (pg). Code read: guest pend:true + sent = last week means her endTurn ran but sendEnd is held — by cyHer() (jcoopworld.js:1221: at level ≥ 5 her end waits for the HOST's end) or Q/mg/resWait. So the rv's guest-only dump points at the HOST not ending. The stress FAIL now dumps BOTH seats (Q titles, cyHold, cyHer, ended, inLife, tr 16). A related host stall was caught in coop-guest-maid (below): host Q held «Biếu quà làm lành» while #next read «Chờ hảo hữu…» — the same «host end never goes» shape.

## Other flakes found on the way
| # | test | root | verdict / fix |
|---|---|---|---|
| 3 | coop-pets «A has the stolen pet with its stage» (pb-4) | B lost the crane to thaopet; A's friend entry still showed it (live pos lags); tg2 = crane, the steal took the cat | TEST RACE: lib/coop-real.js syncFr(X,Y) (wait until X's entry of the friend = Y's own list) before each of the 4 aims in coop-pets. Family: 38 drivers read COOPW.friend(); only coop-pets aims an act at an item read from it (coop-p2 writes into it in a set-up) |
| 4 | coop-pets «set-up is real on both seats» (pb-1: host rank 3 → 2) | screen-only set-up vs a rebuild landing on the host in the same moment (hypothesis; 0 recurrences in 15 later runs) | TEST: set-up must hold 1.5 s on both seats, else printed (SETUP-RESET + rank trail) and written again |
| 5 | 33 co-op drivers «no page errors» (mb-2 ipad after rejoin) | Chromium «Blocked call to navigator.vibrate» on an untapped rejoined page | TEST: filter (already in 10 drivers); 33 drivers patched, 0 left |
| 6 | coop-guest-maid step 2a/3a «week advanced» (mb-2, mb-4) | host Q = «Biếu quà làm lành», pend:true, #next «Chờ hảo hữu…», guest ended | OPEN, dump added (SCR + clear result + Q[0] + modal hidden). FOR FOREMAN (likely same as (a)) |
| 7 | coop-guest-maid step 3 «third maid rose» (mf-4, 1/6) | guest rank 1 at step 1 → 0 by step 3 (cap [1,0] = no room); the rank-1 set-up is screen-only | OPEN (test set-up; coop-real port candidate). FOR FOREMAN |

## Gates (head below, game = LIVE 40cc2b92 + this fix, one browser at a time)
| gate | result |
|---|---|
| coop-pets final driver ×5 | 58/58 ×5 (pg-1..5) |
| coop-guest-maid ×6 with fix | 40/40 ×5 (mf-1,2,3, mg-1,2); mf-4 37/40 = #7 (step-3 set-up, not the links check) |
| exact links check | 6/6 |
| coop-keymove-unit | 11/11 |
| coop-e2e | 141/141 |
| coop-famops-unit | 33/33 |
| one-core-guard | PASS (fails 0) |
| role-parity.test.js | ALL PASS (672 s) |
| quickcheck.sh | QUICKCHECK PASS · old save ok · perf new/live render 263/227 ms, tab 446/493, buổi 1314/1288 · core gates PASS |
Site rebuilt (build_site.sh: index.html, sw.js, assets.json).
Commits: 492f1b19 (test WIP: syncFr, probes, vibrate family), 93816a3a (game fix + exact check + unit), 23b7cce5 (set-up hold, site rebuilt). No pull request; worktrees /home/user/wt/flakes{,-live} kept until review.

SẴN SÀNG KIỂM review/coop-flakes 23b7cce524d194822af1446aa59c3f8e1a2f7b92
