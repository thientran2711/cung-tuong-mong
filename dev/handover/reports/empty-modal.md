# EMPTY-MODAL — report (DRESS-FIX worker, session_01Rc5AsKadedThQfXUJc2SMu; order MAIN 167)

PRIORITY #1 CHECK: WORKLIST_OPEN row 38 | FOREMAN_B_STATUS 26/11 20:54Z («Hội phối đồ: báo đề» modal stays with empty Q, same on plain) | main: j3 showModal / closeModal, jspread sp13Plan, jts tsDressAnnounce | review/*: none on this | claims: none.
Branch `review/empty-modal` from LIVE 4cfcda61.

## Cause (whole family = the ONE queue dialog, j3 showModal)
| case | before (LIVE 4cfcda61) | after |
|---|---|---|
| A buổi spread pulls the card on screen | jspread `sp13Plan` protected the shown card only if already planned (`__sp13`) → a fresh card could leave Q while drawn | the card on screen is never pulled |
| B any code takes the shown card out of Q, then a render | FAIL: dialog stays over an EMPTY queue (Fold + iPad) — Foreman B's signature | the next `render()` re-syncs: shows Q[0] or closes (`M.__m` vs `Q[0]`) |
| C option list EMPTY (`opts: []`) | FAIL: no option, no close button → stuck (Fold + iPad) | kit `kitEmpty` card «Lúc này không còn việc để chọn» + the dialog close (✕ / «Đã rõ»); close works |
| D every option locked | ✕ only, no line saying why | same kit empty card + close |
| normal card | options | unchanged (no extra close) |

Scan (dev/measure/empty-modal-scan.py): 29 computed option lists in 22 modules feed this dialog (jopic 6, jagent 2, jemoact 2, …) — all covered by the one guard in j3.
Kit: KIT.md §37.2 line (EMPTY DIALOG LIST) — uses the existing kit part `kitEmpty`, no new look.

## Tests
- dev/test/empty-modal.js: LIVE FAIL 8/14 → branch PASS 16 (Fold 755x1000 + iPad 1180x820)
- one-core guard PASS
- quickcheck --runs 3: see MAIN message
Stills: CDN img/_review/empty-modal/after-fold.jpg, after-ipad.jpg (verdict giver wipes).
