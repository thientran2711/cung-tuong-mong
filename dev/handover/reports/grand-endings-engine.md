# grand-endings-engine (E1 → E1b, Foreman E) — report
LINEAGE: E1b depth 2 (successor of E1 session_01DgYSWkyBNQQuQ6GZfMzcqU) · session_01DgYSWm7nnt9krNfbr1w92u
PRIORITY #1 CHECK (E1b): continued E1's branch, rebuilt nothing; reused runb.js's sensible bot (dev/measure/inpage6.js + inty.js) for the measure instead of writing a new one; K-GE-3 checked against KIT_REQUESTS first (no row for title-plate label rows).
**READY: tip 2ae4715** (code 7284526 + site rebuilt).
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


## E1b — steps 1–5 done (18/11)
Commits: 914aa6c (measure logging) · geDbg read-only hooks in jge.js · Tai mắt scale fix + guard scale check + sensible-bot measure · 4be5d08 K-GE-3 · 7284526 BAL.ge var tune + measure MODES/null guard · 2ae4715 site rebuilt.

**Fault found + whole family fixed: Tai mắt (S.mat) is 0–10 (j1.js:114), gates were on a 0–100 scale.** tt_co_1 mat 40→4, nc_tuc_3 mat 30→3, rw tt_co_1 mat 15→2. ge-guard now FAILS any gate above a stat's scale or any rw/fail amount beyond half the scale (all stats scanned: mat 0–10; sung/danh/suc/sac/tai/tamco/duc 0–100; th/hh −100..100) → no other row was off.

**Measure fix:** with idle months (nextBuoi only) she never builds stats (Sủng 0) → no gate ever met (run 1 inChar .06). The measure now plays the months with the inpage6 sensible bot (as runb.js) between story beats (`PLAY` argv 7: sens default / idle).

| run | bots | lives | inChar [.30,.60] | random ≤.20 | open11 [1,2.6] | kind→thiện ≥.70 | cruel→ác ≥.70 |
|---|---|---|---|---|---|---|---|
| 1 idle months, old gates | all | 24 | .06 OUT | 0 | 2.08 | — | — |
| 3 sensible bot, mat fix, var tag 2 / duc .25 | all | 22 (+1 hung rand life, killed) | **.44** | **0** | **2.05** | 1.00 (3/3) | **.33 OUT** (1/3) |
| 4 verify, var tag 4 / duc .05 | kind+cruel only | 24/24 ok, page errors 0 | .63 (aimed bots only) | — | **2.25** | **.83** | **.75** |
| 3+4 pooled, non-random | | 42 | **.55 IN** | | | | |

Why the var tune: the sensible bot gains Đức +19..+70 in EVERY mode, so ΔĐức × .25 (+5..+17) out-weighed the arc's lean tags (lt −6..+7 × 2); cruel lives shaded thiện. tag 4 / duc .05 lets her arc choices lead, Đức still counts a little. Per road (run 3): tt_co .17 · cnv_mat .50 · nc_tuc .67 inChar — small samples (7–8 lives), luck-heavy (tt_co lost two rolls at 88 / 67); not tuned per road. Odds/gates left as they are. Weak spot to watch: cnv_mat cruel lean only −2..−4 (few ác tags on that road) → cruelA .50 there.

**Shots** (`node dev/test/ge-shots.js`): 1180x820@2, 1366x1024@2, 412x1058@2, 390x844@3 (+755 Fold) — **17/17 each, no overflow**. CDN upload returns 401 → shots kept LOCAL in /home/user/wt/e1b-shots/<size>/ (not in git). LOOKED at each: Hồi ngã rẽ 1 / 2 (4 then 3 options, greyed «Theo người ấy đi» when no bond), Đại kết cục event, title notice, Sổ luân hồi rows, fail, quiet — OK at all sizes. Notes: (a) Bảng «Thiên mệnh» rows squeeze the value column at 412/390 — the kit row shape with a title plate as label → filed **K-GE-3** (whole group: jdh.js:180, jdh.js:183, jge.js:173), not restyled; (b) event shot: the reward pop-up floats over the option card for a moment (same as other events).

**Tests on 2ae4715:** ge-guard 6/6 · ge-engine 104/104 · build_site OK (index.html, sw.js, assets.json committed) · quickcheck ALONE **PASS** (core gates PASS, time-spill PASS, open 1489 ms 0 errors, old save ok). Perf note for the reviewer: buổi median 1076 ms vs live 685 ms, tasks>200 ms 22 vs 16 (render/tab equal) — worth a look in review.

Measure usage: `[MODES=kind,cruel] [MAXJ=n] node dev/measure/ge-measure.js - <lives> 2 <out.json> [roads] [sens|idle]` (PAR 2 only; ~1–5 min per life).

## HANDOVER (E1 → E1b; DONE, kept for history)
Worktrees: code `/home/user/wt/e1` (branch review/grand-endings-engine, sparse, hooks installed), scratch `/home/user/wt/e1s` (smoke.js, partial measure log), shots `/home/user/wt/e1-shots`.
Next steps, in order:
1. Rebuild (`python3 dev/build/assemble.py`), rerun ge-guard + ge-engine (r97give swap).
2. Run the measure ALONE with PAR 2 (`node dev/measure/ge-measure.js - 1 2 /home/user/wt/e1s/m1.json`, ~25 lives, ~40 min); tune BAL.ge.odds / gates so inChar ∈ [.30,.60], random ≤ .20, open11 ∈ [1,2.6], kind→thiện / cruel→ác ≥ .70; record the table in this report (ONE CORE: numbers only in jbalge.js).
3. iPad shots: `node dev/test/ge-shots.js /home/user/wt/e1-shots - 1180x820@2` (also 1366x1024, 412x1058, 390x844); look at each; upload to CDN `img/_review/grand-endings-engine/` (python3 dev/site/cdn_sync.py).
4. `bash dev/site/build_site.sh`, commit index.html + sw.js, then `bash dev/tools/quickcheck.sh` with nothing else running.
5. Update CLAIMS row, write «SẴN SÀNG KIỂM grand-endings-engine <sha>» to Foreman E.
Known notes: text with her as speaker is shown in first person by the game's naming rule (j84 "ngươi"→"ta"); Emperor addresses her «ái phi», other women «nàng ta» (VANPHONG). NPC grand endings off (BAL.ge.npc.on=false; build step 5). D2 Bắc Địch out of scope: a bd life on an nc road is not live.

## E1b — review E1r FAIL fixes (18/11 11:40Z) · tip **f48857e** (pushed) · HANDOVER below
LINEAGE: E1b depth 2 → successor E1c depth 3.
PRIORITY #1 CHECK: review reports/grand-endings-engine-review.md (handover 3d3e71b7) read; scans reused (grep old labels, guard name check); no new tool.
| # | status | what |
|---|---|---|
| 5 | DONE 84b7122 | merged origin/main 55db864a; assemble.py = main's list + jbalge after jbal2, jgecat/jgedata/jge after jdh2; KIT_REQUESTS both blocks; index.html/sw.js taken from main (REBUILD at the end) |
| 1 | DONE f48857e | jst14.js:197 findIndex matches «Kết quả» or «Kết cục». Scan `grep '\[0\]==="Kết'` + `"Kết cục"` in code: only lookup was jst14:197 (others are display labels) |
| 2 | DONE f48857e | «kết cục xuất thân xấu đi» → «Khép nẻo đời» xấu đi (j67:1766, j67:1783, jtabs:14) + comments j67:1784, jtabs:73, jroad:11/139; `grep -i "kết cục xuất thân" dev/build/j*.js` = 0 |
| 3 | DONE f48857e | ge1 + ge2 options: risk "có rủi ro" + hint (ge1 «nẻo này dẫn tới đâu, thành hay hỏng, đến câu cuối mới rõ», ge2 «thành bại khó đoán; hỏng thì có thể mất danh tiếng, phẩm vị»). Other jge options: «Tạ ơn» / «Xem bảng vàng» / «Đóng» = truly safe, left |
| nit a | DONE | jge.js:62 reads Object.keys(BAL.ge.funnel) |
| 4 | **PARTLY** | measure now prints `IN/OUT shade <road>` per road (ge-measure.js:67). +6 ác tags on cnv_mat (lean.m: «Lặng lẽ tìm {v} xin chỗ dựa», «Lên kiệu, không ngoái lại», «Gọi thị vệ đến», «Gọi thái giám cung mình giữ nàng ta lại», «Xin khám luôn phòng người khác», «Cho {mis} biết {v} cũng định kéo nàng vào»). Verify m5 (cnv_mat kind+cruel, 8 lives): **cruel→ác still .50 OUT** (kind .75, inChar .25, open11 2). |

**Why fix 4 is not closed (root cause):** cruel lives aiming at cnv_mat_1/_2 reach lt −8 → ác ✓. Cruel lives aiming at **cnv_mat_3 «Gác ô ra đi» (P3) and cnv_mat_4 «Tỷ muội cùng hầu» (P4)** stay at lt −2 (lean −1.5..−2.7 → natural T): the bot follows the ending's Chuỗi (pull +3 > lean +2), and EVERY P3/P4 Chuỗi option is gentle («Gửi lại cành mai, không đến», «Cảm ơn mà từ chối», «Cáo ốm ở lại», «Xin rút thẻ một kỳ», «Gửi lại ô, kèm một lời», «Thôi ngóng…», «Quỳ tạ, rồi tạ {mis}», «Thưa: là tỷ muội», «Từ chối, báo {mis}», «Ra chào {mis} trước khi đi», «Xin ngồi sau {mis}», «Đến xin {mis} nói giúp»…). So their ác titles «Bẻ ô ra đi» / «Mượn chị lên cao» are nearly unreachable — an evil road that isn't first-class (owner L1612). The new tags lie in beats off those paths.
**Needed (writers' data, jgedata.js cnv_mat only, names must stay REAL options):** put harsh options ON the P3/P4 Chuỗi: e.g. add pull P4 to «Cho {mis} biết {v} cũng định kéo nàng vào» (10.c2) and «Gặp {v} hỏi chuyện cung {mis}» (5.s2) (= «Mượn chị lên cao»: using the sister); for P3 a cold leave-taking option with an ác tag (candidates: «Lên kiệu, không ngoái lại» 8.s1 doesn't fit FREE — needs a writer or Foreman E to pick; maybe an «@arc» push). List of all cnv_mat options with tags: scratch script /tmp/claude-0/…/scratchpad/opts.js (prints id.beat: option[+/−/P#K#]); rerun with `node opts.js`.

## HANDOVER (E1b → E1c)
Worktrees: code `/home/user/wt/ge` (local branch e1b-ge → push `HEAD:review/grand-endings-engine`), handover `/home/user/wt/ho` (local ho-e1b; `git reset --hard FETCH_HEAD` after fetch, then edit — remote is the truth), scratch `/home/user/wt/e1bs` (m3/m4/m5 logs). Shots local `/home/user/wt/e1b-shots`.
Steps:
1. Fix 4 data as above (ask Foreman E if the P3 option choice is a writer's call). Rebuild `python3 dev/build/assemble.py`; `node dev/test/ge-guard.js` (6/6), `node dev/test/ge-engine.js` (104/104).
2. Verify: `MODES=kind,cruel node dev/measure/ge-measure.js - 4 2 /home/user/wt/e1bs/m6.json cnv_mat sens` (8 lives ≈ 10 min) → need `IN shade cnv_mat`. Then one full measure all 3 roads (`- 1 2 out.json`, ~24 lives, alone) for the table.
3. `bash dev/site/build_site.sh` → commit assets.json + index.html + sw.js → `bash dev/tools/quickcheck.sh` ALONE (nothing else running; perf is reviewer-cleared, re-measured against main).
4. Report table here + CLAIMS row (E1b row says READY 2ae4715 → replace) + FOREMAN_E_STATUS line, then «SẴN SÀNG KIỂM grand-endings-engine <sha>» to Foreman E session_01DgYSWmvDYnmfLCrNGtw5Uu.

## FIX 1 (E1c) — review E1r fix 4 closed + main merge (18/11 11:55Z) · tip **177c730b** (pushed)
LINEAGE: E1c depth 3. START_CTX ~4 %.
PRIORITY #1 CHECK: OD grand-ending lines (L1612/L1617/L1623) | main none (no S.ge / BAL.ge) | review/* review/grand-endings-design r3 + review/grand-endings-engine (this) + review/questline-q3 jrdhp.js (pattern: GE-owned data tags REAL options, road file untouched) | claims E1/E1b only.
| # | status | what |
|---|---|---|
| 4 | **DONE f0e25a57** | jgedata.js only (jrd_cnv.js of Foreman B NOT edited; no new options needed). Scheming REAL options already on the cnv_mat_3 / cnv_mat_4 chains now pull their ending AND carry the ác tag, so a cruel player following those chains picks harsh options: P3 «Gác ô ra đi» (ác «Bẻ ô ra đi» = leaves with the palace's secrets): «Nhờ người dò ai giữ lại» (7.s2, new ác), «Giữ kín, chờ thời» (10.c1, new ác), «Đem chuyện gói bùa ra nói lại» (11.c2, was ác). P4 «Tỷ muội cùng hầu» (ác «Mượn chị lên cao» = a bond kept by leverage): «Gặp {v} hỏi chuyện cung {mis}» (5.s2, new ác), «Đổi lấy một lời hứa» (9.t1 «cả hai giữ thóp nhau», new ác), «Cho {mis} biết {v} cũng định kéo nàng vào» (10.c2, was ác). Each name occurs once in dev/build (no cross-road bleed). Kind bots still prefer the gentle Chuỗi (pull 3 + thiện 2 > pull 3 − ác 2). No player text changed (VANPHONG untouched). |
| 5b | DONE 8da9e685 | merged origin/main 12a1e4be (poison-road r2): assemble.py union = main's list (adds jpq.js) + jbalge after jbal2, jgecat/jgedata/jge after jdh2. Site rebuilt 177c730b. |

Measure m7 (`MODES=kind,cruel node dev/measure/ge-measure.js - 8 2 m7.json cnv_mat sens`, 16 lives, alone, PAR 2; lives "given she lives to ch14" — the bot revives dead lives):
| road | lives | inChar [.30,.60] | random ≤.20 | open11 [1,2.6] | kind→thiện ≥.70 | cruel→ác ≥.70 |
|---|---|---|---|---|---|---|
| cnv_mat before (E1b m5) | 8 | .25 | – | 2 | .75 | **.50 OUT** |
| cnv_mat after (m7) | 16 | .50 IN | 0 (no rand lives in this run) | 1.81 IN | .75 IN | **1.00 IN** (8/8) |
Cruel per target (lt / lean): j0 −8/−29.4 · −6/−22.6 · j1 −9/−35.5 · −5/−21.1 · j2 (P3) −4/−10.3 · −9/−31.9 (won «Bẻ ô ra đi», odds 88) · j3 (P4) −5/−13.9 · −7/−22.6. Kind: the 2 non-thiện lives both aim at cnv_mat_2 «Tỳ nữ lên phượng» (natural A, its Chuỗi is scheming) — same as before, band held. tt_co / nc_tuc data unchanged (not re-measured; their bands from E1r/E1 runs stand).
Tests on 177c730b: ge-guard **6/6** · ge-engine **104/104** · build_site OK · quickcheck **PASS** vs live 12a1e4be (core gates, time-spill, old save, 0 errors; render 200/187, tab 340/343, buổi 1003/796, tasks>200 14/14 — buổi spread is box noise per E1r perf section).
SẴN SÀNG KIỂM grand-endings-engine 177c730b
