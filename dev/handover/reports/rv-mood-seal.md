# REVIEW mood-seal-rv (sonnet reviewer, MAIN CHÍNH 86, 21/11) — PASS
PRIORITY #1 CHECK: OD 21/11 ~03:35Z (mark #39) | main LIVE 56ff0db0 | review/mood-seal 62f4b11e (base b1033eb0) | claims row session_01Rc5AsNSULxyLkcFZCVytcA | only emoBoxArt (jevb) ever sets a headArt/kitSceneArt mark, so the change can only touch mood frames.

Branch review/mood-seal-rv @ 607a6b12 = review/mood-seal 62f4b11e + merge origin/main 56ff0db0 (index/sw taken from main, rebuilt: assemble.py + build_site.sh, no conflict markers). Fast-forward of main.

## Laws touched
- Law 9 (no new style): only existing kit part kitSceneArt o.mark (KIT 28.19b); kszPic3/kszLiveMark3 add no CSS. OK.
- Law 11 (whole group): other kitFrameLive3 pictures: kszLiveMark3 returns a mark only if the dialog band has .ksart-mark or headArt.mark; the only producer is emoBoxArt (mood) → no stray marks on other frames, no lost marks (before the fix the live rebuild dropped them). OK.

## Checks
- mood-seal-scan.js (Fold 755x1000, iPad 1180x820): all 10 cases (queen no-cause / tấn phong / thị tẩm / event record / unknown / me / emperor / Thái hậu / rival / "servant") show cause picture + seal, markIn true, 46–86 px, dialog fits, 0 page errors. Note: the "servant" case falls back to the queen (no S.ser in the generated save) — maid/servant frames use the same path (kitFrameLive3), not separately exercised.
- LOOKED 3× (Fold emperor, Fold me, iPad Thái hậu; iPad no-cause shot is hidden by the title overlay, seal read from the printed mark fields): picture + round seal in the picture's top-right, no overlap with text.
- quickcheck 607a6b12: PASS (226 s; open 1693 ms; old save ok; perf render 271/247, tab 498/468, buổi 1880/1340, tasks>200ms 22/23; core gates PASS).
- coop-e2e (COOP_A_ORIGIN=tt COOP_B_ORIGIN=nc): 92/92 passed.
- dev/test/mood-dialog.js: crashes on origin/main 56ff0db0 too (page.evaluate error on the "unknown" case) → PRE-EXISTING, not fixed (mood-seal-scan.js replaces it).

Shots: scratch only, not in git/CDN. ~100% xong / ~100% chơi được (this item).
