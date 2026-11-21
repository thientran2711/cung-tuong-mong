# rv-kit-ghichu-sections — FAIL (one small stacking fault)

PRIORITY #1 CHECK: grepped OWNER_DECISIONS (21/11 ~04:30Z Ghi chú → «!»), CLAIMS, reports (rv-kit-ghichu-bang observation j85.js:169), KIT.md §62.1; reuses kitNoteBang (the one «!» part) and kitPanel; no custom chip.

Branch: review/kit-ghichu-sections-rv = keeper 8e89667d + LIVE bd03747e (FF-contains LIVE), sha dd0e20e907515429ccb8ffe9c96b7bc1d06b584b. kit-ghichu.js PASS (section case + title arg).

FAIL — in the real art-rule modal (v85Table('cam')) on Fold 755x1000 the popup opened by the new «!» on the «Năm bậc» heading sits under the big emotion avatar: the round avatar (.kemo-big, z-index 9990) paints OVER the kit popup (#kpop, z-index 60), hiding the popup title «Ghi chú» and the first line (shot: Fold-art-pop, avatar over the popup's top-left). On iPad the popup lands elsewhere and is fine. Measured: popup rect 271,404 300x140, avatar rect 268,375 66x66; stack path popup kpop[z=60] < kdlg-on vs avatar kemo-big[z=9990].
Pre-existing property (any popup opened over the avatar is covered) but the new heading «!» is the first kit use that puts the popup there on the owner's Fold, so the feature is visibly broken on that device.
Fix (whole family, law 11): raise the ONE kit popup layer above the avatar (#kpop z-index > 9990, e.g. 9995, keep it below toasts/modals) — or hide .kemo-big while a kit popup is open; then scan every kfx/khap popup scene (person card, art rule, Bổng lộc, item card) at Fold+iPad for popup-vs-avatar overlap and show before/after.
Not run after the FAIL: coop-e2e + full quickcheck (stopped). Everything else looked fine: iPad popup «Ghi chú» + Lên bậc rows correct, heading «NĂM BẬC !» drawn, no Ghi chú section left (j85.js:169 only producer).

## Round 2 — PASS

Keeper fix b6261240 (.kpop z-index 60 → 9995, KIT.md §62.2, new dev/test/kit-popup-layer.js) + LIVE 177a1931 merged (index/sw rebuilt) = review/kit-ghichu-sections-rv2 sha cfde1cc4ff63488d1839e9138508e2615e0da871.
- kit-popup-layer.js PASS (755x1000 + 1180x820: art-rule, note-bang, tap-word, fact-tap — #kpop topmost at centre + 4 corners); kit-ghichu.js PASS.
- Looked at the real art-rule modal on Fold: popup «Ghi chú» + Lên bậc rows now fully above the big emotion avatar, title readable (before: avatar covered title/first line). iPad was already fine.
- z audit: popups above all picture/modal layers (kemo-big 9990/9991, .kidfl 9470, #modal.krkp 9100, #ktut 9300, #coopfz 9500); still below the 9998–9999 effect layers and the 100000+ zoom/info layers, so full-screen decorations and zoom stay on top.
- Older owner rules on the same element (MAIN 88 standing rule): popup placement/colour/size untouched; only the layer changed.
- coop-e2e 92/92. QUICKCHECK PASS 248 s (render 289/262, tab 546/567, buổi 1431/1690, core gates PASS, old save ok).
