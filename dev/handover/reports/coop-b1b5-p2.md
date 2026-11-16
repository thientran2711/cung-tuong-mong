NOT READY (worker rollover) — pushed review/coop-b1b5-p2 @ 2740a299bdf447c88dd47f6f456c7c4df67aeb29

# coop-b1b5-p2 — D21 co-op B1–B5 PART 2 + reviewer r1 fixes — worker report + HANDOVER
Branch: review/coop-b1b5-p2 @ 2740a299 = review/coop-b1b5 d0f2260a + origin/main c4b0c58f + reviewer branch review/coop-b1b5-r1 8dd1626a
(oldroom-r1 / oldsave-r1 tests) + part-2 code. START_CTX ≈ 2.5 % of the window; stopped at the rollover point (≈ 27 %).
Details per item, numbers and gain/loss: dev/PROGRESS_review-coop-b1b5-p2.md on the branch. Worker NOT deployed; no Worker change
(relays ride `act` k "ctm-p2" and optional `res` fields hd/tt/fest/pet — backward-compatible). coop-rejoin-xdev code untouched.
No new UI part (standard kit dialogs only) → no KIT REQUEST.

## Done
- Part 2 (1) B1 friend as cung nữ: Mua chuộc = HER "Bạc lạ" card (Nhận / Bẩm chủ / Im lặng, BAL.coopBribe), NPC bribe → her j42 card,
  her spy reports → MY proof (relay ev), srvMonth with my entry present.
- (2) B2 one heir, world key S.hr (string), host heirMonth with her entry, both resolve after every rebuild, her Danh gain via setHeir.
- (3) B3 j99succ ON in co-op: the new Emperor's mother chooses on her own client; the other player gets the base ending; the shared
  year never moves (succAge / succEnd).
- (4) B4 NPC item / kid / pregnancy / PET acts in host rivalsTurn / rivalsMonth / festival → res.fam / res.pet ops (thất lạc held by
  THAT NPC, child to THAT NPC, kid death on her side, "add" for things given); festival uses HER registration (art + teacher),
  Sức J71.cost (new j71 constant, the 4 literal −6 now read it), registration closed, result card.
- (5) coop-pets.js setup updated for the Luân hồi flow.
- r1 fix 2: DONE for rivalsTurn / rivalsMonth / festival (diff of her entry around each call). r1 fix 5: coop-b1 deterministic.

## Tests (LIVE Worker, host 755x1000@2 + guest 1180x820@2, one at a time)
| Test | Result |
|---|---|
| dev/test/coop-p2.js (NEW) | 45/45 (B1 offer/accept/refuse/NPC bribe/spy proof; B2 host names her son, same heir both, guest heirMonth inert; B4 NPC theft → her thất lạc case, kid death, prize; festival with her registration; B3 her Ba đường card, 3-chapter epilogue, year unchanged, both reborn) |
| coop-b1.js | 41/41 (was 27/39 before fix 5) |
| coop-b2b5.js | 30/30 |
| coop-e2e.js (E2E_TO=120000) | 59/59 |
| coop-pets.js | 46/48 — FAIL "B ended the week (end sent)", "merged week keeps the late help": its week end predates the night gate |
| oldroom-r1 / oldsave-r1 | not re-run (need the old build in .tmp/old.html) |
Screenshots looked at: b1-guest-bribe 1180x820 (kit Việc dialog, 3 option cards), b4-guest-fest 1180x820.

## HANDOVER — what the successor must do (in this order; foreman D s3 wants r1 fixes before review)
1. **r1 fix 1 BLOCKING — pos > 4000 chars dropped by the LIVE Worker (coop/worker/src/index.js:168).** sendPos in jcoopworld carries
   pets + fam {bag (full entries + ci), kids, preg, fake, fx7}. Make pos small: e.g. pos.fam = {h:<hash>, n} only, and send the bag/kids/
   fx7 in their own `act` relay (k "ctm-p2", mode "fam") on change, split into chunks < cap (check the Worker's cap for `act` too);
   liveStats/onPos must accept both shapes (old clients). Test: ≥150-item bag + 6 children, pos JSON < 4000, friend's place still updates.
2. **r1 fix 3 — B5 "Ghế đã có người" card** (CW.seatWeek in jcoopworld): remove "đợi khi có ghế trống" (OD:L1228 bans a waiting claim)
   and give the LARGE compensation per OD:L1228 (bạc + rare gifts, phong hiệu without rank change, favour for her family; cost: the
   consorts' jealousy), numbers in BAL, wording VANPHONG; she later passes the normal exam. Read OD:L1228 verbatim (topic balance-economy).
3. **r1 fix 4 — B2 in-week night**: tnRelay is peer-to-peer. Make the guest send a CLAIM (act k "ctm-tn" mode "claim"), the host decide
   and broadcast the final {w,who} (also S.tn); the guest applies only the host's word; add a crossing test (both claim the same buổi).
4. **r1 fix 5 rest**: case 5 of coop-b1 "child left B's house" passes vacuously when no child was gained — make it depend on the gain.
5. **r1 fix 2 rest**: per-act test of NPC acts on the friend (NPC takeaway / petsteal / musk / kpoison with forced dice through the real
   npcAct/mindRun path, not only COOPW.b4Run); check NPC acts outside rivalsTurn/rivalsMonth (rivalsBuoi runs withoutFriend → none).
6. **r1 fix 6**: coop-pets.js week end → use coop-b2b5's week() helper (night gate), then 48/48.
7. Re-run coop-p2, coop-b1, coop-b2b5, coop-e2e, coop-pets, oldroom-r1, oldsave-r1; first line "SẴN SÀNG KIỂM <sha>"; message the foreman.
Known limits (write them in the final report): Dọa tố đối thực is never offered on the friend-servant (her affair is with an outer-court
man, kept on her side); the j99succ epilogue is her personal ending — the shared world goes on under the host's new Emperor.

## Owner questions
None.
