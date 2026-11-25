# m-fix-2 — F M-FIX-2 (opus fixer, Foreman F #7), 11/25/2026
PRIORITY #1 CHECK ('còn . lần dùng|lần dùng|kg82ok|kitOvSync|kpop max-height'): OD 1 (OD:L1352 «không cần cái chữ đã hiểu» → no «Đã hiểu» on info frames) | ledger 0 | claims 0 | main: jk4.js kitOvSync/kitOvBtn (KIT 32.10), jallot.js:115 + jration.js:191 (note wrappers), jitd.js kitItemDetailRows, j79.js kpPop | review/* 0 | reused: kit ✕ + kitOvBtn (unchanged), kitItemDetailRows note line, kpPop.
Branch review/m-fix-2 from LIVE origin/main 9f72524b (m-fix-1 NOT included). START_CTX ~8 %.

## Item 1 — result card main button hidden
Repro (LIVE 9f72524b, real taps, Fold): title → Bắt đầu kiếp mới → roulette → Nhận thân phận → Vào cung → Vào điện → Dâng … → Tuyển chọn intro «Để tài nghệ quyết định» (#kg82skip) → result «10/10 · Xuất sắc (để tài nghệ quyết định)» with #kg82ok + .kg82act hidden (rect 0).
Root cause (hidden-setter stack trace): jk4 `kitOvSync` — it hides EVERY result button found by `kitOvBtn` (#kg82ok/#kg92ok/#mgok) and the kit ✕ presses it.
For «Đã hiểu» this is the OWNER RULE (OD:L1352, KIT 32.10: no «Đã hiểu», close = ✕ / tap outside). Verified on LIVE: real tap on ✕ and a tap outside both close the card and the game goes on («Tiếp theo»), Fold + iPad. So the Tuyển chọn case is BY DESIGN (law 16: not undone); the robot must close a result with the ✕ / tap outside.
Real family fault found: the same code hid result buttons that are NOT close words — jexam «Môn kế tiếp» / «Xem kết quả» (multi-round exam) and jmgcal «Thử môn khác» / «Dừng ở đây»: the only way on was a ✕ labelled «Quay lại» that actually went FORWARD.
Fix: jk4 `kitOvPlain(b)` — kitOvSync hides the button only when its label is exactly «Đã hiểu» or «Xong»; a step label stays visible next to the ✕ (✕ / tap outside still press it, unchanged order KIT §13.9).

Family scan (`dev/test/mfix2-resbtn.js`, real taps, synthetic kg82 result per label; label scan of every `id="kg82ok|kg92ok|mgok"` in dev/build: 13 sites — 11 «Đã hiểu»/«Xong», jexam 1 step label, jmgcal 1 step label):
| label | before: shown / hit / ✕ moves on | after Fold 755x1000 | after iPad 1180x820 |
|---|---|---|---|
| Đã hiểu | hidden / – / yes | hidden / – / yes | hidden / – / yes |
| Xong | hidden / – / yes | hidden / – / yes | hidden / – / yes |
| Môn kế tiếp | hidden / – / yes | shown / hit / tap moves on; ✕ yes | same |
| Xem kết quả | hidden / – / yes | shown / hit / tap moves on; ✕ yes | same |
| Thử môn khác | hidden / – / yes | shown / hit / tap moves on; ✕ yes | same |
| Dừng ở đây | hidden / – / yes | shown / hit / tap moves on; ✕ yes | same |

## Item 2 — repeated «· còn 6 lần dùng» in the «Ghi chú» pop-up
Root cause: not a cached string — the jallot (Dầu chải tóc) and jration (son phấn boxes) wrappers of `kitItemDetailRows` add ONE «còn N lần dùng» line PER ENTRY in the chest; a year-5 save holds ~40 bottles → 40 lines; the kit «!» pop-up (`#kpop`, no height cap) grew to 63 % (Fold) / 77 % (iPad) of the screen and covered the dialog rows (realtap sees «covered by #kpop» = robot loop).
Fix (whole group):
1. jitd `kitUseNote(E,{unit,pre})` — the ONE builder: one entry «còn 6 lần dùng»; all equal «mỗi lọ còn 6 lần dùng»; mixed «tổng còn 201 lần dùng · 14 lọ còn 6 lần dùng · …»; with a colour label one line per colour («màu đen tuyền: 10 hộp, mỗi hộp còn 6 lần dùng»); at most `BAL.itd.useGroups` (=4, new BAL key, jbal2) lines + «và N hộp khác». Used by jallot (unit lọ) and jration (unit hộp, colour label).
2. jration `lxColRows` mirror row: item names were also listed once per box («Than liễu, Than liễu, …») → de-duplicated.
3. Kit pop-up `#kpop` (j79): max-height calc(50dvh − 16px), scrolls inside — a tip never covers its own dialog; it already closes on the next tap anywhere.
Scan of the group: every `o.note=` wrapper of kitItemDetailRows (jallot, jration — only two append per-entry text; jdc, jweather copy `o` and add rows once = idempotent); every `inv.filter(k===k)` list in a note: only these two.

`dev/test/mfix2-usenote.js` (real taps on «!», tap-away, ✕):
| case | before lines / pop height (Fold · iPad) | after lines / pop height (Fold · iPad) |
|---|---|---|
| 40 equal bottles (aldau0) | 40 / 38 % · 46 % | 1 / 12 % · 14 % |
| 40 mixed bottles | 40 / 38 % · 46 % | 4 / 14 % · 17 % |
| 1 bottle | 1 / 10 % · 12 % | 1 / 10 % · 12 % |
| 40 boxes, 6 colours (lxmay0) | 40 / 63 % · 77 % | 5 / 19 % · 23 % |
| 40 mixed boxes | 40 / 63 % · 77 % | 5 / 17 % · 21 % |
All cases after: «!» tap hit, pop closes on the next tap, card ✕ real-tap closes; 0 page errors.

## Tests
- monthly-allotment.js 755x1000: PASS all (run alone; under 4 parallel runs it timed out on both builds).
- monthly-ration.js 755x1000: FAIL borrowGot only — pre-existing (LIVE baseline fails borrowGot + 2 mirror checks).
- kit-popup-layer.js 755x1000,1180x820: FAIL art-rule NO POPUP — pre-existing, identical on LIVE baseline; note-bang / tap-word / fact-tap ok.
- mfix2-resbtn.js + mfix2-usenote.js: Fold + iPad as tables above.
KIT.md updated in place (§13.9 ✕ line, §55 exam line, kpPop paragraph). No new CSS look, no new kit part (kit rule changed inside the kit parts jk4 / j79 / jitd). Wording cổ trang, no %.
Not done: the s5d save itself (asked session_01UV1SzjctgUqhWfuo3XVo2r to push it; reproduced with a synthetic 40-bottle chest instead).
