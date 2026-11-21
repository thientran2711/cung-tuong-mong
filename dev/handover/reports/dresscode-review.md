# dresscode — BIG REVIEW r1 (E30r, opus) of review/dresscode 459a91bf

E30r session_01DgYSWpTexpKL6eD2PDxGZS · depth 4 (limit 8) · START_CTX ~3 % of 1M · FOREMAN E #22 session_01DgYSWkbUPtieeBFfn8grWT.

PRIORITY #1 CHECK: 'dresscode|dress code|trái mùa|BAL.dc' → OD 0 | ledger 0 | claims 8 (E30 + this review) | main 0 | review/* 1 (review/dresscode 459a91bf) + review/kit-e-rows (kitColDot, PASS 7d0cc7a8 20:14Z, not on LIVE yet) | archive 0. Owner rule = PARKING_LOT rows 11 / 11b / 11c (11c overwrites 11b), read verbatim. Read: root44-common, START_CORE (18 laws), START_WORKER, START_REVIEWER, reports/dresscode.md, reports/dresscode-expert.md.

## VERDICT: FAIL 459a91bf (14 fixes below; E30 takes them)

Merge onto LIVE: review/dresscode-r6 b840116f = 459a91bf + origin/main 27a7dcf5 (only index.html / sw.js conflicted, rebuilt by build_site.sh). Pushed for E30 to reuse. LIVE has since moved to 794c6b77 (kit-e-rows: kitColDot LIVE) — E30 merges that with the fixes; dcDot then shows the kit dot by itself (check it in the shots).

## Gates run by the reviewer (on b840116f)
| gate | result |
|---|---|
| dresscode.test.js | ALL PASS (36) |
| one-core-guard | PASS (fails 0, inline 3776 ≤ baseline 3930) |
| role-parity ×2 | ALL PASS both runs |
| quickcheck (dev/tools/quickcheck.sh, alone) | PASS 414 s · core gates PASS · old save ok · perf new/live render 221/240, tab 459/429, buổi 1330/1233 ms |
| old save / save round trip | PASS (dresscode.test; quickcheck old save ok) |
| bot life seed 777, 110 tuần (≥ 2 years, 33 festivals) | runs, no page error — but shows faults 1, 3 (table below) |
| shots Fold 755x1000 + iPad 1180x820: item detail (worn trâm, worn robe, chest trâm, chest robe, robe slot), calendar popover, gate | looked at 3× each; kept local (/home/user/wt/e30r-shots, deleted with the verdict), never committed |

Bot life (her picks road 1 at every gate; NPC rows = consorts alive at that festival):
| festival (strict = gate) | NPCs | turned away | mocked (cut) | fit |
|---|---|---|---|---|
| Vạn thọ y1 (strict) | 10 | 6 | 4 | 0 |
| Thánh thọ y1 (strict) | 10 | 6 | 4 | 0 |
| Nguyên đán y2 / y3 / y4 (strict) | 10 / 9 / 14 | 7 / 7 / 12 | 3 / 2 / 2 | 0 |
| Vạn thọ y3 (strict) | 14 | 11 | 2 | 1 |
| Trùng cửu, Đông chí, Lạp bát, Giao thừa, Nguyên tiêu (all years) | 9–14 | 0 | 90–100 % | 0–1 |
| Thất tịch / Thanh minh / Vu Lan | 9–14 | 0 | 35–70 % | rest |
Her gates in that life: 9 of 9 had ONE road only («Cứ thế vào dự»); no borrow, no own trâm, no NPC ask ever came up.

## What is right (keep)
- BAL.dc is the one table (10 families, c01–c32 + m01–m52, every trâm / hoa điền, fabric → season, 13 codes, rank ladders); one-core guard clean; ladders rise with rank (law 5).
- jdc0 before j31: gate is queued before the festival events (checked on the real endTurn); «Cáo lỗi» removes them and fMake7 gives no mini-event.
- Contest cut goes through the ONE SC7 formula for every entrant; present7 drops a turned-away NPC; her mini-game talent (startContest talent = SC7.f(S)) carries the cut too.
- Borrowed piece is a real object: leaves the lender, worn, her own trâm kept (dcPrev), given back next tuần, survives save/load.
- Robe recolour (11c) is NOT wired and nothing half-wired shows (no mask, no picker); robe row says «theo tranh dáng người đang mặc».
- No private dot: dcDot feature-detects kitColDot; signature matches review/kit-e-rows (kitColDot(fam,{role,size})). Wear label «Trái mùa» = kit .kitl.kitl-no; calendar line uses the popover's own «<b>X:</b>» row form.
- Wording: no %, no «điểm»; odds chip comes from the kit.

## FIX LIST (numbered, for E30)
1. LAW 1 / 6b — NPCs never dress for a festival. dcNpcDress handles the season only; at a festival an NPC never puts on a fitting trâm from her own chest (her road «Cài trâm của mình») and never borrows from another consort. Bot life: 60–86 % of NPCs turned away at every strict festival, 90–100 % mocked at most others, every year, and every festival costs them Danh. Build the NPC side of the same roads (own trâm first; else borrow from a consort whose aff ≥ BAL.dc.bor.fav, piece moves and returns, same dcBorrow/dcReturn), then re-run a bot life and paste the before/after table.
2. LAW 2 — borrow is DOMINATED. For the same colour «Mượn … (1 khắc, lender thiện cảm −6)» is strictly worse than «Cài … của mình (1 khắc)» and both are offered together (seen in the test frame and my Fold/iPad gate shots). Offer borrow only for a needed colour she cannot cover from her own chest, or give borrowing its own gain; add the choice-value check (dev/tools/choice-value-scan.js style) to dresscode.test.
3. LAW 3 as she reads it + forced single road. On the gate card the borrow / own-trâm options read «TỐN 1 khắc · ĐƯỢC không» (Fold + iPad shots), while «Cứ thế vào dự» reads «chọn rồi xem kết quả ở bước sau». Give the two roads a visible gain hint (e.g. «đủ màu Đỏ cho lễ») per the hidden-outcome rule (HANDOVER L90: costs only, no long-term numbers). And when she is NOT turned away, also offer «Cáo lỗi, về cung nghỉ» (Sức +BAL.dc.stay.suc, festival missed) so the frame is a real choice — in the bot life 9/9 gates had one road.
4. LAW 2/3 — taboo on a robe colour she cannot change. Robe colour = her painting; every robe she owns shows the same colours and 11c recolour is not wired. So identities whose MAIN is trắng (c32, m14, m36, m44, m48) take the taboo +1 at Nguyên đán / Vạn thọ / Thánh thọ / Giao thừa for life, and đỏ-main identities (c01 c06 c21 c23–c27 m05 m46) at Thanh minh / Vu Lan, with no road out (iPad gate shot: «Màu Trắng là màu kiêng trong ngày này»). Until a robe colour can be changed (11c), the taboo must not count against the painted robe (her and NPCs alike), or must have a road.
5. Season gap at her own phẩm. Probe: P1 (Đáp ứng) and P3 (Quý nhân) have NO robe of their phẩm for Đông; Quý nhân pays BAL.dc.season Danh 1 + Thái hậu 1 every winter tuần with no in-phẩm road, while dcNpcDress lets an NPC take a P−1 robe. dresscode.test line 28 says «lower ranks pay no season cost where a gap exists» but the code charges anyway (the test checks only the pool, not the cost). Same rule for both: no season cost when no in-season robe exists at that phẩm (or the robes are added), and make the test check the cost.
6. LAW 1 — season change timing. In the endTurn where the season flips, NPCs are changed by dcNpcDress BEFORE the cost check, she is charged at once with no chance to change. Give her the same chance: a heads-up the tuần before (or the first tuần a warning frame without cost), NPC forgetters the same.
7. LAW 1 — NPC season cost lacks the Thái hậu part. Hers = Danh + th; NPCs pay Danh only although rivals carry v.th. Apply BAL.dc.season.th to NPCs too.
8. LAW 6c — a borrowed piece can be sold / given / pawned. wdSell (j92) and the Tặng / Cầm cố acts do not look at e.bor; with a trusted maid she can sell the lender's trâm for bạc and it never goes back. One guard in the shared item acts (like wdIsNt) for e.bor, for her AND NPC AI paths; and show the loan in the item detail (kit row «Mượn của <tên> · qua tuần sau trả»).
9. CO-OP — borrow on the guest seat duplicates the piece. dcLenders / dcBorrow / the NPC ask and dcReturn mutate NPC inventories (host-owned world) on the guest seat (worldOn() false); the host snapshot then restores the NPC copy while she still holds hers. Turn NPC borrow/lend off when !worldOn() (or route through the host acts like jcoopworld ASK) and cover it in a co-op check.
10. WORDING — head word doubled: «Lễ ${f.name}» gives «Lễ Tết Nguyên đán», «Lễ Lễ Vu Lan», «Lễ Tiết Đông chí», «Lễ Đêm Giao thừa» (gate facts), and «cho lễ Lễ Vu Lan» (NPC ask). Use f.name alone.
11. Contest rows do not show the cut. The dress cut is subtracted inside SC7.f, but rowsH7 «= N tài nghệ (Tài …, Thi …)» and the mini-game talent line (talentBy = det7) list only the arts, so the shown parts no longer add up. Add «− N y phục» in det7 (one place, both screens).
12. BLOCKING, needs MAIN kit keeper — the colour rows are not visible on the real tap path. On Fold, Tư trang → tap a worn or chest trâm / robe → the item dialog shows only the act cards; the DOM has no «>Màu<» at all (nor the older Xa xỉ / Lai lịch rows): the dialog that kinvOpen → wdOpen builds drops `.kinvrows` (pre-existing panel fault, not from this branch). Tap on the «Y phục» slot opens «Ô y phục» (robe picker) with no colour and no season either — and that is exactly where the «Áo trái mùa» frame sends her. Owner's words: «bấm vào cái ô y phục ở bên tư trang á, thì nó hiện ra thông tin của món đồ là nó cũng sẽ có hai màu». File KIT REQUEST (item dialog must show kitItemDetailRows) → MAIN; then add Màu + Hợp mùa to the robe picker rows; shots Fold + iPad of the real tap.
13. LAW 4 (small) — dcGateItem `.slice(0,2)` is a typed count; move it to BAL.dc.chg (max own pieces offered).
14. CANON — expert table §3 says «taboo robe at a strict festival = turned away»; code (and BAL comment) turn away only when none of the needed colours shows. Keep one version (write the chosen rule in both places).

## FOR MAIN (not a fail of this branch)
- Item dialog drops its rows (fix 12) — pre-existing kit fault; affects every item, not only colours.
- 11c: trâm borrowing stays although 11b (accessory-only) was overwritten by 11c; the trâm is not drawn on the figure (only the wear tile), so 11b's «screen must match» worry is only half met. Owner's 11c sample (Foreman C) still pending.
- kitColDot: review/kit-e-rows PASS 7d0cc7a8; once LIVE, the dots appear by themselves (no change here).

## Shots (local only, deleted with the verdict)
fold/ipad-gate (gate: options + «ĐƯỢC không»; iPad: taboo trắng), fold/ipad-cal (popover «Y phục: Đỏ, Vàng · kiêng áo Trắng, Đen · …» fits, no cut text), fold-tram / fold-robe / fold-cellA / fold-cellB / fold-slotY (no Màu row anywhere on the real tap). The «Trân phẩm» reveal over some shots came from my own test setup (a piece pushed into the chest), not from the branch.

## ROUND 2 (E30r2, opus, session_01DgYSWpFMntGUa2vqhwPDpr) — re-review of review/dresscode 94abcf83 · FOREMAN E #23 → #24
PRIORITY #1 CHECK ('dresscode|dress code|trái mùa|BAL.dc'): OD 0 | review/* review/dresscode 94abcf83 (+ r6 b840116f) | claims E30/E30b rows — re-review only; jcoopask H map reused, KIT §60.2 kitDressPicker (LIVE 24dd2c62) checked.

### VERDICT: PASS 8b46c3f0b1ab3545420833a522aad14579a280dd (review/dresscode-r2; FF on LIVE 24dd2c62) — rules part. Item 12 = open KIT dependency (MAIN kit keeper), not this branch.
Branch: review/dresscode-r2 = 94abcf83 + LIVE 463d3d70 (41a33d80; assemble = main's list + jdc0 before j31 + jdc after jcloth) + reviewer fix 69cb45dd + LIVE 24dd2c62 (8b46c3f0; only index.html/sw.js conflicted → rebuilt).

### r1 fixes — checked in code + tests
| # | r1 item | r2 state |
|---|---|---|
| 1 | NPCs never dress for a festival | DONE: dcNpcFest own trâm → borrow (aff ≥ fav, same dcBorrow/dcReturn) → buy; turned away by the same rule; mocked once (dcNpcSettle); E30 scan 13 → 0 turned away, fit 63 → 100 / 150 |
| 2 | borrow dominated | DONE: borrow/buy only for a colour her chest cannot cover; reviewer fix: borrow now shows its cost «kèm: thiện cảm −6» of the lender (kit pvQuy) and buy its gain «trâm giữ lại trong rương», so borrow no longer LOOKS cheaper than buy (law 2 as she reads it) |
| 3 | single road / «Được không» | DONE: «Cáo lỗi» on every gate, every road names its gain; reviewer fix (fix-the-group): the NPC ask frame had empty x on both answers → «Cho mượn»: tốn the piece till next tuần · thành thiện cảm; «Khéo từ chối»: thành keeps it; a lend that can no longer happen (piece put on meanwhile) logs a line instead of silently doing nothing |
| 4 | taboo on painted robe | DONE: BAL.dc.kyOn 0 until 11c; popover hides taboo words |
| 5 | season gap at her phẩm | DONE: dcSeasonRoad, same for NPCs; test checks the COST |
| 6 | season flip charged at once | DONE: first tuần = «Sang mùa mới» warning, no cost, NPCs alike |
| 7 | NPC cost lacks Thái hậu | DONE |
| 8 | borrowed piece sellable | DONE: guard on wdSell/wdPawn/sellItem/giveTo/plantItem (her + NPC AI), no acts, loan row «Mượn: của …» |
| 9 | co-op guest duplicates | DONE: guest side via jcoopask dcout/dcin, world-id keys (id:901/902), dcGot once-only return, NPC loops host-only |
| 10 | «Lễ Lễ» | DONE (scan over 13 codes) |
| 11 | contest rows hide cut | DONE: det7 «y phục −N» |
| 13 | typed slice(0,2) | DONE: BAL.dc.chg.max |
| 14 | canon taboo rule | DONE: expert §3 + BAL comment = turn away only when none of the colours |
| 12 | item dialog drops rows | OPEN KIT DEPENDENCY (below) |

Laws: 1 two-way (NPCs take her roads, ask her, she lends) ✓ · 2/3 (every option gain + cost visible, no dominated road) ✓ after reviewer fix · 4 one-core PASS · 5 ladders rise ✓ · 6c borrowed objects real, returned, never sold ✓ · 7 wording no %/điểm ✓ · 9 kit only (kit option cards, kitRows, kitColDot, popover row form; dresscode builds NO dress picker of its own — the season frame points to Tư trang → Ô y phục, so KIT §60.2 kitDressPicker has no dresscode caller to switch; grep jdc.js toil/Picker = 0).

### Item 12 on LIVE 24dd2c62 — still NOT fixed
Real tap (my probe, Fold 755x1000@2): Tư trang → tap the worn trâm cell → dialog shows only «Ta đang mặc.» + act card «Tháo trâm»; no .kinvrows, no «Màu», no «Hợp mùa». «Màu» (with kitColDot dots «Đỏ chính · Vàng phụ») and «Hợp mùa» ARE visible only in the kit item card (kitItemCard, KIT §70 — shop / reward / other item cells) and in the calendar popover line «Y phục: ● Đỏ, ● Vàng · …». So on the owner's own path (bấm ô y phục / món đồ trong Tư trang) the colours are NOT visible yet. Owner of the fix: MAIN kit keeper (wdOpen/kinvOpen dialog must use kitItemDetailRows). 11c robe recolour: still waits the owner (Foreman C sample); nothing half-wired.

### Gates
| gate | on 69cb45dd (LIVE 463d3d70) | on 8b46c3f0 (LIVE 24dd2c62) |
|---|---|---|
| dresscode.test.js | ALL PASS (+2 r2 checks) | ALL PASS |
| coop-dresscode.js (2 seats, LIVE Worker) | 33/33 ×2 | 33/33 |
| coop-e2e.js (CO-OP LAND GATE) | 68/68 | 68/68 |
| kit-dress-picker.js | — | PASS 19 |
| one-core-guard | PASS (fails 0, inline 3776 ≤ 3930) | (in quickcheck core gates) PASS |
| role-parity ×2 | ALL PASS both, logs byte-identical | — (no game-rule change since) |
| quickcheck (alone) | PASS 374 s, old save ok | PASS 375 s, old save ok, perf new/live render 184/209, tab 413/443, buổi 1080/1200 ms |
| shots Fold 755x1000@2 + iPad 1180x820@2 | gate (Cài / Sai người mua … / Cáo lỗi, kit cards, no cut text), trâm card with dots, calendar popover with dots, real-tap dialog (no rows = item 12) — looked at; local only (/home/user/wt/e30r2-scr, deleted with verdict), never committed |

LAND READY dresscode 8b46c3f0b1ab3545420833a522aad14579a280dd

## ROUND 3 (E30r3, opus BIG, session_01DgYSWon2yx2VxkSP87VchV, depth 6) — review of review/dresscode-land-fix ee44f91e · FOREMAN E #24 · 21/11
PRIORITY #1 CHECK ('dresscode|loan|dcout|dcin|mượn'): OD 16 | ledger 0 | claims 8 (E30b fixer idle) | main: no jdc.js; jts.js:378-381 Hội phối đồ borrow (tsB) LIVE = a SECOND loan rule | review/* dresscode, dresscode-land, dresscode-land-fix, dresscode-r2, dresscode-r6 | reused: loan book dcLent, jil ledger box/ids, jlost cases, jcoopask dcout/dcin.

### VERDICT: FAIL (1 big item for E30b) — every other fault found is FIXED on review/dresscode-fix-r3 (build on it, do not restart from ee44f91e)
Branch review/dresscode-fix-r3 = ee44f91e + LIVE 64d2e094 (051df34e: assemble = main's list + jdc0 before j31 + jdc after jcloth; jbal2 both blocks; index.html/sw.js rebuilt) + reviewer fixes b2bca670 · 33565dc3 · e038fca5 · 8e0cc773 (+ test commits 9f254f4c). Head: aa3c6854552061817924ac52a3dc58550278720e (+ LIVE 5569adb6 merged last: aa3c6854; contains LIVE).

#### FAIL item (big → E30b)
F1 (law 6c + law 14 + brief check 2 «one rule, one loan book»): jts.js Hội phối đồ «Mượn … để dự hội phối đồ» (LIVE) is a SECOND loan rule beside the dresscode loan book: own mark e.tsB, own return tsDressReturn, NO loan book, NO co-op path — on the guest it splices HER copy of the NPC's chest (the host never hears of it: the same piece shows on her and on the host's NPC for the contest) and puts it back into that copy (overwritten at the merge). Fix as one family: the contest borrow goes through dcBorrow / the loan book / dcout-dcin (its own return day = the contest's end), tsB becomes a reading of e.bor. Reviewer only stopped the two worst effects (below, fix 6); the unification is a feature change in a LIVE module → E30b.

#### Fixed by the reviewer (whole group, scan + before/after)
| # | fault (law) | found by | before | after |
|---|---|---|---|---|
| 1 | flag (3): her off-season cost charged ONCE A MONTH (S.dcSw=S.turn, turn = months; nothing at all in a season's first month after the warning) while every NPC pays EACH TUẦN (dcSeasonDue) — law 1, and the frame says «từ tuần sau … bị chê ở buổi thỉnh an»; owner 11/11c: she chooses each morning | code + scan | her −Danh 2 once a month | each tuần like NPCs (scan: 3 tuần → [2,2,2]; old code → [2,0,2] caught) |
| 2 | a BORROWED piece could be taken by jlost «thất lạc» (loLose picks by loOk, loLoseE targeted): the case held it while the book gave the lender her copy; case solved → two (6c) | dresscode-loan-scan (solo, reproduced 56 faults) | 2 copies | loOk / loLoseE refuse e.bor (same guard family as r2 sell/pawn/give/plant); scan «thất lạc» taken 0, 0 faults |
| 3 | co-op «dcout» took the NPC's FIRST piece of that kind, not the one the guest took; same-week race (another consort borrowed that very piece on the host) → stand-in or refusal, and her «dcin» return still pushed the piece back → one id twice (6c) | coop-dresscode-scan | dup | dcout takes only the same piece (ledger id, or the same un-numbered one); a refused loan id kept on the NPC (dcNo) → her return is a no-op |
| 4 | ONE LOAN CLOCK: dcWk used each seat's OWN S.turn (co-op never syncs it): a friend with an older life lends → the host keeps the piece until its clock catches up while she already took it back (two) (6c) | coop-dresscode-scan (B4: host still holding a returned trâm) | per-seat clocks | dcWk linear (turn*3+tuan); every hand-over carries the room week (cw), the receiver converts the due (dcDueIn); a «dcin» arriving after its tuần is not placed; the guest's lent pieces settled only by HER book |
| 5 | a lost case's piece (e.lo, jlost «giữ lại» = someone else's, kept) could be LENT (dcOwnFit): the case could not find it at its holder and wrote a 2nd copy to the ledger box; nor is it «của mình» to wear | coop-dresscode-scan (A3) | 2 copies | dcOwnFit skips e.lo |
| 6 | jts Hội phối đồ «Mượn»: the option captures the NPC's piece when the dialog is built; dresscode's NPC loop lends it away meanwhile; her tap STILL pushed the captured object (if(i>=0) guarded only the splice) → two; a contest-borrowed piece (tsB) could be lent on by the dress code | coop-dresscode-scan (A2/A3 kimthoa_phuong, 2 runs) | 2 copies | jts go: road gone → log «… đã không còn trong rương nàng.», nothing moves; dcOwnFit skips e.tsB |
| 7 | stale dcPrev: her own trâm put aside for a loan kept the mark after the borrowed one was swapped off / taken off → hidden from every road («Cài … của mình», lending) for good (law 2) | dresscode-loan-scan (282 marks / 80 tuần) | stuck marks | mark cleared on return + per-tuần heal (her; NPCs only on the world seat — the guest never writes her NPC copies, r4 lesson); 0 |
| 8 | her gate is built in endTurn, the NPC festival loans run right after (dcWeek) — when an NPC took the offered piece, «Mượn …» silently did nothing and she went in lacking the colour (r2 item 3 fixed it only for lending) | dresscode-loan-scan (12 offered → 3 taken) | silent no-op | log «X của Y đã có người mượn trước.» + the gate re-opens with the roads still there |

#### Checks (1)–(4)
(1) objects — NEW dev/test/dresscode-loan-scan.js (solo): every lent piece tagged at lend, counted in every chest / hair / robe / pawn / ledger box EVERY tuần, 108 tuần (3 bot years) real endTurn, disturbances: moved to a 3rd chest, confiscated (box), «thất lạc», pid change, taken off; plus a death tuần (loan each way) and an old "me:<pid>" key. Result: before the reviewer fixes 56 count faults (thất lạc) + 282 stale marks + her 1 borrow of 12 offered; after: ALL PASS 8/8 runs (150–330 loans each: her 15–40 · she lends 5–32 · NPC↔NPC 130–295; «thất lạc» taken 0) + on the gate sha. A mutation (dcTake no-op) is caught (72 faults).
NEW dev/test/coop-dresscode-scan.js (2 seats, LIVE Worker): same count over the host world + the guest's own S after each merged week, ≥ 72 weeks: first runs found fixes 3/4/5/6 (persistent dups B4, A3, A2, kimthoa ×2 runs); final run on 8e0cc773: 76/76 weeks both seats, loans on every road (host her 19 · lend 2 · NPC↔NPC 232 · guest her 4 · lend 17), both seats on one loan clock 0/76 differ, 10 one-week transients (relay in flight), 17 in-flight requests, 1 refused guest borrow; the only lasting count is P1 below (one jlost×Kỳ ngộ duplicate at week 6 whose extra box copy then lives on) + one scan false positive (her own trâm lost by «thất lạc» after it came home — scan rule fixed in 80269e52). COOP_SKEW=N (guest life clock ahead) is in the scan for E30b's rerun after F1.
(2) one rule / one book: git grep — the dresscode book is the only one in jdc (no co-op copy: host NPC book + guest S book, each its own seat); BUT jts tsBorrow is a second rule → F1.
(3) flag «season once per MONTH» = a fault (law 1 + her words: she chooses each morning) → fix 1, whole group (her key; tests that pinned S.dcSw).
(4) laws on changed lines: 1 ✓ (fix 1) · 2 ✓ (fix 7/8: no hidden / dead roads) · 3 ✓ · 4 ✓ one-core PASS, BAL.dc.bor.wait in BAL · 5 unchanged · 6c ✓ except F1 · 7 ✓ new words cổ trang, no % («đã có người mượn trước», «đã không còn trong rương nàng») · 9 ✓ no UI part made (log lines + the existing gate frame).

#### Found, OUTSIDE the loan code (pre-existing, for the jlost / Kỳ ngộ owner — FOR MAIN)
P1 (6c, co-op host): a piece in HER lost case (own "me", not on loan) found by Kỳ ngộ «giữ lại» (jky.js SPEC.item lc keep) is pushed to the finder while jlost loFind/loGoneOwner writes a «dead» copy to the ledger box (own "me") — 2–3 copies (S.il.log: [w,iu,"me","nvp","dead"] ×1–2 then ["lo3",finder,"kyngo: giữ lại"]). Seen 1–3× per 76-week co-op run; the co-op scan reports it apart («PRE-EXISTING outside the loan code»).
P2 (co-op latency, bounded): a guest borrow the host refuses (same-week race) leaves her a ghost of the piece until her next merge (askBack runs only on the week rebuild); the host world holds it once; the scan allows ≤ 3 weeks.

#### Gates on aa3c6854
| gate | result |
|---|---|
| dresscode.test.js | ALL PASS |
| dresscode-loans.js | ALL PASS (52/52 festival × path) |
| dresscode-loan-scan.js (NEW) | ALL PASS (108 tuần) |
| kit-dress-picker.js | PASS 19 |
| one-core-guard | PASS (fails 0) |
| coop-dresscode.js ×4 (LIVE Worker, Fold host + iPad guest) | 38/38 · 38/39 · 38/38 · 38/38 — the miss = harness wait «#next enabled» (seat «Chờ hảo hữu…»), every object check of that run passed (same timing class as E30b's 1/12) |
| coop-e2e.js (CO-OP LAND GATE) | 92/92 |
| role-parity.test.js ×2 | ALL PASS both (559 s / 557 s, run alone: an earlier run beside the co-op scan was killed for memory) |
| quickcheck (alone) | PASS · old save ok · perf new/live render 221/223, tab 408/441, buổi 1096/3693 ms · core gates PASS |
| coop-dresscode-scan.js (NEW, 76 weeks) | see (1): no lasting fault from the loan code; P1 outside it |

Shots: none needed (no UI part changed; two log lines + the existing gate frame re-opened).

FOR E30b (F1): build on review/dresscode-fix-r3 aa3c6854; after F1 rerun dresscode-loan-scan ×3, coop-dresscode-scan 76 weeks (COOP_DBG=1) + one run COOP_SKEW=24, coop-dresscode ×10, coop-e2e, role-parity ×2 (alone), quickcheck.

## ROUND 4 (E30r4, opus BIG, session_01DgYSWo5nZ3yPQ2hdAEtXFQ, depth 7) — re-review of review/dresscode-fix-r4 cabfcad8 (E30c F1 + E30d gates) · FOREMAN E #28 · 21/11
PRIORITY #1 CHECK ('dresscode|loan|dcBorrow|tsB|Hội phối đồ'): OD rows 11/11b/11c read | prior rounds reports/dresscode-review.md R1–R3, reports/dresscode.md «r5 (E30c)» + «r5 gates (E30d)» | main: no jdc; jts tsB LIVE (replaced here) | review/* dresscode-fix-r3 aa3c6854, dresscode-fix-r4 cabfcad8, coop-famops (E44) | claims E30c/E30d fixers, E44 famops.

### VERDICT: PASS → LAND READY dresscode 0620c318 (review/dresscode-r4-land)
Branch review/dresscode-r4-land = cabfcad8 + LIVE merges d03fa792 (LIVE ee02e8c0) · e4334244 (LIVE 99795d67) · 60659e65 (LIVE 270c6251, carries jlost-kyngo) — each: assemble.py = main's list + jdc0 before j31 + jdc after jcloth, index.html/sw.js rebuilt — + 0620c318 (test only: coop-dresscode-scan host trace + ledger-id follow). Game build of 0620c318 = 60659e65 (gated).
vs LIVE now 93704ee1: conflicts index.html/sw.js only; its build changes in touched files = wording (sgStat/sgOf in j92/jts) + co-op presence (jcoopworld refreshHere/presAll), no item op → self-merge.

### (1) F1 one loan rule — OK
git grep: no e.tsB / tsDressReturn mark left except the old-save migration dcMigTs (deser + dcTurn + tsDressReturn). jts «Mượn … để dự hội phối đồ» → dcBorrow(S,v,e,{due: contest tuần, why:"ts", chest:1, aff:false}); tsDressReturn → dcGiveBack (book, co-op «dcin», ledger when lender gone); jevb «Cho mượn» → dcBorrow(v,S,e,{why:"ev"}); stale dialogs move nothing (log). Guest: dcout carries dur so the host NPC book keeps the contest length; dcFree (one test) used by dcOwnFit / jts / jevb. Both seats: coop-dresscode step 6 (Hội phối đồ loan on BOTH seats, back at contest end) 48/48 ×9 of 10 + ×6/6 on the later shas; scans count «ts» loans on both seats (host 1 · guest 1 per run) with 0 loan faults.
### (2) ROUND 3 fixes — all present (diff aa3c6854..cabfcad8 = rewrites only): season per tuần (S.dcSw=dcWk), jlost loOk/loLoseE guard, dcout same piece + dcNo, dcWk linear + cw/dcDueIn, dcOwnFit via dcFree (bor/lo/dcPrev/h), jts stale-dialog guard, dcPrev heal, gate re-open «đã có người mượn trước».
### (3) Objects (law 6c)
dresscode-loan-scan 108 tuần: 3/3 PASS (d03f), 1 coverage-only miss + 2 PASS (e433: Hội phối đồ loans 2 < 3 wanted, objects 0 bad), 2/2 PASS (6065) — every run 0 bad, 181–293 loans incl. ts 2–6 and visit 13–33.
coop-dresscode-scan 76 w ×4 (+1 running): loan code 0 lasting. Every lasting count traced to a piece NOT on loan at that moment:
| run | seat | piece | trace | family |
|---|---|---|---|---|
| d03f DBG | guest | her own trâm (loan over w1) | lost by thất lạc w12, gone with its case w25 | co-op guest × jlost case (E44 family, E30d run 4) |
| d03f SKEW | host | NPC1 trâm, home 7 w after loan | untraced then (no host hook) | = j8 giveTo, see last row |
| e433 SKEW+DBG | guest | B1 own trâm / B3 own trâm (home from loans) | B1 2nd copy pushed by famApply←resApply←onRes; B3 spliced by famApply | E44 «ret» / «rm» |
| 6065 DBG | guest | B3 / B1 own trâm | famApply «rm» / famApply «ret» push | E44 |
| 6065 DBG | host | NPC1 trâm, home 3 w | untraced then | = giveTo, see next row |
| 6065 DBG + NEW host trace | host | NPC1 trâm home since tuần 43 | tuần 63 out by j8 giveTo (gift road): it rebuilds the piece as {k,from,iu} — the scan's tag was not carried → false vanish (or given up to Hoàng thượng / Thái hậu); scan now follows iu (0620c318) | NOT dresscode (gift road); FOR MAIN: giveTo to emp/th ends a piece with no ledger line (law 6c question for the item owner) |
| 6065 DBG | guest | B1 (after the famApply dup) | loans in between are moves (lent 73, home by her book 74, hair→chest by «Mượn» 75); a 3rd copy appears at the w75 merge with no push | E44 merge × item ops |
Clocks 0/76 differ every run. Transients 3–21 (relay in flight). SKEW=24 runs: loans on every road both seats.
### (4) Laws on changed lines
1 ✓ she borrows (gate, Hội phối đồ) ↔ NPCs borrow hers (ask, visit), NPC↔NPC · 2/3 ✓ every loan option: goodwill cost + real gain; «Cho mượn» visit now really costs the piece one tuần · 4 ✓ one-core PASS (BAL.cv.tsBorrow.aff replaces literal 25) · 6c ✓ (above) · 7 ✓ new lines cổ trang, no % («đã không còn trong rương ngươi; … về tay không», «… không còn chủ để trả, đã nộp về Nội vụ phủ.») · 9 ✓ loan row via kitRows/kitItemDetailRows, no new UI part.
### Gates (final game build 60659e65; also green on d03fa792 and e4334244)
| gate | d03fa792 | e4334244 | 60659e65 |
|---|---|---|---|
| dresscode.test / dresscode-loans / dresscode-ts-loan | PASS ×3 | PASS ×3 | PASS ×3 |
| kit-dress-picker / one-core-guard | 19 / PASS | 19 / PASS | 19 / PASS |
| kyngo-unit / kyngo-eq / lost-items (Fold) / lost-one-home-scan | — | — | PASS / PASS / ok / PASS |
| coop-dresscode | 9×48/48 + 1×48/49 (harness «#next enabled» wait, every object check passed) | 3×48/48 | 3×48/48 |
| coop-e2e | 94/94 | 94/94 | 124/124 |
| role-parity ×2 (alone) | ALL PASS ×2 | ALL PASS ×2 | ALL PASS ×2 |
| quickcheck + old save | PASS | PASS | PASS (render 261/247 tab 433/440 buổi 1101/1283) |
Shots: none (no UI part changed).
### FOR E44 (coop-famops): rerun coop-dresscode-scan COOP_DBG=1 after the famApply fix — the B1/B3 rows above must go to 0. FOR MAIN: j8 giveTo «dâng lên Hoàng thượng / Thái hậu» ends a piece with no ledger line (6c owner question, not dresscode).
FOR MAIN CHÍNH 97 session_01Rc5AsLuG71zn8SX9tkLTWk: LAND READY dresscode 0620c318 (review/dresscode-r4-land; FF on LIVE 270c6251; vs LIVE 93704ee1 index.html/sw.js only → self-merge; coop-e2e 124/124; both-seat coop-dresscode 48/48 ×15 of 16 + 1 harness wait).
