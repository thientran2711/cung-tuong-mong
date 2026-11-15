# Balance report: review/balance (v12 current, 11/14 night; v9–v10 history below)

## v12 (balance worker 2, 11/14 night) — CURRENT
Includes review/items-earned (98a3dae9, merged). Same harness as before; runs with `dev/measure/run5b.sh <game> <label>` (one shard: `run1b.sh`; `OUT` = output dir)
(5 shards x 6 lives, 9-origin rotation, `INP2=inx.js,inpz.js`, knobs tried with `XJS` `Object.assign(BAL,{...})`).

### Why a landed poison never killed her (found and fixed)
`inpz.js` logs every poison aimed at her. In 9 lives, 25 poisons landed, and 12 of them took her Sức to 0. None killed her.
- A poison that lands in the day (a j70 scheme, a j83 poisoned dish) took her Sức to 0. Her Sức is only checked at the end of the tuần,
  after the new tuần's +4 rest, so she always lived. An NPC dies on the spot (`dieIf`, j8).
- **Fix (jbal2):** when a poison takes her Sức to 0, she dies on the spot ("Trúng độc, không qua khỏi"). This is now one rule for everyone.
  `probe_poison.js` checks it: at Sức 30 both she and an NPC die, and at Sức 90–95 both live.
- The "chết: …" odds word on her own Hạ độc button (j79 `kpDeathP`) now follows `BAL.poisonX`, so the word she sees is true.

### Other changes
| knob | value | why |
|---|---|---|
| poisonX | 1.5 → **1** | Once poison could kill, 1.5 gave 57% early death (11 of 30 by poison). |
| **poisonBac** (new) | 20 bạc | Owner rule: items are never free (ITEMS_EARNED.md #15). A Hạ độc without Hạc đỉnh hồng in the chest means buying thạch tín: 20 bạc, for her and for every NPC. Without the silver nobody can try it. |
| seeMaxP | 65 → **70** | Cap on spotting poison. |
| outQ (jbal) | 85 → **60** | Share of the time an empty Hoàng hậu seat goes to an outsider girl. With 85, Hoàng hậu stayed at 20–25% once deaths were real. |
| **srvSpyHit** (new) | 25 | Servant start (j42): a maid caught eavesdropping on her mistress's orders is flogged (Sức −25), not beaten to death. Caught poisoning or planting a charm can still kill her. Before this, the cnv start had 0 Hoàng hậu in 15 lives; 3 of 12 lives ended this way in the first two years. |
| hz 3.2, birthMin 8, birthAdd 4, illDie 2, accCdT 36 | unchanged | |
| **poisonNow** | 1 (Vừa) | The fix above sits behind `BAL.poisonNow`, the knob that review/difficulty jdiff reads. Here it is 1 by default, so the rule is the same for everyone at Vừa. A difficulty can still change it. |

### Trials (n=30 unless noted; a share has about ±17 points of noise at n=30)
| config | Hoàng hậu | early death | poison deaths | childbirth / labour (shown) |
|---|---|---|---|---|
| fix, poisonX 1, seeMaxP 65 | 17% | 57% | 11 | 14% (12.2) |
| + seeMaxP 80 | 27% | 53% | 8 | 17% (11.7) |
| + seeMaxP 80, hz 3.0 | 23% | 57% | 11 | 16% (11.2) |
| + seeMaxP 88 | 20% | 40% | 8 | 6.7% (11.4) |
| + seeMaxP 92 | 23% | 43% | 7 | 8.5% (11.5) |
| + seeMaxP 88, hz 2.9 (n=28) | 32% | 54% | 6 | 23% (11.4) |
| + seeMaxP 88, hz 2.6 (n=26) | 15% | 50% | 4 | 17% (11.0) |
| items-earned + poisonBac 20, seeMaxP 88, outQ 65 (n=20) | 40% | 30% | 3 | 11% (12.6) |
| same, outQ 50 (n=24) | 54% | 21% | 2 | 8.1% (12.8) |
| same, seeMaxP 75, outQ 65 | 33% | 47% | 10 | 8.3% (10.8) |
| **same, seeMaxP 70, outQ 60 (v12j)** | **37%** | **40%** | 7 | 10% (11.1) |
| **v12 build baked in (v13)** | **33%** | **43%** | 9 | 14% (12.4) |
Within this range hz moves nothing that the noise does not swamp. outQ is the clean lever for Hoàng hậu.

### FINAL v12: BAL = {outQ 60, hz 3.2, conc .25, later 6, hhTh 55, birthAdd 4, illAdd 1, illDie 2, accTire 10, accCdT 36, birthMin 8, seeMaxP 70, poisonX 1, poisonBac 20, srvSpyHit 25}
Pooled v12j + v13 (n=60). The cnv row is a separate servant-only run on the final build (v14cnv, 12 cnv lives).

| target | measured | verdict |
|---|---|---|
| Hoàng hậu ~30–40% | **35%** (21/60) | ✔ |
| early death ~35–40%, ≤45% | **42%** (25/60): poison 16, childbirth 5, own schemes caught 4 | ✔ |
| childbirth death 8–12% per labour | **11.4%** (5/44; mean risk shown 11.5) | ✔ |
| cnv winnable, aim 10–25% | **2/12 = 17%** (final build) | ✔ |
| no death in the first 2 tuần | 0 | ✔ |
| early suicide never pays (`probe_kiep.js`) | net Phúc duyên 0 or −30 for every origin incl. cnv; origin locked | ✔ |
| birth path exact (`probe_birth.js`) | risk 13 / 8 / 8 → deaths 12.35 / 7.7 / 7.75% | ✔ |
| old save loads (`uismoke.js`, save made on 093a869a) | loads at 755x1000@2 and 1180x820@2, 12 buổi played, no overflow | ✔ |
| page errors | none (a few shards lost to "Target crashed" / "Invalid InterceptionId" under machine load; those shards were rerun) | ✔ |
Per origin (n/HH/died, pooled): ch 6/4/1, cn 8/5/0, dtq 9/2/5, muoi 4/2/1, nc 8/2/4, td 5/0/3, thd 6/1/2, tt 9/5/4.
NPC acts on her per life: poison 15 tried / 0.9 landed; musk 4.5 / 1.3; accusations 5.9 (4.4 stick).

### Time to Hoàng hậu (lives that made it, n=20, final pooled)
| | p25 | median | p75 |
|---|---|---|---|
| game years | 3.8 | **5.8** | 6.8 |
| tuần | 138 | **208** | 243 |
| real minutes at 10 s per tuần | 23 | **35** | 41 |
| real minutes at 20 s per tuần | 46 | **69** | 81 |
In short: **about 4–7 game years, roughly 140–240 tuần. That is 25–40 minutes at 10 s per tuần, or 45–80 minutes at 20 s per tuần.**

Sensible bot (`inpage6.js` + `inx.js` counters), every origin including the servant start (cnv). Each life stops when she becomes
Hoàng hậu (HHSTOP), so the Hoàng hậu % and the early-death % come from the same lives.
Run: `GAME=<build with meta charset> INP=inpage6.js INP2=inx.js HHSTOP=1 node dev/measure/runb.js sens N out.json`,
summary: `python3 dev/measure/anx.py <label> out*.json`. The 9-origin rotation is passed with `XJS` (see PROGRESS_balance.md).
Machine was shared with other workers. A bot life takes about 8–10 minutes, so each config has 18–30 lives.
**At n=30 one life is 3 points, and the 95% band on a share is about ±17 points.**

## What was wrong (fix1 as received: hz 3.5, birthAdd 2)
27 lives: Hoàng hậu **4%**, early death 22%. She spent 64% of her tuần at Đáp ứng, and every life stalled at Tần/Phi.
- The `inx.js` counters showed **~235 accusations against her per life, ~127 successful**. Every successful one is `fall()`:
  two ranks down, or the cold palace (69 cold-palace entries in a life). Each fall also restarts her promotion gap, so "Cách lần sắc phong" was
  the requirement that failed most often at every rank.
- The cause: with her Sủng high, every rival is in danger band 2+, and `accuse` (weight 6) is the main band-2 act.
  Evidence comes from `spy` (+1 per success), and `BAL.hz` 3.5 multiplies every rival's hazard toward her.
  The per-accuser `accTire` knob does not cap it, because 15 rivals take turns.

## Fixes (jbal / jbal2)
| change | why |
|---|---|
| **BAL.accCdT = 36 tuần** (new, jbal2). Once someone has been accused, nobody may accuse that person again for 36 tuần, whether the charge stuck or not. Same for every target, her included; she cannot charge someone inside the window either. Same shape as jwd92b's vpCdT/frCdT. | Accusations against her drop from ~235 to ~6–8 a life (~4–5 stick). |
| BAL.hz 3.5 → **3.2** | With the cooldown on, hz mostly drives the Hoàng hậu's punishments ("xét tội theo chứng cứ") and the other harms. This value is in the HH band (see the trials). |
| BAL.illDie 1 → **2** | Illness was almost never fatal. |
| BAL.birthAdd 2 → **4** | Childbirth death was under the 8–12% per labour target. |
| jpal (fix1, kept) | palaceOf no longer answers "home" for people without a house. |

## Trials (all with accCdT 36 except the first row)
| config | n | Hoàng hậu | early death | childbirth death / labour | notes |
|---|---|---|---|---|---|
| fix1 as received (hz 3.5, bA 2) | 27 | 4% | 22% | high, few births | ~235 accusations a life |
| hz 1.0, no cooldown | 12 | 17% | 50% | 12.5% | 39 accusations a life |
| hz 1.4 | 18 | 50% | 22% | 8.3% | |
| hz 2.0 | 18 | 61% | 17% | 2.7% | |
| hz 3.5, bA 4, illDie 2 | 18 | 28% | 39% | 16.7% | |
| hz 2.0, bA 5, illDie 3, illAdd 2 | 18 | 39% | 22% | 10.8% | |
| hz 2.7, bA 4 | 29 | 69% | 17% | 4.7% | |
| **hz 3.2, bA 4, illDie 2** | 30 | **33%** | 20% | 4.5% | |
| hz 3.2, bA 8, illDie 4 | 30 | 30% | 17% | 3.7% | more birth/illness risk did not raise deaths; reverted |

## FINAL (shipped): BAL = {outQ 85, hz 3.2, conc .25, later 6, hhTh 55, birthAdd 4, illAdd 1, illDie 2, accTire 10, accCdT 36}
Measured 30 lives on the final build (H). The bA-8 run (I, 30 lives) gave the same HH and deaths within noise. Pooled H+I is shown as a check.

| target | final (n=30) | pooled H+I (n=60) | verdict |
|---|---|---|---|
| Hoàng hậu ~32% (35–45% acceptable) | **33%** | 32% | ✔ |
| early death ~40% (≤45%) | **20%** | 18% | ✘ too safe for the sensible bot (see below) |
| childbirth death 8–12% per labour | 4.5% (2.2 labours/life) | 4.2% | ✘ low |
| every origin HH ~20–40% | ch 2/4, cn 0/3, dtq 2/3, muoi 0/3, nc 2/4, td 1/3, thd 1/3, tt 1/3 | ch 3/7, cn 2/6, dtq 3/6, **muoi 0/6**, nc 3/8, td 2/6, thd 2/6, tt 3/7 | ~ n too small per origin; muoi lowest |
| cnv HH ~10–25%, winnable | 1/4 | **1/8 (12%)** | ✔ winnable |
| early suicide never pays off | net Phúc duyên ≤ 0, −30, origin locked | | ✔ |
| no death in the first 2 tuần | 0 | 0 | ✔ |
| servants' palaceOf correct | 189/189 | | ✔ |
| page errors | none | none | ✔ |

Where her tuần go (final): Đáp ứng 8%, Thường tại 9%, Quý nhân 12%, Tần 19%, Phi 15%, Quý phi 16%, Hoàng quý phi 22%.
In the pooled 60 lives, 26 stop at Hoàng quý phi. The Hoàng hậu seat is the last gate: outQ 85, Thái hậu 55+, and a contest.
Bad turns per life: ~8 charges against her (~5.5 stick), ~14 confinements by the Hoàng hậu's judgement, ~13 for her own feigned illness (the bot's choice).

### Time to Hoàng hậu (owner's question), sensible bot, lives that made it
| | p25 | median | p75 |
|---|---|---|---|
| final run (n=10): game years | 4.1 | **5.3** | 8.8 |
| tuần (3 per month, 36 per year) | 146 | **192** | 318 |
| real minutes at 10 s per tuần | 24 | **32** | 53 |
| real minutes at 20 s per tuần | 49 | **64** | 106 |
| pooled H+I (n=19): years / tuần | 5.3 / 191 | 8.4 / 301 | 9.8 / 351 |
| pooled: real minutes at 10 s / 20 s per tuần | 32 / 64 | 50 / 100 | 58 / 117 |

In short: **about 5–8 game years, roughly 200–300 tuần, which is 30–50 minutes at 10 s per tuần or 1–1.7 hours at 20 s per tuần.**
A human who reads every card plays slower than 20 s per tuần.

### Why early death stays near 20% (open item)
Raising birthAdd to 8 and illDie to 4 did not move deaths: 17%, and 3.7% per labour against a shown risk of 13.4.
The sensible bot stacks thái y, an thai, a loyal maid and the Y talent, and keeps its defence orders up.
NPC lethal acts are tried ~25 times a life, but only ~0.4 land. Deaths for this bot come from childbirth, illness, and its own spying getting caught.
The next lever, not taken here: how strong the defence orders (ords70) are, or the poison/pond odds. That would make the game harder for every player, not just the bot.
I did not lower the HH seat gate: HH is on target.



## v10 (late 11/14, coordinator: childbirth 8–12% per labour, early death 35–40%) — CURRENT on review/balance
New jbal2 knobs. Same rule for every woman, her and every NPC:
- `BAL.birthMin` = 8: safety measures (thái y, Y thuật, an thai, a loyal maid) never take the childbirth risk below 8%.
  `probe_birth.js` checks the death path itself: 2000 labours per setting with die() stubbed. Measured deaths match birthRisk exactly
  (no safety 13.8%, thái y 7.35%, everything 7.75%). So birthAdd/illDie were working all along. The careful bot was simply reaching the 1.5% floor.
- `BAL.seeMaxP` = 65: spotting a poison or a tampered medicine (the "ps" path of oSee/caught) is capped at 65%.
  Before, the careful bot sat at ~95% (physician +25, Y +20, maid +10).
- `BAL.poisonX` = 1.5: a poison that lands takes 1.5x the Sức.

| config | n | Hoàng hậu | early death | childbirth / labour | poison tried/landed per life | time to HH median (years / tuần / min @10s / @20s) |
|---|---|---|---|---|---|---|
| v9b (hz 3.2, bA 4, illDie 2) | 30 | 33% | 20% | 4.5% (shown risk 8.2) | 20 / 0.3 | 5.3 / 192 / 32 / 64 |
| **v10: + birthMin 8, seeMaxP 65, poisonX 1.5 (shipped)** | 30 | **33%** | **20%** | 6.4% (shown 10.7) | 25.5 / 1.7 | 11.3 / 408 / 68 / 136 (p25 9.0, p75 11.6) |
| v10b: seeMaxP 75, poisonX 2 (reverted) | 30 | 50% | 13% | 6.7% (shown 10.4) | 26.7 / 1.1 | 7.7 / 278 / 46 / 93 |

v10 per origin (n / HH / died): ch 4/1/0, cn 3/3/0, cnv 3/0/3, dtq 4/1/0, muoi 3/2/0, nc 4/1/0, td 4/0/1, thd 3/1/1, tt 2/1/1.
No page errors, no deaths in the first 2 tuần.

**Still open: early death stays ~20%.** Poison now lands 1–2 times a life, but it almost never kills her, even at 2x Sức (0 poison deaths in v10b).
The next step is to find why. Her Sức is clamped at 0 and only checked at the next tuần ("Bệnh nặng"); something between the landing and that check
seems to heal her. Possibly j70's chain runs the poison through its own path rather than ACT.poison.f. Check that before raising any odds.
Childbirth per labour (6.4–6.7%) sits under the shown risk (~10.5). That is within noise for ~45 labours: probe_birth shows the path is exact.

## Other checks
- **Servants' palaceOf** (`probe_srv.js`, cnv start): 189 checks over 3 servant lives. Her mistress's palace was always a real palace,
  never "home": Cảnh Phúc, Diên Huy, Khải Tường, Thừa Minh, a thiên điện, and Càn Ninh when the mistress is Hoàng hậu. Her own was always "home" (the maids' room). No page errors.
- **Early suicide never pays off** (`probe_kiep.js`): for every origin incl. cnv, a death in month 2 (before trọn kiếp) loses all Phúc duyên earned that life,
  costs 30 more (floored at 0), and locks the next life's origin. Net Phúc duyên is always ≤ 0.
- **Old saves / page errors** (`uismoke.js`): a save made on review/balance (before this pass) loads in the new build at 755x1000@2 and 1180x820@2,
  12 buổi played, no page errors, no horizontal overflow. No PAGEERR in any bot run.
- No death in the first 2 tuần in any run.

## Death kinds
Childbirth is the largest share. Next is the bot's own spying getting caught ("Bị bắt quả tang khi dò la …" ends in a death sentence),
then illness and the rare poison that lands. NPC lethal acts on her are tried often but rarely land
(poison ~20 tried / 0.3 landed a life; pond 12 / 0.5), because the sensible bot keeps its defence orders (Phòng bị) up.
A careless player gets hit much more often.

## 16 khắc một tuần (4 buổi × 4 khắc, B4L) — đo 15/11 (review/balance-unified), bot sensible
Nguồn: uni71 = 71 đời HHSTOP trên bb60f35 (hợp nhất đồ mặc, núm v12); full12 = 12 đời trọn vẹn (không HHSTOP) trên 9a2ba35bf
(đã gộp main df3094e7) với inbuoi.js; e3 = 40 đời trên review/econ (để so).
| | v12 cũ (3 buổi) | uni71 (16 khắc) | e3 (econ) |
|---|---|---|---|
| Hoàng hậu | 35 % | 37 % | 45 % |
| chết sớm | 42 % | 46 % | 45 % |
| năm tới HH (25/50/75) | ?/5,8/? | 3,9 / 5,2 / 7,8 | 4,4 / 6,0 / 7,5 |
| tuần tới HH (25/50/75) | ?/208/? | 139 / 188 / 280 | 158 / 216 / 271 |
| phút thật @10 s/tuần | 35 | 23 / 31 / 47 | 26 / 36 / 45 |
| phút thật @20 s/tuần | 69 | 46 / 63 / 93 | 53 / 72 / 90 |
- Thái hậu / Hoàng thái hậu: chỉ có khi đời kết thúc lúc Hoàng thượng băng (j3 over). full12: Mẫu hậu Hoàng thái hậu 2/12 (tuần 444 và 522 = 12,3 và
  14,5 năm), Thái phi 2/12, HH 6/12 (tuần 115, 190, 202, 217, 274, 289; trung vị ~210). Nữ đế: không có trong game.
- Nhanh hơn v12 ~10 % số tuần (188 so với 208) — trong độ ồn (n nhỏ), không rõ rệt.
- KHẮC mới là giới hạn, không phải Sức: full12 có 83 % buổi dùng hết 4 khắc, 0 % buổi dừng vì Sức < 20, 16 % buổi không còn việc đáng làm;
  Sức trung bình cuối buổi 54. Bot dùng ~3,7 khắc mỗi buổi = ~14,6 khắc / tuần.
- Giây thật mỗi tuần (ước lượng): ~14,6 khắc / tuần, việc tốn 1–2 khắc → ~9–10 lần chọn + 1–2 thẻ sự kiện mỗi tuần; 3–5 giây mỗi lần chọn
  → 35–60 giây / tuần. Vậy HH trung vị 188 tuần ≈ 110–190 phút chơi thật (không phải 31–63 phút như cách tính 10–20 s / tuần).
- Đề xuất (CHƯA áp): (a) muốn Sức là giới hạn thật: tăng Sức tốn của việc thường (trò chuyện, dạo, đi thăm 3–5 Sức) hoặc giảm hồi Sức tuần
  ~25 %, để bot dừng sớm ~20–30 % số buổi; (b) muốn HH ~60–90 phút thật: giảm số tuần tới HH ~40 % (hạ ngưỡng thăng bậc / tăng Sủng
  mỗi đêm ~20 %) hoặc 3 khắc mỗi buổi (12 khắc / tuần) giữ số tuần như nay.
- Sinh nở: khó sinh 17,8 % / lần (uni71), 20,8 % (e3) — cao hơn đích 8–12 % dù rủi ro hiện trên thẻ ~11–13: cần soát (số hiện ≠ số chết?).
