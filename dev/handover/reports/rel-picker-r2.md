PRIORITY #1 CHECK: OD 8 | main jhc.js hcRelHTML (r1 compact picker) | review/* none | claims none.
# rel-picker r2 — SẴN SÀNG KIỂM, branch review/rel-picker-r2 @ 9e58660e (merged origin/main 1130a49e, site rebuilt)
Cause: r1 picker still used kit `sm` portrait cells (100 px tall) with the strip wrapping under the chips on iPad; relation-card portraits 150 px wide.
Fix (kit parts only): pager() takes optional `sz` (default "sm" unchanged); Ân oán strips + Khuê hữu/ban strips use kit `xs`; strip basis 190 px (beside the chips); relation-card portrait columns 88–104 px (one size for Fold and iPad), rows box centred vertically, «Đã biết» box 4 px under the card, heading margin 4 px.
Picker block / card (css px) — scan dev/test/relpick-scan.js:
| size | picker before→after (def) | after pick another | card in view (def/pick) |
| Fold 755x1000 | 200→154 | 167 | yes/yes (empty below card ≈ 15 % of panel) |
| iPad 1180x820 | 234→154 | 167 | yes/yes (Đã biết box peeks, scrolls) |
| 1366x1024 | 200→154 | 167 | yes/yes |
| 412x1058 | 268→188 | 235 | yes/yes |
| 390x844 | rotate-prompt size | | not applicable |
WHOLE GROUP scan dev/test/relpick-group.js: every tab + sub-tab with a person strip (rv, court, men, staff, kid/kvo/kin/hon, qt, rel, fac) at Fold + iPad = 72 screens: main card fully inside the panel on all 72; strip height 80–107 px, empty area inside strip ≤ 14 px. Strips outside the Ân oán picker stay `sm` (single row, no stacked pickers, nothing to fix).
Tests: quickcheck f2537b09 content = PASS (core gates, time-spill, old save loads + plays a buổi, perf ≈ live; its only FAIL was "NOT BUILT", fixed by committing the rebuild in 9e58660e). No page errors. Shots Fold + iPad looked 3x: CDN img/_review/rel-picker-r2/rp-{before,after}-{ta,pick}-{755x1000,1180x820}.jpg (delete after verdict).
