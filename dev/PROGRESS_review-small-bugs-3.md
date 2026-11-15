# PROGRESS — review/small-bugs-3 (twelve small queued faults, each fixed as a whole class)

Base: origin/main 64e91f1a, merged origin/main 41cdf7c3 (book-title). Does not touch review/small-bugs-2 work (still in review) nor story/quest labels (review/chap-label).
Tests:
- `python3 dev/test/sb3-scan.py` — source scan: every player-visible "thân ±N" relation delta in dev/build/j*.js (must be TOTAL 0).
- `node dev/test/small-bugs-3.js <page> <WxH@dpr> [shotdir]` (env CACHE=<dir>): checks than / caps / from / toast / strip / header / wrap / bl; exit 1 on any hit.
  Page = `printf '<!doctype html><meta charset="utf-8">\n'; cat dev/index.html` after `python3 dev/build/assemble.py` (the charset line matters with python http.server).
- `node dev/test/kit-page.js <page>` (all five sizes) — item 9/10.

| # | Fault | Class fixed | Where | Before (main) | After |
|---|---|---|---|---|---|
| 1 | "thân ±N" wording | every relation delta string "thân ±N" / "nàng thân ±N" / "bớt thân −N" / "Hoàng hậu thân 40+" / "thân thêm theo món quà" → "thiện cảm …" (VANPHONG); jaudit real-number rewrite accepts the new word; VP (j84) rewrites old-save Sổ ghi / Tuần lục lines | 16 modules + j84 + jaudit | 46 source strings (+2 thresholds), test: 3 lines on screen | 0 / 0 |
| 2 | Item names capitalised mid-sentence | one screen rule `VP.itemLow` (j84): any IT / WD_ITEMS name after a mid-sentence word is lower case (proper names inside keep caps); standing alone keeps its capital; old saves too. VANPHONG row "Tên món đồ trong câu" | j84 | 4 of 4 test lines | 0 |
| 3 | Gift box empty / unnamed "from" | goodsGive stores the giver on the item (`giver`) and names it on the box; j67 story gifts resolve "{mis} thưởng…" (stipWho67); a box never draws an empty line | jstip | giver missing on story gifts | named everywhere it is known |
| 4 | Toast over dialog 844x390 | KIT 32.10a: #rtoast + kitLine pill parked while any dialog is open (`kitDialogOpen`, body.kdlg-on), no tap catcher under a dialog, back with a fresh timer after | jk4 | card + catcher + pill over the dialog | none |
| 5a | Palace labels clipped above the face strip | KIT 45.1: kitPcSize fit never leaves `.pstrip` half under the pane bar; re-runs after a same-person re-render | jk2b | 844x390 Phi tần + Cung nhân half under | 0 at all sizes |
| 5b | Name/time block overlap 1000x755 | `kitHdClash` in kitHdFit → two-row bar when her text + 8 px reaches the time block | jk4 | overlap with long date | 0 |
| 6 | 390x844 subtitle wrapping | KIT 15.1: place subtitle min-width:min-content + wrapping title row (was one letter per line) | j79 | 1 | 0 |
| 7 | Bổng lộc legacy table | jecon blCard override → kitRows (KIT §51) | jecon | 16 .pcrow | kit table |
| 8 | k3 state row wraps badly | KIT 31.2a: under 600 px the state row is one wrapping row of whole items (quẻ was cut at the right edge) | jk4 | quẻ past the edge at 390 | inside |
| 9 | #kit §28.1 error without a game | sample uses kit silhouettes when no game runs | jkitpage | "Cannot read … 'out'" | kit-page.js clean, 5 sizes |
| 10 | #kit §53 seals over the page header | every sample `.kitpg-s` is its own stacking layer (isolation) under the sticky header | jkitpage | seals drawn over header | under |
| 11 | Tuần lục cover text fallback fills the label | fallback font 24cqw (was 36cqw) | j87 | "Tuần" 62/66 px | 41/66 px |
| 12 | 390x844 shows title instead of rotate prompt | real phones (host) DID rotate + show a tip, but only once per device for 4 s and wrapped; automation (direct mode) showed nothing. Now the prompt shows every narrow-portrait open until she turns/taps, one line; direct mode shows it too (no tap catching). KIT §0.1 | dev/site/rot.js | once ever / none in tests | every time |

Results (after): dev/test/kit-table.js 1180x820: 1325 lists, 0 fails. small-bugs-3.js all checks empty at 755x1000@2, 1000x755, 1180x820, 1366x1024, 844x390, 390x844; kit-page.js bad 0 at 5 sizes; old save written by main build loads (log line shows "thiện cảm +5", lower-case item).
KIT.md: §0.1, §15.1, §31.2a, §32.10a, §32.12 note, §42.2 note, §45.1, §51 note. VANPHONG: 2 rows.
Not changed (noted): "thù −N" strings (j17 AOUT etc.) are mapped by kitParse to "oán ta +N" on cards — a separate wording class, left as is.
