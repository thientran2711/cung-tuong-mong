PRIORITY #1 CHECK ('jreg|regEach|story-frame'): OD 0 (no owner ruling on the Sức halving; it is a measured worker rule in j67) | ledger 0 | claims 4 (this review) | main 0 | review/* story-frame (the branch under review), story-bot (tools reused) → review only, nothing rebuilt.

# review/story-frame r1 — reviewer report (Foreman D #8)
Reviewer opus, START_CTX ~4 % (get_session read 0; estimate). Reviewed review/story-frame @7be4cdc6. Live main 6c4f21c3 is already an ancestor
(the worker's base), so review/story-frame-r1 = 7be4cdc60bbef32eb0f16bf2223e3ce0859be9f3 (pushed; no merge commit needed). All tests on THAT build.

## Behaviour change judged: Sức/hh halving now reaches 13 hand-typed arcs → INTENDED (ONE CORE), not a silent difficulty change
- The rule (j67, "story choices must not wear her health down; Sức costs/losses of story options are halved") was always meant for every
  hand-typed story arc; on main it missed the arcs of modules loaded after j67 only because of load order (same fault as bd's frame).
- Those 13 arcs are typed on the SAME raw scale as the j67 arcs that are halved: j67 source suc −2…−12 (mode −3), late arcs −2…−6.
  On main the late arcs therefore cost ~2× the Sức of every other story arc for the same kind of step; after the fix they match.
- Runtime dump (ARC67 option costs, main 6c4f21c3 vs branch; only these 13 arcs differ; 280 road arcs o:"rd" 0 changed; GB67 0 changed):

| arc | main (Sức of options / hh) | branch |
|---|---|---|
| bd_hoa | −3 −4 −5 −3 | −1 −2 −2 −1 |
| bd_ngua | −4 −6 −6 −4 | −2 −3 −3 −2 |
| bd_tuc | −3 −2 −2 −5 −4 | −1 −1 −1 −2 −2 |
| bd_hoang | −3 −3 −5 −4 | −1 −1 −2 −2 |
| st_the | −4 | −2 |
| st_con | −6 −5 −3 | −3 −2 −1 |
| st_dong | −4 −5 −6 −6 −3 | −2 −2 −3 −3 −1 |
| tm96a | −3 −2 −2 −2 −4 | −1 −1 −1 −1 −2 |
| tm96b | −2 −4 −2 −3 −3 −5 | −1 −2 −1 −1 −1 −2 |
| tm96c | −6 −4 −3 −5 −6 | −3 −2 −1 −2 −3 |
| noi14 | −3 −2 −5 −4 −2 −3 −2 −4 −4 −4 −4 | −1 −1 −2 −2 −1 −1 −1 −2 −2 −2 −2 |
| hau14 | −3 −4 −5 −4 −6 −3 −5 −5; hh −6 | −1 −2 −2 −2 −3 −1 −2 −2; hh −3 |
| ke14 | −3 −4 −3 −3 −5 −5 −2 −3 −5 −2 −2 −1 −1 −5 −5 | −1 −2 −1 −1 −2 −2 −1 −1 −2 −1 −1 −1 −1 −2 −2 |
(Math.round(x/2), floor −1, exactly the old rule.) Halving is stable: same values after 3 life starts + extra regSweep (WeakSet, no double halving).
- ONE-CORE note (pre-existing, not this branch): the halving factor /2 itself is typed in j67, not a BAL key → route to the one-core hunt (Foreman B) with the jtsb Bạc gates the worker flagged.

## Checks
| check | result |
|---|---|
| regscan (re-run by me): load-time reads of named globals | 91, missed later keys **0**; OK table entries read, reasons hold (lookups / check-then-add / runtime getters) |
| runtime writes into ARC67/STORY after load | only jroad rdDef (o:"rd", excluded) → nothing gets halved mid-life |
| double init | regSweep() after load = 0, after 3 life starts (bd/tt/nc) = 0; STORY.bd/tt wrapper depth 1; 14 regEach passes registered |
| order independence | local build with j96.js + jorigins.js moved to the END of assemble order: ARC67 dump identical (0 diff), origins 20/20, bd framed (v2) |
| old bd saves (story-frame-oldsave.js, pre-fix 7abaf07a → branch) | **8/8 PASS** (m0 ch1 full time; m9 ch1 Lỡ dịp + ch2 7 months; m40 ch4 bd arc; quiet + 1 log line; 2nd load same; chapters never go back; tt v1 untouched; 0 errors) |
| live-main bd saves | new bd life on live main already has v2 (jorigins hand call) → f67Mig is a no-op for them (guard v267()) |
| story bot (review/story-bot runstory.sh, ch1–4, bd+tt × Dễ/Vừa/Khó, 8 lives) | bd 4/4 reach ch4 + ch5 (ch4 month 9–15), tt 4/4 (6–13); 0 stuck |
| origins.js 755x1000 | **20/20** |
| tut-origins-scan.js | **10/10** (bd wrapped, nhap14, an/di/trang) |
| one-core-guard | **0 fails** (inline 6671 ≤ baseline 6691) |
| quickcheck.sh | **PASS** (built, core gates, old save + buổi; perf new/live render 209/231, tab 318/296, buổi 829/949 ms) |
| coop-e2e | **60/60** (not worse) |
| Fold 755x1000@2 + iPad 1180x820@2 shots (img/_review/story-frame) | LOOKED at: bd Mệnh truyện ch1, kit panel/tabs/chips, no overlap, nothing cut. CDN folder wiped. |

## Notes for main (not this branch)
- story14-frame.js crashes at the home-road step on live main too (worker note) → FOR MAIN, pre-existing test fault.
- jtsb typed «Bạc 40/30/10» gates + j67 typed halving /2 → Foreman B one-core duplicate-rule hunt.
- Live main already framed bd by the jorigins hand call; the story-bot "bd 0/28" is not reproduced on live main for a fresh life. The branch's value is the root fix (no hand calls), the 14 other passes, the 13-arc halving and old-save repair.

PASS 7be4cdc60bbef32eb0f16bf2223e3ce0859be9f3
