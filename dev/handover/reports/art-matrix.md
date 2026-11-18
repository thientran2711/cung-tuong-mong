# art-matrix — W33 planner report (Foreman C ROOT-17, MAIN s43 order 18/11 03:51Z)

PRIORITY #1 CHECK ('art-matrix'): OD 0 earlier matrix (OD ~03:50Z 18/11 = the order itself; OD:L1203 FP faces "from the 84" overwritten by 18/11 "công chúa phiên bang vẽ riêng") | ledger 0 | claims 1 (MAIN s43 order, never started; t9/t10 tiers claim session_011xDdVShLvZ7X2KBzWPp6Aj stale; FP art #5 session_011xDdVQLLoooSkPhJraizSu samples only) | main: assets.json (live CDN list, 29 540 files) + dev/art/ART_COMPLETENESS.md (stale) | review/* 0 | archive 0.
NO painting done. Sources: game code origin/main a95e8d4 (dev/build/j*.js, BAL jbal.js/jbal2.js), assets.json on the same commit, FIGURE_GATE.md, FOREMAN_C_STATUS.md. Owner rulings applied: no ma ma art (ma ma = older cung nữ); men prompt-only (no proportion gate); c01/c05/c12 a18 consort sets approved.
Age bands: a18 18–25 · a26 26–35 · a36 36–50 · a51 51+ (BAL.ageBand [26,36,51], jbal.js:294).

## 1. TOTALS (images to paint)

Cost basis per the order: ~80 cr/gen × ~1.5 gens = **120 cr per finished image**. Measured so far under the gate: c12 R38 9 figures 1704 cr (≈190 cr/image), W21/W24 ≈83 cr/gen, FP ≈65 cr/gen → real cost may be up to ~1.6× the 120 basis.

Plan A = strict prune (only combos the code can NEVER reach are removed). Plan B = A + "rare-path" prune (combos reachable only by a corner case; the picker falls back to the nearest age band of the SAME tier, j88.js:39-41, so the player sees a slightly younger/older look, never a blank).

| group | faces | images per face A / B | FULL repaint A | FULL repaint B | missing today (never painted) |
|---|---|---|---|---|---|
| Women (32 consort + 52 cung nữ ids) | 84 | 97 / 86 | 8 148 | 7 224 | 671 (B 587): Thái hậu + Nữ đế tiers only |
| Foreign princesses (Nam Chiếu 3 + Bắc Địch 3) | 6 | 77 / 70 | 462 | 420 | 462 / 420 (nothing live; a18 samples on review only) |
| Men (owner list of 72 faces) | 72 | per role, §4 | 654 | 654 | ≈ 300 (new faces + robes, §4) |
| **TOTAL** | 162 | | **9 264** | **8 298** | **≈ 1 430 (B ≈ 1 310)** |
| already done under the gate (subtract) | | | −25 (c01/c05/c12 a18 t1–t8 + c12 Nữ đế a18); in progress −16 (W30 c02 / W31 c03 a18 t1–t8), −4 (W32 Hoàng thượng a18) | | |

Credits at 120 cr/image: full repaint A ≈ **1.11 M cr**, B ≈ **1.00 M cr**; missing-only ≈ **172 k cr** (B ≈ 157 k). At the measured ~190 cr/image: A ≈ 1.76 M, B ≈ 1.58 M, missing-only ≈ 0.27 M.

KEY FINDING: today's CDN already has EVERY woman tier × all 4 bands for all 84 faces (t1–t8, tm0–tm4, ty1–ty8, lãnh cung, kc; ngheo a18) — see §3. So the only true art holes for women are Thái hậu + Nữ đế tiers (and foreign princesses as a whole). A full repaint is ~5–6× the missing-only cost. Recommendation for MAIN/owner: (1) paint the missing tiers + FP + new men faces first; (2) run the free gate measure (dev/art/figure-gate/overlay_m09.py, no credits) over the live women sets and repaint only the figures that FAIL the gate, person by person, instead of a blind full repaint.

## 2. WOMEN — tier × age matrix per face (84 faces) with PRUNE

Tiers per face (owner list): pre-entry kc (thiếu nữ thường) + ngheo (con nhà nghèo); cung nữ ranks tm0 Tân Giả khố / tm1 Cung nữ / tm2 Đại cung nữ / tm3 Chưởng sự cô cô / tm4 Nữ quan (=ma ma dress, j88.js:43-45); consort t1 Đáp ứng … t8 Hoàng hậu; Thái hậu; Nữ đế; trung y ty1–ty8 (per rank); lãnh cung (ONE outfit, not per rank, j66.js:7-8).

✓ = paint · ✗ = PRUNE A (never) · (r) = PRUNE B only (rare path)

| tier | a18 | a26 | a36 | a51 | A | B | why (code) |
|---|---|---|---|---|---|---|---|
| kc | ✓ | ✗ | ✗ | ✗ | 1 | 1 | home road ages 18 → enters at tuyển tú ~20 (jkc.js:15,134; jkc2.js:92-94). kc a26+ on CDN serve only quý nữ wives of princes (jht.js) — keep, don't repaint |
| ngheo | ✓ | ✗ | ✗ | ✗ | 1 | 1 | thd / cnv village girl / Xuân Đào 18–20 only (jkc2.js:106,154) |
| tm0 Tân Giả khố | ✓ | ✓ | ✓ | ✗ | 3 | 3 | maid road ends 30, ma ma ends 45 (j42.js:220-222); no maid road at 51 |
| tm1 Cung nữ | ✓ | ✓ | (r) | (r) | 4 | 2 | maids enter 18–25 (j10.js:55); <rk3 released at 25 (jworld2.js:171-176); a36+ only the close maid (exempt, jworld2.js:176) |
| tm2 Đại cung nữ | ✓ | ✓ | (r) | (r) | 4 | 2 | same as tm1 |
| tm3 Chưởng sự cô cô | ✓ | ✓ | ✓ | ✓ | 4 | 4 | rk≥3 stays; ma ma to 45; staff cô cô 44–49 (jbal.js:237-243) |
| tm4 Nữ quan / ma ma | ✓ | ✓ | ✓ | ✓ | 4 | 4 | rank 4 under a t7/t8 mistress (srkMax, j14.js:33) reachable in ~1.5 yr; ma ma = older maid (owner) |
| t1–t3 | ✓ | ✓ | ✓ | (r) | 12 | 9 | all entries start low; NPCs live to 85 and can stall/demote (j30.js:13, j14.js:26); a51 at t1–t3 = 30 years without rise |
| t4–t7 | ✓ | ✓ | ✓ | ✓ | 16 | 16 | t6/t7 by ~21–23 (promoGap j8.js:358); NPC t5/t6 at start 20–24 (j2.js:15) |
| t8 Hoàng hậu | ✓ | ✓ | ✓ | ✓ | 4 | 4 | NPC HH 20–24 at start / 23–30 from outside (j8.js:436); HH exempt from the age-40 end (j3.js:118) |
| Thái hậu (player/consort face) | (r) | ✓ | ✓ | ✓ | 4 | 3 | only as ending at Emperor's death with son heir / as HH (j3.js:130-132, j99succ.js:57-62); <26 needs the Emperor dead within ~5 years |
| Nữ đế | ✓ | ✓ | ✓ | ✓ | 4 | 4 | needs ≥ Phi at Emperor's death (j99succ.js:42-46); Phi reachable in 14 months; c12 a18 approved |
| ty1–ty3 | ✓ | ✓ | ✓ | (r) | 12 | 9 | trung y = PLAYER only, when her robe slot is empty (jty.js:1-32); 40+ needs a son or HH (j3.js:118) and a son gives +1 rank (j8.js:355) |
| ty4–ty8 | ✓ | ✓ | ✓ | ✓ | 20 | 20 | same; no age limit on nights (j8.js:39-41) |
| lãnh cung | ✓ | ✓ | ✓ | ✓ | 4 | 4 | consorts any age (j14.js:2, j8.js:69-74); Phế phi Lý 34+ (jly.js) |
| **per face** | | | | | **97** | **86** | × 84 = 8 148 / 7 224 |

NPC Thái hậu (mother of the Emperor, 51–62+, j17.js:4-7) is a separate role with its own 3 ids fig-thaihau-h1..h3 (a18–a51 on CDN; only a51 reachable) — not part of the 84. ("Thái hậu 15" 2-ref sheet still waits the owner, STATUS L330.)

## 3. GAP AUDIT — existing CDN art (assets.json, game size img/fig-*)

| set | ids | what exists | gap |
|---|---|---|---|
| consort c01–c32 | 32 | t1–t8, tm0–tm4, ty1–ty8, tcold, kc × a18/a26/a36/a51; ngheo a18 | **Thái hậu tier, Nữ đế tier** (none). Lãnh cung, trung y, pre-entry: complete |
| maid m01–m52 | 52 | base (=tm1), tm0, tm2–tm4, t1–t8, ty1–ty8, cold, kc × 4 bands; ngheo a18 | **Thái hậu, Nữ đế**. Lãnh cung, trung y, pre-entry: complete |
| mama k01–k08 | 8 | base × 4 | owner: not needed (ma ma = older maid) — retire, no new art |
| player look1–4 | 4 | t1 × 4 bands; t2,t3,t4,t6,t8 a18 | legacy; superseded by the 84-face picker (OD:L1448) — no art |
| foreign princess NC/BD | 0 live | samples a18 (BD Đáp ứng/Tần/Phi/Quý phi, NC opt1 ranks) on review/foreign-princess-samples, CDN _review/fp-s5 | everything (§5) |
| hd/ (1800 px) copies | | many maid files lack hd (maid t 1418, ty 975, tm 741, cold/kc 184 each; consort ty 484, kc 93) | upscale job, not painting |

Not verified by eye in this job (no painting/looking ordered): whether existing lãnh cung art is plain/no jewellery, whether ty/older sets still carry hoa điền marks (R5e4 hoa-điền clean-up), and gate pass/fail of existing figures → the free overlay_m09 measure answers this before any repaint.
CODE GAPS for MAIN (no art can fix): (1) no figure tier for player Thái hậu / Nữ đế — she keeps her consort rank figure (j99succ.js:81,152); needs t9/t10 wiring (old claim session_011xDdVShLvZ7X2KBzWPp6Aj stale). (2) Foreign identities need an id pattern (consort:fpnc1..3 / fpbd1..3; pidKeys/f88Src accept only c\d+/m\d+ — reports/foreign-princess-art.md L199).

## 4. MEN — 72 faces (owner list), prompt-only, roles × outfits × reachable ages

Code: every male role has ONE outfit in the picker (figTierOf null for men, j39.js:32; j88.js:47-49); eunuch rank dresses exist but are not wired.

| role | faces (owner) | ages in code → bands | outfits | images | existing on CDN | new faces |
|---|---|---|---|---|---|---|
| Hoàng thượng | 4 | start 19–25, ages yearly, lifespan to 85 (jbal.js:40, jbal2.js:163) → a18–a51 | 1 dragon robe (yellow, or black+gold esp. a51 — FIGURE_GATE F) | 16 | 1–2 ids × 4 (fig-emperor) ; W32 painting 4 × a18 | +2–3 |
| Thái giám | 32 | staff hired 18–62 (j10.js:55); court tq 56–61, ksp 40–49, ped 20–26 (j10.js:18) → a18–a51 | 4 ranks Tiểu TG / TG / Thủ lĩnh / Tổng quản (SRK j14.js:30) | 512 | 30 ids × 4 ranks × 4 bands (rank art not wired) | +2 |
| Quan | 10 | house heads 46–65 (j55.js:16), fathers 46–56, Hoàng thúc 46–53 → **a36, a51 only** (a18/a26 reachable today only because the tm96 lover borrows official faces — moves to the sweetheart faces below) | 1 | 20 | 6 ids × 4 | +4 |
| Vương gia | 4 | pool 27–32 (j22.js:2) → a26–a51 | 1 | 12 | 2 ids × 4 | +2 |
| Thái y | 4 | court 50–57 / repl 40–49; pool 29–34 → a26–a51 | 1 | 12 | physician p1–p3 + man thaiy-1 (4 ids) | 0 |
| Thị vệ | 8 | 20–33, ages yearly → a18–a51 | 1 | 32 | thive 1–4 × 4 | +4 |
| Nhạc sư | 2 | 31–40 → a26–a51 | 1 | 6 | 1 id | +1 |
| Sứ thần | 2 | 34–41 → a26–a51 | 1 | 6 | 2 ids | 0 |
| Họa sư | 2 | 30–39 → a26–a51 | 1 | 6 | 1 id | +1 |
| Người thương thuở nhỏ | 4 | tm96 lover 19–30 at start, ages yearly (j96.js:62) → a18–a51 | his origin role robe "pre" + promoted robe "up" (Viện phán / Cửu môn đề đốc / Thân vương / Đại sứ / higher office, j96.js:223) | 32 | none of his own (borrows role faces; 56 "up" combos never drawn, ART_COMPLETENESS:33) | +4 |
| **total** | **72** | | | **654** (B = A: no safe rare prune for men) | | ≈ 21 new faces |

Men missing-only ≈ new faces × their rows (≈ 21 faces ≈ 150 images) + Emperor bands a26–a51 for the 4 new Emperors (12) + sweetheart up robes (16) + eunuch none ≈ **~300**, assuming existing male art is kept (owner said "Người nam quá xấu" of the proportion samples, not of live art — MAIN to confirm whether live men are repainted; full repaint = 654).
Outside the owner's 72 (exists, no new art asked): công tử 10 + quý tử 9 (suitors/phò mã), Bắc Địch prince 1, huynh 2 (unwired, FIGURES-huynh.json never loaded, jkc.js:128), hoàng tử p01–p24 (a26+ drawn but unused, j73.js:13), steward/tutor.
Wiring for MAIN: eunuch rank dress (j88.js:47-49), sweetheart own faces (TM96V.fid j96.js:16-40), up robes.

## 5. FOREIGN PRINCESSES — 3 Nam Chiếu + 3 Bắc Địch faces

Entry 18–20: NC at Tần (t4), BD at Quý nhân (t3) (j1.js:24); home road enters ~20. HH / TH / Nữ đế not blocked (only Thái hậu favour −15/−20, jbal.js:137). No cung nữ tiers. t1–t3 (NC) / t1–t2 (BD) only via demotion or release from cold (j14.js:8,26) — reachable, kept in A.

| tier | a18 | a26 | a36 | a51 | A | B |
|---|---|---|---|---|---|---|
| pre-entry (own country dress) | ✓ | ✗ | ✗ | ✗ | 1 | 1 |
| t1–t3 | ✓ | ✓ | ✓ | (r) | 12 | 9 |
| t4–t8 | ✓ | ✓ | ✓ | ✓ | 20 | 20 |
| Thái hậu | (r) | ✓ | ✓ | ✓ | 4 | 3 |
| Nữ đế | ✓ | ✓ | ✓ | ✓ | 4 | 4 |
| ty1–ty3 / ty4–ty8 | ✓ | ✓ | ✓ | (r)/✓ | 32 | 29 |
| lãnh cung | ✓ | ✓ | ✓ | ✓ | 4 | 4 |
| **per face** | | | | | **77** | **70** → × 6 = 462 / 420 |

## 6. CREDIT ESTIMATE

| scope | images A | images B | cr @120 (A / B) | cr @190 measured (A / B) |
|---|---|---|---|---|
| Women full repaint (84) | 8 148 | 7 224 | 978 k / 867 k | 1 548 k / 1 373 k |
| Women missing only (TH + Nữ đế) | 671 | 587 | 81 k / 70 k | 127 k / 112 k |
| Foreign princesses (all new) | 462 | 420 | 55 k / 50 k | 88 k / 80 k |
| Men full (72) | 654 | 654 | 78 k / 78 k | 124 k / 124 k |
| Men missing only | ~300 | ~300 | 36 k | 57 k |
| **All full** | 9 264 | 8 298 | **1 112 k / 996 k** | 1 760 k / 1 577 k |
| **All missing only** | ~1 433 | ~1 307 | **172 k / 157 k** | 272 k / 248 k |

Optional extra saver for owner decision (not in A/B): trung y by rank GROUP instead of per rank (low t1–t3 / mid t4–t5 / high t6–t8 = 3 sets instead of 8) saves 20 images per face → −1 680 women + −120 FP images (≈ −216 k cr at 120).

Next step proposed: MAIN shows the owner §1 + §6 and asks: (a) full repaint vs missing-first + gate-measure-then-repaint-fails; (b) Plan A or B prune; (c) trung y per rank or per group. Order of painting after her OK: Thái hậu + Nữ đế tiers (needs MAIN t9/t10 wiring) → FP 6 faces → new men faces → gate-failed repaints.
