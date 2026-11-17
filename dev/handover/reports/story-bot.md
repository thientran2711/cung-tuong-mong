PRIORITY #1 CHECK ('story-bot|story bot'): OD 0 | ledger 0 | claims 4 | main 0 | review/* 0 → extended the existing sens/D31 bots (dev/measure/runb.js + inpage6.js + inx/inpz/indiff), no new bot framework.
# P5 STORY BOT — chapter balance per origin × difficulty (report only, BAL untouched)
Worker D8 story-bot (START_CTX ~6 %). Branch review/story-bot @0e8f8ff8057fab2697b8b76e03c1117db6788699 (base main 7abaf07a).

## What was built (dev/measure on review/story-bot)
- `instory.js` (INP2 add-on to inpage6 sens bot): logs every chapter start of the 14-chapter frame (jst14: month, buổi, rank/Sủng/Danh), each chapter's outcome (S.st.ch.past), curves every 3 months, tutorial quest state at close; CHSTOP=n ends a life when chapter n starts (fast ch1–4 runs).
- Tutorial follower: a sensible new player does the jtq14 quests of ch1–3 through the game's own functions (act card, goTo, wear, econSell, buy, lesson, doAct, srvStaffAct) and chases the ch3 goal (one friend + one art). Without it every tutorial chapter closes «Lỡ dịp» for a bot reason only (the sens bot never sells/buys/wears).
- Bot fix: the sens bot pressed greyed options (c.off, e.g. «Tố giác» in j70 «Sau vụ mưu hại») → chooseM no-op → 7/10 pilot lives TIMEOUT. instory takes the best open option instead (0 stuck after).
- `runstory.sh` (origin × difficulty rotation like rundiff.sh, ≤ 2 browsers), `anstory.py` (tables). Raw tables: dev/measure/story-bot-p1.md, story-bot-p2.md.
- Runs: P1 = 281 lives to ch5 start (or 8 y), 10 origins (bd counted separately from nc) × Dễ/Vừa/Khó, ~9–10 lives per cell (small n: ±15 pts per cell). P2 = 30 whole lives, Vừa, 3 per origin.

## Chapters 1–4 (P1, 281 lives)
| diff | lives | reach ch4 | reach ch5 | ch4 start (month, median) | early death < 3 y | stuck | ch1 done | ch2 done | ch3 done |
|---|---|---|---|---|---|---|---|---|---|
| Dễ | 88 | 90 % | 84 % | 13 | 8 % | 0 | 54/80 | 71/80 | 40/79 |
| Vừa | 96 | 85 % | 77 % | 14 | 15 % | 0 | 56/86 | 77/86 | 22/82 |
| Khó | 97 | 86 % | 75 % | 13 | 14 % | 0 | 57/87 | 78/87 | 27/83 |
| all | 281 | 87 % | 79 % | 13 (≈156 buổi) | 12 % | 0 | 66 % | 89 % | 36 % |
"done" = Xong; the rest closed «Lỡ dịp» by time (no reward). Per origin × difficulty table: dev/measure/story-bot-p1.md. Highlights:
- **bd (Bắc Địch): 0 chapters in 28/28 lives** (S.st = {}). See fault 1.
- nc ch1 done 4/29 (starts at a high rank; «tấn phong một bậc» in 6 months is rare). cnv ch2 «Lọt vào mắt Hoàng thượng» done 1/28 (nt 25 in 10 months); cnv reaches ch4 latest (month 19–20 vs 13).
- ch3 «Học quy củ» done 36 % even with the bot doing every quest and chasing the goal: the milestone (a consort at thiện cảm 30 toward her + an art at bậc 2 within 8 months) is the miss; quests themselves were done (only 22 quest misses in 244 closes).
- Pace: ch2 opens month 4–6, ch3 month 5–7, ch4 month 13 — set mostly by the ch1 (6) and ch3 (8) time limits, not by play.
- Early deaths < 3 y: Dễ 8 % ≈ Vừa 15 % ≈ Khó 14 %: Khó is not harder than Vừa in the first years.
- Sủng 85–95 by month 12 for every consort origin, while Danh at month 24 is median 0–16 and rank@24 m median 0–2: Sủng saturates, Danh collapses (e.g. tt Danh 82 → 0 and rank 3 → 0 in 24 months).
- Ch4 (first origin chapter) outcome k: ok ~27 %, mid ~45 %, bad ~28 %; td ok 5/23 (lowest), cnv ok 16/27 (highest).
- Top punishments over P1: «cấm túc vì giả bệnh khi quân» 827 (~3/life), «bị Hoàng hậu xử tội» 764, «xét tội theo chứng cứ» 321, «bị giáng» 256+210.

## Whole lives (P2, 30 lives, Vừa)
- **Hoàng hậu 0/30** (target ~32 %, OD:L20/L43). Max rank: Đáp ứng 2, Quý nhân 7, Tần 11, Phi 6, Quý phi 4. Rank at death: Đáp ứng 16/30.
- Median life 11.5 y, death age 30; ends: xuất gia 9, tuổi xuân qua đi / lãnh cung 4, illness 8, childbirth 3.
- Chapters: median last chapter 10; 13 lives reach ch13 and stop there (ch14 «Mẫu nghi thiên hạ» needs Hoàng hậu → never). Early death < 3 y 20 % (target 40–45 %).

## Ranked balance faults (propose only — coordinator routes fixes)
1. **BLOCKING · bd has no story frame.** jorigins.js (adds bd) is assembled AFTER j67.js; j67's two load-time loops `Object.keys(STORY).forEach` (j67.js:185 wrap + :1788 acts) never see STORY.bd → a67init never runs, S.st = {}, no Mệnh truyện, no 14 chapters, ARC67.bd_* unused. Family scan: only these two loops; no other origin is added after j67. Fix = load jorigins before j67 (or wrap bd there). Code, not BAL.
2. **HH 0/30 + rank collapse (Vừa).** Sủng saturates ~90 by month 3–12 but Danh drains to ~0 and ranks fall (Đáp ứng at death 16/30). Keys to look at: Danh losses in punish()/cấm túc (j13 punish, BAL.tw.*), RANKS[].d gates (j1), Danh gains (BAL.st14.danh is small: 2–4). Needs a Danh-flow trace (inx «dem» counters already show the causes above) before any change. Caveat: the sens bot's own choices weigh in (fault 3).
3. **«Giả bệnh» (j13:44) is a trap the bot falls into ~3×/life:** card shows o:100 + Sủng, the risk only in text («bị phạt: Khá…» chanceW(28)); punishment = Danh −6 + cấm túc (+ possible demotion). Also ONE CORE: the 28 (j13:44) and the monthly catch roll(15) (j13:31) are hard-coded, not BAL → move to BAL.tw.g (e.g. illCatch 15, illShow derived from it). Balance key: BAL.tw.g.ill (gain) vs the catch odds.
4. **ch3 «Học quy củ» done 36 %:** BAL.st14.goal.rel 30 (thiện cảm OF a consort toward her) is slow in 8 months; propose goal.rel 20 or lim.tap 10 (aim 60–70 % for a player who follows the goal).
5. **cnv ch2 done 1/28:** BAL.st14.goal.nt 25 in lim.sung 10 months → propose nt 15–18 (or lim.sung 14 for cnv).
6. **nc ch1 done 4/29** (vs ~70 % for others): «tấn phong một bậc» from a high entry rank in lim.nhap 6 months; propose a cnv-like per-origin limit (lim.nhap 9 for r≥3 origins) or accept a Danh/Sủng goal instead of a rank step.
7. **Khó ≈ Vừa early (early death 14 % vs 15 %, ch4 reach 86 % vs 85 %):** DIFF.kho knobs act late (birth/illness/poison); early years differ only by BAL.hz ×1.1. If Khó should bite early, raise DIFF.kho.bal.hz (e.g. 1.3).
8. **Early death < 3 y Vừa 20 % (whole lives)** vs target ~40–45 %: low; decide after fault 2 is fixed (the two interact).
9. Minor: cnv Danh curve reads 100 from month ~12 in every cnv life while still a maid (cv Danh column) — check what S.danh means for a serving maid; tamco=101 seen once (ch, >100 clamp missing).

## Bot-vs-player caveats
Sens bot ignores option risk text (fault 3 inflated), does not play minigames well, and the follower only does what jtq14 hints say. Cells have ~9–10 lives (P1) and 3 lives (P2): treat per-cell numbers as ±15 pts; the totals are firm. CPU: 2 browsers, P1 ~80 min, P2 ~70 min.

## Re-run
`OUT=/tmp/sb bash dev/measure/runstory.sh $PWD/dev/index.html <shard> <lives> 5` (ch1–4) or `... <lives> 0 "<origins>" "vua"` (whole lives); `python3 dev/measure/anstory.py /tmp/sb/story_*.json`.

SẴN SÀNG KIỂM 0e8f8ff8057fab2697b8b76e03c1117db6788699
