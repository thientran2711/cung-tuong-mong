PRIORITY #1 CHECK ('world window|worldWin|quốc tang|quocTang|tuần du|đại xá'): OD 1 | ledger 0 | claims 0 | main 15 | review/* 0  (+ research dev/research/world-events.md 12bca8a2; OD L1587 13:15Z, L1593 13:48Z; AG-ALL worker session_01UV1SzjsTYMFvr4Rvhpd1tt on review/ag-all)

# WORLD EVENTS — build all 11 + window layer (opus, core system)
Coordinator: Foreman C-AG session_01UV1Szh1sUAVP6FUuqZgkYs (report also to MAIN s31 session_01UV1SzhZw2hHEAf6bi644Jn). Branch review/world-events from origin/main. No PR, never push main.
Read in full: dev/rules/START_CORE.md + START_WORKER.md; dev/OWNER_DECISIONS.md lines 1587 and 1593 (owner VERBATIM — binding as written); dev/research/world-events.md (whole file); briefs/ag-all.md (sibling job: NPC agents, day plan).
Owner (OD L1587, verbatim part): "lâu lâu mình vẫn có thể cho những cái sự kiện bốc thăm vào, Nhưng mà những cái sự kiện này phải là những sự kiện có thật ở trong game, và khi nó xảy ra là nó thực sự tác động tới tất cả mọi người ở trong game."

## Job
1. WORLD WINDOW layer first (research §3 common spec + §4 step 1): one shared world record {k,t0,t1,scope,cause} (co-op world key), one reader worldWin(k) consulted by EXISTING gates (thị tẩm/jvisit, stroll, banquets/FEST, stipend, j92 dress, maid/eunuch duties, Dư đồ '!' AD_HAP_FIRE), start from a REAL cause (calendar / T.kho / T.bien / real death / real birth), end by itself. No pure dice event.
2. Then ALL 11 events of research §3 in its §4 order (Quốc tang → Emperor away (tế lễ/thu săn, tuần du/thân chinh) → tuyển tú → disaster chain hỏa hoạn/lụt-hạn/ôn dịch → sứ đoàn, vạn thọ, thiên tượng, đại xá). REUSE every listed existing content (j55 monthly roll kept, jtsb fire chain, j67/jrd arcs, j7 comet, j92 tang dress, v.confined, KC.ty) — never rebuild. Second-batch events from the research expert (dev/research/world-events-2.md, coming) are added after these, same layer.
3. Effects apply to EVERYONE the same way as to her (player + every NPC group); two-way: NPC agents may cause and always react. NPC reaction hook = per-window weight table that the AG-ALL day plan reads (export e.g. worldPlanW(group) → act/place weights); coordinate the interface with the AG-ALL worker by send_message (session_01UV1SzjsTYMFvr4Rvhpd1tt) — one interface, no second planner.
4. ONE CORE: every rate/length/effect in BAL (new BAL.world block). Bot-measure frequency over ≥30 game years (events/yr per k, overlap, no 'perpetual disaster' — research §5) and put the table in the report.
5. Player-visible words per VANPHONG (cổ trang, no %, odds ladder). No new UI: existing kit only; missing part → KIT REQUEST, stop that part.
6. Old saves load. LUẬT SỬA CẢ NHÓM: audit all world-ish player-only events (research §5) in one pass.
Report: dev/handover/reports/world-events.md (handover branch). QUICKCHECK before "SẴN SÀNG KIỂM <sha>" → send_message Foreman C-AG. BIG opus reviewer after.
ROLLOVER (verbatim): Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
English in files; never message the owner.
