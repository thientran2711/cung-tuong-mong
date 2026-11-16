# PROGRESS — review/emotion-acts (emotion actions, extreme mood, forced outbursts)

Owner orders (read verbatim in dev/OWNER_DECISIONS.md, docs branch): "16/11 13:08Z", "16/11 13:25Z" part B, "16/11 13:50Z, s17 chat" (3);
coordinator restatement dev/handover/FOREMAN_B.md INBOX 13:08Z s16, 13:30Z s17, 14:15Z s17.

Base: review/mood-bar-r1 @ ce43d3b5 + origin/main ee5d33de merged (mood-bar not yet on main). Branch review/emotion-acts.

## Reuse check (LUẬT ƯU TIÊN SỐ 1)
- `git grep` main + review/{emotion, emo-men, mood-bar(-r1), mood-dialog(-r1), personality(-r1), person-acts}: no emotion act cards,
  no extreme-mood rule, no forced outbursts, no hỏi tội for a maid exist. Found and reused: jmood (her bar, bands, flavour, mbAdd),
  jemo (p.emo for everyone, EMO, emoEv/emoSet, decay), j28/jtrong personality (traitsOf, PERS, her nết S.pTr), j13 illness (catchIll:
  Tâm bệnh, Chứng mất ngủ), j8 punish/ap/relAdd/oanAdd, j1 ghenAll, jface Tát, j76 standing-card pattern, kit event frame (Q items).

## What is built (dev/build/jemoact.js, numbers BAL.ea)
1. Emotion act cards (kit act cards, same objects as j76 standing cards), only in the matching mood band, max 2:
   giận Đập đồ / Mắng cung nữ (she picks the maid: kit event choice) · buồn (and ghen) Khóc thầm / Viết thư nhà · vui Đàn hát tự thưởng ·
   căng thẳng Thắp hương cầu an. Each: gain (tâm trạng toward calm, feeling seal −, Tài, Đức) AND loss (Bạc, Sức, Danh, maid Lòng,
   rivals' jealousy). Once per buổi each. Art: existing act pictures mapped in EA_ART (no new art).
   NPCs (consorts, servants, Emperor, Thái hậu, men, officials, children) do the same acts weekly in the act band (emo.v 40–69).
2. Extreme mood ≥ 3 tuần (hers: mood band ±2; NPC emo.v ≥ 70 same group): buồn/ghen → Tâm bệnh · giận → lỡ lời Danh −4 ·
   vui → tự mãn (ghen +8 now, 4 tuần of ×1.5 jealousy) · căng thẳng → Chứng mất ngủ (added for completeness). Cooldown 8 tuần.
3. Forced outbursts past the line (hers |v| ≥ 60, NPC emo.v ≥ 70), weekly chance 30 % (NPC 20 %) × temper (hot 1.6, even 1, timid 0.6).
   Reaction drawn from what the person's nết allows (EA_REACT table): timid never beats, never scolds another palace's maid, never
   phạm thượng, never mocks / boasts; hot may smash, scold, beat, phạm thượng. Positive ones too (generous + joy → Ban thưởng cung nhân,
   Bày tiệc trà, Ca hát thâu đêm; proud → Khoe khoang). Hers: kit event frame with only "Tiếp tục" + the real numbers (no damage control).
   Another palace's maid whose mistress outranks her → that mistress comes to hỏi tội next tuần (3 answers, gain + loss each).
   Two-way: a lower-rank consort who scolds HER maid → she may go hỏi tội or let it go; Emperor (ban thưởng / long nhan đại nộ) and
   Thái hậu (ban thưởng / quở trách) outbursts that land on her → one event; at most 1 such event a tuần (rest → log).
5. Audit (choices personality + mood should decide): see table below; built the generic rule for hold-back / hit-back answers.

## Audit (5): player choices that personality + mood should decide
| place | choice today | built now |
|---|---|---|
| any event with a hold-back answer (Nhịn, Nhẫn nhịn, Im lặng, Làm ngơ, Lờ đi, Cúi đầu…) and a hit-back answer (Đáp trả, Cãi lại, Mắng thẳng mặt, Đối chất, Vặn lại): j67, j68e, j7, j85, j96, j97, jtsb, jstip, jne, jkc, jopic | free choice | hot + furious → hold-back greyed; timid at the lowest band → hit-back greyed (eaLockWhy) |
| her emotion seal / mood bar crossing the line | nothing happened | forced outbursts (3) |
| mood-bar comfort visit (jmood) | a choice of how to answer | kept (it is her answer to a visitor, not an outburst) |
| NPC choices | persW by trait + jemo emoMul | already personality + mood driven; outbursts/acts added |
Not built (listed for the coordinator): Thái hậu / Hoàng hậu "quở trách" scenes in j67 story arcs could read the speaker's temper for
their wording; pillow talk (j8 night1) answers could be greyed by her mood like (5); both need writing per scene, not a rule.

## Tests
- `node dev/test/emotion-acts.js <url> <out> [sizes]` (cases gian, vui, scold, out, gen, hoi, hit, ext, lock, oldsave).
- Measure: `dev/measure/inemoact.js` (INP2) + `python3 dev/measure/anemoact.py LABEL=<glob>`.

## Measurements (life bots runb.js sens + inpage6, HHSTOP, INP2 inmood.js[,inemoact.js])
| run | change | lives | her outbursts / 100 tuần | NPC extremes / 100 tuần | note |
|---|---|---|---|---|---|
| r1 | first numbers (her line 60, NPC extreme 70) | 7 | 0.43 | 24.9 | hers too rare to be felt; NPC "extreme" too common |
| r2 | her line 45, NPC extreme 80 | 2 | 1.99 | 19.8 | one hot life: 5 Phạm thượng (each a cấm túc) |
| r3 | Phạm thượng weight .35, never while cấm túc | 30 (27 + 3 TIMEOUT) | 1.74 | 20.5 | TIMEOUT = dead end in the (5) lock → fixed (lock only when an affordable other answer of the right kind exists) |
| r4 | lock fix | 12 | see report | | confirmation: no TIMEOUT |

Outcome BASE (same build without this branch, n = 32) vs r3 (n = 27 valid): Hoàng hậu 0 % vs 4 %; early death (old age, nunnery,
leaving the palace excluded) 47 % vs 52 % — with n ≈ 30 a share has a standard error of ~9 points: no measurable change.
Her outbursts per 100 tuần by nết (r3): timid Hiền lành 1.0, Nhu mì 1.1 · even Khéo léo 1.9, Tham vọng 1.6, Trọng nghĩa 1.9, Đa nghi 2.2 ·
hot Thẳng thắn 5.6 (1 life), Kiêu ngạo 0 (1 life, short). Her outbursts by kind (r3, 9 704 tuần): Ban thưởng cung nhân 38, Khoe khoang 29,
Ca hát thâu đêm 20, Lục soát 16, Khóc 12, Bày tiệc 11, Bỏ bữa 9, Thức trắng 9, Mắng cung nữ 8, Gửi thư 7, Đập đồ 5, Cầu khấn 5.
NPC outbursts by temper: hot 3 250 · even 981 · timid 546 (timid ones: only crying, sleepless, praying, sulking — never beat / phạm thượng).
Her extremes 0.08 / 100 tuần (vui 4, căng thẳng 4). Mood bar: mean |v| 20.7 → 19.0, tuần at |v| ≥ 60 1.9 % → 0.9 %, longest extreme
streak mean 2.4 → 1.5 (the acts and outbursts spend the feeling).

## Status / log
- 16/11: module + BAL + tests + measure written; tuned r1–r3; dead-end fix r4; UI test PASS 6 viewports × 10 cases, 0 page errors.
