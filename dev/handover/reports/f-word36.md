# F-WORD36 report (WORKLIST_OPEN row 36, ORDER MAIN 187) — worker session_01UV1SzhBbNMEZ8pDWiqdaFJ

PRIORITY #1 CHECK: OD L2540/L2595 (item 36), L2807 (27/11 07:10Z rank-word rule) | main 5ad52416 grep below | review/* kit-bac-progress 16fe9dca, kit-stage-r11 11f11695 | claims: WORDING-GAIN seat archived 26/11.

## STEP 1 — map (origin/main = 5ad52416, 28/11)
Owner-bug ids from dev/handover/reports/owner-bugs/Bao-cao-loi-25-26-11.md. LIVE verified by `git merge-base --is-ancestor <sha> origin/main` + grep.

| # | Item | State | Proof |
|---|------|-------|-------|
| 43 | odds wording: life-changing choices get no odds word, warn line «Cẩn thận khi lựa chọn» | LIVE | 814bd77d ancestor; jk2b.js:331, jopic.js:497/532/534 (KIT_WARN_LINE, kitChoiceWarn) |
| 53 | WORDING-GAIN: stat marks «Sủng +/++», «Tốn» no minus | LIVE | 539603bf, e2d6f281, 540358c4, c580f2cd all ancestors; j19.js:19 (WORDING-GAIN), j1.js:126 |
| 39 | closing-chip last khắc «Nơi này sắp đóng cửa, mời tiểu chủ rời đi» | LIVE | 611fca61 ancestor; jnotice.js:277-280 (hold + pulse), jstagehere.js |
| 41 | buy-where / goal links «Đi tới» | LIVE | 772bee4f ancestor; jglink.js:53/75, jopic.js:544/549 kitGoalLink |
| 42 | OB-VERDICT-3 result shows at once | LIVE | 98c77517 + dacba11b ancestors; j87.js:422, j63.js:403 |
| 22 | kit-name-stranger (stranger = grey shadow) | LIVE | ca3c7d14 + f28d28b9 ancestors; j61.js:397-398 |
| 36 | kit-bac-progress (progress inside the bậc only) | PARTLY | LIVE: art/vir cards use crsProg (jtabs.js:41/47/65). NOT LIVE (branch review/kit-bac-progress 16fe9dca = cb221604 + RV-KK39 PASS): (a) jtds.js:147 Tứ đức «works» card still raw points over l+2 («9/3» fault); (b) lesson log/result rows «+g · c/n» (crsAfterW, jbalcore/j23/jtd) missing; (c) bar label with bậc name — SUPERSEDED by OD L2807 (27/11 07:10Z: rank word removed, Bậc n/5 + one Tiến độ bar) = KIT-STAGE-R11 (not LIVE, other owner). |

Result: 6/7 LIVE. Only item 36 is open, and only parts (a)+(b) of cb221604 are still wanted.

## STEP 2 plan
review/f-word36-bac: cherry-pick cb221604 onto LIVE 5ad52416 WITHOUT the label hunk (j79.js kitSkillCard bar label / kicker / hasBar) — keeps jbalcore crsAfterW, jtd/jtds/j23, test bac-progress.js; rebuild; run bac-progress.js + quickcheck.
