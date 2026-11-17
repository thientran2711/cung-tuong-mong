# DISPLAY SHELF — step 2: rules + data (worker report)

PRIORITY #1 CHECK: OD 13 hits trưng bày|chăm cây|ngự ban|thăm phòng|visit, none for a shelf (brief s35 line: prio1 "trưng bày shelf" OD 0 · ledger 0 · claims 0 · main 0 · review/* 0) | main reused: jlux luxPiece/luxAllow (one luxury number + rank allowance), jdress dressLook/ACT.xx (sighting + Tố xa xỉ model), jtruth spyFind + jwhy spyMaidRun (Dò la), jagent AGSOC/agPlan/agSlot/agLand0 + jtwoway TWD (shared deeds), jpetcare care model + kitGameFrame screen, jil ilSlots/ilOut (ledger), jemo emoSet (one mood bar), j8 SHOP_ALL/BEST | review/*: review/dress-offence (jdress not assembled on main today) | claims C-AG DISPLAY SHELF review/display-shelf.

Branch: review/display-shelf · sha 8cf7cf0c (on origin/main d5ea786d). Worker session session_01UV1SzjhM5kL1Mi3jpBfjY6. Foreman C-AG #4.
START_CTX ≈ 5 % (1M window); at report ≈ 25 %.

## What was built (dev/build/jshelf.js, loaded last; numbers in BAL.shelf)
1. **Shelf per person** (her + every NPC, same data + rule): `p.shelf.g[group] = entry`, ONE piece per group (10 groups, placeholder list until dev/research/display-shelf-items.md lands). Displaying MOVES the entry out of `p.inv` → it cannot be gifted / sold / used / worn until taken down (owner (1)); same-group swap returns the old piece. jil ledger: `ilSlots`/`ilOut` include shelf entries (conservation law kept, `ilCensus` passes). Old saves / co-op: all lazy (no migration); NPC shelves seed once by rank (BAL.shelf.npc.seed) and NPCs arrange their own chest weekly within their allowance (proud traits go over).
   Items = existing IT (lanquy, tranhco, nghien, dancoc, cocngoc) + 12 new décor pieces (IT kd "Bày biện": tùng thế, chuông gió đồng/lưu ly, mành trúc, rèm châu, bình phong gỗ/lụa, bình sứ, thư pháp, như ý ngọc, lư hương, chậu cây khô). Sources: Nội vụ phủ (SHOP_ALL) + ngự ban lists (BEST promo/birthday/contest).
2. **Dwelling xa xỉ** (separate from worn xa xỉ — "hai điểm xa xỉ"): Σ luxPiece of displayed pieces (withered plant × witherLux) vs `luxAllow(p) × allowF` → Đơn sơ / Hợp phẩm / Xa hoa / Quá xa xỉ. Allowance never shown (OD 08:10Z); player text shows only "Xa xỉ nơi ở N".
   Effects (same for NPC shelves): a visitor's eye (once / 4 tuần): superior frowns on Xa hoa/Quá (thiện cảm −4/−8), peers envy (ghen +3/+6 × LUX_TR; NPC↔NPC as oán), a fitting room is admired (+2), ngự ban pieces raise envy, a withered plant draws scorn (−2). Mood: one jemo bar (vui 22 fitting / 34 lavish; buồn 20 withered). Quá xa xỉ adds tiếng xa hoa (luxRep +1/month).
3. **Info channels**: (a) NEW shared deed TW `call` "Ghé chơi" (relAdd +3, sees the room both ways) in the agent day plan: AGSOC option + a daily-life drop-in when a consort keeps her schedule (1 in 12 a buổi, her room weighs more), landing AT the target's palace (khắc chain via agSlot/agPlan, AG1b witness card when she is home). Any visiting deed landing at the target's palace (sang thăm, giúp, tạ lỗi, khiêu khích…) also shows the room. Her side: walking into a palace (goTo) shows the rooms of everyone living there. (b) Dò la both ways + her maid's "Sai đi dò la" report the room. (c) Rumours: rooms at Xa hoa+ spread (1 in 12 a week per consort) — knowledge only, never proof (jtruth rule 4).
   **Tố xa xỉ**: the room is a second cause of the SAME act ACT.xx (jdress): proof = own-eyes visit or Dò la only. Inquiry: within allowance → false charge (accuser Danh −5…); waved off by odds oVP; proven → most lavish piece back to the chest, Đức −2, Danh −4, luxRep +2. NPCs with proof + motive bring the charge monthly (same function both ways). jdress is NOT assembled on main today → jshelf defines ACT.xx with the room cause only; when jdress lands it must load BEFORE jshelf (jshelf wraps it).
4. **Plant care** (jpet model): care 0..100, −12 a tuần; servants tend by default (0 khắc for her), quality = 0.45 + lòng×0.006 ± traits (cap 1.1) → words vụng về / tạm được / khéo tay; withered (<35) → card "Chậu cây héo úa" (Tự tay chăm / Để người hầu lo); 3 tuần at 0 → "Chậu cây khô" (same piece, ledger kept). Her own care: "Tưới, tỉa lá" = water minigame (stop inside the band, 3 rounds, kitGameFrame + kgbtn), cost BAL.shelf.plant.khacSelf = 1 khắc (**OWNER QUESTION OPEN**: 0 = free). "Chăm sóc" list merges pets (→ petcOpen) and plants. Thử tay entry: `window.MG_CAL` {k:"chamcay"} (the calibration page should list MG_CAL).
5. **UI = KIT FIRST**: nothing drawn. KIT REQUESTS filed (dev/kit/KIT_REQUESTS.md 17/11 display-shelf): (1) left-rail icon "Nơi trưng bày", (2) painted shop-style shelf screen (her + NPC), (3) kit item size "shelf" = cut-out, no frame, (4) per-item cut-out art incl. withered plants → Foreman C. Data for the part: `shelfView(p)`. Interim (kit parts only: kitModal + kitRows + pbtn): item-panel act card "Trưng bày" and `shelfOpen(p)` — gated by `BAL.shelf.ui = 0` until KIT READY so she never meets a one-way door (display without a way to take down).

## Tests (dev/test/shelf-check.js — PASS) + gates
| check | result |
|---|---|
| lock | displayed entry leaves the chest; not sellable; ledger keeps it; same-group swap returns old piece; worn / non-décor refused; take-down returns it |
| xa xỉ table (sc → word) | rank 0 bud 36: 8 Đơn sơ · 58 Xa hoa · 198 Quá xa xỉ; rank 2 bud 116: 58 Hợp phẩm · 198 Quá xa xỉ; rank 4 bud 178: 198 Xa hoa; rank 7 bud 302: 198 Hợp phẩm |
| visitor effects | Quá xa xỉ room: superior thiện cảm −5 → −13; peer ghen 2 → 10; peer holds proof |
| mood | vui 34 "phòng ốc bày biện lộng lẫy" |
| accuse | visitor with proof → act open; rumour only → not open; false charge detected (accuser Danh −5); NPC→NPC open (rank 7 vs 5, Xa hoa) |
| plants (weekly care) | no servant: 68 56 44 32 20 8 0 0 dead…; loyal maid (90): 80 → 79 steady; lazy maid (10, Lười biếng): 71 61 52 42 33 23 14 4 |
| water game | in-band every round → score 1 |
| NPC visit timeline | e.g. `w0 b0 k0 v25→me@home`, `w0 b1 k2 v22→v28@r23`, `w0 b3 k0 v27→v24@r24` — every call lands at a palace |
| old save | people without p.shelf run the week + views: OK |
| perf | shelfWeek 0.5–0.9 ms (10 consorts); sightings once per buổi |
| one-core-guard / text / bind / text-rule | PASS (inline 3843 = baseline) |
| time-spill guard | PASS |
| QUICKCHECK --cpu 4 | 59456643 PASS; 8cf7cf0c PASS (open 1628 ms, old save ok, core gates PASS; perf new/live render 181/163, tab 312/259, buổi 869/724 ms — within run noise, live itself varied 832–1119) |

## Open / for the foreman
- OWNER QUESTION (open in OD (4)): khắc cost of her own plant care — BAL.shelf.plant.khacSelf (default 1; 0 = free). Servants' care never costs her a khắc.
- Item list: placeholder groups/items until dev/research/display-shelf-items.md lands; refill = edit BAL.shelf.groups / BAL.shelf.it (+ IT text block) only.
- jdress (Tố xa xỉ dress cause) is not assembled on main; when it lands, put it before jshelf.js in assemble.py.
- KIT READY needed for the 4 kit requests; then set BAL.shelf.ui = 1 and wire shelfView(p) into the part.
- Co-op: NPC shelves are world data (host); the guest's shelf is hers (S). Not separately probed beyond coop-one-world gate.
