# coop-reg9-route — FIXER report (Foreman B ROOT 2 child 2; opus; session_01N1tNP3un1wpGRWEeauvwMp, depth 3)

PRIORITY #1 CHECK: 'reg9' → OD 0 | ledger 0 | main: dev/build/jcoopthinf.js only (7 reg9 calls) | review/coop-thin-g-land ec88b0e2 same 7 | review/mg-trim c961211e + shelfPlantGive (8) | no other worker on it (CLAIMS / FOREMAN_B_STATUS). Reused: coop-clear MAKING / lifeWait (SELSCENE-17), lib/coop-real.js realize, coop-e2e clear.

## Verdict
**The level-9 routing is NOT broken.** Every reg9 intent routes to the host (sent 1, host runs it once in her context, both phones equal) whenever her life on her phone is a playing life. The fault is in the **co-op test drivers**: since SELSCENE (jselxday) every origin plays 3 selection days, and the drivers' world wait (`inW`: world + a coop entry) ends while both seats are still inside them. The driver's `clear()` then answers her selection-day cards between rows; a contest she loses (`chooseM → selxContestRun → selxBanHoa → over`, stack captured with a setter on `S.dead`) ends her life ON HER PHONE (the designed co-op dying road → Luân hồi). Every intent tapped after that finds `S.dead` / `COOPW.inLife` (thin F `gOn`) and takes the local road: **sent 0 for EVERY registration**, at every level (not only reg9). Timing/roll decides which rows it hits.

## (1) Reproduce
| run | result | her phone at the tap |
|---|---|---|
| LIVE 6b5d3d05, f4 ROWS=G (D's repro) | G1 FAIL sent 0 local 1, D1 FAIL | `S.dead:true` (host copy alive) |
| LIVE 6b5d3d05, f4 full | 17/19, G1 + D1 ok (sent 1), P2/P3 FAIL | alive at G |
| review/mg-trim c961211e, f4 full | 9/21 — P1…T1, G2, D1 all local sent 0 | `S.dead:true` before P1 (same stack) |
| review/coop-thin-g-land ec88b0e2, f4 full | **19/19** | no selection days: its base 5e013076 predates jselxday (and has no coop-clear MAKING) |

## (2) Why intents ran local
`F.reg` wrapper: `if(!gOn(R.lv)){F.stat.local++;return f.apply(...)}`; `gOn` requires `!S.dead && !CW.inLife`. Probe at the tap (G1, LIVE): `on9 true, seat b, ctx/inLife/inFC/allow/allowN/inWorld false, S.dead TRUE`. Not the L9 gate, not CX9, not registration order (all 7 registered, `F.R[n].lv===9`, `window[n]` = wrapper), not `mine()`.
In real play a dead phone shows her ending card, no plant/pet taps exist → no product change (the local fallback for a non-tap context stays as is).

## (3) ONE rule (LAW 11, whole driver family)
`dev/test/lib/coop-real.js`:
- `lives(A,B,clear,ok)`: waits the coop-clear `MAKING` state away (selection days, a kit selection scene, `S.dead`, `COOPW.inLife`) on BOTH seats with a player's taps (the driver's own `clear`, else coop-e2e's), one ok row «both lives made before the rows»; failure dumps both seats' `SCR`. `NOLIVES=1` = old road. No-op on a base without `MAKING`.
- `realize()` calls `lives(..., {guard:true})` first = the family guard: a driver that never called it waits the same way and FAILs loudly if a life was reborn under its set-up.
- All **25** drivers with a world wait call `lives(H,G,clear,ok)` right after `await inW();` (before their screen set-up, which a rebirth would wipe): bongloc-coop(-catch), coop-arrive-see, coop-c4-stuck, coop-craft-hand, coop-ge-npc, coop-mg11-hand, coop-palace-life, coop-places, coop-relms-both, coop-thancan, coop-thin-c(-perf), coop-thin-d(-probe), coop-thin-e(-perf), coop-thin-f1/f2/f3/f4, coop-week-lag, econ-tamco-coop, pm-coop-d, wear-slots-coop. realize-only drivers (coop-cyc, coop-cyhold, coop-thin-e-net) are covered by the guard.
- `coop-thin-f4` act(): `mk` = MAKING at the tap is recorded per row; a row FAILs on it (a life being made is never reported as a routing result).

### reg9 family table (f4 rows; level 9)
| intent | row | before (LIVE ROWS=G / mg-trim full) | after (fix, swap 0 · swap 1 · ROWS=G) |
|---|---|---|---|
| petDo follow / free | P1 / P2 | mg: local sent 0 | ok · ok |
| kitShopBuy pet (reg8 at on(9)) | P3 | mg: local sent 0 | routed sent 1, st ok (swap0: content check FAIL, see open 2) · ok |
| petcMaid | P4, D1 | mg: local; LIVE G: D1 sent 0 | ok · ok · D1 ok |
| petcQuick | P5 | mg: local | ok · ok |
| shelfPlantQuick | G1 | LIVE G: **FAIL sent 0**; mg: local | ok · ok · **ok** |
| shelfPlantGive (mg-trim only) | G2 | mg: local | inherits (test-only fix merges cleanly onto mg-trim) |
| rcpAskGo ty / maid | K1 / K2 | mg: local | ok · ok |
| rcpRead | R1 | mg: local | ok · ok |
| tdsRun prac | T1 | mg: local | ok · ok |
Guest-side actions in the level-9 areas NOT registered (scan of jshelf / jpet / jpetcare / jrcp / jtds click handlers): `shelfPut` / `shelfTake` (her own inv ↔ her own shelf, no world, no roll → her person diff, part D/E road, keys not in E.BAD) · `rcpMaster`, care-game / water-game openings (`petcFeed/Bath/Play`, `#kshpgo`) → their END is F5 (level 10) · `rcpAskQ`, `tdsPractice` = decision cards whose choice calls a registered engine (rcpAskGo, tdsRun). Nothing that should travel at level 9 is left unrouted.

## (4) Tests (branch review/coop-reg9-route, base LIVE 6b5d3d05; test-only, `assemble.py` build = LIVE's 17817809)
- base FAIL: LIVE f4 ROWS=G G1 FAIL (sent 0) · mg-trim f4 9/21.
- fix PASS: f4 swap1 **20/20** · f4 ROWS=G **10/10** · f4 swap0 17/20 (see open 1, 2: the new row FAILs loudly instead of a false routing FAIL).
- MUTATE: NOLIVES=1 f4 ROWS=G → 7/9: G1 FAIL with `mk:true` (her life still being made at the tap), D1 sent 0 = the reported fault, now named.
- coop-e2e SWAP0 **143/143**, SWAP1 **143/143** · coop-keymove-unit **12/12**.
- coop-thin suite (LIVE worker default; this is a LIVE-based branch, the chain's THINMAX 13 is not on LIVE): f4 L9 as above · f3 L8 fix 38/39 (only FAIL «no page errors»: jagent rkName reading 'n') vs LIVE base 37/38 (B1) · f1 L6 fix 19/36 vs LIVE base 15/24 — same FAIL classes on both (the act-kind sweep, F2 pet rows, page error «reading 'n'» in places/rkName): pre-existing, all f1 rows routed (sent 1, local false). The fix runs MORE rows (base stopped at 24: her life ended mid-run).
- quickcheck ALONE: build byte-identical to LIVE (17817809, test-only) · open 2170 ms 0 errors · old save loads + plays a buổi · gates: G4 «Ô lưu · Lui» (pre-existing, on the chain's own report) + kit-dialog-2 empty Tốn/Được cell (build-identical → pre-existing on LIVE) · perf step not finished (my 15-min timeout killed it; the selection rerolls «ban hoa → reroll 4/20» made it slow).

## BASE / landing
- ec88b0e2 does not show the gap (no selection days on its base) → no fix needed there as it stands; when the B chain is rebased onto LIVE (≥ SELSCENE) it MUST carry this commit (conflicts there only = adjacent lines in coop-thin-f1..f4: keep both sides).
- The fix applies cleanly on LIVE (branch review/coop-reg9-route IS from LIVE 6b5d3d05; no separate -live branch needed) and merges cleanly onto review/mg-trim c961211e (git merge-tree: 0 conflicts) → D5 mg-trim G2 inherits it by merging this branch.

## OPEN (not this fault; for Foreman B / the SELSCENE owner)
1. **Stuck ban hoa scene (guest, swap 0)**: her life ended at the selection (`S.dead`, modal «Duyên cung lỡ hẹn» → Chuyển kiếp queued) but the kit selection scene «Thái giám … — ban hoa! Chạm để tiếp ▸» stayed up through 822 player taps for 8 min → the bot (and a player) cannot reach «Chuyển kiếp». lives() reported it (FAIL with SCR dump); 1 of 4 runs.
2. f4 P3 (kitShopBuy pet): routed (sent 1, host ran, st ok) but the bạc/pet content check fails sometimes (also on the LIVE base full run); not routing.
3. f1 / f3 pre-existing on LIVE: page error «Cannot read properties of undefined (reading 'n')» (places / rkName, guest + jagent on host), f1 act-kind sweep + F2 pet rows — likely a rank index out of the table after a reborn life / staged rank; not routing.

## REVIEW (rv coop-reg9-route, sonnet fresh; 5af1ed9f75fc8520bd29be835f3fbf4b7f69617f)
PASS. (1) `git diff origin/main...review` = only dev/test/** (26 files); diff vs base 6b5d3d05 outside dev/test = empty; assemble.py = built 17817809 (= LIVE). (2) Claim true: f4 swap0 20/20, swap1 20/20 — every reg9 row (P1–P5, G1, K1, K2, R1, T1, D1) sent 1, host ran once, both phones equal; ROWS=G 9/10 (G1 + D1 ok; only FAIL = pre-existing page error rkName «reading 'n'», fixer open 3). Base 6b5d3d05 ROWS=G: G1 FAIL (her phone still in «Ngày thứ nhất — Nhập cung» selection days at the tap; 7/9). (3) NOLIVES=1 ROWS=G: 6/9, G1 FAIL with mk:true + D1 sent 0 = loud, named; lives() FAILs with SCR dump on timeout (8 min) / reborn guard, never skips. (4) 25/25 inW drivers call the one lives(); 10 realize-only drivers covered by the realize() guard; no private copy. coop-e2e COOP_SWAP unset 143/143, COOP_SWAP=1 143/143; keymove 12/12.
Notes (non-blocking): the 3 «spot-check by hand» = the f4 rows themselves (no separate hand drive). coop-thin-a / coop-thin-b have the same inW wait but no lives()/realize (they test the life card itself; no intent routing rows) — optional follow-up. Fixer saw swap0 17/20 once (stuck ban hoa scene, open 1); my swap0 run 20/20 — flaky-by-roll, the driver now fails loudly instead of a false routing FAIL.
