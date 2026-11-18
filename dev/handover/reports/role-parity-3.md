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
