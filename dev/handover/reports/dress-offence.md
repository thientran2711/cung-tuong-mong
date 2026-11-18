# Report: dress offences (review/dress-offence) — SẴN SÀNG KIỂM f47c7fd3

Branch `review/dress-offence` @ **f47c7fd3** (off origin/main 2934bede, merged). Worker for MAIN s21. Owner words: OD "- (16/11 18:30Z" (4 points), "- (16/11 17:20Z" (XL master), NPC law OD:L1386, one core OD:L1267.

## Answer: does Dò la reveal what a person wears / a rank breach?
**Before this branch: NO.** `spyFind` (jtruth.js:75, used by the act Dò la j8 `ACT.spy`, both ways) only gives true evidence (evA) or "harmless" knowledge (spyKnow / harmTxt). The maid's "Sai đi dò la" (j2:164 → now jwhy `spyMaidRun` → j78maidSpy) gives evidence / 2 true facts — never dress. The only dress knowledge came from j92 remarks (`wdRemark`, people commenting) and the monthly tai mắt (`wdTaimat`, one item's phẩm). Jewellery above rank (the visible IT.rk rule) was never a cause at all, and j92's inquiry (`wdStatus`, only the 2 WD slots) would have judged it "đúng phẩm".
**Now:** a successful Dò la (player or NPC, `spyFind` wrapper) and a successful servant dò la (`spyMaidRun` wrapper) also report the target's dress: Xa xỉ total (+ her allowance), jewellery above rank, and the TRUE phẩm of her worn robe / hairpin (`wdKnowAll` + `wdSee(...,sure)`). Card texts say so ("· thấy y phục nàng (Xa xỉ, vượt phẩm)").
**Same place = seen** (owner point 4): every `placeWhere` (each buổi) everyone in one place sees each other's dress (two-way, NPC↔NPC too); her `goTo` to a place = she and the people there see each other. Looking shows Xa xỉ and the jewellery rank rule; it does NOT reveal the hidden phẩm of WD robes (j92 rule kept — that still needs remarks / tai mắt / Dò la). Dư đồ lock code untouched (review/dudo-lock).

## What was built (jdress.js, last in assemble)
1. **Tố xa xỉ** (`ACT.xx`, NEW) — offence = the ONE score `luxOf(t)` (jinv+jwdinv+jpet: all worn pieces incl. WD slots and the follow pet) above her rank allowance `luxAllow(t)`. Needs a sighting (`xxCause`: seen ≤ seenW tuần ago, same set still worn, seen total > allowance). Inquiry judges the truth: proven → target Đức −2, Danh −4, tiếng xa hoa +2, her most lavish piece taken off (kept: within rank); accuser Danh +2. Waved off (same odds `oVP` as Tố vượt phẩm) → accuser Danh −2. Not above allowance → accuser Danh −5, target +2. Same act/odds/cooldown for player and NPC; NPCs pick it with the same motive gate + weight as vp (jwd92b). Listed wherever vp is (RVGRP Hại nặng, place harms, BANDS, DIRTY, RT_HARM, EMO_HARM, WHY_NOSEND, co-op PUB, defence order giuchung, runAct/jaudit/j40/j43 inline lists, AOUT/LACK/J78VERB/HARMK/ACTDOM).
2. **Tố vượt phẩm** (`ACT.vp`, existing j92 act, in-game name "Hặc ăn mặc sai phẩm" via ACT.n; place card label "Tố vượt phẩm"): jewellery above rank now a cause once SEEN, and the inquiry judges/confiscates it (also when the outfit itself is over).
3. **One core:** `luxAllow` reads `BAL.lux.allow` {base 36, perRank 16, sungAt 60, sungAdd 10}; level-3 factor `BAL.lux.lv3` 1.5 (were typed in jinv).
4. **Person card wear row = 7** (KIT §28.14 K1 `kitWearSlots`, rewritten in place): Cài tóc · Đeo tay · Đeo eo · Túi thơm · Khăn che mặt · Y phục · Theo hầu, kitItem cells (existing kit parts only: kitItem `mark` corner tag ["Vượt phẩm","r"], kitItem `lux` box, `.kitl` label). Marks + "Xa xỉ N / M" ONLY when the player has seen that dress; her own row always. KIT.md §28.14 updated (same branch).

## BAL keys (all new numbers)
`BAL.lux.xx` = {seenW 12, cdA 48, cdT 72 (= WD.vpCdA/vpCdT), hostMin 50, ghenMin 70 (= jwd92b), ducT −2, danhT −4, repT 2, danhA 2, rel −10, waveDanhA −2, falseDanhA −5, falseDanhT 2, falseRel −12 (= vp false), showBud true}; `BAL.lux.allow`; `BAL.lux.lv3`.

## Files
dev/build/jdress.js (new) · jinv.js (luxAllow/lv3 → BAL) · jlux.js (BAL.lux.allow, lv3) · j9.js (place act Tố xa xỉ, runAct public list) · j40.js / j43.js / jaudit.js / jcoopworld.js (lists) · assemble.py (jdress last) · dev/kit/KIT.md §28.14 · tests dev/test/dress-offence.js, dress-offence-bot.js, dress-offence-shots.js · shots dev/shots/dress-offence/*.jpg · site rebuilt.

## Tests
- `node dev/test/dress-offence.js [dev/index.html]` — 27 checks ALL PASS (8/8 runs): BAL allowance; xx player→NPC (unseen blocked + LACK reason, seen allowed, proven, cooldown), changed dress → no cause, false xx, NPC→player (menu only after sighting, proven), NPC→NPC; vp jewellery both ways; same-place sightings both ways / other places none; Dò la both ways; servant dò la; 7-cell row, no marks unseen, Xa xỉ N / M + red Vượt phẩm when seen, own row 7; old save (no dsn/xxA/xxT) loads and plays a month; no page errors.
- Bot `FAST=1 [LAVISH=1] node dev/test/dress-offence-bot.js dev/index.html 10 24 <seed>` (player only answers dialogs + Sang buổi; every NPC plays as an agent; 0 page errors). Per 100 days:
  - normal player (10 lives, 6570 days): xx NPC→NPC proven 0.02; xx at her 0; vp NPC→her 0.08 (waved 0.06, proven 0.02); NPC menus offering xx 0.15, vp 0.41; NPC acts overall 6.0.
  - lavish player (her 3 most lavish within-rank pieces; 10 lives, 7080 days): xx NPC→her 0.06 (proven 0.03, waved 0.03 ≈ once per 4–5 years); vp NPC→her 0.07; NPC→NPC xx/vp ≈ 0.01–0.02; NPC menus offering xx 0.45.
  Note: the inpage4 "sensible" bot (non-FAST) is very slow on 12+ months (page busy minutes per month, crashed once on 24 months) — not from this branch (dressLookPlace ×50 = 2 ms).
- Shots (dpr 2, saved at 1×): dev/shots/dress-offence/card-755x1000.jpg, acts-755x1000.jpg, result-755x1000.jpg, card-1180x820.jpg, acts-1180x820.jpg, result-1180x820.jpg — no horizontal overflow, 0 page errors.

## For MAIN to decide / notes
1. **Allowance shown**: the brief asks "Xa xỉ total vs her rank allowance"; an older owner note (jinv 11/15, KIT §28.14 old text) said never show the allowance. Implemented as shown ("Xa xỉ 195 / 188", red when above); one switch `BAL.lux.xx.showBud=false` → total only.
2. Fold 755: in a 52 px cell the kit corner tag "Vượt phẩm" wraps to 2 lines over the picture (kit part kitItem `.kitm`, not changed here) — kit keeper may want a shorter/one-line tag; item cells scale from the XL master is review/kit-size's job (not in main yet).
3. Strangers ("Người lạ", j61) keep their locked card (no wear row) — unchanged rule.
4. A loyal servant may refuse an accusation sent from afar (j29 DIRTY) — vp already worked so; xx joins it.
5. Result toast shows only the first sentence of the act text (existing result card) — the Đức/Danh lines appear in the Sổ ghi.
