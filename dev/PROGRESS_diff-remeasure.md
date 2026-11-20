# PROGRESS — review/diff-remeasure (D31 re-measure + Q14 rain gear)

Base: origin/main ee5d33de (balance-pass-r1, D31 jdiff, mortality-r1, cycle-r2 … all live). Model: opus. Foreman B (session 5).
Brief: FOREMAN_B.md INBOX 11:41Z / 12:55Z / 13:04Z; Foreman B 14:24Z: tune Vừa UP to HH ~32 % by ROOT CAUSE, check the bot,
do NOT change the owner's mortality rules (OD:L1116) — only report how often the life ends as Thái phi.

## Q14 — rain gear wears out (DONE, 78454563)
- `BAL.wx.gearMo = 3` (months = one season). Each gear entry (dù / áo tơi / giày đế cỏ, `IT[k].wxg`) carries `e.wxe` = the `S.turn`
  it wears out at; stamped on `buy()`, on load (`deser`: old saves → a fresh season) and at every week end (gifts). At `endTurn` worn-out
  gear leaves the chest with a Sổ ghi line ("… dùng đã hết mùa, sờn rách nên bỏ đi …"). NPCs: same rule (host only in co-op).
- `wxHasGear` ignores worn-out gear; kiệu unchanged (Bạc −`BAL.wx.kieuBac` per trip).
- Shown through the kit: item card KIT §70 gets `o.months` → existing "còn N tháng" Ghi chú row; shop / item text prints `BAL.wx.gearMo`.
  No new UI part.
- Test `node dev/test/wx-gear.js <url> <out> 755x1000@2,1000x755@1,1180x820@2,1366x1024@2,844x390@1,390x844@1` → ALL OK, 0 page errors,
  no horizontal overflow (card screenshot checked at 755x1000 and 844x390).

## D31 — difficulty re-measure (IN PROGRESS)
Harness: `run_par.js` + `pass/mkinp.sh` with PRE `window.__diffO="<mode>"` and EXTRA = move the first life + `indiff.js` (+ `indanh.js`:
Danh lost/gained per rank and cause). Analysis `python3 dev/measure/anpass.py sens <label> <files>` (now also prints ending mix and the
difficulty tags; "Tuổi trời đã tận" (old age, jmort) counts as survived, not early death).

### Finding 1 — HH collapsed on current main with the old bot
First 20 lives (old bot, base main ee5d33de): HH 0/20 (Vừa 0/6, Dễ 0/8, Khó 0/6) vs C7 45 % (n=22, before merge-train-6).
Ranks 0–2 take ~100 tuần each per life (C7: ~20–27). Danh net per tuần at ranks 1–6 ≈ 0 or negative.

### Finding 2 — the bot, not the game: the monthly cycle-report pop-up (jcycle cyrep, cycle-r2, merged 10:32Z today)
Biggest Danh loss: "Sổ Kính sự phòng ghi tháng trước ngươi không báo nguyệt sự … mừng hụt" (Sủng −3, Danh −2) almost every month.
The pop-up's 4 options carry hidden outcomes (fx {} on "Báo đúng" and "Giấu"); the old bot scored only fx and tied → picked
"Giấu, không báo" about half the time (its BAD regex is lowercase "giấu"). A player reads the card: "kèm: … mừng hụt: Sủng -3 Danh -2" + label "liều".
Fix (harness only, inpage6.js): side costs after "kèm:" / "hỏng:" count at half weight; risk label liều −1, có rủi ro −0.3.

### Finding 3 — the GAME regression: act-dedupe w1 removed the main Danh source (fixed bd887323)
Bisect with the fixed bot (Vừa, n per arm): main eba64ead4 (this morning) HH 9/12 (75 %); 92668096 0/7; 0af9dedd 2/6; e9c6021d 1/5;
ee5d33de 0/15. Danh-by-cause (indanh.js): on eba64ead4 "Phát chẩn cho cung nhân" (Hành sự card, Bạc −40 → Danh +7, Đức +3, any week)
gave ≈0.70 Danh a tuần at ranks 0–3 — the whole margin between climbing and stalling (gain 3.54 vs loss 3.26 a tuần; after: 3.22 vs 3.16).
act-dedupe w1 (jact AD_OUT, before 92668096) moved it to Tài nghệ Tứ đức "Phát bạc cứu giúp" with HARD-CODED Bạc −20 → Đức +3, Danh +1,
once a month (j85; also a ONE CORE breach). Fix: `BAL.charity = {bac:40, duc:3, danh:7}` (the old card's numbers, once a month ≈ the
Danh a month the card used to give), j85 act + NPC copy + Tứ đức table + button text all read it. Bot (inpage6) uses the act when
it has Bạc ≥ cost + 20 (a sensible player would).

### Mortality (owner rule OD:L1116, NOT changed)
On ee5d33de stalled lives, the lifespan dice ended 4/15 lives before HH (she reaches her 30s while stuck); Emperor death ended
others as Thái phi / xuất gia / tuẫn táng. Shares on the fixed build: see the final table.

### After the charity fix (bd887323), Vừa, fixed bot: HH 7 % (1/14; 1–31), early death 64 % (lifespan dice 4, childbirth 3, poison 1, illness 1)
Charity is used (~39 a life) but ranks 0–2 still take ~90–105 tuần each (eba64ead4: 13/15/20). Danh net a tuần at ranks 1–4:
eba64ead4 +0.30, fix −0.02. Loss/gain mix per 100 tuần (ranks 1–4), eba → fix: losses "nói thật lòng" 9 → 32, "Sang buổi mới … bị chê trách"
0 → 7, "Nhún nhường" 0 → 7, cấm túc 26 → 15; gains phát chẩn 79 → charity 55, dance 86 → 125, "Nói thật lòng" 9 → 30.
Starting stats by origin are identical on both builds (dev/measure/pass/startprobe.js); origin mix differs (muoi 30 % of lives now).
=> the charity gap is only part of it; a second drain remains. NOT yet found.

## Successor session (session_01N1tNP3F65YoGjUoBixheuW) — DONE, ready for review
### Finding 4 — the SECOND drain: promotion exams (harness, not a game bug)
- Arm "head + the old Phát chẩn card put back in Hành sự" (charity any week): still HH 0/8 → charity was not the rest of the gap.
- Exam recorder `dev/measure/inexam.js` (x.ix.exr per exam: to, vir, art, sh, play, total, bar, pass, arts sum, vir sum, hh, Danh):
  eba64ead4 pass 86–91 %, her arts sum at the exams 13–26; head pass ~50 %, arts sum ~2 (Tứ đức 0 on both).
- Cause: since merge-train-4 (tuduc-sub-r1) every lesson (Tài nghệ self / teacher) opens a kit pick dialog ("Học X: làm gì?", then the
  material); the bot closed it (no opts) → no study at all. On eba64ead4 the bot studied through the Hành sự card "Tự học X: <work>"
  (j83 wkDeckCard, no dialog), which act-dedupe w1 (jact AD_OUT /^Tự học /) removed. For a player the study is in Tài nghệ → no game bug.
  review/danh-balance (Foreman D, now on main) reached the same two causes (its P2 "needs a Tài nghệ bot").
- Harness fix (inpage6.js): modalStep taps the first item of a kit pick dialog (window.__noPick turns it off); the sensible bot self-studies
  arts (lessonMode "self") and Tứ đức (lessonVir "self") when Sức ≥ 60 (window.__noSelf turns both off). Exams then pass 96 %.
### Merge with main fb367740
- BAL.charity: main (danh-balance) has the ONE copy `{khac:1,bac:20,duc:3,danh:1}`; my 40/7 is dropped (danh-balance P1 35/5 + a Hành sự
  door waits for the owner). j85 = main's text (khac). My Danh-by-log recorder → `dev/measure/indanhlog.js` (main owns indanh.js).
### Final measures (merged build, fixed bot, n ≥ 30 each; data dev/measure/pass/data/dr2/after_<mode>.json)
| mode | HH | early death | HH pace (median tuần) | owner target (OD:L85) |
|---|---|---|---|---|
| Dễ | 67 % (20/30; 49–81) | 0 % (0/30; 0–11) | 196 | HH ~50 %, early death ~20 % → too easy |
| Vừa | 37 % (11/30; 22–54) | 50 % (15/30; 33–67) | 229 | HH ~32 %, early death ~40–45 % → OK |
| Khó | 16 % (5/32; 7–32) | 53 % (17/32; 36–69) | 355 | HH 15–20 %, early death ~55 % → OK |
No BAL value changed for Vừa: with the bot fixed, Vừa is back on target. Rank curve: `python3 dev/measure/rankcurve.py`.
Exam pass: Vừa 247/258, Dễ 254/264, Khó 369/376. Tests: dev/test/difficulty.js ALL OK (5 sizes; one flaky FAIL under bot CPU load,
re-run clean), dev/test/wx-gear.js ALL OK (6 sizes). Site rebuilt.
Open (proposal, not applied — Dễ mortality knobs are the owner's mortality rules): Dễ early death 0 % vs ~20 % (DIFF.de illDie ×0.5,
poisonNow off); Dễ HH 67 % vs ~50 % (DIFF.de hhTh −5 could go to 0).

### Main moved (0488c57a: danh hiệu jdh/jdh2, jspread, mg-balance j82/j91 …) → merged, re-measured, Vừa tuned
- Vừa on 0488c57a, hhTh 55: HH 53 % (16/30; 36–70), early death 33 %. hhTh 65: 26 % (8/31; 14–43), death 45 %.
- APPLIED: BAL.hhTh 55 → 60 (jbal.js; Thái hậu favour for the HH seat with a son; world rule; texts print BAL).
  Final (hhTh 60, n=30 each; data dr2/final_hh60_<mode>.json):
| mode | HH | early death | HH among survivors | HH pace (median tuần) |
|---|---|---|---|---|
| Dễ | 76 % (22/29; 58–88) | 10 % | 85 % | 235 |
| Vừa | 47 % (14/30; 30–64) | 23 % (lucky sample) | 61 % | 290 |
| Khó | 33 % (10/30; 19–51) | 37 % | 53 % | 256 |
  Vừa normalised: HH among survivors 55 → ~77 %, 60 → 61 %, 65 → 47 % (pooled runs); × (1 − ~42 % early death) → hhTh 60 ≈ 35 %.
- OPEN for the coordinator: on the newest main early death fell (Vừa pooled 38 %, Khó 37 % vs 53 % on fb367740) and Dễ / Khó are both
  easier than OD:L85 (Dễ HH ~50 / death ~20; Khó HH 15–20 / death ~55). Fix = the jdiff DIFF layer (Dễ hhTh −5 → 0, Khó hhTh +5..10,
  Dễ illDie / poisonNow) — mortality knobs are the owner's rules, so not applied here.
- Tests: rules-one-source.js 755x1000@2 ok (old save loads, 0 page errors); difficulty.js + wx-gear.js ALL OK (run on fb367740 merge).
