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
