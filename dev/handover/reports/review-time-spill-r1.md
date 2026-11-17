# Review — review/time-spill @98526684 → review/time-spill-r1 (BIG)

Reviewer session_01UV1SzgywPJmuPJ3vdnbjos · 11/16/2026 · owner rules OD L852 + L886 + 16/11 ~21:42Z (time spill), CO-OP FIRST.
Built ON TOP of review/one-core-land-r1 (2690c37a) so both gates run together.

## Merge
- 11 conflicts, all one-core vs time-spill on the same lines. Time-spill's code kept everywhere; its typed numbers read the core:
  `4-used` → `BAL.time.khac-used` (j77 j77WalkWhy, j9 walkSpill, jclose cbGreetCard, jmen menKh, jtsb tsbKh), j76 carry
  `before<=BAL.time.khac`, j55 Quốc sự `whyTime(2)||"Sức dưới "+BAL.time.sucMin` (the worker's text said 20; the rule is 5),
  j55 child-marriage ages stay BAL.age.matchShow/betroth. quickcheck.sh: 1b core gates + 1c time-spill guard (both run).
- one-core-guard after the merge: PASS (6691, nothing new typed).

## Rule check (owner case)
- ONE per-DAY gate: j76 `dayFit(n)` / `dayWhy(n)`; j77Bound = dayWhy; walk-ins (ask, sneak, lead, Đến gặp), greeting inside and at
  the gate, Quốc sự, servant walk, Thái hậu summons, menKh all go through it and SPILL into the next buổi. Only real limits stay:
  tối never runs past the night ("hết khắc trong ngày"), "Chỉ buổi …" deck cards and the sáng-only Thái hậu lesson ("không kịp
  xong trong buổi …", j76 window) — the owner's L852 exceptions.
- Remaining 'không kịp' in j67 (824, 973), j68f 73, j71 193, j72 547, j95 390, jreign 121, jroute 166, jts 93: read each one —
  all are story/outcome words (failure texts "lx", a servant's plea, an ambush result, a family that could not flee), none is a gate.
  The worker's claim holds.
- Shots (scratch, not in git): owner case on Fold 755x1000 — inside Cảnh Phúc cung, chiều, 1 khắc left, greeting cost 2:
  "Bái kiến Quý phi · TỐN 2 khắc" offered, no 'không kịp'; iPad 1180x820 — gate card, walk 2 + bow 1 with 2 left: "Bái kiến
  Quý phi rồi vào · TỐN 3 khắc" + "Vào thẳng" both offered (kit option cards, no private parts). No overflow, no page errors.

## Tests (sha b694c97f)
- `bash dev/tools/quickcheck.sh b694c97f` → QUICKCHECK PASS · old save ok · perf new/live render 251/235, buổi 860/755 ms ·
  CORE GATES PASS (one-core-guard, rules-one-source, kit-conform, hook coop-one-world seeds 7+3) · TIME-SPILL GUARD PASS · 259 s.
- coop-e2e: 59/59. COOP_SPILL=2 (co-op walk spill): 83/83.
- time-spill-guard alone: 54 PASS / 2 FAIL in 56 runs. The 2 FAILs were the same row, "gate greeting: inside, carry set"
  ({place:"home", carry:0, Q:[]}, tc 2, 2 left) — she stayed home after "Bái kiến … rồi vào". Not reproduced in 40 instrumented
  runs; the guard starts ONE random life (start() once, random origin/outfit/events), so some goTo wrapper (e.g. a random walk
  event) can stop the walk. Not a rule bug seen in play, but a go-live gate must not flake → FOLLOW-UP for the worker:
  seed Math.random in time-spill-guard.js (as coop-one-world.js does) and print the blocking reason; rerun once on a FAIL until then.

## Verdict
PASS b694c97f + this report (ancestor: origin/main f1509d7c; contains review/one-core-land-r1 2690c37a).
Follow-up (small, not blocking): seed the time-spill guard (flake 2/56).
