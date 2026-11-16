# PROGRESS · review/luxury (D17 — xa xỉ as one system)

Owner sources: OWNER_DECISIONS 15/11 23:05Z (dress contest theme tag + luxury value + rank allowance, vượt phẩm punishes greed),
23:15Z (luxury = RANGE per theme/occasion, deeper system: occasions, host taste, xa hoa reputation, thiếu lễ, NPCs same), 05:50Z, 07:00Z, 08:10Z
(numbers only; never show the rank allowance). Ledger items 71 / 210. Branch from origin/main eba64ead4.

## What exists and was REUSED (LUẬT ƯU TIÊN SỐ 1)
- Piece luxury: jinv `luxVal` (grade [8,16,28,44,64] + giá/10), jwdinv `wdLux`, jpet `petLux`; worn total + allowance = `luxOf(p)` (jinv, + pets, + wardrobe).
- Monthly law: jinv `luxMonth` (ghen, Thái hậu frown, gossip, giản dị Đức +1).
- Dress verdict: jtoil `toilDress` (hợp dịp / hợp phẩm / quá giản dị / quá phô trương / vượt phẩm / phạm tang) feeding jaudit §17 `leAttire`
  → act-card Kèm/risk line + "Vì sao" + applied once per host per day. Thiếu lễ (jaudit §16) unchanged.
- Hội phối đồ (jts Ý 2, UI by C34 contest-ui on main): themes Thanh nhã / Phú quý / Hương sắc, 4 slots, podium.

## What D17 adds — `dev/build/jlux.js` (after jtoil) + edits in jts.js, jcoopworld.js (one world key)
1. **Occasion range** `BAL.lux.occ` (fractions of her allowance): thuong / thinhan / yen (= jtoil F 0/1/2) + tang / edict / lanh.
   Defaults are exactly jtoil's old `BAL.toil.dress` thresholds (test 1 proves the verdict is identical), so nothing changes without a modifier.
   `toilDress` now = `luxVerdict(p, F, host)`.
2. **Modifiers**: quốc tang (j92 `wdTang`) and the frugal edict cap the range (and thiếu lễ does not fire then); lãnh cung has its own small range.
   **Host taste** shifts it (`BAL.lux.host`): frugal (nết Hiền lành/Nhu mì — or, soft hook, trọng Kiệm/Khiêm when review/personality's `trongOf` exists)
   pulls fit/hi ×0.8/×0.85; strict (existing nết, or trọng Lễ) raises the floor ×1.25; Hoàng thượng who likes "y phục lộng lẫy" raises it ×1.2.
   `leHostKind` is wrapped (normal → frugal/strict by trọng), so jaudit + jtoil reactions follow the same taste.
3. **Consequences at a formal moment (F ≥ 1), once per host per day, shown on the card first** (`luxExtra`, added to toilFx → leAttire delta):
   phô trương / vượt phẩm: Đức −1 (`showDuc`); under an edict: Đức −2, Danh −1; lavish in mourning: Đức −2; at a festival/yến (F 2):
   hợp dịp Danh +1, quá giản dị Danh −1. Host regard (jtoil react tables) and rivals' ghen (jtoil crowd) unchanged.
   Card text names the number, e.g. "y phục quá phô trương (Xa xỉ 95 giữa dịp thỉnh an: xa xỉ quá dịp, Đức -1)".
4. **Tiếng xa hoa** `p.luxRep` 0..12 monthly: +1 above her allowance (+2 far above, jinv lv 3), +1 per phô trương verdict taken (max 2), −1 otherwise; ≥ 6 → Danh −1,
   Thái hậu −2 a month (NPC: Danh −1, their Thái hậu regard −2). Log says when it starts / fades.
5. **Ý chỉ tiết kiệm** (frugal edict): when ≥ 4 people have tiếng xa hoa (a frugal Thái hậu: ≥ 3), 25 % a month, lasts 3 months, cooldown 24.
   Event card (Q + kitRows). While it stands: above its range at month end Đức −2 (her: + Thái hậu −2 if she issued it); in range 1 in 3 Đức +1.
   `S.luxEdict` = co-op WORLD key (jcoopworld W_KEYS); reputation per person.
6. **NPCs same rules**: their thỉnh an verdict = their real clothes (`toilNpc` reads `luxVerdict`), Đức extra at serveTH (max once a month),
   monthly reputation, edict; an NPC with tiếng xa hoa (or above an edict) tones down one phẩm (j92 `wdAutoFor(v,-1)`, 70 %, Kiêu ngạo/Tham vọng 25 %).
9. **LUẬT SỬA CẢ NHÓM — deck cards hid their side line**: a Hành sự card copied from a talk option (j2 `directActs`: Thỉnh an Thái hậu / Hoàng hậu)
   never showed `a.risk` — thiếu lễ, the day's look (jtoil) and the luxury verdict were applied but invisible on the card. `cardH` wrapper now puts it in the
   card's existing Kèm row. Scan (test 8, all deck cards with a risk, lavish + plain dress): before 0/6 shown → after 6/6 shown.
   Also: a frugal host pleased by plain dress no longer reads "thiếu lễ" on the rider.
7. **Hội phối đồ**: 5 themes with an absolute luxury range for the 4-piece set — Thanh nhã 40–100, Xuân sắc 50–120, Hương sắc 60–130,
   Cổ phong 70–150, Phú quý 130–230; capped by her allowance (hi ≤ allowance, floor ≤ 0.45 × allowance: `luxThemeRange`).
   Score: theme hits 2 each + range term (in range +3, phô trương +1 and Đức −1, above allowance −2 + vượt phẩm Danh −3, too plain down to −1);
   the old price term (higher = better) is gone. Theme tags for EVERY wearable derived from colour/material/name (`luxThemesOf`, test 4b),
   shown by kitItemDetail's theme row (kidThemes). Fixed: Cài tóc / Áo slots ignored wardrobe items (IT `wsl`); an empty Cài tóc / Áo slot
   = what she wears now (NPCs had empty sets before — they now dress from their wardrobe). Smart pick (NPC Tâm cơ, loyal maid) = small search.
   Announce card row "Xa xỉ: đề … chuộng cả bộ khoảng A đến B", board header field "đã đặt n/4 · Xa xỉ N", result log names the verdict.
8. **Gift API for D19** (`luxGift`), see below.

## API / keys (for D19 "Biếu quà làm lành" and others)
- `luxPiece(k)` → luxury of one piece (wardrobe / jewellery / fabric / pet).
- `luxRange(p, occ, host)` → `{occ, ctx, hk, n, F, lo, fit:[a,b], hi, bud, pts:{lo,fit,hi}}` (fractions + points). occ: name or F 0/1/2.
- `luxVerdict(p, occ, host)` → `{v, style, sc, r, R, word}`; v ∈ hopdip | hoppham | giandi | photruong | vuot | tang.
- `luxCtx(p)` → "tang" | "edict" | "lanh" | "". `luxEdictOn()`. `luxXaHoa(p)` (tiếng xa hoa).
- `luxGift(k|value, from, to)` → `{v, r, bud, st: mon|vua|hop|hau, word, pts}` vs the RECEIVER's allowance, `BAL.lux.gift` {lo .08, fit .15–.45, hi .6}.
  D19 should: value a handmade work/item by `luxPiece` (or BAL.craftGift) and read `st`: "mon" = quà mọn (little effect), "hop" = right,
  "hau" = quá hậu (looks like đút lót: trọng Liêm/Kiệm judges frown). Bạc equivalence (BALANCE 20:30Z) is D19's job.
- Save keys: `S.luxRep`, `S.luxRepD`, `S.luxEdict {until, at, by}` (world), `v.luxRep`. All optional: old saves load (test 6).
- Numbers: `BAL.lux` (jlux.js head).

## Tests / measures
- `node dev/test/luxury.js [index.html]` — 13 checks (default = old thresholds, shifts, card = applied, contest ordering, tags on every wearable,
  5 themes, NPC contest dress, reputation → edict, NPC edict, co-op world key, old save month, gift API). All PASS.
- `EXTRA=inlux.js GAME=… node dev/measure/runbal.js sens N out.json` (runbal now takes EXTRA) — results below.

## Overlaps / not touched
- C34 contest-ui (Foreman B, on main): no UI part changed. Text only: announce row added via tsRows, board header field via kg82Set("round"),
  option Mất/note text, result log. TS_SLOT fit + scoring are rules.
- review/personality (D7): not on main; soft hook only (`typeof trongOf`). When it merges, trọng Kiệm/Khiêm/Lễ hosts shift ranges.
- review/toilette numbers (BAL.toil) untouched; the verdict function moved here.

## Measures (sensible bot, `runbal.js` + `inlux.js`, 6 lives each, main eba64ead4 vs this branch; 34.6 / 37.4 bot-years)
| per bot-year | main | review/luxury |
|---|---|---|
| her mean Danh / Đức / Bạc (monthly samples) | 85.6 / 46.4 / 110.9 | 86.3 / 47.3 / 119.8 |
| dress verdict at formal moments: Danh / Đức / Thái hậu | −0.06 / 0 / −53.6 | −0.43 / 0 / −56.0 |
| monthly luxury law (her): Danh / Đức / Thái hậu | 0 / 0 / 0 | 0 / +0.13 / 0 |
| edicts | 0 | 7 in 37 years (before tuning: 30 in 60 → calmed) |
- Bạc: D17 changes no bạc flow (difference is noise). The bot under-dresses (worn/allowance ≈ 0.13), so thiếu lễ dominates and costs Thái hậu ~54/yr
  on BOTH builds — pre-existing (see Q11 of D7: thiếu lễ weight).
- NPC end-of-run sim (48 months × 3, `endTurn` only): NPC mean Đức main 52–55 → branch 42–47 (lavish NPCs pay), Danh / Thái hậu regard unchanged; 1–2 NPCs with tiếng xa hoa.
- Hội phối đồ sim (300 contests, her new-game inventory, ranks 0–6): main = everyone's dress part 0 (Cài tóc/Áo slots never filled; NPCs had empty sets),
  the contest was decided by Sắc/Tâm cơ only; branch = NPC dress part 3.7/10, hers 3.0/10 (she owns little at the start; "quá giản dị" every time).
- Tests: `node dev/test/luxury.js` 15/15 PASS, `dev/test/thieu-le.js` ok. Shots `node dev/test/luxury-shots.js <index> <dir>` at 755x1000 + 1180x820:
  deck card Kèm line, báo đề card (row Xa xỉ), dress board (Hợp đề row, WD dress now placeable), Ý chỉ tiết kiệm card. No page errors.

## KIT REQUEST
- Hội phối đồ board (C34 kitGameFrame): the board's score/round header fields are not shown in the current frame, so the outfit's running
  "Xa xỉ N" (kg82Set("round")) is invisible while dressing. Needs a visible frame line "Bộ đồ: Xa xỉ N · đề chuộng A đến B" (kit keeper / C34).
- (minor) jevfit has no picture rule for "Ý chỉ tiết kiệm" — it falls back to the thỉnh an painting (fine) — an edict painting could be mapped.

## Owner questions
1. Hội phối đồ báo đề now SHOWS the theme's range ("đề Phú quý chuộng cả bộ khoảng 130 đến 230"). Her rank allowance stays hidden (08:10Z). OK?
2. Above her allowance in a contest = vượt phẩm (Danh −3) even if inside the theme range; low ranks are judged against min(range, allowance) — OK?
3. Too lavish before Thái hậu/Hoàng hậu/Hoàng thượng: Đức −1 each formal meeting (once per host per day) — keep that weight?
4. Frugal edict (Ý chỉ tiết kiệm) ~ once every 5 years in bot runs; lasts 3 months; Đức −2/month above it. Frequency OK?
5. NPCs now really dress for the contest (from their wardrobe) — the contest got harder for her than on main (where NPC dress counted 0).
