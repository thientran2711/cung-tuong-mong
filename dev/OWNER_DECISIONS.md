# OWNER DECISIONS LOG (Cung Tường Mộng) — newest last. Main session keeps this up to date.
Older binding rules: see dev/HANDOVER.md (all sections). This log adds every decision from 11/14 (phiên chính 2) on.

## 2026-11-14
- Faces: pool = 84 women (32 consorts + 52 maids). Part C = 52 maids in consort tiers t1–t8 + cold. NPC consorts only draw a maid face once that face has consort-tier art (F88_NEED_C).
- Huadian: consorts only (incl. maids promoted to consort). Never on maids (m0–m4), mamas, servants, cold palace. 84 unique styles (HUADIAN.md c01–c32, HUADIAN_C.md m01–m52). Size t1 = c03 t1 red flower; grows ~5%/tier. 8 distinct tiers. Painted on skin (no sticker look). Raised/jewelled styles must stay small; flat gold-leaf styles may be a bit larger. Approved: t1–t6, t8 phoenix (to be ~15% smaller), t7 being redone in flat gold-leaf + red enamel style.
- No facial moles on anyone. Removal combined with adding huadian in one edit pass.
- Poses: calm standing, may turn at an angle, NO flying sleeves/sashes/hems; HANDS varied with props, different per age.
- Veils: consorts t1–t8 = bead strands (no fabric); t1/t2 swapped (silver t1, pink-silk-cord t2); t7 approved. Maids m0–m1 + cold palace = thin ivory silk veil; maids m2–m4 + mamas = thin pink silk veil. Face must stay recognisable.
- Disfigurement (hủy dung): claw marks ON the face, 1/2/3 strokes by severity (approved); visible when the player knows.
- Contests: no multiple-choice quizzes; every subject its own real minigame (15 done).
- Results: podium screen first (full-body figures; NO halo rays; soft stage light per rank gold/silver/bronze; confetti at the player's own place), then the score table. Player figure may appear on the podium.
- Event choices (weekly events, story chapters, side events, dilemmas): show only costs (Sức, khắc, bạc); results card shows numbers afterwards. Normal act cards keep full price/gain/loss/odds.
- Wardrobe: 2 slots (Trâm cài, Y phục) beside portraits for everyone; grades Thường/Tinh phẩm/Trân phẩm/Tuyệt phẩm/Ngự tứ; Đúng/Vượt phẩm/Quá giản dị HIDDEN until someone remarks; "Tự chọn đồ" fast but risky; "Chải chuốt" minigame decides; sell 40–60% (risk), pawn/redeem; Ngự tứ unsellable; frame-ups with planted items.
- Rewards come from the real item pool; some items only obtainable as imperial gifts. Reward reveal = tray/chest centre screen, tap to open, items pop out by rarity.
- Origin odds (j69) approved: nc 6, thd 9, cn 13, dtq 17, muoi 17, ch 13, td 9, tt 8, cnv 8 (%), Phúc duyên bonus tt/td +10, cnv +20; cnv must be winnable (~10–15% HH) — decided by balance worker.
- Balance numbers: decided by us, don't ask. Targets: early death ~40–45%, HH ~32%, childbirth death 8–12%/birth.
- Portrait cards: big 3:4 frame (owner reference ~25% screen width on Fold); inner image SAME size for every rank; top ornaments (phoenix/dragon) fully visible in reserved headroom; main info visible without scrolling on Fold.
- Stage: everyone same scale on one floor line; scene crop shows most floor (KIT_FLOOR).
- No round avatars anywhere — rectangles only.
- iPad: "Trong cung" block (Hoàng thượng/Thái hậu/Hoàng hậu status) under the Tư chất block on the stage's left.
- Identity screen: origin art goes into a framed picture (left/top), info right/bottom; a new common reincarnation backdrop. Roulette animation (light runs over origin tiles, slows, stops on the rolled origin, zooms into the identity card) at new game AND rebirth.
- Game feel: animations for key moments (card flip for night selection, weekly fortune sticks, stamp Thành/Bại, promotion scroll, demotion gloom, day/week transition, pregnancy/death, reward chest…). All art for them by gpt-2-6.
- Weather: already implemented (affects who appears where, emperor mood, Sức, contests; particle effects in j11). Only make it clearly visible + weather chip. Don't re-propose.
- Scenes: every location background in 4 seasons.
- All art: Magnific gpt-2-6 only. Event art: just draw, no previews needed. Story (Mệnh truyện) art: ~468 images pending owner's OK ("duyệt vẽ tiếp").
- Scenes: also vary by time of day (each buổi: morning/afternoon/evening(+noon if exists)) × 4 seasons.
- Time: 4 buổi per week (Sáng, Trưa, Chiều, Tối) × 4 khắc = 16 khắc (owner agreed to recommendation). Sức remains the main limit; rebalance. Light shifts gently by khắc within a buổi.
- Who-is-where: habits (hidden, per person, drift over time) + weekly intentions (seek Emperor, allies, avoid foes, scheme, seek player) + 15–25% surprises; Emperor too. Player learns habits via spies/servants/observation; NPCs learn the player's habits and may lie in wait. Target predictability 35–55%. (review/schedules, j95)
