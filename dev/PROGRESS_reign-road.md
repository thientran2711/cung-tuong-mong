# PROGRESS review/reign-road (opus, session 8 worker)

Base: review/palace-start @ 3ac727833 (S.reign hook, "mới đăng cơ" setting). New games only (S.ps + S.reign); old saves see nothing.
Owner 16/11: Emperor side story (consolidating power vs the regent + the Thái hậu), faction road (choose a side, switch at a price,
consequences), every named character gets a side quest line (D5). Reuse: j55 court (houses, house heads, pow/af), j72 Việc nhờ engine
(templates, chains via ok.ch, offers, deadlines, Việc nhờ tab), j67/jstory title + option line format, kit parts only.

## Built (dev/build/jreign.js, BAL.rg in jbal2.js, assemble after jstory.js)
1. **Tân quân lập uy** (phụ tuyến of the Emperor), 6 chapters / 11 beats, one beat a month when the court reaches the chapter
   (months from the accession BAL.rg.at = 1,5,10,18,27,37): Tân quân (2) · Ba ngả đường (choose side) · Mật sự (carry a sealed letter /
   spy for the Thái hậu / copy the Emperor's draft for the regent, then a foe confronts her) · Dạ yến (host a banquet: Bạc or Sức+Tài road;
   then "Lối rẽ" = second clear moment: keep or switch) · Biên ải nổi lửa (plead / risk by side; winter clothes for soldiers) · Thân chính
   (the decisive night, then the outcome + aftermath choice: amnesty / silence / purge…). Side errands (3 per side) between chapters.
2. **Court grip** S.trieu.rg.p (world key → co-op host-authoritative, deltas merge): 30 at the accession, +drift/month, noise, Quốc sự,
   sided consorts with Sủng; her choices push it (Hoàng thượng +, quyền thần −, Thái hậu toward the middle). Outcome 2 months after
   Chương 6 opens: p ≥ B → Hoàng thượng thân chính (regent's house pow −30, Thái hậu withdraws), p < A → Tể tướng nhiếp chính,
   else Thái hậu buông rèm. Winners' consorts Sủng +, losers' −.
3. **Faction road** S.reign.side: Hoàng thượng / Thái hậu / quyền thần (Tể tướng, phụ chính) / đứng ngoài. Each side: own gains on the road
   (Sủng / Thái hậu favour / Bạc + house), own missions, own enemies (other sides' consorts −, own side +), own ending (win: an exam at once with the conditions waived (r1: never a free rank) / Thái hậu che chở 6 months + favour / Bạc + Tai mắt + house; lose: mirror). Trust (tr) scales the win. Family by origin:
   tt = the regent's daughter, ch/dtq = Thái hậu side, thd = Hoàng thượng side (going against the father: his favour −). Switch: at
   Chương 4 Hồi 2 or Mệnh truyện › Triều cục › "Đổi phe" (Danh −5, old leader −, old side's consorts −8, trust 10, cooldown 6 months, ≤2).
   NPC consorts' side by house (rgSideOf). Thái hậu dies → her side dissolves (she becomes đứng ngoài; a "th" outcome resolves to the
   nearer side).
4. **Tâm nguyện** (life-goal lines, j72 templates fu:1 chained by ok.ch, offered by the person via rgLNext every BAL.rg.lnCd months):
   Thái hậu, Hoàng hậu, Phế phi họ Lý (new j72 requester kind "ly" = S.lyF), cung nữ thân tín, Tổng quản thái giám, Thái y — 3 steps each,
   every Bạc step has a Sức/stat road. Final rewards: Thái hậu che chở 2 months; Hoàng hậu +10 & owes her; Lý leaves lãnh cung (S.lyF.freed);
   maid Lòng +15; Tổng quản Tai mắt +2; Thái y becomes her tâm phúc (S.doctor).
5. **UI (kit only)**: Mệnh truyện gets sub-tabs "Triều cục" and "Tâm nguyện" (kitSubTabs, kitSkillCard, rows67/kitRows, kitChecks, pbtn,
   kit result card resultShow, kit option line → KIT §28.6 hides outcomes, kit hint/risk rows). Beat dialogs are PEND items (pid "rg"),
   title "Phụ tuyến · Tân quân lập uy · Chương c · Hồi i/n"; Chương 2 shows the three faces (Hoàng thượng / Thái hậu / Tể tướng).
   No new kit part, no private CSS.

## Tests / measures
- dev/test/reign.js <page> <WxH> [shots]: beat × side build audit (300 dialogs, 48 Bạc options all with a non-Bạc road), dialog title,
  kit hide, join, switch, panes, line offer, every Tâm nguyện line driven to the end, outcome bands, save/load, old save, co-op guest.
  PASS 755x1000 and 1180x820.
- dev/measure/reign.js <page> emp,th,quyen,ngoai,sw <seeds> [months]: full inpage6 bots, side policy.
- dev/measure/rgpure.js <page> <sides> <lives> [months] (MT=1 real monthTick) + rgsweep.sh: Monte Carlo for BAL.rg tuning;
  rgsum.py summarises reign.js output.

## Numbers (balance of the three sides; bots answer every rg dialog for their side, random option of that side, never a decline)
- dev/measure/rgpure.js MT=1 (the game's real monthTick: court, Quốc sự, NPC months; her stats ramp to mid-game), 42 months:
  | run | neutral outcome (emp/th/quyen) | Hoàng thượng side win | Thái hậu side win | quyền thần side win |
  |---|---|---|---|---|
  | MT3 (pk .38, pkQ 1.65, drift .65, catch-up) | 4 / 8 / 3 of 15 | 9/19 = 47 % | 11/18 = 61 % | 16/19 = 84 % |
  | MT4 (pk .44, pkQ 1) | — | 12/23 = 52 % | — | 7/19 = 37 % |
  | MT5 final (pk .46, pkQ 1.25) | — | (≈55 % by MT3+MT4) | (MT3) 61 % | 14/21 = 67 % |
  Final BAL.rg: drift .65, A 48, B 60, pk .46, pkQ 1.25, thK .1, erP 30, catch-up 2 beats/month when ≥3 behind, outcome waits ≤3 months
  for her Chương 6 Hồi 1. Neutral with these numbers (MT2/MT3, 32 lives with an outcome): emp 9 · th 15 · quyen 8.
  Sample error at n≈20 is ±10 points: the three sides sit at ~55 / 61 / 67 % for a bot that always takes its side's option; the win
  payoffs differ in kind (tấn phong / Thái hậu che chở + favour / Bạc + house), the risks too (Hoàng thượng side holds the most proof
  against her: evOnMe 0.8–2.7 vs 0.3–0.7).
  Lives with no outcome by month 42 (dead / lãnh cung) are left out of the shares.
- Pure jreign-only model (no NPC months), 80 lives per side, before the real-month calibration: Hoàng thượng 55 %, Thái hậu 64 %,
  quyền thần 59 %; neutral 31 / 45 / 24 %.
- Quốc sự (Biên cương or Kho lúa < 40) costs the throne in ~17–22 of 42 months; sided consorts push +4…+9 net (the Emperor's side).
- Full inpage6 bots (dev/measure/reign.js, 44 months, ~10 min a life on the loaded machine): 3 Hoàng thượng lives before the catch-up fix:
  0 errors, 0 deaths, outcome th 2 / quyen 1 (her side lost: Sủng −8, Thái hậu −12), rank 5.3, 14.7 beats. Earlier build (1 life each):
  all three sides won (rank 2 / 5 / 5). The bot never plays Việc nhờ steps, so Tâm nguyện completion is checked by dev/test/reign.js.

## Follow-ups
- Tâm nguyện for the other named people: every consort (goal by trait: rise / protect child / revenge / love), the five house heads,
  the princes/princesses when grown, Kính sự phòng eunuch, maids of other palaces, the men (jmen). Same pattern (RGL entry + 3 templates).
- Epilogue after a "quyền thần nhiếp chính" outcome (the Emperor's counter-coup years later) and after "rèm châu" (the Thái hậu's death).
- Co-op: both players see their own beats; a joint beat (both on the same side) would be a nice addition.
- Painted event art for the 6 chapters (now the place art via evArt()).

## Reviewer r1 (review/reign-road-r1)
Merged main 63cf7b12a; fixes: emp win = exam grace (jexam exGrace) not a free rank; rgOn off after the Emperor's death / during the succession epilogue; kit: no body title, no `.past` hint block, Đổi phe in kitSkillCard acts, Tâm nguyện = kit person lines + kitInfo. See dev/review/reign-road.md.
