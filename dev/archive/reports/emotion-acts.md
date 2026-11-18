# REPORT — review/emotion-acts (worker, Foreman B) — emotion actions, extreme mood, forced outbursts

Orders: OD "16/11 13:08Z", "16/11 13:25Z" part B, "16/11 13:50Z, s17 chat" (3); FOREMAN_B INBOX 13:08Z s16, 13:30Z s17, 14:15Z s17.
Branch: review/emotion-acts (base review/mood-bar-r1 ce43d3b5 + origin/main ee5d33de merged; mood-bar is NOT on main yet — this branch
carries it). Full details + tuning table: dev/PROGRESS_emotion-acts.md (on the branch and copied here).

## Done (dev/build/jemoact.js, numbers BAL.ea — ONE CORE, text prints the constants)
1. EMOTION ACT CARDS (kit act cards, same objects as the j76 standing cards; no new UI part): only in the matching mood band (jmood),
   max 2 — giận Đập đồ / Mắng cung nữ (she picks the maid: kit event choice) · buồn (+ghen) Khóc thầm / Viết thư nhà · vui Đàn hát tự
   thưởng · căng thẳng Thắp hương cầu an. Each with gain (tâm trạng toward calm, feeling −, Tài / Đức) AND loss (Bạc / Sức / Danh /
   maid Lòng / rivals' jealousy). Existing act pictures mapped (EA_ART), group labels by meaning.
   NPCs (consorts, servants, Emperor, Thái hậu, men, officials, children) do the same acts weekly in the act band.
2. EXTREME MOOD ≥ 3 tuần: buồn/ghen → Tâm bệnh · giận → lỡ lời Danh −4 · vui → tự mãn (ghen +8, 4 tuần ×1.5 jealousy) · căng thẳng →
   Chứng mất ngủ (4th one added for completeness — drop if unwanted). Her: mood band ±2; NPC: emo.v ≥ 80. Player AND NPC.
3. FORCED OUTBURSTS by PERSONALITY + CURRENT MOOD (one EA_REACT table for her and every NPC): timid never beats / scolds another
   palace's maid / phạm thượng / mocks / boasts; hot may smash, scold, beat, phạm thượng (rare, never while cấm túc). Positive ones too:
   generous + joy → Ban thưởng cung nhân (bạc out), Bày tiệc trà, Ca hát thâu đêm; proud → Khoe khoang. Hers = kit event frame, only
   "Tiếp tục" + real numbers + "keep calm early" line (not a punishment, no damage control). Scolding a maid of a HIGHER-rank mistress →
   that mistress comes to HỎI TỘI next tuần (3 answers: Tạ lỗi đền bạc / Đổ lỗi cho cung nữ / Cãi lý — gain + loss each). Two-way: a
   lower-rank consort scolds HER maid → Sang hỏi tội / Bỏ qua; Emperor / Thái hậu outbursts that land on her → one event (max 1 a tuần).
5. AUDIT "choices that should be personality/mood-driven": hold-back answers (Nhịn, Im lặng, Làm ngơ, Lờ đi, Cúi đầu…) vs hit-back
   answers (Đáp trả, Cãi lại, Mắng thẳng mặt, Đối chất, Vặn lại) in j67, j68e, j7, j85, j96, j97, jtsb, jstip, jne, jkc, jopic — BUILT one
   rule: hot + furious → hold-back greyed ("không nhịn nổi"); timid at the lowest band → hit-back greyed ("không dám"); only when an
   affordable answer of the other kind stays open. NPC choices were already trait + feeling driven (persW, emoMul). NOT built (need
   per-scene writing): pillow-talk answers by mood, temper-coloured wording of quở trách scenes.

## Measurements (life bots, sensible bot, HHSTOP)
- Outcome BASE (same build without the branch, n 32) vs AFTER r3 (n 27 valid): Hoàng hậu 0 % vs 4 %; early death 47 % vs 52 % (SE ~9
  points at n ≈ 30: no measurable change).
- Her outbursts 1.74 / 100 tuần; by nết: timid 1.0–1.1 · even 1.6–2.2 · hot 5.6 (Thẳng thắn; hot lives few). Extremes 0.08 / 100 tuần.
- NPC outbursts by temper: hot 3 250 · even 981 · timid 546 (timid: crying, sleepless, praying, sulking only).
- Mood bar: tuần at |v| ≥ 60 1.9 % → 0.9 %; longest extreme streak mean 2.4 → 1.5 (acts + outbursts spend the feeling).
- r3 found 3 TIMEOUT lives = a real dead end in the (5) lock (only other answer cost bạc she lacked) → fixed 74608b29; r4 confirmation
  run: 12 lives, 0 TIMEOUT, her outbursts 1.73 / 100 tuần.

## Tests
`node dev/test/emotion-acts.js <url> <out>` — 10 cases (cards gian / vui, scold pick, hot outburst, generous outburst, hỏi tội, maid
bullied, extreme → Tâm bệnh, lock, old save without S.ea) × 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390, 390x844 (rotate
prompt): PASS, 0 page errors, 0 page / dialog overflow. Looked at the shots (cards on the Fold act page, event frames, 844x390 dialogs
scroll inside). Co-op files not touched (S.ea personal; NPC changes host-only) → coop-e2e not run.

KIT REQUEST: none (cards = kit act cards, events = kit event frame, greyed answer = the existing disabled option button).

SẴN SÀNG KIỂM e9bd51eebcf24ad66cb21b27d63669c422abc2f4
