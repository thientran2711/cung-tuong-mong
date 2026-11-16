# PROGRESS review/coop-b1b5-p2 — D21 co-op B1–B5 PART 2

Base: review/coop-b1b5 @ d0f2260a merged with origin/main c4b0c58f (conflicts only in built index.html / sw.js → rebuilt).
Spec: dev/coop/COOP_AUDIT.md "Big items" B1–B5 + part 1's "NOT done" list (dev/handover/reports/coop-b1b5.md).
Reviewer r1 of part 1 (dev/handover/reports/review-coop-b1b5-r1.md on the handover branch) = FAIL with 6 fixes: status below.
All code client-side (dev/build/jcoopworld.js block "review/coop-b1b5-p2"; j99succ.js guards; j71.js J71.cost; jbal2.js BAL.coopBribe).
Relays ride the existing free-form `act` channel (k "ctm-p2") and `res` (new optional fields hd / tt / fest / pet): NO Worker change,
Worker not deployed, protocol backward-compatible. main s13's coop-rejoin-xdev code untouched. Kit: only pushModal / pushDil (standard
kit dialogs); no new UI part, no KIT REQUEST.

## Done (part 2)
| Item | Now | Gain / loss |
|---|---|---|
| (1) B1 servant entry | Mua chuộc on the friend serving as a cung nữ = HER card "Bạc lạ" (j42 cnvBribe form) with the player as buyer; an NPC's bribe aimed at her (host world) = her j42 card; what she reports as my tai mắt (evA with my entry as holder: j42 "Lén báo tin", monthly spy line) becomes MY proof (relay ev); her srvMonth runs with my entry present (spy not dropped). Dọa tố đối thực: never offered on her (needs a servant lover; her affair is with an outer-court man, kept on her side) | Nhận: she Bạc +pay (BAL.coopBribe), I Bạc −pay + a tai mắt; Bẩm chủ: she Chủ tin +tin, her mistress holds 1 proof of my bribe + likes me −5 (deedAdd on MY side); Im lặng: my bạc back |
| (2) B2 shared heir | world key S.hr ("p<pid>\|kid" / "n<npc>\|kid", a string so the merge never adds ids); host heirMonth (lập Thái tử + lập đích debate) runs with her entry → her sons are candidates; guest heirMonth never runs; both resolve hr → S.heir after every rebuild; her heir dying / deposed on her side clears it; guest card "Lập Thái tử" | mother: the j1 setHeir Danh gain on her own client, once |
| (3) B3 j99succ | ON in co-op: the death roll + heir are the host's (part 1 + B2); the MOTHER of the new Emperor gets the Ba đường card (Hoàng thái hậu / Nhiếp chính / Nữ đế) on her own client; the other player gets the base reign ending (no NPC claim on a player's son); the epilogue never moves the shared year (succAge / succEnd yrs) | as solo (costs, odds, Cần on the card) |
| (4) B4 | host diffs her entry around each rivalsTurn / rivalsMonth / festival → res.fam ops (rm with by = the NPC thief → thất lạc case held by THAT NPC; ktake with to = that NPC; kd / kdie / preg0 / plant; new op "add" for a thing given to her) + res.pet (NPC petsteal / harm); festival: her own registration (S.j71.fx, live in pos.fam.fx7) = her art + teacher bonus in the host's scoring, Sức J71.cost on her side, registration closed, result card with her place | NPC keeps what it took; she loses it on her own S |
| (5) coop-pets.js | harness updated for the Luân hồi flow (roulette skip, Nhận thân phận, in-game wait, both consorts) | — |
Numbers: BAL.coopBribe {pay, tin} (jbal2.js); J71.cost (festival Sức, j71 — every "Dự thi"/"Vào thi"/auto-entry now reads it, was 4 literal −6).

## Tests (LIVE Worker, 2 browsers, host 755x1000@2 + guest 1180x820@2, one at a time)
- dev/test/coop-p2.js (NEW): 45/45 — see the report for the per-item list.
- coop-b1 41/41 (after fix 5), coop-b2b5 30/30, coop-e2e 59/59 (E2E_TO=120000), coop-pets 46/48 (FAIL: 'B ended the week (end sent)' + 'merged week keeps the late help' — the harness's week end predates the night gate (nightReady/go); update its toLast/press flow to coop-b2b5's week()).
- Reviewer branch review/coop-b1b5-r1 @8dd1626a merged (oldroom-r1 / oldsave-r1 tests: not re-run here).

## r1 fix list status (successor session, all DONE)
1. **pos > 4000 chars (BLOCKING): DONE.** pos now carries only place / khắc / week / buổi / stats / name / `fh` (hash of her bag + kids +
   pregnancy + festival entries + pets). Those ride their own act relay k "ctm-fam" (mode "fam", sent when the hash changes; no cap but
   the Worker's 9e6 message limit); the friend asks again (mode "ask", throttled 4 s) when the pos hash differs from what she holds (relay
   missed while away, rejoin from the room's stored pos). famIn is compared with her entry on every pos, so a rebuilt entry (merged week)
   gets the live bag back. Old clients: an inline pos.fam / pos.pets is still read (liveStats → famIn). No Worker change.
   Measured (coop-r2): 152-item bag + 6 kids + pet: bag JSON 22 293 chars, every pos ≤ ~600 chars (< 4000).
2. **NPC acts on her: DONE (whole family).** Besides the diffs around rivalsTurn / rivalsMonth / festival, a runAct wrapper catches ANY NPC
   act on her entry outside those (npcAct, mindRun, j70 exec70 plots, kv jealousy acts, due plans): the host snapshots her entry around
   that one act and sends the same res.fam / res.pet ops; the guest never runs an NPC act on the host's entry (returns ""). Log CW.npcOn.
3. **B5 seat card: DONE (OD:L1228).** No "đợi khi có ghế trống". A full seat = the promo-skip compensation: jexam promoFullSeat when that
   branch is in, else coopFullSeat (same rule): Bạc = BAL.psk.seat.bacM × BAL.pay[seat rank] (+hieuBac if she already has a phong hiệu),
   Danh +6, a phong hiệu (TITLES), 2 ngự ban (bestow "promo"), her house power +8 / father +5; loss: every consort ghen +10. Rank stays one
   lower; the next rank via the normal exam. BAL.psk.seat added to jbal2.js ONLY if absent (same key + values as review/promo-skip: when
   promo-skip merges, its BAL.psk wins and this guarded line can be deleted). No "Bị giáng" scene (j93 KMSNAP rank moved with it).
4. **In-week night host-authoritative: DONE.** Host change → final word (mode "tn", version v per week, also S.tn = {w, who}); guest change
   → CLAIM (mode "claim", v = last host version she saw). The host takes a claim only if it has not changed the night since (v equal),
   else keeps its own; it always broadcasts the final; the guest applies only that. Old guest's plain "tn" = an accepted claim.
5. **coop-b1 vacuous checks: DONE.** Loss checks of cases 1, 5, 8 depend on the gain check.
6. **coop-pets: DONE 48/48.** Case 5 (late res after B ended): A holds a dialog and the host forces the night (COOPW.forceNight) so only
   B ends; press() counts a seat that already pressed (bend / night-ready / end out) as pressed.

## Tests (successor, LIVE Worker, host 755x1000@2 + guest 1180x820@2, one at a time)
| Test | Result |
|---|---|
| coop-r2.js (NEW) | 47/47: big chest (152 items + 6 kids + pet) pos < 4000, place + Sủng update, lost relay re-asked, laydo on the big chest; NPC takeaway / petsteal / musk / kpoison via mindRun (gain on the NPC, loss on HER S, no copy on her entry, guest never runs NPC acts on the host); night: lone guest claim taken, crossing claims → one night = host's, S.tn; full seat compensation numbers + no waiting claim + jealousy; merged week: entry == own, taken child exists once |
| coop-p2 | 45/45 (one earlier run 42/45: an NPC's j42 bribe card arrived before the player's offer — test race, rerun green) |
| coop-b1 | 41/41 |
| coop-b2b5 | 30/30 |
| coop-e2e (E2E_TO=120000) | 59/59 |
| coop-pets | 48/48 |
| oldroom-r1 / oldsave-r1 (old = current origin/main build) | 16/16, 16/16 |
Screenshots looked at: seat card 1180x820 (guest) + 755x1000 (host): kit BÁO dialog, gains green, jealousy red, no overflow.
Known limits: Dọa tố đối thực is never offered on the friend-servant; the j99succ epilogue is her personal ending.
