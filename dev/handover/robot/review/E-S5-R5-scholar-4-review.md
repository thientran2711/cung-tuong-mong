# E-S5-R5-scholar-4 — player review (pf / pt_su, scholar = lore/story reader, Fold 755x1000, seed 1116986736)
PRIORITY #1 CHECK: OD 25/11 rules | harness 97e55a457 → f65d019b | Build 066d9af0+/ef5d32d4ff1e family (no pin; LIVE github.io) | claims E-S5.
## 1. Summary
Persona scholar (bot=sens). Origin pf, road pt_su (harem life). FOLD life. Ended by DEATH «Hồng nhan bạc mệnh — Năm 5, Hoàng thượng niên hiệu Thừa Bình băng hà, thọ 29 tuổi. Tân Thái hậu Lục Kiều Ân xét lại chuyện cũ (khả năng: thấp), ban lụa trắng, ép ngươi tuẫn táng theo tiên đế», age 22, year 5, rank 0, 584 buổi, 4026 real taps, jsClicks 0, exitPick none, mgReady 38. Audit VALID. Real time ≈ 1 h 25 (07:07Z → 08:32Z). 1 bug (JS), 0 stuck, 0 dead buttons.
## 2. Scores
a. 7  b. 6  c. Buttons & UI — 8: no stall on Fold in 4026 taps; one JS ReferenceError  d. Story — 6  e. Characters — 5: named Thái hậu Lục Kiều Ân  f. Choices & fairness — 4: death at «khả năng: thấp» with no defence card  g. Rewards — 4  h. Mini-games — 6: 38 boards started  i. Visuals — 7  j. Co-op — n/a
## 3. Top
Loved: a clean Fold life; lore-rich events. Hated: a JS error after a key choice; no defence before the lụa trắng. Would I play another life? Yes.
## 4. BUGS
1. [js] «ReferenceError: sx is not defined» at y1 buổi 1 right after the event «Phụ hoàng ngã bệnh» (options «Ngày đêm hầu thuốc (Tốn Sức 25)» / «Xin sứ đoàn mời thầy thuốc …»); stack: kcDo (kit option do) → Object.go → anonymous (index.html:82992) — an option handler uses an undefined variable `sx`; the choice's effect may not apply. Repro: Phù Tang road, y1 buổi 1, tap an option of «Phụ hoàng ngã bệnh».
## 5. Suggestions
- Fix the `sx` reference; offer a defence/escape card before the lụa trắng at low odds.
