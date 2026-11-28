# E-S5-R5-skilled-3 — player review (pf / pt_su, skilled = core gamer, iPad, seed 618859327, bot=sens)
PRIORITY #1 CHECK: OD 25/11 rules | harness f65d019b (pin=0) | CLAIMS E-S5 | save-quota family known (rv26 packed save) | «Để sau» family already filed (skilled-2/-4/-5, speed-2) | Foreman E child7 rulings (MIXED-BUILD valid, save-quota flag).
## 1. Summary
Persona skilled (bot=sens). Origin pf (Công chúa Phù Tang hòa thân), road pt_su (harem life). iPad life. Ended by the game ending «Lãnh cung — Tuổi xuân qua đi»: age 40, year 22, final rank 0 (fell rank 1 → 0 in year 2, buổi 134, and never came back), 3733 buổi (the longest E-S5 life), 3035 taps after the last resume, jsClicks 0, dead buttons 1, stuck 0. Audit: MIXED-BUILD (a7f223b6780d → 128ec6b7d5fa → ca4a1689/0b372aa14258; VALID per Foreman E) + save-quota flag. Real time ≈ 28 h across resumes (1 same-life page crash at buổi 1295; reload onto LIVE at buổi 3339 repacked the save 5 227 392 → 422 640 chars).
## 2. Scores
a. First 15 minutes — 7  b. Pacing — 3: 20 of 22 years spent in the cold palace with the same dialogs (411 decrees / invitations seen, 297 taken)  c. Buttons & UI — 6: «Danh hiệu lên bậc» «Để sau» no effect ×3  d. Story — 4: the first 2 years are a story, the next 20 are a calendar  e. Characters — 4  f. Choices & fairness — 4: nothing I did in 20 years changed my rank (Danh 0, Sủng 0)  g. Rewards — 3  h. Mini-games — 6: boards play to a result  i. Visuals — 7  j. Co-op — n/a
## 3. Top
Loved: the year-1 opening and the end card «Tuổi xuân qua đi» that names what the 20 years were. Hated: a life that is decided in year 2 and then plays itself for 3600 buổi; a save that silently stopped saving at 5 MB (QuotaExceeded ×3141 with no warning to me); «Để sau» that does nothing. Would I play another life? Yes — but not this one again.
## 4. BUGS
1. [game] QuotaExceededError: save no longer fits localStorage (5.2 MB at ~buổi 3290; ×3141); every later save lost, no warning to the player. Cured on LIVE by rv26 packed save (5 227 392 → 422 640 chars on reload). Bug row kept: no player warning on save failure (filed for MAIN by child7).
2. [game] SAVE STALE ×6 / ×4 (stored save stops following the live game) + SAVE REWIND ×6.
3. [kit/game] «Danh hiệu lên bậc» «Để sau» tapped 3× for real, dialog stays — same family as skilled-2/-4/-5, speed-2.
4. [harness/page] tab crashed at buổi 1295 (RAM) — resumed same life.
## 5. Suggestions
- Cold palace needs a way out or a goal per season; pack the save (done on LIVE) and warn on save failure; fix «Để sau»; fold repeated tấn phong cards.
