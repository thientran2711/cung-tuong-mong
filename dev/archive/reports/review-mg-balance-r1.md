# Review: review/mg-balance @ 26ff48ac → review/mg-balance-r1

RESULT: PASS 288aa4f64a875e7653c7928a743a542fdf08ccdc (descends from origin/main e9c6021d)

Reviewer: opus (game numbers / difficulty), 11/16/2026. Owner rules checked: OD:L1255 (too easy, whole family, harder as she climbs), OD:L1265 (no word games), OD:L1266 (MEDIUM, Tuyệt phẩm 20–30 % for skilled play at matching level), OD:L1267 (ONE CORE), KIT FIRST, VANPHONG.

## Core (jmgt + BAL.mgTier) — correct
- `mgTier(kind,{occ,rank,lv,big})`: stake = BAL occ base + perRank·rank (+big), gap d = stake − her art level, ease = mid − slope·d + kAdj, tier word by ±band. The old cause of "Tuyệt phẩm almost every time" (env.lv = her own art level → the better she got, the easier the board) is gone; the board now gets harder as her rank (stakes) rises and eases only when her skill is above the occasion.
- Every caller goes through `mgSet` before `kg82Play`: j82 startContest (hoi/o.occ, big), playArt (hoc/o.occ → j83 works/lessons, jrcp, jveil, jkc Phúc tuyển occ tuyen, jwkr wrapper keeps it), kg82Lesson, jexam exRun (exam, rank = target), jts tsGame (trieu), jtd (hoc). No other `KG82.lv=` writer and no direct `KG82_ENG[...]` call outside kg82Play/kg82Lesson (grep after the merge with main e9c6021d, incl. main's new files).
- Float scores on every engine; `kg82Play` grades with `mgGrade(raw,kind)` (BAL kG). Tolerance/full-score/extra-pieces levers (`mgTol`, `mgFull`, `mgMore`) read BAL. VANPHONG: intro row "Độ khó: Dễ · hội thi, tài nghệ bậc 3", no numbers of odds, no %.
- Kit: no new classes/CSS in the diff (only existing kchip/kpst/past/ph/art). Old saves: no new save fields; old save made on main loads.

## Re-measured (dev/measure/mg-bots.js, skilled + random; graded score ≥9 = Xuất sắc)
Vừa = hoc rank 4, art 2 (matching). Worker | reviewer (n) | after the reviewer kG trim:
| kind | worker | reviewer | after trim |
|---|---|---|---|
| ban | 30 | 27 (30) | 27 |
| dan | 30 | 43 (60) | 28 (kG 2.3→2.8) |
| den | 27 | 35 (60) | 25 (kG .9→1.05) |
| duho | 30 | 20 (30) | 20 |
| hat | 20 | 8 (60) | 25 (kG none→.85) |
| hoa | 30 | 20 (30) | 20 |
| huong | 37 | 27 (30) | 27 |
| kim | 30 | 27 (30) | 27 |
| kinh | 20 | 36 (28) | 36 (left; n small, worker 20) |
| mua | 40 | 33 (30) | 33 (open item) |
| theu | 23 | 34 (29) | 34 (left; worker 23) |
| ve | 17 | 45 (60) | 27 (kG 1.5→1.7) |
Random bot: 0 % ≥9 on every engine (mean ≤2.8). Dễ (hoc/0/2) / Khó (hoc/6/1), skilled, graded ≥9 / mean: dan 43/8.0 → 0/5.5; hat 100/10.0 → 0/6.0; kim 93/8.9 → 0/7.5; ve 77/9.1 → 0/4.4; duho 77/9.2 → 3/6.7. Order Dễ > Vừa > Khó holds. Tuyệt phẩm reachable at Vừa, not automatic.

## Fixes made on review/mg-balance-r1
1. ONE CORE: the work-card tier line was typed "Thường dưới 6 · Khá 6 · Tinh xảo 10 · Tuyệt phẩm 14" in j83 wkAsk, jwkr and jtds — wrong after this branch (Tuyệt phẩm is 15). New `wkThTxt()` prints `BAL.mgTier.wk.th` (whole family: 3 places). jwkr / jtds still printed "bậc N: +N" (old full art level) → `wkLvQ`. j83/jtabs use `wkLvQ` too.
2. Tuyệt phẩm was automatic with Công bậc 3: the +1 tier lift (j83 wkTierP) turned Tinh xảo into Tuyệt phẩm, so quý material + Công 3 gave Tuyệt phẩm at play 3. The lift now stops at Tinh xảo (`BAL.mgTier.wk.cong = [3, 2]`); text j85 Công bậc 3 "thành phẩm lên thêm 1 bậc (tới Tinh xảo)". Checked in game: Thêu 4 + Công 3 + quý → "8 phần ra Tuyệt phẩm".
3. `kg82NpcMean` (rival / "Để tài nghệ quyết định" play score) was a typed 4 + .4·lv → `BAL.mgTier.npc`.
4. kG re-trim for dan, ve, den, hat on pooled n=60 raws (table above; grading is post-hoc so the raw runs stay valid).
5. Merged origin/main e9c6021d (assemble: main's 7 new files + jmgt after j91; jbal2: BAL.mgTier beside main's BAL.mem); site rebuilt.

## Tests (on the merged build)
- dev/test/mg-balance-vp.js (old save made on main → new build; 28 kinds open + FINISH by bot) at 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390@2, 390x844@2: old save loads; 28/28 kinds open + finish at every size, 0 page errors, 0 horizontal overflow
- Own screenshots looked at (contest intro with the Độ khó row, board, result podium, work material card) at all 6 sizes: 0 page errors, 0 horizontal overflow; 390x844 shows the rotate prompt.

## Trial merges (not pushed) — for the coordinator / those branches' next round
- review/nw-poem-r1: conflicts only in generated files (index.html, sw.js) + assemble.py file list (keep both: jmgt after j91, jnwp). API: reads KG82.tier and mgFull — matches.
- review/nw-quiz-r1: same generated/assemble conflicts; jbal2/jexam auto-merge. API MISMATCH: `mgTier(env.kind, KG82.ctx)` passes a string as the options → occ falls back to "hoc" and her own rank, so in a khảo hạch the tier ignores the exam stakes. Fix there: read `KG82.tier` (set by jexam's mgSet) and fall back to `kg82Tier(env.lv)`.
- review/nw-lantern-r1: conflicts index.html, sw.js, assemble.py, j91.js (it deletes the old k91Lantern word game that this branch edited → take theirs, delete). API MISMATCH: `window.mgTier(kind, ctx)` returns an object, the code expects a number → always falls back to `kg82Tier(env.lv)` (works, ease-based aids, but the Dễ/Vừa/Khó word of the occasion is not used). Fix there: `KG82.tier ? KG82.tier.tier : kg82Tier(env.lv)`.
- review/slap-mg-r3: carries an OLD copy of jmgt.js and BAL.mgTier (wk th 14, no kG/tol/easeMin) → conflicts in jbal2.js, KIT.md (§45.4 vs §79: keep both), mg-bots.js (keep this branch's bot + its slap bot additions), assemble.py, generated files, assets.json. ORDER TRAP: slap's `Object.assign(BAL.mgTier.occ,{tat,ne})` must stay AFTER this branch's `Object.assign(BAL,{mgTier:…})` (which sits at the end of jbal2) — otherwise BAL.mgTier is undefined at load, or the later full assign drops tat/ne. jslap's slapE clamps ease to 0..5, so easeMin −2 is safe. Resolve jmgt.js to this branch's version.

## Open items (non-blocking; with review/mg-balance-2)
- Known: banh, co, td_hanh saturate; mua flat across tiers; dauho / td_dung uncalibrated; td_ngon is a word game.
- kinh 36 % and theu 34 % at Vừa in my runs (n≈30; worker 20/23) — re-check with n=60 before trimming.
- Khó is harsh for trace games and hát (graded mean 4.4–6.0, 0 % Giỏi) when the occasion is 2 levels above her skill; owner wants MEDIUM — consider a floor on ease for Khó.
- Engine baselines still typed in the engines (mgFull(env,.62/.82/.85/.88), rhythm 220 ms / 100 ms windows): engine geometry, acceptable, but could move to BAL.
- tsGame defaults occ "trieu" also for the festival lantern release (jts Thả đèn) — pass occ "hoi" there.
