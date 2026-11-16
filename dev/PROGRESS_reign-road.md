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
   (Sủng / Thái hậu favour / Bạc + house), own missions, own enemies (other sides' consorts −, own side +), own ending (win: tấn phong one
   rank / Thái hậu che chở 6 months + favour / Bạc + Tai mắt + house; lose: mirror). Trust (tr) scales the win. Family by origin:
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
- dev/test/reign.js <page> <WxH> [shots]: beat × side build audit (Bạc road audit), dialog title, kit hide, join, switch, panes,
  line offer, outcome bands, save/load, old save, co-op guest. PASS 755x1000 and 1180x820.
- dev/measure/reign.js <page> emp,th,quyen,ngoai,sw <seeds> [months]: full inpage6 bots, side policy.
- dev/measure/rgfast.js <page> <sides> <lives> [months]: fast month-only Monte Carlo for BAL.rg tuning.

## Follow-ups
- Tâm nguyện for the other named people: every consort (goal by trait: rise / protect child / revenge / love), the five house heads,
  the princes/princesses when grown, Kính sự phòng eunuch, maids of other palaces, the men (jmen). Same pattern (RGL entry + 3 templates).
- Epilogue after a "quyền thần nhiếp chính" outcome (the Emperor's counter-coup years later) and after "rèm châu" (the Thái hậu's death).
- Co-op: both players see their own beats; a joint beat (both on the same side) would be a nice addition.
- Painted event art for the 6 chapters (now the place art via evArt()).
