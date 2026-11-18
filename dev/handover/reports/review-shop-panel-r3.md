# review-shop-panel-r3 (small reviewer, review/shop-panel-r3 @ 13bb8c88)

PRIORITY #1 CHECK: OD L1879 + 18/11 ~18:30Z (1)-(4) + ~18:55Z kind sub-tabs | main kitShop/kitTabRowHTML reused (no new part) | review/* shop-panel-r2 is inside r3 | claims shop-panel-r3 worker.

Base: origin/main 94d11623 is already an ancestor of 13bb8c88 (no merge needed). Built files: assemble.py + build_site.sh give index.html identical except the CTM_BI build line (expected).

## Owner points vs result (Fold 755x1000@2 + iPad 1180x820@2, shots looked at)
1. Gain row only «Sắc +2 · Danh +1», no kind word: PASS (one line on every tile).
2. No figure strip on top: PASS. 3. No «Ta có N bạc»: PASS (Mua|Bán first). 4. Bán price «25 bạc» only: PASS.
5. Kind sub-tabs (kit tab row .pctabs, same part as chest tabs): under Mua|Bán, «Tất cả N» + only kinds present, count each, filter the grid; same in Mua and Bán, Nội vụ phủ + Tư trang; pet shop (one kind) none. PASS.
Long-name tile («Vòng ngọc Hòa Điền», «Son phấn Dương Châu») wraps to 2 lines, no cut; pet tiles ok. Kind row wraps to 2 lines inside the modal (worker note; kit scroll rule is panel-only) - acceptable, no overflow.

## Laws touched
9 KIT FIRST pass (kitShop shared by every caller); 11 whole group pass (3 places scanned); 7 VANPHONG pass (no %, cổ trang); 12 two devices pass; 6c REAL OBJECTS pass (test: buy → chest +1, bạc −50; sell → chest −1, bạc +25; both devices); 4 one core: prices come from IT.pr, no new numbers.

## Tests
- dev/test/shop-panel.js: Fold ALL PASS, iPad ALL PASS, 0 page errors (iPad re-run alone after a harness start error in a 2-size run; not a product fault).
- quickcheck.sh (bash) at 13bb8c88: QUICKCHECK PASS · open 1755 ms · old save ok · core gates PASS · TIME-SPILL PASS.
- Shots dev/handover/shots/shop-panel-r3/ deleted from the handover branch with this verdict.

## Land
Push of 13bb8c88 to main was DENIED by the harness classifier in this session (not worked around). MAIN/coordinator: git push origin 13bb8c88:main (origin/main 94d11623 is its ancestor, FF).

PASS LAND READY 13bb8c8835edce9f874e35be34746fdbe45e9020 (FF from 94d11623)
