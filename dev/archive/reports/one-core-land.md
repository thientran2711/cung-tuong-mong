# ONE CORE — landed on top of today's main (review/one-core-land)

Owner rules: OD:L1267 (ONE CORE) + owner CO-OP FIRST 16/11 ~20:32Z s23 (two shared stores: KIT + ONE CORE; guards in the automatic quickcheck).
Branch `review/one-core-land` @ **a4f01453** = review/one-core 7b9d022f + origin/main c1e1bbd1 (fast-forward from main: yes, checked 21:5xZ).

## 1. Merge
- 10 code conflicts (j15, j2, j27, j42, j6, j79, j9, j99succ, jbal, jtut): kept main's behaviour + markup, put the BAL reads back
  (khắc per buổi, walk near/far, night gains nightG/nightA, servant ages srvAge, stipend BAL.pay/payCold). Generated files: main's, rebuilt.
- Two names for one value found by the merge: main's `BAL.succN.bAge` and one-core's `BAL.age.reign` (both 16) -> succN.bAge now reads BAL.age.reign.
- Main kept birthAdd 2 (its tuning) and the wet-day walk 3; walk stays 2 (owner OD:L351, one-core's choice), outQ one value 60.
- Second merge (main moved to c1e1bbd1 during the work): only built files conflicted; the gate then caught 10 new typed numbers from main
  (jopic, jpet, j74) — moved too. This is exactly what the gate is for.

## 2. New typed rule numbers moved into BAL (one core)
Guard on main today: 349 failures. On this branch: PASS. Frozen list 6945 -> **6691** (shrink only).

| Module (landed after one-core) | Sites | BAL table |
|---|---|---|
| jroute (story roads) | 83 (69 kinds) | BAL.route (67 keys) |
| jorigins (origin arcs) | 116 | BAL.orig (bd, quest, hoa, ngua, tuc, hoang) |
| jhouse, jtds, jtd | 39 | BAL.house, BAL.tds (the jtds-owned block moved here, one place), BAL.td |
| 19 small modules (j95, j95b, jeitem, jlux, jkitpage, jsgame, jne, jdiff, j92, jsteal, jslap, jpromsv, jmort, jly, jcmaid, jaudit, j90, j8, j72) | ~53 | actK, servK, m95, m95b, diff, m92, stealx, mortx, ly, cmaidx, audit, m90, m72, kitpage; module-owned tables got keys in place (BAL.eit, lux, nightEnd.after, sp) |
| main's late additions (jpet, jopic, j74) | 10 | BAL.pet.freeHiSung (+ care khắc text prints BAL.pet.khac), BAL.kitpage.demo |

All new tables sit in the ONE CORE r2 block of dev/build/jbal.js. Every player text that shows one of these numbers prints the same key the rule reads.
Values unchanged — proof: every BAL path used by the edited modules was read from the built page and substituted back into the code; the result was
diffed against the pre-move code: 0 value differences (left: quote style, `{...x}` copies, local aliases, two dropped dead fallbacks in jeitem).
381 BAL paths used by the edited modules all resolve at runtime (1 hit is a comment).

Guard refinements (no loosening of real rules): numbers INSIDE the rulebook (const BAL / Object.assign(BAL,…) / BAL.x={…}) are no longer counted as
inline (they ARE the core); a literal 0 in a comparison/fx (sign/empty/clamp) is not a rule number; `BAL.k=` counts as a second value only when a
typed value is assigned (a copy b0 / a setter v forwarded one value, e.g. jbac restDsBac0). New env OC_BUILD / OC_BASE for quickcheck.

Left for later (frozen, cannot grow): 6691 act/story prices typed beside their effect (j67, j8, j72, j71, j42 …). Agents noted duplicates
that should read the new keys in their own pass: Tứ đức lesson costs typed again in j85/j23 (-> BAL.td), servant costs in j10/j24/j29 (-> BAL.house),
scheme-act khắc can(2) in j8/j6 (-> BAL.actK), servant act khắc in j10 (-> BAL.servK).

## 3. Gate in quickcheck (go-live fails on a new typed number or a private kit part)
`dev/tools/quickcheck.sh` step 1b runs `dev/tools/coregates.sh` after the build:
- G1 one-core-guard (static, 1 s) + the sha's frozen list may not be longer than live's (a branch cannot pass by `--update --allow-grow`).
- G2 rules-one-source (Fold, ~10 s): shown number = checked rule, ONE CORE perturbation, old save loads, 0 page errors.
- G3 kit-conform (Fold, ~70 s): every dialog from a kit frame template, no loose floats over the tabs.
- G4 hooks: every `dev/tools/quickcheck.d/*.sh` (contract: quickcheck.d/README.md). **Co-op one-world probe slot = `50-coop-one-world.sh`**;
  worker session_01UV1Szj18sSZbfw4DZWoqJh (review/coop-one-world) was messaged the contract.
- Self-test: planted `if(S.bac<77)apply({danh:-3})` + "Mỗi buổi có 4 khắc" -> CORE GATES FAIL (3 lines named); baseline total raised -> FAIL "frozen list grew".
- Cost: core gates ~80 s; whole quickcheck 250 s (≤ 6 min). Final line now ends "· core gates PASS".

## 4. Tests (sha a4f01453)
- one-core-guard PASS · `bash dev/tools/quickcheck.sh a4f01453` PASS (open, old save ok, perf new/live render 311/310 ms, buổi 1001/1017 ms, core gates PASS, 250 s).
- coop-e2e: 59/59 (main c95282e6 same day: 57/59, the 2 "A frozen when B left" checks flaky on the live Worker; one run of this branch also hit them, the rerun passed).
- rules-one-source 755x1000: old save from live loads, 200 states text = rule, core perturbation 0 bad, 0 page errors.
- Build OK, img-allowlist OK.
- Bot balance (sensible bot, run5b, 9-origin rotation, HHSTOP, 5 shards x 4 lives, both builds same box):

| n=20 | HH | died < 10 years | mean years | mean max rank | end bạc |
|---|---|---|---|---|---|
| before (origin/main 95282e6) | 0 | 45% | 12.0 | 2.4 | 57 |
| after (this branch) | 0 | 50% | 11.0 | 2.1 | 26 |

Within noise at n=20 (one life = 5 points; end bạc is very spread: before 3…195, after 0…66). The static substitution proof above shows no rule value
moved, so the difference is run-to-run noise. As in the first report: main itself is far from the HH target (0/20 here) — a balance task of its own.

## 5. For the coordinator
- Land: fast-forward main to a4f01453 after reviewer PASS (it is FF today; if main moves, merge it, take main's built files, rebuild, rerun the guard —
  new typed numbers will show as G1 FAIL and must move into BAL).
- From now on every go-live runs the core gates; a FAIL names file, snippet and the BAL constant to print.
