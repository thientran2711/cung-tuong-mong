# COOP-QCARD — r1 B FIXER 3eUktfyY (cancelled, handover) → r2 B FIXER 6CnG19EN: SSK review/coop-qcard-r2 9f0bd3ed (see «## ROUND 2»)
PRIORITY #1 CHECK ('COOP-QCARD'): OD 0 | ledger 0 | main 0 | review/* 0 (coop-clear-rv173 8e1121d3 came later, test-only) | claims Foreman B.
- Guilty commit: 98c77517 (LAND ob-verdict-3). Bisect on coop-e2e SWAP0 harness: 4cd3f974 passes selection day 1; 98c77517 / 408f3f9b / 08060ec7 / LIVE stall on Q0 «Dưỡng Tú viện».
- Mechanism: «Theo thái giám vào cửa viện» → result card HELD (jverdict) → roll-call kit scene (.kscn z 57) opens OVER the held card (z 47): «Tiếp ▸» unreachable for the whole scene, Q0 hidden, «Sẵn sàng» off. A real player is NOT dead-locked (after the scene the card shows; Tiếp → Q0) — but order is wrong and nothing tappable except the scene.
- 2nd LIVE fault (since 611fca61 ring-build jkstage): body.kscn-on dropped whenever #modal hides while a kit scene still plays (mood seal .kemo-big over the scene; every «scene up» check wrong). NOT covered by coop-clear-rv173 (test-only).
- review/coop-qcard b27f8d8f (on LIVE f28d28b9) = GAME code + test: jverdict held card z KIT_SCN.z+1 + «covered 2 looks → release»; jkstage/jkitsel keep kscn-on while the other owner is up; coop-clear taps a TOPMOST held «Tiếp ▸»; new dev/test/coop-qcard.js (real taps, Fold+iPad): LIVE FAIL 4 (A covered held card, B kscn-on), fix PASS, MUTATE FAIL; dev/measure/coop-qcard-scan.py F-SCN unsafe 4→0, F-HOLD unsafe 1→0.
- Pre-existing on LIVE (not mine, same counts on fix): ob-verdict-3 family scan 34/35 since d7718f8b (ring-build); ob-verdict.test 58 FAIL. Gates NOT run (coop-e2e SWAP0/1 stopped on cancel).

## HANDOVER (27/11 ~13:50Z, ctx 33 % ≥ START_CTX 4 % + 25 %) — RE-OPENED scope from Foreman B 13:43Z, for the successor fixer
Resume: sparse worktree from origin/review/coop-qcard b27f8d8f (fetch --depth=30 under flock). Commit list: jverdict (covered() + dog cover release + .kres-hold z KIT_SCN.z+1), jkstage kstgScnOff(), jkitsel close off() guard, coop-clear step 0 (topmost held «Tiếp ▸»), dev/test/coop-qcard.js, dev/measure/coop-qcard-scan.py.
TODO (Foreman B 13:43Z order, verbatim intent): (a) merge newest LIVE (d9ca7892 or newer) into review/coop-qcard, assemble; (b) LAW 11 table keep/fix: every held/result card or modal that can sit under a kit scene (z order) or lose body.kscn-on while a scene plays — start from coop-qcard-scan.py rows (F-HOLD 8 gates, F-SCN sites) + z of #kpodov 9000 / #modal / kroul / jkring kring-on (#rtoast 290) ; (c) KIT REQUEST entry in dev/kit/KIT_REQUESTS.md + KIT.md note (held result card z = KIT_SCN.z+1; body.kscn-on two owners kitScene + kitStage) for kit keeper sign-off (law 9); (d) gates: coop-qcard.js Fold+iPad (PASS) + COOP_QCARD_MUT=1 (FAIL), coop-e2e SWAP0+SWAP1 using coop-clear-rv173 8e1121d3's coop-clear.js (merge it; keep step 0 only if not already covered), ob-verdict-3 tests (LIVE baseline 34/35 family-scan FAIL since d7718f8b — compare, not mine), ob-verdict.test (LIVE 58 FAIL baseline), kit-stage tests, quickcheck ALONE.
Notes: coop-e2e hang shows NO FAIL line (lifeWait 6 min × 80 tries) — watch progress past 05-world, not FAIL lines. selx-flow.js <wt> <out> 1 on fix gave «card with choices not visible ipad day 1 Đông sở» — LIVE comparison was NOT finished (check). Then «SẴN SÀNG KIỂM review/coop-qcard <sha>» at END of FOREMAN_B_STATUS.md + message Foreman B.

## ROUND 2 (B FIXER COOP-QCARD r2 session_01N1tNP6CnG19ENjNV3yVmkj, 27/11 ~14:00Z–) — review/coop-qcard-r2
PRIORITY #1 CHECK ('COOP-QCARD'): OD 0 | ledger 0 | claims 1 (B, this item) | main 0 | review/* review/coop-qcard b27f8d8f + review/coop-clear-rv173 8e1121d3 (test only, NOT on LIVE d9ca7892) | archive 0.
KIT CHECK: reuses the kit result card (#rtoast.karesult KIT 7.4 / kitResultCard §93.8), the kit scene layer (kitScene §93.1, KIT_SCN.z), the kit stage (jkstage §102) — no new part, no private CSS.
Base: review/coop-qcard b27f8d8f. Merges: (1) LIVE d9ca7892 (lc30-b2) — no conflict; LIVE source hunks j14 j2 j25 j32 j42 j82 j9 jagacts2 jagstf2 jagwhyg2a jaudit jbal jbal2 jbaleff jkc jpromsv jrcv jselx jselxday taken whole (none touch jverdict / jkstage / jkitsel / coop-clear). (2) review/coop-clear-rv173 8e1121d3 (test only): SCN() needs a real .kscn layer — kept; its «1c» held-card tap = our step 0, kept ONCE as step 0 (taps the held «Tiếp ▸» only when it is the top of the screen: a player cannot tap a covered card).
LAW 11 widening (new in r2): with a kit scene open, the PLAIN result card (resultShow) and the scene's own result card kitResultCard §93.8 (selection days: «Giáo tập ma ma» card, jselxday selxRes) ALSO sat under the scene on LIVE (z 47 < 57) — she never saw what her choice did. Fix = ONE rule in jverdict kit 7.4 CSS: `.rtoast.karesult{z-index:KIT_SCN.z+1}` (r1's held-only rule merged into it; ring screens keep .kring-on #rtoast 290; an open card still PARKS it, KIT 32.10a).
FAMILY TABLE (dev/measure/coop-qcard-scan.py, LIVE → r2):
| family | site / layer | LIVE | r2 | verdict |
|---|---|---|---|---|
| F-Z | #rtoast.karesult plain result card | z 47 under scene | 58 over | FIX |
| F-Z | #rtoast kitResultCard §93.8 | z 47 under scene | 58 over | FIX |
| F-Z | #rtoast.karesult.kres-hold held card | z 47 under scene | 58 over | FIX (r1) |
| F-Z | .kring-on #rtoast / #kpodov 9000 / .kmov 9100 / .kroul max | over | over | KEEP |
| F-Z | #modal cards + #modal.kstg stage 42 / .modal.kptitle 55 / .kfoc 46 | under by design (card waits, F-HOLD) | same | KEEP |
| F-SCN | jkitsel kitScene.close off() | drops kscn-on while a stage is up | keeps it | FIX (r1) |
| F-SCN | jkstage kstgOff / showModal / #modal hidden observer (3 calls → kstgScnOff) | drops kscn-on while a scene plays | keeps it | FIX (r1) |
| F-HOLD | jverdict RF hold | held card under scene, no release | over scene + covered-2-looks release | FIX (r1) |
| F-HOLD | jdayq / jselxsc / jrbatch / jspread / jgreet / jnf / jdfv | safe | safe | KEEP |
Totals: LIVE F-HOLD unsafe 1, F-SCN unsafe 3 sites (2 files), F-Z unsafe 3 → r2: 0 / 0 / 0. Solo AND co-op: the same code runs on both seats (coop-e2e SWAP0 + SWAP1 cover both seatings).
KIT: KIT.md §7.4 + §93.1 lines rewritten in place; KIT_REQUESTS.md «K-RES-OVER-SCN» OPEN for kit keeper sign-off (law 9).
TEST: dev/test/coop-qcard.js + (D) «every result card kind over an open kit scene»; shots now outside git (QC_SHOTS). Shots on CDN img/_review/coop-qcard/: r2-fix-held-over-scene-{fold,ipad}.png (KẾT QUẢ + «Tiếp ▸» over the Giáo tập ma ma scene), r2-live-held-under-scene-{fold,ipad}.png (LIVE: card hidden) — looked 3×.
LIVE moved twice during the work: final merge LIVE 772bee4f (lc31-goal: goal-links-rv174 + coop-clear-rv173) — source auto-merged, no overlap with jverdict / jkstage / jkitsel / rtoast / kscn; built files --ours then rebuilt; assets.json = LIVE. Branch head 9f0bd3ed9ede42b66b02cc28ed5a7fff00ea8ba2 (last commit = KIT_REQUESTS status line only).
K-RES-OVER-SCN: SIGNED by kit keeper KK60 (FOREMAN_B_STATUS 27/11 ~19:00Z).
GATES (Fold 755x1000 + iPad 1180x820):
| gate | r2 | LIVE |
|---|---|---|
| coop-qcard.js (A/B/C/D) | PASS (on d144959a and on 171f3875 after the 772bee4f merge) | FAIL 6 (A covered 60/18 looks, B kscn-on missing 58/48 looks, D) |
| coop-qcard.js COOP_QCARD_MUT=1 | FAIL 4 (A + D, both devices) — test bites | — |
| coop-e2e SWAP0 (coop-clear-rv173 + step 0) | 143/143 ×2 (d144959a, 171f3875) | rv173 report 143/143 |
| coop-e2e SWAP1 | 140/143, 141/143 — all rows «the same world on both seats» (S.wxDay.sk host≠guest, staff loyal/tin) + its R10RV echo after rejoin | 143, 143, 142/143 — same «same world» S.wxDay row → PRE-EXISTING coop-host-lag flake (also in night-ledger / robot10-E / lr5 reports); r2 touches no world state. First r2 SWAP1 run (parallel load) sat in week 2 > 1 h and was killed — re-run alone completed |
| ob-verdict-3.test | 34/35, FAIL rows ⊂ LIVE's (4 fewer e68 rows) | 34/35 (family scan, since d7718f8b) |
| kit-stage.js | PASS | PASS |
| dialog-order held / next probes + dialog-order-scan | PASS; scan TOP 78 / DIRECT 104 (Fold), 75/100 (iPad), 0 page errors | identical |
| oldsave-r1 (LIVE build save → r2) | 16/16 | — |
| goal-links.js (new on LIVE) | PASS Fold + iPad | — |
| quickcheck ALONE | 9f0bd3ed: PASS (core gates + open + old save + perf buổi 1672/1538 ms) | d9ca7892 ALONE: FAIL (q-softlock 1 + button-crawl) |
Notes: two earlier quickcheck runs on d144959a failed only G4 94-q-softlock iPad (4) and once perf buổi 3056 ms; q-softlock run alone = r2 PASS / LIVE FAIL 8, perf re-measured alone 2× PASS → flaky, not this change. Tip for testers: python http.server serves .html without charset → «Invalid or unexpected token»; serve with charset=utf-8 (dialog-order probes need an http base).
SSK: review/coop-qcard-r2 9f0bd3ed9ede42b66b02cc28ed5a7fff00ea8ba2 (BIG co-op + kit layer; on LIVE 772bee4f).
