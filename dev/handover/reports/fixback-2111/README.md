# fixback-2111 — before/after PDF of the owner's 21/11 marks

PRIORITY #1 CHECK: OD 21/11 ~02:20Z (fix-back file separate) + ~05:50Z (this order) | main: ui-tour-states capture helpers (review/ui-tour-states dev/test/ui-tour-states/) reused, copied into dev/test/fixback-2111/ | review/* none for this PDF | claims fixback-pdf row (session_01Rc5AsJwwnByo4hzkXcabXJ).

Owner (verbatim): "Cho tôi cái file PDF before after. Before chính là những cái hình mà tôi gửi bạn, after là hình bạn đã sửa."

`fixback-2111.pdf`: cover (LIVE / đang duyệt / đang sửa / không cần sửa · chờ sếp + table of all 85 marks), then one page per mark: LEFT = her marked shot (CDN `img/_review/refs/owner-2111-*.jpg`), RIGHT = AFTER.
- LIVE marks: the same screen on origin/main (sha on the cover), Fold 755x1000 + iPad 1180x820, plus «Đã sửa: …».
- Not LIVE: «Đang sửa · <thợ> · <trạng thái>»; when a review branch with the fix exists and the screen could be reached, its shot is labelled «bản đang duyệt (review/…)» (chiton-name-rv2, empty-states, chapter-card, calendar-rv).
- Status per mark: `marks_vi.py` (from dev/handover/OWNER_MARKS_2111.md: last row per #, LIVE when a row names a LIVE sha that is on origin/main; review branches checked on origin).

## Re-run when more fixes land
1. Update `marks_vi.py` (status / «Đã sửa» line) from OWNER_MARKS_2111.md; add a view for the mark in `dev/test/fixback-2111.js` (`M` table: tab / sub-tab / clicks) if it is new.
2. `CTM_ROOT=<checkout of origin/main> node dev/test/fixback-2111.js main <shots> <marks>` (review branch: same with its checkout and a label from `REVIEW` in compose.py).
3. Refs: `curl https://ctm-img.victoria-tntt.workers.dev/img/_review/refs/<name>` into <refs>.
4. `python3 compose.py dev/handover/OWNER_MARKS_2111.md <refs> <shots> <work> <main sha>` then `node render.js <work>/fixback.html fixback-2111.pdf` (keep < 25 MB).

Not captured as AFTER (no fix live and no reachable review screen yet): the not-LIVE dialog-family marks (#44, #47–#85) — shown as worker + status only.
