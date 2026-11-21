# dauho-lv5 — Đầu hồ base board = Thử tay round 5; scoring holes = the painted vase (+ Bắn cung, whole group)

PRIORITY #1 CHECK: OD 20/11 ~05:40Z (Đầu hồ too hard), ~08:30Z cal-p2 b218d1d2 (aid/mouth/pull) | main dev/build/jbal2.js kAdj.dauho 1.2, lev.dauho, cal (no dauho), BAL.orig.id.noSeed; j91 k91Fling, j82 kg82Aim | review/mgcal-redo cc50a8ee (cal.redo, NOT on main yet — reused: merged into this branch, fast-forward) | claims none. Reused: mgTier/mgLev levers, cal.d rounds, cal.redo, mg-bots.js, cal-dauho test.

Branch `review/dauho-lv5` = origin/main b1033eb0 + review/mgcal-redo cc50a8ee + 16e41a99 (code) + a3cf3eaf (build_site). **Depends on mgcal-redo** (it contains it; review both together or mgcal-redo first).

Owner bug (verbatim, 21/11, Fold, «Thử tay: Đầu hồ · hồi 5/5», 9/10): "Cái game mà ném bình này nè, tôi nghĩ rằng là để cái mức độ mà cho mọi người chơi á, là ở cái level 5, cái hồi 5 mà bạn đang test tôi á, thấy nó hợp lý hơn á. Với lại là cái vòng, hình như bạn cho cái vòng của cái mũi tên này nó vô cái bình nó to quá, cho nên có một cái mũi tên nó nằm ở ngoài nhìn nó bị giả đó. Mình thu lại cho ngay đúng cái bình đi. Tại vì hiện tại là giờ bạn đã cho tôi cái like, cái đường hướng dẫn nó dài hơn rồi cho nên dễ chơi lắm."

## 1. Difficulty (law 4 one core, law 5 harder as she climbs)
- `BAL.mgTier.base={dauho:{r:5,lo:0,n:8}}`; `jmgt mgTier`: when no fixed gap `o.d` is passed (contests, exams, lessons, jts, NPC hands via mgNpcTier, co-op), Đầu hồ's gap = Thử tay round r's gap (`BAL.ag.mg2.cal.d[4]` = 2) at rank 0 **for everyone** (no art-level / occasion discount: one board for all), then climbs linearly with rank (+big contest = one more step) to the gap of ease `lo`=0 at n=8 steps (rank 7 + big). Ease: rank 0 = 1.6 (= round 5 exactly, test A0), rank 2 = 1.2, rank 4 = 0.8, rank 7 = 0.2, rank 7 big = 0. Every rank moves the levers (aid dots, mouth, pull); the old curve went flat at ease 0 from rank ~4.
- Thử tay (jmgcal, passes d) keeps its 5 rounds; «Hướng dẫn» (passes d) unchanged. Aim guide line (lev.dauho.aid) unchanged; at the base it is 1.05 s of dots as in round 5.
- Note for reviewer: intro word for Đầu hồ is always «Khó» (gap ≥ band 1.5), the same word round 5 shows. Display "tài nghệ bậc N" still shown; her art level no longer eases this one board (owner: one level for everyone).

## 2. Hit zone = the painted holes (measured on mg-dauho-pot.webp 290x560)
Measured (native px → share of picture width, in `BAL.mgArt.dauho`): mouth opening centre y 12 (.0414), half-width 64 (.2207), half-height 6.5 (.0224); outer lip half-width 80.5 (.2776); neck profile [[.069,.276],[.152,.2],[.345,.165],[.455,.162]]; ear tubes centre ±95.5 (.329) at y 125 (.431), opening half-width 19 (.0655).
j91 `k91Fling` rewritten around ONE `judge()` (aim dots, solver, real flight):
- crossing the mouth plane inside the opening → 1 (centre half) / 0.7; on the lip → **miss**; into the neck between lip and ears → **miss**; beside the vase → flies on, an ear tube opening at its PAINTED place (lower than the mouth) → 0.5 «Vào tai bình».
- The vase sprite is placed so its painted opening sits exactly on the judged circle (test A1: painted lip run = judge rim within 1 px on both devices; ear tubes within 0.5 px).
- A counted arrow is drawn standing in its hole (passes through its landing point, tip sunk, tail lean ≤ 0.15 rad, clipped behind the near lip). Test A3: its visible pixels stay inside the lip columns / ear tube, never below the near edge.

### Whole group scan (law 11) — every "drawn target + hit" engine
| engine (kind) | before | after |
|---|---|---|
| fling (dauho) | mouth zone d<0.21·W_pic ≈ painted .22 ok; **ear zone at the MOUTH row** 1.15–2.05 R (empty air beside the neck, painted ears are .39 W_pic lower) = fake hits; lip and neck not solid (an arrow passed through the neck into the far ear); stuck arrows drawn along the flight angle from MY+.4R → shafts outside the mouth (her shot) | holes = painted holes; lip/neck = miss; stuck arrows in the hole |
| aim (ban) | counted zone .55·A·(1+.06e)·tol(e) = .209·W·1.3 ≈ **146–190 px** vs painted target radius ≈ 89 px (Fold) → ~2× the target; shots drawn at **0.55× their real offset** to hide it | rings = painted rings (gold 1 / red .75 / blue .5 / black+paper .25 / outside 0; `BAL.mgArt.ban`), arrow drawn at true x; ease → picture size (`lev.ban.size [.7,1]` of `fit .6·H`) |
| aim pot branch (dauho on kg82Aim) | dead code (j91 overrides KG82_KIND.dauho), own fake squeeze .35× | removed: a dauho call goes to KG82_ENG.fling |
| groom (chai) | green band drawn = scored band | unchanged (honest) |
| lamp / tssteer / hoadien / slapbar | no circular target with a hit radius (band/placement engines) | not in scope |

## 3. NPC hands / median (n = 300 per ease, skilled bot, dev/measure/mg-bots.js)
| kind ease | before mean | after mean |
|---|---|---|
| dauho e0 | 9.08 | 9.08 |
| dauho e0.8 | 9.57 | 9.56 |
| dauho e1.6 (base) | 9.59 | 9.61 |
| dauho e3.2 | 9.67 | 9.64 |
| dauho e4.8 / e5 | 9.69 (e5) | 9.70 / 9.64 |
| ban e0 | 4.26 | 5.38 |
| ban e0.8 | 5.18 | 5.60 |
| ban e1.6 | 5.62 | 5.88 |
| ban e3.2 | 6.93 | 6.06 |
| ban e5 (matching, kAdj 3) | 7.82 | 6.60 |
- Problem found: NPC rolls, her Thử tay base and her rolling hand all shift by the SHARED rows `BAL.ag.mg2.med` (−1.7 per 2 gaps). On Đầu hồ the board plays almost flat (−0.03 at the base, −0.56 at the top), so with base gap 2 every NPC would have been cut 1.7–3.4 below a board that is not harder → unfair to them.
- Fix: `BAL.ag.mg2.medK[kind]` = measured rows (dauho, ban); `mgMedD(d,kind)` keeps the shared level at gap 0 and moves by the kind's own shift; passed through mgNpcRaw (both paths), mgSkipRaw, jmgcal mgCalBase(raws,ds,kind), jmgid learn. Other kinds unchanged (no medK).
- NPC Đầu hồ hands (10 consorts × 10 rolls, occ hoi): before r0/r2/r4/r7 = 6.22/5.29/4.55/3.29; after = 5.84/5.89/5.92/5.64 (curve ctr 7 hand model; rank gives a small drop, as the board).
- Bắn cung gets harder at the matching board (7.8 → 6.6) — in line with the child-anchor finding (ban too easy, OD 20/11).
- Her records: Đầu hồ — her 21/11 try was on the lying mouth → `cal.redo.dauho = 2026-11-21T01:00:00Z` (Thử tay button red again). Bắn cung — her 9.1 (11/19/2026) was on rings ~2× the target → dropped from `cal.k` per the existing rule ("a first try taken on a BROKEN board is dropped when that board is fixed"), `cal.redo.ban` same time. **Main: bump the two redo times to the go-live time if this ships later.** `BAL.orig.id.noSeed` still lists dauho (unchanged) — remove it when her re-test is applied, else her new dauho try won't seed.

## 4. Tests
- NEW `dev/test/dauho-hole.js` (Fold 755x1000 + iPad 1180x820, real CDN art): **54/54** (A0 base = round 5; A1 painted lip/top/ears = judge; A2 centre/±0.9R in, ±1.1R lip miss, far miss, left ear 0.5, old ear band not scored, nothing through the neck; A3 counted arrows drawn inside; B1 painted ring edges = BAL ring; B2 each ring's q, drawn at true x; no errors).
- `ag-mgcal` 0 FAIL; `mgcal-redo` 10/10 (updated: 9 redo kinds, «còn 8 môn», after-time derived); `cal-dauho` 10/10 (updated: kg82Aim now reads BAL.mgArt.ban, ban ease table still byte-identical; check 3 = not harder than base); `ag-mg2` 2 FAIL — **the same 2 FAIL on base main b1033eb0** (summons co/dan, exam no-sure-pass), unrelated.
- one-core-guard PASS; `quickcheck.sh` **PASS** (open 1692 ms, old save ok, perf ≈ live, core gates PASS); `coop-e2e` (COOP_A_ORIGIN=tt COOP_B_ORIGIN=nc) **68/68**.
- Two-seat Đầu hồ: co-op has no shared two-seat Đầu hồ play (each seat plays her own contests; NPC rows read the host person via mgRefP); the board is a pure function of kind + rank (no art level now), so both seats get the same board at the same rank.
- Video (looked at, both devices): CDN `img/_review/dauho-lv5/dauho-lv5-fold.mp4`, `dauho-lv5-ipad.mp4` (6 throws: centre, inside edge, lip miss, left ear, centre, far miss; then a Bắn cung round), stills `s-fold-0.3.png`, `s-ipad-0.3.png` (3 arrows in the mouth, 1 in the left ear, misses not drawn). Verdict giver wipes: `python3 dev/site/cdn_sync.py --wipe-review dauho-lv5`.

## Files
dev/build/jbal2.js (mgTier.base, mgArt, lev.ban.size, mg2.medK, cal.redo/k), jmgt.js (mgTier base gap, mgMedP/mgMedD kind), j91.js (k91Fling), j82.js (kg82Aim), jmgcal.js, jmgid.js; dev/kit/KIT.md (art rows); tests dauho-hole (new), cal-dauho, mgcal-redo; index.html/sw.js rebuilt.

## r1 (MAIN 82 add, owner verbatim: "Ở phía bên cái trò ném tên trong vô bình cũng vậy, hồi trước nó còn có cái dòng chữ hướng gió á. Bây giờ không có cái dòng chữ ... cái nào cần thiết có chữ thì để chữ ... những cái hướng dẫn cần chữ thì vẫn phải có chứ.")
- 7bb74ab9 + f9ef63d0: the wind word line restored exactly as before mg-noword-a cfa9156c cut it: «Gió lặng» / «Gió ngược|xuôi nhẹ|vừa|mạnh» (top-left, above the wind arrow); bands now in `BAL.mgArt.dauho.wind [.05,.35,.7]` (were typed).
- `mg-noword-a` allows only that line (regex) — all other kinds still no text; PASS. `dauho-hole` 54/54 ×3 (vase spot fixed in the test; one earlier random-spot flake removed). one-core PASS, quickcheck PASS (f9ef63d0).
- Shots (looked at): CDN img/_review/dauho-lv5/wind-fold.png, wind-ipad.png («Gió ngược vừa», readable on both).
READY sha: **f9ef63d0**.

~Handover: none needed (done).
