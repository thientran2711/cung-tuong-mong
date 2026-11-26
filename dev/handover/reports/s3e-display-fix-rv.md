# s3e-display-fix-rv — BIG review (reviewer, opus)

PRIORITY #1 CHECK ('Công lao 11/10|cấm túc|drowning|chết đuối'): OD 1 | ledger 0 | claims 5 | main 15 | review/* 0 | archive 0 — no other branch on these three bugs; worker reused kitBar (j79), accState (j41/j77), kc3 odds path, BAL.odb.jkc.rlKcElope.

Branch under review: review/s3e-display-fix 290b3bf6, on LIVE 5e013076 (LIVE did not move; no merge needed).
Review branch: review/s3e-display-fix-rv = 7e0cb6c424fab817ab232720577d658071ff46ce (290b3bf6 + reviewer one-core fix aabb619e + rebuild 7e0cb6c4); parent chain reaches LIVE 5e013076, fast-forwardable.

## VERDICT: PASS 7e0cb6c424fab817ab232720577d658071ff46ce

Reviewer fix on the -rv branch (aabb619e): the worker's new j67 line typed «tốn: Sức -20» (one-core-guard G1 FAIL: NEW inline rule number jkc.js Sức -20). Now BAL.eff.jkc.sucKcElope (=-20, jbaleff) feeds both the option cost and the line (balSg). Same value, no behaviour change. Rebuild 7e0cb6c4.

## Laws checked
| law | result |
|---|---|
| 4 one core | PASS. Hard-coded «Danh …/20» → BAL.danhG.srvWed (=20). Survival odds = 100 − BAL.odb.jkc.rlKcElope (kcElopeLive), one source for meter, line and roll. srvMerit cap = srvMpNeed(rk) = (rk+1)*BAL.srvMp (always finite). |
| 6/7 honest odds, cổ trang words | PASS. «Đến bến sông» meter was «Rất vững» over a hidden 25 drowning roll; now the option's own `o` (kc3Od adds A.sc*BAL.kc3.scOdds as for every e-option), kc3Res rolls it once and passes ok to kcElope(false,ok): meter word = outcome roll. Line «Vững · tốn: Sức -20 · thành: thoát chết, bị người nhà kéo về · kết: Bị ép chia lìa · hỏng: chết đuối giữa sông» — no %, words only; old false «thành: đi theo chàng» removed. Old jkc tmtron card: same BAL chance rolled inside kcElope (ok==null) and its j67 line shows word(kcElopeLive()). |
| 11 whole family | PASS. kitNeed applied at 25 callers (table in worker report). My own scan of every `${a}/${b}` template in dev/build/j*.js: remaining ones are counters/caps (Hồi, trang, Môn, seats, quotas, dates, stat/cap) or already Math.min-clamped (j70 chuẩn bị, jdh2 Chép kinh / Danh thêm) or only shown while below need (jdh2:65 Sủng/Danh, jkc/jkiep «mới x/y tháng»). Map self-state: one mapSelfWhy feeds plan (j27), list (j25) and both accState copies (j41, j77 override). scan-sure-death.py: TOTAL 0. |
| 9 kit first | PASS. No new CSS/frame; kitNeed registered in KIT.md and used by kitBar itself; map uses existing mmeta/mchip. |
| 3 gain-and-loss | DESIGN FINDING FOR MAIN (not blocking, pre-existing, not created by this fix): «Đến bến sông» is cost-only — thành = she survives but is dragged home (kgt −BAL.eff.jkc.kgtKcElope, kld +30, his tình −30, tm96.h −20); hỏng = death. The only real elope is the rare ✦ card. Under law 3 it needs a gain (e.g. something kept from the attempt) or it should be shown as the plain «lose» road it is. Owner ruling needed via MAIN (feature freeze / law 16), do not change in this branch. |
| behaviour | srvMerit cap is behaviour-neutral: srvMonth (j42:287–290) promotes at mp>=need or clamps to need anyway; promotions reset mp=0. Old saves with mp>need just display need/need. |
| co-op canon | untouched (no jco*/coop files in the diff). |

## Tests (reviewer-run, rebuilt index.html)
- build_site.sh: built, img-allowlist OK.
- node dev/test/s3e-display-fix.js index.html 755x1000: ALL PASS, 0 page errors.
- node dev/test/s3e-display-fix.js index.html 1180x820: ALL PASS, 0 page errors.
- python3 dev/test/scan-sure-death.py: TOTAL 0.
- dev/tools/quickcheck.sh (run alone), first on 290b3bf6: NOT BUILT (expected, sources only) + G1 one-core-guard FAIL «jkc.js Sức -20» → fixed above.
- quickcheck on 7e0cb6c4: built OK, G1 PASS, open 2276 ms, old save from LIVE loads + plays a buổi (0 errors). Remaining FAILs are NOT from this branch:
  - G4 90-button-crawl «Ô lưu · Lui · close button did not close its layer» (Fold): reproduced on LIVE 5e013076 _old.html 2/2 runs, same fault, same text; branch 2/2 identical. Pre-existing — for MAIN/Foreman to file (button-crawl-known.txt or a fix worker).
  - perf buổi 4580 vs live 1919 ms: noise; the first quickcheck run gave new 2287 vs live 4101 ms (the branch only changes display strings + one Math.min).
- Shots looked at (scratch, not in git): b-map-confined Fold+iPad (only her palace «Ta + N bóng · đang cấm túc (còn 1 tháng)», every other spot locked with its own count; Ngoại triều keeps its own «cấm nữ quyền bước vào»), b-map-out Fold+iPad (only Trường Môn viện «đang ở lãnh cung»), a-congLao Fold+iPad (Xét phẩm «Công lao 10/10», side panel 10/10, no overflow, no cut text).

## Minor notes (no action required)
- Xét phẩm shows «Chủ tin 35/35» while the HUD shows Chủ tin 41/43: this is the kitNeed rule as registered (met need reads need/need); consistent everywhere.
