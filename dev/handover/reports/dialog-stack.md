# dialog-stack (MAIN CHÍNH 86, owner mark #46)
PRIORITY #1 CHECK: OD 1 (brief row) | main j79.js kitModal, jk4.js kitModalCloser (no stacking rule) | review/* none | claims none
START_CTX ~0%.

## Cause
NOT the tour script. Real path: `over()` (death) sets S.dead + Q but never closes the room person card (`popIdx` stays set, `#popw` drawn), and CSS had `#popw` z 41 above `#modal` z 30. So any dialog opened while a person card is open sat UNDER the card (ordinary dialogs even fully hidden). `#kpop` (word pop-up, z 60) also floated over modals.

## Fix (kit, one rule)
jk4.js: `kitDialogStack` wrapped around showModal: `#modal` z 42 (above #popw 41); winning dialogs (death/end/night/klife/S.dead) call `kitCloseOthers` (popIdx, KIT_LAYERS incl. #ov, #kpop, #kpodov, open kbk). KIT.md §8 updated (KIT 8.9). No new kit part, no per-screen variant.

## Before / after (dev/test/dialog-stack-scan.js, Fold 755x1000; iPad 1180x820 after = same)
| layer | dialog | before (main 32c0e33b) | after |
|---|---|---|---|
| person card | death | FAIL card on top, bottom of dialog covered | OK, card closed |
| person card | info / confirm / notice | FAIL dialog hidden under card | OK, dialog on top |
| person card | night | FAIL | OK, card closed |
| word pop-up | death / night | FAIL pop-up left floating | OK, closed |
| word pop-up | info / confirm / notice | OK | OK |
before 7/10 bad; after 0/10 bad on Fold and iPad, page errors 0.
Openers covered: all go through showModal (kitModal, kitConfirm, kitPanel, resultShow, over, events, PEND). Not covered by scan: podium (#kpodov, own contest flow; closed by winners), kit book.
Shots looked 3x: before-fold (card over death), after fold; iPad via hit-test.

## #66 (owner 21/11 ~04:46Z: remove quest/request chips) — separate commit
Chip cloud came from the quest-offer dialog line `<p class="past"><b>kind</b> · hạn N tuần · N bước: steps</p>` (j72 PEND q72o), which kpConvert turned into chips. Removed the line (info stays in Mệnh truyện > Việc nhờ; no #57 rows built). Phụ tuyến chapter news lines (jnroad/jnroadm «Tin trong cung · … · chương») get class `nochip` → plain kit note, no chips (kpConvert honours it).
Scan dev/test/quest-chips-scan.js (real offer dialog of every T72 template that can be made here): before 53/53 with chips + old line, after 0/54, errors 0. Fold + iPad shots looked: no chips.
Not covered: 81 templates need specific rivals to be made here; they share the same single builder line.
