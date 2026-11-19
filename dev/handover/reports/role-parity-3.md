# ROLE PARITY 3 report (B3, opus worker of Foreman B ROOT-2; branch review/role-parity-3)
PRIORITY #1 CHECK ('role-parity probe'): OD 0 | ledger 0 | claims 8 ('role-parity') | main 0 | review/* role-parity-r2 f458b20/e12a91c (base, PART1 FIX READY), role-parity-r3 not pushed yet (C-AG #3) | archive 0 — reused the r2 scan, worlds, KEYLAB, exempt and open tables; no game code written.
START_CTX ~3 % of 1M; finished well under START + 25 %.

## SẴN SÀNG KIỂM 3b48b305
Commits on review/role-parity-3 (base origin/review/role-parity-r2 e12a91c = f458b20 + main ddbf9c7):
b3ec84bd merge origin/main 1130a49e · 63d5c045 scan + open/exempt + test (OPEN_MAX) · 3b48b305 rebuilt root site.
Only dev/tools/role-parity-scan.js, role-parity-open.json, role-parity-exempt.json, dev/test/role-parity.test.js (+ root index.html/sw.js rebuild) — NO game code.

## 1. Scan changes (dev/tools/role-parity-scan.js — B3 is the only B editor)
| change | why (probe limit / mapping) | rows it closes |
|---|---|---|
| tabAll(f): every tab builder is walked over every sub-tab (KTSUB data-ktsub/data-ktsv) and every person page (PG data-pg/data-pi), two levels, state restored | Tài nghệ showed only «Tứ đức»; Cung nhân showed only person 0 | cx:study, cx3:staff* (with world staff) |
| item-detail menu: kitModal captured, kinvOpen(it) for every kinvItems() | Dùng / Bán / Nghiệm độc / Tặng / Tẩm live only in the per-item modal | cx3:sell, cx3:test, cx3:use, harm:gift (with world wares) |
| lab(): a button with data-learn / data-vlearn / data-kt53 (≠"none") is an act even if it also has data-mode; data-ktsv / kinvsub / kinvtab = navigation | «Tự học / Học với thầy» (data-mode) and kid card «Dạy chữ / Dạy lễ nghi» (data-kt53) were dropped | cx:study, cx3:teachD, cx3:teachV |
| SRCONLY {"cx3:facDiv": facHTML}: «Ly gián» = cx3:facDiv only on the Phe phái tab; elsewhere it is ACT harm:lygian | her deck card «Ly gián» was credited as cx3:facDiv (mapping) | cx3:facDiv |
| KEYLAB: cx3:teachV «Dạy chữ»; cx:gift «Tặng»; harm:taint «Tẩm»; ml:beat «Bắt quỳ, vả miệng»; ml:frame «Vu tội»; cx:study + «Học với Thái hậu», «Học lối mới với thầy» | button text not in the label tables | teachV; new labels the wider probe reads |
| NPC side: jagstaff asHitPick(v) read per world (ordinary and cruel consort) → ml:beat / ml:frame (SAMEPFX "ml:") | her «Bắt quỳ / Vu tội» on another palace's maid = the NPC's mlHit choice, not an AGREG option | the 2 new labels (would be P-ONLY t1–t7) |
| worlds (symmetric, restored by snapW/restoreW): wares (tonic while tired, gift-worthy item, sellable jewel while short of bạc, present from another consort), faction (rival faction of 3 the doer hates), disfavour (others' Hoàng hậu standing −50, bad relation, a vòng ngọc ≥ LO.minPr in every chest), staff (servants of low / very low loyalty, one in trouble this week); snap now also holds S.facs, hh, cutPay, staff loyal/trouble | NPC roads were gated by states the probe NPC never had | cx3:use/sell/test, harm:gift, cx3:facDiv, cx3:staffChe/Doi/Phat/Tam, hh:conf, hh:cutpay, harm:laydo/laydol (hh) |
Tried and REMOVED: an «away» world (others at the garden, roster lifted) closed hh cx2:chest but shifted C-AG's target-world families (pushp/tat/trip) and the promotion set → left to C-AG #3 (target-world code is theirs).

## 2. Rows closed (role-parity-open.json; keyed role|key|side) — 98
cx3:facDiv 9 · cx3:teachD 9 · cx3:teachV 9 · cx3:use 9 · cx:study 9 · harm:gift 9 · cx3:sell 8 · cx3:test 8 · cx3:staffChe 7 · cx3:staffDoi 7 · cx3:staffPhat 7 · cx3:talkGossip 2 (hh, up) · cx3:staffTam 1 (hh) · harm:laydo 1 · harm:laydol 1 · hh:conf 1 · hh:cutpay 1.
Of these, 7 are in the «up» column (teachD/V, study, facDiv, use, talkGossip, harm:gift): closed by the same probe fix, not by B4 work.
Alias (§4.2): harm:gift = cx:gift now holds on both sides (the NPC needed a gift-worthy item: world wares). cx3:def_* «up» = NOT a mapping fault — see §3 (real gap, household timing).

## 3. Real gaps found (listed for C-AG; NOT built) — added to the open list with a note
| row(s) | finding |
|---|---|
| t4 t5 t6 t7 hh · label «Cầm cố» P-ONLY (5) | her wardrobe pawn (j92 wdPawn via wdPawnUI) — no NPC ever pawns (no AG option); the NPC quiet sale is a flat monthly roll (j92:423 roll(20)), not a choice |
| up · cx3:def_canh/giuchung/theodoi/thudoc, cx3:staffHoi (already open), harm:taint (new, 1) P-ONLY | promotion household timing: the risen player gets her household at once (j42 srvRise: S.staff=[]; fillStaff(S,true)); a risen NPC (jagmaid amRise / j14 eye → newRival) has none until the monthly fillStaff(p,false) → no Phòng bị / Hỏi chuyện / Tẩm for her first month. One rule for both (fill at rise) closes the family. |
| (judgement, EXEMPTED with reason — C-AG may overrule) self-dress «Đeo / Tháo / Cài / Mặc / May áo» | NPC dresses via j92 wdNpcDress → wdAutoFor → wdApply (same wdApply as her «Tự chọn đồ»), monthly auto, not an AG option |
Other exemptions added: «Chức việc» (jstaff elder kit group tab, UI), «Hỏi thái y kiêng kỵ» / «Sai cung nữ dò la khẩu vị» (jrcp taste information, as the other information-only rows).

## 4. Rows added that are NOT B3's (main drift; test must pass) — 7
up · harm:accuse / banphe / expose / tieuhuy / trinhth / uyhiep N-ONLY, maid · maid:accuse P-ONLY: already present on the r2 tip after its main merge ddbf9c7 (my base scan, before any B3 change, shows them; role-parity.test would FAIL there). B4 column — each has a note in role-parity-open.json.
Not trimmed (other owners; the test lists them as «now closed»): up cx2:maidTalk, up cx:maidR, up harm:trinhhh, maid maid:poison, mediate t1–t7 (C-AG #3) — gone on main drift; the owner of each row trims it.

## 5. OPEN after B3: 65 rows (OPEN_MAX 150 → 65)
C-AG #3 target worlds: harm:pushp 6, harm:tat 4, harm:trip 2, follow 1, mediate 8 (7 stale) · rouge 3 (C-AG) · hh cx2:chest + up cx2:chest (day-plan draw: a palace is empty only when its owner's roster puts her elsewhere — needs the target-world setup; tried, see §1) · B4 maid column 16 + up column rest · real gaps §3 (Cầm cố 5, household timing 6).

## 6. Gates (on 63d5c045 / 3b48b305)
| gate | result |
|---|---|
| role-parity.test.js | ALL PASS (≤ 65 rows; no new gap; promotion exact both; riseCore same numbers; no page errors) |
| scan determinism | two runs (s3, s5) identical: 54 gaps |
| one-core-guard | PASS (inline 3988 < 4212) |
| ag-stf2 | ALL 23 PASS |
| deeds ratio / quickcheck / coop-e2e | not run: no game code changed (dev/tools + test only); root site rebuilt with build_site.sh |

## For B4 (review/role-parity-4b)
Send scan changes to B3 (session of this report). The wider probe (sub-tabs, person pages, item menu) also reads the maid/up columns: check your rows against role-parity-open.json on review/role-parity-3 before you start.

## UPDATE #2 — SẴN SÀNG KIỂM 03e9fe6b (open 111 → 20, OPEN_MAX 20)
Commits: 972f23ed merge origin/main 9a1d6922 (= role-parity r3 LIVE 40d05b76 + later main) + B4 scan diff · 03e9fe6b rebuilt root site.
- Merge: C-AG #3's target ladder and its own «staff» world are kept (B3's staff world dropped: staff* / laydo are C-AG's per the 22:53Z note); B3 worlds wares / faction / disfavour kept; snap adds facs / hh / cutPay.
- B4 (review/role-parity-4b, session_01N1tNP2gQKk2oaABEKk69p3) scan diff applied VERBATIM: KEYLAB maid:scout += «Tự đi dò la cho chủ»; MVAR maid-life worlds (maid phase only, mSnap/mRest); asNeeds for a maid's #real pass; the NPC promotion probe moved to the maid page right after her srvRise (one world for «up»). Exempt added: «Cúi đầu lui tránh» (maid, B4's proposal).
- Open list = exactly the 20 gaps the scan still sees (all other rows of main's 111 are closed on this branch — B4 need not trim): Cầm cố t4–t7+hh 5 (REAL, NPC never pawns) · up cx3:def_* 4 + cx3:staffHoi (REAL, risen-NPC household timing) · up cx3:tell, cx:buy (NEW from the one-world up probe, probe world — B4) · up cx:maidR · maid maid:beside / maid:errand (REAL per B4: beside unreachable for her unless her master is Hoàng hậu; errand has no NPC option) · rouge up/hh 3 · cx2:chest hh/up 2 (palace empty only by day-plan draw).
- Gates on 972f23ed: role-parity.test ALL PASS (≤ 20; promotion exact both; riseCore same numbers; no page errors) · one-core-guard PASS · ag-stf2 23/23. No game code.

## REVIEW r1 — reviewer (opus, session_01N1tNP6ibtJzXhZ3UwApdbH) 19/11 ~01:30Z: **READY FF bc79de0af23b8f1d9c4b762c6f214e92d9fa4794** (review/role-parity-3-r1)
PRIORITY #1 CHECK ('role-parity probe'): OD 0 | ledger 0 | claims 0 | main role-parity r3 LIVE 40d05b76 (OPEN_MAX 111) | review/* role-parity-3 03e9fe6b | archive 0 — reviewed the existing branch; no new work.
18 laws touched: law 1 (two-way: the subject of the scan), law 4 (one-core-guard PASS), law 11 (family fixes via scan worlds, not per-row), law 14 (open list overwritten, not duplicated). No UI/kit/wording/art touched.
r1 = 03e9fe6b + merge of newest origin/main bb8e8ec9 (main moved after 9a1d6922: +jagacts4.js / jnroadhp.js game code, so the scan was re-run on the merged build); sw.js/index.html conflict taken from main then root site rebuilt (build_site.sh; assets.json left as main).
| check | result |
|---|---|
| (1) closed rows are TRUE probes — sampled 21 keys / 98 rows across all families | PASS. cx3:use/sell/test: NPC roads jagacts3 p3UseIx/p3SellIx(bac < BAL sell.bacBelow 40)/p3TestIx(fee itTest 10) — world wares gives bạc 30, tonic, jewel, gift from another consort: the real gates. cx3:facDiv: p3FacFoe (faction ≥ 2 others, spite ≥ foeOan 25) — world faction oán 60; SRCONLY moves «Ly gián» off the deck card (that one is harm:lygian) = a mapping fix, not a hide. hh:conf/cutpay/judge: AGHHG gates (hh ≤ confHh + Trang sức item / rel < cutRelMax / evG + rel < 0) — world disfavour (vòng ngọc kd Trang sức). cx:study / teachD / teachV: real buttons with data-learn / data-kt53 the old SKIPA dropped. harm:gift = cx:gift alias, NPC needs a gift item (wares). ml:beat/frame: jagstaff asHitPick (cruel trait gate is the NPC's personality; the player's jmline buttons run the same mlHitDo). Maid column (accuse/ask/betray/books/empTea/follow/frame/gift/groom/med/rest/tellMis/tonic, harm:spyk): B4 MVAR worlds apply ONE mutation to the doer (S via srvM()/S.srv, NPC via ownerOf/self) and are undone (mSnap/mRest). «up» (accuse/banphe/expose/tieuhuy/trinhth/uyhiep/xinhh/hhShield/maidTalk/talkGossip): the NPC promotion probe now runs in the SAME maid-page world as hers — a truer comparison; it surfaced cx3:tell / cx:buy P-ONLY, which are LISTED open, not hidden. Every world is symmetric (applied to the doer, S or NPC). |
| no weakening | PASS. No check deleted; 4 new exempts are label-scoped with reasons («Chức việc» = jstaff elderGroups tab; jrcp taste info; self-dress; «Cúi đầu lui tránh» maid-only). Nit for C-AG: the self-dress reason cites wdNpcDress, but «May áo» (fabric → Sắc 3 months) is j8:437 monthly NPC auto-sew — NPC does it, but only at rk ≤ own rank, while she may sew «vượt phẩm»: a small law-1 asymmetry to add to C-AG's list. |
| (2) deterministic | PASS. role-parity.test on 03e9fe6b: 3 sequential runs ALL PASS, identical output (2 earlier PARALLEL runs died with «Target crashed» = 3 chromium at once on 4 CPU, not the scan). On r1 bc79de0a: 3 runs, scan lines identical (no new gap, no stale row) in all 3. |
| (3) OPEN_MAX 20 = real remaining gaps | PASS. 20 rows in role-parity-open.json; no «now closed» note in any run → all 20 still seen; OPEN_MAX = 20 exact. Real gaps listed for C-AG in §3 / UPDATE #2: Cầm cố t4–t7+hh (5), up cx3:def_* ×4 + staffHoi (risen-NPC household timing), maid:beside / maid:errand, hh/up cx2:chest, rouge ×3, up cx:maidR, up cx3:tell / cx:buy (probe world). Nit: only the 7 newest rows carry a "note" in the JSON; the other 13 are explained only in this report — C-AG should read §3 + UPDATE #2. Also Cầm cố shows only t4+ (t1–t3 / up hold no pawnable wardrobe in the probe): the C-AG family fix (NPC pawn road) must cover every rank. |
| (4) no game code | PASS. git diff --stat origin/main..bc79de0a: dev/tools/role-parity-{scan.js,open.json,exempt.json}, dev/test/role-parity.test.js (OPEN_MAX 111→20 only), root index.html / sw.js rebuild. |
| (5) one-core-guard / ag-stf2 | PASS (inline 3988 < 4212, fails 0) / ALL 23 PASS — on 03e9fe6b and on r1. |
| (6) descends newest origin/main | PASS after reviewer merge: bc79de0a ⊃ origin/main bb8e8ec9. |
FOLLOW-UP (not this branch; pre-existing on main, Foreman B test owner): role-parity.test riseCore block is UNSEEDED — run 3 on r1 failed «Sủng» once (NPC 29 vs 23) because riseCore reads amSung(m), not the m.sung the test sets; the scan lines were identical. Fix = seed that page or set the input amSung reads. Coordinator: re-run the test once if the riseCore line fails on landing.
