# TITLES2 — BIG re-review r3 (E65r, session_01DgYSWkTHXKFwZRgoxgzfwZ, Foreman E) — verdict: PASS 3292e7a2

PRIORITY #1 CHECK: ('danh hiệu|DH_CAT|jdh|titles2|chapterTitle') OD 23/11 ~22:45Z Q + ~22:55Z BUILD NOW + 24/11 ~07:45Z DAY TITLE CARD (read verbatim) | main: jdh/jdh2/jkcg/jgecat/j8 titles reused; j72c + J72SEEDS (thin-p3), thin-p4 (LIVE 056c2402) | review/titles2-r2 86e0fcf1 (E62 FIX r2 + chapterTitle) | reports titles2.md «FIX r1/FIX r2/+ chapterTitle», titles2-review.md (r1 FAIL), titles2-review-r2.md (r2 FAIL) | claims TITLES2 rows (E).

Reviewed review/titles2-r2 86e0fcf1. LIVE moved three times during the review; merges on review/titles2-r2 (all pushed):
- **44b771f0** = 86e0fcf1 + LIVE 68799300. Conflicts: index.html/sw.js only (rebuilt).
- **99fa0243** = titles2-unit flake fix (test only, see (c)).
- **38cc5ffa** = + LIVE 0c0877a2 (typed-stat-bal + hadoc-loop). index.html/sw.js rebuilt. Shared code files j71.js / jbal2.js auto-merged in separate hunks (LIVE: BAL.eff→BAL.rl renames in j71 contest/brb lines; branch: cpm7 marks) — checked.
- **77716fe3** = + LIVE 056c2402 (thin-p4 + map-perf). Conflict assemble.py: LIVE list (+ j68sd/j68c/jbalkyc/jkysd/jkyc) + jdh3n/jdh3 after jge (same rule as E61r); index.html/sw.js rebuilt; jbal2 auto-merged.
- 3c240af3 = a rebuild only (my first merge attempt of fd85907a did not apply; harmless, superseded).
- **3292e7a2** = + LIVE fd85907a (thin-p6). Conflict assemble.py: LIVE list (+ j70sd/j70c/jwsd/jworldc/j71sd/j71c) + jdh3n/jdh3 after jge; jbal2 auto-merged; index.html/sw.js rebuilt. thin-p6 check: every j70c route (J70SEEDS) is a new route of an EXISTING M70 method (accuse…rumor, 17 methods) → titled by its method group (scan lists M70 methods: 0 missing); j71c festival complications / jworldc world reactions are not title families in OD 23/11 ~22:55Z. Per Foreman E (08:37Z) the verdict is on this sha; the lander re-checks if LIVE moves.

## Gates
| gate | 44b771f0 (LIVE 68799300) | 38cc5ffa (LIVE 0c0877a2) | 77716fe3 (LIVE 056c2402) | **3292e7a2 (LIVE fd85907a)** |
|---|---|---|---|---|
| quickcheck + old save | PASS ×3 | PASS ×3 | PASS ×2 | PASS ×1 (core gates PASS, old save ok) |
| titles2-unit | 8/8 (before fix), 3/3 after | 6/6 | 6/6 | 3/3 (69/69) |
| titles2-scan | rows 833 · 0 missing/clash/dup/long/bad how | same | same | same |
| j72seeds_validate | 256 seeds, 0 errors | same | same | same |
| chapterTitle check (mine) | 11 origins + 401 chapters, 0 bad | same | same | same |
| dhSync equivalence (mine) | 0 diffs / 1650 states | 0 | 0 | 0 |
| role-parity | — (killed: LIVE moved) | ALL PASS ×2 | ALL PASS ×2 | ALL PASS ×1 |
| coop-e2e Fold host / COOP_SWAP=1 | — | 142/142 ×2 pairs | 142/142 ×2 pairs | 142/142 / 142/142 |
| titles2-ui Fold 755x1000 + iPad 1180x820 @2 | — | PASS, looked | PASS, looked | PASS, looked |
Perf medians (new/live) buổi: 974/1026, 945/1214, 2178/1922 · 980/2075, 1775/983, 1997/1133 · 1376/1079, 970/982 · 1003/1175; LIVE-vs-LIVE 2075/1009, 1042/996.

## (a) r2 fault fixed for the whole family — ✓
- All 256 J72SEEDS seeds carry `dh:"good/bad"` in the seed source (j72seeds_a/b.md → j72sd_build.py); jdh3 reads VNC["c:"+id] from J72SEEDS (no hand list).
- Mutation test (scratch copies, nothing committed): removing the dh of ONE seed (j72c-craft-001) makes **j72seeds_validate.py exit 1** («dh must be "good/bad"»), **titles2-scan exit 1** (missing 2: «vn c:j72c-craft-001», «seed j72c-craft-001 (no dh pair)») and **titles2-unit exit 1** (F2 + F6 ×2 FAIL). So a new seed without a pair cannot pass.
- Names read: all 256 pairs listed (scratch seeds.txt); ~90 read closely. Cổ trang, from each seed's own title/object, ≤ 4 words, good = done / bad = failed or exposed; scan: 0 clashes, 0 dups. Nits only (not FAIL): «Trà nhài dâng bà» / «Giọng hát dâng bà» say «bà» for Thái hậu (homely); «Khăn len kẹt cửa», «Gối đôi kết bạn» read odd; «Thiệp đấu cờ vui» — «thiệp» a little modern.

## (b) Perf — ✓ (branch does not cause the long-task / buổi spikes)
- dhSync index (jdh.js dhIdx/dhKeys): walks always-keys (nights/kids/meta/l_*/first need ≤ 0) + the person's own keys. count() has no other derived source (read jdh.js:56); every DH entry is added at load (jdh3 cpCat, jkcg, jge); an unknown held key rebuilds the index.
- **Equivalence test** (mine): the same 1650 random states (her + 10 NPC clones, random stored counts / steps / nights / kids / sung / danh, deterministic RNG) through the indexed dhSync and through a page copy with the old full walk (`for(const key in DH)`): **0 differences** in titles given, dh store and NPC worn pick; indexed 583–608 ms vs full walk 1207–1489 ms for the batch.
- Quickcheck long-task limit: branch medians longTaskMax 1526/1755/1733 (vs LIVE 1632/2425/1765) on 44b771f0, 1610/2632/1893 (vs 1525/2615/1568) on 38cc5ffa; never near the 3368-type limit. **LIVE vs LIVE** (quickcheck.js with the LIVE build on both sides, ×2): longTaskMax 1522 vs 1668 and **2311 vs 1622**; buổi **2075 vs 1009** — the same build swings ×1.4 (long task) and ×2 (buổi) on this box. Branch buổi ratios over 8 runs: 0.95, 0.78, 1.13, 0.47, 1.81, 1.76, 1.28, 0.99, 0.85 (77716fe3/3292e7a2) — not steady. E62's 4345 ms run = box noise.

## (c) titles2-unit flake — cause found, test fixed (99fa0243)
- Cause: A2 forces `caughtOdds=()=>100`, but `roll()` (j1.js:110) caps every odd at BAL.odds.hi = 95 → caught() still misses ~5 % (my measure: 105 misses in 2000 calls; with Math.random=0.97 it misses, with 0 it hits). A miss fails exactly 2 cases («A2 caught fired» + «A2 docphu by a caught poison») = E62's «1 run in 6, 2 cases». Not caused by the branch code (roll cap is LIVE; the test was wrong).
- Fix (test only): pin Math.random=()=>0 for that one caught() call, restored in finally. Runs: 8/8 PASS before the fix (unlucky streak absent), 3/3 after on 99fa0243, 6/6 on 38cc5ffa, 6/6 on 77716fe3 and 3/3 on 3292e7a2 on the final head.

## (d) chapterTitle(S) (jdh3.js:294) — ✓
- Read-only: S.st JSON identical before/after for all 11 origins. Same source as j67 goal line (S.st.ms → MS67[id].t() with S.st.ch.n; S.st.M → ARC67[a].t with M.chap).
- Matches the goal line chapter for **all 11 origins** (opening chapter, e.g. «Chương 1 — Nhập cung, đứng vững», cnv «Chương 1 — Kẻ hầu mới vào cung») and for **all 401 ARC67 chapters** set as the open chapter (roads rdDef incl., e.g. tt_co.5 «Chương 3 — Môn sinh của cha», «Chương 6 — Ái phi hay con gái Tể tướng»): 0 mismatches, no {…}/tags.
- "" for {}, an NPC, a co-op friend object, no S.st, v1 story, v2 with no chapter, unknown arc id, unknown milestone id; never throws; 0 page errors. chapterTitle(null) = her own line (p||S, intended). NPC roads: the day card is hers only; NPC objects give "" by design (no day card for NPCs) — fine.

## (e) r1/r2 items still hold — ✓
- titles2-unit 69/69 incl. C (old save without rep/dh), C2 (pre-FIX r1 keys old:1 still listed, never given), B1/F1 NPC nrEnd same per-chapter keys (law 1), A1 gain + loss per reputation title (laws 2/3); quickcheck old save PASS every run; G1 one-core-guard PASS (law 4: the r2/r3 delta adds no number — dhIdx and chapterTitle type none; chapter N comes from state).
- KIT: no UI change since r2 (panel / notice / card = KIT §82 / §82.1 parts). titles2-ui topmost on every step.

## Shots looked at (titles2-ui, Fold 755x1000 @2 + iPad 1180x820 @2; outside git: /home/user/wt/e65r-s/r3/ui, r4/ui, r5/ui)
Panel «Chính truyện» (Hiếu thuận giữ nghĩa / Giữ nghĩa môn sinh / Dùng kẻ trộm thư, two-tone plates), «Danh hiệu mới» chapter notice («Gỡ lời đàn hặc», how text reads naturally): the kit dialog is on top on both devices. Known LIVE kit notes unchanged (not TITLES2): narrow left group column of the Danh hiệu panel (Fold) / wide empty left area (iPad) — FOR MAIN kit keeper (KIT §82 panel column); K-DH-CAPFIT WARN ×4 from the test (kitDhCap caption plate) = LIVE kit; «Đeo ngay» small card «khô ng» letter break on iPad notice (E58/E61r/E62 note) = LIVE kit notice layout → FOR MAIN kit keeper.

## Laws checked
1 two-way ✓ (NPC same keys, dhSync index same for NPCs) · 2/3 ✓ (unit A1) · 4 ✓ (G1) · 6 n/a · 7 ✓ (no digits/% in names/how; scan bad how 0) · 9/10/11 ✓ (kit parts; whole seed family at the source + validator/scan/unit gate) · 12 ✓ (both devices, looked) · 13 ✓ (line above) · 14–18 n/a.
