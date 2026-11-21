# rv-kit-ghichu-sections — FAIL (one small stacking fault)

PRIORITY #1 CHECK: grepped OWNER_DECISIONS (21/11 ~04:30Z Ghi chú → «!»), CLAIMS, reports (rv-kit-ghichu-bang observation j85.js:169), KIT.md §62.1; reuses kitNoteBang (the one «!» part) and kitPanel; no custom chip.

Branch: review/kit-ghichu-sections-rv = keeper 8e89667d + LIVE bd03747e (FF-contains LIVE), sha dd0e20e907515429ccb8ffe9c96b7bc1d06b584b. kit-ghichu.js PASS (section case + title arg).

FAIL — in the real art-rule modal (v85Table('cam')) on Fold 755x1000 the popup opened by the new «!» on the «Năm bậc» heading sits under the big emotion avatar: the round avatar (.kemo-big, z-index 9990) paints OVER the kit popup (#kpop, z-index 60), hiding the popup title «Ghi chú» and the first line (shot: Fold-art-pop, avatar over the popup's top-left). On iPad the popup lands elsewhere and is fine. Measured: popup rect 271,404 300x140, avatar rect 268,375 66x66; stack path popup kpop[z=60] < kdlg-on vs avatar kemo-big[z=9990].
Pre-existing property (any popup opened over the avatar is covered) but the new heading «!» is the first kit use that puts the popup there on the owner's Fold, so the feature is visibly broken on that device.
Fix (whole family, law 11): raise the ONE kit popup layer above the avatar (#kpop z-index > 9990, e.g. 9995, keep it below toasts/modals) — or hide .kemo-big while a kit popup is open; then scan every kfx/khap popup scene (person card, art rule, Bổng lộc, item card) at Fold+iPad for popup-vs-avatar overlap and show before/after.
Not run after the FAIL: coop-e2e + full quickcheck (stopped). Everything else looked fine: iPad popup «Ghi chú» + Lên bậc rows correct, heading «NĂM BẬC !» drawn, no Ghi chú section left (j85.js:169 only producer).
