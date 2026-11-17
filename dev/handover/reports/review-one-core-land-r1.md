# Review — review/one-core-land @29e3738f → review/one-core-land-r1 (BIG)

Reviewer session_01UV1SzgywPJmuPJ3vdnbjos · 11/16/2026 · owner rules OD:L1267 (ONE CORE) + CO-OP FIRST 16/11 ~20:32Z s23.

## Merge
- origin/main f1509d7c merged (lag-play-2-r1 + coop-one-world-r1). One code conflict: j13 newLots/reLot → main's host-only NPC lots
  (`worldOn()`) + one-core's `BAL.lot.bac/k` reads. index.html/sw.js/assets.json/CHANGE.txt = main's, assemble.py list = union
  (jcoopone.js, jlag2.js kept), site rebuilt with dev/site/build_site.sh.
- one-core-guard after the merge: PASS, frozen list still 6691 (main's new modules jcoopone/jlag2 add no typed rule number).

## Fix made by the reviewer (co-op one-world hook)
- Main had the probe (dev/test/coop-one-world.js) but NO `dev/tools/quickcheck.d/50-coop-one-world.sh`, so the gate only ran through
  the G5 fallback — and G5 preferred the KIT's copy of the probe. coop-serve.js serves the files next to the script, so the kit copy
  tests the kit's build, not the sha under test. Fixed: new hook `quickcheck.d/50-coop-one-world.sh` runs the SHA's own probe
  (seeds 7 + 3, fails if the sha lacks the probe or the build lacks COOP_ONE); G5 fallback now uses the sha's copy only.
  Hook alone: seed 7 PASS, seed 3 PASS. In quickcheck: "hooks 1", G4 coop-one-world PASS.

## Number proof (values unchanged) — checked by the reviewer, not taken from the report
- Script: load the built page, read BAL at runtime, substitute every `BAL.x.y` in the branch's modules with its value, compare with
  main's (c1e1bbd1) module line by line (quotes/whitespace/`${}` normalised). Sample: jroute, jorigins, jhouse, jtds, jeitem, j95, j8,
  j42, j9, jht, j54 (the biggest edits). Remaining differing lines were all read by eye: local aliases (`H=BAL.house`), cost getters
  (steal), comments that now print the table, old code that already read BAL (main) — 0 value differences found.
- The one deliberate change: far walk on a wet day. main's j9 `travel` said wet ? 3 : 2, but jclose redefined `travel` as 2 always, so
  live already played 2; one-core makes both read BAL.walk.far = 2 (owner OD:L351: weather never adds walking khắc). Correct.
- Sức floor texts said 20 while the rule (j76) reads 5 → texts now print BAL.time.sucMin (5). Text fix, rule unchanged.
- Bot balance: not rerun by the reviewer (the bot driver files inpage6/inx/inpz are not in the repo). The worker's n=20 table
  (HH 0/0, died<10y 45%/50%, end bạc 57/26) is within noise; the static substitution proof + G2 core perturbation are the stronger proof.

## Tests (sha 80679eda)
- `bash dev/tools/quickcheck.sh 80679eda` → QUICKCHECK PASS · 170 s · open 970 ms · old save ok · perf new/live render 234/239,
  tab 264/293, buổi 789/772 ms · CORE GATES PASS (one-core-guard · rules-one-source · kit-conform · hook coop-one-world) · 277 s total.
- coop-e2e: 59/59 first run.
- Shots (scratch, not in git): Fold 755x1000 + iPad 1180x820, room + VIỆC place card (Cảnh Phúc cung, chiều, 1 khắc left): no page
  errors, no horizontal overflow, texts print the rule numbers (walk 2 khắc, greeting +1 khắc), kit option card.

## Owner question "đã làm đúng one core chưa?" — plain answer
- DONE: the core numbers (khắc per buổi, Sức floor, walk, lots, sneak, servant ages, seat caps, night gains, ages, every number of
  the modules landed since — story roads, origin arcs, household, Tứ đức…) live in ONE place (BAL); texts print the same constant;
  the gate (one-core-guard in quickcheck) FAILS any go-live that adds a new typed rule number, a second value or a typed core text.
- NOT YET: 6691 older numbers are still typed beside their effect ("frozen list", may only shrink): 4431 effect amounts
  (e.g. {bac:-20}), 856 numbers inside texts, 461 thresholds/comparisons, 431 odds, 277 unit texts, 191 khắc costs, 44 "cần" texts.
  Biggest: j67 1523 (act/event deck), j8 283, j72 267, j71 260, j42 227, j68e 225, j7 221, j97 220, jkc 201, jreign 172.
  Known duplicates still to point at the new keys: Tứ đức lesson costs in j85/j23 (→ BAL.td), servant costs in j10/j24/j29
  (→ BAL.house), scheme-act khắc in j8/j6 (→ BAL.actK), servant-act khắc in j10 (→ BAL.servK).
  They cannot grow; moving them is its own task (module by module, same static proof).

## Verdict
PASS 80679eda (ancestor: origin/main f1509d7c).
