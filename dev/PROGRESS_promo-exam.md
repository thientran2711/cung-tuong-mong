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
