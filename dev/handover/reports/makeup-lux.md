PRIORITY #1 CHECK ('makeup levels xa xỉ luxOf luxTotal taste'): OD L1634 (15:35Z) + L1639 (15:45Z display) + L1643 (16:00Z scale), MAIN ADDs 15:55Z/16:05Z in FOREMAN_B_STATUS | ledger 0 | claims B makeup-lux (this) | main: jinv luxOf/luxAllow/LUX_V (the ONE score), jwdinv WD slots, jpet petLuxOf, jlux luxVerdict/luxRange/luxExtra, jtoil TOIL_MK/toilLookOf/toilFx, jmkt taste, jts tsDressPts, jne NE.toil; jdress ACT.xx | review/* toil-looks2-r5 (base, art untouched), makeup-theme-r1 (live, reused). Nothing rebuilt: every change sits in those functions.

# makeup-lux — review/makeup-lux 7c6ef2fda (opus worker, Foreman B)
Contains review/toil-looks2-r5 97f57862 and origin/main b5d109fe (toil-looks2 itself was NOT yet on main at report time). START_CTX ~6%. Supersedes 43bbe87b0 (before MAIN's ADDs) and 186e30831 (before the jdress restore).

## What (owner OD L1634 + L1639 + L1643 = the spec; MAIN ADDs applied)
1. **Diêm dúa dropped as a LEVEL.** `TOIL_MK` = five looks (Mặt mộc, Vụng về [art A/B unchanged], Đoan trang, Kiều diễm, Khuynh thành = max). `toilLookOf(P,score)` has no overdone roll; the heaviness machinery that only fed it is removed (BAL.toil.heavy / presetDiem / mixH / showyH / cakeH / allow / diemOdds / play.cake* / allowRk, `toilHeavy`, `toilAllow`). "Kiểu cầu kỳ" stays (taste / contest want) and previews at the Khuynh thành look. TOIL_MKS.diem / TOIL_LOOKS.diem art data untouched (toil-looks2's; no longer drawn).
2. **Look = NAME only, no beauty number (L1639).** Each look has ONE xa xỉ value `BAL.toil.lv[look].lux` + tier word `TOIL_LUXW` (Mộc mạc / Sơ sài / Thanh nhã / Diễm lệ / Lộng lẫy). Shown only inside the makeup screens with existing kit parts (`toilLvChips` = kitChip word + `kitLuxChip` "Xa xỉ N"; `toilLvRows` in kitRows): mirror ladder, result row "Xa xỉ son phấn", reveal row. `lv[look].dep` is a rules-only rank (contest points, night end), never shown. My earlier "Cả bộ hôm nay" total row is REMOVED — the total display is MAIN's.
3. **Same scale as clothes (L1643):** 0 / 8 / 16 / 28 / 44 = the item ladder LUX_V by grade (Khuynh thành = a grade-3 fine outfit). Table below.
4. **ONE function `luxTotal(p)`** (jlux) = clothes + jewels + today's makeup + pet = `luxOf(p).sc` (jinv worn + jwdinv WD slots + jpet pets + jtoil makeup wrapper). No second score: every event judgement reads luxOf = luxTotal. Same for NPCs (raw makeup roll `TOIL_NPC0`) and the co-op friend (her synced sitting). `luxParts(p)` = {y, trang, mk, pet, total} (sums to the total). **Change event:** after every render, if HER total changed, `window` event `ctm-lux` {total, prev, parts} — for MAIN's display (Tư trang / room panel / Dư đồ). The month tick uses `luxOf(p,{noMk:1})` (not an event).
5. **"Diêm dúa" = reaction word only**: `luxVerdict` → `diem` ("diêm dúa", `TOIL_DV.diem`) when total ratio > occasion ceiling × `BAL.lux.diem` (1.3); consequences = phô trương's + the host's existing `BAL.toil.react[kind].diem` row; reason line "ăn vận diêm dúa (Xa xỉ N, son phấn M, giữa dịp …)"; scold / slip / tease pools fire on that verdict on a made-up face.
6. **Taste = each person's own** (jmkt, same system as the liked tone): `toilLvTasteOf` — consorts by nết (`taste.lvTrait`), else hash (`lvLike`); Thái hậu / Hoàng thượng by name hash; liked look +1, ≥2 steps away −1 (`lvReact`); known → on the card, unknown → one surprise then learned; Emperor's "Điều ngài thích" row "Dung nhan".
7. Hội phối đồ: `tsDressPts(p,pick,th,mk)` adds the face's xa xỉ AND the pet's (`petLuxOf`) to the outfit total (her + every rival); contest makeup points = `dep − lvBase` (bare face `taste.pts.moc`).
8. Fixed on the way (same family): (a) jne night end read `NE.toil[t.makeup]` (boolean key → never counted) → `sign(dep − lvBase)`, same values as the old table. (b) CO-OP parity: the friend's tone/level taste counted always on the other seat but only when known on her own → `toilTasteKnown/toilLvTasteKnown(host, who)` read HER `mkKnow`, which now rides jcoopworld LOOK.

## Looks (proposal, BAL.toil.lv) beside the clothes they compare to
| look | tier word | xa xỉ | ≈ clothes (measured wdPool y avg) |
|---|---|---|---|
| Mặt mộc | Mộc mạc | 0 | — |
| Vụng về | Sơ sài | 8 | below a Đáp ứng outfit (10) |
| Đoan trang | Thanh nhã | 16 | ≈ Thường tại outfit (19) |
| Kiều diễm | Diễm lệ | 28 | ≈ Tần outfit (29) |
| Khuynh thành | Lộng lẫy | 44 | ≈ Quý phi outfit (43–59): "a fine outfit" |

| rank | y phục avg (min–max) | trâm avg | allowance (luxAllow) |
|---|---|---|---|
| Đáp ứng | 10 | 11 | 57 |
| Thường tại | 19 | 19 | 90 |
| Quý nhân | 21 | 27 | 116 |
| Tần | 29 (23–35) | 29 | 142 |
| Phi | 38 | 40 | 178 |
| Quý phi | 51 (43–59) | 51 | 218 |
| Hoàng quý phi | 66 | 66 | 264 |
| Hoàng hậu | 76 | 78 | 302 |
Balance note: a Đáp ứng in her base outfit + Khuynh thành = 64 > allowance 57 → "quá phô trương" at thỉnh an (diêm dúa above ×1.3 of the ceiling); from Quý nhân up Khuynh thành fits a normal day — the owner's "overdoing beyond the rank" through the one total.

## Event family (every luxOf reader)
| reader | kind | before | after |
|---|---|---|---|
| jlux luxVerdict (thỉnh an / yến / lễ / tang / edict / lãnh cung; = toilDress) | event | clothes+pet | + face; verdict `diem` |
| jlux luxExtra / reputation step / serveTH NPC extra | event | photruong/vuot | + diem |
| jlux toilNpc wrapper (NPC verdict at Thái hậu) | event | clothes | + face (raw roll) |
| jaudit leAttire, aaThieuLe0 | event | clothes | + face |
| jts tsDressPts (Hội phối đồ, her + rivals) | event | 4 pieces | + face + pet |
| jinv kitLuxChip (Tư trang), jwdinv chip, jitd "Bên mình N → M", jtoil dress step | shows the total | clothes+pet | + face |
| jinv luxMonth, jlux luxRepTick, luxMonthX | month tick | clothes+pet | unchanged (`{noMk:1}`) |
| jlux luxRange / luxThemeRange / luxGift | allowance only | — | unchanged |
| jdress dressRec / xxAccuse (Tố xa xỉ) | event | not live (lost in a merge) | restored; reads the same total incl. face (below) |

## jdress.js restored (Foreman B s6 decision: bug fix, the owner's ruling judges xa xỉ through ACT.xx)
- Why it was gone: jdress.js was added "last in assemble" on review/dress-offence and reviewed on review/dress-offence-r1 at 40903f4a3 ("assemble: main's list + jdress last"). The next commit there, **a0d93ac8b "s22: merge origin/main into review/dress-offence-r1; site rebuilt", resolved assemble.py to main's list and dropped 'jdress.js'**; that state landed on main. luxOf itself was always live.
- Now: 'jdress.js' back in assemble.py (before jrbatch). ACT.xx / dressRec / xxAccuse read luxOf = luxTotal (clothes + jewels + makeup + pet) — no second score. The face of the day joins the seen-look signature (dsSig "mk:<look>"), so a sighting stays a cause only while she shows the same clothes AND the same face.
- One core: its 6 inline numbers (Tố vượt phẩm jewellery case) and the same typed numbers in j92 wdAccuse now read BAL.eff.j92 wdWaveDanhA −2 / wdDanhA +2 / wdOverDanhT −6 + the existing wdAccuse_2/_3; texts print the keys (guard 4957 → 4950).
- What the player sees again: on every person card the 7-cell wear row (Cài tóc, Y phục, Đeo tay, Đeo eo, Túi thơm, Khăn che mặt, Thú cưng) with "Xa xỉ N" per piece and the "Vượt phẩm" mark once seen; the act "Tố xa xỉ" in Hại nặng (needs a sighting: same place, or Dò la / a maid's dò la) with its result card (proven: target Đức/Danh −, most lavish piece taken off; false: accuser Danh −; waved off); "Tố vượt phẩm" now also judges jewellery above her rank (confiscated); NPCs accuse her and each other the same way (two-way); Dò la reports show what a person wears.
- Tests: dress-offence ALL PASS (29), dress-offence-bot PASS (0 errors), dress-offence-shots (Fold + iPad, looked at: card wear row + act, result "Tố xa xỉ … (Xa xỉ 211): thành"), coop-e2e 63/63 (NPC acts on both seats, no errors).

## Old-save map
`TOIL_OLDLV = {diem:"tuyet"}` (her words "khuynh thành chính là diêm dúa luôn rồi"), read by `toilMk` and `toilLookRec`. Test: a save with `toilette.look:"diem"` loads, chip "dung nhan Khuynh thành", face layer tuyet, xa xỉ 44.

## Tests (on 7c6ef2fda unless noted)
- quickcheck PASS 156 s (core gates: one-core-guard 4957 → 4950, one-core-text, one-core-bind, rules-one-source, kit-conform, coop one-world; old save ok; perf render 178/223 ms vs live).
- NEW dev/test/makeup-lux.js — Fold 755x1000@2 + iPad 1180x820@2 PASS: levels, chips (no beauty number, tier word, Khuynh thành = LUX_V[3]), makeup in the total per look, NPC + co-op friend, luxTotal = luxParts sum + `ctm-lux` event + NPC, diêm dúa word, month tick, old save, contest, liked look, ladder, result, Thỉnh an event.
- makeup-theme, luxury (2b edict accepts diem), toil-react, toil-tease, toilette, voice-band PASS; earlier in this work voice-trait-b, voice-pool-sim, player-dress PASS.
- coop-toil-look 29/29 (one run 28/29 = a face-layer sync flake right after coop-thin-b landed; two reruns 29/29), coop-e2e 63/63.
- makeup-theme-bot: skilled+scouted 4.47 > random 1.2 > bare face −4.
- dress-offence ALL PASS now that jdress is back (it crashed on main before).

## Shots (outside git, looked at)
CDN img/_review/makeup-lux/ — mlux-755x1000-{1-ladder,2-result,3-event}.jpg + mlux-1180x820-…; the verdict giver wipes it.
Notes for B (not mine): the result's "Khuynh thành · 89 phần" is the sitting's own skill score (pre-existing, not a look beauty number); on iPad the reaction popup option cards are cramped (title wraps under "an toàn") — existing toilReact layout; jitd item detail uses luxPiece (wdLux) while luxOf sums luxVal — a mirrored trâm reads 76 vs 80 (pre-existing one-core gap).

## Numbers / one core
New keys: BAL.toil.lv {dep, lux}, lvBase, taste.pts.moc, taste.lvTrait/lvLike/lvReact, BAL.lux.diem. Removed: toil heaviness keys, allowRk, NE.toil, taste.pts.lv. Words: TOIL_LUXW, TOIL_DV.diem (VANPHONG updated).
