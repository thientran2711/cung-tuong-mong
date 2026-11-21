# REVIEW dauho-lv5 (BIG, opus) — verdict PASS

PRIORITY #1 CHECK: OD 21/11 ~00:30Z (dauho base = cal round 5, hit circle = vase mouth), OD 20/11 ~07:35Z (fix broken games, she re-tests) + broken-board rule (jbal2 cal comment), OD 21/11 ~00:25Z (cal.redo red buttons), owner wind-word rule (report r1, verbatim) | main LIVE 8c8b8b6b (holds mgcal-redo + batch 4 + dauho 9.7) | review/dauho-lv5 f9ef63d0 (worker session_01Rc5AsJ5ommMCHuv3G9VVPd) | claims row "REVIEW dauho-lv5" = session_01Rc5AsJQhpHN5KD3jnhMy1U.
Reviewer: session_01Rc5AsJQhpHN5KD3jnhMy1U (MAIN CHÍNH 84). START_CTX ≈ 3 %.

## Result
PASS sha = **ceaa99e2** (ceaa99e219e27709d0c96b65e5ed35420df89fdb) on `review/dauho-lv5-rv` (= f9ef63d0 + merge of LIVE origin/main 8c8b8b6b; FF of LIVE).
Commits: e01f57f0 merge LIVE (conflicts resolved) · 2437178e site rebuilt · ceaa99e2 cal-dauho check 4 fix (test only). (HEAD = ceaa99e2; no build-line commit needed)

## Merge (check 5)
- `BAL.ag.mg2.cal`: LIVE line kept (redo map hoadien/den/chai/td_dung/huong/mua/banh + batch-4 k lines mua 8.3, hoadien 8.9, banh 7.3, chai 8.7, den 9.3); added `redo.dauho` + `redo.ban` = **2026-11-21T02:00:00Z** (go-live time; MAIN: bump both if landing is later than ~02:30Z); **ban 9.1 removed from cal.k** (broken-board rule: rings ~2× the painted target).
- **dauho 9.7 (her 11/20 re-test, LIVE f15146ea) KEPT in cal.k** as her base until her re-test on the painted-hole board. Reason: the old mouth zone (d < .21·W_pic) ≈ the painted opening (.2207); the fake part was the ear band at the mouth row (0.5 per throw) + drawing. Her button goes red (redo) so she re-tests; mgcal_apply then replaces 9.7. If MAIN reads the broken-board rule as dropping 9.7 too, it is one edit in jbal2 cal.k (no other change needed).
- `dev/test/mgcal-redo.js`: LIVE code check kept + `ban` added to the not-in-code list; 9 redo kinds; «còn 8 môn».
- index.html / sw.js: rebuilt (assemble.py + build_site.sh), no _aa.html committed.

## Checks
1. Đầu hồ base (law 4/5): `BAL.mgTier.base.dauho {r:5,lo:0,n:8}`; real board rank 0 = gap 2 = ease 1.6 = Thử tay round 5 (measured in my shots: tier d 2, ease 1.6, «Khó»); gap climbs linearly with rank (+big) to ease 0 → harder by rank; all knobs in BAL (one-core PASS). Thử tay / Hướng dẫn pass d → unchanged. Note (not a fail): art level (bậc) no longer eases THIS board (worker's reading of "cho mọi người chơi … level 5"); the other kinds keep the bậc easing. MAIN may confirm with her if she expects bậc to help Đầu hồ.
   Hit holes = painted holes: one judge() for aim sim / solver / flight; mouth opening counts (1 / .7), lip + neck = miss, ear tubes at the painted place = .5; sprite placed by measured BAL.mgArt.dauho; counted arrows drawn standing in the hole. dauho-hole A1–A3 PASS; my Fold + iPad shots: 2–3 arrows in the mouth, 1 in the left ear tube, none beside the vase.
2. Bắn cung rings: zone() = painted rings BAL.mgArt.ban.ring (gold 1 / red .75 / blue .5 / black+paper .25), arrow drawn at true x (no .55 squeeze), ease → picture size lev.ban.size [.7,1] (law 5). dauho-hole B1/B2 PASS; shots: arrows sit in the ring they scored.
3. NPC medK fairness: medK dauho/ban measured rows (n 300/ease); mgMedD(d,kind) keeps the shared level at gap 0 and uses the kind's own shift — NPCs no longer cut 1.7–3.4 on a board that is not harder. Applied in mgNpcRaw (both paths), mgSkipRaw, mgCalBase, jmgid learn — consistent. Wind word line «Gió lặng / Gió ngược|xuôi nhẹ|vừa|mạnh» present (seen «Gió ngược vừa» on both devices), bands in BAL.mgArt.dauho.wind; mg-noword-a allows only that line.
4. KIT (law 9): no new chip/button/frame; canvas uses existing kg82Spr / kg82Lbl / kg82Pop; KIT.md art rows updated. PASS.
5. Merge: above.
6. Gates on the merged tree: dauho-hole 54/54 · mgcal-redo 12/12 · cal-dauho ALL OK (after test fix) · ag-mgcal 0 FAIL · one-core-guard PASS · mg-allkinds 7/7 · mg-noword-a PASS · quickcheck **PASS** (open 1487 ms, old save ok, perf ≈ live, core gates PASS) · coop-e2e (tt/nc) **68/68**.
   cal-dauho check 4 required "no cal.k.dauho" — it FAILS on LIVE 8c8b8b6b too (LIVE added dauho 9.7). Fixed in ceaa99e2: it now checks the NPC curve centre = adult ctr even with cal.k.dauho present (stronger). (cal-dauho check 3 also fails on LIVE; passes on the merged tree.)
   Shots (looked, not in git): Fold 755x1000 + iPad 1180x820 of Đầu hồ (rank 0, 4 throws, wind on) and Bắn cung (4 shots).

## Laws touched
1 n/a · 2 n/a · 3 n/a · 4 PASS (BAL only) · 5 PASS (rank → gap; ban size by ease) · 6 n/a · 7 PASS (words: wind line, «Khó») · 9 PASS · 11 PASS (whole group table: fling/aim/groom/others) · 12 PASS (both devices) · 13 PASS (worker report has the line).

## Notes for MAIN (no action needed for PASS)
- Bump redo.dauho/redo.ban if this lands after ~02:30Z.
- Pre-existing on LIVE: `BAL.orig.id.noSeed` still lists dauho, chai, den, hoadien although their post-fix tries were applied (batch 4 / dauho 9.7) → those re-tests do not seed jmgid. Owner's of the cal line should clear them.
- CDN review media: `python3 dev/site/cdn_sync.py --wipe-review dauho-lv5` after landing.
