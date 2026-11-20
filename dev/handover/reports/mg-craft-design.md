# REPORT mg-craft-design (E24, opus) — STEP 1 DESIGN READY
PRIORITY #1 CHECK ('Thêu|Cắm hoa|Khéo tay|pattern engine|trace|Chép kinh|craft'): OD 28 | ledger 0 | claims 8 | main 15 | review/* 0 | archive 77
Branch review/mg-craft-design @ 54ad4544 (from origin/main 70bea3d3; docs only: dev/design/MG_CRAFTS.md). No code, no BAL change.

## What
- §EXPERT (law 8): Su embroidery shading (套針) + rhythm; Xie He 經營位置, Guo Xi 三遠, 墨分五色, 留白; Ming flower manuals (瓶史/瓶花譜) + ikebana shin/soe/hikae cut-and-lean; Qixi 乞巧 + paper-cut 剪紙 (UNESCO 2009). Sources listed in the page.
- One page per kind, each = loop in 3 lines, touches, score onto the SAME cal key / kG / kAdj / hand band / mgPace / mgNpcRaw (law 4), named lever knobs `BAL.mgTier.lev.<kind>.*` [ease0, ease5] (law 5), no words in play, kit reuse, kit/art requests:
  - Thêu `theu` = «Thêu lướt sắc»: pick the spool shade of the lit band, then tap when the bobbing needle meets the lit dot (beat).
  - Vẽ `ve` = «Thủy mặc»: drag motifs to match the master's sample (three distances), hold on the inkstone to load the right tone, flick the wash. No tracing.
  - Cắm hoa `hoa` = «Chọn mùa · cắt cành · nghiêng thế»: pick the season's flower, swipe-cut to vase-ratio length, set the lean.
  - Khéo tay `kim` = «Cắt hoa giấy»: drop cutter shapes on a folded wedge, unfold, match the sample (2→4→8 folds).
- KIT REQUEST (to file at build time): KG82_DEMO "cut" motion + kgTut step word «cắt» (Cắm hoa). ART REQUESTS (Foreman C) listed per page.

## ⚠ FINDING for FOREMAN E / MAIN (law 13 evidence)
The OD 08:15Z CHECK read the stale j82.js:25-28 table. LIVE engines (j91.js:316-326, jnwp.js:167, jwkg.js:27-29, jtd.js:16): Vẽ = trace, Thơ = calli trace, May áo = trace, Công td_cong = thread+trace, Chép kinh = trace; Cắm hoa = arrange (rings), Khéo tay = untangle, Thêu = memory cells. So her "4 đồ nét games" are most likely **Vẽ, Thơ, May áo, Công**. This design fixes Vẽ; Thơ / May áo / Công would STILL trace after it, against her rule "tracing for ONE kind only". MG_CRAFTS.md §5 gives short designs (Thơ = 永字八法 stroke-gesture flicks on the beat; May áo = lay pattern pieces on silk; Công = reuse the new Thêu board or MAIN rule). Those files belong to mg-noword-b today — not touched. Needs an order from FOREMAN E / MAIN.

## Mockups (law 12) — Fold 755x1000 + iPad 1180x820, each looked at (ve and kim re-drawn after first look: inkstone and scissors were clipped)
CDN upload refused: `cdn_sync.py` → HTTP 401 Authentication error. Fallback (root44-common): handover branch dev/handover/shots/mg-craft-design/
theu-fold.webp theu-ipad.webp · ve-fold.webp ve-ipad.webp · hoa-fold.webp hoa-ipad.webp · kim-fold.webp kim-ipad.webp
Plain sketches: grey/gold = existing kit frame parts (seal, title, clock chip, ?/✓ signs); board = sketch of the new play; a dashed caption band (not in the game) explains in Vietnamese. Delete this folder with the verdict.

## Coordination
Read briefs mg-noword-a/b, mg-visual, mg-score-same, mg-play2: no file touched; new boards use mg-visual's kg82Spr/kg82Cue + mgFx, mg-noword rule (no words), kgReady/kgTut, kitGameVs. After build: Thử tay re-test of theu/ve/hoa/kim (cal values void for the new boards).

## Next (STEP 2, after owner OK): build the 4 engines on review/mg-craft (KG82 contract kept), BAL lev knobs, scan old untangle/pattern callers, tests (ag-mgcal, mg-ready-guide), Fold+iPad shots.
