# PROGRESS — review/promote-servants (D41, Foreman C)

Owner rules: OD:L302 (15/11 05:00Z "She can promote maids/eunuchs herself (Chưởng sự cô cô, Nữ quan, Thủ lĩnh, Tổng quản), limited by her rank; NPCs same rules"),
OD:L1149 (servant rank follows the master's rank — j14 srkMax), BALANCE rule 15/11 20:30Z (every bạc road has an equal non-bạc road),
16/11 07:15Z "EVERY reward has a gain AND a loss".

## LUẬT ƯU TIÊN SỐ 1 — what already existed (reused, not rebuilt)
- **jaudit.js §4 "ĐỀ BẠT" is already on main**: Đề bạt lên <next tier> button on her servant's card (servJudgeBtns → kit pbtn, Cần list
  data-kneed), capped by srkMax (her rank), Bạc cost BAL.dbCost by target tier, odds dbOdds (loyalty, merit, tier), loyalty +dbGain, the
  other servants −dbEnvy, tier effects (errands easier, Chưởng sự opens "tra xét cung nữ", eunuch tier ≥3 helps at night, monthly
  allowance from tier 2), NPC mistresses do it too. The ledger's "no promotion act found in main code" (OWNER_LEDGER §7 row 53) was wrong.
- j14 SRK / srkMax / servRanks (merit promotions) + jexam exSrvNpc (servant exams) — untouched.
- review/servant-system (jhouse room-stage household card, popCard) is not on main; it reuses popCard and does not conflict.
- D29 location ledger (review/schedules3) not used: nothing here needs a location (soft dependency, none taken).

## Built (sha see git log; first commit 85496555)
- `dev/build/jpromsv.js` (new, last in assemble.py) + small edits in `jaudit.js` §4:
  1. **Second road of equal worth**: "Xin Hoàng hậu chuẩn" (the Hoàng hậu herself, or no queen → "Xin Thái hậu chuẩn"): favour −spFav.
     Price = Bạc price × pay[Tần]/pay[her rank] × 0.2 (BAL.sp), clamp 3..30 → a Bạc price that is dear at a low rank is as dear in favour.
     Example Chưởng sự (80 bạc): Mỹ nhân/rank2 29 favour, Tần 16, rank6 9, Hoàng hậu 7 (Thái hậu favour). 1 favour ≈ 5 bạc at Tần
     (a morning Thỉnh an ≈ +4 Hoàng hậu favour, 70% odds).
  2. The button now opens a two-road card (KIT: tsPanel + tsOpt — Cần / Tốn / Được / Mất / Kèm, the same as every dialog choice);
     the button is disabled only when NEITHER road is open, and its reason names both prices.
  3. **Loss side of a head post** (maid ≥ Chưởng sự cô cô, eunuch ≥ Thủ lĩnh): the senior servant of the same kind who was passed over:
     lòng −5; the promoted one may grow **proud** (chance by nature tham 45 / lanh 30 / chuyen 30 / nhat 10 / trung 5, −(loyalty−50)/5;
     shown as the average when her nature is unknown): 6 months of lòng −3/month (→ easier to bribe through the existing bribeServ
     formula, which reads loyalty), the other servants lòng −1/month; when lòng < 60, 15%/month she asks to leave → card
     "Kẻ hầu xin đi": Tăng tiền thưởng (Bạc −½ price of her tier, lòng +6, proud 3 more months) / Giáng một bậc (tier −1, lòng −15,
     others +2, pride ends) / Cho đi (servant leaves to the highest palace above hers with room, else Nội vụ phủ; others +2; that
     mistress gets 1 evidence on her).
  4. **NPC mistresses, same rules**: favour road when the purse is short (Hoàng hậu's regard of them, or their Thái hậu favour, keeping ≥10);
     proud NPC servants lose loyalty and may move to a higher palace with room.
- Numbers: BAL.sp in jpromsv.js (one source). Co-op: s.coop servants skip pride/leave. Old saves: s.proud optional.

## Tests
- `dev/test/promote-servants.js <newURL> <oldURL|-> <outdir> [WxH@dpr…]` (file:// works): 23/23 PASS at 755x1000 + 1180x820
  (caps per rank on the real button, favour price by rank, both roads' costs/gains/envy, locks, pride → leave card, each leave road,
  NPC favour road, NPC servant move, no overflow / clipped option cards, old origin/main save loads + act works, no page errors).
- Shots looked at (not committed): card / two-road card / leave card at both sizes.
- Bot measure: `dev/measure/promsv.js` (see results section below).

## KIT REQUEST
- KIT 32.5 dialog options (jk4.js kitDlgFit CSS `.modal .dlg.kdscroll>#mb>.opts{grid-auto-rows:max-content}`): in the landscape
  person dialog (kdper, 1180x820) a text-heavy option card is TALLER than its grid row (max-content row sized at a different width) →
  the next card overlaps it and its last lines are hidden. Probably `grid-auto-rows:auto`. Worked around here by moving the shared Kèm
  lines above the options (kitRows), so these cards fit; any other long option card in the game can still hit it.

## Missing art (no new art tonight)
- Option picture for "Lót tay Nội vụ phủ" (jopic finds none; the card shows no picture — the favour road has one).

## Bot measure (dev/measure/promsv.js, 4 lives each, sensible bot, her policy: promote whenever dbNeed is met — Bạc road if Bạc ≥ 2× price, else favour road)
| build | lives (months) | her promotions Bạc / favour | Bạc spent | her servants' mean lòng | NPC promos Bạc / favour | NPC servants' lòng | proud months / leave cards / NPC moves | her eligible servant-months | blocked only by lòng < 55 |
|---|---|---|---|---|---|---|---|---|---|
| origin/main (before) | 179,138,62,57 | 0 / 0 | 0 | 46.4, 38.0, 35.8, 44.1 | 2 / 0 | 56, 76, 37, 70 | 0 / 0 / 0 | 0 | 31 |
| promote-servants (after) | 190,133,173,143 | 1 / 0 | 40 | 47.5, 55.4, 33.4, 60.4 | 2 / 0 | 53, 75, 50, 85 | 0 / 0 / 0 | 3 | 5 |
- Reading: the bạc / loyalty flow is unchanged within bot noise (same mean Bạc ~57–135 per life both builds; no page errors in 8 lives).
  The act itself is RARE in bot play: a servant is eligible (lòng ≥ 55 AND merit ≥ 3 AND under the cap) only a few servant-months per
  life — her servants average lòng 35–60, and servRanks' merit promotions reset merit. So the favour road and pride/leave never fired
  under the bot; they are verified by the scripted test instead. Owner question below on whether the gate (dbLoyal 55, dbMerit 3) is too tight.
