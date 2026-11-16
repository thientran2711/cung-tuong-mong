# danh-balance — review/danh-balance @ 319dce59a8c60dad56183a8d5c8037c1579ead31 (base main bad941b4). SẴN SÀNG KIỂM
Flag 1 of act-dedupe (Danh slower for a Hành-sự-only player). Full report: dev/review/danh-balance.md on the branch. NO BAL value changed.

## Danh sources (measured, sensible bot Hành sự only, 96 lives/arm, cap 144 tuần; Danh +gained/−lost per life)
| source | before (main 0a311183f) | after (main bad941b4) |
|---|---|---|
| Múa trong yến tiệc | +94 / −71 (38×) | +166 / −72 (55×) |
| Phát chẩn cho cung nhân (Bạc −40 → Danh +7) | +92 (15×) | removed by act-dedupe |
| Thỉnh an Thái hậu | +20 / −18 | +49 / −22 |
| dialogs / events | +67 / −81 | +77 / −76 |
| buổi change (ticks, clock events) | +24 / −73 | +10 / −76 |
| study/minigame results outside acts | +21 | 0 |
Static scan (dev/measure/danhscan.py): 501 literal gains / 408 losses in 68 files (j67, j97, j71, j92, j72 biggest). Gates: RANKS[].d 10/20/30/42/55/68/78, succession 50/70, rare roads 40, servant wedding 20, Bị bỏ quên ≤5, jkc 60/50.

## Measures (mean ± 95 % CI; Wilson for %; seeds 501+777 for hs/mix, 501 for rand-hs)
| | hs before | hs after | mix before | mix after | rand-hs before | rand-hs after |
|---|---|---|---|---|---|---|
| Danh tuần 48 | 70.0 ± 5.9 | 52.4 ± 6.0 | 56.6 ± 6.0 | 29.9 ± 5.1 | 43.2 ± 9.0 | 18.8 ± 6.0 |
| Danh tuần 144 | 89.4 ± 4.3 | 69.9 ± 6.7 | 79.1 ± 4.4 | 57.9 ± 6.7 | 73.7 ± 11.6 | 22.5 ± 11.9 |
| tuần held by the Danh row | 16 % | 33 % | 27 % | 51 % | 34 % | 63 % |
| rank at tuần 144 | 5.0 ± 0.3 | 3.8 ± 0.4 | 4.5 ± 0.3 | 2.9 ± 0.4 | 4.0 ± 0.6 | 1.6 ± 0.7 |
| HH within 144 tuần | 9 % (5–17) | 1 % (0–6) | 7 % (4–14) | 0 % (0–4) | 0 % | 0 % |
| died early | 12 % | 12 % | 10 % | 6 % | 31 % | 48 % |
| exam pass rate | 82–85 % | 41–47 % | 84 % | 56–64 % | 95 % | 58 % |
Two causes: (1) the only bạc→Danh card left Hành sự (Tài nghệ charity gives Danh +1/month); (2) exam pass rate halved — likely the study
cards left Hành sự so Tứ đức/art levels (2/3 of the exam score) stay low; bots never use Tài nghệ Tứ đức, so not proven.
Charity trials (Hành sự + Tài nghệ charity monthly; BAL overridden in the bot only): Danh-row hold 32 % (now) → 25 % (bac 30/danh 3) → 21 % (bac 35/danh 5);
Danh tuần 144 71.8 → 84.3; rank not restored (exam holds her).
Void/dropped: random mixed bot ("Xuất gia" in 41/50 lives); first mixed-after run (bot did not avoid the renamed "Đẩy xuống hồ sen"; fixed).

## Hard-coded copies fixed (value-neutral)
BAL.danhG {forget 5 (j3), fatherBook 40 (j4 rule+text), thdBook 40 (j97 rule+text), srvWed 20 (j42), kcVihanh 60, kcR5 50 (jkc)};
BAL.succN (j99succ: every succession condition row, rule+text, + NPC claim + rare end); BAL.charity {khac 1, bac 20, duc 3, danh 1} (j85 act + j85/jtabs card text + Đức panel).
Typed Danh gates 10 → 0. RANKS[].d stays in j1 (single source, no copy). Probe: same texts, 0 page errors. Site rebuilt.

## PROPOSAL (owner OK needed)
P1 BAL.charity.bac 20 → 35, BAL.charity.danh 1 → 5 (duc 3, khac 1, once a month kept) + a second door for the same act in Hành sự with the
  shared lock (act-dedupe shared-door pattern). Why: restores ≈ +55 Danh a life, Danh-row hold 33 → 21 %; 7 bạc per Danh = the old Phát chẩn.
  Gain/loss: Danh +5, Đức +3 for 35 bạc (a month's stipend at Đáp ứng) + 1 khắc. Balance road: Múa trong yến tiệc (Sức −20, Bạc −10, risky ±Danh, jealousy) / Thỉnh an.
P2 exam: no number yet — next item: a bot that uses Tài nghệ (Tứ đức + arts); then either nothing or BAL.ex.bar [22,27,31] → [22,25,28]
  (measured on review/balance-pass, unmerged, HH 34 → 45 % there — re-measure full lives first).
P3 flag: random Hành-sự play dies more (31 → 48 %); recheck after P1/P2.
