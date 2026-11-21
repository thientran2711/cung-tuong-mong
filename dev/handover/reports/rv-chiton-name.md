# rv-chiton-name — review of review/chiton-name a41b3891 (reviewer session_01Rc5AsJd4iSwgSQHpoPQtqh)

PRIORITY #1 CHECK: OD 21/11 ~01:58Z / ~02:00Z / ~02:18Z, L1069 | main moved 64d2e094 → a88b14f0 → 32c0e33b during review (merged all three) | review/kit-pcrow-square NOT in main (no merge needed) | claims: worker chiton-name, keeper kit-pcrow-square (touches pcard).

**RESULT: PASS — review/chiton-name-rv fba59365 (FF of origin/main 32c0e33b).**

## Law check (18 laws, those touched)
- 9 KIT FIRST: new pcard `rows` option reuses `kitRows`; it was NOT registered in KIT.md → I added it (KIT.md §person card row + the info-panel line: one label column). FIXED by reviewer.
- 11 WHOLE GROUP: chiton-name-scan.sh → 0 name-slot uses of empName() (6 remaining = story sentences băng hà / jface / joi), 0 «niên hiệu» as name/heading. Place label: jpm.js, jres.js (resRoomName both branches) = palace on TOP, hall below; j27 uses hall-only strings (no pair) — fine.
- 7 cổ trang: «Niên hiệu», «Trọng», «Hay», «Đã biết», «Dạo này | Trong cung: …» OK, no %.
- 12 two devices: Fold 755x1000 + iPad 1180x820 shots looked: Chí tôn (name «Hoàng thượng», row «Niên hiệu» under portrait next to «Đã quen»; right panel ONE label column Sở trường / Trọng / Hay / Dạo này), Phi tần (Sở trường / Tính nết / Đã biết / Dạo này one column), stage place label (Fold «Chung Tú cung / Minh Hòa hiên», iPad «Hàm An cung / Tuy Phúc hiên», «Cảnh Phúc cung / Dưỡng Xuân hiên»: palace top, hall below). No hscroll, no page errors.
- 14/16/17: no rule overwritten wrongly; OD rows not re-asked.

## Gates (on fba59365)
quickcheck PASS 239 s (old save ok, render 298/293, tab 582/582, buổi 1676/1349, tasks>200ms 26/22; core gates, time-spill PASS) · coop-e2e (COOP_A_ORIGIN=tt COOP_B_ORIGIN=nc) 92/92 · pcard-fill (court0/1, rv0/1 card+info+sticky OK, 0 errs) · pcard-facts (no clamp, 0 errs) · kit-ton-row 14 ok / PASS 14 · chiton-name-scan clean.

## Notes for MAIN (not blockers)
- Name is left-aligned above the portrait, NOT centred; the «Hoàng thượng» tag/centre/«!» belongs to keeper review/kit-pcrow-square (worker left it on purpose). After that lands, keep chiton's rows + «Niên hiệu» row.
- Chí tôn left column (Fold): the «Niên hiệu» row sits at the bottom of .pcl next to «Đã quen»; the column scrolls (existing). Fine, but keeper may want it nearer the portrait.
- Duplicate content on Chí tôn: trait box («Lạnh lùng: Sủng lên chậm…») repeats the «Hay» row — the «!» box replacement is the keeper's.
- Reviewer edits: KIT.md only (+ rebuild). 
