# PLAYER REVIEW — E-S1-R1-random-1-1077992375 (thd / thd_tho, iPad 1180x820, persona random)

PRIORITY #1 CHECK: ROBOT-PLAYER-REVIEW.md §B; moments in rerun-E-S1-E-S1-R1-random-1-1077992375-moments.md. Scope: AI runner on a real-tap harness; end shot + look shots + the full bug table, not every buổi.

## 1. Summary
- Persona random (harness `rand`), origin thd · road thd_tho, seed 1077992375, iPad, real taps (3376, jsClicks 0).
- Age 40, year 21, 3248 buổi, rank 0 at the end (max rank 1), ending «Lãnh cung — Tuổi xuân qua đi» (game-imposed: Trường Môn viện, no bot exit pick); VALID. 673 offers seen, 42 taken; boards played (hat/mua/dan, 14 logged).
- Flags: «mixed build (fix resume)» and «mixed build (pin-server resume)» (Foreman E rulings 26/11 22:42Z and 27/11 01:08Z: VALID), «save-quota» (Foreman E 27/11 01:02Z: VALID at a real end), 3 browser crashes/freezes along the way (buổi 27 crash, 88 and 328 freezes, then the renderer-mem fix).
- Builds: LIVE then pinned 1b5137935266 → d3f360028603 → LIVE fb660cb78eec. Harness 69e41729 → 8ea10d7e → 97e55a457.

## 2. Scores (1–10)
a. First 15 minutes — 4. Many pop-ups before the first free tap; the goal is never stated.
b. Gameplay loop & pacing — 3. 3248 buổi for 21 years; years 3–20 repeat the same festival invitations, «Tâm trạng» look-ups and stipend dialogs; from year ~19 only Lãnh cung with «Sang buổi».
c. Buttons & UI — 2. 34+ «Sang ngày mới» soft-locks (Q=1 «Tin trong cung buổi này»), «Tin báo» with no way out (buttons below the screen), dialog scrolled to the end with no close (.kmov, «Hắt trà»), 12 copies of one «Tâm trạng» dialog, dead «Lui» ×2.
d. Story & drama — 5. Festival texts read well (Thất tịch, Vu Lan, Trung thu); chapters (Chương 12 · Người nối dõi) never explain why rank stayed 0 for 20 years.
e. Characters & interactions — 5. Named consorts appear only as «Tâm trạng» look-ups.
f. Choices & fairness — 6. Option cards show «Tốn/Được» and odds words (law 7 holds); gift picker «Biếu quà làm lành» sometimes has no giveable item (538 items, every confirm greyed).
g. Rewards, feedback & emotion — 4. Stipend dialogs are generous but samey; rank 0 with no goal for 20 years gives no feeling of progress; the end card never appeared.
h. Mini-games — 6. Boards hat/mua/dan played (mua 9/10 raw 10.00); mid-life boards fine on 97e55a457.
i. Visuals & sound — 6. Art and the chest on the stipend card are lovely; sound not testable.
j. Co-op — n/a.

## 3. Top 3 loved · hated · replay?
Loved: (1) festival event writing and art; (2) the stipend chest card; (3) odds words on every option.
Hated: (1) soft-locks («Sang ngày mới», «Tin báo»); (2) endless repetition with rank 0 and no goal; (3) the death/end card hidden by a pop-up.
Replay another life? Only after the soft-locks and the Lãnh cung dead-end are fixed.

## 4. BUGS found (shots/saves in the runner out dir, not in git)
1. GAME — popup over the END card: «Bổng lộc tháng chạp» (list + «Nhận») opens over the end-of-life card at buổi 3248 (end.png). Same family as 10 earlier lives; fast lane.
2. GAME — save-quota: localStorage QuotaExceededError (save v2-1 4.89M + v2-2 0.36M chars) at year ~18, buổi ~2800; j6 save() swallows it, every later save is lost (2205 repeats, 4× SAVE STALE). Forwarded by Foreman E to MAIN 168 / Foreman B (packed save, review/save-fix-stack-rv18).
3. GAME — «Sang ngày mới» tapped, buổi does not turn, Q=1 «Tin trong cung buổi này» (×34 + ×4 with no dialog) and disabled with hidden queue Q=2–12 (known fix-8 family).
4. GAME — «Tin báo» no way out (buttons below the screen, nothing scrolls) ×2; dialogs scrolled to the end with no close/next (.kmov ×8, «Hắt trà» ×2).
5. GAME — dialog queue has no dedupe: up to 12 copies of one «Tâm trạng» dialog; «Lui» ×2 «has no effect» (pops one copy).
6. GAME KIT — gift picker «Biếu quà làm lành»: confirm «kipgo» off-screen after 8 scrolls / no item can be given (538 items) (parked family, MAIN 159).
7. PERF — PAGE FROZE ×2 (buổi 88, 328) and tab crash (buổi 27) before the renderer-mem fix; fixed on LIVE after 123a2a9c; later renderer ~2.6 GB at buổi 3247.
8. STUCK ×15 (no progress 15 min on «Tin báo»; 150-tap no-clock loops on map/room pages).
9. JS — «page error: Cannot read properties of undefined (reading 'off')» ×2.
10. DESIGN — Lãnh cung has no goal; rank stays 0 for 20 years (design finding).
Full table: rerun-E-E-S1-20261125.json.

## 5. Suggestions (player view; feature freeze, MAIN files new-feature ones)
- Cap/dedupe the dialog queue and let «Sang ngày mới» show why it is blocked. · Give the end card priority over every stipend/info dialog. · Give Lãnh cung a goal (a way back or a clear last chapter). · Say why rank does not move.
