# review-coop-main-faults-r1 — verdict: **PASS 608309dc**

Reviewer session_01UV1SzhNibrJw9xWf4TES12 (coordinator MAIN s27). Branch under review: `review/coop-main-faults` @ 3751fbba (worker report dev/handover/reports/coop-main-faults.md).
Verdict branch: `review/coop-main-faults-r1` @ **608309dc** = trial merge of 3751fbba onto live main **744b80e7** (parent: 744b80e7 → fast-forwardable).
START_CTX ≈ 5 % (estimate); finished ≈ 20 %.

## Trial merge onto main 744b80e7
- Conflicts: only generated files `index.html`, `sw.js` (took main's, then `bash dev/site/build_site.sh`). Source files auto-merged cleanly
  (main touched j61 k61SilChip, j84 lowRank, j95 BAL constants, roster_dom `.msil,.mmeta` reader — none overlap the fix lines; checked by hand).
- Build line still says "site rebuilt (coop-main-faults)" (branch CHANGE.txt) — coordinator sets the go-live line.

## Scope checks
| # | Item | Check | Result |
|---|---|---|---|
| a | j61 name mask not idempotent + j61/j84 observer loop | Read k61Scrub guard (match already inside its own mask → left as is). Ran the new `dev/test/text-idem-scan.js` on **main 744b80e7**: FAIL 23 strings ("Hảo hữu" → "Hảo hữu của ta của ta") + live node **hung 20 s** — the test catches the real bug. On the merge: **PASS 798 strings, 0 fails, live node settles in 1 round, 0 page errors**. Family: every characterData text rewriter in dev/build (grep MutationObserver + nodeValue=): j61 k61Node, j84 VP fix/itemLow (both in the scan), j79 kpDateFix (not in the scan, but idempotent by construction: its output "Tháng … · năm …" no longer matches `\bT\d/\d`); jaudit/jbook/jk4 only observe (no text rewrite). OK. | PASS |
| b | jcoopone PERSON guard blocked the guest's own act | Read the `own` counter: set only by outermost `runAct(S,…)` on the guest; `endTurn`/`nextBuoi` reached from inside an act reset it to 0 (world loop again); MUTE/ONLY_ME untouched. Guest acts on NPCs now also run (were silently null before) and reach the host through the existing week merge (jcoopworld 3-way merge, host-wins on clash). coop-one-world PASS (guards still stop world loops). | PASS |
| d | dev/tools/roster.js private map rule → R.nv | j95sync writes `R.nv[kh]` from the (wrapped) global `j95vis`, so roster.js follows whatever rule the game runs (ledger on or off): one core. Old-save fallback = exact copy of `j95party` (needed: the tool runs without game code); acceptable. Log keeps `nv`. | PASS |
| c | coop-night 'sees the wait' | out of scope (moved to coop-stable) | — |

## Tests (on the merge 608309dc unless noted)
- quickcheck: **PASS** (open 994 ms, old save from live loads + plays a buổi, perf new/live render 253/247, buổi 764/899, core gates PASS).
- text-idem-scan: PASS 798/0 (main: FAIL 23 + hang).
- roster_dom ×8 (Fold 755x1000 default/cn/muoi/thd, iPad 1180x820 tt/default, Fold land 1000x755 cn, iPad Pro 1366x1024 muoi): **0 bad moments in all 8**, 0 page errors (includes the old-save fallback check).
- coop-p2: **45/45** (B1 bribe → "she is now my tai mắt", no hang).
- coop-b1: run 1 37/41 (FAIL 1 "case held by the thief" + 8 "B sees A's bag"/laydo — friend entry on B not ready, `loP(901)` missing → keep 0); reruns **41/41, 41/41**. Same class as the known "friend entry not yet placed" flake (coop-stable), not the guard.
- coop-e2e: run 1 58/59 (FAIL ipad "friend starts as Người lạ", k61St=2 at start — the known start-friend flake moved to coop-stable #2); rerun **59/59**.
- coop-one-world: PASS. Both seats exercised (A host Fold 755x1000@2, B guest iPad 1180x820@2).
- Shots looked at: coop-p2 b1-host-bribe (Fold) / b1-guest-bribe (iPad): top-bar friend chip reads "Hảo hữu của ta" once, no growth. (Side note, not this branch: on the guest's iPad shot the Phẩm phục item icons were still blank at capture time — picture load timing; the host's loaded.)
- Kit / VANPHONG: no UI, CSS or player-visible wording changed (diff = logic in j61/jcoopone/j95 + dev tool + tests) → kit consistency scan not applicable.

## Notes for the coordinator
- Fast-forward main 744b80e7 → 608309dc; set the CHANGE line at go-live.
- Flakes seen (both already owned by review/coop-stable #2): coop-b1 friend-entry-not-ready (1 of 3 runs), coop-e2e start-friend known (1 of 2 runs).
- No shots stored anywhere (scratch only, deleted).
