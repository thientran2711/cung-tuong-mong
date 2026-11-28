# E-S5-R5-speed-3 — player review (pf / pt_su, speed = rushes, Fold 755×1000, seed 1590092324, bot=bold)
PRIORITY #1 CHECK: OD 25/11 rules | harness f65d019b (+ probe harness copy for the last ~300 buổi) | CLAIMS E-S5 | gift-picker trap: parked twice, resumed on Pages 166bd0a3 (kri-xl, ancestor 786f65ad per C10) | flag «mixed build (kri-xl resume)» — 5 builds across the life: 520c85b0/fdc4fec0cd62 → d9ca7892+/86170222adab → 8a171afc+/08960515ebeb → 166bd0a3/ab73feec1114 → 7be54246/1ac67ee47871 (VALID per Foreman E).
## 1. Summary
Persona speed (bot=bold). Origin pf (Công chúa Phù Tang hòa thân), road pt_su (harem life). FOLD life. Ended by death «Hồng nhan bạc mệnh — Tuổi trời đã tận, trọng bệnh không qua khỏi, thọ 25 tuổi»: age 25, year 7, final rank 0 (rank 1 → 0 at year 1 turn 8 and again at year 4), 976 buổi, 5485 taps after the last resume, jsClicks 0, dead buttons 0, stuck 7 (4 «no progress 15 min» + no-clock loops, all recovered), audit MIXED-BUILD. Real time ≈ 30 h wall across two parkings (the life sat in the gift-picker trap for hours).
## 2. Scores
a. First 15 minutes — 6  b. Pacing — 2: the same gift chooser and boards looped for hours; the life moved ~130 buổi in 90 min while trapped  c. Buttons & UI — 4: the chooser confirm «Biếu» off-screen after 8 real scrolls ×11, «re-opened 3× with no gift given» ×8, «Phòng bị» dialog with no close/next, #kload with no button for 31 s  d. Story — 5  e. Characters — 4  f. Choices & fairness — 4: «Đồ trong rương · TỐN món đồ 1» promised a gift and gave «ta không được gì, cũng không mất gì» (old UI)  g. Rewards — 3  h. Mini-games — 6: 69 boards played to a result; KG82 phase stays «play» after a round ended ×1  i. Visuals — 7  j. Co-op — n/a
## 3. Top
Loved: when the picker finally worked in grid mode the gift felt like a real act; the end card of a fever death at 25. Hated: hours inside one gift chooser; boards that replay with nothing earned; a cold palace life decided in year 1. Would I play another life? Yes.
## 4. BUGS
1. [game] gift chooser «Biếu quà làm lành»: confirm «kipgo» off-screen after 8 real scrolls ×11; re-opened 3× with no gift ×8 — fixed in grid mode on kri-xl (speed-1/greedy-5 evidence), still covered in ring mode (K-KRI-RING-BIEU filed by C11).
2. [game] «Sang ngày mới» tapped 3× in one buổi, buổi does not turn (dialog queue Q=1) ×5.
3. [game] SAVE STALE ×4, SAVE REWIND ×2 (1 buổi lost each) — transient.
4. [game] .dlg «Phòng bị» scrolled to the end has no close / next; #kload no button for 31 s.
5. [game] KG82.phase stays «play» after the round ended (board mua shows its result / next «✕»).
6. [stuck] no progress 15 min ×7 on «Khải Tường cung · Tĩnh Nghi trai» / «Vĩnh Hòa cung · Hòa Chương hiên» — the chooser loop.
7. [harness] area tap blocked ×10 (the visible ring card under the tap point — harness false positive on the carousel).
## 5. Suggestions
- Make «Biếu» visible and reachable in ring mode; one clear toast «đã biếu …» after a gift; explain demotions; give the cold palace a goal.
