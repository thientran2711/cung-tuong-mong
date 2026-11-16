FAIL
# review/servant-mline-r1: servant-system PART C (active NPC maid line), reviewer for Foreman D
Branch review/servant-mline-r1 @93b39ee30991c8db64f98b24c3b17c04f93eb48c (origin/main bad941b4 is an ancestor). Built as: origin/main + merge review/servant-system-r1 (part A, PASSed) + cherry-pick 27219c13 (part C only; no part B code). PROGRESS: dev/PROGRESS_review-servant-mline-r1.md.

## Fixed by the reviewer on the branch (no number changed)
1. ONE CORE: every literal in jmline.js now reads BAL.mline with the same value (seekTr, feudFrame 50, fightLoy 2, poisonLv 1, evN 1, hitBribeBac 60, hitBribe 40, hitBeat 55, beatLoy 3, ageDef 20, offRank 2, offEye 1.2). The j14 fallback and the off-switch old rule read BAL too. jmline.js now has only 0/1/100 clamps and counters.
2. Text prints the constant: "(lòng +3)" became "(thiện cảm +${BAL.mline.beatLoy})" (VANPHONG row 51: "Lòng" is the wrong word there).
3. VANPHONG row 34: "trong mục Cung nhân" became "ở Hậu cung › Cung nhân" (2 places).
4. Co-op: servMonth/servRanks are not muted on the guest (jcoopworld mutes only rivalsTurn/rivalsMonth/festival), so mlMonth and mlEye rolled on both clients and diverged. Added mlGuest(). On the guest, NPC maid events and NPC maid rises are skipped (the host decides them); the guest rolls only her own maids' seeking.

## Checks
| # | Check | Result |
|---|---|---|
| 1 | ONE CORE | OK after fix 1–2 |
| 2 | gain and loss | **FAIL**, see 1 below |
| 3 | SEATCAP never exceeded by a rising maid | OK: she enters rank 0 (no cap), and roomFor("consort") is still required. Over-cap months at ranks 3/5/6 also happen with __mloff=1, so they are pre-existing and not from part C (see note A) |
| 4 | rates (5 lives on = 1380 months, 2 lives off = 720 months; she does nothing and is kept alive) | rises 4–12 per 25–30 y (old rule 10–11). Eye hits 34–64, but the face pool is full in 70–85 % of months, so most hits are wasted (part B H9). With 3 maids of her own: hers targeted 3× / 25 y at Tai mắt 0, 11× at Tai mắt 3. Her Sổ ghi lines: 10 / 300 months (Tai mắt 0), 150 / 300 months with at most 3 in a month (Tai mắt 3). No flood |
| 5 | wording / kit | lines go through the existing Sổ ghi kit row; "ta" shows on screen (j84); no %; no new UI part. Minor items in 3 below |
| 6 | old save / co-op | main-build save loads and runs 24 months, 0 errors (dev/test/mline-oldsave.js); coop-e2e 59 ok / 0 FAIL |
| 7 | off switch | __mloff=1 leaves only the old eye rule — OK |
Screens (dev/test/mline-shots.js, Sổ ghi after a forced month): 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390, 390x844 (rotate prompt): no overflow, 0 page errors.

## FAIL list (worker, on top of review/servant-mline-r1)
1. Gain and loss: several acts have a gain and no cost for the one who acts.
   (a) mlFeud "frame" and "poison" against an NPC palace's maid: no risk to the framer or her master (feudEv applies only when the victim is hers).
   (b) mlHit "frame" by a consort: no risk at all. Only "beat" has hitEv.
   (c) mlSeek "use": the master gets eye ×useMul and the maid gets lòng +useLoy, with no cost.
   Proposal (numbers for Foreman D / the coordinator to decide): one BAL key, e.g. caught %, per act. When caught, the framer is punished by her own master, or the victim's mistress gets evidence (evA) against the master behind it. Apply feudEv to every victim's mistress, not only hers. "use" should cost the master something visible (e.g. Danh, or the chance that the maid rises disloyal).
2. Co-op, rest of the family (LUẬT SỬA CẢ NHÓM): servRanks (j14) still rolls NPC staff merit, promotion and "bought by a bigger consort" on the guest as well. Put the NPC half of servRanks/servMonth behind the host the same way (jcoopworld mute list or an mlGuest-style guard). Also, the guest's own maids never feud and are never hit in co-op (the friend entry has staff:[]). Say whether this is accepted.
3. Wording (minor): "Tai mắt báo: Cung nữ X, cung nữ của <chủ>" reads the rank twice once the log adds the rank label; use "người hầu của" or drop it. The same maid's "dạo này hay xin đi dâng trà" line can come back right after her seek ends; add a cooldown (BAL key).

## Notes for the coordinator (not part C)
A. SEATCAP over cap (rank 6 with 2 holders, rank 5 with 3, rank 3 with 7) in long do-nothing sims, with __mloff=1 too. This is pre-existing, so it needs its own item.
B. H9 confirmed: most eye hits are lost because the consort face pool is full.
