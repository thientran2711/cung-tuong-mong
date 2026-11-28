# E-S5-R5-greedy-5 — player review (pf / pt_su, greedy = takes everything, Fold 755×1000, seed 1250053385, bot=bold)
PRIORITY #1 CHECK: OD 25/11 rules | harness f65d019b → probe copy for the last ~480 buổi | CLAIMS E-S5 | gift-picker trap (parked 3×, resumed on Pages 166bd0a3 kri-xl, ancestor 786f65ad per C10; evidence stuck/E-S5-kipgo-kri-xl/) | flag «mixed build (kri-xl resume)» — 1dcb373e+/5ab5b80e406e → 166bd0a3/ab73feec1114 → 7be54246/1ac67ee47871 (VALID per Foreman E; game-imposed ending).
## 1. Summary
Persona greedy (bot=bold). Origin pf (Công chúa Phù Tang hòa thân), road pt_su (harem life). FOLD life. Ended by the game-imposed ending «Xuất gia — Xuất gia làm ni cô» (card «Thanh đăng cổ Phật», only button «Chuyển kiếp»): age 37, year 20, final rank 0 (rank 0 → 1 in year 3, back to 0 in year 4, then 16 years at rank 0), 2811 buổi — the longest Fold life of E-S5, 5409 taps after the last resume, jsClicks 0, dead buttons 0, stuck 4 (all in the gift chooser, recovered), 1 tab crash (RAM, buổi 293, resumed same life). Real time ≈ 2 days wall across 3 parkings.
## 2. Scores
a. First 15 minutes — 6  b. Pacing — 2: the gift chooser alone cost days (stuck 4 × «no progress 15 min on .dlg «Biếu quà làm lành»»)  c. Buttons & UI — 4: confirm «kipgo» off-screen after 8 real scrolls ×31; chooser re-opened 3× with no gift ×10; .kmov «Thẻ bài được dâng lên Hoàng thượng» with no close  d. Story — 5: a life told by one end card  e. Characters — 4  f. Choices & fairness — 4: «Đồ trong rương · TỐN món đồ» offers looked cheap and gave nothing  g. Rewards — 4: when the gift worked (items 8 → 6 → 4 → 2) it felt like a real act  h. Mini-games — 6: 27 boards played to a result  i. Visuals — 7  j. Co-op — n/a
## 3. Top
Loved: grid-mode gifting on the kri-xl build (items vanish, a real gift); the quiet «Thanh đăng cổ Phật» end card. Hated: ring mode with many items — «Biếu» covered by DIV.kscn-veil / the ring's «back» button, invisible in the picture, the same 10 items coming back three visits in a row; 16 years at rank 0. Would I play another life? Yes.
## 4. BUGS
1. [game] gift chooser «Biếu quà làm lành»: confirm «kipgo» off-screen ×31, re-opened with no gift ×10, 4 «no progress 15 min» — in ring mode (10 items) the confirm is enabled but covered by DIV.kscn-veil (b2330/33/34) or BUTTON.kri-back (b2342) and not visible in the picture; grid mode (≤8 items) works. Filed by C11 as K-KRI-RING-BIEU. Evidence: stuck/E-S5-kipgo-kri-xl/ (greedy-5-kipdump.jsonl + 2 PNG).
2. [game] SAVE STALE ×5 (transient).
3. [game] .kmov «Thẻ bài được dâng lên Hoàng thượng»: scrolled to the end has no close / next (a small «Chạm để bỏ qua» hint exists at the bottom — likely harness false positive).
4. [game] «Sang ngày mới» no-turn ×1; «no way out: no button of the dialog can be reached» ×1.
5. [crash/harness] tab crashed at buổi 293 (RAM) — resumed same life.
## 5. Suggestions
- Make «Biếu» visible/reachable in ring mode; toast «đã biếu …»; explain demotions; give the 16-year cold-palace stretch a goal.
