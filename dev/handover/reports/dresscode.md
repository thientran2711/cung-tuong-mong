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
