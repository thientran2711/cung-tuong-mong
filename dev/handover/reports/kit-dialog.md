# kit-dialog report (worker session_01Rc5AsMcXo2ivEx1p5K5Ysh, coordinator MAIN CHÍNH 87)
PRIORITY #1 CHECK: OD 21/11 ~03:47Z/~03:54Z/~04:00Z (#44/#47/#49) + L1867/L1878 + 18/11 21:20Z | main kitModal j79, kitOptTier jopic, kitSealEvPlace jseal, kszFigFill3 jksize | review/* kit-pcrow-square, kit-act-grid (keeper, not touched) | claims: kit-dialog (me).
START_CTX ~0 %.

## Branch review/kit-dialog, sha e8d30ca7 (base main 56ff0db0) — quickcheck PASS (507 s, gates incl. new hook 80-dialog-fixed.sh)
Done (ordered by MAIN): #49 option card + fixed dialog, #56 every option card has a picture, #47 same figure per frame size, #44 one Trân nữ seal place. Not yet: #54, #71, #72, #75, #76, #80, #82 (queued, see bottom).

## What changed (all in the shared kit parts)
- #49a jopic.js: `.kat` nowrap, title `flex:1 1 0`, `.kodds` right on the title row; narrow card (< KIT_OPT.stackW 430 px, class kodstk) stacks the meter bar-over-word so the title keeps width.
- #49b iPad 2 columns: tier S card h 88 -> 132 (pic 60 wide); BUG FIX kitOptTier early return left `--k3c` overwritten by kszBtnGridLive3 (picked 2 columns rendered as 1) -> re-asserted.
- #49c picture fills the card: `.kaart` height = card clientHeight (set in kitOptTier, cleared in each trial); jk3.js tight-column no longer pins 84 px.
- #49d fixed picture + info, only list scrolls: already true (KIT 56.18); now guarded by the test (scroll every scroller, figure/event/info must not move).
- #56 kpOptArt: no art of its own -> §59 stand-in even when no sibling has a picture (was only when a sibling had one). Reproduced on old build with «Tiếp chuyện / Không tiếp».
- #47 jksize kszFigFill3: L / XL frames: target = the frame's room (not min(room, info height)) -> same figure size+position in every L/XL dialog of a device (Fold: 220x666@90 in 3 dialogs, was 666/537/472).
- #44 jseal.js: seal = ONE fixed place (top of the header bar `.kph`, 34 px, 52 px from the right = left of the ✕ slot), no corner search, no bottom strip; header reserves padding. seal-events scan: 126 event dialogs Fold+iPad, ALL `tr:34`, 0 FAIL (before: corners br/bl/tr mixed, 40 px, 42 FAIL "covers").
- Test dev/test/dialog-fixed.js (+ hook dev/tools/quickcheck.d/80-dialog-fixed.sh, README line): odds on title row, iPad 2 cols / phone 1 col, picture fills card, only list scrolls, one seal place+size, same figure per frame size, #56 picture on every card. Old main: 33 FAIL; this branch: all pass. opt-card-scan updated (picture = card height). KIT.md §6.2b/§6.2d/§39.1/§56.17 overwritten in place + new §6.2f (kit sample pages §6.2/§6.2b use the same CSS).

## Before / after (law 11, opt-card-scan + dialog-fixed, Fold / iPad)
| case | before | after |
|---|---|---|
| odds meter row | own row (all cards) | on title row (all) |
| picture vs card (TIERCHK bad) | 3/3, 2/2, 3/3 | 0 everywhere |
| FIG gap (mat2/dress/fest, Fold) | 21 / 20 / 22 FAIL | 0 |
| iPad layout mat, mat2, dress, fest, Hồi kết nhánh 1+2 | 1 column | 2 columns (2S) |
| Fold XL figure h (3 dialogs) | 666 / 537 / 472 | 666 / 666 / 666 |
| seal corner (126 event dialogs) | tr/br mixed, 40 px, 42 cover-FAIL | tr 34 px all, 0 FAIL |
| picture-less cards (Tiếp chuyện…) | 2/2 | 0 |

## UPDATE (same session, branch head after e8d30ca7): #54 + #72 done and pushed (commits "kit-dialog #54", "kit-dialog #72"; dialog-fixed passes on Fold + iPad; NOT yet quickcheck-run on the new head — run `bash dev/tools/quickcheck.sh <head>` before SẴN SÀNG).
- #54 jdh.js kitDhCap: the title plate (.kt3 with .kdh) is CLONED into the event picture (.k3ev > .kdhcap, bottom centre) and the original hidden; re-applied on every showModal (a re-render rebuilds .k3ev). Test: (#54) plate rect inside picture rect.
- #72 jopic.js kitOptFinal: loss chips (Mất / certain Bại / hint «nhưng …» part) go to their OWN row «Mất» (class kr-mat2 kdup, red chips) after Được; Tốn = price only. KIT.md still says "Mất folds into Tốn" in §6.2b — TODO overwrite that sentence (canon).
## HANDOVER (context 33 % reached, worker rolls over; MAIN opens the successor). Worktrees: /home/user/wt/kd (branch review/kit-dialog), /home/user/wt/hand (handover branch); both may be gone in a new container — re-create: `git worktree add -b review/kit-dialog /home/user/wt/kd origin/review/kit-dialog` (sparse), build `bash dev/site/build_site.sh`.
Tools: `node dev/test/dialog-fixed.js file://<repo>/index.html <outdir> [WxH@2,...]` (both sizes ~3 min; split sizes if the 120 s foreground limit bites, or run in background), `node dev/test/ge-shots.js`, `node dev/test/opt-card-scan.js`, `node dev/test/seal-events.js <index.html> <out> 755x1000@2 1180x820@2` (5 min, background). index.html must be rebuilt + committed before quickcheck.
Gotchas learned: `.kr` rows are display:contents (use .krl rect to test visibility); jk3 k3tight set a fixed 84 px picture height (removed); kszBtnGridLive3 overwrites --k3c (kitOptTier early return now re-asserts); a re-render rebuilds .k3ev (clone, don't move); ge flow in dialog-fixed.js is the quickest way to open real Hồi kết nhánh / title dialogs.
STILL TO DO (owner marks, order given by MAIN 87): #71 Fold narrow «Word-style» dialog ignores S/M/L/XL frame sizes (law 10) → every dialog on a kit frame size + regression test «every dialog uses a kit size» (scan all dialog kinds, add to dialog-fixed.js); #75 small notice «Lỡ hẹn»/«Chủ thưởng»: involved person's avatar on BOTH devices, ONE avatar rule for all small picture-only notices (scan: anything on iPad but dropped on phone); #76 LEFT-SLOT kit part (person / ITEM / matter; dialog-person decides who, kit-dialog builds the slot); #80 small frames (left = framed avatar, approved) → event picture ALWAYS at the TOP of the right column, no empty band above; #82 iPad list frames with short rows (Sổ nguyệt sự, people lists, logs) → 2 columns, phone 1 column; KIT.md list rule + scan of every list frame; fix KIT.md §6.2b «Mất folds into Tốn». Update the report table + KIT sample page entries as each lands.
## Queued (superseded by the list above, kept for reference): #54 Danh hiệu mới title ON the picture, #71 Fold narrow dialog on S/M/L/XL + test, #72 separate Mất row (Tốn/Được/Mất), #75 Lỡ hẹn avatar both devices, #76 left-slot person/item/matter, #80 picture at top of right column in small frames, #82 iPad 2-col lists + scan of every list frame.
## Queued (not started): #54 Danh hiệu mới title ON the picture, #71 Fold narrow dialog on S/M/L/XL + test, #72 separate Mất row (Tốn/Được/Mất), #75 Lỡ hẹn avatar both devices, #76 left-slot person/item/matter, #80 picture at top of right column in small frames, #82 iPad 2-col lists + scan of every list frame.

## kit-dialog-2 (worker session_01Rc5AsLvRJSwBGGefPUEw8B; reports to MAIN 89) — branch review/kit-dialog-2 head 198825c5
PRIORITY #1 CHECK: OD 21/11 marks #71 #75 #76 #80 #82 (+ MAIN 88 (a) empty Được cell, (b) card title alignment) | main 60dd62c3 kitFrame*/kszSlot none before | review/* kit-dialog b6438032 (base), dialog-person-r86 2b8b3efd + rv2 70d27e7b (merged, ONE left slot) | claims: kit-dialog-2 (me).
START_CTX ~0 %. Gates on 198825c5: quickcheck PASS (532 s, core gates PASS); dialog-fixed all pass Fold 755x1000 + iPad 1180x820; coop-e2e see MAIN message.
What changed (all kit parts, jksize.js / jopic.js / jdh.js / j79.js; KIT.md §6.2b overwritten + new §6.2g):
- #71 every dialog = S/M/L/XL: `--kszW-*` generated from KIT_SIZE.frame; `--kpw` = min(L, screen-28) (j79 :root, 560/680 typed values gone); `kitFrameTagAll` writes data-ksz on every .dlg/.dbox (legacy page frames = L); scene cover frames width = --kpw. Root of the owner's shot: pick-list / page frames (spyPick with ≥7 targets, item card, tip/coach, shop, loading cover) had NO frame size (loading cover 680/440 px). Test (i): 19 dialog kinds Fold+iPad (old main: 7 FAIL).
- #75 small notice with a person now shows the person's portrait on the left on BOTH devices (Lỡ hẹn); same code path for both; dev/test/phone-drop-scan.js (seeded game, same fixed dialogs on both devices, lists features/text one device drops). Test (j).
- #76 left-slot kit part kszSlot3/kszSlotType3 (person portrait / ITEM tile `.k3mitem` / matter picture); `m.subject` forces; `m.item`; leading `.kiev` tag auto-lifted (Đồ thất lạc: item left). MERGED with dialog-person r2: kszSubject3(m,main) = WHO (theirs, + m.subject==="matter", + kitPanel spec.who), kszSlotType3 = what fills the slot, kszAvatarRule3 runs after the slot.
- #80 event picture = TOP of the right column when the slot holds person/item (`justify-content:flex-start`; no-picture frames stay centred).
- #82 list rule KIT_SIZE.list: iPad kfacts ≥3 short rows (≤110 chars, column ≥532 px) → 2 columns; a long scrolling short-row list takes the next (wide) size instead of scrolling (kszListWantsWide3); phone 1 column. Test (k).
- (a) empty Được: j65 dedupeBtns deleted the second «không» chip (Tốn «không» + Được «không») → fill chips are `.kdup`; (b) one card-title alignment (`.kat>.kan{text-align:left}`). Test (l). NOTE: titles like «Để sau» are `kback` back buttons by design (no rows).
- #54 follow-up: title plate clones onto `.k3mpic` too (person-less reward frame is a picture-left frame since the narrator is gone).
Before/after (law 11): dialogs without kit size 7 → 0; Lỡ hẹn person on phone: missing → portrait; ev-picture top offset result/notice 55 px → 0; iPad Sổ nguyệt sự 5 short rows: 1 col scroll → 2 cols no scroll; empty Được cell: 1/3 cards → 0.
Not done / for MAIN: dialog-person-scan.js printed FAIL with no failing line once on the pre-rv2 build (log cut); not re-run on 198825c5 — run it before landing. Items/matter subject for dialog-person's callers: set m.subject / m.item.
