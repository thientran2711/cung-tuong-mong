PRIORITY #1 CHECK: OD 8 | main jhc.js hcRelHTML (r1 compact picker) | review/* none | claims none.
# rel-picker r2 — SẴN SÀNG KIỂM, branch review/rel-picker-r2 @ 38079d9f (merged origin/main 1130a49e, site rebuilt)
Cause: r1 picker still used the kit `sm` portrait cell (100 px tall) and the 300 px strip basis made the strip drop under the chips on iPad; the relation card portraits were 150 px wide.
Fix (kit parts only, no new part): pager() takes optional `sz` (default "sm" = unchanged for other strips); Ân oán strips pass kit size `xs` (also the kpinline strips Khuê hữu/ban in jkc/jkc2); strip basis 190 px so it sits beside the chips; relation-card portrait columns 80–90 px; heading margin 4 px.
Scan: dev/test/relpick-scan.js <url> <out> <tag> [sizes] (default + after picking another person). Picker block height css px / card in view without scroll:
| size | before def | after def | before pick | after pick | card in view |
| Fold 755x1000 | 200 | 154 | 212 (card cut) | 167 | yes/yes |
| iPad 1180x820 | 234 (cut) | 154 | 246 (cut) | 167 | yes/yes |
| 1366x1024 | 200 | 154 | 212 | 167 | yes/yes |
| 412x1058 | 268 | 188 | 280 (cut) | 235 | yes/yes |
| 390x844 (rotate-prompt size) | 268 | 222 | 280 | 235 | no |
No page errors, no h-overflow. Shots (Fold+iPad, looked 3x): CDN img/_review/rel-picker-r2/rp-{before,after}-{ta,pick}-{755x1000,1180x820}.jpg (delete after verdict).
Other pgwrap strips (Hậu cung rv, staff, kid, qt, men, court) have a single strip over a person card, no stacked picker rows: left at `sm`, unchanged. Not done: quickcheck full suite (run only the scan), old-save test.
