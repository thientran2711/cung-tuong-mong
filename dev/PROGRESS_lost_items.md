# PROGRESS — review/lost-items (đồ thất lạc & minh oan)

Owner 15/11 00:25Z: theft/framing approved as PURE GAME RULES (fresh worker). Built abstract: an item only "thất lạc" and may later "được tìm thấy"; nothing says how.

## Base
- Branch from origin/review/items-earned (3ae3ddbc). New module dev/build/jlost.js, added to assemble.py after jearn.js (before j84).
- j92.js (GIÁ HỌA) extended, not duplicated: wdFrameResolve / PEND.wdframe take an optional OWNER field on the chest entry (`e.lo` = case id, `e.gh` = owner who raises it, `e.by` = real culprit or none). Helpers wdFrameIx / wdFrameCulprit / wdFrameEv / wdFrameTake. Giá họa behaves exactly as before (culprit = accuser, evidence = evG).

## Rules (knobs: LO in jlost.js)
- Thất lạc: monthly LO.rate 6% per consort with a valuable item (price ≥ 30, in the chest, not worn, not ngự tứ/veil/evidence), cooldown 6 months, one open case per owner. Same for her and every NPC.
- Hidden cause: rival (40% when some rival has motive band ≥ nặng AND j95 motiveOK(v,t,"plant") when present) · servant's slip (20%, 45% with a careless "nhat" servant) · just misplaced.
- Tìm thấy after 2–7 weeks: back home (mis 55 / srv 15 / riv 0%), another palace (20 / 65 / 75%), else never. Rival: hidden in the chest of someone the rival dislikes, then a tip makes it known (1–3 weeks). Mis/srv: lands openly; an honest NPC holder hands it in, another keeps and may wear it.
- Owner learns where it is (tip, tra xét, recognition) → asks quietly (NPC: if fond of holder or 40%; her: "Đòi lại êm thấm" act) or raises it at Cung Chính ti → hearing in 1–2 weeks = j92 verdict. Holder cleared: item back to owner, the rival culprit (if any) Danh -10 + punished; not cleared: holder Danh -10, Sủng -5, punished; item back either way.
- Tra xét acts (Tư trang › Đồ thất lạc + person card group "Đồ thất lạc"), full price + odds, same functions for NPCs: Hỏi cung nhân (1 khắc), Báo Cung Chính ti (1 khắc, Bạc 20), Đối chiếu sổ Nội vụ phủ (1 khắc, Bạc 10), Soát rương (= j8 inspect "data-inv=inspect", 2 khắc). Each success: +1 evidence (rival cause → evA on the rival; else the case counter cev), may reveal where the item is / whose it is. Evidence counts ×10 in the clear odds for the wrongly suspected holder; in her hearing dialog "Trình chứng cứ minh oan" spends one.
- Nhận ra: monthly, a missing item worn in public: owner 15%, owner's friends 4%, her 8% if she heard of the loss → clue.
- Her holder side (open item): Đối chiếu sổ (learn owner), Trả về chủ (thân +4), Nộp Nội vụ phủ (Danh +1). NPC owner asks her: event "loask" (costs only): Trả lại / Nói không thấy (→ hearing).
- Soát rương (any inspect, NPCs 20%/month) finds a hidden missing item → back to owner, trail to the rival (same 40+mat·6 roll as j8).
- Notices: Đồ thất lạc / Tìm thấy đồ thất lạc / Đồ lạ trong rương / Cung Chính ti xét xử / Tra xét; Sổ ghi lines for each step; NPC losses go through newsAdd.
- Save: S.lost[] + S.loSeq; old saves simply have none (nothing to migrate).

## Merge for shots (coordinator 15/11)
- Merged origin/review/page-curl (fold-layout + book UI) so shots are on the approved layout. assemble.py = this branch's order + jbook (after j79) + jk3, jk4 (after j98); j80 left out (review/balance's j76 replaced it: both declare SUC_FLOOR). sw.js taken from page-curl; dev/review/LOG.md from page-curl (nothing of ours lost).

## Tests (scratchpad lost/: srv.py, t1.js flow, freq.js bot; dev/measure/uismoke.js)
- t1.js flow on the merged build, Fold 686x880@2.2 and iPad 1180x820@2: her item lost → notice; turns up in another palace → found notice; Tư trang › Đồ thất lạc act cards; Hỏi cung nhân result card; person card tab "Đồ thất lạc 5/5"; Báo Cung Chính ti thu hồi → hearing → item back; an NPC's item hidden in her chest by a rival → owner asks (event, costs only) → raises → she tra xét (+1 evidence) → hearing dialog (j92 PEND.wdframe with owner field) → Trình chứng cứ → cleared, rival punished. No page errors, no failed requests, no horizontal overflow. Shots: dev/shots/lost-items/ (18).
- Old save (old build of this branch's base) loads in the new build at 755x1000@2 and 1180x820@2, 12 buổi played, no page errors, no overflow (uismoke).
- Bot frequency (freq.js, endTurn stepping, random dialog choices), 96-month life, rate 8: player 7 cases (0.88/yr, months 26–96), NPCs 105 (13/yr over ~13 consorts ≈ 1 per consort-year); causes mis 87 / srv 20 / riv 5 (rival only when motive band and gate allow); outcomes home 46, handed in 11, returned via verdict/ask 7, never found 34; 5 hearings; 14 location discoveries. → rate lowered to 6 to center the player on ~1.5 years (re-measure below).

## Open
- The modal draws each <p> as a bullet row (kit), so the item picture sits on a bullet line like the veil notices (jveil does the same).
- A returned item that was originally a rival's gift keeps its .from, so j93 may show the "Hộp gấm" animation again when it comes back (cosmetic).
