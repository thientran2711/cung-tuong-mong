# role-parity-drift-2 — the 12 red rows from 98f9f0f1 (law 1 TWO-WAY + law 11 WHOLE GROUP)

PRIORITY #1 CHECK: brief role-parity-drift-2.md; reused reports/role-parity-drift.md ('REVIEW r1 — re-merge update' row list) + the r1 probe (review/role-parity-drift-r1 950508fc). No other worker on it (CLAIMS / FOREMAN_B_STATUS). Foreman B = B ROOT-5 session_01N1tNP5mhtJhZ3qE6WZHmFk.

Branch: `review/role-parity-drift-2` = 950508fc + origin/main 62055a31 (law3-cost-only r1; only dev/build/j8.js text changed) — clean merge, build line rebuilt.
**No game code changed** (dev/build untouched): every row was a PROBE limit or a probe-world draw; each act was then PLAYED both ways (below).

## 1. Cause landing (bisect, the same r1 probe on each main build)
| build | gaps | the 12 rows |
|---|---|---|
| 7fb7c104 (LIVE before) | 21 | none |
| 56e0ec51 (errand-scene r6) | 21 | none |
| 2c5dd554 (hall-names) | 21 | none |
| 4217568a (odds-no-unknown) | 21 | none |
| **98f9f0f1 (monthly-allotment)** | 31 | **all 12** (+ «up cx3:tell» closes) |
| 950508fc (r1 tip) | 31 | all 12 (same list) |

So all 12 came from **98f9f0f1 monthly-allotment** (jallot.js): (a) `alInit` puts this month's Nội vụ phủ goods (`from:"noivu", d:S.turn`) in every consort's chest on the first render → the maid player's «Lén giữ đồ Nội vụ phủ phát» card (needs `eitPilPick`) now shows; (b) the extra items shift the seeded dice of the probe world (who she has met, who likes her, which rival holds proof, the risen NPC's maid lòng). Nothing in hall-names / odds-no-unknown moved a row.

## 2. Row table
| # | row | cause (98f9f0f1) | PROBE / REAL | fix (dev/tools/role-parity-scan.js) | before → after |
|---|---|---|---|---|---|
| 1–8 | t1–t7 + hh P-ONLY label «Chứng cứ 2 ›» | a drawn rival now holds 2 proofs, so her rival card shows the kit chip `.kchipb data-kev` | PROBE: the chip only opens kitEvidencePanel (j79 click hook, no state change — played, D below); navigation, not an act | whole group (law 11): SKIPA skips `data-kev` and `data-kintel` (the other `.kchipb` info chips «Đã biết: N tin ›», «Xem thêm N điều ›»); `data-kevact` (the real evidence acts) is not matched | P-ONLY ×8 → no row |
| 9–10 | hh + up N-ONLY cx3:facFound | the drawn life no longer KNOWS the consorts who like her at t6+ (her Phe phái list is j61 `k61Hide(…,2)`: only people she has met); NPCs know each other (exempt «first meeting») | PROBE world: «Lập phe cùng» shows and works for her at Hoàng hậu once she knows the person (played, A) | the «social» world makes her acquainted (k61 «Quen biết» 3, the NPC baseline) with the others, undone after (UNDO) | N-ONLY ×2 (+ N·draw t6/t7) → SAME t1–t7, hh, up |
| 11 | up P-ONLY cx2:maidTalk | the risen NPC's confidant maid is drawn at lòng ≥ BAL.ag.cx2.maidTalk.below (70), where an NPC does not bother; her card shows at any lòng | PROBE world: an NPC weighs it under that lòng and AGRUN raises the maid's lòng (played, B) | the «staff» world also puts the doer's confidant maid (a.maid, not in a.staff) under that lòng (below − 25), the same for her and an NPC, undone after | P-ONLY → SAME (also closes «up P-ONLY cx:maidR», same cause) |
| 12 | maid P-ONLY maid:pil | (a) above: her card now shows; the NPC road (jeitem `eitPilfer` on the master's monthly `stipGoods`, picked by `eitPilWho`) is no agent option, so the probe never saw it | PROBE: the NPC road exists and works (played, C) | NPC side reads `eitPilWho(master)` + `eitPilPick(master)` (the same gate as her `eitPilMaidOk`); new maid world «m-sour» = the servant's lòng with her master under BAL.eit.pil.loyal (S.tin for her, loyal for an NPC) — she had it only by the drawn S.tin 42 | P-ONLY → SAME |
| — | up P-ONLY cx3:tell (open list) | closed already on plain 98f9f0f1 (dice) | — | trimmed from role-parity-open.json now that the drift is fixed (r1 asked to wait for this) | open → SAME (stable ×3) |

Open list 20 → **18** (trimmed «up cx3:tell», «up cx:maidR»); OPEN_MAX 20 → **18**. No row was hidden: no new exempt entry, no new open entry.

## 3. Played both ways (dev/test/role-parity-drift2-play.js, real game functions, Fold 755×1000)
- A her: Hoàng hậu sees «Lập phe cùng X» (facHTML) for a consort she knows who likes her; tapping (facAct "lap") founds «phe … gia». A NPC: a consort's par3fac option cx3:facFound + AGRUN founds a faction.
- B her: the risen maid's deck has «Trò chuyện với cung nữ», maidTalkDo raises her maid's lòng +6 (BAL.ag.cx2.maidTalk.w.maid). B NPC: the risen NPC (amRise) weighs cx2:maidTalk under that lòng; AGRUN raises her maid's lòng +6.
- C her: a sour maid sees «Lén giữ đồ Nội vụ phủ phát» (srvCards), taking it removes the piece from her master and sells it (Bạc +8). C NPC: a sour NPC maid pilfers on her master's monthly goods (stipGoods → eitPilfer).
- D: «Chứng cứ 2 ›» opens the evidence panel; no state changes.
No game code changed → no coop-e2e / device shots needed (brief: only if game code changes).

## 4. Gates (on 1928547e)
Last full gate set on 1e9e481a (merged main d9b32074); then re-merges with ×1 role-parity + one-core (ROOT-4 rule).
| gate | result |
|---|---|
| role-parity.test ×3 (1928547e and 1e9e481a) | ALL PASS, the 3 outputs byte-identical (md5 836ab814…), open 18 ≤ OPEN_MAX 18, no new gap |
| role-parity-drift2-play.js (A/B/C/D both ways) | ALL PASS (11/11) |
| one-core-guard | PASS |
| ag-stf2 (dev/index.html) | ALL 23 PASS |
| quickcheck (old save) | PASS · old save ok · perf new/live render 187/183, tab 356/362, buổi 1675/1056, tasks 18/17 |
| coop-e2e / Fold + iPad shots | not needed: no game code changed (only dev/tools + dev/test) |
| re-merge 6b1ab390 (411e1e75), 2481c80d (6ffe38a4) | role-parity ×1 = same md5 836ab814 ALL PASS · one-core PASS · play ALL PASS (411e1e75) |

**SẴN SÀNG KIỂM 6ffe38a4f5c0d879050eef5b725550a641eb130e** (descends LIVE main 2481c80d). Diff vs main: dev/tools/role-parity-scan.js, dev/tools/role-parity-open.json, dev/test/role-parity.test.js, dev/test/role-parity-drift2-play.js (+ index.html/sw.js build line).

## 5. For the reviewer
- The probe worlds now set two more states the SAME way for both doers (social: acquaintance Quen biết 3; staff: confidant maid lòng; m-sour: servant lòng under BAL.eit.pil.loyal). Each is undone after its world (UNDO), so other rows are untouched (the gap list is otherwise identical to plain 98f9f0f1 minus the 12 + the 2 trimmed).
- Design note (not changed, not mine to change): her «Lập phe cùng» needs the partner to like HER (aff(v,S) ≥ BAL.facJoinAff 30), an NPC founder picks by HER OWN liking (BAL.ag.par3.fac frAff 35 / clan / shared foe). Both roads exist at every rank; the gate words differ. If the foreman wants ONE gate for both, that is an owner-level rule change (law 16) — flagged, not done.


## REVIEW r1 (sonnet reviewer, SMALL tooling/tests) — PASS 6ffe38a4

PRIORITY #1 CHECK: brief review-role-parity-drift-2.md; reused reports/role-parity-drift-2.md + the pre-fix probe (main 2481c80d role-parity-scan/test); CLAIMS row 261/284 (no other reviewer). 18 LAWS read; touched laws checked: 1, 4, 11, 13, 16.
Branch review/role-parity-drift-2-r1 = 6ffe38a4 (already descends LIVE main 2481c80d; no change needed). `git diff origin/main` = dev/tools/role-parity-scan.js, role-parity-open.json, dev/test/role-parity.test.js, role-parity-drift2-play.js, index.html build line. **dev/build untouched** → size rule OK.

1. Bisect: pre-fix probe (main's scan) run on 4217568a and 98f9f0f1 builds. 98f9f0f1: exactly the 12 rows (up maidTalk, hh+up facFound N-ONLY, «Chứng cứ 2 ›» t1–t7+hh, maid:pil) + «up cx3:tell» closed. 4217568a: none of the 12 (one unrelated stray row maid:N-ONLY:maid:ask on that older build, not in the 12, absent on the tip). Claim CONFIRMED.
2. Probe fairness (each is a fair real state, not a hidden gap):
   - «Chứng cứ 2 ›» ×8: kit chip data-kev/data-kintel only opens an info panel (played D: no state change); whole group skipped, `data-kevact` real acts still counted. FAIR.
   - cx3:facFound: social world sets k61 «Quen biết» 3 for her (the state NPCs start in; K restored by UNDO). The real "she has not met her yet" difference is already in the EXEMPT table (role-parity-exempt.json:107, «first meeting», reason documented) — not hidden. FAIR.
   - cx2:maidTalk: her card is always shown (jact.js:69); NPC weighs it only under BAL.ag.cx2.maidTalk.below (jagacts2.js:57). Staff world sets the maid's lòng to below−25 via BAL for both (law 4 OK, no typed number); act exists both ways (played B). FAIR.
   - maid:pil: NPC road = jeitem eitPilWho+eitPilPick (jeitem.js:47/101) vs her eitPilMaidOk (jeitem.js:103) — same loyal gate BAL.eit.pil.loyal; m-sour world sets S.tin / a.loyal under it via BAL. FAIR.
3. role-parity-drift2-play.js: ALL PASS, 11/11 (A her+NPC, B her+NPC, C her+NPC, D, 2× no page errors); it calls the real handlers (facAct, maidTalkDo, eitPilTake, AGRUN, stipGoods→eitPilfer).
4. OPEN 20 → 18 real: removed only «up cx:maidR» + «up cx3:tell» (diff), OPEN_MAX 18, test line "open baseline only shrinks (≤ 18)" ok; no exempt / open entry added.
5. Gates on 6ffe38a4: role-parity ×3 ALL PASS, outputs byte-identical (md5 836ab814…); play 11/11; one-core-guard PASS (inline 3986 ≤ 4212); ag-stf2 ALL 23 PASS; quickcheck PASS (old save ok; perf new/live render 205/209, tab 361/330, buổi 882/1016).

FLAG FOR MAIN (owner call, law 16 — NOT changed): «Lập phe cùng» gates.
- Her: j10.js:167 facHTML lists consorts with `aff(v,S) >= BAL.facJoinAff` (30, jbal.js:374): the PARTNER must like HER; no clan / shared-foe road.
- NPC founder: jagacts3.js:186 p3FacFr: `aff(v,x) >= BAL.ag.par3.fac.frAff` (35, jbal2.js:1220) OR same clan ≥15 OR shared foe ≥30: the FOUNDER must like the PARTNER; and `x!==S` excludes her (NPC→her road = invite j10.js:163 at aff(l,S)≥35).
- Verdict: law 1 — the act exists both ways at every rank, so NOT a clear break; but the rule is not the same rule both ways (direction of liking differs; she lacks the clan / shared-foe road; 30 vs 35). Law 4 — two BAL keys decide one rule (facJoinAff vs par3.fac.frAff). Law 2 — not touched. Owner decides whether to make ONE gate.

~100% review done. VERDICT: PASS 6ffe38a4f5c0d879050eef5b725550a641eb130e
