# rv: kit-opt-title-wrap (bb52274d, keeper #4) — round 1: FAIL (one flaky borderline)
PRIORITY #1 CHECK: OD L1803 (title never squeezed by odds chip), L2133 #49a (odds on the title row); read j79 kitOdFit1 / jopic stack rule; merged LIVE (99795d67) into review/kit-opt-title-wrap-rv (4515b576da9559c0ce83a5339a47c134f40dd41d).
- Good: Fold 755 + iPad 1180 test PASS most runs (real dialogs, widths auto..280, act/pop-maid/staff/rv; every title room >= 7.7 em, <= 3 lines).
- FAIL (law 11, determinism): node dev/test/kit-opt-title-wrap.js <url> <out> is NOT stable. 3 FAILs in 14 runs (also under 4 busy loops), always the same case: 1180 dlg0 w=320 (once 755 dlg0 w=280): «Đưa bạc cho người Nội vụ phủ» [Khá chắc] and «Nhờ người quen nói giúp một lời» [Năm ăn năm thua] «meter on its own row» — the meter wraps under the title with NO .kodstk/.kodrow class, i.e. against OD L2133 #49a (odds on the title row).
- Cause (read): kitOdFit1 decides stk/row from canvas text widths (kitOdTextW) vs room, with exact comparisons (room<natW). When room ≈ natW the canvas says «fits» but the DOM wraps (sub-pixel / hinting), so the flex row breaks the meter to its own line and no class corrects it. The decision is also made once per width change (RO) — no verification against the real layout.
- Required fix (whole group = every button.ka with .kodds): (1) safety margin in the comparison (e.g. room < natW + 4px) and/or (2) after the fit, verify against the DOM: if the .kodds top >= title bottom and no kodstk/kodrow → force the next tier (kodstk, then kodrow); re-verify on document.fonts.ready. Add a loop to the test (run each width 5x or re-fit after fonts) so it cannot pass by luck.
- quickcheck / coop-e2e not run on this round (FAIL first).

## Round 2 — review/kit-opt-title-wrap-r2 486b922a (keeper #4): PASS
PRIORITY #1 CHECK: my r1 FAIL; OD L1803 / L2133 #49a; merged LIVE a201d968 into review/kit-opt-title-wrap-rv2 (3d8e89478942bb13c30d9472c20100b62dbe84be).
- Fix verified by reading + running: 4 px pad, every fit verified on the real layout (meter under title → stack → kodrow) with re-fit 120 ms later (max 3), RO watches the title row, kitOptTier re-fits after its trials, fonts re-fit. Test now REP=5 per dialog/device, measures after 250/0/60/150/400 ms and on the settled layout.
- Stability: kit-opt-title-wrap.js 12 consecutive runs (6 clean, 6 under 4 busy loops) all Fold PASS + iPad PASS (r1 failed 3/14).
- Shots Fold + iPad looked at: titles 2 lines beside the odds meter, meter on the title row, no one-word-per-line; act cards clean.
- quickcheck PASS (core gates), coop-e2e 124/124.
- VERDICT: PASS.
