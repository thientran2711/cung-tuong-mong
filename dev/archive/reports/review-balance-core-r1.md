# review-balance-core-r1 — verdict: **FAIL** (review/balance-core @ 10fa43d4)

Reviewer session_01UV1SzhHhDwddRtuuW6hpL9 (opus), coordinator MAIN s26. START_CTX ≈ 9 % of the 1M window.
Base: 10fa43d4 sits directly on origin/main 08725411 (no merge needed). No reviewer commits; nothing pushed to review/balance-core-r1.

## Tests run by the reviewer
| test | result |
|---|---|
| dev/test/balance-core.js | **FAIL 1/38 in 3 of 4 runs** ("favoured art up, disfavoured art down" [71,51,51]) — real bug, see F2 |
| dev/test/night-steal-unit.js | PASS, 0 page errors |
| coop-e2e.js (live Worker) | 59/59 PASS |
| coop-night.js (live Worker) | 105/105 PASS |
| coop-steal | no such test on main/branches; night-steal-unit has the co-op guest cases (PASS) |
| quickcheck.sh | PASS (172 s, old save ok). A first run FAILED longTaskMaxMs 31 s only because two bot runs loaded the box; idle rerun PASS |
| one-core-guard (from review/one-core-land-r1, run on this branch merged onto it) | FAIL 55 → all in jbal2.js, see F1/F3; outside jbal2 the inline count DROPS 6691 → 6665 (good) |
| HH-rate bot (dev/measure/kchh.js, branch vs main) | not finished (≈10 min per life; stopped) → F6 |

## FAIL list (numbered, for the worker)
1. **BAL.orig name clash with review/one-core-land (PASS, waiting for the next go-live batch).** one-core-land jbal.js line 123 already has `Object.assign(BAL,{orig:{bd,ngua,tuc…}})` (Bắc Địch numbers read at load by jorigins: `BAL.orig.ngua.s2a.c`, `BAL.orig.tuc.c1a.c`…). This branch's `BAL.orig={…}` in jbal2 (loads after jbal) REPLACES that object → jorigins throws at load once both are on main. Also 3 textual conflicts (assemble.py list, j2 stealX/stealKem vs one-core's nightG/nightA text, jorigins: both branches rewrote the same 4 lines). Fix: rename the start table (e.g. `BAL.start`) or merge into the existing key; rebase on one-core-land and keep its `nightG/nightA` text with your mode-aware stealKem; jorigins: one-core's BAL-read costs + your `artO(S,"y"/"vu")`.
2. **`bestArt` is shadowed — the night art bonus reads the PLAYER's arts for every NPC.** jbalcore declares `function bestArt(p)`, but j1:145 has a `bestArt()` and **j85:182 reassigns `bestArt=function(){…S.arts…}` at run time** (no argument, skips Thêu/Nấu, returns "giọng hát" k:null). Live effect: `stealArtB(v,…)` for any NPC uses S's best art; Thêu/Nấu never count (cung nữ origins' best arts); npcStudy's "focus on her best art" focuses every NPC on HER best art. Two-way rule broken; the balance-core.js test fails whenever the month art is Thêu/Nấu. LUẬT ƯU TIÊN SỐ 1: the name existed on main. Fix: new name (e.g. `crsBest(p)`), used by stealArtB + npcStudy + balance-night.js; add a test with an NPC whose best art differs from hers.
3. **The night split claimed in §5/§7 (Tranh sủng 58 / Chặn 37 / Thôi 5) came from bug 2.** Reviewer re-measure (`balance-night` method, same seed, 3 lives × 2 y, 591 person-weeks) with the fixed best art:
   | value of a night N, social cost | all | her | NPCs |
   |---|---|---|---|
   | N 8, none (worker's case) | **Tranh 69 · Chặn 18 · Thôi 12** | 4 · 70 · 26 | 76 · 13 · 11 |
   | N 15, none | 84 · 14 · 1 | 19 · 78 · 4 | 91 · 8 · 1 |
   | N 25, none | 89 · 10 · 0 | 30 · 70 · 0 | 95 · 4 · 0 |
   | N 8, holder thiện cảm/ghen counted (×0.2 Sủng/pt) | 54 · 2 · 44 | 11 · 9 · 80 | 58 · 1 · 41 |
   | N 15, same | 95 · 1 · 4 | 72 · 9 · 19 | 97 · 1 · 2 |
   Chặn ngự giá best: 69 % when her best art is his favoured art, 12 % neutral, 2 % disfavoured. So Tranh sủng still dominates for the population, and the split is decided almost entirely by "Sủng vs Sắc" (a person is right with ONE option most weeks), and by how much a night is worth. Owner 22:50Z asked for "a real choice with a distinct trade-off". Fix: retune BAL.steal.m with the fixed function; the measure must (a) include the holder/Hoàng hậu cost of each option, (b) report sensitivity to N (8/15/25), (c) report per person-state how often the two best options are close (EV gap < 1 Sủng) — target: no option best in > ~60 % of states, every option best in ≥ ~20 %.
4. **one-core-guard syntax.** The guard only masks `BAL.x={…}` / `Object.assign(BAL,{…})`. `Object.assign(BAL.steal,{…})` (and the merged BAL.orig) are counted as 55 new inline numbers → go-live quickcheck FAILS once one-core-land is in. Write them as `BAL.steal.m={…}; BAL.steal.art={…}; …` (or extend the guard and say so).
5. **Leftovers of the "bậc × N" family (LUẬT SỬA CẢ NHÓM):** j75:136 NPC night quality `odA(v,40+tai/2+lv*8)`; jkc:426 home-road contest `sc=l*12+…`; j85:58 `gift:hoa lv*10 / theu lv*8`, j85:51/54/56 cong/hanh/work quality `lv*4 / lv*3 / lv*14`. Each → artO/artOE/BAL, or justify in the report.
6. **No HH-rate measurement after changing every start value and the growth of Sắc/Tài/Tâm cơ** (owner targets OD:L20 HH ~32 %, early death ~40–45 %; OD:L43 every origin 20–40 %, cnv 20–25 %). OD:L1218 forbids re-measuring origin ROULETTE odds, not checking that a balance change keeps the approved targets. Also every art gate now takes ~5–10× longer (bậc 3 was ~1 week, now ~7–12 months): 22+ gates `arts.k>=N` (j2 Emperor art acts `r.cam/vu/ky/hoa>=3`, j4 Tài nữ road `thi>=3 || tai>=70`, jact, jgift, j3, j8, jrash, j13, j32, j67, j70, jfxkit). Fix: table gate → old time → new time → keep/lower; run dev/measure/kchh.js (inpage6 sensible bot) per origin n ≥ 6, branch vs main.
7. **Story beat fires at once:** thd (thầy đồ) starts Thi 26 = bậc 2, so j4:89 `S.arts.thi>=2` (Thơ ngươi truyền ra ngoài cung, Danh +3) triggers on day 1. Part of 6.
8. **Wrong rule text on the art ⓘ page:** "Hoàng thượng trọng tài · thi tài, phô tài tính bậc này **gấp đôi**" — BAL.art.emp is 1.5; typed text (one core): print the constant in plain words.
9. **Old ladder words left (whole group):** "Đã tinh thông" badge at bậc 5 in j23:27, j79:1002/1014, j85:168/175, and KIT_GLOSS "Tác phẩm" (jtabs:61) "Môn đã tinh thông (bậc 5)" — Tinh thông is now bậc 3; bậc 5 is Tông sư.
10. **One fact, three numbers on every art/Tứ đức card:** "Nhập môn · 12/100" + "Bậc 1/5" + "Tiến bộ 2/15" (OD:L55 one fact one place). Keep the kicker + the bar; drop or merge "Bậc n/5".

## Checked and OK
- Start values per origin from one table, inside their ranges (balance-core.js 10 origins + my reruns); NPCs draw from the same table (rstats wrapper) with per-rank extras.
- Ladder math: Tự học 6.6 / 17 / 35 / 65 / 119 lessons to bậc 1–5, teacher 4 / 10 / 21 / 38 / 69 — matches the worker's table (self gain = round(g×.6)).
- ONE odds word ladder: j1 word/ladIdx, j79 kitOddsLv, jsgame sgLv, rungDown all read BAL.lad; no other typed copy found.
- Odds sites moved to artO/artOE/artSide (37); inline rule numbers outside jbal2 −26 vs the one-core baseline.
- Co-op: month art rolled on the host only (MUTE), coop-e2e 59/59, coop-night 105/105, night-steal-unit guest cases PASS.
- Old saves: crsMigrate keeps bậc, rescales progress; quickcheck old save loads and plays.
- VANPHONG: no %, odds ladder words; ladder modal prints BAL numbers (except F8).

## Notes for main → owner on the §7 proposal (not yet approved by her)
1. The night numbers in §7 ("Tranh sủng 58 %…") are wrong (bug F2/F3); the real split is far more one-sided.
2. Owner 23:08Z: "cung nữ origins: low Danh/Bạc, **high Tâm cơ**". Cung nữ tuyển (cnv) gets Tâm cơ 15–25, among the LOWEST; only cn has 30–40.
3. Buôn muối Đức 25 "scorned": low status is Danh (already 8), not virtue; lowering Đức mixes the two.
4. NPC side is invisible in the table: an NPC-only origin "quan" (40 % of NPCs), NPC Danh/Bạc/art per rank, and a flat NPC Đức +10 not tied to rank.
5. The "time to learn" table mixes Tự học and học với thầy (Tông sư: self ~3.3 years at 3 lessons/month, teacher ~2 years); say which.
6. Info leak: the odds word shown for Tranh sủng / Chặn / Giữ chân already contains the month-art bonus, so a player who does NOT know his favoured art can read it off the word (Khó ↔ Khá chắc), which makes Tai mắt / rumours pointless. Recommend: compute the shown word without the unknown month-art part (labelled "chưa rõ ngài chuộng môn gì"), roll with the true odds.
7. Losses heal slowly at the top: poison −8 Sắc / scars / age at Sắc 80+ are regained at ×0.1 — intended? (realistic, but a high-Sắc consort hit by poison is marked for good).
8. Two §7 example rows are one rung off (Sủng phi: Giữ chân = Khá chắc, not Năm ăn năm thua; with Cầm favoured: Giữ chân = Chắc).
9. Still open (worker's own question): Sủng reaches 100 in 6–12 months; Danh / Bạc / relations growth not measured at all (owner 23:08Z asked for ALL stats).
Gain vs risk of shipping after fixes 1–10: gain large (arts no longer 100 in a month, origin-true starts, real night choice); main risk = HH-rate shift from slower arts/stats (likely, medium; caught by the kchh run in F6, fixed by lowering gates). → Gain is larger, but only after F6 is measured.

Reviewer scratch (not in git): night re-measure script (_rn.js, method = dev/test/balance-night.js + fixed best art + N/social cases), guard run on a scratch merge with one-core-land-r1. Worktrees /home/user/wt/bcr, bcr-oc, bcr-main removed after the verdict.
