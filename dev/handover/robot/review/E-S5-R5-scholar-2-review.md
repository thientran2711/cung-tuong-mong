# E-S5-R5-scholar-2 — player review (pf / pt_su, scholar = lore/story reader, FOLD 755x1000, seed 2813902882)
PRIORITY #1 CHECK: OD 25/11 rules | harness 97e55a457 → f65d019b (same-life resumes ×4, 1 tab crash at buổi 1318) | Builds 540358c4+/5a7a9c4004c1 → 066d9af0+/ef5d32d4ff1e (LIVE moved mid-life: MIXED-BUILD per audit, VALID per Foreman E) | claims E-S5.
## 1. Summary
Persona scholar (bot=sens). Origin pf, road pt_su (harem life). FOLD life. Ended by the game-imposed ending «Lãnh cung — Tuổi xuân qua đi» age 40, year 23, rank 0, 3512 buổi, 3047 taps after the last resume, jsClicks 0, exitPick none, mgReady 26. Audit VALID (flag MIXED-BUILD). Real time ≈ 9.5 h (02:31Z → 12:00Z 27/11 incl. 4 same-life resumes).
## 2. Scores
a. 6  b. 2  c. Buttons & UI — 5: save quota (game), 1 tab crash (runner memory)  d. Story — 3  e. Characters — 3  f. Choices & fairness — 4  g. Rewards — 2  h. Mini-games — 6  i. Visuals — 6  j. Co-op — n/a
## 3. Top
Loved: a Fold life without dead buttons. Hated: 23 empty years; the save that silently stops saving. Would I play another life? Not this road.
## 4. BUGS
1. [game, HIGH] localStorage save quota: «QuotaExceededError» ×3641 (key hclh-save-v2-1 ≈ 5.2 M chars), SAVE STALE ×7, SAVE REWIND ×1 — same bug as random-4 (BUG FAST LANE sent 08:25Z 27/11); now reproduced on Fold.
2. [harness] one area tap blocked on a button that appeared under the point; tab crashed at buổi 1318 (runner memory).
## 5. Suggestions
- Same as random-4: compress the save or move to IndexedDB; warn before the quota.
