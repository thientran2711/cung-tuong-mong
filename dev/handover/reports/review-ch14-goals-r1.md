PRIORITY #1 CHECK ('st14|ch14-goals|kc2val|kcv|allergy|dị ứng'): OD 1 | ledger 0 | claims 0 | main 15 | review/* 4 — review only (brief D9-ch14-goals-r1; worker brief D8-ch14-goals-allergy has its CHECK line ✓; worker report starts with it ✓).
# REVIEW r1 — review/ch14-goals @c98fe27e + review/kc2val-home @176f337f — reviewer (opus) for Foreman D #9, 17/11
START_CTX ≈ 3 % of the 1M window (get_session read 0; own estimate). No rollover needed.

## Branches made
- **review/ch14-goals-r1 @a9131bfe80286320f68618f7a200aa6601f80982** = review/ch14-goals c98fe27e + LIVE origin/main 9391f9a9 merged. One real conflict: jbal.js BAL.st14 line — kept the branch's lim (nhapHi 9, hiR 3) + goal (rel 20, nt 14) and main's renamed st14.tr words (trait pool: Xảo quyệt / Khiêm nhường / Ân cần). Generated files rebuilt. origin/main is its ancestor → **fast-forward**.
- **review/kc2val-home-r1 @1845a0ed8344080354d83daef1cac2e35cb6613a** = review/kc2val-home 176f337f + review/batch-d8 8806f7b3 merged (batch-d8 already holds oi-r1 36f86d3a + live main 9391f9a9). Only generated files conflicted (index.html, sw.js); rebuilt. origin/main is its ancestor. It CONTAINS batch-d8: land it **with/after batch-d8's PASS** (FF from batch-d8 or from main once batch-d8 is live).
- Cross-check: review/ch14-goals-r1 × review/batch-d8 → only generated files conflict (assets.json, index.html, sw.js); jrcp.js / jst14.js auto-merge. Whichever lands second: merge + rebuild, no hand work.
- No code fixes needed from me.

## (1) ONE CORE
| check | ch14-goals-r1 | kc2val-home-r1 |
|---|---|---|
| one-core-guard | 0 fails (inline 6642 ≤ baseline 6691) | 0 fails (6627 ≤ 6691) |
| every changed number in BAL | st14.goal.rel/nt, st14.lim.nhapHi/hiR, rcp.alEv (was a typed 30, both directions now read it) | BAL.kcv.nc only |
| texts print the constant | chương 1 card prints f14NhapL() → «qua chín tháng» for nc (seen on Fold+iPad); ch2/ch3 texts read F14G() | carry log is delta-based (no typed number) |
Note (not blocking, pre-existing): in rcpAllergy's own-giver branch the accuse odds base `25+hostility/2` is still a typed 25 (not touched by this branch; candidate for BAL.rcp later).

## (2) Story bot — re-run by me
Same harness (dev/measure/runstory.sh, CHSTOP=4), origins nc cnv tt muoi × Dễ/Vừa/Khó, **72 lives on LIVE main 9391f9a9 vs 72 lives on review/ch14-goals-r1** (6 per cell). `ch14cmp.py`:
| | live main | ch14-goals-r1 |
|---|---|---|
| ch1 done | 57/71 (80 %) | **63/71 (88 %)** |
| ch2 done | 54/71 (76 %) | **64/71 (90 %)** |
| ch3 done | 32/69 (46 %) | 32/69 (46 %) |
| nc ch1 | 13/18 | 15/17 |
| cnv ch2 («Lọt vào mắt Hoàng thượng») | 1/18 | **11/18** (Hoàng thượng để ý at close now clusters 14–16) |
| ch3 friend step ok / art step ok | 37 / 64 | 40 / 61 |
| ch1 closed in month 1 | 7/71 | 3/71 (not worse) |
| ch2 closed in month 1 | 0/71 | 0/71 (not worse) |
- ch1 / ch2 / nc ch1 / cnv ch2: **same direction as the worker's report** ✓.
- **ch3: the worker's "36 % → 57 %" does NOT reproduce on today's main**: live main is already at 46 % (main moved since 7abaf07a / 6c4f21c3: trait pool, show-why), and rel 30→20 leaves it at 46 % in my sample (friend step 37→40). This agrees with the worker's own finding that the ch3 misses are lives where the whole harem dislikes her (story-bot fault 2, Sủng saturation → jealousy) — out of scope here per brief. Not a FAIL (no regression, the number is in BAL and harmless), but **the coordinator should not quote "ch3 57 %"**; ch3 needs fault 2 (balance-2) and then a re-run of ch14cmp.py.
- Cells < 50 % after (6 lives each, ±20 pts): tt/vua ch3, muoi ch3 ×3, nc/vua ch3, cnv/vua ch3 — all ch3, same root cause.

## (3) Her allergy
- Kit-first ✓: shown through the existing «Khẩu vị, kiêng kỵ» kitSkillCard → kitRows (first row «Ta»), the gift dialog's kit option rows (KÈM line) and its `past` paragraph; no private CSS / row / chip (diff has no CSS at all).
- One system ✓: reuses rcpProf / RCP_AL / rcpLearn / rcpKn (pk "me") and jrash rashGive; no second allergy table.
- VANPHONG ✓: «chưa rõ ta có kiêng thứ gì (hỏi thái y)», «kiêng hải sản (tôm, cá): nhận về dùng phải là nổi mẩn», «Ta kiêng …: … có thứ ấy.» — no %, cổ trang.
- Two-way ✓: NPC→her (Sức −BAL.rcp.alSuc, rash, learns it, may hold 1 evidence on the giver with the same BAL.rcp.alEv roll) and her→NPC unchanged + NPC receivers now also get the rash (family fix).
- Old saves ✓: S.rcpK is created lazily; quickcheck old save loads and plays a buổi on both branches.
- dev/test/her-allergy.js on the merged build: PASS, 0 page errors.
- Shots LOOKED at, Fold 755x1000@2 + iPad 1180x820@2 (nc life, allergy forced known): taste card «Ta» row red, gift dialog warning under «Nhận ngay», chương 1 card «qua chín tháng»: no overlap, no h-overflow, 0 clipped leaf text, 0 page errors. Pre-existing on live main (not this branch, kit keeper item, as the worker said): on iPad the «Sai cung nữ dò la khẩu vị» kitSkillCard title wraps one letter per line. Shots kept in scratch only (not in git, not on CDN).

## (4) kc2val (nc + cnv), re-run by me on review/kc2val-home-r1
SEED 61 + 62 × 4 lives per arm, both arms self-study (`kc2val-gap.py`):
| origin | gap home − palace | per seed | home Danh / Sủng | palace Danh / Sủng |
|---|---|---|---|---|
| nc | **−72 (±25)** | −57 / −87 | 83 / 81 | 81 / 98 |
| cnv | **+35 (±47)** | 39 / 31 | 60 / 3 | 39 / 14 |
nc agrees with the claim −63 ±15 ✓; cnv inside the spread around 0 (worker −3 ±22) ✓. Same caveat as the worker: re-measure nc after fault 2 (the carry Sủng 45 may then be too high).

## (5) Gates
| gate | ch14-goals-r1 | kc2val-home-r1 |
|---|---|---|
| quickcheck.sh | **PASS** (old save ok; render 254/235, tab 442/354, buổi 1310/1334 ms; core gates PASS) — render ran while 2 kc2val browsers loaded the 4-core box | **PASS** (old save ok; render 168/305, buổi 1258/1194 ms; core gates PASS) |
| coop-e2e (live Worker) | 62 ok / 0 FAIL | not run: diff vs batch-d8 is only BAL.kcv.nc numbers + the measure script (no co-op path) |
| her-allergy.js | PASS | – |

## (6) Merge with live main
Both done above; both have origin/main 9391f9a9 as ancestor. kc2val-home-r1 carries batch-d8.

## Verdict
- review/ch14-goals-r1: **PASS a9131bfe80286320f68618f7a200aa6601f80982** (fast-forward from main 9391f9a9). Note for the coordinator: ch3 stays ~46 % until fault 2.
- review/kc2val-home-r1: **PASS 1845a0ed8344080354d83daef1cac2e35cb6613a** (contains review/batch-d8 8806f7b3: land with/after batch-d8's PASS; FF onto main 9391f9a9).
