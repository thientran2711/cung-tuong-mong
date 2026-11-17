# PROGRESS review/tut-quests — tutorial quests of chapters 1–3 (P2, ROAD_MAP Part 1)

Owner rules: OD:L1233 (DO the task, reward only when done), OD:L1242 (ch 1–3 tutorial, no skip-with-reward), OD:L1259 (part of the
story), OD:L1432 (narrator = the palace official of the topic), OD:L1267 (one core), OD:L1271/L1272 (person pop-up = event template).

## What is built
- `dev/build/jtq14.js` (assembled after jact.js): 3 quests per tutorial chapter × 2 variants (c = consort start, s = cung nữ who still serves).
  | ch | consort (narrator Giáo tập ma ma, BAL.st14.q.narr.c) | cung nữ (narrator Quản sự ma ma, .s) |
  |---|---|---|
  | 1 nhap14 | Thỉnh an Thái hậu/Hoàng hậu · đi một nơi (Dư đồ) · thay y phục/trang sức (Tư trang) | một việc hầu hạ · Học lễ nghi · đi một nơi |
  | 2 sung14 | bán đồ trong rương riêng · Điểm trang/Dưỡng nhan · mua một món ở Nội vụ phủ | Chải chuốt · đến Ngự hoa viên · Thêu khăn bán ra ngoài |
  | 3 tap14 | một việc với một phi tần (Hậu cung) · một buổi học ở Tài nghệ · trò chuyện với cung nữ | trò chuyện / biếu quà đồng liêu · Luyện thêu |
- Detection = hooks on the game's own functions, every path of a kind: runOpt (acts + pop-up options), goTo, wear + wdWear, sellItem +
  wkSell + econSell (one sale counted once), buy + every kitShop item onBuy, runAct(S, consort) (every deed path), addArt + addVir (every
  lesson incl. the jwkr picker + mini game), srvStaffAct (colleague deeds).
- Chapter rule: quests are steps (flag "q"); done = milestone (jst14, "any" milestones folded into ONE "· hoặc" line) AND every quest.
  jst14 «Lỡ dịp» rule now reads `tq14Real` (real = milestone + quests; late = only the "t" step). Each quest pays BAL.st14.q.bac[v] at once.
  A maid raised mid-chapter: open maid quests lapse (not required, no pay).
- Displays (kit only, no new part): chapter-open card = kitPanel info with the narrator as subject (event template: full-body left,
  meaning picture top right, rows, ✕); quest-done card = kitPanel result, same template; steps in chapter detail / Mệnh truyện (kitChecks);
  jgoal "Việc nên làm" = open quests with "Đi làm" (C.todo).
- Numbers: BAL.st14.q {bac:{c,s}, need:{ban}, narr:{c,s}} (jbal.js). One-core scan of jtq14: 0 typed game numbers.
- Saves: only chapters started on this build get q14; older ones keep the old rule (test E).

## Tests
- `dev/test/tut-quests.js <built url> [shots]` — both variants play ch 1–3 by tapping real buttons, + time-out, raised maid, old save, shots.

## Resume notes
- Shots: never in git; worker shots were in /home/user/wt/tutq-shots.
