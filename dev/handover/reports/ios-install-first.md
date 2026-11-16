# Report: ios-install-first
START_CTX ~6%. Priority rule #1: grep of main found nothing existing (only the old one-line note in jload.js); review/* branches not fetched (disk/time), none named ios/install/pwa seen via ls-remote.
## Change (jload.js, kit only)
iOS/iPadOS Safari (UA or MacIntel+maxTouchPoints>1, not standalone), core cache <50%, no remembered choice → kit panel with: "Thêm vào màn hình chính (khuyên)" (guide, no download), "Chơi luôn trên trình duyệt" (remember choice, download as today + line "app will download again"), and if a Safari save exists "Mở sổ mây trước (chưa thỉnh tranh)". Standalone / Android / desktop unchanged. Players who already cached in Safari before this build are not asked (flag set, continue).
## Save answer
Saves are localStorage `hclh-save-v2-1..3` (all40 SK). Home-Screen app has separate localStorage → a Safari save is NOT visible in the app. Existing coverage: Sổ mây (jcloud.js): Thiết lập › Sổ mây › Giữ sổ trên mây gives an 8-letter code; in the app "Nối sổ". Also save-code export/import (xioExport). No new save system built; the notice points to Sổ mây when a Safari save exists.
## Tests (node dev/test/ios_install_first.js): ALL PASS
iPad Safari fresh: phase=ask, 0 jload downloads, guide 0 downloads, web choice starts download + flag, peek 0 downloads; iPad standalone downloads; Fold Android downloads, no notice; 755x1000 iOS no overflow; desktop unchanged; no page errors. Not run: full quickcheck/old-save suites (reviewer: run tier/quickcheck).
## Shots
dev/handover/reports/ios-install-first-shots/: ipad-1180x820-ask.png, ipad-1180x820-guide.png, fold-755x1000-ask.png
