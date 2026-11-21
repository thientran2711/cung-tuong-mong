# E38 — RE-GATE LANDER #2 (opus, depth 6)
PRIORITY #1 CHECK ('cold-faction|person-minigame-acts-c|land'): OD 93 | ledger 5 | claims 8 | main 15 | review/* 10 | archive 0 — reused the reviewer PASS branches (cold-faction-r6 5b5510f0, person-minigame-acts-c-r2 0a08b18f); nothing new built.

## 1. cold-faction → LAND READY 2208d34140e8d8dd3bbb5308dc6fc04af8c38d9c (review/cold-faction-land; FF on LIVE e4fd4dcf)
- merges: LIVE a4fdb642 (ca976c5c), LIVE e4fd4dcf (6ce72a5e) — index.html/sw.js conflicts only, rebuilt.
- gates on a4fdb642 round: quickcheck PASS, one-core, cold-faction 20/20, coop-e2e 68/68, coop-cold-faction 22/22 ×2, role-parity 1 (md5 0664fd79 = E33r).
- gates on 6ce72a5e: quickcheck PASS + old save, one-core, cold-faction 20/20, coop-e2e 68/68, coop-cold-faction 22/22 ×3 (each run both seat orders), role-parity ×2 byte-identical (0664fd79).
- 2208d341 = test-only harness fix: coop-cold-faction now waits for COOPW.friend() before the SETUP check (flaked 2/3 under load at «each has the other as a consort entry»; 3/3 after). Built files unchanged.
- Then handed to MAIN85 E-LANDER (FOREMAN E #25 order 02:33Z).

## 2. person-minigame-acts-c → LAND READY c45ba8cb30caab793450c85e6b5514523c795dee (review/person-minigame-acts-c-land; FF on LIVE db6ae2a0)
- first stacked on cold-faction-land (d1cd3ad8), then re-based on LIVE ALONE per FOREMAN E #25: 0a08b18f + LIVE 64d2e094 (f599097d; role-parity-exempt.json union) + a88b14f0 (a5f30c3a) + db6ae2a0 (c45ba8cb).
- gates on a5f30c3a: quickcheck PASS, one-core, coop-e2e 92/92 ×2, pm-coop-d 35/35 (seat 0) + 36/36 (seat 1), pm-live 19, pm-giveup 41/41, -c 22, pma 31/31, role-parity ×2 byte-identical (b1a742bb).
- short re-gate c45ba8cb: quickcheck PASS, one-core, coop-e2e 92/92, pm-coop-d 35/35 both seats, pma 31/31.
- notes: coop-e2e «same Thái hậu picture» flake seen 1/2 on 64d2e094 / d1cd3ad8 (known, E22u); pma «jts.js unchanged vs origin/main» fails only when LIVE moved jts.js after the merge (test compares to the local origin/main ref).
- LIVE 0d60ae54 (kit-tap-word) arrived after: index/sw-only conflicts → main self-merge.

Laws touched: none changed by the lander (merge + rebuild only; one test harness wait). Co-op land gate OD L594: both features checked on both seats.
Status: idle for more re-gates. Worktrees /home/user/wt/e38 (cold), /home/user/wt/e38b (pm), /home/user/wt/e38h (handover).

## 3. story-voice → LAND READY 54af15fa (see reports/story-voice-review.md «LAND (E38)»)

## 4. person-minigame-acts-c round 2 → LAND READY ffedf4f4f2ceb840f46cc3d62b354cccd50873dc
- c45ba8cb failed to land (real j82.js conflict vs LIVE fc0867ca). Re-merged: kg82Play kept BOTH sides (LIVE `KG82.why=null` reset + pm hooks onHud/onFin/engX/endMark/guardMs).
- gates on ffedf4f4: quickcheck + old save, one-core, coop-e2e 92/92, pm-coop-d 35/35 both seats, pm-live 19, pm-giveup 41/41, -c 22, pma 31/31, kc-roads coop-together 29/29 + scan/route/direct exit 0, role-parity ×2 identical (290a5715).
- vs LIVE aee7ff84: index/sw only.

## HANDOVER (E38 rolls, ctx ~27 % ≈ START + 25 %)
- Open jobs: none of mine. All three LAND READY lines are in FOREMAN_E_STATUS (cold-faction 2208d341 → MAIN85 E-LANDER; story-voice 54af15fa; pm -c ffedf4f4).
- If LIVE moves before main lands: merge origin/main into the -land branch, `git checkout --theirs index.html sw.js`, `bash dev/site/build_site.sh`, commit, short re-gate (quickcheck + coop-e2e + the feature's co-op check: coop-cold-faction / story-voice/coop-seats.js / pm-coop-d `<worker> 0 0` and `0 1`).
- Tips: run long chains with Bash run_in_background (2 h), not inside Monitor (Monitor kills its command at 30 min); kc-roads scan/route/direct need the url arg `file://<wt>/dev/index.html`; pma's «jts.js unchanged vs origin/main» row compares to the LOCAL origin/main ref (fetch first); coop-e2e «same Thái hậu picture» flakes sometimes.
- Worktrees to delete: /home/user/wt/e38 /home/user/wt/e38b /home/user/wt/e38s /home/user/wt/e38h, scratch /home/user/wt/e38-out.
- Note for FOREMAN: dev/build/jrd_pt.js:379 Phù Tang «Thưa: việc nước, thiếp không dám bàn» (copy of a j67 line that story-voice renamed); 113 other road labels also keep «thiếp» → decide whether a voice pass is wanted.
