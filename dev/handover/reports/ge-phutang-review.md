# ge-phutang REVIEW (E35br, opus, BIG) — PASS-on-stack b3ec184358fe6118ff95ca99bffaebd8a808b109
PRIORITY #1 CHECK ('ge-phutang|jgedata_pt|geOrig'): OD 0 | ledger 0 | claims E35b row (SSK fa820b35) | main 0 (463d3d70 has no geOrig / jgedata_pt) | review/* review/ge-phutang only (stacked on phutang-road c50ef1ba + ge-rank c5ebab9a) | archive 0. Reused: ge-guard / ge-engine / ge-rank-scan / ge-pt-scan / ge-bd-scan / ge-map / ge-shots / coop-e2e, nothing rebuilt.
depth 6 (get_session lineage). ★ 18 LAWS read first; touched: 1, 2, 3, 4, 5, 6abc, 7, 8, 11, 12, 13, 14.

Verdict: **PASS b3ec1843 on the stack** (review/ge-phutang-r6 = fa820b35 + 2 reviewer fixes). NOT LAND READY yet: phutang-road and ge-rank are not on LIVE (main 463d3d70). Final merge = when both are LIVE: merge origin/main into review/ge-phutang-r6 (trial merge today: only assemble.py / index.html / sw.js conflict — take main's assemble list + jgedata_pt.js after jgedata_bd.js, rebuild), rerun gates below on the merged sha → LAND READY.

## Reviewer fixes (pushed on review/ge-phutang-r6)
1. 7490f33d — pt_su_4 «Điều cần» (cw) said «cần gan dạ» but the gate is tamco+danh → «cần tâm cơ đủ sâu và tiếng thơm…» (law 6a: the card must tell her the real need). Family scan (all 305 stat terms of the 176 endings, cw vs cond): every other miss of the keyword scan is a true paraphrase (sủng = «Hoàng thượng thương/tin», tâm cơ = «khôn»); this was the only wrong one.
2. b3ec1843 — dev/test/ge-map.js had typed 10 identities / 40 branches / 160·320·80; with geOrig the pf tab now appears (correct), so ge-map FAILED 12/92 on fa820b35. Now reads the sizes from the data (identities with roads via geOrig, GE_CAT, BAL.ge.n) → GE-MAP PASS. (E35b's report did not run ge-map.)

## Checks
- Engine fix geOrig(b)=ARC67[b].o: whole family clean — 0 `split("_")[0]` GE reads left in dev/build (only geOrig's own fallback); tests ge-engine / ge-guard use geOrig, road-full reads ARC67 o. ge-guard identity check: all 44 branches = their ARC67 o + a GE_ID key.
- Law 4: 16 endings' gate/fail/rw rows in jbalge.js only; no number typed in jgedata_pt.js; one-core-guard PASS.
- Law 2/3: rw shared by both shadings (same size, sign of attitude only); per-branch shapes = pilot / bd shapes (stay = rank 1 + danh 30 + side + rel 8; exits no rank, bạc 300 on pt_hai_4 / pt_tang_4 like bd_san_4); every fail has a loss row; every ending has a gain.
- Law 5: BAL.ge.odds.rank, ge-rank-scan PASS 176/176.
- Law 6b checked against the road books: Ô Cửu only pt_dang_2 (cond .10 win = pfMove cang; fo .10 mid = pfKill); Trí Viễn never killed, only sea move = PFSAIL (.11 win) → pt_tang_2 fo .11 win, pt_tang_4 cond .11 win; .6 lose leaves him at the port but .7 cast brings him back to kinh, so «ở lại chùa Pháp Vân» holds. Kim Hựu Thành named as the guild's name-holder, no place claimed (he moves kinh↔cang). One road per life (ARC67 premise) so pt_hai's Ô Cửu death cannot cross into a pt_dang life. 6c: ge-pt-scan 85 hits, 0 faults.
- Law 7: no digit / % / {token} in narration (ge-guard, dump read in full); cổ trang; odds via the ladder («Nắm chắc» seen in shots).
- Law 8: matches reports/foreign-princess-3-history.md §B/§C.3 (kentōshi losses, Ngũ Đảo route, Nan Ba, Minh Châu, Giám Chân shape, Tân La traders, Thị bạc ty, Hồng Lư tự); no «Thiên hoàng», no Wokou / thập nhị đơn.
- Law 1: each ending has thiện + ác shading by her own lean; in co-op each seat owns its branch (coop-e2e below); NPC GE stays off as in every wave (BAL.ge.npc.on false, OD:L1243).
- Law 14: GRAND_ENDINGS.md §1.2 / §2.13b / §3 pf fixed in place.

## Gates (this box, review/ge-phutang-r6)
| gate | result |
|---|---|
| ge-guard | 10/10 (44 branches, 176 grand, ERRORS 0) |
| ge-engine - all | 1460/1460 |
| ge-rank-scan | PASS 0 faults |
| ge-pt-scan | 85 hits, 0 faults |
| ge-bd-scan | 34 hits, exit 0 |
| ge-map | PASS (was 12 FAIL on fa820b35, fixed) |
| one-core-guard | PASS |
| coop-e2e COOP_GE=1 (live Worker, Fold host / iPad guest) | 78/78 — Fold on pt_hai opens its own branch + Hồi kết nhánh, iPad's untouched; swapped iPad on pt_dang, Fold untouched |
| quickcheck (b-1 sha 7490f33d tree) | QUICKCHECK PASS · core gates PASS · old save ok · render 174/187, tab 438/421, buổi 1166/1025, tasks>200ms 18/18 |
| ge-shots pt_su / pf, 755x1000@2 + 1180x820@2 | 34/34; looked 3×: Đại kết cục «Sứ giả hai trời» card (kit modal, Danh +30 · Đức +10, rank Quý nhân → Tần, Nắm chắc) and Sơ đồ nhánh (pf tab «Công chúa hòa thân · Phù Tang 0/16» now present, no overflow) both devices. Shots local only (CDN 401). |
Note (not this branch): on Fold the floating «Hoàng hậu → ta: thiện cảm +8» toast sits over the bottom of the modal card for a moment — same on every GE wave (engine toast), not a ge-phutang fault.
