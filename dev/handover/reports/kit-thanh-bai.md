# kit-thanh-bai (s34 kit job, part 2 of option rows)
PRIORITY #1 CHECK: OD 0 'thành bại' + OD tail "(17/11 ~17:10Z real" item (2) | main: j63 kaRows split thành/hỏng internally, showed ĐƯỢC/TỐN/MẤT/KÈM, seal THÀNH/HỎNG | review/kit-option-rows 3dabd1f7 (part 1) | claims MAIN s34.
Branch review/kit-thanh-bai, sha 76558786 on origin (rebased onto main b5d109fe; contains kit-option-rows 3dabd1f7 as its first commit).

## What changed (kit only, no BAL change)
- j63 kaRows/kaBody: every Được/Mất/Kèm value now carries a block (t THÀNH / b BẠI / a "Được ngay"). Card = Cần · Tốn (paid either way, ONCE) · THÀNH block (Được/Mất/Kèm) · BẠI block (Được/Mất/Kèm) · Ghi chú.
- Kèm sits inside the block of the label before it ("thành: … kèm:" -> THÀNH, "hỏng: … kèm:" -> BẠI); unlabelled bad thing -> BẠI. A cost written under "thành:" of a roll act is THÀNH Mất (bribe paid only on success, OD 17:00Z).
- Sure act (no roll, no hỏng) = ONE block (THÀNH). A sure act that carries hỏng: gets both blocks. Empty BẠI prints one dim line "Tốn công, không được gì" (MAIN 17:35Z wording: odds cap 95 % + soft fail, nearly every act has BẠI). Disabled card hides its BẠI block (as it hid Mất/Kèm).
- "hỏng:" stays the INPUT label everywhere (alias "bại:" added in kaModel, kaModelStr, j19 kitParse). Shown HỎNG -> BẠI: kitResultSeal, j19/j25 seals, log "Bại." (j67; j65 regexes accept both), quest tag (jchap, jtabs), tutorial (jtut), jlogsync, j72 chip, kit sample (jkitpage, jksize), j19 kgrid label, KIT.md (new §88), VANPHONG.md.
- Row classes unchanged (.kr-duoc/.kr-mat/.kr-kem) + .kb-t/.kb-b/.kb-a; heads .kbh-t/.kbh-b; empty row .kr-none. Tests updated: opt-render (seal BẠI), result-sfx label.

## Scan: node dev/measure/thanh-bai-scan.js (A = real cards, whole deck in 5 game states; B = every labelled source string forced to a roll)
(A) deck cards (28 unique): 20 sure = ONE block; 8 roll = TWO blocks; 3 of the 8 have empty BẠI ("Tốn công, không được gì"); 0 empty THÀNH; 0 literal "thành:/hỏng:" printed; Tốn row on 28/28.
 Odd: 4 locked/disabled acts have odds field <100 but show no odds chip (a.lock) -> one block; they get BẠI once unlocked.
(B) 625 source strings: 180 have hỏng:/bại: (BẠI filled); 278 have none -> BẠI empty once they roll ("Tốn công…"); 79 THÀNH empty (string only writes hỏng:, partial strings); 77 Kèm with no block label (placed by sign: bad -> BẠI); 0 stat costs under thành: in a roll string; 1 "bại:" alias.
Option modals: option-modal-scan.js still applies (not re-run after this change; cards are the same builder).

## Shots (CDN img/_review/kit-thanh-bai/ — wipe after verdict), LOOKED at all
before-/after- × fold-/ipadAir- × 1..4: 1 Thỉnh an Thái hậu (roll, Kèm in THÀNH, Mất in BẠI), 2 Cầu tự ở Phụng Tiên điện (empty BẠI), 3 Điểm trang (sure, one block, Kèm inside), 4 Hối lộ Kính sự phòng (sure, Tốn Bạc once). Only 4 of 6 asked (deck at seed had no disabled/Kèm-in-BẠI card; scan counts cover them). Before = 3dabd1f7 build, after = 76558786.

## Gates
dev/tools/quickcheck.sh on 76558786 vs live b5d109fe: QUICKCHECK PASS · core gates PASS · open 1696 ms · old save ok · perf render 219/195, tab 279/280, buổi 956/1077 ms. (First run on the un-rebased sha FAILED G1 frozen list 4957->5093 because the branch was 76 commits behind main; rebased, passes.)
dev/test/opt-render.js 1180x820: rolled seals BẠI/THÀNH ok; F:play "dialog neither event nor act" fails vary run to run (before 11, after 8) — same class, not from this change.

## NOT done
- Fold/iPad shots of option MODAL cards (only Hành sự deck cards shot). 412x1058 / 390x844 not shot.
- Result card (rtoast) keeps its Được/Mất rows (it shows what HAPPENED, not a two-block promise); only its seal word changed.

## HANDOVER
None needed (finished). Reviewer: check dev/measure/thanh-bai-scan.js numbers + the 4 shot pairs; try an act with a real "hỏng:" string and a disabled card.
