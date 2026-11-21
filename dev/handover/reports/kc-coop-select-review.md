# REVIEW kc-coop-select r1 (E36r, opus BIG) — of 8b26815f → PASS 30cc71b2ca67475678ae63dd916162555e6400ef

PRIORITY #1 CHECK ('kc-coop-select|jcoopthinb|coop-thin|kc2Sel|nlAcc0'): OD 3 | ledger 5 | claims E36 (SSK 8b26815f, archived), E36r row 572 | main a4fdb642→c3a398dd: jcoopthinb unchanged vs 548dcd0d | review/* review/coop-thin-g (Foreman B, G #8): no edit in jcoopthinb.js / coop-together / accept-scan (checked, below) | reused: worker's coop-together.js / accept-scan.js, no new test files.

Reviewer session_01DgYSWp7ktXYqaHyYiXStGA, depth 6 (limit 8). Branch review/kc-coop-select-r1 = 8b26815f + final-merges of LIVE b1033eb0, a4fdb642, 8c8b8b6b, c3a398dd (index.html/sw.js only conflicts, rebuilt with build_site.sh). FF on LIVE c3a398dd. LIVE moved to 64d2e094 while the last gates ran: not merged (main re-merges; only index/sw expected to conflict).

## Verdict: PASS (no fix needed)

### (1) LIVE coop-together fail = test drift — CONFIRMED
- j82 kg82BackX gives every kg82 frame its own header ✕ `data-kitx=kgback`; on a result screen it presses `#kg82ok`. Old clear() looked only for `data-kitx=ov`, so seat B's exam result was never closed → S.selx with no tier → «B went through the selection card» FAIL every run.
- Player path: the test now clicks the visible ✕ in the DOM (same as a tap), on both seats (clear(A), clear(B)); with `--home=b` the other seat goes through the selection too. Family scan `grep -rln "kitx=ov\]" dev/test | xargs grep -L kgback` → 0 left (coop-together, lib/roulette, tuduc-mg fixed).
- Seen in shots: in co-op (both seats, thin 8) AND in solo (nc, «Dâng điệu múa» → skip) the entry-gate cover «Kiệu hoa đến cổng cung» (km-gate km-endon, waits for a tap) lies OVER the exam result; a tap clears it, then the result + ✕. Same in solo → law 1 holds; pre-existing order, not this branch (note for the kc-roads / entry-gate owner if the owner wants the result first).

### (2) Law-1 fix: thin guest runs the REAL chains — CONFIRMED
- `accept()` calls `nlAcc0` = the whole nlAccept chain as captured at jcoopthinb load (assemble order: every hook file — j66 74, j69 131, jdiff 140, jkiep 143, jage 144, jrank 245, jkc 299, jil 309, jkc2 321, jentry 322, joi 323, jrbatch 360 — loads BEFORE jcoopthinb 381; nothing after it wraps nlAccept/nlRun). `core()` calls the live `nlRun` (all hooks). One chain, no co-op copy: the old hand-copied j52 steps (pdBase / pdLife / nlRe log / kcInit) are gone (`git grep` shows them only in j52 / jkc).
- Host device untouched: nlNew / nlFaces held as no-ops during her accept; render / showModal / save are TH.NOOP in her context (jcoopthin:181), co-op save() writes only ctm-coop-last; j66/j69 store writes only when the host's NL_KEY seed == hers (never in practice); S.rkGid dropped, rkTrack re-run on her phone. __forceOrigin / __diffO restored in finally.
- accept-scan: origin/main 11/17 skipped → branch 0/17.
- Solo unchanged: jcoopthinb runs only in thin co-op; role-parity ×2 ALL PASS, outputs byte-identical.

### (3) Overlap with review/coop-thin-g (Foreman B) — NO CLASH
- `git merge-tree` of 354a572b's base vs origin/review/coop-thin-g: conflicts only in index.html / sw.js (generated). coop-thin-g does not edit jcoopthinb.js, nlAccept/nlRun hooks, coop-together.js or accept-scan.js.
- Seam (not a clash, for whoever lands second): coop-thin-g splits kc2SelPlay into kc2SelGame / kc2SelEnd and makes kc2SelEnd a level-12 intent in her context. Until now the thin guest never got the kc2Sel card; with this branch she does, so that intent path becomes live. Whichever lands second reruns `node dev/test/kc-roads/coop-together.js <out> "" --thin=13` (and --home=b) on the combined build.

## Gates (this box, LIVE Worker)
| gate | sha | result |
|---|---|---|
| coop-together matrix 18 pairs (9 home origins × both seat directions, palace origins rotating incl. cn) pass 1 + 2 | b1033eb0 merge da370d3b | 36/36 PASS |
| same matrix pass 3 | a4fdb642 merge a32dbf9e | 18/18 PASS (→ 54/54, every pair ×3) |
| coop-together thin=8 (guest iPad / guest Fold / home=b) | a32dbf9e | 31/31, 31/31, 29/29 (no week-2 stall this time) |
| coop-e2e ×2 | a32dbf9e | 68/68, 68/68 |
| coop-thin-b (level 2, all origins) / coop-thin-b-r1 | a32dbf9e | 136/136 / 39/39 |
| kc-roads direct.js (10 origins) / route.js cnv nc bd | a32dbf9e | rc 0 all |
| role-parity ×2 | a32dbf9e | ALL PASS ×2, byte-identical |
| one-core-guard | da370d3b | PASS (fails 0) |
| quickcheck (open, old save, perf, core gates) | a32dbf9e | PASS · open 1676 ms · old save ok |
| 354a572b (LIVE 8c8b8b6b: den-look, kit-ton-row, mgcal b4 — disjoint): coop-together default + muoi/bd home=b + thin=8, coop-e2e ×2, accept-scan, quickcheck | 354a572b | 29/29 ×3, 68/68 ×2, 0/17 skipped, PASS |
| FINAL 30cc71b2 (LIVE c3a398dd: kit-kg82-stack CSS / td-dung rows / kit-progress-run — not the ✕ path): coop-together default + muoi/bd home=b + thin=8, coop-e2e ×2, quickcheck | 30cc71b2 | 29/29 ×3, 68/68 ×2, PASS (open 1600 ms, old save ok) |

## Shots (local only; CDN 401) — LOOKED 3×
Fold 755x1000 + iPad 1180x820, guest seat in a thin-8 room: 01b-selection «Lễ ra mắt» (Dâng điệu múa / Dâng khúc đàn cố quốc / Cúi đầu chờ xét, kit option cards, odds ladder word «Nắm chắc», no overflow; figure = silhouette because CDN art is 401 locally); exam-result moment (gate cover over the result, as in solo). Scratch only, deleted.

## Laws touched
1 two-way: both seats get the same new-life steps (home=a and home=b) ✓ · 4 one core: no numbers added ✓ · 6c real objects: jil dead-life pieces now run for the thin guest ✓ · 7 wording: no new player text ✓ · 9/10 kit: no UI change ✓ · 11 whole group: test family 3→0, hook family 11→0 ✓ · 13 prio #1 lines present ✓.
