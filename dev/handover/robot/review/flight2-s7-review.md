# flight2-s7 end-of-life review (PARTIAL — life stopped INVALID-env: mixed game build)
PRIORITY #1 CHECK: ROBOT-PLAYER-REVIEW.md §B; evidence in out7 json/md/moments.

## 1. Summary
- Persona: random → casual newcomer (never planned, never used items). Origin thd, road thd_tho, Fold 755x1000, real taps, seed 1077992375, no cap.
- Years: 18 game years (S: year 18 tháng 4, age 37, buổi 2972 counted by harness). Max rank: Đáp ứng (rank 0) the whole time. Ending: NONE (still alive). Stopped by runner 10:50Z 11/26/2026: the life began on game build 3762da08+ (2026-11-25T19:34Z) and LIVE is now 6b5d3d05+ (2026-11-26T06:59Z); the page reloads LIVE on every resume (resumes at 07:42Z+ were already on the newer build) ⇒ mixed build ⇒ INVALID-env per F #20. Real time ≈ 28 h wall (06:55Z 11/25 → 10:50Z 11/26) incl. ≥4 container restarts and many harness switches (63f87747 … ec026335).
- Harness lineage: 63f87747, 4523381f, bfe29c95, 6d3a128f, 27c4d924, 95718760, 10fbc51c, 594fa1ee, 64d62d9b, d417d3bb, 7ca6b369, b4b181f8, 496b6b66, 8dc395ba, 4d7a22c6, d2e03d80, fd9218fe, 89f5b956, 08a4ff8b, ec026335.

## 2. Scores (1–10)
a. First 15 minutes — 6. Dawn scenes and the first rooms are beautiful (11/25 07:10Z «Bình minh mùa xuân»), but as a newcomer I never learned what raises rank: Sủng stayed 0–5 for 140 buổi, only the first thị tẩm (buổi ~146) lifted it to 31.
b. Gameplay loop & pacing — 3. Same map-room wandering (150-tap no-clock loops ×10+), repeated «Tin báo», stipend rows; after year 3 nothing changed for 15 more years (rank 0, Bạc 4, Danh 3 at year 18).
c. Buttons & UI — 4. Dead/covered: pet dialog item popup covers the next cards; «Tin báo» and «Kính sự phòng báo tin» had no usable ✕ (long list + only «Kéo xuống»); option card edge tap did nothing (inner text tap works); greyed «Sang ngày mới» with queued dialogs not shown (softlock Q=17, Q=15, Q=8); #kmrew «Nhận» flagged no-close by harness (harness FP).
d. Story & drama — 4. Gossip lines with «???» people; same names repeating (Uyển tần Hách Hàm Yên); little follows from my (random) choices.
e. Characters — 5. Palace figures look alive in room art; but no one reacts to 15 years of passivity (no demotion, no pressure, no death).
f. Choices & fairness — 4. «Đổi phần thưởng» card shows TỐN không / ĐƯỢC không; single-option scenes («Tắm gội chờ giá») are forced; no option ever warns that doing nothing is a choice.
g. Rewards & feedback — 5. Stipend «Bổng lộc» card list is a lovely feeling but shows 3 identical rows; Sủng +30 after thị tẩm felt great.
h. Mini-games — n/a (robot rule: only when I play them; harness plays boards to the end since 95718760).
i. Visuals & sound — 8. Art is the best part; no odd sounds heard (robot cannot hear).
j. Co-op — n/a.

## 3. Loved / hated
- Loved: dawn season scenes; room art with figure pairs; the odds ladder «Thang cơ duyên» (clear, cổ trang).
- Hated: unstacked inventory (1,437 entries by year 18 → 43,526 DOM nodes, 2.4 GB renderer, 15-min stucks); hidden/overlapping dialogs; no sense of goal.
- Would I play another life? Only if the first hour told me how to rise in rank; as a newcomer I coasted for 18 years without any consequence — that is the opposite of drama.

## 4. BUGS (details/shots in flight2-s7.json bugs[60], moments, handover dir flight2-s7-stuck/)
1. GAME: S.inv grows unbounded & unstacked from the monthly stipend (from:'noivu': alnen0 518, aldau0 154, tragoi 145, vaibong 127, lxmay0 89, lxson0 88 = 1,437 entries at year 18); lists render one card per entry → DOM 43,526 nodes, renderer 2.4 GB, save 4.8 M chars, page freezes (watchdog at b140: renderer 3.07 GB). Save: handover 243e2481 ls-b2928-inv1437.json.gz. Fix in progress: review/inv-stack.
2. GAME: person/news dialog queue has no dedupe («Tin báo» ×4 copies; each close pops one — looks like a dead ✕).
3. GAME: possible softlock «Sang ngày mới» greyed with no dialog on screen while Q holds 8–17 dialogs (b281 Q=17, later Q=15, Q=8; Q=1 «Tin trong cung buổi này» recovered). Save b281: handover 905a7604 softlock-q17-ls.json.
4. GAME UX: dialogs with only «Kéo xuống» and no visible ✕ («Tin báo», «Danh hiệu», «Bổng lộc»).
5. GAME: «Đổi phần thưởng «Trăng soi rèm ngọc»» card TỐN không / ĐƯỢC không (gain-and-loss law 3?).
6. GAME: stipend list repeats identical items instead of ×N.
7. Possible: rank never rose in 18 years and the life never ended (no natural death/aging pressure for rank 0) — design call (MAIN 152).
8. ENV: container restarted ≥4× (08:33, 08:51, ~08:57, 10:42Z 11/26) — not game.
9. Harness FPs (fixed by later harness): #dawn dead-buttons, #kmrew «no close», option-card tap point, pet «Xem…» false dead.

## 5. Suggestions (parked, law 18)
- Stack identical items + auto-sell/cap stipend duplicates; virtualize long lists.
- A first-hour goal prompt («lên Quý nhân cần…») and consequences for long passivity.
- ✕ always visible on scrolling dialogs.
