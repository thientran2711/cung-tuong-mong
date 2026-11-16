# review/pcard-actrow — before / after (KIT §6.3)
Scan: every `.pc > .pcr button.ka` (person-card acts) in the stage pop-up and each tab host, 5 design sizes (harness `dev/test/pcard-actrow.js`; pictures blocked offline so the slot shows its frame/placeholder; layout is real). "Before" = origin/main a3dbdc19f3.
Cells counted: acts with the §6.2 picture slot / acts drawn as a half-width grid cell. Heights in CSS px (min-max).

| size | host | acts before | with picture slot / half-width cells before | heights before | acts after | with picture slot / half-width cells after | heights after | clipped (after) |
|---|---|---|---|---|---|---|---|---|
| 755x1000 | pop-elder | 2 | 0 / 2 | 73-73 | 2 | 2 / 0 | 130-130 | 0 |
| 755x1000 | pop-maid | 3 | 0 / 3 | 172-212 | 3 | 3 / 0 | 130-145 | 0 |
| 755x1000 | tab-art | 2 | 0 / 2 | 73-73 | 2 | 2 / 0 | 130-130 | 0 |
| 755x1000 | tab-court | 2 | 0 / 2 | 73-73 | 2 | 2 / 0 | 130-130 | 0 |
| 755x1000 | tab-rv | 2 | 0 / 2 | 73-73 | 2 | 2 / 0 | 130-130 | 0 |
| 755x1000 | tab-staff | 2 | 0 / 2 | 73-73 | 2 | 2 / 0 | 130-130 | 0 |
| 1000x755 | pop-elder | 2 | 0 / 0 | 73-73 | 2 | 2 / 0 | 114-114 | 0 |
| 1000x755 | pop-maid | 3 | 0 / 0 | 73-174 | 3 | 3 / 0 | 114-246 | 0 |
| 1000x755 | tab-art | 11 | 9 / 0 | 73-130 | 11 | 11 / 0 | 114-130 | 0 |
| 1000x755 | tab-court | 7 | 5 / 0 | 73-213 | 7 | 7 / 0 | 114-213 | 0 |
| 1000x755 | tab-rv | 5 | 3 / 0 | 73-264 | 5 | 5 / 0 | 114-388 | 0 |
| 1000x755 | tab-staff | 5 | 3 / 0 | 73-114 | 5 | 5 / 0 | 114-114 | 0 |
| 1180x820 | pop-elder | 2 | 0 / 0 | 73-73 | 2 | 2 / 0 | 114-114 | 0 |
| 1180x820 | pop-maid | 3 | 0 / 0 | 73-141 | 3 | 3 / 0 | 114-180 | 0 |
| 1180x820 | tab-art | 11 | 9 / 0 | 73-122 | 11 | 11 / 0 | 114-122 | 0 |
| 1180x820 | tab-court | 7 | 5 / 0 | 73-180 | 7 | 7 / 0 | 114-180 | 0 |
| 1180x820 | tab-rv | 5 | 3 / 0 | 73-187 | 5 | 5 / 0 | 114-187 | 0 |
| 1180x820 | tab-staff | 5 | 3 / 0 | 73-114 | 5 | 5 / 0 | 114-114 | 0 |
| 1366x1024 | pop-elder | 2 | 0 / 0 | 73-73 | 2 | 2 / 0 | 114-114 | 0 |
| 1366x1024 | pop-maid | 3 | 0 / 0 | 73-141 | 3 | 3 / 0 | 114-145 | 0 |
| 1366x1024 | tab-art | 11 | 9 / 0 | 73-114 | 11 | 11 / 0 | 114-114 | 0 |
| 1366x1024 | tab-court | 7 | 5 / 0 | 73-129 | 7 | 7 / 0 | 114-129 | 0 |
| 1366x1024 | tab-rv | 5 | 3 / 0 | 73-141 | 5 | 5 / 0 | 114-140 | 0 |
| 1366x1024 | tab-staff | 5 | 3 / 0 | 73-114 | 5 | 5 / 0 | 114-114 | 0 |
| 844x390 | pop-elder | 2 | 0 / 0 | 73-73 | 2 | 2 / 0 | 114-114 | 0 |
| 844x390 | pop-maid | 3 | 0 / 0 | 73-125 | 3 | 3 / 0 | 114-163 | 0 |
| 844x390 | tab-art | 11 | 9 / 0 | 73-114 | 11 | 11 / 0 | 114-114 | 0 |
| 844x390 | tab-court | 7 | 5 / 0 | 73-145 | 7 | 7 / 0 | 114-145 | 0 |
| 844x390 | tab-rv | 5 | 3 / 0 | 73-155 | 5 | 5 / 0 | 114-155 | 0 |
| 844x390 | tab-staff | 5 | 3 / 0 | 73-114 | 5 | 5 / 0 | 114-114 | 0 |

Reading: before, the stage pop-up (maid / elder / any visitor) had NO picture slot at any size (0 of N), and at 755x1000 every pop-up act was a half-width grid cell (the owner's iPad shot). Tab hosts: 2 of 5 acts per tab were the same bare `.pcb` boxes (Biếu / Hỏi chuyện, no picture, 73 px). After: every act is a full-width long row with its picture slot, one per line, no clipped child.

## Same family (coordinator add-ons, 16/11)
| fault | before | after | test |
|---|---|---|---|
| Gift / work-gift dialog: sub-tab "Chí tôn 3/3" lists the whole harem | rows of other sub-tabs stayed visible (`.kopt.kart` display rule out-ranked `[hidden]`; filter ran only when the tab row was first built) | Chí tôn = Hoàng thượng, Thái hậu, Hoàng hậu only; counts 3/3, 9/11, 1/1 = rows of the tab | `gift-wk` 1180x820 / 755x1000 / 844x390: rows 3, wrong 0 |
| Gift rows: same scene picture + silhouette chip | generic scene picture, silhouette chip beside the title | the person's own kit portrait (`face:gift`); stranger = kit silhouette | `noface` 0 |
| Person-target pickers (spy target, evpick, itarget, plantsv, gift): generic scene picture on every row | `kitOptPic` matched by title text; masked "Phi ???" / "(chưa quen)" never matched | option field `kgt` (person) + portrait chip rule → that person's portrait (stranger: silhouette) | `spy-pick` rows 12, noface 0 |
| Spy-target dialog: options in a tiny scroll box, rows cut in half | picture + text left ~198 px for the list; grid rows stuck at the 130 px floor and cut long rows | whole right column scrolls as one list (`kdpall`), rows grow to their text (flex column) | `spy-pick` clipped 0 |
