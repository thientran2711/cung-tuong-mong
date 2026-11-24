# TITLES2 — BIG re-review r2 (E61r, session_01DgYSWn36YCNNcH33EoAbV8, Foreman E ROOT) — verdict: FAIL a16b0341

PRIORITY #1 CHECK: ('danh hiệu|DH_CAT|jdh|titles2') OD 23/11 ~22:45Z Q + ~22:55Z BUILD NOW (read verbatim) | main: jdh/jdh2/jkcg/jgecat/j8 titles reused; NEW on LIVE 27240ccb: j72c composed việc nhờ (thin-p3) | review/*: review/titles2-r 0e3a4d7f (E58), review/titles2-r2 (this) | reports titles2.md «FIX r1», titles2-review.md (E56r), titles2-scan-r1.md | claims TITLES2 r2 row (E61r).

Reviewed review/titles2-r 0e3a4d7f. Merges on review/titles2-r2 (pushed):
- **868be3c8** = 0e3a4d7f + LIVE b7598e72. Conflicts: assemble.py (LIVE list + jdh3n/jdh3 after jge), index.html/sw.js (rebuilt, assets.json = LIVE). Code overlap: jbal2.js only (separate hunks: BAL.dh vs BAL.blopt) — checked.
- **a16b0341** = 868be3c8 + LIVE 27240ccb (kit-dhcapfit + thin-p3 landed meanwhile). Conflicts: assemble.py (+ j72sd/j72c), KIT_REQUESTS.md (K-DH-CAPFIT: LIVE's DONE entry replaces the OPEN one, canon overwrite), index.html/sw.js rebuilt, assets.json = LIVE. jdh.js auto-merged (branch: panel count; LIVE: kdhCapFit) — separate hunks. Note: dev/kit/KIT.md:4635-4647 holds conflict markers ALREADY ON LIVE 27240ccb (not this branch) → FOR MAIN.

## Gates
| gate | 868be3c8 (LIVE b7598e72) | a16b0341 (LIVE 27240ccb) |
|---|---|---|
| titles2-unit | PASS 63/63 | **FAIL F2** «every T7 chain (392) has its own pair» ×3 runs; A2 «caught fired» failed once in 3 runs (flaky, passes on rerun) |
| titles2-scan | rows 577 · missing 0 · clashes 0 · dups 0 · long 0 · bad how 0 | rows 833 · **missing 256** (every `c:j72c-*` chain) |
| quickcheck + old save | PASS ×2 (core gates PASS). buổi new/live 1288/898, then 2155/1079 ms (second run alone on the box); render/tab/tasks equal | not rerun (FAIL) |
| role-parity | ALL PASS ×2 | not rerun |
| coop-e2e Fold host / COOP_SWAP=1 | **141/141, 141/141, 141/141, 141/141** (two pairs; E58's 139/140 not seen → not this branch) | not rerun |
| titles2-ui Fold 755x1000 + iPad 1180x820 | PASS, topmost every step; shots LOOKED AT (panel top / Danh tiếng / Chính truyện, card, notice, chapter notice): kit dialog on both devices | not rerun |

## (a) r1 faults 1–6 — all fixed on 0e3a4d7f
1. per chapter: 48 roads × 8 (.4 + .5–.11) = 384 chapters × good + bad = 768 names, own key cp_<road>_<n>_t|a, once. I read ALL 384 rows vs each chapter's t: fitting cổ trang, from the chapter's own words, ≤ 4 words; my own check: 1040 names, 0 dups, no clash (scan: vs jdh/jkcg/jgecat/j8 + arc/chapter names). Nits only (not FAIL): bd_ngua.6 good «Trình lộ dẫn giả» reads ambiguous; several chain bad names repeat the «… hỏng việc» / «… lỡ» ending.
2. per j72 chain: 136 static templates each own pair (once) ✓ — but see FAIL 1 below.
3. j70 per method group: độc only in {poison, poison2, musk, kpoison} ✓; vu / đồn / ngáng trở / hại thân names fit their methods ✓.
4. every bad j71 way titled (6), declines title-free, plain options each with a reason ✓.
5. how texts: natural, no digits/%, counted ones after a verb phrase ✓ (1112 checked).
6. titles2-ui: topmost check on every step ✓; my shots show the dialog, not the life cover.
## (b) old saves: old per-road / per-kind / any-method keys kept `old:1`, never given (unit C2), panel counts them only if held; quickcheck old save PASS ×2 ✓.
## (c) NPC nrEnd gives the same cp_<road>_<n> keys (jdh3.js nrEnd wrap via cpKeyOf; unit) ✓ (law 1).
## (d) numbers BAL.dh.rp / BAL.dh.cp only; reputation titles keep one gain + one loss (unit A1) ✓ (laws 2/3/4).
## (e) co-op: 141/141 ×4 → no diff, nothing caused by this branch.
## K-DH-CAPFIT: LIVE now (2a9125bf, KIT §82.2). Not re-shot on a16b0341 (FAIL first).

## FAIL list (fixer works on review/titles2-r2 from a16b0341)
1. **OD 23/11 ~22:55Z "a title for finishing EACH … j72 việc nhờ chain" + law 11, on the landing sha**: LIVE 27240ccb (ORDER THIN P3, dev/build/j72c.js:81-95 j72cReg) registers every seed of J72SEEDS (dev/build/j72sd.js, 256 seeds) as one more T72 template `c:<seed id>` played by the same j72 runtime and closed by q72End. jdh3.js q72End wrap (`if(tid&&VNC[tid]…)`) gives NOTHING for them: 256 of 392 chains have no title (scan missing 256, unit F2 FAIL). FIX: a good + bad pair for every composed seed, named from the seed's own `title` / object / obstacle (same rules: cổ trang, ≤ 4 words, unique in DH_CAT, clash-free), key `vn_<tid>_t|a`, once. Best home so new seeds can never miss one: a `dh:"good / bad"` field in the seed schema (dev/handover/content/thin/j72seeds*.md → j72sd_build.py → J72SEEDS) read by jdh3 (VNC from J72SEEDS), with j72seeds_validate.py + titles2-scan failing a seed without it. How text: the seed title (plainT) like the static chains. Extend titles2-unit F2 to the c: chains (already counts 392).
2. Rerun all gates on the fixer's sha incl. quickcheck perf: buổi was 2155/1079 ms on my solo run (1288/898 earlier, E56r/E58 saw noise both ways) — compare ≥2 runs vs LIVE; a steady ×1.5+ = FAIL.

## Notes
- Panel layout: the Danh hiệu panel puts each group in a narrow left column on Fold and iPad; LIVE's own panel has the same column (seen on LIVE 27240ccb build) → kit layout, not TITLES2; the long how lines read cramped there → FOR MAIN kit keeper (KIT §82 panel column width), not a TITLES2 fault.
- «Đeo ngay» small card «khô ng» letter break on Fold (E58 note) — LIVE kit notice layout, still there.
- Shots (outside git): /home/user/wt/e61r/ui/t2-*.png; scans /home/user/wt/e61r/scan.md (868be3c8), scan2.md (a16b0341).
