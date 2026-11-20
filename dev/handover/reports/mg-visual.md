# mg-visual — PARTIAL (branch review/mg-visual, worker report)
PRIORITY #1 CHECK: OD:L1264 + OD 20/11 ~05:10Z | main none (no BAL.mgFx) | review/* none | claims none.

## Done (pushed)
- A. BAL.mgFx (jbal2.js) = one source: pop 1.24, ms 300, glow #fff0a0, ring white, blur 44, 3 glow passes. kg82Spr (j82) reads it: every sprite with `glow` gets the stacked glow, `ring:true` adds the bright ring; kg82FxPop = pop curve.
  Engines switched: Múa (mua-mat: lit ring + 1.08 → 1.24 pop, press pop 180 → 300 ms), Khéo tay knot (1.35/1.18 → 1.24 ratio), Hát lotus, Cắm hoa branch glow (stronger). 
- B. Nấu ăn: recipe list = painted ingredients + flame icons, tiles picture-only, gauge/pot labels, pops (★ ✗ ▲ ▼), Quạt lửa button = flame picture. Scan: cook shows 0 words.
- Test dev/test/mg-visual.js (A values + per-kind word scan).

## NOT done (needs more workers / time)
Scan (755x1000) words still shown in play — kind | words:
dan Cung/Thương/Giốc/Chủy/Trượt · hat hint line + lyric words · co Gợi ý · dauho Gió lặng/hint · ve CHỮ NHÂN · hoa TRĂNG KHUYẾT · kim "Chỗ chỉ chéo: 4" · mua 4 move labels + "bước 1 trên 4" · huong all labels · td_cong/td_dung/td_ngon/td_hanh (ma ma hints, labels) · chai tiers · le/tc/xa/thq/hoadien/duho/den/tat/ne/kinh/may (titles, hints, labels).
Several "CÁCH CHƠI" rows in the scan are the rules page (test does not yet skip every rules class) — test needs tightening before it gates.
Not done: lit cue on lamp/go/aim/rhythm/pattern cells; quickcheck, mg-ready-guide, Fold+iPad shots, merge of newest main.
Not "SẴN SÀNG KIỂM" yet.
