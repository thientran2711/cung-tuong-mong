# MAIN SESSION HANDOFF (2026-11-14 ~07:00Z)

The previous main session got too heavy; the owner asked to move to a new session. Read dev/HANDOVER.md first (binding rules), then this file.

## Owner & working style (binding)
- Reply in Vietnamese, call yourself "em", the owner "sếp", short. Report every turn: progress, % xong (~75%), % chơi được (~94%).
- You are the COORDINATOR: never do long work yourself (owner complained). Delegate everything to workers (Agent tool), relay, review gate. Answer the owner quickly.
- Any complaint covers its WHOLE GROUP (fix every similar thing, not just the one shown).
- KIT-FIRST: all UI comes from the shared kit (dev/kit/KIT.md, module j79); kit owner builds components first, others only pass data. Review gate: review/* branch → kit reviewer → merge to main.
- Priority devices: Galaxy Z Fold portrait 755x1000@2 and iPad LANDSCAPE 1180x820@2 / 1366x1024@2. Test those first.
- Send previews as SINGLE readable images (one per file), never tiny grids.
- Art: Magnific "gpt-2-6" only, folder ba4aecfe-efce-47e2-b53f-30d292091886, max 1 style ref. No faces in act/info art. Age 48 = dark hair, ≤2–3 silver strands.
- Wording: dev/kit/VANPHONG.md (branch review/van-phong): classical register, no %, no "có thể" in results, no "điểm" (use "phần").
- Balance targets: early death ≤45% (~45% ok), Hoàng hậu ≈32%.

## State of main (dde4268 at handoff)
Live: j51 succession, j57 tabs/▾, j60 portrait kit (frames approved by owner incl. Thái hậu/Thái tử), j73 kids art, scenes art, j79 kit panels (+j63 act cards, j78 intel/evidence), j80 Sức hotfix (main is now TOO EASY: HH ~55%, death ~20%).

## Branches in flight (agents were running in the old session; check each branch's latest head + PROGRESS notes)
- review/balance — integration+balance of logic branches: events(j68), merit(j71 c871bbb+), quests(j72), nights(j75 5d29864), intrigue(j70), time-spill(j76 b656c41, j80 folded in), map-tap(j77), works(j83 c693c58), stories(j67), virtue(j85 2b87377), minigames(j82 2cf0ec5), van-phong(j84 97f800d, LAST module), no-repeat. Must hit targets, write dev/measure/BALANCE_REPORT.md incl. death-cause table and REAL hours to reach HH. Merge THIS branch to main (not the parts one by one).
- review/kit-2 — kit owner #2: act art in the same portrait frame; info panels with images (img/info-*.webp, KIT_INFO); identity card = full-body figure on origin bg + info panel beside; status chips grouped in 3–4 columns (Tư chất/Nhân tâm/Ân sủng/Thời gian; Tư chất may overlay stage top-left without covering people); no round avatars anywhere; act frame colour per category; Tài nghệ cards (image left, info right, buttons below, same structure for every art); person card shows the same stats as the player (Sủng, Đức, Danh, Sắc, Tài, Tâm cơ) once known; bottom bar → 8 tabs (owner chose: merge Phi tần+Giao tình+Phe phái → "Hậu cung"; Mệnh truyện+Việc nhờ+Sổ ghi → "Mệnh truyện"; keep Hành sự, Dư đồ, Cung nhân, Hoàng tự, Tư trang, Tài nghệ) with kit sub-tabs; remaining "có thể" phrases, dilemma risk lines, tab counts "làm được/tổng", toast over identity card, 390 name tags; keep j86 face-pick hooks (.kpid/.kpnote).
- review/week-book (j87) — week report as a page-flip old ledger book (swipe, 3D page turn; iPad two-page spread; page 1 basics, one page per person with big portrait; classical end page).
- review/face-pick (j86, 2b43d37) — face chooser on identity card. Waiting for review.
- review/stories — j67 being expanded: 12–20 chapters per life, deadlines + consequences for ignoring the main quest, chapter rewards by difficulty/rarity (e.g. Ngọc dung cao, gấm bào, clan gifts).
- review/intrigue (j70) — player-ordered defences + self-initiated protection by loyal people, threat warnings with options, hủy dung (disfigurement) with recovery (veil overlay img/veil*.png on act-art).
- FAIL fixes in progress (one worker): title-screen, strangers, no-repeat, scene-scale, map-tap, fix-succession.
- Reviewer #3 handles review/van-phong, face-pick, and the fixed branches.
- Art: review/consort-art (tier 8 done; cold palace next, then tier-4 calm redraws, tier 6 c01–16 recolour, tiers 1–3), review/maid-art (m45–m52 + ~76 grey-hair edits), review/maid-art-b (c17–c32 m0–m4 + hair fixes), review/act-art (acts done 3:4; info images, art-*/vir-* talent images, book-* textures in progress), cutout/portrait-recrop worker (por-* crops centred on face — owner saw a face cut at the cheek).

## New owner requests NOT yet assigned (do these first)
1. Face pool = 84 women: player face picker (and NPC consort faces) should draw from all 32 consorts + 52 maids, since maids can rise to consort. Requires "Part C" art: the 52 maids in consort tiers t1–t8 + cold (not started). Recommend: start Part C art workers, then extend j86 picker/NPC assignment to 84 faces (filter tabs).
2. Every weekly event, court event and Emperor event needs a real illustration: define event categories (court, Emperor mood, harvest/disaster, border war, festival, birth, death, promotion, scandal, poison, fire, epidemic, envoy…), img/ev-<cat>.webp 3:4 (no faces), kit slot in news/week-book pages; art worker to draw.

## Monitoring
A scheduled reminder (send_later) was used every ~25 min: git fetch, check review/* heads, send new art to the owner as single images, route finished branches to the reviewer. Recreate it in the new session.
