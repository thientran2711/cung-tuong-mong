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

## ROLLOVER HANDOVER (worker context limit reached, 16/11 ~17:40Z)
Raw lives: dev/measure/pass/data/dr/*.json (names = bot_build_mode). Build a bot copy: `bash dev/measure/pass/mkgame.sh fix.html`;
INP: `PRE='window.__diffO="vua";' EXTRA="<move first life>;$(cat dev/measure/indiff.js);$(cat dev/measure/indanh.js)" bash dev/measure/pass/mkinp.sh $PWD/dev/tmp/inp.js`
(move first life = `if(S&&!S.dead&&S.diff!=="vua"){S.diff="vua";if(S.bac0==null)S.bac0=S.bac;diffBac();diffApply()}`), then
`node dev/measure/run_par.js root/dev/tmp/fix.html sens 30 dev/tmp/out.json ../tmp/inp.js 4 <seed>`; `python3 dev/measure/anpass.py sens <label> out.json`.
~4 pages ≈ 15–25 lives an hour on 4 CPUs (memory: ≤ 8 pages in total).
NEXT:
1. Find the second drain: bisect 92668096 (0/7, stalls) vs its parents back to eba64ead4 (9/12) on the first-parent chain
   (merge-train-4 merges 05:23–09:23Z: cycle-r3, tuduc-sub-r1, ua-test, reign-road-r1, goal-strip, scheme-games, act-split w1 …),
   with BAL.charity applied by EXTRA on the old builds (`BAL.charity={bac:40,duc:3,danh:7}` has no effect where jact is absent).
   Suspects from the Danh table: "Nói thật lòng" losses ×3.5, "Sang buổi mới … bị chê trách" (trung y / etiquette, jty / jaudit), "Nhún nhường".
2. Then Vừa to HH ~32 % (n ≥ 30); only after that the jdiff DIFF table for Dễ / Khó (n ≥ 30 each; owner targets OD:L85 Dễ ~50 % / 20 %,
   Khó 15–20 % / 55 %). Mortality stays as the owner set it (report the Thái phi / lifespan shares only).
3. Tests still to run on the final build: dev/test/difficulty.js (71 checks), dev/test/wx-gear.js (done, ALL OK), opt-render at 5 sizes.
