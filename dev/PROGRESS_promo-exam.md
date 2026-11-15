# PROGRESS review/promo-exam (KHẢO HẠCH TẤN PHONG, owner 15/11 17:20Z)

Base: origin/main f500d0464. Module `dev/build/jexam.js` (assembled after jtabs), numbers `BAL.ex` in `dev/build/jbal2.js`.

## Reused (LUẬT ƯU TIÊN SỐ 1)
- Exam rounds = j82/j91 mini-game engines through the j82 kit game frame (kg82Open/kg82Play/kg82ShowRes/kitGameResult); NPC/auto play =
  the j82 per-level draw (kg82NpcMean, ±4), the same rule j71 contests and j82 rivals use.
- Lễ nghi / Trị cung / Xử án / Thái hậu hỏi = the j82 quiz engine with new question banks (EXQ, 10 questions each); câu đối, cầm/kỳ/thi/họa,
  thêu/nấu = the existing games.
- Gate = one row added to promoReqP (the j30/j34 wrapper pattern), so promoteP, fillSeats (j30), candOK/Tranh ghế (j34), jbal outsider queen,
  rank board (j25), Mệnh truyện checks (jtabs) all read it. Pass → promoteP → existing edict (j93 kitEdict on rank change) and bestow chest;
  review/gift-chest (jrankset rsCheck on rank change) will add the rank chest by itself once merged — nothing to change here.
- j53 khảo hạch (princes), j71 hội thi, j90 podium: looked at; the podium is not used (one examinee, no ranking).

## Rules (BAL.ex)
win 2 tuần window · cd by target rank [1,1,1,1,2,2,3,3] months (fail or missed window) · bar [22,27,31] by tier (low = to 1–3, mid 4–5,
high 6–7) · score = mean round × 6 + 2 Tứ đức courses × 2 + 1 art level × 2 (high tier: Đức/20) · examiner Hoàng hậu (low/mid) or Thái hậu (high),
the other when absent: bar −clamp(attitude/10, ±6) · card 2 khắc, Sức −8 · odds word = 240 seeded draws at her own level.

## Auto-promotion paths (group fix)
| path | before | after |
|---|---|---|
| month-end decree, player (j3 promote) | automatic when eligible | needs exam pass (row) |
| month decree, NPC (j8 rivalsMonth → promoteP) | automatic | NPC sits the exam (sim), may fail → news line + cooldown |
| seat filling (j30 fillSeats) | eligible candidates | candidates must have passed |
| Tranh ghế / Hoàng hậu seat (j34 candOK, contestOpen) | eligible | must have passed (high-tier exam) |
| outsider queen (jbal contestOpen) | when someone eligible | when someone passed (not a promotion of a consort) |
| son birth (j8 birthP) | +1 rank on the spot | exGrace: exam at once, conditions waived; pass → +1 (old seat bypass kept) |
| old vacant-seat path (j8 rivalsTurn) | dead under j34 (__noOldSeat) | unchanged, gated by the row anyway |
| servant / ma ma road (j42 srvRise, j97 r97rise, r97srvRk, cnv_mat "phá lệ") | automatic | KEPT automatic (owner question open) |
| cold-palace restore (j14 restore, j7/j8 pardon) | restoration | unchanged (not a promotion) |

## "Điều kiện sắc phong names the wrong next rank" (whole class)
Scan `dev/test/promo-next-rank.js` (ranks 0–6, cấm túc, lãnh cung; card name, every row naming a rank, Sủng/Danh thresholds, exam target,
rank board). Before (main f500d0464): ranks 0–6 and cấm túc all named RANKS[rank+1] correctly ("Phi" for a Tần IS the next rank);
the one wrong case: in the cold palace the Sắc phong card offered "Điều kiện sắc phong Thường tại". After: cold palace shows a kitEmpty
"phục vị <old rank>" (jtabs + old j6 panel); 9/9 ok.

## Tests
`dev/test/promo-exam.js` (logic + 6 sizes), `dev/test/promo-next-rank.js`. Build: `python3 dev/build/assemble.py`, wrap dev/index.html as
_aa.html, serve the worktree root.
Bot: `dev/measure/inpage6.js` now sits the exam at once (window.__exAuto = rolled at her level) and logs window.__exN in each result.

## Results (15/11)
- `dev/test/promo-exam.js` on 755x1000, 1000x755, 1180x820, 1366x1024, 844x390 (+390x844): 33/33 PASS, 0 page errors (old save from main
  f500d0464 loads, gets S.ex, window opens, card dealt). `promo-next-rank.js`: 9/9 ok (before: cold palace FAIL).
- Balance bot (run1b.sh, inpage6 sensible, HHSTOP): runs on main f500d0464 but at load ~45 on 4 cores it did 1 life in ~40 min, then the
  shard died with "Target crashed" (the known load failure in BALANCE_REPORT). No usable before/after n. NOT measured.
- Simulated estimate (pass odds from the in-page draw at bot-level stats: low tier ~66 %, middle ~86 %, high ~40–70 % as Tứ đức/Đức grow;
  expected extra wait = (1/p − 1) × cd per step): about +1.3 months (3 low steps) + 0.7 (2 middle) + 2–4 (Hoàng quý phi + Hoàng hậu seat)
  ≈ 4–6 months on a median ~64-month road to Hoàng hậu, while NPC rivals are slowed the same way at the seat. Estimated Hoàng hậu rate
  33 % → ~30–31 %, inside the ~32 % target band; if a real run shows lower, lower BAL.ex.bar[2] (31) first.
- Next: rerun `OUT=… bash dev/measure/run5b.sh <game> new` when the machine is quiet (base vs new, 30 lives each).

## Review r6 (review/promo-exam-r6, 15/11)
Merged a0ea105b1 onto origin/main ce840fa84, then origin/main afb2676a2 (assemble: main order incl. jly/jgift/jevban + jexam after jtabs).
Reviewer fixes:
1. KIT note renumbered §48 → §55 (registry: §48–§50 = kit-fig2, §55 = promo-exam).
2. Act card picture: only its own picture. ACTS.json already maps «Khảo hạch tấn phong» → act-khao-hach-tan-phong.webp (on CDN; hands-only
   desk with brush, scroll + seal, embroidery hoop, zither: fits). Guard: the card carries `data-kexam`; a kpActArt wrapper gives NO picture
   slot when there is no own key (checked by stubbing kitActKey: no .kaart, `kanoart`; restoring the key draws the own picture). Category word
   «Lễ nghi» instead of the default «Giao thiệp».
3. VANPHONG: player-visible "Vòng" → "Môn" (môn thi), "Điểm = …" → "Tổng phần = …" (điểm is a banned modern word), wrong option
   "Cảm ơn rồi cất đi" → "Nhận rồi cất đi". The 40 questions read: one clear right answer each, period wording (thần thiếp per VANPHONG §2,
   Thận hình ty, Kính sự phòng, Nữ huấn/Nữ giới), no modern terms.
4. Mệnh truyện chips through `kitChip(text,tone)` (same markup, kit function) instead of hand-written `<span class="kchip">`.
5. Round frame at 844x390: the start button fell below the frame (the examiner row now wraps with main's "thiện cảm" wording). The
   examiner row shows the name only; the liking is said once on «Mức đỗ». 
Balance bot NOT run: load ~35–40 on 4 cores and run5b.sh starts 5 browsers (coordinator: one browser at a time); estimate above stands.
