# PROGRESS — review/econ-items (D6 econ-items, Foreman C)

Owner sources: OD 15/11 20:05Z #4 (stipend skimming also items: fewer / lower grade), #7 (stolen clothes re-issue: Nội vụ phủ / stipend /
family, never stuck in trung y, show odds), #8 (girlhood chest fills the 6 slots, kept into the palace); ledger D6 (+ charcoal / ice by rank,
history ideas); OD 16/11 coordinator ruling (girlhood chest: 5 worn + un-worn handkerchief, Khăn che mặt empty); BALANCE 20:30Z.

## LUẬT ƯU TIÊN SỐ 1 — what already existed (reused, not rebuilt)
- main jstip (review/econ-stipend): real stipend goods, winter charcoal by rank, Nội vụ phủ skimming (silver + every good one step worse) with
  causes and her answers (Nhịn / Đút bạc / Sai cung nữ đi đòi / Tố lên / Ghi nhớ), NPC parity. → extended, not replaced.
- main jty + jearn (review/trung-y, items-earned): robe lost → empty Y phục slot → trung y; robbery; Nội vụ phủ plain robe after
  BAL.ty.reissueWk (flat 2 weeks), no player road to hurry it. → added the roads + delay by rank.
- review/outside-r2-r2 (not on main; NOT edited): jkc.js `kcChest` = girlhood chest at the start of the HOME road (6 things, art
  item-ngocboikc / item-vongbackc on the CDN). Main has no home road, so a palace-road life never got it. → `girlChest` here gives the same
  6 things (same item keys, same IT definitions guarded by `if(!IT[k])`), skipped when `S.kc` exists (home road ran).
- review/balance-pass-r1: inty.js + runb.js/run_par.js runner fix (copied unchanged), altCost / BAL.bacTuan / BAL.altK (used when present,
  same numbers inlined otherwise).

## Built (dev/build/jeitem.js, last in assemble; small edits in jstip.js; numbers BAL.eit)
1. Ice in summer: Băng đá by rank in Hạ (BAL.eit.ice [0,0,1,1,1,2,2,3]); melts at the month's turn; skimmed → Băng vụn (hàng kém), one less.
   Bổng lộc table (blCard → stipRankTxt) shows "mùa hạ N khối băng đá". Art: 2 new item paintings (gpt-2-6), ITEM_ART.md §6, CDN.
2. Skim size by standing (jstip stipItemN / stipPickLines): lines skimmed = 1 +1 (2+ causes) +1 (Sủng low) +1 (rank ≤ 1) −1 (rank ≥ 5);
   charcoal / ice first, then dearest. (Before: all lines at once.)
3. Kẻ hầu ăn bớt: an unloyal servant / cung nữ pockets the dearest piece; noticed by Tai mắt → kit person dialog (pServ / pMaid):
   Phạt nặng / Răn dạy rồi tha / Trả về Nội vụ phủ / Làm ngơ; unnoticed = simply fewer pieces. NPCs same (data + news).
4. Robe re-issue: wait by rank (BAL.eit.reWk [3,3,2,2,2,1,1,1] weeks, +1 when Sủng low). Roads with odds: Lót tay (Bạc tip[rank]) ·
   Sai cung nữ đi xin (no bạc: Sức + lower odds priced like the bạc at her rank) · Viết thư xin nhà (Sức 2, 1 week, odds by origin) · Đợi.
   Shown on the robbery card ("Bị giật y phục giữa đường") and as "Xin cấp lại y phục" in Tư trang → Việc while she is in trung y.
5. Girlhood chest on the palace road: 6 things in kitReward "Rương đồ khuê các"; Đeo tay / Đeo eo / Túi thơm worn; robe + hairpin kept in
   the bag (fallback); handkerchief in the bag; veil empty (ruling). NPCs: one girlhood robe each in their chest (fallback, weekly, once).
- Old saves: fields created on first use, no conversion; no chest for a life already under way. Co-op: per player (each player's own S).
- Kit: only existing parts (kitReward, kitRows, person dialog Q event, pbtn act button, kitItem art). No new CSS, no new kit part.

## Tests
- `dev/test/econ-items.js <url> <out> [WxH@dpr,...] [save.json]` (sw-serve.js): chest 6 rows + worn slots, ice + melt, skim size,
  pilfer dialog (layout, punish returns the piece), Tư trang button → re-issue dialog (layout, roads, maid road issues a robe), robbery card
  roads, family robe arrives, NPC robe, old save loads + endTurn.
- Bot counters: `dev/measure/ineit.js` (INP2).

## Results (16/11)
- econ-items.js PASS at 755x1000@2, 1180x820@2, 1000x755@2, 1366x1024@2, 844x390@2 (old save fixtures/world30-met.json loads + endTurn,
  0 page errors, dialogs in view, no overflow). Skim size table (rank, Sủng, causes → lines): (0,5,2)→4 · (0,40,1)→2 · (3,40,1)→1 ·
  (5,40,1)→1 · (6,5,2)→2. Robe wait: rank 0 + Sủng low 4 weeks, rank 6 1 week (was flat 2).
- Bot (runb sens, inpage6 + inx/inpz/inty/ineit, HHSTOP, 9-origin rotation; 7 lives each, ~80 years; box load ~25 so small n):
  | | main eba64ead4 | this branch |
  |---|---|---|
  | fates | 5 Thái phi, 2 poison | 5 Thái phi, 1 TB, 1 childbirth |
  | goods pieces / month | 2.74 | 3.17 (ice in Hạ) |
  | goods value / month (IT.pr) | 44.5 | 57.5 (higher ranks reached in this sample + ice) |
  | stipend bạc net / month | 66.8 | 71.8 |
  | skims / month · lines per skim | 0.08 · 1.0 (all lines) | 0.05 · 2.09 |
  | servants pocketing / month · noticed | 0 | 0.02 · 16 dialogs |
  | ice issued · used/melted | 0 | 197 · 74 |
  | robes lost · weeks in trung y | 201 · 487 | 277 · 483 |
  | bạc at the end (mean) | 47 | 76 |
  Bot never took a re-issue road (it dresses from the chest via inty.js and waits); the roads are covered by the UI test. No change in
  life outcomes visible at this n.

## QUESTIONS / overlaps
- review/outside-r2-r2 jkc.js kcChest (home road) and girlChest here give the same chest; when outside merges, kcChest should call
  girlChest(S,{wear:true}) (one function). Not edited here (other branch). Both guard IT.ngocboikc / IT.vongbackc with `if(!IT[k])`.
- "6 slots": owner 20:05Z #8 says fill ALL 6 slots; coordinator ruling 16/11 keeps Khăn che mặt empty (veil = hủy dung) + un-worn
  handkerchief = 6 things. Built per the ruling; on the palace road the court-issued robe + hairpin stay worn, the girlhood ones go in the bag.
- Maid-origin (cung nữ) lives get no girlhood chest (servant start). Owner may want one.

## Reviewer r1 (review/econ-items-r1, 16/11) — merged origin/main 0c23da40 (jkc.js now on main), jeitem.js LAST, site rebuilt
Fixes made by the reviewer:
1. Robe re-issue wait = owner 16/11 s9 option 3: a RANDOM 1–3 weeks weighted by how Nội vụ phủ regards her (`eitRegard`: rank, Sủng,
   recent tip up; every stipend skim cause down; weeks = 1 + two rolls vs 100 − regard). Replaces the fixed `reWk[rank]` (+1 low Sủng gave
   4 weeks at rank 0, over the owner's 3). Test: 300 samples, rank 0 Sủng 5 mean ≈2.7, rank 6 Sủng 80 mean ≈1.2, all in 1..3.
2. Maid road capped below the bạc road: maid/Tai mắt bonus clamped to ±`re.maidAdj` (5); before, Tai mắt 10 alone added +40 and the free
   road beat the bạc road on odds.
3. Pilfer answers each have a gain AND a loss (owner 16/11 07:15Z): Phạt nặng also deters the other servants (detM/2); Răn dạy rồi tha
   +4 Lòng but the other servants pocket more for softM (3) months; Làm ngơ +12 Lòng (was +3, strictly worse than Răn dạy).
4. "Đợi Nội vụ phủ" no longer says "không được không mất" — the loss (thiếu lễ in trung y) is shown.
5. One chest function: jkc `kcChest` (now on main) calls `girlChest(S,{wear:true,who})`; the palace chest shows items through the kit's
   kgItem like kcChestShow, un-worn robe/hairpin say "cất trong Tư trang".
