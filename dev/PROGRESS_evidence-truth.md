# PROGRESS review/evidence-truth (worker, from origin/main 48a1c58d3)

Owner 15/11 (OWNER_DECISIONS "Evidence against a clean player; news text run together"): evidence must be TRUE; a clean player never has
evidence collected against her; fake evidence only through a frame scheme that can be cleared; news one fact per line.

## Design (code: dev/build/jtruth.js, assembled last)
- Deeds ledger per person (player and every consort): `p.wrongs` (S.deeds stays the j78 world log) [{k,t,w,at,x}] + `p.dw` (total weight, never trimmed) + `p.dkeys`.
  Written where the wrong is done: every harmful act through runAct (DEEDW table; spy/ally/gift/accuse/report acts are NOT wrongs),
  plots begun (j40 plan, j70 newPlot70, jtsb plan), servant bribe/plant/threat, contraband purchase (illBuy), flirting / taking a man's
  gift, caught() attempts, j42 servant-mode bribes. `deedSync` writes what the world shows (trysts, affair, own contraband, over-rank
  dress, Kính sự phòng mismatch, j40 plans). Old saves: `schemes` beyond recorded deeds = "từng bày mưu hại người".
- `evA` (j8) caps a gain at `deedCap(t)` minus what that holder has, returns the amount added. j78 wrapper returns it too.
- Spying (Dò la j8/jwhy, Tự đi dò la jecon): `spyFind` → real unproven deed, else "không tìm ra điều gì sai trái; chỉ biết <thói quen>"
  and `a.know` → +BAL.truth.spyKnowB on her next scheme against that person (odA, via ACTX.t) for spyKnowW weeks.
- Random "chứng cứ một phi tần +1" sites now pick only someone with an unproven wrong (`evGuilty`), else a harmless line.
  Event texts that state a deed as fact (j3, j4, j7, j67 arc wins, j68f/g) write it with `evStory` first.
- Rumours: evidence with no deed behind (old saves at load, or any write bypassing evA) → `t.evR` / `h.evr[key]` by `evTruthSweep`
  (load + each endTurn). Shown: evidence card section "Tin đồn (N)" (j79 kitEvidencePanel, kit card kitEvidence), intel line on the
  consort ("chỉ nghe N tin đồn về ngươi"), `evidenceHeldOnMe().rumours`. Never proof.
- Frames (Vu oan, bùa found by inspection, servant-mode plant): `framed()` gives the victim a defence (frameDef: Kính sự phòng night,
  loyal maid witness, Thái y, evidence on the framer, Cung Chính ti). Cleared → `frameExpose`: framer Danh −15, Đức −8, punished,
  victim holds 2 true pieces. The player chooses (PEND.vuoan dialog, same machinery as PEND.wdframe). Giá họa (j92) already had this.
- `realCrime` (Tố tội thật) no longer counts planted items.
- News (j70 note70): one fact per sentence → one kit row each (who · what / why / sent / result / details); clean-spy result reads
  "Kết quả: không tìm ra điều gì sai trái của ngươi." + "Nàng chỉ biết thêm …". Fixes the glued "Tiểu Phúc TửKết quả".
- Numbers: BAL.truth in jbal2.js.

## Tests
- `python3 dev/test/evtruth-scan.py` — every evidence-giving site; before (origin/main): 108 evA gains, 29 direct `.ev` writes,
  80 unchecked "chứng cứ +N" announcements; after: 118 / 6 (all reviewed: sync/core/separate stores) / 0.
- `node dev/test/evtruth-bot.js <url> [lives] [seed]` — clean player, 2 in-game years per life; numbers in the final report.

## Results (bot, 7 lives × 24 months, seeds 2 and 3, sha after 2bc236b11)
- Fully clean lives (ledger empty at the end): 3/7 → TRUE evidence held on her: 0, rumours 0; spied on 11 times, found nothing every time;
  13+ evidence pieces asked for against her were refused (no deed).
- The other 4 lives were not clean (the bot took a man's gift / wore an over-rank hairpin / recruited a servant): evidence then matched
  those real wrongs only (≤1 piece per holder per wrong weight).
- NPC-vs-NPC: 0 pairs where anyone holds more evidence than the target's real wrongs (npcBad 0); ~3 sweep moves to rumour in 7 lives
  (writes that bypass evA, e.g. j96 / co-op sync) — harmless.
- Frames on the player: 3 in 14 in-game years (Vu oan / Giá họa), 2 cleared. Frames between consorts: rare (0 counted); defence odds
  10–85 by BAL.truth.
- Old save: 3 pieces held on a clean player → 0 evidence + 3 rumours (shown "chỉ nghe 3 tin đồn … không có bằng chứng thật");
  the player's 2 pieces on a clean consort → evidence card section "Tin đồn (2)".
- Known: the frame dialog at 390x844 shows the generic event layout (framer name over the art) like other PEND dialogs — kit, not this branch.
