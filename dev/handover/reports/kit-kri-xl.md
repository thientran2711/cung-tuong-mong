# KIT-KRI-XL report — review/kit-kri-xl c6e34a53 (base LIVE 5fb13d60)

PRIORITY #1 CHECK: OD/HANDOVER/PROGRESS — K-XL-GROW-SAME only in KIT_REQUESTS 27/11 ~23:40Z + FOREMAN_E_STATUS 23:32Z; K-PICK-GO-REACH = KK61 kk61-pickgo (on LIVE, sticky kipgo) — the ui3 loop is a different root (below) | main: jksize.js kszLivePick3_0 / kszHandFit3 / kszLiveLay3, jend.js:144 ending-screen wrapper, jkring-item.js kriGiftOpen / kriFocus, jts.js PEND.tsgift, j82.js kg82BgName / kg82Veil | review/*: kk62, kk61-*, titles-daycard-lrm4 472960ba (no fix for these 4 roots) | claims: MAIN 182 23:14Z had routed kriFocus + mg-bg to KK63 → told KK63 at start (no overlap reported).
KIT CHECK: reuses kszLiveLay3 frame sizes (KIT §56), kitRingItem (§104), kit result rows (kriResHTML), kg82 board pictures. kit-std-scan REPORT_ONLY (Fold+iPad): FAIL 38 (X02 20 · X06 12 · X08 6) — IDENTICAL on LIVE 5fb13d60, nothing new.

## 1. K-XL-GROW-SAME (jksize.js) — law 10 / OD #47
Root: (a) the iPad XL frame grew to the full height (780) only when its content scrolled, else stayed at the 70 % cap (574) → two figure sizes; (b) data-kgrow stayed on the reused #modal .dlg (a Bàn bài hand set it) and the next pick measured the grown layout; (c) the ending screen (jend.js:144) lays XL directly and never ran the pick, so it simply kept whatever flag was left.
Fix: the height belongs to the SIZE, set in kszLiveLay3 (every path lays a size through it: pick, hand fit, ending screen): on kv2 XL = always the tall frame, every other size never grows; an L whose list / text still scrolls steps up to XL (kept only if it helps); every pick starts with a clean data-kgrow; Fold (kv1) logic unchanged.
| check | LIVE 5fb13d60 | kit-kri-xl | trial lrm4 + kit-kri-xl |
|---|---|---|---|
| dialog-fixed Fold | pass | pass | pass |
| dialog-fixed iPad (f) XL | pass only via stale flag (548/415 without it) | pass 754/621 ×3 | pass 754/621 ×3 (lrm4 alone: FAIL 754 vs 548) |
| fig-col-fill iPad info-long XL | body 466 · fig 416 | body 673 · fig 616 | — |
| fig-col-fill all other frames | — | unchanged, FAIL 0 | — |
NOTE for testers: `dialog-fixed.js -` tests the committed ROOT index.html, not dev/index.html — pass the file:// URL of dev/index.html to test a fresh build.

## 2. K-PICK-GO-REACH still open on ui3 — real root (DOM checked, Fold + iPad)
kri-t.kri-front is NOT an overlay over the picker: the gift picker's #modal is hidden ON PURPOSE (kri-hide) and the item ring IS the picker (front tile at 316,414 124x134 on Fold = the harness point 378,538). The robot tapped the hidden dialog's .opt (harness gap, for F: it must drive the ring: front tile → «Chọn»).
The real player bug: «Biếu quà làm lành» → «Đồ trong rương» / «Tác phẩm» opens tsgiftpick and re-renders the SAME dialog (opener showModal) → new .opts nodes; the ring had captured the old .opts, so «Chọn» clicked a DETACHED button → no chooseM, no gift, picker stays queued → reopens forever (reproduced: inv unchanged, Q still tsgiftpick).
Fix (jkring-item.js): option buttons looked up live; act guarded by picker id. (jts.js) the two piece roads are openers (later + tsOpener) like every other D19 / mend road → no empty «ta không được gì, cũng không mất gì» card (law 3 label≠effect). Failed gift («— bại —», «không thành») never sealed THÀNH.
After: Fold + iPad «Chọn» → gift given (inv −1), Q empty, result rows in place; kit-ring-item.js check Fold + iPad: gift / shop acts OK, 0 errors.
Whole family scan: only kriGiftOpen captured dialog nodes (shop / bag / pet / titles / hd read live or clone) ; jts openers: only line 269 lacked later+tsOpener.

## 3. kriFocus TypeError «reading 'tile'»
Root: kriBack set state "ring" at once but rebuilt the list only after its 380 ms animation; a tap meanwhile focused with the OLD index, then the rebuild (item given / sold) shortened the list → it = undefined. Fix: kriBack busy until rebuilt; kriFocus reads the front index after the snap and guards it/t; kriAct / kriRefresh guard a missing item.

## 4. 404 img/kit/mg-undefined-bg.webp
Root (stack-traced): kg82Open → kg82Veil(d, kind) with no kind (scheme games sgPlay, any frame opened without kind) → kg82BgName(undefined) = "undefined-bg". Fix: kg82BgName / kg82Pic / kg82Img give no picture for no kind (kit silk). Scan: 39 KG82_KIND kinds × hoc/thi → all map to a CDN bg (duho/den → TS_IMG event paintings). After: 0 «undefined» requests.

## Other findings (not fixed, owners)
- gift log mixing: kriAct reads ALL logs since the act → an unrelated «từ chối» line can seal a gift BẠI (seen on Fold). Ring family, later.
- tsGiftPiece «kept» check uses inv.includes(e): a refused piece logged «trả lại …» AND «lòng nàng dịu đi» once (D19 owner).
- KIP_VERB has no tsgiftpick → the ring button says «Chọn», not «Biếu» (jgpick, KK63 picker family).
- .kmov «Chạm để bỏ qua» hint low contrast (E-S5 note) — not touched.

Stills looked at (outside git): /home/user/wt/kri-shots/dfm/{755x1000,1180x820}-*.png, /home/user/wt/kri-shots/p/gift-{755,1180}-{1,2,3}.png.

## Update 28/11 ~01:00Z — head 9e037402
- Merged review/kk62 485e5ee5 into the branch (KK63 warning: kk62 also edits jkring-item.js kriGiftOpen). The conflict was resolved by keeping kk62's receiver name + K-RING-QTY and adding the live option lookup (optB). After the merge: gift probe Fold + iPad gift given · kit-ring-item check Fold + iPad gift/shop OK, 0 errors · dialog-fixed all pass. RV: the branch now carries kk62 (same as the next UI bundle).
- MAIN 182 add-on (Foreman D A3 «~1860 dead buttons», iPad), checked on LIVE 5fb13d60 with real taps:
  - Relation page: relRing (§104.2 wiring E) opens a visible, OPAQUE ring scene (place painting, ✕, group tabs) over the Ân oán page. The 17 (Fold) / 28 (iPad) «covered» buttons («Về Dư đồ», «Lịch tháng», «Mục tiêu chương», right-column rows, «Ân oán», «Phe phái», …) sit BEHIND the painting. A real tap reaches none of them (0/6 click-through) = correct for a modal scene. Not player-dead → HARNESS FALSE POSITIVE (for F: a button under a visible .kscn layer is hidden, not dead).
  - Place stage ring: 0 buttons covered by the band (LIVE and branch; §104.1c tapUnder intact).
  - .mapsc vs #kshR: in the default iPad Dư đồ view, 0 map targets are covered. Pins slide under the fixed right column (#kshR, x≥1025) only after a pan, which is normal and fixable by panning back. Harness item (pan before tapping), not kit.
  - E 23:36Z «re-opened 3× by «Chọn lá này», no gift» ×4 on Fold = the stale-option root fixed in §2.
- (28/11 ~01:10Z) For RV-178: merge-tree vs review/kk63 8df18700 (⊃ kk62) is CLEAN. Trial build (kit-kri-xl 9e037402 + kk63): dialog-fixed all pass on Fold + iPad. Gift probe: chooseM runs and the picker leaves the queue on both runs; one run the receiver refused and returned the piece (item stays). That refusal is also logged «lòng nàng dịu đi», which is the tsGiftPiece «kept» leftover, now with KK64. KIP_VERB tsgiftpick «Biếu» comes from kk62 34cfa07e (already in this branch).
