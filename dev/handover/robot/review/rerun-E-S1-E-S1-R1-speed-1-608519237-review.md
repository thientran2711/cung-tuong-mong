# PLAYER REVIEW — E-S1-R1-speed-1-608519237 (thd / thd_tho, Fold phone, persona speed)

PRIORITY #1 CHECK: ROBOT-PLAYER-REVIEW.md §B; moments in rerun-E-S1-E-S1-R1-speed-1-608519237-moments.md. Scope: AI runner on a real-tap harness; end shot + moment log + full bug table, not every buổi.

## 1. Summary
- Persona speed (harness `bold`), origin thd · road thd_tho, seed 608519237, Fold, real taps (20388, jsClicks 0).
- Age 40, year 23, 3162 buổi, rank 0 throughout, ending «Lãnh cung — Tuổi xuân qua đi» (game-imposed, no bot exit pick); VALID. Boards played: mua ×178, hat ×61, dan ×5, ve ×4, kim ×3, doi ×3, hoa ×5, theu ×5, huong ×4, tho ×4, co ×6, ban ×4 and more. 277 offers seen, 97 taken.
- Flags: «mixed build (fix resume)» (Foreman E 26/11 22:42Z), «mixed build (pin-server resume, pixi repaired at b978)» (Foreman E child1/child2 01:08Z, 05:07Z), «save-quota» (QuotaExceededError from y~21, b~2900; Foreman E 27/11 01:02Z: VALID at a real end). Early on: 1 tab crash (buổi 303) before the renderer-mem fix.
- Builds: 1b5137935266 → d3f360028603 → LIVE fb660cb78eec (pin=0) → pinned fb660cb78eec (pin dir repaired). Harness 08a4ff8b → 8ea10d7e → 97e55a457 → f65d019b.

## 2. Scores (1–10)
a. First 15 minutes — 4. Pop-ups before the first free tap; goal never stated.
b. Gameplay loop & pacing — 3. 3162 buổi, rank 0 for 23 years; same festival cards, then Lãnh cung.
c. Buttons & UI — 3. Gift picker «Biếu quà làm lành» confirm off-screen ×157 and re-opened ×40 with every item locked; a full-screen «Bổng lộc» chest instead of the end card.
d. Story & drama — 5. Event writing good; nothing changes the player's rank.
e. Characters & interactions — 4. People are look-ups; no relationship arc.
f. Choices & fairness — 5. Options show Tốn/Được and odds words; the gift picker offers hundreds of items (246–644) but none can be given.
g. Rewards, feedback & emotion — 3. Stipend chests with huge item lists, no progress.
h. Mini-games — 7. Hundreds of boards really played (mua 4–9/10, raw 8–10).
i. Visuals & sound — 6. Art strong; sound not testable.
j. Co-op — n/a.

## 3. Top 3 loved · hated · replay?
Loved: (1) event writing and art; (2) the many boards that really play; (3) the stipend chest art.
Hated: (1) the gift picker dead-end (greyed confirms); (2) 20+ years in Lãnh cung; (3) silent save loss after year 21.
Replay another life? Not before the gift picker, Lãnh cung and the save quota are fixed.

## 4. BUGS found (shots/saves in the runner out dir, not in git)
1. GAME — end card hidden: the full-screen «Bổng lộc tháng chạp» chest covers the end-of-life card at buổi 3162 (end.png). Same family as 13 earlier lives; fast lane.
2. GAME — save-quota: QuotaExceededError ×1331 (save 5.6M chars) from y~21; SAVE STALE ×2; j6 save() swallows it. Forwarded by Foreman E to MAIN 168 / Foreman B (packed save).
3. GAME KIT — gift picker «Biếu quà làm lành»: confirm «kipgo» off-screen after 8 real scrolls ×157; re-opened ×3 by «Đồ trong rương» with no gift given ×40; 25+ notes «no item can be given now» (210–644 items, every confirm greyed). MAIN 159 family.
4. PERF — tab crash at buổi 303 (before the renderer-mem fix); the page stayed under ~3 GB afterwards.
5. HARNESS — area tap blocked ×12 (button under the point: kemo); picker stalled 95 steps on a «.kmov» with no close (unstuck by «Ta biết rồi»).
6. DESIGN — Lãnh cung has no goal; rank 0 for 23 years.

## 5. Suggestions (player view; feature freeze, MAIN files new-feature ones)
- Pack/trim the save so long lives do not hit the quota. · End card above any stipend dialog. · Let the gift picker give at least one item or say why none fits. · A goal or way out of Lãnh cung.
