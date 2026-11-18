# grand-endings-engine — REVIEW E1r (BIG: game structure + odds + numbers) — **FAIL** (5 fixes, small; engine itself sound)
Reviewer E1r session_01DgYSWovXDKzaubrVVDf2g5 (for Foreman E). START_CTX ~3 %. Branch under review: review/grand-endings-engine **2ae4715** (code 7284526), base origin/main 94a93759.
PRIORITY #1 CHECK: OD L1612/L1617/L1623 (1)/L1836 (grand endings) | main none (no S.ge / BAL.ge / Hồi kết nhánh on origin/main 13e2b834) | review/* review/grand-endings-design r3 52cdc078 (design, built from) + review/grand-endings-engine (this) | claims E1/E1b only.

## Verdict: FAIL — fix 1–5, then re-review is short (no measure rerun needed unless fix 4 changes data)

| # | file:line | fault | fix |
|---|---|---|---|
| 1 | dev/build/jst14.js:197 (code dependency of the .11 label change) | The "Xoay chiều" row (f14 shift of a chapter result) is inserted with `rows.findIndex(x=>x[0]==="Kết cục")`. The branch renamed that label to «Kết quả» in j67.js:1717 / jst14.js:103 → findIndex = −1 → `splice(0,0,row)`: the row now lands at the TOP of every shifted chapter-result card instead of under the result row. Regression from the whole-group rename (the scan grepped labels, not code reading them). | match «Kết quả» (or both) in jst14.js:197; whole family: `grep -n '"Kết cục"' dev/build/*.js` for any other reader (none else found by me besides display rows). Also the log line jst14.js:198 still says «Kết cục xoay chiều» → «Kết quả xoay chiều». |
| 2 | dev/build/j67.js:1766, j67.js:1783, jtabs.js:14 | Whole-group miss of the .11 label change (design §2.0: «Kết cục» only for grand / fail / kỳ ngộ): player text still says «… kết cục xuất thân xấu đi» (Nếu bỏ mặc rows, Luật chương info). | «… Khép nẻo đời xấu đi» (or writers' wording); re-run the scan incl. lower-case `kết cục xuất thân`. (jtabs.js:14 also types «Danh -3», «Sức -5, 2 khắc» — pre-existing on main, not this branch; noted for the ONE CORE owner, not a fix here.) |
| 3 | dev/build/jge.js:79 (ge1 options), jge.js:83–84 (ge2 options) | The kit option head shows the risk chip **«an toàn»** on all 4 + 3 Hồi kết nhánh options (shots 1180/755/390 · 1, 2). KIT §28 kitRisk: «an toàn = cannot fail». These choices decide a hidden roll with a real loss (fail outcome: Danh −12 + Phẩm vị Tần → Quý nhân in shot 7) → the chip lies (owner NO LIES OD:L1623 (4) spirit; KIT "it may never lie"). | give each ge1/ge2 option the kit override `risk:"có rủi ro"` + a true `hint` (e.g. «khó lường: ngả này dẫn tới đâu, chỉ trời biết») — same word on every option so it does not leak which pair owns an ending; D7 (odds hidden) unchanged. Kit data fields only, no CSS. |
| 4 | dev/build/jgedata.js:52 (cnv_mat lean.m) / BAL.ge.var | Shading band per road not met for cnv_mat: cruel → ác **.50** in the worker's run 4 and **0/1** in my run (lean −2.7: lt −2 × tag 4 + ΔĐức 47 × .05 + Ngã rẽ 2 «Lấy ân» +3). Pooled .75 hides it. Owner: evil roads first-class ("không ép … con đường thiện", L1612). A cruel cnv_mat player who aims at cnv_mat_3 gets the thiện title. | add ác-tagged REAL options on the cnv_mat Chuỗi paths (writers' data, jgedata only; ge-guard checks names), or raise the per-road check: ge-measure must report kindT / cruelA PER ROAD and the band `BAL.ge.target.shade` must hold per road (fix the measure's pass line too). Re-measure cnv_mat kind+cruel only (MODES=kind,cruel, roads cnv_mat). |
| 5 | branch base | Branch sits on 94a93759; origin/main is now 13e2b834 (+234 commits). `git merge-tree` = CONFLICT dev/build/assemble.py (module list) + KIT_REQUESTS.md + built index.html / sw.js. A PASS sha must have current origin/main as ancestor. | merge origin/main, resolve assemble.py (keep main's list + jbalge/jgecat/jgedata/jge in the same place), rebuild (`bash dev/site/build_site.sh`), rerun ge-guard + ge-engine + quickcheck. |

Not fixes (notes): (a) ONE CORE nit jge.js:62 — funnel chapter points `[4,8,11]` typed; read `Object.keys(BAL.ge.funnel)` instead (do it with fix 5). (b) tt_co_1 `cw` says «… sổ môn sinh trong tay …» but cond checks only Tai mắt + seat (jgedata.js:21–23) — words must match the check (writers). (c) Co-op: `S.geSeat` and `S.geBoard` are personal keys (not in jcoopworld W_KEYS) → a friend's NDE/THH/TM seat does not lock mine and her Bảng row is not shown; harmless while only pilots + npc.on=false, MUST be in the NPC-parity / co-op step (design §2.8 "each friend's own row"). (d) The Đại kết cục event uses the generic event picture — the ending's painted scene is art for Foreman C later (design §6), not this step. (e) "Phần thưởng: kim sách …" shows lower-case k in the event (shot 3) though IT name is «Kim sách Thiên mệnh» — cosmetic, check the row formatter. (f) The measure revives dead lives (ge-measure.js `if(S.dead||S.out){S.dead=false…}`): rates are "given she lives to ch14" — fine for tuning, say so in the report table.

## Owner rules (1) — HELD
- Each branch (identity × road) owns its own 4 grand endings + its fail outcome each; no destined per-life ending; all 4 open at life start (S.ge.st "oooo", ge-engine `init`), choices pull / close / doom (L1617 overwrite of L1612 (1)) — HELD (jge.js:53–56, GE_CAT 40×4 from cat.py, guard ERRORS 0).
- Ordinary = the reverse of the grand ending: no normal set; every miss = that ending's fail outcome (`fail` / `ft`), quiet form when the pair owns nothing (D8, no loss, «Cuộc đời ngươi vẫn tiếp tục như thế.», L1612) — HELD (jge.js:87–94, shots 7 + 8).
- No forced route: Ngã rẽ 1/2 have no costs and no gating («Theo người ấy đi» greyed only when there is truly no bond, kitOff); every ending has its own pair, incl. leave / follow / cruel ones; a quiet «Rời khỏi cung cấm» does not throw her out — HELD. Funnel only from her own choices.
- Title is the ONLY carry (D5 "prev": S.dh entry, cosmetic, tier 8, no bonus; lifeSave sets ctm-ge.last only on a grand win) — HELD (ge-engine carry/no-carry). Bảng per life + Sổ luân hồi rows — HELD. Kỳ ngộ untouched — HELD.
- Open decisions D3/D4/D5/D7/D8 behind BAL.ge switches (jbalge.js:14–18), each exercised by ge-engine — HELD.

## Engine + numbers (2) — sound; ONE CORE held
Every number in BAL.ge (odds base 22 + 9/pull, clamp 5–88, noCond cap 12; var tag 4 / duc .05 / last 3 / cut 8; gates; fail; rw; pt; tier; bands). coregates one-core-guard PASS ×3. ge-guard stat-scale check present (Tai mắt 0–10, others 0–100; rw/fail ≤ half scale) — PASS; gates read through geStat on the same scales. Seat lock HH via qOn(), others S.geSeat; geRank never above RANKS.length−2 (HH only by seat). Fail-only from world (geLive), closing kept with chapter (cx). Code reads clean; only nit (a).

## Measure (3) — reproducible, bands plausible (my short rerun, sensible bot, PAR 2)
| run | lives | inChar [.30,.60] | random ≤.20 | open11 [1,2.6] | kind→thiện | cruel→ác |
|---|---|---|---|---|---|---|
| E1r (tt_co 8 jobs + cnv_mat/nc_tuc kind+cruel) | 12 | **.50** (5/10) | **0** (0/2) | **2.25** | **1.00** (3/3) | **.67 OUT** (2/3; cnv_mat 0/1) |
| worker 3+4 pooled | 42 | .55 | 0 | 2.05–2.25 | .83 | .75 (cnv_mat .50) |
Per-life lines: tt_co in j0 fail-only (.11 lost), j1 ok t (odds 88), j2 ok t (76), j3 ok a (67, lean −8.5); rand 0/2; tt_co cruel lean −16.5 → ác ✓ (roll lost at 67), kind lean +11.9 → thiện ✓ (j0 fail-only); cnv_mat kind lean +10.6 → thiện ✓ (ok, 88); cnv_mat cruel lean −2.7 → thiện ✗ (fix 4). nc_tuc kind lean +21.1 → thiện ✓ (ok, 85); nc_tuc cruel lean −21.2 → ác ✓ (odds capped 12: Tai mắt 2/3 unmet). Killed the rest of the full run (24 jobs ≈ 2 h) once every road had kind + cruel.
Matches the worker's numbers within sample noise (inChar ~.5, random 0, open11 ~2.2). One OOM "Target crashed" when two measures ran at once (retry recovered) — keep PAR 2 and one measure at a time, as the report says.

## Save / old save / co-op (4)
- Old save: S.ge missing → made open on first read (ge-engine `old` ×3 roads); quickcheck old save from the live build loads + plays a buổi (×3 runs) — PASS.
- Co-op: the engine is personal (her own story choices, her own roll, like j67/j97); NPC rel changes go through affAdd/oanAdd (viewer-relative, merged per pid); world loops untouched; coop-one-world gate PASS. Gap (c) above for the later step.

## UI / kit / VANPHONG (5)
Kit parts only: kit event dialogs (PEND / pushDil, mustChoose), kitRows, kitPanel + kitTabRowHTML, kitTitlePlate, kitPodiumShow, kitOff — no private CSS (kit-conform PASS). K-GE-1 / K-GE-2 correctly filed and the page is off (mapOn false). **K-GE-3 is a real kit gap**: I shot the Danh hiệu panel on the BASE build (origin/main 94a93759) at 390x844 with a worn title — the same `[kitTitlePlate, value]` row shape squeezes «Tâm cơ +2 (khi đeo)» and the how-text into a narrow column there too; the Bảng row (jge.js:173) only copies that shape (at 390 portrait it breaks one letter per line). Not a private fix; kit keeper owns it. Fold 755 cramped but readable; iPad fine. VANPHONG: no %, no digits in pilot text (guard), cổ trang wording, ngươi→ta by the naming rule; only fault = fix 3 «an toàn».

## PERF (6) — the GE engine does NOT cause the slowdown
quickcheck ×3 on 2ae4715 vs its own base 94a93759 (CTM_LIVE_REF=94a93759, nothing else running): all **PASS** (core gates, time-spill, old save, 0 errors).
| run | render new/base | tab | buổi | tasks>200 |
|---|---|---|---|---|
| 1 | 162/166 | 326/332 | 802/776 | 14/13 |
| 2 | 188/160 | 407/392 | 1067/984 | 18/15 |
| 3 | 218/175 | 378/342 | 921/780 | 14/13 |
| pooled 9+9 runs, median | 197/166 | 358/346 | 853/780 | 14/13 |
Isolation: (i) A/B in-page with GE switched off (BAL.ge.on=false + the 24 Thiên mệnh titles deleted) vs GE on vs base, 6 rounds, iPad ×4 CPU: render median 211 (off) / 219 (on) / 184 (base), spread ±60 ms — GE on ≈ GE off; (ii) CPU profile on a LIVE tt_co life (20 render() + 4 buổi, 4.4 s sampled): no ge* function has any self or inclusive time; dhSync 0.6 ms, dhWeek 1.1 ms. The worker's 1076 vs 685 ms was taken with the bot measure running on the box. Remaining render delta vs base is box noise / not GE (base build is 234 commits older than main; re-measure after fix 5 against the then-live main).

## Tests (7)
ge-guard **6/6** · ge-engine **104/104** · ge-shots **51/51** (755x1000@2, 1180x820@2, 390x844@2; no overflow, words on screen, 0 page errors) · quickcheck **PASS ×3**. Shots LOOKED at (scratch only, not in git, not uploaded): Hồi ngã rẽ 1 (3 options visible + «Kéo xuống» to the 4th; greyed state checked by ge-engine bondOff), ngã rẽ 2 (3), Đại kết cục event (rank-up, rewards rows, Kim sách, world line), title notice, Bảng tab, Sổ luân hồi (Thiên mệnh 1/320 + row + note), fail (loss rows), quiet. All readable at Fold + iPad; faults = fix 3 chip, K-GE-3 at phones.

## ROUND 2 (E1r2) — **PASS grand-endings-engine 177c730b**
Reviewer E1r2 session_01DgYSWq2J1J1agw2gLRXGDw (for Foreman E). START_CTX ~3 %. Delta 2ae4715..177c730b = f48857ee (E1b fixes 1/2/3/nit a + part of 4) + f0e25a57 (E1c fix 4) + 8da9e685 (merge origin/main 12a1e4be) + 177c730b (site rebuild). origin/main 12a1e4be is an ancestor (checked after a fresh fetch).
PRIORITY #1 CHECK: OD L1612/L1617/L1623 | review/grand-endings-design r3 + review/grand-endings-engine | round 1 E1r FAIL 2ae4715 (this file) | worker report sections E1b + «FIX 1 (E1c)» read; no new tool (reused ge-measure / ge-guard / ge-engine / ge-shots / quickcheck).

| # | round-1 fix | verdict | evidence |
|---|---|---|---|
| 1 | jst14 «Xoay chiều» row | HELD | jst14.js:197 findIndex matches «Kết quả» or «Kết cục» (row lands under the result row again); log line text kept (it is a log, not a card label) |
| 2 | «kết cục xuất thân» leftovers | HELD | j67 ×2 player text + jtabs gloss → «Khép nẻo đời» xấu đi; comments j67/jtabs/jroad too; `grep -i "kết cục xuất thân" dev/build/j*.js` = 0 |
| 3 | «an toàn» chip lie on Hồi kết nhánh | HELD | ge1 ×4 + ge2 ×3 options carry `risk:"có rủi ro"` (KIT §28 word, `.kchip.w`) + one shared hint each (no leak of which pair owns an ending). Shots looked at (755x1000@2: ngã rẽ 1, ngã rẽ 2): amber «có rủi ro» + GỢI Ý line on every option |
| 4 | cnv_mat cruel→ác band | HELD | f0e25a57 touches **jgedata.js only** (`git diff 2ae4715 HEAD -- 'dev/build/jrd_*'` empty; no player text changed). cnv_mat lean.m +4 (+6 from E1b) and P3 / P4 pulls +3 each. All 11 tagged names exist once in jrd_cnv.js (real options). None sits in a close list or in lean.p. Meaning checked against jrd_cnv (beat text + lx/rt): P3 «Nhờ người dò ai giữ lại» (spying on Kính sự phòng), «Giữ kín, chờ thời» («chưa lộ bài … Ngươi ghi nhớ cái tên» = a grudge held for later), «Đem chuyện gói bùa ra nói lại» = secrets as leverage (matches ha «mang theo … bí mật hậu cung»). P4 «Gặp {v} hỏi chuyện cung {mis}» (goes to her mistress's enemy; «lòng ngươi áy náy»), «Đổi lấy một lời hứa» («cả hai giữ thóp nhau»), «Cho {mis} biết {v} cũng định kéo nàng vào» (fail: «{mis} thấy bị lợi dụng») = a bond kept by leverage (ha «mượn tên chủ cũ … để nàng ta nợ ngươi»). All harsh/scheming; no gentle option mis-tagged |
| 5 | merge origin/main | HELD | 8da9e685: assemble.py = main's list (incl. jpq.js) + jbalge after jbal2, jgecat/jgedata/jge after jdh2 — the only non-generated resolution. Rebuild reproducible (build_site output differs from the commit only in the CTM_BI build-line stamp) |
| nit a | funnel chapters typed | HELD | jge.js:62 reads `Object.keys(GB().funnel)` (BAL.ge.funnel {4,8,11}, values unchanged) |

### My measure (alone, PAR 2, sens bot; lives "given she lives to ch14")
| run | lives | inChar | open11 | kind→thiện | cruel→ác | shade band per road |
|---|---|---|---|---|---|---|
| cnv_mat kind+cruel (`MODES=kind,cruel … - 4 2 … cnv_mat sens`) | 8 | .25 | 1.50 IN | .75 IN | **1.00 IN** | **IN shade cnv_mat** |
| nc_tuc kind+cruel (control, data unchanged) | 4 | .75 | 2.75 | 1.00 IN | 1.00 IN | IN shade nc_tuc |
Page errors 0, 12/12 lives ok. In these kind/cruel-only runs inChar and open11 are counted on kind/cruel lives only, 4–8 lives each. They are noise, not the band check. cnv_mat inChar pooled with E1c m7 = 10/24 = .42 IN. nc_tuc open11 2.75 on 4 lives vs .50 / 2.05–2.25 in round 1 on the same data. The band this fix was about (shade per road) holds on both roads.

### Gates / tests on 177c730b
ge-guard **6/6** (ERRORS 0) · ge-engine **104/104** · ge-shots 755x1000@2 **17/17** (looked at ngã rẽ 1 + 2) · build_site OK · quickcheck **PASS** alone vs live 12a1e4be (core gates incl. one-core-guard, rules-one-source, kit-conform, coop-one-world; time-spill; old save; 0 errors; render 233/268, tab 493/441, buổi 1027/1288, tasks>200 18/16 — box noise, no GE cost per round-1 perf section).
ONE CORE: no new numbers in the delta (data names + kit text fields only). KIT FIRST: kit option fields `risk` / `hint` only, no CSS / private part (K-GE-3 stays a filed kit gap). VANPHONG: new hints cổ trang, no %, no digits.

### Notes (not fixes)
(g) cnv_mat lean tags are now 7 thiện / 18 ác (tt_co 7/8, nc_tuc 7/7). Kind bands still hold (.75). If writers add options later, give cnv_mat more thiện tags so a neutral player is not nudged toward ác shading. (h) «Giữ kín, chờ thời» is the mildest of the new ác tags; it is fair (a grudge held: «Ngươi ghi nhớ cái tên»), but writers may revisit it. Round-1 notes (b)–(f) still stand for their later steps.
