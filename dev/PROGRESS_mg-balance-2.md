# PROGRESS — review/mg-balance-2 (minigame difficulty part 2; owner OD 16/11 07:10Z / 07:20Z / 07:25Z: MEDIUM, Tuyệt phẩm 20–30 % for skilled play at the matching level, random ≈ 0, NO word games)
Base: review/mg-balance @ 26ff48ac + review/mg-balance-r1 @ 12e1d148 merged (reviewer fixes + kG re-trim; jbal2 conflict resolved by hand: both sides kept).

## What changed
- ONE CORE: new board levers live in `BAL.mgTier.lev[kind][name] = [at ease 0, at ease 5]` (jbal2) and are read with `mgLev(env, kind, name)` (jmgt, new).
  Calibration trims stay in `BAL.mgTier.kAdj` / `kG` (kAdj reset to 0 for the four retuned engines before calibrating; new entries td_hanh / td_dung / td_ngon).
- Nấu ăn `banh` (j91 k91Cook): the fire answers the fan with a LAG and «Gió lùa» gusts push it up/down (lev.banh lag / gust / gap). Oracle reads where the heat is heading.
- Cờ `co` (j82 kg82Go): time per position (lev.co.lim), a capture after `fast` ms earns less (down to 60 %), more stones at low ease (lev.co.extra → kg82GoGen `more`).
- Múa `mua` (j82 kg82Steps): each step must be tapped within the beat (lev.mua.beat; late = the round stops there), show speed (sp), easy boards forgive one wrong step per round (retry). kG 8 → 1.25.
- Làm phúc `td_hanh` (jtd kgTdAlms): each round has a time (lev.td_hanh.lim; auto «Phát xong» at 0), portions short in rounds 1–2 at low ease (short).
- Đầu hồ `dauho` (j91 k91Fling): aim-dot length (lev.dauho.aid) and pot mouth (mouth) by ease; peek tells the bot how fine a release the aim dots allow (`aim`).
- Đi đứng `td_dung` (jtd kgTdWalk): safe band + step sway by ease (lev.td_dung band / kick); oracle leans against the coming floor mark; deadband.
- **Ngôn `td_ngon` = new NO-WORD game «Nói đúng lúc, vừa tiếng»** (jtd kgTdTalk; kind + engine key + callers unchanged; old word data TD_SC/TD_TONE/TD_RULE removed):
  wait for the speaker (moving dots, no sentence) and for an upset one to calm (grey ring); green ring = her turn; HOLD «Thưa», let go inside the green voice band
  (bề trên nhỏ nhẹ low · kẻ dưới ôn tồn middle · ngang hàng vui vẻ higher). 30 % timing (no «cướp lời», not silent) + 70 % voice. Gợi ý (tdWrap) + first-time demo card (k91DemoCard).
  Levers lev.td_ngon band / win / rate / fade. Texts: KG82_KIND.td_ngon, TD_RULES/TD_EX/TD_GOAL/TD_HINT. No new art, no new CSS (kit button k91Btns, canvas board, kg82Lbl).
- Bot (dev/measure/mg-bots.js; same fixes in dev/test/mg-balance-vp.js): hold games may change place (Đi đứng left/right half = lift and press again);
  `at()` crash on a hold peek without x fixed (it silently killed the bot loop → td_dung read 0/10 before); peek `think` (×) / `thinkMs` (ms a person needs to work the move out:
  Cờ groups to read, Làm phúc short round); peek `aim` (drag scatter factor from the engine's aim aid); MGBOT_PX / MGBOT_RT env overrides; td_dung + td_ngon count as timing games.
- dev/measure/mg-grade.py (new): summarises a bot run with the GRADE the player sees (kG curve), not the raw float.
- dev/MINIGAMES.md: section "mg-balance-2".

## Measured (n = 30 per cell, `node dev/measure/mg-bots.js <url> <kinds> hoc/0/2,hoc/4/2,hoc/6/1 skilled 30 6 out.json` + random at hoc/4/2; graded with mg-grade.py)
Dễ = occasion 2 levels below her skill (hoc/0/2), Vừa = matching (hoc/4/2), Khó = 2 above (hoc/6/1). Xuất sắc = graded ≥ 9 (≈ Tuyệt phẩm).
| Kind | BEFORE Vừa skilled (PROGRESS_mg-balance) | Dễ: Xuất sắc / Giỏi+ / mean | **Vừa: Xuất sắc** / Giỏi+ / mean | Khó: Xuất sắc / Giỏi+ / mean | Vừa random: Xuất sắc / mean |
|---|---|---|---|---|---|
| banh Nấu ăn | 100 % | 100 % / 100 % / 10.0 | **27 %** / 97 % / 8.0 | 0 % / 0 % / 4.2 | 0 % / 0.3 |
| co Cờ | 87 % | 87 % / 90 % / 9.2 | **27 %** / 63 % / 6.8 | 7 % / 23 % / 4.7 | 0 % / 0.0 |
| mua Múa | 40 % (flat) | 37 % / 80 % / 7.9 | **30 %** / 47 % / 6.6 | 3 % / 7 % / 2.2 | 0 % / 0.0 |
| td_hanh Làm phúc | 100 % | 70 % / 83 % / 8.4 | **23 %** / 33 % / 5.9 | 7 % / 13 % / 4.4 | 0 % / 0.0 |
| dauho Đầu hồ | 0 % (bot could not play) | 63 % / 97 % / 8.7 | **22 %** (n=60) / 75 % / 7.3 | 3 % / 40 % / 6.0 | 0 % / 0.0 |
| td_dung Đi đứng | 0 % (bot could not play) | 100 % / 100 % / 10.0 | **23 %** / 100 % / 8.1 | 0 % / 27 % / 6.2 | 0 % / 0.8 |
| td_ngon Ngôn (new game) | word game | 83 % / 100 % / 9.6 | **23 %** / 80 % / 7.8 | 0 % / 47 % / 6.0 | 0 % / 0.0 |
Every engine: Vừa inside 20–30 %, Dễ > Vừa > Khó, random 0 %. (dauho: kAdj 1.4 gave 30 % and 47 % in two runs → 1.2, 22 % on n = 60; ±8 points is the n = 30 noise.)
Calibration values: kAdj co −1, banh −0.1, dauho 1.2, td_hanh −1.4, td_dung −1.2, td_ngon −0.9, mua 0; kG mua 1.25, td_ngon 1.6.

## Honest notes
- The skilled bot reads the right move from KG82.peek. For the puzzle games (Cờ, Làm phúc) a person's search time cannot come from the oracle, so the engine reports a
  `think` / `thinkMs` from what is on the board (white groups; people + short portions); for Đầu hồ the aim-dot length sets the release precision (`aim`). These are bot-model
  choices (documented in the bot header); the levers themselves are real board changes that a human feels (time, busier boards, beat, sway, lag, gusts, band, window).
- Khó is harsh for banh / mua / td_hanh (mean 2–4) but only when the occasion is ≥ 1.5 levels above her skill.
- 844x390: canvas games scroll inside the shared game frame (same as every j91 canvas game); the Ngôn speaker line is drawn on the board so it stays in view.

## Resume
- Re-measure: serve the repo root after `bash dev/site/build_site.sh`, then the bot line above; `python3 dev/measure/mg-grade.py out.json [kind=kG]`.
- Trim only BAL.mgTier.kAdj / kG / lev.
