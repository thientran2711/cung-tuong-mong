# PLAYER REVIEW — E-S1-R1-greedy-5-1522350896 (thd / thd_tho, Fold phone, persona greedy)

PRIORITY #1 CHECK: ROBOT-PLAYER-REVIEW.md §B; moments in rerun-E-S1-E-S1-R1-greedy-5-1522350896-moments.md. Scope: AI runner on a real-tap harness; end shot + moment log + full bug table, not every buổi.

## 1. Summary
- Persona greedy (harness `bold`), origin thd · road thd_tho, seed 1522350896, Fold, real taps (11799 counted in the last harness state, jsClicks 0).
- Age 40, year 23, 3154 buổi, rank 0 throughout, ending «Lãnh cung — Tuổi xuân qua đi» (game-imposed, no bot exit pick); VALID. 500 offers seen, 332 taken. Boards: hat ×296, mua ×174, tho ×9, dan ×7, theu ×6, ban/dauho/doden/huong ×4 each, kim ×2, ve ×2 and more.
- Flags: «mixed build» ×3 — gift-picker fix resume (LIVE 24beb1a4), ui3 resume (ca4a1689), kri-xl resume (166bd0a3) — plus a LIVE update (7be54246) picked up by an unstick reload at the end. Parked twice for the picker (K-PICK-GO-REACH): first on the pre-fix build, then on 24beb1a4; unpinned on ui3/kri-xl the picker no longer looped.
- Builds: 5ab5b80e406e → 24beb1a4 → ca4a1689 → 166bd0a3 → 7be54246. 1 tab crash (buổi 703) before the renderer-mem fix.

## 2. Scores (1–10)
a. First 15 minutes — 4. Pop-ups before the first free tap; goal never stated.
b. Gameplay loop & pacing — 3. 3154 buổi, rank 0 for 23 years; same festival cards, then Lãnh cung.
c. Buttons & UI — 4. Gift picker «Biếu quà làm lành» confirm off-screen (×18+3 on older builds, gone on kri-xl); «Sang ngày mới» did not turn ×14; dialogs scrolled to the end with no close (Tết Đoan ngọ, «Phòng bị», .kmov).
d. Story & drama — 5. Event writing good; nothing changes rank.
e. Characters & interactions — 4. People are look-ups; «Làm lành với …» is the only relationship beat.
f. Choices & fairness — 5. Options show Tốn/Được and odds words; the apology cards «Tạ lỗi / Nhún nhường» show «Rất vững».
g. Rewards, feedback & emotion — 4. The end card «Xuân tàn lãnh cung · Tiếp theo» is clear; no feeling of progress for 23 years.
h. Mini-games — 7. Hundreds of boards really played (hat 5/10, mua 8–10 raw); debut boards «ve»/«kim» less so.
i. Visuals & sound — 6. Art strong; sound not testable.
j. Co-op — n/a.

## 3. Top 3 loved · hated · replay?
Loved: (1) event writing and art; (2) the many boards that really play; (3) the clear end card.
Hated: (1) the gift picker dead-end on the older builds; (2) 23 years in Lãnh cung with no goal; (3) «Sang ngày mới» that does not turn.
Replay another life? Not before Lãnh cung has a goal.

## 4. BUGS found (shots/saves in the runner out dir, not in git)
1. GAME KIT — gift picker: confirm «kipgo» off-screen after 8 real scrolls ×18 (+×3 in «Biếu quà làm lành»), re-opened 3× with no gift ×8+×2, no item can be given ×1 (932 items) — all on 5ab5b80e / 24beb1a4; on ca4a1689 (ui3) and 166bd0a3 (kri-xl) no loop and no stuck. Parked twice; resumed accordingly.
2. GAME — SAVE STALE ×23 (the stored save stopped following the live game, no setItem error), after the save-stack change on LIVE.
3. GAME — «Sang ngày mới» tapped 3× and the buổi does not turn (Q=1 «Có người đến») ×14 + «Chờ tin» ×1.
4. GAME — dialogs scrolled to the end with no close/next: «Tết Đoan ngọ · Thi đối câu» ×1, «Phòng bị» ×1, «.kmov» ×1 (harness unstuck by taps); STUCK ×2 (15 min) at buổi ~780 on the pre-ui3 picker.
5. PERF — tab crash at buổi 703 (before the renderer-mem fix).
6. DEAD — «Để sau» on «Danh hiệu mới» ×1 — on an older build only (K-DH-LATER: 0 hits on 166bd0a3+ in this run; void for MAIN 188).
7. HARNESS — area tap blocked ×11 (button under the point).
8. DESIGN — Lãnh cung has no goal; rank 0 for 23 years.
End card: CLEAN on the unpinned LIVE s=7be54246 (no «Bổng lộc» over it; third clean unpinned end after ES7-R8-speed-4-h / -5-h).

## 5. Suggestions (player view; feature freeze, MAIN files new-feature ones)
- A goal or way out of Lãnh cung. · Keep the packed save from going stale. · Let «Sang ngày mới» say why it does not turn.
