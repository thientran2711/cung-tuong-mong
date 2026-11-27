# E-S5-R5-random-4 — player review (pf / pt_su, random = casual newcomer, iPad 1180x820, seed 2564901989)
PRIORITY #1 CHECK: OD 25/11 rules | harness 8ea10d7e → 97e55a457 → f65d019b (same-life resumes ×9, 2 of them after Page crashed at buổi 2879/3032) | Builds: 5ab5b80e406e (pinned, 8729) → LIVE (pin released ~buổi 2076) → …ef5d32d4ff1e: MIXED-BUILD per audit, VALID per Foreman E | claims E-S5.
## 1. Summary
Persona random (bot=rand). Origin pf, road pt_su (harem life). Ended by the game-imposed ending «Lãnh cung — Tuổi xuân qua đi» age 40, year 23, rank 0, 3532 buổi, 4403 taps after the last resume (≈ 58 000 total), jsClicks 0, exitPick none, mgReady 267 (boards played). Audit VALID (flag MIXED-BUILD). Real time ≈ 52 h (05:15Z 25/11 … first run; resumed ≥9 times, last start 05:50Z 27/11 → end 08:12Z 27/11).
## 2. Scores
a. 6  b. 2: 23 years, one map page  c. Buttons & UI — 4: Hàm An map cards covered ×11 (dead buttons, .mapsc), «Biếu quà làm lành» confirm off-screen ×6, item grid re-opened 3×, 2 tab crashes (runner memory), a .kmov picker stall  d. Story — 3  e. Characters — 3  f. Choices & fairness — 4  g. Rewards — 2  h. Mini-games — 6: 267 boards started  i. Visuals — 6  j. Co-op — n/a
## 3. Top
Loved: 267 boards played to a result; a stall-free long run. Hated: a save that silently stops saving. Would I play another life? Not this road.
## 4. BUGS
1. [game, HIGH] localStorage save quota: «QuotaExceededError» ×4170 — the save (key hclh-save-v2-1) reaches 5.22 M chars at year ~14–23 and j6 save() swallows the error, so every later save is lost; «SAVE STALE» ×8, «SAVE REWIND» ×3 (the game went back to an older save). A real player on a long life (~year 14+) would lose progress silently. Repro: play one life 2000+ buổi; log E-S5-R5-random-4.log line ~229.
2. [kit] Hàm An map cards («1 bóng · 1 khắc», «Nhà ta · Ta + 1 bóng», «5 bóng · 2 khắc», …) covered by a layer: dead buttons ×11 (shots shots-E-S5-R5-random-4/dead-ipad-*.png).
3. [game] «Biếu quà làm lành» / «Dâng quà lên Thái hậu» item pick grid: the confirm «kipgo» stays off-screen after 8 real scrolls ×7; grid re-opened 3× ×2.
4. [harness] picker stall on a .kmov; tab crashes at buổi 2879 / 3032 (runner memory).
## 5. Suggestions
- Compress the save (dedupe dialog queue, cap logs) or move it to IndexedDB; warn the player before the quota.
