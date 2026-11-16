# Review r1: review/ios-install-first @ 1bd8eef95
Verdict: PASS (after one small reviewer fix). START_CTX ~5%.
Merged onto origin/main 8f476f6f9 (index.html/sw.js conflicts = generated files, rebuilt with build_site.sh).
## Checks
- iPad Safari non-standalone: kit notice first, 0 download requests until a choice (ios_install_first.js ALL PASS). Guide (Share -> Thêm vào MH chính / Màn hình chính -> Thêm) correct; no download. "Chơi luôn" stores ctm-ios-browser and downloads (128 requests); reload with flag downloads without asking.
- Standalone, Android Fold, desktop: unchanged (download once, no notice).
- Returning Safari player with full cache and no flag: not asked, no page errors. Partial (<50%) cache with no flag is asked (acceptable).
- Kit-only UI: .kpanel/.kbtn/.kpnote/.kpopts, no private chips (KIT 35.1).
- load-e2e cold: 43.2 MB core, enter 45 s throttled, offline reload ok, 0 page errors (2 fig files "broken" offline = existing background-set gap, not this change). Old-save load (ts-oldsave): ok, 12 weeks, 0 errors.
- Shots: Fold 755x1000 ask, iPad 1180x820 ask/guide/peek, in dev/handover/reports/ios-install-first-r1-shots/. No overflow, no cut text.
## Reviewer fix (the one defect)
"Mở sổ mây trước" only closed the notice (title screen), it did not open Thiết lập › Sổ mây. Now it clicks the title's Thiết lập (data-tgo="opt") and scrolls .cloudwrap into view; verified .cloudwrap visible, 0 requests, 0 errors. KIT 35.1 wording updated.
## CLAIMS row
| ios-install-first | review/ios-install-first-r1 | PASS | iOS Safari asks before download; Sổ mây button fixed by reviewer |
