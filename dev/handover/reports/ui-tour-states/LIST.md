# UI tour — FILLED STATES (separate file; ui-tour.pdf untouched)

Owner 21/11 ~02:20Z (verbatim): "Rồi cái chỗ này nè, biết là ta chưa vào phe nào nhưng mà vẫn phải cho tôi nhìn cái giao diện khi mà có phe như thế nào để tôi còn biết, tôi còn điều chỉnh nữa chứ. Tức là bạn phải show cho tôi á, là tất cả những cái khung có thể xảy ra, có thể thấy được ở trong cái game này mà. Hiện tại là tôi đang ở trang 63 trên 350 trang. Thì mấy trăm trang còn lại thì tôi không biết là nó có include cái này chưa. Nếu mà có rồi thì thôi, còn nếu mà chưa là bạn cần update. Nhưng mà khi bạn update là tôi cần bạn update một cái file riêng, chứ không có bỏ lại chồng lên cái file này nha."

PRIORITY #1 CHECK: OD 21/11 02:20Z + 01:52Z | main: dev/test/hoang-tu.js (kids seed reused), dev/test/gift-ui-shots.js, fac-parity-play.js (faction calls) | review/ui-tour 6d43f4bc (start-of-life states only; its capture scripts were not committed) | claims: ui-tour-coop (co-op, separate worker).

Build: origin/main **c3a398dd** (assemble.py + build_site.sh), served from disk by Playwright routes. Read-only: no game code changed. Shots at deviceScaleFactor 1, Fold portrait 755x1000 left, iPad landscape 1180x820 right, TOC first. Scripts (re-runnable): `dev/test/ui-tour-states/` (README.md there).

## What was empty in ui-tour and is now shown FILLED

The life is seeded through the game's own functions (seed.js): Quý phi (rank 5), Con gái Tể tướng; her 4 children (2, 9, 16, 17) + rivals' 5 children (heir order, Thái tử); 3 factions (hers + 2 others, members, strength); 6 men met; 3 pets; items of every Tư trang kind; Việc nhờ in progress + debts + palace news; the 17-year-old daughter betrothed; grand endings earned in Sổ ghi.

| Section | Pages show |
|---|---|
| A. Tab — đời đầy đủ | every tab group, sub-tab, kit sub-tab row and scrolled view: Hành sự (Quý phi acts), Dư đồ, Hậu cung › Chí tôn/Phi tần/**Nam nhân (6 men)**/Cung nhân, Giao tình › Ân oán (Ta/Chí tôn/Phi tần) / **Phe phái (in a faction, 3 factions)** + Triều đình, Hoàng tự › **Con của ta / Kế vị / Hoàng tự trong cung / Hôn sự (betrothed) / Quý tộc kén rể**, Tư trang › Túi đồ + **all 11 filters** / **Thú cưng (3 pets)** / Việc, Tài nghệ (all rows + Tác phẩm), Mệnh truyện (chapter rows: Sắc phong, Đã qua, Triều cục, Tâm nguyện) / **Việc nhờ (Đang làm, Nợ ân, Trong cung)** / **Sổ ghi (endings earned)** |
| B. Tab — khi ta là Hoàng hậu | Hậu cung, Giao tình, Hoàng tự as the Empress |
| C. Popup — trạng thái đầy đủ | Phe phái with no faction while 3 exist; **a notice waiting** (HUD) + notice tray + faction invite card + result; Việc nhờ offer card + result; **Bàn hôn sự** card + after the choice; thị tẩm chain (Chuẩn bị → Đêm thị tẩm → thưởng); **Trước gương đồng (dress picker)**; act buttons of filled views (child care, kén rể dò hỏi, ly gián, Việc nhờ) and the dialog/result each opens |
| D. Trò chơi nhỏ — màn kết quả | the result screen of **all 31 mini-game kinds** (Tự luyện, «Để trời định») + contest podium (Vinh danh) and the card after it |
| E. Lời dặn tân thủ | **every tutorial card** (Game này là gì 1–4/4, lời dặn 2/12 … 12/12) |
| F. Cung nữ — popup chụp lại | 14 cung nữ popups retaken after the night fade (the 11 dark ones were dropped in ui-tour) |

## Still not shown, and why (no silent skip)

- **Co-op prompts** — separate worker (review/ui-tour-coop).
- **Endings / death / luân hồi** — already in ui-tour (9 + 1 pages, ge-shots.js); not state-dependent.
- **Mini-game in-play frames per kind** — only the result is shown here (ui-tour has every intro + one in-play); real touch play needed for the rest.
- **Some popups appear only on one device**: the seeded world uses the same random seed, but timers draw differently, so names/events can differ between Fold and iPad; unmatched pages carry «không chụp được ở lượt này» on the other side (cung nữ popups are random events: different ones per device).
- **Nam nhân / Thú cưng act dialogs** — no act button with a cost on those cards in this state (their tab views are shown).
- Known small defects (looked at every page): a few after-choice shots show a result toast over the view (e.g. p.92–93 Fold, p.66–67 iPad queen Chí tôn); some cung nữ page titles name the popup that was queued while a «Lệ tháng» reward card was on top; tutorial page titles carry extra card text.
- Pages: 188 (TOC 2 + 186 frames), 23.9 MB, one file.
- Build is c3a398dd; main moved to 64d2e094 during the run (MAIN 85). Re-run on newest main: `node dev/test/ui-tour-states/cap.js <fold|ipad> <dir>` then compose (README).


## Refresh 22/11 (HELP-M14) on LIVE main d1a36374
- Rebuilt on main d1a36374 (merged into this branch); 182 pages (TOC 3 + 179 frames... see report), 22.6 MB. Fixes in the capture scripts: delayed overlays (edict/bloom/reward/servant cards, stage dialogue «Tiếp▸») are dismissed before each tab shot; sub-tab row retry in walk.js; promotion edict no longer covers the 43 mini-game result pages.
- Still: Fold has no «cuộn xuống» twin where the Fold panel does not scroll (blank «không chụp được»); iPad-only/Fold-only random cung nữ popups; some detail pages show a grey figure ghost (sprite not loaded at shot time); mini-game result card is a thin card (game design, not a capture bug).
