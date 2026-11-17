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

## Per-source table: "không được không mất" (1)
All 20 lines are pure decline/skip options with no hidden loss (j71 Không dự/Bỏ thi/Không cược/Từ chối khéo x7 + j31 x2 + jact/jact2/jk2b/jstip x1 each: go() only logs or scores OTHERS). The ONE kit regex KA_NOTHING hides the line; checked in a real modal: the card shows only its title. No real loss found -> no source wording change needed. "Đợi Nội vụ phủ" (jeitem:110) already shows its loss: "kèm: ... mặc trung y ra ngoài bị chê thiếu lễ" (red KÈM), no "không được không mất" there.

## Gates (dev/tools/quickcheck.sh, run on 3dabd1f7 vs live e8b1906f)
CORE GATES PASS (one-core-guard, rules-one-source, kit-conform, coop-one-world, hooks) 164 s; TIME-SPILL GUARD PASS; open 1527 ms 0 errors; old save ok 0 errors; perf new median render 138 / tab 254 / buổi 721 ms. Full-run log: see final line appended below by the rerun.

## Shots (CDN img/_review/kit-option-rows/ — wipe after verdict)
- before-ipadAir-s1.png / after-ipadAir-s1.png: 2 options, 2nd = "thành: giữ mình trong sạch..." — before: literal "thành:" under ĐƯỢC, picture cards in 2 columns; after: clean ĐƯỢC row, cards in one full-width column (iPad 1180x820). LOOKED.
- before-fold-s1.png: same case on Fold, literal "thành:" visible (before only).
- NOT obtained: Fold "after" and the other 2 modals (an update-notice popup / night scene kept covering the test modal; harness flaky). Reviewer please re-shoot Fold with dev/measure/option-modal-scan.js numbers as the primary evidence.

## NOT done
- quickcheck summary line may be missing from the first run (pipe cut); rerun log appended if it finished.
- Option modals only reached via endTurn x50-60; 412x1058 and 390x844 not scanned.
