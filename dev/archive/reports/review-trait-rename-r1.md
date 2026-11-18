# review/trait-rename-r1 — reviewer verdict (opus, BIG tier: save migration)

PRIORITY #1 CHECK ('Hiểm độc|Xảo quyệt'): OD 2 (L1562 rule, L1563 3-trait pool → Foreman C) | main 15 files | review/* trait-rename (this one) | claims B trait-rename. Reused the worker's TRAIT_OLD/traitLabel/trMigrate; no second map.
START_CTX ~8 %.

## VERDICT: PASS 84d4789456e760a8f4387f4006f2d8f861796dc4
Branch review/trait-rename-r1 = worker 27886326 + 2 reviewer commits; descends from current origin/main 6c4f21c3 (fast-forward).

## Reviewer fixes (small, on -r1)
1. f0c839e6 — two player-visible lowercase leftovers the worker's case-sensitive scan missed (LUẬT SỬA CẢ NHÓM):
   - j95.js:90 harm-motive reason `parts.push("tính hiểm độc")` → "tính xảo quyệt" (this string is stored in the act log `why` and shown to the player; the seeded run below caught it in the save).
   - j42.js:279 maid-route malice line `${m.name} hiểm độc lại chẳng ưa ngươi` (fires on malice ≥ 60, not on the trait) → `${m.name} vốn nhiều ác ý, lại chẳng ưa ngươi` so it no longer reads as the old nết.
2. 84d47894 — site rebuilt (build_site.sh: index.html, sw.js, assets.json) so quickcheck is not "NOT BUILT".

## Checks
| # | Check | Result |
|---|---|---|
| 1 | Scan `git grep -i "hiểm độc"` in dev/build/j*.js + dev/kit + built index.html | only the 2 legacy-map lines in j1.js (+ VANPHONG rule note). Remaining hits are docs/history (NAMING_APPLIED.md, plans), art scan dump dev/art/pp4/titles.json (not loaded by the game), generated dev/build/all*.js, old fixtures — not player-visible. |
| 2 | Behaviour unchanged, OLD save | Old save made on base build 6c4f21c3 (seeded bot, 2 natural "Hiểm độc" consorts). Loaded in base and in branch, same seed, endTurn() ×60 weeks (year 1 m4 → year 2 m11): world snapshot (ser(), keys sorted, old word mapped) IDENTICAL every week. PERS weights, j24/j29/j40/j42 trait checks all ran; a NEW consort (id 11) drawn mid-run got "Xảo quyệt" in branch at the same draw as "Hiểm độc" in base → new-save path same too. Control base-vs-base also identical. (Whole-page bot-same.js is not deterministic even base-vs-base, so it was not used as proof.) |
| 3 | Old saves / share codes / co-op | Every load path goes through deser(): slot load, import code (readCode → slot → loadSlot), co-op world (jcoopworld:140) and rejoin snapshot (jcoopworld:913). trMigrate rewrites values + object keys (key moves to the end of its object: order only, proven harmless by #2). Figure art: TRK["Xảo quyệt"]="hiemdoc", LOOKFOR renamed → same art. |
| 4 | One label source | TRAIT_OLD in j1.js only; no second map. one-core-guard 0 fails (no --allow-grow). |
| 4 | trait-rename-oldsave.js | 9/9 |
| 4 | coop-e2e | 60/60 |
| 4 | coop-one-world | PASS |
| 4 | quickcheck (HEAD 84d47894) | PASS (old save ok, core gates PASS, perf new/live render 207/215 ms) |
| 5 | Merge on latest origin/main | descends from 6c4f21c3 (= current main) |
| UI | Fold 755x1000@2 + iPad 1180x820@2, "Thang nguy hiểm" card | kit chip "Xảo quyệt +10" fits, no cut, no overflow, no page errors (shots fold-chip, ipad-chip in scratch, deleted). |

## Notes for Foreman B (non-blocking)
- `traitLabel()` is defined but no display calls it (migration on load makes it unneeded today). Foreman C's 3-trait pool should route display through it or drop it.
- Mixed builds in one co-op room: an old-build peer would compare "Hiểm độc" against the new word until it reloads; swreg's new-build reload covers this. No action.
- Family list (other pre-judging nết) is in the worker report for the owner; nothing else renamed.
