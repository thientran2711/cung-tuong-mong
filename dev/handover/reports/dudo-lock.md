# dudo-lock — owner-bug "Dư đồ: chỗ nào cũng khóa hết" (OD 16/11 18:30Z point 4)

Branch: `review/dudo-lock` @ 2cd2eb91 (one commit on origin/main 2934bede). SẴN SÀNG KIỂM 2cd2eb91.
Worker session: session_01UV1SzhgcdBcFg9cbDHVifr (for MAIN s21). START_CTX ~3 % of 1M; finished at ~20 %. No rollover needed.

## Root cause
`j41 accSpot` (the ONE kit map-label function) added the lock mark (`.mlock`) to EVERY place whose `accState(k).why` was non-empty.
That includes `why = "đi N khắc, đến nơi đã sang …"` = an OPEN place that is only farther than the khắc left this buổi.
KIT.md §34.1d even said so ("đi N khắc (+ lock mark)"); that line was written before walk spill (owner 11/15 09:05Z) existed.
She normally spends khắc in Hành sự first and opens Dư đồ with 1 khắc left: then 8–10 open places (Ngự hoa viên, Đức Thọ cung, Càn Ninh,
rival palaces, Thái y viện, Dãy nhà cung nhân, Tân Giả khố…) wore the same lock as Dưỡng Hòa điện / Cần Chính điện → "everything locked".
The tap card behind each of them already offered "Đi (đến nơi vào buổi sau)"; the lock told her not to try. The list view (Danh sách) greyed
the same tiles; the person-card buttons (Đến gặp / Đến cung nàng thăm / Đến chỗ hắn) were DISABLED for a far walk (no spill at all).
Logic access (accessOf) was NOT wrong: no servant rule leaks onto consorts, no j95gate on main, no missing old-save flag, no tutorial gate.

Ruled out (checked live, host mode Fold + iPad): servant hook j42 (only isSrv), jplx PLX gates (rank/kid rules, real), co-op (goTo identical;
only walk spill is off in co-op, unchanged), old save fixture world30-met (same results as fresh), tutorial (no gate).

## Lock table (Quý nhân "tt", fresh; morning; open = enter now · rule = lock mark with reason)
| place | rule | why (game text, accessOf) |
|---|---|---|
| Dưỡng Hòa điện / Cần Chính điện | lock | chỉ vào khi được triệu (xin yết kiến / lẻn vào) |
| Đức Thọ cung | open sáng (and festivals), lock other buổi | Thái hậu chỉ tiếp lúc sáng thỉnh an |
| Càn Ninh cung | open sáng, lock other buổi (rank < 7) | ngoài giờ thỉnh an phải được mời |
| Rival palaces | open (bái kiến card on arrival when chủ vị outranks) | — |
| Thái y viện, Ngự hoa viên, Thượng thư phòng, A ca sở, Đông cung, Nội vụ phủ | lock tối | đóng cửa tối |
| Thượng thư phòng | lock | chỉ Tần trở lên hoặc người có con đang học |
| A ca sở | lock | chỉ Tần trở lên hoặc mẹ của hoàng tử |
| Đông cung | lock | chỉ mẹ Thái tử và Hoàng hậu; người khác xin bái kiến |
| Tân Giả khố | lock below Quý nhân | nơi phạt cung nhân: cần phẩm Quý nhân |
| Dãy nhà cung nhân | lock tối | đêm chỉ cung nhân ra vào |
| Kính sự phòng, Trường Môn viện | open | — |
| ANY open place farther than khắc left | BEFORE: lock · NOW: plain label, red "đi N khắc", tap = walk-spill card | — |
Counts per life × buổi × khắc (open / far / rule): see `GRID=1 node dev/test/dudo-lock.js dev/index.html`; e.g. tt b0: 13/0/5 at 4 khắc,
4/9/5 at 1 khắc (8 of the 9 far ones reachable by spill). Lives: tt (Quý nhân), muoi, dtq, nc (Tần), cn, cnv (maid road), old save.

## Fix (one rule, whole group)
- `j41 accSpot` + list tiles: lock mark / grey ONLY when a rule keeps her out (accessOf fails, cấm túc, lãnh cung). Far = `.mspot.awalk` /
  `.mtile.awalk` (same kit label, no lock, not greyed); tap → existing j77Card with "Đi (đến nơi vào buổi sau)".
- `j9`: `walkBlock(k)` / `walkLate(k)` / `walkGo(k)` = the one go-there rule; used by j21 seeBtn/goSee/visitBtn/visitPal, j22 men card,
  j6 generic `data-go`. Buttons stay enabled when spill can take her; sub-line says "đến nơi buổi sau".
- `j9 walkSpillTick`: if the place shut during the walk (rule read before NPCs moved, e.g. maid's mistress left Càn Ninh) → place card
  with the reason, never a silent stop at home.
- KIT.md §34.1d walk line rewritten in place (canon overwrite).
- Reasons for real rule locks are unchanged: game text from accessOf, shown in the tap card (KIT 34.1d owner rule: no reason line on the map).

## Tests
- `GRID=1 node dev/test/dudo-lock.js dev/index.html 1180x820`: lock mark == rule lock for 5 origins + maid road + old save × 4 buổi × 4 khắc
  → OLD build 57 wrong locks, NEW 0; SPILL: every far-but-open place reached next buổi (or bái kiến / reason card). Page errors 0.
- `node dev/test/dudo-tap.js <fold|ipadAir> tt [out]` (host mode, real taps, USED=khắc used): map → place → hall row → arrives (place screen).
- Perf smoke (iPad, 1 khắc left): mapHTML 2.1 ms, full Dư đồ render ~25 ms (no measurable change).
- Shots (before/after, Fold 755x1000 + iPad 1180x820): dev/shots/dudo-lock/{before,after}-{fold,ipad}-{map-1khac,card-1khac,place}.jpg

## Observations for MAIN (not changed here)
1. Fold emulation only: the first Dư đồ `<img class="mapimg">` sometimes never starts its request (currentSrc ""), so `.mapw` is 0 px tall and
   every label piles at the top, untappable. Re-setting src loads it. Not reproduced on iPad. Worth one check on the owner's real Fold; a kit
   fix (width/height or aspect-ratio on .mapw so labels keep their place before the picture loads) belongs to the KIT KEEPER (j26/j27 map part).
2. Place card "GIỜ: Tiếp lúc sáng thỉnh an" for Đức Thọ cung while a festival opens it all day (accessOf fest:1) — wording, small.
3. Sneak/punish numbers in j77 (Danh -8 / -15) are typed in code, not BAL (ONE CORE OD:L1267) — pre-existing, outside this fix.
4. Two-step entry (tap place → courtyard detail → tap hall/row) is by design (jpm KIT §33); the row is the only "go" affordance.
