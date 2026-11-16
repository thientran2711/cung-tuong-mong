# PROGRESS review/elder-staff (owner 16/11: real elderly palace staff; the tutorial guide is one of them)

## Final scope (owner corrections 16/11, via coordinator)
5 named servants, each with 3–4 duties; numbers/names in `BAL.staff` (dev/build/jbal.js):
| id | name (called) | post | household (master) | duties |
|---|---|---|---|---|
| gt | Tống Quế Chi (Tống ma ma), 50–55 | Giáo tập ma ma, Trữ Tú cung | Thái hậu (sent to Trữ Tú cung) | teach tú nữ, lễ nghi/cung quy, tuyển tú, the tutorial guide |
| tn | Hà Tú Dung (Hà cô cô), 44–49 | Chưởng sự cô cô, Đức Thọ cung | Thái hậu | Thái hậu's edicts, cung quy, punishments, Tân Giả khố |
| kn | Diệp Thanh Hòa (Diệp ma ma), 54–60 | Quản sự ma ma, Càn Ninh cung | Hoàng hậu (Thái hậu keeps her while the seat is empty; the player if she is Hoàng hậu) | maid assignments, lệ bạc, Thượng cung cục, monthly report |
| tq | existing S.court.tq | Tổng quản thái giám | Emperor | unchanged (reused) |
| ksp | existing S.court.ksp | Kính sự phòng | Emperor / Nội vụ phủ | unchanged (reused) |
Successor names per post are in BAL.staff.posts[].names. Game palace names kept (Đức Thọ cung = Thái hậu, Càn Ninh cung = Hoàng hậu: the
map/places use these; Từ Ninh / Khôn Ninh would contradict 67 existing lines).

## How (dev/build/jstaff.js, assembled last)
- Women are ordinary servant entries (j10 model) in the master's `staff`; Thái hậu's household = `S.thO.staff` (co-op world key thO).
  allServ/ownerOf include it; srkMax/capOf give Thái hậu the top cap; fitCap moves one ordinary maid out if a master is over cap.
- srkName shows the post title. Cung nhân tab (j15 staffTabHTML): new "Cung Thái hậu" section (elderTabRows) + "Chức việc" kit rows and
  "Giao thiệp" (Biếu / Hỏi chuyện) groups on their cards; Diệp ma ma shows under her Hoàng hậu's household like any servant.
- Face: unique identity (figUsed), ma ma identities first, always the a51 art; staffFace(st) = pServ(st) (+__kr/__kp) = same picture in
  the list, stage, cards, events, tutorial. Looked at all 8 ma ma identities (a36/a51) and maid a51 tiers: tiered a51 maid art and
  a36 look young, so never used. No new art needed (8 ma ma identities, 52 plain maid a51).
- staffGuide() → {id,sid,name,full,title,office,palace,master,face,kr,age} for review/tutorial-r2.
- Stage: Hà cô cô at Đức Thọ cung and Tân Giả khố (servant road), Diệp ma ma at Càn Ninh cung, Tống ma ma in the newcomer's room for
  her first 4 turns; tapping opens the kit pcard. Familiarity: Biết tên from day one (k61St floor 2); Hỏi chuyện makes her Quen biết.
- Events/log: one phrase table (elderTx) names the generic Thái hậu ma ma lines (EV6 thMama), "Theo ma ma giáo tập học"; Tuyển tú,
  Tân Giả khố, Đổi chủ dialogs get a line from the right woman; monthly report line from Diệp ma ma (heirMonth hook).
- Ageing by allServ; retire at 63–68 → next name takes over (log line); window.STAFF_MORT(st) hook for review/mortality.
- Old saves: seeded silently in staffInit. Co-op guest never seeds (host-authoritative).

## Test
`node dev/test/elder-staff.js <base> <outdir> [WxH…]` (seed/uniqueness/caps, guide face == list face, ageing + mortality hook, old
save, Cung nhân tab, text table, monthly line, stage card + Hỏi chuyện, page errors). PASS at 1180x820 and 844x390.
