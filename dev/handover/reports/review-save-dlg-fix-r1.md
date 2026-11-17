PRIORITY #1 CHECK: OD 3 (17/11 02:47Z, 03:12Z, 03:26Z) | claims 2 | review/* 1 (review/save-dlg-fix) | main: kitFrameLive3/jsl 32.2a/jkrel 52 changed in place, nothing new.

# review save-dlg-fix r1 — PASS 711d018
Branch review/save-dlg-fix @ 340c616a (includes fig-feet-crop-2 d431dc3db) is based on current origin/main 7abaf07a (trial merge = fast-forward). My branch review/save-dlg-fix-r1 = 340c616a + one small fix.
Note: owner ref images (owner-chonso/tuanluc-*.jpg) are not on the handover branch; judged against the verbatim OD text.

## Owner faults
Chọn sổ (02:47Z): frame 560 px (was 380) at Fold/iPad; no picture column on Sổ mây row; all buttons whole words (also at 390); no "???" (trap test PASS); no cut picture. Scan 5 sizes x 5 screens: TOTAL bad 0, no page errors. Thiết lập and Sổ luân hồi no longer wrapped in the live event frame.
Tuần lục figure (03:12Z): figure column 36-38 % of page at the left, feet visible (20-161 px under), full figure not cut, readable (looked at 755, 1180 spread, 390, 412); text frame 353 px at Fold (263 before); font px unchanged (17 / 16.8 / 13). Figure is centred in its narrow column, so a 20-58 px air gap from the page edge remains; judged fine.
kitRelTable paper (03:26Z): no purple band, no white card, Thái hậu table fits at all 5 sizes, boxes stack below 430 px; book-col-scan ALL OK (cut/band/card 0, 5 sizes).

## Consistency scan
kitRelTable users: j87 x2 (book, both paper) + jpcf person card (head:false, dialog, unchanged by design) + kit page. Picture-column part (.k3mpic live frame / kbk-por): book pages all through one rule; live frame skips .kpt-mount pages.
Small fix (mine): kit sample page §52 had no paper sample (KIT rule: sample in same branch) -> added in jkrel.js; site rebuilt, committed 711d018.

## Tests
quickcheck PASS (156 s, old save ok, core gates PASS, perf 204/222 ms); chonso-cloud 26 OK, cloud-save 45 OK, save-slots ALL OK, save-dlg-mask PASS, save-dlg-scan 0, book-col-scan ALL OK. Shots (scratch, never committed): 755x1000, 1180x820, 1366x1024 (scan), 412x1058, 390x844.
Not in this branch: filler line "việc vặt..." = tuanluc-sync.
