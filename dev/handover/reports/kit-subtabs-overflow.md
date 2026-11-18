PRIORITY #1 CHECK ('kitSubTabs overflow'): OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 | archive 0 (brief line; depth 3 session, START_CTX ~1%)

# kit-subtabs-overflow (K-Q2-1) — branch review/kit-subtabs-overflow, sha 9366028 (6aab33a + build commit) (on origin/main 13bb8c88)
WHAT: ONE kit rule in jtabs.js for every kitSubTabs bar (`.pctabs.kcattabs.ktsub`): `flex-wrap:wrap; overflow:visible` — tabs that do not fit one line wrap to a 2nd row at the SAME fixed tab size (law 10), never scroll sideways, never clip; the trailing ⓘ (`.pctinfo`) becomes static and keeps the right end of the last row, so it can never cover a tab (the Q2 6th tab case: 6 tabs ≈ 480px + ⓘ 122px > 564 → ⓘ drops to its own right-aligned row). KIT.md §46 line + kit sample §46.1 (6 tabs + ⓘ) + KIT_REQUESTS row DONE.
Other chip rows (.kcattabs filters, Tư trang kinds) deliberately unchanged (their rule is sideways scroll; out of this request).

SCAN `node dev/test/subtabs-overflow.js <out> fold,ipadAir,ipadPro,pixel,iphone14` (host mode; Fold = 755x1000, iPad 1180x820, Pro 1366x1024 (played at 1180 design), 412/390 narrow = rotated frame):
bars scanned: Tài nghệ (4 tabs), Mệnh truyện palace start (5), Mệnh truyện + simulated 6th «Phụ tuyến» (6), Việc nhờ (3), Ân oán relx (3) / rely (2), kit page samples.
BEFORE: only 1 bar broken — Mệnh truyện 6 tabs at iPad (ipadAir): scrollWidth 602 / clientWidth 564, overflow Y, ⓘ overlap Y. Fold: 6 tabs still fit 618 (n/n). All 5-tab/other bars n/n.
AFTER: all bars on all 5 devices: overflow n, overlap n, no page h-scroll. iPad 6-tab Mệnh truyện: tabs 70-88px (same sizes as before), ⓘ on row 2 right. Scan prints `PASS no overflow, no overlap`.
SHOTS: looked at story6 on iPad 1180x820 and Fold 755x1000 (local scratch /home/user/wt/kit-subtabs-shots/after/); iPad: tabs one row, «ⓘ Luật chương» right-aligned below; Fold: one row, unchanged. Not uploaded to CDN (see FOR MAIN).
TESTS: subtabs-overflow PASS (all bars × 5 devices); QUICKCHECK PASS 306 s (core gates, old save ok, perf render 209/212 ms tab 380/402 ms vs live). Run with bash, not sh.
NOTE: simulated 6th tab via a wrapper in the test (Q2 branch not merged); when questline-q2 lands, re-run the scan, no code change expected.
