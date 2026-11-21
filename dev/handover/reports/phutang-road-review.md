PRIORITY #1 CHECK ('phutang|E21r'): OD 0 | ledger 0 | claims 8 | main 0 | review/* 2 (review/phutang-road = under review, review/phutang-road-w2 = merged into it) | archive 0 — read the 18 LAWS (START_CORE), START_WORKER, START_REVIEWER, the E21r brief, the E21 spec, reports/phutang-road.md (§PLAN, writer 2, §FINAL), OD (19/11 ~06:40Z / ~06:42Z / ~06:50Z real) verbatim, E19 history notes §B/§C.3/§F, GRAND_ENDINGS §3/§4.2. REUSED: pt-scan.py, pt-roads-bal.js, pt-vp.py, quickcheck, kc-roads direct/coop-together/route, road-full, npc-roads, coop-one-world; my own extra probes (scratch only, not in git): an independent option audit (law 3 cost-only, strict dominance of every option, bạc table, rank) and an old-save cross-build test (save on LIVE main → load in the merged build).

# phutang-road review — E21r (BIG reviewer, opus)
depth 4 · START_CTX ≈ 3 %

Branch: review/phutang-road @ 30d8ee513ec2b2b8f76888fe63bceff9150e8d0a, stacked on review/bd-roads @ 0308cbcc. Scope = `git diff origin/review/bd-roads origin/review/phutang-road` (22 files).
Reviewed on a local copy with newest origin/main (7bc73251) merged in, then `bash dev/site/build_site.sh` (merge NOT pushed).

## VERDICT: FAIL (7 fixes, each a whole family — law 11)

## Per-law results

| Law | Result | Note |
|---|---|---|
| merge with LIVE main | **FAIL** | the assembled game does not parse after merging main (fix 1) |
| 1 two-way | OK | every {v} frame/rumour has a retort or counter-charge (one weak spot: pt_dang .7 c2, see fix 3) |
| 2 equal value | OK | my audit: strict dominance 0 over 606 options/198 beats; climax dominance 0 (pt-roads-bal); max value spread 6.0 (pt_su_10.s2, at the measure's limit). Every bạc option (63 beats) has a non-bạc option in the same beat, of about the same weight at bạc .05/point (note N1) |
| 3 no cost-only | OK | 0 cost-only options, 0 options with neither cost nor gain |
| 4 ONE CORE | OK | every option number is in jbalpt.js / BAL (BAL.home.pf 22 is in the jecon BAL block); the road files type no numbers (only chapter ids in rdDef); one-core-guard PASS. Note N2 (j72 fam_pf row) |
| 5 harder with rank | OK | every rolled option has p(rank 8) < p(rank 1) |
| 6a real evidence | **FAIL** | sure (no-odds) wins over {v}, and claims on facts never set (fix 3) |
| 6b real people | **FAIL** (partly) | pt-scan 0 unguarded moves, but state changes the scan cannot see: the master monk's sight; people standing where they cannot be (fix 4) |
| 6c real objects | **FAIL** | text does not read the object book: chest, pearls, log page, order, sutra case, sword, ledger, silver chest (fix 2) |
| 7 wording | **FAIL** (pf home phase) | road text clean (pt-vp PASS 3555 strings; 0 digits/%); but the pf home phase prints Cao Ly titles «Vương muội» / «Vương thúc» (fix 5) |
| 8 history | OK with notes | no Wokou/samurai/kimono/thập nhị đơn; pirates «giặc biển Đông Hải», Tân La traders, Minh Châu / Nan Ba / Nại Lương right. Notes in fix 6 |
| 9 kit | OK | no UI; the origin-wide-pf wrap reuses the kit slot kitOriginWide → ev-hoa-than.webp |
| old saves | OK for this branch | see tests; one finding belongs to another branch (note N3) |
| GE readiness | OK (per road) | every road has thiện- and ác-leaning raw names (ge1–ge4 lists in the report); weak chapters listed in fix 6 |
| cross-file pf family fix | OK, needed | KC2K pf, CM_SRC pf, BAL.home.pf, ENT_INTRO/ENT_LINE pf, joi pf rows, j72 fam_pf, j97 PT97, jgecat label, tests: each one is what nc/bd already have; without KC2K the pf home phase never ran (their own coop find). Incomplete wording: fix 5 |

## Fixes (each as a whole family, law 11; file:line on review/phutang-road @30d8ee51)

### 1. BUILD — jbalpt.js top-level helpers clash with LIVE main
`dev/build/jbalpt.js:21` `const ptX=…` and main's `dev/build/jptime.js:38` `function ptX(…)` (parallel-time, on main since de8f5978). After merging main, `node --check dev/build/all.js` → `SyntaxError: Identifier 'ptX' has already been declared`; the site does not build.
Family: every top-level name of jbalpt.js / jrd_pt.js / jrd_pt2.js (P_, ptR, ptS, ptX, ptE, ptG, pt2E, ptArc, ptLife, PTP, ptP, ptAlive, ptMan, ptKill, ptMove, ptMeet, ptWhere, ptO, PTCF, ptConfine, PT97, PTNGOC, PTLOG, PTFREE, ptSail, PTTVK, PTTNK, PTKINH, PTXL, PTDK, PTHT, PTOC, PTSAIL …) checked against origin/main (git grep) — rename the clash (e.g. the jbalpt shape helpers into one object `PTB.R/S/X/E/G` or an IIFE so they are not global), merge newest LIVE main, rebuild, and attach the `node --check` + collision scan output. (Reviewer test build only renamed ptX→ptXc locally; nothing else collided.)

### 2. LAW 6c — story text does not read the object book (PTO)
pt-scan only checks that a give/buy option SETS ptO. It does not check that later lines MENTIONING the object agree with its holder. Breaks found:
- pt_hai .9 (jrd_pt.js:233 g «Rương cống được khiêng vào nha môn», :243 c1, :247/:249 c2, :251 t1) and .10 (:263 g says «Rương cống … không về» and then «Lụa mốc nửa phần, hộp ngọc trai trống một ngăn»; :273 c1, :281 t1, :286 x1 «người cắt niêm») assume the chest came back, but .8 x1 (:224 fail → ptO("ruong","bien"); :225 fail → chest stays with Ô Cửu) can lose it.
- pt_hai .8 x1 opt 2 (:225) «Mang ngọc đến chuộc» always sets ngoctrai→ocuu even when the pearls were never got (.8 c1 opt 2 failed, :213); E.win2 (:228) says «hộp ngọc của mẫu hậu» whatever the source.
- pt_hai .7 t1 (:188/:191) reads/keeps the log's last page (trang→ta) while the log can be with Kim Hựu Thành or in kho (needs PTLOG()).
- pt_su .10 (:554) «Đốt tờ lệnh» sets lenh→chay even when the order is with Hồng Lư tự / the Emperor (s1 :545/:546); after a burn x1 (:563) «Tờ lệnh đặt trên án» and E.win (:567) still show it.
- pt_hai .4 rare PT97 (:101): reward text is a hairpin, code sets haido→vua (a sea chart from nowhere). Also unset/unsourced: «giấy miễn thuế» (.5 x1 :132, never ptO but .7 reads giaythue), «hộp thư của mẫu hậu» (:240), gương đồng (:316), private letter thuta (pt_su .5 x1 :408, never set but ptSail moves it), dowry spent twice (:92 and :287, no ptO("hoimon") read), haido overwritten (:320).
- jrd_pt2.js: pt_tang .5 c2 (:76) she hands over the sutra case that ptO holds as "tinhvien" (:18); pt_tang .10 t1 (:244 «Trẫm giữ hộ» with no ptO daotang vua, :249 «vẫn nằm trong rương»); pt_dang .9 t1 sends daochem to tn/thuyquan then x1 (:503–:505) «Thanh đao đặt trên án» in the same chapter; pt_dang .8 x1 (:471–:474) acts on a ledger held by "kho"; pt_dang .7/.10 (:415/:517) silver chest said to be with the prefect after PT97 set ruongbac→ta (:344); pt_dang .5 s1 (:349) a blade pulled from crates held by Kim Hựu Thành.
Family fix: every line/option that names a PTO thing reads ptO(thing) (swap text, `if` the option, or a told change of hand), the same way 6b lines read ptP. Extend dev/measure/pt-scan.py with a 6c-READ pass: for each ptO key, every later mention (object word list per key) unguarded by ptO(key) in line/beat → UNGUARDED; attach before/after table.

### 3. LAW 6a — sure wins over {v}, and charges on facts never set
Owner law 6a: proof must truly exist; her defence can fail. These options are ptS (no odds) yet beat {v} outright, or rest on a fact no earlier beat set:
- jrd_pt.js: :275 «Hỏi lại: cung nữ nào…» clears the hairpin frame for sure; :186 «Tâu rằng biểu huynh {v}…» (sure «bị gọi về»); :249 «Tâu xin rương đi thẳng…» (sure «Chiếu xuống»); pt_su :426 (.6 c1), :458 (.7 c1), :493 (.8 c2). :263/:286/:292 charge «chỉ có người từng cầm danh sách» / lose ending on danhsach though she holds it only via .4 s2 opt 3 (:77; default kimthanh :67).
- jrd_pt2.js: :270 pt_tang .11 «Đưa ra chuyện xá lợi bị tráo bởi người cung {v}» (no read of the .9 result); :576 pt_dang .11 «Nhắc chuyện anh họ {v} từng làm Thị bạc sứ» (true only after .8 win, :475); :32, :324, :236, :495, :141 retorts on facts never set; :106 «thư của thầy» (no letter in play unless s1 ran), :112 «người trong Từ bộ cố tình ép thầy» (no flag); :399/:494 «anh trai {v} vừa mua đao» / «có ấn của ngươi» (no source, gift path :363 has no paper); :172 pt_tang.trao set even on rf, so E.win (:183) tells a frame that failed. pt_dang .7 c2 (:429): {v} insinuates and she has no answer in kind (law 1, weak).
Family fix: every option that accuses {v} or defends against {v} has odds (ptR with rf) AND its fact is a flag / ptO / ptP set earlier (option `if` or text swap); flags set only on success. Scan: list every option whose go calls rdOan(A,"v",…) and has no odds → must be 0, and every {v}-charge line → names the flag it reads.

### 4. LAW 6b / story state — person state the scan cannot see
- pt_tang .7 E.win (jrd_pt2.js:147/:150) «Một mắt còn giữ được / Một mắt còn sáng», but later lines say he is blind with no read: :180 «Thầy Trí Viễn mù mà đọc thuộc», :257 «đã mù», :263, :286, :287 «vị thầy mù». Store the sight (pt.p.trivien.mat or a flag) at .7 and branch the text.
- pt_tang .11 E.win2 (:288) moves Tịnh Viên to "hb" while its text keeps him in the capital (and overrides c2 opt 3 «ở lại chùa»).
- People where they cannot be: pt_su .11 (jrd_pt.js:583/:595) the Emperor, Hoàng hậu and {v} at Minh Châu port (ten days away, :251) with no journey told; pt_dang .6 E.win (jrd_pt2.js:409) Kim Hựu Thành speaks at the port while PTP has him in kinh; pt_hai :270 Kim «thấy rương còn niêm khi trên đảo» but :170 has him reach the island after the pirates took the chest. Hoàng hậu named with no queen guard (jrd_pt.js :424 :426 :458 :492 :583; queenP() can be null — same family across jrd_*, at least guard these).
- s-beats keyed to the previous chapter but telling an older one: jrd_pt2.js :95 (.6 s1 «Trẫm đã hứa» assumes .4 won), :383 (pt_dang .6 s1 «theo lệnh tháng trước» assumes the .4 navy order).
Family fix: any chapter outcome that changes a person (health, sight, office, place) is stored in PTP state and every later line about it reads it; extend pt-scan 6b with state keys (not only w/alive).

### 5. LAW 7 / 11 — pf home phase prints Cao Ly titles (family fix incomplete)
KC2LAND.pf.tx defines dadN/momN/huynh/thuc/muoi, but `muoi` is never used and several literals stay: jkc2.js:141 family row «Vương muội» (route.js --origin=pf output shows «Vương muội» twice), :317–:320 n_muoi title and kc2Go labels «Vương muội», :318 «hỏi han về vương muội», :353/:354 «vương muội», :232 x hint «biết Vương thúc tính gì» and fail log «Vương thúc cười nhạt», :332 «Vương thúc biết ngươi hai lòng».
Fix: route every Cao Ly royal title of the nc/pf home phase through KC2LAND[br].tx (a kc2Muoi() like kc2Thuc()); scan jkc2.js for «Vương thúc|Vương muội|vương muội|Phụ vương|phụ vương|Vương hậu|Thế tử|Cao Ly» on lines a pf life reaches; before/after table.

### 6. Smaller items (fix in the same pass)
- Law 8: {quan}=«Thiên hoàng» is used in Đại Hy court NARRATION (jrd_pt.js :295, :363, :389, :402); E19 §C.3: «Thiên hoàng» only inside Phù Tang scenes, Đại Hy says «Quốc chủ Phù Tang». Keep it where a Phù Tang person speaks and at :384 (the naming dispute itself). «giấy dó» (Vietnamese paper word) for Phù Tang paper (:429, :478, :589, jkc2 KC2LAND.pf.tx.sang) → «giấy» / «giấy Phù Tang». pt_tang: the Ganjin shape shows one failed crossing (.6) before .11 — say in text that earlier crossings failed (jrd_pt2.js:91). jrd_pt2.js:451 «Mỗi tuần một trang» → «mỗi tuần trăng» / «mười ngày».
- GE: header comments promise hooks ge2 «Chủ thuyền Đông Hải» / ge3 «Đổ tội cho biển» (jrd_pt.js:62–63) but no option/ending carries them; chapters with no real ác option: pt_hai .4, pt_su .5 .6 .7 .9 .11, pt_tang .4 .5 .9 (weak). Each road passes as a whole; add an ác option where the chapter has a rival beat.
- Logic: rdOan applied on a failed try (jrd_pt.js :395, :552) — check it is the intended cost.
- Rare-row labels «Tâm cơ từ ${bar}» (jrd_pt.js :99/:331/:379/:605) follow the bd convention (rule display), OK if the UI shows them as the VANPHONG rule line.

### 7. GE catalogue hand-edited
dev/build/jgecat.js GE_ID gains "pf" by hand; ge-guard FAILs «jgecat.js = generated from cat.py (no hand edit)» (running dev/test/ge_guard/gen_js.py drops pf). Fix: add pf to ID in dev/test/ge_guard/cat.py and regenerate jgecat.js with gen_js.py; ge-guard must PASS.

## Notes (not part of this FAIL)
- N1 (law 2, whole road system, FOR E): bạc costs are flat (20–60) at every rank while the other road costs one stat point; OD:L582 asks to value bạc by how hard it is to earn AT HER RANK. bd/nc roads use the same flat shape and passed; a rank-scaled bạc cost for all roads is a Foreman D balance item, not this branch.
- N2 (law 4, j72 family): fam_pf (j72.js:577) types r:12 / −4 / dl:5 / odds 45 like every T7 row of j72; only fx is in BAL (BAL.m72.pfOk). Pre-existing j72 shape — file for the one-core pass.
- N3 (old saves, NOT this branch): an nc life saved on LIVE main («Công chúa nước Nam Chiếu hòa thân») loads in the merged build as «Công chúa nước Cao Ly hòa thân» (origin name changed in the save). Comes from the Cao Ly rename on the bd-roads base / caoly-road, not from phutang — FOR E14r / E20.
- N4: quickcheck on the branch sha alone: PASS (core gates PASS incl. G4 manifest-guard — the CDN floor fix works). On the main-merged build, G4 50-coop-one-world failed once on seed 3 (guest week changed R.evm); re-run seeds 3 and 7 on the same build both PASS, and LIVE main PASSes both → random flake, not a branch fault.

## Tests (run by me, merged build unless noted)
| Test | Result |
|---|---|
| build after merging LIVE main 7bc73251 | **FAIL** `SyntaxError: Identifier 'ptX'` (fix 1); all runs below on a LOCAL build with ptX→ptXc |
| quickcheck.sh on the branch sha 30d8ee51 (as pushed) | QUICKCHECK PASS · core gates PASS (incl. G4 70-manifest-guard) · open 1470 ms · old save ok · perf new/live render 231/186 · tab 410/408 · buổi 1117/1146 |
| quickcheck.sh on the main-merged local build | build/open/old save/perf PASS (render 194/184, buổi 1160/970); G4 50-coop-one-world FAIL once (seed 3, R.evm) → re-run seeds 3+7 PASS, LIVE main PASS both = flake (N4) |
| pt-scan.py (re-run) | 6b 0 unguarded · 6c 103 options, 58 booked, 45 used up, 0 NO BOOK — but the scan cannot see fixes 2–4 |
| pt-roads-bal.js STATIC, 4 roads | no-loss 0 · spread>6 0 · climax dominance 0 · not harder at rank 0 · digits/% 0 · unknown tokens none · page errors 0 |
| my option audit (606 options, 198 beats) | cost-only 0 · no-cost-no-gain 0 · strict dominance (any option) 0 · rank 0 · spread >4: 14 beats (max 6.0 pt_su_10.s2) · 63 bạc beats, each with a non-bạc option |
| pt-vp.py | PT-VP PASS (3555 strings) |
| one-core-guard | PASS (fails 0, balKeys 665) |
| time-spill-guard (in quickcheck) | PASS static + runtime |
| kc-roads direct.js ORIGINS=pf,nc,bd | rc 0, fail [] ×3 (pf pt_tang, nc nc_su, bd bd_hen) |
| kc-roads coop-together.js --a=cnv --b=pf | 26/26 passed |
| kc-roads route.js --origin=pf | fail [] — but shows «Vương muội» ×2 (fix 5) |
| road-full.js 1 life each | pt_hai «Lễ không thành», pt_su «Sứ giả của hai trời», pt_tang «Thầy sang bể», pt_dang «Luật bị bỏ dở»: all 14 chapters in order (1–3 tutorial, 4 premise, 5–11 road, 12–14 endgame) |
| ge-guard | catalogue ERRORS 0, but **FAIL «jgecat.js = generated from cat.py (no hand edit)»** (fix 7) |
| ge-engine | 104/104 pass |
| old saves, cross-build (save on LIVE main, load + play 60 months in merged build) | tt PASS · dtq PASS · bd (bd_ngua, old premise) PASS · nc: road/chapter/plan unchanged, origin name changed (N3, not this branch); others not finished (box: renderer crash under 2 Chromiums / time limit) + quickcheck old-save PASS |
| npc-roads ORG=pf (over http) | 14/14 pass · 1 life × 120 months, road pt_su, NPC roads 10 · the worker's VOICES.json fail does not occur over http = file:// test-box artifact, confirmed |
| bot lives | stopped by me after 1 life (pt_hai .11=mid, 0 errors): one life ≈ 10 min on this box; reachability of all 4 roads shown by road-full; the worker's 4×20 bot run (report §FINAL) stands — re-run ≥20/road at r2 |

## FOR E21 (fixer)
Fix 1 first (a rename + newest LIVE merge), then 2–5 with the scan extensions; re-run pt-scan (with the new 6c-read and 6b-state passes), pt-roads-bal STATIC, pt-vp, road-full ×4, bot ≥20 lives/road, quickcheck on a main-merged build. Reply «SẴN SÀNG KIỂM phutang-road r2 <sha>».

## HANDOVER (E21r, 20/11 ~09:15Z) — depth 4, START_CTX ≈ 3 %, now ≈ 35 % (rollover: START_CTX + 25 %)
- r1 verdict: FAIL 30d8ee51, 7 fixes above (report commit 0b390273). Foremen changed: now FOREMAN E #17 = session_01DgYSWoFXvbLeCE3SVSWgDG — send verdicts there.
- r2 ORDER (E #17, 09:10Z): BIG review review/phutang-road @ b868bbce (= cddb913f 7 fixes + LIVE 377d5ce3 + bd-roads PASS 4adea508), worker E21c, worker report dev/handover/reports/phutang-road.md §ROUND 2 @19da91f4. Check r1 fixes 1–7 item by item; diff OVER bd-roads 4adea508 (`git diff origin/review/bd-roads origin/review/phutang-road`). Do NOT final-merge. Reply «PASS b868bbce» or «FAIL + fix list», update this report with §ROUND 2.
- How I tested r1 (reuse): sparse worktree /home/user/wt/<name>; merge newest origin/main locally; bash dev/site/build_site.sh; `python3 -m http.server 8765` in the worktree, tests on http://127.0.0.1:8765/index.html (over http the npc-roads VOICES.json fail is gone). Run ONE Chromium test at a time (box 15 GB; 2 in parallel → «Target crashed»). Bot life ≈ 10 min; road-full 1 life/road ≈ 15 min.
- Checks to redo on r2: node --check dev/build/all.js after main merge (fix 1 ptX clash; scan every pt top-level name vs main); pt-scan new 6c-read / 6b-state passes and spot-read the r1 file:line lists (fixes 2–4: chest .9/.10, pearls .8, log page .7 t1, order burn pt_su .10, hộp kinh pt_tang .5 c2, sword .10/.9, ledger pt_dang .8, monk sight .7→.8–.11, sure ptS wins vs {v}: jrd_pt :275 :186 :249 :426 :458 :493, jrd_pt2 :270 :576 :32 :324 :236 :495 :141); fix 5 route.js --origin=pf must show no «Vương muội/Vương thúc»; fix 6 {quan} in Đại Hy narration, giấy dó; fix 7 ge-guard PASS (jgecat generated). Re-run pt-roads-bal STATIC, pt-vp, one-core-guard, quickcheck, direct, coop cnv+pf, road-full ×4, a few bot lives.
- Scratch probes (not in git, recreate if needed): an option audit (cost-only / strict dominance / bạc table) and an old-save cross-build test (save on LIVE _live_main.html → deser in new build).

## §ROUND 2 — E21r2 (BIG reviewer, opus), 20/11
PRIORITY #1 CHECK ('phutang|E21r'): OD 0 | ledger 0 | claims 8 | main 0 | review/* 2 | archive 0 — REUSED: my r1 report + HANDOVER, worker §ROUND 2 (E21b/E21c), pt-clash.py, pt-law6.js (+ok json), pt-scan.py, pt-vp.py, pt-roads-bal.js, quickcheck, kc-roads, road-full, ge-guard, npc-roads.
depth 5 · START_CTX ≈ 0 % (get_session used_tokens 0 at start)

Under review: review/phutang-road @ b868bbce (r1 fixes cddb913f + LIVE 377d5ce3 + bd-roads 4adea508). Scope = `git diff 4adea508 b868bbce` (26 files, the same family list as r1 + the new scans). NOTE: origin/review/bd-roads has moved on to d76511d3 since (LIVE fig-label/mg-score-same merges), so `git diff origin/review/bd-roads origin/review/phutang-road` now shows 51 files incl. reversed main work (jmgt, fig-label, KIT_REQUESTS…) — those are NOT phutang changes; I reviewed against 4adea508.
Local test build: b868bbce + bd-roads tip d76511d3 + LIVE main 66bd36cd merged (only generated index.html/sw.js conflicted), `bash dev/site/build_site.sh` → built 12979792, `node --check all.js` OK. Merge NOT pushed.

### VERDICT: PASS b868bbce

### r1 fixes, item by item (my own reading of the files on the merged tree, not the worker table)
| r1 fix | result | what I checked |
|---|---|---|
| 1 build clash | FIXED | whole family renamed pt*→pf* (save keys "pt.p.*"/"pt.o.*", road ids, RD_FL keys unchanged → no save break). pt-clash.py on main 66bd36cd: 36 names · clashes 0 · stale 0. node --check all.js OK after merging newest LIVE. |
| 2 law 6c objects | FIXED | pt_hai .9 g/.9 c1 read pfO("ruong") (lost chest → «rương cống ba thuyền đầu»); .8 x1 «Mang ngọc đến chuộc» `if` pearls in ta/kho/kimthanh + PFNGOCN names the box; pt_su .10 «Đốt tờ lệnh» `if pfO("lenh")==="ta"`; pt_tang .10 «Trẫm giữ hộ» books daotang→vua; pt_dang .9 x1 text per daochem holder (tn / thuyquan / vua); pt_dang .7 x1 pearls vs silver by holder. pt-law6 6c read UNGUARDED 0; I read all 40 reviewed exceptions in pt-law6-ok-*.json — each is a fact/record/policy true for every holder or a point where only one holder is possible; accepted. |
| 3 law 6a sure vs {v} | FIXED | pt-law6 6a SURE-VS-V 0 (every option whose go calls rdOan(A,"v") is rolled). Spot: jrd_pt.js:192, :255, :281 now have rf texts and roll; :281 fail leaves the hairpin with {v} (tram→v). Fact flags read (pt.f.tubo / traoxl / daoban / anhho, danhsach swap). rdOan on a failed try kept on purpose (commented) — accepted as the price of trying (law 3 gain-and-loss). |
| 4 law 6b state | FIXED | Trí Viễn's sight stored (pfP trivien.mat) at .7 endings; .8–.11 lines branch on PFMAT() (jrd_pt2.js:183, :261, :267, :290, :291); pt_su .11 g tells the ten-day royal journey to Minh Châu (jrd_pt.js:583); pt_dang .6 E.win follows Kim Hựu Thành's place (:404); queen guards need:["v","hh"]. pt-law6 6b UNGUARDED 0; pt-scan 6b 0 unguarded moves (50). |
| 5 pf home titles | FIXED | kc2Muoi() beside kc2Thuc(); jkc2.js literals «Vương thúc/Vương muội» remain only in the nc/bd fallbacks (:38, :39, :141 nc branch, :571 nc migration). route.js --origin=pf: «Vương muội/Vương thúc» 0, «Hoàng muội» ×2. |
| 6 smaller (law 8, GE, logic) | FIXED (1 note) | «giấy dó» 0 in jrd_pt/jrd_pt2/jkc2; Đại Hy narration uses «Quốc chủ {land}»; two failed crossings told; «Mười ngày một trang»; GE hooks named in the header; new ác options in the listed chapters. Note R2-N1 below. |
| 7 GE catalogue | FIXED | pf in dev/test/ge_guard/cat.py; gen_js.py regenerates jgecat.js with no diff; check.py ERRORS 0. |

### Per-law (touched by the diff)
1 two-way OK (new pt_dang .7 c2 counter-rumour) · 2 equal value OK (STATIC spread >6: 0, climax dominance 0, 4 roads) · 3 gain-and-loss OK (no-loss options 0) · 4 one core OK (one-core-guard PASS; road files type no numbers) · 5 harder with rank OK (0 not harder) · 6a/6b/6c OK (pt-law6 PASS, pt-scan PASS) · 7 wording OK (pt-vp PASS 3802 strings; digits/% 0) · 8 history OK (note R2-N1) · 9 kit OK (no UI in the diff) · 11 whole family OK (every fix came with a scan + before/after table).

### Tests (run by me on the main-66bd36cd-merged build, over http://127.0.0.1:8765, one Chromium at a time)
| test | result |
|---|---|
| node --check all.js after newest LIVE merge | OK |
| pt-clash.py | 36 names · clashes 0 · stale 0 · PASS |
| pt-law6.js | 6a 0 · 6b 0 · 6c 0 · PASS |
| pt-scan.py | 6b 0 unguarded moves · 6c NO BOOK 0 |
| pt-vp.py | PASS 3802 strings |
| ge_guard gen_js.py + check.py | jgecat.js generated (no diff) · ERRORS 0 |
| quickcheck.sh (local merge) | CORE GATES PASS (one-core-guard · rules-one-source · kit-conform · coop-one-world · hooks 6) · TIME-SPILL PASS · open 1536 ms · old save ok · perf new/live render 166/174 · tab 361/336 · buổi 890/974 · tasks>200ms 16/17. (Its "NOT BUILT" line = my local merge commit does not carry the rebuilt index.html — local artifact, not the branch.) |
| pt-roads-bal STATIC, 4 roads | no-loss 0 · spread>6 0 · climax dominance 0 · not harder at rank 0 · digits/% 0 · unknown tokens none (options 151/149/155/161) |
| kc-roads direct.js ORIGINS=pf,nc,bd | rc 0 · fail [] errs [] ×3 (pt_hai, nc_gian, bd_soi) |
| kc-roads route.js --origin=pf | rc 0 · fail [] · «Vương muội/Vương thúc» 0 · «Hoàng muội» ×2 |
| kc-roads coop-together.js --a=cnv --b=pf | 26/26 passed |
| road-full.js, 1 life per road (own process each) | pt_hai «Lễ không thành» · pt_su «Thuyền đi không chiếu» · pt_tang «Thuyền đi không có thầy» · pt_dang «Luật bị bỏ dở» — each 14/14 chapters in order (1–3 tutorial, 4 premise, 5–11 road, 12–14 endgame), 9/9 checks |
| bot lives pt-roads-bal, 1 life per road, own browser each | pt_hai .11=mid · pt_su .11=win · pt_tang .11=mid · pt_dang .11=win2 — 4/4 reach .11, 0 errors. (The worker's 20 valid lives/road on f5a5a0f9 stand: no pt file changed f5a5a0f9→b868bbce; ≥20/road in one browser is not possible on this box, see R2-N2.) |
| ge-guard.js (http) | 6/6 pass |
| npc-roads ORG=pf (http), 1 life × 120 months | 14/14 pass · gain-and-loss scan 24 options, 0 without cost or loss |

### Notes (not blocking)
- R2-N1 (law 8, wording): two hint lines in Đại Hy voice still print {quan} (= «Thiên hoàng»): jrd_pt.js:308 wx «{quan} biết bà chết vì ai» and :362 wx «giữ đúng lời {quan}». Both sit in scenes about the Phù Tang ruler's own letter/list with the Phù Tang envoy present, so I accept them; if E wants zero, swap to «Quốc chủ {land}» in the land pass.
- R2-N2 (box / FOR E, not this branch): one Chromium renderer grows over long play; my first bot run (2 lives in one browser) crashed the renderer on life 2 and the container restarted (exit 137). Same finding as the worker (E21c box note 1). One life per process runs clean. Worth a memory look on LIVE (jchat/jchatl landed since r1).
- R2-N3 (landing): bd-roads is now d76511d3 (not on main yet). Landing order stays bd-roads first, then phutang; the land merge only conflicts in generated index.html/sw.js (rebuild with build_site.sh), as in my local merge.
- r1 notes N1 (rank-scaled bạc), N2 (j72 fam_pf typed numbers, pre-existing shape), N3 (nc origin name on the bd/caoly base) stay open FOR E — not this branch.

### FOR E #17
PASS b868bbce. Do not touch main from here; foreman verifies FF / writes LAND READY after bd-roads lands.

## §LAND — E21r3 final-merge (21/11 ~02:00Z)
LAND READY phutang-road **54e068e519b003389e27281260af84d74c5f4df1** (pushed to review/phutang-road; FF over origin/main e4fd4dcf).
PRIORITY #1 CHECK ('phutang|E21r'): OD 0 | ledger 0 | claims 8 | main 0 | review/* 2 | archive 0 — REUSED: E21r2 §LAND + HANDOVER gate list, pt-clash/pt-law6/pt-scan/pt-vp, quickcheck, coop-e2e, kc-roads, road-full, ge tests. depth 6.
- Merges (one each, only generated index.html/sw.js conflicted unless noted; rebuilt by build_site.sh; node --check all.js OK; jgecat.js gen_js no diff each time): e744d428 → + LIVE 794c6b77 (dc8da915) → + 548dcd0d road-triggers (c50ef1ba; assemble.py = main list + jbalpt/jrd_pt/jrd_pt2) → + 463d3d70 pm r4 (928ad4b4; assemble.py same rule, jpma kept) → + 24dd2c62 kit-dress-picker (6a26e624) → + b1033eb0 jtq14-addr/ge-rank (f04c08be) → + a4fdb642 mgcal-redo (3852c314) → + 4f34f461 mgcal b4 (a9bac462) → + e4fd4dcf kit-ton-row (54e068e5).
- Static on every merge: pt-clash 0 · pt-law6 PASS · pt-scan NO BOOK 0 · pt-vp PASS 3802 · one-core-guard/-text/-bind/-text-rule PASS · ge check.py ERRORS 0.
- Full browser set on f04c08be (LIVE b1033eb0; later merges touch no road / GE file): QUICKCHECK PASS · coop-e2e 68/68 · coop-e2e COOP_GE=1 74/74 · ge-guard 8/8 · ge-engine all 1328/1328 · ge-rank-scan PASS 0 · road-full pt_hai «Lễ không thành» / pt_su «Sứ giả của hai trời» / pt_tang «Thầy sang bể» / pt_dang «Bia luật biển» 14/14 chapters, 9/9 each · direct pf/nc/bd fail [] · route --origin=pf fail [], «Vương muội/Vương thúc» 0 · role-parity ALL PASS (×2 on dc8da915, ×1 on 6a26e624, ×1 on f04c08be).
- Short re-gate on 54e068e5 (LIVE e4fd4dcf): QUICKCHECK PASS (core gates, time-spill, old save ok; perf new/live render 301/276 · tab 572/658 · buổi 1544/1185) · coop-e2e 68/68 · kit-ton-row PASS 12 · coop-ton-row 19/19 · coop-together cnv+pf 25/26 (LIVE fault below) · static set PASS. On 3852c314 (LIVE a4fdb642) mgcal-redo 12/12.
- coop-e2e on 3852c314 once 66/68 (guest seat Thái hậu picture blank, start + week 1) → a9bac462 68/68 ×2 and 54e068e5 68/68 → image-load flake, no phutang file shows pictures.
- CO-OP LAND GATE (owner OD 'Co-op: helping/harming…', 20/11): coop-e2e PASS + the feature's own two-seat check = kc-roads coop-together --a=cnv --b=pf: 25/26 every run; the one FAIL «B went through the selection card» (S.selx unset for a cnv-host guest) fails the SAME way on pure LIVE 463d3d70 with cnv+nc and on this branch with cnv+nc → LIVE fault (kc2Sel), not phutang; every pf-side check passes (both seats in one world, same date, pf seat sees the host, two-way). FOR MAIN: open a fix for coop-together «B went through the selection card» on LIVE.
- quickcheck G4 coop-one-world failed once on dc8da915, re-run seeds 3/7/3 PASS = known flake (r1 N4). road-triggers.js (all origins) crashed the box renderer after 3 origins (memory, not a page error) — not part of this gate list.

## HANDOVER (E21r2 → E21r3, 20/11 ~20:00Z) — depth 5, START_CTX ≈ 0 %, now ≈ 38 % (rollover: START_CTX + 25 %)
- State: LIVE moved to 415b9ca0 (D choice-value-audit). Re-merge DONE and pushed: review/phutang-road @ **e744d4284c08c2dc565b9cf76f34ee13f77cb3e5** = e0f1e313 + LIVE 415b9ca0 (only index.html/sw.js conflicted; rebuilt by build_site.sh; node --check OK; FF over origin/main 415b9ca0; jgecat gen_js no diff; pt-clash/pt-law6/pt-vp PASS). The LAND READY line for e0f1e313 in §LAND / FOREMAN_E_STATUS.md is now STALE.
- DONE by E21r3 (see §LAND above). Was: run the gates on e744d428 ONE Chromium at a time, then REWRITE the §LAND LAND READY line in place (canon overwrite: replace e0f1e313 by e744d428 + new results) and add ONE line to dev/handover/FOREMAN_E_STATUS.md, push the handover branch (fetch +ref, checkout --detach origin tip, cherry-pick, push; never pull --rebase), send «LAND READY phutang-road <full sha>» to FOREMAN E (E #21 session_01DgYSWpNbcJyCoGaB1FhLFq, or the successor named at the tail of FOREMAN_E_STATUS.md).
- Gates + exact invocations (from a sparse worktree of origin/review/phutang-road, after `bash dev/site/build_site.sh`; server `setsid python3 -m http.server 8765 --bind 127.0.0.1` in the worktree, U=http://127.0.0.1:8765/index.html):
  `bash dev/tools/quickcheck.sh HEAD` (its «NOT BUILT» line only appears if index.html is not committed) · `node dev/test/role-parity.test.js` ×2 (NO url arg: it takes a file path, default dev/index.html; «Target crashed» = box, rerun) · `node dev/test/one-core-{guard,text,bind,text-rule}.js` · `python3 dev/measure/pt-clash.py`, `node dev/measure/pt-law6.js`, `python3 dev/measure/pt-scan.py`, `python3 dev/test/pt-vp.py` · `node dev/test/ge-guard.js $U` · `ORIGINS=pf,nc,bd node dev/test/kc-roads/direct.js $U` · `node dev/test/kc-roads/route.js $U <outdir> --origin=pf --shots=none` («Vương muội/Vương thúc» 0) · `node dev/test/road-full.js $U 1 <road>` for pt_hai, pt_su, pt_tang, pt_dang (one process each, ~5 min each). Optional: `node dev/test/kc-roads/coop-together.js <outdir> --a=cnv --b=pf` = 25/26 «B went through the selection card» is a LIVE fault (LIVE fails it with cnv+nc too), not phutang.
- Results on e0f1e313 (expected the same): all gates PASS; road-full 14/14 ×4; ge-guard 8/8.
