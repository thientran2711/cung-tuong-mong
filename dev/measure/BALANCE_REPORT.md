# Balance report: integration pass (review/balance-old), PARTIAL

Stopped early on the coordinator's order. Another worker owns review/balance now and will cherry-pick these fixes.
The numbers below are a **small pilot only** (n=12). They are not a tuned result.

## What is merged (from origin/main b9729c7)
events 289b311, merit c871bbb, quests 3c5a194, nights 5d29864, intrigue db1ce23, time-spill b656c41 (j80 folded into j76),
map-tap 9c0d66b, intel-clarity 7a7828b, no-repeat 9e23c3d, works c693c58, van-phong 97f800d, kit-panels 59b0c3b,
virtue 2b87377, minigames 2cf0ec5, stories c78669f. origin-odds (j69) does not exist on origin.

Module order in assemble.py: ... j58, j62, j64, j66, j73, j67, j68, j68e–i, j71, j72, j75, j76, j77, j60, j63, j78, j79, j70, j82, j83, j85, j65, j84 (j84 is last).
- j60/j63 come after j77 because kit-panels orders them late (j60 was before j62 on main).
- j70 comes after j79 because intrigue db1ce23 uses the j79 kit.
- j80 is gone: time-spill folded it into j76.

## Reconciliations made here
| fix | commit |
|---|---|
| Module order. `G7`/`R7` were declared in both j71 and j72, which broke the build; j72's copies are renamed `G72`/`R72`. j72's own tab-grid CSS is removed (the 12-column rule and the 1000–1399px short-label rule), because the kit's j57 handles 12 tabs; only `data-s="Nhờ"` is kept. | 6625ae2 |
| Text fixed at source: j78 "…và Nhật ký" changed to "…và Sổ ghi"; j72 no longer shows the odds word "Chắc chắn" on sure acts (`accX`, `decX`). The other van-phong items ("Đã rõ", "xét nghiệm", "điểm …", "bảng điểm") were already fixed in the merged heads. | 958ab1b |
| j71↔j82 glue: nothing to change. c871bbb already passes `stakes` to startContest. It skips its own result table when `result.shown`. A missing result (`onDone(null)` / reload) falls back to the talent-only score (same as a skip). It uses the j82/j85 coefficients when `artLv` exists. | (in c871bbb) |
| One Ngọc dung cao. Used on a scarred face it is the hủy dung cure: the wound heals without a permanent scar and 4 weeks sooner. On a clear face it gives Sắc +3. This replaces j67's "Sắc +8, does not cure". Same rule for everyone. | ffb798e |
| j75 knob `FAIRN.sat` / `satMin` / `satO`: "ngài muốn đổi người". Each night a consort had in the last 6 tuần beyond the first lowers her tablet chance (×, floor `satMin`) and her chance to lure him away. It shows as a reason in nightWhy. **Defaults are off (0), so nothing changes until someone sets it.** | ef08523 |

## Measurement tools (dev/measure)
- `runbal.js` + `inbal.js`. These are runb + the j72 quest bot plus:
  - per-life nights: hers, each NPC's, and hers before reaching HH;
  - Sủng histograms, sampled monthly;
  - j82 mini-games: the bot takes "Để tài nghệ quyết định";
  - a watchdog for stuck buổi;
  - a rule that the bot does not walk twice to a door that turned it away this buổi (j77 etiquette card).
  - Knobs are passed by env: `BALJ`, `FAIRJ`, `Q72J`.
- `shards.sh`: runs N parallel shards. `anbal.py`: summary output.
  - Early-death causes: childbirth, illness, cold palace, execution, beaten to death, murder, poison, suicide, expelled.
  - Childbirth death per birth.
  - Time to HH in years, tuần and buổi, and real hours at 25 s and 40 s per buổi.
- `runb.js` and `inpage5.js`: the j76 worker's file:// and click fixes, and the per-life step limit raised to 25000.

## Pilot numbers
Sensible bot, n=12, build before minigames/intrigue db1ce23/stories c78669f, BAL v12 knobs (hz 2.0, hhTh 55, outQ 85).
- Hoàng hậu 17% (2/12). Early death 17% (1 murder, 1 childbirth). 10/12 lives end as "Thành Thái phi" (the Emperor dies) after about 12–15 game years.
- Childbirth: 4.3 births per life and 1.9% death per birth. The bot stacks thái y, Y talent, an thai and a loyal maid, which reach the 1.5% floor; the later-birth −6 also applies.
- Nights: **her share is about 51%** (per-life median 51%, p25/p75 46/57), against a fair 1/16 ≈ 6%. Her Sủng sits at 90–100 most of the time. The top NPC's share is ≈3% (median). The old "player gets 0–1% of nights" problem is now reversed: since j75 she wins most nights. The main causes are that she tries to steal every night (Chặn ngự giá) and that her Sủng 100 gives her tablet weight about 3× an NPC's.
- Time to HH (n=2 only): 5.1–5.7 game years, about 550–610 buổi. That is **about 4 real hours at 25 s/buổi, or 6–7 hours at 40 s/buổi**. Assumed pace: 25–40 s per buổi for decisions plus reading cards.

Other runs:
- Two configs were started after the minigames merge (A: `FAIRN.sat` .2 / `satO` 8; B: the same plus hz 3). Every life ended in TIMEOUT, because the bot could not close j82's #ov game. The harness now handles this.
- The j77 etiquette-card loop for servant starts was found and handled in the harness.
- No valid numbers exist yet for the full merged build.

## Death kinds (owner's question)
The ~45% target is the **total** of all ways to die before Hoàng hậu or old age. Each kind has its own chance; they are not 45% each.

| kind | how it happens | what lowers it |
|---|---|---|
| childbirth | each birth rolls birthRisk: base 9%, +4 if Sức < 40, more after age 30/35, +10 if the midwife is bribed; −6 after the first child (BAL.later) | trusted thái y −5, Y talent ≥2 −3, an thai −2, loyal maid −2 (floor 1.5%) |
| illness | serious illnesses (lao, đậu mùa, …) can turn critical | care odds: thái y, Y talent, rest |
| poison / murder | rival schemes (j70 chain, ×BAL.hz toward her) | defence orders (thử độc, canh cung), Tai mắt, allies, Đức (j85: danger +(50−Đức)/5) |
| execution (ban chết) | caught in her own schemes (poison, framing); a first offence in year 1 is pardoned once | do not scheme; have evidence; Hoàng thượng nhân từ may send her to lãnh cung instead |
| beaten to death / punishment | servant-start beatings, Thận Hình ti interrogation | avoid theft and accusations; protectors |
| cold palace | dies of cold or hunger in lãnh cung | get out early through allies or the Emperor |
| expelled / affair exposed | affair discovered, expelled | fewer trysts (exposure grows with every tryst) |

The pilot was too small to give a per-kind share; use `anbal.py` on a proper run.

## Recommended next steps (for the worker on review/balance)
1. Measure the full merged build with `runbal.js` (≥60 lives).
2. Expect the build to be too safe (early death well under 45%) and the player to take most nights.
3. Levers in order:
   - `FAIRN.sat` ≈ .2 with `satO` ≈ 8 (her and every consort alike; brings the favourite's share down);
   - `FAIRN.eff` > 1 (NPCs work for Sủng more);
   - `BAL.hz` 2→3 (j70 caps its own use at 1.2);
   - j76 rest +6→+4.
   - Then check HH: the bottleneck is the HH seat (outQ 85, hhTh 55). Many lives stop at rank 6.
