# tut-quests (worker, P2 tutorial quests ch 1–3) — SẴN SÀNG KIỂM

Branch `review/tut-quests` @ 36e7b0e6ef143c0fd9abf21f2b36a0fba72ce743 (base origin/main 392fff60). Site rebuilt (build_site.sh).
Rules read: CLAUDE.md, PREAMBLE, START_CORE, START_WORKER, OD:L1233/L1242/L1259/L1271/L1272/L1402/L1432 + every 'tutorial' OD line, ROAD_MAP Part 1, story14 reports.
LUẬT ƯU TIÊN SỐ 1: reused jst14 (MS67 nhap14/sung14/tap14, BAL.st14, msHan67), jgoal (kitGoalNow/Detail, "Đi làm" goWhere), jstaff (named officials,
staffFace), kitPanel event template, kitChecks. No earlier quest work existed on main or review/* (review/quests = j72 Việc nhờ, tut-place/tut-replay = jtut tour).

## What it does (dev/build/jtq14.js, after jact.js; details in dev/PROGRESS_tut-quests.md)
- Each tutorial chapter started on this build gets 3 DO-the-feature quests (S.st.ms.q14), variant fixed at chapter open:
  | ch | consort (narrator Giáo tập ma ma) | cung nữ still serving (narrator Quản sự ma ma) |
  |---|---|---|
  | 1 | Thỉnh an Thái hậu/Hoàng hậu · đi một nơi (Dư đồ) · thay y phục/trang sức | việc hầu hạ · Học lễ nghi · đi một nơi |
  | 2 | bán đồ trong rương riêng · Điểm trang/Dưỡng nhan · mua ở Nội vụ phủ | Chải chuốt · đến Ngự hoa viên · Thêu khăn bán |
  | 3 | một việc với một phi tần (Hậu cung) · một buổi học ở Tài nghệ · trò chuyện với cung nữ | trò chuyện / biếu quà đồng liêu · Luyện thêu |
- Story (OD:L1259): chapter-open card = the official tells why these tasks matter now in her life (narrator by office, OD:L1432, map in BAL.st14.q.narr);
  each done quest = a short line from the same official + reward. Address via shared lowRank (tiểu chủ / nương nương / ngươi).
- Reward only when done (OD:L1233): each quest pays BAL.st14.q.bac (c 15 / s 3) the moment it is done; the chapter's own reward needs milestone AND
  every quest; time-out → «Lỡ dịp», no chapter reward (OD:L1242). A maid raised mid-chapter: open maid quests lapse (not required, no pay).
- Detection on the game's own functions, every path of a kind (LUẬT SỬA CẢ NHÓM): runOpt (all act cards + pop-up options), goTo, wear + wdWear,
  sellItem + wkSell + econSell (counted once), buy + every kitShop item, runAct(S, consort) (every deed path incl. gift/plant pickers, schemes,
  co-op invites), addArt + addVir (every lesson incl. jwkr picker + mini game; half-done lesson does not count), srvStaffAct.
- Small edits: jst14 «Lỡ dịp» rule reads tq14Real (late = only the "t" step); jgoal: quest chapters are "every line must be done", open quests
  are "Việc nên làm" with "Đi làm"; "any" milestones show as ONE "· hoặc" line. BAL.st14.q added (jbal.js), one-core scan 0 typed numbers.
- KIT: no new part (kitPanel event template with the official's full figure left, meaning picture right, rows, ✕; kitChecks). No KIT REQUEST.

## Tests
| test | result |
|---|---|
| dev/test/tut-quests.js (new): tt + cnv play ch 1–3 by tapping real buttons (act cards, Đồng liêu, Tài nghệ Tự rèn → work → material → «Để trời định», Nội vụ phủ Mua; Tư trang sell econSellUI; goTo / wdWear / runAct where the tap is map/drag); milestone-only does not close; time-out «Lỡ dịp»; raised maid lapse; old save without q14; shots 6 sizes no h-overflow | 40/40 PASS, 0 page errors |
| dev/test/story14-frame.js (updated: quests marked done where the milestone alone closed a tutorial chapter; "old save (main build)" now expects main's live frame, was stale since c053ee92) with MAIN = origin/main 392fff60 build | 27/27 PASS |
| dev/test/story14-view.js 755x1000 + 1180x820 | PASS |
| dev/test/coop-e2e.js (live Worker) | 59/59 PASS |
| dev/test/tutorial.js 755x1000 tour, skip | PASS; replay mode crashes (`#modal .ktutb` null) — SAME on origin/main 392fff60 (checked), not this branch |
| one-core scan (dev/measure/st14-onecore-scan.py dev/build/jtq14.js) | 0 typed game numbers |
Shots (looked at): CDN review folder img/_review/tut-quests/ (open/done at 755x1000, 1180x820, 844x390, 412x1058). Figures load late on first open
(CDN), seen complete after the wait.

## Notes for the coordinator
1. tutorial.js replay mode fails on main too (pre-existing).
2. Co-op: quests are each player's own life state (S); no shared world value is computed here.
3. "Bước n/m" on the Mệnh truyện chapter card still counts the time line (old cosmetic note 4 of review-story14-p1-r3).
START_CTX ~3 %; ended well under the rollover ceiling. Worktree deleted after push.
