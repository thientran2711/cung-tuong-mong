# D-SELX-FAIR — worker report (review/selx-fair)

PRIORITY #1 CHECK ('ban hoa|selx'): OD 19 | ledger 0 | claims 8 | main 15 | review/* 0 | archive 67 — OD 24/11 ~05:40Z (ban hoa = life ends), ~06:15Z (CONTEST: 12 tú nữ, TOP 4 kept — owner's own number), ~06:20Z (only the 3 tests count) | main jselx.js selxContest/selxResult, jselxday.js selxContestRun, jbal2.js:682 BAL.selx {yard:{n:12,kept:4}, w, noise} | review/firstcard-2-rv de123ff3 (NOT on LIVE 1dcb373e; FIRSTCARD kitRiskOpt odds on the kc2Sel board card + selxOddsP) | claims none.

START_CTX: ~4 % (worker, opus, session_01D3E3NYb5XyihZuzW8uuS5M; parent Foreman D session_01D3E3NZKCLJ7V9VupQyCnr1). Rollover at ~29 %.

## Status
- 26/11 ~12:40Z: worktree review/selx-fair = de123ff3 + LIVE 1dcb373e merged (5acc3ec9, built files only conflicted, rebuilt).
- NOTE for Foreman D: the brief example «Hạng 9/12 · giữ 6» — the owner ruled TOP 4 kept (OD 24/11 ~06:15Z, verbatim «4 cô điểm cao nhất»). LAW 16: yard.kept stays 4; fairness is fixed in the score maths (BAL.selx.w / noise), never in kept.

## Work (review/selx-fair c1b2350a = de123ff3 FIRSTCARD-2-rv + LIVE 1dcb373e + 4 commits)
### Root of the harsh cut (law 1)
`dev/measure/selx-tune.js` distribution check over 125 fresh tú nữ lives: her Đức is **30 at every fresh start** (p10 = p50 = p90 = 30) while the other tú nữ are drawn by `rstats` on the consort scale (mean 48). At `BAL.selx.w.duc .15` that gap alone (≈ −2.7 phần) put an average player under the base rate yard.kept / yard.n = 4/12; her own-level mark («Cúi đầu chờ xét» = entSkipRaw, 5) vs the girls' mean board mark 4.0 and her Tài 58 vs 54 could not make it up against noise ±3. Tài weighed only .1.
### Fix — BAL only (law 4), the same formula for every girl (law 1); yard.kept stays 4 (OD 24/11 ~06:15Z, LAW 16)
`BAL.selx.w`: duc .15 → .05 · tai .1 → .15 · mini 1.5 → 2 · dd .75 → 1 · hx .75 → 1 (keeps the accepted ratio mini ½ · đối đáp ¼ · hành xử ¼, OD 23/11 ~23:47Z (c)); base, sac, imp, noise unchanged.
### Before / after — kept-rate (her place ≤ 4 of 12)
Profiles: skip = «Cúi đầu chờ xét» + first answers · fair = board «Giỏi» (mgTier.word[2]) + first answers · good = «Giỏi» + the valued answers · best = «Xuất sắc» + valued answers.

Full card-by-card days (`node dev/measure/selx-fair.js 30`, 30 lives per profile; before = same build with the old w as override); told = mean of the hall-card odds:
| profile | before kept (told) | after kept (told) | after by Tài <50 · 50-69 · 70-84 · 85+ |
|---|---|---|---|
| skip | .30 (.29) | .43 (.46) | .11 · .50 · .71 · – |
| fair | .53 (.56) | .73 (.80) | .56 · .64 · 1.00 · 1.00 |
| good | .67 (.55) | .87 (.74) | .63 · .93 · 1.00 · 1.00 |
| best | .87 (.77) | 1.00 (.95) | 1.00 · 1.00 · 1.00 · – |
Fast tuner (150 lives, real girls + tests + first impression): before .18 / .42 / .78 / .97 → after .45 / .83 / .99 / 1.00. Cut score (lowest kept) after p10/p50/p90 63/66/69. A careless life can still be cut (more so with low Tài); a girl who plays the board well is kept as a norm; Tài helps monotonically. Hall odds (told) match the true rate at her own level (law 7); «good/best» are told lower because the odds are given before the tests at her own level.
### Display — every trial that can END the life (law 7/11)
Family scan: life-ending trials with a result = (1) selection contest, 3-day road (jselxday selxContestRun), (2) selection contest, direct road (jselx selxSelDo), (3) Sơ tuyển (jkc kcSoGo), (4) tiểu thư Điện tuyển (jkc kcDien) → «Trả thẻ bài» (life ends outside). Phúc tuyển only feeds (4); princess Lễ ra mắt never ends the life (FIRSTCARD); mid-game tuyển tú (j27) is not her trial.
| trial | odds BEFORE (LIVE → after) | result AFTER (LIVE → after) |
|---|---|---|
| (1) 3-day contest | none (test + board cards bare §93.7) → hall card «Điện tuyển»: rule (12 thi, giữ 4, còn lại ban hoa) + `oddsChip(word(selxOddsP(entSkipRaw())))` | podium place+score, ending card nothing → podium title «… · mốc giữ N phần»; kept card «Ngươi đứng thứ … được … phần; mốc được giữ …» (words); ban hoa ending rows «Điện tuyển: Hạng 12/12 · giữ 4 · 44 phần · mốc giữ 63 phần» + «Phòng được: …» |
| (2) direct contest | kc2Sel meter (FIRSTCARD) | podium title cut + the same ending rows (S.selx2.cut, one record `selxCut`) |
| (3) Sơ tuyển | declared (FIRSTCARD) | «Trả thẻ bài» card: «Sơ tuyển: ma ma xét năm điều (…); ngươi đạt …, phải đạt ba mới qua.» (`kcSoPts`; typed `>=3` → `BAL.kc2.soNeed`, law 4) |
| (4) Điện tuyển | declared (FIRSTCARD) | «Trả thẻ bài» card: «Điện tuyển: ngươi được … phần; mốc giữ thẻ bài là … phần. Cơ giữ thẻ lúc ấy: [odds chip]» |
Kit: only existing parts (oddsChip meter, kitRows via deathChain, podium `sub`, card `<p>`); no new CSS. Selection cards keep words, no digits.
### Tests so far
selx-rules ALL PASS · selx-wire ALL PASS · firstcard-scan --fail 0 NOT TOLD · real-UI videos LIVE vs branch (forced ban hoa) Fold + iPad: PASS every card visible, 0 page errors, 0 danger pulse. Running: quickcheck c1b2350a, selx-days, coop-e2e.

## Gates on review/selx-fair 8c56b83e (= LIVE aa37de21 merged, FF from LIVE)
selx-rules ALL PASS · selx-wire ALL PASS · selx-days ALL PASS · firstcard-scan 0 NOT TOLD (39 hidden-roll, 51 life-ending) · npc-purpose-scan PASS (419 rows; row jkc.js:384 updated to FIRSTCARD's `roll(rp())` — it FAILed G4 on the base de123ff3) · **coop-e2e 143/143** · quickcheck: open ok · old save ok · selection rerolls 14 (robot) · CORE GATES FAIL only on G4 80-dialog-fixed «(kit-dialog-2 a) no empty Tốn / Được cell» Fold + iPad — the SAME 2 FAILs on LIVE aa37de21 itself (run in /home/user/wt/selx-live) → pre-existing on LIVE, not from this branch; not touched here (kit scope).
## Foreman D question (seat A3 nc_tuc lazy-1, LIVE: «Bị ban hoa» at y1 b1)
nc is a hòa thân origin (BAL.selx.hoaThan nc/bd/pf): on this branch (FIRSTCARD base) a princess is never in the tú nữ contest and never ban hoa — worst = one step under the treaty rank (selx-wire «a princess is never ban hoa» PASS). For a tú nữ low-effort life («Cúi đầu chờ xét» = her own level) the kept-rate goes .30 → .43 (full days) / .18 → .45 (tuner). A sent-home life has NO outside road by owner ruling (OD 24/11 ~05:40Z «ban hoa = the life ends», LAW 16/17 — not reopened); law 2/3 hold at the CHOICE: «Cúi đầu» equals her expected play, playing the board costs Sức for a better mark, every option carries its true odds + «Mất: … kiếp này dừng», and the hall card now tells the keep odds before the tests.
