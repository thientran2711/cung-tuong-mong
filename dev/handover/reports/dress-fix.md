# DRESS-FIX — report (worker of MAIN 161, session_01Rc5AsKadedThQfXUJc2SMu)

depth 1 · START_CTX ~5 %
PRIORITY #1 CHECK: OD 60 hits (26/11 ~18:50Z points (2)–(6) read verbatim) | ledger 2 | main: jtoil TOIL_SL / toilDressUI / toilFinish, jhd hdStep, jinv KEQ_TT / luxAllow / luxOf, jlux BAL.lux, jty tyRob, jeitem eitReOpts, jlost loFind, jearn earnPlainY | review/*: kit-dress-picker, dress-offence, dresscode*, player-dress (none touch the hoa điền slot, the xa xỉ band or the robbery) | claims: none on these.
Branch: `review/dress-fix` from LIVE f573dc94. Owner words: dev/OWNER_DECISIONS.md last row (26/11 ~18:50Z).

## What changed (whole family)
| # | owner point | before (f573dc94) | after |
|---|---|---|---|
| 1 | hoa điền own slot, pickable per day | not in the dress picker (filtered out); chosen only inside the makeup step | slot «Hoa điền» in «Đang mặc» + chest tab «Hoa điền»; a tap = «Hôm nay dán»; detail «Dán» / «Bỏ»; starts as yesterday's if still owned. Consorts only (hidden for a palace-maid life, art rule) |
| 2 | one-button makeup skips ONLY makeup | «Điểm trang nhanh» / «Để mộc» = no hoa điền at all | both keep the picked one, placed by her own hand (`hdHandQ`, the same hashed hand as NPCs); the hand-made makeup places THE picked one (no chooser); a mộc face with a hoa điền counts its xa xỉ (toilMkLux, luxParts.hd) |
| 3 | worn slots compact / merged | 7 slots in one tall column (iPad: scrolls, Giày cut) | 7 slots incl. Hoa điền: Túi thơm merged into Đeo eo (j8 `wearGrp`, one piece at a time: Ngọc bội = Danh or Túi thơm = Sắc; her + NPCs; old saves normalised by `wearMerge` on load + weekly); compact grid = kit `kitEquipSlots({grid:true})` via `kitDressPicker({under})`: Fold 4×2 under her figure, iPad one row above the chest. Same slot set in Tư trang «Bên mình», shop sub-tabs, other people's worn slots (jdress DS_SLOTS), kinl |
| 4 | xa xỉ rescale | allowance 36+16×rank+robe/trâm average → a full rank set = 1.6–2.7× allowance at EVERY rank (Quý nhân over with 2 jewels) | allowance = xa xỉ of a FULL rank-fitting set (robe + trâm + hoa điền at her phẩm, dearest piece of her rank per jewellery slot, best face) / `BAL.lux.full.k` (.85), never below the rank under; a piece ABOVE her rank counts × `BAL.lux.full.overMul` (3). Dwelling score keeps the old formula (`luxAllowShelf`) |
| 5 | strip (MAIN 161 ruling ~18:40Z: an NPC CHOICE, evidence, two-way, no rarity knob) | jty robbery: random night thug OR an enemy's plot; robbed robe of a thug = «srv» lost case (15 % back into her chest); reissue = always the SAME plain robe (hash) → identical outfits; she had no such act | only an enemy who CHOSE it (the oán-driven omen plot, npcWhy tyPlot; the thug path removed, odds BAL.ty unchanged = OAN-PACE's lane); the robe goes into THAT enemy's chest as a kept case (jlost loKeepBy → hearing / recognised when worn = evidence, law 6a/6c), never back into hers (fallback lost case cause «rob», LO.home.rob 0); `earnPlainY` never a duplicate (unowned plain → unowned of her phẩm → none, she wears her own). Two-way acts «Thuê người giật y phục» (Bạc BAL.ty.act) / «Sai cung nữ thân tín giật y phục» (loyalty, harder; odds = jlost loStealO): target's robe into HER chest, target in trung y; caught = target holds evidence; deed uh |
| 6 | maid road = 2 khắc + Danh | «Sai cung nữ»: Sức −6 + lower odds (+ jptime 2-khắc wait) | Danh by rank `BAL.eit.re.waitDanh` [1,1,1,2,2,3,3,4] («mặc trung y ngồi đợi, người qua lại nhìn») + the jptime 2-khắc wait; same odds as the silver road (equal value, law 2) |
Park (owner): identical gifts from the Emperor — not touched.

## xa xỉ table (dev/measure/lux-band.js; PASS)
before: FULL set / allowance = 2.69 · 1.61 · 1.64 · 2.10 · 2.45 · 2.33 · 2.25 · 2.45 (ranks 0–7, verdict «vượt»)
after:
```
rank | 2 jewels + robe + trâm | FULL set (r) · thỉnh an | FULL + 1 above rank
0 Đáp ứng 0.60 | 0.82 hợp dịp | 1.12
1 Thường tại 0.58 | 0.76 hợp dịp | 1.03
2 Quý nhân 0.52 | 0.88 hợp dịp | 1.35
3 Tần 0.54 | 0.80 hợp dịp | 1.05
4 Phi 0.57 | 0.81 hợp dịp | 1.05
5 Quý phi 0.56 | 0.81 hợp dịp | 1.15
6 Hoàng quý phi 0.51 | 0.82 hợp dịp | 1.23
7 Hoàng hậu 0.49 | 0.83 hợp dịp | (nothing above)
```

## Kit
`kitEquipSlots` grid mode (jinv, KIT.md §28.13c) + `kitDressPicker` `under` (jtoil, KIT.md §60.2). Sent to KK44 (session_01Rc5AsLVfGh4xhhKhZGXEWJ) to confirm / own.
Dialog queueing not touched (DIALOG-ORDER-R4 not affected).

## Tests
- dev/test/dress-fix.js (new): PASS 22 (Fold + iPad real taps: pick → slot → quick / mộc / hand; merge her / old save / NPC; robbery odds, cooldown, 60 runs never home, reissue no duplicate; maid road)
- dev/test/dress-tap.js: PASS 32 · dev/test/dress-fix-look.js: PASS (stills) · dev/measure/lux-band.js: PASS
- dev/test/dress-fix.js PASS 24 ×4 runs (consort lives)
- quickcheck --runs 3 on 3ddc527e: perf PASS (median of 3, new/live): render 235/256 ms, tab 497/634 ms, buổi 1283/1386 ms, tasks>200ms 26/32; open 2283 ms; old save ok; G1 one-core PASS.
  Gate G4 80-dialog-fixed FAILS with «(kit-dialog-2 a) no empty Tốn / Được cell» Fold + iPad — the SAME 2 FAIL lines on LIVE f573dc94 (dev/test/dialog-fixed.js run on both builds): pre-existing, not this branch.

## LOOK
Stills CDN img/_review/dress-fix/: before-fold/ipad.jpg, look-fold/ipad.jpg (posted to MAIN as LOOK READY).
