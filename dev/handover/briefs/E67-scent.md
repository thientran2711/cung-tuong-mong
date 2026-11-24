# E67 — PARKING #10 HƯƠNG RIÊNG (signature scent) — expert first, then build (opus BIG)
PRIORITY #1 CHECK ('hương riêng' / 'scent'): OD 1 | ledger 0 | claims 1 (= parking audit) | main 0 for hương riêng (only generic hương/độc strings: j70.js:46 «Trộn hương độc vào lò trầm» is a different case; j91 hương jars = mini-game) | review/* 0 | archive 0. Source: reports/parking-audit.md row 10.
Read first: dev/handover/briefs/E-common.md (Foreman E = session_01DgYSWm2Gu8SUSJpayKmy6E). OWNER (verbatim): dev/PARKING_LOT.md row 10 (20/11 ~06:35Z): "Mùi hương riêng phần 5 hợp lý nè, đưa vào bãi đổ." + the idea text: each consort picks a signature scent (trầm, lan, quế, mai); the Emperor likes some; others can tell who just visited; a servant can poison the incense. Build order: OD 24/11 ~05:20Z «cứ lôi ra làm tiếp».
STEP 1 EXPERT (OD:L1327; short section in reports/scent.md): history (Qing/Ming palace incense and perfume, sachets, 香囊, what was forbidden, poison incense cases) and dramas (Chân Hoàn: Hoan nghi hương / musk, Diên Hi…) → which mechanics fit. Keep it tight; no new systems beyond the owner's idea.
STEP 2 BUILD on review/scent from the latest origin/main (git grep first; REUSE existing systems: items/ITEMS.md for scent goods, tai mắt/news for the "who visited" tell, j70 poison methods, Emperor likes/dislikes, NPC agents):
- every person (her + NPC consorts) has a real scent: picked or inherited, stored, and traceable (law 6c);
- the Emperor's liked/disliked scents give gain AND loss (laws 2/3; equal-value choices);
- others smell who just visited → a tell through tai mắt (law 6a: real evidence, it can frame her and it can fail);
- a servant can poison the incense, as a two-way method (law 1: she can do it too, and NPCs can do it to her);
- every number in BAL (law 4); harder with rank where it is a trial (law 5); VANPHONG cổ trang words; info shown with KIT parts only (missing part → KIT_REQUESTS.md + FOR MAIN line; scent icons → Foreman C order via FOR MAIN).
TESTS: unit for each mechanic + two-way parity, quickcheck + old save, role-parity ×2, coop-e2e if co-op touches it, Fold 755x1000 + iPad 1180x820 shots (look at them).
DONE: «SẴN SÀNG KIỂM scent <sha>» to Foreman E + a FOREMAN_E_STATUS line; report reports/scent.md.
