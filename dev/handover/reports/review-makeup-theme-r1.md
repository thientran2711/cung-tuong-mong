# review/makeup-theme-r1 — PASS 471de81f

PRIORITY #1 CHECK ('Diêm dúa|Kiều diễm|Khuynh thành|makeup-theme|jmkt'): OD 25 | ledger 1 | claims B makeup-theme session_01N1tNP2LT2KVhpghZdmGafo | main 15 | review/* makeup-theme (this); toil-looks / toil-looks2 / toil-overlay(-r2) / toil-reveal-fix / toil-react(-r1) / toil-room-art render branches (not on main).

Reviewer: session_01N1tNP2HWAjTouMuEtM1ysQ (opus, BIG). START_CTX ~4 % (1 M window); ended ~15 %.
Reviewed review/makeup-theme @ 3a54ec94 (base main 6c4f21c3). Verdict sha 471de81f = 3a54ec94 + 1 reviewer fix; descends from current origin/main 6c4f21c3 (re-fetched at verdict time) → fast-forward ready.
Read: START_CORE + START_WORKER + START_REVIEWER, REVIEWER.txt, brief makeup-theme.md, OD 1514–1516, 1537, 1542, 1546, 1548, 1550–1554 verbatim, FOREMAN_B_STATUS 03:33Z/03:35Z/03:38Z/05:09Z, worker report, KIT.md + VANPHONG.md parts touched.

## Reviewer fix (on r1)
1. SEASON BUG (player-visible, discovery path wrong): jmkt `tsMkSeason` called months 4–9 "xuân" and 10–3 "thu", against the game calendar (j1 `SEASON`: 1–3 Xuân, 4–6 Hạ, 7–9 Thu, 10–12 Đông). A contest in month 2 told her "mùa thu", month 8 "mùa xuân". Fixed: `tsMkSeason(m)` = `SEASON[m-1]`; `BAL.toil.taste.season` = {Xuân: w, Hạ: w, Thu: c, Đông: c}; the notice prints the real season ("mùa hạ" in the month-4 shot). Bot numbers unchanged (it measures months 4 and 10: same tones as before).

## Checks
1. NAMES — one source `TOIL_MK` (+ `toilMkW`, `TOIL_STY`); scan of dev/build/j*.js: no level printed outside jtoil/jmkt (jne = comment only); no 'sắc lạnh/sắc ấm' anywhere visible (preset rows, toilPreName, mirror text: test noTone/swNoTone ok); no old level names as level labels (remaining hits = NPC dialogue adjectives "vụng về", "vừa phải" and code comments). Kiều diễm = dep (positive, big occasions require it), Diêm dúa = overdone, judged "phô trương" only. VANPHONG §1 table + KIT.md note match the code. PASS.
2. RULES vs owner lines — hidden want per đề (BAL.toil.taste.theme) + per occasion (underOcc F≥2 wants ≥ Kiều diễm, not for frugal/jealous hosts) + rank (allowRk); found only via ma ma / Tai mắt / hỏi người / past contests / season (miss teaches nothing). ONE reaction system: toilFx wrapped, surprise goes through toilReact; no second popup system. Two-way: rivals know the want by Tâm cơ/Tài/Đức/Tai mắt/traits (hash, no Math.random), hosts judge NPC faces with the same table. Numbers all in BAL; one-core-guard 0 fails, baseline 6691 = main (not grown). PASS.
   Bot re-run by me (dev/measure/makeup-theme-bot.js, 500 × 10 đề·month): skilled+scouted 3.61 · skilled only 1.10 · scouted only 2.26 · random 0.49 · bare face −4. Skilled+scouted > random on all 10 đề·month (weakest: Hương sắc month 4, 0.75 vs −0.62). Weight: makeup add −4..+8 vs dress theme tags ≈ 29 and luxury fit ≈ 11 of the 40 dress points (+ Sắc/5, Tâm cơ/12) → comparable to luxury, well under the theme; decides close places, does not dominate. Rival knows the want 18 % (low stats) → 85 % (top).
3. KIT FIRST — every new piece uses existing parts: notice row via tsRows, roads via tsOpt (kit option card + odds ladder word, no %), mirror note in the existing `.past` line of toilColUI, known taste as a why-row on the existing meeting card, surprise via toilReact popup, Hoàng thượng row via LIKES/LIKEN ("Điều ngài thích"). Diff adds no class/style/CSS beyond existing ones. Consistency: option cards look the same as the borrow options of the same panel. PASS.
4. Old save (test oldSave ok: no mkKnow / likes.mk / known.mk, old ids → chip "dung nhan Khuynh thành"); quickcheck PASS (open 1402 ms, old save from live ok, perf ≈ live, CORE GATES PASS: one-core-guard · rules-one-source · kit-conform · coop-one-world); coop-e2e 60/60; dev/test/makeup-theme.js 12/12 at 755x1000@2 and 1180x820@2, 0 page errors. Co-op: want = BAL + đề + month, tastes = hash of names, rivals hashed → both seats compute the same value; friend judged by her own sitting record.
   Shots looked at (scratch only, deleted): mkt-755x1000-1-notice, -2-sit, -3-taste; mkt-1180x820-1-notice, -2b-sitres. No overflow, no cut text; preset rows show names only; result card "Dung nhan Mặt mộc".
5. TRIAL MERGE with main's toil-* branches (none on main). Chain: toil-reveal-fix ⊂ toil-overlay ⊂ toil-looks ⊂ toil-overlay-r2 ⊂ toil-looks2.
   - toil-reveal-fix, toil-overlay(-r2), toil-looks: only generated files conflict (index.html, sw.js, assets.json → rebuild). No source conflict.
   - toil-looks2 (55889159): SOURCE conflict in dev/build/jtoil.js, 3 hunks: TOIL_MK/TOIL_HK (l.38), toilFinish good/log (l.440), TOIL_HINT/toilPreName (l.850). Plus SILENT conflicts (auto-merged, wrong): looks2 drops `tuyet` (owner 04:44Z ladder, OVERWRITTEN by owner 04:54Z FINAL 6 results OD:L1550/1553/1554): BAL.toil.tier [40,65], toilTier, react tables, ghenTuyet, toilCrowd, emp-like. With looks2 on top, "Khuynh thành" can never happen and jmkt pts.lv.tuyet / jne toil.tuyet go dead.
   - Landing order for main: makeup-theme-r1 first (or after toil-overlay-r2 — either way only a rebuild). toil-looks2 must NOT land as is: its worker must restore `tuyet` (6 levels, TUYỆT redrawn luminous per OD:L1550) and take TOIL_MK/TOIL_HINT/toilPreName from makeup-theme.
   - toil-react, toil-react-r1, toil-room-art: 968–1536 commits behind main (stale; jtoilr is already on main) — main to close them.
6. Merges cleanly on latest origin/main (6c4f21c3 is an ancestor of 471de81f).

## Minor (not blocking, for Foreman B)
- Scout road option cards have no picture (empty frame, same as the existing borrow options): picture request → Foreman C.
- Contest-day dressing board how-text still lists the roads ("hỏi ma ma…") although they can only be taken at the notice; and the notice text names "hỏi ma ma" even when she has no ma ma (the road is then absent).
- Pre-existing (not this branch): tsOpt prints "Chắc chắn" for sure options (VANPHONG forbids "Chắc chắn"); Hội phối đồ NPC DRESS uses Math.random (makeup part is hashed).

## Open owner question (not blocking)
- Name of the bold preset group "Kiểu cầu kỳ" (worker took the owner's own word, 03:38Z "cầu kỳ chứ không phải là diêm dúa").
