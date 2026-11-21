# mood-seal report (sonnet worker, MAIN CHÍNH 85, OWNER mark #39, 21/11)
PRIORITY #1 CHECK: OD 0 earlier | main jemoseal/jemo/jemocause + jk2b kitSceneArt o.mark (KIT 28.19b) + jevb emoBoxArt (mark already built) | review/* none | claims row mood-seal (this session).

Branch review/mood-seal @ 62f4b11e (fix 30fa26a2 + scan test), base main b1033eb0. NO new style: existing kit part kitSceneArt o.mark (KIT 28.19b) only.

## Root cause
emoBoxArt gave the dialog a headArt {src, mark, markAlt}; the first band showed the seal, but the live size-kit frame (jksize.js kitFrameLive3) REBUILDS the picture through kszPic3(src,cls) from the bare src and dropped the mark. So every Tâm trạng · X frame (all but the "me" one) lost the corner seal.

## Fix (dev/build/jksize.js)
- kszPic3(src,cls,mk): passes {mark,markAlt} to kitSceneArt.
- kszLiveMark3(m,mb): reads the seal from the dialog's own band (.ksart-mark) else m.headArt; kept in dlg.__ksz3.mk; all live rebuild calls (S/M/L/XL, narrow, person-less) and spec frames (sp.mk) pass it.

## Whole group scan (law 11) — dev/test/mood-seal-scan.js, before = main index.html, after = this build
Case (Tâm trạng · X) | Fold 755x1000 before → after | iPad 1180x820 before → after
queen, no cause (Bình thản) | none → seal | none → seal
queen, cause tấn phong / thị tẩm / event record / unknown-ish | none → seal | none → seal
emperor (Hoàng thượng, men) | none → seal (emo-m-gian) | none → seal
Thái hậu | none → seal | none → seal
rival (Quý phi) | none → seal | none → seal
me (Ta, mood bar) | seal → seal (unchanged) | seal → seal
All "after" rows: seal inside the picture's corner (markIn true), 57–88 px, dialog fits screen, 0 page errors.
LOOKED 3×: Fold emperor + Bình thản queen, iPad Thái hậu + Bình thản queen: picture + round seal top-right, no overlap with text.

## Tests
quickcheck 30fa26a2: PASS (core gates, time-spill, old save, perf equal to live).
coop-e2e (COOP_A_ORIGIN=tt COOP_B_ORIGIN=nc): 68/68 passed.
dev/test/mood-dialog.js crashes on its "unknown" case on main already (kitEmotion null) — pre-existing, not touched; new scan replaces it for this check.
Note: a seal in a very short strip (min-height ~46 px) uses the existing kit clamp (46 px min); looked fine on both devices.

~100% xong / ~100% chơi được (this item).
