# review/tutorial-r2 (base origin/main 3ef079f61) — new-player tutorial + life goal (owner 16/11 "không thấy ... mục tiêu đời mình? Chơi bị lạc lối", "Không bấm xem được")

Replaces review/tutorial (WIP 2/3, ~770 behind): its 3 files were re-ported onto today's main, not merged.

## What is in
- `dev/build/jtut.js` (KIT §72.1, was §36 on the old branch): guide = staffGuide() of review/elder-staff when present (name, title, face; fallback Quế ma ma), kitCoach spotlight + kitTip first-time tips, tour ≤12 steps
  (step 1 = "Game này chơi gì": 4 pages with pictures — what the game is, the goal, how a day works, win/lose + Phúc duyên + co-op · thanh trên · buổi/khắc/quẻ · đọc thẻ · làm thử (+thẻ kết quả) · Dư đồ · Hậu cung group · Giao tình group · Tư trang · Mục tiêu chương
  (goal strip) · ☰ ghi/nạp sổ · Sang buổi). Group steps read the live tab layout (`#tabs [data-tab]`, `KG`, `.ksub [data-ksub]`).
  Thiết lập switch "Lời dặn tân thủ" + "Xem lại lời dặn" button there and in ☰. Sổ in its first 2 weeks: asked once; past week 2: no tour, no ask, no tips (S.tutOld).
  Fixes vs old WIP: fresh-life flag not tied to `quiet` (Luân hồi waits for figures), trial act = quiet card (never Điểm trang / lessons that open
  a mini game), any other kit panel pauses the tour, ring clipped to the visible part of the scroll box and above the bottom bar, tap-step card
  narrows into the free side on phone landscape, tips wait while a coach ring is open, staff wording "Ta tin cậy" (VANPHONG fixer scan clean).
- `dev/build/jgoal.js` (KIT §72.2–72.3): kitGoalNow (one data source) · kitGoalStrip (the EXISTING Hành sự line `.obj67` of j67 is now this kit
  strip, tappable, "›"; also on the main stage, left of the stage chips, hidden when the Hành sự strip shows) · kitGoalDetail (chapter detail,
  MINIMAL view for review/chapter-detail C24) with "Đi làm" options (open the tab + ring the act card) · kitGoalCard "Mệnh truyện kiếp này"
  queued right after the Nhập cung card of a new life (each machine / own life; co-op guest too). Chapter card on Mệnh truyện › Chương này opens
  the detail too.
- `dev/build/j67.js`: the Hành sự goal line uses kitGoalStrip (falls back to the old line if jgoal is missing).
- KIT.md §72 (number PROVISIONAL — coordinator registry). Kit sample page: KIT_SAMPLES §72.

## Tests (serve the repo ROOT after `bash dev/site/build_site.sh`; dev/index.html alone does not boot)
- `node dev/test/goal.js <url> WxH [shotdir] [origin]` — goal card after Nhập cung, tour starts, strip, tap → detail, Đi làm → ring, old sổ
  past week 2 = nothing. PASS 755x1000, 1180x820, 844x390 (tt), 755x1000 (cnv). 390x844 = rotate prompt (ring check n/a there).
- `node dev/test/tutorial.js <url> WxH@dpr <outdir> <tag> [tour,skip,replay,old,bot]` (reduced motion by default; MOTION=1 for animation).
  tour PASS 755x1000, 1180x820, 844x390; skip/replay/old/bot PASS 755x1000. Machine is overloaded: timings flaky (replay once needed a rerun).
- Images on headless need HTTPS_PROXY (the tests pass it to chromium).

## Open / for the coordinator
- KIT §72 number to confirm. review/newgame-ui may change the Nhập cung card into the event frame: the goal card finds it by title /^Nhập cung/
  (also kit.title), so it stays right after it. review/chapter-detail (C24) should grow kitGoalDetail instead of a second panel.
- Co-op: only by design (all local per machine; start() runs on each machine) — no 2-device run done here.
