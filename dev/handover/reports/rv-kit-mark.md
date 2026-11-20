# rv-kit-mark — VERDICT: PASS 5e8c7ad0 (review/kit-mark-rv)
PRIORITY #1 CHECK: OD 20/11 ~07:15Z (owner OK «n/10» chip + amber clock) + OD ~07:35Z (no board retune; broken grading → C-AG #29 mg-score-same) | main kitGameClock j79, mgPace/mgFast jmgt | review/kit-mark 1c134a6f | claims kit-mark MtjP4KTg.

Branch review/kit-mark-rv = review/kit-mark 1c134a6f + merge origin/main 70bea3d3 (only index.html/sw.js conflicted → rebuilt with dev/site/build_site.sh) + ONE fix. FF over origin/main OK.

## Checks
- ONE kit part kitGameMark (j79) + amber in kitGameClock/kitCoopClock{tone}; KIT.md §13.9 + kit page sample present. Wired once in kitGameSet → all 31 kinds follow. No private chip: kit `.kchip.n` / `.kchip.w`.
- mgFast reads the SAME `lev[kind].fast` as mgPace (ONE CORE) ✔.
- Law check: 4 ONE CORE ✔, 7 wording (number only, no %, no words) ✔, 9 KIT FIRST ✔, 11 whole group (all 31 kinds, table) ✔, 12 devices ✔. No clash with review/mg-noword-kit seen in code (chip sits LEFT of clock in the same `.kph` title line; mg-noword-kit's ring+number inside the clock chip will just replace the chip body — keeper to re-run kit-mark after it lands).
- FIX (data-fault guard, owner no-retune): `kim` lev.kim.fast=[0,0] → window 0 → clock was amber from the first tick. Now amber only when window > 0 (j79 `fw>0`), test + KIT §13.9 updated. No BAL touched.

## Window per kind (share of round × round length, Fold; iPad same ±)
co 0.24×11s≈2.6s | tho 0.10×24≈2.4s | doi 0.20×21≈4.2s | doden 0.10×28≈2.8s | le 0.145×31≈4.5s | tc 0.10×46≈4.6s | xa 0.07×11≈0.8s | thq 0.225×30≈6.8s | kim 0 (→ never amber, guarded).
No window (never amber, 21 kinds): dan hat dauho ban ve hoa theu mua banh huong td_cong td_dung td_ngon td_hanh chai hoadien duho den tat ne kinh may.
Flag for C-AG #29 (not retuned here): xa (Xạ) full-marks window ≈0.8 s of 11 s is very tight; kim window 0 means "fast = no bonus" — decide in mg-score-same.

## Tests (after the fix, on merged build)
- kit-mark Fold 755x1000: PASS, 0 FAIL; iPad 1180x820: PASS, 0 FAIL (all 31 kinds).
- oldsave-r1 (main build save → new build, 3 viewports): 16/16. mg-ready-guide Fold: 9/9. Page errors none.
- Shots LOOKED (Fold co amber + kim): chip «1/10»/«2/10» sits left of the clock in the title line, readable, line not cluttered; Cờ clock gold when past window; Khéo tay clock stays normal after fix. iPad shots were covered by a first-run chest overlay of the test save (title line chip+clock visible but dimmed) — layout same as Fold, one row. Shots kept in session scratch (not git/CDN).
- Not done: quickcheck script not present on this branch (no dev/test/quickcheck.sh); covered by the suites above.
