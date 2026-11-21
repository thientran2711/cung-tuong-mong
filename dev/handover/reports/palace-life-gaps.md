# palace-life-gaps — GAP rows IT05 + KP03 (b-gap-1 J5, worker session_01N1tNP2d78pGcErwtE8UsCK, opus)
PRIORITY #1 CHECK ('jewellery|hộp trang sức|orphan|mồ côi|Cho gọi con'): OD 7 | ledger 1 | claims 1 | main 15 | review/* 0 | archive 51 → reused jlost (cases, keep/held road, Đòi lại / Báo / Tâu acts), jil (item ledger), jplx (where the children are), j54 Mẫu tử bar (k.hM), j95 orphan housing, j99succ hoa. Design: OD:L87, L507, L1313; PLACES_PLAN.md §5 "Móc lối chơi" (on review/places); PROGRESS_places-port.md:25.
Branch review/palace-life-gaps @ 3af67a8e (base LIVE 30e8714e, merged LIVE 90d57324, own build committed). START_CTX ~5 % (1M window; get_session reads 0).

## IT05 — real objects (law 6c)
- j8 maidMonthP: the bought maid now takes a REAL piece of the chest (new jlost `maidTheft`: loLose with cause riv, by = buyer, keep → the piece sits in the BUYER's chest as a "held" case; loKnowAt → owner knows: Đòi lại êm thấm / Báo Cung Chính ti thu hồi / Tâu Hoàng thượng xin soát cung (higher rank, real evidence)). Same rule for NPC owners (two-way). Nothing worth taking → silver, text says silver, amount BAL.eff.j8.maidStealBac (was typed 30 and text "hộp trang sức").
- Whole group (scan `python3 dev/tools/theft-object-scan.py`): j68e/j68h lostItem + j68f/j68h hairpinThief named made-up objects and ended "đồ mất hẳn" with nothing moving. Now the event binds one real chest piece when it opens (jlost LO_EV: piece → jlost case, text {it} = its name, servant thief named on the case); "found" outcomes put it back (loEvBack → lostReturn); every other outcome leaves the case open ("còn thất lạc"); no piece worth taking → event does not come. jcmaid debt text: "Bạc cất trong hộp trang sức vơi đi n lượng" (silver, not an object).

| scan | lines naming a taken object | real piece moved | UNROUTED |
|---|---|---|---|
| before (LIVE) | 9 | 1 | 7 (j8:419, j68e:22,23, j68f:110, j68h:31,32,77) |
| after | 5 | 4 (+1 silver text) | 0 |

## KP03 — children living rules (new dev/build/jkidlife.js, after jagwhy1; numbers BAL.kid in jbal2.js)
- Mẫu tử (k.hM) for sons too (kit sbar, same as princesses). A child living AWAY (prince 6–17 at A ca sở / Đông cung; any child while the mother is in lãnh cung) not seen this month → Mẫu tử BAL.kid.estr (−3) at month end, logged "xa cách".
- «Cho gọi con về» (1 khắc · Mẫu tử +3 · kèm: con bỏ một buổi học, Tài con −1; child is at her palace that buổi via plxKidPlace) and «Sang A ca sở / Đông cung thăm con» (walk · Mẫu tử +4, once a month; seen on goTo arrival) — both in the card's «Thăm con» group next to j15's «Về tẩm cung thăm con» (kit pbtn cards). Gain + loss / equal value: call = cheap time but costs a lesson; visit = walk time, more Mẫu tử.
- NPC mothers (two-way): monthly visit via npcWhy "kidSee" (registered, reason = Mẫu tử) × BAL.kid.npcSee; same estrangement.
- Thái tử prestige: setHeir no longer types +10 for her only; mother of the new Thái tử (her OR an NPC) Danh +heirDanh, the mother whose son is put aside −heirDanh; her day adds ghenAll heirGhen. Texts j3:60 / j51:66 print BAL.
- Orphans (mother dead / lãnh cung): raised by the Hoàng hậu — her when she holds the seat, else the NPC queen — else Thái hậu; j95 houses them there (kidWardHome); foster mother Danh +ward.danh once; her wards listed in the children tab «Con nuôi» (pcard + Mẫu tử bar k.fM).
- Succession: her son's Mẫu tử ≥75 / <35 moves j99succ "mẹ con" (hoa) ±1.
- Not done (PLACES_PLAN item, park): "kẻ thù của mẹ có thêm động cơ nhắm vào Đông cung" beyond the ghen bump.

## Tests
- dev/test/palace-life.js 23/23 at 755x1000@2 and 1180x820@2 (×3 runs fold, ×2 ipad), 0 page errors, no x-overflow, save round-trip.
- quickcheck PASS 3af67a8e (core gates PASS · old save ok · perf new/live render 218/221 ms, buổi 1228/1050 ms (noisy box), tasks>200ms 19/19). Old saves: every new field defaults.
- Shots (LOOKED): https://ctm-img.victoria-tntt.workers.dev/img/_review/palace-life-gaps/ fold-1-kid.jpg, ipad-1-kid.jpg (son card «Thăm con» group), fold-2-lost.jpg, ipad-2-lost.jpg (bought-maid case: "Thấy ở … cung", Đòi lại / Tâu Hoàng thượng).
- Co-op: NPC children only on the host (worldOn()); her children in her S; no co-op code touched. coop-e2e not run (no co-op file changed).

## Kit
No new kit part (pbtn, sbar, pcard, kit tabs only). KIT REQUEST: none.
SẴN SÀNG KIỂM palace-life-gaps 3af67a8e

## REVIEW r1 (BIG, opus, session_01N1tNP6rEmQko7Y5Qk716AK) — PASS 5b670afb (branch review/palace-life-gaps-r1)
PRIORITY #1 CHECK: brief J5 line present | reused jlost/jil/jplx/j54/j95/j99succ (no rebuild) | review/* none other on IT05/KP03 | claims: worker row 396.
START_CTX ~3 % (1M window). Base: worker 3af67a8e + newest origin/main 315950c2 merged (index.html/sw.js rebuilt; conflicts only in the build files).

### Fix made by the reviewer (BLOCKING bug, now fixed)
1. KP03 estrangement fired even when she saw the child. monthTick (j3:111) runs `S.turn++` BEFORE kidsMonth (j3:117), so `k.kmS!==S.turn` at month end was always true: a call or a visit was erased by "xa cách" the same month (net 0 / +1). The worker test called kidLifeMonth() without the turn step, so it never saw it. Fix: jkidlife kidLifeMonth checks the month that just ended (T=S.turn-1); the NPC mother's month-end visit stamps T too. New regression test dev/test/palace-life-r1.js drives the REAL monthTick (no visit → −3; call → +3 net; visit A ca sở → +4 net; unseen brother −3): 5/5. Worker test line 45 now steps the turn like the game: 23/23.

### 18 laws
- 1 two-way: maidTheft for her and NPC owners (probe: NPC owner case st=found, held by buyer; jlost loOwnerMove acts for NPC); heir Danh for her and NPC mothers; NPC mothers see sons (npcWhy kidSee). OK.
- 2/3 equal value + gain-and-loss: Cho gọi con về (1 khắc, Mẫu tử +3, Tài con −1) vs Sang A ca sở/Đông cung (walk, +4); recovery roads are the existing jlost acts (each with cost/fail). OK.
- 4 ONE CORE: BAL.kid + BAL.eff.j8.maidStealBac; texts print BAL; one-core guard PASS.
- 5: n/a (no trial added).
- 6 REAL: (c) the bought maid moves a real chest piece into the buyer's chest (held case, Đòi lại / Báo / Tâu with 2 real proofs); lostItem/hairpinThief bind a real piece, found → back, else case stays open. (a) Tâu still needs real evidence. OK.
- 7 wording: "tốn/thành/kèm", no %, odds ladder from jlost. OK. 9–12 kit: pbtn act cards, sbar, pcard, kit tabs; no private CSS. OK (shots LOOKED).
### Tests (all on the merged head unless noted)
- quickcheck PASS (core gates · time-spill · old save ok · perf new/live render 265/279, buổi 1231/1647 on 66bd36cd merge; re-run on 5b670afb: QUICKCHECK PASS render 242/243, buổi 1467/1340 (noisy), old save ok, core gates PASS).
- palace-life.js 23/23 fold 755x1000@2 + ipad 1180x820@2; palace-life-r1.js 5/5; undef-scan PASS; coop-e2e 68/68 (live Worker).
- role-parity: 2 FAIL (cx3 tell P-ONLY; harm accuse/banphe/uyhiep N-ONLY + promoted-maid PROMO) — IDENTICAL on origin/main 66bd36cd build → pre-existing, not this branch (no file of those acts touched).
- bots: bot-same 30 steps finished 0 lives on this box (OOM-killed once), so no n≥30 table; numbers moved are one-offs (heir Danh ±10 now also NPC mothers, ward Danh +3 once, Mẫu tử ±3/4 per month only feeding succ hoa ±1). Not blocking; Foreman B may run a bot lane if wanted.
- theft-object-scan: UNROUTED 0. Shots looked: fold/ipad kid card (Thăm con group: Cho gọi con về, Sang A ca sở thăm con, Về tẩm cung thăm con), fold/ipad Đồ thất lạc case (Gấm Tô Châu held at Càn Ninh cung).
### Non-blocking follow-ups (park)
- Co-op: when the HOST's son replaces the GUEST's Thái tử, the guest's hrCard only handles her own son → the guest loses no Danh (host side does). Small two-way gap in co-op.
- Law 6c outside this group: story roads name objects with no item behind them (jrd_cn:101 "vòng bạc", jrd_cn:574+ Tố Nga's trâm vàng, jrd_cnv:243 hộp trâm) — past-event narrative, not her chest.
- Ward bond growth k.fM reuses BAL.kid.visit; a own key (ward.grow) would read clearer.
- The two new act cards show the generic palace-room act picture (kit picker); a child/visit picture would fit better (Foreman C).

## CO-OP HEIR FIX r2 (opus worker session_01N1tNP2HMzBBThVa1dWSodb, Foreman B ROOT-4; brief briefs/b-palace-heir-coop.md) — 0ef1b097
PRIORITY #1 CHECK ('heirDanh hrCard setHeir hrMine'): OD 0 | ledger 0 | claims = this worker only | main: jkidlife setHeir wrap (KP03), jcoopworld hrCard | review/* none other.
Branch review/palace-life-gaps-r2-land (from r1-land bac1fdf5 + LIVE bd03747e merged; assemble = LIVE list + jkidlife.js after jagwhy1.js; index.html/sw.js rebuilt).
START_CTX ~3 % (1M window); depth 5.

### Fix 1 — the put-aside mother (P2, the lander's red case)
- Cause (as the lander found): jcoopworld hrCard, branch x.v (another mother's son) only pushed the modal; the jkidlife setHeir wrap never ran in her context, so her −heirDanh was skipped.
- Fix: hrCard(h, was). Her old Thái tử is read on HER side = solo's old S.heir: `was` = the host's previous S.hr, sent with the card (heirMonth wrap → D.kind "hr" {h,was}; merged-week road: CW.hrPrev); without it (test hook) her own living son still flagged heir. A dead son counts for nothing (solo: heirMonth clears a dead heir, kidDie clears the flag).
  - another mother's son named + her living son was Thái tử → her son's flag cleared, ap(S,{danh:-BAL.kid.heirDanh}) ONCE in her context (the patch carries it to her phone; host copy = her phone); card line "X, con của ngươi, mất ngôi Đông cung." + fmt of the real change (ONE CORE, no typed number).
  - her own son named → S.heir set to her old Thái tử before setHeir, so the wrap gives +heirDanh only when no son of hers was Thái tử (same as solo; also stops a repeated card giving it twice).
### Fix 2 — LAW 11 whole family (scan dev/test/scan-heir-family.py: 28 sites, 0 without a co-op road)
| site | road in co-op | before | after |
|---|---|---|---|
| j3 heirMonth lập Thái tử (host, her entry in harem) | S.hr → hrCard on her side | her son named: +heirDanh ✓; her son put aside: 0 ✗ | +heirDanh ✓ / −heirDanh once ✓ (P1, P2) |
| j51 kvDebate phế/lập (inside heirMonth) | same S.hr → hrCard | put aside: 0 ✗ | −heirDanh once ✓ |
| host's / NPC's son put aside by HER son | host-context setHeir wrap (om = host S / NPC, shared world) | ✓ | ✓ (unchanged) |
| j97 mật chiếu, jend14 ch14 win, j4 coup (HER own act, her context on the host) | her context S.heir was stale/stripped (seatOf drops "heir"): "no Thái tử yet" could read true while the world had one; her new heir never reached S.hr ✗ | withSeat heir mirror (CW.dInit wraps T.withSeat): S.heir = world S.hr while she acts; a Thái tử she makes → S.hr + host hrApply; the put-aside mother (NPC / host stand-in) loses via the wrap as solo ✓ (P4) |
| j1 kidDie of the Thái tử | res.fam kdie → kidDie on her side | no Danh (as solo) ✓ | ✓; hrMine ignores a dead son |
| j8 kframe (trù ẻo) heir deposed | res.fam kd heir0 clears her flag | no heirDanh in solo ✓ | ✓ |
| ktake (her heir son taken to an NPC house) | S.heir.v follows | no Danh in solo ✓ | ✓ |
| j99succ succession pick / succDebug | host world only / debug jump | no Danh ✓ | ✓ |
Rank of mother / adopt: no heirDanh rule exists (BAL.kid has only heirDanh/heirGhen for the heir); ward Danh (kidWardHome) is her own household (runs on her side) — no cross-seat road needed.

### Tests (final sha 0ef1b097)
- quickcheck PASS (core gates PASS, old save from LIVE loads + plays a buổi, perf new/live render 227/257 ms, buổi 1096/1450 ms); undef-scan PASS (257 names); role-parity ALL PASS (no OOM, --max-old-space-size=4096).
- coop-e2e 92/92 (live Worker).
- coop-palace-life (now 18 checks: P0–P4 + P3): host-first 18/18; swap (`"" 9 1`) 17/18 = P3 flake only (see OPEN). P1, P2, P4 green on both seat orders in every run (6 runs on the fix).
- palace-life.js 23/23 Fold 755x1000@2 + iPad 1180x820@2; palace-life-r1.js 5/5.
- scan-heir-family.py: 28 sites, 0 without a co-op road.
- Old saves: no new saved field (hrCard reads existing S.hr / kid.heir); quickcheck old-save load ok.
- Commits: 7060b419 (hrCard loss), 76e0168d (withSeat heir mirror + scan), 6089fd84 (test P4), 80516d4d + 0ef1b097 (merges LIVE 9c1dd605, bd03747e).

### OPEN (pre-existing, NOT from this fix) — P3 flake = thin-E month delta race
coop-palace-life P3 ("the host's copy of her son reads the same Mẫu tử") fails ~1 in 3 runs, ALSO on the untouched base bac1fdf5 (base 5 runs: 2× P3 FAIL host hM 54 vs her 57). Evidence (instrumented run, dev script not committed): her phone runs her month (kidLifeMonth 60→57); her week-end "end" blob (toCanon) already gives the host's copy 57; then her first erd after the week (E.bs nulled on "week" → base = a view taken BEFORE the host's copy took her end blob) carries ["+",kids.Thử Lân.hM,-3] again → host copy 54. Same race doubles the other month "+" deltas (Danh danhMonthTick 54 vs 58 seen, kid hp/tv/tw/td). Swap run once showed the other face (her month −3 lost, hM 60). Fix belongs to the thin-E baseline (jcoopthine E.base / "week" handler: base = the blob she sent at week end, not the stale view) → needs its own worker + coop-thin-e* suites; I did not touch the engine.

## REVIEW r2 (BIG, opus, session_01N1tNP5VDCiGrxWWA9cibrc) — PASS 1bf2d07b (branch review/palace-life-gaps-r2-r1)
PRIORITY #1 CHECK ('heirDanh hrCard setHeir'): OD 0 | ledger 0 | claims = worker + this review only | main: jcoopworld hrCard (pre-fix) | review/* none other | archive 0.
- 1bf2d07b contains origin/main 32c63abc. LIVE moved 6× during the review; merged each time (666def0c, 2021e23f, 20b9f2a5, fc0867ca, 90da39e3, 2bf59027, b0428855, 32c63abc). Real conflicts: assemble.py file list (→ LIVE list + jkidlife.js after jagwhy1.js, twice) and jbal2.js (BAL.kid + LIVE BAL.wearSlots both kept); index.html/sw.js rebuilt each time. b0428855 (coop-week-stall) auto-merged jcoop/jcoopworld; heir fix intact; co-op gates rerun after it.
- Earlier merge resolutions checked: j8 maid theft (IT05 maidTheft; a.name in her text, NM(a) in others' text; silver fallback BAL.eff.j8.maidStealBac) and j95 kidWardHome (ward home first, then the old rule) — correct.
### 18 laws (touched)
- Law 1 two-way: P2 (host's son puts aside HER Thái tử → she −heirDanh once, both seats) green. Reviewer probe P5 (not committed): her own act in her context puts aside the HOST's son (j97 mật chiếu can: it does not need an empty seat) → host −10, she +10 once, both seats equal. OK.
- Law 4: guest loss = ap(S,{danh:-BAL.kid.heirDanh}); card prints fmt of the real change; no typed number. OK.
- Solo unchanged (hrCard / withSeat wrap run only in co-op: CW.on && host() && other seat). Old saves: no new saved field (S.heir stripped by seatOf); quickcheck old save ok. Law 3/6: as r1 PASS.
- Law 9/10: no kit/CSS change. (iPad Đồ thất lạc 2-column act cards had «Hỏi cung nhân» one letter per line on the first merge; LIVE kit-act-grid 2bf59027 fixed it — shot after merge reads one column, clean.)
### Tests
- Final 1bf2d07b: quickcheck PASS (core gates PASS, old save ok, perf new/live render 273/238 ms, buổi 1361/1051 ms — within gate); undef-scan PASS (257); palace-life.js 23/23 Fold 755x1000@2 + iPad 1180x820@2.
- b0e689e6 (after the co-op LIVE change; 1bf2d07b adds only UI note/kit files): quickcheck PASS; coop-e2e 92/92; coop-palace-life host-first 18/18, SWAP 3 runs: 18,18,17 (P3).
- Earlier heads (5c34d830 / 44b55267 / b7bb4329 / 5c438f2b / d9d960e0): role-parity ALL PASS (run alone: in parallel with co-op the renderer OOMs); coop-e2e 92/92 ×3; palace-life-r1 5/5; scan-heir-family 28 sites / 0 miss; coop-palace-life host-first 9/9 runs 18/18; SWAP 11 runs: 8× 18/18, 3× 17/18 (P3 only).
- Shots looked (Fold + iPad: kid, ward, lost); scratch only, nothing uploaded, nothing to wipe.
### P3 = PRE-EXISTING (confirmed, NOT a blocker) → separate thin-E worker
Base bac1fdf5 SWAP 4 runs: P2 red 4/4 (the bug fixed here); P3 red 2/4. Faces seen (base + branch): (a) her month −3 lost (her hM 60, Danh 52 vs 50); (b) host copy hM 54 vs her 57 (Danh may differ too: 58/54, 46/48); (c) her own phone hM 54 = estr twice (branch run on 5c438f2b). Same thin-E month-delta race (worker: after "week" E.base is a stale view, her first erd re-sends month "+" deltas). Fix belongs to jcoopthine baseline + coop-thin-e* suites; this branch does not touch it and does not make it worse (branch ~3/14 SWAP vs base 2/4).

## RELAND r3 (BIG reviewer-lander, opus, session_01N1tNP5jMFLMtiToAbVEacW; brief briefs/b6-relander-palace-life.md) — PASS 8599d166 (branch review/palace-life-gaps-r3)
PRIORITY #1 CHECK ('palace-life-gaps|jkidlife|maidTheft'): OD 0 | ledger 0 | claims 8 | main 0 | review/* 5 | archive 14 — branch review/palace-life-gaps-r2-r1 1bf2d07b reused, no rebuild.
START_CTX ~3 % (1M window).
- r3 = 1bf2d07b + LIVE merged 8 times while testing (a4ee93d7 → 23bb3862 → 3a2b81b1 → fc7f98f6 → f85cba97 → 8f435841 → 99795d67 → d3f44022). 8599d166 contains origin/main d3f44022. At report time LIVE = 1bf7e14d: git merge-tree shows code merges clean (j95/jbal2 auto-merge), only index.html/sw.js conflict → the land merge just rebuilds them.
- Real conflicts (first merge, a4ee93d7): jbal2.js, jcoopworld.js, assemble.py; later merges: assemble.py only (+ index.html/sw.js, always rebuilt with dev/site/build_site.sh). jcoopone/jcoopworld (LIVE 8f435841 co-op change) auto-merged; hrCard(a.h,a.was) intact.
### BAL keys touched (law 4 one core: no value overwritten on either side)
| key | LIVE value | branch value | kept |
|---|---|---|---|
| BAL.kid (whole block, jbal2.js) | absent | {estr:-3,visit:4,call:3,callK:1,callTal:1,npcSee:60,heirDanh:10,heirGhen:6,ward:{danh:3},succHoa:{hi:75,lo:35},hm0:[55,16]} | branch block added as is |
| BAL.kcg (jbal2.js, LIVE jkcg) | LIVE block | absent | LIVE block as is |
| BAL.kcco (jbal2.js, LIVE jkcco) | LIVE block | absent | LIVE block as is |
| BAL.eff.j8.maidStealBac (jbaleff.js) | absent | 30 | added; the rest of BAL.eff.j8 identical to LIVE (diffed) |
Final diff vs LIVE in jbal.js 0 lines, jbal2.js only BAL.kid (7 lines), jbaleff.js only maidStealBac. One-core guard: 0 fails, balKeys 725 on the first merge.
### Other conflicts
- jcoopworld T.D.K: branch hr:a=>hrCard(a.h,a.was) + LIVE invHer:a=>invHer(a.pp,a.ok,a.lv) → both kept on one line.
- assemble.py: LIVE list each time + 'jkidlife.js' right after 'jagwhy1.js' (one line of diff vs LIVE).
### Tests
- FINAL 8599d166 (+ LIVE d3f44022: j61/jhaohuu): quickcheck PASS (core gates PASS, old save ok, perf render 204/242, buổi 1038/1074 ms); undef PASS (276); palace-life 23/23 Fold 755x1000@2 + iPad 1180x820@2.
- 8691418c (+ LIVE 99795d67, minigame UI only): quickcheck PASS; undef PASS; palace-life 23/23 both devices.
- 5a43675b (+ LIVE 8f435841, co-op jcoopone/jcoopworld change): quickcheck PASS (core gates PASS, old save ok, perf render 235/246, buổi 1207/1221 ms); undef PASS (276); scan-heir-family 28 sites / 0 miss; palace-life 23/23 Fold 755x1000@2 + iPad 1180x820@2; coop-e2e 94/94; coop-palace-life host-first 18/18, SWAP 18/18.
- 35e14a4c (+ LIVE fc7f98f6): quickcheck PASS; undef PASS; scan-heir 0 miss; theft-object-scan UNROUTED 0; palace-life 23/23 both devices; coop-e2e 94/94; coop-palace-life 18/18 both seat orders; role-parity ALL PASS (run alone).
- c0730654 (+ LIVE 3a2b81b1, jcooptimer): the same set all green incl. role-parity ALL PASS.
- 3fbc0d20 / 10055501: quickcheck PASS (10055501 had one G4 coop-one-world seed-3 fail «R.evm 1»; reran seed 3 on the branch 5× PASS, LIVE 3× PASS; no file of this branch touches evm/proof → load flake; all later quickchecks green); role-parity ALL PASS; coop-e2e 94/94 ×4 and one 92/94 (rerun 94/94 ×3, no failing check reproduced).
- coop-palace-life P3 (thin-E month-delta race, PRE-EXISTING per REVIEW r2): SWAP over all heads 4× 18/18, 3× 17/18 (P3 only, face b: host copy hM 54 vs her 57). Same separate thin-E worker as r2 notes; not a blocker.
- Shots looked (Fold + iPad: kid card «Thăm con» group, ward, Đồ thất lạc case): clean, kit cards, odds in words. Observation (not this branch): Fold kid card stat chips (Văn/Võ/Đức/Mẫu tử) sit at the scroll edge of the panel in the test shot. Scratch only; nothing uploaded, nothing to wipe.
### 18 laws (touched by the merge)
- Law 4: table above, no value moved, no typed number added. Law 1/2/3/6: unchanged from r2 PASS (no code of the branch changed in the merge besides the two kept lines). Law 9/10: no kit/CSS change.

## RELAND r4 (BIG reviewer-lander, opus, session_01N1tNP5jMFLMtiToAbVEacW; ORDER Foreman B ROOT-7 ← MAIN 97 16:39Z: r3 8599d166 failed to land, real conflict jbaleff.js vs LIVE c9ae030e) — LAND READY fd4af05b (branch review/palace-life-gaps-r4)
PRIORITY #1 CHECK: same branch as r3 (review/palace-life-gaps-r3 8599d166) reused; no rebuild.
- r4 = r3 8599d166 + LIVE 6d31d6d2 → 0faf7a05 → b7041e67. fd4af05b contains origin/main b7041e67. Newest LIVE at report f44060d4: git merge-tree = code clean (jkrel etc. auto), only index.html/sw.js to rebuild.
### Conflicts and how they were kept (law 4: no value moved on either side)
| file | LIVE side | branch side | kept |
|---|---|---|---|
| jbaleff.js BAL.eff.j8 | LIVE line (sg-card r3: rumorDanh, accuseDanh, accuseFailDanh, vpFailDanh, frameDanh, frameTam, frameFailDanh, frameFailSung, … — every key/value as LIVE) | + maidStealBac:30 | LIVE line whole + maidStealBac:30 in front; diffed: rest of j8 == LIVE |
| jbal2.js | BAL.dc (dresscode) | BAL.kid | both blocks as is |
| jlost.js keep road | loKeepBy(c,loP(c.by)) (LIVE jlost-kyngo: one owner change for every keep road) | inline keep copy | LIVE loKeepBy (does the same + ilLog); branch maidTheft (keep:1 → c.at = buyer) works through it |
| jlost.js owner notice | if(p===S){Q.push…} | if(p===S&&!c.quiet) (IT05 maid theft: j8 tells it with the buyer's name) | LIVE line + branch !c.quiet, rest identical (diffed) |
| jlost.js exports | LIVE window list (+ loKeepBy, loCaseOf, loHolds) | IT05 LO_EV block after it | LIVE list + branch block |
| assemble.py | LIVE list | jkidlife.js | LIVE list + jkidlife.js after jagwhy1.js |
Diff vs LIVE: jbal.js 0 lines, jbal2.js 7 (BAL.kid), jbaleff.js only maidStealBac, jlost.js only the IT05 additions.
### Gates
- fd4af05b (+ LIVE b7041e67: kit/ge files only): quickcheck PASS (core gates incl. one-core 0 fails, old save ok, perf render 255/252 ms); undef PASS (283); palace-life 23/23 Fold 755x1000@2 + iPad 1180x820@2; coop-e2e 124/124.
- d3404787 (+ LIVE 0faf7a05): quickcheck PASS; undef PASS (281); scan-heir 28 / 0 miss; theft-object-scan UNROUTED 0; palace-life 23/23 both devices; kyngo-unit PASS; coop-lost-scan (30 weeks) 43/43 ok, dups 0 vanish 0; coop-e2e 124/124; coop-palace-life host-first 18/18 + SWAP 18/18; role-parity ALL PASS (alone).
- 89d184b6 (+ LIVE 6d31d6d2): the same set all green (coop-lost-scan 76-week run cut by my 900 s timeout at week 47, dups 0 vanish 0 to there).
- CO-OP GATE: coop-e2e 124/124 + coop-palace-life both seat orders 18/18 + coop-lost-scan 43/43 + quickcheck coop-one-world PASS. P3 SWAP flake (thin-E, pre-existing) did not show in r4 runs.
- 18 laws: as r3 (law 4 table above; law 6c real objects: maid theft now goes through LIVE's one owner-change road loKeepBy, so the stolen piece is in the buyer's chest and traceable).
