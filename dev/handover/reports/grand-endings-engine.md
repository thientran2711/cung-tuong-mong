# grand-endings-engine (E1, Foreman E) — report
PRIORITY #1 CHECK: OD 5 (L1613, L1618, L1623–L1624, L1601, L1837) | main none (prio1 "grand ending|Đại kết cục|Hồi kết nhánh|Thiên mệnh|S.ge|BAL.ge": main hits are false positives, review/* 0) | review/* review/grand-endings-design 52cdc078 (design, built from it; catalogue + guard reused) | claims E1 row only
Branch: review/grand-endings-engine · tip **4164d2b3** (from origin/main 94a93759). START_CTX ~3 %; rolled over at Foreman E's order (~43 %).

## What is built (design §7 step 2)
- `dev/build/jbalge.js` — BAL.ge: every number (pull, odds, lean var, bond, gates, fail losses, rewards, pt, title tier, target bands) + switches D3 `when` "ch14", D4 `after` "rec", D5 `title.carry` "prev", D7 `showOdds` false, D8 `quietLoss` false, `mapOn` false.
- `dev/build/jgecat.js` — GENERATED catalogue (40 branches × 4 endings: name, group, natural, Ngã rẽ pair, summit, thiện/ác titles) by `dev/test/ge_guard/gen_js.py` from `cat.py` (design data, moved into dev/test as the design asked).
- `dev/build/jgedata.js` — 3 pilot branches with full data: **tt_co, cnv_mat, nc_tuc** (Chuỗi / Khóa / conditions / fail-only terms / lean tags = REAL option names; both shading texts; fail outcomes; title "how" lines; condition words).
- `dev/build/jge.js` — engine: S.ge {b, st o/f/x, cx, pull, lt, d0, ce, oc, r1, r2, res}; made at life start (a67init) and on first read for OLD SAVES; res67 hook (pull/push/close/doom/lean), chEnd67 hook ("@arc=end" pulls, ctm-gech, funnel counts); Hồi kết nhánh = PEND ge1 (4, «Theo người ấy đi» greyed via kitOff when no bond) → ge2 (3) after the frame ends (or r11); resolve: open pair → odds (base+pull×per, capped when the condition fails) → Đại kết cục in its shading (lean = tags×tag + ΔĐức×duc + Ngã rẽ 2×last, cut ±) or fail with loss; fail-only/closed → fail with loss; unowned pair → quiet form (most-pulled ending, no loss); seat lock (HH real queen, NDE/THH/TM S.geSeat); reward (stats, rank via RANKS, HH seat, everyone's attitude by shading sign, {mis}), Kim sách Thiên mệnh (one item kind, pr 0, keep, via r97give), jdh title group «Thiên mệnh» (tier BAL.ge.title.tier, no bonus), Bảng «Thiên mệnh» tab (NHIỆM VỤ tab row; kit panel rows + kitPodiumShow), ctm-ge collection, Sổ luân hồi life line + rows, carry of the previous life's title (D5), D4 epilogue via over(). Data API `geMap(branch)` + `geStateWord` for the Sơ đồ nhánh page.
- `dev/build/jdh.js` — group «Thiên mệnh» (only earned titles listed/counted), tab «Thiên mệnh».
- KIT REQUESTS filed in dev/kit/KIT_REQUESTS.md: **K-GE-1 kitBranchMap**, **K-GE-2 2-tone Thiên mệnh plate** (+ Kim sách icon art for Foreman C). Page stays off (mapOn=false); tier-8 plate used meanwhile.
- .11 label change, WHOLE GROUP (scan `grep 'Kết cục xuất thân\|\["Kết cục"' dev/build/j*.js`):

| place | before | after |
|---|---|---|
| j67 chFinale67 log + card title | Kết cục xuất thân «…» | Khép nẻo đời «…» |
| j67 chFinale67 / jroad rdFinale card row | Kết cục | Kết quả |
| jroad rdFinale log + card title | Kết cục xuất thân | Khép nẻo đời |
| j67 Mệnh truyện block, jtabs Mệnh truyện tab | Kết cục xuất thân | Khép nẻo đời |
| j67 end67 / msCheck67, jst14 lapsed, jchap risks, jtabs story row | Kết cục | Kết quả |
| left on purpose | jstory «Quá hạn lo liệu» (task outcome), jtut tutorial line | — |

## Tests (all on the built dev/index.html)
- `node dev/test/ge-guard.js` — **6/6** (catalogue guard ERRORS 0; jgecat = generated; every pilot name is a real option; gates/rw/fail rows; no digit/% in player text; titles in DH_CAT).
- `node dev/test/ge-engine.js` — **104/104** (state, old save, pull/close/lean, Hồi queue once, bond grey, success+shading+reward+Kim sách+title+Bảng+ctm-ge, fail/closed fail with loss, quiet + D8, D7, D3 r11, odds, map, panels, HH seat lock, D4 rec/close/stay, life line, carry next life / nothing after a life without title). (Last run before the r97give swap; rerun.)
- `node dev/test/ge-shots.js <outdir> - 755x1000@2` — **17/17** (Fold). Shots LOOKED at: Hồi ngã rẽ 1/2, Đại kết cục event (rank-up Thánh chỉ scene fires from the reward — integrates with jpromo), title notice, Bảng tab, Sổ luân hồi rows, fail, quiet. NOT yet: iPad 1180x820 run, CDN upload.
- Quickcheck: open 1524 ms 0 errors, old save loads + plays a buổi; core gates FAILED only on G1 one-core `jge.js nt:1` → fixed in 4164d2b3 (Kim sách through r97give); quickcheck NOT rerun after the fix (run was killed by timeout under CPU load from the measure).
- Measure `node dev/measure/ge-measure.js - 1 2 out.json` — NOT finished (3 parallel pages ran out of memory → "Target crashed"; use PAR 2). Partial: tt_co in-char ge1 → fail-only after .11 lose (pull 10); ge2 → odds 12 (condition Đức 45 / Sủng 45 unmet, pull 6); funnel oc {4:4, 8:3, 11:2–3} (target 1–2 by .11 ≈ met).

## HANDOVER (for the successor)
Worktrees: code `/home/user/wt/e1` (branch review/grand-endings-engine, sparse, hooks installed), scratch `/home/user/wt/e1s` (smoke.js, partial measure log), shots `/home/user/wt/e1-shots`.
Next steps, in order:
1. Rebuild (`python3 dev/build/assemble.py`), rerun ge-guard + ge-engine (r97give swap).
2. Run the measure ALONE with PAR 2 (`node dev/measure/ge-measure.js - 1 2 /home/user/wt/e1s/m1.json`, ~25 lives, ~40 min); tune BAL.ge.odds / gates so inChar ∈ [.30,.60], random ≤ .20, open11 ∈ [1,2.6], kind→thiện / cruel→ác ≥ .70; record the table in this report (ONE CORE: numbers only in jbalge.js).
3. iPad shots: `node dev/test/ge-shots.js /home/user/wt/e1-shots - 1180x820@2` (also 1366x1024, 412x1058, 390x844); look at each; upload to CDN `img/_review/grand-endings-engine/` (python3 dev/site/cdn_sync.py).
4. `bash dev/site/build_site.sh`, commit index.html + sw.js, then `bash dev/tools/quickcheck.sh` with nothing else running.
5. Update CLAIMS row, write «SẴN SÀNG KIỂM grand-endings-engine <sha>» to Foreman E.
Known notes: text with her as speaker is shown in first person by the game's naming rule (j84 "ngươi"→"ta"); Emperor addresses her «ái phi», other women «nàng ta» (VANPHONG). NPC grand endings off (BAL.ge.npc.on=false; build step 5). D2 Bắc Địch out of scope: a bd life on an nc road is not live.
