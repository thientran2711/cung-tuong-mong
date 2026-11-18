# review/promote-servants (D41) — sha c4a79401 (base origin/main c4e89f89) — SẴN SÀNG KIỂM

## Built
- LUẬT ƯU TIÊN SỐ 1: the core act ALREADY existed on main — jaudit.js §4 "Đề bạt lên …" (her servant's card, capped by srkMax = her rank,
  Bạc price BAL.dbCost, odds, lòng +8, other servants −3, tier effects, NPC mistresses too). OWNER_LEDGER §7 row 53 "no promotion act
  found in main code" is wrong. Reused; nothing rebuilt.
- Added (new jpromsv.js, last in assemble.py + small jaudit §4 edits; numbers BAL.sp):
  1. Second road of EQUAL worth (BALANCE rule): "Xin Hoàng hậu chuẩn" (Hoàng hậu herself / no queen → "Xin Thái hậu chuẩn") = favour
     −(Bạc price × pay[Tần]/pay[her rank] × 0.2). Chưởng sự (80 bạc): rank2 29 / Tần 16 / rank6 9 / Hoàng hậu 7 favour.
     Button opens a two-road kit card (tsPanel + tsOpt); disabled only when neither road is open, reason names both prices.
  2. Gain AND loss of a head post (Chưởng sự cô cô / Nữ quan / Thủ lĩnh / Tổng quản): passed-over senior lòng −5; the promoted one may
     grow proud (by nature + loyalty): 6 months lòng −3/month (→ easier to bribe via the existing formula), others −1/month; at lòng < 60,
     15%/month asks to leave → card: raise pay (Bạc) / demote one tier / let go (to a higher palace with room, which gets 1 evidence on her).
  3. NPC mistresses same rules: favour road when the purse is short; proud NPC servants may move to a higher palace.
- Co-op: s.coop servants skip pride/leave. Old saves load (s.proud optional) — tested with an origin/main save.

## Tests
- dev/test/promote-servants.js: 23/23 PASS at 755x1000 + 1180x820 (caps per rank on the real button, favour price by rank, both
  roads' costs/gains/envy, locks, pride → leave card + all 3 roads, NPC favour road, NPC servant move, no overflow / clipped cards,
  old save, no page errors). Shots looked at: servant card, two-road card, leave card at both sizes.
- Bot measure dev/measure/promsv.js (4 lives before/after): Bạc / loyalty flow unchanged within noise, no page errors. The act is
  rarely eligible in bot play (servants' lòng 35–60 < dbLoyal 55, merit reset by servRanks): 0–3 eligible servant-months per life.
  Table in dev/PROGRESS_promote-servants.md.
- Not done: root site rebuild (build_site.sh needs the CDN index; coordinator merge rebuilds); host-mode (openHost) run — direct mode
  at the two design sizes only.

## KIT REQUEST
- KIT 32.5 (jk4 kitDlgFit CSS `.opts{grid-auto-rows:max-content}`): in the landscape person dialog (kdper, 1180x820) a text-heavy
  option card is taller than its grid row → the next card overlaps it, last lines hidden. Suggest `grid-auto-rows:auto`. Worked around
  here (shared Kèm lines moved above the options via kitRows); other long option cards in the game can still hit it.

## Missing art (morning)
- Option picture for "Lót tay Nội vụ phủ" (jopic finds none; the favour-road card has one).

## Owner questions
1. The Đề bạt gate (lòng ≥ 55 AND công lao ≥ 3) is almost never met in bot play — loosen it (e.g. lòng 45) or keep it rare?
2. Should a palace have only ONE Chưởng sự cô cô / ONE Tổng quản (a post, not a rank)? Today several servants may hold the same tier.
