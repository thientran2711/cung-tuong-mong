# OUT-OF-ORDER SWEEP (owner order 26/11 ~03:40Z via MAIN 151) — ROLE B #7
PRIORITY #1 CHECK ('pushModal|showModal|Q.push|out of order|Sai đi dò la'): OD 26/11 ~03:40Z row | main f009e1a6 j3.js:22 pushModal, j3.js:74 showModal, j78.js:116 maid «Sai đi dò la», jagacts2.js:40 | review/* button-crawl-fix-10 5ce18280+ (oo probe) | claims E96 dialog-order session_01DgYSWkVu3mJTZ8LRPwH1Jm.
Tool: `node dev/test/button-crawl.js --dev fold,ipad --start home --depth N [--expand <regex>]` (review/button-crawl-fix-10): real finger taps only; after every tap it probes (a) a visible dialog layer whose centre is covered by ANOTHER dialog layer, (b) the dialog queue Q grew while its FRONT item stayed the same = the new dialog went to the BACK and shows nothing until the open box is closed (her case). Row = «OUT OF ORDER — …» + shot.

## What the real-tap sweep saw (LIVE f009e1a6, Fold 755x1000)
| run | taps | out-of-order rows |
|---|---|---|
| home depth 2 (all tabs, every act card, tab panels) | 615 | 0 |
| Hậu cung / Giao tình branch depth 4 (person lists, Phi tần/Cung nhân/Thái hậu/Nam nhân, Phe phái › Triều đình, look-ups) | 302 | 0 |
Not reached by the generic crawl: the maid PERSON CARD → «Âm mưu» tab → «Sai đi dò la» (the new life has no maid focus token in the crawler's saves; Cung nhân › shows only «Người lạ»). The sweep therefore does NOT prove that case fixed — see root cause below, which is by code and applies to the whole family. iPad 1180x820 not run for the deep branch (two container restarts killed runs); depth-2 iPad earlier = 0 faults.

## ROOT CAUSE (code, LIVE f009e1a6) — the family
- j3.js:22 `pushModal(m){Q.push(m)}` appends to the BACK; j3.js:74 `showModal()` shows Q[0] only.
- A look-up card (maid person card, «Tâm trạng · X», «Đã biết về X») is opened at the FRONT (kitPanel front + showModal). A button INSIDE that card that opens another dialog with `pushModal` / `Q.push` puts it behind the open card: nothing visible changes; after ✕ of the card the queued dialog (pick-who) appears. = her case (maid card → Âm mưu → «Sai đi dò la» shows nothing; after ✕ the pick-who dialog appears). j78.js:116 wraps the same act (`go:j78maidSpy`, jact.js:33 «Sai cung nữ đi dò la … (chọn người khi sai đi)»).
- Call sites that can open while another box is shown: `pushModal(` ×37, `Q.push(` ×247, `Q.unshift(` ×62 (front) in dev/build/j*.js. Biggest users of pushModal: jcoopworld.js 19, jpma.js 4, jslap.js 3, jlooks.js 3, jact.js 2, j3.js 2.
- Fix direction (for E96 / E-e, one rule, law 11 whole family, law 9 kit): a dialog opened BY A BUTTON INSIDE an open dialog goes to the front (Q.unshift + showModal, the opener resumes after, or stack as «layer on top» with its own ✕ returning to the opener) — never to the back. Dialogs opened by the game itself (events, notices) keep the back-of-queue order. Needs one helper (e.g. `openOver(m)`) used by every act/option handler; a scan = grep every handler that runs while Q.length>0 and calls pushModal/Q.push.
- Regression check ready: the crawler's oo probe (`--depth 4 --expand` into Hậu cung person cards once the maid-focus state exists) + a deterministic probe: open maid card, tap «Sai đi dò la», assert the pick-who dialog is the visible top within 1 s (elementFromPoint).

## Table (tab · act · what showed · what should show · shots)
| tab | act | what showed | what should show | shots |
|---|---|---|---|---|
| Hậu cung › maid person card › Âm mưu | «Sai đi dò la» | (owner report) nothing; pick-who dialog only after ✕ | pick-who dialog on top at once | none by robot (state not reached); reproduce by code path above |
| Hành sự / Hậu cung / Giao tình / Tài nghệ / Tư trang / Dư đồ / Mệnh truyện (all acts + frames, depth 2, 615 taps) | every act + option | opened on top or replaced the box | same | 0 rows |
| Hậu cung/Giao tình branch (302 taps) | person lists, look-ups, Biếu quà | on top | same | 0 rows |
