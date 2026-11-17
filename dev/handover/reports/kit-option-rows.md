# kit-option-rows (s34 kit job)
PRIORITY #1 CHECK: OD 0 | main j63 KA rule existed (only "không được mất gì") | review/* none | claims none.
Branch review/kit-option-rows, sha 3dabd1f7 (on origin).

## Fixes (kit only, no BAL change)
1. jksize.js kszNeedTxt (+ KIT_SIZE.v3.btn.txtMin=200): a picture card keeps >=200 px of text column, so 2-3 picture cards on a ~600 px area use ONE column (was 2 columns, text 145 px).
2. j63.js KA_NOTHING: one regex for every "says nothing" line (không được mất gì / không được không mất / không mất không được / không được gì / không mất gì); used by kaRows and the empty Mất/Được filter.
3. j17.js dilLine: sure option whose x already leads with a label was wrapped in a second "thành: " -> literal "thành:" under ĐƯỢC. Now kept as is. Verified in the real modal (ĐƯỢC/MẤT/GHI CHÚ rows correct).
KIT.md §87. Scan: dev/measure/option-modal-scan.js <device> [turns] [json].

## Scan (endTurn x50-60, modals with >=2 options)
| device | before NARROW | after (flags NARROW/CLIP/EMPTY/LIT/NOTHING) |
| ipadAir 1180x820 | 6 of 17 | 0 of 21 |
| fold 755x1000 | not run before | 0 of 21 |
| ipadPro 1366x1024 | not run before | 0 of 18 |
(thresholds: text col <170 px or value col <140 px.) 412x1058 and 390x844 NOT scanned (390 is rotated host mode).

## NOT done (be honest)
- No before/after shots on CDN (first attempt caught a transition frame).
- quickcheck.sh does not exist on main; kit-conform.js crashed on missing args (ERR_INVALID_ARG_TYPE), not run properly.
- Per-source check of the ~20 "không được không mất" lines and of jeitem/jrcp/jpet/jpoison/j83 "thành:" options done only through the kit rule + scan, not one by one; "Đợi Nội vụ phủ" (a real loss) not checked.
- Option modals only reached via endTurn; builders not reached by 60 turns not scanned.
