# it-key-guard — report (worker, opus) — r2 SẴN SÀNG KIỂM 02561fca (r1: ce1eda7b FAIL, see review-it-key-guard-r1.md)
Branch `review/it-key-guard` from live main 744b80e7. Commits: 23e53eaa (itm + family), cf6f95b6 (CHANGE line + site), 7662ae56 (S.vl root cause), ce1eda7b (site).
START_CTX ~5 % of the window; ended ~20 % (no rollover needed).

## The fault
review-coop-stable-r1 N1: host threw `Cannot read properties of undefined (reading 'tg')` in `npcMonthly` (j8.js:399 `(IT[e.k].tg||[])`)
inside a co-op act → never sent its week end → week stuck. palace-voice (cc6a8f55) hit the same class ("reading 'sl'") twice and only
guarded one line. An inventory entry named a key this build's `IT` does not hold.

## Root causes (why keys go missing)
1. **FOUND, the live one: field-name clash `vl`.** jvoice (palace-voice) kept its line memory in `S.vl`
   (`{"cycle:ask":{…,"__b","__l"}}`), but `p.vl` is jveil's WORN VEIL (a keyed piece). Every jveil path that sees a truthy `p.vl` treats
   the memory as a veil: wearing a veil pushes it into the chest (`vlWear: if(p.vl)p.inv.push(p.vl)`) → a piece with NO key; `vlTakeOff`
   reads `IT[p.vl.k].n` → throws. In co-op her bag rides to the other seat as the friend entry's `inv` (famLive/bagOf) → the host's
   NPC month reads `IT[undefined].tg` → N1. Caught live: an instrumented coop-e2e on the fixed-but-not-yet-vl build logged
   `BADIT S {"cycle:ask":{…}}` on both seats.
2. Old saves: no load step ever checked bag keys; a renamed/removed item key, or junk (null / string / no key) in a saved bag, throws in
   every month. (Today all 26 keys of the old all40–43 builds still exist; the risk is the next rename.)
3. Co-op world / friend bag written by the other seat's build: the room keeps the world across updates (CW.hold only guards while both
   are online on different builds), so a key added/removed in one build reaches the other.
(Runtime-registered items — j92 wardrobe, jrcp/jtds books, j97 ngự tứ, jveil, jstip, jeitem, jitev — all register at LOAD on every
client, deterministically: 261 keys, same on both seats; not a cause.)

## Fix (root + whole family)
- **Core (j8, one place):** `itm(k)` = the real IT entry, else ONE frozen inert stub `IT_NONE` ("Vật cũ không rõ", tg [], keep, pr 0:
  never gifted, sold, used or worn); `itKnown(e)`; `IT_ALIAS` (old key → new key, empty today; add a line on any rename);
  `itCleanL/itClean()` drops keyless/junk pieces, applies aliases, drops unknown shop keys, moves an old `S.vl` memory to `S.vmem` and
  clears any other non-piece `p.vl`. `itClean()` runs in `normAll` = every load AND every co-op world apply (`fromCanon → deser`).
  `iname()` uses itm (no raw key shown to the player). Unknown keys are KEPT inert (a later build may know them; no data loss).
- **jvoice:** memory → `S.vmem` (root of cause 1).
- **jcoopworld famIn:** friend bag cleaned on receipt.
- **Family:** every direct `IT[x].p` read and every unguarded alias `v=IT[x]; v.p` → `itm(x)` (mechanical, writes / `delete` /
  existence checks untouched). Field-clash family scanned too.

## Scan (dev/test/it-key-scan.py; `--git <ref>` for before; exit 1 if any left)
| | 744b80e7 (before) | ce1eda7b (after) |
|---|---|---|
| unguarded item-table reads | 283 in 49 files | 0 |
| piece-vs-map field clashes | 1 (`vl`: jveil/jrash piece, jvoice map) | 0 |

Before per file: j8 37 · jveil 29 · jinv 22 · jts 16 · j83 14 · jwdinv 14 · jcui 12 · jdress 12 · j92 10 · jdh2 9 · jevb 8 · jeitem 7 · jdis 6 ·
jstip 6 · j78 5 · jlost 5 · jpoison 5 · jtoil 5 · j20 4 · j67 4 · j93 4 · jrcp 4 · j2 3 · j29 3 · jact 3 · jlux 3 · jtruth 3 · j24 2 · j30 2 ·
j40 2 · jecon 2 · jitd 2 · jitev 2 · jkc 2 · jrash 2 · j15 j70 j72 j75 j84 j97 jaudit jfx jgift jgpick jopic jtoilr jtq14 jweather 1 each. After: 0 everywhere.

## Tests (all on ce1eda7b unless said)
| test | result |
|---|---|
| quickcheck.sh | PASS (open 1052 ms, old save from live ok, render 272/287, buổi 980/887 ms, core gates PASS) |
| coop-e2e.js (LIVE Worker) | 59/59 |
| coop-e2e + bag probe (every 300 ms: any bag piece not in IT, both seats) | 59/59, 0 bad pieces (same probe on 7662ae56^ build: `BADIT S {"cycle:ask"…}` both seats) |
| it-key-guard.js 8 lives × 200 months (old save with unknown keys + junk + S.vl clash on lives 1,3,5,7; plain on 2,4,6,8) | PASS: 1 360 months, 0 thrown, 0 page errors, junk 0, unknown keys kept inert (22/life), S.vl moved, 0 keyless pieces at end, chest renders the stub |
| it-key-guard.js on OLD build 744b80e7 (ONLYUNK=1) | FAIL as expected: `reading 'tg'` every month from month 2 (reproduces N1); with junk: `reading 't'` |
| it-key-scan.py | 0 / 0 (exit 0) |
No UI / CSS / kit part changed; one player-visible word: the stub name "Vật cũ không rõ" (+ desc "Món đồ cũ, không rõ lai lịch") and the CHANGE line.
No shots in git; scratch only /home/user/wt/itkey-scratch.

## For the reviewer
- Run: `python3 dev/test/it-key-scan.py`, `python3 dev/build/assemble.py && node dev/test/it-key-guard.js 4 120`, coop-e2e.
- Check: `itm` never used on the left of `=`; existence checks (`if(IT[k])`, `IT[k]&&`) unchanged; the stub is frozen.
- Open item (not this task): CW.hold build-skew guard covers only online seats; the stored room world is now made safe by itClean, not blocked.

## r2 (answer to review-it-key-guard-r1 FAIL) — SẴN SÀNG KIỂM 02561fca
Branch review/it-key-guard = reviewer's trial merge a9e19997 (reused) + 593285a9 (fix) + merge of main 7abaf07a (index/sw from main) + 02561fca (site + assets rebuilt).
1. **Raw key** — kitItemInfo (jkrev, the one kit item model) now reads `itm(k)` (name/sub = the stub, never the key). Whole family:
   13 raw-key name fallbacks → `itm(k).n`: j20, j75, j92, j93, jdress, jecon, jgift, jitd, jkrev, jpromo, jstip ×2, jtruth.
   it-key-scan.py part 3 (raw-key fallbacks: `IT[k]?..n:k`, `(IT[k]||{}).n||k`, `it.n||k`, `it?it.n:k`): a9e19997 **13** → **0**.
2. **One behaviour for an unknown piece: inert and never shown.** Not listed in Tư trang (as before) AND now never revealed: jfx kmDiff
   reveal and the bestow chest skip `!itKnown` pieces. (It still counts nowhere: not sold, not gifted, not used.)
3. **Rebase**: a9e19997 reused; main 7abaf07a merged (only index.html/sw.js conflicted → main's, rebuilt). Scan on the result 0 / 0 / 0.
4. Non-blocking note done: jvoice memory written ONTO a worn veil is moved from the veil to S.vmem by itClean.

| test (02561fca) | result |
|---|---|
| it-key-scan.py | reads 0 · field clashes 0 · raw-key fallbacks 0 (exit 0) |
| it-key-guard.js 8×200 + new UI part | PASS: 1 464 months, 0 thrown, 0 page errors, 0 keyless; UI: known piece revealed 1, unknown revealed 0, rewards 0, raw key in page 0 |
| same test on a9e19997 | FAIL (UI: reveal named "zz_gone_item") — the test catches r1's finding |
| quickcheck.sh | PASS (open 844 ms, old save ok, render 233/233, buổi 1059/1216, core gates PASS) |
| coop-e2e (LIVE Worker) | 60/60, exit 0 |
UI test runs at 755x1000 (Fold); no shot taken (logic check on KFX.gains/rewards + page HTML). No kit / CSS change.
