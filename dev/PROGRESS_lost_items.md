# PROGRESS — review/lost-items (đồ thất lạc & minh oan)

Owner 15/11 00:25Z: theft/framing approved as PURE GAME RULES (fresh worker). Built abstract: an item only "thất lạc" and may later "được tìm thấy"; nothing says how.

## Base
- Branch from origin/review/items-earned (3ae3ddbc). New module dev/build/jlost.js, added to assemble.py after jearn.js (before j84).
- j92.js (GIÁ HỌA) extended, not duplicated: wdFrameResolve / PEND.wdframe take an optional OWNER field on the chest entry (`e.lo` = case id, `e.gh` = owner who raises it, `e.by` = real culprit or none). Helpers wdFrameIx / wdFrameCulprit / wdFrameEv / wdFrameTake. Giá họa behaves exactly as before (culprit = accuser, evidence = evG).

## Rules (knobs: LO in jlost.js)
- Thất lạc: monthly LO.rate 8% per consort with a valuable item (price ≥ 30, in the chest, not worn, not ngự tứ/veil/evidence), cooldown 6 months, one open case per owner. Same for her and every NPC.
- Hidden cause: rival (40% when some rival has motive band ≥ nặng AND j95 motiveOK(v,t,"plant") when present) · servant's slip (20%, 45% with a careless "nhat" servant) · just misplaced.
- Tìm thấy after 2–7 weeks: back home (mis 55 / srv 15 / riv 0%), another palace (20 / 65 / 75%), else never. Rival: hidden in the chest of someone the rival dislikes, then a tip makes it known (1–3 weeks). Mis/srv: lands openly; an honest NPC holder hands it in, another keeps and may wear it.
- Owner learns where it is (tip, tra xét, recognition) → asks quietly (NPC: if fond of holder or 40%; her: "Đòi lại êm thấm" act) or raises it at Cung Chính ti → hearing in 1–2 weeks = j92 verdict. Holder cleared: item back to owner, the rival culprit (if any) Danh -10 + punished; not cleared: holder Danh -10, Sủng -5, punished; item back either way.
- Tra xét acts (Tư trang › Đồ thất lạc + person card group "Đồ thất lạc"), full price + odds, same functions for NPCs: Hỏi cung nhân (1 khắc), Báo Cung Chính ti (1 khắc, Bạc 20), Đối chiếu sổ Nội vụ phủ (1 khắc, Bạc 10), Soát rương (= j8 inspect "data-inv=inspect", 2 khắc). Each success: +1 evidence (rival cause → evA on the rival; else the case counter cev), may reveal where the item is / whose it is. Evidence counts ×10 in the clear odds for the wrongly suspected holder; in her hearing dialog "Trình chứng cứ minh oan" spends one.
- Nhận ra: monthly, a missing item worn in public: owner 15%, owner's friends 4%, her 8% if she heard of the loss → clue.
- Her holder side (open item): Đối chiếu sổ (learn owner), Trả về chủ (thân +4), Nộp Nội vụ phủ (Danh +1). NPC owner asks her: event "loask" (costs only): Trả lại / Nói không thấy (→ hearing).
- Soát rương (any inspect, NPCs 20%/month) finds a hidden missing item → back to owner, trail to the rival (same 40+mat·6 roll as j8).
- Notices: Đồ thất lạc / Tìm thấy đồ thất lạc / Đồ lạ trong rương / Cung Chính ti xét xử / Tra xét; Sổ ghi lines for each step; NPC losses go through newsAdd.
- Save: S.lost[] + S.loSeq; old saves simply have none (nothing to migrate).

## Tests (scratchpad lost/: srv.py port 18473, t1.js flow, freq.js bot)
- see bottom (filled in as they run)

## Open
