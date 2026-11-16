# mg-balance-2 — worker report (11/16/2026)
Branch review/mg-balance-2 (base review/mg-balance 26ff48ac + review/mg-balance-r1 12e1d148 merged; jbal2 conflict resolved keeping both sides). Details + resume: dev/PROGRESS_mg-balance-2.md on the branch.

## Done
1. Real board levers driven by ease, all numbers in BAL.mgTier.lev[kind] = [ease 0, ease 5], read by the new jmgt helper mgLev(env, kind, name):
   - Nấu ăn banh: fire LAG behind the fan + «Gió lùa» gusts. Cờ co: time per position, slow capture earns less (to 60 %), busier boards (extra stones).
   - Múa mua: beat window per step (late = round stops), show speed, easy boards forgive one wrong step per round; kG 8 → 1.25.
   - Làm phúc td_hanh: round timer (auto «Phát xong»), portions short in rounds 1–2 at low ease.
2. Bot now plays Đầu hồ (aim-dot length = release precision via peek.aim; mouth size lever) and Đi đứng (hold left/right with place change; a crash in the bot's at() on hold
   peeks without x had silently killed the bot loop → the 0/10 before; band + sway levers). Both calibrated.
3. td_ngon (Tứ đức Ngôn) WORD game replaced by a NO-WORD game «Nói đúng lúc, vừa tiếng» (same kind key td_ngon, engine key tdtalk, callers untouched; old word bank removed):
   wait for the speaker (dots, no sentence) and for an upset one to calm (grey ring); green ring → hold «Thưa», release inside the voice band of that listener
   (bề trên nhỏ nhẹ · kẻ dưới ôn tồn · ngang hàng vui vẻ). Gợi ý + first-time demo card (k91DemoCard, with a small moving example). Kit parts only (k91Btns, canvas board, kg82Lbl); no new art, no new CSS.
4. dev/measure/mg-grade.py (graded summary), MINIGAMES.md section, test bot synced (dev/test/mg-balance-vp.js).

## Bot table (n = 30 per cell; Xuất sắc = graded ≥ 9 ≈ Tuyệt phẩm) — Dễ / **Vừa** / Khó skilled, random at Vừa
| Kind | before (Vừa) | Dễ | **Vừa** | Khó | random |
|---|---|---|---|---|---|
| banh Nấu ăn | 100 % | 100 % | **27 %** | 0 % | 0 % |
| co Cờ | 87 % | 87 % | **27 %** | 7 % | 0 % |
| mua Múa | 40 % flat | 37 % | **30 %** | 3 % | 0 % |
| td_hanh Làm phúc | 100 % | 70 % | **23 %** | 7 % | 0 % |
| dauho Đầu hồ | not playable by bot | 63 % | **22 %** (n=60) | 3 % | 0 % |
| td_dung Đi đứng | not playable by bot | 100 % | **23 %** | 0 % | 0 % |
| td_ngon Ngôn (new) | word game | 83 % | **23 %** | 0 % | 0 % |
All seven inside 20–30 % at Vừa, Dễ > Vừa > Khó, random 0 %.

## Tests
dev/test/mg-balance-vp.js (old save from origin/main build loads; every touched kind + td_cong/dan/theu opens and FINISHES): 755x1000@2, 1000x755@1, 1180x820@2, 1366x1024@2, 844x390@2, 390x844@2 →
10/10 plays each, 0 bad (overflow / tier row / finish), 0 page errors. 390x844 shows the rotate prompt «Xoay ngang điện thoại để chơi». Screenshots looked at (Ngôn play + demo at 755x1000, 1180x820, 844x390; Làm phúc timer; Cờ at 1366x1024).

## Honest notes
- Puzzle games: the oracle bot cannot "search", so Cờ / Làm phúc report a think time from what is on the board (peek.think / thinkMs) and Đầu hồ an aim precision (peek.aim) — bot-model choices, documented in the bot header; the levers themselves are real board changes.
- Khó is harsh for banh / mua / td_hanh (mean 2–4), only when the occasion is ≥ 1.5 levels above her skill.
- 844x390: canvas games scroll inside the shared game frame (all j91 canvas games do the same; the Ngôn speaker line is drawn on the board so it stays in view).
- Still not tiered (unchanged from mg-balance): Điểm trang, Chải chuốt, Phối đồ, pet care.
KIT REQUEST: none. Owner questions: none.

SẴN SÀNG KIỂM b011cf71fcb4cf8d56378b40eafa74d7d62dceb3
