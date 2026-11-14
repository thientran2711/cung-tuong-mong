# Balance report: review/balance (v9, 11/14)

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
