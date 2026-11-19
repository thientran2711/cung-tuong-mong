# review-ev-pic-fig — BIG REVIEW · VERDICT: PASS LAND READY 6ba8e256
(committed by MAIN ROOT-65 for rv session_01Rc5AsMDVid7pMws13KWPgr, which has no push; text as sent)
PRIORITY #1 CHECK: OD 19/11 ~04:15Z + ~04:55Z (read verbatim) | main KIT §56.6 / kszEvLaw10 / kszPicStep3 (jksize.js) | review/ev-pic-fig only | claims ev-pic-fig (worker session_01Rc5AsLHx5NBHb8tkZaoLUU).
Reviewed sha 6ba8e256 = 946a2900 + worker r1 739bfdf3 (coverage gates M/L/XL only) + final merges of LIVE 2c5dd554 and then 98f9f0f1. Independent merge of 98f9f0f1 gives an identical tree.

## Laws touched
- KIT FIRST: OK. Only the shared kit changed: jksize.js (kszEvStrip3, kszFigFill3, a strip floor in kszPicStep3, kszEvLaw10 never hides), KIT.md 56.6 overwritten in place, new 56.17. No private CSS, no per-dialog size.
- WHOLE GROUP: OK. ev-pic-coverage (every PEND event + Q kinds, Fold + iPad) and fig-col-fill-scan (every frame kind with a figure column); before/after table in the worker report.
- Owner 04:55Z scope: OK. 739bfdf3 gates M/L/XL only; S = pres "one" (portrait or left event picture, never .kszfig); 0 S event frames changed, 0 S frames with a full-body figure.
- ONE CORE / VANPHONG: not touched.

## Gates (on the 98f9f0f1 merge)
- quickcheck vs LIVE 98f9f0f1 (--cpu 4): PASS 148 s, old save ok, render 165/180, tab 332/353, buổi 1097/986 ms, tasks>200ms 16/17.
- ev-pic-coverage rc 0: 255 M/L/XL frames, all 255 show their picture, 0 hidden.
- fig-col-fill-scan: 0 FAIL (night1 Fold .882 / iPad .837; e68snowDay .826/.778; tt3 .839; info-long .908/.873; M .88).
- fullbody-frames-scan, figure-head-fade-scan ALL OK; scene-pic-scan rc 0.
- coop-e2e: not run (Worker host blocked); frame layout only.

## Owner shots («Đêm thị tẩm» night1)
- Fold: https://ctm-img.victoria-tntt.workers.dev/img/_review/ev-pic-fig/cmp-night1-755x1000.jpg
- iPad: https://ctm-img.victoria-tntt.workers.dev/img/_review/ev-pic-fig/cmp-night1-1180x820.jpg
Wipe img/_review/ev-pic-fig after landing.

## FOR MAIN (not blocking)
1. Add to CDN img/EVENTS.json `events`: "thInv":"hao-huu","thBribe":"hoi-lo","giftto":"qua-tang". 4th: PEND:eunuch shows a ph-*-dark placeholder → mapping or ART ORDER.
2. Pre-existing: on iPad the XL option frame scrolls the WHOLE #mb, last card clipped, no «Kéo xuống» (Fold scrolls only the info column). One kit job later.
3. Pre-existing by design: fill unchanged for person dialog .71, shop .78, identity card .68–.71.
