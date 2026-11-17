PRIORITY #1 CHECK ('SHOW-WHY|show why a number|showWhy'): OD 1 (17/11 05:45Z) | ledger 0 | claims C (this item) | main 2 (jnet.js hooks) | review/* review/show-why (branch under review). Reused: the worker's jwhyn.js + tests; coop-e2e helpers for the new co-op check.

# review-show-why-r1 — PASS 9391f9a (FF of main 05ebe3da)

Reviewer session_011xDdVRVL5MdC5V5iSZRy5P (BIG tier) for Foreman C. START_CTX ~4 % of the 1M window.
Branch `review/show-why-r1` = review/show-why 94ac121d merged onto origin/main 05ebe3da (AG1+AG2) + reviewer fixes. Main still 05ebe3da at push.

## Merge (conflicts kept both)
- dev/build/assemble.py: main's module list (jmind, jagent, jagemp) + jwhyn.js last.
- dev/build/jtin.js bestSent: AG2 `mindPickBy` path + show-why's `nq(s,"sharp",BAL.net.k.spySharp)` (main still had the literal 15).
- Generated files (index.html, sw.js, assets.json): rebuilt. netmig.py NOT run.

## Reviewer fixes on r1
1. ONE CORE: `one-core-guard.js` was RED on the worker branch itself (not reported): `jwhyn.js [fx] sung:1` (`WHY_OWN={sung:1}`) → `new Set(["sung"])`. Guard PASS now.
2. ONE CORE: his-mood night add-on `[1,0,-1,-2]` was typed twice (j8 night1 + a copy in jwhyn) → one key `BAL.night.mood` read by both. Values unchanged.
3. LUẬT SỬA CẢ NHÓM (pre-existing on main, surfaced by coop-e2e: iPad seat `ReferenceError: tr is not defined` in srvWeek→srvMoodEvent): free variable `tr` in j42 srvMoodEvent, jmen menDecide (2 lines), jtsb tsbFirst → `hasT(person, nết)`. Scan: no other free `tr`.
4. New test `dev/test/show-why-coop.js` (host Fold + guest iPad, LIVE Worker): 9/9.

## Checks
| Check | Result |
|---|---|
| Whole family (talk/topic, gift, greetings TH/HH, TH deeds, NPC acts via affAdd/oanAdd outermost wrappers, nights) | OK — one measured collector, factors from the same rule functions (PERS/BAL.net.T, trongMul/trongHit, trGreet tables, mbAffK) |
| Named vs generic; stranger never described | OK (show-why.js 16/16) |
| Shown = applied | OK (before→after measurement; result card "Được +22" = "Vì sao +22" on Fold) |
| ONE CORE: 90 nết numbers via BAL.net / nv() | `net-inline-scan.py` 0 after merge (AG2 code included); one-core-guard PASS |
| KIT FIRST | PASS — no private part: the "Vì sao" row is the existing §7 `.kb` row markup (`.kr.kr-note`), `kr-vi`/`kwl` are hook classes with NO CSS; nết words use kit §12 kitGloss. KIT REQUEST (register only) in KIT_REQUESTS.md stands for the kit keeper; nothing built meanwhile. |
| Tap popover on touch, no native title | OK — Fold real person card: tap "Ân cần" → kpPop "Được … Mất …"; 0 `[title]` |
| VANPHONG | OK — cổ trang words, no %, her own stat in words ("Sủng thêm N") |
| Co-op both seats same | OK — show-why-coop 9/9 (same text both seats: generic, named, TH greeting); coop-night 105/105; coop-e2e 62/62 (61/62 before fix 3) |
| Old save | OK — show-why old save from 9fdc1199; trait-rename-oldsave 9/9; QUICKCHECK old save ok |
| Other tests | trait-pool 20/20 (base = pre-trait-pool dd29812; main also 20/20); agent_check 16/16; agemp_check 20/20 |
| Perf smoke | QUICKCHECK PASS (core gates PASS). Same-seed 12 buổi: r1 2246 ms vs main 2254 ms vs r1-without-jwhyn 2426 ms (medians of 3) → no regression; jwhyn self time ~1 ms per 8 buổi |
| Shots (scratch, not in git) Fold 755x1000@2 + iPad 1180x820@2 | result card with VÌ SAO row, Sổ ghi tail, nết popover: no overflow, no page errors, looked at |

## Notes (non-blocking, for C / balance owners)
- Sổ ghi gift line: the gift text prints its own base number ("thiện cảm +9") while the why sums every change to that person in the act ("→ thiện cảm +16", = the jlogsync tail "-5 → 11"). Numbers are right but two numbers on one line can read oddly; consider having the why say "cả thảy +16" or the gift line print the applied number.
- Night why buckets ("đêm vui/êm/nhạt" at s≥6/≥3, prep q≥2 "chu đáo") are display words with typed thresholds; "vừa phải" can never show (q is 1 or ≥2). Cosmetic.
- Worker's note stands: strict Thái hậu can give negative thỉnh an at low rank (existing trGreet), now visible.
- CDN review folder: `python3 dev/site/cdn_sync.py --wipe-review show-why` to be run by the coordinator if the worker's folder still exists (this reviewer uploaded nothing).
