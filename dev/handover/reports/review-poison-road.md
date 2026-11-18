PRIORITY #1 CHECK ('poison|đầu độc|Thử độc'): OD 27 | ledger 7 (D8 PARTIAL) | claims 5 | main 15 | review/* 2 | archive 56

# REVIEW — D8 poison road (review/poison-road @4ce4cbfa) — BIG review (opus), reviewer session_01964izDCmCqN7i5oYiFbonX

START_CTX ≈ 5 % (own estimate); finished ≈ 35 %, no rollover needed.
Verdict branch: `review/poison-road-rv` = 4ce4cbfa + merge origin/main a2ad2401 (index.html / sw.js rebuilt from merged sources with
dev/site/build_site.sh) + 1 reviewer fix (royal-row portraits) → **118436cc08ea83c7d46da37089155b93f03bf1e4**.
NOTE: origin/main moved to 33e98993 while this review ran → the fix round merges the newest main again.
Read: brief DROOT-poison-road-review.md, worker brief + report (incl. §0), OD:L430 + OD:L602 verbatim, START_CORE/WORKER/REVIEWER, KIT.md parts used (jgrey kitOff, jopic kitOptPic).
No tool or model refused anything during this review.

## Check by check
1. **REUSE — OK.** jpq.js only wraps jpoison's live PEND.pgpick (2 more target rows), pgRow text, j3 emperorDies (outermost of j24/j51/jmort/j99succ/jcoopworld),
   monthTick, npcMonthly, deathChain; same items (hacdinh/docngam), pgFood/pgGrade, BAL.pg.base, kit option card + kitOff closed rows, over()/jmort kill()/
   thShift/j55 tdPowAdd. `git grep` on main: no second poison system. jmort gets only `window.mortKill` (wrapper of the existing kill()).
2. **Motive gates — OK, cannot be bypassed.** pqMotive is checked twice: kitOff on the row (j3 showModal renders .off disabled, chooseM refuses it) AND
   again inside pqGive (closed gate → returns "", test "closed gate: act does nothing"). hate = Sủng ≤ gate.sung & Ân tình ≤ gate.an; Vương gia = j24 S.vgAlly +
   tình ý ≥ BAL.tinhLv.ally; harsh = TH_ARCH in gate.harsh & Thái hậu quý ≤ gate.th. Co-op: Emperor row closed, Thái hậu host only.
   Odds words: word() ladder + chanceLo ("khả năng thấp/vừa/cao"); no "%" anywhere in jpq.js player text.
3. **Consequences — OK.** caught → over("Ban chết",…) (existing death card + white silk) / NPC mortKill + news; house → j55 tdPowAdd(−clan.pow) + members' Danh.
   Success: Emperor → S.mort.empDue → j3 emperorDies next month (mortEmpDue, M.on=1); Thái hậu → kill(S.thO) → S.thDead → monthMort thShift (Quốc tang, HH takes lục cung).
   Inquest after the death; Vương gia road: no heir son → throne roll → "Vương gia đăng cơ, phong Quý phi" (alive) or Ban chết; her son heir / hate road →
   existing j99succ / mortFate flow untouched (bots: Thái phi / ni cô / Tân Thái hậu ép tuẫn táng endings appear). Slow poison: tho − slowCut (clamped to age).
   Old save: S.pq built lazily (test + quickcheck old save from live: loads + plays a buổi, 0 errors).
4. **ONE CORE — guard PASS, but see FAIL 2.** BAL.pq in jpq.js (Object.assign(BAL,{pq:…}), same as BAL.pg) is accepted: one-core-guard 0 fails
   (inline 3839 ≤ baseline 3842, balKeys 333). Player text prints BAL values (Đức −12, 6 tháng, Sủng ≤ 15 …).
5. **Two-way — OK + NOTE.** pqNpc: same pqMotive/pqOdds/pqGive, persW(v,"pgift"), host only, BAL.pq.npc.cd (24) months palace-wide cooldown, blocked
   while a royal case is open (done/inq/slow). **NOTE (balance owner = balance-final, not a FAIL here): NPC Sủng saturates** — reviewer probe, 6 lives × 60 months:
   0 of 2 946 NPC-months had Sủng ≤ 15, so pqMotive(v,"emp") hate never opened; many consorts sit at 100 by year 5
   (e.g. "100,94,100,100,67,76,69,96,81"). Only the Thái hậu road ever opens for NPCs.
6. **Perf — PASS.** quickcheck.sh --runs 6, run twice on a quiet 4-core box (12 interleaved new/live pairs):
   | run | render new/live (median) | buổi new/live | tab | result |
   |---|---|---|---|---|
   | 1 | 202 / 171 | 921 / 1014 | 413 / 422 | QUICKCHECK PASS |
   | 2 | 189 / 209 | 859 / 1173 | 386 / 409 | QUICKCHECK PASS |
   | all 12 pairs | 196.5 / 189 (+4 %) | new faster in 10 of 12 pairs | – | ≤ +5 % |
   jpq adds no render / buổi code; the worker's 824/711 gap was noise.
7. **Bots — OK, no runaway regicide.** `node dev/measure/poison-road-bots.js 60 8` on the merged build, 60 lives per style, 0 page errors:
   | style | her tries | hits | failed untraced | executed | inquests / exposed | VG throne won/lost | lives ended Ban chết |
   |---|---|---|---|---|---|---|---|
   | world (NPC only) | 0 (NPC 1 in 437.6 life-years) | 0 | 1 | 0 | 0 | – | 0 |
   | hate | 95 | 31 | 38 | 45 | 31 / 19 | – | 45/60 |
   | harsh | 97 | 14 | 49 | 43 | 14 / 9 | – | 43/60 |
   | vg | 73 | 32 | 18 | 43 | 31 / 11 | 11 / 9 | 43/60 |
   Max 5 tries a life (bot cap). A desperate gamble, as OD:L602 asks ("proper risk/consequences").
8. **Gates:** poison-road.js 35/35 PASS (before + after the reviewer fix) · one-core 0 · coop-e2e 63/63 (= live) · quickcheck PASS ×2 · old save OK ·
   Fold 755x1000@2 + iPad 1180x820@2 shots LOOKED (scratch only, nothing uploaded, nothing to wipe) → **picker overlap, FAIL 1**.

## Reviewer fix (on review/poison-road-rv 118436cc)
- KIT CONSISTENCY (OD:L1095): the two royal rows showed a dish/act picture while every other target row in the same picker shows the target's portrait.
  The kit already has the field: option `kgt:"emp"|"th"` → jopic kitOptPic → pEmp()/pTH(). Added `kgt:who` to the royal option in jpq.js; re-shot: the Emperor
  and Thái hậu portraits now show (closed Thái hậu row greyed like other kitOff rows).

## FAIL 3 @118436cc08ea83c7d46da37089155b93f03bf1e4
1. **Picker header covered by the option list (Fold 755x1000@2 AND iPad 1180x820@2)**: with the royal rows, the "Bỏ độc vào quà" dialog shows a dish card
   (.kiev kitem) + facts block whose text is hidden under the first option card. That hidden text includes the new warning "Hoàng thượng và Thái hậu luôn
   có người nếm thử: chỉ khi có nguyên cớ mới dám, bị lần ra là tội chết, nhà mẹ đẻ liên lụy" and the "Thành hay bại tùy…" note. A fragment of it peeks
   between the 1st and 2nd cards. DOM: `.kpb` height 66 px while its `.kpmain` is 274 px, so `.opts` starts at y 266 over it.
   Cause = kit layout: jk4 `.kpb{flex:0 1 auto!important;min-height:0}` lets the intro block shrink below its content when a long option list fills a
   kdscroll kpanel. **This already happens on live a2ad2401 for this picker** (no royal rows: .kpb 48 px vs .kpmain 163 px; the second paragraph is hidden), and
   the royal rows make it much worse. The worker report's "no overlap" was wrong. → **KIT REQUEST** (written in dev/kit/KIT_REQUESTS.md): the kit keeper fixes
   `.kpb` in the kpanel family (every kdscroll picker with a long option list, e.g. pgpick, giftpick, taintpick); the worker then re-shoots Fold + iPad. No
   per-dialog CSS in jpq.
2. **ONE CORE (OD:L1267)**: jpq.js pqOdds still types its own divisors: `Math.round((a.tamco||0)/4)` and `.../4` for trust (L57). Make them BAL keys. Whole
   family (fix-the-group rule): jpoison pgOdds has the same `/4` ×2 and `spend(2)` (L48, L74). Use one BAL.pg key set for both files. The one-core-guard
   passes only because the baseline already counts them.
3. **Topic test holes**: `ok("Đức cost applied once",true)` is always true; make it check S.duc before/after = −BAL.pq.duc. The two NPC checks pass
   vacuously when persW(v,"pgift") ≤ 0 (`pdA<=0||…`); force a positive weight so they really test the NPC road.

## NOTES (not FAIL)
- NPC Sủng saturation (point 5) → balance-final / Sủng owner.
- pqVg / pqEmpEnd take the FIRST living "Vương gia" in S.men. j24 uses manById(S.vgAlly). Today MROLES has one Vương gia, so no bug, but manById(S.vgAlly) is safer.
- S.pq.slow is one slot: a later slow poison on the Thái hậu overwrites a pending Emperor one, so that Emperor death is not investigated. Edge case.
- jpq's pqHit for the Emperor relies on BAL.mort.on=1 (with mort off, the legacy j3 roll ignores empDue). Today on=1.

FAIL 3 @118436cc08ea83c7d46da37089155b93f03bf1e4 + list above (1 = KIT REQUEST to the kit keeper, 2–3 = worker fix round; merge newest origin/main 33e98993+)
