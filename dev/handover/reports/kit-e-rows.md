# kit-e-rows — report (kit-mark; ROOT-80 order: E30 `kitColDot` + E25b «KR thế lực nhà»)

Branch `review/kit-e-rows` @ dd2e0fe1, built ON TOP of `review/kit-cost-rows-home` 3332c63b (same jk2b phrase map / same lines; if cost-rows lands first this branch merges clean, if not the reviewer sees both). `bash dev/tools/quickcheck.sh dd2e0fe1` PASS (197 s, core gates PASS, old save ok, perf like live). `golive.sh` not run (classifier refuses).

## 1. `kitColDot` / `kitColDots` (KIT §60.1, kit page sample §60.1)
Read-only colour dot + family name (jtoil, next to the §60 picker `kitSwatches`): 12 px sm / 16 px md dot, 1 px `--line` ring, sheen like §60; `role` main/sec adds «chính» / «phụ»; no button / link. Colour = DATA, never the kit's own: key of the one table `BAL.dc.fam` (jbal2, review/dresscode) or a ready object `{hex|col, n|name}`; unknown key → its key as the name, neutral dot. `kitColDots([[fam,role],…])` = a row with `.ksep ·`. E30's `dcDots()` already calls `kitColDot` when it exists. NB: `BAL.dc.fam` is NOT on main yet (review/dresscode) — the test feeds a ready object and a temporary `BAL.dc` table.

## 2. «thế lực nhà ±n» (KIT §13.15)
`kitHintPhrase` + `KIT_HINT_MAG` (jk2b): «nhà ngươi thêm vững thế / thế lực nhà ngươi thêm vững» ↔ «nhà ngươi sút thế / … sút giảm». Rows already keep the phrase (kaRows). Before: an option holding «thế lực nhà −8» was an unknown stat line → vanished from the hint (E25b: 3 of 398 choices on E28).

## Tests
`dev/test/kit-e-rows.js` 22/22 (Fold 755x1000 + iPad 1180x820): five dots + names, sizes 12/16, roles, read-only, table lookup, separator, fits; word mode names the clan power at every level (level 0 never says «hỏng thì», by design); rows keep it. `kit-cost-rows-home.js` 15/15 and one-core-guard still green.

## Limits
- E28 «Cha bị hặc tội» and E25b's `costrows.js` live on branches not on the remote — I did NOT see the real E28 card; E25b should re-run its scan after merging this (and cost-rows) branch.
- The three places that should show the dot (item «Màu» rows, jmcal popover, festival gate) belong to review/dresscode (E30): wiring is theirs; the kit part is ready.
