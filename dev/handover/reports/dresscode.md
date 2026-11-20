# dresscode — PARKING #11 SEASON + COLOUR DRESS CODE (worker E30, opus)

PICKUP 20/11 ~19:40Z: E30 session_01DgYSWnviLqLryPXMXj3CnP · depth 2 (limit 8) · START_CTX ~3 % of 1M (roll at ~28 %, ceiling 60 %) · branch review/dresscode from origin/main 983a9436 · coordinator FOREMAN E #20 session_01DgYSWktqRepcrRpV9LRJV2.

PRIORITY #1 CHECK: see dresscode-expert.md header (nothing built yet; WD_LIST one colour word per piece, FEST/MCAL, j71 SC7, jhd hoa điền, Foreman C palette c01–c32 + m01–m52 reused).

## Status
- STEP 0 expert pass: reports/dresscode-expert.md (done).
- 20/11 ~19:55Z orders read: E #21 (11b accessories-only) then E #22: PARKING_LOT 11c OVERWRITES 11b — robe borrow = masked code recolour of HER figure, wired ONLY after the owner approves Foreman C's sample. So this branch builds the season + colour rules; robe borrowing / recolour is NOT built. The trâm borrow stays (an accessory, BAL.dc.bor.sl, one switch); when 11c lands, a borrowed ROBE = dcRobe() reading the recolour family of her figure (one place to change).
- kitColDot KIT READY on review/kit-e-rows dd2e0fe1 (FAIL only for an unrelated word map) → NOT merged into this branch on purpose (keeps review/dresscode independent of a failed branch); dcDot() feature-detects kitColDot, so the dots appear by themselves once the kit branch lands.
- KIT REQUEST kitColDot filed (dev/kit/KIT_REQUESTS.md, 20/11 dresscode) → MAIN. Until KIT READY the rows print family names; `dcDot()` switches to the kit dot automatically.

## What is built (branch review/dresscode)
Files: dev/build/jbal2.js (BAL.dc — every number/table), dev/build/jdc0.js (endTurn hook placed BEFORE j31 so the gate is queued ahead of the festival events), dev/build/jdc.js (feature), dev/build/assemble.py (2 modules), dev/test/dresscode.test.js, site build (index.html / sw.js / assets.json).
1. COLOUR FAMILIES: 10 (Hồng Cam Đỏ Vàng Lục Lam Tím Trắng Đen Nâu), hex per family. Every shade of Foreman C's palette mapped (hồng phấn / hồng đào / peach → Hồng, silver / ivory / cream → Trắng, gold → Vàng, teal → Lam, celadon / mint / jade → Lục, plum / lilac → Tím, apricot / sand → Cam).
2. ROBE COLOURS = THE PAINTING (owner 11b: screen = rule). Identity from S.pid / v.fid → BAL.dc.who [main, secondary]: c01–c32 from handover dev/art/t8-prompt-B/build.py DATA, m01–m52 from dev/art/face-common/m_colours_proposed.json (FINAL Lượt 603), look1–4 from jobs.json. t7 → secondary gold, t8 → gold first, lãnh cung → undyed linen (trắng). No identity → the robe's j92 colour word (fallback).
3. ACCESSORIES: trâm (worn slot, shown in the wear tiles) and today's hoa điền on the face (jhd hdShown) count with their MAIN colour; BAL.dc.piece = [main, sec] for all 20 trâm + 8 hoa điền.
4. ITEM CARD (Tư trang, wdItemRowsE → every wdOpen panel): rows "Màu" (main · secondary) and for a robe "Hợp mùa" + Ghi chú "màu áo là màu trên tranh dáng người của ngươi · <fabric>". Same kitRows grid (kitRowsJoin).
5. SEASON FIT: robe fabric → seasons (vải / cát phục / triều phục all year, lụa Xuân·Hạ·Thu, sa / the Hạ, gấm Xuân·Thu·Đông, lông thú Đông). Off-season tuần: Danh −[0,0,1,1,2,2,3,3] and Thái hậu goodwill −[0,0,1,1,1,2,2,2] by rank (law 5) + event frame "Áo trái mùa" (OD:L473) + wear-row label "Trái mùa" (kit .kitl). NPCs (worldOn only): change into an in-season robe from their own chest, else the court issues one (src cap); the robe taken off stays in their chest (law 6c); npcMiss 15 % forget and pay the same cost (law 1).
6. FESTIVAL CODE (13 festivals, expert table): need 2 colours, taboo robe colours, strict = Nguyên đán / Vạn thọ / Thánh thọ. needN by rank: Đáp ứng–Quý nhân 1, Tần+ 2 (law 5). Missing (+1 for a taboo robe) → Danh −cut.danh[rank] each and phần −cut.phan[rank] each in the festival contests, through the ONE contest formula j71 SC7 for every entrant (her and NPCs, law 1). Strict + none of the colours → turned away: present7 false (NPC and her), her festival events are taken out of Q, fMake7 gives her no festival mini-event.
7. GATE FRAME (her, before the festival events): facts (needed colours, what she shows, taboo, turned away / missing) + roads of equal value (law 2): Mượn trâm của <consort who likes her ≥ fav 20> (1 khắc, lender's goodwill −6) · Cài trâm của mình (1 khắc) · Cứ thế vào dự (cut) · Cáo lỗi, về cung nghỉ (turned away: Sức +8, events missed). Only costs shown in options (HANDOVER L90).
8. BORROW = REAL OBJECTS (law 6c): the piece leaves the lender's chest, is worn by the borrower (her own trâm kept in her chest, flagged), and goes back at the next tuần (dcReturn, logged). Two-way: a consort who likes her and lacks a colour asks to borrow her trâm (Cho mượn → her goodwill +5; Khéo từ chối → nothing). Hoa điền borrowing is OFF (BAL.dc.bor.sl = ["tram"]): a borrowed hoa điền could not be drawn on her face without a placing step.
9. CALENDAR (jmcal popover): "Y phục: Đỏ, Vàng · kiêng áo Trắng, Đen · không có màu nào hợp lễ thì bị chặn ngoài cửa".
10. CO-OP / SAVES: her gate / season / borrow run on her own seat (personal S keys dcF dcSw dcAk dcNk); NPC loops only where worldOn(); contest cut is a pure function of shared state (same on both seats). Old saves: all lazy (test: save without the fields loads and plays; borrowed piece survives ser/deser).

## FOR MAIN / Foreman C (gaps, not built)
- KIT: `kitColDot` (above).
- ART (Foreman C): robe colour VARIETY needs paintings — today every robe she owns shows her one painting per rank, so all her robes read the same colours. When colour/season outfit variants exist, `dcRobe` reads the variant's palette. The 4-season outfit plan is still open (owner Lượt 1252), so season fit reads the FABRIC of the piece, not the picture.
- 11c recolour (Foreman C sample → owner → E wires): robe borrow + screen = rule for robes.
- ART (Foreman C): trâm are not drawn on the standing figure (only the wear tiles under the portrait show them) — ROOT-79 11b wants borrowable accessories as separate layers (trâm, khăn choàng, quạt, đai / túi thơm). When layers exist, add them to BAL.dc.bor.sl.
- Palette source: BAL.dc.who is a copy of Foreman C's handover files (game cannot read the handover branch). If C changes a palette, update BAL.dc.who.
- CDN upload: 401 on this account → shots stay in /home/user/wt/e30-shots (not uploaded).
- Parking (law 18, not built): "đụng màu" with a superior at a gathering.

## Gates (head 459a91bf94870fb83e3d764d59d4b7272225da9d, review/dresscode)
- node dev/test/dresscode.test.js dev/index.html: ALL PASS (36 checks; 6 runs in a row after the test was made deterministic).
- one-core-guard: PASS (fails 0; the first draft's [0,1,2,3] season table was caught and moved to letters "xhtd").
- role-parity.test.js ×2: 10/10 ok both runs (no new gap, open list 18).
- quickcheck.sh: PASS (383 s; old save ok; perf new/live render 232/239 ms, tab 416/438, buổi 1083/1110; CORE GATES PASS incl. rules-one-source, kit-conform, coop-one-world).
- Co-op: coop-one-world via quickcheck G5 PASS; no co-op module touched (personal S keys; NPC loops behind worldOn()).
- Shots Fold 755x1000@2 + iPad 1180x820@2 (looked at each): gate frame, trâm card (Màu row), robe card (Màu + Hợp mùa), "Áo trái mùa" frame, calendar popover. Kept in /home/user/wt/e30-shots (CDN upload 401 on this account, not uploaded). Seen and noted: a sure event option shows the kit's "Nắm chắc" chip and "Được: không" (existing kit behaviour of event choices, not changed here); the robe card says Lục/Tím while the robe ICON may be pink — the art gap above (colour = her painting).

SẴN SÀNG KIỂM dresscode 459a91bf94870fb83e3d764d59d4b7272225da9d

## r2 — review r1 fixes (E30r FAIL 459a91bf, dresscode-review.md) · branch review/dresscode from review/dresscode-r6 b840116f + LIVE 794c6b77
| # | review item | before | after (code) | test |
|---|---|---|---|---|
| 1 | NPCs never dress for a festival | NPCs only had a season change | dcNpcFest: own trâm of a missing colour → borrow from a consort who likes her (aff ≥ fav, same dcBorrow/dcReturn) → buy at Nội vụ phủ (Bạc); mocked after the festival (dcNpcSettle, once) | dresscode.test fix 1 ×2 + buy road; dresscode-npc-scan.js table below |
| 2 | borrow dominated by own trâm | both offered for the same colour | borrow / buy offered only for a needed colour her chest cannot cover; own pieces first, one per colour (BAL.dc.chg.max) | fix 2 check |
| 3 | one road only; «Được không» | 9/9 gates had one road | every gate offers «Cáo lỗi, về cung nghỉ»; new road «Sai người mua … ở Nội vụ phủ» (Bạc, same for NPCs); every option names what it gives («thành: có màu Đỏ cho lễ», «vào dự lễ như đang mặc», «về cung nghỉ, không dự lễ»), costs only (HANDOVER L90) | fix 3 check |
| 4 | taboo on the painted robe | +1 missing for life for trắng/đỏ-main identities | BAL.dc.kyOn = 0 until 11c recolour; popover hides the taboo words while off | fix 4 + popover check |
| 5 | season cost with no robe of her phẩm | Quý nhân paid every winter | dcSeasonRoad: cost only if a robe of the season exists at her phẩm (court pool) or she owns one at/under it; same for NPCs | fix 5 check |
| 6 | season flip charged at once | she paid in the flip tuần | first tuần of a season = «Sang mùa mới» warning frame, no cost; NPC forgetters the same | fix 6 check |
| 7 | NPC season cost no Thái hậu part | Danh only | Danh + th by rank, same table | fix 7 check |
| 8 | borrowed piece sellable | wdSell / wdPawn / giveTo / sellItem / plantItem took it | one guard (e.bor) on all five (her + NPC AI), no acts on a borrowed piece, item detail row «Mượn: của … · qua tuần sau trả» | fix 8 check |
| 9 | co-op guest duplicates | guest mutated NPC inventories | dcLenders / NPC ask / NPC-held returns only where worldOn() | fix 9 check (worldOn false) |
| 10 | «Lễ Lễ Vu Lan» | «Lễ ${f.name}» | f.name alone (also «cho ${f.name}») | fix 10 scan over all 13 codes |
| 11 | contest rows hide the cut | det7 listed arts only | det7 adds «y phục −N» (rowsH7 + mini-game talent line, one place) | fix 11 check |
| 12 | item dialog drops rows | — | KIT fault → FOREMAN E #22 filed it to MAIN (not hand-fixed, per order); rows live in kitItemDetailRows (KIT §70) + wdItemRowsE | — |
| 13 | typed .slice(0,2) | typed | BAL.dc.chg.max | one-core PASS |
| 14 | canon taboo rule | expert §3 ≠ code | expert §3 + BAL comment: turn away ONLY when none of the colours; taboo off until 11c | — |

NPC scan (dev/test/dresscode-npc-scan.js, seed 777, 2 years of real endTurn; before = as they stand before the festival tuần, after = after their roads):
| festival | year | strict | NPCs | turned away before → after | mocked before → after | fit before → after |
|---|---|---|---|---|---|---|
| Tết Đoan ngọ | 1 |  | 10 | 0 → 0 | 8 → 5 | 2 → 5 |
| Tết Thất tịch | 1 |  | 10 | 0 → 0 | 6 → 3 | 4 → 7 |
| Lễ Vu Lan | 1 |  | 10 | 0 → 0 | 6 → 4 | 4 → 6 |
| Thánh thọ Thái hậu | 1 | yes | 9 | 9 → 0 | 0 → 4 | 0 → 5 |
| Tiết Đông chí | 1 |  | 9 | 0 → 0 | 8 → 8 | 1 → 1 |
| Tiết Thanh minh | 2 |  | 9 | 0 → 0 | 6 → 3 | 3 → 6 |
| Tết Đoan ngọ | 2 |  | 9 | 0 → 0 | 4 → 2 | 5 → 7 |
| Tết Thất tịch | 2 |  | 9 | 0 → 0 | 4 → 2 | 5 → 7 |
| Lễ Vu Lan | 2 |  | 9 | 0 → 0 | 3 → 0 | 6 → 9 |
| Tết Trung thu | 2 |  | 9 | 0 → 0 | 5 → 2 | 4 → 7 |
| Tiết Vạn thọ | 2 | yes | 9 | 4 → 0 | 2 → 2 | 3 → 7 |
| Tết Trùng cửu | 2 |  | 9 | 0 → 0 | 2 → 2 | 7 → 7 |
| Tiết Đông chí | 2 |  | 9 | 0 → 0 | 8 → 7 | 1 → 2 |
| Lễ Lạp bát | 2 |  | 10 | 0 → 0 | 7 → 2 | 3 → 8 |
| Đêm Giao thừa | 2 |  | 10 | 0 → 0 | 3 → 2 | 7 → 8 |
| Tết Nguyên đán | 3 | yes | 10 | 0 → 0 | 2 → 2 | 8 → 8 |
TOTAL 16 festivals · NPC-days 150 · turned away 13 → 0 · fit 63 → 100 · page errors 0

## HANDOVER (E30 → successor, 20/11 ~21:40Z) — context 51 % of 1M (roll point passed). Coordinator (FOREMAN E #23 session_01DgYSWm5qy3Y59fKkn6eSf7) opens the successor.
State: review/dresscode = f971ff4f (pushed) = r6 b840116f + LIVE 794c6b77 + r1 fixes 1–11,13,14 (+ buy road). dresscode.test ALL PASS ×4, one-core PASS; role-parity ×2 + quickcheck were RUNNING on f971ff4f in /home/user/wt/e30-dc (logs /home/user/wt/e30-scr/rp2.log rp3.log qc2.log; may be lost with this container — rerun).
TODO for the successor (in order):
1. Merge LIVE 548dcd0d (origin/main) into review/dresscode; on index.html/sw.js conflict take theirs, then `python3 dev/build/assemble.py && bash dev/site/build_site.sh`, commit index.html sw.js assets.json.
2. NEW LAND GATE (owner via MAIN 21:35Z, E #23): coop-e2e PASS (dev/test/coop-e2e.js) + a dresscode co-op check where BOTH seats see/do it, two-way: guest borrow/lend + festival gate on both seats. Today jdc.js turns NPC lending/borrowing OFF on the guest (dcWorld() = worldOn(); review r1 fix 9) because guest changes to NPC inventories are lost/duplicated at the week merge. To make the guest do it: route through jcoopask.js (guest → host requests, PROTOCOL §4.1): add request kinds to its H map, e.g. `dcout` {from:npcId,k} = host removes that piece from the NPC chest (guest already holds it in her personal S), `dcin` {to:npcId,e,wear} = host puts a lent piece on the NPC (prev trâm → chest, dcPrev); returns: each seat does its own side (guest adds/removes in her S; host removes/adds on the NPC by the bor.from key). Her lender key on the guest must be the world id of her friend entry ("id:"+GP 902 / her pid), not "me:…", so the host can resolve it. Guest collects requests in jcoopask `collect()` (S.coopAsk) or pushes explicit entries the same way. Then let dcLenders / NPC ask / dcReturn run on the guest through those requests; add a co-op test (2 pages, host+guest, as coop-e2e) proving: guest gate shows the same roads, guest borrow → NPC loses the piece on BOTH seats after the merge, piece returns next tuần on both, NPC asks the guest, festival gate fires on both seats.
3. Rerun gates: dresscode.test, one-core-guard, role-parity ×2, coop-e2e + the new co-op check, quickcheck (alone; the box OOM-kills parallel browsers). Shots Fold 755x1000@2 + iPad 1180x820@2 of the gate (new roads incl. «Sai người mua … ở Nội vụ phủ», «Cáo lỗi» always there) + an item detail with the LIVE kitColDot dots: script dev/test/dresscode-shots.js (copied from my scratch, NOT committed yet — commit it or keep local; it stubs kitReward/kitGain and waits for the «TRANH NGƯỜI» loader). CDN upload 401 → shots local only.
4. Then SSK to FOREMAN E #23 → E30r re-reviews.
Notes: item 12 (item dialog drops rows) is a KIT fault, filed to MAIN by E #22 — do not hand-fix. 11c recolour / robe borrow: not built (waits owner on C's sample). kitColDot LIVE (dcDot uses it). NPC scan table above (fit 63 → 100 of 150 NPC-days, turned away 13 → 0 with the buy road).
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- Trigger = context: at START_CTX % + 25 % of the window, NEVER above 60 % (hard ceiling): write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too; the COORDINATOR opens the successor.
LINEAGE (owner 17/11): your first STATUS/HANDOVER line states "depth <get_session lineage.depth>"; open workers as your children; ALWAYS roll over by opening your own child (create_session) at EVERY depth the system allows, up to the limit (8) — never stop early; ONLY when create_session is refused (limit reached or any error) write the handover + send "TAKE OVER NOW" to your line's standby (or a FOR MAIN line if none). Every takeover prompt copies this line.

## r3 — E30b (session_01DgYSWoKR63FnqBVfM37DPu, successor of E30) · FOREMAN E #23 · 20/11 ~22:50Z
PRIORITY #1 CHECK: 'dresscode|dress code|trái mùa|BAL.dc' → OD 0 | claims 8 (E30 rows) | review/dresscode 7438275b, review/dresscode-r6 b840116f — continued E30's branch, nothing new. jcoopask H map reused (no new transport).
Head: review/dresscode 94abcf8366eefe9e3270f57711d9cff93dc9b72f.
1. Merge LIVE origin/main 548dcd0d (b967adc3): only assemble.py (module list: LIVE list + jdc0 before j31 + jdc after jcloth) and index.html/sw.js (rebuilt) conflicted.
2. CO-OP LAND GATE — guest borrow / lend (94abcf83 + fix): her side moves on her seat; the NPC side goes to the host through jcoopask (PROTOCOL §4.1). jcoopask: `CW.askH=H` (other modules add kinds) + `CW.askBack[kind]` (guest settle hook). jdc: kinds `dcout` {from npc, pk} (host takes the piece out of the NPC chest, or off her hair if she put it on that week; refused → guest puts her own trâm back + log line) and `dcin` {to npc, e, wear} (host puts the piece in the NPC chest, worn for a loan TO the NPC, her own trâm kept as dcPrev; deduped by loan id). Requests are also relayed at once (same week when the host has not ended). A player's loan key = her world id ("id:901"/"id:902", jcoopworld me()), old "me:" keys still mean her; a piece lent by the OTHER seat's player is never pushed on this seat (dcOther), she takes it back on hers, once (S.dcGot loan ids). NPC loops (season dress, dcNpcFest, mocking) stay host-only (worldOn). Thin rooms (dev flag level >= 3): guest NPC borrow/lend stays off (not the default room).
3. Gates on 94abcf83:
| gate | result |
|---|---|
| dresscode.test.js | ALL PASS (fix-9 check renamed: "no world, no request path") |
| coop-dresscode.js (NEW, 2 seats vs LIVE Worker, Fold host + iPad guest) | 33/33 ×2 runs: gate on both seats with «Cáo lỗi»; guest borrows → host NPC loses it same week (relay) → both seats after merge, loan row «Mượn của …»; next tuần back to NPC, one copy each seat; NPC asks the GUEST (real dcWeek frame) → «Cho mượn» → host NPC wears it (bor.from id:902) → back to her ONCE, NPC has none on either seat; guest never ran the NPC loop; 0 page errors |
| coop-e2e.js | 68/68 PASS |
| one-core-guard | PASS (fails 0, inline 3776 ≤ 3930) |
| role-parity.test.js ×2 | ALL PASS both |
| quickcheck.sh (bash, alone) | PASS 431 s · core gates PASS · old save ok · perf new/live render 224/226, tab 443/398, buổi 1189/1132 ms |
| shots Fold 755x1000@2 + iPad 1180x820@2 (dresscode-shots.js) | looked at: gate (roads «Cài … của mình», «Sai người mua … ở Nội vụ phủ», «Cứ thế vào dự», «Cáo lỗi» always), trâm card with LIVE kitColDot dots «Đỏ chính · Vàng phụ», robe card, season frame, calendar. Local only (/home/user/wt/e30b-scr, CDN 401). The script's tap-path note «no kinvrows» = review item 12 (KIT fault, with MAIN), unchanged. |
Not built (unchanged): item 12 (KIT, MAIN kit keeper), 11c robe recolour (waits owner OK on Foreman C sample).

SẴN SÀNG KIỂM dresscode 94abcf8366eefe9e3270f57711d9cff93dc9b72f
