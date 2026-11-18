# review-econ-items-r1 — independent reviewer (rules/numbers/economy), Foreman C queue
PASS eed75e73f705869ef84367bcf55a46a5e2840240

Branch review/econ-items-r1 = review/econ-items @467fe2193 + origin/main 0c23da40 (descends from it; fast-forwardable) + reviewer fixes.
jeitem.js is LAST in assemble; site rebuilt (bash dev/site/build_site.sh). Conflicts: index.html/sw.js (regenerated), assemble.py (main's
jreign/jrail/jact/jkc kept, jeitem appended), ITEM_ART.md (both §5 girlhood chest and §6 ice kept).

## Fixes made by the reviewer (small, in jeitem.js / jkc.js / test / ECONOMY.md / PROGRESS)
1. Robe re-issue wait did NOT follow the owner (OD 16/11 s9 "option 3: RANDOM 1–3 weeks weighted by how Nội vụ phủ regards her"): it was a
   fixed reWk[rank] [3,3,2,2,2,1,1,1] +1 when Sủng low (= 4 weeks at rank 0, over her 3). Now `eitRegard` (rank, Sủng, recent tip up;
   every stipend skim cause down) and weeks = 1 + two rolls vs (100 − regard). Measured 300 rolls: rank 0 Sủng 5 → mean 2.7, rank 6
   Sủng 80 → mean 1.2, always 1..3 (test asserts both). BAL.eit.reWk/reLowSung removed (canon overwrite), BAL.eit.reG added.
2. Bạc vs no-bạc road were NOT equivalent at high Tai mắt: maid odds = bạc odds − pen + (Lòng−50)/5 + Tai mắt·4; Tai mắt is 0..10, so the
   free road could beat the bạc road by up to +40. Now the maid/Tai mắt bonus is clamped to ±5 (BAL.eit.re.maidAdj), so the maid road sits
   5–15 below the bạc odds for a Sức cost priced like the bạc. Table (Sủng 30, avg maid):
   | rank | Bạc tip | bạc odds | maid Sức | maid odds (range) |
   |---|---|---|---|---|
   | 0 | 6 | 56 Khá chắc | 7 | 46 (41–51) |
   | 1 | 8 | 61 | 8 | 51 (46–56) |
   | 2 | 10 | 66 | 8 | 56 (51–61) |
   | 3 | 12 | 71 | 6 | 61 (56–66) |
   | 4 | 15 | 76 | 6 | 66 (61–71) |
   | 5 | 18 | 81 | 7 | 71 (66–76) |
   | 6 | 22 | 86 | 7 | 76 (71–81) |
   | 7 | 26 | 91 | 7 | 81 (76–86) |
   Bạc tip ≈1.2–1.6 units of her rank's income at every rank (BAL.bacTuan fallback), so the hesitation is the same at every rank.
3. Gain AND loss (owner 16/11 07:15Z) failed on the pilfer dialog: Răn dạy rồi tha (piece back, +8 Lòng) was strictly better than Phạt nặng,
   and Làm ngơ (+3 Lòng, piece lost) strictly worse than Răn dạy. Now: Phạt nặng = piece back + this servant 6 months and the others 3 months
   deterred / −15 Lòng; Răn dạy = piece back + 4 Lòng / the other servants pocket more for 3 months (seen as soft); Trả về Nội vụ phủ =
   piece back + replacement / the servant leaves; Làm ngơ = +12 Lòng (as a reward) / piece lost + more likely again.
4. "Đợi Nội vụ phủ" said "không được không mất" — wrong: she stays in trung y (thiếu lễ −2.8 per greeting, owner Q11). Now shows the loss.
5. LUẬT ƯU TIÊN SỐ 1: jkc.js (kcChest) reached main meanwhile → two copies of the chest. kcChest now calls girlChest(S,{wear:true,who}) (one
   function); the palace chest uses the kit's kgItem like kcChestShow; un-worn robe/hairpin say "cất trong Tư trang".

## Verified (numbers)
- Ice [0,0,1,1,1,2,2,3] by rank in Hạ only (not in lãnh cung); melts at the next month's turn (test: 1 → 0); skimmed → Băng vụn, one less.
- Skim size: (rank,Sủng,causes)→lines (0,5,2)→4 · (0,40,1)→2 · (3,40,1)→1 · (5,40,1)→1 · (6,5,2)→2; charcoal/ice first.
- Pilfer: only a servant with Lòng<45 or a spy; she sees it only via Tai mắt (25 + Tai mắt·8) / a loyal maid (Lòng≥70, +15); dialog is the
  existing kit person dialog (pServ/pMaid), uses j10 loyalty/spy/mkServ replacement. NPCs: same rule as data (punish by trait, newsAdd).
- Girlhood chest: 6 things, same keys as jkc (tramngoc, girlhood robe, vongbackc, ngocboikc, tuithom, khantay). Veil EMPTY: the code follows
  the 16/11 coordinator ruling (OD L1106, 5 worn slots + un-worn handkerchief), NOT the literal owner 20:05Z #8 "fill ALL 6 slots".
  On the palace road only wrist/waist/scent are girlhood-worn; robe + hairpin go to the bag (court issue stays worn) = fallback outfit.
- No double grant: guard S.girl / S.kc / S.srv / turn≤1; jkc's start wrapper runs first, so a home-road life never gets the palace chest.
  Old save fixtures/world30-met.json loads + endTurn, no chest for a life already under way (girl=null). Co-op: per player S.
- Kit: only kitReward / kitRows / person dialog / pbtn / kgItem; no new CSS or kit part. Odds shown via the kit risk chip + hint (same as jstip).
- Paintings item-bangda / item-bangvun (CDN, 256 px) looked at on cream: clear lacquered ice basin vs clay bowl of melting shards; fine.

## Tests (this branch, final build)
- dev/test/econ-items.js PASS-equivalent at 755x1000@2, 1180x820@2, 1000x755@2, 1366x1024@2, 844x390@2: 0 page errors, dialogs in view,
  no overflow, maid road issues a robe, family robe arrives, 10/10 NPC fallback robes, old save loads (json checked per size).
- HOST mode (lib/device.js openHost from review/ua-test-r1, not committed): fold 755x1000 + ipadAir 1180x820, chest 6, re-issue dialog
  in view, no overflow, 0 errors.
- coop-e2e.js (live Worker): 59 ok, 0 FAIL.
- Bots runb sens ×2 (inpage6 + ineit + inty, HHSTOP), 6 lives, 0 page errors: 4 Thái phi, 2 poison. Per month: skims 0.07 (2.9 lines),
  servants pocketing 0.12 (58 dialogs) — higher than the worker's 0.02 (small n; part may be the new "soft" cost); ice 34 issued / 15 melted;
  robes lost 173, weeks in trung y 319; bots took no re-issue road (they dress from the chest).

## Owner / coordinator questions
1. "6 slots": owner 20:05Z #8 says fill ALL 6; code follows the 16/11 coordinator ruling (veil empty, handkerchief in the bag). Keep?
2. Viết thư xin nhà is cheap (Sức 2, robe in 1 week at 75 when the family has money, 40 otherwise) — fine as "never stuck", but next to a
   1–3 week wait it is often the easy pick for rich origins. Raise its cost (e.g. family favour / Sức like the maid road) or keep?
3. Cung nữ-origin lives get no girlhood chest (servant start). Want one?
4. Pocketing ~once per 8 months for a low-rank player in the bot sample: tune BAL.eit.pil.base (8) down if the coordinator finds it noisy.
