# PROGRESS review/suc-khoe — HEALTH + PREGNANCY BUNDLE (Foreman D, worker session_01DgYSWmn1SNsxewKAaDLZjN)

Order: dev/handover/FOREMAN_D.md INBOX (18:08Z / 18:10Z / 18:17Z / 19:00Z main s21); spec dev/handover/reports/suc-khoe.md §4.1–4.7 with the owner changes
(OD 16/11 ~18:05Z L1405, 18:08Z L1406, 18:10Z L1407, 18:17Z L1409, 19:00Z L1419; PARKING_LOT #1). Base: origin/main c19b25eb.

## Priority rule #1 (reused, not rebuilt)
jmort.js (birth / stillbirth / hard birth / newborn-death mechanism k.nb, care sources), j35 ở cữ, j8 pregMonthP / birthRisk / evA / evG, jroute.js blood test
(rtNgSet, PEND.rtNg2, PEND.rtNgNpc, rtCard, rtGateT motive gate), j22 trueFather / pregMismatch / bribe the book, jcycle "Khai lùi", jthaiy verdict, jface ỐM YẾU,
j78/j21 noteAdd facts, D57 bot (review/preg-rate-r1 dev/measure/preg-bots.js → dev/measure/sk-bots.js), sens bot runb.js + new counters insk.js.

## Built (jkh.js, last in assemble; numbers BAL.kh / BAL.preT / BAL.pgRisk in jbal2.js)
1. Sức khỏe = ONLY the Sức max ceiling (owner 18:05Z). khOf(p) = 100 − (age−30)×1.2 − lasting scars − healing part; sucCap = 40 + 0.6 × khOf.
   Every Sức clamp reads sucCap (whole group, scan below). Regen speed unchanged; jmort `tired` regen cut switched off while kh is on (folded in, one core).
2. Costs: birth 10 (+2 lasting), hard birth +15 (+5), stillbirth / giữ mẹ 10 (+2), miscarriage 6 (+1), close birth < 18 months 6 (+1), broken ở cữ +2 lasting and
   Hậu sản 25 %, illness 1 per stage per month, poison 3 per month of p.sick (+4 lasting once). Healing (only the healing part): 0.5/month + 0.5 per jmort care source,
   ở cữ kept +5, thuốc bổ cards +3 (once a month). Low health (< 50) adds a 4 % monthly illness catch; thái y says "Hơi yếu" under 80; ỐM YẾU face under 45.
3. Ở cữ = 1 month (j35 + the NPC affair line j22 read khOcu); the permanent ×0.7 conception cut is removed (owner 18:10Z).
4. Preterm (month 8 1.5 %, month 9 4 %, + low Sức / low health / age, ×½ an thai; baby dies in the first month 40 % / 15 %, text "sinh non yếu ớt").
   Overdue 8 %: waits a month, then birthRisk ×1.5 and stillbirth +3 (as specified; owner 19:00Z: death rules untouched — childbirth death formula jmort.js unchanged).
   Omen line after an overdue birth (điềm thánh nhân, Danh +2 for a son, or ill-omen talk).
5. Miscarriage causes (owner 19:15Z) as one capped table (+4 %/month max): khắc walked over 6 a month, walks in harsh weather, card Sức over 40 a month, Sức < 50;
   an thai halves; the text names the cause. Her moves / cards feed it; NPCs have the same function but spend ~no khắc/Sức today (npc-mind item, report Finding 1).
6. 'Lệch sổ' (owner 18:17Z, Q3 = 1): a birth whose real month + the book offset ≠ 10 sets k.dateOff, a public fact (noteAdd on the NPC card);
   rivals with a self-interest motive (own son vs a son, rank rival they dislike, deep dislike / oán) get 2 chứng cứ; one with ≥ 3 who passes the existing motive
   gate (rtGateT "accuse") demands the existing blood test (20 %/month, child ≤ 3 years). Her child → rtNgSet (the existing scene, oil chosen by the accuser's traits);
   an NPC's child → khNgNpc (same truth rule: innocent + honest bowl → blood mixes, accuser punished; oil → the innocent falls). Two-way: she gets a kit card
   "Tâu xin nghiệm thân …" (rtCard → the existing PEND.rtNgNpc dialog). A real early birth adds recDefend 20 to her "nghiệm lại bằng bát nước mới" odds.
7. Thuốc thúc sinh (PARKING_LOT #1): an affair pregnancy the book was made to fit by an earlier night (khRecOff ≥ 1 month; not after "Hối lộ Kính sự phòng sửa sổ", which
   writes the matching night — S.khBook) → deal card "Uống thuốc thúc sinh" in the month the book says she is due: next month she gives birth (really preterm, the
   preterm baby risk applies) and it looks full-term (no lệch sổ). Without it the birth looks a month late → lệch sổ. NPCs in the same spot take it (60 %).
8. Display: HUD Sức cell title "Sức N · tối đa M (Sức khỏe)", the Sức help text (HX.suc) explains the ceiling, thái y verdict, ỐM YẾU face. No new kit part (no KIT REQUEST).
9. Old saves: khScar missing → 2 × children already born, no healing part (lazy, on deser and on first use); NPCs the same. Co-op: NPC rolls host-only (khGuest).

## Whole-group scan: Sức clamps → sucCap (LUẬT SỬA CẢ NHÓM)
| file | sites | before | after |
|---|---|---|---|
| j1 apply / j8 ap | 2 | cl(…,0,100) | + min(…, sucCap) |
| j3 weekly regen (her + NPCs) | 2 | 0,100 | 0,sucCap(X) |
| j76 sleep (her + NPCs) | 2 | 0,100 | 0,sucCap(X) |
| j23 cầm, j42 servant rest, jkc khoa cử rest | 4 | 0,100 | 0,sucCap(S) |
| jpet / jpetcare (pets, her + NPCs) | 8 | 0,100 | 0,sucCap(X) |
| jcmaid talent "thuốc" (her + NPCs) | 2 | 0,100 | 0,sucCap(X) |
Remaining `.suc=` writes are decreases only (scan script in this file's history: python regex `\.suc\s*(=|\+=)` over the assembled list). j80 is not assembled.

## Tests
- dev/test/suc-khoe.js (logic, 1180x820): PASS (ceiling + clamps, regen unchanged, ở cữ, preterm, overdue, lệch sổ → rtNgSet, NPC twin truth rule, causes, drug, old save, HUD title).
- Other suites: see report.

## Measurements: see dev/handover/reports/suc-khoe-build.md (handover branch).

## Not done / follow-ups
- Person-card health words line (spec 4.6 optional): not added; thái y verdict + face carry it in words. j68e event "Để thái y kê thuốc bổ" does not count as a tonic (only deck cards whose name/text says thuốc bổ).
- NPC act Sức costs (npc-mind owner) — without them the walking/work miscarriage causes barely touch NPCs.
