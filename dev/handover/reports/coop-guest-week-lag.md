# coop-guest-week-lag (B7, opus) — report
PRIORITY #1 CHECK ('week-lag|bongloc-coop|E.base|seat desync|wkBase|stale view'): OD 0 | ledger 0 | claims none for this bug | main: dev/build/jcoopthine.js E.base (no week guard) | review/*: **review/coop-thin-g r1 e7b996f2 «seat desync fix» (also on review/coop-thin-g-f1) = the SAME root cause, fixed on the SAME lines, level-13 lane, not live** → reused verbatim (below) | archive: reports/bongloc-options.md «FIX ROUND 3» (E47 drift table), reports/coop-thin-g.md.
Worker session_01N1tNP46DparCmsaQ6RRX48 (opus), coordinator Foreman B (ROOT-7 2aR9i32D → ROOT-8 5aArhXJq). START_CTX ≈ 5 % of 1M (estimate) → rollover ≈ 30 %, ceiling 60 %.
Branch **review/coop-guest-week-lag** @ **0860f601** (base origin/main 04afaeb7, LIVE 02c6d8f4 merged, site rebuilt). Code: dev/build/jcoopthine.js only (9 lines). Tests: dev/test/coop-week-lag.js (new), dev/test/coop-week-lag-scan.py (new).

## Root cause (thin levels 5–9 = LIVE 7/9; level 0 not affected, see below)
At level ≥ 5 the guest's own changes reach the host's copy of her (TH.seatOf "b") as a person DIFF (`do erd` before each ready, and the
last pack of each F1–F4 act intent): `pDiff(E.base(view), her S now)`, numbers as **deltas**. On a merged week the host drops and rebuilds
his copy from the merged C.P.b, and her phone deserializes the same C (fromCanon). jcoopthine reset her baseline with `E.bs=null`, so her
**first** diff of the new week re-took it from `TH.view` — which, until the host's new-week snapshot reaches her, is the host's view of the
**OLD** week (her person BEFORE her week end). Her first ready / act right after the merge therefore carried her whole week end as her own
change (Sủng −1, Sức regain, Bổng lộc + month card, wages, Thanh danh…; trace: one erd of **225 ops incl. «+ bạc 12»**, base view w=5 while
the room was at week 6) and the host added it on top of a copy that already had it: host copy = phone + her week end once more, until the
next merge (the host's `end` writes P.b as base + his stand-in deltas, not from his store, so the merge heals it a week later = «one merged
week late»). The race happens whenever she presses on fast (her ready usually beats the host's snapshot): month-change weeks show it most
because they move the most numbers. The ~10-bạc «ordinary week» gaps of E47's probe were mostly the probe checking while the host had
already stepped buổi sáng of the new week (its patch not yet on her phone) — my probe waits for the same buổi on both copies.

Independent confirmation: Foreman E's E49 (reports/coop-oneworld-lag.md, 23:49Z) traced the same root on LIVE and the same fix (e7b996f2) and
recommended waiting for coop-thin-g-f1 to land. This branch is that fix ALONE on LIVE (9 lines, no level-13 code), so the bug can close now
without waiting for the whole G lane; when coop-thin-g lands, its E-region is identical (no conflict, one version).

## Fix = review/coop-thin-g r1 e7b996f2 hunk, ported VERBATIM (Priority #1: no second version; coop-thin-g lands without a conflict)
- `E.base`: a view whose `o.w` is an older week is never her baseline.
- `COOP.on("week")` (runs after jcoopworld's onWeek → fromCanon): her baseline = `curP()` of her S right then (= the merged person the host
  rebuilds his copy from), `E.pn = S.thpn`, `E.last = ""`.
- The jcoopthine.js E-region on this branch is byte-identical to review/coop-thin-g-f1 (diff shows only F1's cy section).
- I first wrote my own variant (merged C.P.b as baseline, commit 4512d7e2, gates wl9 / wl9s / wl7 PASS, bongloc-coop 4/4) and replaced it by
  the r1 hunk once the overlap was found (3f1cec27); Foreman B told at once.
- Law 1 (two-way): his month card / his person on her phone — the view's P.a == his phone checked every week end in the same test.

## Group scan (law 11) — `python3 dev/test/coop-week-lag-scan.py [builddir]`
Every guest→host sender of her person (33 sites): only the two person-DIFF paths use a view baseline; all others are absolute, index-only
(the pick RUNS on the host store), or merged by the server against the week's own base.
| sender | sites | form | before (main 04afaeb7) | after |
|---|---|---|---|---|
| `do erd` at ready | jcoopthine.js:48 | delta ops vs E.base(view) | **UNGUARDED** (old week's view could be the baseline) | GUARDED |
| `do erd` packs before an act | jcoopthinf.js:55 | delta ops vs E.base(view) | **UNGUARDED** | GUARDED |
| `do f` act intent (last pack) | jcoopthinf.js:42 | delta ops vs E.base(view) | **UNGUARDED** | GUARDED |
| `do pick` (month card / every part-D card) | jcoopthin.js:478-479 | card id + index, runs on the host | safe | safe |
| `do ready`, `do pack`, `do life`, `do npc`, `do cyb` | 5 | step / ack / life intent / frame of her write / absolute flags | safe | safe |
| `end`, `me`, `init` | jcoopworld.js:296, 302 | whole C / person (server merge3 vs week base) | safe | safe |
| `res` | jcoopworld.js:491, 1164 | her act's effect on HIS person | out of scope (other seat) | — |
| `act` / `actr` relays | 20 | clock, p2, live mini game, fam, invite, claim, kc, ask | no economy numbers | — |
Guest pDiff call sites: 2, both start from `E.base(V)`. Scan result: main **FAIL** (3 unguarded + guard missing) → branch **PASS**.

## Tests (deployed Worker ctm-coop.victoria-tntt.workers.dev, host Fold 686x880 / guest iPad 1180x820; swap = devices swapped)
dev/test/coop-week-lag.js: real merged weeks through the real endTurn / monthTick (no direct stipend call), the guest at rank 3 (month card
with a lễ nghĩa choice), both players press on as players do (STILL=1 = no press after a merge); after every week, once both copies stand on
the same buổi and the view is in sync: the host's copy of her (withSeat b) == her phone on bạc / Sủng / Danh / Sức / Đức / Thanh danh, and
her phone's copy of HIM == his phone (law 1). Level 0: host stand-in == merged week (her phone's acts after a merge reach him at the next merge
by design at level 0 — the old path keeps her week on her phone).
| run | before (main) | after (this branch) |
|---|---|---|
| coop-week-lag L9 (10 weeks) | **FAIL 3/10 weeks off** (W0, W1, W5: e.g. bạc 454 vs 401) · race 3× · erd ops 1534 | PASS 0/10 · race 3× handled · ops 809 (after the LIVE merge: PASS again) |
| coop-week-lag L9 swap | — | PASS 0/10 · race 3× · ops 859 |
| coop-week-lag L7 | **FAIL 4/10 weeks off** · race 4× · ops 1651 | PASS 0/10 · race 2× · ops 763 |
| coop-week-lag L0 (host stand-in == merged week) | (path not touched: E is level ≥ 5) | PASS 8 weeks |
| law 1: her phone's copy of HIM (view P.a) == his phone | (in the same runs) | PASS every week, L9 / L9 swap / L7 / L0 |
| early probe, main L9 12 weeks (REAL) | FAIL 2/12 (W4 Sủng/Sức/Đức, W5 bạc 35 vs 23 = her week end exactly twice) | PASS 12/12 |
| bongloc-coop (both seats; on bongloc-options until it landed, then on this branch after the LIVE merge) | E47 on 874e8270: 1/6 FAIL (host 410 vs phone 420) | 4/4 PASS (first variant) + 3/3 PASS (r1 hunk, L6 ×2 / L9) + after merge L6 / L9 / L9 swap 3/3 PASS |
| coop-e2e (COOP_A_ORIGIN=tt COOP_B_ORIGIN=nc) | — | 124/124 (twice: before and after the LIVE merge) |
| coop-night (level 0) / THIN=9 | — | 105/105 / 105/105 |
| coop-thin-e L9 / swap | swap: 32/33 (E6 host clock) | 33/33 / 32/33 (same E6, twice) = pre-existing |
| coop-thin-f2 L9 / swap | — | 27/27 / 26/26 |
| coop-thin-f3 L9 / swap | — | 37/37 / 37/37 |
| coop-thin-f4 L9 / swap | — | 18/18 / 18/18 |
| coop-thin-f1 L9 / swap | 17/22 / 20/22, 20/23 (doAct, pet/kid host→guest, gift, rkOfFace console error, a random act kind) | 18/23 / 19/24, 21/22, 21/23 — same pre-existing set (accuse/tocao once on run 1, not on reruns; main had «trip» the same way) |
| coop-thin-a L9 / swap | FAIL (nmReg round trip + more) | FAIL nmReg.<maid name> round trip only = pre-existing |
| coop-cyc THIN=9 / swap | 70/73 / 70/73 | 72/73, 73/73 / 70/73, 72/73 = pre-existing flakes (giau / som / lui / mixed) |
| coop-timer THIN=9 | FAIL «4: no choice made for her» | same FAIL ×2 = pre-existing |
| role-parity.test.js (alone) | — | ALL PASS |
| one-core-guard / one-core-text-rule | — | PASS (inline 3585 ≤ 3592) / PASS |
| coop-week-lag-scan.py | FAIL (3 unguarded + no guard) | PASS |
| quickcheck 0860f601 | — | **QUICKCHECK PASS** · open 1790 ms · old save ok · perf new/live render 278/292, tab 415/431, buổi 1228/1478 · core gates PASS |
Old saves: no save format changed (her baseline lives in memory only); quickcheck's LIVE old save loads and plays. No UI change → no shots.

## Not in scope / noted
- Negative bạc seen on her phone at level 0 (−16 after a week; the host stand-in shows 0 by NPC clamp) — economy, not sync (FOR B).
- review/bongloc-options' own bongloc-coop.js is not on main; run on that branch + this fix.
- rkOfFace console error (E49's side note): also on main 02c6d8f4-era runs (main-thin-f1) = pre-existing.
- Pre-existing fails seen identically on main (FOR B, not this ticket): coop-thin-a nmReg round trip; coop-thin-e swap E6; coop-thin-f1 doAct / host→guest pet, kid, gift / rkOfFace console error; coop-cyc flakes; coop-timer THIN=9 «4: no choice made for her».
- Coop-thin lane names g4 / g4s belong to coop-thin-g (level 13, not on main): not run here.

## REVIEW r1 (independent BIG reviewer session_01N1tNP5x6xp5Bx55tM27hes, 22/11 03:50Z) — **PASS 8303b53a**
PRIORITY #1 CHECK ('week-lag|E.base|thin E week base|coop-oneworld'): OD/handover = ORDER MAIN 100 20:35Z + this report | main bb92f986 (no guard: `coop-week-lag-scan.py` FAIL on LIVE) | review/*: review/coop-thin-g-r1 + review/coop-thin-g-f1 hold e7b996f2 (same hunk); review/coop-thin-g 7fcae66b does NOT yet | E49 reports/coop-oneworld-lag.md: «NOT rebuilt; no review/coop-oneworld-lag branch made» (ls-remote: no review/*oneworld*) | claims: this review row.
Branch **review/coop-guest-week-lag-r1 @ 8303b53a** = worker 0860f601 + merge of LIVE **bb92f986** (LIVE moved during review: night-balance-bundle / od03-favart; only index.html / sw.js conflicted, rebuilt with build_site.sh; assets.json untouched). Ancestor of FF: origin/main bb92f986 ✔.
| check | result |
|---|---|
| (1) root cause real — LIVE repro | LIVE 02c6d8f4 coop-week-lag L9 10 weeks: **FAIL 3/10** (W3 bạc 9/0 Sức 108/97; W4 month change bạc 78/39 + Sủng/Danh/Sức/Đức/Thanh danh; W8 Danh/Sức/Đức/Thanh danh). bongloc-coop L6 on LIVE ×2 = PASS (the race is intermittent there; coop-week-lag is the reliable repro) |
| (1) green on the branch (0860f601) | coop-week-lag L9 PASS 10/10 · L9 swap PASS · L7 PASS · L0 PASS 8 wk · bongloc-coop L6 15/15 · L9 16/16 · L9 swap 15/15 · coop-e2e 124/124 |
| (1) green after LIVE bb92f986 merge (8303b53a) | coop-week-lag L9 / L9 swap / L7 / L0 all PASS (stale-view race hit 2/2/6/0 times, all handled) · bongloc-coop L6 15/15 · L9 swap 15/15 · **coop-e2e 129/129** (COOP_A_ORIGIN=tt COOP_B_ORIGIN=nc) |
| (2) byte-identical to e7b996f2 | the +/- lines of `git diff e7b996f2~1 e7b996f2 -- dev/build/jcoopthine.js` == the branch's jcoopthine diff vs main (diff of the two hunks: empty). File vs review/coop-thin-g-f1 differs only in F1's cy section (cyLost / cyReask / cyHostOwns). e7b996f2's other parts (jcoopthing.js PREC / gBlob thpn / gEmp) are level-13 only and not on main → not needed here. coop-thin-g will merge clean on this region. |
| (3) ONE fix only (law 14) | E49 has no branch and no code (STEP 0: «already fixed in B's lane, not rebuilt»). The ONLY other carrier of this hunk is B's own coop-thin-g-f1 / -r1 = the same bytes, so after this lands there is one version, not two. |
| (4) law 11 family | independent grep: the guest's only person diffs are `TH.pDiff(E.base(V),…)` at jcoopthine.js:46 (ready erd) and jcoopthinf.js:53 (F intent: packs as erd at :55 + last pack in `do f` via sendF :42) → all 3 senders go through the guarded E.base. jcoopthin.js:167 pDiff is the HOST's part-D patch out from his own store (p0), not a view → not this family. When E.bs is reset (room / host-net / nohost) and only an old-week view exists, E.base returns {} → pDiff emits absolute "=" ops (no "+" delta from an undefined base) → no doubling. `coop-week-lag-scan.py`: LIVE FAIL → branch PASS. |
| (5) law 1 both seats | every week in L9 / L9 swap / L7 / L0: her phone's copy of HIM == his phone (PASS); swap = the devices exchanged (host iPad / guest Fold) PASS |
| law 4 one core | no number added; quickcheck core gates (one-core-guard) PASS |
| quickcheck 8303b53a | **QUICKCHECK PASS** · open 1869 ms · old save ok · core gates PASS · perf new/live render 239/265, tab 483/504, buổi 1375/1254 (noise; 0860f601 run: 1366/1266 and 1570/1163) |
| undef-scan | PASS (289 names) |
| role-parity.test.js | 2 FAIL (`up:P-ONLY:harm:petcare` new gap; riseCore Danh 3 vs 5) — **identical on LIVE bb92f986 alone** → pre-existing LIVE regression from the bb92f986 land (it passed on 02c6d8f4 per worker), NOT this branch (co-op sync only). FOR MAIN / B. |
| old saves | no save format change (baseline in memory); quickcheck old save loads and plays |
| UI / words | none changed → no shots |
Reviewer env note: quickcheck gates 50-coop-one-world / 60-mk-layer-scan first failed only because my sparse worktree lacked coop/worker and dev/art/mkfit; after adding them both PASS and the full quickcheck PASS.
VERDICT: **PASS 8303b53a** — LAND = fast-forward main to 8303b53a. One version of the fix: when review/coop-thin-g lands later its jcoopthine E-region is the same bytes (no second version).
